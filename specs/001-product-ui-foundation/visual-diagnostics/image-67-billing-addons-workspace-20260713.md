# Image 67 Billing add-ons workspace diagnostic

Date: 2026-07-13

Source: `67_round-4.1N_billing_03_add-ons-taliya-aprovado.png` (1448x1086)

Story: `crm-image-coverage-billing--image-67-billing-add-ons`

## Baseline

- Aggregate render is valid at 1448x1086.
- Baseline full-page metrics: delta `11.85`, changed-pixel ratio `6.43%`.
- The three individual `AddOnCard` variants are already component-certified at 269x344; this pass must preserve their anatomy.

## Regional mismatch

| Region | Source | Current render | Owner decision |
| --- | --- | --- | --- |
| Active add-ons | 884x254 panel with a centered empty state: package icon, `Nenhum add-on ativo`, explanatory copy | Large generic panel containing an unavailable `Mais agentes` card | Promote the empty-active anatomy into `BillingAddOnsWorkspace`; no story markup. |
| Available add-ons | 884x434 panel with title and three 269x344 cards in one horizontal row | Three certified cards inside a vertical story stack; only the first card is visible in the viewport | Workspace owns the three-column grid while retaining `AddOnCard` as card owner. |
| Main/panel split | About 884px main + 29px gap + 366px support rail, starting around x=135 | Generic 974px main + 15px gap + 401px rail, starting around x=122 and clipping the rail | Add official `billing-addons` `CrmRightPanelPage` variant with a +13px x offset. |
| Vertical placement | Main starts around y=319; support rail starts around y=184 | Main and rail both start around y=185 | Layout variant owns independent main/panel y offsets (+134px/-1px). |
| Support | Contextual add-ons help rail about 850px high | Correct copy in official `UsageDrawer`, but generic dimensions and clipped width/height | Keep official drawer; page variant owns its embedded dimensions. |

## Contract

- Package owner: `@taliya/crm`.
- New owner: `BillingAddOnsWorkspace`.
- Anatomy: active section, empty state or active add-on cards, available section, three source options.
- Prepared-data API: active and available add-on option records, loading and blocked states.
- Behavior API: one add-on action callback receiving the selected option and state.
- Isolated Storybook path: `CRM / Billing / BillingAddOnsWorkspace`.
- Story responsibility after promotion: shell metadata, panel copy, prepared callbacks only.

## Probe hypotheses

1. Correct owner composition will restore the complete first-viewport anatomy without altering certified `AddOnCard` internals.
2. The 884/29/366 split and independent offsets will align main panels and support rail to the source.
3. A 254px active panel plus 20px gap plus 434px available panel will align the canonical vertical stack.

Final status must remain `Fail 1:1` unless static source-size evidence proves otherwise.

## Shared-header follow-up (2026-07-14)

- Source inspection confirms the operational top navigation with no selected item, breadcrumb `Billing / Add-ons`, stacked title/subtitle and three bordered icon facts.
- The accepted workspace already begins around `x=135/y=319` and the support rail around `x=1048/y=184`; those anchors must remain unchanged.
- Replacing the 56px legacy header with the 126px shared product header adds exactly 70px before content. Therefore the `billing-addons` offsets must change from `134px/-1px` to `64px/-71px`.
- The summary begins around `x=539`. The first compiled probe at `142px / 142px / 165px` exposed visible overflow in `Nenhum add-on ativo`; the retained contract uses a 158px center column and 8px Billing-specific inline padding so text remains contained without changing the shared Usage variants.
- The active empty state uses a package/add-on icon, not the current shopping-cart glyph.
- Contract decision: promote the cross-domain header owner to `CrmHeaderSummary`, keep `UsageHeaderSummary` as a deprecated source-compatible alias, add a public `billing` header rhythm and retain all page anatomy in official owners.

## Accepted implementation

- Promoted `BillingAddOnsWorkspace` into `@taliya/crm` with prepared active/available records, loading, error and blocked states plus `onAddOnAction`.
- Added the official `billing-addons` `CrmRightPanelPage` variant and governed tokens for the 884/29/366 split, 254/434 panel heights, offsets and three-column grid.
- Replaced the story-local active panel and stack with the official workspace. The image story now owns only shell metadata, contextual support copy and callback fixtures.
- Added isolated Storybook coverage for source, active, loading, error and blocked states.
- Preserved the already certified `AddOnCard` anatomy and introduced no story-local CSS.

## Static source-size evidence

- Render: valid, nonblank, no runtime errors, exact 1448x1086 dimensions.
- Baseline: mean RGB delta `11.85`; changed pixels `6.43%`.
- Accepted candidate: mean RGB delta `10.310961500632526`; changed pixels `6.040973515256962%`.
- The active section, available section, horizontal card row, main/support width split and independent vertical offsets now follow the source structure.
- Residual differences are concentrated in the shared shell/header/navigation, typography/icon rendering and support-panel internal rhythm.

## Verdict

`Fail 1:1`, retained as the architecture-correct demo-ready candidate. Further changes must target official shared shell, billing-layout, support-panel or token contracts and require cross-image evidence; the story must not regain local anatomy.

## Final shared-header evidence (2026-07-14)

- Promoted `CrmHeaderSummary` as the official cross-domain icon-fact owner with `UsageHeaderSummary` retained as a deprecated alias, plus the official `crmOperationalNavItems` contract.
- Added the public `billing` page-header rhythm, no-selection operational nav, breadcrumb and source facts; compensated the 70px header expansion in the `billing-addons` right-panel offsets.
- Added the official `package` primitive icon and used it in the Billing active-empty state and header fact.
- Rejected the first `142/142/165px` summary probe despite its slightly lower delta because `Nenhum add-on ativo` visibly overflowed into the third fact.
- Retained the contained `142/158/165px` variant with Billing-specific 8px inline padding.
- Final compiled static report: `tmp/image67-final-static-20260714/report.json`.
- Final source/current dimensions: `1448x1086`; valid populated render; zero runtime errors.
- Final mean RGB delta: `9.63429416413147`, improved from the current static baseline `10.31571414520653`.
- Final different-pixel ratio: `5.854649328978562%`, improved from `6.0438987413896604%`.
- Final current SHA-256: `89b57cabf65a56e87c89082e3263d209f722681de4a339fab5a95920210b3684`.
- Paired regressions after the shared-owner promotion remained bit-identical: Image 68 `61808499c04a8f11853b8ecaa8f4ac443dd2afd03293d1e99aa54aee3c9de61e`; Image 69 `d69dc78430aac5cb9804af4654113d9f04f5c6ec9ef69ca2b2f554467d061521`.

Final verdict remains explicit `Fail 1:1`. The architecture-correct, text-contained composition is semi-approved and moves to product review; residual differences remain in shared shell/browser rendering, typography, icons/avatar, antialiasing and support-panel micro-rhythm.
