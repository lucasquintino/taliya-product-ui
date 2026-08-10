#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";

const [basePath = "artifacts/visual/capture-report.json", retryPath = "artifacts/visual/capture-retry.json", outputPath = basePath] = process.argv.slice(2);
const base = JSON.parse(fs.readFileSync(basePath, "utf8"));
const retry = JSON.parse(fs.readFileSync(retryPath, "utf8"));
const replacements = new Map(retry.results.map((row) => [row.id, row]));
const results = base.results.map((row) => replacements.get(row.id) ?? row);
const merged = { ...base, generatedAt: "deterministic", storyCount: results.length, passed: results.filter((row) => row.status === "pass").length, failed: results.filter((row) => row.status !== "pass").length, results };
fs.writeFileSync(outputPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`CAPTURE-MERGE: ${merged.passed}/${merged.storyCount} pass`);
if (merged.failed) process.exitCode = 1;
