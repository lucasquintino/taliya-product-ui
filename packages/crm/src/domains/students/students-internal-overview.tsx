/** Internal overview dashboard and shell compositions. */
import React from "react";
import { Button, Chip, Icon, Panel, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import type {
  CrmProductShellProps,
  CrmShellNavItem
} from "../../patterns/shell.js";

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

export type InternalShellProps = Omit<CrmProductShellProps, "variant">;

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
          {columns.map((column, index) => <span key={`column-${column}-${index}`}>{column}</span>)}
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
