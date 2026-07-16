# Local Readiness Runbook

Date: 2026-07-10

Purpose: repeatably prove current `taliya-product-ui` package readiness and current `taliya-internal` adoption readiness without mixing it with source-image 1:1 certification.

This runbook is operational evidence for local library consumption. Visual parity status is governed by the visual certification audits; the current full active-image map reports 74 incomplete image-certification rows, all with an actionable capture or reference-sheet review plan but none automatically approved.

## Standard Current-Scope Check

Run from `C:\Users\lucas\taliya-product-ui`:

```text
corepack pnpm readiness:audit
```

This runs:

- token governance;
- strict Storybook product-anatomy ownership and its official-override negative probe;
- component/story architecture;
- public page-kit API;
- package boundaries;
- package artifact integrity;
- future consumer starter template contract;
- future consumer config bootstrap fixture;
- installed future consumer readiness fixture;
- future CRM consumer discovery across local sibling directories plus missing-scan-root, partial-candidate, and positive-candidate probes;
- future CRM consumer adoption evidence and negative probe for any discovered candidates;
- future CRM adoption handoff and non-completion rule;
- consumer package declarations and installed entrypoints;
- consumer vendor tarball and installed package-file hash sync;
- consumer page-kit adoption;
- consumer runtime scripts;
- consumer readiness/page-kit config versioning;
- full image/page Storybook coverage and regression probes;
- certification scope decision validation plus valid/invalid decision probes;
- visual certification backlog from Batch 9/11 ledgers;
- visual certification plan plus stale-evidence negative probe;
- goal-completion regression check.

Expected output:

- `specs/001-product-ui-foundation/library-readiness-gate.md`
- `specs/001-product-ui-foundation/library-readiness-gate.json`

The standard page-kit inventory used by `public-api:audit` is:

```text
specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json
```

The installed runtime discovery entrypoint for consumer tooling is:

```ts
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

`future-consumer-fixture:audit`, `consumer:audit`, and `goal-completion:audit` must fail if the installed package cannot resolve that subpath or if the subpath manifest diverges from the root `@taliya/crm` export.

For technical release-candidate acceptance, run:

```text
corepack pnpm release-candidate:audit
```

This runs typecheck, lint, test, build, readiness, future CRM consumer discovery/adoption evidence and negative probes, visual certification planning/probes, current Internal/library acceptance, and goal evidence regeneration/checks, then writes:

- `specs/001-product-ui-foundation/release-candidate-audit.md`
- `specs/001-product-ui-foundation/release-candidate-audit.json`

To answer the narrower product question "is this currently acceptable as the official reusable library for `taliya-internal`?", run:

```text
corepack pnpm library-acceptance:audit
corepack pnpm library-acceptance:audit:positive-probe
corepack pnpm library-acceptance:audit:negative-probe
```

This writes:

- `specs/001-product-ui-foundation/library-acceptance-audit.md`
- `specs/001-product-ui-foundation/library-acceptance-audit.json`

This audit can pass for current Internal/library acceptance while still reporting the larger goal as `not-complete-globally` when real future CRM adoption has not executed or full source-image 1:1 certification remains open.

The positive probe proves valid Internal/library evidence is accepted in isolation. The negative probe proves the audit rejects false-positive Internal/readiness evidence before release-candidate evidence can rely on it.

To generate the compact consumption handoff after the reports above are current, run:

```text
corepack pnpm library-consumption-status:audit
corepack pnpm library-consumption-status:audit:positive-probe
corepack pnpm library-consumption-status:audit:global-complete-probe
corepack pnpm library-consumption-status:audit:stale-release-probe
corepack pnpm library-consumption-status:audit:stale-readiness-probe
corepack pnpm library-consumption-status:audit:negative-probe
```

This writes:

- `specs/001-product-ui-foundation/library-consumption-status.md`
- `specs/001-product-ui-foundation/library-consumption-status.json`

Use this report when the question is "can Internal consume this library now, and what blocks global completion?" It intentionally reads existing evidence instead of replacing the underlying gates.
The positive probe proves a coherent compact handoff is accepted, the global-complete probe proves future complete evidence reports `pass-global-goal`, the stale-release probe proves an old release candidate without consumption gates is rejected, the stale-readiness probe proves an old aggregate readiness report without required gates is rejected, and the negative probe proves false-positive Internal consumption evidence is rejected.

To answer the broader operational question "can we start implementing the real CRM with this library?", run:

```text
corepack pnpm crm-real-readiness:audit
```

This writes:

- `specs/001-product-ui-foundation/crm-real-readiness-audit.md`
- `specs/001-product-ui-foundation/crm-real-readiness-audit.json`

It consolidates package readiness, current Internal adoption, standard page-kit coverage, dynamic page/drawer API contracts, consumer bootstrap, installed future-consumer fixture, future CRM adoption process, and visual-scope evidence.

To answer the highest-level question "is this now the official reusable library consumers should use?", run:

```text
corepack pnpm official-library-readiness:audit
```

This writes:

- `specs/001-product-ui-foundation/official-library-readiness-audit.md`
- `specs/001-product-ui-foundation/official-library-readiness-audit.json`

It consolidates package metadata, package gates, public API, token/component governance, current Internal consumption, CRM real readiness, release-candidate evidence, and registry manual items.

To inspect the release policy separately, run:

```text
corepack pnpm release-policy:audit
corepack pnpm release-policy:audit:negative-probe
```

This writes:

- `specs/001-product-ui-foundation/release-policy-audit.md`
- `specs/001-product-ui-foundation/release-policy-audit.json`

It validates `specs/001-product-ui-foundation/contracts/release-policy.md` and the matching JSON contract. The expected current state is `pass-current-local-policy`: local tarballs are the official channel for Internal and the first CRM app, while registry publication waits for semver, registry/access, controlled publish, and consumer dependency migration decisions.
The negative probe creates an isolated invalid release policy and proves incomplete registry requirements fail the audit.

To inspect the install channel separately, run:

```text
corepack pnpm release-channel:audit
```

This writes:

- `specs/001-product-ui-foundation/release-channel-audit.md`
- `specs/001-product-ui-foundation/release-channel-audit.json`

The expected current state is `pass-local-release-channel`: local package artifacts, synchronized vendor tarballs, tracked consumer configs, and installed package contracts are reliable. Registry readiness remains separate until a real semver version, registry/access model, publish workflow, and dependency migration policy are chosen.

The local release channel also writes a consumer-facing manifest:

```text
dist-packages/taliya-product-ui-local-manifest.json
corepack pnpm local-release-manifest:audit
```

This manifest records package name, version, tarball, SHA-256, size, and install order. Consumers can use it as the artifact index when copying or validating the local `@taliya/*` package set.

To sync the default Internal vendor directory from the manifest:

```text
corepack pnpm consumer-vendor:sync
corepack pnpm consumer-vendor:sync -- --write
corepack pnpm consumer-vendor:sync:check
corepack pnpm consumer-vendor:sync:stale-manifest-probe
```

To sync the consumer `package.json` dependency declarations from that manifest:

```text
corepack pnpm consumer-dependencies:sync
corepack pnpm consumer-dependencies:sync -- --write
corepack pnpm consumer-dependencies:sync:check
corepack pnpm consumer-dependencies:sync:stale-manifest-probe
```

To validate and execute the local package reinstall from the synced vendor directory:

```text
corepack pnpm consumer-packages:install-plan
corepack pnpm consumer-packages:install
corepack pnpm consumer-packages:install:missing-vendor-probe
```

To confirm `package-lock.json` is aligned with the same manifest-derived package set:

```text
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
```

To validate/apply the complete consumer package refresh workflow in one command:

```text
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
```

For a future CRM app, pass `-- --consumer ../future-crm-app` and then run that consumer's labeled readiness gate.

To inspect the remaining visual-certification backlog without claiming approval, run:

```text
corepack pnpm full-image-page-coverage:audit
corepack pnpm full-image-page-coverage:audit:missing-story-probe
corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe
corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe
corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe
corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe
corepack pnpm visual-certification-backlog:audit
corepack pnpm source-assets:reconcile
corepack pnpm source-assets:reconcile:nested-exclusion-probe
corepack pnpm reference-sheet-coverage:audit
corepack pnpm reference-sheet-coverage:audit:missing-story-probe
corepack pnpm visual-certification-plan:audit
corepack pnpm visual-certification-plan:audit:negative-probe
corepack pnpm visual-certification-plan:audit:missing-artifact-probe
corepack pnpm visual-product-review:audit:update
corepack pnpm visual-product-review:audit
corepack pnpm visual-certification-capture:check
corepack pnpm visual-certification-capture:source-contract-probe
corepack pnpm audit-checks:read-only-probe
```

This writes:

- `specs/001-product-ui-foundation/full-image-page-coverage-audit.md`
- `specs/001-product-ui-foundation/full-image-page-coverage-audit.json`
- `specs/001-product-ui-foundation/visual-certification-backlog-audit.md`
- `specs/001-product-ui-foundation/visual-certification-backlog-audit.json`
- `specs/001-product-ui-foundation/reference-sheet-coverage-audit.md`
- `specs/001-product-ui-foundation/reference-sheet-coverage-audit.json`
- `specs/001-product-ui-foundation/visual-certification-plan-audit.md`
- `specs/001-product-ui-foundation/visual-certification-plan-audit.json`
- `specs/001-product-ui-foundation/visual-product-review-audit.md`
- `specs/001-product-ui-foundation/visual-product-review-audit.json`
- `tmp/visual-product-review/index.html`
- `specs/001-product-ui-foundation/image-coverage-map.md` (covered route targets)

The HTML board puts each pending source, current capture, diff, metrics, blocker, and next action side by side. It is review assistance only: generating or checking the board never changes an image verdict or grants automatic approval.

## After Changing Library Code

Run the affected package build/test loop first. For broad shared changes, use:

```text
corepack pnpm --filter @taliya/tokens build
corepack pnpm --filter @taliya/ui typecheck
corepack pnpm --filter @taliya/ui test
corepack pnpm --filter @taliya/ui lint
corepack pnpm --filter @taliya/ui build
corepack pnpm --filter @taliya/crm typecheck
corepack pnpm --filter @taliya/crm test
corepack pnpm --filter @taliya/crm lint
corepack pnpm --filter @taliya/crm build
```

For any story, fixture, component, or visual-token change, also run:

```text
corepack pnpm storybook-anatomy:audit:strict
corepack pnpm storybook-anatomy:audit:override-probe
corepack pnpm tokens:audit
```

The anatomy audit permits only explicitly reported fixture geometry and capture framing in Storybook CSS. Colors, typography, spacing, surface styling, or other appearance/anatomy overrides targeting `.tl-*` or `.tcrm-*` fail the strict gate.

Then pack local artifacts:

```text
corepack pnpm pack:local
corepack pnpm package-artifacts:audit
corepack pnpm consumer-starter-templates:audit
corepack pnpm consumer-starter-templates:audit:route-contract-probe
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
corepack pnpm certification-scope:audit
corepack pnpm certification-scope:audit:positive-probe
corepack pnpm certification-scope:audit:negative-probe
```

Sync and reinstall the tarballs into the consumer. For `taliya-internal`, current local package declarations point at:

```text
C:\Users\lucas\taliya-internal\vendor\taliya-product-ui
```

`taliya-internal` owns the current readiness config at:

```text
C:\Users\lucas\taliya-internal\taliya-readiness.config.json
```

After refresh, run:

```text
corepack pnpm consumer-package-sync:audit
corepack pnpm consumer-package-sync:audit:negative-probe
corepack pnpm consumer-dependencies:sync:check
corepack pnpm consumer-dependencies:sync:stale-manifest-probe
corepack pnpm consumer-packages:install-plan
corepack pnpm consumer-packages:install:missing-vendor-probe
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-vendor-versioning:audit
corepack pnpm consumer:audit
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-page-kit:audit:shell-only-route-probe
corepack pnpm consumer-page-kit:audit:wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe
corepack pnpm consumer-page-kit:audit:default-identifier-route-probe
corepack pnpm consumer-page-kit:audit:uncovered-route-probe
corepack pnpm consumer-page-kit:audit:path-traversal-probe
corepack pnpm consumer-runtime:audit
corepack pnpm consumer-config-versioning:audit
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
corepack pnpm readiness:audit
```

The config versioning audit checks that `taliya-readiness.config.json` and `taliya-page-kit.config.json` exist, parse as JSON, and are tracked by the consumer repository. Use `corepack pnpm consumer-config-versioning:audit:update` to refresh the report while the files are still being prepared.

Versioned consumer configs must keep `vendor`, `pageKitConfig`, page-kit `file` fields, and `routeCoverage.root` relative to the consumer root. Absolute paths and `..` traversal fail schema validation; `corepack pnpm consumer-page-kit:audit:path-traversal-probe` and `corepack pnpm consumer-readiness-config:audit:path-traversal-probe` prove that guardrail.

Every discovered route under `routeCoverage.root` must be listed in the page-kit config `routes` array. `corepack pnpm consumer-page-kit:audit:uncovered-route-probe` proves a new route cannot be added to Internal or the future CRM without a matching official page-kit route contract.

## Future CRM Consumer

Use the handoff as the first checklist:

```text
specs/001-product-ui-foundation/future-crm-adoption-handoff.md
corepack pnpm future-crm-adoption-handoff:audit
```

Create a consumer-owned page-kit config:

```text
<future-crm-app>/taliya-page-kit.config.json
<future-crm-app>/taliya-readiness.config.json
```

To bootstrap those files from the official templates, first run a dry run, then write when the target path is correct:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
```

Use `--starter-files` only for a new consumer that needs the initial route, work-list, and kanban skeleton. The generated files are intentionally small and render the official page kit roots required by the example config: `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `KanbanBoard`, `KanbanColumn`, `KanbanCard`, and `CrmRecordDrawer`.

The route files are part of that contract: the list route must render `WorkListPage`, and the kanban route must render `KanbanPage`. `consumer-starter-templates:audit`, `consumer-bootstrap:audit`, and `future-consumer-fixture:audit` reject starter evidence when those local page wrappers are missing from the route.

The starter files are versioned as official templates here:

```text
specs/001-product-ui-foundation/contracts/consumer-starter-files
```

Their contract against the page-kit example is checked by:

```text
corepack pnpm consumer-starter-templates:audit
corepack pnpm consumer-starter-templates:audit:route-contract-probe
```

The reusable bootstrap fixture is checked by:

```text
corepack pnpm consumer-bootstrap:audit
```

Use these templates:

```text
specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json
specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json
```

The aggregate readiness gate schema-validates both template files and checks that the page-kit example only references components present in the public API audit, so future CRM adoption starts from executable examples instead of stale documentation.

For routed app sections, set `routeCoverage` in `taliya-page-kit.config.json`. The page-kit audit will discover `page.tsx` files under that folder and fail if the folder is missing, discovers no pages, or finds any route missing from `routes`.

Keep every page-kit `file` and `routeCoverage.root` consumer-relative. Do not point a future CRM config at files in `taliya-product-ui`, `taliya-internal`, or another app; that would prove the wrong codebase.

For consumer-local wrappers that adapt app data before rendering official components, add `componentContracts`. The audit checks the wrapper implementation itself, so a wrapper such as `LeadListTable` must render `LeadTable` inside its function body and a wrapper such as `LeadKanban` must render `KanbanBoard`/`KanbanColumn`/`KanbanCard` inside its own body. Every local workspace listed in route `requiredLocalComponents` must have a matching component contract by component name or `componentContractId`; if the routed name and audited component differ, declare the audited component with `componentContractComponent`.

Run `corepack pnpm consumer-page-kit:audit:wrapper-contract-probe` after changing the page-kit audit. The probe proves official roots hidden in an unused helper do not satisfy a wrapper contract.
Run `corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe` after changing route/workspace contract logic. The probe proves routed workspaces cannot skip component contracts.
Run `corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe` after changing route/workspace contract logic. The probe proves routed workspaces cannot point at a passing contract for another component.

Run labeled evidence so future CRM reports do not overwrite Internal reports. If the consumer has `taliya-readiness.config.json`, the aggregate gate can read vendor, page-kit, commands, and report label from that file:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
```

The explicit equivalent is:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --report-label future-crm
node scripts/audit-consumer-integration.mjs --check --consumer ../future-crm-app --report-label future-crm
node scripts/audit-consumer-package-sync.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --report-label future-crm
node scripts/audit-consumer-page-kit.mjs --check --consumer ../future-crm-app --page-kit-config ../future-crm-app/taliya-page-kit.config.json --report-label future-crm
node scripts/audit-consumer-runtime.mjs --check --consumer ../future-crm-app --report-label future-crm
node scripts/audit-consumer-config-versioning.mjs --check --consumer ../future-crm-app --report-label future-crm
```

Expected report names:

- `library-readiness-gate-future-crm.md/json`
- `consumer-integration-audit-future-crm.md/json`
- `consumer-package-sync-audit-future-crm.md/json`
- `consumer-page-kit-audit-future-crm.md/json`
- `consumer-runtime-audit-future-crm.md/json`
- `consumer-config-versioning-audit-future-crm.md/json`

## Interpreting Failures

| Failure | Meaning | Usual next action |
| --- | --- | --- |
| `storybook-anatomy:audit:strict` | Storybook CSS owns image-coverage anatomy or changes the appearance/anatomy of an official `.tl-*`/`.tcrm-*` component | Remove the override, express capture geometry on a Storybook wrapper, or promote genuinely reusable behavior into `@taliya/ui`/`@taliya/crm` |
| `storybook-anatomy:audit:override-probe` | The strict anatomy audit accepted an injected official component appearance override | Fix the selector/property ownership classifier before trusting zero-debt evidence |
| `package-artifacts:audit` | Local tarball is missing package metadata, README, JS, types, CSS, exports, publishable package metadata, CSS side-effect metadata, required React peer dependency metadata, workspace-free packed dependency metadata, concrete packed local Taliya dependency versions, restricted package `files` metadata, clean tarball contents, or required README snippets | Rebuild the affected package, confirm the distributed package is not `private: true`, confirm CSS side effects are declared, confirm React packages use peer dependencies, confirm packed package metadata does not expose `workspace:*`, confirm `files` only publishes `dist` plus the official CSS entrypoint, update the package README, and rerun `pack:local` |
| `consumer-starter-templates:audit` | Official future CRM starter templates are missing or no longer match `consumer-page-kit-config.example.json` required component roots | Fix `contracts/consumer-starter-files` or the page-kit example so the starter route imports/renders the official roots declared by the config |
| `consumer-starter-templates:audit:route-contract-probe` | Starter route-local `componentContractId` links can point at missing wrapper contracts without failing | Restore the probe and ensure `audit-consumer-starter-templates.mjs` rejects dangling route-local contract ids |
| `consumer-bootstrap:audit` | Official consumer config templates cannot be written, staged, versioning-audited, or page-kit-audited in a temporary consumer fixture | Fix the templates, bootstrap script, or minimal page-kit fixture before onboarding another consumer |
| `future-consumer-fixture:audit` | Local tarballs cannot be installed into a synthetic future CRM consumer, the official `--starter-files` bootstrap output cannot be generated/verified, or one of its consumer audits fails | Fix package artifacts, install contract, bootstrap starter files, fixture shape, or the relevant consumer audit before onboarding another consumer |
| `future-consumer-discovery:audit` | The local future CRM discovery report cannot be regenerated before goal evidence is evaluated | Fix the discovery script or scan-root access; if a real future CRM candidate appears, run readiness against that consumer before claiming global completion |
| `future-consumer-discovery:audit:negative-probe` | The discovery audit accepted a missing scan root as a healthy zero-candidate scan | Fix `audit-future-consumer-discovery.mjs` or the negative probe before trusting future CRM discovery evidence |
| `future-consumer-discovery:audit:partial-probe` | The discovery audit accepted a CRM-looking directory without the full consumer contract as a real future CRM candidate | Fix `audit-future-consumer-discovery.mjs` or the partial-candidate probe before trusting future CRM discovery evidence |
| `future-consumer-discovery:audit:positive-probe` | The discovery audit rejected a CRM directory with the full consumer contract | Fix `audit-future-consumer-discovery.mjs` or the positive probe before trusting future CRM discovery evidence |
| `future-consumer-adoption:audit` | A discovered real future CRM candidate does not have matching labeled `library-readiness-gate-<label>.json` evidence | Run `node scripts/audit-library-readiness.mjs --check --consumer <candidate> --report-label <label>` after bootstrapping that consumer, then rerun this audit |
| `future-consumer-adoption:audit:positive-probe` | The adoption audit rejected a discovered future CRM candidate with matching labeled readiness evidence | Fix `audit-future-consumer-adoption.mjs` or the positive probe before trusting future CRM adoption evidence |
| `future-consumer-adoption:audit:mismatch-probe` | The adoption audit accepted labeled readiness evidence whose `consumerRoot` belongs to a different consumer | Fix `audit-future-consumer-adoption.mjs` or the mismatch probe before trusting future CRM adoption evidence |
| `future-consumer-adoption:audit:negative-probe` | The adoption audit stopped rejecting discovered future CRM candidates without matching labeled readiness evidence | Fix `audit-future-consumer-adoption.mjs` or the negative probe before trusting future CRM adoption evidence |
| `certification-scope:audit` | A product decision to scope full-image 1:1 certification out of completion is missing required acceptance fields, the validated example is missing/invalid, or the audit cannot validate the decision file | Fix `certification-scope-decision.json` or `contracts/certification-scope-decision.example.json`; when the active decision is absent, full-image 1:1 remains required for global completion |
| `certification-scope:audit:positive-probe` | The certification-scope audit stopped accepting a valid scoped-completion decision in an isolated probe | Fix `audit-certification-scope-decision.mjs`, the example template, or the positive probe before relying on scoped-completion acceptance |
| `certification-scope:audit:negative-probe` | The certification-scope audit stopped rejecting invalid scoped-completion decisions | Fix `audit-certification-scope-decision.mjs` or the negative probe before trusting scoped completion evidence |
| `consumer-package-sync:audit` | Consumer vendor tarball differs from `dist-packages`, or installed `node_modules/@taliya/*` public files differ from the current package outputs | Copy current tarballs into the consumer, explicitly reinstall the three local tarballs, and rerun the audit |
| `consumer-package-sync:audit:negative-probe` | A temporary consumer with fresh vendor tarballs but stale installed package files was accepted | Keep installed package-file hash checks enabled before trusting same-version local tarball installs |
| `consumer-vendor-versioning:audit` | Consumer vendor tarballs are missing, not synced, or not tracked by the consumer repo | Refresh vendor tarballs and stage/track them in the consumer repository |
| `consumer:audit` | Consumer dependency/CSS/import/local-clone contract drifted | Fix consumer imports/CSS or extend the library component first |
| `consumer-page-kit:audit` | Consumer route/surface does not import and render required official components, or config schema is invalid | Fix `taliya-page-kit.config.json` or migrate the page to official components |
| `consumer-page-kit:audit:path-traversal-probe` | Page-kit schema accepted config paths outside the consumer root | Fix `consumer-config-validation.mjs` so consumer configs cannot use absolute paths or `..` traversal for adoption evidence |
| `consumer-readiness-config:audit:path-traversal-probe` | Readiness schema accepted `vendor` or `pageKitConfig` paths outside the consumer root | Fix `consumer-config-validation.mjs` or `audit-library-readiness.mjs` so aggregate readiness cannot use escaped consumer config paths |
| `consumer-runtime:audit` | Consumer typecheck/lint/test/build fails | Fix the consumer or package regression before accepting adoption |
| `consumer-config-versioning:audit` | Consumer config files are missing, invalid JSON, or not tracked by the consumer repo | Add/fix the config files in the consumer repository before accepting adoption |
| `visual-certification-backlog:audit` | The Batch 9/11 ledgers cannot be parsed into component/image/process certification buckets | Fix ledger formatting or the audit parser before using goal completion evidence |
| `reference-sheet-coverage:audit` | One of the 11 active reference sheets is missing, has a source hash mismatch, or names a component without one unique official isolated story | Restore the canonical source/story mapping before trusting the reference-sheet certification queue |
| `reference-sheet-coverage:audit:missing-story-probe` | Reference-sheet coverage accepted removal of a required component story | Fix the audit/probe before treating structural sheet coverage as evidence |
| `visual-certification-plan:audit` | A pending visual row is missing source/story/components/evidence/blocker/next-action data, current evidence snippets, or a required current evidence assertion | Fix the relevant ledger row or add/update the source-backed current evidence assertion before accepting readiness |
| `visual-certification-plan:audit:negative-probe` | The plan audit stopped rejecting stale visual evidence or pending rows without current evidence assertions | Fix the plan audit/probe before trusting visual readiness evidence |
| `visual-certification-plan:audit:missing-artifact-probe` | The plan audit stopped rejecting ledger evidence that points at missing screenshot/metrics artifacts | Fix the artifact existence check/probe before trusting visual readiness evidence |
| `visual-product-review:audit` | The review board is missing, stale, or no longer matches the current plan and capture evidence | Regenerate the capture if needed, then run `visual-product-review:audit:update`; review decisions remain manual |
| `source-assets:reconcile` | Folder/ZIP integrity drifted or a covered route source image is absent from the top-level corpus | Restore the named route source file or explicitly update the route coverage map; never fill the gap with nested derivatives or arbitrary images |
| `visual-certification-capture:check` | Current source/story hashes no longer match the recorded screenshot batch, or one or more expected captures are missing | Regenerate the source-sized visual capture batch; do not convert raw metrics into automatic approval |
| `visual-certification-capture:source-contract-probe` | Capture currency depends on volatile manifest metadata or accepts an altered official source-image hash | Fix the semantic source contract used by the capture gate before trusting capture evidence |
| `readiness:audit` | One of the current-scope readiness gates failed | Open `library-readiness-gate.md` and fix the first failed gate |

## What This Does Not Prove

These gates do not prove:

- every approved source image is pixel-perfect 1:1 beyond the current accepted 99% visual scope;
- future CRM adoption has happened before a future CRM app runs the labeled gates;
- page-specific visual parity for any future/reopened source image where the batch ledger returns to `Em revisao visual` or `Not certified 1:1`.

Use `visual-certification-backlog-audit.md` to see the current count and exact rows for that last caveat.

Visual completion remains governed by:

```text
specs/001-product-ui-foundation/contracts/visual-parity-contract.md
specs/001-product-ui-foundation/batch-9-status-ledger.md
specs/001-product-ui-foundation/batch-11-status-ledger.md
```
