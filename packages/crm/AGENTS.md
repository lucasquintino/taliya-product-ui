# Scoped instructions: `packages/crm`

These instructions inherit the repository root `AGENTS.md`; they do not weaken it. The active Spec Kit feature, approval gate, test-first workflow, API compatibility contract, and visual evidence requirements remain authoritative.

- Own composed Taliya CRM patterns and domain presentation only.
- Depend on `@taliya/tokens` and `@taliya/ui`; never import from `apps/docs`, consumers, backend services, or real authentication/billing/agent systems.
- Compose official primitives with prepared data and callbacks. Domain wrappers must add real domain behavior or mapping; forwarding-only aliases are not acceptable.
- Preserve the official shell, navigation, drawer, table, filter, kanban, state, token, and public API contracts while modularizing.
