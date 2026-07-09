# Feature Specification: Taliya Product UI Component Library

**Feature Branch**: `001-product-ui-foundation`  
**Created**: 2026-05-28  
**Status**: Draft ready for approval  
**Input**: Create a standalone Spec Kit project for the complete Taliya Product UI component library specification, separate from the landing and future SaaS implementation, with architecture, decisions, image coverage, canonical tokens, contracts, Storybook workflow, QA gates, and P0/P1/P2 component matrix.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Establish Product UI Source Of Truth (Priority: P1)

As the product/design owner, I need one approved source of truth for the Taliya SaaS component library so future SaaS implementation does not recreate shells, navigation, buttons, chips, tables, drawers, and agent panels page by page.

**Why this priority**: Without a canonical source, the team will implement conflicting navigation, duplicated drawers, inconsistent chips, and mixed domain boundaries.

**Independent Test**: A reviewer can read the feature docs and answer what the library includes, excludes, how packages are separated, and which components are P0/P1/P2 without opening the landing project.

**Acceptance Scenarios**:

1. **Given** a new contributor opens the project, **When** they read `README.md`, `AGENTS.md`, and this spec, **Then** they understand that this library is for the future SaaS only and not for the landing.
2. **Given** a component decision conflicts with old CRM images, **When** final navigation/setup/status rules exist in the spec, **Then** those rules win over obsolete image labels.

---

### User Story 2 - Define Foundations And Primitives (Priority: P1)

As a component author, I need foundations and base components specified before domain components so the future implementation creates reusable tokens, controls, cards, tables, drawers, overlays, states, and shells instead of domain-specific one-offs.

**Why this priority**: Every future CRM screen depends on the same visual foundations and primitives.

**Independent Test**: The P0 matrix and readiness tasks list every foundational and primitive component required for the full library, including expected variants, states, QA expectations, and Storybook coverage.

**Acceptance Scenarios**:

1. **Given** a developer starts P0 implementation, **When** they inspect the matrix and tasks, **Then** they can identify which components belong to tokens, primitives, shell, CRM patterns, or domain components.
2. **Given** a primitive has multiple states, **When** its spec is reviewed, **Then** its disabled, loading, selected, blocked, error, and focus behavior is explicit before code starts.

---

### User Story 3 - Define CRM Patterns Without Product Logic (Priority: P2)

As a future SaaS engineer, I need CRM-level patterns such as CrmProductShell, AccessShell, SetupShell, Sidebar, Topbar, AgentPanel, SetupStepper, DataTable, Kanban, Calendar, Timeline, Usage/Billing panels, Inbox, InternalOverviewDashboard, and Drawers to be reusable without embedding backend behavior.

**Why this priority**: These patterns are the bridge between primitives and real SaaS screens.

**Independent Test**: A reviewer can confirm that CRM components accept prepared data and callbacks, render every required domain state, and do not fetch, mutate, authenticate, bill, route, or run agent decisions.

**Acceptance Scenarios**:

1. **Given** a CRM component shows a blocked plan state, **When** it renders, **Then** the blocking data comes from props and no billing logic lives in the component.
2. **Given** an AgentPanel appears in setup, support, usage, flow, operation, or execution contexts, **When** the component renders, **Then** its title and role are contextual rather than hardcoded as "Agente de Configuracao".
3. **Given** an approved image requires a drawer, shell, setup, access, subscription, internal, inbox, calendar, kanban, or usage pattern, **When** the image coverage composition is opened, **Then** the screen can be assembled from library components and fake data.
4. **Given** a component is extracted from an approved image, **When** its future implementation is reviewed, **Then** it must be visually identical to the visible component anatomy, density, spacing, hierarchy, copy pattern, and state presentation from the approved image rather than reinterpret the image as inspiration.

---

### User Story 4 - Create Reviewable Documentation Workflow (Priority: P2)

As a designer or reviewer, I need a visual documentation workflow so every component can be reviewed by variant, state, density, and usage rule before it is used by the SaaS.

**Why this priority**: The library will otherwise drift from the approved CRM visual direction and lose design consistency.

**Independent Test**: The plan defines a docs/playground contract and each component family requires visual examples for core variants, states, density, responsive constraints, and source-image coverage before it can be called ready.

**Acceptance Scenarios**:

1. **Given** a component reaches "ready", **When** the reviewer opens its docs entry, **Then** they can inspect default, selected, disabled, loading, error, empty, and blocked states where applicable.
2. **Given** a component uses a headless dependency internally, **When** the public docs are reviewed, **Then** consumers see only the Taliya component API.
3. **Given** a source image is approved, **When** the reviewer opens image-coverage stories, **Then** there is either an equivalent composition or an explicit historical/duplicate/superseded/rejected reason.

### Edge Cases

- If an old approved image uses navigation labels that conflict with final product navigation, final navigation wins.
- If a component could belong to both primitives and CRM, it starts in primitives only when it has no Taliya domain concepts.
- If a domain component requires real business logic, only the visual shell and state contract belong in this library.
- If a future niche needs different labels, it supplies configuration/copy outside the library.
- If mobile requirements appear, they require a future mobile-specific spec rather than silent adaptation of web components.
- If image coverage reveals a missing component, the component matrix and readiness tasks must be updated before implementation is allowed to start.
- If a future implementer wants to deviate from an approved image, the deviation must be explicitly justified by a contract such as final navigation, 9-block setup order, accessibility, or replacement of fake data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST be independent from the landing repository and MUST NOT import landing code, assets, or components.
- **FR-002**: The library MUST serve only the future Taliya SaaS/CRM product UI.
- **FR-003**: The project MUST define package boundaries for foundations, primitives, and CRM patterns.
- **FR-004**: The project MUST define a P0/P1/P2 component matrix before component implementation begins.
- **FR-005**: The matrix MUST include reusable components found in every approved CRM image and relevant doc.
- **FR-006**: The matrix MUST identify components that are duplicated, inconsistent, missing, or risky if not standardized.
- **FR-007**: The project MUST define final navigation and shell rules that supersede obsolete image labels.
- **FR-008**: The project MUST define the setup stepper as 9 official blocks: Studio, Equipe, Canais, Planos, Pagamento, Alunos, Turmas, Agenda, Revisao.
- **FR-009**: The project MUST define `AgentPanel` as contextual, with variants for setup, support, flow, execution, usage, and operation contexts.
- **FR-010**: The project MUST keep Financeiro do studio, Billing Taliya, Uso/Cotas, CRM do studio, and internal backoffice as separate domains.
- **FR-011**: Components MUST receive prepared data, state, and callbacks through public props.
- **FR-012**: Components MUST NOT implement backend, database, API calls, auth, billing, routing, or agent decisions.
- **FR-013**: Every component family MUST define variants, states, and usage rules before implementation.
- **FR-014**: The docs/playground app MUST be the visual review surface for components.
- **FR-015**: The public API MUST expose Taliya components and MUST NOT expose underlying headless implementation dependencies.
- **FR-016**: The first implementation scope MUST be web-first and light-theme-first.
- **FR-017**: Mobile product UI MUST be deferred to a future explicit spec.
- **FR-018**: The project MUST include an image coverage map that maps every approved, duplicate, historical, adjusted, and rejected source image to its implementation status and required components.
- **FR-019**: The project MUST include `token-system-v1.md` as the implementation target for raw, semantic, component/density, connector, chart, focus, motion, and status tokens; `token-values-v0.md` remains historical extraction input.
- **FR-020**: The project MUST define access/subscription components for pre-CRM auth, checkout review, pending confirmation, failed confirmation, confirmed setup handoff, and onboarding entry.
- **FR-021**: The project MUST define explicit navigation, drawer lifecycle, state taxonomy, icon, font, and Storybook contracts.
- **FR-022**: The component matrix MUST be sufficient to reconstruct all approved images from 01 through 79, excluding only images marked duplicate, historical, superseded, or not approved.
- **FR-023**: The Spec Kit tasks MUST define the complete readiness checklist for future package manifests, build tooling, tokens, primitives, shell/navigation, CRM patterns, domain components, tests, stories, and visual QA without executing implementation in this phase.
- **FR-024**: Every approved source image MUST map to at least one Storybook image-coverage composition or to a documented reusable component story set that proves reconstruction coverage.
- **FR-025**: Every component row in `component-matrix.md` MUST have enough readiness metadata to generate future implementation, Storybook/docs, and test tasks without re-auditing the source images.
- **FR-026**: Approved generated CRM images MUST be treated as canonical 1:1 component clone sources, not visual references or loose inspiration, and future component implementation MUST reproduce the visible image content and anatomy identically at component level.
- **FR-027**: The project MUST define allowed deviations from image parity, limited to documented navigation/setup corrections, accessibility improvements, fake-data replacement, and non-target image statuses.
- **FR-028**: The project MUST define the canonical source-assets directory for approved generated CRM images and future implementation MUST inspect actual image files rather than relying on filenames alone.
- **FR-029**: The project MUST include a component source map that maps every component in `component-matrix.md` to its primary source, secondary sources, extraction target, variants/states, and parity decisions.
- **FR-030**: The project MUST include an implementation execution plan that defines the official batch order, acceptance checklist, and stop conditions for implementing the component library after approval.
- **FR-031**: Future primitive and component implementation MUST be token-first: every visual value used by `@taliya/ui` or `@taliya/crm` MUST come from `@taliya/tokens` / `Foundations / Tokens`, and missing approved-image values MUST be added to tokens before component CSS is written.

### Key Entities

- **Product UI Project**: Standalone repository containing specs, docs app, and packages for future SaaS UI.
- **Foundation Token**: Named design value for color, typography, spacing, radius, shadow, border, focus, motion, density, or status semantics.
- **Primitive Component**: Domain-neutral reusable UI component such as Button, Input, Chip, Card, Table, Drawer, or Modal.
- **CRM Pattern**: Product-level component composed from primitives, such as CrmProductShell, Sidebar, AgentPanel, SetupStepper, Kanban, Calendar, or ApprovalPanel.
- **Component State**: Visual/interaction state such as default, hover, focus, selected, disabled, loading, empty, error, permission blocked, quota blocked, or plan blocked.
- **Component Matrix Entry**: Canonical row describing family, component, package, priority, source evidence, variants, states, and implementation notes.
- **Component Source Map Entry**: Canonical extraction row describing exactly where a component comes from and what must be cloned at component level.
- **Primitive UI Matrix Entry**: Canonical row describing one reusable `@taliya/ui` primitive, its source images, visible anatomy, variants, states, token dependencies, and later CRM composition targets.
- **Token System v1 Entry**: Canonical token definition for raw values, semantic aliases, component/density tokens, connector tokens, chart tokens, focus tokens, and motion tokens used by future implementation.
- **Foundations / Tokens Story**: Storybook documentation entry that exposes official token categories and acts as the visual-value contract for future primitives.
- **Token-First Primitive Rule**: Implementation rule requiring every primitive to cite its source image, consume official token groups, define variants/states, and stop when a required visual value is missing from tokens.
- **Implementation Batch**: Ordered implementation group from `implementation-execution-plan.md`, with package scope, required components, acceptance gates, and stop conditions.
- **Docs Story**: Visual example for a component variant or state in the docs/playground.
- **Image Coverage Composition**: Storybook composition that assembles fake data and library components to prove an approved source image can be reconstructed.
- **1:1 Clone Contract**: Rule set requiring future components to reproduce approved-image anatomy, spacing, hierarchy, density, tokens, and state presentation identically.
- **Source Asset**: Approved image file used as evidence for component extraction and parity review.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can identify the package destination for 100% of P0 components from the matrix.
- **SC-002**: 100% of P0 components list at least one source screen/document and their required states before implementation.
- **SC-003**: The spec documents all previously identified high-risk inconsistencies: navigation, setup stepper, agent panel naming, status chips, drawers, finance/billing split, access/subscription coverage, and internal/studio split.
- **SC-004**: The architecture allows the future SaaS to consume UI without depending on the landing project.
- **SC-005**: No requirement in this feature requires backend, database, real billing, or real agent runtime implementation.
- **SC-006**: A new contributor can read the README and active Spec Kit docs and understand project scope in under 10 minutes.
- **SC-007**: The full readiness task list is executable in order and blocks future domain-component implementation until foundations and primitives are fully specified.
- **SC-008**: 100% of approved source images have a row in `image-coverage-map.md` with component coverage and no "unmapped" status.
- **SC-009**: 100% of approved image families have at least one component row in `component-matrix.md`.
- **SC-010**: Access/subscription, onboarding/setup, CRM logged-in, agents/flows, billing/usage, support, and internal backoffice are all represented in the matrix and contracts.
- **SC-011**: 100% of component matrix rows are covered by readiness checks in `tasks.md` or by family-level implementation-readiness rules.
- **SC-012**: `pnpm build`, `pnpm test`, `pnpm lint`, and Storybook visual smoke checks are represented as future release gates before the implemented library can be considered complete.
- **SC-013**: Future implementation readiness includes a 1:1 clone contract proving that approved images are cloned identically at component level rather than used as generic inspiration.
- **SC-014**: Future implementation readiness includes a source-assets contract that points to the actual approved image directory and blocks approximation from memory.
- **SC-015**: 100% of component matrix rows have a matching row in `component-source-map.md` before implementation starts.
- **SC-016**: 100% of `Primitives / UI` implementation tasks reference `primitive-ui-matrix.md` before component code is changed.
- **SC-017**: 100% of P0 primitive implementation uses token groups from `token-system-v1.md` instead of inventing new visual values during coding.
- **SC-018**: Future implementation can proceed batch-by-batch from `implementation-execution-plan.md` without re-deciding package order, clone acceptance, or stop conditions.
- **SC-019**: 100% of future primitive implementations document source image, token dependencies, variants/states, and Storybook path before code is accepted.
- **SC-020**: 0 future primitive/component implementations introduce one-off visual CSS values when an official token category exists.

## Assumptions

- The first consumer will be a future Taliya SaaS/CRM, not the existing landing.
- The approved CRM images in `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508` and `specs/006-crm-operational-core` audit are valid input for this Design System.
- Approved generated CRM images are the visual bar for component fidelity.
- Pilates is the first product context but not a package dependency.
- Initial UI target is desktop/web light theme.
- Storybook is the preferred documentation/playground tool, but remains a development artifact.
- Implementation dependencies are not installed in this planning step.
