/** Inbox, agent and drawer composition patterns. */
import React from "react";

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  ChecklistItem,
  Chip,
  ConnectorLine,
  Drawer,
  DrawerSection,
  EmptyState,
  ExecutionRow,
  FilterChip,
  FieldGrid,
  FieldStack,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListItem,
  LoadingState,
  MessageBubble,
  Panel,
  ProgressBar,
  SearchInput,
  Select,
  StatusDot,
  TagInput,
  ComposerInput,
  DropdownMenu,
  TaliyaLogo,
  Textarea,
  cn
} from "@taliya/ui";
import type {
  ButtonVariant,
  ComponentTone,
  DropdownAction,
  IconName,
  StatusDotStatus
} from "@taliya/ui";
import type {
  CrmComponentName
} from "../component-registry.js";
import type {
  CrmSurfaceProps
} from "./shell.js";
import type {
  ConversationListState
} from "./../domains/billing/index.js";
import {
  Roster
} from "./../domains/agenda/index.js";

import {
  ActivityFeed,
  DashboardGrid
} from "./shell.js";
import {
  EnrollmentChecklist,
  SecurityRulePanel,
  SupportTicketPanel
} from "../domains/students/index.js";

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

function componentLabel(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function Reference15Header({ number, title }: { number: number; title: React.ReactNode }) {
  return <header className="tcrm-reference15-header"><span>{number}</span><h3>{title}</h3></header>;
}

function iconForFamily(family?: string): IconName {
  switch (family) {
    case "Agents":
    case "Agent":
      return "bot";
    case "Agenda":
      return "calendar";
    case "Billing":
    case "Financeiro":
    case "Subscription":
    case "Usage":
      return "wallet";
    case "Inbox":
    case "Support":
      return "message";
    default:
      return "clipboard";
  }
}

function CrmSurface({ component, family, title, description, meta, state, statusLabel, icon, action, selected = false, className, children, ...props }: CrmSurfaceProps & { component: string; family?: string }) {
  return (
    <Card className={cn("tcrm-surface", `tcrm-surface--${component}`, className)} data-component={component} selected={selected} {...props}>
      <header className="tcrm-surface__header"><span className="tcrm-surface__icon"><Icon name={icon ?? iconForFamily(family)} /></span><div><h3>{title ?? componentLabel(component)}</h3>{meta ? <p>{meta}</p> : null}</div>{statusLabel || state ? <Chip tone={toneForState(state)}>{statusLabel ?? state}</Chip> : null}</header>
      {description ? <p className="tcrm-surface__description">{description}</p> : null}
      {children ? <div className="tcrm-surface__body">{children}</div> : null}
      {action ? <footer className="tcrm-surface__footer">{action}</footer> : null}
    </Card>
  );
}
export type ConversationListRowState = "default" | "selected" | "unread" | "waiting-human" | "agent-paused" | "failed" | "opt-out";
export type ConversationListStatusTone = "neutral" | "waiting" | "progress" | "copilot" | "failed" | "optout";
export type ConversationListChannel = "whatsapp" | "instagram" | "system";

export interface ConversationListFilter {
  id: string;
  label: React.ReactNode;
  count?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ConversationListRow {
  id: string;
  name: string;
  avatarSrc?: string;
  subject: React.ReactNode;
  detail?: React.ReactNode;
  preview: React.ReactNode;
  time: React.ReactNode;
  metaLabel: React.ReactNode;
  metaIcon?: IconName;
  statusLabel: React.ReactNode;
  statusTone?: ConversationListStatusTone;
  statusIcon?: IconName;
  channel?: ConversationListChannel;
  state?: ConversationListRowState;
  selected?: boolean;
  unread?: boolean;
  unreadCount?: React.ReactNode;
  disabled?: boolean;
}

export interface ConversationListProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: ConversationListState;
  layout?: "default" | "compact";
  filters?: ConversationListFilter[];
  rows?: ConversationListRow[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchFilter?: () => void;
  activeFilterId?: string;
  selectedId?: string;
  pageSizeLabel?: React.ReactNode;
  rangeLabel?: React.ReactNode;
  summaryLabel?: React.ReactNode;
  currentPageLabel?: React.ReactNode;
  previousLabel?: string;
  nextLabel?: string;
  blockedReason?: React.ReactNode;
  onFilterChange?: (filter: ConversationListFilter) => void;
  onConversationSelect?: (row: ConversationListRow) => void;
  onPageSizeClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const defaultConversationListFilters: ConversationListFilter[] = [
  { id: "all", label: "Todas", selected: true },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "waiting-human", label: "Aguardando humano" },
  { id: "agent-paused", label: "Agente pausado" },
  { id: "failed", label: "Falhas" },
  { id: "archived", label: "Arquivadas" }
];

const defaultConversationListRows: ConversationListRow[] = [
  {
    id: "ana-silva",
    name: "Ana Silva",
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

const compactConversationListFilters: ConversationListFilter[] = [
  { id: "all", label: "Todos", count: 24, selected: true },
  { id: "whatsapp", label: "WhatsApp", count: 18 },
  { id: "email", label: "E-mail", count: 3 },
  { id: "internal", label: "Interno", count: 2 },
  { id: "archived", label: "Arquivados" }
];

const compactConversationListRows: ConversationListRow[] = [
  { id: "joao-silva", name: "Joao Silva", subject: "Orcamento", preview: "Obrigada! Pode me enviar o orcamento, por favor?", time: "09:42", metaLabel: "WhatsApp", statusLabel: "", channel: "whatsapp", unread: true, unreadCount: 2 },
  { id: "ana-paula", name: "Ana Paula Santos", subject: "Visita tecnica", preview: "Preciso reagendar a visita tecnica.", time: "09:15", metaLabel: "WhatsApp", statusLabel: "", channel: "whatsapp", selected: true, state: "selected" },
  { id: "carlos-menezes", name: "Carlos Menezes", subject: "Proposta", preview: "Ainda nao recebi o retorno da proposta.", time: "08:51", metaLabel: "WhatsApp", statusLabel: "", channel: "whatsapp", unread: true, unreadCount: 1, state: "failed" },
  { id: "mariana-oliveira", name: "Mariana Oliveira", subject: "Plano anual", preview: "Duvida sobre o plano anual.", time: "Ontem", metaLabel: "E-mail", statusLabel: "", channel: "system", unreadCount: 2 },
  { id: "rafael-torres", name: "Rafael Torres", subject: "Suporte", preview: "Otimo, obrigado pelo suporte!", time: "Ontem", metaLabel: "WhatsApp", statusLabel: "", channel: "whatsapp" },
  { id: "juliana-costa", name: "Juliana Costa", subject: "Retorno", preview: "Voltaremos a falar na proxima semana.", time: "Ter", metaLabel: "WhatsApp", statusLabel: "Aguardando resposta", channel: "whatsapp", unreadCount: 1 }
];

function conversationListRowLabel(row: ConversationListRow) {
  return `Abrir conversa de ${row.name}`;
}

function conversationListChannelLabel(channel?: ConversationListChannel) {
  if (channel === "instagram") return "Instagram";
  if (channel === "system") return "Sistema";
  return "WhatsApp";
}

function conversationListRowKey(row: ConversationListRow, selectedId?: string) {
  if (selectedId !== undefined) return row.id === selectedId;
  return Boolean(row.selected || row.state === "selected");
}

export function ConversationList({
  state = "source",
  layout = "default",
  filters,
  rows,
  searchPlaceholder = "Buscar conversas, clientes, assuntos...",
  searchValue,
  onSearchChange,
  onSearchFilter,
  activeFilterId,
  selectedId,
  pageSizeLabel = "10",
  rangeLabel,
  summaryLabel = "Exibindo 6 de 24 conversas",
  currentPageLabel = "1",
  previousLabel = "Página anterior",
  nextLabel = "Próxima página",
  blockedReason = "Atendimento pausado para revisão humana.",
  onFilterChange,
  onConversationSelect,
  onPageSizeClick,
  onPreviousPage,
  onNextPage,
  className,
  ...props
}: ConversationListProps) {
  const isLoading = state === "loading";
  const isEmpty = state === "empty";
  const isBlocked = state === "blocked";
  const isCompact = layout === "compact";
  const effectiveFilters = filters ?? (isCompact ? compactConversationListFilters : defaultConversationListFilters);
  const effectiveRows = rows ?? (isCompact ? compactConversationListRows : defaultConversationListRows);
  const effectiveRangeLabel = rangeLabel ?? (isCompact ? "1–6 de 24" : "1–5 de 5");

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, row: ConversationListRow) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!row.disabled && !isBlocked) {
        onConversationSelect?.(row);
      }
    }
  };

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label="Lista de conversas"
      className={cn("tcrm-conversation-list", isCompact && "tcrm-conversation-list--compact", className)}
      data-component="ConversationList"
      data-layout={layout}
      data-state={state}
      {...props}
    >
      {isCompact ? (
        <SearchInput
          aria-label="Buscar conversas"
          className="tcrm-conversation-list__search"
          onChange={(event) => onSearchChange?.(event.currentTarget.value)}
          onFilter={onSearchFilter}
          placeholder={searchPlaceholder}
          value={searchValue}
        />
      ) : null}
      <div aria-label="Filtros de conversas" className="tcrm-conversation-list__filters" role="toolbar">
        {effectiveFilters.map((filter) => {
          const selected = activeFilterId ? filter.id === activeFilterId : Boolean(filter.selected);
          return (
            <FilterChip
              disabled={filter.disabled || isLoading || isBlocked}
              key={filter.id}
              onClick={() => onFilterChange?.(filter)}
              selected={selected}
            >
              <span>{filter.label}</span>
              {filter.count !== undefined ? <Badge>{filter.count}</Badge> : null}
            </FilterChip>
          );
        })}
      </div>
      {isLoading ? (
        <LoadingState className="tcrm-conversation-list__state" title="Carregando conversas" variant="skeleton" />
      ) : isEmpty ? (
        <EmptyState
          className="tcrm-conversation-list__state"
          description="Nenhuma conversa encontrada com os filtros atuais."
          title="Sem conversas"
          variant="neutral"
        />
      ) : (
        <List className="tcrm-conversation-list__rows">
          {effectiveRows.map((row) => {
            const selected = conversationListRowKey(row, selectedId);
            const disabled = row.disabled || isBlocked;
            return (
              <ListItem
                aria-label={conversationListRowLabel(row)}
                aria-pressed={selected || undefined}
                className={cn("tcrm-conversation-list__row", selected && "tcrm-conversation-list__row--selected")}
                data-row-state={row.state ?? "default"}
                disabled={disabled}
                key={row.id}
                leading={
                  <span className="tcrm-conversation-list__avatar-wrap">
                    <Avatar className="tcrm-conversation-list__avatar" name={row.name} src={row.avatarSrc} />
                    {row.channel ? (
                      <span
                        aria-label={conversationListChannelLabel(row.channel)}
                        className={`tcrm-conversation-list__channel tcrm-conversation-list__channel--${row.channel}`}
                        role="img"
                      >
                        <Icon name={row.channel === "whatsapp" ? "whatsapp" : row.channel === "instagram" ? "message" : "settings"} />
                      </span>
                    ) : null}
                  </span>
                }
                onClick={() => {
                  if (!disabled) {
                    onConversationSelect?.(row);
                  }
                }}
                onKeyDown={(event) => handleRowKeyDown(event, row)}
                role="button"
                selected={selected}
                tabIndex={disabled ? -1 : 0}
                title={
                  <span className="tcrm-conversation-list__title-line">
                    <span>{row.name}</span>
                    <span className="tcrm-conversation-list__subject">· {row.subject}</span>
                    {row.detail ? <span className="tcrm-conversation-list__subject">· {row.detail}</span> : null}
                  </span>
                }
                trailing={
                  <span className="tcrm-conversation-list__trailing">
                    <time className="tcrm-conversation-list__time">{row.time}</time>
                    {row.unreadCount !== undefined ? <Badge className="tcrm-conversation-list__unread-count">{row.unreadCount}</Badge> : null}
                  </span>
                }
                unread={row.unread || row.state === "unread"}
              >
                <span className="tcrm-conversation-list__preview">{row.preview}</span>
                {isCompact ? (
                  row.statusLabel ? <Chip className="tcrm-conversation-list__compact-status" tone="danger">{row.statusLabel}</Chip> : null
                ) : (
                  <ChannelStatus
                    className="tcrm-conversation-list__badges"
                    sourceIcon={row.metaIcon}
                    sourceLabel={row.metaLabel}
                    statusIcon={row.statusIcon}
                    statusLabel={row.statusLabel}
                    state={row.statusTone ?? "neutral"}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      )}
      {isBlocked ? (
        <InlineAlert className="tcrm-conversation-list__blocked" tone="warning" title="Lista bloqueada">
          {blockedReason}
        </InlineAlert>
      ) : null}
      <footer className="tcrm-conversation-list__footer">
        {isCompact ? <span className="tcrm-conversation-list__summary">{summaryLabel}</span> : null}
        <span className="tcrm-conversation-list__page-size-label">Itens por página:</span>
        <Button className="tcrm-conversation-list__page-size" disabled={isLoading || isBlocked} onClick={onPageSizeClick} trailingIcon="chevronDown" variant="secondary">
          {pageSizeLabel}
        </Button>
        <span className="tcrm-conversation-list__range">{effectiveRangeLabel}</span>
        <span className="tcrm-conversation-list__pager">
          <IconButton
            className="tcrm-conversation-list__pager-button"
            disabled={isLoading || isBlocked}
            icon="chevronLeft"
            label={previousLabel}
            onClick={onPreviousPage}
            size="sm"
            variant="subtle"
          />
          <span aria-current="page" className="tcrm-conversation-list__current-page">{currentPageLabel}</span>
          <IconButton
            className="tcrm-conversation-list__pager-button"
            disabled={isLoading || isBlocked}
            icon="chevronRight"
            label={nextLabel}
            onClick={onNextPage}
            size="sm"
            variant="subtle"
          />
        </span>
      </footer>
    </section>
  );
}

export interface ConversationThreadMessage {
  id: string;
  sender: React.ReactNode;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
  compact?: boolean;
  variant?: "inbound" | "outbound" | "internal" | "failed" | "suggestion" | "agent" | "human";
  status?: "sent" | "delivered" | "read" | "pending" | "failed" | "locked";
}

export interface ConversationThreadSystemEvent {
  id: string;
  time: React.ReactNode;
  actor: React.ReactNode;
  body: React.ReactNode;
}

export interface ConversationThreadAction {
  id: string;
  label: React.ReactNode;
  icon?: IconName;
}

const defaultConversationThreadMessages: ConversationThreadMessage[] = [
  {
    id: "ana-1",
    sender: "Ana Silva",
    body: "Oi, perdi a aula de ontem. Consigo repor quinta?",
    time: "10:21"
  },
  {
    id: "recepcao-1",
    sender: "Recepcao",
    body: "Vou verificar uma opcao de horario e te aviso por aqui.",
    time: "10:22"
  },
  {
    id: "ana-2",
    sender: "Ana Silva",
    body: "Pode ser de manha se tiver vaga.",
    time: "10:23",
    compact: true
  }
];

const defaultConversationThreadEvents: ConversationThreadSystemEvent[] = [
  { id: "system-1", time: "10:21", actor: "Sistema", body: "Ana vinculada a turma terca 17h" }
];

const compactConversationThreadMessages: ConversationThreadMessage[] = [
  {
    id: "ana-paula-inbound",
    sender: "Ana Paula Santos",
    body: "Oi! Preciso reagendar a visita tecnica para quinta-feira pela manha.",
    time: "09:15",
    variant: "inbound"
  },
  {
    id: "attendance-outbound",
    sender: "Atendimento",
    body: "Claro, Ana Paula! Posso encaixar para quinta as 9:00h. Esta tudo certo?",
    time: "09:16",
    variant: "outbound",
    status: "read"
  },
  {
    id: "internal-note",
    sender: "Nota interna · Sam Frank",
    body: "Cliente prefere periodo da manha. Verificar disponibilidade do tecnico.",
    time: "09:17",
    variant: "internal",
    status: "locked"
  }
];

export interface ConversationThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  layout?: "default" | "compact";
  avatarSrc?: string;
  contactName?: React.ReactNode;
  subject?: React.ReactNode;
  channelLabel?: string;
  statusLabel?: React.ReactNode;
  dateLabel?: React.ReactNode;
  messages?: ConversationThreadMessage[];
  events?: ConversationThreadSystemEvent[];
  actions?: ConversationThreadAction[];
  handoffLabel?: React.ReactNode;
  suggestionTitle?: React.ReactNode;
  suggestionDescription?: React.ReactNode;
  suggestionActionLabel?: React.ReactNode;
  composerPlaceholder?: string;
  state?: "source" | "loading" | "blocked";
  onAction?: (actionId: string) => void;
  onChannelClick?: () => void;
  onStatusClick?: () => void;
  onUseSuggestion?: () => void;
  onSend?: (value: string) => void;
  onAttach?: () => void;
  onDocument?: () => void;
  onTemplateOpen?: () => void;
  onSendOptions?: () => void;
}

export function ConversationThread({
  layout = "default",
  avatarSrc,
  contactName,
  subject,
  channelLabel = "WhatsApp",
  statusLabel = "Em atendimento",
  dateLabel = "Hoje",
  messages,
  events,
  actions,
  handoffLabel = "Agente pausado · aguardando revisão humana",
  suggestionTitle = "Copiloto sugeriu uma resposta",
  suggestionDescription = "Sugestao abaixo. Voce pode editar e enviar quando quiser.",
  suggestionActionLabel = "Usar sugestao",
  composerPlaceholder = "Responder pelo WhatsApp...",
  state = "source",
  onAction,
  onChannelClick,
  onStatusClick,
  onUseSuggestion,
  onSend,
  onAttach,
  onDocument,
  onTemplateOpen,
  onSendOptions,
  className,
  children,
  ...props
}: ConversationThreadProps) {
  const isBlocked = state === "blocked";
  const isLoading = state === "loading";
  const isCompact = layout === "compact";
  const effectiveContactName = contactName ?? (isCompact ? "Ana Paula Santos" : "Ana Silva");
  const effectiveSubject = subject ?? (isCompact ? "Conversa selecionada" : "Assunto: Reposicao de aula");
  const effectiveMessages = messages ?? (isCompact ? compactConversationThreadMessages : defaultConversationThreadMessages);
  const effectiveEvents = events ?? (isCompact ? [] : defaultConversationThreadEvents);
  const effectiveActions = actions ?? (isCompact
    ? [
        { id: "search", label: "Buscar na conversa", icon: "search" as IconName },
        { id: "contact", label: "Abrir contato", icon: "user" as IconName },
        { id: "tag", label: "Gerenciar etiquetas", icon: "tag" as IconName },
        { id: "more", label: "Mais acoes", icon: "more" as IconName }
      ]
    : [
        { id: "assume", label: "Assumir", icon: "user" as IconName },
        { id: "pause-agent", label: "Pausar agente", icon: "pause" as IconName },
        { id: "create-task", label: "Criar tarefa", icon: "plus" as IconName }
      ]);

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label="Conversa selecionada"
      className={cn("tcrm-conversation-thread", isCompact && "tcrm-conversation-thread--compact", className)}
      data-component="ConversationThread"
      data-layout={layout}
      {...props}
    >
      <header className="tcrm-conversation-thread__header">
        <span className="tcrm-conversation-thread__avatar-wrap">
          <Avatar className="tcrm-conversation-thread__avatar" name={effectiveContactName?.toString() ?? "Contato"} src={avatarSrc} />
          <span aria-label={channelLabel} className="tcrm-conversation-thread__channel" role="img">
            <Icon name="whatsapp" />
          </span>
        </span>
        <span className="tcrm-conversation-thread__identity">
          <strong>{effectiveContactName}</strong>
          <small>{effectiveSubject}</small>
        </span>
        {isCompact ? (
          <span className="tcrm-conversation-thread__channel-controls">
            <Button disabled={isBlocked || isLoading} leadingIcon="whatsapp" onClick={onChannelClick} size="sm" variant="secondary">{channelLabel}</Button>
            <Button disabled={isBlocked || isLoading} onClick={onStatusClick} size="sm" trailingIcon="chevronDown" variant="secondary">{statusLabel}</Button>
          </span>
        ) : null}
        <span aria-label="Acoes da conversa" className="tcrm-conversation-thread__actions" role="toolbar">
          {effectiveActions.map((action) => isCompact ? (
            <IconButton className="tcrm-conversation-thread__icon-action" disabled={isBlocked || isLoading} icon={action.icon ?? "more"} key={action.id} label={action.label?.toString() ?? action.id} onClick={() => onAction?.(action.id)} size="sm" variant="subtle" />
          ) : (
            <Button className="tcrm-conversation-thread__action" disabled={isBlocked || isLoading} key={action.id} leadingIcon={action.icon} onClick={() => onAction?.(action.id)} size="sm" variant="secondary">{action.label}</Button>
          ))}
        </span>
      </header>
      {!isCompact ? <HandoffBanner className="tcrm-conversation-thread__handoff" description={handoffLabel} state="human needed" /> : null}
      <div className="tcrm-conversation-thread__stream">
        {isLoading ? (
          <LoadingState className="tcrm-conversation-thread__state" title="Carregando conversa" variant="skeleton" />
        ) : children ?? (
          <>
            {isCompact ? <span className="tcrm-conversation-thread__date-divider">{dateLabel}</span> : null}
            {effectiveMessages.slice(0, 1).map((message) => (
              <ConversationThreadMessageRow avatarSrc={message.avatarSrc ?? avatarSrc} compactLayout={isCompact} key={message.id} message={message} />
            ))}
            {effectiveEvents.map((event) => (
              <div className="tcrm-conversation-thread__system-row" key={event.id}>
                <span aria-hidden="true" className="tcrm-conversation-thread__system-line" />
                <time>{event.time}</time>
                <strong>{event.actor}</strong>
                <span>{event.body}</span>
              </div>
            ))}
            {effectiveMessages.slice(1).map((message) => (
              <ConversationThreadMessageRow avatarSrc={message.avatarSrc ?? avatarSrc} compactLayout={isCompact} key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
      <section className="tcrm-conversation-thread__suggestion">
        <Icon className="tcrm-conversation-thread__suggestion-icon" name="sparkles" />
        <span>
          <strong>{suggestionTitle}</strong>
          <small>{suggestionDescription}</small>
        </span>
        <Button
          className="tcrm-conversation-thread__suggestion-action"
          disabled={isBlocked || isLoading}
          onClick={onUseSuggestion}
          size="sm"
          variant="secondary"
        >
          {suggestionActionLabel}
        </Button>
      </section>
      <Composer
        disabled={isBlocked || isLoading}
        onAttach={onAttach}
        onDocument={onDocument}
        onSend={onSend}
        onSendOptions={onSendOptions}
        onTemplateOpen={onTemplateOpen}
        placeholder={composerPlaceholder}
      />
    </section>
  );
}

function ConversationThreadMessageRow({ avatarSrc, compactLayout = false, message }: { avatarSrc?: string; compactLayout?: boolean; message: ConversationThreadMessage }) {
  const messageVariant = message.variant === "agent" ? "suggestion" : message.variant === "human" ? "inbound" : message.variant ?? "inbound";
  const showAvatar = !compactLayout || messageVariant === "inbound";
  const visibleSender = compactLayout && (messageVariant === "inbound" || messageVariant === "outbound") ? undefined : message.sender;
  return (
    <div className={cn("tcrm-conversation-thread__message-row", `tcrm-conversation-thread__message-row--${messageVariant}`, message.compact && "tcrm-conversation-thread__message-row--compact")}>
      {showAvatar ? <Avatar className="tcrm-conversation-thread__message-avatar" name={message.sender?.toString() ?? "Pessoa"} src={avatarSrc} /> : <span aria-hidden="true" />}
      <MessageBubble className="tcrm-conversation-thread__bubble" sender={visibleSender} status={message.status} timestamp={message.time} variant={messageVariant}>
        {message.body}
      </MessageBubble>
    </div>
  );
}

export interface ComposerProps {
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onSend?: (value: string) => void;
  onTemplateOpen?: () => void;
  onAttach?: () => void;
  onDocument?: () => void;
  onSendOptions?: () => void;
  className?: string;
}

export function Composer({
  disabled = false,
  loading = false,
  placeholder = disabled ? "Atendimento pausado" : "Responder",
  defaultValue = "",
  onSend,
  onTemplateOpen,
  onAttach,
  onDocument,
  onSendOptions,
  className
}: ComposerProps) {
  return (
    <ComposerInput
      aria-label="Responder pelo WhatsApp"
      actionsOrder={["attach", "media", "quickReply"]}
      allowEmptySend
      attachLabel="Anexar arquivo"
      className={cn("tcrm-composer", disabled && "tcrm-composer--disabled", className)}
      defaultValue={defaultValue}
      disabled={disabled}
      mediaLabel="Inserir documento"
      onAttach={onAttach}
      onMedia={onDocument}
      onQuickReply={onTemplateOpen}
      onSend={(nextValue) => onSend?.(nextValue)}
      placeholder={placeholder}
      quickReplyControl={
        <Button
          className="tcrm-composer__templates"
          disabled={disabled}
          onClick={onTemplateOpen}
          size="sm"
          trailingIcon="chevronDown"
          type="button"
          variant="secondary"
        >
          Templates
        </Button>
      }
      sendLabel="Enviar"
      sending={loading}
      sendTrailingControl={<IconButton disabled={disabled} icon="chevronDown" label="Mais opcoes de envio" onClick={onSendOptions} size="sm" variant="selected" />}
      showFieldIcon={false}
      showInternalToggle={false}
    />
  );
}

export interface ComposerPanelAction {
  id: string;
  label: string;
  icon: IconName;
  disabled?: boolean;
}

const composerPanelSourceActions: ComposerPanelAction[] = [
  { id: "attach", label: "Anexar arquivo", icon: "paperclip" },
  { id: "media", label: "Abrir midia interna", icon: "camera" },
  { id: "templates", label: "Modelos / Respostas rapidas", icon: "layout" },
  { id: "send", label: "Enviar mensagens", icon: "send" },
  { id: "note", label: "Inserir nota interna", icon: "messageSquareText" }
];

export function ComposerPanel({
  actions = composerPanelSourceActions,
  disabled = false,
  onAction,
  className,
  ...composerProps
}: ComposerProps & {
  actions?: ComposerPanelAction[];
  onAction?: (action: ComposerPanelAction) => void;
}) {
  return (
    <section className={cn("tcrm-composer-panel", className)} data-component="ComposerPanel">
      <Composer {...composerProps} disabled={disabled} />
      <div aria-label="Acoes do composer" className="tcrm-composer-panel__actions" role="group">
        {actions.map((action) => (
          <Button
            disabled={disabled || action.disabled}
            key={action.id}
            leadingIcon={action.icon}
            onClick={() => onAction?.(action)}
            size="sm"
            variant="ghost"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

/** @deprecated Use Composer or ComposerPanel. */
export function LegacyComposer({ disabled = false, className }: { disabled?: boolean; className?: string }) {
  return <ComposerInput className={className} disabled={disabled} placeholder={disabled ? "Atendimento pausado" : "Responder"} />;
}

export type ChannelStatusState = ConversationListStatusTone | "connected" | "human active";

export interface ChannelStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  sourceLabel?: React.ReactNode;
  sourceIcon?: IconName;
  statusLabel?: React.ReactNode;
  statusIcon?: IconName;
  state?: ChannelStatusState;
}

function channelStatusLabel(state: ChannelStatusState) {
  if (state === "progress") return "Em andamento";
  if (state === "copilot") return "Copiloto sugeriu";
  if (state === "failed") return "Falha de envio";
  if (state === "optout") return "Opt-out registrado";
  if (state === "connected") return "Conectado";
  return "Aguardando humano";
}

function channelStatusIcon(state: ChannelStatusState): IconName | undefined {
  if (state === "copilot") return "sparkles";
  if (state === "failed") return "alert";
  return undefined;
}

export function ChannelStatus({
  sourceLabel = "Recepção",
  sourceIcon = "calendar",
  statusLabel,
  statusIcon,
  state = "waiting",
  className,
  ...props
}: ChannelStatusProps) {
  const resolvedStatusLabel = statusLabel ?? channelStatusLabel(state);
  const resolvedStatusIcon = statusIcon ?? channelStatusIcon(state);
  const stateClass = String(state).replace(/\s+/g, "-");

  return (
    <span
      aria-label={`${sourceLabel}: ${resolvedStatusLabel}`}
      className={cn("tcrm-channel-status", `tcrm-channel-status--${stateClass}`, className)}
      role="status"
      {...props}
    >
      <Chip className="tcrm-channel-status__source" icon={sourceIcon} showDot={!sourceIcon}>
        {sourceLabel}
      </Chip>
      <Chip className="tcrm-channel-status__state" icon={resolvedStatusIcon} showDot={!resolvedStatusIcon}>
        {resolvedStatusLabel}
      </Chip>
    </span>
  );
}

export interface ChannelStatusPanelQueueItem {
  id: string;
  label: string;
  count: React.ReactNode;
}

export interface ChannelStatusPanelItem {
  id: string;
  label: string;
  status: StatusDotStatus;
}

const channelStatusPanelSourceQueue: ChannelStatusPanelQueueItem[] = [
  { id: "empty", label: "Sem espera", count: "0" },
  { id: "small", label: "Fila pequena", count: "3+" },
  { id: "medium", label: "Fila media", count: "12" },
  { id: "high", label: "Fila alta", count: "99+" }
];

const channelStatusPanelSourceItems: ChannelStatusPanelItem[] = [
  { id: "connected", label: "Conectado", status: "success" },
  { id: "pending", label: "Pendente", status: "warning" },
  { id: "failed", label: "Falha na conexao", status: "danger" }
];

export function ChannelStatusPanel({
  queueLabel = "Na fila (s)",
  queueItems = channelStatusPanelSourceQueue,
  statusLabel = "Status WhatsApp",
  items = channelStatusPanelSourceItems,
  disabled = false,
  onQueueSelect,
  onStatusSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  queueLabel?: React.ReactNode;
  queueItems?: ChannelStatusPanelQueueItem[];
  statusLabel?: React.ReactNode;
  items?: ChannelStatusPanelItem[];
  disabled?: boolean;
  onQueueSelect?: (item: ChannelStatusPanelQueueItem) => void;
  onStatusSelect?: (item: ChannelStatusPanelItem) => void;
}) {
  return (
    <section className={cn("tcrm-channel-status-panel", className)} data-component="ChannelStatusPanel" {...props}>
      <small>{queueLabel}</small>
      <div aria-label={String(queueLabel)} className="tcrm-channel-status-panel__queue" role="group">
        {queueItems.map((item) => (
          <Button
            aria-label={`${item.label}: ${String(item.count)}`}
            disabled={disabled}
            key={item.id}
            onClick={() => onQueueSelect?.(item)}
            size="sm"
            variant="secondary"
          >
            {item.count}
          </Button>
        ))}
      </div>
      <small>{statusLabel}</small>
      <div className="tcrm-channel-status-panel__items">
        {items.map((item) => (
          <Button
            disabled={disabled}
            key={item.id}
            onClick={() => onStatusSelect?.(item)}
            size="sm"
            variant="secondary"
          >
            <StatusDot status={item.status} />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}

export type HandoffBannerState = "human needed" | "human active" | "resumed";
export type HandoffBannerLayout = "banner" | "compact";

export interface HandoffBannerProps extends Omit<CrmSurfaceProps, "state"> {
  state?: HandoffBannerState;
  layout?: HandoffBannerLayout;
  ownerName?: React.ReactNode;
  ownerAvatarSrc?: string;
  transferredLabel?: React.ReactNode;
  transferredAt?: React.ReactNode;
  statusLabel?: React.ReactNode;
}

export function HandoffBanner({
  title,
  description = "Agente pausado · aguardando revisão humana",
  state = "human active",
  layout = "banner",
  ownerName = "Sam Frank",
  ownerAvatarSrc,
  transferredLabel = "Transferido em:",
  transferredAt = "Hoje, 09:32",
  statusLabel = "Em atendimento humano",
  action,
  className,
  ...props
}: HandoffBannerProps) {
  const iconName: IconName = state === "resumed" ? "checkCircle" : "info";
  const stateClass = String(state).replace(/\s+/g, "-");

  if (layout === "compact") {
    const compactTitle = title ?? "Transferência para agente humano";
    const compactDescription = description === "Agente pausado · aguardando revisão humana"
      ? "Conversa transferida para atendimento humano."
      : description;

    return (
      <Card
        aria-label={String(compactTitle)}
        className={cn("tcrm-handoff-banner", "tcrm-handoff-banner--compact", `tcrm-handoff-banner--${stateClass}`, className)}
        data-component="HandoffBanner"
        data-layout="compact"
        data-state={state}
        role="status"
        {...props}
      >
        <header className="tcrm-handoff-banner__compact-header">
          <Icon name="messageMore" size="var(--taliya-control-crm-handoff-banner-compact-icon-size)" />
          <h2>{compactTitle}</h2>
        </header>
        <p className="tcrm-handoff-banner__compact-description">{compactDescription}</p>
        <div className="tcrm-handoff-banner__compact-owner">
          <Avatar name={String(ownerName)} size="sm" src={ownerAvatarSrc} />
          <strong>{ownerName}</strong>
        </div>
        <dl className="tcrm-handoff-banner__compact-fact">
          <dt>{transferredLabel}</dt>
          <dd>{transferredAt}</dd>
        </dl>
        <Chip className="tcrm-handoff-banner__compact-status" showDot={false} tone="info">{statusLabel}</Chip>
      </Card>
    );
  }

  return (
    <div className={cn("tcrm-handoff-banner", `tcrm-handoff-banner--${stateClass}`, className)} data-component="HandoffBanner" data-layout="banner" data-state={state} role="status" {...props}>
      <Icon name={iconName} size={14} />
      <span className="tcrm-handoff-banner__content">
        {title ? <strong>{title}</strong> : null}
        <span>{description}</span>
      </span>
      {action ? <span className="tcrm-handoff-banner__action">{action}</span> : null}
    </div>
  );
}

export interface QuickReplyChipItem {
  id: string;
  label: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  icon?: IconName;
  kind?: "question" | "suggested" | "action";
  loading?: boolean;
  selected?: boolean;
}

export interface QuickReplyChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: Array<QuickReplyChipItem | string>;
  onSelect?: (itemId: string, item: QuickReplyChipItem) => void;
}

export function QuickReplyChips({
  items = [
    { id: "obrigatorio", label: "O que é obrigatório?" },
    { id: "depois", label: "Posso deixar para depois?" },
    { id: "agenda", label: "Como isso afeta a agenda?" }
  ],
  onSelect,
  className,
  ...props
}: QuickReplyChipsProps) {
  return (
    <div aria-label="Respostas rápidas" className={cn("tcrm-quick-reply-chips", className)} role="group" {...props}>
      {items.map((item) => {
        const normalized: QuickReplyChipItem = typeof item === "string" ? { id: item, label: item } : item;
        const iconName = normalized.icon ?? (normalized.kind === "action" ? "sparkles" : "help");

        return (
          <Button
            aria-label={normalized.ariaLabel ?? normalized.label}
            aria-pressed={normalized.selected || undefined}
            className={cn(
              "tcrm-quick-reply-chip",
              `tcrm-quick-reply-chip--${normalized.kind ?? "question"}`,
              normalized.selected && "tcrm-quick-reply-chip--selected",
              normalized.className
            )}
            disabled={normalized.disabled}
            key={normalized.id}
            loading={normalized.loading}
            onClick={() => onSelect?.(normalized.id, normalized)}
            size="sm"
            variant="secondary"
          >
            <span className="tcrm-quick-reply-chip__icon" aria-hidden="true">
              <Icon name={iconName} size="var(--taliya-control-crm-quick-reply-icon-inner-size)" />
            </span>
            <span className="tcrm-quick-reply-chip__label">{normalized.label}</span>
          </Button>
        );
      })}
    </div>
  );
}

export type ChecklistRowState = "complete" | "incomplete" | "warning" | "blocked" | "sensitive";

export interface ChecklistRowProps extends Omit<CrmSurfaceProps, "state" | "onChange" | "onToggle"> {
  id?: string;
  index?: number;
  state?: ChecklistRowState;
  disabled?: boolean;
  onToggle?: (checked: boolean, item: { id: string; index: number; state: ChecklistRowState; title: React.ReactNode }) => void;
}

const checklistRowPrimitiveState: Record<ChecklistRowState, "complete" | "incomplete" | "warning" | "blocked"> = {
  complete: "complete",
  incomplete: "incomplete",
  warning: "warning",
  blocked: "blocked",
  sensitive: "warning"
};

export function ChecklistRow({
  id,
  index = 1,
  title = "Verificar horários disponíveis",
  state = "incomplete",
  disabled = false,
  className,
  onToggle,
  ...props
}: ChecklistRowProps) {
  const itemId = id ?? `checklist-row-${index}`;
  const isDisabled = disabled || state === "blocked";
  const primitiveState = checklistRowPrimitiveState[state];

  return (
    <ChecklistItem
      aria-label={`${index}. ${typeof title === "string" ? title : "Item de checklist"}`}
      className={cn("tcrm-checklist-row", `tcrm-checklist-row--${state}`, className)}
      data-index={index}
      disabled={isDisabled}
      menu={false}
      onToggle={onToggle ? (checked) => onToggle(checked, { id: itemId, index, state, title }) : undefined}
      state={primitiveState}
      title={<><span className="tcrm-checklist-row__index">{index}.</span><span className="tcrm-checklist-row__title">{title}</span></>}
      {...props}
    />
  );
}

export type CommentThreadState = "source" | "empty" | "internal" | "customer-visible" | "failed" | "loading" | "blocked";

export interface CommentThreadComment {
  id: string;
  author: string;
  body: React.ReactNode;
  time: string;
  avatarSrc?: string;
  visibility?: "internal" | "customer-visible";
  state?: "default" | "failed";
}

export interface CommentThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  viewAllLabel?: string;
  comments?: CommentThreadComment[];
  state?: CommentThreadState;
  onViewAll?: () => void;
  onCommentSelect?: (comment: CommentThreadComment) => void;
  onRetry?: (comment: CommentThreadComment) => void;
}

const defaultCommentThreadComments: CommentThreadComment[] = [
  {
    id: "ana-silva",
    author: "Ana Silva",
    body: "Pedi reposição quinta 08h.",
    time: "Hoje, 09:08",
    visibility: "customer-visible"
  },
  {
    id: "sam-frank",
    author: "Sam Frank",
    body: "Recepção não encontrou vaga ainda.",
    time: "Hoje, 09:14",
    visibility: "internal"
  },
  {
    id: "joao-silva",
    author: "João Silva",
    body: "Copiloto sugeriu opção quinta 08h.",
    time: "Hoje, 09:20",
    visibility: "internal"
  }
];

export function CommentThread({
  title = "Comentários",
  viewAllLabel = "Ver todos",
  comments = defaultCommentThreadComments,
  state = "source",
  className,
  onViewAll,
  onCommentSelect,
  onRetry,
  ...props
}: CommentThreadProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isEmpty = state === "empty" || comments.length === 0;
  const resolvedComments =
    state === "failed" ? comments.map((comment, index) => (index === 0 ? { ...comment, state: "failed" as const } : comment)) : comments;

  return (
    <Card
      aria-busy={isLoading || undefined}
      aria-label={typeof title === "string" ? title : "Comentários"}
      className={cn("tcrm-comment-thread", `tcrm-comment-thread--${state}`, className)}
      data-component="CommentThread"
      data-state={state}
      role="region"
      {...props}
    >
      <header className="tcrm-comment-thread__header">
        <h3>{title}</h3>
        <Button
          className="tcrm-comment-thread__view-all"
          disabled={isLoading || isBlocked}
          onClick={onViewAll}
          size="sm"
          type="button"
          variant="ghost"
        >
          {viewAllLabel}
        </Button>
      </header>
      {isLoading ? (
        <div className="tcrm-comment-thread__state" role="status" aria-label="Carregando comentários">
          <span />
          <span />
          <span />
        </div>
      ) : isEmpty ? (
        <div className="tcrm-comment-thread__state tcrm-comment-thread__state--empty">Nenhum comentário ainda.</div>
      ) : isBlocked ? (
        <div className="tcrm-comment-thread__state tcrm-comment-thread__state--blocked" role="alert">
          Comentários bloqueados para revisão.
        </div>
      ) : (
        <ul className="tcrm-comment-thread__list" role="list">
          {resolvedComments.map((comment) => {
            const rowFailed = comment.state === "failed";
            return (
              <li className={cn("tcrm-comment-thread__item", rowFailed && "tcrm-comment-thread__item--failed")} key={comment.id}>
                <button
                  aria-label={`${comment.author}: ${typeof comment.body === "string" ? comment.body : "comentário"} - ${comment.time}`}
                  className="tcrm-comment-thread__row"
                  disabled={!onCommentSelect && !rowFailed}
                  onClick={() => {
                    if (rowFailed) {
                      onRetry?.(comment);
                      return;
                    }
                    onCommentSelect?.(comment);
                  }}
                  type="button"
                >
                  <Avatar className="tcrm-comment-thread__avatar" name={comment.author} size="xs" src={comment.avatarSrc} />
                  <span className="tcrm-comment-thread__content">
                    <strong>{comment.author}</strong>
                    <span>{comment.body}</span>
                  </span>
                  <time className="tcrm-comment-thread__time">{rowFailed ? "Falha" : comment.time}</time>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function LifecycleDrawer({
  component,
  title,
  state = "open",
  children,
  open = true
}: CrmSurfaceProps & { component: CrmComponentName; open?: boolean }) {
  return (
    <Drawer
      footer={
        <ButtonGroup align="end">
          <Button variant="secondary">Registrar nota</Button>
          <Button variant={state === "sensitive" ? "destructive" : "primary"}>Concluir</Button>
        </ButtonGroup>
      }
      open={open}
      title={title ?? componentLabel(component)}
    >
      <DrawerSection title="Resumo">
        <CrmSurface component={component} family="Operational" state={state}>
          {children ?? "Detalhe operacional padronizado."}
        </CrmSurface>
      </DrawerSection>
      <DrawerSection title="Histórico">
        <ActivityFeed compact />
      </DrawerSection>
    </Drawer>
  );
}

void LifecycleDrawer;

export type TaskDrawerState = "open" | "blocked" | "completed" | "sensitive" | "loading";
export type TaskDrawerActivityOrder = "history-comments" | "comments-history";
export type TaskDrawerActivityDensity = "compact" | "comfortable";

export interface TaskDrawerFact {
  id: string;
  icon: IconName;
  label: string;
  value: React.ReactNode;
  tone?: "default" | "danger";
  showToneIcon?: boolean;
}

export interface TaskDrawerChecklistItem {
  id: string;
  title: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface TaskDrawerComment {
  id: string;
  author: string;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
}

export interface TaskDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  body: React.ReactNode;
}

export interface TaskDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  open?: boolean;
  state?: TaskDrawerState;
  title?: React.ReactNode;
  label?: string;
  statusLabel?: string;
  facts?: TaskDrawerFact[];
  checklist?: TaskDrawerChecklistItem[];
  checklistTitle?: React.ReactNode;
  checklistProgress?: React.ReactNode;
  showChecklistProgress?: boolean;
  comments?: TaskDrawerComment[];
  commentsTitle?: React.ReactNode;
  showCommentsLink?: boolean;
  history?: TaskDrawerHistoryItem[];
  historyTitle?: React.ReactNode;
  activityOrder?: TaskDrawerActivityOrder;
  activityDensity?: TaskDrawerActivityDensity;
  copilotSuggestion?: React.ReactNode | null;
  footerLayout?: "default" | "conversation";
  onClose?: () => void;
  onOpenConversation?: () => void;
  onAssume?: () => void;
  onComplete?: () => void;
  onDelegate?: () => void;
  onReschedule?: () => void;
  onComment?: () => void;
  onMore?: () => void;
  onOpenOrigin?: () => void;
  onChecklistToggle?: (item: TaskDrawerChecklistItem, checked: boolean) => void;
}

const sourceTaskDrawerFacts: TaskDrawerFact[] = [
  { id: "origin", icon: "calendar", label: "Origem canônica", value: "Agenda / Reposições" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje", tone: "danger" },
  { id: "priority", icon: "clock", label: "Prioridade", value: <><span className="tcrm-task-drawer__priority-dot" aria-hidden="true" />Média</> },
  { id: "reason", icon: "clock", label: "Motivo", value: "Ana pediu reposição e precisa confirmar horário" }
];

const sourceTaskDrawerChecklist: TaskDrawerChecklistItem[] = [
  { id: "verify-times", title: "Verificar horários disponíveis" },
  { id: "confirm-ana", title: "Confirmar com Ana" },
  { id: "update-calendar", title: "Atualizar reposição na agenda" }
];

const sourceTaskDrawerComments: TaskDrawerComment[] = [
  { id: "ana", author: "Ana Silva", body: "Pedi reposição quinta 08h.", time: "Hoje, 09:08" },
  { id: "sam", author: "Sam Frank", body: "Recepção não encontrou vaga ainda.", time: "Hoje, 09:14" },
  { id: "joao", author: "João Silva", body: "Copiloto sugeriu opção quinta 08h.", time: "Hoje, 09:20" }
];

const sourceTaskDrawerHistory: TaskDrawerHistoryItem[] = [
  { id: "whatsapp", time: "09:10", body: "Ana pediu reposição pelo WhatsApp" },
  { id: "no-slot", time: "09:14", body: "sistema não encontrou vaga na turma atual" },
  { id: "assumed", time: "09:20", body: "recepção assumiu a pendência" }
];

export type CrmDrawerHeaderOrder = "meta-title" | "label-title-status";
export type CrmDrawerFooterLayout = "default" | "conversation";

export interface CrmDrawerFact {
  id: string;
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger" | "warning" | "success" | "info";
  showToneIcon?: boolean;
}

export interface CrmDrawerSection {
  id: string;
  content: React.ReactNode;
  title?: React.ReactNode;
  trailing?: React.ReactNode;
  ariaLabel?: string;
  variant?: "plain" | "card" | "callout";
}

export interface CrmDrawerAction {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: IconName;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export interface CrmDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  actions?: CrmDrawerAction[];
  body?: React.ReactNode;
  children?: React.ReactNode;
  closeLabel?: string;
  component?: string;
  eyebrow?: React.ReactNode;
  facts?: CrmDrawerFact[];
  footer?: React.ReactNode;
  footerLayout?: CrmDrawerFooterLayout;
  header?: React.ReactNode;
  headerClassName?: string;
  headerOrder?: CrmDrawerHeaderOrder;
  loading?: boolean;
  onClose?: () => void;
  sections?: CrmDrawerSection[];
  state?: string;
  status?: React.ReactNode;
  title: React.ReactNode;
}

function renderCrmDrawerAction(action: CrmDrawerAction) {
  return (
    <Button
      className={cn("tcrm-drawer-frame__action", action.fullWidth && "tcrm-drawer-frame__action--full")}
      disabled={action.disabled}
      key={action.id}
      leadingIcon={action.icon}
      onClick={action.onClick}
      size="sm"
      type="button"
      variant={action.variant ?? "secondary"}
    >
      {action.label}
    </Button>
  );
}

export function CrmDrawer({
  actions,
  body,
  children,
  className,
  closeLabel = "Fechar painel",
  component = "CrmDrawer",
  eyebrow,
  facts,
  footer,
  footerLayout = "default",
  header,
  headerClassName,
  headerOrder = "meta-title",
  loading,
  onClose,
  sections,
  state = "open",
  status,
  title,
  ...props
}: CrmDrawerProps) {
  const drawerBody = body ?? children;
  const hasStructuredBody = Boolean(facts?.length || sections?.length || drawerBody);
  const drawerFooter = footer ?? (actions?.length ? actions.map(renderCrmDrawerAction) : null);

  return (
    <aside
      aria-busy={loading || undefined}
      className={cn(
        "tcrm-drawer tcrm-drawer-frame",
        footerLayout === "conversation" && "tcrm-drawer-frame--footer-conversation",
        className
      )}
      data-component={component}
      data-state={state}
      role="complementary"
      {...props}
    >
      {header ?? (
        <header className={cn(
          "tcrm-drawer-frame__header",
          headerOrder === "label-title-status" && "tcrm-drawer-frame__header--label-title-status",
          headerOrder === "label-title-status" && !eyebrow && "tcrm-drawer-frame__header--without-label",
          headerClassName
        )}>
          <IconButton className="tcrm-drawer-frame__close" disabled={loading} icon="x" label={closeLabel} onClick={onClose} size="sm" type="button" variant="default" />
          {headerOrder === "label-title-status" ? (
            <>
              {eyebrow ? <div className="tcrm-drawer-frame__meta tcrm-drawer-frame__meta--label"><Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrow}</Chip></div> : null}
              <h2>{title}</h2>
              {status ? <div className="tcrm-drawer-frame__meta tcrm-drawer-frame__meta--status"><Chip className="tcrm-drawer-frame__status" showDot={false}>{status}</Chip></div> : null}
            </>
          ) : (
            <>
              <div className="tcrm-drawer-frame__meta">
                {eyebrow ? <Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrow}</Chip> : null}
                {status ? <Chip className="tcrm-drawer-frame__status" showDot={false}>{status}</Chip> : null}
              </div>
              <h2>{title}</h2>
            </>
          )}
        </header>
      )}
      <div className="tcrm-drawer-frame__body">
        {hasStructuredBody ? (
          <>
            {facts?.length ? (
              <>
                <dl className="tcrm-drawer-frame__facts">
                  {facts.map((fact) => (
                    <div className={cn("tcrm-drawer-frame__fact", fact.tone && fact.tone !== "default" && `tcrm-drawer-frame__fact--${fact.tone}`)} key={fact.id}>
                      {fact.icon ? <Icon name={fact.icon} size="sm" /> : <span aria-hidden="true" />}
                      <dt>{fact.label}</dt>
                      <dd>{fact.tone === "danger" && fact.showToneIcon !== false ? <Icon name="alert" size={13} /> : null}{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                {(sections?.length || drawerBody) ? <hr className="tcrm-drawer-frame__divider" /> : null}
              </>
            ) : null}
            {drawerBody}
            {sections?.map((section, index) => (
              <React.Fragment key={section.id}>
                {(index > 0 || drawerBody) ? <hr className="tcrm-drawer-frame__divider" /> : null}
                <section
                  aria-label={section.ariaLabel}
                  className={cn("tcrm-drawer-frame__section", section.variant && `tcrm-drawer-frame__section--${section.variant}`)}
                >
                  {section.title || section.trailing ? (
                    <header className="tcrm-drawer-frame__section-header">
                      {section.title ? <h3>{section.title}</h3> : <span />}
                      {section.trailing}
                    </header>
                  ) : null}
                  {section.content}
                </section>
              </React.Fragment>
            ))}
          </>
        ) : null}
      </div>
      {drawerFooter ? <footer className="tcrm-drawer-frame__footer">{drawerFooter}</footer> : null}
    </aside>
  );
}

export function TaskDrawer({
  open = true,
  state = "open",
  title = "Confirmar reposição da Ana",
  label,
  statusLabel = "Aberta",
  facts = sourceTaskDrawerFacts,
  checklist = sourceTaskDrawerChecklist,
  checklistTitle = "Checklist / subtarefas",
  checklistProgress = "0 / 3",
  showChecklistProgress = true,
  comments = sourceTaskDrawerComments,
  commentsTitle = "Comentários",
  showCommentsLink = true,
  history = sourceTaskDrawerHistory,
  historyTitle = "Histórico",
  activityOrder = "history-comments",
  activityDensity = "compact",
  copilotSuggestion = <>quinta 08h tem vaga e respeita<br />o prazo do crédito.</>,
  footerLayout = "default",
  onClose,
  onOpenConversation,
  onAssume,
  onComplete,
  onDelegate,
  onReschedule,
  onComment,
  onMore,
  onOpenOrigin,
  onChecklistToggle,
  className,
  ...props
}: TaskDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const controlsDisabled = isLoading || isBlocked;
  const historySection = history.length > 0 ? (
    <section className="tcrm-task-drawer__history" aria-label="Histórico">
      <h3>{historyTitle}</h3>
      <ol>
        {history.map((item) => (
          <li key={item.id}>
            <time>{item.time}</time>
            <span>{item.body}</span>
          </li>
        ))}
      </ol>
    </section>
  ) : null;
  const commentsSection = (
    <section className="tcrm-task-drawer__comments" aria-label="Comentários">
      <header className="tcrm-task-drawer__section-header">
        <h3>{commentsTitle}</h3>
        {showCommentsLink ? <Button className="tcrm-task-drawer__section-link" disabled={controlsDisabled} onClick={onComment} size="sm" variant="ghost">Ver todos</Button> : null}
      </header>
      <ul>
        {comments.map((comment) => (
          <li className="tcrm-task-drawer__comment" key={comment.id}>
            <Avatar name={comment.author} size="sm" src={comment.avatarSrc} />
            <span>
              <strong>{comment.author}</strong>
              <p>{comment.body}</p>
            </span>
            <time>{comment.time}</time>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <CrmDrawer
      aria-label="Detalhes da tarefa"
      body={
        <>
        <section className="tcrm-task-drawer__checklist" aria-label="Checklist">
          <header className="tcrm-task-drawer__section-header">
            <h3>{checklistTitle}</h3>
            {showChecklistProgress ? <Badge className="tcrm-task-drawer__count">{checklistProgress}</Badge> : null}
          </header>
          <ul>
            {checklist.map((item, index) => (
              <li key={item.id}>
                <button
                  aria-pressed={Boolean(item.checked)}
                  className={cn("tcrm-task-drawer__check-row", item.checked && "is-checked")}
                  disabled={controlsDisabled || item.disabled}
                  onClick={() => onChecklistToggle?.(item, !item.checked)}
                  type="button"
                >
                  <span aria-hidden="true" className="tcrm-task-drawer__check-indicator" />
                  <span className="tcrm-task-drawer__check-label"><b>{index + 1}.</b>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <hr className="tcrm-drawer-frame__divider" />

        {activityOrder === "comments-history" ? (
          <>
          {commentsSection}
          {historySection}
          </>
        ) : (
          <>
          {historySection}
          {commentsSection}
          </>
        )}

        {copilotSuggestion ? (
          <section className="tcrm-task-drawer__copilot" aria-label="Sugestão do Copiloto">
            <Icon name="sparkles" />
            <p><strong>Copiloto:</strong> {copilotSuggestion}</p>
          </section>
        ) : null}
        </>
      }
      className={cn(
        "tcrm-task-drawer",
        `tcrm-task-drawer--${state}`,
        activityDensity === "comfortable" && "tcrm-task-drawer--activity-comfortable",
        `tcrm-task-drawer--footer-${footerLayout}`,
        className
      )}
      closeLabel="Fechar tarefa"
      component="TaskDrawer"
      facts={facts.map((fact) => ({
        id: fact.id,
        icon: fact.icon,
        label: fact.label,
        tone: fact.tone,
        showToneIcon: fact.showToneIcon,
        value: fact.value
      }))}
      footer={
        footerLayout === "conversation" ? (
          <>
          <div className="tcrm-drawer-frame__action-row">
            <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--conversation-primary" disabled={controlsDisabled} leadingIcon="play" onClick={onOpenConversation ?? onAssume} size="sm" variant="primary">
              Abrir conversa
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled || state === "completed"} leadingIcon="check" onClick={onComplete} size="sm" variant="secondary">
              Concluir
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} leadingIcon="calendar" onClick={onReschedule} size="sm" variant="secondary">
              Reagendar
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} leadingIcon="users" onClick={onDelegate} size="sm" variant="secondary">
              Delegar
            </Button>
          </div>
          <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--origin-secondary tcrm-drawer-frame__action--full" disabled={controlsDisabled} leadingIcon="externalLink" onClick={onOpenOrigin} size="sm" variant="secondary">
            Abrir origem
          </Button>
          </>
        ) : (
          <>
          <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--origin-primary tcrm-drawer-frame__action--full" disabled={controlsDisabled} onClick={onOpenOrigin} size="sm" variant="primary">
            Abrir origem
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onAssume ?? onOpenConversation} size="sm" variant="secondary">
            Assumir
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled || state === "completed"} onClick={onComplete} size="sm" variant="secondary">
            Concluir
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onDelegate} size="sm" variant="secondary">
            Delegar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onReschedule} size="sm" variant="secondary">
            Reagendar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onComment} size="sm" variant="secondary">
            Comentar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onMore} size="sm" variant="secondary">
            ...
          </Button>
          </>
        )
      }
      footerLayout={footerLayout}
      eyebrow={label}
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={onClose}
      state={state}
      status={state === "completed" ? "Concluída" : statusLabel}
      title={title}
      {...props}
    />
  );
}

export type ChecklistDrawerState = "open" | "blocked" | "completed" | "loading";
export type ChecklistDrawerStepState = "done" | "pending" | "warning";

export interface ChecklistDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger" | "info";
  avatarSrc?: string;
}

export interface ChecklistDrawerStep {
  id: string;
  title: React.ReactNode;
  state?: ChecklistDrawerStepState;
  helperText?: React.ReactNode;
  disabled?: boolean;
}

export interface ChecklistDrawerComment {
  id: string;
  author: React.ReactNode;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
}

export interface ChecklistDrawerActivity {
  id: string;
  icon?: IconName;
  time: React.ReactNode;
  body: React.ReactNode;
}

export interface ChecklistDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  open?: boolean;
  state?: ChecklistDrawerState;
  title?: React.ReactNode;
  label?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: ChecklistDrawerFact[];
  steps?: ChecklistDrawerStep[];
  completedSteps?: number;
  totalSteps?: number;
  activity?: ChecklistDrawerActivity;
  comment?: ChecklistDrawerComment;
  primaryActionLabel?: React.ReactNode;
  onClose?: () => void;
  onStepToggle?: (step: ChecklistDrawerStep, checked: boolean) => void;
  onPrimaryAction?: () => void;
  onAssign?: () => void;
  onOpenTask?: () => void;
  onComplete?: () => void;
  onOpenOrigin?: () => void;
}

const sourceChecklistDrawerSteps: ChecklistDrawerStep[] = [
  { id: "open-reception", title: "Abrir recepção", state: "done" },
  { id: "check-agenda", title: "Conferir agenda do dia", state: "done" },
  { id: "prepare-rooms", title: "Preparar salas", state: "done" },
  { id: "validate-teachers", title: "Validar professores confirmados", state: "warning", helperText: "1 professor ainda não confirmou" },
  { id: "payments", title: "Revisar pagamentos críticos", state: "pending" }
];

const sourceChecklistDrawerFacts: ChecklistDrawerFact[] = [
  { id: "status", icon: "calendar", label: "Status", value: <><span className="tcrm-checklist-drawer__status-dot" aria-hidden="true" />Em andamento</>, tone: "info" },
  { id: "owner", icon: "user", label: "Responsável", value: "Mariana" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje 08:00", tone: "danger" },
  { id: "progress", icon: "clock", label: "Progresso", value: "3/5" }
];

const sourceChecklistDrawerActivity: ChecklistDrawerActivity = {
  id: "latest",
  icon: "clock",
  time: "07:42",
  body: <>Mariana marcou "Preparar salas" como concluído</>
};

const sourceChecklistDrawerComment: ChecklistDrawerComment = {
  id: "mariana",
  author: "Mariana",
  body: "Recepção aberta. Sala 2 ainda aguardando confirmação do professor.",
  time: "07:45",
  avatarSrc: undefined
};

function checklistStepIconForState(state: ChecklistDrawerStepState) {
  if (state === "done") return <Icon name="check" size={10} />;
  if (state === "warning") return <Icon name="alert" size={10} />;
  return null;
}

export function ChecklistDrawer({
  open = true,
  state = "open",
  title = "Abertura do estúdio",
  label = "Checklist",
  statusLabel,
  facts = sourceChecklistDrawerFacts,
  steps = sourceChecklistDrawerSteps,
  completedSteps,
  totalSteps,
  activity = sourceChecklistDrawerActivity,
  comment = sourceChecklistDrawerComment,
  primaryActionLabel = "Continuar",
  onClose,
  onStepToggle,
  onPrimaryAction,
  onAssign,
  onOpenTask,
  onComplete,
  onOpenOrigin,
  className,
  ...props
}: ChecklistDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const controlsDisabled = isLoading || isBlocked || state === "completed";
  const completed = completedSteps ?? steps.filter((step) => step.state === "done").length;
  const total = totalSteps ?? steps.length;
  const progressValue = Math.round((completed / Math.max(total, 1)) * 100);

  return (
    <CrmDrawer
      aria-label="Detalhes do checklist"
      body={
        <>
          <dl className="tcrm-checklist-drawer__facts">
            {facts.map((fact) => (
              <div className={cn("tcrm-checklist-drawer__fact", fact.tone && `tcrm-checklist-drawer__fact--${fact.tone}`)} key={fact.id}>
                <Icon name={fact.icon} size="sm" />
                <dt>{fact.label}</dt>
                <dd>
                  {fact.tone === "danger" ? <Icon name="alert" size={13} /> : null}
                  {fact.avatarSrc ? <Avatar name={String(fact.value)} size="xs" src={fact.avatarSrc} /> : null}
                  {fact.value}
                  {fact.id === "progress" ? <ProgressBar className="tcrm-checklist-drawer__progress" label="Progresso do checklist" value={progressValue} /> : null}
                </dd>
              </div>
            ))}
          </dl>

          <section className="tcrm-checklist-drawer__steps" aria-label="Passos">
            <header className="tcrm-checklist-drawer__section-header">
              <h3>Passos</h3>
              <Badge className="tcrm-checklist-drawer__count">{completed} / {total}</Badge>
            </header>
            <ul>
              {steps.map((step, index) => {
                const stepState = step.state ?? "pending";
                const checked = stepState === "done";
                return (
                  <li className={cn("tcrm-checklist-drawer__step", `is-${stepState}`)} key={step.id}>
                    <Button
                      aria-pressed={checked}
                      className="tcrm-checklist-drawer__step-button"
                      disabled={controlsDisabled || step.disabled}
                      onClick={() => onStepToggle?.(step, !checked)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      <span aria-hidden="true" className="tcrm-checklist-drawer__step-indicator">
                        {checklistStepIconForState(stepState)}
                      </span>
                      <span className="tcrm-checklist-drawer__step-copy">
                        <span><b>{index + 1}.</b>{step.title}</span>
                        {step.helperText ? <small>{step.helperText}</small> : null}
                      </span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="tcrm-checklist-drawer__activity" aria-label="Última atividade">
            <h3>Última atividade</h3>
            <p>
              {activity.icon ? <Icon name={activity.icon} size="sm" /> : null}
              <time>{activity.time}</time>
              <span>{activity.body}</span>
            </p>
          </section>

          {comment ? (
            <section className="tcrm-checklist-drawer__comment" aria-label="Comentário recente">
              <h3>Comentário recente</h3>
              <div>
                <Avatar name={String(comment.author)} size="sm" src={comment.avatarSrc} />
                <span>
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                </span>
                <time>{comment.time}</time>
              </div>
            </section>
          ) : null}
        </>
      }
      className={cn("tcrm-task-drawer tcrm-checklist-drawer", `tcrm-checklist-drawer--${state}`, className)}
      closeLabel="Fechar checklist"
      component="ChecklistDrawer"
      footer={
        <>
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--primary" disabled={controlsDisabled} onClick={onPrimaryAction} size="sm" variant="primary">
            {primaryActionLabel}
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onAssign} size="sm" variant="secondary">
            Atribuir
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onOpenTask} size="sm" variant="secondary">
            Abrir tarefa
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onComplete} size="sm" variant="secondary">
            Concluir
          </Button>
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--origin" disabled={isLoading} onClick={onOpenOrigin} size="sm" variant="secondary">
            Abrir origem
          </Button>
        </>
      }
      eyebrow={label}
      loading={isLoading}
      onClose={onClose}
      state={state}
      status={state === "completed" ? "Concluído" : statusLabel}
      title={title}
      {...props}
    />
  );
}

export type CaseDrawerState =
  | "open"
  | "waiting"
  | "blocked"
  | "resolved"
  | "loading"
  | "risk-low"
  | "risk-medium"
  | "risk-high"
  | "followed"
  | "cancellation-open"
  | "cancellation-saving"
  | "cancellation-paused"
  | "cancellation-cancelled"
  | "cancellation-recovered"
  | "reactivation-eligible"
  | "reactivation-returning"
  | "reactivation-do-not-contact"
  | "reactivated"
  | "complaint-severe"
  | "complaint-waiting"
  | "complaint-paused"
  | "complaint-resolved";
export type CaseDrawerAction =
  | "open-origin"
  | "assume"
  | "delegate"
  | "create-task"
  | "create-case"
  | "request-approval"
  | "correct"
  | "resolve"
  | "move-status"
  | "close"
  | "message"
  | "save"
  | "pause"
  | "pause-automation"
  | "cancel"
  | "start-return"
  | "reserve"
  | "do-not-contact"
  | "classify"
  | "escalate"
  | "open-profile"
  | "open-conversation";

export interface CaseDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger";
}

export interface CaseDrawerAlternative {
  id: string;
  title: React.ReactNode;
  capacity: React.ReactNode;
  status: React.ReactNode;
  tone?: "warning" | "success";
}

export interface CaseDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  label: React.ReactNode;
  tone?: ComponentTone;
}

export interface CaseDrawerRestrictionItem {
  id: string;
  label: React.ReactNode;
}

export interface CaseDrawerFooterAction {
  id: CaseDrawerAction;
  label: React.ReactNode;
  variant?: "primary" | "secondary";
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  disabled?: boolean;
  fullWidth?: boolean;
}

export type CaseDrawerSectionKind = "text" | "list" | "facts" | "alert" | "steps" | "checklist" | "copilot" | "actions" | "history";

export interface CaseDrawerSectionItem {
  id: string;
  label: React.ReactNode;
  tone?: ComponentTone;
  meta?: React.ReactNode;
}

export interface CaseDrawerSection {
  id: string;
  title: React.ReactNode;
  kind?: CaseDrawerSectionKind;
  description?: React.ReactNode;
  items?: CaseDrawerSectionItem[];
  icon?: IconName;
  tone?: ComponentTone;
  note?: React.ReactNode;
}

export interface CaseDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: CaseDrawerState;
  title?: React.ReactNode;
  avatarSrc?: string;
  eyebrowLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: CaseDrawerFact[];
  factsLayout?: "list" | "grid";
  alternatives?: CaseDrawerAlternative[];
  alternativesTitle?: React.ReactNode;
  alternativesVariant?: "options" | "steps";
  numberedSections?: boolean;
  suggestion?: React.ReactNode;
  messageQuotaLabel?: React.ReactNode;
  showMessageSuggestion?: boolean;
  restrictions?: CaseDrawerRestrictionItem[];
  restrictionsTitle?: React.ReactNode;
  history?: CaseDrawerHistoryItem[];
  sections?: CaseDrawerSection[];
  footerActions?: CaseDrawerFooterAction[];
  density?: "default" | "compact";
  onAction?: (action: CaseDrawerAction) => void;
  onClose?: () => void;
}

const sourceCaseDrawerFacts: CaseDrawerFact[] = [
  { id: "origin", icon: "calendar", label: "Origem", value: "Agenda / Reposições" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje", tone: "danger" },
  { id: "impact", icon: "shieldCheck", label: "Impacto", value: "Ana está sem reposição confirmada" },
  { id: "reason", icon: "clock", label: "Motivo do bloqueio", value: "Turma atual sem vaga" },
  { id: "operation", icon: "lock", label: <>Motivo de estar<br />em Operação</>, value: <>Precisa acompanhamento<br />até destravar</> },
  { id: "next", icon: "clock", label: "Próxima ação recomendada", value: "Encontrar opção de horário" }
];

const sourceCaseDrawerAlternatives: CaseDrawerAlternative[] = [
  { id: "tuesday", title: "Turma terça 17h", capacity: "1 vaga", status: "depende de confirmação", tone: "warning" },
  { id: "thursday", title: "Turma quinta 08h", capacity: "1 vaga", status: "1 vaga disponível", tone: "success" }
];

const sourceCaseDrawerHistory: CaseDrawerHistoryItem[] = [
  { id: "asked", time: "09:10", label: "Ana pediu reposição pelo WhatsApp" },
  { id: "no-slot", time: "09:14", label: "sistema não encontrou vaga na turma atual" },
  { id: "assumed", time: "09:20", label: "recepção assumiu a pendência" }
];

const sourceCaseDrawerFooterActions: CaseDrawerFooterAction[] = [
  { id: "open-origin", label: "Abrir origem", variant: "primary", fullWidth: true },
  { id: "assume", label: "Assumir" },
  { id: "delegate", label: "Delegar" },
  { id: "create-task", label: "Criar tarefa" },
  { id: "request-approval", label: "Pedir aprovação" },
  { id: "resolve", label: "Marcar resolvido" },
  { id: "move-status", label: "Mover status", trailingIcon: "chevronDown" }
];

function emitCaseDrawerAction(action: CaseDrawerAction, onAction?: (action: CaseDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function CaseDrawer({
  open = true,
  state = "open",
  title = "Reposição da Ana sem encaixe",
  avatarSrc,
  eyebrowLabel,
  statusLabel = "Bloqueio de agenda",
  facts = sourceCaseDrawerFacts,
  factsLayout = "list",
  alternatives = sourceCaseDrawerAlternatives,
  alternativesTitle = "Alternativas possíveis",
  alternativesVariant = "options",
  numberedSections = false,
  suggestion = "Copiloto: há 2 horários candidatos, mas um depende de confirmação do professor.",
  messageQuotaLabel = "cota disponível",
  showMessageSuggestion = true,
  restrictions = [],
  restrictionsTitle = "Restrições",
  history = sourceCaseDrawerHistory,
  sections,
  footerActions = sourceCaseDrawerFooterActions,
  density = "default",
  onAction,
  onClose,
  className,
  ...props
}: CaseDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const resolved = state === "resolved";
  const actionDisabled = (action: CaseDrawerFooterAction) =>
    isLoading
    || action.disabled
    || (isBlocked && !["open-origin", "create-task", "correct"].includes(action.id))
    || (resolved && action.id === "resolve");
  const sectionTitle = (label: React.ReactNode, index: number) => {
    if (!numberedSections) return label;
    return `${index}. ${String(label)}`;
  };
  const renderActionButtons = () => (
    <div className="tcrm-case-drawer__body-actions">
      {footerActions.map((action) => (
        <Button
          className={cn(
            "tcrm-case-drawer__action",
            action.variant === "primary" && "tcrm-case-drawer__action--primary",
            action.fullWidth && "tcrm-case-drawer__action--full"
          )}
          disabled={actionDisabled(action)}
          key={action.id}
          leadingIcon={action.leadingIcon}
          onClick={() => emitCaseDrawerAction(action.id, onAction)}
          size="sm"
          trailingIcon={action.trailingIcon}
          variant={action.variant ?? "secondary"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
  const renderSectionItems = (items: CaseDrawerSectionItem[] | undefined, kind: CaseDrawerSectionKind) => {
    if (kind === "actions") return renderActionButtons();
    if (!items?.length) return null;
    if (kind === "steps") {
      return (
        <ol>
          {items.map((item) => (
            <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
              <span>{item.label}</span>
              {item.meta ? <em>{item.meta}</em> : null}
            </li>
          ))}
        </ol>
      );
    }
    if (kind === "history") {
      return (
        <ul>
          {items.map((item) => (
            <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
              {item.meta ? <em>{item.meta}</em> : null}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul>
        {items.map((item) => (
          <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
            <span>{item.label}</span>
            {item.meta ? <em>{item.meta}</em> : null}
          </li>
        ))}
      </ul>
    );
  };
  const renderCustomSection = (section: CaseDrawerSection, index: number) => {
    const kind = section.kind ?? "list";
    return (
      <section
        aria-label={String(section.title)}
        className={cn("tcrm-case-drawer__section", `tcrm-case-drawer__section--${kind}`, section.tone && `tcrm-case-drawer__section--${section.tone}`)}
        key={section.id}
      >
        <h3>{sectionTitle(section.title, index + 2)}</h3>
        {section.description ? (
          <p>
            {section.icon ? <Icon name={section.icon} size="var(--taliya-space-6)" /> : null}
            <span>{section.description}</span>
          </p>
        ) : null}
        {renderSectionItems(section.items, kind)}
        {section.note ? <small>{section.note}</small> : null}
      </section>
    );
  };

  return (
    <CrmDrawer
      aria-label="Detalhes do caso operacional"
      body={
        <>
        {numberedSections ? <h3 className="tcrm-case-drawer__section-title">{sectionTitle("Resumo", 1)}</h3> : null}
        <dl className={cn("tcrm-case-drawer__facts", factsLayout === "grid" && "tcrm-case-drawer__facts--grid")}>
          {facts.map((fact) => (
            <div className={cn("tcrm-case-drawer__fact", fact.tone === "danger" && "tcrm-case-drawer__fact--danger")} key={fact.id}>
              <Icon name={fact.icon} size="var(--taliya-control-crm-case-drawer-label-line-height)" />
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        {sections?.length ? sections.map(renderCustomSection) : (
        <>
          <section className={cn("tcrm-case-drawer__card tcrm-case-drawer__alternatives", alternativesVariant === "steps" && "tcrm-case-drawer__alternatives--steps")} aria-label={String(alternativesTitle)}>
          <h3>{sectionTitle(alternativesTitle, 2)}</h3>
          {alternativesVariant === "steps" ? (
            <ol>
              {alternatives.map((alternative) => (
                <li key={alternative.id}>{alternative.title}</li>
              ))}
            </ol>
          ) : (
            <ul>
              {alternatives.map((alternative) => (
                <li key={alternative.id}>
                  <strong>{alternative.title}</strong>
                  <span>{alternative.capacity}</span>
                  <em className={cn(alternative.tone && `tcrm-case-drawer__option-status--${alternative.tone}`)}>
                    {alternative.tone ? <span aria-hidden="true" /> : null}
                    {alternative.status}
                  </em>
                </li>
              ))}
            </ul>
          )}
          <div className="tcrm-case-drawer__copilot">
            <Icon name="sparkles" size={31} />
            <p>{suggestion}</p>
          </div>
          </section>

          {restrictions.length > 0 ? (
            <section className="tcrm-case-drawer__restrictions" aria-label={String(restrictionsTitle)}>
              <h3>{sectionTitle(restrictionsTitle, 3)}</h3>
              <ul>
                {restrictions.map((restriction) => (
                  <li key={restriction.id}>{restriction.label}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {showMessageSuggestion ? (
            <section className="tcrm-case-drawer__card tcrm-case-drawer__message" aria-label="Sugestão de mensagem">
              <h3>{sectionTitle("Sugestão de mensagem", 3 + (restrictions.length > 0 ? 1 : 0))} <Chip showDot={false}>{messageQuotaLabel}</Chip><Chip className="tcrm-case-drawer__review-chip" showDot={false}>revisão humana</Chip></h3>
              <p>Mensagens sugeridas pelo sistema com revisão humana.</p>
            </section>
          ) : null}

          <section className="tcrm-case-drawer__history" aria-label="Histórico curto">
            <h3>{sectionTitle("Histórico curto", 3 + (restrictions.length > 0 ? 1 : 0) + (showMessageSuggestion ? 1 : 0))}</h3>
            <ol>
              {history.map((item) => (
                <li className={cn(item.tone && `tcrm-case-drawer__history-item--${item.tone}`)} key={item.id}>
                  <span aria-hidden="true" />
                  <time>{item.time}</time>
                  <p>{item.label}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
        )}
        </>
      }
      className={cn(
        "tcrm-case-drawer",
        `tcrm-case-drawer--${state}`,
        density === "compact" && "tcrm-case-drawer--compact",
        numberedSections && "tcrm-case-drawer--numbered",
        className
      )}
      closeLabel="Fechar caso"
      component="CaseDrawer"
      footer={sections?.some((section) => section.kind === "actions") ? undefined : (
        <>
        {footerActions.map((action) => (
          <Button
            className={cn(
              "tcrm-case-drawer__action",
              action.variant === "primary" && "tcrm-case-drawer__action--primary",
              action.fullWidth && "tcrm-case-drawer__action--full"
            )}
            disabled={actionDisabled(action)}
            key={action.id}
            leadingIcon={action.leadingIcon}
            onClick={() => emitCaseDrawerAction(action.id, onAction)}
            size="sm"
            trailingIcon={action.trailingIcon}
            variant={action.variant ?? "secondary"}
          >
            {action.label}
          </Button>
        ))}
        </>
      )}
      loading={isLoading}
      onClose={() => emitCaseDrawerAction("close", onAction, onClose)}
      state={state}
      status={resolved ? "Resolvido" : statusLabel}
      title={title}
      header={
        avatarSrc ? (
          <header className="tcrm-case-drawer__profile-header">
            <IconButton className="tcrm-drawer-frame__close" disabled={isLoading} icon="x" label="Fechar caso" onClick={() => emitCaseDrawerAction("close", onAction, onClose)} size="sm" type="button" variant="default" />
            <div className="tcrm-case-drawer__profile-meta">
              {eyebrowLabel ? <Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrowLabel}</Chip> : null}
              <Chip className="tcrm-drawer-frame__status" showDot={false}>{resolved ? "Resolvido" : statusLabel}</Chip>
            </div>
            <div className="tcrm-case-drawer__profile-title">
              <img alt="" src={avatarSrc} />
              <h2>{title}</h2>
            </div>
          </header>
        ) : undefined
      }
      {...props}
    />
  );
}

export type StudentDrawerState = "active" | "paused" | "delinquent" | "risk" | "sensitive" | "loading" | "blocked";
export type StudentDrawerAction = "close" | "open-profile" | "message" | "create-task" | "schedule" | "note" | "update-data";
export type StudentDrawerFinanceStatus = "ok" | "pending" | "overdue";

export interface StudentDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface StudentDrawerClassItem {
  id: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badge?: React.ReactNode;
}

export interface StudentDrawerPendingItem {
  id: string;
  label: React.ReactNode;
}

export interface StudentDrawerFinance {
  status: StudentDrawerFinanceStatus;
  statusLabel?: React.ReactNode;
  lastPayment?: React.ReactNode;
  amount?: React.ReactNode;
}

export interface StudentDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: StudentDrawerState;
  name?: React.ReactNode;
  avatarSrc?: string;
  statusLabel?: React.ReactNode;
  facts?: StudentDrawerFact[];
  classes?: StudentDrawerClassItem[];
  pendingItems?: StudentDrawerPendingItem[];
  finance?: StudentDrawerFinance;
  onAction?: (action: StudentDrawerAction) => void;
  onClose?: () => void;
}

const sourceStudentDrawerFacts: StudentDrawerFact[] = [
  { id: "plan", icon: "calendar", label: "Plano atual", value: "Plano Mensal" },
  { id: "class", icon: "users", label: "Turma atual", value: "Reformer Iniciante" },
  { id: "owner", icon: "users", label: "Responsável principal", value: "Camila Martins" },
  { id: "phone", icon: "phone", label: "WhatsApp / Telefone", value: "(11) 98765-4321" },
  { id: "consent", icon: "checkCircle", label: "Consentimento", value: <>WhatsApp permitido /<br />contrato assinado</>, tone: "success" }
];

const sourceStudentDrawerClasses: StudentDrawerClassItem[] = [
  { id: "thu", title: "Qui, 15/05 · 07:00", subtitle: "Reformer Iniciante", badge: "Aula" },
  { id: "fri", title: "Sex, 17/05 · 07:00", subtitle: "Reformer Iniciante", badge: "Aula" }
];

const sourceStudentDrawerPending: StudentDrawerPendingItem[] = [
  { id: "emergency", label: "Atualizar contato de emergência" },
  { id: "extra-class", label: "Confirmar disponibilidade para aula extra" }
];

const sourceStudentDrawerFinance: StudentDrawerFinance = {
  status: "pending",
  statusLabel: "pagamento pendente",
  lastPayment: "05/04/2024",
  amount: "R$ 199.00"
};

function emitStudentDrawerAction(action: StudentDrawerAction, onAction?: (action: StudentDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function StudentDrawer({
  open = true,
  state = "active",
  name = "Ana Paula Martins",
  avatarSrc,
  statusLabel,
  facts = sourceStudentDrawerFacts,
  classes = sourceStudentDrawerClasses,
  pendingItems = sourceStudentDrawerPending,
  finance = sourceStudentDrawerFinance,
  onAction,
  onClose,
  className,
  ...props
}: StudentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const riskMode = state === "risk";
  const statusMode = state === "paused" ? "paused" : state === "delinquent" ? "delinquent" : riskMode ? "risk" : "active";
  const resolvedStatusLabel = statusLabel ?? ({
    active: "Ativa",
    paused: "Pausada",
    delinquent: "Inadimplente",
    risk: "Em risco",
    sensitive: "Atenção",
    loading: "Carregando",
    blocked: "Bloqueada"
  } satisfies Record<StudentDrawerState, React.ReactNode>)[state];
  const financeStatusLabel = finance.statusLabel ?? ({ ok: "em dia", pending: "pagamento pendente", overdue: "em atraso" } satisfies Record<StudentDrawerFinanceStatus, React.ReactNode>)[finance.status];

  const drawerHeader = (
    <header className="tcrm-student-drawer__header">
      <Avatar className="tcrm-student-drawer__avatar" name={String(name)} size="lg" src={avatarSrc} />
      <div>
        <h2>{name}</h2>
        <Chip className={cn("tcrm-student-drawer__status", `tcrm-student-drawer__status--${statusMode}`)} showDot={false}>
          {resolvedStatusLabel}
        </Chip>
      </div>
      <IconButton className="tcrm-student-drawer__close" disabled={isLoading} icon="x" label="Fechar aluno" onClick={() => emitStudentDrawerAction("close", onAction, onClose)} size="sm" variant="default" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-student-drawer__footer">
      <Button className="tcrm-student-drawer__origin" disabled={isBlocked} onClick={() => emitStudentDrawerAction("open-profile", onAction)} size="sm" trailingIcon="externalLink" variant="primary">
        Abrir perfil
      </Button>
      <p>Mais informações, histórico e documentos</p>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="whatsapp" onClick={() => emitStudentDrawerAction("message", onAction)} size="sm" variant="secondary">Enviar mensagem</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="calendar" onClick={() => emitStudentDrawerAction("schedule", onAction)} size="sm" variant="secondary">Agendar</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="clipboard" onClick={() => emitStudentDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="clipboard" onClick={() => emitStudentDrawerAction("note", onAction)} size="sm" variant="secondary">Registrar nota</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="edit" onClick={() => emitStudentDrawerAction("update-data", onAction)} size="sm" variant="secondary">Atualizar dados</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Resumo do aluno"
      className={cn("tcrm-student-drawer", `tcrm-student-drawer--${state}`, className)}
      component="StudentDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={name}
      {...props}
    >
      <dl className="tcrm-student-drawer__facts">
        {facts.map((fact) => (
          <div className={cn("tcrm-student-drawer__fact", fact.tone && `tcrm-student-drawer__fact--${fact.tone}`)} key={fact.id}>
            <Icon name={fact.icon} size="14px" />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__classes" aria-label="Próximas duas aulas">
        <h3>Próximas 2 aulas</h3>
        <ul>
          {classes.map((item) => (
            <li key={item.id}>
              <span className="tcrm-student-drawer__class-icon"><Icon name="calendar" size="14px" /></span>
              <p><strong>{item.title}</strong><small>{item.subtitle}</small></p>
              {item.badge ? <Chip className="tcrm-student-drawer__class-badge" showDot={false}>{item.badge}</Chip> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__finance" aria-label="Financeiro">
        <h3>Financeiro</h3>
        <dl>
          <div><dt>Status</dt><dd><Chip className={cn("tcrm-student-drawer__payment-chip", `is-${finance.status}`)} showDot={false}>{financeStatusLabel}</Chip></dd></div>
          <div><dt>Último pagamento</dt><dd>{finance.lastPayment ?? "—"} {finance.amount ? <span>{finance.amount}</span> : null}</dd></div>
        </dl>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__presence" aria-label="Presença recente">
        <h3>Presença recente</h3>
        <div>
          <span className="tcrm-student-drawer__presence-ring" role="img" aria-label="80% de presença" />
          <p><strong>{riskMode ? "4 de 10 aulas" : "8 de 10 aulas"}</strong><small>{riskMode ? "40% de presença" : "80% de presença"}</small></p>
          <Chip className={cn("tcrm-student-drawer__frequency-chip", riskMode && "tcrm-student-drawer__frequency-chip--risk")} showDot={false}>
            {riskMode ? "Atenção" : "Boa frequência"}
          </Chip>
        </div>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__pending" aria-label="Pendências abertas">
        <h3>Pendências abertas <Badge className="tcrm-student-drawer__pending-count" tone="danger" variant="count">{pendingItems.length}</Badge></h3>
        <ul>
          {pendingItems.map((item) => (
            <li key={item.id}><span aria-hidden="true" />{item.label}</li>
          ))}
        </ul>
      </section>
    </CrmDrawer>
  );
}

export type ClassDrawerState = "open" | "conflict" | "calling" | "saved" | "blocked" | "loading";
export type AttendanceStatus = "pending" | "present" | "warned" | "no-show" | "replacement";
export type ClassDrawerAction =
  | "close"
  | "save-call"
  | "add-note"
  | "create-task"
  | "correct-later"
  | "open-schedule"
  | "open-class"
  | "view-demand"
  | "open-grid"
  | "move-student"
  | "notify-class"
  | "pause-class"
  | "edit-class";

export interface ClassDrawerStudent {
  id: string;
  name: string;
  initials?: string;
  avatarSrc?: string;
  status: AttendanceStatus;
  helper?: React.ReactNode;
}

export interface ClassDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
}

export interface ClassDrawerTimelineItem {
  id: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
}

export interface ClassDrawerImpactItem {
  id: string;
  icon: IconName;
  label: React.ReactNode;
}

export interface ClassDrawerBlockNotice {
  title: React.ReactNode;
  description: React.ReactNode;
  types?: React.ReactNode;
  actionLabel?: React.ReactNode;
  action?: ClassDrawerAction;
}

export interface ClassDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: ClassDrawerState;
  compact?: boolean;
  variant?: "attendance" | "class-detail" | "recurring-block";
  ariaLabel?: string;
  closeLabel?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  summary?: React.ReactNode;
  facts?: ClassDrawerFact[];
  availabilityNotice?: React.ReactNode;
  availabilityTone?: "success" | "warning" | "info";
  upcomingClasses?: ClassDrawerTimelineItem[];
  historyItems?: ClassDrawerTimelineItem[];
  impactItems?: ClassDrawerImpactItem[];
  blockNotice?: ClassDrawerBlockNotice;
  warning?: React.ReactNode;
  rosterHeading?: React.ReactNode;
  rosterStatus?: { label: React.ReactNode; tone?: ComponentTone };
  showStudentStatus?: boolean;
  students?: ClassDrawerStudent[];
  copilot?: React.ReactNode;
  audit?: React.ReactNode;
  primaryAction?: { label: React.ReactNode; action: ClassDrawerAction; icon?: IconName };
  secondaryActions?: Array<{ label: React.ReactNode; action: ClassDrawerAction; icon?: IconName }>;
  actionPlacement?: "footer" | "content";
  actionHeading?: React.ReactNode;
  onClose?: () => void;
  onAction?: (action: ClassDrawerAction) => void;
  onStudentStatus?: (student: ClassDrawerStudent) => void;
}

const sourceClassDrawerStudents: ClassDrawerStudent[] = [
  { id: "ana-carolina", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
  { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
  { id: "felipe", name: "Felipe Andrade", status: "warned", helper: "gera crédito" },
  { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
  { id: "juliana", name: "Juliana Costa", status: "replacement", helper: "reposição usada" }
];

const classDrawerStudentStatus: Record<AttendanceStatus, { label: string; tone?: ComponentTone }> = {
  pending: { label: "Pendente" },
  present: { label: "Presente", tone: "success" },
  warned: { label: "Falta avisada", tone: "warning" },
  "no-show": { label: "No-show", tone: "danger" },
  replacement: { label: "Reposição", tone: "info" }
};

function emitClassDrawerAction(action: ClassDrawerAction, onAction?: (action: ClassDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ClassDrawer({
  open = true,
  state = "calling",
  compact = false,
  variant = "attendance",
  ariaLabel = "Chamada da aula",
  closeLabel = "Fechar chamada",
  eyebrow,
  title = "Chamada",
  subtitle = "Terça 17h · Reformer Intermediário",
  summary,
  facts,
  availabilityNotice,
  availabilityTone = "success",
  upcomingClasses,
  historyItems,
  impactItems,
  blockNotice,
  warning,
  rosterHeading,
  rosterStatus,
  showStudentStatus = false,
  students = sourceClassDrawerStudents,
  copilot = <><strong>Copiloto: Felipe avisou falta dentro da política.</strong><span>Crédito pode ser gerado.</span></>,
  audit = <><Icon name="info" size="15px" /> Chamada é auditável e salva por humano.</>,
  primaryAction = { label: "Salvar chamada", action: "save-call" },
  secondaryActions = [
    { label: "Adicionar observação", action: "add-note" },
    { label: "Criar tarefa", action: "create-task" },
    { label: "Corrigir depois", action: "correct-later" }
  ],
  actionPlacement = "footer",
  actionHeading,
  onClose,
  onAction,
  onStudentStatus,
  className,
  ...props
}: ClassDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;

  const drawerHeader = (
    <header className="tcrm-class-drawer__header">
      <div>
        {eyebrow ? <Chip className="tcrm-class-drawer__eyebrow" showDot={false}>{eyebrow}</Chip> : null}
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <IconButton className="tcrm-class-drawer__close" disabled={isLoading} icon="x" label={closeLabel} onClick={() => emitClassDrawerAction("close", onAction, onClose)} size="sm" variant="default" />
    </header>
  );

  const drawerFooter = (
    <div className={cn("tcrm-class-drawer__footer", variant === "class-detail" && actionPlacement === "content" && "tcrm-class-drawer__footer--content")}>
      {actionHeading ? <h3 className="tcrm-class-drawer__action-heading">{actionHeading}</h3> : null}
      <Button className="tcrm-class-drawer__save" disabled={isBlocked} leadingIcon={primaryAction.icon} onClick={() => emitClassDrawerAction(primaryAction.action, onAction)} size="sm" variant="primary">{primaryAction.label}</Button>
      {secondaryActions.map((item) => (
        <Button className="tcrm-class-drawer__action" disabled={isBlocked} key={item.action} leadingIcon={item.icon} onClick={() => emitClassDrawerAction(item.action, onAction)} size="sm" variant="secondary">{item.label}</Button>
      ))}
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn(
        "tcrm-class-drawer",
        `tcrm-class-drawer--${state}`,
        variant !== "attendance" && `tcrm-class-drawer--${variant}`,
        compact && "tcrm-class-drawer--compact",
        className
      )}
      component="ClassDrawer"
      footer={variant === "recurring-block" || (variant === "class-detail" && actionPlacement === "content") ? undefined : drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      {variant === "recurring-block" ? (
        <>
          {facts?.length ? (
            <dl className="tcrm-class-drawer__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-class-drawer__fact", fact.tone && `tcrm-class-drawer__fact--${fact.tone}`)} key={fact.id}>
                  <Icon name={fact.icon} size="14px" />
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {upcomingClasses?.length ? (
            <section className="tcrm-class-drawer__recurring-section" aria-label="Próximas aulas geradas">
              <h3>Próximas aulas geradas</h3>
              <ul>
                {upcomingClasses.map((item) => <li key={item.id}><Icon name="calendar" size="14px" /><span>{item.label}</span></li>)}
              </ul>
            </section>
          ) : null}

          {impactItems?.length ? (
            <section className="tcrm-class-drawer__recurring-section" aria-label="Impacto de alteração">
              <h3>Impacto de alteração</h3>
              <ul>
                {impactItems.map((item) => <li key={item.id}><Icon name={item.icon} size="14px" /><span>{item.label}</span></li>)}
              </ul>
            </section>
          ) : null}

          {drawerFooter}

          {blockNotice ? (
            <section className="tcrm-class-drawer__block-notice" aria-label={String(blockNotice.title)}>
              <h3>{blockNotice.title}</h3>
              {blockNotice.types ? <p>{blockNotice.types}</p> : null}
              <p>{blockNotice.description}</p>
              <Button onClick={() => emitClassDrawerAction(blockNotice.action ?? "create-task", onAction)} size="sm" variant="ghost">{blockNotice.actionLabel ?? "Criar bloqueio"}</Button>
            </section>
          ) : null}
        </>
      ) : variant === "class-detail" ? (
        <>
          {facts?.length ? (
            <dl className="tcrm-class-drawer__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-class-drawer__fact", fact.tone && `tcrm-class-drawer__fact--${fact.tone}`)} key={fact.id}>
                  <Icon name={fact.icon} size="14px" />
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {(rosterHeading || rosterStatus) ? (
            <div className="tcrm-class-drawer__section-heading">
              {rosterHeading ? <h3 className="tcrm-class-drawer__section-title">{rosterHeading}</h3> : null}
              {rosterStatus ? <Chip className="tcrm-class-drawer__roster-status" showDot={false} tone={rosterStatus.tone}>{rosterStatus.label}</Chip> : null}
            </div>
          ) : null}
          <ul className={cn("tcrm-class-drawer__fixed-students", showStudentStatus && "tcrm-class-drawer__fixed-students--with-status")} aria-label={String(rosterHeading ?? "Alunos fixos")}>
            {students.map((student) => (
              <li data-attendance={student.status} key={student.id}>
                <Avatar name={student.name} size="xs" src={student.avatarSrc}>{student.initials}</Avatar>
                <span>{student.name}</span>
                {showStudentStatus ? (
                  <Chip className="tcrm-class-drawer__student-status" showDot={false} tone={classDrawerStudentStatus[student.status].tone}>
                    {classDrawerStudentStatus[student.status].label}
                  </Chip>
                ) : null}
              </li>
            ))}
          </ul>

          {availabilityNotice ? (
            <p className={cn("tcrm-class-drawer__availability", `tcrm-class-drawer__availability--${availabilityTone}`)}>
              <Icon name="info" size="14px" />
              {availabilityNotice}
            </p>
          ) : null}

          {(upcomingClasses?.length || historyItems?.length) ? (
            <div className="tcrm-class-drawer__split">
              {upcomingClasses?.length ? (
                <section aria-label="Proximas aulas">
                  <h3>Proximas aulas</h3>
                  <ul>
                    {upcomingClasses.map((item) => (
                      <li key={item.id}>
                        <Icon name="calendar" size="14px" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {historyItems?.length ? (
                <section aria-label="Historico recente">
                  <h3>Historico recente</h3>
                  <ul>
                    {historyItems.map((item) => (
                      <li className={item.tone ? `tcrm-class-drawer__history--${item.tone}` : undefined} key={item.id}>
                        <span aria-hidden="true" />
                        <p>{item.label}{item.meta ? <small>{item.meta}</small> : null}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}

          {warning ? (
            <p className="tcrm-class-drawer__warning">
              <Icon name="alert" size="14px" />
              {warning}
            </p>
          ) : null}

          {actionPlacement === "content" ? drawerFooter : null}
        </>
      ) : (
        <>
          <p className="tcrm-class-drawer__summary" aria-label="Resumo da chamada">
            {summary ?? (
              <>
                <span className="tcrm-class-drawer__summary--pending">1 pendente</span>
                <span className="tcrm-class-drawer__summary--present">1 presente</span>
                <span className="tcrm-class-drawer__summary--warned">1 falta avisada</span>
                <span className="tcrm-class-drawer__summary--no-show">1 no-show</span>
                <span className="tcrm-class-drawer__summary--replacement">1 reposição</span>
              </>
            )}
          </p>

          {rosterHeading ? <h3 className="tcrm-class-drawer__section-title">{rosterHeading}</h3> : null}
          <Roster
            className="tcrm-class-drawer__roster"
            disabled={isBlocked}
            onStudentStatus={(student) => onStudentStatus?.(student as ClassDrawerStudent)}
            students={students}
          />
        </>
      )}

      <section className="tcrm-class-drawer__copilot" aria-label="Sugestão do copiloto">
        <Icon name="sparkles" size="28px" />
        <p>{copilot}</p>
      </section>

      <p className="tcrm-class-drawer__audit">{audit}</p>
    </CrmDrawer>
  );
}

export type PaymentDrawerState =
  | "open"
  | "due"
  | "overdue"
  | "promise"
  | "reconciliation"
  | "reconciled"
  | "dispute"
  | "paid"
  | "failed"
  | "loading"
  | "blocked";
export type PaymentDrawerAction =
  | "close"
  | "send-reminder"
  | "open-charge"
  | "register-promise"
  | "move-stage"
  | "approve-receipt"
  | "copy-pix-link"
  | "open-conversation"
  | "mark-paid"
  | "confirm-payment"
  | "reconcile"
  | "resolve-dispute"
  | "open-receipt"
  | "export-movement"
  | "create-task"
  | "open-student";

export interface PaymentDrawerActionConfig {
  id: PaymentDrawerAction;
  label: React.ReactNode;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  variant?: "primary" | "secondary";
  placement?: "primary" | "grid" | "footer";
  disabled?: boolean;
}

export interface PaymentDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "danger" | "success" | "whatsapp";
}

export interface PaymentDrawerHistoryItem {
  id: string;
  label: React.ReactNode;
}

export interface PaymentDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: PaymentDrawerState;
  variant?: "collection" | "movement";
  compact?: boolean;
  eyebrow?: React.ReactNode;
  name?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: PaymentDrawerFact[];
  context?: React.ReactNode[];
  history?: PaymentDrawerHistoryItem[];
  copilotSuggestion?: React.ReactNode;
  markPaidDisabled?: boolean;
  actions?: PaymentDrawerActionConfig[];
  onAction?: (action: PaymentDrawerAction) => void;
  onClose?: () => void;
}

const sourcePaymentDrawerFacts: PaymentDrawerFact[] = [
  { id: "amount", icon: "wallet", label: "Valor", value: "R$ 420,00" },
  { id: "due", icon: "calendar", label: "Vencimento", value: "2 dias em atraso", tone: "danger" },
  { id: "status", icon: "checkCircle", label: "Status", value: "Em atraso", tone: "danger" },
  { id: "type", icon: "folder", label: "Tipo", value: "Mensalidade" },
  { id: "origin", icon: "tag", label: "Origem", value: "Sistema / mensalidade recorrente" },
  { id: "owner", icon: "clipboard", label: "Responsável", value: "Financeiro" },
  { id: "student", icon: "user", label: "Aluno vinculado", value: "Gabriela Lima" },
  { id: "channel", icon: "message", label: "Canal sugerido", value: <><Icon name="whatsapp" size="13px" /> WhatsApp</>, tone: "whatsapp" }
];

const sourcePaymentDrawerHistory: PaymentDrawerHistoryItem[] = [
  { id: "created", label: "Cobrança gerada automaticamente" },
  { id: "reminder", label: "Lembrete enviado ontem" },
  { id: "none", label: "Nenhuma resposta registrada" }
];

const sourcePaymentDrawerContext = [
  "Mensalidade recorrente vencida há 2 dias.",
  "Nenhum comprovante recebido até agora."
];

function emitPaymentDrawerAction(action: PaymentDrawerAction, onAction?: (action: PaymentDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function PaymentDrawer({
  open = true,
  state = "overdue",
  variant = "collection",
  compact = false,
  eyebrow,
  name = "Gabriela Lima",
  amount = "R$ 420,00",
  statusLabel = "Em atraso",
  facts = sourcePaymentDrawerFacts,
  context = sourcePaymentDrawerContext,
  history = sourcePaymentDrawerHistory,
  copilotSuggestion = <>Copiloto, tudo bem? Identificamos que sua mensalidade de R$ 420,00 venceu há 2 dias. Posso te lembrar o link de pagamento?</>,
  markPaidDisabled = false,
  actions,
  onAction,
  onClose,
  className,
  ...props
}: PaymentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const isPaid = state === "paid";
  const isReconciled = state === "reconciled";
  const isFailed = state === "failed";
  const isDue = state === "due" || state === "open";
  const isMovement = variant === "movement";
  const effectiveStatus = isPaid ? "Pago" : isFailed ? "Falha" : statusLabel;
  const defaultActions: PaymentDrawerActionConfig[] = isMovement
    ? [
        { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag", placement: "primary", variant: "primary" },
        { id: "copy-pix-link", label: "Copiar link Pix", leadingIcon: "link" },
        { id: "open-conversation", label: "Abrir conversa", leadingIcon: "whatsapp" },
        { id: "mark-paid", label: "Marcar como pago", leadingIcon: "checkCircle" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
      ]
    : [
        { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag", placement: "primary", variant: "primary" },
        { id: "open-charge", label: "Abrir cobrança", leadingIcon: "whatsapp" },
        { id: "register-promise", label: "Registrar promessa", leadingIcon: "calendar" },
        { id: "mark-paid", label: "Marcar como pago", leadingIcon: "checkCircle" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
      ];
  const effectiveActions = actions ?? defaultActions;
  const actionDisabled = (action: PaymentDrawerActionConfig) =>
    isBlocked || action.disabled || ((isPaid || isReconciled || markPaidDisabled) && ["mark-paid", "confirm-payment", "reconcile", "resolve-dispute"].includes(action.id));
  const primaryActions = effectiveActions.filter((action) => action.placement === "primary");
  const gridActions = effectiveActions.filter((action) => !action.placement || action.placement === "grid");
  const footerActions = effectiveActions.filter((action) => action.placement === "footer");

  return (
    <CrmDrawer
      aria-label="Detalhes da cobrança"
      className={cn("tcrm-payment-drawer", `tcrm-payment-drawer--${state}`, `tcrm-payment-drawer--${variant}`, compact && "tcrm-payment-drawer--compact", className)}
      closeLabel="Fechar cobrança"
      component="PaymentDrawer"
      eyebrow={eyebrow ?? (isMovement ? "Mensalidade" : "Cobrança")}
      footer={(
        <div className="tcrm-payment-drawer__footer">
          <h3>{isMovement ? "Ações" : "Ações principais"}</h3>
          {primaryActions.map((action) => <Button className="tcrm-payment-drawer__primary" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "primary"}>{action.label}</Button>)}
          {gridActions.length > 0 ? <div className="tcrm-payment-drawer__actions">
            {gridActions.map((action) => <Button className="tcrm-payment-drawer__action" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "secondary"}>{action.label}</Button>)}
          </div> : null}
          {!isMovement ? <h3>Ação secundária</h3> : null}
          {footerActions.map((action) => <Button className="tcrm-payment-drawer__student" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "secondary"}>{action.label}</Button>)}
        </div>
      )}
      headerClassName="tcrm-payment-drawer__header"
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={() => emitPaymentDrawerAction("close", onAction, onClose)}
      state={state}
      status={(
          <span className={cn("tcrm-payment-drawer__status-label", isDue && "tcrm-payment-drawer__status-label--due", (isPaid || isReconciled) && "tcrm-payment-drawer__status-label--paid", isFailed && "tcrm-payment-drawer__status-label--failed")}>
          {effectiveStatus}
        </span>
      )}
      title={name}
      {...props}
    >
      <section className="tcrm-payment-drawer__summary" aria-label="Resumo">
        <h3>Resumo</h3>
        <dl>
          {facts.map((fact) => (
            <div className={cn("tcrm-payment-drawer__fact", fact.tone && `tcrm-payment-drawer__fact--${fact.tone}`)} key={fact.id}>
              <Icon name={fact.icon} size="13px" />
              <dt>{fact.label}</dt>
              <dd>{fact.id === "amount" ? amount : fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="tcrm-payment-drawer__context" aria-label="Contexto">
        <h3>Contexto</h3>
        {context.map((line, index) => <p key={index}>{line}</p>)}
      </section>

      <section className="tcrm-payment-drawer__history" aria-label="Histórico recente">
        <h3>Histórico recente</h3>
        <ol>
          {history.map((item) => (
            <li key={item.id}>
              <span aria-hidden="true" />
              <p>{item.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tcrm-payment-drawer__copilot" aria-label="Sugestão do copiloto">
        <Icon name="sparkles" size="24px" />
        <p>{copilotSuggestion}</p>
      </section>
    </CrmDrawer>
  );
}

export type ReplacementDrawerState = "requested" | "no-vacancy" | "conflict" | "waiting" | "expired" | "scheduled" | "consumed" | "blocked" | "loading";
export type ReplacementFitTone = "compatible" | "confirmation" | "conflict";
export type ReplacementDrawerAction = "close" | "find-fit" | "reserve-slot" | "send-invite" | "consume-credit" | "create-task" | "open-conversation" | "open-original-class" | "copy-suggestion" | "cancel";

export interface ReplacementDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  helper?: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface ReplacementFitOption {
  id: string;
  title: React.ReactNode;
  instructor: React.ReactNode;
  vacancy: React.ReactNode;
  badge: React.ReactNode;
  tone: ReplacementFitTone;
  selected?: boolean;
}

export interface ReplacementDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: ReplacementDrawerState;
  name?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: ReplacementDrawerFact[];
  options?: ReplacementFitOption[];
  inviteSuggestion?: React.ReactNode;
  onAction?: (action: ReplacementDrawerAction) => void;
  onClose?: () => void;
  onOptionSelect?: (option: ReplacementFitOption) => void;
}

const sourceReplacementFacts: ReplacementDrawerFact[] = [
  { id: "original", icon: "calendar", label: "Aula original", value: <>Terça 17h <span aria-hidden="true">·</span> Reformer Intermediário</> },
  { id: "credit", icon: "clock", label: "Direito / crédito", value: "Elegível", helper: "Válido até 12/06", tone: "success" },
  { id: "policy", icon: "shield", label: "Política aplicada", value: "Falta avisada dentro do prazo" },
  { id: "preference", icon: "shieldCheck", label: "Preferência", value: "Manhã ou quinta" },
  { id: "status", icon: "clock", label: "Status", value: "Opção encontrada", tone: "success" },
  { id: "owner", icon: "user", label: "Responsável / fila", value: "Recepção" }
];

const sourceReplacementOptions: ReplacementFitOption[] = [
  { id: "thu-08", title: <>Quinta 08h <span aria-hidden="true">·</span> Reformer Intermediário</>, instructor: "Instrutor Lucas Peres", vacancy: "1 vaga", badge: "compatível", tone: "compatible", selected: true },
  { id: "fri-10", title: <>Sexta 10h <span aria-hidden="true">·</span> Pilates Solo</>, instructor: "Instrutora Mariana Lopes", vacancy: "2 vagas", badge: "exige confirmação", tone: "confirmation" },
  { id: "mon-19", title: <>Segunda 19h <span aria-hidden="true">·</span> Tower</>, instructor: "Instrutor Lucas Peres", vacancy: "", badge: "conflito leve", tone: "conflict" }
];

function emitReplacementDrawerAction(action: ReplacementDrawerAction, onAction?: (action: ReplacementDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ReplacementDrawer({
  open = true,
  state = "requested",
  name = "Ana Carolina Souza",
  statusLabel = "Opção encontrada",
  facts = sourceReplacementFacts,
  options = sourceReplacementOptions,
  inviteSuggestion = <>“Oi Ana, encontramos uma vaga quinta às 08h para sua reposição. Posso reservar?”</>,
  onAction,
  onClose,
  onOptionSelect,
  className,
  ...props
}: ReplacementDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const isConsumed = state === "consumed";
  const isExpired = state === "expired";
  const hasSelectedOption = options.some((option) => option.selected);
  const mutationDisabled = isBlocked || isExpired || isConsumed;
  const resolvedStatusLabel = ({
    requested: statusLabel,
    "no-vacancy": "Sem vaga",
    conflict: "Conflito",
    waiting: "Aguardando resposta",
    expired: "Vencida",
    scheduled: "Agendada",
    consumed: "Crédito consumido",
    blocked: "Bloqueada",
    loading: "Carregando"
  } satisfies Record<ReplacementDrawerState, React.ReactNode>)[state];

  return (
    <CrmDrawer
      aria-label="Detalhes da reposição"
      className={cn("tcrm-replacement-drawer", `tcrm-replacement-drawer--${state}`, className)}
      closeLabel="Fechar reposição"
      component="ReplacementDrawer"
      eyebrow="Reposição selecionada"
      footer={(
        <div className="tcrm-replacement-drawer__footer">
          <Button className="tcrm-replacement-drawer__primary" disabled={mutationDisabled || !hasSelectedOption || state === "waiting"} onClick={() => emitReplacementDrawerAction("reserve-slot", onAction)} size="sm" variant="primary">Reservar vaga</Button>
          <div className="tcrm-replacement-drawer__actions">
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked || isConsumed} onClick={() => emitReplacementDrawerAction("find-fit", onAction)} size="sm" variant="secondary">Encontrar encaixe</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={mutationDisabled || !hasSelectedOption || state === "waiting"} onClick={() => emitReplacementDrawerAction("send-invite", onAction)} size="sm" variant="secondary">Enviar convite</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked || state !== "scheduled"} onClick={() => emitReplacementDrawerAction("consume-credit", onAction)} size="sm" variant="secondary">Consumir crédito</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={mutationDisabled} onClick={() => emitReplacementDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">Abrir conversa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-original-class", onAction)} size="sm" variant="secondary">Abrir aula original</Button>
          </div>
          <Button className="tcrm-replacement-drawer__cancel" disabled={mutationDisabled} onClick={() => emitReplacementDrawerAction("cancel", onAction)} size="sm" variant="secondary">Marcar como cancelada</Button>
        </div>
      )}
      headerClassName="tcrm-replacement-drawer__header"
      loading={isLoading}
      onClose={() => emitReplacementDrawerAction("close", onAction, onClose)}
      state={state}
      title={name}
      {...props}
    >
      <div className="tcrm-replacement-drawer__body">
        <dl className="tcrm-replacement-drawer__facts">
          {facts.map((fact) => (
            <div className={cn("tcrm-replacement-drawer__fact", fact.tone && `tcrm-replacement-drawer__fact--${fact.tone}`)} data-fact={fact.id} key={fact.id}>
              <Icon name={fact.icon} size="13px" />
              <dt>{fact.label}</dt>
              <dd>
                {fact.id === "status" ? resolvedStatusLabel : fact.value}
                {fact.helper ? <small>{fact.helper}</small> : null}
              </dd>
            </div>
          ))}
        </dl>

        <section className="tcrm-replacement-drawer__options" aria-label="Opções de encaixe">
          <h3>Opções de encaixe</h3>
          {options.length > 0 ? <ul>
            {options.map((option) => (
              <li key={option.id}>
                <button
                  aria-pressed={Boolean(option.selected)}
                  className={cn("tcrm-replacement-drawer__option", option.selected && "is-selected", `tcrm-replacement-drawer__option--${option.tone}`)}
                  disabled={mutationDisabled || state === "waiting"}
                  onClick={() => onOptionSelect?.(option)}
                  type="button"
                >
                  <Icon name={option.selected ? "star" : "circle"} size="15px" />
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.instructor}</small>
                  </span>
                  {option.vacancy ? <Chip className="tcrm-replacement-drawer__vacancy" showDot={false}>{option.vacancy}</Chip> : <span aria-hidden="true" />}
                  <Chip className="tcrm-replacement-drawer__fit" showDot={false}>{option.badge}</Chip>
                  {option.selected ? <span className="tcrm-replacement-drawer__selected"><Icon name="check" size="12px" /></span> : null}
                </button>
              </li>
            ))}
          </ul> : <EmptyState description="Tente ampliar horários, turma ou validade do crédito." title="Nenhum encaixe compatível" />}
        </section>

        <section className="tcrm-replacement-drawer__invite" aria-label="Sugestão de convite">
          <h3>Sugestão de convite</h3>
          <div>
            <Icon name="message" size="18px" />
            <p>{inviteSuggestion}</p>
            <IconButton icon="copy" label="Copiar sugestão" onClick={() => emitReplacementDrawerAction("copy-suggestion", onAction)} size="sm" variant="ghost" />
          </div>
        </section>

        <section className="tcrm-replacement-drawer__notes" aria-label="Notas do copiloto">
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--info"><Icon name="info" size="15px" /> Cálculo de encaixes é programático e funciona com 0 agentes.</p>
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--copilot"><Icon name="sparkles" size="16px" /> <span><strong>Copiloto:</strong> quinta 08h respeita a validade do crédito e tem 1 vaga.</span></p>
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--safe"><Icon name="checkCircle" size="15px" /> <span><strong>Autônomo disponível para convite seguro</strong><small>Exceções de política exigem confirmação humana.</small></span></p>
        </section>
      </div>
    </CrmDrawer>
  );
}

export type LeadDrawerState =
  | "interested"
  | "new"
  | "no-slot"
  | "ready"
  | "trial"
  | "trial-scheduled"
  | "trial-missed"
  | "trial-convert"
  | "enrollment"
  | "enrollment-missing"
  | "enrollment-payment"
  | "enrollment-ready"
  | "enrollment-converted"
  | "lost"
  | "loading"
  | "blocked";
export type LeadDrawerAction =
  | "close"
  | "open-conversation"
  | "qualify"
  | "schedule-trial"
  | "create-follow-up"
  | "create-task"
  | "move-stage"
  | "start-enrollment"
  | "mark-lost"
  | "more-actions"
  | "open-class"
  | "confirm-presence"
  | "reschedule"
  | "mark-attended"
  | "mark-absence"
  | "request-data"
  | "validate-enrollment"
  | "charge-payment"
  | "choose-first-class"
  | "convert-student";

export interface LeadDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  helper?: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface LeadDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface LeadDrawerChecklistItem {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  state?: PreflightChecklistItem["state"];
}

export interface LeadDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: LeadDrawerState;
  compact?: boolean;
  eyebrow?: React.ReactNode;
  name?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: LeadDrawerFact[];
  checklistTitle?: React.ReactNode;
  checklistItems?: LeadDrawerChecklistItem[];
  checklistProgressLabel?: React.ReactNode;
  history?: LeadDrawerHistoryItem[];
  copilotTitle?: React.ReactNode;
  copilotBody?: React.ReactNode;
  suggestedAction?: React.ReactNode;
  notice?: React.ReactNode;
  primaryAction?: { label: React.ReactNode; action: LeadDrawerAction; icon?: IconName; disabled?: boolean };
  secondaryActions?: Array<{ label: React.ReactNode; action: LeadDrawerAction; icon?: IconName; disabled?: boolean }>;
  onAction?: (action: LeadDrawerAction) => void;
  onChecklistToggle?: (item: LeadDrawerChecklistItem, checked: boolean) => void;
  onClose?: () => void;
}

const sourceLeadFacts: LeadDrawerFact[] = [
  { id: "channel", icon: "calendar", label: "Canal", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" },
  { id: "origin", icon: "users", label: "Origem", value: <><Icon name="whatsapp" size="12px" /> WhatsApp</>, tone: "success" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "interest", icon: "calendar", label: "Interesse", value: "começar Pilates" },
  { id: "schedule", icon: "clock", label: "Horário desejado", value: "terça à noite" },
  { id: "last", icon: "message", label: "Última conversa", value: "Perguntou sobre preço e horários", helper: "hoje 10:24" },
  { id: "next", icon: "sparkles", label: "Próxima ação recomendada", value: "Responder preço hoje" },
  { id: "objection", icon: "clock", label: "Objeção / motivo", value: "Quer entender valor e disponibilidade" },
  { id: "trial", icon: "graduation", label: "Experimental vinculada", value: "Nenhuma agendada ainda" },
  { id: "enrollment", icon: "calendar", label: "Pré-matrícula", value: "Ainda não iniciada" }
];

const sourceLeadHistory: LeadDrawerHistoryItem[] = [
  { id: "contact", time: "hoje 10:24", title: "Contato via WhatsApp", description: "Perguntou sobre preços e horários" },
  { id: "triage", time: "ontem 18:40", title: "Triagem concluída pela Recepção", description: "Interesse em começar Pilates" },
  { id: "start", time: "ontem 09:15", title: "Conversa inicial via WhatsApp", description: "Solicitou informações" }
];

function emitLeadDrawerAction(action: LeadDrawerAction, onAction?: (action: LeadDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function LeadDrawer({
  open = true,
  state = "interested",
  compact = false,
  eyebrow = "Interessado selecionado",
  name = "Ana Souza",
  statusLabel = "Qualificada",
  facts = sourceLeadFacts,
  checklistTitle,
  checklistItems,
  checklistProgressLabel,
  history = sourceLeadHistory,
  copilotTitle = "Copiloto sugere",
  copilotBody = <>Ana demonstrou interesse e pediu valores.<br />Sugestão: responder preço e horários disponíveis.</>,
  suggestedAction = "Ação sugerida: Responder preço hoje",
  notice = <><strong>A operação manual é sempre possível.</strong><small>O copiloto apenas sugere.</small></>,
  primaryAction = { label: "Abrir conversa", action: "open-conversation", icon: "whatsapp" },
  secondaryActions = [
    { label: "Agendar experimental", action: "schedule-trial", icon: "calendar" },
    { label: "Criar follow-up", action: "create-follow-up", icon: "checkCircle" },
    { label: "Mover etapa", action: "move-stage", icon: "refresh" },
    { label: "Iniciar matrícula", action: "start-enrollment", icon: "graduation" },
    { label: "Marcar perdido", action: "mark-lost", icon: "x" },
    { label: "Mais ações", action: "more-actions", icon: "moreVertical" }
  ],
  onAction,
  onChecklistToggle,
  onClose,
  className,
  ...props
}: LeadDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const drawerFacts = facts.map((fact) => ({
    id: fact.id,
    icon: fact.icon,
    label: fact.label,
    tone: fact.tone,
    value: <>{fact.value}{fact.helper ? <small>{fact.helper}</small> : null}</>
  }));
  const drawerActions: CrmDrawerAction[] = [
    {
      disabled: isBlocked || primaryAction.disabled,
      fullWidth: true,
      icon: primaryAction.icon,
      id: primaryAction.action,
      label: primaryAction.label,
      onClick: () => emitLeadDrawerAction(primaryAction.action, onAction),
      variant: "primary"
    },
    ...secondaryActions.map((action) => ({
      disabled: isBlocked || action.disabled,
      icon: action.icon,
      id: action.action,
      label: action.label,
      onClick: () => emitLeadDrawerAction(action.action, onAction),
      variant: "secondary" as const
    }))
  ];

  return (
    <CrmDrawer
      aria-label="Detalhes do interessado"
      actions={drawerActions}
      className={cn("tcrm-lead-drawer", `tcrm-lead-drawer--${state}`, compact && "tcrm-lead-drawer--compact", className)}
      closeLabel="Fechar interessado"
      component="LeadDrawer"
      eyebrow={eyebrow}
      facts={drawerFacts}
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={() => emitLeadDrawerAction("close", onAction, onClose)}
      sections={[
        ...(checklistItems?.length ? [{
          id: "checklist",
          variant: "card" as const,
          content: (
            <EnrollmentChecklist
              className="tcrm-lead-drawer__checklist"
              countLabel={checklistProgressLabel}
              items={checklistItems.map((item) => ({
                id: item.id,
                state: item.state ?? (item.checked ? "complete" : "incomplete"),
                title: item.label
              }))}
              onAction={onChecklistToggle ? (itemId) => {
                const item = checklistItems.find((candidate) => candidate.id === itemId);
                if (!item || isBlocked || item.disabled) return;
                onChecklistToggle(item, !item.checked);
              } : undefined}
              title={checklistTitle ?? "Checklist"}
            />
          )
        }] : []),
        {
          id: "history",
          title: "Histórico recente",
          trailing: <Button className="tcrm-lead-drawer__history-action" disabled={isBlocked} onClick={() => emitLeadDrawerAction("more-actions", onAction)} size="sm" type="button" variant="ghost">Ver todos</Button>,
          variant: "card",
          content: (
            <ol className="tcrm-lead-drawer__history-list">
              {history.map((item) => (
                <li key={item.id}>
                  <time>{item.time}</time>
                  <span><strong>{item.title}</strong><small>{item.description}</small></span>
                </li>
              ))}
            </ol>
          )
        },
        {
          id: "copilot",
          variant: "callout",
          content: (
            <div className="tcrm-lead-drawer__copilot-content">
              <Icon name="sparkles" size="28px" />
              <span>
                <strong>{copilotTitle}</strong>
                <p>{copilotBody}</p>
                {suggestedAction ? <Button disabled={isBlocked} onClick={() => emitLeadDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">{suggestedAction}</Button> : null}
              </span>
            </div>
          )
        },
        {
          id: "notice",
          variant: "plain",
          content: <p className="tcrm-lead-drawer__notice"><Icon name="info" size="15px" /><span>{notice}</span></p>
        }
      ]}
      state={state}
      status={statusLabel}
      title={name}
      {...props}
    />
  );
}

export type AgentFlowDrawerState = "flow" | "routine" | "test" | "publish" | "execution" | "loading" | "blocked";
export type AgentFlowDrawerAction = "close" | "menu" | "select-question" | "send-question" | "schedule-help";

export interface AgentFlowDrawerQuestion {
  id: string;
  label: React.ReactNode;
}

export interface AgentFlowDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: AgentFlowDrawerState;
  title?: React.ReactNode;
  roleLabel?: React.ReactNode;
  message?: React.ReactNode;
  questions?: AgentFlowDrawerQuestion[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  helpActionLabel?: React.ReactNode;
  showMenu?: boolean;
  onAction?: (action: AgentFlowDrawerAction, payload?: string) => void;
  onClose?: () => void;
  onQuestionSubmit?: (value: string) => void;
}

const sourceAgentFlowQuestions: AgentFlowDrawerQuestion[] = [
  { id: "copilot-change", label: "O que muda no Copiloto?" },
  { id: "team-called", label: "Quando a equipe será chamada?" },
  { id: "autonomous-blocked", label: "Por que Autônomo está bloqueado?" },
  { id: "test-late", label: "Testar aluno fora do prazo" }
];

const agentFlowCopy: Record<AgentFlowDrawerState, { role: React.ReactNode; message: React.ReactNode; placeholder: string; questions: AgentFlowDrawerQuestion[] }> = {
  flow: {
    role: <>Ajudando neste fluxo <span aria-hidden="true">●</span></>,
    message: <>Este fluxo está em Autônomo com exceções.<br />A Taliya trata a falta avisada quando aluno, aula, prazo e mensagem estão claros. Se algo não fechar, chama a equipe definida.</>,
    placeholder: "Pergunte sobre este fluxo...",
    questions: sourceAgentFlowQuestions
  },
  routine: {
    role: <>Guiando rotina <span aria-hidden="true">●</span></>,
    message: <>Essa rotina está em Mais autônomo.<br />Cada fluxo mostra o que a Taliya faz, quando chama a equipe e onde exige aprovação.</>,
    placeholder: "Pergunte sobre esta rotina...",
    questions: [
      { id: "balanced-change", label: "O que muda no Equilibrado?" },
      { id: "approval-needed", label: "Por que correção pede aprovação?" },
      { id: "team-called", label: "Onde a equipe é chamada?" },
      { id: "simulate-absence", label: "Simular falta com aviso" }
    ]
  },
  test: {
    role: <>Explicando o teste <span aria-hidden="true">●</span></>,
    message: <>Neste teste, a Taliya registrou a falta e criou uma tarefa em Reposições. Ela não decidiu a reposição. Se o aviso estivesse fora do prazo, chamaria a equipe.</>,
    placeholder: "Pergunte sobre este teste...",
    questions: [
      { id: "test-late", label: "Testar aviso fora do prazo" },
      { id: "test-credit", label: "Testar aluno pedindo crédito" },
      { id: "copilot-difference", label: "O que seria diferente no Copiloto?" },
      { id: "no-replacement", label: "Por que não decidiu a reposição?" }
    ]
  },
  publish: {
    role: <>Revisando publicação <span aria-hidden="true">●</span></>,
    message: <>Esta rotina está pronta. A Taliya vai operar confirmações e faltas comuns sozinha, chamar a equipe nas exceções e pedir aprovação antes de corrigir histórico de presença.</>,
    placeholder: "Pergunte sobre esta publicação...",
    questions: [
      { id: "publish-change", label: "O que muda ao publicar?" },
      { id: "team-called", label: "Quando a equipe será chamada?" },
      { id: "approval-needed", label: "Por que correção pede aprovação?" },
      { id: "single-flow", label: "Posso publicar só um fluxo?" }
    ]
  },
  execution: {
    role: <>Explicando execução <span aria-hidden="true">●</span></>,
    message: <>Esta execução mostra o que aconteceu em um caso real. Ela não mostra prompt, log técnico ou pensamento interno do agente.</>,
    placeholder: "Pergunte sobre esta execução...",
    questions: [
      { id: "why-no-team", label: "Por que não chamou a equipe?" },
      { id: "created-task", label: "Onde vejo a tarefa criada?" },
      { id: "quota", label: "Isso consumiu cota?" },
      { id: "copilot-change", label: "O que mudaria no Copiloto?" }
    ]
  },
  loading: {
    role: <>Carregando orientação <span aria-hidden="true">●</span></>,
    message: <>Carregando as perguntas e o contexto deste fluxo.</>,
    placeholder: "Carregando...",
    questions: sourceAgentFlowQuestions
  },
  blocked: {
    role: <>Ajuda limitada <span aria-hidden="true">●</span></>,
    message: <>Este painel está bloqueado para perguntas novas, mas a equipe ainda pode revisar o fluxo manualmente.</>,
    placeholder: "Perguntas bloqueadas",
    questions: sourceAgentFlowQuestions
  }
};

function emitAgentFlowDrawerAction(
  action: AgentFlowDrawerAction,
  onAction?: (action: AgentFlowDrawerAction, payload?: string) => void,
  payload?: string,
  handler?: () => void
) {
  handler?.();
  onAction?.(action, payload);
}

export function AgentFlowDrawer({
  open = true,
  state = "flow",
  title = "Agente de Configuração",
  roleLabel,
  message,
  questions,
  placeholder,
  helpLabel = "Precisa de ajuda humana?",
  helpActionLabel = "Agendar ajuda",
  showMenu,
  onAction,
  onClose,
  onQuestionSubmit,
  className,
  ...props
}: AgentFlowDrawerProps) {
  const [draft, setDraft] = React.useState("");

  if (!open) return null;

  const copy = agentFlowCopy[state];
  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const renderedQuestions = questions ?? copy.questions;
  const effectivePlaceholder = placeholder ?? copy.placeholder;
  const effectiveMessage = message ?? copy.message;
  const effectiveRole = roleLabel ?? copy.role;
  const shouldShowMenu = showMenu ?? state !== "test";

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isBlocked) return;
    onQuestionSubmit?.(value);
    emitAgentFlowDrawerAction("send-question", onAction, value);
    setDraft("");
  };

  const drawerHeader = (
    <header className="tcrm-agent-flow-drawer__header">
      <span className="tcrm-agent-flow-drawer__mark"><TaliyaLogo label="Taliya" variant="mark" /></span>
      <div>
        <h2>{title}</h2>
        <p>{effectiveRole}</p>
      </div>
      {shouldShowMenu ? (
        <IconButton className="tcrm-agent-flow-drawer__menu" disabled={isLoading} icon="moreVertical" label="Mais opções do agente" onClick={() => emitAgentFlowDrawerAction("menu", onAction)} size="sm" variant="ghost" />
      ) : null}
      <IconButton className="tcrm-agent-flow-drawer__close" disabled={isLoading} icon="x" label="Fechar agente" onClick={() => emitAgentFlowDrawerAction("close", onAction, undefined, onClose)} size="sm" variant="ghost" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-agent-flow-drawer__footer">
      <span>{helpLabel}</span>
      <Button className="tcrm-agent-flow-drawer__help-action" disabled={isLoading} onClick={() => emitAgentFlowDrawerAction("schedule-help", onAction)} size="sm" type="button" variant="ghost">{helpActionLabel}</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Agente de configuração do fluxo"
      className={cn("tcrm-agent-flow-drawer", `tcrm-agent-flow-drawer--${state}`, className)}
      component="AgentFlowDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      <section className="tcrm-agent-flow-drawer__callout" aria-label="Orientação do agente">
        <Icon name="info" size="21px" />
        <p>{effectiveMessage}</p>
      </section>

      <nav className="tcrm-agent-flow-drawer__questions" aria-label="Perguntas sugeridas">
        {renderedQuestions.map((question) => (
          <Button
            className="tcrm-agent-flow-drawer__question"
            disabled={isBlocked}
            leadingIcon="help"
            key={question.id}
            onClick={() => emitAgentFlowDrawerAction("select-question", onAction, question.id)}
            trailingIcon="chevronRight"
            type="button"
            variant="ghost"
          >
            <span>{question.label}</span>
          </Button>
        ))}
      </nav>

      <form className="tcrm-agent-flow-drawer__composer" onSubmit={submit}>
        <Input
          aria-label="Pergunta para o agente"
          className="tcrm-agent-flow-drawer__composer-input"
          disabled={isBlocked}
          fieldSize="sm"
          onChange={(event) => setDraft(event.target.value)}
          placeholder={effectivePlaceholder}
          value={draft}
        />
        <IconButton className="tcrm-agent-flow-drawer__send" disabled={isBlocked || draft.trim().length === 0} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
      </form>
    </CrmDrawer>
  );
}

export type UsageDrawerState = "ledger" | "overview" | "quota" | "loading" | "blocked";
export type UsageDrawerAction = "close" | "menu" | "select-question" | "send-question" | "open-ticket";

export interface UsageDrawerQuestion {
  id: string;
  label: React.ReactNode;
}

export interface UsageDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: UsageDrawerState;
  title?: React.ReactNode;
  roleLabel?: React.ReactNode;
  message?: React.ReactNode;
  questions?: UsageDrawerQuestion[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  helpActionLabel?: React.ReactNode;
  onAction?: (action: UsageDrawerAction, payload?: string) => void;
  onClose?: () => void;
  onQuestionSubmit?: (value: string) => void;
}

const usageDrawerQuestionsByState: Record<Exclude<UsageDrawerState, "loading" | "blocked">, UsageDrawerQuestion[]> = {
  ledger: [
    { id: "quota-consumption", label: "O que consome cota?" },
    { id: "estimated", label: "Por que aparece estimado?" },
    { id: "reprocessed", label: "O que e reprocessado?" },
    { id: "subscription", label: "Onde vejo minha assinatura?" }
  ],
  overview: [
    { id: "quota-consumption", label: "O que consome cota?" },
    { id: "ninety-percent", label: "O que acontece em 90%?" },
    { id: "hundred-percent", label: "O que acontece em 100%?" },
    { id: "buy-package", label: "Onde compro pacote?" }
  ],
  quota: [
    { id: "current-cycle", label: "Como funciona o ciclo atual?" },
    { id: "next-alert", label: "Quando recebo alertas?" },
    { id: "paused-automation", label: "O que pausa em 100%?" },
    { id: "add-ons", label: "Como adiciono pacote?" }
  ]
};

const usageDrawerCopy: Record<UsageDrawerState, { role: React.ReactNode; message: React.ReactNode; placeholder: string; questions: UsageDrawerQuestion[] }> = {
  ledger: {
    role: "Ajudando com uso",
    message: <>Este extrato mostra o que<br />consumiu sua cota Taliya.<br />Plano, faturas e add-ons<br />ficam em Billing.</>,
    placeholder: "Pergunte sobre o extrato...",
    questions: usageDrawerQuestionsByState.ledger
  },
  overview: {
    role: "Ajudando com uso",
    message: <>Uso mostra quanto da sua cota<br />foi consumido. Plano, faturas<br />e pacotes ficam em Billing.</>,
    placeholder: "Pergunte sobre uso e cotas...",
    questions: usageDrawerQuestionsByState.overview
  },
  quota: {
    role: "Ajudando com cotas",
    message: <>A cota mostra mensagens e execucoes<br />consumidas neste ciclo. Alertas avisam<br />antes de pausar automacoes pagas.</>,
    placeholder: "Pergunte sobre cotas...",
    questions: usageDrawerQuestionsByState.quota
  },
  loading: {
    role: "Carregando ajuda",
    message: <>Carregando perguntas e contexto de uso.</>,
    placeholder: "Carregando...",
    questions: usageDrawerQuestionsByState.ledger
  },
  blocked: {
    role: "Ajuda limitada",
    message: <>Este painel esta bloqueado para novas perguntas. Abra um chamado para ajuda humana.</>,
    placeholder: "Perguntas bloqueadas",
    questions: usageDrawerQuestionsByState.ledger
  }
};

function emitUsageDrawerAction(
  action: UsageDrawerAction,
  onAction?: (action: UsageDrawerAction, payload?: string) => void,
  payload?: string,
  handler?: () => void
) {
  handler?.();
  onAction?.(action, payload);
}

export function UsageDrawer({
  open = true,
  state = "ledger",
  title = "Agente de Suporte Taliya",
  roleLabel,
  message,
  questions,
  placeholder,
  helpLabel = "Precisa de ajuda humana?",
  helpActionLabel = "Abrir chamado",
  onAction,
  onClose,
  onQuestionSubmit,
  className,
  ...props
}: UsageDrawerProps) {
  const [draft, setDraft] = React.useState("");

  if (!open) return null;

  const copy = usageDrawerCopy[state];
  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const renderedQuestions = questions ?? copy.questions;
  const effectivePlaceholder = placeholder ?? copy.placeholder;
  const effectiveMessage = message ?? copy.message;
  const effectiveRole = roleLabel ?? copy.role;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isBlocked) return;
    onQuestionSubmit?.(value);
    emitUsageDrawerAction("send-question", onAction, value);
    setDraft("");
  };

  const drawerHeader = (
    <header className="tcrm-usage-drawer__header">
      <span className="tcrm-usage-drawer__mark"><TaliyaLogo label="Taliya" variant="mark" /></span>
      <div>
        <h2>{title}</h2>
        <p><span aria-hidden="true" />{effectiveRole}</p>
      </div>
      <IconButton className="tcrm-usage-drawer__menu" disabled={isLoading} icon="moreVertical" label="Mais opcoes do suporte" onClick={() => emitUsageDrawerAction("menu", onAction)} size="sm" variant="ghost" />
      <IconButton className="tcrm-usage-drawer__close" disabled={isLoading} icon="x" label="Fechar suporte" onClick={() => emitUsageDrawerAction("close", onAction, undefined, onClose)} size="sm" variant="ghost" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-usage-drawer__footer">
      <span>{helpLabel}</span>
      <Button className="tcrm-usage-drawer__help-action" disabled={isLoading} onClick={() => emitUsageDrawerAction("open-ticket", onAction)} size="sm" type="button" variant="ghost">{helpActionLabel}</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Agente de suporte de uso"
      className={cn("tcrm-usage-drawer", `tcrm-usage-drawer--${state}`, className)}
      component="UsageDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      <section className="tcrm-usage-drawer__callout" aria-label="Orientacao do suporte">
        <Icon name="info" size="21px" />
        <p>{effectiveMessage}</p>
      </section>

      <nav className="tcrm-usage-drawer__questions" aria-label="Perguntas sugeridas">
        {renderedQuestions.map((question) => (
          <Button
            className="tcrm-usage-drawer__question"
            disabled={isBlocked}
            leadingIcon="help"
            key={question.id}
            onClick={() => emitUsageDrawerAction("select-question", onAction, question.id)}
            trailingIcon="chevronRight"
            type="button"
            variant="ghost"
          >
            <span>{question.label}</span>
          </Button>
        ))}
      </nav>

      <form className="tcrm-usage-drawer__composer" onSubmit={submit}>
        <Input
          aria-label="Pergunta para o suporte"
          className="tcrm-usage-drawer__composer-input"
          disabled={isBlocked}
          fieldSize="sm"
          onChange={(event) => setDraft(event.target.value)}
          placeholder={effectivePlaceholder}
          value={draft}
        />
        <IconButton className="tcrm-usage-drawer__send" disabled={isBlocked || draft.trim().length === 0} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
      </form>
    </CrmDrawer>
  );
}

export interface SupportStatusItem {
  id: string;
  label: React.ReactNode;
  icon: IconName;
  status?: React.ReactNode;
  tone?: ComponentTone;
}

export interface SupportStatusSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  services?: SupportStatusItem[];
  accessItems?: SupportStatusItem[];
  planTitle?: React.ReactNode;
  planDescription?: React.ReactNode;
  onViewAll?: () => void;
}

const defaultSupportServices: SupportStatusItem[] = [
  { id: "whatsapp", label: "WhatsApp", icon: "message", status: "operando", tone: "success" },
  { id: "payments", label: "Pagamentos", icon: "coins", status: "operando", tone: "success" },
  { id: "imports", label: "Importação", icon: "upload", status: "atenção", tone: "warning" },
  { id: "agents", label: "Agentes", icon: "users", status: "normal", tone: "success" }
];

const defaultSupportAccessItems: SupportStatusItem[] = [
  { id: "pending", label: "1 pendente", icon: "clock" },
  { id: "active", label: "2 ativos", icon: "checkCircle", tone: "success" },
  { id: "expiring", label: "0 expirando hoje", icon: "clock", tone: "warning" }
];

export function SupportStatusSidebar({
  services = defaultSupportServices,
  accessItems = defaultSupportAccessItems,
  planTitle = "Suporte padrão",
  planDescription = "Resposta estimada: hoje",
  onViewAll,
  className,
  ...props
}: SupportStatusSidebarProps) {
  return (
    <aside className={cn("tcrm-support-status-sidebar", className)} data-component="SupportStatusSidebar" {...props}>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--services">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="barChart" />} title="Status dos serviços" /></List>
        <List className="tcrm-support-status-sidebar__rows" divided>
          {services.map((item) => <ListItem action={item.status ? <Chip tone={item.tone ?? "neutral"}>{item.status}</Chip> : undefined} key={item.id} leading={<Icon name={item.icon} tone={item.tone} />} title={item.label} />)}
        </List>
      </Panel>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--access">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="users" />} title="Acessos temporários" /></List>
        <List className="tcrm-support-status-sidebar__rows" divided>
          {accessItems.map((item) => <ListItem key={item.id} leading={<Icon name={item.icon} tone={item.tone} />} title={item.label} />)}
        </List>
      </Panel>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--plan">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="star" />} title="Prioridade do plano" /></List>
        <div className="tcrm-support-status-sidebar__plan"><strong>{planTitle}</strong><span>{planDescription}</span></div>
      </Panel>
      <Button className="tcrm-support-status-sidebar__view-all" onClick={onViewAll} trailingIcon="chevronRight" variant="ghost">Ver todos os status</Button>
    </aside>
  );
}

export interface SupportAgentPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  placeholder?: React.ReactNode;
  introduction?: React.ReactNode;
  questions?: string[];
  notice?: React.ReactNode;
  onAction?: (actionId: string) => void;
}

export interface SupportCentralWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: React.ReactNode;
  tickets: React.ReactNode;
}

export function SupportCentralWorkspace({ agent, tickets, className, ...props }: SupportCentralWorkspaceProps) {
  return <div className={cn("tcrm-support-central-workspace", className)} data-component="SupportCentralWorkspace" {...props}>{agent}{tickets}</div>;
}

const defaultSupportQuestions = ["WhatsApp desconectou", "Erro na importação", "Dúvida sobre cobrança", "Agente não respondeu", "Configurar Pix"];

export function SupportAgentPanel({
  title = "Agente de suporte 24/7",
  placeholder = "Pergunte ao suporte da Taliya...",
  introduction = "Posso ajudar a diagnosticar integrações, explicar configurações ou abrir um ticket com contexto.",
  questions = defaultSupportQuestions,
  notice = "Para ações sensíveis, o suporte escala para humano e pode pedir autorização.",
  onAction,
  className,
  ...props
}: SupportAgentPanelProps) {
  return (
    <Panel className={cn("tcrm-support-agent-panel", className)} data-component="SupportAgentPanel" {...props}>
      <header className="tcrm-support-agent-panel__header"><Icon name="sparkles" tone="info" /><h2>{title}</h2></header>
      <Button className="tcrm-support-agent-panel__search" leadingIcon="search" onClick={() => onAction?.("compose")} trailingIcon="send" variant="secondary">{placeholder}</Button>
      <p className="tcrm-support-agent-panel__introduction">{introduction}</p>
      <ButtonGroup className="tcrm-support-agent-panel__questions">
        {questions.map((question) => <Button key={question} onClick={() => onAction?.(`question:${question}`)} size="sm" variant="secondary">{question}</Button>)}
      </ButtonGroup>
      <Button className="tcrm-support-agent-panel__ask" leadingIcon="sparkles" onClick={() => onAction?.("ask-support")} size="sm" variant="primary">Perguntar ao suporte 24/7</Button>
      <p className="tcrm-support-agent-panel__notice"><Icon name="lock" />{notice}</p>
    </Panel>
  );
}

export type SupportTicketDrawerState = "open" | "answered" | "access active" | "loading" | "blocked";
export type SupportTicketDrawerAction =
  | "reply"
  | "attach"
  | "request-access"
  | "revoke-access"
  | "import"
  | "audit"
  | "resolve"
  | "use-grant"
  | "reply-studio"
  | "tenant"
  | "revoke";

export interface SupportTicketPanelFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
}

export interface SupportTicketPanelMessage {
  id: string;
  icon: IconName;
  text: React.ReactNode;
  tone?: ComponentTone;
}

export interface SupportTicketDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: SupportTicketDrawerState;
  variant?: "support" | "internal";
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  facts?: SupportTicketPanelFact[];
  summary?: React.ReactNode;
  messages?: SupportTicketPanelMessage[];
  onClose?: () => void;
  onAction?: (actionId: SupportTicketDrawerAction) => void;
}

export function SupportTicketDrawer({
  open = true,
  state = "open",
  variant = "support",
  title = "Importação duplicou alunos",
  subtitle,
  facts,
  summary,
  messages,
  onClose,
  onAction,
  className,
  ...props
}: SupportTicketDrawerProps) {
  if (!open) return null;

  const key = stateKey(state) || "open";

  return (
    <aside
      aria-busy={key === "loading" || undefined}
      aria-label="Detalhes do ticket de suporte"
      className={cn("tcrm-support-ticket-drawer", `tcrm-support-ticket-drawer--${variant}`, className)}
      data-component="SupportTicketDrawer"
      data-state={key}
      role="complementary"
      {...props}
    >
      <SupportTicketPanel
        className="tcrm-support-ticket-drawer__panel"
        onAction={onAction}
        onClose={onClose}
        facts={facts}
        messages={messages}
        state={state}
        subtitle={subtitle}
        summary={summary}
        title={title}
        variant={variant}
      />
    </aside>
  );
}

export type TenantSecurityDrawerState = "security review" | "grant access" | "revoked" | "allowed" | "denied" | "warning" | "loading" | "blocked" | "closed";

export type TenantSummaryDrawerState = "active" | "degraded" | "tenant-blocked" | "risk" | "loading" | "blocked" | "closed";
export type TenantSummaryDrawerGrantState = "none" | "pending" | "active" | "revoked";
export type TenantSummaryDrawerAction =
  | "open-tenant"
  | "support"
  | "grants"
  | "billing"
  | "request-grant"
  | "grant-access"
  | "revoke-access"
  | "audit"
  | "note";

export interface TenantSummaryDrawerFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
}

export interface TenantSummaryDrawerActivity {
  id: string;
  label: React.ReactNode;
  time: React.ReactNode;
}

export interface TenantSummaryDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: TenantSummaryDrawerState;
  grantState?: TenantSummaryDrawerGrantState;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  facts?: TenantSummaryDrawerFact[];
  activities?: TenantSummaryDrawerActivity[];
  onClose?: () => void;
  onAction?: (actionId: TenantSummaryDrawerAction) => void;
}

const defaultTenantSummaryFacts: TenantSummaryDrawerFact[] = [
  { id: "status", label: "Status", value: <span className="tcrm-tenant-summary-drawer__status"><span />Ativo</span>, icon: "calendar", tone: "success" },
  { id: "plan", label: "Plano", value: "Growth", icon: "layout" },
  { id: "agents", label: "Agentes", value: "3 de 3 ativos", icon: "users" },
  { id: "quota", label: "Cota", value: "68% usada", icon: "clock" },
  { id: "billing", label: "Billing", value: "Em dia", icon: "clock" },
  { id: "tickets", label: "Tickets", value: "1 aberto", icon: "inbox" },
  { id: "grant", label: "Grant", value: "Ativo até hoje 18:00", icon: "shield" },
  { id: "incidents", label: "Incidentes", value: "0 críticos", icon: "alert" },
  { id: "owner", label: <>Responsável<br />interno</>, value: "Marina - CS", icon: "user" },
  { id: "activity", label: "Última atividade", value: "hoje 10:24", icon: "clock" }
];

const defaultTenantSummaryActivities: TenantSummaryDrawerActivity[] = [
  { id: "ticket", label: "Ticket de importação atualizado", time: "hoje 10:24" },
  { id: "grant", label: "Grant aprovado pelo dono", time: "hoje 09:18" },
  { id: "quota", label: "Cota chegou a 68%", time: "ontem 18:20" },
  { id: "plan", label: "Plano Growth renovado", time: "12/05" }
];

export function TenantSummaryDrawer({
  open = true,
  state = "active",
  grantState = "active",
  title = "Studio Vila Mariana",
  subtitle = "Cliente ativo da Taliya",
  facts = defaultTenantSummaryFacts,
  activities = defaultTenantSummaryActivities,
  onClose,
  onAction,
  className,
  ...props
}: TenantSummaryDrawerProps) {
  if (!open || state === "closed") return null;
  const disabled = state === "loading" || state === "blocked";
  const isTenantBlocked = state === "tenant-blocked";
  const isDegraded = state === "degraded" || state === "risk";
  const isRisk = isDegraded || isTenantBlocked;
  const healthLabel = isTenantBlocked ? "bloqueado" : isDegraded ? "degradado" : "estável";
  const healthTone: ComponentTone = isTenantBlocked ? "danger" : isDegraded ? "warning" : "success";
  const healthCopy = isTenantBlocked
    ? "O tenant está bloqueado e exige revisão de segurança, billing e incidentes antes de liberar acesso."
    : isDegraded
      ? "Há degradação em billing, cota, suporte ou operação."
      : "Uso regular, billing em dia e suporte ativo em importação.";
  const grantAction: { id: TenantSummaryDrawerAction; label: string; disabled?: boolean } = grantState === "active"
    ? { id: "revoke-access", label: "Revogar acesso" }
    : grantState === "pending"
      ? { id: "grant-access", label: "Aprovar grant" }
      : { id: "grant-access", label: "Conceder acesso" };

  const footer = (
    <div className="tcrm-tenant-summary-drawer__actions">
      <Button disabled={disabled} leadingIcon="externalLink" onClick={() => onAction?.("open-tenant")} size="sm" variant="primary">Abrir tenant</Button>
      <div>
        {([
          ["support", "Ver suporte"], ["grants", "Ver grants"], ["billing", "Ver billing"],
          [grantAction.id, grantAction.label], ["audit", "Ver auditoria"], ["note", "Adicionar nota interna"]
        ] as Array<[TenantSummaryDrawerAction, string]>).map(([id, label]) => <Button disabled={disabled || ((id === "grant-access" || id === "revoke-access") && isTenantBlocked)} key={id} onClick={() => onAction?.(id)} size="sm" variant="secondary">{label}</Button>)}
      </div>
    </div>
  );

  return (
    <CrmDrawer
      aria-label="Resumo do tenant selecionado"
      className={cn("tcrm-tenant-summary-drawer", className)}
      component="TenantSummaryDrawer"
      data-grant-state={grantState}
      footer={footer}
      header={(
        <header className="tcrm-tenant-summary-drawer__header">
          <Chip showDot={false} tone="info">Tenant selecionado</Chip>
          <IconButton disabled={disabled} icon="x" label="Fechar resumo do tenant" onClick={onClose} size="sm" variant="subtle" />
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>
      )}
      loading={state === "loading"}
      state={state}
      title={title}
      {...props}
    >
      <dl className="tcrm-tenant-summary-drawer__facts">
        {facts.map((fact) => (
          <div data-tone={fact.tone} key={fact.id}>
            <Icon name={fact.icon} size="13px" tone={fact.tone} />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-tenant-summary-drawer__health">
        <h3>Saúde da conta <Chip tone={healthTone}>{healthLabel}</Chip></h3>
        <p>
          <Icon name={isRisk ? "alert" : "shieldCheck"} size="18px" tone={healthTone} />
          {healthCopy}
        </p>
      </section>
      <section className="tcrm-tenant-summary-drawer__security">
        <h3>Acesso e segurança</h3>
        <p><Icon name="lock" size="17px" tone="warning" />Dados operacionais exigem grant escopado.</p>
        <small>Alunos, conversas e financeiro do studio não aparecem por padrão.</small>
      </section>
      <section className="tcrm-tenant-summary-drawer__activity">
        <h3>Atividade recente</h3>
        {activities.map((activity) => <p key={activity.id}><span />{activity.label}<time>{activity.time}</time></p>)}
      </section>
      <section className="tcrm-tenant-summary-drawer__copilot">
        <Icon name="sparkles" size="22px" tone="info" />
        <div><h3>Copiloto interno</h3><p>{isTenantBlocked ? "Resumo: revisar o incidente e as restrições antes de qualquer mudança de acesso." : isDegraded ? "Resumo: priorizar a recuperação dos sinais degradados antes de ampliar acesso." : "Resumo: acompanhar o ticket de importação antes do grant expirar. Não há incidente crítico neste tenant."}</p><small><Icon name="info" size="14px" />Apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.</small></div>
      </section>
    </CrmDrawer>
  );
}

export interface TenantSecurityDrawerProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean;
  state?: TenantSecurityDrawerState;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}

function tenantSecurityPanelState(state?: React.ReactNode): "allowed" | "denied" | "warning" {
  const key = stateKey(state);
  if (["revoked", "denied", "blocked", "closed"].includes(key)) return "denied";
  if (["warning", "loading"].includes(key)) return "warning";
  return "allowed";
}

export function TenantSecurityDrawer({
  open = true,
  state = "security review",
  onClose,
  onAction,
  className,
  ...props
}: TenantSecurityDrawerProps) {
  if (!open) return null;

  const key = stateKey(state) || "security-review";

  return (
    <aside
      aria-busy={key === "loading" || undefined}
      aria-label="Drawer de segurança do tenant"
      className={cn("tcrm-tenant-security-drawer", className)}
      data-component="TenantSecurityDrawer"
      data-state={key}
      role="complementary"
      {...props}
    >
      <SecurityRulePanel
        className="tcrm-tenant-security-drawer__panel"
        disabled={key === "loading" || key === "blocked"}
        onAction={(actionId) => {
          if (actionId === "close") {
            onClose?.();
            return;
          }
          onAction?.(actionId);
        }}
        state={tenantSecurityPanelState(state)}
      />
    </aside>
  );
}

export type WeeklyHoursGridState = "editable" | "readonly" | "conflict" | "loading" | "blocked";

export interface WeeklyHoursGridSlot {
  id: string;
  day: string;
  start: string;
  end: string;
  label: string;
  meta?: React.ReactNode;
  tone?: ComponentTone;
}

export interface WeeklyHoursGridProps extends React.HTMLAttributes<HTMLElement> {
  axis?: string[];
  state?: WeeklyHoursGridState;
  days?: string[];
  slots?: WeeklyHoursGridSlot[];
  variant?: "availability" | "schedule";
  onAdjustDay?: () => void;
  onSlotClick?: (slot: WeeklyHoursGridSlot) => void;
}

const weeklyHoursGridDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const weeklyHoursGridAxis = ["07h", "12h", "13h", "21h"];

function defaultWeeklyHoursGridSlots(days = weeklyHoursGridDays): WeeklyHoursGridSlot[] {
  return days.flatMap((day) => [
    { id: `${day}-morning`, day, start: "07:00", end: "12:00", label: "07:00" },
    { id: `${day}-afternoon`, day, start: "13:00", end: "21:00", label: "13:00" }
  ]);
}

export function WeeklyHoursGrid({
  axis = weeklyHoursGridAxis,
  state = "editable",
  days = weeklyHoursGridDays,
  slots = defaultWeeklyHoursGridSlots(days),
  variant = "availability",
  onAdjustDay,
  onSlotClick,
  className,
  ...props
}: WeeklyHoursGridProps) {
  const key = stateKey(state) || "editable";
  const disabled = key === "readonly" || key === "loading" || key === "blocked";
  const slotByDay = new Map(slots.map((slot) => [slot.id, slot]));

  return (
    <section
      aria-busy={key === "loading" || undefined}
      aria-label="Prévia da grade semanal"
      className={cn("tcrm-weekly-hours-grid", className)}
      data-component="WeeklyHoursGrid"
      data-state={key}
      data-variant={variant}
      {...props}
    >
      {variant === "availability" ? <header className="tcrm-weekly-hours-grid__header">
        <h3><span>3.</span> Prévia da grade semanal</h3>
        <button disabled={key === "loading" || key === "blocked"} onClick={() => onAdjustDay?.()} type="button">
          <Icon name="calendar" size="14px" />
          Ajustar horários por dia
        </button>
      </header> : null}
      {variant === "schedule" ? (
        <div className="tcrm-weekly-hours-grid__schedule" role="grid" aria-readonly={disabled || undefined}>
          <div className="tcrm-weekly-hours-grid__header-row" role="row">
            <div aria-label="Horário" className="tcrm-weekly-hours-grid__corner" role="columnheader" />
            {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
          </div>
          <div className="tcrm-weekly-hours-grid__schedule-axis" aria-hidden="true">
            {axis.map((item) => <span key={item}>{item}</span>)}
          </div>
          {days.map((day, dayIndex) => (
            <div className="tcrm-weekly-hours-grid__schedule-column" key={day} role="row" style={{ gridColumn: dayIndex + 2 }}>
              {axis.map((item) => <span className="tcrm-weekly-hours-grid__schedule-cell" key={item} />)}
              {slots.filter((slot) => slot.day === day && slot.label).map((slot) => {
                const hour = `${slot.start.slice(0, 2)}h`;
                const row = Math.max(0, axis.findIndex((item) => item === hour));
                return (
                  <button
                    aria-label={`${day} das ${slot.start} às ${slot.end}: ${slot.label}`}
                    data-tone={slot.tone ?? "neutral"}
                    disabled={disabled}
                    key={slot.id}
                    onClick={() => onSlotClick?.(slot)}
                    role="gridcell"
                    style={{ gridRow: row + 1 }}
                    type="button"
                  >
                    <span>{slot.label}</span>
                    {slot.meta ? <small>{slot.meta}</small> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : <div className="tcrm-weekly-hours-grid__matrix" role="grid" aria-readonly={disabled || undefined}>
        <div className="tcrm-weekly-hours-grid__header-row" role="row">
          <div aria-label="Horário" className="tcrm-weekly-hours-grid__corner" role="columnheader" />
          {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
        </div>
        <div className="tcrm-weekly-hours-grid__axis" aria-hidden="true">
          {axis.map((item) => <span key={item}>{item}</span>)}
        </div>
        {days.map((day) => {
          const morning = slotByDay.get(`${day}-morning`) ?? { id: `${day}-morning`, day, start: "07:00", end: "12:00", label: "07:00" };
          const afternoon = slotByDay.get(`${day}-afternoon`) ?? { id: `${day}-afternoon`, day, start: "13:00", end: "21:00", label: "13:00" };

          return (
            <div className="tcrm-weekly-hours-grid__column" key={day} role="row">
              <button aria-label={`${day} das ${morning.start} às ${morning.end}`} disabled={disabled} onClick={() => onSlotClick?.(morning)} role="gridcell" type="button">
                <span>{morning.label}</span>
              </button>
              <span className="tcrm-weekly-hours-grid__break">{key === "conflict" && day === "Qua" ? "Conflito" : null}</span>
              <button aria-label={`${day} das ${afternoon.start} às ${afternoon.end}`} disabled={disabled} onClick={() => onSlotClick?.(afternoon)} role="gridcell" type="button">
                <span>{afternoon.label}</span>
                <small>21:00</small>
              </button>
            </div>
          );
        })}
      </div>}
      {variant === "availability" ? <p>Essa grade define quando o studio pode ter aulas. As turmas e horários específicos serão configurados nos próximos blocos.</p> : null}
    </section>
  );
}

export type RoleCardState = "owner" | "admin" | "staff" | "blocked" | "loading";

const roleCardCopy: Record<RoleCardState, { role: string; status: string; tone: ComponentTone; name: string; email: string; phone: string }> = {
  owner: {
    role: "Dono/Admin",
    status: "Confirmado",
    tone: "success",
    name: "Letícia Ramos",
    email: "leticia@studio.com",
    phone: "(11) 99999-0000"
  },
  admin: {
    role: "Admin",
    status: "Confirmado",
    tone: "success",
    name: "Marina Costa",
    email: "marina@studio.com",
    phone: "(11) 98888-1111"
  },
  staff: {
    role: "Professor",
    status: "Convite preparado",
    tone: "info",
    name: "Ana Martins",
    email: "ana@studio.com",
    phone: "(11) 98888-1111"
  },
  blocked: {
    role: "Dono/Admin",
    status: "Bloqueado",
    tone: "blocked",
    name: "Letícia Ramos",
    email: "leticia@studio.com",
    phone: "(11) 99999-0000"
  },
  loading: {
    role: "Carregando",
    status: "Carregando",
    tone: "neutral",
    name: "Carregando",
    email: "aguarde",
    phone: "aguarde"
  }
};

export interface RoleCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  state?: RoleCardState;
  name?: React.ReactNode;
  roleLabel?: React.ReactNode;
  email?: React.ReactNode;
  phone?: React.ReactNode;
  statusLabel?: React.ReactNode;
  avatarSrc?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (state: RoleCardState) => void;
  onOpen?: () => void;
}

export function RoleCard({
  state = "owner",
  name,
  roleLabel,
  email,
  phone,
  statusLabel,
  avatarSrc,
  selected = false,
  disabled = false,
  onSelect,
  onOpen,
  className,
  ...props
}: RoleCardProps) {
  const key = roleCardCopy[state] ? state : "owner";
  const copy = roleCardCopy[key];
  const isLoading = key === "loading";
  const isBlocked = key === "blocked" || disabled;
  const interactive = Boolean(onSelect || onOpen);
  const displayName = name ?? copy.name;
  const displayRole = roleLabel ?? copy.role;
  const displayEmail = email ?? copy.email;
  const displayPhone = phone ?? copy.phone;
  const displayStatus = statusLabel ?? copy.status;

  const content = (
    <>
      <span className="tcrm-role-card__identity">
        <Avatar className="tcrm-role-card__avatar" disabled={isBlocked} name={String(displayName)} size="md" src={avatarSrc} />
        <span>
          <strong>{displayName}</strong>
          <small>{displayRole}</small>
        </span>
      </span>
      <span className="tcrm-role-card__field">
        <small>E-mail</small>
        <strong>{displayEmail}</strong>
      </span>
      <span className="tcrm-role-card__field">
        <small>WhatsApp</small>
        <strong>{displayPhone}</strong>
      </span>
      <span className="tcrm-role-card__status">
        <small>Status</small>
        <Chip icon={copy.tone === "success" ? "checkCircle" : copy.tone === "blocked" ? "lock" : undefined} tone={copy.tone}>
          {displayStatus}
        </Chip>
      </span>
    </>
  );

  const classes = cn(
    "tcrm-role-card",
    `tcrm-role-card--${key}`,
    selected && "tcrm-role-card--selected",
    interactive && "tcrm-role-card--interactive",
    className
  );

  if (interactive) {
    return (
      <button
        aria-busy={isLoading || undefined}
        aria-disabled={isBlocked || undefined}
        aria-pressed={selected || undefined}
        className={classes}
        data-component="RoleCard"
        data-state={key}
        disabled={isBlocked || isLoading}
        onClick={() => {
          onSelect?.(key);
          onOpen?.();
        }}
        type="button"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <article
      aria-busy={isLoading || undefined}
      aria-disabled={isBlocked || undefined}
      aria-label={`${displayName} ${displayRole}`}
      className={classes}
      data-component="RoleCard"
      data-state={key}
      {...props}
    >
      {content}
    </article>
  );
}

export type InviteRowState = "prepared" | "accepted" | "incomplete" | "expired" | "loading" | "blocked";

export interface InviteRowData {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
}

const inviteRowCopy: Record<InviteRowState, InviteRowData & { status: string; statusTone: "prepared" | "success" | "warning" | "danger" | "disabled" }> = {
  prepared: {
    id: "ana-martins",
    name: "Ana Martins",
    initials: "AM",
    role: "Professor",
    email: "ana@studio.com",
    phone: "(11) 98888-1111",
    status: "Convite preparado",
    statusTone: "prepared"
  },
  accepted: {
    id: "carla-souza",
    name: "Carla Souza",
    initials: "CS",
    role: "Recepção",
    email: "carla@studio.com",
    phone: "(11) 97777-2222",
    status: "Confirmado",
    statusTone: "success"
  },
  incomplete: {
    id: "roberto-lima",
    name: "Roberto Lima",
    initials: "RL",
    role: "Financeiro",
    email: "roberto@studio.com",
    phone: "(11) 96666-3333",
    status: "Dados incompletos",
    statusTone: "warning"
  },
  expired: {
    id: "marina-costa",
    name: "Marina Costa",
    initials: "MC",
    role: "Professor",
    email: "marina@studio.com",
    phone: "(11) 95555-4444",
    status: "Convite expirado",
    statusTone: "danger"
  },
  loading: {
    id: "loading",
    name: "Carregando equipe",
    initials: "CE",
    role: "Aguardando",
    email: "carregando@studio.com",
    phone: "(11) 90000-0000",
    status: "Atualizando",
    statusTone: "prepared"
  },
  blocked: {
    id: "blocked",
    name: "Acesso bloqueado",
    initials: "AB",
    role: "Sem acesso",
    email: "bloqueado@studio.com",
    phone: "(11) 90000-0000",
    status: "Bloqueado",
    statusTone: "disabled"
  }
};

export interface InviteRowProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  state?: InviteRowState;
  invite?: Partial<InviteRowData>;
  selected?: boolean;
  onOpen?: (invite: InviteRowData, state: InviteRowState) => void;
  onEdit?: (invite: InviteRowData, state: InviteRowState) => void;
  onRemove?: (invite: InviteRowData, state: InviteRowState) => void;
}

export function InviteRow({
  state = "prepared",
  invite,
  selected = false,
  onOpen,
  onEdit,
  onRemove,
  className,
  onClick,
  onKeyDown,
  ...props
}: InviteRowProps) {
  const source = inviteRowCopy[state];
  const row = { ...source, ...invite };
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isDisabled = isLoading || isBlocked;

  const handleOpen = () => {
    if (!isDisabled) onOpen?.(row, state);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) handleOpen();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (!onOpen || isDisabled || event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <article
      aria-busy={isLoading || undefined}
      aria-label={`${row.name}, ${row.role}, ${row.status}`}
      className={cn(
        "tcrm-invite-row",
        onOpen && "tcrm-invite-row--interactive",
        selected && "tcrm-invite-row--selected",
        isLoading && "tcrm-invite-row--loading",
        isBlocked && "tcrm-invite-row--blocked",
        className
      )}
      data-component="InviteRow"
      data-state={state}
      role="listitem"
      {...props}
    >
      {onOpen ? (
        <Button
          aria-label={`Abrir ${row.name}`}
          aria-pressed={selected}
          className="tcrm-invite-row__open"
          disabled={isDisabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          variant="ghost"
        />
      ) : null}
      <span className="tcrm-invite-row__person">
        <Avatar aria-hidden="true" className="tcrm-invite-row__avatar" name={row.name} size="sm" />
        <strong>{row.name}</strong>
      </span>
      <span className="tcrm-invite-row__cell">{row.role}</span>
      <span className="tcrm-invite-row__cell">{row.email}</span>
      <span className="tcrm-invite-row__cell">{row.phone}</span>
      <span className="tcrm-invite-row__status" data-tone={source.statusTone} role="status">
        {source.statusTone === "warning" ? <Icon name="alert" /> : <span className="tcrm-invite-row__status-dot" />}
        <span>{source.status}</span>
      </span>
      <span className="tcrm-invite-row__actions" onClick={(event) => event.stopPropagation()}>
        <IconButton
          disabled={isDisabled}
          icon="edit"
          label={`Editar ${row.name}`}
          onClick={() => onEdit?.(row, state)}
          size="sm"
          variant="ghost"
        />
        <IconButton
          disabled={isDisabled}
          icon="trash"
          label={`Remover ${row.name}`}
          onClick={() => onRemove?.(row, state)}
          size="sm"
          variant="ghost"
        />
      </span>
    </article>
  );
}

export type PaymentMethodRowMethod = "pix" | "cash" | "card";
export type PaymentMethodRowState = "selected" | "connected" | "failed" | "disabled" | "loading";

const paymentMethodRowCopy: Record<PaymentMethodRowMethod, { title: string; description: string; icon: IconName }> = {
  pix: { title: "Pix", description: "Pagamento por Pix", icon: "wallet" },
  cash: { title: "Dinheiro", description: "Recebido presencialmente", icon: "banknote" },
  card: { title: "Cartão", description: "Cartão presencial", icon: "creditCard" }
};

export interface PaymentMethodRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  method?: PaymentMethodRowMethod;
  state?: PaymentMethodRowState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  onSelect?: (method: PaymentMethodRowMethod, state: PaymentMethodRowState) => void;
}

function PaymentMethodMark({ method }: { method: PaymentMethodRowMethod }) {
  if (method === "pix") {
    return (
      <span className="tcrm-payment-method-row__pix-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  return <Icon name={paymentMethodRowCopy[method].icon} strokeWidth={method === "cash" ? 1.7 : 1.9} />;
}

export function PaymentMethodRow({
  method = "pix",
  state = "selected",
  title,
  description,
  selected,
  disabled,
  onSelect,
  className,
  onClick,
  ...props
}: PaymentMethodRowProps) {
  const copy = paymentMethodRowCopy[method];
  const isSelected = selected ?? state === "selected";
  const isDisabled = disabled || state === "disabled" || state === "loading";
  const resolvedTitle = title ?? copy.title;
  const resolvedDescription = description ?? (state === "failed" ? "Precisa revisar" : copy.description);

  return (
    <button
      aria-busy={state === "loading" || undefined}
      aria-pressed={isSelected}
      className={cn(
        "tcrm-payment-method-row",
        isSelected && "tcrm-payment-method-row--selected",
        state === "failed" && "tcrm-payment-method-row--failed",
        state === "loading" && "tcrm-payment-method-row--loading",
        isDisabled && "tcrm-payment-method-row--disabled",
        className
      )}
      data-component="PaymentMethodRow"
      data-method={method}
      data-state={state}
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onSelect?.(method, state);
      }}
      type="button"
      {...props}
    >
      <span className={cn("tcrm-payment-method-row__mark", `tcrm-payment-method-row__mark--${method}`)}>
        <PaymentMethodMark method={method} />
      </span>
      <span className="tcrm-payment-method-row__body">
        <strong>{resolvedTitle}</strong>
        {state === "connected" ? <Chip showDot={false} tone="success">Ativo</Chip> : null}
        <span>{resolvedDescription}</span>
      </span>
      {isSelected ? (
        <span className="tcrm-payment-method-row__check" aria-hidden="true">
          <Icon name="check" />
        </span>
      ) : null}
      {state === "failed" ? (
        <span className="tcrm-payment-method-row__state-icon" aria-hidden="true">
          <Icon name="alert" />
        </span>
      ) : null}
    </button>
  );
}

export function SecurePaymentNotice({
  state = "secure",
  compact = false,
  className,
  action,
  title = state === "failed" ? "Pagamento exige atenção" : "Pagamento seguro",
  children = "A Taliya não coleta dados de cartão. A confirmação acontece pelo ambiente seguro de pagamento.",
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  state?: "secure" | "pending" | "failed";
  compact?: boolean;
  action?: React.ReactNode;
  title?: string;
}) {
  return (
    <InlineAlert
      className={cn("tcrm-secure-payment-notice", compact && "tcrm-secure-payment-notice--compact", className)}
      icon="shield"
      action={action}
      title={title}
      tone={state === "failed" ? "danger" : state === "pending" ? "warning" : "success"}
      {...props}
    >
      {children}
    </InlineAlert>
  );
}

export type UsageOriginRowOrigin =
  | "attendance"
  | "agenda"
  | "sales"
  | "finance"
  | "other"
  | "message"
  | "automation"
  | "import"
  | "adjustment";

export type UsageOriginRowState = "source" | "selected" | "loading" | "disabled" | "blocked";

const usageOriginKinds = ["attendance", "agenda", "sales", "finance", "other", "message", "automation", "import", "adjustment"] as const;

const usageOriginRowDefaults: Record<UsageOriginRowOrigin, { label: string; amount: string; percent: number; visualPercent: number; icon: IconName }> = {
  attendance: { label: "Atendimento", amount: "2.400", percent: 38, visualPercent: 55, icon: "message" },
  agenda: { label: "Agenda", amount: "1.600", percent: 25, visualPercent: 36, icon: "calendar" },
  sales: { label: "Vendas", amount: "1.200", percent: 19, visualPercent: 27, icon: "trendingUp" },
  finance: { label: "Financeiro", amount: "700", percent: 11, visualPercent: 12, icon: "creditCard" },
  other: { label: "Outros", amount: "400", percent: 7, visualPercent: 6, icon: "ellipsis" },
  message: { label: "Atendimento", amount: "2.400", percent: 38, visualPercent: 55, icon: "message" },
  automation: { label: "Automacao", amount: "900", percent: 14, visualPercent: 18, icon: "bot" },
  import: { label: "Importacao", amount: "700", percent: 11, visualPercent: 12, icon: "upload" },
  adjustment: { label: "Ajuste manual", amount: "400", percent: 7, visualPercent: 6, icon: "ellipsis" }
};

export interface UsageOriginRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  origin?: UsageOriginRowOrigin;
  state?: UsageOriginRowOrigin | UsageOriginRowState;
  title?: React.ReactNode;
  amount?: React.ReactNode;
  percent?: number;
  visualPercent?: number;
  icon?: IconName;
  onSelect?: (origin: UsageOriginRowOrigin, state: UsageOriginRowState) => void;
}

function isUsageOrigin(value: unknown): value is UsageOriginRowOrigin {
  return usageOriginKinds.includes(value as UsageOriginRowOrigin);
}

function UsageOriginRowIcon({ origin, icon }: { origin: UsageOriginRowOrigin; icon: IconName }) {
  if (origin === "attendance" || origin === "message") {
    return (
      <span className="tcrm-usage-origin-row__attendance-icon" aria-hidden="true">
        <span />
        <i />
      </span>
    );
  }
  return <Icon name={icon} />;
}

export function UsageOriginRow({
  origin,
  title,
  amount,
  percent,
  visualPercent,
  icon,
  state = "source",
  onSelect,
  className,
  disabled,
  ...props
}: UsageOriginRowProps) {
  const effectiveOrigin = origin ?? (isUsageOrigin(state) ? state : "attendance");
  const effectiveState: UsageOriginRowState = isUsageOrigin(state) ? "source" : state;
  const defaults = usageOriginRowDefaults[effectiveOrigin];
  const displayLabel = title ?? defaults.label;
  const displayAmount = amount ?? defaults.amount;
  const displayPercent = Math.max(0, Math.min(100, percent ?? defaults.percent));
  const displayVisualPercent = Math.max(0, Math.min(100, visualPercent ?? defaults.visualPercent));
  const isLoading = effectiveState === "loading";
  const isDisabled = disabled || isLoading || effectiveState === "disabled" || effectiveState === "blocked";

  return (
    <button
      aria-busy={isLoading || undefined}
      aria-pressed={effectiveState === "selected" ? "true" : undefined}
      className={cn("tcrm-usage-origin-row", className)}
      data-component="UsageOriginRow"
      data-origin={effectiveOrigin}
      data-state={effectiveState}
      disabled={isDisabled}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) onSelect?.(effectiveOrigin, effectiveState);
      }}
      style={{ "--tcrm-usage-origin-row-percent": `${displayVisualPercent}%` } as React.CSSProperties}
      type="button"
      {...props}
    >
      <span className="tcrm-usage-origin-row__icon" aria-hidden="true">
        <UsageOriginRowIcon origin={effectiveOrigin} icon={icon ?? defaults.icon} />
      </span>
      <span className="tcrm-usage-origin-row__label">{displayLabel}</span>
      <span className="tcrm-usage-origin-row__progress" aria-hidden="true">
        <span />
      </span>
      <span className="tcrm-usage-origin-row__amount">{displayAmount}</span>
      <span className="tcrm-usage-origin-row__percent">({displayPercent}%)</span>
    </button>
  );
}

export type ExportActionState = "default" | "menu" | "loading" | "disabled" | "blocked";

export interface ExportActionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  state?: ExportActionState;
  actions?: DropdownAction[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: () => void;
  onActionSelect?: (action: DropdownAction) => void;
}

export function ExportAction({
  label = "Exportar",
  loading = false,
  disabled = false,
  state = "default",
  actions,
  open,
  defaultOpen = false,
  onOpenChange,
  onExport,
  onActionSelect,
  className,
  ...props
}: ExportActionProps) {
  const hasMenu = Boolean(actions?.length);
  const effectiveState: ExportActionState = loading ? "loading" : disabled ? "disabled" : state;
  const isLoading = effectiveState === "loading";
  const isDisabled = effectiveState === "loading" || effectiveState === "disabled" || effectiveState === "blocked";
  const menuActions = actions?.map((action) => ({
    ...action,
    onSelect: () => {
      action.onSelect?.();
      onActionSelect?.(action);
    }
  }));

  return (
    <div
      className={cn("tcrm-export-action", className)}
      data-component="ExportAction"
      data-state={effectiveState}
      {...props}
    >
      {hasMenu ? (
        <DropdownMenu
          actions={menuActions ?? []}
          className="tcrm-export-action__menu-root"
          defaultOpen={defaultOpen || state === "menu"}
          label={String(label)}
          onOpenChange={onOpenChange}
          open={open}
          trigger={({ id, isOpen, label: triggerLabel, onClick, onKeyDown }) => (
            <Button
              aria-busy={isLoading || undefined}
              aria-controls={id}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              className="tcrm-export-action__trigger"
              disabled={isDisabled}
              leadingIcon={isLoading ? "loader" : "upload"}
              onClick={onClick}
              onKeyDown={onKeyDown}
              type="button"
              variant="secondary"
            >
              {triggerLabel}
            </Button>
          )}
        />
      ) : (
        <Button
          aria-busy={isLoading || undefined}
          className="tcrm-export-action__trigger"
          disabled={isDisabled}
          leadingIcon={isLoading ? "loader" : "upload"}
          onClick={onExport}
          type="button"
          variant="secondary"
        >
          {label}
        </Button>
      )}
    </div>
  );
}

export interface CrmDomainAction {
  id: string;
  label: React.ReactNode;
  icon?: IconName;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export interface CrmDomainMetric {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: ComponentTone;
  helperText?: React.ReactNode;
  icon?: IconName;
  progressValue?: number;
}

interface CrmDomainFact {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export function DomainActions({
  actions,
  onAction,
  className
}: {
  actions?: CrmDomainAction[];
  onAction?: (actionId: string) => void;
  className?: string;
}) {
  if (!actions?.length) return null;

  return (
    <div className={cn("tcrm-domain-actions", className)}>
      {actions.map((action, index) => (
        <Button
          disabled={action.disabled}
          key={action.id}
          leadingIcon={action.icon}
          onClick={() => onAction?.(action.id)}
          size="sm"
          variant={action.variant ?? (index === 0 ? "primary" : "secondary")}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

function DomainFactList({ facts }: { facts?: CrmDomainFact[] }) {
  if (!facts?.length) return null;

  return (
    <dl className="tcrm-domain-facts">
      {facts.map((fact, index) => (
        <div key={index}>
          <dt>
            {fact.icon ? <Icon name={fact.icon} size="sm" tone={fact.tone ?? "current"} /> : null}
            {fact.label}
          </dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface AgentCardData {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  routines: React.ReactNode;
  flows: React.ReactNode;
  state?: "active" | "draft" | "attention" | "not-contracted" | "paused" | "blocked";
  icon?: IconName;
  selected?: boolean;
}

export interface AgentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect">, Partial<AgentCardData> {
  actionLabel?: React.ReactNode;
  disabled?: boolean;
  onOpen?: (agentId: string) => void;
}

const defaultAgentCards: AgentCardData[] = [
  { id: "atendimento", title: "Atendimento", description: "Conversas, triagem, handoff e privacidade", routines: 2, flows: 10, state: "active", icon: "messageMore" },
  { id: "agenda", title: "Agenda", description: "Presença, faltas, reposições, vagas e grade", routines: 5, flows: 16, state: "draft", icon: "calendar", selected: true },
  { id: "vendas", title: "Vendas", description: "Leads, experimental, follow-up e matrícula", routines: 3, flows: 15, state: "active", icon: "trendingUp" },
  { id: "financeiro", title: "Financeiro", description: "Cobranças, pagamentos, contratos e exceções", routines: 3, flows: 15, state: "active", icon: "wallet" },
  { id: "retencao", title: "Retenção", description: "Risco, cancelamento, reativação e reclamações", routines: 2, flows: 13, state: "attention", icon: "shieldAlert" },
  { id: "governanca", title: "Gestão/Governança", description: "Operação, cotas, incidentes, auditoria e qualidade", routines: 3, flows: 15, state: "active", icon: "shieldStar" },
  { id: "historico", title: "Histórico/Evolução", description: "Contexto de aula, notas, documentos e evolução do aluno", routines: 2, flows: 12, state: "active", icon: "book" }
];

function agentStateLabel(state?: AgentCardData["state"]) {
  switch (state) {
    case "draft":
      return "Rascunho simulado";
    case "attention":
      return "Com atenção";
    case "not-contracted":
      return "Não contratado";
    case "paused":
      return "Pausado";
    case "blocked":
      return "Bloqueado";
    default:
      return "Ativo";
  }
}

export function AgentCard({
  id = "agenda",
  title = "Agenda",
  description = "Presença, faltas, reposições, vagas e grade",
  routines = 5,
  flows = 16,
  state = "active",
  icon = "bot",
  selected = false,
  actionLabel,
  disabled = false,
  onOpen,
  className,
  children,
  ...props
}: AgentCardProps) {
  const blocked = disabled || state === "blocked" || state === "not-contracted";

  return (
    <Card
      className={cn("tcrm-agent-card", className)}
      data-agent-id={id}
      disabled={blocked}
      interactive={Boolean(onOpen) && !blocked}
      role="listitem"
      selected={selected}
      {...props}
    >
      <span className="tcrm-agent-card__icon">
        <Icon name={icon} size="lg" tone="info" />
      </span>
      <div className="tcrm-agent-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <InlineGroup compact wrap>
          <span>{routines} rotinas</span>
          <span aria-hidden="true">·</span>
          <span>{flows} fluxos</span>
        </InlineGroup>
        <Chip showDot={false} tone={toneForState(state)}>{agentStateLabel(state)}</Chip>
      </div>
      {children}
      <Button disabled={blocked} onClick={() => onOpen?.(id)} size="sm" variant={selected ? "primary" : "secondary"}>
        {actionLabel ?? (selected ? `Abrir ${title}` : "Ver agente")}
      </Button>
    </Card>
  );
}

export type AgentRoutineCardState = "simulated" | "draft" | "published" | "blocked";

export interface AgentRoutineCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  flowCount?: React.ReactNode;
  icon?: IconName;
  state?: AgentRoutineCardState;
  selected?: boolean;
  actionLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onOpen?: (routineId: string) => void;
}

function agentRoutineCardStatus(state: AgentRoutineCardState) {
  switch (state) {
    case "simulated":
      return { label: "Rascunho simulado", tone: "info" as ComponentTone };
    case "published":
      return { label: "Publicada", tone: "success" as ComponentTone };
    case "blocked":
      return { label: "Bloqueada", tone: "danger" as ComponentTone };
    default:
      return { label: "Não publicada", tone: "neutral" as ComponentTone };
  }
}

export function AgentRoutineCard({
  id = "presenca",
  title = "Presença e faltas",
  description = "Confirmação, falta avisada, no-show e correção de presença",
  flowCount = "4 fluxos",
  icon = "calendar",
  state = "draft",
  selected = false,
  actionLabel = "Abrir rotina",
  statusLabel,
  onOpen,
  className,
  ...props
}: AgentRoutineCardProps) {
  const blocked = state === "blocked";
  const status = agentRoutineCardStatus(state);

  return (
    <Card
      className={cn("tcrm-agent-card", "tcrm-agent-routine-card", className)}
      data-component="AgentRoutineCard"
      data-routine-id={id}
      data-state={state}
      disabled={blocked}
      interactive={Boolean(onOpen) && !blocked}
      role="listitem"
      selected={selected}
      {...props}
    >
      <span className="tcrm-agent-card__icon">
        <Icon name={icon} size="lg" tone="info" />
      </span>
      <div className="tcrm-agent-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <InlineGroup compact wrap>
          <span>{flowCount}</span>
        </InlineGroup>
        <Chip showDot={false} tone={status.tone}>{statusLabel ?? status.label}</Chip>
      </div>
      <Button disabled={blocked} onClick={() => onOpen?.(id)} size="sm" variant="primary">
        {actionLabel}
      </Button>
    </Card>
  );
}

export interface AgentFlowSectionPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  kind?: "mode" | "content";
  density?: "default" | "compact";
  columns?: 1 | 2 | 3 | 4;
  gridDensity?: "default" | "compact";
}

export function AgentFlowSectionPanel({
  title,
  description,
  kind = "content",
  density = "default",
  columns,
  gridDensity = "default",
  children,
  className,
  ...props
}: AgentFlowSectionPanelProps) {
  return (
    <Panel
      className={cn(
        "tcrm-agent-flow-section-panel",
        Boolean(description) && "tcrm-agent-flow-section-panel--has-description",
        kind === "mode" && "tcrm-agent-flow-section-panel--mode",
        density !== "default" && `tcrm-agent-flow-section-panel--${density}`,
        className
      )}
      data-component="AgentFlowSectionPanel"
      data-kind={kind}
      {...props}
    >
      <div className="tcrm-agent-flow-section-panel__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="tcrm-agent-flow-section-panel__body">
        {columns ? <DashboardGrid columns={columns} density={gridDensity}>{children}</DashboardGrid> : children}
      </div>
    </Panel>
  );
}

export interface AgentFlowSettingsPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
}

export function AgentFlowSettingsPanel({
  title = "Ajustes deste fluxo",
  children,
  className,
  ...props
}: AgentFlowSettingsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-agent-flow-settings-panel", className)} data-component="AgentFlowSettingsPanel" {...props}>
      {title ? <h3>{title}</h3> : null}
      {children}
    </Panel>
  );
}

export interface AgentFlowActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AgentFlowActionBar({ children, className, ...props }: AgentFlowActionBarProps) {
  return (
    <ButtonGroup className={cn("tcrm-agent-flow-action-bar", className)} {...props}>
      {children}
    </ButtonGroup>
  );
}

export interface AgentRoutineFlowCardFact {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface AgentRoutineFlowCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  icon?: IconName;
  iconTone?: ComponentTone;
  facts?: AgentRoutineFlowCardFact[];
  status?: React.ReactNode;
  statusTone?: ComponentTone;
  actionLabel?: React.ReactNode;
  onOpen?: (flowId: string) => void;
}

export function AgentRoutineFlowCard({
  id = "flow",
  title,
  description,
  badge,
  badgeTone = "info",
  icon = "calendar",
  iconTone = "info",
  facts = [],
  status = "Pronto",
  statusTone = "success",
  actionLabel = "Ver e ajustar",
  onOpen,
  className,
  ...props
}: AgentRoutineFlowCardProps) {
  return (
    <Card
      className={cn("tcrm-agent-routine-flow-card", className)}
      data-component="AgentRoutineFlowCard"
      data-flow-id={id}
      interactive={Boolean(onOpen)}
      role="listitem"
      {...props}
    >
      <div className="tcrm-agent-routine-flow-card__summary">
        <span className="tcrm-agent-routine-flow-card__icon">
          <Icon name={icon} size="lg" tone={iconTone} />
        </span>
        <div className="tcrm-agent-routine-flow-card__copy">
          <div className="tcrm-agent-routine-flow-card__title-row">
            <h3>{title}</h3>
            {badge ? <Chip showDot={false} tone={badgeTone}>{badge}</Chip> : null}
          </div>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {facts.length ? (
        <dl className="tcrm-agent-routine-flow-card__facts">
          {facts.map((fact, index) => (
            <div className="tcrm-agent-routine-flow-card__fact" key={index}>
              <Icon name={fact.icon ?? "checkCircle"} size="sm" tone={fact.tone ?? "current"} />
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="tcrm-agent-routine-flow-card__footer">
        <div className="tcrm-agent-routine-flow-card__status">
          <span>Status</span>
          <Chip showDot={false} tone={statusTone}>{status}</Chip>
        </div>
        <Button onClick={() => onOpen?.(id)} size="sm" variant="primary">
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
}

export function AgentCatalog({
  agents = defaultAgentCards,
  empty = false,
  onAgentOpen,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  agents?: AgentCardData[];
  empty?: boolean;
  onAgentOpen?: (agentId: string) => void;
}) {
  if (empty) {
    return (
      <Panel className={cn("tcrm-agent-catalog", className)} {...props}>
        <EmptyState action={<Button leadingIcon="plus">Contratar agente</Button>} title="Nenhum agente configurado" />
      </Panel>
    );
  }

  return (
    <div className={cn("tcrm-agent-catalog", className)} role="list" {...props}>
      {children ?? agents.map((agent) => <AgentCard key={agent.id} {...agent} onOpen={onAgentOpen} />)}
    </div>
  );
}

export interface ModeCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  mode: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  density?: "flow" | "routine" | "reference";
  selected?: boolean;
  recommended?: boolean;
  locked?: boolean;
  onSelect?: (mode: string) => void;
}

export function ModeCard({
  mode,
  title,
  description,
  icon = "bot",
  density = "flow",
  selected = false,
  recommended = false,
  locked = false,
  disabled,
  onSelect,
  className,
  type = "button",
  ...props
}: ModeCardProps) {
  const blocked = disabled || locked;

  return (
    <button
      aria-pressed={selected}
      className={cn(
        "tl-card",
        "tcrm-mode-card",
        `tcrm-mode-card--${density}`,
        selected && "tcrm-mode-card--selected",
        blocked && "tl-card--disabled",
        className
      )}
      disabled={blocked}
      onClick={() => onSelect?.(mode)}
      type={type}
      {...props}
    >
      <span className="tcrm-mode-card__icon">
        <Icon name={locked ? "lock" : icon} size="lg" tone={locked ? "paused" : "info"} />
      </span>
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {recommended ? <Chip tone="info">Padrão</Chip> : null}
      {selected ? (
        <span aria-hidden="true" className="tcrm-mode-card__check">
          <Icon name="check" size={12} tone="current" />
        </span>
      ) : null}
    </button>
  );
}

export function ModeSelector({
  value = "autonomo-excecoes",
  variant = "flow",
  modes,
  onChange,
  className
}: {
  value?: string;
  variant?: "flow" | "routine" | "reference";
  modes?: ModeCardProps[];
  onChange?: (mode: string) => void;
  className?: string;
}) {
  const routineOptions: ModeCardProps[] = [
    { mode: "humano", title: "Mais humano", description: "A equipe decide e executa. A Taliya organiza tarefas e rascunhos.", icon: "users", density: "routine" },
    { mode: "equilibrado", title: "Equilibrado", description: "A Taliya executa o simples e chama a equipe nos pontos sensíveis.", icon: "scale", density: "routine" },
    { mode: "autonomo", title: "Mais autônomo", description: "A Taliya conduz o máximo possível dentro dos limites publicados.", icon: "rocket", density: "routine", recommended: true }
  ];
  const flowOptions: ModeCardProps[] = [
    { mode: "manual", title: "Manual", icon: "hand", density: "flow" },
    { mode: "copiloto", title: "Copiloto", icon: "bot", density: "flow" },
    { mode: "autonomo-aprovacao", title: <>Autônomo<br />com aprovação</>, icon: "shield", density: "flow" },
    { mode: "autonomo-excecoes", title: <>Autônomo<br />com exceções</>, icon: "rocket", density: "flow" },
    { mode: "autonomo", title: "Autônomo", icon: "lock", density: "flow", locked: true }
  ];
  const referenceOptions: ModeCardProps[] = [
    { mode: "manual", title: "Manual", description: "Executa apenas com acao humana.", density: "reference" },
    { mode: "copiloto", title: "Copiloto", description: "Sugere e aguarda aprovacao.", density: "reference", recommended: true },
    { mode: "autonomo", title: "Autonomo", description: "Executa end-to-end.", density: "reference" },
    { mode: "politica", title: "Bloqueado por politica", description: "Proibido por politica da empresa.", density: "reference", locked: true },
    { mode: "plano", title: "Bloqueado por plano/cota", description: "Recurso indisponivel no plano.", density: "reference", locked: true }
  ];
  const options = modes ?? (variant === "routine" ? routineOptions : variant === "reference" ? referenceOptions : flowOptions);

  if (variant === "reference") {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-mode-selector-reference", className)} data-component="ModeSelector">
      <Reference15Header number={2} title="Configuracao de modo por fluxo" />
      <div aria-label="Modo do agente" className="tcrm-mode-selector tcrm-mode-selector--reference" role="group">
        {options.map((mode) => <ModeCard key={mode.mode} {...mode} onSelect={onChange} selected={mode.mode === value} />)}
      </div>
    </Panel>;
  }

  return (
    <div aria-label="Modo do agente" className={cn("tcrm-mode-selector", `tcrm-mode-selector--${variant}`, className)} role="group">
      {options.map((mode) => (
        <ModeCard key={mode.mode} density={variant} {...mode} onSelect={onChange} selected={mode.mode === value} />
      ))}
    </div>
  );
}

export type AgentRoutineWorkspaceAction = "simulate" | "adjust-flows" | "review-approvals" | "prepare-publication";

export interface AgentRoutineWorkspaceFlow extends Omit<AgentRoutineFlowCardProps, "onOpen"> {
  id: string;
}

export interface AgentRoutineWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: string;
  flows?: AgentRoutineWorkspaceFlow[];
  onModeChange?: (mode: string) => void;
  onFlowOpen?: (flowId: string) => void;
  onAction?: (action: AgentRoutineWorkspaceAction) => void;
}

const defaultAgentRoutineWorkspaceFlows: AgentRoutineWorkspaceFlow[] = [
  { id: "confirmacao", title: "Confirmação de presença", icon: "calendar", badge: "Autônomo", badgeTone: "success", description: "Antes da aula, a Taliya envia confirmação para os alunos, registra quem confirmou e deixa pendente quem não respondeu.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "enviar confirmação e registrar resposta" }, { icon: "alert", label: "Chama equipe:", value: "falha de envio ou conflito" }] },
  { id: "falta-aviso", title: "Falta com aviso", icon: "bell", badge: "Autônomo com exceções", description: "Quando o aluno avisa que vai faltar, a Taliya verifica a regra de reposição. Se estiver tudo dentro da regra, organiza o próximo passo.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "organizar reposição ou próxima tarefa" }, { icon: "alert", label: "Chama equipe:", value: "fora da regra ou sem vaga" }] },
  { id: "no-show", title: "No-show", icon: "user", badge: "Autônomo com exceções", description: "Depois da aula, a Taliya identifica quem faltou sem avisar, tenta recuperar o contato e chama a equipe se houver risco ou recorrência.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "tentar contato e marcar acompanhamento" }, { icon: "alert", label: "Chama equipe:", value: "risco, recorrência ou resposta sensível" }] },
  { id: "correcao", title: "Correção de presença", icon: "edit", iconTone: "warning", badge: "Autônomo com aprovação", badgeTone: "warning", description: "Quando alguém pede correção depois da chamada, a Taliya prepara a alteração, mostra o impacto e só muda o histórico depois de aprovação.", status: "Precisa aprovação", statusTone: "warning", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "preparar alteração e impacto" }, { icon: "alert", label: "Chama equipe:", value: "aprovação obrigatória antes de alterar histórico" }] }
];

export function AgentRoutineWorkspace({ mode = "autonomo", flows = defaultAgentRoutineWorkspaceFlows, onModeChange, onFlowOpen, onAction, className, ...props }: AgentRoutineWorkspaceProps) {
  return (
    <div className={cn("tcrm-agent-routine-workspace", "tcrm-page-family-stack", className)} data-component="AgentRoutineWorkspace" {...props}>
      <AgentFlowSectionPanel description="Escolha um comportamento para a rotina inteira. A Taliya aplica isso aos fluxos abaixo, e você pode ajustar qualquer fluxo individualmente." kind="mode" title="Como essa rotina deve trabalhar?">
        <ModeSelector onChange={onModeChange} value={mode} variant="routine" />
      </AgentFlowSectionPanel>
      <AgentFlowSectionPanel columns={2} gridDensity="compact" title="Fluxos desta rotina">
        {flows.map((flow) => <AgentRoutineFlowCard key={flow.id} {...flow} onOpen={onFlowOpen} />)}
      </AgentFlowSectionPanel>
      <AgentFlowActionBar>
        <Button leadingIcon="play" onClick={() => onAction?.("simulate")} variant="primary">Simular rotina</Button>
        <Button leadingIcon="slidersRound" onClick={() => onAction?.("adjust-flows")} variant="secondary">Ajustar fluxos</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("prepare-publication")} variant="secondary">Revisar para publicar</Button>
      </AgentFlowActionBar>
    </div>
  );
}

export interface FlowStepCardItem {
  label: React.ReactNode;
  tone?: "info" | "success" | "danger" | "neutral";
}

export interface FlowStepCardSection {
  title?: React.ReactNode;
  tone?: "success" | "danger" | "neutral";
  items: FlowStepCardItem[];
}

export interface FlowStepCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  density?: "default" | "compact";
  state?: "start" | "middle" | "end" | "exception" | "blocked";
  status?: React.ReactNode;
  sections?: FlowStepCardSection[];
  action?: React.ReactNode;
  onOpen?: (stepId: string) => void;
  onMenu?: (stepId: string) => void;
  menuLabel?: string;
}

export function FlowStepCard({
  id = "step",
  title,
  description,
  density = "default",
  state = "middle",
  status,
  sections,
  action,
  onOpen,
  onMenu,
  menuLabel = "Abrir opções do nó",
  className,
  onKeyDown,
  ...props
}: FlowStepCardProps) {
  const interactive = Boolean(onOpen) && state !== "blocked";
  const fallbackSections = sections ?? [
    {
      items: [{ label: description ?? "Etapa do fluxo.", tone: state === "exception" || state === "blocked" ? "danger" : state === "start" ? "info" : "success" }]
    }
  ];

  return (
    <div
      aria-label={interactive && typeof title === "string" ? title : undefined}
      aria-disabled={state === "blocked" || undefined}
      className={cn(
        "tcrm-flow-step-card",
        `tcrm-flow-step-card--${state}`,
        density !== "default" && `tcrm-flow-step-card--${density}`,
        interactive && "tcrm-flow-step-card--interactive",
        className
      )}
      onClick={interactive ? () => onOpen?.(id) : undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen?.(id);
        }
      }}
      role={interactive ? "button" : "listitem"}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <header>
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        {status ? <Chip tone={state === "exception" ? "warning" : state === "blocked" ? "paused" : "info"}>{status}</Chip> : null}
        {onMenu ? <IconButton icon="more" label={menuLabel} onClick={(event) => { event.stopPropagation(); onMenu(id); }} size="sm" variant="ghost" /> : null}
      </header>
      <div className="tcrm-flow-step-card__body">
        {fallbackSections.map((section, sectionIndex) => (
          <div className={cn("tcrm-flow-step-card__section", section.tone && `tcrm-flow-step-card__section--${section.tone}`)} key={sectionIndex}>
            {section.title ? <b>{section.title}</b> : null}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li className={cn(item.tone && `tcrm-flow-step-card__item--${item.tone}`)} key={itemIndex}>
                  {density === "compact" && item.tone === "neutral" ? null : (
                    <Icon name={item.tone === "danger" ? "alert" : "checkCircle"} size="sm" tone={item.tone === "danger" ? "danger" : item.tone === "info" ? "info" : item.tone === "neutral" ? "current" : "success"} />
                  )}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {action ? <div className="tcrm-flow-step-card__action">{action}</div> : null}
    </div>
  );
}

export function FlowBuilder({
  steps,
  onStepOpen,
  onStepMenu,
  className,
  title = "Como funciona neste modo",
  density = "default",
  variant = "default"
}: {
  steps?: FlowStepCardProps[];
  onStepOpen?: (stepId: string) => void;
  onStepMenu?: (stepId: string) => void;
  className?: string;
  title?: React.ReactNode;
  density?: "default" | "compact";
  variant?: "default" | "reference";
}) {
  if (variant === "reference") {
    const referenceSteps = [
      { id: "trigger", icon: "bolt" as IconName, eyebrow: "Gatilho / Entrada", title: "Nova mensagem em WhatsApp", chip: "Evento" },
      { id: "condition", icon: "filter" as IconName, eyebrow: "Condicao", title: "Cliente elegivel e consentimento ativo", chip: "Sim 63% / Nao 37%" },
      { id: "action", icon: "play" as IconName, eyebrow: "Acao", title: "Enviar mensagem de apresentacao", chip: "WhatsApp" },
      { id: "approval", icon: "userCheck" as IconName, eyebrow: "Aprovacao", title: "Revisao humana obrigatoria", chip: "Copiloto" },
      { id: "fallback", icon: "shield" as IconName, eyebrow: "Fallback manual", title: "Criar tarefa para atendimento", chip: "Manual" }
    ];
    return (
      <Panel compact className={cn("tcrm-flow-builder-reference", className)} data-component="FlowBuilder">
        <header className="tcrm-reference15-header"><span>1</span><h3>Builder de fluxo</h3></header>
        <div className="tcrm-flow-builder-reference__lane" role="list">
          {referenceSteps.map((step, index) => <React.Fragment key={step.id}>
            <div className="tcrm-flow-builder-reference__node" onClick={() => onStepOpen?.(step.id)} role="listitem">
              <header><Icon name={step.icon} size="sm" /><strong>{step.eyebrow}</strong><IconButton icon="moreVertical" label={`Opcoes de ${step.eyebrow}`} onClick={() => onStepMenu?.(step.id)} size="sm" variant="ghost" /></header>
              <p>{step.title}</p><Chip showDot={false} tone={step.id === "condition" ? "success" : step.id === "approval" ? "info" : "neutral"}>{step.chip}</Chip>
            </div>
            {index < referenceSteps.length - 1 ? <span className="tcrm-flow-builder-reference__connector"><ConnectorLine arrow tone={index === 1 ? "success" : "neutral"} /></span> : null}
          </React.Fragment>)}
        </div>
      </Panel>
    );
  }
  const flowSteps = steps ?? [
    {
      id: "entrada",
      state: "start" as const,
      title: "Início",
      description: "O aluno avisa que não vai comparecer a uma aula.",
      sections: [{
        items: [
          { label: "Aluno identificado", tone: "info" as const },
          { label: "Aula existe na agenda", tone: "info" as const },
          { label: "Aviso dentro do prazo", tone: "info" as const },
          { label: "Falta ainda não registrada", tone: "info" as const }
        ]
      }]
    },
    {
      id: "meio",
      state: "middle" as const,
      title: "Meio",
      description: "A Taliya registra a falta avisada e encaminha o próximo passo.",
      sections: [
        {
          title: "Segue sem equipe se:",
          tone: "success" as const,
          items: [
            { label: "Aluno e aula conferem", tone: "success" as const },
            { label: "Aviso chegou no prazo", tone: "success" as const },
            { label: "Mensagem usa template aprovado", tone: "success" as const }
          ]
        },
        {
          title: "Chama a equipe se:",
          tone: "danger" as const,
          items: [
            { label: "Aviso chegou fora do prazo", tone: "danger" as const },
            { label: "Aluno pede crédito, cancelamento ou reclama", tone: "danger" as const },
            { label: "WhatsApp, cota ou permissão bloqueiam envio", tone: "danger" as const }
          ]
        }
      ]
    },
    {
      id: "fim",
      state: "end" as const,
      title: "Fim",
      description: "A falta fica registrada na aula e a mensagem permitida é enviada.",
      sections: [{
        items: [
          { label: "Se configurado, abre tarefa de reposição.", tone: "neutral" as const },
          { label: "Se prazo, aluno, aula, crédito ou envio não fecharem, a equipe decide.", tone: "neutral" as const }
        ]
      }],
      action: <Chip tone="info">Pode abrir tarefa em Reposições</Chip>
    }
  ];

  return (
    <Panel compact className={cn("tcrm-flow-builder", density !== "default" && `tcrm-flow-builder--${density}`, className)}>
      {title ? <h3>{title}</h3> : null}
      <div className="tcrm-flow-builder__lane" role="list">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.id ?? index}>
            <FlowStepCard density={density} {...step} onMenu={onStepMenu} onOpen={onStepOpen} />
            {index < flowSteps.length - 1 ? (
              <span className="tcrm-flow-builder__arrow" aria-hidden="true">
                <ConnectorLine arrow tone="neutral" />
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </Panel>
  );
}

export type AgentFlowWorkspaceAction = "test" | "save" | "back";

export interface AgentFlowWorkspaceSettings {
  noticeDeadline?: string;
  nextStep?: string;
  exceptionOwners?: string[];
  messageTone?: string;
  messageTemplate?: string;
}

export interface AgentFlowWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: string;
  settings?: AgentFlowWorkspaceSettings;
  onModeChange?: (mode: string) => void;
  onSettingChange?: (field: keyof AgentFlowWorkspaceSettings, value: string | string[]) => void;
  onStepOpen?: (stepId: string) => void;
  onStepMenu?: (stepId: string) => void;
  onAction?: (action: AgentFlowWorkspaceAction) => void;
}

const defaultAgentFlowWorkspaceSettings = {
  noticeDeadline: "2h",
  nextStep: "reposicao",
  exceptionOwners: ["Recepção", "Coordenadora", "Dono/admin"],
  messageTone: "acolhedor",
  messageTemplate: "Oi, {{nome}}. Vi aqui que você não vai conseguir vir à aula de {{horário}}. Vou registrar sua falta e verificar o melhor próximo passo."
} satisfies Required<AgentFlowWorkspaceSettings>;

export function AgentFlowWorkspace({
  mode = "autonomo-excecoes",
  settings,
  onModeChange,
  onSettingChange,
  onStepOpen,
  onStepMenu,
  onAction,
  className,
  ...props
}: AgentFlowWorkspaceProps) {
  const resolvedSettings = { ...defaultAgentFlowWorkspaceSettings, ...settings };

  return (
    <div className={cn("tcrm-agent-flow-workspace", "tcrm-page-family-stack", className)} data-component="AgentFlowWorkspace" {...props}>
      <AgentFlowSectionPanel
        description="Este fluxo herdou o perfil Mais autônomo da rotina, mas você pode mudar só este fluxo."
        density="compact"
        kind="mode"
        title="Como este fluxo deve trabalhar?"
      >
        <ModeSelector onChange={onModeChange} value={mode} />
      </AgentFlowSectionPanel>
      <FlowBuilder density="compact" onStepMenu={onStepMenu} onStepOpen={onStepOpen} />
      <AgentFlowSettingsPanel>
        <FieldGrid columns={4}>
          <Select
            helperText="Depois desse prazo, chama a equipe."
            label="Prazo para aviso"
            onValueChange={(value) => onSettingChange?.("noticeDeadline", value)}
            options={[
              { value: "2h", label: "Até 2 horas antes da aula" },
              { value: "1h", label: "Até 1 hora antes da aula" },
              { value: "dia-anterior", label: "Até o dia anterior" }
            ]}
            value={resolvedSettings.noticeDeadline}
          />
          <Select
            helperText="A reposição segue pelas próprias regras."
            label="Próximo passo após falta"
            onValueChange={(value) => onSettingChange?.("nextStep", value)}
            options={[
              { value: "reposicao", label: "Criar tarefa de reposição" },
              { value: "mensagem", label: "Enviar mensagem ao aluno" },
              { value: "equipe", label: "Chamar equipe" }
            ]}
            value={resolvedSettings.nextStep}
          />
          <TagInput
            helperText="Quem recebe o caso quando a Taliya não pode seguir."
            items={resolvedSettings.exceptionOwners}
            label="Responsáveis por exceção"
            onRemove={(_, index) => onSettingChange?.("exceptionOwners", resolvedSettings.exceptionOwners.filter((__, itemIndex) => itemIndex !== index))}
            removable
          />
          <FieldStack>
            <Select
              label="Tom/template da mensagem"
              onValueChange={(value) => onSettingChange?.("messageTone", value)}
              options={[
                { value: "acolhedor", label: "Acolhedor" },
                { value: "direto", label: "Direto" },
                { value: "formal", label: "Formal" }
              ]}
              value={resolvedSettings.messageTone}
            />
            <Textarea
              density="compact"
              onChange={(event) => onSettingChange?.("messageTemplate", event.currentTarget.value)}
              value={resolvedSettings.messageTemplate}
            />
          </FieldStack>
        </FieldGrid>
      </AgentFlowSettingsPanel>
      <AgentFlowActionBar>
        <Button leadingIcon="play" onClick={() => onAction?.("test")} variant="primary">Testar este fluxo</Button>
        <Button leadingIcon="clipboard" onClick={() => onAction?.("save")} variant="secondary">Salvar ajuste</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar para rotina</Button>
      </AgentFlowActionBar>
    </div>
  );
}

export interface PreflightChecklistItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  state: "complete" | "incomplete" | "warning" | "blocked";
}

export function PreflightChecklist({
  items,
  title = "Pronta para publicar",
  description = "Nenhum bloqueio encontrado. A rotina pode entrar em operação com os limites abaixo.",
  onItemAction,
  onToggle,
  className
}: {
  items?: PreflightChecklistItem[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  onItemAction?: (itemId: string) => void;
  onToggle?: (itemId: string, checked: boolean) => void;
  className?: string;
}) {
  const checklist = items ?? [
    { id: "whatsapp", title: "WhatsApp conectado", state: "complete" as const },
    { id: "templates", title: "Templates aprovados", state: "complete" as const },
    { id: "responsaveis", title: "Responsáveis definidos", state: "complete" as const },
    { id: "quota", title: "Cota disponível", state: "complete" as const },
    { id: "auditoria", title: "Auditoria ativa", state: "complete" as const }
  ];
  return (
    <Panel compact className={cn("tcrm-preflight-checklist-panel", className)}>
      {title || description ? (
        <header>
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="tcrm-preflight-checklist" role="list">
        {checklist.map((item) => (
          <span
            className={cn("tcrm-preflight-checklist__item", `tcrm-preflight-checklist__item--${item.state}`)}
            key={item.id}
            role="listitem"
          >
            <button
              aria-checked={item.state === "complete"}
              className="tcrm-preflight-checklist__check"
              disabled={item.state === "blocked"}
              onClick={() => onToggle?.(item.id, item.state !== "complete")}
              role="checkbox"
              type="button"
            >
              <span aria-hidden="true" className={cn("tcrm-preflight-checklist__status", `tcrm-preflight-checklist__status--${item.state}`)} />
              <span>{item.title}</span>
              {item.description ? <small>{item.description}</small> : null}
            </button>
            <button className="tcrm-preflight-checklist__action" disabled={item.state === "blocked"} onClick={() => onItemAction?.(item.id)} type="button">Revisar</button>
          </span>
        ))}
      </div>
    </Panel>
  );
}

export type AgentPublishFlowAction = "view" | "simulate";
export type AgentPublishRoutineAction = "publish" | "simulate-again" | "back";

export interface AgentPublishFlowFact {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface AgentPublishFlowCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id: string;
  title: React.ReactNode;
  icon?: IconName;
  mode: React.ReactNode;
  modeTone?: ComponentTone;
  status: React.ReactNode;
  statusTone?: ComponentTone;
  facts: AgentPublishFlowFact[];
  onAction?: (flowId: string, action: AgentPublishFlowAction) => void;
}

export function AgentPublishFlowCard({
  id,
  title,
  icon = "calendar",
  mode,
  modeTone = "info",
  status,
  statusTone = "success",
  facts,
  onAction,
  className,
  ...props
}: AgentPublishFlowCardProps) {
  return (
    <Card className={cn("tcrm-agent-publish-flow-card", className)} data-component="AgentPublishFlowCard" {...props}>
      <header>
        <span className="tcrm-agent-publish-flow-card__icon"><Icon name={icon} size="lg" tone="info" /></span>
        <h4>{title}</h4>
        <Chip showDot={false} tone={modeTone}>{mode}</Chip>
        <Chip showDot={false} tone={statusTone}>{status}</Chip>
      </header>
      <dl>
        {facts.map((fact, index) => (
          <div key={index}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <ButtonGroup>
        <Button leadingIcon="eye" onClick={() => onAction?.(id, "view")} size="sm" variant="secondary">Ver fluxo</Button>
        <Button leadingIcon="play" onClick={() => onAction?.(id, "simulate")} size="sm" variant="secondary">Simular</Button>
      </ButtonGroup>
    </Card>
  );
}

export interface AgentPublishRoutineWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  flows?: AgentPublishFlowCardProps[];
  checklistItems?: PreflightChecklistItem[];
  onChecklistReview?: (itemId: string) => void;
  onChecklistToggle?: (itemId: string, checked: boolean) => void;
  onFlowAction?: (flowId: string, action: AgentPublishFlowAction) => void;
  onAction?: (action: AgentPublishRoutineAction) => void;
}

const defaultAgentPublishFlows: AgentPublishFlowCardProps[] = [
  {
    id: "confirmacao",
    title: "Confirmação de presença",
    icon: "calendar",
    mode: "Autônomo",
    modeTone: "success",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Antes da aula, quando chega o horário de confirmar presença." },
      { label: "Faz", value: "Confere aula, aluno, horário e template. Envia confirmação, registra respostas e deixa pendente quem não respondeu." },
      { label: "Para se", value: "Aula mudou, aluno não confere, resposta conflita ou WhatsApp falha." },
      { label: "Ajustes", value: "Template: confirmação padrão · Canal: WhatsApp · Tom: direto" },
      { label: "Continua em", value: "Aula / Tarefas" }
    ]
  },
  {
    id: "falta-aviso",
    title: "Falta com aviso",
    icon: "bell",
    mode: "Autônomo com exceções",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Quando o aluno avisa que não vai comparecer." },
      { label: "Faz", value: "Confere aluno, aula, prazo e falta anterior. Registra a falta, envia mensagem aprovada e cria tarefa em Reposições." },
      { label: "Chama equipe se", value: "Aviso fora do prazo, aluno pede crédito/cancelamento, aula não encontrada ou WhatsApp falha." },
      { label: "Ajustes", value: "Prazo: até 2h antes · Responsáveis: Recepção, Coordenação · Tom: acolhedor" },
      { label: "Continua em", value: "Reposições / Tarefas" }
    ]
  },
  {
    id: "no-show",
    title: "Falta sem aviso",
    icon: "user",
    mode: "Autônomo com exceções",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Depois da aula, quando o aluno previsto não apareceu nem avisou." },
      { label: "Faz", value: "Confere chamada, janela de tolerância e histórico. Marca ausência e abre acompanhamento." },
      { label: "Chama equipe se", value: "Chamada não foi fechada, aviso apareceu em outro canal, recorrência alta ou risco de cancelamento." },
      { label: "Ajustes", value: "Tolerância: após aula · Responsáveis: Recepção, Retenção · Tom: cuidadoso" },
      { label: "Continua em", value: "Aula / Retenção / Tarefas" }
    ]
  },
  {
    id: "correcao",
    title: "Correção de presença",
    icon: "edit",
    mode: "Autônomo com aprovação",
    status: "Aprovação ao executar",
    statusTone: "warning",
    facts: [
      { label: "Início", value: "Quando alguém solicita corrigir presença depois da aula." },
      { label: "Faz", value: "Confere aula, aluno, motivo e impacto. Prepara a alteração e cria pedido de aprovação." },
      { label: "Não faz sozinha", value: "Não altera histórico de presença antes da aprovação." },
      { label: "Ajustes", value: "Aprovadores: Coordenação, Dono/admin · Motivo obrigatório · Auditoria ativa" },
      { label: "Continua em", value: "Aprovações / Auditoria" }
    ]
  }
];

export function AgentPublishRoutineWorkspace({
  flows = defaultAgentPublishFlows,
  checklistItems,
  onChecklistReview,
  onChecklistToggle,
  onFlowAction,
  onAction,
  className,
  ...props
}: AgentPublishRoutineWorkspaceProps) {
  return (
    <div className={cn("tcrm-agent-publish-workspace", "tcrm-page-family-stack", className)} data-component="AgentPublishRoutineWorkspace" {...props}>
      <ButtonGroup>
        <Chip icon="rocket" tone="info">Mais autonomo</Chip>
        <Chip icon="clock" tone="info">4 fluxos</Chip>
        <Chip icon="checkCircle" tone="success">Simulação concluída</Chip>
        <Chip icon="shieldCheck" tone="success">Pronta para publicar</Chip>
      </ButtonGroup>
      <PreflightChecklist items={checklistItems} onItemAction={onChecklistReview} onToggle={onChecklistToggle} />
      <Panel compact className="tcrm-agent-publish-workspace__flows">
        <h3>Fluxos que serão publicados</h3>
        <DashboardGrid columns={2} density="compact">
          {flows.map((flow) => <AgentPublishFlowCard key={flow.id} {...flow} onAction={onFlowAction} />)}
        </DashboardGrid>
      </Panel>
      <Panel compact className="tcrm-agent-publish-workspace__activation">
        <h3>O que será ativado</h3>
        <div>
          {[
            "Envio automático de confirmações de presença.",
            "Criação de tarefas de reposição e acompanhamento.",
            "Registro automático de faltas quando as regras fecharem.",
            "Aprovação obrigatória para corrigir presença."
          ].map((item) => <span key={item}><Icon name="checkCircle" size="sm" tone="success" />{item}</span>)}
        </div>
      </Panel>
      <AgentFlowActionBar>
        <Button leadingIcon="upload" onClick={() => onAction?.("publish")} variant="primary">Publicar rotina</Button>
        <Button leadingIcon="refresh" onClick={() => onAction?.("simulate-again")} variant="secondary">Simular novamente</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar para ajustes</Button>
      </AgentFlowActionBar>
    </div>
  );
}

export interface ScenarioListItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: "selected" | "blocked" | "passed" | "failed";
}

export function ScenarioList({
  items,
  selectedId = "prazo",
  onSelect,
  className
}: {
  items?: ScenarioListItem[];
  selectedId?: string;
  onSelect?: (scenarioId: string) => void;
  className?: string;
}) {
  const scenarios = items ?? [
    { id: "prazo", title: "Aluno avisou no prazo", description: "Registra falta e cria tarefa de reposição.", state: "passed" },
    { id: "fora-prazo", title: "Aviso fora do prazo", description: "Chama equipe antes de registrar.", state: "blocked" },
    { id: "credito", title: "Aluno pede crédito", description: "Chama equipe antes de decidir.", state: "blocked" },
    { id: "whatsapp", title: "WhatsApp falha", description: "Para e cria pendência.", state: "failed" }
  ];

  return (
    <Panel compact className={cn("tcrm-scenario-list", className)}>
      <h3>Cenários</h3>
      <div className="tcrm-scenario-list__items" role="list">
        {scenarios.map((scenario) => (
          <button
            aria-current={scenario.id === selectedId ? "true" : undefined}
            className={cn("tcrm-scenario-list__item", scenario.id === selectedId && "tcrm-scenario-list__item--selected")}
            key={scenario.id}
            onClick={() => onSelect?.(scenario.id)}
            role="listitem"
            type="button"
          >
            <span>
              <strong>{scenario.title}</strong>
              {scenario.description ? <small>{scenario.description}</small> : null}
            </span>
            <span aria-hidden="true" className="tcrm-scenario-list__action">
              {scenario.id === selectedId ? <Icon name="check" size={14} /> : <Icon name="chevronRight" size={18} />}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export function PhonePreview({
  state = "conversation",
  avatarSrc,
  studentName = "Júlia",
  className
}: {
  state?: "conversation" | "loading" | "blocked";
  avatarSrc?: string;
  studentName?: string;
  className?: string;
}) {
  return (
    <div className={cn("tcrm-phone-preview", `tcrm-phone-preview--${state}`, className)} aria-label="Prévia da conversa">
      <div className="tcrm-phone-preview__statusbar" aria-hidden="true">
        <span>12:30</span>
        <span className="tcrm-phone-preview__status-icons">
          <span className="tcrm-phone-preview__signal"><i /><i /><i /></span>
          <span className="tcrm-phone-preview__wifi" />
          <span className="tcrm-phone-preview__battery" />
        </span>
      </div>
      <span className="tcrm-phone-preview__notch" aria-hidden="true" />
      <header>
        <IconButton icon="chevronLeft" label="Voltar" size="sm" variant="ghost" />
        <Avatar name={studentName} size="md" src={avatarSrc} status="online" />
        <span>
          <strong>{studentName}</strong>
          <small>modo automático via Taliya Agenda</small>
        </span>
        <IconButton icon="moreVertical" label="Mais ações" size="sm" variant="ghost" />
      </header>
      <div className="tcrm-phone-preview__body">
        {state === "loading" ? (
          <LoadingState className="tcrm-phone-preview__loading" title="Preparando conversa" variant="spinner" />
        ) : state === "blocked" ? (
          <InlineAlert tone="warning" title="Envio bloqueado">A equipe precisa revisar antes de enviar.</InlineAlert>
        ) : (
          <>
            <MessageBubble timestamp="15:38" variant="inbound">Oi, não vou conseguir ir na aula de hoje 18h30.</MessageBubble>
            <MessageBubble status="read" timestamp="15:39" variant="outbound">Tudo certo, Júlia. Registrei sua falta na aula de hoje 18h30.</MessageBubble>
            <Card className="tcrm-phone-preview__receipt" compact tone="success">
              <span className="tcrm-phone-preview__receipt-icon"><Icon name="clipboardCheck" tone="current" /></span>
              <span><strong>FALTA REGISTRADA</strong><small>Mensagem enviada ao aluno</small><small>Tarefa criada em Reposições</small></span>
              <span className="tcrm-phone-preview__receipt-meta">
                <span>15:40</span>
                <span className="tcrm-phone-preview__receipt-checks" aria-label="Mensagem lida" role="img">
                  <Icon name="check" size="var(--taliya-control-crm-phone-preview-receipt-meta-icon-size)" tone="current" />
                  <Icon name="check" size="var(--taliya-control-crm-phone-preview-receipt-meta-icon-size)" tone="current" />
                </span>
              </span>
            </Card>
          </>
        )}
      </div>
      <div className="tcrm-phone-preview__composer">
        <Input aria-label="Mensagem" className="tcrm-phone-preview__composer-input" disabled leadingIcon="message" placeholder="Mensagem" fieldSize="sm" />
        <IconButton disabled={state === "loading"} icon="send" label="Enviar mensagem" size="lg" variant="selected" />
      </div>
    </div>
  );
}

export function ExecutionTimeline({
  items,
  onRetry,
  onOpen,
  className
}: {
  items?: Array<React.ComponentProps<typeof ExecutionRow> & { id: string }>;
  onRetry?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  className?: string;
}) {
  const rows = items ?? [
    { id: "inicio", step: 1, status: "success" as const, statusLabel: "concluído", title: "1. Início", tool: "Aluno avisou que não vai comparecer.", details: "Aluno avisou falta." },
    {
      id: "checagens",
      step: 2,
      status: "success" as const,
      statusLabel: "concluído",
      title: "2. Checagens",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Aluno identificado</span>
          <span>Aula existe na agenda</span>
          <span>Aviso dentro do prazo</span>
          <span>Falta ainda não registrada</span>
          <span>Mensagem aprovada</span>
        </span>
      ),
      details: "Aluno, aula e prazo validados."
    },
    { id: "decisao", step: 3, status: "success" as const, statusLabel: "concluído", title: "3. Decisão", tool: "Segue sem equipe. Nenhuma exceção encontrada.", details: "Segue sem equipe." },
    {
      id: "acao",
      step: 4,
      status: "success" as const,
      statusLabel: "concluído",
      title: "4. Ação",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Registrou a falta na aula</span>
          <span>Enviou a mensagem aprovada</span>
        </span>
      ),
      details: "Tarefa criada para reposição."
    },
    {
      id: "fim",
      step: 5,
      status: "success" as const,
      statusLabel: "concluído",
      title: "5. Fim",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Criou tarefa em Reposições</span>
          <span>Não escolheu vaga, crédito ou horário neste fluxo</span>
        </span>
      ),
      details: "Fluxo encerrado."
    }
  ];

  return (
    <div className={cn("tcrm-execution-timeline", className)}>
      {rows.map((row) => (
        <ExecutionRow key={row.id} {...row} onOpen={onOpen ? () => onOpen(row.id) : undefined} onRetry={onRetry ? () => onRetry(row.id) : undefined} />
      ))}
    </div>
  );
}

export type SimulationRunnerAction = "run" | "change-scenario" | "back";

export interface SimulationRunnerProps extends CrmSurfaceProps {
  state?: "running" | "success" | "blocked";
  avatarSrc?: string;
  selectedScenarioId?: string;
  onRun?: () => void;
  onScenarioSelect?: (scenarioId: string) => void;
  onAction?: (action: SimulationRunnerAction) => void;
}

export function SimulationRunner({
  state = "success",
  avatarSrc,
  selectedScenarioId = "prazo",
  onRun,
  onScenarioSelect,
  onAction,
  className
}: SimulationRunnerProps) {
  return (
    <div className={cn("tcrm-simulation-runner", className)}>
      <div className="tcrm-simulation-runner__grid">
        <ScenarioList onSelect={onScenarioSelect} selectedId={selectedScenarioId} />
        <Panel compact className="tcrm-simulation-runner__phone-panel">
          <PhonePreview avatarSrc={avatarSrc} state={state === "running" ? "loading" : state === "blocked" ? "blocked" : "conversation"} />
        </Panel>
        <Panel compact className="tcrm-simulation-runner__timeline-panel">
          <h3>Execução do teste</h3>
          <ExecutionTimeline />
        </Panel>
      </div>
      <div className="tcrm-simulation-runner__actions">
        <Button leadingIcon="play" onClick={() => { onRun?.(); onAction?.("run"); }} variant="primary">Rodar teste novamente</Button>
        <Button leadingIcon="refresh" onClick={() => onAction?.("change-scenario")} variant="secondary">Trocar cenário</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar ao fluxo</Button>
      </div>
    </div>
  );
}

export type ExecutionReceiptState = "success" | "exception" | "failed";
export type ExecutionReceiptLayout = "detail" | "compact";

export interface ExecutionReceiptProps extends Omit<CrmSurfaceProps, "state"> {
  state?: ExecutionReceiptState;
  layout?: ExecutionReceiptLayout;
  successTitle?: React.ReactNode;
  failureTitle?: React.ReactNode;
  exceptionTitle?: React.ReactNode;
  description?: React.ReactNode;
  channelLabel?: React.ReactNode;
  channel?: React.ReactNode;
  occurredLabel?: React.ReactNode;
  occurredAt?: React.ReactNode;
  reasonLabel?: React.ReactNode;
  reason?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onAction?: (actionId: string) => void;
}

export function ExecutionReceipt({
  state = "success",
  layout = "detail",
  successTitle = "Ação executada com sucesso",
  failureTitle = "Ação falhou",
  exceptionTitle = "Ação requer revisão",
  description,
  channelLabel = "Canal:",
  channel = "WhatsApp",
  occurredLabel,
  occurredAt = "Hoje, 09:30",
  reasonLabel = "Motivo:",
  reason = "Número não ativo no WhatsApp.",
  statusLabel,
  onAction,
  className
}: ExecutionReceiptProps) {
  const isSuccess = state === "success";
  const isFailed = state === "failed";
  const compactTitle = isSuccess ? successTitle : isFailed ? failureTitle : exceptionTitle;
  const compactDescription = description ?? (isSuccess
    ? "Mensagem de confirmação enviada para Ana Paula Santos."
    : isFailed
      ? "Não foi possível enviar a mensagem para Ana Paula Santos."
      : "A execução foi interrompida para revisão humana.");
  const compactOccurredLabel = occurredLabel ?? (isSuccess ? "Executado em:" : "Tentativas em:");
  const compactStatusLabel = statusLabel ?? (isSuccess ? "Concluído" : isFailed ? "Falha" : "Revisão");

  if (layout === "compact") {
    return (
      <Card
        aria-label={String(compactTitle)}
        className={cn("tcrm-execution-receipt", "tcrm-execution-receipt--compact", `tcrm-execution-receipt--compact-${state}`, className)}
        data-component="ExecutionReceipt"
        data-layout="compact"
        data-state={state}
        role="region"
      >
        <header className="tcrm-execution-receipt__compact-header">
          <Icon name={isSuccess ? "checkCircle" : "alert"} size="var(--taliya-control-crm-execution-receipt-compact-icon-size)" />
          <h2>{compactTitle}</h2>
        </header>
        <p className="tcrm-execution-receipt__compact-description">{compactDescription}</p>
        <dl className="tcrm-execution-receipt__compact-facts">
          {isSuccess ? (
            <div>
              <dt>{channelLabel}</dt>
              <dd>{channel}<Icon name="whatsapp" size="var(--taliya-control-crm-execution-receipt-compact-icon-size)" /></dd>
            </div>
          ) : (
            <div>
              <dt>{reasonLabel}</dt>
              <dd>{reason}</dd>
            </div>
          )}
          <div>
            <dt>{compactOccurredLabel}</dt>
            <dd>{occurredAt}</dd>
          </div>
        </dl>
        <Chip className="tcrm-execution-receipt__compact-status" showDot={false} tone={isSuccess ? "success" : isFailed ? "danger" : "warning"}>
          {compactStatusLabel}
        </Chip>
      </Card>
    );
  }

  const receiptRows = [
    { id: "aviso", step: 1, status: "success" as const, statusLabel: "Concluído", title: "1. Aluna avisou falta", tool: "Júlia avisou pelo WhatsApp que não vai conseguir ir à aula de hoje 18h30." },
    { id: "regras", step: 2, status: "success" as const, statusLabel: "Concluído", title: "2. Taliya conferiu as regras", tool: "Aluno identificado, aula encontrada, aviso dentro do prazo e mensagem aprovada." },
    { id: "execucao", step: 3, status: "success" as const, statusLabel: "Concluído", title: "3. Taliya executou", tool: "Registrou a falta na aula e enviou a mensagem aprovada para a aluna." },
    { id: "continuidade", step: 4, status: "success" as const, statusLabel: "Concluído", title: "4. Continuidade criada", tool: "Criou uma tarefa em Reposições para a equipe acompanhar o próximo passo." }
  ];

  return (
    <div className={cn("tcrm-execution-receipt", className)}>
      <Panel compact className="tcrm-execution-receipt__summary">
      <header>
        <h3>Resumo da execução</h3>
        <Chip tone={toneForState(state)}>{state === "success" ? "Concluída" : state}</Chip>
      </header>
      <DomainFactList
        facts={[
          { label: "Fluxo", value: "Falta com aviso", icon: "clipboard" },
          { label: "Agente", value: "Agenda", icon: "bot" },
          { label: "Caso", value: "Júlia Martins - aula 18h30", icon: "users" },
          { label: "Início", value: "Hoje 15:58", icon: "clock" }
        ]}
      />
      <InlineAlert tone={state === "failed" ? "danger" : "info"}>
        A Taliya registrou a falta avisada, enviou a mensagem aprovada e criou uma tarefa de reposição.
      </InlineAlert>
      </Panel>
      <Panel compact className="tcrm-execution-receipt__timeline">
        <h3>O que aconteceu</h3>
        <p>Etapas desta execução real.</p>
        <ExecutionTimeline className="tcrm-execution-timeline--receipt" items={receiptRows} />
      </Panel>
      <div className="tcrm-execution-receipt__followup">
        <Panel compact className="tcrm-execution-receipt__why">
          <h3>Por que seguiu sem chamar equipe</h3>
          <ul>
            {["Aluna identificada", "Template aprovado", "Aula encontrada", "WhatsApp conectado", "Aviso dentro do prazo configurado", "Cota disponível", "Falta ainda não registrada"].map((item) => (
              <li key={item}><Icon name="check" size="sm" tone="success" />{item}</li>
            ))}
          </ul>
          <p>Se alguma regra falhasse, a Taliya chamaria a equipe definida no fluxo.</p>
        </Panel>
        <Panel compact className="tcrm-execution-receipt__continuation">
          <h3>Continua em Tarefas / Reposições</h3>
          <p>A equipe pode acompanhar a reposição criada para Júlia Martins.</p>
          <DomainActions
            actions={[
              { id: "task", label: "Abrir tarefa", icon: "clipboard" },
              { id: "student", label: "Abrir aluna", icon: "user", variant: "secondary" },
              { id: "flow", label: "Ver fluxo", icon: "eye", variant: "secondary" }
            ]}
            onAction={onAction}
          />
          <small>Próximo passo operacional já criado.</small>
        </Panel>
      </div>
      <footer className="tcrm-execution-receipt__footer">
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar ao extrato</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("flow")} variant="secondary">Ver fluxo</Button>
      </footer>
    </div>
  );
}

