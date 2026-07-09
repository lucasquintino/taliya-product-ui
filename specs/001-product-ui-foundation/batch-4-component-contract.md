# Batch 4 Component Contract

Purpose: harden Batch 4 before any later batch. Every row is a blocking contract for implementation and review.

Canonical source images:

- `07_round-3a_componentes-web-referencia_aprovada.png`
- `09_round-3b2_overlays-feedback_aprovada.png`
- `10_round-3b3_visualizacoes-operacionais_aprovada.png`
- `12_round-3b5_sistema-plano-governanca_aprovada.png`

## Contract Matrix

| Component | Source target | Anatomy to clone | Required variants/states | Required behavior | Storybook path | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `MetaText` | 07 mini cards, 10 table/list meta, 12 usage cards | 12px supporting text, muted/status tones, no layout side effects | default, muted, success, warning, danger, info | semantic span, inherited disabled state | `Primitives / UI/MetaText` | Required |
| `InlineGroup` | 10 row trailing clusters, 12 card meta clusters | inline aligned chip/badge/text/action grouping | default, compact, wrap-safe | semantic inline wrapper, no click behavior | `Primitives / UI/InlineGroup` | Required |
| `PersonLabel` | 10 table responsible cells/activity rows | avatar/initials plus person label, 28px row rhythm | xs, sm, initials, image, disabled by parent | semantic inline wrapper | `Primitives / UI/PersonLabel` | Required |
| `ListIcon` | 10 dense list leading icons, 09 state icons | circular 28px icon badge with status color | info, success, warning, danger, neutral | decorative by default, label inherited when needed | `Primitives / UI/ListIcon` | Required |
| `ConnectorLine` | 07 connectors section and panel/canvas routing lines | straight, elbow and dashed connector primitives with arrow/node endpoints | blue/info, red/danger, neutral/dashed, straight, elbow | decorative by default; must be reusable inside canvas/pipeline layouts | `Primitives / UI/ConnectorLine` | Required |
| `Card` | 07 cards 5/6/7, 10 summary cards, 12 quota cards | reusable surface, summary KPI, mini status, quota card, flow/task/action card slots | default, inverse, selected, disabled, interactive, summary, mini, quota, flow/action compositions | interactive card can receive button/role from consumer; nested real controls remain real | `Primitives / UI/Card` | Required |
| `Panel` | 07 panel/canvas, 12 large panels | large grouped surface with toolbar/content/footer spacing | default, compact, elevated, subtle, canvas composition | section landmark, child controls remain interactive | `Primitives / UI/Panel` | Required |
| `DataTable` | 10 table complete, 07 light table, 12 permission/log tables | table wrapper, header, selectable row, row icon/star, custom cells, row actions, selected row | dense/default, selectable, selected, sortable indicator, empty, loading, error | row click, checkbox selection, action buttons | `Primitives / UI/DataTable` | Required |
| `TablePagination` | 10 table footer, 07 light table footer | pagination label, page buttons, ellipsis, previous/next, items-per-page control composition | first, middle, last, disabled prev/next, numbered | page buttons and arrows call handlers | `Primitives / UI/TablePagination` | Required |
| `List` | 10 dense list, 09 scroll/state lists | bordered grouped list shell with dense/divided rows | default, dense, divided, grouped, scrollable composition | no behavior beyond list semantics | `Primitives / UI/List` | Required |
| `ListItem` | 10 dense list rows, 09 row-like feedback | leading icon/avatar, title/meta, status badge, timestamp/action | default, selected, unread, warning, disabled | optional row click/action button | `Primitives / UI/ListItem` | Required |
| `ProgressBar` | 12 usage/quota progress cards | label/value chip, track/fill, helper, threshold colors | default, info, success, warning, danger, indeterminate, segmented | progressbar role with aria value for determinate | `Primitives / UI/ProgressBar` | Required |
| `EmptyState` | 09 empty state, 79 empty shell | icon circle, title, description, optional action, blocked/no permission | no results, no permission, no integration, CTA circular | action is real button/link from consumer | `Primitives / UI/EmptyState` | Required |
| `LoadingState` | 09 loading/skeleton row | card skeleton, table skeleton, panel skeleton, spinner with approved proportions | skeleton, table, panel, spinner | spinner announces loading; skeleton is decorative | `Primitives / UI/LoadingState` | Required |
| `ErrorState` | 09 error state, 12 blocking/system states | red icon circle, title, description, action link/button | recoverable, integration, retry, support, blocking | role alert, action is real control | `Primitives / UI/ErrorState` | Required |
| `ScrollArea` | 10 dense list scroll, 09 drawer/list scroll | bounded scroll container with vertical/horizontal/both behavior | vertical, horizontal, both | real scroll region | `Primitives / UI/ScrollArea` | Required |

## Completion Lock

Batch 4 cannot be called complete unless every component above has:

- isolated Storybook story;
- reusable anatomy in `@taliya/ui`, not story-only CSS;
- screenshot compared against the approved source target;
- variants/states represented;
- real behavior smoke-tested where applicable;
- clean pass in the final pass/fail matrix.

## Closure Gate

Batch 4 can be closed only when every row passes:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MetaText | pass | pass | pass | pass | pass | pass | pass | pass |
| InlineGroup | pass | pass | pass | pass | pass | pass | pass | pass |
| PersonLabel | pass | pass | pass | pass | pass | pass | pass | pass |
| ListIcon | pass | pass | pass | pass | pass | pass | pass | pass |
| ConnectorLine | pass | pass | pass | pass | pass | pass | pass | pass |
| Card | pass | pass | pass | pass | pass | pass | pass | pass |
| Panel | pass | pass | pass | pass | pass | pass | pass | pass |
| DataTable | pass | pass | pass | pass | pass | pass | pass | pass |
| TablePagination | pass | pass | pass | pass | pass | pass | pass | pass |
| List | pass | pass | pass | pass | pass | pass | pass | pass |
| ListItem | pass | pass | pass | pass | pass | pass | pass | pass |
| ProgressBar | pass | pass | pass | pass | pass | pass | pass | pass |
| EmptyState | pass | pass | pass | pass | pass | pass | pass | pass |
| LoadingState | pass | pass | pass | pass | pass | pass | pass | pass |
| ErrorState | pass | pass | pass | pass | pass | pass | pass | pass |
| ScrollArea | pass | pass | pass | pass | pass | pass | pass | pass |

## Certification Evidence

- Desktop and mobile screenshots captured in `tmp/batch4-final-review-20260530`.
- Screenshot smoke: 32 captures, all nonblank, no horizontal overflow.
- Source images visually compared: `07_round-3a_componentes-web-referencia_aprovada.png`, `09_round-3b2_overlays-feedback_aprovada.png`, `10_round-3b3_visualizacoes-operacionais_aprovada.png`, and `12_round-3b5_sistema-plano-governanca_aprovada.png`.
- Validation commands: `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm test`, `corepack pnpm build`.
- CSS variable audit: all `--taliya-*` usages in UI/CRM/docs styles are defined in `packages/tokens/src/tokens.css`.
- Build warnings: Storybook/Vite emitted existing Radix `"use client"` and chunk-size warnings only; build completed successfully.
