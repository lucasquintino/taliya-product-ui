#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges } from "./source-identity.mjs";

const root = process.cwd();
const sourceRevision = process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const sourceDirty = hasSourceChanges(root);
const normalizedHash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const isGeneratedEvidencePath = (relative) => relative.startsWith("artifacts/") || /^specs\/001-product-ui-foundation\/.*-audit(?:-[^/]+)?\.(?:json|md)$/.test(relative);
const sourceTreeHash = (() => {
  const listing = spawnSync("git", ["ls-files", "-co", "--exclude-standard", "-z"], { cwd: root, encoding: "buffer" }).stdout.toString("utf8");
  const rows = listing.split("\0").filter(Boolean).map((relative) => relative.replaceAll("\\", "/")).filter((relative) => !isGeneratedEvidencePath(relative)).sort().map((relative) => {
    const file = path.join(root, relative);
    const raw = fs.readFileSync(file);
    const text = raw.toString("utf8").replace(/\r\n?/g, "\n");
    return `${relative}\0${normalizedHash(text)}\0${raw.length}\n`;
  });
  return normalizedHash(rows.join(""));
})();
const run = (id, command, args = []) => {
  const result = spawnSync(process.execPath, [command, ...args], { cwd: root, encoding: "utf8", timeout: 900000 });
  return { id, command: ["node", command, ...args], status: result.status === 0 ? "pass" : "fail", exitCode: result.status ?? 1, stdout: result.stdout.slice(-1000), stderr: result.stderr.slice(-1000) };
};
const reports = [];
const report = (relative, id, requiredStatus = "pass", predicate = null) => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { reports.push({ id, status: "fail", reason: "missing", file: relative }); return; }
  try {
    const value = JSON.parse(fs.readFileSync(file, "utf8"));
    const valid = predicate ? predicate(value) : value.status === requiredStatus || value.result === requiredStatus || (id === "story-interactions" && value.failed === 0) || (id === "capture" && value.failed === 0);
    const statusFailure = valid ? null : { code: "REPORT-STATUS-INVALID", expected: requiredStatus, actual: value.status ?? value.result ?? null };
    const provenanceFailure = value.sourceRevision && value.sourceRevision !== sourceRevision
      ? { code: "STALE-SOURCE-REVISION", expected: sourceRevision, actual: value.sourceRevision }
      : value.sourceTreeHash && value.sourceTreeHash !== sourceTreeHash
        ? { code: "STALE-SOURCE-TREE", expected: sourceTreeHash, actual: value.sourceTreeHash }
      : value.dirty === true
        ? { code: "DIRTY-SOURCE-EVIDENCE" }
        : null;
    reports.push({ id, status: valid && !provenanceFailure ? "pass" : "fail", file: relative, ...((provenanceFailure || statusFailure) ? { failure: { ...(statusFailure ?? {}), ...(provenanceFailure ?? {}) } } : {}) });
  } catch (error) { reports.push({ id, status: "fail", reason: error.message, file: relative }); }
};
report("artifacts/quality/story-interactions.json", "story-interactions");
report("artifacts/quality/responsive-overflow-triage.json", "responsive-overflow");
report("artifacts/visual/visual-comparison.json", "visual", "pass", (value) => value.status === "pass" || (value.storyCount > 0 && value.passed === value.storyCount && Array.isArray(value.failures) && value.failures.length === 0));
report("artifacts/visual/approval-audit.json", "visual-approvals", "pass", (value) => value.status === "pass" && value.pendingCount === 0 && value.errors?.length === 0);
report("artifacts/quality/final-waiver-audit.json", "waivers");
report("artifacts/performance/optimization-ledger.json", "performance-ledger", "pass", (value) => value.schemaVersion === "optimization-ledger.v1" && Array.isArray(value.entries) && value.entries.length > 0 && value.entries.every((entry) => entry.decision && entry.datasetHash && entry.sourcePaths?.length));
report("artifacts/quality/g-security.json", "security-gate");
report("artifacts/quality/g-performance.json", "performance-gate");
reports.push(run("dependencies-runtime", "scripts/quality/audit-dependencies.mjs", ["--prod"]));
reports.push(run("dependencies-toolchain", "scripts/quality/audit-dependencies.mjs", ["--full"]));
reports.push(run("sast", "scripts/quality/run-sast.mjs"));
reports.push(run("secrets", "scripts/quality/run-secrets.mjs"));
reports.push(run("ratchets", "scripts/quality/validate-ratchets.mjs"));
const status = reports.every((item) => item.status === "pass") ? "certified" : "rejected";
const output = { schemaVersion: "release-certification.v1", status, sourceRevision, sourceTreeHash, dirty: sourceDirty, evidenceHash: crypto.createHash("sha256").update(JSON.stringify(reports)).digest("hex"), reports };
const outputPath = path.join(root, "artifacts/release/release-certification.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`RELEASE-CERTIFICATION: ${status}`);
if (status !== "certified") process.exitCode = 1;
