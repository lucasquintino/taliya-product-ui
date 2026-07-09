# Release Policy Audit

Generated: 2026-07-07T11:42:05.370Z

Status: pass-current-local-policy

This audit validates the versioned release policy for the current local tarball channel and the future registry channel. It does not publish packages.

## Summary

- Current channel: `local-tarball`
- Current package version: `0.0.0`
- Registry ready: `false`
- Registry version ready: `false`
- Registry decision ready: `false`

## Rows

| Area | Status | Evidence | Note |
| --- | --- | --- | --- |
| `contract-present` | pass | contracts/release-policy.json | release policy JSON contract exists |
| `contract-doc-present` | pass | contracts/release-policy.md | release policy markdown contract exists |
| `schema-version` | pass | contracts/release-policy.json | schemaVersion must be 1 |
| `current-channel` | pass | local-tarball | current channel must be local-tarball or registry |
| `local-manifest` | pass | dist-packages/taliya-product-ui-local-manifest.json | current local channel must point at the generated local release manifest |
| `consumer-refresh-commands` | pass | contracts/release-policy.json | local channel must name the official consumer refresh commands |
| `source-package-jsons` | pass | packages/tokens/package.json, packages/ui/package.json, packages/crm/package.json | release policy must cover tokens, ui, and crm package manifests |
| `package-versions-aligned` | pass | packages/tokens/package.json=0.0.0, packages/ui/package.json=0.0.0, packages/crm/package.json=0.0.0 | all public packages must share the same release version |
| `registry-required-items` | pass | semver-version, registry-target-and-access, controlled-publish-workflow, consumer-dependency-migration | registry gate must explicitly require semver, registry/access, controlled publish, and consumer migration decisions |
| `registry-status` | pass | not-configured | registry status must be explicit |
| `consumer-migration-policy` | pass | contracts/release-policy.json | consumer migration policy must preserve local audits until registry adoption passes |

## Registry Blockers

- packages still use placeholder version 0.0.0; choose a real semver release version
- registry target and access model are not configured in release policy
- controlled publish/provenance workflow is not configured in release policy
- consumer dependency migration policy from local tarballs to registry ranges is not configured in release policy
