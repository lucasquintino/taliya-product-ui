import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { validatePageKitConfig, validateReadinessConfig } from "./consumer-config-validation.mjs";

const root = process.cwd();
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Invalid ${label}: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

function writeJson(filePath, data, dryRun, force) {
  const exists = existsSync(filePath);
  if (exists && !force) {
    return {
      path: filePath,
      status: "skipped",
      reason: "exists; pass --force to overwrite"
    };
  }

  if (!dryRun) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  }

  return {
    path: filePath,
    status: dryRun ? (exists ? "would-overwrite" : "would-create") : (exists ? "overwritten" : "created"),
    reason: ""
  };
}

function writeText(filePath, content, dryRun, force) {
  const exists = existsSync(filePath);
  if (exists && !force) {
    return {
      path: filePath,
      status: "skipped",
      reason: "exists; pass --force to overwrite"
    };
  }

  if (!dryRun) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }

  return {
    path: filePath,
    status: dryRun ? (exists ? "would-overwrite" : "would-create") : (exists ? "overwritten" : "created"),
    reason: ""
  };
}

const consumerArg = optionValue("--consumer", "");
if (!consumerArg) {
  console.error("Usage: node scripts/bootstrap-consumer-configs.mjs --consumer <path> [--write] [--force] [--starter-files] [--report-label future-crm] [--route-root app/crm] [--base-route /crm] [--vendor vendor/taliya-product-ui] [--commands typecheck,lint,test,build]");
  process.exit(1);
}

const consumerRoot = resolve(root, consumerArg);
const dryRun = !hasFlag("--write");
const force = hasFlag("--force");
const includeStarterFiles = hasFlag("--starter-files");
const reportLabel = optionValue("--report-label", "future-crm");
const routeRoot = optionValue("--route-root", "app/crm");
const baseRoute = optionValue("--base-route", "/crm");
const vendor = optionValue("--vendor", "vendor/taliya-product-ui");
const commands = optionValue("--commands", "typecheck,lint,test,build")
  .split(",")
  .map((command) => command.trim())
  .filter(Boolean);

const readinessTemplatePath = resolve(root, "specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json");
const pageKitTemplatePath = resolve(root, "specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json");
const starterTemplateRoot = resolve(root, "specs/001-product-ui-foundation/contracts/consumer-starter-files");
const starterTemplates = [
  {
    template: "components/crm-shell-client.tsx",
    output: "components/crm-shell-client.tsx"
  },
  {
    template: "features/crm/work-list/work-list-page.tsx",
    output: "features/crm/work-list/work-list-page.tsx"
  },
  {
    template: "features/crm/kanban/kanban-page.tsx",
    output: "features/crm/kanban/kanban-page.tsx"
  },
  {
    template: "app/crm/page.tsx",
    output: `${routeRoot}/page.tsx`
  },
  {
    template: "app/crm/kanban/page.tsx",
    output: `${routeRoot}/kanban/page.tsx`
  }
];
const readinessConfig = {
  ...readJson(readinessTemplatePath, "consumer readiness config template"),
  reportLabel,
  vendor,
  pageKitConfig: "taliya-page-kit.config.json",
  commands
};
const pageKitConfig = {
  ...readJson(pageKitTemplatePath, "consumer page-kit config template"),
  routeCoverage: {
    root: routeRoot,
    baseRoute
  }
};

const readinessErrors = validateReadinessConfig(readinessConfig);
const pageKitValidation = validatePageKitConfig(pageKitConfig);
if (readinessErrors.length > 0 || !pageKitValidation.pass) {
  for (const error of readinessErrors) console.error(`Readiness config error: ${error}`);
  for (const error of pageKitValidation.errors) console.error(`Page-kit config error: ${error}`);
  process.exit(1);
}

const outputs = [
  writeJson(resolve(consumerRoot, "taliya-readiness.config.json"), readinessConfig, dryRun, force),
  writeJson(resolve(consumerRoot, "taliya-page-kit.config.json"), pageKitConfig, dryRun, force)
];

if (includeStarterFiles) {
  for (const starterTemplate of starterTemplates) {
    outputs.push(
      writeText(
        resolve(consumerRoot, starterTemplate.output),
        readFileSync(resolve(starterTemplateRoot, starterTemplate.template), "utf8"),
        dryRun,
        force
      )
    );
  }
}

console.log(`Consumer config bootstrap ${dryRun ? "dry run" : "write"} for ${consumerRoot}`);
for (const output of outputs) {
  console.log(`${output.status}: ${relative(root, output.path).replaceAll("\\", "/")}${output.reason ? ` (${output.reason})` : ""}`);
}
console.log("Next: run node scripts/audit-library-readiness.mjs --check --consumer <path> after packages and routes exist.");
