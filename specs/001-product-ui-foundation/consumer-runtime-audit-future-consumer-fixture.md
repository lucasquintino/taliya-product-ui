# Consumer Runtime Audit

Generated: 2026-07-07T11:41:02.387Z

Consumer: `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-28920`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 859 |
| `lint` | `npm run lint` | pass | 0 | 911 |
| `test` | `npm run test` | pass | 0 | 894 |
| `build` | `npm run build` | pass | 0 | 946 |

## Missing Scripts

- None
