# Contract: Consumer Integration

This contract defines how `taliya-internal` and the future Taliya CRM consume `taliya-product-ui` as a reusable product UI library.

The consumer app owns routes, data loading, permissions, persistence, and callbacks. The library owns visual anatomy, component behavior, layout primitives, shell structure, filters, tables, drawers, state surfaces, and CRM product patterns.

For the step-by-step implementation workflow, use `specs/001-product-ui-foundation/consumer-adoption-playbook.md`.

For the exact future CRM handoff and global-goal non-completion rule, use `specs/001-product-ui-foundation/future-crm-adoption-handoff.md`.

The official reusable page-kit component list lives in `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`. `public-api:audit` reads this manifest and verifies every listed component is exported, story-covered, and documented.

## Required Packages

Consumer apps must install all three packages together:

```text
@taliya/tokens
@taliya/ui
@taliya/crm
```

For local package adoption, the dependency declarations must point to the configured consumer vendor tarballs, for example:

```json
{
  "@taliya/tokens": "file:vendor/taliya-product-ui/taliya-tokens-0.0.0.tgz",
  "@taliya/ui": "file:vendor/taliya-product-ui/taliya-ui-0.0.0.tgz",
  "@taliya/crm": "file:vendor/taliya-product-ui/taliya-crm-0.0.0.tgz"
}
```

The authoritative local tarball list is the consumer vendor manifest:

```text
vendor/taliya-product-ui/taliya-product-ui-local-manifest.json
```

`consumer:audit` checks dependency sources against that manifest and the configured vendor path so a consumer cannot silently validate against a registry package, workspace link, stale alternate tarball, or tarball name that drifted from the official local release manifest.

The packages must be consumed through their public entrypoints only:

```ts
import { Button, Panel, Stack } from "@taliya/ui";
import { CrmProductShell, PageFilterBar } from "@taliya/crm";
```

Consumer scaffolding, page-kit discovery, and adoption automation may also import the installed standard page-kit manifest from the official CRM subpath:

```ts
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

Do not import package internals, source files, Storybook files, Radix primitives, lucide icons, or implementation-only helpers from consumer code.

The only allowed package subpath imports are the official CSS entrypoints and the official CRM page-kit manifest subpath:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

All component and helper imports must come from the package root, such as `@taliya/ui` or `@taliya/crm`; imports like `@taliya/ui/src/...`, `@taliya/crm/dist/...`, or ad hoc package subpaths are consumer contract failures.

## Required CSS Order

Consumer apps must import package CSS once at the app root, in this order:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
```

No consumer stylesheet may redefine official component anatomy such as control height, surface color, border, radius, shadow, hover, selected, focus, table row, drawer, shell, or filter behavior.

## Local Tarball Flow

During local development, build and pack package changes from `taliya-product-ui`:

```text
corepack pnpm --filter @taliya/tokens build
corepack pnpm --filter @taliya/ui build
corepack pnpm --filter @taliya/crm build
corepack pnpm pack:local
corepack pnpm package-artifacts:audit
```

Then reinstall in the consumer:

```text
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
```

After reinstalling, confirm the expected public API or CSS is present in `node_modules/@taliya/*` before debugging consumer behavior.

Also confirm the consumer lockfile points at the same manifest-derived local package set:

```text
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
```

Run the consumer contract audit from `taliya-product-ui`:

```text
corepack pnpm consumer:audit
```

This gate checks dependency declarations and expected vendor tarball sources, installed `node_modules/@taliya/*` package entrypoints, required installed package contract markers, runtime import of `@taliya/crm` `standardPageKitManifest`, runtime import of `@taliya/crm/standard-page-kit`, CSS import order, tokenized root styles, forbidden implementation imports, forbidden unapproved `@taliya/*` package subpath imports, active local `className=` hooks, and extra active consumer CSS files.

Installed package contract markers are small API/CSS sentinels for recently standardized reusable behavior. The current marker set proves that a consumer is not validating against stale tarballs that lack `CrmProductShell drawerSize="default" | "compact"`, `CrmProductShell pageHeaderRhythm="default" | "spacious" | "compact-stacked" | "dashboard" | "stacked" | "overview"` including compact-stacked/stacked/overview header-action and compact searchless-filter tokens/CSS, `CrmProductShell contentLayout="default" | "main-priority" | "kanban"`, product-shell page background and shell panel/control shadow tokens, product-shell top-navigation rhythm/surface tokens, shell `SegmentedControl` density/surface CSS, base `Icon` sizing CSS/runtime behavior for standalone SVG icons, `drawerPlacement="content"` full-width topbar behavior, replacement floating-drawer rhythm tokens/CSS, ActivityFeed source-density tokens, `WorkListDetailPage layoutMode="main-priority"`, compact checklist drawer tokens, checklist drawer header/rhythm CSS, main-priority work-list tokens/CSS, and compact drawer shell CSS. When a future reusable contract becomes critical for consumers, add a marker to `scripts/audit-consumer-integration.mjs` instead of relying on manual `node_modules` inspection.

Run the consumer page-kit audit to confirm current Internal surfaces use the official shell, filter, table, drawer, grid, panel, and state components:

```text
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-page-kit:audit:shell-only-route-probe
corepack pnpm consumer-page-kit:audit:wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe
corepack pnpm consumer-page-kit:audit:default-identifier-route-probe
corepack pnpm consumer-page-kit:audit:uncovered-route-probe
corepack pnpm consumer-page-kit:audit:path-traversal-probe
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
```

The shell-only route probe creates an isolated consumer where a route renders `InternalShell` without its required workspace wrapper. It must fail, proving the page-kit contract protects complete route composition instead of accepting empty shell pages.

The wrapper-contract probe creates an isolated consumer where official kanban roots are imported and rendered only in an unused helper while the contracted `LeadKanban` wrapper renders a local clone. It must fail, proving `componentContracts` protect wrapper-level adoption instead of accepting file-level JSX.

The route-wrapper-contract probe creates an isolated consumer where a route renders a local `WorkListPage` workspace but the page-kit config omits a matching `componentContracts` entry. It must fail, proving routed workspaces cannot skip wrapper-level official-root contracts.

The default-identifier route probe creates an isolated consumer where a route uses `const Page = () => ...; export default Page`. It must pass when the named default component renders the required shell/workspace, proving consumers do not need to use only `export default function` to satisfy the route contract.

The uncovered-route probe creates an isolated consumer with a discovered route under `routeCoverage.root` that is missing from `routes`. It must fail, proving every real Internal or CRM route is explicitly covered by the page-kit contract before the app can claim official library adoption.

The path-traversal probe creates an isolated consumer whose page-kit config points `file` and `routeCoverage.root` outside the consumer root. It must fail, proving consumer-owned configs cannot validate adoption by reading files from another app or from an absolute path.

The readiness-config path-traversal probe creates an isolated consumer whose `taliya-readiness.config.json` points `vendor` and `pageKitConfig` outside the consumer root. It must fail, proving the aggregate readiness gate cannot validate a consumer with versioned config paths that escape that app.

Run the consumer runtime audit to confirm the installed package set still passes the app's standard scripts:

```text
corepack pnpm consumer-runtime:audit
```

Run the consumer package sync audit to confirm local tarballs copied into the consumer vendor directory match `dist-packages` and installed `node_modules/@taliya/*` public files match the current package outputs:

```text
corepack pnpm consumer-package-sync:audit
corepack pnpm consumer-package-sync:audit:negative-probe
```

Run the consumer config versioning audit before treating adoption as transferable to another machine or CI:

```text
corepack pnpm consumer-config-versioning:audit
```

This gate checks that the consumer-owned `taliya-readiness.config.json` and `taliya-page-kit.config.json` files exist, parse as JSON, and are tracked by the consumer git repository. While preparing those files, use `corepack pnpm consumer-config-versioning:audit:update` to refresh the report without failing the current readiness flow.

Run the public API audit to confirm the standard page kit is exported, story-covered, and documented:

```text
corepack pnpm public-api:audit
```

Run the package boundary audit to confirm the standalone library dependency direction remains valid:

```text
corepack pnpm package-boundaries:audit
```

Run the package artifacts audit to confirm local tarballs contain installable JS, type, README, and CSS entrypoints, that the distributed package metadata is publishable rather than `private: true`, that CSS entrypoints are protected by package `sideEffects` metadata, that React is kept as a peer dependency for React packages, that packed metadata does not leak `workspace:*` dependency ranges, that packed local Taliya dependencies resolve to concrete package versions, that package `files` metadata stays restricted to `dist` plus the official CSS entrypoint, that tarballs do not ship stories/tests/specs/tmp/app-doc files, and that package READMEs include the minimum consumer-facing CSS/peer/page-kit usage contract:

```text
corepack pnpm package-artifacts:audit
```

Run the aggregate readiness gate when validating the current library and Internal consumer together:

```text
corepack pnpm readiness:audit
```

Run the page/image coverage audit when adding or changing image-coverage stories:

```text
corepack pnpm full-image-page-coverage:audit
corepack pnpm full-image-page-coverage:audit:missing-story-probe
corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe
corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe
corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe
corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe
```

Every product page/source image marked `Covered` in `image-coverage-map.md` must have a matching static Storybook story under `CRM / Image Coverage`, and that story must import public `@taliya/crm` or `@taliya/ui` components. Stories must not reach into `packages/*`, package source paths, or consumer-local clones.

Current readiness evidence is summarized in:

```text
specs/001-product-ui-foundation/library-readiness-audit.md
specs/001-product-ui-foundation/library-readiness-gate.md
```

Use the local readiness runbook for the package refresh, Internal validation, and future CRM labeled evidence sequence:

```text
specs/001-product-ui-foundation/local-readiness-runbook.md
```

For a different consumer path:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --report-label future-crm
```

Prefer the aggregate readiness command first. Use the individual consumer audits below only as diagnostics when the aggregate gate reports a focused failure.

For a new CRM consumer that has not created its first official page-kit route yet, bootstrap the consumer-owned configs and starter files from the official templates:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
```

The starter templates live at `specs/001-product-ui-foundation/contracts/consumer-starter-files`. They are intentionally small and must stay aligned with `consumer-page-kit-config.example.json`: if the example config requires `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `CrmRecordDrawer`, or another official root in a starter file, the matching template must import/render that root. `readiness:audit`, `corepack pnpm consumer-starter-templates:audit`, `corepack pnpm consumer-starter-templates:audit:route-contract-probe`, `consumer-bootstrap:audit`, and `future-consumer-fixture:audit` verify this path.

Starter route files must also render the local page wrapper declared by the page-kit config. The default `/crm` route imports and renders `WorkListPage`, and the default `/crm/kanban` route imports and renders `KanbanPage`; those wrappers then render the official filter, quick-filter, table, drawer, kanban board, column, and card roots. A route that renders only `CrmProductShell` without its page wrapper is not a valid starter route.

When auditing more than one consumer, add `--report-label <consumer-name>` so reports do not overwrite the default Internal evidence:

```text
node scripts/audit-consumer-integration.mjs --check --consumer ../future-crm-app --report-label future-crm
node scripts/audit-consumer-package-sync.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --report-label future-crm
node scripts/audit-consumer-page-kit.mjs --check --consumer ../future-crm-app --page-kit-config ../future-crm-app/taliya-page-kit.config.json --report-label future-crm
node scripts/audit-consumer-runtime.mjs --check --consumer ../future-crm-app --report-label future-crm
node scripts/audit-consumer-config-versioning.mjs --check --consumer ../future-crm-app --report-label future-crm
```

This writes labeled aggregate and consumer reports beside the default Internal reports. For example, `--report-label future-crm` writes `library-readiness-gate-future-crm.*` plus labeled consumer reports. Non-default consumers skip the default Internal goal-completion synthesis and record a `custom-consumer-scope` row instead.

`consumer-page-kit:audit` uses the current `taliya-internal` page map by default. Future CRM consumers must provide a `taliya-page-kit.config.json` at the consumer root, or pass `--page-kit-config <path>` as an absolute path or a path relative to `taliya-product-ui`, so the audit verifies that app's real routes and surfaces instead of the Internal-specific files. The config format is versioned by example in `specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json`.

The aggregate readiness gate also reads optional consumer-owned `taliya-readiness.config.json` from the consumer root. Values inside that config are consumer-relative; CLI flags override config fields. The example lives at `specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json`.

`taliya-internal` is the first real configured consumer and keeps its readiness config at `C:\Users\lucas\taliya-internal\taliya-readiness.config.json`.

Readiness config schema:

- root object;
- `reportLabel` optional non-empty string used for labeled aggregate and consumer reports;
- `vendor` optional consumer-relative path to local Taliya tarballs;
- `pageKitConfig` optional consumer-relative path to `taliya-page-kit.config.json`;
- `commands` optional comma-separated string or array of runtime script names.

`vendor` and `pageKitConfig` values inside `taliya-readiness.config.json` must be consumer-relative paths. Absolute paths and `..` traversal are schema failures. CLI flags may still point to explicit files for diagnostics because they are outside the versioned consumer config contract.

Page-kit config schema:

- root object must contain `surfaces` and `routes` arrays;
- optional `componentContracts` array can require a consumer-local wrapper component to render official package components inside that wrapper's own implementation, not merely somewhere in the same file;
- optional `routeCoverage` object can require every discovered route under a Next app folder to be listed;
- `routeCoverage.root` is a consumer-relative route folder such as `app/internal` or `app/crm`;
- `routeCoverage.baseRoute` is the public route prefix represented by that folder, such as `/internal` or `/crm`;
- when `routeCoverage` is present, the root folder must exist and discover at least one `page.tsx`/`page.ts`/`page.jsx`/`page.js`; otherwise the audit fails;
- each surface needs `id`, `file`, and at least one official package component in `required`;
- each `required` item needs `name` and `package`;
- `forbiddenFragments` is optional, but when present every entry must be a non-empty string;
- `forbiddenTextPatterns` is optional, but when present every entry must be a valid non-empty JavaScript regular expression used to block visible placeholder/corruption text in official consumer surfaces;
- each route needs `route`, `file`, and at least one item in `required` or `requiredLocalComponents`;
- route `required` items use `name` and `package`;
- route `requiredLocalComponents` items use `name` and `importFrom`, plus optional `componentContractId` when the matching component contract uses a different component name or file. If the contract component name intentionally differs from the routed local component name, set `componentContractComponent` to the component proved by the contract.
- each `componentContracts` item needs `id`, `file`, `component`, and at least one official package component in `required`.

All page-kit `file` fields and `routeCoverage.root` must be consumer-relative paths. Absolute paths and `..` traversal are schema failures; import aliases in `requiredLocalComponents.importFrom` remain import specifiers and are not treated as filesystem paths.

The audit validates this schema before checking imports, JSX usage, forbidden local clone fragments, or forbidden text patterns. Schema failures are hard failures in `--check` mode.

Use `componentContracts` for wrapper functions such as a consumer-local `LeadListTable`, `LeadKanban`, `WorkListPage`, or route workspace: the wrapper may adapt consumer data and callbacks, but its render root must remain the official `LeadTable`, `KanbanBoard`, `KanbanColumn`, `KanbanCard`, `WorkListDetailPage`, or equivalent page-kit component. This prevents a page from passing just because the official component appears elsewhere in the file while the active wrapper has drifted into a local clone. Every local component listed in a route's `requiredLocalComponents` must have a passing component contract by matching `componentContractId` or component name, and the linked contract must prove the same component unless `componentContractComponent` explicitly declares an adapter target.

The starter-template route-contract probe must reject three cases: missing `componentContractId`, dangling `componentContractId`, and `componentContractId` linked to a contract for a different local component.

## Standard Internal/CRM Page Kit

New product pages should start from these official components:

| Need | Official component |
| --- | --- |
| Product shell, sidebar, topbar, page header, optional browser chrome | `CrmProductShell` |
| Page-level search, overview filters without search, visible filters, advanced filters modal/popover, actions | `PageFilterBar` |
| Quick filter rail/list | `PageQuickFilters` |
| Standard list/detail page composition | `ListDetailLayout`, `WorkListDetailPage` |
| Dense page metrics and page grids | `DashboardGrid`, `MetricCard` |
| Vertical rhythm and small content stacks | `Stack` |
| Action/status bars | `Toolbar`, `ButtonGroup`, `InlineGroup` |
| Panels | `Panel`, `PanelHeader`, `PanelBody` |
| Form grids | `FieldGrid` |
| Compact detail grids | `ContentGrid` |
| Route loading/error/empty shell states | `StatePage`, `LoadingState`, `ErrorState`, `EmptyState` |
| Generic data table | `DataTable`, `TablePagination` |
| Domain tables | `LeadTable`, `TaskTable`, `ChecklistTable`, `ApprovalTable`, `StudentTable` |
| Kanban | `KanbanBoard`, `KanbanColumn`, `KanbanCard` |
| Record drawer | `CrmRecordDrawer` plus domain drawers where available |
| Operational row/list items | `CrmOperationalRow`, `List`, `ListItem`, `KeyValueRow` |

If a page cannot be built from this kit, add or extend a package component first. Do not add a page-local duplicate of a filter bar, quick filter rail, table, drawer, shell, kanban, panel, or state surface.

## Allowed Consumer CSS

Consumer CSS is allowed for:

- app root resets that are not component-specific;
- route-only placement around official components;
- non-visual integration hooks when a component does not yet expose a better semantic marker;
- temporary page composition while a source-backed package contract is being defined.

Consumer CSS is not allowed for:

- official component surface colors, borders, shadows, radii, spacing, type, hover, focus, selected, disabled, active, scrollbars, or state styling;
- local table, filter, drawer, shell, panel, button, input, select, chip, quick filter, kanban, or state-page clones;
- CSS selectors used only as testing hooks when an accessible role/name or official `data-component` marker exists.

## Behavior Rules

Components receive prepared data and callbacks by props. They do not fetch, mutate, authorize, bill, authenticate, or run agents.

Consumer apps may sort/filter data before passing it into official components, or they may use official component callbacks such as row open, selection, sort, pagination, filter change, drawer action, and tab change.

Use accessible roles/names in tests when possible. Use official `data-component` markers only for reusable component QA and structural smoke checks.

## Verification Gates

After changing the library for a consumer, run these package gates:

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
corepack pnpm tokens:audit
corepack pnpm components:audit
corepack pnpm consumer:audit
corepack pnpm consumer-package-sync:audit
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-runtime:audit
corepack pnpm consumer-config-versioning:audit
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
corepack pnpm public-api:audit
corepack pnpm package-boundaries:audit
corepack pnpm package-artifacts:audit
corepack pnpm storybook:build
```

After reinstalling tarballs in the consumer, run the consumer gates:

```text
npm run typecheck
npm run lint
npm run test
npm run build
```

For `taliya-internal`, also run:

```text
npx playwright test tests/e2e/leads.spec.ts --project=chromium
```

If a page has a source image target, these gates are not enough for approval. Final approval still requires source-backed Storybook static capture and component-level pass/fail review per the visual parity contract.
