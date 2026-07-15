# Image 66 Billing invoices workspace diagnostic

Date: 2026-07-13

Source: `66_round-4.1N_billing_02_faturas-taliya-aprovado.png` (1448x1086)

Story: `crm-image-coverage-billing--image-66-billing-faturas`

## Baseline

- Current aggregate capture: valid at 1448x1086.
- Baseline full-page metrics: delta `11.60`, changed-pixel ratio `6.13%`.
- `InvoiceTable` already owns and reproduces the 876x314 history panel. Its component-level certification remains valid.

## Regional mismatch

| Region | Source | Current render | Owner decision |
| --- | --- | --- | --- |
| Main/panel split | About 876px main + 35px gap + 389px support rail | Generic 974px main + 15px gap + 401px rail, clipped at the viewport edge | Add an official `billing-invoices` variant to `CrmRightPanelPage`; no story geometry CSS. |
| Main vertical origin | Current-invoice card starts around y=291 while support rail starts around y=193 | Main and support rail both start around y=185 | Variant owns separate main/panel offsets (about +106px/+8px). |
| Primary card | Full-width `Fatura atual`: amount/status, due/period/method facts, three entitlements, and three actions | Narrow `PlanSummaryCard` describing the subscription plan | Promote `BillingInvoicesWorkspace` in `@taliya/crm`; remove `PlanSummaryCard` from Image 66. |
| History | Full-width official table immediately below current invoice | Official table is correct but follows the wrong narrow card and is partially clipped vertically | Workspace composes the existing `InvoiceTable` with the source gap and callbacks. |
| Support rail | Source-aligned contextual invoice help | Correct domain content, but generic page split places and clips it incorrectly | Keep `UsageDrawer` as contextual panel; layout variant corrects geometry. |

## Contract

- Package owner: `@taliya/crm`.
- New owner: `BillingInvoicesWorkspace`.
- Anatomy: current invoice card, amount/status, three facts, three entitlement rows, pay/open/download actions, and official `InvoiceTable`.
- Prepared-data API: current invoice labels, entitlement rows, history rows and loading/error/blocked states.
- Behavior API: pay/open/download current invoice and row/open/download/retry history callbacks.
- Isolated Storybook path: `CRM / Billing / BillingInvoicesWorkspace`.
- Story responsibility after promotion: shell metadata, panel copy, prepared data and callbacks only.

## Probe hypotheses

1. Replacing `PlanSummaryCard` with the complete official workspace will correct the dominant anatomy mismatch.
2. A 876/35/389 right-panel split will align both the certified invoice table and support rail horizontally.
3. Independent main/panel y offsets will preserve the tall support rail while placing the main workspace under the page header as in the source.

Final status must remain `Fail 1:1` unless a static source-size capture proves otherwise.

## Shared-header follow-up (2026-07-14)

- Source inspection confirms operational top navigation with no selected item, breadcrumb `Billing / Faturas`, stacked title/subtitle and three bordered status facts.
- Existing correct anchors are main workspace around `x=122/y=291` and support rail around `x=1037/y=193`.
- The 126px product header adds 70px over the legacy 56px header, so `billing-invoices` main/panel offsets must change from `106px/8px` to `36px/-62px`.
- Source header begins around `x=131`; facts begin around `x=507`, with approximate `142px / 158px / 153px` columns.
- Contract decision: add a public `billing-invoices` page-header rhythm and `CrmHeaderSummary` variant with official success/warning/neutral status tones. Story responsibility remains labels, icons and callbacks only.

## Accepted implementation

- Promoted `BillingInvoicesWorkspace` to `@taliya/crm` with current-invoice data, entitlements, history states and all pay/open/download/row callbacks.
- Added isolated source/loading/error/blocked stories.
- Added the official `CrmRightPanelPage` `billing-invoices` variant with a 876px main, 38px gap and 390px rail. After the shared-header promotion, its compensated offsets are +36px for main and -62px for panel, preserving the source workspace/support origins.
- Replaced the legacy compact page heading with official `Breadcrumb`, stacked product header and `CrmHeaderSummary variant="billing-invoices"`; the three facts use public success, warning and neutral tones.
- Kept the certified `InvoiceTable` as the history owner and removed the unrelated `PlanSummaryCard` from Image 66.
- Extended the contextual official `UsageDrawer` to the canonical 858px rail height only inside this official page-layout variant.
- Synchronized all new and prior Image 65 billing tokens between the typed token source and public `tokens.css` artifact.

## Final static evidence

- Source/current dimensions: `1448x1086` / `1448x1086`.
- Render validity: pass.
- Baseline: delta `11.60`, changed-pixel ratio `6.13%`.
- First official workspace capture: delta `9.697368610712601`, changed-pixel ratio `5.805238444084938%`.
- Final rail-height capture: delta `9.627099803628298`, changed-pixel ratio `5.797925378753192%`.
- Shared-header baseline before the Image 66-specific variant: delta `9.631563741101377`, changed-pixel ratio `5.8007870130134406%`.
- Final compiled static evidence: `tmp/image66-final-static-20260714/report.json`, delta `9.376677341622322`, changed-pixel ratio `5.759388704048513%`, current SHA-256 `0494c16ac99637eb4ed83d4e7a32402e7fe23f9791960d43f3617fa279ff1aa2`.
- Paired Image 67 regression: `tmp/image67-regression-after-invoices-20260714/report.json`; current and diff artifacts remained bit-identical to its accepted baseline.
- Main workspace alignment is approximately source x=125/current x=122 and source y=291/current y=291; the 876px current-invoice/history width and 408px/314px panel heights match the canonical anatomy.

## Verdict

**Fail 1:1; semi-approved composition baseline.** The official page anatomy, ownership, product header and first-viewport geometry are now correct. Remaining visible differences are concentrated in browser/app-shell rendering, typography, icon/avatar artwork, antialiasing and the support drawer's internal vertical rhythm. Product review must decide whether to accept this baseline; any technical reopening must go through shared official owners, not Image 66 story CSS.
