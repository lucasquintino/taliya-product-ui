# @taliya/crm

Padroes e componentes compostos do SaaS/CRM Taliya.

Inclui:

- CrmProductShell;
- CrmShellSidebar;
- CrmShellTopNav;
- CrmShellGlobalActions;
- PageHeader;
- PageFilterBar;
- PageQuickFilters;
- ListDetailLayout;
- WorkListDetailPage;
- CrmPageFamilyShell;
- CrmWorklistPage;
- CrmKanbanPage;
- CrmDashboardPage;
- CrmThreePanePage;
- CrmRightPanelPage;
- CrmWorklistTable;
- CrmDrawer;
- AgentPanel;
- SetupStepper;
- MetricCard;
- InternalOverviewDashboard;
- KanbanBoard;
- KanbanColumn;
- KanbanCard;
- CrmOperationalPanel;
- CrmOperationalRows;
- CrmOperationalRow;
- standardPageKitManifest;
- LeadTable (compatibilidade/migracao; prefira CrmWorklistTable em novas paginas);
- TaskTable (compatibilidade/migracao; prefira CrmWorklistTable em novas paginas);
- ChecklistTable;
- ChecklistDrawer;
- ApprovalTable;
- StudentTable;
- ReplacementTable;
- CrmRecordDrawer;
- FinancePriorityPanel;
- FinanceQueueGrid;
- SubscriptionReviewPage;
- ConfirmedSubscriptionPage;
- StudentProfileOverviewGrid;
- StudentProfileActionRail;
- AgentRoutineIntro;
- SetupPage;
- SetupPagePanel;
- SetupWelcomeMain;
- DashboardGrid com `columns={2|3|4|"asymmetrical"|"today"}` e `density="compact"`;
- WeeklyCalendar;
- DataTable;
- UsageLedgerTable;
- ApprovalPanel;
- ExecutionReceipt.

Aliases historicos ainda exportados por compatibilidade:

- `Sidebar` -> prefira `CrmShellSidebar` ou `CrmProductShell`;
- `Topbar` -> prefira `CrmShellTopNav` ou `CrmProductShell`;
- `GlobalActions` -> prefira `CrmShellGlobalActions`;
- `TaskQueueList` -> prefira `PageQuickFilters`.

Especializacoes CRM nao duplicam primitives: `PageFilterBar` compoe o contrato visual de pagina sobre os primitives de filtro/busca, `CrmWorklistTable` compoe a anatomia oficial de tabelas/listas da familia worklist sobre `DataTable` e `TablePagination` e aceita `caption` para observacoes operacionais apos as linhas, `CrmDrawer` compoe a anatomia oficial de drawer sobre os primitives de overlay/drawer, e `MetricCard`/`StatusCard` sao composicoes de produto sobre primitives de superficie/status.

Este pacote pode depender de `@taliya/tokens` e `@taliya/ui`.

`react` e `react-dom` sao peer dependencies do consumidor. Nao instale uma segunda copia de React dentro deste pacote.

Importe o CSS depois de tokens e primitives:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
```

Para descobrir o kit oficial de componentes reutilizaveis em consumidores:

```ts
import { standardPageKitManifest } from "@taliya/crm";
```

Consumidores que querem carregar apenas o contrato do kit oficial tambem podem usar o subpath publico:

```ts
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

`CrmProductShell` aceita `drawerPlacement="fixed" | "content" | "floating" | "chrome" | "viewport"` para manter o posicionamento do drawer oficial dentro da biblioteca. Use `fixed` para o rail fixo padrao, `content` quando a tela fonte pede o drawer alinhado ao canvas, `floating` quando o drawer deve flutuar abaixo da topbar com margens internas, `chrome` quando deve comecar logo abaixo do chrome do navegador e conservar os gutters direito/inferior, e `viewport` para drawers operacionais de altura total acima do shell. Use `drawerSize="default" | "compact"` para reservar a largura oficial do rail; o tamanho compacto atende drawers de checklist derivados da imagem fonte sem CSS local no consumidor.

`CaseDrawer` aceita `widthVariant="default" | "wide"`. O tamanho padrao atende o drawer operacional e as filas longas; `wide` atende drawers de resumo com largura oficial de `425px`. A pagina escolhe somente o modo publico apropriado e continua passando dados, estados e callbacks, sem posicionamento ou largura em CSS local.

Para paginas fonte que precisam de ritmo proprio entre titulo e canvas, `CrmProductShell` tambem aceita variantes como `pageHeaderRhythm="dashboard" | "reports" | "support" | "internal-overview" | "internal-tenants" | "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish" | "settings-hub" | "overview"`. Use `dashboard` para dashboards densos acima da dobra, `reports` para a familia Relatorios, `support` para a central de suporte, `internal-overview` para o cockpit operacional do Internal, `internal-tenants` para a lista compacta de clientes/tenants, `stacked` para listas com titulo/subtitulo empilhados, `agents` para o catalogo oficial da Image 52, `agents-routines` para o breadcrumb, titulo, status e canvas de rotinas da Image 53, `agents-routine-detail` para o detalhe de rotina da Image 54, `agents-flow-detail` para o fluxo da Image 56, `agents-publish` para o breadcrumb/titulo compacto da publicacao da Image 59, `settings-hub` para o header do hub oficial da Image 60, e `overview` para visoes gerais compactas. O padrao permanece compacto para nao alterar telas ja certificadas.

O frame publico diferencia `frame="window" | "window-inset"`: `window` preserva a janela flush usada nas paginas operacionais de Agentes, enquanto `window-inset` inclui o stage, a margem e a altura interna da janela fonte das Images 52-53. Nao aplique a variante inset a uma familia inteira sem sentinelas, pois paginas full-bleed com drawer usam o contrato flush.

Para paginas com drawer externo que precisam priorizar a largura util do conteudo principal, use `contentLayout="main-priority"`. Para kanban, use `contentLayout="kanban"`; a central de suporte usa `contentLayout="support"`. O cockpit interno usa `InternalShell browserUrl="https://app.taliya.com/internal" contentLayout="internal-overview" pageHeaderRhythm="internal-overview" drawerPlacement="floating"` com `SupportTicketDrawer variant="internal"`. A lista de tenants usa `InternalWorklistPage contentLayout="internal-tenants" pageHeaderRhythm="internal-tenants" drawerPlacement="floating"` com `TenantSummaryDrawer`. O detalhe de tenant usa `InternalShell contentLayout="internal-tenant-detail" regions={{ pageHeader: false }}` com `TenantDetailLayout footerNote={...}`; esse layout possui header, resumo, tabs, grid de dominio, rail `SecurityRulePanel` e rodape, sem um `TenantSecurityDrawer` duplicado. Consumidores fornecem dados, conteudo permitido e callbacks.

Para a publicacao de rotina da Image 59, `CrmRightPanelPage rightPanelVariant="agent-publish"` seleciona o `contentLayout="agent-publish"` oficial e deve ser combinado com `pageHeaderRhythm="agents-publish"`, breadcrumb e `AgentFlowDrawer state="publish"`. A biblioteca possui os eixos do header/canvas e o `AgentPublishRoutineWorkspace`; o consumidor fornece rota, dados e callbacks, sem CSS de pagina.

Para o detalhe de rotina da Image 54, `CrmRightPanelPage rightPanelVariant="agent-routine"` seleciona `contentLayout="agent-routine"` e deve ser combinado com `pageHeaderRhythm="agents-routine-detail"`, `AgentRoutineWorkspace` e `AgentFlowDrawer state="routine"`. A biblioteca possui header, canvas, modo, fluxos, barra inferior, largura/posicao do drawer e copy contextual; o consumidor fornece URL, breadcrumb, meta, dados, estado e callbacks, sem markup ou CSS de anatomia local. Evidencia final: `tmp/54-agent-routine-final-20260715/report.json`.

Para o detalhe de fluxo da Image 56, `CrmRightPanelPage rightPanelVariant="agent-flow"` seleciona `contentLayout="agent-flow"` e deve ser combinado com `pageHeaderRhythm="agents-flow-detail"`, `AgentFlowWorkspace` e `AgentFlowDrawer state="flow"`. A biblioteca possui header, modo, builder, ajustes, acoes e geometria do drawer; o consumidor fornece URL, breadcrumb, meta, dados, estado e callbacks, sem markup ou CSS de anatomia local. Evidencia tecnica: `tmp/56-agent-flow-header-final-20260715/report.json`; a pagina segue pendente de aprovacao visual 1:1.

Para o teste de fluxo da Image 58, `CrmRightPanelPage rightPanelVariant="agent-test"` seleciona `contentLayout="agent-test"` e deve ser combinado com `SimulationRunner` e `AgentFlowDrawer state="test"`. A biblioteca possui cenarios, telefone, timeline, acoes, alturas e geometria do drawer; o consumidor fornece URL, breadcrumb, meta, estado e callbacks, sem markup ou CSS de anatomia local. Evidencia tecnica: `tmp/58-agent-test-phone-final-20260715/report.json`; a pagina segue pendente de aprovacao visual 1:1.

Para o recibo de execucao da Image 70, `CrmRightPanelPage rightPanelVariant="agent-execution"` reserva o canvas oficial do `ExecutionReceipt` ao lado de `AgentFlowDrawer state="execution"`. A variante altera apenas as colunas e o offset do layout de execucao; breadcrumb, meta, dados e callbacks continuam sendo fornecidos por props.

O hub da Image 60 usa `CrmDashboardPage layoutVariant="settings-hub"`, `pageHeaderRhythm="settings-hub"` e `topNavSelection="none"`. A biblioteca possui o inset do header e o canvas de quatro colunas; o consumidor fornece os oito `SettingsHubCard` por dados/estados/callbacks, sem ajustar grid ou cards em CSS local.

A pagina de permissoes da Image 61 usa `CrmRightPanelPage rightPanelVariant="settings-permissions"`, `topNavSelection="none"`, `SettingsPermissionsWorkspace` e `SettingsAgentPanel`. A variante possui a moldura principal, os tracks `887px 440px`, o ritmo das secoes e o rail completo; o consumidor fornece URL, breadcrumb, papeis, permissoes, estado de salvamento e callbacks, sem ajustar shell, colunas ou densidade em CSS local.

A pagina de pagamentos da Image 62 usa `CrmRightPanelPage rightPanelVariant="settings-payments"`, `topNavSelection="none"`, URL canonica, `SettingsPaymentsWorkspace` e `SettingsAgentPanel`. A variante seleciona `contentLayout="settings-payments"` e possui inset, tracks `940px 352px`, header/actions, alturas das secoes, metodos conectados e rail; o consumidor fornece breadcrumb, dados do assistente, estado e callbacks, sem CSS de pagina. Evidencia tecnica: `tmp/62-settings-payments-accepted-20260715/report.json`.

A pagina de agenda da Image 63 usa `CrmRightPanelPage rightPanelVariant="settings-agenda"`, `topNavSelection="none"`, URL canonica, `SettingsAgendaWorkspace` e `SettingsAgentPanel`. A variante seleciona `contentLayout="settings-agenda"` e possui inset, tracks `884px 382px`, ritmo das tres secoes, controles de regras e rail; o consumidor fornece breadcrumb, dados, estado e callbacks, sem CSS de pagina. Evidencia tecnica: `tmp/63-settings-agenda-final-20260715/report.json`.

A pagina de notificacoes da Image 64 usa `CrmRightPanelPage rightPanelVariant="settings-notifications"`, `topNavSelection="none"`, URL canonica, `SettingsNotificationsWorkspace` e `SettingsAgentPanel`. A variante seleciona `contentLayout="settings-notifications"` e possui tracks `890px 386px`, gap, offsets, alturas das tres secoes, controles de regras e rail; o consumidor fornece breadcrumb, dados, estado e callbacks, sem CSS de pagina. Evidencia tecnica: `tmp/64-settings-notifications-refined-20260715/report.json`.

A pagina de assinatura da Image 65 usa `CrmRightPanelPage rightPanelVariant="billing-subscription"`, `topNavSelection="none"`, URL canonica, `BillingSubscriptionWorkspace` e `UsageDrawer`. A variante seleciona `contentLayout="billing-subscription"` e possui tracks `934px 334px`, gap, offsets independentes do main/rail, ritmo do header e microgeometria do drawer; o consumidor fornece breadcrumb, dados, estado e callbacks, sem CSS de pagina. Evidencia tecnica: `tmp/65-billing-subscription-title-probe-20260715/report.json`; a pagina e semi-aprovada e falhou 1:1.

`PageQuickFilters` aceita `selectionTone="strong" | "soft"`. O padrao `strong` preserva a selecao escura de Operacao/Kanban; `soft` aplica a selecao azul clara oficial para paginas de lista como Checklists, sem CSS local no consumidor.

As composicoes `SubscriptionReviewPage`, `ConfirmedSubscriptionPage`, `FinanceQueueGrid`, `StudentProfileOverviewGrid`, `StudentProfileActionRail`, `AgentRoutineIntro`, `SetupPage`, `SetupPagePanel` e `SetupWelcomeMain` promovem layouts antes restritos as stories de cobertura. `FinanceQueueGrid density="compact"` preserva quatro filas por linha em dashboards com espaco reservado para drawer; sem drawer, mantenha a densidade padrao. Consumidores devem configurar conteudo e callbacks por props, sem copiar sua anatomia em CSS local.

`SetupPage frameVariant="default" | "guided" | "guided-block" | "guided-main" | "guided-wide" | "guided-review" | "shell-global"` separa os ritmos oficiais. Use `shell-global` somente para a casca global da Image 51A, `guided` para blocos com rail compacto, `guided-block` para o rail largo comprovado pelas Images 51D-51F, `guided-main` para a area central larga e agente estreito comprovados pelas Images 51G e 51K, `guided-wide` para a area central larga e o agente ainda mais estreito comprovados pelas Images 51I-51J, `guided-review` para a revisao final de nove etapas da Image 51L, e `layout="welcome"` para a entrada de boas-vindas. A biblioteca possui moldura, colunas, stepper, agente e barra inferior; o consumidor passa etapa, progresso, conteudo preparado e callbacks.

`WeeklyHoursGrid variant="availability" | "schedule"` preserva dois contratos oficiais. `availability` e o editor de disponibilidade semanal com ajuste por dia; `schedule` recebe `axis`, eventos discretos em `slots`, `meta` e `tone` para a previa de agenda da Image 51J. Consumidores passam dados e callbacks e nao recriam a grade ou os eventos em markup/CSS local.

`SetupAgentChat variant="step" | "welcome"` preserva o painel completo de etapa da Image 51B como default e oferece a composicao responsiva de boas-vindas da Image 78. A variante `welcome` possui mensagem introdutoria, perguntas rapidas e ajuda humana oficiais; o consumidor fornece apenas callbacks e nao duplica framing, copy estrutural ou densidade no shell.

`KanbanColumn` aceita `meta` para totais ou contexto secundario e `onMenu` para a acao acessivel da coluna. Menus e selecao dos cards devem usar os callbacks de `KanbanCard`/`FinanceKanbanCard`, sem controles sobrepostos pela pagina consumidora.

`PaymentDrawer variant="movement"` representa uma movimentacao a vencer com acoes de link Pix e conversa; a variante padrao `collection` mantem o fluxo de cobranca, promessa e baixa. Consumidores devem reagir ao `onAction` tipado, sem substituir o footer do drawer localmente.

`ClassDrawer variant="class-detail"` usa o status de cada `ClassDrawerStudent` para os tons dos avatares fixos e uma escala de titulo propria. Dados de turma, timelines e acoes devem ser passados por props; a lista fixa nao deve ser reconstruida no consumidor.

`ClassDrawer variant="recurring-block"` representa fatos de recorrencia, proximas aulas, impactos e orientacao de bloqueio com `impactItems` e `blockNotice` tipados. A variante mantem acoes no fluxo do drawer para que copiloto e audit continuem parte do mesmo documento operacional.

Pipelines comerciais usam `CrmKanbanPage laneWidth="commercial"` para preservar leitura dos cards e overflow horizontal. `PipelineCard sourceIcon` representa a origem com um icone oficial; identidade, interesse, proxima acao, dono, status, selecao e menus devem ser fornecidos por props e callbacks.
