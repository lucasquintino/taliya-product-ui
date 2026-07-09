import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const fixtureRoot = resolve(root, `tmp/future-consumer-readiness-fixture-${process.pid}`);
const reportJsonPath = resolve(specDir, "future-consumer-fixture-audit.json");
const reportMdPath = resolve(specDir, "future-consumer-fixture-audit.md");
const localReleaseManifest = JSON.parse(readFileSync(resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"), "utf8"));
const packageNames = localReleaseManifest.packages.map((packageInfo) => packageInfo.tarball);
const taliyaDependencies = Object.fromEntries(
  localReleaseManifest.packages.map((packageInfo) => [
    packageInfo.name,
    `file:vendor/taliya-product-ui/${packageInfo.tarball}`
  ])
);

function run(commandArgs, cwd = root, options = {}) {
  const startedAt = Date.now();
  const result = spawnSync(commandArgs[0], commandArgs.slice(1), {
    cwd,
    encoding: "utf8",
    shell: false,
    timeout: options.timeoutMs ?? 120000,
    killSignal: "SIGKILL"
  });
  return {
    commandText: commandArgs.join(" "),
    cwd,
    status: result.status === 0 && !result.error ? "pass" : "fail",
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    stdout: (result.stdout ?? "").trim(),
    stderr: [result.error ? `${result.error.name}: ${result.error.message}` : "", result.stderr ?? ""].filter(Boolean).join("\n").trim()
  };
}

function runNpm(commandArgs, cwd, options = {}) {
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", "npm", ...commandArgs] : commandArgs;
  return run([command, ...args], cwd, options);
}

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function copyTarballs() {
  const vendorRoot = resolve(fixtureRoot, "vendor/taliya-product-ui");
  mkdirSync(vendorRoot, { recursive: true });
  for (const packageName of packageNames) {
    copyFileSync(resolve(root, "dist-packages", packageName), resolve(vendorRoot, packageName));
  }
  copyFileSync(
    resolve(root, "dist-packages/taliya-product-ui-local-manifest.json"),
    resolve(vendorRoot, "taliya-product-ui-local-manifest.json")
  );
}

function removeFixtureRoot() {
  if (!existsSync(fixtureRoot)) return;
  let lastError;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      rmSync(fixtureRoot, { recursive: true, force: true, maxRetries: 4, retryDelay: 500 });
      return;
    } catch (error) {
      lastError = error;
      spawnSync(process.execPath, ["-e", "Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000)"]);
    }
  }
  throw lastError;
}

removeFixtureRoot();
mkdirSync(fixtureRoot, { recursive: true });
copyTarballs();

writeText(
  resolve(fixtureRoot, "package.json"),
  `${JSON.stringify({
    name: "future-consumer-readiness-fixture",
    private: true,
    type: "module",
    scripts: {
      typecheck: "node scripts/page-kit-smoke.mjs",
      lint: "node scripts/page-kit-smoke.mjs",
      test: "node scripts/page-kit-smoke.mjs",
      build: "node scripts/page-kit-smoke.mjs"
    },
    dependencies: {
      ...taliyaDependencies,
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    }
  }, null, 2)}\n`
);
writeText(
  resolve(fixtureRoot, "app/layout.tsx"),
  `import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
`
);
writeText(
  resolve(fixtureRoot, "app/globals.css"),
  `:root {
  color: var(--taliya-color-text-primary);
  background: var(--taliya-surface-page);
  font-family: var(--taliya-type-font-primary);
  font-size: var(--taliya-type-body-size);
}

body {
  margin: 0;
  color: var(--taliya-color-text-primary);
  background: var(--taliya-surface-page);
  font-family: var(--taliya-type-font-primary);
  font-size: var(--taliya-type-body-size);
}
`
);

const steps = [];
steps.push(run(["git", "init"], fixtureRoot));
steps.push(
  runNpm(
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", "--force", "--fetch-timeout=60000"],
    fixtureRoot,
    { timeoutMs: 600000 }
  )
);
steps.push(run([
  process.execPath,
  "scripts/bootstrap-consumer-configs.mjs",
  "--consumer",
  relative(root, fixtureRoot),
  "--write",
  "--starter-files",
  "--report-label",
  "future-consumer-fixture"
]));
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
const starterFileRowsBeforeEnrichment = starterFileContracts.map((contract) => {
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
steps.push({
  commandText: "verify bootstrap generated installed future CRM starter files",
  cwd: fixtureRoot,
  status: starterFileRowsBeforeEnrichment.every((row) => row.pass) ? "pass" : "fail",
  exitCode: starterFileRowsBeforeEnrichment.every((row) => row.pass) ? 0 : 1,
  durationMs: 0,
  stdout: "Checked bootstrap-generated shell, work-list, kanban, and route starter files before SSR enrichment",
  stderr: ""
});
writeText(
  resolve(fixtureRoot, "features/crm/work-list/work-list-page.tsx"),
  `import { CrmRecordDrawer, PageFilterBar, PageQuickFilters, WorkListDetailPage } from "@taliya/crm";
import { Button, DataTable } from "@taliya/ui";

export function WorkListPage() {
  const rows = [{ id: "lead-1", name: "Ana Silva", stage: "Novo", owner: "Mariana" }];

  return (
    <WorkListDetailPage
      detail={
        <CrmRecordDrawer
          actions={[{ id: "open", label: "Abrir", variant: "primary" }]}
          facts={[{ id: "owner", label: "Dono", value: "Mariana", icon: "user" }]}
          inline
          open
          title="Ana Silva"
          onOpenChange={() => undefined}
        />
      }
      detailState="selected"
      filterBar={
        <PageFilterBar
          actions={<Button variant="primary">Novo lead</Button>}
          filters={[{ id: "owner", label: "Dono", kind: "single", options: [{ value: "mariana", label: "Mariana" }] }]}
          searchPlaceholder="Buscar leads..."
        />
      }
      quickFilters={
        <PageQuickFilters
        heading="Filtros rápidos"
          items={[{ id: "mine", label: "Meus leads", count: "1", icon: "user", selected: true }]}
        />
      }
    >
      <DataTable
        columns={[
          { key: "name", header: "Lead", sortable: true },
          { key: "stage", header: "Status", sortable: true },
          { key: "owner", header: "Dono", sortable: true }
        ]}
        rows={rows}
      />
    </WorkListDetailPage>
  );
}
`
);
writeText(
  resolve(fixtureRoot, "app/crm/page.tsx"),
  `import { CrmShellClient } from "../../components/crm-shell-client";
import { WorkListPage } from "../../features/crm/work-list/work-list-page";

export default function CrmPage() {
  return (
    <CrmShellClient>
      <WorkListPage />
    </CrmShellClient>
  );
}
`
);
writeText(
  resolve(fixtureRoot, "features/crm/kanban/kanban-page.tsx"),
  `import { KanbanBoard, KanbanCard, KanbanColumn, PageQuickFilters } from "@taliya/crm";

const columns = [
  { id: "new", title: "Novo", cards: [{ id: "lead-1", title: "Ana Silva" }] },
  { id: "won", title: "Ganho", cards: [] }
];

export function KanbanPage() {
  return (
    <KanbanBoard rail={<PageQuickFilters title="Filtros" items={[]} />}>
      {columns.map((column) => (
        <KanbanColumn key={column.id} title={column.title} count={column.cards.length}>
          {column.cards.map((card) => (
            <KanbanCard key={card.id} title={card.title} />
          ))}
        </KanbanColumn>
      ))}
    </KanbanBoard>
  );
}
`
);
writeText(
  resolve(fixtureRoot, "app/crm/kanban/page.tsx"),
  `import { CrmShellClient } from "../../../components/crm-shell-client";
import { KanbanPage } from "../../../features/crm/kanban/kanban-page";

export default function CrmKanbanRoute() {
  return (
    <CrmShellClient>
      <KanbanPage />
    </CrmShellClient>
  );
}
`
);
writeText(
  resolve(fixtureRoot, "scripts/page-kit-smoke.mjs"),
  `import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { CrmProductShell, CrmRecordDrawer, KanbanBoard, KanbanCard, KanbanColumn, PageFilterBar, PageQuickFilters, WorkListDetailPage, standardPageKitManifest } from "@taliya/crm";
import { standardPageKitManifest as standardPageKitSubpathManifest } from "@taliya/crm/standard-page-kit";
import { Button, DataTable, Toolbar } from "@taliya/ui";

const requiredExportResolutions = [
  "@taliya/tokens",
  "@taliya/tokens/tokens.css",
  "@taliya/ui",
  "@taliya/ui/styles.css",
  "@taliya/crm",
  "@taliya/crm/standard-page-kit",
  "@taliya/crm/styles.css"
];
const unresolvedExports = [];
for (const specifier of requiredExportResolutions) {
  try {
    const resolved = import.meta.resolve(specifier);
    if (!resolved.startsWith("file:") || !existsSync(fileURLToPath(resolved))) {
      unresolvedExports.push({ specifier, resolved, exists: false });
    }
  } catch (error) {
    unresolvedExports.push({ specifier, error: error instanceof Error ? error.message : String(error) });
  }
}

const rows = [{ id: "lead-1", name: "Ana Silva", stage: "Novo", owner: "Mariana" }];
const app = createElement(
  CrmProductShell,
  { title: "CRM", subtitle: "Fixture de adoção futura" },
  createElement(Toolbar),
  createElement(
    WorkListDetailPage,
    {
      filterBar: createElement(PageFilterBar, { searchPlaceholder: "Buscar leads..." }),
      quickFilters: createElement(PageQuickFilters, { title: "Filtros", items: [] }),
      detail: createElement(CrmRecordDrawer, { inline: true, open: true, title: "Ana Silva", onOpenChange: () => undefined }),
      detailState: "selected"
    },
    createElement(DataTable, { columns: [{ key: "name", header: "Lead" }], rows })
  ),
  createElement(PageFilterBar, {
    actions: createElement(Button, { variant: "primary" }, "Novo lead"),
    filters: [{ id: "owner", label: "Dono", kind: "single", options: [{ value: "mariana", label: "Mariana" }] }],
    searchPlaceholder: "Buscar leads..."
  }),
  createElement(PageQuickFilters, {
    heading: "Filtros rápidos",
    items: [{ id: "mine", label: "Meus leads", count: "1", icon: "user", selected: true }]
  }),
  createElement(DataTable, {
    columns: [
      { key: "name", header: "Lead", sortable: true },
      { key: "stage", header: "Status", sortable: true },
      { key: "owner", header: "Dono", sortable: true }
    ],
    rows
  }),
  createElement(CrmRecordDrawer, {
    actions: [{ id: "open", label: "Abrir", variant: "primary" }],
    facts: [{ id: "owner", label: "Dono", value: "Mariana", icon: "user" }],
    inline: true,
    open: true,
    title: "Ana Silva",
    onOpenChange: () => undefined
  }),
  createElement(
    KanbanBoard,
    { rail: createElement(PageQuickFilters, { title: "Filtros", items: [] }) },
    createElement(
      KanbanColumn,
      { title: "Novo", count: 1 },
      createElement(KanbanCard, { title: "Ana Silva" })
    )
  )
);

const html = renderToString(app);
const requiredMarkers = [
  "tcrm-product-shell",
  "tcrm-work-list-detail-page",
  "tcrm-page-filter-bar",
  "tcrm-page-quick-filters",
  "tl-table",
  "tcrm-kanban-board",
  "tcrm-kanban-column",
  "tcrm-kanban-card",
  "tcrm-record-drawer",
  "Novo lead",
  "Ana Silva"
];
const missingMarkers = requiredMarkers.filter((marker) => !html.includes(marker));
const manifestNames = new Set((standardPageKitManifest.components ?? []).map((component) => component.name));
const subpathManifestMatches = JSON.stringify(standardPageKitSubpathManifest) === JSON.stringify(standardPageKitManifest);
const missingManifest = ["CrmProductShell", "WorkListDetailPage", "PageFilterBar", "PageQuickFilters", "KanbanBoard", "KanbanColumn", "KanbanCard", "CrmRecordDrawer"].filter(
  (name) => !manifestNames.has(name)
);
const missingStyleExports = [
  "node_modules/@taliya/tokens/src/tokens.css",
  "node_modules/@taliya/ui/src/styles.css",
  "node_modules/@taliya/crm/src/styles.css"
].filter((filePath) => !existsSync(filePath));

if (unresolvedExports.length || missingMarkers.length || missingManifest.length || missingStyleExports.length || !subpathManifestMatches) {
  console.error(JSON.stringify({ unresolvedExports, missingMarkers, missingManifest, missingStyleExports, subpathManifestMatches }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "pass",
  renderedLength: html.length,
  manifestCount: standardPageKitManifest.components?.length ?? 0,
  subpathManifestMatches,
  resolvedExports: requiredExportResolutions,
  markers: requiredMarkers
}));
`
);
steps.push({
  commandText: "enrich installed future CRM page-kit smoke fixture files",
  cwd: fixtureRoot,
  status: "pass",
  exitCode: 0,
  durationMs: 0,
  stdout: "Kept bootstrap-generated configs/starter base, then enriched work-list, kanban, route, and render smoke files for SSR assertions",
  stderr: ""
});
steps.push(runNpm(["run", "typecheck"], fixtureRoot));
steps.push(run(["git", "add", "taliya-readiness.config.json", "taliya-page-kit.config.json"], fixtureRoot));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-integration.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--vendor",
  "vendor/taliya-product-ui",
  "--report-label",
  "future-consumer-fixture"
]));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-package-sync.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--vendor",
  "vendor/taliya-product-ui",
  "--report-label",
  "future-consumer-fixture"
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
  "future-consumer-fixture"
]));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-config-versioning.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--report-label",
  "future-consumer-fixture"
]));
steps.push(run([
  process.execPath,
  "scripts/audit-consumer-runtime.mjs",
  "--check",
  "--consumer",
  relative(root, fixtureRoot),
  "--report-label",
  "future-consumer-fixture"
]));

const readinessConfig = readJson(resolve(fixtureRoot, "taliya-readiness.config.json"));
const pageKitConfig = readJson(resolve(fixtureRoot, "taliya-page-kit.config.json"));
const consumerIntegrationFixtureReportPath = resolve(specDir, "consumer-integration-audit-future-consumer-fixture.json");
const consumerIntegrationFixture = existsSync(consumerIntegrationFixtureReportPath)
  ? readJson(consumerIntegrationFixtureReportPath)
  : null;
const failedSteps = steps.filter((step) => step.status !== "pass");
const smokeStep = steps.find((step) => step.commandText.includes("npm run typecheck"));
let smokeAssertions = {};
try {
  const stdoutLines = (smokeStep?.stdout ?? "").split(/\r?\n/).filter(Boolean);
  smokeAssertions = JSON.parse(stdoutLines.at(-1) ?? "{}");
} catch {
  smokeAssertions = {};
}
const report = {
  generatedAt: new Date().toISOString(),
  fixtureRoot,
  status:
    failedSteps.length === 0 &&
    readinessConfig.reportLabel === "future-consumer-fixture" &&
    pageKitConfig.routeCoverage?.root === "app/crm" &&
    consumerIntegrationFixture?.standardPageKitRuntimeStatus?.exactParity === true
      ? "pass"
      : "fail",
  steps,
  assertions: {
    reportLabel: readinessConfig.reportLabel,
    routeCoverage: pageKitConfig.routeCoverage,
    starterFiles: {
      generatedByBootstrap: true,
      pass: starterFileRowsBeforeEnrichment.every((row) => row.pass),
      rows: starterFileRowsBeforeEnrichment
    },
    packageJsonExists: existsSync(resolve(fixtureRoot, "package.json")),
    nodeModulesTaliyaExists: existsSync(resolve(fixtureRoot, "node_modules/@taliya/crm/package.json")),
    installedManifestExactParity: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.exactParity === true,
    installedManifestCount: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.count ?? null,
    installedManifestExpectedCount: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.expectedCount ?? null,
    installedManifestMissingRows: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.missingRows ?? [],
    installedManifestExtraRows: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.extraRows ?? [],
    installedManifestOrderOrFieldDrift: consumerIntegrationFixture?.standardPageKitRuntimeStatus?.orderOrFieldDrift ?? null,
    smoke: smokeAssertions
  }
};

writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const stepRows = steps
  .map((step) => `| \`${step.commandText}\` | ${step.status} | ${step.exitCode ?? "n/a"} | ${step.durationMs} |`)
  .join("\n");
writeFileSync(
  reportMdPath,
  `# Future Consumer Fixture Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit creates an installed synthetic future CRM consumer from local package tarballs and proves the consumer-facing audits can pass against that app shape. It is not real future CRM adoption.

Fixture: \`${fixtureRoot}\`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
${stepRows}

## Assertions

- Report label: \`${report.assertions.reportLabel}\`
- Route coverage root: \`${report.assertions.routeCoverage?.root ?? "n/a"}\`
- Bootstrap starter files generated: ${report.assertions.starterFiles.generatedByBootstrap ? "yes" : "no"}
- Bootstrap starter files pass: ${report.assertions.starterFiles.pass ? "yes" : "no"}
- Package JSON exists: ${report.assertions.packageJsonExists ? "yes" : "no"}
- Installed \`@taliya/crm\`: ${report.assertions.nodeModulesTaliyaExists ? "yes" : "no"}
- Installed runtime manifest exact parity: ${report.assertions.installedManifestExactParity ? "yes" : "no"}
- Installed runtime manifest count: ${report.assertions.installedManifestCount ?? "n/a"}/${report.assertions.installedManifestExpectedCount ?? "n/a"}
- Installed runtime manifest missing rows: ${report.assertions.installedManifestMissingRows.length ? report.assertions.installedManifestMissingRows.map((row) => `\`${row.package}:${row.name}\``).join(", ") : "none"}
- Installed runtime manifest extra rows: ${report.assertions.installedManifestExtraRows.length ? report.assertions.installedManifestExtraRows.map((row) => `\`${row.package}:${row.name}\``).join(", ") : "none"}
- Installed runtime manifest order/field drift: ${report.assertions.installedManifestOrderOrFieldDrift ? "yes" : "no"}
- Smoke rendered length: ${report.assertions.smoke?.renderedLength ?? "n/a"}
- Smoke manifest count: ${report.assertions.smoke?.manifestCount ?? "n/a"}
- Smoke subpath manifest matches root export: ${report.assertions.smoke?.subpathManifestMatches ? "yes" : "no"}
- Smoke resolved exports: ${(report.assertions.smoke?.resolvedExports ?? []).map((specifier) => `\`${specifier}\``).join(", ") || "n/a"}

## Bootstrap Starter Files

| File | Required fragments | Missing fragments | Status |
| --- | --- | --- | --- |
${starterFileRowsBeforeEnrichment.map((row) => `| \`${row.file}\` | ${row.requiredFragments.map((fragment) => `\`${fragment}\``).join(", ")} | ${row.missingFragments.length > 0 ? row.missingFragments.map((fragment) => `\`${fragment}\``).join(", ") : "None"} | ${row.pass ? "pass" : "fail"} |`).join("\n")}
`
);

console.log(`Future consumer fixture audit: ${report.status}`);
console.log(`Wrote ${relative(root, reportMdPath).replaceAll("\\", "/")}`);
console.log(`Wrote ${relative(root, reportJsonPath).replaceAll("\\", "/")}`);

if (checkMode && report.status !== "pass") {
  console.error(`Failed steps: ${failedSteps.map((step) => step.commandText).join(", ") || "assertions"}`);
  process.exit(1);
}
