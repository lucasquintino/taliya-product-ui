import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/certification-scope-negative-probe");
const decisionPath = resolve(probeRoot, "certification-scope-decision.invalid.json");

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(probeRoot, { recursive: true });

writeFileSync(
  decisionPath,
  `${JSON.stringify({
    scope: "current-internal-library-readiness-accepted",
    accepted: true,
    acceptedBy: "",
    acceptedAt: "2026-6-29",
    acceptanceStatements: [
      "I accept current Internal/library readiness as the scoped completion bar."
    ]
  }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-certification-scope-decision.mjs",
    "--check",
    "--decision",
    decisionPath,
    "--report-label",
    "certification-scope-negative-probe",
    "--out-dir",
    probeRoot
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status === 0) {
  console.error("Negative probe failed: certification-scope audit passed an invalid scoped-completion decision.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("Certification scope decision is invalid")) {
  console.error("Negative probe failed: certification-scope audit failed for an unexpected reason.");
  console.error(combinedOutput.trim());
  process.exit(1);
}

console.log("Negative probe passed: an invalid scoped-completion decision fails the certification-scope audit.");
