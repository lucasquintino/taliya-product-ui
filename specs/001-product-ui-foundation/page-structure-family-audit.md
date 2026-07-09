# Page Structure Family Audit

Date: 2026-07-02

Purpose: group Taliya CRM images by reusable page structure, not by business domain. A family is a visual/interaction pattern such as Kanban, table with drawer, dashboard grid, three-pane conversation, calendar, setup wizard, or config form. Domains such as Vendas, Retencao, Financeiro, Billing, and Internal provide content, navigation labels, data, and drawers; they do not define the family by themselves.

Canonical source directory:

```text
D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508
```

## Audit Rule

- Family means pages with the same structural anatomy.
- Reference image means the best current source for the structure, spacing, density, surfaces, and behavior.
- A page should compose official components directly. Do not hide unrelated pages behind artificial `variant` props.
- Domain-specific story files can still exist for organization, but the reusable implementation target is the structure family and its official components.
- `ImageCoverageRemaining.stories.tsx` should become compatibility coverage only; real page compositions should live in official story files and use official `@taliya/ui` / `@taliya/crm` components.
- Image 24 has two covered sources in `image-coverage-map.md`; this audit names them `24 checklist` and `24D` so the checklist worklist and inbox three-pane page stay separate.

## Structural Families

| Family | Reference image | Why this is the reference | Core official components | Pages/images that fit |
| --- | --- | --- | --- | --- |
| Component/reference boards | 01, 07-15 | These are not product pages. They are extraction boards for tokens, primitives, states, overlays, communication, setup/data, agenda/finance/docs, agents/audit/reports. They must feed component contracts, not page-layout families. | `@taliya/tokens`, `@taliya/ui` primitives, certified domain components | 01, 07, 08, 09, 10, 11, 12, 13, 14, 15. Image 06 is historical shell direction/context. |
| App shell baseline | `16_round-4.1S_app-shell_01_base-web.png`; current accepted baseline `17_round-4.1A_hoje_01_acima-da-dobra.png.png` | Defines browser/app frame, sidebar, topbar, global actions, page title rhythm, content surface, and logged-in shell spacing. Image 17 is the accepted working baseline. | `CrmProductShell`, shell nav, sidebar, topbar, global actions, page header, optional drawer slot | All logged-in CRM pages 17-50, 52-70, 79 unless the page uses SetupShell or AccessShell. |
| Dashboard / Card grid | `17_round-4.1A_hoje_01_acima-da-dobra.png.png` | Best approved operational dashboard: multiple panel sizes, row/list cards, section rhythm, and no table-first or kanban-first layout. | `DashboardGrid`, `Panel`, `MetricCard`, `StatusCard`, `ChartPanel`, `List`, `ListItem`, `ActivityFeed`, `PageFilterBar` when needed | 17, 19, 20, 30, 45, 48, 52, 60, 65, 67, 68, 79. Also parts of 47 and 59. |
| Card catalog / Hub grid | `60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png`; secondary `52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png` and `67_round-4.1N_billing_03_add-ons-taliya-aprovado.png` | Repeated card gallery/hub structure: card grid, status chips, compact descriptions, CTA/action affordance. It is close to dashboard but its primary behavior is choosing/opening a section or add-on, not reading KPIs. | `DashboardGrid`, `SettingsHubCard`, `AgentCatalog`, `AgentCard`, `AddOnCard`, `PlanBlockedState`, `EmptyState`, `Panel`, `Button` | 52, 60, 67, and parts of 65. |
| Kanban workspace | `21_round-4.1B_operacao_01_kanban-geral.png.png` | Best source for full kanban page: shell, page filter bar, quick-filter rail, board container, columns, cards, horizontal/vertical board behavior, and activity below. | `PageFilterBar`, `PageQuickFilters`, `KanbanBoard`, `KanbanColumn`, `KanbanCard`, `FinanceKanbanCard`, `PipelineCard`, optional activity table/drawer | 21, 22, 33, 37. |
| Worklist / Table + quick filters + drawer | `23_round-4.1C_tarefas_01_lista-detalhe.png.png` | Best source for the official worklist pattern: filter bar, left quick-filter rail, dense table, pagination, selected row, and right detail drawer. | `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `TablePagination`, official drawer family (`TaskDrawer`, `ApprovalDrawer`, `LeadDrawer`, `CaseDrawer`, `PaymentDrawer`, `ClassDrawer`, `TenantSecurityDrawer`) | 23, 24 checklist, 25, 27, 31, 34, 35, 38, 39, 40, 41, 42, 43, 44, 49. |
| Ledger table / right assistant rail | `69_round-4.1O_uso_02_extrato-aprovado.png`; secondary `66_round-4.1N_billing_02_faturas-taliya-aprovado.png` | Table pages that look like a dashboard/detail panel with an embedded ledger/history table and a persistent right assistant rail. They do not have the Worklist quick-filter rail or global drawer geometry, so forcing `WorkListDetailPage` would reduce visual parity. | `CrmProductShell`, `DashboardGrid`/panel primitives, `UsageLedgerTable` or invoice-history table primitive, `AgentPanel`/support rail, `PageFilterBar` only when the source has an inline filter row inside the panel | 66, 69. |
| Three-pane conversation workspace | `24_round-4.1D_inbox_01_conversa-aberta.png.png` | Only true three-pane source: conversation list, central thread/composer, contextual right panel, top filters, and channel actions. | `ThreePaneLayout`, `ConversationList`, `ConversationThread`, `ContextPanel`, `ComposerInput`, `MessageBubble`, `PageFilterBar`, `AgentPanel`/context rail | 24D. Future support/contact inbox pages should reuse this family if they use list + thread + context panel. |
| Calendar / Schedule workspace | `26_round-4.1F_agenda_01_calendario-operacional.png.png` | Best source for operational schedule: date navigation, compact calendar filters, mini-calendar/quick rail, weekly grid, event cards, selected class drawer. | `WeeklyCalendar`, `MiniCalendar`, `ClassCard`, `ClassDrawer`, `Roster`, `PageFilterBar`, `PageQuickFilters`, `DashboardGrid` for side summaries | 26, 29, 36, 51J, 63. Parts of 35 when the class list opens schedule detail. |
| Profile / Detail workspace | `28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png` | Best source for object profile: identity header, tabs, mixed summary panels, timeline, relationship/context blocks, action rail. | `StudentHeader`, `ProfileTabs`, `StudentSummary`, `RelationshipList`, `ActivityFeed`, `Panel`, `DashboardGrid`, `ButtonGroup` | 28, 50. Potential future tenant/student/account detail pages. |
| Config / Form with right assistant rail | `61_round-4.1M_configuracoes_02_permissoes-aprovado.png` | Best source for settings/form page: breadcrumb, title, status chips, form/card sections, editable table/controls, sticky actions, right contextual assistant. | `SettingsSection`, `PermissionMatrix`, `ImpactSummary`, `ConfigImpactPreview`, `RuleRow`, `IntegrationStatusRow`, `UnsavedChangesBar`, `FieldGroup`, `Select`, `Toggle`, `AgentPanel` | 51C, 51D v2, 51E, 51F, 51G, 51K, 60, 61, 62, 63, 64. |
| Setup wizard / Onboarding shell | `51A_round-4.1J_onboarding_shell-global-aprovado.png` | Defines non-CRM setup shell: top progress, left stepper, central setup content, right setup agent, bottom status bar. | `SetupShell`, `SetupStepper`, `SetupBlockHeader`, `SetupBottomBar`, `SetupAgentChat`, `SetupWelcome`, setup form/list primitives | 51A, 51B, 51C, 51D v2, 51E, 51F, 51G, 51H, 51I, 51J, 51K, 51L, 78. |
| Flow / Automation editor | `56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png` | Best source for automation configuration: breadcrumb page header, mode selector, flow explanation/steps, settings controls, fixed right agent rail. | `ModeSelector`, `ModeCard`, `FlowBuilder`, `FlowStepCard`, `ScenarioList`, `PhonePreview`, `SimulationRunner`, `ExecutionTimeline`, `ExecutionReceipt`, `PreflightChecklist`, `AgentFlowDrawer`/right agent rail | 53, 54, 56, 58, 59, 70. Image 52 is more dashboard/catalog than flow editor. |
| Access / Subscription shell | `71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png` | Defines pre-CRM browser shell with brand bar, large central slot, right context cards, and footer. Different from logged-in CRM and setup shells. | `AccessShell`, `AuthCard`, `CheckoutReviewPanel`, `CheckoutPaymentCard`, `SubscriptionStatusCard`, `SubscriptionProgressStepper`, `SubscriptionResolutionPanel`, `ConfirmedSetupHandoff`, `AccessFooterLinks` | 71, 72, 73, 74, 75, 76, 77. |
| Internal / Backoffice dashboard-detail hybrid | `48_round-4.1K_internal_01_visao-operacional.png.png`; `49_round-4.1K_internal_02_tenants-lista-detalhe.png`; `50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png` | Internal uses the same `CrmProductShell`, but its content alternates between dashboard, table/detail, and detail/security rail. It should reuse existing structural families rather than invent an internal shell. | `CrmProductShell`, `InternalOverviewDashboard`, `TenantCard`, `TenantDetailLayout`, `SecurityRulePanel`, `TenantSecurityDrawer`, `DataTable`, `DashboardGrid` | 48 fits Dashboard/Card grid; 49 fits Worklist/Table + drawer; 50 fits Profile/Detail workspace. |

## Page-To-Family Map

| Image | Page | Primary structure family | Reference image to follow |
| --- | --- | --- | --- |
| 16 | App shell base web | App shell baseline | 16 / 17 |
| 17 | Hoje base | Dashboard / Card grid | 17 |
| 18 | Hoje drawer tarefa | Dashboard / Card grid + drawer | 17 + 18 |
| 19 | Hoje estado critico | Dashboard / Card grid | 17 / 19 |
| 20 | Historico de hoje | Dashboard / Card grid / activity feed | 17 / 20 |
| 21 | Operacao kanban geral | Kanban workspace | 21 |
| 22 | Operacao kanban com drawer | Kanban workspace + drawer | 21 / 22 |
| 23 | Tarefas lista detalhe | Worklist / Table + quick filters + drawer | 23 |
| 24 checklist | Checklists lista execucao detalhe | Worklist / Table + quick filters + drawer | 23 / 24 checklist |
| 24D | Inbox conversa aberta | Three-pane conversation workspace | 24D |
| 25 | Aprovacoes lista decisao detalhe | Worklist / Table + quick filters + drawer | 23 / 25 |
| 26 | Agenda calendario operacional | Calendar / Schedule workspace | 26 |
| 27 | Alunos lista perfil resumido | Worklist / Table + quick filters + drawer | 23 / 27 |
| 28 | Aluno perfil resumo operacional | Profile / Detail workspace | 28 |
| 29 | Aula detalhe com chamada | Calendar / Schedule workspace + detail drawer | 26 / 29 |
| 30 | Financeiro visao geral filas | Dashboard / Card grid | 17 / 30 |
| 31 | Reposicoes fluxo encaixe | Worklist / Table + quick filters + drawer | 23 / 31 |
| 32 | Financeiro drawer cobranca | Dashboard / Card grid + drawer | 30 / 32 |
| 33 | Financeiro kanban | Kanban workspace | 21 / 33 |
| 34 | Movimentacoes filtros drawer | Worklist / Table + quick filters + drawer | 23 / 34 |
| 35 | Turmas lista detalhe | Worklist / Table + quick filters + drawer | 23 / 35 |
| 36 | Grade semana modelo bloqueio | Calendar / Schedule workspace | 26 / 36 |
| 37 | Vendas pipeline kanban | Kanban workspace | 21 / 37 |
| 38 | Interessados lista | Worklist / Table + quick filters + drawer | 23 / 38 |
| 39 | Experimental lista acompanhamento | Worklist / Table + quick filters + drawer | 23 / 39 |
| 40 | Matriculas checklist conversao | Worklist / Table + quick filters + drawer | 23 / 40 |
| 41 | Retencao riscos | Worklist / Table + quick filters + drawer | 23 / 41 |
| 42 | Cancelamentos fila | Worklist / Table + quick filters + drawer | 23 / 42 |
| 43 | Reativacoes ex-alunos | Worklist / Table + quick filters + drawer | 23 / 43 |
| 44 | Reclamacoes caso sensivel | Worklist / Table + quick filters + drawer | 23 / 44 |
| 45 | Relatorios gestao | Dashboard / Card grid | 17 / 45 |
| 46 | Dinheiro na mesa | Dashboard / Card grid + drawer | 17 / 46 |
| 47 | Suporte central | Dashboard / Card grid + support drawer/context | 17 / 47 |
| 48 | Internal visao operacional | Dashboard / Card grid | 17 / 48 |
| 49 | Internal tenants lista detalhe | Worklist / Table + quick filters + drawer | 23 / 49 |
| 50 | Internal tenant detalhe usuarios grants | Profile / Detail workspace | 28 / 50 |
| 51A | Onboarding shell global | Setup wizard / Onboarding shell | 51A |
| 51B | Onboarding agente configuracao chat | Setup wizard / Onboarding shell | 51A / 51B |
| 51C | Onboarding workspace configuracao | Setup wizard + Config/Form | 51A / 51C |
| 51D v2 | Onboarding Studio | Setup wizard + Config/Form | 51A / 51D v2 |
| 51E | Onboarding Equipe | Setup wizard + Worklist/Form | 51A / 51E |
| 51F | Onboarding Canais | Setup wizard + Config/Form | 51A / 51F |
| 51G | Onboarding Planos | Setup wizard + Config/Form | 51A / 51G |
| 51H | Onboarding Alunos | Setup wizard + Worklist/import | 51A / 51H |
| 51I | Onboarding Turmas | Setup wizard + Worklist/calendar | 51A / 51I |
| 51J | Onboarding Agenda | Setup wizard + Calendar | 51A / 51J |
| 51K | Onboarding Pagamento | Setup wizard + Config/Form | 51A / 51K |
| 51L | Onboarding Revisao | Setup wizard + Review dashboard | 51A / 51L |
| 52 | Agentes catalogo | Card catalog / Hub grid | 52 / 60 |
| 53 | Agente agenda rotinas | Flow / Automation editor + table/list | 56 / 53 |
| 54 | Rotina presenca faltas | Flow / Automation editor | 56 / 54 |
| 56 | Fluxo falta com aviso | Flow / Automation editor | 56 |
| 58 | Teste fluxo falta com aviso | Flow / Automation editor / simulation | 56 / 58 |
| 59 | Publicar rotina | Flow / Automation editor / publish review | 56 / 59 |
| 60 | Configuracoes hub | Card catalog / Hub grid | 60 |
| 61 | Configuracoes permissoes | Config / Form with right assistant rail | 61 |
| 62 | Configuracoes pagamentos | Config / Form with right assistant rail | 61 / 62 |
| 63 | Configuracoes agenda | Config / Form + Calendar | 61 / 63 |
| 64 | Configuracoes notificacoes | Config / Form with right assistant rail | 61 / 64 |
| 65 | Billing assinatura | Dashboard / Card grid + right assistant | 17 / 65 |
| 66 | Billing faturas | Ledger table / right assistant rail | 69 / 66 |
| 67 | Billing add-ons | Card catalog / Hub grid | 67 / 60 |
| 68 | Uso visao geral | Dashboard / Card grid + right assistant | 17 / 68 |
| 69 | Uso extrato | Ledger table / right assistant rail | 69 |
| 70 | Execucoes fluxo | Flow / Automation editor / execution receipt | 56 / 70 |
| 71 | Access shell base | Access / Subscription shell | 71 |
| 72 | Signup criar conta | Access / Subscription shell | 71 / 72 |
| 73 | Signin entrar | Access / Subscription shell | 71 / 73 |
| 74 | Revisar assinatura | Access / Subscription shell | 71 / 74 |
| 75 | Aguardando confirmacao | Access / Subscription shell | 71 / 75 |
| 76 | Resolver assinatura | Access / Subscription shell | 71 / 76 |
| 77 | Assinatura confirmada setup guiado | Access / Subscription shell | 71 / 77 |
| 78 | Onboarding bem-vindo | Setup wizard / Onboarding shell | 51A / 78 |
| 79 | Empty app shell | App shell baseline + empty state | 79 / 16 |

## Non-Page Source Boards

The following covered images are intentionally not present as product pages in the Page-To-Family Map because they are component/reference boards:

- 01: token source;
- 07: core reference components;
- 08: forms/filters;
- 09: overlays/states;
- 10: operational views;
- 11: communication/agents;
- 12: system/plan/governance;
- 13: setup/data objects;
- 14: agenda/finance/docs objects;
- 15: agents/audit/reports objects.

Image 06 is historical/covered early shell direction and remains context for shell decisions. Image 16 is the canonical app-shell page source and is listed in the Page-To-Family Map.

## What Is Already Strong Enough To Use As Reference

| Structure family | Current best implemented/story reference | Current status |
| --- | --- | --- |
| App shell baseline | `CRM / Image Coverage / Hoje / today-shell`; Image 17/18/20 baseline | Accepted semi-approved baseline, not full 1:1 certification. |
| Dashboard / Card grid | Hoje baseline, `ReportsManagementPage`, `InternalOverviewDashboard`, usage/billing components | Strong component coverage; needs static full-image certification per page. |
| Kanban workspace | Operacao Image 21 story | Strongest reference for kanban page; use for Sales Pipeline and Finance Kanban layout. |
| Worklist / Table + drawer | Tarefas Image 23 story | Strongest reference for list/detail pages; use for sales lists, retention lists, finance movements, tenants, usage ledger. |
| Three-pane conversation | Inbox Image 24D current remaining composition | Needs official page composition file; components exist. |
| Calendar / Schedule | Agenda Image 26 current remaining composition and certified calendar components | Needs official page composition file. |
| Config / Form | Configuracoes Permissoes Image 61 components | Component coverage is strong; page compositions need official files. |
| Setup wizard | SetupShell and setup component stories | Strong component coverage; remaining setup pages need official page compositions/aliases. |
| Flow / Automation editor | Agent/flow component stories and Image 56 source | Components exist; page compositions need official files. |
| Access / Subscription | Access/subscription component stories | Strong component/crop certification; full-page stories still need final parity where noted. |

## Recommended Migration Order

1. **Worklist / Table + drawer**: largest reuse payoff. Start from Image 23 and migrate Images 38-44, 34-35, 49 into explicit page compositions that reuse the same worklist structure.
2. **Kanban workspace**: use Image 21 as reference. Migrate Images 33 and 37 after confirming the board/card container behavior.
3. **Dashboard / Card grid**: use Image 17 as reference. Normalize Images 30, 45-48, 52, 60, 65, 67, 68.
4. **Calendar / Schedule**: use Image 26 as reference. Normalize Images 29, 36, 51J, 63.
5. **Three-pane conversation**: promote Image 24D into official composition.
6. **Config / Form**: use Image 61 as reference for Images 51C-G/K and 60-64 where form/edit pattern dominates.
7. **Flow / Automation editor**: use Image 56 as reference for Images 53, 54, 58, 59, 70.
8. **Setup and Access shells**: keep their shell families separate because their structural chrome is intentionally different from logged-in CRM.

## Decision

The next implementation unit should not be a business-domain family such as `SalesShell` or `RetentionShell`. The next unit should be a structural family pass. The best first pass is **Worklist / Table + quick filters + drawer**, with Image 23 as the reference, because it covers the most remaining pages and is already the accepted table/drawer quality bar.
