# Scoped instructions: `apps/docs`

These instructions inherit the repository root `AGENTS.md`; they do not weaken it. The active Spec Kit feature, approval gate, test-first workflow, Storybook contract, and visual certification requirements remain authoritative.

- Own Storybook/docs, isolated stories, interaction tests, visual capture metadata, and accessibility scenarios.
- `apps/docs` may import all official packages, but packages must never import from this app.
- Stories provide data, callbacks, composition, viewport framing, and source-image context; reusable product anatomy and CSS belong in `@taliya/tokens`, `@taliya/ui`, or `@taliya/crm`.
- A dev preview or story smoke result is not 1:1 certification; static capture, comparison, and human approval evidence remain required.
