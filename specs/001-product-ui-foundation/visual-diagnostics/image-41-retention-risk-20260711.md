# Image 41 retention risk diagnostic - 2026-07-11

Source: `41_round-4.1H_retencao_01_riscos-lista-drawer.png.png`

Story: `crm-image-coverage-retencao--image-41-retencao-riscos`

## Assessment

- Source/current dimensions: `1448x1086`.
- Mean RGB delta: `15.43794628707795`; different pixels: `9.029702189974018%`.
- The story uses official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and `CaseDrawer` anatomy with canonical risk rows, facts, history, and suggestion.
- Row selection now flows through `onRowSelect`/`selectedRowId`; drawer commands flow through `CaseDrawer.onAction`.
- No local markup, CSS, wrapper, or visual variant was added.

## Verdict

**Fail 1:1.** The family contract is mature and feature-complete. Remaining gaps are shared shell/filter/table rhythm, repeated avatars, typography, icon weight, drawer spacing, and antialiasing. Reopen only through reusable official contracts validated across Images 41-44.

## Reopened family geometry diagnostic - 2026-07-14

- Correct source/current dimensions are `1672x941`, not `1448x1086`. Current compiled-static baseline: `tmp/image41-retention-family-baseline-20260714/report.json`; delta `15.44301656590515`, different pixels `9.036566515312531%`, SHA-256 `4acff644cb952e7fab347777f372fa4585bb960c2188941289c63c360aee6739`.
- Filter and table boundaries already align closely with source; applying the Sales stacked-header rhythm would move both away from the canonical geometry.
- Source drawer is a wide summary rail at approximately `x=1229`, `y=121`, width `425px`, with a right gutter. Current drawer is `403px` wide and starts at `y=0` because a global `CaseDrawer` shell rule overrides the requested floating placement.
- Smallest family hypothesis: preserve current page rhythm; make shell placement authoritative; select floating placement plus an official wide `CaseDrawer` width for summary drawers. Validate against Images 22 and 42-44.

## Final family result - 2026-07-14

- Accepted official contract: `CrmProductShell` placement is authoritative; this story uses floating placement and `CaseDrawer widthVariant="wide"`, governed by the shared `425px` token. No page rhythm or story-local CSS changed.
- Final compiled-static evidence: `tmp/image41-retention-drawer-final-static-20260714/report.json`; source/current `1672x941`, mean RGB delta `15.355387308964131` (baseline `15.44301656590515`), different pixels `9.049723138878013%`, current SHA-256 `3665770e68b0dab9e65dc624608a205daafb7b2c539096c0d8f0aa4e574e1706`.
- Cross-family guard: Image 22 also improved with explicit viewport placement; Images 42-44 use the same authoritative shell contract.

**Final verdict: failed 1:1; semi-approved composition baseline.** The drawer is now in the correct structural family and mean delta improved. Residual typography, icon/avatar rasterization, shell texture and edge antialiasing require product review or a new reusable cross-image hypothesis.
