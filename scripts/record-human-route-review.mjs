import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const ledgerPath = resolve(root, "specs/004-human-route-review/human-route-review.json");

function option(name, fallback = "") {
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  if (equals) return equals.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const image = option("--image");
const field = option("--field");
const status = option("--status");
const evidence = option("--evidence");
const issue = option("--issue");
const tested = option("--tested");
const note = option("--note");
const finalStatus = option("--final-status");
const clearIssues = args.includes("--clear-issues");
const allowedFields = new Set(["canonicalVisual", "desktopResponsive", "mobileResponsive", "interactionReview", "sourceComparison"]);
const allowedStatuses = new Set(["pending", "pass", "fail", "blocked", "not-applicable"]);

if (!image) throw new Error("--image is required");
if (field && !allowedFields.has(field)) throw new Error(`Unsupported review field: ${field}`);
if (status && !allowedStatuses.has(status)) throw new Error(`Unsupported review status: ${status}`);
if (finalStatus && !allowedStatuses.has(finalStatus)) throw new Error(`Unsupported final status: ${finalStatus}`);

const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const row = ledger.rows.find((candidate) => candidate.image === image);
if (!row) throw new Error(`Review route not found: ${image}`);

if (field) {
  const review = row[field];
  if (clearIssues) review.issues = [];
  if (status) review.status = status;
  if (status && status !== "pending") review.reviewedAt = new Date().toISOString();
  if (evidence && !review.evidence.includes(evidence)) review.evidence.push(evidence);
  if (issue && !review.issues.includes(issue)) review.issues.push(issue);
  if (tested && field === "interactionReview" && !review.tested.includes(tested)) review.tested.push(tested);
}
if (note && !row.notes.includes(note)) row.notes.push(note);
if (finalStatus) row.finalStatus = finalStatus;

writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(`Recorded human review evidence for ${image}${field ? ` (${field}: ${row[field].status})` : ""}.`);
