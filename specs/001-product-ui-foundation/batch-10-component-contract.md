# Batch 10 Component Contract - P2 Domain Components

Status: fechado em 2026-06-01. Nenhum componente deste batch foi aprovado sem story isolado, comportamento real, validacao tecnica e comparacao visual 1:1 no Storybook contra as imagens aprovadas.

Goal: transformar os componentes P2 de dominio em componentes oficiais de `@taliya/crm`, prop-driven, visuais, sem backend/API/auth/billing/agent execution, compondo primitives P0/P1 de `@taliya/ui` e consumindo tokens antes de CSS de anatomia.

Approved source images opened for this pass:

- `13_round-3c1_objetos-setup-dados_aprovada.png`
- `15_round-3c3_agentes-auditoria-relatorios_aprovada.png`
- `19_round-4.1A_hoje_03_estado-critico-do-dia.png`
- `27_round-4.1E_alunos_01_lista-perfil-resumido.png.png`
- `28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png`
- `30_round-4.1F_financeiro_01_visao-geral-filas.png.png`
- `33_round-4.1F_financeiro_03_kanban-financeiro.png.png`
- `34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png`
- `37_round-4.1G_vendas_01_pipeline-kanban.png.png`
- `38_round-4.1G_vendas_02_lista-interessados.png.png`
- `39_round-4.1G_experimental_01_lista-acompanhamento.png.png`
- `40_round-4.1G_matriculas_01_checklist-conversao.png.png`
- `41_round-4.1H_retencao_01_riscos-lista-drawer.png.png`
- `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png`
- `43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png`
- `44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png`
- `45_round-4.1I_relatorios_01_visao-gestao.png.png`
- `46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png`
- `47_round-4.1J_suporte_01_central-studio-taliya.png.png`
- `48_round-4.1K_internal_01_visao-operacional.png.png`
- `49_round-4.1K_internal_02_tenants-lista-detalhe.png`
- `50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png`
- `52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png`
- `54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png`
- `56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png`
- `58_round-4.1L_agentes_05_teste-fluxo-falta-com-aviso-aprovado.png`
- `59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png`
- `62_round-4.1M_configuracoes_03_pagamentos-financeiro-aprovado.png`
- `68_round-4.1O_uso_01_visao-geral-aprovado.png`
- `70_round-4.1P_execucoes_01_fluxo-falta-com-aviso-aprovado.png`

## Batch 10 Non-Negotiables

- Components are official `@taliya/crm` domain compositions, not screenshots or page mocks.
- Each component has its own isolated Storybook story under `CRM / Batch 10 / [Component] / All States`.
- Parent compositions such as `SimulationRunner`, `ExecutionReceipt`, `InternalOverviewDashboard` inside `CrmProductShell`, and `TenantDetailLayout` must compose smaller official components.
- No component may fetch, mutate, route, bill, authenticate, execute an agent, or decide business logic.
- Every interactive affordance visible as a button/menu/row must be a real interactive control with callback props.
- Any repeatable dimension, grid, card/icon size, row height, phone preview size, or catalog layout must be represented in `@taliya/tokens` before component CSS is accepted.

## Component Contracts

| Component | Primary source | Exact extraction target | Required anatomy | Variants/states | Required behavior | Reuse contract | Storybook path |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `AgentCatalog` | Image 52 | agent catalog grid/list, empty entitlement layout | 3-column grid, 7 cards, empty state | 0, 1, 3, 7 agents | card open callback, empty action | composes `AgentCard`, `Panel`, `EmptyState` | `CRM / Batch 10 / AgentCatalog / All States` |
| `AgentCard` | Image 52 | one agent summary card | circular icon, title, description, routine/flow meta, status chip, CTA | active, draft/not contracted, paused, attention, blocked, selected | CTA calls `onOpen`; blocked disables CTA | composes `Card`, `Icon`, `Chip`, `Button`, `InlineGroup` | `CRM / Batch 10 / AgentCard / All States` |
| `ModeSelector` | Images 54, 56 | row of agent behavior options | mode card group, selected ring, locked state, recommended chip | manual, copiloto, autonomo, approval, exceptions | selecting a mode calls `onChange`; locked disabled | composes `ModeCard` | `CRM / Batch 10 / ModeSelector / All States` |
| `ModeCard` | Images 54, 56 | individual mode choice card | icon circle, title, description, recommended chip, filled selected check | selected, locked, recommended, disabled | button semantics, `aria-pressed`, focus-visible | composes `Icon`, `Chip`; uses official mode glyphs `hand`, `bot`, `shield`, `scale`, `rocket`, `lock` | `CRM / Batch 10 / ModeCard / All States` |
| `FlowBuilder` | Image 56 | start/middle/end flow lane | horizontal flow, flow step cards, connector lines | start, middle, end, blocked | step open/menu callbacks | composes `FlowStepCard`, `ConnectorLine` | `CRM / Batch 10 / FlowBuilder / All States` |
| `FlowStepCard` | Images 56, 59, 70 | one flow explanation step | node/card with title, description, status, menu, status sections | start, middle, end, exception, blocked | open/menu callbacks, keyboard enter/space when interactive | composes `Icon`, `Chip`, `IconButton`; intentionally does not use `FlowNode` because the approved flow panel uses divider-backed text columns, not node ports | `CRM / Batch 10 / FlowStepCard / All States` |
| `PreflightChecklist` | Image 59 | publication gate checklist | horizontal status row, labels, dividers, action/blocked states | complete, incomplete, warning, blocked | checkbox semantics, item action and toggle callbacks | composes `Panel`; checklist items are semantic checkbox buttons matching the source horizontal publication gate | `CRM / Batch 10 / PreflightChecklist / All States` |
| `ScenarioList` | Image 58 | simulation scenario list | selectable scenario cards, selected filled check, chevron cue | selected, blocked, passed, failed | row button click calls `onSelect`; `aria-current` marks selected row | composes `Panel`, `Icon`; rows are real buttons | `CRM / Batch 10 / ScenarioList / All States` |
| `PhonePreview` | Image 58 | phone/channel conversation preview | phone frame, status bar, notch, header, bubbles, receipt card, disabled composer | conversation, loading, blocked | icon controls are buttons; disabled composer remains semantic | composes `Avatar`, `IconButton`, `MessageBubble`, `Card`, `LoadingState`, `InlineAlert` | `CRM / Batch 10 / PhonePreview / All States` |
| `ExecutionTimeline` | Images 58, 70 | execution trace/timeline list | execution rows in sequence | running, success, exception, failed | open/retry callbacks | composes `ExecutionRow` | `CRM / Batch 10 / ExecutionTimeline / All States` |
| `SimulationRunner` | Image 58 | full test panel | header, scenario list, phone preview, execution timeline, run CTA | running, success, blocked | run and scenario callbacks | composes `ScenarioList`, `PhonePreview`, `ExecutionTimeline` | `CRM / Batch 10 / SimulationRunner / All States` |
| `ExecutionReceipt` | Image 70 | execution summary/receipt | summary facts, alert, timeline, next actions | success, exception, failed | action callbacks | composes `DomainFactList`, `ExecutionTimeline`, `DomainActions` | `CRM / Batch 10 / ExecutionReceipt / All States` |
| `StudentHeader` | Image 28 | student identity header | avatar, name, status/tags, contact meta, actions | active, risk, sensitive | action callbacks | composes `Avatar`, `Chip`, `DomainActions` | `CRM / Batch 10 / StudentHeader / All States` |
| `StudentSummary` | Images 27, 28 | operational summary block | metric tiles, agenda/finance rows | agenda, financeiro, tarefas | row action callbacks | composes `MetricTile`, `Panel`, `List` | `CRM / Batch 10 / StudentSummary / All States` |
| `RelationshipList` | Image 13 | relationships/family card row | three relationship cards, selected/conflict states | responsible, family, contact | future item select/action callbacks | composes `RelationshipCard` | `CRM / Batch 10 / RelationshipList / All States` |
| `FinancePriorityPanel` | Image 30 | finance priority strip | panel title, icon tile, title, amount, meta, chevron | source, selected, empty, loading, blocked | row select callback | composes `Panel`, `PanelHeader`, `Icon`, `EmptyState`; row root is native source-derived compound button | `CRM / Finance / FinancePriorityPanel / All States` |
| `PaymentCaseCard` | Image 30 | finance queue card | payer, amount, due/meta, status chip, action/menu | overdue, promise, paid, failed | open/menu callbacks | composes `Card`, `IconButton`, `Chip`, `Button` | `CRM / Batch 10 / PaymentCaseCard / All States` |
| `FinanceKanbanCard` | Image 33 | finance kanban card | amount/meta/status card inside column | stage variants | select/menu callbacks | composes `KanbanCard` | `CRM / Batch 10 / FinanceKanbanCard / All States` |
| `ReconciliationRow` | Image 34 | movement reconciliation row | leading status icon, title, expected/received, action | matched, ambiguous, dispute | action callback | composes `ListItem`, `Icon`, `Button` | `CRM / Batch 10 / ReconciliationRow / All States` |
| `PipelineCard` | Image 37 | exact 239x139 `Ana Souza` pipeline card crop | lead, channel/source, interest, next action, owner, status chip, optional menu | lead, trial, enrollment, lost, selected, optional menu | select/menu callbacks | composes `Card`, `Icon`, `Chip`, `IconButton`; does not reuse generic `KanbanCard` because the approved sales card is 239x139 and denser | `CRM / Batch 10 / PipelineCard / All States` |
| `LeadSummary` | Image 38 | exact 835x66 selected lead row crop | avatar, name, stage chip, next action, desired time, owner, last conversation, status chip, action menu | hot, no response, trial, enrolled, selected/unselected | open callback on real icon button | composes `Avatar`, `Chip`, `IconButton`; row uses tokenized grid columns | `CRM / Batch 10 / LeadSummary / All States` |
| `TrialClassCard` | Image 39 | exact 832x70 selected experimental row crop | avatar, name, class, time, status chip, source icon, owner, last conversation, action chip, dots cue | scheduled, attended, no-show, converted | root row button calls select callback; keyboard focus works | composes `Avatar`, `Icon`, `Chip`; row uses tokenized grid columns | `CRM / Batch 10 / TrialClassCard / All States` |
| `EnrollmentChecklist` | Image 40 | exact 292x152 drawer checklist crop | header/count, vertical checklist line, five semantic item buttons, complete/pending marks | mixed, incomplete, ready, blocked | row action callback per item | composes `List`, `Icon`, semantic button rows; does not reuse generic `ChecklistItem` because the approved drawer checklist has no visible action column | `CRM / Batch 10 / EnrollmentChecklist / All States` |
| `RiskCard` | Image 41 | retention risk card/row | avatar, risk reason, status chip, next action | low, medium, high | open callback | composes `Card`, `Avatar`, `Chip`, `Button` | `CRM / Batch 10 / RiskCard / All States` |
| `CancellationCase` | Image 42 | cancellation sensitive case panel | facts, warning, action cluster | open, saving, cancelled | action callbacks | composes `CrmSurface`, `DomainFactList`, `InlineAlert`, `DomainActions` | `CRM / Batch 10 / CancellationCase / All States` |
| `ReactivationCard` | Image 43 | reactivation opportunity card/panel | title, opportunity, suggestion, actions | candidate, contacted, reactivated, lost | action callbacks | composes `CrmSurface`, `CopilotSuggestion`, `DomainActions` | `CRM / Batch 10 / ReactivationCard / All States` |
| `ComplaintPanel` | Image 44 | complaint sensitive panel | warning, resolution list, actions | severe, waiting, resolved | action callbacks | composes `CrmSurface`, `InlineAlert`, `List`, `DomainActions` | `CRM / Batch 10 / ComplaintPanel / All States` |
| `SensitiveActionDialog` | Images 42, 44, 09 | sensitive confirmation dialog | title, description, destructive confirm/cancel | destructive, confirmation, blocked | confirm/cancel callbacks from `ConfirmDialog` | composes `ConfirmDialog` | `CRM / Batch 10 / SensitiveActionDialog / All States` |
| `SupportTicketPanel` | Image 47 | exact 390x759 selected support ticket drawer crop | facts, agent summary, ticket conversation, temporary access block, six real actions | open, answered, access active/internal | action callbacks, close callback | composes `Chip`, `Icon`, `IconButton`, `Button`; internal variant reused by `CrmProductShell` internal compositions | `CRM / Batch 10 / SupportTicketPanel / All States` |
| `GrantAccessPanel` | Image 50 | exact 340x175 `5. Grants de acesso` card crop | grant header/action, scoped grant row, expiry/approver rows, audit notice | grant, revoke, expired | view grant callback | composes `Panel`, `Button`, `Chip`, `Icon` | `CRM / Batch 10 / GrantAccessPanel / All States` |
| `TenantCard` | Image 49 | exact 955x60 selected tenant row crop | checkbox, initials avatar, tenant, status, plan, agents, quota progress, tickets, grant/billing chips, owner/activity | active, security, warning | checkbox semantics, open callback | composes `Chip`, `ProgressBar`; uses real checkbox and row action button | `CRM / Batch 10 / TenantCard / All States` |
| `InternalOverviewDashboard` | Image 48 | exact 1080x754 internal dashboard content crop | page header, action buttons, search/filter bar, six operational cards, activity/copiloto panels | dashboard | no route logic | composes `PageHeader`, `FilterBar`, `Input`, `Button`, `Panel`, `Chip`, `Icon`; rendered inside `CrmProductShell variant="internal"` for shell coverage | `CRM / Internal / InternalOverviewDashboard / All States` |
| `TenantDetailLayout` | Image 50 | exact 1432x840 tenant detail plus security rail composition | tenant header/actions, summary strip, tabbed card grid, grant card, security rail | overview, security, billing, support | no route logic | composes `Tabs`, `Panel`, `MetricTile`, `GrantAccessPanel`, `SecurityRulePanel` | `CRM / Batch 10 / TenantDetailLayout / All States` |
| `SecurityRulePanel` | Image 50 | exact 346x838 `Segurança do tenant` right rail crop | title/close, grant chip, fact list, warning/info alerts, copiloto block, five action buttons | allowed, denied, warning | action callbacks, blocked primary when denied | composes `Chip`, `Icon`, `IconButton`, `Button` | `CRM / Batch 10 / SecurityRulePanel / All States` |
| `ChartPanel` | Image 45 | exact 493x222 `Dinheiro em aberto` report card crop | alert icon, title, origin/period meta, red amount, three metric pills, impact row, footer CTA | ready/source, loading, empty | open callback from real footer button | composes `Panel`, `Icon`; loading/empty reuse `ChartPanelPrimitive` without changing ready-source anatomy | `CRM / Batch 10 / ChartPanel / All States` |
| `ReportFilterBar` | Image 45 | exact 795x49 report filter bar crop | six pill controls: Hoje, Esta semana, Este mês, Unidade select, Responsável select, Mais filtros with trailing filter icon | period, area, exportable callback contract | filter/select controls are real buttons/selects; export callback preserved without polluting source crop | composes `FilterBar`, `Button`, `Select`, `ExportAction` behavior | `CRM / Batch 10 / ReportFilterBar / All States` |
| `OpportunityPanel` | Image 46 | exact 368x817 selected opportunity drawer crop | selected badge, close action, title/subtitle, fact grid, history timeline, suggestion/notice/manual panels, seven action buttons | open/source, assigned, resolved | close and action callbacks; task action returns `task` | composes `Chip`, `Icon`, `IconButton`, `Button` with official tokens | `CRM / Batch 10 / OpportunityPanel / All States` |
| `ImportProgress` | Image 13 | exact 646x254 `Progresso de importação` panel crop | numbered header, main import progress card, metrics, pause/details buttons, four status summary cards | running/source, mapped, conflict, error, paused | pause/details/resume/retry callbacks | composes `Panel`, `ImportProgressCard`, `Button`, `ProgressBar`, `Chip` behavior with CRM tokens | `CRM / Batch 10 / ImportProgress / All States` |
| `FieldMappingTable` | Image 13 | exact 453x263 `Mapeamento de campos` panel crop | numbered header, column labels, five mapping rows, real target selects, status icons, row actions, add/footer count | mapped, missing, invalid | row click, field change, row action, add callbacks | composes `Panel`, `DataTable`, `Select`, `Button`, `Icon` with CRM tokens | `CRM / Batch 10 / FieldMappingTable / All States` |
| `DuplicateResolver` | Image 13 | exact 502x263 `Resolução de duplicidade` panel crop | numbered header, primary record radios, two candidate cards, comparison markers, action rail, legend | candidates/source, merge, keep separate | radio/action callbacks, merge/separate buttons | composes `Panel`, `Card`, `Avatar`, `Chip`, `Button`, `StatusDot`, `Icon` with CRM tokens | `CRM / Batch 10 / DuplicateResolver / All States` |
| `PermissionState` | Image 12 | exact 357x211 `Permissoes e acesso` panel crop | numbered header, four permission rows, allowed/blocked/request status chips, request button, footer link | request access/source, read-only | request access and footer callbacks | composes `Panel`, `Chip`, `Button`, `Icon` with CRM tokens | `CRM / Batch 10 / PermissionState / All States` |
| `PlanBlockedState` | Image 67 | exact 269x344 `Mais agentes` add-on blocked card crop | icon/title row, plan-maximum chip, blocked copy, support CTA | upgrade/source, manual continues | support/manual action callback | composes `Card`, `Chip`, `Button`, `Icon` with CRM tokens | `CRM / Batch 10 / PlanBlockedState / All States` |
| `QuotaBlockedState` | Image 68 | exact 423x437 `Alertas e economia` + `O que foi afetado` stack crop | two quota panels, threshold rows, manual-continuity copy, affected rows, CTA | 70/source, 90, 100 | flow CTA callback | composes `Panel`, `Button`, `Icon` with CRM tokens | `CRM / Batch 10 / QuotaBlockedState / All States` |
| `IntegrationFailedState` | Image 12 | exact 363x211 `Integracoes` panel crop | connected Stripe row, failed Twilio row, status chips, reconnect button, row menus, footer link | retry/source, fallback, support | retry/fallback/support/menu/footer callbacks | composes `Panel`, `Chip`, `Button`, `IconButton`, `Icon` with CRM tokens | `CRM / Batch 10 / IntegrationFailedState / All States` |

## Token Extraction Applied

- `layout.crm-agent-catalog.columns`
- `layout.crm-domain-metrics.columns`
- `layout.crm-domain-facts.columns`
- `layout.crm-simulation-runner.columns`
- `layout.crm-relationship-list.columns`
- `control.crm-agent-card.*`
- `control.crm-mode-card.min-height`
- `control.crm-mode-card.check-size`
- `control.crm-phone-preview.*`
- `control.crm-preflight-checklist.*`
- `control.crm-scenario-card.action-size`
- `control.crm-execution-receipt.timeline-row-height`
- `control.crm-domain-row.min-height`
- `control.crm-student-header.*`
- `control.crm-student-summary.*`
- `control.crm-relationship-panel.*`
- `control.crm-relationship-connector-line-*`
- `control.relationship-card.*`
- `color.crm-relationship-marker.*`
- `layout.crm-payment-case-card.width`
- `layout.crm-payment-case-card.row-columns`
- `layout.crm-finance-kanban-card.width`
- `layout.crm-reconciliation-row.width`
- `layout.crm-reconciliation-row.columns`
- `control.crm-payment-case-card.*`
- `control.crm-finance-kanban-card.*`
- `control.crm-reconciliation-row.*`
- `status.finance.today.*`
- `status.finance.validation.*`
- `status.finance.exception.bg`
- `color.crm-finance.payment-method-pix`
- `layout.crm-pipeline-card.width`
- `layout.crm-lead-summary-row.width`
- `layout.crm-lead-summary-row.columns`
- `layout.crm-trial-class-row.width`
- `layout.crm-trial-class-row.columns`
- `layout.crm-enrollment-checklist.width`
- `control.crm-pipeline-card.*`
- `control.crm-commercial-row.*`
- `control.crm-enrollment-checklist.*`
- `status.sales.*`
- `color.crm-sales.*`
- `layout.crm-support-ticket-panel.*`
- `layout.crm-internal-ticket-panel.*`
- `layout.crm-grant-access-panel.width`
- `layout.crm-tenant-row.*`
- `layout.crm-internal-shell.*`
- `layout.crm-tenant-detail-layout.*`
- `layout.crm-security-rule-panel.width`
- `control.crm-support-ticket-panel.*`
- `control.crm-internal-ticket-panel.height`
- `control.crm-grant-access-panel.*`
- `control.crm-tenant-row.*`
- `control.crm-internal-shell.*`
- `control.crm-tenant-detail-layout.height`
- `control.crm-security-rule-panel.*`
- `status.support.*`
- `status.internal.*`
- `color.crm-support.*`
- `color.crm-internal.*`
- `layout.crm-report-filter-bar.width`
- `layout.crm-report-card.width`
- `layout.crm-report-card.stat-columns`
- `layout.crm-opportunity-drawer.width`
- `layout.crm-opportunity-drawer.fact-columns`
- `layout.crm-opportunity-drawer.action-columns`
- `control.crm-report-filter-bar.*`
- `control.crm-report-card.*`
- `control.crm-opportunity-drawer.*`
- `status.opportunity.*`
- `color.crm-reports.*`
- `color.crm-opportunity.*`
- `layout.crm-import-progress-panel.width`
- `layout.crm-import-progress-panel.columns`
- `layout.crm-field-mapping-panel.width`
- `layout.crm-field-mapping-panel.row-columns`
- `layout.crm-duplicate-resolver.width`
- `layout.crm-duplicate-resolver.columns`
- `control.crm-import-progress-panel.*`
- `control.crm-field-mapping-panel.*`
- `control.crm-duplicate-resolver.*`
- `layout.crm-permission-state-panel.*`
- `layout.crm-integration-failed-panel.*`
- `layout.crm-plan-blocked-state.width`
- `layout.crm-quota-blocked-state.width`
- `control.crm-permission-state-panel.*`
- `control.crm-integration-failed-panel.*`
- `control.crm-plan-blocked-state.*`
- `control.crm-quota-blocked-state.*`

## Acceptance Matrix

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AgentCatalog | pass | pass | pass | pass | pass | pass - Image 52 crop compared | pass - Image 52 | approved for Image 52 |
| AgentCard | pass | pass | pass | pass | pass | pass - Image 52 compared | pass - Image 52 | approved for Image 52 |
| ModeSelector | pass | pass | pass | pass | pass | pass - Images 54/56 compared, evidence iteration9 | pass - Images 54/56 mode rows | approved for Images 54/56 |
| ModeCard | pass | pass | pass | pass | pass | pass - Images 54/56 compared, evidence iteration9 | pass - Images 54/56 mode card states | approved for Images 54/56 |
| FlowBuilder | pass | pass | pass | pass | pass | pass - Image 56 compared, evidence iteration6 | pass - Image 56 flow lane | approved for Image 56 |
| FlowStepCard | pass | pass | pass | pass | pass | pass - Images 56/59/70 compared, evidence iteration6 | pass - flow step anatomy | approved for Images 56/59/70 |
| PreflightChecklist | pass | pass | pass | pass | pass | pass - Image 59 compared, evidence iteration6 | pass - Image 59 publication gate | approved for Image 59 |
| ScenarioList | pass | pass | pass | pass | pass | pass - Image 58 compared, evidence iteration6 | pass - Image 58 scenario panel | approved for Image 58 |
| PhonePreview | pass | pass | pass | pass | pass | pass - Image 58 compared, evidence iteration6 | pass - Image 58 phone preview | approved for Image 58 |
| ExecutionTimeline | pass | pass | pass | pass | pass | pass - Images 58/70 compared, evidence iteration6 | pass - execution timeline rows | approved for Images 58/70 |
| SimulationRunner | pass | pass | pass | pass | pass | pass - Image 58 compared, evidence iteration6 | pass - Image 58 test composition | approved for Image 58 |
| ExecutionReceipt | pass | pass | pass | pass | pass | pass - Image 70 compared, evidence iteration6 | pass - Image 70 receipt composition | approved for Image 70 |
| StudentHeader | pass | pass | pass | pass | pass | pass - Image 28 crop compared, evidence `student-relationship-final-v3` | pass - Image 28 header | approved for Image 28 |
| StudentSummary | pass | pass | pass | pass | pass | pass - Image 28 crop compared, evidence `student-relationship-final-v3` | pass - Image 28 operational summary | approved for Image 28 |
| RelationshipList | pass | pass | pass | pass | pass | pass - Image 13 crop compared, evidence `student-relationship-final-v3` | pass - Image 13 relationship panel | approved for Image 13 |
| PaymentCaseCard | pass | pass | pass | pass | pass | pass - Image 30 queue card crop compared, evidence `finance-final-20260531` | pass - Image 30 `A vencer` finance card | approved for Image 30 |
| FinanceKanbanCard | pass | pass | pass | pass | pass | pass - Image 33 kanban card crop compared, evidence `finance-final-20260531` | pass - Image 33 finance kanban card | approved for Image 33 |
| ReconciliationRow | pass | pass | pass | pass | pass | pass - Image 34 paid/pending/overdue row crops compared, evidence `finance-final-20260531` | pass - Image 34 movement rows | approved for Image 34 |
| PipelineCard | pass | pass | pass | pass | pass | pass - Image 37 card crop compared, evidence `sales-final-20260531` | pass - Image 37 239x139 sales card | approved for Image 37 |
| LeadSummary | pass | pass | pass | pass | pass | pass - Image 38 selected lead row crop compared, evidence `sales-final-20260531` | pass - Image 38 835x66 lead row | approved for Image 38 |
| TrialClassCard | pass | pass | pass | pass | pass | pass - Image 39 selected trial row crop compared, evidence `sales-final-20260531` | pass - Image 39 832x70 trial row | approved for Image 39 |
| EnrollmentChecklist | pass | pass | pass | pass | pass | pass - Image 40 drawer checklist crop compared, evidence `sales-final-20260531` | pass - Image 40 292x152 checklist | approved for Image 40 |
| RiskCard | pass | pass | pass | pass | pass | pass - Image 41 risk row crop compared, evidence `retention-final-20260531` | pass - Image 41 862x62 retention risk row | approved for Image 41 |
| CancellationCase | pass | pass | pass | pass | pass | pass - Image 42 drawer crop compared, evidence `retention-final-20260531` | pass - Image 42 397x860 cancellation panel | approved for Image 42 |
| ReactivationCard | pass | pass | pass | pass | pass | pass - Image 43 drawer crop compared, evidence `retention-final-20260531` | pass - Image 43 412x803 reactivation panel | approved for Image 43 |
| ComplaintPanel | pass | pass | pass | pass | pass | pass - Image 44 drawer crop compared, evidence `retention-final-20260531` | pass - Image 44 398x855 complaint panel | approved for Image 44 |
| SensitiveActionDialog | pass | pass | pass | pass | pass | pass - Image 09 destructive dialog crop compared, evidence `retention-final-20260531` | pass - Image 09 166x168 sensitive dialog | approved for Image 09 |
| SupportTicketPanel | pass | pass | pass | pass | pass | pass - Image 47 support drawer crop compared, evidence `support-internal-final-20260531` | pass - Image 47 390x759 selected ticket panel | approved for Image 47 |
| GrantAccessPanel | pass | pass | pass | pass | pass | pass - Image 50 grant card crop compared, evidence `support-internal-final-20260531` | pass - Image 50 340x175 grant card | approved for Image 50 |
| TenantCard | pass | pass | pass | pass | pass | pass - Image 49 selected tenant row crop compared, evidence `support-internal-final-20260531` | pass - Image 49 955x60 tenant row | approved for Image 49 |
| InternalOverviewDashboard | pass | pass | pass | pass | pass | pass - Image 48 internal content crop compared, evidence `support-internal-final-20260531` | pass - Image 48 1080x754 internal dashboard content | approved for Image 48 content; shell wrapper is `CrmProductShell` |
| TenantDetailLayout | pass | pass | pass | pass | pass | pass - Image 50 tenant detail composition compared, evidence `support-internal-final-20260531` | pass - Image 50 1432x840 tenant detail + security rail | approved for Image 50 |
| SecurityRulePanel | pass | pass | pass | pass | pass | pass - Image 50 security rail crop compared, evidence `support-internal-final-20260531` | pass - Image 50 346x838 security rail | approved for Image 50 |
| ChartPanel | pass | pass | pass | pass | pass | pass - Image 45 report card crop compared, evidence `reports-opportunities-final-20260601` | pass - Image 45 493x222 report card | approved for Image 45 |
| ReportFilterBar | pass | pass | pass | pass | pass | pass - Image 45 filter bar crop compared, evidence `reports-opportunities-final-20260601` | pass - Image 45 795x49 filter bar | approved for Image 45 |
| OpportunityPanel | pass | pass | pass | pass | pass | pass - Image 46 opportunity drawer crop compared, evidence `reports-opportunities-final-20260601` | pass - Image 46 368x817 drawer | approved for Image 46 |
| ImportProgress | pass | pass | pass | pass | pass | pass - Image 13 import progress panel crop compared, evidence `import-setup-final-20260601` | pass - Image 13 646x254 import progress panel | approved for Image 13 |
| FieldMappingTable | pass | pass | pass | pass | pass | pass - Image 13 field mapping panel crop compared, evidence `import-setup-final-20260601` | pass - Image 13 453x263 field mapping panel | approved for Image 13 |
| DuplicateResolver | pass | pass | pass | pass | pass | pass - Image 13 duplicate resolver panel crop compared, evidence `import-setup-final-20260601` | pass - Image 13 502x263 duplicate resolver panel | approved for Image 13 |
| PermissionState | pass | pass | pass | pass | pass | pass - Image 12 permission panel crop compared, evidence `advanced-state-final-20260601` | pass - Image 12 357x211 permission panel | approved for Image 12 |
| PlanBlockedState | pass | pass | pass | pass | pass | pass - Image 67 add-on card crop compared, evidence `advanced-state-final-20260601` | pass - Image 67 269x344 plan-blocked card | approved for Image 67 |
| QuotaBlockedState | pass | pass | pass | pass | pass | pass - Image 68 quota alert/affected stack crop compared, evidence `advanced-state-final-20260601` | pass - Image 68 423x437 quota state stack | approved for Image 68 |
| IntegrationFailedState | pass | pass | pass | pass | pass | pass - Image 12 integrations panel crop compared, evidence `advanced-state-final-20260601` | pass - Image 12 363x211 integration failure panel | approved for Image 12 |

## Current Evidence

- 43 isolated `CRM / Batch 10 / [Component] / All States` stories exist.
- Technical validation passed after the latest adjustments: `corepack pnpm typecheck`, `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`, and `corepack pnpm visual:smoke`.
- Portal-aware Playwright render audit passed for all 43 Batch 10 stories with no empty render, no horizontal overflow, and no console/page errors. Evidence: `tmp/visual-audit/batch10/render-audit.json` and screenshots in `tmp/visual-audit/batch10`.
- Image 52 source comparison is certified for `AgentCatalog` and `AgentCard`: the catalog crop `tmp/visual-audit/batch10/crm-batch-10-agentcatalog--all-states.final-source-crop.png` matches the approved 445x216 card grid proportions, 16px catalog gap, 20px card padding, 24px icon/body column gap, 76px icon circle, dotless status chips, selected blue border, black primary CTA, source copy, and the agent icons visible in `52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png`.
- `AgentCard` isolated story was resized so each card renders at the same 445px source width; evidence: `tmp/visual-audit/batch10/crm-batch-10-agentcard--all-states.final-width445.png`.
- Images 54 and 56 source comparison is certified for `ModeSelector` and `ModeCard`; official glyphs are `hand`, `scale`, and `rocket`, and the selected mark is the filled blue circular check extracted from the approved images. Evidence: `tmp/visual-audit/batch10/agents-flow-token-panel-iteration9`.
- Images 56, 58, 59, and 70 source comparison is certified for `FlowBuilder`, `FlowStepCard`, `PreflightChecklist`, `ScenarioList`, `PhonePreview`, `ExecutionTimeline`, `SimulationRunner`, and `ExecutionReceipt`, with CRM tokens extracted for mode-card selected indicator, preflight checklist density, scenario action size, and execution receipt timeline rows. Evidence: `tmp/visual-audit/batch10/agents-flow-token-panel-iteration6`.
- Images 28 and 13 source comparison is certified for `StudentHeader`, `StudentSummary`, and `RelationshipList`. Evidence: `tmp/visual-audit/batch10/student-relationship-final-v3`; final captures match source crop dimensions exactly: `StudentHeader` 1292x173, `StudentSummary` 901x144, and `RelationshipList` 443x260.
- Images 30, 33, and 34 source comparison is certified for `PaymentCaseCard`, `FinanceKanbanCard`, and `ReconciliationRow`. Evidence: `tmp/visual-audit/batch10/finance-final-20260531/manifest.json`; final captures match source crop dimensions exactly: `PaymentCaseCard` 350x181, `FinanceKanbanCard` 183x135, and `ReconciliationRow` 832x55. The pending movement row wraps `comprovante enviado 09:45` into two lines as in image 34, and the payment queue row no longer truncates source labels such as `plano trimestral`.
- Images 37, 38, 39, and 40 source comparison is certified for `PipelineCard`, `LeadSummary`, `TrialClassCard`, and `EnrollmentChecklist`. Evidence: `tmp/visual-audit/batch10/sales-final-20260531/manifest.json` plus `interaction-smoke.json`; final captures match source crop dimensions exactly: `PipelineCard` 239x139, `LeadSummary` 835x66, `TrialClassCard` 832x70, and `EnrollmentChecklist` 292x152. Real behavior is covered by a selectable pipeline card, lead action button, trial root row button, and checklist item buttons.
- Images 41, 42, 43, 44, and 09 source comparison is certified for `RiskCard`, `CancellationCase`, `ReactivationCard`, `ComplaintPanel`, and `SensitiveActionDialog`. Evidence: `tmp/visual-audit/batch10/retention-final-20260531/manifest.json`, `comparison-sheet.png`, and `interaction-smoke.json`; final captures match source crop dimensions exactly: `RiskCard` 862x62, `CancellationCase` 397x860, `ReactivationCard` 412x803, `ComplaintPanel` 398x855, and `SensitiveActionDialog` 166x168. Real behavior is covered by risk row click, retention panel action buttons, and confirm/cancel dialog callbacks.
- Images 47, 48, 49, and 50 source comparison is certified for `SupportTicketPanel`, `GrantAccessPanel`, `TenantCard`, historical `InternalShell` content now named `InternalOverviewDashboard`, `TenantDetailLayout`, and `SecurityRulePanel`. Evidence: `tmp/visual-audit/batch10/support-internal-final-20260531/manifest.json` and `interaction-smoke.json`; final captures match source crop dimensions exactly: `SupportTicketPanel` 390x759, `GrantAccessPanel` 340x175, `TenantCard` 955x60, internal dashboard content 1080x754, `TenantDetailLayout` 1432x840, and `SecurityRulePanel` 346x838. Real behavior is covered by support drawer buttons, grant action, tenant checkbox/open action, and security rail actions/blocked denied state.
- Images 45 and 46 source comparison is certified for `ChartPanel`, `ReportFilterBar`, and `OpportunityPanel`. Evidence: `tmp/visual-audit/batch10/reports-opportunities-final-20260601/manifest.json`; final captures match source crop dimensions exactly: `ChartPanel` 493x222, `ReportFilterBar` 795x49, and `OpportunityPanel` 368x817. Real behavior is covered by `ChartPanel` open callback, `ReportFilterBar` export callback, and `OpportunityPanel` close/action callbacks including the `task` action.
- Image 13 source comparison is certified for `ImportProgress`, `FieldMappingTable`, and `DuplicateResolver`. Evidence: `tmp/visual-audit/batch10/import-setup-final-20260601/manifest.json`; final captures match source crop dimensions exactly: `ImportProgress` 646x254, `FieldMappingTable` 453x263, and `DuplicateResolver` 502x263. Real behavior is covered by pause/details/resume/retry import callbacks, mapping row/select/action/add callbacks, and duplicate radio/merge/separate callbacks.
- Images 12, 67, and 68 source comparison is certified for `PermissionState`, `PlanBlockedState`, `QuotaBlockedState`, and `IntegrationFailedState`. Evidence: `tmp/visual-audit/batch10/advanced-state-final-20260601/manifest.json`; final captures match source crop dimensions exactly: `PermissionState` 357x211, `PlanBlockedState` 269x344, `QuotaBlockedState` 423x437, and `IntegrationFailedState` 363x211. Real behavior is covered by permission request/footer callbacks, plan support/manual callbacks, quota flow CTA, and integration retry/fallback/support/menu/footer callbacks.
- Variant gaps closed in Storybook for `AgentCatalog` 0/1/3/7 agents, `AgentCard` active/draft/not-contracted/paused/attention/blocked/selected, action panels by state, `EnrollmentChecklist`, `ImportProgress`, and `DuplicateResolver`.
- `StudentSummary` now includes agenda, financeiro, and tarefas rows with callback coverage.
- Reusable chip sizing normalization was applied in `@taliya/ui`/`@taliya/crm` so chips inside grid-based primitives no longer stretch into status bars.

## Current Blockers

- None for Batch 10. All 43 scoped components have isolated stories, tokenized anatomy, source-image comparison evidence, real interaction callbacks, and passing validation gates.
