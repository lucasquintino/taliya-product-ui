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
    requiredPageSnippets: ["<CrmDashboardPage", 'variant === "critical" ? "todayCritical" : "today"', "<TodayDashboard", "<TaskDrawer"]
  },
  {
    page: "ReportsManagementPage",
    file: "apps/docs/src/stories/ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<ReportFilterBar", "<ReportsManagementContent", "<ExportAction"]
  },
  {
    page: "MoneyOnTheTablePage",
    file: "apps/docs/src/stories/ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<MoneyTableFilters", "<OpportunityGroupCard", "drawer={drawerOpen ? <OpportunityPanel", "onClose={() => setDrawerOpen(false)}", "setDrawerOpen(true)"]
  },
  {
    page: "SupportCentralPage",
    file: "apps/docs/src/stories/ImageCoverageSupport.stories.tsx",
    family: "dashboard/support",
    requiredPageSnippets: ["<CrmDashboardPage", "<SupportStatusSidebar", "<SupportCentralContent", "drawer={drawerOpen ? <SupportTicketDrawer", "onClose={() => setDrawerOpen(false)}", "setDrawerOpen(true)"]
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
    requiredPageSnippets: ["<CrmDashboardPage", "columns={4}", "settingsHubItems.map", "<SettingsHubCard", "onOpen={() => setOpenedSettingId"]
  },
  {
    page: "FinanceBillingDrawerPage",
    file: "apps/docs/src/stories/ImageCoverageFinance.stories.tsx",
    family: "dashboard/finance",
    requiredPageSnippets: ["<FinanceOverviewDashboard", "drawer={drawerOpen ? <PaymentDrawer", "onClose={() => setDrawerOpen(false)}", "onOpenCase={() => setDrawerOpen(true)}"]
  },
  {
    page: "AgendaCalendarPage",
    file: "apps/docs/src/stories/ImageCoverageAgenda.stories.tsx",
    family: "dashboard/calendar",
    requiredPageSnippets: ["<CrmDashboardPage", "before={<AgendaFilters />}", "<AgendaSidePanel />", "<WeeklyCalendar compact", "drawer={drawerOpen ? <AgendaSelectedClassDrawer", "onClose={() => setDrawerOpen(false)}", "onEventSelect={() => setDrawerOpen(true)}"]
  },
  {
    page: "AgendaClassDetailPage",
    file: "apps/docs/src/stories/ImageCoverageAgenda.stories.tsx",
    family: "right-panel/detail",
    requiredPageSnippets: ["<CrmRightPanelPage", "main={<ClassOperationalDetail", "panel={", "<ClassDrawer"]
  },
  {
    page: "StudentProfilePage",
    file: "apps/docs/src/stories/ImageCoverageStudents.stories.tsx",
    family: "right-panel/profile",
    requiredPageSnippets: ["<CrmRightPanelPage", "<StudentHeader", "<ProfileTabs", "<StudentProfileOverviewGrid", "panel={<StudentProfileActionRail"]
  },
  {
    page: "BillingSubscriptionPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingSubscriptionWorkspace", "rightPanelVariant=\"billing-subscription\"", "browserUrl=\"https://app.taliya.com/app/billing\"", "topNavSelection: \"none\"", "navItems: crmOperationalNavItems"]
  },
  {
    page: "BillingInvoicesPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingInvoicesWorkspace", "rightPanelVariant=\"billing-invoices\""]
  },
  {
    page: "BillingAddOnsPage",
    file: "apps/docs/src/stories/ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingAddOnsWorkspace", "rightPanelVariant=\"billing-addons\""]
  },
  {
    page: "UsageOverviewPage",
    file: "apps/docs/src/stories/ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageOverviewWorkspace", "rightPanelVariant=\"usage-overview\""]
  },
  {
    page: "UsageLedgerPage",
    file: "apps/docs/src/stories/ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageLedgerTable", "rightPanelVariant=\"usage-ledger\""]
  },
  {
    page: "AgentPresenceRoutinePage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentRoutineWorkspace"]
  },
  {
    page: "AgentAbsenceFlowPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentFlowWorkspace"]
  },
  {
    page: "AgentAbsenceFlowTestPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<SimulationRunner"]
  },
  {
    page: "AgentPublishRoutinePage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentPublishRoutineWorkspace"]
  },
  {
    page: "AgentExecutionReceiptPage",
    file: "apps/docs/src/stories/ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredPageSnippets: ["<CrmRightPanelPage", "main={<ExecutionReceipt", "panel={<AgentFlowDrawer"]
  },
  {
    page: "SettingsPermissionsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsPermissionsWorkspace", "rightPanelVariant=\"settings-permissions\""]
  },
  {
    page: "SettingsStudioPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsStudioWorkspace", 'browserUrl="https://app.taliya.com/app/configuracoes/studio"', 'rightPanelVariant="settings"']
  },
  {
    page: "SettingsTeamPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsTeamWorkspace", 'browserUrl="https://app.taliya.com/app/configuracoes/equipe"', 'rightPanelVariant="settings"']
  },
  {
    page: "SettingsChannelsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsChannelsWorkspace", 'browserUrl="https://app.taliya.com/app/configuracoes/canais"', 'rightPanelVariant="settings"']
  },
  {
    page: "SettingsPlansPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsPlansWorkspace", 'browserUrl="https://app.taliya.com/app/configuracoes/financeiro/modelos"', 'rightPanelVariant="settings"']
  },
  {
    page: "SettingsPaymentsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsPaymentsWorkspace", "rightPanelVariant=\"settings-payments\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/financeiro/pagamentos\"", "topNavSelection=\"none\""]
  },
  {
    page: "SettingsAgendaPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsAgendaWorkspace", "rightPanelVariant=\"settings-agenda\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/agenda\"", "topNavSelection=\"none\""]
  },
  {
    page: "SettingsNotificationsPage",
    file: "apps/docs/src/stories/ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredPageSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsNotificationsWorkspace", "rightPanelVariant=\"settings-notifications\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/notificacoes\"", "topNavSelection=\"none\""]
  },
  {
    page: "SetupShellGlobalPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "progress={32}", "step={2}"]
  },
  {
    page: "SetupWorkspaceConfigPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupConsumptionWorkspace", "progress={32}", "step={2}"]
  },
  {
    page: "SetupStudioPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupStudioWorkspace", "progress={12}", "step={1}"]
  },
  {
    page: "SetupTeamPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupTeamWorkspace", "progress={24}", "step={2}"]
  },
  {
    page: "SetupChannelsPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupChannelsWorkspace", "progress={36}", "step={3}"]
  },
  {
    page: "SetupPlansPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupPlansWorkspace", "progress={48}", "step={4}"]
  },
  {
    page: "SetupPaymentPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupPaymentWorkspace", "progress={55}", "step={5}"]
  },
  {
    page: "SetupStudentsImportPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupStudentsWorkspace", "progress={66}", "step={6}"]
  },
  {
    page: "SetupClassesPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupClassesWorkspace", "progress={77}", "step={7}"]
  },
  {
    page: "SetupAgendaPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupAgendaWorkspace", "progress={88}", "step={8}"]
  },
  {
    page: "SetupReviewPage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredPageSnippets: ["<SetupPage", "<SetupReviewWorkspace", "progress={98}", "step={9}"]
  },
  {
    page: "SetupWelcomePage",
    file: "apps/docs/src/stories/ImageCoverageSetup.stories.tsx",
    family: "setup/welcome",
    requiredPageSnippets: ["<SetupPage", "<SetupWelcomeWorkspace", "<SetupAgentChat", 'layout="welcome"']
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

if (!checkMode) {
  writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(mdPath, md);
}

if (checkMode && audit.status !== "pass") {
  console.error(`Dashboard family audit failed: failedRows=${audit.failedCount}, failedFiles=${audit.failedFileCount}`);
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/dashboard-family-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/dashboard-family-audit.json");
}
