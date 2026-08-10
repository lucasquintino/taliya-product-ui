#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const roots = ["packages", "apps", "scripts", "tests"].map((relative) => path.join(root, relative));
const patterns = [
  ["SECRET-AWS-ACCESS-KEY", /AKIA[0-9A-Z]{16}/],
  ["SECRET-GITHUB-TOKEN", /gh[pousr]_[A-Za-z0-9_]{30,}/],
  ["SECRET-PRIVATE-KEY", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["SECRET-API-KEY", /(?:api[_-]?key|secret[_-]?key)\s*[:=]\s*["'][A-Za-z0-9_\-]{20,}["']/i
  ]
];
const findings = [];
function visit(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", "dist", "coverage", "storybook-static", "artifacts"].includes(entry.name)) visit(file);
    } else if (/\.(?:ts|tsx|js|jsx|mjs|cjs|json|yml|yaml|md)$/.test(entry.name)) {
      const source = fs.readFileSync(file, "utf8");
      source.split(/\r?\n/).forEach((line, index) => {
        for (const [ruleId, pattern] of patterns) if (pattern.test(line)) findings.push({ ruleId, file: path.relative(root, file).replaceAll("\\", "/"), line: index + 1 });
      });
    }
  }
}
for (const directory of roots) visit(directory);
const output = { schemaVersion: "secret-scan.v1", status: findings.length ? "fail" : "pass", findings };
console.log(JSON.stringify(output, null, 2));
if (findings.length) process.exitCode = 1;
