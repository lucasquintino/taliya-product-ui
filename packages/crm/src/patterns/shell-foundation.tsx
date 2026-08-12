/** CRM shell foundation: data contracts, sidebar, and navigation primitives. */
import React from "react";
import {
  Avatar,
  Card,
  Chip,
  Icon,
  IconButton,
  TaliyaLogo,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";

export interface SidebarItemData {
  id: string;
  label: string;
  icon: IconName;
  active?: boolean;
  alert?: boolean;
  disabled?: boolean;
}

export const defaultSidebarItems: SidebarItemData[] = [
  { id: "hoje", label: "Hoje", icon: "home", active: true },
  { id: "inbox", label: "Inbox", icon: "inbox", alert: true },
  { id: "alunos", label: "Alunos", icon: "users" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "vendas", label: "Vendas", icon: "creditCard" },
  { id: "financeiro", label: "Financeiro", icon: "wallet" },
  { id: "retencao", label: "Retenção", icon: "refresh" },
  { id: "operacao", label: "Operação", icon: "clipboard" },
  { id: "agentes", label: "Agentes", icon: "bot" },
  { id: "uso-cotas", label: "Uso e cotas", icon: "sliders" },
  { id: "relatorios", label: "Relatórios", icon: "barChart" },
  { id: "configuracoes", label: "Configurações", icon: "settings" }
];

export const defaultSetupSteps = [
  "Studio",
  "Equipe",
  "Canais",
  "Planos",
  "Pagamento",
  "Alunos",
  "Turmas",
  "Agenda",
  "Revisão"
];

export interface CrmShellNavItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

export interface CrmShellSidebarItem {
  id: string;
  label: string;
  icon: IconName;
  active?: boolean;
  alert?: boolean;
  disabled?: boolean;
}

export interface CrmBrowserToolbarItem {
  id: string;
  label: string;
  icon: IconName;
  disabled?: boolean;
}

export const crmEmptyShellNavItems: CrmShellNavItem[] = [
  { id: "hoje", label: "Hoje" },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovações" },
  { id: "incidentes", label: "Incidentes" },
  { id: "jornadas", label: "Jornadas", active: true },
  { id: "auditoria", label: "Auditoria" },
  { id: "relatorios", label: "Relatórios" }
];

export const crmOperationalNavItems: CrmShellNavItem[] = [
  { id: "today", label: "Hoje" },
  { id: "tasks", label: "Tarefas" },
  { id: "approvals", label: "Aprovações" },
  { id: "incidents", label: "Incidentes" },
  { id: "agents", label: "Agentes" },
  { id: "audit", label: "Auditoria" },
  { id: "reports", label: "Relatórios" }
];

export const crmEmptyShellSidebarItems: CrmShellSidebarItem[] = [
  { id: "expand", label: "Expandir navegação", icon: "chevronsRight" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "conversas", label: "Conversas", icon: "message" },
  { id: "calendario", label: "Calendário", icon: "calendar" },
  { id: "aulas", label: "Aulas", icon: "graduation" },
  { id: "tags", label: "Tags", icon: "tag" },
  { id: "financeiro", label: "Financeiro", icon: "coins" },
  { id: "checklists", label: "Checklists", icon: "clipboardCheck" },
  { id: "equipe", label: "Equipe", icon: "users" },
  { id: "metricas", label: "Métricas", icon: "barChart" }
];

export const crmEmptyShellSidebarUtilityItems: CrmShellSidebarItem[] = [
  { id: "modo-noite", label: "Modo noite", icon: "moon" },
  { id: "modo-dia", label: "Modo dia", icon: "sun" }
];

export const crmBrowserToolbarItems: CrmBrowserToolbarItem[] = [
  { id: "bookmarks", label: "Abrir favoritos", icon: "book" },
  { id: "favorite", label: "Favoritar", icon: "star" },
  { id: "back", label: "Voltar no navegador", icon: "chevronLeft" },
  { id: "forward", label: "Avançar no navegador", icon: "chevronRight", disabled: true }
];

export const crmAccessShellBrowserToolbarItems: CrmBrowserToolbarItem[] = [
  { id: "bookmarks", label: "Abrir favoritos", icon: "book" },
  { id: "back", label: "Voltar no navegador", icon: "chevronLeft" },
  { id: "forward", label: "Avançar no navegador", icon: "chevronRight" }
];

function componentLabel(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function toneForState(state?: string): ComponentTone {
  if (!state) return "neutral";
  const normalizedState = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) {
    return "success";
  }
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) {
    return "warning";
  }
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState)) {
    return "info";
  }
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) {
    return "danger";
  }
  if (["paused", "disabled", "read-only"].includes(normalizedState)) {
    return "paused";
  }
  return "neutral";
}

function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function iconForFamily(family?: string): IconName {
  switch (family) {
    case "Agents":
    case "Agent":
    case "Setup":
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
    case "Config":
    case "Internal":
      return "settings";
    case "Approvals":
    case "Advanced States":
      return "shield";
    case "Reports":
      return "layout";
    default:
      return "clipboard";
  }
}

export interface CrmSurfaceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  state?: string;
  statusLabel?: React.ReactNode;
  icon?: IconName;
  action?: React.ReactNode;
  selected?: boolean;
}

export function CrmSurface({
  component,
  family,
  title,
  description,
  meta,
  state,
  statusLabel,
  icon,
  action,
  selected = false,
  className,
  children,
  ...props
}: CrmSurfaceProps & { component: string; family?: string }) {
  const tone = toneForState(state);

  return (
    <Card
      className={cn("tcrm-surface", `tcrm-surface--${component}`, className)}
      data-component={component}
      selected={selected}
      {...props}
    >
      <header className="tcrm-surface__header">
        <span className="tcrm-surface__icon">
          <Icon name={icon ?? iconForFamily(family)} />
        </span>
        <div>
          <h3>{title ?? componentLabel(component)}</h3>
          {meta ? <p>{meta}</p> : null}
        </div>
        {statusLabel || state ? <Chip tone={tone}>{statusLabel ?? state}</Chip> : null}
      </header>
      {description ? <p className="tcrm-surface__description">{description}</p> : null}
      {children ? <div className="tcrm-surface__body">{children}</div> : null}
      {action ? <footer className="tcrm-surface__footer">{action}</footer> : null}
    </Card>
  );
}

export function Sidebar({
  items = defaultSidebarItems,
  footer,
  className
}: {
  items?: SidebarItemData[];
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn("tcrm-sidebar", className)}>
      <TaliyaLogo variant="mark" />
      <nav className="tcrm-sidebar__nav" aria-label="Navegação principal">
        {items.map((item) => (
          <SidebarItem key={item.id} {...item} />
        ))}
      </nav>
      <div className="tcrm-sidebar__footer">{footer ?? <Avatar name="Studio Taliya" size="sm" status="online" />}</div>
    </aside>
  );
}

export interface SidebarItemProps extends SidebarItemData, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "id"> {}

export function SidebarItem({
  id,
  label,
  icon,
  active = false,
  alert = false,
  disabled = false,
  className,
  type = "button",
  ...props
}: SidebarItemProps) {
  return (
    <IconButton
      alert={alert}
      aria-current={active ? "page" : undefined}
      className={cn("tcrm-sidebar-item", className)}
      disabled={disabled}
      icon={icon}
      id={id}
      label={label}
      selected={active}
      type={type}
      {...props}
    />
  );
}
