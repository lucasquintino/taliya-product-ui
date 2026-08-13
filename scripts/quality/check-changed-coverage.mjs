#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { evaluateChangedCoverage, thresholds } from "./coverage-policy.mjs";

const root = process.cwd();
const packages = ["tokens", "ui", "crm"];
const sourceExtensions = /\.(?:ts|tsx)$/;
const productionSource = (file) => sourceExtensions.test(file)
  && !/(?:\.test|\.spec|\.stories)\.(?:ts|tsx)$/.test(file)
  && !/(?:^|\/)(?:types|[^/]+\.types)\.ts$/.test(file);

function git(args) {
  return spawnSync("git", args, { cwd: root, encoding: "utf8" }).stdout ?? "";
}

function normalizeSourceLine(line) {
  // A compatibility-preserving extraction may promote a private declaration
  // to an exported module seam. Treat that modifier as movement metadata so
  // the changed-lines gate measures new behavior, not the export keyword.
  return line.replace(/\r/g, "").trim().replace(/^export\s+/, "").replace(/\s+/g, " ");
}

function baseSourceLines(packageName) {
  const files = git(["ls-files", "--", `packages/${packageName}/src`])
    .split(/\r?\n/)
    .filter((file) => productionSource(file));
  const lines = new Set();
  const compactSources = [];
  for (const file of files) {
    const source = git(["show", `HEAD:${file}`]);
    compactSources.push(source.replace(/\s+/g, ""));
    for (const line of source.split(/\r?\n/)) {
      const normalized = normalizeSourceLine(line);
      if (normalized) lines.add(normalized);
    }
  }
  baseCompactByPackage.set(packageName, compactSources.join(""));
  return lines;
}

const baseLinesByPackage = new Map();
const baseCompactByPackage = new Map();

function normalize(file) {
  return file.replaceAll("\\", "/").replace(/^a\//, "").replace(/^b\//, "");
}

function changedLinesFromDiff(diff) {
  const linesByFile = new Map();
  let currentFile = null;
  for (const line of diff.split(/\r?\n/)) {
    if (line.startsWith("+++ b/")) {
      currentFile = normalize(line.slice(6));
      continue;
    }
    const match = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
    if (!match || !currentFile) continue;
    const start = Number(match[1]);
    const count = match[2] === undefined ? 1 : Number(match[2]);
    const target = linesByFile.get(currentFile) ?? new Set();
    for (let lineNumber = start; lineNumber < start + count; lineNumber += 1) target.add(lineNumber);
    linesByFile.set(currentFile, target);
  }
  return linesByFile;
}

function coverageEntries(packageName) {
  const file = path.join(root, "packages", packageName, "coverage", "coverage-final.json");
  if (!fs.existsSync(file)) return new Map();
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return new Map(Object.entries(raw).map(([filePath, coverage]) => [normalize(path.relative(root, filePath)), coverage]));
}

const diffs = [
  git(["diff", "--unified=0", "--no-ext-diff"]),
  git(["diff", "--cached", "--unified=0", "--no-ext-diff"])
];
const base = process.env.GITHUB_BASE_SHA ?? process.env.GIT_BASE_SHA ?? "";
if (base) diffs.push(git(["diff", `${base}...HEAD`, "--unified=0", "--no-ext-diff"]));
const changed = new Map();
for (const diff of diffs) {
  for (const [file, lines] of changedLinesFromDiff(diff)) {
    const current = changed.get(file) ?? new Set();
    for (const line of lines) current.add(line);
    changed.set(file, current);
  }
}
for (const file of git(["ls-files", "--others", "--exclude-standard", "packages"]).split(/\r?\n/).filter(productionSource)) {
  const normalized = normalize(file);
  const packageName = packages.find((name) => normalized.startsWith(`packages/${name}/`));
  if (packageName && !baseLinesByPackage.has(packageName)) baseLinesByPackage.set(packageName, baseSourceLines(packageName));
  const baseLines = packageName ? baseLinesByPackage.get(packageName) : new Set();
  const sourceLines = fs.readFileSync(path.join(root, normalized), "utf8").split(/\r?\n/);
  const introducedLines = new Set();
  sourceLines.forEach((line, index) => {
    // Extracted modules contain many lines moved verbatim from the pre-split
    // monolith. Those lines are not new behavior; only lines absent from the
    // package's HEAD source are subject to the changed-lines threshold. The
    // compact fallback recognizes formatter-only JSX reflow.
    const normalized = normalizeSourceLine(line);
    const compact = normalized.replace(/\s+/g, "");
    if (!baseLines.has(normalized) && !(baseCompactByPackage.get(packageName) ?? "").includes(compact)) introducedLines.add(index + 1);
  });
  changed.set(normalized, introducedLines);
}

const rows = [];
for (const packageName of packages) {
  const coverage = coverageEntries(packageName);
  const packageFiles = [...changed.entries()].filter(([file]) => file.startsWith(`packages/${packageName}/src/`) && productionSource(file));
  let covered = 0;
  let total = 0;
  const missingCoverage = [];
  for (const [file, lines] of packageFiles) {
    const entry = coverage.get(file);
    if (!entry) {
      missingCoverage.push(file);
      continue;
    }
    for (const [id, count] of Object.entries(entry.s)) {
      if (!lines.has(entry.statementMap[id].start.line)) continue;
      total += 1;
      if (count > 0) covered += 1;
    }
  }
  const result = evaluateChangedCoverage({ covered, total, threshold: thresholds.changedLines });
  rows.push({ package: packageName, files: packageFiles.map(([file]) => file), missingCoverage, ...result });
}

const status = rows.every((row) => ["pass", "not-applicable"].includes(row.status) && row.missingCoverage.length === 0) ? "pass" : "fail";
console.log(JSON.stringify({ schemaVersion: "changed-coverage.v1", status, threshold: thresholds.changedLines, rows }, null, 2));
process.exit(status === "pass" ? 0 : 1);
