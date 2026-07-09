import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const storybookIndexPath = resolve(root, "apps/docs/storybook-static/index.json");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.md");
const targetStoryId = "crm-image-coverage-hoje--image-17-hoje-base";
const targetImage = "17_round-4.1A_hoje_01_acima-da-dobra.png.png";

const originalIndex = readFileSync(storybookIndexPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

try {
  const index = JSON.parse(originalIndex);
  if (!index.entries?.[targetStoryId]) {
    console.error(`Probe setup failed: Storybook index is already missing ${targetStoryId}`);
    process.exit(1);
  }

  delete index.entries[targetStoryId];
  writeFileSync(storybookIndexPath, `${JSON.stringify(index)}\n`);

  const result = spawnSync(process.execPath, ["scripts/audit-full-image-page-coverage.mjs", "--check"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status === 0) {
    console.error("Expected full image page coverage audit to fail when a target story is missing, but it passed.");
    process.exit(1);
  }

  const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
  const failedRow = probeAudit.rows?.find((row) => row.image === targetImage && row.storyId === targetStoryId);
  if (!failedRow || failedRow.status !== "fail" || failedRow.storyIndexed !== false) {
    console.error("Expected failed coverage row for the removed Image 17 story.");
    console.error(JSON.stringify(failedRow ?? null, null, 2));
    process.exit(1);
  }

  console.log("Full image page coverage missing-story probe passed.");
} finally {
  writeFileSync(storybookIndexPath, originalIndex);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
