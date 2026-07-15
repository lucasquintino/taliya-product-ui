# Image 10 reference-sheet diagnostic

Date: 2026-07-13

Source: `10_round-3b3_visualizacoes-operacionais_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 10 is a composite inventory of operational visualizations. Certification reviews each visible region through its official isolated owner; it must not be replaced by a docs-local clone of the full board.

The original coverage row incorrectly mapped the compact monthly-calendar region to `WeeklyCalendar` and the operational-summary tiles to `MetricCard`. Current contracts establish `CompactCalendar` as the composed monthly-calendar/day-agenda owner and `MetricTile` as the exact Image 10 block-7 owner. The map now resolves seven structurally and visually reviewed official stories.

Static review captures are stored in `tmp/reference-sheet-10-20260713` at 1440x1000. Final corrected evidence is `kanban-compact.png`, `compact-calendar.png`, `activity-panel.png` and `metric-tile.png`; the earlier `weekly-calendar.png`, `mini-calendar-candidate.png`, `metric-card.png`, `kanban.png` and `activity-feed.png` captures remain rejected comparison evidence.

## Regional diagnostic

- `DataTable` reproduces the complete source table: search/filter rows, selected row, semantic cells, person labels, row actions and numbered pagination.
- `List` reproduces the dense divided rows, leading semantic icons, title/meta, status and time anatomy.
- `KanbanBoard` now exposes an official compact density with three columns, compact title/meta/footer cards and add-case footers while preserving the richer Image 21 operational variant. The final capture shows all nine cards and three footer actions without clipping.
- `CompactCalendar` owns the complete region through official primitives: month/view navigation, `MiniCalendar`, selected-day agenda rows and prepared create/open callbacks.
- `Timeline` reproduces the vertical connector, semantic markers, event hierarchy, actor and time rhythm, with additional compact/execution/audit variants.
- `ActivityFeed` now exposes the Image 10 panel variant with segmented tabs, filter action and five compact avatar rows while preserving the later full-history workspace.
- `MetricTile` is the exact source owner and reproduces the 2x3 grid, selected inverse tile, icons, values and semantic deltas. `MetricCard` was a wrong abstraction level for this region.

## Component review

| Source contract | Official story | Contract | Isolated story | Reusable owner | Source-aligned states | Static review | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DataTable | `primitives-ui-datatable--all-states` | Pass | Pass | `@taliya/ui` | Pass: full filters, selectable rows, statuses, people, actions and pagination | Pass | Pass |
| List | `primitives-ui-list--all-states` | Pass | Pass | `@taliya/ui` | Pass: dense divided operational rows with status/time | Pass | Pass |
| KanbanBoard | `crm-kanban-kanbanboard--all-states` | Pass | Pass | `@taliya/crm` | Pass: compact three-lane/card/footer variant is the first isolated source state | Pass: `kanban-compact.png` | Pass |
| CompactCalendar | `crm-agenda-compactcalendar--source` | Pass after mapping/promotion correction | Pass | `@taliya/crm` | Pass: month grid, view controls and adjacent day agenda | Pass: `compact-calendar.png` | Pass |
| Timeline | `primitives-ui-timeline--all-states` | Pass | Pass | `@taliya/ui` | Pass: compact status history and extended execution/audit states | Pass | Pass |
| ActivityFeed | `crm-timeline-activityfeed--all-states` | Pass | Pass | `@taliya/crm` | Pass: source tabs/filter plus five compact avatar rows are the first isolated state | Pass: `activity-panel.png` | Pass |
| MetricTile | `primitives-ui-metrictile--all-states` | Pass after mapping correction | Pass | `@taliya/ui` | Pass: exact 2x3 summary grid, inverse selected tile, icons and deltas | Pass | Pass |

## Accepted corrections

- Replaced invalid `WeeklyCalendar`/`MiniCalendar` mapping with the promoted `CompactCalendar`; the rejected weekly capture shows a five-day schedule grid from Image 26, while `MiniCalendar` alone does not own the adjacent agenda.
- Replaced `MetricCard` with the contractually correct `MetricTile`; the accepted capture matches the source block directly.

## Completed corrections

- Added governed compact Kanban density, card footer and column footer APIs without changing the later Image 21 defaults.
- Promoted `CompactCalendar` as the reusable composition over official calendar/list/control primitives.
- Added the `ActivityFeed` panel variant with prepared tabs/filter/item callbacks.
- Added focused component tests, source-first isolated stories and final static captures from the rebuilt Storybook.

## Verdict

`Pass: component reference-sheet review approved.` Seven of seven visible contracts resolve to official reusable owners and pass static source review. The reference remains component-scoped; no board-local clone was introduced.
