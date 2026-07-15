# Consumer Runtime Audit

Generated: 2026-07-09T22:11:26.784Z

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-product-ui-impl/tmp/future-consumer-readiness-fixture-9112`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 480 |
| `lint` | `npm run lint` | pass | 0 | 477 |
| `test` | `npm run test` | pass | 0 | 467 |
| `build` | `npm run build` | pass | 0 | 429 |

## Missing Scripts

- None
