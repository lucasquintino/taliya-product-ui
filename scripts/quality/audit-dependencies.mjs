#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import { spawnSync } from "node:child_process";

const full = process.argv.includes("--full");
const fixture = process.argv.includes("--negative-fixture");
const args = full ? ["audit", "--json"] : ["audit", "--prod", "--json"];
const run = spawnSync(process.platform === "win32" ? "pnpm.cmd" : "pnpm", args, { encoding: "utf8", shell: process.platform === "win32" });
let payload;
try { payload = JSON.parse(run.stdout || "{}"); } catch { payload = { metadata: { vulnerabilities: {} }, parseError: true }; }
const vulnerabilities = payload.metadata?.vulnerabilities ?? {};
const blocking = ["critical", "high"].filter((level) => Number(vulnerabilities[level] ?? 0) > 0);
if (fixture) blocking.push("fixture");
const result = { schemaVersion: "dependency-audit.v1", profile: full ? "toolchain" : "runtime", command: `pnpm ${args.join(" ")}`, status: blocking.length ? "fail" : "pass", vulnerabilities, blocking, exitCode: run.status ?? 1 };
console.log(JSON.stringify(result, null, 2));
if (blocking.length) process.exitCode = 1;
