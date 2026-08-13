#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const run = spawnSync(process.execPath, ["scripts/quality/validate-waivers.mjs", "--check"], { cwd: root, encoding: "utf8" });
let validator;
try { validator = JSON.parse(run.stdout); } catch { validator = { status: "error", raw: run.stdout }; }
const output = { schemaVersion: "final-waiver-audit.v1", sourceRevision: sourceRevision(root), sourceTreeHash: sourceTreeHash(root), dirty: hasSourceChanges(root), status: run.status === 0 && validator.status === "pass" ? "pass" : "fail", validator };
const outputPath = path.join(root, "artifacts/quality/final-waiver-audit.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`FINAL-WAIVERS: ${output.status}`);
if (output.status !== "pass") process.exitCode = 1;
