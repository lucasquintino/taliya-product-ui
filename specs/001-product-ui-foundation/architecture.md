# Architecture: Taliya Product UI

## Objective

Create a standalone component library for the future Taliya SaaS/CRM that turns approved CRM screens into reusable foundations, primitives, and product patterns.

## Dependency Graph

```text
@taliya/tokens
  -> @taliya/ui
    -> @taliya/crm
      -> apps/docs
```

Rules:

- `tokens` imports no internal packages.
- `ui` may import `tokens`.
- `crm` may import `tokens` and `ui`.
- `docs` may import everything.
- No package imports from `docs`.
- Consumers import Taliya packages, not underlying headless dependencies.

## Package Responsibilities

### `@taliya/tokens`

Owns:

- color tokens;
- semantic status tokens;
- typography scale;
- spacing scale;
- radius;
- borders;
- elevation;
- focus;
- motion;
- density;
- CSS variables and typed token exports.

Does not own:

- components;
- domain labels;
- product data;
- business logic.

### `@taliya/ui`

Owns:

- domain-neutral primitives;
- accessible controls;
- visual states;
- layout-neutral surfaces;
- low-level overlays.
- all reusable primitives shown under `Primitives / UI` in Storybook.

Examples:

- Button;
- IconButton;
- Input;
- Select;
- Toggle;
- Chip;
- Badge;
- Card;
- Panel;
- Table;
- Drawer;
- Modal;
- Tabs;
- EmptyState.
- CalendarCell;
- CalendarEventBlock;
- MessageBubble;
- ComposerInput;
- FlowNode;
- ConnectorLine.

Does not own:

- CRM route names;
- agent modes;
- billing meanings;
- setup steps;
- SaaS navigation.
- CRM shell composites.

### `@taliya/crm`

Owns:

- SaaS app shell;
- CRM navigation;
- operational layouts;
- product patterns composed from primitives;
- visual contracts for setup, billing, usage, agents, timeline, kanban, calendar, and drawers.
- product/domain compositions built from `@taliya/ui` primitives.

Does not own:

- backend state;
- data fetching;
- route loading;
- auth;
- real billing;
- real agent decisions.
- canonical primitive visual identity.

### Primitive Ownership Decision

`Primitives / UI` in Storybook maps to `@taliya/ui`, even when a primitive was first extracted while cloning a CRM shell image.

Temporary `Crm*` primitives created during image 79 extraction are implementation bridges, not final ownership. Before the library is complete, reusable controls such as circular icon buttons, nav chips, avatars, browser/address controls, connector lines, message bubbles, calendar cells, and flow nodes must have canonical `@taliya/ui` primitives or `@taliya/crm` wrappers around canonical `@taliya/ui` primitives.

### `apps/docs`

Owns:

- Storybook/docs app;
- component examples;
- variant and state galleries;
- visual QA cases;
- usage guidelines.

Does not own:

- product logic;
- library source of truth;
- package public APIs.

## Component Readiness Definition

A component is ready only when it has:

1. documented package owner;
2. public props contract;
3. variants;
4. states;
5. accessibility rules;
6. usage rules;
7. Storybook examples;
8. no forbidden dependency direction;
9. no hidden backend/product logic.

## Domain Boundaries

The following domains must not collapse into one component name:

- Financeiro do studio;
- Billing Taliya;
- Uso/Cotas;
- CRM do studio;
- internal backoffice;
- setup/onboarding;
- agents/flows;
- support.

## Navigation Decision

Final navigation docs from the CRM audit beat older image labels. Components must support final route families and topbar rules, while old labels may appear only as historical references in docs.

## Approved Image Parity Decision

Approved generated CRM images are canonical 1:1 component clone sources. They are not moodboards or loose visual references.

Future implementation must clone the visible component content and anatomy from approved images at component level: hierarchy, density, spacing, surfaces, radius, shadows, borders, typography, icons, chips, rows, drawers, panels, and state presentation.

This does not change the component-first strategy. Teams must build reusable components first, then use review compositions to prove that approved images can be reconstructed without one-off screen markup.

## Component Source Decision

`component-source-map.md` is the exact extraction authority for future component work.

Every component in `component-matrix.md` must have a matching row that defines:

1. primary source;
2. secondary sources;
3. what visual anatomy to extract;
4. where variants and states come from;
5. decisions or deviations that affect 1:1 cloning.

Future implementation must read `component-source-map.md` before opening component source files.

## Setup Decision

Setup uses 9 official blocks:

1. Studio;
2. Equipe;
3. Canais;
4. Planos;
5. Pagamento;
6. Alunos;
7. Turmas;
8. Agenda;
9. Revisao.

## Agent Panel Decision

`AgentPanel` is contextual. It must support titles and roles for setup, support, flow, execution, usage/cotas, operation, and future contexts. It must not hardcode every assistant as "Agente de Configuracao".
