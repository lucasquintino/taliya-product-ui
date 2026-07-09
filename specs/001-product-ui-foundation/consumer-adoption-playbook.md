# Consumer Adoption Playbook

This playbook explains how `taliya-internal` and the future Taliya CRM should adopt `taliya-product-ui` without recreating local UI patterns.

It is an implementation workflow, not a visual parity certificate. Source-image targets still require the visual parity contract, static Storybook captures, and component-level review.

For the exact future CRM handoff and non-completion rules, use `specs/001-product-ui-foundation/future-crm-adoption-handoff.md`.

## Adoption Order

1. Start from the official page kit.
2. Compose the page from package components.
3. Pass prepared data and callbacks through props.
4. Add or extend a package component when a reusable visual pattern is missing.
5. Pack, reinstall, and verify the consumer.

The official page-kit manifest is `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`. Use it as the component inventory before creating a consumer-local wrapper or adding a new reusable component. `public-api:audit` validates that every manifest entry is exported, story-covered, and documented.

Consumers that need runtime discovery, scaffolding, or adoption tooling must read the installed package manifest from the public subpath:

```ts
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

Regular app pages can still import page components from `@taliya/crm`; the subpath exists so consumer automation does not need to reach into Spec Kit files, source files, or package internals.

## Standard Page Skeleton

Every product page should use this ownership model:

| Page region | Owner | Preferred components |
| --- | --- | --- |
| App shell, sidebar, topbar, nav | `@taliya/crm` | `CrmProductShell` |
| Page search and filters | `@taliya/crm` | `PageFilterBar`, `PageQuickFilters` |
| Dense metrics and grids | `@taliya/crm` | `DashboardGrid`, `MetricCard` |
| Panels and content rhythm | `@taliya/ui` | `Panel`, `PanelHeader`, `PanelBody`, `Stack`, `Toolbar`, `InlineGroup` |
| Tables | `@taliya/ui` / `@taliya/crm` | `DataTable`, `TablePagination`, domain tables |
| Kanban | `@taliya/crm` | `KanbanBoard`, `KanbanColumn`, `KanbanCard` |
| Drawers | `@taliya/crm` | `CrmRecordDrawer`, domain drawers |
| Loading, error, empty states | `@taliya/ui` | `StatePage`, `LoadingState`, `ErrorState`, `EmptyState` |

## New Page Workflow

1. Define the page purpose and route in the consumer app.
2. Choose the official shell/nav configuration.
3. Choose the official page-kit components for filters, quick filters, content, table/kanban, drawer, and states.
4. Adapt backend/view data into the component prop shapes at the consumer boundary.
5. Keep consumer CSS limited to route placement only.
6. Run consumer gates before visual review.
7. If the page has an approved source image, run source-backed visual parity review after functional gates pass.

For a new consumer app, add `taliya-page-kit.config.json` and `taliya-readiness.config.json` at the consumer root before running adoption gates. Use `specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json` and `specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json` as templates.

Paths stored in those config files are consumer-relative. `vendor`, `pageKitConfig`, every page-kit `file`, and `routeCoverage.root` must not be absolute and must not use `..` to leave the consumer root. The guardrail is covered by `corepack pnpm consumer-page-kit:audit:path-traversal-probe` and `corepack pnpm consumer-readiness-config:audit:path-traversal-probe`.

To create those files from the official templates:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
```

Use `--starter-files` for a new consumer that has not yet created its first CRM routes. It writes the minimal official skeleton referenced by the example page-kit config: `components/crm-shell-client.tsx`, `features/crm/work-list/work-list-page.tsx`, `features/crm/kanban/kanban-page.tsx`, `<route-root>/page.tsx`, and `<route-root>/kanban/page.tsx`, using `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `KanbanBoard`, `KanbanColumn`, `KanbanCard`, and `CrmRecordDrawer`.

The starter routes are not shell-only smoke files: `<route-root>/page.tsx` must import/render `WorkListPage`, and `<route-root>/kanban/page.tsx` must import/render `KanbanPage`. The page-kit audit checks these local page wrappers through `requiredLocalComponents`, while `componentContracts` checks that each wrapper renders the official package roots inside its own component body. Each route-local workspace must have a matching component contract by `componentContractId` or component name, and the linked contract must target the same component unless `componentContractComponent` explicitly names an adapter component. `corepack pnpm consumer-starter-templates:audit:route-contract-probe` proves missing, dangling, and cross-linked starter contract links fail.

Those files come from the official versioned templates in `specs/001-product-ui-foundation/contracts/consumer-starter-files`. Update the templates, bootstrap script, and readiness audit together whenever the starter skeleton changes.

Keep the config intentionally small: one shell surface, one row per required page/workflow surface, one route row per routed entry that must render the official shell or page kit, and `componentContracts` only for local wrappers that adapt data before rendering official components. The audit validates the schema first, then verifies imports, JSX usage, forbidden clone fragments, and wrapper-level official render roots.

Use `componentContracts` whenever a consumer-local wrapper has a name like `LeadListTable`, `LeadKanban`, `WorkListPage`, or similar. The wrapper may map data and wire callbacks, but the contract should require the official component roots it must render, such as `WorkListDetailPage`, `LeadTable`, `KanbanBoard`, `KanbanColumn`, `KanbanCard`, `DataTable`, or `CrmRecordDrawer`.

The readiness config points the aggregate gate at the consumer's vendor tarballs, page-kit config, runtime commands, and optional report label. `taliya-internal` already owns this file at `C:\Users\lucas\taliya-internal\taliya-readiness.config.json`; future CRM consumers should use the same model so adoption evidence is comparable.

## When To Extend The Library

Extend `@taliya/ui` when the missing pattern is domain-neutral, such as a layout primitive, control, surface, state, field group, list, or table helper.

Extend `@taliya/crm` when the missing pattern has product meaning, such as CRM shell composition, operational rows, domain tables, domain drawers, kanban cards, setup/billing/usage patterns, or agent product states.

Do not create consumer-local duplicates of:

- shell/sidebar/topbar/nav;
- filter bars or quick filters;
- tables or row shells;
- drawers or drawer sections;
- kanban boards/cards;
- panels, cards, buttons, chips, inputs, selects, modals, or state pages;
- component visual states such as hover, selected, disabled, blocked, focus, border, shadow, radius, or scrollbars.

## Data And Behavior Boundary

Consumers own:

- routes;
- server actions;
- data loading;
- permissions;
- persistence;
- role decisions;
- callbacks;
- sorting/filtering before props when needed.

The library owns:

- visual anatomy;
- interactive component behavior;
- keyboard/focus semantics;
- layout primitives;
- shell structure;
- filter/table/drawer contracts;
- tokenized surfaces and states.

## Local Package Refresh

After changing library packages:

```text
corepack pnpm --filter @taliya/tokens build
corepack pnpm --filter @taliya/ui build
corepack pnpm --filter @taliya/crm build
corepack pnpm pack:local
corepack pnpm package-artifacts:audit
```

Then reinstall in the consumer and run consumer gates.

## Required Library Gates

Run from `taliya-product-ui`:

```text
corepack pnpm readiness:audit
```

The aggregate readiness gate is the primary current-scope check. It validates package boundaries, public API, package artifacts, consumer integration, package sync, page-kit adoption, consumer runtime scripts, consumer config versioning, the local readiness runbook, runtime availability of `standardPageKitManifest` through `@taliya/crm/standard-page-kit`, and the current Internal goal-completion evidence.

For a technical release-candidate pass, run:

```text
corepack pnpm release-candidate:audit
```

Detailed local package refresh and adoption evidence steps live in `specs/001-product-ui-foundation/local-readiness-runbook.md`.

This wraps typecheck, lint, test, build, readiness, and goal evidence checks. It does not replace source-image 1:1 visual certification.

For page/image coverage specifically, run:

```text
corepack pnpm full-image-page-coverage:audit
corepack pnpm full-image-page-coverage:audit:missing-story-probe
corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe
corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe
corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe
corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe
```

This protects the Storybook image-coverage contract: every product page/source image marked `Covered` in `image-coverage-map.md` needs a static Storybook story, that story must remain indexed, and it must keep importing public `@taliya/crm` or `@taliya/ui` package components instead of local package source paths.

For current Internal/library acceptance, run:

```text
corepack pnpm library-acceptance:audit
corepack pnpm library-acceptance:audit:positive-probe
corepack pnpm library-acceptance:audit:negative-probe
```

This is the clearest gate for deciding whether the library is usable as the official reusable UI source for the current `taliya-internal` scope. It intentionally reports global completion separately, because the future CRM app and remaining source-image certification can still be open.
The positive probe proves valid Internal/library evidence is accepted in isolation; the negative probe proves that this acceptance gate rejects false-positive readiness/Internal evidence.

For the fastest current-state readout after the readiness/release/acceptance reports exist, run:

```text
corepack pnpm library-consumption-status:audit
corepack pnpm library-consumption-status:audit:positive-probe
corepack pnpm library-consumption-status:audit:global-complete-probe
corepack pnpm library-consumption-status:audit:stale-release-probe
corepack pnpm library-consumption-status:audit:stale-readiness-probe
corepack pnpm library-consumption-status:audit:negative-probe
```

This writes `specs/001-product-ui-foundation/library-consumption-status.md/json` and summarizes current Internal acceptance, official page-kit consumption, runtime manifest availability, future CRM adoption process status, real future CRM adoption execution, and global-goal status. Use it as the handoff summary for consumers; keep `library-acceptance:audit`, `readiness:audit`, and `release-candidate:audit` as the proving gates.
The positive probe proves coherent handoff evidence is accepted; the global-complete probe proves future complete evidence reports `pass-global-goal`; the stale-release probe proves an old release candidate without consumption gates is rejected; the stale-readiness probe proves an old aggregate readiness report without required gates is rejected; the negative probe proves false-positive Internal consumption evidence is rejected.

For the practical "can we start the real CRM now?" readout, run:

```text
corepack pnpm crm-real-readiness:audit
```

This writes `specs/001-product-ui-foundation/crm-real-readiness-audit.md/json` and checks packages, current Internal, standard page kit, dynamic page/drawer contracts, consumer bootstrap, installed future-consumer fixture, future adoption process, and visual-scope evidence together.

For the highest official-library readout, run:

```text
corepack pnpm official-library-readiness:audit
```

This writes `specs/001-product-ui-foundation/official-library-readiness-audit.md/json` and joins package metadata, technical gates, public API, token/component governance, Internal consumption, CRM real readiness, release-candidate evidence, and manual registry publication items.

For release-policy clarity, run:

```text
corepack pnpm release-policy:audit
corepack pnpm release-policy:audit:negative-probe
```

This writes `specs/001-product-ui-foundation/release-policy-audit.md/json` and validates `specs/001-product-ui-foundation/contracts/release-policy.md`. The expected current state is `pass-current-local-policy`: local vendor tarballs are the official current channel, while real semver, registry/access, controlled publish, and consumer dependency migration remain explicit decisions before registry publication. The negative probe proves incomplete release-policy contracts fail.

For release-channel clarity, run:

```text
corepack pnpm release-channel:audit
```

This writes `specs/001-product-ui-foundation/release-channel-audit.md/json`. It should report `pass-local-release-channel` while consumers install from synchronized vendor tarballs, and only reports registry readiness after semver versioning, registry/access policy, controlled publish workflow, and consumer dependency migration policy are explicit.

The local release channel also exposes a consumer-facing manifest:

```text
dist-packages/taliya-product-ui-local-manifest.json
corepack pnpm local-release-manifest:audit
```

Use it as the artifact index for local installs: it records package name, version, tarball, SHA-256, size, and install order for `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm`.

To sync a consumer vendor directory from the manifest:

```text
corepack pnpm consumer-vendor:sync
corepack pnpm consumer-vendor:sync -- --write
corepack pnpm consumer-vendor:sync:check
corepack pnpm consumer-vendor:sync:stale-manifest-probe
```

To sync the consumer `package.json` dependency declarations from the same manifest:

```text
corepack pnpm consumer-dependencies:sync
corepack pnpm consumer-dependencies:sync -- --write
corepack pnpm consumer-dependencies:sync:check
corepack pnpm consumer-dependencies:sync:stale-manifest-probe
```

To validate and execute the local package reinstall from the consumer vendor directory:

```text
corepack pnpm consumer-packages:install-plan
corepack pnpm consumer-packages:install
corepack pnpm consumer-packages:install:missing-vendor-probe
```

To confirm the consumer lockfile also points at the manifest-derived local packages:

```text
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
```

To validate/apply the complete consumer package refresh workflow in one command:

```text
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
```

The default consumer is `../taliya-internal`. For a future CRM app, pass `-- --consumer ../future-crm-app`.

Use the individual gates below as diagnostics when the aggregate gate reports a failure or when a focused review needs the narrower artifact:

```text
corepack pnpm public-api:audit
corepack pnpm package-boundaries:audit
corepack pnpm package-artifacts:audit
corepack pnpm consumer-page-kit:audit:shell-only-route-probe
corepack pnpm consumer-page-kit:audit:wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe
corepack pnpm consumer-page-kit:audit:default-identifier-route-probe
corepack pnpm consumer-page-kit:audit:uncovered-route-probe
corepack pnpm consumer-page-kit:audit:path-traversal-probe
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
corepack pnpm consumer-bootstrap:audit
corepack pnpm future-consumer-fixture:audit
corepack pnpm future-consumer-discovery:audit
corepack pnpm future-consumer-discovery:audit:negative-probe
corepack pnpm future-consumer-discovery:audit:partial-probe
corepack pnpm future-consumer-discovery:audit:positive-probe
corepack pnpm future-consumer-adoption:audit
corepack pnpm future-consumer-adoption:audit:positive-probe
corepack pnpm future-consumer-adoption:audit:mismatch-probe
corepack pnpm future-consumer-adoption:audit:negative-probe
corepack pnpm future-crm-adoption-handoff:audit
corepack pnpm certification-scope:audit
corepack pnpm certification-scope:audit:positive-probe
corepack pnpm certification-scope:audit:negative-probe
corepack pnpm consumer:audit
corepack pnpm consumer-package-sync:audit
corepack pnpm consumer-package-sync:audit:negative-probe
corepack pnpm consumer-vendor-versioning:audit
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-runtime:audit
corepack pnpm consumer-config-versioning:audit
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
corepack pnpm tokens:audit
corepack pnpm components:audit
corepack pnpm library-consumption-status:audit
corepack pnpm library-consumption-status:audit:positive-probe
corepack pnpm library-consumption-status:audit:global-complete-probe
corepack pnpm library-consumption-status:audit:stale-release-probe
corepack pnpm library-consumption-status:audit:stale-readiness-probe
corepack pnpm library-consumption-status:audit:negative-probe
corepack pnpm crm-real-readiness:audit
corepack pnpm official-library-readiness:audit
corepack pnpm release-channel:audit
corepack pnpm local-release-manifest:audit
corepack pnpm consumer-dependencies:sync:check
corepack pnpm consumer-dependencies:sync:stale-manifest-probe
corepack pnpm consumer-packages:install-plan
corepack pnpm consumer-packages:install:missing-vendor-probe
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
corepack pnpm consumer-vendor:sync:check
corepack pnpm consumer-vendor:sync:stale-manifest-probe
```

For a consumer outside `../taliya-internal`, prefer the aggregate gate with that consumer's readiness config:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
```

If the consumer does not yet have `taliya-readiness.config.json`, pass the same values explicitly:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --commands typecheck,lint,test,build --report-label future-crm
```

Use `reportLabel` in `taliya-readiness.config.json` or `--report-label future-crm` when the evidence should live beside, rather than overwrite, the default `taliya-internal` audit reports. Labeled runs write `library-readiness-gate-<label>.md/json` and matching consumer diagnostic reports.

Run full package typecheck/test/lint/build when the package source changed:

```text
corepack pnpm --filter @taliya/ui typecheck
corepack pnpm --filter @taliya/ui test
corepack pnpm --filter @taliya/ui lint
corepack pnpm --filter @taliya/ui build
corepack pnpm --filter @taliya/crm typecheck
corepack pnpm --filter @taliya/crm test
corepack pnpm --filter @taliya/crm lint
corepack pnpm --filter @taliya/crm build
corepack pnpm --filter @taliya/tokens build
corepack pnpm --filter @taliya/docs typecheck
corepack pnpm --filter @taliya/docs test:smoke
```

## Required Consumer Gates

Run from the consumer app:

```text
npm run typecheck
npm run lint
npm run test
npm run build
```

From `taliya-product-ui`, `corepack pnpm consumer-runtime:audit` runs the same default script set against `../taliya-internal`. For another consumer, use `node scripts/audit-consumer-runtime.mjs --check --consumer ../future-crm-app --report-label future-crm`.

When a consumer has `taliya-readiness.config.json`, prefer `node scripts/audit-library-readiness.mjs --check --consumer <consumer>` first and use `consumer-runtime:audit` only to debug runtime command failures.

For `taliya-internal`, also run:

```text
npx playwright test tests/e2e/leads.spec.ts --project=chromium
```

## Completion Rule

A consumer page is adoption-ready only when:

- it imports and renders official page-kit components;
- the aggregate readiness gate passes for that consumer;
- the future-consumer discovery audit has been regenerated, so goal evidence records whether a real future CRM app is available for adoption gates;
- `future-consumer-discovery:audit:negative-probe` proves a missing scan root cannot be accepted as zero future CRM candidates;
- `future-consumer-discovery:audit:partial-probe` proves partial CRM-looking directories cannot be accepted as real future CRM candidates without the full consumer contract;
- `future-consumer-discovery:audit:positive-probe` proves a CRM directory with the full consumer contract is accepted as a real future CRM candidate;
- when a real future CRM candidate is discovered, `future-consumer-adoption:audit` has matching labeled readiness evidence for that candidate;
- `future-consumer-adoption:audit:positive-probe` proves candidates with matching labeled readiness evidence are accepted;
- `future-consumer-adoption:audit:mismatch-probe` proves stale or copied readiness evidence for a different consumer root is rejected;
- `future-consumer-adoption:audit:negative-probe` proves candidates without matching labeled readiness evidence are rejected;
- `certification-scope:audit` passes; if full-image 1:1 is scoped out, the decision is explicit and validated;
- `certification-scope:audit:positive-probe` proves a valid scoped-completion decision would be accepted without activating the project decision;
- `certification-scope:audit:negative-probe` proves invalid scoped-completion decisions are rejected;
- the generic consumer bootstrap fixture passes through `consumer-bootstrap:audit`, including generated configs, git-staged configs, and a minimal page-kit route that passes `consumer-page-kit:audit`;
- the installed synthetic future-consumer fixture passes through `future-consumer-fixture:audit`;
- `taliya-readiness.config.json` and `taliya-page-kit.config.json` are versioned in that consumer repository;
- `consumer:audit` and `consumer-page-kit:audit` pass for the relevant route/surface using that consumer's `taliya-page-kit.config.json`;
- active consumer code has no local visual clones;
- installed `node_modules/@taliya/*` packages expose JS, type, and CSS entrypoints;
- consumer vendor tarballs are synced with `dist-packages`, installed `node_modules/@taliya/*` public files match the current package outputs, and vendor tarballs are tracked in the consumer repository;
- package artifacts and public API audits pass;
- any source-image target has separate visual parity evidence.
