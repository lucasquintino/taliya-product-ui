# Plan: Taliya Product UI Component Library Specification

**Branch**: `001-product-ui-foundation` | **Date**: 2026-05-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-product-ui-foundation/spec.md`

## Summary

Specify the standalone Taliya Product UI component library for the future SaaS/CRM before any component implementation begins. This feature covers the full v1 library contract: source-of-truth docs, package architecture, canonical tokens, primitives, shells, CRM patterns, domain components, image-coverage requirements, approved-image 1:1 component cloning, Storybook review surface, test expectations, build-tooling expectations, and visual QA gates. It explicitly excludes landing usage, backend/database/API work, real auth, real billing, real agent decisions, future SaaS routing, dependency installation, and component code in this phase.

## Technical Context

**Language/Version**: TypeScript is the target for future component packages and docs.  
**Primary Dependencies**: Target stack is React, Vite, Storybook, Vitest, Playwright for visual smoke checks, CSS variables, and selected wrapped headless primitives.  
**Storage**: N/A. This is a component library and documentation project.  
**Testing**: Future implementation must use Vitest for token/component contracts, Storybook for visual review, and Playwright for story smoke tests and image-coverage composition checks.  
**Target Platform**: Web SaaS product UI, desktop-first, light theme first.  
**Project Type**: Standalone monorepo-style component library.  
**Performance Goals**: Components should be tree-shakeable by package and usable without importing the docs app.  
**Constraints**: No landing dependency, no backend/API/database/auth/billing logic, no real agent runtime, no mobile-first scope in v1.  
**Scale/Scope**: Full desktop/web light-theme component library specification required to reconstruct every approved CRM image in `image-coverage-map.md` once implementation begins, with component-level 1:1 cloning rather than loose inspiration.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
| --- | --- | --- |
| Product UI only | PASS | Landing and marketing are out of scope. |
| Library-first | PASS | Packages are reusable and consumer-agnostic. |
| Token-driven | PASS | Tokens are the first package and source of styling truth. |
| Accessibility and states | PASS | States and docs are required for component readiness. |
| Storybook visual contract | PASS | `apps/docs` is the review surface. |
| Package boundaries | PASS | `tokens -> ui -> crm -> docs` dependency direction is explicit. |
| No real product logic | PASS | Components render prepared props and callbacks only. |

## Project Structure

### Documentation (this feature)

```text
specs/001-product-ui-foundation/
  spec.md
  plan.md
  research.md
  data-model.md
  quickstart.md
  component-matrix.md
  component-source-map.md
  image-coverage-map.md
  spec-completeness-review.md
  token-values-v0.md
  token-system-v1.md
  primitive-ui-matrix.md
  implementation-execution-plan.md
  architecture.md
  checklists/
    requirements.md
  contracts/
    component-api-contract.md
    drawer-lifecycle-contract.md
    icon-font-contract.md
    navigation-contract.md
    package-boundaries.md
    source-assets-contract.md
    storybook-contract.md
    state-taxonomy-contract.md
    token-contract.md
    visual-parity-contract.md
  tasks.md
```

### Source Code (target repository root)

```text
apps/
  docs/
    README.md
    .storybook/
    src/
      fixtures/
      foundations/
      image-coverage/
      stories/

packages/
  tokens/
    README.md
    src/
  ui/
    README.md
    src/
  crm/
    README.md
    src/

.specify/
AGENTS.md
README.md
package.json
pnpm-workspace.yaml
tsconfig.base.json
```

**Structure Decision**: Use one docs app and three packages. This planning phase defines the intended package manifests, source folders, tests, stories, build configs, and image-coverage compositions; those files are implemented only after explicit approval.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --- | --- | --- |
| Standalone project instead of package inside SaaS | The SaaS does not exist yet and the library must avoid landing contamination | Putting it inside the landing or future app would blur ownership and create migration debt |
| Separate `crm` package | CRM patterns need domain composition without polluting primitives | Putting everything in `ui` would make primitive APIs domain-heavy |
| Storybook/docs app from the start | Variants, states, and image coverage are part of the design contract | Markdown-only docs cannot reliably review visual fidelity or state coverage |

## Phase 0 Research Summary

See [research.md](./research.md). Decisions: standalone workspace, React/TypeScript target, pnpm workspace, Vite package builds, Storybook, CSS variables, token package, wrapped Radix/headless primitives where accessibility is expensive, Vitest for component contracts, Playwright visual smoke checks before release, Chromatic later after baselines stabilize, no shadcn/MUI/Ant/Chakra, no Tailwind as public library contract.

## Phase 1 Design Summary

See:

- [architecture.md](./architecture.md)
- [data-model.md](./data-model.md)
- [component-matrix.md](./component-matrix.md)
- [component-source-map.md](./component-source-map.md)
- [image-coverage-map.md](./image-coverage-map.md)
- [spec-completeness-review.md](./spec-completeness-review.md)
- [token-values-v0.md](./token-values-v0.md)
- [token-system-v1.md](./token-system-v1.md)
- [primitive-ui-matrix.md](./primitive-ui-matrix.md)
- [implementation-execution-plan.md](./implementation-execution-plan.md)
- [contracts/component-api-contract.md](./contracts/component-api-contract.md)
- [contracts/drawer-lifecycle-contract.md](./contracts/drawer-lifecycle-contract.md)
- [contracts/icon-font-contract.md](./contracts/icon-font-contract.md)
- [contracts/navigation-contract.md](./contracts/navigation-contract.md)
- [contracts/package-boundaries.md](./contracts/package-boundaries.md)
- [contracts/source-assets-contract.md](./contracts/source-assets-contract.md)
- [contracts/storybook-contract.md](./contracts/storybook-contract.md)
- [contracts/state-taxonomy-contract.md](./contracts/state-taxonomy-contract.md)
- [contracts/token-contract.md](./contracts/token-contract.md)
- [contracts/visual-parity-contract.md](./contracts/visual-parity-contract.md)

## Post-Design Constitution Check

| Gate | Status | Notes |
| --- | --- | --- |
| Product UI only | PASS | All contracts explicitly exclude landing and backend. |
| Library-first | PASS | Public props and package boundaries are defined. |
| Token-driven | PASS | Token contract is a required design artifact. |
| Accessibility and states | PASS | Component contract requires accessibility and state docs. |
| Storybook visual contract | PASS | Storybook contract defines readiness. |
| Package boundaries | PASS | Dependency graph is acyclic and explicit. |
| No real product logic | PASS | Business logic remains with future SaaS consumers. |
