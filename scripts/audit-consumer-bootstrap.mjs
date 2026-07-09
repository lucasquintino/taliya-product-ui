import { spawnSync } from "node:child_process";
import { relative, resolve } from "node:path";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const args = process.argv.slice(2);
const checkMode = args.includes("--check");

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function run(commandArgs, cwd = root) {
  const startedAt = Date.now();
  const result = spawnSync(commandArgs[0], commandArgs.slice(1), {
    cwd,
    encoding: "utf8"
  });

  return {
    commandText: commandArgs.join(" "),
    cwd,
    status: result.status === 0 ? "pass" : "fail",
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim()
  };
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

const fixtureRoot = resolve(root, optionValue("--fixture", "tmp/consumer-bootstrap-fixture"));
const reportJsonPath = resolve(specDir, "consumer-bootstrap-audit.json");
const reportMdPath = resolve(specDir, "consumer-bootstrap-audit.md");
const starterFileContracts = [
  {
    file: "components/crm-shell-client.tsx",
    requiredFragments: ["CrmProductShell", "Toolbar"]
  },
  {
    file: "features/crm/work-list/work-list-page.tsx",
    requiredFragments: ["WorkListDetailPage", "PageFilterBar", "PageQuickFilters", "DataTable", "CrmRecordDrawer"]
  },
  {
    file: "features/crm/kanban/kanban-page.tsx",
    requiredFragments: ["PageQuickFilters", "KanbanBoard", "KanbanColumn", "KanbanCard"]
  },
  {
    file: "app/crm/page.tsx",
    requiredFragments: ["CrmShellClient", "../../components/crm-shell-client", "WorkListPage", "../../features/crm/work-list/work-list-page"]
  },
  {
    file: "app/crm/kanban/page.tsx",
    requiredFragments: ["CrmShellClient", "../../../components/crm-shell-client", "KanbanPage", "../../../features/crm/kanban/kanban-page"]
  }
];

if (!fixtureRoot.startsWith(resolve(root, "tmp"))) {
  console.error("Fixture path must stay under tmp/");
  process.exit(1);
}

if (existsSync(fixtureRoot)) rmSync(fixtureRoot, { recursive: true, force: true });
mkdirSync(fixtureRoot, { recursive: true });

const steps = [];
steps.push(run(["git", "init"], fixtureRoot));
steps.push(run([
  process.execPath,
  "scripts/bootstrap-consumer-configs.mjs",
  "--consumer",
  relative(root, fixtureRoot),
  "--write",
  "--starter-files",
  "--report-label",
  "bootstrap-fixture"
]));

steps.push({
  commandText: "verify generated future CRM page-kit starter files",
  cwd: fixtureRoot,
  status: starterFileContracts.every((contract) => existsSync(resolve(fixtureRoot, contract.file))) ? "pass" : "fail",
  exitCode: starterFileContracts.every((contract) => existsSync(resolve(fixtureRoot, contract.file))) ? 0 : 1,
  durationMs: 0,
  stdout: "Checked shell, work-list, kanban, list route, and kanban route starter files",
  stderr: ""
});
steps.push(run(["git", "add", "taliya-readiness.config.json", "taliya-page-kit.config.json"], fixtureRoot));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-config-versioning.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--report-label",
  "bootstrap-fixture"
]));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-page-kit.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--page-kit-config",
  resolve(fixtureRoot, "taliya-page-kit.config.json"),
  "--report-label",
  "bootstrap-fixture"
]));

const readinessPath = resolve(fixtureRoot, "taliya-readiness.config.json");
const pageKitPath = resolve(fixtureRoot, "taliya-page-kit.config.json");
const readinessConfig = existsSync(readinessPath) ? readJson(readinessPath) : null;
const pageKitConfig = existsSync(pageKitPath) ? readJson(pageKitPath) : null;
const starterFileRows = starterFileContracts.map((contract) => {
  const filePath = resolve(fixtureRoot, contract.file);
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  const missingFragments = contract.requiredFragments.filter((fragment) => !content.includes(fragment));
  return {
    file: contract.file,
    exists: existsSync(filePath),
    requiredFragments: contract.requiredFragments,
    missingFragments,
    pass: existsSync(filePath) && missingFragments.length === 0
  };
});
const report = {
  generatedAt: new Date().toISOString(),
  fixtureRoot,
  status:
    steps.every((step) => step.status === "pass") &&
    readinessConfig?.reportLabel === "bootstrap-fixture" &&
    readinessConfig?.pageKitConfig === "taliya-page-kit.config.json" &&
    pageKitConfig?.routeCoverage?.root === "app/crm" &&
    pageKitConfig?.routeCoverage?.baseRoute === "/crm" &&
    starterFileRows.every((row) => row.pass)
      ? "pass"
      : "fail",
  steps,
  starterFiles: {
    pass: starterFileRows.every((row) => row.pass),
    rows: starterFileRows
  },
  generatedConfigs: {
    readiness: {
      exists: Boolean(readinessConfig),
      reportLabel: readinessConfig?.reportLabel ?? "",
      pageKitConfig: readinessConfig?.pageKitConfig ?? "",
      commands: readinessConfig?.commands ?? []
    },
    pageKit: {
      exists: Boolean(pageKitConfig),
      routeCoverage: pageKitConfig?.routeCoverage ?? null,
      surfaceCount: pageKitConfig?.surfaces?.length ?? 0,
      routeCount: pageKitConfig?.routes?.length ?? 0
    }
  }
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const stepRows = steps
  .map((step) => `| \`${step.commandText}\` | ${step.status} | ${step.exitCode ?? "n/a"} | ${step.durationMs} |`)
  .join("\n");

writeFileSync(
  reportMdPath,
  `# Consumer Bootstrap Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit proves the future-consumer bootstrap flow can create consumer-owned config files and starter page-kit files from official templates, stage the configs in a git repository, render the standard page-kit requirements in a minimal fixture, and pass the same config-versioning and page-kit audits required by aggregate readiness.

Fixture: \`${fixtureRoot}\`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
${stepRows}

## Generated Configs

- Readiness exists: ${report.generatedConfigs.readiness.exists ? "yes" : "no"}
- Readiness report label: \`${report.generatedConfigs.readiness.reportLabel || "n/a"}\`
- Page-kit exists: ${report.generatedConfigs.pageKit.exists ? "yes" : "no"}
- Page-kit route root: \`${report.generatedConfigs.pageKit.routeCoverage?.root ?? "n/a"}\`
- Page-kit base route: \`${report.generatedConfigs.pageKit.routeCoverage?.baseRoute ?? "n/a"}\`

## Starter Files

| File | Required fragments | Missing fragments | Status |
| --- | --- | --- | --- |
${starterFileRows.map((row) => `| \`${row.file}\` | ${row.requiredFragments.map((fragment) => `\`${fragment}\``).join(", ")} | ${row.missingFragments.length > 0 ? row.missingFragments.map((fragment) => `\`${fragment}\``).join(", ") : "None"} | ${row.pass ? "pass" : "fail"} |`).join("\n")}
`
);

console.log(`Consumer bootstrap audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  const failedSteps = steps.filter((step) => step.status !== "pass").map((step) => step.commandText).join(", ") || "generated config assertions";
  console.error(`Consumer bootstrap audit failed: ${failedSteps}`);
  process.exit(1);
}
