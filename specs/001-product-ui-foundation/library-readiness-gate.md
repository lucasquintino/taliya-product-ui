# Library Readiness Gate

Generated: 2026-07-15T18:34:35.074Z

Status: fail

This gate aggregates the executable checks that prove current reusable-library readiness for `taliya-product-ui` and a target consumer. It is not source-image 1:1 certification.

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Report label: `default`

Distribution channel: `vendor-local-tarballs`

Readiness config: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal/taliya-readiness.config.json`

## Gate Results

| Gate | Command | Status | Exit code | Duration ms | Proves |
| --- | --- | --- | ---: | ---: | --- |
| `tokens` | `corepack pnpm tokens:audit` | pass | 0 | 560 | official token governance has no new visual debt |
| `storybook-anatomy` | `corepack pnpm storybook-anatomy:audit:strict` | pass | 0 | 44 | Storybook owns no product anatomy or official component appearance while fixture geometry remains explicitly classified |
| `storybook-anatomy-override-probe` | `corepack pnpm storybook-anatomy:audit:override-probe` | pass | 0 | 84 | an official component appearance or anatomy override in Storybook CSS fails strict ownership |
| `components` | `corepack pnpm components:audit` | pass | 0 | 82 | Storybook/component architecture has valid namespaces and no unresolved primitive reuse rows |
| `domain-wrappers` | `corepack pnpm domain-wrappers:audit` | pass | 0 | 52 | retained CRM domain wrappers add explicit domain mapping or anatomy instead of empty pass-through wrappers |
| `domain-wrappers-direct-drawer-probe` | `corepack pnpm domain-wrappers:audit:direct-drawer-probe` | pass | 0 | 93 | direct <aside> drawer contracts fail instead of returning as hidden drawer-unification debt |
| `public-api` | `corepack pnpm public-api:audit` | pass | 0 | 49 | standard page kit is exported, story-covered, and documented |
| `public-api-surface` | `corepack pnpm public-api-surface:audit` | pass | 0 | 47 | public API aliases, canonical page-kit components, and CRM specializations are documented and export-valid |
| `package-boundaries` | `corepack pnpm package-boundaries:audit` | pass | 0 | 73 | standalone package dependency direction remains valid |
| `package-artifacts` | `corepack pnpm package-artifacts:audit` | pass | 0 | 104 | local tarballs contain installable, publishable, CSS-side-effect-safe, React-peer-safe, workspace-free, locally versioned, package-files-restricted, and README-documented JS, type, CSS, and package metadata entrypoints |
| `release-policy` | `corepack pnpm release-policy:audit` | pass | 0 | 40 | local tarball release policy and future registry blockers are versioned and auditable |
| `release-policy-negative-probe` | `corepack pnpm release-policy:audit:negative-probe` | pass | 0 | 85 | invalid release policy contracts fail instead of being accepted as release evidence |
| `consumer-starter-templates` | `corepack pnpm consumer-starter-templates:audit` | pass | 0 | 42 | official future CRM starter templates match the consumer page-kit config example |
| `consumer-starter-templates-route-contract-probe` | `corepack pnpm consumer-starter-templates:audit:route-contract-probe` | pass | 0 | 216 | future CRM starter route-local componentContractId links must reference existing component contracts |
| `consumer-bootstrap` | `corepack pnpm consumer-bootstrap:audit` | pass | 0 | 246 | future consumer configs and a minimal page-kit route can be bootstrapped and audited from official templates |
| `future-consumer-fixture` | `corepack pnpm future-consumer-fixture:audit` | pass | 0 | 15037 | an installed synthetic future CRM consumer can resolve public JS/CSS exports, resolve @taliya/crm/standard-page-kit, server-render official shell/filter/table/drawer components, and pass package, page-kit, config, sync, and runtime audits |
| `future-consumer-discovery` | `corepack pnpm future-consumer-discovery:audit` | pass | 0 | 56 | local sibling directories are scanned for a real future CRM consumer before goal evidence is evaluated |
| `future-consumer-discovery-negative-probe` | `corepack pnpm future-consumer-discovery:audit:negative-probe` | pass | 0 | 82 | a missing future CRM scan root fails discovery instead of being accepted as zero candidates |
| `future-consumer-discovery-partial-probe` | `corepack pnpm future-consumer-discovery:audit:partial-probe` | pass | 0 | 84 | partial future CRM evidence is not accepted as a real future CRM candidate |
| `future-consumer-discovery-positive-probe` | `corepack pnpm future-consumer-discovery:audit:positive-probe` | pass | 0 | 86 | a future CRM directory with the full consumer contract is accepted as a real future CRM candidate |
| `future-consumer-adoption` | `corepack pnpm future-consumer-adoption:audit` | pass | 0 | 41 | discovered real future CRM candidates must have matching labeled readiness evidence before adoption is considered executed |
| `future-consumer-adoption-positive-probe` | `corepack pnpm future-consumer-adoption:audit:positive-probe` | pass | 0 | 87 | a discovered future CRM candidate with matching labeled readiness evidence is accepted |
| `future-consumer-adoption-mismatch-probe` | `corepack pnpm future-consumer-adoption:audit:mismatch-probe` | pass | 0 | 85 | a discovered future CRM candidate cannot be adopted with readiness evidence for a different consumer root |
| `future-consumer-adoption-negative-probe` | `corepack pnpm future-consumer-adoption:audit:negative-probe` | pass | 0 | 85 | a discovered future CRM candidate without matching labeled readiness evidence fails the adoption audit |
| `future-crm-adoption-handoff` | `corepack pnpm future-crm-adoption-handoff:audit` | pass | 0 | 41 | future CRM adoption has a single audited handoff for candidate discovery, bootstrap, labeled evidence, and non-completion rules |
| `registry-consumer-migration-probe` | `corepack pnpm registry-consumer:migrate:probe` | pass | 0 | 643 | registry migration requires per-package publication evidence, applies official ranges, and restores consumer manifests when npm install fails |
| `consumer-dependencies-sync` | `corepack pnpm consumer-dependencies:sync:check` | pass | 0 | 44 | target consumer package.json @taliya/* dependencies match the local release manifest tarball names |
| `consumer-dependencies-sync-stale-manifest-probe` | `corepack pnpm consumer-dependencies:sync:stale-manifest-probe` | pass | 0 | 82 | stale consumer package.json tarball dependencies fail the manifest-driven dependency sync check |
| `consumer-package-install-plan` | `corepack pnpm consumer-packages:install-plan` | pass | 0 | 39 | target consumer can reinstall the manifest-derived local package tarballs from its vendor directory |
| `consumer-package-install-missing-vendor-probe` | `corepack pnpm consumer-packages:install:missing-vendor-probe` | pass | 0 | 82 | a consumer package install plan fails when manifest-derived vendor tarballs are missing |
| `consumer-lockfile` | `corepack pnpm consumer-lockfile:audit` | pass | 0 | 45 | target consumer package-lock.json local Taliya package entries match the local release manifest |
| `consumer-lockfile-stale-probe` | `corepack pnpm consumer-lockfile:audit:stale-probe` | pass | 0 | 84 | stale package-lock resolved tarballs fail the consumer lockfile audit |
| `consumer-refresh` | `corepack pnpm consumer-refresh:audit` | pass | 0 | 291 | target consumer can run the manifest-driven package refresh flow end-to-end in check mode |
| `consumer-integration` | `corepack pnpm consumer:audit` | pass | 0 | 408 | target consumer installs public packages and avoids local visual clones |
| `consumer-package-sync` | `corepack pnpm consumer-package-sync:audit` | pass | 0 | 54 | target consumer vendor tarballs and installed public package files match the latest local package artifacts |
| `consumer-package-sync-negative-probe` | `corepack pnpm consumer-package-sync:audit:negative-probe` | pass | 0 | 129 | a consumer with fresh vendor tarballs but stale installed package files fails package sync |
| `consumer-vendor-versioning` | `corepack pnpm consumer-vendor-versioning:audit` | pass | 0 | 122 | target consumer vendor tarballs are synced and tracked in the consumer repository |
| `consumer-page-kit` | `corepack pnpm consumer-page-kit:audit` | pass | 0 | 59 | target consumer imports and renders official page-kit components |
| `consumer-page-kit-shell-only-route-probe` | `corepack pnpm consumer-page-kit:audit:shell-only-route-probe` | pass | 0 | 131 | a route that renders only InternalShell without its workspace fails the page-kit audit |
| `consumer-page-kit-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:wrapper-contract-probe` | pass | 0 | 85 | a wrapper that renders official roots only in an unused helper fails the page-kit audit |
| `consumer-page-kit-route-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe` | pass | 0 | 86 | a route-local workspace without a component contract fails the page-kit audit |
| `consumer-page-kit-mismatched-route-contract-probe` | `corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe` | pass | 0 | 86 | a route-local component linked to a component contract for another wrapper fails the page-kit audit |
| `consumer-page-kit-default-identifier-route-probe` | `corepack pnpm consumer-page-kit:audit:default-identifier-route-probe` | pass | 0 | 87 | a route that exports a named component as default can satisfy the page-kit audit |
| `consumer-page-kit-uncovered-route-probe` | `corepack pnpm consumer-page-kit:audit:uncovered-route-probe` | pass | 0 | 87 | a discovered Internal route that is missing from page-kit config fails the page-kit audit |
| `consumer-page-kit-path-traversal-probe` | `corepack pnpm consumer-page-kit:audit:path-traversal-probe` | pass | 0 | 84 | consumer page-kit config paths outside the consumer root fail schema validation |
| `consumer-runtime` | `corepack pnpm consumer-runtime:audit` | pass | 0 | 35640 | target consumer runtime scripts pass with installed packages |
| `consumer-config-versioning` | `corepack pnpm consumer-config-versioning:audit` | pass | 0 | 96 | target consumer owns versioned readiness and page-kit config files |
| `consumer-readiness-config-path-traversal-probe` | `corepack pnpm consumer-readiness-config:audit:path-traversal-probe` | pass | 0 | 84 | consumer readiness config paths outside the consumer root fail schema validation |
| `local-readiness-runbook` | `runbook backlink check` | pass | 0 | 55 | local package refresh, consumer validation procedure, future CRM discovery, config bootstrap dry-run, versioned config check, valid consumer config examples, standard page-kit manifest, and page-kit example public API coverage |
| `certification-scope` | `corepack pnpm certification-scope:audit` | pass | 0 | 42 | product-scoped visual certification acceptance is explicit and validated when present |
| `certification-scope-positive-probe` | `corepack pnpm certification-scope:audit:positive-probe` | pass | 0 | 84 | valid product-scoped visual certification acceptance is recognized as scoped completion |
| `certification-scope-negative-probe` | `corepack pnpm certification-scope:audit:negative-probe` | pass | 0 | 83 | invalid product-scoped visual certification acceptance fails the certification scope audit |
| `visual-certification-backlog` | `corepack pnpm visual-certification-backlog:audit` | pass | 0 | 67 | current source-image certification backlog and image-coverage-map certification conflicts are regenerated from Batch 9/11 ledgers before goal evidence is checked |
| `remaining-page-coverage` | `corepack pnpm remaining-page-coverage:audit` | pass | 0 | 92 | all remaining page/image stories exist as individual static Storybook entries using official library page-composition components |
| `remaining-page-coverage-family-contract-probe` | `corepack pnpm remaining-page-coverage:audit:family-contract-probe` | pass | 0 | 132 | remaining page coverage rejects owner pages that stop using their official page-family contracts |
| `kanban-family` | `corepack pnpm kanban-family:audit` | pass | 0 | 40 | Operacao, Vendas, and Financeiro kanban pages use CrmKanbanPage, official filters, columns, card variants, and domain slots instead of story-local board anatomy |
| `kanban-family-negative-probe` | `corepack pnpm kanban-family:audit:negative-probe` | pass | 0 | 86 | kanban family audit rejects owner pages that stop using CrmKanbanPage |
| `dashboard-family` | `corepack pnpm dashboard-family:audit` | pass | 0 | 42 | Dashboard, right-panel, and setup image coverage pages use official page-family wrappers instead of story-local shell/grid anatomy |
| `dashboard-family-negative-probe` | `corepack pnpm dashboard-family:audit:negative-probe` | pass | 0 | 88 | dashboard family audit rejects owner pages that stop using CrmRightPanelPage |
| `source-assets` | `corepack pnpm source-assets:audit` | fail | 1 | 190 | the configured canonical source corpus matches the versioned 101-image filename, hash, dimension, and coverage manifest |
| `source-assets-reconciliation` | `corepack pnpm source-assets:reconcile` | fail | 1 | 603 | folder, ZIP, image map, canonical top-level count, hashes, duplicates, and nested derivative classifications reconcile without promoting auxiliary images |
| `source-assets-reconciliation-nested-exclusion-probe` | `corepack pnpm source-assets:reconcile:nested-exclusion-probe` | pass | 0 | 593 | recursive demo/review/onboarding derivatives cannot satisfy the canonical source-image count |
| `full-image-page-coverage` | `corepack pnpm full-image-page-coverage:audit` | pass | 0 | 71 | every product page/source image target has a dedicated static Storybook image-coverage story with an exact source-image marker and official package imports |
| `full-image-page-coverage-missing-story-probe` | `corepack pnpm full-image-page-coverage:audit:missing-story-probe` | pass | 0 | 120 | a product page/source image target missing from the static Storybook index fails full image/page coverage |
| `full-image-page-coverage-missing-source-marker-probe` | `corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe` | pass | 0 | 117 | a product page/source image story without its exact source-image marker fails full image/page coverage |
| `full-image-page-coverage-misplaced-source-marker-probe` | `corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe` | pass | 0 | 115 | a product page/source image marker placed in the wrong story export fails full image/page coverage |
| `full-image-page-coverage-nonofficial-import-probe` | `corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe` | pass | 0 | 115 | a product page/source image story that stops importing official @taliya packages fails full image/page coverage |
| `full-image-page-coverage-unmapped-map-target-probe` | `corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe` | pass | 0 | 117 | a Covered product page/source image added to the image coverage map without a Storybook mapping fails full image/page coverage |
| `reference-sheet-coverage` | `corepack pnpm reference-sheet-coverage:audit` | pass | 0 | 79 | all 11 active component reference sheets map every named component uniquely to an official isolated Storybook story with matching canonical source hashes |
| `reference-sheet-coverage-missing-story-probe` | `corepack pnpm reference-sheet-coverage:audit:missing-story-probe` | pass | 0 | 124 | reference-sheet coverage rejects a missing required official component story |
| `visual-certification-plan` | `corepack pnpm visual-certification-plan:audit` | pass | 0 | 113 | every incomplete image-certification row has source, story, evidence, blocker, next-action, and current evidence assertion data for the next certification cycle |
| `visual-certification-plan-negative-probe` | `corepack pnpm visual-certification-plan:audit:negative-probe` | pass | 0 | 285 | stale visual evidence and pending rows without current evidence assertions fail the visual certification plan audit |
| `visual-certification-plan-missing-artifact-probe` | `corepack pnpm visual-certification-plan:audit:missing-artifact-probe` | pass | 0 | 164 | ledger evidence paths that no longer exist fail the visual certification plan audit |
| `visual-product-review` | `corepack pnpm visual-product-review:audit` | pass | 0 | 50 | every product-review decision row has current source, render, diff, metrics, blocker, and next-action evidence without automatic approval |
| `visual-certification-capture` | `corepack pnpm visual-certification-capture:check` | pass | 0 | 112 | every pending image with a Storybook target has current source-sized screenshot and pixel-diff evidence without automatic visual approval |
| `visual-certification-capture-source-contract-probe` | `corepack pnpm visual-certification-capture:source-contract-probe` | pass | 0 | 429 | visual capture evidence ignores volatile manifest metadata but fails when an official source image hash changes |
| `audit-checks-read-only-probe` | `corepack pnpm audit-checks:read-only-probe` | pass | 0 | 2963 | all audit --check entrypoints leave tracked and untracked repository state unchanged |
| `goal-completion` | `corepack pnpm goal-completion:audit` | pass | 0 | 46 | goal-level readiness has no current-scope regression |

## Skipped

| Gate | Command | Proves |
| --- | --- | --- |
| None | None | None |
