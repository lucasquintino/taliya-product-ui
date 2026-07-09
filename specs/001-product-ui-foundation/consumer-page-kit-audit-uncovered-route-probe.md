# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-uncovered-route-probe-GKO76O`
Config: `../AppData/Local/Temp/taliya-page-kit-uncovered-route-probe-GKO76O/taliya-page-kit.config.json`

Status: Fail

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
| `cockpit` | `features/internal/cockpit/cockpit-workspace.tsx` | Pass `DashboardGrid` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |
| `/internal` | `app/internal/page.tsx` found:yes | Pass `InternalShell` import:yes jsx-in-route:yes<br />Pass `CockpitWorkspace` import:yes jsx-in-route:yes | Pass |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| None | None | None | None | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| `/internal` | `InternalShell` from `@/components/internal-shell` | missing-component-contract | Fail |
| `/internal` | `CockpitWorkspace` from `@/features/internal/cockpit/cockpit-workspace` | missing-component-contract | Fail |

## Route Coverage

Status: Fail
Enabled: Yes
Root: `app/internal`
Root exists: Yes
Base route: `/internal`
Discovered routes: `/internal`, `/internal/unconfigured`
Uncovered routes: `/internal/unconfigured`
