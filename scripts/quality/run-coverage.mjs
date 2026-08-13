#!/usr/bin/env node
/* global process */

import path from "node:path";
import { spawnSync } from "node:child_process";
import { runChildren } from "./run-children.mjs";

const root = process.cwd();
const vitest = path.join(root, "node_modules", "vitest", "vitest.mjs");
const packages = ["tokens", "ui", "crm"];
const report = runChildren(
  packages.map((name) => ({
    id: name,
    command: process.execPath,
    args: [vitest, "run", "--coverage", "--config", "vitest.config.ts"],
    cwd: path.join(root, "packages", name),
    timeoutMs: 180000
  })),
  { cwd: root }
);
for (const result of report.results) {
  if (result.output) process.stdout.write(`\n[coverage:${result.id}]\n${result.output}`);
}
const changedCoverage = spawnSync(process.execPath, [path.join(root, "scripts", "quality", "check-changed-coverage.mjs")], { cwd: root, encoding: "utf8" });
if (changedCoverage.stdout) process.stdout.write(`\n[coverage:changed-lines]\n${changedCoverage.stdout}`);
if (changedCoverage.stderr) process.stderr.write(changedCoverage.stderr);
process.exit(report.exitCode || changedCoverage.status || 0);
