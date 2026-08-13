# Consumer Refresh Audit

Generated: 2026-08-13T00:32:25.734Z

Status: pass

Mode: `check`

Consumer: `C:\Users\lucas\taliya-internal`

Vendor: `vendor/taliya-product-ui`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

This audit orchestrates the local package refresh flow for a consumer: vendor sync, package.json dependency sync, package install plan or install, lockfile alignment, and installed package sync.

| Step | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `vendor-sync` | `node scripts/sync-consumer-vendor.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 131 |
| `dependency-sync` | `node scripts/sync-consumer-dependencies.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 130 |
| `install-plan` | `node scripts/install-consumer-packages.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 125 |
| `lockfile` | `node scripts/audit-consumer-lockfile.mjs --check --consumer C:\Users\lucas\taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 107 |
| `registry-adoption` | `node scripts/audit-registry-consumer-adoption.mjs --check --consumer C:\Users\lucas\taliya-internal` | pass | 0 | 110 |
