# Remaining Pages Official Source Map

Date: 2026-07-02

Purpose: prevent `CRM / Image Coverage / Remaining Pages` from becoming a second implementation of product pages. A remaining-page story must either render an existing official image-coverage shell/family or be the temporary source-backed input for creating that official family. It must not invent a parallel page composition when a route family already exists.

Structural family authority: `page-structure-family-audit.md`. Route/domain family names in this file are organizational only. The reusable pattern decision must come from the structural family map: Kanban, Worklist/Table+Drawer, Dashboard/Grid, Three-pane, Calendar, Setup, Config/Form, Flow/Automation, Access/Subscription, and related subpatterns.

Status legend:

- `Alias now`: remaining story must render the official shell/story composition directly.
- `Official family exists, needs page composition`: a reference family exists, but the page still needs an explicit official composition using that family pattern and official components.
- `Create official family`: no official page family exists yet; create one outside `remaining-pages`, then make the remaining story consume it.
- `Component-only for now`: the page uses official components, but still lacks a page-family shell contract.

| Remaining story | Route family | Required official source | Status | Required action |
| --- | --- | --- | --- | --- |
| `Image19HojeEstadoCritico` | Hoje | `ImageCoverageToday.TodayShell` | Alias now | Done: remaining story renders `TodayShell`; old local dashboard is legacy only and must be removed after consumers are confirmed. |
| `Image24DInboxConversaAberta` | Inbox | `ImageCoverageInbox.InboxConversationPage` | Alias now | Done: official Inbox family owns the three-pane conversation composition using `CrmThreePanePage`, `PageFilterBar`, `ConversationList`, `ConversationThread`, and `ContextPanel`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image26AgendaCalendarioOperacional` | Agenda | `ImageCoverageAgenda.AgendaCalendarPage` | Alias now | Done: official Agenda family owns the operational calendar composition using `CrmDashboardPage`, `PageFilterBar`, `MiniCalendar`, `WeeklyCalendar`, and `ClassDrawer`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image28AlunoPerfilResumoOperacional` | Alunos | `ImageCoverageStudents.StudentProfilePage` | Alias now | Done: official Students family owns the profile/detail composition using `CrmRightPanelPage`, `StudentHeader`, `ProfileTabs`, `StudentSummary`, `Panel`, `List`, `ButtonGroup`, `Chip`, and `Icon`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image29AulaDetalheComChamada` | Agenda/Aula | `ImageCoverageAgenda.AgendaClassDetailPage` | Alias now | Done: official Agenda family owns the class-detail/call drawer composition using `CrmRightPanelPage`, `ClassDrawer`, `MetricCard`, and `Roster`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image32FinanceiroDrawerCobranca` | Financeiro | `ImageCoverageFinance.FinanceBillingDrawerPage` | Alias now | Done: official Finance family owns the overview/detail drawer composition; remaining story renders only the official page composition. |
| `Image33FinanceiroKanban` | Financeiro | `ImageCoverageFinance.FinanceKanbanPage` | Alias now | Done: official Finance family owns the finance kanban variant; remaining story renders only the official page composition. |
| `Image34MovimentacoesFiltrosDrawer` | Financeiro | `ImageCoverageFinance.FinanceMovementsPage` | Alias now | Done: official Finance family owns the movements table/drawer variant; remaining story renders only the official page composition. |
| `Image35TurmasListaDetalhe` | Agenda/Turmas | `ImageCoverageAgenda.AgendaClassesPage` | Alias now | Done: official Agenda family owns the Turmas worklist/detail composition using `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and `ClassDrawer`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image36GradeSemanaModeloBloqueio` | Agenda/Grade | `ImageCoverageAgenda.AgendaGradePage` | Alias now | Done: official Agenda family owns the grade/week-model composition using `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `WeeklyCalendar`, and `ClassDrawer`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image37VendasPipelineKanban` | Vendas | `ImageCoverageSales.SalesPipelinePage` | Alias now | Done: official Sales family owns the pipeline kanban composition using `CrmKanbanPage`, `PageFilterBar`, `KanbanColumn`, and `PipelineCard`; remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image38InteressadosLista` | Vendas | `ImageCoverageSales.SalesInterestedListPage` | Alias now | Done: official Sales family file exists and remaining story renders the explicit interested-list page composition. Static 1:1 capture still required before final approval. |
| `Image39ExperimentalLista` | Vendas | `ImageCoverageSales.SalesExperimentalListPage` | Alias now | Done: official Sales family file now owns the experimental list page composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image40MatriculasChecklistConversao` | Vendas | `ImageCoverageSales.SalesEnrollmentChecklistPage` | Alias now | Done: official Sales family file now owns the enrollment checklist page composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image41RetencaoRiscos` | Retencao | `ImageCoverageRetention.RetentionRiskListPage` | Alias now | Done: official Retention family file exists and remaining story renders the explicit risk-list page composition. Static 1:1 capture still required before final approval. |
| `Image42CancelamentosFila` | Retencao | `ImageCoverageRetention.RetentionCancellationQueuePage` | Alias now | Done: official Retention family file now owns the cancellation queue page composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image43ReativacoesExAlunos` | Retencao | `ImageCoverageRetention.RetentionReactivationListPage` | Alias now | Done: official Retention family file now owns the reactivation page composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image44ReclamacoesCasoSensivel` | Retencao | `ImageCoverageRetention.RetentionComplaintQueuePage` | Alias now | Done: official Retention family file now owns the complaint queue page composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| `Image45RelatoriosGestao` | Relatorios | `ImageCoverageReports.ReportsManagementPage` | Alias now | Done: official Reports family file exists and remaining story renders the explicit `ReportsManagementPage` composition; static 1:1 review remains. |
| `Image46DinheiroNaMesa` | Relatorios/Dinheiro | `ImageCoverageReports.MoneyOnTheTablePage` | Alias now | Done: official Reports family file exists and remaining story renders the explicit `MoneyOnTheTablePage` composition; static 1:1 review remains. |
| `Image47SuporteCentralStudioTaliya` | Suporte | `ImageCoverageSupport.SupportCentralPage` | Alias now | Done: official Support family file exists and remaining story renders the explicit `SupportCentralPage` composition; static 1:1 review remains. |
| `Image48InternalVisaoOperacional` | Internal | `ImageCoverageInternal.InternalOverviewPage` | Alias now | Done: official Internal family owns the overview variant; remaining story renders only the official page composition. |
| `Image49InternalTenantsListaDetalhe` | Internal | `ImageCoverageInternal.InternalTenantsListDetailPage` | Alias now | Done: official Internal family owns the tenants list/detail variant with `InternalShell`, `PageFilterBar`, `PageQuickFilters`, `WorkListDetailPage`, `CrmWorklistTable`, `TenantSecurityDrawer` and security notice. |
| `Image50InternalTenantDetalheUsuariosGrants` | Internal | `ImageCoverageInternal.InternalTenantSecurityPage` | Alias now | Done: official Internal family owns the tenant security/detail variant with `InternalShell`, `TenantDetailLayout`, `SecurityRulePanel` and `TenantSecurityDrawer`. |
| `Image51A`-`Image51L`, `Image78` | Setup/Onboarding | `ImageCoverageSetup` variants | Alias now | Done: official Setup family owns shell, agent chat, workspace config, setup block, review, and welcome variants using `SetupShell` and approved setup components; remaining stories render those pages. Static 1:1 capture still required before final approval. |
| `Image52`, `Image53`, `Image54`, `Image56`, `Image58`, `Image59`, `Image70` | Agentes/Rotinas/Execucoes | `ImageCoverageAgents` variants | Alias now | Done: official Agents family owns catalog, agenda routines, routine detail, flow builder, flow test, publish, and execution receipt variants; remaining stories render those pages. Static 1:1 capture still required before final approval. |
| `Image60`-`Image64` | Configuracoes | `ImageCoverageSettings` variants | Alias now | Done: official Settings family owns hub, permissions, payments, agenda, and notifications variants; remaining stories render those pages. Static 1:1 capture still required before final approval. |
| `Image65`-`Image67` | Billing | `ImageCoverageBilling` | Alias now | Done: official Billing family owns subscription, invoices and add-ons variants; remaining stories render those page compositions. |
| `Image68`, `Image69` | Uso | `ImageCoverageUsage` | Alias now | Done: official Usage family owns overview and ledger variants; remaining stories render those page compositions. |

## Immediate Rule

Before any further visual polish in `remaining-pages`, check this map first. If the row is not `Alias now`, the next implementation step is to create or extend the official family, then make the remaining story render that family. Story-only page composition in `ImageCoverageRemaining.stories.tsx` is allowed only as a temporary migration source and must not be treated as accepted architecture.

## Official Page Pattern Taxonomy

This taxonomy is the implementation map for the remaining-page cleanup. Each remaining image must fit one of these official page families as a reference pattern, not necessarily as a reusable mega-component. If the family already exists, the work is to add the missing explicit source-backed page composition and make the remaining story render that page composition. If the family does not exist, create the family story file first outside `ImageCoverageRemaining.stories.tsx`, using only official `@taliya/ui` and `@taliya/crm` components, then convert the remaining story into an alias/coverage route.

| Pattern | Official family/story owner | Images covered | Reuse basis | Missing work |
| --- | --- | --- | --- | --- |
| Daily operations dashboard | `ImageCoverageToday.TodayShell` | 19 | Existing `CrmProductShell`, dashboard/list/drawer components | Remove legacy local `TodayCriticalDashboard` after confirming no references remain; static 1:1 capture still required. |
| Inbox three-pane workspace | `ImageCoverageInbox.InboxConversationPage` | 24D | Existing `CrmThreePanePage`, `ThreePaneLayout`, `ContextPanel`, `PageFilterBar`, conversation/thread primitives | Done: official Inbox family file owns the open-conversation composition and remaining story renders that page. Static 1:1 capture still required before final approval. |
| Agenda operational workspace | `ImageCoverageAgenda` page compositions | 26, 29, 35, 36 | Existing `CrmDashboardPage`, `CrmRightPanelPage`, `CrmWorklistPage`, `WeeklyCalendar`, `MiniCalendar`, `ClassCard`, `ClassDrawer`, `Roster`, `CrmWorklistTable`, `PageFilterBar`, `PageQuickFilters` | Done: Images26, 29, 35, and 36 are promoted into official Agenda page compositions and remaining stories render aliases. Static 1:1 capture still required before final approval. |
| Student profile workspace | `ImageCoverageStudents.StudentProfilePage` | 28 | Existing profile primitives: `StudentHeader`, `ProfileTabs`, `StudentSummary`, dashboard panels, lists, action rail | Done: official Students family owns the profile-detail variant and Image28 consumes it. Static 1:1 capture still required before final approval. |
| Finance workspace | `ImageCoverageFinance` | 32, 33, 34 | Existing `FinanceShell`, `PaymentCaseCard`, `FinancePriorityPanel`, `FinanceKanbanCard`, `CrmWorklistTable`, `PaymentDrawer` | Done: official Finance family file owns overview/detail, kanban, and movements variants; remaining stories render aliases. Static 1:1 capture remains. |
| Sales workspace | `ImageCoverageSales` page compositions | 37, 38, 39, 40 | Existing `CrmKanbanPage`, `KanbanColumn`, `PipelineCard`, `CrmWorklistPage`, `CrmWorklistTable`, `LeadDrawer`, `PageFilterBar`, `PageQuickFilters` | Done: Images 37-40 are promoted into official Sales page compositions and remaining stories render aliases. Static 1:1 capture still required before final approval. |
| Retention workspace | `ImageCoverageRetention` page compositions | 41, 42, 43, 44 | Existing `CrmWorklistPage`, `CrmWorklistTable`, `CaseDrawer`, `PageFilterBar`, `PageQuickFilters` | Done: Images 41-44 are promoted into official Retention page compositions and remaining stories render aliases. Static 1:1 capture still required before final approval. |
| Reports workspace | `ImageCoverageReports` page compositions | 45, 46 | Existing `CrmDashboardPage`, `ReportFilterBar`, `ChartPanel`, `OpportunityGroupCard`, `OpportunityPanel`, `PageFilterBar`, `ExportAction` | Done: official family story file created with explicit `ReportsManagementPage` and `MoneyOnTheTablePage` compositions; remaining stories now alias those pages. Static 1:1 capture still required before final approval. |
| Support workspace | `ImageCoverageSupport.SupportCentralPage` | 47 | Existing table/panel/drawer primitives plus current support source-backed composition | Done: official family story file created with explicit support central page composition; remaining story now aliases that page. Static 1:1 capture still required before final approval. |
| Internal backoffice | `ImageCoverageInternal` using `InternalShell` | 48, 49, 50 | Existing `InternalShell`, `InternalOverviewDashboard`, `CrmWorklistTable`, `TenantDetailLayout`, `SecurityRulePanel`, `TenantSecurityDrawer` | Done: official Internal family file owns overview, tenants list/detail and tenant security variants; remaining stories render aliases. Static 1:1 capture remains. |
| Guided setup/onboarding | `ImageCoverageSetup` variants using `SetupShell` | 51A-51L, 78 | Existing approved Setup components and setup shell | Done: every setup block image renders an official setup variant and remaining stories alias those pages. Static 1:1 capture remains. |
| Agents, routines, executions | `ImageCoverageAgents` variants | 52, 53, 54, 56, 58, 59, 70 | Existing `AgentCatalog`, `AgentRoutineCard`, `AgentFlowDrawer`, `PreflightChecklist`, flow/status/list primitives | Done: official Agents family owns catalog, agent detail, routine flow, simulation/test, publish, and execution variants; remaining stories render aliases. Static 1:1 capture remains. |
| Studio settings | `ImageCoverageSettings` variants | 60, 61, 62, 63, 64 | Existing shell, cards, tables, forms, permission/payment/agenda/notification primitives where available | Done: Settings family owns hub, permissions, payments, agenda, and notifications variants; remaining stories render aliases. Static 1:1 capture remains. |
| Taliya billing | `ImageCoverageBilling` | 65, 66, 67 | Existing billing/subscription components: `PlanSummaryCard`, `InvoiceTable`, `AddOnCard`, `QuotaProgress` | Done: official Billing family file owns subscription, invoices and add-ons variants; remaining stories render aliases. Static 1:1 capture remains. |
| Usage and quotas | `ImageCoverageUsage` | 68, 69 | Existing `QuotaProgress`, `UsageOriginRow`, `UsageLedgerTable`, `UsageDrawer`, dashboard/table primitives | Done: official Usage family file owns overview and ledger variants; remaining stories render aliases. Static 1:1 capture remains. |

## Implementation Order

1. Convert the already-aligned shell families to true aliases: Hoje, Financeiro, Internal, Students, and Setup. These have the lowest component-risk because their page shells already exist.
2. Promote the source-backed work-list families that already have strong official components: Sales, Retention, Reports, and Support.
3. Promote the operational vertical families: Inbox and Agenda.
4. Promote the product/admin families: Agents, Settings, Billing, and Usage.
5. Only after every row is backed by an official family reference and explicit page composition, run static Storybook capture and update visual approval status. Dev capture, typecheck, build, and token audit are not enough for final acceptance.

## Family Acceptance Rule

A family is acceptable only when all of these are true:

- the official family has its own Storybook file outside `ImageCoverageRemaining.stories.tsx`;
- every page composition needed by the source images is named and documented in that family file;
- the remaining story renders the official page composition instead of duplicating page anatomy locally;
- any new reusable visual anatomy lives in `@taliya/ui` or `@taliya/crm`, not in story-only CSS;
- the family uses tokenized surfaces, borders, shadows, spacing, typography, states, and focus behavior;
- the ledger records source image, Storybook path, evidence, blocker, and next action.
