# Library Readiness Audit

Date: 2026-06-25

Objective under review: transform `taliya-product-ui` into a reusable library for `taliya-internal` and the future Taliya CRM, with Internal consuming official shell, filters, table, drawer, and standardized visual/behavioral components.

This audit is a readiness evidence map. It is not a source-image 1:1 certification and does not replace visual parity review for approved image targets.

Goal-level completion status is tracked in `specs/001-product-ui-foundation/goal-completion-audit.md`.

## Status Summary

| Area | Status | Evidence |
| --- | --- | --- |
| Package structure | Proven for current scope | `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` package manifests expose public JS/types/CSS entrypoints. |
| Package boundaries | Proven for current scope | `corepack pnpm package-boundaries:audit` passes; package dependency direction and forbidden source imports are checked by script. |
| Standard page kit public API | Proven for current scope | `corepack pnpm public-api:audit` passes from `contracts/standard-page-kit.manifest.json`; 52/52 standard kit items have export, isolated story, and README coverage. |
| Internal consumer compliance | Proven for current scope | `corepack pnpm consumer:audit` passes against `C:\Users\lucas\taliya-internal`, including dependency declarations pinned to the configured `vendor/taliya-product-ui` tarballs, installed `node_modules/@taliya/*` JS/type/CSS entrypoints, installed contract markers for the current drawer-size API/CSS, compact checklist drawer tokens, checklist drawer header/rhythm CSS, and runtime import of `@taliya/crm` `standardPageKitManifest` with 52/52 entries. |
| Internal vendor package sync | Proven for current scope | `corepack pnpm consumer-package-sync:audit` passes; consumer vendor tarballs match local `dist-packages` by SHA-256. |
| Internal vendor package versioning | Proven for current scope | `corepack pnpm consumer-vendor-versioning:audit` passes; consumer vendor tarballs exist, match local `dist-packages`, and are tracked by `C:\Users\lucas\taliya-internal`. |
| Internal page-kit coverage | Proven for current scope | `corepack pnpm consumer-page-kit:audit` passes using `C:\Users\lucas\taliya-internal\taliya-page-kit.config.json`; shell, cockpit, landing, leads, route loading, and route error surfaces import and render official page-kit components in JSX. Component contracts also prove shell, cockpit, landing, leads list, leads kanban, drawer, and row wrappers render their official library roots inside the wrappers themselves. Route-local components are also tied to passing component contracts, with 8/8 current route-local requirements covered. |
| Internal route page coverage | Proven for current scope | `consumer-page-kit-audit.md/json` reports `routeCoverage` enabled for `app/internal`, root exists, discovers `/internal`, `/internal/landing`, `/internal/leads`, `/internal/leads/kanban`, and has `Uncovered routes: None`. |
| Internal runtime scripts | Proven for current scope | `corepack pnpm consumer-runtime:audit` passes `typecheck`, `lint`, `test`, and `build` against `C:\Users\lucas\taliya-internal`. |
| Internal consumer config versioning | Proven for current scope | `consumer-config-versioning-audit.md/json` shows `taliya-readiness.config.json` and `taliya-page-kit.config.json` exist, parse as JSON, and are tracked by `C:\Users\lucas\taliya-internal`. |
| Internal consumes package CSS in order | Proven | `consumer-integration-audit.json` shows tokens -> ui -> crm CSS imports in `app/layout.tsx`. |
| Internal avoids local active UI CSS/classes | Proven for active app/components/features | `consumer:audit` shows 0 active `className=` hooks and 0 extra active CSS files beyond `app/globals.css`. |
| Internal root visual tokens | Proven | `consumer:audit` shows tokenized root reset and no legacy local visual variables. |
| Local package refresh flow | Proven | `corepack pnpm pack:local` generates `taliya-tokens`, `taliya-ui`, and `taliya-crm` tarballs in `dist-packages`. |
| Local package artifact integrity | Proven | `corepack pnpm package-artifacts:audit` passes; tarballs contain expected package metadata, README, JS, type, CSS entrypoints, publishable package metadata, CSS side-effect metadata, React peer dependency metadata, no packed `workspace:*` dependency ranges, concrete packed local Taliya dependency versions, restricted package `files` metadata, no forbidden story/test/spec/tmp/app-doc tarball files, and required README usage snippets. |
| Aggregate readiness gate | Proven for current scope | `corepack pnpm readiness:audit` passes and writes `library-readiness-gate.md/json`. |
| Technical release candidate gate | Available | `corepack pnpm release-candidate:audit` runs typecheck, lint, test, build, readiness, and goal evidence checks and writes `release-candidate-audit.md/json`. |
| Future CRM config examples | Proven for current template scope | `readiness:audit` schema-validates both consumer config examples and confirms all package components referenced by `consumer-page-kit-config.example.json` are present in `public-api-audit.json`. |
| Future CRM starter templates | Proven for current template scope | `corepack pnpm consumer-starter-templates:audit` checks that `contracts/consumer-starter-files` contains the package component roots required by `consumer-page-kit-config.example.json`, and that starter route-local shell/workspace wrappers declare explicit `componentContractId` links. |
| Future CRM config bootstrap | Proven for template scope | `readiness:audit` validates `contracts/consumer-starter-files`, then runs `scripts/bootstrap-consumer-configs.mjs --starter-files` in dry-run mode against `../future-crm-app`, proving the templates can materialize consumer-owned configs and the minimal official page-kit starter files without writing files. |
| Future consumer bootstrap fixture | Proven for template scope | `corepack pnpm consumer-bootstrap:audit` writes the official configs and page-kit starter files to `tmp/consumer-bootstrap-fixture`, stages configs in a temporary git repo, and passes both `consumer-config-versioning:audit` and `consumer-page-kit:audit` against that fixture. The starter routes render `CrmShellClient`, which is contract-linked to the official `CrmProductShell` and `Toolbar`. |
| Installed future consumer fixture | Proven for synthetic consumer scope | `corepack pnpm future-consumer-fixture:audit` creates `tmp/future-consumer-readiness-fixture`, copies local tarballs into `vendor`, installs them with npm, runs bootstrap with `--starter-files`, verifies the generated shell/work-list/route starter roots, enriches the work-list for SSR smoke assertions, resolves public JS/CSS exports with `import.meta.resolve`, server-renders official shell/filter/table/drawer components, and passes consumer integration, package sync, page-kit, config versioning, and runtime audits. |
| Future CRM adoption handoff | Proven for process scope | `specs/001-product-ui-foundation/future-crm-adoption-handoff.md` defines candidate discovery criteria, bootstrap sequence, labeled readiness evidence, and the non-completion rule; `corepack pnpm future-crm-adoption-handoff:audit` checks the handoff and links from consumer docs. |
| Real future CRM consumer discovery | Not found locally | `corepack pnpm future-consumer-discovery:audit` scans local sibling directories and currently reports `futureCrmCandidateCount=0`; `future-consumer-discovery:audit:negative-probe` rejects missing scan roots, `future-consumer-discovery:audit:partial-probe` rejects CRM-looking directories without the full consumer contract, and `future-consumer-discovery:audit:positive-probe` accepts a CRM directory with the full consumer contract. No real future CRM app is available for adoption gates yet. |
| Real future CRM adoption evidence | Not executed locally | `future-consumer-adoption:audit` currently passes with 0/0 adopted candidates because discovery finds no real future CRM app; `future-consumer-adoption:audit:positive-probe` accepts a discovered candidate with matching labeled readiness evidence, `future-consumer-adoption:audit:mismatch-probe` rejects stale/copied evidence for a different consumer root, and `future-consumer-adoption:audit:negative-probe` rejects candidates without matching evidence. |
| Token governance | Proven for current touched state | `corepack pnpm tokens:audit` passes; `token-governance-audit.md` reports 0 CSS literal visual debt and no high-priority alias rows. |
| Component/story architecture | Proven for current scope | `corepack pnpm components:audit` passes; 269 stories have valid namespaces after removing the duplicate `Remaining Pages` group, and CRM primitive reuse reports 30 justified compound roots, 0 refactor rows, and 0 missing-primitive rows. |
| Internal runtime behavior | Proven for current leads/kanban/cockpit/landing scope | Latest Internal gates recorded in ledgers: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`, and `npx playwright test tests/e2e/leads.spec.ts --project=chromium` passed. |
| Source-image 1:1 certification | Accepted for current 99% visual scope | `corepack pnpm visual-certification-backlog:audit` passes and reports 89 approved component/image rows, 0 semi-approved image rows, 0 image rows in visual review, 1 ignored image row, and 0 incomplete component/image certification rows. |

## Requirement Matrix

| Requirement | Evidence | Result |
| --- | --- | --- |
| Reusable library packages exist for tokens, primitives, and CRM compositions | `packages/tokens`, `packages/ui`, `packages/crm`; package manifests, README files, and `package-boundaries:audit` | Proven |
| Future consumers use public entrypoints only | `consumer-integration-contract.md`; `consumer:audit` checks installed package entrypoints, installed contract markers, runtime `standardPageKitManifest`, and active consumer code for forbidden direct Radix/lucide imports plus forbidden `@taliya/*` package subpath imports | Proven for `taliya-internal`; future apps must run same gate with `--consumer` |
| Future consumers can prove local package sync | `consumer-package-sync:audit` compares local package tarball hashes against the consumer vendor directory | Proven for `taliya-internal`; reusable for future apps with `--consumer`/`--vendor` |
| Internal uses official shell | `consumer-page-kit:audit` proves current routes render `InternalShell` and `InternalShellClient` renders `CrmProductShell`, `Toolbar`, and `Chip` inside its own body | Proven for current Internal shell routes |
| Internal uses official filters | `consumer-page-kit:audit` proves leads imports/renders `PageFilterBar`/`PageQuickFilters`, landing imports/renders `PageFilterBar`, and component contracts keep those roots inside the active workspace wrappers; `consumer:audit` prevents active local CSS/classes | Proven for current Internal scope |
| Internal uses official table components | `consumer-page-kit:audit` proves leads imports/renders `LeadTable`, `LeadListTable` renders `LeadTable` inside its own body, and landing workspace renders `DataTable`; previous overflow e2e passed | Proven for current Internal scope |
| Internal uses official kanban components | `consumer-page-kit:audit` proves leads imports/renders `KanbanBoard`, and `LeadKanban` renders `KanbanBoard`, `KanbanColumn`, and `KanbanCard` inside its own body | Proven for current Internal scope |
| Internal uses official drawer | `consumer-page-kit:audit` proves leads, landing, and cockpit import/render `CrmRecordDrawer`, with `LandingDrawer`, `CockpitDrawer`, and `LeadsWorkspace` covered by component contracts; Internal e2e drawer flows passed | Proven for current Internal scope |
| All current Internal routes are in the official adoption map | `consumer-page-kit:audit` route coverage discovers all current `app/internal/**/page.tsx` routes and reports `Uncovered routes: None` | Proven for current Internal scope |
| Internal runtime works after package adoption | `consumer-runtime-audit.md` records `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` passing | Proven for current Internal scope |
| Consumer-owned configs are versioned | `consumer-config-versioning:audit` checks that `taliya-readiness.config.json` and `taliya-page-kit.config.json` exist, parse as JSON, and are tracked by the consumer git repo | Proven for current Internal scope |
| Standard visual/behavioral components are discoverable for future CRM | `standard-page-kit.manifest.json` plus `public-api-audit.md` map 52 kit items to package, export, story, README | Proven for current standard page kit |
| Consumer-local visual drift is guarded | `consumer:audit` checks CSS import order, active CSS files, active `className=`, legacy visual variables, forbidden implementation imports, and forbidden `@taliya/*` subpath imports; `consumer-page-kit:audit` reads a consumer-owned page-kit config | Proven for current Internal; reusable for future CRM via `--consumer` and `--page-kit-config` |
| Local package update is repeatable | `pack:local` script, `package-artifacts:audit`, and docs | Proven |
| Documentation tells consumers how to install and validate | `README.md`, package READMEs, `consumer-integration-contract.md`, `consumer-adoption-playbook.md`, `public-api-audit.md`, `consumer-integration-audit.md` | Proven |

## Current Gates

Run in the latest readiness pass:

```text
corepack pnpm readiness:audit
corepack pnpm release-candidate:audit
corepack pnpm public-api:audit
corepack pnpm package-boundaries:audit
corepack pnpm consumer:audit
corepack pnpm consumer-package-sync:audit
corepack pnpm consumer-vendor-versioning:audit
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-runtime:audit
corepack pnpm consumer-config-versioning:audit
corepack pnpm consumer-starter-templates:audit
corepack pnpm consumer-bootstrap:audit
corepack pnpm package-artifacts:audit
corepack pnpm tokens:audit
corepack pnpm components:audit
```

Local package refresh and consumer validation procedure:

```text
specs/001-product-ui-foundation/local-readiness-runbook.md
```

Future CRM config bootstrap:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
corepack pnpm consumer-starter-templates:audit
corepack pnpm consumer-bootstrap:audit
corepack pnpm future-consumer-fixture:audit
corepack pnpm future-consumer-discovery:audit
corepack pnpm visual-certification-backlog:audit
```

The current Internal consumer also owns a readiness config:

```text
C:\Users\lucas\taliya-internal\taliya-readiness.config.json
```

For a future consumer, the same aggregate gate can be scoped with consumer arguments:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --report-label future-crm
```

The first form reads `<future-crm-app>/taliya-readiness.config.json` when present. The config examples are `specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json` and `specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json`; the aggregate readiness gate schema-validates both. The standard reusable kit inventory is `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`.

Previously recorded in ledgers after Internal package reinstall and root cleanup:

```text
npm run typecheck
npm run lint
npm run test
npm run build
npx playwright test tests/e2e/leads.spec.ts --project=chromium
```

## Remaining Non-Completion Caveats

- This audit proves reusable-library integration readiness for the current Internal scope; it does not certify every approved CRM image as pixel-perfect.
- `visual-certification-backlog-audit.md` currently records 0 component/image certification rows that still block the current 99% visual scope; future visual work should continue only when product rejects/reopens a baseline or a shared component regresses.
- Internal consumer configs are tracked and pass `consumer-config-versioning:audit`; future consumers must keep the same ownership model before transferable adoption acceptance.
- `future-consumer-discovery-audit.md` currently finds no real future CRM app in local sibling directories; future CRM apps must add consumer-owned `taliya-page-kit.config.json` and `taliya-readiness.config.json`, then run `node scripts/audit-library-readiness.mjs --check --consumer <path>` after installation/adoption.
- `future-crm-adoption-handoff.md` is the required entry checklist before treating a future CRM app as adoption evidence for the global goal.
- If the standard page kit changes, update `standard-page-kit.manifest.json`, `consumer-integration-contract.md`, package READMEs, stories, and `public-api:audit` together.
- If package ownership or dependency direction changes, update `package-boundaries.md` and `package-boundaries:audit` together.
- `components:audit` allows documented compound-root native controls only when their anatomy contract is justified; any future `Refatorar` or `Primitive faltante` row fails the gate.
