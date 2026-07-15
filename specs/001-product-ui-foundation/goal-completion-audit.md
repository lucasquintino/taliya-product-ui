# Goal Completion Audit

Date: 2026-07-15

Goal under audit: transform `taliya-product-ui` into a reusable library for `taliya-internal` and the future Taliya CRM, with Internal consuming official shell, filters, table, drawer, and standardized visual/behavioral components.

Verdict: readiness-regression. Current evidence has a readiness regression that must be fixed before acceptance.

## Meta Real

Transformar taliya-product-ui em uma biblioteca oficial, reutilizavel e instalavel, com @taliya/tokens, @taliya/ui e @taliya/crm, capaz de alimentar os stories/imagens do CRM Taliya, o taliya-internal hoje e o futuro CRM Taliya depois, sem reimplementar shell, filtros, tabela, drawer, kanban, cards ou padroes visuais localmente.

Acceptance criteria:

- Packages @taliya/tokens, @taliya/ui, and @taliya/crm are standalone, bounded, installable, documented, and audited.
- The public page kit exposes official shell, filters, quick filters, table, drawer, kanban/cards, panels, state primitives, and runtime discovery metadata.
- taliya-internal consumes the official packages/page kit for its covered routes instead of local visual clones.
- A new consumer can bootstrap official configs and starter files that render the same official roots.
- The real future CRM consumer runs the same adoption gates when it exists.
- Approved CRM source images are certified through source-backed static Storybook capture, or product acceptance explicitly scopes that parity work out of completion.

Not sufficient:

- Passing build/lint/tests without consumer adoption evidence.
- A synthetic future-consumer fixture alone, if the acceptance bar requires the real future CRM app.
- Component stories that are close visually but not certified 1:1 against approved source images.
- Consumer pages that reimplement shell/filter/table/drawer/kanban/card visuals locally.

## Requirement Matrix

| Requirement | Current evidence | Status | Completion impact |
| --- | --- | --- | --- |
| Standalone package structure for tokens, primitives, and CRM compositions | `package-boundaries:audit`, `packages/tokens`, `packages/ui`, `packages/crm` | proven | Satisfied for current scope |
| Installable, publishable, CSS-safe, peer-safe, workspace-free, locally versioned, package-files-restricted, and documented local package artifacts | `package-artifacts:audit sourcePublishable/packedPublishable`, `package-artifacts:audit sourceCssSideEffects/packedCssSideEffects`, `package-artifacts:audit required React peerDependencies`, `package-artifacts:audit no packed workspace:* dependencies`, `package-artifacts:audit required packed local dependency versions`, `package-artifacts:audit package files field and forbidden tarball files`, `package-artifacts:audit required README snippets`, `consumer-package-sync:audit`, `consumer-package-sync:audit installed public files match package outputs`, `library-readiness-gate consumer-package-sync-negative-probe pass`, `consumer-vendor-versioning:audit`, `consumer:audit installedPackageStatus` | proven | Satisfied for current scope |
| Public page kit exported, story-covered, and documented | `public-api:audit 52/52 pass` | proven-for-current-kit | Satisfied for current scope |
| Runtime standard page-kit manifest is available to consumers | `contracts/standard-page-kit.manifest.json`, `public-api:audit runtimeManifestExportPresent`, `public-api:audit runtimeManifestExactParity`, `consumer:audit standardPageKitRuntimeStatus exact 52/52`, `future-consumer-fixture:audit smoke resolved JS/CSS exports including @taliya/crm/standard-page-kit and manifest count` | proven-for-current-internal-and-fixtures | Satisfied for current scope |
| Component architecture supports reuse | `components:audit 333 valid stories`, `primitiveReuseClassification refactor=0 missingPrimitive=0` | proven-for-current-scope | Satisfied for current scope |
| Token governance and no new visual debt | `tokens:audit`, `token-governance-audit.md literalSizing=0 aliasObrigatorio=0` | proven-for-current-token-css-surface | Satisfied for current scope |
| Taliya Internal declares and installs official packages | `consumer:audit packageStatus pass`, `consumer:audit packageStatus sourceRows pinned to vendor/taliya-product-ui`, `consumer:audit installedPackageStatus pass`, `consumer:audit installedPackageContractStatus pass`, `installed markers: crm-product-shell-drawer-size-api, crm-product-shell-compact-drawer-css, crm-task-drawer-compact-size-api, crm-task-drawer-compact-size-css, crm-task-drawer-activity-order-api, crm-task-drawer-compact-density-css, tokens-task-drawer-compact-work-list-density, tokens-task-drawer-compact-inner-density, crm-product-shell-page-header-rhythm-api, crm-product-shell-content-layout-api, crm-product-shell-content-layout-css, tokens-product-shell-content-layout, crm-replacement-floating-drawer-css, tokens-replacement-floating-drawer, tokens-activity-feed-source-density, crm-product-shell-page-header-rhythm-css, tokens-product-shell-page-header-rhythm, tokens-product-shell-topnav-rhythm, tokens-product-shell-surface-rhythm, ui-segmented-shell-topnav-css, crm-shell-topnav-nav-pill-rendering, ui-official-icon-sizing-css, ui-official-base-icon-sizing-css, ui-official-base-icon-sizing-runtime, crm-product-shell-floating-drawer-reserve-css, crm-product-shell-content-drawer-topbar-css, tokens-product-shell-floating-drawer-reserve, tokens-page-filter-bar-search-flow, tokens-page-filter-bar-compact-flow, tokens-page-filter-bar-tight-flow, tokens-page-quick-filter-soft-selection, tokens-approval-panel-history-rhythm, tokens-finance-priority-panel-density, crm-page-filter-bar-flex-flow-css, crm-page-filter-bar-density-api, crm-page-filter-bar-compact-css, crm-page-filter-bar-tight-css, crm-page-quick-filters-selection-tone-api, crm-page-quick-filters-soft-selection-css, crm-approval-panel-history-rhythm-css, crm-finance-priority-panel-density-css, crm-work-list-detail-main-priority-api, crm-work-list-detail-main-priority-css, tokens-work-list-detail-main-priority, ui-filter-select-value-trigger-api, ui-search-input-embedded-filter-api-css, ui-search-input-embedded-filter-css, crm-page-filter-bar-embedded-search-filter-api, tokens-compact-checklist-drawer, tokens-checklist-table-dot-selection, crm-checklist-drawer-rhythm-css, crm-checklist-table-dot-selection-css` | proven-for-current-internal | Satisfied for current scope |
| Taliya Internal avoids active local visual clones | `consumer:audit activeClassNameStatus pass`, `consumer:audit activeCssStatus pass`, `consumer:audit forbiddenImportStatus pass`, `consumer:audit forbiddenTaliyaSubpathImportStatus pass` | proven-for-current-internal | Satisfied for current scope |
| Taliya Internal uses official shell, filters, tables, kanban, drawers, panels, and state primitives | `consumer-page-kit:audit pass`, `page-kit config ../taliya-internal/taliya-page-kit.config.json`, `requiredStatus imported=true jsxUsed=true`, `componentContractRows prove wrapper-level official render roots` | proven-for-current-internal | Satisfied for current scope |
| Taliya Internal route pages are fully covered by the official page-kit adoption map | `consumer-page-kit:audit routeCoverage pass`, `routeCoverage root app/internal`, `discoveredRoutes /internal, /internal/landing, /internal/leads, /internal/leads/kanban`, `uncoveredRoutes=0`, `each route requires InternalShell plus a local workspace component`, `routeWorkspaces /internal:CockpitWorkspace:pass, /internal/landing:LandingWorkspace:pass, /internal/leads:LeadsWorkspace:pass, /internal/leads/kanban:LeadsWorkspace:pass` | proven-for-current-internal | Satisfied for current scope |
| Taliya Internal owns the same consumer readiness config model future CRM will use | `C:/Users/lucas/taliya-internal/taliya-readiness.config.json`, `library-readiness-gate.json readinessConfig`, `consumer-readiness-config.example.json` | proven-for-current-internal | Satisfied for current scope |
| Taliya Internal consumer readiness configs are versioned in the consumer repository | `consumer-config-versioning:audit`, `consumer-config-versioning-audit.md`, `taliya-readiness.config.json tracked`, `taliya-page-kit.config.json tracked` | proven-for-current-internal | Satisfied for current scope |
| Internal runtime still works after migration | `consumer-runtime:audit`, `consumer-runtime-audit.md`, `batch-9-status-ledger.md`, `batch-11-status-ledger.md` | proven-for-current-internal | Satisfied for current scope |
| Technical release candidate gate passes | `release-candidate:audit`, `release-candidate-audit.md`, `required gates pass: typecheck, lint, test, build, readiness, storybook-anatomy, storybook-anatomy-override-probe, domain-wrappers, domain-wrappers-direct-drawer-probe, future-consumer-discovery, future-consumer-discovery-negative-probe, future-consumer-discovery-partial-probe, future-consumer-discovery-positive-probe, future-consumer-adoption, future-consumer-adoption-positive-probe, future-consumer-adoption-mismatch-probe, future-consumer-adoption-negative-probe, future-crm-adoption-handoff, consumer-starter-templates-route-contract-probe, consumer-package-sync-negative-probe, consumer-installed-contract-markers, consumer-page-kit-shell-only-route-probe, consumer-page-kit-wrapper-contract-probe, consumer-page-kit-route-wrapper-contract-probe, consumer-page-kit-mismatched-route-contract-probe, consumer-page-kit-default-identifier-route-probe, consumer-page-kit-uncovered-route-probe, consumer-page-kit-path-traversal-probe, consumer-readiness-config-path-traversal-probe, certification-scope, certification-scope-positive-probe, certification-scope-negative-probe, visual-certification-backlog-update, visual-certification-backlog, remaining-page-coverage-update, remaining-page-coverage, remaining-page-coverage-family-contract-probe, kanban-family-update, kanban-family, kanban-family-negative-probe, dashboard-family-update, dashboard-family, dashboard-family-negative-probe, source-assets-update, source-assets, source-assets-reconciliation-update, source-assets-reconciliation, source-assets-reconciliation-nested-exclusion-probe, full-image-page-coverage-update, full-image-page-coverage, full-image-page-coverage-missing-story-probe, full-image-page-coverage-missing-source-marker-probe, full-image-page-coverage-misplaced-source-marker-probe, full-image-page-coverage-nonofficial-import-probe, full-image-page-coverage-unmapped-map-target-probe, reference-sheet-coverage-update, reference-sheet-coverage, reference-sheet-coverage-missing-story-probe, visual-certification-plan, visual-certification-plan-negative-probe, visual-certification-plan-missing-artifact-probe, visual-product-review-update, visual-product-review, visual-certification-capture, visual-certification-capture-source-contract-probe, audit-checks-read-only-probe, readiness-refresh-update, readiness-refresh, goal-completion-update, library-acceptance-update, library-acceptance, library-acceptance-positive-probe, library-acceptance-negative-probe, goal-completion-refresh, library-consumption-status-update, library-consumption-status, library-consumption-status-positive-probe, library-consumption-status-global-complete-probe, library-consumption-status-stale-release-probe, library-consumption-status-stale-readiness-probe, library-consumption-status-negative-probe, crm-real-readiness-update, crm-real-readiness, crm-real-readiness-stale-remaining-page-coverage-probe, local-release-manifest-update, local-release-manifest, consumer-dependencies-sync-check, consumer-dependencies-sync-stale-manifest-probe, consumer-package-install-plan, consumer-package-install-missing-vendor-probe, consumer-lockfile, consumer-lockfile-stale-probe, consumer-refresh, consumer-vendor-sync-check, consumer-vendor-sync-stale-manifest-probe, release-policy-update, release-policy, release-policy-negative-probe, release-channel-update, release-channel, official-library-readiness-update, official-library-readiness, goal-completion`, `release-candidate self-report check active`, `missing/failing release gates: readiness, source-assets-update, source-assets, source-assets-reconciliation-update, source-assets-reconciliation, readiness-refresh, library-acceptance, library-consumption-status, crm-real-readiness, official-library-readiness-update, official-library-readiness` | not-run | Blocks global completion |
| Current Internal/library acceptance gate passes with separate global-completion status | `library-acceptance:audit`, `library-acceptance-audit.md`, `library acceptance status: fail`, `currentInternalLibraryAccepted=false`, `globalGoalComplete=false`, `globalGoalStatus=not-complete-globally` | not-run | Blocks global completion |
| Library consumption status handoff is current and coherent | `library-consumption-status:audit`, `library-consumption-status.md`, `status=fail`, `currentInternalLibraryAccepted=false`, `currentInternalConsumptionPass=true`, `publicPageKitPass=true`, `technicalReleaseCandidatePass=true`, `aggregateReadinessPass=false`, `futureCrmProcessPass=true`, `futureCrmRealAdoptionExecuted=false`, `globalGoalComplete=false` | failed | Blocks readiness |
| CRM real readiness handoff proves the library can start the real CRM | `crm-real-readiness:audit`, `crm-real-readiness-audit.md`, `status=fail`, `currentInternalReady=true`, `crmRealCanStart=false`, `realFutureCrmAdoptionExecuted=false`, `globalGoalComplete=false`, `standardPageKitComponents=52`, `domainDrawerFamilies=13` | failed | Blocks readiness |
| Official library readiness handoff proves the packages can be consumed as the reusable UI source | `official-library-readiness:audit`, `official-library-readiness-audit.md`, `status=fail`, `officialConsumerReady=false`, `currentInternalReady=true`, `crmRealCanStart=false`, `realFutureCrmAdoptionExecuted=false`, `releaseCandidateGates=103`, `registryManualItems=3` | failed | Blocks readiness |
| Release policy contract makes local tarball and future registry channels explicit | `release-policy:audit`, `release-policy-audit.md`, `contracts/release-policy.json`, `contracts/release-policy.md`, `release-policy:audit:negative-probe`, `status=pass-registry-policy`, `currentChannel=local-tarball`, `registryReady=true`, `registryBlockers=0` | proven-for-current-scope | Satisfied for current scope |
| Release channel handoff proves the local install channel is reliable for consumers | `release-channel:audit`, `release-channel-audit.md`, `status=pass-local-release-channel`, `localTarballChannelReady=true`, `registryReady=false`, `releasePolicyStatus=pass-registry-policy`, `currentVersion=0.1.0`, `consumerPackageSyncStatus=pass`, `consumerVendorVersioningStatus=pass`, `consumerConfigVersioningStatus=pass`, `registryBlockers=2` | proven-for-current-scope | Satisfied for current scope |
| Local release manifest gives consumers a stable install artifact index | `local-release-manifest:audit`, `local-release-manifest-audit.md`, `dist-packages/taliya-product-ui-local-manifest.json`, `status=pass`, `manifestShapePass=true`, `packageCount=3` | proven-for-current-scope | Satisfied for current scope |
| Future CRM can adopt the same library | `consumer-integration-contract.md`, `consumer-adoption-playbook.md`, `consumer-readiness-config.example.json`, `consumer-page-kit-config.example.json`, `consumer-bootstrap:audit starterFiles pass`, `future-consumer-fixture:audit bootstrap starterFiles pass`, `future-consumer-fixture:audit installed render/export smoke including @taliya/crm/standard-page-kit`, `library-readiness-gate future-consumer-discovery pass`, `library-readiness-gate future-consumer-discovery-negative-probe pass`, `library-readiness-gate future-consumer-discovery-partial-probe pass`, `library-readiness-gate future-consumer-discovery-positive-probe pass`, `library-readiness-gate future-consumer-adoption pass`, `library-readiness-gate future-consumer-adoption-positive-probe pass`, `library-readiness-gate future-consumer-adoption-mismatch-probe pass`, `library-readiness-gate future-consumer-adoption-negative-probe pass`, `library-readiness-gate future-crm-adoption-handoff pass`, `future-crm-adoption-handoff.md`, `future-crm-adoption-handoff:audit validates candidate discovery, bootstrap, labeled readiness evidence, and non-completion rule`, `future-consumer-discovery:audit candidates=0`, `future-consumer-discovery:audit:negative-probe rejects missing scan roots`, `future-consumer-discovery:audit:partial-probe rejects weak CRM-looking directories without the full consumer contract`, `future-consumer-discovery:audit:positive-probe accepts CRM directories with the full consumer contract`, `future-consumer-adoption:audit status=pass`, `future-consumer-adoption:audit adopted=0/0`, `future-consumer-adoption:audit:positive-probe accepts candidates with matching labeled readiness evidence`, `future-consumer-adoption:audit:mismatch-probe rejects readiness evidence for a different consumer root`, `future-consumer-adoption:audit:negative-probe rejects candidates without matching readiness evidence`, `bootstrap-consumer-configs.mjs --starter-files dry-run checked by readiness:audit` | process-proven-adoption-not-executed | Blocks global completion |
| Approved source-image visual parity | `visual-parity-contract.md`, `library-readiness-gate certification-scope pass`, `library-readiness-gate certification-scope-positive-probe pass`, `library-readiness-gate certification-scope-negative-probe pass`, `certification-scope:audit scope=current-internal-library-readiness-accepted`, `certification-scope:audit scopedCompletionAccepted=true`, `certification-scope:audit exampleValid=true`, `certification-scope:audit:positive-probe accepts valid scoped-completion decisions`, `certification-scope:audit:negative-probe rejects invalid scoped-completion decisions`, `batch ledgers`, `visual-certification-backlog:audit`, `sourceReconciliation=blocked-incomplete-canonical-roster canonical=93/101 rosterKnown=93 rosterUnresolved=8 recursive=164 nestedDerivatives=71 archiveExact=true`, `reference-sheet-coverage:audit`, `library-readiness-gate reference-sheet-coverage pass`, `library-readiness-gate reference-sheet-coverage-missing-story-probe pass`, `referenceSheets=11/11 components=111 missing=0 ambiguous=0 nonOfficial=0`, `visual-certification-plan:audit`, `library-readiness-gate visual-certification-plan pass`, `library-readiness-gate visual-certification-plan-negative-probe pass`, `incomplete=64 mapConflicts=0 blockerMentions=91`, `planActionable=63/63 technicalCycles=0 productReviewDecisions=63 missingPlanData=0 currentEvidenceAssertions=17 assertionCoverage=63/63 missingAssertions=0` | scoped-out-by-product-acceptance | Satisfied for current scope |

## Evidence Files

- `specs/001-product-ui-foundation/library-readiness-audit.md`
- `specs/001-product-ui-foundation/library-readiness-gate.md`
- `specs/001-product-ui-foundation/library-acceptance-audit.md`
- `specs/001-product-ui-foundation/library-consumption-status.md`
- `specs/001-product-ui-foundation/crm-real-readiness-audit.md`
- `specs/001-product-ui-foundation/official-library-readiness-audit.md`
- `specs/001-product-ui-foundation/release-policy-audit.md`
- `specs/001-product-ui-foundation/contracts/release-policy.md`
- `specs/001-product-ui-foundation/release-channel-audit.md`
- `specs/001-product-ui-foundation/local-release-manifest-audit.md`
- `dist-packages/taliya-product-ui-local-manifest.json`
- `specs/001-product-ui-foundation/consumer-integration-audit.md`
- `specs/001-product-ui-foundation/consumer-package-sync-audit.md`
- `specs/001-product-ui-foundation/consumer-vendor-versioning-audit.md`
- `specs/001-product-ui-foundation/consumer-page-kit-audit.md`
- `specs/001-product-ui-foundation/consumer-runtime-audit.md`
- `specs/001-product-ui-foundation/consumer-config-versioning-audit.md`
- `specs/001-product-ui-foundation/consumer-bootstrap-audit.md`
- `specs/001-product-ui-foundation/future-consumer-fixture-audit.md`
- `specs/001-product-ui-foundation/future-consumer-discovery-audit.md`
- `specs/001-product-ui-foundation/visual-certification-backlog-audit.md`
- `specs/001-product-ui-foundation/visual-certification-plan-audit.md`
- `specs/001-product-ui-foundation/certification-scope-decision-audit.md`
- `specs/001-product-ui-foundation/contracts/certification-scope-decision.example.json`
- `specs/001-product-ui-foundation/release-candidate-audit.md`
- `C:/Users/lucas/taliya-internal/taliya-readiness.config.json`
- `specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json`
- `specs/001-product-ui-foundation/public-api-audit.md`
- `specs/001-product-ui-foundation/package-boundaries-audit.md`
- `specs/001-product-ui-foundation/package-artifacts-audit.md`
- `specs/001-product-ui-foundation/component-architecture-audit.md`
- `specs/001-product-ui-foundation/token-governance-audit.md`
- `specs/001-product-ui-foundation/consumer-adoption-playbook.md`
- `specs/001-product-ui-foundation/batch-9-status-ledger.md`
- `specs/001-product-ui-foundation/batch-11-status-ledger.md`

## Current Completion State

Completed overall:

- Created and guarded the standalone package boundary for @taliya/tokens, @taliya/ui, and @taliya/crm.
- Made local package artifacts installable/publishable for the current local distribution model, including CSS side effects, peer dependency, README, package-files, and no workspace-dependency checks.
- Exposed and audited the current official CRM page kit, including runtime standardPageKitManifest and @taliya/crm/standard-page-kit.
- Migrated current taliya-internal covered routes to official package/page-kit components, with route coverage and clone-avoidance audits.
- Added consumer-owned readiness/page-kit config contracts and versioning checks.
- Added bootstrap and starter-template flow for a future consumer, including official shell, work-list, filter, quick-filter, table, kanban/card, and drawer starter files.
- Added synthetic installed future-consumer fixture proving tarball install, public JS/CSS export resolution, runtime manifest parity, and SSR smoke for official components.
- Added visual-certification backlog tracking so image parity gaps are explicit and cannot be hidden by technical gates.
- Added a visual-certification plan audit so incomplete image rows have source/story/evidence/blocker/next-action data before a certification cycle starts.
- Added visual-certification current-evidence assertions and a negative-probe gate so stale visual evidence and pending rows without assertions fail readiness.
- Added certification-scope decision auditing so any product decision to accept current Internal/library readiness instead of full image parity must be explicit and validated.
- Added certification-scope positive probe so valid scoped-completion decisions are recognized without activating the project decision.
- Added certification-scope negative probe so invalid scoped-completion decisions fail readiness and release-candidate gates.
- Added aggregate readiness and technical release-candidate gates for the current scoped package/Internal/future-fixture evidence.
- Added a current Internal/library acceptance gate so product can distinguish reusable-library acceptance from global future-CRM and 1:1 visual completion.
- Hardened goal-completion evidence so the release-candidate gate must include typecheck, lint, test, build, readiness, future-consumer discovery, future-consumer discovery negative probe, future-consumer discovery partial-candidate probe, future-consumer discovery positive probe, future-consumer adoption, future-consumer adoption positive probe, future-consumer adoption mismatch probe, future-consumer adoption negative probe, future CRM adoption handoff, Internal contract markers, visual backlog, visual plan, stale-evidence negative probe, current Internal/library acceptance, acceptance valid-evidence probe, acceptance false-positive probe, and goal-completion checks.
- Promoted future CRM discovery into readiness and release-candidate gates so stale discovery reports cannot silently support goal evidence.
- Added a future-consumer discovery negative probe so a missing scan root cannot be accepted as zero future CRM candidates.
- Added a future-consumer discovery partial-candidate probe so weak CRM-looking directories cannot be accepted as real future CRM candidates without the full consumer contract.
- Added a future-consumer discovery positive probe so a CRM directory with the full consumer contract is accepted as a real future CRM candidate.
- Added a future-consumer adoption audit so any discovered real future CRM candidate must have matching labeled readiness evidence before adoption can be considered executed.
- Added a future-consumer adoption positive probe so a discovered future CRM candidate with matching labeled readiness evidence is accepted.
- Added a future-consumer adoption mismatch probe so readiness evidence for a different consumer root is rejected.
- Added a future-consumer adoption negative probe so candidates without matching readiness evidence are rejected by readiness and release-candidate gates.
- Added an audited future CRM adoption handoff so candidate discovery, bootstrap, labeled readiness evidence, and non-completion rules are a reusable process artifact.
- Added consumer package installed-file hash checks and a negative probe so fresh vendor tarballs with stale installed node_modules package files fail readiness and release-candidate evidence.
- Added a compact library consumption status handoff and wired it into release-candidate and goal-completion evidence so current Internal acceptance, official kit consumption, future CRM process readiness, and global non-completion remain easy to verify.
- Added compact library consumption positive, global-complete, stale-release, stale-readiness, and negative probes so valid handoff evidence is accepted, future complete evidence reports pass-global-goal, stale release-candidate/readiness evidence is rejected, and false-positive Internal consumption evidence is rejected.
- Added a CRM real readiness handoff that consolidates package, Internal, standard page-kit, dynamic page/drawer, consumer bootstrap, installed future-consumer fixture, future adoption process, and visual-scope evidence into one executable answer.
- Added an official library readiness handoff that consolidates package metadata, package gates, public API, token/component governance, Internal consumption, CRM real readiness, release-candidate evidence, and registry manual items into one executable answer.
- Added a versioned release policy contract and audit so the current local tarball channel, future registry blockers, and consumer dependency migration decisions are explicit.
- Added a release policy negative probe so incomplete release-policy contracts fail before they can support release/readiness evidence.
- Added a release channel handoff that proves the current local tarball/vendor install channel is reliable for consumers while keeping registry publication blockers explicit.
- Added a local release manifest so consumers have a stable install artifact index with package names, versions, tarballs, hashes, sizes, and install order.
- Added consumer config path-scope validation and page-kit/readiness-config path-traversal probes so versioned consumer configs cannot prove adoption using files outside the consumer root.

Remaining overall:

- Run the adoption flow against the real future CRM app once it exists or is connected locally.
- Keep the visual-certification queue as continuous product-quality work, separate from current Internal/library acceptance.
- Keep promoting any missing future page/card variants into official @taliya/ui or @taliya/crm components instead of consumer-local implementations.
- Run the full final gate bundle after the chosen acceptance scope is explicit.

The current state is strong enough to say:

- `taliya-product-ui` is packaged as a reusable local library for the current Internal scope.
- `@taliya/crm` exposes `standardPageKitManifest` at runtime, and the current consumer audit imports it successfully with 52/52 manifest entries.
- `taliya-internal` currently consumes official shell/filter/table/drawer/page-kit components.
- `taliya-internal` dependency sources are pinned to the configured `vendor/taliya-product-ui` tarballs.
- `taliya-internal` vendor tarballs and installed `node_modules/@taliya/*` public files match current package outputs.
- `taliya-internal` installed packages expose required contract markers: `crm-product-shell-drawer-size-api`, `crm-product-shell-compact-drawer-css`, `crm-task-drawer-compact-size-api`, `crm-task-drawer-compact-size-css`, `crm-task-drawer-activity-order-api`, `crm-task-drawer-compact-density-css`, `tokens-task-drawer-compact-work-list-density`, `tokens-task-drawer-compact-inner-density`, `crm-product-shell-page-header-rhythm-api`, `crm-product-shell-content-layout-api`, `crm-product-shell-content-layout-css`, `tokens-product-shell-content-layout`, `crm-replacement-floating-drawer-css`, `tokens-replacement-floating-drawer`, `tokens-activity-feed-source-density`, `crm-product-shell-page-header-rhythm-css`, `tokens-product-shell-page-header-rhythm`, `tokens-product-shell-topnav-rhythm`, `tokens-product-shell-surface-rhythm`, `ui-segmented-shell-topnav-css`, `crm-shell-topnav-nav-pill-rendering`, `ui-official-icon-sizing-css`, `ui-official-base-icon-sizing-css`, `ui-official-base-icon-sizing-runtime`, `crm-product-shell-floating-drawer-reserve-css`, `crm-product-shell-content-drawer-topbar-css`, `tokens-product-shell-floating-drawer-reserve`, `tokens-page-filter-bar-search-flow`, `tokens-page-filter-bar-compact-flow`, `tokens-page-filter-bar-tight-flow`, `tokens-page-quick-filter-soft-selection`, `tokens-approval-panel-history-rhythm`, `tokens-finance-priority-panel-density`, `crm-page-filter-bar-flex-flow-css`, `crm-page-filter-bar-density-api`, `crm-page-filter-bar-compact-css`, `crm-page-filter-bar-tight-css`, `crm-page-quick-filters-selection-tone-api`, `crm-page-quick-filters-soft-selection-css`, `crm-approval-panel-history-rhythm-css`, `crm-finance-priority-panel-density-css`, `crm-work-list-detail-main-priority-api`, `crm-work-list-detail-main-priority-css`, `tokens-work-list-detail-main-priority`, `ui-filter-select-value-trigger-api`, `ui-search-input-embedded-filter-api-css`, `ui-search-input-embedded-filter-css`, `crm-page-filter-bar-embedded-search-filter-api`, `tokens-compact-checklist-drawer`, `tokens-checklist-table-dot-selection`, `crm-checklist-drawer-rhythm-css`, `crm-checklist-table-dot-selection-css`.
- `taliya-internal` wrapper contracts prove local table/kanban adapters render official package components inside their own bodies.
- `taliya-internal` owns the same readiness config shape intended for future CRM consumers.
- `taliya-internal` has its readiness/page-kit configs tracked by the consumer repository.
- `taliya-internal` has synced vendor tarballs tracked by the consumer repository.
- Future CRM config bootstrap is executable against a temporary git fixture and generates official starter files for shell, work-list, filter, quick-filter, table, kanban/card, and drawer roots.
- Local tarballs install, bootstrap official starter files, resolve public JS/CSS exports, server-render official shell/filter/table/kanban/drawer components, and pass consumer audits in a synthetic future CRM fixture.
- Readiness runs future CRM discovery with status `pass`.
- Readiness runs future CRM discovery negative probe with status `pass`.
- Future CRM discovery currently reports 0 real local candidate(s).
- Readiness runs future CRM adoption evidence with status `pass`, currently adopted 0/0 discovered candidate(s).
- Readiness runs future CRM adoption negative probe with status `pass`.
- Technical release-candidate gate status is `fail`.
- Technical release-candidate required gates are missing/failing: readiness, source-assets-update, source-assets, source-assets-reconciliation-update, source-assets-reconciliation, readiness-refresh, library-acceptance, library-consumption-status, crm-real-readiness, official-library-readiness-update, official-library-readiness.
- Current Internal/library acceptance gate status is `fail`, with current Internal/library accepted: `false` and global goal complete: `false`.
- Library consumption status is `fail`, with current Internal consumption: `true`, future CRM real adoption executed: `false`, and global goal complete: `false`.
- CRM real readiness is `fail`, with CRM real can start: `false`, dynamic drawer families checked: `13`, and real future CRM adoption executed: `false`.
- Official library readiness is `fail`, with official consumer ready: `false`, package version: `0.1.0`, release-candidate gates: `103`, and registry manual items: `3`.
- Release policy readiness is `pass-registry-policy`, with current channel: `local-tarball`, registry ready: `true`, and registry blockers: `0`.
- Release channel readiness is `pass-local-release-channel`, with local tarball channel ready: `true`, registry ready: `false`, and registry blockers: `2`.
- Local release manifest status is `pass`, with manifest shape pass: `true` and package count: `3`.
- Certification scope decision status is `pass` with scoped completion accepted: `true`.
- Certification scope decision example is valid: `true`.
- Certification scope positive probe status is `pass`.
- Certification scope negative probe status is `pass`.
- The adoption process is documented and guarded by executable audits.
- Token governance has no CSS literal visual debt and no high-priority mandatory alias rows.
- Visual certification planning has 63/63 pending rows covered by current evidence assertions, and the readiness gate runs the stale-evidence negative probe with status `pass`.

The current state is not strong enough to say:

- every approved CRM image is visually certified 1:1;
- a future CRM app has adopted the library;
- the persistent goal is globally complete without caveats.

## Next Completion Options

1. If the acceptance bar is "current Internal reusable-library readiness", the next step is to run one full final gate bundle and ask for explicit product acceptance of the scoped definition.
2. If the acceptance bar includes future CRM adoption, create or connect the future CRM consumer, run `corepack pnpm consumer-configs:bootstrap -- --consumer <path> --write --starter-files` when the app needs the initial official route skeleton, commit the generated configs in that app, then run `node scripts/audit-library-readiness.mjs --check --consumer <path>`.
3. If the acceptance bar includes full image parity, continue source-backed Storybook static capture and component-level pass/fail certification for the remaining approved images.
