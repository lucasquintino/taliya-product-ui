#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const update = process.argv.includes("--update");
const baselinePath = path.join(root, "governance", "architecture-baseline.json");
const packageNames = ["tokens", "ui", "crm"];
const allowed = { tokens: [], ui: ["tokens"], crm: ["tokens", "ui"] };
const modules = [];
const edges = [];
for (const packageName of packageNames) {
  const sourceDir = path.join(root, "packages", packageName, "src");
  for (const relative of fs.readdirSync(sourceDir, { recursive: true }).filter((file) => /\.(?:ts|tsx)$/.test(file) && !/\.(?:test|spec)\.(?:ts|tsx)$/.test(file))) {
    const file = path.join("packages", packageName, "src", relative).replaceAll("\\", "/");
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const lines = source.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("//")).length;
    const complexity = (source.match(/\b(?:if|for|while|switch|catch)\b|&&|\|\|/g) || []).length;
    const compatibilityRuntime = /internal-(?:ui|crm)-runtime\.tsx$/.test(file);
    const fingerprint = crypto.createHash("sha256").update(`${file}|${lines}|${complexity}`).digest("hex");
    modules.push({ file, package: packageName, logicalLines: lines, complexity, compatibilityRuntime, fingerprint });
    for (const imported of source.matchAll(/from\s+["'](@taliya\/(tokens|ui|crm))["']/g)) edges.push({ from: packageName, to: imported[2], source: file });
  }
}
const invalidEdges = edges.filter((edge) => !allowed[edge.from].includes(edge.to));
const baseline = { schemaVersion: "architecture-baseline.v1", packageDirection: allowed, modules: modules.sort((a, b) => a.file.localeCompare(b.file)), edges: edges.sort((a, b) => `${a.from}:${a.to}:${a.source}`.localeCompare(`${b.from}:${b.to}:${b.source}`)), debtFingerprint: crypto.createHash("sha256").update(JSON.stringify(modules)).digest("hex") };
if (update || !fs.existsSync(baselinePath)) {
  if (!update) { console.error("ARCHITECTURE-BASELINE-MISSING"); process.exitCode = 1; }
  else { fs.mkdirSync(path.dirname(baselinePath), { recursive: true }); fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`); console.log(`ARCHITECTURE: baseline written (${modules.length} modules)`); }
} else {
  const previous = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const allowedFingerprints = new Set((previous.modules ?? []).map((module) => module.fingerprint));
  const newDebt = modules.filter((module) => !allowedFingerprints.has(module.fingerprint));
  const result = { schemaVersion: "architecture-audit.v1", status: invalidEdges.length || newDebt.length ? "fail" : "pass", moduleCount: modules.length, edgeCount: edges.length, invalidEdges, newDebt, debtFingerprint: baseline.debtFingerprint };
  console.log(JSON.stringify(result, null, 2));
  if (result.status === "fail") process.exitCode = 1;
}
