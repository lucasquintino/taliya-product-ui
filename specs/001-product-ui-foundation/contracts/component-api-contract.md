# Contract: Component API

## General Component Props

All components should follow these API rules when implementation begins:

- accept `className` only for safe extension, not core visual identity replacement;
- accept `children` only where composition is intentional;
- expose state through explicit props;
- expose interactions through callbacks;
- avoid hidden global state;
- avoid data fetching;
- avoid routing assumptions.
- keep `@taliya/ui` primitive props domain-neutral even when visual examples use CRM-like fake data.
- expose primitive anatomy through variants/states, not through CRM-specific names.

## State Props

Common state props:

```text
disabled
loading
selected
active
readOnly
error
blockedReason
ariaLabel / accessible label equivalent
```

Operational state props should be explicit:

```text
status
priority
permissionState
quotaState
planState
integrationState
sensitive
```

## Events

Events should describe user intent, not implementation detail:

```text
onPress
onOpenChange
onSelect
onDismiss
onRequestAccess
onRetry
onPrimaryAction
onSecondaryAction
```

## Forbidden API Patterns

- Passing raw backend payloads into components.
- Component reads URL/router directly.
- Component fetches data internally.
- Component imports billing/auth/agent runtime clients.
- Component exposes Radix or other headless primitive props wholesale as public API.
- `@taliya/ui` primitive APIs encode CRM domains such as aluno, cobrança, agente, assinatura, or studio finance.
- `@taliya/crm` components redefine primitive visual states that should come from `@taliya/ui`.

## Package Ownership Rule

If a component can be used in at least two product areas without domain-specific copy or data shape, it belongs in `@taliya/ui`.

Examples:

- `IconButton`, `Chip`, `Input`, `Modal`, `Table`, `CalendarCell`, `MessageBubble`, and `FlowNode` are primitives.
- `ShellSidebar`, `AgentPanel`, `SetupShell`, `PaymentCaseCard`, and `QuotaBlockedState` are CRM/product patterns.
- `FinancePriorityPanel` is the official Studio Finance overview priority strip. It receives prepared `items`, `selectedId`, `state`, and `onSelect` props and owns the source-derived row layout; consumers must not recreate the priority strip with local `ListItem`/story CSS.

Temporary CRM implementations extracted from image 79 must either migrate into `@taliya/ui` or become compatibility wrappers around `@taliya/ui` before the library is considered complete.

## Native Compound Root Rule

Native interactive elements inside `@taliya/crm` are allowed only when the native element is the semantic root of a compound component, such as a selectable card, clickable row, avatar trigger, calendar day, or checklist item. The component must still delegate visual subparts to official primitives such as `Icon`, `Avatar`, `Chip`, `Card`, `StatusDot`, `IconButton`, or `Button`.

Native controls are forbidden when they recreate an existing primitive control. Plain standalone buttons, icon buttons, inputs, selects, tabs, chips, tables, and composer controls must use the official `@taliya/ui` primitive or extract a new primitive first.

`corepack pnpm components:audit` is the enforcement gate: any `Refatorar` or `Primitive faltante` row in `component-architecture-audit.*` blocks architecture acceptance.

## CRM Page Pattern APIs

Reusable page patterns in `@taliya/crm`, such as `WorkListDetailPage`, must be slot-based templates:

- accept prepared React nodes for page regions such as filter bars, quick filters, main lists/tables, detail panels, footers, or contextual rails;
- expose layout/state through explicit props such as `state`, `pageLabel`, `mainLabel`, `listLabel`, `detailState`, and `layoutMode`;
- preserve accessibility and overflow boundaries for each region;
- avoid page-specific filter execution, sorting, routing, drawer lifecycle, fetching, persistence, or agent behavior;
- keep visual anatomy inside official child components and tokens, not story-only CSS.

Image coverage stories may assemble these templates with fake data, but the reusable template API is the contract consumed by the future CRM.

`WorkListDetailPage layoutMode="standard" | "main-priority"` controls reusable rail/table allocation. `standard` keeps the default `PageQuickFilters` width for tasks and most operational lists. `main-priority` uses the tokenized compact work-list rail when an external drawer already consumes the right rail and the source page needs the main table to keep priority without local story CSS.

`PageFilterBar` is the single official page filter surface for work lists and overview pages. Search is visible by default for list/search experiences; overview pages such as studio finance may set `searchVisible={false}` to keep the same shell-panel surface, visible filters, advanced modal/popover behavior, actions, height, shadows, borders, and tokens without rendering a search input or creating a separate filter-bar component. Source pages with many short inline filters may use `density="compact"` so the search field yields width to filter controls and actions through official tokens instead of consumer CSS or a page-specific filter bar. Pages such as Reposições that still show five inline filters plus a primary action while the approved source keeps the search field readable use `density="tight"`; this is an official tokenized density, not a story or consumer override. Source pages whose filter icon is visually part of the search field, such as Tarefas image 23, use `searchFilterPlacement="embedded"` so `PageFilterBar` delegates to the official `SearchInput filterPlacement="embedded"` primitive instead of placing a separate circular action between search and filters.

`PageQuickFilters` is the single official quick-filter rail for work-list and kanban pages. It accepts prepared `items`, optional `actions`, `heading`, `groupLabel`, state props, and `selectionTone="strong" | "soft"`. `strong` is the default dark selected state used by Operacao/Kanban and existing consumers. `soft` uses tokenized light-blue selected styling for checklist-style work-list sources whose selected rail item is subtle instead of dark. Consumers must not create task/checklist-specific quick-filter wrappers or local selected-state CSS.

Official CRM page tables such as `TaskTable`, `ChecklistTable`, `ApprovalTable`, `StudentTable`, and `ReplacementTable` are data-presentational components. They accept prepared row objects, selected state, local display state (`source`, `loading`, `empty`, `blocked`), pagination labels and callbacks for row/page/filter actions. They may sort their provided rows locally for header affordance parity, but they must not fetch, route, persist, infer permissions, execute filters, open drawers by themselves, or own product workflow decisions.

`ChecklistTable` selected rows use checklist-specific dot-only selection: soft selected background plus the title-cell dot marker. They must not reuse the `TaskTable` left-rail selected shadow. `TaskTable` keeps the Image 23 left rail selection contract.

`ChecklistDrawer` facts accept prepared display values plus optional `avatarSrc` for responsible/person facts. The drawer renders the avatar with the official `Avatar` primitive and keeps the image decorative inside the avatar wrapper; consumers provide any source image URL and own all person data.

`TaskDrawer` owns the task lifecycle drawer anatomy and exposes `size="default" | "compact"`. `default` preserves the certified Image 18 `401px` task drawer contract. `compact` uses the tokenized compact drawer rail and compact density tokens for list/detail pages such as Image 23 where the table and quick-filter rail need source-like width allocation and the checklist/comments/history/copilot stack must fit above the footer without consumer CSS or story-only drawer overrides. Consumers must coordinate `TaskDrawer size="compact"` with `CrmProductShell drawerSize="compact"` when the shell reserves the right rail. The `activityOrder="history-comments" | "comments-history"` prop controls the order of the history and comments sections while preserving the same drawer primitives; the default `history-comments` protects the Image 18 activity/comment sequence, and `comments-history` supports Image 23 list/detail source order.

`CrmProductShell` owns the product-page chrome, page background, shell panel/control elevation, page-header rhythm, product top-navigation placement, content inset rhythm, and drawer boundary for CRM and Internal consumers. Drawers are passed as prepared nodes through `drawer`; the shell may position them with `drawerPlacement="fixed"` for full-height operational drawers or `drawerPlacement="content"` for source pages whose drawer starts at the content/filter-band height. Drawer rail width is selected through `drawerSize="default" | "compact"` so checklist-style pages can reserve the source-derived compact width without consumer CSS. Page title rhythm is selected through `pageHeaderRhythm="default" | "spacious" | "compact-stacked" | "dashboard" | "stacked" | "overview"`; `stacked` is the official title/subtitle block mode for checklist-style work-list pages whose approved source shows the subtitle below the title, `compact-stacked` preserves that stacked title/subtitle anatomy while using the compact 72px canvas rhythm needed by Reposicoes-style work-list pages, and `overview` is the source-derived compact title-band rhythm for overview pages such as Financeiro where header actions sit on the title band and the searchless filter surface starts higher with compact vertical padding. Content rhythm is selected through `contentLayout="default" | "main-priority" | "kanban"`; `main-priority` is for pages with an external/floating drawer where the approved source gives the main table more left-side canvas while the drawer owns the right rail, and `kanban` is the source-derived Operacao canvas rhythm for board pages that need a smaller left inset without adopting work-list drawer/table allocation. Product top navigation uses the official shell `SegmentedControl` density, transparent shell segmented container surface, active-pill shadow, and shell nav-left tokens; consumers must not locally position, resize, or restyle shell navigation pills or recreate a shell-nav container surface. Consumers must not recreate product-page background, shell panel/control shadows, drawer placement, reserved drawer width, product-shell header rhythm, product-shell content rhythm, or product-shell top-navigation rhythm with local CSS.

For `drawerPlacement="content"`, the product topbar remains full-width because the drawer starts below the topbar/content band; only the main content area reserves drawer width. For `drawerPlacement="floating"`, the main content area still reserves the floating drawer rail, but the product topbar remains full-width so contextual navigation and global actions do not overlap on pages with many top-level tabs. `fixed` drawer placement may reserve topbar width when the drawer visually occupies or protects that topbar area. Floating drawer vertical rhythm is owned by the shell and may use drawer-specific tokens, such as the Image 31 replacement-drawer top offset, so consumers do not tune drawer placement with local CSS.

## Public API Surface Policy

`standard-page-kit.manifest.json` is the canonical set of components expected by `taliya-internal` and the future CRM starter. Components in that manifest are not aliases.

`public-api-surface.manifest.json` documents the public vocabulary around that canonical kit:

- compatibility aliases retained to avoid breaking old consumers, such as `Sidebar`, `Topbar`, `GlobalActions`, `TaskQueueList`, and `ActionMenu`;
- CRM domain specializations over primitives, such as `PageFilterBar` over `FilterBar`, `TaskTable` over `DataTable`, `CrmRecordDrawer` over `Drawer`, and `MetricCard` over `MetricTile`.

New consumers should prefer the canonical component or documented specialization. Do not add a new generic-looking component name when an official primitive or CRM specialization already owns that behavior. If a compatibility alias must be added, it must point to an exported canonical component and pass `corepack pnpm public-api-surface:audit`.

## Accessibility Contract

Interactive components must define:

- keyboard behavior;
- focus behavior;
- accessible name;
- disabled/read-only semantics;
- tooltip or inline reason for blocked disabled actions when relevant.

## Story Contract

Each ready component must have examples for:

- default;
- interactive/focused;
- disabled;
- loading when applicable;
- empty/error/blocked where applicable;
- realistic CRM usage when in `@taliya/crm`.
