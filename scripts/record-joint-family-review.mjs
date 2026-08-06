import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventoryFile = path.join(
  root,
  "specs/005-joint-product-certification/family-inventory.json",
);
const args = process.argv.slice(2);
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

const familyId = option("--family");
const dimension = option("--dimension");
const status = option("--status");
const reviewer = option("--reviewer", "codex");
const evidence = options("--evidence");
const findings = options("--finding");
const clearEvidence = args.includes("--clear-evidence");
const clearFindings = args.includes("--clear-findings");

if (!familyId) throw new Error("--family is required");
if (!status) throw new Error("--status is required");
if (!allowedStatuses.has(status)) throw new Error(`Unsupported status: ${status}`);
if (!new Set(["codex", "productOwner"]).has(reviewer)) {
  throw new Error(`Unsupported reviewer: ${reviewer}`);
}
if (reviewer === "productOwner" && dimension) {
  throw new Error("Product-owner review is recorded at family level; omit --dimension.");
}
if (reviewer === "codex" && !dimension) throw new Error("--dimension is required for Codex review");
if (status === "not-applicable" && findings.length === 0) {
  throw new Error("not-applicable requires at least one --finding reason");
}

const inventory = JSON.parse(await readFile(inventoryFile, "utf8"));
const row = inventory.rows.find((candidate) => candidate.id === familyId);
if (!row) throw new Error(`Unknown family: ${familyId}`);
const review = reviewer === "codex" ? row.codex[dimension] : row.productOwner;
if (!review) throw new Error(`Unknown review dimension: ${dimension}`);

review.status = status;
review.reviewedAt = status === "pending" ? null : new Date().toISOString();
if (clearEvidence) review.evidence = [];
if (clearFindings) review.findings = [];
for (const item of evidence) if (!review.evidence.includes(item)) review.evidence.push(item);
for (const item of findings) if (!review.findings.includes(item)) review.findings.push(item);

const codexStatuses = Object.values(row.codex).map((item) => item.status);
if (codexStatuses.includes("fail") || row.productOwner.status === "fail") {
  row.jointStatus = "needs-fix";
} else if (codexStatuses.includes("blocked") || row.productOwner.status === "blocked") {
  row.jointStatus = "blocked";
} else if (codexStatuses.includes("pending")) {
  row.jointStatus = "pending-codex";
} else if (row.productOwner.status === "pending") {
  row.jointStatus = "pending-product-owner";
} else {
  row.jointStatus = "joint-pass";
}

inventory.generatedAt = new Date().toISOString();
inventory.summary.jointPassCount = inventory.rows.filter(
  (candidate) => candidate.jointStatus === "joint-pass",
).length;
inventory.status = inventory.summary.jointPassCount === inventory.rows.length ? "complete" : "in-progress";
await writeFile(inventoryFile, `${JSON.stringify(inventory, null, 2)}\n`);

console.log(
  `Recorded ${reviewer} review for ${familyId}${dimension ? `/${dimension}` : ""}: ${status}; joint=${row.jointStatus}.`,
);
