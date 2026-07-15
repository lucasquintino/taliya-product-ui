# Image 53 agent agenda routines diagnostic - 2026-07-11

Source: `53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png`

Story: `crm-image-coverage-agentes--image-53-agente-agenda-rotinas`

## Baseline

- Source/current dimensions: `1491x1055`.
- Previous official-family delta: `31.39103456971423`; different pixels: `22.05733611781272%`.
- The page already used `CrmDashboardPage`, `AgentRoutineIntro`, and `AgentRoutineCard`, but the intro was absent from the official registry/matrix and five cards were hidden behind a story-local helper without interaction state.

## Accepted reusable changes

- Registered and matrix-declared `AgentRoutineIntro` as part of the official Agents API.
- Retained `CrmDashboardPage columns={3}` as the owner of page shell and routine-grid geometry.
- Removed the story-local `AgentRoutineCards` component and replaced it with routine data mapped directly to official `AgentRoutineCard` instances.
- Added selected-routine state and wired `onOpen`, keeping the story limited to data and callbacks.
- Confirmed `AgentRoutineCard` remains prop-driven and behavior-tested across simulated, draft, published, blocked, and selected states.

## Evidence

- Final capture: delta `31.39103456971423`; different pixels: `22.05733611781272%`.
- Final capture is source-sized, nonblank, and passed runtime inspection.

## Verdict

**Fail 1:1.** Shell, intro, three-column grid, five routine cards, state labels, selection, and interaction ownership are correct. Remaining gaps are browser/window inset, global shell scaling, page vertical rhythm, card dimensions, whitespace distribution, typography, shadows, and antialiasing. Refine only official shell/dashboard/routine components and shared tokens.

## Follow-up - 2026-07-15

- Added the page-scoped `CrmProductShell frame="window-inset"` and `pageHeaderRhythm="agents-routines"` contract, plus the source browser URL and official `Breadcrumb`.
- Tokenized the `1224px` routine canvas, `20px` grid gap, `25px` intro/grid separation, `27px` intro gap, `265px` card floor and `37px` CTA height.
- Final compiled-static evidence: `tmp/53-routines-final-20260715/report.json`; source/current `1491x1055`; mean RGB delta `30.65245289536058 -> 14.320428945447302`; different pixels `21.797006366794765% -> 12.502058162561466%`; current SHA-256 `91fef6651914537635031272c6512d42175c79aa3a052a80f95a83b7407bc719`; populated render with zero runtime errors.
- Regression sentinels remained bit-identical: Image 52 `aa9d9d31e7b0a237e16ce2549b7c99d34a61ace9948916b9018f3d2ee59d95de`, Image 59 `56f47ae4e57970e0276ee4fdb712f005fcf7fafb0873d77abdc6ac2ce0fcceab`, Image 70 `6db37c460fd07060af930a4b5132360200f96220a087661ba1f119437e504f67`.

## Follow-up verdict

**Semi-approved, explicit failed 1:1.** Macrogeometry, page ownership, routine density and interactions now follow the source through public package contracts, with no story-local anatomy. Product review owns the remaining chrome/sidebar, typography, icon, card microdetail, color, shadow and antialiasing differences.
