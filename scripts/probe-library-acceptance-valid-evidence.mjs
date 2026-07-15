import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-library-acceptance-valid-probe-"));

const internalRequirements = [
  ["Standalone package structure for tokens, primitives, and CRM compositions", "proven"],
  ["Installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented local package artifacts", "proven"],
  ["Public page kit exported, story-covered, and documented", "proven-for-current-kit"],
  ["Runtime standard page-kit manifest is available to consumers", "proven-for-current-internal-and-fixtures"],
  ["Component architecture supports reuse", "proven-for-current-scope"],
  ["Token governance and no new visual debt", "proven-for-current-token-css-surface"],
  ["Taliya Internal declares and installs official packages", "proven-for-current-internal"],
  ["Taliya Internal avoids active local visual clones", "proven-for-current-internal"],
  ["Taliya Internal uses official shell, filters, tables, kanban, drawers, panels, and state primitives", "proven-for-current-internal"],
  ["Taliya Internal route pages are fully covered by the official page-kit adoption map", "proven-for-current-internal"],
  ["Taliya Internal owns the same consumer readiness config model future CRM will use", "proven-for-current-internal"],
  ["Taliya Internal consumer readiness configs are versioned in the consumer repository", "proven-for-current-internal"],
  ["Internal runtime still works after migration", "proven-for-current-internal"]
];

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
  requirements: internalRequirements.map(([requirement, status]) => ({ requirement, status }))
});
const readinessPath = writeJson("library-readiness-gate.json", { status: "pass" });
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
    globallyIncompleteCount: 17
  }
});

const result = spawnSync(process.execPath, [
  "scripts/audit-library-acceptance.mjs",
  "--check",
  "--report-label",
  "positive-probe",
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

if (result.status !== 0) {
  console.error("Expected library acceptance audit to accept valid Internal/library evidence, but it failed.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Library acceptance audit: pass-current-internal-library")) {
  console.error("Expected valid evidence output to include pass-current-internal-library.");
  console.error(output.trim());
  process.exit(1);
}

const labeledReportPath = join(tempDir, "library-acceptance-audit-positive-probe.json");
if (!existsSync(labeledReportPath)) {
  console.error("Expected positive probe to write its own labeled report.");
  process.exit(1);
}
const labeledReport = JSON.parse(readFileSync(labeledReportPath, "utf8"));
if (labeledReport.evidenceSources?.goalCompletion !== goalCompletionPath || labeledReport.evidenceSources?.readiness !== readinessPath) {
  console.error("Expected positive probe report to reference temporary evidence sources.");
  process.exit(1);
}

console.log("Library acceptance valid-evidence probe passed.");
