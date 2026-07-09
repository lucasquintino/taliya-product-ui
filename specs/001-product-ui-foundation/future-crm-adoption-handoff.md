# Future CRM Adoption Handoff

This handoff is the single entry point for connecting a real future Taliya CRM app to `taliya-product-ui`.

It does not replace:

- `specs/001-product-ui-foundation/contracts/consumer-integration-contract.md`
- `specs/001-product-ui-foundation/consumer-adoption-playbook.md`
- `specs/001-product-ui-foundation/local-readiness-runbook.md`

It exists so the future CRM adoption path is explicit, auditable, and not dependent on conversation memory.

## Current Scope Vs Global Goal

Current Internal/library readiness is accepted for the `taliya-internal` scope when `library-acceptance:audit` reports `pass-current-internal-library`.

That acceptance does not mean the global goal is complete. The global goal still requires a real future CRM consumer to be created or connected locally and to pass the same adoption gates with labeled evidence.

The synthetic future-consumer fixture proves installability and the bootstrap process. It is not a substitute for real future CRM adoption.

## Candidate Discovery Criteria

A real future CRM app becomes a candidate when `future-consumer-discovery:audit` sees a local sibling directory that is not `taliya-product-ui`, not `taliya-internal`, and not a landing project, with enough evidence to be considered a CRM consumer:

- `package.json`
- `taliya-readiness.config.json`
- `taliya-page-kit.config.json`
- `app/crm` or `src/app/crm`
- `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` dependencies
- a directory or package name that identifies the app as Taliya or CRM related

The readiness and page-kit configs must be owned by that future CRM app. Paths inside those versioned configs are consumer-relative; `vendor`, `pageKitConfig`, page-kit `file` fields, and `routeCoverage.root` must not be absolute and must not use `..` to point at `taliya-product-ui`, `taliya-internal`, or another app.

Discovery must be regenerated before adoption evidence is evaluated:

```text
corepack pnpm future-consumer-discovery:audit
corepack pnpm future-consumer-discovery:audit:negative-probe
corepack pnpm future-consumer-discovery:audit:partial-probe
corepack pnpm future-consumer-discovery:audit:positive-probe
```

The negative probe is mandatory because a missing scan root must fail, not silently report zero candidates.

The partial-candidate probe is mandatory because a directory with only a CRM-like name or partial config must not count as real future CRM adoption scope until it has the full consumer contract.

The positive probe is mandatory because tightening discovery must not overcorrect: a directory with the full consumer contract must be accepted as a real future CRM candidate.

## Bootstrap Sequence

For a new future CRM app, start from consumer-owned config and starter files:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
```

The generated files must be reviewed and versioned in the future CRM repository:

```text
<future-crm-app>/taliya-readiness.config.json
<future-crm-app>/taliya-page-kit.config.json
<future-crm-app>/components/crm-shell-client.tsx
<future-crm-app>/features/crm/work-list/work-list-page.tsx
<future-crm-app>/features/crm/kanban/kanban-page.tsx
<future-crm-app>/app/crm/page.tsx
<future-crm-app>/app/crm/kanban/page.tsx
```

The starter files must render official roots from the library, including `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `CrmRecordDrawer`, `KanbanBoard`, `KanbanColumn`, and `KanbanCard`.

## Adoption Evidence Required

After the future CRM app installs current `@taliya/*` packages or local tarballs, run labeled readiness from `taliya-product-ui`:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --report-label future-crm
```

If the future CRM app has not yet committed a readiness config, pass the values explicitly:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --commands typecheck,lint,test,build --report-label future-crm
```

Then regenerate adoption evidence:

```text
corepack pnpm future-consumer-discovery:audit
corepack pnpm future-consumer-adoption:audit
corepack pnpm future-consumer-adoption:audit:positive-probe
corepack pnpm future-consumer-adoption:audit:mismatch-probe
corepack pnpm future-consumer-adoption:audit:negative-probe
corepack pnpm consumer-page-kit:audit:uncovered-route-probe
corepack pnpm consumer-page-kit:audit:path-traversal-probe
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
corepack pnpm goal-completion:audit:update
corepack pnpm goal-completion:audit
corepack pnpm library-acceptance:audit:update
corepack pnpm library-acceptance:audit
```

For a discovered candidate, `future-consumer-adoption:audit` requires a matching `library-readiness-gate-<label>.json` where:

- `status` is `pass`
- `consumerRoot` matches the discovered candidate path
- `reportLabel` matches the candidate readiness label

The positive adoption probe is mandatory because the audit must accept matching labeled readiness evidence. The mismatch adoption probe is mandatory because the audit must reject stale or copied readiness evidence whose `consumerRoot` does not match the discovered candidate. The negative adoption probe is mandatory because the audit must reject candidates without readiness evidence.

The uncovered-route page-kit probe is mandatory because a future CRM route discovered under `routeCoverage.root` must not exist without a matching route contract that renders official shell/workspace roots.

The full image/page coverage probes are mandatory before claiming Storybook source-image coverage for a new CRM page:

```text
corepack pnpm full-image-page-coverage:audit
corepack pnpm full-image-page-coverage:audit:missing-story-probe
corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe
corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe
corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe
corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe
```

They prove that every product page/source image marked `Covered` in `image-coverage-map.md` has a static Storybook image-coverage story, remains indexed, and keeps using public `@taliya/crm` or `@taliya/ui` package imports instead of local package source paths.

## Non-Completion Rule

Do not call the global library goal complete while any of these are true:

- no real future CRM candidate has been discovered;
- a discovered future CRM candidate lacks matching labeled readiness evidence;
- the future CRM app reimplements shell, filters, quick filters, table, drawer, kanban, cards, panels, or visual states locally;
- consumer-owned configs are missing, invalid, or not versioned;
- installed `node_modules/@taliya/*` files do not match the current package artifacts;
- source-image 1:1 parity is required by the chosen acceptance scope and remains incomplete.

The correct status in that case is: current Internal/library readiness accepted, future CRM adoption process proven, real future CRM adoption not executed.
