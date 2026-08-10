#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);
const packageName = args.includes("--package") ? args[args.indexOf("--package") + 1] : "";
const packageConfig = {
  ui: { name: "@taliya/ui", gateId: "G-WAVE5", output: "artifacts/quality/g-wave5.json", packageAudit: "components" },
  crm: { name: "@taliya/crm", gateId: "G-WAVE6", output: "artifacts/quality/g-wave6.json", packageAudit: "crm" }
}[packageName];
if (!packageConfig) throw new Error("WAVE-PACKAGE-MISSING: use --package ui or --package crm");

const capturePath = path.join(root, "artifacts/visual/capture-report.json");
const capture = fs.existsSync(capturePath) ? JSON.parse(fs.readFileSync(capturePath, "utf8")) : {};
const sourceRevision = process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const sourceDirty = Boolean(spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: root, encoding: "utf8" }).stdout.trim());
const sourceTreeHash = capture.sourceTreeHash ?? null;

function runner(command) {
  const [file, ...commandArgs] = command;
  const executable = file === "corepack" && process.platform === "win32" ? "corepack.cmd" : file;
  const result = spawnSync(executable, commandArgs, { cwd: root, encoding: "utf8", timeout: 900000, shell: executable.endsWith(".cmd") });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  return {
    command,
    status: result.status === 0 ? "pass" : "fail",
    exitCode: result.status ?? 1,
    outputSha256: crypto.createHash("sha256").update(output).digest("hex")
  };
}

const checks = [
  ["G-TYPE", ["corepack", "pnpm", "--filter", packageConfig.name, "typecheck"]],
  ["G-LINT", ["corepack", "pnpm", "--filter", packageConfig.name, "lint"]],
  ["G-UNIT", ["corepack", "pnpm", "--filter", packageConfig.name, "test"]],
  ["G-ARCH", [process.execPath, "scripts/quality/audit-architecture.mjs"]],
  ["G-TOKENS", [process.execPath, "scripts/audit-design-tokens.mjs", "--check"]],
  ["G-PERF", [process.execPath, "scripts/quality/audit-package-performance.mjs"]],
  ["G-PACK", [process.execPath, "scripts/audit-package-artifacts.mjs", "--check"]],
  ["G-CONSUMER", [process.execPath, "scripts/quality/audit-packed-consumer.mjs"]]
].map(([id, command]) => ({ id, ...runner(command) }));

function readGate(id, file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) return { id, status: "fail", failureCode: "MISSING-EVIDENCE", file };
  try {
    const value = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const pass = value.status === "pass" || value.result === "pass" || value.failed === 0 || (value.storyCount > 0 && value.passed === value.storyCount) || (id === "G-VISUAL-APPROVALS" && value.status === "pass");
    return {
      id,
      status: pass ? "pass" : "fail",
      file,
      sourceRevision: value.sourceRevision ?? value.source?.commitSha ?? null,
      sourceTreeHash: value.sourceTreeHash ?? value.source?.sourceTreeHash ?? null,
      dirty: value.dirty ?? value.source?.dirty ?? null
    };
  } catch (error) {
    return { id, status: "fail", failureCode: "INVALID-EVIDENCE", file, detail: error.message };
  }
}

checks.push(readGate("G-STORY-TEST", "artifacts/quality/story-interactions.json"));
checks.push(readGate("G-VISUAL", "artifacts/visual/visual-comparison.json"));
checks.push(readGate("G-VISUAL-APPROVALS", "artifacts/visual/approval-audit.json"));
checks.push(readGate("G-SECURITY", "artifacts/quality/g-security.json"));
checks.push({ id: "G-PROVENANCE-CAPTURE", ...runner([process.execPath, "scripts/quality/record-provenance-evidence.mjs"]) });
checks.push(readGate("G-PROVENANCE", "artifacts/quality/g-provenance.json"));
if (sourceDirty) checks.push({ id: "G-PROVENANCE-CLEAN", status: "fail", failureCode: "DIRTY-SOURCE-TREE" });

const output = {
  schemaVersion: "gate-run.v1",
  gateId: packageConfig.gateId,
  scope: packageConfig.name,
  sourceRevision,
  sourceTreeHash,
  dirty: sourceDirty,
  mode: "check",
  status: checks.every((check) => check.status === "pass") ? "pass" : "fail",
  checks
};
const outputPath = path.join(root, packageConfig.output);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`${packageConfig.gateId}: ${output.status}`);
if (output.status !== "pass") process.exitCode = 1;
