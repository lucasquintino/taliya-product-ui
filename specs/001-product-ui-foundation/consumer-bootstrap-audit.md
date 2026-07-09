# Consumer Bootstrap Audit

Generated: 2026-07-07T11:40:46.800Z

Status: pass

This audit proves the future-consumer bootstrap flow can create consumer-owned config files and starter page-kit files from official templates, stage the configs in a git repository, render the standard page-kit requirements in a minimal fixture, and pass the same config-versioning and page-kit audits required by aggregate readiness.

Fixture: `C:\Users\lucas\taliya-product-ui\tmp\consumer-bootstrap-fixture`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
| `git init` | pass | 0 | 87 |
| `C:\Program Files\nodejs\node.exe scripts/bootstrap-consumer-configs.mjs --consumer tmp\consumer-bootstrap-fixture --write --starter-files --report-label bootstrap-fixture` | pass | 0 | 100 |
| `verify generated future CRM page-kit starter files` | pass | 0 | 0 |
| `git add taliya-readiness.config.json taliya-page-kit.config.json` | pass | 0 | 69 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-config-versioning.mjs --check --consumer tmp\consumer-bootstrap-fixture --report-label bootstrap-fixture` | pass | 0 | 534 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-page-kit.mjs --check --consumer tmp\consumer-bootstrap-fixture --page-kit-config C:\Users\lucas\taliya-product-ui\tmp\consumer-bootstrap-fixture\taliya-page-kit.config.json --report-label bootstrap-fixture` | pass | 0 | 93 |

## Generated Configs

- Readiness exists: yes
- Readiness report label: `bootstrap-fixture`
- Page-kit exists: yes
- Page-kit route root: `app/crm`
- Page-kit base route: `/crm`

## Starter Files

| File | Required fragments | Missing fragments | Status |
| --- | --- | --- | --- |
| `components/crm-shell-client.tsx` | `CrmProductShell`, `Toolbar` | None | pass |
| `features/crm/work-list/work-list-page.tsx` | `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `CrmRecordDrawer` | None | pass |
| `features/crm/kanban/kanban-page.tsx` | `PageQuickFilters`, `KanbanBoard`, `KanbanColumn`, `KanbanCard` | None | pass |
| `app/crm/page.tsx` | `CrmShellClient`, `../../components/crm-shell-client`, `WorkListPage`, `../../features/crm/work-list/work-list-page` | None | pass |
| `app/crm/kanban/page.tsx` | `CrmShellClient`, `../../../components/crm-shell-client`, `KanbanPage`, `../../../features/crm/kanban/kanban-page` | None | pass |
