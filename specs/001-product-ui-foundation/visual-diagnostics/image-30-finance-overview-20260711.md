# Image 30 finance overview diagnostic - 2026-07-11

Source: `30_round-4.1F_financeiro_01_visao-geral-filas.png.png`

Story: `crm-image-coverage-financeiro--image-30-visao-geral-filas`

## Current structure

- Source and current render: `1672x941`.
- Mean RGB delta: `11.05`.
- Different-pixel ratio: `6.76%`.
- The story uses official `CrmDashboardPage`, `PageFilterBar`, `FinancePriorityPanel`, `FinanceQueueGrid`, and `PaymentCaseCard` components.
- Finance filters, priority selection, case opening, and queue actions are supplied as data and callbacks.
- No story-local card, list, panel, table, or shell anatomy is required for this page.

## Review

- The canonical 4x2 queue structure, three-row priority panel, no-search filter bar, header actions, top navigation, and sidebar state are all represented.
- The current render is source-sized, populated, and passed runtime render inspection with zero render errors.
- Remaining differences are dominated by shared shell/frame geometry, vertical rhythm above the filter bar, card content density, typography, icon rendering, and antialiasing.
- Existing package contracts already express the page without a finance-only wrapper or story-local CSS, so no component promotion is justified by this image alone.
- Fresh final compiled-static evidence: `tmp/image30-baseline-after-image29-20260714/report.json`, source/current `1672x941`, mean RGB delta `11.04549437549046`, different pixels `6.765682441055784%`, current SHA-256 `cbb394fd0be3641c07a7c3376e6e4c0c4ebad73f03c55ed90f29a3d54ac88a0a`, valid populated render with zero runtime errors.
- Visual inspection confirms the source and current story share the filter origin, priority anatomy, 4x2 queue/card structure, complete rows/actions, and viewport fit. The source's narrower right boundary and tighter priority-to-grid gap are global/page-rhythm concerns rather than missing finance anatomy.

## Verdict

**Fail 1:1; semi-approved technical baseline.** Image 30 is structurally mature and fully composed from official components, but it is not pixel-certified. Residuals remain in the shared shell right boundary, priority-to-grid gap, card text truncation, typography, icons/avatar rasterization and antialiasing. Retain the current official composition and reopen only with a reusable cross-image hypothesis for shell rhythm or finance-card microdensity; do not add story-local anatomy or image-specific CSS.
