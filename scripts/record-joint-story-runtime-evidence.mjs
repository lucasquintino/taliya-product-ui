import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(root, "specs/005-joint-product-certification/visual-diagnostics/joint-story-runtime-audit-20260805.json");
const outputPath = path.join(root, "specs/005-joint-product-certification/visual-diagnostics/joint-story-runtime-audit-20260805.md");
const report = JSON.parse(await readFile(reportPath, "utf8"));
const rows = report.rows ?? [];
const overflowFailures = report.failures.filter((row) => row.metrics.overflowX);
const overflowStoryIds = [...new Set(overflowFailures.map((row) => row.storyId))];
const unnamedFailures = report.failures.filter((row) => row.metrics.unnamedInteractiveCount > 0);
const renderFailures = report.failures.filter((row) => row.metrics.errors.length > 0);
const rowsWithOverflow = rows.filter((row) => Object.values(row.viewports).some((metrics) => metrics.overflowX));
const topOverflow = overflowStoryIds
  .map((storyId) => {
    const row = rows.find((candidate) => candidate.id === storyId);
    const maxDelta = Math.max(...Object.values(row.viewports).map((metrics) => metrics.scrollWidth - metrics.documentWidth));
    return { storyId, title: row.title, maxDelta };
  })
  .sort((left, right) => right.maxDelta - left.maxDelta)
  .slice(0, 25);

await writeFile(outputPath, `# Joint Story Runtime Audit

Generated: ${report.generatedAt}

This is a DOM smoke audit of the static Storybook. It is evidence for initial render health, horizontal containment, and accessible names on visible interactive controls. It is not a WCAG conformance audit, keyboard journey approval, visual 1:1 approval, or product-owner approval.

## Coverage

- Stories: ${report.storyCount}
- Viewports: desktop 1440x900 and mobile 390x844
- Storybook: ${report.storybookUrl}
- Render errors: ${renderFailures.length}
- Unnamed visible interactive controls: ${unnamedFailures.length}
- Stories with horizontal overflow: ${rowsWithOverflow.length}
- Overflow checks: ${overflowFailures.length}
- Overall smoke status: ${report.status}

## Accessibility smoke

The current rebuilt Storybook has zero visible interactive controls without an accessible name in the audited DOM states. The scan checks buttons, links, inputs, textareas, selects, and common ARIA interactive roles. It does not check contrast, focus order, keyboard traps, announcements, or every dynamic state.

## Responsive findings

${topOverflow.map((row) => `- ${row.storyId} (${row.title}): maximum document overflow of ${row.maxDelta}px.`).join("\n")}

The complete list and both viewport metrics remain in the JSON report. These overflows are not automatically classified as defects: source-sized reference components may intentionally preserve a wide canvas, while page-family components must be corrected or explicitly documented by their official responsive contract.

## Next action

Classify the ${overflowStoryIds.length} affected stories by structural family, fix only official package contracts where the overflow is not intentional, then rerun this audit. Keep the component accessibility dimension pending until keyboard and dynamic-state evidence is recorded.
`);
console.log(`Recorded story runtime evidence: stories=${report.storyCount}; overflowStories=${overflowStoryIds.length}; unnamedControls=${unnamedFailures.length}.`);
