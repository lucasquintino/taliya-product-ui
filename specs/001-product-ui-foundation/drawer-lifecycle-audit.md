# Drawer Lifecycle Audit

Date: 2026-08-09

Status: pass

This audit protects selected-object drawer lifecycle across official worklist, kanban, and dashboard stories. Every listed page must mount its drawer conditionally, close and unmount it through the official drawer callback, and reopen it from its primary row, card, event, ticket, or action selection.

It also rejects public placement, side, inline, compact-width and wide-width variants. Every mounted drawer must use the official fixed-right, full-height, medium-width geometry and full-width mobile behavior.

It does **not** certify 1:1 visual approval or replace browser interaction tests.

## Summary

- Checked page rows: 33
- Failed page rows: 0
- Canonical geometry: pass
- Missing canonical markers: None
- Forbidden variant markers: None

| Page | Family | Status | Missing snippets |
| --- | --- | --- | --- |
| TasksShell | worklist/tasks | pass | None |
| ChecklistsShell | worklist/checklists | pass | None |
| ApprovalsShell | worklist/approvals | pass | None |
| StudentsShell | worklist/students | pass | None |
| ReplacementsShell | worklist/replacements | pass | None |
| TodayShell | dashboard/today | pass | None |
| OperationShell | kanban/operation | pass | None |
| SalesInterestedListPage | worklist/sales | pass | None |
| SalesExperimentalListPage | worklist/sales | pass | None |
| SalesEnrollmentChecklistPage | worklist/sales | pass | None |
| RetentionRiskListPage | worklist/retention | pass | None |
| RetentionCancellationQueuePage | worklist/retention | pass | None |
| RetentionReactivationListPage | worklist/retention | pass | None |
| RetentionComplaintQueuePage | worklist/retention | pass | None |
| AgendaCalendarPage | dashboard/agenda | pass | None |
| AgendaClassesPage | worklist/agenda | pass | None |
| AgendaGradePage | worklist/agenda | pass | None |
| FinanceBillingDrawerPage | dashboard/finance | pass | None |
| FinanceMovementsPage | worklist/finance | pass | None |
| SupportCentralPage | dashboard/support | pass | None |
| InternalOverviewPage | dashboard/internal | pass | None |
| InternalTenantsListDetailPage | worklist/internal | pass | None |
| MoneyOnTheTablePage | dashboard/reports | pass | None |
| UsageOverviewPage | right-panel/usage | pass | None |
| UsageLedgerPage | right-panel/usage | pass | None |
| BillingSubscriptionPage | right-panel/billing | pass | None |
| BillingInvoicesPage | right-panel/billing | pass | None |
| BillingAddOnsPage | right-panel/billing | pass | None |
| AgentPresenceRoutinePage | right-panel/agents | pass | None |
| AgentAbsenceFlowPage | right-panel/agents | pass | None |
| AgentAbsenceFlowTestPage | right-panel/agents | pass | None |
| AgentPublishRoutinePage | right-panel/agents | pass | None |
| AgentExecutionReceiptPage | right-panel/agents | pass | None |
