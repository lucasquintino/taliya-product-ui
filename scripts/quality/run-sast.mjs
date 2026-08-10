#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rootFlag = process.argv.indexOf("--root");
const scanRoot = path.resolve(root, rootFlag >= 0 ? process.argv[rootFlag + 1] : "packages");
const patterns = [
  ["SAST-HTML-SINK", /dangerouslySetInnerHTML/],
  ["SAST-EVAL", /\b(?:eval|Function)\s*\(/],
  ["SAST-URL-PROTOCOL", /(?:href|src|url)\s*=\s*[`'\"]\s*javascript:/i],
  ["SAST-CHILD-PROCESS", /\b(?:exec|execFile|spawn|spawnSync)\s*\(/]
];
const findings = [];
function visit(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (/\.(?:ts|tsx|js|jsx|mjs|cjs)$/.test(entry.name) && !/\.(?:test|spec)\./.test(entry.name)) {
      const source = fs.readFileSync(file, "utf8");
      source.split(/\r?\n/).forEach((line, index) => {
        for (const [ruleId, pattern] of patterns) if (pattern.test(line)) findings.push({ ruleId, file: path.relative(root, file).replaceAll("\\", "/"), line: index + 1 });
      });
    }
  }
}
visit(scanRoot);
const output = { schemaVersion: "sast.v1", scanRoot: path.relative(root, scanRoot).replaceAll("\\", "/"), status: findings.length ? "fail" : "pass", findings };
console.log(JSON.stringify(output, null, 2));
if (findings.length) process.exitCode = 1;
