import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const storyPath = resolve(root, "apps/docs/src/stories/ImageCoverageToday.stories.tsx");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/full-image-page-coverage-audit.md");
const targetStoryId = "crm-image-coverage-hoje--image-17-hoje-base";
const targetImage = "17_round-4.1A_hoje_01_acima-da-dobra.png.png";
const misplacedMarker = `story: "Fonte deslocada para probe: ${targetImage}."`;

const originalStory = readFileSync(storyPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

try {
  if (!originalStory.includes(targetImage)) {
    throw new Error(`Probe setup failed: expected ImageCoverageToday story to reference ${targetImage}.`);
  }

  let modifiedStory = originalStory.replaceAll(targetImage, "17_round-4.1A_hoje_01_source-marker-probe-removed.png.png");
  modifiedStory = modifiedStory.replace(
    'export const Image20HistoricoDeHoje: Story = {',
    `export const Image20HistoricoDeHoje: Story = {\n  sourceImageProbe: "${targetImage}",\n  sourceImageProbeDescription: ${JSON.stringify(misplacedMarker)},`
  );
  writeFileSync(storyPath, modifiedStory);

  const result = spawnSync(process.execPath, ["scripts/audit-full-image-page-coverage.mjs"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    throw new Error("Expected full image page coverage audit to compute the misplaced-marker probe, but it crashed.");
  }

  const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
  const failedRow = probeAudit.rows?.find((row) => row.image === targetImage && row.storyId === targetStoryId);
  if (!failedRow || failedRow.status !== "fail" || failedRow.storyExportFound !== true || failedRow.sourceImageReferenced !== false) {
    throw new Error(`Expected failed coverage row for the Image 17 story with its marker misplaced into another story export.\n${JSON.stringify(failedRow ?? null, null, 2)}`);
  }

  console.log("Full image page coverage misplaced-source-marker probe passed.");
} finally {
  writeFileSync(storyPath, originalStory);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
