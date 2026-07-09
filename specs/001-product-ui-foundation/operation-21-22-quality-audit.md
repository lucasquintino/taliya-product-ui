# Operation Images 21-22 Quality Audit

Source images:

- `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508/21_round-4.1B_operacao_01_kanban-geral.png.png`
- `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508/22_round-4.1B_operacao_02_kanban-com-drawer.png`

Status: implementation audit for image coverage. This is not final visual approval.

## Concrete Anatomy

| Region | Image 21 source anatomy | Image 22 source anatomy | Official owner |
| --- | --- | --- | --- |
| Shell/chrome | Full browser-like CRM product shell, fixed sidebar/topbar, white/cool product page surface | Same shell with right drawer occupying the right side and content compressed/occluded behind | `CrmProductShell`, `CrmBrowserChrome`, `Sidebar`, `Topbar`, `GlobalActions`, product-shell tokens |
| Sidebar | Taliya brand, stacked circular navigation buttons, selected/utility controls, no sidebar scroll | Same | `CrmProductShell` sidebar composition and `IconButton` primitives |
| Topbar | Back button, segmented product nav with `Pendências` active, global search/mail/bell/avatar cluster | Same, topbar stops before drawer area | `CrmShellTopNav`, `NavPill`, `IconButton`, `Avatar` |
| Page header | `Operação`, subtitle `Studio Vila Mariana • Pendências em acompanhamento` | Same | `PageHeader` area inside `CrmProductShell` |
| Filters/actions | Large search pill, five filter buttons, two round actions at right | Same, visible width reduced by drawer | `FilterBar`, `SearchInput`, `Button`, `IconButton`, `FilterChip` where chip behavior is needed |
| Kanban board | One board surface with quick-filter rail and five lanes: Novo, Assumido, Aguardando, Bloqueado, Resolvido | Same board; first card selected in dark state | `KanbanBoard`, `KanbanColumn`, `KanbanCard`, kanban tokens |
| Cards | Interactive cards with menu, tags, facts, status chips; selected state not active in image 21 | First `Reposição da Ana sem encaixe` selected, dark background, text inverted | `KanbanCard`, `Chip`, `IconButton`, `Button` behavior |
| Badges/status | Count badges in lane headers; colored status chips inside cards | Same | `Badge`, `Chip`, status/kanban tokens |
| Activity recent | Bottom table-like activity panel with clickable rows, avatar, actor/action/object/meta/status | Same visible under board, partly behind drawer | New official `OperationActivityTable` component required; story-only markup is not acceptable |
| Drawer | None | Right case drawer: close, title, status chip, facts, alternatives, copilot suggestion, message suggestion, short history, footer actions | `CaseDrawer` and drawer tokens; future refactor may compose `DrawerHeader/DrawerSection/DrawerFooter` if required |

## Expected States And Behavior

| Component | Required states/behavior | Current owner |
| --- | --- | --- |
| `KanbanCard` | hover, focus, active, selected, disabled, menu action, select callback | `@taliya/crm` |
| `KanbanColumn` | default, waiting, blocked, resolved, empty, loading, blocked | `@taliya/crm` |
| `KanbanBoard` | rail slot, five-column layout, source dimensions, empty/child passthrough | `@taliya/crm` |
| `OperationActivityTable` | source, selected row, hover, focus, loading, empty, blocked, row callback | `@taliya/crm` |
| `CaseDrawer` | open, close callback, loading, blocked, resolved, action callbacks, fixed shell placement | `@taliya/crm` |
| Filters | search input typing, selected filter state, hover/focus, icon actions | `@taliya/ui` primitives composed in story |
| Shell nav/sidebar | active state, hover/focus, cursor pointer, no sidebar scroll | `@taliya/crm` shell components |

## Gaps Found Before This Correction

| Gap | Severity | Owner | Required correction |
| --- | --- | --- | --- |
| Activity recent was implemented as story-local markup/CSS | P1 architecture | `@taliya/crm` | Promote to official `OperationActivityTable`, add story/test, use it in image coverage |
| Drawer did not open/close from local page state | P1 behavior | image coverage composition | Selected card must open drawer; drawer close must hide it |
| Image 22 initial state was hardcoded by story prop only | P1 behavior | image coverage composition | Initialize selected card/drawer for image 22, but keep interaction real |
| `CaseDrawer` tokens existed in spec but not fully materialized in token output before correction | P1 token governance | `@taliya/tokens` | Materialize `crm-case-drawer.*` tokens and keep product shell placement official |
| Visual screenshot comparison was blocked by missing local Playwright Chromium | P1 validation | environment/tooling | Build static Storybook and capture when browser binary is available; do not mark approved before review |

## Quality Decision

The correct path is to keep image coverage as page composition only:

- official shell and primitives;
- official kanban components;
- official `CaseDrawer`;
- official `OperationActivityTable`;
- no one-off visual component internals inside the coverage story.

If product review rejects visual spacing/color/alignment, the fix must land in official tokens/components, not in screen-only CSS.
