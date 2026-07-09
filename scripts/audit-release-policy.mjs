import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const check = args.includes("--check");
function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function reportBasename(baseName) {
  const reportLabel = optionValue("--report-label", "");
  if (!reportLabel) return baseName;

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }

  return `${baseName}-${normalized}`;
}

const contractPath = path.resolve(root, optionValue("--contract", "specs/001-product-ui-foundation/contracts/release-policy.json"));
const contractMdPath = path.resolve(root, optionValue("--contract-md", "specs/001-product-ui-foundation/contracts/release-policy.md"));
const outputDir = path.resolve(root, optionValue("--out-dir", "specs/001-product-ui-foundation"));
const reportJsonPath = path.join(outputDir, `${reportBasename("release-policy-audit")}.json`);
const reportMdPath = path.join(outputDir, `${reportBasename("release-policy-audit")}.md`);
const existingReport = fs.existsSync(reportJsonPath) ? JSON.parse(fs.readFileSync(reportJsonPath, "utf8")) : null;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function relativeExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function packageVersion(relativePath) {
  const packageJson = readJson(path.join(root, relativePath));
  return typeof packageJson.version === "string" ? packageJson.version : "";
}

function row(id, pass, evidence, note) {
  return {
    id,
    status: pass ? "pass" : "fail",
    evidence,
    note
  };
}

const policy = fs.existsSync(contractPath) ? readJson(contractPath) : null;
const policyMarkdown = fs.existsSync(contractMdPath) ? fs.readFileSync(contractMdPath, "utf8") : "";
const requiredRegistryItems = [
  "semver-version",
  "registry-target-and-access",
  "controlled-publish-workflow",
  "consumer-dependency-migration"
];

const sourcePackageJsons = policy?.versioning?.sourcePackageJsons ?? [];
const packageVersions = sourcePackageJsons.map((filePath) => ({
  filePath,
  version: relativeExists(filePath) ? packageVersion(filePath) : ""
}));
const versionSet = new Set(packageVersions.map((item) => item.version).filter(Boolean));
const currentVersion = [...versionSet][0] ?? "";
const placeholderVersion = policy?.versioning?.placeholderVersion ?? "0.0.0";
const registryRequiredItems = policy?.registry?.requiredBeforePublish ?? [];
const missingRegistryItems = requiredRegistryItems.filter((item) => !registryRequiredItems.includes(item));

const rows = [
  row("contract-present", policy !== null, "contracts/release-policy.json", "release policy JSON contract exists"),
  row("contract-doc-present", policyMarkdown.includes("Release Policy Contract"), "contracts/release-policy.md", "release policy markdown contract exists"),
  row("schema-version", policy?.schemaVersion === 1, "contracts/release-policy.json", "schemaVersion must be 1"),
  row("current-channel", ["local-tarball", "registry"].includes(policy?.currentChannel), policy?.currentChannel ?? "missing", "current channel must be local-tarball or registry"),
  row(
    "local-manifest",
    typeof policy?.localTarball?.manifestPath === "string" && relativeExists(policy.localTarball.manifestPath),
    policy?.localTarball?.manifestPath ?? "missing",
    "current local channel must point at the generated local release manifest"
  ),
  row(
    "consumer-refresh-commands",
    policy?.localTarball?.refreshCommand === "corepack pnpm consumer-refresh:apply" &&
      policy?.localTarball?.auditCommand === "corepack pnpm consumer-refresh:audit",
    "contracts/release-policy.json",
    "local channel must name the official consumer refresh commands"
  ),
  row(
    "source-package-jsons",
    sourcePackageJsons.length === 3 && packageVersions.every((item) => item.version.length > 0),
    sourcePackageJsons.join(", ") || "missing",
    "release policy must cover tokens, ui, and crm package manifests"
  ),
  row(
    "package-versions-aligned",
    versionSet.size === 1 && packageVersions.length === 3,
    packageVersions.map((item) => `${item.filePath}=${item.version || "missing"}`).join(", "),
    "all public packages must share the same release version"
  ),
  row(
    "registry-required-items",
    missingRegistryItems.length === 0,
    registryRequiredItems.join(", ") || "missing",
    "registry gate must explicitly require semver, registry/access, controlled publish, and consumer migration decisions"
  ),
  row(
    "registry-status",
    ["not-configured", "configured"].includes(policy?.registry?.status),
    policy?.registry?.status ?? "missing",
    "registry status must be explicit"
  ),
  row(
    "consumer-migration-policy",
    policy?.consumerMigration?.currentMode === "vendor-local-tarballs" &&
      typeof policy?.consumerMigration?.registryMode === "string" &&
      policy?.consumerMigration?.mustKeepLocalAuditUntilRegistryAdoptionPasses === true,
    "contracts/release-policy.json",
    "consumer migration policy must preserve local audits until registry adoption passes"
  )
];

const contractPass = rows.every((item) => item.status === "pass");
const registryVersionReady =
  currentVersion.length > 0 &&
  currentVersion !== placeholderVersion &&
  policy?.versioning?.registryPublishRequiresNonPlaceholderVersion === true;
const registryDecisionReady =
  policy?.registry?.status === "configured" &&
  policy?.registry?.target !== "not-decided" &&
  policy?.registry?.access !== "not-decided" &&
  policy?.registry?.publishWorkflow !== "not-decided" &&
  policy?.consumerMigration?.registryMode !== "not-decided" &&
  policy?.consumerMigration?.registryRangePolicy !== "not-decided";
const registryReady = contractPass && registryVersionReady && registryDecisionReady;
const status = contractPass ? (registryReady ? "pass-registry-policy" : "pass-current-local-policy") : "fail";

const registryBlockers = [
  !registryVersionReady ? `packages still use placeholder version ${placeholderVersion}; choose a real semver release version` : null,
  policy?.registry?.target === "not-decided" || policy?.registry?.access === "not-decided"
    ? "registry target and access model are not configured in release policy"
    : null,
  policy?.registry?.publishWorkflow === "not-decided" ? "controlled publish/provenance workflow is not configured in release policy" : null,
  policy?.consumerMigration?.registryMode === "not-decided" || policy?.consumerMigration?.registryRangePolicy === "not-decided"
    ? "consumer dependency migration policy from local tarballs to registry ranges is not configured in release policy"
    : null
].filter(Boolean);

const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  contractPass,
  currentChannel: policy?.currentChannel ?? "missing",
  currentVersion,
  placeholderVersion,
  registryReady,
  registryVersionReady,
  registryDecisionReady,
  registryBlockers,
  packageVersions,
  rows
};

const table = rows
  .map((item) => `| \`${item.id}\` | ${item.status} | ${item.evidence} | ${item.note} |`)
  .join("\n");

const markdown = `# Release Policy Audit

Generated: ${report.generatedAt}

Status: ${status}

This audit validates the versioned release policy for the current local tarball channel and the future registry channel. It does not publish packages.

## Summary

- Current channel: \`${report.currentChannel}\`
- Current package version: \`${currentVersion || "missing"}\`
- Registry ready: \`${registryReady}\`
- Registry version ready: \`${registryVersionReady}\`
- Registry decision ready: \`${registryDecisionReady}\`

## Rows

| Area | Status | Evidence | Note |
| --- | --- | --- | --- |
${table}

## Registry Blockers

${registryBlockers.map((item) => `- ${item}`).join("\n") || "- None"}
`;

if (check) {
  const nextJson = `${JSON.stringify(report, null, 2)}\n`;
  const existingJson = fs.existsSync(reportJsonPath) ? fs.readFileSync(reportJsonPath, "utf8") : "";
  const existingMd = fs.existsSync(reportMdPath) ? fs.readFileSync(reportMdPath, "utf8") : "";
  if (existingJson !== nextJson || existingMd !== markdown) {
    console.error("Release policy audit is stale. Run `corepack pnpm release-policy:audit:update`.");
    process.exit(1);
  }
}

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(reportMdPath, markdown);

if (status === "fail") {
  console.error("Release policy audit: fail");
  process.exit(1);
}

console.log(`Release policy audit: ${status}`);
