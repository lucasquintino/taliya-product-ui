# CI Gate Matrix

**Status**: active execution contract; `GATE-SDD-APPROVED` is open for T101-T176 and implementation is in progress
**Primary requirements**: FR-008 through FR-010, FR-022 through FR-041, FR-047 through FR-048
**Default behavior**: fail closed

The implemented command equivalents are wired in `package.json`, `.github/workflows/library-portability.yml`, and `.github/workflows/release-certification.yml`. Final release claims still require the clean-clone matrix and exact artifact handoff.

## Gate Semantics

A gate is green only when its selected command exits zero, all declared evidence is present and schema-valid, the evidence fingerprints the current clean source revision and inputs, and no child result is failed, blocked, stale, missing, or waived outside policy.

The command names below are the implemented interfaces used by the current workflows. They remain fail-closed: a missing report, stale fingerprint, dirty source tree, non-zero child, or unapproved variance is a failure.

## Canonical Gate Inventory

| ID | Responsibility | Command/interface | PR | Nightly | Release | Current state |
| --- | --- | --- | :---: | :---: | :---: | --- |
| `GATE-SDD-APPROVED` | Validate complete SDD manifest and explicit human approval | approval envelope + readiness-manifest validator | SDD | SDD | precondition | Open for T101-T176; material SDD changes reopen review |
| `G-GOV` | Instructions, rules, profiles, skills, references, waivers, contradictions | `corepack pnpm quality:governance` | Yes | Yes | Yes | Implemented; 10 profiles, 23 gates, 11 repository-local skills, and status/rules validators pass |
| `G-TYPE` | Clean deterministic TypeScript graph and declarations | `corepack pnpm typecheck` plus stale-artifact probes | Yes | OS matrix | OS matrix | Precursor exists; artifact isolation needs hardening |
| `G-LINT` | ESLint/React/Hook/security/complexity rules | `corepack pnpm lint` plus `architecture:standards` | Yes | Yes | Yes | Implemented; ESLint and code-standard ratchets pass locally |
| `G-UNIT` | Unit/component/integration tests | `corepack pnpm test` | Yes | OS matrix | OS matrix | Implemented; tokens/UI/CRM/docs suites pass locally |
| `G-COV` | Per-package and changed-line coverage plus critical behavior | `corepack pnpm coverage` | Yes | Yes | Yes | Implemented; package and changed-line thresholds pass locally |
| `G-ARCH` | Package direction, cycles, public API, ownership, size/complexity ratchets | `package-boundaries:audit` + `architecture:standards` + `architecture:ratchet` | Yes | Yes | Yes | Implemented; package direction, code standards, and fingerprint ratchets pass locally |
| `G-TOKENS` | Token ownership, literals, baseline no-growth | `corepack pnpm tokens:audit` | affected | Yes | Yes | Existing audit; must join same-revision evidence |
| `G-STORY-BUILD` | Static Storybook builds from current packages | `corepack pnpm storybook:build` | affected | Yes | Yes | Exists; build alone is not certification |
| `G-STORY-TEST` | Story render, interaction, console, empty-root checks in browser | `story:tests` + `story:interactions` | affected | full | full | Implemented; static Storybook interactions pass 636/636 |
| `G-A11Y` | axe plus keyboard/focus/name/semantic/reduced-motion contracts | `scripts/quality/run-a11y.mjs` + browser contracts | affected | full | full | Implemented; axe/name/focus/reduced-motion contracts run in browser workflows |
| `G-E2E-PR` | Critical packed-consumer journeys in Chromium | `corepack pnpm e2e:pr` | affected | Yes | Yes | Implemented; 18/18 Chromium PR journeys pass locally |
| `G-E2E-RELEASE` | Full packed-consumer journeys in Chromium/Firefox/WebKit | `corepack pnpm e2e:release:evidence` | No | scheduled | Yes | Implemented; six local projects are structured and green; clean-clone OS matrix remains release-blocking |
| `G-VISUAL` | Static captures, canonical mapping, diffs, human 1:1 decision | capture + `compare-visuals.mjs` + `validate-visual-approvals.mjs` | affected | full | full | Implemented; 63/63 current targets and tracked human approval registry |
| `G-SEC-RUNTIME` | Production dependency security | `security:dependencies --prod` | lock/runtime | Yes | Yes | Implemented; current runtime audit is clean |
| `G-SEC-TOOLCHAIN` | Full build/test/publish dependency security | `security:dependencies` | lock/workflow | Yes | Yes | Implemented; current toolchain audit has no blocking high/critical finding |
| `G-SEC-SAST` | Static security/workflow analysis | `security:sast` | affected | full | full | Implemented; SAST and workflow policy checks pass |
| `G-SEC-SECRETS` | Secret detection without leaking secret value | `security:secrets` | Yes | full | full | Implemented; secret scan passes |
| `G-PERF` | Artifact, tree-shaking, React, memory, interaction budgets | `performance:evidence` + `audit-package-performance.mjs` | affected | full | full | Implemented; budgets, ratchets, and optimization ledger pass |
| `G-PACK` | Fresh tarballs, contents, exports, declarations, CSS, SBOM | `corepack pnpm pack:local` plus `package-artifacts:audit` | public/build | Yes | Yes | Strong precursor; exact-artifact chain incomplete |
| `G-CONSUMER` | Clean packed-consumer compile/runtime/browser compatibility | `corepack pnpm future-consumer-fixture:audit` + `consumer:packed-audit` + Playwright E2E | public/build | Yes | Yes | Implemented; packed consumer and browser journeys pass locally; clean-clone release matrix remains required |
| `G-PROVENANCE` | Same-revision source/input/evidence/artifact hashes and freshness | `provenance:evidence` + `certify-release.mjs` | Yes | Yes | Yes | Implemented; final decision still requires a clean revision and exact release artifacts |
| `G-RELEASE` | Certify and publish exact tested artifacts through protected identity | `certify-release.mjs` + release workflow + exact-artifact handoff | No | dry run | Yes | Implemented workflow; certification remains blocked until clean revision, SBOM/hash bundle, and CI matrix pass |

`affected` means selected by the union of path profile and declared impact. Unknown or ambiguous production scope receives the full profile.

## Stage Matrix

| Stage | Runner/browser matrix | Evidence lifetime | Blocking rule |
| --- | --- | --- | --- |
| PR | Linux fast path; changed portability-sensitive scope also runs Windows; Chromium for affected browser journeys | exact PR head/source tree | Required gate failure blocks merge |
| Nightly | Linux, Windows, macOS on supported Node lines; Chromium, Firefox, WebKit for full critical browser inventory | exact scheduled commit, never reused after source/input change | Failure opens/updates an owned finding and invalidates dependent readiness |
| Release | Clean Linux/Windows/macOS matrix; full three-browser packed consumer; protected release environment | exact candidate only | Any failure, stale/missing evidence, active waiver, or artifact mismatch blocks publication |

OS/runtime matrices use the repository-supported Node ranges (`^20.19.0 || >=22.12.0`) and frozen pnpm 9.15.4 lockfile installation. A support-policy change is a governance and release-profile change.

## Change Profiles

`governance/quality-policy.json` is the sole physical registry for engineering rules, the ten change profiles below, the canonical gate inventory, budgets, and waiver policy. It validates against `contracts/quality-policy.schema.json`. No YAML policy, split rule catalog, split profile catalog, prose-only alias, or workflow-local profile definition is authoritative.

Profiles select the union of all applicable gates. `GATE-SDD-APPROVED` is the global implementation precondition. The table lists the complete gate set for each profile; it is not permission to skip a gate selected by another impact.

| Profile | Typical paths/impact | Mandatory additions |
| --- | --- | --- |
| `sdd-only` | `specs/006/**`, `.specify/**`, current planning instructions | `GATE-SDD-APPROVED` |
| `governance` | `AGENTS.md`, repository skills/rules, `governance/**`, quality scripts/policies | `G-GOV`, `G-LINT`, `G-UNIT`, `G-PROVENANCE` |
| `documentation-only` | prose with no story/build/package/contract impact | `G-GOV`, `G-PROVENANCE`; misclassified code/config escalates to `full` |
| `tokens` | `packages/tokens/**`, token contracts/baselines | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE` |
| `ui-component` | `packages/ui/**` | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-SEC-SAST`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE` |
| `crm-component` | `packages/crm/**` | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-SEC-SAST`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE` |
| `storybook-docs` | `apps/docs/src/**`, `.storybook/**` | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PROVENANCE` |
| `dependency-build` | lockfile, package metadata, compiler/test/build config | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-ARCH`, `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE` |
| `workflow-release` | `.github/workflows/**`, changesets, publish/release scripts | `G-GOV`, `G-LINT`, `G-UNIT`, `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE`, `G-RELEASE` |
| `full` | ambiguous, cross-cutting, package-boundary, release-candidate | `G-GOV`, `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, `G-PERF`, `G-PACK`, `G-CONSUMER`, `G-PROVENANCE`, `G-RELEASE` |

Every profile has machine-tested match and non-match examples. Manual labeling can add impact; it cannot remove a gate selected by paths or API analysis.

## Aggregation Contract

The aggregate runner must:

1. resolve profiles from changed paths and declared impacts;
2. take the union of required gates;
3. invoke commands as argument arrays without unsafe shell interpolation;
4. preserve every child exit code and stable failure code;
5. stop or continue only according to declared diagnostic policy, never convert failure to pass;
6. reject missing evidence even when a process exits zero;
7. reject tracked mutations in check mode;
8. reject a dirty source tree for certification;
9. emit a normalized summary and one evidence record per gate;
10. return non-zero for fail, blocked, error, invalid `not applicable`, expired waiver, or stale/mismatched evidence.

## Mandatory Negative Probes

Every blocking gate includes a controlled probe for its defining failure. The cross-gate suite additionally proves:

- one failing child makes the aggregate fail;
- a child killed by timeout cannot be reported as pass;
- a missing report cannot inherit an earlier pass;
- a recent report from another commit is rejected;
- check mode fails if tracked content changes;
- CRLF/LF and path separator differences do not change semantic results;
- a missing `.agents` skill referenced by policy fails governance;
- a moved/renamed baseline finding is not treated as existing debt;
- an unknown profile or gate ID fails closed;
- an invalid `not applicable` reason or waiver fails;
- a certified artifact hash mismatch blocks release.

## `Not Applicable`, Waivers, and Status

`Not applicable` is valid only when the versioned change profile names the gate and supplies a reason that the policy validator accepts. It is not a manual skip.

A valid waiver is serialized as `risk-accepted`, remains visible in downstream evidence, and prevents `100% conformant`. A human-facing report may display the label "accepted risk" while retaining `risk-accepted` in machine-readable evidence. Expired or broadened waivers fail. Final release and final project certification allow no active waiver.

## Checkpoints by Program Phase

| Phase | Required checkpoint |
| --- | --- |
| P1 | `G-GOV` including match/non-match and contradiction probes |
| P2 | `G-TYPE`, `G-LINT`, `G-UNIT`, `G-ARCH`, `G-TOKENS`, `G-PROVENANCE` |
| P3 | `G-UNIT`, `G-COV`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, and `G-CONSUMER` |
| P4 | frozen complete public API plus AST/fingerprint architecture ratchets under `G-ARCH` and `G-CONSUMER` |
| P5 | `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE` for the UI scope |
| P6 | `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-ARCH`, `G-TOKENS`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER`, and `G-PROVENANCE` for the CRM scope |
| P7 | full `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, hardened workflows, package exposure, and trusted-publishing dry-run evidence |
| P8 | calibrated `G-PERF` artifact, tree-shaking, React, browser, and memory budgets on compatible production-like scenarios |
| P9 | the complete `full` profile defined above, including exact-candidate package, consumer, browser, visual, prerequisite, performance, provenance, and publication certification, with no waiver or unresolved final debt |

No future gate implementation may begin until `GATE-SDD-APPROVED` opens through explicit user approval.
