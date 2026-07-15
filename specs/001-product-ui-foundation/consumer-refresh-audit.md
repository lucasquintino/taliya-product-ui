# Consumer Refresh Audit

Generated: 2026-07-15T17:44:55.099Z

Status: pass

Mode: `check`

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Vendor: `vendor/taliya-product-ui`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

This audit orchestrates the local package refresh flow for a consumer: vendor sync, package.json dependency sync, package install plan or install, lockfile alignment, and installed package sync.

| Step | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `vendor-sync` | `node scripts/sync-consumer-vendor.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 60 |
| `dependency-sync` | `node scripts/sync-consumer-dependencies.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 40 |
| `install-plan` | `node scripts/install-consumer-packages.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 40 |
| `lockfile` | `node scripts/audit-consumer-lockfile.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json` | pass | 0 | 47 |
| `package-sync` | `node scripts/audit-consumer-package-sync.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui` | pass | 0 | 73 |
