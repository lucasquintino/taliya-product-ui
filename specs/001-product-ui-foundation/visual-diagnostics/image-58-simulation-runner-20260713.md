# Image 58 simulation runner diagnostic - 2026-07-13

Source: `58_round-4.1L_agentes_05_teste-fluxo-falta-com-aviso-aprovado.png`

Story: `crm-image-coverage-agentes--image-58-teste-fluxo-falta-com-aviso`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous capture delta: `13.239877026882732`; different pixels: `8.637990735703135%`.
- `SimulationRunner` already owned the complete scenario, phone-preview, timeline and action anatomy; no story-local reusable anatomy required promotion.
- The owner did not expose controlled scenario selection, conflated run/change-scenario behavior, omitted the back callback, stretched the scenario content vertically and allowed timeline status/check content to collide.

## Accepted reusable changes

- Added a controlled `selectedScenarioId` contract and distinct `run`, `change-scenario` and `back` action callbacks while preserving `onRun` compatibility.
- Connected the image-coverage story to real selected-scenario and action state.
- Scoped scenario-list alignment and execution-row alignment/spacing fixes to the official simulation owner.
- Kept `CrmRightPanelPage`, `SimulationRunner` and `AgentFlowDrawer` as the official page composition.
- Updated maturity and behavior evidence without adding story-local CSS or markup.

## Evidence progression

- Final official-owner capture: delta `13.0725088854878`; different pixels: `8.590448926877138%`.
- Final capture is source-sized, nonblank and passed runtime inspection.
- Canonical pre-variant baseline later recorded delta `13.077650561772996`, different pixels `8.593690413842547%`, and SHA `3baa13c85cf158257275998af3dcbf1b379853abe5e9e7cde1447417d2b87414`.
- Added the public `agent-test` content/right-panel variant and canonical browser URL. The scoped contract aligns panels to `y=270..842`, actions to `y=868` with `51px` height, and the drawer to `top=139`, `right=19`, `bottom=22`, `width=382`.
- A first probe that widened the phone column was rejected (`delta 14.008998622050246`) after regional evidence showed phone delta worsening `22.421 -> 32.620`; horizontal phone geometry was restored while retaining the proven vertical/action/drawer changes.
- Final technical evidence `tmp/58-agent-test-phone-final-20260715/report.json`: delta `12.452905431630473`; different pixels `8.402188448611626%`; SHA `f4e4ad8830cd5aad331325e6779e3ac2472562970507045b04de4cb486e9f6e8`; source/current `1672x941`; valid and nonblank with body text length `1711`.
- Sentinels 54, 56, 59 and 70 remained bit-identical after the scoped variant.

## Verdict

**Fail 1:1 / semi-approved for product review.** Official ownership, route, panel/action axes, scenario selection, phone preview, timeline, drawer and behavior are package-owned and close to source. Remaining gaps are browser/shell chrome, phone details, timeline density, drawer internals, typography, icons, shadows and antialiasing. Refine only official shell, simulation components, drawer, primitives and tokens.
