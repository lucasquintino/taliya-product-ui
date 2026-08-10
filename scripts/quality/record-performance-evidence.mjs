#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const beforePath = path.join(root, "artifacts/performance/before/render-samples.json");
const afterPath = path.join(root, "artifacts/performance/after/render-samples.json");
if (!fs.existsSync(beforePath) || !fs.existsSync(afterPath)) throw new Error("performance before/after samples are required");
const before = JSON.parse(fs.readFileSync(beforePath, "utf8"));
const after = JSON.parse(fs.readFileSync(afterPath, "utf8"));
const beforeById = new Map(before.samples.map((sample) => [sample.id, sample]));
const ledger = after.samples.map((sample) => {
  const previous = beforeById.get(sample.id);
  return {
    scenario: sample.id,
    sourcePaths: ["packages/ui/src/internal-ui-runtime.tsx"],
    datasetHash: after.datasetHash,
    hypothesis: "No optimization applied until a measured bottleneck is reproducible.",
    decision: "accepted-baseline",
    beforeMedianMs: previous?.medianMs ?? null,
    afterMedianMs: sample.medianMs,
    linkedGates: ["G-PERF", "G-UNIT", "G-A11Y", "G-VISUAL", "G-PACK", "G-CONSUMER"]
  };
});
const sourceRevision = process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const output = { schemaVersion: "optimization-ledger.v1", sourceRevision, before: "artifacts/performance/before/render-samples.json", after: "artifacts/performance/after/render-samples.json", entries: ledger };
const outputPath = path.join(root, "artifacts/performance/optimization-ledger.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`PERF-LEDGER: ${ledger.length} scenarios recorded`);
