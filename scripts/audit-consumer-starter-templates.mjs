import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { validatePageKitConfig } from "./consumer-config-validation.mjs";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const configPath = resolve(specDir, "contracts/consumer-page-kit-config.example.json");
const starterRoot = resolve(specDir, "contracts/consumer-starter-files");
const reportJsonPath = resolve(specDir, "consumer-starter-templates-audit.json");
const reportMdPath = resolve(specDir, "consumer-starter-templates-audit.md");

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function collectRequirementsByFile(pageKitConfig) {
  const rows = [];
  for (const section of ["surfaces", "routes", "componentContracts"]) {
    for (const item of Array.isArray(pageKitConfig[section]) ? pageKitConfig[section] : []) {
      if (!item?.file) continue;
      const required = item.required ?? item.requiredPackageComponents ?? [];
      for (const requirement of Array.isArray(required) ? required : []) {
        if (requirement && typeof requirement.name === "string" && typeof requirement.package === "string") {
          rows.push({ file: item.file, name: requirement.name, package: requirement.package, kind: "package", source: section });
        }
      }
      const localRequired = item.requiredLocalComponents ?? [];
      for (const requirement of Array.isArray(localRequired) ? localRequired : []) {
        if (requirement && typeof requirement.name === "string" && typeof requirement.importFrom === "string") {
          rows.push({ file: item.file, name: requirement.name, importFrom: requirement.importFrom, kind: "local", source: section });
        }
      }
    }
  }

  const byFile = new Map();
  for (const row of rows) {
    if (!byFile.has(row.file)) byFile.set(row.file, new Map());
    const key = row.kind === "local" ? `local:${row.importFrom}:${row.name}` : `${row.package}:${row.name}`;
    byFile.get(row.file).set(key, row);
  }

  return [...byFile.entries()].map(([file, requirementMap]) => ({
    file,
    requirements: [...requirementMap.values()]
  }));
}

function routeLocalContractIdRows(pageKitConfig) {
  const contractsById = new Map((Array.isArray(pageKitConfig.componentContracts) ? pageKitConfig.componentContracts : []).map((contract) => [contract.id, contract]));
  return (Array.isArray(pageKitConfig.routes) ? pageKitConfig.routes : []).flatMap((route) =>
    (Array.isArray(route.requiredLocalComponents) ? route.requiredLocalComponents : []).map((requirement) => {
      const linkedContract =
        typeof requirement.componentContractId === "string" ? contractsById.get(requirement.componentContractId) : null;
      const expectedContractComponent = requirement.componentContractComponent ?? requirement.name;
      const linkedContractComponentMatches = linkedContract?.component === expectedContractComponent;

      return {
        route: route.route,
        componentName: requirement.name,
        importFrom: requirement.importFrom,
        componentContractId: requirement.componentContractId ?? null,
        componentContractComponent: requirement.componentContractComponent ?? null,
        expectedContractComponent,
        linkedContractComponent: linkedContract?.component ?? null,
        linkedContractComponentMatches,
        contractExists: Boolean(linkedContract),
        pass:
          typeof requirement.componentContractId === "string" &&
          requirement.componentContractId.trim().length > 0 &&
          Boolean(linkedContract) &&
          linkedContractComponentMatches
      };
    })
  );
}

const pageKitConfig = readJson(configPath, "consumer page-kit config example");
const configValidation = validatePageKitConfig(pageKitConfig);
const routeLocalContractRows = configValidation.pass ? routeLocalContractIdRows(pageKitConfig) : [];
const rows = configValidation.pass
  ? collectRequirementsByFile(pageKitConfig).map((template) => {
      const templatePath = resolve(starterRoot, template.file);
      const exists = existsSync(templatePath);
      const content = exists ? readFileSync(templatePath, "utf8") : "";
      const missingRequirements = template.requirements.filter((requirement) => {
        if (!content.includes(requirement.name)) return true;
        if (requirement.kind === "local") return !content.includes(requirement.importFrom);
        return false;
      });

      return {
        file: template.file,
        template: relative(root, templatePath).replaceAll("\\", "/"),
        exists,
        requirements: template.requirements,
        missingRequirements,
        pass: exists && missingRequirements.length === 0
      };
    })
  : [];

const report = {
  generatedAt: new Date().toISOString(),
  config: relative(root, configPath).replaceAll("\\", "/"),
  starterRoot: relative(root, starterRoot).replaceAll("\\", "/"),
  status: configValidation.pass && rows.every((row) => row.pass) && routeLocalContractRows.every((row) => row.pass) ? "pass" : "fail",
  configValidation,
  routeLocalContractRows,
  rows
};

if (!checkMode) {
  mkdirSync(dirname(reportJsonPath), { recursive: true });
  writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
}

const rowMarkdown = rows
  .map((row) => {
    const requirements = row.requirements
      .map((requirement) =>
        requirement.kind === "local"
          ? `\`local:${requirement.name} from ${requirement.importFrom}\``
          : `\`${requirement.package}:${requirement.name}\``
      )
      .join(", ");
    const missing = row.missingRequirements.length
      ? row.missingRequirements
          .map((requirement) =>
            requirement.kind === "local"
              ? `\`local:${requirement.name} from ${requirement.importFrom}\``
              : `\`${requirement.package}:${requirement.name}\``
          )
          .join(", ")
      : "None";
    return `| \`${row.file}\` | ${row.exists ? "yes" : "no"} | ${requirements || "None"} | ${missing} | ${row.pass ? "pass" : "fail"} |`;
  })
  .join("\n");

const routeLocalContractMarkdown = routeLocalContractRows
  .map(
    (row) =>
      `| \`${row.route}\` | \`${row.componentName}\` from \`${row.importFrom}\` | ${row.componentContractId ? `\`${row.componentContractId}\`` : "Missing"} | \`${row.expectedContractComponent}\` | ${row.linkedContractComponent ? `\`${row.linkedContractComponent}\`` : "Missing"} | ${row.pass ? "pass" : "fail"} |`
  )
  .join("\n");

if (!checkMode) writeFileSync(
  reportMdPath,
  `# Consumer Starter Templates Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit checks that the official future CRM starter templates match \`consumer-page-kit-config.example.json\`. If the example config requires an official package component or a starter-local route component in a starter file, the corresponding template must contain that render root.

Config: \`${report.config}\`

Starter root: \`${report.starterRoot}\`

## Route Local Component Contracts

| Route | Local component | componentContractId | Expected component | Linked component | Status |
| --- | --- | --- | --- | --- | --- |
${routeLocalContractMarkdown || "| None | None | None | None | None | pass |"}

## Template Rows

| File | Exists | Required roots from config | Missing roots | Status |
| --- | --- | --- | --- | --- |
${rowMarkdown}
`
);

console.log(`Consumer starter templates audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  const failedRows = rows.filter((row) => !row.pass).map((row) => row.file).join(", ");
  const failedRouteContracts = routeLocalContractRows
    .filter((row) => !row.pass)
    .map((row) => `${row.route}:${row.componentName}`)
    .join(", ");
  console.error(`Consumer starter templates audit failed: ${failedRows || failedRouteContracts || "config validation"}`);
  process.exit(1);
}
