# Image 69 usage ledger layout diagnostic

Date: 2026-07-13

Source: `69_round-4.1O_uso_02_extrato-aprovado.png` (1448x1086)

Story: `crm-image-coverage-usage--image-69-uso-extrato`

## Baseline

- Aggregate render is valid at 1448x1086.
- Baseline full-page metrics: mean RGB delta `11.972122806928292`; changed-pixel ratio `6.664555416501328%`.
- `UsageLedgerTable` is already component-certified at about 893x709 with all source rows, filters, statuses, footer and actions. This pass must preserve its anatomy.

## Regional mismatch

| Region | Source | Current render | Owner decision |
| --- | --- | --- | --- |
| Main/support split | About 893px main + 27px gap + 376px support rail, beginning around x=127 | Generic 974px main + 15px gap + 401px rail, beginning around x=122 and clipping the rail | Add an official `usage-ledger` `CrmRightPanelPage` variant with a +5px x offset. |
| Vertical placement | Ledger begins around y=311; support rail begins around y=191 | Ledger and rail both begin around y=185 | Layout variant owns independent main/panel offsets (+126px/+6px). |
| Ledger anatomy | One complete source-shaped table card around 893x709 | The official table is complete but positioned at the generic page origin | Keep `UsageLedgerTable` as the sole main-content owner; do not add an empty page wrapper. |
| Behavior | Filters, rows, reprocess/load-more and contextual actions are interactive | Story renders defaults without prepared callbacks | Story supplies callbacks only through the existing public API. |
| Support | Contextual usage rail around 376x829 | Correct official `UsageDrawer` content, but generic dimensions and clipped width | Page variant owns the embedded rail dimensions; drawer anatomy remains official. |
| Top navigation | Global operational labels `Hoje`, `Tarefas`, `Aprovações`, `Incidentes`, `Agentes`, `Auditoria`, `Relatórios`, with no selected pill | Local Usage tabs `Visão geral`, `Extrato`, `Billing`, `Add-ons`, `Suporte`, with `Extrato` selected | Story data must use the global shell nav; no shell anatomy change is needed. |
| Page header | Breadcrumb `Uso / Extrato`, stacked title/subtitle around x=139/y=175..281 and three bordered icon facts around y=224 | Inline title/subtitle at y=130 and three compact chips without source icons | Add an official `usage` page-header rhythm and reusable `UsageHeaderSummary`; the story supplies labels/callbacks only. |

## Contract

- Package owners: `CrmRightPanelPage` for page geometry and `UsageLedgerTable` for main anatomy.
- No new workspace component: a wrapper would add no domain anatomy or behavior.
- Prepared-data API: existing `UsageLedgerTable` rows and filters.
- Behavior API: existing row, action, reprocess, filter and load-more callbacks.
- Story responsibility after correction: shell metadata, contextual support panel and callback fixtures only.

## Probe hypotheses

1. A 893/27/376 page split will align the already-certified table and support rail without changing table internals.
2. Independent +126px/+6px vertical offsets will match the source page composition.
3. Adding callbacks to the image story will prove the consumer-facing behavior contract without story-local UI.
4. Expanding the official header to the source stack while reducing the `usage-ledger` main offset will preserve the table at y=311; the panel offset must compensate independently to remain at y=191.
5. A public `UsageHeaderSummary` composed from official buttons/icons will reproduce the three source facts and serve both Usage overview and ledger pages without story-local CSS.

Final status must remain `Fail 1:1` unless static source-size evidence proves otherwise.

## Accepted implementation

- Added the official `usage-ledger` `CrmRightPanelPage` variant with governed 893/27/376 geometry and independent main/panel offsets.
- Kept `UsageLedgerTable` as the direct main-content owner. No workspace wrapper was added because it would contain no additional domain anatomy or behavior.
- Connected the existing row, action, reprocess, filter and load-more callbacks in the image story; the story still owns no UI anatomy or CSS.
- Added a page-family contract test for the public variant and retained the existing isolated `UsageLedgerTable` stories for all table states.
- Preserved all certified table tokens and internals.

## Static source-size evidence

- Render: valid, nonblank, no runtime errors, exact 1448x1086 dimensions.
- Baseline: mean RGB delta `11.972122806928292`; changed pixels `6.664555416501328%`.
- Accepted candidate: mean RGB delta `11.536418641406279`; changed pixels `6.599755298474813%`.
- The table begins at the source position around x=127/y=311 and the support rail around x=1047/y=191.
- Residual differences are concentrated in shared shell/header/navigation, typography/icon rendering and support-panel internal rhythm.

## Verdict

`Fail 1:1`, retained as the architecture-correct demo-ready candidate. Further changes must target official shared shell, usage-layout, support-panel or token contracts and require cross-image evidence; `UsageLedgerTable` and the story must not gain compensating local anatomy.

## 2026-07-14 Official Header Completion

The previous candidate still used local Usage tabs and compact chips in the shell header. The source instead requires the global operational nav with no selected item, breadcrumb `Uso / Extrato`, a stacked title/subtitle and three bordered icon facts. The correction added the official `UsageHeaderSummary`, public `CrmShellTopNav selectionMode="none"` behavior and `pageHeaderRhythm="usage"`; the image story now supplies only nav records, breadcrumb labels, fact labels and callbacks.

The first shared probe incorrectly applied the ledger header to Image 68 and was rejected. Image 68 was restored to its prior family contract. The retained ledger geometry uses a 126px Usage header, compensated right-panel offsets and independent support-rail placement, so the certified table remains around x=127/y=311 and the support rail around x=1047/y=191. The summary begins at the source x/y track around x=491/y=224.

Final evidence comes from the rebuilt static Storybook:

- Image 69 report: `tmp/image69-final-static-20260714/report.json`;
- source/current dimensions: `1448x1086`;
- Image 69 mean RGB delta: `10.7199426655678`, improved from `11.536418641406279`;
- Image 69 different-pixel ratio: `6.290062879643478%`, improved from `6.599755298474813%`;
- Image 69 current SHA-256: `d69dc78430aac5cb9804af4654113d9f04f5c6ec9ef69ca2b2f554467d061521`;
- paired Image 68 report: `tmp/image68-final-regression-20260714/report.json`;
- Image 68 mean RGB delta: `10.203625415042954`, effectively preserving the prior `10.200025267170654` baseline;
- Image 68 different-pixel ratio: `6.377501704262181%`;
- both renders are populated, nonblank and have zero runtime errors.

Final decision: **semi-approved official composition baseline, failed 1:1**. Header anatomy and page geometry are now official and source-aligned. Remaining differences are shell/browser rendering, table text width/truncation, icons, avatar, antialiasing and support-panel micro-rhythm. Product review is required for acceptance.
