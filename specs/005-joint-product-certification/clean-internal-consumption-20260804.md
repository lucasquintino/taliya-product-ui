# Clean Internal Consumption Evidence

Date: 2026-08-04

## Inputs

- Clean clone: `lucasquintino/taliya-internal`
- Clone commit: `f48ee26ca16aec0397f6352a861411decb805f0c`
- Temporary distribution channel: local tarballs generated from the current
  `taliya-product-ui` working tree.
- Package version under test: `0.1.0` for `@taliya/tokens`, `@taliya/ui`, and
  `@taliya/crm`.

The clone was switched to the local-tarball channel only for this disposable
certification run. The tracked Internal repository remains on the npm-registry
channel until a new certified package version is published.

## Consumer Correction

The clean clone initially failed TypeScript because `LeadsWorkspace` still
passed the removed `placement="overlay"` prop to `CrmDrawer`. The prop was
removed from the real Internal working tree and the clean test clone. The
consumer integration audit now rejects legacy drawer geometry props.

## Package Proof

- `consumer-refresh`: pass
- vendor tarball hashes match the current local release manifest: pass
- installed public files match package build output: pass
- installed contract markers: pass
- standard page-kit runtime manifest: pass
- consumer page-kit route coverage: pass
- forbidden local anatomy/CSS/import checks: pass
- legacy drawer geometry variants: zero

Generated diagnostic reports are kept under `tmp/jpc-clean-internal-reports`
during the active certification run.

## Runtime Proof

Executed with the required Node 24 runtime:

- TypeScript: pass
- ESLint: pass
- Vitest: 27 files passed, 165 tests passed
- Next production build: pass

The production build discovered and compiled these relevant routes:

- `/internal`
- `/internal/landing`
- `/internal/leads`
- `/internal/leads/kanban`

## Remaining Distribution Condition

This proves the current source is consumable from clean package inputs. It does
not resolve registry drift: npm still serves the older `0.1.0` contract. A new
version must be published and the tracked Internal lockfile refreshed before
registry-backed adoption can pass.
