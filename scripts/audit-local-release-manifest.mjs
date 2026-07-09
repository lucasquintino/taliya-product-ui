import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const manifestPath = path.join(root, "dist-packages/taliya-product-ui-local-manifest.json");
const reportJsonPath = path.join(specDir, "local-release-manifest-audit.json");
const reportMdPath = path.join(specDir, "local-release-manifest-audit.md");
const check = process.argv.includes("--check");
const updateManifest = process.argv.includes("--update-manifest");
const existingReport = fs.existsSync(reportJsonPath) ? JSON.parse(fs.readFileSync(reportJsonPath, "utf8")) : null;

const packageSpecs = [
  { id: "tokens", name: "@taliya/tokens", packageJson: "packages/tokens/package.json", installOrder: 1 },
  { id: "ui", name: "@taliya/ui", packageJson: "packages/ui/package.json", installOrder: 2 },
  { id: "crm", name: "@taliya/crm", packageJson: "packages/crm/package.json", installOrder: 3 }
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function tarballNameFor(packageJson) {
  const prefix = packageJson.name.replace("@", "").replace("/", "-");
  return `${prefix}-${packageJson.version}.tgz`;
}

const generatedPackages = packageSpecs.map((spec) => {
  const packageJson = readJson(path.join(root, spec.packageJson));
  const tarball = tarballNameFor(packageJson);
  const tarballPath = path.join(root, "dist-packages", tarball);
  const exists = fs.existsSync(tarballPath);

  return {
    name: spec.name,
    version: packageJson.version,
    tarball,
    file: `dist-packages/${tarball}`,
    sha256: exists ? sha256(tarballPath) : "",
    bytes: exists ? fs.statSync(tarballPath).size : 0,
    installOrder: spec.installOrder,
    exists
  };
});

const existingManifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : null;
const generatedManifestPackages = generatedPackages.map(({ exists, ...row }) => row);
const existingPackagesMatch =
  existingManifest &&
  JSON.stringify(existingManifest.packages ?? []) === JSON.stringify(generatedManifestPackages);

const generatedManifest = {
  schemaVersion: 1,
  generatedAt: existingPackagesMatch && existingManifest?.generatedAt ? existingManifest.generatedAt : new Date().toISOString(),
  channel: "local-tarball",
  packages: generatedManifestPackages
};

if (updateManifest || !fs.existsSync(manifestPath)) {
  fs.writeFileSync(manifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`);
}

const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : null;
const manifestRows = packageSpecs.map((spec) => {
  const generated = generatedPackages.find((row) => row.name === spec.name);
  const manifestRow = manifest?.packages?.find((row) => row.name === spec.name);

  return {
    name: spec.name,
    expectedVersion: generated?.version ?? "",
    manifestVersion: manifestRow?.version ?? "",
    expectedTarball: generated?.tarball ?? "",
    manifestTarball: manifestRow?.tarball ?? "",
    expectedSha256: generated?.sha256 ?? "",
    manifestSha256: manifestRow?.sha256 ?? "",
    expectedBytes: generated?.bytes ?? 0,
    manifestBytes: manifestRow?.bytes ?? 0,
    expectedInstallOrder: spec.installOrder,
    manifestInstallOrder: manifestRow?.installOrder ?? 0,
    tarballExists: generated?.exists === true,
    pass:
      generated?.exists === true &&
      manifestRow?.version === generated.version &&
      manifestRow?.tarball === generated.tarball &&
      manifestRow?.file === generated.file &&
      manifestRow?.sha256 === generated.sha256 &&
      manifestRow?.bytes === generated.bytes &&
      manifestRow?.installOrder === spec.installOrder
  };
});

const manifestShapePass =
  manifest?.schemaVersion === 1 &&
  manifest?.channel === "local-tarball" &&
  Array.isArray(manifest?.packages) &&
  manifest.packages.length === packageSpecs.length;

const status = manifestShapePass && manifestRows.every((row) => row.pass) ? "pass" : "fail";
const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  manifestPath: "dist-packages/taliya-product-ui-local-manifest.json",
  manifestShapePass,
  packageCount: manifest?.packages?.length ?? 0,
  rows: manifestRows
};

const rowsMd = manifestRows
  .map((row) => `| \`${row.name}\` | \`${row.expectedVersion}\` | \`${row.manifestTarball || "missing"}\` | ${row.tarballExists ? "yes" : "no"} | \`${(row.manifestSha256 || "missing").slice(0, 12)}\` | ${row.pass ? "pass" : "fail"} |`)
  .join("\n");

const markdown = `# Local Release Manifest Audit

Generated: ${report.generatedAt}

Status: ${status}

Manifest: \`${report.manifestPath}\`

This audit validates the consumer-facing local release manifest. The manifest gives consumers one stable file with package names, versions, tarball names, hashes, sizes, and install order for the current local tarball channel.

## Summary

- Manifest shape pass: \`${manifestShapePass}\`
- Package count: \`${report.packageCount}\`

| Package | Version | Manifest tarball | Tarball exists | SHA-256 | Status |
| --- | --- | --- | --- | --- | --- |
${rowsMd}
`;

if (check) {
  const nextJson = `${JSON.stringify(report, null, 2)}\n`;
  const existingJson = fs.existsSync(reportJsonPath) ? fs.readFileSync(reportJsonPath, "utf8") : "";
  const existingMd = fs.existsSync(reportMdPath) ? fs.readFileSync(reportMdPath, "utf8") : "";
  if (existingJson !== nextJson || existingMd !== markdown) {
    console.error("Local release manifest audit is stale. Run `corepack pnpm local-release-manifest:audit:update`.");
    process.exit(1);
  }
}

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(reportMdPath, markdown);

if (status === "fail") {
  console.error("Local release manifest audit: fail");
  process.exit(1);
}

console.log(`Local release manifest audit: ${status}`);
