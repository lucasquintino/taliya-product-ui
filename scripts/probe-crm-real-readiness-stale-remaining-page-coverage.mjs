import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const coveragePath = resolve(root, "specs/001-product-ui-foundation/remaining-page-coverage-audit.json");
const readinessJsonPath = resolve(root, "specs/001-product-ui-foundation/crm-real-readiness-audit.json");
const readinessMdPath = resolve(root, "specs/001-product-ui-foundation/crm-real-readiness-audit.md");
const originalCoverage = readFileSync(coveragePath, "utf8");
const originalReadinessJson = readFileSync(readinessJsonPath, "utf8");
const originalReadinessMd = readFileSync(readinessMdPath, "utf8");
const coverage = JSON.parse(originalCoverage);

const staleCoverage = {
  ...coverage,
  status: "fail",
  storyCount: 53,
  checkedStoryCount: 53,
  failedStoryRows: [
    {
      exportName: "SyntheticMissingPage",
      storyId: "crm-image-coverage-remaining-pages--synthetic-missing-page",
      status: "fail",
      issue: "synthetic stale coverage probe"
    }
  ]
};

try {
  writeFileSync(coveragePath, `${JSON.stringify(staleCoverage, null, 2)}\n`);

  const result = spawnSync(process.execPath, ["scripts/audit-crm-real-readiness.mjs", "--check"], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status === 0) {
    console.error("Expected CRM real readiness to reject stale remaining-page coverage, but it passed.");
    process.exit(1);
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (!output.includes("remaining-page-story-coverage")) {
    console.error("Expected CRM real readiness failure to name remaining-page-story-coverage.");
    console.error(output.trim());
    process.exit(1);
  }

  console.log("CRM real readiness stale remaining-page coverage probe passed.");
} finally {
  writeFileSync(coveragePath, originalCoverage);
  writeFileSync(readinessJsonPath, originalReadinessJson);
  writeFileSync(readinessMdPath, originalReadinessMd);
}
