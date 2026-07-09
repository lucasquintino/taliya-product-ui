# Consumer Starter Templates Audit

Generated: 2026-07-09T19:43:32.709Z

Status: pass

This audit checks that the official future CRM starter templates match `consumer-page-kit-config.example.json`. If the example config requires an official package component or a starter-local route component in a starter file, the corresponding template must contain that render root.

Config: `specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json`

Starter root: `specs/001-product-ui-foundation/contracts/consumer-starter-files`

## Route Local Component Contracts

| Route | Local component | componentContractId | Expected component | Linked component | Status |
| --- | --- | --- | --- | --- | --- |
| `/crm` | `CrmShellClient` from `../../components/crm-shell-client` | `crm-shell-wrapper` | `CrmShellClient` | `CrmShellClient` | pass |
| `/crm` | `WorkListPage` from `../../features/crm/work-list/work-list-page` | `crm-work-list-wrapper` | `WorkListPage` | `WorkListPage` | pass |
| `/crm/kanban` | `CrmShellClient` from `../../../components/crm-shell-client` | `crm-shell-wrapper` | `CrmShellClient` | `CrmShellClient` | pass |
| `/crm/kanban` | `KanbanPage` from `../../../features/crm/kanban/kanban-page` | `crm-kanban-wrapper` | `KanbanPage` | `KanbanPage` | pass |

## Template Rows

| File | Exists | Required roots from config | Missing roots | Status |
| --- | --- | --- | --- | --- |
| `components/crm-shell-client.tsx` | yes | `@taliya/crm:CrmProductShell`, `@taliya/ui:Toolbar` | None | pass |
| `features/crm/work-list/work-list-page.tsx` | yes | `@taliya/crm:WorkListDetailPage`, `@taliya/crm:PageFilterBar`, `@taliya/crm:PageQuickFilters`, `@taliya/ui:DataTable`, `@taliya/crm:CrmRecordDrawer` | None | pass |
| `features/crm/kanban/kanban-page.tsx` | yes | `@taliya/crm:PageQuickFilters`, `@taliya/crm:KanbanBoard`, `@taliya/crm:KanbanColumn`, `@taliya/crm:KanbanCard` | None | pass |
| `app/crm/page.tsx` | yes | `local:CrmShellClient from ../../components/crm-shell-client`, `local:WorkListPage from ../../features/crm/work-list/work-list-page` | None | pass |
| `app/crm/kanban/page.tsx` | yes | `local:CrmShellClient from ../../../components/crm-shell-client`, `local:KanbanPage from ../../../features/crm/kanban/kanban-page` | None | pass |
