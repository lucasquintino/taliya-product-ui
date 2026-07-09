# Batch 5 Component Contract - P0 Overlays

Scope: `@taliya/ui` primitives only. These components are visual/interaction foundations for future CRM drawers, confirmations, forms, menus, filters, help and blocked-control explanations. They must not contain routing, fetching, persistence, product decisions, billing, auth, or agent logic.

Primary source: `09_round-3b2_overlays-feedback_aprovada.png`.

Drawer secondary sources: `18_round-4.1A_hoje_02_drawer-tarefa.png.png`, `22_round-4.1B_operacao_02_kanban-com-drawer.png`, `23_round-4.1C_tarefas_01_lista-detalhe.png.png`, `25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png`, `32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png`, `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png`.

## Mandatory Batch Rules

- Every overlay must be a real interactive control using accessible headless behavior, not static markup.
- Modal and Drawer must trap focus, close with Escape/outside interaction when dismissible, expose accessible title/description, and return focus to trigger.
- Popover and Tooltip must use anchored positioning and keyboard/focus behavior.
- Drawer anatomy must be reusable before any CRM-specific drawer exists.
- Stories must be isolated under `Primitives / UI / [Component] / All States`.
- Parent overlay stories do not count as stories for `DrawerHeader`, `DrawerSection`, or `DrawerFooter`.

## Component Contracts

| Component | Exact extraction target | Reuses | Required variants | Required states | Required behavior | Storybook path | Visual measurements to match |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Modal` | Board 09 modal row: simple confirmation, medium form, destructive action surfaces | `Button`, `ButtonGroup`, `IconButton`, `Icon`, `Input`, `Select`, `SegmentedControl` | simple, form, destructive, alert/sensitive, compact | open, closed, focus-visible, loading action, blocked action, disabled action | dialog role, modal overlay, Escape/outside close, close button, title/body/footer slots, controlled/uncontrolled open | `Primitives / UI/Modal/All States` | centered white surface, 12-20px radius family, soft shadow, dim overlay, compact header/body/footer rhythm, black primary action, red destructive action |
| `ConfirmDialog` | Board 09 confirmation row: "Marcar como concluida?", destructive reenable/delete, summary confirmation | `Modal`, `Button`, `ButtonGroup`, `Icon`, `InlineAlert`, `List`, `ListItem` | neutral, destructive, sensitive, summary, blocked | open, closed, confirm loading, confirm blocked, cancel, destructive | controlled dialog, cancel callback, confirm callback, blocked reason disables primary, destructive tone | `Primitives / UI/ConfirmDialog/All States` | compact confirmation card, circular icon badge, centered title/copy, paired footer buttons, danger icon/action for destructive |
| `Drawer` | Board 09 drawer lateral form; image 18 and 22 right-side detail drawers | `DrawerHeader`, `DrawerSection`, `DrawerFooter`, `Button`, `ButtonGroup`, `Badge`, `Chip`, `List`, `ListItem`, `MetaText`, `ScrollArea` | right, left, form, read-only detail, blocked, loading, compact, wide | open, closed, focus-visible, dismissible, non-dismissible, loading body, blocked body | dialog role, side overlay, Escape/outside close, focus trap, body scroll, sticky footer, controlled/uncontrolled open | `Primitives / UI/Drawer/All States` | right panel 400-440px, full height, white surface, subtle border/shadow, section dividers, drawer overlay/dim layer, sticky footer |
| `DrawerHeader` | Image 18/22 drawer top: status tag, title, close button, optional meta/action row | `Badge`, `Chip`, `IconButton`, `MetaText` | plain, with status, with meta, with actions, compact | default, focus close, disabled close/action | semantic header, close button callback with accessible label | `Primitives / UI/DrawerHeader/All States` | 24px-ish top padding, title hierarchy, close in top-right, status chip above or below title, thin divider rhythm |
| `DrawerSection` | Image 18/22 drawer content blocks: details, description, checklist, activity, alternatives | `Panel`, `List`, `ListItem`, `MetaText`, `InlineGroup` | default, subtle, divided, compact, dense rows | default, empty, loading, blocked/read-only content | semantic section with optional title, divider/padding modes only | `Primitives / UI/DrawerSection/All States` | small uppercase/strong section titles, 12-20px vertical rhythm, 1px dividers, subtle card-like block only when source shows it |
| `DrawerFooter` | Image 18/22 sticky action areas: primary full-width or action grid plus secondary actions | `Button`, `ButtonGroup`, `IconButton` | default, primary-stacked, action-grid, destructive, blocked | default, loading, disabled, blocked, focus-visible | semantic footer, action order preserved, sticky bottom composition | `Primitives / UI/DrawerFooter/All States` | top divider, 16-20px padding, 8-12px action gaps, black primary action and white secondary actions |
| `Popover` | Board 09 popover row: options menu, form popover, quick details card | `Button`, `IconButton`, `Input`, `Select`, `Badge`, `List`, `ListItem`, `MetaText` | menu, form, detail, compact, wide | open, closed, focus-visible, disabled trigger, destructive item, selected item | anchored popover, click/focus open, Escape/outside close, controlled/uncontrolled open, no hover-only behavior | `Primitives / UI/Popover/All States` | white floating surface, small radius, soft shadow, arrow optional, menu item height around 32-36px, form/detail width variants |
| `Tooltip` | Board 09 tooltip row: simple, with icon, anchored to icon | `Icon`, `IconButton` | simple, with icon, rich, disabled reason | hidden, hover open, focus open, delayed open, disabled reason | anchored tooltip, role tooltip, keyboard focus trigger, no click-only dependency | `Primitives / UI/Tooltip/All States` | black compact bubble, white text, pointer arrow, 8-10px radius, compact padding, max-width for rich copy |

## Acceptance Lock

The batch can be called complete only when every row above has:

- implementation exported from `@taliya/ui`;
- isolated story;
- variants and states visible or operable in Storybook;
- real interaction behavior;
- tests for primary behavior/callbacks;
- screenshot compared against approved sources;
- no known P0/P1 visual mismatch.

## Implemented Closure - 2026-05-30

Status: approved for Batch 5 closure. The broader product-ui goal remains active for later batches.

Source images opened and compared:

- `09_round-3b2_overlays-feedback_aprovada.png`
- `18_round-4.1A_hoje_02_drawer-tarefa.png.png`
- `22_round-4.1B_operacao_02_kanban-com-drawer.png`
- `23_round-4.1C_tarefas_01_lista-detalhe.png.png`
- `25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png`
- `32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png`
- `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png`

Certification artifacts:

- Final Storybook screenshots: `tmp/batch5-certification-approved-20260530`.
- Interaction smoke: `tmp/batch5-interaction-smoke-final-20260530/results.json`.
- Screenshot manifest: `tmp/batch5-certification-approved-20260530/manifest.json`.

Component pass/fail matrix:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Modal` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `ConfirmDialog` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `Drawer` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `DrawerHeader` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `DrawerSection` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `DrawerFooter` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `Popover` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |
| `Tooltip` | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Approved |

Validated states and behavior:

- `Modal`: simple, form, destructive, compact, loading, blocked, disabled, hidden accessible title, Escape/outside/close behavior where dismissible.
- `ConfirmDialog`: neutral, destructive, sensitive, summary, blocked, loading, cancel/confirm callbacks, disabled primary when blocked.
- `Drawer`: right, left, form, read-only detail, blocked, loading, wide, non-dismissible, overlay, focusable dialog, body scroll, sticky footer, responsive action wrapping.
- `DrawerHeader`: plain, status/meta/actions, compact, close/action disabled states.
- `DrawerSection`: default, subtle, divided, compact/dense content, empty, loading, blocked/read-only content.
- `DrawerFooter`: row, stack, grid, destructive, blocked, loading, mobile wrap without clipping.
- `Popover`: menu, form, detail, compact/wide, open/closed, disabled trigger, destructive item, click/Escape behavior.
- `Tooltip`: simple, rich/with icon, disabled reason, hidden/delayed, hover/focus behavior and focusable wrapper for disabled controls.

Validation commands:

- `corepack pnpm test` passed.
- `corepack pnpm typecheck` passed.
- `corepack pnpm lint` passed.
- `corepack pnpm build` passed. Storybook/Vite emitted known non-fatal Radix `use client` and chunk-size warnings.
- CSS variable audit passed: all `--taliya-*` vars used by UI/CRM/Storybook are defined in `@taliya/tokens`.
- Playwright Storybook visual smoke passed: 16 screenshots across desktop/mobile, no blank renders, no horizontal overflow, no clipping.
- Playwright interaction smoke passed: 8 overlay behavior checks, no failures.
