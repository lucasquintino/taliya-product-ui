import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const args = process.argv.slice(2);
const releaseCandidateInProgress = process.env.TALIYA_RELEASE_CANDIDATE_IN_PROGRESS === "1";

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function normalizedReportLabel() {
  const reportLabel = optionValue("--report-label", "");
  if (!reportLabel) return "";

  const normalized = reportLabel.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!normalized) {
    throw new Error("--report-label must contain at least one letter or number");
  }

  return normalized;
}

function reportBasename(baseName) {
  const normalized = normalizedReportLabel();
  return normalized ? `${baseName}-${normalized}` : baseName;
}

function resolveInputPath(value) {
  return resolve(root, value);
}

function readJson(inputPath) {
  const absolutePath = resolveInputPath(inputPath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required report: ${inputPath}`);
  }

  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

const evidenceSources = {
  readiness: optionValue("--readiness", "specs/001-product-ui-foundation/library-readiness-gate.json"),
  releaseCandidate: optionValue("--release-candidate", "specs/001-product-ui-foundation/release-candidate-audit.json"),
  acceptance: optionValue("--acceptance", "specs/001-product-ui-foundation/library-acceptance-audit.json"),
  goalCompletion: optionValue("--goal-completion", "specs/001-product-ui-foundation/goal-completion-audit.json"),
  futureDiscovery: optionValue("--future-discovery", "specs/001-product-ui-foundation/future-consumer-discovery-audit.json"),
  futureAdoption: optionValue("--future-adoption", "specs/001-product-ui-foundation/future-consumer-adoption-audit.json"),
  publicApi: optionValue("--public-api", "specs/001-product-ui-foundation/public-api-audit.json"),
  consumerIntegration: optionValue("--consumer-integration", "specs/001-product-ui-foundation/consumer-integration-audit.json"),
  consumerPageKit: optionValue("--consumer-page-kit", "specs/001-product-ui-foundation/consumer-page-kit-audit.json"),
  consumerRuntime: optionValue("--consumer-runtime", "specs/001-product-ui-foundation/consumer-runtime-audit.json"),
  consumerPackageSync: optionValue("--consumer-package-sync", "specs/001-product-ui-foundation/consumer-package-sync-audit.json"),
  consumerVendorVersioning: optionValue("--consumer-vendor-versioning", "specs/001-product-ui-foundation/consumer-vendor-versioning-audit.json"),
  visualBacklog: optionValue("--visual-backlog", "specs/001-product-ui-foundation/visual-certification-backlog-audit.json")
};

const readiness = readJson(evidenceSources.readiness);
const releaseCandidate = readJson(evidenceSources.releaseCandidate);
const acceptance = readJson(evidenceSources.acceptance);
const goalCompletion = readJson(evidenceSources.goalCompletion);
const futureDiscovery = readJson(evidenceSources.futureDiscovery);
const futureAdoption = readJson(evidenceSources.futureAdoption);
const publicApi = readJson(evidenceSources.publicApi);
const consumerIntegration = readJson(evidenceSources.consumerIntegration);
const consumerPageKit = readJson(evidenceSources.consumerPageKit);
const consumerRuntime = readJson(evidenceSources.consumerRuntime);
const consumerPackageSync = readJson(evidenceSources.consumerPackageSync);
const consumerVendorVersioning = readJson(evidenceSources.consumerVendorVersioning);
const visualBacklog = readJson(evidenceSources.visualBacklog);

const requiredReadinessGateIds = [
  "tokens",
  "components",
  "domain-wrappers",
  "domain-wrappers-direct-drawer-probe",
  "public-api",
  "package-boundaries",
  "package-artifacts",
  "consumer-starter-templates",
  "consumer-starter-templates-route-contract-probe",
  "consumer-bootstrap",
  "future-consumer-fixture",
  "future-consumer-discovery",
  "future-consumer-discovery-negative-probe",
  "future-consumer-discovery-partial-probe",
  "future-consumer-discovery-positive-probe",
  "future-consumer-adoption",
  "future-consumer-adoption-positive-probe",
  "future-consumer-adoption-mismatch-probe",
  "future-consumer-adoption-negative-probe",
  "future-crm-adoption-handoff",
  "consumer-integration",
  "consumer-package-sync",
  "consumer-package-sync-negative-probe",
  "consumer-vendor-versioning",
  "consumer-page-kit",
  "consumer-page-kit-shell-only-route-probe",
  "consumer-page-kit-wrapper-contract-probe",
  "consumer-page-kit-route-wrapper-contract-probe",
  "consumer-page-kit-mismatched-route-contract-probe",
  "consumer-page-kit-default-identifier-route-probe",
  "consumer-page-kit-path-traversal-probe",
  "consumer-readiness-config-path-traversal-probe",
  "consumer-runtime",
  "consumer-config-versioning",
  "local-readiness-runbook",
  "certification-scope",
  "certification-scope-positive-probe",
  "certification-scope-negative-probe",
  "visual-certification-backlog",
  "visual-certification-plan",
  "visual-certification-plan-negative-probe",
  "goal-completion"
];
const readinessRows = Array.isArray(readiness.rows) ? readiness.rows : [];
const missingReadinessGateIds = requiredReadinessGateIds.filter(
  (id) => !readinessRows.some((row) => row.id === id && row.status === "pass")
);
const readinessPass = readiness.status === "pass" && missingReadinessGateIds.length === 0;
const requiredReleaseCandidateConsumptionGateIds = [
  "library-consumption-status-update",
  "library-consumption-status",
  "library-consumption-status-positive-probe",
  "library-consumption-status-global-complete-probe",
  "library-consumption-status-stale-release-probe",
  "library-consumption-status-stale-readiness-probe",
  "library-consumption-status-negative-probe"
];
const requiredReleaseCandidateFutureCrmGateIds = [
  "domain-wrappers",
  "domain-wrappers-direct-drawer-probe",
  "consumer-starter-templates-route-contract-probe",
  "future-consumer-discovery",
  "future-consumer-discovery-negative-probe",
  "future-consumer-discovery-partial-probe",
  "future-consumer-discovery-positive-probe",
  "future-consumer-adoption",
  "future-consumer-adoption-positive-probe",
  "future-consumer-adoption-mismatch-probe",
  "future-consumer-adoption-negative-probe",
  "future-crm-adoption-handoff"
];
const releaseCandidateRows = Array.isArray(releaseCandidate.rows) ? releaseCandidate.rows : [];
function missingReleaseCandidateGateIds(requiredIds) {
  return requiredIds.filter(
  (id) => !releaseCandidateRows.some((row) => row.id === id && row.status === "pass")
  );
}

const rawMissingReleaseCandidateConsumptionGateIds = missingReleaseCandidateGateIds(requiredReleaseCandidateConsumptionGateIds);
const rawMissingReleaseCandidateFutureCrmGateIds = missingReleaseCandidateGateIds(requiredReleaseCandidateFutureCrmGateIds);
const missingReleaseCandidateConsumptionGateIds = releaseCandidateInProgress
  ? []
  : rawMissingReleaseCandidateConsumptionGateIds;
const missingReleaseCandidateFutureCrmGateIds = releaseCandidateInProgress
  ? []
  : rawMissingReleaseCandidateFutureCrmGateIds;
const releaseCandidatePass =
  releaseCandidateInProgress ||
  (releaseCandidate.status === "pass" &&
    missingReleaseCandidateConsumptionGateIds.length === 0 &&
    missingReleaseCandidateFutureCrmGateIds.length === 0);
const acceptancePass =
  acceptance.status === "pass-current-internal-library" &&
  acceptance.currentInternalLibraryAccepted === true;
const globalGoalComplete = acceptance.globalGoalComplete === true || goalCompletion.verdict === "complete";
const futureCrmExecuted =
  futureAdoption.futureCrmCandidateCount > 0 &&
  futureAdoption.adoptedCandidateCount === futureAdoption.futureCrmCandidateCount;
const currentInternalConsumptionPass =
  consumerIntegration.summary?.pass === true &&
  consumerPageKit.summary?.pass === true &&
  consumerRuntime.status === "pass" &&
  consumerPackageSync.status === "pass" &&
  consumerVendorVersioning.status === "pass";
const internalRouteWorkspaceRows = (consumerPageKit.routeRows ?? []).map((row) => {
  const localRows = row.requiredStatus?.filter((statusRow) => typeof statusRow.importFrom === "string") ?? [];
  const hasShell = localRows.some((statusRow) => statusRow.componentName === "InternalShell" && statusRow.pass);
  const workspaceRows = localRows.filter((statusRow) => statusRow.componentName !== "InternalShell");
  return {
    route: row.route,
    workspaceComponents: workspaceRows.map((statusRow) => statusRow.componentName),
    pass: row.pass && hasShell && workspaceRows.length > 0 && workspaceRows.every((statusRow) => statusRow.pass)
  };
});
const internalRouteWorkspacePass =
  consumerPageKit.summary?.pass === true &&
  internalRouteWorkspaceRows.length > 0 &&
  internalRouteWorkspaceRows.every((row) => row.pass);
const publicPageKitPass =
  publicApi.summary?.pass === true &&
  (consumerIntegration.standardPageKitRuntimeStatus?.pass ?? false) === true;

const rows = [
  {
    id: "current-internal-accepted",
    status: acceptancePass ? "pass" : "fail",
    evidence: "library-acceptance-audit.json",
    meaning: "Current Internal can use taliya-product-ui as the official reusable UI library."
  },
  {
    id: "current-internal-consuming-official-kit",
    status: currentInternalConsumptionPass ? "pass" : "fail",
    evidence: "consumer integration/page-kit/runtime/package-sync/vendor-versioning audits",
    meaning: "Internal consumes official shell, filters, table, drawer, kanban/page-kit roots without local visual clones."
  },
  {
    id: "current-internal-routes-render-workspaces",
    status: internalRouteWorkspacePass ? "pass" : "fail",
    evidence: "consumer-page-kit-audit.json route requiredLocalComponents",
    meaning: "Every discovered Internal route renders InternalShell plus its local workspace wrapper, so shell-only route regressions fail."
  },
  {
    id: "public-page-kit-runtime",
    status: publicPageKitPass ? "pass" : "fail",
    evidence: "@taliya/crm and @taliya/crm/standard-page-kit runtime manifest audits",
    meaning: "Consumers can discover the standard page kit from the installed package."
  },
  {
    id: "technical-release-candidate",
    status: releaseCandidatePass ? "pass" : "fail",
    evidence: "release-candidate-audit.json",
    meaning: releaseCandidatePass
      ? "The current package/readiness/release gate bundle is green and includes compact consumption-status and future CRM process gates."
      : `Release candidate is missing required gates: ${[...missingReleaseCandidateConsumptionGateIds, ...missingReleaseCandidateFutureCrmGateIds].join(", ")}.`
  },
  {
    id: "aggregate-readiness",
    status: readinessPass ? "pass" : "fail",
    evidence: "library-readiness-gate.json",
    meaning: readinessPass
      ? "The aggregate package, consumer, future-fixture, and governance gates are green."
      : `Readiness is missing required gates: ${missingReadinessGateIds.join(", ")}.`
  },
  {
    id: "future-crm-process",
    status: futureAdoption.status === "pass" && futureDiscovery.status === "pass" ? "pass" : "fail",
    evidence: "future-consumer-discovery-audit.json and future-consumer-adoption-audit.json",
    meaning: "Future CRM discovery/adoption process is executable and guarded."
  },
  {
    id: "future-crm-real-adoption",
    status: futureCrmExecuted ? "pass" : "not-executed",
    evidence: "matching labeled readiness report for a discovered future CRM candidate",
    meaning: "A real future CRM app has adopted the library."
  },
  {
    id: "global-goal",
    status: globalGoalComplete ? "pass" : "not-complete-globally",
    evidence: "goal-completion-audit.json and library-acceptance-audit.json",
    meaning: "The persistent goal is fully complete, including future CRM adoption."
  }
];

const failedRows = rows.filter((row) => row.status === "fail");
const reportStatus = failedRows.length > 0
  ? "fail"
  : globalGoalComplete
    ? "pass-global-goal"
    : "pass-current-internal-library";
const report = {
  generatedAt: new Date().toISOString(),
  status: reportStatus,
  currentInternalLibraryAccepted: acceptancePass,
  currentInternalConsumptionPass,
  internalRouteWorkspacePass,
  publicPageKitPass,
  technicalReleaseCandidatePass: releaseCandidatePass,
  aggregateReadinessPass: readinessPass,
  futureCrmProcessPass: futureAdoption.status === "pass" && futureDiscovery.status === "pass",
  futureCrmRealAdoptionExecuted: futureCrmExecuted,
  globalGoalComplete,
  counts: {
    standardPageKitComponents: publicApi.requiredCount ?? publicApi.required?.length ?? 0,
    standardPageKitRuntimeComponents: consumerIntegration.standardPageKitRuntimeStatus?.count ?? 0,
    internalCoveredRoutes: consumerPageKit.routeCoverage?.discoveredRoutes?.length ?? 0,
    internalRouteWorkspaceRoutes: internalRouteWorkspaceRows.filter((row) => row.pass).length,
    futureCrmCandidateCount: futureDiscovery.futureCrmCandidateCount ?? 0,
    adoptedFutureCrmCandidateCount: futureAdoption.adoptedCandidateCount ?? 0,
    visualCertificationIncompleteRows: visualBacklog.summary?.globallyIncompleteCount ?? 0
  },
  requiredReleaseCandidateConsumptionGateIds,
  missingReleaseCandidateConsumptionGateIds,
  requiredReleaseCandidateFutureCrmGateIds,
  missingReleaseCandidateFutureCrmGateIds,
  requiredReadinessGateIds,
  missingReadinessGateIds,
  rows,
  internalRouteWorkspaceRows,
  nextActions: globalGoalComplete
    ? ["Keep the release/readiness gates green as components evolve."]
    : [
        futureCrmExecuted
          ? "Future CRM adoption evidence exists; keep it refreshed after package changes."
          : "Create or connect the real future CRM app, bootstrap consumer configs/starter files, then run labeled readiness evidence for that app.",
        "Keep using library-acceptance:audit for current Internal/library acceptance, not as proof of global completion.",
        "Continue source-image visual certification separately when the chosen scope requires full 1:1 parity."
      ],
  evidenceFiles: [
    "specs/001-product-ui-foundation/library-consumption-status.md",
    "specs/001-product-ui-foundation/library-readiness-gate.md",
    "specs/001-product-ui-foundation/release-candidate-audit.md",
    "specs/001-product-ui-foundation/library-acceptance-audit.md",
    "specs/001-product-ui-foundation/goal-completion-audit.md",
    "specs/001-product-ui-foundation/future-crm-adoption-handoff.md"
  ]
};

const markdownRows = rows
  .map((row) => `| \`${row.id}\` | ${row.status} | ${row.evidence} | ${row.meaning} |`)
  .join("\n");

const md = `# Library Consumption Status

Generated: ${report.generatedAt}

Status: ${report.status}

This report is the quick current-state answer for whether \`taliya-product-ui\` can be consumed as the official reusable UI library. It does not replace source-image 1:1 visual certification and does not claim real future CRM adoption when no real future CRM app has run labeled gates.

## Summary

- Current Internal/library accepted: \`${report.currentInternalLibraryAccepted}\`
- Current Internal consumes official kit: \`${report.currentInternalConsumptionPass}\`
- Internal routes render shell + workspace: \`${report.internalRouteWorkspacePass}\`
- Public page-kit runtime manifest works: \`${report.publicPageKitPass}\`
- Technical release candidate passed: \`${report.technicalReleaseCandidatePass}\`
- Aggregate readiness passed: \`${report.aggregateReadinessPass}\`
- Missing readiness gates: ${report.missingReadinessGateIds.length === 0 ? "`none`" : report.missingReadinessGateIds.map((id) => `\`${id}\``).join(", ")}
- Future CRM process passed: \`${report.futureCrmProcessPass}\`
- Future CRM real adoption executed: \`${report.futureCrmRealAdoptionExecuted}\`
- Global goal complete: \`${report.globalGoalComplete}\`

## Counts

- Standard page-kit components: ${report.counts.standardPageKitComponents}
- Runtime manifest components: ${report.counts.standardPageKitRuntimeComponents}
- Internal covered routes: ${report.counts.internalCoveredRoutes}
- Internal routes with shell + workspace: ${report.counts.internalRouteWorkspaceRoutes}
- Future CRM candidates discovered: ${report.counts.futureCrmCandidateCount}
- Future CRM candidates adopted: ${report.counts.adoptedFutureCrmCandidateCount}
- Visual certification incomplete rows: ${report.counts.visualCertificationIncompleteRows}

## Status Rows

| Area | Status | Evidence | Meaning |
| --- | --- | --- | --- |
${markdownRows}

## Next Actions

${report.nextActions.map((item) => `- ${item}`).join("\n")}

## Evidence Files

${report.evidenceFiles.map((item) => `- \`${item}\``).join("\n")}
`;

const outputDir = resolve(root, optionValue("--out-dir", "specs/001-product-ui-foundation"));
const persistReports = !checkMode || outputDir !== resolve(root, "specs/001-product-ui-foundation");
const reportBaseName = reportBasename("library-consumption-status");
if (persistReports) {
  writeFileSync(resolve(outputDir, `${reportBaseName}.json`), `${JSON.stringify({ ...report, evidenceSources }, null, 2)}\n`);
  writeFileSync(resolve(outputDir, `${reportBaseName}.md`), md);
}

console.log(`Library consumption status: ${report.status}`);
console.log(`Wrote ${reportBaseName}.md`);
console.log(`Wrote ${reportBaseName}.json`);

if (checkMode && failedRows.length > 0) {
  console.error(`Failed library consumption rows: ${failedRows.map((row) => row.id).join(", ")}`);
  process.exit(1);
}
