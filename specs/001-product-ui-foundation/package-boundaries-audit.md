# Package Boundaries Audit

This audit checks dependency direction and source imports for the standalone Taliya Product UI library.

Status: Pass

| Package | Declared Taliya deps | Dependency status | Forbidden source imports | Status |
| --- | --- | --- | --- | --- |
| `@taliya/tokens` | None | Pass | 0 | Pass |
| `@taliya/ui` | `@taliya/tokens` | Pass | 0 | Pass |
| `@taliya/crm` | `@taliya/tokens`, `@taliya/ui` | Pass | 0 | Pass |
| `@taliya/docs` | `@taliya/crm`, `@taliya/tokens`, `@taliya/ui` | Pass | 0 | Pass |

## Forbidden Matches

- `@taliya/tokens`: none.
- `@taliya/ui`: none.
- `@taliya/crm`: none.
- `@taliya/docs`: none.
