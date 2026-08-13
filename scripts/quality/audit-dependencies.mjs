#!/usr/bin/env node
/* global console, process */

import { spawnSync } from "node:child_process";

const full = process.argv.includes("--full");
const fixture = process.argv.includes("--negative-fixture");
const args = full ? ["audit", "--json"] : ["audit", "--prod", "--json"];
// Invoke the package manager without Node's shell option. Windows package
// manager shims are batch files, so use the command interpreter explicitly
// with a fixed, quoted command string; this avoids shell interpolation of any
// caller-controlled value while remaining portable.
const isWindows = process.platform === "win32";
const executable = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "pnpm";
const invocation = isWindows
  ? ["/d", "/s", "/c", ["pnpm.cmd", ...args].join(" ")]
  : args;
const run = spawnSync(executable, invocation, { encoding: "utf8", shell: false });
let payload;
try { payload = JSON.parse(run.stdout || ""); } catch { payload = { metadata: { vulnerabilities: {} }, parseError: true }; }
const vulnerabilities = payload.metadata?.vulnerabilities ?? {};
const blocking = ["critical", "high"].filter((level) => Number(vulnerabilities[level] ?? 0) > 0);
if (fixture) blocking.push("fixture");
if (run.error || payload.parseError) blocking.push("audit-command");
const result = {
  schemaVersion: "dependency-audit.v1",
  profile: full ? "toolchain" : "runtime",
  command: `pnpm ${args.join(" ")}`,
  status: blocking.length ? "fail" : "pass",
  vulnerabilities,
  blocking,
  exitCode: run.status ?? 1,
  ...(run.error ? { error: run.error.message } : {})
};
console.log(JSON.stringify(result, null, 2));
if (blocking.length) process.exitCode = 1;
