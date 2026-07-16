# Remaining Page Coverage Audit

Date: 2026-07-16

Status: pass

Storybook static build available: yes

This audit verifies that every former Remaining Pages target in the current Batch 11 execution scope now has an individual Storybook export in its official family, is present in the static Storybook index, and is documented as accepted for the current 99% visual scope rather than pixel-perfect 1:1 approval.
It also verifies that the duplicate `CRM / Image Coverage / Remaining Pages` story file is absent and that owner pages preserve their official structural family contracts.

## Summary

- Expected stories: 54
- Checked stories: 54
- Failed stories: 0
- Duplicate Remaining Pages story removed: yes
- Certification note: this is page-level coverage evidence accepted for the current 99% visual scope; pixel-perfect visual parity remains separate.

## Required Component Markers

| Marker | Status |
| --- | --- |
| CrmDashboardPage | present |
| CrmRightPanelPage | present |
| CrmKanbanPage | present |
| CrmThreePanePage | present |
| SetupShellGlobalPage | present |
| SetupPage | present |
| SetupAgentChatPage | present |
| SetupWorkspaceConfigPage | present |
| SetupStudioPage | present |
| SetupTeamPage | present |
| SetupChannelsPage | present |
| SetupPlansPage | present |
| SetupPaymentPage | present |
| SetupStudentsImportPage | present |
| SetupClassesPage | present |
| SetupAgendaPage | present |
| SetupReviewPage | present |
| SetupWelcomePage | present |
| PageFilterBar | present |
| PageQuickFilters | present |
| CrmWorklistPage | present |
| InternalWorklistPage | present |
| InboxConversationPage | present |
| AgendaCalendarPage | present |
| AgendaClassDetailPage | present |
| AgendaClassesPage | present |
| AgendaGradePage | present |
| StudentProfilePage | present |
| AgentsCatalogPage | present |
| AgentAgendaRoutinesPage | present |
| AgentPresenceRoutinePage | present |
| AgentAbsenceFlowPage | present |
| AgentAbsenceFlowTestPage | present |
| AgentPublishRoutinePage | present |
| AgentExecutionReceiptPage | present |
| SettingsHubPage | present |
| SettingsPermissionsPage | present |
| SettingsPaymentsPage | present |
| SettingsAgendaPage | present |
| SettingsNotificationsPage | present |
| SalesPipelinePage | present |
| FinanceKanbanCard | present |

## Required Specific Page Compositions

| Marker | Status |
| --- | --- |
| TodayShell | present |
| FinanceOverviewDashboard | present |
| FinanceBillingDrawerPage | present |
| FinanceKanbanPage | present |
| FinanceMovementsPage | present |
| SetupConsumptionWorkspace | present |
| ReportsManagementPage | present |
| MoneyOnTheTablePage | present |
| PaymentCaseCard | present |
| OpportunityGroupCard | present |
| SetupTeamPage | present |

## Former Remaining Page Render Targets

| Export | Official owner page | Status |
| --- | --- | --- |
| Image19HojeEstadoCritico | TodayShell | pass |
| Image24DInboxConversaAberta | InboxConversationPage | pass |
| Image26AgendaCalendarioOperacional | AgendaCalendarPage | pass |
| Image28AlunoPerfilResumoOperacional | StudentProfilePage | pass |
| Image29AulaDetalheComChamada | AgendaClassDetailPage | pass |
| Image32FinanceiroDrawerCobranca | FinanceBillingDrawerPage | pass |
| Image33FinanceiroKanban | FinanceKanbanPage | pass |
| Image34MovimentacoesFiltrosDrawer | FinanceMovementsPage | pass |
| Image35TurmasListaDetalhe | AgendaClassesPage | pass |
| Image36GradeSemanaModeloBloqueio | AgendaGradePage | pass |
| Image37VendasPipelineKanban | SalesPipelinePage | pass |
| Image38ListaInteressados | SalesInterestedListPage | pass |
| Image39ExperimentalLista | SalesExperimentalListPage | pass |
| Image40MatriculasChecklistConversao | SalesEnrollmentChecklistPage | pass |
| Image41RetencaoRiscos | RetentionRiskListPage | pass |
| Image42CancelamentosFila | RetentionCancellationQueuePage | pass |
| Image43ReativacoesExAlunos | RetentionReactivationListPage | pass |
| Image44ReclamacoesCasoSensivel | RetentionComplaintQueuePage | pass |
| ReportsManagement | ReportsManagementPage | pass |
| MoneyOnTheTable | MoneyOnTheTablePage | pass |
| SupportCentral | SupportCentralPage | pass |
| Image48InternalVisaoOperacional | InternalOverviewPage | pass |
| Image49InternalTenantsListaDetalhe | InternalTenantsListDetailPage | pass |
| Image50InternalTenantDetalheUsuariosGrants | InternalTenantSecurityPage | pass |
| Image52AgentesCatalogo | AgentsCatalogPage | pass |
| Image53AgenteAgendaRotinas | AgentAgendaRoutinesPage | pass |
| Image54RotinaPresencaFaltas | AgentPresenceRoutinePage | pass |
| Image56FluxoFaltaComAviso | AgentAbsenceFlowPage | pass |
| Image58TesteFluxoFaltaComAviso | AgentAbsenceFlowTestPage | pass |
| Image59PublicarRotina | AgentPublishRoutinePage | pass |
| Image70ExecucoesFluxo | AgentExecutionReceiptPage | pass |
| Image60ConfiguracoesHub | SettingsHubPage | pass |
| Image61ConfiguracoesPermissoes | SettingsPermissionsPage | pass |
| Image62ConfiguracoesPagamentos | SettingsPaymentsPage | pass |
| Image63ConfiguracoesAgenda | SettingsAgendaPage | pass |
| Image64ConfiguracoesNotificacoes | SettingsNotificationsPage | pass |
| Image65BillingAssinatura | BillingSubscriptionPage | pass |
| Image66BillingFaturas | BillingInvoicesPage | pass |
| Image67BillingAddOns | BillingAddOnsPage | pass |
| Image68UsoVisaoGeral | UsageOverviewPage | pass |
| Image69UsoExtrato | UsageLedgerPage | pass |
| Image51AOnboardingShellGlobal | SetupShellGlobalPage | pass |
| Image51BOnboardingAgenteConfiguracaoChat | SetupAgentChatPage | pass |
| Image51COnboardingWorkspaceConfiguracao | SetupWorkspaceConfigPage | pass |
| Image51DOnboardingStudio | SetupStudioPage | pass |
| Image51EOnboardingEquipe | SetupTeamPage | pass |
| Image51FOnboardingCanais | SetupChannelsPage | pass |
| Image51GOnboardingPlanos | SetupPlansPage | pass |
| Image51KOnboardingPagamento | SetupPaymentPage | pass |
| Image51HOnboardingAlunos | SetupStudentsImportPage | pass |
| Image51IOnboardingTurmas | SetupClassesPage | pass |
| Image51JOnboardingAgenda | SetupAgendaPage | pass |
| Image51LOnboardingRevisao | SetupReviewPage | pass |
| Image78OnboardingBemVindo | SetupWelcomePage | pass |

## Page Family Contract Rows

| Page | Source file | Family | Status | Missing snippets |
| --- | --- | --- | --- | --- |
| TodayShell | ImageCoverageToday.stories.tsx | dashboard | pass | None |
| InboxConversationPage | ImageCoverageInbox.stories.tsx | three-pane/inbox | pass | None |
| AgendaCalendarPage | ImageCoverageAgenda.stories.tsx | dashboard/calendar | pass | None |
| AgendaClassDetailPage | ImageCoverageAgenda.stories.tsx | right-panel/detail | pass | None |
| AgendaClassesPage | ImageCoverageAgenda.stories.tsx | table/worklist | pass | None |
| AgendaGradePage | ImageCoverageAgenda.stories.tsx | table/worklist | pass | None |
| FinanceBillingDrawerPage | ImageCoverageFinance.stories.tsx | dashboard/drawer | pass | None |
| FinanceKanbanPage | ImageCoverageFinance.stories.tsx | kanban | pass | None |
| FinanceMovementsPage | ImageCoverageFinance.stories.tsx | table/worklist | pass | None |
| SalesPipelinePage | ImageCoverageSales.stories.tsx | kanban | pass | None |
| SalesInterestedListPage | ImageCoverageSales.stories.tsx | table/worklist | pass | None |
| SalesExperimentalListPage | ImageCoverageSales.stories.tsx | table/worklist | pass | None |
| SalesEnrollmentChecklistPage | ImageCoverageSales.stories.tsx | table/worklist | pass | None |
| RetentionRiskListPage | ImageCoverageRetention.stories.tsx | table/worklist | pass | None |
| RetentionCancellationQueuePage | ImageCoverageRetention.stories.tsx | table/worklist | pass | None |
| RetentionReactivationListPage | ImageCoverageRetention.stories.tsx | table/worklist | pass | None |
| RetentionComplaintQueuePage | ImageCoverageRetention.stories.tsx | table/worklist | pass | None |
| ReportsManagementPage | ImageCoverageReports.stories.tsx | dashboard/reports | pass | None |
| MoneyOnTheTablePage | ImageCoverageReports.stories.tsx | dashboard/reports | pass | None |
| SupportCentralPage | ImageCoverageSupport.stories.tsx | dashboard/support | pass | None |
| InternalOverviewPage | ImageCoverageInternal.stories.tsx | internal/dashboard | pass | None |
| InternalTenantsListDetailPage | ImageCoverageInternal.stories.tsx | internal/table | pass | None |
| InternalTenantSecurityPage | ImageCoverageInternal.stories.tsx | internal/detail | pass | None |
| AgentsCatalogPage | ImageCoverageAgents.stories.tsx | dashboard/agents | pass | None |
| AgentAgendaRoutinesPage | ImageCoverageAgents.stories.tsx | dashboard/agents | pass | None |
| AgentPresenceRoutinePage | ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentAbsenceFlowPage | ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentAbsenceFlowTestPage | ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentPublishRoutinePage | ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| AgentExecutionReceiptPage | ImageCoverageAgents.stories.tsx | right-panel/agent | pass | None |
| SettingsHubPage | ImageCoverageSettings.stories.tsx | dashboard/settings | pass | None |
| SettingsPermissionsPage | ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsPaymentsPage | ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsAgendaPage | ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| SettingsNotificationsPage | ImageCoverageSettings.stories.tsx | right-panel/settings | pass | None |
| BillingSubscriptionPage | ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| BillingInvoicesPage | ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| BillingAddOnsPage | ImageCoverageBilling.stories.tsx | right-panel/billing | pass | None |
| UsageOverviewPage | ImageCoverageUsage.stories.tsx | right-panel/usage | pass | None |
| UsageLedgerPage | ImageCoverageUsage.stories.tsx | right-panel/usage | pass | None |
| StudentProfilePage | ImageCoverageStudents.stories.tsx | right-panel/profile | pass | None |
| SetupShellGlobalPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupAgentChatPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupWorkspaceConfigPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupStudioPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupTeamPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupChannelsPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupPlansPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupPaymentPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupStudentsImportPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupClassesPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupAgendaPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupReviewPage | ImageCoverageSetup.stories.tsx | setup | pass | None |
| SetupWelcomePage | ImageCoverageSetup.stories.tsx | setup/welcome | pass | None |

## Worklist/Table Detail Contract Rows

These rows lock the high-risk Sales and Retention worklist pages to the Tarefas-style official family anatomy: `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, pagination, row actions, selected row and official domain drawer.

| Page | Source file | Status | Missing snippets | Forbidden legacy markers |
| --- | --- | --- | --- | --- |
| SalesExperimentalListPage | ImageCoverageSales.stories.tsx | pass | None | None |
| SalesEnrollmentChecklistPage | ImageCoverageSales.stories.tsx | pass | None | None |
| RetentionRiskListPage | ImageCoverageRetention.stories.tsx | pass | None | None |
| RetentionCancellationQueuePage | ImageCoverageRetention.stories.tsx | pass | None | None |
| RetentionReactivationListPage | ImageCoverageRetention.stories.tsx | pass | None | None |
| RetentionComplaintQueuePage | ImageCoverageRetention.stories.tsx | pass | None | None |

## Forbidden Generic Story Markers

| Marker | Status | Reason |
| --- | --- | --- |
| function GenericTable | absent | Remaining page stories must use page-specific official table compositions, not one generic operational table. |
| <GenericTable | absent | Remaining page stories must not render a generic table placeholder. |
| function MetricsRow | absent | Remaining page stories must use page-specific metric compositions. |
| <MetricsRow | absent | Remaining page stories must not render generic metric placeholders. |
| function GenericBoard | absent | Remaining page stories must use page-specific kanban board compositions. |
| <GenericBoard | absent | Remaining page stories must not render a generic kanban placeholder. |

## Forbidden Imported Coverage Corpus Markers

| Marker | Status | Reason |
| --- | --- | --- |
| CrmPageFamilyShell | absent | Image coverage pages must consume official page-family wrappers instead of assembling the shell/layout directly. |
| DashboardGrid | absent | Image coverage pages must consume CrmDashboardPage, CrmRightPanelPage, SetupContentGrid, or another official family wrapper instead of rendering DashboardGrid directly. |

## Forbidden Official Source Map Markers

| Marker | Status | Reason |
| --- | --- | --- |
| CrmPageFamilyShell | absent | The remaining-pages source map must document current page-family wrappers instead of the deprecated direct shell assembly. |
| DashboardGrid | absent | The remaining-pages source map must point dashboard/profile pages at current family wrappers instead of direct dashboard layout primitives. |
| ShellPage | absent | The remaining-pages source map must not describe local ShellPage composition as an accepted remaining-page route. |
| WorkPage | absent | The remaining-pages source map must not describe local WorkPage composition as an accepted remaining-page route. |

## Ledger Markers

| Marker | Status |
| --- | --- |
| remaining page coverage update | present |
| 54 individual Storybook exports | present |
| Status: `Aprovado` | present |

## Stories

| Export | Static Storybook ID | Status |
| --- | --- | --- |
| Image19HojeEstadoCritico | crm-image-coverage-hoje--image-19-hoje-estado-critico | pass |
| Image24DInboxConversaAberta | crm-image-coverage-inbox--image-24-d-inbox-conversa-aberta | pass |
| Image26AgendaCalendarioOperacional | crm-image-coverage-agenda--image-26-agenda-calendario-operacional | pass |
| Image28AlunoPerfilResumoOperacional | crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional | pass |
| Image29AulaDetalheComChamada | crm-image-coverage-agenda--image-29-aula-detalhe-com-chamada | pass |
| Image32FinanceiroDrawerCobranca | crm-image-coverage-financeiro--image-32-financeiro-drawer-cobranca | pass |
| Image33FinanceiroKanban | crm-image-coverage-financeiro--image-33-financeiro-kanban | pass |
| Image34MovimentacoesFiltrosDrawer | crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer | pass |
| Image35TurmasListaDetalhe | crm-image-coverage-agenda--image-35-turmas-lista-detalhe | pass |
| Image36GradeSemanaModeloBloqueio | crm-image-coverage-agenda--image-36-grade-semana-modelo-bloqueio | pass |
| Image37VendasPipelineKanban | crm-image-coverage-vendas--image-37-vendas-pipeline-kanban | pass |
| Image38ListaInteressados | crm-image-coverage-vendas--image-38-lista-interessados | pass |
| Image39ExperimentalLista | crm-image-coverage-vendas--image-39-experimental-lista | pass |
| Image40MatriculasChecklistConversao | crm-image-coverage-vendas--image-40-matriculas-checklist-conversao | pass |
| Image41RetencaoRiscos | crm-image-coverage-retencao--image-41-retencao-riscos | pass |
| Image42CancelamentosFila | crm-image-coverage-retencao--image-42-cancelamentos-fila | pass |
| Image43ReativacoesExAlunos | crm-image-coverage-retencao--image-43-reativacoes-ex-alunos | pass |
| Image44ReclamacoesCasoSensivel | crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel | pass |
| ReportsManagement | crm-image-coverage-relatorios--reports-management | pass |
| MoneyOnTheTable | crm-image-coverage-relatorios--money-on-the-table | pass |
| SupportCentral | crm-image-coverage-suporte--support-central | pass |
| Image48InternalVisaoOperacional | crm-image-coverage-internal--image-48-internal-visao-operacional | pass |
| Image49InternalTenantsListaDetalhe | crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe | pass |
| Image50InternalTenantDetalheUsuariosGrants | crm-image-coverage-internal--image-50-internal-tenant-detalhe-usuarios-grants | pass |
| Image52AgentesCatalogo | crm-image-coverage-agentes--image-52-agentes-catalogo | pass |
| Image53AgenteAgendaRotinas | crm-image-coverage-agentes--image-53-agente-agenda-rotinas | pass |
| Image54RotinaPresencaFaltas | crm-image-coverage-agentes--image-54-rotina-presenca-faltas | pass |
| Image56FluxoFaltaComAviso | crm-image-coverage-agentes--image-56-fluxo-falta-com-aviso | pass |
| Image58TesteFluxoFaltaComAviso | crm-image-coverage-agentes--image-58-teste-fluxo-falta-com-aviso | pass |
| Image59PublicarRotina | crm-image-coverage-agentes--image-59-publicar-rotina | pass |
| Image70ExecucoesFluxo | crm-image-coverage-agentes--image-70-execucoes-fluxo | pass |
| Image60ConfiguracoesHub | crm-image-coverage-configuracoes--image-60-configuracoes-hub | pass |
| Image61ConfiguracoesPermissoes | crm-image-coverage-configuracoes--image-61-configuracoes-permissoes | pass |
| Image62ConfiguracoesPagamentos | crm-image-coverage-configuracoes--image-62-configuracoes-pagamentos | pass |
| Image63ConfiguracoesAgenda | crm-image-coverage-configuracoes--image-63-configuracoes-agenda | pass |
| Image64ConfiguracoesNotificacoes | crm-image-coverage-configuracoes--image-64-configuracoes-notificacoes | pass |
| Image65BillingAssinatura | crm-image-coverage-billing--image-65-billing-assinatura | pass |
| Image66BillingFaturas | crm-image-coverage-billing--image-66-billing-faturas | pass |
| Image67BillingAddOns | crm-image-coverage-billing--image-67-billing-add-ons | pass |
| Image68UsoVisaoGeral | crm-image-coverage-usage--image-68-uso-visao-geral | pass |
| Image69UsoExtrato | crm-image-coverage-usage--image-69-uso-extrato | pass |
| Image51AOnboardingShellGlobal | crm-image-coverage-setup--image-51-a-onboarding-shell-global | pass |
| Image51BOnboardingAgenteConfiguracaoChat | crm-image-coverage-setup--image-51-b-onboarding-agente-configuracao-chat | pass |
| Image51COnboardingWorkspaceConfiguracao | crm-image-coverage-setup--image-51-c-onboarding-workspace-configuracao | pass |
| Image51DOnboardingStudio | crm-image-coverage-setup--image-51-d-onboarding-studio | pass |
| Image51EOnboardingEquipe | crm-image-coverage-setup--image-51-e-onboarding-equipe | pass |
| Image51FOnboardingCanais | crm-image-coverage-setup--image-51-f-onboarding-canais | pass |
| Image51GOnboardingPlanos | crm-image-coverage-setup--image-51-g-onboarding-planos | pass |
| Image51KOnboardingPagamento | crm-image-coverage-setup--image-51-k-onboarding-pagamento | pass |
| Image51HOnboardingAlunos | crm-image-coverage-setup--image-51-h-onboarding-alunos | pass |
| Image51IOnboardingTurmas | crm-image-coverage-setup--image-51-i-onboarding-turmas | pass |
| Image51JOnboardingAgenda | crm-image-coverage-setup--image-51-j-onboarding-agenda | pass |
| Image51LOnboardingRevisao | crm-image-coverage-setup--image-51-l-onboarding-revisao | pass |
| Image78OnboardingBemVindo | crm-image-coverage-setup--image-78-onboarding-bem-vindo | pass |
