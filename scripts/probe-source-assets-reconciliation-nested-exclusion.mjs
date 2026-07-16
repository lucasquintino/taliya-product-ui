import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeDir = mkdtempSync(resolve(tmpdir(), "taliya-source-reconciliation-probe-"));
const outputPath = resolve(probeDir, "source-assets-reconciliation-audit.json");
const mapPath = resolve(probeDir, "image-coverage-map.md");
const baseline = JSON.parse(readFileSync(resolve(root, "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json"), "utf8"));

try {
  const topLevelNames = new Set(baseline.topLevelImages.map((image) => image.name));
  const nestedOnly = baseline.nestedImages.find((image) => !topLevelNames.has(image.name));
  if (!nestedOnly) throw new Error("Nested-exclusion probe requires a nested-only derivative image.");
  writeFileSync(mapPath, `# Probe map\n\n## CRM Logged-In Screens\n\n| Image | Status | Role | Required Components |\n| --- | --- | --- | --- |\n| \`${nestedOnly.name}\` | Covered | probe | none |\n`);
  const result = spawnSync(process.execPath, [
    "scripts/audit-source-assets-reconciliation.mjs",
    "--update",
    "--map",
    mapPath,
    "--output",
    outputPath
  ], { cwd: root, encoding: "utf8", maxBuffer: 1024 * 1024 * 20 });
  const audit = JSON.parse(readFileSync(outputPath, "utf8"));
  const pass =
    result.status !== 0 &&
    audit.status !== "pass" &&
    audit.routeTargetCount === 1 &&
    audit.availableRouteTargetCount === 0 &&
    audit.topLevelImageCount === baseline.topLevelImageCount &&
    audit.recursiveImageCount === baseline.recursiveImageCount &&
    audit.nestedDerivativeImageCount === baseline.nestedDerivativeImageCount &&
    audit.integrity?.missingRouteFiles?.includes(nestedOnly.name) &&
    audit.integrity?.status === "fail";
  if (!pass) {
    console.error("Nested-exclusion probe failed: recursive derivative images were accepted as canonical evidence.");
    console.error(JSON.stringify({ exitCode: result.status, audit }, null, 2));
    process.exit(1);
  }
  console.log("Source reconciliation nested-exclusion probe passed: a nested derivative cannot satisfy a covered route target.");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
