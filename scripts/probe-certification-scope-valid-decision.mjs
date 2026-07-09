import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/certification-scope-valid-probe");
const decisionPath = resolve(probeRoot, "certification-scope-decision.valid.json");
const reportPath = resolve(root, "specs/001-product-ui-foundation/certification-scope-decision-audit-certification-scope-valid-probe.json");
const templatePath = resolve(root, "specs/001-product-ui-foundation/contracts/certification-scope-decision.example.json");

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(probeRoot, { recursive: true });

const decision = JSON.parse(readFileSync(templatePath, "utf8"));
decision.acceptedBy = "Positive Probe";
decision.acceptedAt = "2026-06-29";
decision.notes = "Temporary positive probe decision. This is not the active project certification-scope decision.";
writeFileSync(decisionPath, `${JSON.stringify(decision, null, 2)}\n`);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-certification-scope-decision.mjs",
    "--check",
    "--decision",
    decisionPath,
    "--report-label",
    "certification-scope-valid-probe"
  ],
  {
    cwd: root,
    encoding: "utf8",
    timeout: 60000
  }
);

if (result.status !== 0) {
  console.error("Positive probe failed: certification-scope audit rejected a valid scoped-completion decision.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
if (report.scopedCompletionAccepted !== true || report.scope !== "current-internal-library-readiness-accepted") {
  console.error("Positive probe failed: valid scoped-completion decision did not produce scopedCompletionAccepted=true.");
  console.error(JSON.stringify({
    scope: report.scope,
    scopedCompletionAccepted: report.scopedCompletionAccepted,
    validationErrors: report.validationErrors
  }, null, 2));
  process.exit(1);
}

console.log("Positive probe passed: a valid scoped-completion decision is accepted by the certification-scope audit.");
