# Image 39 experimental list diagnostic - 2026-07-11

Source: `39_round-4.1G_experimental_01_lista-acompanhamento.png.png`

Story: `crm-image-coverage-vendas--image-39-experimental-lista`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `14.684142349134643`.
- Different-pixel ratio: `9.08670624624808%`.
- The source and story share the same worklist anatomy, quick queues, eight table records, selected row, compact detail drawer, history, notices, and action grid.
- The story already composed only official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and `LeadDrawer` components.
- Selection and drawer actions were visually present but not connected through page state and package callbacks.

## Accepted reusable changes

- Connected experimental row selection through `CrmWorklistTable.onRowSelect` and `selectedRowId`.
- Connected every `LeadDrawer` domain action through its official `onAction` callback.
- Preserved the official stacked filter bar, quick-filter rail, table schema, compact drawer, and canonical data.
- Added no story-local markup, CSS, visual variant, or package abstraction because the existing family already owns the required anatomy.

## Evidence

- Focused capture: `tmp/visual-audit/image39-experimental-list-20260711`.
- Mean RGB delta: `14.684142349134643`.
- Different-pixel ratio: `9.08670624624808%`.
- The capture is source-sized, dimension-matched, populated, and passed runtime render inspection.
- Pixel metrics remained stable because the accepted change completed behavior without changing the rendered default state.

## Verdict

**Fail 1:1.** Image 39 is structurally mature and feature-complete on the official worklist family. Remaining gaps are shell/title rhythm, exact filter and table density, repeated avatar fidelity, icon optical weight, drawer typography and wrapping, footer sizing, and antialiasing. Reopen only through reusable official worklist, table, drawer, shell, icon, avatar, or token contracts validated against sibling pages.

## Reopened geometry diagnostic - 2026-07-14

- Static baseline: `tmp/image39-regression-after-image38-rhythm-20260714`.
- Mean RGB delta: `14.689933025039936`; different-pixel ratio: `9.097962007671724%`; current SHA-256: `cf0d0a...`.
- The source stacks title and subtitle; the current story still renders them inline. The official `compact-stacked` page-header rhythm already validated by Image 38 is the smallest shared correction.
- Source filter bounds are approximately `y=199..335` (`136px`); current bounds are approximately `y=185..307` (`122px`). The two-row anatomy and controls already match, so the missing height belongs to a reusable comfortable density of the official stacked `PageFilterBar`, not story-local markup.
- Source table/quick-filter rail begins near `y=352`; current begins near `y=316`. Combining the stacked header, a `14px` taller filter surface, and the official `spacious` worklist filter gap predicts a start near `y=356`, within the measurement tolerance and without changing sibling defaults.
- Owner packages: `@taliya/tokens` for governed vertical padding; `@taliya/crm` for the public density variant and existing worklist rhythms; `apps/docs` only selects those official props.
- Probe hypothesis: promote `density="comfortable"` with `19px` block padding (`+7px` per edge over the standard `12px`), then apply `pageHeaderRhythm="compact-stacked"` and `worklistFilterRhythm="spacious"` only to the experimental page.
- Guardrail: do not alter the shared drawer. Its remaining vertical and typography differences recur across domains and require a separate family-wide diagnostic.

## Accepted static result - 2026-07-14

- Final compiled-static evidence: `tmp/image39-comfortable-filter-static-20260714/report.json`.
- Mean RGB delta improved from `14.689933025039936` to `13.544092484627726`; different-pixel ratio improved from `9.097962007671724%` to `8.559529623637863%`.
- Final current SHA-256: `09c8d2702f4a0500c1a1f7633ac07aed7a0b5135bcfcb9efc710f2093a809cc5`; source/current dimensions remain `1448x1086`; runtime inspection is valid and populated.
- Accepted official changes: `PageFilterBar density="comfortable"`, `CrmWorklistPage pageHeaderRhythm="compact-stacked"`, and `worklistFilterRhythm="spacious"`. No story-local anatomy or CSS was added.
- Paired regression evidence is bit-identical: Image 38 kept SHA-256 `e509466327000957ebcca777bb1638008b32de9c19557d26cfc20c38bb81c10a`; Image 40 kept SHA-256 `982a18ec746b795318f7d857e6e6e7032254bffb53035e38f6447f845ca25032`.
- Verdict remains explicit **Fail 1:1 / semi-approved**. Remaining differences are outer frame, avatar/icon rasterization, table and drawer microtypography, drawer content rhythm/footer, and antialiasing. Product review must decide whether to accept this baseline; technical reopening requires a reusable cross-page hypothesis.
