# Release Policy Contract

This contract defines how `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm` move from the current local tarball channel to the controlled npm registry channel.

## Current Channel

- Current channel: `local-tarball`
- Local manifest: `dist-packages/taliya-product-ui-local-manifest.json`
- Consumer vendor directory: `vendor/taliya-product-ui`
- Consumer refresh command: `corepack pnpm consumer-refresh:apply`
- Consumer audit command: `corepack pnpm consumer-refresh:audit`

The local tarball channel is the official current channel for `taliya-internal` and for starting the first real CRM app before registry publication is configured.

## Registry Gate

Registry publication is configured but remains manual and environment-protected. The three packages share version `0.1.0`, use public access on npm, and publish only through `.github/workflows/publish-packages.yml` with npm provenance.

- `semver-version`: Changesets keeps all three packages in one fixed version group.
- `registry-target-and-access`: `https://registry.npmjs.org/`, public scoped packages.
- `controlled-publish-workflow`: the environment-protected manual workflow requires `NPM_TOKEN` and requests OIDC provenance.
- `consumer-dependency-migration`: consumers move from vendored tarballs to a shared caret range after the first verified publish.

## Consumer Migration

Current consumers continue to use `vendor-local-tarballs`. After a verified publish they migrate all three dependencies to the same caret range, such as `^0.1.0`. Local package audits remain in place until registry-backed consumer adoption passes.

## Audit

Run:

```bash
corepack pnpm release-policy:audit
corepack pnpm registry-publication:audit:update
corepack pnpm release-channel:audit
```

`release-policy:audit` validates the configured policy and does not publish packages. `registry-publication:audit:update` verifies public npm metadata for the exact shared version; a dry run or configured workflow is not publication evidence. `release-channel:audit` keeps the local channel separate and cannot report registry readiness until all three public metadata rows pass.
