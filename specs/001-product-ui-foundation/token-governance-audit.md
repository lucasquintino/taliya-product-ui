# Token Governance Audit

Generated: 2026-07-01T05:18:43.560Z

## Verdict

Token governance is clean for the current component surface: package and story CSS contain no actionable literal visual debt, and no high-priority mandatory alias rows remain.

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

## CRM Token Classification Summary

| Classification | Count |
| --- | ---: |
| token especifico justificado | 2094 |
| alias resolvido | 297 |

## High-Priority Token Rows

These are the first rows to normalize. The list is capped to keep this document readable; run `pnpm tokens:audit:update` for the full JSON baseline.

| Token | Current value | Classification | Reason | Suggested alias |
| --- | --- | --- | --- | --- |


## High-Priority CSS Literals

These component CSS lines need either token replacement or a local justification comment. The list is capped.

| Location | Kind | Line |
| --- | --- | --- |


## Required Gate

No new component, story, or token may introduce additional literal color, shadow, spacing, radius, typography, or surface values without either:

1. promoting the value to `@taliya/tokens`;
2. mapping it to an existing foundation token; or
3. documenting why it is a justified component-specific token.
