# Feature Specification: Engineering Quality Hardening

**Feature Branch**: `006-engineering-quality-hardening`
**Created**: 2026-08-08
**Status**: SDD READY FOR APPROVAL / READY FOR USER APPROVAL
**Input**: User description: "Transform the complete engineering-quality recovery plan into SDD using Spec Kit, finish the SDD from start to finish, and do not implement until the SDD is complete and explicitly approved."

## Intent

Establish a single, verifiable engineering system that makes future changes to Taliya Product UI conform to explicit architecture, code quality, React, component reuse, test, accessibility, security, performance, artifact, and release contracts.

In this feature, `100% conformant` means that every gate and contract applicable to the declared change scope passes against the same source revision with current evidence. It does not mean that software can be proven to contain no future defects.

## SDD-Only Gate

This specification, its research, design model, contracts, plan, task backlog, and acceptance checklist MUST be reviewed as one SDD package before implementation begins.

Implementation is forbidden while any of the following is true:

- an SDD artifact is missing;
- an unresolved placeholder or clarification remains;
- a requirement has no implementation task or acceptance evidence;
- the SDD acceptance checklist is incomplete;
- the user has not explicitly authorized implementation.

The integrated validation in `quickstart.md` has passed and the stable readiness manifest is present. The lifecycle state is `READY_FOR_APPROVAL`; implementation remains forbidden while authorization is `AWAITING_USER_APPROVAL` and until an explicit approval envelope opens `GATE-SDD-APPROVED`.

## Clarifications

### Session 2026-08-08

- **Can implementation begin while the SDD is incomplete?** No. The sequence Constitution -> Specify -> Clarify -> Plan -> Tasks -> Checklist -> Analyze must finish first, and implementation still requires explicit user approval recorded in `approval.md`.
- **Does `100% conformant` promise zero defects?** No. It means every contract and gate applicable to the change passed with fresh evidence from the same revision and no waiver in scope.
- **Can internal modularization remove an existing public API?** Not silently. Root imports remain compatible; removal requires an explicitly approved major-version migration with replacement guidance and consumer evidence.
- **Does this library certify the complete security of the future SaaS?** No. It certifies source, dependencies, package artifacts, workflows, supply chain, browser-facing sinks, and integration obligations. Authentication, authorization, tenant isolation, CSP, CSRF, rate limiting, secure persistence, and infrastructure controls belong to the consuming system.
- **Does responsive coverage include a native mobile product?** No. It covers responsive web behavior of the existing library. A native or dedicated mobile product requires its own specification.
- **How are Spec Kits 001 through 005 treated?** They remain immutable historical/product evidence with an explicit status and precedence map. Feature 006 is the active source of truth only for engineering hardening and continuous certification.
- **What happens to unclassified changes?** They receive the strictest applicable `full` change profile until a reviewed policy classifies them more narrowly.

## User Scenarios & Testing

### User Story 1 - One trustworthy source of truth (Priority: P1)

As a maintainer or coding agent, I need one current project phase, one precedence model, and portable instructions so that I cannot follow obsolete or contradictory guidance.

**Why this priority**: Every other quality control can be bypassed or misapplied if the active source of truth is unclear.

**Independent Test**: On a clean clone, a maintainer can identify the active spec, applicable instructions, change profile, required skills, and implementation authorization state without consulting a machine-specific path.

**Acceptance Scenarios**:

1. **Given** the repository root, **When** a maintainer reads the active project instructions, **Then** exactly one current Spec Kit feature and one current phase are identified.
2. **Given** work inside tokens, UI, CRM, docs, scripts, or workflows, **When** instructions are resolved, **Then** global invariants and only the relevant subtree additions apply.
3. **Given** a referenced project skill, **When** the repository is cloned on another machine, **Then** that skill is discoverable from a versioned repository location.
4. **Given** a conflict between prose, a contract, and an executable gate, **When** it is detected, **Then** work stops and the inconsistency is recorded instead of being resolved silently.

---

### User Story 2 - Truthful, blocking, reproducible gates (Priority: P1)

As a reviewer, I need every declared audit and quality check to fail the pipeline when its contract fails, while producing deterministic evidence from the revision under review.

**Why this priority**: A documented rule or green wrapper that ignores failing checks is not enforcement.

**Independent Test**: A controlled negative probe for each gate makes the pipeline fail, identifies the failed rule, changes no tracked file in check mode, and produces the same decision on supported operating systems.

**Acceptance Scenarios**:

1. **Given** one failing child audit, **When** the aggregate quality gate runs, **Then** it returns a non-zero result and names the failed audit.
2. **Given** an unchanged source revision and inputs, **When** a check runs twice, **Then** its decision and normalized evidence are identical.
3. **Given** stale build output or a stale report, **When** readiness is evaluated, **Then** the evidence is rejected rather than treated as current.
4. **Given** Windows line endings or a different workspace path, **When** portable checks run, **Then** the result depends on semantics rather than physical path or newline style.

---

### User Story 3 - Complete behavioral quality evidence (Priority: P1)

As a component consumer and QA reviewer, I need every public behavior and state to be covered by the appropriate automated and visual evidence so that package changes are safe to adopt.

**Why this priority**: Stories and static structure alone do not prove interactions, accessibility, responsiveness, or integration behavior.

**Independent Test**: A packaged synthetic consumer installs the current tarballs and passes public-import, style, component-browser, critical E2E, accessibility, responsive, and visual checks for the affected scope.

**Acceptance Scenarios**:

1. **Given** an interactive public component, **When** its contract changes, **Then** render, callback, keyboard, focus, disabled, loading, error, and blocked behavior are tested where applicable.
2. **Given** a Storybook story with interactions, **When** CI runs, **Then** the story and its interaction steps execute in a real browser.
3. **Given** a critical package-consumer journey, **When** packed artifacts are installed into a clean consumer, **Then** public imports, styles, overlays, forms, tables, and responsive behavior work without runtime errors.
4. **Given** a canonical visual source, **When** a component is changed, **Then** a static Storybook capture is compared and every unexpected difference is rejected.

---

### User Story 4 - Modular architecture without consumer breakage (Priority: P2)

As a library maintainer, I need UI and CRM internals split by responsibility and domain while preserving the existing public API and visual behavior.

**Why this priority**: The package dependency direction is sound, but oversized files and broad contracts make safe change and review progressively harder.

**Independent Test**: A structural-only module move keeps the public declaration inventory, package entry points, runtime consumer fixture, component behavior, and visual captures equivalent.

**Acceptance Scenarios**:

1. **Given** an existing public root import, **When** internal modules are reorganized, **Then** the import continues to compile and behave identically.
2. **Given** a new handwritten module or component, **When** architecture checks run, **Then** it respects ownership, dependency direction, cycle, size, complexity, and public-contract budgets.
3. **Given** historical structural debt, **When** an affected symbol is modified, **Then** its debt cannot increase and a removed violation cannot return.
4. **Given** a composed CRM surface, **When** it is reviewed, **Then** it reuses official UI primitives and contains presentation plus callbacks rather than backend or business enforcement.

---

### User Story 5 - Secure and measurable package delivery (Priority: P2)

As a release owner, I need the development toolchain, package contents, publishing workflow, and performance characteristics to be verified before a package is released.

**Why this priority**: A runtime-clean package can still be compromised or made unreliable by a vulnerable build toolchain, mutable workflow, stale artifact, or unmeasured size/render regression.

**Independent Test**: The release workflow rebuilds and validates the exact source revision, installs its artifacts into a clean consumer, verifies security and performance budgets, and publishes with traceable provenance.

**Acceptance Scenarios**:

1. **Given** a critical or high dependency vulnerability in runtime or build/publish tooling, **When** release certification runs, **Then** publication is blocked.
2. **Given** a package size or measured runtime regression beyond its budget, **When** release certification runs, **Then** publication is blocked unless the change is explicitly re-scoped and re-approved.
3. **Given** a release candidate, **When** evidence is inspected, **Then** source revision, lockfile, artifact hashes, tool versions, tests, and provenance all refer to the same candidate.
4. **Given** system-security concerns outside this library, **When** readiness is reported, **Then** library guarantees and consumer-application responsibilities are stated separately.

---

### User Story 6 - Controlled evolution and honest status (Priority: P3)

As a governance owner, I need time-bounded waivers, fingerprinted ratchets, explicit non-applicability, and stable status vocabulary so that historical debt is reduced without being hidden.

**Why this priority**: Incremental hardening needs controlled exceptions, but an exception must never be confused with full conformance.

**Independent Test**: An expired, broadened, unowned, or unapproved waiver fails validation; a baseline increase without an authorized decision fails; and only an unwaived fully green change can be labeled `100% conformant`.

**Acceptance Scenarios**:

1. **Given** an existing baseline finding, **When** it is removed, **Then** the baseline shrinks and the same finding cannot be reintroduced.
2. **Given** a proposed exception, **When** required scope, risk, owner, compensating control, removal issue, approval, or expiry is missing, **Then** the exception is rejected.
3. **Given** a valid active waiver in the changed scope, **When** status is reported, **Then** the result is `accepted risk`, not `100% conformant`.
4. **Given** a gate marked not applicable, **When** the change is reviewed, **Then** a profile-based reason is recorded and validated.

## Edge Cases

- A direct package typecheck resolves an ignored, stale sibling `dist` while the current source graph is semantically valid.
- A CSS source file is checked out as CRLF and a test asserts an LF-only literal.
- An aggregate probe verifies read-only behavior but discards a child process failure.
- A report has a recent timestamp but was generated from a different commit or dirty source tree.
- A date embedded in an audit report makes an unchanged check appear stale.
- A baseline update moves or renames debt so an aggregate count appears unchanged.
- A public export was accidental but is already consumed externally.
- A generated catalog exceeds normal file budgets but is not handwritten application logic.
- Storybook builds successfully while a story has a runtime error, inaccessible control, visual overflow, or unexecuted interaction.
- The canonical source image is unavailable or human visual approval remains pending.
- A dependency is runtime-clean but vulnerable in the toolchain that builds and publishes packages.
- A performance comparison uses different datasets, machines, build modes, or browser settings.
- A security control such as authorization or tenant isolation is incorrectly claimed by this presentation library.
- A flaky check passes on retry and hides nondeterministic behavior.
- A release workflow validates one artifact but rebuilds and publishes another.

## Requirements

### Governance and SDD Requirements

- **FR-001**: The repository MUST identify exactly one active Spec Kit feature, phase, and implementation authorization state.
- **FR-002**: The active SDD package MUST include `spec.md`, `research.md`, `data-model.md`, `plan.md`, `tasks.md`, `quickstart.md`, contracts, and an acceptance checklist.
- **FR-003**: Implementation MUST remain blocked until the SDD package has no unresolved placeholders, passes its checklist, and receives explicit user approval.
- **FR-004**: Root instructions MUST contain only project-wide invariants, routing, precedence, stop conditions, and the summarized Definition of Done.
- **FR-005**: Subtree instructions MUST add only scope-specific rules and MUST NOT silently weaken root invariants.
- **FR-006**: Every project-specific skill referenced by mandatory instructions MUST be available from a versioned repository skill location.
- **FR-007**: Command-execution rules MUST remain separate from engineering standards and MUST include tested match and non-match examples.
- **FR-008**: Engineering rules MUST have a stable ID, statement, scope, severity, enforcement kind, evidence, owner, references, and waiver policy.
- **FR-009**: Every change MUST be classified into one or more versioned change profiles that select its required gates.
- **FR-010**: Governance validation MUST detect duplicate IDs, broken references, missing owners/enforcement, contradictory status, unknown skill/rule references, invalid waivers, and unauthorized baseline growth.

### Code, React, Component, and Architecture Requirements

- **FR-011**: The package dependency direction MUST remain `tokens -> ui -> crm -> docs`, with no reverse package dependency.
- **FR-012**: Consumers MUST use public Taliya exports and MUST NOT depend on internal files or exposed headless-library implementation details.
- **FR-013**: Handwritten modules and components MUST have one clear owner and responsibility; historical size and complexity debt MUST be fingerprinted and reduced by ratchet.
- **FR-014**: SOLID guidance MUST be expressed as observable rules: focused ownership, composable variants, substitutable wrappers, focused interfaces, and dependency on public abstractions.
- **FR-015**: React components and Hooks MUST be pure during render, treat props/state as immutable, keep state minimal, and use effects only for synchronization with external systems.
- **FR-016**: Mutable or reorderable collections MUST use stable identifiers rather than array positions or render-generated keys.
- **FR-017**: Reusable primitives MUST belong to `@taliya/ui`; CRM domain compositions MUST belong to `@taliya/crm`; reusable anatomy MUST NOT live only in stories.
- **FR-018**: CRM components MUST receive prepared data and callbacks and MUST NOT implement backend, persistence, authentication, billing enforcement, tenant enforcement, or real agent decisions.
- **FR-019**: The complete public API inventory MUST classify every export as canonical, compatibility alias, deprecated, or internal debt before modularization.
- **FR-020**: Internal modularization MUST preserve existing root imports, declarations, runtime behavior, accessibility, styles, and visual output unless a separately approved behavior change says otherwise.
- **FR-021**: TypeScript and lint checks MUST prohibit new explicit `any`, unowned suppressions, import cycles, and unapproved complexity or size violations in handwritten source.

### Test, Accessibility, and Visual Requirements

- **FR-022**: All packages and docs MUST pass typecheck, lint, build, and their relevant automated tests.
- **FR-023**: Public pure logic MUST have unit tests; public components MUST have browser-level contract tests; composed page kits MUST have integration tests.
- **FR-024**: Coverage MUST be measured per package and changed scope, using branch/function/line thresholds plus behavior-critical requirements rather than line coverage alone.
- **FR-025**: Every public component MUST have an isolated Storybook story; interactive stories MUST execute their interactions in CI.
- **FR-026**: A packed synthetic consumer MUST exercise public imports, CSS, representative composition, and critical browser journeys.
- **FR-027**: Browser evidence MUST cover supported desktop/mobile viewports and supported browsers according to PR, nightly, and release profiles.
- **FR-028**: Automated accessibility checks MUST reject serious/critical violations; interactive controls MUST have keyboard, focus, semantic, accessible-name, and reduced-motion evidence where applicable.
- **FR-029**: Visual certification MUST use a static Storybook build, canonical source mapping, component-level comparison, and explicit human approval for 1:1 claims.
- **FR-030**: Runtime story checks MUST reject empty renders, runtime errors, unnamed interactive controls, internal clipping, and unapproved overflow.
- **FR-031**: Tests and audits MUST be deterministic across supported line endings, workspace paths, operating systems, and repeated execution.

### Security, Performance, Artifact, and Release Requirements

- **FR-032**: Runtime and full-toolchain dependency audits MUST be separate, and critical/high findings in either release path MUST block publication.
- **FR-033**: The repository MUST run dependency review, static security analysis, and secret detection for relevant changes.
- **FR-034**: Workflow actions MUST be immutable, job permissions least-privileged, and publication MUST use protected identity, provenance, and an approved environment.
- **FR-035**: Unsafe HTML/code evaluation and unvalidated URL protocols MUST be prohibited or controlled by a documented trust-boundary contract.
- **FR-036**: Package, CSS, tarball, tree-shaking, and representative render/update metrics MUST have versioned baselines and regression budgets.
- **FR-037**: Performance decisions MUST compare compatible production-like scenarios and MUST NOT mandate memoization without measured evidence.
- **FR-038**: Every generated report and artifact MUST record the source revision, input fingerprints, tool version, decision, and dependency evidence.
- **FR-039**: Check mode MUST be read-only; baseline, report, screenshot, and artifact updates MUST be explicit reviewable actions.
- **FR-040**: A release MUST install and validate freshly packed artifacts from the exact certified revision in a clean consumer before publishing those same artifacts.
- **FR-041**: Release readiness MUST require supported operating-system and browser matrices, fresh evidence, synchronized versions, no expired waiver, and no failing blocking gate.
- **FR-042**: The library MUST document that authentication, authorization, tenant isolation, CSP, CSRF, rate limiting, secure storage, and backend audit controls belong to the consuming system.

### Continuous Governance Requirements

- **FR-043**: A waiver MUST be limited to an exact rule and path/symbol, state risk and compensating controls, have an owner and approver, link a removal issue, and expire within the permitted period.
- **FR-044**: Critical secret exposure, data exfiltration, unauthorized publication, or equivalent irreversible security risk MUST NOT be accepted through a normal waiver.
- **FR-045**: Baselines MUST fingerprint individual findings; aggregate counts alone MUST NOT authorize moving, renaming, or adding debt.
- **FR-046**: A removed baseline finding MUST disappear and MUST be rejected if reintroduced.
- **FR-047**: `100% conformant` status MUST require all applicable gates to pass on one revision with no waiver in the changed scope.
- **FR-048**: Final project certification MUST require no unresolved handwritten-code baseline debt, no active waiver, and no stale or contradictory readiness evidence.

### Key Entities

- **Engineering Rule**: Stable policy statement with scope, enforcement, evidence, owner, and exception policy.
- **Change Profile**: Classification that maps a change type to mandatory PR, nightly, and release gates.
- **Gate Definition**: Executable pass/fail contract with command, stage, inputs, outputs, and failure semantics.
- **Evidence Artifact**: Revision-bound proof produced by a gate, including input fingerprints and freshness metadata.
- **Baseline Finding**: Fingerprinted historical violation subject to a no-growth ratchet.
- **Waiver**: Time-bounded accepted risk for one precise rule and scope.
- **Public API Symbol**: Exported runtime or type contract classified for compatibility management.
- **Release Candidate**: One source revision plus its lockfile, artifacts, evidence, approvals, and provenance.
- **SDD Approval**: Human decision that the complete design package is implementation-ready.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A clean clone exposes exactly one active feature, phase, and implementation authorization state, with zero contradictory phase assertions.
- **SC-002**: Every mandatory audit has a negative probe that causes its direct and aggregate gate to fail.
- **SC-003**: Two unchanged check executions on the same revision produce the same normalized decision and leave tracked files unchanged.
- **SC-004**: Clean-clone typecheck, lint, build, and automated tests pass on Windows, macOS, and Linux for supported Node versions.
- **SC-005**: All blocking package and docs tests pass with zero unauthorized `.skip`, `.only`, or quarantined case.
- **SC-006**: Lines/functions coverage reaches at least 90%, branches at least 85%, and changed lines at least 95%, while every critical public behavior has explicit test evidence.
- **SC-007**: Every changed public interactive component has an isolated story, browser interaction evidence, and applicable keyboard/focus/accessibility coverage.
- **SC-008**: The current full story inventory reports zero empty render, runtime error, unnamed interactive control, unapproved clipping, or unapproved overflow.
- **SC-009**: Automated accessibility reports contain zero unwaived serious or critical violation.
- **SC-010**: Critical synthetic-consumer journeys pass in Chromium for PRs and in Chromium, Firefox, and WebKit for release certification.
- **SC-011**: Runtime and release-toolchain dependency audits contain zero critical or high finding at publication time.
- **SC-012**: No release artifact exceeds its approved size/performance budget or publishes from an unmeasured regression.
- **SC-013**: Every existing public import remains compatible through internal modularization; any planned removal is deferred to an explicitly versioned major migration.
- **SC-014**: All handwritten production modules satisfy the final architecture budgets or are split before final project certification; generated catalogs are separately classified.
- **SC-015**: Every readiness report and package artifact fingerprints the same certified source revision and inputs.
- **SC-016**: Final project certification contains zero active waiver, zero expired waiver, and zero unauthorized baseline increase.
- **SC-017**: Every functional requirement maps to at least one implementation task and one acceptance/evidence mechanism.
- **SC-018**: No implementation file, dependency, baseline, release artifact, or package publication is changed before the SDD checklist is complete and the user explicitly approves implementation.

## Assumptions

- The current package direction and product-library scope remain authoritative.
- Existing public behavior and visual contracts are preserved during structural refactoring.
- The repository remains a prop-driven frontend library, not the future SaaS runtime.
- Project-specific thresholds start from measured baselines and become stricter through ratchets; loosening requires an explicit design decision.
- Human source-image approval remains necessary for final 1:1 visual certification.
- Repository-host settings such as protected branches may require an external administrative action, but their required state is still part of release acceptance.

## Dependencies

- Existing Spec Kit 001 foundation and visual/component contracts.
- Existing Spec Kits 002-005 and their current evidence inventories.
- Supported Node, pnpm, TypeScript, React, Storybook, Vitest, and package tooling.
- Canonical approved source images for visual certification.
- A CI environment capable of supported OS/browser matrices.

## Non-Goals

- Implementing any hardening task during the SDD phase.
- Rebuilding the product library from scratch.
- Changing product behavior or visual direction as part of structural-only moves.
- Implementing backend, authentication, authorization, tenant isolation, billing enforcement, or real AI-agent behavior.
- Claiming that 100% line coverage or a green static checker proves defect-free software.
- Publishing packages or accepting new baselines during SDD.
