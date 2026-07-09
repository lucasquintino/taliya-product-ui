# Batch 3 Component Contract - P0 Forms And Filters

This contract is mandatory before closing Batch 3. Components must be cloned from the approved source images, implemented as reusable `@taliya/ui` primitives, documented in isolated Storybook stories, and verified with rendered screenshots.

## Canonical Sources

| Source | Role |
| --- | --- |
| `08_round-3b1_inputs-formularios-filtros_aprovada.png` | Canonical source for Input, Textarea, Select, Checkbox, Toggle, SegmentedControl, SearchInput, DateInput, TimeInput, FieldGroup, FilterBar, and filter-row composition. |
| `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | Canonical source for MoneyInput, compact finance fields, success/error field treatment, and currency row density. |
| `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` | Secondary source for reporting/filter density and operational filter composition. |

## Component Requirements

| Component | Extraction target | Required variants/states | Required behavior | Required tokens |
| --- | --- | --- | --- | --- |
| `Input` | Board 08 panel 1 and compact form panel 10 | default, focus, filled, error, disabled, read-only, blocked, compact, helper, clear, loading | real input; label/description wiring; clear button callback; disabled/blocked prevents input | `control.field.*`, `border.color.field-focus`, `focus.field.shadow`, `status.*` |
| `Textarea` | Board 08 panel 2 and compact form panel 10 | default, focus, filled, error, disabled, read-only, blocked, helper | real textarea; accessible label/description; resize affordance | `control.field.textarea.*`, `control.field.*`, `status.*` |
| `Select` | Board 08 panel 3 and compact form panel 10 | closed, open, selected, disabled item, disabled trigger, error, blocked, helper, compact | headless accessible combobox/listbox; keyboard navigation; value callback | `control.field.*`, `control.select.*`, `shadow.dropdown`, `surface.selection*` |
| `Checkbox` | Board 08 panel 4 plus table/auth usage | unchecked, checked, indeterminate, disabled, focus, helper | real checkbox; indeterminate DOM state; label click toggles; disabled prevents change | `control.checkbox.*`, `surface.selected`, `border.color.control-strong` |
| `Toggle` | Board 08 panel 5 and compact form panel 10 | off, on, disabled, blocked, compact, focus | real switch button; click/keyboard toggles; controlled and uncontrolled usage | `control.toggle.*`, `surface.selected`, `surface.control-hover` |
| `SegmentedControl` | Board 08 panel 6 | inactive, active, hover, focus, disabled, compact | real buttons; single selected value callback; active button announced | `control.segmented.*`, `surface.segmented`, `surface.selected` |
| `SearchInput` | Board 08 panel 9 | empty, filled, with filter action, with result count, loading, error, disabled, clear | real search input; filter button callback; clear callback; loading icon | `control.search.*`, `control.field.*`, `control.icon-button.*` |
| `DateInput` | Board 08 panel 7 | empty, selected, disabled, error, compact | real text input with calendar icon; no date logic | `control.field.*`, `control.field.icon.size` |
| `TimeInput` | Board 08 panel 7 | empty, selected, disabled, error, compact | real text input with clock icon; no scheduling logic | `control.field.*`, `control.field.icon.size` |
| `MoneyInput` | Board 14 panel 11 | default, valid/success, error, disabled, compact | real decimal input; BRL prefix surface only; no calculation logic | `control.field.*`, `status.success`, `status.danger` |
| `FieldGroup` | Board 08 panel 10 and setup/config forms | grouped, inline/compact, with title/description, read-only/blocked composition | layout primitive only; composes field primitives and actions | `control.field.*`, `control.toggle.*`, spacing/layout tokens |
| `FilterBar` | Board 08 panel 9 and operational list filters | single-row, wrapped, dense, table-header composition | layout primitive only; composes SearchInput, FilterChip, Select, Chip | `control.filter-bar.*`, `control.search.*`, chip tokens |

## Storybook Requirements

Each component must have one isolated story:

- `Primitives / UI/Input/All States`
- `Primitives / UI/Textarea/All States`
- `Primitives / UI/Select/All States`
- `Primitives / UI/Checkbox/All States`
- `Primitives / UI/Toggle/All States`
- `Primitives / UI/SegmentedControl/All States`
- `Primitives / UI/SearchInput/All States`
- `Primitives / UI/DateInput/All States`
- `Primitives / UI/TimeInput/All States`
- `Primitives / UI/MoneyInput/All States`
- `Primitives / UI/FieldGroup/All States`
- `Primitives / UI/FilterBar/All States`

Stories must cite this contract and the canonical source filenames, show the source-derived visual state, and include required operational states that are not visible in the source board.

## Closure Gate

Batch 3 can be closed only when every row passes:

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Input | pass | pass | pass | pass | pass | pass | pass | pass |
| Textarea | pass | pass | pass | pass | pass | pass | pass | pass |
| Select | pass | pass | pass | pass | pass | pass | pass | pass |
| Checkbox | pass | pass | pass | pass | pass | pass | pass | pass |
| Toggle | pass | pass | pass | pass | pass | pass | pass | pass |
| SegmentedControl | pass | pass | pass | pass | pass | pass | pass | pass |
| SearchInput | pass | pass | pass | pass | pass | pass | pass | pass |
| DateInput | pass | pass | pass | pass | pass | pass | pass | pass |
| TimeInput | pass | pass | pass | pass | pass | pass | pass | pass |
| MoneyInput | pass | pass | pass | pass | pass | pass | pass | pass |
| FieldGroup | pass | pass | pass | pass | pass | pass | pass | pass |
| FilterBar | pass | pass | pass | pass | pass | pass | pass | pass |

## Certification Evidence

- Desktop and mobile screenshots captured in `tmp/batch3-certification-20260530`.
- Screenshot smoke: 24 captures, all nonblank, no horizontal overflow.
- Validation commands: `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm test`, `corepack pnpm build`.
- CSS variable audit: all `--taliya-*` usages in UI/CRM/docs styles are defined in `packages/tokens/src/tokens.css`.
- Build warnings: Storybook/Vite emitted existing Radix `"use client"` and chunk-size warnings only; build completed successfully.
