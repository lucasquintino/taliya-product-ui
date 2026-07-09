# Implementation Execution Plan

Purpose: define the official execution order for implementing the Taliya Product UI library after the specification is approved.

This file does not authorize implementation by itself. It is the implementation queue to follow once the user explicitly starts the implementation phase.

## Non-Negotiable Execution Rules

- Open the actual approved source image before implementing any image-derived component.
- Use `component-source-map.md` as the extraction authority for every component.
- Use `primitive-ui-matrix.md` as the ownership authority for `Primitives / UI`.
- Use `token-system-v1.md` as the token implementation target.
- Treat `Foundations / Tokens` as the mandatory visual-value contract for every primitive and composed component.
- Do not introduce new color, surface, border, radius, spacing, density, type, shadow, focus, motion, connector, or chart values inside component CSS.
- If an approved image requires a visual value that is not represented in `@taliya/tokens`, stop component work, add/adjust the token first, document it in `Foundations / Tokens`, then resume the primitive.
- Run `corepack pnpm tokens:audit` before accepting any token/component/batch change. This is a regression gate: literal visual debt may only go down or be explicitly reclassified, never increase.
- Run `corepack pnpm tokens:audit:update` only after intentional token normalization or classification changes, then review `token-governance-audit.md` and `token-governance-baseline.json` before continuing.
- CRM-specific tokens that represent standard surfaces/text/borders/status/shadows must be aliases to foundation tokens. Raw final values are allowed only for documented domain-specific exceptions such as channel/provider colors, chart colors, approved image-only status details, or exact certified geometry.
- Build reusable components, not hardcoded screens.
- Build reusable page families, not parallel Storybook pages. `CRM / Image Coverage / Remaining Pages` must follow `remaining-pages-official-source-map.md`: when a route family such as Hoje, Financeiro, Alunos, Setup, Internal, or Uso has an official shell/story family, the remaining story must render that family or a documented variant of it. Do not keep a second local page composition in `ImageCoverageRemaining.stories.tsx`.
- A component extracted from an approved image must be visually identical to the source component at component level.
- Larger CRM components must compose smaller primitives; they must not duplicate primitive visuals.
- For logged-in CRM page coverage after the Hoje baseline, use `current-implementation-baseline.md` as the mandatory shell/sidebar/topbar/row-interaction contract before reading the next page image.
- Do not implement backend, database, API calls, auth, billing logic, routing, or real agent decisions.
- There is no accepted "V1", "good enough", or partial completion state; a batch stays open until every scoped component has all planned variants, all relevant states, real interaction behavior, isolated Storybook coverage, tests/build/lint/typecheck passing, and visual smoke inspection against approved references.

## Token-First Primitive Rule

Before implementing any `@taliya/ui` primitive, the implementer MUST identify and record:

- primary approved source image filename;
- exact visible anatomy to clone;
- official token groups used for color/surface/border, typography, spacing/density, radius, elevation, focus, and motion;
- required variants and states from `primitive-ui-matrix.md`;
- Storybook path under `Primitives / UI`;
- whether any required token is missing.

The primitive can be implemented only when all required visual values already exist in `@taliya/tokens`. Missing values are a stop condition, not permission to hardcode CSS.

For every batch after this normalization pass:

- token extraction is the first task, not a cleanup task;
- reusable anatomy values must be promoted to `@taliya/tokens` before component CSS is touched;
- Storybook `Foundations / Tokens` must expose the new tokens before the component story can be accepted;
- remaining local CSS numbers must be explicitly structural or functional, not hidden design decisions.

## Component Acceptance Checklist

Every component is accepted only when all applicable items pass:

- exported from the correct package;
- public API keeps the correct ownership boundary;
- source image filename is cited in the Storybook story;
- component is implemented as real interactive UI, not an image;
- visible output is a 1:1 clone of the approved source component;
- required variants and states from `component-matrix.md` and `primitive-ui-matrix.md` exist;
- CSS uses `@taliya/tokens` / token CSS variables, not one-off visual values;
- `corepack pnpm tokens:audit` passes with no new literal visual debt;
- any new token dependency is documented in `Foundations / Tokens` before the component is accepted;
- keyboard, focus, disabled, and accessible naming behavior are implemented when interactive;
- Vitest coverage exists for render, primary state, and primary callback where applicable;
- Storybook has an individual story for the component plus state/variant stories;
- image-coverage composition uses the component without hardcoding the full screen.

## Logged-In Page Coverage Baseline

Current accepted baseline:

```text
specs/001-product-ui-foundation/current-implementation-baseline.md
```

Applies to:

- `17_round-4.1A_hoje_01_acima-da-dobra.png.png`
- `18_round-4.1A_hoje_02_drawer-tarefa.png.png`
- `20_round-4.1A_hoje_04_historico-de-hoje.png.png`

Mandatory carry-forward rules:

- All logged-in CRM pages must use `CrmProductShell` unless their source image explicitly belongs to another shell family such as setup, access, or internal backoffice.
- Sidebar and topbar behavior must come from official shell components, not page-local clones.
- Page rows/cards must expose real callbacks when actionable.
- Hover, focus-visible, active, selected, disabled, loading, empty, blocked, and error states must be implemented at the reusable component layer, not only in the image coverage story.
- Row hover must be visually perceptible using the official product-shell row hover token.
- The current Hoje baseline is accepted as product-ok / semi-approved visual reference, not as certified pixel-perfect 1:1 evidence.

Next recommended logged-in page:

```text
21_round-4.1B_operacao_01_kanban-geral.png.png
```

Pre-work for Image 21:

- open the approved source image;
- confirm shell/sidebar/topbar reuse from the Hoje baseline;
- audit existing `KanbanBoard`, `KanbanColumn`, `KanbanCard`, `FilterBar`, `FilterChip`, `Chip`, `IconButton`, and `Button`;
- identify which kanban interactions already satisfy the Hoje quality bar and which need adjustment;
- only then implement the image coverage composition.

## Batch 9 Execution Control

Batch 9 uses a mandatory operational ledger:

```text
specs/001-product-ui-foundation/batch-9-status-ledger.md
```

Before changing code for any Batch 9 component, the implementer must update or verify the component row in the ledger. The row must state the current status, source image, exact crop path, Storybook path, evidence folder, last blocker, and next action.

Batch 9 execution must follow a one-component cycle:

1. lock the contract and ledger row;
2. open the approved source image;
3. create or verify the exact source crop before code changes;
4. extract measurements and missing token needs;
5. add or adjust tokens first;
6. implement or refactor the component using approved primitives;
7. update the isolated Storybook story;
8. run focused package tests and typecheck;
9. capture Storybook screenshots and measurement manifest;
10. compare against the crop;
11. update the component contract and ledger.

Stop broad validation at the first P0/P1 visual or architecture blocker. Examples: wrong dimensions, missing source action/column/state, clipped content, overflow, local CSS value that should be a token, or duplicated primitive visuals. Fix the component before moving forward.

Full `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`, and `corepack pnpm visual:smoke` are required for component approval, component-family approval, and batch closure. During tight visual iteration, use focused tests and Storybook capture first to avoid slow feedback loops.

## Execution Batches

### Batch 0 - Spec And Source Lock

Goal: confirm the implementation queue is safe to start.

Inputs:

- `image-coverage-map.md`;
- `component-matrix.md`;
- `component-source-map.md`;
- `primitive-ui-matrix.md`;
- `token-system-v1.md`;
- canonical image directory.

Acceptance:

- every target image exists locally;
- every component in the matrix has one source-map row;
- every primitive has one matrix row and one source-map row;
- no unresolved placeholder or unmapped component remains.

### Batch 1 - Token System v1

Package: `@taliya/tokens`

Implement:

- raw tokens;
- semantic color/surface/border tokens;
- status and operational state tokens;
- quota threshold tokens;
- typography tokens;
- spacing and density tokens;
- radius, elevation, focus, motion tokens;
- connector and chart tokens;
- CSS variable exports and TypeScript exports;
- `Foundations / Tokens` Storybook coverage.

Acceptance:

- `token-system-v1.md` is reflected in code;
- `token-values-v0.md` is not treated as the final implementation target;
- `Foundations / Tokens` is organized by category and exposes the approved visual-value contract;
- no component needs to invent visual values outside tokens.

### Batch 2 - P0 Identity, Icons, Actions, Navigation, Status

Package: `@taliya/ui`

Status: implemented and validated in code.

Implement or complete:

- `TaliyaLogo`;
- `Icon`;
- `IconButton`;
- `Button`;
- `ButtonGroup`;
- `ActionMenu`;
- `DropdownMenu`;
- `NavPill`;
- `FilterChip`;
- `Chip`;
- `Badge`;
- `StatusDot`;
- `Toast`;
- `InlineAlert`;
- `Avatar`;
- `AvatarStack`.

Acceptance:

- every item has isolated `Primitives / UI / [Component] / All States` stories;
- every item exposes required variants, states, and behavior in Storybook, not only a happy-path render;
- shell-specific CRM bridge components use these primitives or are replaced by them;
- image 79 shell controls can be rebuilt from these primitives.

Implemented verification:

- `Primitives / UI / [Component]` contains isolated `All States` stories for `Icon`, `IconButton`, `Button`, `ButtonGroup`, `ActionMenu`, `DropdownMenu`, `NavPill`, `FilterChip`, `Chip`, `Badge`, `StatusDot`, `Toast`, `InlineAlert`, `Avatar`, `AvatarStack`, and `TaliyaLogo`;
- `All States` stories expose the planned variants/states instead of only a happy-path demo;
- CRM shell-specific bridge stories live under `CRM / Shell / Components`; reusable primitives remain only under `Primitives / UI`;
- `CrmSidebarFloatingButton`, `CrmTopbarActionButton`, `CrmTopbarNavChip`, `CrmShellBackButton`, and `CrmShellAvatar` compose `@taliya/ui` primitives;
- validation required after future edits: `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`, and Storybook browser smoke on the Batch 2 stories plus image 79 shell.

### Batch 3 - P0 Forms And Filters

Package: `@taliya/ui`

Implement or complete:

- `Input`;
- `Textarea`;
- `Select`;
- `Checkbox`;
- `Toggle`;
- `SegmentedControl`;
- `SearchInput`;
- `DateInput`;
- `TimeInput`;
- `MoneyInput`;
- `FieldGroup`;
- `FilterBar`.

Acceptance:

- fields clone board 08 and board 14 field anatomy;
- focus, disabled, error/invalid, read-only, blocked, and compact states exist where applicable;
- no domain-specific form logic enters `@taliya/ui`.

Implemented verification:

- `Primitives / UI / [Component]` contains isolated `All States` stories for `Input`, `Textarea`, `Select`, `Checkbox`, `Toggle`, `SegmentedControl`, `SearchInput`, `DateInput`, `TimeInput`, `MoneyInput`, `FieldGroup`, and `FilterBar`;
- field primitives expose empty, filled, focus-visible, invalid/error, disabled, read-only, blocked, compact, helper/status, loading, and clear states where applicable;
- `Select` uses a headless accessible trigger/listbox implementation, with closed, open, selected, disabled, blocked, error, size, and helper states represented in Storybook;
- checkbox, toggle, segmented control, search/filter action, and clear controls are real interactive controls, not static visual mocks;
- `FieldGroup` and `FilterBar` compose the primitives without adding product-specific logic;
- validation passed with `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`, and a browser smoke over all 12 Batch 3 stories.

### Batch 4 - P0 Surfaces, Data, Progress, States

Package: `@taliya/ui`

Implement or complete:

- `Card`;
- `Panel`;
- `MetaText`;
- `InlineGroup`;
- `PersonLabel`;
- `ListIcon`;
- `ConnectorLine`;
- `DataTable`;
- `TablePagination`;
- `List`;
- `ListItem`;
- `ProgressBar`;
- `EmptyState`;
- `LoadingState`;
- `ErrorState`;
- `ScrollArea`.

Acceptance:

- rows, density, borders, surfaces, empty/loading/error states clone boards 07, 09, 10, and 12;
- repeated item surfaces avoid nested-card patterns unless the approved source requires it;
- Storybook may keep only demo layout classes; reusable anatomy such as summary cards, mini cards, quota cards, list leading icons, inline meta groups, and person labels must live in `@taliya/ui`.

Implemented verification:

- `Primitives / UI / [Component]` contains isolated `All States` stories for `MetaText`, `InlineGroup`, `PersonLabel`, `ListIcon`, `ConnectorLine`, `Card`, `Panel`, `DataTable`, `TablePagination`, `List`, `ListItem`, `ProgressBar`, `EmptyState`, `LoadingState`, `ErrorState`, and `ScrollArea`;
- `Card` exposes reusable `summary`, `mini`, `quota`, and `flow` patterns extracted from the approved cards rather than relying on story-only CSS;
- `MetaText`, `InlineGroup`, `PersonLabel`, and `ListIcon` centralize repeated row/card/list anatomy used by tables, lists, panels, and scroll areas;
- `DataTable` supports dense rows, selectable rows, selected state, sortable header indicators, custom cell rendering, row actions, loading, empty, and error states;
- `TablePagination` supports items-per-page composition, previous/next controls, and numbered page buttons;
- `List` and `ListItem` support dense/divided list composition, leading/trailing slots, selected, unread, warning, and disabled states;
- `ProgressBar` supports helper text, indeterminate mode, and default/info/success/warning/danger tones for usage/quota surfaces;
- `EmptyState`, `LoadingState`, and `ErrorState` clone board 09 response-state anatomy with real action controls where applicable;
- validation passed with `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`, CSS variable audit, and browser smoke over all 16 Batch 4 stories in desktop and mobile.

### Batch 5 - P0 Overlays

Package: `@taliya/ui`

Implement or complete:

- `Modal`;
- `ConfirmDialog`;
- `Drawer`;
- `DrawerHeader`;
- `DrawerSection`;
- `DrawerFooter`;
- `Popover`;
- `Tooltip`.

Acceptance:

- overlays clone board 09 and drawer sources;
- focus and accessible dialog behavior are implemented;
- drawer anatomy is shared before any domain drawer is implemented.

Implemented verification:

- `Primitives / UI / [Component]` contains isolated `All States` stories for `Modal`, `ConfirmDialog`, `Drawer`, `DrawerHeader`, `DrawerSection`, `DrawerFooter`, `Popover`, and `Tooltip`;
- overlay tokens for destructive action, modal, drawer, drawer slots, popover, tooltip, overlay offset, padding, gap, title, arrow, and responsive action behavior are represented in `@taliya/tokens` and consumed through CSS variables;
- `Modal` exposes simple, form, destructive, compact, loading, blocked, disabled, inline preview, hidden accessible title, close button, Escape/outside close, and controlled/uncontrolled behavior;
- `ConfirmDialog` composes `Modal`, `Button`, `ButtonGroup`, `List`, and `ListItem`; it supports neutral, destructive, sensitive, summary, blocked, loading, cancel callback, confirm callback, and blocked primary action;
- `Drawer` composes `DrawerHeader`, `DrawerSection`, `DrawerFooter`, and Batch 2-4 primitives; it supports right, left, form, read-only detail, blocked, loading, compact, wide, non-dismissible, focusable dialog behavior, side overlay, body scroll, sticky footer, and responsive footer wrapping;
- `DrawerHeader`, `DrawerSection`, and `DrawerFooter` each have their own isolated stories and are not hidden only inside the parent drawer story;
- `Popover` supports menu, form, detail, compact, wide, open, closed, disabled trigger, destructive item, click/Escape behavior, inline visual preview, optional arrow, and anchored positioning;
- `Tooltip` supports simple, rich/with icon, disabled reason, hidden/delayed, hover, focus, keyboard-accessible disabled wrappers, pointer arrow, and anchored positioning;
- visual certification screenshots live in `tmp/batch5-certification-approved-20260530` and passed desktop/mobile nonblank, overflow, and clipping checks;
- interaction certification lives in `tmp/batch5-interaction-smoke-final-20260530/results.json` and passed 8 overlay behavior checks;
- validation passed with `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`, CSS variable audit, and browser smoke over all 8 Batch 5 stories in desktop and mobile.

### Batch 6 - P0 Communication, Calendar, Flow, Data Viz

Package: `@taliya/ui`

Implement or migrate:

- `MessageBubble`;
- `ComposerInput`;
- `CalendarCell`;
- `CalendarEventBlock`;
- `ConnectorLine`;
- `FlowNode`;
- `ChartPanelPrimitive`;
- `Timeline`.

Acceptance:

- `MessageBubble` migrates from `@taliya/crm` into `@taliya/ui`;
- `Composer` in `@taliya/crm` composes `ComposerInput`;
- calendars and flow builders use the primitives instead of local one-offs.

Closure - 2026-05-30:

- formal contract created in `batch-6-component-contract.md`;
- `MessageBubble` exposes accessible delivery/read/failed/locked/pending status labels and keeps failed messages as `role=alert`;
- `ComposerInput` supports controlled and uncontrolled internal-note state, real send by button and Ctrl/Cmd+Enter, responsive toolbar, compact mobile send button, disabled/sending states, and no browser resize handle;
- `CalendarCell` story is interactive, supports selected/today/disabled/conflict/muted/event-dot states, and no longer overflows on 390px mobile;
- `CalendarEventBlock` covers scheduled/full/available/conflict/cancelled/compact states with real action slot;
- `FlowNode` exposes stable accessible names, blocks disabled nodes semantically, supports click/keyboard/menu behavior, and its story composes `ConnectorLine` instead of story-only pseudo-lines;
- `ConnectorLine`, `ChartPanelPrimitive`, and `Timeline` remain reusable primitives with isolated stories and no domain data/API coupling;
- visual evidence: `tmp/batch6-certification-20260530` has 16 desktop/mobile screenshots and `manifest.json` with no overflow/clipping blockers;
- interaction evidence: `tmp/batch6-interaction-smoke-20260530/results.json` passed all 8 Batch 6 smoke checks;
- validation passed with `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, and `corepack pnpm build` (Storybook build emitted only existing Vite warnings for third-party `use client` directives and chunk size).

### Batch 7 - CRM Shell Recomposition

Package: `@taliya/crm`

Implement or refactor:

- `ProductWindowFrame`;
- `CrmProductShell`;
- `Sidebar`;
- `SidebarItem`;
- `Topbar`;
- `PageHeader`;
- `GlobalActions`;
- `CRM / Shell / Components`;
- `CRM / Image 79 Empty Shell`.

Acceptance:

- shell components compose `@taliya/ui` primitives;
- image 79 is reconstructed from reusable parts;
- no primitive-only story remains under `CRM / Shell / Components`.

Batch 7 closure on 2026-05-30:

- `SidebarItem` now composes `IconButton`; CRM shell-specific wrappers use `IconButton`, `NavPill`, `Avatar`, `TaliyaLogo`, and tokenized shell/frame values instead of redefining primitive visual states;
- `CRM / Image Coverage / Image 79 Empty Shell` reconstructs image 79 from `CrmEmptyShellWindow`, `CrmShellSidebar`, `CrmEmptyShellTopbar`, `CrmEmptyShellPageHeader`, and `CrmEmptyShellCanvas`;
- `Foundations / Tokens` documents the image 79 shell/browser tokens added for color, typography, spacing/layout, elevation, and control anatomy;
- Storybook desktop/mobile captures and smoke evidence live in `tmp/batch7-final-20260530/manifest.json`;
- validation passed with `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, and `corepack pnpm build` (Storybook build emitted only existing Vite/Radix `use client` and chunk-size warnings).

### Batch 8 - P1 UI Primitives

Package: `@taliya/ui`

Implement:

- `Stepper`;
- `ChecklistItem`;
- `MetricTile`;
- `StatusSummaryCard`;
- `DiffTable`;
- `PermissionTable`;
- `AuditTable`;
- `ImportProgressCard`;
- `RelationshipCard`;
- `ConflictCard`;
- `DocumentPreview`;
- `ExecutionRow`;
- `ConfidenceMeter`.

Acceptance:

- CRM components that currently fake these surfaces are refactored to compose the new primitives.

Implemented verification:

- `Primitives / UI / [Component]` contains isolated `All States` stories for `Stepper`, `ChecklistItem`, `MetricTile`, `StatusSummaryCard`, `DiffTable`, `PermissionTable`, `AuditTable`, `ImportProgressCard`, `RelationshipCard`, `ConflictCard`, `DocumentPreview`, `ExecutionRow`, and `ConfidenceMeter`;
- each component is prop-driven, reusable in `@taliya/ui`, and exposes real callbacks/semantic controls for its interactive affordances;
- component anatomy values are tokenized for the final source-derived dimensions, including stepper markers, checklist density, metric/status cards, compact tables, import progress, relationship cards, conflict/document surfaces, execution rows, and confidence meter segments;
- final browser capture passed for all 13 Batch 8 stories with no empty render, no horizontal overflow, and no internal text clipping; evidence is in `tmp/visual-audit/batch8/iteration12/manifest.json` and `tmp/visual-audit/batch8/iteration12/contact-sheet.png`;
- validation passed with `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm test`, `corepack pnpm build`, and `corepack pnpm visual:smoke` (Storybook build emitted only existing Vite/Radix `use client` and chunk-size warnings);
- Batch 8 is formally closed: all 13 scoped primitives have isolated stories, source-image comparison evidence, tokenized anatomy, reusable composition, real interaction callbacks, and passing validation gates. `batch-8-component-contract.md` is the source of truth for the final component-level pass matrix.

### Batch 9 - P1 CRM Layouts And Patterns

Package: `@taliya/crm`

Implement:

- layout patterns;
- setup patterns;
- access/subscription patterns;
- inbox patterns;
- agenda/kanban patterns;
- billing/usage/config patterns;
- support/internal shell patterns.

Acceptance:

- every P1 CRM pattern receives prepared props and callbacks;
- no real product logic is introduced;
- components compose P0/P1 primitives.

Current technical evidence - 2026-06-01:

- 77 isolated Batch 9 component stories exist under `CRM / [Family] / [Component] / All States`, plus the non-certifying overview story;
- `ComposerInput`, `RuleRow`, setup/subscription steppers, setup bottom bar, dashboard grid, and Batch 9 story layout were corrected during the formal goal pass to remove accessibility gaps, primitive drift, false-empty portal capture, and narrow-story clipping;
- the setup/subscription stepper now uses the official `Stepper` primitive with tokenized horizontal/vertical orientation instead of CRM-local stepper anatomy CSS;
- subscription status certification is complete for images 75, 76 and 77 covering `SubscriptionStatusCard`, `SubscriptionProgressStepper`, and `SecurePaymentNotice`: final captured dimensions are 726x662, 706x653 and 546x525, tokenized subscription anatomy is documented, real button behavior/`aria-busy` passed, and evidence is in `tmp/visual-audit/batch9/subscription-render-iteration10`;
- subscription resolution/setup handoff certification is complete for images 76 and 77 covering `SubscriptionResolutionPanel` and `ConfirmedSetupHandoff`: final captured dimensions are 706x653 and 607x525, tokenized failed-payment and setup-handoff anatomy is documented, retry/back/support/start/schedule callbacks are real buttons with loading/blocked states, and evidence is in `tmp/visual-audit/batch9/subscription-resolution-handoff-iteration7`;
- plan summary certification is complete for images 65, 74, 76 and 77 covering `PlanSummaryCard`: final captured dimensions are active `292x515`, review `636x539`, confirmed `545x524`, and failed `641x115`; tokenized plan-summary color, layout, row-density and release-note anatomy is documented; change/details/help callbacks are real buttons with loading and blocked states; evidence is in `tmp/visual-audit/batch9/plan-summary-iteration5`;
- checkout review certification is complete for image 74 covering `CheckoutPaymentCard` and `CheckoutReviewPanel`: final captured dimensions are payment card `399x539` and composed review group `1076x539`; tokenized payment-card color, layout, coupon, secure-pill and action anatomy is documented; coupon/apply/continue/back/change-plan/help callbacks are real controls with loading and blocked states; evidence is in `tmp/visual-audit/batch9/checkout-review-iteration5`;
- invoice table certification is complete for image 66 covering `InvoiceTable`: final captured dimension is `876x314`; tokenized invoice-table surface, columns, row density, status chips and action buttons are documented; row/open/download/retry callbacks are real controls with loading, empty, error and blocked states; evidence is in `tmp/visual-audit/batch9/invoice-table-iteration5`;
- add-on card certification is complete for image 67 covering `AddOnCard`: final captured dimensions are `269x344` for available, plan-max and consult cards; tokenized add-on card surface, circular icon, status chips, copy/meta rhythm and primary/secondary actions are documented; action callbacks, loading state and blocked disabled state are real controls; evidence is in `tmp/visual-audit/batch9/addon-card-iteration2`;
- quota progress certification is complete for image 68 covering `QuotaProgress`: final captured dimension is `890x287`; tokenized quota-progress surface, headline typography, progress track/fill, badge, helper, icon tile and actions are documented; ledger/add-ons callbacks, loading state and blocked disabled state are real controls; evidence is in `tmp/visual-audit/batch9/quota-progress-iteration5`;
- usage ledger certification is complete for image 69 covering `UsageLedgerTable`: final captured dimension is `893x709`; tokenized usage-ledger surface, filter widths, exact 855x408 table, table columns, origin marks, status chips, row/action typography, footer and load-more anatomy are documented; filter/row/action/load-more callbacks are real controls, 0 clipping and 0 horizontal overflow passed; evidence is in `tmp/visual-audit/batch9/usage-ledger-iteration5`;
- approval panel certification is complete for image 25 covering `ApprovalPanel`: final captured dimension is `360x940`; tokenized approval-panel surface, header/close/title rhythm, seven fact rows, sections, suggestion box, timeline, recent comment and decision footer are documented; close/approve/edit/reject/request-data/open-origin callbacks are real controls, terminal/loading/blocked states disable decisions correctly, `aria-busy` is exposed for loading, and 0 clipping/horizontal overflow passed; evidence is in `tmp/visual-audit/batch9/approval-panel-final-candidate`;
- impact summary certification is complete for image 61 covering `ImpactSummary`: final captured dimension is `848x185`; tokenized impact-summary surface, title/description rhythm, four effect rows, icon tiles, loading density and blocked alert state are documented; source medium, low, high, loading and blocked states render in the isolated story, loading exposes `aria-busy`, blocked exposes an alert, and evidence is in `tmp/visual-audit/batch9/impact-summary-final-pass`;
- config impact preview certification is complete for image 61 covering `ConfigImpactPreview`: final captured dimension is `848x185`; it composes the certified `ImpactSummary` component instead of duplicating a generic status-card visual, reuses `crm-impact-summary.*` tokens, preserves source medium plus low/high/loading/blocked states, exposes `aria-busy` in loading, exposes alert state in blocked, and evidence is in `tmp/visual-audit/batch9/config-impact-preview-iteration1`;
- before/after diff certification is complete for image 15 covering `BeforeAfterDiff`: final captured dimension is `346x188`; tokenized diff surface, table columns, table offset, subtle border/tint, footer actor/origin group and action button density are documented; source settings, text, policy, loading, empty, error and blocked states render in the isolated story, row/open and approve/reject/revert callbacks are real controls, no clipping/horizontal overflow passed, and evidence is in `tmp/visual-audit/batch9/before-after-diff-iteration4`;
- audit trail certification is complete for image 15 covering `AuditTrail`: final captured dimension is `502x184`; tokenized audit-trail surface, seven-column compact table, full `Abrir objeto` header, external-link open-object controls, status chip density and footer action are documented; source, filtered, sensitive, loading, empty, error and blocked states render in the isolated story, row/open-object/view-all callbacks are real controls, no clipping/horizontal/vertical overflow passed, and evidence is in `tmp/visual-audit/batch9/audit-trail-final-v5`;
- kanban board layout certification is complete for image 21 covering `KanbanBoard` as a layout/container component: final captured dimension is `1284x570`; tokenized board width/height, 181px quick-filter rail slot, five 207px lane slots, 13px source gap, rail filter controls and horizontal board composition are documented; `KanbanColumn` and `KanbanCard` internal visual fidelity remains separate certification work, and evidence is in `tmp/visual-audit/batch9/kanban-board-initial`;
- kanban lane/card certification is complete for image 21 covering `KanbanColumn` and `KanbanCard`: final captured lane dimension is `207x570`, source card is `185x160`, multi-status card is `185x178`, category tag grammar/icons/status chips/menu alignment are tokenized, real select/menu callbacks are preserved, and evidence is in `tmp/visual-audit/batch9/kanban-card-iteration4`;
- weekly calendar certification is complete for image 26 covering `WeeklyCalendar`: final captured dimension is `765x796`, with tokenized 58px time axis, five 137px day columns, 42px header, 27 source class events, selected `Ter 17:00` event, real class-select callback payload, and evidence in `tmp/visual-audit/batch9/weekly-calendar-iteration3`;
- mini calendar certification is complete for image 26 covering `MiniCalendar`: final captured dimension is `204x242`, with tokenized month header, previous/next chevrons, weekday row, 35 real day buttons, outside-month muted days, selected `12`, today `18`, disabled/loading/blocked states, no overflow, and evidence in `tmp/visual-audit/batch9/mini-calendar-iteration5`;
- class card certification is complete for image 26 covering `ClassCard`: final captured selected/pending dimension is `123x86`, regular state dimensions are `122x85`, with tokenized surface, selected blue border/ring, one-line title, teacher/meta, capacity/status row, success/danger/warning/purple status pill states, real selectable button behavior, no overflow, and evidence in `tmp/visual-audit/batch9/class-card-iteration4`;
- settings hub card certification is complete for image 60 covering `SettingsHubCard`: final captured dimension is `332x286`; tokenized hub-card surface, icon tile, official `slidersRound` primitive glyph, title/description rhythm, status chip, and bottom action button are documented; ready, invite-pending, review, connected, pending, loading and blocked states render in the isolated story, open action is a real button callback, and evidence is in `tmp/visual-audit/batch9/settings-hub-card-iteration7`;
- settings section certification is complete for image 62 covering `SettingsSection`: final captured dimension is `944x250`; tokenized section surface, title/description rhythm, two rounded 441px rule groups, six 51px rows, source rule values, five chevron action buttons and one 38x22 compact toggle are documented; source financial rules, saved, dirty, loading and blocked states render in the isolated story, row action and toggle callbacks are real controls, loading exposes `aria-busy`, blocked disables controls, no clipping/horizontal/vertical overflow passed, and evidence is in `tmp/visual-audit/batch9/settings-section-iteration5`;
- permission matrix certification is complete for image 61 covering `PermissionMatrix`: final captured dimension is `851x259`; tokenized permission-matrix surface, 4-column grid, six-row density, numbered blue markers, current-value column, compact toggles, compact selects and state density are documented; source, dirty, read-only, loading, empty, error and blocked states render in the isolated story, toggles and selects are real controls with stateful Storybook callbacks, and evidence is in `tmp/visual-audit/batch9/permission-matrix-iteration5`;
- rule row certification is complete for image 64 covering `RuleRow`: final captured dimension is `860x35`; tokenized rule-row 4-column grid, source icon/title/select/toggle/status placement, 259x27 compact select, 34x20 compact toggle, source red/green colors and state density are documented; source critical, operational, informative, off, value, action, blocked and loading states render in the isolated story, select/toggle/action callbacks are real controls, no horizontal overflow and no internal clipping passed, and evidence is in `tmp/visual-audit/batch9/rule-row-iteration6`;
- integration status row certification is complete for image 62 covering `IntegrationStatusRow`: final captured dimension is `224x72`; tokenized provider/title/status/helper/divider anatomy is documented, the source `Pix Taliya / Bloqueado atÃ© ativar` crop matches with the required two-line helper and Pix provider mark placement, source blocked plus connected/pending/failed/loading/no-divider states render in the isolated story, row action callbacks are real buttons, loading disables action, no horizontal overflow and no internal clipping passed, and evidence is in `tmp/visual-audit/batch9/integration-status-row-iteration4`;
- unsaved changes bar certification is complete for image 62 covering `UnsavedChangesBar`: final captured dimension is `943x51`; tokenized config-footer button anatomy is documented, the source `Cancelar` / `Salvar alteraÃ§Ãµes` crop matches with 146x46 and 240x46 real button controls, source dirty plus saving/saved/blocked states render in the isolated story, save/cancel callbacks are real buttons, saving exposes `aria-busy`, no horizontal overflow and no internal clipping passed, and evidence is in `tmp/visual-audit/batch9/unsaved-changes-bar-iteration2`;
- conversation list certification is complete for image 24 covering `ConversationList`: final captured dimension is `483x733`; tokenized left-inbox filter row, 112px conversation rows, avatar/channel badges, meta/status chips, page-size and pagination anatomy are documented; source selected, unread, waiting-human, progress, copilot, failed, opt-out, loading, empty and blocked states render in the isolated story; filter/row/page-size/pagination callbacks are real controls, row click/Enter/Space selection passes, loading exposes `aria-busy`, blocked disables controls, no horizontal/vertical overflow and no internal clipping passed, and evidence is in `tmp/visual-audit/batch9/conversation-list-iteration4`;
- `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm test`, `corepack pnpm build`, and `corepack pnpm visual:smoke` passed;
- static Storybook render audit passed for the pre-approval-panel-certified Batch 9 story set with no empty render, no horizontal overflow, no internal clipping, and no unnamed controls; evidence is in `tmp/visual-audit/batch9/render-audit-iteration4/render-audit.json`. The current 77 component stories plus overview pass `corepack pnpm storybook:build`; `ApprovalPanel`, `ImpactSummary`, `ConfigImpactPreview`, `BeforeAfterDiff`, `SettingsHubCard`, `SettingsSection`, `PermissionMatrix`, `RuleRow`, `IntegrationStatusRow`, `UnsavedChangesBar`, `ConversationList`, `PageFilterBar`, `TaskQueueList`, and `TaskTable` have dedicated source comparison evidence in their respective `tmp/visual-audit/batch9/*` folders;
- Batch 9 is formally closed after the Kanban follow-up recertification: all current rows in `batch-9-status-ledger.md` are `Aprovado`. `batch-9-component-contract.md` remains the source of truth for the final component-level pass matrix, and any future regression or shared-token change must reopen only the affected component row.
- From 2026-06-05 onward, `batch-9-status-ledger.md` is the operational control file for Batch 9 sequencing and must be updated before and after every component cycle.

### Batch 10 - P2 Domain Components

Package: `@taliya/crm`

Implement:

- agents/flows domain components;
- student, finance, sales, retention, support, internal, reports, and data-quality domain components;
- advanced visual state components.

Acceptance:

- domain components remain visual and prop-driven;
- studio finance, Taliya billing, usage/cotas, CRM studio, and internal backoffice stay separated.

Current technical evidence - 2026-06-01:

- 43 isolated Batch 10 component stories exist under `CRM / Batch 10 / [Component] / All States`;
- story coverage now includes the previously missing contract states for agent catalog/card, action panels, enrollment checklist, import progress, duplicate resolver, and student summary tarefa rows;
- `corepack pnpm typecheck`, `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`, and `corepack pnpm visual:smoke` passed after the latest edits;
- Playwright render audit passed for all 43 Batch 10 stories with no empty render, no horizontal overflow, and no console/page errors; evidence is in `tmp/visual-audit/batch10/render-audit.json`;
- Image 52 certification is complete for `AgentCatalog` and `AgentCard`, including tokenized catalog gap, card padding, card width/height, icon/body gap, status chips, icons, selected state, and CTA proportions; evidence is in `tmp/visual-audit/batch10/crm-batch-10-agentcatalog--all-states.final-source-crop.png` and `tmp/visual-audit/batch10/crm-batch-10-agentcard--all-states.final-width445.png`;
- Images 54 and 56 certification is complete for `ModeSelector` and `ModeCard`, including the official `hand`, `scale`, and `rocket` glyphs plus the filled selected check indicator; evidence is in `tmp/visual-audit/batch10/agents-flow-token-panel-iteration9`;
- Images 56, 58, 59, and 70 certification is complete for `FlowBuilder`, `FlowStepCard`, `PreflightChecklist`, `ScenarioList`, `PhonePreview`, `ExecutionTimeline`, `SimulationRunner`, and `ExecutionReceipt`; evidence is in `tmp/visual-audit/batch10/agents-flow-token-panel-iteration6`;
- Images 28 and 13 certification is complete for `StudentHeader`, `StudentSummary`, and `RelationshipList`, including exact final capture dimensions 1292x173, 901x144, and 443x260; evidence is in `tmp/visual-audit/batch10/student-relationship-final-v3`;
- Images 30, 33, and 34 certification is complete for `PaymentCaseCard`, `FinanceKanbanCard`, and `ReconciliationRow`, including exact final capture dimensions 350x181, 183x135, and 832x55, real callbacks, vertical kanban menu, and source-faithful movement-row wrapping; evidence is in `tmp/visual-audit/batch10/finance-final-20260531`;
- Images 37, 38, 39, and 40 certification is complete for `PipelineCard`, `LeadSummary`, `TrialClassCard`, and `EnrollmentChecklist`, including exact final capture dimensions 239x139, 835x66, 832x70, and 292x152, tokenized sales/commercial row anatomy, real buttons, keyboard focus, and source-faithful status/action chips; evidence is in `tmp/visual-audit/batch10/sales-final-20260531`;
- Images 41, 42, 43, 44, and 09 certification is complete for `RiskCard`, `CancellationCase`, `ReactivationCard`, `ComplaintPanel`, and `SensitiveActionDialog`, including exact final capture dimensions 862x62, 397x860, 412x803, 398x855, and 166x168, tokenized retention row/panel/dialog anatomy, real callbacks, retention status chips, WhatsApp coloring, and source-faithful drawer action grids; evidence is in `tmp/visual-audit/batch10/retention-final-20260531`;
- Images 47, 48, 49, and 50 certification is complete for `SupportTicketPanel`, `GrantAccessPanel`, `TenantCard`, historical `InternalShell` content now promoted as `InternalOverviewDashboard`, `TenantDetailLayout`, and `SecurityRulePanel`, including exact final capture dimensions 390x759, 340x175, 955x60, 1080x754, 1432x840, and 346x838, tokenized support/internal anatomy, real callbacks, tenant checkbox semantics, and blocked denied grant action; evidence is in `tmp/visual-audit/batch10/support-internal-final-20260531`;
- Images 45 and 46 certification is complete for `ChartPanel`, `ReportFilterBar`, and `OpportunityPanel`, including exact final capture dimensions 493x222, 795x49, and 368x817, tokenized reports/opportunity anatomy, real callbacks, source-faithful filter pills, metric card layout, drawer fact grid, timeline, panels, and action grid; evidence is in `tmp/visual-audit/batch10/reports-opportunities-final-20260601`;
- Image 13 certification is complete for `ImportProgress`, `FieldMappingTable`, and `DuplicateResolver`, including exact final capture dimensions 646x254, 453x263, and 502x263, tokenized setup/import anatomy, real progress/detail buttons, real field selects, row/add callbacks, duplicate radios/actions, and source-faithful candidate/action/legend layout; evidence is in `tmp/visual-audit/batch10/import-setup-final-20260601`;
- Images 12, 67, and 68 certification is complete for `PermissionState`, `PlanBlockedState`, `QuotaBlockedState`, and `IntegrationFailedState`, including exact final capture dimensions 357x211, 269x344, 423x437, and 363x211, tokenized advanced-state anatomy, real request/support/flow/retry/menu callbacks, and source-faithful permission, plan, quota, and integration blocked states; evidence is in `tmp/visual-audit/batch10/advanced-state-final-20260601`;
- Batch 10 is formally closed: all 43 scoped components have isolated stories, source-image comparison evidence, tokenized anatomy, reusable composition, real interaction callbacks, and passing validation gates. `batch-10-component-contract.md` is the source of truth for the final component-level pass matrix.

### Batch 11 - Image Coverage And Release QA

Package/app: `apps/docs`

Operational ledger: `batch-11-status-ledger.md`.

Readiness audit: `batch-11-readiness-audit.md`.

Implement:

- image coverage stories for all `Covered` and `Covered/Adjusted` images;
- Playwright story smoke checks;
- visual checks against source images;
- package export checks;
- final docs cleanup.

Acceptance:

- every approved target image can be reconstructed from library components;
- every component used in image coverage has already passed its individual story acceptance;
- every new page-coverage story uses package components and page templates rather than one-off screen markup;
- public package exports and import paths are usable by a future CRM app without importing from `apps/docs`;
- `pnpm lint`, `pnpm test`, `pnpm build`, Storybook build, and visual smoke checks pass.

## Stop Conditions

Stop implementation and report back if:

- an approved source image is missing;
- a component cannot be cloned 1:1 from the source without a design decision;
- required tokens are missing;
- a component appears to need backend/product logic;
- package ownership is unclear;
- a larger CRM component would require duplicating a primitive.
