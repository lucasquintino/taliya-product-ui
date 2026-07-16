# Release Channel Audit

Generated: 2026-07-16T00:46:42.146Z

Status: pass-local-release-channel

This report separates the current local install channel from a future registry publish channel. The local channel is enough for `taliya-internal` and for starting a real CRM app from vendored tarballs. Registry publication still needs explicit release decisions.

## Summary

- Local tarball channel ready: `true`
- Registry ready: `false`
- Current package version: `0.1.0`
- Package artifacts pass: `true`
- Local release manifest pass: `true`
- Local release manifest: `dist-packages/taliya-product-ui-local-manifest.json`
- Release policy: `pass-registry-policy`
- Registry publication: `not-published`
- Registry consumer adoption: `not-adopted`
- Consumer package sync: `pass`
- Consumer vendor versioning: `pass`
- Consumer config versioning: `pass`
- Installed package status: `true`
- Installed contract status: `true`

## Packages

| Package | Version | Private | Tarball exists | Registry version ready |
| --- | --- | --- | --- | --- |
| `@taliya/tokens` | `0.1.0` | no | yes | yes |
| `@taliya/ui` | `0.1.0` | no | yes | yes |
| `@taliya/crm` | `0.1.0` | no | yes | yes |

## Registry Blockers

- npm registry publication is not proven for 0.1.0
- taliya-internal registry adoption is not proven

## Meaning

- `pass-local-release-channel`: consumers can install the official library through the current local tarball/vendor flow, and the Internal consumer evidence is synchronized.
- `pass-registry-release-channel`: the package set and release policy are ready for a registry-backed release channel too.
- `fail`: the current local install channel is not reliable enough for consumer adoption.
