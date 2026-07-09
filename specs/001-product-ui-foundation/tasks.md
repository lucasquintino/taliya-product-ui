# Tasks: Taliya Product UI Spec Completion

**Input**: Design documents from `/specs/001-product-ui-foundation/`  
**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `architecture.md`, `data-model.md`, `component-matrix.md`, `component-source-map.md`, `image-coverage-map.md`, `spec-completeness-review.md`, `token-values-v0.md`, `token-system-v1.md`, `primitive-ui-matrix.md`, `implementation-execution-plan.md`, `contracts/`

**Scope**: These tasks complete and validate the Spec Kit source of truth only. They do not install dependencies, create component files, run Storybook, implement package code, implement SaaS screens, or connect backend/API/auth/billing/agent logic.

**Organization**: Tasks are grouped by user story so the specification can be reviewed and approved before future implementation work starts.

## Phase 1: Setup And Source Inventory

**Purpose**: Confirm the standalone spec project is understandable and not coupled to the landing or future SaaS app.

- [ ] T001 Confirm `C:\Users\lucas\taliya-product-ui` is a standalone Git repository in `C:\Users\lucas\taliya-product-ui`
- [ ] T002 Confirm active Spec Kit feature points to `specs/001-product-ui-foundation` in `C:\Users\lucas\taliya-product-ui\.specify\feature.json`
- [ ] T003 Confirm contributor rules require all source-of-truth artifacts in `C:\Users\lucas\taliya-product-ui\AGENTS.md`
- [ ] T004 Confirm project scope excludes landing, backend, real auth, real billing, real agent decisions, and SaaS routing in `C:\Users\lucas\taliya-product-ui\README.md`
- [ ] T005 Confirm workspace placeholders are present only as project shape, not implementation, in `C:\Users\lucas\taliya-product-ui\pnpm-workspace.yaml`
- [ ] T006 [P] Confirm package placeholders document intended ownership in `C:\Users\lucas\taliya-product-ui\packages\tokens\README.md`
- [ ] T007 [P] Confirm package placeholders document intended ownership in `C:\Users\lucas\taliya-product-ui\packages\ui\README.md`
- [ ] T008 [P] Confirm package placeholders document intended ownership in `C:\Users\lucas\taliya-product-ui\packages\crm\README.md`
- [ ] T009 [P] Confirm docs placeholder documents future Storybook purpose in `C:\Users\lucas\taliya-product-ui\apps\docs\README.md`
- [ ] T010 Confirm no source file instructs this library to consume landing code in `C:\Users\lucas\taliya-product-ui\README.md`

**Checkpoint**: The project shell is a clean Spec Kit library workspace, not an implementation branch.

---

## Phase 2: Completeness Gates

**Purpose**: Freeze the rules that define "100% spec complete" before component implementation is allowed.

- [ ] T011 Confirm constitution requires product UI only, library-first APIs, token-driven styling, accessibility, Storybook, package boundaries, and no real product logic in `C:\Users\lucas\taliya-product-ui\.specify\memory\constitution.md`
- [ ] T012 Confirm plan summary says this phase specifies the library and does not implement components in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\plan.md`
- [ ] T013 Confirm functional requirements include image coverage, tokens, access/subscription, navigation, drawers, states, icons/fonts, and future QA gates in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\spec.md`
- [ ] T014 Confirm success criteria include 100% approved image rows, 100% approved image family coverage, and readiness coverage for matrix rows in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\spec.md`
- [ ] T015 Confirm planning checklist says this is spec completeness, not implementation execution, in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\checklists\requirements.md`
- [ ] T016 Confirm source-image statuses include Covered, Covered/Adjusted, Historical, Duplicate, Rejected, and Superseded in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\image-coverage-map.md`
- [ ] T017 Confirm every non-target image has an explicit reason in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\image-coverage-map.md`
- [ ] T018 Confirm every approved target image has required components listed in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\image-coverage-map.md`
- [ ] T019 Confirm known adjustment targets 72/73 and 51H/51I/51J are captured in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\image-coverage-map.md`
- [ ] T020 Confirm completeness verdict, coverage by area, resolved inconsistencies, base components, and stop rule are documented in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\spec-completeness-review.md`
- [ ] T021 Confirm every component in the matrix has an exact extraction row in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-source-map.md`
- [ ] T021a Confirm implementation batches, acceptance checklist, and stop conditions are documented in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\implementation-execution-plan.md`

**Checkpoint**: The spec has objective pass/fail gates for completeness.

---

## Phase 3: User Story 1 - Establish Product UI Source Of Truth (Priority: P1)

**Goal**: Make the project self-explanatory and safe for future contributors.

**Independent Test**: A reviewer can understand scope, exclusions, architecture, package boundaries, image coverage, and approval gates from the Spec Kit files without opening the landing project.

- [ ] T022 [US1] Confirm source-of-truth artifact list is complete in `C:\Users\lucas\taliya-product-ui\AGENTS.md`
- [ ] T023 [US1] Confirm source-of-truth artifact list is complete in `C:\Users\lucas\taliya-product-ui\README.md`
- [ ] T024 [US1] Confirm user stories describe source-of-truth, foundations/primitives, CRM patterns, and docs workflow in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\spec.md`
- [ ] T025 [US1] Confirm assumptions explicitly state Pilates is context, not dependency, in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\spec.md`
- [ ] T026 [US1] Confirm architecture explains package responsibilities for `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`, and `apps/docs` in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\architecture.md`
- [ ] T027 [US1] Confirm research records accepted and rejected tooling decisions in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\research.md`
- [ ] T028 [US1] Confirm conceptual entities cover packages, tokens, primitives, CRM patterns, states, stories, and matrix entries in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\data-model.md`
- [ ] T029 [US1] Confirm quickstart tells reviewers how to inspect the spec without installing dependencies in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\quickstart.md`

**Checkpoint**: The source of truth is readable, bounded, and reviewable.

---

## Phase 4: User Story 2 - Specify Foundations And Primitives (Priority: P1)

**Goal**: Specify every P0 foundation and primitive needed before future domain implementation.

**Independent Test**: P0 rows define package owner, source evidence, variants/states, and notes sufficient to generate future component implementation tasks.

- [ ] T030 [P] [US2] Confirm historical extracted color, status, typography, spacing, layout, radius, border, shadow, icon, avatar, and motion values in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\token-values-v0.md`
- [ ] T031 [P] [US2] Confirm token naming, outputs, visual direction, and v1 token layering in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\token-contract.md`
- [ ] T031a [P] [US2] Confirm raw, semantic, component/density, connector, chart, focus, and motion tokens in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\token-system-v1.md`
- [ ] T031c [P] [US2] Confirm `Foundations / Tokens` is treated as the mandatory visual-value contract and every future primitive must consume official tokens before component CSS is accepted in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\implementation-execution-plan.md`
- [ ] T031b [P] [US2] Confirm every `Primitives / UI` component has source image, required anatomy, variants/states, token dependencies, and later composition targets in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\primitive-ui-matrix.md`
- [ ] T032 [P] [US2] Confirm public props, state props, events, forbidden APIs, and accessibility rules in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\component-api-contract.md`
- [ ] T033 [P] [US2] Confirm icon wrapper, icon registry, icon sizing, icon-only control, and font-loading rules in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\icon-font-contract.md`
- [ ] T034 [US2] Confirm foundations rows cover design tokens, typography tokens, and status semantic tokens in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T035 [US2] Confirm action rows cover Button, IconButton, ButtonGroup, and ActionMenu in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T036 [US2] Confirm status rows cover Chip, Badge, StatusDot, and QuotaBadge in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T037 [US2] Confirm forms rows cover Input, Textarea, Select, Checkbox, Toggle, SegmentedControl, FieldGroup, MoneyInput, FileUpload, AttachmentList, SearchInput, and PasswordInput in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T038 [US2] Confirm surface rows cover Card, Panel, MetricCard, StatusCard, ProductWindowFrame, ScrollArea, and ProgressBar in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T039 [US2] Confirm data rows cover DataTable, TablePagination, List, and ListItem in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T040 [US2] Confirm overlay rows cover Drawer anatomy, Modal, ConfirmDialog, Tooltip, Popover, and DropdownMenu in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T041 [US2] Confirm state rows cover EmptyState, LoadingState, ErrorState, PermissionState, PlanBlockedState, QuotaBlockedState, and IntegrationFailedState in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T042 [US2] Confirm identity rows cover TaliyaLogo, Avatar, AvatarStack, and Icon in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`

**Checkpoint**: P0 foundations and primitives can be implemented later without re-auditing the 1:1 clone sources.

---

## Phase 5: User Story 3 - Specify CRM Patterns Without Product Logic (Priority: P2)

**Goal**: Specify CRM-level components and domain patterns required to reconstruct approved images while keeping business logic outside the library.

**Independent Test**: CRM rows define package owner, source evidence, variants/states, and logic boundaries for every approved image family.

- [ ] T043 [P] [US3] Confirm shell/navigation rows cover CrmProductShell, AccessShell, SetupShell, Sidebar, Topbar, PageHeader, GlobalActions, SidebarItem, NavPill, Breadcrumb, FilterBar, and FilterChip in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T044 [P] [US3] Confirm navigation contract defines final sidebar families and contextual topbar rules in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\navigation-contract.md`
- [ ] T045 [P] [US3] Confirm layout rows cover ListDetailLayout, ThreePaneLayout, ContextPanel, RightPanelLayout, and DashboardGrid in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T046 [US3] Confirm drawer lifecycle contract defines default-closed behavior, anatomy, drawer families, and action rules in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\drawer-lifecycle-contract.md`
- [ ] T047 [US3] Confirm specialized drawer rows cover TaskDrawer, ApprovalDrawer, CaseDrawer, StudentDrawer, ClassDrawer, PaymentDrawer, ReplacementDrawer, LeadDrawer, AgentFlowDrawer, UsageDrawer, SupportTicketDrawer, and TenantSecurityDrawer in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T048 [US3] Confirm setup rows cover SetupStepper, SetupBlockHeader, SetupBottomBar, SetupWelcome, SetupChoiceCard, SetupImportSourceCard, SetupReviewPanel, SetupAgentChat, SetupHumanHelpCTA, WeeklyHoursGrid, RoleCard, InviteRow, and PaymentMethodRow in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T049 [US3] Confirm access/subscription rows cover AuthCard, SocialAuthButton, AccessFooterLinks, CheckoutReviewPanel, SubscriptionStatusCard, SubscriptionProgressStepper, SubscriptionResolutionPanel, ConfirmedSetupHandoff, SecurePaymentNotice, and PlanSummaryCard in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T050 [US3] Confirm inbox rows cover ConversationList, ConversationThread, MessageBubble, Composer, ChannelStatus, HandoffBanner, QuickReplyChips, and ContextPanel in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T051 [US3] Confirm operational rows cover ChecklistRow, CommentThread, ApprovalPanel, ImpactSummary, BeforeAfterDiff, Timeline, ActivityFeed, and AuditTrail in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T052 [US3] Confirm agenda rows cover WeeklyCalendar, MiniCalendar, ClassCard, Roster, WeeklyHoursGrid, and replacement/class states in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T053 [US3] Confirm kanban rows cover KanbanBoard, KanbanColumn, KanbanCard, FinanceKanbanCard, and PipelineCard in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T054 [US3] Confirm agent rows cover AgentPanel, CopilotSuggestion, AgentStatus, AgentCatalog, AgentCard, ModeSelector, ModeCard, FlowBuilder, FlowStepCard, ScenarioList, PhonePreview, SimulationRunner, PreflightChecklist, ExecutionReceipt, and ExecutionTimeline in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T055 [US3] Confirm studio finance rows are separate from Taliya billing rows in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T056 [US3] Confirm usage/cotas rows cover QuotaProgress, UsageLedgerTable, UsageOriginRow, QuotaBadge, QuotaBlockedState, and UsageDrawer in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T057 [US3] Confirm sales rows cover LeadSummary, LeadDrawer, PipelineCard, EnrollmentChecklist, TrialClassCard, and sales states in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T058 [US3] Confirm retention rows cover RiskCard, CancellationCase, ComplaintPanel, ReactivationCard, SensitiveActionDialog, and CaseDrawer variants in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T059 [US3] Confirm support/internal rows cover SupportTicketPanel, GrantAccessPanel, InternalOverviewDashboard, TenantCard, TenantDetailLayout, SecurityRulePanel, and TenantSecurityDrawer in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T060 [US3] Confirm reports/data-quality rows cover ChartPanel, ReportFilterBar, OpportunityPanel, ExportAction, ImportProgress, FieldMappingTable, and DuplicateResolver in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T061 [US3] Confirm state taxonomy covers global states and object statuses for aluno, interessado, aula, presenca, reposicao, pagamento, conversa, caso, fluxo, and assinatura in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\state-taxonomy-contract.md`

**Checkpoint**: CRM/domain patterns are specified without adding product logic to the library.

---

## Phase 6: User Story 4 - Specify Reviewable Documentation Workflow (Priority: P2)

**Goal**: Define how future Storybook/docs prove every component and approved image is covered.

**Independent Test**: A reviewer can determine what stories, fake data, states, accessibility notes, and image-coverage compositions are required before future implementation is accepted.

- [ ] T062 [P] [US4] Confirm current Storybook groups are limited to Foundations, Primitives / UI, CRM / Shell / Components, and CRM / Image Coverage until later component groups have source-image 1:1 clone proof in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`
- [ ] T063 [P] [US4] Confirm Storybook rules require fake data only and forbid backend/API calls in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`
- [ ] T064 [US4] Confirm P0 story requirements include default, active/selected, disabled, loading, error/invalid, blocked reason, dense CRM example, focus, and accessibility notes in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`
- [ ] T065 [US4] Confirm image-coverage stories must represent all Covered and Covered/Adjusted image rows in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`
- [ ] T066 [US4] Confirm future visual QA gates include `pnpm lint`, `pnpm test`, `pnpm build`, Storybook build, and Playwright story smoke checks in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\quickstart.md`
- [ ] T067 [US4] Confirm public package imports and forbidden dependency rules are documented in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\package-boundaries.md`
- [ ] T068 [US4] Confirm future release readiness requires docs coverage, state coverage, package exports, accessibility behavior, and image coverage in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`

**Checkpoint**: Future implementation cannot claim readiness without visible docs and image coverage.

---

## Final Phase: Spec QA And Handoff

**Purpose**: Validate this Spec Kit package before asking for approval.

- [ ] T069 Run prerequisite validation for the active feature and record the result for `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation`
- [ ] T070 Search for unresolved placeholders such as `NEEDS CLARIFICATION`, `TODO`, `TKTK`, `unmapped`, and `???` in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation`
- [ ] T071 Confirm all contracts referenced from `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\plan.md` exist on disk
- [ ] T072 Confirm all required source-of-truth artifacts listed in `C:\Users\lucas\taliya-product-ui\AGENTS.md` exist on disk
- [ ] T073 Confirm image coverage references no component family absent from `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md`
- [ ] T074 Confirm `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\component-matrix.md` contains no mobile implementation target except future-only `MobileShell`
- [ ] T075 Confirm `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\tasks.md` contains no instruction to install dependencies or implement components now
- [ ] T076 Confirm `git status --short` in `C:\Users\lucas\taliya-product-ui` contains only intentional Spec Kit/project files
- [ ] T077 Confirm approved images are defined as canonical 1:1 component clone sources, not inspiration or loose visual references, in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\visual-parity-contract.md`
- [ ] T078 Confirm source assets directory and missing-image behavior are documented in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\source-assets-contract.md`
- [ ] T079 Confirm future Storybook stories must cite source image filenames and reproduce approved density, spacing, hierarchy, anatomy, and state grammar identically in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\storybook-contract.md`
- [ ] T080 Confirm allowed deviations from approved images are limited to navigation/setup corrections, accessibility, fake-data replacement, and non-target statuses in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\contracts\visual-parity-contract.md`
- [ ] T080a Confirm missing visual values are stop conditions and must be added to `@taliya/tokens` / `Foundations / Tokens` before any primitive or CRM component CSS uses them in `C:\Users\lucas\taliya-product-ui\specs\001-product-ui-foundation\implementation-execution-plan.md`
- [ ] T081 Prepare suggested checkpoint message `docs: complete Taliya Product UI Spec Kit`

---

## Dependencies & Execution Order

- Phase 1 must be reviewed before any completeness gate is accepted.
- Phase 2 must pass before user stories are considered reviewable.
- US1 and US2 can be reviewed in parallel after Phase 2.
- US3 depends on the P0/P1/P2 matrix and package boundaries.
- US4 depends on Storybook/docs, image coverage, and component readiness rules.
- Final QA depends on all previous phases.

## Parallel Opportunities

- T006-T009 can run in parallel.
- T030-T033 can run in parallel.
- T043-T045 can run in parallel.
- T062-T063 can run in parallel.

## Handoff Rule

When all tasks pass, stop for user approval. Do not install dependencies, scaffold component source files, create Storybook config, or implement UI components until the user explicitly approves the implementation phase.
