import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const checkMode = process.argv.includes("--check");
const reportJsonPath = resolve(specDir, "release-candidate-audit.json");
const reportMdPath = resolve(specDir, "release-candidate-audit.md");

function runCommand(commandText, timeoutMs = 300000) {
  const startedAt = Date.now();
  const command = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "sh";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", commandText] : ["-c", commandText];
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      TALIYA_RELEASE_CANDIDATE_IN_PROGRESS: "1"
    },
    maxBuffer: 1024 * 1024 * 80,
    timeout: timeoutMs
  });
  const timedOut = result.error?.code === "ETIMEDOUT";

  return {
    commandText,
    status: result.status === 0 && !result.error ? "pass" : "fail",
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    timedOut,
    stdoutTail: (result.stdout ?? "").trim().split(/\r?\n/).slice(-20),
    stderrTail: [
      result.error ? `${result.error.name}: ${result.error.message}` : "",
      ...(result.stderr ?? "").trim().split(/\r?\n/).filter(Boolean).slice(-20)
    ].filter(Boolean)
  };
}

const gateDefinitions = [
  {
    id: "typecheck",
    commandText: "corepack pnpm typecheck",
    timeoutMs: 120000,
    proves: "package and docs TypeScript contracts compile"
  },
  {
    id: "lint",
    commandText: "corepack pnpm lint",
    timeoutMs: 180000,
    proves: "package lint rules pass"
  },
  {
    id: "test",
    commandText: "corepack pnpm test",
    timeoutMs: 360000,
    proves: "package tests and Storybook smoke pass"
  },
  {
    id: "build",
    commandText: "corepack pnpm build",
    timeoutMs: 1200000,
    proves: "packages and static Storybook build"
  },
  {
    id: "readiness",
    commandText: "corepack pnpm readiness:audit",
    timeoutMs: 360000,
    proves: "library, Internal consumer, and synthetic future consumer readiness gates pass"
  },
  {
    id: "storybook-anatomy",
    commandText: "corepack pnpm storybook-anatomy:audit:strict",
    timeoutMs: 60000,
    proves: "Storybook owns no product anatomy or official component appearance while fixture geometry remains explicitly classified"
  },
  {
    id: "storybook-anatomy-override-probe",
    commandText: "corepack pnpm storybook-anatomy:audit:override-probe",
    timeoutMs: 60000,
    proves: "Storybook strict ownership rejects an injected official component appearance override"
  },
  {
    id: "domain-wrappers",
    commandText: "corepack pnpm domain-wrappers:audit",
    timeoutMs: 60000,
    proves: "retained CRM table/drawer wrappers add explicit domain mapping or anatomy instead of empty pass-through wrappers"
  },
  {
    id: "domain-wrappers-direct-drawer-probe",
    commandText: "corepack pnpm domain-wrappers:audit:direct-drawer-probe",
    timeoutMs: 60000,
    proves: "direct <aside> drawer contracts fail instead of returning as hidden drawer-unification debt"
  },
  {
    id: "consumer-starter-templates-route-contract-probe",
    commandText: "corepack pnpm consumer-starter-templates:audit:route-contract-probe",
    timeoutMs: 60000,
    proves: "future CRM starter route-local componentContractId links fail when missing or dangling"
  },
  {
    id: "future-consumer-discovery",
    commandText: "corepack pnpm future-consumer-discovery:audit",
    timeoutMs: 60000,
    proves: "local sibling directories are scanned for a real future CRM consumer before goal evidence is evaluated"
  },
  {
    id: "future-consumer-discovery-negative-probe",
    commandText: "corepack pnpm future-consumer-discovery:audit:negative-probe",
    timeoutMs: 60000,
    proves: "a missing future CRM scan root fails discovery instead of being accepted as zero candidates"
  },
  {
    id: "future-consumer-discovery-partial-probe",
    commandText: "corepack pnpm future-consumer-discovery:audit:partial-probe",
    timeoutMs: 60000,
    proves: "partial future CRM evidence is not accepted as a real future CRM candidate"
  },
  {
    id: "future-consumer-discovery-positive-probe",
    commandText: "corepack pnpm future-consumer-discovery:audit:positive-probe",
    timeoutMs: 60000,
    proves: "a future CRM directory with the full consumer contract is accepted as a real future CRM candidate"
  },
  {
    id: "future-consumer-adoption",
    commandText: "corepack pnpm future-consumer-adoption:audit",
    timeoutMs: 60000,
    proves: "discovered real future CRM candidates must have matching labeled readiness evidence before adoption is considered executed"
  },
  {
    id: "future-consumer-adoption-positive-probe",
    commandText: "corepack pnpm future-consumer-adoption:audit:positive-probe",
    timeoutMs: 60000,
    proves: "a discovered future CRM candidate with matching labeled readiness evidence is accepted"
  },
  {
    id: "future-consumer-adoption-mismatch-probe",
    commandText: "corepack pnpm future-consumer-adoption:audit:mismatch-probe",
    timeoutMs: 60000,
    proves: "a discovered future CRM candidate cannot be adopted with readiness evidence for a different consumer root"
  },
  {
    id: "future-consumer-adoption-negative-probe",
    commandText: "corepack pnpm future-consumer-adoption:audit:negative-probe",
    timeoutMs: 60000,
    proves: "a discovered future CRM candidate without matching labeled readiness evidence fails the adoption audit"
  },
  {
    id: "future-crm-adoption-handoff",
    commandText: "corepack pnpm future-crm-adoption-handoff:audit",
    timeoutMs: 60000,
    proves: "future CRM adoption handoff is present, linked, and carries the non-completion rule"
  },
  {
    id: "consumer-package-sync-negative-probe",
    commandText: "corepack pnpm consumer-package-sync:audit:negative-probe",
    timeoutMs: 60000,
    proves: "fresh consumer vendor tarballs with stale installed package files fail package sync"
  },
  {
    id: "consumer-installed-contract-markers",
    commandText: "corepack pnpm consumer:audit",
    timeoutMs: 120000,
    proves: "installed Internal packages expose current public contract markers, including drawer-size API/CSS, content-drawer full-width topbar CSS, compact checklist drawer tokens, and checklist drawer header/rhythm CSS"
  },
  {
    id: "consumer-page-kit-shell-only-route-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:shell-only-route-probe",
    timeoutMs: 60000,
    proves: "a route that renders only InternalShell without its workspace fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-wrapper-contract-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:wrapper-contract-probe",
    timeoutMs: 60000,
    proves: "a wrapper that renders official roots only in an unused helper fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-route-wrapper-contract-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe",
    timeoutMs: 60000,
    proves: "a route-local workspace without a component contract fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-mismatched-route-contract-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe",
    timeoutMs: 60000,
    proves: "a route-local component linked to a component contract for another wrapper fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-default-identifier-route-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:default-identifier-route-probe",
    timeoutMs: 60000,
    proves: "a route that exports a named component as default can satisfy the page-kit audit"
  },
  {
    id: "consumer-page-kit-uncovered-route-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:uncovered-route-probe",
    timeoutMs: 60000,
    proves: "a discovered Internal route that is missing from page-kit config fails the page-kit audit"
  },
  {
    id: "consumer-page-kit-path-traversal-probe",
    commandText: "corepack pnpm consumer-page-kit:audit:path-traversal-probe",
    timeoutMs: 60000,
    proves: "consumer page-kit config paths outside the consumer root fail schema validation"
  },
  {
    id: "consumer-readiness-config-path-traversal-probe",
    commandText: "corepack pnpm consumer-readiness-config:audit:path-traversal-probe",
    timeoutMs: 60000,
    proves: "consumer readiness config paths outside the consumer root fail schema validation"
  },
  {
    id: "certification-scope",
    commandText: "corepack pnpm certification-scope:audit",
    timeoutMs: 60000,
    proves: "product-scoped visual certification acceptance is explicit and validated when present"
  },
  {
    id: "certification-scope-positive-probe",
    commandText: "corepack pnpm certification-scope:audit:positive-probe",
    timeoutMs: 60000,
    proves: "valid product-scoped visual certification acceptance is recognized as scoped completion"
  },
  {
    id: "certification-scope-negative-probe",
    commandText: "corepack pnpm certification-scope:audit:negative-probe",
    timeoutMs: 60000,
    proves: "invalid product-scoped visual certification acceptance fails the certification scope audit"
  },
  {
    id: "visual-certification-backlog-update",
    commandText: "node scripts/audit-visual-certification-backlog.mjs",
    timeoutMs: 60000,
    proves: "visual certification backlog evidence is regenerated from current Batch 9/11 ledgers"
  },
  {
    id: "visual-certification-backlog",
    commandText: "node scripts/audit-visual-certification-backlog.mjs --check",
    timeoutMs: 60000,
    proves: "visual certification backlog audit is parseable and current"
  },
  {
    id: "remaining-page-coverage-update",
    commandText: "node scripts/audit-remaining-page-coverage.mjs",
    timeoutMs: 60000,
    proves: "remaining page coverage evidence is regenerated from current Storybook source and static index"
  },
  {
    id: "remaining-page-coverage",
    commandText: "node scripts/audit-remaining-page-coverage.mjs --check",
    timeoutMs: 60000,
    proves: "all remaining page/image stories are present as individual static Storybook entries"
  },
  {
    id: "remaining-page-coverage-family-contract-probe",
    commandText: "node scripts/probe-remaining-page-coverage-family-contract.mjs",
    timeoutMs: 60000,
    proves: "remaining page coverage rejects owner pages that drift away from their official page-family contracts"
  },
  {
    id: "kanban-family-update",
    commandText: "node scripts/audit-kanban-family.mjs",
    timeoutMs: 60000,
    proves: "kanban family evidence is regenerated from current Operacao, Vendas, and Financeiro story sources"
  },
  {
    id: "kanban-family",
    commandText: "node scripts/audit-kanban-family.mjs --check",
    timeoutMs: 60000,
    proves: "official kanban image coverage pages use reusable page-family, filter, column, card, activity, and drawer components"
  },
  {
    id: "kanban-family-negative-probe",
    commandText: "node scripts/probe-kanban-family-regression.mjs",
    timeoutMs: 60000,
    proves: "kanban family audit rejects CrmKanbanPage regressions"
  },
  {
    id: "dashboard-family-update",
    commandText: "node scripts/audit-dashboard-family.mjs",
    timeoutMs: 60000,
    proves: "dashboard/right-panel/setup family evidence is regenerated from current story sources"
  },
  {
    id: "dashboard-family",
    commandText: "node scripts/audit-dashboard-family.mjs --check",
    timeoutMs: 60000,
    proves: "official dashboard, right-panel, and setup image coverage pages use reusable page-family wrappers and domain slots"
  },
  {
    id: "dashboard-family-negative-probe",
    commandText: "node scripts/probe-dashboard-family-regression.mjs",
    timeoutMs: 60000,
    proves: "dashboard family audit rejects CrmRightPanelPage regressions"
  },
  {
    id: "source-assets-update",
    commandText: "node scripts/audit-source-assets.mjs --update",
    timeoutMs: 60000,
    proves: "the canonical source-image manifest is regenerated from configured files, hashes, dimensions, and coverage mapping"
  },
  {
    id: "source-assets",
    commandText: "node scripts/audit-source-assets.mjs --check",
    timeoutMs: 60000,
    proves: "the configured canonical source corpus matches the versioned 101-image manifest"
  },
  {
    id: "source-assets-reconciliation-update",
    commandText: "node scripts/audit-source-assets-reconciliation.mjs --update",
    timeoutMs: 60000,
    proves: "folder/ZIP/hash/count/derivative reconciliation evidence is regenerated from the delivered source package"
  },
  {
    id: "source-assets-reconciliation",
    commandText: "node scripts/audit-source-assets-reconciliation.mjs --check",
    timeoutMs: 60000,
    proves: "the delivered source package reconciles with the configured canonical count without counting nested derivatives"
  },
  {
    id: "source-assets-reconciliation-nested-exclusion-probe",
    commandText: "node scripts/probe-source-assets-reconciliation-nested-exclusion.mjs",
    timeoutMs: 60000,
    proves: "recursive derivative images are rejected as substitutes for canonical source images"
  },
  {
    id: "full-image-page-coverage-update",
    commandText: "node scripts/audit-full-image-page-coverage.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image Storybook coverage evidence is regenerated from current image map, source assets, and static index"
  },
  {
    id: "full-image-page-coverage",
    commandText: "node scripts/audit-full-image-page-coverage.mjs --check",
    timeoutMs: 60000,
    proves: "every product page/source image target has a dedicated static Storybook image-coverage story with an exact source-image marker and official package imports"
  },
  {
    id: "full-image-page-coverage-missing-story-probe",
    commandText: "node scripts/probe-full-image-page-coverage-missing-story.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image coverage rejects missing static Storybook entries"
  },
  {
    id: "full-image-page-coverage-missing-source-marker-probe",
    commandText: "node scripts/probe-full-image-page-coverage-missing-source-marker.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image coverage rejects stories that lose their exact approved source-image marker"
  },
  {
    id: "full-image-page-coverage-misplaced-source-marker-probe",
    commandText: "node scripts/probe-full-image-page-coverage-misplaced-source-marker.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image coverage rejects source-image markers placed in a different story export"
  },
  {
    id: "full-image-page-coverage-nonofficial-import-probe",
    commandText: "node scripts/probe-full-image-page-coverage-nonofficial-import.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image coverage rejects stories that stop importing official @taliya packages"
  },
  {
    id: "full-image-page-coverage-unmapped-map-target-probe",
    commandText: "node scripts/probe-full-image-page-coverage-unmapped-map-target.mjs",
    timeoutMs: 60000,
    proves: "full product page/source-image coverage rejects Covered map rows that have no Storybook mapping"
  },
  {
    id: "reference-sheet-coverage-update",
    commandText: "node scripts/audit-reference-sheet-coverage.mjs",
    timeoutMs: 60000,
    proves: "component reference-sheet coverage is regenerated from current source hashes and static Storybook index"
  },
  {
    id: "reference-sheet-coverage",
    commandText: "node scripts/audit-reference-sheet-coverage.mjs --check",
    timeoutMs: 60000,
    proves: "all 11 active reference sheets map every named component uniquely to an official isolated story"
  },
  {
    id: "reference-sheet-coverage-missing-story-probe",
    commandText: "node scripts/probe-reference-sheet-coverage-missing-story.mjs",
    timeoutMs: 60000,
    proves: "reference-sheet coverage rejects a missing required official component story"
  },
  {
    id: "visual-certification-plan",
    commandText: "node scripts/audit-visual-certification-plan.mjs --check",
    timeoutMs: 60000,
    proves: "every incomplete image-certification row has source, story, evidence, blocker, next-action, and current evidence assertion data"
  },
  {
    id: "visual-certification-plan-negative-probe",
    commandText: "node scripts/probe-visual-certification-plan-stale-ledger.mjs",
    timeoutMs: 60000,
    proves: "stale visual evidence and pending rows without current evidence assertions fail the release-candidate gate"
  },
  {
    id: "visual-certification-plan-missing-artifact-probe",
    commandText: "node scripts/probe-visual-certification-plan-missing-artifact.mjs",
    timeoutMs: 60000,
    proves: "visual certification plan rejects ledger evidence that points at missing screenshot or metrics artifacts"
  },
  {
    id: "visual-product-review-update",
    commandText: "node scripts/audit-visual-product-review.mjs",
    timeoutMs: 60000,
    proves: "the local product-review board and review contract are regenerated from current capture evidence"
  },
  {
    id: "visual-product-review",
    commandText: "node scripts/audit-visual-product-review.mjs --check",
    timeoutMs: 60000,
    proves: "all product-review rows expose current source, render, diff, metrics, blocker, and next-action evidence without automatic approval"
  },
  {
    id: "visual-certification-capture",
    commandText: "node scripts/capture-visual-certification-batch.mjs --check",
    timeoutMs: 60000,
    proves: "every pending image with a Storybook target has current source-sized screenshot and raw pixel-diff evidence without threshold-based approval"
  },
  {
    id: "visual-certification-capture-source-contract-probe",
    commandText: "node scripts/probe-visual-certification-capture-source-contract.mjs",
    timeoutMs: 60000,
    proves: "visual capture currency ignores volatile manifest metadata and rejects changed official source image hashes"
  },
  {
    id: "audit-checks-read-only-probe",
    commandText: "node scripts/probe-audit-checks-read-only.mjs",
    timeoutMs: 180000,
    proves: "audit check commands do not mutate tracked or untracked repository state"
  },
  {
    id: "readiness-refresh-update",
    commandText: "node scripts/audit-library-readiness.mjs",
    timeoutMs: 360000,
    proves: "aggregate readiness evidence is regenerated after all package, family, source-image, and visual-certification reports"
  },
  {
    id: "readiness-refresh",
    commandText: "node scripts/audit-library-readiness.mjs --check",
    timeoutMs: 360000,
    proves: "the final aggregate readiness state matches every lower-level gate updated in this release-candidate run"
  },
  {
    id: "goal-completion-update",
    commandText: "node scripts/audit-goal-completion.mjs",
    timeoutMs: 60000,
    proves: "goal completion evidence is regenerated from current reports before library acceptance is evaluated"
  },
  {
    id: "library-acceptance-update",
    commandText: "node scripts/audit-library-acceptance.mjs",
    timeoutMs: 60000,
    proves: "current Internal/library acceptance evidence is regenerated from current readiness and goal reports"
  },
  {
    id: "library-acceptance",
    commandText: "node scripts/audit-library-acceptance.mjs --check",
    timeoutMs: 60000,
    proves: "current Internal/library acceptance gate passes while global completion remains separately reported"
  },
  {
    id: "library-acceptance-positive-probe",
    commandText: "node scripts/probe-library-acceptance-valid-evidence.mjs",
    timeoutMs: 60000,
    proves: "valid Internal/library acceptance evidence is accepted in an isolated probe"
  },
  {
    id: "library-acceptance-negative-probe",
    commandText: "node scripts/probe-library-acceptance-false-positive.mjs",
    timeoutMs: 60000,
    proves: "false-positive Internal/library acceptance evidence is rejected"
  },
  {
    id: "goal-completion-refresh",
    commandText: "node scripts/audit-goal-completion.mjs",
    timeoutMs: 60000,
    proves: "goal completion evidence is refreshed after current Internal/library acceptance is evaluated"
  },
  {
    id: "library-consumption-status-update",
    commandText: "node scripts/audit-library-consumption-status.mjs",
    timeoutMs: 60000,
    proves: "compact library consumption status is regenerated from current release/readiness/acceptance/goal reports"
  },
  {
    id: "library-consumption-status",
    commandText: "node scripts/audit-library-consumption-status.mjs --check",
    timeoutMs: 60000,
    proves: "compact library consumption status passes while global completion remains separately reported"
  },
  {
    id: "library-consumption-status-positive-probe",
    commandText: "node scripts/probe-library-consumption-status-valid-evidence.mjs",
    timeoutMs: 60000,
    proves: "valid compact library consumption evidence is accepted in an isolated probe"
  },
  {
    id: "library-consumption-status-global-complete-probe",
    commandText: "node scripts/probe-library-consumption-status-global-complete.mjs",
    timeoutMs: 60000,
    proves: "complete compact library consumption evidence reports pass-global-goal when future CRM adoption is executed"
  },
  {
    id: "library-consumption-status-stale-release-probe",
    commandText: "node scripts/probe-library-consumption-status-stale-release-candidate.mjs",
    timeoutMs: 60000,
    proves: "compact library consumption evidence rejects stale release candidates that lack consumption-status gates"
  },
  {
    id: "library-consumption-status-stale-readiness-probe",
    commandText: "node scripts/probe-library-consumption-status-stale-readiness.mjs",
    timeoutMs: 60000,
    proves: "compact library consumption evidence rejects stale readiness reports that lack required aggregate gates"
  },
  {
    id: "library-consumption-status-negative-probe",
    commandText: "node scripts/probe-library-consumption-status-false-positive.mjs",
    timeoutMs: 60000,
    proves: "false-positive compact library consumption evidence is rejected"
  },
  {
    id: "crm-real-readiness-update",
    commandText: "node scripts/audit-crm-real-readiness.mjs",
    timeoutMs: 60000,
    proves: "CRM real readiness handoff is regenerated from current package, Internal, page-kit, dynamic page/drawer, bootstrap, and future-consumer evidence"
  },
  {
    id: "crm-real-readiness",
    commandText: "node scripts/audit-crm-real-readiness.mjs --check",
    timeoutMs: 60000,
    proves: "library is practically ready to start the real CRM while global adoption remains separately reported"
  },
  {
    id: "crm-real-readiness-stale-remaining-page-coverage-probe",
    commandText: "node scripts/probe-crm-real-readiness-stale-remaining-page-coverage.mjs",
    timeoutMs: 60000,
    proves: "CRM real readiness rejects stale remaining-page Storybook coverage evidence"
  },
  {
    id: "local-release-manifest-update",
    commandText: "node scripts/audit-local-release-manifest.mjs --update-manifest",
    timeoutMs: 60000,
    proves: "consumer-facing local release manifest is regenerated from current package tarballs"
  },
  {
    id: "local-release-manifest",
    commandText: "node scripts/audit-local-release-manifest.mjs --check",
    timeoutMs: 60000,
    proves: "local package manifest matches current tarball names, versions, hashes, sizes, and install order"
  },
  {
    id: "consumer-dependencies-sync-check",
    commandText: "node scripts/sync-consumer-dependencies.mjs --check",
    timeoutMs: 60000,
    proves: "the current Internal package.json @taliya/* dependency tarballs match the local release manifest"
  },
  {
    id: "consumer-dependencies-sync-stale-manifest-probe",
    commandText: "node scripts/probe-consumer-dependencies-stale-manifest.mjs",
    timeoutMs: 60000,
    proves: "stale consumer package.json tarball dependencies fail the manifest-driven dependency sync check"
  },
  {
    id: "consumer-package-install-plan",
    commandText: "node scripts/install-consumer-packages.mjs --check",
    timeoutMs: 60000,
    proves: "the current Internal consumer can reinstall manifest-derived local package tarballs from its vendor directory"
  },
  {
    id: "consumer-package-install-missing-vendor-probe",
    commandText: "node scripts/probe-consumer-package-install-missing-vendor.mjs",
    timeoutMs: 60000,
    proves: "a consumer package install plan fails when manifest-derived vendor tarballs are missing"
  },
  {
    id: "consumer-lockfile",
    commandText: "node scripts/audit-consumer-lockfile.mjs --check",
    timeoutMs: 60000,
    proves: "the current Internal package-lock.json local Taliya package entries match the local release manifest"
  },
  {
    id: "consumer-lockfile-stale-probe",
    commandText: "node scripts/probe-consumer-lockfile-stale.mjs",
    timeoutMs: 60000,
    proves: "stale package-lock resolved tarballs fail the consumer lockfile audit"
  },
  {
    id: "consumer-refresh",
    commandText: "node scripts/refresh-consumer-packages.mjs --check",
    timeoutMs: 120000,
    proves: "the current Internal consumer can run the manifest-driven package refresh flow end-to-end in check mode"
  },
  {
    id: "consumer-vendor-sync-check",
    commandText: "node scripts/sync-consumer-vendor.mjs --check",
    timeoutMs: 60000,
    proves: "the current Internal vendor directory matches the local release manifest, including tarballs and manifest"
  },
  {
    id: "consumer-vendor-sync-stale-manifest-probe",
    commandText: "node scripts/probe-consumer-vendor-sync-stale-manifest.mjs",
    timeoutMs: 60000,
    proves: "a consumer vendor directory with a stale local release manifest fails the manifest-driven sync check"
  },
  {
    id: "release-policy-update",
    commandText: "node scripts/audit-release-policy.mjs",
    timeoutMs: 60000,
    proves: "versioned local/registry release policy evidence is regenerated before release-channel checks"
  },
  {
    id: "release-policy",
    commandText: "node scripts/audit-release-policy.mjs --check",
    timeoutMs: 60000,
    proves: "release policy explicitly separates local tarball channel from future registry publication decisions"
  },
  {
    id: "release-policy-negative-probe",
    commandText: "node scripts/probe-release-policy-invalid-contract.mjs",
    timeoutMs: 60000,
    proves: "invalid release policy contracts fail instead of being accepted as release evidence"
  },
  {
    id: "release-channel-update",
    commandText: "node scripts/audit-release-channel.mjs",
    timeoutMs: 60000,
    proves: "local tarball release channel evidence is regenerated before official library readiness is checked"
  },
  {
    id: "release-channel",
    commandText: "node scripts/audit-release-channel.mjs --check",
    timeoutMs: 60000,
    proves: "the current local package release channel is reliable for consumers, while registry publication remains separately reported"
  },
  {
    id: "official-library-readiness-update",
    commandText: "node scripts/audit-official-library-readiness.mjs",
    timeoutMs: 60000,
    proves: "official library readiness evidence is regenerated from package metadata, gates, Internal consumption, CRM readiness, and goal caveats"
  },
  {
    id: "official-library-readiness",
    commandText: "node scripts/audit-official-library-readiness.mjs --check",
    timeoutMs: 60000,
    proves: "the library is ready as the official reusable consumer package set for the current scope"
  },
  {
    id: "goal-completion",
    commandText: "node scripts/audit-goal-completion.mjs --check",
    timeoutMs: 60000,
    proves: "goal-level readiness has no current-scope regression"
  }
];
const gates = checkMode
  ? gateDefinitions.filter((gate) => !gate.id.endsWith("-update"))
  : gateDefinitions;

const rows = [];
for (const gate of gates) {
  const row = {
    ...gate,
    ...runCommand(gate.commandText, gate.timeoutMs)
  };
  rows.push(row);
  if (checkMode && row.status !== "pass") break;
}

const failedRows = rows.filter((row) => row.status !== "pass");
const report = {
  generatedAt: new Date().toISOString(),
  status: failedRows.length === 0 && rows.length === gates.length ? "pass" : "fail",
  checkMode,
  rows,
  skipped: gates.slice(rows.length).map((gate) => ({
    id: gate.id,
    commandText: gate.commandText,
    proves: gate.proves
  })),
  note: "This is technical release-candidate evidence. It is not global source-image 1:1 certification."
};

if (!checkMode) writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const rowMarkdown = rows
  .map((row) => `| \`${row.id}\` | \`${row.commandText}\` | ${row.status} | ${row.exitCode ?? "n/a"} | ${row.durationMs} | ${row.proves} |`)
  .join("\n");
const skippedMarkdown = report.skipped.length
  ? report.skipped.map((row) => `| \`${row.id}\` | \`${row.commandText}\` | ${row.proves} |`).join("\n")
  : "| None | None | None |";

if (!checkMode) writeFileSync(
  reportMdPath,
  `# Release Candidate Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This audit is the technical release-candidate gate for \`taliya-product-ui\`. It proves package health, build health, current Internal readiness, synthetic future-consumer readiness, local future-consumer discovery, compact library consumption status, and current goal evidence. It is not global source-image 1:1 certification.

## Gate Results

| Gate | Command | Status | Exit code | Duration ms | Proves |
| --- | --- | --- | ---: | ---: | --- |
${rowMarkdown}

## Skipped

| Gate | Command | Proves |
| --- | --- | --- |
${skippedMarkdown}
`
);

console.log(`Release candidate audit: ${report.status}`);
if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/release-candidate-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/release-candidate-audit.json");
}

if (checkMode && report.status !== "pass") {
  console.error(`Failed release candidate gates: ${failedRows.map((row) => row.id).join(", ") || "incomplete"}`);
  process.exit(1);
}
