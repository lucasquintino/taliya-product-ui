# Scoped instructions: `packages/tokens`

These instructions inherit the repository root `AGENTS.md`; they do not weaken it. The active Spec Kit feature, approval gate, test-first workflow, security boundary, and evidence requirements remain authoritative.

- Own design-token foundations only: color, typography, spacing, radius, elevation, focus, motion, density, and semantic status values.
- Do not import from `@taliya/ui`, `@taliya/crm`, `apps/docs`, consumers, backend services, or browser storage.
- New public token values require a documented contract, token audit evidence, and focused tests before acceptance.
- Keep exports intentional and preserve the package public API unless an approved compatibility task says otherwise.
