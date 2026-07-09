# Release Policy Contract

This contract defines how `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` move from the current local tarball channel to a future registry-backed channel.

## Current Channel

- Current channel: `local-tarball`
- Local manifest: `dist-packages/taliya-product-ui-local-manifest.json`
- Consumer vendor directory: `vendor/taliya-product-ui`
- Consumer refresh command: `corepack pnpm consumer-refresh:apply`
- Consumer audit command: `corepack pnpm consumer-refresh:audit`

The local tarball channel is the official current channel for `taliya-internal` and for starting the first real CRM app before registry publication is configured.

## Registry Gate

Registry publication is not configured yet. Before `release-channel:audit` can report `pass-registry-release-channel`, these decisions must be explicit and versioned:

- `semver-version`: packages must stop using the placeholder `0.0.0` version.
- `registry-target-and-access`: registry target and package access model must be chosen.
- `controlled-publish-workflow`: publish/provenance must run from a controlled release machine or CI workflow.
- `consumer-dependency-migration`: consumers must have a documented migration path from `file:vendor/taliya-product-ui/*.tgz` to registry ranges.

## Consumer Migration

Current consumers use `vendor-local-tarballs`. The future registry range policy is `not-decided`; local package audits must remain in place until a registry consumer adoption gate passes.

## Audit

Run:

```bash
corepack pnpm release-policy:audit
corepack pnpm release-channel:audit
```

`release-policy:audit` validates the contract shape and records whether the policy is current-local or registry-ready. It does not publish packages.
