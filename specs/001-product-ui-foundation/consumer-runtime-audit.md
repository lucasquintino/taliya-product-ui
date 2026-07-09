# Consumer Runtime Audit

Generated: 2026-07-07T11:41:35.490Z

Consumer: `C:\Users\lucas\taliya-internal`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 2447 |
| `lint` | `npm run lint` | pass | 0 | 5749 |
| `test` | `npm run test` | pass | 0 | 9074 |
| `build` | `npm run build` | pass | 0 | 10695 |

## Missing Scripts

- None
