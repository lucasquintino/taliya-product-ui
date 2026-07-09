# Contract: Tokens

## Source Of Truth

`token-system-v1.md` is the current implementation target for tokens.

`token-values-v0.md` remains historical extraction input from the initial approved token board. Future implementation should not treat v0 as complete enough to build the full primitive library.

## Token Categories

Required P0 categories:

- raw color;
- semantic color;
- surface;
- status color;
- operational state aliases;
- quota thresholds;
- typography;
- spacing;
- radius;
- border;
- shadow/elevation;
- focus;
- motion;
- density.
- connector/flow tokens;
- chart tokens;
- component/density tokens for controls, tables, lists, drawers, modals, avatars, and icons.

## Naming Rules

Use layered names:

```text
--taliya-raw-black-900
--taliya-surface-panel
--taliya-color-text-primary
--taliya-color-border-subtle
--taliya-status-danger-bg
--taliya-control-height-md
--taliya-radius-panel
--taliya-space-4
```

Component/density tokens are allowed when they define repeated primitive anatomy such as field height, table row height, drawer width, icon button size, avatar size, or connector width.

Avoid domain-specific tokens such as `student-risk-red`, `billing-card-bg`, or `pilates-plan-blue`.

## Required Outputs

The token package should eventually expose:

- CSS variables;
- typed token references;
- status semantic map;
- operational state aliases;
- quota threshold map;
- chart palette map;
- connector token map;
- component density token map;
- documentation stories/examples.

## Initial Visual Direction

The first theme is light, cool, premium, low-noise, work-focused, with:

- soft light surfaces;
- black selected/focus UI;
- blue functional accent;
- red/danger accent;
- status colors expanded carefully beyond the original token board;
- circular icon controls;
- high-radius panels/cards consistent with approved CRM screens.

## Required Layering

Tokens must be implemented in this order:

1. raw tokens;
2. semantic tokens;
3. component/density tokens;
4. component CSS usage.

Components should consume semantic/component tokens rather than hardcoding raw values.

## Mandatory Primitive Gate

Every implementation batch must start with token extraction before component code:

1. open the approved source image for the target component;
2. list the component anatomy values: dimensions, spacing, radius, border, shadow, surface, typography, icon sizing, state colors, motion offsets, and density;
3. reuse existing tokens when the value is already canonical;
4. promote the value to `@taliya/tokens` when it is a reusable primitive rule or appears in more than one component/state;
5. document the token in `Foundations / Tokens` and this spec before accepting the component;
6. only then implement or adjust the primitive/component CSS.

No new primitive, composed CRM component, or image-clone story is accepted when it depends on one-off visual values that should be tokens. Structural CSS values such as `0`, `100%`, `auto`, SVG coordinates, and accessibility-only clipping may remain local CSS.

## Acceptance

- P0 components consume token values rather than one-off styling.
- `Foundations / Tokens` is the required visual-value review surface before primitives are accepted.
- Any approved-image visual value missing from tokens blocks primitive implementation until it is added and documented.
- Existing primitives must be audited periodically for hardcoded reusable values and normalized back into tokens before new batches continue.
- Status tokens include text/icon usage guidance.
- Focus tokens are visible on all interactive surfaces.
- Tokens do not encode Pilates-specific text or domain meaning.
- Images 01 and 07-15 can be reconstructed without inventing new visual values during component implementation.
