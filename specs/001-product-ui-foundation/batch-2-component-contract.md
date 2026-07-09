# Batch 2 Component Contract

Scope: P0 identity, icons, actions, navigation, and status primitives.

This contract is mandatory for Batch 2 certification. The approved images are clone sources, not loose inspiration. Each Storybook `AllStates` story must cite this contract through the Batch 2 source description and must render the states listed here with real interactive controls when applicable.

## Sources

- `01_round-1_visual-dna-tokens_aprovada.png`: TaliyaLogo, base icon buttons, avatars/badges, token compositions.
- `07_round-3a_componentes-web-referencia_aprovada.png`: core buttons, icon buttons, nav pills, avatar/badge/status examples, action menu trigger.
- `08_round-3b1_inputs-formularios-filtros_aprovada.png`: filter chip and form-adjacent action button density.
- `09_round-3b2_overlays-feedback_aprovada.png`: button groups, dropdown/action menus, toast, inline alert.
- `11_round-3b4_comunicacao-agentes_aprovada.png`: compact live status dot semantics.
- `79_round-4.1S_app-shell_01_base-web-sem-conteudo.png`: shell use of `IconButton`, `NavPill`, `Avatar`, and `TaliyaLogo`.

## Component Rows

| Component | Exact Extraction Target | Required Variants / States | Required Behavior | Token Groups |
| --- | --- | --- | --- | --- |
| `TaliyaLogo` | Mark, wordmark, compact mark sizing, blue dot gradient, black wordmark | wordmark, compact, mark, inverse context | semantic `role="img"` label | `color.logo-dot.*`, `control.logo.width.*`, text color |
| `Icon` | Linear icon stroke, sizing rhythm, status tone colors | sm, md, lg, current, success, info, warning, danger, paused, blocked | decorative by default, labelled when informative | `control.icon.size.*`, `control.icon.stroke-width`, status/text colors |
| `IconButton` | circular default/subtle/selected/alert/disabled buttons from boards 01/07/79 | sm, md, lg, xl, default, subtle, selected, ghost, danger, alert, loading, disabled, hover, focus, active | native button, `aria-label`, `aria-pressed` when selected, busy/disabled | `control.icon-button.*`, surface, border, shadow, focus, motion |
| `Button` | rectangular action buttons from modal/form examples | primary, secondary, ghost, destructive, sm, md, lg, loading, disabled, blocked, hover, focus, active | native button, loading busy state, blocked title | control height/padding, radius, text, surface, status |
| `ButtonGroup` | modal/drawer action cluster spacing and ordering | start, end, between/footer, destructive pair | `role="group"` where applicable | spacing, control height/padding |
| `ActionMenu` | icon trigger plus row/card action menu | default, row/card action, destructive item, disabled item, selected item | opens menu, keyboard navigation, callback selection | `IconButton`, `DropdownMenu`, menu tokens |
| `DropdownMenu` | menu surface, item density, icons, selected/destructive rows | closed, open, start/end alignment, selected, disabled, destructive | trigger, Escape close, arrow navigation, returns focus | menu, popover, icon, status danger tokens |
| `NavPill` | horizontal topbar pill, active black fill, compact label | default, hover, active, disabled, with icon, with count | native button, `aria-pressed`, optional `aria-current` by consumer | nav-pill, chip height, surface selected, text inverse |
| `FilterChip` | removable/selected/counter filter chip from board 08 | default, selected, removable, counter, disabled, hover, focus, active | selected button plus separate remove button when `onRemove` exists | chip/filter, icon, focus, surface selected |
| `Chip` | compact status pill label with dot/icon | neutral, info, success, warning, danger, paused, blocked, update, quota, with icon | semantic text+icon/dot, no color-only state | status, badge, chip icon |
| `Badge` | count/dot/pill badge and avatar overlay | pill, count, dot, neutral, info, success, warning, danger, paused, blocked | optional `role="status"` when labelled | badge, status, avatar offset |
| `StatusDot` | compact live status dot with optional label | online, success, info, pending, warning, paused, danger, error, blocked, neutral | visible label when provided | status dot, status colors |
| `Toast` | feedback toast row from board 09 | neutral, success, info, warning, danger, paused, blocked, update, action, dismiss | role `status`/`alert`, close callback | toast, alert icon, status, IconButton |
| `InlineAlert` | inline feedback band/card from board 09 | neutral, success, info, warning, danger, paused, blocked, quota, action, dismiss | role `status`/`alert`, dismiss callback | alert, status, IconButton |
| `Avatar` | circular image/initial fallback, status dot, badge overlay | xs, sm, md, lg, xl, image, initials, selected, disabled, status, badge | image fallback on error, accessible name | avatar, badge, status |
| `AvatarStack` | overlapped avatar group with overflow and add affordance | stacked, max/count, add, status/badge children | add button callback and label | avatar stack overlap, avatar add icon, badge |

## Batch 2 Closure Gate

The batch can close only when every row above has:

- isolated `Primitives / UI / [Component] / AllStates` story;
- source image/contract citation;
- token-first implementation with no reusable visual values hardcoded in component CSS or SVG;
- real button/menu/dismiss/add/select behavior where applicable;
- tests for primary behavior;
- Storybook screenshot reviewed against approved sources;
- no P0/P1 visual, behavior, accessibility, or architecture gap.
