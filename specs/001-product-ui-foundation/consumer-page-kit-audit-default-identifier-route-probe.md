# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-default-identifier-route-probe-URDpS4`
Config: `../AppData/Local/Temp/taliya-page-kit-default-identifier-route-probe-URDpS4/taliya-page-kit.config.json`

Status: Pass

## Config

Status: Pass

- Schema valid

## Standard Page Kit Manifest

Status: Pass
Manifest: `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`
Manifest components: 52
Required package components: 2
Outside manifest: None

## Surfaces

| Surface | File | Required components | Forbidden fragments/text | Status |
| --- | --- | --- | --- | --- |
| `shell` | `components/internal-shell.tsx` | Pass `CrmProductShell` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |
| `/internal` | `app/internal/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `CockpitWorkspace` import:yes jsx-in-route:yes | Pass |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| `internal-shell-wrapper` | `components/internal-shell.tsx` | `InternalShell` found:yes | Pass `CrmProductShell` import:yes jsx-in-component:yes | Pass |
| `cockpit-workspace-wrapper` | `features/internal/cockpit/cockpit-workspace.tsx` | `CockpitWorkspace` found:yes | Pass `InternalOverviewDashboard` import:yes jsx-in-component:yes | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| `/internal` | `InternalShell` from `@/components/internal-shell` | `internal-shell-wrapper` (linked-by-id) | Pass |
| `/internal` | `CockpitWorkspace` from `@/features/internal/cockpit/cockpit-workspace` | `cockpit-workspace-wrapper` (linked-by-id) | Pass |

## Route Coverage

Status: Pass
Enabled: Yes
Root: `app/internal`
Root exists: Yes
Base route: `/internal`
Discovered routes: `/internal`
Uncovered routes: None
