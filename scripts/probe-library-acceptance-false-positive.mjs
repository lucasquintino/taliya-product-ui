import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-library-acceptance-probe-"));

function writeJson(name, value) {
  const path = join(tempDir, name);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
  return path;
}

const goalCompletionPath = writeJson("goal-completion-audit.json", {
  verdict: "not-complete-globally",
  summary: {
    currentInternalReadiness: "proven",
    futureCrmAdoption: "not-executed",
    globalSourceImageParity: "not-proven"
  },
  requirements: [
    {
      requirement: "Standalone package structure for tokens, primitives, and CRM compositions",
      status: "proven"
    },
    {
      requirement: "Installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented local package artifacts",
      status: "proven"
    },
    {
      requirement: "Public page kit exported, story-covered, and documented",
      status: "proven-for-current-kit"
    },
    {
      requirement: "Runtime standard page-kit manifest is available to consumers",
      status: "proven-for-current-internal-and-fixtures"
    },
    {
      requirement: "Component architecture supports reuse",
      status: "proven-for-current-scope"
    },
    {
      requirement: "Token governance and no new visual debt",
      status: "proven-for-current-token-css-surface"
    },
    {
      requirement: "Taliya Internal declares and installs official packages",
      status: "failed"
    },
    {
      requirement: "Taliya Internal avoids active local visual clones",
      status: "proven-for-current-internal"
    },
    {
      requirement: "Taliya Internal uses official shell, filters, tables, kanban, drawers, panels, and state primitives",
      status: "proven-for-current-internal"
    },
    {
      requirement: "Taliya Internal route pages are fully covered by the official page-kit adoption map",
      status: "proven-for-current-internal"
    },
    {
      requirement: "Taliya Internal owns the same consumer readiness config model future CRM will use",
      status: "proven-for-current-internal"
    },
    {
      requirement: "Taliya Internal consumer readiness configs are versioned in the consumer repository",
      status: "proven-for-current-internal"
    },
    {
      requirement: "Internal runtime still works after migration",
      status: "proven-for-current-internal"
    }
  ]
});
const readinessPath = writeJson("library-readiness-gate.json", { status: "fail" });
const futureConsumerAdoptionPath = writeJson("future-consumer-adoption-audit.json", {
  status: "pass",
  futureCrmCandidateCount: 0,
  adoptedCandidateCount: 0
});
const certificationScopePath = writeJson("certification-scope-decision-audit.json", {
  status: "pass",
  scopedCompletionAccepted: false
});
const visualBacklogPath = writeJson("visual-certification-backlog-audit.json", {
  visualCertificationStatus: "incomplete",
  summary: {
    globallyIncompleteCount: 1
  }
});

const result = spawnSync(process.execPath, [
  "scripts/audit-library-acceptance.mjs",
  "--check",
  "--report-label",
  "negative-probe",
  "--out-dir",
  tempDir,
  "--goal-completion",
  goalCompletionPath,
  "--readiness",
  readinessPath,
  "--future-consumer-adoption",
  futureConsumerAdoptionPath,
  "--certification-scope",
  certificationScopePath,
  "--visual-backlog",
  visualBacklogPath
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected library acceptance audit to reject false-positive evidence, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Library acceptance audit: fail")) {
  console.error("Expected failure output to include library acceptance audit failure.");
  console.error(output.trim());
  process.exit(1);
}

const labeledReportPath = join(tempDir, "library-acceptance-audit-negative-probe.json");
if (!existsSync(labeledReportPath)) {
  console.error("Expected negative probe to write its own labeled report.");
  process.exit(1);
}
const labeledReport = JSON.parse(readFileSync(labeledReportPath, "utf8"));
if (labeledReport.evidenceSources?.goalCompletion !== goalCompletionPath || labeledReport.evidenceSources?.readiness !== readinessPath) {
  console.error("Expected negative probe report to reference temporary evidence sources.");
  process.exit(1);
}

console.log("Library acceptance false-positive probe passed.");
