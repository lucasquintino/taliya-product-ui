# Image 37 sales pipeline diagnostic - 2026-07-11

Source: `37_round-4.1G_vendas_01_pipeline-kanban.png.png`

Story: `crm-image-coverage-vendas--image-37-vendas-pipeline-kanban`

## Baseline

- Source and current render: `1672x941`.
- Mean RGB delta: `13.70`.
- Different-pixel ratio: `9.47%`.
- The story used official `CrmKanbanPage`, `PageFilterBar`, `KanbanColumn`, and `PipelineCard` components, but every card relied on generic defaults and repeated the same lead identity.
- `PipelineCard` fixed the WhatsApp icon even when its source label represented another channel.
- The board compressed all lanes to the default `195px`, while the source uses wide commercial lanes and horizontal overflow.
- Search and creation actions lived inside the filter bar even though the source places actions in the page header and has a no-search filter surface.

## Accepted reusable changes

- Added `PipelineCard sourceIcon` with the official `IconName` contract.
- Added `KanbanBoard`/`CrmKanbanPage laneWidth="commercial"` and governed `layout.crm-kanban.commercial-column-width` at `253px`.
- Moved sales creation/export/task actions into official page-header actions.
- Configured the pipeline filter bar without search and exposed all source filters inline.
- Replaced placeholder cards with eighteen distinct canonical leads across six stages, including source, interest, next action, owner, state, and status data.
- Connected card selection, card menus, column menus, and add callbacks through package APIs.
- Corrected the active sales sidebar and canonical page subtitle.
- Added token, lane-class, source-icon, and callback test coverage.

## Evidence progression

- Baseline canonical capture: delta `13.70`, different pixels `9.47%`.
- Complete commercial pipeline: `tmp/visual-audit/image37-commercial-pipeline-20260711`; delta `13.58406701106936`, different pixels `9.588191326543584%`.
- The focused capture is source-sized, populated, and passed runtime render inspection with six wide stages, eighteen distinct cards, and horizontal overflow.

## Verdict

**Fail 1:1.** The pipeline now has canonical data and complete package-owned interaction anatomy instead of repeated placeholders. Remaining gaps include shell/title/filter vertical rhythm, exact lane width and clipping point, card typography and internal density, channel-symbol fidelity within the official icon set, lane surface tones, scrollbar placement, and antialiasing. Further changes must remain in `CrmKanbanPage`, `KanbanBoard`, `KanbanColumn`, `PipelineCard`, or governed tokens and be validated against financial and operational kanbans.

## 2026-07-14 commercial layout diagnostic

- Fresh compiled-static baseline: `tmp/image37-baseline-20260714/report.json`, source/current `1672x941`, delta `13.609987678112294`, different pixels `9.605924167001409%`, current SHA-256 `44b2387f3298ba6eb4c5a8503c08b3f4ab45b9baf0f3c0c63b283387518b7ca2`.
- Source/current geometry: source actions/filter/board begin near `y=155/216/301`; current begins near `y=128/185/270`. The existing official `pageHeaderRhythm="overview"` matches the approximately `30px` vertical displacement.
- The source filter and first lane align near `x=121/123`; current filter/board begin at `x=97`, and the first lane begins near `x=110` because the shared lane surface adds internal padding.
- The source uses visually separate stage surfaces around `267px` wide with approximately `12px` gaps and horizontal overflow. Current commercial tracks are `253px` inside a shared enclosing surface.
- Smallest reusable change: add `CrmKanbanPage layoutVariant="commercial"` with governed horizontal inset, select the existing `laneSurface="separate"`, promote the commercial track to `267px`, stretch separate commercial lanes to the board height, and select the existing overview page rhythm. No story-local wrapper, CSS or anatomy is permitted.
- Guardrail: finance and operational layouts must remain bit-identical because the new inset/height selectors are commercial-scoped; recapture Images 21, 33 and 37 from the same static bundle.

## 2026-07-14 accepted technical candidate

- Official composition: `CrmKanbanPage layoutVariant="commercial" pageHeaderRhythm="overview"`; the layout variant owns separate lane surfaces, commercial tracks and governed horizontal inset.
- Compiled-static evidence: `tmp/image37-commercial-layout-static-20260714/report.json`, source/current `1672x941`, delta `12.319421210256827`, different pixels `8.855678830929124%`, current SHA-256 `30110fbf27ffb91782665e1f3d4a2a42b33c52b18cc711ee56e51888f12ef63c`.
- The candidate improves the fresh baseline from delta `13.609987678112294` and `9.605924167001409%` different pixels. Title/actions, filter, board boundaries, lane start, lane width and horizontal clipping now closely follow the source.
- Cross-kanban static evidence from the same bundle is bit-identical: operational Image 21 SHA-256 `1e5123b5ab55e25516427e3a170582a6f8d88f6cca0df584d82fae730ca0fbe2` (`tmp/image21-regression-after-image37-commercial-20260714/report.json`) and finance Image 33 SHA-256 `cb67fbf6e3c3b56cba8338689492b963531e928a18b6a97d2a5ebbb98b8b4173` (`tmp/image33-regression-after-image37-commercial-20260714/report.json`).
- The public variant is covered by CRM tests and governed tokens; the coverage story still supplies only navigation, filters, actions, columns, cards and callbacks.

**Technical verdict: Semi-approved, still Fail 1:1.** Official commercial-kanban geometry and ownership are accepted. Product review remains open for exact stage surface tones, card typography/internal density, channel-icon artwork, scrollbar treatment, shadows and antialiasing.
