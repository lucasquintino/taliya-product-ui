import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const check = args.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const reportJsonPath = resolve(specDir, "registry-publication-audit.json");
const reportMdPath = resolve(specDir, "registry-publication-audit.md");
const existingReport = existsSync(reportJsonPath) ? JSON.parse(readFileSync(reportJsonPath, "utf8")) : null;

const packageSpecs = ["tokens", "ui", "crm"].map((directory) => {
  const packageJson = JSON.parse(readFileSync(resolve(root, "packages", directory, "package.json"), "utf8"));
  return { directory, name: packageJson.name, version: packageJson.version };
});

const rows = await Promise.all(packageSpecs.map(async (spec) => {
  const metadataUrl = `https://registry.npmjs.org/${encodeURIComponent(spec.name)}/${encodeURIComponent(spec.version)}`;
  try {
    const response = await fetch(metadataUrl, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      return {
        ...spec,
        metadataUrl,
        httpStatus: response.status,
        published: false,
        metadataPass: false,
        tarball: null,
        integrity: null,
        reason: response.status === 404 ? "package version is not published" : `registry returned HTTP ${response.status}`
      };
    }

    const metadata = await response.json();
    const metadataPass =
      metadata?.name === spec.name &&
      metadata?.version === spec.version &&
      typeof metadata?.dist?.tarball === "string" &&
      metadata.dist.tarball.length > 0 &&
      typeof metadata?.dist?.integrity === "string" &&
      metadata.dist.integrity.length > 0;

    return {
      ...spec,
      metadataUrl,
      httpStatus: response.status,
      published: true,
      metadataPass,
      tarball: metadata?.dist?.tarball ?? null,
      integrity: metadata?.dist?.integrity ?? null,
      reason: metadataPass ? null : "published metadata is incomplete or mismatched"
    };
  } catch (error) {
    return {
      ...spec,
      metadataUrl,
      httpStatus: null,
      published: false,
      metadataPass: false,
      tarball: null,
      integrity: null,
      reason: error instanceof Error ? error.message : String(error)
    };
  }
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
  const currentJson = existsSync(reportJsonPath) ? readFileSync(reportJsonPath, "utf8") : "";
  const currentMd = existsSync(reportMdPath) ? readFileSync(reportMdPath, "utf8") : "";
  if (currentJson !== `${JSON.stringify(report, null, 2)}\n` || currentMd !== markdown) {
    console.error("Registry publication audit is stale. Run `corepack pnpm registry-publication:audit:update`.");
    process.exit(1);
  }
} else {
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(reportMdPath, markdown);
}

console.log(`Registry publication audit: ${status}; ${publishedPackageCount}/${rows.length} packages.`);
if (status !== "pass-published") process.exit(1);
