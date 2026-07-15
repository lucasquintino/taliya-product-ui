# Image 08 reference-sheet diagnostic

Date: 2026-07-13

Source: `08_round-3b1_inputs-formularios-filtros_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

## Scope decision

Image 08 is a composite inventory of form and filter controls, not a product page. Certification therefore reviews each visible contract in its official isolated Storybook story. A one-off clone of the complete board is forbidden because it would duplicate reusable control anatomy in docs-local markup.

The coverage map was corrected from 9 to 13 visible contracts by adding `DateInput`, `TimeInput`, `SearchInput`, and `Button`. The reference coverage audit now resolves all 13 required contracts to 13 official stories. Static review captures are stored in `tmp/reference-sheet-08-20260713` at 1440x1000.

## Regional diagnostic

- Input, textarea, select, checkbox, toggle, and segmented-control anatomy already matched the source contract and exposed the required standard, selected/focus, error, and disabled states.
- Date and time controls reproduce the compact icon-leading fields and selected values. Their isolated stories also expose error and blocked states beyond the reference board.
- The selected `FilterChip` initially rendered as a neutral white chip instead of the source blue semantic state. Its count text was invisible because the element used `currentColor` for both background and foreground, and the isolated story omitted the source-visible inline removable anatomy.
- `SearchInput` preserves the source search icon, filter action, count and clear action, with additional embedded-filter, loading, error, and disabled states.
- `FieldGroup` owns the compact-form composition. `Button` owns the footer actions and their hierarchy; the story does not recreate either control anatomy locally.

## Component review

| Source contract | Official story | Contract | Isolated story | Reusable owner | Source-aligned states | Static review | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Input | `primitives-ui-input--all-states` | Pass | Pass | `@taliya/ui` | Pass: standard, focus, filled, error and disabled | Pass | Pass |
| Textarea | `primitives-ui-textarea--all-states` | Pass | Pass | `@taliya/ui` | Pass: standard, focus, filled and error | Pass | Pass |
| Select | `primitives-ui-select--all-states` | Pass | Pass | `@taliya/ui` | Pass: closed, open, selected and disabled option | Pass | Pass |
| Checkbox | `primitives-ui-checkbox--all-states` | Pass | Pass | `@taliya/ui` | Pass: unchecked, checked and disabled | Pass | Pass |
| Toggle | `primitives-ui-toggle--all-states` | Pass | Pass | `@taliya/ui` | Pass: off, on and disabled | Pass | Pass |
| SegmentedControl | `primitives-ui-segmentedcontrol--all-states` | Pass | Pass | `@taliya/ui` | Pass: three options with one selected | Pass | Pass |
| DateInput | `primitives-ui-dateinput--all-states` | Pass | Pass | `@taliya/ui` | Pass: empty, selected, error, disabled and blocked | Pass | Pass |
| TimeInput | `primitives-ui-timeinput--all-states` | Pass | Pass | `@taliya/ui` | Pass: empty, selected, disabled, error and blocked | Pass | Pass |
| FilterChip | `primitives-ui-filterchip--all-states` | Pass | Pass after anatomy correction | `@taliya/ui` | Pass: default, selected, removable, count, disabled and accessible remove action | Pass after semantic/count correction | Pass |
| SearchInput | `primitives-ui-searchinput--all-states` | Pass | Pass | `@taliya/ui` | Pass: search, filter, count, clear, loading, error and disabled | Pass | Pass |
| FilterBar | `primitives-ui-filterbar--all-states` | Pass | Pass | `@taliya/ui` | Pass: search plus active removable filters | Pass after shared `FilterChip` correction | Pass |
| FieldGroup | `primitives-ui-fieldgroup--all-states` | Pass | Pass | `@taliya/ui` | Pass: compact labeled form fields and actions | Pass | Pass |
| Button | `primitives-ui-button--all-states` | Pass | Pass | `@taliya/ui` | Pass: hierarchy, density, interaction and unavailable states | Pass | Pass |

## Defects corrected

- The coverage-map row omitted four visible contracts. Added `DateInput`, `TimeInput`, `SearchInput`, and `Button`, increasing Image 08 structural coverage from 9/9 incomplete scope to 13/13 source-faithful scope.
- `.tl-filter-chip--selected` now uses the governed info background/foreground pair visible in the source rather than the neutral filter-select treatment.
- `.tl-filter-chip__count` now uses the governed selection surface with white text, so the count remains legible.
- The isolated `FilterChip` story now renders an inline removable chip in addition to the separate accessible remove-action example.
- Added a focused UI test for selected, counted, and inline-removable filter-chip anatomy.

## Evidence

- `@taliya/ui` tests: 46/46 passed.
- `@taliya/ui` and docs typechecks passed.
- Docs smoke tests: 5/5 passed.
- Token governance and Storybook anatomy audits passed; anatomy reports 0 debt selectors.
- Reference-sheet coverage audit passes structurally with 11/11 sheets and 85 official component targets resolved.
- Static Storybook build passed after the component and story corrections.
- Thirteen post-fix static captures confirm the required form/filter contracts and states.

## Verdict

`Pass: component reference-sheet review.` All 13 visible contracts are represented by official `@taliya/ui` owners and isolated stories with the source-required anatomy and states. Whole-sheet pixel parity is `N/A` for this composite reference-board certification mode; no board-local clone should be introduced.
