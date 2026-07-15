# Token Governance Audit

Generated: 2026-07-15T06:45:33.465Z

## Verdict

Token governance is clean for the shipped component surface: package and inline story CSS contain no actionable literal visual debt, Storybook owns no product anatomy, and no high-priority mandatory alias rows remain.

## Classification Rules

- **alias obrigatorio**: token/component value is a standard surface, text, border, status, radius, spacing, or shadow and must point to the canonical foundation token.
- **token especifico justificado**: value is domain-specific and visually meaningful, such as brand/channel/provider colors, source-image-only states, data visualization colors, or exact certified component geometry.
- **duplicado**: token repeats an existing foundation value and should become an alias.
- **lixo/historico**: token appears temporary, placeholder, unused, or no longer tied to a component contract.

## CSS Literal Inventory

| File | hex | rgba/rgb | gradients | literal sizing | literal shadow | actionable lines |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `packages/ui/src/styles.css` | 0 | 0 | 0 | 0 | 0 | 0 |
| `packages/crm/src/styles.css` | 0 | 0 | 0 | 0 | 0 | 0 |
| `apps/docs/src/storybook.css` | 46 | 27 | 0 | 464 | 0 | 537 |

Story files inventory:

```json
{
  "hex": 0,
  "rgba": 0,
  "gradient": 0,
  "literalSizing": 0,
  "literalShadow": 0
}
```

Storybook CSS ownership is enforced by the strict anatomy audit rather than by treating fixture dimensions as shipped product tokens:

- Product-anatomy debt selectors: 0
- Official appearance/anatomy overrides: 0
- Allowed fixture-geometry overrides: 29
- Capture harness selectors: 26
- Inventoried Storybook fixture literal lines: 537

## CRM Token Classification Summary

| Classification | Count |
| --- | ---: |
| token especifico justificado | 2660 |
| alias resolvido | 345 |

## High-Priority Token Rows

These are the first rows to normalize. The list is capped to keep this document readable; run `pnpm tokens:audit:update` for the full JSON baseline.

| Token | Current value | Classification | Reason | Suggested alias |
| --- | --- | --- | --- | --- |


## High-Priority CSS Literals

These shipped package CSS lines need either token replacement or a documented domain exception. Storybook fixture dimensions remain inventoried above and are rejected separately if they own product anatomy.

| Location | Kind | Line |
| --- | --- | --- |


## Required Gate

No new component, story, or token may introduce additional literal color, shadow, spacing, radius, typography, or surface values without either:

1. promoting the value to `@taliya/tokens`;
2. mapping it to an existing foundation token; or
3. documenting why it is a justified component-specific token.
