# Tasks: Engineering Quality Hardening

**Feature**: `006-engineering-quality-hardening`
**Status**: `BLOCKED BY GATE-SDD-APPROVED`
**Implementation authorization**: `NO`
**Task range**: `T101-T176`

## Non-Negotiable Start Gate

No task in this file may be started, assigned, partially implemented, or marked complete until all conditions below are true:

1. `checklists/requirements.md` and `checklists/sdd-readiness.md` contain no unresolved item.
2. Spec Kit analysis reports no critical inconsistency, uncovered requirement, or unresolved placeholder.
3. `approval.md` records the user's explicit approval as `APPROVED_FOR_IMPLEMENTATION`.
4. The implementation base revision and clean/dirty state are recorded before the first product or tooling change.

Until then, every task below is blocked by `GATE-SDD-APPROVED`, even when its dependencies or parallel markers would otherwise permit execution.

## Task Format

- `[P]` means the task may run in parallel with other tasks in the same phase after its listed dependencies pass.
- `[USn]` identifies the primary user story; a task can satisfy additional stories through the traceability matrix.
- Every task names the principal repository paths it is expected to create or change and the evidence needed to close it.
- A checkpoint task cannot pass from prose, build success, or aggregate counts alone; it must consume the named same-revision evidence.

## Wave 1 / P1 - Governance and Source of Truth

**Goal**: make project instructions, rules, skills, change profiles, precedence, and historical Spec Kit status portable and machine-verifiable.
**Entry**: `GATE-SDD-APPROVED`.
**Exit**: `G-GOV` passes its positive, negative, match, and non-match probes.

- [x] T101 [P] [US1] Add failing schema and semantic fixture tests for the single policy file and waiver records in `scripts/quality/__tests__/governance-policy.test.mjs`, `scripts/quality/__tests__/waiver-policy.test.mjs`, `tests/fixtures/governance/quality-policy/`, and `tests/fixtures/governance/waivers/`; evidence: malformed rule metadata, any profile outside `sdd-only`, `governance`, `documentation-only`, `tokens`, `ui-component`, `crm-component`, `storybook-docs`, `dependency-build`, `workflow-release`, or `full`, any unknown gate ID, and every invalid waiver shape/semantic fail while canonical fixtures pass. Verified with `node --test scripts/quality/__tests__/governance-policy.test.mjs scripts/quality/__tests__/waiver-policy.test.mjs` (13/13) and ESLint.
- [x] T102 [P] [US1] Materialize the sole versioned registry for rules, the ten canonical change profiles, the complete gate inventory, budgets, and waiver policy in `governance/quality-policy.json`, with ownership guidance in `governance/README.md`; evidence: the JSON file validates against `specs/006-engineering-quality-hardening/contracts/quality-policy.schema.json`, contains exactly the profile and gate IDs from `ci-gate-matrix.md`, and no parallel YAML or split rule/profile catalog exists. Verified with Draft 2020-12 validation: 10 profiles, 23 gates, one canonical JSON registry.
- [x] T103 [US1] After T101 and T102, implement the governance/reference validator in `scripts/quality/validate-governance.mjs` and the complete waiver validator in `scripts/quality/validate-waivers.mjs`; evidence: duplicate or unknown IDs, broken references, missing owners/enforcement, contradictory status, forbidden waiver categories, severity violations, scope broadening, owner/approver collision, missing removal issue or compensating evidence, invalid approval revision, and expiry beyond 60 days all fail with stable codes, while valid waivers serialize status as `risk-accepted`. Verified canonical policy and empty waiver registry with both validators; T101's 13 controlled fixtures prove stable semantic failures.
- [x] T104 [P] [US1] Refactor root and scoped instruction routing in `AGENTS.md`, `packages/tokens/AGENTS.md`, `packages/ui/AGENTS.md`, `packages/crm/AGENTS.md`, and `apps/docs/AGENTS.md`; evidence: root invariants remain authoritative and scoped instructions add no silent weakening. Verified all four nested files explicitly inherit root instructions and preserve package direction, API, test, visual, and approval boundaries.
- [x] T105 [P] [US1] Restore versioned repository-local mandatory skills and verify their manifest in `.agents/skills/`, `.specify/integrations/codex.manifest.json`, and `scripts/quality/validate-skills.mjs`; evidence: a clean clone discovers every referenced skill without a machine-specific path. Verified nine manifest entries, repository-relative paths, content hashes, metadata, and no machine-specific paths with `node scripts/quality/validate-skills.mjs`.
- [x] T106 [P] [US1] Separate command-execution controls from engineering standards in `.codex/rules/` and add match/non-match fixtures in `tests/fixtures/codex-rules/`; evidence: every rule has at least one expected match and one expected non-match. Verified three command-only controls plus six canonical match/non-match cases with `node scripts/quality/validate-codex-rules.mjs`.
- [x] T107 [US1] Reconcile the active feature and historical Spec Kits in `.specify/feature.json`, `specs/README.md`, and the relevant `specs/001-*` through `specs/005-*` status sections without retroactively claiming unexecuted work; evidence: exactly one active feature/phase/authorization state and an explicit precedence chain. Verified with `node scripts/quality/validate-spec-status.mjs`; 006 is the sole active implementation feature and 001-005 are explicitly historical with no inherited authorization.
- [x] T108 [US1] Add governance negative probes to `scripts/quality/probe-governance-gate.mjs` and wire them into the root scripts in `package.json`; evidence: each controlled policy violation makes the direct and aggregate command non-zero and identifies the violated stable ID. Verified direct and aggregate probes for unknown gate, non-blocking gate, and unknown profile with stable failure codes.
- [x] T109 [US1] Run the clean-clone `G-GOV` checkpoint and publish same-revision evidence under `artifacts/quality/g-governance.json`; evidence: clean tree, source revision, policy/config hashes, runner identity, all probe results, and zero contradictory instruction/status assertion. Verified clean-tree capture at source revision `15f6fe9dba37c489c25d5db8eaca09df8110b9fa`, 1,677 source files, policy/skill/feature/instruction fingerprints, direct+aggregate pass, and three negative probes.

## Wave 2 / P2 - Deterministic Gates, Artifact Provenance, and CI

**Goal**: turn declared checks into truthful blocking gates whose decisions are reproducible, read-only in check mode, and bound to the reviewed revision.
**Depends on**: T109.
**Exit**: `G-TYPE`, `G-LINT`, `G-UNIT`, `G-ARCH`, `G-TOKENS`, and `G-PROVENANCE` pass with negative probes.

- [x] T110 [P] [US2] Add failing contract tests for gate runs and evidence provenance in `scripts/quality/__tests__/gate-run-contract.test.mjs`, `scripts/quality/__tests__/evidence-provenance.test.mjs`, and `tests/fixtures/evidence/`; evidence: missing revision/input/tool/freshness data is rejected. Verified 8 fixture-driven tests with stable contract failure codes.
- [x] T111 [P] [US2] Add controlled child-process failure tests for every aggregate audit wrapper in `scripts/quality/__tests__/aggregate-exit-code.test.mjs`; evidence: any failing child makes its direct parent and root quality command non-zero. Verified non-zero child and timeout propagation with stable failure codes.
- [x] T112 [US2] Refactor aggregate runners in `scripts/` and root orchestration in `package.json` to propagate child exit code, signal, timeout, and stable failure code; evidence: T111 passes and no failure is converted into a green summary. Verified `run-children.mjs` is the shared runner used by `run-governance-gate.mjs` and root `quality:governance`.
- [x] T113 [P] [US2] Introduce explicit check/update modes for baseline, report, screenshot, and artifact commands in `scripts/quality/modes.mjs` and affected `scripts/audit-*.mjs`; evidence: check mode leaves `git status --porcelain` unchanged while update mode declares every intended output. Verified mode conflict handling, read-only checks, explicit `--update` package scripts, and deterministic CRM audit output.
- [x] T114 [US2] Implement normalized gate-run and evidence-provenance emission in `scripts/quality/run-gate.mjs` and `scripts/quality/write-evidence.mjs`; evidence: two unchanged runs yield the same normalized decision/content hashes apart from explicitly non-decisional timing fields. Verified stable key ordering, decision fingerprints, and evidence content hashes with timing/freshness variation tests.
- [ ] T115 [US2] Reject stale, foreign-revision, dirty-tree, or input-mismatched evidence in `scripts/quality/validate-evidence.mjs`; evidence: controlled timestamp-only, wrong-commit, wrong-source-hash, and dirty-tree fixtures fail.
- [ ] T116 [US2] Before T119, replace all eight raw LF-only CSS-fragment assertions in `packages/crm/src/index.test.tsx` with normalized/parser-based semantic CSS and rendered-layout assertions, and add cross-platform path, CRLF/LF, locale, timezone, and repeated-run fixtures in `scripts/quality/__tests__/portability.test.mjs`; evidence: `@taliya/crm` is 202/202 green, the intended layout regression remains detectable, and semantically identical inputs produce equal decisions on Windows, macOS, and Linux jobs.
- [ ] T117 [US2] Make clean source-graph typechecking independent of ignored sibling `dist` output in package TypeScript configs and `scripts/quality/typecheck-clean.mjs`; evidence: a clean clone and a clone with deliberately stale ignored output reach the same semantic source decision.
- [ ] T118 [US2] Add the profile-driven CI orchestrator in `.github/workflows/quality.yml` and `scripts/quality/select-gates.mjs`; evidence: declared change profiles select the expected PR/nightly/release gates and an unknown profile fails closed.
- [ ] T119 [US2] After T110-T118, run the Wave 2 checkpoint and publish `G-TYPE`, `G-LINT`, `G-UNIT`, `G-ARCH`, `G-TOKENS`, and `G-PROVENANCE` records under `artifacts/quality/`; evidence: the CRM suite is 202/202 green with semantic assertions, supported OS/Node jobs agree, negative probes fail as designed, and check mode has no tracked mutation.

## Wave 3 / P3 - Unit, Component, Integration, Story Browser, Accessibility, Visual, and E2E Coverage

**Goal**: prove public behavior and critical consumer journeys in the right test layer rather than inferring readiness from stories or static structure.
**Depends on**: T119.
**Exit**: `G-UNIT`, `G-COV`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, and `G-CONSUMER` pass for the declared scope.

- [ ] T120 [P] [US3] Generate a reviewable public behavior/state inventory in `tests/contracts/public-behavior-matrix.json` from package exports and component contracts; evidence: every public logic symbol, component, and composed page kit has an owner and required test layers.
- [ ] T121 [P] [US3] Add failing coverage-policy fixtures and per-package thresholds in `scripts/quality/__tests__/coverage-policy.test.mjs` and package `vitest.config.ts` files; evidence: lines/functions below 90%, branches below 85%, changed lines below 95%, or a missing critical behavior fails.
- [ ] T122 [P] [US3] Fill unit and property-focused coverage for public pure logic in `packages/tokens/src/**/*.test.ts`, `packages/ui/src/**/*.test.ts`, and `packages/crm/src/**/*.test.ts`; evidence: matrix rows for pure logic are green without snapshot-only assertions.
- [ ] T123 [P] [US3] Add browser contract tests for public UI primitives in `packages/ui/src/**/*.browser.test.tsx`; evidence: applicable render, callback, keyboard, focus, disabled, loading, error, and blocked states pass in a real browser.
- [ ] T124 [P] [US3] Add integration/browser tests for CRM compositions in `packages/crm/src/**/*.browser.test.tsx`; evidence: data/callback boundaries, tables, forms, drawers, overlays, filters, and empty/error/loading states pass without backend logic.
- [ ] T125 [US3] Close isolated-story inventory gaps in `apps/docs/src/**/*.stories.tsx` and validate them with `scripts/quality/audit-story-isolation.mjs`; evidence: every public component and every new primitive/helper/slot has its own isolated Storybook path.
- [ ] T126 [P] [US3] Add or complete Storybook `play` interactions in `apps/docs/src/**/*.stories.tsx`; evidence: all interactive matrix rows execute their user-observable behavior rather than only render markup.
- [ ] T127 [US3] Configure static Storybook browser execution in `apps/docs/.storybook/`, `.github/workflows/quality.yml`, and `scripts/quality/run-story-tests.mjs`; evidence: story runtime errors, empty renders, failed interactions, and console errors block `G-STORY-TEST`.
- [ ] T128 [P] [US3] Implement automated accessibility plus keyboard/focus/name/semantic checks in `apps/docs/.storybook/`, `tests/accessibility/`, and `scripts/quality/run-a11y.mjs`; evidence: serious/critical violations and missing applicable interaction contracts block `G-A11Y`.
- [ ] T129 [P] [US3] Add reduced-motion and supported responsive viewport assertions in `tests/accessibility/reduced-motion.spec.ts` and `tests/responsive/`; evidence: motion can be suppressed and no approved control loses access, focus, name, or content at supported widths.
- [ ] T130 [US3] Build the clean packed synthetic consumer in `tests/consumer/` using `pnpm pack` outputs only; evidence: root/subpath imports, CSS, types, representative UI/CRM composition, and peer-dependency installation work without workspace leakage.
- [ ] T131 [US3] Implement critical Playwright journeys and PR/release browser projects in `tests/e2e/` and `playwright.config.ts`; evidence: Chromium PR journeys and Chromium/Firefox/WebKit release journeys pass on desktop and mobile profiles.
- [ ] T132 [P] [US3] Build a canonical capture manifest from `specs/001-product-ui-foundation/component-source-map.md`, `specs/001-product-ui-foundation/image-coverage-map.md`, and Storybook IDs in `tests/visual/capture-manifest.json`; evidence: every certified component points to an existing source image/crop and isolated static story.
- [ ] T133 [US3] Implement deterministic static Storybook capture in `scripts/quality/capture-storybook.mjs` and `tests/visual/`; evidence: commit, build hash, viewport, browser, font readiness, theme, density, locale, and source mapping are recorded.
- [ ] T134 [US3] Add component-level visual comparison and human-approval records in `scripts/quality/compare-visuals.mjs` and `artifacts/visual/`; evidence: unexpected pixels or missing approval block `G-VISUAL`, and no dev preview is accepted as final certification.
- [ ] T135 [US3] Replace stale runtime/overflow reports with same-revision responsive probes in `scripts/quality/audit-story-runtime.mjs` and `tests/responsive/`, then triage every reported overflow to its owner under `packages/ui/src/**`, `packages/crm/src/**`, or `apps/docs/src/**`; evidence: `artifacts/quality/responsive-overflow-triage.json` records each story/viewport, owning source path, intended-versus-defect decision, and proof. Every confirmed defect is corrected in the smallest explicitly approved component/visual slice with browser and capture evidence, or remains `blocked` with a separately approved task/slice created before T136; zero unowned, silently accepted, or unclassified overflow is permitted.
- [ ] T136 [US3] Only after T135 has zero unresolved or merely catalogued overflow, run the Wave 3 checkpoint and publish the public behavior matrix plus `G-UNIT`, `G-COV`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, and `G-CONSUMER` evidence under `artifacts/quality/`; evidence: zero unauthorized skip/only/quarantine, every confirmed responsive defect is fixed and re-probed, and every applicable matrix row is green.

## Wave 4 / P4 - Public API Freeze and Architecture Enforcement

**Goal**: classify and freeze the consumer contract, then make React/code/ownership/dependency/finding rules executable before moving internal modules.
**Depends on**: T136.
**Exit**: `G-ARCH`, `G-LINT`, `G-PACK`, and `G-CONSUMER` prove a complete public inventory, compatible packed surface, and exact no-growth baseline.

- [ ] T137 [P] [US4] Generate the runtime/type/style public export inventory in `artifacts/api/public-api-inventory.json` from `packages/tokens/package.json`, `packages/ui/package.json`, `packages/crm/package.json`, declarations, and root entry points; evidence: no export is omitted or inferred from source filenames alone.
- [ ] T138 [US4] Review and classify each T137 symbol as canonical, compatibility alias, deprecated, or internal debt in `governance/public-api-classification.json`; evidence: every entry has owner, supported import path, compatibility intent, and removal/versioning rule.
- [ ] T139 [P] [US4] Add declaration, export-map, CSS-entry, and runtime-import contract snapshots in `tests/contracts/public-api/`; evidence: removing or changing an existing consumer-visible contract fails before any internal move.
- [ ] T140 [P] [US4] Add AST/lint checks for ownership, SOLID-observable rules, React purity/immutability/effect use, stable keys, explicit `any`, suppressions, and public-abstraction imports in `scripts/quality/audit-code-standards.mjs`; evidence: focused positive and negative fixtures emit stable rule IDs.
- [ ] T141 [US4] Add package-direction, cycle, module-size, component-size, complexity, and finding-fingerprint ratchets in `scripts/quality/audit-architecture.mjs` and `governance/architecture-baseline.json`; evidence: historical debt cannot grow/move and removed debt cannot return.
- [ ] T142 [US4] Extend the packed consumer from T130 with every classified root/subpath/type/style/alias contract in `tests/consumer/`; evidence: all supported imports compile and execute without workspace or stale-output leakage.
- [ ] T143 [P] [US4] Add controlled public-API and architecture negative probes in `scripts/quality/probe-api-architecture.mjs`; evidence: removed runtime/type/style exports, private imports, reverse edges, cycles, unowned exports, new debt, moved debt, and reintroduced debt fail with stable IDs.
- [ ] T144 [US4] Run the Wave 4 API-freeze checkpoint and publish `G-ARCH`, `G-LINT`, `G-PACK`, and `G-CONSUMER` evidence under `artifacts/quality/`; evidence: all public inventory rows are classified, negative probes fail as designed, and the packed consumer is compatible.

## Wave 5 / P5 - `@taliya/ui` Modularization

**Goal**: split the UI monolith and its CSS by stable responsibility while preserving the frozen API, behavior, accessibility, and visual contract.
**Depends on**: T144.
**Exit**: `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE` pass with public-equivalence evidence for `@taliya/ui` and no remaining handwritten UI monolith finding.

- [ ] T145 [US4] Add pre-move characterization tests for all `@taliya/ui` public symbols and styles in `packages/ui/src/__characterization__/`; evidence: declarations, runtime output, callbacks, accessibility, and static captures are frozen before extraction.
- [ ] T146 [US4] After T145, extract owned UI types, constants, and internal utilities from `packages/ui/src/index.tsx` into `packages/ui/src/types/`, `packages/ui/src/constants/`, and `packages/ui/src/internal/`; evidence: no consumer-visible declaration or runtime behavior changes. This task is serialized because it edits the shared monolith and establishes seams required by T147.
- [ ] T147 [US4] After T146, extract reusable primitives from `packages/ui/src/index.tsx` into one-owner modules under `packages/ui/src/primitives/`; evidence: each module has focused unit/browser tests, an isolated story, tokens-only styling, and no CRM-domain knowledge. This task is serialized with every other `packages/ui/src/index.tsx` extraction.
- [ ] T148 [US4] After T147, extract composed UI patterns and hooks from `packages/ui/src/index.tsx` into `packages/ui/src/components/` and `packages/ui/src/hooks/`; evidence: state remains minimal, effects synchronize only external systems, and reusable anatomy is not story-only. T149 cannot begin until this final monolith extraction passes its slice gates.
- [ ] T149 [US4] Rebuild `packages/ui/src/index.tsx` as a compatibility facade over explicit owned modules; evidence: T139 public snapshots and packed-consumer imports are unchanged.
- [ ] T150 [US4] Split `packages/ui/src/styles.css` into owned layers under `packages/ui/src/styles/` while preserving the documented CSS entry point and token contract; evidence: cascade order, computed styles, captures, and CSS measurement remain equivalent.
- [ ] T151 [US4] Run the Wave 5 checkpoint for `@taliya/ui`; evidence: `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE` pass on the same revision.

## Wave 6 / P6 - `@taliya/crm` Modularization

**Goal**: split CRM composition and CSS by product domain, keep it prop/callback-driven, and separate product surfaces that have different ownership.
**Depends on**: T151.
**Exit**: `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE` pass with public-equivalence evidence for `@taliya/crm` and no remaining handwritten CRM monolith finding.

- [ ] T152 [US4] Add pre-move characterization tests for all `@taliya/crm` public symbols, page kits, callbacks, styles, accessibility, and captures in `packages/crm/src/__characterization__/`; evidence: current consumer-visible behavior is frozen before extraction.
- [ ] T153 [US4] After T152, extract CRM-owned types, prepared view models, callbacks, constants, and internal utilities from `packages/crm/src/index.tsx` into `packages/crm/src/types/` and `packages/crm/src/internal/`; evidence: no backend/service/auth/billing/tenant/agent decision enters presentation modules. This shared-seam extraction is serialized before T154.
- [ ] T154 [US4] After T153, extract Alunos, Turmas, Agenda, and Revisao compositions from `packages/crm/src/index.tsx` into domain modules under `packages/crm/src/domains/`; evidence: official UI primitives are reused and domain modules own only presentation plus callbacks. This task is serialized with the remaining CRM monolith extractions.
- [ ] T155 [US4] After T154, extract Studio, Equipe, Canais, and Planos/setup compositions from `packages/crm/src/index.tsx` into domain modules under `packages/crm/src/domains/`; evidence: the nine approved setup blocks and final navigation contracts remain intact.
- [ ] T156 [US4] After T155, separate Financeiro do studio, Billing Taliya, Uso/Cotas, CRM do studio, and internal backoffice modules from `packages/crm/src/index.tsx` under `packages/crm/src/domains/`; evidence: names, contracts, ownership, and stories cannot conflate those surfaces.
- [ ] T157 [US4] After T156, extract page kits, tables, kanban, filters, drawers, overlays, and contextual `AgentPanel` compositions from `packages/crm/src/index.tsx` into `packages/crm/src/patterns/`; evidence: drawer lifecycle, state taxonomy, navigation, and contextual assistant contracts pass. T158 cannot begin until all serialized extractions pass their slice gates.
- [ ] T158 [US4] Rebuild `packages/crm/src/index.tsx` and `packages/crm/src/standard-page-kit.ts` as compatibility facades over explicit modules; evidence: T139 snapshots and packed-consumer behavior remain unchanged.
- [ ] T159 [US4] Split `packages/crm/src/styles.css` into owned foundation, primitive, pattern, and domain layers under `packages/crm/src/styles/`; evidence: cascade, source ordering, static captures, computed consumer styles, and CSS measurement remain equivalent.
- [ ] T160 [US4] Run the Wave 6 checkpoint for `@taliya/crm`; evidence: `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE`, including CRM domain-boundary and real-readiness assertions inside their owning gates, pass on one revision.

## Wave 7 / P7 - Security and Supply-Chain Certification

**Goal**: remediate release-path vulnerabilities and make source, dependency, workflow, browser-sink, identity, and provenance controls blocking.
**Depends on**: T160.
**Exit**: `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, and `G-PROVENANCE` pass with zero critical/high release-path finding.

- [ ] T161 [P] [US5] Separate runtime and full-toolchain dependency audits in `scripts/quality/audit-dependencies.mjs` and root scripts; evidence: critical/high findings in either build/publish path block `G-SEC-RUNTIME` or `G-SEC-TOOLCHAIN` and publication.
- [ ] T162 [US5] Remediate or replace the dependency chains responsible for release-path critical/high findings in `pnpm-lock.yaml` and affected package manifests without weakening audit policy; evidence: clean install/build/tests plus zero critical/high result in both dependency gates.
- [ ] T163 [P] [US5] Add dependency review, static security analysis, and secret detection workflows under `.github/workflows/`; evidence: positive and controlled negative fixtures block `G-SEC-SAST` and `G-SEC-SECRETS` without leaking secret contents.
- [ ] T164 [US5] Harden `.github/workflows/publish-packages.yml` with immutable action references, least-privilege job permissions, protected environment, identity-based trusted publishing, artifact hashes, and provenance; evidence: a permission/pin/provenance policy violation blocks publication.
- [ ] T165 [P] [US5] Inventory and guard unsafe HTML/evaluation and URL-protocol sinks in package source plus `scripts/quality/audit-trust-boundaries.mjs`; evidence: untrusted sink/protocol fixtures fail and approved trusted use has an explicit boundary contract.
- [ ] T166 [P] [US5] Document and validate the library-versus-consumer security responsibility matrix in package READMEs, `apps/docs/src/`, and `scripts/quality/validate-security-boundary.mjs`; evidence: library claims never imply consumer authentication, authorization, tenant, CSP/CSRF, rate-limit, storage, or backend-audit certification.
- [ ] T167 [US5] Run the Wave 7 security checkpoint and publish all security/provenance gate records under `artifacts/quality/`; evidence: immutable workflow policy, separate dependency decisions, static/secret checks, browser trust boundaries, and responsibility matrix are green on one revision.

## Wave 8 / P8 - Performance Baselines and Budgets

**Goal**: measure comparable production artifacts and representative React scenarios, then enforce calibrated no-regression budgets without speculative optimization.
**Depends on**: T167.
**Exit**: `G-PERF` and `G-PACK` pass with reproducible baselines, raw samples, and approved budgets.

- [ ] T168 [P] [US5] Add production-mode package/CSS/tarball/tree-shaking and representative React render/update benchmark harnesses in `tests/performance/` and `scripts/quality/measure-performance.mjs`; evidence: fixed datasets, warmup, repetitions, environment, variance, and raw samples are recorded.
- [ ] T169 [US5] Establish reviewed versioned performance baselines and provisional ratchets in `governance/performance-budgets.json`; evidence: size regressions use the R-013 dual threshold and runtime metrics block only after reproducibility/noise criteria pass.
- [ ] T170 [P] [US5] Enforce package, CSS, tarball, duplicate-module, and tree-shaking budgets against fresh `pnpm pack` outputs in `scripts/quality/audit-package-performance.mjs`; evidence: every measured artifact is tied to the exact source and package hash.
- [ ] T171 [US5] Profile the T168 reference scenarios against `packages/ui/src/**` and `packages/crm/src/**`, apply changes only to modules named by the measured bottleneck, and record each candidate in `artifacts/performance/optimization-ledger.json`; evidence: comparable raw samples in `artifacts/performance/before/*.json` and `artifacts/performance/after/*.json`, plus the ledger's source paths, scenario/dataset hashes, environment, hypothesis, accepted/rejected decision, and linked `G-PERF`, `G-UNIT`, `G-A11Y`, `G-VISUAL`, `G-PACK`, and `G-CONSUMER` records prove improvement without behavior, accessibility, API, artifact, or visual regression.
- [ ] T172 [US5] Run the Wave 8 performance checkpoint and publish `G-PERF` and `G-PACK` evidence under `artifacts/quality/`; evidence: every stable metric is within budget, noisy metrics are explicitly informational, and no claim relies on incomparable runs.

## Wave 9 / P9 - Release Certification and Continuous Ratchets

**Goal**: validate exact baselines/waivers, certify one immutable release candidate, and publish only the already-certified artifacts under separate authority.
**Depends on**: T172.
**Exit**: `G-RELEASE` certifies one revision/artifact set with no active waiver, high/critical vulnerability, stale evidence, or unresolved handwritten-code debt.

- [ ] T173 [P] [US6] Run the final waiver inventory and expiry audit with the P1 validator from T103 across `governance/waivers/*.json`, close or revoke resolved entries, and emit `artifacts/quality/final-waiver-audit.json`; evidence: every record is schema-valid and semantically revalidated at the release revision, expired/broadened/unowned/unapproved/prohibited entries fail, no active waiver remains, and any human display label "accepted risk" is stored as canonical status `risk-accepted`.
- [ ] T174 [P] [US6] Implement finding-level architecture/security/quality baseline fingerprints and no-growth/no-reintroduction checks in `scripts/quality/validate-ratchets.mjs`; evidence: moving, renaming, adding, or reintroducing debt fails even when aggregate counts do not grow.
- [ ] T175 [US5] Build the release-candidate workflow in `.github/workflows/release-certification.yml`; evidence: supported OS/browser matrices, synchronized versions, clean-source build, exact packed artifacts, clean-consumer tests, SBOM, hashes, approvals, and provenance all bind to one immutable revision and the same publishable artifacts.
- [ ] T176 [US5] Run final project certification and produce `artifacts/release/release-certification.json`; evidence: every applicable gate passes, all reports are fresh and non-contradictory, all handwritten production modules meet final budgets, no active/expired waiver exists, no baseline debt remains, and only then may status become `100% conformant`; publication remains separately authorized and must use the same certified files.

## Dependency Graph

```text
GATE-SDD-APPROVED
  -> Wave 1 governance/source of truth (T101-T109)
  -> Wave 2 deterministic gates/provenance/CI (T110-T119)
  -> Wave 3 behavioral/browser/a11y/visual/E2E evidence (T120-T136)
  -> Wave 4 public API freeze/architecture enforcement (T137-T144)
  -> Wave 5 @taliya/ui and UI CSS modularization (T145-T151)
  -> Wave 6 @taliya/crm and CRM CSS modularization (T152-T160)
  -> Wave 7 security/supply chain (T161-T167)
  -> Wave 8 performance baselines/budgets (T168-T172)
  -> Wave 9 release certification/continuous ratchets (T173-T176)
```

## Parallel Execution Rules

- Tasks marked `[P]` may run concurrently only in isolated worktrees and only after their phase entry gate passes.
- A task that touches a shared façade, package manifest, root workflow, baseline, or evidence schema is serialized with any other task touching the same artifact.
- Refactor tasks may not run ahead of characterization/API-freeze tasks, even when the target modules are disjoint.
- Baseline/update operations require their own reviewable change; they may never be hidden inside a check or refactor task.
- Failed, stale, waived, or incomplete checkpoint evidence blocks every downstream phase.

## Completion Rule

Checking every task is necessary but not sufficient. This feature is complete only when T176 certifies the exact final revision and artifacts, the final Definition of Done passes without an active waiver, and the recorded status uses the vocabulary defined by the SDD contracts.
