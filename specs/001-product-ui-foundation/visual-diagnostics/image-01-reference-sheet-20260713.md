# Image 01 reference-sheet diagnostic

Date: 2026-07-13

Source: `01_round-1_visual-dna-tokens_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

## Scope decision

Image 01 is a composite design-system reference sheet, not a product page. Its contract is to validate the named foundations and primitives through their official isolated stories. Rebuilding the complete board as a one-off Storybook page would duplicate reusable anatomy and is outside the accepted certification mode.

The reference coverage audit resolves all 8 required contracts to 8 official stories. Static review captures are stored in `tmp/reference-sheet-01-20260713` at 1440x1000.

## Component review

| Source contract | Official story | Contract | Isolated story | Reusable owner | Source-aligned states | Static review | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Design tokens | `foundations-tokens-overview--default` | Pass | Pass | `@taliya/tokens` | Pass: source palette plus governed semantic expansion | Pass | Pass |
| Typography tokens | `foundations-tokens-typography--default` | Pass | Pass | `@taliya/tokens` | Pass: source hierarchy plus product roles | Pass after font-inheritance correction | Pass |
| Status semantic tokens | `foundations-tokens-status--default` | Pass | Pass | `@taliya/tokens` | Pass: neutral, success, info, warning, danger and operational states | Pass | Pass |
| IconButton | `primitives-ui-iconbutton--all-states` | Pass | Pass | `@taliya/ui` | Pass: default, subtle, selected, sizes and interaction states | Pass | Pass |
| Card | `primitives-ui-card--all-states` | Pass | Pass | `@taliya/ui` | Pass: base card plus governed product variants | Pass | Pass |
| Panel | `primitives-ui-panel--all-states` | Pass | Pass | `@taliya/ui` | Pass: panel anatomy, header, body and composed examples | Pass | Pass |
| Avatar | `primitives-ui-avatar--all-states` | Pass | Pass | `@taliya/ui` | Pass: sizes, fallback, status, count badge, selected and disabled | Pass | Pass |
| Badge | `primitives-ui-badge--all-states` | Pass | Pass | `@taliya/ui` | Pass: semantic pill, count and dot tones | Pass after cascade correction | Pass |

## Defects corrected

- Token documentation inherited the browser serif fallback because the Storybook canvas did not set the official primary font. `body` now resolves through `--taliya-type-font-primary`.
- `.tl-badge` applied neutral colors after every semantic tone rule, making all badge variants appear neutral. Neutral colors now belong to `.tl-badge--neutral`, so success, info, warning, danger and the related count/dot variants remain visible.
- Added a focused `Badge` class-contract test covering neutral and four semantic tones.

## Evidence

- `@taliya/ui` tests: 45/45 passed.
- `@taliya/ui` and docs typechecks passed.
- Token governance and Storybook anatomy audits passed.
- Static Storybook build passed.
- Post-fix static captures confirm sans-serif typography and distinct semantic badge colors.

## Verdict

`Pass: component reference-sheet review.` All 8 named contracts are represented by official owners and isolated stories, and the two observed rendering defects are corrected. Whole-sheet pixel parity is `N/A` for this composite reference-board certification mode; no board-local clone should be introduced.
