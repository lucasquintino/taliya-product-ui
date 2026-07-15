import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeDir = mkdtempSync(resolve(tmpdir(), "taliya-source-reconciliation-probe-"));
const outputPath = resolve(probeDir, "source-assets-reconciliation-audit.json");
const baseline = JSON.parse(readFileSync(resolve(root, "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json"), "utf8"));

try {
  const result = spawnSync(process.execPath, [
    "scripts/audit-source-assets-reconciliation.mjs",
    "--update",
    "--expected-count",
    String(baseline.recursiveImageCount),
    "--output",
    outputPath
  ], { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 * 20 });
  const audit = JSON.parse(readFileSync(outputPath, "utf8"));
  const pass =
    result.status !== 0 &&
    audit.status !== "pass" &&
    audit.canonicalTopLevelImageCount === baseline.canonicalTopLevelImageCount &&
    audit.recursiveImageCount === baseline.recursiveImageCount &&
    audit.nestedDerivativeImageCount === baseline.nestedDerivativeImageCount &&
    audit.canonicalTopLevelImageCount < audit.recursiveImageCount &&
    audit.integrity?.status === "pass";
  if (!pass) {
    console.error("Nested-exclusion probe failed: recursive derivative images were accepted as canonical evidence.");
    console.error(JSON.stringify({ exitCode: result.status, audit }, null, 2));
    process.exit(1);
  }
  console.log("Source reconciliation nested-exclusion probe passed: 71 derivative images cannot satisfy the canonical count.");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
