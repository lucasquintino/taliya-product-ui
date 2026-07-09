# Consumer Refresh Audit

Generated: 2026-07-07T11:42:04.854Z

Status: pass

Mode: `check`

Consumer: `C:\Users\lucas\taliya-internal`

Vendor: `vendor/taliya-product-ui`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

This audit orchestrates the local package refresh flow for a consumer: vendor sync, package.json dependency sync, package install plan or install, lockfile alignment, and installed package sync.

| Step | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `vendor-sync` | `node scripts/sync-consumer-vendor.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 79 |
| `dependency-sync` | `node scripts/sync-consumer-dependencies.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 69 |
| `install-plan` | `node scripts/install-consumer-packages.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 64 |
| `lockfile` | `node scripts/audit-consumer-lockfile.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 67 |
| `package-sync` | `node scripts/audit-consumer-package-sync.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui` | pass | 0 | 84 |
