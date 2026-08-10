#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const findings = [];
for (const pkg of ["tokens", "ui", "crm"]) {
  const dir = path.join(root, "packages", pkg, "src");
  for (const relative of fs.readdirSync(dir, { recursive: true }).filter((file) => /\.(?:ts|tsx)$/.test(file) && !/\.(?:test|spec)\./.test(file))) {
    const file = `packages/${pkg}/src/${relative}`.replaceAll("\\", "/");
    const source = fs.readFileSync(path.join(root, file), "utf8");
    source.split(/\r?\n/).forEach((line, index) => {
      if (/dangerouslySetInnerHTML|\beval\s*\(|new\s+Function\s*\(/.test(line) && !/@trusted-sink/.test(line)) findings.push({ id: "SEC-UNSAFE-SINK", file, line: index + 1 });
      if (/(?:href|src|window\.location)\s*=.*(?:javascript:|data:)/i.test(line) && !/@trusted-protocol/.test(line)) findings.push({ id: "SEC-UNSAFE-PROTOCOL", file, line: index + 1 });
    });
  }
}
console.log(JSON.stringify({ schemaVersion: "trust-boundary-audit.v1", status: findings.length ? "fail" : "pass", findings }, null, 2));
if (findings.length) process.exitCode = 1;
