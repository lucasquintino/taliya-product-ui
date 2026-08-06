# Joint Certification Findings

Generated: 2026-08-05

## Open Summary

- P0: 0
- P1: 1
- P2: 0
- P3: 0
- Resolved: 29

## Findings

| ID | Severity | Status | Finding | Required resolution |
| --- | --- | --- | --- | --- |
| JPC-001 | P1 | Open | Local source and npm publish different `@taliya/crm` contracts under `0.1.0`. | Publish a new version after the certification batch, update Internal, and prove installed parity. |
| JPC-002 | P1 | Resolved | Twelve public CRM visual exports lacked component-registry classification. | All 274 CRM visual exports are registered; canonical compositions have source-map rows; the gate rejects future registry drift. |
| JPC-003 | P2 | Resolved | Three unused direct wrappers duplicated canonical controls. | Classified and annotated as deprecated compatibility aliases; new consumers are directed to canonical controls. |
| JPC-004 | P2 | Resolved | Five canonical components lacked isolated stories. | Added static isolated evidence and interaction assertions; only compatibility aliases remain intentionally without canonical stories. |
| JPC-005 | P2 | Resolved | Seventy-five public components initially had no direct test reference. | Interactive contracts now have direct tests; all 38 remaining static/structural exceptions are governed and the gate rejects drift. |
| JPC-006 | P2 | Resolved | CRM reexported UI `MessageBubble` without compatibility classification. | Classified as a deprecated compatibility reexport; canonical ownership remains in `@taliya/ui`. |
| JPC-007 | P2 | Resolved | Drawer lifecycle evidence was stale. | Regenerated after architecture and Agent lifecycle changes; all 28 lifecycle rows pass. |
| JPC-008 | P1 | Resolved | Future fixture checked a stale exact union sentinel. | Marker corrected; full local fixture passes. |
| JPC-009 | P1 | Resolved | File action controls were enabled but clicks were inert because no callbacks were exposed. | Added compatible callbacks/disabled semantics, direct tests, Storybook play assertions, and final browser evidence without visual-anatomy changes. |
| JPC-010 | P2 | Resolved | Decorative browser chrome exposed enabled controls without a callback contract. | Default chrome is now non-interactive; explicit `onAction`/`onToolbarAction` enables tested functional controls. |
| JPC-011 | P1 | Resolved | Official shell, setup, access, and right-panel families overlapped or clipped content at intermediate widths. | Shared official responsive contracts now pass at 1440, 1024, and 390 px with no viewport overflow; mobile closed-page content is vertically scrollable. |
| JPC-012 | P1 | Resolved | Five Agent pages rendered a visible drawer close control without page-owned close/reopen state. | `CrmRightPanelPage` collapses absent drawers; all five pages pass direct, Storybook, lifecycle-audit, and browser close/unmount/reopen checks. |
| JPC-013 | P1 | Resolved | Access and subscription stories expose enabled journey actions without observable outcomes. | Seven static Storybook plays now prove auth, coupon, payment, retry, support, and setup handoff through official callbacks. |
| JPC-014 | P1 | Resolved | Setup page content collides or clips inside the stable shell at 1440px. | Thirteen static setup stories pass interaction coverage and all 390/1024 responsive captures have zero horizontal overflow or visible errors. |
| JPC-015 | P1 | Resolved | Internal lead drawer still used the removed `placement="overlay"` variant. | Removed the prop, added consumer-audit rejection, and passed clean Internal typecheck, lint, 165 tests, production build, package sync, integration, and page-kit checks. |
| JPC-016 | P1 | Resolved | Human setup review found residual copy, state, clipping, and responsive defects. | Corrected official setup components and styles; 13 surfaces now pass human journeys, regression tests, and final desktop/mobile static recaptures. |
| JPC-017 | P1 | Resolved | Post-live settings workspaces overlapped the configuration agent panel at intermediate desktop widths. | Official responsive contracts now keep every workspace inside the main column; the blocked Team action and all nine plays pass. |
| JPC-018 | P1 | Resolved | Post-live settings pages do not yet represent every canonical field and operational state. | Official transverse and domain-specific state contracts now pass tests, static Storybook build, and human interaction review. |
| JPC-019 | P1 | Resolved | Setup routes reused generic Studio guidance instead of their domain context. | Shared `SetupAgentContext` now drives standalone/embedded agents, absent callbacks disable actions, Review owns its `h1`, and all 13 plays pass. |
| JPC-020 | P1 | Resolved | Setup compressed stepper, content, agent and controls at 1024px. | The official shell stacks its work regions between 981px and 1120px; 13 tablet and 26 combined responsive checks pass without overlap or overflow. |
| JPC-021 | P1 | Resolved | Settings retained fixed desktop geometry and clipped controls at mobile and tablet widths. | Official Settings layouts now contain mobile workspaces, stack the assistant rail at 981-1120px, and show complete notification statuses; five canonical routes pass fresh responsive inspection. |
| JPC-022 | P1 | Resolved | Today history targeted the wrong scroll context and the empty route duplicated a fixed-width shell/canvas contract. | Today now opens the history region correctly; `CrmEmptyShell` reuses the canonical product shell with one canvas and official empty/loading/unavailable states; five routes pass 15 responsive checks. |
| JPC-023 | P2 | Resolved | Three controls in Settings notifications and Invite row bypassed the official Button primitive. | All three now compose `@taliya/ui` Button while preserving their domain geometry; direct tests and the architecture gate pass with zero refactor debt. |
| JPC-024 | P1 | Resolved | Checklist and approval Worklists lacked canonical actions, terminal states and decision context. | Official components now expose the required actions and states; all three core Worklists pass route plays, final static rendering and nine responsive checks with full-height drawers. |
| JPC-025 | P1 | Resolved | Student, class and replacement Worklists lacked canonical lifecycle actions, states and readable constrained tables. | Official components now expose every required state and action; three clean route plays, 192 CRM tests and nine responsive checks pass, with token-backed internal table scrolling. |
| JPC-026 | P1 | Resolved | Commercial Worklists collapsed lifecycle states and left qualification, payment and conversion outcomes incomplete. | Official commercial lifecycle states, accessible checklist controls and contextual actions now pass three route plays, 194 CRM tests and nine responsive checks with full-height drawers. |
| JPC-027 | P1 | Resolved | Retention Worklists exposed incompatible actions and lacked observable terminal lifecycle states. | Official retention states, contextual action guards and localized outcomes now pass four route plays, 195 CRM tests and twelve responsive checks with fixed full-height drawers. |
| JPC-028 | P1 | Resolved | Finance movement and Internal tenant Worklists lacked canonical outcomes and readable dense tables. | Official financial and tenant-access states, typed actions and token-backed widths now pass two route plays, 196 CRM tests and six responsive checks with zero clipped cells. |
| JPC-029 | P1 | Resolved | Kanban pages selected cards without completing their canonical domain lifecycles. | Controlled official Sales, Finance and Operation boards now pass four lifecycle plays, 197 CRM tests and twelve responsive checks with fixed full-height drawers. |
| JPC-030 | P1 | Resolved | Usage and Billing mount canonical drawers as contained right-panel rails. | Removed the placement variant, routed all five Usage/Billing drawers through the shell drawer slot, and recorded final static browser evidence for fixed full-height geometry plus close/reopen behavior. |

Findings remain open until the implementation, tests, static evidence, and
regression checks are recorded. Detection alone does not change component or
route certification status.
