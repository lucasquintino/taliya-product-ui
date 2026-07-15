# Image 46 money opportunities diagnostic - 2026-07-11

Source: `46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png`

Story: `crm-image-coverage-relatorios--money-on-the-table`

## Assessment

- Source/current dimensions: `1584x992`.
- Final mean RGB delta: `17.31315975470854`; different pixels: `9.904329211243543%`.
- The page uses official `CrmDashboardPage`, `PageFilterBar`, `OpportunityGroupCard`, and fixed `OpportunityPanel` contracts with six canonical opportunity groups.
- Restored the same seven canonical report destinations used by Image 45.
- Connected group opening, item selection, drawer commands, and drawer close through official callbacks.
- Added no story-local cards, grid, drawer anatomy, or CSS.

## Verdict

**Fail 1:1.** The page is structurally official and behaviorally complete, but its current fixed drawer consumes too much horizontal content area and the opportunity cards differ materially in row density, avatar treatment, text flow, lower-page fit, and footer completeness. Any refinement must be implemented in `CrmDashboardPage`, `OpportunityGroupCard`, `OpportunityPanel`, or governed tokens and validated together with Image 45 and other fixed-panel dashboards.

## Reopened geometry diagnostic - 2026-07-14

- Fresh compiled-static evidence after the shared reports stack: `tmp/image46-regression-after-report-variants-20260714/report.json`; source/current `1586x992`, mean RGB delta `17.09597460643534`, different pixels `9.709962168978563%`, SHA-256 `d0dbf093d31635083dd073ae3f8903e9663c385677c19195746ebdc6daa4f3eb`.
- Runtime geometry found `OpportunityPanel` omitted from the shell's base positioned-drawer selectors. It therefore remained a flex item, shrank from its governed `368px` width to `303.67px`, started at `y=0`, overflowed horizontally by `44px` and vertically by `55px`, and reduced the shell window to `1282.33px`.
- Source drawer is a floating `368px` panel near `x=1192`, `y=116`, with right/bottom gutters. Source main filter is near `x=102`, width `1075px`; source group rows form `208px`, `196px`, and `191px` tracks with `10px` gaps.
- Source filter is a two-row surface: search plus actions above, all quick/control filters plus advanced action below. Existing `PageFilterBar layout="stacked"` keeps quick filters in the top row, so a reusable all-filters-bottom stacked mode is required rather than story-local markup.
- Smallest cross-family hypothesis: add `CrmDashboardPage layoutVariant="opportunity"`, an official stacked-filters mode, positioned floating ownership for `OpportunityPanel`, governed opportunity tracks/card anatomy, and canonical prepared avatars. Image 45 must remain bit-identical.

## Final compiled-static result - 2026-07-14

- Promoted official `CrmProductShell pageHeaderRhythm="reports"`, `CrmDashboardPage layoutVariant="opportunity"`, `PageFilterBar layout="stacked-filters"`, opportunity dashboard tracks/gap/content padding, positioned `OpportunityPanel` ownership, source-derived floating offsets, and governed `OpportunityGroupCard` row anatomy. The story supplies only data, filters, callbacks, actions, and prepared avatars.
- Runtime geometry now has no page/card/drawer overflow: filter `x=102 y=190 width=1074 height=120`, grid `y=320` with `208px 196px 191px` rows and `10px` gaps, and drawer `x=1194 y=116 width=368 bottom=950`, matching the source composition axes within roughly two pixels.
- Final evidence: `tmp/image46-opportunity-final-static-20260714/report.json`; source/current `1586x992`, mean RGB delta `13.433268586692702` from `17.09597460643534`, different pixels `8.523039295448073%` from `9.709962168978563%`, current SHA-256 `0007f3961a56fca4e9dea734ef2151a944fdcfa416275cf7b0e6c823922218a5`.
- Paired Image 45 evidence improved rather than regressed: `tmp/image45-regression-after-opportunity-final-20260714/report.json`; delta `10.007245253022422` from `10.218518805709085`, different pixels `5.8627694247695365%` from `5.9916662005705015%`.

## Final verdict

**Semi-aprovada, explicit failed 1:1.** The official shell/filter/grid/drawer geometry is now source-like and reusable. Remaining differences are inside opportunity-row content density, badge/detail distribution, avatar coverage, typography/icons, and antialiasing. Reopen only through official `OpportunityGroupCard`, `OpportunityPanel`, report shell, typography, or icon contracts; do not add story-local anatomy/CSS.
