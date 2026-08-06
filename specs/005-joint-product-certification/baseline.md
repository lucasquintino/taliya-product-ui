# Certification Baseline

Captured: 2026-08-04 (America/Sao_Paulo)

## Repository State

- Product UI: `main` at `c90e8eb`, matching `origin/main` for tracked files.
- Internal consumer: `main` at `f48ee26`, matching `origin/main` for tracked files.
- Official source folder is available at the current Mac path.
- Two pre-existing untracked Product UI audit reports and three pre-existing
  untracked Internal vendor archives are preserved and are not part of this
  certification change.

## Existing Evidence

- Covered visual targets: 73.
- Previously human-reviewed visual targets: 35 pass, 0 fail, 38 pending.
- Story files: 338.
- CRM component registry entries: 272.
- Package versions: `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` at `0.1.0`.

The previous 35 passes remain visual and interaction evidence. Under the joint
certification, their product-purpose and product-owner decisions begin pending.

## Initial Gate Run

| Gate | Result | Note |
| --- | --- | --- |
| Token governance | Pass | Current checked report matches source. |
| Component architecture | Pass | 272 CRM components scanned; no refactor or missing-primitive rows. |
| Storybook anatomy strict | Pass | Zero story debt selectors; 26 capture harness selectors. |
| Full image page coverage | Pass | All 73 covered targets are indexed and source-backed. |
| Public API surface | Pass | Current policy manifest passes. |
| Package boundaries | Pass | Dependency direction passes. |
| Domain wrappers | Pass | 28 wrappers scanned; zero failed. |
| Drawer lifecycle | Stale | Zero failed rows, but the report must be regenerated. |
| Human route review | In progress | 35/73 pass; this is not joint product certification. |

## First Findings

1. The existing route ledger proves browser-observed visual and interaction
   checks, but does not map every target to required product blocks, actions,
   states, destinations, and product-owner approval.
2. The 73 visual targets must be normalized into canonical product surfaces.
3. Automated architecture checks do not prove that 272 registered CRM components
   are all necessary, non-duplicated, visually reviewed, or correctly public.
4. Drawer lifecycle evidence is stale and cannot be used as final evidence until
   regenerated.
5. The local future-consumer fixture passes from fresh local package tarballs,
   but the real Internal registry consumer fails installed contract parity:
   source and npm currently expose different `@taliya/crm` APIs under `0.1.0`.
