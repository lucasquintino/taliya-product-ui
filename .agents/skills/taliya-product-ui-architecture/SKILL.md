---
name: taliya-product-ui-architecture
description: Enforce the official architecture of the Taliya Product UI repository. Use whenever planning, implementing, reviewing, migrating, or integrating the Taliya Product UI library; when touching package boundaries, tokens, public exports, CRM shells, page families, filters, tables, drawers, kanban, Storybook image coverage, or consumers such as taliya-internal and the future CRM Taliya.
---

# Taliya Product UI Architecture

## Purpose

Treat `taliya-product-ui` as the official reusable UI library for Taliya product surfaces. It must power Storybook image coverage, `taliya-internal`, and the future CRM Taliya without local reimplementation of shell, filters, quick filters, tables, drawers, kanban, cards, tokens, or visual standards.

Use this skill before broad architecture decisions. Use `taliya-product-ui-batch` as the mandatory companion for component edits, visual parity work, Storybook image coverage, token work, and final review gates.

## Package Boundaries

Keep package ownership strict:

- `@taliya/tokens`: design tokens only; no dependency on project packages.
- `@taliya/ui`: reusable primitives and headless-library wrappers; may depend on tokens.
- `@taliya/crm`: composed product patterns and CRM/domain components; may depend on tokens and ui.
- `apps/docs`: Storybook/docs and image coverage only; may import all packages.

Never import from `apps/docs` into packages. Never expose Radix or implementation-library APIs as public consumer APIs. Consumers import Taliya components only.

## Architecture Rule

Build pages by composing official components, not by recreating visual anatomy in each story or consumer.

Default CRM page composition:

```tsx
CrmProductShell
  PageFilterBar
  PageQuickFilters
  FamilyComponent
  DomainDrawer -> CrmDrawer
```

For the worklist/table family, `FamilyComponent` is `CrmWorklistTable`.

For kanban pages, use the official kanban family components once available; do not create card containers, rails, scroll behavior, or column chrome in a story.

For dashboards, use official dashboard/page section primitives once available; do not create story-only metric cards or panels if they represent reusable CRM anatomy.

## Component Reuse Rules

Prefer direct use of global components with data/configuration props.

Create a domain wrapper only when it adds real domain value:

- maps a domain data model into official component slots;
- owns domain-specific sections, such as task facts, checklist, comments, history, or copilot content;
- owns domain-specific actions and disabled/loading behavior;
- preserves the global component's structure instead of replacing it.

Do not keep wrappers that only render another component with renamed props. Examples such as `TaskTable`, `LeadTable`, or `SalesTable` are not acceptable if they only forward to `CrmWorklistTable`. Deprecate or remove them after consumers migrate.

`TaskDrawer` is acceptable because it composes task-specific content and behavior inside `CrmDrawer`. `CrmDrawer` owns the global drawer rail anatomy: full-height surface, header, close action, scrollable body, footer, loading state, and landmark semantics.

## Visual System Rules

All reusable visual anatomy belongs in package components and tokens, not story-only CSS.

Use tokens for standard surfaces, text, borders, radius, spacing, elevation, density, typography, focus, motion, and status colors. Promote new reusable values to `@taliya/tokens` before using them in components.

Stories may provide data, callbacks, composition, viewport framing, and source-image coverage context. Stories must not define reusable component appearance.

## Page Family Migration

Before migrating or creating a page story:

1. Identify the structural family: table/worklist, kanban, dashboard, calendar, setup, inbox, profile/detail, access/billing, or agent/chat.
2. Choose the already-approved reference page for that family when one exists.
3. Use the same official components as the reference page.
4. Change only content, data, columns, filters, quick filters, callbacks, domain drawer content, and page-specific navigation.
5. If the required anatomy does not fit any existing component, promote the missing anatomy into `@taliya/ui` or `@taliya/crm` first.

Never solve a page mismatch by duplicating markup or CSS inside a story.

## Consumer Integration

When integrating `taliya-internal` or the future CRM Taliya:

- consume `@taliya/tokens`, `@taliya/ui`, and `@taliya/crm`;
- use `CrmProductShell` for the product shell unless a documented prop/slot gap blocks it;
- use official page family components for tables, drawers, filters, kanban, and cards;
- pass data and callbacks through props;
- keep backend/API/auth/business logic outside this library;
- fix missing library capabilities in the library, not locally in the consumer.

If a consumer needs a variation, add a supported prop, slot, or component variant to the library and cover it in Storybook.

## Review Checklist

Before accepting architecture or migration work, verify:

- package boundary is respected;
- tokens own standard visual values;
- story CSS is not defining reusable anatomy;
- wrappers add real domain behavior or are removed/deprecated;
- page family uses the same global components as its reference;
- drawer pages use `CrmDrawer` directly or through a meaningful domain drawer;
- table pages use `CrmWorklistTable` directly unless a domain wrapper adds real value;
- consumer-specific fixes are promoted back to the library;
- `taliya-product-ui-batch` quality gate is used for component, token, Storybook, or visual work.

Do not call the library ready for CRM/internal use while core surfaces still require local reimplementation in consumers.
