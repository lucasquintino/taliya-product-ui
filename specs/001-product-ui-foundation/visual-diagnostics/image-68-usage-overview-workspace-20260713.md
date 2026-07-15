# Image 68 usage overview workspace diagnostic

Date: 2026-07-13

Source: `68_round-4.1O_uso_01_visao-geral-aprovado.png` (1448x1086)

Story: `crm-image-coverage-usage--image-68-uso-visao-geral`

## Baseline

- Aggregate render is valid at 1448x1086.
- Baseline full-page metrics: mean RGB delta `13.703991068309541`; changed-pixel ratio `7.818302758361059%`.
- `QuotaProgress` is already component-certified at about 890x287 and `UsageOriginRow` at 380x45. This pass must preserve both child anatomies.

## Regional mismatch

| Region | Source | Current render | Owner decision |
| --- | --- | --- | --- |
| Main/support split | About 890px main + 30px gap + 376px support rail, beginning around x=128 | Generic 974px main + 15px gap + 401px rail, beginning around x=122 and clipping the support rail | Add an official `usage-overview` `CrmRightPanelPage` variant with a +6px x offset. |
| Vertical placement | Quota starts around y=294; support rail starts around y=179 | Main and rail both start around y=185 | Layout variant owns independent main/panel offsets (+109px/-6px). |
| Quota | One source-sized 890x287 card spanning the full main width | `DashboardGrid` constrains it to the first half of a generic two-column grid | `UsageOverviewWorkspace` owns a full-width `QuotaProgress`; the story must not request `mainGridColumns`. |
| Lower workspace | 440px origin card plus a 424px right stack, separated by about 26px | Origin panel occupies the second generic grid cell; alert and affected panels form a separate vertical story stack below | Workspace owns the 440/26/424 lower grid and the two-card right stack. |
| Origin panel | Five certified rows and a footer note inside one 438px-high card | Rows are present, but footer is absent and the parent dimensions are generic | Workspace composes `UsageOriginRow` records and owns the footer note. |
| Alerts/affected | Compact 221px and 205px cards with source icon rows and a real `Ver fluxos` callback | Generic `Panel`, `List` and story-local anatomy; affected card falls outside the first viewport | Promote both sections and behavior into the official workspace. |

## Contract

- Package owner: `@taliya/crm`.
- New owner: `UsageOverviewWorkspace`.
- Anatomy: source-sized quota, origin card, alerts card, affected card and lower two-column grid.
- Prepared-data API: origin, alert and affected records plus loading, error and blocked states.
- Behavior API: quota ledger/add-ons callbacks, origin selection callback and view-flows callback.
- Isolated Storybook path: `CRM / Usage / UsageOverviewWorkspace`.
- Story responsibility after promotion: shell metadata, contextual support panel and callback fixtures only.

## Probe hypotheses

1. Removing the generic `DashboardGrid` and using the official 890px workspace will restore the source-sized quota card.
2. The 440/26/424 lower split will keep all three secondary panels in the first viewport.
3. The 890/30/376 page split with independent offsets will align the workspace and support rail without changing shared shell defaults.

Final status must remain `Fail 1:1` unless static source-size evidence proves otherwise.

## Shared-header follow-up (2026-07-14)

- Source inspection confirms that Image 68 uses the operational top navigation with no selected item, breadcrumb `Uso / Visao geral`, stacked title/subtitle and the same three-fact official summary used by Image 69.
- The accepted workspace already begins at the source position around `x=128/y=294`, while the support rail begins around `x=1047/y=179`; those anchors must remain unchanged.
- Replacing the 56px legacy header with the 126px usage header adds exactly 70px before the page content. Therefore the `usage-overview` right-panel offsets must change from `109px/-6px` to `39px/-76px` to preserve both anchors.
- The overview summary begins around `x=536`, or 397px from the official header origin at `x=139`; it needs an overview-specific actions-left token instead of inheriting Image 69's 352px ledger position.
- Its measured columns are approximately `158px / 129px / 165px`, separated by 16px gaps. The existing ledger columns intentionally reserve 223px for `15.000 mensagens/mes`, so the official summary needs an `overview` variant rather than a page-local width override.
- Contract decision: add a public `usage-overview` page-header rhythm that shares the official usage anatomy but owns the overview summary alignment. No story-local markup or CSS is permitted.

## Rejected probe

- Tightening the page split from 890/30/376 to 890/29/376, moving the lower grid from 14px/26px gaps to 11px/24px, and reducing right-card inline padding looked locally plausible but worsened the static metrics.
- Candidate before probe: mean RGB delta `10.200025267170654`; changed pixels `6.374767253746833%`.
- Rejected probe: mean RGB delta `10.235546839229572`; changed pixels `6.466212366329883%`.
- Decision: restore the first architecture-correct candidate and do not retune this microgeometry without stronger cross-image evidence.

## Accepted implementation

- Promoted `UsageOverviewWorkspace` into `@taliya/crm` with prepared quota, origin, alert and affected records; loading, error and blocked states; and public ledger, add-ons, origin and flow callbacks.
- Added the official `usage-overview` `CrmRightPanelPage` variant and governed tokens for the 890/30/376 split, independent offsets and 440/26/424 lower composition.
- Removed the story-local `Panel`, `List`, `ListItem`, page stack and generic two-column `DashboardGrid` composition. The image story now owns only shell metadata, support panel and callback fixtures.
- Added isolated Storybook coverage for source, 90% threshold, loading, error and blocked states.
- Preserved the already certified `QuotaProgress` and `UsageOriginRow` anatomies and introduced no story-local CSS.

## Static source-size evidence

- Render: valid, nonblank, no runtime errors, exact 1448x1086 dimensions.
- Baseline: mean RGB delta `13.703991068309541`; changed pixels `7.818302758361059%`.
- Accepted candidate: mean RGB delta `10.200025267170654`; changed pixels `6.374767253746833%`.
- The quota begins at the source position around x=128/y=294; all three lower panels now fit in the first viewport and the support rail follows the source split and independent top offset.
- Residual differences are concentrated in shared shell/header/navigation, typography/icon rendering and support-panel internal rhythm.

## Verdict

`Fail 1:1`, retained as the architecture-correct demo-ready candidate. Further changes must target official shared shell, usage-layout, support-panel or token contracts and require cross-image evidence; the story must not regain local anatomy.

## Final shared-header evidence (2026-07-14)

- Promoted the public `usage-overview` page-header rhythm, operational top navigation with no selected item, breadcrumb, stacked title/subtitle and official `UsageHeaderSummary`.
- Added the official `UsageHeaderSummary variant="overview"` with measured `158px / 129px / 165px` columns; the story supplies only labels, icons and callbacks.
- Compensated the 70px header expansion through the existing `usage-overview` right-panel tokens, preserving the main workspace around `x=128/y=294` and support rail around `x=1047/y=179`.
- Final compiled static report: `tmp/image68-final-static-20260714/report.json`.
- Final source/current dimensions: `1448x1086`; valid populated render; zero runtime errors.
- Final mean RGB delta: `9.797204670865426`, improved from the accepted `10.200025267170654` candidate.
- Final different-pixel ratio: `6.253243185494949%`, improved from `6.374767253746833%`.
- Final current SHA-256: `61808499c04a8f11853b8ecaa8f4ac443dd2afd03293d1e99aa54aee3c9de61e`.
- Paired Image 69 regression: `tmp/image69-final-regression-after68-20260714/report.json`; SHA and metrics remained exactly unchanged at `d69dc78430aac5cb9804af4654113d9f04f5c6ec9ef69ca2b2f554467d061521`, delta `10.7199426655678`, different pixels `6.290062879643478%`.

Final verdict remains explicit `Fail 1:1`. The composition is semi-approved and moves to product review; remaining differences are shared shell/browser rendering, typography/icons/avatar, antialiasing and support-panel micro-rhythm.
