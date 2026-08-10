#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const commands = [
  ["G-API-INVENTORY", "scripts/quality/generate-public-api-inventory.mjs", "--check"],
  ["G-API-CONTRACT", "scripts/quality/validate-public-api-contracts.mjs"],
  ["G-CODE-STANDARDS", "scripts/quality/audit-code-standards.mjs"],
  ["G-ARCHITECTURE", "scripts/quality/audit-architecture.mjs"],
  ["G-API-PROBES", "scripts/quality/probe-api-architecture.mjs"],
  ["G-STORY-INTERACTIONS", "scripts/quality/run-story-interactions.mjs", "--storybook-dir", "apps/docs/storybook-static"],
  ["G-CONSUMER", "scripts/quality/audit-packed-consumer.mjs"]
];
const results = [];
for (const [id, script, ...args] of commands) {
  const run = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8", timeout: 900000 });
  results.push({ id, command: ["node", script, ...args], status: run.status === 0 ? "pass" : "fail", exitCode: run.status ?? 1, stdoutHash: crypto.createHash("sha256").update(run.stdout ?? "").digest("hex"), stderr: (run.stderr ?? "").slice(-500) });
}
const sourceRevision = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const output = { schemaVersion: "gate-run.v1", gateId: "G-API", sourceRevision, mode: "check", status: results.every((row) => row.status === "pass") ? "pass" : "fail", checks: results };
const outputPath = path.join(root, "artifacts", "quality", "g-api.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-API: ${output.status}`);
if (output.status === "fail") process.exitCode = 1;
