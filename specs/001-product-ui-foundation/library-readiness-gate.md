# Library Readiness Gate

Generated: 2026-07-16T16:32:31.857Z

Status: pass

This gate aggregates the executable checks that prove current reusable-library readiness for `taliya-product-ui` and a target consumer. It is not source-image 1:1 certification.

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Report label: `default`

Distribution channel: `npm-registry`

Readiness config: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal/taliya-readiness.config.json`

## Gate Results

| Gate | Command | Status | Exit code | Duration ms | Proves |
| --- | --- | --- | ---: | ---: | --- |
| `tokens` | `corepack pnpm tokens:audit` | pass | 0 | 552 | official token governance has no new visual debt |
| `storybook-anatomy` | `corepack pnpm storybook-anatomy:audit:strict` | pass | 0 | 39 | Storybook owns no product anatomy or official component appearance while fixture geometry remains explicitly classified |
| `storybook-anatomy-override-probe` | `corepack pnpm storybook-anatomy:audit:override-probe` | pass | 0 | 79 | an official component appearance or anatomy override in Storybook CSS fails strict ownership |
| `components` | `corepack pnpm components:audit` | pass | 0 | 83 | Storybook/component architecture has valid namespaces and no unresolved primitive reuse rows |
| `domain-wrappers` | `corepack pnpm domain-wrappers:audit` | pass | 0 | 48 | retained CRM domain wrappers add explicit domain mapping or anatomy instead of empty pass-through wrappers |
| `domain-wrappers-direct-drawer-probe` | `corepack pnpm domain-wrappers:audit:direct-drawer-probe` | pass | 0 | 88 | direct <aside> drawer contracts fail instead of returning as hidden drawer-unification debt |
| `public-api` | `corepack pnpm public-api:audit` | pass | 0 | 46 | standard page kit is exported, story-covered, and documented |
| `public-api-surface` | `corepack pnpm public-api-surface:audit` | pass | 0 | 44 | public API aliases, canonical page-kit components, and CRM specializations are documented and export-valid |
| `package-boundaries` | `corepack pnpm package-boundaries:audit` | pass | 0 | 69 | standalone package dependency direction remains valid |
| `package-artifacts` | `corepack pnpm package-artifacts:audit` | pass | 0 | 80 | local tarballs contain installable, publishable, CSS-side-effect-safe, React-peer-safe, workspace-free, locally versioned, package-files-restricted, and README-documented JS, type, CSS, and package metadata entrypoints |
| `release-policy` | `corepack pnpm release-policy:audit` | pass | 0 | 38 | local tarball release policy and future registry blockers are versioned and auditable |
| `release-policy-negative-probe` | `corepack pnpm release-policy:audit:negative-probe` | pass | 0 | 76 | invalid release policy contracts fail instead of being accepted as release evidence |
| `consumer-starter-templates` | `corepack pnpm consumer-starter-templates:audit` | pass | 0 | 39 | official future CRM starter templates match the consumer page-kit config example |
| `consumer-starter-templates-route-contract-probe` | `corepack pnpm consumer-starter-templates:audit:route-contract-probe` | pass | 0 | 199 | future CRM starter route-local componentContractId links must reference existing component contracts |
| `consumer-bootstrap` | `corepack pnpm consumer-bootstrap:audit` | pass | 0 | 213 | future consumer configs and a minimal page-kit route can be bootstrapped and audited from official templates |
| `future-consumer-fixture` | `corepack pnpm future-consumer-fixture:audit` | pass | 0 | 15288 | an installed synthetic future CRM consumer can resolve public JS/CSS exports, resolve @taliya/crm/standard-page-kit, server-render official shell/filter/table/drawer components, and pass package, page-kit, config, sync, and runtime audits |
| `future-consumer-discovery` | `corepack pnpm future-consumer-discovery:audit` | pass | 0 | 52 | local sibling directories are scanned for a real future CRM consumer before goal evidence is evaluated |
| `future-consumer-discovery-negative-probe` | `corepack pnpm future-consumer-discovery:audit:negative-probe` | pass | 0 | 76 | a missing future CRM scan root fails discovery instead of being accepted as zero candidates |
| `future-consumer-discovery-partial-probe` | `corepack pnpm future-consumer-discovery:audit:partial-probe` | pass | 0 | 77 | partial future CRM evidence is not accepted as a real future CRM candidate |
| `future-consumer-discovery-positive-probe` | `corepack pnpm future-consumer-discovery:audit:positive-probe` | pass | 0 | 79 | a future CRM directory with the full consumer contract is accepted as a real future CRM candidate |
| `future-consumer-adoption` | `corepack pnpm future-consumer-adoption:audit` | pass | 0 | 39 | discovered real future CRM candidates must have matching labeled readiness evidence before adoption is considered executed |
| `future-consumer-adoption-positive-probe` | `corepack pnpm future-consumer-adoption:audit:positive-probe` | pass | 0 | 79 | a discovered future CRM candidate with matching labeled readiness evidence is accepted |
| `future-consumer-adoption-mismatch-probe` | `corepack pnpm future-consumer-adoption:audit:mismatch-probe` | pass | 0 | 79 | a discovered future CRM candidate cannot be adopted with readiness evidence for a different consumer root |
| `future-consumer-adoption-negative-probe` | `corepack pnpm future-consumer-adoption:audit:negative-probe` | pass | 0 | 77 | a discovered future CRM candidate without matching labeled readiness evidence fails the adoption audit |
| `future-crm-adoption-handoff` | `corepack pnpm future-crm-adoption-handoff:audit` | pass | 0 | 39 | future CRM adoption has a single audited handoff for candidate discovery, bootstrap, labeled evidence, and non-completion rules |
| `registry-consumer-migration-probe` | `corepack pnpm registry-consumer:migrate:probe` | pass | 0 | 1034 | registry migration requires per-package publication evidence, applies official ranges, and restores consumer manifests when npm install fails |
| `consumer-integration` | `corepack pnpm consumer:audit` | pass | 0 | 404 | target consumer installs public packages and avoids local visual clones |
| `registry-consumer-adoption` | `corepack pnpm registry-consumer-adoption:audit` | pass | 0 | 42 | target consumer dependencies, lockfile, installed packages, and readiness config use the published npm release |
| `consumer-page-kit` | `corepack pnpm consumer-page-kit:audit` | pass | 0 | 56 | target consumer imports and renders official page-kit components |
| `consumer-page-kit-shell-only-route-probe` | `corepack pnpm consumer-page-kit:audit:shell-only-route-probe` | pass | 0 | 123 | a route that renders only InternalShell without its workspace fails the page-kit audit |
| `consumer-page-kit-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:wrapper-contract-probe` | pass | 0 | 79 | a wrapper that renders official roots only in an unused helper fails the page-kit audit |
| `consumer-page-kit-route-wrapper-contract-probe` | `corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe` | pass | 0 | 80 | a route-local workspace without a component contract fails the page-kit audit |
| `consumer-page-kit-mismatched-route-contract-probe` | `corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe` | pass | 0 | 81 | a route-local component linked to a component contract for another wrapper fails the page-kit audit |
| `consumer-page-kit-default-identifier-route-probe` | `corepack pnpm consumer-page-kit:audit:default-identifier-route-probe` | pass | 0 | 80 | a route that exports a named component as default can satisfy the page-kit audit |
| `consumer-page-kit-uncovered-route-probe` | `corepack pnpm consumer-page-kit:audit:uncovered-route-probe` | pass | 0 | 81 | a discovered Internal route that is missing from page-kit config fails the page-kit audit |
| `consumer-page-kit-path-traversal-probe` | `corepack pnpm consumer-page-kit:audit:path-traversal-probe` | pass | 0 | 77 | consumer page-kit config paths outside the consumer root fail schema validation |
| `consumer-runtime` | `corepack pnpm consumer-runtime:audit` | pass | 0 | 29649 | target consumer runtime scripts pass with installed packages |
| `consumer-config-versioning` | `corepack pnpm consumer-config-versioning:audit` | pass | 0 | 77 | target consumer owns versioned readiness and page-kit config files |
| `consumer-readiness-config-path-traversal-probe` | `corepack pnpm consumer-readiness-config:audit:path-traversal-probe` | pass | 0 | 76 | consumer readiness config paths outside the consumer root fail schema validation |
| `local-readiness-runbook` | `runbook backlink check` | pass | 0 | 51 | local package refresh, consumer validation procedure, future CRM discovery, config bootstrap dry-run, versioned config check, valid consumer config examples, standard page-kit manifest, and page-kit example public API coverage |
| `certification-scope` | `corepack pnpm certification-scope:audit` | pass | 0 | 38 | product-scoped visual certification acceptance is explicit and validated when present |
| `certification-scope-positive-probe` | `corepack pnpm certification-scope:audit:positive-probe` | pass | 0 | 77 | valid product-scoped visual certification acceptance is recognized as scoped completion |
| `certification-scope-negative-probe` | `corepack pnpm certification-scope:audit:negative-probe` | pass | 0 | 77 | invalid product-scoped visual certification acceptance fails the certification scope audit |
| `visual-certification-backlog` | `corepack pnpm visual-certification-backlog:audit` | pass | 0 | 62 | current source-image certification backlog and image-coverage-map certification conflicts are regenerated from Batch 9/11 ledgers before goal evidence is checked |
| `remaining-page-coverage` | `corepack pnpm remaining-page-coverage:audit` | pass | 0 | 90 | all remaining page/image stories exist as individual static Storybook entries using official library page-composition components |
| `remaining-page-coverage-family-contract-probe` | `corepack pnpm remaining-page-coverage:audit:family-contract-probe` | pass | 0 | 129 | remaining page coverage rejects owner pages that stop using their official page-family contracts |
| `kanban-family` | `corepack pnpm kanban-family:audit` | pass | 0 | 38 | Operacao, Vendas, and Financeiro kanban pages use CrmKanbanPage, official filters, columns, card variants, and domain slots instead of story-local board anatomy |
| `kanban-family-negative-probe` | `corepack pnpm kanban-family:audit:negative-probe` | pass | 0 | 78 | kanban family audit rejects owner pages that stop using CrmKanbanPage |
| `dashboard-family` | `corepack pnpm dashboard-family:audit` | pass | 0 | 41 | Dashboard, right-panel, and setup image coverage pages use official page-family wrappers instead of story-local shell/grid anatomy |
| `dashboard-family-negative-probe` | `corepack pnpm dashboard-family:audit:negative-probe` | pass | 0 | 82 | dashboard family audit rejects owner pages that stop using CrmRightPanelPage |
| `source-assets` | `corepack pnpm source-assets:audit` | pass | 0 | 187 | every covered route target has a versioned source-image filename, hash, and dimension entry; support images remain informational |
| `source-assets-reconciliation` | `corepack pnpm source-assets:reconcile` | pass | 0 | 578 | folder, ZIP, covered route targets, hashes, duplicates, and nested derivative classifications reconcile without promoting auxiliary images |
| `source-assets-reconciliation-nested-exclusion-probe` | `corepack pnpm source-assets:reconcile:nested-exclusion-probe` | pass | 0 | 576 | recursive demo/review/onboarding derivatives cannot satisfy a missing covered route target |
| `full-image-page-coverage` | `corepack pnpm full-image-page-coverage:audit` | pass | 0 | 69 | every product page/source image target has a dedicated static Storybook image-coverage story with an exact source-image marker and official package imports |
| `full-image-page-coverage-missing-story-probe` | `corepack pnpm full-image-page-coverage:audit:missing-story-probe` | pass | 0 | 112 | a product page/source image target missing from the static Storybook index fails full image/page coverage |
| `full-image-page-coverage-missing-source-marker-probe` | `corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe` | pass | 0 | 108 | a product page/source image story without its exact source-image marker fails full image/page coverage |
| `full-image-page-coverage-misplaced-source-marker-probe` | `corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe` | pass | 0 | 109 | a product page/source image marker placed in the wrong story export fails full image/page coverage |
| `full-image-page-coverage-nonofficial-import-probe` | `corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe` | pass | 0 | 108 | a product page/source image story that stops importing official @taliya packages fails full image/page coverage |
| `full-image-page-coverage-unmapped-map-target-probe` | `corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe` | pass | 0 | 110 | a Covered product page/source image added to the image coverage map without a Storybook mapping fails full image/page coverage |
| `reference-sheet-coverage` | `corepack pnpm reference-sheet-coverage:audit` | pass | 0 | 75 | all 11 active component reference sheets map every named component uniquely to an official isolated Storybook story with matching canonical source hashes |
| `reference-sheet-coverage-missing-story-probe` | `corepack pnpm reference-sheet-coverage:audit:missing-story-probe` | pass | 0 | 115 | reference-sheet coverage rejects a missing required official component story |
| `visual-certification-plan` | `corepack pnpm visual-certification-plan:audit` | pass | 0 | 107 | every incomplete image-certification row has source, story, evidence, blocker, next-action, and current evidence assertion data for the next certification cycle |
| `visual-certification-plan-negative-probe` | `corepack pnpm visual-certification-plan:audit:negative-probe` | pass | 0 | 272 | stale visual evidence and pending rows without current evidence assertions fail the visual certification plan audit |
| `visual-certification-plan-missing-artifact-probe` | `corepack pnpm visual-certification-plan:audit:missing-artifact-probe` | pass | 0 | 154 | ledger evidence paths that no longer exist fail the visual certification plan audit |
| `visual-product-review` | `corepack pnpm visual-product-review:audit` | pass | 0 | 46 | every product-review decision row has current source, render, diff, metrics, blocker, and next-action evidence without automatic approval |
| `visual-certification-capture` | `corepack pnpm visual-certification-capture:check` | pass | 0 | 110 | every pending image with a Storybook target has current source-sized screenshot and pixel-diff evidence without automatic visual approval |
| `visual-certification-capture-source-contract-probe` | `corepack pnpm visual-certification-capture:source-contract-probe` | pass | 0 | 406 | visual capture evidence ignores volatile manifest metadata but fails when an official source image hash changes |
| `audit-checks-read-only-probe` | `corepack pnpm audit-checks:read-only-probe` | pass | 0 | 2835 | all audit --check entrypoints leave tracked and untracked repository state unchanged |
| `goal-completion` | `corepack pnpm goal-completion:audit` | pass | 0 | 43 | goal-level readiness has no current-scope regression |

## Skipped

| Gate | Command | Proves |
| --- | --- | --- |
| None | None | None |
