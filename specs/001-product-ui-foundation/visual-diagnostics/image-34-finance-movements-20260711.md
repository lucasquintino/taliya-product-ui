# Image 34 finance movements diagnostic - 2026-07-11

Source: `34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png`

Story: `crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `13.83`.
- Different-pixel ratio: `8.63%`.
- The page already used official `CrmWorklistPage`, stacked `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and fixed `PaymentDrawer` contracts.
- The drawer allowed facts and content overrides but fixed its eyebrow, overdue-state tone, and collection actions.
- Consequently the source's movement context (`Mensalidade`, `A vencer`, `Copiar link Pix`, and `Abrir conversa`) could not be expressed without extending the package API.

## Accepted reusable changes

- Added official `PaymentDrawer variant="movement"` while preserving the default `collection` behavior used by image 32.
- Added typed `due` state with the package-owned informational status treatment.
- Added typed `copy-pix-link` and `open-conversation` actions.
- The movement variant owns its eyebrow, action heading, action labels, icons, and omission of the redundant secondary-action heading.
- Connected the image story to `onAction` without introducing drawer markup or CSS locally.
- Added CRM tests for the movement label, due state, action set, and callbacks.

## Evidence progression

- Baseline canonical capture: delta `13.83`, different pixels `8.63%`.
- Movement-specific official drawer: `tmp/visual-audit/image34-movement-drawer-20260711`; delta `15.244384837662668`, different pixels `9.188834793402725%`.
- The accepted candidate is source-sized, populated, and passed runtime render inspection with the complete movement worklist and drawer visible.

## Verdict

**Fail 1:1.** The page anatomy is official and the previously missing movement-specific drawer semantics are now represented through reusable typed APIs. Remaining differences include shell/title/filter vertical rhythm, table typography and column density, avatar fidelity, drawer section spacing, exact secondary-action order, and antialiasing. The numerical regression is retained because the canonical label, state, and actions are now functionally correct. Further changes must remain in official worklist, table, filter, drawer, or token contracts and be validated jointly against images 32 and 34.

## 2026-07-14 movement rhythm probe

- Fresh compiled-static baseline: `tmp/image34-baseline-after-image33-20260714/report.json`, source/current `1448x1086`, delta `15.25308123819311`, different pixels `9.19894590112227%`, current SHA-256 `26defa97df50766ea81b71e0d565a7f8274d0995ca7efa488390e4dee68e38e3`.
- Source/current geometry: source title/filter/table begin near `y=143/204/342`; current begins near `y=130/185/315`. The existing official `overview` header adds `18px`, stacks title/subtitle, and matches this Financeiro rhythm without a new page family.
- Source movement drawer spans approximately `y=107..1038`; current spans `y=128..1058`. The complete drawer has the correct compact width and height but is translated `21px` too low.
- Affected anatomy: page-header copy, stacked filter/table vertical rhythm and movement-drawer placement. Owner: existing `CrmProductShell` rhythm plus a movement-only governed `PaymentDrawer` offset in `@taliya/crm`/`@taliya/tokens`.
- Smallest probe: select `pageHeaderRhythm="overview"` and move only `.tcrm-payment-drawer--movement` by `-21px`; validate Images 30, 32 and 34.
- Accepted compiled-static candidate: `tmp/image34-movement-rhythm-static-20260714/report.json`, source/current `1448x1086`, delta `13.23360135187842`, different pixels `8.300456335276701%`, current SHA-256 `8a4a583a70c4029f48b2c7c446a67bb7f820f6ab0984b7a857d97b5b0e46de73`; valid populated render with zero runtime errors.
- The title and movement-drawer top now align with the source; the table begins within approximately `7px` of the canonical boundary, and the complete action footer remains visible.
- Paired Image 30 evidence `tmp/image30-regression-after-image34-rhythm-20260714/report.json` is bit-identical to its accepted baseline: delta `11.04549437549046`, different pixels `6.765682441055784%`, SHA-256 `cbb394fd0be3641c07a7c3376e6e4c0c4ebad73f03c55ed90f29a3d54ac88a0a`.
- Paired Image 32 evidence `tmp/image32-regression-after-image34-rhythm-20260714/report.json` is bit-identical to its accepted baseline: delta `15.376079648207563`, different pixels `9.425417834025698%`, SHA-256 `4c25c09ba2cd9d00d2b672eca70fe3dac916f0b5c2122f6fbb8110294fcaff2f`.
- Accepted decision: retain the official overview rhythm and movement-only offset. Final verdict remains **failed 1:1**; residuals remain in filter/table micro-rhythm, cell typography and fit, avatar fidelity, drawer inner spacing, icons and antialiasing.
