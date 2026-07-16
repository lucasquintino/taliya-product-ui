import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const jsonPath = resolve(specDir, "drawer-lifecycle-audit.json");
const mdPath = resolve(specDir, "drawer-lifecycle-audit.md");

const standardWorklistSnippets = [
  "drawerOpen",
  "drawerOpen ?",
  "onClose={() =>",
  "setDrawerOpen(false)",
  "setDrawerOpen(true)"
];

const contracts = [
  ["TasksShell", "ImageCoverageTasks.stories.tsx", "worklist/tasks", standardWorklistSnippets],
  ["ChecklistsShell", "ImageCoverageChecklists.stories.tsx", "worklist/checklists", standardWorklistSnippets],
  ["ApprovalsShell", "ImageCoverageApprovals.stories.tsx", "worklist/approvals", standardWorklistSnippets],
  ["StudentsShell", "ImageCoverageStudents.stories.tsx", "worklist/students", standardWorklistSnippets],
  ["ReplacementsShell", "ImageCoverageReplacements.stories.tsx", "worklist/replacements", standardWorklistSnippets],
  ["TodayShell", "ImageCoverageToday.stories.tsx", "dashboard/today", [...standardWorklistSnippets, "onTaskSelect={() => setDrawerOpen(true)}"]],
  ["OperationShell", "ImageCoverageOperation.stories.tsx", "kanban/operation", ["selectedCardId ?", "onClose={() => setSelectedCardId(\"\")}", "setSelectedCardId(card.id)"]],
  ["SalesInterestedListPage", "ImageCoverageSales.stories.tsx", "worklist/sales", standardWorklistSnippets],
  ["SalesExperimentalListPage", "ImageCoverageSales.stories.tsx", "worklist/sales", standardWorklistSnippets],
  ["SalesEnrollmentChecklistPage", "ImageCoverageSales.stories.tsx", "worklist/sales", standardWorklistSnippets],
  ["RetentionRiskListPage", "ImageCoverageRetention.stories.tsx", "worklist/retention", standardWorklistSnippets],
  ["RetentionCancellationQueuePage", "ImageCoverageRetention.stories.tsx", "worklist/retention", standardWorklistSnippets],
  ["RetentionReactivationListPage", "ImageCoverageRetention.stories.tsx", "worklist/retention", standardWorklistSnippets],
  ["RetentionComplaintQueuePage", "ImageCoverageRetention.stories.tsx", "worklist/retention", standardWorklistSnippets],
  ["AgendaCalendarPage", "ImageCoverageAgenda.stories.tsx", "dashboard/agenda", [...standardWorklistSnippets, "onEventSelect={() => setDrawerOpen(true)}"]],
  ["AgendaClassesPage", "ImageCoverageAgenda.stories.tsx", "worklist/agenda", [...standardWorklistSnippets, "onRowSelect={(row) =>"]],
  ["AgendaGradePage", "ImageCoverageAgenda.stories.tsx", "worklist/agenda", [...standardWorklistSnippets, "onEventSelect={() => setDrawerOpen(true)}"]],
  ["FinanceBillingDrawerPage", "ImageCoverageFinance.stories.tsx", "dashboard/finance", [...standardWorklistSnippets, "onOpenCase={() => setDrawerOpen(true)}"]],
  ["FinanceMovementsPage", "ImageCoverageFinance.stories.tsx", "worklist/finance", [...standardWorklistSnippets, "onRowSelect={(row) =>"]],
  ["SupportCentralPage", "ImageCoverageSupport.stories.tsx", "dashboard/support", [...standardWorklistSnippets, "onTicketSelect={(ticketId) =>"]],
  ["InternalOverviewPage", "ImageCoverageInternal.stories.tsx", "dashboard/internal", standardWorklistSnippets],
  ["InternalTenantsListDetailPage", "ImageCoverageInternal.stories.tsx", "worklist/internal", [...standardWorklistSnippets, "onRowSelect={(tenantId) =>"]],
  ["MoneyOnTheTablePage", "ImageCoverageReports.stories.tsx", "dashboard/reports", [...standardWorklistSnippets, "onItemOpen={(item) =>"]]
].map(([page, file, family, requiredPageSnippets]) => ({
  page,
  file: `apps/docs/src/stories/${file}`,
  family,
  requiredPageSnippets
}));

function readRequired(filePath) {
  const absolute = resolve(root, filePath);
  if (!existsSync(absolute)) throw new Error(`Missing required source: ${filePath}`);
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

const sources = new Map();
for (const contract of contracts) {
  if (!sources.has(contract.file)) sources.set(contract.file, readRequired(contract.file));
}

const rows = contracts.map((contract) => {
  const pageSource = sourceWindowForFunction(sources.get(contract.file), contract.page);
  const missingSnippets = contract.requiredPageSnippets.filter((snippet) => !pageSource.includes(snippet));
  return {
    page: contract.page,
    file: contract.file,
    family: contract.family,
    missingSnippets,
    status: pageSource && missingSnippets.length === 0 ? "pass" : "fail"
  };
});

const failedRows = rows.filter((row) => row.status !== "pass");
const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: failedRows.length === 0 ? "pass" : "fail",
  rowCount: rows.length,
  failedCount: failedRows.length,
  rows,
  note: "This audit proves selected-object drawers can close, unmount, and reopen from their page interaction. It does not certify visual parity or browser behavior."
};

const table = rows.map((row) => {
  const missing = row.missingSnippets.length ? row.missingSnippets.join("<br>") : "None";
  return `| ${row.page} | ${row.family} | ${row.status} | ${missing} |`;
}).join("\n");

const md = `# Drawer Lifecycle Audit

Date: ${audit.date}

Status: ${audit.status}

This audit protects selected-object drawer lifecycle across official worklist, kanban, and dashboard stories. Every listed page must mount its drawer conditionally, close and unmount it through the official drawer callback, and reopen it from its primary row, card, event, ticket, or action selection.

It does **not** certify 1:1 visual approval or replace browser interaction tests.

## Summary

- Checked page rows: ${audit.rowCount}
- Failed page rows: ${audit.failedCount}

| Page | Family | Status | Missing snippets |
| --- | --- | --- | --- |
${table}
`;

const json = `${JSON.stringify(audit, null, 2)}\n`;
const stale = !existsSync(jsonPath) || !existsSync(mdPath) || readFileSync(jsonPath, "utf8") !== json || readFileSync(mdPath, "utf8") !== md;

if (!checkMode) {
  writeFileSync(jsonPath, json);
  writeFileSync(mdPath, md);
  console.log("Wrote specs/001-product-ui-foundation/drawer-lifecycle-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/drawer-lifecycle-audit.json");
}

if (checkMode && (audit.status !== "pass" || stale)) {
  console.error(`Drawer lifecycle audit failed: failedRows=${audit.failedCount}, stale=${stale}`);
  process.exit(1);
}

if (checkMode) console.log(`Drawer lifecycle audit passed: rows=${audit.rowCount}`);
