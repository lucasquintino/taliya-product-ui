#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportFlag = process.argv.indexOf("--capture-report");
const outputFlag = process.argv.indexOf("--output");
const reportPath = path.resolve(root, reportFlag >= 0 ? process.argv[reportFlag + 1] : "artifacts/visual/capture-report.json");
const outputPath = path.resolve(root, outputFlag >= 0 ? process.argv[outputFlag + 1] : "artifacts/quality/responsive-overflow-triage.json");
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const rows = report.results.map((capture) => ({ storyId: capture.id, story: capture.title, viewport: capture.viewport, source: capture.importPath?.replace(/^\.\//, "") ?? null, owner: capture.importPath?.includes("packages/ui") ? "packages/ui/src" : capture.importPath?.includes("packages/crm") ? "packages/crm/src" : "apps/docs/src", overflow: capture.layout?.horizontalOverflow ? "defect" : "none", measuredScrollWidth: capture.layout?.scrollWidth ?? null, measuredClientWidth: capture.layout?.clientWidth ?? null, decision: capture.layout?.horizontalOverflow ? "requires-owner-fix" : "no-overflow", proof: capture.sha256 ? `visual:${capture.sha256}` : null }));
const unowned = rows.filter((row) => !row.source || !row.owner);
const defects = rows.filter((row) => row.overflow === "defect");
const output = { schemaVersion: "responsive-overflow-triage.v1", sourceRevision: report.sourceRevision, generatedAt: "deterministic", storyCount: rows.length, defects, unowned, rows, status: unowned.length || defects.length ? "fail" : "pass" };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`RESPONSIVE-OVERFLOW: ${rows.length - defects.length}/${rows.length} no-overflow`);
if (output.status === "fail") process.exitCode = 1;
