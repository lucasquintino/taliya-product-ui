import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerFile = path.join(
  root,
  "specs/005-joint-product-certification/joint-certification-ledger.json",
);
const args = process.argv.slice(2);
const reviewDimensions = [
  "productPurpose",
  "requiredBlocks",
  "interactionOutcomes",
  "essentialStates",
  "componentOwnership",
  "duplicateArchitecture",
  "responsiveLayout",
  "accessibility",
  "consumerBoundary",
];
const allowedStatuses = new Set(["pending", "pass", "fail", "blocked", "not-applicable"]);

function option(name, fallback = "") {
  const exactIndex = args.indexOf(name);
  if (exactIndex >= 0 && args[exactIndex + 1] && !args[exactIndex + 1].startsWith("--")) {
    return args[exactIndex + 1];
  }
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  return equals ? equals.slice(name.length + 1) : fallback;
}

function options(name) {
  return args.flatMap((arg, index) => {
    if (arg.startsWith(`${name}=`)) return [arg.slice(name.length + 1)];
    if (arg === name && args[index + 1] && !args[index + 1].startsWith("--")) {
      return [args[index + 1]];
    }
    return [];
  });
}

function codexComplete(codex) {
  return reviewDimensions.every((dimension) =>
    ["pass", "not-applicable"].includes(codex[dimension].status),
  );
}

function deriveJointStatus(row) {
  const codexStatuses = reviewDimensions.map((dimension) => row.codex[dimension].status);
  if (codexStatuses.includes("fail") || row.productOwner.status === "fail") return "needs-fix";
  if (codexStatuses.includes("blocked") || row.productOwner.status === "blocked") return "blocked";
  if (!codexComplete(row.codex)) return "pending-codex";
  if (row.productOwner.status !== "pass") return "pending-product-owner";
  return "joint-pass";
}

function refreshSummary(ledger) {
  ledger.summary.codexCompleteCount = ledger.rows.filter((row) => codexComplete(row.codex)).length;
  ledger.summary.productOwnerPassCount = ledger.rows.filter(
    (row) => row.productOwner.status === "pass",
  ).length;
  ledger.summary.jointPassCount = ledger.rows.filter((row) => row.jointStatus === "joint-pass").length;
  ledger.summary.needsFixCount = ledger.rows.filter((row) => row.jointStatus === "needs-fix").length;
  ledger.summary.blockedCount = ledger.rows.filter((row) => row.jointStatus === "blocked").length;
  ledger.summary.pendingCount = ledger.rows.filter((row) => row.jointStatus.startsWith("pending-")).length;
  ledger.status =
    ledger.summary.jointPassCount === ledger.rows.length
      ? "complete"
      : ledger.summary.needsFixCount > 0
        ? "needs-fix"
        : "in-progress";
}

const storyIds = options("--story-id");
const family = option("--family");
const reviewer = option("--reviewer", "codex");
const status = option("--status");
const dimension = option("--dimension");
const allDimensions = args.includes("--all-dimensions");
const evidence = options("--evidence");
const findings = options("--finding");
const clearEvidence = args.includes("--clear-evidence");
const clearFindings = args.includes("--clear-findings");

if (!storyIds.length && !family) throw new Error("At least one --story-id or --family is required");
if (storyIds.length && family) throw new Error("Use --story-id or --family, not both");
if (!status || !allowedStatuses.has(status)) throw new Error(`Unsupported status: ${status || "missing"}`);
if (!new Set(["codex", "productOwner"]).has(reviewer)) {
  throw new Error(`Unsupported reviewer: ${reviewer}`);
}
if (reviewer === "productOwner" && (dimension || allDimensions)) {
  throw new Error("Product-owner review is recorded at route level; omit dimensions.");
}
if (reviewer === "codex" && !dimension && !allDimensions) {
  throw new Error("Use --dimension or --all-dimensions for Codex review");
}
if (dimension && allDimensions) throw new Error("Use --dimension or --all-dimensions, not both");
if (dimension && !reviewDimensions.includes(dimension)) {
  throw new Error(`Unknown review dimension: ${dimension}`);
}
if (status === "not-applicable" && findings.length === 0) {
  throw new Error("not-applicable requires at least one --finding reason");
}

const ledger = JSON.parse(await readFile(ledgerFile, "utf8"));
const rows = family
  ? ledger.rows.filter((row) => row.structuralFamilies.includes(family))
  : ledger.rows.filter((row) => storyIds.includes(row.storyId));
const matchedStoryIds = new Set(rows.map((row) => row.storyId));
const missingStoryIds = storyIds.filter((storyId) => !matchedStoryIds.has(storyId));
if (missingStoryIds.length) throw new Error(`Unknown story ids: ${missingStoryIds.join(", ")}`);
if (!rows.length) throw new Error(`No routes matched ${family ? `family ${family}` : "the selection"}`);

const dimensions = allDimensions ? reviewDimensions : [dimension];
const reviewedAt = status === "pending" ? null : new Date().toISOString();

for (const row of rows) {
  const reviews = reviewer === "codex" ? dimensions.map((name) => row.codex[name]) : [row.productOwner];
  for (const review of reviews) {
    review.status = status;
    review.reviewedAt = reviewedAt;
    if (clearEvidence) review.evidence = [];
    if (clearFindings) review.findings = [];
    for (const item of evidence) if (!review.evidence.includes(item)) review.evidence.push(item);
    for (const item of findings) if (!review.findings.includes(item)) review.findings.push(item);
    if (["pass", "not-applicable"].includes(status) && review.evidence.length === 0) {
      throw new Error(`Evidence is required to record ${status}`);
    }
  }
  row.jointStatus = deriveJointStatus(row);
}

ledger.generatedAt = new Date().toISOString();
refreshSummary(ledger);
await writeFile(ledgerFile, `${JSON.stringify(ledger, null, 2)}\n`);

console.log(
  `Recorded ${reviewer} ${status} for ${rows.length} route(s); codex=${ledger.summary.codexCompleteCount}/${ledger.rows.length}; joint=${ledger.summary.jointPassCount}/${ledger.rows.length}.`,
);
