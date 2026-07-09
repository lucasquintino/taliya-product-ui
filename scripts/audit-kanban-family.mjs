import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const jsonPath = resolve(specDir, "kanban-family-audit.json");
const mdPath = resolve(specDir, "kanban-family-audit.md");

const contracts = [
  {
    page: "OperationShell",
    file: "apps/docs/src/stories/ImageCoverageOperation.stories.tsx",
    family: "operation-kanban",
    requiredPageSnippets: [
      "<CrmKanbanPage",
      "filterBar={<OperationFilters />}",
      "quickFilters={<OperationQuickFilters />}",
      "<OperationActivityTable",
      "<OperationKanban",
      "<CaseDrawer"
    ],
    requiredOwnerSnippets: {
      OperationFilters: ["<PageFilterBar", 'aria-label="Filtros da operação"', "filters={filters}"],
      OperationQuickFilters: ["<PageQuickFilters", "items={quickFilterItems}"],
      OperationKanban: ["<KanbanColumn", "<KanbanCard", "draggable", "onCardMove", "selected={selectedCardId === card.id}"]
    },
    forbiddenSnippets: ["<GenericBoard", "function GenericBoard", "<div className=\"kanban", "<section className=\"kanban"]
  },
  {
    page: "SalesPipelinePage",
    file: "apps/docs/src/stories/ImageCoverageSales.stories.tsx",
    family: "sales-kanban",
    requiredPageSnippets: [
      "<CrmKanbanPage",
      "filterBar={<SalesPipelineFilters />}",
      "<SalesPipelineBoard />"
    ],
    requiredOwnerSnippets: {
      SalesPipelineFilters: ["<PageFilterBar", "advancedFiltersLabel=\"Mais filtros\"", "filters={filters}"],
      SalesPipelineBoard: ["<KanbanColumn", "<PipelineCard", "columns.map", "Perdidos"]
    },
    forbiddenSnippets: ["drawer={<LeadDrawer", "<GenericBoard", "function GenericBoard", "<KanbanCard"]
  },
  {
    page: "FinanceKanbanPage",
    file: "apps/docs/src/stories/ImageCoverageFinance.stories.tsx",
    family: "finance-kanban",
    requiredPageSnippets: [
      "<CrmKanbanPage",
      "filterBar={<FinanceiroKanbanFilters />}",
      "<FinanceKanbanColumns />"
    ],
    requiredOwnerSnippets: {
      FinanceiroKanbanFilters: ["<PageFilterBar", "filters={filters}", "searchVisible={false}"],
      FinanceKanbanColumns: ["<KanbanColumn", "<FinanceKanbanCard", "columns.map", "Resolvido"]
    },
    forbiddenSnippets: ["<GenericBoard", "function GenericBoard", "<PaymentCaseCard"]
  }
];

function readRequired(filePath) {
  const absolute = resolve(root, filePath);
  if (!existsSync(absolute)) {
    throw new Error(`Missing required source: ${filePath}`);
  }
  return readFileSync(absolute, "utf8");
}

function sourceWindowForFunction(source, functionName) {
  const match = new RegExp(`(?:export\\s+)?function\\s+${functionName}\\s*\\(`).exec(source);
  const start = match?.index ?? -1;
  if (start < 0) return "";

  const rest = source.slice(start + 1);
  const nextFunction = /\n(?:export\s+)?function\s+[A-Za-z0-9_]+\s*\(/.exec(rest);
  const nextConst = /\n(?:export\s+)?const\s+[A-Za-z0-9_]+\s*(?::|=)/.exec(rest);
  const next = [nextFunction?.index, nextConst?.index]
    .filter((index) => typeof index === "number" && index >= 0)
    .sort((a, b) => a - b)[0];

  return source.slice(start, next === undefined ? source.length : start + 1 + next);
}

const rows = contracts.map((contract) => {
  const source = readRequired(contract.file);
  const pageSource = sourceWindowForFunction(source, contract.page);
  const missingPageSnippets = contract.requiredPageSnippets
    .filter((snippet) => !pageSource.includes(snippet))
    .map((snippet) => `${contract.page}: ${snippet}`);
  const missingOwnerSnippets = Object.entries(contract.requiredOwnerSnippets).flatMap(([owner, snippets]) => {
    const ownerSource = sourceWindowForFunction(source, owner);
    if (!ownerSource) return [`${owner}: function missing`];
    return snippets
      .filter((snippet) => !ownerSource.includes(snippet))
      .map((snippet) => `${owner}: ${snippet}`);
  });
  const contractSource = [
    pageSource,
    ...Object.keys(contract.requiredOwnerSnippets).map((owner) => sourceWindowForFunction(source, owner))
  ].join("\n");
  const forbiddenPresent = contract.forbiddenSnippets.filter((snippet) => {
    if (snippet === "drawer={<LeadDrawer") {
      return pageSource.includes(snippet);
    }
    return contractSource.includes(snippet);
  });
  const missingSnippets = [...missingPageSnippets, ...missingOwnerSnippets];

  return {
    page: contract.page,
    file: contract.file,
    family: contract.family,
    missingSnippets,
    forbiddenPresent,
    status: pageSource && missingSnippets.length === 0 && forbiddenPresent.length === 0 ? "pass" : "fail"
  };
});

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: rows.every((row) => row.status === "pass") ? "pass" : "fail",
  rowCount: rows.length,
  failedCount: rows.filter((row) => row.status !== "pass").length,
  rows,
  note:
    "This audit proves official Kanban image-coverage pages use the reusable CrmKanbanPage/KanbanColumn/card family instead of story-local board anatomy. It does not certify 1:1 visual acceptance."
};

const table = rows
  .map((row) => {
    const missing = row.missingSnippets.length ? row.missingSnippets.join("<br>") : "None";
    const forbidden = row.forbiddenPresent.length ? row.forbiddenPresent.join("<br>") : "None";
    return `| ${row.page} | ${row.file} | ${row.family} | ${row.status} | ${missing} | ${forbidden} |`;
  })
  .join("\n");

const md = `# Kanban Family Audit

Date: ${audit.date}

Status: ${audit.status}

This audit protects the official Kanban page family used by Operacao, Vendas, and Financeiro image coverage. It checks for \`CrmKanbanPage\`, official filter bars, official columns/cards, domain card variants, activity/drawer slots where applicable, and rejects story-local generic board anatomy.

It does **not** certify 1:1 visual approval.

## Summary

- Checked rows: ${audit.rowCount}
- Failed rows: ${audit.failedCount}

## Rows

| Page | Source file | Family | Status | Missing snippets | Forbidden legacy snippets |
| --- | --- | --- | --- | --- | --- |
${table}
`;

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(mdPath, md);

if (checkMode && audit.status !== "pass") {
  console.error(`Kanban family audit failed: failedRows=${audit.failedCount}`);
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/kanban-family-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/kanban-family-audit.json");
}
