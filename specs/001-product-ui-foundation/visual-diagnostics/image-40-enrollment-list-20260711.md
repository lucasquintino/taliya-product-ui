# Image 40 enrollment list diagnostic - 2026-07-11

Source: `40_round-4.1G_matriculas_01_checklist-conversao.png.png`

Story: `crm-image-coverage-vendas--image-40-matriculas-checklist-conversao`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `13.34213190480551`.
- Different-pixel ratio: `8.162144012698025%`.
- Source and story share the same worklist anatomy, quick queues, eight enrollment records, selected row, checklist drawer, history, notices, and action grid.
- The story already composed only official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and `LeadDrawer` components.
- Selection and drawer actions were visually present but fixed instead of flowing through consumer callbacks.

## Accepted reusable changes

- Connected enrollment row selection through `CrmWorklistTable.onRowSelect` and `selectedRowId`.
- Connected all enrollment drawer commands through `LeadDrawer.onAction`.
- Preserved the official stacked filters, quick rail, table schema, compact checklist drawer, canonical records, disabled conversion command, and pagination.
- Added no local markup, CSS, page wrapper, or visual variant because the existing worklist family already owns the required anatomy.

## Evidence

- Focused capture: `tmp/visual-audit/image40-enrollment-list-20260711`.
- Mean RGB delta: `13.34213190480551`.
- Different-pixel ratio: `8.162144012698025%`.
- Capture is source-sized, dimension-matched, populated, and passed runtime render inspection.
- Pixel metrics remained stable because the accepted change completed behavior without changing the default rendered state.

## Verdict

**Fail 1:1.** Image 40 is structurally mature and feature-complete on the official worklist family. Remaining gaps are shell/title rhythm, exact filter/table density, avatar fidelity, icon optical weight, drawer typography and wrapping, footer dimensions, and antialiasing. Reopen only through reusable official worklist, table, drawer, shell, icon, avatar, or token contracts validated against sibling pages.

## Reopened geometry diagnostic - 2026-07-14

- Current compiled-static baseline: `tmp/image40-regression-after-image39-comfortable-20260714/report.json`.
- Mean RGB delta: `13.346945809549974`; different-pixel ratio: `8.17295463101452%`; current SHA-256: `982a18ec746b795318f7d857e6e6e7032254bffb53035e38f6447f845ca25032`.
- Source title/subtitle are stacked; current title/subtitle are inline. The official `compact-stacked` page-header rhythm is already validated by Images 38 and 39.
- Source filter begins near `y=200` and ends near `y=328`; current begins near `y=185` and ends near `y=307`. Source table/quick-filter rail begins near `y=347`; current begins near `y=316`.
- The stacked header predicts a `~16px` downward correction. The official `spacious` worklist filter gap adds `10px`, predicting the table near `y=342`, within `~5px` of source while preserving the existing filter anatomy.
- Unlike Image 39, this source filter is only about `6px` taller than the current standard filter. Applying the `comfortable` density would add `14px` and overshoot the table boundary, so the smallest probe intentionally keeps standard density.
- Owner package: existing `@taliya/crm` page rhythm props; `apps/docs` selects only those props. No token, component anatomy, drawer, table, or story CSS change is justified by this probe.

## Accepted static result - 2026-07-14

- Final compiled-static evidence: `tmp/image40-stacked-worklist-static-20260714/report.json`.
- Mean RGB delta improved from `13.346945809549974` to `12.358250112769587`; different-pixel ratio improved from `8.17295463101452%` to `7.641072209843005%`.
- Final current SHA-256: `27a6e43f5c215f71a98d8af017c7565cb5f3c2cadd049f4a467d43355828b4c5`; source/current remain `1448x1086`; render inspection is valid and populated.
- Accepted change is limited to `CrmWorklistPage pageHeaderRhythm="compact-stacked"` and `worklistFilterRhythm="spacious"`. Standard `PageFilterBar` density is intentionally preserved; no new token, component variant, local anatomy, or CSS was added.
- Paired regressions are bit-identical: Image 38 kept SHA-256 `e509466327000957ebcca777bb1638008b32de9c19557d26cfc20c38bb81c10a`; Image 39 kept SHA-256 `09c8d2702f4a0500c1a1f7633ac07aed7a0b5135bcfcb9efc710f2093a809cc5`.
- Verdict remains explicit **Fail 1:1 / semi-approved**. Residual differences are outer frame, avatar/icon rasterization, table/drawer microtypography, drawer spacing/footer dimensions, and antialiasing. Product review must decide whether to accept this baseline.
