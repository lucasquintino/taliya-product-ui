# Image 21 Operation Kanban - Regional Diagnostic

Source: `21_round-4.1B_operacao_01_kanban-geral.png.png`

Current static story: `crm-image-coverage-operacao--image-21-kanban-geral`

Validated capture before changes:

- dimensions: `1448x1086` source/current;
- mean absolute RGB delta: `14.631895054756841`;
- different pixel ratio: `0.09451024083513934`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Search | Source search is approximately `260px` wide and contains a sliders action; current is approximately `347px` and has no embedded action | `PageFilterBar` story composition | Use the existing `compact` density and `searchFilterPlacement="embedded"` API |
| Filter actions | Source retains a separate sliders action and export action to the right | Story data through official UI controls | Preserve both official `IconButton` actions; the embedded search action is an additional source control |
| Quick-filter rail | Source rail panel is approximately `200px` wide; current is approximately `220px` | `@taliya/crm` / `@taliya/tokens` | Validate after filter correction, then promote a reusable kanban density variant if the mismatch remains |
| Board height/cards | Source board is approximately `582px` tall and first cards approximately `161px`; current board is approximately `570px` and cards `150px` | `@taliya/crm` / `@taliya/tokens` | Validate a reusable comfortable kanban density instead of story-local CSS |
| Activity boundary | Source activity begins around `y=854`; current begins around `y=824` | Kanban board geometry | Expected to follow the official board-height correction |
| Top navigation | Source active navigation begins around `x=431`; current begins around `x=530` | `CrmProductShell` | Treat as a shared shell alignment contract and do not change globally from this image alone |
| Window framing | Source includes an outer inset/frame effect while current fills the viewport | `CrmProductShell` capture mode | Re-evaluate only after content geometry; adding a frame changes all content coordinates |

## Token Decision

The first pass adds no token and no story-local CSS. It uses the existing official compact filter density and embedded search-filter action. Rail, board, card and shell values remain hypotheses until the focused recapture isolates their contribution.

## Acceptance Rule

This pass is not visual approval. Rebuild static Storybook, recapture image 21 with visible-render validation, compare source/current/diff, and record an explicit pass/fail verdict. Any subsequent structural change must be represented by an official component variant and governed tokens.

## Recapture Sequence

| Pass | Official composition | Mean RGB delta | Different-pixel ratio |
| --- | --- | ---: | ---: |
| Baseline | Existing shared kanban | `14.631895054756841` | `0.09451024083513934` |
| Filter | Compact `PageFilterBar` plus embedded search action | `14.626914751279468` | `0.09451660002238434` |
| Structure | Official page stack plus compact `200px` rail | `14.337622181184267` | `0.096073964978684` |
| Final cycle | Separate lane surfaces plus comfortable `161px` cards | `13.926196968617836` | `0.09484028265315467` |

## Final Cycle Verdict

- dimensions: `1448x1086`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- total mean-delta improvement from baseline: `0.705698086138...`;
- official anatomy added: `CrmKanbanPage` now owns stack spacing; `KanbanBoard` exposes governed rail density, lane surface and card density variants;
- verdict: **failed 1:1 visual certification, best structural candidate retained**.

The board and activity boundaries now track the source closely, and the source's separate-lane anatomy no longer requires story CSS. Residual differences remain visible in the outer shell framing, top-nav horizontal alignment, typography/antialiasing and exact content details. Those shared contracts must not be changed from this image alone.

## Operation shell follow-up (2026-07-14)

- Cross-image inspection with Image 22 confirmed that the operation top navigation began about 99px to the right of the canonical source in both states.
- Added the public `pageHeaderRhythm="operation"` contract to `CrmProductShell`/`CrmKanbanPage`; its governed token positions the family navigation without changing the default shell or unrelated page families.
- Corrected prepared sidebar data so Configurações and Operação belong to the main navigation stack while only dark/light theme controls remain in the utility block.
- Final compiled static evidence: `tmp/image21-operation-rhythm-static-20260714/report.json`; source/current `1448x1086`, valid populated render, mean RGB delta `13.077787486136971`, different pixels `9.116340058809763%`, current SHA-256 `1e5123b5ab55e25516427e3a170582a6f8d88f6cca0df584d82fae730ca0fbe2`.
- Paired Image 22 evidence `tmp/image22-regression-after-operation-rhythm-20260714/report.json` also improved, so the shared family hypothesis is retained.

**Final verdict: failed 1:1; semi-approved composition baseline.** Shell, filters, quick-filter rail, separate lanes, comfortable cards, activity table and operation navigation now have official owners and source-backed geometry. Residual differences remain in outer framing, browser/sidebar micro-positioning, exact card content, typography, icons/avatar and antialiasing. Product review must decide whether to accept the baseline; technical reopening requires another reusable cross-story hypothesis.
