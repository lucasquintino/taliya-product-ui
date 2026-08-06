# Dashboard drawer regional diagnostic - 2026-08-05

## Scope

This diagnostic compares the active single-geometry drawer contract with the
current `/app/uso` and `/app/billing` Storybook compositions before any fix.
The route contract, rather than historical image-specific placement, is the
acceptance authority.

## Reproduced mismatch

At `1280x720`, `crm-image-coverage-usage--image-68-uso-visao-geral` renders
`UsageDrawer` inside the `CrmRightPanelPage.panel` region:

- computed position: `static`;
- bounds: `x=880.20`, `y=179`, `width=356.80`, `height=720`;
- computed bottom: `899`, outside the `720px` viewport;
- nested landmarks: `complementary "Painel lateral"` contains
  `complementary "Agente de suporte de uso"`.

Evidence:
`specs/005-joint-product-certification/visual-diagnostics/evidence/dashboard-family-live-20260805/01-usage-contained-drawer.png`.

The same source pattern is used by Billing subscription, invoices and add-ons:
`BillingSupportDrawer` returns `UsageDrawer`, then passes it to the inline
`panel` slot.

## Contract conflict

`drawer-standard-contract.md` and `drawer-lifecycle-contract.md` require every
CRM/Internal drawer to be a direct shell drawer with fixed-right, top/bottom
zero, dynamic viewport height and the single official medium width. Page-family
APIs must not expose placement or inline drawer variants.

`CrmRightPanelPage` currently exposes `panelPlacement?: "inline" | "drawer"`.
Its default is `inline`, so a domain drawer can silently become a contained
assistant rail. This is the architectural cause, not a story-only CSS delta.

## Ownership and smallest correction

Owner: `@taliya/crm` (`CrmRightPanelPage`, `CrmProductShell`, `CrmDrawer`).

The minimal contract correction is:

1. remove the public `panelPlacement` variant;
2. keep `panel` exclusively for non-drawer assistant rails;
3. pass domain drawers through the inherited canonical `drawer` slot;
4. collapse the inline panel region when no assistant panel exists;
5. migrate Usage, Billing and Agent flow pages to that single composition;
6. make `drawer-lifecycle:audit` reject `panelPlacement` and domain drawers in
   the `panel` slot.

No new token is needed. The canonical shell and drawer geometry tokens already
exist and are passing their token governance checks.

## Probe hypotheses

- Accepted hypothesis: shell drawer placement plus a collapsed right-panel
  layout yields one fixed, full-height drawer and one main content region.
- Rejected hypothesis: adding more nested CSS to force a drawer-shaped inline
  panel preserves two competing geometries and leaves the forbidden public
  placement API intact.

