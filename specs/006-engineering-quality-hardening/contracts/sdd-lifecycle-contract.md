# SDD Lifecycle and Implementation Authorization Contract

**Contract ID**: SDD-LIFECYCLE-001
**Applies to**: Spec Kit feature 006-engineering-quality-hardening
**Current implementation authorization**: BLOCKED

## Objective

Ensure that requirements, research, design, contracts, implementation tasks, traceability, and acceptance evidence are completed as one reviewable package before any implementation begins.

## Mandatory SDD Manifest

The lifecycle uses two non-circular records:

1. A **readiness manifest** is generated before the human decision. It fingerprints the complete review content and may describe an uncommitted working-tree snapshot. It must not require or fabricate `approvedRevision`, `approvedAt`, `reviewer`, an approval statement, or an authorization token.
2. An **approval envelope** is created only after an explicit human decision. It binds the readiness-manifest hash to the exact committed revision and carries the authorization token. The decision record is not included in the content digest it signs.

The readiness manifest must fingerprint, at minimum:

- spec.md;
- research.md;
- data-model.md;
- plan.md;
- tasks.md;
- quickstart.md;
- every schema, normative contract, and example fixture under contracts;
- requirements, SDD-readiness, and implementation-readiness checklists;
- current-state audit and source-of-truth reconciliation;
- architecture, test, security, performance, CI-gate, risk, traceability, and Definition of Done artifacts;
- all strategy and review artifacts required by AGENTS.md.

`approval.md` must exist and must state `AWAITING_USER_APPROVAL` during readiness review, but it is validated as the future decision envelope rather than hashed into the review content it will sign. This avoids self-referential hashing.

Paths are repository-relative and must reject backslashes, UNC paths, drive-absolute paths, empty segments, and `..` traversal. Each readiness-manifest entry records path, SHA-256, and file size. The manifest records a deterministic source-tree hash and generation time; `candidateRevision` is optional until the reviewed snapshot has been committed. Directory-only entries are invalid.

## States

| State | Entry condition | Permitted work | Forbidden work | Exit condition |
|---|---|---|---|---|
| DRAFT | Feature directory exists | Create and revise SDD artifacts | All implementation and release mutation | Mandatory manifest complete |
| REVIEW | Mandatory artifacts exist | Resolve contradictions, placeholders, traceability, and contract defects | All implementation and release mutation | Automated SDD validation passes |
| READY_FOR_APPROVAL | No unresolved automated finding and a valid readiness manifest that does not claim approval | Human review and approval decision | All implementation and release mutation | Explicit human approval or rejection |
| APPROVED | Valid approval envelope binds exact hashes and revision and issues `APPROVED_FOR_IMPLEMENTATION` | Select the first approved implementation phase | Any work outside approved tasks | Material change or implementation start |
| IMPLEMENTING | Approved tasks are selected | Test-guided implementation within task scope | Unapproved scope, baseline laundering, publication | Phase checkpoint passes |
| CERTIFYING | Implementation checkpoints complete | Run exact-revision certification | Rebuilding different publish artifacts | Certified or rejected decision |
| CERTIFIED | Release contract passes | Publish the certified artifacts if separately authorized | Rebuild-and-publish substitution | New candidate |
| REJECTED | Approval or certification fails | Correct artifacts and return to REVIEW | Publication and conformance claim | New review candidate |

## Approval Preconditions

READY_FOR_APPROVAL requires all of the following:

1. Every mandatory artifact exists and is named in the manifest.
2. There are no TODO, TBD, NEEDS CLARIFICATION, unresolved placeholder, or conflicting status assertions.
3. Every FR maps to at least one implementation task and one acceptance/evidence mechanism.
4. Every task maps back to an approved requirement, design decision, or mandatory validation activity.
5. Contract schemas parse as JSON and validate their positive and controlled negative examples.
6. The task backlog begins with an explicit implementation block and contains no task already marked complete.
7. Constitution checks, source-of-truth precedence, risk owners, rollback boundaries, and phase dependencies are explicit.
8. The implementation-readiness checklist remains blocked until the user grants approval.
9. The Git diff contains no package/component source, dependency, baseline, generated release artifact, or publication change.
10. `approval.md` remains pending and contains neither `approvedRevision` nor `APPROVED_FOR_IMPLEMENTATION` before the human decision.

## Approval Record

A valid approval record contains:

| Field | Requirement |
|---|---|
| featureId | Exactly 006-engineering-quality-hardening |
| authorizationToken | Exactly `APPROVED_FOR_IMPLEMENTATION`; absent before approval |
| approvedRevision | Full 40-character Git commit SHA |
| sourceTreeHash | SHA-256 of the reviewed tree |
| artifactManifest | Every mandatory artifact path and SHA-256 |
| checklistResult | PASS |
| reviewer | Human identity |
| approvedAt | UTC RFC 3339 timestamp |
| approvalStatement | Unambiguous authorization to start implementation |
| approvedTaskRange | Initial tasks or phase explicitly authorized |

The lifecycle state `APPROVED` maps to implementation authorization only through the exact machine token `APPROVED_FOR_IMPLEMENTATION`. Silence, a green automated check, a previous feature approval, a pending readiness manifest, a human-readable use of “approved,” or approval of a subset of documents is not implementation authorization.

## Approval Invalidation

An existing approval becomes invalid when any material change affects:

- functional requirements or success criteria;
- architecture or package boundaries;
- public API compatibility policy;
- test, browser, accessibility, visual, security, or performance obligations;
- gate applicability, blocking semantics, thresholds, or waiver rules;
- release or artifact provenance;
- implementation phase order, task scope, or rollback conditions.

Editorial changes that do not alter meaning may retain approval only when the manifest is regenerated and the reviewer explicitly confirms the change as non-material.

## Enforcement Contract

The future lifecycle validator must:

1. resolve the active feature from repository configuration;
2. validate exactly one phase and authorization status;
3. calculate the pre-decision readiness manifest without requiring approval-only fields;
4. detect unresolved placeholders and contradictory assertions;
5. validate requirement-task-evidence traceability in both directions;
6. parse all machine-readable contracts;
7. reject approval-only fields before the decision and reject a missing, stale, partial, hash-mismatched, or tokenless approval envelope afterward;
8. run in read-only check mode and return non-zero on any failure;
9. emit a normalized, revision-bound report.

## Controlled Negative Probes

The lifecycle gate must fail when:

- one mandatory artifact is deleted;
- one placeholder is inserted;
- one functional requirement loses its task mapping;
- one task references an unknown requirement;
- the approval statement is absent or automated;
- a readiness candidate claims `approvedRevision` or `APPROVED_FOR_IMPLEMENTATION` before the decision;
- an APPROVED record omits the exact `APPROVED_FOR_IMPLEMENTATION` token;
- one approved artifact changes after approval;
- two documents claim different active phases;
- a product source file appears in the SDD-only diff.

Each probe records its expected stable failure code. An aggregate SDD gate must preserve the child failure and non-zero exit status.

## Stop Rule

At the time this contract is authored, implementation is BLOCKED. No content in this feature changes that state. Only a complete SDD package, a valid pre-decision readiness manifest, explicit user approval, and a valid approval envelope carrying `APPROVED_FOR_IMPLEMENTATION` can transition to APPROVED.
