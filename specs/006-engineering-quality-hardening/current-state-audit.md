# Current-State Engineering Audit

**Snapshot date**: 2026-08-08
**Scope**: repository governance, packages, React/component architecture, tests, browser evidence, accessibility, security, performance, artifacts, CI, and release readiness
**Decision**: implementation remains blocked by `GATE-SDD-APPROVED`
**Use of this document**: planning baseline, not release certification

## Executive Conclusion

The repository has a strong product contract, correct package dependency direction, extensive structural audits, broad Storybook coverage, and a functioning package/consumer evidence system. It is not yet globally ready and it does not yet enforce all of those strengths as deterministic, blocking, same-revision gates.

The decisive gaps are:

1. historical source-of-truth documents describe incompatible phases and completion states;
2. the main UI and CRM implementation and stylesheet files are too large for safe ownership and review;
3. the current CRM test suite is red on Windows because eight CSS assertions depend on LF-only text;
4. no maintained Playwright E2E gate or coverage threshold is present;
5. browser, accessibility, responsive, and 1:1 visual evidence is incomplete or stale;
6. the development/publishing toolchain has unresolved high-severity dependency findings;
7. CI workflows use mutable action tags, and publication still supplies a long-lived npm token despite requesting OIDC permission;
8. performance has diagnostic size observations but no certified package/runtime baselines or budgets;
9. existing readiness reports explicitly say global readiness is false.

Accordingly, the repository is best described as **architecturally promising but not release-certifiable under Spec Kit 006**. No product implementation, baseline update, artifact regeneration, or package publication is authorized by this audit.

## Method and Evidence Limits

The audit used repository files, versioned reports, package metadata, workflow definitions, direct file measurements, dependency-audit output, and focused test execution. It did not mutate product source or versioned baselines.

Current test and security observations were re-run on 2026-08-08. Historical Storybook/runtime and certification observations remain historical until regenerated from the implementation revision under review. Source file gzip measurements are diagnostics only; they are not bundle or runtime performance proof.

## Verified Snapshot

| Area | Evidence observed | Assessment | Blocking consequence |
| --- | --- | --- | --- |
| Active SDD | `AGENTS.md` and `.specify/feature.json` point to Spec Kit 006 | One active planning feature is now identified | Implementation still needs completed SDD checklist and explicit user approval |
| Spec Kit integration | `.specify/integrations/codex.manifest.json` lists nine `.agents/skills/speckit-*` files, but `.agents/` is absent | Integration manifest and checkout disagree | Governance validation must fail broken skill references |
| Foundation governance | Spec 001 contains detailed product, token, component, Storybook, and package contracts | Strong design intent | Its `Draft ready for approval` status and 86 unchecked tasks do not describe the implemented repository truthfully |
| Package direction | `tokens -> ui -> crm -> docs` is documented and structural audits reject reverse imports | Strong architectural boundary | Must remain blocking throughout modularization |
| Reuse | The component architecture audit reports 273 CRM function components, with 32 justified compound-root native controls and no unclassified primitive debt | Strong current classification | Static classification does not prove behavior, accessibility, or visual correctness |
| Main source shape | `ui/index.tsx`: 5,236 lines, 220 export statements; `crm/index.tsx`: 23,869 lines, 818 export statements | Excessive ownership and review surface | Requires compatibility-first modularization and no-growth ratchets |
| Main CSS shape | `ui/styles.css`: 6,013 lines/166,836 bytes; `crm/styles.css`: 34,889 lines/1,214,942 bytes | Excessive shared cascade and delivery surface | Requires family ownership, subpath strategy, and measured CSS budgets |
| Unit/component tests | Current run: tokens 5/5 pass; UI 49/49 pass; CRM 194/202 pass; docs smoke 5/5 pass | Overall gate is red | `G-UNIT` must remain blocking until 202/202 CRM tests pass portably |
| CRM failures | Eight failures compare raw CSS text containing CRLF against LF-only literals | Test portability defect; no visual regression was proven by these failures | Normalize/parse semantic CSS assertions and test on the OS matrix |
| TypeScript diagnosis | Earlier direct package typecheck errors resolved ignored, stale sibling `dist` outputs; the current source graph was semantically valid | Artifact-isolation defect, **not source semantic drift** | Typecheck must build/isolate current dependencies and reject stale derived inputs |
| Coverage | Vitest configs contain no coverage thresholds; current tests do not emit a certified coverage artifact | Behavioral completeness is unproven | Add per-package and changed-line coverage plus critical-behavior mapping |
| E2E | No Playwright configuration or maintained E2E suite is present | Critical consumer journeys are unproven | Add PR Chromium and release Chromium/Firefox/WebKit gates |
| Story runtime | Versioned 2026-08-05 static Storybook audit scanned 635 stories, found 0 render errors and 0 unnamed visible controls, but 85 stories had overflow across 87 checks | Useful historical smoke, currently failing and stale | Rebuild, classify intentional canvases, fix unapproved overflow, and rerun |
| Component certification | Historical review records 367/367 behavior classifications, but only 100 components with isolated reference stories and 187/367 with explicit variant/state story evidence | Partial evidence | Missing story/state/browser evidence must block affected scope |
| Accessibility | Existing DOM smoke only checks visible accessible names; keyboard, focus order/traps, dynamic announcements, contrast, and reduced motion remain unproven | Incomplete | Add automated axe plus browser-observed keyboard/focus contracts |
| Dependency security | Current production audit: 0 low/moderate/high/critical; full toolchain audit: 1 low, 3 moderate, 13 high, 0 critical | Runtime graph is clean; build/release graph is not | High/critical findings in either release path block publication |
| Workflow security | Actions are referenced by mutable major tags; publish workflow grants OIDC but also passes `NPM_TOKEN` | Supply-chain hardening incomplete | Pin actions by commit, minimize permissions, and use protected trusted publishing |
| Performance | Source CSS compresses diagnostically to 18,910 bytes (`ui`) and 114,230 bytes (`crm`); there are no certified bundle, tarball, tree-shaking, or React runtime budgets | No measured bottleneck conclusion is possible | Establish controlled baselines before accepting performance claims |
| Artifact/readiness | The versioned official-library audit says `Status: fail`, current Internal ready `false`, CRM real can start `false`, and global goal complete `false` | Explicitly not globally ready | Stale/local pass reports cannot override aggregate failure |
| Release process | Pack, package-artifact, synthetic-consumer, provenance, and release scripts exist | Good foundation | Must certify and publish the exact already-tested artifacts from one revision |

## What Is Already Good

- Product UI is isolated from the landing project and is intentionally prop/callback driven.
- Package ownership and dependency direction are explicit and checked.
- Tokens and reusable primitive ownership are first-class contracts.
- Story-only reusable anatomy is prohibited and audited.
- Public API, package contents, consumer fixtures, report freshness, and report provenance have existing mechanisms to build on.
- Historical audits are unusually explicit about what they do **not** prove.
- The canonical visual-source and component-level approval protocol is precise.

These strengths reduce migration risk, but none of them substitutes for current behavioral, browser, security, performance, or same-revision release evidence.

## Correct Interpretation of “100%”

For this program, `100% conformant` means every gate selected by the declared change profile passed against one clean source revision, with current evidence and no waiver in the changed scope. It does not mean zero possible defects, and it cannot be claimed from lint, build, static audits, Storybook story count, package audit, or coverage percentage alone.

## Required Direction

The repository should be hardened in controlled phases: reconcile governance; make gates, CI, and provenance deterministic; establish complete test/browser/accessibility/visual/E2E/consumer evidence; freeze the public API and enforce AST/fingerprint ratchets; modularize UI together with UI CSS; modularize CRM together with CRM CSS; harden security and the supply chain; establish performance baselines and budgets; and finally certify the exact release artifacts. The phase sequence and stop conditions are defined in `plan.md`, `ci-gate-matrix.md`, and `definition-of-done.md`.
