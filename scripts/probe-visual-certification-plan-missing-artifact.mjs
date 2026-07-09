import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const sourceLedgerPath = resolve(root, "specs/001-product-ui-foundation/batch-11-status-ledger.md");
const probeDir = resolve(root, "tmp/visual-audit-negative-probes");
const probeLedgerPath = resolve(probeDir, "batch-11-status-ledger-missing-artifact-image72.md");
const probeOutDir = resolve(probeDir, "missing-artifact-image72");

const targetImage = "72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png";
const existingArtifact =
  "tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707/image72-source-current-side-by-side.png";
const missingArtifact = "tmp/visual-audit/batch11/__missing-artifact-probe__/image72-source-current-side-by-side.png";
const approvedMarker = `| \`${targetImage}\` | Aprovado |`;
const reopenedMarker = `| \`${targetImage}\` | Em revisão visual |`;

const originalLedger = readFileSync(sourceLedgerPath, "utf8");

function fail(message, details = []) {
  console.error(message);
  for (const detail of details.filter(Boolean)) console.error(detail);
  process.exitCode = 1;
}

mkdirSync(probeOutDir, { recursive: true });

if (!originalLedger.includes(approvedMarker)) {
  fail(`Probe setup failed: ledger does not contain approved Image72 row marker.`);
} else if (!originalLedger.includes(existingArtifact)) {
  fail(`Probe setup failed: ledger does not contain ${existingArtifact}.`);
} else {
  const probeLedger = originalLedger
    .replace(approvedMarker, reopenedMarker)
    .replace(existingArtifact, missingArtifact);

  writeFileSync(probeLedgerPath, probeLedger);

  const result = spawnSync(
    process.execPath,
    [
      "scripts/audit-visual-certification-plan.mjs",
      "--check",
      "--ledger",
      probeLedgerPath,
      "--out-dir",
      probeOutDir
    ],
    {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 20
    }
  );

  if (result.status === 0) {
    fail("Probe failed: visual certification plan audit passed with a missing evidence artifact.", [
      result.stdout,
      result.stderr
    ]);
  } else {
    const probeAudit = JSON.parse(readFileSync(resolve(probeOutDir, "visual-certification-plan-audit.json"), "utf8"));
    const row = probeAudit.pendingRows?.find((item) => item.image === targetImage);
    const missingRefs = row?.missingEvidenceArtifacts?.map((artifact) => artifact.ref) ?? [];

    if (!row) {
      fail(`Probe failed: ${targetImage} row was not written to the audit.`);
    } else if (!row.missingFields?.includes("evidenceArtifacts")) {
      fail(`Probe failed: ${targetImage} did not report evidenceArtifacts as a missing field.`, [
        JSON.stringify(row, null, 2)
      ]);
    } else if (!missingRefs.includes(missingArtifact)) {
      fail(`Probe failed: missing artifact ref was not reported for ${targetImage}.`, [
        JSON.stringify(row.missingEvidenceArtifacts, null, 2)
      ]);
    } else {
      console.log(`Visual certification plan missing-artifact probe passed: ${targetImage} rejected ${missingArtifact}.`);
    }
  }
}
