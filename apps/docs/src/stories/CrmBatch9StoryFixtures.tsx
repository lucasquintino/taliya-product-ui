import { useState } from "react";
import type { ReactNode } from "react";

import {
  AccessFooterLinks,
  AccessShell,
  ActivityFeed,
  AddOnCard,
  AgentPanel,
  AgentStatus,
  AgentFlowDrawer,
  ApprovalDrawer,
  ApprovalPanel,
  AuditTrail,
  AuthCard,
  BeforeAfterDiff,
  CaseDrawer,
  ChannelStatus,
  ChecklistRow,
  CheckoutPaymentCard,
  CheckoutReviewPanel,
  ClassCard,
  ClassDrawer,
  CommentThread,
  Composer,
  ConfigImpactPreview,
  ConfirmedSetupHandoff,
  ContextPanel,
  ConversationList,
  ConversationThread,
  CopilotSuggestion,
  DashboardGrid,
  ExportAction,
  HandoffBanner,
  ImpactSummary,
  IntegrationStatusRow,
  InvoiceTable,
  InviteRow,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  LeadDrawer,
  ListDetailLayout,
  MetricCard,
  MiniCalendar,
  PaymentDrawer,
  PaymentMethodRow,
  PageFilterBar,
  PageQuickFilters,
  PermissionMatrix,
  PlanSummaryCard,
  ProfileTabs,
  QuickReplyChips,
  QuotaProgress,
  ReplacementDrawer,
  RightPanelLayout,
  RoleCard,
  Roster,
  RuleRow,
  SecurePaymentNotice,
  SettingsHubCard,
  SettingsSection,
  SetupAgentChat,
  SetupBlockHeader,
  SetupBottomBar,
  SetupChoiceCard,
  SetupContentGrid,
  SetupHumanHelpCTA,
  SetupImportSourceCard,
  SetupReviewPanel,
  SetupShell,
  SetupStepper,
  SetupWelcome,
  StudentDrawer,
  StatusCard,
  SubscriptionProgressStepper,
  SubscriptionResolutionPanel,
  SubscriptionResultHeader,
  SubscriptionStatusCard,
  SupportTicketDrawer,
  TaskQueueList,
  TaskTable,
  TaskDrawer,
  TenantSecurityDrawer,
  ThreePaneLayout,
  UnsavedChangesBar,
  UsageDrawer,
  UsageLedgerTable,
  UsageOriginRow,
  WeeklyCalendar,
  WeeklyHoursGrid
} from "@taliya/crm";
import type { ClassDrawerStudent, CommentThreadComment, PageFilterBarFilter, PaymentDrawerAction, PermissionMatrixRow, ReplacementDrawerAction, SettingsSectionRow } from "@taliya/crm";
import type { ConversationListRow } from "@taliya/crm";
import { Button, Card, Chip, Panel } from "@taliya/ui";

import { batch9SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";
import source24AnaSilva from "../assets/source24-ana-silva.png";
import source24CarlaMenezes from "../assets/source24-carla-menezes.png";
import source24JuliaRamos from "../assets/source24-julia-ramos.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";
import source24PedroSantos from "../assets/source24-pedro-santos.png";
import source25SamFrank from "../assets/source25-sam-frank.png";
import source28AnaPaula from "../assets/source28-ana-paula.png";
import source29FelipeAndrade from "../assets/source29-felipe-andrade.png";
import source29JulianaCosta from "../assets/source29-juliana-costa.png";
import source23CommentAnaSilva from "../assets/source23-comment-ana-silva.png";
import source23CommentJoaoSilva from "../assets/source23-comment-joao-silva.png";
import source23CommentSamFrank from "../assets/source23-comment-sam-frank.png";
import source51eLeticiaRamos from "../assets/source51e-leticia-ramos.png";

export const batch9StoryTitles = {
  ListDetailLayout: "CRM / Layout / ListDetailLayout",
  PageFilterBar: "CRM / Layout / PageFilterBar",
  PageQuickFilters: "CRM / Layout / PageQuickFilters",
  TaskQueueList: "CRM / Tasks / TaskQueueList",
  TaskTable: "CRM / Tasks / TaskTable",
  ThreePaneLayout: "CRM / Layout / ThreePaneLayout",
  ContextPanel: "CRM / Layout / ContextPanel",
  RightPanelLayout: "CRM / Layout / RightPanelLayout",
  DashboardGrid: "CRM / Layout / DashboardGrid",
  MetricCard: "CRM / Surface / MetricCard",
  StatusCard: "CRM / Surface / StatusCard",
  ProfileTabs: "CRM / Profile / ProfileTabs",
  ActivityFeed: "CRM / Timeline / ActivityFeed",
  AuditTrail: "CRM / Timeline / AuditTrail",
  KanbanBoard: "CRM / Kanban / KanbanBoard",
  KanbanColumn: "CRM / Kanban / KanbanColumn",
  KanbanCard: "CRM / Kanban / KanbanCard",
  WeeklyCalendar: "CRM / Agenda / WeeklyCalendar",
  MiniCalendar: "CRM / Agenda / MiniCalendar",
  ClassCard: "CRM / Agenda / ClassCard",
  Roster: "CRM / Agenda / Roster",
  SetupShell: "CRM / Setup / SetupShell",
  SetupStepper: "CRM / Setup / SetupStepper",
  SetupBlockHeader: "CRM / Setup / SetupBlockHeader",
  SetupContentGrid: "CRM / Setup / SetupContentGrid",
  SetupBottomBar: "CRM / Setup / SetupBottomBar",
  SetupWelcome: "CRM / Setup / SetupWelcome",
  SetupChoiceCard: "CRM / Setup / SetupChoiceCard",
  SetupImportSourceCard: "CRM / Setup / SetupImportSourceCard",
  SetupReviewPanel: "CRM / Setup / SetupReviewPanel",
  SetupAgentChat: "CRM / Setup / SetupAgentChat",
  SetupHumanHelpCTA: "CRM / Setup / SetupHumanHelpCTA",
  AgentPanel: "CRM / Agent / AgentPanel",
  AgentStatus: "CRM / Agent / AgentStatus",
  CopilotSuggestion: "CRM / Agent / CopilotSuggestion",
  AccessShell: "CRM / Access / AccessShell",
  AuthCard: "CRM / Access / AuthCard",
  AccessFooterLinks: "CRM / Access / AccessFooterLinks",
  CheckoutPaymentCard: "CRM / Subscription / CheckoutPaymentCard",
  CheckoutReviewPanel: "CRM / Subscription / CheckoutReviewPanel",
  SubscriptionStatusCard: "CRM / Subscription / SubscriptionStatusCard",
  SubscriptionProgressStepper: "CRM / Subscription / SubscriptionProgressStepper",
  SubscriptionResolutionPanel: "CRM / Subscription / SubscriptionResolutionPanel",
  SubscriptionResultHeader: "CRM / Subscription / SubscriptionResultHeader",
  ConfirmedSetupHandoff: "CRM / Subscription / ConfirmedSetupHandoff",
  PlanSummaryCard: "CRM / Billing / PlanSummaryCard",
  InvoiceTable: "CRM / Billing / InvoiceTable",
  AddOnCard: "CRM / Billing / AddOnCard",
  QuotaProgress: "CRM / Usage / QuotaProgress",
  UsageLedgerTable: "CRM / Usage / UsageLedgerTable",
  ApprovalPanel: "CRM / Approvals / ApprovalPanel",
  ImpactSummary: "CRM / Approvals / ImpactSummary",
  BeforeAfterDiff: "CRM / Approvals / BeforeAfterDiff",
  SettingsSection: "CRM / Config / SettingsSection",
  PermissionMatrix: "CRM / Config / PermissionMatrix",
  RuleRow: "CRM / Config / RuleRow",
  SettingsHubCard: "CRM / Config / SettingsHubCard",
  IntegrationStatusRow: "CRM / Config / IntegrationStatusRow",
  UnsavedChangesBar: "CRM / Config / UnsavedChangesBar",
  ConfigImpactPreview: "CRM / Config / ConfigImpactPreview",
  ConversationList: "CRM / Inbox / ConversationList",
  ConversationThread: "CRM / Inbox / ConversationThread",
  Composer: "CRM / Inbox / Composer",
  ChannelStatus: "CRM / Inbox / ChannelStatus",
  HandoffBanner: "CRM / Inbox / HandoffBanner",
  QuickReplyChips: "CRM / Inbox / QuickReplyChips",
  ChecklistRow: "CRM / Operational / ChecklistRow",
  CommentThread: "CRM / Operational / CommentThread",
  TaskDrawer: "CRM / Operational / TaskDrawer",
  ApprovalDrawer: "CRM / Operational / ApprovalDrawer",
  CaseDrawer: "CRM / Operational / CaseDrawer",
  StudentDrawer: "CRM / Operational / StudentDrawer",
  ClassDrawer: "CRM / Operational / ClassDrawer",
  PaymentDrawer: "CRM / Operational / PaymentDrawer",
  ReplacementDrawer: "CRM / Operational / ReplacementDrawer",
  LeadDrawer: "CRM / Operational / LeadDrawer",
  AgentFlowDrawer: "CRM / Operational / AgentFlowDrawer",
  UsageDrawer: "CRM / Operational / UsageDrawer",
  SupportTicketDrawer: "CRM / Operational / SupportTicketDrawer",
  TenantSecurityDrawer: "CRM / Operational / TenantSecurityDrawer",
  WeeklyHoursGrid: "CRM / Setup / WeeklyHoursGrid",
  RoleCard: "CRM / Setup / RoleCard",
  InviteRow: "CRM / Setup / InviteRow",
  PaymentMethodRow: "CRM / Subscription / PaymentMethodRow",
  SecurePaymentNotice: "CRM / Subscription / SecurePaymentNotice",
  UsageOriginRow: "CRM / Usage / UsageOriginRow",
  ExportAction: "CRM / Reports / ExportAction"
} as const;

export type Batch9StoryComponent = keyof typeof batch9StoryTitles;

function StoryPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <PrimitivePage>
      <div className={["sb-crm-batch9-page", className].filter(Boolean).join(" ")}>{children}</div>
    </PrimitivePage>
  );
}

function SourceFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={["sb-crm-batch9-source-frame", className].filter(Boolean).join(" ")}>{children}</div>;
}

function RightPanelLayoutSourceMain({ compact = false }: { compact?: boolean }) {
  return (
    <div className={["sb-crm-right-panel-main", compact && "sb-crm-right-panel-main--compact"].filter(Boolean).join(" ")}>
      <div className="sb-crm-right-panel-main__icon" />
      <h2>Área da etapa atual</h2>
      <p>Conteúdo da página entra aqui.</p>
      <p>Formulários, listas, importações, revisões e configurações.</p>
      <div className="sb-crm-right-panel-main__wide" />
      <div className="sb-crm-right-panel-main__cards">
        <span />
        <span />
        <span />
      </div>
      <div className="sb-crm-right-panel-main__preview">
        <span />
        <span />
        <span />
        <em />
      </div>
      <small><span aria-hidden="true">i</span> Este é o shell do Setup Inicial. O conteúdo será exibido nesta área.</small>
    </div>
  );
}

function RightPanelLayoutSourceRail({ compact = false }: { compact?: boolean }) {
  return (
    <div className={["sb-crm-right-panel-rail", compact && "sb-crm-right-panel-rail--compact"].filter(Boolean).join(" ")}>
      <header>
        <span aria-hidden="true" className="sb-crm-right-panel-rail__bot"><span /></span>
        <span>
          <strong>Agente de configuração</strong>
          <em>Guiando setup</em>
        </span>
        <button aria-label="Mais opções" type="button">⋮</button>
        <button aria-label="Fechar agente" type="button">×</button>
      </header>
      <div className="sb-crm-right-panel-rail__callout"><span aria-hidden="true">i</span>Esta etapa afeta agenda, cobrança e comunicação inicial.</div>
      <p>Estamos na etapa Dados do studio. Vou te avisar o que é obrigatório e o que pode ficar para depois.</p>
      <p>Use a área central para preencher, importar ou revisar dados. Eu acompanho daqui e explico qualquer dúvida.</p>
      <section>
        <h3>Dúvidas frequentes</h3>
        <button type="button">O que é obrigatório?</button>
        <button type="button">Posso deixar para depois?</button>
        <button type="button">Como isso afeta a agenda?</button>
      </section>
      <label>
        <span>Pergunte sobre esta etapa...</span>
        <button aria-label="Enviar pergunta" type="button"><span aria-hidden="true" /></button>
      </label>
      <footer>Precisa de ajuda humana? <button type="button">Agendar ajuda</button></footer>
    </div>
  );
}

function DashboardGridSourcePanel({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <section aria-label={label} className={["sb-crm-dashboard-grid-panel", wide && "sb-crm-dashboard-grid-panel--wide"].filter(Boolean).join(" ")}>
      <header><span /><strong>{label}</strong><em /></header>
      <div className="sb-crm-dashboard-grid-panel__body">
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

const sourceConversationRows: ConversationListRow[] = [
  {
    id: "ana-silva",
    name: "Ana Silva",
    avatarSrc: source24AnaSilva,
    subject: "Reposição",
    detail: "Aguardando humano",
    preview: "Oi, perdi a aula de ontem. Consigo repor quinta?",
    time: "10:24",
    metaLabel: "Recepção",
    metaIcon: "calendar",
    statusLabel: "Aguardando humano",
    statusTone: "waiting",
    channel: "whatsapp",
    selected: true,
    state: "selected"
  },
  {
    id: "marina-lopes",
    name: "Marina Lopes",
    avatarSrc: source24MarinaLopes,
    subject: "Comprovante enviado",
    detail: "Financeiro",
    preview: "Segue o comprovante de pagamento.",
    time: "10:12",
    metaLabel: "Financeiro",
    metaIcon: "clipboard",
    statusLabel: "Em andamento",
    statusTone: "progress",
    channel: "whatsapp",
    state: "unread"
  },
  {
    id: "julia-ramos",
    name: "Julia Ramos",
    avatarSrc: source24JuliaRamos,
    subject: "Pergunta sobre horario",
    detail: "Copiloto sugeriu",
    preview: "Qual o horário das turmas de manhã?",
    time: "09:48",
    metaLabel: "Atendimento",
    metaIcon: "users",
    statusLabel: "Copiloto sugeriu",
    statusTone: "copilot",
    statusIcon: "sparkles",
    channel: "whatsapp"
  },
  {
    id: "pedro-santos",
    name: "Pedro Santos",
    avatarSrc: source24PedroSantos,
    subject: "Mensagem falhou",
    detail: "Falha de envio",
    preview: "Tentei enviar o comprovante e não foi.",
    time: "09:31",
    metaLabel: "Sistema",
    metaIcon: "settings",
    statusLabel: "Falha de envio",
    statusTone: "failed",
    statusIcon: "alert",
    channel: "whatsapp",
    state: "failed"
  },
  {
    id: "carla-menezes",
    name: "Carla Menezes",
    avatarSrc: source24CarlaMenezes,
    subject: "Opt-out registrado",
    preview: "Não quero mais receber mensagens.",
    time: "Ontem",
    metaLabel: "Sistema",
    metaIcon: "settings",
    statusLabel: "Opt-out registrado",
    statusTone: "optout",
    channel: "whatsapp",
    state: "opt-out"
  }
];

const sourceCommentThreadComments: CommentThreadComment[] = [
  {
    id: "ana-silva",
    author: "Ana Silva",
    body: "Pedi reposição quinta 08h.",
    time: "Hoje, 09:08",
    avatarSrc: source23CommentAnaSilva,
    visibility: "customer-visible"
  },
  {
    id: "sam-frank",
    author: "Sam Frank",
    body: "Recepção não encontrou vaga ainda.",
    time: "Hoje, 09:14",
    avatarSrc: source23CommentSamFrank,
    visibility: "internal"
  },
  {
    id: "joao-silva",
    author: "João Silva",
    body: "Copiloto sugeriu opção quinta 08h.",
    time: "Hoje, 09:20",
    avatarSrc: source23CommentJoaoSilva,
    visibility: "internal"
  }
];

function ConversationListStory() {
  const [selectedId, setSelectedId] = useState("ana-silva");
  const [activeFilterId, setActiveFilterId] = useState("all");
  const [event, setEvent] = useState("source");
  const interactiveRows = sourceConversationRows.map((row) => ({
    ...row,
    selected: row.id === selectedId,
    state: row.id === selectedId ? "selected" as const : row.state
  }));

  return (
    <StoryPage className="sb-crm-batch9-conversation-list-story">
      <SourceFrame className="sb-crm-batch9-conversation-list-source">
        <ConversationList rows={sourceConversationRows} />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source left pane - image 24">
          <ConversationList rows={sourceConversationRows} />
        </PrimitiveState>
        <PrimitiveState label="interactive selection">
          <ConversationList
            activeFilterId={activeFilterId}
            onConversationSelect={(row) => {
              setSelectedId(row.id);
              setEvent(`select:${row.id}`);
            }}
            onFilterChange={(filter) => {
              setActiveFilterId(filter.id);
              setEvent(`filter:${filter.id}`);
            }}
            onNextPage={() => setEvent("next")}
            onPageSizeClick={() => setEvent("page-size")}
            onPreviousPage={() => setEvent("previous")}
            rows={interactiveRows}
            selectedId={selectedId}
          />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <ConversationList rows={sourceConversationRows} state="loading" />
        </PrimitiveState>
        <PrimitiveState label="empty">
          <ConversationList rows={[]} state="empty" />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <ConversationList rows={sourceConversationRows} state="blocked" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event}</output>
    </StoryPage>
  );
}

function DemoPanel({ title = "Conteudo preparado via props" }: { title?: string }) {
  return (
    <Panel>
      <h3>{title}</h3>
      <p>Sem backend, API ou regra real.</p>
    </Panel>
  );
}

function ListDetailSourceList() {
  return <TaskQueueList />;
}

function ListDetailSourceMain() {
  return <TaskTable />;
}

function ListDetailSourceDetail() {
  return (
    <Panel className="sb-crm-list-detail-fixture-detail" aria-label="Detalhe da tarefa">
      <header>
        <span>Aberta</span>
        <button aria-label="Fechar detalhe" type="button">×</button>
        <h3>Confirmar reposição da Ana</h3>
      </header>
      <dl>
        <div><dt>Origem canônica</dt><dd>Agenda / Reposições</dd></div>
        <div><dt>Dono / fila</dt><dd>Recepção</dd></div>
        <div><dt>Prazo</dt><dd>Hoje</dd></div>
        <div><dt>Prioridade</dt><dd>Média</dd></div>
      </dl>
      <section>
        <h4>Checklist / subtarefas</h4>
        <button type="button">1. Verificar horários disponíveis</button>
        <button type="button">2. Confirmar com Ana</button>
        <button type="button">3. Atualizar reposição na agenda</button>
      </section>
      <section>
        <h4>Comentários</h4>
        <p>Ana Silva pediu reposição quinta 08h.</p>
        <p>Recepção não encontrou vaga ainda.</p>
      </section>
      <footer>
        <button className="sb-crm-list-detail-fixture-primary" type="button">Abrir origem</button>
        <div>
          <button type="button">Assumir</button>
          <button type="button">Concluir</button>
          <button type="button">Delegar</button>
        </div>
      </footer>
    </Panel>
  );
}

function KanbanCardStory() {
  const [event, setEvent] = useState("idle");

  return (
    <StoryPage className="sb-crm-batch9-kanban-card-story">
      <SourceFrame className="sb-crm-batch9-kanban-card-source">
        <KanbanCard
          impact="aula sem reposicao"
          nextAction="encontrar opcao"
          onMenu={() => setEvent("source:menu")}
          onSelect={() => setEvent("source:select")}
          owner="Recepcao"
          state="manual disponivel"
          tags={["Tarefa", "Agenda"]}
          title={<>Reposicao da Ana<br />sem encaixe</>}
        />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source manual">
          <KanbanCard
            impact="aula sem reposicao"
            nextAction="encontrar opcao"
            onMenu={() => setEvent("manual:menu")}
            onSelect={() => setEvent("manual:select")}
            owner="Recepcao"
            state="manual disponivel"
            tags={["Tarefa", "Agenda"]}
            title={<>Reposicao da Ana<br />sem encaixe</>}
          />
        </PrimitiveState>
        <PrimitiveState label="selected">
          <KanbanCard
            impact="contato falhando"
            nextAction="corrigir dados"
            onMenu={() => setEvent("selected:menu")}
            onSelect={() => setEvent("selected:select")}
            owner="Recepcao"
            selected
            state="manual disponivel"
            tags={["Tarefa", "Dados"]}
            title={<>Telefone do responsavel<br />invalido</>}
          />
        </PrimitiveState>
        <PrimitiveState label="suggested / waiting">
          <div className="sb-crm-batch9-kanban-card-stack">
            <KanbanCard
              impact="resposta pendente"
              nextAction="responder"
              onMenu={() => setEvent("suggested:menu")}
              owner="Atendimento"
              state="copiloto sugeriu"
              tags={["Tarefa", "Inbox"]}
              title={<>Conversa da Julia<br />aguardando humano</>}
            />
            <KanbanCard
              impact="decisao pendente"
              nextAction="reenviar msg"
              onMenu={() => setEvent("waiting:menu")}
              owner="Recepcao"
              state="aguardando resposta"
              tags={["Tarefa", "Agenda"]}
              title={<>Aguardando retorno<br />do aluno</>}
            />
          </div>
        </PrimitiveState>
        <PrimitiveState label="blocked / resolved">
          <div className="sb-crm-batch9-kanban-card-stack">
            <KanbanCard
              impact="envio interrompido"
              nextAction="revisar cota"
              onMenu={() => setEvent("blocked:menu")}
              owner="Suporte"
              state="automacao bloqueada"
              tags={["Tarefa", "Sistema"]}
              title={<>WhatsApp com<br />falha de envio</>}
            />
            <KanbanCard
              impact="baixa concluida"
              nextAction="hoje 10:12"
              onMenu={() => setEvent("resolved:menu")}
              owner="Recepcao"
              state="resolvido"
              tags={["Tarefa", "Financeiro"]}
              title={<>Comprovante do Pedro<br />validado</>}
            />
          </div>
        </PrimitiveState>
        <PrimitiveState label="multi-status">
          <KanbanCard
            impact="recebimento"
            nextAction="revisar e aprovar"
            onMenu={() => setEvent("multi:menu")}
            owner="Gestora"
            state="manual disponivel"
            tags={["Decisao", "Financeiro"]}
            title={<>Aprovar mensagem<br />de cobranca</>}
          >
            <Chip className="tcrm-kanban-card__status" showDot={false} tone="info">cota</Chip>
          </KanbanCard>
        </PrimitiveState>
        <PrimitiveState label="disabled / blocked state">
          <div className="sb-crm-batch9-kanban-card-stack">
            <KanbanCard disabled state="manual disponivel" title="Atualizando pendencia" />
            <KanbanCard disabled state="blocked" title="Card bloqueado" />
          </div>
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event}</output>
    </StoryPage>
  );
}

function KanbanBoardStory() {
  const [selected, setSelected] = useState("card-1");
  const rail = (
    <PageQuickFilters
      aria-label="Filtros rápidos"
      items={[
        { id: "mine", icon: "user", label: "Minhas pendencias", selected: true },
        { id: "unowned", icon: "user", label: "Sem dono" },
        { id: "blocked", icon: "lock", label: "Bloqueadas", tone: "danger" },
        { id: "waiting", icon: "clock", label: "Aguardando resposta", tone: "warning" },
        { id: "quota", icon: "pieChart", label: "Cota / agente", tone: "info" }
      ]}
    />
  );

  return (
    <StoryPage className="sb-crm-batch9-kanban-board-story">
      <SourceFrame>
        <KanbanBoard aria-label="Kanban compacto" density="compact">
          <KanbanColumn count={5} footer={<Button leadingIcon="plus" size="sm" variant="ghost">Adicionar caso</Button>} title="Entrada">
            <KanbanCard footer={<><Chip showDot={false} tone="info">Conta</Chip><span>23/04</span></>} layout="compact" meta="Joao Silva" title="Solicitacao de acesso" />
            <KanbanCard footer={<><Chip showDot={false} tone="success">Acesso</Chip><span>23/04</span></>} layout="compact" meta="Maria Claro" title="Falha no envio de e-mail" />
            <KanbanCard footer={<><Chip showDot={false} tone="warning">Processo</Chip><span>23/04</span></>} layout="compact" meta="Carlos Lima" title="Envio de documentos" />
          </KanbanColumn>
          <KanbanColumn count={4} footer={<Button leadingIcon="plus" size="sm" variant="ghost">Adicionar caso</Button>} title="Em andamento">
            <KanbanCard footer={<><Chip showDot={false} tone="info">Integracao</Chip><span>23/04</span></>} layout="compact" meta="Nikol Clev" title="Integracao com ERP" />
            <KanbanCard footer={<><Chip showDot={false} tone="info">Relatorio</Chip><span>27/04</span></>} layout="compact" meta="Sam Frank" title="Relatorio mensal" />
            <KanbanCard footer={<><Chip showDot={false} tone="danger">Sistema</Chip><span>27/04</span></>} layout="compact" meta="Joao Silva" title="Configuracao de alerta" />
          </KanbanColumn>
          <KanbanColumn count={3} footer={<Button leadingIcon="plus" size="sm" variant="ghost">Adicionar caso</Button>} state="resolved" title="Concluidas">
            <KanbanCard footer={<><Chip showDot={false} tone="success">Acesso</Chip><span>26/04</span></>} layout="compact" meta="Sam Frank" title="Acesso negado" />
            <KanbanCard footer={<><Chip showDot={false} tone="info">Conta</Chip><span>26/04</span></>} layout="compact" meta="Nikol Clev" title="Senha redefinida" />
            <KanbanCard footer={<><Chip showDot={false} tone="danger">Sistema</Chip><span>25/04</span></>} layout="compact" meta="Joao Silva" title="E-mail configurado" />
          </KanbanColumn>
        </KanbanBoard>
      </SourceFrame>
      <KanbanBoard rail={rail}>
        <KanbanColumn count={3} title="Novo">
          <KanbanCard
            meta="Tarefa / Agenda"
            nextAction="encontrar opcao"
            onSelect={() => setSelected("card-1")}
            onMenu={() => setSelected("card-1-menu")}
            owner="Recepcao"
            selected={selected === "card-1"}
            state="manual disponivel"
            tags={["Tarefa", "Agenda"]}
            title={<>Reposicao da Ana<br />sem encaixe</>}
          />
          <KanbanCard impact="contato falhando" nextAction="corrigir dados" onMenu={() => setSelected("card-2-menu")} owner="Recepcao" state="manual disponivel" tags={["Tarefa", "Dados"]} title={<>Telefone do responsavel<br />invalido</>} />
          <KanbanCard impact="recebimento" nextAction="revisar e aprovar" onMenu={() => setSelected("card-3-menu")} owner="Gestora" state="manual disponivel" tags={["Decisao", "Financeiro"]} title={<>Aprovar mensagem<br />de cobranca</>}>
            <Chip className="tcrm-kanban-card__status" showDot={false} tone="info">cota</Chip>
          </KanbanCard>
        </KanbanColumn>
        <KanbanColumn count={3} title="Assumido">
          <KanbanCard impact="baixa pendente" nextAction="validar hoje" onMenu={() => setSelected("card-4-menu")} owner="Recepcao" state="manual disponivel" tags={["Tarefa", "Financeiro"]} title="Comprovante da Marina" />
          <KanbanCard impact="aluno sem aula" nextAction="confirmar hoje" onMenu={() => setSelected("card-5-menu")} owner="Instrutores" state="manual disponivel" tags={["Tarefa", "Agenda"]} title={<>Confirmar substituto<br />aula 18h</>} />
          <KanbanCard impact="plano desatualizado" nextAction="atualizar plano" onMenu={() => setSelected("card-6-menu")} owner="Recepcao" state="manual disponivel" tags={["Tarefa", "Financeiro"]} title="Atualizar plano da Juliana" />
        </KanbanColumn>
        <KanbanColumn count={3} title="Aguardando">
          <KanbanCard impact="resposta pendente" nextAction="responder" onMenu={() => setSelected("card-7-menu")} owner="Atendimento" state="copiloto sugeriu" tags={["Tarefa", "Inbox"]} title={<>Conversa da Julia<br />aguardando humano</>} />
          <KanbanCard impact="decisao pendente" nextAction="reenviar msg" onMenu={() => setSelected("card-8-menu")} owner="Recepcao" state="aguardando resposta" tags={["Tarefa", "Agenda"]} title={<>Aguardando retorno<br />do aluno</>} />
          <KanbanCard impact="matricula travada" nextAction="acompanhar" onMenu={() => setSelected("card-9-menu")} owner="Recepcao" state="manual disponivel" tags={["Tarefa", "Financeiro"]} title={<>Envio de contrato<br />para assinatura</>} />
        </KanbanColumn>
        <KanbanColumn count={3} state="blocked" title="Bloqueado">
          <KanbanCard impact="envio interrompido" nextAction="revisar cota" onMenu={() => setSelected("card-10-menu")} owner="Suporte" state="automacao bloqueada" tags={["Tarefa", "Sistema"]} title={<>WhatsApp com<br />falha de envio</>} />
          <KanbanCard impact="envio interrompido" nextAction="renovar cota" onMenu={() => setSelected("card-11-menu")} owner="Suporte" state="automacao bloqueada" tags={["Tarefa", "Sistema"]} title={<>Limite de WhatsApp<br />atingido</>} />
          <KanbanCard impact="dados nao sincronizam" nextAction="corrigir conexao" onMenu={() => setSelected("card-12-menu")} owner="Suporte" state="automacao bloqueada" tags={["Tarefa", "Sistema"]} title={<>Integracao com ERP<br />com erro</>} />
        </KanbanColumn>
        <KanbanColumn count={2} state="resolved" title="Resolvido">
          <KanbanCard impact="baixa concluida" nextAction="hoje 10:12" onMenu={() => setSelected("card-13-menu")} owner="Recepcao" state="resolvido" tags={["Tarefa", "Financeiro"]} title={<>Comprovante do Pedro<br />validado</>} />
          <KanbanCard impact="envio normalizado" nextAction="hoje 09:45" onMenu={() => setSelected("card-14-menu")} owner="Suporte" state="resolvido" tags={["Tarefa", "Sistema"]} title={<>Cota de WhatsApp<br />renovada</>} />
        </KanbanColumn>
      </KanbanBoard>
    </StoryPage>
  );
}

function KanbanColumnStory() {
  const [selected, setSelected] = useState("source-1");

  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="source image 21 - Novo column">
          <KanbanColumn count={3} data-testid="kanban-column-source" title="Novo">
            <KanbanCard
              impact="aula sem reposicao"
              nextAction="encontrar opcao"
              onMenu={() => setSelected("source-1-menu")}
              onSelect={() => setSelected("source-1")}
              owner="Recepcao"
              selected={selected === "source-1"}
              state="manual disponivel"
              tags={["Tarefa", "Agenda"]}
              title={<>Reposicao da Ana<br />sem encaixe</>}
            />
            <KanbanCard
              impact="contato falhando"
              nextAction="corrigir dados"
              onMenu={() => setSelected("source-2-menu")}
              owner="Recepcao"
              state="manual disponivel"
              tags={["Tarefa", "Dados"]}
              title={<>Telefone do responsavel invalido</>}
            />
            <KanbanCard
              impact="recebimento"
              nextAction="revisar e aprovar"
              onMenu={() => setSelected("source-3-menu")}
              owner="Gestora"
              state="manual disponivel"
              tags={["Decisao", "Financeiro"]}
              title={<>Aprovar mensagem<br />de cobranca</>}
            >
              <Chip className="tcrm-kanban-card__status" showDot={false} tone="info">cota</Chip>
            </KanbanCard>
          </KanbanColumn>
        </PrimitiveState>
        <PrimitiveState label="blocked lane tone">
          <KanbanColumn count={3} state="blocked" title="Bloqueado">
            <KanbanCard impact="envio interrompido" nextAction="revisar cota" onMenu={() => setSelected("blocked-menu")} owner="Suporte" state="automacao bloqueada" tags={["Tarefa", "Sistema"]} title={<>WhatsApp com<br />falha de envio</>} />
          </KanbanColumn>
        </PrimitiveState>
        <PrimitiveState label="resolved lane tone">
          <KanbanColumn count={2} state="resolved" title="Resolvido">
            <KanbanCard impact="baixa concluida" nextAction="hoje 10:12" onMenu={() => setSelected("resolved-menu")} owner="Recepcao" state="resolvido" tags={["Tarefa", "Financeiro"]} title={<>Comprovante do Pedro<br />validado</>} />
          </KanbanColumn>
        </PrimitiveState>
        <PrimitiveState label="waiting empty">
          <KanbanColumn count={0} emptyLabel="Sem pendencias aguardando resposta" state="waiting" title="Aguardando" />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <KanbanColumn count={1} loading title="Carregando">
            <KanbanCard disabled state="manual disponivel" title="Atualizando pendencia" />
          </KanbanColumn>
        </PrimitiveState>
        <PrimitiveState label="blocked operational">
          <KanbanColumn blocked count={1} title="Sem permissao">
            <KanbanCard disabled state="blocked" title="Card bloqueado" />
          </KanbanColumn>
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  );
}

function WeeklyCalendarStory() {
  const [selected, setSelected] = useState("ter-1700-reformer");
  return (
    <StoryPage>
      <WeeklyCalendar onEventSelect={setSelected} selectedEventId={selected} />
    </StoryPage>
  );
}

function MiniCalendarStory() {
  const [selected, setSelected] = useState("12");
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="source">
          <MiniCalendar onNextMonth={() => undefined} onPreviousMonth={() => undefined} onSelect={setSelected} selected={selected} />
        </PrimitiveState>
        <PrimitiveState label="disabled days">
          <MiniCalendar disabledDays={["4", "5"]} onSelect={setSelected} selected="12" />
        </PrimitiveState>
        <PrimitiveState label="today only">
          <MiniCalendar selected="" today="18" />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <MiniCalendar loading selected="12" />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <MiniCalendar blocked selected="12" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  );
}

function ClassCardStory() {
  const [selected, setSelected] = useState("ter-1700-reformer");
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="source selected/pending">
          <div style={{ height: "var(--taliya-layout-crm-class-card-selected-height)", width: "var(--taliya-layout-crm-class-card-selected-width)" }}>
            <ClassCard
              capacity="3/4"
              meta="Joao Silva"
              onSelect={() => setSelected("ter-1700-reformer")}
              selected={selected === "ter-1700-reformer"}
              state="pending"
              statusLabel="chamada pendente"
              time="17:00"
              title="Reformer Intermediario"
            />
          </div>
        </PrimitiveState>
        <PrimitiveState label="scheduled">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-width)" }}>
            <ClassCard capacity="4/6" meta="Joao Silva" state="scheduled" statusLabel="confirmada" time="07:00" title="Reformer Intermediario" />
          </div>
        </PrimitiveState>
        <PrimitiveState label="available">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-width)" }}>
            <ClassCard capacity="2/4" meta="Lucas Peres" state="available" statusLabel="vaga aberta" time="10:00" title="Tower" />
          </div>
        </PrimitiveState>
        <PrimitiveState label="full">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-width)" }}>
            <ClassCard capacity="6/6" meta="Joao Silva" state="full" statusLabel="lotado" time="08:00" title="Reformer Intermediario" />
          </div>
        </PrimitiveState>
        <PrimitiveState label="conflict">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-width)" }}>
            <ClassCard capacity="0/6" meta="Joao Silva" state="teacher-unavailable" statusLabel="prof. indisponivel" time="10:00" title="Reformer Intermediario" />
          </div>
        </PrimitiveState>
        <PrimitiveState label="replacement">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-selected-width)" }}>
            <ClassCard capacity="3/4" meta="Lucas Peres" state="replacement" statusLabel="reposicao" time="08:00" title="Tower" />
          </div>
        </PrimitiveState>
        <PrimitiveState label="disabled">
          <div style={{ height: "var(--taliya-layout-crm-class-card-height)", width: "var(--taliya-layout-crm-class-card-width)" }}>
            <ClassCard aria-disabled capacity="4/6" meta="Joao Silva" state="scheduled" statusLabel="confirmada" time="07:00" title="Reformer Intermediario" />
          </div>
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  );
}

function AuthCardStory() {
  const [event, setEvent] = useState("");
  return (
    <StoryPage className="sb-crm-batch9-auth-card-story">
      <PrimitiveMatrix>
        <PrimitiveState label="source signup - image 72">
          <SourceFrame className="sb-crm-batch9-auth-card-source">
            <AuthCard
              onGoogle={() => setEvent("google-signup")}
              onMicrosoft={() => setEvent("microsoft-signup")}
              onPrivacy={() => setEvent("privacy")}
              onSubmit={() => setEvent("submit-signup")}
              onSwitchMode={() => setEvent("switch-signin")}
              onTerms={() => setEvent("terms")}
            />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="source signin - image 73">
          <SourceFrame className="sb-crm-batch9-auth-card-source">
            <AuthCard
              mode="signin"
              onForgotPassword={() => setEvent("forgot")}
              onGoogle={() => setEvent("google-signin")}
              onMicrosoft={() => setEvent("microsoft-signin")}
              onSubmit={() => setEvent("submit-signin")}
              onSwitchMode={() => setEvent("switch-signup")}
            />
          </SourceFrame>
        </PrimitiveState>
      </PrimitiveMatrix>
      <PrimitiveMatrix>
        <PrimitiveState label="loading"><AuthCard loading mode="signin" /></PrimitiveState>
        <PrimitiveState label="signup error"><AuthCard error="Nao foi possivel enviar o link." /></PrimitiveState>
        <PrimitiveState label="error"><AuthCard error="Revise o email informado." mode="signin" /></PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event}</output>
    </StoryPage>
  );
}

function AccessShellStory() {
  const [event, setEvent] = useState("");
  return (
    <StoryPage className="sb-crm-batch9-access-shell-story">
      <SourceFrame className="sb-crm-batch9-access-shell-source">
        <AccessShell onAccount={() => setEvent("account")} onHelp={() => setEvent("help")} />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="content slot">
          <AccessShell
            context={<Chip>tenant novo</Chip>}
            help={<Chip tone="info">suporte disponivel</Chip>}
            onAccount={() => setEvent("account-content")}
            onHelp={() => setEvent("help-content")}
            summary={<Chip tone="success">assinatura ativa</Chip>}
          >
            <AuthCard />
          </AccessShell>
        </PrimitiveState>
        <PrimitiveState label="custom footer">
          <AccessShell
            footer={<AccessFooterLinks links={["Termos", "Privacidade", "Suporte"]} />}
            onAccount={() => setEvent("account-footer")}
            onHelp={() => setEvent("help-footer")}
          />
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event}</output>
    </StoryPage>
  );
}

const permissionMatrixRows: PermissionMatrixRow[] = [
  { id: "teacher-phone", permission: "Professor pode ver telefone/WhatsApp do aluno", currentValue: "Desligado", control: "toggle", checked: false },
  { id: "teacher-note", permission: "Professor pode adicionar observação", currentValue: "Ligado", control: "toggle", checked: true },
  { id: "frontdesk-payment", permission: "Recepção pode registrar pagamento", currentValue: "Ligado", control: "toggle", checked: true },
  { id: "frontdesk-plan-edit", permission: "Recepção pode editar plano do aluno", currentValue: "Desligado", control: "toggle", checked: false },
  {
    id: "frontdesk-discount",
    permission: "Recepção pode aplicar desconto simples",
    currentValue: "Até 10%",
    control: "select",
    value: "10",
    options: [
      { value: "0", label: "Sem desconto" },
      { value: "10", label: "Até 10%" },
      { value: "20", label: "Até 20%" }
    ]
  },
  {
    id: "frontdesk-cancel-charge",
    permission: "Recepção pode cancelar cobrança",
    currentValue: "Exige aprovação",
    control: "select",
    value: "approval",
    options: [
      { value: "approval", label: "Exige aprovação" },
      { value: "owner", label: "Somente Dono/Admin" },
      { value: "never", label: "Não permitido" }
    ]
  }
];

function PermissionMatrixStory() {
  const [event, setEvent] = useState<string | null>(null);
  const [rows, setRows] = useState<PermissionMatrixRow[]>(permissionMatrixRows);
  const markToggle = (rowId: string, checked: boolean) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === rowId && row.control === "toggle"
          ? { ...row, checked, currentValue: checked ? "Ligado" : "Desligado", dirty: true }
          : row
      )
    );
    setEvent(`toggle:${rowId}:${checked ? "ligado" : "desligado"}`);
  };
  const markSelect = (rowId: string, value: string, row: PermissionMatrixRow) => {
    if (row.control !== "select") return;
    const nextLabel = row.options.find((option) => option.value === value)?.label ?? value;
    setRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.id === rowId && currentRow.control === "select"
          ? { ...currentRow, value, currentValue: nextLabel, dirty: true }
          : currentRow
      )
    );
    setEvent(`select:${rowId}:${nextLabel}`);
  };

  const dirtyRows: PermissionMatrixRow[] = permissionMatrixRows.map((row) => {
    if (row.id === "teacher-phone" && row.control === "toggle") {
      return { ...row, checked: true, currentValue: "Ligado", dirty: true };
    }
    if (row.id === "frontdesk-discount" && row.control === "select") {
      return { ...row, value: "20", currentValue: "Até 20%", dirty: true };
    }
    return row;
  });

  return (
    <StoryPage className="sb-crm-batch9-permission-matrix-story">
      <SourceFrame className="sb-crm-batch9-permission-matrix-source">
        <PermissionMatrix onSelectChange={markSelect} onToggleChange={markToggle} rows={rows} />
      </SourceFrame>
      {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interação</Chip>}
      <PrimitiveMatrix>
        <PrimitiveState label="source - image 61">
          <PermissionMatrix onSelectChange={markSelect} onToggleChange={markToggle} rows={rows} />
        </PrimitiveState>
        <PrimitiveState label="dirty">
          <PermissionMatrix rows={dirtyRows} state="dirty" />
        </PrimitiveState>
        <PrimitiveState label="read-only">
          <PermissionMatrix readOnly state="read-only" />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <PermissionMatrix state="loading" />
        </PrimitiveState>
        <PrimitiveState label="empty">
          <PermissionMatrix rows={[]} state="empty" />
        </PrimitiveState>
        <PrimitiveState label="error">
          <PermissionMatrix state="error" />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <PermissionMatrix blockedReason="Somente Dono/Admin pode revisar permissões." state="blocked" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
    </StoryPage>
  );
}

const ruleRowFrequencyOptions = [
  { value: "immediate", label: "Imediato" },
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "silent-after-hours", label: "Silenciado fora do horário" }
];

function RuleRowStory() {
  const [event, setEvent] = useState<string | null>(null);
  const [criticalEnabled, setCriticalEnabled] = useState(true);
  const [criticalFrequency, setCriticalFrequency] = useState("immediate");

  const toggleCritical = (enabled: boolean) => {
    setCriticalEnabled(enabled);
    setEvent(`toggle:critical:${enabled ? "Ligado" : "Desligado"}`);
  };

  const selectCritical = (value: string) => {
    setCriticalFrequency(value);
    const label = ruleRowFrequencyOptions.find((option) => option.value === value)?.label ?? value;
    setEvent(`select:critical:${label}`);
  };

  return (
    <StoryPage className="sb-crm-batch9-rule-row-story">
      <SourceFrame className="sb-crm-batch9-rule-row-source">
        <RuleRow
          checked={criticalEnabled}
          icon="alert"
          iconTone="danger"
          onSelectChange={selectCritical}
          onToggle={toggleCritical}
          selectOptions={ruleRowFrequencyOptions}
          selectValue={criticalFrequency}
          statusLabel={criticalEnabled ? "Ligado" : "Desligado"}
          title="Crítico"
        />
      </SourceFrame>
      {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
      <PrimitiveMatrix>
        <PrimitiveState label="source critical - image 64">
          <RuleRow
            checked={criticalEnabled}
            icon="alert"
            iconTone="danger"
            onSelectChange={selectCritical}
            onToggle={toggleCritical}
            selectOptions={ruleRowFrequencyOptions}
            selectValue={criticalFrequency}
            statusLabel={criticalEnabled ? "Ligado" : "Desligado"}
            title="Crítico"
          />
        </PrimitiveState>
        <PrimitiveState label="operational">
          <RuleRow
            defaultSelectValue="daily"
            icon="alertCircle"
            iconTone="warning"
            onSelectChange={(value) => setEvent(`select:operational:${value}`)}
            onToggle={(enabled) => setEvent(`toggle:operational:${enabled}`)}
            selectOptions={ruleRowFrequencyOptions}
            title="Operacional"
          />
        </PrimitiveState>
        <PrimitiveState label="informative">
          <RuleRow
            defaultSelectValue="weekly"
            icon="info"
            iconTone="info"
            onSelectChange={(value) => setEvent(`select:info:${value}`)}
            onToggle={(enabled) => setEvent(`toggle:info:${enabled}`)}
            selectOptions={ruleRowFrequencyOptions}
            title="Informativo"
          />
        </PrimitiveState>
        <PrimitiveState label="off">
          <RuleRow
            checked={false}
            icon="minus"
            iconTone="neutral"
            onSelectChange={(value) => setEvent(`select:non-critical:${value}`)}
            onToggle={(enabled) => setEvent(`toggle:non-critical:${enabled}`)}
            selectOptions={ruleRowFrequencyOptions}
            selectValue="silent-after-hours"
            state="disabled"
            statusLabel="Desligado"
            title="Não crítico"
          />
        </PrimitiveState>
        <PrimitiveState label="value">
          <RuleRow control="value" icon="calendar" iconTone="info" showToggle={false} title="Tolerância de chamada" value="10 min" />
        </PrimitiveState>
        <PrimitiveState label="action">
          <RuleRow
            action={<Button onClick={() => setEvent("action:add-exception")} size="sm" variant="secondary">Adicionar</Button>}
            control="action"
            icon="calendar"
            iconTone="info"
            showToggle={false}
            title="Exceção"
          />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <RuleRow
            blockedReason="Regra bloqueada pelo plano"
            icon="lock"
            iconTone="neutral"
            selectValue="daily"
            state="blocked"
            statusLabel="Bloqueado"
            title="Regra bloqueada"
          />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <RuleRow icon="clock" iconTone="warning" loading selectValue="daily" state="loading" title="Salvando regra" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
    </StoryPage>
  );
}

function SettingsSectionStory() {
  const [event, setEvent] = useState<string | null>(null);
  const [manualSettlement, setManualSettlement] = useState(true);

  const rows: SettingsSectionRow[] = [
    { id: "due-date", icon: "calendar", iconTone: "info", label: "Vencimento padrão", value: "Dia 10" },
    { id: "late-tolerance", icon: "clock", iconTone: "warning", label: "Tolerância de atraso", value: "3 dias" },
    { id: "delinquent-after-tolerance", icon: "alert", iconTone: "warning", label: "Marcar inadimplente", value: "Após tolerância" },
    { id: "manual-settlement", icon: "tag", iconTone: "info", label: "Baixa manual", value: "Permitida", control: "toggle", checked: manualSettlement },
    { id: "simple-discount", icon: "percent", iconTone: "success", label: "Desconto simples", value: "Até 10%" },
    { id: "cancel-charge", icon: "x", iconTone: "danger", label: "Cancelar cobrança", value: "Exige aprovação" }
  ];

  const dirtyRows: SettingsSectionRow[] = rows.map((row) =>
    row.id === "due-date"
      ? { ...row, value: "Dia 12" }
      : row.id === "simple-discount"
        ? { ...row, value: "Até 15%" }
        : row
  );

  const handleRowAction = (row: SettingsSectionRow) => setEvent(`action:${row.id}`);
  const handleToggleChange = (row: SettingsSectionRow, checked: boolean) => {
    if (row.id === "manual-settlement") {
      setManualSettlement(checked);
    }
    setEvent(`toggle:${row.id}:${checked ? "on" : "off"}`);
  };

  return (
    <StoryPage className="sb-crm-batch9-settings-section-story">
      <SourceFrame className="sb-crm-batch9-settings-section-source">
        <SettingsSection rows={rows} onRowAction={handleRowAction} onToggleChange={handleToggleChange} />
      </SourceFrame>
      {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
      <PrimitiveMatrix>
        <PrimitiveState label="source financial rules - image 62">
          <SettingsSection rows={rows} onRowAction={handleRowAction} onToggleChange={handleToggleChange} />
        </PrimitiveState>
        <PrimitiveState label="saved">
          <SettingsSection rows={rows} state="saved" onRowAction={handleRowAction} onToggleChange={handleToggleChange} />
        </PrimitiveState>
        <PrimitiveState label="dirty">
          <SettingsSection rows={dirtyRows} state="dirty" onRowAction={handleRowAction} onToggleChange={handleToggleChange} />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <SettingsSection state="loading" />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <SettingsSection blockedReason="Somente Dono/Admin pode alterar regras financeiras." rows={rows} state="blocked" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
    </StoryPage>
  );
}

const storyRenderers = {
  ListDetailLayout: () => (
    <StoryPage className="sb-crm-batch9-list-detail-story">
      <SourceFrame className="sb-crm-batch9-list-detail-source">
        <ListDetailLayout
          detail={<ListDetailSourceDetail />}
          detailLabel="Detalhe da tarefa selecionada"
          list={<ListDetailSourceList />}
          listLabel="Filas de tarefas"
          mainLabel="Lista de tarefas"
        >
          <ListDetailSourceMain />
        </ListDetailLayout>
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source selected detail - image 23">
          <ListDetailLayout detail={<ListDetailSourceDetail />} list={<ListDetailSourceList />}>
            <ListDetailSourceMain />
          </ListDetailLayout>
        </PrimitiveState>
        <PrimitiveState label="closed detail">
          <ListDetailLayout detail={<ListDetailSourceDetail />} list={<ListDetailSourceList />} state="closed">
            <ListDetailSourceMain />
          </ListDetailLayout>
        </PrimitiveState>
        <PrimitiveState label="reusable children">
          <ListDetailLayout detail={<ContextPanel title="Detalhe" />} list={<ConversationList />}>
            <DemoPanel title="Conteudo principal" />
          </ListDetailLayout>
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  PageFilterBar: () => {
    const [event, setEvent] = useState("");
    const selectedFilters: PageFilterBarFilter[] = [
      { id: "owner", label: "Dono", kind: "multi" as const, values: ["recepcao"], options: [{ value: "recepcao", label: "Recepção", icon: "user" }, { value: "financeiro", label: "Financeiro", icon: "coins" }] },
      { id: "deadline", label: "Prazo", value: "hoje", options: [{ value: "hoje", label: "Hoje", icon: "calendar" }, { value: "amanha", label: "Amanhã", icon: "calendar" }] },
      { id: "origin", label: "Origem", value: "", options: [{ value: "agenda", label: "Agenda", icon: "calendar" }, { value: "dados", label: "Dados", icon: "database" }] },
      { id: "status", label: "Status", kind: "multi" as const, placement: "advanced", values: [], options: [{ value: "aberta", label: "Aberta", icon: "clipboard" }, { value: "atrasada", label: "Atrasada", icon: "alert" }] },
      { id: "priority", label: "Prioridade", placement: "advanced", value: "", options: [{ value: "alta", label: "Alta", icon: "alert" }, { value: "baixa", label: "Baixa", icon: "check" }] }
    ];

    return (
      <StoryPage className="sb-crm-batch9-page-filter-bar-story">
        <SourceFrame className="sb-crm-batch9-page-filter-bar-source">
          <PageFilterBar
            actions={<Button onClick={() => setEvent("criar tarefa")} size="sm" variant="primary">Criar tarefa</Button>}
            aria-label="Filtros da página"
            filters={selectedFilters}
            onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
            onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
            onSearchChange={(value) => setEvent(`busca ${value}`)}
            query="reposicao"
            searchAriaLabel="Buscar tarefas"
            searchFilterLabel="Abrir filtros avançados"
            searchPlaceholder="Buscar tarefas..."
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - operation padrão">
            <PageFilterBar
              actions={<Button onClick={() => setEvent("criar tarefa")} size="sm" variant="primary">Criar tarefa</Button>}
              aria-label="Filtros da página"
              filters={selectedFilters}
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              onSearchChange={(value) => setEvent(`busca ${value}`)}
              query=""
              searchAriaLabel="Buscar tarefas"
              searchFilterLabel="Abrir filtros avançados"
              searchPlaceholder="Buscar tarefas..."
            />
          </PrimitiveState>
          <PrimitiveState label="actions secundárias">
            <PageFilterBar
              actions={<><Button size="sm" variant="secondary">Criar tarefa</Button><Button size="sm" variant="ghost">Exportar</Button></>}
              aria-label="Filtros da página"
              filters={selectedFilters}
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              query="reposicao"
              searchAriaLabel="Buscar pendências"
              searchPlaceholder="Buscar pendências..."
            />
          </PrimitiveState>
          <PrimitiveState label="advanced modal">
            <PageFilterBar
              advancedFiltersDescription="Use quando a pagina tiver filtros demais para a barra principal."
              advancedFiltersSurface="modal"
              advancedFiltersTitle="Filtros avancados"
              aria-label="Filtros da pagina"
              filters={selectedFilters}
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              onSearchChange={(value) => setEvent(`busca ${value}`)}
              query=""
              searchAriaLabel="Buscar leads"
              searchFilterLabel="Abrir filtros avancados"
              searchPlaceholder="Buscar leads..."
            />
          </PrimitiveState>
          <PrimitiveState label="source - filtro embutido">
            <PageFilterBar
              actions={<Button onClick={() => setEvent("criar tarefa")} size="sm" variant="primary">Criar tarefa</Button>}
              aria-label="Filtros da pagina"
              filters={selectedFilters}
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              onSearchChange={(value) => setEvent(`busca ${value}`)}
              onSearchFilter={() => setEvent("abrir filtros")}
              query=""
              searchAriaLabel="Buscar tarefas"
              searchFilterLabel="Abrir filtros avancados"
              searchFilterPlacement="embedded"
              searchPlaceholder="Buscar tarefas..."
            />
          </PrimitiveState>
          <PrimitiveState label="overview sem busca">
            <PageFilterBar
              aria-label="Filtros financeiros"
              filters={[
                { id: "today", label: "Hoje", kind: "quick", selected: true },
                { id: "week", label: "Esta semana", kind: "quick" },
                { id: "month", label: "Este mes", kind: "quick" },
                { id: "unit", label: "Unidade", value: "", options: [{ value: "matriz", label: "Matriz", icon: "home" }, { value: "pinheiros", label: "Pinheiros", icon: "home" }] },
                { id: "status", label: "Status", value: "", options: [{ value: "atrasado", label: "Atrasado", icon: "alert" }, { value: "pago", label: "Pago", icon: "check" }] },
                { id: "owner", label: "Responsavel", value: "", options: [{ value: "financeiro", label: "Financeiro", icon: "coins" }, { value: "coordenacao", label: "Coordenacao", icon: "user" }] }
              ]}
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              searchVisible={false}
            />
          </PrimitiveState>
          <PrimitiveState label="stacked financeiro">
            <PageFilterBar
              advancedFiltersDescription="Filtros menos frequentes ficam no modal para preservar a largura da busca e dos controles principais."
              advancedFiltersSurface="modal"
              advancedFiltersTitle="Mais filtros"
              advancedFiltersTriggerVariant="button"
              aria-label="Filtros de movimentacoes"
              density="tight"
              filters={[
                { id: "today", label: "Hoje", kind: "quick", selected: true },
                { id: "week", label: "Esta semana", kind: "quick" },
                { id: "month", label: "Este mes", kind: "quick" },
                { id: "plan", label: "Plano", value: "", options: [{ value: "regular", label: "Regular", icon: "clipboard" }, { value: "vip", label: "VIP", icon: "star" }] },
                { id: "method", label: "Metodo", value: "", options: [{ value: "pix", label: "Pix", icon: "coins" }, { value: "card", label: "Cartao", icon: "creditCard" }] },
                { id: "owner", label: "Responsavel", value: "", options: [{ value: "financeiro", label: "Financeiro", icon: "coins" }, { value: "recepcao", label: "Recepcao", icon: "user" }] },
                { id: "origin", label: "Origem", placement: "advanced", value: "", options: [{ value: "asaas", label: "Asaas", icon: "database" }, { value: "manual", label: "Manual", icon: "clipboard" }] },
                { id: "channel", label: "Canal", placement: "advanced", value: "", options: [{ value: "whatsapp", label: "WhatsApp", icon: "message" }, { value: "email", label: "E-mail", icon: "mail" }] }
              ]}
              layout="stacked"
              onFilterSelect={(filter) => setEvent(`filtro ${filter.id}`)}
              onFilterValueChange={(filter, value) => setEvent(`filtro ${filter.id}=${String(value)}`)}
              onSearchChange={(value) => setEvent(`busca ${value}`)}
              query=""
              searchAriaLabel="Buscar movimentacoes"
              searchPlaceholder="Buscar movimentacoes..."
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <PageFilterBar aria-label="Filtros da página" filters={selectedFilters} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="disabled / blocked">
            <div className="sb-crm-batch9-page-filter-bar-stack">
              <PageFilterBar actions={<Button size="sm" variant="primary">Criar tarefa</Button>} aria-label="Filtros da página" filters={selectedFilters} state="disabled" />
              <PageFilterBar actions={<Button size="sm" variant="primary">Criar tarefa</Button>} aria-label="Filtros da página" filters={selectedFilters} state="blocked" />
            </div>
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event || "sem acao"}</output>
      </StoryPage>
    );
  },
  PageQuickFilters: () => {
    const [event, setEvent] = useState("sem acao");
    const [selected, setSelected] = useState("mine");
    const operationItems = [
      { id: "mine", icon: "user" as const, label: "Minhas pendencias", selected: selected === "mine" },
      { id: "unowned", icon: "user" as const, label: "Sem dono", selected: selected === "unowned" },
      { id: "blocked", icon: "lock" as const, label: "Bloqueadas", selected: selected === "blocked", tone: "danger" as const },
      { id: "waiting", icon: "clock" as const, label: "Aguardando resposta", selected: selected === "waiting", tone: "warning" as const },
      { id: "quota", icon: "pieChart" as const, label: "Cota / agente", selected: selected === "quota", tone: "info" as const }
    ];
    const taskItems = [
      { id: "my-tasks", icon: "user" as const, label: "Minhas tarefas", count: "12", selected: selected === "my-tasks" },
      { id: "today", icon: "calendar" as const, label: "Hoje", count: "6", selected: selected === "today" },
      { id: "late", icon: "clock" as const, label: "Atrasadas", count: "3", selected: selected === "late", tone: "danger" as const },
      { id: "unowned-tasks", icon: "user" as const, label: "Sem dono", count: "2", selected: selected === "unowned-tasks" },
      { id: "waiting-tasks", icon: "tag" as const, label: "Aguardando", count: "8", selected: selected === "waiting-tasks", tone: "warning" as const },
      { id: "checklists", icon: "clipboard" as const, label: "Checklists", count: "5", selected: selected === "checklists" },
      { id: "origin", icon: "graduation" as const, label: "Por origem", selected: selected === "origin" }
    ];
    const handleSelect = (item: { id: string }) => {
      setSelected(item.id);
      setEvent(`filtro ${item.id}`);
    };

    return (
      <StoryPage className="sb-crm-batch9-page-quick-filters-story">
        <SourceFrame className="sb-crm-batch9-page-quick-filters-source">
          <PageQuickFilters
            aria-label="Filtros rápidos"
            actions={<Button onClick={() => setEvent("novo filtro rapido")} size="sm" variant="secondary">Novo filtro</Button>}
            items={operationItems}
            onItemSelect={handleSelect}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - operacao">
            <PageQuickFilters
              aria-label="Filtros rápidos"
              actions={<Button onClick={() => setEvent("novo filtro rapido")} size="sm" variant="secondary">Novo filtro</Button>}
              items={operationItems}
              onItemSelect={handleSelect}
            />
          </PrimitiveState>
          <PrimitiveState label="filas - tarefas">
            <PageQuickFilters
              aria-label="Filas"
              groupLabel="Filas de tarefas"
              heading="Filas"
              items={taskItems}
              onItemSelect={handleSelect}
            />
          </PrimitiveState>
          <PrimitiveState label="filas - soft selection">
            <PageQuickFilters
              aria-label="Filas"
              groupLabel="Filas compactas"
              heading="Filas"
              items={taskItems}
              onItemSelect={handleSelect}
              selectionTone="soft"
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <PageQuickFilters aria-label="Filtros rápidos" state="loading" />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <PageQuickFilters aria-label="Filtros rápidos" items={[]} state="empty" />
          </PrimitiveState>
          <PrimitiveState label="blocked / disabled">
            <div className="sb-crm-batch9-page-quick-filters-stack">
              <PageQuickFilters aria-label="Filtros rápidos" items={operationItems} state="blocked" />
              <PageQuickFilters aria-label="Filtros rápidos" items={operationItems} state="disabled" />
            </div>
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  TaskQueueList: () => {
    const [event, setEvent] = useState("sem acao");
    const disabledItems = [
      { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user" as const, selected: true },
      { id: "today", label: "Hoje", count: "6", icon: "calendar" as const, disabled: true },
      { id: "late", label: "Atrasadas", count: "3", icon: "clock" as const, tone: "danger" as const }
    ];

    return (
      <StoryPage className="sb-crm-batch9-task-queue-list-story">
        <SourceFrame className="sb-crm-batch9-task-queue-list-source">
          <TaskQueueList onSelect={(item) => setEvent(`fila ${item.id}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 23">
            <TaskQueueList onSelect={(item) => setEvent(`fila ${item.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="disabled item">
            <TaskQueueList items={disabledItems} onSelect={(item) => setEvent(`fila ${item.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <TaskQueueList state="loading" />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <TaskQueueList state="empty" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <TaskQueueList state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  TaskTable: () => {
    const [event, setEvent] = useState("sem acao");

    return (
      <StoryPage className="sb-crm-batch9-task-table-story">
        <SourceFrame className="sb-crm-batch9-task-table-source">
          <TaskTable
            onItemsPerPageClick={() => setEvent("itens por pagina")}
            onNextPage={() => setEvent("proxima pagina")}
            onPreviousPage={() => setEvent("pagina anterior")}
            onRowSelect={(row) => setEvent(`tarefa ${row.id}`)}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 23">
            <TaskTable onRowSelect={(row) => setEvent(`tarefa ${row.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <TaskTable state="loading" />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <TaskTable state="empty" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <TaskTable state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ThreePaneLayout: () => (
    <StoryPage className="sb-crm-batch9-three-pane-story">
      <SourceFrame className="sb-crm-batch9-three-pane-source">
        <ThreePaneLayout
          center={<ConversationThread avatarSrc={source24AnaSilva} />}
          left={<ConversationList rows={sourceConversationRows} />}
          right={<ContextPanel avatarSrc={source24AnaSilva} />}
        />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="list">
          <ThreePaneLayout activePane="list" center={<ConversationThread avatarSrc={source24AnaSilva} />} left={<ConversationList rows={sourceConversationRows} />} right={<ContextPanel avatarSrc={source24AnaSilva} />} />
        </PrimitiveState>
        <PrimitiveState label="conversation">
          <ThreePaneLayout center={<ConversationThread avatarSrc={source24AnaSilva} />} left={<ConversationList rows={sourceConversationRows} />} right={<ContextPanel avatarSrc={source24AnaSilva} />} />
        </PrimitiveState>
        <PrimitiveState label="context">
          <ThreePaneLayout activePane="context" center={<ConversationThread avatarSrc={source24AnaSilva} />} left={<ConversationList rows={sourceConversationRows} />} right={<ContextPanel avatarSrc={source24AnaSilva} />} />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ContextPanel: () => (
    <StoryPage className="sb-crm-batch9-context-panel-story">
      <SourceFrame className="sb-crm-batch9-context-panel-source">
        <ContextPanel avatarSrc={source24AnaSilva} />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source"><ContextPanel avatarSrc={source24AnaSilva} /></PrimitiveState>
        <PrimitiveState label="blocked"><ContextPanel avatarSrc={source24AnaSilva} state="blocked" statusLabel="bloqueada" /></PrimitiveState>
        <PrimitiveState label="loading"><ContextPanel state="loading" /></PrimitiveState>
        <PrimitiveState label="empty"><ContextPanel state="empty" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  RightPanelLayout: () => (
    <StoryPage className="sb-crm-batch9-right-panel-story">
      <SourceFrame className="sb-crm-batch9-right-panel-source">
        <RightPanelLayout main={<RightPanelLayoutSourceMain />} panel={<RightPanelLayoutSourceRail />} />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source">
          <RightPanelLayout main={<RightPanelLayoutSourceMain />} panel={<RightPanelLayoutSourceRail />} />
        </PrimitiveState>
        <PrimitiveState label="compact">
          <RightPanelLayout main={<RightPanelLayoutSourceMain compact />} panel={<RightPanelLayoutSourceRail compact />} state="compact" />
        </PrimitiveState>
        <PrimitiveState label="collapsed">
          <RightPanelLayout main={<RightPanelLayoutSourceMain compact />} panel={<RightPanelLayoutSourceRail compact />} state="collapsed" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  DashboardGrid: () => (
    <StoryPage className="sb-crm-batch9-dashboard-grid-story">
      <SourceFrame className="sb-crm-batch9-dashboard-grid-source">
        <DashboardGrid columns="today">
          <DashboardGridSourcePanel label="Checklist do dia" />
          <DashboardGridSourcePanel label="Agora" wide />
          <DashboardGridSourcePanel label="Aulas de hoje" />
          <DashboardGridSourcePanel label="Fila humana" />
          <DashboardGridSourcePanel label="Bloqueios de hoje" />
          <DashboardGridSourcePanel label="Tarefas de hoje" />
          <DashboardGridSourcePanel label="Aprovações de hoje" wide />
          <DashboardGridSourcePanel label="Dinheiro hoje" wide />
        </DashboardGrid>
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source today">
          <DashboardGrid columns="today">
            <DashboardGridSourcePanel label="Checklist do dia" />
            <DashboardGridSourcePanel label="Agora" wide />
            <DashboardGridSourcePanel label="Aulas de hoje" />
            <DashboardGridSourcePanel label="Fila humana" />
            <DashboardGridSourcePanel label="Bloqueios de hoje" />
            <DashboardGridSourcePanel label="Tarefas de hoje" />
            <DashboardGridSourcePanel label="Aprovações de hoje" wide />
            <DashboardGridSourcePanel label="Dinheiro hoje" wide />
        </DashboardGrid>
      </PrimitiveState>
      <PrimitiveState label="1 coluna"><DashboardGrid columns={1}><Card>Conteudo full-width</Card></DashboardGrid></PrimitiveState>
      <PrimitiveState label="2 colunas"><DashboardGrid columns={2}><Card>A</Card><Card>B</Card></DashboardGrid></PrimitiveState>
      <PrimitiveState label="3 colunas"><DashboardGrid><Card>A</Card><Card>B</Card><Card>C</Card></DashboardGrid></PrimitiveState>
      <PrimitiveState label="assimetrico"><DashboardGrid columns="asymmetrical"><Card>Principal</Card><Card>Resumo</Card></DashboardGrid></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  MetricCard: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="default"><MetricCard label="Conversas hoje" value="128" trend="+12%" /></PrimitiveState>
        <PrimitiveState label="warning"><MetricCard label="Pendencias" tone="warning" value="9" trend="Revisar" /></PrimitiveState>
        <PrimitiveState label="danger"><MetricCard label="Bloqueios" tone="danger" value="3" trend="Critico" /></PrimitiveState>
        <PrimitiveState label="com acao"><MetricCard action={<Button size="sm" variant="secondary">Abrir</Button>} label="Oportunidades" tone="success" value="R$ 8.240" trend="+18%" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  StatusCard: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="ok"><StatusCard description="Tudo pronto para operar hoje." state="ok" title="Operacao saudavel" /></PrimitiveState>
        <PrimitiveState label="attention"><StatusCard description="Existem aprovacoes aguardando decisao." state="attention" title="Atencao necessaria" /></PrimitiveState>
        <PrimitiveState label="blocked"><StatusCard action={<Button size="sm" variant="secondary">Resolver</Button>} description="Alguns recursos estao bloqueados pelo plano." state="blocked" title="Plano bloqueando acoes" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  AgentPanel: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="setup"><AgentPanel role="Guia de configuracao" suggestions={["Revisar dados", "Chamar humano"]} title="Taliya Setup" /></PrimitiveState>
        <PrimitiveState label="operacao"><AgentPanel role="Copiloto operacional" suggestions={["Priorizar urgentes", "Abrir aprovacao"]} title="Agente de Operacao">Analise as tarefas do dia antes de sugerir proximos passos.</AgentPanel></PrimitiveState>
        <PrimitiveState label="blocked"><AgentPanel role="Permissao necessaria" state="blocked" title="Agente pausado">Este agente precisa de permissao para continuar.</AgentPanel></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  AgentStatus: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="active"><AgentStatus state="active" /></PrimitiveState>
        <PrimitiveState label="paused"><AgentStatus state="paused" /></PrimitiveState>
        <PrimitiveState label="helping"><AgentStatus state="helping" /></PrimitiveState>
        <PrimitiveState label="blocked"><AgentStatus state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  CopilotSuggestion: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="suggestion"><CopilotSuggestion action={<Button size="sm" variant="secondary">Aplicar</Button>} description="Mover esta tarefa para hoje reduz risco de atraso." title="Sugestao do copiloto" /></PrimitiveState>
        <PrimitiveState label="warning"><CopilotSuggestion description="Esta acao altera mensagem para uma aluna sensivel." state="warning" title="Revisar antes de enviar" /></PrimitiveState>
        <PrimitiveState label="approval"><CopilotSuggestion action={<Button size="sm" variant="secondary">Solicitar aprovacao</Button>} description="Precisa de decisao humana antes de executar." state="approval-needed" title="Aprovacao necessaria" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ProfileTabs: () => (
    <StoryPage>
      <SourceFrame className="sb-crm-batch9-profile-tabs-source">
        <ProfileTabs />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source resumo"><ProfileTabs /></PrimitiveState>
        <PrimitiveState label="agenda selected"><ProfileTabs defaultValue="agenda" /></PrimitiveState>
        <PrimitiveState label="financeiro selected"><ProfileTabs defaultValue="financeiro" /></PrimitiveState>
        <PrimitiveState label="documentos selected"><ProfileTabs defaultValue="documentos" /></PrimitiveState>
        <PrimitiveState label="historico selected"><ProfileTabs defaultValue="historico" /></PrimitiveState>
        <PrimitiveState label="tarefas selected"><ProfileTabs defaultValue="tarefas" /></PrimitiveState>
        <PrimitiveState label="disabled tab">
          <ProfileTabs
            items={[
              { value: "resumo", label: "Resumo", content: null },
              { value: "agenda", label: "Agenda", content: null },
              { value: "financeiro", label: "Financeiro", content: null, disabled: true },
              { value: "documentos", label: "Documentos", content: null },
              { value: "historico", label: "Hist\u00f3rico", content: null },
              { value: "tarefas", label: "Tarefas", content: null }
            ]}
          />
        </PrimitiveState>
        <PrimitiveState label="loading"><ProfileTabs state="loading" /></PrimitiveState>
        <PrimitiveState label="blocked"><ProfileTabs state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ActivityFeed: () => (
    <StoryPage>
      <SourceFrame className="sb-crm-batch9-activity-feed-source">
        <ActivityFeed
          items={[
            { id: "status", time: "10:24", title: "Sam Frank atualizou o status do caso #CS-1041 para Em andamento", category: "Caso", actor: "Sam Frank", avatarSrc: source25SamFrank, description: "Caso #CS-1041", icon: "info", tone: "blue" },
            { id: "comment", time: "10:15", title: "Nikol Clev comentou no caso #CS-1040", category: "Caso", actor: "Nikol Clev", avatarSrc: source24JuliaRamos, description: "Caso #CS-1040", icon: "circle", tone: "red" },
            { id: "attachment", time: "14:32", title: "Joao Silva anexou um arquivo no caso #CS-1036", category: "Atualizacao", actor: "Joao Silva", avatarSrc: source23CommentJoaoSilva, description: "Caso #CS-1036", icon: "paperclip", tone: "green" },
            { id: "priority", time: "11:03", title: "Maria Claro alterou a prioridade do caso #CS-1039 para Alta", category: "Atualizacao", actor: "Maria Claro", avatarSrc: source24MarinaLopes, description: "Caso #CS-1039", icon: "alert", tone: "red" },
            { id: "closed", time: "Ontem", title: "Sam Frank fechou o caso #CS-1037", category: "Caso", actor: "Sam Frank", avatarSrc: source25SamFrank, description: "Caso #CS-1037", icon: "check", tone: "green" }
          ]}
          title="Painel de atividade"
          variant="panel"
        />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source"><ActivityFeed /></PrimitiveState>
        <PrimitiveState label="compact"><ActivityFeed compact /></PrimitiveState>
        <PrimitiveState label="disabled item">
          <ActivityFeed
            items={[
              { id: "replacement-confirmed", hourLabel: "09h", time: "09:12", title: "Reposição confirmada", category: "Agenda / Reposições", actor: "Mariana", description: "Ana Paula aceitou quinta 09:00", icon: "calendar", tone: "blue", disabled: true },
              { id: "conversation-resolved", time: "09:28", title: "Conversa resolvida", category: "WhatsApp", actor: "Atendimento", description: "Gustavo recebeu retorno sobre plano trimestral", icon: "whatsapp", tone: "green" }
            ]}
          />
        </PrimitiveState>
        <PrimitiveState label="loading"><ActivityFeed state="loading" /></PrimitiveState>
        <PrimitiveState label="empty"><ActivityFeed state="empty" /></PrimitiveState>
        <PrimitiveState label="blocked"><ActivityFeed state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  AuditTrail: () => {
    const auditRows = [
      { id: "cs-1043", actor: "Sam Frank", actorAvatarSrc: source23CommentSamFrank, object: "#CS-1043", action: "Atualizou plano", time: "28/04/2024   10:24", origin: "Web", status: "success" as const },
      { id: "us-2087", actor: "Nikki Olaw", actorAvatarSrc: source24CarlaMenezes, object: "#US-2087", action: "Alterou limite", time: "28/04/2024   09:18", origin: "API", status: "success" as const },
      { id: "in-3021", actor: "Maria Lopes", actorAvatarSrc: source24MarinaLopes, object: "#IN-3021", action: "Revisou fatura", time: "27/04/2024   16:41", origin: "Web", status: "success" as const },
      { id: "cs-1039", actor: "Joao Silva", actorAvatarSrc: source23CommentJoaoSilva, object: "#CS-1039", action: "Aprovou desconto", time: "27/04/2024   14:12", origin: "Mobile", status: "success" as const },
      { id: "cs-1022", actor: "Carlos Lima", actorAvatarSrc: source24PedroSantos, object: "#CS-1022", action: "Removeu usuario", time: "27/04/2024   11:02", origin: "Sistema", status: "alert" as const }
    ];
    const noop = () => undefined;
    return (
      <StoryPage className="sb-crm-batch9-audit-trail-story">
        <SourceFrame className="sb-crm-batch9-audit-trail-source">
          <AuditTrail onOpenObject={noop} onRowClick={noop} onViewAll={noop} rows={auditRows} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source"><AuditTrail onOpenObject={noop} onRowClick={noop} onViewAll={noop} rows={auditRows} /></PrimitiveState>
          <PrimitiveState label="filtered"><AuditTrail onOpenObject={noop} onRowClick={noop} onViewAll={noop} rows={auditRows.slice(0, 3)} state="filtered" /></PrimitiveState>
          <PrimitiveState label="sensitive"><AuditTrail onOpenObject={noop} onRowClick={noop} onViewAll={noop} rows={auditRows.map((row, index) => index === 4 ? { ...row, status: "denied" as const, action: "Tentou remover usuario" } : row)} state="sensitive" /></PrimitiveState>
          <PrimitiveState label="loading"><AuditTrail state="loading" /></PrimitiveState>
          <PrimitiveState label="empty"><AuditTrail state="empty" /></PrimitiveState>
          <PrimitiveState label="error"><AuditTrail state="error" /></PrimitiveState>
          <PrimitiveState label="blocked"><AuditTrail state="blocked" /></PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  KanbanBoard: KanbanBoardStory,
  KanbanColumn: KanbanColumnStory,
  KanbanCard: KanbanCardStory,
  WeeklyCalendar: WeeklyCalendarStory,
  MiniCalendar: MiniCalendarStory,
  ClassCard: ClassCardStory,
  Roster: () => {
    const [event, setEvent] = useState("idle");
    const sourceStudents = [
      { id: "ana-carolina", name: "Ana Carolina Souza", initials: "AS", status: "pending" as const },
      { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" as const },
      { id: "felipe", name: "Felipe Andrade", avatarSrc: source29FelipeAndrade, status: "warned" as const, helper: "gera crédito" },
      { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show" as const, helper: "não gera crédito" },
      { id: "juliana", name: "Juliana Costa", avatarSrc: source29JulianaCosta, status: "replacement" as const, helper: "reposição usada" }
    ];

    return (
      <StoryPage className="sb-crm-batch9-roster-story">
        <SourceFrame className="sb-crm-batch9-roster-source">
          <Roster onStudentStatus={(student) => setEvent(`source:${student.id}`)} students={sourceStudents} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 29">
            <Roster onStudentStatus={(student) => setEvent(`state:${student.id}`)} students={sourceStudents} />
          </PrimitiveState>
          <PrimitiveState label="expected list variant">
            <Roster onStudentAction={(id) => setEvent(`expected:${id}`)} students={sourceStudents} variant="expected" />
          </PrimitiveState>
          <PrimitiveState label="legacy aliases">
            <Roster
              onStudentAction={(id) => setEvent(`alias:${id}`)}
              students={[
                { id: "present", name: "Estado presente", initials: "EP", state: "present" },
                { id: "absent", name: "Estado ausente", initials: "EA", state: "absent", helper: "gera crédito" },
                { id: "corrected", name: "Estado corrigido", initials: "EC", state: "corrected", helper: "reposição usada" }
              ]}
            />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <Roster disabled students={sourceStudents} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupShell: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-setup-shell-story">
        <SourceFrame className="sb-crm-batch9-setup-shell-source">
          <SetupShell
            avatarSrc={source51eLeticiaRamos}
            onAgentQuickReply={(question) => setEvent(`quick:${question}`)}
            onAgentSend={() => setEvent("send")}
            onBottomBarToggle={() => setEvent("toggle")}
            onHelp={() => setEvent("help")}
            onProfile={() => setEvent("profile")}
            onStepSelect={(stepId) => setEvent(`step:${stepId}`)}
            onStudioSelect={() => setEvent("studio")}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 51A">
            <SetupShell avatarSrc={source51eLeticiaRamos} />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <SetupShell avatarSrc={source51eLeticiaRamos} state="blocked" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <SetupShell avatarSrc={source51eLeticiaRamos} state="loading" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupStepper: () => (
    <StoryPage>
      <SourceFrame className="sb-crm-batch9-setup-stepper-source">
        <SetupStepper currentStep={2} onStepSelect={() => undefined} />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="blocked"><SetupStepper blockedStepIds={["planos"]} currentStep={2} onStepSelect={() => undefined} /></PrimitiveState>
        <PrimitiveState label="loading"><SetupStepper currentStep={2} disabled /></PrimitiveState>
        <PrimitiveState label="horizontal"><SetupStepper blockedStepIds={["planos"]} currentStep={2} onStepSelect={() => undefined} orientation="horizontal" showProgress /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  SetupBlockHeader: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage>
        <SourceFrame className="sb-crm-batch9-setup-block-header-source">
          <SetupBlockHeader onAction={() => setEvent("source-action")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="current"><SetupBlockHeader onAction={() => setEvent("current-action")} state="current" /></PrimitiveState>
          <PrimitiveState label="complete"><SetupBlockHeader onAction={() => setEvent("complete-action")} state="complete" step={8} /></PrimitiveState>
          <PrimitiveState label="warning"><SetupBlockHeader onAction={() => setEvent("warning-action")} state="warning" step={4} /></PrimitiveState>
          <PrimitiveState label="blocked"><SetupBlockHeader onAction={() => setEvent("blocked-action")} state="blocked" step={5} /></PrimitiveState>
          <PrimitiveState label="loading"><SetupBlockHeader loading step={2} /></PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupBottomBar: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage>
        <SourceFrame className="sb-crm-batch9-setup-bottom-bar-source">
          <SetupBottomBar
            onContinue={() => setEvent("source-warning")}
            onToggle={() => setEvent("source-toggle")}
            progress={32}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="pending">
            <SetupBottomBar onContinue={() => setEvent("pending-warning")} onToggle={() => setEvent("pending-toggle")} progress={32} />
          </PrimitiveState>
          <PrimitiveState label="ready">
            <SetupBottomBar onContinue={() => setEvent("ready-status")} onPublish={() => setEvent("ready-publish")} onToggle={() => setEvent("ready-toggle")} progress={100} state="ready" />
          </PrimitiveState>
          <PrimitiveState label="draft">
            <SetupBottomBar onSave={() => setEvent("draft-save")} onToggle={() => setEvent("draft-toggle")} progress={12} state="draft" />
          </PrimitiveState>
          <PrimitiveState label="published">
            <SetupBottomBar collapsed={false} onContinue={() => setEvent("published-status")} onToggle={() => setEvent("published-toggle")} progress={100} state="published" />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <SetupBottomBar disabled progress={70} state="saved" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupWelcome: () => {
    const [studioName, setStudioName] = useState("");
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage>
        <SourceFrame className="sb-crm-batch9-setup-welcome-source">
          <SetupWelcome
            onStart={() => setEvent("source-start")}
            onStudioNameChange={setStudioName}
            studioName={studioName}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="first visit">
            <SetupWelcome onStart={() => setEvent("first-start")} onStudioNameChange={setStudioName} />
          </PrimitiveState>
          <PrimitiveState label="returning">
            <SetupWelcome onStart={() => setEvent("returning-start")} onStudioNameChange={setStudioName} state="returning" studioName="Studio Letícia" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <SetupWelcome state="loading" studioName="Studio Letícia" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <SetupWelcome disabled state="blocked" studioName="Studio Letícia" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupChoiceCard: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage>
        <SourceFrame className="sb-crm-batch9-setup-choice-card-source">
          <SetupChoiceCard onSelect={() => setEvent("source-select")} selected />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="default">
            <SetupChoiceCard
              description="Cobrança recorrente por período."
              icon="calendar"
              onSelect={() => setEvent("default-select")}
              title="Mensalidade"
            />
          </PrimitiveState>
          <PrimitiveState label="selected">
            <SetupChoiceCard onSelect={() => setEvent("selected-select")} selected />
          </PrimitiveState>
          <PrimitiveState label="recommended">
            <SetupChoiceCard
              description="Combina mensalidade e pacotes."
              icon="calendar"
              onSelect={() => setEvent("recommended-select")}
              state="recommended"
              title="Híbrido"
            />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <SetupChoiceCard disabled title="Pacote bloqueado" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupContentGrid: () => (
    <StoryPage>
      <SourceFrame>
        <SetupContentGrid>
          <StatusCard title="Studio" description="Dados principais preparados." state="ok" />
          <StatusCard title="Equipe" description="Convites pendentes." state="warning" />
          <StatusCard title="Canais" description="WhatsApp conectado." state="ok" />
        </SetupContentGrid>
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="3 colunas">
          <SetupContentGrid>
            <SetupChoiceCard />
            <SetupChoiceCard state="recommended" />
            <SetupChoiceCard state="selected" />
          </SetupContentGrid>
        </PrimitiveState>
        <PrimitiveState label="compacto">
          <SetupContentGrid density="compact">
            <IntegrationStatusRow />
            <SetupChoiceCard state="selected" />
            <SetupChoiceCard state="disabled" />
          </SetupContentGrid>
        </PrimitiveState>
        <PrimitiveState label="full width">
          <SetupContentGrid columns={1}>
            <ConfigImpactPreview />
          </SetupContentGrid>
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  SetupImportSourceCard: () => {
    const [event, setEvent] = useState("idle");

    return (
      <StoryPage>
        <SourceFrame className="sb-crm-batch9-setup-import-source-card-source">
          <SetupImportSourceCard onSelect={() => setEvent("source-select")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="pending">
            <SetupImportSourceCard onSelect={() => setEvent("pending-select")} />
          </PrimitiveState>
          <PrimitiveState label="selected">
            <SetupImportSourceCard onSelect={() => setEvent("selected-select")} selected />
          </PrimitiveState>
          <PrimitiveState label="imported">
            <SetupImportSourceCard
              description="Caderno, ficha ou print"
              icon="camera"
              onSelect={() => setEvent("imported-select")}
              state="imported"
              title="Enviar foto/anotação"
            />
          </PrimitiveState>
          <PrimitiveState label="error">
            <SetupImportSourceCard
              description="Nomes e telefones"
              icon="menu"
              onSelect={() => setEvent("error-select")}
              state="error"
              title="Colar lista"
            />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <SetupImportSourceCard
              description="Um aluno por vez"
              disabled
              icon="users"
              title="Adicionar manualmente"
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupReviewPanel: () => {
    const [event, setEvent] = useState("idle");
    const callbacks = {
      onBack: () => setEvent("back"),
      onSaveDraft: () => setEvent("save-draft"),
      onPublish: () => setEvent("publish"),
      onResolveBlocking: () => setEvent("resolve-blocking"),
      onReviewWarnings: () => setEvent("review-warnings"),
      onOpenArea: (area: string) => setEvent(`open-${area}`),
      onConfirmChange: (confirmed: boolean) => setEvent(`confirm-${confirmed}`)
    };

    return (
      <StoryPage className="sb-crm-batch9-setup-review-panel-story">
        <SourceFrame className="sb-crm-batch9-setup-review-panel-source">
          <SetupReviewPanel {...callbacks} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="ready"><SetupReviewPanel {...callbacks} /></PrimitiveState>
          <PrimitiveState label="pending"><SetupReviewPanel {...callbacks} state="pending" /></PrimitiveState>
          <PrimitiveState label="blocked"><SetupReviewPanel {...callbacks} state="blocked" /></PrimitiveState>
          <PrimitiveState label="published"><SetupReviewPanel {...callbacks} state="published" /></PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupAgentChat: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-setup-agent-chat-story">
        <SourceFrame className="sb-crm-batch9-setup-agent-chat-source">
          <SetupAgentChat
            onClose={() => setEvent("source:close")}
            onHumanHelp={() => setEvent("source:human-help")}
            onMenu={() => setEvent("source:menu")}
            onQuickReply={(id) => setEvent(`source:quick:${id}`)}
            onSend={(value) => setEvent(`source:send:${value}`)}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 51B / guide">
            <SetupAgentChat
              onClose={() => setEvent("guide:close")}
              onHumanHelp={() => setEvent("guide:human-help")}
              onMenu={() => setEvent("guide:menu")}
              onQuickReply={(id) => setEvent(`guide:quick:${id}`)}
              onSend={(value) => setEvent(`guide:send:${value}`)}
            />
          </PrimitiveState>
          <PrimitiveState label="human help selected">
            <SetupAgentChat
              defaultValue="Preciso de ajuda para importar a agenda"
              onHumanHelp={() => setEvent("human-help")}
              onQuickReply={(id) => setEvent(`human-help:quick:${id}`)}
              onSend={(value) => setEvent(`human-help:send:${value}`)}
              state="human-help"
            />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <SetupAgentChat
              defaultValue="Aguardando permissão"
              onHumanHelp={() => setEvent("blocked:human-help")}
              onQuickReply={(id) => setEvent(`blocked:quick:${id}`)}
              onSend={(value) => setEvent(`blocked:send:${value}`)}
              state="blocked"
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SetupHumanHelpCTA: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-setup-human-help-cta-story">
        <SourceFrame className="sb-crm-batch9-setup-human-help-cta-source">
          <SetupHumanHelpCTA onSchedule={() => setEvent("source:schedule")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source schedule - image 78">
            <SetupHumanHelpCTA onSchedule={() => setEvent("schedule")} />
          </PrimitiveState>
          <PrimitiveState label="active">
            <SetupHumanHelpCTA onSchedule={() => setEvent("active")} state="active" />
          </PrimitiveState>
          <PrimitiveState label="unavailable">
            <SetupHumanHelpCTA onSchedule={() => setEvent("unavailable")} state="unavailable" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  AccessShell: AccessShellStory,
  AuthCard: AuthCardStory,
  AccessFooterLinks: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-access-footer-links-story">
        <SourceFrame className="sb-crm-batch9-access-footer-links-source">
          <AccessFooterLinks onLinkClick={(link) => setEvent(`source:${link}`)} variant="shell" />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source footer row - image 71">
            <AccessFooterLinks onLinkClick={(link) => setEvent(`source-state:${link}`)} variant="shell" />
          </PrimitiveState>
          <PrimitiveState label="cluster">
            <AccessFooterLinks onLinkClick={(link) => setEvent(`cluster:${link}`)} />
          </PrimitiveState>
          <PrimitiveState label="custom links">
            <AccessFooterLinks links={["Termos", "Privacidade", "Suporte"]} onLinkClick={(link) => setEvent(`custom:${link}`)} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  CheckoutPaymentCard: () => (
    <StoryPage className="sb-crm-batch9-checkout-payment-story">
      <SourceFrame className="sb-crm-batch9-checkout-payment-source">
        <CheckoutPaymentCard />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="default"><CheckoutPaymentCard /></PrimitiveState>
        <PrimitiveState label="coupon applied"><CheckoutPaymentCard couponDefaultValue="LUME10" state="coupon-applied" /></PrimitiveState>
        <PrimitiveState label="coupon error"><CheckoutPaymentCard couponDefaultValue="EXPIRADO" state="coupon-error" /></PrimitiveState>
        <PrimitiveState label="loading"><CheckoutPaymentCard loading /></PrimitiveState>
        <PrimitiveState label="blocked"><CheckoutPaymentCard state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  CheckoutReviewPanel: () => (
    <StoryPage className="sb-crm-batch9-checkout-review-story">
      <SourceFrame className="sb-crm-batch9-checkout-review-source">
        <CheckoutReviewPanel />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="default"><CheckoutReviewPanel /></PrimitiveState>
        <PrimitiveState label="coupon applied"><CheckoutReviewPanel paymentCardProps={{ couponDefaultValue: "LUME10", state: "coupon-applied" }} /></PrimitiveState>
        <PrimitiveState label="loading"><CheckoutReviewPanel loading /></PrimitiveState>
        <PrimitiveState label="blocked"><CheckoutReviewPanel blockedReason="Pagamento temporariamente indisponível" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  SubscriptionStatusCard: () => (
    <StoryPage className="sb-crm-batch9-subscription-status-story">
      <SourceFrame className="sb-crm-batch9-subscription-status-source">
        <SubscriptionStatusCard />
      </SourceFrame>
      <SourceFrame className="sb-crm-batch9-subscription-status-source">
        <SubscriptionStatusCard state="failed" />
      </SourceFrame>
      <SourceFrame className="sb-crm-batch9-subscription-confirmed-source">
        <SubscriptionStatusCard state="confirmed" />
      </SourceFrame>
    </StoryPage>
  ),
  SubscriptionProgressStepper: () => (
    <StoryPage className="sb-crm-batch9-subscription-progress-story">
      <SourceFrame className="sb-crm-batch9-subscription-stepper-source"><SubscriptionProgressStepper state="initiated" /></SourceFrame>
      <SourceFrame className="sb-crm-batch9-subscription-stepper-source"><SubscriptionProgressStepper state="verifying" /></SourceFrame>
      <SourceFrame className="sb-crm-batch9-subscription-stepper-source"><SubscriptionProgressStepper state="released" /></SourceFrame>
    </StoryPage>
  ),
  SubscriptionResolutionPanel: () => (
    <StoryPage className="sb-crm-batch9-subscription-resolution-story">
      <SourceFrame className="sb-crm-batch9-subscription-resolution-source">
        <SubscriptionResolutionPanel />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="failed"><SubscriptionResolutionPanel /></PrimitiveState>
        <PrimitiveState label="retrying"><SubscriptionResolutionPanel retrying /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ConfirmedSetupHandoff: () => (
    <StoryPage className="sb-crm-batch9-confirmed-handoff-story">
      <SourceFrame className="sb-crm-batch9-confirmed-handoff-source">
        <ConfirmedSetupHandoff />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="ready"><ConfirmedSetupHandoff /></PrimitiveState>
        <PrimitiveState label="starting"><ConfirmedSetupHandoff state="starting" /></PrimitiveState>
        <PrimitiveState label="blocked"><ConfirmedSetupHandoff state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  SubscriptionResultHeader: () => (
    <StoryPage className="sb-crm-batch9-confirmed-handoff-story">
      <SourceFrame className="sb-crm-batch9-confirmed-handoff-source">
        <SubscriptionResultHeader />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="confirmed"><SubscriptionResultHeader /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  PlanSummaryCard: () => (
    <StoryPage className="sb-crm-batch9-plan-summary-story">
      <SourceFrame className="sb-crm-batch9-plan-summary-active-source">
        <PlanSummaryCard />
      </SourceFrame>
      <SourceFrame className="sb-crm-batch9-plan-summary-review-source">
        <PlanSummaryCard state="review" />
      </SourceFrame>
      <SourceFrame className="sb-crm-batch9-plan-summary-confirmed-source">
        <PlanSummaryCard state="confirmed" />
      </SourceFrame>
      <SourceFrame className="sb-crm-batch9-plan-summary-failed-source">
        <PlanSummaryCard state="failed" />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="active"><PlanSummaryCard /></PrimitiveState>
        <PrimitiveState label="review"><PlanSummaryCard state="review" /></PrimitiveState>
        <PrimitiveState label="confirmed"><PlanSummaryCard state="confirmed" /></PrimitiveState>
        <PrimitiveState label="failed"><PlanSummaryCard state="failed" /></PrimitiveState>
        <PrimitiveState label="loading"><PlanSummaryCard loading /></PrimitiveState>
        <PrimitiveState label="blocked"><PlanSummaryCard blockedReason="Troca de plano bloqueada pelo owner" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  InvoiceTable: () => {
    const failedRows = [
      { id: "jul-2026", period: "Julho/2026", dueDate: "12/07", amount: "R$ 799,00", status: "failed" as const, method: "Cartão 4242" },
      { id: "jun-2026", period: "Junho/2026", dueDate: "12/06", amount: "R$ 799,00", status: "pending" as const, method: "Cartão 4242" }
    ];

    return (
      <StoryPage className="sb-crm-batch9-invoice-table-story">
        <SourceFrame className="sb-crm-batch9-invoice-table-source">
          <InvoiceTable />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source">
            <InvoiceTable onDownload={() => undefined} onOpen={() => undefined} />
          </PrimitiveState>
          <PrimitiveState label="failed">
            <InvoiceTable onRetry={() => undefined} rows={failedRows} />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <InvoiceTable loading />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <InvoiceTable rows={[]} />
          </PrimitiveState>
          <PrimitiveState label="error">
            <InvoiceTable error="Nao foi possivel carregar o historico." />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <InvoiceTable blockedReason="Acoes bloqueadas pelo owner" />
          </PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  AddOnCard: () => {
    const [action, setAction] = useState<string | null>(null);
    const handleAction = (state: "available" | "active" | "plan-max" | "consult" | "unavailable") => setAction(`action:${state}`);

    return (
      <StoryPage className="sb-crm-batch9-addon-card-story">
        <SourceFrame className="sb-crm-batch9-addon-card-source">
          <div className="sb-crm-batch9-addon-card-source-grid">
            <AddOnCard onAction={handleAction} state="available" />
            <AddOnCard onAction={handleAction} state="plan-max" />
            <AddOnCard onAction={handleAction} state="consult" />
          </div>
        </SourceFrame>
        {action ? <Chip tone="success">{action}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="available - image 67">
            <AddOnCard onAction={handleAction} state="available" />
          </PrimitiveState>
          <PrimitiveState label="plan max - image 67">
            <AddOnCard onAction={handleAction} state="plan-max" />
          </PrimitiveState>
          <PrimitiveState label="consult - image 67">
            <AddOnCard onAction={handleAction} state="consult" />
          </PrimitiveState>
          <PrimitiveState label="active">
            <AddOnCard onAction={handleAction} state="active" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <AddOnCard loading state="available" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <AddOnCard blockedReason="Upgrade bloqueado pelo owner" state="available" />
          </PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  QuotaProgress: () => {
    const [action, setAction] = useState<string | null>(null);
    const handleAction = (nextAction: "ledger" | "add-ons") => setAction(`action:${nextAction}`);

    return (
      <StoryPage className="sb-crm-batch9-quota-progress-story">
        <SourceFrame className="sb-crm-batch9-quota-progress-source">
          <QuotaProgress onAction={handleAction} value={42} />
        </SourceFrame>
        {action ? <Chip tone="success">{action}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="normal - image 68">
            <QuotaProgress onAction={handleAction} value={42} />
          </PrimitiveState>
          <PrimitiveState label="70">
            <QuotaProgress badgeLabel="70%" onAction={handleAction} value={70} />
          </PrimitiveState>
          <PrimitiveState label="90">
            <QuotaProgress alertLabel="Economia entra automaticamente em 90%." badgeLabel="90%" onAction={handleAction} value={90} />
          </PrimitiveState>
          <PrimitiveState label="100">
            <QuotaProgress alertLabel="Automacao paga pausa em 100%; CRM manual continua." badgeLabel="100%" onAction={handleAction} value={100} />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <QuotaProgress loading="add-ons" value={42} />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <QuotaProgress blockedReason="Pacotes bloqueados pelo owner" value={100} />
          </PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  UsageLedgerTable: () => {
    const [event, setEvent] = useState<string | null>(null);

    return (
      <StoryPage className="sb-crm-batch9-usage-ledger-story">
        <SourceFrame className="sb-crm-batch9-usage-ledger-source">
          <UsageLedgerTable
            onAction={(row, action) => setEvent(`${action}:${row.id}`)}
            onFilterClick={(filter) => setEvent(`filter:${filter.id}`)}
            onLoadMore={() => setEvent("load-more")}
          />
        </SourceFrame>
        {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 69">
            <UsageLedgerTable
              onAction={(row, action) => setEvent(`${action}:${row.id}`)}
              onFilterClick={(filter) => setEvent(`filter:${filter.id}`)}
              onLoadMore={() => setEvent("load-more")}
            />
          </PrimitiveState>
          <PrimitiveState label="estimated + reprocessed">
            <UsageLedgerTable
              rows={[
                { id: "estimated", when: "Hoje 17:45", origin: "ai", agentFlow: "Agenda · Correção de presença", caseLabel: "Aprovação preparada", usage: "1 estimada", status: "estimated", statusLabel: "Estimada", actionLabel: "Abrir aprovação" },
                { id: "reprocessed", when: "Ontem 11:08", origin: "whatsapp", agentFlow: "Atendimento · Reenvio de mensagem", caseLabel: "Falha recuperada", usage: "1 mensagem", status: "reprocessed", actionLabel: "Abrir execução" }
              ]}
              onAction={(row, action) => setEvent(`${action}:${row.id}`)}
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <UsageLedgerTable loading />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <UsageLedgerTable rows={[]} />
          </PrimitiveState>
          <PrimitiveState label="error">
            <UsageLedgerTable error="Tente atualizar o extrato em alguns segundos." />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <UsageLedgerTable blockedReason="Extrato bloqueado para este perfil" />
          </PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  ApprovalPanel: () => {
    const [event, setEvent] = useState<string | null>(null);
    const recentComment = {
      author: "Sam Frank",
      time: "Hoje, 09:20",
      body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço.",
      avatarSrc: source25SamFrank
    };
    const sourceApprovalSections = [
      {
        id: "context",
        title: "Contexto resumido",
        body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
      },
      {
        id: "proposal",
        title: "Proposta principal",
        badge: "Sugestão do copiloto",
        variant: "suggestion" as const,
        body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
      },
      {
        id: "impact",
        title: "Impasto esperado",
        body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
      },
      {
        id: "policy",
        title: "Política / guardrail aplicado",
        body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
      }
    ];

    return (
      <StoryPage className="sb-crm-batch9-approval-panel-story">
        <SourceFrame className="sb-crm-batch9-approval-panel-source">
          <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} />
        </SourceFrame>
        {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interação</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="source pending - image 25">
            <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} />
          </PrimitiveState>
          <PrimitiveState label="approved">
            <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="approved" />
          </PrimitiveState>
          <PrimitiveState label="rejected">
            <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="rejected" />
          </PrimitiveState>
          <PrimitiveState label="expired">
            <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="expired" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <ApprovalPanel onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <ApprovalPanel blockedReason="Aprovação bloqueada por política" onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
      </StoryPage>
    );
  },
  ImpactSummary: () => (
    <StoryPage className="sb-crm-batch9-impact-summary-story">
      <SourceFrame className="sb-crm-batch9-impact-summary-source">
        <ImpactSummary />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source medium - image 61"><ImpactSummary /></PrimitiveState>
        <PrimitiveState label="low"><ImpactSummary state="low" /></PrimitiveState>
        <PrimitiveState label="high"><ImpactSummary state="high" /></PrimitiveState>
        <PrimitiveState label="loading"><ImpactSummary state="loading" /></PrimitiveState>
        <PrimitiveState label="blocked"><ImpactSummary state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  BeforeAfterDiff: () => {
    const [event, setEvent] = useState<string | null>(null);
    const approve = () => setEvent("approve");
    const reject = () => setEvent("reject");
    const revert = () => setEvent("revert");
    const openRow = (rowId: string) => setEvent(`row:${rowId}`);

    return (
      <StoryPage className="sb-crm-batch9-before-after-diff-story">
        <SourceFrame className="sb-crm-batch9-before-after-diff-source">
          <BeforeAfterDiff actorAvatarSrc={source25SamFrank} onApprove={approve} onRevert={revert} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source settings - image 15">
            <BeforeAfterDiff actorAvatarSrc={source25SamFrank} onApprove={approve} onRevert={revert} onRowClick={openRow} />
          </PrimitiveState>
          <PrimitiveState label="text">
            <BeforeAfterDiff actorAvatarSrc={source25SamFrank} onApprove={approve} onReject={reject} onRevert={revert} variant="text" />
          </PrimitiveState>
          <PrimitiveState label="policy">
            <BeforeAfterDiff actorAvatarSrc={source25SamFrank} onApprove={approve} onReject={reject} onRevert={revert} variant="policy" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <BeforeAfterDiff state="loading" />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <BeforeAfterDiff state="empty" />
          </PrimitiveState>
          <PrimitiveState label="error">
            <BeforeAfterDiff state="error" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <BeforeAfterDiff state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  SettingsSection: SettingsSectionStory,
  PermissionMatrix: PermissionMatrixStory,
  RuleRow: RuleRowStory,
  SettingsHubCard: () => {
    const [event, setEvent] = useState<string | null>(null);
    const open = (target: string) => () => setEvent(`open:${target}`);

    return (
      <StoryPage className="sb-crm-batch9-settings-hub-card-story">
        <SourceFrame className="sb-crm-batch9-settings-hub-card-source">
          <SettingsHubCard
            description="Dados, unidades e horários."
            icon="slidersRound"
            onOpen={open("studio")}
            state="ready"
            title="Studio"
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source ready - image 60">
            <SettingsHubCard
              description="Dados, unidades e horários."
              icon="slidersRound"
              onOpen={open("studio")}
              state="ready"
              title="Studio"
            />
          </PrimitiveState>
          <PrimitiveState label="invite pending">
            <SettingsHubCard
              description="Pessoas que acessam o Taliya."
              icon="users"
              onOpen={open("equipe")}
              state="invite-pending"
              title="Equipe"
            />
          </PrimitiveState>
          <PrimitiveState label="review">
            <SettingsHubCard
              description="O que cada papel pode fazer."
              icon="shield"
              onOpen={open("permissoes")}
              state="review"
              title="Permissões"
            />
          </PrimitiveState>
          <PrimitiveState label="connected">
            <SettingsHubCard
              description="WhatsApp, email e redes."
              icon="whatsapp"
              onOpen={open("canais")}
              state="connected"
              title="Canais"
            />
          </PrimitiveState>
          <PrimitiveState label="pending">
            <SettingsHubCard
              description="Cobrança, baixa e Pagamentos Taliya."
              icon="creditCard"
              onOpen={open("pagamentos")}
              state="pending"
              title="Pagamentos e financeiro"
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <SettingsHubCard
              description="Feriados, bloqueios e encaixes."
              icon="calendar"
              loading
              onOpen={open("agenda")}
              state="loading"
              title="Agenda"
            />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <SettingsHubCard
              description="Alertas internos por papel."
              icon="bell"
              onOpen={open("notificacoes")}
              state="blocked"
              title="Notificações"
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  IntegrationStatusRow: () => {
    const [event, setEvent] = useState<string | null>(null);
    const action = (provider: string, state: string) => setEvent(`${provider}:${state}`);

    return (
      <StoryPage className="sb-crm-batch9-integration-status-row-story">
        <SourceFrame className="sb-crm-batch9-integration-status-row-source">
          <IntegrationStatusRow onAction={action} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source blocked - image 62">
            <IntegrationStatusRow onAction={action} />
          </PrimitiveState>
          <PrimitiveState label="connected">
            <IntegrationStatusRow
              description="Ativo"
              onAction={action}
              provider="card"
              state="connected"
              title="Cartão online"
            />
          </PrimitiveState>
          <PrimitiveState label="pending">
            <IntegrationStatusRow
              description="Aguardando ativação"
              onAction={action}
              provider="recurrence"
              state="pending"
              title="Recorrência online"
            />
          </PrimitiveState>
          <PrimitiveState label="failed">
            <IntegrationStatusRow
              description="Falha técnica"
              onAction={action}
              provider="reconciliation"
              state="failed"
              title="Baixa automática"
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <IntegrationStatusRow
              description="Sincronizando"
              onAction={action}
              provider="card"
              state="loading"
              title="Cartão online"
            />
          </PrimitiveState>
          <PrimitiveState label="last item no divider">
            <IntegrationStatusRow
              description="Bloqueado até ativar"
              onAction={action}
              provider="reconciliation"
              showDivider={false}
              state="blocked"
              title="Baixa automática e conciliação"
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  UnsavedChangesBar: () => {
    const [event, setEvent] = useState<string | null>(null);

    return (
      <StoryPage className="sb-crm-batch9-unsaved-changes-bar-story">
        <SourceFrame className="sb-crm-batch9-unsaved-changes-bar-source">
          <UnsavedChangesBar onCancel={() => setEvent("cancel")} onSave={() => setEvent("save")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source dirty - images 61-64">
            <UnsavedChangesBar onCancel={() => setEvent("cancel")} onSave={() => setEvent("save")} />
          </PrimitiveState>
          <PrimitiveState label="saving">
            <UnsavedChangesBar onCancel={() => setEvent("cancel")} onSave={() => setEvent("save")} state="saving" />
          </PrimitiveState>
          <PrimitiveState label="saved">
            <UnsavedChangesBar onCancel={() => setEvent("cancel")} onSave={() => setEvent("save")} state="saved" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <UnsavedChangesBar onCancel={() => setEvent("cancel")} onSave={() => setEvent("save")} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  ConfigImpactPreview: () => (
    <StoryPage className="sb-crm-batch9-config-impact-preview-story">
      <SourceFrame className="sb-crm-batch9-config-impact-preview-source">
        <ConfigImpactPreview />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source medium - image 61">
          <ConfigImpactPreview />
        </PrimitiveState>
        <PrimitiveState label="low">
          <ConfigImpactPreview state="low" />
        </PrimitiveState>
        <PrimitiveState label="high">
          <ConfigImpactPreview state="high" />
        </PrimitiveState>
        <PrimitiveState label="loading">
          <ConfigImpactPreview state="loading" />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <ConfigImpactPreview state="blocked" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ConversationList: ConversationListStory,
  ConversationThread: () => {
    const [event, setEvent] = useState<string | null>(null);
    const [sent, setSent] = useState<string | null>(null);

    return (
      <StoryPage className="sb-crm-batch9-conversation-thread-story">
        <SourceFrame className="sb-crm-batch9-conversation-thread-source">
          <ConversationThread
            avatarSrc={source24AnaSilva}
            onAction={(actionId) => setEvent(`action:${actionId}`)}
            onSend={(value) => {
              setSent(value);
              setEvent("send");
            }}
            onUseSuggestion={() => setEvent("suggestion")}
          />
        </SourceFrame>
        {event ? <Chip tone="success">{sent ? `${event}:${sent}` : event}</Chip> : <Chip tone="paused">aguardando interacao</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="source center pane - image 24">
            <ConversationThread
              avatarSrc={source24AnaSilva}
              onAction={(actionId) => setEvent(`source-action:${actionId}`)}
              onSend={(value) => setEvent(`source-send:${value}`)}
              onUseSuggestion={() => setEvent("source-suggestion")}
            />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <ConversationThread avatarSrc={source24AnaSilva} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <ConversationThread avatarSrc={source24AnaSilva} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  Composer: () => {
    const [event, setEvent] = useState<string | null>(null);
    return (
      <StoryPage>
        <PrimitiveMatrix>
          <PrimitiveState label="empty">
            <Composer
              onAttach={() => setEvent("attach")}
              onDocument={() => setEvent("document")}
              onSend={(value) => setEvent(`send:${value}`)}
              onTemplateOpen={() => setEvent("templates")}
              placeholder="Responder pelo WhatsApp..."
            />
          </PrimitiveState>
          <PrimitiveState label="typing">
            <Composer defaultValue="Pode deixar, vou verificar." onSend={(value) => setEvent(`send:${value}`)} placeholder="Responder pelo WhatsApp..." />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <Composer disabled placeholder="Atendimento pausado" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <Composer defaultValue="Enviando resposta" loading placeholder="Responder pelo WhatsApp..." />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event ?? "sem acao"}</output>
      </StoryPage>
    );
  },
  ChannelStatus: () => (
    <StoryPage className="sb-crm-batch9-channel-status-story">
      <SourceFrame className="sb-crm-batch9-channel-status-source">
        <ChannelStatus sourceIcon="calendar" sourceLabel="Recepção" state="waiting" />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="source waiting">
          <ChannelStatus sourceIcon="calendar" sourceLabel="Recepção" state="waiting" />
        </PrimitiveState>
        <PrimitiveState label="source progress">
          <ChannelStatus sourceIcon="clipboard" sourceLabel="Financeiro" state="progress" />
        </PrimitiveState>
        <PrimitiveState label="source copilot">
          <ChannelStatus sourceIcon="users" sourceLabel="Atendimento" state="copilot" />
        </PrimitiveState>
        <PrimitiveState label="source failed">
          <ChannelStatus sourceIcon="settings" sourceLabel="Sistema" state="failed" />
        </PrimitiveState>
        <PrimitiveState label="source opt-out">
          <ChannelStatus sourceIcon="settings" sourceLabel="Sistema" state="optout" />
        </PrimitiveState>
        <PrimitiveState label="operational connected">
          <ChannelStatus sourceIcon="whatsapp" sourceLabel="WhatsApp" state="connected" />
        </PrimitiveState>
        <PrimitiveState label="operational human active">
          <ChannelStatus sourceIcon="user" sourceLabel="Humano" state="human active" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  HandoffBanner: () => (
    <StoryPage className="sb-crm-batch9-handoff-banner-story">
      <SourceFrame className="sb-crm-batch9-handoff-banner-source">
        <HandoffBanner state="human needed" />
      </SourceFrame>
      <PrimitiveMatrix>
        <PrimitiveState label="needed">
          <HandoffBanner state="human needed" />
        </PrimitiveState>
        <PrimitiveState label="active">
          <HandoffBanner
            action={<Button size="sm" type="button" variant="secondary">Assumir</Button>}
            description="Atendimento humano ativo enquanto a equipe conduz a conversa."
          />
        </PrimitiveState>
        <PrimitiveState label="resumed">
          <HandoffBanner description="Agente retomado apos revisao humana." state="resumed" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  QuickReplyChips: () => {
    const [event, setEvent] = useState("source");

    return (
      <StoryPage className="sb-crm-batch9-quick-reply-story">
        <SourceFrame className="sb-crm-batch9-quick-reply-source">
          <QuickReplyChips />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 51B">
            <QuickReplyChips onSelect={(id) => setEvent(`source:${id}`)} />
          </PrimitiveState>
          <PrimitiveState label="hover/focus/active">
            <QuickReplyChips
              onSelect={(id) => setEvent(`state:${id}`)}
              items={[
                { id: "hover", label: "O que é obrigatório?", className: "is-hover" },
                { id: "focus", label: "Posso deixar para depois?", className: "is-focus-visible" },
                { id: "active", label: "Como isso afeta a agenda?", className: "is-active" }
              ]}
            />
          </PrimitiveState>
          <PrimitiveState label="suggested action">
            <QuickReplyChips
              onSelect={(id) => setEvent(`suggested:${id}`)}
              items={[
                { id: "draft", label: "Gerar resposta sugerida", icon: "sparkles", kind: "suggested", selected: true },
                { id: "human", label: "Chamar ajuda humana", icon: "headphones", kind: "action" }
              ]}
            />
          </PrimitiveState>
          <PrimitiveState label="disabled/loading">
            <QuickReplyChips
              items={[
                { id: "blocked", label: "Bloqueado", disabled: true },
                { id: "loading", label: "Carregando sugestão", kind: "suggested", loading: true }
              ]}
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ChecklistRow: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-checklist-row-story">
        <SourceFrame className="sb-crm-batch9-checklist-row-source">
          <div className="sb-crm-batch9-checklist-row-stack" role="list" aria-label="Checklist / subtarefas">
            <ChecklistRow index={1} title="Verificar horários disponíveis" onToggle={(checked) => setEvent(`row1:${checked}`)} />
            <ChecklistRow index={2} title="Confirmar com Ana" onToggle={(checked) => setEvent(`row2:${checked}`)} />
            <ChecklistRow index={3} title="Atualizar reposição na agenda" onToggle={(checked) => setEvent(`row3:${checked}`)} />
          </div>
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 23">
            <ChecklistRow index={1} title="Verificar horários disponíveis" onToggle={(checked) => setEvent(`source:${checked}`)} />
          </PrimitiveState>
          <PrimitiveState label="hover / selected">
            <ChecklistRow className="is-hover" index={2} title="Confirmar com Ana" />
            <ChecklistRow className="is-selected" index={2} state="complete" title="Confirmar com Ana" />
          </PrimitiveState>
          <PrimitiveState label="states">
            <ChecklistRow index={1} state="complete" title="Verificar horários disponíveis" />
            <ChecklistRow index={2} state="warning" title="Confirmar com Ana" />
            <ChecklistRow index={3} state="sensitive" title="Atualizar reposição na agenda" />
            <ChecklistRow index={4} state="blocked" title="Revisar regra bloqueada" />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <ChecklistRow disabled index={1} title="Verificar horários disponíveis" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  CommentThread: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-comment-thread-story">
        <SourceFrame className="sb-crm-batch9-comment-thread-source">
          <CommentThread
            comments={sourceCommentThreadComments}
            onCommentSelect={(comment) => setEvent(`open:${comment.id}`)}
            onViewAll={() => setEvent("view-all")}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 23">
            <CommentThread
              comments={sourceCommentThreadComments}
              onCommentSelect={(comment) => setEvent(`source:${comment.id}`)}
              onViewAll={() => setEvent("source:view-all")}
            />
          </PrimitiveState>
          <PrimitiveState label="internal / customer-visible">
            <CommentThread
              comments={[
                {
                  id: "ana-silva-visible",
                  author: "Ana Silva",
                  body: "Pedi reposição quinta 08h.",
                  time: "Hoje, 09:08",
                  avatarSrc: source23CommentAnaSilva,
                  visibility: "customer-visible"
                },
                {
                  id: "sam-frank-internal",
                  author: "Sam Frank",
                  body: "Recepção não encontrou vaga ainda.",
                  time: "Hoje, 09:14",
                  avatarSrc: source23CommentSamFrank,
                  visibility: "internal"
                }
              ]}
              state="internal"
              onCommentSelect={(comment) => setEvent(`visibility:${comment.id}`)}
            />
          </PrimitiveState>
          <PrimitiveState label="failed / retry">
            <CommentThread
              comments={sourceCommentThreadComments}
              onRetry={(comment) => setEvent(`retry:${comment.id}`)}
              state="failed"
            />
          </PrimitiveState>
          <PrimitiveState label="empty / loading / blocked">
            <CommentThread comments={[]} state="empty" />
            <CommentThread comments={sourceCommentThreadComments} state="loading" />
            <CommentThread comments={sourceCommentThreadComments} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  TaskDrawer: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-task-drawer-story">
        <SourceFrame className="sb-crm-batch9-task-drawer-source">
          <TaskDrawer
            onChecklistToggle={(item, checked) => setEvent(`check:${item.id}:${checked}`)}
            onClose={() => setEvent("close")}
            onComplete={() => setEvent("complete")}
            onOpenConversation={() => setEvent("conversation")}
            onOpenOrigin={() => setEvent("origin")}
            onReschedule={() => setEvent("reschedule")}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 18">
            <TaskDrawer
              onChecklistToggle={(item, checked) => setEvent(`source:${item.id}:${checked}`)}
              onClose={() => setEvent("source:close")}
              onComplete={() => setEvent("source:complete")}
              onOpenConversation={() => setEvent("source:conversation")}
              onOpenOrigin={() => setEvent("source:origin")}
              onReschedule={() => setEvent("source:reschedule")}
            />
          </PrimitiveState>
          <PrimitiveState label="compact - image 23 list detail">
            <TaskDrawer
              size="compact"
              title="Confirmar reposição da Ana"
              statusLabel="Aberta"
              onChecklistToggle={(item, checked) => setEvent(`compact:${item.id}:${checked}`)}
              onClose={() => setEvent("compact:close")}
              onComplete={() => setEvent("compact:complete")}
              onOpenConversation={() => setEvent("compact:conversation")}
              onOpenOrigin={() => setEvent("compact:origin")}
              onReschedule={() => setEvent("compact:reschedule")}
            />
          </PrimitiveState>
          <PrimitiveState label="completed / sensitive">
            <TaskDrawer checklist={[{ id: "done", title: "Confirmar horário com a aluna", checked: true }]} state="completed" />
            <TaskDrawer statusLabel="Revisão sensível" state="sensitive" title="Revisar tarefa sensível" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <TaskDrawer state="loading" />
            <TaskDrawer state="blocked" statusLabel="Bloqueada" />
            <TaskDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ApprovalDrawer: () => {
    const [event, setEvent] = useState<string | null>(null);
    const recentComment = {
      author: "Sam Frank",
      time: "Hoje, 09:20",
      body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço.",
      avatarSrc: source25SamFrank
    };
    const sourceApprovalSections = [
      {
        id: "context",
        title: "Contexto resumido",
        body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
      },
      {
        id: "proposal",
        title: "Proposta principal",
        badge: "Sugestão do copiloto",
        variant: "suggestion" as const,
        body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
      },
      {
        id: "impact",
        title: "Impasto esperado",
        body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
      },
      {
        id: "policy",
        title: "Política / guardrail aplicado",
        body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
      }
    ];

    return (
      <StoryPage className="sb-crm-batch9-approval-panel-story">
        <SourceFrame className="sb-crm-batch9-approval-panel-source">
          <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} />
        </SourceFrame>
        {event ? <Chip tone="success">{event}</Chip> : <Chip tone="paused">aguardando interação</Chip>}
        <PrimitiveMatrix>
          <PrimitiveState label="source pending - image 25">
            <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} />
          </PrimitiveState>
          <PrimitiveState label="approved">
            <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="approved" />
          </PrimitiveState>
          <PrimitiveState label="rejected">
            <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="rejected" />
          </PrimitiveState>
          <PrimitiveState label="expired">
            <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="expired" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <ApprovalDrawer onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked / closed">
            <ApprovalDrawer blockedReason="Aprovação bloqueada por política" onAction={setEvent} recentComment={recentComment} sections={sourceApprovalSections} state="blocked" />
            <ApprovalDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  CaseDrawer: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-case-drawer-story">
        <SourceFrame className="sb-crm-batch9-case-drawer-source">
          <CaseDrawer onAction={setEvent} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 22">
            <CaseDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="resolved">
            <CaseDrawer state="resolved" />
          </PrimitiveState>
          <PrimitiveState label="blocked / loading / closed">
            <CaseDrawer state="blocked" statusLabel="Bloqueado" />
            <CaseDrawer state="loading" />
            <CaseDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  StudentDrawer: () => {
    const [event, setEvent] = useState("idle");
    return (
      <StoryPage className="sb-crm-batch9-student-drawer-story">
        <SourceFrame className="sb-crm-batch9-student-drawer-source">
          <StudentDrawer avatarSrc={source28AnaPaula} onAction={setEvent} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source - image 27">
            <StudentDrawer avatarSrc={source28AnaPaula} onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="risk / sensitive">
            <StudentDrawer avatarSrc={source28AnaPaula} state="risk" />
            <StudentDrawer avatarSrc={source28AnaPaula} state="sensitive" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <StudentDrawer avatarSrc={source28AnaPaula} state="loading" />
            <StudentDrawer avatarSrc={source28AnaPaula} state="blocked" />
            <StudentDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ClassDrawer: () => {
    const [event, setEvent] = useState("idle");
    const students: ClassDrawerStudent[] = [
      { id: "ana-carolina", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
      { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
      { id: "felipe", name: "Felipe Andrade", avatarSrc: source29FelipeAndrade, status: "warned", helper: "gera crédito" },
      { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
      { id: "juliana", name: "Juliana Costa", avatarSrc: source29JulianaCosta, status: "replacement", helper: "reposição usada" }
    ];

    return (
      <StoryPage className="sb-crm-batch9-class-drawer-story">
        <SourceFrame className="sb-crm-batch9-class-drawer-source">
          <ClassDrawer students={students} onAction={setEvent} onClose={() => setEvent("close")} onStudentStatus={(student) => setEvent(`student:${student.id}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 29">
            <ClassDrawer students={students} onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} onStudentStatus={(student) => setEvent(`source:student:${student.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="saved / blocked">
            <ClassDrawer students={students} state="saved" />
            <ClassDrawer students={students} state="blocked" />
          </PrimitiveState>
          <PrimitiveState label="loading / closed">
            <ClassDrawer students={students} state="loading" />
            <ClassDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  PaymentDrawer: () => {
    const [event, setEvent] = useState<PaymentDrawerAction | string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-payment-drawer-story">
        <SourceFrame className="sb-crm-batch9-payment-drawer-source">
          <PaymentDrawer onAction={setEvent} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 32">
            <PaymentDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="promise / paid / failed">
            <PaymentDrawer state="promise" statusLabel="Promessa registrada" />
            <PaymentDrawer state="paid" />
            <PaymentDrawer state="failed" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <PaymentDrawer state="loading" />
            <PaymentDrawer state="blocked" />
            <PaymentDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ReplacementDrawer: () => {
    const [event, setEvent] = useState<ReplacementDrawerAction | string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-replacement-drawer-story">
        <SourceFrame className="sb-crm-batch9-replacement-drawer-source">
          <ReplacementDrawer onAction={setEvent} onClose={() => setEvent("close")} onOptionSelect={(option) => setEvent(`option:${option.id}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 31">
            <ReplacementDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} onOptionSelect={(option) => setEvent(`source:option:${option.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="scheduled / blocked">
            <ReplacementDrawer state="scheduled" statusLabel="Agendada" />
            <ReplacementDrawer state="blocked" statusLabel="Bloqueada por regra" />
          </PrimitiveState>
          <PrimitiveState label="loading / closed">
            <ReplacementDrawer state="loading" />
            <ReplacementDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  LeadDrawer: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-lead-drawer-story">
        <SourceFrame className="sb-crm-batch9-lead-drawer-source">
          <LeadDrawer onAction={setEvent} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 38">
            <LeadDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="sales states">
            <LeadDrawer state="trial" statusLabel="Experimental marcado" />
            <LeadDrawer state="enrollment" statusLabel="Pré-matrícula" />
            <LeadDrawer state="lost" statusLabel="Perdido" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <LeadDrawer state="loading" />
            <LeadDrawer state="blocked" />
            <LeadDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  AgentFlowDrawer: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-agent-flow-drawer-story">
        <SourceFrame className="sb-crm-batch9-agent-flow-drawer-source">
          <AgentFlowDrawer onAction={(action, payload) => setEvent(payload ? `${action}:${payload}` : action)} onClose={() => setEvent("close")} onQuestionSubmit={(value) => setEvent(`submit:${value}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 56">
            <AgentFlowDrawer onAction={(action, payload) => setEvent(`source:${payload ? `${action}:${payload}` : action}`)} />
          </PrimitiveState>
          <PrimitiveState label="test / publish / execution">
            <AgentFlowDrawer state="test" />
            <AgentFlowDrawer state="publish" />
            <AgentFlowDrawer state="execution" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <AgentFlowDrawer state="loading" />
            <AgentFlowDrawer state="blocked" />
            <AgentFlowDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  UsageDrawer: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-usage-drawer-story">
        <SourceFrame className="sb-crm-batch9-usage-drawer-source">
          <UsageDrawer onAction={(action, payload) => setEvent(payload ? `${action}:${payload}` : action)} onClose={() => setEvent("close")} onQuestionSubmit={(value) => setEvent(`submit:${value}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 69">
            <UsageDrawer onAction={(action, payload) => setEvent(`source:${payload ? `${action}:${payload}` : action}`)} />
          </PrimitiveState>
          <PrimitiveState label="overview / quota">
            <UsageDrawer state="overview" />
            <UsageDrawer state="quota" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <UsageDrawer state="loading" />
            <UsageDrawer state="blocked" />
            <UsageDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SupportTicketDrawer: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-support-ticket-drawer-story">
        <SourceFrame className="sb-crm-batch9-support-ticket-drawer-source">
          <SupportTicketDrawer onAction={(action) => setEvent(action)} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 47">
            <SupportTicketDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="answered / access active">
            <SupportTicketDrawer state="answered" />
            <SupportTicketDrawer state="access active" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <SupportTicketDrawer state="loading" />
            <SupportTicketDrawer state="blocked" />
            <SupportTicketDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  TenantSecurityDrawer: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-tenant-security-drawer-story">
        <SourceFrame className="sb-crm-batch9-tenant-security-drawer-source">
          <TenantSecurityDrawer onAction={(action) => setEvent(action)} onClose={() => setEvent("close")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 50 / security review">
            <TenantSecurityDrawer onAction={(action) => setEvent(`source:${action}`)} onClose={() => setEvent("source:close")} />
          </PrimitiveState>
          <PrimitiveState label="grant access / allowed">
            <TenantSecurityDrawer state="grant access" />
            <TenantSecurityDrawer state="allowed" />
          </PrimitiveState>
          <PrimitiveState label="revoked / denied / warning">
            <TenantSecurityDrawer state="revoked" />
            <TenantSecurityDrawer state="denied" />
            <TenantSecurityDrawer state="warning" />
          </PrimitiveState>
          <PrimitiveState label="loading / blocked / closed">
            <TenantSecurityDrawer state="loading" />
            <TenantSecurityDrawer state="blocked" />
            <TenantSecurityDrawer open={false} />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  WeeklyHoursGrid: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-weekly-hours-grid-story">
        <SourceFrame className="sb-crm-batch9-weekly-hours-grid-source">
          <WeeklyHoursGrid
            onAdjustDay={() => setEvent("adjust-day")}
            onSlotClick={(slot) => setEvent(`${slot.day}:${slot.start}-${slot.end}`)}
          />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 51D v2 / editable">
            <WeeklyHoursGrid onAdjustDay={() => setEvent("source:adjust-day")} onSlotClick={(slot) => setEvent(`source:${slot.id}`)} />
          </PrimitiveState>
          <PrimitiveState label="readonly">
            <WeeklyHoursGrid state="readonly" />
          </PrimitiveState>
          <PrimitiveState label="conflict">
            <WeeklyHoursGrid state="conflict" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <WeeklyHoursGrid state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <WeeklyHoursGrid state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  RoleCard: () => {
    const [event, setEvent] = useState<string>("idle");

    return (
      <StoryPage className="sb-crm-batch9-role-card-story">
        <SourceFrame className="sb-crm-batch9-role-card-source">
          <RoleCard avatarSrc={source51eLeticiaRamos} onSelect={(state) => setEvent(`source:${state}`)} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source image 51E / owner">
            <RoleCard avatarSrc={source51eLeticiaRamos} onSelect={(state) => setEvent(`owner:${state}`)} />
          </PrimitiveState>
          <PrimitiveState label="admin">
            <RoleCard onSelect={(state) => setEvent(`admin:${state}`)} state="admin" />
          </PrimitiveState>
          <PrimitiveState label="staff / invite prepared">
            <RoleCard onSelect={(state) => setEvent(`staff:${state}`)} state="staff" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <RoleCard onSelect={(state) => setEvent(`loading:${state}`)} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <RoleCard onSelect={(state) => setEvent(`blocked:${state}`)} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  InviteRow: () => {
    const [event, setEvent] = useState<string>("idle");
    const record = (action: string) => (invite: { id: string }) => setEvent(`${action}:${invite.id}`);

    return (
      <StoryPage className="sb-crm-batch9-invite-row-story">
        <SourceFrame className="sb-crm-batch9-invite-row-source">
          <InviteRow onEdit={record("edit-source")} onOpen={record("open-source")} onRemove={record("remove-source")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source prepared - image 51E">
            <InviteRow onEdit={record("edit-prepared")} onOpen={record("open-prepared")} onRemove={record("remove-prepared")} />
          </PrimitiveState>
          <PrimitiveState label="accepted">
            <InviteRow onEdit={record("edit-accepted")} onOpen={record("open-accepted")} onRemove={record("remove-accepted")} state="accepted" />
          </PrimitiveState>
          <PrimitiveState label="incomplete / warning">
            <InviteRow onEdit={record("edit-incomplete")} onOpen={record("open-incomplete")} onRemove={record("remove-incomplete")} state="incomplete" />
          </PrimitiveState>
          <PrimitiveState label="expired">
            <InviteRow onEdit={record("edit-expired")} onOpen={record("open-expired")} onRemove={record("remove-expired")} state="expired" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <InviteRow onEdit={record("edit-loading")} onOpen={record("open-loading")} onRemove={record("remove-loading")} state="loading" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <InviteRow onEdit={record("edit-blocked")} onOpen={record("open-blocked")} onRemove={record("remove-blocked")} state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  PaymentMethodRow: () => {
    const [event, setEvent] = useState<string>("idle");
    const select = (method: "pix" | "cash" | "card", state: string) => setEvent(`${method}:${state}`);

    return (
      <StoryPage className="sb-crm-batch9-payment-method-row-story">
        <SourceFrame className="sb-crm-batch9-payment-method-row-source">
          <PaymentMethodRow onSelect={select} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source selected Pix - image 51K">
            <PaymentMethodRow onSelect={select} />
          </PrimitiveState>
          <PrimitiveState label="cash selected">
            <PaymentMethodRow method="cash" onSelect={select} />
          </PrimitiveState>
          <PrimitiveState label="card selected">
            <PaymentMethodRow method="card" onSelect={select} />
          </PrimitiveState>
          <PrimitiveState label="connected">
            <PaymentMethodRow method="card" onSelect={select} state="connected" />
          </PrimitiveState>
          <PrimitiveState label="failed">
            <PaymentMethodRow method="card" onSelect={select} state="failed" />
          </PrimitiveState>
          <PrimitiveState label="disabled">
            <PaymentMethodRow method="pix" onSelect={select} state="disabled" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <PaymentMethodRow method="cash" onSelect={select} state="loading" />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  SecurePaymentNotice: () => <StoryPage><PrimitiveMatrix><PrimitiveState label="secure"><SecurePaymentNotice /></PrimitiveState><PrimitiveState label="pending"><SecurePaymentNotice state="pending" /></PrimitiveState><PrimitiveState label="failed"><SecurePaymentNotice state="failed" /></PrimitiveState></PrimitiveMatrix></StoryPage>,
  UsageOriginRow: () => {
    const [event, setEvent] = useState<string>("idle");
    const select = (origin: "attendance" | "agenda" | "sales" | "finance" | "other" | "message" | "automation" | "import" | "adjustment", state: string) => {
      setEvent(`${origin}:${state}`);
    };

    return (
      <StoryPage className="sb-crm-batch9-usage-origin-row-story">
        <SourceFrame className="sb-crm-batch9-usage-origin-row-source">
          <div className="sb-crm-batch9-usage-origin-row-stack">
            <UsageOriginRow onSelect={select} origin="attendance" />
            <UsageOriginRow onSelect={select} origin="agenda" />
            <UsageOriginRow onSelect={select} origin="sales" />
            <UsageOriginRow onSelect={select} origin="finance" />
            <UsageOriginRow onSelect={select} origin="other" />
          </div>
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source stack - image 68">
            <div className="sb-crm-batch9-usage-origin-row-stack">
              <UsageOriginRow onSelect={select} origin="attendance" />
              <UsageOriginRow onSelect={select} origin="agenda" />
              <UsageOriginRow onSelect={select} origin="sales" />
              <UsageOriginRow onSelect={select} origin="finance" />
              <UsageOriginRow onSelect={select} origin="other" />
            </div>
          </PrimitiveState>
          <PrimitiveState label="operational origins">
            <div className="sb-crm-batch9-usage-origin-row-list">
              <UsageOriginRow onSelect={select} origin="message" />
              <UsageOriginRow onSelect={select} origin="automation" />
              <UsageOriginRow onSelect={select} origin="import" />
              <UsageOriginRow onSelect={select} origin="adjustment" />
            </div>
          </PrimitiveState>
          <PrimitiveState label="selected">
            <UsageOriginRow onSelect={select} origin="agenda" state="selected" />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <UsageOriginRow onSelect={select} origin="sales" state="loading" />
          </PrimitiveState>
          <PrimitiveState label="disabled / blocked">
            <div className="sb-crm-batch9-usage-origin-row-list">
              <UsageOriginRow onSelect={select} origin="finance" state="disabled" />
              <UsageOriginRow onSelect={select} origin="other" state="blocked" />
            </div>
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  },
  ExportAction: () => {
    const [event, setEvent] = useState<string>("idle");
    const exportActions = [
      { label: "CSV", icon: "download" as const },
      { label: "PDF", icon: "fileText" as const },
      { label: "XLSX", icon: "fileText" as const }
    ];

    return (
      <StoryPage className="sb-crm-batch9-export-action-story">
        <SourceFrame className="sb-crm-batch9-export-action-source">
          <ExportAction onExport={() => setEvent("export")} />
        </SourceFrame>
        <PrimitiveMatrix>
          <PrimitiveState label="source button - image 45">
            <ExportAction onExport={() => setEvent("source-export")} />
          </PrimitiveState>
          <PrimitiveState label="loading">
            <ExportAction loading onExport={() => setEvent("loading-export")} />
          </PrimitiveState>
          <PrimitiveState label="disabled / blocked">
            <div className="sb-crm-batch9-export-action-list">
              <ExportAction disabled onExport={() => setEvent("disabled-export")} />
              <ExportAction state="blocked" onExport={() => setEvent("blocked-export")} />
            </div>
          </PrimitiveState>
          <PrimitiveState label="menu closed">
            <ExportAction
              actions={exportActions}
              onActionSelect={(action) => setEvent(`menu:${action.label}`)}
              onOpenChange={(open) => setEvent(open ? "menu-open" : "menu-close")}
            />
          </PrimitiveState>
          <PrimitiveState label="menu open">
            <ExportAction
              actions={exportActions}
              defaultOpen
              onActionSelect={(action) => setEvent(`menu-open:${action.label}`)}
            />
          </PrimitiveState>
        </PrimitiveMatrix>
        <output aria-live="polite" className="tl-sr-only">{event}</output>
      </StoryPage>
    );
  }
} satisfies Record<Batch9StoryComponent, () => ReactNode>;

export function Batch9ComponentStory({ component }: { component: Batch9StoryComponent }) {
  return storyRenderers[component]();
}

export const batch9StoryParameters = {
  layout: "fullscreen",
  docs: {
    description: {
      component: batch9SourceDescription
    }
  }
};
