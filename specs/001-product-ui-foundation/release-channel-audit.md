# Release Channel Audit

Generated: 2026-07-07T11:42:05.883Z

Status: pass-local-release-channel

This report separates the current local install channel from a future registry publish channel. The local channel is enough for `taliya-internal` and for starting a real CRM app from vendored tarballs. Registry publication still needs explicit release decisions.

## Summary

- Local tarball channel ready: `true`
- Registry ready: `false`
- Current package version: `0.0.0`
- Package artifacts pass: `true`
- Local release manifest pass: `true`
- Local release manifest: `dist-packages/taliya-product-ui-local-manifest.json`
- Release policy: `pass-current-local-policy`
- Consumer package sync: `pass`
- Consumer vendor versioning: `pass`
- Consumer config versioning: `pass`
- Installed package status: `true`
- Installed contract status: `true`

## Packages

| Package | Version | Private | Tarball exists | Registry version ready |
| --- | --- | --- | --- | --- |
| `@taliya/tokens` | `0.0.0` | no | yes | no |
| `@taliya/ui` | `0.0.0` | no | yes | no |
| `@taliya/crm` | `0.0.0` | no | yes | no |

## Registry Blockers

- packages still use placeholder version 0.0.0; choose a real semver release version
- registry target and access model are not configured in release policy
- controlled publish/provenance workflow is not configured in release policy
- consumer dependency migration policy from local tarballs to registry ranges is not configured in release policy

## Meaning

- `pass-local-release-channel`: consumers can install the official library through the current local tarball/vendor flow, and the Internal consumer evidence is synchronized.
- `pass-registry-release-channel`: the package set and release policy are ready for a registry-backed release channel too.
- `fail`: the current local install channel is not reliable enough for consumer adoption.
