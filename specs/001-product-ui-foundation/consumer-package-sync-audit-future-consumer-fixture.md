# Consumer Package Sync Audit

Generated: 2026-07-09T19:44:17.204Z

Consumer: `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-115032`

Source: `C:\Users\lucas\taliya-product-ui\dist-packages`

Vendor: `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-115032\vendor\taliya-product-ui`

Status: fail

This audit compares SHA-256 hashes for local Taliya package tarballs and installed public package files so a consumer cannot accidentally validate against stale vendor packages or stale `node_modules` contents.

| Package | Source exists | Vendor exists | Source SHA-256 | Vendor SHA-256 | Status |
| --- | --- | --- | --- | --- | --- |
| `taliya-tokens-0.0.0.tgz` | yes | yes | `7e3a61f67cb3` | `7e3a61f67cb3` | pass |
| `taliya-ui-0.0.0.tgz` | yes | yes | `2e34f0f0b8da` | `2e34f0f0b8da` | pass |
| `taliya-crm-0.0.0.tgz` | yes | yes | `ab927112f3fe` | `ab927112f3fe` | pass |
| `taliya-product-ui-local-manifest.json` | yes | yes | `a5cf85339d6b` | `a5cf85339d6b` | pass |

## Installed Package Files

| Package | File | Source exists | Installed exists | Source SHA-256 | Installed SHA-256 | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `@taliya/tokens` | `README.md` | yes | yes | `7a57824476ad` | `7a57824476ad` | pass |
| `@taliya/tokens` | `dist/index.d.ts` | yes | yes | `da9139af87f5` | `0ac15806f161` | fail |
| `@taliya/tokens` | `dist/index.js` | yes | yes | `6e83589da4d0` | `8e77b1092135` | fail |
| `@taliya/tokens` | `src/tokens.css` | yes | yes | `fb7e9623dcfb` | `832c0a3283c1` | fail |
| `@taliya/ui` | `README.md` | yes | yes | `bea1ba76face` | `bea1ba76face` | pass |
| `@taliya/ui` | `dist/index.d.ts` | yes | yes | `0515a83ba9cc` | `ce2d6fcabd7e` | fail |
| `@taliya/ui` | `dist/index.js` | yes | yes | `02a1ddb82977` | `25f34d7f4c68` | fail |
| `@taliya/ui` | `src/styles.css` | yes | yes | `9c869db8d70f` | `8c2e4a394e7b` | fail |
| `@taliya/crm` | `README.md` | yes | yes | `180712aa6b5a` | `180712aa6b5a` | pass |
| `@taliya/crm` | `dist/index.d.ts` | yes | yes | `724034b6e5c2` | `2d2e3d5108fb` | fail |
| `@taliya/crm` | `dist/index.js` | yes | yes | `83f6bfa415af` | `6fb40af9700f` | fail |
| `@taliya/crm` | `dist/standard-page-kit.d.ts` | yes | yes | `b7bd31564e6a` | `b7bd31564e6a` | pass |
| `@taliya/crm` | `dist/standard-page-kit.js` | yes | yes | `58a68f8c5f47` | `58a68f8c5f47` | pass |
| `@taliya/crm` | `src/styles.css` | yes | yes | `dfb4ef3ce2ac` | `3300fe230173` | fail |
