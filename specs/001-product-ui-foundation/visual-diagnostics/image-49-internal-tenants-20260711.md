# Image 49 internal tenants diagnostic - 2026-07-11

Source: `49_round-4.1K_internal_02_tenants-lista-detalhe.png`

Story: `crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe`

## Assessment

- Source/current dimensions: `1672x941`.
- Baseline mean RGB delta: `15.70393317367421`; different pixels: `9.219233839598513%`.
- Final compiled-static mean RGB delta: `12.40776846715378`; different pixels: `7.823741921706014%`.
- Uses official `InternalWorklistPage contentLayout="internal-tenants" pageHeaderRhythm="internal-tenants"`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, `TenantSummaryDrawer`, and `InternalSecurityRulesPanel` contracts.
- Connected filter actions, selected tenant state, table row selection, security commands, and drawer close.
- No story-local worklist/table/drawer anatomy was added.

## Official family contract

- `TenantSummaryDrawer` replaces the semantically incorrect grant/security rail and composes `CrmDrawer`; it owns tenant facts, health, scoped access, activity, copilot and seven callbacks.
- Source-size DOM evidence: filter `x100 y174 w1146 h66`; quick rail `x100 y252 w164 h535`; table `x274 y252 w972 h535`; security `x100 y799 w1146 h104`; drawer `x1258 y98 w402 h804`; no vertical overflow.
- Final evidence: `tmp/image49-tenant-summary-geometry-final-static-20260714/report.json`; SHA-256 `f75a706cb728388b3af2a2a6238c29d6836c9d4e127fba0f60e71062e424c66a`.
- Image 48 remained bit-identical in `tmp/image48-regression-after-image49-final-20260714/report.json`; Image 50 rendered valid in `tmp/image50-sentinel-after-image49-final-20260714/report.json`.

## Verdict

**Fail 1:1; semi-approved technical baseline.** Source geometry and tenant-summary anatomy are now official. Residual differences remain in typography/icons/avatar colors, checkbox/chip/table micro-density and antialiasing. Story coverage is not consumer-adoption proof.
