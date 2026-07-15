import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const storyPath = resolve(root, "apps/docs/src/stories/ImageCoverageSales.stories.tsx");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/kanban-family-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/kanban-family-audit.md");

const targetPage = "SalesPipelinePage";
const requiredSnippet = "<CrmKanbanPage";

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
    const modifiedStory = originalStory.replace(
      /<CrmKanbanPage(\s+activeNavId="pipeline")/,
      '<section data-probe-local-kanban="true"$1'
    ).replace(
      /<\/CrmKanbanPage>/,
      "</section>"
    );

    if (modifiedStory === originalStory || modifiedStory.includes("<CrmKanbanPage\n      activeNavId=\"pipeline\"")) {
      fail(`Probe setup failed: could not replace ${requiredSnippet} in ${targetPage}.`);
    } else {
      writeFileSync(storyPath, modifiedStory);

      const result = spawnSync(process.execPath, ["scripts/audit-kanban-family.mjs"], {
        cwd: root,
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 20
      });

      if (result.status !== 0) {
        fail("Probe failed: kanban family audit crashed while computing a CrmKanbanPage regression.", [
          result.stdout,
          result.stderr
        ]);
      } else {
        const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
        const failedRow = probeAudit.rows?.find((row) => row.page === targetPage);

        if (!failedRow) {
          fail(`Probe failed: no kanban-family row was written for ${targetPage}.`);
        } else if (failedRow.status !== "fail") {
          fail(`Probe failed: ${targetPage} row status was ${failedRow.status}, expected fail.`);
        } else if (!failedRow.missingSnippets?.includes(`${targetPage}: ${requiredSnippet}`)) {
          fail(`Probe failed: ${targetPage} did not report missing ${requiredSnippet}.`, [
            JSON.stringify(failedRow, null, 2)
          ]);
        } else {
          console.log(`Kanban family regression probe passed: ${targetPage} CrmKanbanPage regression was rejected.`);
        }
      }
    }
  }
} finally {
  writeFileSync(storyPath, originalStory);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}
