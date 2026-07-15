# Consumer Refresh Audit

Generated: 2026-07-15T12:28:50.266Z

Status: pass

Mode: `write`

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Vendor: `vendor/taliya-product-ui`

Manifest: `dist-packages/taliya-product-ui-local-manifest.json`

This audit orchestrates the local package refresh flow for a consumer: vendor sync, package.json dependency sync, package install plan or install, lockfile alignment, and installed package sync.

| Step | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `vendor-sync` | `node scripts/sync-consumer-vendor.mjs --write --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json --report-label taliya-internal` | pass | 0 | 59 |
| `dependency-sync` | `node scripts/sync-consumer-dependencies.mjs --write --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json --report-label taliya-internal` | pass | 0 | 40 |
| `install-plan` | `node scripts/install-consumer-packages.mjs --write --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json --report-label taliya-internal` | pass | 0 | 1217 |
| `lockfile` | `node scripts/audit-consumer-lockfile.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --manifest dist-packages/taliya-product-ui-local-manifest.json --report-label taliya-internal` | pass | 0 | 45 |
| `package-sync` | `node scripts/audit-consumer-package-sync.mjs --check --consumer /Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal --vendor vendor/taliya-product-ui --report-label taliya-internal` | pass | 0 | 63 |
