# Image 32 finance drawer diagnostic - 2026-07-11

Source: `32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png`

Story: `crm-image-coverage-financeiro--image-32-financeiro-drawer-cobranca`

## Baseline

- Source and current render: `1672x941`.
- Mean RGB delta: `15.09`.
- Different-pixel ratio: `9.05%`.
- The page reused the official finance overview and `PaymentDrawer`, but the default `FinanceQueueGrid` minimum card width collapsed the source 4x2 queue layout to three columns and three rows when drawer space was reserved.
- The third queue row extended below the viewport and contradicted the canonical selected-payment state.

## Accepted reusable changes

- Added `FinanceQueueGrid density="compact"` as an official package API for drawer-reserved dashboards.
- Added governed token `layout.crm-payment-case-card.compact-width` at `260px`; the default `350px` card-width contract remains unchanged.
- The finance story selects compact density only when a drawer is present, preserving the image 30 overview composition.
- Added CRM class-contract coverage and token-value coverage.

## Evidence progression

- Baseline canonical capture: delta `15.09390015711678`, different pixels `9.045782507665164%`, with a 3-column queue grid.
- Rejected `270px` compact-width probe: `tmp/visual-audit/image32-compact-grid-20260711`; the grid remained at three columns because four tracks plus gaps exceeded the available width.
- Accepted structural candidate: `tmp/visual-audit/image32-compact-grid-260-20260711`; delta `15.51627417132339`, different pixels `9.328808810742924%`, with the canonical 4x2 queue structure restored.
- Image 30 regression capture: `tmp/visual-audit/image30-default-grid-regression-20260711`; delta `11.046186528295427`, different pixels `6.760724872755747%`, confirming the default no-drawer grid is unchanged.
- All focused captures are source-sized, populated, and passed runtime render inspection.

## Verdict

**Fail 1:1.** The source-critical 4x2 queue geometry is now represented through a reusable official density contract. The numerical pixel delta increased because compact cards reflow headings and metadata, while remaining gaps include shell/frame positioning, exact card columns and typography, drawer vertical content fit, and antialiasing. Retain the structurally correct candidate and refine only through package-owned finance-card, drawer, or shell contracts validated across images 30, 32, and their isolated stories.

## 2026-07-14 payment-drawer contract probe

- Fresh compiled-static baseline: `tmp/image32-baseline-20260714/report.json`, source/current `1672x941`, delta `15.520462892813136`, different pixels `9.33618160462503%`, current SHA-256 `749b1d71080011cf677cc0733277870e28c691c4c7b4736f72efd147fe071f6c`.
- The canonical drawer occupies `371x941` at `x=1301`, `y=0`; the current official drawer occupies `399px` from `x=1273` and starts at `y=57`, leaving its lower content clipped.
- This is a package-contract inconsistency: `component-source-map.md` already records the exact `371x941` extraction target, while `layout.crm-payment-drawer.width/height` still resolve to `399px/927px` and the finance overview story selects the non-viewport placement.
- Affected anatomy: shell main-content reservation, drawer edge, full-height header/body/footer containment, and the four-column finance queue's available width.
- Owner packages: `@taliya/tokens` for the canonical payment-drawer dimensions and `@taliya/crm`'s existing viewport placement contract, selected by the docs composition without local CSS.
- Smallest reusable probe: restore `371x941`, use `drawerPlacement="viewport"`, and compare Images 30, 32, and 34 before retaining the change.
- Accepted compiled-static candidate: `tmp/image32-payment-drawer-contract-static-20260714/report.json`, source/current `1672x941`, delta `15.376079648207563`, different pixels `9.425417834025698%`, current SHA-256 `4c25c09ba2cd9d00d2b672eca70fe3dac916f0b5c2122f6fbb8110294fcaff2f`; valid populated render with zero runtime errors. The drawer now occupies the canonical right edge from `x=1301`, starts at `y=0`, and keeps the complete action footer visible.
- Paired Image 30 evidence: `tmp/image30-regression-after-payment-drawer-contract-20260714/report.json` is bit-identical to its accepted baseline, delta `11.04549437549046`, different pixels `6.765682441055784%`, SHA-256 `cbb394fd0be3641c07a7c3376e6e4c0c4ebad73f03c55ed90f29a3d54ac88a0a`.
- Paired Image 34 evidence: `tmp/image34-regression-after-payment-drawer-contract-20260714/report.json` is bit-identical to the pre-probe baseline, delta `15.25308123819311`, different pixels `9.19894590112227%`, SHA-256 `26defa97df50766ea81b71e0d565a7f8274d0995ca7efa488390e4dee68e38e3`.
- Accepted decision: retain the official `371x941` tokens and viewport placement for the collection composition. The mean RGB delta improves from `15.520462892813136` to `15.376079648207563`; the different-pixel ratio increases slightly because the corrected full-height edge exposes more legitimate content rather than clipping it.
- Final verdict remains **failed 1:1**. This is the official semi-approved composition baseline; residuals remain in shell/frame rendering, finance-card typography and truncation, vertical queue density, icon/avatar rasterization and antialiasing.
