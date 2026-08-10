# Registry Consumer Adoption Audit

Generated: 2026-08-10T22:24:24.514Z

Status: pass-registry-adoption

This report proves that the real Internal consumer uses the published npm packages rather than vendored tarball dependency sources.

- Consumer: `/Users/lucasquintino/Documents/Codex/2026-07-09/v/work/taliya-internal`
- Version: `0.1.1`
- Registry publication: pass
- Distribution config: pass
- No effective vendor dependencies: pass
- Adopted packages: 3/3

| Package | Dependency | Root lock | Locked version | Registry resolved | Installed | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `@taliya/tokens` | `^0.1.1` | `^0.1.1` | `0.1.1` | yes | `0.1.1` | pass |
| `@taliya/ui` | `^0.1.1` | `^0.1.1` | `0.1.1` | yes | `0.1.1` | pass |
| `@taliya/crm` | `^0.1.1` | `^0.1.1` | `0.1.1` | yes | `0.1.1` | pass |
