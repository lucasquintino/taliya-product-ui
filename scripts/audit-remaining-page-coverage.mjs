import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const storiesDir = resolve(root, "apps/docs/src/stories");
const removedRemainingStoryPath = resolve(storiesDir, "ImageCoverageRemaining.stories.tsx");
const storybookIndexPath = resolve(root, "apps/docs/storybook-static/index.json");
const ledgerPath = resolve(specDir, "batch-11-status-ledger.md");
const officialSourceMapPath = resolve(specDir, "remaining-pages-official-source-map.md");
const jsonPath = resolve(specDir, "remaining-page-coverage-audit.json");
const mdPath = resolve(specDir, "remaining-page-coverage-audit.md");

const expectedStories = [
  ["Image19HojeEstadoCritico", "crm-image-coverage-hoje--image-19-hoje-estado-critico"],
  ["Image24DInboxConversaAberta", "crm-image-coverage-inbox--image-24-d-inbox-conversa-aberta"],
  ["Image26AgendaCalendarioOperacional", "crm-image-coverage-agenda--image-26-agenda-calendario-operacional"],
  ["Image28AlunoPerfilResumoOperacional", "crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional"],
  ["Image29AulaDetalheComChamada", "crm-image-coverage-agenda--image-29-aula-detalhe-com-chamada"],
  ["Image32FinanceiroDrawerCobranca", "crm-image-coverage-financeiro--image-32-financeiro-drawer-cobranca"],
  ["Image33FinanceiroKanban", "crm-image-coverage-financeiro--image-33-financeiro-kanban"],
  ["Image34MovimentacoesFiltrosDrawer", "crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer"],
  ["Image35TurmasListaDetalhe", "crm-image-coverage-agenda--image-35-turmas-lista-detalhe"],
  ["Image36GradeSemanaModeloBloqueio", "crm-image-coverage-agenda--image-36-grade-semana-modelo-bloqueio"],
  ["Image37VendasPipelineKanban", "crm-image-coverage-vendas--image-37-vendas-pipeline-kanban"],
  ["Image38ListaInteressados", "crm-image-coverage-vendas--image-38-lista-interessados"],
  ["Image39ExperimentalLista", "crm-image-coverage-vendas--image-39-experimental-lista"],
  ["Image40MatriculasChecklistConversao", "crm-image-coverage-vendas--image-40-matriculas-checklist-conversao"],
  ["Image41RetencaoRiscos", "crm-image-coverage-retencao--image-41-retencao-riscos"],
  ["Image42CancelamentosFila", "crm-image-coverage-retencao--image-42-cancelamentos-fila"],
  ["Image43ReativacoesExAlunos", "crm-image-coverage-retencao--image-43-reativacoes-ex-alunos"],
  ["Image44ReclamacoesCasoSensivel", "crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel"],
  ["ReportsManagement", "crm-image-coverage-relatorios--reports-management"],
  ["MoneyOnTheTable", "crm-image-coverage-relatorios--money-on-the-table"],
  ["SupportCentral", "crm-image-coverage-suporte--support-central"],
  ["Image48InternalVisaoOperacional", "crm-image-coverage-internal--image-48-internal-visao-operacional"],
  ["Image49InternalTenantsListaDetalhe", "crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe"],
  ["Image50InternalTenantDetalheUsuariosGrants", "crm-image-coverage-internal--image-50-internal-tenant-detalhe-usuarios-grants"],
  ["Image52AgentesCatalogo", "crm-image-coverage-agentes--image-52-agentes-catalogo"],
  ["Image53AgenteAgendaRotinas", "crm-image-coverage-agentes--image-53-agente-agenda-rotinas"],
  ["Image54RotinaPresencaFaltas", "crm-image-coverage-agentes--image-54-rotina-presenca-faltas"],
  ["Image56FluxoFaltaComAviso", "crm-image-coverage-agentes--image-56-fluxo-falta-com-aviso"],
  ["Image58TesteFluxoFaltaComAviso", "crm-image-coverage-agentes--image-58-teste-fluxo-falta-com-aviso"],
  ["Image59PublicarRotina", "crm-image-coverage-agentes--image-59-publicar-rotina"],
  ["Image70ExecucoesFluxo", "crm-image-coverage-agentes--image-70-execucoes-fluxo"],
  ["Image60ConfiguracoesHub", "crm-image-coverage-configuracoes--image-60-configuracoes-hub"],
  ["Image61ConfiguracoesPermissoes", "crm-image-coverage-configuracoes--image-61-configuracoes-permissoes"],
  ["Image62ConfiguracoesPagamentos", "crm-image-coverage-configuracoes--image-62-configuracoes-pagamentos"],
  ["Image63ConfiguracoesAgenda", "crm-image-coverage-configuracoes--image-63-configuracoes-agenda"],
  ["Image64ConfiguracoesNotificacoes", "crm-image-coverage-configuracoes--image-64-configuracoes-notificacoes"],
  ["Image65BillingAssinatura", "crm-image-coverage-billing--image-65-billing-assinatura"],
  ["Image66BillingFaturas", "crm-image-coverage-billing--image-66-billing-faturas"],
  ["Image67BillingAddOns", "crm-image-coverage-billing--image-67-billing-add-ons"],
  ["Image68UsoVisaoGeral", "crm-image-coverage-usage--image-68-uso-visao-geral"],
  ["Image69UsoExtrato", "crm-image-coverage-usage--image-69-uso-extrato"],
  ["Image51AOnboardingShellGlobal", "crm-image-coverage-setup--image-51-a-onboarding-shell-global"],
  ["Image51BOnboardingAgenteConfiguracaoChat", "crm-image-coverage-setup--image-51-b-onboarding-agente-configuracao-chat"],
  ["Image51COnboardingWorkspaceConfiguracao", "crm-image-coverage-setup--image-51-c-onboarding-workspace-configuracao"],
  ["Image51DOnboardingStudio", "crm-image-coverage-setup--image-51-d-onboarding-studio"],
  ["Image51EOnboardingEquipe", "crm-image-coverage-setup--image-51-e-onboarding-equipe"],
  ["Image51FOnboardingCanais", "crm-image-coverage-setup--image-51-f-onboarding-canais"],
  ["Image51GOnboardingPlanos", "crm-image-coverage-setup--image-51-g-onboarding-planos"],
  ["Image51KOnboardingPagamento", "crm-image-coverage-setup--image-51-k-onboarding-pagamento"],
  ["Image51HOnboardingAlunos", "crm-image-coverage-setup--image-51-h-onboarding-alunos"],
  ["Image51IOnboardingTurmas", "crm-image-coverage-setup--image-51-i-onboarding-turmas"],
  ["Image51JOnboardingAgenda", "crm-image-coverage-setup--image-51-j-onboarding-agenda"],
  ["Image51LOnboardingRevisao", "crm-image-coverage-setup--image-51-l-onboarding-revisao"],
  ["Image78OnboardingBemVindo", "crm-image-coverage-setup--image-78-onboarding-bem-vindo"]
];

const expectedRenderTargets = [
  ["Image19HojeEstadoCritico", "TodayShell"],
  ["Image24DInboxConversaAberta", "InboxConversationPage"],
  ["Image26AgendaCalendarioOperacional", "AgendaCalendarPage"],
  ["Image28AlunoPerfilResumoOperacional", "StudentProfilePage"],
  ["Image29AulaDetalheComChamada", "AgendaClassDetailPage"],
  ["Image32FinanceiroDrawerCobranca", "FinanceBillingDrawerPage"],
  ["Image33FinanceiroKanban", "FinanceKanbanPage"],
  ["Image34MovimentacoesFiltrosDrawer", "FinanceMovementsPage"],
  ["Image35TurmasListaDetalhe", "AgendaClassesPage"],
  ["Image36GradeSemanaModeloBloqueio", "AgendaGradePage"],
  ["Image37VendasPipelineKanban", "SalesPipelinePage"],
  ["Image38ListaInteressados", "SalesInterestedListPage"],
  ["Image39ExperimentalLista", "SalesExperimentalListPage"],
  ["Image40MatriculasChecklistConversao", "SalesEnrollmentChecklistPage"],
  ["Image41RetencaoRiscos", "RetentionRiskListPage"],
  ["Image42CancelamentosFila", "RetentionCancellationQueuePage"],
  ["Image43ReativacoesExAlunos", "RetentionReactivationListPage"],
  ["Image44ReclamacoesCasoSensivel", "RetentionComplaintQueuePage"],
  ["ReportsManagement", "ReportsManagementPage"],
  ["MoneyOnTheTable", "MoneyOnTheTablePage"],
  ["SupportCentral", "SupportCentralPage"],
  ["Image48InternalVisaoOperacional", "InternalOverviewPage"],
  ["Image49InternalTenantsListaDetalhe", "InternalTenantsListDetailPage"],
  ["Image50InternalTenantDetalheUsuariosGrants", "InternalTenantSecurityPage"],
  ["Image52AgentesCatalogo", "AgentsCatalogPage"],
  ["Image53AgenteAgendaRotinas", "AgentAgendaRoutinesPage"],
  ["Image54RotinaPresencaFaltas", "AgentPresenceRoutinePage"],
  ["Image56FluxoFaltaComAviso", "AgentAbsenceFlowPage"],
  ["Image58TesteFluxoFaltaComAviso", "AgentAbsenceFlowTestPage"],
  ["Image59PublicarRotina", "AgentPublishRoutinePage"],
  ["Image70ExecucoesFluxo", "AgentExecutionReceiptPage"],
  ["Image60ConfiguracoesHub", "SettingsHubPage"],
  ["Image61ConfiguracoesPermissoes", "SettingsPermissionsPage"],
  ["Image62ConfiguracoesPagamentos", "SettingsPaymentsPage"],
  ["Image63ConfiguracoesAgenda", "SettingsAgendaPage"],
  ["Image64ConfiguracoesNotificacoes", "SettingsNotificationsPage"],
  ["Image65BillingAssinatura", "BillingSubscriptionPage"],
  ["Image66BillingFaturas", "BillingInvoicesPage"],
  ["Image67BillingAddOns", "BillingAddOnsPage"],
  ["Image68UsoVisaoGeral", "UsageOverviewPage"],
  ["Image69UsoExtrato", "UsageLedgerPage"],
  ["Image51AOnboardingShellGlobal", "SetupShellGlobalPage"],
  ["Image51BOnboardingAgenteConfiguracaoChat", "SetupAgentChatPage"],
  ["Image51COnboardingWorkspaceConfiguracao", "SetupWorkspaceConfigPage"],
  ["Image51DOnboardingStudio", "SetupStudioPage"],
  ["Image51EOnboardingEquipe", "SetupTeamPage"],
  ["Image51FOnboardingCanais", "SetupChannelsPage"],
  ["Image51GOnboardingPlanos", "SetupPlansPage"],
  ["Image51KOnboardingPagamento", "SetupPaymentPage"],
  ["Image51HOnboardingAlunos", "SetupStudentsImportPage"],
  ["Image51IOnboardingTurmas", "SetupClassesPage"],
  ["Image51JOnboardingAgenda", "SetupAgendaPage"],
  ["Image51LOnboardingRevisao", "SetupReviewPage"],
  ["Image78OnboardingBemVindo", "SetupWelcomePage"]
];

const pageFamilyContracts = [
  {
    page: "TodayShell",
    file: "ImageCoverageToday.stories.tsx",
    family: "dashboard",
    requiredSnippets: ["<CrmDashboardPage", 'columns={historyOnly ? 1 : "today"}', "<TodayDashboard", "<TaskDrawer"]
  },
  {
    page: "InboxConversationPage",
    file: "ImageCoverageInbox.stories.tsx",
    family: "three-pane/inbox",
    requiredSnippets: ["<CrmThreePanePage", "<PageFilterBar", "ConversationList", "ConversationThread", "ContextPanel"]
  },
  {
    page: "AgendaCalendarPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "dashboard/calendar",
    requiredSnippets: ["<CrmDashboardPage", "before={<AgendaFilters />}", "<AgendaSidePanel />", "<WeeklyCalendar compact />", "drawer={<ClassDrawer />}"]
  },
  {
    page: "AgendaClassDetailPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "right-panel/detail",
    requiredSnippets: ["<CrmRightPanelPage", "main={<ClassOperationalDetail />}", "panel={", "<ClassDrawer"]
  },
  {
    page: "AgendaClassesPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "table/worklist",
    requiredSnippets: ["<CrmWorklistPage", "filterBar={<ClassesFilters />}", "quickFilters={<ClassesQuickFilters />}", "<ClassesTable />"]
  },
  {
    page: "AgendaGradePage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "table/worklist",
    requiredSnippets: ["<CrmWorklistPage", "filterBar={<GradeFilters />}", "quickFilters={<GradeSummaryFilters />}", "<WeeklyCalendar"]
  },
  {
    page: "FinanceBillingDrawerPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "dashboard/drawer",
    requiredSnippets: ["<FinanceOverviewDashboard drawer={<PaymentDrawer />} />"]
  },
  {
    page: "FinanceKanbanPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "kanban",
    requiredSnippets: ["<CrmKanbanPage", "filterBar={<FinanceiroKanbanFilters />}", "<FinanceKanbanColumns />"]
  },
  {
    page: "FinanceMovementsPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "table/worklist",
    requiredSnippets: ["<CrmWorklistPage", 'worklistLayoutMode="main-priority"', "filterBar={<MovementsFilters />}", "quickFilters={<MovementsQuickFilters />}", "<MovementTable />", "<PaymentDrawer"]
  },
  {
    page: "SalesPipelinePage",
    file: "ImageCoverageSales.stories.tsx",
    family: "kanban",
    requiredSnippets: ["<CrmKanbanPage", "filterBar={<SalesPipelineFilters />}", "<SalesPipelineBoard />"]
  },
  {
    page: "SalesInterestedListPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: ["<CrmWorklistPage", 'worklistLayoutMode="main-priority"', "filterBar={<SalesInterestedFilters />}", "quickFilters={<SalesLeadQuickRail />}", "<SalesLeadTable />", "drawer={<LeadDrawer compact />}"]
  },
  {
    page: "SalesExperimentalListPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<ExperimentalFilters />}",
      "quickFilters={<ExperimentalQuickRail />}",
      "<ExperimentalTable />",
      "drawer={<ExperimentalDrawer />}"
    ]
  },
  {
    page: "SalesEnrollmentChecklistPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<EnrollmentFilters />}",
      "quickFilters={<EnrollmentQuickRail />}",
      "<EnrollmentTable />",
      "drawer={<EnrollmentDrawer />}"
    ]
  },
  {
    page: "RetentionRiskListPage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<RetentionRiskFilters />}",
      "quickFilters={<RetentionRiskQuickRail />}",
      "<RetentionRiskTable />",
      "drawer={<RetentionRiskDrawer />}"
    ]
  },
  {
    page: "RetentionCancellationQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<CancellationFilters />}",
      "quickFilters={<CancellationQuickRail />}",
      "<CancellationTable />",
      "drawer={<CancellationDrawer />}"
    ]
  },
  {
    page: "RetentionReactivationListPage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<ReactivationFilters />}",
      "quickFilters={<ReactivationQuickRail />}",
      "<ReactivationTable />",
      "drawer={<ReactivationDrawer />}"
    ]
  },
  {
    page: "RetentionComplaintQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="main-priority"',
      "filterBar={<ComplaintFilters />}",
      "quickFilters={<ComplaintQuickRail />}",
      "<ComplaintTable />",
      "drawer={<ComplaintDrawer />}"
    ]
  },
  {
    page: "ReportsManagementPage",
    file: "ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredSnippets: ["<CrmDashboardPage", "before={<ReportFilterBar />}", "<ReportsManagementContent />", "<ExportAction"]
  },
  {
    page: "MoneyOnTheTablePage",
    file: "ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredSnippets: ["<CrmDashboardPage", "before={<MoneyTableFilters />}", "<OpportunityGroupCard", "drawer={<OpportunityPanel />}"]
  },
  {
    page: "SupportCentralPage",
    file: "ImageCoverageSupport.stories.tsx",
    family: "dashboard/support",
    requiredSnippets: ["<CrmDashboardPage", "<SupportStatusSidebar />", "<SupportCentralContent />", "drawer={<SupportTicketDrawer />}"]
  },
  {
    page: "InternalOverviewPage",
    file: "ImageCoverageInternal.stories.tsx",
    family: "internal/dashboard",
    requiredSnippets: ["<InternalShell", "<InternalOverviewDashboard", "<SupportTicketDrawer"]
  },
  {
    page: "InternalTenantsListDetailPage",
    file: "ImageCoverageInternal.stories.tsx",
    family: "internal/table",
    requiredSnippets: ["<InternalWorklistPage", 'worklistLayoutMode="main-priority"', "filterBar={<InternalTenantFilters />}", "quickFilters={<InternalTenantQuickFilters />}", "<InternalTenantsTable />", "<TenantSecurityDrawer"]
  },
  {
    page: "InternalTenantSecurityPage",
    file: "ImageCoverageInternal.stories.tsx",
    family: "internal/detail",
    requiredSnippets: ["<InternalShell", "<TenantDetailLayout />", "<TenantSecurityDrawer"]
  },
  {
    page: "AgentsCatalogPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "dashboard/agents",
    requiredSnippets: ["<CrmDashboardPage", "columns={1}", "<AgentCatalog"]
  },
  {
    page: "AgentAgendaRoutinesPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "dashboard/agents",
    requiredSnippets: ["<CrmDashboardPage", "columns={3}", "<AgentRoutineCard"]
  },
  {
    page: "AgentPresenceRoutinePage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "PresenceRoutineFlowCards"]
  },
  {
    page: "AgentAbsenceFlowPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<FlowBuilder"]
  },
  {
    page: "AgentAbsenceFlowTestPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<ScenarioList", "<PhonePreview", "<ExecutionTimeline"]
  },
  {
    page: "AgentPublishRoutinePage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<PreflightChecklist", "<PublishRoutineFlowSummary"]
  },
  {
    page: "AgentExecutionReceiptPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<ExecutionReceipt", "<ExecutionTimeline"]
  },
  {
    page: "SettingsHubPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "dashboard/settings",
    requiredSnippets: ["<CrmDashboardPage", "columns={4}", "<SettingsHubCard"]
  },
  {
    page: "SettingsPermissionsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<PermissionMatrix", "<ConfigImpactPreview"]
  },
  {
    page: "SettingsPaymentsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<IntegrationStatusRow", "<RuleRow"]
  },
  {
    page: "SettingsAgendaPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<WeeklyCalendar"]
  },
  {
    page: "SettingsNotificationsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<SettingsAgentPanel", "<SettingsSection", "<RuleRow"]
  },
  {
    page: "BillingSubscriptionPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "PlanSummaryCard"]
  },
  {
    page: "BillingInvoicesPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "InvoiceTable"]
  },
  {
    page: "BillingAddOnsPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "AddOnCard"]
  },
  {
    page: "UsageOverviewPage",
    file: "ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<QuotaProgress"]
  },
  {
    page: "UsageLedgerPage",
    file: "ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageLedgerTable"]
  },
  {
    page: "StudentProfilePage",
    file: "ImageCoverageStudents.stories.tsx",
    family: "right-panel/profile",
    requiredSnippets: ["<CrmRightPanelPage", "<StudentHeader", "<ProfileTabs", "<StudentProfileMain", "panel={<StudentProfileRail"]
  },
  {
    page: "SetupShellGlobalPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupBlockHeader", "<SetupContentGrid"]
  },
  {
    page: "SetupAgentChatPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "agent={<SetupAgentChat />}", "<SetupAgentChat"]
  },
  {
    page: "SetupWorkspaceConfigPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupContentGrid", "<SetupChoiceCard", "<ConfigImpactPreview"]
  },
  {
    page: "SetupStudioPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Studio" />', "<WeeklyHoursGrid", "<ConfigImpactPreview"]
  },
  {
    page: "SetupTeamPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Equipe" />', "<RoleCard", "<SetupTeamPreparedList"]
  },
  {
    page: "SetupChannelsPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Canais" />', "<SetupContentGrid", "<IntegrationStatusRow"]
  },
  {
    page: "SetupPlansPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Planos" />', "<SetupContentGrid", "<PlanSummaryCard"]
  },
  {
    page: "SetupPaymentPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Pagamento" />', "<SetupContentGrid", "<IntegrationStatusRow"]
  },
  {
    page: "SetupStudentsImportPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Alunos" />', "<SetupContentGrid", "<SetupImportSourceCard", "<ImportProgress"]
  },
  {
    page: "SetupClassesPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", '<SetupBlockHeader title="Turmas" />', "<SetupContentGrid", "<ClassCard", "<ClassesTable"]
  },
  {
    page: "SetupAgendaPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "bottomBar={<SetupBottomBar />}", '<SetupBlockHeader title="Agenda" />', "<WeeklyCalendar"]
  },
  {
    page: "SetupReviewPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "bottomBar={<SetupBottomBar />}", "<SetupReviewPanel"]
  },
  {
    page: "SetupWelcomePage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup/welcome",
    requiredSnippets: ["<SetupShell", 'layout="welcome"', "<SetupWelcome"]
  }
];

const requiredSourceMarkers = [
  "CrmDashboardPage",
  "CrmRightPanelPage",
  "CrmKanbanPage",
  "CrmThreePanePage",
  "SetupShellGlobalPage",
  "SetupContentGrid",
  "SetupAgentChatPage",
  "SetupWorkspaceConfigPage",
  "SetupStudioPage",
  "SetupTeamPage",
  "SetupChannelsPage",
  "SetupPlansPage",
  "SetupPaymentPage",
  "SetupStudentsImportPage",
  "SetupClassesPage",
  "SetupAgendaPage",
  "SetupReviewPage",
  "SetupWelcomePage",
  "PageFilterBar",
  "PageQuickFilters",
  "CrmWorklistPage",
  "InternalWorklistPage",
  "InboxConversationPage",
  "AgendaCalendarPage",
  "AgendaClassDetailPage",
  "AgendaClassesPage",
  "AgendaGradePage",
  "StudentProfilePage",
  "AgentsCatalogPage",
  "AgentAgendaRoutinesPage",
  "AgentPresenceRoutinePage",
  "AgentAbsenceFlowPage",
  "AgentAbsenceFlowTestPage",
  "AgentPublishRoutinePage",
  "AgentExecutionReceiptPage",
  "SettingsHubPage",
  "SettingsPermissionsPage",
  "SettingsPaymentsPage",
  "SettingsAgendaPage",
  "SettingsNotificationsPage",
  "SalesPipelinePage",
  "FinanceKanbanCard"
];

const forbiddenStoryMarkers = [
  {
    marker: "function GenericTable",
    reason: "Remaining page stories must use page-specific official table compositions, not one generic operational table."
  },
  {
    marker: "<GenericTable",
    reason: "Remaining page stories must not render a generic table placeholder."
  },
  {
    marker: "function MetricsRow",
    reason: "Remaining page stories must use page-specific metric compositions."
  },
  {
    marker: "<MetricsRow",
    reason: "Remaining page stories must not render generic metric placeholders."
  },
  {
    marker: "function GenericBoard",
    reason: "Remaining page stories must use page-specific kanban board compositions."
  },
  {
    marker: "<GenericBoard",
    reason: "Remaining page stories must not render a generic kanban placeholder."
  }
];

const forbiddenCorpusMarkers = [
  {
    marker: "CrmPageFamilyShell",
    reason:
      "Image coverage pages must consume official page-family wrappers instead of assembling the shell/layout directly."
  },
  {
    marker: "DashboardGrid",
    reason:
      "Image coverage pages must consume CrmDashboardPage, CrmRightPanelPage, SetupContentGrid, or another official family wrapper instead of rendering DashboardGrid directly."
  }
];

const requiredSpecificCompositionMarkers = [
  "TodayShell",
  "FinanceOverviewDashboard",
  "FinanceBillingDrawerPage",
  "FinanceKanbanPage",
  "FinanceMovementsPage",
  "SetupContentGrid",
  "ReportsManagementPage",
  "MoneyOnTheTablePage",
  "PaymentCaseCard",
  "OpportunityGroupCard",
  "SetupTeamPage"
];

function readRequired(filePath, label) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing ${label}: ${filePath}`);
  }
  return readFileSync(filePath, "utf8");
}

const ledgerSource = readRequired(ledgerPath, "Batch 11 ledger");
const officialSourceMapSource = readRequired(officialSourceMapPath, "remaining pages official source map");
const storybookIndex = existsSync(storybookIndexPath)
  ? JSON.parse(readFileSync(storybookIndexPath, "utf8"))
  : { entries: {} };
const officialStoryFiles = [
  "ImageCoverageToday.stories.tsx",
  "ImageCoverageInbox.stories.tsx",
  "ImageCoverageAgenda.stories.tsx",
  "ImageCoverageStudents.stories.tsx",
  "ImageCoverageFinance.stories.tsx",
  "ImageCoverageSales.stories.tsx",
  "ImageCoverageRetention.stories.tsx",
  "ImageCoverageReports.stories.tsx",
  "ImageCoverageSupport.stories.tsx",
  "ImageCoverageInternal.stories.tsx",
  "ImageCoverageAgents.stories.tsx",
  "ImageCoverageSettings.stories.tsx",
  "ImageCoverageBilling.stories.tsx",
  "ImageCoverageUsage.stories.tsx",
  "ImageCoverageSetup.stories.tsx"
];
const officialStorySources = officialStoryFiles.map((fileName) => ({
  fileName,
  filePath: resolve(storiesDir, fileName),
  source: readRequired(resolve(storiesDir, fileName), fileName)
}));
const officialCoverageCorpus = officialStorySources.map((entry) => entry.source).join("\n");
const remainingStoryRemoved = !existsSync(removedRemainingStoryPath);

const exportRows = expectedStories.map(([exportName, storyId]) => {
  const indexEntry = storybookIndex.entries?.[storyId];
  const importPath = indexEntry?.importPath ? resolve(root, "apps/docs", indexEntry.importPath.replace(/^\.\//, "")) : "";
  const storySource = importPath && existsSync(importPath) ? readFileSync(importPath, "utf8") : "";
  const hasExport = new RegExp(`export\\s+const\\s+${exportName}\\s*:`).test(storySource);
  const hasStaticIndexEntry = Boolean(indexEntry);
  const titleMatches = Boolean(indexEntry?.title?.startsWith("CRM / Image Coverage /")) && indexEntry?.title !== "CRM / Image Coverage / Remaining Pages";
  const notRemainingStory = !storyId.startsWith("crm-image-coverage-remaining-pages--");

  return {
    exportName,
    storyId,
    hasExport,
    hasStaticIndexEntry,
    titleMatches,
    notRemainingStory,
    status: hasExport && hasStaticIndexEntry && titleMatches && notRemainingStory ? "pass" : "fail"
  };
});

const sourceMarkerRows = requiredSourceMarkers.map((marker) => ({
  marker,
  present: officialCoverageCorpus.includes(marker)
}));

const forbiddenMarkerRows = forbiddenStoryMarkers.map((entry) => ({
  ...entry,
  present: officialCoverageCorpus.includes(entry.marker)
}));

const forbiddenCorpusMarkerRows = forbiddenCorpusMarkers.map((entry) => ({
  ...entry,
  present: officialCoverageCorpus.includes(entry.marker)
}));

const forbiddenOfficialSourceMapMarkers = [
  {
    marker: "CrmPageFamilyShell",
    reason:
      "The remaining-pages source map must document current page-family wrappers instead of the deprecated direct shell assembly."
  },
  {
    marker: "DashboardGrid",
    reason:
      "The remaining-pages source map must point dashboard/profile pages at current family wrappers instead of direct dashboard layout primitives."
  },
  {
    marker: "ShellPage",
    reason:
      "The remaining-pages source map must not describe local ShellPage composition as an accepted remaining-page route."
  },
  {
    marker: "WorkPage",
    reason:
      "The remaining-pages source map must not describe local WorkPage composition as an accepted remaining-page route."
  }
];

const officialSourceMapMarkerRows = forbiddenOfficialSourceMapMarkers.map((entry) => ({
  ...entry,
  present: officialSourceMapSource.includes(entry.marker)
}));

const specificCompositionRows = requiredSpecificCompositionMarkers.map((marker) => ({
  marker,
  present: officialCoverageCorpus.includes(marker)
}));

const renderTargetRows = expectedRenderTargets.map(([exportName, target]) => {
  const pattern = new RegExp(
    `export\\s+const\\s+${exportName}\\s*:[\\s\\S]*?render\\s*:\\s*\\(\\)\\s*=>\\s*<${target}\\s*/>`,
    "m"
  );

  return {
    exportName,
    target,
    present: pattern.test(officialCoverageCorpus),
    status: pattern.test(officialCoverageCorpus) ? "pass" : "fail"
  };
});

const sourceByFileName = new Map(officialStorySources.map((entry) => [entry.fileName, entry.source]));

function sourceWindowForFunction(source, functionName) {
  const match = new RegExp(`export\\s+function\\s+${functionName}\\s*\\(`).exec(source);
  const start = match?.index ?? -1;
  if (start < 0) {
    return "";
  }
  const nextExport = source.indexOf("\nexport function ", start + 1);
  return source.slice(start, nextExport < 0 ? start + 2500 : nextExport);
}

function sourceWindowForNamedFunction(source, functionName) {
  const match = new RegExp(`(?:export\\s+)?function\\s+${functionName}\\s*\\(`).exec(source);
  const start = match?.index ?? -1;
  if (start < 0) {
    return "";
  }

  const rest = source.slice(start + 1);
  const nextFunction = /\n(?:export\s+)?function\s+[A-Za-z0-9_]+\s*\(/.exec(rest);
  const nextConst = /\n(?:export\s+)?const\s+[A-Za-z0-9_]+\s*(?::|=)/.exec(rest);
  const nextExport = [nextFunction, nextConst]
    .map((match) => match?.index)
    .filter((index) => typeof index === "number" && index >= 0)
    .sort((a, b) => a - b)[0];

  return source.slice(start, nextExport === undefined ? source.length : start + 1 + nextExport);
}

const pageFamilyContractRows = pageFamilyContracts.map((contract) => {
  const source = sourceByFileName.get(contract.file) ?? "";
  const pageSource = sourceWindowForFunction(source, contract.page);
  const missingSnippets = contract.requiredSnippets.filter((snippet) => !pageSource.includes(snippet));

  return {
    page: contract.page,
    file: contract.file,
    family: contract.family,
    missingSnippets,
    status: pageSource && missingSnippets.length === 0 ? "pass" : "fail"
  };
});

const tableFamilyDetailContracts = [
  {
    page: "SalesExperimentalListPage",
    file: "ImageCoverageSales.stories.tsx",
    filter: "ExperimentalFilters",
    quickFilters: "ExperimentalQuickRail",
    table: "ExperimentalTable",
    drawer: "ExperimentalDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<LeadDrawer", "compact", "facts={experimentalDrawerFacts}", "history={experimentalDrawerHistory}"]
  },
  {
    page: "SalesEnrollmentChecklistPage",
    file: "ImageCoverageSales.stories.tsx",
    filter: "EnrollmentFilters",
    quickFilters: "EnrollmentQuickRail",
    table: "EnrollmentTable",
    drawer: "EnrollmentDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<LeadDrawer", "compact", "checklistItems={enrollmentChecklist}", "history={enrollmentDrawerHistory}"]
  },
  {
    page: "RetentionRiskListPage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "RetentionRiskFilters",
    quickFilters: "RetentionRiskQuickRail",
    table: "RetentionRiskTable",
    drawer: "RetentionRiskDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<CaseDrawer", "facts={retentionRiskDrawerFacts}", "history={["]
  },
  {
    page: "RetentionCancellationQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "CancellationFilters",
    quickFilters: "CancellationQuickRail",
    table: "CancellationTable",
    drawer: "CancellationDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<CaseDrawer", "alternativesVariant=\"steps\"", "footerActions={["]
  },
  {
    page: "RetentionReactivationListPage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "ReactivationFilters",
    quickFilters: "ReactivationQuickRail",
    table: "ReactivationTable",
    drawer: "ReactivationDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<CaseDrawer", 'factsLayout="grid"', "restrictions={["]
  },
  {
    page: "RetentionComplaintQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "ComplaintFilters",
    quickFilters: "ComplaintQuickRail",
    table: "ComplaintTable",
    drawer: "ComplaintDrawer",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "rowActions={()", 'selectedRowId="ana"'],
    requiredDrawerSnippets: ["<CaseDrawer", 'factsLayout="grid"', "alternativesVariant=\"steps\"", "footerActions={["]
  }
];

const tableFamilyForbiddenMarkers = [
  "WorkPage",
  "<RiskCard",
  "function RiskCard",
  "<TrialClassCard",
  "function TrialClassCard",
  "<LeadSummary",
  "function LeadSummary",
  "<EnrollmentChecklist",
  "function EnrollmentChecklist",
  "<CancellationCase",
  "function CancellationCase",
  "<ReactivationCard",
  "function ReactivationCard",
  "<ComplaintPanel",
  "function ComplaintPanel"
];

const tableFamilyDetailRows = tableFamilyDetailContracts.map((contract) => {
  const source = sourceByFileName.get(contract.file) ?? "";
  const pageSource = sourceWindowForNamedFunction(source, contract.page);
  const filterSource = sourceWindowForNamedFunction(source, contract.filter);
  const quickSource = sourceWindowForNamedFunction(source, contract.quickFilters);
  const tableSource = sourceWindowForNamedFunction(source, contract.table);
  const drawerSource = sourceWindowForNamedFunction(source, contract.drawer);
  const missingSnippets = [
    ...["<CrmWorklistPage", 'worklistLayoutMode="main-priority"', "filterBar={<", "quickFilters={<", "drawer={<"]
      .filter((snippet) => !pageSource.includes(snippet))
      .map((snippet) => `${contract.page}: ${snippet}`),
    ...["<PageFilterBar", 'advancedFiltersSurface="modal"', "searchFilterPlacement=\"embedded\""]
      .filter((snippet) => !filterSource.includes(snippet))
      .map((snippet) => `${contract.filter}: ${snippet}`),
    ...["<PageQuickFilters", 'selectionTone="soft"', "items={items}"]
      .filter((snippet) => !quickSource.includes(snippet))
      .map((snippet) => `${contract.quickFilters}: ${snippet}`),
    ...contract.requiredTableSnippets
      .filter((snippet) => !tableSource.includes(snippet))
      .map((snippet) => `${contract.table}: ${snippet}`),
    ...contract.requiredDrawerSnippets
      .filter((snippet) => !drawerSource.includes(snippet))
      .map((snippet) => `${contract.drawer}: ${snippet}`)
  ];
  const forbiddenPresent = tableFamilyForbiddenMarkers.filter((marker) => source.includes(marker));

  return {
    page: contract.page,
    file: contract.file,
    missingSnippets,
    forbiddenPresent,
    status:
      pageSource &&
      filterSource &&
      quickSource &&
      tableSource &&
      drawerSource &&
      missingSnippets.length === 0 &&
      forbiddenPresent.length === 0
        ? "pass"
        : "fail"
  };
});

const ledgerMarkers = [
  "remaining page coverage update",
  "54 individual Storybook exports",
  "Status: `Aprovado`"
];
const ledgerRows = ledgerMarkers.map((marker) => ({
  marker,
  present: ledgerSource.includes(marker)
}));

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status:
    exportRows.every((row) => row.status === "pass") &&
    remainingStoryRemoved &&
    sourceMarkerRows.every((row) => row.present) &&
    forbiddenMarkerRows.every((row) => !row.present) &&
    forbiddenCorpusMarkerRows.every((row) => !row.present) &&
    officialSourceMapMarkerRows.every((row) => !row.present) &&
    specificCompositionRows.every((row) => row.present) &&
    renderTargetRows.every((row) => row.status === "pass") &&
    pageFamilyContractRows.every((row) => row.status === "pass") &&
    tableFamilyDetailRows.every((row) => row.status === "pass") &&
    ledgerRows.every((row) => row.present)
      ? "pass"
      : "fail",
  storyCount: expectedStories.length,
  checkedStoryCount: exportRows.length,
  failedStories: exportRows.filter((row) => row.status !== "pass"),
  remainingStoryRemoved,
  sourceMarkerRows,
  forbiddenMarkerRows,
  forbiddenCorpusMarkerRows,
  officialSourceMapMarkerRows,
  specificCompositionRows,
  renderTargetRows,
  pageFamilyContractRows,
  tableFamilyDetailRows,
  ledgerRows,
  exportRows,
  note:
    "This audit proves the former Remaining Pages targets were migrated into official family Storybook stories, the duplicate Remaining Pages story file is absent, and the coverage is accepted for the current 99% visual scope. It does not certify pixel-perfect 1:1 visual parity."
};

const storyTable = exportRows
  .map((row) => `| ${row.exportName} | ${row.storyId} | ${row.status} |`)
  .join("\n");
const markerTable = sourceMarkerRows
  .map((row) => `| ${row.marker} | ${row.present ? "present" : "missing"} |`)
  .join("\n");
const forbiddenMarkerTable = forbiddenMarkerRows
  .map((row) => `| ${row.marker} | ${row.present ? "present" : "absent"} | ${row.reason} |`)
  .join("\n");
const forbiddenCorpusMarkerTable = forbiddenCorpusMarkerRows
  .map((row) => `| ${row.marker} | ${row.present ? "present" : "absent"} | ${row.reason} |`)
  .join("\n");
const officialSourceMapMarkerTable = officialSourceMapMarkerRows
  .map((row) => `| ${row.marker} | ${row.present ? "present" : "absent"} | ${row.reason} |`)
  .join("\n");
const specificCompositionTable = specificCompositionRows
  .map((row) => `| ${row.marker} | ${row.present ? "present" : "missing"} |`)
  .join("\n");
const renderTargetTable = renderTargetRows
  .map((row) => `| ${row.exportName} | ${row.target} | ${row.status} |`)
  .join("\n");
const pageFamilyContractTable = pageFamilyContractRows
  .map((row) => {
    const missing = row.missingSnippets.length ? row.missingSnippets.join("<br>") : "None";
    return `| ${row.page} | ${row.file} | ${row.family} | ${row.status} | ${missing} |`;
  })
  .join("\n");
const tableFamilyDetailTable = tableFamilyDetailRows
  .map((row) => {
    const missing = row.missingSnippets.length ? row.missingSnippets.join("<br>") : "None";
    const forbidden = row.forbiddenPresent.length ? row.forbiddenPresent.join("<br>") : "None";
    return `| ${row.page} | ${row.file} | ${row.status} | ${missing} | ${forbidden} |`;
  })
  .join("\n");
const ledgerTable = ledgerRows
  .map((row) => {
    const displayMarker = row.marker.startsWith("Status:")
      ? "Status: `Aprovado`"
      : row.marker;
    return `| ${displayMarker} | ${row.present ? "present" : "missing"} |`;
  })
  .join("\n");

const md = `# Remaining Page Coverage Audit

Date: ${audit.date}

Status: ${audit.status}

This audit verifies that every former Remaining Pages target in the current Batch 11 execution scope now has an individual Storybook export in its official family, is present in the static Storybook index, and is documented as accepted for the current 99% visual scope rather than pixel-perfect 1:1 approval.
It also verifies that the duplicate \`CRM / Image Coverage / Remaining Pages\` story file is absent and that owner pages preserve their official structural family contracts.

## Summary

- Expected stories: ${audit.storyCount}
- Checked stories: ${audit.checkedStoryCount}
- Failed stories: ${audit.failedStories.length}
- Duplicate Remaining Pages story removed: ${audit.remainingStoryRemoved ? "yes" : "no"}
- Certification note: this is page-level coverage evidence accepted for the current 99% visual scope; pixel-perfect visual parity remains separate.

## Required Component Markers

| Marker | Status |
| --- | --- |
${markerTable}

## Required Specific Page Compositions

| Marker | Status |
| --- | --- |
${specificCompositionTable}

## Former Remaining Page Render Targets

| Export | Official owner page | Status |
| --- | --- | --- |
${renderTargetTable}

## Page Family Contract Rows

| Page | Source file | Family | Status | Missing snippets |
| --- | --- | --- | --- | --- |
${pageFamilyContractTable}

## Worklist/Table Detail Contract Rows

These rows lock the high-risk Sales and Retention worklist pages to the Tarefas-style official family anatomy: \`CrmWorklistPage\`, \`PageFilterBar\`, \`PageQuickFilters\`, \`CrmWorklistTable\`, pagination, row actions, selected row and official domain drawer.

| Page | Source file | Status | Missing snippets | Forbidden legacy markers |
| --- | --- | --- | --- | --- |
${tableFamilyDetailTable}

## Forbidden Generic Story Markers

| Marker | Status | Reason |
| --- | --- | --- |
${forbiddenMarkerTable}

## Forbidden Imported Coverage Corpus Markers

| Marker | Status | Reason |
| --- | --- | --- |
${forbiddenCorpusMarkerTable}

## Forbidden Official Source Map Markers

| Marker | Status | Reason |
| --- | --- | --- |
${officialSourceMapMarkerTable}

## Ledger Markers

| Marker | Status |
| --- | --- |
${ledgerTable}

## Stories

| Export | Static Storybook ID | Status |
| --- | --- | --- |
${storyTable}
`;

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(mdPath, md);

if (checkMode && audit.status !== "pass") {
  console.error(`Remaining page coverage audit failed: failedStories=${audit.failedStories.length}`);
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/remaining-page-coverage-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/remaining-page-coverage-audit.json");
}
