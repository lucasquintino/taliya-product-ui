import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
function optionValue(name, fallback) {
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  if (equals) return equals.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}
const updateMode = args.includes("--update");
const strictMode = args.includes("--strict");
const cssPath = resolve(root, optionValue("--css", "apps/docs/src/storybook.css"));
const baselinePath = resolve(root, "specs/002-readiness-evidence-portability/storybook-anatomy-baseline.json");
const reportPath = resolve(root, "specs/002-readiness-evidence-portability/storybook-anatomy-audit.md");

const source = readFileSync(cssPath, "utf8");
const rules = [...source.matchAll(/(^|\n)([^@{}][^{}]+)\{([^{}]*)\}/g)]
  .flatMap((match) => match[2].split(",").map((selector) => ({ selector: selector.trim(), body: match[3].trim() })))
  .filter((rule) => rule.selector.startsWith(".sb-"));

const fixtureGeometryProperties = new Set([
  "align-self",
  "display",
  "flex",
  "grid-template-columns",
  "height",
  "justify-self",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "overflow",
  "overflow-x",
  "overflow-y",
  "position",
  "scrollbar-width",
  "transform",
  "transform-origin",
  "width",
  "z-index"
]);

function isCaptureHarness(selector) {
  return /-stage(?:--[a-z-]+)?$/.test(selector) || /-shell \.tcrm-empty-shell-window$/.test(selector);
}

function declarationProperties(body) {
  return body
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => declaration.split(":", 1)[0].trim());
}

function targetsOfficialComponent(selector) {
  const subjectSelector = selector.replace(/:(?:has|not)\([^)]*\)/g, "");
  return /\.(?:tcrm|tl)-/.test(subjectSelector);
}

const imageCoverageRules = rules.filter((rule) => rule.selector.startsWith(".sb-image-coverage"));
const officialOverrideRows = rules
  .filter((rule) => !isCaptureHarness(rule.selector) && targetsOfficialComponent(rule.selector))
  .map((rule) => {
    const properties = declarationProperties(rule.body);
    const disallowedProperties = properties.filter((property) => !fixtureGeometryProperties.has(property));
    return { ...rule, properties, disallowedProperties };
  });

const imageCoverageAnatomyRows = imageCoverageRules
  .filter((rule) => !isCaptureHarness(rule.selector))
  .map((rule) => ({
    selector: rule.selector,
    reason: "image-coverage selector owns product anatomy instead of capture geometry",
    targetsOfficialComponent: targetsOfficialComponent(rule.selector),
    hasLiteralValue: /(?:#[0-9a-f]{3,8}|rgba?\(|\b\d+(?:\.\d+)?px\b)/i.test(rule.body)
  }));
const officialOverrideDebtRows = officialOverrideRows
  .filter((rule) => rule.disallowedProperties.length > 0)
  .map((rule) => ({
    selector: rule.selector,
    reason: `official component override owns: ${rule.disallowedProperties.join(", ")}`,
    targetsOfficialComponent: true,
    hasLiteralValue: /(?:#[0-9a-f]{3,8}|rgba?\(|\b\d+(?:\.\d+)?px\b)/i.test(rule.body)
  }));
const anatomyRows = [...imageCoverageAnatomyRows, ...officialOverrideDebtRows]
  .filter((row, index, rows) => rows.findIndex((candidate) => candidate.selector === row.selector && candidate.reason === row.reason) === index)
  .sort((a, b) => a.selector.localeCompare(b.selector));
const harnessSelectors = imageCoverageRules.filter((rule) => isCaptureHarness(rule.selector)).map((rule) => rule.selector).sort();
const fixtureGeometrySelectors = officialOverrideRows
  .filter((rule) => rule.disallowedProperties.length === 0)
  .map((rule) => rule.selector)
  .sort();
const current = {
  schemaVersion: 2,
  anatomySelectorCount: anatomyRows.length,
  officialComponentOverrideCount: anatomyRows.filter((row) => row.targetsOfficialComponent).length,
  literalRuleCount: anatomyRows.filter((row) => row.hasLiteralValue).length,
  anatomySelectors: anatomyRows.map((row) => row.selector),
  harnessSelectors,
  fixtureGeometrySelectors
};

if (updateMode) {
  mkdirSync(dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
  const rows = anatomyRows.map((row) => `| \`${row.selector}\` | ${row.reason} | ${row.targetsOfficialComponent ? "yes" : "no"} | ${row.hasLiteralValue ? "yes" : "no"} |`).join("\n");
  writeFileSync(reportPath, `# Storybook Anatomy Audit\n\nStatus: ${anatomyRows.length === 0 ? "pass" : "debt-present"}\n\nCapture-only stage selectors: ${harnessSelectors.length}\n\nAllowed fixture-geometry overrides: ${fixtureGeometrySelectors.length}\n\nReusable-anatomy selectors in docs: ${anatomyRows.length}\n\nOfficial component appearance/anatomy overrides: ${current.officialComponentOverrideCount}\n\nLiteral debt rules: ${current.literalRuleCount}\n\n| Selector | Reason | Targets official component | Literal value |\n| --- | --- | --- | --- |\n${rows}\n`);
  console.log(`Wrote ${baselinePath}`);
  console.log(`Wrote ${reportPath}`);
} else {
  const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  const added = current.anatomySelectors.filter((selector) => !baseline.anatomySelectors.includes(selector));
  if (added.length > 0 || current.anatomySelectorCount > baseline.anatomySelectorCount) {
    console.error(`Storybook anatomy regression: ${added.join(", ") || `${current.anatomySelectorCount} > ${baseline.anatomySelectorCount}`}`);
    process.exit(1);
  }
}

if (strictMode && anatomyRows.length > 0) {
  console.error(`Storybook still owns ${anatomyRows.length} reusable-anatomy selectors.`);
  process.exit(1);
}
console.log(`Storybook anatomy: ${anatomyRows.length} debt selectors, ${harnessSelectors.length} capture harness selectors.`);
