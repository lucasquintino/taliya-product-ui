# Consumer Runtime Audit

Generated: 2026-08-05T19:25:09.104Z

Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`

Status: pass

This audit runs the consumer app runtime/build gates that prove the installed Taliya packages still work in the current consumer. It is not source-image 1:1 certification.

## Scripts

| Script | Command | Status | Exit code | Duration ms |
| --- | --- | --- | ---: | ---: |
| `typecheck` | `npm run typecheck` | pass | 0 | 13543 |
| `lint` | `npm run lint` | pass | 0 | 22087 |
| `test` | `npm run test` | pass | 0 | 46940 |
| `build` | `npm run build` | pass | 0 | 75348 |

## Missing Scripts

- None
