import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/future-consumer-discovery-partial-probe");
const partialRoot = resolve(probeRoot, "future-crm-partial");

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(partialRoot, { recursive: true });

writeFileSync(
  resolve(partialRoot, "package.json"),
  `${JSON.stringify({
    name: "future-crm-partial",
    private: true,
    dependencies: {}
  }, null, 2)}\n`
);

writeFileSync(
  resolve(partialRoot, "taliya-readiness.config.json"),
  `${JSON.stringify({
    reportLabel: "future-crm-partial",
    vendor: "vendor/taliya-product-ui",
    pageKitConfig: "taliya-page-kit.config.json",
    commands: ["typecheck", "lint", "test", "build"]
  }, null, 2)}\n`
);

writeFileSync(
  resolve(partialRoot, "taliya-page-kit.config.json"),
  `${JSON.stringify({
    surfaces: [],
    routes: []
  }, null, 2)}\n`
);

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
    "partial-probe"
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status !== 0) {
  console.error("Partial-candidate probe failed: discovery audit itself failed.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

const report = JSON.parse(readFileSync(resolve(probeRoot, "future-consumer-discovery-audit-partial-probe.json"), "utf8"));

const partialRow = report.candidates.find((candidate) => candidate.name === "future-crm-partial");
if (!partialRow) {
  console.error("Partial-candidate probe failed: synthetic partial candidate was not scanned.");
  process.exit(1);
}

if (report.futureCrmCandidateCount !== 0 || partialRow.isFutureCrmCandidate) {
  console.error("Partial-candidate probe failed: weak future CRM evidence was accepted as a candidate.");
  console.error(JSON.stringify({ futureCrmCandidateCount: report.futureCrmCandidateCount, partialRow }, null, 2));
  process.exit(1);
}

const requiredReasons = ["missing app/crm or src/app/crm route", "missing @taliya/* package dependencies"];
const missingReasons = requiredReasons.filter((reason) => !partialRow.nonCandidateReasons.includes(reason));
if (missingReasons.length > 0) {
  console.error(`Partial-candidate probe failed: missing expected non-candidate reasons: ${missingReasons.join(", ")}`);
  process.exit(1);
}

console.log("Partial-candidate probe passed: weak future CRM evidence is not accepted as real future CRM adoption scope.");
