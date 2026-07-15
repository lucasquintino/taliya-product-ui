import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureDir = mkdtempSync(join(tmpdir(), "taliya-report-freshness-probe-"));
const older = "2026-01-01T00:00:00.000Z";
const newer = "2026-01-02T00:00:00.000Z";

function writeReport(file, value) {
  writeFileSync(join(fixtureDir, file), `${JSON.stringify(value, null, 2)}\n`);
}

writeReport("library-readiness-gate.json", { generatedAt: newer, status: "pass" });
writeReport("release-candidate-audit.json", { generatedAt: older, status: "pass" });
writeReport("official-library-readiness-audit.json", { generatedAt: older, status: "pass-current-consumers" });
writeReport("library-consumption-status.json", { generatedAt: older, status: "pass-current-consumers" });
writeReport("crm-real-readiness-audit.json", { generatedAt: older, status: "pass-current-scope" });
writeReport("library-acceptance-audit.json", { generatedAt: older, status: "pass-current-scope" });
writeReport("goal-completion-audit.json", { generatedAt: older, verdict: "not-complete-globally" });

const result = spawnSync(
  process.execPath,
  ["scripts/audit-report-freshness.mjs", "--check", "--spec-dir", fixtureDir],
  { cwd: root, encoding: "utf8" }
);

if (result.status === 0) {
  console.error("Expected stale downstream reports to fail the freshness audit, but they passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("staleByTime=true")) {
  console.error("Expected the freshness audit to identify stale report timestamps.");
  console.error(output.trim());
  process.exit(1);
}

console.log("Report freshness stale-evidence probe passed.");
