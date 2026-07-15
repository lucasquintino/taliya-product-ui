# Release Candidate Audit

Generated: 2026-07-15T17:26:13.930Z

Status: fail

This audit is the technical release-candidate gate for `taliya-product-ui`. It proves package health, build health, current Internal readiness, synthetic future-consumer readiness, local future-consumer discovery, compact library consumption status, and current goal evidence. It is not global source-image 1:1 certification.

## Gate Results

| Gate | Command | Status | Exit code | Duration ms | Proves |
| --- | --- | --- | ---: | ---: | --- |
| `typecheck` | `corepack pnpm typecheck` | pass | 0 | 9194 | package and docs TypeScript contracts compile |
| `lint` | `corepack pnpm lint` | pass | 0 | 24567 | package lint rules pass |
| `test` | `corepack pnpm test` | pass | 0 | 22545 | package tests and Storybook smoke pass |
| `build` | `corepack pnpm build` | pass | 0 | 214992 | packages and static Storybook build |
| `readiness` | `corepack pnpm readiness:audit` | fail | 1 | 41377 | library, Internal consumer, and synthetic future consumer readiness gates pass |
| `storybook-anatomy` | `corepack pnpm storybook-anatomy:audit:strict` | pass | 0 | 370 | Storybook owns no product anatomy or official component appearance while fixture geometry remains explicitly classified |
| `storybook-anatomy-override-probe` | `corepack pnpm storybook-anatomy:audit:override-probe` | pass | 0 | 394 | Storybook strict ownership rejects an injected official component appearance override |
| `domain-wrappers` | `corepack pnpm domain-wrappers:audit` | pass | 0 | 362 | retained CRM table/drawer wrappers add explicit domain mapping or anatomy instead of empty pass-through wrappers |
| `domain-wrappers-direct-drawer-probe` | `corepack pnpm domain-wrappers:audit:direct-drawer-probe` | pass | 0 | 440 | direct <aside> drawer contracts fail instead of returning as hidden drawer-unification debt |
| `consumer-starter-templates-route-contract-probe` | `corepack pnpm consumer-starter-templates:audit:route-contract-probe` | pass | 0 | 526 | future CRM starter route-local componentContractId links fail when missing or dangling |
| `future-consumer-discovery` | `corepack pnpm future-consumer-discovery:audit` | pass | 0 | 363 | local sibling directories are scanned for a real future CRM consumer before goal evidence is evaluated |
| `future-consumer-discovery-negative-probe` | `corepack pnpm future-consumer-discovery:audit:negative-probe` | pass | 0 | 394 | a missing future CRM scan root fails discovery instead of being accepted as zero candidates |
| `future-consumer-discovery-partial-probe` | `corepack pnpm future-consumer-discovery:audit:partial-probe` | pass | 0 | 395 | partial future CRM evidence is not accepted as a real future CRM candidate |
| `future-consumer-discovery-positive-probe` | `corepack pnpm future-consumer-discovery:audit:positive-probe` | pass | 0 | 397 | a future CRM directory with the full consumer contract is accepted as a real future CRM candidate |
| `future-consumer-adoption` | `corepack pnpm future-consumer-adoption:audit` | pass | 0 | 354 | discovered real future CRM candidates must have matching labeled readiness evidence before adoption is considered executed |
| `future-consumer-adoption-positive-probe` | `corepack pnpm future-consumer-adoption:audit:positive-probe` | pass | 0 | 395 | a discovered future CRM candidate with matching labeled readiness evidence is accepted |
| `future-consumer-adoption-mismatch-probe` | `corepack pnpm future-consumer-adoption:audit:mismatch-probe` | pass | 0 | 393 | a discovered future CRM candidate cannot be adopted with readiness evidence for a different consumer root |
| `future-consumer-adoption-negative-probe` | `corepack pnpm future-consumer-adoption:audit:negative-probe` | pass | 0 | 394 | a discovered future CRM candidate without matching labeled readiness evidence fails the adoption audit |
| `future-crm-adoption-handoff` | `corepack pnpm future-crm-adoption-handoff:audit` | pass | 0 | 353 | future CRM adoption handoff is present, linked, and carries the non-completion rule |
| `consumer-package-sync-negative-probe` | `corepack pnpm consumer-package-sync:audit:negative-probe` | pass | 0 | 459 | fresh consumer vendor tarballs with stale installed package files fail package sync |
| `consumer-installed-contract-markers` | `corepack pnpm consumer:audit` | pass | 0 | 690 | installed Internal packages expose current public contract markers, including drawer-size API/CSS, content-drawer full-width topbar CSS, compact checklist drawer tokens, and checklist drawer header/rhythm CSS |
| `consumer-page-kit-shell-only-route-probe` | `corepack pnpm consumer-page-kit:audit:shell-only-route-probe` | pass | 0 | 447 | a route that renders only InternalShell without its workspace fails the page-kit audit |
| `consumer-page-kit-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:wrapper-contract-probe` | pass | 0 | 398 | a wrapper that renders official roots only in an unused helper fails the page-kit audit |
| `consumer-page-kit-route-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe` | pass | 0 | 464 | a route-local workspace without a component contract fails the page-kit audit |
| `consumer-page-kit-mismatched-route-contract-probe` | `corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe` | pass | 0 | 409 | a route-local component linked to a component contract for another wrapper fails the page-kit audit |
| `consumer-page-kit-default-identifier-route-probe` | `corepack pnpm consumer-page-kit:audit:default-identifier-route-probe` | pass | 0 | 399 | a route that exports a named component as default can satisfy the page-kit audit |
| `consumer-page-kit-uncovered-route-probe` | `corepack pnpm consumer-page-kit:audit:uncovered-route-probe` | pass | 0 | 399 | a discovered Internal route that is missing from page-kit config fails the page-kit audit |
| `consumer-page-kit-path-traversal-probe` | `corepack pnpm consumer-page-kit:audit:path-traversal-probe` | pass | 0 | 397 | consumer page-kit config paths outside the consumer root fail schema validation |
| `consumer-readiness-config-path-traversal-probe` | `corepack pnpm consumer-readiness-config:audit:path-traversal-probe` | pass | 0 | 394 | consumer readiness config paths outside the consumer root fail schema validation |
| `certification-scope` | `corepack pnpm certification-scope:audit` | pass | 0 | 352 | product-scoped visual certification acceptance is explicit and validated when present |
| `certification-scope-positive-probe` | `corepack pnpm certification-scope:audit:positive-probe` | pass | 0 | 393 | valid product-scoped visual certification acceptance is recognized as scoped completion |
| `certification-scope-negative-probe` | `corepack pnpm certification-scope:audit:negative-probe` | pass | 0 | 395 | invalid product-scoped visual certification acceptance fails the certification scope audit |
| `visual-certification-backlog-update` | `node scripts/audit-visual-certification-backlog.mjs` | pass | 0 | 76 | visual certification backlog evidence is regenerated from current Batch 9/11 ledgers |
| `visual-certification-backlog` | `node scripts/audit-visual-certification-backlog.mjs --check` | pass | 0 | 65 | visual certification backlog audit is parseable and current |
| `remaining-page-coverage-update` | `node scripts/audit-remaining-page-coverage.mjs` | pass | 0 | 91 | remaining page coverage evidence is regenerated from current Storybook source and static index |
| `remaining-page-coverage` | `node scripts/audit-remaining-page-coverage.mjs --check` | pass | 0 | 87 | all remaining page/image stories are present as individual static Storybook entries |
| `remaining-page-coverage-family-contract-probe` | `node scripts/probe-remaining-page-coverage-family-contract.mjs` | pass | 0 | 132 | remaining page coverage rejects owner pages that drift away from their official page-family contracts |
| `kanban-family-update` | `node scripts/audit-kanban-family.mjs` | pass | 0 | 45 | kanban family evidence is regenerated from current Operacao, Vendas, and Financeiro story sources |
| `kanban-family` | `node scripts/audit-kanban-family.mjs --check` | pass | 0 | 43 | official kanban image coverage pages use reusable page-family, filter, column, card, activity, and drawer components |
| `kanban-family-negative-probe` | `node scripts/probe-kanban-family-regression.mjs` | pass | 0 | 90 | kanban family audit rejects CrmKanbanPage regressions |
| `dashboard-family-update` | `node scripts/audit-dashboard-family.mjs` | pass | 0 | 50 | dashboard/right-panel/setup family evidence is regenerated from current story sources |
| `dashboard-family` | `node scripts/audit-dashboard-family.mjs --check` | pass | 0 | 45 | official dashboard, right-panel, and setup image coverage pages use reusable page-family wrappers and domain slots |
| `dashboard-family-negative-probe` | `node scripts/probe-dashboard-family-regression.mjs` | pass | 0 | 90 | dashboard family audit rejects CrmRightPanelPage regressions |
| `source-assets-update` | `node scripts/audit-source-assets.mjs --update` | fail | 1 | 155 | the canonical source-image manifest is regenerated from configured files, hashes, dimensions, and coverage mapping |
| `source-assets` | `node scripts/audit-source-assets.mjs --check` | fail | 1 | 152 | the configured canonical source corpus matches the versioned 101-image manifest |
| `source-assets-reconciliation-update` | `node scripts/audit-source-assets-reconciliation.mjs --update` | fail | 1 | 609 | folder/ZIP/hash/count/derivative reconciliation evidence is regenerated from the delivered source package |
| `source-assets-reconciliation` | `node scripts/audit-source-assets-reconciliation.mjs --check` | fail | 1 | 565 | the delivered source package reconciles with the configured canonical count without counting nested derivatives |
| `source-assets-reconciliation-nested-exclusion-probe` | `node scripts/probe-source-assets-reconciliation-nested-exclusion.mjs` | pass | 0 | 596 | recursive derivative images are rejected as substitutes for canonical source images |
| `full-image-page-coverage-update` | `node scripts/audit-full-image-page-coverage.mjs` | pass | 0 | 80 | full product page/source-image Storybook coverage evidence is regenerated from current image map, source assets, and static index |
| `full-image-page-coverage` | `node scripts/audit-full-image-page-coverage.mjs --check` | pass | 0 | 72 | every product page/source image target has a dedicated static Storybook image-coverage story with an exact source-image marker and official package imports |
| `full-image-page-coverage-missing-story-probe` | `node scripts/probe-full-image-page-coverage-missing-story.mjs` | pass | 0 | 122 | full product page/source-image coverage rejects missing static Storybook entries |
| `full-image-page-coverage-missing-source-marker-probe` | `node scripts/probe-full-image-page-coverage-missing-source-marker.mjs` | pass | 0 | 118 | full product page/source-image coverage rejects stories that lose their exact approved source-image marker |
| `full-image-page-coverage-misplaced-source-marker-probe` | `node scripts/probe-full-image-page-coverage-misplaced-source-marker.mjs` | pass | 0 | 119 | full product page/source-image coverage rejects source-image markers placed in a different story export |
| `full-image-page-coverage-nonofficial-import-probe` | `node scripts/probe-full-image-page-coverage-nonofficial-import.mjs` | pass | 0 | 119 | full product page/source-image coverage rejects stories that stop importing official @taliya packages |
| `full-image-page-coverage-unmapped-map-target-probe` | `node scripts/probe-full-image-page-coverage-unmapped-map-target.mjs` | pass | 0 | 121 | full product page/source-image coverage rejects Covered map rows that have no Storybook mapping |
| `reference-sheet-coverage-update` | `node scripts/audit-reference-sheet-coverage.mjs` | pass | 0 | 83 | component reference-sheet coverage is regenerated from current source hashes and static Storybook index |
| `reference-sheet-coverage` | `node scripts/audit-reference-sheet-coverage.mjs --check` | pass | 0 | 80 | all 11 active reference sheets map every named component uniquely to an official isolated story |
| `reference-sheet-coverage-missing-story-probe` | `node scripts/probe-reference-sheet-coverage-missing-story.mjs` | pass | 0 | 124 | reference-sheet coverage rejects a missing required official component story |
| `visual-certification-plan` | `node scripts/audit-visual-certification-plan.mjs --check` | pass | 0 | 114 | every incomplete image-certification row has source, story, evidence, blocker, next-action, and current evidence assertion data |
| `visual-certification-plan-negative-probe` | `node scripts/probe-visual-certification-plan-stale-ledger.mjs` | pass | 0 | 288 | stale visual evidence and pending rows without current evidence assertions fail the release-candidate gate |
| `visual-certification-plan-missing-artifact-probe` | `node scripts/probe-visual-certification-plan-missing-artifact.mjs` | pass | 0 | 168 | visual certification plan rejects ledger evidence that points at missing screenshot or metrics artifacts |
| `visual-product-review-update` | `node scripts/audit-visual-product-review.mjs` | pass | 0 | 57 | the local product-review board and review contract are regenerated from current capture evidence |
| `visual-product-review` | `node scripts/audit-visual-product-review.mjs --check` | pass | 0 | 51 | all product-review rows expose current source, render, diff, metrics, blocker, and next-action evidence without automatic approval |
| `visual-certification-capture` | `node scripts/capture-visual-certification-batch.mjs --check` | pass | 0 | 114 | every pending image with a Storybook target has current source-sized screenshot and raw pixel-diff evidence without threshold-based approval |
| `visual-certification-capture-source-contract-probe` | `node scripts/probe-visual-certification-capture-source-contract.mjs` | pass | 0 | 422 | visual capture currency ignores volatile manifest metadata and rejects changed official source image hashes |
| `audit-checks-read-only-probe` | `node scripts/probe-audit-checks-read-only.mjs` | pass | 0 | 2930 | audit check commands do not mutate tracked or untracked repository state |
| `readiness-refresh-update` | `node scripts/audit-library-readiness.mjs` | pass | 0 | 47785 | aggregate readiness evidence is regenerated after all package, family, source-image, and visual-certification reports |
| `readiness-refresh` | `node scripts/audit-library-readiness.mjs --check` | fail | 1 | 40980 | the final aggregate readiness state matches every lower-level gate updated in this release-candidate run |
| `goal-completion-update` | `node scripts/audit-goal-completion.mjs` | fail | 1 | 61 | goal completion evidence is regenerated from current reports before library acceptance is evaluated |
| `library-acceptance-update` | `node scripts/audit-library-acceptance.mjs` | pass | 0 | 46 | current Internal/library acceptance evidence is regenerated from current readiness and goal reports |
| `library-acceptance` | `node scripts/audit-library-acceptance.mjs --check` | fail | 1 | 44 | current Internal/library acceptance gate passes while global completion remains separately reported |
| `library-acceptance-positive-probe` | `node scripts/probe-library-acceptance-valid-evidence.mjs` | pass | 0 | 86 | valid Internal/library acceptance evidence is accepted in an isolated probe |
| `library-acceptance-negative-probe` | `node scripts/probe-library-acceptance-false-positive.mjs` | pass | 0 | 85 | false-positive Internal/library acceptance evidence is rejected |
| `goal-completion-refresh` | `node scripts/audit-goal-completion.mjs` | fail | 1 | 50 | goal completion evidence is refreshed after current Internal/library acceptance is evaluated |
| `library-consumption-status-update` | `node scripts/audit-library-consumption-status.mjs` | pass | 0 | 48 | compact library consumption status is regenerated from current release/readiness/acceptance/goal reports |
| `library-consumption-status` | `node scripts/audit-library-consumption-status.mjs --check` | fail | 1 | 47 | compact library consumption status passes while global completion remains separately reported |
| `library-consumption-status-positive-probe` | `node scripts/probe-library-consumption-status-valid-evidence.mjs` | pass | 0 | 88 | valid compact library consumption evidence is accepted in an isolated probe |
| `library-consumption-status-global-complete-probe` | `node scripts/probe-library-consumption-status-global-complete.mjs` | pass | 0 | 86 | complete compact library consumption evidence reports pass-global-goal when future CRM adoption is executed |
| `library-consumption-status-stale-release-probe` | `node scripts/probe-library-consumption-status-stale-release-candidate.mjs` | pass | 0 | 87 | compact library consumption evidence rejects stale release candidates that lack consumption-status gates |
| `library-consumption-status-stale-readiness-probe` | `node scripts/probe-library-consumption-status-stale-readiness.mjs` | pass | 0 | 86 | compact library consumption evidence rejects stale readiness reports that lack required aggregate gates |
| `library-consumption-status-negative-probe` | `node scripts/probe-library-consumption-status-false-positive.mjs` | pass | 0 | 87 | false-positive compact library consumption evidence is rejected |
| `crm-real-readiness-update` | `node scripts/audit-crm-real-readiness.mjs` | pass | 0 | 64 | CRM real readiness handoff is regenerated from current package, Internal, page-kit, dynamic page/drawer, bootstrap, and future-consumer evidence |
| `crm-real-readiness` | `node scripts/audit-crm-real-readiness.mjs --check` | fail | 1 | 59 | library is practically ready to start the real CRM while global adoption remains separately reported |
| `crm-real-readiness-stale-remaining-page-coverage-probe` | `node scripts/probe-crm-real-readiness-stale-remaining-page-coverage.mjs` | pass | 0 | 101 | CRM real readiness rejects stale remaining-page Storybook coverage evidence |
| `local-release-manifest-update` | `node scripts/audit-local-release-manifest.mjs --update-manifest` | pass | 0 | 51 | consumer-facing local release manifest is regenerated from current package tarballs |
| `local-release-manifest` | `node scripts/audit-local-release-manifest.mjs --check` | pass | 0 | 45 | local package manifest matches current tarball names, versions, hashes, sizes, and install order |
| `consumer-dependencies-sync-check` | `node scripts/sync-consumer-dependencies.mjs --check` | pass | 0 | 42 | the current Internal package.json @taliya/* dependency tarballs match the local release manifest |
| `consumer-dependencies-sync-stale-manifest-probe` | `node scripts/probe-consumer-dependencies-stale-manifest.mjs` | pass | 0 | 85 | stale consumer package.json tarball dependencies fail the manifest-driven dependency sync check |
| `consumer-package-install-plan` | `node scripts/install-consumer-packages.mjs --check` | pass | 0 | 43 | the current Internal consumer can reinstall manifest-derived local package tarballs from its vendor directory |
| `consumer-package-install-missing-vendor-probe` | `node scripts/probe-consumer-package-install-missing-vendor.mjs` | pass | 0 | 82 | a consumer package install plan fails when manifest-derived vendor tarballs are missing |
| `consumer-lockfile` | `node scripts/audit-consumer-lockfile.mjs --check` | pass | 0 | 46 | the current Internal package-lock.json local Taliya package entries match the local release manifest |
| `consumer-lockfile-stale-probe` | `node scripts/probe-consumer-lockfile-stale.mjs` | pass | 0 | 85 | stale package-lock resolved tarballs fail the consumer lockfile audit |
| `consumer-refresh` | `node scripts/refresh-consumer-packages.mjs --check` | pass | 0 | 286 | the current Internal consumer can run the manifest-driven package refresh flow end-to-end in check mode |
| `consumer-vendor-sync-check` | `node scripts/sync-consumer-vendor.mjs --check` | pass | 0 | 47 | the current Internal vendor directory matches the local release manifest, including tarballs and manifest |
| `consumer-vendor-sync-stale-manifest-probe` | `node scripts/probe-consumer-vendor-sync-stale-manifest.mjs` | pass | 0 | 94 | a consumer vendor directory with a stale local release manifest fails the manifest-driven sync check |
| `release-policy-update` | `node scripts/audit-release-policy.mjs` | pass | 0 | 46 | versioned local/registry release policy evidence is regenerated before release-channel checks |
| `release-policy` | `node scripts/audit-release-policy.mjs --check` | pass | 0 | 42 | release policy explicitly separates local tarball channel from future registry publication decisions |
| `release-policy-negative-probe` | `node scripts/probe-release-policy-invalid-contract.mjs` | pass | 0 | 98 | invalid release policy contracts fail instead of being accepted as release evidence |
| `release-channel-update` | `node scripts/audit-release-channel.mjs` | fail | 1 | 45 | local tarball release channel evidence is regenerated before official library readiness is checked |
| `release-channel` | `node scripts/audit-release-channel.mjs --check` | fail | 1 | 42 | the current local package release channel is reliable for consumers, while registry publication remains separately reported |
| `official-library-readiness-update` | `node scripts/audit-official-library-readiness.mjs` | fail | 1 | 47 | official library readiness evidence is regenerated from package metadata, gates, Internal consumption, CRM readiness, and goal caveats |
| `official-library-readiness` | `node scripts/audit-official-library-readiness.mjs --check` | fail | 1 | 44 | the library is ready as the official reusable consumer package set for the current scope |
| `goal-completion` | `node scripts/audit-goal-completion.mjs --check` | fail | 1 | 50 | goal-level readiness has no current-scope regression |

## Skipped

| Gate | Command | Proves |
| --- | --- | --- |
| None | None | None |
