# Image 45 reports management diagnostic - 2026-07-11

Source: `45_round-4.1I_relatorios_01_visao-gestao.png.png`

Story: `crm-image-coverage-relatorios--reports-management`

## Assessment

- Source/current dimensions: `1672x941`.
- Baseline delta: `11.133562186550328`; baseline different pixels: `6.503757582537156%`.
- Final delta: `11.287789594021765`; final different pixels: `6.59648953317503%`.
- The story uses official `CrmDashboardPage`, `ReportFilterBar`, `ChartPanel`, `ExportAction`, and button primitives; no dashboard grid/card anatomy is local.
- Restored the seven canonical report destinations shared with Image 46: Visao geral, Semana, Financeiro, Vendas, Ocupacao, Risco, and Exportacoes.
- Connected filter/header exports, report scheduling, and every chart-card action through official callbacks.
- Updated the dashboard-family gate to protect current official domain wrappers and tolerate package-component props; its negative regression probe passes.

## Verdict

**Fail 1:1.** The dashboard family is structurally mature and feature-complete. The small metric increase is accepted because the missing canonical navigation was a real structural defect. Remaining gaps are page/header vertical rhythm, exact report-card spans and heights, typography, icon geometry, card internal density, and antialiasing. Reopen only through official dashboard, chart, shell, or token contracts validated against other dashboards.

## Reopened reports-grid diagnostic - 2026-07-14

- Fresh compiled-static baseline: `tmp/image45-baseline-static-20260714/report.json`; source/current `1672x941`, mean RGB delta `11.291215188972334`, different pixels `6.599095434460947%`, current SHA-256 `3333a4272438f7ed5810e06a999198c024809a764029a1cdcacba0c2b1b20e04`.
- Source and current both use the official 3/2/3 reports grid. The current grid starts immediately after the 49px filter bar because `CrmDashboardPage` only activates its official stack for `after`/custom stack-class content, not for a lone `before` slot. Image 46 has the same missing filter-to-grid gap.
- Source row heights are approximately `222px 206px 190px`; current `columns="reports"` forces all eight cards to `210px`. The resulting bottom edge happens to match only because the missing gap offsets the wrong tracks.
- Smallest cross-image hypothesis: make the existing dashboard stack authoritative whenever `before` is present and govern reports row tracks with a single semantic token. Preserve the existing card spans and story composition; do not add report-page CSS or alter unrelated dashboard modes.

## Reports-grid result and remaining anatomy

- Compiled-static result: `tmp/image45-reports-tracks-static-20260714/report.json`; delta improved to `10.498653193945156` and different pixels to `6.274692503648262%`, SHA-256 `f6e8017c8e59bb8316a1b8c28deaab97c60edfa1ad856e3a0b75e7e444b4e25e`.
- Paired Image 46 regression also improved: `tmp/image46-regression-after-reports-stack-retry-20260714/report.json`; delta `17.09597460643534` from `17.31315975470854`, different pixels `9.709962168978563%` from `9.904329211243543%`.
- Visual inspection retains one structural blocker before semi-approval: source bottom-row cards have three distinct package-worthy bodies (summary rows, export queue rows and recommendation copy), while current composition still renders the generic metric body in all three.
- Next smallest hypothesis: add data-driven official `ChartPanel` layouts for `summary`, `exports` and `recommendation`; preserve the common header/footer/callback frame and keep all variant markup inside `@taliya/crm`.

## Final reports result - 2026-07-14

- Accepted official anatomy: `CrmDashboardPage` activates its stack for `before`, `DashboardGrid columns="reports"` uses governed `222px 206px 190px` tracks, and `ChartPanel` owns data-driven `metric`, `summary`, `exports` and `recommendation` layouts.
- Final compiled-static evidence: `tmp/image45-report-variants-static-20260714/report.json`; source/current `1672x941`, mean RGB delta `10.218518805709085`, different pixels `5.9916662005705015%`, current SHA-256 `0f895a4154d63fdcf19917d00cc8ee01a0a125584af3da1159fea750418b2dbe`.
- Paired Image 46 evidence `tmp/image46-regression-after-report-variants-20260714/report.json` remained bit-identical to the improved stack capture at delta `17.09597460643534`, different pixels `9.709962168978563%`, SHA-256 `d0dbf093d31635083dd073ae3f8903e9663c385677c19195746ebdc6daa4f3eb`.

## Reports header regression result - 2026-07-14

- Added the official `CrmProductShell pageHeaderRhythm="reports"` shared by Images 45 and 46. Final compiled-static evidence `tmp/image45-regression-after-opportunity-final-20260714/report.json` improved delta `10.218518805709085 -> 10.007245253022422` and different pixels `5.9916662005705015% -> 5.8627694247695365%`; current SHA-256 `f183d8cc38f5163e0582be86198adf5631f0626adb37766d4ae31aec17297c47`.
- Status remains semi-approved and explicit failed 1:1. The source still shows a richer report-filter row than the current official `ReportFilterBar`; this difference must be solved in that official component/data contract, not with page-local markup.

**Final verdict: failed 1:1; semi-approved composition baseline.** Official 3/2/3 structure, row heights, filter gap, four report-card layouts and callbacks now follow the source without story-local anatomy. Residual differences remain in shell/header alignment, canvas width, typography, icons/avatar and antialiasing; product review must decide whether to accept the baseline.
