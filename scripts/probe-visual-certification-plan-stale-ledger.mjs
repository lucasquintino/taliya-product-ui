import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const sourceLedgerPath = resolve(root, "specs/001-product-ui-foundation/batch-11-status-ledger.md");
const probeDir = resolve(root, "tmp/visual-audit-negative-probes");
const staleLedgerPath = resolve(probeDir, "batch-11-status-ledger-stale-image72.md");
const missingAssertionLedgerPath = resolve(probeDir, "batch-11-status-ledger-missing-current-evidence-assertion.md");

const image72 = "72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png";
const image71 = "71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png";

function replaceRequired(text, from, to) {
  if (!text.includes(from)) {
    console.error(`Probe setup failed: source ledger is missing expected text: ${from}`);
    process.exit(1);
  }

  return text.replace(from, to);
}

function runPlanProbe(ledgerPath, outName) {
  const outDir = resolve(probeDir, outName);
  const result = spawnSync(
    process.execPath,
    ["scripts/audit-visual-certification-plan.mjs", "--check", "--ledger", ledgerPath, "--out-dir", outDir],
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  const audit = JSON.parse(readFileSync(resolve(outDir, "visual-certification-plan-audit.json"), "utf8"));
  return { result, audit };
}

mkdirSync(probeDir, { recursive: true });

const originalLedger = readFileSync(sourceLedgerPath, "utf8");

let staleLedger = replaceRequired(
  originalLedger,
  `| \`${image72}\` | Aprovado |`,
  `| \`${image72}\` | Em revisão visual |`
);
staleLedger = staleLedger.replace(
  "Approved under the current 99% visual criterion.",
  "shell/content missing; text missing; overflow returned."
);
writeFileSync(staleLedgerPath, staleLedger);

const staleProbe = runPlanProbe(staleLedgerPath, "stale-image72");
if (staleProbe.result.status === 0) {
  console.error("Negative probe failed: stale reopened Image 72 evidence unexpectedly passed.");
  process.exit(1);
}

const staleRow = staleProbe.audit.pendingRows?.find((row) => row.image === image72);
if (!staleRow || staleRow.actionable !== false || !staleRow.missingFields?.some((field) => field.startsWith("currentEvidence:"))) {
  console.error("Negative probe failed: stale reopened Image 72 did not produce evidence findings.");
  console.error(JSON.stringify(staleRow ?? null, null, 2));
  process.exit(1);
}

const missingAssertionLedger = replaceRequired(
  originalLedger,
  `| \`${image71}\` | Ignorada |`,
  `| \`${image71}\` | Em revisão visual |`
);
writeFileSync(missingAssertionLedgerPath, missingAssertionLedger);

const missingAssertionProbe = runPlanProbe(missingAssertionLedgerPath, "missing-current-evidence-assertion");
if (missingAssertionProbe.result.status === 0) {
  console.error("Negative probe failed: pending image without a current evidence assertion unexpectedly passed.");
  process.exit(1);
}

const missingAssertionRow = missingAssertionProbe.audit.pendingRows?.find((row) => row.image === image71);
if (!missingAssertionRow || missingAssertionRow.hasCurrentEvidenceAssertion !== false) {
  console.error("Negative probe failed: missing current evidence assertion was not reported for Image 71.");
  console.error(JSON.stringify(missingAssertionRow ?? null, null, 2));
  process.exit(1);
}

console.log("Negative probe passed: stale reopened visual evidence and pending rows without current evidence assertions fail the visual certification plan audit.");
