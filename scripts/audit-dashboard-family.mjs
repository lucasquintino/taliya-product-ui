import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const jsonPath = resolve(specDir, "dashboard-family-audit.json");
const mdPath = resolve(specDir, "dashboard-family-audit.md");

const contracts = [
  {
    page: "TodayShell",
    file: "apps/docs/src/stories/ImageCoverageToday.stories.tsx",
    family: "dashboard/today",
    requiredPageSnippets: ["<CrmDashboardPage", 'columns="today"', "<TodayDashboard", "<TaskDrawer"]
  },
  {
    page: "ReportsManagementPage",
    file: "apps/docs/src/stories/ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<ReportFilterBar />}", "<ReportsManagementContent />", "<ExportAction"]
  },
  {
    page: "MoneyOnTheTablePage",
    file: "apps/docs/src/stories/ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<MoneyTableFilters />}", "<OpportunityGroupCard", "drawer={<OpportunityPanel />}"]
  },
  {
    page: "SupportCentralPage",
    file: "apps/docs/src/stories/ImageCoverageSupport.stories.tsx",
    family: "dashboard/support",
    requiredPageSnippets: ["<CrmDashboardPage", "<SupportStatusSidebar />", "<SupportCentralContent />", "drawer={<SupportTicketDrawer />}"]
  },
  {
    page: "AgentsCatalogPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "dashboard/agents",
    requiredPageSnippets: ["<CrmDashboardPage", "columns={1}", "<AgentCatalog"]
  },
  {
    page: "AgentAgendaRoutinesPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "dashboard/agents",
    requiredPageSnippets: ["<CrmDashboardPage", "columns={3}", "<AgentRoutineCard"]
  },
  {
    page: "SettingsHubPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "dashboard/settings",
    requiredPageSnippets: ["<CrmDashboardPage", "columns={4}", "<SettingsHubCard"]
  },
  {
    page: "FinanceBillingDrawerPage",
    file: "apps/docs/src/stories/ImageCoverageFinance.stories.tsx",
    family: "dashboard/finance",
    requiredPageSnippets: ["<FinanceOverviewDashboard drawer={<PaymentDrawer />} />"]
  },
  {
    page: "AgendaCalendarPage",
    file: "apps/docs/src/stories/ImageCoverageAgenda.stories.tsx",
    family: "dashboard/calendar",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<AgendaFilters />}", "<AgendaSidePanel />", "<WeeklyCalendar compact />", "drawer={<ClassDrawer />}"]
  },
  {
    page: "AgendaClassDetailPage",
    file: "apps/docs/src/stories/ImageCoverageAgenda.stories.tsx",
    family: "right-panel/detail",
    requiredPageSnippets: ["<CrmRightPanelPage", "main={<ClassOperationalDetail />}", "panel={", "<ClassDrawer"]
  },
  {
    page: "StudentProfilePage",
    file: "apps/docs/src/stories/ImageCoverageStudents.stories.tsx",
    family: "right-panel/profile",
    requiredPageSnippets: ["<CrmRightPanelPage", "<StudentHeader", "<ProfileTabs", "<StudentProfileMain", "panel={<StudentProfileRail"]
  },
  {
    page: "BillingSubscriptionPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "PlanSummaryCard"]
  },
  {
    page: "BillingInvoicesPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "InvoiceTable"]
  },
  {
    page: "BillingAddOnsPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "AddOnCard"]
  },
  {
    page: "UsageOverviewPage",
    file: "apps/docs/src/stories/ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<QuotaProgress"]
  },
  {
    page: "UsageLedgerPage",
    file: "apps/docs/src/stories/ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageLedgerTable"]
  },
  {
    page: "AgentPresenceRoutinePage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "PresenceRoutineFlowCards"]
  },
  {
    page: "AgentAbsenceFlowPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<FlowBuilder"]
  },
  {
    page: "AgentAbsenceFlowTestPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<ScenarioList", "<PhonePreview", "<ExecutionTimeline"]
  },
  {
    page: "AgentPublishRoutinePage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<PreflightChecklist", "<PublishRoutineFlowSummary"]
  },
  {
    page: "AgentExecutionReceiptPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<ExecutionReceipt", "<ExecutionTimeline"]
  },
  {
    page: "SettingsPermissionsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<PermissionMatrix", "<ConfigImpactPreview"]
  },
  {
    page: "SettingsPaymentsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<IntegrationStatusRow", "<RuleRow"]
  },
  {
    page: "SettingsAgendaPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<WeeklyCalendar"]
  },
  {
    page: "SettingsNotificationsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<RuleRow"]
  },
  {
    page: "SetupShellGlobalPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupBlockHeader", "<SetupContentGrid"]
  },
  {
    page: "SetupWorkspaceConfigPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupContentGrid", "<SetupChoiceCard", "<ConfigImpactPreview"]
  },
  {
    page: "SetupStudioPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Studio" />', "<WeeklyHoursGrid", "<ConfigImpactPreview"]
  },
  {
    page: "SetupTeamPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Equipe" />', "<RoleCard", "<SetupTeamPreparedList"]
  },
  {
    page: "SetupChannelsPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Canais" />', "<SetupContentGrid", "<IntegrationStatusRow"]
  },
  {
    page: "SetupPlansPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Planos" />', "<SetupContentGrid", "<PlanSummaryCard"]
  },
  {
    page: "SetupPaymentPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Pagamento" />', "<SetupContentGrid", "<IntegrationStatusRow"]
  },
  {
    page: "SetupStudentsImportPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Alunos" />', "<SetupContentGrid", "<SetupImportSourceCard", "<ImportProgress"]
  },
  {
    page: "SetupClassesPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", '<SetupBlockHeader title="Turmas" />', "<SetupContentGrid", "<ClassCard", "<ClassesTable"]
  },
  {
    page: "SetupAgendaPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "bottomBar={<SetupBottomBar />}", '<SetupBlockHeader title="Agenda" />', "<WeeklyCalendar"]
  },
  {
    page: "SetupReviewPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "bottomBar={<SetupBottomBar />}", "<SetupReviewPanel"]
  },
  {
    page: "SetupWelcomePage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup/welcome",
    requiredPageSnippets: ["<SetupWelcome", "<SetupHumanHelpCTA"]
  }
];

const forbiddenFileSnippets = ["CrmPageFamilyShell", "<DashboardGrid"];

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

const sources = new Map();
for (const contract of contracts) {
  if (!sources.has(contract.file)) sources.set(contract.file, readRequired(contract.file));
}

const rows = contracts.map((contract) => {
  const source = sources.get(contract.file);
  const pageSource = sourceWindowForFunction(source, contract.page);
  const missingSnippets = contract.requiredPageSnippets
    .filter((snippet) => !pageSource.includes(snippet))
    .map((snippet) => `${contract.page}: ${snippet}`);

  return {
    page: contract.page,
    file: contract.file,
    family: contract.family,
    missingSnippets,
    status: pageSource && missingSnippets.length === 0 ? "pass" : "fail"
  };
});

const fileRows = [...sources.entries()].map(([file, source]) => {
  const forbiddenPresent = forbiddenFileSnippets.filter((snippet) => source.includes(snippet));
  return {
    file,
    forbiddenPresent,
    status: forbiddenPresent.length === 0 ? "pass" : "fail"
  };
});

const failedRows = rows.filter((row) => row.status !== "pass");
const failedFileRows = fileRows.filter((row) => row.status !== "pass");

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: failedRows.length === 0 && failedFileRows.length === 0 ? "pass" : "fail",
  rowCount: rows.length,
  failedCount: failedRows.length,
  fileCount: fileRows.length,
  failedFileCount: failedFileRows.length,
  rows,
  fileRows,
  note:
    "This audit proves official dashboard, right-panel, and setup image-coverage pages use reusable family wrappers instead of story-local shell/grid anatomy. It does not certify 1:1 visual acceptance."
};

const table = rows
  .map((row) => {
    const missing = row.missingSnippets.length ? row.missingSnippets.join("<br>") : "None";
    return `| ${row.page} | ${row.file} | ${row.family} | ${row.status} | ${missing} |`;
  })
  .join("\n");

const fileTable = fileRows
  .map((row) => {
    const forbidden = row.forbiddenPresent.length ? row.forbiddenPresent.join("<br>") : "None";
    return `| ${row.file} | ${row.status} | ${forbidden} |`;
  })
  .join("\n");

const md = `# Dashboard / Right Panel / Setup Family Audit

Date: ${audit.date}

Status: ${audit.status}

This audit protects the official Dashboard, Right Panel, and Setup page families used by the CRM image coverage stories. It checks for \`CrmDashboardPage\`, \`CrmRightPanelPage\`, \`SetupPage\`, \`SetupContentGrid\`, and page-specific domain slots, and rejects stale direct shell/grid assembly.

It does **not** certify 1:1 visual approval.

## Summary

- Checked page rows: ${audit.rowCount}
- Failed page rows: ${audit.failedCount}
- Checked source files: ${audit.fileCount}
- Failed source files: ${audit.failedFileCount}

## Page Rows

| Page | Source file | Family | Status | Missing snippets |
| --- | --- | --- | --- | --- |
${table}

## File-Level Forbidden Markers

| Source file | Status | Forbidden snippets |
| --- | --- | --- |
${fileTable}
`;

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(mdPath, md);

if (checkMode && audit.status !== "pass") {
  console.error(`Dashboard family audit failed: failedRows=${audit.failedCount}, failedFiles=${audit.failedFileCount}`);
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/dashboard-family-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/dashboard-family-audit.json");
}
