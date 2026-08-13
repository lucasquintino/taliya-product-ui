# Automated Test and Quality-Evidence Strategy

**Status**: in progress under approved task range; local behavioral, coverage, source-asset, browser, visual, security, performance, and consumer gates are green; clean-clone release certification remains pending
**Primary requirements**: FR-022 through FR-031
**Target outcome**: every public behavior has risk-appropriate executable evidence, not merely a test file or story count

## Current Baseline

A current run on 2026-08-12 produced:

| Scope | Result | Interpretation |
| --- | --- | --- |
| `@taliya/tokens` | 6/6 pass | Small current token behavior suite is green |
| `@taliya/ui` | 68/68 pass; 94% statements / 96% lines / 95% functions / 86.79% branches | Current jsdom component suite and package coverage policy are green |
| `@taliya/crm` | 220/220 pass; 92% statements / 93.66% lines / 92.09% functions / 86.48% branches | Current jsdom component suite and package coverage policy are green |
| `@taliya/docs` smoke | 5/5 pass | Docs source smoke is green; this is not Storybook browser execution |

The CRM suite is portable on the Windows checkout and both package thresholds are green. The maintained Playwright PR suite is green (18/18), the local six-project release E2E evidence is green (54 expected, 0 unexpected, 0 flaky), static Storybook interaction evidence is green (636/636), source-sized visual capture is current (63/63), and source-asset folder/ZIP integrity is green (73/73 route targets and 164/164 recursive/ZIP images). The three-OS clean-clone release workflow remains authoritative for final certification.

## Test Model

“Tests for everything” means every public requirement, behavior, state transition, failure mode, compatibility promise, and critical non-functional constraint has at least one appropriate evidence mechanism. It does not mean testing private implementation lines or maximizing coverage with assertions that cannot detect regressions.

| Layer | Proves | Primary subjects | Required evidence |
| --- | --- | --- | --- |
| Static/type | Contract shape and prohibited constructs | TypeScript graph, exports, lint rules | `G-TYPE`, `G-LINT`, negative fixtures |
| Unit | Pure transformation and decision behavior | tokens, utilities, formatters, reducers, hooks without browser semantics | deterministic Vitest tests |
| Component browser contract | Render, events, state, semantics, focus, keyboard | every public interactive UI/CRM component | real-browser component/story test |
| Integration | Multiple components collaborating through public contracts | page kits, shell/layout, table/filter/drawer/form compositions | browser integration tests with prepared data/callbacks |
| Story interaction | Official documented variants and states actually execute | every interactive isolated story | Storybook test-run evidence in a static build |
| Synthetic-consumer E2E | Published package behavior outside the monorepo | packed JS/types/CSS, representative journeys | Playwright against a clean consumer |
| Accessibility | Automated rule violations and interaction semantics | all changed interactive stories and critical journeys | axe plus explicit keyboard/focus/announcement tests |
| Responsive | Supported viewport behavior and containment | affected public stories and critical page families | Playwright viewport matrix and overflow classification |
| Visual | Approved appearance and 1:1 component contract | touched canonical components/families | static Storybook capture, diff, and human decision |
| Artifact compatibility | Exact package contents and public imports | tarballs, declarations, exports, CSS entry points | pack/install/compile/runtime fixture |

## Test-First Change Protocol

For every behavior change or refactor with behavior risk:

1. map the requirement and acceptance scenario to the affected public contract;
2. add or identify a test that fails for the missing/regressed behavior;
3. confirm the failure is specific and not caused by stale artifacts or environment drift;
4. implement the smallest authorized change;
5. make the direct test pass;
6. run the package and cross-package impact set;
7. run browser, accessibility, responsive, visual, and consumer gates selected by the change profile;
8. retain the regression test and evidence mapping.

A structural-only move begins with characterization tests and public API/declaration snapshots. If the characterization reveals an existing defect, the move stops and the behavior correction is split into its own approved slice.

## Coverage Contract

Coverage is measured for each production package and for changed lines:

| Metric | Minimum |
| --- | ---: |
| Lines per package | 90% |
| Functions per package | 90% |
| Branches per package | 85% |
| Changed lines | 95% |
| Critical public behaviors | 100% explicitly mapped |

Generated, declaration-only, and deliberately unreachable exhaustive-guard code may be excluded only through a versioned path/symbol policy with owner and rationale. A percentage cannot compensate for an untested critical behavior such as focus restoration, a blocked action, public import compatibility, or drawer lifecycle.

Thresholds cannot be lowered by an ordinary change. Historical gaps are fingerprinted and reduced; changed scope may not add uncovered behavior.

## Public Component Contract Matrix

Each public component is classified as static, interactive, overlay, form, collection, navigation, layout, visualization, or composed page kit. Applicable rows are mandatory:

| Behavior | Static | Interactive | Overlay/form | Collection/page kit |
| --- | --- | --- | --- | --- |
| Default render and public props | Required | Required | Required | Required |
| Callback/event outcome | If applicable | Required | Required | Required |
| Disabled/read-only/blocked | If applicable | Required | Required | Required |
| Loading/empty/error | If applicable | If applicable | If applicable | Required |
| Keyboard interaction | If focusable | Required | Required | Required |
| Focus entry/restoration/trap | If focusable | If applicable | Required | If applicable |
| Accessible name/role/state | Required | Required | Required | Required |
| Reduced motion | If animated | If animated | If animated | If animated |
| Narrow/wide containment | If layout-bearing | Required | Required | Required |
| Isolated Storybook story | Required | Required | Required | Required for every public unit plus composed story |
| Canonical visual comparison | If source-mapped | If source-mapped | If source-mapped | Required when source-mapped |

An entry is `not applicable` only when its component classification and reason are recorded. Omission is a failure.

## Critical Synthetic-Consumer Journeys

The clean packed consumer must cover at least:

1. install all three tarballs and compile every supported public root import;
2. import root CSS and render a token-driven primitive without missing styles;
3. interact with button, input, select, checkbox, and validation/error states;
4. open and close modal/drawer/popover behavior with Escape, focus containment, and focus restoration;
5. filter/select/paginate a representative table and invoke prepared callbacks;
6. render shell plus a representative CRM page kit at desktop and mobile widths without unapproved overflow;
7. execute a representative kanban/card and drawer journey without backend calls;
8. verify deprecated aliases still compile and behave while compatibility is promised;
9. verify optional CSS subpaths and the root compatibility stylesheet when P5/P6 introduce them;
10. fail when the packed artifact, declaration, CSS, or source/evidence revision does not match.

PR runs use Chromium for affected journeys. Release certification runs the full set in Chromium, Firefox, and WebKit.

## Storybook Browser Strategy

- Build Storybook statically before certification; a development server is iteration evidence only.
- Execute every story `play` function and every changed interactive story in a real browser.
- Reject render exceptions, empty roots, console errors, unnamed visible interactive controls, and unexpected network calls.
- Scan canonical desktop and supported reduced/mobile viewports.
- Treat source-sized intentional canvases as an explicit responsive classification; unclassified overflow fails.
- Link every changed component to its isolated story and every source-mapped component to its canonical capture.
- Triage every current overflow to an owning source path under `packages/ui/src/**`, `packages/crm/src/**`, or `apps/docs/src/**`. A confirmed defect is fixed in the smallest explicitly approved component/visual slice and re-probed; an unresolved defect remains `blocked` and requires its separately approved slice before P3/T136. Merely refreshing or cataloguing the report cannot make `G-STORY-TEST` or `G-VISUAL` pass.

The current 636-story responsive report is the active evidence and records zero unresolved overflow rows; historical overflow reports remain diagnostic inputs only.

## Accessibility Strategy

Automated axe checks reject serious and critical violations. Automation is supplemented by explicit contracts for:

- tab order and all keyboard-operable controls;
- focus visibility, entry, containment, and restoration;
- accessible names, descriptions, roles, values, expanded/selected/current states;
- error identification and live announcements where state changes asynchronously;
- semantic headings, lists, tables, labels, and status messages;
- contrast evidence for tokens and state combinations;
- pointer-independent behavior and minimum target sizing where applicable;
- reduced-motion behavior for every animation.

No accessibility claim is made solely from zero unnamed DOM controls.

## Determinism and Portability

- Run supported Node/pnpm versions from a frozen lockfile.
- Test Windows, macOS, and Linux for type/lint/unit/build/pack portability.
- Normalize path separators and line endings in test harnesses; prefer parsers, DOM/computed behavior, or normalized fixtures over raw source-string fragments.
- Use stable IDs and deterministic clocks/randomness; freeze time and random seeds where relevant.
- Use repository fixtures with sanitized, versioned data; no live API or machine-local source path participates in a blocking test.
- Check mode cannot alter tracked files.
- Evidence records commit SHA, source-tree hash, config/input hashes, tool versions, OS/browser, start/end time, and exit status.
- Two runs from unchanged inputs must produce the same normalized decision.

## Flake and Retry Policy

A test that passes only after retry is nondeterministic and does not count as a clean pass. CI may capture one diagnostic retry, but the gate result remains failed/flaky. Quarantine requires a valid waiver and blocks `100% conformant` and release certification for affected scope. `.skip`, `.only`, and silent catches are rejected unless explicitly classified by a blocking policy.

## Execution Stages

| Stage | Minimum execution |
| --- | --- |
| PR | type/lint/architecture, affected unit/component/integration, coverage, changed stories in Chromium, axe, affected responsive/visual checks, pack/consumer when public artifacts change |
| Nightly | full packages/docs, full static Storybook runtime scan, full accessibility scan, all critical E2E in three browsers, repeated determinism probe |
| Release | clean-clone OS matrix plus clean packed consumer in three browsers, full visual/component certification, security/performance/artifact/provenance gates on one revision |

Exact applicability is defined in `ci-gate-matrix.md`.

## Exit Criteria

The testing program is complete only when `G-TYPE`, `G-LINT`, `G-UNIT`, `G-COV`, `G-STORY-BUILD`, `G-STORY-TEST`, `G-A11Y`, `G-E2E-PR`, `G-E2E-RELEASE`, `G-VISUAL`, `G-PACK`, and `G-CONSUMER` have executable negative probes and current same-revision evidence, all current tests pass portably, thresholds are met, and every functional requirement has an evidence mapping.
