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
const storybookBuildAvailable = existsSync(storybookIndexPath);

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
    requiredSnippets: ["<CrmDashboardPage", 'variant === "critical" ? "todayCritical" : "today"', "<TodayDashboard", "<TaskDrawer"]
  },
  {
    page: "InboxConversationPage",
    file: "ImageCoverageInbox.stories.tsx",
    family: "three-pane/inbox",
    requiredSnippets: ["<CrmThreePanePage", "filterBar={<InboxFilters", "ConversationList", "ConversationThread", "ContextPanel"]
  },
  {
    page: "AgendaCalendarPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "dashboard/calendar",
    requiredSnippets: ["<CrmDashboardPage", "<AgendaFilters", "<AgendaSidePanel", "<WeeklyCalendar", "drawer={drawerOpen ? (", "setDrawerOpen(false)", "onEventSelect={(eventId, event) =>"]
  },
  {
    page: "AgendaClassDetailPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "right-panel/detail",
    requiredSnippets: ["<CrmRightPanelPage", "main={<ClassOperationalDetail", "panel={", "<ClassDrawer"]
  },
  {
    page: "AgendaClassesPage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      "drawer={drawerOpen ? <AgendaClassDrawer classRow={selectedClass}",
      "filterBar={<ClassesFilters onInteraction={setAnnouncement} />}",
      "quickFilters={<ClassesQuickFilters onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<ClassesTable",
      "onInteraction={setAnnouncement}",
      "onPageChange={setPage}",
      "page={page}",
      "setSelectedClassId(row.id)",
      "onAction={(action) => setAnnouncement(`Ação da turma: ${action}`)}",
      "setDrawerOpen(true)"
    ]
  },
  {
    page: "AgendaGradePage",
    file: "ImageCoverageAgenda.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      "drawer={drawerOpen ? <AgendaGradeDrawer event={selectedEvent}",
      "filterBar={<GradeFilters onInteraction={setAnnouncement} />}",
      "quickFilters={<GradeSummaryFilters onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<WeeklyCalendar",
      "events={gradeWeeklyEvents}",
      "setSelectedEventId(eventId)",
      "selectedEventId={selectedEventId}",
      "setDrawerOpen(true)"
    ]
  },
  {
    page: "FinanceBillingDrawerPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "dashboard/drawer",
    requiredSnippets: [
      "<FinanceOverviewDashboard",
      "drawer={drawerOpen ? (",
      "<PaymentDrawer",
      "facts={paymentFacts(detail, effectiveState)}",
      "onClose={() => setDrawerOpen(false)}",
      "onOpenCase={(caseId) =>",
      "setSelectedCaseId(caseId)",
      "onAction={handleDrawerAction}"
    ]
  },
  {
    page: "FinanceKanbanPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "kanban",
    requiredSnippets: [
      "<CrmKanbanPage",
      "filterBar={<FinanceiroKanbanFilters onInteraction={setAnnouncement} />}",
      "<FinanceKanbanColumns onInteraction={setAnnouncement} />",
      "globalActions={{",
      "onNavChange={(id) => setAnnouncement",
      "role=\"status\""
    ]
  },
  {
    page: "FinanceMovementsPage",
    file: "ImageCoverageFinance.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="wide-main"',
      'drawerPlacement="fixed"',
      "filterBar={<MovementsFilters onInteraction={setAnnouncement} />}",
      "quickFilters={<MovementsQuickFilters onInteraction={setAnnouncement} />}",
      "<MovementTable",
      "drawer={drawerOpen ? (",
      "facts={movementDrawerFacts(selectedMovement, effectiveDrawerState)}",
      "onAction={handleMovementAction}",
      "setSelectedMovementId(row.id)",
      "setDrawerState(undefined)",
      "setDrawerOpen(true)"
    ]
  },
  {
    page: "SalesPipelinePage",
    file: "ImageCoverageSales.stories.tsx",
    family: "kanban",
    requiredSnippets: [
      "<CrmKanbanPage",
      "filterBar={<SalesPipelineFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "onNavChange={(id)",
      "<SalesPipelineBoard onInteraction={setAnnouncement} />"
    ]
  },
  {
    page: "SalesInterestedListPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="compact-rail"',
      "filterBar={<SalesInterestedFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<SalesLeadQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<SalesLeadDrawer lead={selectedLead}",
      "<SalesLeadTable",
      "setSelectedLeadId(row.id)"
    ]
  },
  {
    page: "SalesExperimentalListPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="compact-rail"',
      "filterBar={<ExperimentalFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<ExperimentalQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<ExperimentalDrawer experimental={selectedExperimental}",
      "<ExperimentalTable",
      "setSelectedExperimentalId(row.id)"
    ]
  },
  {
    page: "SalesEnrollmentChecklistPage",
    file: "ImageCoverageSales.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="compact-rail"',
      "filterBar={<EnrollmentFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<EnrollmentQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<EnrollmentDrawer enrollment={selectedEnrollment}",
      "<EnrollmentTable",
      "setSelectedEnrollmentId(row.id)"
    ]
  },
  {
    page: "RetentionRiskListPage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="wide-rail"',
      "filterBar={<RetentionRiskFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<RetentionRiskQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<RetentionRiskDrawer risk={selectedRisk}",
      "<RetentionRiskTable",
      "setSelectedRowId(row.id)"
    ]
  },
  {
    page: "RetentionCancellationQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="wide-rail"',
      "filterBar={<CancellationFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<CancellationQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<CancellationDrawer cancellation={selectedCancellation}",
      "<CancellationTable",
      "setSelectedRowId(row.id)"
    ]
  },
  {
    page: "RetentionReactivationListPage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="wide-rail"',
      "filterBar={<ReactivationFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<ReactivationQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<ReactivationDrawer onAction=",
      "reactivation={selectedReactivation}",
      "<ReactivationTable",
      "setSelectedRowId(row.id)"
    ]
  },
  {
    page: "RetentionComplaintQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    family: "table/worklist",
    requiredSnippets: [
      "<CrmWorklistPage",
      'worklistLayoutMode="wide-rail"',
      "filterBar={<ComplaintFilters onInteraction={setAnnouncement} />}",
      "globalActions={{",
      "quickFilters={<ComplaintQuickRail onInteraction={setAnnouncement} />}",
      "showGlobalActionsWithDrawer",
      "<ComplaintTable",
      "setSelectedRowId(row.id)",
      "drawer={drawerOpen ? <ComplaintDrawer",
      "complaint={selectedComplaint}",
      "onClose={() => { setDrawerOpen(false);",
      "onAction={(action)"
    ]
  },
  {
    page: "ReportsManagementPage",
    file: "ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredSnippets: ["<CrmDashboardPage", "before={<ReportFilterBar", "onExport=", "<ReportsManagementContent", "onOpen={setAction}", "<ExportAction"]
  },
  {
    page: "MoneyOnTheTablePage",
    file: "ImageCoverageReports.stories.tsx",
    family: "dashboard/reports",
    requiredSnippets: ["<CrmDashboardPage", "before={<MoneyTableFilters />}", "<OpportunityGroupCard", "drawer={drawerOpen ? <OpportunityPanel", "onClose={() => setDrawerOpen(false)}", "onItemOpen="]
  },
  {
    page: "SupportCentralPage",
    file: "ImageCoverageSupport.stories.tsx",
    family: "dashboard/support",
    requiredSnippets: ["<CrmDashboardPage", "layoutVariant=\"support\"", "<SupportStatusSidebar", "<SupportCentralContent", "onTicketSelect=", "drawer={drawerOpen ? <SupportTicketDrawer", "onClose={() => setDrawerOpen(false)}", "onAction="]
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
    requiredSnippets: ["<InternalWorklistPage", 'contentLayout="internal-tenants"', 'pageHeaderRhythm="internal-tenants"', 'worklistLayoutMode="main-priority"', "filterBar={<InternalTenantFilters", "quickFilters={<InternalTenantQuickFilters />}", "<InternalTenantsTable", "setSelectedTenantId(tenantId)", "drawer={drawerOpen ? <TenantSummaryDrawer", "onClose={() => setDrawerOpen(false)}"]
  },
  {
    page: "InternalTenantSecurityPage",
    file: "ImageCoverageInternal.stories.tsx",
    family: "internal/detail",
    requiredSnippets: ["<InternalShell", 'browserUrl="https://app.taliya.com/internal/tenants/tenant_vila_mariana"', 'contentLayout="internal-tenant-detail"', "<TenantDetailLayout />", 'regions={{ pageHeader: false }}']
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
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentRoutineWorkspace"]
  },
  {
    page: "AgentAbsenceFlowPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentFlowWorkspace"]
  },
  {
    page: "AgentAbsenceFlowTestPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", 'panel={<AgentFlowDrawer state="test" />}', "<SimulationRunner", 'rightPanelVariant="agent-test"', 'browserUrl: "https://app.taliya.com/app/agentes/agenda/rotinas/presenca-e-faltas/fluxos/falta-com-aviso/teste"']
  },
  {
    page: "AgentPublishRoutinePage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<AgentFlowDrawer", "<AgentPublishRoutineWorkspace"]
  },
  {
    page: "AgentExecutionReceiptPage",
    file: "ImageCoverageAgents.stories.tsx",
    family: "right-panel/agent",
    requiredSnippets: ["<CrmRightPanelPage", "main={<ExecutionReceipt", "panel={<AgentFlowDrawer"]
  },
  {
    page: "SettingsHubPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "dashboard/settings",
    requiredSnippets: ["<CrmDashboardPage", "columns={4}", "settingsHubItems.map", "<SettingsHubCard", "onOpen={() => setOpenedSettingId"]
  },
  {
    page: "SettingsPermissionsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsPermissionsWorkspace", "onRoleSelect={setSelectedRoleId}", "onSave={() => { const next = permissionRows"]
  },
  {
    page: "SettingsPaymentsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsPaymentsWorkspace", "rightPanelVariant=\"settings-payments\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/financeiro/pagamentos\"", "topNavSelection=\"none\""]
  },
  {
    page: "SettingsAgendaPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsAgendaWorkspace", "rightPanelVariant=\"settings-agenda\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/agenda\"", "topNavSelection=\"none\""]
  },
  {
    page: "SettingsNotificationsPage",
    file: "ImageCoverageSettings.stories.tsx",
    family: "right-panel/settings",
    requiredSnippets: ["<CrmRightPanelPage", "<SettingsAgentPanel", "<SettingsNotificationsWorkspace", "onChannelChange=", "onFrequencyChange=", "rightPanelVariant=\"settings-notifications\"", "browserUrl=\"https://app.taliya.com/app/configuracoes/notificacoes\"", "topNavSelection=\"none\""]
  },
  {
    page: "BillingSubscriptionPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingSubscriptionWorkspace", "onViewInvoices=", "onViewUsage=", "rightPanelVariant=\"billing-subscription\"", "browserUrl=\"https://app.taliya.com/app/billing\"", "topNavSelection: \"none\"", "navItems: crmOperationalNavItems"]
  },
  {
    page: "BillingInvoicesPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingInvoicesWorkspace", "rightPanelVariant=\"billing-invoices\"", "onPayCurrent=", "onOpenInvoice="]
  },
  {
    page: "BillingAddOnsPage",
    file: "ImageCoverageBilling.stories.tsx",
    family: "right-panel/billing",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<BillingSupportDrawer", "<BillingAddOnsWorkspace", "rightPanelVariant=\"billing-addons\"", "onAddOnAction="]
  },
  {
    page: "UsageOverviewPage",
    file: "ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageOverviewWorkspace", "rightPanelVariant=\"usage-overview\"", "onViewLedger=", "onViewFlows="]
  },
  {
    page: "UsageLedgerPage",
    file: "ImageCoverageUsage.stories.tsx",
    family: "right-panel/usage",
    requiredSnippets: ["<CrmRightPanelPage", "panel={<UsageDrawer", "<UsageLedgerTable", "rightPanelVariant=\"usage-ledger\"", "onAction=", "onFilterClick=", "onLoadMore="]
  },
  {
    page: "StudentProfilePage",
    file: "ImageCoverageStudents.stories.tsx",
    family: "right-panel/profile",
    requiredSnippets: ["<CrmRightPanelPage", "<StudentHeader", "<ProfileTabs", "<StudentProfileOverviewGrid", "panel={<StudentProfileActionRail"]
  },
  {
    page: "SetupShellGlobalPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", 'frameVariant="shell-global"', "onAgentQuickReply=", "onStepSelect=", "progress={32}", "step={2}"]
  },
  {
    page: "SetupAgentChatPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["sb-image-coverage-setup-agent-stage", "<SetupAgentChat", "onHumanHelp=", "onQuickReply=", "onSend="]
  },
  {
    page: "SetupWorkspaceConfigPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupConsumptionWorkspace", "progress={32}", "step={2}"]
  },
  {
    page: "SetupStudioPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupStudioWorkspace", "progress={12}", "step={1}"]
  },
  {
    page: "SetupTeamPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupTeamWorkspace", "progress={24}", "step={2}"]
  },
  {
    page: "SetupChannelsPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupChannelsWorkspace", "progress={36}", "step={3}"]
  },
  {
    page: "SetupPlansPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupPlansWorkspace", "progress={48}", "step={4}"]
  },
  {
    page: "SetupPaymentPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupPaymentWorkspace", "progress={55}", "step={5}"]
  },
  {
    page: "SetupStudentsImportPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupStudentsWorkspace", "progress={66}", "step={6}"]
  },
  {
    page: "SetupClassesPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupClassesWorkspace", "progress={77}", "step={7}"]
  },
  {
    page: "SetupAgendaPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupAgendaWorkspace", "progress={88}", "step={8}"]
  },
  {
    page: "SetupReviewPage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup",
    requiredSnippets: ["<SetupPage", "<SetupReviewWorkspace", "progress={98}", "step={9}"]
  },
  {
    page: "SetupWelcomePage",
    file: "ImageCoverageSetup.stories.tsx",
    family: "setup/welcome",
    requiredSnippets: ["<SetupPage", "<SetupWelcomeWorkspace", "<SetupAgentChat", 'layout="welcome"']
  }
];

const requiredSourceMarkers = [
  "CrmDashboardPage",
  "CrmRightPanelPage",
  "CrmKanbanPage",
  "CrmThreePanePage",
  "SetupShellGlobalPage",
  "SetupPage",
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
  "SetupConsumptionWorkspace",
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
    `export\\s+const\\s+${exportName}\\s*:[\\s\\S]*?render\\s*:\\s*\\(\\)\\s*=>\\s*<${target}(?:\\s+[^<>]*?)?\\s*/>`,
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

  const rest = source.slice(start + 1);
  const nextFunction = /\n(?:export\s+)?function\s+[A-Za-z0-9_]+\s*\(/.exec(rest);
  const nextConst = /\n(?:export\s+)?const\s+[A-Za-z0-9_]+\s*(?::|=)/.exec(rest);
  const next = [nextFunction?.index, nextConst?.index]
    .filter((index) => typeof index === "number" && index >= 0)
    .sort((a, b) => a - b)[0];

  return source.slice(start, next === undefined ? source.length : start + 1 + next);
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
    layoutMode: "compact-rail",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<LeadDrawer", "compact", "facts={experimentalDrawerFacts(experimental)}", "history={history}", "name={experimental.interested}"]
  },
  {
    page: "SalesEnrollmentChecklistPage",
    file: "ImageCoverageSales.stories.tsx",
    filter: "EnrollmentFilters",
    quickFilters: "EnrollmentQuickRail",
    table: "EnrollmentTable",
    drawer: "EnrollmentDrawer",
    layoutMode: "compact-rail",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<LeadDrawer", "compact", "checklistItems={checklist}", "history={history}", "name={enrollment.person}"]
  },
  {
    page: "RetentionRiskListPage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "RetentionRiskFilters",
    quickFilters: "RetentionRiskQuickRail",
    table: "RetentionRiskTable",
    drawer: "RetentionRiskDrawer",
    layoutMode: "wide-rail",
    requiredTableSnippets: ["<CrmWorklistTable", "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "onRowSelect?.(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<CaseDrawer", "facts={retentionRiskDrawerFacts(risk)}", "footerActions={retentionRiskFooterActions}", "history={history}", "title={risk.student}"]
  },
  {
    page: "RetentionCancellationQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "CancellationFilters",
    quickFilters: "CancellationQuickRail",
    table: "CancellationTable",
    drawer: "CancellationDrawer",
    layoutMode: "wide-rail",
    requiredTableSnippets: ["<CrmWorklistTable", 'density="compact"', 'minTableWidth="880px"', "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "onRowSelect?.(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<CaseDrawer", 'density="compact"', "alternativesVariant=\"steps\"", "facts={cancellationDrawerFacts(cancellation)}", "footerActions={cancellationFooterActions}", "sections={sections}", "title={cancellation.student}"]
  },
  {
    page: "RetentionReactivationListPage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "ReactivationFilters",
    quickFilters: "ReactivationQuickRail",
    table: "ReactivationTable",
    drawer: "ReactivationDrawer",
    layoutMode: "wide-rail",
    requiredFilterSnippets: ['placement: "advanced"', 'label: "Contato permitido"'],
    requiredTableSnippets: ["<CrmWorklistTable", 'density="compact"', 'minTableWidth="900px"', "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "onRowSelect?.(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<CaseDrawer", 'density="compact"', 'factsLayout="grid"', 'kind: "facts"', "facts={reactivationDrawerFacts(reactivation)}", "footerActions={reactivationFooterActions}", "sections={sections}", "title={reactivation.student}"]
  },
  {
    page: "RetentionComplaintQueuePage",
    file: "ImageCoverageRetention.stories.tsx",
    filter: "ComplaintFilters",
    quickFilters: "ComplaintQuickRail",
    table: "ComplaintTable",
    drawer: "ComplaintDrawer",
    layoutMode: "wide-rail",
    requiredFilterSnippets: ['placement: "advanced"', 'label: "Prazo"'],
    requiredTableSnippets: ["<CrmWorklistTable", 'density="compact"', 'minTableWidth="840px"', "pagination={{", "onRowSelect={onRowSelect}", "rowActions={(row)", "onRowSelect?.(row)", "selectedRowId={selectedRowId}"],
    requiredDrawerSnippets: ["<CaseDrawer", 'density="compact"', 'factsLayout="grid"', "facts={complaintDrawerFacts(complaint)}", "footerActions={complaintFooterActions}", "sections={sections}", "title={complaint.student}"]
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
    ...["<CrmWorklistPage", `worklistLayoutMode="${contract.layoutMode}"`, "filterBar={<", "quickFilters={<", "drawer={drawerOpen ?"]
      .filter((snippet) => !pageSource.includes(snippet))
      .map((snippet) => `${contract.page}: ${snippet}`),
    ...["<PageFilterBar", 'advancedFiltersSurface="modal"', "searchFilterPlacement=\"embedded\""]
      .filter((snippet) => !filterSource.includes(snippet))
      .map((snippet) => `${contract.filter}: ${snippet}`),
    ...(contract.requiredFilterSnippets ?? [])
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

const failureReasons = [
  ...exportRows.filter((row) => row.status !== "pass").map((row) => `story:${row.exportName}`),
  ...(!remainingStoryRemoved ? ["remaining-story-file-present"] : []),
  ...sourceMarkerRows.filter((row) => !row.present).map((row) => `source-marker:${row.marker}`),
  ...forbiddenMarkerRows.filter((row) => row.present).map((row) => `forbidden-marker:${row.marker}`),
  ...forbiddenCorpusMarkerRows.filter((row) => row.present).map((row) => `forbidden-corpus-marker:${row.marker}`),
  ...officialSourceMapMarkerRows.filter((row) => row.present).map((row) => `official-source-map-marker:${row.marker}`),
  ...specificCompositionRows.filter((row) => !row.present).map((row) => `specific-composition:${row.marker}`),
  ...renderTargetRows.filter((row) => row.status !== "pass").map((row) => `render-target:${row.exportName}`),
  ...pageFamilyContractRows.filter((row) => row.status !== "pass").map((row) => `page-family:${row.page}`),
  ...tableFamilyDetailRows.filter((row) => row.status !== "pass").map((row) => `table-family:${row.page}`),
  ...ledgerRows.filter((row) => !row.present).map((row) => `ledger-marker:${row.marker}`)
];

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: !storybookBuildAvailable
    ? "blocked-missing-storybook-build"
    : exportRows.every((row) => row.status === "pass") &&
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
  storybookBuildAvailable,
  blockingReasons: storybookBuildAvailable ? failureReasons : ["apps/docs/storybook-static/index.json is missing"],
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

Storybook static build available: ${audit.storybookBuildAvailable ? "yes" : "no"}

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

if (!checkMode) {
  writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(mdPath, md);
}

if (checkMode && audit.status !== "pass") {
  if (audit.status === "blocked-missing-storybook-build") {
    console.error("Remaining page coverage audit blocked: build Storybook before checking static coverage");
  } else {
    console.error(`Remaining page coverage audit failed: failedStories=${audit.failedStories.length}; reasons=${audit.blockingReasons.join(", ") || "unknown"}`);
  }
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/remaining-page-coverage-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/remaining-page-coverage-audit.json");
}
