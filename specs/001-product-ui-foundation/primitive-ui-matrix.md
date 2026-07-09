# Primitive UI Matrix

Purpose: define the official `Primitives / UI` scope before implementing or expanding component code.

This file is the source of truth for Etapa 0. It answers:

- which primitives must exist in `@taliya/ui`;
- which approved image each primitive must be extracted from;
- which variants and states are mandatory;
- which tokens are required before implementation;
- which CRM components are allowed to compose the primitive later.

## Scope Rules

- `Primitives / UI` contains reusable product UI primitives. They are not shell-specific, not CRM-domain-specific, and not screen-specific.
- `@taliya/ui` owns primitives, overlays, low-level data display, low-level forms, identity primitives, and state primitives.
- `@taliya/crm` owns composed product patterns such as `ShellSidebar`, `ShellTopNav`, `AgentPanel`, `SetupShell`, `PaymentCaseCard`, and domain-specific drawers.
- A primitive may be visually extracted from a CRM board, but its API must remain domain-neutral.
- Do not create shell-only primitive variants. If the CRM shell needs `IconButton`, `NavPill`, `Avatar`, `Button`, or another primitive, it must use the existing primitive contract that future SaaS components will also use.
- CRM shell CSS may position composed components, but must not redefine primitive hover, focus, active, selected, alert, disabled, size, border, shadow, or color states.
- Storybook stories for primitives must cite approved image source files and prove 1:1 component cloning. A story can use CRM-looking fake data, but the primitive must not import CRM data or CRM components.
- Image 03 is rejected and must not define any primitive. Images 04-06 are historical shell context; they can confirm anatomy, but boards 01 and 07-15 are the primary primitive sources for this phase.

## Current Implementation Reality

Some items currently displayed under `Primitives / UI` are implemented in `@taliya/crm` because they were extracted from image 79 first. This is accepted only as a temporary bridge.

Before the library is considered complete:

1. reusable primitives must move to, or be reimplemented in, `@taliya/ui`;
2. `CRM / Shell / Components` must consume those `@taliya/ui` primitives;
3. `@taliya/crm` may keep compatibility aliases only if they do not appear as canonical primitives.

## P0 Primitive Set

These are required before credible implementation of additional CRM pages.

| Primitive | Package | Primary Source | Secondary Sources | Required Anatomy | Required Variants / States | Required Tokens | Later Composed By |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `TaliyaLogo` | `ui` | `01_round-1_visual-dna-tokens_aprovada.png` | 06, 07, 12, 13, 14, 15, approved logo SVG reference copied into this library | mark, wordmark, compact mark sizing, blue dot, black wordmark | mark, wordmark, compact, light surface, dark/selected surface if needed | brand color, text strong, logo width/height | `ShellBrand`, `CrmProductShell`, `AccessShell`, `SetupShell` |
| `Icon` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | all boards 08-15 | stroke weight, size rhythm, status tone behavior | size xs/sm/md/lg, muted/current/selected/status/danger | icon size, icon stroke, text/status colors | all controls |
| `IconButton` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06, 08, 09, 11, 14, 15, 79 | circular button, centered icon, alert dot, selected fill | default, hover/subtle, selected, alert, disabled, loading, danger | control size, icon size, surface button, selected bg, alert dot, focus | shell actions, table actions, card actions, upload/document actions |
| `Button` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 09, 11, 12, 13, 14, 15 | label, optional icon, fixed height, clear hierarchy | primary, secondary, ghost, destructive, disabled, loading, blocked reason | control height, padding, radius, text/button, selected bg, danger bg | forms, modals, drawers, approval panels |
| `ButtonGroup` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 08, 11, 13, 14, 15 | action cluster spacing and ordering | inline, footer, split, destructive pair | gap, footer padding, button density | modal footer, drawer footer, compact forms |
| `NavPill` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 06, 08, 10, 11, 79 | horizontal pill, active black fill, compact label | default, hover, active, disabled, with count | pill radius, nav padding, selected bg/text | topbar nav, inbox tabs, segmented filters |
| `Chip` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 08, 10, 11, 12, 13, 14, 15 | compact pill label, optional icon/dot/count | neutral, info, success, warning, danger, paused, blocked, selected | status fg/bg, chip height, chip padding, badge font | status labels across CRM |
| `FilterChip` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 11 | removable chip with close affordance, counter chip | default, selected, removable, counter, disabled | filter chip bg, selected bg, gap, close icon | search/filter rows |
| `Badge` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06, 10, 11 | count badge, dot badge, pill badge, overlay placement | dot, count, pill, alert, info, danger, neutral | badge size, badge fg/bg, avatar overlap offset | avatar, nav, icon alerts |
| `StatusDot` | `ui` | `11_round-3b4_comunicacao-agentes_aprovada.png` | 10, 12, 13, 14, 15 | small colored dot with optional text | online, pending, warning, danger, neutral, paused | dot size, status colors | channels, rows, agents, calendars |
| `Avatar` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06, 10, 11, 13, 14, 79 | circular image, fallback initials, optional status/badge overlay | image, initials, selected, disabled, status, alert count | avatar sizes, border, overlay badge | profile headers, shell account, tables |
| `AvatarStack` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06 | overlapped avatars, count/add avatar affordance | stack, count, add, alert | avatar sizes, overlap, border color | team strips, owner groups |
| `PersonLabel` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 11, 12, 13, 14, 15 | avatar or initials plus short person label in one inline unit | xs, sm, image, initials, muted/disabled by parent | avatar size, inline gap, table/list text | tables, lists, activity rows |
| `MetaText` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 12, 13, 14, 15 | small supporting text with semantic tone | default, muted, success, warning, danger, info | small text size, muted text, status colors | cards, tables, lists, panels |
| `InlineGroup` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 12, 13, 14, 15 | inline alignment wrapper for chip/badge/meta/action clusters | default, inherited disabled/blocked | inline gap, alignment | row trailing cells, card metadata, toolbar groups |
| `ListIcon` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 11, 12, 13, 14, 15 | circular icon badge used as list/table leading element | info, success, warning, danger, neutral | list icon size, status bg/fg, radius full | ListItem, ScrollArea rows, activity rows |
| `Card` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 10, 12, 13, 14, 15 | surface, radius, padding, optional header/actions | default, selected, interactive, disabled, danger/info outline | surface card, radius card, border, shadow, padding | repeated item surfaces |
| `Panel` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06, 08-15 | large grouped surface, section spacing | default, elevated, subtle, scrollable | surface panel, panel radius, panel padding, shadow | page sections, boards |
| `Input` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 09, 12, 13, 14, 15 | label, field box, placeholder, optional icon, helper/error | default, focus, filled, error, disabled, read-only | field height, border, focus ring, helper text, disabled | forms, filters, modals |
| `Textarea` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 09, 11, 15 | multiline field, resize affordance, helper/error | default, focus, filled, error, disabled | textarea min height, field padding, error border | notes, prompts, descriptions |
| `Select` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 09, 12, 13, 15 | trigger, chevron, open menu surface, selected row | closed, open, selected, disabled, error | field height, dropdown surface, menu item height | forms and filters |
| `Checkbox` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 12, 13, 14, 15 | square box, check mark, row label alignment | unchecked, checked, indeterminate, disabled | checkbox size, selected bg, border, label text | tables, permission rows |
| `Toggle` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 12, 13, 15 | switch track, thumb, on/off state | off, on, disabled, blocked | switch size, track bg, thumb shadow, selected bg | settings, policies |
| `SegmentedControl` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 15 | segmented wrapper, selected segment pill | default, selected, disabled, compact | segment height, selected bg, border, radius | time filters, mode selectors |
| `SearchInput` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 11, 23, 79 | search icon, input, trailing filter/action | compact, expanded, embedded filter action, with result count, loading | search height, icon size, field bg, trailing action | tables, inbox, topbar, page filters |
| `DateInput` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 14 | compact date field with calendar icon | empty, selected, disabled, error | compact field height, icon size, date text | filters, scheduling |
| `TimeInput` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 14 | compact time field with clock icon | empty, selected, disabled, error | compact field height, icon size | scheduling, class setup |
| `MoneyInput` | `ui` | `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | 08, 12 | BRL value field, prefix/suffix, error helper | default, valid, error, disabled, compact | money text, error fg/bg, field size | finance, billing |
| `FieldGroup` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 12, 13, 14 | grouped fields with title/help, inline layout | default, inline, read-only, compact | group gap, label text, panel padding | setup/config forms |
| `FilterBar` | `ui` | `08_round-3b1_inputs-formularios-filtros_aprovada.png` | 10, 11, 15 | wrapping row of filters/search/chips/result count | single-row, wrapped, dense, table header | row gap, filter chip, search width | operational lists |
| `DataTable` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 12, 13, 14, 15 | table header, row density, checkbox column, actions, status cells | sortable, selectable, selected row, empty, loading, error | row height, header height, cell padding, border subtle | CRM data views |
| `TablePagination` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 07, 14 | footer, items per page, page controls | simple, numbered, next/prev, load more | footer height, pagination button size | tables |
| `List` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 11, 13 | list container with rows and separators | default, dense, grouped, scrollable | row gap, divider, list padding | inbox, tasks, profiles |
| `ListItem` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 11, 13 | avatar/icon, title, meta, status, trailing action | default, selected, unread, warning, disabled | row height, selected bg, marker colors | list/detail patterns |
| `ProgressBar` | `ui` | `12_round-3b5_sistema-plano-governanca_aprovada.png` | 13, 15 | track, fill, value label, threshold color | normal, warning, danger, success, indeterminate, segmented | progress height, track bg, threshold colors | usage, setup, import |
| `Tabs` | `ui` | `13_round-3c1_objetos-setup-dados_aprovada.png` | 10, 11 | tab row, selected tab, count badge | default, selected, disabled, count | tab height, selected bg/text, gap | profile tabs, filters |
| `Timeline` | `ui` | `10_round-3b3_visualizacoes-operacionais_aprovada.png` | 13, 15 | vertical line, icons/dots, event rows | default, compact, sensitive, execution | timeline line, marker size, status colors | history, audit, execution |
| `ConnectorLine` | `ui` | `07_round-3a_componentes-web-referencia_aprovada.png` | 01, 06, 15 | straight/curved/dotted branch lines with endpoints | blue, red, gray, dotted, curved, arrow | connector color, width, node size, curve radius | flow builder, journey canvas |
| `Modal` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 11, 15 | centered surface, header/body/footer, close | simple, form, destructive, sensitive | modal width, overlay bg, shadow, footer gap | confirmations, forms |
| `ConfirmDialog` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 11, 15 | icon, title, description, action pair | neutral, destructive, sensitive, blocked | dialog width, danger tokens, button group | sensitive actions |
| `Drawer` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | later image drawers 18+ | side panel, overlay, header/body/footer structure | right, read-only, form, blocked, loading | drawer width, overlay, drawer shadow, section gap | specialized CRM drawers |
| `DrawerHeader` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | later image drawers 18+ | title, meta, status, close action | default, with status, with actions | drawer padding, title type, close button | all drawers |
| `DrawerSection` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | later image drawers 18+ | title/content/divider rhythm | default, subtle, divided, compact | section gap, divider, title type | all drawers |
| `DrawerFooter` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | later image drawers 18+ | sticky footer action area | default, destructive, blocked | footer padding, border, action gap | all drawers |
| `Popover` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 08, 15 | anchored surface with menu/form/detail content | menu, form, detail, dismissible | popover width, radius, shadow, item height | filters, actions |
| `Tooltip` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | icon buttons across boards | black compact bubble, optional icon, anchor pointer | simple, with icon, rich, disabled reason | tooltip bg/text, radius, shadow | icon-only controls |
| `DropdownMenu` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 07, 10, 14, 15 | menu surface, icon item, destructive item | default, disabled, destructive, selected | menu surface, item height, danger fg | action menus |
| `ActionMenu` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 07, 10, 14, 15 | icon trigger plus dropdown actions | default, row action, card action, destructive | icon button, dropdown menu | table/card row actions |
| `Toast` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | status boards | inline toast row, icon, message, dismiss/action | success, warning, danger, info, update | toast surface, status icon, close size | global feedback |
| `InlineAlert` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 12, 14, 15 | alert band/card, icon, copy, action/dismiss | info, warning, danger, success, plan/quota | alert bg, status colors, border | forms/config |
| `EmptyState` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 79 | icon area, title, body, action | no results, no permission, no integration, empty folder, CTA | state icon size, card spacing, action button | tables, panels |
| `LoadingState` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | tables/lists | skeleton/card/table/panel/spinner | card skeleton, table skeleton, panel skeleton, spinner | skeleton bg, shimmer motion, spinner color | async placeholders |
| `ErrorState` | `ui` | `09_round-3b2_overlays-feedback_aprovada.png` | 12, 14, 15 | icon, title, explanation, retry/support action | recoverable, integration, retry, support, blocking | error fg/bg, action hierarchy | failed panels |
| `FileUpload` | `ui` | `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | 13 | dashed dropzone, icon, helper formats | idle, dragging, uploading, error, complete | upload border, dashed style, error colors | setup/docs |
| `AttachmentList` | `ui` | `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | 09 | attachment card/list with file icon/status/menu | pending, approved, error, removable | attachment surface, file icon, status chip | documents/support |
| `CalendarCell` | `ui` | `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | 10 | date/time cell, event count/status dots | empty, today, selected, disabled, conflict | calendar border, cell size, dot colors | `WeeklyCalendar`, `MiniCalendar` |
| `CalendarEventBlock` | `ui` | `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | 10 | compact event block with title/meta/capacity | scheduled, full, available, conflict, cancelled | event bg palette, event border, compact type | schedule grids |
| `MessageBubble` | `ui` | `11_round-3b4_comunicacao-agentes_aprovada.png` | inbox pages | inbound/outbound bubble, timestamp, status/checks | inbound, outbound, internal note, failed, agent suggestion | bubble bg, border, timestamp type | `ConversationThread` |
| `ComposerInput` | `ui` | `11_round-3b4_comunicacao-agentes_aprovada.png` | inbox pages | message input, attachment/actions, internal toggle, send button | empty, typing, disabled, internal, sending | composer height, action size, send button | `Composer` |
| `FlowNode` | `ui` | `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` | 07 | node/card with icon, title, status, menu, ports | trigger, condition, action, approval, fallback, blocked | node width, port size, connector tokens | `FlowBuilder` |
| `ChartPanelPrimitive` | `ui` | `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` | reports pages | chart container, title, legend, empty/loading slots | line, bar, funnel, ranking, heatmap, empty | chart palette, grid line, legend type | `ChartPanel`, reports |

## P1 Primitive Set

These can follow once P0 primitives are stable, but they still belong in `@taliya/ui` because multiple domains reuse them.

| Primitive | Source Images | Required States | Notes |
| --- | --- | --- | --- |
| `Stepper` | 13, 15 | complete, current, blocked, pending | `SetupStepper` and preflight flows compose this. |
| `ChecklistItem` | 13, 15 | complete, incomplete, warning, blocked, action available | Base for activation checklist, preflight checklist, enrollment checklist. |
| `MetricTile` | 10, 12, 15 | default, positive delta, negative delta, warning, selected | CRM `MetricCard` can compose this. |
| `StatusSummaryCard` | 10, 12, 15 | ok, attention, danger, blocked, action | Base for plan, quota, integration, incident summaries. |
| `DiffTable` | 14, 15 | changed, removed, added, approved, rejected | Used for approval and finance before/after. |
| `PermissionTable` | 12, 15 | allowed, blocked, request access, pending | CRM `PermissionMatrix` composes this. |
| `AuditTable` | 12, 15 | success, pending, alert, denied | CRM `AuditTrail` can compose it. |
| `ImportProgressCard` | 13 | running, complete, duplicate, error, paused | Setup/data-quality primitive if reused outside setup. |
| `RelationshipCard` | 13 | primary, related, conflict, selected | Student/support/setup contexts. |
| `ConflictCard` | 14 | warning, danger, suggestion applied, unresolved | Calendar/resource conflicts and data conflicts. |
| `DocumentPreview` | 14 | preview, signed, pending, error | Contracts/documents/support. |
| `ExecutionRow` | 15 | running, success, failed, pending, skipped | Agent trace, audit, execution receipts. |
| `ConfidenceMeter` | 11 | low, medium, high | Agent confidence, eval quality, lead scoring later. |

## Storybook Structure For Etapa 0/1

The target Storybook structure after implementation:

```text
Foundations / Tokens
Primitives / UI / Identity
Primitives / UI / Actions
Primitives / UI / Navigation
Primitives / UI / Status
Primitives / UI / Forms
Primitives / UI / Surfaces
Primitives / UI / Data
Primitives / UI / Overlays
Primitives / UI / States
Primitives / UI / Timeline And Flow
Primitives / UI / Communication
Primitives / UI / Calendar
Primitives / UI / Files
CRM / Shell / Components
CRM / Image 79 Empty Shell
```

No generic gallery should be used as the primary review artifact. Each primitive needs individual stories for source-image 1:1 clone review and required states.

## Implementation Stop Rule

Do not implement domain components from images 10-15 until their underlying P0 primitives have:

- a canonical `@taliya/ui` export;
- story coverage in the target Storybook group;
- state coverage matching this matrix;
- token usage mapped to `token-system-v1.md`;
- no hardcoded CRM business meaning in the public API.
