# Image Coverage Map

Purpose: prove that every approved Taliya CRM image can be decomposed into reusable components and later reconstructed with component-level 1:1 visual cloning from the component library.

Canonical source directory:

```text
D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508
```

Legend:

- **Covered**: target image can be reconstructed using matrix components with 1:1 visual cloning at component level.
- **Historical**: preserved as context, not implementation target.
- **Duplicate**: not a separate implementation target.
- **Rejected**: not an implementation target.
- **Adjusted**: visually saved but known to require documented polish.
- **Superseded**: replaced by a newer approved image.

## Reference And Design System Boards

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `_contact-sheet-analytics-review.jpg` | Historical reference | contact sheet/index for visual review | none |
| `crm_1.webp` | Historical reference | External visual inspiration | ProductWindowFrame, CrmProductShell, Sidebar, Topbar, Panel, Card |
| `01_round-1_visual-dna-tokens_aprovada.png` | Covered | token source | Design tokens, Typography tokens, Status semantic tokens, IconButton, Card, Panel, Avatar, Badge |
| `02_round-1_visual-dna-tokens_duplicata.png` | Duplicate | duplicate token board | same as 01; not separate target |
| `03_round-2_app-shell_tentativa-1_nao-aprovada.png` | Rejected | no implementation target | none |
| `04_round-2a_app-shell-tela-base_tentativa-2.png` | Historical | app shell attempt | CrmProductShell only as context |
| `05_round-2a1_app-shell-tela-base_refino.png` | Historical | app shell refinement | CrmProductShell only as context |
| `06_round-2a2_app-shell-tela-base_aprovada.png` | Historical/Covered | early shell direction | ProductWindowFrame, CrmProductShell, Sidebar, Topbar, AvatarStack, Panel, Card |
| `07_round-3a_componentes-web-referencia_aprovada.png` | Covered | core reference components | IconButton, NavPill, SidebarItem, Avatar, Badge, Card, Panel, DataTable |
| `08_round-3b1_inputs-formularios-filtros_aprovada.png` | Covered | forms/filters | Input, Textarea, Select, Checkbox, Toggle, SegmentedControl, FilterChip, FilterBar, FieldGroup |
| `09_round-3b2_overlays-feedback_aprovada.png` | Covered | overlays/states | Modal, Drawer, Popover, Tooltip, EmptyState, LoadingState, ErrorState, ConfirmDialog |
| `10_round-3b3_visualizacoes-operacionais_aprovada.png` | Covered | operational views | DataTable, List, KanbanBoard, WeeklyCalendar, Timeline, ActivityFeed, MetricCard |
| `11_round-3b4_comunicacao-agentes_aprovada.png` | Covered | inbox/agents | ConversationList, ConversationThread, MessageBubble, Composer, AgentPanel, CopilotSuggestion, ApprovalPanel |
| `12_round-3b5_sistema-plano-governanca_aprovada.png` | Covered | system/plan/governance | PlanSummaryCard, QuotaProgress, PermissionMatrix, IntegrationStatusRow, AuditTrail, StatusCard |
| `13_round-3c1_objetos-setup-dados_aprovada.png` | Covered | setup/data | SetupStepper, SetupChoiceCard, ImportProgress, FieldMappingTable, DuplicateResolver, StudentHeader |
| `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | Covered | agenda/finance/docs | WeeklyCalendar, ClassCard, Roster, PaymentCaseCard, ReconciliationRow, MoneyInput, FileUpload, AttachmentList |
| `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` | Covered | agents/audit/reports | FlowBuilder, ModeSelector, SimulationRunner, AuditTrail, ChartPanel, ReportFilterBar, BeforeAfterDiff |
| `16_round-4.1S_app-shell_01_base-web.png` | Covered | canonical app shell | ProductWindowFrame, CrmProductShell, Sidebar, Topbar, PageHeader, GlobalActions, Panel |

## CRM Logged-In Screens

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `17_round-4.1A_hoje_01_acima-da-dobra.png.png` | Covered / 99% Visual Accepted | Hoje base accepted operational baseline; see `current-implementation-baseline.md` and `tmp/visual-audit/batch11/today-17-visual-acceptance-20260707` | CrmProductShell, Sidebar, Topbar, GlobalActions, DashboardGrid, CrmOperationalPanel, CrmOperationalRows, CrmOperationalRow, Button, Chip |
| `18_round-4.1A_hoje_02_drawer-tarefa.png.png` | Covered / 99% Visual Accepted | Hoje selected task accepted operational baseline; see `current-implementation-baseline.md` and `tmp/visual-audit/batch11/today-18-visual-acceptance-20260707` | CrmProductShell, Sidebar, Topbar, DashboardGrid, CrmOperationalPanel, CrmOperationalRows, CrmOperationalRow, TaskDrawer, Button, Chip |
| `19_round-4.1A_hoje_03_estado-critico-do-dia.png` | Covered | Hoje critical | Status semantic tokens, ErrorState, StatusCard, Chip, PlanBlockedState, PermissionState |
| `20_round-4.1A_hoje_04_historico-de-hoje.png.png` | Covered / 99% Visual Accepted | Hoje history accepted as continuation of the Hoje page; 99% evidence in `tmp/visual-audit/batch11/today-20-visual-acceptance-20260707`; see `current-implementation-baseline.md` | CrmProductShell, ActivityFeed, Button, IconButton, Chip |
| `21_round-4.1B_operacao_01_kanban-geral.png.png` | Covered | Operacao board | CrmProductShell, Sidebar, Topbar, PageHeader, GlobalActions, FilterBar, SearchInput, Button, IconButton, KanbanBoard, KanbanColumn, KanbanCard, OperationActivityTable, Chip |
| `22_round-4.1B_operacao_02_kanban-com-drawer.png` | Covered | Operacao drawer | CrmProductShell, Sidebar, Topbar, PageHeader, GlobalActions, FilterBar, SearchInput, Button, IconButton, KanbanBoard, KanbanColumn, KanbanCard, OperationActivityTable, CaseDrawer, Chip |
| `23_round-4.1C_tarefas_01_lista-detalhe.png.png` | Covered | Tarefas | DataTable, FilterBar, TaskDrawer, ChecklistRow, CommentThread, ActivityFeed |
| `24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png` | Covered | Checklists | DataTable, ListDetailLayout, SettingsSection, ChecklistRow, ChecklistTable, ChecklistDrawer |
| `24_round-4.1D_inbox_01_conversa-aberta.png.png` | Covered | Inbox | ThreePaneLayout, ConversationList, ConversationThread, ContextPanel, Composer, AgentPanel |
| `25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png` | Covered | Aprovacoes | DataTable, List, ApprovalPanel, ApprovalDrawer, ImpactSummary, BeforeAfterDiff, DrawerFooter |
| `26_round-4.1F_agenda_01_calendario-operacional.png.png` | Covered | Agenda | WeeklyCalendar, MiniCalendar, ClassCard, ClassDrawer |
| `27_round-4.1E_alunos_01_lista-perfil-resumido.png.png` | Covered | Alunos list | DataTable, List, FilterBar, StudentDrawer, StudentSummary |
| `28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png` | Covered | Aluno profile | StudentHeader, ProfileTabs, StudentSummary, ActivityFeed, RelationshipList |
| `29_round-4.1F_aula_01_detalhe-com-chamada.png.png` | Covered | Aula/Chamada | ClassDrawer, Roster, Chip, ActivityFeed |
| `30_round-4.1F_financeiro_01_visao-geral-filas.png.png` | Covered | Financeiro overview | DashboardGrid, MetricCard, PaymentCaseCard, DataTable, PaymentDrawer |
| `31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png` | Covered | Reposicoes | DataTable, List, ReplacementDrawer, ClassCard, FilterBar |
| `32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png` | Covered | Financeiro drawer | PaymentDrawer, ImpactSummary, CopilotSuggestion, ActivityFeed |
| `33_round-4.1F_financeiro_03_kanban-financeiro.png.png` | Covered | Financeiro kanban | KanbanBoard, FinanceKanbanCard, KanbanColumn |
| `34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png` | Covered | Movimentacoes | DataTable, ReconciliationRow, FilterBar, TablePagination |
| `35_round-4.1F_turmas_01_lista-detalhe.png.png` | Covered | Turmas | DataTable, List, ClassCard, StudentSummary, ClassDrawer |
| `36_round-4.1F_grade_01_semana-modelo-bloqueio.png.png` | Covered | Grade | WeeklyCalendar, ClassCard, ConfigImpactPreview |
| `37_round-4.1G_vendas_01_pipeline-kanban.png.png` | Covered | Vendas pipeline | KanbanBoard, PipelineCard, LeadDrawer |
| `38_round-4.1G_vendas_02_lista-interessados.png.png` | Covered | Interessados | DataTable, List, LeadSummary, LeadDrawer, Button, ActionMenu |
| `39_round-4.1G_experimental_01_lista-acompanhamento.png.png` | Covered | Experimentais | DataTable, List, TrialClassCard, ClassCard |
| `40_round-4.1G_matriculas_01_checklist-conversao.png.png` | Covered | Matriculas | EnrollmentChecklist, DataTable, LeadSummary, ApprovalPanel |
| `41_round-4.1H_retencao_01_riscos-lista-drawer.png.png` | Covered | Riscos | DataTable, List, RiskCard, CaseDrawer |
| `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png` | Covered | Cancelamentos | CancellationCase, CaseDrawer, SensitiveActionDialog |
| `43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png` | Covered | Reativacoes | RiskCard, ReactivationCard, LeadSummary, CaseDrawer |
| `44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png` | Covered | Reclamacoes | ComplaintPanel, CaseDrawer, HandoffBanner, SensitiveActionDialog |
| `45_round-4.1I_relatorios_01_visao-gestao.png.png` | Covered | Relatorios | ChartPanel, ReportFilterBar, MetricCard, ExportAction |
| `46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png` | Covered | Dinheiro na Mesa | CrmDashboardPage, PageFilterBar, OpportunityGroupCard, OpportunityPanel, ExportAction |
| `47_round-4.1J_suporte_01_central-studio-taliya.png.png` | Covered | Suporte | SupportTicketPanel, GrantAccessPanel, AgentPanel, StatusCard |

## Internal Backoffice

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `48_round-4.1K_internal_01_visao-operacional.png.png` | Covered | internal dashboard | CrmProductShell, InternalOverviewDashboard, DashboardGrid, MetricCard, TenantCard |
| `49_round-4.1K_internal_02_tenants-lista-detalhe.png` | Covered | tenants list/detail | CrmProductShell, DataTable, TenantCard, GrantAccessPanel, TenantSecurityDrawer |
| `50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png` | Covered | tenant detail | CrmProductShell, TenantDetailLayout, SecurityRulePanel, AuditTrail |

## Onboarding / Setup

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `51A_round-4.1J_onboarding_shell-global-aprovado.png` | Covered | setup shell | SetupShell, SetupStepper, SetupBottomBar, AgentPanel, Panel |
| `51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png` | Covered | setup agent chat | SetupAgentChat, TaliyaLogo, IconButton, MessageBubble, QuickReplyChips |
| `51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png` | Covered | setup workspace | SetupShell, SetupChoiceCard, FieldGroup, ConfigImpactPreview, AgentPanel |
| `51D_round-4.1J_onboarding_bloco-1-studio-aprovado.png` | Superseded | old studio block | replaced by v2; keep as context |
| `51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png` | Covered | Studio block | SetupShell, SetupBlockHeader, FieldGroup, WeeklyHoursGrid, ConfigImpactPreview |
| `51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png` | Covered | Equipe block | SetupShell, DataTable, List, RoleCard, InviteRow, AgentPanel |
| `51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png` | Covered | Canais block | IntegrationStatusRow, SetupChoiceCard, ChannelStatus, AgentPanel |
| `51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png` | Covered | Planos block | SetupChoiceCard, PlanSummaryCard, RuleRow, AgentPanel |
| `51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png` | Covered | Pagamento block | SetupChoiceCard, IntegrationStatusRow, PaymentMethodRow, AgentPanel |
| `51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png` | Covered with 9-block reinterpretation | Alunos block | SetupImportSourceCard, ImportProgress, DataTable, DuplicateResolver |
| `51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png` | Covered with 9-block reinterpretation | Turmas block | DataTable, List, ClassCard, FieldGroup, AgentPanel |
| `51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png` | Covered with 9-block reinterpretation | Agenda block | WeeklyCalendar, ClassCard, SetupBottomBar, AgentPanel |
| `51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png` | Covered | Revisao block | SetupReviewPanel, StatusCard, SetupBottomBar, AgentPanel |
| `78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png` | Covered | setup welcome | SetupWelcome, Input, Button, SetupAgentChat, SetupHumanHelpCTA |

## Agents / Flows / Executions

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png` | Covered | agents catalog | AgentCatalog, AgentCard, CrmProductShell, Topbar |
| `53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png` | Covered | agent detail | AgentCard, DataTable, List, Card, StatusCard, AgentStatus |
| `54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png` | Covered | routine detail | ModeSelector, ModeCard, FlowStepCard, AgentPanel |
| `55_round-4.1L_agentes_04_fluxo-falta-com-aviso-aprovado.png` | Superseded | old flow detail | replaced by 56 |
| `56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png` | Covered | flow detail v2 | FlowBuilder, FlowStepCard, ModeSelector, PreflightChecklist, FieldGroup |
| `58_round-4.1L_agentes_05_teste-fluxo-falta-com-aviso-aprovado.png` | Covered | simulate flow | ScenarioList, PhonePreview, ExecutionTimeline, AgentPanel |
| `59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png` | Covered | publish routine | PreflightChecklist, FlowStepCard, StatusCard, AgentPanel |
| `70_round-4.1P_execucoes_01_fluxo-falta-com-aviso-aprovado.png` | Covered | execution receipt | ExecutionReceipt, ExecutionTimeline, FlowStepCard, AgentPanel |

## Config / Billing / Usage

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png` | Covered | config hub | SettingsHubCard, DashboardGrid, CrmProductShell |
| `61_round-4.1M_configuracoes_02_permissoes-aprovado.png` | Covered | permissions config | PermissionMatrix, SettingsSection, ImpactSummary, ConfigImpactPreview, AgentPanel |
| `62_round-4.1M_configuracoes_03_pagamentos-financeiro-aprovado.png` | Covered | payments config | SettingsSection, IntegrationStatusRow, RuleRow, ConfigImpactPreview |
| `63_round-4.1M_configuracoes_04_agenda-aprovado.png` | Covered | agenda config | SettingsSection, RuleRow, WeeklyCalendar, ConfigImpactPreview |
| `64_round-4.1M_configuracoes_05_notificacoes-aprovado.png` | Covered | notification config | SettingsSection, RuleRow, Toggle, ChannelStatus |
| `65_round-4.1N_billing_01_assinatura-taliya-aprovado.png` | Covered | billing active | PlanSummaryCard, QuotaProgress, AddOnCard, AgentPanel |
| `66_round-4.1N_billing_02_faturas-taliya-aprovado.png` | Covered | invoices | InvoiceTable, PlanSummaryCard, AgentPanel |
| `67_round-4.1N_billing_03_add-ons-taliya-aprovado.png` | Covered | add-ons | AddOnCard, EmptyState, AgentPanel |
| `68_round-4.1O_uso_01_visao-geral-aprovado.png` | Covered | usage overview | QuotaProgress, UsageOriginRow, StatusCard, AgentPanel |
| `69_round-4.1O_uso_02_extrato-aprovado.png` | Covered | usage ledger | UsageLedgerTable, FilterBar, TablePagination, AgentPanel |

## Access / Subscription

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png` | Covered/Certified | exact access shell crop `tmp/visual-audit/batch9/access-shell-sources/image71-access-shell-window-candidate1.png`; shell evidence `tmp/visual-audit/batch9/access-shell-iteration6`; footer row crop `tmp/visual-audit/batch9/access-footer-links-sources/image71-access-footer-links-shell-candidate1.png`; footer evidence `tmp/visual-audit/batch9/access-footer-links-iteration5` | AccessShell, ProductWindowFrame, CrmBrowserChrome, TaliyaLogo, IconButton, AccessFooterLinks |
| `72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png` | Covered / 99% Visual Accepted | exact signup card crop certified in `tmp/visual-audit/batch9/auth-card-sources/image72-auth-card-signup-candidate1.png`; final component evidence `tmp/visual-audit/batch9/auth-card-iteration5`; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | AccessShell, AuthCard, SocialAuthButton, Input, Button, AccessFooterLinks |
| `73_round-4.1Q_acesso-assinatura_signin-entrar-salvo-ajustes.png` | Covered / 99% Visual Accepted | exact signin card crop certified in `tmp/visual-audit/batch9/auth-card-sources/image73-auth-card-signin-candidate1.png`; final component evidence `tmp/visual-audit/batch9/auth-card-iteration5`; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | AccessShell, AuthCard, SocialAuthButton, PasswordInput, Checkbox |
| `74_round-4.1Q_acesso-assinatura_revisar-assinatura-aprovado.png` | Covered / 99% Visual Accepted | review subscription; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | AccessShell, CheckoutReviewPanel, CheckoutPaymentCard, PlanSummaryCard, SecurePaymentNotice |
| `75_round-4.1Q_acesso-assinatura_aguardando-confirmacao-aprovado.png` | Covered / 99% Visual Accepted | pending confirmation; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | SubscriptionStatusCard, SubscriptionProgressStepper, SecurePaymentNotice |
| `76_round-4.1Q_acesso-assinatura_resolver-assinatura-aprovado.png` | Covered / 99% Visual Accepted | failed confirmation; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | SubscriptionResolutionPanel, ErrorState, SecurePaymentNotice |
| `77_round-4.1Q_acesso-assinatura_assinatura-confirmada-setup-guiado-aprovado.png` | Covered / 99% Visual Accepted | confirmed handoff; full-image 99% evidence in `tmp/visual-audit/batch11/access-subscription-99-visual-acceptance-20260707` | ConfirmedSetupHandoff, SubscriptionStatusCard, PlanSummaryCard |

## Empty Shell

| Image | Status | Role | Required Components |
| --- | --- | --- | --- |
| `79_round-4.1S_app-shell_01_base-web-sem-conteudo.png` | Covered | empty app shell | ProductWindowFrame, CrmProductShell, Sidebar, Topbar, PageHeader, EmptyState |

## Coverage Result

Approved implementation targets are covered by the component matrix after v1.0 expansion. These rows are not inspiration references; they are 1:1 clone sources for future component implementation.

Images intentionally not implemented:

- duplicate: 02;
- rejected: 03;
- historical/context: 04, 05, crm_1 reference;
- superseded: old 51D, 55.

Known visual-adjustment targets:

- 17, 18, and 20 are accepted as the current operational baseline for shell/sidebar/topbar/dashboard/drawer/history behavior. Images 17 and 18 are accepted as 99% visual baselines; none of these require pixel-perfect 1:1 unless product review reopens them.
- 72 and 73 are covered structurally but require final visual polish during implementation.
- 51H/51I/51J are covered structurally and must be implemented with the official 9-block numbering, not old image numbering.

