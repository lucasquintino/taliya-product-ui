# Traceability Matrix: Engineering Quality Hardening

**Feature**: `006-engineering-quality-hardening`
**Specification baseline**: `FR-001` through `FR-048`, `SC-001` through `SC-018`
**Backlog baseline**: `T101` through `T176`
**Status**: Complete for SDD review; execution evidence does not exist yet because implementation is blocked.

## Reading the Matrix

- **Decision / contract** identifies the approved design rationale in `research.md` and the normative contract or strategy that constrains implementation.
- **Tasks** are future implementation tasks in `tasks.md`; they remain blocked by `GATE-SDD-APPROVED`.
- **Acceptance evidence** is the artifact or blocking gate that must prove the requirement on the same revision. A named future artifact is not claimed to exist today.
- A requirement is not complete merely because its task ran; its evidence must pass and satisfy the corresponding success criteria.

## Functional Requirement Coverage

| Requirement | Primary story | Decision / contract | Implementation task(s) | Acceptance evidence |
|---|---|---|---|---|
| FR-001 | US1 | R-001; `contracts/sdd-lifecycle-contract.md` | T107, T109 | `G-GOV`; one active feature/phase/authorization assertion in `artifacts/quality/g-governance.json` |
| FR-002 | US1 | R-002; `contracts/sdd-lifecycle-contract.md` | T107, T109 | SDD artifact inventory and `checklists/sdd-readiness.md`; `G-GOV` rejects a missing mandatory artifact |
| FR-003 | US1 | R-002; `contracts/sdd-lifecycle-contract.md`; `approval.md` | T107, T109 | user approval record plus negative probe proving implementation stays blocked without it |
| FR-004 | US1 | R-004; `source-of-truth-reconciliation.md` | T104, T109 | instruction-scope validator and root-invariant review in `G-GOV` |
| FR-005 | US1 | R-004; `source-of-truth-reconciliation.md` | T104, T109 | scoped-instruction weakening/contradiction probes in `G-GOV` |
| FR-006 | US1 | R-003, R-004; `contracts/quality-policy.schema.json` | T105, T109 | clean-clone skill discovery report and zero unknown mandatory skill reference in `G-GOV` |
| FR-007 | US1 | R-004; `contracts/quality-policy.schema.json` | T106, T109 | command-rule match/non-match fixture report in `G-GOV` |
| FR-008 | US1 | R-004, R-005; `contracts/quality-policy.schema.json` | T101, T102, T103 | schema and semantic validation of every rule in the sole `governance/quality-policy.json`; `G-GOV` |
| FR-009 | US1 | R-005; `contracts/quality-policy.schema.json`; `ci-gate-matrix.md` | T101, T102, T118 | exact ten-profile selection fixtures using only canonical gate IDs from `GATE-SDD-APPROVED` through `G-RELEASE`; `G-GOV` and `G-PROVENANCE` |
| FR-010 | US1 | R-004, R-005, R-014; `contracts/quality-policy.schema.json`; `contracts/waiver.schema.json`; `contracts/architecture-ratchet-contract.md` | T101, T103, T108 | complete P1 waiver/policy validation plus controlled negative-probe matrix and stable failure codes in `G-GOV` |
| FR-011 | US4 | R-010; `architecture-migration.md`; `contracts/architecture-ratchet-contract.md` | T141, T151, T160 | dependency-direction and cycle evidence in `G-ARCH` |
| FR-012 | US4 | R-010, R-011; `contracts/public-api-compatibility-contract.md` | T139, T142, T149, T158 | public import/export/headless-encapsulation checks in `G-ARCH`, `G-PACK`, and `G-CONSUMER` |
| FR-013 | US4 | R-009, R-010, R-014; `contracts/architecture-ratchet-contract.md` | T140, T141, T174 | owner/responsibility, size, complexity, and finding-fingerprint report in `G-ARCH` |
| FR-014 | US4 | R-009; `architecture-migration.md` | T140, T141 | SOLID-observable positive/negative fixtures and architecture report in `G-ARCH` |
| FR-015 | US4 | R-009; `architecture-migration.md`; React Rules references in `research.md` | T140, T147, T148 | React purity/immutability/state/effect checks plus browser contracts in `G-LINT`/`G-UNIT` |
| FR-016 | US4 | R-009; `architecture-migration.md` | T140, T147, T148 | stable-key negative fixtures and reorder behavior tests in `G-LINT`/`G-STORY-TEST` |
| FR-017 | US4 | R-004, R-010; `architecture-migration.md`; `contracts/public-api-compatibility-contract.md` | T147, T154, T155, T156, T157 | ownership/reuse graph, isolated stories, and package-import evidence in `G-ARCH`/`G-STORY-TEST` |
| FR-018 | US4 | R-010, R-012; `architecture-migration.md` | T153, T154, T155, T156, T157 | CRM boundary audit proving prepared-data/callback-only components in `G-ARCH` |
| FR-019 | US4 | R-011; `contracts/public-api-compatibility-contract.md` | T137, T138, T144 | complete reviewed `artifacts/api/public-api-inventory.json` and classification with no unknown export |
| FR-020 | US4 | R-010, R-011; `contracts/public-api-compatibility-contract.md` | T139, T142, T144, T151, T160 | declaration/runtime/style/visual equivalence in `G-CONSUMER`, `G-VISUAL`, and modularization checkpoints |
| FR-021 | US4 | R-009, R-010, R-014; `contracts/architecture-ratchet-contract.md` | T140, T141 | AST/lint/graph negative fixtures for explicit `any`, suppressions, cycles, size, and complexity in `G-LINT`/`G-ARCH` |
| FR-022 | US3 | R-007; `test-strategy.md`; `ci-gate-matrix.md` | T116, T119, T136, T151, T160 | CRM 202/202 semantic test result plus same-revision `G-TYPE`, `G-LINT`, `G-UNIT`, package/docs build, and relevant test records |
| FR-023 | US3 | R-007; `test-strategy.md` | T120, T122, T123, T124 | public behavior matrix with green unit/browser/integration rows in `G-UNIT`/`G-STORY-TEST` |
| FR-024 | US3 | R-007; `test-strategy.md` | T121, T122, T123, T124, T136 | per-package/changed-scope coverage report plus critical-behavior matrix in `G-COV` |
| FR-025 | US3 | R-007; `test-strategy.md` | T125, T126, T127 | isolated-story inventory and executed interaction report in `G-STORY-TEST` |
| FR-026 | US3 | R-007; `test-strategy.md`; `contracts/public-api-compatibility-contract.md` | T130, T131, T142, T175 | clean tarball consumer build/runtime/style and critical journey evidence in `G-PACK`/`G-CONSUMER` |
| FR-027 | US3 | R-007; `test-strategy.md`; `ci-gate-matrix.md` | T129, T131, T136 | declared desktop/mobile and Chromium/Firefox/WebKit matrix records in `G-E2E-PR`/`G-E2E-RELEASE` |
| FR-028 | US3 | R-008; `test-strategy.md` | T128, T129, T136 | axe plus keyboard/focus/name/semantic/reduced-motion evidence with zero serious/critical issue in `G-A11Y` |
| FR-029 | US3 | R-007; `test-strategy.md`; foundation visual-parity contract | T132, T133, T134, T136 | static-build capture metadata, component comparison, and explicit human approval in `G-VISUAL` |
| FR-030 | US3 | R-007; `test-strategy.md` | T127, T135, T136 | current story-inventory runtime report and per-overflow owner/fix-or-block ledger in `G-STORY-TEST` and `G-VISUAL` |
| FR-031 | US2 | R-006; `contracts/gate-run.schema.json`; `contracts/evidence-provenance.schema.json` | T113, T114, T115, T116, T119 | repeat-run, CRLF/LF, path, OS, locale, timezone, and read-only check evidence in `G-PROVENANCE` |
| FR-032 | US5 | R-012; `security-strategy.md` | T161, T162, T167, T176 | separate `G-SEC-RUNTIME` and `G-SEC-TOOLCHAIN` reports; publication blocked on critical/high findings |
| FR-033 | US5 | R-012; `security-strategy.md`; `ci-gate-matrix.md` | T163, T167, T176 | dependency-review, SAST, and secret-detection results in `G-SEC-SAST`/`G-SEC-SECRETS` |
| FR-034 | US5 | R-012; `security-strategy.md`; `contracts/release-certification.schema.json` | T164, T167, T175, T176 | immutable-action, permission, environment, identity, hash, and provenance checks in `G-PROVENANCE`/`G-RELEASE` |
| FR-035 | US5 | R-012; `security-strategy.md` | T165, T167, T176 | unsafe sink/protocol inventory and controlled negative fixtures in `G-SEC-SAST` |
| FR-036 | US5 | R-013; `performance-strategy.md` | T168, T169, T170, T171, T172 | versioned package/CSS/tarball/tree-shaking/render/update metrics and budgets in `G-PERF`/`G-PACK` |
| FR-037 | US5 | R-013; `performance-strategy.md` | T168, T169, T171, T172 | comparable production-mode benchmark report with dataset/environment/variance; no unmeasured memoization mandate |
| FR-038 | US2 | R-006; `contracts/gate-run.schema.json`; `contracts/evidence-provenance.schema.json` | T110, T114, T115, T119 | revision/input/tool/decision/dependency fingerprints in every gate/evidence record; `G-PROVENANCE` |
| FR-039 | US2 | R-005, R-006; `contracts/evidence-provenance.schema.json` | T113, T119 | clean `git status` after check mode and explicit reviewed update manifest in `G-PROVENANCE` |
| FR-040 | US5 | R-006, R-012; `contracts/release-certification.schema.json` | T130, T142, T175 | exact tarball hashes installed/tested and handed unchanged to release certification in `G-PACK`/`G-RELEASE` |
| FR-041 | US5 | R-005, R-006, R-012, R-014; `contracts/release-certification.schema.json`; `ci-gate-matrix.md` | T167, T172, T175, T176 | supported OS/browser matrix, version sync, evidence freshness, waiver, and blocking-gate decision in `G-RELEASE` |
| FR-042 | US5 | R-012; `security-strategy.md` | T166, T167, T176 | reviewed library/consumer security responsibility boundary in package/docs release evidence |
| FR-043 | US6 | R-014; `contracts/waiver.schema.json` | T101, T103, T173, T176 | P1 waiver schema/semantic negative probes plus P9 exact-revision expiry audit in `G-GOV` and `G-RELEASE` |
| FR-044 | US6 | R-014; `contracts/waiver.schema.json`; `security-strategy.md` | T101, T103, T173, T176 | prohibited critical-risk waiver fixtures fail in P1 and are re-audited before `G-RELEASE` |
| FR-045 | US6 | R-014; `contracts/architecture-ratchet-contract.md` | T141, T174 | finding-level fingerprint diff rejects moved/renamed/new debt even at equal aggregate count |
| FR-046 | US6 | R-014; `contracts/architecture-ratchet-contract.md` | T141, T174, T176 | removed-finding tombstone/no-reintroduction probe in `G-ARCH`/`G-RELEASE` |
| FR-047 | US6 | R-006, R-014; `contracts/release-certification.schema.json` | T103, T173, T175, T176 | canonical `risk-accepted` validation, one-revision all-applicable-gates pass, zero in-scope waiver, and certified status in `G-RELEASE` |
| FR-048 | US6 | R-006, R-014; `contracts/release-certification.schema.json`; `contracts/architecture-ratchet-contract.md` | T174, T175, T176 | final certification: zero handwritten baseline debt, zero active/expired waiver, zero stale/contradictory readiness evidence |

## Success-Criteria Coverage

| Success criterion | Requirement source | Primary closing task(s) | Evidence |
|---|---|---|---|
| SC-001 | FR-001, FR-004-FR-010 | T107-T109 | `G-GOV` clean-clone decision |
| SC-002 | FR-010, FR-022, FR-032-FR-035 | T108, T111-T112, T161, T163-T165 | direct and aggregate negative-probe matrix |
| SC-003 | FR-031, FR-038, FR-039 | T113-T116, T119 | normalized repeat-run and clean-tree evidence |
| SC-004 | FR-022, FR-031, FR-041 | T116-T119, T175 | supported OS/Node matrix |
| SC-005 | FR-022-FR-025 | T120-T136 | package/docs test and unauthorized-skip report |
| SC-006 | FR-023, FR-024 | T120-T124, T136 | `G-COV` plus behavior matrix |
| SC-007 | FR-025, FR-027, FR-028 | T125-T131, T136 | story/browser/a11y evidence |
| SC-008 | FR-030 | T127, T135, T136 | current full-story runtime report |
| SC-009 | FR-028 | T128, T136 | `G-A11Y` report |
| SC-010 | FR-026, FR-027 | T130-T131, T142, T175 | packed-consumer browser matrix |
| SC-011 | FR-032-FR-034 | T161-T167, T176 | runtime/toolchain/security release gates |
| SC-012 | FR-036, FR-037 | T168-T172 | `G-PERF`/`G-PACK` budgets |
| SC-013 | FR-019, FR-020 | T137-T160 | API inventory and modularization compatibility checkpoints |
| SC-014 | FR-013, FR-021, FR-045-FR-046 | T140-T141, T174, T176 | final architecture budget/fingerprint report |
| SC-015 | FR-038, FR-040, FR-041 | T110-T119, T130, T142, T175 | evidence/artifact/release hashes for one revision |
| SC-016 | FR-043-FR-048 | T173-T176 | final waiver/baseline/release certification |
| SC-017 | FR-001-FR-048 | T101-T176 | this matrix plus requirements checklist coverage audit |
| SC-018 | FR-003 | SDD gate; T101 is first permitted task | `approval.md` and implementation-readiness checklist |

## Backlog-to-Requirement Reverse Coverage

Every backlog task has one explicit reverse row. Ranges are intentionally not used because they can hide an orphan task or evidence gap.

| Task | Requirement(s) / mandatory rationale | Planned same-revision evidence |
|---|---|---|
| T101 | FR-008, FR-009, FR-010, FR-043, FR-044 | policy/waiver positive and negative fixtures; `G-GOV` |
| T102 | FR-008, FR-009, FR-010 | schema-valid sole `governance/quality-policy.json`; `G-GOV` |
| T103 | FR-008, FR-010, FR-043, FR-044, FR-047 | governance graph and complete waiver semantic report; `G-GOV` |
| T104 | FR-004, FR-005 | root/scoped instruction precedence report; `G-GOV` |
| T105 | FR-006 | clean-clone skill manifest and discovery probe; `G-GOV` |
| T106 | FR-007 | command-rule match/non-match fixture report; `G-GOV` |
| T107 | FR-001, FR-002, FR-003 | one active feature/phase/authorization assertion; `G-GOV` |
| T108 | FR-010 | controlled governance probe matrix with stable failure codes; `G-GOV` |
| T109 | FR-001, FR-002, FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, FR-043, FR-044 | `artifacts/quality/g-governance.json`; `G-GOV` |
| T110 | FR-038 | gate/evidence schema fixture results; `G-PROVENANCE` |
| T111 | FR-010, FR-031, FR-038 | child-failure propagation fixture matrix; `G-PROVENANCE` |
| T112 | FR-010, FR-038 | aggregate runner exit/signal/timeout evidence; `G-PROVENANCE` |
| T113 | FR-031, FR-039 | read-only check and declared-update mutation report; `G-PROVENANCE` |
| T114 | FR-031, FR-038 | normalized gate/evidence hashes from repeated runs; `G-PROVENANCE` |
| T115 | FR-031, FR-038 | stale/foreign/dirty/input-mismatch negative fixtures; `G-PROVENANCE` |
| T116 | FR-022, FR-023, FR-031 | CRM 202/202 semantic test result plus OS/newline portability report; `G-UNIT`, `G-PROVENANCE` |
| T117 | FR-022, FR-031 | clean-versus-stale-output source-graph result; `G-TYPE`, `G-PROVENANCE` |
| T118 | FR-009, FR-038, FR-041 | exact profile-to-gate selection and unknown-profile rejection; `G-GOV`, `G-PROVENANCE` |
| T119 | FR-022, FR-031, FR-038, FR-039 | P2 checkpoint records for `G-TYPE`, `G-LINT`, `G-UNIT`, `G-ARCH`, `G-TOKENS`, `G-PROVENANCE` |
| T120 | FR-023, FR-024 | owned public behavior/state matrix; `G-UNIT`, `G-COV` |
| T121 | FR-024 | coverage-policy positive/negative fixture report; `G-COV` |
| T122 | FR-023, FR-024 | pure-logic unit/property results and coverage; `G-UNIT`, `G-COV` |
| T123 | FR-023, FR-024, FR-028 | real-browser UI contract results; `G-UNIT`, `G-STORY-TEST`, `G-A11Y` |
| T124 | FR-023, FR-024, FR-028 | CRM browser-integration contract results; `G-UNIT`, `G-STORY-TEST`, `G-A11Y` |
| T125 | FR-025 | isolated-story inventory with zero missing public unit; `G-STORY-TEST` |
| T126 | FR-025 | executed Storybook interaction inventory; `G-STORY-TEST` |
| T127 | FR-025, FR-030 | static build/runtime/console/interaction report; `G-STORY-BUILD`, `G-STORY-TEST` |
| T128 | FR-028 | axe, keyboard, focus, name, and semantic report; `G-A11Y` |
| T129 | FR-027, FR-028, FR-030 | reduced-motion and viewport matrix; `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL` |
| T130 | FR-026, FR-040 | exact-tarball clean consumer install/compile/runtime record; `G-PACK`, `G-CONSUMER` |
| T131 | FR-026, FR-027 | Chromium/Firefox/WebKit packed-consumer journeys; `G-E2E-PR`, `G-E2E-RELEASE`, `G-CONSUMER` |
| T132 | FR-029 | canonical source-to-story capture manifest; `G-VISUAL` |
| T133 | FR-029, FR-031 | deterministic static-capture metadata and repeatability; `G-STORY-BUILD`, `G-VISUAL` |
| T134 | FR-029 | component visual diffs and human approval records; `G-VISUAL` |
| T135 | FR-030 | `artifacts/quality/responsive-overflow-triage.json` plus owner-specific fix/block evidence; `G-STORY-TEST`, `G-VISUAL` |
| T136 | FR-022, FR-023, FR-024, FR-025, FR-026, FR-027, FR-028, FR-029, FR-030 | P3 behavior matrix and `G-UNIT`, `G-COV`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-CONSUMER` |
| T137 | FR-019 | complete runtime/type/style public inventory; `G-ARCH`, `G-PACK` |
| T138 | FR-019 | reviewed owner/compatibility classification for every export; `G-ARCH` |
| T139 | FR-012, FR-020 | declaration/export/CSS/runtime contract snapshots; `G-ARCH`, `G-PACK`, `G-CONSUMER` |
| T140 | FR-013, FR-014, FR-015, FR-016, FR-021 | AST/code/React/SOLID positive and negative fixtures; `G-LINT`, `G-ARCH` |
| T141 | FR-011, FR-013, FR-021, FR-045, FR-046 | package/cycle/size/complexity/fingerprint ratchets; `G-ARCH` |
| T142 | FR-012, FR-020, FR-026, FR-040 | all classified imports/types/styles in the packed consumer; `G-PACK`, `G-CONSUMER` |
| T143 | FR-011, FR-012, FR-013, FR-019, FR-020, FR-021, FR-045, FR-046 | public-API and architecture controlled negative probes; `G-LINT`, `G-ARCH` |
| T144 | FR-011, FR-012, FR-013, FR-019, FR-020, FR-021, FR-045, FR-046 | P4 freeze records for `G-ARCH`, `G-LINT`, `G-PACK`, `G-CONSUMER` |
| T145 | FR-020, FR-022, FR-023, FR-028, FR-029 | UI pre-move characterization, accessibility, and captures; `G-UNIT`, `G-A11Y`, `G-VISUAL`, `G-CONSUMER` |
| T146 | FR-011, FR-013, FR-020, FR-021 | serialized UI type/constant/internal extraction equivalence; `G-TYPE`, `G-ARCH`, `G-CONSUMER` |
| T147 | FR-011, FR-015, FR-016, FR-017, FR-020, FR-021 | serialized primitive extraction tests/stories/captures; `G-LINT`, `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T148 | FR-013, FR-015, FR-016, FR-017, FR-020, FR-021 | serialized component/hook extraction tests/stories/captures; `G-LINT`, `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T149 | FR-012, FR-019, FR-020 | unchanged UI compatibility facade/public snapshots; `G-ARCH`, `G-PACK`, `G-CONSUMER` |
| T150 | FR-017, FR-020, FR-036 | UI CSS ownership/cascade/capture/size equivalence; `G-TOKENS`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER` |
| T151 | FR-011, FR-012, FR-013, FR-015, FR-016, FR-017, FR-019, FR-020, FR-021, FR-022, FR-023, FR-024, FR-025, FR-028, FR-029, FR-031, FR-036 | P5 UI checkpoint for every gate named in T151 |
| T152 | FR-018, FR-020, FR-022, FR-023, FR-028, FR-029 | CRM pre-move characterization, accessibility, and captures; `G-UNIT`, `G-A11Y`, `G-VISUAL`, `G-CONSUMER` |
| T153 | FR-011, FR-013, FR-018, FR-020, FR-021 | serialized CRM type/view-model/internal extraction equivalence; `G-TYPE`, `G-ARCH`, `G-CONSUMER` |
| T154 | FR-017, FR-018, FR-020 | serialized Alunos/Turmas/Agenda/Revisao domain evidence; `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T155 | FR-017, FR-018, FR-020 | serialized Studio/Equipe/Canais/Planos domain evidence; `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T156 | FR-017, FR-018, FR-020 | serialized finance/billing/usage/backoffice separation evidence; `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T157 | FR-015, FR-016, FR-017, FR-018, FR-020 | serialized pattern/page-kit/drawer/AgentPanel contract evidence; `G-LINT`, `G-ARCH`, `G-STORY-TEST`, `G-A11Y`, `G-VISUAL` |
| T158 | FR-012, FR-019, FR-020 | unchanged CRM compatibility facade/public snapshots; `G-ARCH`, `G-PACK`, `G-CONSUMER` |
| T159 | FR-017, FR-020, FR-036 | CRM CSS ownership/cascade/capture/size equivalence; `G-TOKENS`, `G-VISUAL`, `G-PERF`, `G-PACK`, `G-CONSUMER` |
| T160 | FR-011, FR-012, FR-013, FR-015, FR-016, FR-017, FR-018, FR-019, FR-020, FR-021, FR-022, FR-023, FR-024, FR-025, FR-028, FR-029, FR-031, FR-036 | P6 CRM checkpoint for every gate named in T160 |
| T161 | FR-032, FR-033 | separate runtime/toolchain dependency decisions; `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN` |
| T162 | FR-032 | clean remediated dependency graphs and full regression suite; `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN` |
| T163 | FR-033, FR-034 | dependency review, static analysis, and secret fixtures; `G-SEC-SAST`, `G-SEC-SECRETS` |
| T164 | FR-034, FR-040, FR-041 | immutable/least-privilege/OIDC/hash/provenance policy record; `G-PROVENANCE`, `G-RELEASE` |
| T165 | FR-035 | HTML/evaluation/URL sink inventory and negative fixtures; `G-SEC-SAST` |
| T166 | FR-042 | validated library-versus-consumer responsibility matrix; `G-GOV`, `G-SEC-SAST` |
| T167 | FR-032, FR-033, FR-034, FR-035, FR-041, FR-042 | P7 records for `G-SEC-RUNTIME`, `G-SEC-TOOLCHAIN`, `G-SEC-SAST`, `G-SEC-SECRETS`, `G-PROVENANCE` |
| T168 | FR-036, FR-037 | production artifact/React/browser/memory raw benchmark samples; `G-PERF`, `G-PACK` |
| T169 | FR-036, FR-037 | reviewed compatible baselines and numeric budgets; `G-PERF` |
| T170 | FR-036, FR-040 | exact-tarball size/tree-shaking/duplication budget evidence; `G-PERF`, `G-PACK` |
| T171 | FR-036, FR-037 | concrete source-path optimization ledger and comparable before/after samples; `G-PERF`, `G-UNIT`, `G-A11Y`, `G-VISUAL`, `G-PACK`, `G-CONSUMER` |
| T172 | FR-036, FR-037, FR-041 | P8 stable/noisy metric decisions; `G-PERF`, `G-PACK` |
| T173 | FR-043, FR-044, FR-047, FR-048 | P9 exact-revision waiver expiry/inventory report; `G-GOV`, `G-RELEASE` |
| T174 | FR-045, FR-046, FR-048 | final no-growth/no-reintroduction fingerprint audit; `G-ARCH`, `G-PROVENANCE`, `G-RELEASE` |
| T175 | FR-034, FR-040, FR-041, FR-047, FR-048 | one-revision release workflow, exact tarballs, SBOM, hashes, provenance; `G-PACK`, `G-CONSUMER`, `G-PROVENANCE`, `G-RELEASE` |
| T176 | FR-032, FR-033, FR-034, FR-035, FR-036, FR-037, FR-038, FR-039, FR-040, FR-041, FR-042, FR-043, FR-044, FR-045, FR-046, FR-047, FR-048 | final `artifacts/release/release-certification.json`; every `full` profile gate, ending in `G-RELEASE` |

## Traceability Decision

All `FR-001` through `FR-048` have at least one user story, design decision/contract, future implementation task, and acceptance-evidence mechanism. This is design completeness only; every implementation and runtime evidence cell remains prospective until `GATE-SDD-APPROVED` is explicitly opened.
