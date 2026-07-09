# Batch Quality Gate

This gate is mandatory for every Taliya Product UI implementation batch.

## Required Inputs

- Open the approved source image before implementing each image-derived component.
- Confirm the component source row in `specs/001-product-ui-foundation/component-source-map.md`.
- Confirm primitive ownership and required variants/states in `specs/001-product-ui-foundation/primitive-ui-matrix.md`.
- Confirm required token groups in `specs/001-product-ui-foundation/token-system-v1.md`.

## Component Acceptance

Each component must pass all checks:

- exported from the correct package;
- real interactive UI when the source implies interaction;
- composed from smaller primitives where applicable;
- visual output matches the approved source component anatomy;
- no one-off visual values when a token exists or must exist;
- all planned variants and operational states are represented;
- keyboard, focus, disabled, loading, selected, error/success/warning behavior exists when applicable;
- isolated Storybook `AllStates` story exists under the correct namespace;
- source image filename is cited in Storybook docs;
- Vitest coverage exists for primary render/state/callback behavior;
- Storybook screenshot is captured and reviewed against the source image.

## Batch Closure

A batch can be called complete only when:

- `corepack pnpm test` passes;
- `corepack pnpm typecheck` passes;
- `corepack pnpm lint` passes;
- `corepack pnpm build` passes;
- Storybook smoke screenshots are nonblank, visible, and have no horizontal overflow;
- no known P0/P1 visual, UX, accessibility, architecture, or behavior gap remains.

Do not call a batch complete when the implementation is merely a first version, foundation, close approximation, or visual inspiration.
