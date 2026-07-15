import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeDir = mkdtempSync(resolve(tmpdir(), "taliya-visual-capture-source-contract-"));
const sourceManifestPath = resolve(root, "specs/002-readiness-evidence-portability/source-assets-manifest.json");
const captureReportPath = resolve(root, "specs/001-product-ui-foundation/visual-certification-capture-audit.json");
const probeManifestPath = resolve(probeDir, "source-assets-manifest.json");
const probeReportPath = resolve(probeDir, "visual-certification-capture-audit.json");

function runCheck() {
  return spawnSync(process.execPath, [
    "scripts/capture-visual-certification-batch.mjs",
    "--check",
    "--source-manifest",
    probeManifestPath,
    "--report",
    probeReportPath
  ], { cwd: root, encoding: "utf8" });
}

try {
  const manifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));
  writeFileSync(probeReportPath, readFileSync(captureReportPath));

  manifest.generatedAt = "2099-01-01T00:00:00.000Z";
  manifest.source = "probe-non-semantic-source-location";
  writeFileSync(probeManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const metadataOnly = runCheck();
  if (metadataOnly.status !== 0) {
    console.error("Visual capture source-contract probe failed: volatile manifest metadata invalidated current evidence.");
    console.error(`${metadataOnly.stdout ?? ""}\n${metadataOnly.stderr ?? ""}`.trim());
    process.exit(1);
  }

  manifest.images[0].sha256 = "0".repeat(64);
  writeFileSync(probeManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const changedSource = runCheck();
  if (changedSource.status === 0) {
    console.error("Visual capture source-contract probe failed: changed source image hash was accepted.");
    process.exit(1);
  }

  const originalManifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));
  writeFileSync(probeManifestPath, `${JSON.stringify(originalManifest, null, 2)}\n`);
  const staleRenderReport = JSON.parse(readFileSync(captureReportPath, "utf8"));
  staleRenderReport.renderContractSha256 = "0".repeat(64);
  writeFileSync(probeReportPath, `${JSON.stringify(staleRenderReport, null, 2)}\n`);

  const changedRender = runCheck();
  if (changedRender.status === 0) {
    console.error("Visual capture source-contract probe failed: changed render contract was accepted.");
    process.exit(1);
  }

  const nonStaticReport = JSON.parse(readFileSync(captureReportPath, "utf8"));
  nonStaticReport.captureMode = "development";
  writeFileSync(probeReportPath, `${JSON.stringify(nonStaticReport, null, 2)}\n`);
  const nonStaticCapture = runCheck();
  if (nonStaticCapture.status === 0) {
    console.error("Visual capture source-contract probe failed: non-static capture evidence was accepted.");
    process.exit(1);
  }

  const renderErrorReport = JSON.parse(readFileSync(captureReportPath, "utf8"));
  renderErrorReport.rows[0].renderValid = false;
  renderErrorReport.rows[0].renderErrors = ["Failed to fetch dynamically imported module"];
  writeFileSync(probeReportPath, `${JSON.stringify(renderErrorReport, null, 2)}\n`);
  const renderErrorCapture = runCheck();
  if (renderErrorCapture.status === 0) {
    console.error("Visual capture source-contract probe failed: a visible Storybook render error was accepted as capture evidence.");
    process.exit(1);
  }

  console.log("Visual capture source-contract probe passed: volatile metadata is ignored; source image, render-contract, non-static mode, and visible render errors are rejected.");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
