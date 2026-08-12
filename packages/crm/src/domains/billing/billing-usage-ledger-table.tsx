/** Usage ledger table and summaries. */
import React from "react";
import { Button, ButtonGroup, Card, Chip, DataTable, EmptyState, ErrorState, FilterBar, Icon, LoadingState, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { stateKey } from "./billing-utilities.js";

export type UsageLedgerStatus = "consumed" | "estimated" | "reprocessed";
export type UsageLedgerOrigin = "whatsapp" | "ai" | "automation" | "import" | "adjustment";
export type UsageLedgerAction = "row" | "action" | "filter" | "load-more";

export interface UsageLedgerRow {
  id: string;
  when?: React.ReactNode;
  time?: React.ReactNode;
  origin?: UsageLedgerOrigin | React.ReactNode;
  originLabel?: React.ReactNode;
  agentFlow?: React.ReactNode;
  type?: React.ReactNode;
  caseLabel?: React.ReactNode;
  usage?: React.ReactNode;
  amount?: React.ReactNode;
  status?: UsageLedgerStatus;
  statusLabel?: React.ReactNode;
  actionLabel?: React.ReactNode;
  disabled?: boolean;
}

export interface UsageLedgerFilter {
  id: "period" | "agent" | "origin" | "status" | string;
  label: React.ReactNode;
  value: React.ReactNode;
  disabled?: boolean;
}

export interface CrmHeaderSummaryItem {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  tone?: ComponentTone;
}

export interface CrmHeaderSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: CrmHeaderSummaryItem[];
  onSelect?: (item: CrmHeaderSummaryItem) => void;
  variant?: "ledger" | "overview" | "billing" | "billing-invoices";
}

const defaultCrmHeaderSummaryItems: CrmHeaderSummaryItem[] = [
  { id: "cycle", icon: "calendar", label: "Ciclo atual" },
  { id: "used", icon: "pieChart", label: "42% usado", tone: "info" },
  { id: "messages", icon: "message", label: "15.000 mensagens/mês" }
];

export function CrmHeaderSummary({ items = defaultCrmHeaderSummaryItems, onSelect, variant = "ledger", className, ...props }: CrmHeaderSummaryProps) {
  return (
    <ButtonGroup
      className={cn("tcrm-header-summary", "tcrm-usage-header-summary", `tcrm-header-summary--${variant}`, `tcrm-usage-header-summary--${variant}`, className)}
      data-component="CrmHeaderSummary"
      {...props}
    >
      {items.map((item) => (
        <Button
          className="tcrm-usage-header-summary__item"
          data-tone={item.tone ?? "neutral"}
          key={item.id}
          leadingIcon={item.icon}
          onClick={() => onSelect?.(item)}
          size="sm"
          type="button"
          variant="secondary"
        >
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

/** @deprecated Use CrmHeaderSummary. */
export const UsageHeaderSummary = CrmHeaderSummary;
/** @deprecated Use CrmHeaderSummaryItem. */
export type UsageHeaderSummaryItem = CrmHeaderSummaryItem;
/** @deprecated Use CrmHeaderSummaryProps. */
export type UsageHeaderSummaryProps = CrmHeaderSummaryProps;

export interface UsageLedgerTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  rows?: UsageLedgerRow[];
  filters?: UsageLedgerFilter[];
  footerLabel?: React.ReactNode;
  loadMoreLabel?: React.ReactNode;
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  disabled?: boolean;
  blockedReason?: string;
  onRowClick?: (row: UsageLedgerRow) => void;
  onAction?: (row: UsageLedgerRow, action: UsageLedgerAction) => void;
  onReprocess?: (row: UsageLedgerRow) => void;
  onFilterClick?: (filter: UsageLedgerFilter) => void;
  onLoadMore?: () => void;
}

const defaultUsageLedgerRows: UsageLedgerRow[] = [
  {
    id: "hoje-1558",
    when: "Hoje 15:58",
    origin: "whatsapp",
    agentFlow: "Agenda · Falta com aviso",
    caseLabel: "Júlia Martins · aula 18h30",
    usage: "1 mensagem",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir execução"
  },
  {
    id: "hoje-1532",
    when: "Hoje 15:32",
    origin: "ai",
    agentFlow: "Atendimento · Triagem de conversa",
    caseLabel: "Novo lead no WhatsApp",
    usage: "3 mensagens",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir conversa"
  },
  {
    id: "hoje-1420",
    when: "Hoje 14:20",
    origin: "whatsapp",
    agentFlow: "Vendas · Follow-up experimental",
    caseLabel: "Marina Costa",
    usage: "2 mensagens",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir caso"
  },
  {
    id: "ontem-1810",
    when: "Ontem 18:10",
    origin: "whatsapp",
    agentFlow: "Financeiro · Lembrete de cobrança",
    caseLabel: "Rafael Lima · mensalidade",
    usage: "1 mensagem",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir cobrança"
  },
  {
    id: "ontem-1745",
    when: "Ontem 17:45",
    origin: "ai",
    agentFlow: "Agenda · Correção de presença",
    caseLabel: "Aprovação preparada",
    usage: "1 estimada",
    status: "estimated",
    statusLabel: "Estimada",
    actionLabel: "Abrir aprovação"
  },
  {
    id: "ontem-1108",
    when: "Ontem 11:08",
    origin: "whatsapp",
    agentFlow: "Atendimento · Reenvio de mensagem",
    caseLabel: "Falha recuperada",
    usage: "1 mensagem",
    status: "reprocessed",
    statusLabel: "Reprocessado",
    actionLabel: "Abrir execução"
  }
];

const defaultUsageLedgerFilters: UsageLedgerFilter[] = [
  { id: "period", label: "Período", value: "Ciclo atual" },
  { id: "agent", label: "Agente", value: "Todos" },
  { id: "origin", label: "Origem", value: "Todas" },
  { id: "status", label: "Status", value: "Todos" }
];

function usageLedgerOriginKey(row: UsageLedgerRow): UsageLedgerOrigin {
  const raw = typeof row.origin === "string" ? row.origin : row.originLabel;
  const key = stateKey(raw);

  if (key.includes("whatsapp")) return "whatsapp";
  if (key === "ia" || key === "ai" || key.includes("inteligencia")) return "ai";
  if (key.includes("import")) return "import";
  if (key.includes("ajuste")) return "adjustment";
  return "automation";
}

function usageLedgerOriginLabel(row: UsageLedgerRow, key: UsageLedgerOrigin): React.ReactNode {
  if (row.originLabel) return row.originLabel;
  if (typeof row.origin === "string" && !["whatsapp", "ai", "automation", "import", "adjustment"].includes(row.origin)) return row.origin;
  if (key === "whatsapp") return "WhatsApp";
  if (key === "ai") return "IA";
  if (key === "import") return "Importação";
  if (key === "adjustment") return "Ajuste";
  return "Automação";
}

function usageLedgerStatusLabel(row: UsageLedgerRow): React.ReactNode {
  if (row.statusLabel) return row.statusLabel;
  if (row.status === "estimated") return "Estimado";
  if (row.status === "reprocessed") return "Reprocessado";
  return "Consumido";
}

function usageLedgerStatusTone(status?: UsageLedgerStatus): ComponentTone {
  if (status === "estimated") return "info";
  if (status === "reprocessed") return "neutral";
  return "success";
}

function UsageLedgerOriginCell({ row }: { row: UsageLedgerRow }) {
  const key = usageLedgerOriginKey(row);
  const icon = key === "whatsapp" ? "whatsapp" : "sparkles";

  return (
    <span className="tcrm-usage-ledger__origin" data-origin={key}>
      <span className="tcrm-usage-ledger__origin-icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span>{usageLedgerOriginLabel(row, key)}</span>
    </span>
  );
}

export function UsageLedgerTable({
  title = "Lançamentos do ciclo",
  description = "Veja quando a cota foi consumida e qual caso gerou o uso.",
  rows = defaultUsageLedgerRows,
  filters = defaultUsageLedgerFilters,
  footerLabel = "Mostrando lançamentos do ciclo atual.",
  loadMoreLabel = "Carregar mais",
  onRowClick,
  onAction,
  onReprocess,
  onFilterClick,
  onLoadMore,
  loading = false,
  error,
  emptyState,
  disabled = false,
  blockedReason,
  className,
  ...props
}: UsageLedgerTableProps) {
  const controlsDisabled = disabled || Boolean(blockedReason) || loading;
  const hasRows = rows.length > 0;

  const handleRowClick = (row: UsageLedgerRow) => {
    onRowClick?.(row);
    onAction?.(row, "row");
  };

  const handleRowAction = (row: UsageLedgerRow, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAction?.(row, "action");
    onReprocess?.(row);
  };

  return (
    <Card
      aria-busy={loading || undefined}
      className={cn("tcrm-usage-ledger", className)}
      data-component="UsageLedgerTable"
      {...props}
    >
      <h3 className="tcrm-usage-ledger__title">{title}</h3>
      <p className="tcrm-usage-ledger__description">{description}</p>
      <FilterBar className="tcrm-usage-ledger__filters">
        {filters.map((filter, index) => (
          <Button
            aria-label={`Filtrar ${filter.label}: ${filter.value}`}
            blockedReason={blockedReason}
            className="tcrm-usage-ledger__filter"
            data-filter-index={index}
            disabled={disabled || filter.disabled || loading}
            key={filter.id}
            onClick={() => onFilterClick?.(filter)}
            size="sm"
            trailingIcon="chevronDown"
            variant="secondary"
          >
            {filter.label}: {filter.value}
          </Button>
        ))}
      </FilterBar>
      {error ? (
        <div className="tcrm-usage-ledger__state">
          <ErrorState description={error} title="Não foi possível carregar o extrato" />
        </div>
      ) : loading ? (
        <div className="tcrm-usage-ledger__state">
          <LoadingState title="Carregando extrato" variant="skeleton" />
        </div>
      ) : hasRows ? (
        <DataTable
          className="tcrm-usage-ledger__table"
          columns={[
            { key: "when", header: "Quando", render: (row: UsageLedgerRow) => row.when ?? row.time },
            { key: "origin", header: "Origem", render: (row: UsageLedgerRow) => <UsageLedgerOriginCell row={row} /> },
            { key: "agentFlow", header: "Agente / fluxo", render: (row: UsageLedgerRow) => row.agentFlow ?? row.type },
            { key: "caseLabel", header: "Caso" },
            { key: "usage", header: "Uso", render: (row: UsageLedgerRow) => row.usage ?? row.amount },
            {
              key: "status",
              header: "Status",
              render: (row: UsageLedgerRow) => (
                <Chip className={`tcrm-usage-ledger__status tcrm-usage-ledger__status--${row.status ?? "consumed"}`} showDot={false} tone={usageLedgerStatusTone(row.status)}>
                  {usageLedgerStatusLabel(row)}
                </Chip>
              )
            },
            {
              key: "actionLabel",
              header: "Ação",
              render: (row: UsageLedgerRow) => (
                <Button
                  aria-label={`${row.actionLabel ?? "Abrir execução"} - ${row.caseLabel ?? row.id}`}
                  className="tcrm-usage-ledger__action"
                  disabled={controlsDisabled || row.disabled}
                  onClick={(event) => handleRowAction(row, event)}
                  size="sm"
                  variant="ghost"
                >
                  {row.actionLabel ?? "Abrir execução"}
                </Button>
              )
            }
          ]}
          density="dense"
          onRowClick={onRowClick || onAction ? handleRowClick : undefined}
          rows={rows}
        />
      ) : (
        <div className="tcrm-usage-ledger__state">
          {emptyState ?? <EmptyState title="Nenhum lançamento encontrado" description="Os lançamentos do ciclo aparecem aqui quando houver consumo." />}
        </div>
      )}
      <div className="tcrm-usage-ledger__footer">
        <span>{footerLabel}</span>
        <Button
          blockedReason={blockedReason}
          className="tcrm-usage-ledger__load-more"
          disabled={disabled || loading}
          onClick={onLoadMore}
          size="sm"
          variant="secondary"
        >
          {loadMoreLabel}
        </Button>
      </div>
    </Card>
  );
}
