# Image 07 reference-sheet diagnostic

Date: 2026-07-13

Source: `07_round-3a_componentes-web-referencia_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

## Scope decision

Image 07 is a composite inventory of web components, not a product page. Certification therefore reviews each named component in its official isolated Storybook story. A one-off clone of the complete board is forbidden because it would duplicate component anatomy in docs-local markup.

The reference coverage audit resolves all 8 required contracts to 8 official stories. Static review captures are stored in `tmp/reference-sheet-07-20260713` at 1440x1000.

## Component review

| Source contract | Official story | Contract | Isolated story | Reusable owner | Source-aligned states | Static review | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IconButton | `primitives-ui-iconbutton--all-states` | Pass | Pass | `@taliya/ui` | Pass: default, subtle, selected, alert, disabled, sizes and interactions | Pass | Pass |
| NavPill | `primitives-ui-navpill--all-states` | Pass | Pass | `@taliya/ui` | Pass: default, hover, focus, active, icon and disabled | Pass | Pass |
| SidebarItem | `crm-shell-components--sidebar-item-states` | Pass | Pass after state-coverage correction | `@taliya/crm` over `IconButton` | Pass: default, active, alert, utility and disabled | Pass | Pass |
| Avatar | `primitives-ui-avatar--all-states` | Pass | Pass | `@taliya/ui` | Pass: simple, badge, stack/add, selected and disabled states | Pass | Pass |
| Badge | `primitives-ui-badge--all-states` | Pass | Pass | `@taliya/ui` | Pass: semantic pill, count and dot tones | Pass | Pass |
| Card | `primitives-ui-card--all-states` | Pass | Pass | `@taliya/ui` | Pass: base and operational card compositions | Pass | Pass |
| Panel | `primitives-ui-panel--all-states` | Pass | Pass | `@taliya/ui` | Pass: large canvas, header, actions, cards and connectors | Pass | Pass |
| DataTable | `primitives-ui-datatable--all-states` | Pass | Pass | `@taliya/ui` | Pass: toolbar, filters, selection, status, pagination and rows | Pass | Pass |

## Defect corrected

- The isolated `SidebarItem` story previously showed only active, alert and disabled examples. It now also renders the source-required default and lower utility states, using the existing official API and icons without adding a docs-only component variant.

## Evidence

- Docs typecheck and smoke tests passed (5/5).
- Token governance and Storybook anatomy audits passed.
- Static Storybook build passed after the story correction.
- Post-fix static capture confirms five distinct `SidebarItem` states.

## Verdict

`Pass: component reference-sheet review.` All 8 named contracts are represented by official owners and isolated stories with the source-required structural states. Whole-sheet pixel parity is `N/A` for this composite reference-board certification mode.
