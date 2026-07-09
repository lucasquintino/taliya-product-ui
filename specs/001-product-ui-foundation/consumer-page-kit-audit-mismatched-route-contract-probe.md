# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-mismatched-route-contract-probe-8zdZq7`
Config: `../AppData/Local/Temp/taliya-page-kit-mismatched-route-contract-probe-8zdZq7/taliya-page-kit.config.json`

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
| `landing` | `features/internal/landing/landing-workspace.tsx` | Pass `PageFilterBar` import:yes jsx:yes | None | Pass |
| `leads` | `features/internal/leads/leads-workspace.tsx` | Pass `WorkListDetailPage` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |
| `/internal/landing` | `app/internal/landing/page.tsx` found:yes | Pass `LandingWorkspace` import:yes jsx-in-route:yes | Pass |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| `leads-workspace-wrapper` | `features/internal/leads/leads-workspace.tsx` | `LeadsWorkspace` found:yes | Pass `WorkListDetailPage` import:yes jsx-in-component:yes | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| `/internal/landing` | `LandingWorkspace` from `@/features/internal/landing/landing-workspace` | `leads-workspace-wrapper` (linked-by-id) | Fail |

## Route Coverage

Status: Pass
Enabled: No





