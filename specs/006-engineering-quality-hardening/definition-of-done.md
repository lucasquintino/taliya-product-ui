# Definition of Done

**Status**: authoritative completion vocabulary for Spec Kit 006
**Implementation authorization**: blocked by `GATE-SDD-APPROVED`

## Core Rule

Done is a scope-specific, evidence-backed state for one identified revision. A build, lint pass, audit report, Storybook count, coverage percentage, screenshot, or reviewer statement is never sufficient by itself.

`100% conformant` means all gates selected by the declared change profile passed against the same clean revision and inputs, with current evidence and no waiver in the changed scope. It does not mean defect-free software.

The only declared profile values are `sdd-only`, `governance`, `documentation-only`, `tokens`, `ui-component`, `crm-component`, `storybook-docs`, `dependency-build`, `workflow-release`, and `full`, sourced from `governance/quality-policy.json`.

## SDD Done

The SDD package is `READY_FOR_APPROVAL` only when:

- the mandatory manifest in `contracts/sdd-lifecycle-contract.md` contains every file and hash;
- the feature contains complete specification, research, model, contracts, plan, backlog, quickstart, audit, strategies, gate matrix, risk register, traceability, checklists, and approval record;
- no unresolved placeholder, clarification, contradictory phase/status, broken reference, invalid schema, or unowned risk remains;
- every functional requirement maps to at least one future task and acceptance/evidence mechanism;
- every task maps back to an approved requirement, decision, risk, or required validation;
- the SDD-readiness checklist passes;
- the diff contains no product/package source, dependency, baseline, release artifact, or publication mutation.

SDD readiness is not implementation authorization. `GATE-SDD-APPROVED` opens only when the user explicitly approves the exact reviewed SDD manifest. Any material SDD change invalidates approval and returns the feature to review.

## Change Done

Every authorized implementation change satisfies all applicable rows:

| Dimension | Done condition | Evidence |
| --- | --- | --- |
| Scope | Change matches an approved task and declared profile; no unrelated behavior is mixed in | task/FR/decision mapping, diff classification |
| Source of truth | No instruction, rule, contract, task, or status contradiction | `G-GOV` |
| Code quality | Clear ownership, typed public boundary, no new `any`, cycle, unowned suppression, or budget violation | `G-TYPE`, `G-LINT`, `G-ARCH` |
| React | Pure render, immutable props/state, stable Hook order/identity, minimal state, effects only for external synchronization | lint/static probes plus behavior tests |
| Componentization/reuse | primitive/domain ownership is correct; no story-only reusable anatomy or parallel clone | architecture audit and isolated story |
| Public API | imports, declarations, aliases, refs/events/styles remain compatible or an approved versioned change exists | public API inventory and packed consumer |
| Tests | direct regression test failed before and passes after where behavior changes; affected suites pass | `G-UNIT`, `G-COV` |
| Browser behavior | applicable interaction, focus, keyboard, state, responsive, and E2E contracts pass | `G-STORY-TEST`, `G-E2E-PR`, `G-E2E-RELEASE` |
| Accessibility | zero unwaived serious/critical finding and all applicable manual behavior rows pass | `G-A11Y` |
| Visual | static Storybook capture compared with canonical source; expected delta and human decision recorded | `G-VISUAL` |
| Tokens/styles | official tokens and selector ownership; no new literal/governance debt | `G-TOKENS`, `G-ARCH` |
| Security | secure sinks, dependencies, static analysis, secrets, and package content pass for scope | `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, `G-PACK` as selected by policy |
| Performance | compatible measured scenario stays within absolute and ratchet/allocation budget | `G-PERF` |
| Artifact/provenance | current commit, tree, config, inputs, reports, and artifacts agree | `G-PROVENANCE` |
| Portability | selected OS/browser matrix agrees; no path/newline/stale-output dependency | corresponding gate records plus `G-PROVENANCE` |
| Documentation | public contract, usage, migration, and decision records reflect behavior | docs/link/consumer verification |

## Component-Level Done

Every touched public component has a component contract containing source image/crop when applicable, exact extraction target, anatomy, variants, states, behavior, Storybook path, accessibility, responsive behavior, visual measurements, and public API.

Final review records this pass/fail matrix for every touched component:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| named component | pass/fail | pass/fail | pass/fail | pass/fail | pass/fail | pass/fail | pass/fail/not applicable with reason | approved/rejected |

Any failure in an applicable critical column rejects the component and its batch. A parent story does not substitute for an isolated story. A development Storybook preview does not certify visual parity.

## Phase Done

A phase is complete only when:

1. every task in its approved range is complete and traceable;
2. its entry and dependency conditions remained valid;
3. all direct and downstream affected gates pass on one revision;
4. negative probes still fail with their expected codes;
5. check mode leaves tracked files unchanged;
6. baselines shrink or remain unchanged except for a pre-approved allocation;
7. rollback instructions and checkpoint evidence are current;
8. no critical finding, expired waiver, stale evidence, or contradictory status remains.

The next phase does not start from “mostly green” evidence.

## Release Done

A release candidate is `certified` only when:

- versions, lockfile, source revision, source-tree hash, workflow, SBOM, provenance, and artifact hashes agree;
- Linux, Windows, and macOS clean-clone gates pass for supported Node versions;
- the full Chromium/Firefox/WebKit packed-consumer matrix passes;
- runtime and full-toolchain audits contain zero critical/high finding;
- static analysis and secret detection pass;
- every required test, coverage, accessibility, responsive, visual, and performance budget passes;
- no active or expired waiver participates;
- no unresolved handwritten-code architecture baseline debt remains for final project certification;
- the protected OIDC release environment is approved;
- the exact already-tested tarballs are published without rebuilding;
- post-publication package hashes and smoke installation match the certified artifacts.

If any row fails, status is `rejected` or `blocked`, not `certified with caveats`.

## Evidence Freshness and Same-Revision Rule

Evidence is valid only for the revision, source-tree/config/input fingerprints, environment configuration, and artifacts it names. A newer timestamp cannot repair a mismatched hash. Historical evidence may guide diagnosis but cannot satisfy a current blocking gate.

## Waivers and Baselines

- A valid in-scope waiver yields machine-readable `risk-accepted` and prevents `100% conformant`; a human report may display "accepted risk" without changing the serialized status.
- Critical irreversible security risks are not normally waivable.
- A count-only baseline is invalid; findings are fingerprinted by rule/path/symbol/value.
- Removed findings leave the baseline and cannot return.
- Final project certification requires zero active waiver and zero unresolved handwritten production-code baseline debt.

## Status Vocabulary

| Status | Meaning |
| --- | --- |
| `planned` | specified, not authorized |
| `blocked` | prerequisite or blocking gate absent/failed |
| `in progress` | authorized work started; evidence incomplete |
| `passed` | one named gate passed for one revision/input set |
| `risk-accepted` | valid waiver exists; not fully conformant; human display may read "accepted risk" |
| `ready for approval` | complete SDD awaits explicit user decision |
| `approved` | exact SDD manifest explicitly authorized |
| `certified` | full release contract passed for exact artifacts |
| `historical` | evidence retained but not current certification |

At SDD authoring time, the only honest implementation status is `blocked`. This document cannot open `GATE-SDD-APPROVED`.
