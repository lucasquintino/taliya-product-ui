# Drawer Standard Contract

Date: 2026-08-04

Status: active product decision

## Decision

All CRM and Internal drawers use one outer geometry:

- fixed to the right viewport edge;
- `top: 0` and `bottom: 0`;
- `100dvh` through `--taliya-layout-viewport-dynamic-height`;
- `--taliya-control-drawer-width-md` width, capped at the viewport;
- full viewport width at the mobile breakpoint;
- shell main content and topbar reserve the same official width.

The public APIs of `Drawer`, `CrmDrawer`, `CrmProductShell`, page-family wrappers, and domain drawers must not expose placement, side, inline, compact-width, wide-width, or outer-size props.

Domain drawers may vary data, facts, sections, actions, callbacks, lifecycle states, and internal content density. Those differences never change outer position, height, or width.

## Supersession

This decision supersedes historical image-specific drawer geometry recorded as `fixed`, `content`, `floating`, `chrome`, `viewport`, compact, or wide. Those captures remain evidence for inner anatomy and content, not for current outer geometry.

## Enforcement

`pnpm drawer-lifecycle:audit --check` must reject forbidden API/story/CSS markers and require the canonical geometry markers in `@taliya/ui` and `@taliya/crm`.
