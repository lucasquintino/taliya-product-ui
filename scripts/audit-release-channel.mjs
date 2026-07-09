import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "release-channel-audit.json");
const reportMdPath = path.join(specDir, "release-channel-audit.md");
const check = process.argv.includes("--check");
const existingReport = fs.existsSync(reportJsonPath) ? JSON.parse(fs.readFileSync(reportJsonPath, "utf8")) : null;

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const localPackageManifestPath = "dist-packages/taliya-product-ui-local-manifest.json";
const localPackageManifest = fileExists(localPackageManifestPath) ? readJson(localPackageManifestPath) : null;

function packageTarball(packageName, fallback) {
  const manifestRow = localPackageManifest?.packages?.find((row) => row.name === packageName);
  return manifestRow?.file ?? fallback;
}

const packages = [
  { name: "@taliya/tokens", dir: "packages/tokens", tarball: packageTarball("@taliya/tokens", "dist-packages/taliya-tokens-0.0.0.tgz") },
  { name: "@taliya/ui", dir: "packages/ui", tarball: packageTarball("@taliya/ui", "dist-packages/taliya-ui-0.0.0.tgz") },
  { name: "@taliya/crm", dir: "packages/crm", tarball: packageTarball("@taliya/crm", "dist-packages/taliya-crm-0.0.0.tgz") }
];

const packageRows = packages.map((item) => {
  const packageJson = readJson(`${item.dir}/package.json`);
  return {
    name: item.name,
    version: packageJson.version,
    private: packageJson.private === true,
    tarball: item.tarball,
    tarballExists: fileExists(item.tarball),
    publishableMetadata: packageJson.private !== true && typeof packageJson.version === "string" && packageJson.version.length > 0,
    registryVersionReady: typeof packageJson.version === "string" && packageJson.version !== "0.0.0"
  };
});

const packageArtifacts = readJson("specs/001-product-ui-foundation/package-artifacts-audit.json");
const localReleaseManifest = readJson("specs/001-product-ui-foundation/local-release-manifest-audit.json");
const releasePolicy = readJson("specs/001-product-ui-foundation/release-policy-audit.json");
const consumerPackageSync = readJson("specs/001-product-ui-foundation/consumer-package-sync-audit.json");
const consumerVendorVersioning = readJson("specs/001-product-ui-foundation/consumer-vendor-versioning-audit.json");
const consumerConfigVersioning = readJson("specs/001-product-ui-foundation/consumer-config-versioning-audit.json");
const consumerIntegration = readJson("specs/001-product-ui-foundation/consumer-integration-audit.json");

const packageArtifactsPass = packageArtifacts.summary?.pass === true;
const localReleaseManifestPass = localReleaseManifest.status === "pass";
const sourceTarballsExist = packageRows.every((row) => row.tarballExists);
const packageMetadataPublishable = packageRows.every((row) => row.publishableMetadata);
const packageVersions = new Set(packageRows.map((row) => row.version));
const packageVersionsAligned = packageVersions.size === 1;
const localTarballChannelReady =
  packageArtifactsPass &&
  localReleaseManifestPass &&
  sourceTarballsExist &&
  packageMetadataPublishable &&
  packageVersionsAligned &&
  consumerPackageSync.status === "pass" &&
  consumerVendorVersioning.status === "pass" &&
  consumerConfigVersioning.status === "pass" &&
  consumerIntegration.packageStatus?.pass === true &&
  consumerIntegration.installedPackageStatus?.pass === true &&
  consumerIntegration.installedPackageContractStatus?.pass === true;

const registryBlockers = [
  ...(releasePolicy.registryBlockers ?? []),
  releasePolicy.status === "fail" ? "release policy contract is failing" : null
].filter(Boolean);

const registryReady = releasePolicy.registryReady === true && registryBlockers.length === 0;
const status = localTarballChannelReady
  ? registryReady
    ? "pass-registry-release-channel"
    : "pass-local-release-channel"
  : "fail";

const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  localTarballChannelReady,
  registryReady,
  packageArtifactsPass,
  localReleaseManifestPass,
  localReleaseManifestPath: localReleaseManifest.manifestPath,
  sourceTarballsExist,
  packageMetadataPublishable,
  packageVersionsAligned,
  currentVersion: packageRows[0]?.version ?? "",
  releasePolicyStatus: releasePolicy.status,
  releasePolicyPath: "specs/001-product-ui-foundation/contracts/release-policy.json",
  consumerPackageSyncStatus: consumerPackageSync.status,
  consumerVendorVersioningStatus: consumerVendorVersioning.status,
  consumerConfigVersioningStatus: consumerConfigVersioning.status,
  consumerInstalledPackageStatus: consumerIntegration.installedPackageStatus?.pass === true,
  consumerInstalledContractStatus: consumerIntegration.installedPackageContractStatus?.pass === true,
  registryBlockers,
  packageRows
};

const packageTable = packageRows
  .map((row) => `| \`${row.name}\` | \`${row.version}\` | ${row.private ? "yes" : "no"} | ${row.tarballExists ? "yes" : "no"} | ${row.registryVersionReady ? "yes" : "no"} |`)
  .join("\n");

const markdown = `# Release Channel Audit

Generated: ${report.generatedAt}

Status: ${status}

This report separates the current local install channel from a future registry publish channel. The local channel is enough for \`taliya-internal\` and for starting a real CRM app from vendored tarballs. Registry publication still needs explicit release decisions.

## Summary

- Local tarball channel ready: \`${localTarballChannelReady}\`
- Registry ready: \`${registryReady}\`
- Current package version: \`${report.currentVersion}\`
- Package artifacts pass: \`${packageArtifactsPass}\`
- Local release manifest pass: \`${localReleaseManifestPass}\`
- Local release manifest: \`${localReleaseManifest.manifestPath ?? "missing"}\`
- Release policy: \`${releasePolicy.status}\`
- Consumer package sync: \`${consumerPackageSync.status}\`
- Consumer vendor versioning: \`${consumerVendorVersioning.status}\`
- Consumer config versioning: \`${consumerConfigVersioning.status}\`
- Installed package status: \`${report.consumerInstalledPackageStatus}\`
- Installed contract status: \`${report.consumerInstalledContractStatus}\`

## Packages

| Package | Version | Private | Tarball exists | Registry version ready |
| --- | --- | --- | --- | --- |
${packageTable}

## Registry Blockers

${registryBlockers.map((item) => `- ${item}`).join("\n") || "- None"}

## Meaning

- \`pass-local-release-channel\`: consumers can install the official library through the current local tarball/vendor flow, and the Internal consumer evidence is synchronized.
- \`pass-registry-release-channel\`: the package set and release policy are ready for a registry-backed release channel too.
- \`fail\`: the current local install channel is not reliable enough for consumer adoption.
`;

if (check) {
  const nextJson = `${JSON.stringify(report, null, 2)}\n`;
  const existingJson = fs.existsSync(reportJsonPath) ? fs.readFileSync(reportJsonPath, "utf8") : "";
  const existingMd = fs.existsSync(reportMdPath) ? fs.readFileSync(reportMdPath, "utf8") : "";
  if (existingJson !== nextJson || existingMd !== markdown) {
    console.error("Release channel audit is stale. Run `corepack pnpm release-channel:audit:update`.");
    process.exit(1);
  }
}

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(reportMdPath, markdown);

if (status === "fail") {
  console.error("Release channel audit: fail");
  process.exit(1);
}

console.log(`Release channel audit: ${status}`);
