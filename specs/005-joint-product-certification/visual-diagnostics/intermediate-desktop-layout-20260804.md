# Intermediate Desktop Layout Diagnostic

Date: 2026-08-04

Viewport: `1440x900`.

Scope: official structural families rendered by `CrmProductShell`,
`RightPanelLayout`, `SetupShell`, and `AccessShell`.

## Evidence

| Family | Evidence | Failure |
| --- | --- | --- |
| Card catalog / hub grid | `evidence/family-03-card-catalog-20260804.png` | Product navigation reaches the global action region. |
| Config / form with right assistant rail | `evidence/family-10-config-20260804.png` | Fixed main/rail columns crowd the top navigation and clip the assistant rail. |
| Setup wizard / onboarding shell | `evidence/family-11-setup-20260804.png` | Fixed setup columns compress the embedded agent rail until its title and body are clipped. |
| Flow / automation editor | `evidence/family-12-flow-20260804.png` | The fixed right-panel width produces visible main/rail collision. |
| Access / subscription shell | `evidence/family-13-access-20260804.png` | The 1528px product window overflows horizontally and clips the contextual rail. |

These screenshots were captured from the current static Storybook at
`1440x900` and inspected together with their DOM structure. The failures occur
at a standard desktop width, before the existing `980px` stacked breakpoint.

## Ownership

- `@taliya/crm/CrmProductShell`: reserve a bounded, scrollable navigation
  region between the shell start and global actions.
- `@taliya/crm/RightPanelLayout`: allow main and rail tracks to shrink inside
  the available product-shell content width.
- `@taliya/crm/SetupShell`: use fluid intermediate desktop tracks and scale the
  embedded source-sized agent panel to its assigned rail.
- `@taliya/crm/AccessShell` and `ProductWindowFrame`: constrain the framed
  access workspace to the viewport and make content/rail widths fluid.

## Smallest Change

- Add one official intermediate desktop breakpoint from `981px` through
  `1500px` in CRM CSS.
- Preserve current fixed source dimensions above `1500px` and the existing
  stacked/mobile behavior at `980px` and below.
- Do not change story markup, add docs-local CSS, or create route-specific
  variants.
- Rebuild Storybook and recapture every affected family at the same viewport.

## Resolution Evidence

- `evidence/family-03-card-catalog-after-20260804.png`
- `evidence/family-10-config-after-20260804.png`
- `evidence/family-11-setup-after-20260804.png`
- `evidence/family-12-flow-desktop-final-20260804.png`
- `evidence/family-13-access-after-20260804.png`
- `evidence/family-12-flow-tablet-viewport-20260804.png`
- `evidence/family-12-flow-mobile-20260804.png`
- `evidence/family-12-flow-mobile-closed-20260804.png`

At `1440x900`, all affected family roots have `scrollWidth <= clientWidth`.
The product navigation now exposes the full final `Relatorios` item without
scroll clipping. At `1024x900`, the Agent mode panel, flow builder, and settings
panel are vertically separated and horizontally contained. At `390x844`, the
drawer occupies the full viewport; when closed, every Agent flow panel has
equal client and scroll width, while the shell body scrolls vertically from a
787px viewport through 1931px of content.

Status: resolved (`JPC-011`, P1). The static Storybook build, CRM tests,
typecheck, and responsive browser checks pass.
