# Consumer Runtime Audit

Generated: 2026-07-09T19:44:22.463Z

Consumer: `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-readiness-fixture-115032`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 987 |
| `lint` | `npm run lint` | pass | 0 | 1279 |
| `test` | `npm run test` | pass | 0 | 1106 |
| `build` | `npm run build` | pass | 0 | 1150 |

## Missing Scripts

- None
