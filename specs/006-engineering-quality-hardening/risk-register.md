# Risk Register

**Status**: active SDD risk register
**Implementation authorization**: blocked by `GATE-SDD-APPROVED`
**Scoring**: likelihood (L) 1-5 x impact (I) 1-5; 15-25 critical program risk, 8-14 high, 4-7 moderate, 1-3 low

## Register

| ID | Risk and current evidence | L | I | Score | Planned prevention/detection | Owner / gate / phase | Residual trigger and response |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| RISK-001 | Historical specs and reports assert incompatible phases/completion scopes | 4 | 5 | 20 | One active feature, precedence, stable status vocabulary, contradiction validator | Governance owner / `G-GOV` / P1 | Any second active phase stops work and returns SDD/governance to review |
| RISK-002 | Aggregate audit appears green while a child failed because exit status is discarded | 4 | 5 | 20 | Argument-array runner, preserved exit/failure codes, aggregate negative probe | Quality maintainer / `G-GOV`, `G-PROVENANCE` / P2 | Any child/summary mismatch fails closed and invalidates dependent reports |
| RISK-003 | Stale or cross-revision report/artifact supports readiness | 5 | 5 | 25 | Commit/tree/config/input/artifact hashes, freshness DAG, dirty-tree rejection | Quality maintainer / `G-PROVENANCE` / P2 | Any mismatch rejects evidence; rebuild from clean exact revision |
| RISK-004 | Codex/Spec Kit manifest claims repository skills that are absent | 4 | 3 | 12 | Reconcile `.agents` by reviewed diff; clean-clone discoverability probe; no force overwrite | Governance owner / `G-GOV` / P1 | Missing or hash-mismatched skill blocks agent-governed work |
| RISK-005 | Direct TypeScript checks consume stale ignored `dist` and misclassify source health | 4 | 4 | 16 | Isolated build graph, derived-output cleanup/fingerprint, stale-artifact negative probe | Build owner / `G-TYPE` / P2 | If diagnostics reference unverified derived output, result is invalid, not source drift |
| RISK-006 | LF-only source-string tests fail on CRLF or pass without proving rendered behavior | 5 | 3 | 15 | Normalize/parse CSS, assert DOM/computed behavior, OS matrix | CRM owner / `G-UNIT` / P2-P3 | Any newline-dependent result blocks portability; preserve semantic regression assertion |
| RISK-007 | UI/CRM monoliths create hidden coupling and unsafe review surface | 5 | 4 | 20 | API freeze, fingerprint ratchets, small reversible family/domain slices | Package owners / `G-ARCH` / P4-P6 | New/increased finding stops slice; no count-only baseline update |
| RISK-008 | Internal modularization breaks accidental but consumed exports | 4 | 5 | 20 | Complete runtime/type inventory, compatibility facade, packed-consumer fixtures, major-version removal policy | Package owners / `G-ARCH`, `G-CONSUMER` / P4-P6 and P9 | Any import/declaration/runtime mismatch rolls back the structural slice |
| RISK-009 | CSS split changes cascade/order or visual output | 4 | 5 | 20 | Selector ownership, root compatibility aggregation, static captures, consumer CSS-order tests | UI/CRM owners / `G-TOKENS`, `G-VISUAL`, `G-CONSUMER` / P5-P6 | Unexpected diff/cascade change rejects slice; behavior change requires separate spec |
| RISK-010 | Unit/story counts hide missing critical browser journeys | 5 | 5 | 25 | Component contract matrix, Storybook browser execution, packed-consumer Playwright suite | QA owner / `G-STORY-TEST`, `G-E2E-PR`, `G-E2E-RELEASE` / P3 | Missing applicable behavior row blocks affected component/release |
| RISK-011 | Automated name smoke is mistaken for accessibility conformance | 4 | 5 | 20 | axe plus keyboard/focus/announcement/contrast/reduced-motion evidence | Accessibility owner / `G-A11Y` / P3 | Serious/critical violation or missing critical manual row blocks approval |
| RISK-012 | Canonical source image or human 1:1 approval is unavailable | 3 | 4 | 12 | Source manifest/hash, explicit pending status, no substitute filename inference | Product owner / `G-VISUAL` / P3 | Component remains blocked/not certified; do not invent parity |
| RISK-013 | Vulnerable build/publish dependency compromises clean runtime package | 4 | 5 | 20 | Separate runtime/toolchain audits, dependency review, frozen lockfile, release block | Security owner / `G-SEC-TOOLCHAIN` / P7 | Any high/critical release-path finding blocks publication |
| RISK-014 | Mutable actions or long-lived npm token permit unauthorized publication | 3 | 5 | 15 | SHA-pinned actions, least privilege, protected environment, OIDC trusted publishing | Release owner / `G-SEC-SAST`, `G-RELEASE` / P7 | Identity/provenance deviation stops release and triggers credential response |
| RISK-015 | UI library is falsely certified for auth, tenant, backend, or infrastructure security | 3 | 5 | 15 | Library/consumer responsibility matrix and scoped certification language | Security/product owner / `G-GOV` / P1-P9 | Any system-control claim without consumer evidence is rejected |
| RISK-016 | File size prompts speculative optimization or masks real runtime regression | 4 | 4 | 16 | Controlled production fixtures, median/p95, absolute and ratchet budgets | Performance owner / `G-PERF` / P8-P9 | Incomparable/noisy evidence is informational; no performance claim accepted |
| RISK-017 | Baseline updates launder new/moved debt | 4 | 5 | 20 | Rule/path/symbol/value fingerprint, rename detection, explicit update review | Governance owner / `G-ARCH`, `G-PROVENANCE` / all phases | New/moved/expanded fingerprint fails; removed debt cannot return |
| RISK-018 | Retry hides flaky/nondeterministic behavior | 3 | 4 | 12 | Diagnostic retry remains failed/flaky; no silent quarantine; repeated-run probe | QA owner / all test gates / P2-P9 | Retry-only pass blocks conformance and requires owned stabilization |
| RISK-019 | Remote OS/browser matrix or protected repository settings cannot be verified locally | 3 | 4 | 12 | External-state checklist, first remote matrix run, repository-setting evidence | Release owner / matrix, `G-RELEASE` / P2-P9 | Missing external evidence keeps state blocked; local simulation is not substituted |
| RISK-020 | Release tests one tarball but rebuilds/publishes another | 3 | 5 | 15 | Build once, hash, test exact tarballs, publish by certified path, post-publish hash check | Release owner / `G-PACK`, `G-PROVENANCE`, `G-RELEASE` / P9 | Any hash mismatch rejects candidate and prevents publication |
| RISK-021 | Large hardening program drifts, mixes phases, or claims partial completion globally | 4 | 4 | 16 | P1-P9 checkpoints, narrow tasks, stable status vocabulary, phase stop conditions | Program owner / phase checkpoints / all | Out-of-phase or mixed-scope diff stops and is re-scoped |
| RISK-022 | Structural refactor silently includes product/visual behavior changes | 4 | 5 | 20 | Structural-only characterization, separate behavior spec, capture/API equivalence | Package/product owners / `G-ARCH`, `G-UNIT`, `G-A11Y`, `G-VISUAL`, `G-CONSUMER` / P5-P6 | Unexpected behavior/visual delta rolls back structural slice |
| RISK-023 | Performance or visual baseline is accepted from dirty/incompatible environment | 3 | 4 | 12 | Pinned runner/scenario/tool, source/input fingerprints, multiple samples | Performance/product owners / `G-VISUAL` in P3 and `G-PERF` in P8 | Incompatible comparison is invalid; regenerate under the controlled environment configuration |
| RISK-024 | Generated/catalog file exemption becomes a loophole for handwritten debt | 3 | 3 | 9 | Versioned generator marker, reproducibility check, source-class policy | Architecture owner / `G-ARCH` / P4-P6 | Unproven generation is classified handwritten and subject to normal budgets |

## Treatment Rules

- Scores 15-25 require an implemented blocking control and negative probe before the phase can exit.
- Scores 8-14 require an owner, detection, and tested rollback/stop response.
- No risk may be closed solely because a document describes mitigation; evidence must show the control operates.
- A valid waiver records the residual risk but changes the machine-readable status to `risk-accepted`, not conformant; human display may read "accepted risk" without changing stored evidence.
- Secret exposure, data exfiltration, unauthorized publication, artifact substitution, and equivalent irreversible critical risk are not accepted through a normal waiver.
- New risks discovered during implementation are added before affected work continues; IDs are never reused.

## Phase Risk Checkpoints

| Phase | Risks that must have operating controls before exit |
| --- | --- |
| P1 | RISK-001, RISK-004, RISK-015, RISK-021 |
| P2 | RISK-002, RISK-003, RISK-005, RISK-006, RISK-017, RISK-018, RISK-019 |
| P3 | RISK-006, RISK-010, RISK-011, RISK-012, RISK-018 and the visual half of RISK-023 |
| P4 | RISK-007, RISK-008, RISK-017, RISK-024 |
| P5-P6 | RISK-007, RISK-008, RISK-009, RISK-022, RISK-024 |
| P7 | RISK-013, RISK-014, RISK-015 |
| P8 | RISK-016 and the performance half of RISK-023 |
| P9 | RISK-008, RISK-019, RISK-020, RISK-021 and every still-open critical program risk; all prerequisite P7 controls must remain current |

## Final Risk Acceptance

Final project certification requires no active waiver, no unowned risk, no unresolved score-15-or-higher risk without an operating control, no high/critical release-path vulnerability, and no stale or contradictory evidence. Residual limitations owned by the consuming SaaS are documented as external obligations rather than silently accepted by this library.
