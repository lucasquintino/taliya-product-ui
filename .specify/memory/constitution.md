# Taliya Product UI Constitution

## Core Principles

### I. Product UI Only

This project exists only for the future Taliya SaaS/CRM product UI. It must not contain landing page sections, marketing surfaces, SEO utilities, public pricing pages, or the commercial landing widget.

### II. Library-First And Consumer-Agnostic

Every component must be reusable across future Taliya SaaS products. Components receive prepared data and callbacks through props. They must not fetch data, call APIs, own persistence, or assume a specific backend.

### III. Token-Driven Visual System

All visual decisions must flow from foundations in `@taliya/tokens`: colors, typography, spacing, radius, borders, elevation, focus, motion, density, and semantic status. One-off hard-coded styling is allowed only during exploration and must not ship as component API.

### IV. Accessibility And States Are Required

Every interactive component must define keyboard behavior, focus behavior, disabled behavior, loading behavior, and accessible naming. Operational components must define empty, loading, error, blocked, permission, quota, and sensitive states when applicable.

### V. Storybook Is The Visual Contract

Components are not complete until their variants and states are documented in `apps/docs`. Storybook examples are part of the product contract, not optional demos.

### VI. Clear Package Boundaries

`@taliya/tokens` has no internal package dependencies. `@taliya/ui` depends only on tokens and approved headless primitives. `@taliya/crm` composes tokens and UI primitives into product patterns. Consumers import Taliya APIs, never underlying headless libraries directly.

### VII. No Real Product Logic In The Library

The library may show visual states for plan, permission, quota, billing, setup, agent, and workflow status. It must not implement real billing, auth, persistence, agent decisions, routing, or business rules.

### VIII. Specification And Bidirectional Traceability

Every non-trivial change must start from one active Spec Kit feature with observable acceptance criteria, documented decisions, an implementation plan, executable tasks, and bidirectional traceability from requirement to evidence. Historical specifications remain an audit trail and must not be retroactively marked complete to match the current code. Implementation is forbidden while an applicable requirement is ambiguous or while the active SDD gate is not explicitly approved.

### IX. Sustainable Architecture And React Quality

Handwritten code must have focused ownership, cohesive modules, small public contracts, stable package boundaries, and no dependency cycles. React render logic must be pure; props and state are immutable inputs; state is minimal; effects synchronize only with external systems; collections use stable identity. Existing complexity may be baselined by exact finding, but touched code must not increase it and final certification requires removing handwritten-code baseline debt.

### X. Executable, Risk-Based Verification

Textual rules do not prove quality. Each change profile must select blocking, fail-closed checks appropriate to its risk, including type, lint, unit, component, integration, Storybook browser, accessibility, visual, E2E, consumer-contract, and cross-platform evidence as applicable. Required checks must propagate failure, reject skipped or stale evidence, run deterministically, and validate the same source revision.

### XI. Secure And Deterministic Delivery

Dependencies, source, workflows, packages, and publication are part of the security boundary of this library. Releases require least-privileged automation, immutable workflow dependencies, secret and static analysis, separate runtime and toolchain dependency assessment, artifact provenance, clean-consumer installation, and publication of the exact certified artifacts. Application authentication, authorization, tenant isolation, and infrastructure controls remain explicit obligations of consumers.

### XII. Measured Performance And Certified Releases

Performance claims require comparable, production-like measurements. Package, CSS, tree-shaking, render, and update baselines must be versioned before budgets are enforced; changes may not regress beyond the approved ratchet. A release may be called certified only when every applicable gate passes on one revision, all evidence is fresh, and there is no active waiver. A waiver creates a risk-accepted state, never a `100% conformant` state.

## Product Boundaries

- Landing and marketing UI are explicitly out of scope.
- Pilates is the first product context, not a dependency.
- Web light theme is the first target.
- Mobile product UI requires a future dedicated spec.
- Financeiro do studio, Billing Taliya, Uso/Cotas, CRM do studio, and internal backoffice must remain separated in component names and examples.

## Development Workflow

- The required sequence is Constitution -> Specify -> Clarify -> Plan and Research -> Tasks -> Checklist -> Analyze -> explicit human approval -> Implement.
- Spec Kit artifacts define scope before implementation, and the active feature is the source of truth for its change program.
- `speckit.implement` and product-code changes are prohibited before the post-analysis approval is recorded.
- P0 foundations must be approved before domain components.
- Component work should move from tokens to primitives to CRM patterns.
- Public APIs must be documented before components are considered ready.
- Tests and Storybook stories must be designed with the change and accompany implementation tasks when code starts.
- Every mandatory gate must have a negative probe and fail the aggregate gate when its underlying check fails.
- Check mode is read-only. Baseline, report, screenshot, artifact, and waiver updates are explicit review actions.

## Governance

This constitution supersedes ad hoc component decisions. The active Spec Kit feature may refine it but cannot silently weaken it. Any temporary exception must be scoped to an exact rule and finding, document risk and compensating controls, have an owner, approver, removal issue, and expiry, and appear in the active plan's Complexity Tracking. Critical irreversible security risks are not waivable through the normal process.

Amendments require a documented rationale, impact review of templates and repository instructions, a migration plan, and a semantic version update. Major changes remove or redefine principles or their enforcement; minor changes add a principle or materially expand mandatory guidance; patches clarify wording without changing obligations. Compliance is reviewed during specification, planning, task generation, pull-request verification, and release certification.

**Version**: 1.0.0 | **Ratified**: 2026-05-28 | **Last Amended**: 2026-08-08
