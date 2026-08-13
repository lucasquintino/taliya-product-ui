import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fetchRegistryMetadata } from "./lib/registry-metadata.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const check = args.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const reportJsonPath = resolve(specDir, "registry-publication-audit.json");
const reportMdPath = resolve(specDir, "registry-publication-audit.md");
const existingReport = existsSync(reportJsonPath) ? JSON.parse(readFileSync(reportJsonPath, "utf8")) : null;

function annotateError(message) {
  console.error(message);
  if (process.env.GITHUB_ACTIONS === "true") {
    console.error(`::error title=Registry publication audit::${message.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A")}`);
  }
}

function firstDifferentLine(actual, expected) {
  const actualLines = actual.split("\n");
  const expectedLines = expected.split("\n");
  const length = Math.max(actualLines.length, expectedLines.length);
  for (let index = 0; index < length; index += 1) {
    if (actualLines[index] !== expectedLines[index]) return index + 1;
  }
  return null;
}

const packageSpecs = ["tokens", "ui", "crm"].map((directory) => {
  const packageJson = JSON.parse(readFileSync(resolve(root, "packages", directory, "package.json"), "utf8"));
  return { directory, name: packageJson.name, version: packageJson.version };
});

const rows = await Promise.all(packageSpecs.map(async (spec) => {
  const result = await fetchRegistryMetadata(spec);
  if (result.metadata) {
    const metadata = result.metadata;
    const metadataPass =
      metadata?.name === spec.name &&
      metadata?.version === spec.version &&
      typeof metadata?.dist?.tarball === "string" &&
      metadata.dist.tarball.length > 0 &&
      typeof metadata?.dist?.integrity === "string" &&
      metadata.dist.integrity.length > 0;

    return {
      ...spec,
      metadataUrl: result.metadataUrl,
      httpStatus: result.httpStatus,
      published: true,
      metadataPass,
      tarball: metadata?.dist?.tarball ?? null,
      integrity: metadata?.dist?.integrity ?? null,
      reason: metadataPass ? null : "published metadata is incomplete or mismatched"
    };
  }

  return {
    ...spec,
    metadataUrl: result.metadataUrl,
    httpStatus: result.httpStatus,
    published: false,
    metadataPass: false,
    tarball: null,
    integrity: null,
    reason: result.httpStatus === 404 ? "package version is not published" : result.error
  };
}));

const versionsAligned = new Set(rows.map((row) => row.version)).size === 1;
const publishedPackageCount = rows.filter((row) => row.published && row.metadataPass).length;
const status = versionsAligned && publishedPackageCount === rows.length ? "pass-published" : "not-published";
const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  registry: "https://registry.npmjs.org/",
  currentVersion: rows[0]?.version ?? null,
  versionsAligned,
  publishedPackageCount,
  expectedPackageCount: rows.length,
  rows
};

const markdown = `# Registry Publication Audit

Generated: ${report.generatedAt}

Status: ${status}

This report verifies public npm registry metadata for the exact shared package version. Configuration, a dry run, or local tarballs do not count as publication.

- Registry: \`${report.registry}\`
- Version: \`${report.currentVersion ?? "missing"}\`
- Published packages: ${publishedPackageCount}/${rows.length}
- Versions aligned: \`${versionsAligned}\`

| Package | Version | HTTP | Published metadata | Reason |
| --- | --- | ---: | --- | --- |
${rows.map((row) => `| \`${row.name}\` | \`${row.version}\` | ${row.httpStatus ?? "-"} | ${row.published && row.metadataPass ? "pass" : "missing"} | ${row.reason ?? "-"} |`).join("\n")}
`;

if (check) {
  const normalizeNewlines = (value) => value.replaceAll("\r\n", "\n");
  const currentJson = existsSync(reportJsonPath) ? normalizeNewlines(readFileSync(reportJsonPath, "utf8")) : "";
  const currentMd = existsSync(reportMdPath) ? normalizeNewlines(readFileSync(reportMdPath, "utf8")) : "";
  const expectedJson = `${JSON.stringify(report, null, 2)}\n`;
  if (currentJson !== expectedJson || currentMd !== markdown) {
    for (const row of rows.filter((entry) => !entry.published || !entry.metadataPass)) {
      annotateError(`Registry publication mismatch: ${row.name}@${row.version}: ${row.reason ?? "metadata mismatch"}.`);
    }
    if (currentJson !== expectedJson) {
      annotateError(`Registry publication JSON differs at line ${firstDifferentLine(currentJson, expectedJson) ?? "unknown"}.`);
    }
    if (currentMd !== markdown) {
      annotateError(`Registry publication Markdown differs at line ${firstDifferentLine(currentMd, markdown) ?? "unknown"}.`);
    }
    annotateError("Registry publication audit is stale. Run `pnpm registry-publication:audit:update`.");
    process.exit(1);
  }
} else {
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(reportMdPath, markdown);
}

console.log(`Registry publication audit: ${status}; ${publishedPackageCount}/${rows.length} packages.`);
if (status !== "pass-published") process.exit(1);
