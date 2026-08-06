# Inbox Global Drawer Browser Evidence

Date: 2026-08-05  
Artifact: `apps/docs/storybook-static`  
Route: `crm-image-coverage-inbox--image-24-d-inbox-conversa-aberta`  
Viewport: 2560 x 1440 (the browser backend retained its default viewport)

## Result

The Inbox conversation is now mounted through `ConversationDrawer -> CrmDrawer`, the same global drawer contract used by Hoje. The drawer is fixed to the viewport with `top: 0`, `right: 0`, `bottom: 0`, width `420px`, height `1440px`, and z-index `50`.

The three-pane page keeps only the list and conversation content columns while the drawer is open. The right contextual rail is `display: none`, the page has one `main` landmark, and horizontal overflow is zero.

Close and reopen were exercised. Closing unmounted the drawer without adding root overflow; reopening restored the same fixed, full-height geometry. Runtime logs were empty.

## Comparison With Hoje

The Hoje reference route `crm-image-coverage-hoje--image-18-hoje-drawer-tarefa` produced the same drawer geometry: fixed, flush to the top/right/bottom viewport edges, 420px wide, full viewport height, one main landmark, and zero horizontal overflow.

This resolves the Inbox-specific regression where the drawer was rendered as a contained third pane and displaced or clipped the page layout.
