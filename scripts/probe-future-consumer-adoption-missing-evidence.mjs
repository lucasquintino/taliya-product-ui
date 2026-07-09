import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, "tmp/future-consumer-adoption-negative-probe/future-crm-missing-readiness");
const discoveryPath = resolve(root, "tmp/future-consumer-adoption-negative-probe/discovery.json");
const reportLabel = "future-adoption-negative-probe";

rmSync(resolve(root, "tmp/future-consumer-adoption-negative-probe"), { recursive: true, force: true });
mkdirSync(fixtureRoot, { recursive: true });

writeFileSync(
  resolve(fixtureRoot, "taliya-readiness.config.json"),
  `${JSON.stringify({
    reportLabel: "future-crm-missing-readiness",
    vendor: "vendor/taliya-product-ui",
    pageKitConfig: "taliya-page-kit.config.json",
    commands: ["typecheck", "lint", "test", "build"]
  }, null, 2)}\n`
);

writeFileSync(
  discoveryPath,
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    scanRoot: resolve(root, "tmp/future-consumer-adoption-negative-probe"),
    status: "pass",
    futureCrmCandidateCount: 1,
    futureCrmCandidates: [
      {
        path: fixtureRoot,
        name: "future-crm-missing-readiness",
        packageName: "future-crm-missing-readiness",
        hasPackageJson: true,
        hasReadinessConfig: true,
        hasPageKitConfig: true,
        hasCrmRoute: true,
        taliyaDeps: ["@taliya/crm", "@taliya/tokens", "@taliya/ui"],
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
  console.error("Negative probe failed: future-consumer adoption audit passed without matching readiness evidence.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("Future CRM candidates missing adoption evidence")) {
  console.error("Negative probe failed: adoption audit failed for an unexpected reason.");
  console.error(combinedOutput.trim());
  process.exit(1);
}

console.log("Negative probe passed: a discovered future CRM candidate without matching labeled readiness evidence fails the future-consumer adoption audit.");
