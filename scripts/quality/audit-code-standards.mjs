#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const update = process.argv.includes("--update");
const sourceRoots = ["packages/tokens/src", "packages/ui/src", "packages/crm/src"];
const baselinePath = path.join(root, "governance", "code-standards-baseline.json");
const findings = [];
function add(ruleId, file, line, detail) {
  // Keep the fingerprint stable when an unrelated edit moves the finding.
  // The normalized source line still distinguishes multiple contracts in one file.
  const normalizedLine = (arguments[4] ?? "").replace(/\s+/g, " ").trim();
  const fingerprint = crypto.createHash("sha256").update(`${ruleId}|${file}|${detail}|${normalizedLine}`).digest("hex");
  findings.push({ ruleId, file, line, detail, fingerprint });
}
for (const sourceRoot of sourceRoots) {
  const absolute = path.join(root, sourceRoot);
  const files = fs.readdirSync(absolute, { recursive: true }).filter((file) => /\.(?:ts|tsx)$/.test(file) && !/\.(?:test|spec)\.(?:ts|tsx)$/.test(file));
  for (const relative of files) {
    const file = path.join(sourceRoot, relative).replaceAll("\\", "/");
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      if (/\b(?:as\s+any|:\s*any\b|<any>)/.test(line)) add("STD-ANY-EXPLICIT", file, lineNumber, "explicit any", line);
      if (/@ts-(?:ignore|nocheck|expect-error)|eslint-disable/.test(line)) add("STD-SUPPRESSION", file, lineNumber, "suppression directive", line);
      if (/key\s*=\s*\{\s*(?:index|i)\s*\}/.test(line)) add("REACT-STABLE-KEY", file, lineNumber, "array index key", line);
      const effectContext = lines.slice(Math.max(0, index - 3), index).join(" ");
      if (/\buseEffect\s*\(/.test(line) && !/quality:\s*external-sync\b/i.test(effectContext)) {
        add("REACT-EFFECT", file, lineNumber, "effect requires external synchronization justification", line);
      }
      if (sourceRoot.includes("crm") && /<\s*(?:button|input|select|textarea)\b/.test(line)) add("REACT-RAW-CONTROL", file, lineNumber, "CRM source uses raw control instead of official primitive", line);
      if (/dangerouslySetInnerHTML|\beval\s*\(/.test(line)) add("SEC-UNSAFE-SINK", file, lineNumber, "unsafe HTML/evaluation sink", line);
    });
    const linesOfCode = lines.filter((line) => line.trim() && !line.trim().startsWith("//")).length;
    const complexityProxy = (source.match(/\b(?:if|for|while|switch|catch|&&|\|\|)\b/g) || []).length;
    const compatibilityRuntime = /internal-(?:ui|crm)-runtime\.tsx$/.test(file);
    const declarativeTokenCatalog = /^packages\/tokens\/src\/[^/]+Tokens\.ts$/.test(file);
    // Token families are declarative data catalogs, not behavioral modules; their
    // size is governed by token-family ownership and token-governance audits.
    if (!compatibilityRuntime && !declarativeTokenCatalog && linesOfCode > 400) add("ARCH-MODULE-SIZE", file, 1, "logicalLines>400", `logicalLines>${Math.floor(linesOfCode / 100) * 100}`);
    if (!compatibilityRuntime && !declarativeTokenCatalog && complexityProxy > 120) add("ARCH-COMPLEXITY", file, 1, "decisionProxy>120", `decisionProxy>${Math.floor(complexityProxy / 10) * 10}`);
  }
}
const current = { schemaVersion: "code-standards-baseline.v1", sourceRoots, findings: findings.sort((a, b) => a.fingerprint.localeCompare(b.fingerprint)) };
if (update || !fs.existsSync(baselinePath)) {
  if (!update) console.error("CODE-STANDARDS-BASELINE-MISSING (run with --update only in a reviewed baseline change)");
  else { fs.mkdirSync(path.dirname(baselinePath), { recursive: true }); fs.writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`); console.log(`CODE-STANDARDS: baseline written (${findings.length} findings)`); }
} else {
  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const allowed = new Set((baseline.findings ?? []).map((finding) => finding.fingerprint));
  const newFindings = findings.filter((finding) => !allowed.has(finding.fingerprint));
  const result = { schemaVersion: "code-standards-audit.v1", status: newFindings.length ? "fail" : "pass", currentCount: findings.length, baselineCount: baseline.findings?.length ?? 0, newFindings, findings };
  console.log(JSON.stringify(result, null, 2));
  if (newFindings.length) process.exitCode = 1;
}
