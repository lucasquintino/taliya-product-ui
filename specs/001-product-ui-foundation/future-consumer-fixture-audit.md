# Future Consumer Fixture Audit

Generated: 2026-07-16T12:49:15.484Z

Status: pass

This audit creates an installed synthetic future CRM consumer from local package tarballs and proves the consumer-facing audits can pass against that app shape. It is not real future CRM adoption.

Fixture: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-product-ui-impl/tmp/future-consumer-readiness-fixture-5677`

## Steps

| Command | Status | Exit code | Duration ms |
| --- | --- | ---: | ---: |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/pack-local-packages.mjs --output-dir tmp/future-consumer-package-artifacts-5677` | pass | 0 | 25118 |
| `git init` | pass | 0 | 43 |
| `npm install --ignore-scripts --no-audit --no-fund --force --fetch-timeout=60000` | pass | 0 | 6422 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/bootstrap-consumer-configs.mjs --consumer tmp/future-consumer-readiness-fixture-5677 --write --starter-files --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 209 |
| `verify bootstrap generated installed future CRM starter files` | pass | 0 | 0 |
| `enrich installed future CRM page-kit smoke fixture files` | pass | 0 | 0 |
| `npm run typecheck` | pass | 0 | 1069 |
| `git add taliya-readiness.config.json taliya-page-kit.config.json` | pass | 0 | 48 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-integration.mjs --check --consumer tmp/future-consumer-readiness-fixture-5677 --vendor vendor/taliya-product-ui --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 741 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-package-sync.mjs --check --consumer tmp/future-consumer-readiness-fixture-5677 --vendor vendor/taliya-product-ui --source tmp/future-consumer-package-artifacts-5677 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 117 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-page-kit.mjs --check --consumer tmp/future-consumer-readiness-fixture-5677 --page-kit-config /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-product-ui-impl/tmp/future-consumer-readiness-fixture-5677/taliya-page-kit.config.json --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 114 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-config-versioning.mjs --check --consumer tmp/future-consumer-readiness-fixture-5677 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 201 |
| `/Users/lucasquintino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/audit-consumer-runtime.mjs --check --consumer tmp/future-consumer-readiness-fixture-5677 --report-label future-consumer-fixture --out-dir tmp/future-consumer-readiness-reports-5677` | pass | 0 | 3281 |

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
- Smoke rendered length: 33361
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
