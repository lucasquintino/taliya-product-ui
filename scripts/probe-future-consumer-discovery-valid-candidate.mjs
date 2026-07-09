import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/future-consumer-discovery-valid-probe");
const validRoot = resolve(probeRoot, "future-crm-valid");
const localReleaseManifest = JSON.parse(readFileSync(resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"), "utf8"));
const taliyaDependencies = Object.fromEntries(
  localReleaseManifest.packages.map((packageInfo) => [
    packageInfo.name,
    `file:vendor/taliya-product-ui/${packageInfo.tarball}`
  ])
);

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(resolve(validRoot, "app/crm"), { recursive: true });

writeFileSync(
  resolve(validRoot, "package.json"),
  `${JSON.stringify({
    name: "future-crm-valid",
    private: true,
    dependencies: taliyaDependencies
  }, null, 2)}\n`
);

writeFileSync(
  resolve(validRoot, "taliya-readiness.config.json"),
  `${JSON.stringify({
    reportLabel: "future-crm-valid",
    vendor: "vendor/taliya-product-ui",
    pageKitConfig: "taliya-page-kit.config.json",
    commands: ["typecheck", "lint", "test", "build"]
  }, null, 2)}\n`
);

writeFileSync(
  resolve(validRoot, "taliya-page-kit.config.json"),
  `${JSON.stringify({
    surfaces: [
      {
        id: "crm-shell",
        file: "components/crm-shell-client.tsx",
        required: [{ package: "@taliya/crm", name: "CrmProductShell" }]
      }
    ],
    routes: [
      {
        route: "/crm",
        file: "app/crm/page.tsx",
        required: [{ package: "@taliya/crm", name: "CrmProductShell" }]
      }
    ],
    routeCoverage: {
      root: "app/crm",
      baseRoute: "/crm"
    }
  }, null, 2)}\n`
);

writeFileSync(resolve(validRoot, "app/crm/page.tsx"), "export default function CrmPage() { return null; }\n");

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-future-consumer-discovery.mjs",
    "--check",
    "--scan-root",
    probeRoot,
    "--out-dir",
    probeRoot,
    "--report-label",
    "valid-probe"
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status !== 0) {
  console.error("Valid-candidate probe failed: discovery audit failed.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

const report = JSON.parse(readFileSync(resolve(probeRoot, "future-consumer-discovery-audit-valid-probe.json"), "utf8"));

const validRow = report.candidates.find((candidate) => candidate.name === "future-crm-valid");
if (!validRow) {
  console.error("Valid-candidate probe failed: synthetic valid candidate was not scanned.");
  process.exit(1);
}

if (report.futureCrmCandidateCount !== 1 || !validRow.isFutureCrmCandidate) {
  console.error("Valid-candidate probe failed: full future CRM consumer contract was not accepted as a candidate.");
  console.error(JSON.stringify({ futureCrmCandidateCount: report.futureCrmCandidateCount, validRow }, null, 2));
  process.exit(1);
}

if (validRow.nonCandidateReasons.length > 0 || validRow.missingTaliyaDeps.length > 0) {
  console.error("Valid-candidate probe failed: valid candidate still reports non-candidate reasons.");
  console.error(JSON.stringify(validRow, null, 2));
  process.exit(1);
}

console.log("Valid-candidate probe passed: a future CRM app with the full consumer contract is discovered as a real candidate.");
