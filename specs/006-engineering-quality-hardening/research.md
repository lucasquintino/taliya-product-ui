# Research: Engineering Quality Hardening

**Feature**: `006-engineering-quality-hardening`
**Date**: 2026-08-08
**Status**: Complete for SDD review
**Scope**: Decisions only; no product implementation is authorized by this document.

## Method

The research combines the current repository audit with primary documentation from the tools and standards that will enforce the program. Each decision records the chosen approach, rationale, rejected alternatives, and consequences. Guidance becomes a repository rule only when a requirement, contract, task, and executable evidence mechanism also exist.

## Decisions

### R-001 - Preserve history; create a dedicated hardening feature

**Decision**: Feature 006 governs engineering hardening and continuous certification. Features 001-005 remain historical product, portability, anatomy, review, and certification evidence.

**Rationale**: This is a brownfield modernization program, not a rewrite of the product foundation. Spec Kit explicitly supports iterative enhancement and recommends evolving feature artifacts intentionally rather than conflating tooling updates with product history ([Spec Kit](https://github.com/github/spec-kit)).

**Rejected**: Rewrite 001 or retroactively mark all of its tasks complete. That would erase provenance and make past claims unverifiable.

**Consequence**: `source-of-truth-reconciliation.md` defines precedence and status. Contradiction is a blocking finding, not something an agent resolves silently.

### R-002 - Use the complete planning sequence and stop before implementation

**Decision**: The required sequence is Constitution -> Specify -> Clarify -> Plan/Research/Design -> Tasks -> Checklist -> Analyze -> explicit human approval -> Implement.

**Rationale**: Spec Kit defines `clarify`, `checklist`, and `analyze` as quality phases, with analysis after tasks and before implementation ([Spec Kit](https://github.com/github/spec-kit)). The repository's bundled workflow previously skipped these phases and invoked implementation automatically.

**Rejected**: Run the old bundled workflow or treat task generation as implementation approval.

**Consequence**: `.specify/workflows/speckit/workflow.yml` is planning-only. `approval.md` remains `AWAITING_USER_APPROVAL`; every implementation task is blocked by `GATE-SDD-APPROVED`.

### R-003 - Repair the Codex integration without destructive reinitialization

**Decision**: During implementation, reconcile the missing repository `.agents/` tree against `.specify/integrations/codex.manifest.json` through a reviewed diff. Do not run a force reinitialization over customized files.

**Rationale**: The manifest claims nine Spec Kit skills, but the directory is absent. Spec Kit supports project-local overrides and managed integration assets; blindly regenerating them can overwrite intentional Constitution/template changes.

**Rejected**: Treat machine-local skills as portable project configuration or execute `specify init --force` without a dry run.

**Consequence**: Integration repair has its own task, clean-clone verification, and rollback boundary. On this Windows environment, CLI invocations set `PYTHONUTF8=1` because CP1252 output currently fails.

### R-004 - Separate AGENTS, skills, command rules, contracts, and enforcement

**Decision**: Use:

- root `AGENTS.md` for project-wide invariants, routing, phase, precedence, and stop conditions;
- nested `AGENTS.md` files for additive subtree-specific guidance;
- repository skills for reusable, triggerable workflows;
- `.codex/rules` only for command-execution policy;
- schemas/contracts for machine-readable obligations;
- scripts and CI for enforcement.

**Rationale**: Codex resolves instructions by directory and recommends repository-wide checks at root with service-specific checks closest to the code ([AGENTS.md guidance](https://developers.openai.com/codex/guides/agents-md)). Skills are directories centered on a complete `SKILL.md`, with optional scripts and references loaded through progressive disclosure ([Codex skills](https://developers.openai.com/codex/skills)). Command rules use explicit prefix matching and are not a substitute for code standards ([Codex rules](https://developers.openai.com/codex/rules)).

**Rejected**: Put every engineering principle in one oversized root file, duplicate the same text across tools, or assume prose is a gate.

**Consequence**: Governance validation checks discoverability, contradictions, stale paths, duplicate rule IDs, and missing enforcement.

### R-005 - Select fail-closed gates through change profiles

**Decision**: Versioned profiles classify changed paths and impacts and select the union of required gates. An unclassified production change receives the strictest `full` profile. A required child failure must propagate to the aggregate gate.

**Rationale**: Risk-based selection avoids running irrelevant release work for documentation while preventing ambiguous changes from escaping checks. Current read-only probing validates mutation behavior but discards child exit codes, which cannot represent readiness.

**Rejected**: One always-green wrapper, file-count heuristics without impact classification, or opt-in checks.

**Consequence**: The policy contract distinguishes `check`, `update`, PR, nightly, and release modes. Each blocking gate needs a negative probe.

### R-006 - Bind every decision and artifact to the same source revision

**Decision**: Evidence records commit SHA, source-tree hash, configuration hash, input hashes, tool/runtime identity, timestamps, and content hash. Downstream gates reject failed, dirty, mismatched, expired, or stale evidence.

**Rationale**: A recent filename or timestamp does not prove provenance. The current repository contains reports whose date or ignored outputs can drift from source.

**Rejected**: Trust a checked-in report solely because it exists or rebuild during publish after certification.

**Consequence**: `gate-run.schema.json`, `evidence-provenance.schema.json`, and `release-certification.schema.json` form a chain from source to published tarball.

### R-007 - Use a layered, behavior-first test strategy

**Decision**:

- Vitest and Testing Library cover pure logic, component behavior, and package contracts;
- Storybook browser tests execute stories and `play` interactions;
- Playwright covers packed-consumer critical journeys and supported browsers;
- static Storybook capture covers visual and responsive contracts;
- package fixtures cover exports, CSS, installation, and tree shaking.

**Rationale**: Storybook's Vitest integration transforms stories into tests executed in browser mode ([Storybook testing](https://storybook.js.org/docs/writing-tests)). Playwright recommends testing user-visible behavior, isolated tests, resilient locators, web-first assertions, and cross-browser execution ([Playwright best practices](https://playwright.dev/docs/best-practices)).

**Rejected**: Equate build success, story count, snapshots, or unit coverage alone with behavioral readiness.

**Consequence**: Coverage thresholds supplement, not replace, explicit critical-behavior tests. Retries diagnose flakiness but do not turn a flaky required test green.

### R-008 - Make accessibility a blocking behavior contract

**Decision**: Browser accessibility checks fail on unwaived serious or critical violations. Interactive components additionally require semantic names, keyboard paths, visible focus, focus lifecycle, disabled behavior, and reduced-motion evidence where applicable.

**Rationale**: Automated analysis catches only part of accessibility; keyboard, focus, and assistive-technology behavior require component and human review. Storybook is the natural component-state execution surface.

**Rejected**: Rely on an installed addon that does not run in CI or treat zero automated findings as complete accessibility certification.

**Consequence**: Accessibility evidence is selected per change profile and human review remains part of final component certification.

### R-009 - Treat React quality as observable behavior and architecture

**Decision**: Enforce render purity, immutable props/state, stable Hook order, minimal state, effects only for external synchronization, stable collection identity, cohesive component ownership, and behavior-oriented tests.

**Rationale**: React identifies pure Components/Hooks and top-level Hook calls as core predictability rules ([Rules of React](https://react.dev/reference/rules)). Its component-design workflow starts by breaking UI into a hierarchy and keeping only minimal state ([Thinking in React](https://react.dev/learn/thinking-in-react)).

**Rejected**: Mandate arbitrary component length, memoization, or Hook extraction without evidence; use SOLID names without observable checks.

**Consequence**: Structural budgets are ratchets and review prompts, not automated proof of good design. Performance-driven memoization requires profiling.

### R-010 - Modularize incrementally behind stable public barrels

**Decision**: Split UI by component family and CRM by domain, preserving package root exports and public CSS entry points. Structural moves are separate from behavior or visual changes.

**Rationale**: Current package direction and reuse are sound, but monolithic source and CSS increase review surface and ownership ambiguity. An incremental branch-by-abstraction approach enables per-slice proof.

**Rejected**: Big-bang rewrite, rename-first migration, or new package boundaries before evidence shows they are needed.

**Consequence**: Every slice must pass API, declaration, packed-consumer, behavior, accessibility, and visual equivalence checks before the next slice.

### R-011 - Inventory and ratchet the complete public API

**Decision**: Build a semantic inventory of all exported values and types, classified as canonical, compatibility alias, deprecated, or internal debt. Additive subpaths may be introduced; root compatibility remains. Removal requires an approved major version and migration guide.

**Rationale**: Existing manifest checks cover selected contracts but not every export. A library consumer experiences the actual declaration and runtime surface, not an intended subset.

**Rejected**: Assume an export is safe to remove because it was accidental or undocumented.

**Consequence**: API compatibility is tested from freshly packed packages, with aliases retained until consumer migration evidence exists.

### R-012 - Bound the security claim and harden the supply chain

**Decision**: This project certifies library code, browser-facing sinks, dependencies, artifacts, automation, and integration contracts. The SaaS consumer owns identity, authorization, tenant isolation, server validation, CSRF/CSP, rate limits, secure storage, backend logging, and infrastructure.

**Rationale**: OWASP ASVS provides a basis for testing application security controls but verification must state which system owns each control ([OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)). GitHub recommends pinning actions to full commit SHAs because that is the immutable action form ([GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use)). npm trusted publishing uses short-lived OIDC identity rather than long-lived publish tokens ([npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)).

**Rejected**: Claim system security from a UI package audit, ignore build-tool vulnerabilities because production dependencies are clean, or publish with a long-lived broad token.

**Consequence**: Runtime and toolchain audits are reported separately but both can block release. Critical irreversible security findings are not normally waivable.

### R-013 - Establish performance baselines before enforcing calibrated budgets

**Decision**: Measure minified/gzip package and CSS sizes, tarball contents, tree-shaking fixtures, and representative render/update scenarios on controlled production builds. Start with a ratchet: investigate/block a regression only when it exceeds both 2% and 2 KiB for size or 5% for a stable runtime metric; calibrate absolute budgets after baseline evidence.

**Rationale**: Lab measurements are useful to catch regressions but vary by device, environment, workload, and browser. Web Vitals distinguishes lab and field evidence and treats user-centric outcomes as the goal ([Web Vitals](https://web.dev/articles/vitals)). A component library cannot claim application Core Web Vitals without a consuming application.

**Rejected**: Optimize from file size alone, claim no impact without measurement, or require memoization globally.

**Consequence**: Benchmarks pin fixtures, warm-up, sample count, environment, and statistical comparison. A noisy metric is informational until stabilized.

### R-014 - Use exact baselines and expiring waivers without diluting status

**Decision**: Historical debt baselines fingerprint rule, path, symbol, and value. A waiver scopes one rule/finding, records risk, compensating controls, owner, approver, removal issue, and expires within 60 days. Any in-scope waiver yields `risk-accepted`, never `100% conformant` or `certified`.

**Rationale**: Incremental hardening needs controlled transition, but aggregate counts allow debt to move or reappear invisibly.

**Rejected**: Permanent allowlists, count-only baselines, wildcard waivers, or status language that hides exceptions.

**Consequence**: Removed findings are automatically retired and cannot return. Final project certification requires zero handwritten-code baseline debt and zero active waiver.

## Resolved Unknowns

| Question | Resolution |
|---|---|
| Is Spec Kit present? | Yes; `.specify/` and features 001-005 existed before this SDD. |
| Is the current bundled workflow safe for planning-only use? | No; it was replaced because it skipped quality phases and invoked implementation. |
| Are project Spec Kit skills portable today? | No; the manifest and absent `.agents/` tree disagree. Repair is an implementation task. |
| Do direct package `tsc` failures prove source incompatibility? | No; the audited failures resolved ignored stale sibling `dist` output. Source-mapped semantic compilation was clean. Deterministic graph/build order still needs enforcement. |
| Can the library certify the entire SaaS? | No; consumer-system controls are explicit integration obligations. |
| Are final performance limits already known? | No; provisional ratchets are defined, and absolute limits require reproducible baselines. |

## Research Exit Criteria

- Every material technical unknown has a decision or an explicit baseline task.
- Every decision is represented by at least one requirement, contract, plan phase, and implementation task.
- No decision authorizes product implementation before `GATE-SDD-APPROVED`.
