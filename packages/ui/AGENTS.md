# Scoped instructions: `packages/ui`

These instructions inherit the repository root `AGENTS.md`; they do not weaken it. The active Spec Kit feature, approval gate, test-first workflow, accessibility contract, and visual evidence requirements remain authoritative.

- Own reusable, domain-neutral React primitives and wrapped headless behavior.
- Depend only on `@taliya/tokens` and approved implementation dependencies; never import from `@taliya/crm` or `apps/docs`.
- Keep render logic pure, state minimal, effects external-only, and collection identity stable.
- Reusable anatomy belongs in package components and tokens, not Storybook-only CSS. Every new primitive needs isolated browser/story evidence.
