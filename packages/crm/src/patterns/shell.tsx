/** CRM shell, page-family and reusable layout patterns. */
import React from "react";

import {
  Avatar,
  AuditTable,
  Badge,
  Button,
  Card,
  Chip,
  EmptyState,
  ErrorState,
  FilterSelect,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListIcon,
  ListItem,
  LoadingState,
  MetricTile,
  NavPill,
  Panel,
  SegmentedControl,
  StatusDot,
  Tabs,
  TaliyaLogo,
  cn
} from "@taliya/ui";
import type {
  AuditTableRow,
  AvatarProps,
  ComponentTone,
  IconName,
  StatusDotStatus,
  TabItem
} from "@taliya/ui";


import {
  CrmDrawer,
  QuickReplyChips
} from "./index.js";
import type {
  CrmDrawerFact
} from "./index.js";

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

function CrmSurface({
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

export function Topbar({
  tabs = ["Hoje", "Ações", "Histórico"],
  activeTab = "Hoje",
  actions,
  className
}: {
  tabs?: Array<string | CrmShellNavItem>;
  activeTab?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("tcrm-topbar", className)}>
      <nav className="tcrm-topbar__tabs" aria-label="Navegação contextual">
        {tabs.map((tab) => {
          const item = typeof tab === "string" ? { id: tab, label: tab, active: tab === activeTab } : tab;
          const isActive = item.active ?? item.label === activeTab;

          return (
            <NavPill active={isActive} aria-current={isActive ? "page" : undefined} disabled={item.disabled} key={item.id}>
              {item.label}
            </NavPill>
          );
        })}
      </nav>
      {actions ?? <GlobalActions />}
    </header>
  );
}

export function GlobalActions({
  avatarSrc,
  className
}: {
  avatarSrc?: string;
  className?: string;
}) {
  return (
    <div className={cn("tcrm-global-actions", className)} role="group" aria-label="Ações globais">
      <IconButton icon="search" label="Buscar no CRM" />
      <IconButton alert icon="mail" label="Mensagens" />
      <IconButton alert icon="bell" label="Notificações" />
      <Avatar name="Lucas Studio" size="sm" src={avatarSrc} status="online" />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  className
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("tcrm-page-header", className)}>
      <div>
        {breadcrumb}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className="tcrm-page-header__actions">{actions}</div> : null}
    </header>
  );
}

export function CrmBrowserTrafficLights({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("tcrm-browser-traffic", className)}>
      <span className="tcrm-browser-traffic__light tcrm-browser-traffic__light--red" />
      <span className="tcrm-browser-traffic__light tcrm-browser-traffic__light--gray" />
      <span className="tcrm-browser-traffic__light tcrm-browser-traffic__light--green" />
    </div>
  );
}

export interface CrmBrowserToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
}

export function CrmBrowserToolbarButton({
  icon,
  label,
  className,
  type = "button",
  ...props
}: CrmBrowserToolbarButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn("tcrm-browser-toolbar__button", className)}
      title={label}
      type={type}
      {...props}
    >
      <Icon name={icon} size={icon === "star" ? 16 : icon === "book" ? 17 : 20} />
    </button>
  );
}

export function CrmBrowserToolbar({
  items = crmBrowserToolbarItems,
  className,
  onAction
}: {
  items?: CrmBrowserToolbarItem[];
  className?: string;
  onAction?: (item: CrmBrowserToolbarItem) => void;
}) {
  return (
    <div
      aria-hidden={onAction ? undefined : true}
      aria-label={onAction ? "Controles do navegador" : undefined}
      className={cn("tcrm-browser-toolbar", className)}
      role={onAction ? "toolbar" : undefined}
    >
      {items.map((item) => onAction ? (
        <CrmBrowserToolbarButton
          disabled={item.disabled}
          icon={item.icon}
          key={item.id}
          label={item.label}
          onClick={() => onAction(item)}
        />
      ) : (
        <span className="tcrm-browser-toolbar__button" key={item.id}>
          <Icon name={item.icon} size={item.icon === "star" ? 16 : item.icon === "book" ? 17 : 20} />
        </span>
      ))}
    </div>
  );
}

export function CrmBrowserAddressBar({
  url = "https://app.taliya.com",
  className
}: {
  url?: string;
  className?: string;
}) {
  return (
    <div className={cn("tcrm-browser-address", className)} aria-label={url} role="group">
      <Icon name="lock" size={13} />
      <span>{url}</span>
      <Icon name="refresh" size={14} />
    </div>
  );
}

export function CrmBrowserChrome({
  className,
  toolbarItems = crmBrowserToolbarItems,
  onToolbarAction,
  url
}: {
  className?: string;
  toolbarItems?: CrmBrowserToolbarItem[];
  onToolbarAction?: (item: CrmBrowserToolbarItem) => void;
  url?: string;
}) {
  return (
    <div aria-hidden={onToolbarAction ? undefined : true} className={cn("tcrm-browser-chrome", className)}>
      <CrmBrowserTrafficLights />
      <CrmBrowserToolbar items={toolbarItems} onAction={onToolbarAction} />
      <CrmBrowserAddressBar url={url} />
    </div>
  );
}

export function CrmShellBrand({ className }: { className?: string }) {
  return (
    <div className={cn("tcrm-shell-brand", className)}>
      <TaliyaLogo className="tcrm-shell-brand__logo" />
    </div>
  );
}

export interface CrmShellIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  alert?: boolean;
  pressed?: boolean;
}

function CrmShellIconButton({
  icon,
  label,
  alert = false,
  pressed = false,
  className,
  type = "button",
  ...props
}: CrmShellIconButtonProps) {
  return (
    <IconButton
      alert={alert}
      className={cn("tcrm-shell-round-button", className)}
      icon={icon}
      label={label}
      selected={pressed}
      size="md"
      type={type}
      {...props}
    />
  );
}

/** @deprecated Use CrmSidebarFloatingButton, CrmTopbarActionButton, or IconButton according to placement. */
export function CrmShellRoundButton(props: CrmShellIconButtonProps) {
  return <CrmShellIconButton {...props} />;
}

export function CrmSidebarFloatingButton({ className, ...props }: CrmShellIconButtonProps) {
  return <CrmShellIconButton className={cn("tcrm-sidebar-floating-button", className)} {...props} />;
}

export function CrmTopbarActionButton({ className, ...props }: CrmShellIconButtonProps) {
  return <CrmShellIconButton className={cn("tcrm-topbar-action-button", className)} {...props} />;
}

export function CrmSidebarNavigation({
  items = crmEmptyShellSidebarItems,
  className,
  onSelect
}: {
  items?: CrmShellSidebarItem[];
  className?: string;
  onSelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <nav className={cn("tcrm-empty-shell-sidebar__nav", className)} aria-label="Navegação do CRM">
      {items.map((item) => (
        <CrmSidebarFloatingButton
          alert={item.alert}
          aria-current={item.active ? "page" : undefined}
          disabled={item.disabled}
          icon={item.icon}
          key={item.id}
          label={item.label}
          onClick={() => onSelect?.(item)}
          pressed={item.active}
        />
      ))}
    </nav>
  );
}

export function CrmSidebarUtilityNavigation({
  items = crmEmptyShellSidebarUtilityItems,
  className,
  onSelect
}: {
  items?: CrmShellSidebarItem[];
  className?: string;
  onSelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <nav className={cn("tcrm-empty-shell-sidebar__utility", className)} aria-label="Preferências visuais">
      {items.map((item) => (
        <CrmSidebarFloatingButton
          alert={item.alert}
          aria-current={item.active ? "page" : undefined}
          disabled={item.disabled}
          icon={item.icon}
          key={item.id}
          label={item.label}
          onClick={() => onSelect?.(item)}
          pressed={item.active}
        />
      ))}
    </nav>
  );
}

export function CrmShellSidebar({
  items = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  className,
  onSelect,
  onUtilitySelect
}: {
  items?: CrmShellSidebarItem[];
  utilityItems?: CrmShellSidebarItem[];
  className?: string;
  onSelect?: (item: CrmShellSidebarItem) => void;
  onUtilitySelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <aside className={cn("tcrm-empty-shell-sidebar", className)}>
      <CrmShellBrand />
      <CrmSidebarNavigation items={items} onSelect={onSelect} />
      <CrmSidebarUtilityNavigation items={utilityItems} onSelect={onUtilitySelect ?? onSelect} />
    </aside>
  );
}

export function CrmShellBackButton({
  label = "Voltar",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }) {
  return (
    <IconButton
      className={cn("tcrm-empty-shell-back", className)}
      icon="chevronLeft"
      label={label}
      size="md"
      type={type}
      {...props}
    />
  );
}

export interface CrmTopbarNavChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: CrmShellNavItem;
}

export function CrmTopbarNavChip({
  item,
  className,
  disabled,
  type = "button",
  ...props
}: CrmTopbarNavChipProps) {
  return (
    <NavPill
      active={item.active}
      aria-current={item.active ? "page" : undefined}
      className={className}
      disabled={disabled ?? item.disabled}
      type={type}
      variant="shell"
      {...props}
    >
      {item.label}
    </NavPill>
  );
}

/** @deprecated Use CrmTopbarNavChip or CrmShellTopNav. */
export function CrmShellTopNavItem(props: CrmTopbarNavChipProps) {
  return <CrmTopbarNavChip {...props} />;
}

export function CrmShellTopNav({
  items = crmEmptyShellNavItems,
  className,
  onChange,
  selectionMode = "auto"
}: {
  items?: CrmShellNavItem[];
  className?: string;
  onChange?: (id: string) => void;
  selectionMode?: "auto" | "none";
}) {
  const activeItem = selectionMode === "none"
    ? undefined
    : items.find((item) => item.active && !item.disabled) ?? items.find((item) => !item.disabled) ?? items[0];

  return (
    <nav className={cn("tcrm-empty-shell-nav", className)} aria-label="Seções">
      {items.map((item) => {
        const isActive = item.id === activeItem?.id;

        return (
          <CrmTopbarNavChip
            item={{ ...item, active: isActive }}
            key={item.id}
            onClick={() => {
              if (!item.disabled) onChange?.(item.id);
            }}
          />
        );
      })}
    </nav>
  );
}

export function CrmShellAvatar({
  src,
  name = "Operadora",
  selected = false,
  status,
  badge,
  disabled,
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  src?: string;
  name?: string;
  selected?: boolean;
  status?: AvatarProps["status"];
  badge?: React.ReactNode;
}) {
  return (
    <button
      aria-label={name}
      aria-pressed={selected || undefined}
      className={cn("tcrm-empty-shell-avatar", className)}
      disabled={disabled}
      title={name}
      type={type}
      {...props}
    >
      <Avatar aria-hidden="true" badge={badge} disabled={disabled} name={name} selected={selected} size="md" src={src} status={status} />
    </button>
  );
}

export interface CrmShellGlobalActionsCallbacks {
  onSearch?: React.MouseEventHandler<HTMLButtonElement>;
  onMessages?: React.MouseEventHandler<HTMLButtonElement>;
  onNotifications?: React.MouseEventHandler<HTMLButtonElement>;
  onAvatar?: React.MouseEventHandler<HTMLButtonElement>;
}

export function CrmShellGlobalActions({
  avatarSrc,
  className,
  onSearch,
  onMessages,
  onNotifications,
  onAvatar
}: {
  avatarSrc?: string;
  className?: string;
} & CrmShellGlobalActionsCallbacks) {
  return (
    <div className={cn("tcrm-empty-shell-actions", className)} role="group" aria-label="Ações globais">
      <CrmTopbarActionButton icon="search" label="Buscar" onClick={onSearch} />
      <CrmTopbarActionButton alert icon="mail" label="Mensagens" onClick={onMessages} />
      <CrmTopbarActionButton alert icon="bell" label="Notificações" onClick={onNotifications} />
      <CrmShellAvatar onClick={onAvatar} src={avatarSrc} />
    </div>
  );
}

export function CrmEmptyShellTopbar({
  navItems = crmEmptyShellNavItems,
  avatarSrc,
  className,
  globalActions,
  onNavChange
}: {
  navItems?: CrmShellNavItem[];
  avatarSrc?: string;
  className?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  onNavChange?: (id: string) => void;
}) {
  return (
    <div className={cn("tcrm-empty-shell-topbar", className)}>
      <CrmShellBackButton />
      <CrmShellTopNav items={navItems} onChange={onNavChange} />
      <CrmShellGlobalActions {...globalActions} avatarSrc={avatarSrc} />
    </div>
  );
}

export function CrmEmptyShellPageHeader({ title = "Jornadas" }: { title?: string }) {
  return (
    <header className="tcrm-empty-shell-page-header">
      <h1>{title}</h1>
    </header>
  );
}

export type CrmEmptyShellState = "empty" | "loading" | "unavailable";

export function CrmEmptyShellCanvas({
  state = "empty",
  onRetry,
  className,
  embedded = false
}: {
  state?: CrmEmptyShellState;
  onRetry?: () => void;
  className?: string;
  embedded?: boolean;
}) {
  const content = (
    <>
      {state === "loading" ? <LoadingState title="Carregando jornadas" variant="panel" /> : null}
      {state === "unavailable" ? (
        <ErrorState
          action={onRetry ? <Button onClick={onRetry} variant="primary">Tentar novamente</Button> : undefined}
          description="Não foi possível carregar esta área agora."
          title="Conteúdo indisponível"
        />
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <div
        aria-busy={state === "loading" || undefined}
        aria-label={state === "empty" ? "Área de conteúdo vazia" : "Estado da área de conteúdo"}
        className={cn("tcrm-empty-shell-canvas__state", className)}
        data-state={state}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label={state === "empty" ? "Área de conteúdo vazia" : "Estado da área de conteúdo"}
      className={cn("tcrm-empty-shell-canvas", className)}
      data-state={state}
    >
      {content}
    </section>
  );
}

export function CrmEmptyShellWindow({
  children,
  chrome,
  className
}: React.PropsWithChildren<{
  chrome?: React.ReactNode | false;
  className?: string;
}>) {
  return (
    <ProductWindowFrame bodyClassName="tcrm-empty-shell-window__body" chrome={chrome} className={cn("tcrm-empty-shell-window", className)}>
      {children}
    </ProductWindowFrame>
  );
}

export function CrmEmptyShell({
  title = "Jornadas",
  navItems = crmEmptyShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  className,
  globalActions,
  state = "empty",
  onBack,
  onNavChange,
  onRetry,
  onSidebarSelect,
  onSidebarUtilitySelect
}: {
  title?: string;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  utilityItems?: CrmShellSidebarItem[];
  avatarSrc?: string;
  className?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  state?: CrmEmptyShellState;
  onBack?: () => void;
  onNavChange?: (id: string) => void;
  onRetry?: () => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <CrmPageFamilyShell
      activeNavId={activeItemId(navItems, undefined)}
      avatarSrc={avatarSrc}
      className={cn("tcrm-empty-shell-page", className)}
      contentClassName={cn("tcrm-empty-shell-page__canvas", `tcrm-empty-shell-page__canvas--${state}`)}
      globalActions={globalActions}
      navItems={navItems}
      onBack={onBack}
      onNavChange={onNavChange}
      onSidebarSelect={onSidebarSelect}
      onSidebarUtilitySelect={onSidebarUtilitySelect}
      sidebarItems={sidebarItems}
      title={title}
      utilityItems={utilityItems}
    >
      <CrmEmptyShellCanvas embedded onRetry={onRetry} state={state} />
    </CrmPageFamilyShell>
  );
}

export type CrmProductShellVariant = "crm" | "internal";
export type CrmProductShellFrame = "fullscreen" | "window" | "window-inset" | "reference";
export type CrmProductShellPageHeaderRhythm = "default" | "spacious" | "compact-stacked" | "dashboard" | "reports" | "support" | "internal-overview" | "internal-tenants" | "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish" | "settings-hub" | "overview" | "operation" | "inbox" | "usage" | "usage-overview" | "billing" | "billing-invoices";
export type CrmProductShellContentLayout = "default" | "work-list" | "work-list-compact" | "work-list-wide" | "main-priority" | "kanban" | "three-pane" | "student-profile" | "class-operation" | "finance-overview" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "settings-hub" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "opportunity" | "support" | "internal-overview" | "internal-tenants" | "internal-tenant-detail";

export interface CrmProductShellRegions {
  browserChrome?: boolean;
  sidebar?: boolean;
  topbar?: boolean;
  backButton?: boolean;
  topNav?: boolean;
  globalActions?: boolean;
  pageHeader?: boolean;
}

export interface CrmProductShellBrand {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export interface CrmProductShellProps extends React.PropsWithChildren<{
  title: string;
  subtitle?: string;
  variant?: CrmProductShellVariant;
  frame?: CrmProductShellFrame;
  brand?: CrmProductShellBrand;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  utilityItems?: CrmShellSidebarItem[];
  avatarSrc?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  browserUrl?: string;
  className?: string;
  contentClassName?: string;
  contentLayout?: CrmProductShellContentLayout;
  drawer?: React.ReactNode;
  showGlobalActionsWithDrawer?: boolean;
  pageHeaderRhythm?: CrmProductShellPageHeaderRhythm;
  regions?: CrmProductShellRegions;
  topbarStart?: React.ReactNode;
  topbarCenter?: React.ReactNode;
  topbarEnd?: React.ReactNode;
  topNavSelection?: "auto" | "none";
  pageHeaderMeta?: React.ReactNode;
  pageHeaderBreadcrumb?: React.ReactNode;
  pageHeaderActions?: React.ReactNode;
  onBack?: () => void;
  onNavChange?: (id: string) => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}> {}

export function CrmProductShell({
  title,
  subtitle,
  variant = "crm",
  frame = "fullscreen",
  brand,
  navItems = crmEmptyShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  globalActions,
  browserUrl,
  children,
  className,
  contentClassName,
  contentLayout = "default",
  drawer,
  showGlobalActionsWithDrawer = false,
  pageHeaderRhythm = "default",
  regions,
  topbarStart,
  topbarCenter,
  topbarEnd,
  topNavSelection = "auto",
  pageHeaderMeta,
  pageHeaderBreadcrumb,
  pageHeaderActions,
  onBack,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect
}: CrmProductShellProps) {
  const resolvedRegions: Required<CrmProductShellRegions> = {
    browserChrome: regions?.browserChrome ?? true,
    sidebar: regions?.sidebar ?? true,
    topbar: regions?.topbar ?? true,
    backButton: regions?.backButton ?? true,
    topNav: regions?.topNav ?? true,
    globalActions: regions?.globalActions ?? true,
    pageHeader: regions?.pageHeader ?? true
  };
  const showTopbar = resolvedRegions.topbar && (
    resolvedRegions.backButton ||
    resolvedRegions.topNav ||
    resolvedRegions.globalActions ||
    Boolean(topbarStart) ||
    Boolean(topbarCenter) ||
    Boolean(topbarEnd)
  );
  const shellClassName = cn(
    "tcrm-empty-shell-stage tcrm-product-shell-stage",
    `tcrm-product-shell-stage--${variant}`,
    frame !== "fullscreen" && `tcrm-product-shell-stage--frame-${frame}`,
    !resolvedRegions.browserChrome && "tcrm-product-shell-stage--no-browser-chrome",
    !resolvedRegions.sidebar && "tcrm-product-shell-stage--no-sidebar",
    !showTopbar && "tcrm-product-shell-stage--no-topbar",
    !resolvedRegions.pageHeader && "tcrm-product-shell-stage--no-page-header",
    Boolean(drawer) && "tcrm-product-shell-stage--drawer",
    Boolean(drawer) && showGlobalActionsWithDrawer && "tcrm-product-shell-stage--drawer-global-actions",
    pageHeaderRhythm !== "default" && `tcrm-product-shell-stage--page-header-${pageHeaderRhythm}`,
    Boolean(pageHeaderBreadcrumb) && "tcrm-product-shell-stage--page-header-breadcrumb",
    Boolean(pageHeaderMeta) && "tcrm-product-shell-stage--page-header-meta",
    contentLayout !== "default" && `tcrm-product-shell-stage--content-${contentLayout}`,
    className
  );
  const windowClassName = cn(
    "tcrm-product-shell-window",
    frame !== "fullscreen" && `tcrm-product-shell-window--frame-${frame}`,
    Boolean(drawer) && "tcrm-product-shell-window--drawer",
    Boolean(drawer) && showGlobalActionsWithDrawer && "tcrm-product-shell-window--drawer-global-actions",
    !resolvedRegions.browserChrome && "tcrm-product-shell-window--no-browser-chrome"
  );
  const pageLabel = String(title);

  return (
    <div className={shellClassName} data-component="CrmProductShell" data-shell-variant={variant}>
      <CrmEmptyShellWindow chrome={resolvedRegions.browserChrome ? (browserUrl ? <CrmBrowserChrome url={browserUrl} /> : undefined) : false} className={windowClassName}>
        {resolvedRegions.sidebar ? (
          <CrmShellSidebar items={sidebarItems} onSelect={onSidebarSelect} onUtilitySelect={onSidebarUtilitySelect} utilityItems={utilityItems} />
        ) : null}
        <main className="tcrm-empty-shell-main tcrm-product-shell-main">
          {showTopbar ? (
            <div className="tcrm-empty-shell-topbar tcrm-product-shell-topbar">
              {topbarStart ? <div className="tcrm-product-shell-topbar__start">{topbarStart}</div> : null}
              {resolvedRegions.backButton ? <CrmShellBackButton onClick={onBack} /> : null}
              {resolvedRegions.topNav ? <CrmShellTopNav items={navItems} onChange={onNavChange} selectionMode={topNavSelection} /> : null}
              {topbarCenter ? <div className="tcrm-product-shell-topbar__center">{topbarCenter}</div> : null}
              {resolvedRegions.globalActions ? <CrmShellGlobalActions {...globalActions} avatarSrc={avatarSrc} /> : null}
              {topbarEnd ? <div className="tcrm-product-shell-topbar__end">{topbarEnd}</div> : null}
            </div>
          ) : null}
          {resolvedRegions.pageHeader ? (
            <header className="tcrm-empty-shell-page-header tcrm-product-shell-page-header">
              <div className="tcrm-product-shell-page-header__copy">
                {pageHeaderBreadcrumb ? <div className="tcrm-product-shell-page-header__breadcrumb">{pageHeaderBreadcrumb}</div> : null}
                {brand?.title ? <span className="tcrm-product-shell-page-header__brand">{brand.title}</span> : null}
                <h1>{title}</h1>
                {subtitle || brand?.subtitle ? <p>{subtitle ?? brand?.subtitle}</p> : null}
                {pageHeaderMeta ? <div className="tcrm-product-shell-page-header__meta">{pageHeaderMeta}</div> : null}
              </div>
              {pageHeaderActions ? <div className="tcrm-product-shell-page-header__actions">{pageHeaderActions}</div> : null}
            </header>
          ) : null}
          <section className={cn("tcrm-empty-shell-canvas tcrm-product-shell-content", contentClassName)} aria-label={pageLabel}>
            {children}
          </section>
        </main>
      </CrmEmptyShellWindow>
      {drawer}
    </div>
  );
}

export type JourneyShellAction = "add" | "share" | "calendar";

export interface JourneyShellCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (surface: "primary" | "secondary-left" | "secondary-right", action: JourneyShellAction) => void;
}

const journeyParticipantCounts = [2, 3, 2, 1, 0, 1, 0, 0];

function JourneyShellActions({ surface, onAction }: Pick<JourneyShellCanvasProps, "onAction"> & { surface: "primary" | "secondary-left" | "secondary-right" }) {
  return <div className="tcrm-journey-shell-canvas__actions">
    <IconButton icon="plus" label="Adicionar" onClick={() => onAction?.(surface, "add")} variant="subtle" />
    <IconButton icon="upload" label="Compartilhar" onClick={() => onAction?.(surface, "share")} variant="subtle" />
    <IconButton icon="calendar" label="Abrir calendario" onClick={() => onAction?.(surface, "calendar")} variant="subtle" />
  </div>;
}

export function JourneyShellCanvas({ onAction, className, ...props }: JourneyShellCanvasProps) {
  return <div className={cn("tcrm-journey-shell-canvas", className)} data-component="JourneyShellCanvas" {...props}>
    <Panel className="tcrm-journey-shell-canvas__surface tcrm-journey-shell-canvas__surface--primary" variant="crm">
      <h2>Area principal</h2>
      <div aria-label="Participantes" className="tcrm-journey-shell-canvas__participants">
        {journeyParticipantCounts.map((count, index) => <span className="tcrm-journey-shell-canvas__participant" key={index}>
          <Icon name="user" size="md" tone="neutral" />
          <small className={count > 0 ? (index < 2 ? "is-info" : "is-danger") : undefined}>{count}</small>
        </span>)}
      </div>
      <JourneyShellActions onAction={onAction} surface="primary" />
    </Panel>
    <div className="tcrm-journey-shell-canvas__lower">
      <Panel className="tcrm-journey-shell-canvas__surface" variant="crm"><JourneyShellActions onAction={onAction} surface="secondary-left" /></Panel>
      <Panel className="tcrm-journey-shell-canvas__surface" variant="crm"><JourneyShellActions onAction={onAction} surface="secondary-right" /></Panel>
    </div>
  </div>;
}

export type CrmOperationalRowKind = "default" | "checklist" | "schedule" | "money";

export interface CrmOperationalRowData {
  id: string;
  title: string;
  meta?: string;
  tone?: ComponentTone;
  icon?: IconName;
  status?: string;
  statusTone?: ComponentTone;
  selected?: boolean;
  completed?: boolean;
  disabled?: boolean;
}

export interface CrmOperationalPanelProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  icon: IconName;
  badge?: React.ReactNode;
  compact?: boolean;
  footer?: React.ReactNode;
}

export function CrmOperationalPanel({
  title,
  icon,
  badge,
  compact = false,
  footer,
  className,
  children,
  ...props
}: CrmOperationalPanelProps) {
  return (
    <Panel className={cn("tcrm-operational-panel", compact && "tcrm-operational-panel--compact", className)} variant="crm" {...props}>
      <header className="tcrm-operational-panel__header">
        <InlineGroup compact>
          <Icon name={icon} size={18} />
          <strong>{title}</strong>
        </InlineGroup>
        {badge}
      </header>
      {children}
      {footer ? <footer className="tcrm-operational-panel__footer">{footer}</footer> : null}
    </Panel>
  );
}

function statusForOperationalTone(tone?: ComponentTone): StatusDotStatus {
  if (tone === "success") return "success";
  if (tone === "warning") return "warning";
  if (tone === "danger") return "error";
  if (tone === "info") return "info";
  return "neutral";
}

export interface CrmOperationalRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  row: CrmOperationalRowData;
  dense?: boolean;
  compact?: boolean;
  kind?: CrmOperationalRowKind;
}

export function CrmOperationalRow({
  row,
  dense = false,
  compact = false,
  kind = "default",
  className,
  type = "button",
  ...props
}: CrmOperationalRowProps) {
  return (
    <button
      aria-label={props["aria-label"] ?? `Abrir ${row.title}`}
      aria-pressed={row.selected || undefined}
      className={cn(
        "tcrm-operational-row",
        `tcrm-operational-row--${kind}`,
        dense && "tcrm-operational-row--dense",
        compact && "tcrm-operational-row--compact",
        row.selected && "is-selected",
        row.completed && "is-complete",
        className
      )}
      data-component="CrmOperationalRow"
      data-completed={row.completed || undefined}
      {...props}
      disabled={row.disabled || props.disabled}
      type={type}
    >
      <span className="tcrm-operational-row__leading">
        {row.completed && kind === "checklist" ? (
          <span aria-label="Concluido" className="tcrm-operational-row__completed-mark"><Icon name="check" size={12} /></span>
        ) : row.icon ? <ListIcon icon={row.icon} tone={row.tone ?? "neutral"} /> : <StatusDot status={statusForOperationalTone(row.tone)} />}
      </span>
      <span className="tcrm-operational-row__content">
        <strong>{row.title}</strong>
        {row.meta ? <small>{row.meta}</small> : null}
      </span>
      {row.status ? <Chip showDot={false} tone={row.statusTone ?? row.tone ?? "neutral"}>{row.status}</Chip> : null}
      <Icon name="chevronRight" size={16} />
    </button>
  );
}

export interface CrmOperationalRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: CrmOperationalRowData[];
  dense?: boolean;
  compact?: boolean;
  kind?: CrmOperationalRowKind;
  onRowOpen?: (row: CrmOperationalRowData) => void;
}

export function CrmOperationalRows({
  rows,
  dense = false,
  compact = false,
  kind = "default",
  className,
  onRowOpen,
  ...props
}: CrmOperationalRowsProps) {
  return (
    <div className={cn("tcrm-operational-rows", dense && "tcrm-operational-rows--dense", compact && "tcrm-operational-rows--compact", `tcrm-operational-rows--${kind}`, className)} {...props}>
      {rows.map((row) => (
        <CrmOperationalRow compact={compact} dense={dense} kind={kind} key={row.id} onClick={() => onRowOpen?.(row)} row={row} />
      ))}
    </div>
  );
}

export const QuotaBadge = ({
  value,
  label,
  className
}: {
  value: 70 | 90 | 100 | "normal";
  label?: string;
  className?: string;
}) => {
  const tone: ComponentTone = value === "normal" ? "success" : value === 70 ? "info" : value === 90 ? "warning" : "danger";
  return (
    <Chip className={className} icon={value === "normal" ? "checkCircle" : undefined} showDot={false} tone={tone}>
      {label ?? (value === "normal" ? "Normal" : `${value}%`)}
    </Chip>
  );
};

export function MetricCard({
  label,
  value,
  trend,
  tone = "neutral",
  action,
  className
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  trend?: React.ReactNode;
  tone?: ComponentTone;
  action?: React.ReactNode;
  className?: string;
}) {
  const metricTone = tone === "success" ? "positive" : tone === "danger" ? "negative" : tone === "warning" ? "warning" : "neutral";
  return (
    <MetricTile
      action={action}
      className={cn("tcrm-metric-card", className)}
      delta={trend}
      label={label}
      tone={metricTone}
      value={value}
    />
  );
}

export function StatusCard({
  title,
  description,
  state = "ok",
  action,
  className,
  children
}: CrmSurfaceProps) {
  return (
    <CrmSurface
      className={cn("tcrm-status-card", className)}
      component="StatusCard"
      description={description}
      icon={state === "blocked" ? "lock" : "shield"}
      state={state}
      title={title}
      action={action}
    >
      {children}
    </CrmSurface>
  );
}

export function AgentStatus({
  state = "active",
  label,
  className
}: {
  state?: "active" | "paused" | "blocked" | "helping";
  label?: string;
  className?: string;
}) {
  const status = state === "active" ? "online" : state === "paused" ? "paused" : state === "blocked" ? "error" : "success";
  return <StatusDot className={className} label={label ?? componentLabel(state)} status={status} />;
}

export function AgentPanel({
  title = "Agente Taliya",
  role = "Assistente contextual",
  state = "active",
  suggestions,
  children,
  className
}: CrmSurfaceProps & { role?: React.ReactNode; suggestions?: string[] }) {
  return (
    <Panel className={cn("tcrm-agent-panel", className)} variant="elevated">
      <header className="tcrm-agent-panel__header">
        <Avatar name="Taliya" size="md" status={state === "blocked" ? "error" : "online"} />
        <div>
          <h3>{title}</h3>
          <AgentStatus label={role?.toString()} state={state === "blocked" ? "blocked" : "active"} />
        </div>
      </header>
      <div className="tcrm-agent-panel__body">{children ?? <p>Pronto para orientar sem executar ações sensíveis sozinho.</p>}</div>
      {suggestions ? <QuickReplyChips items={suggestions} /> : null}
    </Panel>
  );
}

export interface SettingsAgentPanelInsight {
  id: string;
  content: React.ReactNode;
}

export interface SettingsAgentPanelReview {
  title?: string;
  description: React.ReactNode;
  actionLabel?: React.ReactNode;
}

export interface SettingsAgentPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "role" | "title"> {
  title?: React.ReactNode;
  role?: React.ReactNode;
  introduction?: React.ReactNode;
  insights?: SettingsAgentPanelInsight[];
  questions?: string[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  review?: SettingsAgentPanelReview;
  onQuestionSelect?: (question: string) => void;
  onSend?: (message: string) => void;
  onHelp?: () => void;
  onReviewAction?: () => void;
}

const settingsAgentPanelDefaultInsights: SettingsAgentPanelInsight[] = [
  { id: "owner", content: "O Dono/Admin mantém acesso total a todas as áreas do CRM, incluindo configurações e relatórios." },
  { id: "roles", content: "Recepção e Professor têm limites diferentes para proteger dados dos alunos e garantir processos corretos." }
];

const settingsAgentPanelDefaultQuestions = [
  "O que a Recepção pode fazer?",
  "Professor deve ver WhatsApp?",
  "Quando precisa aprovação?",
  "O que muda ao salvar?"
];

export function SettingsAgentPanel({
  title = "Agente de Configuração",
  role = "Ajudando em permissões",
  introduction = "Permissões definem o que cada pessoa pode fazer. Limites de agentes e fluxos ficam em Agentes/Fluxos.",
  insights = settingsAgentPanelDefaultInsights,
  questions = settingsAgentPanelDefaultQuestions,
  placeholder = "Pergunte sobre permissões...",
  helpLabel = "Agendar ajuda",
  review,
  onQuestionSelect,
  onSend,
  onHelp,
  onReviewAction,
  className,
  ...props
}: SettingsAgentPanelProps) {
  const [message, setMessage] = React.useState("");

  return (
    <Panel className={cn("tcrm-settings-agent-panel", className)} data-component="SettingsAgentPanel" variant="elevated" {...props}>
      <header className="tcrm-settings-agent-panel__header">
        <Avatar name="Taliya" size="md" status="online" />
        <span>
          <h3>{title}</h3>
          <AgentStatus label={role?.toString()} state="active" />
        </span>
      </header>
      <div className="tcrm-settings-agent-panel__body">
        {review ? (
          <InlineAlert className="tcrm-settings-agent-panel__review" tone="warning" title={review.title ?? "Revisão necessária"}>
            <span>{review.description}</span>
            {review.actionLabel ? <Button onClick={onReviewAction} size="sm" variant="secondary">{review.actionLabel}</Button> : null}
          </InlineAlert>
        ) : null}
        <InlineAlert className="tcrm-settings-agent-panel__intro" tone="info">
          {introduction}
        </InlineAlert>
        <div className="tcrm-settings-agent-panel__insights">
          {insights.map((insight) => <Card key={insight.id}>{insight.content}</Card>)}
        </div>
        <div aria-label="Perguntas sugeridas" className="tcrm-settings-agent-panel__questions" role="list">
          {questions.map((question) => (
            <Button key={question} leadingIcon="help" onClick={() => onQuestionSelect?.(question)} variant="secondary">
              {question}
            </Button>
          ))}
        </div>
      </div>
      <footer className="tcrm-settings-agent-panel__footer">
        <div className="tcrm-settings-agent-panel__composer">
          <Input
            aria-label="Pergunte ao agente de configuração"
            onChange={(event) => setMessage(event.currentTarget.value)}
            placeholder={placeholder}
            value={message}
          />
          <IconButton
            disabled={!message.trim()}
            icon="send"
            label="Enviar"
            onClick={() => {
              if (!message.trim()) return;
              onSend?.(message);
              setMessage("");
            }}
            variant="selected"
          />
        </div>
        <p>Precisa de ajuda humana? <Button onClick={onHelp} variant="ghost">{helpLabel}</Button></p>
      </footer>
    </Panel>
  );
}

export interface CopilotSuggestionProps extends CrmSurfaceProps {
  showState?: boolean;
}

export function CopilotSuggestion({
  title = "Sugestão do copiloto",
  description,
  state = "suggestion",
  showState = true,
  action,
  children,
  className
}: CopilotSuggestionProps) {
  return (
    <CrmSurface
      className={cn("tcrm-copilot-suggestion", className)}
      component="CopilotSuggestion"
      description={description}
      icon={state === "approval-needed" ? "shield" : "sparkles"}
      state={showState ? state : undefined}
      title={title}
      action={action}
    >
      {children}
    </CrmSurface>
  );
}

export type CopilotPanelState = "source" | "loading" | "empty" | "blocked";
export type CopilotPanelCopyTarget = "summary" | "next-action" | "suggestion";

export interface CopilotPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  state?: CopilotPanelState;
  summaryTitle?: React.ReactNode;
  summary?: React.ReactNode;
  nextActionTitle?: React.ReactNode;
  nextAction?: React.ReactNode;
  suggestionTitle?: React.ReactNode;
  suggestion?: React.ReactNode;
  createTaskLabel?: React.ReactNode;
  insertLabel?: React.ReactNode;
  blockedReason?: React.ReactNode;
  disabled?: boolean;
  onCopyTarget?: (target: CopilotPanelCopyTarget) => void;
  onCreateTask?: () => void;
  onInsert?: () => void;
  onInsertMenu?: () => void;
}

export function CopilotPanel({
  state = "source",
  summaryTitle = "Resumo da conversa",
  summary = "Cliente solicitou reagendar a visita tecnica para quinta-feira pela manha. Aguardando confirmacao de horario e endereco.",
  nextActionTitle = "Proxima melhor acao",
  nextAction = "Confirmar o horario sugerido e validar endereco. Informar duracao prevista da visita tecnica.",
  suggestionTitle = "Sugestao do agente",
  suggestion = "Ola Ana Paula! Confirmo sua visita tecnica para quinta-feira as 09h. Pode me confirmar seu endereco completo para registro?",
  createTaskLabel = "Criar tarefa",
  insertLabel = "Inserir mensagem",
  blockedReason = "Copiloto indisponivel ate a conversa ser revisada.",
  disabled = false,
  onCopyTarget,
  onCreateTask,
  onInsert,
  onInsertMenu,
  className,
  ...props
}: CopilotPanelProps) {
  const controlsDisabled = disabled || state === "loading" || state === "blocked";

  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label="Painel de copiloto"
      className={cn("tcrm-copilot-panel", className)}
      data-component="CopilotPanel"
      data-state={state}
      {...props}
    >
      {state === "loading" ? (
        <LoadingState className="tcrm-copilot-panel__state" title="Carregando copiloto" variant="panel" />
      ) : state === "empty" ? (
        <EmptyState className="tcrm-copilot-panel__state" description="O copiloto ainda nao preparou recomendacoes para esta conversa." title="Sem recomendacoes" />
      ) : state === "blocked" ? (
        <InlineAlert className="tcrm-copilot-panel__state" tone="warning" title="Copiloto bloqueado">{blockedReason}</InlineAlert>
      ) : (
        <>
          <Card className="tcrm-copilot-panel__card tcrm-copilot-panel__card--summary">
            <header className="tcrm-copilot-panel__card-header">
              <ListIcon icon="sparkles" tone="info" />
              <h3>{summaryTitle}</h3>
              <IconButton disabled={controlsDisabled} icon="copy" label="Copiar resumo" onClick={() => onCopyTarget?.("summary")} size="sm" variant="subtle" />
            </header>
            <p>{summary}</p>
          </Card>

          <Card className="tcrm-copilot-panel__card tcrm-copilot-panel__card--next-action">
            <header className="tcrm-copilot-panel__card-header">
              <ListIcon icon="checkCircle" tone="info" />
              <h3>{nextActionTitle}</h3>
              <IconButton disabled={controlsDisabled} icon="copy" label="Copiar proxima acao" onClick={() => onCopyTarget?.("next-action")} size="sm" variant="subtle" />
            </header>
            <p>{nextAction}</p>
            <footer><Button disabled={controlsDisabled} onClick={onCreateTask} size="sm" variant="secondary">{createTaskLabel}</Button></footer>
          </Card>

          <CopilotSuggestion className="tcrm-copilot-panel__suggestion" showState={false} title={suggestionTitle}>
            <IconButton className="tcrm-copilot-panel__copy-suggestion" disabled={controlsDisabled} icon="copy" label="Copiar sugestao" onClick={() => onCopyTarget?.("suggestion")} size="sm" variant="subtle" />
            <p className="tcrm-copilot-panel__message">{suggestion}</p>
            <div className="tcrm-copilot-panel__suggestion-actions">
              <Button disabled={controlsDisabled} onClick={onInsert} size="sm" variant="secondary">{insertLabel}</Button>
              <IconButton disabled={controlsDisabled} icon="chevronDown" label="Mais opcoes de insercao" onClick={onInsertMenu} size="sm" variant="subtle" />
            </div>
          </CopilotSuggestion>
        </>
      )}
    </section>
  );
}

export function ProductWindowFrame({
  children,
  variant = "browser",
  chrome,
  bodyClassName,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "browser" | "app" | "frameless";
  chrome?: React.ReactNode;
  bodyClassName?: string;
}) {
  if (variant === "frameless") return <div className={cn("tcrm-window-frame--frameless", className)} {...props}>{children}</div>;

  return (
    <div className={cn("tcrm-window-frame", `tcrm-window-frame--${variant}`, className)} {...props}>
      {chrome ?? (variant === "browser" ? <CrmBrowserChrome /> : <ProductWindowAppChrome />)}
      <div className={cn("tcrm-window-frame__body", bodyClassName)}>{children}</div>
    </div>
  );
}

export function ProductWindowAppChrome({ className }: { className?: string }) {
  return (
    <div className={cn("tcrm-window-frame__chrome", className)} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function ListDetailLayout({
  list,
  detail,
  children,
  className,
  state,
  listLabel = "Lista",
  mainLabel = "Conteúdo",
  detailLabel = "Detalhe",
  ...props
}: {
  list: React.ReactNode;
  detail?: React.ReactNode;
  children?: React.ReactNode;
  state?: "closed" | "selected";
  listLabel?: string;
  mainLabel?: string;
  detailLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const hasDetail = Boolean(detail) && state !== "closed";
  const effectiveState = hasDetail ? "selected" : "closed";

  return (
    <div
      className={cn("tcrm-list-detail-layout", hasDetail && "tcrm-list-detail-layout--with-detail", className)}
      data-component="ListDetailLayout"
      data-state={effectiveState}
      {...props}
    >
      <aside aria-label={listLabel} className="tcrm-list-detail-layout__list">{list}</aside>
      <section aria-label={mainLabel} className="tcrm-list-detail-layout__main">{children}</section>
      {hasDetail ? <aside aria-label={detailLabel} className="tcrm-list-detail-layout__detail">{detail}</aside> : null}
    </div>
  );
}

export type WorkListDetailPageState = "source" | "loading" | "empty" | "blocked";
export type WorkListDetailPageLayoutMode = "standard" | "main-priority" | "compact-rail" | "balanced-rail" | "wide-main" | "wide-rail";
export type WorkListDetailPageHeightMode = "standard" | "tall";
export type WorkListDetailPageFilterRhythm = "default" | "spacious";

export interface WorkListDetailPageProps extends React.HTMLAttributes<HTMLElement> {
  filterBar: React.ReactNode;
  quickFilters: React.ReactNode;
  children: React.ReactNode;
  after?: React.ReactNode;
  detail?: React.ReactNode;
  state?: WorkListDetailPageState;
  detailState?: "closed" | "selected";
  pageLabel?: string;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  detailLabel?: string;
  filterRhythm?: WorkListDetailPageFilterRhythm;
  layoutMode?: WorkListDetailPageLayoutMode;
  heightMode?: WorkListDetailPageHeightMode;
}

export function WorkListDetailPage({
  filterBar,
  quickFilters,
  children,
  after,
  detail,
  state = "source",
  detailState,
  pageLabel = "Página de trabalho",
  filterBarLabel = "Filtros da página",
  listLabel = "Filtros rápidos",
  mainLabel = "Lista de trabalho",
  detailLabel = "Detalhe",
  filterRhythm = "default",
  layoutMode = "standard",
  heightMode = "standard",
  className,
  ...props
}: WorkListDetailPageProps) {
  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label={pageLabel}
      className={cn(
        "tcrm-work-list-detail-page",
        filterRhythm !== "default" && `tcrm-work-list-detail-page--filter-${filterRhythm}`,
        layoutMode !== "standard" && `tcrm-work-list-detail-page--${layoutMode}`,
        heightMode !== "standard" && `tcrm-work-list-detail-page--height-${heightMode}`,
        Boolean(after) && "tcrm-work-list-detail-page--with-after",
        className
      )}
      data-component="WorkListDetailPage"
      data-filter-rhythm={filterRhythm}
      data-layout-mode={layoutMode}
      data-height-mode={heightMode}
      data-state={state}
      {...props}
    >
      <div aria-label={filterBarLabel} className="tcrm-work-list-detail-page__filter-bar" role="region">
        {filterBar}
      </div>
      <ListDetailLayout
        className="tcrm-work-list-detail-page__layout"
        detail={detail}
        detailLabel={detailLabel}
        list={quickFilters}
        listLabel={listLabel}
        mainLabel={mainLabel}
        state={detailState}
      >
        {children}
      </ListDetailLayout>
      {after ? <div className="tcrm-work-list-detail-page__after">{after}</div> : null}
    </section>
  );
}

export type ThreePaneLayoutActivePane = "list" | "conversation" | "context";

export function ThreePaneLayout({
  activePane = "conversation",
  left,
  center,
  right,
  leftLabel = "Painel esquerdo de conversas",
  centerLabel = "Painel central da conversa",
  rightLabel = "Painel direito de contexto",
  className,
  ...props
}: {
  activePane?: ThreePaneLayoutActivePane;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  leftLabel?: string;
  centerLabel?: string;
  rightLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("tcrm-three-pane-layout", className)} data-active-pane={activePane} data-component="ThreePaneLayout" data-state={activePane} {...props}>
      <aside aria-label={leftLabel} className="tcrm-three-pane-layout__left" data-pane="list">{left}</aside>
      <section aria-label={centerLabel} className="tcrm-three-pane-layout__center" data-pane="conversation">{center}</section>
      <aside aria-label={rightLabel} className="tcrm-three-pane-layout__right" data-pane="context">{right}</aside>
    </div>
  );
}

export interface ContextPanelSection {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
}

export interface ContextPanelFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  actionIcon?: IconName;
  actionLabel?: string;
  tone?: "default" | "link";
}

export interface ContextPanelHistoryItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface ContextPanelTaskItem {
  id: string;
  label: React.ReactNode;
  status?: React.ReactNode;
  statusTone?: ComponentTone;
  actionIcon?: IconName;
  actionLabel?: string;
}

export interface ContextPanelProps extends CrmSurfaceProps {
  avatarSrc?: string;
  statusLabel?: React.ReactNode;
  facts?: ContextPanelFact[];
  historyItems?: ContextPanelHistoryItem[];
  taskItems?: ContextPanelTaskItem[];
  agentStatus?: React.ReactNode;
  sections?: ContextPanelSection[];
  onAction?: (actionId: string) => void;
  onFactAction?: (factId: string) => void;
  onTaskAction?: (taskId: string) => void;
}

const defaultContextPanelFacts: ContextPanelFact[] = [
  { id: "phone", icon: "clipboard", label: "Contato principal", value: "+55 (11) 91234-5678", actionIcon: "whatsapp", actionLabel: "Abrir WhatsApp" },
  { id: "email", icon: "mail", label: "E-mail", value: "ana.silva@email.com" },
  { id: "consent", icon: "clock", label: "Consentimento", value: "WhatsApp permitido", actionIcon: "check", actionLabel: "Consentimento confirmado", tone: "link" },
  { id: "next-class", icon: "calendar", label: "Próxima aula", value: "terça 17h · Reformer Intermediário" },
  { id: "replacement-credit", icon: "calendar", label: "Crédito de reposição", value: "válido por 30 dias", actionIcon: "info", actionLabel: "Ver crédito" }
];

const defaultContextPanelHistory: ContextPanelHistoryItem[] = [
  { id: "paused", time: "10:21", title: "Agente pausado", description: "aguardando revisão humana" },
  { id: "proof", time: "10:15", title: "Comprovante recebido", description: "via WhatsApp" },
  { id: "class", time: "09:54", title: "Aula terça 17h confirmada" }
];

const defaultContextPanelTasks: ContextPanelTaskItem[] = [
  { id: "validate-proof", label: "Validar comprovante", status: "Em andamento", statusTone: "info" },
  { id: "confirm-replacement", label: "Confirmar reposição", status: "Hoje", statusTone: "warning", actionIcon: "calendar", actionLabel: "Abrir tarefa" }
];

export function ContextPanel({
  title = "Ana Silva",
  description,
  state = "success",
  statusLabel,
  avatarSrc,
  facts = defaultContextPanelFacts,
  historyItems = defaultContextPanelHistory,
  taskItems = defaultContextPanelTasks,
  agentStatus = "Copiloto sugeriu · envio autônomo bloqueado",
  sections,
  action,
  onAction,
  onFactAction,
  onTaskAction,
  children,
  className,
  ...props
}: ContextPanelProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isEmpty = state === "empty";
  const resolvedStatusLabel = statusLabel ?? (state === "success" ? "aluna ativa" : state);

  if (isLoading) {
    return (
      <aside aria-busy="true" className={cn("tcrm-context-panel", className)} data-component="ContextPanel" data-state={state} {...props}>
        <LoadingState title="Carregando contexto" variant="skeleton" />
      </aside>
    );
  }

  if (isEmpty || (!children && !sections?.length && !facts.length)) {
    return (
      <aside className={cn("tcrm-context-panel", className)} data-component="ContextPanel" data-state={state} {...props}>
        <EmptyState action={action} title="Selecione um item" />
      </aside>
    );
  }

  return (
    <aside className={cn("tcrm-context-panel", isBlocked && "tcrm-context-panel--blocked", className)} data-component="ContextPanel" data-state={state} {...props}>
      <header className="tcrm-context-panel__header">
        <Avatar className="tcrm-context-panel__avatar" name={String(title)} src={avatarSrc} />
        <span className="tcrm-context-panel__identity">
          <h3>{title}</h3>
          {description ? <small>{description}</small> : resolvedStatusLabel ? <Chip className="tcrm-context-panel__status" showDot={false} tone={toneForState(state)}>{resolvedStatusLabel}</Chip> : null}
        </span>
        <IconButton disabled={isBlocked} icon="moreVertical" label="Mais opções do contexto" onClick={() => onAction?.("menu")} size="sm" variant="ghost" />
      </header>
      {children ?? (
        sections?.length ? (
          <div className="tcrm-context-panel__card">
            <List dense divided>
              {sections.map((section) => (
                <ListItem action={section.action} key={section.id} meta={section.meta} title={section.title}>
                  {section.description}
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <>
            <section aria-label="Dados do contato" className="tcrm-context-panel__card tcrm-context-panel__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-context-panel__fact", fact.tone === "link" && "tcrm-context-panel__fact--link")} key={fact.id}>
                  <Icon name={fact.icon} />
                  <span>
                    <strong>{fact.label}</strong>
                    <em>{fact.value}</em>
                  </span>
                  {fact.actionIcon ? (
                    <IconButton
                      className="tcrm-context-panel__fact-action"
                      disabled={isBlocked}
                      icon={fact.actionIcon}
                      label={fact.actionLabel ?? String(fact.label)}
                      onClick={() => onFactAction?.(fact.id)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    />
                  ) : null}
                </div>
              ))}
            </section>
            <section aria-label="Histórico recente" className="tcrm-context-panel__card tcrm-context-panel__history">
              <ContextPanelSectionHeader actionLabel="Ver todos" onAction={() => onAction?.("history")} title="Histórico recente" />
              <ol>
                {historyItems.map((item) => (
                  <li key={item.id}>
                    <time>{item.time}</time>
                    <span>
                      <strong>{item.title}</strong>
                      {item.description ? <em>{item.description}</em> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            <section aria-label="Tarefas relacionadas" className="tcrm-context-panel__card tcrm-context-panel__tasks">
              <ContextPanelSectionHeader actionLabel="Ver todas" onAction={() => onAction?.("tasks")} title="Tarefas relacionadas" />
              {taskItems.map((task) => (
                <div className="tcrm-context-panel__task" key={task.id}>
                  <Icon name="calendar" />
                  <span>{task.label}</span>
                  {task.status ? <Chip className="tcrm-context-panel__task-status" showDot={false} tone={task.statusTone ?? "neutral"}>{task.status}</Chip> : null}
                  {task.actionIcon ? (
                    <IconButton disabled={isBlocked} icon={task.actionIcon} label={task.actionLabel ?? "Abrir tarefa"} onClick={() => onTaskAction?.(task.id)} size="sm" variant="ghost" />
                  ) : null}
                </div>
              ))}
            </section>
            <section aria-label="Status do agente" className="tcrm-context-panel__card tcrm-context-panel__agent">
              <h4>Status do agente</h4>
              <span>
                <Icon name="sparkles" />
                <strong>{agentStatus}</strong>
              </span>
            </section>
            <footer className="tcrm-context-panel__footer">
              <Button disabled={isBlocked} leadingIcon="user" onClick={() => onAction?.("open-profile")} size="sm" variant="secondary">Abrir perfil</Button>
              <Button disabled={isBlocked} leadingIcon="plus" onClick={() => onAction?.("create-task")} size="sm" variant="secondary">Criar tarefa</Button>
              <Button className="tcrm-context-panel__more" disabled={isBlocked} leadingIcon="moreVertical" onClick={() => onAction?.("more-actions")} size="sm" variant="secondary">Mais ações</Button>
            </footer>
          </>
        )
      )}
    </aside>
  );
}

export interface ConversationDrawerProps extends Omit<ContextPanelProps, "action" | "children" | "className"> {
  closeLabel?: string;
  onClose?: () => void;
}

export function ConversationDrawer({
  title = "Ana Silva",
  statusLabel,
  state = "success",
  facts = defaultContextPanelFacts,
  historyItems = defaultContextPanelHistory,
  taskItems = defaultContextPanelTasks,
  agentStatus = "Copiloto sugeriu · envio autônomo bloqueado",
  onAction,
  onFactAction,
  onTaskAction,
  closeLabel = "Fechar conversa",
  onClose
}: ConversationDrawerProps) {
  const isBlocked = state === "blocked";
  const resolvedStatusLabel = statusLabel ?? (state === "success" ? "aluna ativa" : state);
  const drawerFacts: CrmDrawerFact[] = facts.map((fact) => ({
    id: fact.id,
    icon: fact.icon,
    label: fact.label,
    value: (
      <span className="tcrm-conversation-drawer__fact-value">
        {fact.value}
        {fact.actionIcon ? (
          <IconButton
            disabled={isBlocked}
            icon={fact.actionIcon}
            label={fact.actionLabel ?? String(fact.label)}
            onClick={() => onFactAction?.(fact.id)}
            size="sm"
            type="button"
            variant="ghost"
          />
        ) : null}
      </span>
    )
  }));

  return (
    <CrmDrawer
      aria-label="Detalhes da conversa"
      className="tcrm-conversation-drawer"
      closeLabel={closeLabel}
      component="ConversationDrawer"
      eyebrow="Conversa"
      facts={drawerFacts}
      footer={(
        <>
          <Button disabled={isBlocked} leadingIcon="user" onClick={() => onAction?.("open-profile")} size="sm" variant="secondary">Abrir perfil</Button>
          <Button disabled={isBlocked} leadingIcon="plus" onClick={() => onAction?.("create-task")} size="sm" variant="secondary">Criar tarefa</Button>
          <Button disabled={isBlocked} leadingIcon="moreVertical" onClick={() => onAction?.("more-actions")} size="sm" variant="secondary">Mais ações</Button>
        </>
      )}
      onClose={onClose}
      sections={[
        {
          id: "history",
          title: "Histórico recente",
          ariaLabel: "Histórico recente",
          content: (
            <ol className="tcrm-conversation-drawer__history">
              {historyItems.map((item) => (
                <li key={item.id}>
                  <time>{item.time}</time>
                  <span><strong>{item.title}</strong>{item.description ? <small>{item.description}</small> : null}</span>
                </li>
              ))}
            </ol>
          )
        },
        {
          id: "tasks",
          title: "Tarefas relacionadas",
          ariaLabel: "Tarefas relacionadas",
          content: (
            <div className="tcrm-conversation-drawer__tasks">
              {taskItems.map((task) => (
                <div className="tcrm-conversation-drawer__task" key={task.id}>
                  <Icon name="calendar" />
                  <span>{task.label}</span>
                  {task.status ? <Chip showDot={false} tone={task.statusTone ?? "neutral"}>{task.status}</Chip> : null}
                  {task.actionIcon ? <IconButton disabled={isBlocked} icon={task.actionIcon} label={task.actionLabel ?? "Abrir tarefa"} onClick={() => onTaskAction?.(task.id)} size="sm" variant="ghost" /> : null}
                </div>
              ))}
            </div>
          )
        },
        {
          id: "agent",
          ariaLabel: "Status do agente",
          variant: "callout",
          content: <span className="tcrm-conversation-drawer__agent"><Icon name="sparkles" /><strong>{agentStatus}</strong></span>
        }
      ]}
      status={resolvedStatusLabel}
      title={title}
    />
  );
}

function ContextPanelSectionHeader({ title, actionLabel, onAction }: { title: React.ReactNode; actionLabel: React.ReactNode; onAction?: () => void }) {
  return (
    <header className="tcrm-context-panel__section-header">
      <h4>{title}</h4>
      <Button className="tcrm-context-panel__section-action" onClick={onAction} size="sm" type="button" variant="ghost">{actionLabel}</Button>
    </header>
  );
}

export function RightPanelLayout({
  contentHeader,
  contentHeaderLabel,
  main,
  panel,
  state = "fixed",
  mainLabel = "Conteúdo principal",
  panelLabel = "Painel lateral",
  className,
  ...props
}: {
  contentHeader?: React.ReactNode;
  contentHeaderLabel?: string;
  main: React.ReactNode;
  panel: React.ReactNode;
  state?: "fixed" | "compact" | "collapsed";
  mainLabel?: string;
  panelLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const isCollapsed = state === "collapsed";
  return (
    <div className={cn("tcrm-right-panel-layout", className)} data-component="RightPanelLayout" data-state={state} {...props}>
      {contentHeader ? (
        <div aria-label={contentHeaderLabel} className="tcrm-right-panel-layout__content-header" data-region="content-header">
          {contentHeader}
        </div>
      ) : null}
      <section aria-label={mainLabel} className="tcrm-right-panel-layout__main" data-region="main">{main}</section>
      {isCollapsed ? null : <aside aria-label={panelLabel} className="tcrm-right-panel-layout__panel" data-region="panel">{panel}</aside>}
    </div>
  );
}

export function DashboardGrid({
  columns = 3,
  density = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { columns?: 1 | 2 | 3 | 4 | "agenda" | "asymmetrical" | "support" | "today" | "todayCritical" | "reports"; density?: "default" | "compact" }) {
  return (
    <div
      className={cn("tcrm-dashboard-grid", `tcrm-dashboard-grid--${columns}`, density !== "default" && `tcrm-dashboard-grid--${density}`, className)}
      data-component="DashboardGrid"
      {...props}
    />
  );
}

const defaultProfileTabItems: TabItem[] = [
  { value: "resumo", label: "Resumo", content: null },
  { value: "agenda", label: "Agenda", content: null },
  { value: "financeiro", label: "Financeiro", content: null },
  { value: "documentos", label: "Documentos", content: null },
  { value: "historico", label: "Hist\u00f3rico", content: null },
  { value: "tarefas", label: "Tarefas", content: null }
];

export function ProfileTabs({
  items,
  className,
  defaultValue,
  value,
  onValueChange,
  state = "source",
  showPanel = false,
  density = "standard"
}: {
  items?: TabItem[];
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  state?: "source" | "loading" | "blocked";
  showPanel?: boolean;
  density?: "standard" | "compact";
}) {
  const isUnavailable = state === "loading" || state === "blocked";
  const resolvedItems = (items ?? defaultProfileTabItems).map((item) => ({
    ...item,
    disabled: item.disabled || isUnavailable
  }));

  return (
    <Tabs
      aria-label="Abas do perfil do aluno"
      className={cn("tcrm-profile-tabs", density === "compact" && "tcrm-profile-tabs--compact", state !== "source" && `tcrm-profile-tabs--${state}`, className)}
      defaultValue={defaultValue ?? "resumo"}
      idBase="tcrm-profile-tabs"
      items={resolvedItems}
      onValueChange={isUnavailable ? undefined : onValueChange}
      showPanel={showPanel}
      value={value}
    />
  );
}

export type ActivityFeedTone = "blue" | "green" | "orange" | "purple" | "red";

export interface ActivityFeedItem {
  id: string;
  time: string;
  hourLabel?: string;
  title: React.ReactNode;
  category: React.ReactNode;
  actor: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  tone: ActivityFeedTone;
  avatarSrc?: string;
  disabled?: boolean;
}

export interface ActivityFeedPanelTab {
  value: string;
  label: string;
}

const sourceActivityFeedItems: ActivityFeedItem[] = [
  { id: "replacement-confirmed", hourLabel: "09h", time: "09:12", title: "Reposição confirmada", category: "Agenda / Reposições", actor: "Mariana", description: "Ana Paula aceitou quinta 09:00", icon: "calendar", tone: "blue" },
  { id: "conversation-resolved", time: "09:28", title: "Conversa resolvida", category: "WhatsApp", actor: "Atendimento", description: "Gustavo recebeu retorno sobre plano trimestral", icon: "whatsapp", tone: "green" },
  { id: "call-complete", hourLabel: "10h", time: "10:04", title: "Chamada concluída", category: "Aulas / Chamada", actor: "Rafael", description: "Funcional 09:00 · 8 presentes", icon: "users", tone: "blue" },
  { id: "receipt-validated", time: "10:30", title: "Comprovante validado", category: "Financeiro", actor: "Lucas", description: "R$ 980 confirmado", icon: "wallet", tone: "orange" },
  { id: "approval-complete", hourLabel: "11h", time: "11:05", title: "Aprovação concluída", category: "Aprovações", actor: "Juliana", description: "Mensagem do agente aprovada", icon: "shieldCheck", tone: "purple" },
  { id: "automation-executed", time: "11:22", title: "Automação executada", category: "Agente Agenda", actor: "Sistema", description: "Lembrete de aula enviado", icon: "bot", tone: "blue" },
  { id: "task-rescheduled", time: "11:40", title: "Tarefa reagendada", category: "Tarefas", actor: "Juliana", description: "Follow-up de aluno em risco movido para 16:00", icon: "calendar", tone: "orange" },
  { id: "block-resolved", hourLabel: "12h", time: "12:10", title: "Bloqueio resolvido", category: "Dados / Alunos", actor: "Recepção", description: "Cadastro obrigatório completado", icon: "alert", tone: "red" }
];

export function ActivityFeed({
  items,
  compact = false,
  fluid = false,
  variant = "history",
  className,
  title = "Histórico de hoje",
  description = "O que já foi resolvido, alterado ou executado hoje.",
  dateFilterLabel = "Hoje",
  typeFilterLabel = "Todos os tipos",
  state = "source",
  panelTabs = [
    { value: "all", label: "Todas" },
    { value: "cases", label: "Casos" },
    { value: "updates", label: "Atualizacoes" },
    { value: "mentions", label: "Mencoes" }
  ],
  panelTab,
  onDateFilter,
  onTypeFilter,
  onExport,
  onPanelFilter,
  onPanelTabChange,
  onItemOpen
}: {
  items?: ActivityFeedItem[];
  compact?: boolean;
  fluid?: boolean;
  variant?: "history" | "panel";
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  dateFilterLabel?: React.ReactNode;
  typeFilterLabel?: React.ReactNode;
  state?: "source" | "loading" | "empty" | "blocked";
  panelTabs?: ActivityFeedPanelTab[];
  panelTab?: string;
  onDateFilter?: () => void;
  onTypeFilter?: () => void;
  onExport?: () => void;
  onPanelFilter?: () => void;
  onPanelTabChange?: (value: string) => void;
  onItemOpen?: (item: ActivityFeedItem) => void;
}) {
  const isUnavailable = state === "loading" || state === "blocked";
  const resolvedItems = items ?? sourceActivityFeedItems;
  const visibleItems = state === "empty" ? [] : resolvedItems;
  const [internalDateFilter, setInternalDateFilter] = React.useState(String(dateFilterLabel));
  const [internalTypeFilter, setInternalTypeFilter] = React.useState(String(typeFilterLabel));
  const [activeFilter, setActiveFilter] = React.useState<"date" | "type" | "">("");
  const [internalPanelTab, setInternalPanelTab] = React.useState(panelTabs[0]?.value ?? "all");
  const dateOptions = [
    { value: "hoje", label: "Hoje", count: 8 },
    { value: "semana", label: "Esta semana", count: 31 },
    { value: "mes", label: "Este mês", count: 128 }
  ];
  const typeOptions = [
    { value: "todos", label: "Todos os tipos", count: 8 },
    { value: "agenda", label: "Agenda", count: 3 },
    { value: "whatsapp", label: "WhatsApp", count: 1 },
    { value: "financeiro", label: "Financeiro", count: 1 },
    { value: "aprovacoes", label: "Aprovações", count: 1 }
  ];
  const dateValueByLabel = new Map(dateOptions.map((option) => [option.label, option.value]));
  const typeValueByLabel = new Map(typeOptions.map((option) => [option.label, option.value]));
  const dateLabelByValue = new Map(dateOptions.map((option) => [option.value, option.label]));
  const typeLabelByValue = new Map(typeOptions.map((option) => [option.value, option.label]));
  const currentDateLabel = onDateFilter ? dateFilterLabel : internalDateFilter;
  const currentTypeLabel = onTypeFilter ? typeFilterLabel : internalTypeFilter;
  const currentDateValue = dateValueByLabel.get(String(currentDateLabel)) ?? "hoje";
  const currentTypeValue = typeValueByLabel.get(String(currentTypeLabel)) ?? "todos";
  const handleDateFilter = (nextValue: string | string[]) => {
    if (onDateFilter) {
      onDateFilter();
      return;
    }
    const normalized = (Array.isArray(nextValue) ? nextValue[0] : nextValue) ?? "hoje";
    setInternalDateFilter(dateLabelByValue.get(normalized) ?? "Hoje");
    setActiveFilter("date");
  };
  const handleTypeFilter = (nextValue: string | string[]) => {
    if (onTypeFilter) {
      onTypeFilter();
      return;
    }
    const normalized = (Array.isArray(nextValue) ? nextValue[0] : nextValue) ?? "todos";
    setInternalTypeFilter(typeLabelByValue.get(normalized) ?? "Todos os tipos");
    setActiveFilter("type");
  };
  const currentPanelTab = panelTab ?? internalPanelTab;
  const handlePanelTabChange = (value: string) => {
    if (panelTab === undefined) setInternalPanelTab(value);
    onPanelTabChange?.(value);
  };

  if (variant === "panel") {
    return (
      <section
        aria-busy={state === "loading" ? true : undefined}
        aria-label={typeof title === "string" ? title : "Painel de atividade"}
        className={cn("tcrm-activity-feed", "tcrm-activity-feed--panel", compact && "tcrm-activity-feed--compact", fluid && "tcrm-activity-feed--fluid", state !== "source" && `tcrm-activity-feed--${state}`, className)}
        data-component="ActivityFeed"
        data-state={state}
        data-variant="panel"
      >
        <header className="tcrm-activity-feed__panel-header">
          <SegmentedControl
            compact
            label="Filtrar atividades"
            onChange={handlePanelTabChange}
            options={panelTabs.map((option) => ({ ...option, disabled: isUnavailable }))}
            value={currentPanelTab}
          />
          <IconButton disabled={isUnavailable} icon="sliders" label="Filtrar painel de atividade" onClick={onPanelFilter} size="sm" variant="subtle" />
        </header>
        {state === "empty" ? <EmptyState className="tcrm-activity-feed__state" icon="clock" title="Nenhuma atividade" /> : null}
        {state === "loading" ? <LoadingState className="tcrm-activity-feed__state" title="Carregando atividades" variant="spinner" /> : null}
        {state === "blocked" ? <InlineAlert className="tcrm-activity-feed__state" tone="blocked" title="Atividades bloqueadas">Sem permissao para visualizar este painel.</InlineAlert> : null}
        {state === "source" ? (
          <List className="tcrm-activity-feed__panel-list" dense divided>
            {visibleItems.map((item) => (
              <ListItem
                action={
                  <button
                    aria-label={`Abrir atividade ${String(item.title)}`}
                    className="tcrm-activity-feed__panel-action"
                    disabled={item.disabled || isUnavailable}
                    onClick={() => onItemOpen?.(item)}
                    type="button"
                  >
                    <span>{item.time}</span>
                    <Icon name={item.icon} size="sm" />
                  </button>
                }
                leading={<Avatar name={String(item.actor)} size="sm" src={item.avatarSrc} />}
                key={item.id}
                meta={item.description}
                title={item.title}
              />
            ))}
          </List>
        ) : null}
      </section>
    );
  }

  return (
    <section
      aria-busy={state === "loading" ? true : undefined}
      aria-label={typeof title === "string" ? title : "Histórico de hoje"}
      className={cn("tcrm-activity-feed", compact && "tcrm-activity-feed--compact", fluid && "tcrm-activity-feed--fluid", state !== "source" && `tcrm-activity-feed--${state}`, className)}
      data-component="ActivityFeed"
      data-state={state}
      data-variant="history"
    >
      <header className="tcrm-activity-feed__header">
        <span className="tcrm-activity-feed__header-icon"><Icon name="clock" size={22} /></span>
        <div className="tcrm-activity-feed__heading">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="tcrm-activity-feed__controls" role="group" aria-label="Filtros do histórico">
          <FilterSelect
            aria-pressed={activeFilter === "date"}
            className="tcrm-activity-feed__filter"
            clearable={false}
            disabled={isUnavailable}
            icon="calendar"
            label="Período"
            onClick={onDateFilter}
            onValueChange={handleDateFilter}
            options={dateOptions}
            triggerDisplay="value"
            value={currentDateValue}
          />
          <FilterSelect
            aria-pressed={activeFilter === "type"}
            className="tcrm-activity-feed__filter tcrm-activity-feed__filter--wide"
            clearable={false}
            disabled={isUnavailable}
            label="Tipo"
            onClick={onTypeFilter}
            onValueChange={handleTypeFilter}
            options={typeOptions}
            triggerDisplay="value"
            value={currentTypeValue}
          />
          <IconButton className="tcrm-activity-feed__export" disabled={isUnavailable} icon="upload" label="Exportar histórico" onClick={onExport} size="sm" variant="subtle" />
        </div>
      </header>

      {state === "empty" ? (
        <EmptyState className="tcrm-activity-feed__state" icon="clock" title="Nenhum histórico hoje" />
      ) : null}
      {state === "loading" ? (
        <LoadingState className="tcrm-activity-feed__state" title="Carregando histórico" variant="spinner" />
      ) : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-activity-feed__state" tone="blocked" title="Histórico bloqueado">
          Permissões ou plano impedem a leitura deste histórico.
        </InlineAlert>
      ) : null}

      {state === "source" ? (
        <div className="tcrm-activity-feed__timeline">
          <div className="tcrm-activity-feed__axis" aria-hidden="true" />
          {visibleItems.map((item) => (
            <React.Fragment key={item.id}>
              <span className="tcrm-activity-feed__hour">{item.hourLabel}</span>
              <span className="tcrm-activity-feed__time">{item.time}</span>
              <span className={cn("tcrm-activity-feed__dot", `tcrm-activity-feed__dot--${item.tone}`)} aria-hidden="true" />
              <button
                className="tcrm-activity-feed__row"
                disabled={item.disabled || isUnavailable}
                onClick={() => onItemOpen?.(item)}
                type="button"
              >
                <span className={cn("tcrm-activity-feed__event-icon", `tcrm-activity-feed__event-icon--${item.tone}`)}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="tcrm-activity-feed__event-main">
                  <strong>{item.title}</strong>
                  <small>{item.category} <em>·</em> {item.actor}</small>
                </span>
                <span className="tcrm-activity-feed__event-description">{item.description}</span>
                <Icon name="chevronRight" size={18} />
              </button>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export type OperationActivityTableState = "source" | "loading" | "empty" | "blocked";
export type OperationActivityTableStatus = "assumed" | "resolved" | "blocked" | "waiting";

export interface OperationActivityTableRow {
  id: string;
  time: React.ReactNode;
  actor: string;
  avatarSrc?: string;
  action: React.ReactNode;
  object: React.ReactNode;
  meta: React.ReactNode;
  owner: React.ReactNode;
  status: OperationActivityTableStatus;
  statusLabel: React.ReactNode;
}

export interface OperationActivityTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  viewAllLabel?: React.ReactNode;
  rows?: OperationActivityTableRow[];
  state?: OperationActivityTableState;
  selectedId?: string;
  onRowOpen?: (row: OperationActivityTableRow) => void;
  onViewAll?: () => void;
}

const sourceOperationActivityRows: OperationActivityTableRow[] = [
  { id: "marina-proof", time: "10:24", actor: "Marina Lopes", action: "assumiu a pendência", object: "Comprovante da Marina", meta: "Tarefa · Financeiro", owner: "Recepção", status: "assumed", statusLabel: "Assumido" },
  { id: "sam-pedro", time: "10:12", actor: "Sam Frank", action: "concluiu a pendência", object: "Comprovante do Pedro", meta: "Tarefa · Financeiro", owner: "Recepção", status: "resolved", statusLabel: "Resolvido" },
  { id: "joao-whatsapp", time: "09:48", actor: "João Silva", action: "bloqueou a pendência", object: "WhatsApp com falha de envio", meta: "Tarefa · Sistema", owner: "Suporte", status: "blocked", statusLabel: "Bloqueado" },
  { id: "nikki-julia", time: "09:31", actor: "Nikki Clew", action: "adicionou comentário em", object: "Conversa da Julia aguardando humano", meta: "Tarefa · Inbox", owner: "Atendimento", status: "waiting", statusLabel: "Aguardando" }
];

function operationActivityTone(status: OperationActivityTableStatus): ComponentTone {
  if (status === "resolved") return "success";
  if (status === "blocked") return "danger";
  if (status === "waiting") return "warning";
  return "info";
}

function operationActivityStatusIcon(status: OperationActivityTableStatus): IconName | undefined {
  if (status === "resolved") return "check";
  if (status === "blocked") return "lock";
  if (status === "waiting") return "clock";
  return undefined;
}

export function OperationActivityTable({
  title = "Atividade recente",
  viewAllLabel = "Ver histórico completo",
  rows = sourceOperationActivityRows,
  state = "source",
  selectedId,
  onRowOpen,
  onViewAll,
  className,
  ...props
}: OperationActivityTableProps) {
  const isUnavailable = state === "loading" || state === "blocked";
  const visibleRows = state === "empty" ? [] : rows;

  return (
    <section
      aria-busy={state === "loading" ? true : undefined}
      aria-label={typeof title === "string" ? title : "Atividade recente da operação"}
      className={cn("tcrm-operation-activity-table", state !== "source" && `tcrm-operation-activity-table--${state}`, className)}
      data-component="OperationActivityTable"
      data-state={state}
      {...props}
    >
      <header className="tcrm-operation-activity-table__header">
        <h2>{title}</h2>
        <Button className="tcrm-operation-activity-table__view-all" disabled={isUnavailable} onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">
          {viewAllLabel}
        </Button>
      </header>

      {state === "loading" ? <LoadingState className="tcrm-operation-activity-table__state" title="Carregando atividade" variant="table" /> : null}
      {state === "empty" ? <EmptyState className="tcrm-operation-activity-table__state" icon="clock" title="Nenhuma atividade recente" /> : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-operation-activity-table__state" tone="blocked" title="Atividade bloqueada">
          Permissões ou plano impedem a leitura da atividade operacional.
        </InlineAlert>
      ) : null}

      {state === "source" ? (
        <div className="tcrm-operation-activity-table__rows">
          {visibleRows.map((row) => (
            <button
              aria-pressed={selectedId === row.id}
              className="tcrm-operation-activity-table__row"
              disabled={isUnavailable}
              key={row.id}
              onClick={() => onRowOpen?.(row)}
              type="button"
            >
              <span className="tcrm-operation-activity-table__time">{row.time}</span>
              <Avatar name={row.actor} size="sm" src={row.avatarSrc} />
              <strong className="tcrm-operation-activity-table__actor">{row.actor}</strong>
              <span className="tcrm-operation-activity-table__action">{row.action}</span>
              <strong className="tcrm-operation-activity-table__object">{row.object}</strong>
              <Chip className="tcrm-operation-activity-table__meta" showDot={false}>{row.meta}</Chip>
              <Chip className="tcrm-operation-activity-table__owner" showDot={false}>{row.owner}</Chip>
              <Chip
                className="tcrm-operation-activity-table__status"
                icon={operationActivityStatusIcon(row.status)}
                showDot={false}
                tone={operationActivityTone(row.status)}
              >
                {row.statusLabel}
              </Chip>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export type AuditTrailState = "source" | "filtered" | "sensitive" | "loading" | "empty" | "error" | "blocked";

export interface AuditTrailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  rows?: AuditTableRow[];
  state?: AuditTrailState;
  title?: React.ReactNode;
  footerLabel?: React.ReactNode;
  onOpenObject?: (row: AuditTableRow) => void;
  onRowClick?: (row: AuditTableRow) => void;
  onViewAll?: () => void;
}

const auditTrailSourceRows: AuditTableRow[] = [
  { id: "cs-1043", actor: "Sam Frank", object: "#CS-1043", action: "Atualizou plano", time: "28/04/2024   10:24", origin: "Web", status: "success" },
  { id: "us-2087", actor: "Nikki Olaw", object: "#US-2087", action: "Alterou limite", time: "28/04/2024   09:18", origin: "API", status: "success" },
  { id: "in-3021", actor: "Maria Lopes", object: "#IN-3021", action: "Revisou fatura", time: "27/04/2024   16:41", origin: "Web", status: "success" },
  { id: "cs-1039", actor: "Joao Silva", object: "#CS-1039", action: "Aprovou desconto", time: "27/04/2024   14:12", origin: "Mobile", status: "success" },
  { id: "cs-1022", actor: "Carlos Lima", object: "#CS-1022", action: "Removeu usuario", time: "27/04/2024   11:02", origin: "Sistema", status: "alert" }
];

function auditTrailRowsForState(state: AuditTrailState, rows?: AuditTableRow[]) {
  if (rows) return rows;
  if (state === "filtered") return auditTrailSourceRows.slice(0, 3);
  if (state === "sensitive") {
    return auditTrailSourceRows.map((row, index) => index === 4 ? { ...row, status: "denied" as const, action: "Tentou remover usuario" } : row);
  }
  return auditTrailSourceRows;
}

export function AuditTrail({
  rows,
  state = "source",
  title = "Log detalhado / auditoria",
  footerLabel = "Ver auditoria completa",
  onOpenObject,
  onRowClick,
  onViewAll,
  className,
  ...props
}: AuditTrailProps) {
  const visibleRows = auditTrailRowsForState(state, rows);
  const isUnavailable = state === "loading" || state === "blocked" || state === "error";
  const findRow = (rowId: string) => visibleRows.find((row) => row.id === rowId);
  const handleOpenObject = (rowId: string) => {
    const row = findRow(rowId);
    if (row) onOpenObject?.(row);
  };
  const handleRowClick = onRowClick
    ? (rowId: string) => {
        const row = findRow(rowId);
        if (row) onRowClick(row);
      }
    : undefined;

  return (
    <section
      className={cn("tcrm-audit-trail", `tcrm-audit-trail--${state}`, className)}
      data-component="AuditTrail"
      {...props}
    >
      <h2 className="tcrm-audit-trail__title">9. {title}</h2>
      {state === "loading" ? (
        <LoadingState aria-busy className="tcrm-audit-trail__state" title="Carregando auditoria" variant="table" />
      ) : null}
      {state === "empty" ? (
        <EmptyState className="tcrm-audit-trail__state" icon="shield" title="Nenhum log encontrado" />
      ) : null}
      {state === "error" ? (
        <ErrorState className="tcrm-audit-trail__state" description="Tente novamente ou acione suporte." title="Nao foi possivel carregar auditoria" />
      ) : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-audit-trail__state" tone="blocked" title="Auditoria bloqueada">
          Permissoes sensiveis impedem a leitura deste log.
        </InlineAlert>
      ) : null}
      {state === "source" || state === "filtered" || state === "sensitive" ? (
        <>
          <AuditTable
            className="tcrm-audit-trail__table"
            compact
            onOpenObject={handleOpenObject}
            onRowClick={handleRowClick}
            rows={visibleRows}
          />
          <Button className="tcrm-audit-trail__footer" disabled={isUnavailable} onClick={onViewAll} trailingIcon="arrowRight" variant="ghost">
            <span>{footerLabel}</span>
          </Button>
        </>
      ) : null}
    </section>
  );
}

export interface KanbanCardData {
  id: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  state?: string;
  owner?: React.ReactNode;
  impact?: React.ReactNode;
  nextAction?: React.ReactNode;
  tags?: Array<React.ReactNode | KanbanCardTag>;
}

export interface KanbanCardTag {
  label: React.ReactNode;
  tone?: ComponentTone;
  icon?: IconName;
}

const kanbanTagByLabel: Record<string, { tone: ComponentTone; icon?: IconName }> = {
  Agenda: { tone: "neutral", icon: "calendar" },
  Dados: { tone: "neutral", icon: "database" },
  Decisao: { tone: "warning" },
  Decisão: { tone: "warning" },
  Financeiro: { tone: "neutral", icon: "banknote" },
  Inbox: { tone: "neutral", icon: "message" },
  Sistema: { tone: "neutral", icon: "settings" },
  Tarefa: { tone: "info" }
};

function kanbanTagMeta(tag: React.ReactNode | KanbanCardTag): KanbanCardTag {
  if (tag && typeof tag === "object" && "label" in tag) {
    return tag;
  }
  const key = typeof tag === "string" ? tag : "";
  return { label: tag, ...(kanbanTagByLabel[key] ?? { tone: "neutral" as ComponentTone }) };
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "standard" | "comfortable" | "compact";
  laneWidth?: "default" | "commercial" | "finance";
  laneSurface?: "shared" | "separate";
  rail?: React.ReactNode;
  railDensity?: "standard" | "compact";
}

export function KanbanBoard({ className, children, density = "standard", laneSurface = "shared", laneWidth = "default", rail, railDensity = "standard", ...props }: KanbanBoardProps) {
  const hasRail = Boolean(rail);

  return (
    <div
      className={cn(
        "tcrm-kanban-board",
        !hasRail && "tcrm-kanban-board--without-rail",
        hasRail && railDensity === "compact" && "tcrm-kanban-board--compact-rail",
        density === "comfortable" && "tcrm-kanban-board--comfortable",
        density === "compact" && "tcrm-kanban-board--compact",
        laneWidth === "commercial" && "tcrm-kanban-board--commercial-lanes",
        laneWidth === "finance" && "tcrm-kanban-board--finance-lanes",
        laneSurface === "separate" && "tcrm-kanban-board--separate-lanes",
        className
      )}
      data-component="KanbanBoard"
      data-density={density}
      data-lane-surface={laneSurface}
      data-lane-width={laneWidth}
      data-rail-density={hasRail ? railDensity : undefined}
      role="list"
      {...props}
    >
      {hasRail ? <aside className="tcrm-kanban-board__rail">{rail}</aside> : null}
      <div className="tcrm-kanban-board__lanes">{children}</div>
    </div>
  );
}

export interface KanbanColumnProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  count?: number;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  onMenu?: () => void;
  state?: "default" | "waiting" | "blocked" | "resolved";
  emptyLabel?: React.ReactNode;
  loading?: boolean;
  blocked?: boolean;
}

export function KanbanColumn({
  title,
  count,
  meta,
  footer,
  onMenu,
  children,
  state = "default",
  className,
  emptyLabel,
  loading = false,
  blocked = false,
  ...props
}: KanbanColumnProps) {
  const hasChildren = React.Children.count(children) > 0;
  return (
    <section
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      className={cn(
        "tcrm-kanban-column",
        state !== "default" && `tcrm-kanban-column--${state}`,
        loading && "tcrm-kanban-column--loading",
        blocked && "tcrm-kanban-column--blocked-state",
        !hasChildren && "tcrm-kanban-column--empty",
        className
      )}
      role="listitem"
      {...props}
    >
      <header className="tcrm-kanban-column__header">
        <div className="tcrm-kanban-column__header-main">
          <h3>{title}</h3>
          {typeof count === "number" ? <Badge className="tcrm-kanban-column__count">{count}</Badge> : null}
          {onMenu ? <IconButton className="tcrm-kanban-column__menu" icon="moreVertical" label={`Abrir opcoes de ${String(title)}`} onClick={onMenu} size="sm" variant="ghost" /> : null}
        </div>
        {meta ? <div className="tcrm-kanban-column__meta">{meta}</div> : null}
      </header>
      <div className="tcrm-kanban-column__stack">
        {hasChildren ? children : <div className="tcrm-kanban-column__empty">{emptyLabel ?? "Sem pendencias"}</div>}
      </div>
      {footer ? <footer className="tcrm-kanban-column__footer">{footer}</footer> : null}
    </section>
  );
}

export function KanbanCard({
  title,
  meta,
  state,
  stateLabel,
  selected = false,
  disabled = false,
  owner,
  impact,
  nextAction,
  tags = [],
  layout = "default",
  footer,
  onSelect,
  onMenu,
  menuIcon = "moreVertical",
  className,
  children,
  ...props
}: CrmSurfaceProps & {
  disabled?: boolean;
  owner?: React.ReactNode;
  impact?: React.ReactNode;
  nextAction?: React.ReactNode;
  tags?: Array<React.ReactNode | KanbanCardTag>;
  stateLabel?: React.ReactNode;
  layout?: "default" | "finance" | "compact";
  footer?: React.ReactNode;
  menuIcon?: IconName;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const menuAction = onMenu ? (
    <IconButton
      icon={menuIcon}
      label={`Abrir opcoes de ${String(title ?? "card")}`}
      onClick={(event) => {
        event.stopPropagation();
        onMenu();
      }}
      size="sm"
      variant="ghost"
    />
  ) : null;
  const stateClass = state ? `tcrm-kanban-card--state-${stateKey(state)}` : undefined;
  const rootClass = cn(
    "tcrm-kanban-card",
    layout !== "default" && `tcrm-kanban-card--${layout}`,
    stateClass,
    selected && "tcrm-kanban-card--selected",
    disabled && "tl-card--disabled",
    className
  );
  const content =
    layout === "finance" ? (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {impact ? <strong className="tcrm-kanban-card__impact">{impact}</strong> : null}
        {meta ? (
          <span className="tcrm-kanban-card__meta-line">
            <small>{meta}</small>
            <Icon name="chevronRight" size="sm" />
          </span>
        ) : null}
        {owner ? <small className="tcrm-kanban-card__owner">{owner}</small> : null}
        {state ? <Chip className="tcrm-kanban-card__status" showDot={false} tone={toneForState(state)}>{stateLabel ?? state}</Chip> : null}
        {children}
      </>
    ) : layout === "compact" ? (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {meta ? <small className="tcrm-kanban-card__compact-meta">{meta}</small> : null}
        {footer ? <footer className="tcrm-kanban-card__compact-footer">{footer}</footer> : null}
      </>
    ) : (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {tags.length ? (
          <div className="tcrm-kanban-card__tags">
            {tags.map((tag, index) => {
              const item = kanbanTagMeta(tag);
              return <Chip className={`tcrm-kanban-card__tag tcrm-kanban-card__tag--${stateKey(item.label)}`} icon={item.icon} key={index} showDot={false} tone={item.tone}>{item.label}</Chip>;
            })}
          </div>
        ) : null}
        {meta && !tags.length ? <small>{meta}</small> : null}
        {owner || impact || nextAction ? (
          <dl className="tcrm-kanban-card__facts">
            {owner ? <span><dt>Dono:</dt><dd>{owner}</dd></span> : null}
            {impact ? <span><dt>Impacto:</dt><dd>{impact}</dd></span> : null}
            {nextAction ? <span><dt>Próx. ação:</dt><dd>{nextAction}</dd></span> : null}
          </dl>
        ) : null}
        {state ? <Chip className="tcrm-kanban-card__status" showDot={false} tone={toneForState(state)}>{stateLabel ?? state}</Chip> : null}
        {children}
      </>
    );

  if (onSelect) {
    if (onMenu) {
      return (
        <div
          {...props}
          className={cn("tl-card", rootClass, "tcrm-kanban-card--with-menu")}
        >
          <button
            aria-pressed={selected}
            className="tcrm-kanban-card__select-button"
            disabled={disabled}
            onClick={() => onSelect()}
            type="button"
          >
            {content}
          </button>
          <span className="tcrm-kanban-card__menu">{menuAction}</span>
        </div>
      );
    }

    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        aria-pressed={selected}
        className={cn("tl-card", rootClass)}
        disabled={disabled}
        onClick={() => onSelect()}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <Card className={rootClass} disabled={disabled} selected={selected} {...props}>
      {content}
    </Card>
  );
}

export interface CrmPageFamilyShellProps extends Omit<
  CrmProductShellProps,
  "children" | "contentLayout" | "navItems" | "onNavChange" | "onSidebarSelect" | "onSidebarUtilitySelect" | "sidebarItems" | "utilityItems"
> {
  children: React.ReactNode;
  activeNavId?: string;
  activeSidebarId?: string;
  activeUtilityId?: string;
  contentLayout?: CrmProductShellContentLayout;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  stageClassName?: string;
  utilityItems?: CrmShellSidebarItem[];
  onNavChange?: (id: string) => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}

function activeItemId<T extends { id: string; active?: boolean }>(items: T[] | undefined, explicitId: string | undefined) {
  return explicitId ?? items?.find((item) => item.active)?.id ?? "";
}

function mapActiveItems<T extends { id: string; active?: boolean }>(items: T[] | undefined, activeId: string) {
  return items?.map((item) => ({ ...item, active: activeId ? item.id === activeId : item.active }));
}

export function CrmPageFamilyShell({
  activeNavId,
  activeSidebarId,
  activeUtilityId,
  children,
  className,
  contentClassName,
  contentLayout = "default",
  drawer,
  navItems,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect,
  sidebarItems,
  stageClassName,
  utilityItems,
  ...props
}: CrmPageFamilyShellProps) {
  const [navId, setNavId] = React.useState(activeItemId(navItems, activeNavId));
  const [sidebarId, setSidebarId] = React.useState(activeItemId(sidebarItems, activeSidebarId));
  const [utilityId, setUtilityId] = React.useState(activeItemId(utilityItems, activeUtilityId));
  const shell = (
    <CrmProductShell
      {...props}
      className={cn("tcrm-page-family-shell", className)}
      contentClassName={cn("tcrm-page-family-content", contentClassName)}
      contentLayout={contentLayout}
      drawer={drawer}
      navItems={mapActiveItems(navItems, navId)}
      onNavChange={(id) => {
        setNavId(id);
        onNavChange?.(id);
      }}
      onSidebarSelect={(item) => {
        setSidebarId(item.id);
        setUtilityId("");
        onSidebarSelect?.(item);
      }}
      onSidebarUtilitySelect={(item) => {
        setSidebarId("");
        setUtilityId(item.id);
        onSidebarUtilitySelect?.(item);
      }}
      sidebarItems={mapActiveItems(sidebarItems, sidebarId)}
      utilityItems={mapActiveItems(utilityItems, utilityId)}
    >
      {children}
    </CrmProductShell>
  );

  return <div className={cn("tcrm-page-family-stage", stageClassName)}>{shell}</div>;
}

export interface CrmWorklistPageProps extends Omit<CrmPageFamilyShellProps, "children"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  detail?: React.ReactNode;
  detailLabel?: string;
  detailState?: "closed" | "selected";
  filterBar: React.ReactNode;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  pageLabel?: string;
  quickFilters: React.ReactNode;
  state?: WorkListDetailPageState;
  worklistClassName?: string;
  worklistFilterRhythm?: WorkListDetailPageFilterRhythm;
  worklistLayoutMode?: WorkListDetailPageLayoutMode;
  worklistHeightMode?: WorkListDetailPageHeightMode;
}

export function CrmWorklistPage({
  after,
  children,
  contentLayout = "work-list",
  detail,
  detailLabel,
  detailState,
  filterBar,
  filterBarLabel,
  listLabel,
  mainLabel,
  pageLabel,
  quickFilters,
  state,
  worklistClassName,
  worklistFilterRhythm,
  worklistLayoutMode,
  worklistHeightMode,
  ...shellProps
}: CrmWorklistPageProps) {
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout={contentLayout}>
      <WorkListDetailPage
        className={cn("tcrm-worklist-page-frame", worklistClassName)}
        detail={detail}
        detailLabel={detailLabel}
        detailState={detailState}
        filterBar={filterBar}
        filterBarLabel={filterBarLabel}
        filterRhythm={worklistFilterRhythm}
        after={after}
        layoutMode={worklistLayoutMode}
        heightMode={worklistHeightMode}
        listLabel={listLabel}
        mainLabel={mainLabel}
        pageLabel={pageLabel}
        quickFilters={quickFilters}
        state={state}
      >
        {children}
      </WorkListDetailPage>
    </CrmPageFamilyShell>
  );
}

export interface CrmKanbanPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  filterBar?: React.ReactNode;
  kanbanDensity?: KanbanBoardProps["density"];
  kanbanClassName?: string;
  laneSurface?: KanbanBoardProps["laneSurface"];
  laneWidth?: KanbanBoardProps["laneWidth"];
  layoutVariant?: "default" | "finance" | "commercial";
  quickFilters?: React.ReactNode;
  railDensity?: KanbanBoardProps["railDensity"];
}

export function CrmKanbanPage({ after, children, filterBar, kanbanClassName, kanbanDensity, laneSurface, laneWidth, layoutVariant = "default", quickFilters, railDensity, ...shellProps }: CrmKanbanPageProps) {
  const commercialLayout = layoutVariant === "commercial";
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout="kanban">
      <div className={cn("tcrm-page-family-stack", "tcrm-kanban-page-stack", layoutVariant === "finance" && "tcrm-kanban-page-stack--finance", commercialLayout && "tcrm-kanban-page-stack--commercial")}>
        {filterBar}
        <KanbanBoard className={cn("tcrm-kanban-page-board", kanbanClassName)} density={kanbanDensity} laneSurface={commercialLayout ? "separate" : laneSurface} laneWidth={layoutVariant === "finance" ? "finance" : commercialLayout ? "commercial" : laneWidth} rail={quickFilters} railDensity={railDensity}>
          {children}
        </KanbanBoard>
        {after}
      </div>
    </CrmPageFamilyShell>
  );
}

export interface CrmDashboardPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  after?: React.ReactNode;
  before?: React.ReactNode;
  children: React.ReactNode;
  columns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  dashboardClassName?: string;
  dashboardStackClassName?: string;
  density?: React.ComponentProps<typeof DashboardGrid>["density"];
  layoutVariant?: "default" | "finance-overview" | "opportunity" | "support" | "settings-hub";
}

export function CrmDashboardPage({
  after,
  before,
  children,
  columns = 3,
  dashboardClassName,
  dashboardStackClassName,
  density,
  layoutVariant = "default",
  ...shellProps
}: CrmDashboardPageProps) {
  const dashboard = (
    <>
      {before}
      <DashboardGrid className={cn("tcrm-dashboard-page-grid", dashboardClassName)} columns={columns} density={density}>
        {children}
      </DashboardGrid>
      {after}
    </>
  );

  return (
    <CrmPageFamilyShell {...shellProps} contentLayout={layoutVariant === "default" ? undefined : layoutVariant}>
      {before || after || dashboardStackClassName ? <div className={cn("tcrm-dashboard-page-stack", layoutVariant === "finance-overview" && "tcrm-dashboard-page-stack--finance-overview", layoutVariant === "opportunity" && "tcrm-dashboard-page-stack--opportunity", dashboardStackClassName)}>{dashboard}</div> : dashboard}
    </CrmPageFamilyShell>
  );
}

export interface CrmThreePanePageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  activePane?: ThreePaneLayoutActivePane;
  center: React.ReactNode;
  centerLabel?: string;
  filterBar?: React.ReactNode;
  left: React.ReactNode;
  leftLabel?: string;
  right?: React.ReactNode;
  rightLabel?: string;
  threePaneClassName?: string;
}

export function CrmThreePanePage({
  activePane,
  center,
  centerLabel,
  filterBar,
  left,
  leftLabel,
  right,
  rightLabel,
  threePaneClassName,
  ...shellProps
}: CrmThreePanePageProps) {
  const drawerOpen = Boolean(shellProps.drawer);
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout="three-pane">
      <div className="tcrm-page-family-stack tcrm-three-pane-page-stack">
        {filterBar}
        <ThreePaneLayout
          activePane={activePane}
          center={center}
          centerLabel={centerLabel}
          className={cn("tcrm-three-pane-page-layout", drawerOpen && "tcrm-three-pane-page-layout--drawer", threePaneClassName)}
          left={left}
          leftLabel={leftLabel}
          right={right ?? null}
          rightLabel={rightLabel}
        />
      </div>
    </CrmPageFamilyShell>
  );
}

export interface CrmRightPanelPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  contentHeader?: React.ReactNode;
  contentHeaderLabel?: string;
  main: React.ReactNode;
  mainGridColumns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  mainGridDensity?: React.ComponentProps<typeof DashboardGrid>["density"];
  mainLabel?: string;
  panel?: React.ReactNode;
  panelLabel?: string;
  rightPanelClassName?: string;
  rightPanelState?: React.ComponentProps<typeof RightPanelLayout>["state"];
  rightPanelVariant?: "default" | "simulation" | "student-profile" | "class-operation" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "agent-execution" | "billing-invoices" | "billing-addons" | "usage-overview" | "usage-ledger";
}

export function CrmRightPanelPage({
  contentHeader,
  contentHeaderLabel,
  drawer,
  main,
  mainGridColumns,
  mainGridDensity,
  mainLabel,
  panel,
  panelLabel,
  rightPanelClassName,
  rightPanelState,
  rightPanelVariant = "default",
  ...shellProps
}: CrmRightPanelPageProps) {
  const hasPanel = Boolean(panel);
  const mainContent = mainGridColumns ? (
    <DashboardGrid className="tcrm-right-panel-page-grid" columns={mainGridColumns} density={mainGridDensity}>
      {main}
    </DashboardGrid>
  ) : main;

  return (
    <CrmPageFamilyShell
      {...shellProps}
      contentLayout={rightPanelVariant === "student-profile" ? "student-profile" : rightPanelVariant === "class-operation" ? "class-operation" : rightPanelVariant === "settings" ? "settings" : rightPanelVariant === "settings-permissions" ? "settings-permissions" : rightPanelVariant === "settings-payments" ? "settings-payments" : rightPanelVariant === "settings-agenda" ? "settings-agenda" : rightPanelVariant === "settings-notifications" ? "settings-notifications" : rightPanelVariant === "billing-subscription" ? "billing-subscription" : rightPanelVariant === "agent-routine" ? "agent-routine" : rightPanelVariant === "agent-flow" ? "agent-flow" : rightPanelVariant === "agent-test" ? "agent-test" : rightPanelVariant === "agent-publish" ? "agent-publish" : undefined}
      drawer={drawer}
    >
      <RightPanelLayout
        className={cn(
          rightPanelVariant !== "default" && `tcrm-right-panel-layout--${rightPanelVariant}`,
          rightPanelClassName
        )}
        contentHeader={contentHeader}
        contentHeaderLabel={contentHeaderLabel}
        main={mainContent}
        mainLabel={mainLabel}
        panel={panel}
        panelLabel={panelLabel}
        state={!hasPanel ? "collapsed" : rightPanelState}
      />
    </CrmPageFamilyShell>
  );
}
