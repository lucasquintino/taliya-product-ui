# Consumer Runtime Audit

Generated: 2026-08-11T19:45:42.892Z

Consumer: `C:\Users\lucas\taliya-internal`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 2723 |
| `lint` | `npm run lint` | pass | 0 | 6834 |
| `test` | `npm run test` | pass | 0 | 115696 |
| `build` | `npm run build` | pass | 0 | 7504 |

## Missing Scripts

- None
