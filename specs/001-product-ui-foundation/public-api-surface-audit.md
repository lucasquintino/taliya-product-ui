# Public API Surface Audit

Generated: 2026-07-09T19:43:31.528Z

Status: pass

This audit guards the public API vocabulary. It keeps the standard page kit canonical, documents compatibility aliases, and documents CRM domain specializations over UI primitives so consumers do not guess which component to use.

## Standard Page Kit

- Status: canonical
- Components: 52
- Failed exports: None

## Compatibility Aliases

| Alias | Canonical | Status | Reason |
| --- | --- | --- | --- |
| `@taliya/crm:Sidebar` | `@taliya/crm:CrmShellSidebar` | Pass | Legacy short shell name retained for old stories/consumers. New CRM/Internal pages should use CrmProductShell and shell slots, or CrmShellSidebar when a direct shell part is required. |
| `@taliya/crm:Topbar` | `@taliya/crm:CrmShellTopNav` | Pass | Legacy short topbar name retained for compatibility. New page navigation should be provided through CrmProductShell/top-nav props or CrmShellTopNav. |
| `@taliya/crm:GlobalActions` | `@taliya/crm:CrmShellGlobalActions` | Pass | Legacy short action-cluster name retained for compatibility. New shell work should use CrmShellGlobalActions or CrmProductShell global-action props. |
| `@taliya/crm:TaskQueueList` | `@taliya/crm:PageQuickFilters` | Pass | Historical image-23 crop component. New work-list rails must use PageQuickFilters with page-specific items. |
| `@taliya/ui:ActionMenu` | `@taliya/ui:DropdownMenu` | Pass | Semantic alias for action-trigger menus. DropdownMenu owns the primitive implementation. |

## Domain Specializations

| Component | Base primitive | Status | Reason |
| --- | --- | --- | --- |
| `@taliya/crm:PageFilterBar` | `@taliya/ui:FilterBar` | Pass | CRM page composition with default search, filters, actions, density, and overflow behavior. |
| `@taliya/crm:PageQuickFilters` | `@taliya/ui:NavPill` | Pass | CRM quick-filter rail with heading, count grammar, selected state, empty/loading/blocked states, and page rail layout. |
| `@taliya/crm:MetricCard` | `@taliya/ui:MetricTile` | Pass | Product metric surface with CRM copy density and action context. |
| `@taliya/crm:StatusCard` | `@taliya/ui:StatusSummaryCard` | Pass | CRM operational status card composed from product status semantics. |
| `@taliya/crm:TaskTable` | `@taliya/ui:DataTable` | Pass | Task-specific prepared-row table with official task columns, sort affordances, row state, and footer. |
| `@taliya/crm:LeadTable` | `@taliya/ui:DataTable` | Pass | Lead-specific prepared-row table for consumer pages. |
| `@taliya/crm:ChecklistTable` | `@taliya/ui:DataTable` | Pass | Checklist-specific prepared-row table with checklist progress and selected-row grammar. |
| `@taliya/crm:ApprovalTable` | `@taliya/ui:DataTable` | Pass | Approval-specific prepared-row table for human decision queues. |
| `@taliya/crm:StudentTable` | `@taliya/ui:DataTable` | Pass | Student-specific prepared-row table for student list/profile entry points. |
| `@taliya/crm:ReplacementTable` | `@taliya/ui:DataTable` | Pass | Replacement-specific prepared-row table for reposicao workflows. |
| `@taliya/crm:CrmRecordDrawer` | `@taliya/ui:Drawer` | Pass | Generic CRM record drawer wrapper for consumers that need one official drawer anatomy with dynamic sections/actions. |

## Policy Conflicts

- Duplicate alias/specialization keys: None
- Standard kit components marked as aliases: None
- Standard kit components also documented as specializations: @taliya/crm:PageFilterBar, @taliya/crm:PageQuickFilters, @taliya/crm:MetricCard, @taliya/crm:LeadTable, @taliya/crm:TaskTable, @taliya/crm:ChecklistTable, @taliya/crm:ApprovalTable, @taliya/crm:StudentTable, @taliya/crm:ReplacementTable, @taliya/crm:CrmRecordDrawer

A standard-kit specialization overlap is expected when a canonical CRM component is intentionally a domain wrapper around a UI primitive, such as `PageFilterBar` over `FilterBar` or `TaskTable` over `DataTable`.
