# Image 42 cancellation queue diagnostic - 2026-07-11

Source: `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png`

Story: `crm-image-coverage-retencao--image-42-cancelamentos-fila`

## Assessment

- Source/current dimensions: `1448x1086`.
- Mean RGB delta: `13.705164938721065`; different pixels: `8.219584682893592%`.
- Official worklist/filter/quick-filter/table/`CaseDrawer` composition already owns the cancellation queue, impact/deadline data, salvage steps, history, and footer commands.
- Selection and every drawer command are now connected through package callbacks.
- No story-local anatomy or styling was introduced.

## Verdict

**Fail 1:1.** Structurally mature and feature-complete. Remaining gaps are shared frame density, avatar fidelity, typography, chip/icon geometry, drawer spacing, footer sizing, and antialiasing. Reopen only through reusable official contracts validated across Images 41-44.

## Reopened family geometry diagnostic - 2026-07-14

- Correct source/current dimensions are `1672x941`. Current compiled-static baseline: `tmp/image42-retention-family-baseline-20260714/report.json`; delta `13.714730079473634`, different pixels `8.228355765270582%`, SHA-256 `64d9de842e567fab70c649017fa3ee39fb36f5920d044d075c8d3d31e62c3a88`.
- Source and current filter/table vertical boundaries are already close. Source drawer uses the standard `~403px` width, starts immediately below browser chrome (`y~59`), keeps the shared right gutter, and ends above the viewport bottom.
- Current drawer starts at `y=0` because the global `CaseDrawer` override collapses shell placement modes.
- Smallest family hypothesis: add a reusable `chrome` shell placement using existing chrome-top/right/bottom tokens, preserve standard drawer width, and validate jointly with Images 22 and 41/43/44.

## Final family result - 2026-07-14

- Accepted official contract: this story uses `drawerPlacement="chrome"` with the standard `CaseDrawer` width. The shared shell owns chrome-top/right/bottom gutters and z-index; no story-local positioning or page rhythm change was introduced.
- Final compiled-static evidence: `tmp/image42-retention-drawer-final-static-20260714/report.json`; source/current `1672x941`, mean RGB delta `13.69804129442532` (baseline `13.714730079473634`), different pixels `8.310918345036585%`, current SHA-256 `50edbe425d87b77fa0c14b3ba2652f123146549552e411a5d6e340fa5b2e36d7`.
- Cross-family guard: Image 22 improved with viewport placement and Images 41/43/44 improved in mean delta under the same authoritative shell contract.

**Final verdict: failed 1:1; semi-approved composition baseline.** The standard long queue drawer now follows the source structural placement. The small different-pixel ratio increase is a shifted canonical edge, while mean delta improved; product review remains required.
