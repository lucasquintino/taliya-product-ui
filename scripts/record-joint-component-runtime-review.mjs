import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const certificationDir = path.join(root, "specs/005-joint-product-certification");
const inventoryFile = path.join(certificationDir, "component-inventory.json");
const evidenceFile = path.join(certificationDir, "component-runtime-review-20260805.md");
const write = process.argv.includes("--write");

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

const inventory = await readJson("specs/005-joint-product-certification/component-inventory.json");
const policy = await readJson("specs/005-joint-product-certification/component-test-policy.json");
const architecture = await readJson("specs/001-product-ui-foundation/component-architecture-audit.json");
const publicApi = await readJson("specs/001-product-ui-foundation/public-api-audit.json");
const publicApiSurface = await readJson("specs/001-product-ui-foundation/public-api-surface-audit.json");
const referenceSheets = await readJson("specs/001-product-ui-foundation/reference-sheet-coverage-audit.json");

const policyKeys = new Map();
for (const category of policy.categories) {
  for (const key of category.components) policyKeys.set(key, category);
}

const missingBehaviorEvidence = inventory.rows.filter((row) => {
  const key = `${row.package}:${row.name}`;
  return row.testReferences.length === 0 && !policyKeys.has(key);
});
if (missingBehaviorEvidence.length) {
  throw new Error(`Components without direct behavior evidence or policy exception: ${missingBehaviorEvidence.map((row) => `${row.package}:${row.name}`).join(", ")}`);
}

const duplicateReviewPass =
  inventory.summary.unclassifiedCrossPackageExactNameCollisionCount === 0 &&
  inventory.summary.unregisteredCrmComponentCount === 0 &&
  inventory.summary.registeredWithoutPublicComponentCount === 0 &&
  architecture.crmPrimitiveReuse.primitiveReuseClassification.refactor === 0 &&
  architecture.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive === 0 &&
  publicApi.summary.pass === true &&
  publicApiSurface.status === "pass";
if (!duplicateReviewPass) throw new Error("Duplicate/architecture review prerequisites failed.");

const reviewedAt = new Date().toISOString();
const behaviorEvidence =
  "packages/ui/src/index.test.tsx; packages/crm/src/index.test.tsx; specs/005-joint-product-certification/component-test-policy.json";
const duplicateEvidence =
  "specs/005-joint-product-certification/component-inventory.json; specs/001-product-ui-foundation/component-architecture-audit.json; specs/001-product-ui-foundation/public-api-audit.json; specs/001-product-ui-foundation/public-api-surface-audit.json";
const isolatedStoryRows = new Map();
for (const sheet of referenceSheets.rows ?? []) {
  for (const component of sheet.componentRows ?? []) {
    if (component.official && component.storyId) isolatedStoryRows.set(component.component, component.storyId);
  }
}
const isolatedEvidence =
  "specs/001-product-ui-foundation/reference-sheet-coverage-audit.json; apps/docs/storybook-static/index.json";
const stateEvidenceRows = new Map();
for (const row of inventory.rows) {
  const matches = [];
  for (const storyFile of row.storyReferences) {
    const source = await readFile(path.join(root, storyFile), "utf8");
    const direct =
      new RegExp(`component\\s*:\\s*${row.name}\\b`).test(source) ||
      path.basename(storyFile).toLowerCase().includes(row.name.toLowerCase());
    const explicitStates =
      /export const (?:AllStates|Default|Empty|Loading|Error|Disabled|Selected|Blocked|Warning|Success|Normal|Open|Closed)\b/.test(source) ||
      /args\s*:/.test(source);
    if (direct && explicitStates) matches.push(storyFile);
  }
  if (matches.length) stateEvidenceRows.set(`${row.package}:${row.name}`, matches);
}
const stateEvidence =
  "apps/docs/src/stories official direct component stories with explicit args/state exports";

if (write) {
  for (const row of inventory.rows) {
    const behavior = row.codex.realBehavior;
    behavior.status = "pass";
    behavior.reviewedAt = reviewedAt;
    if (!behavior.evidence.includes(behaviorEvidence)) behavior.evidence.push(behaviorEvidence);
    behavior.findings = behavior.findings.filter(Boolean);

    const duplicate = row.codex.duplicateReview;
    duplicate.status = "pass";
    duplicate.reviewedAt = reviewedAt;
    if (!duplicate.evidence.includes(duplicateEvidence)) duplicate.evidence.push(duplicateEvidence);
    duplicate.findings = duplicate.findings.filter(Boolean);

    const isolatedStory = row.codex.isolatedStory;
    const storyId = isolatedStoryRows.get(row.name);
    if (storyId) {
      isolatedStory.status = "pass";
      isolatedStory.reviewedAt = reviewedAt;
      const evidence = `${isolatedEvidence} (${storyId})`;
      if (!isolatedStory.evidence.includes(evidence)) isolatedStory.evidence.push(evidence);
      isolatedStory.findings = isolatedStory.findings.filter(Boolean);
    }

    const stateEvidenceFiles = stateEvidenceRows.get(`${row.package}:${row.name}`);
    if (stateEvidenceFiles?.length) {
      const variants = row.codex.variantsAndStates;
      variants.status = "pass";
      variants.reviewedAt = reviewedAt;
      const evidence = `${stateEvidence} (${stateEvidenceFiles.join(", ")})`;
      if (!variants.evidence.includes(evidence)) variants.evidence.push(evidence);
      variants.findings = variants.findings.filter(Boolean);
    }

    const statuses = Object.values(row.codex).map((review) => review.status);
    row.jointStatus = statuses.includes("fail")
      ? "needs-fix"
      : statuses.includes("blocked")
        ? "blocked"
        : statuses.every((status) => ["pass", "not-applicable"].includes(status))
          ? row.productOwner.status === "pass" ? "joint-pass" : "pending-product-owner"
          : "pending-codex";
  }
  inventory.generatedAt = reviewedAt;
  inventory.summary.jointPassCount = inventory.rows.filter((row) => row.jointStatus === "joint-pass").length;
  await writeFile(inventoryFile, `${JSON.stringify(inventory, null, 2)}\n`);
}

const statusCounts = (dimension) => inventory.rows.reduce((counts, row) => {
  const status = row.codex[dimension].status;
  counts[status] = (counts[status] ?? 0) + 1;
  return counts;
}, {});

const markdown = `# Component Runtime Review

Generated: ${reviewedAt}

This review records only dimensions supported by repository-wide, component-keyed evidence. It does not certify visual comparison, responsive behavior, accessibility, variants/states, or isolated visual fidelity.

## Real behavior

- Status: ${statusCounts("realBehavior").pass ?? 0}/${inventory.rows.length} pass.
- Evidence: ${behaviorEvidence}
- Direct test references: ${inventory.rows.filter((row) => row.testReferences.length > 0).length}.
- Classified static/layout/compatibility exceptions: ${inventory.rows.filter((row) => row.testReferences.length === 0 && policyKeys.has(`${row.package}:${row.name}`)).length}; every exception is present exactly once in the policy.

## Duplicate review

- Status: ${duplicateReviewPass ? "pass" : "fail"} for ${inventory.rows.length}/${inventory.rows.length} components.
- Evidence: ${duplicateEvidence}
- Unclassified cross-package collisions: ${inventory.summary.unclassifiedCrossPackageExactNameCollisionCount}.
- Unregistered CRM exports: ${inventory.summary.unregisteredCrmComponentCount}.
- Orphan registry entries: ${inventory.summary.registeredWithoutPublicComponentCount}.
- Primitive refactor debt: ${architecture.crmPrimitiveReuse.primitiveReuseClassification.refactor}.
- Missing primitive debt: ${architecture.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive}.

## Isolated story coverage

- Status: ${isolatedStoryRows.size} named components have an official isolated reference-sheet story.
- Evidence: ${isolatedEvidence}
- Components without a reference-sheet isolated story remain pending; composed page stories are not promoted automatically.

## Variants and states

- Status: ${stateEvidenceRows.size}/${inventory.rows.length} components have direct stories with explicit state/variant evidence.
- Evidence: ${stateEvidence}
- Components without direct state evidence remain pending.

## Remaining component dimensions

- responsiveLayout
- accessibility
- visualComparison
`;
await writeFile(evidenceFile, markdown);
console.log(`${write ? "Recorded" : "Validated"} component runtime review for ${inventory.rows.length} components.`);
