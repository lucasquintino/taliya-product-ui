#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const run = (id, script, args = []) => {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8", timeout: 900000 });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  return { id, command: ["node", script, ...args], status: result.status === 0 ? "pass" : "fail", exitCode: result.status ?? 1, outputSha256: crypto.createHash("sha256").update(output).digest("hex") };
};
const results = [
  run("G-PERF-BUDGETS", "scripts/quality/audit-package-performance.mjs"),
  run("G-PERF-RATCHET", "scripts/quality/validate-ratchets.mjs")
];
const ledgerPath = path.join(root, "artifacts/performance/optimization-ledger.json");
if (!fs.existsSync(ledgerPath)) results.push({ id: "G-PERF-LEDGER", status: "fail", reason: "missing optimization ledger" });
else {
  try {
    const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    const valid = ledger.schemaVersion === "optimization-ledger.v1" && Array.isArray(ledger.entries) && ledger.entries.length > 0 && ledger.entries.every((entry) => entry.decision && entry.datasetHash && entry.sourcePaths?.length);
    results.push({ id: "G-PERF-LEDGER", status: valid ? "pass" : "fail", entryCount: ledger.entries?.length ?? 0 });
  } catch (error) { results.push({ id: "G-PERF-LEDGER", status: "fail", reason: error.message }); }
}
const output = { schemaVersion: "gate-run.v1", gateId: "G-PERF", sourceRevision: sourceRevision(root), sourceTreeHash: sourceTreeHash(root), dirty: hasSourceChanges(root), mode: "check", status: results.every((row) => row.status === "pass") ? "pass" : "fail", checks: results };
const outputPath = path.join(root, "artifacts/quality/g-performance.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-PERF: ${output.status}`);
if (output.status !== "pass") process.exitCode = 1;
