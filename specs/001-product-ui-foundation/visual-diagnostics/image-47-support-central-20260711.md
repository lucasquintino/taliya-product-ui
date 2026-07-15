# Image 47 support central diagnostic - 2026-07-11

Source: `47_round-4.1J_suporte_01_central-studio-taliya.png.png`

Story: `crm-image-coverage-suporte--support-central`

## Baseline

- Source/current dimensions: `1584x992`.
- Baseline mean RGB delta: `19.102244818573812`.
- Baseline different-pixel ratio: `9.758585709636741%`.
- `SupportTicketDrawer` was passed as a fixed compact drawer but was absent from the shell's official positioning and width-reservation selectors.
- The dashboard therefore compressed its asymmetric columns and left a large empty region before the ticket panel.
- Header, support-agent, table-selection, and drawer commands were visually present but not connected to page callbacks.

## Accepted reusable changes

- Integrated `SupportTicketDrawer` into official shell positioning for fixed, content, viewport, and floating placements.
- Added exact support-panel width reservation through the package-owned `:has(.tcrm-support-ticket-drawer)` shell contract.
- Configured the support page with `drawerPlacement="content"`, matching the source panel below the page header.
- Connected open-ticket, audit, suggested-question, ask-support, ticket-selection, drawer-close, and drawer-action callbacks.
- Kept all content in `CrmDashboardPage`, `SupportTicketDrawer`, `CrmWorklistTable`, and official UI primitives; no story-local CSS was added.
- Updated the dashboard-family audit to recognize official components with callback props; dashboard and domain-wrapper negative/positive contracts remain active.

## Evidence progression

- Baseline: delta `19.102244818573812`, different pixels `9.758585709636741%`.
- Accepted layout probe: `tmp/visual-audit/image47-support-layout-20260711`; delta `16.947283607235352`, different pixels `9.10620398242688%`.
- Cross-check Image 46 remained exactly stable at delta `17.31315975470854`, different pixels `9.904329211243543%`.
- The focused layout capture is source-sized and passed runtime inspection.

## Verdict

**Fail 1:1.** The reusable shell/drawer geometry is materially improved and the support family is now behaviorally complete. Remaining gaps include exact support sidebar/main column ratio, agent-panel composition and height, table density, source-specific icons/text, panel top/right offsets, footer fit, and antialiasing. Further refinements must stay in official dashboard, support panel/table/drawer, shell, or token contracts and preserve Image 46.

## Final official-family pass - 2026-07-14

- Promoted `CrmDashboardPage layoutVariant="support"` and `DashboardGrid columns="support"` so the package owns the `276px / main` tracks and `16px` gap.
- Promoted `CrmProductShell pageHeaderRhythm="support"` and `contentLayout="support"` so the package owns the compact header, content inset, `390px` drawer reservation and source-derived floating drawer boundaries.
- Promoted `SupportStatusSidebar`, `SupportAgentPanel`, and `SupportCentralWorkspace` to `@taliya/crm`; the coverage story now provides prepared data and callbacks only.
- Configured the official `CrmWorklistTable density="compact"` with the complete source column set and pagination. The final source-sized render has no text overlap or clipped pagination.
- Source-like geometry is now explicit: status rail `x=110`, width `276`; central workspace `x=402`, width `710`; drawer `x=1126`, width `390`, top `198`, bottom near `957`; agent panel top `198`, height `361`; ticket table top `575`, height `381`.
- Final compiled-static evidence: `tmp/image47-support-density-final-static-20260714/report.json`; source/current `1586x992`, mean RGB delta `14.399206048556591`, different-pixel ratio `8.302421897246064%`, current SHA-256 `595e41fdfdb0f26489b138e2f8425ae64cce6e5262d461085e6f0b64a02f92b4`.
- Regression sentinel `tmp/image46-regression-after-support-final-20260714/report.json` remained bit-identical to the accepted Image 46 render: delta `13.433268586692702`, different pixels `8.523039295448073%`, SHA-256 `0007f396...`.

## Final verdict

**Semi-approved, explicit failed 1:1.** The support page now uses a complete official structural family with package-owned shell, dashboard, status rail, agent workspace, worklist table and ticket drawer. Remaining differences are typography/icon rasterization, shell micro-details, support-panel/table micro-density and antialiasing. Product review may accept this as the official reusable baseline; technical work should reopen only for a reusable hypothesis that preserves Image 46 and does not reintroduce story-local anatomy.
