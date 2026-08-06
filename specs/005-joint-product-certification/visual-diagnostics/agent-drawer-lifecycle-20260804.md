# Agent Drawer Lifecycle Diagnostic

Date: 2026-08-04

Scope: the five full-page Agent compositions in
`ImageCoverageAgents.stories.tsx` that render `CrmRightPanelPage` with
`panelPlacement="drawer"`.

## Existing Evidence

- `AgentFlowDrawer` exposes and directly tests `onClose`, question submission,
  menu actions, loading, blocked, test, publish, execution, and closed states.
- The selected-object drawer lifecycle audit passes all 23 worklist, kanban,
  dashboard, finance, support, internal, and report pages.
- The five Agent page stories mount `AgentFlowDrawer` unconditionally and do
  not pass `onClose`; the visible close button therefore has no observable page
  outcome.
- `CrmRightPanelPage` always reserves the drawer placeholder whenever
  `panelPlacement="drawer"`, even when a consumer passes `panel={null}`.

## Affected Pages

- Agent routine detail (Image 54)
- Agent flow editor (Image 56)
- Agent flow test (Image 58)
- Agent publication review (Image 59)
- Agent execution receipt (Image 70)

## Ownership And Smallest Change

- `@taliya/crm/CrmRightPanelPage` must collapse its right-panel layout and stop
  applying drawer reservation when a drawer-placement panel is absent.
- Page consumers own whether the assistant is open and pass `onClose` to the
  official `AgentFlowDrawer`.
- The closed page state exposes an official `Button` action to reopen the
  assistant; no story-local CSS or drawer anatomy is introduced.
- Add direct package tests and Storybook interactions for close/unmount/reopen.

## Resolution Evidence

- `CrmRightPanelPage` renders no reserve and uses `data-state="collapsed"`
  when a drawer-placement `panel` is absent.
- All five Agent pages own `drawerOpen`, pass `onClose`, and render the official
  `Button` action `Abrir agente` only while closed.
- One shared Storybook `play` contract runs close/unmount/reopen for Images 54,
  56, 58, 59, and 70.
- `drawer-lifecycle:audit` passes 28/28 rows.
- The CRM package passes 172/172 direct tests.
- Browser interaction at `1024x900` proved, for every affected page, that close
  removes the drawer, collapses the layout, exposes exactly one reopen action,
  and reopening restores the drawer without horizontal viewport overflow.
- Captures: `evidence/family-12-flow-drawer-closed-20260804.png` and
  `evidence/family-12-flow-drawer-reopened-20260804.png`.

Status: resolved (`JPC-012`, P1).
