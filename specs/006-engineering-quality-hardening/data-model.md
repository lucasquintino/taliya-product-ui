# Domain Model: Engineering Quality Hardening

**Feature**: 006-engineering-quality-hardening
**Status**: SDD design artifact
**Implementation authorization**: BLOCKED until the complete SDD is accepted and the user explicitly approves implementation

## Purpose

This model defines the records, identities, relationships, and state transitions required to turn engineering guidance into revision-bound, executable evidence. It is a design contract; it does not authorize product, package, baseline, artifact, dependency, or publication changes.

## Aggregate Boundaries

### 1. Governance Policy

The Governance Policy aggregate selects what a change must prove.

#### EngineeringRule

| Field | Type | Required | Invariant |
|---|---|---:|---|
| id | stable string | yes | Unique, immutable, and independent of file position |
| statement | string | yes | One observable obligation |
| scope | path, package, symbol, or repository selector | yes | Must be machine-resolvable |
| severity | info, low, moderate, high, critical | yes | Drives blocking and waiver policy |
| enforcementKind | static, test, browser, review, release, external | yes | Cannot be documentation-only for a blocking rule |
| evidenceKinds | set | yes | At least one evidence kind for enforceable rules |
| owner | identity | yes | Must remain accountable while the rule is active |
| references | URI set | yes | Includes the applicable constitution, contract, or standard |
| waiverPolicy | forbidden or policy reference | yes | Critical irreversible risks are non-waivable |
| lifecycle | proposed, active, deprecated, retired | yes | Only active rules select gates |

#### ChangeProfile

| Field | Type | Required | Invariant |
|---|---|---:|---|
| id | canonical kebab-case profile ID | yes | One of `sdd-only`, `governance`, `documentation-only`, `tokens`, `ui-component`, `crm-component`, `storybook-docs`, `dependency-build`, `workflow-release`, or `full` |
| matchers | changed paths and declared impact selectors | yes | Both match and non-match examples are required |
| requiredGates | gate IDs by PR, nightly, and release stage | yes | A blocking gate cannot be silently downgraded |
| nonApplicableGates | reasoned exclusions | no | Every exclusion records a profile-based reason |
| policyVersion | semantic version | yes | Binds profile resolution to one policy |

#### GateDefinition

| Field | Type | Required | Invariant |
|---|---|---:|---|
| id | canonical gate ID | yes | Exactly one ID from the canonical inventory in `ci-gate-matrix.md`: `GATE-SDD-APPROVED` or a declared `G-*` ID; aliases and invented IDs are invalid |
| command | argv-style command definition | yes | Must preserve child exit status |
| stages | PR, nightly, release | yes | Non-empty |
| inputs | source and configuration selectors | yes | Every decision-affecting input is fingerprinted |
| outputs | evidence kinds | yes | Outputs are revision-bound |
| blocking | boolean | yes | Blocking failures return non-zero |
| checkMode | read-only boolean | yes | Check mode cannot mutate tracked files |
| supportedEnvironments | OS, runtime, browser matrix | yes | Portability is part of the gate contract |
| negativeProbes | controlled failing fixtures | yes | At least one for every blocking failure path |

Relationships:

- EngineeringRule 1..n -> GateDefinition
- ChangeProfile n..n -> GateDefinition
- ChangeProfile n..n -> EngineeringRule
- Governance Policy 1 -> many rules, profiles, and gates

### 2. Execution and Evidence

The Execution and Evidence aggregate records what actually ran and what it proved.

#### GateRun

| Field | Type | Required | Invariant |
|---|---|---:|---|
| runId | globally unique string | yes | Immutable |
| gateId | GateDefinition ID | yes | Gate exists in the recorded policy version |
| profileIds | canonical ChangeProfile ID set | yes | Non-empty; records the union that selected or excluded the gate |
| stage | PR, nightly, release | yes | Selected by a matching profile |
| commitSha | 40-character Git SHA | yes | Shared by all certification evidence |
| sourceTreeHash | SHA-256 | yes | Detects dirty or mismatched content |
| configHash | SHA-256 | yes | Includes the effective policy and gate configuration |
| runner | OS, architecture, runtime, browser/tool versions | yes | No machine-specific absolute paths in normalized output |
| startedAt, endedAt | UTC timestamps | yes | endedAt is not before startedAt |
| status | pass, fail, blocked, error, not-applicable | yes | `not-applicable` is a policy decision, never a manual skip or pass |
| notApplicable | profile ID and reason | only for not-applicable | Reason is mandatory, policy-derived, and at least 20 characters; the profile must name that gate as excludable |
| exitCode | non-negative integer | yes | pass and not-applicable require zero; fail, blocked, and error require non-zero |
| failureCodes | stable string set | yes | Empty for pass and valid not-applicable; non-empty for fail, blocked, and error |
| inputFingerprints | named SHA-256 set | yes | Covers every decision-affecting input |
| evidenceIds | EvidenceArtifact IDs | yes | Every declared output is present |
| decisionFingerprint | SHA-256 | yes | Stable for normalized identical inputs |

A `not-applicable` run emits no evidence artifact and cannot satisfy a gate required by any selected profile. If one selected profile requires a gate while another permits exclusion, required wins. Cross-field membership between `notApplicable.profileId` and `profileIds`, plus policy authorization of the exclusion, is enforced by the semantic validator after JSON Schema validation.

#### EvidenceArtifact

| Field | Type | Required | Invariant |
|---|---|---:|---|
| artifactId | globally unique string | yes | Immutable |
| kind | controlled evidence kind | yes | Matches a GateDefinition output |
| relativePath | repository-relative path | yes | Absolute and parent-traversal paths are invalid |
| sha256 | SHA-256 | yes | Hashes the exact stored artifact |
| producedBy | GateRun ID | yes | Producer run exists |
| commitSha | 40-character Git SHA | yes | Equals the producer commit |
| sourceTreeHash | SHA-256 | yes | Equals the producer source tree |
| inputFingerprints | named SHA-256 set | yes | Enables stale-evidence rejection |
| tool | name and version | yes | Tool drift is explicit |
| environment | normalized execution environment | yes | Portable, no user paths or secrets |
| generatedAt | UTC timestamp | yes | Used with the evidence freshness policy |
| decision | pass, fail, informative, risk-accepted | yes | Informative evidence cannot satisfy a blocking gate; `risk-accepted` requires one or more valid waiver IDs and prevents 100% conformance |

Relationships:

- GateDefinition 1 -> many GateRun
- GateRun 1 -> many EvidenceArtifact
- GateRun n -> 1 Git revision
- ReleaseCandidate n..n -> GateRun and EvidenceArtifact

### 3. Debt and Exceptions

#### BaselineFinding

| Field | Type | Required | Invariant |
|---|---|---:|---|
| fingerprint | SHA-256 | yes | Derived from rule ID, normalized path, symbol, and semantic signature |
| ruleId | EngineeringRule ID | yes | Rule remains resolvable |
| normalizedPath | repository-relative path | yes | A rename does not silently create new debt |
| symbol | stable symbol selector | when available | Prefer semantic identity over line number |
| semanticSignature | normalized violation signature | yes | Excludes unstable timestamps and physical workspace paths |
| classification | handwritten, generated, third-party | yes | Generated catalogs have separate budgets |
| introducedRevision | Git SHA | yes | Historical provenance |
| state | active, removed | yes | Removed findings cannot re-enter unnoticed |

Ratchet transitions:

- active -> removed is allowed when the current scan no longer finds the fingerprint.
- removed -> active is a regression and fails the gate.
- active -> active with changed path requires an explicit identity-preserving move record.
- unknown -> active is baseline growth and requires failure, not automatic baseline update.

#### Waiver

| Field | Type | Required | Invariant |
|---|---|---:|---|
| waiverId | stable string | yes | Unique and reviewable |
| decision | risk-accepted | yes | Exact machine value is `risk-accepted`; human interfaces may display “accepted risk” |
| ruleId | EngineeringRule ID | yes | Exact rule only |
| scope | exact paths and/or symbols | yes | No repository-wide wildcard |
| ruleSeverity | low, moderate, high | yes | Critical irreversible risks are excluded |
| reason | string | yes | Explains why compliance is temporarily impossible |
| risk | string | yes | States user, system, and release impact |
| compensatingControls | non-empty set | yes | Verifiable while active |
| owner | identity | yes | Responsible for removal |
| approvedBy | different accountable identity | yes | Self-approval is invalid |
| trackingIssue | stable issue URI or ID | yes | Removal work is scheduled |
| createdAt, expiresAt | UTC timestamps | yes | Expiry is no more than 60 days after creation |
| status | active, expired, revoked, resolved | yes | Expired waivers fail validation |

Relationships:

- EngineeringRule 1 -> many Waiver over time
- Waiver 1 -> exact path and/or symbol scope
- GateRun n -> zero or more active Waiver decisions
- A change with an active waiver can be accepted risk but cannot be 100% conformant

### 4. Compatibility and Architecture

#### PublicAPISymbol

| Field | Type | Required | Invariant |
|---|---|---:|---|
| symbolId | package plus export path plus name | yes | Stable across internal moves |
| package | tokens, ui, crm | yes | Ownership follows package boundaries |
| exportPath | public root or approved subpath | yes | Internal paths are not public contracts |
| runtimeKind | value, type, style, side-effect | yes | Runtime and declaration inventories are both covered |
| signatureFingerprint | SHA-256 | yes | Derived from normalized public declaration or export |
| classification | canonical, compatibility-alias, deprecated, internal-debt | yes | Every existing export is classified |
| replacement | symbol ID | for deprecated/alias when applicable | Must be public and resolvable |
| removalVersion | major version | for planned removal | No unversioned removal |
| owner | package/domain identity | yes | Required before modularization |

#### ArchitectureBoundary

| Field | Type | Required | Invariant |
|---|---|---:|---|
| boundaryId | stable string | yes | Unique |
| sourceScope | path/package matcher | yes | Has one owning layer |
| allowedDependencies | boundary IDs | yes | Enforces tokens -> ui -> crm -> docs |
| forbiddenDependencies | boundary IDs/patterns | yes | Includes reverse and internal imports |
| budgets | size, complexity, dependency, cycle limits | yes | Handwritten and generated files are distinct |
| ratchetPolicy | no-growth/final-zero policy | yes | Removed debt cannot return |

Relationships:

- PublicAPISymbol n -> 1 owning ArchitectureBoundary
- ArchitectureBoundary n..n -> permitted dependency edges
- BaselineFinding n -> 1 EngineeringRule and affected boundary

### 5. Release Certification

#### ReleaseCandidate

| Field | Type | Required | Invariant |
|---|---|---:|---|
| candidateId | stable string | yes | One candidate per revision and version set |
| commitSha | 40-character Git SHA | yes | Source of every artifact and evidence record |
| cleanSource | boolean | yes | Must be true for certification |
| lockfileHash | SHA-256 | yes | Matches build inputs |
| policyVersion | semantic version | yes | Effective policy is immutable for the candidate |
| packages | name, version, tarball hash set | yes | The validated tarballs are the publishable tarballs |
| gateRuns | GateRun ID set | yes | All required profile gates are present and fresh |
| evidence | EvidenceArtifact ID set | yes | Hashes match stored artifacts |
| consumerValidation | clean packed-consumer run | yes | Installs candidate tarballs, not workspace links |
| matrices | OS, runtime, and browser coverage | yes | Satisfies release profile |
| securityDecision | separate runtime/toolchain results | yes | Zero critical/high at publication |
| performanceDecision | budget comparison | yes | Compatible production-like scenarios only |
| activeWaiverCount | integer | yes | Must be zero for certified or 100% conformant |
| unauthorizedBaselineGrowth | integer | yes | Must be zero |
| provenance | SBOM, attestation, publish identity | yes | Refers to the same artifacts |
| decision | certified, risk-accepted, or rejected | yes | Certified only when every invariant passes and no active/expired waiver exists; risk-accepted is not publish-eligible |

#### SDDReviewCandidate

| Field | Type | Required | Invariant |
|---|---|---:|---|
| featureId | 006-engineering-quality-hardening | yes | Exact active feature |
| readinessManifest | relative path, SHA-256, and byte-size set | yes | Covers every review-content artifact but excludes the decision envelope from the digest it will sign |
| sourceTreeHash | SHA-256 | yes | Binds the exact reviewed working-tree snapshot |
| candidateRevision | Git SHA | no | Optional before the reviewed snapshot is committed |
| generatedAt | UTC timestamp | yes | Generated before the human decision |
| checklistDecision | pass or fail | yes | pass requires no unresolved placeholder |
| lifecycle | READY_FOR_APPROVAL | yes | Cannot claim APPROVED or contain an authorization token |

`approval.md` exists as a pending decision envelope during readiness review. It is schema/status checked, but is not recursively included in the content digest that it will later sign. A readiness candidate must not contain `approvedRevision`, a reviewer decision, or an implementation authorization token.

#### SDDApproval

| Field | Type | Required | Invariant |
|---|---|---:|---|
| featureId | 006-engineering-quality-hardening | yes | Exact active feature |
| artifactManifest | relative path, SHA-256, and byte-size set | yes | Equals the accepted SDDReviewCandidate readiness manifest |
| checklistDecision | pass or fail | yes | pass requires no unresolved placeholder |
| reviewer | human identity | yes | Automated completion is insufficient |
| approvedAt | UTC timestamp | yes | Must follow artifact completion |
| approvalStatement | explicit string | yes | Must explicitly authorize implementation |
| approvedRevision | Git SHA | yes | Material SDD changes invalidate approval |
| authorizationToken | APPROVED_FOR_IMPLEMENTATION | yes | Exact machine token created only after explicit approval |

Relationships:

- SDDApproval 1 -> exact SDD artifact manifest
- SDDApproval 1 -> approved design revision
- ReleaseCandidate exists only after valid SDDApproval and implementation

## Lifecycle State Machines

### SDD lifecycle

1. DRAFT: artifacts may be created or revised; implementation is forbidden.
2. REVIEW: all mandatory artifacts exist; unresolved review findings keep implementation forbidden.
3. READY_FOR_APPROVAL: automated consistency checks and the non-circular readiness manifest pass; approval-only fields are absent and implementation remains forbidden.
4. APPROVED: explicit human approval is recorded against exact artifact hashes and revision, and the state issues the exact `APPROVED_FOR_IMPLEMENTATION` authorization token.
5. IMPLEMENTING: only tasks selected by the approved plan may change implementation.
6. CERTIFYING: implementation is complete enough to run release-profile evidence.
7. CERTIFIED or REJECTED: terminal decision for that candidate.

Any material change to requirements, architecture, contracts, gate selection, security boundary, acceptance criteria, or task scope moves APPROVED back to REVIEW, revokes `APPROVED_FOR_IMPLEMENTATION`, and invalidates implementation authorization until re-approved.

### Gate run lifecycle

1. SCHEDULED -> RUNNING
2. RUNNING -> PASS, FAIL, BLOCKED, ERROR, or NOT_APPLICABLE
3. Terminal runs are immutable; a retry creates a new run ID.
4. A flaky retry never overwrites the failing run and cannot by itself satisfy certification.
5. NOT_APPLICABLE is valid only with a canonical selected profile and policy-derived reason; it cannot replace a required gate.

### Waiver lifecycle

1. PROPOSED -> ACTIVE only after independent approval and schema validation.
2. ACTIVE -> RESOLVED, REVOKED, or EXPIRED.
3. EXPIRED is failing evidence until the underlying rule passes or a newly reviewed waiver is approved.
4. Waivers cannot transition back to ACTIVE after expiry; a new waiver ID and new approval are required.

## Cross-Aggregate Invariants

1. One revision: all blocking runs, artifacts, tarballs, lockfile, approval, and provenance in a decision refer to one commit and one source-tree fingerprint.
2. No stale proof: artifact fingerprints and effective tool/config versions must match the current decision inputs.
3. No hidden mutation: check mode leaves tracked files unchanged; update mode is explicit and reviewable.
4. No green wrapper: an aggregate gate fails if any blocking child run fails, errors, or is missing.
5. No false conformance: active waiver, expired waiver, missing applicable gate, stale evidence, dirty source, or unauthorized baseline growth prevents 100% conformant.
6. No security scope inflation: this library certifies its code and package-delivery controls, not consumer authentication, authorization, tenant isolation, CSP, CSRF, rate limiting, storage, or backend auditing.
7. No compatibility by accident: every exported symbol is classified before internal modularization.
8. No debt laundering: path moves, renames, newline changes, timestamps, generated output, or aggregate counts cannot hide a finding.
9. No implementation before approval: the existence of this model or passing design validation never constitutes implementation authorization.
10. Canonical vocabulary only: gate and profile IDs come from `ci-gate-matrix.md`; machine risk decisions use `risk-accepted`; APPROVED maps only to `APPROVED_FOR_IMPLEMENTATION`.
11. Safe paths only: every repository path uses `/`, is repository-relative, and rejects backslashes, UNC paths, drive-absolute paths, empty segments, and `..` traversal.

## Contract Mapping

| Concern | Normative contract |
|---|---|
| SDD phases and authorization | contracts/sdd-lifecycle-contract.md |
| Rules, profiles, gates, budgets | contracts/quality-policy.schema.json |
| Executed gate decision | contracts/gate-run.schema.json |
| Artifact provenance and freshness | contracts/evidence-provenance.schema.json |
| Time-bounded accepted risk | contracts/waiver.schema.json |
| Public export preservation | contracts/public-api-compatibility-contract.md |
| Architecture debt ratchet | contracts/architecture-ratchet-contract.md |
| Release decision | contracts/release-certification.schema.json |
