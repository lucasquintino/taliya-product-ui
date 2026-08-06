# Retention Worklist source diagnostic - 2026-08-05

## Scope and authority

Routes:

- `/app/retencao` - `crm-image-coverage-retencao--image-41-retencao-riscos`
- `/app/cancelamentos` - `crm-image-coverage-retencao--image-42-cancelamentos-fila`
- `/app/retencao/reativacoes` - `crm-image-coverage-retencao--image-43-reativacoes-ex-alunos`
- `/app/reclamacoes` - `crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel`

Acceptance authority is `surface-contracts.json`. This document records the source audit, confirmed browser findings, implementation resolution and final static-artifact evidence for the batch.

## Shared architecture

All four routes compose the official Worklist family:

`CrmWorklistPage -> PageFilterBar + PageQuickFilters + CrmWorklistTable + CaseDrawer`

Shell, filter, quick-filter, table and drawer-frame ownership already stays in `@taliya/crm`; controls come from `@taliya/ui`. The story-local drawer builders currently prepare domain facts, sections and actions for the generic official `CaseDrawer`. That preparation is not automatically architecture debt, but any lifecycle state machine, action policy or reusable domain anatomy discovered by the probe must be promoted to an official component or typed official contract. No story-local CSS or duplicate drawer frame is acceptable.

## Confirmed source and browser findings

### Retencao

Contract: risks, frequency, inactivity and signals; task, message, case and follow-up; low, medium and high risk.

- Risk level, reasons, frequency signals, task, message and follow-up actions are represented.
- Probe `RTN-001`: there is no explicit create/open-case action even though case handling is an essential action.
- Probe `RTN-002`: low, medium and high exist only as prepared labels. `CaseDrawer` remains in generic `open` state, so actions do not produce an observable accompanied/terminal outcome.

### Cancelamentos

Contract: requests, reasons, save attempt and pause; register, save and convert to pause; open, saving and cancelled.

- Request, reason, impact, pause and cancellation controls are present.
- Probe `RTN-003`: no explicit save action or saved outcome exists. `onAction` only announces a raw action id and never changes the visible drawer state.
- Probe `RTN-004`: open, saving, paused/recovered and cancelled rows are not mapped into an official drawer lifecycle. Pause and cancel remain simultaneously available regardless of the selected state.

### Reativacoes

Contract: former students, eligibility and opportunity; start return and reserve validated vacancy; eligible, do-not-contact and reactivated.

- Opportunity, restrictions, message, reserve and do-not-contact controls are present.
- Probe `RTN-005`: there is no explicit start-return action or terminal reactivated state.
- Probe `RTN-006`: reserve and message actions are configured for every row, including rows with no opportunity or `Nao contatar`; vacancy validation and action guards are not observable.

### Reclamacoes

Contract: severity, owner, deadline and response; classify, pause automation, escalate and resolve; severe, waiting and resolved.

- Severity, owner, deadline, response, escalation and resolution controls are represented.
- Probe `RTN-007`: classify and pause-automation are missing from the action contract. The content says automation is paused for every selected complaint without an action or state that proves when the pause occurred.
- Probe `RTN-008`: resolve only announces the raw action id; no resolved terminal drawer or disabled terminal action policy is observable.

### Shared regression gaps

- Probe `RTN-009`: none of the four route stories has a Storybook `play`, so search/filter behavior, quick filters, sorting, row selection, close/reopen and domain outcomes are not preserved as route-level regression evidence.
- Probe `RTN-010`: route action announcements expose implementation ids instead of Portuguese product outcomes.
- Probe `RTN-011`: displayed titles omit canonical Portuguese accents (`Retencao`, `Reativacoes`, `Reclamacoes`).
- Probe `RTN-012`: the risk table relies on the generic minimum width while the other three set explicit `840-900px` minimums. Browser measurement must determine whether risk columns remain readable beside the fixed drawer.

## Smallest probe hypotheses

1. Extend the official `CaseDrawerAction` and state contracts only for reusable domain capabilities that are currently missing: case handling, save/convert-to-pause, start return, validated reserve, classify and pause automation.
2. Drive prepared row state into the drawer and make terminal/forbidden actions disabled or absent through official props rather than story-local CSS.
3. Keep route stories responsible for prepared data and observable callback outcomes; promote repeated retention-specific drawer anatomy only if the render audit proves it is shared product structure.
4. Translate announcements and page titles into product language.
5. Add four route plays covering the required actions and states, plus search/filter, quick filters, sorting and close/reopen.
6. Reuse the certified Worklist responsive probe at `390x844`, `1024x768` and `1280x720`, including table scroll geometry and the fixed full-height drawer invariant.

## Acceptance gate

No route in this batch is approved until the source probes are confirmed or rejected against the current static artifact, direct component tests and four route plays pass, the final Storybook artifact has empty browser logs, twelve responsive checks pass, final captures are visually inspected and the joint route ledger is updated. Product-owner approval remains separate.

## Final resolution

All probes `RTN-001` through `RTN-012` were confirmed against the previous static artifact and resolved through official CRM contracts:

- `CaseDrawerState` now represents risk, cancellation, reactivation and complaint lifecycles, including terminal and forbidden states.
- `CaseDrawerAction` now exposes case creation, saving, automation pause, return start and complaint classification in addition to the existing shared actions.
- The four route stories drive contextual state from selected rows, apply callback-aware action guards, announce Portuguese product outcomes and include route-level `play` coverage for essential actions, quick filters and close/reopen.
- Retention titles use canonical Portuguese accents. Worklist tables preserve explicit internal minimum widths and horizontal scrolling without document overflow.
- No story-local shell, table, drawer frame or CSS anatomy was introduced; all four pages continue to compose the official Worklist family and the single fixed `CaseDrawer` contract.

## Final evidence

- CRM direct tests: `195/195` pass, including the retention lifecycle/action-guard contract.
- CRM lint/build and docs lint/typecheck pass.
- Static Storybook rebuilt successfully; all four route plays reached their expected observable states.
- Browser console: zero errors and zero warnings.
- Responsive matrix: `12/12` checks pass at `390x844`, `1024x768` and `1280x720` with one visible `h1`, one product shell, zero document overflow and zero visible Storybook errors.
- Every open drawer is `position: fixed`, `top: 0` and exactly viewport height; mobile width is `390px`, tablet/desktop width is `420px`.
- Final captures and metrics: `visual-diagnostics/evidence/retention-worklist-final-current-20260805`.

Codex certification can now be recorded for all four routes. Product-owner approval remains pending and independent.
