# Research: Product UI Foundation

## Decision: Standalone Project

**Chosen**: `C:\Users\lucas\taliya-product-ui` as a separate project.

**Rationale**: The library must serve the future SaaS/CRM and avoid coupling with the current landing project. Keeping it separate prevents marketing components, landing CSS, CTA behavior, and `/pilates` constraints from leaking into product UI.

**Alternatives considered**:

- Package inside landing repo: rejected because the landing will not consume this library.
- Package inside future SaaS repo: rejected because the SaaS does not exist yet and the design system must guide it.

## Decision: Workspace Shape

**Chosen**: `apps/docs`, `packages/tokens`, `packages/ui`, `packages/crm`.

**Rationale**: This separates foundations, primitives, product patterns, and documentation while keeping the project small enough for the first phase.

**Alternatives considered**:

- Single `src/` library: rejected because primitives and CRM patterns would blur.
- Many packages by domain: rejected for P0 because it creates premature package overhead.

## Decision: React + TypeScript Planned

**Chosen**: React + TypeScript for implementation after planning approval.

**Rationale**: Future SaaS product UI is expected to be React-compatible, and TypeScript makes public component contracts explicit.

**Alternatives considered**:

- Web Components: rejected for v0.1 because the current product direction and design references are React-oriented.
- Framework-specific Next components: rejected because the library should not depend on Next.

## Decision: CSS Variables As Token Runtime

**Chosen**: CSS variables plus token exports as the styling foundation.

**Rationale**: CSS variables are portable across future apps and keep the library independent from a specific utility framework.

**Alternatives considered**:

- Tailwind as public API: rejected because it would tie consumers to class conventions.
- CSS-in-JS as token runtime: rejected for v0.1 to avoid runtime styling coupling.

## Decision: Storybook First

**Chosen**: Storybook as docs/playground.

**Rationale**: Component readiness requires reviewing visual variants, states, density, accessibility, and usage examples. Storybook is better than static docs for that job.

**Alternatives considered**:

- Custom docs app only: rejected for v0.1 because Storybook already solves component isolation well.
- Markdown-only docs: rejected because visual review is central to this project.

## Decision: Radix/Headless Dependencies Encapsulated

**Chosen**: Use wrapped headless primitives only where they reduce accessibility risk, such as Dialog, Popover, Tooltip, Dropdown, Select, and Tabs.

**Rationale**: Focus management, keyboard behavior, ARIA, and portal positioning are easy to get wrong. Encapsulation keeps the public API Taliya-owned.

**Alternatives considered**:

- Build all interaction primitives from scratch: rejected for accessibility and time risk.
- Expose Radix APIs directly: rejected because it leaks implementation and complicates future migration.

## Decision: No Pre-Styled External UI Kit

**Chosen**: Do not use shadcn/ui, MUI, Ant Design, Chakra, or similar as the design system base.

**Rationale**: Taliya has an approved visual direction. Pre-styled kits would import another product identity and increase override debt.

**Alternatives considered**:

- shadcn/ui: rejected because it is useful for apps but too opinionated for an original product UI library.
- MUI/Ant/Chakra: rejected because they bring large visual systems and API assumptions.

## Decision: Vitest Planned, Playwright After Component Baselines

**Chosen**: Specify Vitest for future unit/contract tests; add Playwright visual checks after P0 components stabilize.

**Rationale**: Early P0 needs fast component/API confidence. Visual regression becomes more valuable after baselines exist.

**Alternatives considered**:

- Playwright from day one: deferred because there are no components yet.
- Chromatic immediately: deferred until CI and visual baselines are stable.

## Decision: Web Light Theme First

**Chosen**: Desktop/web light theme first.

**Rationale**: The approved CRM images are web-first and light-theme. Dark mode and mobile need explicit future decisions.

**Alternatives considered**:

- Dark mode in P0: rejected as speculative.
- Mobile in P0: rejected because the existing audit says mobile needs its own DS path.

## Decision: Approved Images Are 1:1 Component Clone Sources

**Chosen**: Treat approved generated CRM images as canonical 1:1 component clone sources for future component implementation.

**Rationale**: Rebuilding from scratch or using the images only as inspiration risks losing the approved product direction. Components should be extracted from the visible image content and reproduce anatomy, spacing, density, hierarchy, state presentation, and visual treatment identically.

**Alternatives considered**:

- Use images as loose inspiration: rejected because it invites generic dashboard output and visual drift.
- Implement full screens first: rejected because this project is a component library; 1:1 fidelity must be achieved through reusable components, not one-off screen clones.
