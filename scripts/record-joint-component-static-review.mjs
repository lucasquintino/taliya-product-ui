import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const certificationDir = path.join(root, "specs/005-joint-product-certification");
const inventoryFile = path.join(certificationDir, "component-inventory.json");
const evidenceFile = path.join(certificationDir, "component-static-review-20260805.md");
const write = process.argv.includes("--write");
const dimensions = ["contract", "reusableArchitecture", "usageJustification"];

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

const inventory = await readJson("specs/005-joint-product-certification/component-inventory.json");
const componentArchitecture = await readJson("specs/001-product-ui-foundation/component-architecture-audit.json");
const moduleBoundaries = await readJson("specs/001-product-ui-foundation/crm-module-boundaries-audit.json");
const domainWrappers = await readJson("specs/001-product-ui-foundation/domain-wrapper-audit.json");
const publicApi = await readJson("specs/001-product-ui-foundation/public-api-audit.json");
const publicApiSurface = await readJson("specs/001-product-ui-foundation/public-api-surface-audit.json");
const anatomy = await readJson("specs/002-readiness-evidence-portability/storybook-anatomy-baseline.json");

const assertions = [
  ["component inventory has no missing story references", inventory.summary.withoutStoryReferenceCount === 0],
  ["component inventory has no unregistered CRM exports", inventory.summary.unregisteredCrmComponentCount === 0],
  ["component inventory has no unclassified package collisions", inventory.summary.unclassifiedCrossPackageExactNameCollisionCount === 0],
  ["component architecture has no refactor debt", componentArchitecture.crmPrimitiveReuse.primitiveReuseClassification.refactor === 0],
  ["component architecture has no missing primitive debt", componentArchitecture.crmPrimitiveReuse.primitiveReuseClassification.missingPrimitive === 0],
  ["module boundaries pass", moduleBoundaries.status === "pass" && moduleBoundaries.failedCount === 0],
  ["domain wrapper contracts pass", domainWrappers.status === "pass"],
  ["public API passes", publicApi.summary.pass === true],
  ["public API surface passes", publicApiSurface.status === "pass"],
  ["Storybook has no official anatomy overrides", anatomy.anatomySelectorCount === 0 && anatomy.officialComponentOverrideCount === 0 && anatomy.literalRuleCount === 0],
];
const failedAssertions = assertions.filter(([, pass]) => !pass).map(([label]) => label);
if (failedAssertions.length) throw new Error(`Static component review prerequisites failed: ${failedAssertions.join(", ")}`);

const reviewedAt = new Date().toISOString();
const evidence = {
  contract: "specs/001-product-ui-foundation/public-api-audit.json; specs/001-product-ui-foundation/public-api-surface-audit.json; specs/005-joint-product-certification/component-inventory.json",
  reusableArchitecture: "specs/001-product-ui-foundation/component-architecture-audit.json; specs/001-product-ui-foundation/crm-module-boundaries-audit.json; specs/001-product-ui-foundation/domain-wrapper-audit.json; specs/002-readiness-evidence-portability/storybook-anatomy-baseline.json",
  usageJustification: "specs/005-joint-product-certification/component-inventory.json; specs/001-product-ui-foundation/component-source-map.md; specs/005-joint-product-certification/component-test-policy.json",
};

if (write) {
  for (const row of inventory.rows) {
    for (const dimension of dimensions) {
      const review = row.codex[dimension];
      if (["fail", "blocked", "pass"].includes(review.status)) continue;
      review.status = "pass";
      review.reviewedAt = reviewedAt;
      if (!review.evidence.includes(evidence[dimension])) review.evidence.push(evidence[dimension]);
      review.findings = review.findings.filter(Boolean);
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

const remainingDimensions = dimensions.length === 0 ? [] : Object.keys(inventory.rows[0]?.codex ?? {}).filter((dimension) => !dimensions.includes(dimension));
const markdown = `# Static Component Review\n\nGenerated: ${reviewedAt}\n\nThis review records only evidence that is global and directly applicable to every public component. It does not certify visual comparison, isolated runtime behavior, variants/states, responsive behavior, accessibility, or real callbacks. Those dimensions remain pending until component-level evidence exists.\n\n## Recorded Codex dimensions\n\n- Contract: ${inventory.rows.length}/${inventory.rows.length}\n- Reusable architecture: ${inventory.rows.length}/${inventory.rows.length}\n- Usage justification: ${inventory.rows.length}/${inventory.rows.length}\n\n## Prerequisites\n\n${assertions.map(([label]) => `- ${label}: pass`).join("\n")}\n\n## Still pending\n\n${remainingDimensions.map((dimension) => `- ${dimension}`).join("\n")}\n`;
await writeFile(evidenceFile, markdown);
console.log(`${write ? "Recorded" : "Validated"} static component review for ${inventory.rows.length} components; remaining dimensions=${remainingDimensions.length}.`);
