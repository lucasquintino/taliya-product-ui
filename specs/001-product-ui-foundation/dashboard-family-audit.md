# Dashboard / Right Panel / Setup Family Audit

Date: 2026-07-17

Status: fail

This audit protects the official Dashboard, Right Panel, and Setup page families used by the CRM image coverage stories. It checks for `CrmDashboardPage`, `CrmRightPanelPage`, `SetupPage`, `SetupContentGrid`, and page-specific domain slots, and rejects stale direct shell/grid assembly.

It does **not** certify 1:1 visual approval.

## Summary

- Checked page rows: 41
- Failed page rows: 2
- Checked source files: 11
- Failed source files: 0

## Page Rows

| Page | Source file | Family | Status | Missing snippets |
| --- | --- | --- | --- | --- |
| TodayShell | apps/docs/src/stories/ImageCoverageToday.stories.tsx | dashboard/today | pass | None |
| ReportsManagementPage | apps/docs/src/stories/ImageCoverageReports.stories.tsx | dashboard/reports | pass | None |
| MoneyOnTheTablePage | apps/docs/src/stories/ImageCoverageReports.stories.tsx | dashboard/reports | pass | None |
| SupportCentralPage | apps/docs/src/stories/ImageCoverageSupport.stories.tsx | dashboard/support | pass | None |
| AgentsCatalogPage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | dashboard/agents | pass | None |
| AgentAgendaRoutinesPage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | dashboard/agents | pass | None |
| SettingsHubPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | dashboard/settings | pass | None |
| FinanceBillingDrawerPage | apps/docs/src/stories/ImageCoverageFinance.stories.tsx | dashboard/finance | fail | FinanceBillingDrawerPage: drawer={drawerOpen ? <PaymentDrawer<br>FinanceBillingDrawerPage: onOpenCase={() => setDrawerOpen(true)} |
| AgendaCalendarPage | apps/docs/src/stories/ImageCoverageAgenda.stories.tsx | dashboard/calendar | fail | AgendaCalendarPage: before={<AgendaFilters />}<br>AgendaCalendarPage: <AgendaSidePanel /><br>AgendaCalendarPage: <WeeklyCalendar compact<br>AgendaCalendarPage: drawer={drawerOpen ? <AgendaSelectedClassDrawer<br>AgendaCalendarPage: onClose={() => setDrawerOpen(false)}<br>AgendaCalendarPage: onEventSelect={() => setDrawerOpen(true)} |
| AgendaClassDetailPage | apps/docs/src/stories/ImageCoverageAgenda.stories.tsx | right-panel/detail | pass | None |
| StudentProfilePage | apps/docs/src/stories/ImageCoverageStudents.stories.tsx | right-panel/profile | pass | None |
| BillingSubscriptionPage | apps/docs/src/stories/ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| BillingInvoicesPage | apps/docs/src/stories/ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| BillingAddOnsPage | apps/docs/src/stories/ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| UsageOverviewPage | apps/docs/src/stories/ImageCoverageUsage.stories.tsx | right-panel/usage | pass | None |
| UsageLedgerPage | apps/docs/src/stories/ImageCoverageUsage.stories.tsx | right-panel/usage | pass | None |
| AgentPresenceRoutinePage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentAbsenceFlowPage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentAbsenceFlowTestPage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentPublishRoutinePage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentExecutionReceiptPage | apps/docs/src/stories/ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| SettingsPermissionsPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsStudioPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsTeamPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsChannelsPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsPlansPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsPaymentsPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsAgendaPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsNotificationsPage | apps/docs/src/stories/ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SetupShellGlobalPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupWorkspaceConfigPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupStudioPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupTeamPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupChannelsPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupPlansPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupPaymentPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupStudentsImportPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupClassesPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupAgendaPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupReviewPage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupWelcomePage | apps/docs/src/stories/ImageCoverageSetup.stories.tsx | setup/welcome | pass | None |

## File-Level Forbidden Markers

| Source file | Status | Forbidden snippets |
| --- | --- | --- |
| apps/docs/src/stories/ImageCoverageToday.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageReports.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageSupport.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageAgents.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageSettings.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageFinance.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageAgenda.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageStudents.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageBilling.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageUsage.stories.tsx | pass | None |
| apps/docs/src/stories/ImageCoverageSetup.stories.tsx | pass | None |
