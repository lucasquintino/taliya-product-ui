#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const checks = [
  ["G-STORY-BUILD", "scripts/quality/run-story-tests.mjs", ["--storybook-dir", "apps/docs/storybook-static"]],
  ["G-STORY-TEST", "scripts/quality/run-story-interactions.mjs", ["--storybook-dir", "apps/docs/storybook-static", "--workers", "4"]],
  ["G-VISUAL-CAPTURE", "scripts/quality/capture-storybook.mjs", ["--storybook-dir", "apps/docs/storybook-static", "--output-dir", "artifacts/visual/captures", "--report", "artifacts/visual/capture-report.json", "--timeout", "30000"]],
  ["G-RESPONSIVE", "scripts/quality/audit-story-runtime.mjs", ["--capture-report", "artifacts/visual/capture-report.json"]],
  ["G-VISUAL", "scripts/quality/compare-visuals.mjs", []],
  ["G-VISUAL-APPROVALS", "scripts/quality/validate-visual-approvals.mjs", []],
  ["G-CONSUMER", "scripts/quality/audit-packed-consumer.mjs", []]
];
const results = checks.map(([id, script, args]) => {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8", timeout: 1200000 });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  return { id, command: ["node", script, ...args], status: result.status === 0 ? "pass" : "fail", exitCode: result.status ?? 1, outputSha256: crypto.createHash("sha256").update(output).digest("hex") };
});
const sourceRevision = process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const output = { schemaVersion: "gate-run.v1", gateId: "G-WAVE3", sourceRevision, mode: "check", status: results.every((row) => row.status === "pass") ? "pass" : "fail", checks: results };
const outputPath = path.join(root, "artifacts/quality/g-wave3.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-WAVE3: ${output.status}`);
if (output.status !== "pass") process.exitCode = 1;
