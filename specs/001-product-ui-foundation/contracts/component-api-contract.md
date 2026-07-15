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

`CrmWorklistTable` is the configurable table standard for new worklist and embedded setup surfaces. Its optional `caption` renders a prepared operational note after the rows and before pagination; consumers must pass content only and must not recreate a caption/footer strip with local markup or CSS.

`ChecklistTable` selected rows use checklist-specific dot-only selection: soft selected background plus the title-cell dot marker. They must not reuse the `TaskTable` left-rail selected shadow. `TaskTable` keeps the Image 23 left rail selection contract.

`ChecklistDrawer` facts accept prepared display values plus optional `avatarSrc` for responsible/person facts. The drawer renders the avatar with the official `Avatar` primitive and keeps the image decorative inside the avatar wrapper; consumers provide any source image URL and own all person data.

`TaskDrawer` owns the task lifecycle drawer anatomy and exposes `size="default" | "compact"`. `default` preserves the certified Image 18 `401px` task drawer contract. `compact` uses the tokenized compact drawer rail and compact density tokens for list/detail pages such as Image 23 where the table and quick-filter rail need source-like width allocation and the checklist/comments/history/copilot stack must fit above the footer without consumer CSS or story-only drawer overrides. Consumers must coordinate `TaskDrawer size="compact"` with `CrmProductShell drawerSize="compact"` when the shell reserves the right rail. The `activityOrder="history-comments" | "comments-history"` prop controls the order of the history and comments sections while preserving the same drawer primitives; the default `history-comments` protects the Image 18 activity/comment sequence, and `comments-history` supports Image 23 list/detail source order.

`CrmProductShell` owns the product-page chrome, page background, browser address through `browserUrl`, page-header/content rhythm, top navigation and drawer boundary for CRM and Internal consumers. `frame="window"` is the flush product window; additive `frame="window-inset"` owns the source stage/inset used by Images 52-53 without changing full-bleed drawer pages. `pageHeaderRhythm="agents"` owns the Image 52 catalog title/canvas axis; `pageHeaderRhythm="agents-routines"` owns the Image 53 breadcrumb, title, status and routine-grid axis; `pageHeaderRhythm="agents-publish"` owns the compact breadcrumb/title axis of Image 59. `CrmRightPanelPage rightPanelVariant="agent-publish"` selects the paired `contentLayout="agent-publish"` canvas while `AgentPublishRoutineWorkspace` owns publication content and `AgentFlowDrawer state="publish"` owns the rail. These variants must be selected per page, not propagated across the Agents family. Governed Internal content layouts include `internal-overview`, `internal-tenants` and `internal-tenant-detail`; they own source insets and page geometry without consumer CSS. `InternalShell` forwards these contracts to `CrmProductShell variant="internal"`. `SupportTicketDrawer variant="internal"` owns the Image 48 ticket rail; `TenantSummaryDrawer` composes `CrmDrawer` and owns the Image 49 selected-tenant facts, health, security, activity, copilot and actions. `InternalWorklistPage` defaults to `work-list` but honors an explicit official content layout such as `internal-tenants`. For Image 50, `TenantDetailLayout` owns the tenant header, summary, tabs, domain grid, `SecurityRulePanel` rail and optional audit `footerNote` under `contentLayout="internal-tenant-detail"`; the page must not mount a duplicate `TenantSecurityDrawer`. Consumers must not recreate shell, drawer, filter, worklist/table, detail-grid or page-header anatomy locally.

`CrmRightPanelPage rightPanelVariant="agent-execution"` owns the Image 70 receipt/rail allocation. It gives the official `ExecutionReceipt` a `1007px` main track, preserves the total right-panel width with a `368px` reserve and applies only the source-backed `-5px` offset; `AgentFlowDrawer state="execution"` remains the drawer owner. Consumers must not tune these columns or offsets locally.

`CrmRightPanelPage rightPanelVariant="agent-routine"` owns the Image 54 routine-detail frame and selects `contentLayout="agent-routine"`. Pair it with `pageHeaderRhythm="agents-routine-detail"`, the canonical URL/breadcrumb/meta, `AgentRoutineWorkspace` in `main`, and `AgentFlowDrawer state="routine"` in the floating drawer slot. The package owns mode and flow density, bottom actions, routine-specific drawer geometry and contextual copy; consumers provide data, state and callbacks only. Images 53, 56, 58, 59 and 70 must not inherit this scoped geometry.

`CrmRightPanelPage rightPanelVariant="agent-flow"` owns the Image 56 flow-detail frame and selects `contentLayout="agent-flow"`. Pair it with `pageHeaderRhythm="agents-flow-detail"`, the canonical URL/breadcrumb/meta, `AgentFlowWorkspace` in `main`, and `AgentFlowDrawer state="flow"` in the floating drawer slot. The package owns mode, builder, settings, bottom actions and flow-specific drawer geometry; consumers provide data, state and callbacks only. Images 54, 58, 59 and 70 must not inherit this scoped geometry.

`CrmRightPanelPage rightPanelVariant="agent-test"` owns the Image 58 test frame and selects `contentLayout="agent-test"`. Pair it with the canonical URL/breadcrumb/meta, `SimulationRunner` in `main`, and `AgentFlowDrawer state="test"` in the floating drawer slot. The package owns scenarios, phone, timeline, action rhythm, panel height and test-specific drawer geometry; consumers provide data, state and callbacks only. Images 54, 56, 59 and 70 must not inherit this scoped geometry.

`CrmDashboardPage layoutVariant="settings-hub"` owns the Image 60 four-column hub canvas and selects `contentLayout="settings-hub"`; pair it with `pageHeaderRhythm="settings-hub"` and `topNavSelection="none"`. The eight domain areas remain prop-driven `SettingsHubCard` instances. The page variant must not be applied to Images 61-64, whose right-panel detail layouts remain independent.

`CrmRightPanelPage rightPanelVariant="settings-permissions"` owns the Image 61 permissions frame and `887px 440px` main/assistant allocation. Pair it with `topNavSelection="none"`, the canonical browser URL and breadcrumb, `SettingsPermissionsWorkspace` in `main`, and `SettingsAgentPanel` in `panel`. The workspace owns roles, permission matrix, impact preview and save actions; consumers provide data, state and callbacks only. Images 62-64 remain on the generic `settings` variant and must not inherit the permissions-specific frame or density.

For `drawerPlacement="content"`, the product topbar remains full-width because the drawer starts below the topbar/content band; only the main content area reserves drawer width. For `drawerPlacement="floating"`, the main content area still reserves the floating drawer rail, but the product topbar remains full-width so contextual navigation and global actions do not overlap on pages with many top-level tabs. `fixed` drawer placement may reserve topbar width when the drawer visually occupies or protects that topbar area. Floating drawer vertical rhythm is owned by the shell and may use drawer-specific tokens, such as the Image 31 replacement-drawer top offset, so consumers do not tune drawer placement with local CSS.

`SetupPage` composes the official `SetupShell` and owns setup page framing. `guided` is the compact-rail frame, `guided-block` is the 51D-51F wide-rail frame, `guided-main` is the 51G/51K wide-center/narrow-agent frame, and `guided-wide` is the 51I/51J `207px 1062px 338px` frame with the shared `79/770/65px` vertical rhythm. `guided-review` owns the Image 51L `210px 1064px 344px` frame, `74/807/52px` vertical rhythm, edge-to-edge review panel and compact `60px` nine-step rail. `shell-global` remains the Image 51A inset and `layout="welcome"` remains independent. Consumers pass step, progress, prepared content and callbacks and must not recreate setup chrome locally. A frame variant must not be propagated without source-sized evidence and shared sentinels.

`WeeklyHoursGrid` keeps `variant="availability"` as the editable day-availability contract and adds `variant="schedule"` for a discrete weekly event preview. Schedule consumers provide the display `axis`, day list, event `slots`, optional `meta`/`tone`, and `onSlotClick`; the package owns the axis, cells, accessible event buttons and status treatment. `SetupAgendaWorkspace` uses this mode for Image 51J instead of approximating agenda events with coarse availability ranges.

`SetupAgentChat` keeps `variant="step"` as the exact Image 51B full chat/composer contract and adds `variant="welcome"` for the responsive Image 78 rail. The welcome variant owns the introductory message, source quick questions, human-help footer, shell inset and native `428px` density; it does not scale or duplicate the 51B frame. Consumers choose the semantic variant and pass callbacks only.

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
