import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-wrapper-contract-probe-"));

function writeText(relativePath, content) {
  const filePath = join(tempDir, relativePath);
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
}

writeText(
  "features/internal/leads/leads-workspace.tsx",
  `import { KanbanBoard, KanbanColumn, KanbanCard, PageQuickFilters } from "@taliya/crm";

function UnusedOfficialKanbanPreview() {
  return (
    <KanbanBoard>
      <KanbanColumn title="Novo" count={1}>
        <KanbanCard title="Lead importado" eyebrow="CRM" />
      </KanbanColumn>
    </KanbanBoard>
  );
}

export function LeadKanban({
  rows
}: {
  rows: Array<{ id: string; title: string }>;
}) {
  return (
    <section>
      <PageQuickFilters
        title="Filtros rapidos"
        items={[{ id: "all", label: "Todos", active: true }]}
      />
      <p>{rows.length} leads</p>
      <div className="local-kanban-card">Local clone</div>
    </section>
  );
}

function renderUnusedOfficialKanbanPreview() {
  return (
    <KanbanBoard>
      <KanbanColumn title="Novo" count={1}>
        <KanbanCard title="Lead importado" eyebrow="CRM" />
      </KanbanColumn>
    </KanbanBoard>
  );
}
`
);

writeText(
  "taliya-page-kit.config.json",
  `${JSON.stringify(
    {
      surfaces: [
        {
          id: "leads",
          file: "features/internal/leads/leads-workspace.tsx",
          required: [
            { name: "PageQuickFilters", package: "@taliya/crm" },
            { name: "KanbanBoard", package: "@taliya/crm" },
            { name: "KanbanColumn", package: "@taliya/crm" },
            { name: "KanbanCard", package: "@taliya/crm" }
          ]
        }
      ],
      componentContracts: [
        {
          id: "leads-kanban-wrapper",
          file: "features/internal/leads/leads-workspace.tsx",
          component: "LeadKanban",
          required: [
            { name: "KanbanBoard", package: "@taliya/crm" },
            { name: "KanbanColumn", package: "@taliya/crm" },
            { name: "KanbanCard", package: "@taliya/crm" }
          ]
        }
      ],
      routes: []
    },
    null,
    2
  )}\n`
);

const result = spawnSync(process.execPath, [
  "scripts/audit-consumer-page-kit.mjs",
  "--check",
  "--consumer",
  tempDir,
  "--page-kit-config",
  join(tempDir, "taliya-page-kit.config.json"),
  "--report-label",
  "wrapper-contract-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected consumer-page-kit audit to reject a wrapper that only renders official roots in an unused helper, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Failed component contracts: leads-kanban-wrapper")) {
  console.error("Expected failure output to name the invalid leads-kanban-wrapper component contract.");
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-wrapper-contract-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its wrapper contract probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const failedContract = report.componentContractRows?.find((row) => row.id === "leads-kanban-wrapper");
const missingBoard = failedContract?.requiredStatus?.find((row) => row.componentName === "KanbanBoard");
const missingColumn = failedContract?.requiredStatus?.find((row) => row.componentName === "KanbanColumn");
const missingCard = failedContract?.requiredStatus?.find((row) => row.componentName === "KanbanCard");

if (
  report.summary?.pass !== false ||
  !report.summary?.failedComponentContracts?.includes("leads-kanban-wrapper") ||
  failedContract?.pass !== false ||
  missingBoard?.imported !== true ||
  missingBoard?.jsxUsed !== true ||
  missingBoard?.jsxUsedInComponent !== false ||
  missingColumn?.imported !== true ||
  missingColumn?.jsxUsed !== true ||
  missingColumn?.jsxUsedInComponent !== false ||
  missingCard?.imported !== true ||
  missingCard?.jsxUsed !== true ||
  missingCard?.jsxUsedInComponent !== false
) {
  console.error("Expected wrapper contract probe report to fail because official kanban roots are absent from the LeadKanban render body.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit wrapper contract probe passed.");
