# Spec Completeness Review

## Verdict

The Spec Kit target for this phase is a complete, pre-implementation source of truth for the Taliya Product UI component library.

This phase must be considered complete only when:

- every approved CRM source image has coverage in `image-coverage-map.md`;
- every required reusable component family is represented in `component-matrix.md`;
- every component row has an exact extraction row in `component-source-map.md`;
- the official future implementation order is documented in `implementation-execution-plan.md`;
- token values, navigation rules, drawer lifecycle, state taxonomy, icon/font rules, package boundaries, component API rules, and Storybook rules are explicitly documented;
- approved generated images are documented as 1:1 component clone sources, not loose inspiration;
- the source image directory is documented so future component work inspects the actual files;
- access/subscription, onboarding/setup, logged-in CRM, agents/flows, billing/usage, support, and internal backoffice are covered;
- no task instructs dependency installation or component implementation before user approval.

## What Changed From "Foundation" To "100% Spec"

The earlier framing was too narrow because it treated the work as an initial foundation. The corrected framing is:

- complete specification now;
- implementation later;
- no backend/API/auth/billing/agent runtime;
- no landing dependency;
- no Storybook execution or package installation during spec review.

## Required Source Artifacts

| Artifact | Purpose | Required For Completeness |
| --- | --- | --- |
| `spec.md` | Product/design requirements and success criteria | scope, stories, FR/SC gates |
| `plan.md` | Technical and architectural plan | stack target, package shape, constraints |
| `architecture.md` | Package and domain structure | ownership and dependency direction |
| `component-matrix.md` | Canonical component backlog | P0/P1/P2, variants, states, sources |
| `component-source-map.md` | Component extraction map | primary/secondary sources and anatomy per component |
| `primitive-ui-matrix.md` | Primitive extraction and ownership map | official `Primitives / UI` set, source images, variants, states, token dependencies |
| `image-coverage-map.md` | Source-image coverage proof | every approved image mapped |
| `source-assets-contract.md` | Source image location and rules | actual files, missing-image behavior |
| `token-values-v0.md` | Canonical visual values | colors, typography, spacing, radius, shadows |
| `token-system-v1.md` | Token implementation target | raw, semantic, component/density, connector, chart, focus, motion tokens |
| `implementation-execution-plan.md` | Implementation execution queue | official batches, acceptance checklist, stop conditions |
| `visual-parity-contract.md` | Approved-image fidelity rule | clone visible component content/anatomy, not generic inspiration |
| `data-model.md` | Conceptual entities | packages, tokens, components, states, stories |
| `research.md` | Tooling decisions | accepted/rejected stack choices |
| `quickstart.md` | Review workflow | how to inspect without implementing |
| `tasks.md` | Spec-readiness checklist | approval gates before future implementation |
| `contracts/` | Formal contracts | APIs, boundaries, states, docs, drawers, navigation |

## Coverage By Product Area

| Area | Coverage Status | Main Artifacts |
| --- | --- | --- |
| Visual DNA/tokens | Covered | `token-values-v0.md`, `token-contract.md`, matrix P0 |
| Shell/layout | Covered | `architecture.md`, `navigation-contract.md`, matrix P0/P1 |
| Sidebar/topbar/navigation | Covered | `navigation-contract.md`, matrix P0 |
| Primitives/buttons/inputs/status | Covered | `component-api-contract.md`, matrix P0 |
| Tables/lists/filters | Covered | matrix P0/P1 |
| Overlays/modals/drawers | Covered | `drawer-lifecycle-contract.md`, matrix P0/P1 |
| Onboarding/setup | Covered | matrix P1, image coverage 51A-51L and 78 |
| Access/subscription | Covered | matrix P1, image coverage 71-77 |
| Agents/flows/executions | Covered | matrix P2, image coverage 52-56, 58-59, 70 |
| Inbox/conversation | Covered | matrix P1, image coverage 24 and board 11 |
| Agenda/calendar | Covered | matrix P1/P2, image coverage 26, 29, 31, 35-36 |
| Financeiro studio | Covered separately | matrix P2, image coverage 30, 32-34 |
| Billing Taliya | Covered separately | matrix P1, image coverage 65-67 and 74-77 |
| Uso/cotas | Covered separately | matrix P1/P2, image coverage 68-69 |
| Vendas | Covered | matrix P2, image coverage 37-40 |
| Retencao | Covered | matrix P2, image coverage 41-44 |
| Relatorios | Covered | matrix P2, image coverage 45-46 |
| Suporte | Covered | matrix P2, image coverage 47 |
| Internal backoffice | Covered separately | matrix P2, image coverage 48-50 |

## Etapa 0/1 Addendum

After the image 79 shell extraction review, the foundation needs a stricter primitive/token gate before expanding implementation beyond the shell.

New decisions:

- `Primitives / UI` maps to `@taliya/ui`.
- `CRM / Shell / Components` maps to `@taliya/crm` composed shell components.
- reusable primitives currently implemented as `Crm*` bridges must migrate into `@taliya/ui` or wrap canonical `@taliya/ui` primitives before the library is considered complete.
- Storybook must not display speculative generic galleries as approved components.
- domain components from images 10-15 must wait until the P0 primitives in `primitive-ui-matrix.md` have canonical UI ownership and token coverage from `token-system-v1.md`.

## Key Inconsistencies Resolved In The Spec

| Inconsistency | Decision |
| --- | --- |
| Old image navigation labels vs final product navigation | `navigation-contract.md` wins over historical labels |
| Setup block numbering drift | Official setup has 9 blocks: Studio, Equipe, Canais, Planos, Pagamento, Alunos, Turmas, Agenda, Revisao |
| Agent panel named only as setup assistant | `AgentPanel` is contextual: setup, support, flow, execution, usage, operation |
| Financeiro do studio vs Taliya billing | Separate component families and examples |
| Billing vs usage/cotas | Separate component families and state semantics |
| App CRM vs access/subscription shell | Separate `CrmProductShell` and `AccessShell` |
| Customer CRM vs internal backoffice | Single configurable `CrmProductShell`; internal/backoffice supplies nav/content/slots through props and uses `InternalOverviewDashboard` for the certified image 48 dashboard content |
| Generic drawers per screen | Drawer lifecycle contract plus specialized drawer families |
| Status chip drift | Shared state taxonomy and semantic tokens |
| Loose inspiration from generated images | Approved images become 1:1 component clone sources for component extraction |
| Implementing from filenames or memory | Source-assets contract requires inspecting actual image files |

## Components That Must Become Design System Base

P0 base:

- tokens, typography, status semantics;
- Button, IconButton, ButtonGroup, ActionMenu;
- Chip, Badge, StatusDot, QuotaBadge;
- Input, Textarea, Select, Checkbox, Toggle, SegmentedControl, SearchInput;
- Card, Panel, MetricCard, StatusCard;
- DataTable, List, ListItem, TablePagination;
- EmptyState, LoadingState, ErrorState;
- Drawer anatomy, Modal, ConfirmDialog, Tooltip, Popover, DropdownMenu;
- TaliyaLogo, Avatar, AvatarStack, Icon;
- ProductWindowFrame, ScrollArea, ProgressBar;
- CrmProductShell, Sidebar, Topbar, PageHeader, SidebarItem, NavPill, Breadcrumb, FilterBar, FilterChip.

P1 base:

- CRM layouts: ListDetailLayout, ThreePaneLayout, ContextPanel, RightPanelLayout, DashboardGrid;
- Tabs/ProfileTabs, Timeline/ActivityFeed/AuditTrail;
- Kanban, agenda/calendar, setup, access/subscription, billing, usage, approvals, config, inbox.

P2 base:

- agents/flows, students, finance, sales, retention, support, internal, reports, data quality, advanced states.

## Missing Or Risky Items Now Captured

- access/subscription pre-CRM states;
- internal tenant/security backoffice;
- setup welcome and human help;
- inbox/conversation subcomponents;
- drawer lifecycle and specialized drawer families;
- icon and font contract;
- canonical token values;
- image-to-component coverage map;
- component-to-source extraction map;
- source-assets contract with canonical image directory;
- 1:1 clone contract for cloning image content at component level;
- future Storybook image-coverage compositions;
- state taxonomy for plan, quota, permission, sensitive, integration, and agent states.

## Stop Rule

After this spec is approved, future implementation can begin as a separate step. Until then:

- do not install dependencies;
- do not scaffold Storybook config;
- do not create component source files;
- do not implement package exports;
- do not implement SaaS screens;
- do not add backend/API/auth/billing/agent runtime behavior.
