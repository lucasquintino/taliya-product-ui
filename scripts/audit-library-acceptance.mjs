import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function normalizeLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function reportBasename(baseName, label) {
  if (!label) return baseName;
  const normalized = normalizeLabel(label);
  if (!normalized) {
    console.error("--report-label must contain at least one letter or number");
    process.exit(1);
  }
  return `${baseName}-${normalized}`;
}

function readJson(relativePath) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    throw new Error(`Missing required evidence file: ${relativePath}`);
  }

  return JSON.parse(readFileSync(path, "utf8"));
}

function requirementStatus(goalCompletion, requirementText) {
  return goalCompletion.requirements?.find((row) => row.requirement === requirementText)?.status ?? "missing";
}

function isSatisfiedForInternal(status) {
  return ["proven", "proven-for-current-kit", "proven-for-current-scope", "proven-for-current-token-css-surface", "proven-for-current-internal", "proven-for-current-internal-and-fixtures"].includes(status);
}

function markdownStatus(value) {
  return value ? "pass" : "fail";
}

let report;
try {
  const evidenceSources = {
    goalCompletion: optionValue("--goal-completion", "specs/001-product-ui-foundation/goal-completion-audit.json"),
    readiness: optionValue("--readiness", "specs/001-product-ui-foundation/library-readiness-gate.json"),
    futureConsumerAdoption: optionValue("--future-consumer-adoption", "specs/001-product-ui-foundation/future-consumer-adoption-audit.json"),
    certificationScope: optionValue("--certification-scope", "specs/001-product-ui-foundation/certification-scope-decision-audit.json"),
    visualBacklog: optionValue("--visual-backlog", "specs/001-product-ui-foundation/visual-certification-backlog-audit.json")
  };
  const goalCompletion = readJson(evidenceSources.goalCompletion);
  const readiness = readJson(evidenceSources.readiness);
  const futureConsumerAdoption = readJson(evidenceSources.futureConsumerAdoption);
  const certificationScope = readJson(evidenceSources.certificationScope);
  const visualBacklog = readJson(evidenceSources.visualBacklog);

  const requiredInternalRequirements = [
    "Standalone package structure for tokens, primitives, and CRM compositions",
    "Installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented local package artifacts",
    "Public page kit exported, story-covered, and documented",
    "Runtime standard page-kit manifest is available to consumers",
    "Component architecture supports reuse",
    "Token governance and no new visual debt",
    "Taliya Internal declares and installs official packages",
    "Taliya Internal avoids active local visual clones",
    "Taliya Internal uses official shell, filters, tables, kanban, drawers, panels, and state primitives",
    "Taliya Internal route pages are fully covered by the official page-kit adoption map",
    "Taliya Internal owns the same consumer readiness config model future CRM will use",
    "Taliya Internal consumer readiness configs are versioned in the consumer repository",
    "Internal runtime still works after migration"
  ];

  const internalRows = requiredInternalRequirements.map((requirement) => {
    const status = requirementStatus(goalCompletion, requirement);
    return {
      requirement,
      status,
      pass: isSatisfiedForInternal(status)
    };
  });

  const readinessPass = readiness.status === "pass";
  const goalReadinessPass = goalCompletion.verdict === "not-complete-globally" && goalCompletion.summary?.currentInternalReadiness === "proven";
  const internalRowsPass = internalRows.every((row) => row.pass);
  const currentInternalLibraryAccepted = readinessPass && goalReadinessPass && internalRowsPass;

  const futureCrmAdoptionExecuted =
    futureConsumerAdoption.status === "pass" &&
    futureConsumerAdoption.futureCrmCandidateCount > 0 &&
    futureConsumerAdoption.adoptedCandidateCount === futureConsumerAdoption.futureCrmCandidateCount;
  const visualParityGloballyComplete = visualBacklog.visualCertificationStatus === "complete";
  const scopedVisualAcceptance = certificationScope.status === "pass" && certificationScope.scopedCompletionAccepted === true;
  const globalGoalComplete = currentInternalLibraryAccepted && futureCrmAdoptionExecuted && (visualParityGloballyComplete || scopedVisualAcceptance);

  const acceptanceRows = [
    {
      gate: "current-readiness",
      status: markdownStatus(readinessPass),
      proves: "aggregate readiness gate passed for the current Internal/library scope"
    },
    {
      gate: "current-internal-library-readiness",
      status: markdownStatus(goalReadinessPass && internalRowsPass),
      proves: "current taliya-internal can consume official packages/page-kit without local visual clones"
    },
    {
      gate: "future-crm-adoption-executed",
      status: futureCrmAdoptionExecuted ? "pass" : "not-executed",
      proves: futureCrmAdoptionExecuted
        ? "a real future CRM candidate has matching labeled readiness evidence"
        : "future CRM adoption is process-proven only until a real candidate exists and runs labeled gates"
    },
    {
      gate: "source-image-visual-parity",
      status: visualParityGloballyComplete ? "pass" : scopedVisualAcceptance ? "scoped-out-by-product-acceptance" : "not-proven-globally",
      proves: visualParityGloballyComplete
        ? "all approved source-image rows are globally certified"
        : scopedVisualAcceptance
          ? "product explicitly accepted current Internal/library readiness as the scoped completion bar"
          : "remaining source-image parity stays in the visual certification backlog"
    }
  ];

  report = {
    generatedAt: new Date().toISOString(),
    status: currentInternalLibraryAccepted ? "pass-current-internal-library" : "fail",
    checkMode,
    reportLabel: optionValue("--report-label", "") || "default",
    evidenceSources,
    currentInternalLibraryAccepted,
    globalGoalComplete,
    globalGoalStatus: globalGoalComplete ? "complete" : "not-complete-globally",
    futureCrmAdoptionExecuted,
    visualParityGloballyComplete,
    scopedVisualAcceptance,
    summary: {
      readiness: readiness.status,
      goalVerdict: goalCompletion.verdict,
      currentInternalReadiness: goalCompletion.summary?.currentInternalReadiness ?? "unknown",
      futureCrmAdoption: goalCompletion.summary?.futureCrmAdoption ?? "unknown",
      globalSourceImageParity: goalCompletion.summary?.globalSourceImageParity ?? "unknown",
      visualBacklogIncompleteRows: visualBacklog.summary?.globallyIncompleteCount ?? null,
      futureCrmCandidateCount: futureConsumerAdoption.futureCrmCandidateCount,
      adoptedFutureCrmCandidateCount: futureConsumerAdoption.adoptedCandidateCount
    },
    acceptanceRows,
    internalRows,
    nextActions: globalGoalComplete
      ? []
      : [
          "Run adoption gates against the real future CRM app when it exists or is connected locally.",
          ...(scopedVisualAcceptance
            ? ["Keep remaining source-image 1:1 work in the visual backlog as continuous refinement, not as a blocker for current Internal/library acceptance."]
            : ["Finish full source-image 1:1 visual certification, or keep an explicit scoped product acceptance decision on file."]),
          "Use this audit as the current Internal/library acceptance gate, not as proof that the full persistent goal is complete."
        ]
  };
} catch (error) {
  report = {
    generatedAt: new Date().toISOString(),
    status: "fail",
    checkMode,
    error: error instanceof Error ? error.message : String(error)
  };
}

const reportBaseName = reportBasename("library-acceptance-audit", optionValue("--report-label", ""));
const jsonPath = resolve(specDir, `${reportBaseName}.json`);
const mdPath = resolve(specDir, `${reportBaseName}.md`);
writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const acceptanceRows = (report.acceptanceRows ?? [])
  .map((row) => `| \`${row.gate}\` | ${row.status} | ${row.proves} |`)
  .join("\n");
const internalRows = (report.internalRows ?? [])
  .map((row) => `| ${row.requirement} | ${row.status} | ${row.pass ? "pass" : "fail"} |`)
  .join("\n");
const nextActions = (report.nextActions ?? []).length
  ? report.nextActions.map((item) => `- ${item}`).join("\n")
  : "- None";
const evidenceSources = report.evidenceSources
  ? Object.entries(report.evidenceSources).map(([name, path]) => `- ${name}: \`${path}\``).join("\n")
  : "- None";

writeFileSync(
  mdPath,
  `# Library Acceptance Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit answers whether \`taliya-product-ui\` is currently acceptable as the official reusable library for the current \`taliya-internal\` scope. It deliberately keeps that separate from the larger persistent goal of real future CRM adoption plus full source-image 1:1 certification.

Report label: \`${report.reportLabel ?? "unknown"}\`

Current Internal/library accepted: ${report.currentInternalLibraryAccepted ? "yes" : "no"}

Global goal complete: ${report.globalGoalComplete ? "yes" : "no"}

Global goal status: \`${report.globalGoalStatus ?? "unknown"}\`

${report.error ? `## Error\n\n${report.error}\n` : `## Acceptance Gates

| Gate | Status | Proves |
| --- | --- | --- |
${acceptanceRows}

## Current Internal Requirement Rows

| Requirement | Evidence status | Result |
| --- | --- | --- |
${internalRows}

## Summary

- Readiness: \`${report.summary.readiness}\`
- Goal verdict: \`${report.summary.goalVerdict}\`
- Current Internal readiness: \`${report.summary.currentInternalReadiness}\`
- Future CRM adoption: \`${report.summary.futureCrmAdoption}\`
- Global source-image parity: \`${report.summary.globalSourceImageParity}\`
- Future CRM candidates adopted: ${report.summary.adoptedFutureCrmCandidateCount}/${report.summary.futureCrmCandidateCount}
- Visual backlog incomplete rows: ${report.summary.visualBacklogIncompleteRows}

## Next Actions

${nextActions}

## Evidence Sources

${evidenceSources}
`}
`
);

console.log(`Library acceptance audit: ${report.status}`);
console.log(`Wrote specs/001-product-ui-foundation/${reportBaseName}.md`);
console.log(`Wrote specs/001-product-ui-foundation/${reportBaseName}.json`);

if (checkMode && report.status === "fail") {
  console.error(report.error ?? "Library acceptance audit failed.");
  process.exit(1);
}
