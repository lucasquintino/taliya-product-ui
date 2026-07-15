# Image 50 internal tenant detail diagnostic - 2026-07-14

Source: `50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png`

Story: `crm-image-coverage-internal--image-50-internal-tenant-detalhe-usuarios-grants`

## Baseline

- Source/current dimensions: `1536x1024`.
- Current-cycle sentinel before the accepted refinement: `tmp/image50-sentinel-after-image49-final-20260714/report.json`.
- Baseline delta: `15.415630340576172`; baseline different pixels: `8.513895670572918%`; SHA-256: `0ef5ec53103d3e5a7e5e21d87e2c7dd7238d4d1a09e3d39aa65b89992e0002de`.
- `TenantDetailLayout` already owned the main tenant-detail anatomy and `SecurityRulePanel`; the story did not need a second shell drawer.

## Accepted reusable change

- Added the official `CrmProductShell` content layout `internal-tenant-detail`, used through `InternalShell` with the canonical tenant URL and the page-header region disabled.
- Kept tenant header, summary, tabs, users, entitlements, support, grants, incidents, audit and security rail inside `TenantDetailLayout` and `SecurityRulePanel`.
- Added the package-owned user-column header and optional `TenantDetailLayout.footerNote`, whose default renders the source security/audit note.
- Added tokenized browser chrome, topbar, content inset, main-grid, row-density, security-track and footer geometry.
- Added no story-local CSS or tenant-page anatomy.

## Final evidence

- Compiled-static report: `tmp/image50-internal-detail-final-rows-20260714/report.json`.
- Final delta: `11.384433958265516`; different pixels: `6.966400146484375%`; SHA-256: `f210ba3b584aa7b4ca4f981bde729104b865b24393a3a51baa4249e939b48734`.
- Exact source-level axes in the rendered DOM: layout `x=94 y=100 w=1432 h=840`; main `x=94 y=100 w=1071 h=840`; security rail `x=1180 y=100 w=346 h=838`; audit `x=105 y=775 w=1049 h=150`; footer `x=94 y=988 w=1432 h=15`.
- Security sections: header `316x54`, facts `316x145`, warning/info `316x58`, copilot `316x149`, actions `316x226`.
- Document client and scroll dimensions are both `1536x1024`; there is no overflow.
- Image 49 regression `tmp/image49-regression-after-image50-rows-20260714/report.json` and Image 48 regression `tmp/image48-regression-after-image50-rows-20260714/report.json` remained bit-identical to their accepted baselines.

## Verdict

**Semi-approved, explicit failed 1:1.** The official page owns the correct single-panel anatomy and exact macro geometry, and both comparison metrics improved materially. Residual differences remain in microdensity, typography, icons/avatar rasterization, surfaces and antialiasing. Product review must decide whether to accept this reusable baseline. Real `taliya-internal` adoption remains a separate installed-package/runtime gate.
