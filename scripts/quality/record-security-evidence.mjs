#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const checks = [
  ["G-SEC-RUNTIME", "scripts/quality/audit-dependencies.mjs", ["--prod"]],
  ["G-SEC-TOOLCHAIN", "scripts/quality/audit-dependencies.mjs", ["--full"]],
  ["G-SEC-SAST", "scripts/quality/run-sast.mjs", []],
  ["G-SEC-SECRETS", "scripts/quality/run-secrets.mjs", []],
  ["G-SEC-NEGATIVE-PROBE", "scripts/quality/probe-security-gates.mjs", []],
  ["G-SEC-TRUST-BOUNDARY", "scripts/quality/audit-trust-boundaries.mjs", []],
  ["G-SEC-RESPONSIBILITIES", "scripts/quality/validate-security-boundary.mjs", []]
];
const results = checks.map(([id, script, args]) => {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8", timeout: 900000 });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  return { id, command: ["node", script, ...args], status: result.status === 0 ? "pass" : "fail", exitCode: result.status ?? 1, outputSha256: crypto.createHash("sha256").update(output).digest("hex") };
});
const output = { schemaVersion: "gate-run.v1", gateId: "G-SECURITY", sourceRevision: sourceRevision(root), sourceTreeHash: sourceTreeHash(root), dirty: hasSourceChanges(root), mode: "check", status: results.every((row) => row.status === "pass") ? "pass" : "fail", checks: results };
const outputPath = path.join(root, "artifacts/quality/g-security.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-SECURITY: ${output.status}`);
if (output.status !== "pass") process.exitCode = 1;
