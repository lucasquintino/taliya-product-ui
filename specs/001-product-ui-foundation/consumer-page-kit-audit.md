# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\taliya-internal`
Config: `../taliya-internal/taliya-page-kit.config.json`

Status: Pass

## Config

Status: Pass

- Schema valid

## Standard Page Kit Manifest

Status: Pass
Manifest: `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`
Manifest components: 52
Required package components: 30
Outside manifest: None

## Surfaces

| Surface | File | Required components | Forbidden fragments/text | Status |
| --- | --- | --- | --- | --- |
| `shell` | `components/internal-shell-client.tsx` | Pass `CrmProductShell` import:yes jsx:yes | None | Pass |
| `cockpit` | `features/internal/cockpit/cockpit-workspace.tsx` | Pass `InternalOverviewDashboard` import:yes jsx:yes<br />Pass `DashboardGrid` import:yes jsx:yes<br />Pass `CrmOperationalPanel` import:yes jsx:yes<br />Pass `CrmOperationalRows` import:yes jsx:yes<br />Pass `CrmRecordDrawer` import:yes jsx:yes<br />Pass `Chip` import:yes jsx:yes<br />Pass `InlineGroup` import:yes jsx:yes | None | Pass |
| `landing` | `features/internal/landing/landing-workspace.tsx` | Pass `PageFilterBar` import:yes jsx:yes<br />Pass `DashboardGrid` import:yes jsx:yes<br />Pass `CrmRecordDrawer` import:yes jsx:yes<br />Pass `DataTable` import:yes jsx:yes<br />Pass `Panel` import:yes jsx:yes<br />Pass `PanelBody` import:yes jsx:yes<br />Pass `PanelHeader` import:yes jsx:yes<br />Pass `List` import:yes jsx:yes<br />Pass `ListItem` import:yes jsx:yes | None<br />Text: None | Pass |
| `leads` | `features/internal/leads/leads-workspace.tsx` | Pass `WorkListDetailPage` import:yes jsx:yes<br />Pass `PageFilterBar` import:yes jsx:yes<br />Pass `PageQuickFilters` import:yes jsx:yes<br />Pass `CrmWorklistTable` import:yes jsx:yes<br />Pass `KanbanBoard` import:yes jsx:yes<br />Pass `CrmDrawer` import:yes jsx:yes<br />Pass `Button` import:yes jsx:yes<br />Pass `Modal` import:yes jsx:yes<br />Pass `FieldGrid` import:yes jsx:yes | None | Pass |
| `route-states` | `app/internal/loading.tsx` | Pass `StatePage` import:yes jsx:yes<br />Pass `LoadingState` import:yes jsx:yes | None | Pass |
| `route-errors` | `app/internal/error.tsx` | Pass `StatePage` import:yes jsx:yes<br />Pass `ErrorState` import:yes jsx:yes<br />Pass `Button` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |
| `/internal` | `app/internal/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `CockpitWorkspace` import:yes jsx-in-route:yes | Pass |
| `/internal/landing` | `app/internal/landing/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `LandingWorkspace` import:yes jsx-in-route:yes | Pass |
| `/internal/leads` | `app/internal/leads/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `LeadsWorkspace` import:yes jsx-in-route:yes | Pass |
| `/internal/leads/kanban` | `app/internal/leads/kanban/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `LeadsWorkspace` import:yes jsx-in-route:yes | Pass |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| `internal-shell-client-wrapper` | `components/internal-shell-client.tsx` | `InternalShellClient` found:yes | Pass `CrmProductShell` import:yes jsx-in-component:yes | Pass |
| `cockpit-workspace-wrapper` | `features/internal/cockpit/cockpit-workspace.tsx` | `CockpitWorkspace` found:yes | Pass `InternalOverviewDashboard` import:yes jsx-in-component:yes<br />Pass `DashboardGrid` import:yes jsx-in-component:yes<br />Pass `CrmOperationalPanel` import:yes jsx-in-component:yes<br />Pass `CrmOperationalRows` import:yes jsx-in-component:yes<br />Pass `Chip` import:yes jsx-in-component:yes<br />Pass `InlineGroup` import:yes jsx-in-component:yes | Pass |
| `cockpit-attention-row-wrapper` | `features/internal/cockpit/cockpit-workspace.tsx` | `CockpitWorkspace` found:yes | Pass `CrmOperationalRows` import:yes jsx-in-component:yes | Pass |
| `cockpit-drawer-wrapper` | `features/internal/cockpit/cockpit-workspace.tsx` | `CockpitDrawer` found:yes | Pass `CrmRecordDrawer` import:yes jsx-in-component:yes | Pass |
| `landing-workspace-wrapper` | `features/internal/landing/landing-workspace.tsx` | `LandingWorkspace` found:yes | Pass `PageFilterBar` import:yes jsx-in-component:yes<br />Pass `DashboardGrid` import:yes jsx-in-component:yes<br />Pass `MetricCard` import:yes jsx-in-component:yes<br />Pass `CrmOperationalRow` import:yes jsx-in-component:yes<br />Pass `DataTable` import:yes jsx-in-component:yes<br />Pass `Panel` import:yes jsx-in-component:yes<br />Pass `PanelBody` import:yes jsx-in-component:yes<br />Pass `PanelHeader` import:yes jsx-in-component:yes<br />Pass `List` import:yes jsx-in-component:yes<br />Pass `ListItem` import:yes jsx-in-component:yes | Pass |
| `landing-drawer-wrapper` | `features/internal/landing/landing-workspace.tsx` | `LandingDrawer` found:yes | Pass `CrmRecordDrawer` import:yes jsx-in-component:yes | Pass |
| `leads-workspace-wrapper` | `features/internal/leads/leads-workspace.tsx` | `LeadsWorkspace` found:yes | Pass `WorkListDetailPage` import:yes jsx-in-component:yes<br />Pass `PageFilterBar` import:yes jsx-in-component:yes<br />Pass `PageQuickFilters` import:yes jsx-in-component:yes<br />Pass `CrmDrawer` import:yes jsx-in-component:yes | Pass |
| `leads-list-wrapper` | `features/internal/leads/leads-workspace.tsx` | `LeadListTable` found:yes | Pass `CrmWorklistTable` import:yes jsx-in-component:yes | Pass |
| `leads-kanban-wrapper` | `features/internal/leads/leads-workspace.tsx` | `LeadKanban` found:yes | Pass `KanbanBoard` import:yes jsx-in-component:yes<br />Pass `KanbanColumn` import:yes jsx-in-component:yes<br />Pass `KanbanCard` import:yes jsx-in-component:yes | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| `/internal` | `InternalShell` from `@/components/internal-shell` | `internal-shell-client-wrapper` (linked-by-id) | Pass |
| `/internal` | `CockpitWorkspace` from `@/features/internal/cockpit/cockpit-workspace` | `cockpit-workspace-wrapper` (linked-by-id) | Pass |
| `/internal/landing` | `InternalShell` from `@/components/internal-shell` | `internal-shell-client-wrapper` (linked-by-id) | Pass |
| `/internal/landing` | `LandingWorkspace` from `@/features/internal/landing/landing-workspace` | `landing-workspace-wrapper` (linked-by-id) | Pass |
| `/internal/leads` | `InternalShell` from `@/components/internal-shell` | `internal-shell-client-wrapper` (linked-by-id) | Pass |
| `/internal/leads` | `LeadsWorkspace` from `@/features/internal/leads/leads-workspace` | `leads-workspace-wrapper` (linked-by-id) | Pass |
| `/internal/leads/kanban` | `InternalShell` from `@/components/internal-shell` | `internal-shell-client-wrapper` (linked-by-id) | Pass |
| `/internal/leads/kanban` | `LeadsWorkspace` from `@/features/internal/leads/leads-workspace` | `leads-workspace-wrapper` (linked-by-id) | Pass |

## Route Coverage

Status: Pass
Enabled: Yes
Root: `app/internal`
Root exists: Yes
Base route: `/internal`
Discovered routes: `/internal`, `/internal/landing`, `/internal/leads`, `/internal/leads/kanban`
Uncovered routes: None
