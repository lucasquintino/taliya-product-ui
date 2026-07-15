# Image 33 finance kanban diagnostic - 2026-07-11

Source: `33_round-4.1F_financeiro_03_kanban-financeiro.png.png`

Story: `crm-image-coverage-financeiro--image-33-financeiro-kanban`

## Baseline

- Source and current render: `1672x941`.
- Mean RGB delta: `12.24`.
- Different-pixel ratio: `7.89%`.
- The page already used official `CrmKanbanPage`, `PageFilterBar`, `KanbanColumn`, and `FinanceKanbanCard` components.
- Column monetary totals and column menus visible in the source were absent from the official column contract.
- `FinanceKanbanCard` already exposed selection and menu callbacks, but the story did not connect them, so the canonical card menu controls were missing.

## Accepted reusable changes

- Added optional `meta` and `onMenu` APIs to official `KanbanColumn`.
- Added accessible column-menu rendering and a two-row column-header layout owned by `@taliya/crm`.
- Supplied the seven canonical monetary totals as story data.
- Connected card selection, card menu, column menu, and add-column callbacks through existing official components.
- Added CRM tests for column metadata rendering and menu behavior.

## Evidence progression

- Baseline canonical capture: delta `12.24`, different pixels `7.89%`.
- Complete column/card action contract: `tmp/visual-audit/image33-column-contract-20260711`; delta `12.845638695812083`, different pixels `8.376320111456305%`.
- The accepted candidate restores seven column totals, seven column menus, twenty-one card menus, selection callbacks, and add callbacks without story-local anatomy.
- The focused capture is source-sized, populated, and passed runtime render inspection with zero render errors.

## Verdict

**Fail 1:1.** The financial kanban now represents the source's functional anatomy through reusable package APIs. Remaining differences include shell and filter vertical rhythm, board inset and height, lane widths/surfaces, typography, internal card density, horizontal scrollbar treatment, and antialiasing. The numerical delta regression is retained because the previously missing source content and controls are now present. Further changes must stay in `CrmKanbanPage`, `KanbanBoard`, `KanbanColumn`, `FinanceKanbanCard`, or governed tokens and be validated across operation and finance kanbans.

## 2026-07-14 finance layout probe

- Fresh compiled-static baseline: `tmp/image33-baseline-20260714/report.json`, source/current `1672x941`, delta `12.855368241393746`, different pixels `8.385472545240989%`, current SHA-256 `53688fbb8e9f7eeca27349a8d98f332108f0cc15163a8955bfa54560292c0ac1`.
- Source geometry: filter `y=215`, board approximately `x=122`, `y=300`, bottom `907`, lanes `205px`; current geometry: filter `y=185`, board `x=96`, `y=270`, bottom `838`, lanes `195px` and no visible horizontal scrollbar.
- Affected anatomy: Financeiro page-header rhythm, filter/board inset, board height, lane width and horizontal overflow treatment.
- Owner packages: `@taliya/crm` for the page/board variant and `@taliya/tokens` for its governed dimensions; no story-local CSS.
- Smallest probe: official `CrmKanbanPage layoutVariant="finance"`, `pageHeaderRhythm="overview"`, `26px 22px` stack inset, `607px` board height and `205px` finance lanes; validate Image 33 and regress Image 21.
- Accepted compiled-static candidate: `tmp/image33-finance-layout-static-20260714/report.json`, source/current `1672x941`, delta `11.044337609553786`, different pixels `7.499783900868973%`, current SHA-256 `cb67fbf6e3c3b56cba8338689492b963531e928a18b6a97d2a5ebbb98b8b4173`; valid populated render with zero runtime errors.
- Cross-family regression: `tmp/image21-regression-after-finance-layout-20260714/report.json` is bit-identical to the accepted Operation baseline, delta `13.077787486136971`, different pixels `9.116340058809763%`, SHA-256 `1e5123b5ab55e25516427e3a170582a6f8d88f6cca0df584d82fae730ca0fbe2`.
- Accepted decision: retain the package-owned Finance layout variant. It aligns filter/board vertical rhythm, restores the source-like board inset and height, and makes seven `205px` lanes overflow horizontally without changing default/commercial kanbans.
- Final verdict remains **failed 1:1**. This is the official semi-approved composition baseline; residuals remain in shell/browser rendering, scrollbar painting, exact lane surfaces, typography, card microdensity, icons and antialiasing.
