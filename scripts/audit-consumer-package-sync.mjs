import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const installedPackages = [
  {
    packageName: "@taliya/tokens",
    sourcePath: "packages/tokens",
    installedPath: "node_modules/@taliya/tokens",
    files: ["README.md", "dist/index.d.ts", "dist/index.js", "src/tokens.css"]
  },
  {
    packageName: "@taliya/ui",
    sourcePath: "packages/ui",
    installedPath: "node_modules/@taliya/ui",
    files: ["README.md", "dist/index.d.ts", "dist/index.js", "src/styles.css"]
  },
  {
    packageName: "@taliya/crm",
    sourcePath: "packages/crm",
    installedPath: "node_modules/@taliya/crm",
    files: [
      "README.md",
      "dist/index.d.ts",
      "dist/index.js",
      "dist/standard-page-kit.d.ts",
      "dist/standard-page-kit.js",
      "src/styles.css"
    ]
  }
];

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function reportBasename(baseName) {
  const label = optionValue("--report-label", "");
  if (!label) return baseName;

  const normalized = label.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const consumerRoot = resolve(root, optionValue("--consumer", "../taliya-internal"));
const sourceDir = resolve(root, optionValue("--source", "dist-packages"));
const vendorDir = resolve(consumerRoot, optionValue("--vendor", "vendor/taliya-product-ui"));
const outputDir = resolve(root, optionValue("--out-dir", specDir));
const reportJsonPath = resolve(outputDir, `${reportBasename("consumer-package-sync-audit")}.json`);
const reportMdPath = resolve(outputDir, `${reportBasename("consumer-package-sync-audit")}.md`);
const localReleaseManifest = JSON.parse(readFileSync(resolve(sourceDir, "taliya-product-ui-local-manifest.json"), "utf8"));
const packageFiles = [
  ...localReleaseManifest.packages.map((packageInfo) => packageInfo.tarball),
  "taliya-product-ui-local-manifest.json"
];

function fileHash(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

const rows = packageFiles.map((fileName) => {
  const sourcePath = resolve(sourceDir, fileName);
  const vendorPath = resolve(vendorDir, fileName);
  const sourceExists = existsSync(sourcePath);
  const vendorExists = existsSync(vendorPath);
  const sourceSha256 = sourceExists ? fileHash(sourcePath) : "";
  const vendorSha256 = vendorExists ? fileHash(vendorPath) : "";

  return {
    fileName,
    sourcePath,
    vendorPath,
    sourceExists,
    vendorExists,
    sourceSha256,
    vendorSha256,
    pass: sourceExists && vendorExists && sourceSha256 === vendorSha256
  };
});

mkdirSync(outputDir, { recursive: true });

const installedRows = installedPackages.flatMap((packageInfo) =>
  packageInfo.files.map((relativeFile) => {
    const sourcePath = resolve(root, packageInfo.sourcePath, relativeFile);
    const installedPath = resolve(consumerRoot, packageInfo.installedPath, relativeFile);
    const sourceExists = existsSync(sourcePath);
    const installedExists = existsSync(installedPath);
    const sourceSha256 = sourceExists ? fileHash(sourcePath) : "";
    const installedSha256 = installedExists ? fileHash(installedPath) : "";

    return {
      packageName: packageInfo.packageName,
      relativeFile,
      sourcePath,
      installedPath,
      sourceExists,
      installedExists,
      sourceSha256,
      installedSha256,
      pass: sourceExists && installedExists && sourceSha256 === installedSha256
    };
  })
);

const report = {
  generatedAt: new Date().toISOString(),
  consumerRoot,
  sourceDir,
  vendorDir,
  status: rows.every((row) => row.pass) && installedRows.every((row) => row.pass) ? "pass" : "fail",
  rows,
  installedRows
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const rowsMd = rows
  .map((row) => {
    const source = row.sourceExists ? row.sourceSha256.slice(0, 12) : "missing";
    const vendor = row.vendorExists ? row.vendorSha256.slice(0, 12) : "missing";
    return `| \`${basename(row.fileName)}\` | ${row.sourceExists ? "yes" : "no"} | ${row.vendorExists ? "yes" : "no"} | \`${source}\` | \`${vendor}\` | ${row.pass ? "pass" : "fail"} |`;
  })
  .join("\n");

const installedRowsMd = installedRows
  .map((row) => {
    const source = row.sourceExists ? row.sourceSha256.slice(0, 12) : "missing";
    const installed = row.installedExists ? row.installedSha256.slice(0, 12) : "missing";
    return `| \`${row.packageName}\` | \`${row.relativeFile}\` | ${row.sourceExists ? "yes" : "no"} | ${row.installedExists ? "yes" : "no"} | \`${source}\` | \`${installed}\` | ${row.pass ? "pass" : "fail"} |`;
  })
  .join("\n");

writeFileSync(
  reportMdPath,
  `# Consumer Package Sync Audit

Generated: ${report.generatedAt}

Consumer: \`${consumerRoot}\`

Source: \`${sourceDir}\`

Vendor: \`${vendorDir}\`

Status: ${report.status}

This audit compares SHA-256 hashes for local Taliya package tarballs and installed public package files so a consumer cannot accidentally validate against stale vendor packages or stale \`node_modules\` contents.

| Package | Source exists | Vendor exists | Source SHA-256 | Vendor SHA-256 | Status |
| --- | --- | --- | --- | --- | --- |
${rowsMd}

## Installed Package Files

| Package | File | Source exists | Installed exists | Source SHA-256 | Installed SHA-256 | Status |
| --- | --- | --- | --- | --- | --- | --- |
${installedRowsMd}
`
);

console.log(`Consumer package sync audit: ${report.status}`);
console.log(`Wrote ${reportMdPath}`);
console.log(`Wrote ${reportJsonPath}`);

if (checkMode && report.status !== "pass") {
  const failedTarballs = rows.filter((row) => !row.pass).map((row) => row.fileName);
  const failedInstalled = installedRows.filter((row) => !row.pass).map((row) => `${row.packageName}/${row.relativeFile}`);
  console.error(`Out-of-sync packages: ${[...failedTarballs, ...failedInstalled].join(", ") || "none"}`);
  process.exit(1);
}
