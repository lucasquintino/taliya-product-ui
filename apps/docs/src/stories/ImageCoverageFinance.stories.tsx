import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { useMemo, useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  CrmDashboardPage,
  CrmWorklistTable,
  CrmKanbanPage,
  CrmWorklistPage,
  FinanceQueueGrid,
  FinancePriorityPanel,
  FinanceKanbanCard,
  KanbanColumn,
  PageFilterBar,
  PageQuickFilters,
  PaymentDrawer,
  PaymentCaseCard,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  CrmShellNavItem,
  FinancePriorityItem,
  PageFilterBarFilter,
  PageQuickFilterItem,
  PaymentDrawerAction,
  PaymentDrawerActionConfig,
  PaymentDrawerFact,
  PaymentDrawerState
} from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, PersonLabel } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source34AnaPaulaMartins from "../assets/source34-ana-paula-martins.png";
import source34FernandaLima from "../assets/source34-fernanda-lima.png";
import source34GabrielLima from "../assets/source34-gabriel-lima.png";
import source34JulianaRocha from "../assets/source34-juliana-rocha.png";

const financeNavItems: CrmShellNavItem[] = [
  { id: "overview", label: "Visao geral", active: true },
  { id: "kanban", label: "Kanban" },
  { id: "movements", label: "Movimentacoes" },
  { id: "cases", label: "Casos" },
  { id: "documents", label: "Documentos" }
];

const meta = {
  title: "CRM / Image Coverage / Financeiro",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage da pagina Financeiro. As composicoes usam paginas oficiais dashboard, kanban e worklist com componentes financeiros reutilizaveis; status em revisao visual, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const financePriorities: FinancePriorityItem[] = [
  {
    id: "overdue",
    title: "9 cobrancas atrasadas",
    amount: "R$ 3.870,00",
    meta: "mensalidades e planos · responsável Financeiro",
    icon: "alert",
    tone: "danger"
  },
  {
    id: "reconciliation",
    title: "5 comprovantes aguardando conciliacao",
    amount: "R$ 2.140,00",
    meta: "Pix e importação · responsável Mariana",
    icon: "clock",
    tone: "info"
  },
  {
    id: "exceptions",
    title: "3 excecoes financeiras precisam revisao",
    amount: "R$ 3.320,00",
    meta: "desconto, renegociação e cancelamento · responsável Coordenação",
    icon: "folder",
    tone: "warning"
  }
];

const financeCaseStates = [
  "due",
  "today",
  "paid",
  "overdue",
  "failed",
  "reconciliation",
  "promise",
  "exception"
] as const;

interface FinanceCaseDetail {
  name: string;
  amount: string;
  due: string;
  method: string;
  state: PaymentDrawerState;
  status: string;
}

const financeCaseDetails: Record<string, FinanceCaseDetail> = {
  "due:fernanda": { name: "Fernanda Lima", amount: "R$ 420,00", due: "vence 14/05", method: "mensalidade", state: "due", status: "A vencer" },
  "due:rafael": { name: "Rafael Martins", amount: "R$ 980,00", due: "vence 15/05", method: "plano trimestral", state: "due", status: "A vencer" },
  "due:bianca": { name: "Bianca Oliveira", amount: "R$ 210,00", due: "vence 16/05", method: "aula avulsa", state: "due", status: "A vencer" },
  "today:camila": { name: "Camila Souza", amount: "R$ 420,00", due: "vence hoje 18:00", method: "Pix", state: "due", status: "Vence hoje" },
  "today:lucas": { name: "Lucas Ferreira", amount: "R$ 980,00", due: "vence hoje 20:00", method: "plano trimestral", state: "due", status: "Vence hoje" },
  "today:marina": { name: "Marina Costa", amount: "R$ 210,00", due: "vence hoje 21:00", method: "mensalidade", state: "due", status: "Vence hoje" },
  "paid:juliana": { name: "Juliana Rocha", amount: "R$ 420,00", due: "pago hoje 09:12", method: "Pix", state: "paid", status: "Pago" },
  "paid:thiago": { name: "Thiago Alves", amount: "R$ 980,00", due: "pago hoje 10:45", method: "cartao", state: "paid", status: "Pago" },
  "paid:patricia": { name: "Patricia Nunes", amount: "R$ 210,00", due: "pago ontem 16:22", method: "WhatsApp", state: "paid", status: "Pago" },
  "overdue:gabriela": { name: "Gabriela Lima", amount: "R$ 420,00", due: "2 dias em atraso", method: "mensalidade", state: "overdue", status: "Em atraso" },
  "overdue:eduardo": { name: "Eduardo Santos", amount: "R$ 210,00", due: "5 dias em atraso", method: "Pix", state: "overdue", status: "Em atraso" },
  "overdue:isabela": { name: "Isabela Prado", amount: "R$ 980,00", due: "7 dias em atraso", method: "plano trimestral", state: "overdue", status: "Em atraso" },
  "failed:bruno": { name: "Bruno Mendes", amount: "R$ 420,00", due: "cartao recusado", method: "cartao", state: "failed", status: "Falha" },
  "failed:carolina": { name: "Carolina Dias", amount: "R$ 980,00", due: "limite insuficiente", method: "cartao", state: "failed", status: "Falha" },
  "failed:joao": { name: "Joao Victor", amount: "R$ 210,00", due: "Pix expirado", method: "WhatsApp", state: "failed", status: "Falha" },
  "reconciliation:ana": { name: "Ana Paula Martins", amount: "R$ 420,00", due: "comprovante enviado 09:45", method: "Pix", state: "promise", status: "Conciliação pendente" },
  "reconciliation:gustavo": { name: "Gustavo Lima", amount: "R$ 980,00", due: "aguardando baixa", method: "importacao", state: "promise", status: "Conciliação pendente" },
  "reconciliation:beatriz": { name: "Marina Beatriz", amount: "R$ 210,00", due: "envio manual", method: "agente", state: "promise", status: "Conciliação pendente" },
  "promise:felipe": { name: "Felipe Costa", amount: "R$ 420,00", due: "prometido para 15/05", method: "WhatsApp", state: "promise", status: "Promessa registrada" },
  "promise:renata": { name: "Renata Alves", amount: "R$ 980,00", due: "prometido para 16/05", method: "agente", state: "promise", status: "Promessa registrada" },
  "promise:diego": { name: "Diego Ramos", amount: "R$ 210,00", due: "prometido para 17/05", method: "mensalidade", state: "promise", status: "Promessa registrada" },
  "exception:carla": { name: "Carla Nunes", amount: "R$ 120,00", due: "desconto fora da politica", method: "agente", state: "promise", status: "Exceção financeira" },
  "exception:roberto": { name: "Roberto Lima", amount: "R$ 2.360,00", due: "renegociacao manual", method: "importacao", state: "promise", status: "Exceção financeira" },
  "exception:silvia": { name: "Silvia Prado", amount: "R$ 840,00", due: "cancelar cobranca recorrente", method: "WhatsApp", state: "promise", status: "Exceção financeira" }
};

function paymentFacts(detail: FinanceCaseDetail, state: PaymentDrawerState): PaymentDrawerFact[] {
  const status = state === "paid" ? "Pago" : state === "promise" ? "Promessa registrada" : detail.status;
  const danger = state === "overdue" || state === "failed";
  return [
    { id: "amount", icon: "wallet", label: "Valor", value: detail.amount },
    { id: "due", icon: "calendar", label: "Vencimento", value: detail.due, tone: danger ? "danger" : undefined },
    { id: "status", icon: "checkCircle", label: "Status", value: status, tone: danger ? "danger" : state === "paid" ? "success" : undefined },
    { id: "type", icon: "folder", label: "Tipo", value: detail.method },
    { id: "origin", icon: "tag", label: "Origem", value: "Sistema / cobrança recorrente" },
    { id: "owner", icon: "clipboard", label: "Responsável", value: "Financeiro" },
    { id: "student", icon: "user", label: "Aluno vinculado", value: detail.name },
    { id: "channel", icon: "message", label: "Canal sugerido", value: <><Icon name="whatsapp" size="13px" /> WhatsApp</>, tone: "whatsapp" }
  ];
}

function FinanceFilters({
  selectedPeriod,
  filterValues,
  onPeriodSelect,
  onFilterValueChange
}: {
  selectedPeriod: string;
  filterValues: Record<string, string | string[]>;
  onPeriodSelect: (filter: PageFilterBarFilter) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
}) {
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      { id: "today", label: "Hoje", kind: "quick", selected: selectedPeriod === "today" },
      { id: "week", label: "Esta semana", kind: "quick", selected: selectedPeriod === "week" },
      { id: "month", label: "Este mes", kind: "quick", selected: selectedPeriod === "month" },
      {
        id: "unit",
        label: "Unidade",
        value: typeof filterValues.unit === "string" ? filterValues.unit : "",
        options: [
          { value: "vila-mariana", label: "Vila Mariana", icon: "home" },
          { value: "pinheiros", label: "Pinheiros", icon: "home" }
        ]
      },
      {
        id: "status",
        label: "Status",
        value: typeof filterValues.status === "string" ? filterValues.status : "",
        options: [
          { value: "atrasado", label: "Atrasado", icon: "alert" },
          { value: "conciliacao", label: "Conciliacao", icon: "clock" },
          { value: "pago", label: "Pago", icon: "checkCircle" }
        ]
      },
      {
        id: "owner",
        label: "Responsavel",
        value: typeof filterValues.owner === "string" ? filterValues.owner : "",
        options: [
          { value: "financeiro", label: "Financeiro", icon: "coins" },
          { value: "mariana", label: "Mariana", icon: "user" },
          { value: "coordenacao", label: "Coordenacao", icon: "users" }
        ]
      }
    ],
    [filterValues.owner, filterValues.status, filterValues.unit, selectedPeriod]
  );

  return (
    <PageFilterBar
      aria-label="Filtros financeiros"
      className="sb-image-coverage-finance-filters"
      filterGroupLabel="Filtros financeiros"
      filters={filters}
      onFilterSelect={onPeriodSelect}
      onFilterValueChange={onFilterValueChange}
      searchVisible={false}
    />
  );
}

function FinanceQueues({
  compact = false,
  onOpenCase,
  onViewAll
}: {
  compact?: boolean;
  onOpenCase: (caseId: string) => void;
  onViewAll: (state: string) => void;
}) {
  return (
    <FinanceQueueGrid density={compact ? "compact" : "default"}>
      {financeCaseStates.map((state) => (
        <PaymentCaseCard
          key={state}
          onOpen={(caseId) => onOpenCase(`${state}:${caseId}`)}
          onViewAll={() => onViewAll(state)}
          state={state}
        />
      ))}
    </FinanceQueueGrid>
  );
}

function FinanceHeaderActions({ onAction }: { onAction: (action: string) => void }) {
  return (
    <ButtonGroup>
      <Button leadingIcon="plus" onClick={() => onAction("nova cobrança")} size="sm" variant="secondary">Nova cobranca</Button>
      <Button leadingIcon="upload" onClick={() => onAction("exportar")} size="sm" variant="secondary">Exportar</Button>
      <Button leadingIcon="calendar" onClick={() => onAction("criar tarefa")} size="sm" variant="secondary">Criar tarefa</Button>
    </ButtonGroup>
  );
}

function FinanceOverviewMain({ compactQueues = false, onEvent, onOpenCase }: { compactQueues?: boolean; onEvent: (event: string) => void; onOpenCase?: (caseId: string) => void }) {
  const [selectedPriorityId, setSelectedPriorityId] = useState("");

  return (
    <>
      <FinancePriorityPanel
        items={financePriorities}
        selectedId={selectedPriorityId}
        onSelect={(priority) => {
          setSelectedPriorityId(priority.id);
          onEvent(`Prioridade selecionada: ${priority.id}`);
        }}
      />
      <FinanceQueues
        compact={compactQueues}
        onOpenCase={(caseId) => {
          onEvent(`Cobrança selecionada: ${caseId}`);
          onOpenCase?.(caseId);
        }}
        onViewAll={(state) => onEvent(`Fila aberta: ${state}`)}
      />
    </>
  );
}

function FinanceOverviewDashboard({
  announcement: controlledAnnouncement,
  drawer,
  onInteraction,
  onOpenCase
}: {
  announcement?: string;
  drawer?: React.ReactNode;
  onInteraction?: (message: string) => void;
  onOpenCase?: (caseId: string) => void;
} = {}) {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [announcement, setAnnouncement] = useState("");
  const announce = onInteraction ?? setAnnouncement;
  const visibleAnnouncement = controlledAnnouncement ?? announcement;

  return (
    <>
      <CrmDashboardPage
        activeNavId="overview"
        activeSidebarId="financeiro"
        avatarSrc={image79Avatar}
        before={
          <FinanceFilters
            filterValues={filterValues}
            selectedPeriod={selectedPeriod}
            onFilterValueChange={(filter, value) => {
              setFilterValues((current) => ({ ...current, [filter.id]: value }));
              announce(`Filtro alterado: ${filter.id}`);
            }}
            onPeriodSelect={(filter) => {
              setSelectedPeriod(filter.id);
              announce(`Período selecionado: ${filter.label}`);
            }}
          />
        }
        className="sb-image-coverage-finance-shell"
        columns={1}
        drawer={drawer}
        globalActions={{
          onAvatar: () => announce("Perfil da operadora aberto"),
          onMessages: () => announce("Mensagens abertas"),
          onNotifications: () => announce("Notificações abertas"),
          onSearch: () => announce("Busca global aberta")
        }}
        layoutVariant="finance-overview"
        navItems={financeNavItems}
        onBack={() => announce("Navegação de retorno acionada")}
        onNavChange={(id) => announce(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => announce(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => announce(`Preferência selecionada: ${item.label}`)}
        pageHeaderActions={<FinanceHeaderActions onAction={(action) => announce(`Ação financeira: ${action}`)} />}
        pageHeaderRhythm="overview"
        sidebarItems={crmEmptyShellSidebarItems}
        stageClassName="sb-image-coverage-finance-stage"
        subtitle="Filas financeiras e pendencias do estudio"
        title="Financeiro"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        <FinanceOverviewMain compactQueues={Boolean(drawer)} onEvent={announce} onOpenCase={onOpenCase} />
      </CrmDashboardPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{visibleAnnouncement}</span>
    </>
  );
}

function FinanceiroKanbanFilters({
  onInteraction
}: {
  onInteraction: (message: string) => void;
}) {
  const [values, setValues] = useState<Record<string, string | string[]>>({ period: "hoje" });
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      { id: "hoje", kind: "quick", label: "Hoje", selected: values.period === "hoje" },
      { id: "semana", kind: "quick", label: "Esta semana", selected: values.period === "semana" },
      { id: "mes", kind: "quick", label: "Este mes", selected: values.period === "mes" },
      { id: "unidade", label: "Unidade", value: typeof values.unidade === "string" ? values.unidade : "", options: [{ value: "vila-mariana", label: "Vila Mariana", icon: "home" }, { value: "moema", label: "Moema", icon: "home" }] },
      { id: "responsavel", label: "Responsavel", value: typeof values.responsavel === "string" ? values.responsavel : "", options: [{ value: "financeiro", label: "Financeiro", icon: "coins" }, { value: "mariana", label: "Mariana", icon: "user" }, { value: "agente", label: "Agente", icon: "bot" }] },
      { id: "tipo", label: "Tipo", value: typeof values.tipo === "string" ? values.tipo : "", options: [{ value: "mensalidade", label: "Mensalidade", icon: "wallet" }, { value: "plano", label: "Plano", icon: "creditCard" }, { value: "pix", label: "Pix", icon: "whatsapp" }] },
      { id: "status", label: "Status", value: typeof values.status === "string" ? values.status : "", options: [{ value: "atraso", label: "Em atraso", icon: "alert" }, { value: "promessa", label: "Promessa", icon: "messageMore" }, { value: "resolvido", label: "Resolvido", icon: "checkCircle" }] }
    ],
    [values]
  );

  return (
    <PageFilterBar
      filters={filters}
      onFilterSelect={(filter) => {
        setValues((current) => ({ ...current, period: filter.id }));
        onInteraction(`Período do kanban: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro do kanban alterado: ${filter.id}`);
      }}
      searchVisible={false}
    />
  );
}

type FinanceKanbanCardData = {
  id: string;
  title: string;
  amount: string;
  state: "scheduled" | "today" | "overdue" | "promise" | "validation" | "reconciliation" | "resolved";
  due: string;
  method: string;
  owner?: string;
};

type FinanceKanbanColumnData = {
  id: string;
  title: string;
  count: number;
  total: string;
  state: "default" | "waiting" | "blocked" | "resolved";
  cards: FinanceKanbanCardData[];
};

const financeKanbanInitialColumns: FinanceKanbanColumnData[] = [
  { id: "due", title: "A vencer", count: 12, total: "R$ 6.730,00", state: "default", cards: [{ id: "fernanda", title: "Fernanda Lima", amount: "R$ 420,00", state: "scheduled", due: "vence 14/05", method: "mensalidade" }, { id: "rafael", title: "Rafael Martins", amount: "R$ 980,00", state: "scheduled", due: "vence 15/05", method: "plano trimestral" }, { id: "bianca", title: "Bianca Oliveira", amount: "R$ 290,00", state: "scheduled", due: "vence 16/05", method: "aula avulsa" }] },
  { id: "today", title: "Vence hoje", count: 8, total: "R$ 3.850,00", state: "waiting", cards: [{ id: "lucas", title: "Lucas Ferreira", amount: "R$ 980,00", state: "today", due: "vence hoje 20:00", method: "plano trimestral" }, { id: "marina", title: "Marina Costa", amount: "R$ 210,00", state: "today", due: "vence hoje 21:00", method: "mensalidade" }, { id: "camila", title: "Camila Souza", amount: "R$ 420,00", state: "today", due: "vence hoje 18:00", method: "Pix" }] },
  { id: "overdue", title: "Em atraso", count: 14, total: "R$ 5.430,00", state: "blocked", cards: [{ id: "gabriela", title: "Gabriela Lima", amount: "R$ 420,00", state: "overdue", due: "2 dias em atraso", method: "mensalidade" }, { id: "eduardo", title: "Eduardo Santos", amount: "R$ 210,00", state: "overdue", due: "5 dias em atraso", method: "Pix" }, { id: "isabela", title: "Isabela Prado", amount: "R$ 980,00", state: "overdue", due: "7 dias em atraso", method: "plano trimestral" }] },
  { id: "promise", title: "Promessa", count: 9, total: "R$ 3.100,00", state: "waiting", cards: [{ id: "felipe", title: "Felipe Costa", amount: "R$ 420,00", state: "promise", due: "prometido para 15/05", method: "WhatsApp" }, { id: "renata", title: "Renata Alves", amount: "R$ 980,00", state: "promise", due: "prometido para 16/05", method: "WhatsApp" }, { id: "diego", title: "Diego Ramos", amount: "R$ 210,00", state: "promise", due: "prometido para 17/05", method: "mensalidade" }] },
  { id: "validation", title: "Comprovante", count: 11, total: "R$ 4.620,00", state: "default", cards: [{ id: "ana-proof", title: "Ana Paula Martins", amount: "R$ 420,00", state: "validation", due: "comprovante enviado 09/05", method: "Pix", owner: "Mariana" }, { id: "gustavo-proof", title: "Gustavo Lima", amount: "R$ 980,00", state: "validation", due: "comprovante enviado 10/05", method: "Pix", owner: "Mariana" }, { id: "marina-proof", title: "Marina Beatriz", amount: "R$ 210,00", state: "validation", due: "comprovante enviado 11/05", method: "cartao" }] },
  { id: "reconciliation", title: "Conciliacao", count: 6, total: "R$ 2.390,00", state: "default", cards: [{ id: "bruno", title: "Bruno Mendes", amount: "R$ 420,00", state: "reconciliation", due: "cartao recusado", method: "cartao", owner: "Sistema" }, { id: "carolina", title: "Carolina Dias", amount: "R$ 980,00", state: "reconciliation", due: "limite insuficiente", method: "cartao", owner: "Sistema" }, { id: "joao", title: "Joao Victor", amount: "R$ 210,00", state: "reconciliation", due: "Pix duvidoso", method: "WhatsApp", owner: "Sistema" }] },
  { id: "resolved", title: "Resolvido", count: 15, total: "R$ 8.740,00", state: "resolved", cards: [{ id: "pedro", title: "Pedro Henrique", amount: "R$ 420,00", state: "resolved", due: "pago em 09/05", method: "Pix" }, { id: "juliana", title: "Juliana Rocha", amount: "R$ 980,00", state: "resolved", due: "pago em 10/05", method: "cartao" }, { id: "thiago", title: "Thiago Alves", amount: "R$ 210,00", state: "resolved", due: "pago em 11/05", method: "WhatsApp" }] }
];

function financeKanbanDrawerState(card: FinanceKanbanCardData): PaymentDrawerState {
  if (card.state === "resolved") return "paid";
  if (card.state === "overdue") return "overdue";
  if (card.state === "promise") return "promise";
  if (["validation", "reconciliation"].includes(card.state)) return "reconciliation";
  return "due";
}

function financeKanbanActions(card: FinanceKanbanCardData): PaymentDrawerActionConfig[] {
  if (card.state === "resolved") return [
    { id: "open-receipt", label: "Abrir comprovante", leadingIcon: "clipboard", placement: "primary", variant: "primary" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
  ];
  if (card.state === "validation") return [
    { id: "approve-receipt", label: "Aprovar comprovante", leadingIcon: "checkCircle", placement: "primary", variant: "primary" },
    { id: "move-stage", label: "Mover etapa", leadingIcon: "refresh" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
  ];
  return [
    { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag", placement: "primary", variant: "primary" },
    { id: "register-promise", label: "Registrar promessa", leadingIcon: "calendar" },
    { id: "move-stage", label: "Mover etapa", leadingIcon: "refresh" },
    { id: "mark-paid", label: "Marcar como pago", leadingIcon: "checkCircle" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
  ];
}

function FinanceKanbanColumns({ columns, onCardMenu, onCardSelect, onInteraction, selectedCardId }: {
  columns: FinanceKanbanColumnData[];
  onCardMenu: (cardId: string) => void;
  onCardSelect: (cardId: string) => void;
  onInteraction: (message: string) => void;
  selectedCardId: string;
}) {

  return (
    <>
      {columns.map((column) => (
        <KanbanColumn
          count={column.count}
          key={column.title}
          meta={column.total}
          onMenu={() => onInteraction(`Menu da coluna: ${column.title}`)}
          state={column.state}
          title={column.title}
        >
          {column.cards.map((card) => {
            return (
              <FinanceKanbanCard
                key={card.id}
                {...card}
                onMenu={() => onCardMenu(card.id)}
                onSelect={() => onCardSelect(card.id)}
                selected={selectedCardId === card.id}
              />
            );
          })}
          <Button leadingIcon="plus" onClick={() => onInteraction(`Adicionar cobrança em: ${column.title}`)} size="sm" variant="secondary">Adicionar</Button>
        </KanbanColumn>
      ))}
    </>
  );
}

function MovementsFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({ type: "", status: "", plan: "", method: "", owner: "" });
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedPeriod === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedPeriod === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: selectedPeriod === "month" },
    { id: "type", label: "Tipo de movimentacao", value: String(values.type ?? ""), options: [{ value: "mensalidade", label: "Mensalidade" }, { value: "pagamento", label: "Pagamento" }, { value: "falha", label: "Falha de cartao" }, { value: "conciliacao", label: "Conciliacao" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "a-vencer", label: "A vencer" }, { value: "pago", label: "Pago" }, { value: "em-atraso", label: "Em atraso" }, { value: "prometido", label: "Prometido" }] },
    { id: "plan", label: "Plano", value: String(values.plan ?? ""), options: [{ value: "mensal", label: "Plano Mensal" }, { value: "premium", label: "Premium" }, { value: "trimestral", label: "Trimestral" }] },
    { id: "method", label: "Metodo", value: String(values.method ?? ""), options: [{ value: "pix", label: "Pix" }, { value: "cartao", label: "Cartao" }, { value: "manual", label: "Manual" }] },
    { id: "owner", label: "Responsavel", value: String(values.owner ?? ""), options: [{ value: "financeiro", label: "Financeiro" }, { value: "mariana", label: "Mariana" }, { value: "coordenacao", label: "Coordenacao" }] },
    { id: "origin", label: "Origem", value: String(values.origin ?? ""), placement: "advanced", options: [{ value: "sistema", label: "Sistema" }, { value: "whatsapp", label: "WhatsApp" }, { value: "importacao", label: "Importacao" }] },
    { id: "channel", label: "Canal", value: String(values.channel ?? ""), placement: "advanced", options: [{ value: "pix", label: "Pix" }, { value: "cartao", label: "Cartao" }, { value: "manual", label: "Manual" }] }
  ];

  return (
    <PageFilterBar
      actions={<ButtonGroup><Button leadingIcon="plus" onClick={() => onInteraction("Nova cobrança iniciada")} size="sm" variant="secondary">Nova cobranca</Button><Button leadingIcon="upload" onClick={() => onInteraction("Exportação iniciada")} size="sm" variant="secondary">Exportar</Button></ButtonGroup>}
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTriggerVariant="button"
      density="tight"
      filters={filters}
      layout="stacked"
      onFilterSelect={(filter) => {
        setSelectedPeriod(filter.id);
        onInteraction(`Período das movimentações: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de movimentações alterado: ${filter.id}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onInteraction(`Busca de movimentações: ${value || "limpa"}`);
      }}
      onSearchFilter={() => onInteraction("Filtros de busca abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de movimentacao"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por aluno, ID, telefone, cobranca ou movimentacao"
    />
  );
}

function MovementsQuickFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("due");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todas", icon: "users", count: "256", selected: selectedId === "all" },
    { id: "due", label: "A vencer", icon: "calendar", count: "34", tone: "info", selected: selectedId === "due" },
    { id: "received", label: "Recebidas hoje", icon: "checkCircle", count: "18", selected: selectedId === "received" },
    { id: "overdue", label: "Atrasadas", icon: "alert", count: "23", tone: "danger", selected: selectedId === "overdue" },
    { id: "promise", label: "Promessas", icon: "refresh", count: "16", tone: "warning", selected: selectedId === "promise" },
    { id: "failed", label: "Falhas", icon: "x", count: "12", tone: "danger", selected: selectedId === "failed" },
    { id: "reconciliation", label: "Conciliacao pendente", icon: "pieChart", count: "11", tone: "info", selected: selectedId === "reconciliation" },
    { id: "receipts", label: "Comprovantes", icon: "clipboard", count: "20", selected: selectedId === "receipts" },
    { id: "refunds", label: "Estornos", icon: "refresh", count: "7", tone: "info", selected: selectedId === "refunds" },
    { id: "adjustments", label: "Ajustes", icon: "sliders", count: "9", tone: "info", selected: selectedId === "adjustments" },
    { id: "discounts", label: "Descontos", icon: "tag", count: "8", selected: selectedId === "discounts" }
  ];

  return <PageQuickFilters aria-label="Filtros rapidos de movimentacoes" heading="Filtros rapidos" items={items} onSelect={(item) => { setSelectedId(item.id); onInteraction(`Filtro rápido: ${item.label}`); }} selectionTone="soft" />;
}

interface MovementRow {
  id: string;
  student: string;
  avatarSrc: string;
  type: string;
  typeTone: ComponentTone;
  status: string;
  statusTone: ComponentTone;
  amount: string;
  due: string;
  plan: string;
  method: string;
  origin: string;
  owner: string;
  activity: string;
}

function movementTypeTableLabel(type: string) {
  return type === "Desconto aprovado" ? "Desconto" : type;
}

const movementRows: MovementRow[] = [
    { id: "fernanda", student: "Fernanda Lima", avatarSrc: source34FernandaLima, type: "Mensalidade", typeTone: "info", status: "A vencer", statusTone: "info", amount: "R$ 420,00", due: "14/05", plan: "Mensal", method: "Pix", origin: "Sistema", owner: "Financeiro", activity: "gerada hoje" },
    { id: "juliana", student: "Juliana Rocha", avatarSrc: source34JulianaRocha, type: "Recebido", typeTone: "success", status: "Pago", statusTone: "success", amount: "R$ 420,00", due: "-", plan: "Mensal", method: "Pix", origin: "WhatsApp", owner: "Mariana", activity: "pago 09:12" },
    { id: "gabriel", student: "Gabriel Lima", avatarSrc: source34GabrielLima, type: "Atrasada", typeTone: "danger", status: "Em atraso", statusTone: "danger", amount: "R$ 420,00", due: "12/05", plan: "Mensal", method: "Cartao", origin: "Sistema", owner: "Financeiro", activity: "lembrete ontem" },
    { id: "bruno", student: "Bruno Mendes", avatarSrc: image79Avatar, type: "Falha", typeTone: "danger", status: "Falha", statusTone: "danger", amount: "R$ 420,00", due: "13/05", plan: "Premium", method: "Cartao", origin: "Gateway", owner: "Financeiro", activity: "cartao recusado" },
    { id: "renata", student: "Renata Alves", avatarSrc: image79Avatar, type: "Promessa", typeTone: "warning", status: "Prometido", statusTone: "warning", amount: "R$ 980,00", due: "15/05", plan: "Trimestral", method: "WhatsApp", origin: "Agente", owner: "Coordenacao", activity: "promessa 15/05" },
    { id: "ana", student: "Ana Paula Martins", avatarSrc: source34AnaPaulaMartins, type: "Conciliacao", typeTone: "info", status: "Pendente", statusTone: "warning", amount: "R$ 420,00", due: "-", plan: "Mensal", method: "Pix", origin: "Importacao", owner: "Financeiro", activity: "comprovante 09:45" },
    { id: "marina", student: "Marina Beatriz", avatarSrc: image79Avatar, type: "Comprovante", typeTone: "info", status: "Em analise", statusTone: "info", amount: "R$ 210,00", due: "-", plan: "Avulsa", method: "Pix", origin: "WhatsApp", owner: "Financeiro", activity: "enviado hoje" },
    { id: "carla", student: "Carla Nunes", avatarSrc: image79Avatar, type: "Estorno", typeTone: "neutral", status: "Estornado", statusTone: "neutral", amount: "R$ 120,00", due: "-", plan: "Avulso", method: "Cartao", origin: "Sistema", owner: "Coordenacao", activity: "processado ontem" },
    { id: "roberto", student: "Roberto Lima", avatarSrc: image79Avatar, type: "Desconto aprovado", typeTone: "success", status: "Aprovado", statusTone: "success", amount: "R$ 180,00", due: "-", plan: "Premium", method: "Manual", origin: "Coordenacao", owner: "Coordenacao", activity: "desconto aprovado" },
    { id: "silvia", student: "Silvia Prado", avatarSrc: image79Avatar, type: "Ajuste manual", typeTone: "info", status: "Ajustado", statusTone: "info", amount: "R$ 75,00", due: "-", plan: "Plano Mensal", method: "Manual", origin: "Financeiro", owner: "Financeiro", activity: "ajuste registrado" },
    { id: "paulo", student: "Paulo Nunes", avatarSrc: image79Avatar, type: "Disputa", typeTone: "danger", status: "Disputa", statusTone: "danger", amount: "R$ 420,00", due: "11/05", plan: "Mensal", method: "Cartao", origin: "Gateway", owner: "Financeiro", activity: "contestada hoje" }
];

function movementDrawerState(row: MovementRow): PaymentDrawerState {
  if (row.status === "Pago") return "paid";
  if (row.status === "Em atraso") return "overdue";
  if (row.status === "Falha") return "failed";
  if (row.status === "Disputa") return "dispute";
  if (["Pendente", "Em analise"].includes(row.status)) return "reconciliation";
  if (row.status === "Prometido") return "promise";
  if (["Estornado", "Aprovado", "Ajustado"].includes(row.status)) return "reconciled";
  return "open";
}

function movementDrawerActions(state: PaymentDrawerState): PaymentDrawerActionConfig[] {
  const footer: PaymentDrawerActionConfig = { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" };
  if (state === "reconciliation") return [
    { id: "reconcile", label: "Conciliar movimentação", leadingIcon: "checkCircle", placement: "primary", variant: "primary" },
    { id: "open-receipt", label: "Abrir comprovante", leadingIcon: "clipboard" },
    { id: "export-movement", label: "Exportar comprovante", leadingIcon: "download" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    footer
  ];
  if (state === "dispute") return [
    { id: "resolve-dispute", label: "Resolver disputa", leadingIcon: "checkCircle", placement: "primary", variant: "primary" },
    { id: "open-receipt", label: "Abrir comprovante", leadingIcon: "clipboard" },
    { id: "export-movement", label: "Exportar movimentação", leadingIcon: "download" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    footer
  ];
  if (state === "paid" || state === "reconciled") return [
    { id: "export-movement", label: "Exportar comprovante", leadingIcon: "download", placement: "primary", variant: "primary" },
    { id: "open-receipt", label: "Abrir comprovante", leadingIcon: "clipboard" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    footer
  ];
  if (state === "failed") return [
    { id: "confirm-payment", label: "Confirmar pagamento", leadingIcon: "checkCircle", placement: "primary", variant: "primary" },
    { id: "open-conversation", label: "Abrir conversa", leadingIcon: "whatsapp" },
    { id: "export-movement", label: "Exportar movimentação", leadingIcon: "download" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    footer
  ];
  return [
    { id: "confirm-payment", label: "Confirmar pagamento", leadingIcon: "checkCircle", placement: "primary", variant: "primary" },
    { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag" },
    { id: "export-movement", label: "Exportar movimentação", leadingIcon: "download" },
    { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
    footer
  ];
}

const movementActionLabels: Record<PaymentDrawerAction, string> = {
  close: "Detalhes da movimentação fechados",
  "send-reminder": "Lembrete financeiro enviado",
  "open-charge": "Cobrança aberta",
  "register-promise": "Promessa registrada",
  "move-stage": "Cobrança movida",
  "approve-receipt": "Comprovante aprovado",
  "copy-pix-link": "Link Pix copiado",
  "open-conversation": "Conversa financeira aberta",
  "mark-paid": "Pagamento confirmado",
  "confirm-payment": "Pagamento confirmado",
  reconcile: "Movimentação conciliada",
  "resolve-dispute": "Disputa resolvida",
  "open-receipt": "Comprovante aberto",
  "export-movement": "Movimentação exportada",
  "create-task": "Tarefa financeira criada",
  "open-student": "Aluno aberto"
};

function movementDrawerFacts(row: MovementRow, state: PaymentDrawerState): PaymentDrawerFact[] {
  const status = state === "paid" ? "Pago" : row.status;
  const danger = state === "overdue" || state === "failed";
  return [
    { id: "amount", icon: "wallet", label: "Valor", value: row.amount },
    { id: "due", icon: "calendar", label: "Vencimento", value: row.due, tone: danger ? "danger" : undefined },
    { id: "plan", icon: "graduation", label: "Plano", value: row.plan },
    { id: "method", icon: "tag", label: "Metodo", value: row.method, tone: row.method === "Pix" ? "success" : undefined },
    { id: "origin", icon: "graduation", label: "Origem", value: row.origin },
    { id: "owner", icon: "user", label: "Responsavel", value: row.owner },
    { id: "status", icon: "checkCircle", label: "Status", value: status, tone: danger ? "danger" : state === "paid" ? "success" : undefined },
    { id: "channel", icon: "message", label: "Canal sugerido", value: <><Icon name="whatsapp" size="13px" /> WhatsApp</>, tone: "whatsapp" }
  ];
}

function MovementTable({
  onInteraction,
  onPageChange,
  onRowSelect,
  page,
  selectedRowId = "fernanda"
}: {
  onInteraction: (message: string) => void;
  onPageChange: (page: number) => void;
  onRowSelect?: (row: MovementRow) => void;
  page: number;
  selectedRowId?: string;
}) {

  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de movimentacoes financeiras"
      columns={[
        { key: "student", header: "Aluno", render: (row) => <PersonLabel avatarSrc={row.avatarSrc} name={row.student} size="xs" />, sortable: true, width: "16%" },
        { key: "type", header: "Tipo", render: (row) => <Chip showDot={false} tone={row.typeTone}>{movementTypeTableLabel(row.type)}</Chip>, width: "11%" },
        { key: "status", header: "Status", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip>, sortable: true, width: "10%" },
        { key: "amount", header: "Valor", sortable: true, width: "9%" },
        { key: "due", header: "Vencimento", width: "9%" },
        { key: "plan", header: "Plano", width: "10%" },
        { key: "method", header: "Metodo", width: "9%" },
        { key: "origin", header: "Origem", width: "9%" },
        { key: "owner", header: "Responsavel", width: "9%" },
        { key: "activity", header: "Ultima atividade", width: "12%" }
      ]}
      density="compact"
      minTableWidth="var(--taliya-control-crm-movements-table-min-width)"
      pagination={{
        itemsPerPage: "10",
        label: `${(page - 1) * 10 + 1}-${Math.min(page * 10, 256)} de 256`,
        page,
        pageCount: 26,
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => { const nextPage = Math.min(page + 1, 26); onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); },
        onPageChange: (nextPage) => { onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); },
        onPreviousPage: () => { const nextPage = Math.max(page - 1, 1); onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); }
      }}
      rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.student}`} onClick={(event) => { event.stopPropagation(); onInteraction(`Menu da movimentação: ${row.id}`); }} size="sm" variant="ghost" />}
      rows={movementRows}
      onRowSelect={onRowSelect}
      selectedRowId={selectedRowId}
    />
  );
}

export const Image30VisaoGeralFilas: Story = {
  name: "30 visao geral filas",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 30_round-4.1F_financeiro_01_visao-geral-filas.png.png. Status: coverage de pagina com CrmDashboardPage, PageFilterBar sem busca e componentes financeiros oficiais; ainda nao aprovada 1:1."
      }
    }
  },
  render: () => <FinanceBillingDrawerPage initialDrawerOpen={false} />
};

export function FinanceBillingDrawerPage({ initialDrawerOpen = true }: { initialDrawerOpen?: boolean } = {}) {
  const [drawerOpen, setDrawerOpen] = useState(initialDrawerOpen);
  const [selectedCaseId, setSelectedCaseId] = useState("overdue:gabriela");
  const [drawerState, setDrawerState] = useState<PaymentDrawerState>();
  const [announcement, setAnnouncement] = useState("");
  const detail = financeCaseDetails[selectedCaseId] ?? financeCaseDetails["overdue:gabriela"]!;
  const effectiveState = drawerState ?? detail.state;
  const effectiveStatus = effectiveState === "paid" ? "Pago" : drawerState === "promise" ? "Promessa registrada" : detail.status;

  function handleDrawerAction(action: PaymentDrawerAction) {
    if (action === "mark-paid") setDrawerState("paid");
    if (action === "register-promise") setDrawerState("promise");
    setAnnouncement(`Ação da cobrança: ${action}`);
  }

  return (
    <FinanceOverviewDashboard
      announcement={announcement}
      drawer={drawerOpen ? (
        <PaymentDrawer
          amount={detail.amount}
          context={[`${detail.name}: ${detail.due}.`, `Método registrado: ${detail.method}.`]}
          copilotSuggestion={`Identificamos a cobrança de ${detail.amount} para ${detail.name}. Posso ajudar com o próximo passo?`}
          facts={paymentFacts(detail, effectiveState)}
          name={detail.name}
          onAction={handleDrawerAction}
          onClose={() => setDrawerOpen(false)}
          state={effectiveState}
          statusLabel={effectiveStatus}
        />
      ) : null}
      onInteraction={setAnnouncement}
      onOpenCase={(caseId) => {
        setSelectedCaseId(caseId);
        setDrawerState(undefined);
        setDrawerOpen(true);
      }}
    />
  );
}

export function FinanceKanbanPage() {
  const [announcement, setAnnouncement] = useState("");
  const [columns, setColumns] = useState(financeKanbanInitialColumns);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedEntry = columns
    .flatMap((column) => column.cards.map((card) => ({ card, column })))
    .find(({ card }) => card.id === selectedCardId);

  const updateCard = (cardId: string, targetColumnId: string | undefined, patch: Partial<FinanceKanbanCardData>) => {
    setColumns((current) => {
      const source = current.find((column) => column.cards.some((card) => card.id === cardId));
      if (!source) return current;
      const target = current.find((column) => column.id === (targetColumnId ?? source.id));
      const card = source.cards.find((item) => item.id === cardId);
      if (!target || !card) return current;
      const updatedCard = { ...card, ...patch };
      if (source.id === target.id) {
        return current.map((column) => column.id === source.id
          ? { ...column, cards: column.cards.map((item) => item.id === cardId ? updatedCard : item) }
          : column);
      }
      return current.map((column) => {
        if (column.id === source.id) return { ...column, count: Math.max(0, column.count - 1), cards: column.cards.filter((item) => item.id !== cardId) };
        if (column.id === target.id) return { ...column, count: column.count + 1, cards: [...column.cards, updatedCard] };
        return column;
      });
    });
  };

  const handleKanbanAction = (action: PaymentDrawerAction) => {
    if (!selectedEntry) return;
    const currentIndex = columns.findIndex((column) => column.id === selectedEntry.column.id);
    const nextColumn = columns[Math.min(columns.length - 1, currentIndex + 1)];
    if (action === "send-reminder") updateCard(selectedCardId, undefined, { due: "lembrete enviado agora" });
    if (action === "register-promise") updateCard(selectedCardId, "promise", { state: "promise", due: "prometido para amanhã" });
    if (action === "move-stage") updateCard(selectedCardId, nextColumn?.id, { due: `movido para ${nextColumn?.title ?? selectedEntry.column.title}` });
    if (["approve-receipt", "mark-paid", "confirm-payment"].includes(action)) {
      updateCard(selectedCardId, "resolved", { state: "resolved", due: "pago agora" });
    }
    setAnnouncement(`${movementActionLabels[action]}: ${selectedEntry.card.title}`);
  };

  const selectedCard = selectedEntry?.card;
  const drawerState = selectedCard ? financeKanbanDrawerState(selectedCard) : "due";
  const drawerFacts: PaymentDrawerFact[] = selectedCard ? [
    { id: "amount", icon: "wallet", label: "Valor", value: selectedCard.amount },
    { id: "due", icon: "calendar", label: "Vencimento", value: selectedCard.due, tone: selectedCard.state === "overdue" ? "danger" : undefined },
    { id: "method", icon: "tag", label: "Metodo", value: selectedCard.method },
    { id: "owner", icon: "user", label: "Responsavel", value: selectedCard.owner ?? "Financeiro" },
    { id: "status", icon: "checkCircle", label: "Status", value: selectedEntry?.column.title ?? "A vencer", tone: selectedCard.state === "resolved" ? "success" : selectedCard.state === "overdue" ? "danger" : undefined },
    { id: "student", icon: "user", label: "Aluno vinculado", value: selectedCard.title }
  ] : [];

  return (
    <>
      <CrmKanbanPage
        activeNavId="kanban"
        activeSidebarId="financeiro"
        avatarSrc={image79Avatar}
        className="sb-image-coverage-finance-shell"
        drawer={drawerOpen && selectedCard ? (
          <PaymentDrawer
            actions={financeKanbanActions(selectedCard)}
            amount={selectedCard.amount}
            context={[`${selectedEntry?.column.title}: ${selectedCard.due}.`, `Método registrado: ${selectedCard.method}.`]}
            copilotSuggestion={`Revise a cobrança de ${selectedCard.title} e escolha o próximo passo financeiro.`}
            facts={drawerFacts}
            name={selectedCard.title}
            onAction={handleKanbanAction}
            onClose={() => {
              setDrawerOpen(false);
              setAnnouncement("Drawer financeiro fechado");
            }}
            state={drawerState}
            statusLabel={selectedEntry?.column.title}
          />
        ) : null}
        filterBar={<FinanceiroKanbanFilters onInteraction={setAnnouncement} />}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        layoutVariant="finance"
        navItems={financeNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderActions={(
          <ButtonGroup>
            <Button leadingIcon="plus" onClick={() => setAnnouncement("Nova cobrança iniciada")} size="sm" variant="secondary">Nova cobranca</Button>
            <Button leadingIcon="upload" onClick={() => setAnnouncement("Exportação iniciada")} size="sm" variant="secondary">Exportar</Button>
            <Button leadingIcon="calendar" onClick={() => setAnnouncement("Criação de tarefa iniciada")} size="sm" variant="secondary">Criar tarefa</Button>
          </ButtonGroup>
        )}
        pageHeaderRhythm="overview"
        sidebarItems={crmEmptyShellSidebarItems}
        stageClassName="sb-image-coverage-finance-stage"
        subtitle="Cobrancas e pendencias por etapa"
        title="Financeiro"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        <FinanceKanbanColumns
          columns={columns}
          onCardMenu={(cardId) => {
            setSelectedCardId(cardId);
            setDrawerOpen(true);
            setAnnouncement(`Menu da cobrança aberto: ${cardId}`);
          }}
          onCardSelect={(cardId) => {
            setSelectedCardId(cardId);
            setDrawerOpen(true);
            setAnnouncement(`Cobrança selecionada: ${cardId}`);
          }}
          onInteraction={setAnnouncement}
          selectedCardId={selectedCardId}
        />
      </CrmKanbanPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function FinanceMovementsPage() {
  const [selectedMovementId, setSelectedMovementId] = useState("fernanda");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [drawerState, setDrawerState] = useState<PaymentDrawerState>();
  const [announcement, setAnnouncement] = useState("");
  const [page, setPage] = useState(1);
  const selectedMovement = movementRows.find((row) => row.id === selectedMovementId) ?? movementRows[0]!;
  const effectiveDrawerState = drawerState ?? movementDrawerState(selectedMovement);
  const effectiveStatus = effectiveDrawerState === "paid" ? "Pago" : effectiveDrawerState === "reconciled" ? "Conciliado" : selectedMovement.status;

  function handleMovementAction(action: PaymentDrawerAction) {
    if (action === "mark-paid" || action === "confirm-payment") setDrawerState("paid");
    if (action === "reconcile" || action === "resolve-dispute") setDrawerState("reconciled");
    setAnnouncement(`${movementActionLabels[action]}: ${selectedMovement.student}`);
  }

  return (
    <>
      <CrmWorklistPage
        activeNavId="movements"
        activeSidebarId="financeiro"
        avatarSrc={image79Avatar}
        className="sb-image-coverage-finance-shell"
        contentLayout="work-list-wide"
        drawer={drawerOpen ? (
          <PaymentDrawer
            amount={selectedMovement.amount}
            actions={movementDrawerActions(effectiveDrawerState)}
            compact
            context={[`${selectedMovement.type} de ${selectedMovement.amount}.`, `Última atividade: ${selectedMovement.activity}.`]}
            copilotSuggestion={`Revise ${selectedMovement.type.toLowerCase()} de ${selectedMovement.student} e escolha o próximo passo operacional.`}
            eyebrow={selectedMovement.type}
            facts={movementDrawerFacts(selectedMovement, effectiveDrawerState)}
            history={[
              { id: "created", label: `${selectedMovement.type} registrada` },
              { id: "activity", label: selectedMovement.activity },
              { id: "owner", label: `Responsável: ${selectedMovement.owner}` }
            ]}
            name={selectedMovement.student}
            onAction={handleMovementAction}
            onClose={() => setDrawerOpen(false)}
            state={effectiveDrawerState}
            statusLabel={effectiveStatus}
            variant="movement"
          />
        ) : null}
        filterBar={<MovementsFilters onInteraction={setAnnouncement} />}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        navItems={financeNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="overview"
        quickFilters={<MovementsQuickFilters onInteraction={setAnnouncement} />}
        sidebarItems={crmEmptyShellSidebarItems}
        stageClassName="sb-image-coverage-finance-stage"
        subtitle="Mensalidades, cobrancas, pagamentos e ajustes"
        title="Movimentações"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="wide-main"
      >
        <MovementTable
          onInteraction={setAnnouncement}
          onPageChange={setPage}
          onRowSelect={(row) => {
            setSelectedMovementId(row.id);
            setDrawerState(undefined);
            setDrawerOpen(true);
            setAnnouncement(`Movimentação selecionada: ${row.id}`);
          }}
          page={page}
          selectedRowId={selectedMovementId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export const Image32FinanceiroDrawerCobranca: Story = {
  name: "32 financeiro drawer cobranca selecionada",
  parameters: { sourceImage: "32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png" },
  render: () => <FinanceBillingDrawerPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });

    await expect(drawer).toHaveAttribute("data-state", "overdue");
    await userEvent.click(within(drawer).getByRole("button", { name: "Registrar promessa" }));
    await expect(drawer).toHaveAttribute("data-state", "promise");
    await userEvent.click(within(drawer).getByRole("button", { name: "Marcar como pago" }));
    await expect(drawer).toHaveAttribute("data-state", "paid");
    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar cobrança" }));
    await expect(canvas.queryByRole("complementary", { name: "Detalhes da cobrança" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Abrir cobranca de Eduardo Santos" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes da cobrança" })).toBeInTheDocument();
  }
};

export const FinanceOverviewInteractionContract: Story = {
  name: "Financeiro overview interaction contract",
  render: () => <FinanceBillingDrawerPage initialDrawerOpen={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /9 cobrancas atrasadas/ }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Prioridade selecionada: overdue");
    await userEvent.click(canvas.getByRole("button", { name: "Abrir cobranca de Gabriela Lima" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes da cobrança" })).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Cobrança selecionada: overdue:gabriela");
  }
};

export const FinanceBillingInteractionContract: Story = {
  name: "Financeiro billing interaction contract",
  render: () => <FinanceBillingDrawerPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });

    await userEvent.click(within(drawer).getByRole("button", { name: "Registrar promessa" }));
    await expect(drawer).toHaveAttribute("data-state", "promise");
    await userEvent.click(within(drawer).getByRole("button", { name: "Marcar como pago" }));
    await expect(drawer).toHaveAttribute("data-state", "paid");
    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar cobrança" }));
    await expect(canvas.queryByRole("complementary", { name: "Detalhes da cobrança" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Abrir cobranca de Eduardo Santos" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes da cobrança" })).toBeInTheDocument();
  }
};

export const Image33FinanceiroKanban: Story = {
  name: "33 financeiro kanban",
  parameters: { sourceImage: "33_round-4.1F_financeiro_03_kanban-financeiro.png.png" },
  render: () => <FinanceKanbanPage />
};

export const FinanceKanbanInteractionContract: Story = {
  name: "Finance kanban interaction contract",
  render: () => <FinanceKanbanPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /^Fernanda Lima R/ }));
    const drawer = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });
    await expect(drawer).toHaveAttribute("data-state", "due");
    await userEvent.click(within(drawer).getByRole("button", { name: "Enviar lembrete" }));
    await expect(canvas.getByRole("button", { name: /Fernanda Lima.*lembrete enviado agora/ })).toBeInTheDocument();
    await userEvent.click(within(drawer).getByRole("button", { name: "Registrar promessa" }));
    await expect(drawer).toHaveAttribute("data-state", "promise");
    await userEvent.click(within(drawer).getByRole("button", { name: "Marcar como pago" }));
    await expect(drawer).toHaveAttribute("data-state", "paid");
    await expect(within(drawer).queryByRole("button", { name: "Marcar como pago" })).not.toBeInTheDocument();

    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar cobrança" }));
    await userEvent.click(canvas.getByRole("button", { name: /^Ana Paula Martins R/ }));
    const proofDrawer = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });
    await expect(proofDrawer).toHaveAttribute("data-state", "reconciliation");
    await userEvent.click(within(proofDrawer).getByRole("button", { name: "Aprovar comprovante" }));
    await expect(proofDrawer).toHaveAttribute("data-state", "paid");
    await expect(canvas.getByRole("status")).toHaveTextContent("Comprovante aprovado: Ana Paula Martins");
  }
};

export const Image34MovimentacoesFiltrosDrawer: Story = {
  name: "34 movimentacoes filtros drawer",
  parameters: { sourceImage: "34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png" },
  render: () => <FinanceMovementsPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });

    await expect(drawer).toHaveAttribute("data-state", "open");
    await userEvent.click(within(drawer).getByRole("button", { name: "Confirmar pagamento" }));
    await expect(drawer).toHaveAttribute("data-state", "paid");
    await expect(canvas.getByRole("status")).toHaveTextContent("Pagamento confirmado: Fernanda Lima");

    await userEvent.click(canvas.getByRole("row", { name: /Ana Paula Martins/ }));
    await expect(drawer).toHaveAttribute("data-state", "reconciliation");
    await userEvent.click(within(drawer).getByRole("button", { name: "Conciliar movimentação" }));
    await expect(drawer).toHaveAttribute("data-state", "reconciled");
    await expect(canvas.getByRole("status")).toHaveTextContent("Movimentação conciliada: Ana Paula Martins");

    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar cobrança" }));
    await expect(canvas.queryByRole("complementary", { name: "Detalhes da cobrança" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("row", { name: /Paulo Nunes/ }));
    const reopened = canvas.getByRole("complementary", { name: "Detalhes da cobrança" });
    await expect(reopened).toHaveAttribute("data-state", "dispute");
    await expect(within(reopened).getByRole("button", { name: "Resolver disputa" })).toBeEnabled();
    await userEvent.click(canvas.getByRole("button", { name: "Conciliacao pendente 11" }));
  }
};
