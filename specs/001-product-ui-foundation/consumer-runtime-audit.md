# Consumer Runtime Audit

Generated: 2026-08-09T02:57:22.763Z

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 6762 |
| `lint` | `npm run lint` | pass | 0 | 13288 |
| `test` | `npm run test` | pass | 0 | 21423 |
| `build` | `npm run build` | pass | 0 | 13079 |

## Missing Scripts

- None
