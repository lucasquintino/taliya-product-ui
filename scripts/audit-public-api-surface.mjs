import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specDir = path.join(root, "specs/001-product-ui-foundation");
const reportJsonPath = path.join(specDir, "public-api-surface-audit.json");
const reportMdPath = path.join(specDir, "public-api-surface-audit.md");
const manifestPath = path.join(specDir, "contracts/public-api-surface.manifest.json");
const standardPageKitPath = path.join(specDir, "contracts/standard-page-kit.manifest.json");
const check = process.argv.includes("--check");

const packageFiles = {
  "@taliya/ui": path.join(root, "packages/ui/src/index.tsx"),
  "@taliya/crm": path.join(root, "packages/crm/src/index.tsx")
};

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function exportNames(source) {
  const names = new Set();
  const patterns = [
    /export\s+(?:function|const|class|interface|type)\s+([A-Za-z][A-Za-z0-9_]*)/g,
    /export\s+type\s+\{\s*([^}]+)\s*\}/g,
    /export\s+\{\s*([^}]+)\s*\}/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source))) {
      if (pattern === patterns[1] || pattern === patterns[2]) {
        for (const part of match[1].split(",")) {
          const name = part.trim().split(/\s+as\s+/).pop()?.trim();
          if (name) names.add(name);
        }
        continue;
      }
      names.add(match[1]);
    }
  }

  return names;
}

function componentKey(component) {
  return `${component.package}:${component.name}`;
}

function targetKey(component, nameKey = "canonicalName", packageKey = "canonicalPackage") {
  return `${component[packageKey]}:${component[nameKey]}`;
}

function validateManifest(manifest) {
  const errors = [];
  if (manifest?.version !== 1) errors.push("version must be 1");
  if (manifest?.standardPageKitStatus !== "canonical") errors.push("standardPageKitStatus must be canonical");
  for (const key of ["compatibilityAliases", "domainSpecializations"]) {
    if (!Array.isArray(manifest?.[key])) errors.push(`${key} must be an array`);
  }
  return errors;
}

const manifest = readJson(manifestPath);
const standardPageKit = readJson(standardPageKitPath);
const manifestErrors = validateManifest(manifest);
if (manifestErrors.length > 0) {
  console.error(`Invalid public API surface manifest: ${manifestErrors.join("; ")}`);
  process.exit(1);
}

const packageExports = Object.fromEntries(
  Object.entries(packageFiles).map(([packageName, filePath]) => [packageName, exportNames(read(filePath))])
);

function isExported(packageName, name) {
  return packageExports[packageName]?.has(name) ?? false;
}

const standardRows = standardPageKit.components.map((component) => ({
  ...component,
  apiStatus: "canonical",
  exportPresent: isExported(component.package, component.name),
  pass: isExported(component.package, component.name)
}));

const aliasRows = manifest.compatibilityAliases.map((component) => ({
  ...component,
  apiStatus: "compatibility-alias",
  exportPresent: isExported(component.package, component.name),
  canonicalExportPresent: isExported(component.canonicalPackage, component.canonicalName),
  selfAlias: componentKey(component) === targetKey(component),
  pass:
    isExported(component.package, component.name) &&
    isExported(component.canonicalPackage, component.canonicalName) &&
    componentKey(component) !== targetKey(component)
}));

const specializationRows = manifest.domainSpecializations.map((component) => ({
  ...component,
  apiStatus: "domain-specialization",
  exportPresent: isExported(component.package, component.name),
  baseExportPresent: isExported(component.basePackage, component.baseName),
  selfSpecialization: componentKey(component) === `${component.basePackage}:${component.baseName}`,
  pass:
    isExported(component.package, component.name) &&
    isExported(component.basePackage, component.baseName) &&
    componentKey(component) !== `${component.basePackage}:${component.baseName}`
}));

const aliasKeys = new Set(aliasRows.map(componentKey));
const specializationKeys = new Set(specializationRows.map(componentKey));
const standardKeys = new Set(standardRows.map(componentKey));
const duplicatePolicyKeys = [...aliasKeys].filter((key) => specializationKeys.has(key));
const standardAliasConflicts = [...standardKeys].filter((key) => aliasKeys.has(key));
const standardSpecializationOverlap = [...standardKeys].filter((key) => specializationKeys.has(key));

const pass =
  standardRows.every((row) => row.pass) &&
  aliasRows.every((row) => row.pass) &&
  specializationRows.every((row) => row.pass) &&
  duplicatePolicyKeys.length === 0 &&
  standardAliasConflicts.length === 0 &&
  standardSpecializationOverlap.length > 0;

const report = {
  generatedAt: new Date().toISOString(),
  status: pass ? "pass" : "fail",
  manifest: path.relative(root, manifestPath),
  standardPageKit: {
    status: manifest.standardPageKitStatus,
    count: standardRows.length,
    failed: standardRows.filter((row) => !row.pass)
  },
  compatibilityAliases: {
    count: aliasRows.length,
    failed: aliasRows.filter((row) => !row.pass),
    rows: aliasRows
  },
  domainSpecializations: {
    count: specializationRows.length,
    failed: specializationRows.filter((row) => !row.pass),
    rows: specializationRows
  },
  policyConflicts: {
    duplicatePolicyKeys,
    standardAliasConflicts,
    standardSpecializationOverlap
  }
};

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  "# Public API Surface Audit",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  `Status: ${report.status}`,
  "",
  "This audit guards the public API vocabulary. It keeps the standard page kit canonical, documents compatibility aliases, and documents CRM domain specializations over UI primitives so consumers do not guess which component to use.",
  "",
  "## Standard Page Kit",
  "",
  `- Status: ${manifest.standardPageKitStatus}`,
  `- Components: ${standardRows.length}`,
  `- Failed exports: ${report.standardPageKit.failed.length ? report.standardPageKit.failed.map(componentKey).join(", ") : "None"}`,
  "",
  "## Compatibility Aliases",
  "",
  "| Alias | Canonical | Status | Reason |",
  "| --- | --- | --- | --- |",
  ...aliasRows.map((row) => `| \`${componentKey(row)}\` | \`${targetKey(row)}\` | ${row.pass ? "Pass" : "Fail"} | ${row.reason} |`),
  "",
  "## Domain Specializations",
  "",
  "| Component | Base primitive | Status | Reason |",
  "| --- | --- | --- | --- |",
  ...specializationRows.map((row) => `| \`${componentKey(row)}\` | \`${row.basePackage}:${row.baseName}\` | ${row.pass ? "Pass" : "Fail"} | ${row.reason} |`),
  "",
  "## Policy Conflicts",
  "",
  `- Duplicate alias/specialization keys: ${duplicatePolicyKeys.length ? duplicatePolicyKeys.join(", ") : "None"}`,
  `- Standard kit components marked as aliases: ${standardAliasConflicts.length ? standardAliasConflicts.join(", ") : "None"}`,
  `- Standard kit components also documented as specializations: ${standardSpecializationOverlap.length ? standardSpecializationOverlap.join(", ") : "None"}`,
  "",
  "A standard-kit specialization overlap is expected when a canonical CRM component is intentionally a domain wrapper around a UI primitive, such as `PageFilterBar` over `FilterBar` or `TaskTable` over `DataTable`.",
  ""
].join("\n");

fs.writeFileSync(reportMdPath, markdown);

console.log(`Public API surface audit written to ${path.relative(root, reportJsonPath)} and ${path.relative(root, reportMdPath)}`);
console.log(`Public API surface: ${report.status}`);

if (check && !pass) {
  const failed = [
    ...report.standardPageKit.failed.map(componentKey),
    ...report.compatibilityAliases.failed.map(componentKey),
    ...report.domainSpecializations.failed.map(componentKey),
    ...duplicatePolicyKeys,
    ...standardAliasConflicts
  ];
  console.error(`Failed public API surface rows: ${failed.join(", ") || "policy conflict"}`);
  process.exit(1);
}
