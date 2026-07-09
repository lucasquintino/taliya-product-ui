# Consumer Page Kit Audit

Consumer: `C:\Users\lucas\AppData\Local\Temp\taliya-page-kit-path-traversal-probe-P5zaK4`
Config: `../AppData/Local/Temp/taliya-page-kit-path-traversal-probe-P5zaK4/taliya-page-kit.config.json`

Status: Fail

## Config

Status: Fail

- surfaces[0].file must not traverse outside the consumer root
- componentContracts[0].file must be consumer-relative, not absolute
- routeCoverage.root must not traverse outside the consumer root

## Standard Page Kit Manifest

Status: Fail
Manifest: `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json`
Manifest components: 0
Required package components: 0
Outside manifest: None

## Surfaces

| Surface | File | Required components | Forbidden fragments/text | Status |
| --- | --- | --- | --- | --- |

## Routes

| Route | File | Required components | Status |
| --- | --- | --- | --- |

## Component Contracts

| Contract | File | Component | Required official render roots | Status |
| --- | --- | --- | --- | --- |
| None | None | None | None | Pass |

## Route Component Contract Coverage

| Route | Local component | Component contract | Status |
| --- | --- | --- | --- |
| None | None | None | Pass |

## Route Coverage

Status: Pass
Enabled: No





