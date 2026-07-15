import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const storyPath = resolve(root, "apps/docs/src/stories/ImageCoverageToday.stories.tsx");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.md");
const targetStoryId = "crm-image-coverage-hoje--image-17-hoje-base";
const targetImage = "17_round-4.1A_hoje_01_acima-da-dobra.png.png";

const originalStory = readFileSync(storyPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

try {
  if (!originalStory.includes('from "@taliya/crm"')) {
    throw new Error('Probe setup failed: expected ImageCoverageToday story to import from "@taliya/crm".');
  }

  const modifiedStory = originalStory.replaceAll('from "@taliya/crm"', 'from "../../packages/crm/src"');
  writeFileSync(storyPath, modifiedStory);

  const result = spawnSync(process.execPath, ["scripts/audit-full-image-page-coverage.mjs"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error("Expected full image page coverage audit to compute the non-official-import probe, but it crashed.");
  }

  const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
  const failedRow = probeAudit.rows?.find((row) => row.image === targetImage && row.storyId === targetStoryId);
  if (!failedRow || failedRow.status !== "fail" || failedRow.forbiddenLocalPackageImport !== true) {
    throw new Error(`Expected failed coverage row for the Image 17 story with non-official imports.\n${JSON.stringify(failedRow ?? null, null, 2)}`);
  }

  console.log("Full image page coverage non-official-import probe passed.");
} finally {
  writeFileSync(storyPath, originalStory);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
