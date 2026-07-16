# Consumer Lockfile Audit

Generated: 2026-07-16T12:34:41.005Z

Status: pass

This audit checks whether the consumer `package-lock.json` is aligned with its declared distribution channel. Local consumers must resolve the versioned vendor tarballs; registry consumers must resolve the exact published tarballs and integrity metadata.

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Channel: `npm-registry`

Lockfile: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal/package-lock.json`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

| Package | Lock entry | Expected version | Lock version | Root dependency | Resolved tarball | Integrity | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `@taliya/tokens` | yes | `0.1.0` | `0.1.0` | pass | pass | pass | pass |
| `@taliya/ui` | yes | `0.1.0` | `0.1.0` | pass | pass | pass | pass |
| `@taliya/crm` | yes | `0.1.0` | `0.1.0` | pass | pass | pass | pass |
