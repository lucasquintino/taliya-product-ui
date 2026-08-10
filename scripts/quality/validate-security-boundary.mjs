#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";

const files = ["SECURITY.md", "packages/tokens/README.md", "packages/ui/README.md", "packages/crm/README.md"];
const required = ["consumer", "authentication", "authorization", "CSP", "CSRF", "rate limit"];
const missing = [];
for (const file of files) {
  const source = fs.existsSync(file) ? fs.readFileSync(file, "utf8").toLowerCase() : "";
  for (const term of required) if (!source.includes(term.toLowerCase())) missing.push(`${file}:${term}`);
}
console.log(JSON.stringify({ schemaVersion: "security-boundary.v1", status: missing.length ? "fail" : "pass", missing }, null, 2));
if (missing.length) process.exitCode = 1;
