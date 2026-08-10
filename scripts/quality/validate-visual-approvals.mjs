#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const value = (flag, fallback) => {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const capturePath = path.resolve(root, value("--capture", "artifacts/visual/capture-report.json"));
const comparisonPath = path.resolve(root, value("--comparison", "artifacts/visual/visual-comparison.json"));
const approvalsPath = path.resolve(root, value("--approvals", "artifacts/visual/approvals.json"));
const outputPath = path.resolve(root, value("--output", "artifacts/visual/approval-audit.json"));
const requiredPath = path.resolve(root, value("--required", "specs/001-product-ui-foundation/visual-certification-capture-audit.json"));

function readJson(file, label) {
  if (!fs.existsSync(file)) throw new Error(`VISUAL-APPROVAL-${label.toUpperCase()}-MISSING:${path.relative(root, file)}`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function isDate(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

const capture = readJson(capturePath, "capture");
const comparison = readJson(comparisonPath, "comparison");
const required = readJson(requiredPath, "required");
const approvals = fs.existsSync(approvalsPath)
  ? readJson(approvalsPath, "approvals")
  : { schemaVersion: "visual-approval.v1", status: "awaiting-human-review", approvals: {} };
const captureById = new Map((capture.results ?? []).map((row) => [row.id, row]));
const comparisonById = new Map((comparison.results ?? []).map((row) => [row.id, row]));
const requiredIds = new Set((required.rows ?? []).map((row) => row.storyId).filter(Boolean));
const errors = [];
if (approvals.schemaVersion !== "visual-approval.v1") errors.push("VISUAL-APPROVAL-SCHEMA");
for (const field of ["sourceRevision", "sourceTreeHash", "buildHash"]) {
  if (approvals[field] && capture[field] && approvals[field] !== capture[field]) errors.push(`VISUAL-APPROVAL-${field.toUpperCase()}-MISMATCH`);
}
if (!approvals.approvals || typeof approvals.approvals !== "object" || Array.isArray(approvals.approvals)) errors.push("VISUAL-APPROVAL-REGISTRY");
const rows = [];
for (const [id, approval] of Object.entries(approvals.approvals ?? {})) {
  const captureRow = captureById.get(id);
  const comparisonRow = comparisonById.get(id);
  const rowErrors = [];
  if (!captureRow) rowErrors.push("UNKNOWN-STORY");
  if (!comparisonRow) rowErrors.push("MISSING-COMPARISON");
  if (!approval || typeof approval !== "object") rowErrors.push("INVALID-RECORD");
  if (!new Set(["approved", "rejected", "needs-work"]).has(approval?.status)) rowErrors.push("INVALID-STATUS");
  if (typeof approval?.reviewer !== "string" || approval.reviewer.trim().length < 2) rowErrors.push("REVIEWER-MISSING");
  if (!isDate(approval?.reviewedAt)) rowErrors.push("REVIEWED-AT-MISSING");
  if (approval?.sourceRevision && captureRow?.sourceRevision && approval.sourceRevision !== captureRow.sourceRevision) rowErrors.push("RECORD-REVISION-MISMATCH");
  if (approval && typeof approval.sourceRevision !== "string") rowErrors.push("RECORD-SOURCE-REVISION-MISSING");
  if (approval && typeof approval.buildHash !== "string") rowErrors.push("RECORD-BUILD-HASH-MISSING");
  if (approval && typeof approval.sourceSha256 !== "string") rowErrors.push("RECORD-SOURCE-HASH-MISSING");
  if (approval && typeof approval.currentSha256 !== "string") rowErrors.push("RECORD-CURRENT-HASH-MISSING");
  if (approval?.sourceSha256 && comparisonRow?.sourceSha256 && approval.sourceSha256 !== comparisonRow.sourceSha256) rowErrors.push("RECORD-SOURCE-HASH-MISMATCH");
  if (approval?.currentSha256 && comparisonRow?.currentSha256 && approval.currentSha256 !== comparisonRow.currentSha256) rowErrors.push("RECORD-CURRENT-HASH-MISMATCH");
  rows.push({ id, status: approval?.status ?? null, errors: rowErrors });
  if (rowErrors.length) errors.push(...rowErrors.map((error) => `${error}:${id}`));
}
const pendingIds = [...requiredIds].filter((id) => !approvals.approvals?.[id]);
for (const id of requiredIds) {
  if (!captureById.has(id)) errors.push(`REQUIRED-STORY-MISSING:${id}`);
  if (!comparisonById.has(id)) errors.push(`REQUIRED-COMPARISON-MISSING:${id}`);
}
const report = {
  schemaVersion: "visual-approval-audit.v1",
  status: errors.length ? "fail" : pendingIds.length ? "blocked-human-review" : "pass",
  sourceRevision: capture.sourceRevision ?? null,
  sourceTreeHash: capture.sourceTreeHash ?? null,
  buildHash: capture.buildHash ?? null,
  captureCount: captureById.size,
  comparisonCount: comparisonById.size,
  requiredCount: requiredIds.size,
  approvalCount: rows.length,
  pendingCount: pendingIds.length,
  approvedCount: rows.filter((row) => row.status === "approved").length,
  rejectedCount: rows.filter((row) => row.status === "rejected").length,
  errors,
  rows,
  pendingIds,
  registrySha256: crypto.createHash("sha256").update(JSON.stringify(approvals)).digest("hex")
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`VISUAL-APPROVALS: ${report.status}; approved=${report.approvedCount}; pending=${report.pendingCount}; errors=${errors.length}`);
if (errors.length || pendingIds.length) process.exitCode = 1;
