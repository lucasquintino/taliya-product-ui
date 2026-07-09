# Future Consumer Fixture Audit

Generated: 2026-07-09T19:44:22.489Z

Status: fail

This audit creates an installed synthetic future CRM consumer from local package tarballs and proves the consumer-facing audits can pass against that app shape. It is not real future CRM adoption.

Fixture: `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-115032`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
| `git init` | pass | 0 | 86 |
| `C:\WINDOWS\system32\cmd.exe /d /s /c npm install --ignore-scripts --no-audit --no-fund --force --fetch-timeout=60000` | pass | 0 | 9970 |
| `C:\Program Files\nodejs\node.exe scripts/bootstrap-consumer-configs.mjs --consumer tmp\future-consumer-readiness-fixture-115032 --write --starter-files --report-label future-consumer-fixture` | pass | 0 | 102 |
| `verify bootstrap generated installed future CRM starter files` | pass | 0 | 0 |
| `enrich installed future CRM page-kit smoke fixture files` | pass | 0 | 0 |
| `C:\WINDOWS\system32\cmd.exe /d /s /c npm run typecheck` | pass | 0 | 1246 |
| `git add taliya-readiness.config.json taliya-page-kit.config.json` | pass | 0 | 102 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-integration.mjs --check --consumer tmp\future-consumer-readiness-fixture-115032 --vendor vendor/taliya-product-ui --report-label future-consumer-fixture` | pass | 0 | 489 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-package-sync.mjs --check --consumer tmp\future-consumer-readiness-fixture-115032 --vendor vendor/taliya-product-ui --report-label future-consumer-fixture` | fail | 1 | 120 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-page-kit.mjs --check --consumer tmp\future-consumer-readiness-fixture-115032 --page-kit-config C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-115032\taliya-page-kit.config.json --report-label future-consumer-fixture` | pass | 0 | 101 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-config-versioning.mjs --check --consumer tmp\future-consumer-readiness-fixture-115032 --report-label future-consumer-fixture` | pass | 0 | 558 |
| `C:\Program Files\nodejs\node.exe scripts/audit-consumer-runtime.mjs --check --consumer tmp\future-consumer-readiness-fixture-115032 --report-label future-consumer-fixture` | pass | 0 | 4617 |

## Assertions

- Report label: `future-consumer-fixture`
- Route coverage root: `app/crm`
- Bootstrap starter files generated: yes
- Bootstrap starter files pass: yes
- Package JSON exists: yes
- Installed `@taliya/crm`: yes
- Installed runtime manifest exact parity: yes
- Installed runtime manifest count: 52/52
- Installed runtime manifest missing rows: none
- Installed runtime manifest extra rows: none
- Installed runtime manifest order/field drift: no
- Smoke rendered length: 32488
- Smoke manifest count: 52
- Smoke subpath manifest matches root export: yes
- Smoke resolved exports: `@taliya/tokens`, `@taliya/tokens/tokens.css`, `@taliya/ui`, `@taliya/ui/styles.css`, `@taliya/crm`, `@taliya/crm/standard-page-kit`, `@taliya/crm/styles.css`

## Bootstrap Starter Files

| File | Required fragments | Missing fragments | Status |
| --- | --- | --- | --- |
| `components/crm-shell-client.tsx` | `CrmProductShell`, `Toolbar` | None | pass |
| `features/crm/work-list/work-list-page.tsx` | `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `CrmRecordDrawer` | None | pass |
| `features/crm/kanban/kanban-page.tsx` | `PageQuickFilters`, `KanbanBoard`, `KanbanColumn`, `KanbanCard` | None | pass |
| `app/crm/page.tsx` | `CrmShellClient`, `../../components/crm-shell-client`, `WorkListPage`, `../../features/crm/work-list/work-list-page` | None | pass |
| `app/crm/kanban/page.tsx` | `CrmShellClient`, `../../../components/crm-shell-client`, `KanbanPage`, `../../../features/crm/kanban/kanban-page` | None | pass |
