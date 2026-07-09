# Consumer Config Versioning Audit

Generated: 2026-07-07T11:40:46.700Z

Status: pass

This audit checks whether consumer-owned Taliya readiness config files exist, are parseable JSON, and are tracked by the consumer repository. It is part of the aggregate readiness gate for configured consumers.

Consumer: `C:\Users\lucas\taliya-product-ui\tmp\consumer-bootstrap-fixture`

Report label: `bootstrap-fixture`

Git repo: yes

Git root: `C:/Users/lucas/taliya-product-ui/tmp/consumer-bootstrap-fixture`

## Config Files

| File | Exists | JSON | Git tracked | Git status | Status |
| --- | --- | --- | --- | --- | --- |
| `taliya-readiness.config.json` | yes | valid | yes | `A  taliya-readiness.config.json` | Pass |
| `taliya-page-kit.config.json` | yes | valid | yes | `A  taliya-page-kit.config.json` | Pass |

## Summary

- Missing configs: None
- Invalid JSON configs: None
- Untracked configs: None
