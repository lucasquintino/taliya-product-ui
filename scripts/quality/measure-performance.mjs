#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = process.cwd();
const labelFlag = process.argv.indexOf("--label");
const label = labelFlag >= 0 ? process.argv[labelFlag + 1] : "after";
const outputPath = path.join(root, "artifacts", "performance", label, "render-samples.json");
const dataset = Array.from({ length: 40 }, (_, index) => ({ id: `row-${index + 1}`, label: `Aluno ${index + 1}`, status: index % 3 === 0 ? "active" : "pending" }));
const datasetHash = crypto.createHash("sha256").update(JSON.stringify(dataset)).digest("hex");
const ui = await import(pathToFileURL(path.join(root, "packages/ui/dist/index.js")).href);
const scenarios = [
  { id: "ui-button", render: () => React.createElement(ui.Button, { variant: "primary" }, "Continuar") },
  { id: "ui-data-table", render: () => React.createElement(ui.DataTable, { columns: [{ key: "label", header: "Aluno" }], rows: dataset }) }
];
const samples = [];
for (const scenario of scenarios) {
  for (let index = 0; index < 3; index += 1) renderToStaticMarkup(scenario.render());
  const durations = [];
  for (let index = 0; index < 15; index += 1) {
    const start = performance.now();
    const html = renderToStaticMarkup(scenario.render());
    durations.push(performance.now() - start);
    if (!html) throw new Error(`${scenario.id} rendered empty markup`);
  }
  const sorted = [...durations].sort((a, b) => a - b);
  const percentile = (value) => sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * value) - 1)];
  samples.push({ id: scenario.id, repetitions: durations.length, warmups: 3, samplesMs: durations.map((value) => Number(value.toFixed(4))), medianMs: Number(percentile(0.5).toFixed(4)), p95Ms: Number(percentile(0.95).toFixed(4)) });
}
const output = {
  schemaVersion: "performance-samples.v1",
  label,
  sourceRevision: process.env.GIT_COMMIT ?? "working-tree",
  generatedAt: new Date().toISOString(),
  environment: { node: process.version, platform: process.platform, arch: process.arch, cpu: os.cpus()[0]?.model ?? "unknown" },
  datasetHash,
  samples
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`PERF-MEASURE: ${label} ${samples.length} scenarios`);
