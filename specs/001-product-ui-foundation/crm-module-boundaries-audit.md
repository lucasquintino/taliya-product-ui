# CRM Module Boundaries Audit

Date: deterministic

Status: pass

## Summary

- Contracts: 9
- Failed: 0
- Main implementation: 3 lines / 93 bytes
- Component registry: 290 lines / 19591 bytes

| Contract | Status |
| --- | --- |
| component-registry-module | pass |
| component-registry-reexport | pass |
| component-registry-not-inline | pass |
| standard-page-kit-module | pass |
| package-does-not-import-docs | pass |
| package-does-not-import-landing | pass |
| runtime-modules-present | pass |
| legacy-runtime-facade | pass |
| runtime-module-size-budget | pass |

The component registry, standard page-kit, runtime composition families, and stylesheet have explicit module boundaries. The public runtime file is a thin compatibility facade and each runtime module remains within the 400 logical-line budget.
