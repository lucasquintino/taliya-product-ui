# Sales Worklist regional diagnostic - 2026-08-05

## Scope and authority

Routes:

- `/app/interessados` - `crm-image-coverage-vendas--image-38-lista-interessados`
- `/app/aulas-experimentais` - `crm-image-coverage-vendas--image-39-experimental-lista`
- `/app/matriculas` - `crm-image-coverage-vendas--image-40-matriculas-checklist-conversao`

Acceptance authority is `surface-contracts.json`. Per current product-owner direction, this certification evaluates the real route contracts rather than the former external-image count. Current static Storybook renders were opened, captured and inspected before edits.

## Shared anatomy

All three routes compose the official Worklist family:

`CrmWorklistPage -> PageFilterBar + PageQuickFilters + CrmWorklistTable + LeadDrawer`

The routes do not own shell, filter, quick-filter, table or drawer anatomy. The canonical `LeadDrawer` is fixed, starts at viewport top and occupies the full viewport height. Story-owned data, columns, actions, callbacks and prepared state remain acceptable consumer inputs.

## Baseline measurements

At the current desktop viewport, all three routes render one `h1`, one product shell, no visible Storybook error and one fixed full-height `LeadDrawer`. Each official table preserves its `760px` minimum width inside a drawer-constrained region of approximately `558px`, with horizontal scrolling contained by the table wrapper.

Baseline screenshots and metrics are stored under `visual-diagnostics/evidence/worklist-sales-baseline-20260805`.

## Regional findings

### Interessados

- Contract: list, summarized profile, origin and status; open conversation, qualify and schedule trial; new, no vacancy, lost and ready.
- The route exposes the required structural blocks and representative rows.
- Gap `SAL-001`: new, no-vacancy and ready rows collapse into generic `interested` or `enrollment` drawer states instead of preserving the canonical lifecycle.
- Gap `SAL-002`: there is no explicit qualify action. The generic move-stage action does not prove the product contract, and announcements expose implementation action ids instead of product language.

### Aulas experimentais

- Contract: classes, interested person, status and post-class; confirm, reschedule, mark attended/missed and enroll; scheduled, missed and convert.
- The route exposes all required action labels and representative rows.
- Gap `SAL-003`: trial actions only announce raw implementation ids. They do not transition the visible drawer state, so attended/missed/convert outcomes are not observable.
- Gap `SAL-004`: scheduled, missed and convert are represented through generic `trial`, `lost` and `enrollment` states instead of an explicit trial lifecycle.

### Matriculas

- Contract: checklist, data, plan, first class and initial payment; validate, charge, convert and create task; missing, awaiting payment and ready.
- Gap `SAL-005`: initial payment is absent from facts and checklist. The route has no validate or charge action and no awaiting-payment state.
- Gap `SAL-006`: a ready 5/5 enrollment still receives generic `enrollment`, while convert remains disabled. The drawer therefore contradicts the row and blocks the essential conversion outcome.
- Gap `SAL-007`: duplicate `Abrir interessado` and `Abrir conversa` controls emit the same action. Checklist controls all have the accessible name `Abrir` and remain enabled without an available callback, producing no observable result.

### Shared route evidence

- Gap `SAL-008`: route titles do not match their canonical taxonomy (`Vendas`, `Experimental`, `Matriculas`), action announcements expose internal ids, and none of the three stories has a route-level play.

## Smallest probe hypotheses

1. Extend the official `LeadDrawerState` and `LeadDrawerAction` contracts with explicit commercial lifecycle states and actions while preserving the single drawer anatomy.
2. Give `EnrollmentChecklist` item-specific accessible names and disable action controls when no callback exists.
3. Map prepared row data to canonical states and state-specific action sets in the three route stories.
4. Keep visible state transitions in story-owned prepared state so every essential callback has an observable product outcome without embedding application business logic in the library.
5. Add initial payment to the enrollment facts and checklist, remove the duplicate conversation action and enable conversion only in the ready state.
6. Use canonical Portuguese page titles and product-language live announcements.
7. Add route-level Storybook plays for representative states, actions, close/reopen, search or quick filters and the canonical drawer geometry.

## Acceptance gate

This batch is not approved until direct component tests, route plays, package and docs checks, final static Storybook build, browser interaction, responsive measurements at `390x844`, `1024x768` and `1280x720`, accessibility inspection and visual inspection all pass. Product-owner approval remains separate.

## Final resolution

All regional findings `SAL-001` through `SAL-008` are resolved in official library components and prop-driven route stories.

- Interessados now preserves `new`, `no-slot`, `ready`, `lost` and pre-enrollment states; qualification, task creation, conversation and enrollment transitions use explicit product actions and contextual action sets.
- Aulas experimentais now preserves scheduled, missed, conversion-ready and enrollment states. Confirm, reschedule, attendance, absence, conversation, class and follow-up actions produce observable product outcomes without leaking implementation ids.
- Matriculas now includes initial payment in facts and the six-item checklist, represents missing-data, awaiting-payment, ready and converted states, and exposes validate, charge, convert and task actions. Checklist controls have item-specific accessible names and become inert when no callback exists.
- Canonical Portuguese page titles, product-language announcements and route-level plays cover search, quick filters, representative states, essential actions and drawer close/reopen behavior.
- All three pages continue to compose `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` and the single full-height `LeadDrawer`; no route-local shell, table or drawer anatomy was introduced.

Final static evidence is stored in `visual-diagnostics/evidence/worklist-sales-final-current-20260805`. At `390x844`, `1024x768` and `1280x720`, all nine checks report zero document overflow, one visible `h1`, one `CrmProductShell`, no visible Storybook error, an internally scrollable `760px` table and a fixed drawer at top `0` with the exact viewport height. Browser error and warning logs are empty.

The acceptance gate passes with 194 CRM tests, five docs smoke tests, CRM/docs lint, CRM build, docs typecheck, token governance, strict Storybook anatomy, component architecture, drawer lifecycle, public API, domain-wrapper and package-boundary checks. The final static Storybook build succeeds. Product-owner approval remains separate.
