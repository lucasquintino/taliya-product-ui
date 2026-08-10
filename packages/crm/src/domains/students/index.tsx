/** Student, finance and retention presentation compositions. */
import React from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  ConfirmDialog,
  EmptyState,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  List,
  ListItem,
  MetricTile,
  Panel,
  PanelHeader,
  ProgressBar,
  RelationshipCard,
  StatusDot,
  cn
} from "@taliya/ui";
import type {
  ComponentTone,
  IconName,
  StatusDotStatus
} from "@taliya/ui";
import {
  CopilotSuggestion,
  KanbanCard
} from "../../patterns/shell.js";
import type {
  CrmProductShellProps,
  CrmShellNavItem
} from "../../patterns/shell.js";
import type {
  PreflightChecklistItem,
  SupportTicketPanelFact,
  SupportTicketPanelMessage,
  SupportTicketDrawerAction
} from "../../patterns/index.js";
import type {
  CrmSurfaceProps
} from "../../patterns/shell.js";
import {
  DomainActions
} from "../../patterns/index.js";
import type {
  CrmDomainMetric
} from "../../patterns/index.js";

function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toneForState(state?: string): ComponentTone {
  const normalizedState = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalizedState)) return "paused";
  return "neutral";
}
export function StudentHeader({
  name,
  state = "active",
  tags,
  avatarSrc,
  phone,
  email,
  headingLevel = 2,
  variant = "default",
  studentId = "ID: 456871",
  responsible = "Nikki Olaw",
  nextAction = "Confirmar documentos",
  nextActionDate = "28/04/2024",
  onNextAction,
  onAction,
  className
}: CrmSurfaceProps & {
  name?: string;
  tags?: React.ReactNode[];
  avatarSrc?: string;
  phone?: React.ReactNode;
  email?: React.ReactNode;
  headingLevel?: 1 | 2;
  variant?: "default" | "reference";
  studentId?: React.ReactNode;
  responsible?: React.ReactNode;
  nextAction?: React.ReactNode;
  nextActionDate?: React.ReactNode;
  onNextAction?: () => void;
  onAction?: (actionId: string) => void;
}) {
  const resolvedName = name ?? (variant === "reference" ? "João Pedro Silva" : "Ana Paula Martins");
  const resolvedPhone = phone ?? (variant === "reference" ? "(11) 93456-7890" : "(11) 98765-4321");
  const resolvedEmail = email ?? (variant === "reference" ? "joao.silva@email.com" : "ana.paula@email.com");
  const studentTags = tags ?? (variant === "reference" ? ["Aluno", "VIP"] : ["Plano Mensal", "Reformer Iniciante"]);
  const statusTags = ["pagamento pendente", "boa frequencia", "proxima aula marcada"];
  const Heading = headingLevel === 1 ? "h1" : "h2";

  if (variant === "reference") {
    return (
      <Card className={cn("tcrm-student-header", "tcrm-student-header--reference", className)} data-component="StudentHeader" data-variant="reference">
        <Avatar name={resolvedName} size="lg" src={avatarSrc} />
        <div className="tcrm-student-header__body">
          <div className="tcrm-student-header__identity"><Heading>{resolvedName}</Heading><Chip showDot={false} tone={toneForState(state)}>{state === "active" ? "Ativo" : state}</Chip></div>
          <InlineGroup className="tcrm-student-header__tags" compact wrap>
            {studentTags.map((tag, index) => <Chip key={index} showDot={false}>{tag}</Chip>)}
            <Chip showDot={false}>Responsável principal: <strong>{responsible}</strong></Chip>
          </InlineGroup>
          <InlineGroup className="tcrm-student-header__contacts" compact wrap>
            <span><Icon name="phone" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{resolvedPhone}</span>
            <span><Icon name="mail" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{resolvedEmail}</span>
            <span><Icon name="info" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{studentId}</span>
          </InlineGroup>
        </div>
        <Button className="tcrm-student-header__next-action" onClick={onNextAction} trailingIcon="chevronRight" variant="ghost">
          <><small>Próxima ação</small><strong>{nextAction}</strong><small>{nextActionDate}</small></>
        </Button>
      </Card>
    );
  }

  return (
    <Card className={cn("tcrm-student-header", className)}>
      <Avatar name={resolvedName} size="2xl" src={avatarSrc} />
      <div className="tcrm-student-header__body">
        <Heading>{resolvedName}</Heading>
        <InlineGroup className="tcrm-student-header__tags" compact wrap>
          <Chip showDot={false} tone={toneForState(state)}>{state === "active" ? "Ativa" : state}</Chip>
          {studentTags.map((tag, index) => (
            <React.Fragment key={index}>
              <span className="tcrm-student-header__separator" />
              <Chip showDot={false} tone="neutral">{tag}</Chip>
            </React.Fragment>
          ))}
        </InlineGroup>
        <InlineGroup className="tcrm-student-header__contacts" compact wrap>
          <span><Icon name="whatsapp" size="var(--taliya-control-crm-student-header-contact-icon-size)" tone="success" />{resolvedPhone}</span>
          <span><Icon name="mail" size="var(--taliya-control-crm-student-header-contact-icon-size)" tone="info" />{resolvedEmail}</span>
        </InlineGroup>
        <InlineGroup className="tcrm-student-header__status-tags" compact wrap>
          {statusTags.map((tag, index) => (
            <Chip key={tag} showDot={false} tone={index === 0 ? "warning" : index === 1 ? "success" : "info"}>{tag}</Chip>
          ))}
        </InlineGroup>
      </div>
      <DomainActions
        className="tcrm-student-header__actions"
        actions={[
          { id: "message", label: "Enviar mensagem", icon: "whatsapp" },
          { id: "task", label: "Criar tarefa", icon: "calendar", variant: "secondary" },
          { id: "note", label: "Registrar nota", icon: "clipboard", variant: "secondary" },
          { id: "edit", label: "Editar dados", icon: "edit", variant: "secondary" }
        ]}
        onAction={onAction}
      />
    </Card>
  );
}

export function StudentSummary({
  metrics,
  showRows = false,
  onAction,
  className
}: {
  metrics?: CrmDomainMetric[];
  showRows?: boolean;
  onAction?: (actionId: string) => void;
  className?: string;
}) {
  const summaryMetrics = metrics ?? [
    { label: "Presenca recente", value: "8 de 10 aulas", helperText: "80% de presenca", tone: "success" as const, progressValue: 80 },
    { label: "Risco", value: "baixo", helperText: "Situacao estavel", tone: "success" as const, icon: "shieldCheck" as const },
    { label: "Proxima aula", value: "Qui, 15/05", helperText: "07:00", tone: "info" as const, icon: "calendar" as const },
    { label: "Plano", value: "ativo", helperText: "Plano Mensal", tone: "neutral" as const, icon: "creditCard" as const },
    { label: "Financeiro", value: "pagamento pendente", tone: "warning" as const, icon: "clipboard" as const }
  ];

  return (
    <Panel className={cn("tcrm-student-summary", className)}>
      <header>
        <h3><span>1.</span> Estado operacional</h3>
      </header>
      <div className="tcrm-student-summary__metrics">
        {summaryMetrics.map((metric, index) => (
          <MetricTile
            helperText={metric.helperText}
            icon={metric.icon}
            key={index}
            label={metric.label}
            progressValue={metric.progressValue}
            tone={metric.tone === "danger" ? "negative" : metric.tone === "warning" ? "warning" : metric.tone === "success" ? "positive" : "neutral"}
            value={metric.value}
            variant="operational"
          />
        ))}
      </div>
      {showRows ? (
        <List className="tcrm-student-summary__rows" divided>
          <ListItem action={<Button onClick={() => onAction?.("agenda")} size="sm" variant="secondary">Ver agenda</Button>} title="Agenda proxima">
            Reformer Iniciante - Qui 15/05 - 07:00
          </ListItem>
          <ListItem action={<Button onClick={() => onAction?.("financeiro")} size="sm" variant="secondary">Ver financeiro</Button>} title="Plano e financeiro">
            Proxima mensalidade - 10/06/2024 - R$ 199,00
          </ListItem>
          <ListItem action={<Button onClick={() => onAction?.("tarefas")} size="sm" variant="secondary">Ver tarefas</Button>} title="Tarefas abertas">
            Reposicao para confirmar - retorno humano pendente
          </ListItem>
        </List>
      ) : null}
    </Panel>
  );
}

export interface RelationshipListItem {
  id: string;
  name: string;
  roleLabel?: React.ReactNode;
  contact?: React.ReactNode;
  details?: Array<{ icon?: IconName; value: React.ReactNode }>;
  highlight?: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  variant?: "primary" | "related" | "conflict";
  avatarStatus?: StatusDotStatus | null;
  avatarSrc?: string;
}

export function RelationshipList({
  className,
  items,
  selectedId = "joao",
  onSelect,
  onAction
}: {
  className?: string;
  items?: RelationshipListItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onAction?: (actionId: string) => void;
}) {
  const relationshipItems: RelationshipListItem[] = items ?? [
    {
      id: "nikki",
      badge: "Responsavel principal",
      details: [{ icon: "phone", value: "(11) 93456-7890" }, { icon: "mail", value: "nikki@email.com" }],
      name: "Nikki Olaw",
      roleLabel: "Mae",
      variant: "primary" as const,
      avatarStatus: null
    },
    {
      id: "joao",
      badge: "Plano Premium",
      highlight: <><small>saldo 0</small><strong>Debito</strong></>,
      name: "Joao Pedro",
      roleLabel: "12 anos - 7o Ano",
      variant: "related" as const,
      avatarStatus: null
    },
    {
      id: "sara",
      badge: "Tia",
      badgeTone: "neutral",
      details: [{ icon: "phone", value: "(11) 98765-4321" }, { icon: "mail", value: "sara@email.com" }],
      name: "Sara Alves",
      variant: "related" as const,
      avatarStatus: null
    }
  ];

  return (
    <Panel className={cn("tcrm-relationship-list", className)}>
      <header>
        <span className="tcrm-relationship-list__marker"><Icon name="link" size="var(--taliya-control-crm-relationship-panel-marker-icon-size)" tone="current" /></span>
        <h3>Relacoes e familia</h3>
      </header>
      <div className="tcrm-relationship-list__cards">
        {relationshipItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 ? (
              <IconButton
                className="tcrm-relationship-list__connector"
                data-connector={index === 1 ? "shared-phone" : "family-link"}
                icon={index === 1 ? "phone" : "book"}
                label={index === 1 ? "Telefone compartilhado" : "Relacao familiar"}
                onClick={() => onAction?.(index === 1 ? "shared-phone" : "family-link")}
                size="sm"
                variant="subtle"
              />
            ) : null}
            <RelationshipCard
              avatarSrc={item.avatarSrc}
              avatarStatus={item.avatarStatus}
              badge={item.badge}
              badgeTone={item.badgeTone}
              contact={item.contact}
              details={item.details}
              highlight={item.highlight}
              name={item.name}
              onSelect={onSelect ? () => onSelect(item.id) : undefined}
              roleLabel={item.roleLabel}
              selected={selectedId === item.id}
              variant={item.variant}
            />
          </React.Fragment>
        ))}
      </div>
      <footer className="tcrm-relationship-list__legend">
        <span><Icon name="check" size="sm" tone="success" />Telefone compartilhado</span>
        <span><Icon name="book" size="sm" tone="warning" />Relacao familiar</span>
        <span><Icon name="alertCircle" size="sm" tone="danger" />Possivel conflito</span>
      </footer>
    </Panel>
  );
}
export interface PaymentCaseItem {
  id: string;
  payer: React.ReactNode;
  amount: React.ReactNode;
  due: React.ReactNode;
  method: React.ReactNode;
}

export type FinancePriorityTone = "danger" | "info" | "warning";
export type FinancePriorityPanelState = "source" | "loading" | "empty" | "blocked";

export interface FinancePriorityItem {
  id: string;
  title: React.ReactNode;
  amount: React.ReactNode;
  meta: React.ReactNode;
  icon?: IconName;
  tone?: FinancePriorityTone;
  disabled?: boolean;
}

const defaultFinancePriorityItems: FinancePriorityItem[] = [
  {
    id: "overdue",
    title: "9 cobrancas atrasadas",
    amount: "R$ 3.870,00",
    meta: "mensalidades e planos · responsavel Financeiro",
    icon: "alert",
    tone: "danger"
  },
  {
    id: "reconciliation",
    title: "5 comprovantes aguardando conciliacao",
    amount: "R$ 2.140,00",
    meta: "Pix e importacao · responsavel Mariana",
    icon: "clock",
    tone: "info"
  },
  {
    id: "exceptions",
    title: "3 excecoes financeiras precisam revisao",
    amount: "R$ 3.320,00",
    meta: "desconto, renegociacao e cancelamento · responsavel Coordenacao",
    icon: "folder",
    tone: "warning"
  }
];

export function FinancePriorityPanel({
  title = "Prioridades financeiras",
  items = defaultFinancePriorityItems,
  selectedId,
  state = "source",
  onSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  title?: React.ReactNode;
  items?: FinancePriorityItem[];
  selectedId?: string;
  state?: FinancePriorityPanelState;
  onSelect?: (item: FinancePriorityItem) => void;
}) {
  const disabled = state === "loading" || state === "blocked";
  const rows = state === "empty" ? [] : items;

  return (
    <Panel
      {...props}
      aria-busy={state === "loading" ? true : undefined}
      className={cn("tcrm-finance-priority-panel", className)}
      data-component="FinancePriorityPanel"
      data-state={state}
      variant="crm"
    >
      <PanelHeader compact headingLevel={2} title={title} />
      {rows.length ? (
        <div className="tcrm-finance-priority-panel__list" role="list">
          {rows.map((item) => {
            const tone = item.tone ?? "info";
            const rowDisabled = disabled || item.disabled;

            return (
              <button
                aria-pressed={selectedId === item.id}
                className={cn("tcrm-finance-priority-panel__row", selectedId === item.id && "is-selected")}
                data-tone={tone}
                disabled={rowDisabled}
                key={item.id}
                onClick={() => onSelect?.(item)}
                type="button"
              >
                <span className="tcrm-finance-priority-panel__icon">
                  <Icon name={item.icon ?? "info"} size="md" tone={tone} />
                </span>
                <strong>{item.title}</strong>
                <b>{item.amount}</b>
                <small>{item.meta}</small>
                <Icon name="chevronRight" size="sm" tone="current" />
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState description="Nenhuma prioridade financeira no momento." title="Sem prioridades" />
      )}
    </Panel>
  );
}

const paymentCaseConfig = {
  due: { title: "1. A vencer", icon: "calendar", total: "R$ 1.610,00", tone: "success" },
  today: { title: "2. Vencem hoje", icon: "clock", total: "R$ 1.610,00", tone: "info" },
  paid: { title: "3. Pagos recentes", icon: "checkCircle", total: "R$ 1.610,00", tone: "success" },
  overdue: { title: "4. Atrasados", icon: "alertCircle", total: "R$ 1.610,00", tone: "danger" },
  failed: { title: "5. Falhas de pagamento", icon: "alertCircle", total: "R$ 1.610,00", tone: "warning" },
  reconciliation: { title: "6. Conciliacao pendente", icon: "clock", total: "R$ 1.610,00", tone: "warning" },
  promise: { title: "7. Promessas de pagamento", icon: "messageMore", total: "R$ 1.610,00", tone: "warning" },
  exception: { title: "8. Excecoes financeiras", icon: "clipboard", total: "R$ 3.320,00", tone: "info" }
} satisfies Record<string, { title: string; icon: IconName; total: string; tone: ComponentTone }>;

const defaultPaymentCaseItems: Record<string, PaymentCaseItem[]> = {
  due: [
    { id: "fernanda", payer: "Fernanda Lima", amount: "R$ 420,00", due: "vence 14/05", method: "mensalidade" },
    { id: "rafael", payer: "Rafael Martins", amount: "R$ 980,00", due: "vence 15/05", method: "plano trimestral" },
    { id: "bianca", payer: "Bianca Oliveira", amount: "R$ 210,00", due: "vence 16/05", method: "aula avulsa" }
  ],
  today: [
    { id: "camila", payer: "Camila Souza", amount: "R$ 420,00", due: "vence hoje 18:00", method: "Pix" },
    { id: "lucas", payer: "Lucas Ferreira", amount: "R$ 980,00", due: "vence hoje 20:00", method: "plano trimestral" },
    { id: "marina", payer: "Marina Costa", amount: "R$ 210,00", due: "vence hoje 21:00", method: "mensalidade" }
  ],
  paid: [
    { id: "juliana", payer: "Juliana Rocha", amount: "R$ 420,00", due: "pago hoje 09:12", method: "Pix" },
    { id: "thiago", payer: "Thiago Alves", amount: "R$ 980,00", due: "pago hoje 10:45", method: "cartao" },
    { id: "patricia", payer: "Patricia Nunes", amount: "R$ 210,00", due: "pago ontem 16:22", method: "WhatsApp" }
  ],
  overdue: [
    { id: "gabriela", payer: "Gabriela Lima", amount: "R$ 420,00", due: "2 dias em atraso", method: "mensalidade" },
    { id: "eduardo", payer: "Eduardo Santos", amount: "R$ 210,00", due: "5 dias em atraso", method: "Pix" },
    { id: "isabela", payer: "Isabela Prado", amount: "R$ 980,00", due: "7 dias em atraso", method: "plano trimestral" }
  ],
  failed: [
    { id: "bruno", payer: "Bruno Mendes", amount: "R$ 420,00", due: "cartao recusado", method: "cartao" },
    { id: "carolina", payer: "Carolina Dias", amount: "R$ 980,00", due: "limite insuficiente", method: "cartao" },
    { id: "joao", payer: "Joao Victor", amount: "R$ 210,00", due: "Pix expirado", method: "WhatsApp" }
  ],
  reconciliation: [
    { id: "ana", payer: "Ana Paula Martins", amount: "R$ 420,00", due: "comprovante enviado 09:45", method: "Pix" },
    { id: "gustavo", payer: "Gustavo Lima", amount: "R$ 980,00", due: "aguardando baixa", method: "importacao" },
    { id: "beatriz", payer: "Marina Beatriz", amount: "R$ 210,00", due: "envio manual", method: "agente" }
  ],
  promise: [
    { id: "felipe", payer: "Felipe Costa", amount: "R$ 420,00", due: "prometido para 15/05", method: "WhatsApp" },
    { id: "renata", payer: "Renata Alves", amount: "R$ 980,00", due: "prometido para 16/05", method: "agente" },
    { id: "diego", payer: "Diego Ramos", amount: "R$ 210,00", due: "prometido para 17/05", method: "mensalidade" }
  ],
  exception: [
    { id: "carla", payer: "Carla Nunes", amount: "R$ 120,00", due: "desconto fora da politica", method: "agente" },
    { id: "roberto", payer: "Roberto Lima", amount: "R$ 2.360,00", due: "renegociacao manual", method: "importacao" },
    { id: "silvia", payer: "Silvia Prado", amount: "R$ 840,00", due: "cancelar cobranca recorrente", method: "WhatsApp" }
  ]
};

export function PaymentCaseCard({
  title,
  amount,
  total,
  state = "due",
  count = 3,
  items,
  onOpen,
  onMenu,
  onViewAll,
  className
}: CrmSurfaceProps & {
  amount?: React.ReactNode;
  total?: React.ReactNode;
  count?: number;
  items?: PaymentCaseItem[];
  onOpen?: (caseId: string) => void;
  onMenu?: () => void;
  onViewAll?: () => void;
}) {
  const key = stateKey(state) || "due";
  const config = paymentCaseConfig[key as keyof typeof paymentCaseConfig] ?? paymentCaseConfig.due;
  const rows = items ?? defaultPaymentCaseItems[key] ?? defaultPaymentCaseItems.due ?? [];
  const heading = title ?? config.title;
  const displayedTotal = total ?? amount ?? config.total;

  return (
    <Card className={cn("tcrm-payment-case-card", `tcrm-payment-case-card--${key}`, className)} data-state={key}>
      <header className="tcrm-payment-case-card__header">
        <span className="tcrm-payment-case-card__icon">
          <Icon name={config.icon} size="md" tone={config.tone} />
        </span>
        <span className="tcrm-payment-case-card__title">
          <strong>{heading}</strong>
          <Badge tone="neutral" variant="count">{count}</Badge>
        </span>
        <b>{displayedTotal}</b>
        {onMenu ? <IconButton icon="more" label={`Mais acoes da fila ${String(heading)}`} onClick={onMenu} size="sm" variant="ghost" /> : null}
      </header>
      <div className="tcrm-payment-case-card__rows" role="list">
        {rows.map((item) => (
          <button
            aria-label={`Abrir cobranca de ${String(item.payer)}`}
            className="tcrm-payment-case-card__row"
            key={item.id}
            onClick={() => onOpen?.(item.id)}
            type="button"
          >
            <strong>{item.payer}</strong>
            <span>{item.amount}</span>
            <small>{item.due}</small>
            <small>{item.method}</small>
            <Icon name="chevronRight" size="sm" />
          </button>
        ))}
      </div>
      <button className="tcrm-payment-case-card__footer" onClick={() => onViewAll?.()} type="button">
        Ver todos
      </button>
    </Card>
  );
}

const financeKanbanStateLabel: Record<string, string> = {
  scheduled: "Agendado",
  today: "Hoje",
  overdue: "Atrasado",
  promise: "Prometido",
  validation: "Aguardando validacao",
  reconciliation: "Em conciliacao",
  resolved: "Resolvido"
};

export function FinanceKanbanCard({
  title = "Fernanda Lima",
  amount = "R$ 420,00",
  state = "scheduled",
  due = "vence 14/05",
  method = "mensalidade",
  owner = "Financeiro",
  onSelect,
  onMenu,
  selected,
  className
}: CrmSurfaceProps & {
  amount?: React.ReactNode;
  due?: React.ReactNode;
  method?: React.ReactNode;
  owner?: React.ReactNode;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const key = stateKey(state);
  return (
    <KanbanCard
      className={cn("tcrm-finance-kanban-card", className)}
      impact={amount}
      layout="finance"
      meta={<>{due} <span aria-hidden="true">·</span> {method}</>}
      onMenu={onMenu}
      menuIcon="moreVertical"
      onSelect={onSelect}
      owner={owner}
      selected={selected}
      state={state}
      stateLabel={financeKanbanStateLabel[key] ?? state}
      title={title}
    />
  );
}

const reconciliationDefaults = {
  matched: {
    name: "Juliana Rocha",
    type: "Pagamento recebido",
    status: "Pago",
    amount: "R$ 420,00",
    due: "-",
    plan: "Plano Mensal",
    method: "Pix",
    origin: "WhatsApp",
    responsible: "Mariana",
    lastActivity: "pago hoje 09:12"
  },
  ambiguous: {
    name: "Ana Paula Martins",
    type: "Conciliacao pendente",
    status: "Pendente",
    amount: "R$ 420,00",
    due: "-",
    plan: "Plano Mensal",
    method: "Pix",
    origin: "Importacao",
    responsible: "Financeiro",
    lastActivity: "comprovante enviado 09:45"
  },
  dispute: {
    name: "Gabriel Lima",
    type: "Cobranca atrasada",
    status: "Em atraso",
    amount: "R$ 420,00",
    due: "12/05",
    plan: "Plano Mensal",
    method: "Cartao",
    origin: "Sistema",
    responsible: "Financeiro",
    lastActivity: "lembrete ontem"
  }
} satisfies Record<string, Record<string, React.ReactNode>>;

export function ReconciliationRow({
  title,
  name,
  typeLabel,
  statusLabel,
  amount,
  due,
  plan,
  method,
  origin,
  responsible,
  lastActivity,
  avatarSrc,
  state = "ambiguous",
  onAction,
  className
}: CrmSurfaceProps & {
  name?: React.ReactNode;
  typeLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  amount?: React.ReactNode;
  due?: React.ReactNode;
  plan?: React.ReactNode;
  method?: React.ReactNode;
  origin?: React.ReactNode;
  responsible?: React.ReactNode;
  lastActivity?: React.ReactNode;
  avatarSrc?: string;
  onAction?: () => void;
}) {
  const key = stateKey(state) || "ambiguous";
  const defaults = reconciliationDefaults[key as keyof typeof reconciliationDefaults] ?? reconciliationDefaults.ambiguous;
  const displayName = name ?? title ?? defaults.name;
  const displayType = typeLabel ?? defaults.type;
  const displayStatus = statusLabel ?? defaults.status;
  const paymentMethod = method ?? defaults.method;

  return (
    <div className={cn("tcrm-reconciliation-row", `tcrm-reconciliation-row--${key}`, className)} role="row">
      <Avatar name={String(displayName)} size="sm" src={avatarSrc} />
      <strong>{displayName}</strong>
      <Chip className="tcrm-reconciliation-row__type" showDot={false} tone={key === "dispute" ? "danger" : key === "matched" ? "success" : "info"}>{displayType}</Chip>
      <Chip className="tcrm-reconciliation-row__status" showDot={false} tone={toneForState(state)}>{displayStatus}</Chip>
      <span>{amount ?? defaults.amount}</span>
      <span>{due ?? defaults.due}</span>
      <span>{plan ?? defaults.plan}</span>
      <span className="tcrm-reconciliation-row__method">
        <span className={cn("tcrm-reconciliation-row__method-mark", `tcrm-reconciliation-row__method-mark--${stateKey(paymentMethod)}`)} aria-hidden="true" />
        {paymentMethod}
      </span>
      <span>{origin ?? defaults.origin}</span>
      <span>{responsible ?? defaults.responsible}</span>
      <span className="tcrm-reconciliation-row__activity">{lastActivity ?? defaults.lastActivity}</span>
      <IconButton icon="more" label={`Mais acoes de ${String(displayName)}`} onClick={() => onAction?.()} size="sm" variant="ghost" />
    </div>
  );
}

const salesPipelineDefaults = {
  lead: {
    source: "WhatsApp",
    interest: "começar Pilates",
    nextAction: "responder preço hoje",
    owner: "Recepção",
    statusLabel: "copiloto sugeriu"
  },
  trial: {
    source: "Instagram",
    interest: "dor lombar",
    nextAction: "confirmar experimental",
    owner: "Recepção",
    statusLabel: "experimental hoje"
  },
  enrollment: {
    source: "Instagram",
    interest: "preço",
    nextAction: "última tentativa",
    owner: "Atendimento",
    statusLabel: "sem resposta"
  },
  lost: {
    source: "Site",
    interest: "sem retorno",
    nextAction: "marcar perdido",
    owner: "Atendimento",
    statusLabel: "perdido"
  }
} as const;

const salesLeadDefaults = {
  hot: {
    stageLabel: "Qualificada",
    nextAction: "responder preço hoje",
    desiredTime: "terça à noite",
    owner: "Recepção",
    lastConversation: "hoje 10:24",
    statusLabel: "aberta"
  },
  "no-response": {
    stageLabel: "Sem resposta",
    nextAction: "última tentativa",
    desiredTime: "tarde",
    owner: "Atendimento",
    lastConversation: "2 dias",
    statusLabel: "aguardando humano"
  },
  trial: {
    stageLabel: "Experimental marcada",
    nextAction: "confirmar presença",
    desiredTime: "quinta 08h",
    owner: "Recepção",
    lastConversation: "amanhã",
    statusLabel: "experimental hoje"
  },
  enrolled: {
    stageLabel: "Pré-matrícula",
    nextAction: "validar dados",
    desiredTime: "terça 17h",
    owner: "Gestora",
    lastConversation: "hoje",
    statusLabel: "pronto"
  }
} as const;

const trialClassDefaults = {
  scheduled: {
    classTitle: "Reformer",
    classLevel: "Intermediário",
    statusLabel: "Confirmar presença",
    source: "WhatsApp",
    owner: "Recepção",
    lastConversation: "ontem 18:40",
    nextActionLabel: "enviar confirmação"
  },
  attended: {
    classTitle: "Pilates Solo",
    classLevel: "",
    statusLabel: "Compareceu",
    source: "Indicação",
    owner: "Recepção",
    lastConversation: "hoje 09:20",
    nextActionLabel: "fazer pós-aula"
  },
  "no-show": {
    classTitle: "Alongamento",
    classLevel: "",
    statusLabel: "Faltou",
    source: "Instagram",
    owner: "Recepção",
    lastConversation: "sem resposta",
    nextActionLabel: "remarcar"
  },
  converted: {
    classTitle: "Experimental",
    classLevel: "",
    statusLabel: "Pronta para matrícula",
    source: "Indicação",
    owner: "Gestora",
    lastConversation: "feedback positivo",
    nextActionLabel: "iniciar matrícula"
  }
} as const;

function salesChipClass(value: React.ReactNode, prefix: string): string {
  return `${prefix} ${prefix}--${stateKey(value) || "neutral"}`;
}

export function PipelineCard({
  title = "Ana Souza",
  source,
  sourceIcon = "whatsapp",
  interest,
  nextAction,
  meta,
  state = "lead",
  statusLabel,
  onSelect,
  onMenu,
  selected,
  className
}: CrmSurfaceProps & {
  source?: React.ReactNode;
  sourceIcon?: IconName;
  interest?: React.ReactNode;
  nextAction?: React.ReactNode;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const key = stateKey(state) || "lead";
  const defaults = salesPipelineDefaults[key as keyof typeof salesPipelineDefaults] ?? salesPipelineDefaults.lead;
  const owner = meta ?? defaults.owner;
  const chipLabel = statusLabel ?? defaults.statusLabel;
  const content = (
    <>
      <header className="tcrm-pipeline-card__header">
        <strong>{title}</strong>
        <span className="tcrm-pipeline-card__channel">
          <Icon name={sourceIcon} size="12px" />
          <span>{source ?? defaults.source}</span>
        </span>
      </header>
      <dl className="tcrm-pipeline-card__facts">
        <div>
          <dt>Interesse:</dt>
          <dd>{interest ?? defaults.interest}</dd>
        </div>
        <div>
          <dt>Próxima ação:</dt>
          <dd>{nextAction ?? defaults.nextAction}</dd>
        </div>
        <div>
          <dt>Dono:</dt>
          <dd>{owner}</dd>
        </div>
      </dl>
      <Chip className={salesChipClass(chipLabel, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>
        {chipLabel}
      </Chip>
    </>
  );

  return (
    <Card
      className={cn("tcrm-pipeline-card", `tcrm-pipeline-card--${key}`, selected && "tcrm-pipeline-card--selected", className)}
      compact
      data-state={key}
      selected={selected}
    >
      {onSelect ? (
        <button aria-pressed={selected || undefined} className="tcrm-pipeline-card__select" onClick={onSelect} type="button">
          {content}
        </button>
      ) : (
        <div className="tcrm-pipeline-card__select">{content}</div>
      )}
      {onMenu ? (
        <IconButton
          className="tcrm-pipeline-card__menu"
          icon="more"
          label={`Abrir opcoes de ${String(title)}`}
          onClick={onMenu}
          size="sm"
          variant="ghost"
        />
      ) : null}
    </Card>
  );
}

export function LeadSummary({
  name = "Ana Souza",
  state = "hot",
  nextAction,
  avatarSrc,
  selected = true,
  statusLabel,
  stageLabel,
  desiredTime,
  owner,
  lastConversation,
  onOpen,
  className
}: CrmSurfaceProps & {
  name?: string;
  source?: React.ReactNode;
  nextAction?: React.ReactNode;
  avatarSrc?: string;
  stageLabel?: React.ReactNode;
  desiredTime?: React.ReactNode;
  owner?: React.ReactNode;
  lastConversation?: React.ReactNode;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "hot";
  const defaults = salesLeadDefaults[key as keyof typeof salesLeadDefaults] ?? salesLeadDefaults.hot;
  const stage = stageLabel ?? defaults.stageLabel;
  const status = statusLabel ?? defaults.statusLabel;

  return (
    <div
      aria-selected={selected || undefined}
      className={cn("tcrm-lead-summary", `tcrm-lead-summary--${key}`, selected && "tcrm-lead-summary--selected", className)}
      role="row"
    >
      <Avatar className="tcrm-commercial-avatar" name={name} size="sm" src={avatarSrc} />
      <strong className="tcrm-commercial-name">{name}</strong>
      <Chip className={salesChipClass(stage, "tcrm-sales-stage-chip")} showDot={false} tone={toneForState(state)}>{stage}</Chip>
      <span>{nextAction ?? defaults.nextAction}</span>
      <span>{desiredTime ?? defaults.desiredTime}</span>
      <span>{owner ?? defaults.owner}</span>
      <span>{lastConversation ?? defaults.lastConversation}</span>
      <Chip className={salesChipClass(status, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>{status}</Chip>
      <IconButton className="tcrm-commercial-menu" icon="more" label="Abrir conversa" onClick={() => onOpen?.()} size="sm" variant="ghost" />
    </div>
  );
}

export function TrialClassCard({
  title = "Ana Souza",
  state = "scheduled",
  time = "hoje 17h",
  avatarSrc,
  classTitle,
  classLevel,
  statusLabel,
  source,
  owner,
  lastConversation,
  nextActionLabel,
  onSelect,
  className
}: CrmSurfaceProps & {
  time?: React.ReactNode;
  avatarSrc?: string;
  classTitle?: React.ReactNode;
  classLevel?: React.ReactNode;
  source?: React.ReactNode;
  owner?: React.ReactNode;
  lastConversation?: React.ReactNode;
  nextActionLabel?: React.ReactNode;
  onSelect?: () => void;
}) {
  const key = stateKey(state) || "scheduled";
  const defaults = trialClassDefaults[key as keyof typeof trialClassDefaults] ?? trialClassDefaults.scheduled;
  const status = statusLabel ?? defaults.statusLabel;
  const action = nextActionLabel ?? defaults.nextActionLabel;
  const classMeta = (
    <>
      <span>{classTitle ?? defaults.classTitle}</span>
      {classLevel ?? defaults.classLevel ? <span>{classLevel ?? defaults.classLevel}</span> : null}
    </>
  );

  return (
    <button
      aria-label={String(title)}
      className={cn("tcrm-trial-class-card", `tcrm-trial-class-card--${key}`, className)}
      data-state={key}
      onClick={onSelect}
      type="button"
    >
      <Avatar className="tcrm-commercial-avatar" name={String(title)} size="sm" src={avatarSrc} />
      <strong className="tcrm-commercial-name">{title}</strong>
      <span className="tcrm-trial-class-card__class">{classMeta}</span>
      <span>{time}</span>
      <Chip className={salesChipClass(status, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>{status}</Chip>
      <span className="tcrm-trial-class-card__source">
        <Icon name={stateKey(source ?? defaults.source) === "whatsapp" ? "whatsapp" : "users"} size="13px" />
        <span>{source ?? defaults.source}</span>
      </span>
      <span>{owner ?? defaults.owner}</span>
      <span>{lastConversation ?? defaults.lastConversation}</span>
      <Chip className={salesChipClass(action, "tcrm-sales-action-chip")} showDot={false} tone="info">{action}</Chip>
      <span className="tcrm-commercial-dots" aria-hidden="true">•••</span>
    </button>
  );
}

export function EnrollmentChecklist({
  items,
  title = "Checklist de matrícula",
  countLabel,
  onAction,
  className
}: {
  items?: PreflightChecklistItem[];
  title?: React.ReactNode;
  countLabel?: React.ReactNode;
  onAction?: (itemId: string) => void;
  className?: string;
}) {
  const checklist = items ?? [
    { id: "dados", title: "Dados básicos", state: "complete" as const },
    { id: "plano", title: "Plano escolhido", state: "complete" as const },
    { id: "aula", title: "Primeira aula definida", state: "complete" as const },
    { id: "consentimento", title: "Consentimento registrado", state: "complete" as const },
    { id: "cpf", title: "CPF pendente", state: "warning" as const }
  ];
  const completedItems = checklist.filter((item) => item.state === "complete").length;

  return (
    <section className={cn("tcrm-enrollment-checklist", className)} aria-label={String(title)}>
      <header className="tcrm-enrollment-checklist__header">
        <strong>{title}</strong>
        <span>{countLabel ?? `${completedItems}/${checklist.length}`}</span>
      </header>
      <List className="tcrm-enrollment-checklist__list">
        {checklist.map((item) => {
          const itemKey = stateKey(item.state) || "incomplete";
          return (
            <button
              aria-label={typeof item.title === "string" ? `Revisar ${item.title}` : `Revisar item ${item.id}`}
              className={cn("tcrm-enrollment-checklist__item", `tcrm-enrollment-checklist__item--${itemKey}`)}
              disabled={!onAction || item.state === "blocked"}
              key={item.id}
              onClick={() => onAction?.(item.id)}
              type="button"
            >
              <span className="tcrm-enrollment-checklist__mark" aria-hidden="true">
                {item.state === "complete" ? <Icon name="check" size="8px" strokeWidth={2.2} /> : null}
              </span>
              <span>{item.title}</span>
            </button>
          );
        })}
      </List>
    </section>
  );
}

export function RiskCard({
  title = "Ana Paula Martins",
  state = "high",
  reason = "14 dias sem aula",
  nextAction = "Enviar mensagem humana hoje",
  statusLabel,
  riskLabel,
  lastActivity = <>Ultima aula<br />29/04</>,
  owner = "Mariana",
  avatarSrc,
  onOpen,
  className
}: CrmSurfaceProps & {
  reason?: React.ReactNode;
  nextAction?: React.ReactNode;
  riskLabel?: React.ReactNode;
  lastActivity?: React.ReactNode;
  owner?: React.ReactNode;
  avatarSrc?: string;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "high";
  const displayRisk = riskLabel ?? (key === "low" ? "baixo" : key === "medium" ? "medio" : "alto");
  const displayStatus = statusLabel ?? "Ativa";

  return (
    <Card className={cn("tcrm-risk-card", `tcrm-risk-card--${key}`, className)} data-state={key}>
      <button aria-label="Abrir risco" className="tcrm-risk-card__row" onClick={() => onOpen?.()} type="button">
        <Avatar className="tcrm-risk-card__avatar" name={String(title)} size="sm" src={avatarSrc} />
        <strong>{title}</strong>
        <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--active tcrm-risk-card__status" showDot={false} tone="success">{displayStatus}</Chip>
        <Chip className={cn("tcrm-retention-status-chip", "tcrm-risk-card__risk", `tcrm-retention-status-chip--${key}`)} showDot={false} tone={toneForState(state)}>{displayRisk}</Chip>
        <span className="tcrm-risk-card__reason">{reason}</span>
        <span className="tcrm-risk-card__last-activity">{lastActivity}</span>
        <span className="tcrm-risk-card__next-action">{nextAction}</span>
        <span className="tcrm-risk-card__owner">{owner}</span>
        <Icon className="tcrm-risk-card__chevron" name="chevronRight" size="16px" />
      </button>
    </Card>
  );
}

const cancellationCaseFacts = [
  { label: "Plano:", value: "Plano Mensal" },
  { label: "Solicitado em:", value: "Hoje, 09:20" },
  { label: "Turma atual:", value: "Reformer Iniciante" },
  { label: "Canal:", value: "WhatsApp", icon: "whatsapp" },
  { label: "Valor mensal:", value: "R$ 420,00" },
  { label: "Responsavel:", value: "Mariana" }
] satisfies Array<{ label: string; value: React.ReactNode; icon?: IconName }>;

const cancellationCaseImpact = [
  ["Receita em risco:", "R$ 420/mes"],
  ["Aulas futuras afetadas:", "4"],
  ["Reposicoes em aberto:", "1"],
  ["Contrato:", "ativo"],
  ["Proxima cobranca:", "10/06"]
] as const;

const cancellationCaseHistory = [
  { icon: "checkCircle", tone: "success", text: "Mensagem recebida hoje 09:20" },
  { icon: "alert", tone: "warning", text: "Aluno faltou nas ultimas 2 aulas" },
  { icon: "calendar", tone: "danger", text: "Reposicao oferecida em 09/05" },
  { icon: "clock", tone: "warning", text: "Sem resposta ao convite anterior" }
] as const satisfies Array<{ icon: IconName; tone: ComponentTone; text: string }>;

export function CancellationCase({
  title = "Ana Paula Martins",
  state = "open",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  reason?: React.ReactNode;
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-cancellation-case", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--high" showDot={false} tone="danger">Cancelamento</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--saving" showDot={false} tone="warning">Em salvamento</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo do pedido</h4>
        <dl className="tcrm-retention-panel__facts">
          {cancellationCaseFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.icon ? <Icon className="tcrm-retention-panel__whatsapp-icon" name={fact.icon} size="12px" /> : null}{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Motivo declarado</h4>
        <p>Aluno informou dificuldade de encaixar horarios e pediu cancelamento a partir do proximo mes.</p>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Impacto</h4>
        <ul className="tcrm-retention-panel__key-list">
          {cancellationCaseImpact.map(([label, value]) => <li key={label}><span>{label}</span><strong>{value}</strong></li>)}
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Plano de salvamento</h4>
        <ol className="tcrm-retention-panel__plan">
          <li>Oferecer dois horarios alternativos</li>
          <li>Confirmar se pausa temporaria resolve</li>
          <li>Registrar decisao final ate hoje 16:00</li>
        </ol>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Automacao</h4>
        <InlineAlert className="tcrm-retention-panel__automation" tone="warning">Automacoes de cobranca e retencao pausadas ate decisao humana.</InlineAlert>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>6. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Responder de forma humana, validar a dificuldade de agenda e oferecer uma pausa de 15 dias ou dois horarios alternativos antes de confirmar o cancelamento." />
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>7. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          {cancellationCaseHistory.map((item) => <li key={item.text}><Icon name={item.icon} tone={item.tone} size="11px" />{item.text}</li>)}
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="whatsapp" onClick={() => onAction?.("message")} size="sm" variant="primary">Enviar mensagem</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="pause" onClick={() => onAction?.("pause")} size="sm" variant="secondary">Registrar pausa</Button>
        <Button leadingIcon="x" onClick={() => onAction?.("cancel")} size="sm" variant="secondary">Confirmar cancelamento</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}

export function ReactivationCard({
  title = "Ana Paula Martins",
  state = "candidate",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  opportunity?: React.ReactNode;
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-reactivation-card", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--reactivation" showDot={false} tone="info">Reativacao</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--eligible" showDot={false} tone="success">Elegivel</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo</h4>
        <dl className="tcrm-retention-panel__facts">
          {[
            ["Plano anterior:", "Plano Mensal"],
            ["Motivo:", "dificuldade de agenda"],
            ["Turma anterior:", "Reformer Iniciante"],
            ["Ultima conversa:", "30/04"],
            ["Saiu em:", "29/04"],
            ["Contato permitido:", "WhatsApp"]
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value === "WhatsApp" ? <Icon className="tcrm-retention-panel__whatsapp-icon" name="whatsapp" size="12px" /> : null}{value}</dd></div>)}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Oportunidade de retorno</h4>
        <dl className="tcrm-retention-panel__simple-facts">
          <div><dt>Vaga aberta:</dt><dd>Quinta, 09:00</dd></div>
          <div><dt>Turma:</dt><dd>Reformer Iniciante <small><StatusDot status="success" label="1 vaga disponivel" /></small></dd></div>
          <div><dt>Plano sugerido:</dt><dd>Plano Mensal</dd></div>
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Restricoes</h4>
        <ul className="tcrm-retention-panel__bullets">
          <li>Nao prometer desconto automatico</li>
          <li>Confirmar disponibilidade antes de reservar</li>
          <li>Respeitar "nao contatar" se marcado</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Enviar uma mensagem curta oferecendo a vaga de quinta as 09h e perguntando se o horario voltou a servir.">
          <small>O copiloto sugere e prepara a mensagem; a decisao de contato e humana.</small>
        </CopilotSuggestion>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          <li><Icon name="alert" tone="danger" size="11px" />Cancelamento registrado em 29/04</li>
          <li><Icon name="calendar" tone="info" size="11px" />Plano de salvamento recusado em 29/04</li>
          <li><Icon name="whatsapp" tone="success" size="11px" />Nova vaga compativel detectada hoje</li>
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="whatsapp" onClick={() => onAction?.("message")} size="sm" variant="primary">Enviar mensagem</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("reserve")} size="sm" variant="secondary">Reservar vaga</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("no-contact")} size="sm" variant="secondary">Marcar como nao contatar</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}

export function ComplaintPanel({
  title = "Ana Paula Martins",
  state = "severe",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-complaint-panel", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--reactivation" showDot={false} tone="info">Reclamacao</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--high" showDot={false} tone="danger">Alta severidade</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo do caso</h4>
        <dl className="tcrm-retention-panel__facts">
          {[
            { label: "Aluno:", value: "Ana Paula Martins" },
            { label: "Status:", value: "Aguardando resposta", tone: "waiting" },
            { label: "Origem:", value: "WhatsApp", icon: "whatsapp" },
            { label: "Responsavel:", value: "Mariana" },
            { label: "Severidade:", value: "Alta", tone: "danger" },
            { label: "Prazo:", value: "Hoje 14:00", tone: "danger" }
          ].map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className={fact.tone ? `tcrm-retention-panel__value--${fact.tone}` : undefined}>
                {fact.icon ? <Icon className="tcrm-retention-panel__whatsapp-icon" name={fact.icon as IconName} size="12px" /> : null}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Motivo declarado</h4>
        <p>Aluna reclamou que pediu reposicao ha 3 dias e ainda nao recebeu opcao de encaixe.</p>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Impacto</h4>
        <ul className="tcrm-retention-panel__bullets">
          <li>Risco de cancelamento</li>
          <li>1 reposicao em aberto</li>
          <li>Conversa sem resposta ha 2h</li>
          <li>Turma com vaga compativel hoje as 18:00</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Automacao pausada</h4>
        <InlineAlert className="tcrm-retention-panel__automation" tone="warning">Mensagens automaticas e acoes autonomas pausadas ate revisao humana.</InlineAlert>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Plano de resolucao</h4>
        <ul className="tcrm-retention-panel__resolution">
          <li>Revisar historico da reposicao</li>
          <li>Oferecer duas opcoes reais de encaixe</li>
          <li>Responder com pedido de desculpas e solucao objetiva</li>
          <li>Registrar acompanhamento apos resposta</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>6. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Oi Ana, sinto muito pela demora. Encontrei duas opcoes para sua reposicao: hoje as 18h ou sexta as 09h. Posso reservar uma delas para voce?">
          <small>O copiloto sugere a resposta; a revisao e o envio sao humanos.</small>
        </CopilotSuggestion>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>7. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          <li><Icon name="checkCircle" tone="success" size="11px" />Pedido de reposicao aberto em 10/05</li>
          <li><Icon name="alert" tone="danger" size="11px" />Agente nao encontrou encaixe automatico</li>
          <li><Icon name="whatsapp" tone="success" size="11px" />Mensagem da aluna recebida hoje 09:20</li>
          <li><Icon name="alert" tone="danger" size="11px" />Caso marcado como alta severidade</li>
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("reply")} size="sm" variant="primary">Responder</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="upload" onClick={() => onAction?.("escalate")} size="sm" variant="secondary">Escalar</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("resolve")} size="sm" variant="secondary">Marcar resolvida</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}

export function SensitiveActionDialog({
  inline = true,
  ...props
}: Partial<React.ComponentProps<typeof ConfirmDialog>>) {
  return (
    <div className="tcrm-sensitive-action-dialog">
      <ConfirmDialog
      confirmLabel="Confirmar ação sensível"
        destructive
        inline={inline}
      description="A ação precisa de confirmação explícita e contexto auditável."
        open
      title="Ação sensível"
      {...props}
      />
    </div>
  );
}

const defaultSupportTicketFacts: SupportTicketPanelFact[] = [
  { id: "type", label: "Tipo", value: "Importação", icon: "folder", tone: "info" },
  { id: "status", label: "Status", value: <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--analysis" showDot={false} tone="info">Em análise</Chip>, icon: "link" },
  { id: "impact", label: "Impacto", value: "Dados de alunos", icon: "clipboard" },
  { id: "owner", label: "Responsável", value: <span className="tcrm-support-ticket-panel__brand-value"><Icon name="bot" size="14px" />Taliya</span>, icon: "user" },
  { id: "priority", label: "Prioridade", value: <span className="tcrm-support-ticket-panel__dot-value"><span />Média</span>, icon: "star" },
  { id: "created", label: "Criado", value: "hoje 09:12", icon: "calendar" },
  { id: "next", label: "Próxima ação", value: <span className="tcrm-support-ticket-panel__next-action"><Icon name="chevronRight" size="12px" />Enviar arquivo original</span>, icon: "send" }
];

const defaultSupportTicketMessages: SupportTicketPanelMessage[] = [
  { id: "studio", icon: "user", text: "Studio: Importei a planilha e alguns alunos apareceram duplicados.", tone: "info" },
  { id: "support", icon: "sparkles", text: "Suporte 24/7: Entendi. Você pode anexar o arquivo original para eu comparar os dados?" },
  { id: "taliya", icon: "bot", text: "Taliya: Vamos revisar a importação e retornar com os registros afetados." }
];

export function SupportTicketPanel({
  title = "Importação duplicou alunos",
  subtitle = "Studio pediu ajuda para revisar dados importados",
  facts = defaultSupportTicketFacts,
  summary = "O agente identificou possível duplicidade por telefone e preparou o contexto para o suporte humano.",
  messages = defaultSupportTicketMessages,
  state = "open",
  variant = "support",
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  variant?: "support" | "internal";
  subtitle?: React.ReactNode;
  facts?: SupportTicketPanelFact[];
  summary?: React.ReactNode;
  messages?: SupportTicketPanelMessage[];
  onClose?: () => void;
  onAction?: (actionId: SupportTicketDrawerAction) => void;
}) {
  const key = stateKey(state) || "open";
  const isDisabled = key === "loading" || key === "blocked";
  const hasActiveAccess = key === "access-active";
  const isAnswered = key === "answered";

  if (variant === "internal") {
    return (
      <section className={cn("tcrm-support-ticket-panel", "tcrm-support-ticket-panel--internal", className)} data-state={key} aria-label={String(title)}>
        <header className="tcrm-support-ticket-panel__header">
          <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--selected" showDot={false} tone="info">Ticket interno selecionado</Chip>
          <IconButton className="tcrm-support-ticket-panel__close" disabled={isDisabled} icon="x" label="Fechar ticket" onClick={onClose} size="sm" variant="subtle" />
          <h3>{title}</h3>
          <p>Studio Vila Mariana pediu ajuda via Suporte</p>
        </header>
        <dl className="tcrm-support-ticket-panel__facts tcrm-support-ticket-panel__facts--internal">
          {[
            ["Studio:", "Studio Vila Mariana", "calendar"],
            ["Origem:", "/app/suporte", "home"],
            ["Tipo:", "Importação", "folder"],
            ["Status:", <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--analysis" key="status" showDot={false} tone="info">Em análise</Chip>, "settings"],
            ["Responsável:", "Marina - Suporte", "user"],
            ["Severidade:", <span className="tcrm-support-ticket-panel__dot-value" key="severity"><span />Média</span>, "link"],
            ["Grant:", <span className="tcrm-support-ticket-panel__dot-value tcrm-support-ticket-panel__dot-value--success" key="grant"><span />Ativo até hoje 18:00</span>, "link"],
            ["Escopo:", <>Importação e<br />duplicidades</>, "shield"]
          ].map(([label, value, icon]) => (
            <div key={String(label)}>
              <Icon name={icon as IconName} size="13px" />
              <dt>{label}</dt>
              <dd>{value as React.ReactNode}</dd>
            </div>
          ))}
        </dl>
        <section className="tcrm-support-ticket-panel__suggestion">
          <Icon name="sparkles" size="18px" tone="info" />
          <div>
            <strong>Resumo do agente 24/7</strong>
            <p>O studio anexou a planilha original.<br />Possível duplicidade por telefone.</p>
          </div>
        </section>
        <section className="tcrm-support-ticket-panel__grant-ok">
          <Icon name="shieldCheck" size="19px" tone="success" />
          <div>
            <strong>Acesso permitido</strong>
            <p>Acesso temporário autorizado pelo studio.<br />Todas as ações serão auditadas.</p>
          </div>
        </section>
        <section className="tcrm-support-ticket-panel__history">
          <h4>Histórico</h4>
          {[
            ["Studio abriu ticket", "hoje 09:12", "user"],
            ["Agente 24/7 coletou contexto", "hoje 09:15", "clock"],
            ["Grant aprovado pelo dono", "hoje 09:18", "shieldCheck"],
            ["Suporte iniciou análise", "hoje 09:21", "user"]
          ].map(([text, time, icon]) => (
            <div key={text}>
              <Icon name={icon as IconName} size="14px" />
              <span>{text}</span>
              <time>{time}</time>
            </div>
          ))}
        </section>
        <div className="tcrm-support-ticket-panel__actions tcrm-support-ticket-panel__actions--internal">
          <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("use-grant")} size="sm" variant="primary">Usar grant</Button>
          <Button disabled={isDisabled} leadingIcon="arrowLeft" onClick={() => onAction?.("reply-studio")} size="sm" variant="secondary">Responder studio</Button>
          <Button disabled={isDisabled} leadingIcon="lock" onClick={() => onAction?.("tenant")} size="sm" variant="secondary">Abrir tenant</Button>
          <Button disabled={isDisabled} leadingIcon="upload" onClick={() => onAction?.("import")} size="sm" variant="secondary">Abrir importação</Button>
          <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Abrir auditoria</Button>
          <Button disabled={isDisabled} leadingIcon="x" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("tcrm-support-ticket-panel", "tcrm-support-ticket-panel--support", className)} data-state={key} aria-label={String(title)}>
      <header className="tcrm-support-ticket-panel__header">
        <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--selected" showDot={false} tone={isAnswered ? "success" : "info"}>{isAnswered ? "Ticket respondido" : "Ticket selecionado"}</Chip>
          <IconButton className="tcrm-support-ticket-panel__close" disabled={isDisabled} icon="x" label="Fechar ticket" onClick={onClose} size="sm" variant="subtle" />
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </header>
      <dl className="tcrm-support-ticket-panel__facts">
        {facts.map((fact) => (
          <div key={fact.id}>
            <Icon name={fact.icon} size="14px" tone={fact.tone} />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <h4 className="tcrm-support-ticket-panel__section-title">Resumo do agente 24/7</h4>
      <section className="tcrm-support-ticket-panel__suggestion">
        <Icon name="sparkles" size="18px" tone="info" />
        <p>{summary}</p>
      </section>
      <section className="tcrm-support-ticket-panel__conversation">
        <h4>Conversa do ticket</h4>
        {messages.map((message) => (
          <div className="tcrm-support-ticket-panel__message" key={message.id}>
            <span><Icon name={message.icon} size="18px" tone={message.tone} /></span>
            <p>{message.text}</p>
          </div>
        ))}
      </section>
      <section className="tcrm-support-ticket-panel__access">
        <div>
          <h4>Acesso temporário</h4>
          <Chip className={cn("tcrm-internal-status-chip", hasActiveAccess ? "tcrm-internal-status-chip--grant" : "tcrm-internal-status-chip--unauthorized")} showDot={false} tone={hasActiveAccess ? "success" : "danger"}>{hasActiveAccess ? "Autorizado" : "Não autorizado"}</Chip>
        </div>
        <p><Icon name={hasActiveAccess ? "shieldCheck" : "lock"} size="15px" />{hasActiveAccess ? "Acesso limitado ativo, escopado e auditado." : "A Taliya pode solicitar acesso limitado se precisar investigar dados."}</p>
        <Button disabled={isDisabled} leadingIcon={hasActiveAccess ? "x" : "link"} onClick={() => onAction?.(hasActiveAccess ? "revoke-access" : "request-access")} size="sm" variant="secondary">{hasActiveAccess ? "Revogar acesso" : "Autorizar acesso"}</Button>
      </section>
      <div className="tcrm-support-ticket-panel__actions">
        <Button disabled={isDisabled} leadingIcon="arrowLeft" onClick={() => onAction?.("reply")} size="sm" variant="primary">Responder</Button>
        <Button disabled={isDisabled} leadingIcon="link" onClick={() => onAction?.("attach")} size="sm" variant="secondary">Anexar arquivo</Button>
        <Button aria-label={hasActiveAccess ? "Revogar acesso pelo rodapé" : "Autorizar acesso pelo rodapé"} disabled={isDisabled} leadingIcon={hasActiveAccess ? "x" : "lock"} onClick={() => onAction?.(hasActiveAccess ? "revoke-access" : "request-access")} size="sm" variant="secondary">{hasActiveAccess ? "Revogar acesso" : "Autorizar acesso"}</Button>
        <Button disabled={isDisabled} leadingIcon="upload" onClick={() => onAction?.("import")} size="sm" variant="secondary">Abrir importação</Button>
        <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Ver auditoria</Button>
        <Button disabled={isDisabled} leadingIcon="checkCircle" onClick={() => onAction?.("resolve")} size="sm" variant="secondary">Marcar resolvido</Button>
      </div>
    </section>
  );
}

export function GrantAccessPanel({
  state = "grant",
  onAction,
  className
}: CrmSurfaceProps & {
  onAction?: (actionId: string) => void;
}) {
  const key = stateKey(state) || "grant";
  const isExpired = key === "expired";
  const isRevoke = key === "revoke";

  return (
    <Panel className={cn("tcrm-grant-access-panel", className)} data-state={key} aria-label="Grants de acesso">
      <header className="tcrm-grant-access-panel__header">
        <h3><span>5.</span> Grants de acesso</h3>
        <Button onClick={() => onAction?.("view-grant")} size="sm" variant="ghost">Ver grant</Button>
      </header>
      <dl className="tcrm-grant-access-panel__facts">
        <div>
          <Icon name="lock" size="14px" />
          <dt>Importação e duplicidades</dt>
          <dd><Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={isExpired ? "paused" : isRevoke ? "danger" : "success"}>{isExpired ? "expirado" : isRevoke ? "revogar" : "ativo"}</Chip></dd>
        </div>
        <div><dt>Expira</dt><dd>{isExpired ? "ontem 18:00" : "hoje 18:00"}</dd></div>
        <div><dt>Aprovado por</dt><dd>{isRevoke ? "Marina - Suporte" : "Ana Souza"}</dd></div>
      </dl>
      <p className="tcrm-grant-access-panel__notice">
        <Icon name={isExpired ? "alert" : "shieldCheck"} size="15px" tone={isExpired ? "warning" : "success"} />
        {isExpired ? "Grant expirado. Solicite novo acesso escopado." : "Acesso temporário, escopado, e auditado."}
      </p>
      <Button className="tl-sr-only" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
    </Panel>
  );
}

export function TenantCard({
  name = "Studio Vila Mariana",
  state = "active",
  plan = "Growth",
  quota = 68,
  onOpen,
  className
}: CrmSurfaceProps & {
  name?: React.ReactNode;
  plan?: React.ReactNode;
  quota?: number;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "active";
  const statusText = key === "warning" ? "Risco" : key === "security" ? "Grant ativo" : "Ativo";
  const grantText = key === "security" ? "ativo" : key === "warning" ? "pendente" : "ativo";
  const billingText = key === "warning" ? "pagamento falhou" : "em dia";
  const ticketsText = key === "warning" ? "2 abertos" : "1 aberto";

  return (
    <article className={cn("tcrm-tenant-card", className)} data-state={key} role="row" aria-label={String(name)}>
      <Checkbox aria-label={`Selecionar ${String(name)}`} defaultChecked={key === "active"} />
      <span className="tcrm-tenant-card__avatar">{String(name).split(" ").slice(-2).map((part) => part[0]).join("") || "TV"}</span>
      <Button className="tcrm-tenant-card__name" onClick={() => onOpen?.()} size="sm" variant="ghost">{name}</Button>
      <Chip className={cn("tcrm-internal-status-chip", `tcrm-internal-status-chip--${key === "warning" ? "risk" : "grant"}`)} showDot tone={toneForState(key)}>{statusText}</Chip>
      <span>{plan}</span>
      <span>{key === "warning" ? "0/0" : "3/3"}</span>
      <span className="tcrm-tenant-card__quota"><b>{quota}%</b><ProgressBar value={quota} tone={quota >= 90 ? "danger" : quota >= 70 ? "warning" : "success"} /></span>
      <Button className="tcrm-tenant-card__link" onClick={() => onOpen?.()} size="sm" variant="ghost">{ticketsText}</Button>
      <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "warning" ? "warning" : "success"}>{grantText}</Chip>
      <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "warning" ? "danger" : "success"}>{billingText}</Chip>
      <span className="tcrm-tenant-card__meta">Marina<br /><small>hoje 10:24</small></span>
      <Button className="tl-sr-only" onClick={() => onOpen?.()} size="sm" variant="secondary">Abrir tenant</Button>
    </article>
  );
}

export function SecurityRulePanel({
  state = "allowed",
  onAction,
  disabled = false,
  className
}: CrmSurfaceProps & {
  onClose?: () => void;
  onAction?: (actionId: string) => void;
  disabled?: boolean;
}) {
  const key = stateKey(state) || "allowed";
  const grantLabel = key === "denied" ? "Grant negado" : key === "warning" ? "Revisar grant" : "Grant ativo";
  const isDisabled = disabled || key === "loading" || key === "blocked";

  return (
    <aside className={cn("tcrm-security-rule-panel", className)} data-state={key} aria-label="Segurança do tenant">
      <header>
        <h3>Segurança do tenant</h3>
        <IconButton icon="x" label="Fechar segurança" onClick={() => onAction?.("close")} size="sm" variant="subtle" />
        <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "denied" ? "danger" : key === "warning" ? "warning" : "success"}>{grantLabel}</Chip>
      </header>
      <dl className="tcrm-security-rule-panel__facts">
        {[
          ["Escopo", "Importação e duplicidades", "coins"],
          ["Expira", key === "denied" ? "sem acesso" : "hoje 18:00", "calendar"],
          ["Aprovador", key === "warning" ? "pendente" : "Ana Souza", "user"],
          ["Usuário Taliya", "Marina - Suporte", "fileText"],
          ["Permissão", key === "denied" ? "negada" : "Leitura e diagnóstico", "shield"]
        ].map(([label, value, icon]) => (
          <div key={label}>
            <Icon name={(label === "Escopo" ? "database" : icon) as IconName} size="15px" />
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-security-rule-panel__alert tcrm-security-rule-panel__alert--warning">
        <Icon name="shieldAlert" size="19px" tone="warning" />
        <p>Dados operacionais só aparecem dentro do escopo do grant.</p>
      </section>
      <section className="tcrm-security-rule-panel__alert tcrm-security-rule-panel__alert--info">
        <Icon name="info" size="20px" tone="info" />
        <p>Alunos, conversas e financeiro do studio não são exibidos por padrão.</p>
      </section>
      <section className="tcrm-security-rule-panel__copilot">
        <Icon name="sparkles" size="24px" tone="info" />
        <div>
          <strong>Copiloto interno</strong>
          <p>Resumo: revisar duplicidades antes do grant expirar. Não há incidente crítico neste tenant.</p>
          <small>O copiloto não concede grant, não altera billing e não bloqueia tenant sozinho.</small>
        </div>
      </section>
      <div className="tcrm-security-rule-panel__actions">
        <Button blockedReason={key === "denied" ? "Grant negado" : undefined} disabled={isDisabled} leadingIcon="shieldX" loading={key === "loading"} onClick={() => onAction?.("use")} size="sm" variant="primary">Usar grant</Button>
        <Button disabled={isDisabled} leadingIcon="shieldX" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
        <Button disabled={isDisabled} leadingIcon="headphones" onClick={() => onAction?.("ticket")} size="sm" variant="secondary">Abrir ticket</Button>
        <Button disabled={isDisabled} leadingIcon="fileText" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Ver auditoria</Button>
        <Button disabled={isDisabled} leadingIcon="fileText" onClick={() => onAction?.("note")} size="sm" variant="secondary">Adicionar nota interna</Button>
      </div>
    </aside>
  );
}

export interface InternalSecurityRulesPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  primaryRules?: React.ReactNode[];
  secondaryRules?: React.ReactNode[];
  title?: React.ReactNode;
}

export function InternalSecurityRulesPanel({
  className,
  primaryRules = [
    "Abrir tenant abre apenas metadados e visao permitida, nao dados operacionais completos.",
    "Solicitar grant e obrigatorio para diagnostico em dados do studio.",
    "Grants sempre tem escopo, motivo, permissao e expiracao."
  ],
  secondaryRules = [
    "Copiloto interno nao concede grant, nao altera billing e nao bloqueia tenant sozinho.",
    "A Taliya pode auditar acessos e acoes a qualquer momento."
  ],
  title = "Regras de seguranca",
  ...props
}: InternalSecurityRulesPanelProps) {
  const renderRules = (rules: React.ReactNode[]) => (
    <ul>
      {rules.map((rule, index) => (
        <li key={index}>
          <Icon name={index === 0 ? "shieldCheck" : "checkCircle"} size="14px" />
          <span>{rule}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Panel className={cn("tcrm-internal-security-rules", className)} {...props}>
      <header>
        <Icon name="shieldCheck" tone="warning" />
        <strong>{title}</strong>
      </header>
      <div className="tcrm-internal-security-rules__content">
        {renderRules(primaryRules)}
        {renderRules(secondaryRules)}
      </div>
    </Panel>
  );
}

export interface InternalOverviewDashboardRow {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: ComponentTone | "risk" | "grant";
  cells?: React.ReactNode[];
}

export interface InternalOverviewDashboardCard {
  id: string;
  title: React.ReactNode;
  value: React.ReactNode;
  label: React.ReactNode;
  secondary?: React.ReactNode;
  actionLabel?: React.ReactNode;
  icon?: IconName;
  columns?: React.ReactNode[];
  rows?: InternalOverviewDashboardRow[];
}

export interface InternalOverviewDashboardActivityItem {
  id: string;
  label: React.ReactNode;
  time: React.ReactNode;
  actor?: React.ReactNode;
  icon?: IconName;
}

export interface InternalOverviewDashboardCopilot {
  title?: React.ReactNode;
  summary: React.ReactNode;
  note: React.ReactNode;
  actionLabel?: React.ReactNode;
}

export interface InternalOverviewDashboardFilter {
  id: string;
  label: React.ReactNode;
}

export type InternalOverviewDashboardState = "normal" | "degraded" | "critical" | "empty" | "loading";

export type InternalShellDashboardRow = InternalOverviewDashboardRow;
export type InternalShellDashboardCard = InternalOverviewDashboardCard;
export type InternalShellActivityItem = InternalOverviewDashboardActivityItem;
export type InternalShellCopilot = InternalOverviewDashboardCopilot;
export type InternalShellFilter = InternalOverviewDashboardFilter;

export interface InternalOverviewDashboardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "children"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  searchPlaceholder?: string;
  filters?: InternalOverviewDashboardFilter[];
  cards?: InternalOverviewDashboardCard[];
  activityTitle?: React.ReactNode;
  activityItems?: InternalOverviewDashboardActivityItem[];
  activityActionLabel?: React.ReactNode;
  copilot?: InternalOverviewDashboardCopilot;
  children?: React.ReactNode;
  state?: InternalOverviewDashboardState;
  fluid?: boolean;
  showFilters?: boolean;
  showHeader?: boolean;
  onSearchChange?: (value: string) => void;
  onFilterSelect?: (filter: InternalOverviewDashboardFilter) => void;
  onCardAction?: (card: InternalOverviewDashboardCard) => void;
  onActivityAction?: () => void;
  onCopilotAction?: () => void;
}

export interface InternalShellProps extends Omit<CrmProductShellProps, "variant"> {}

export const internalShellNavItems: CrmShellNavItem[] = [
  { id: "overview", label: "Visão geral", active: true },
  { id: "leads", label: "Leads" },
  { id: "clients", label: "Clientes" },
  { id: "support", label: "Suporte" },
  { id: "incidents", label: "Incidentes" },
  { id: "billing", label: "Billing" },
  { id: "audit", label: "Auditoria" }
];

export const defaultInternalShellCards: InternalOverviewDashboardCard[] = [
  {
    id: "leads",
    title: "Leads Taliya",
    value: "12",
    label: "novos",
    secondary: "4 demos hoje",
    actionLabel: "Abrir leads",
    icon: "user",
    columns: ["Studio", "Origem", "Etapa"],
    rows: [
      { label: "Studio Corpo Vivo", value: "Demo marcada", tone: "info", cells: ["Studio Corpo Vivo", "Landing Pilates", <Chip key="demo" showDot={false} tone="info">Demo marcada</Chip>] },
      { label: "Studio Equilíbrio", value: "Qualificar", tone: "info", cells: ["Studio Equilíbrio", "Indicação", <Chip key="qualify" showDot={false} tone="info">Qualificar</Chip>] }
    ]
  },
  {
    id: "tenants",
    title: "Clientes / Tenants",
    value: "38",
    label: "ativos",
    secondary: "3 em risco",
    actionLabel: "Abrir clientes",
    icon: "user",
    columns: ["Studio", "Plano", "Status"],
    rows: [
      { label: "Studio Vila Mariana", value: "ativo", tone: "grant", cells: ["Studio Vila Mariana", "Growth", <Chip key="active" tone="success">ativo</Chip>] },
      { label: "Studio Reformer Sul", value: "risco", tone: "risk", cells: ["Studio Reformer Sul", "Base", <Chip key="risk" tone="warning">risco</Chip>] }
    ]
  },
  {
    id: "support",
    title: "Tickets de suporte",
    value: "7",
    label: "abertos",
    secondary: "2 aguardando Taliya",
    actionLabel: "Abrir suporte",
    icon: "sparkles",
    columns: ["Assunto", "Studio", "Status"],
    rows: [
      { label: "Importação duplicou alunos", value: "em análise", tone: "info", cells: ["Importação duplicou alunos", "Vila Mariana", <Chip key="analysis" showDot={false} tone="info">em análise</Chip>] },
      { label: "WhatsApp desconectou", value: "aguardando studio", tone: "risk", cells: ["WhatsApp desconectou", "Reformer Sul", <Chip key="waiting" showDot={false} tone="warning">aguardando studio</Chip>] }
    ]
  },
  {
    id: "grants",
    title: "Grants de acesso",
    value: "2",
    label: "ativos",
    secondary: "1 pendente",
    actionLabel: "Revisar grants",
    icon: "shield",
    columns: ["Studio", "Escopo", "Expira / Status"],
    rows: [
      { label: "Vila Mariana", value: "hoje 18:00", tone: "grant", cells: ["Vila Mariana", "Importação", <Chip key="expires" showDot={false} tone="success">hoje 18:00</Chip>] },
      { label: "Pilates Norte", value: "pendente", tone: "risk", cells: ["Pilates Norte", "Integração WhatsApp", <Chip key="pending" showDot={false} tone="warning">pendente</Chip>] }
    ]
  },
  {
    id: "incidents",
    title: "Incidentes",
    value: "1",
    label: "S2",
    secondary: "3 S3",
    actionLabel: "Abrir incidentes",
    icon: "shieldAlert",
    columns: ["Assunto", "Severidade", "Status"],
    rows: [
      { label: "Webhook de pagamento com atraso", value: "mitigando", tone: "info", cells: ["Webhook de pagamento com atraso", <Chip key="s2" showDot={false} tone="danger">S2</Chip>, <Chip key="mitigating" showDot={false} tone="info">mitigando</Chip>] },
      { label: "Falha intermitente de importação", value: "investigando", tone: "info", cells: ["Falha intermitente de importação", <Chip key="s3" showDot={false} tone="warning">S3</Chip>, <Chip key="investigating" showDot={false} tone="info">investigando</Chip>] }
    ]
  },
  {
    id: "billing",
    title: "Billing e entitlements",
    value: "2",
    label: "faturas com falha",
    secondary: "5 cotas em 90%",
    actionLabel: "Abrir billing",
    icon: "coins",
    columns: ["Studio", "Alerta"],
    rows: [
      { label: "Studio Reformer Sul", value: "pagamento falhou", tone: "risk", cells: ["Studio Reformer Sul", <Chip key="failed" showDot={false} tone="danger">pagamento falhou</Chip>] },
      { label: "Studio Ana Pilates", value: "cota 90%", tone: "risk", cells: ["Studio Ana Pilates", <Chip key="quota" showDot={false} tone="warning">cota 90%</Chip>] }
    ]
  }
];

export const defaultInternalShellActivityItems: InternalOverviewDashboardActivityItem[] = [
  { id: "ticket", label: "Marina respondeu ticket", time: "09:42", icon: "shield" },
  { id: "grant", label: "Grant usado por João", time: "09:35", icon: "shield" },
  { id: "billing", label: "Plano atualizado via billing", time: "09:28", icon: "shield" },
  { id: "incident", label: "Incidente S3 criado", time: "09:21", icon: "alert" }
];

export const defaultInternalShellFilters: InternalOverviewDashboardFilter[] = [
  { id: "today", label: "Hoje" },
  { id: "week", label: "Esta semana" },
  { id: "owner", label: "Responsável" },
  { id: "status", label: "Status" },
  { id: "risk", label: "Risco" }
];

export function InternalShellDefaultActions() {
  return (
    <>
      <Button leadingIcon="plus" size="sm">Novo lead</Button>
      <Button leadingIcon="shield" size="sm" variant="secondary">Abrir ticket interno</Button>
    </>
  );
}

export function InternalShellCard({
  card,
  onCardAction
}: {
  card: InternalOverviewDashboardCard;
  onCardAction?: (card: InternalOverviewDashboardCard) => void;
}) {
  const rows = card.rows ?? [
    { label: "Studio Vila Mariana", value: "ativo", tone: "grant" },
    { label: "Studio Reformer Sul", value: "risco", tone: "risk" }
  ];
  const columns = card.columns ?? ["Studio", "Status"];
  const columnTemplate = `repeat(${columns.length}, minmax(0, 1fr))`;

  return (
    <Panel className="tcrm-internal-shell__card">
      <header><Icon name={card.icon ?? "user"} size="20px" /><h3>{card.title}</h3></header>
      <p><strong>{card.value}</strong> {card.label} {card.secondary ? <span>{card.secondary}</span> : null}</p>
      <div className="tcrm-internal-shell__table">
        <div className="tcrm-internal-shell__table-head" style={{ gridTemplateColumns: columnTemplate }}>
          {columns.map((column, index) => <span key={index}>{column}</span>)}
        </div>
        {rows.map((row, index) => (
          <div className="tcrm-internal-shell__table-row" key={`${card.id}-${index}`} style={{ gridTemplateColumns: columnTemplate }}>
            {(row.cells ?? [
              <b key="label">{row.label}</b>,
              <Chip
                className={cn(
                  "tcrm-internal-status-chip",
                  row.tone === "risk" ? "tcrm-internal-status-chip--risk" : "tcrm-internal-status-chip--grant"
                )}
                key="value"
                tone={row.tone === "risk" ? "warning" : row.tone === "grant" ? "success" : row.tone}
              >
                {row.value}
              </Chip>
            ]).map((cell, cellIndex) => <span key={cellIndex}>{cell}</span>)}
          </div>
        ))}
      </div>
      {card.actionLabel ? <Button onClick={() => onCardAction?.(card)} size="sm" variant="ghost">{card.actionLabel}</Button> : null}
    </Panel>
  );
}

