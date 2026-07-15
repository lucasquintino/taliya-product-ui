# Image 27 students worklist diagnostic - 2026-07-11

Source: `27_round-4.1E_alunos_01_lista-perfil-resumido.png.png`

Story: `crm-image-coverage-alunos--image-27-lista-perfil-resumido`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `14.86`.
- Different-pixel ratio: `8.45%`.
- The composition already used the official worklist family: `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `StudentTable`, and `StudentDrawer`.
- The page header rendered title/subtitle inline; the source stacks them.
- The selected segment used the strong dark treatment; the source uses a soft blue surface.
- `StudentTable` inherited the task-table row height of `73px`, so only nine of the ten canonical students fit and pagination fell below the visible table area.

## Accepted reusable changes

- Applied official `pageHeaderRhythm="compact-stacked"`.
- Applied official `worklistLayoutMode="compact-rail"` and `PageQuickFilters selectionTone="soft"`.
- Added `StudentTable density="compact"` to `@taliya/crm`, backed by the new `control.crm-student-table.compact-row-height = 63px` token and package coverage.
- Added reusable `WorkListDetailPage heightMode="tall"`, propagated as `worklistHeightMode` by both `CrmWorklistPage` and `InternalWorklistPage`.
- Tokenized the tall worklist height (`772px`) and viewport offset (`285px`) instead of shrinking rows below the source density or adding story CSS.
- Accepted for the current measured cycle: optional `StudentTable selectionTone="soft"` backed by `color.crm-student-table.selected-bg`, because the source uses a soft selected surface without the task-table marker while existing consumers may retain the marker default.
- Corrected the official activity-status treatment so the label keeps table text color without overriding the prepared `StatusDot` state color (`info`, `danger`, or `update`).

## Evidence progression

- Compact density, stacked header, compact rail, and soft segment selection: `tmp/visual-audit/image27-compact-density-20260711`, delta `13.888335427625666`, different pixels `0.08053847053915733`.
- Tall official worklist with ten rows and pagination anatomy: `tmp/visual-audit/image27-tall-worklist-20260711`, delta `13.950467654629996`, different pixels `0.08133845629457791`.
- Both captures are source-sized and passed runtime render inspection.
- The tiny metric tradeoff of the tall mode is accepted because it restores source-correct table/pagination anatomy; reducing rows below `63px` would optimize the metric against the requested end state.
- Current compiled static baseline before the selection/activity cycle: `tmp/image27-current-static-20260714/report.json`, delta `13.956732937876676`, different pixels `0.08136834447462939`, current SHA-256 `ebc1977e18b5e1030f6962867fbba14476a593ef5a7afe5007a7060c61470d94`.
- Final compiled static evidence: `tmp/image27-final-static-20260714/report.json`, source/current `1448x1086`, delta `13.915087892446643`, different pixels `0.08120872887477998`, current SHA-256 `cac3690d7597a6fadc54cc4e0fb5304e2f333a030903ff51a0fd56b8e8f09549`, valid populated render with zero runtime errors.
- Adjacent Students-family regression capture: `tmp/image28-regression-after-student-table-20260714/report.json`, valid populated render with zero runtime errors. It does not use `StudentTable`; no profile component was modified in this cycle.

## Verdict

**Fail 1:1; semi-approved official baseline.** The retained changes resolve the missing tenth row, pagination structure, header stack, rail allocation, selected-segment state, selected-row treatment, and activity-status color fidelity through official APIs and tokens. Remaining parity gaps are shell/frame offsets, table/drawer width and microtypography, avatar/icon rendering, and antialiasing. Reopen technical work only for a reusable `StudentTable`/`StudentDrawer` or shell hypothesis validated across Students stories; do not introduce story-local markup or CSS.
