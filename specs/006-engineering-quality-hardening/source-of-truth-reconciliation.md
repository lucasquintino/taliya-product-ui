# Source-of-Truth Reconciliation

**Status**: SDD READY FOR APPROVAL / READY FOR USER APPROVAL
**Implementation authorization**: AWAITING USER APPROVAL / BLOCKED
**Applies from**: 2026-08-08

## Purpose

This document prevents a maintainer or coding agent from selecting an obsolete phase, interpreting historical evidence as current certification, or silently choosing between contradictory documents.

## Authority and Precedence

The following order determines intent and scope:

1. explicit user direction for the current task;
2. the repository Constitution;
3. the closest applicable `AGENTS.md`, with root invariants never weakened by a subtree file;
4. the active Spec Kit 006 `spec.md`, approved decisions, contracts, `plan.md`, and `tasks.md`;
5. the relevant product/component contracts in Spec Kit 001;
6. specialized contracts and historical evidence in Spec Kits 002-005;
7. current implementation behavior and generated reports.

Executable gates determine whether an implementation satisfies the governing contract, but they do not rewrite product intent. If a gate, report, contract, or instruction disagrees with a higher-authority source, work stops, the inconsistency is recorded, and the conflict is resolved in the SDD before implementation resumes.

## Active State

| Field | Authoritative value |
| --- | --- |
| Active feature | `006-engineering-quality-hardening` |
| Active phase | SDD ready for explicit user approval; implementation blocked |
| Active plan | `specs/006-engineering-quality-hardening/plan.md` |
| Product implementation allowed | No |
| Dependency installation or update allowed | No |
| Baseline/report/artifact regeneration allowed | No |
| Package publication allowed | No |
| Next review transition | Explicit user approval or rejection of the fingerprinted readiness candidate |
| Unlock condition | Lifecycle `APPROVED` **and** authorization token `APPROVED_FOR_IMPLEMENTATION`, both recorded by explicit user approval against exact hashes |

## Historical Spec Kit Classification

| Spec | Current classification | Verified state | How 006 uses it |
| --- | --- | --- | --- |
| `001-product-ui-foundation` | Foundation product and visual contract | `spec.md` still says `Draft ready for approval`; `tasks.md` has 86 unchecked tasks; extensive implementation and execution evidence now exist | Preserve its product/package/token/component contracts; do not use its phase/status fields as current project state |
| `002-readiness-evidence-portability` | Implemented portability hardening with one external verification pending | 13 of 14 tasks checked; T012 clean-clone Windows/macOS/CI first remote matrix run remains open | Reuse provenance, freshness, check-mode, clean-clone, and synthetic-consumer concepts; supersede only where 006 is stricter |
| `003-official-story-anatomy` | Completed specialized architecture migration | 8 of 8 tasks checked | Preserve the rule that reusable anatomy belongs to official packages, not stories |
| `004-human-route-review` | Human browser-review contract and evidence family | Defines 73-route canonical/reduced/mobile/interaction/source decisions; has no implementation task ledger | Treat existing results as historical evidence only; 006 defines freshness and same-revision requirements |
| `005-joint-product-certification` | Historical joint certification evidence | Contains inventories, ledgers, findings, and 2026-08-04/05 snapshots; its runtime smoke still reports overflow and incomplete dimensions | Reuse inventory and acceptance anatomy, but never treat it as current global release certification |
| `006-engineering-quality-hardening` | Active SDD and future hardening program | SDD review changes in progress; final integrated validation and manifest are pending; implementation blocked | Sole authority for engineering-quality phases, gates, ratchets, waivers, and final certification |

Historical checkboxes and status labels are not rewritten retroactively merely to make the repository appear consistent. Reconciliation is explicit: the old artifact keeps its historical text, while this document classifies its current role.

## Contract Ownership

| Question | Source of truth |
| --- | --- |
| Product-library scope and prohibited backend logic | Constitution, root `AGENTS.md`, Spec 001 package/component contracts |
| Current hardening requirements and measurable outcomes | Spec 006 `spec.md` |
| Research decisions and rejected alternatives | Spec 006 `research.md` |
| Gate/evidence/waiver/release entities | Spec 006 `data-model.md` and `contracts/` |
| Execution order and stop conditions | Spec 006 `plan.md` |
| Implementable backlog | Spec 006 `tasks.md`, after unlock only |
| Current observed deficiencies | Spec 006 `current-state-audit.md` |
| CI applicability and blocking semantics | Spec 006 `ci-gate-matrix.md` |
| Completion vocabulary | Spec 006 `definition-of-done.md` |
| Visual/component anatomy | Relevant Spec 001 contracts and canonical source map |
| Current pass/fail proof | Fresh evidence generated from the exact source revision under review |

## Stable Status Vocabulary

Only these status meanings are permitted:

- `planned`: specified but not authorized for implementation;
- `blocked`: a prerequisite, blocking gate, or explicit approval is absent;
- `in progress`: authorized work has begun but completion evidence is incomplete;
- `passed`: one named gate passed for one identified revision and input set;
- `accepted risk`: a valid waiver exists; this is never `100% conformant`;
- `certified`: every required release gate passed for the exact published artifacts;
- `historical`: useful evidence that is not current certification;
- `not applicable`: selected only by a versioned change profile with a validated reason.

Words such as `ready`, `complete`, `official`, `final`, `100%`, or `certified` must be qualified by scope and evidence. A current-scope acceptance cannot be reported as global completion.

### SDD lifecycle and authorization mapping

Lifecycle state and authorization token are separate fields and transition atomically at approval:

| Review milestone | Lifecycle state | Review marker | Authorization token | Product work |
| --- | --- | --- | --- | --- |
| Corrections or integrated validation pending | `REVIEW` | `CHANGES_IN_PROGRESS` | `BLOCKED` | Forbidden |
| Final validation passed; human decision pending | `READY_FOR_APPROVAL` | `READY_FOR_USER_APPROVAL` | `AWAITING_USER_APPROVAL` | Forbidden |
| Explicit human approval bound to the exact revision and manifest | `APPROVED` | `APPROVED_BY_USER` | `APPROVED_FOR_IMPLEMENTATION` | Only the approved task range |

`APPROVED` is the lifecycle state defined by `contracts/sdd-lifecycle-contract.md`; `APPROVED_FOR_IMPLEMENTATION` is the matching authorization token. Neither value is valid alone, and neither may be inferred from an automated result.

## Conflict Protocol

When a conflict is detected:

1. identify both sources, their revision, and the exact conflicting statements;
2. determine their authority and whether either is historical or stale;
3. stop affected implementation and certification;
4. record the resolution in Spec 006 research/contracts/traceability;
5. update executable validation before resuming;
6. add a negative probe when the conflict could recur automatically.

Silently choosing the most convenient source is a `G-GOV` failure.

## Spec Kit/Codex Integration Drift

The integration manifest declares nine `.agents/skills/speckit-*` resources, but `.agents/` is absent in the current checkout. Until the repository-owned skills are restored and validated, the manifest is not proof that project Spec Kit commands are portable. Restoring those files must preserve the customized Constitution and templates; force reinitialization is not an acceptable shortcut.

## Unlock Decision

This reconciliation does not authorize implementation. The current state is `READY_FOR_APPROVAL / READY_FOR_USER_APPROVAL / AWAITING_USER_APPROVAL`; the complete quickstart passed and the exact readiness manifest fingerprints the candidate. `GATE-SDD-APPROVED` opens only when the user records the paired `APPROVED / APPROVED_FOR_IMPLEMENTATION` decision against the exact reviewed revision and manifest.
