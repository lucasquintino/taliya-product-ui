# Image 25 approvals worklist diagnostic - 2026-07-11

Source: `25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png`

Story: `crm-image-coverage-aprovacoes--image-25-lista-decisao-detalhe`

## Baseline

- Source and current render are both `1448x1086`.
- Mean RGB delta: `12.015771208313408`.
- Different-pixel ratio: `0.08145928085223283`.
- Current render is valid and has no viewport-size mismatch.

## Regional findings

- Header: the source stacks title and subtitle (`y~130` and `y~169`), while the current page renders the subtitle inline with the title. The filter bar begins at approximately `y=201` in both.
- Worklist rail: the source rail is approximately `168px` wide (`x~88-255`); the current rail is `176px` (`x=88-263`). The official `compact-rail` mode is the closest existing contract.
- Table: the source table begins near `x=264`; the current table begins at `x=272`. The compact rail should move the official table boundary close to the source.
- Quick-filter state: the source selected queue uses a soft blue treatment; the current selected queue uses the strong dark treatment. `PageQuickFilters selectionTone="soft"` already models the source state.
- Search action: the source filter control is embedded in the search field; the current page renders a detached filter button. `PageFilterBar searchFilterPlacement="embedded"` already models the source anatomy.
- Drawer: the source drawer is approximately `369px` wide and starts near `x=1070`; the current official drawer is `360px` wide and starts at `x=1074`. This is not changed in the first probe because it is shared package anatomy and should be reconsidered only after the page-level official variants are applied.

## Probe decision

Apply only existing public variants in the image-coverage story:

- `pageHeaderRhythm="compact-stacked"`
- `worklistLayoutMode="compact-rail"`
- `searchFilterPlacement="embedded"`
- `selectionTone="soft"`

Recapture before considering any shared ApprovalDrawer width or token change. The image remains not certified 1:1 until the post-change full-image comparison records an explicit verdict.

## Post-change evidence

Evidence: `tmp/visual-audit/image25-official-variants-20260711`.

- Capture status: `captured`; render inspection valid with no error patterns.
- Dimensions: `1448x1086`, exact match.
- Mean RGB delta improved from `12.015771208313408` to `11.377748440727288`.
- Different-pixel ratio improved from `0.08145928085223283` to `0.07869939358790431`.
- The title/subtitle stack, embedded filter control, soft quick-filter selection, rail boundary, and table start now track the source more closely.
- The compact filter bar still exposes the visible inline buttons Tipo, Risco, Origem, Status, Responsável.
- The drawer remains on its existing official `360px` contract; no shared token was changed from this single-image probe.

## Verdict

**Fail 1:1.** The official variants produce a measurable full-image improvement and are retained, but the selected approval row still differs materially: the source fills the entire selected row with a soft blue surface, while the current `ApprovalTable` state emphasizes the left marker without the same row-wide fill. Shell/frame and typography micro-differences also remain. The next useful investigation is a reusable `ApprovalTable` selected-row treatment validated against its isolated story and other table families; a page-local CSS override is not acceptable.

### Rejected selected-surface probe

Evidence: `tmp/visual-audit/image25-selected-surface-20260711`.

Reusing `color.crm-product-shell.control-selected-bg` for the selected table row produced the shell's strong dark selection state, not the source's soft blue table state. The metric regressed to mean RGB delta `19.009630141190915` and different-pixel ratio `0.11261421100292014`. The CSS probe was reverted. A future selected-row change needs a semantically soft table token/variant and cross-table validation; the strong shell token must not be reused here.

## Final selected-state checkpoint (2026-07-14)

- Current `ApprovalTable` now fills the complete selected row with the canonical soft blue surface and preserves the left marker/index; the earlier missing-state blocker is no longer present.
- Promoted `color.crm-approval-table.selected-bg` as the semantic package token. It intentionally resolves to the already accepted soft hover surface, removing direct selected-state coupling to a generic shell selector without changing pixels.
- Final compiled-static report: `tmp/image25-final-static-20260714/report.json`; source/current `1448x1086`, valid populated render, mean RGB delta `11.38485610431102`, different pixels `7.87292817679558%`, current SHA-256 `6d7477fda68d86ba9a1771296b46e976e81609217d71ea56eb5d81c4565ca04a`.
- The semantic-token rebuild remained bit-identical to `tmp/image25-current-static-20260714/report.json`; paired Inbox evidence `tmp/image24d-regression-after-approval-token-20260714/report.json` also remained bit-identical.

**Final verdict: failed 1:1; semi-approved composition baseline.** The complete approvals worklist, selected row, filters, quick-filter rail, drawer and actions are package-owned. Residual differences remain in outer framing, table/drawer width micro-offsets, exact avatar/icon rasterization, typography and antialiasing. Product review must decide whether to accept the baseline; technical reopening requires a reusable table, drawer or shell hypothesis.
