# Image 54 agent routine workspace diagnostic - 2026-07-13

Source: `54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png`

Story: `crm-image-coverage-agentes--image-54-rotina-presenca-faltas`

## Baseline

- Source/current dimensions: `1536x1024`.
- Previous helper-composed delta: `17.875462002224392`; different pixels: `10.375277201334636%`.
- The page used the official right-panel shell and drawer, but routine mode, four-flow anatomy, facts/status and action bar were split across three story-local helpers.

## Accepted reusable changes

- Promoted `AgentRoutineWorkspace` to `@taliya/crm` as the official owner of routine-level configuration.
- Moved mode selection, default flow data, two-column flow section, fact/status anatomy and simulation/publication actions into the package.
- Exposed controlled mode, custom flows, flow-open and action callbacks.
- Removed `RoutineModePanel`, `PresenceRoutineFlowCards`, and `PresenceRoutineActions` from Storybook.
- Kept `CrmRightPanelPage` and `AgentFlowDrawer` as the official page-family shell and contextual panel.
- Added registry, matrix, behavior-test, dashboard-family and remaining-page contracts.

## Evidence progression

- Final official-owner capture: delta `21.929837544759113`; different pixels: `12.412198384602863%`.
- Pre-refinement canonical baseline: delta `21.93617778354221`; different pixels: `12.415186564127605%`; SHA `85c6f92fbe2f589b14e34c7b96a875c4b3de697cc5bdb7e4d841905c7e5d5533`.
- Added the public `agent-routine` content/right-panel variant, `agents-routine-detail` header rhythm and `routine` drawer state with source URL, breadcrumb, meta, contextual copy and questions.
- Replaced the generic workspace button group with the official `AgentFlowActionBar` and canonical `Simular rotina`, `Ajustar fluxos` and `Revisar para publicar` actions.
- Final evidence `tmp/54-agent-routine-final-20260715/report.json`: delta `14.330697801378038`; different pixels `9.192975362141926%`; SHA `f5dd696bc5ff8ad35123a5eaf3f5c641f6bf510f00f8dd1cd0854ab3bf8be86f`; source/current `1536x1024`; valid, nonblank runtime inspection with body text length `2392`.
- Regression sentinels remained bit-identical before the final routine-only top offset: Image 53 `91fef6651914537635031272c6512d42175c79aa3a052a80f95a83b7407bc719`, Image 56 `9c1c6d003ccf90307f5e7e0286f4f48f6ff2ddba74fd4dd12281b7af3829232d`, Image 58 `3baa13c85cf158257275998af3dcbf1b379853abe5e9e7cde1447417d2b87414`, Image 59 `75809345857c120f002587484c16363c72e71e579d3e77d85f5d76310a4511cd`, and Image 70 `ad092590d38100a5dc3a758deda28ec03f56502628063583daff9f87d7e7a995`.

## Verdict

**Semi-approved; explicit fail 1:1.** Official ownership, canonical route/header context, selected mode, four-flow anatomy, bottom actions and routine-specific drawer composition are correct. Remaining gaps are browser/sidebar chrome, typography, icon optical details, flow-card microdensity, borders, shadows and antialiasing. Product review owns acceptance; reopen technical work only through a reusable official hypothesis validated against the Agents sentinels.
