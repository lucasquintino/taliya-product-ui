import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/future-consumer-adoption-positive-probe");
const fixtureRoot = resolve(probeRoot, "future-crm-valid-adoption");
const discoveryPath = resolve(probeRoot, "discovery.json");
const reportLabel = "future-adoption-positive-probe";
const readinessLabel = "future-crm-valid-adoption";

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(fixtureRoot, { recursive: true });

writeFileSync(
  resolve(fixtureRoot, "taliya-readiness.config.json"),
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
    consumerRoot: fixtureRoot,
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
        path: fixtureRoot,
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

if (result.status !== 0) {
  console.error("Positive probe failed: future-consumer adoption audit did not accept matching labeled readiness evidence.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

console.log("Positive probe passed: a discovered future CRM candidate with matching labeled readiness evidence is accepted.");

