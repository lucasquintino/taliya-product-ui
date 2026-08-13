# Future Consumer Fixture Audit

Generated: 2026-08-09T02:45:36.189Z

Status: pass

This audit creates an installed synthetic future CRM consumer from local package tarballs and proves the consumer-facing audits can pass against that app shape. It is not real future CRM adoption.

Fixture: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-product-ui-impl/tmp/future-consumer-readiness-fixture-98192`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/pack-local-packages.mjs --output-dir tmp/future-consumer-package-artifacts-98192` | pass | 0 | 19519 |
| `git init` | pass | 0 | 35 |
| `npm install --ignore-scripts --no-audit --no-fund --force --fetch-timeout=60000` | pass | 0 | 2738 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/bootstrap-consumer-configs.mjs --consumer tmp/future-consumer-readiness-fixture-98192 --write --starter-files --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 78 |
| `verify bootstrap generated installed future CRM starter files` | pass | 0 | 0 |
| `enrich installed future CRM page-kit smoke fixture files` | pass | 0 | 0 |
| `npm run typecheck` | pass | 0 | 426 |
| `git add taliya-readiness.config.json taliya-page-kit.config.json` | pass | 0 | 19 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-integration.mjs --check --consumer tmp/future-consumer-readiness-fixture-98192 --vendor vendor/taliya-product-ui --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 412 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-package-sync.mjs --check --consumer tmp/future-consumer-readiness-fixture-98192 --vendor vendor/taliya-product-ui --source tmp/future-consumer-package-artifacts-98192 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 70 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-page-kit.mjs --check --consumer tmp/future-consumer-readiness-fixture-98192 --page-kit-config /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-product-ui-impl/tmp/future-consumer-readiness-fixture-98192/taliya-page-kit.config.json --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 59 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-config-versioning.mjs --check --consumer tmp/future-consumer-readiness-fixture-98192 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 143 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-runtime.mjs --check --consumer tmp/future-consumer-readiness-fixture-98192 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-98192` | pass | 0 | 1953 |

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
- Smoke rendered length: 30219
- Smoke manifest count: 52
- Smoke subpath manifest matches root export: yes
- Smoke resolved exports: `@taliya/tokens`, `@taliya/tokens/tokens.css`, `@taliya/ui`, `@taliya/ui/styles.css`, `@taliya/crm`, `@taliya/crm/standard-page-kit`, `@taliya/crm/styles.css`

## Bootstrap Starter Files

| File | Required fragments | Missing fragments | Status |
| --- | --- | --- | --- |
| `components/crm-shell-client.tsx` | `CrmProductShell`, `Toolbar` | None | pass |
| `features/crm/work-list/work-list-page.tsx` | `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `CrmRecordDrawer` | None | pass |
| `features/crm/kanban/kanban-page.tsx` | `PageQuickFilters`, `KanbanBoard`, `KanbanColumn`, `KanbanCard` | None | pass |
| `app/crm/page.tsx` | `CrmRecordDrawer`, `CrmShellClient`, `drawer=`, `../../components/crm-shell-client`, `WorkListPage`, `../../features/crm/work-list/work-list-page` | None | pass |
| `app/crm/kanban/page.tsx` | `CrmShellClient`, `../../../components/crm-shell-client`, `KanbanPage`, `../../../features/crm/kanban/kanban-page` | None | pass |
