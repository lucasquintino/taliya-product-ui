# Domain Wrapper Audit

Generated: 2026-07-09T19:43:31.230Z

Status: pass

This audit protects the official library architecture rule that domain wrappers may remain only when they add domain-specific mapping or anatomy instead of staying empty pass-through wrappers. Rows also preserve global roots such as `CrmWorklistTable`, `DataTable`, `CrmDrawer`, and documented official drawer/panel roots. Direct `<aside>` drawer contracts fail this audit instead of being accepted as future hidden debt.

Legacy direct drawer contracts: 0

It is not source-image 1:1 certification.

## Contract Rows

| Wrapper | Kind | Status | Domain value | Missing snippets |
| --- | --- | --- | --- | --- |
| `InvoiceTable` | table | pass | maps invoice rows into the official DataTable with billing-specific status, amount, due-date and sort behavior | - |
| `UsageLedgerTable` | table | pass | maps usage ledger rows into the official DataTable with usage-specific type, quota, status and sorting behavior | - |
| `TaskTable` | table | pass | maps task rows into the official CrmWorklistTable with task-specific labels, chips, selected-row and disabled-row behavior | - |
| `LeadTable` | table | pass | maps sales lead rows into the official DataTable with lead identity cells, quality/next-action tones and lead sorting | - |
| `ChecklistTable` | table | pass | maps checklist rows into the official DataTable with progress cells, status tone and checklist sorting | - |
| `ApprovalTable` | table | pass | maps approval rows into the official DataTable with requester cells, type icon, risk label and status tone | - |
| `StudentTable` | table | pass | maps student rows into the official DataTable with person cells, status/finance labels and risk tone | - |
| `ReplacementTable` | table | pass | maps replacement rows into the official DataTable with student cells, status/mode labels and replacement sorting | - |
| `OperationActivityTable` | table | pass | renders the operation activity list with operation-specific actor/action/object/status row anatomy and source/empty/loading/blocked states | - |
| `FieldMappingTable` | table | pass | maps imported fields to Taliya fields with select controls, validation state labels and row actions | - |
| `TaskDrawer` | drawer | pass | wraps the official CrmDrawer with task-specific facts, checklist rows, comments, activity and footer actions | - |
| `ApprovalDrawer` | drawer | pass | keeps the certified approval drawer wrapper around ApprovalPanel with open=false lifecycle and complementary landmark semantics | - |
| `CaseDrawer` | drawer | pass | wraps the official CrmDrawer with case-specific facts, history and case footer actions | - |
| `PaymentDrawer` | drawer | pass | wraps the official CrmDrawer with payment-specific summary, history, copilot context and finance actions | - |
| `ReplacementDrawer` | drawer | pass | wraps the official CrmDrawer with replacement options, scheduling notes and replacement actions | - |
| `LeadDrawer` | drawer | pass | wraps the official CrmDrawer with lead-specific checklist, timeline, sales facts and footer actions | - |
| `ChecklistDrawer` | drawer | pass | wraps the official CrmDrawer with checklist progress, step toggles, activity and footer actions | - |
| `StudentDrawer` | drawer | pass | wraps the official CrmDrawer with student facts, classes, finance, presence and pending-action sections | - |
| `ClassDrawer` | drawer | pass | wraps the official CrmDrawer with roster status controls, attendance summary and class footer actions | - |
| `AgentFlowDrawer` | drawer | pass | wraps the official CrmDrawer with suggested agent questions, chat composer and agent help actions | - |
| `UsageDrawer` | drawer | pass | wraps the official CrmDrawer with contextual usage-support copy, suggested questions and support composer | - |
| `SupportTicketDrawer` | drawer | pass | wraps the support ticket panel with ticket drawer lifecycle, state normalization and complementary landmark semantics | - |
| `TenantSecurityDrawer` | drawer | pass | wraps the tenant security panel with tenant-specific state normalization, close handling and disabled behavior | - |
| `CrmRecordDrawer` | drawer | pass | composes the official Drawer primitive into a generic CRM record drawer with facts, sections, tabs and actions | - |

## Other Exported Domain Wrappers

These wrappers are intentionally left for future focused contracts or existing domain-drawer coverage. New table/drawer wrappers must be added to this audit instead of staying unmanaged.

| Wrapper | Status |
| --- | --- |
| None | - |
