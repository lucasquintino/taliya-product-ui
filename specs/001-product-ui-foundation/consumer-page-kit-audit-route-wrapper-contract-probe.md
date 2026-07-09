# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-route-wrapper-contract-probe-QTGSp1`
Config: `../AppData/Local/Temp/taliya-page-kit-route-wrapper-contract-probe-QTGSp1/taliya-page-kit.config.json`

Status: Fail

## Config

Status: Pass

- Schema valid

## Standard Page Kit Manifest

Status: Pass
Manifest: `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`
Manifest components: 52
Required package components: 1
Outside manifest: None

## Surfaces

| Surface | File | Required components | Forbidden fragments/text | Status |
| --- | --- | --- | --- | --- |
| `crm-work-list` | `features/crm/work-list/work-list-page.tsx` | Pass `WorkListDetailPage` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |
| `/crm` | `app/crm/page.tsx` found:yes | Pass `WorkListPage` import:yes jsx-in-route:yes | Pass |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| None | None | None | None | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| `/crm` | `WorkListPage` from `@/features/crm/work-list/work-list-page` | missing-component-contract | Fail |

## Route Coverage

Status: Pass
Enabled: No





