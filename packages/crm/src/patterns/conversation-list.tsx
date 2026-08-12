/** Conversation list pattern. */
import React from "react";
import { Avatar, Badge, Button, Chip, EmptyState, FilterChip, Icon, IconButton, InlineAlert, List, ListItem, LoadingState, SearchInput, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type { ConversationListState } from "../domains/billing/billing-settings-final-b.js";
import { ChannelStatus } from "./composer-and-handoff.js";

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
