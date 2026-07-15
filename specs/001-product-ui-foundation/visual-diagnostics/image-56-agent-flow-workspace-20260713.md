# Image 56 agent flow workspace diagnostic - 2026-07-13

Source: `56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png`

Story: `crm-image-coverage-agentes--image-56-fluxo-falta-com-aviso`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous story-composed delta: `10.321766521414153`; different pixels: `7.739399702037433%`.
- The page used the official right-panel shell, flow primitives and drawer, but mode, settings and page actions were still assembled by three story-local helpers.

## Accepted reusable changes

- Promoted `AgentFlowWorkspace` to `@taliya/crm` as the official owner of one agent flow's mode, execution steps, exception settings and actions.
- Exposed controlled mode/settings plus mode, setting, step-open, step-menu and test/save/back callbacks.
- Removed `FlowModePanel`, `FlowSettingsPanel` and `FlowPageActions` from Storybook.
- Kept breadcrumb and header status as consumer data passed to the official `CrmRightPanelPage` shell.
- Registered the workspace, settings panel and action bar; added maturity, behavior-test, dashboard-family and remaining-page contracts.

## Evidence progression

- Final official-owner capture: delta `10.415528756438484`; different pixels: `7.770543400332539%`.
- Final capture is source-sized, nonblank and passed runtime inspection.
- The canonical pre-variant baseline later recorded delta `10.42016493024659`, different pixels `7.77333998%`, and SHA `9c1c6d003ccf90307f5e7e0286f4f48f6ff2ddba74fd4dd12281b7af3829232d`.
- Added the public `agent-flow` content/right-panel variant and `agents-flow-detail` header rhythm with canonical URL, breadcrumb and meta. The scoped contract aligns the first panel at `y=270` and the drawer at `x=1236`, `top=139`, `right=41`, `bottom=25` without changing the generic Agents frame.
- Final technical evidence `tmp/56-agent-flow-header-final-20260715/report.json`: delta `10.224406871443898`; different pixels `7.809631919621293%`; SHA `d3f23f2eee2b852fcf200ecaa1c31ee9f0f75285d26d3c7ca923a6a3fda7f240`; source/current `1672x941`; valid and nonblank with body text length `1944`.
- Sentinels 53, 54, 58, 59 and 70 remained bit-identical after the scoped variant.

## Verdict

**Fail 1:1 / semi-approved for product review.** Official ownership, source route, header/content axes, mode, flow-builder, settings, actions and drawer placement are package-owned and close to the source. Remaining gaps are browser/shell chrome, sidebar icons and active state, typography and icon rendering, internal drawer density, shadows and antialiasing. Refine only official shell, workspace, drawer, primitives and tokens.
