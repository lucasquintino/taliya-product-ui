import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/future-consumer-discovery-negative-probe");
const missingScanRoot = resolve(probeRoot, "missing-scan-root");
const outDir = resolve(probeRoot, "reports");

rmSync(probeRoot, { recursive: true, force: true });

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-future-consumer-discovery.mjs",
    "--check",
    "--scan-root",
    missingScanRoot,
    "--out-dir",
    outDir,
    "--report-label",
    "missing-scan-root"
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status === 0) {
  console.error("Negative probe failed: future-consumer discovery audit passed with a missing scan root.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("scan root does not exist")) {
  console.error("Negative probe failed: discovery audit failed for an unexpected reason.");
  console.error(combinedOutput.trim());
  process.exit(1);
}

console.log("Negative probe passed: a missing future-consumer discovery scan root fails without writing the official report.");
