#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const commands = [
  ["code-standards", "scripts/quality/audit-code-standards.mjs"],
  ["architecture", "scripts/quality/audit-architecture.mjs"]
];
const checks = commands.map(([id, script]) => {
  const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
  let parsed = null;
  try { parsed = JSON.parse(run.stdout); } catch { parsed = { raw: run.stdout.slice(-500) }; }
  return { id, status: run.status === 0 ? "pass" : "fail", exitCode: run.status ?? 1, result: parsed };
});
const waiverDir = path.join(root, "governance/waivers");
const waivers = fs.existsSync(waiverDir) ? fs.readdirSync(waiverDir).filter((name) => name.endsWith(".json")) : [];
const output = { schemaVersion: "ratchet-validation.v1", status: checks.every((check) => check.status === "pass") && waivers.length === 0 ? "pass" : "fail", checks, activeWaivers: waivers };
console.log(JSON.stringify(output, null, 2));
if (output.status === "fail") process.exitCode = 1;
