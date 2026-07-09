# Current Implementation Baseline

Purpose: record the current accepted implementation baseline so future page coverage does not drift back into one-off screen CSS or static mock composition.

Date: 2026-06-15

## Accepted Operational Baseline: Hoje

Status: accepted by product review as `ok / 99% visual baseline`.

Source images:

- `17_round-4.1A_hoje_01_acima-da-dobra.png.png`
- `18_round-4.1A_hoje_02_drawer-tarefa.png.png`
- `20_round-4.1A_hoje_04_historico-de-hoje.png.png`

Storybook / preview:

- `CRM / Image Coverage / Hoje / 17 hoje base`
- `CRM / Image Coverage / Hoje / 18 hoje drawer tarefa`
- `CRM / Image Coverage / Hoje / 20 historico de hoje`
- static preview: `http://127.0.0.1:6206/today-preview.html?image=18`

Acceptance meaning:

- The page is accepted as the current shell/content-interaction baseline for building the next CRM logged-in pages.
- It is not a pixel-perfect 1:1 approval. It is the approved 99% operational composition pattern for app shell, sidebar, topbar, dashboard cards, task drawer, and activity/history feed.
- Images 17, 18, and 20 have explicit 99% visual-acceptance evidence in `tmp/visual-audit/batch11/today-17-visual-acceptance-20260707`, `tmp/visual-audit/batch11/today-18-visual-acceptance-20260707`, and `tmp/visual-audit/batch11/today-20-visual-acceptance-20260707`.
- Future pages must reuse this baseline unless a later approved image creates a deliberate new component contract.

## Official App Shell Contract

The SaaS CRM app shell must use `CrmProductShell` as the official page shell.

Required composition:

- `CrmProductShell`
- `CrmEmptyShellWindow`
- `ProductWindowFrame`
- `CrmBrowserChrome`
- `CrmShellSidebar`
- `CrmEmptyShellTopbar`
- `CrmShellTopNav`
- `CrmShellGlobalActions`
- `CrmShellAvatar`
- product page header
- content slot
- optional page-level drawer

Shell rules:

- Shell consumes official `@taliya/tokens` surfaces, borders, shadows, focus, hover, selected, spacing, and motion tokens.
- Shell must occupy the real viewport for app preview usage.
- Browser chrome, topbar, and sidebar remain visually stable while page content scrolls.
- Page content owns vertical scroll; sidebar must not require its own scroll in the current compact rail pattern.
- `CrmProductShell` exposes real callbacks for `onNavChange`, `onSidebarSelect`, and `onSidebarUtilitySelect`.
- The shell must not hardcode a full page; page-specific content belongs in the content slot and official drawers.

## Official Sidebar Contract

The CRM sidebar must use:

- `CrmShellSidebar`
- `CrmSidebarNavigation`
- `CrmSidebarUtilityNavigation`
- `CrmSidebarFloatingButton`
- `CrmShellBrand`

Sidebar rules:

- `CrmSidebarFloatingButton` composes the official `IconButton` primitive through the CRM shell bridge.
- Navigation items support default, hover, focus-visible, active/pressed, selected/current, alert, and disabled states.
- `CrmSidebarNavigation` and `CrmSidebarUtilityNavigation` expose `onSelect`.
- Active navigation uses `aria-current="page"` and selected visual state.
- Utility navigation must not create a parallel `CRM / Shell / Primitives` namespace. Reusable controls stay under `Primitives / UI`; CRM shell components stay under `CRM / Shell / Components`.

## Official Topbar Contract

The CRM topbar must use:

- `CrmEmptyShellTopbar`
- `CrmShellTopNav`
- `SegmentedControl variant="shell"`
- `CrmShellGlobalActions`
- `CrmTopbarActionButton`
- `CrmShellAvatar`

Topbar rules:

- Top navigation is a real segmented control, not static pills.
- `CrmShellTopNav` exposes `onChange`.
- `CrmEmptyShellTopbar` passes `onNavChange`.
- Active item must set `aria-pressed` through the primitive and `aria-current="page"` when current.
- Hover/focus/active states must come from official tokens.

## Official Hoje Content Contract

The accepted Hoje page uses:

- `DashboardGrid columns="today"`
- `CrmOperationalPanel`
- `CrmOperationalRows`
- `CrmOperationalRow`
- `TaskDrawer`
- `ActivityFeed`
- official chips, icons, buttons, status dots, and shell primitives.

Content rules:

- Every card row is a real button when actionable.
- `CrmOperationalRows` exposes `onRowOpen`.
- Each `CrmOperationalRow` supports selected and disabled states.
- Selected rows set `aria-pressed`.
- Hover background must be visibly different from the default row background.
- Focus must be drawn inside the row to avoid clipping.
- Text must not clip; long text uses truncation or safe wrapping depending on the component contract.
- Drawer header and footer remain sticky; the middle body scrolls when needed.
- Drawer footer actions must not wrap into broken rows.
- Activity feed filter/export/event rows expose real callbacks and disabled/loading/blocked behavior.

## Current Token Decisions

The current product shell row hover token is:

- `surface.product-row-hover = var(--taliya-surface-field-disabled)`
- `color.crm-product-shell.row-hover-bg = var(--taliya-surface-product-row-hover)`

Reason:

- The previous hover surface was white-on-white and visually imperceptible inside light panels.
- The new alias keeps hover subtle but visible and applies globally to shell rows using the official CRM product-shell row hover token.

## Next Page Recommendation

Recommended next page: Image 21, `Operacao / Kanban Geral`.

Source image:

- `21_round-4.1B_operacao_01_kanban-geral.png.png`

Why next:

- It is the first logged-in CRM page after Hoje in the official coverage sequence.
- It reuses the now-standard app shell, sidebar, topbar, page header, card surfaces, chips, icon buttons, hover/focus tokens, and dashboard/page content surface rhythm.
- It validates that the shell baseline generalizes beyond a dashboard layout.

Primary components expected:

- `CrmProductShell`
- `CrmShellSidebar`
- `CrmShellTopNav`
- `DashboardGrid` or page content grid where applicable
- `KanbanBoard`
- `KanbanColumn`
- `KanbanCard`
- `FilterBar`
- `FilterChip`
- `Chip`
- `IconButton`
- `Button`

Pre-implementation diagnostic required:

- Open the approved source image 21.
- Map shell, page header, filters, board area, columns, cards, empty/loading/blocked possibilities, and drawer expectations.
- Confirm all shell/topbar/sidebar pieces use the accepted baseline from this file.
- Check whether `KanbanBoard`, `KanbanColumn`, and `KanbanCard` already satisfy the current hover/focus/selected/disabled quality bar.
- Do not create a one-off image-21 shell or one-off kanban CSS if an official component already exists.
