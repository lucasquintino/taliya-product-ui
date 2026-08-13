#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const outputFlag = process.argv.indexOf("--output");
const outputPath = path.resolve(root, outputFlag >= 0 ? process.argv[outputFlag + 1] : "artifacts/quality/e2e-release.json");
const reporterPath = path.resolve(root, "artifacts/quality/e2e-release-playwright.json");
const projects = [
  "chromium-release",
  "chromium-release-mobile",
  "firefox-release",
  "firefox-release-mobile",
  "webkit-release",
  "webkit-release-mobile"
];
const cli = path.join(root, "node_modules", "@playwright", "test", "cli.js");
// Release evidence is intentionally serialized across projects. Firefox and
// WebKit are sensitive to concurrent context pressure on constrained runners;
// one worker makes the six-project result reproducible without changing any
// assertion, browser, or threshold.
const args = [cli, "test", ...projects.flatMap((project) => ["--project", project]), "--workers=1", "--reporter=json"];
const result = spawnSync(process.execPath, args, {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: reporterPath },
  timeout: 1_800_000
});

const revision = sourceRevision(root);
const treeHash = sourceTreeHash(root);
let playwright = null;
if (fs.existsSync(reporterPath)) {
  try { playwright = JSON.parse(fs.readFileSync(reporterPath, "utf8")); } catch { playwright = null; }
}
const stats = playwright?.stats ?? {};
const observedProjects = new Set();
const visit = (suite) => {
  for (const spec of suite?.specs ?? []) for (const test of spec.tests ?? []) {
    if (test.projectName) observedProjects.add(test.projectName);
    for (const resultRow of test.results ?? []) if (resultRow.projectName) observedProjects.add(resultRow.projectName);
  }
  for (const child of suite?.suites ?? []) visit(child);
};
for (const suite of playwright?.suites ?? []) visit(suite);
const missingProjects = projects.filter((project) => !observedProjects.has(project));
const status = result.status === 0 && stats.unexpected === 0 && stats.flaky === 0 && missingProjects.length === 0 ? "pass" : "fail";
const report = {
  schemaVersion: "e2e-release.v1",
  gateId: "G-E2E-RELEASE",
  sourceRevision: revision,
  sourceTreeHash: treeHash,
  dirty: hasSourceChanges(root),
  status,
  exitCode: status === "pass" ? 0 : result.status ?? 1,
  projects,
  observedProjects: [...observedProjects].sort(),
  missingProjects,
  stats: {
    expected: stats.expected ?? 0,
    unexpected: stats.unexpected ?? 0,
    skipped: stats.skipped ?? 0,
    flaky: stats.flaky ?? 0,
    durationMs: stats.duration ?? null
  },
  command: [process.execPath, ...args],
  reporterPath: path.relative(root, reporterPath).replaceAll("\\", "/")
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`G-E2E-RELEASE: ${status}; expected=${report.stats.expected}; unexpected=${report.stats.unexpected}; flaky=${report.stats.flaky}`);
if (status !== "pass") process.exitCode = 1;
