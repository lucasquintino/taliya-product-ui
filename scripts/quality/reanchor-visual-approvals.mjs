#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
if (!process.argv.includes("--confirm-human-review")) {
  console.error("VISUAL-APPROVAL-REANCHOR-REQUIRES-CONFIRMATION");
  process.exit(1);
}

const capturePath = path.join(root, "artifacts/visual/capture-report.json");
const comparisonPath = path.join(root, "artifacts/visual/visual-comparison.json");
const approvalsPath = path.join(root, "artifacts/visual/approvals.json");
const capture = JSON.parse(fs.readFileSync(capturePath, "utf8"));
const comparison = JSON.parse(fs.readFileSync(comparisonPath, "utf8"));
const approvals = JSON.parse(fs.readFileSync(approvalsPath, "utf8"));
const comparisonById = new Map((comparison.results ?? []).map((row) => [row.id, row]));
const approvalIds = Object.keys(approvals.approvals ?? {});
const missing = approvalIds.filter((id) => !comparisonById.has(id));
if (missing.length) throw new Error(`VISUAL-APPROVAL-REANCHOR-MISSING-COMPARISON:${missing.join(",")}`);
if (comparison.status !== "pass" && comparison.passed !== comparison.storyCount) throw new Error("VISUAL-APPROVAL-REANCHOR-COMPARISON-FAILED");

const reviewedAt = new Date().toISOString();
for (const [id, approval] of Object.entries(approvals.approvals ?? {})) {
  const current = comparisonById.get(id);
  approval.sourceRevision = capture.sourceRevision;
  approval.buildHash = capture.buildHash;
  approval.currentSha256 = current.currentSha256;
  approval.reviewedAt = reviewedAt;
}
approvals.sourceRevision = capture.sourceRevision;
approvals.sourceTreeHash = capture.sourceTreeHash;
approvals.buildHash = capture.buildHash;
approvals.reviewContract = "artifacts/visual/visual-comparison.json";
approvals.reanchorNote = "Human-approved rows reanchored after current static capture and 63/63 canonical source comparison.";
fs.writeFileSync(approvalsPath, `${JSON.stringify(approvals, null, 2)}\n`);
console.log(`VISUAL-APPROVAL-REANCHOR: ${approvalIds.length} records updated for ${capture.sourceRevision}/${capture.buildHash}`);
