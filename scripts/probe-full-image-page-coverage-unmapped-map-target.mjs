import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const mapPath = resolve(root, "specs/001-product-ui-foundation/image-coverage-map.md");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.md");
const syntheticImage = "99_round-4.1Z_probe_unmapped-covered-page.png";
const insertionMarker = "| `17_round-4.1A_hoje_01_acima-da-dobra.png.png` | Covered / 99% Visual Accepted |";
const syntheticRow = `| \`${syntheticImage}\` | Covered | synthetic unmapped page target probe | CrmProductShell, PageFilterBar, DataTable |`;

const originalMap = readFileSync(mapPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

try {
  if (!originalMap.includes(insertionMarker)) {
    console.error("Probe setup failed: could not find CRM logged-in insertion marker in image-coverage-map.md.");
    process.exit(1);
  }

  const modifiedMap = originalMap.replace(insertionMarker, `${syntheticRow}\n${insertionMarker}`);
  writeFileSync(mapPath, modifiedMap);

  const result = spawnSync(process.execPath, ["scripts/audit-full-image-page-coverage.mjs", "--check"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status === 0) {
    console.error("Expected full image page coverage audit to fail when a Covered page map row has no story mapping, but it passed.");
    process.exit(1);
  }

  const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
  const failedRow = probeAudit.unmappedCoveredTargetRows?.find((row) => row.image === syntheticImage);
  if (!failedRow || failedRow.mapped !== false || failedRow.section !== "CRM Logged-In Screens") {
    console.error("Expected unmapped covered target row for the synthetic image.");
    console.error(JSON.stringify(failedRow ?? null, null, 2));
    process.exit(1);
  }

  console.log("Full image page coverage unmapped-map-target probe passed.");
} finally {
  writeFileSync(mapPath, originalMap);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
