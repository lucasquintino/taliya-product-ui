# Image 38 sales list diagnostic - 2026-07-11

Source: `38_round-4.1G_vendas_02_lista-interessados.png.png`

Story: `crm-image-coverage-vendas--image-38-lista-interessados`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `14.52`.
- Different-pixel ratio: `8.62%`.
- The story already used the official worklist family, but its advanced-filter trigger had no advanced filter content.
- Row selection was not connected to the official table callback, and the sales sidebar selected a generic team destination instead of Vendas.
- The compact `LeadDrawer` was structurally complete and already close to the source.

## Accepted reusable changes

- Kept `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and compact `LeadDrawer` as the only page anatomy.
- Added official advanced Canal and Interesse filter contracts to the stacked `PageFilterBar` modal.
- Connected `SalesLeadTable` row selection and selected-row state through `CrmWorklistTable` public props.
- Connected `LeadDrawer` actions through its package callback.
- Corrected the active Vendas sidebar destination and canonical page subtitle.
- Preserved the existing distinct lead rows instead of introducing story-local table markup.

## Evidence progression

- Baseline canonical capture: delta `14.52`, different pixels `8.62%`.
- Focused capture: `tmp/visual-audit/image38-sales-list-20260711`; delta `14.419985314516921`, different pixels `8.587001312536248%`.
- The focused capture is source-sized, populated, dimension-matched, and passed runtime render inspection.

## Verdict

**Fail 1:1.** The list now has complete official filter, table-selection, and drawer-action contracts without local anatomy. Remaining gaps are primarily shell and filter rhythm, avatar fidelity, table microdensity, drawer text wrapping, icon optical weight, and antialiasing. Further changes must remain in the official worklist, table, drawer, filter, or token contracts and be checked against other table-family stories.

## 2026-07-14 stacked worklist diagnostic

- Fresh compiled-static baseline: `tmp/image38-baseline-20260714/report.json`, source/current `1448x1086`, delta `14.421397478031128`, different pixels `8.596349317786392%`, current SHA-256 `70acaa068dee5ea4737306db39635aa2f2efbe5e73f2a27d850bec673e462efa`.
- Source anatomy stacks title and subtitle; current default page header keeps them inline. Source title/filter begin near `y=140/198`; current begins near `y=130/185`.
- Source table/rail begins near `y=343`; current begins near `y=316`. The source gap after the two-row filter surface is approximately `19px`, while the default official list-detail gap is `8px`.
- Horizontal worklist geometry is already close: source/current rail and table begin around `x=86/260` and `x=84/258`; no rail or table-width change is justified.
- Smallest reusable change: select existing `pageHeaderRhythm="compact-stacked"` and add a package-owned `worklistFilterRhythm="spacious"` that changes only the official gap between filter region and list-detail layout. The story continues to provide filter data, rows, selection and drawer callbacks only.
- Guardrail: keep the shared floating drawer geometry unchanged in this probe; validate the new spacious gap on Images 38, 39 and 40 before broader use.

## 2026-07-14 accepted technical candidate

- Official composition: `CrmWorklistPage pageHeaderRhythm="compact-stacked" worklistFilterRhythm="spacious" worklistLayoutMode="compact-rail"`; no story-local CSS or wrapper was introduced.
- Compiled-static evidence: `tmp/image38-stacked-worklist-static-20260714/report.json`, source/current `1448x1086`, delta `13.893163958500791`, different pixels `8.37625784723706%`, current SHA-256 `e509466327000957ebcca777bb1638008b32de9c19557d26cfc20c38bb81c10a`.
- The candidate improves the fresh baseline from delta `14.421397478031128` and `8.596349317786392%` different pixels. Title/subtitle now use the source's stacked anatomy, the filter sits within roughly `5px` of the source and the list/table boundary is effectively aligned.
- Related sales worklists remain in their accepted visual bands from the same static bundle: Image 39 delta `14.689933025039936`, `9.097962007671724%`, SHA-256 `cf0d0af06a75df16f2791ccf2058cb39725b0ee6ad5fd4790d7b2f08a5edcd76`; Image 40 delta `13.346945809549974`, `8.172954631014519%`, SHA-256 `982a18ec746b795318f7d857e6e6e7032254bffb53035e38f6447f845ca25032`.
- The shared floating drawer geometry was deliberately preserved. Its approximately `20px` top-offset difference remains a product-review residual rather than a reason to risk clipping in other drawer stories.

**Technical verdict: Semi-approved, still Fail 1:1.** Official stacked worklist rhythm and ownership are accepted. Product review remains open for exact drawer placement, avatar artwork, table microdensity, drawer text wrapping, icon optical weight, typography and antialiasing.
