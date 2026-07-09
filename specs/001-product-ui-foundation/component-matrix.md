# Component Matrix: P0/P1/P2

## Priority Rules

- **P0**: Required before any credible SaaS screen implementation.
- **P1**: Required for realistic CRM page composition after primitives exist.
- **P2**: Domain-specific or advanced components that depend on P0/P1.

## P0 - Foundations, Primitives, Shell

| Family | Component | Package | Source Evidence | Variants / States | Notes |
| --- | --- | --- | --- | --- | --- |
| Foundations | Design tokens | `tokens` | CRM boards 01, 07-15 | light theme, status semantics, density | Must freeze visual language first. |
| Foundations | Typography tokens | `tokens` | board 01, app screens | page, section, body, small, caption, button | Avoid viewport-scaled font sizes. |
| Foundations | Status semantic tokens | `tokens` | state taxonomy, usage/cotas, approvals | success, warning, danger, info, paused, blocked, quota | Text/icon must accompany color. |
| Shell | `CrmProductShell` | `crm` | images 16, 17-50, 79 | default, internal, empty, selected nav, regions on/off | Canonical SaaS shell for customer CRM and Taliya internal/backoffice. Accepts prepared nav/sidebar/global-action/header/content/drawer props and region flags instead of requiring a separate internal shell. |
| Shell | `Sidebar` | `crm` | images 16-47, 68-69 | compact, expanded later, active, alert | Sidebar groups final route families. |
| Shell | `Topbar` | `crm` | final navigation docs | contextual tabs, light filters, global actions | Final docs beat old image labels. |
| Shell | `PageHeader` | `crm` | all app pages | title, subtitle, breadcrumbs, actions | Avoid hero-style page titles. |
| Shell | `GlobalActions` | `crm` | image 16, app shell images | search, help, notification, account, disabled | Topbar action cluster shared across shells. |
| Navigation | `SidebarItem` | `crm` | app shell images | default, active, alert, disabled | Icon-first. |
| Navigation | `NavPill` | `ui` | app shell/topbar | default, active, disabled | Pill active is black. |
| Navigation | `Breadcrumb` | `ui` | use/cotas, settings | default, current | Keep lightweight. |
| Navigation | `FilterBar` | `ui` | tables and lists | inline, compact, wrapped | Filters are first-class. |
| Navigation | `FilterChip` | `ui` | boards 08/10, pages | selected, removable, disabled | Used for light filters. |
| Actions | `Button` | `ui` | all screens | primary, secondary, destructive, ghost, loading, disabled, blocked | Must cover sensitive actions. |
| Actions | `IconButton` | `ui` | shell, cards, rows | default, selected, subtle, disabled, alert | Circular controls are core visual DNA. |
| Actions | `ButtonGroup` | `ui` | drawers/forms | horizontal, footer, segmented action | Standardize action clusters. |
| Actions | `ActionMenu` | `ui` | tables/cards/drawers | default, disabled, destructive item | Wrap headless dropdown. |
| Status | `Chip` | `ui` | all operational screens | success, warning, danger, info, neutral, paused, blocked | One grammar for all status chips. |
| Status | `Badge` | `ui` | avatars/nav/cards | count, dot, pill | Must not be color-only. |
| Status | `StatusDot` | `ui` | agent panels, rows | online, paused, error, neutral | Compact live status. |
| Status | `QuotaBadge` | `crm` | uso/cotas, agents | 70, 90, 100, normal | Visual only; no quota logic. |
| Forms | `Input` | `ui` | board 08, auth/setup/config | default, focused, error, disabled, read-only | Base field. |
| Forms | `Textarea` | `ui` | setup, support, forms | default, error, disabled | For notes and prompts. |
| Forms | `Select` | `ui` | filters/forms | single, error, disabled | Wrap headless select. |
| Forms | `Checkbox` | `ui` | tables/settings | checked, indeterminate, disabled | Tables and permissions. |
| Forms | `Toggle` | `ui` | settings | on, off, disabled, blocked | Config controls. |
| Forms | `SegmentedControl` | `ui` | modes/filters | single-select, disabled | Used for modes and time filters. |
| Forms | `DateInput` | `ui` | board 08, filters, agenda | empty, selected, disabled, error | Date field primitive for filters and scheduling. |
| Forms | `TimeInput` | `ui` | board 08, agenda/setup | empty, selected, disabled, error | Time field primitive for scheduling surfaces. |
| Forms | `MoneyInput` | `ui` | board 14, finance, billing | BRL, compact, error, disabled | Formatting surface only; no calculation logic. |
| Forms | `FieldGroup` | `ui` | setup/config | default, inline, read-only, compact | Field composition primitive. |
| Surface | `Card` | `ui` | all cards | default, selected, interactive, disabled | Repeated item only; avoid nested cards. |
| Surface | `Panel` | `ui` | page sections | default, elevated, subtle | Larger page surfaces. |
| Surface | `MetricCard` | `crm` | Hoje, Financeiro, Relatorios | default, warning, linked | KPI cards near workflow. |
| Surface | `StatusCard` | `crm` | setup, usage, alerts | ok, attention, blocked | Operational summary. |
| Data | `DataTable` | `ui` | tasks, finance, usage, invoices | sortable, selected row, empty, loading, error | Dense table primitive. |
| Data | `List` | `ui` | inbox, alunos, tasks | default, selected, grouped, empty | Dense list primitive. |
| Data | `ListItem` | `ui` | tri-pane/list-detail | default, selected, unread, warning | Row/card hybrid. |
| States | `EmptyState` | `ui` | board 09, billing/addons | neutral, actionable, blocked | Must include next safe action. |
| States | `LoadingState` | `ui` | board 09 | spinner, skeleton | Context-aware loading text. |
| States | `ErrorState` | `ui` | board 09 | recoverable, blocking | Retry/support actions. |
| States | `Toast` | `ui` | board 09, feedback states | success, warning, danger, info, update | Global transient feedback primitive. |
| States | `InlineAlert` | `ui` | board 09, system/plan/governance | info, warning, danger, success, plan/quota | Inline alert primitive with action/dismiss support. |
| Overlay | `Drawer` | `ui` | images 18, 22, 23, 25+ | side, modal-like, read-only, blocked | Base anatomy. |
| Overlay | `DrawerHeader` | `ui` | all drawers | title, status, meta, close | Standard header. |
| Overlay | `DrawerSection` | `ui` | all drawers | default, subtle, divided | Standard content blocks. |
| Overlay | `DrawerFooter` | `ui` | all drawers | primary/secondary/destructive | Standard action order. |
| Overlay | `Modal` | `ui` | board 09 | default, alert, form | Base modal overlay. |
| Overlay | `ConfirmDialog` | `ui` | board 09, destructive/sensitive actions | destructive, sensitive, blocked | Confirmation primitive only. |
| Agent | `AgentPanel` | `crm` | images 51B, 54, 58, 68-70 | setup, support, flow, execution, usage, operation | Contextual title/role required. |
| Agent | `CopilotSuggestion` | `crm` | inbox/drawers/flows | suggestion, warning, approval-needed | Suggests, does not execute. |
| Agent | `AgentStatus` | `crm` | agents/use/support | active, paused, blocked, helping | Visual status. |
| Identity | `TaliyaLogo` | `ui` | all shells | mark, wordmark, compact | Required for all shells. |
| Identity | `Avatar` | `ui` | shell, profiles, strips | image, initials, status, disabled | User/person identity. |
| Identity | `AvatarStack` | `ui` | board 07, shell refs | stacked, with count, alert | Team/person strip. |
| Icon | `Icon` | `ui` | all screens | size, tone, status | Wrapper around icon registry. |
| Overlay | `Tooltip` | `ui` | icon buttons, blocked controls | default, rich, disabled reason | Required for icon-only controls. |
| Overlay | `Popover` | `ui` | filters, help, menus | default, anchored, dismissible | Headless wrapped. |
| Overlay | `DropdownMenu` | `ui` | action menus | default, destructive item, disabled item | Headless wrapped. |
| Layout | `ProductWindowFrame` | `crm` | all generated image frames | browser-like frame, app frame, frameless | Needed to reconstruct approved screenshots/docs. |
| Layout | `CrmBrowserChrome` | `crm` | 71, 79, browser-window shell frames | default image 79 toolbar, access image 71 toolbar | Official browser chrome composed from traffic lights, toolbar buttons and address bar; access shell uses Image 71 toolbar/address tokens while empty app shell keeps Image 79 rhythm. |
| Layout | `ScrollArea` | `ui` | lists, drawers, panels | vertical, horizontal, shadow edge | Prevent layout drift. |
| Progress | `ProgressBar` | `ui` | usage, setup, subscription | determinate, indeterminate, segmented | Base progress. |
| Search | `SearchInput` | `ui` | tables, topbar, inbox, image 23 task filters | compact, expanded, embedded filter action, loading | Search affordance. Embedded filter action keeps source search shells with the sliders control inside the field. |
| Data | `TablePagination` | `ui` | tables | simple, load-more, cursor label | Table footer pattern. |
| Tabs | `Tabs` | `ui` | profile/config/inbox filters | default, selected, disabled, count | Primitive tabs. |
| Timeline | `Timeline` | `ui` | history/execution/audit | default, compact, with statuses | Shared timeline primitive. |
| Files | `FileUpload` | `ui` | board 14, setup/import | idle, dragging, uploading, error, complete | Upload UI only; consumer owns file handling. |
| Files | `AttachmentList` | `ui` | board 14, support/config | pending, approved, error, removable | Attachment display and actions. |
| Calendar | `CalendarCell` | `ui` | board 14, agenda | empty, today, selected, disabled, conflict | Base calendar grid cell. |
| Calendar | `CalendarEventBlock` | `ui` | board 14, agenda | scheduled, full, available, conflict, cancelled | Base event block used by schedule layouts. |
| Communication | `MessageBubble` | `ui` | board 11, inbox/setup chat | inbound, outbound, internal note, failed, agent suggestion | Primitive message bubble; CRM threads compose it. |
| Communication | `ComposerInput` | `ui` | board 11, inbox/setup chat | empty, typing, disabled, internal, sending | Primitive composer input; CRM composer composes it. |
| Flow | `ConnectorLine` | `ui` | board 07, board 15, flow boards | blue, red, gray, dotted, curved, arrow | Connector primitive for flows, journeys, and visual branching. |
| Flow | `FlowNode` | `ui` | board 15, flow boards | trigger, condition, action, approval, fallback, blocked | Node primitive for visual flow builders. |
| Data Viz | `ChartPanelPrimitive` | `ui` | board 15, reports | line, bar, funnel, ranking, heatmap, empty | Chart shell primitive; chart data/rendering stays consumer-owned. |

## P1 - CRM Layouts And Operational Patterns

| Family | Component | Package | Source Evidence | Variants / States | Notes |
| --- | --- | --- | --- | --- | --- |
| Primitive | `Stepper` | `ui` | boards 13, 15 | complete, current, blocked, pending | Base stepper; setup/subscription steppers compose it. |
| Primitive | `ChecklistItem` | `ui` | boards 13, 15 | complete, incomplete, warning, blocked, action available | Base checklist item used by setup, preflight, and enrollment patterns. |
| Primitive | `MetricTile` | `ui` | boards 10, 12, 15 | default, positive delta, negative delta, warning, selected | Base metric tile; CRM metric cards add product context. |
| Primitive | `StatusSummaryCard` | `ui` | boards 10, 12, 15 | ok, attention, danger, blocked, action | Base status summary card for plan/quota/integration/incident surfaces. |
| Primitive | `DiffTable` | `ui` | boards 14, 15 | changed, removed, added, approved, rejected | Base before/after and approval diff primitive. |
| Primitive | `PermissionTable` | `ui` | boards 12, 15 | allowed, blocked, request access, pending | Base permission table; CRM permission matrix adds domain labels. |
| Primitive | `AuditTable` | `ui` | boards 12, 15 | success, pending, alert, denied | Base audit/event table. |
| Primitive | `ImportProgressCard` | `ui` | board 13 | running, complete, duplicate, error, paused | Base import progress primitive. |
| Primitive | `RelationshipCard` | `ui` | board 13 | primary, related, conflict, selected | Base relationship/contact card. |
| Primitive | `ConflictCard` | `ui` | board 14 | warning, danger, suggestion applied, unresolved | Base conflict explanation card. |
| Primitive | `DocumentPreview` | `ui` | board 14 | preview, signed, pending, error | Base document preview primitive. |
| Primitive | `ExecutionRow` | `ui` | board 15 | running, success, failed, pending, skipped | Base execution/trace row primitive. |
| Primitive | `ConfidenceMeter` | `ui` | board 11 | low, medium, high | Base confidence display for agent quality/lead scoring. |
| Layout | `ListDetailLayout` | `crm` | tasks, students, finance, retention | closed detail, selected detail | Official source-derived 190/780/330 column contract from image 23 with 8px gutters and accessible list/main/detail regions. Structural layout evidence `tmp/visual-audit/batch9/list-detail-layout-final-v1`; full image 23 reconstruction remains dependent on child components and is not image-coverage approval. |
| Layout | `WorkListDetailPage` | `crm` | 21, 23, task/checklist/approval list pages | source, loading, empty, blocked, optional detail, standard rail, main-priority compact rail, wide quick-filter rail | Official page template for CRM work-list screens: shared `PageFilterBar` top slot, `PageQuickFilters` rail slot, main list/table slot and optional `ListDetailLayout` detail slot. It owns only composition, width/height rhythm and accessibility labels; page-specific filters, rows and callbacks remain prepared props. |
| Layout | `CrmPageFamilyShell` | `crm` | 16-17 shell baseline, structural family audit | crm/internal shell, active nav/sidebar/utility, optional drawer | Official shell composition helper for structural page families. It wraps `CrmProductShell`, centralizes active nav/sidebar state and drawer defaults, and prevents domain stories from inventing `SalesShell`, `RetentionShell`, `ReportsShell`, or other parallel shells. |
| Layout | `CrmWorklistPage` | `crm` | 23 worklist reference, 38-44 sales/retention migrations | source, loading, empty, blocked, optional drawer/detail | Official full-page worklist family composition: `CrmPageFamilyShell` + `WorkListDetailPage`. Pages pass prepared filter bar, quick filters, table/list content, drawer and labels; only content/data changes by page. |
| Layout | `CrmWorklistTable` | `crm` | 23 task table reference, 38-44 sales/retention migrations | source, selected row, sortable headers, pagination, loading, empty, blocked | Official visual table for Worklist/Table family pages. It promotes the Image 23 `TaskTable` surface/header/row/footer anatomy into a generic configuration-driven component over `DataTable`/`TablePagination`; pages pass columns, rows, selected id, pagination and callbacks instead of importing `DataTable` directly or creating `TaskTable`/`LeadTable`-style visual wrappers. |
| Operational | `CrmDrawer` | `crm` | 18, 22, 23, 25, 32, 42 | open, loading, blocked, closed/contentless, header order variants | Official CRM drawer frame over the UI drawer primitives: full-height rail, header with close/title/status/eyebrow, scrollable body and fixed footer. Domain drawers such as `TaskDrawer`, `ChecklistDrawer`, and `CaseDrawer` compose this frame; consumers should pass body/footer content instead of recreating drawer structure locally. |
| Layout | `CrmKanbanPage` | `crm` | 21 kanban reference | with/without filter bar, with/without quick filters, optional drawer, after-content/activity | Official full-page kanban family composition: shell + optional filter bar + `KanbanBoard` + optional after-content slot. Finance, operação and sales pipeline should pass lane/card/activity content instead of rebuilding board wrappers. |
| Layout | `CrmDashboardPage` | `crm` | 17 dashboard reference | today, reports, asymmetrical, 2/3/4 columns | Official full-page dashboard/card-grid composition: shell + `DashboardGrid`. Domain pages pass cards/panels only. |
| Layout | `CrmThreePanePage` | `crm` | 24D inbox reference | active list, conversation, context panes, optional filter bar | Official full-page three-pane composition: shell + optional filter/action surface + `ThreePaneLayout`. Inbox/support conversation pages pass filter, list/thread/context slots only. |
| Layout | `CrmRightPanelPage` | `crm` | 61 config/form reference, setup/config/usage assistant rails | fixed, compact, collapsed | Official full-page main + right panel composition: shell + `RightPanelLayout`. Config, flow, usage and assistant-rail pages pass main/panel slots only. |
| Layout | `PageFilterBar` | `crm` | 21, 23 | source, compact, tight, embedded search filter, selected filter, loading, disabled, blocked | Official shared page filter bar wrapper used by Operação and Tarefas; ships default search input plus configurable filters/actions while preserving the certified 977x65 task crop dimensions from image 23. Compact/tight densities cover source pages with many inline filters without consumer CSS, and `searchFilterPlacement="embedded"` covers source search shells whose filter action lives inside the field. Certified evidence `tmp/visual-audit/batch9/task-filter-bar-final-v1`. |
| Layout | `PageQuickFilters` | `crm` | 21, 23 | source, selected, counts, actions, loading, empty, disabled, blocked | Official shared page quick-filter wrapper extracted from Operação image 21 and reused by Tarefas; owns heading, stacked toggle buttons, optional count badges, optional actions slot and tone grammar while page compositions provide their own item data. |
| Tasks | `TaskQueueList` | `crm` | 23 | source, disabled item, loading, empty, blocked | Legacy/crop-certified 190x726 task queue sidebar from image 23, retained for historical parity and backward compatibility only. New/current work-list pages must use the shared `PageQuickFilters` rail instead. Certified evidence `tmp/visual-audit/batch9/task-queue-list-final-v1`. |
| Tasks | `TaskTable` | `crm` | 23 | source, selected row, loading, empty, blocked | Historical/certified task-specific table source for Image 23. Its visual anatomy has been promoted into `CrmWorklistTable`; new Worklist/Table family pages should use `CrmWorklistTable` directly with task/sales/retention-specific column configuration instead of adding domain table wrappers. Certified evidence `tmp/visual-audit/batch9/task-table-final-v1`. |
| Operational | `ChecklistTable` | `crm` | 24 | source, selected row, sortable-ready header, loading, empty, blocked | Page-level checklist execution table composed from `DataTable`, `TablePagination`, `Chip`, and `Avatar`; owns checklist progress/owner/deadline/next-step cells. |
| Operational | `ChecklistDrawer` | `crm` | 24 | open, blocked, completed, loading | Checklist execution drawer composed from shared `CrmDrawerFrame`, facts, progress, steps, latest activity, recent comment, and footer actions. |
| Approvals | `ApprovalTable` | `crm` | 25 | source, selected row, sortable-ready header, loading, empty, blocked | Page-level human-decision table composed from `DataTable`, `TablePagination`, `Chip`, `Avatar`, and `Icon`; owns approval type, requester/agent, risk, cost/quota, deadline, status and latest-activity cells. |
| Agenda | `ReplacementTable` | `crm` | 31 | source, selected row, sortable-ready header, loading, empty, blocked | Page-level reposicoes table composed from `Panel`, `DataTable`, `TablePagination`, `Avatar`, and `Chip`; owns student, original-class, reason/origin, validity, preference, status, next-action and mode cells. |
| Layout | `ThreePaneLayout` | `crm` | Inbox | list, conversation, context | Inbox/conversation pattern. |
| Layout | `ContextPanel` | `crm` | Inbox, support, flows | customer context, agent context, empty | Right context column inside tri-pane experiences. |
| Layout | `RightPanelLayout` | `crm` | setup/config/usage | fixed, collapsible later | Agent/support right rail. |
| Layout | `DashboardGrid` | `crm` | Hoje, reports, usage | 2-col, 3-col, asymmetrical | Dense but readable. |
| Operational | `CrmOperationalPanel` | `crm` | Hoje | source, compact, badge, linked rows | Official operational card/panel wrapper for daily dashboards; composes panel header, icon, badge and row/list content. |
| Operational | `CrmOperationalRows` | `crm` | Hoje | default, dense, compact, checklist, schedule, money | Official row-group renderer for daily operational panels; owns row density and selection/callback wiring. |
| Operational | `CrmOperationalRow` | `crm` | Hoje | default, selected, hover, focus, checklist, schedule, money, disabled | Official interactive row anatomy used inside Hoje cards; composes icon/dot/status/meta/action affordance. |
| Tabs | `ProfileTabs` | `crm` | aluno perfil | resumo, agenda, financeiro, documentos, historico, tarefas | Profile-specific navigation composition using primitive `Tabs`; profile content renders externally. |
| Timeline | `ActivityFeed` | `crm` | hoje history/drawers/profile | source today panel, grouped hours, actor, system event, controls | Operational history with real row/filter/export actions. |
| Timeline | `OperationActivityTable` | `crm` | 21 | source, selected row, hover, focus, loading, empty, blocked | Official bottom activity table for Operacao image 21; rows are real buttons and compose `Avatar`, `Chip`, `Button`, `LoadingState`, `EmptyState` and `InlineAlert`. |
| Timeline | `AuditTrail` | `crm` | 15, approvals/support/internal | source, filtered, sensitive, loading, empty, error, blocked | Official 502x184 compact audit-log panel from image 15; composes primitive `AuditTable` and certified evidence `tmp/visual-audit/batch9/audit-trail-final-v5`. |
| Kanban | `KanbanBoard` | `crm` | 21, finance, sales | source layout, scroll, selected-card passthrough, empty-column passthrough | Official 1284x570 image 21 board layout/container with `PageQuickFilters` rail slot, five lane slots and certified evidence `tmp/visual-audit/batch9/kanban-board-initial`; column/card internals remain separate rows. |
| Kanban | `KanbanColumn` | `crm` | operation, finance, sales | source default, waiting, blocked, resolved, empty, loading, blocked | Official image 21 lane component: 207x570, 28px header, 17px count badge, 185px card stack and certified evidence `tmp/visual-audit/batch9/kanban-card-iteration4`. |
| Kanban | `KanbanCard` | `crm` | operation, finance, sales | manual, blocked, waiting, suggested, resolved, selected, disabled, multi-status | Official image 21 operational card: 185x160 source card, 185x178 multi-status card, tag/icon/status/menu grammar and certified evidence `tmp/visual-audit/batch9/kanban-card-iteration4`. |
| Agenda | `WeeklyCalendar` | `crm` | agenda | source week, selected class, compact, full, available, pending, replacement, conflict | Official image 26 weekly agenda grid: 765x796, 58px time axis, five 137px day columns, 27 positioned class events and certified evidence `tmp/visual-audit/batch9/weekly-calendar-iteration3`. |
| Agenda | `MiniCalendar` | `crm` | agenda filters | source, selected date, today, outside month, disabled days, loading, blocked | Official image 26 mini date picker: 204x242, 35 day buttons, selected `12`, today `18`, certified evidence `tmp/visual-audit/batch9/mini-calendar-iteration5`. |
| Agenda | `ClassCard` | `crm` | agenda/aula | selected pending, scheduled, available, full, conflict/teacher-unavailable, replacement, disabled | Official image 26 class event card: 123x86 selected/pending, 122x85 regular state references, certified evidence `tmp/visual-audit/batch9/class-card-iteration4`. |
| Agenda | `Roster` | `crm` | chamada | pending, present, warned/falta avisada, no-show, replacement/reposiÃ§Ã£o, expected, disabled, legacy absent/corrected aliases | Official image 29 attendance roster: exact 375x368 crop, 5 source rows, status action callbacks, composes `List`, `ListItem`, `Avatar`, `Chip`, `IconButton`, certified evidence `tmp/visual-audit/batch9/roster-iteration2`. |
| Setup | `SetupShell` | `crm` | 51A | source shell layout, loading, blocked | Own setup shell, not CrmProductShell. Approved as layout/casca from exact 51A crop; child internals are certified separately. |
| Setup | `SetupStepper` | `crm` | 51A exact crop `tmp/visual-audit/batch9/setup-stepper-sources/image51a-setup-stepper-panel-candidate1.png` | source six-step rail, current, complete, pending, blocked, loading, horizontal-secondary | Official Image 51A setup rail: 220x738, title/markers/labels/footer, composes primitive `Stepper` with number markers; broader setup block order is not this component contract. |
| Setup | `SetupBlockHeader` | `crm` | 51D v2 exact crop `tmp/visual-audit/batch9/setup-block-header-sources/image51d-setup-block-header-candidate4.png` | source/current, complete, warning, blocked, loading | Official 735x84 setup block header: source white background, title, block chip, subtitle and optional action callback; composes `Chip` and `Button`, not generic page-header geometry. |
| Setup | `SetupBottomBar` | `crm` | 51A exact crop `tmp/visual-audit/batch9/setup-bottom-bar-sources/image51a-setup-bottom-bar-candidate1.png` | source pending, draft/save, ready/publish, published, disabled, collapsed/expanded | Official 1630x73 setup shell footer: environment label, autosave, warning, dividers and collapse toggle; real callbacks are exposed without changing Image 51A visual contract. |
| Setup | `SetupWelcome` | `crm` | 78 exact crop `tmp/visual-audit/batch9/setup-welcome-sources/image78-setup-welcome-candidate2-content-wide.png` | first visit/source, returning, loading, blocked | Official 690x470 welcome/name-entry stack before stepper; composes primitive `Input` and `Button`, with human help handled by separate `SetupHumanHelpCTA`. |
| Setup | `SetupChoiceCard` | `crm` | 51C exact crop `tmp/visual-audit/batch9/setup-choice-card-sources/image51c-setup-choice-card-selected-candidate2.png` | selected/source, default, recommended, disabled | Official 280x90 selectable setup option card from `Modelo principal`; real button with `aria-pressed`, composes primitive `Icon`, reused by 51F/51G/51K choice groups. |
| Setup | `SetupImportSourceCard` | `crm` | 51H exact crop `tmp/visual-audit/batch9/setup-import-source-card-sources/image51h-import-source-card-import-files-wide-candidate2.png` | source pending, selected, imported, error, disabled | Official 166x75 setup import-source option card from `Adicionar alunos`; real button with `aria-pressed`, composes primitive `Icon`, and does not use `ImportProgressCard` geometry. |
| Setup | `SetupReviewPanel` | `crm` | 51L exact crop `tmp/visual-audit/batch9/setup-review-panel-sources/image51l-setup-review-panel-main-candidate1.png` | source/ready, pending, blocked, published | Official 1064x807 final review/publication panel: publish-area buttons, blocking/warning alerts, post go-live cards, safe checklist, confirmation checkbox and footer actions; composes primitive `Chip`, `Icon`, `Button` and real checkbox semantics with tokenized Image 51L geometry. |
| Setup | `SetupAgentChat` | `crm` | 51B exact crop `tmp/visual-audit/batch9/setup-agent-chat-sources/image51b-setup-agent-chat-panel-candidate2.png`, 51A-L setup shell composition | guide/source, human-help selected, blocked | Official 675x1381 contextual setup assistant composed from `TaliyaLogo`, `IconButton`, `MessageBubble`, certified `QuickReplyChips`, composer input/send and human-help footer; certified evidence `tmp/visual-audit/batch9/setup-agent-chat-iteration3`. |
| Setup | `SetupHumanHelpCTA` | `crm` | 78 exact crop `tmp/visual-audit/batch9/setup-human-help-cta-sources/image78-human-help-cta-footer-candidate2.png`, 51A-L setup shell/agent context | schedule/source, active/agendada, unavailable/disabled | Official 372x83 human-help footer CTA from the setup agent panel: top divider plus real link-style button; evidence `tmp/visual-audit/batch9/setup-human-help-cta-iteration1`. |
| Access | `AccessShell` | `crm` | 71 exact crop `tmp/visual-audit/batch9/access-shell-sources/image71-access-shell-window-candidate1.png`; child auth/subscription flows 72-77 | source empty shell, content slot, custom footer | Official 1528x852 pre-CRM access shell; composes `ProductWindowFrame`, Image 71 `CrmBrowserChrome`, `TaliyaLogo`, `IconButton`, `AccessFooterLinks`; certified evidence `tmp/visual-audit/batch9/access-shell-iteration6`. |
| Access | `AuthCard` | `crm` | Images 72/73 exact crops: signup `tmp/visual-audit/batch9/auth-card-sources/image72-auth-card-signup-candidate1.png`; signin `tmp/visual-audit/batch9/auth-card-sources/image73-auth-card-signin-candidate1.png` | signup, signin, loading, signup error, signin error | Certified account auth card; evidence `tmp/visual-audit/batch9/auth-card-iteration5`; composes `SocialAuthButton`, `Input`, `PasswordInput`, `Checkbox`, `Button`, `InlineAlert`. |
| Access | `SocialAuthButton` | `ui` | 72-73 | Google, Microsoft, disabled | Auth provider action. |
| Access | `PasswordInput` | `ui` | 73 | hidden, visible, error, disabled | Sign-in password field. |
| Access | `AccessFooterLinks` | `crm` | Image 71 exact crop `tmp/visual-audit/batch9/access-footer-links-sources/image71-access-footer-links-shell-candidate1.png`; evidence `tmp/visual-audit/batch9/access-footer-links-iteration5` | shell/source, reusable cluster, custom links | Certified pre-CRM footer row; real anchors/callbacks, centered `Termos / Privacidade / Ajuda` cluster, top rule and access shell surface. |
| Subscription | `CheckoutPaymentCard` | `crm` | 74 | default, coupon-applied, coupon-error, loading, blocked | Payment card inside subscription review; composes `Input`, `Button`, and compact `SecurePaymentNotice`. |
| Subscription | `CheckoutReviewPanel` | `crm` | 74 | default review, coupon-applied, loading, blocked | Review before external checkout; composes certified `PlanSummaryCard review` and `CheckoutPaymentCard`. |
| Subscription | `SubscriptionStatusCard` | `crm` | 75-77 | verifying, failed, confirmed | Status card after checkout. |
| Subscription | `SubscriptionProgressStepper` | `crm` | 75 | initiated, verifying, released | Subscription confirmation progress. |
| Subscription | `SubscriptionResolutionPanel` | `crm` | 76 | failed, retry, support | Failed subscription state. |
| Subscription | `ConfirmedSetupHandoff` | `crm` | 77 | confirmed, start setup, schedule help | Bridge to onboarding. |
| Billing | `PlanSummaryCard` | `crm` | 65, 74, 77 | active, review, confirmed, failed | Billing Taliya only. |
| Billing | `InvoiceTable` | `crm` | 66 | source default, open/pending, paid, failed, loading, empty, error, blocked | Official invoice-history panel; composes `Card`, `DataTable`, `Chip`, `ButtonGroup`, `Button`, `Icon`, and state primitives. Certified source evidence: `tmp/visual-audit/batch9/invoice-table-iteration5`. |
| Billing | `AddOnCard` | `crm` | 67 | available, plan-max, consult, active, loading, blocked/unavailable | Official billing add-on card; composes `Card`, `Icon`, `Chip`, and `Button`. Certified source evidence: `tmp/visual-audit/batch9/addon-card-iteration2`. |
| Usage | `QuotaProgress` | `crm` | 68 | normal/42%, 70, 90, 100, loading, disabled/blocked | Official quota cycle card; composes `Card`, `QuotaBadge`, `ProgressBar`, and `Button`. Certified source evidence: `tmp/visual-audit/batch9/quota-progress-iteration5`. |
| Usage | `UsageLedgerTable` | `crm` | 69 | consumed, estimated, reprocessed, loading, empty, error, blocked | Official usage ledger; composes `Card`, `FilterBar`, `Button`, `DataTable`, `Chip`, `Icon`, `EmptyState`, `LoadingState`, and `ErrorState`. Certified source evidence: `tmp/visual-audit/batch9/usage-ledger-iteration5`. |
| Approvals | `ApprovalPanel` | `crm` | 25 | pending source, approved, rejected, expired, loading, blocked | Official human decision panel; composes `Card`, `Chip`, `IconButton`, `Icon`, `Avatar`, and `Button`. Certified source evidence: `tmp/visual-audit/batch9/approval-panel-final-candidate`. |
| Approvals | `ImpactSummary` | `crm` | 61 | source medium, low, high, loading, blocked | Official permissions impact panel; composes `Card`, `ListIcon`, `LoadingState`, and `InlineAlert`. Certified evidence: `tmp/visual-audit/batch9/impact-summary-final-pass`. |
| Approvals | `BeforeAfterDiff` | `crm` | 15 | source settings, text, policy, loading, empty, error, blocked | Official 346x188 before/after diff panel; composes `DiffTable`, `Card`, `Button`, state primitives, and `crm-before-after-diff.*` tokens. Certified evidence: `tmp/visual-audit/batch9/before-after-diff-iteration4`. |
| Forms | `SettingsSection` | `crm` | Image 62 exact crop `tmp/visual-audit/batch9/settings-section-sources/image62-settings-section-financial-rules-candidate1.png` | source financial rules, saved, dirty, loading, blocked | Official 944x250 settings rule section; composes `Card`, `Icon`, `Button`, `Toggle`, state primitives, and `crm-settings-section.*` tokens. Certified evidence: `tmp/visual-audit/batch9/settings-section-iteration5`. |
| Forms | `PermissionMatrix` | `crm` | 61 | source, dirty, read-only, loading, empty, error, blocked | Official 851x259 sensitive-permissions matrix; composes `Card`, `Toggle`, `Select`, state primitives, and `crm-permission-matrix.*` tokens. Certified evidence: `tmp/visual-audit/batch9/permission-matrix-iteration5`. |
| Forms | `RuleRow` | `crm` | 64 exact crop `image64-rule-row-section2-row-critical-candidate1.png` | source critical, operational, informative, off, value, action, blocked, loading | Official 860x35 config rule row; composes `Icon`, `Select`, `Toggle`, optional `Button`, and `crm-rule-row.*` tokens. Certified evidence: `tmp/visual-audit/batch9/rule-row-iteration6`. |
| Config | `SettingsHubCard` | `crm` | 60 | ready, invite-pending, review, connected, pending, loading, blocked | Official 332x286 config hub card; composes `Card`, `Icon`, `Chip`, and `Button`, uses the official `slidersRound` primitive glyph and `crm-settings-hub-card.*` tokens. Certified source evidence: `tmp/visual-audit/batch9/settings-hub-card-iteration7`. |
| Config | `IntegrationStatusRow` | `crm` | Image 62 exact crop `tmp/visual-audit/batch9/integration-status-row-sources/image62-integration-row-pix-candidate1.png`; secondary 51F, 51K, 64 | source blocked, connected, pending, failed, loading, no-divider | Official 224x72 integration/provider item; certified evidence `tmp/visual-audit/batch9/integration-status-row-iteration4`. |
| Config | `UnsavedChangesBar` | `crm` | Image 62 exact crop `tmp/visual-audit/batch9/unsaved-changes-bar-sources/image62-unsaved-changes-bar-full-footer.png`; secondary 61, 63, 64 | source dirty, saving, saved, blocked | Official 943x51 config footer with real cancel/save actions; certified evidence `tmp/visual-audit/batch9/unsaved-changes-bar-iteration2`. |
| Config | `ConfigImpactPreview` | `crm` | 61 exact crop `image61-impact-summary-panel.png`; secondary 62-64/setup docs | source medium, low, high, loading, blocked | Official config impact preview; composes certified `ImpactSummary` and reuses `crm-impact-summary.*` tokens. Certified evidence: `tmp/visual-audit/batch9/config-impact-preview-iteration1`. |
| Inbox | `ConversationList` | `crm` | 24 exact crop `tmp/visual-audit/batch9/conversation-list-sources/image24-conversation-list-left-pane-candidate1.png` | source selected, unread, waiting human, progress, copilot, failed, opt-out, loading, empty, blocked | Official left inbox pane; composes `List`, `ListItem`, `FilterChip`, `Avatar`, `Chip`, `Button`, and `IconButton`. Certified evidence: `tmp/visual-audit/batch9/conversation-list-iteration4`. |
| Inbox | `ConversationThread` | `crm` | 24 Inbox, board 11 | inbound, outbound, agent, human | Message stream composed from `MessageBubble`. |
| Inbox | `Composer` | `crm` | 24 Inbox, board 11 | empty, typing, disabled, handoff | Reply composer composed from `ComposerInput`. |
| Inbox | `ChannelStatus` | `crm` | 24 Inbox, board 11 | connected, opt-out, failed, human active | Channel/queue state. |
| Inbox | `HandoffBanner` | `crm` | 24 Inbox, board 11 | human needed, human active, resumed | Human handoff state. |
| Inbox | `QuickReplyChips` | `crm` | 51B, inbox/support | quick question, suggested action, disabled | Reusable chip row for guided replies. |
| Operational | `ChecklistRow` | `crm` | 23-24, 40, 59 | complete, incomplete, blocked, sensitive | Reusable task/checklist item. |
| Operational | `CommentThread` | `crm` | 23, drawers, support | empty, internal, customer-visible, failed | Visual comments only. |
| Operational | `TaskDrawer` | `crm` | 18, 23 | open, blocked, completed, sensitive | Drawer lifecycle specialization. |
| Operational | `ApprovalDrawer` | `crm` | 25 | pending source, approved, rejected, expired, loading, blocked, closed | Official operational drawer wrapper around certified `ApprovalPanel`; evidence `tmp/visual-audit/batch9/approval-drawer-iteration2`. |
| Operational | `CaseDrawer` | `crm` | 22, 41-44 | source/open, blocked, resolved, loading, closed; retention variants via Batch 10 panels | Official 403x1074 operational case drawer from image 22; evidence `tmp/visual-audit/batch9/case-drawer-final`. |
| Operational | `StudentDrawer` | `crm` | 27-29 | source/open, risk, sensitive, loading, blocked, closed | Official 316x927 student summary drawer from image 27; evidence `tmp/visual-audit/batch9/student-drawer-final`. |
| Operational | `ClassDrawer` | `crm` | 26, 29, 35-36 | source/calling, saved, blocked, loading, closed | Official 414x926 class attendance drawer from image 29; evidence `tmp/visual-audit/batch9/class-drawer-final`. |
| Operational | `PaymentDrawer` | `crm` | 30, 32 | overdue, promise, paid, failed, loading, blocked, closed | Official 371x941 payment collection drawer from image 32; evidence `tmp/visual-audit/batch9/payment-drawer-final`. |
| Operational | `ReplacementDrawer` | `crm` | 31 | requested/source, scheduled, blocked, loading, closed | Official 376x950 replacement fit drawer from image 31; evidence `tmp/visual-audit/batch9/replacement-drawer-final`. |
| Operational | `LeadDrawer` | `crm` | 38 primary; 37/39/40 secondary | interested/source, trial, enrollment, lost, loading, blocked, closed | Official 340x942 sales interested-person drawer from image 38; evidence `tmp/visual-audit/batch9/lead-drawer-final-v2`. |
| Operational | `AgentFlowDrawer` | `crm` | 56 primary; 58/59/70 secondary | flow/source, test, publish, execution, loading, blocked, closed | Official 399x780 contextual agent-flow drawer from image 56; evidence `tmp/visual-audit/batch9/agent-flow-drawer-final-v5`. |
| Operational | `UsageDrawer` | `crm` | 69 primary; 68 secondary | ledger/source, overview, quota, loading, blocked, closed | Official 379x852 contextual usage support drawer from image 69; evidence `tmp/visual-audit/batch9/usage-drawer-final-v3`. |
| Operational | `SupportTicketDrawer` | `crm` | 47 | open, answered, access active, loading, blocked, closed | Official 390x759 support ticket drawer from image 47; composes certified `SupportTicketPanel`; evidence `tmp/visual-audit/batch9/support-ticket-drawer-final-v5`. |
| Operational | `TenantSecurityDrawer` | `crm` | 50 primary; 49 secondary | security review, grant access, allowed, revoked, denied, warning, loading, blocked, closed | Official 346x838 internal tenant security drawer from image 50; composes certified `SecurityRulePanel`; evidence `tmp/visual-audit/batch9/tenant-security-drawer-final-v1`. |
| Setup | `WeeklyHoursGrid` | `crm` | 51D_v2 primary; 63 secondary | editable, readonly, conflict, loading, blocked | Official 445x558 setup weekly schedule preview from image 51D v2; real adjust/slot callbacks; evidence `tmp/visual-audit/batch9/weekly-hours-grid-final-v1`. |
| Setup | `RoleCard` | `crm` | 51E primary owner role row | owner/source, admin, staff, loading, blocked | Official 862x69 setup team role row from image 51E; real select/open callbacks; evidence `tmp/visual-audit/batch9/role-card-final-v1`. |
| Setup | `InviteRow` | `crm` | 51E exact prepared team row crop | prepared/source, accepted, incomplete/warning, expired, loading, blocked | Official 862x46 setup team invite row from image 51E; real open/edit/remove callbacks; evidence `tmp/visual-audit/batch9/invite-row-final-v1`. |
| Setup | `PaymentMethodRow` | `crm` | 51K exact selected Pix method crop; secondary 62/74 payment references | selected/source, connected, failed, disabled, loading; pix, cash, card | Official 310x88 payment-method card from image 51K; real select callback; evidence `tmp/visual-audit/batch9/payment-method-row-final-v1`. |
| Subscription | `SecurePaymentNotice` | `crm` | 74-76 | secure, pending, failed, compact | Trust/status notice for payment handoff. |
| Usage | `UsageOriginRow` | `crm` | 68 exact usage-origin stack crop | attendance, agenda, sales, finance, other; message, automation, import, adjustment; selected, loading, disabled, blocked | Official 380x45 source-row component from image 68; real select callback; evidence `tmp/visual-audit/batch9/usage-origin-row-final-v1`. |
| Reports | `ExportAction` | `crm` | 45 exact global Exportar action crop | default/source, menu closed, menu open, loading, disabled, blocked | Official 115x42 reports export action from image 45; real export/menu callbacks and keyboard/outside-close behavior; no file generation; evidence `tmp/visual-audit/batch9/export-action-final-v1`. |

## P2 - Domain Components And Advanced Patterns

| Family | Component | Package | Source Evidence | Variants / States | Notes |
| --- | --- | --- | --- | --- | --- |
| Agents | `AgentCatalog` | `crm` | 52 | 0, 1, 3, 7 agents | Entitlement visual only. |
| Agents | `AgentCard` | `crm` | 52 | active, not contracted, paused, blocked | Agent summary. |
| Agents | `AgentRoutineCard` | `crm` | 53 | simulated, draft, published, blocked, selected | Routine summary card for an agent detail page. |
| Agents | `ModeSelector` | `crm` | 54, 56 | manual, copiloto, autonomo, approval, exceptions | Mode visual. |
| Agents | `FlowBuilder` | `crm` | 56, 15 | start/middle/end, blocked | Visual flow layout. |
| Agents | `PreflightChecklist` | `crm` | 59 | ok, warning, blocking | Publication gate visual. |
| Agents | `SimulationRunner` | `crm` | 58 | running, success, blocked | Simulation surface. |
| Agents | `ExecutionReceipt` | `crm` | 70 | success, exception, failed | Operational receipt, not raw logs. |
| Agents | `ModeCard` | `crm` | 54, 56 | selected, locked, recommended, disabled | One automation mode option. |
| Agents | `FlowStepCard` | `crm` | 56, 59, 70 | start, middle, end, exception | Flow explanation step. |
| Agents | `ScenarioList` | `crm` | 58 | selected, blocked, passed, failed | Simulation scenarios. |
| Agents | `PhonePreview` | `crm` | 58 | conversation, loading, blocked | Visual channel preview. |
| Agents | `ExecutionTimeline` | `crm` | 58, 70 | running, success, exception, failed | Execution steps. |
| Students | `StudentHeader` | `crm` | 28 | active, risk, sensitive | Profile header. |
| Students | `StudentSummary` | `crm` | 27-28 | agenda, financeiro, tarefas | Summary cards. |
| Students | `StudentTable` | `crm` | 27 | source, selected row, loading, empty, blocked | Student list table composed from official page/table primitives. |
| Students | `RelationshipList` | `crm` | board 13 | responsible, family, contact | Contextual contacts. |
| Financeiro | `FinancePriorityPanel` | `crm` | 30 | source, selected, empty, loading, blocked | Studio finance overview priorities; row data comes from prepared props and callbacks. |
| Financeiro | `PaymentCaseCard` | `crm` | 30, 32-34 | overdue, promise, paid, failed | Studio finance only. |
| Financeiro | `FinanceKanbanCard` | `crm` | 33 | stage variants | Studio finance kanban. |
| Financeiro | `ReconciliationRow` | `crm` | 34 | matched, ambiguous, dispute | Movimentacoes. |
| Vendas | `PipelineCard` | `crm` | 37 | lead, trial, enrollment, lost | Sales pipeline. |
| Vendas | `LeadSummary` | `crm` | 38-40 | hot, no response, trial, enrolled | Interested people. |
| Vendas | `TrialClassCard` | `crm` | 39 | scheduled, attended, no-show, converted | Experimental class card. |
| Vendas | `EnrollmentChecklist` | `crm` | 40 | incomplete, ready, blocked | Matricula. |
| Retencao | `RiskCard` | `crm` | 41 | low, medium, high | Retention risk. |
| Retencao | `CancellationCase` | `crm` | 42 | open, saving, cancelled | Sensitive case. |
| Retencao | `ReactivationCard` | `crm` | 43 | candidate, contacted, reactivated, lost | Reactivation workflow. |
| Retencao | `ComplaintPanel` | `crm` | 44 | severe, waiting, resolved | Complaint handling. |
| Retencao | `SensitiveActionDialog` | `crm` | 42, 44 | destructive, confirmation, blocked | Sensitive CRM action confirmation. |
| Support | `SupportTicketPanel` | `crm` | 47 | open, answered, access active | Support Taliya. |
| Support | `GrantAccessPanel` | `crm` | 47, 49-50 | grant, revoke, expired | Internal/support access. |
| Internal | `TenantCard` | `crm` | 48-50 | active, security, warning | Internal backoffice only. |
| Internal | `InternalOverviewDashboard` | `crm` | 48 | dashboard, configured consumer data | Certified Image 48 dashboard content only. It is rendered inside `CrmProductShell variant="internal"`; consumers pass prepared cards, filters, actions, activity, copiloto copy and callbacks. |
| Internal | `TenantDetailLayout` | `crm` | 49-50 | overview, security, billing, support | Internal detail page. |
| Internal | `SecurityRulePanel` | `crm` | 49-50 | allowed, denied, warning | Internal security rules. |
| Reports | `ChartPanel` | `crm` | 45 | empty, loading, ready | Reports. |
| Reports | `ReportFilterBar` | `crm` | 45 | period, area, exportable | Reports filters. |
| Reports | `OpportunityGroupCard` | `crm` | 46 | source, selected, empty, loading, blocked | Grouped money/opportunity card for the `Dinheiro na mesa` page, replacing story-local opportunity tables. |
| Reports | `OpportunityPanel` | `crm` | 46 | open, assigned, resolved | Dinheiro na Mesa. |
| Data Quality | `ImportProgress` | `crm` | board 13/setup | running, mapped, conflict | Setup/import. |
| Data Quality | `FieldMappingTable` | `crm` | board 13 | mapped, missing, invalid | Import mapping. |
| Data Quality | `DuplicateResolver` | `crm` | board 13 | candidates, merge, keep separate | No autonomous sensitive merge. |
| Advanced States | `PermissionState` | `crm` | state taxonomy | read-only, request access | Block reason + next step. |
| Advanced States | `PlanBlockedState` | `crm` | agents/billing | upgrade, manual continues | Visual only. |
| Advanced States | `QuotaBlockedState` | `crm` | usage/cotas | 70, 90, 100 | Manual path remains. |
| Advanced States | `IntegrationFailedState` | `crm` | config/agents | retry, fallback, support | No raw provider payload. |
| Mobile Future | `MobileShell` | future | mobile audit | deferred variants/states defined by future mobile-specific spec | Future spec only; not part of this desktop/web light-theme library. |

## Standardization Risks

1. **Navigation drift**: old topbars in images can create wrong routes if not normalized.
2. **Drawer duplication**: every page can reinvent detail panels without a base anatomy.
3. **Status drift**: chips can become inconsistent across domains.
4. **Setup confusion**: 8/9 block mismatch can leak into implementation.
5. **Agent panel confusion**: setup assistant label can appear in support/flow/usage contexts.
6. **Finance boundary drift**: Financeiro do studio and Billing Taliya can mix.
7. **Internal/studio leakage**: internal tenant/security controls can appear in customer CRM.
