import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/future-consumer-adoption-mismatch-probe");
const candidateRoot = resolve(probeRoot, "future-crm-candidate");
const otherConsumerRoot = resolve(probeRoot, "other-future-crm");
const discoveryPath = resolve(probeRoot, "discovery.json");
const reportLabel = "future-adoption-mismatch-probe";
const readinessLabel = "future-crm-candidate";

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(candidateRoot, { recursive: true });
mkdirSync(otherConsumerRoot, { recursive: true });

writeFileSync(
  resolve(candidateRoot, "taliya-readiness.config.json"),
  `${JSON.stringify({
    reportLabel: readinessLabel,
    vendor: "vendor/taliya-product-ui",
    pageKitConfig: "taliya-page-kit.config.json",
    commands: ["typecheck", "lint", "test", "build"]
  }, null, 2)}\n`
);

writeFileSync(
  resolve(probeRoot, `library-readiness-gate-${readinessLabel}.json`),
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    status: "pass",
    consumerRoot: otherConsumerRoot,
    reportLabel: readinessLabel,
    rows: []
  }, null, 2)}\n`
);

writeFileSync(
  discoveryPath,
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    scanRoot: probeRoot,
    status: "pass",
    futureCrmCandidateCount: 1,
    futureCrmCandidates: [
      {
        path: candidateRoot,
        name: readinessLabel,
        packageName: readinessLabel,
        hasPackageJson: true,
        hasReadinessConfig: true,
        hasPageKitConfig: true,
        hasCrmRoute: true,
        taliyaDeps: ["@taliya/crm", "@taliya/tokens", "@taliya/ui"],
        requiredTaliyaDeps: ["@taliya/tokens", "@taliya/ui", "@taliya/crm"],
        missingTaliyaDeps: [],
        score: 5,
        excludedReasons: [],
        nonCandidateReasons: [],
        isFutureCrmCandidate: true
      }
    ],
    scannedCount: 1,
    candidates: []
  }, null, 2)}\n`
);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-future-consumer-adoption.mjs",
    "--check",
    "--discovery",
    discoveryPath,
    "--readiness-report-dir",
    probeRoot,
    "--out-dir",
    probeRoot,
    "--report-label",
    reportLabel
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status === 0) {
  console.error("Mismatch probe failed: future-consumer adoption audit accepted readiness evidence for a different consumer root.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("Future CRM candidates missing adoption evidence")) {
  console.error("Mismatch probe failed: adoption audit failed for an unexpected reason.");
  console.error(combinedOutput.trim());
  process.exit(1);
}

console.log("Mismatch probe passed: matching labels with mismatched consumer roots are rejected.");

