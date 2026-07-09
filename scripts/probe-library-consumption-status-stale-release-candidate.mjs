import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-library-consumption-stale-rc-probe-"));

function writeJson(name, value) {
  const path = join(tempDir, name);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
  return path;
}

function readinessFixture() {
  return {
    status: "pass",
    rows: [
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
    ].map((id) => ({ id, status: "pass" }))
  };
}

function consumerPageKitFixture() {
  return {
    summary: { pass: true },
    routeCoverage: {
      pass: true,
      discoveredRoutes: ["/internal", "/internal/landing", "/internal/leads", "/internal/leads/kanban"],
      uncoveredRoutes: []
    },
    routeRows: [
      { route: "/internal", pass: true, requiredStatus: [
        { componentName: "InternalShell", importFrom: "@/components/internal-shell", pass: true },
        { componentName: "CockpitWorkspace", importFrom: "@/features/internal/cockpit/cockpit-workspace", pass: true }
      ] },
      { route: "/internal/landing", pass: true, requiredStatus: [
        { componentName: "InternalShell", importFrom: "@/components/internal-shell", pass: true },
        { componentName: "LandingWorkspace", importFrom: "@/features/internal/landing/landing-workspace", pass: true }
      ] },
      { route: "/internal/leads", pass: true, requiredStatus: [
        { componentName: "InternalShell", importFrom: "@/components/internal-shell", pass: true },
        { componentName: "LeadsWorkspace", importFrom: "@/features/internal/leads/leads-workspace", pass: true }
      ] },
      { route: "/internal/leads/kanban", pass: true, requiredStatus: [
        { componentName: "InternalShell", importFrom: "@/components/internal-shell", pass: true },
        { componentName: "LeadsWorkspace", importFrom: "@/features/internal/leads/leads-workspace", pass: true }
      ] }
    ]
  };
}

const evidence = {
  readiness: writeJson("library-readiness-gate.json", readinessFixture()),
  releaseCandidate: writeJson("release-candidate-audit.json", {
    status: "pass",
    rows: [
      { id: "typecheck", status: "pass" },
      { id: "readiness", status: "pass" }
    ]
  }),
  acceptance: writeJson("library-acceptance-audit.json", {
    status: "pass-current-internal-library",
    currentInternalLibraryAccepted: true,
    globalGoalComplete: false
  }),
  goalCompletion: writeJson("goal-completion-audit.json", { verdict: "not-complete-globally" }),
  futureDiscovery: writeJson("future-consumer-discovery-audit.json", {
    status: "pass",
    futureCrmCandidateCount: 0
  }),
  futureAdoption: writeJson("future-consumer-adoption-audit.json", {
    status: "pass",
    futureCrmCandidateCount: 0,
    adoptedCandidateCount: 0
  }),
  publicApi: writeJson("public-api-audit.json", {
    requiredCount: 40,
    summary: { pass: true }
  }),
  consumerIntegration: writeJson("consumer-integration-audit.json", {
    summary: { pass: true },
    standardPageKitRuntimeStatus: { pass: true, count: 40 }
  }),
  consumerPageKit: writeJson("consumer-page-kit-audit.json", consumerPageKitFixture()),
  consumerRuntime: writeJson("consumer-runtime-audit.json", { status: "pass" }),
  consumerPackageSync: writeJson("consumer-package-sync-audit.json", { status: "pass" }),
  consumerVendorVersioning: writeJson("consumer-vendor-versioning-audit.json", { status: "pass" }),
  visualBacklog: writeJson("visual-certification-backlog-audit.json", {
    summary: { globallyIncompleteCount: 17 }
  })
};

const result = spawnSync(process.execPath, [
  "scripts/audit-library-consumption-status.mjs",
  "--check",
  "--report-label",
  "stale-rc-probe",
  "--out-dir",
  tempDir,
  "--readiness",
  evidence.readiness,
  "--release-candidate",
  evidence.releaseCandidate,
  "--acceptance",
  evidence.acceptance,
  "--goal-completion",
  evidence.goalCompletion,
  "--future-discovery",
  evidence.futureDiscovery,
  "--future-adoption",
  evidence.futureAdoption,
  "--public-api",
  evidence.publicApi,
  "--consumer-integration",
  evidence.consumerIntegration,
  "--consumer-page-kit",
  evidence.consumerPageKit,
  "--consumer-runtime",
  evidence.consumerRuntime,
  "--consumer-package-sync",
  evidence.consumerPackageSync,
  "--consumer-vendor-versioning",
  evidence.consumerVendorVersioning,
  "--visual-backlog",
  evidence.visualBacklog
], {
  cwd: root,
  env: { ...process.env, TALIYA_RELEASE_CANDIDATE_IN_PROGRESS: "" },
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected library consumption status to reject a stale release candidate without consumption gates, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Failed library consumption rows: technical-release-candidate")) {
  console.error("Expected failure output to name technical-release-candidate.");
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(tempDir, "library-consumption-status-stale-rc-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected stale release candidate probe to write its labeled report in the temp directory.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
if (report.status !== "fail" || report.technicalReleaseCandidatePass !== false || report.missingReleaseCandidateConsumptionGateIds.length === 0) {
  console.error("Expected stale release candidate evidence to produce a failing status report with missing gates.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Library consumption status stale-release-candidate probe passed.");
