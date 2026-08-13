#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { hasSourceChanges } from "./source-identity.mjs";
import { sourceRevision as canonicalSourceRevision, sourceTreeHash as canonicalSourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stableUuid = (value) => {
  const hex = sha256(value).slice(0, 32).split("");
  hex[12] = "5";
  hex[16] = (Number.parseInt(hex[16], 16) & 3 | 8).toString(16);
  const raw = hex.join("");
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
};
const readJson = (relative) => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; }
};
const hashFile = (relative) => {
  const file = path.join(root, relative);
  return fs.existsSync(file) ? sha256(fs.readFileSync(file)) : null;
};
const sourceRevision = canonicalSourceRevision(root);
const sourceDirty = hasSourceChanges(root);
const sourceTreeHash = canonicalSourceTreeHash(root);
const evidencePaths = [
  "artifacts/visual/capture-report.json",
  "artifacts/quality/story-interactions.json",
  "artifacts/visual/visual-comparison.json",
  "artifacts/visual/approval-audit.json",
  "artifacts/quality/g-source-assets.json",
  "governance/quality-policy.json"
];
const evidence = evidencePaths.map((relativePath) => ({ relativePath, value: readJson(relativePath), hash: hashFile(relativePath) }));
const failures = [];
if (sourceDirty) failures.push("GATE_PROVENANCE_DIRTY");
for (const item of evidence) {
  if (!item.value || !item.hash) failures.push(`GATE_PROVENANCE_MISSING_${item.relativePath.replaceAll(/[/.\\-]/g, "_").toUpperCase()}`);
  const identity = item.value?.source ?? item.value;
  if (identity?.commitSha && identity.commitSha !== sourceRevision) failures.push(`GATE_PROVENANCE_REVISION_${item.relativePath.replaceAll(/[/.\\-]/g, "_").toUpperCase()}`);
  if (identity?.sourceRevision && identity.sourceRevision !== sourceRevision) failures.push(`GATE_PROVENANCE_REVISION_${item.relativePath.replaceAll(/[/.\\-]/g, "_").toUpperCase()}`);
  if (identity?.sourceTreeHash && identity.sourceTreeHash !== sourceTreeHash && item.relativePath !== "artifacts/quality/g-source-assets.json") failures.push(`GATE_PROVENANCE_TREE_${item.relativePath.replaceAll(/[/.\\-]/g, "_").toUpperCase()}`);
}
const startedAt = new Date().toISOString();
const runId = stableUuid(`G-PROVENANCE:${sourceRevision}:${sourceTreeHash}`);
const output = {
  schemaVersion: "1.1.0",
  runId,
  gateId: "G-PROVENANCE",
  profileIds: ["full"],
  policyVersion: "1.0.0",
  stage: "release",
  source: { commitSha: sourceRevision, sourceTreeHash, dirty: sourceDirty },
  configHash: hashFile("governance/quality-policy.json") ?? sha256("missing-policy"),
  command: [process.execPath, "scripts/quality/record-provenance-evidence.mjs"],
  workingDirectory: ".",
  runner: { operatingSystem: process.platform === "win32" ? "windows" : process.platform === "darwin" ? "macos" : "linux", architecture: process.arch, nodeVersion: process.version, ci: process.env.CI === "true" },
  startedAt,
  endedAt: new Date().toISOString(),
  attempt: 1,
  status: failures.length ? "fail" : "pass",
  exitCode: failures.length ? 1 : 0,
  failureCodes: [...new Set(failures)],
  inputFingerprints: Object.fromEntries(evidence.filter((item) => item.hash).map((item) => [item.relativePath.replaceAll(/[/.\\-]/g, "_").toLowerCase(), item.hash])),
  evidenceIds: [stableUuid(`evidence:G-PROVENANCE:${sourceTreeHash}`)]
};
output.decisionFingerprint = sha256(JSON.stringify({ ...output, startedAt: undefined, endedAt: undefined }));
const outputPath = path.join(root, "artifacts/quality/g-provenance.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-PROVENANCE: ${output.status}; failures=${output.failureCodes.join(",") || "none"}`);
if (output.status !== "pass") process.exitCode = 1;
