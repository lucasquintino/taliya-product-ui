# Image 70 execution receipt diagnostic - 2026-07-13

Source: `70_round-4.1P_execucoes_01_fluxo-falta-com-aviso-aprovado.png`

Story: `crm-image-coverage-agentes--image-70-execucoes-fluxo`

## Baseline

- Source/current dimensions: `1586x992`.
- Previous aggregate capture delta: `13.14`; different pixels: `7.75%`.
- The page used the official shell, receipt and drawer, but the story appended a second standalone `ExecutionTimeline` and forced a two-column dashboard grid.
- `ExecutionReceipt` already contained the canonical four-step real-event timeline, so the extra timeline duplicated product anatomy and displaced the decision, continuation and footer regions below the first viewport.

## Accepted reusable changes

- Kept `ExecutionReceipt` as the official execution-page owner instead of adding an empty wrapper.
- Removed the story-level `ExecutionTimeline` and `mainGridColumns={2}` composition.
- Connected the receipt action contract to story state.
- Added source-aligned breadcrumb, execution title, case context and status metadata through official header primitives.
- Removed duplicated case copy from the receipt summary because the page header and structured facts already own that context.
- Scoped compact receipt gaps and heading rhythm, and adjusted the receipt-specific timeline row-height token so summary, timeline, rationale, continuation and footer actions fit the source-sized first viewport.
- Updated dashboard-family, remaining-page, component-matrix and image-map ownership contracts.

## Evidence progression

- First corrected composition: delta `12.69870248240654`; different pixels: `7.754596672497255%`.
- Final official-owner capture: delta `12.800347504711928`; different pixels: `7.96771396900297%`.
- Final capture is source-sized, nonblank, passed runtime inspection and contains every source-required product region in the first viewport.

## Verdict

**Fail 1:1.** Official ownership, content regions, interaction callback and first-viewport fit are correct. The final pixel metric is evidence only and does not approve the page. Remaining gaps are browser/shell chrome, exact page and drawer offsets, typography, panel padding/height, timeline density, icon optical weight, borders, shadows and antialiasing. Refine only official shell, `ExecutionReceipt`, `AgentFlowDrawer`, primitives and tokens.

## Follow-up - 2026-07-15

- Added the page-scoped `CrmRightPanelPage rightPanelVariant="agent-execution"` contract instead of changing the default right-panel grid.
- Tokenized the source-backed `1007px` receipt track, `368px` drawer reserve and `-5px` layout offset; all required receipt regions remain in the first viewport.
- Final compiled-static evidence: `tmp/70-execution-variant-20260715/report.json`; source/current `1586x992`; mean RGB delta `12.804756674666775 -> 12.711934441483953`; different pixels `7.970510617093113% -> 7.953476487816784%`; current SHA-256 `ad092590d38100a5dc3a758deda28ec03f56502628063583daff9f87d7e7a995`; populated render with zero runtime errors.
- Regression sentinels remained bit-identical: Image 59 `75809345857c120f002587484c16363c72e71e579d3e77d85f5d76310a4511cd`, Image 53 `91fef6651914537635031272c6512d42175c79aa3a052a80f95a83b7407bc719`.

## Follow-up verdict

**Semi-approved, explicit failed 1:1.** The complete receipt, breadcrumb/meta, right-panel allocation and drawer composition now follow the source through public package contracts, with no story-local anatomy. Product review owns the remaining chrome, drawer offset/density, panel microspacing, typography, icon, border, shadow and antialiasing differences.
