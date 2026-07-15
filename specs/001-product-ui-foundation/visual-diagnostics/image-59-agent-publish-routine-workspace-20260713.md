# Image 59 agent publish routine workspace diagnostic - 2026-07-13

Source: `59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png`

Story: `crm-image-coverage-agentes--image-59-publicar-rotina`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous simplified-story delta: `14.405114261356221`; different pixels: `9.086459991152647%`.
- The page used the official shell, preflight and drawer, but publication status, flow review, activation summary and actions were split across three story-local helpers.
- Four detailed source flow cards had been reduced to four status chips, so the lower-diff baseline omitted most of the required product anatomy.

## Accepted reusable changes

- Promoted `AgentPublishRoutineWorkspace` to `@taliya/crm` as the official publication owner.
- Added `AgentPublishFlowCard` with source-aligned flow facts plus view/simulate callbacks and four default flow contracts.
- Moved status, preflight, detailed flow grid, activation summary and publication actions into the package.
- Exposed checklist review/toggle, flow action and publish/simulate-again/back callbacks.
- Removed `PublishRoutineFlowSummary`, `PublishRoutineActivationSummary`, `PublishRoutineActions` and the local page stack from Storybook.
- Added registry, matrix, behavior-test, dashboard-family and remaining-page contracts.
- Scoped compact publication density so cards, activation summary and all actions fit the source-sized first viewport.

## Evidence progression

- Final official-owner capture: delta `16.18175780117863`; different pixels: `10.764024833603669%`.
- Final capture is source-sized, nonblank and passed runtime inspection.

## Verdict

**Fail 1:1.** The final metric is higher than the simplified baseline because the correct four-card publication anatomy is now rendered instead of being omitted. Official ownership, content regions, interactions and first-viewport fit are correct. Remaining gaps are browser/shell chrome, page-header breadcrumb/offset, exact card text and density, panel borders/padding, drawer rhythm, typography, icons, shadows and antialiasing. Refine only official shell, publication workspace/cards, drawer, primitives and tokens.

## Follow-up - 2026-07-15

- Added the complete source breadcrumb and browser route through official shell props.
- Added the page-scoped `pageHeaderRhythm="agents-publish"` and `CrmRightPanelPage rightPanelVariant="agent-publish"` contracts; the latter selects `contentLayout="agent-publish"` without changing other right-panel pages.
- Tokenized the `85px` header, zero copy offset, `86px` header inset and `0 6px 18px 82px` publication canvas padding.
- Final compiled-static evidence: `tmp/59-publish-final-20260715/report.json`; source/current `1672x941`; complete-owner mean RGB delta `16.185810083609177 -> 14.287264812112399`; different pixels `10.766884969161383% -> 9.929564394998703%`; current SHA-256 `75809345857c120f002587484c16363c72e71e579d3e77d85f5d76310a4511cd`; populated render with zero runtime errors.
- Regression sentinels remained bit-identical: Image 53 `91fef6651914537635031272c6512d42175c79aa3a052a80f95a83b7407bc719`, Image 70 `6db37c460fd07060af930a4b5132360200f96220a087661ba1f119437e504f67`.

## Follow-up verdict

**Semi-approved, explicit failed 1:1.** The full publication anatomy, route, breadcrumb, header axis, canvas allocation and interactions now follow the source through public package contracts, with no story-local anatomy. Product review owns the remaining chrome/sidebar, card/drawer microdensity, typography, icon, color, shadow and antialiasing differences.
