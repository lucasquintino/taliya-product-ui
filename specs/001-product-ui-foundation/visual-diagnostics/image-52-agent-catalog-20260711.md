# Image 52 agent catalog diagnostic - 2026-07-11

Source: `52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png`

Story: `crm-image-coverage-agentes--image-52-agentes-catalogo`

## Baseline

- Source/current dimensions: `1672x941`.
- Current official-family delta: `14.213751701251002`; different pixels: `6.861210968683422%`.
- The page already used `CrmDashboardPage columns={1}` and the complete `AgentCatalog` owner; no story-local shell, card grid, card anatomy, or CSS was present.

## Accepted reusable state

- Retained `CrmDashboardPage` as the official shell/page-family owner rather than creating an empty agent-catalog page wrapper.
- Retained `AgentCatalog` as the complete domain owner for seven-agent, reduced, single-agent, and empty states.
- Wired the story's `onAgentOpen` callback so it differs from production only by data/state handling, not anatomy.
- Confirmed the catalog is registered, matrix-declared, prop-driven, and behavior-tested in `@taliya/crm`.
- Confirmed dashboard-family and remaining-page contracts require the official one-column dashboard plus `AgentCatalog`.

## Evidence

- Final capture: delta `14.213751701251002`; different pixels: `6.861210968683422%`.
- Final capture is source-sized, nonblank, and passed runtime inspection.

## Source-frame follow-up - 2026-07-15

- Added additive `CrmProductShell frame="window-inset"` so the catalog can own the Image 52 stage margins without changing flush Agents pages.
- Added `pageHeaderRhythm="agents"` with source-backed `123px` header height and `31px` copy offset.
- Corrected `AgentCatalog` from fluid tracks to responsive source-width `445px` tracks; `AgentCard` remains the package owner.
- Final static evidence `tmp/agents-isolated-final-20260715/52/report.json`: delta `9.594979593462451`; different pixels `6.8434781282255965%`; SHA `aa9d9d31e7b0a237e16ce2549b7c99d34a61ace9948916b9018f3d2ee59d95de`.
- Image 59 SHA `56f47ae4e57970e0276ee4fdb712f005fcf7fafb0873d77abdc6ac2ce0fcceab` and Image 70 SHA `6db37c460fd07060af930a4b5132360200f96220a087661ba1f119437e504f67` remained bit-identical after the inset contract was isolated to the catalog.

## Verdict

**Semi-approved; fail 1:1.** Structural ownership, source frame, seven-card geometry, selected state, interaction contract and absence of story-local anatomy are correct. Remaining gaps are browser chrome/sidebar microgeometry, typography/font rendering, icons, colors, shadows and antialiasing. Product review owns acceptance; reopen technical work only through official shell, `AgentCatalog`/`AgentCard` and shared tokens with full-bleed Agents sentinels.
