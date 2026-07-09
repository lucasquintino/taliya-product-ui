# Consumer Lockfile Audit

Generated: 2026-07-07T11:42:04.754Z

Status: pass

This audit checks whether the consumer `package-lock.json` is aligned with the local release manifest. It prevents a consumer from having correct vendor tarballs and dependency declarations while the lockfile still points at stale local package tarballs.

Consumer: `C:\Users\lucas\taliya-internal`

Lockfile: `C:\Users\lucas\taliya-internal\package-lock.json`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

| Package | Lock entry | Expected version | Lock version | Root dependency | Resolved tarball | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `@taliya/tokens` | yes | `0.0.0` | `0.0.0` | pass | pass | pass |
| `@taliya/ui` | yes | `0.0.0` | `0.0.0` | pass | pass | pass |
| `@taliya/crm` | yes | `0.0.0` | `0.0.0` | pass | pass | pass |
