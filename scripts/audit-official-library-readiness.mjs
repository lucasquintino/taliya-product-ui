import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "official-library-readiness-audit.json");
const reportMdPath = path.join(specDir, "official-library-readiness-audit.md");
const check = process.argv.includes("--check");
const releaseCandidateInProgress = process.env.TALIYA_RELEASE_CANDIDATE_IN_PROGRESS === "1";
const existingReport = fs.existsSync(reportJsonPath)
  ? JSON.parse(fs.readFileSync(reportJsonPath, "utf8"))
  : null;

const requiredReports = [
  { id: "aggregate-readiness", file: "library-readiness-gate.json", pass: (report) => report.status === "pass" },
  { id: "package-artifacts", file: "package-artifacts-audit.json", pass: (report) => report.summary?.pass === true },
  { id: "package-boundaries", file: "package-boundaries-audit.json", pass: (report) => report.summary?.pass === true },
  { id: "public-api", file: "public-api-audit.json", pass: (report) => report.summary?.pass === true },
  { id: "public-api-surface", file: "public-api-surface-audit.json", pass: (report) => report.status === "pass" },
  {
    id: "tokens",
    file: "token-governance-baseline.json",
    pass: (report) =>
      Object.keys(report.tokenSummary ?? {}).length > 0 &&
      !Object.hasOwn(report.tokenSummary ?? {}, "alias obrigatorio") &&
      !Object.hasOwn(report.tokenSummary ?? {}, "duplicado")
  },
  {
    id: "components",
    file: "component-architecture-audit.json",
    pass: (report) =>
      report.storyArchitecture?.invalidTitleCount === 0 &&
      report.storyArchitecture?.legacyBatchTitleCount === 0 &&
      report.crmPrimitiveReuse?.primitiveReuseClassification?.refactor === 0 &&
      report.crmPrimitiveReuse?.primitiveReuseClassification?.missingPrimitive === 0
  },
  { id: "library-consumption", file: "library-consumption-status.json", pass: (report) => report.status === "pass-current-internal-library" || report.status === "pass-global-goal" },
  { id: "crm-real-readiness", file: "crm-real-readiness-audit.json", pass: (report) => report.status === "pass-ready-to-start-crm-real" || report.status === "pass-global-crm-ready" },
  { id: "release-policy", file: "release-policy-audit.json", pass: (report) => report.status === "pass-current-local-policy" || report.status === "pass-registry-policy" },
  { id: "release-channel", file: "release-channel-audit.json", pass: (report) => report.status === "pass-local-release-channel" || report.status === "pass-registry-release-channel" },
  { id: "release-candidate", file: "release-candidate-audit.json", pass: (report) => report.status === "pass" },
  { id: "goal-completion", file: "goal-completion-audit.json", pass: (report) => report.verdict === "not-complete-globally" || report.verdict === "complete-globally" }
];

const packageSpecs = [
  {
    id: "tokens",
    dir: "packages/tokens",
    name: "@taliya/tokens",
    cssImport: '@taliya/tokens/tokens.css',
    requiredExports: [".", "./tokens.css"],
    requiredFiles: ["dist", "src/tokens.css"],
    requiredPeers: []
  },
  {
    id: "ui",
    dir: "packages/ui",
    name: "@taliya/ui",
    cssImport: '@taliya/ui/styles.css',
    requiredExports: [".", "./styles.css"],
    requiredFiles: ["dist", "src/styles.css"],
    requiredPeers: ["react", "react-dom"]
  },
  {
    id: "crm",
    dir: "packages/crm",
    name: "@taliya/crm",
    cssImport: '@taliya/crm/styles.css',
    requiredExports: [".", "./standard-page-kit", "./styles.css"],
    requiredFiles: ["dist", "src/styles.css"],
    requiredPeers: ["react", "react-dom"]
  }
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function readTextIfExists(relativePath) {
  const filePath = path.join(root, relativePath);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function statusLabel(pass) {
  return pass ? "pass" : "fail";
}

function compactRows(rows) {
  return rows.map((row) => ({
    id: row.id,
    status: row.status,
    evidence: row.evidence,
    note: row.note
  }));
}

const reportRows = requiredReports.map((requirement) => {
  const reportPath = path.join(specDir, requirement.file);
  if (!fs.existsSync(reportPath)) {
    return {
      id: requirement.id,
      status: "fail",
      evidence: requirement.file,
      note: "required report is missing"
    };
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const pass = requirement.id === "release-candidate" && releaseCandidateInProgress ? true : requirement.pass(report);

  return {
    id: requirement.id,
    status: statusLabel(pass),
    evidence: requirement.file,
    note: pass ? "required gate report is in an accepted state" : "required gate report is not in an accepted state"
  };
});

const packageRows = packageSpecs.map((spec) => {
  const packageJson = readJson(`${spec.dir}/package.json`);
  const readme = readTextIfExists(`${spec.dir}/README.md`);
  const exportsMap = packageJson.exports ?? {};
  const files = packageJson.files ?? [];
  const peerDependencies = packageJson.peerDependencies ?? {};
  const missingExports = spec.requiredExports.filter((entry) => !Object.hasOwn(exportsMap, entry));
  const missingFiles = spec.requiredFiles.filter((entry) => !files.includes(entry));
  const missingPeers = spec.requiredPeers.filter((entry) => typeof peerDependencies[entry] !== "string");
  const missingReadmeSnippets = [
    spec.name,
    spec.cssImport
  ].filter((snippet) => !readme.includes(snippet));

  const pass =
    packageJson.name === spec.name &&
    packageJson.private !== true &&
    typeof packageJson.version === "string" &&
    packageJson.version.length > 0 &&
    typeof packageJson.main === "string" &&
    typeof packageJson.module === "string" &&
    typeof packageJson.types === "string" &&
    Array.isArray(packageJson.sideEffects) &&
    packageJson.sideEffects.some((entry) => typeof entry === "string" && entry.includes(".css")) &&
    missingExports.length === 0 &&
    missingFiles.length === 0 &&
    missingPeers.length === 0 &&
    missingReadmeSnippets.length === 0;

  return {
    id: spec.id,
    packageName: spec.name,
    status: statusLabel(pass),
    version: packageJson.version,
    missingExports,
    missingFiles,
    missingPeers,
    missingReadmeSnippets,
    note: pass ? "package metadata supports official consumer installation" : "package metadata has consumer-facing gaps"
  };
});

const packageVersions = new Set(packageRows.map((row) => row.version));
const consistentPackageVersion = packageVersions.size === 1;
const currentVersion = [...packageVersions][0] ?? "";
const registryManualItems = [
  currentVersion === "0.0.0" ? "Choose a real semver version before publishing to a registry." : null,
  "Choose the target registry and access model before publishing.",
  "Run npm provenance/publish steps from CI or a controlled release machine.",
  "Tag the release and sync the consumer vendor tarballs or registry ranges intentionally."
].filter(Boolean);

const crmReadiness = readJson("specs/001-product-ui-foundation/crm-real-readiness-audit.json");
const libraryConsumption = readJson("specs/001-product-ui-foundation/library-consumption-status.json");
const releaseChannel = readJson("specs/001-product-ui-foundation/release-channel-audit.json");
const releasePolicy = readJson("specs/001-product-ui-foundation/release-policy-audit.json");
const releaseCandidate = readJson("specs/001-product-ui-foundation/release-candidate-audit.json");
const goalCompletion = readJson("specs/001-product-ui-foundation/goal-completion-audit.json");

const officialConsumerReady =
  reportRows.every((row) => row.status === "pass") &&
  packageRows.every((row) => row.status === "pass") &&
  consistentPackageVersion &&
  crmReadiness.crmRealCanStart === true &&
  libraryConsumption.currentInternalLibraryAccepted === true;

const globalGoalComplete = goalCompletion.verdict === "complete-globally";
const status = officialConsumerReady
  ? globalGoalComplete
    ? "pass-official-library-global"
    : "pass-official-library-current-scope"
  : "fail";

const report = {
  generatedAt: check && existingReport?.generatedAt ? existingReport.generatedAt : new Date().toISOString(),
  status,
  officialConsumerReady,
  globalGoalComplete,
  currentVersion,
  consistentPackageVersion,
  currentInternalReady: crmReadiness.currentInternalReady === true,
  crmRealCanStart: crmReadiness.crmRealCanStart === true,
  realFutureCrmAdoptionExecuted: crmReadiness.realFutureCrmAdoptionExecuted === true,
  releaseCandidateStatus: releaseCandidate.status,
  releaseCandidateGateCount: releaseCandidate.rows?.length ?? 0,
  releaseChannelStatus: releaseChannel.status,
  releasePolicyStatus: releasePolicy.status,
  localTarballChannelReady: releaseChannel.localTarballChannelReady === true,
  registryReady: releaseChannel.registryReady === true,
  registryManualItems,
  reportRows: compactRows(reportRows),
  packageRows
};

const tableRows = [
  ...reportRows.map((row) => `| \`${row.id}\` | ${row.status} | ${row.evidence} | ${row.note} |`),
  ...packageRows.map((row) => {
    const missing = [
      row.missingExports.length ? `exports: ${row.missingExports.join(", ")}` : null,
      row.missingFiles.length ? `files: ${row.missingFiles.join(", ")}` : null,
      row.missingPeers.length ? `peers: ${row.missingPeers.join(", ")}` : null,
      row.missingReadmeSnippets.length ? `README: ${row.missingReadmeSnippets.join(", ")}` : null
    ].filter(Boolean).join("; ");
    return `| \`${row.packageName}\` | ${row.status} | ${row.version} | ${missing || row.note} |`;
  })
];

const markdown = `# Official Library Readiness Audit

Generated: ${report.generatedAt}

Status: ${status}

This report answers whether \`taliya-product-ui\` is ready to act as the official reusable library for consumers. It is stricter than a single package build and broader than Internal-only adoption: it joins package metadata, package gates, public API, current Internal consumption, CRM real readiness, release-candidate evidence, and the global-goal caveat.

## Summary

- Official consumer ready: \`${officialConsumerReady}\`
- Current Internal ready: \`${report.currentInternalReady}\`
- CRM real can start: \`${report.crmRealCanStart}\`
- Real future CRM adoption executed: \`${report.realFutureCrmAdoptionExecuted}\`
- Global goal complete: \`${globalGoalComplete}\`
- Package version: \`${currentVersion}\`
- Release-candidate gates: \`${report.releaseCandidateGateCount}\`
- Release channel: \`${report.releaseChannelStatus}\`
- Release policy: \`${report.releasePolicyStatus}\`
- Local tarball channel ready: \`${report.localTarballChannelReady}\`
- Registry ready: \`${report.registryReady}\`

## Gate Rows

| Area | Status | Evidence | Note |
| --- | --- | --- | --- |
${tableRows.join("\n")}

## Registry Manual Items

${registryManualItems.map((item) => `- ${item}`).join("\n")}

## Meaning

When this report is \`pass-official-library-current-scope\`, the library is ready to be consumed by \`taliya-internal\` and to start the real CRM with official components, but the persistent global goal is still open until a real future CRM consumer runs labeled adoption gates. When it becomes \`pass-official-library-global\`, the future CRM has also executed adoption evidence.
`;

if (check) {
  const existingJson = fs.existsSync(reportJsonPath) ? fs.readFileSync(reportJsonPath, "utf8") : "";
  const existingMd = fs.existsSync(reportMdPath) ? fs.readFileSync(reportMdPath, "utf8") : "";
  const nextJson = `${JSON.stringify(report, null, 2)}\n`;
  if (existingJson !== nextJson || existingMd !== markdown) {
    console.error("Official library readiness audit is stale. Run `corepack pnpm official-library-readiness:audit:update`.");
    process.exit(1);
  }
}

if (!check) {
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(reportMdPath, markdown);
}

if (status === "fail") {
  console.error("Official library readiness audit: fail");
  process.exit(1);
}

console.log(`Official library readiness audit: ${status}`);
