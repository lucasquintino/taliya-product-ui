import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const storyPath = resolve(root, "apps/docs/src/stories/ImageCoverageSales.stories.tsx");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/remaining-page-coverage-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/remaining-page-coverage-audit.md");

const targetPage = "SalesExperimentalListPage";
const requiredSnippet = 'worklistLayoutMode="compact-rail"';

const originalStory = readFileSync(storyPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

function fail(message, details = []) {
  console.error(message);
  for (const detail of details.filter(Boolean)) console.error(detail);
  process.exitCode = 1;
}

try {
  if (!originalStory.includes(requiredSnippet)) {
    fail(`Probe setup failed: ${storyPath} does not contain ${requiredSnippet}.`);
  } else {
    const pageStart = originalStory.indexOf(`export function ${targetPage}()`);
    const pageEnd = originalStory.indexOf("\nexport function ", pageStart + 1);
    const pageSource = originalStory.slice(pageStart, pageEnd);
    const modifiedPage = pageSource.replace(requiredSnippet, 'data-probe-worklist-layout="removed"');
    const modifiedStory = originalStory.slice(0, pageStart) + modifiedPage + originalStory.slice(pageEnd);

    if (modifiedStory === originalStory) {
      fail(`Probe setup failed: could not remove ${requiredSnippet} from ${targetPage}.`);
    } else {
      writeFileSync(storyPath, modifiedStory);

      const result = spawnSync(process.execPath, ["scripts/audit-remaining-page-coverage.mjs"], {
        cwd: root,
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 20
      });

      if (result.status !== 0) {
        fail("Probe failed: remaining-page coverage audit crashed while computing a family contract regression.", [
          result.stdout,
          result.stderr
        ]);
      } else {
        const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
        const failedRow = probeAudit.pageFamilyContractRows?.find((row) => row.page === targetPage);

        if (!failedRow) {
          fail(`Probe failed: no page-family contract row was written for ${targetPage}.`);
        } else if (failedRow.status !== "fail") {
          fail(`Probe failed: ${targetPage} contract row status was ${failedRow.status}, expected fail.`);
        } else if (!failedRow.missingSnippets?.includes(requiredSnippet)) {
          fail(`Probe failed: ${targetPage} did not report missing ${requiredSnippet}.`, [
            JSON.stringify(failedRow, null, 2)
          ]);
        } else {
          console.log(`Remaining page family-contract probe passed: ${targetPage} regression was rejected.`);
        }
      }
    }
  }
} finally {
  writeFileSync(storyPath, originalStory);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
