# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-wrapper-contract-probe-LQ5CNV`
Config: `../AppData/Local/Temp/taliya-page-kit-wrapper-contract-probe-LQ5CNV/taliya-page-kit.config.json`

Status: Fail

## Config

Status: Pass

- Schema valid

## Standard Page Kit Manifest

Status: Pass
Manifest: `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`
Manifest components: 52
Required package components: 4
Outside manifest: None

## Surfaces

| Surface | File | Required components | Forbidden fragments/text | Status |
| --- | --- | --- | --- | --- |
| `leads` | `features/internal/leads/leads-workspace.tsx` | Pass `PageQuickFilters` import:yes jsx:yes<br />Pass `KanbanBoard` import:yes jsx:yes<br />Pass `KanbanColumn` import:yes jsx:yes<br />Pass `KanbanCard` import:yes jsx:yes | None | Pass |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| `leads-kanban-wrapper` | `features/internal/leads/leads-workspace.tsx` | `LeadKanban` found:yes | Fail `KanbanBoard` import:yes jsx-in-component:no<br />Fail `KanbanColumn` import:yes jsx-in-component:no<br />Fail `KanbanCard` import:yes jsx-in-component:no | Fail |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| None | None | None | Pass |

## Route Coverage

Status: Pass
Enabled: No





