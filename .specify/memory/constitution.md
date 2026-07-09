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

## Product Boundaries

- Landing and marketing UI are explicitly out of scope.
- Pilates is the first product context, not a dependency.
- Web light theme is the first target.
- Mobile product UI requires a future dedicated spec.
- Financeiro do studio, Billing Taliya, Uso/Cotas, CRM do studio, and internal backoffice must remain separated in component names and examples.

## Development Workflow

- Spec Kit artifacts define scope before implementation.
- P0 foundations must be approved before domain components.
- Component work should move from tokens to primitives to CRM patterns.
- Public APIs must be documented before components are considered ready.
- Tests and Storybook stories must accompany implementation tasks when code starts.

## Governance

This constitution supersedes ad hoc component decisions. Any exception must be documented in the active feature plan under Complexity Tracking with rationale, alternative considered, and migration path.

**Version**: 0.1.0 | **Ratified**: 2026-05-28 | **Last Amended**: 2026-05-28
