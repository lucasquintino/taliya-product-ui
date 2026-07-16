import React from "react";

import {
  Avatar,
  AuditTable,
  Badge,
  Button,
  ButtonGroup,
  CalendarEventBlock,
  Card,
  ChartPanelPrimitive,
  ChecklistItem,
  Checkbox,
  Chip,
  ConfirmDialog,
  ConnectorLine,
  ConflictCard,
  DataTable,
  DiffTable,
  Drawer,
  DrawerSection,
  DocumentPreview,
  EmptyState,
  ErrorState,
  ExecutionRow,
  FileUpload,
  FilterBar,
  FilterChip,
  FilterMultiSelect,
  FilterSelect,
  FieldGrid,
  FieldStack,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  Input,
  ImportProgressCard,
  List,
  ListIcon,
  ListItem,
  LoadingState,
  MessageBubble,
  MetricTile,
  MoneyInput,
  Modal,
  NavPill,
  Panel,
  PanelHeader,
  PasswordInput,
  Popover,
  ProgressBar,
  Radio,
  RelationshipCard,
  SearchInput,
  Select,
  SegmentedControl,
  SocialAuthButton,
  StatusDot,
  StatusSummaryCard,
  TagInput,
  Stepper,
  Tabs,
  TablePagination,
  Timeline,
  ComposerInput,
  DropdownMenu,
  TaliyaLogo,
  Toggle,
  TimeInput,
  Textarea,
  cn
} from "@taliya/ui";
import type { AuditTableRow, AvatarProps, ButtonVariant, ComponentTone, DiffTableRow, DropdownAction, IconName, SelectOption, StatusDotStatus, StepperStep, TabItem } from "@taliya/ui";
import type { DataTableColumn, DataTableSortState } from "@taliya/ui";
import type { CrmComponentName } from "./component-registry.js";

export { MessageBubble } from "@taliya/ui";
export { standardPageKitManifest } from "./standard-page-kit.js";
export type { StandardPageKitComponent, StandardPageKitManifest } from "./standard-page-kit.js";

export { crmComponentNames, crmComponentRegistry } from "./component-registry.js";
export type { CrmComponentDefinition, CrmComponentName, CrmPriority } from "./component-registry.js";

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
  className
}: {
  items?: CrmBrowserToolbarItem[];
  className?: string;
}) {
  return (
    <div className={cn("tcrm-browser-toolbar", className)} role="toolbar" aria-label="Controles do navegador">
      {items.map((item) => (
        <CrmBrowserToolbarButton disabled={item.disabled} icon={item.icon} key={item.id} label={item.label} />
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
    <div className={cn("tcrm-browser-address", className)} aria-label={url}>
      <Icon name="lock" size={13} />
      <span>{url}</span>
      <Icon name="refresh" size={14} />
    </div>
  );
}

export function CrmBrowserChrome({
  className,
  toolbarItems = crmBrowserToolbarItems,
  url
}: {
  className?: string;
  toolbarItems?: CrmBrowserToolbarItem[];
  url?: string;
}) {
  return (
    <header className={cn("tcrm-browser-chrome", className)}>
      <CrmBrowserTrafficLights />
      <CrmBrowserToolbar items={toolbarItems} />
      <CrmBrowserAddressBar url={url} />
    </header>
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

export function CrmEmptyShellCanvas({ className }: { className?: string }) {
  return <section className={cn("tcrm-empty-shell-canvas", className)} aria-label="Área de conteúdo vazia" />;
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
  onNavChange,
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
  onNavChange?: (id: string) => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <div className={cn("tcrm-empty-shell-stage", "tcrm-empty-shell-stage--image-79", className)}>
      <CrmEmptyShellWindow>
        <CrmShellSidebar items={sidebarItems} onSelect={onSidebarSelect} onUtilitySelect={onSidebarUtilitySelect} utilityItems={utilityItems} />
        <main className="tcrm-empty-shell-main">
          <CrmEmptyShellTopbar avatarSrc={avatarSrc} globalActions={globalActions} navItems={navItems} onNavChange={onNavChange} />
          <CrmEmptyShellPageHeader title={title} />
          <CrmEmptyShellCanvas />
        </main>
      </CrmEmptyShellWindow>
    </div>
  );
}

export type CrmProductShellVariant = "crm" | "internal";
export type CrmProductShellFrame = "fullscreen" | "window" | "window-inset" | "reference";
export type CrmProductShellDrawerPlacement = "fixed" | "content" | "floating" | "chrome" | "viewport";
export type CrmProductShellDrawerSize = "default" | "compact";
export type CrmProductShellPageHeaderRhythm = "default" | "spacious" | "compact-stacked" | "dashboard" | "reports" | "support" | "internal-overview" | "internal-tenants" | "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish" | "settings-hub" | "overview" | "operation" | "inbox" | "usage" | "usage-overview" | "billing" | "billing-invoices";
export type CrmProductShellContentLayout = "default" | "work-list" | "work-list-compact" | "work-list-wide" | "main-priority" | "kanban" | "three-pane" | "student-profile" | "class-operation" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "settings-hub" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "opportunity" | "support" | "internal-overview" | "internal-tenants" | "internal-tenant-detail";

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
  drawerPlacement?: CrmProductShellDrawerPlacement;
  drawerSize?: CrmProductShellDrawerSize;
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
  drawerPlacement = "fixed",
  drawerSize = "default",
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
    Boolean(drawer) && `tcrm-product-shell-stage--drawer-${drawerPlacement}`,
    Boolean(drawer) && `tcrm-product-shell-stage--drawer-${drawerSize}`,
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
    Boolean(drawer) && `tcrm-product-shell-window--drawer-${drawerPlacement}`,
    Boolean(drawer) && `tcrm-product-shell-window--drawer-${drawerSize}`,
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

export interface SettingsAgentPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "role" | "title"> {
  title?: React.ReactNode;
  role?: React.ReactNode;
  introduction?: React.ReactNode;
  insights?: SettingsAgentPanelInsight[];
  questions?: string[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  onQuestionSelect?: (question: string) => void;
  onSend?: (message: string) => void;
  onHelp?: () => void;
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
  onQuestionSelect,
  onSend,
  onHelp,
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
  "children" | "contentLayout" | "drawerPlacement" | "drawerSize" | "navItems" | "onNavChange" | "onSidebarSelect" | "onSidebarUtilitySelect" | "sidebarItems" | "utilityItems"
> {
  children: React.ReactNode;
  activeNavId?: string;
  activeSidebarId?: string;
  activeUtilityId?: string;
  contentLayout?: CrmProductShellContentLayout;
  drawerPlacement?: CrmProductShellDrawerPlacement;
  drawerSize?: CrmProductShellDrawerSize;
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
  drawerPlacement,
  drawerSize,
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
      drawerPlacement={drawer ? drawerPlacement ?? "floating" : drawerPlacement}
      drawerSize={drawer ? drawerSize ?? "compact" : drawerSize}
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
  layoutVariant?: "default" | "opportunity" | "support" | "settings-hub";
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
      {before || after || dashboardStackClassName ? <div className={cn("tcrm-dashboard-page-stack", layoutVariant === "opportunity" && "tcrm-dashboard-page-stack--opportunity", dashboardStackClassName)}>{dashboard}</div> : dashboard}
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
  right: React.ReactNode;
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
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout="three-pane">
      <div className="tcrm-page-family-stack tcrm-three-pane-page-stack">
        {filterBar}
        <ThreePaneLayout
          activePane={activePane}
          center={center}
          centerLabel={centerLabel}
          className={cn("tcrm-three-pane-page-layout", threePaneClassName)}
          left={left}
          leftLabel={leftLabel}
          right={right}
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
  panel: React.ReactNode;
  panelLabel?: string;
  panelPlacement?: "inline" | "drawer";
  rightPanelClassName?: string;
  rightPanelState?: React.ComponentProps<typeof RightPanelLayout>["state"];
  rightPanelVariant?: "default" | "simulation" | "student-profile" | "class-operation" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "agent-execution" | "billing-invoices" | "billing-addons" | "usage-overview" | "usage-ledger";
}

export function CrmRightPanelPage({
  contentHeader,
  contentHeaderLabel,
  drawer,
  drawerPlacement,
  main,
  mainGridColumns,
  mainGridDensity,
  mainLabel,
  panel,
  panelLabel,
  panelPlacement = "inline",
  rightPanelClassName,
  rightPanelState,
  rightPanelVariant = "default",
  ...shellProps
}: CrmRightPanelPageProps) {
  const usesDrawerPanel = panelPlacement === "drawer";
  const mainContent = mainGridColumns ? (
    <DashboardGrid className="tcrm-right-panel-page-grid" columns={mainGridColumns} density={mainGridDensity}>
      {main}
    </DashboardGrid>
  ) : main;

  return (
    <CrmPageFamilyShell
      {...shellProps}
      contentLayout={rightPanelVariant === "student-profile" ? "student-profile" : rightPanelVariant === "class-operation" ? "class-operation" : rightPanelVariant === "settings" ? "settings" : rightPanelVariant === "settings-permissions" ? "settings-permissions" : rightPanelVariant === "settings-payments" ? "settings-payments" : rightPanelVariant === "settings-agenda" ? "settings-agenda" : rightPanelVariant === "settings-notifications" ? "settings-notifications" : rightPanelVariant === "billing-subscription" ? "billing-subscription" : rightPanelVariant === "agent-routine" ? "agent-routine" : rightPanelVariant === "agent-flow" ? "agent-flow" : rightPanelVariant === "agent-test" ? "agent-test" : rightPanelVariant === "agent-publish" ? "agent-publish" : undefined}
      drawer={usesDrawerPanel ? panel : drawer}
      drawerPlacement={usesDrawerPanel ? drawerPlacement ?? "floating" : drawerPlacement}
    >
      <RightPanelLayout
        className={cn(
          usesDrawerPanel && "tcrm-right-panel-layout--drawer-panel",
          rightPanelVariant !== "default" && `tcrm-right-panel-layout--${rightPanelVariant}`,
          rightPanelClassName
        )}
        contentHeader={contentHeader}
        contentHeaderLabel={contentHeaderLabel}
        main={mainContent}
        mainLabel={mainLabel}
        panel={usesDrawerPanel ? <span aria-hidden="true" className="tcrm-right-panel-layout__drawer-reserve" /> : panel}
        panelLabel={usesDrawerPanel ? undefined : panelLabel}
        state={rightPanelState}
      />
    </CrmPageFamilyShell>
  );
}

export interface WeeklyCalendarEvent {
  id: string;
  dayIndex: number;
  top: number;
  height?: number;
  time: React.ReactNode;
  title: React.ReactNode;
  teacher: React.ReactNode;
  capacity: React.ReactNode;
  status: string;
  statusLabel: React.ReactNode;
}

const weeklyCalendarTimes = [
  { label: "07:00", top: 50 },
  { label: "08:00", top: 144 },
  { label: "09:00", top: 250 },
  { label: "10:00", top: 344 },
  { label: "12:00", top: 438 },
  { label: "17:00", top: 533 },
  { label: "18:00", top: 627 },
  { label: "19:00", top: 721 }
];

const weeklyCalendarSourceEvents: WeeklyCalendarEvent[] = [
  { id: "seg-0700-reformer", dayIndex: 0, top: 50, time: "07:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "seg-0800-pilates", dayIndex: 0, top: 144, time: "08:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "seg-1000-tower", dayIndex: 0, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "available", statusLabel: "vaga aberta" },
  { id: "seg-1700-alongamento", dayIndex: 0, top: 489, time: "17:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "seg-1900-experimental", dayIndex: 0, top: 686, time: "19:00", title: "Experimental", teacher: "Lucas Peres", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "ter-0700-pilates", dayIndex: 1, top: 50, time: "07:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "ter-0800-reformer", dayIndex: 1, top: 144, time: "08:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "ter-1000-tower", dayIndex: 1, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "3/4", status: "pending", statusLabel: "chamada pendente" },
  { id: "ter-1400-alongamento", dayIndex: 1, top: 397, time: "14:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "2/6", status: "available", statusLabel: "vaga aberta" },
  { id: "ter-1700-reformer", dayIndex: 1, top: 489, time: "17:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "3/4", status: "pending", statusLabel: "chamada pendente" },
  { id: "ter-1900-pilates", dayIndex: 1, top: 686, time: "19:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "1/6", status: "replacement-possible", statusLabel: "reposicao possivel" },
  { id: "qua-0700-tower", dayIndex: 2, top: 50, time: "07:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-0800-alongamento", dayIndex: 2, top: 144, time: "08:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "4/8", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1000-pilates", dayIndex: 2, top: 297, time: "10:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1400-reformer", dayIndex: 2, top: 397, time: "14:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1800-tower", dayIndex: 2, top: 591, time: "18:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "room-adjustment", statusLabel: "sala em ajuste" },
  { id: "qui-0700-reformer", dayIndex: 3, top: 50, time: "07:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-0800-pilates", dayIndex: 3, top: 144, time: "08:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-1000-tower", dayIndex: 3, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "1/4", status: "available", statusLabel: "vaga aberta" },
  { id: "qui-1400-experimental", dayIndex: 3, top: 397, time: "14:00", title: "Experimental", teacher: "Lucas Peres", capacity: "2/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-1800-alongamento", dayIndex: 3, top: 591, time: "18:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "5/8", status: "scheduled", statusLabel: "confirmada" },
  { id: "sex-0700-pilates", dayIndex: 4, top: 50, time: "07:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "sex-0800-tower", dayIndex: 4, top: 144, time: "08:00", title: "Tower", teacher: "Lucas Peres", capacity: "3/4", status: "replacement", statusLabel: "reposicao" },
  { id: "sex-1000-reformer", dayIndex: 4, top: 297, time: "10:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "0/6", status: "teacher-unavailable", statusLabel: "prof. indisponivel" },
  { id: "sex-1400-pilates", dayIndex: 4, top: 397, time: "14:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "2/6", status: "available", statusLabel: "vaga aberta" },
  { id: "sex-1700-alongamento", dayIndex: 4, top: 489, time: "17:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "sex-1900-reformer", dayIndex: 4, top: 686, time: "19:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" }
];

export interface WeeklyCalendarReferenceEvent {
  id: string;
  dayIndex: number;
  rowIndex: number;
  title: React.ReactNode;
  teacher?: React.ReactNode;
  capacity?: React.ReactNode;
  status?: "scheduled" | "available" | "conflict";
  note?: React.ReactNode;
  span?: number;
}

const weeklyCalendarReferenceTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const weeklyCalendarReferenceEvents: WeeklyCalendarReferenceEvent[] = [
  { id: "seg-08", dayIndex: 0, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "seg-09", dayIndex: 0, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "seg-10", dayIndex: 0, rowIndex: 2, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "seg-12", dayIndex: 0, rowIndex: 4, title: "Reformer", teacher: "Maria Clara", capacity: "5/6" },
  { id: "seg-14", dayIndex: 0, rowIndex: 6, title: "Funcional", teacher: "Carla Lima", capacity: "6/12" },
  { id: "seg-16", dayIndex: 0, rowIndex: 8, title: "Mat Pilates", teacher: "Joao Silva", capacity: "6/10" },
  { id: "seg-18", dayIndex: 0, rowIndex: 10, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "seg-19", dayIndex: 0, rowIndex: 11, title: "Funcional", teacher: "Carlos Lima", capacity: "7/12" },
  { id: "ter-08", dayIndex: 1, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "ter-09", dayIndex: 1, rowIndex: 1, title: "Funcional", teacher: "Carla Lima", capacity: "9/12" },
  { id: "ter-10", dayIndex: 1, rowIndex: 2, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "ter-12", dayIndex: 1, rowIndex: 4, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "4/6" },
  { id: "ter-14", dayIndex: 1, rowIndex: 6, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "ter-16", dayIndex: 1, rowIndex: 8, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "ter-18", dayIndex: 1, rowIndex: 10, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "ter-19", dayIndex: 1, rowIndex: 11, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qua-08", dayIndex: 2, rowIndex: 0, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qua-09", dayIndex: 2, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "8/8" },
  { id: "qua-10", dayIndex: 2, rowIndex: 2, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "5/6" },
  { id: "qua-12", dayIndex: 2, rowIndex: 4, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "qua-conflict", dayIndex: 2, rowIndex: 5, title: "Conflito", note: "Sala 2 ocupada", status: "conflict", span: 2 },
  { id: "qua-16", dayIndex: 2, rowIndex: 8, title: "Reformer", teacher: "Maria Clara", capacity: "8/8" },
  { id: "qua-18", dayIndex: 2, rowIndex: 10, title: "Funcional", teacher: "Carla Lima", capacity: "8/12" },
  { id: "qua-19", dayIndex: 2, rowIndex: 11, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "qui-08", dayIndex: 3, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "qui-09", dayIndex: 3, rowIndex: 1, title: "Funcional", teacher: "Carla Lima", capacity: "7/12" },
  { id: "qui-10", dayIndex: 3, rowIndex: 2, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "qui-12", dayIndex: 3, rowIndex: 4, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qui-14", dayIndex: 3, rowIndex: 6, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "qui-16", dayIndex: 3, rowIndex: 8, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "5/6" },
  { id: "qui-18", dayIndex: 3, rowIndex: 10, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "qui-19", dayIndex: 3, rowIndex: 11, title: "Pilates Solo", teacher: "Ana Paula", capacity: "5/6" },
  { id: "sex-08", dayIndex: 4, rowIndex: 0, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "sex-09", dayIndex: 4, rowIndex: 1, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "sex-10", dayIndex: 4, rowIndex: 2, title: "Funcional", teacher: "Carla Lima", capacity: "6/12" },
  { id: "sex-12", dayIndex: 4, rowIndex: 4, title: "Pilates Solo", teacher: "Ana Paula", capacity: "5/6" },
  { id: "sex-14", dayIndex: 4, rowIndex: 6, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "sex-16", dayIndex: 4, rowIndex: 8, title: "Mat Pilates", teacher: "Joao Silva", capacity: "7/10" },
  { id: "sex-18", dayIndex: 4, rowIndex: 10, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "sex-19", dayIndex: 4, rowIndex: 11, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "sab-08", dayIndex: 5, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "7/10" },
  { id: "sab-09", dayIndex: 5, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "sab-12", dayIndex: 5, rowIndex: 4, title: "Funcional", teacher: "Carla Lima", capacity: "5/12" },
  { id: "sab-18", dayIndex: 5, rowIndex: 10, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "dom-08", dayIndex: 6, rowIndex: 0, title: "Vaga aberta", note: "08:00 - 09:00", status: "available", span: 2 },
  { id: "dom-12", dayIndex: 6, rowIndex: 4, title: "Vaga aberta", note: "11:00 - 12:00", status: "available", span: 2 },
  { id: "dom-16", dayIndex: 6, rowIndex: 8, title: "Vaga aberta", note: "15:00 - 16:00", status: "available", span: 2 }
];

function WeeklyCalendarReference({
  days,
  events,
  onEventSelect,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onFilter,
  className
}: {
  days: string[];
  events: WeeklyCalendarReferenceEvent[];
  onEventSelect?: (eventId: string, event: WeeklyCalendarReferenceEvent) => void;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
  onFilter?: () => void;
  className?: string;
}) {
  return (
    <section className={cn("tcrm-weekly-calendar-reference", className)} data-component="WeeklyCalendar" data-variant="reference">
      <header className="tcrm-weekly-calendar-reference__toolbar">
        <ButtonGroup aria-label="Navegacao da semana">
          <IconButton icon="chevronLeft" label="Semana anterior" onClick={onPreviousWeek} size="sm" variant="ghost" />
          <Button onClick={onToday} size="sm" variant="secondary">Hoje</Button>
          <IconButton icon="chevronRight" label="Proxima semana" onClick={onNextWeek} size="sm" variant="ghost" />
        </ButtonGroup>
        <span>20 - 26 de Maio, 2024</span>
        <div className="tcrm-weekly-calendar-reference__toolbar-actions">
          <SegmentedControl compact label="Visualizacao" options={[{ value: "day", label: "Dia" }, { value: "week", label: "Semana" }, { value: "month", label: "Mes" }]} value="week" />
          <Button leadingIcon="filter" onClick={onFilter} size="sm" variant="secondary">Filtros</Button>
        </div>
      </header>
      <div className="tcrm-weekly-calendar-reference__grid" role="grid" aria-label="Calendario semanal completo">
        <span className="tcrm-weekly-calendar-reference__corner">Hora</span>
        {days.map((day) => <strong key={day} role="columnheader">{day}</strong>)}
        <div className="tcrm-weekly-calendar-reference__times">
          {weeklyCalendarReferenceTimes.map((time) => <span key={time}>{time}</span>)}
        </div>
        <div className="tcrm-weekly-calendar-reference__cells" aria-hidden="true">
          {Array.from({ length: 84 }, (_, index) => <span key={index} />)}
        </div>
        <div className="tcrm-weekly-calendar-reference__events">
          {events.map((event) => (
            <button
              className={cn("tcrm-weekly-calendar-reference__event", `tcrm-weekly-calendar-reference__event--${event.status ?? "scheduled"}`)}
              key={event.id}
              onClick={() => onEventSelect?.(event.id, event)}
              style={{ "--tcrm-reference-event-column": event.dayIndex + 1, "--tcrm-reference-event-row": event.rowIndex + 1, "--tcrm-reference-event-span": event.span ?? 1 } as React.CSSProperties}
              type="button"
            >
              <strong>{event.title}</strong>
              {event.teacher ? <small>{event.teacher}</small> : null}
              <span>{event.note ?? event.capacity}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeeklyCalendar({
  days = ["Seg 12/05", "Ter 13/05", "Qua 14/05", "Qui 15/05", "Sex 16/05"],
  times = weeklyCalendarTimes,
  events = weeklyCalendarSourceEvents,
  selectedEventId,
  onEventSelect,
  compact = false,
  density = "default",
  variant = "agenda",
  referenceEvents = weeklyCalendarReferenceEvents,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onFilter,
  className
}: {
  days?: string[];
  times?: Array<{ label: React.ReactNode; top: number }>;
  events?: WeeklyCalendarEvent[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string, event: WeeklyCalendarEvent) => void;
  compact?: boolean;
  density?: "default" | "short";
  variant?: "agenda" | "reference";
  referenceEvents?: WeeklyCalendarReferenceEvent[];
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
  onFilter?: () => void;
  className?: string;
}) {
  if (variant === "reference") {
    return (
      <WeeklyCalendarReference
        className={className}
        days={days.length === 7 ? days : ["Seg 20/05", "Ter 21/05", "Qua 22/05", "Qui 23/05", "Sex 24/05", "Sab 25/05", "Dom 26/05"]}
        events={referenceEvents}
        onEventSelect={onEventSelect as ((eventId: string, event: WeeklyCalendarReferenceEvent) => void) | undefined}
        onFilter={onFilter}
        onNextWeek={onNextWeek}
        onPreviousWeek={onPreviousWeek}
        onToday={onToday}
      />
    );
  }
  return (
    <div className={cn("tcrm-weekly-calendar", compact && "tcrm-weekly-calendar--compact", density === "short" && "tcrm-weekly-calendar--short", className)} role="grid" aria-label="Agenda semanal">
      <div className="tcrm-weekly-calendar__corner" />
      {days.map((day) => <div className="tcrm-weekly-calendar__day" key={day} role="columnheader">{day}</div>)}
      <div className="tcrm-weekly-calendar__body">
        {times.map((time) => (
          <span className="tcrm-weekly-calendar__time" key={String(time.label)} style={{ "--tcrm-weekly-time-top": `${time.top}px` } as React.CSSProperties}>
            {time.label}
          </span>
        ))}
        {days.map((day, index) => <span aria-hidden="true" className="tcrm-weekly-calendar__column-line" key={day} style={{ "--tcrm-weekly-column": index } as React.CSSProperties} />)}
        {times.map((time) => <span aria-hidden="true" className="tcrm-weekly-calendar__row-line" key={`line-${String(time.label)}`} style={{ "--tcrm-weekly-time-top": `${time.top}px` } as React.CSSProperties} />)}
        {events.map((event) => (
          <div
            className="tcrm-weekly-calendar__event"
            key={event.id}
            style={{
              "--tcrm-weekly-event-day": event.dayIndex,
              "--tcrm-weekly-event-top": `${event.top}px`,
              "--tcrm-weekly-event-height": `${event.height ?? 85}px`
            } as React.CSSProperties}
          >
            <ClassCard
              capacity={event.capacity}
              meta={event.teacher}
              onSelect={onEventSelect ? () => onEventSelect(event.id, event) : undefined}
              selected={selectedEventId === event.id}
              state={event.status}
              statusLabel={event.statusLabel}
              time={event.time}
              title={event.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export interface MiniCalendarCell {
  id: string;
  label: string;
  value?: string;
  outside?: boolean;
  disabled?: boolean;
}

const miniCalendarWeekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const miniCalendarMay2024Cells: MiniCalendarCell[] = [
  { id: "prev-28", label: "28", outside: true },
  { id: "prev-29", label: "29", outside: true },
  { id: "prev-30", label: "30", outside: true },
  { id: "1", label: "1", value: "1" },
  { id: "2", label: "2", value: "2" },
  { id: "3", label: "3", value: "3" },
  { id: "4", label: "4", value: "4" },
  { id: "5", label: "5", value: "5" },
  { id: "6", label: "6", value: "6" },
  { id: "7", label: "7", value: "7" },
  { id: "8", label: "8", value: "8" },
  { id: "9", label: "9", value: "9" },
  { id: "10", label: "10", value: "10" },
  { id: "11", label: "11", value: "11" },
  { id: "12", label: "12", value: "12" },
  { id: "13", label: "13", value: "13" },
  { id: "14", label: "14", value: "14" },
  { id: "15", label: "15", value: "15" },
  { id: "16", label: "16", value: "16" },
  { id: "17", label: "17", value: "17" },
  { id: "18", label: "18", value: "18" },
  { id: "19", label: "19", value: "19" },
  { id: "20", label: "20", value: "20" },
  { id: "21", label: "21", value: "21" },
  { id: "22", label: "22", value: "22" },
  { id: "23", label: "23", value: "23" },
  { id: "24", label: "24", value: "24" },
  { id: "25", label: "25", value: "25" },
  { id: "26", label: "26", value: "26" },
  { id: "27", label: "27", value: "27" },
  { id: "28", label: "28", value: "28" },
  { id: "29", label: "29", value: "29" },
  { id: "30", label: "30", value: "30" },
  { id: "31", label: "31", value: "31" },
  { id: "next-1", label: "1", outside: true }
];

export function MiniCalendar({
  selected = "12",
  today = "18",
  monthLabel = "maio 2024",
  weekdays = miniCalendarWeekdays,
  cells = miniCalendarMay2024Cells,
  disabledDays = [],
  loading = false,
  blocked = false,
  showHeader = true,
  onPreviousMonth,
  onNextMonth,
  onSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  selected?: string;
  today?: string;
  monthLabel?: string;
  weekdays?: string[];
  cells?: MiniCalendarCell[];
  disabledDays?: string[];
  loading?: boolean;
  blocked?: boolean;
  showHeader?: boolean;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onSelect?: (day: string) => void;
}) {
  const isDisabled = loading || blocked;
  return (
    <div
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      className={cn("tcrm-mini-calendar", !showHeader && "tcrm-mini-calendar--headerless", loading && "tcrm-mini-calendar--loading", blocked && "tcrm-mini-calendar--blocked", className)}
      role="group"
      {...props}
    >
      {showHeader ? (
        <header className="tcrm-mini-calendar__header">
          <strong>{monthLabel}</strong>
          <div className="tcrm-mini-calendar__nav" aria-label={`Navegacao de ${monthLabel}`}>
            <IconButton className="tcrm-mini-calendar__nav-button" disabled={isDisabled} icon="chevronLeft" label="Mes anterior" onClick={onPreviousMonth} size="sm" variant="ghost" />
            <IconButton className="tcrm-mini-calendar__nav-button" disabled={isDisabled} icon="chevronRight" label="Proximo mes" onClick={onNextMonth} size="sm" variant="ghost" />
          </div>
        </header>
      ) : null}
      <div className="tcrm-mini-calendar__grid" role="grid" aria-label={monthLabel}>
        {weekdays.map((weekday, index) => (
          <span className="tcrm-mini-calendar__weekday" key={`${weekday}-${index}`} role="columnheader">
            {weekday}
          </span>
        ))}
        {cells.map((cell) => {
          const value = cell.value ?? cell.label;
          const cellDisabled = isDisabled || cell.disabled || cell.outside || disabledDays.includes(value);
          const isSelected = value === selected && !cell.outside;
          const isToday = value === today && !cell.outside;
          return (
            <button
              aria-current={isSelected ? "date" : isToday ? "date" : undefined}
              className={cn(
                "tcrm-mini-calendar__day",
                cell.outside && "tcrm-mini-calendar__day--outside",
                isToday && "tcrm-mini-calendar__day--today",
                isSelected && "tcrm-mini-calendar__day--selected"
              )}
              disabled={cellDisabled}
              key={cell.id}
              onClick={() => onSelect?.(value)}
              type="button"
            >
              {cell.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface CompactCalendarItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  meta: React.ReactNode;
  tone?: ComponentTone;
}

const compactCalendarSourceItems: CompactCalendarItem[] = [
  { id: "restriction", time: "10:30", title: "Restricao de conta", meta: "Joao Silva", tone: "info" },
  { id: "email", time: "11:30", title: "Falha no envio de e-mail", meta: "Maria Claro", tone: "danger" },
  { id: "report", time: "15:00", title: "Revisao de relatorio", meta: "Sam Frank", tone: "warning" }
];

export function CompactCalendar({
  monthLabel = "Abril 2024",
  selected = "9",
  today = "18",
  selectedDateLabel = "Terca, 9 de Abril",
  items = compactCalendarSourceItems,
  view = "month",
  disabled = false,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onViewChange,
  onSelect,
  onEventOpen,
  onCreate,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  monthLabel?: React.ReactNode;
  selected?: string;
  today?: string;
  selectedDateLabel?: React.ReactNode;
  items?: CompactCalendarItem[];
  view?: "month" | "week" | "day";
  disabled?: boolean;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onToday?: () => void;
  onViewChange?: (value: "month" | "week" | "day") => void;
  onSelect?: (day: string) => void;
  onEventOpen?: (item: CompactCalendarItem) => void;
  onCreate?: () => void;
}) {
  return (
    <section aria-label="Calendario compacto" className={cn("tcrm-compact-calendar", className)} data-component="CompactCalendar" {...props}>
      <header className="tcrm-compact-calendar__header">
        <strong>{monthLabel}</strong>
        <div className="tcrm-compact-calendar__navigation">
          <IconButton disabled={disabled} icon="chevronLeft" label="Mes anterior" onClick={onPreviousMonth} size="sm" variant="ghost" />
          <IconButton disabled={disabled} icon="chevronRight" label="Proximo mes" onClick={onNextMonth} size="sm" variant="ghost" />
          <Button disabled={disabled} onClick={onToday} size="sm" variant="secondary">Hoje</Button>
        </div>
        <SegmentedControl
          compact
          label="Visualizacao do calendario"
          onChange={(value: string) => onViewChange?.(value as "month" | "week" | "day")}
          options={[
            { value: "month", label: "Mes", disabled },
            { value: "week", label: "Semana", disabled },
            { value: "day", label: "Dia", disabled }
          ]}
          value={view}
        />
      </header>
      <div className="tcrm-compact-calendar__body">
        <MiniCalendar blocked={disabled} monthLabel={String(monthLabel)} onSelect={onSelect} selected={selected} showHeader={false} today={today} />
        <section className="tcrm-compact-calendar__agenda" aria-label={String(selectedDateLabel)}>
          <strong>{selectedDateLabel}</strong>
          <List dense divided>
            {items.map((item) => (
              <ListItem
                action={<IconButton disabled={disabled} icon="chevronRight" label={`Abrir ${String(item.title)}`} onClick={() => onEventOpen?.(item)} size="sm" variant="ghost" />}
                key={item.id}
                leading={<ListIcon icon="circle" tone={item.tone ?? "neutral"} />}
                meta={item.meta}
                title={<><span>{item.time}</span> {item.title}</>}
              />
            ))}
          </List>
          <Button disabled={disabled} leadingIcon="plus" onClick={onCreate} size="sm" variant="secondary">Novo compromisso</Button>
        </section>
      </div>
    </section>
  );
}

export function ClassCard({
  title = "Pilates Solo",
  meta = "Mariana Lopes",
  time,
  capacity,
  state = "scheduled",
  statusLabel,
  selected = false,
  onSelect,
  action,
  variant = "event",
  endTime,
  room = "Sala 1",
  attendance,
  avatarSrc,
  openSlot = false,
  onCalendar,
  onRoster,
  onMenu,
  onReserve,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  state?: string;
  statusLabel?: React.ReactNode;
  selected?: boolean;
  action?: React.ReactNode;
  time?: React.ReactNode;
  capacity?: React.ReactNode;
  onSelect?: () => void;
  variant?: "event" | "reference";
  endTime?: React.ReactNode;
  room?: React.ReactNode;
  attendance?: React.ReactNode;
  avatarSrc?: string;
  openSlot?: boolean;
  onCalendar?: () => void;
  onRoster?: () => void;
  onMenu?: () => void;
  onReserve?: () => void;
}) {
  const status = state === "full" ? "full" : state === "available" ? "available" : state === "conflict" || state === "teacher-unavailable" || state === "room-adjustment" ? "conflict" : "scheduled";

  if (variant === "reference") {
    return (
      <article className={cn("tcrm-class-card-reference", openSlot && "tcrm-class-card-reference--open", state && `tcrm-class-card-reference--${stateKey(state)}`, className)} data-component="ClassCard" data-variant="reference" {...props}>
        <header>
          <span className="tcrm-class-card-reference__time"><StatusDot status={openSlot ? "info" : state === "conflict" ? "danger" : "success"} /> {time}{endTime ? <> - {endTime}</> : null}</span>
          <IconButton icon="moreVertical" label={`Opcoes de ${String(title)}`} onClick={onMenu} size="sm" variant="ghost" />
        </header>
        {openSlot ? <small className="tcrm-class-card-reference__eyebrow">Vaga aberta</small> : null}
        <strong>{title}</strong>
        <small>{meta}</small>
        {!openSlot ? <span className="tcrm-class-card-reference__teacher"><Avatar name={String(meta)} size="xs" src={avatarSrc} /> {meta}</span> : null}
        <dl>
          <div><dt>Sala</dt><dd>{room}</dd></div>
          <div><dt>Capacidade</dt><dd>{capacity}</dd></div>
          <div><dt>Chamada</dt><dd>{attendance ?? statusLabel ?? "-"}</dd></div>
        </dl>
        {openSlot ? (
          <Button leadingIcon="plus" onClick={onReserve} size="sm" variant="secondary">Reservar aula</Button>
        ) : (
          <footer>
            <IconButton icon="calendar" label="Abrir calendario" onClick={onCalendar} size="sm" variant="default" />
            <IconButton icon="users" label="Abrir chamada" onClick={onRoster} size="sm" variant="default" />
            <IconButton icon="moreVertical" label="Mais acoes" onClick={onMenu} size="sm" variant="default" />
          </footer>
        )}
      </article>
    );
  }

  return (
    <CalendarEventBlock
      aria-pressed={onSelect ? selected : undefined}
      className={cn("tcrm-class-card", state && `tcrm-class-card--${stateKey(state)}`, selected && "tcrm-class-card--selected", className)}
      compact
      action={action}
      capacity={capacity || statusLabel ? <><span className="tcrm-class-card__capacity">{capacity}</span>{statusLabel ? <span className="tcrm-class-card__status">{statusLabel}</span> : null}</> : null}
      meta={meta}
      onClick={() => onSelect?.()}
      onKeyDown={onSelect ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      } : undefined}
      role={onSelect ? "button" : undefined}
      status={status}
      tabIndex={onSelect ? 0 : undefined}
      time={time}
      title={title}
      {...props}
    />
  );
}

export type RosterAttendanceStatus = "pending" | "present" | "warned" | "no-show" | "replacement" | "absent" | "corrected";

export interface RosterStudent {
  id: string;
  name: string;
  initials?: string;
  avatarSrc?: string;
  state?: RosterAttendanceStatus;
  status?: RosterAttendanceStatus;
  meta?: React.ReactNode;
  helper?: React.ReactNode;
  observation?: React.ReactNode;
  credit?: React.ReactNode;
}

const rosterStatusCopy: Record<RosterAttendanceStatus, { label: string; className: string }> = {
  pending: { label: "Pendente", className: "pending" },
  present: { label: "Presente", className: "present" },
  warned: { label: "Falta avisada", className: "warned" },
  absent: { label: "Falta avisada", className: "warned" },
  "no-show": { label: "No-show", className: "no-show" },
  replacement: { label: "Reposição", className: "replacement" },
  corrected: { label: "Reposição", className: "replacement" }
};

function normalizeRosterStudent(student: RosterStudent | string, index: number): RosterStudent {
  if (typeof student !== "string") {
    const status = student.status ?? student.state ?? (index === 0 ? "pending" : "present");
    return { ...student, status };
  }

  return {
    id: index === 0 ? "ana" : stateKey(student),
    name: student,
    status: index === 1 ? "warned" : "present"
  };
}

export function Roster({
  students = [
    { id: "ana", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
    { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
    { id: "felipe", name: "Felipe Andrade", status: "warned", helper: "gera crédito" },
    { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
    { id: "juliana", name: "Juliana Costa", status: "replacement", helper: "reposição usada" }
  ],
  onStudentAction,
  onStudentStatus,
  disabled = false,
  variant = "attendance",
  className
}: {
  students?: Array<RosterStudent | string>;
  onStudentAction?: (studentId: string) => void;
  onStudentStatus?: (student: RosterStudent) => void;
  disabled?: boolean;
  variant?: "attendance" | "expected" | "reference";
  className?: string;
}) {
  if (variant === "reference") {
    return (
      <div className={cn("tcrm-roster-reference", className)} data-component="Roster" data-variant="reference" role="table" aria-label="Roster de chamada">
        <div className="tcrm-roster-reference__header" role="row">
          <span role="columnheader" />
          <span role="columnheader">Esperado</span>
          <span role="columnheader">Presente</span>
          <span role="columnheader">Falta</span>
          <span role="columnheader">No-show</span>
          <span role="columnheader">Observacao</span>
          <span role="columnheader">Credito reposicao</span>
        </div>
        {students.map((sourceStudent, index) => {
          const student = normalizeRosterStudent(sourceStudent, index);
          const status = student.status ?? student.state ?? "pending";
          const emit = () => {
            onStudentAction?.(student.id);
            onStudentStatus?.(student);
          };
          return (
            <div className="tcrm-roster-reference__row" key={student.id} role="row">
              <span className="tcrm-roster-reference__student" role="cell"><Avatar name={student.name} size="xs" src={student.avatarSrc} /> {student.name}</span>
              <span role="cell"><Checkbox aria-label={`${student.name}: esperado`} checked={status === "pending"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: presente`} checked={status === "present"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: falta`} checked={status === "warned" || status === "absent"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: no-show`} checked={status === "no-show"} disabled={disabled} onChange={emit} /></span>
              <span role="cell">{student.observation ?? student.helper ?? "-"}</span>
              <span role="cell">{student.credit ?? (status === "warned" || status === "no-show" ? "1" : "0")}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <List className={cn("tcrm-roster", `tcrm-roster--${variant}`, className)} divided>
      {students.map((sourceStudent, index) => {
        const student = normalizeRosterStudent(sourceStudent, index);
        const statusKey = student.status ?? student.state ?? "present";
        const status = rosterStatusCopy[statusKey];
        const avatarName = student.initials ? student.initials.split("").join(" ") : student.name;
        const emit = () => {
          onStudentAction?.(student.id);
          onStudentStatus?.(student);
        };
        return (
          <ListItem
            className="tcrm-roster__row"
            data-attendance={status.className}
            action={
              <IconButton
                className="tcrm-roster__action"
                disabled={disabled || (!onStudentAction && !onStudentStatus)}
                icon={variant === "expected" ? "moreVertical" : "chevronDown"}
                label={variant === "expected" ? `Abrir opções de ${student.name}` : `Alterar presença de ${student.name}`}
                onClick={emit}
                size="sm"
                variant="default"
              />
            }
            leading={<Avatar aria-label={student.name} className="tcrm-roster__avatar" name={avatarName} size="md" src={student.avatarSrc} />}
            key={student.id}
            meta={student.helper ?? student.meta}
            trailing={<Chip className={cn("tcrm-roster__status", `tcrm-roster__status--${status.className}`)} showDot={false}>{status.label}</Chip>}
            title={student.name}
          />
        );
      })}
    </List>
  );
}

/** @deprecated Use `defaultSetupSteps`, the current nine-block product contract. */
export const setupShellSourceSteps = defaultSetupSteps;

function SetupShellDefaultStage() {
  return (
    <div className="tcrm-setup-shell__stage">
      <div className="tcrm-setup-shell__stage-icon" aria-hidden="true">
        <Icon name="scan" size="38px" />
      </div>
      <h2>Área da etapa atual</h2>
      <p>Conteúdo da página entra aqui.</p>
      <p>Formulários, listas, importações, revisões e configurações.</p>
      <div className="tcrm-setup-shell__dash tcrm-setup-shell__dash--hero" aria-hidden="true" />
      <div className="tcrm-setup-shell__card-row" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="tcrm-setup-shell__wide-card" aria-hidden="true">
        <span className="tcrm-setup-shell__skeleton-lines">
          <i />
          <i />
          <i />
        </span>
        <span className="tcrm-setup-shell__skeleton-media" />
      </div>
      <p className="tcrm-setup-shell__hint"><Icon name="info" size="16px" /> Este é o shell do Setup Inicial. O conteúdo será exibido nesta área.</p>
    </div>
  );
}

function SetupShellAgentPanel({
  onQuickReply,
  onSend,
  disabled = false
}: {
  onQuickReply?: (question: string) => void;
  onSend?: () => void;
  disabled?: boolean;
}) {
  const quickReplies = ["O que é obrigatório?", "Posso deixar para depois?", "Como isso afeta a agenda?"];
  return (
    <section className="tcrm-setup-shell__agent-panel" aria-label="Agente de configuração">
      <header>
        <span className="tcrm-setup-shell__bot-mark"><Icon name="bot" size="23px" /></span>
        <div>
          <h2>Agente de configuração</h2>
          <p><span aria-hidden="true" /> Guiando setup</p>
        </div>
        <IconButton disabled={disabled} icon="moreVertical" label="Mais ações do agente" size="sm" variant="ghost" />
        <IconButton disabled={disabled} icon="x" label="Fechar agente" size="sm" variant="ghost" />
      </header>
      <div className="tcrm-setup-shell__agent-alert"><Icon name="info" size="22px" /> Esta etapa afeta agenda, cobrança e comunicação inicial.</div>
      <p className="tcrm-setup-shell__agent-message">Estamos na etapa Dados do studio.<br />Vou te avisar o que é obrigatório e o que pode ficar para depois.</p>
      <p className="tcrm-setup-shell__agent-message">Use a área central para preencher, importar ou revisar dados. Eu acompanho daqui e explico qualquer dúvida.</p>
      <div className="tcrm-setup-shell__quick-replies" aria-label="Dúvidas frequentes">
        <strong>Dúvidas frequentes</strong>
        {quickReplies.map((question) => (
          <button disabled={disabled} key={question} onClick={() => onQuickReply?.(question)} type="button">{question}</button>
        ))}
      </div>
      <form className="tcrm-setup-shell__agent-composer" onSubmit={(event) => { event.preventDefault(); onSend?.(); }}>
        <label className="tl-sr-only" htmlFor="setup-shell-agent-question">Pergunte sobre esta etapa</label>
        <input disabled={disabled} id="setup-shell-agent-question" placeholder="Pergunte sobre esta etapa..." />
        <IconButton disabled={disabled} icon="send" label="Enviar pergunta" size="md" type="submit" variant="selected" />
      </form>
      <p className="tcrm-setup-shell__human-help">Precisa de ajuda humana? <button disabled={disabled} type="button">Agendar ajuda</button></p>
    </section>
  );
}

export interface SetupShellProps {
  step?: number;
  steps?: string[];
  progress?: number;
  layout?: "guided" | "welcome";
  children?: React.ReactNode;
  agent?: React.ReactNode;
  bottomBar?: React.ReactNode;
  studioName?: React.ReactNode;
  status?: React.ReactNode;
  avatarSrc?: string;
  state?: "source" | "loading" | "blocked";
  onStudioSelect?: () => void;
  onHelp?: () => void;
  onProfile?: () => void;
  onStepSelect?: (stepId: string) => void;
  onAgentQuickReply?: (question: string) => void;
  onAgentSend?: () => void;
  onBottomBarToggle?: () => void;
  className?: string;
}

export function SetupShell({
  step = 2,
  steps = setupShellSourceSteps,
  progress = 32,
  layout = "guided",
  children,
  agent,
  bottomBar,
  studioName = "Studio Leticia",
  status = "Setup inicial em andamento",
  avatarSrc,
  state = "source",
  onStudioSelect,
  onHelp,
  onProfile,
  onStepSelect,
  onAgentQuickReply,
  onAgentSend,
  onBottomBarToggle,
  className
}: SetupShellProps) {
  const isDisabled = state === "blocked" || state === "loading";
  const currentStep = Math.min(Math.max(step, 1), steps.length);

  return (
    <div
      className={cn("tcrm-setup-shell", `tcrm-setup-shell--${state}`, `tcrm-setup-shell--layout-${layout}`, className)}
      aria-busy={state === "loading" || undefined}
      data-component="SetupShell"
      data-layout={layout}
      data-state={state}
    >
      <header className="tcrm-setup-shell__topbar">
        <TaliyaLogo className="tcrm-setup-shell__logo" />
        <span className="tcrm-setup-shell__topbar-divider" aria-hidden="true" />
        <Button className="tcrm-setup-shell__studio" disabled={isDisabled} onClick={onStudioSelect} trailingIcon="chevronDown" type="button" variant="ghost">
          {studioName}
        </Button>
        <Chip className="tcrm-setup-shell__status" showDot={false}><span aria-hidden="true" className="tcrm-setup-shell__status-dot" />{status}</Chip>
        <div className="tcrm-setup-shell__progress">
          <ProgressBar label="Progresso geral" value={progress} />
          <span>{progress}%</span>
        </div>
        <Button className="tcrm-setup-shell__help" disabled={isDisabled} leadingIcon="help" onClick={onHelp} variant="secondary">Ajuda</Button>
        <button aria-label="Abrir perfil" className="tcrm-setup-shell__avatar-button" disabled={isDisabled} onClick={onProfile} type="button">
          <Avatar name="Operadora" size="md" src={avatarSrc} />
        </button>
        <IconButton className="tcrm-setup-shell__account-menu" disabled={isDisabled} icon="chevronDown" label="Abrir menu da conta" size="sm" variant="ghost" />
      </header>
      <SetupStepper className="tcrm-setup-shell__steps" currentStep={currentStep} disabled={isDisabled} onStepSelect={onStepSelect} steps={steps} />
      <main className="tcrm-setup-shell__main">{children ?? <SetupShellDefaultStage />}</main>
      <aside className="tcrm-setup-shell__agent">{agent ?? <SetupShellAgentPanel disabled={isDisabled} onQuickReply={onAgentQuickReply} onSend={onAgentSend} />}</aside>
      {bottomBar ?? <SetupBottomBar disabled={isDisabled} onToggle={onBottomBarToggle} />}
    </div>
  );
}

export function SetupStepper({
  steps = setupShellSourceSteps,
  currentStep = 1,
  blockedStepIds = [],
  disabled = false,
  onStepSelect,
  orientation = "vertical",
  showProgress = orientation === "horizontal",
  className
}: {
  steps?: string[];
  currentStep?: number;
  blockedStepIds?: string[];
  disabled?: boolean;
  onStepSelect?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
  showProgress?: boolean;
  className?: string;
}) {
  const activeStep = Math.min(Math.max(currentStep, 1), steps.length);
  const stepItems: StepperStep[] = steps.map((step, index) => {
    const number = index + 1;
    const id = step.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    return {
      id,
      label: <><span className="tcrm-setup-stepper__step-number">{number}</span>{step}</>,
      description: number < activeStep ? "Concluído" : number === activeStep ? "Em andamento" : blockedStepIds.includes(id) ? "Bloqueado" : "Pendente",
      disabled,
      state: blockedStepIds.includes(id) ? "blocked" : number < activeStep ? "complete" : number === activeStep ? "current" : "pending"
    };
  });

  return (
    <aside className={cn("tcrm-setup-stepper-panel", `tcrm-setup-stepper-panel--${orientation}`, className)} data-component="SetupStepper">
      {orientation === "vertical" ? <h3>Etapas</h3> : null}
      <Stepper
        className="tcrm-setup-stepper"
        currentStepId={stepItems[activeStep - 1]?.id}
        markerStyle="number"
        onStepSelect={onStepSelect}
        orientation={orientation}
        progress={showProgress ? Math.round((activeStep / steps.length) * 100) : undefined}
        readonly={disabled}
        steps={stepItems}
      />
      {orientation === "vertical" ? <p className="tcrm-setup-stepper__sequence"><Icon name="lock" size="15px" /> Sequência obrigatória</p> : null}
    </aside>
  );
}

export function SetupBlockHeader({
  title = "Studio",
  description = "Defina o nomr e os hor\u00e1rios gerais de funcionamento, isso ajuda o Taliya a montar a grade inicial com seguran\u00e7a.",
  step = 1,
  totalSteps = 8,
  badgeLabel,
  showBadge = true,
  state = "current",
  action,
  actionLabel = state === "blocked" ? "Resolver pendência" : state === "warning" ? "Revisar" : undefined,
  disabled = false,
  loading = false,
  onAction,
  className
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  step?: number;
  totalSteps?: number;
  badgeLabel?: React.ReactNode;
  showBadge?: boolean;
  state?: "current" | "complete" | "warning" | "blocked" | "loading";
  action?: React.ReactNode;
  actionLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  onAction?: () => void;
  className?: string;
}) {
  const isDisabled = disabled || loading || state === "loading";
  const label = loading || state === "loading" ? "Carregando bloco" : badgeLabel ?? `Bloco ${step} de ${totalSteps}`;
  const actionNode = action ?? (actionLabel ? (
    <Button
      className="tcrm-setup-block-header__action"
      disabled={isDisabled || state === "complete"}
      onClick={onAction}
      size="sm"
      variant={state === "blocked" ? "primary" : "secondary"}
    >
      {actionLabel}
    </Button>
  ) : null);

  return (
    <header
      aria-busy={loading || state === "loading" ? true : undefined}
      className={cn("tcrm-setup-block-header", className)}
      data-component="SetupBlockHeader"
      data-state={loading ? "loading" : state}
    >
      <div className="tcrm-setup-block-header__copy">
        <div className="tcrm-setup-block-header__title-row">
          <h1>{title}</h1>
          {showBadge ? (
            <Chip className="tcrm-setup-block-header__chip" showDot={false} tone={toneForState(state)}>
              {label}
            </Chip>
          ) : null}
        </div>
        <p>{description}</p>
      </div>
      {actionNode ? <div className="tcrm-setup-block-header__actions">{actionNode}</div> : null}
    </header>
  );
}

export function SetupBottomBar({
  progress = 0,
  state = "pending",
  onSave,
  onContinue,
  onPublish,
  onToggle,
  disabled = false,
  warningCount = 2,
  collapsed = true,
  className
}: {
  progress?: number;
  state?: "draft" | "saved" | "pending" | "ready" | "published";
  onSave?: () => void;
  onContinue?: () => void;
  onPublish?: () => void;
  onToggle?: () => void;
  disabled?: boolean;
  warningCount?: number;
  collapsed?: boolean;
  className?: string;
}) {
  const statusText = state === "published"
    ? "Setup publicado"
    : state === "ready"
      ? "Tudo certo neste bloco"
      : state === "draft"
        ? "Rascunho pronto para salvar"
        : "Rascunhos salvos automaticamente";
  const warningText = state === "published" || state === "ready" ? "Tudo certo neste bloco" : `Pendências do setup (${warningCount})`;
  const actionHandler = state === "ready" ? onPublish : state === "draft" ? onSave : onContinue;
  const actionLabel = state === "ready" ? "Publicar" : state === "draft" ? "Salvar" : "Continuar";

  return (
    <footer className={cn("tcrm-setup-bottom-bar", className)} data-component="SetupBottomBar" data-state={state}>
      <span className="tcrm-setup-bottom-bar__item">
        <Icon className="tcrm-setup-bottom-bar__status-icon" name="shield" />
        <span>Ambiente de Setup Inicial</span>
      </span>
      <span className="tcrm-setup-bottom-bar__divider" aria-hidden="true" />
      <Button aria-label={actionLabel} className="tcrm-setup-bottom-bar__item tcrm-setup-bottom-bar__save" disabled={disabled} onClick={actionHandler} variant="ghost">
        <Icon className="tcrm-setup-bottom-bar__save-icon" name="checkCircle" />
        <span>{statusText}</span>
        <span className="tl-sr-only">Progresso do setup: {progress}%</span>
      </Button>
      <Button className="tcrm-setup-bottom-bar__item tcrm-setup-bottom-bar__warning" disabled={disabled} onClick={onContinue} variant="ghost">
        <Icon className="tcrm-setup-bottom-bar__status-icon" name={state === "ready" || state === "published" ? "checkCircle" : "alert"} />
        <span>{warningText}</span>
      </Button>
      <span className="tcrm-setup-bottom-bar__divider" aria-hidden="true" />
      <IconButton
        className="tcrm-setup-bottom-bar__toggle"
        data-collapsed={collapsed ? "true" : "false"}
        disabled={disabled}
        icon="chevronDown"
        label={collapsed ? "Expandir pendências do setup" : "Recolher pendências do setup"}
        onClick={onToggle}
        size="md"
        variant="default"
      />
    </footer>
  );
}

export type SetupWelcomeState = "first" | "returning" | "blocked" | "loading";

export interface SetupWelcomeProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  state?: SetupWelcomeState;
  studioName?: string;
  placeholder?: string;
  onStudioNameChange?: (value: string) => void;
  onStart?: () => void;
  disabled?: boolean;
}

export function SetupWelcome({
  state = "first",
  studioName,
  placeholder = "Ex.: Studio Letícia",
  onStudioNameChange,
  onStart,
  disabled = false,
  className,
  ...props
}: SetupWelcomeProps) {
  const [internalStudioName, setInternalStudioName] = React.useState(studioName ?? "");
  const [showNameError, setShowNameError] = React.useState(false);
  const isDisabled = disabled || state === "blocked" || state === "loading";
  const resolvedStudioName = studioName ?? internalStudioName;
  const buttonLabel = state === "returning" ? "Continuar setup guiado" : "Começar setup guiado";

  const handleStudioNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStudioName = event.currentTarget.value;
    if (studioName === undefined) setInternalStudioName(nextStudioName);
    if (nextStudioName.trim()) setShowNameError(false);
    onStudioNameChange?.(nextStudioName);
  };

  const handleStart = () => {
    if (!resolvedStudioName.trim()) {
      setShowNameError(true);
      return;
    }
    onStart?.();
  };

  return (
    <section
      className={cn("tcrm-setup-welcome", className)}
      data-component="SetupWelcome"
      data-state={state}
      {...props}
    >
      <h1>Bem-vindo à Taliya</h1>
      <p className="tcrm-setup-welcome__subtitle">
        <span>Vamos preparar seu studio passo a passo,</span>
        <span>com ajuda do agente de configuração.</span>
      </p>
      <p className="tcrm-setup-welcome__prompt">Para começar, informe o nome do seu studio.</p>
      <Input
        aria-label="Nome do studio"
        className="tcrm-setup-welcome__input"
        disabled={isDisabled}
        error={showNameError ? "Informe o nome do studio para continuar." : undefined}
        onChange={handleStudioNameChange}
        placeholder={placeholder}
        required
        value={resolvedStudioName}
      />
      <Button
        className="tcrm-setup-welcome__button"
        disabled={isDisabled}
        loading={state === "loading"}
        onClick={handleStart}
        size="lg"
        variant="primary"
      >
        {buttonLabel}
      </Button>
    </section>
  );
}

export type SetupChoiceCardState = "default" | "recommended" | "selected" | "disabled";

export interface SetupChoiceCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  title?: string;
  description?: string;
  state?: SetupChoiceCardState;
  selected?: boolean;
  icon?: IconName;
  onSelect?: () => void;
}

export function SetupChoiceCard({
  title = "Pacote de aulas",
  description = "Pacote com quantidade de aulas por ciclo.",
  state = "default",
  selected = false,
  disabled = false,
  icon = "calendar",
  onSelect,
  className,
  type = "button",
  ...props
}: SetupChoiceCardProps) {
  const isSelected = selected || state === "selected";
  const isDisabled = disabled || state === "disabled";

  return (
    <button
      aria-pressed={isSelected}
      className={cn("tcrm-setup-choice-card", className)}
      data-component="SetupChoiceCard"
      data-state={isDisabled ? "disabled" : isSelected ? "selected" : state}
      disabled={isDisabled}
      onClick={onSelect}
      type={type}
      {...props}
    >
      <span className="tcrm-setup-choice-card__icon" aria-hidden="true">
        {isSelected ? <span className="tcrm-setup-choice-card__selected-dot" /> : <Icon name={icon} />}
      </span>
      <span className="tcrm-setup-choice-card__body">
        <span className="tcrm-setup-choice-card__title">{title}</span>
        <span className="tcrm-setup-choice-card__description">{description}</span>
      </span>
    </button>
  );
}

export type SetupConsumptionModel = "membership" | "class-pack" | "hybrid";

export interface SetupConsumptionWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  model?: SetupConsumptionModel;
  onModelSelect?: (model: SetupConsumptionModel) => void;
  onAction?: (action: "save" | "continue" | "later") => void;
  onSettingChange?: (setting: string, enabled: boolean) => void;
}

export function SetupConsumptionWorkspace({
  model = "class-pack",
  onModelSelect,
  onAction,
  onSettingChange,
  className,
  ...props
}: SetupConsumptionWorkspaceProps) {
  const models: Array<{ id: SetupConsumptionModel; title: string; description: string }> = [
    { id: "membership", title: "Mensalidade", description: "Cobranca recorrente por periodo." },
    { id: "class-pack", title: "Pacote de aulas", description: "Pacote com quantidade de aulas por ciclo." },
    { id: "hybrid", title: "Hibrido", description: "Combina mensalidade e pacotes." }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-consumption-workspace", className)} data-component="SetupConsumptionWorkspace" {...props}>
      <SetupBlockHeader
        badgeLabel="Rascunho"
        description="Defina como mensalidades, pacotes e reposicoes funcionam no setup inicial. Ajustes finos podem ficar para depois do go-live."
        title="Consumo de aulas"
      />

      <Panel className="tcrm-setup-consumption-workspace__models" compact>
        <h3>Modelo principal</h3>
        <SetupContentGrid>
          {models.map((item) => (
            <SetupChoiceCard
              description={item.description}
              key={item.id}
              onSelect={() => onModelSelect?.(item.id)}
              selected={model === item.id}
              title={item.title}
            />
          ))}
        </SetupContentGrid>
      </Panel>

      <div className="tcrm-setup-consumption-workspace__settings">
        <Panel compact>
          <h3>Pacote base</h3>
          <div className="tcrm-setup-consumption-workspace__field-row">
            <Input defaultValue="8" fieldSize="sm" label="Aulas por mes" type="number" />
            <Select fieldSize="sm" label="Validade" options={[{ value: "monthly", label: "Mensal" }]} value="monthly" />
          </div>
          <Toggle compact defaultPressed label="Renova automaticamente" onPressedChange={(checked) => onSettingChange?.("auto-renew", checked)} />
          <Toggle compact defaultPressed label="Saldo expira no fim do ciclo" onPressedChange={(checked) => onSettingChange?.("balance-expires", checked)} />
        </Panel>
        <Panel compact>
          <h3>Reposicoes</h3>
          <Toggle compact defaultPressed label="Permitir reposicao" onPressedChange={(checked) => onSettingChange?.("allow-replacement", checked)} />
          <Input defaultValue="7" fieldSize="sm" label="Prazo para usar reposicao" trailingText="dias" />
          <Select fieldSize="sm" label="Aviso minimo para gerar reposicao" options={[{ value: "12h", label: "12h" }]} value="12h" />
          <Toggle compact defaultPressed label="Reposicao consome vaga da turma" onPressedChange={(checked) => onSettingChange?.("replacement-uses-slot", checked)} />
        </Panel>
        <Panel compact>
          <h3>Excecoes simples</h3>
          <List divided>
            <ListItem action={<Chip tone="warning">Pode ficar para depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Feriados" />
            <ListItem action={<Chip tone="warning">Revisar depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Contratos antigos" />
            <ListItem action={<Chip tone="neutral">Nao gera reposicao</Chip>} leading={<Icon name="x" />} title="Faltas sem aviso" />
          </List>
        </Panel>
        <InlineAlert className="tcrm-setup-consumption-workspace__validation" tone="info" title="Validacao da configuracao">
          Esta regra base pode ser salva como rascunho. Feriados e contratos antigos podem ficar como pendencia segura.
        </InlineAlert>
      </div>

      <footer className="tcrm-setup-consumption-workspace__footer">
        <div>
          <h3>Acoes da etapa</h3>
          <ButtonGroup>
            <Button leadingIcon="check" onClick={() => onAction?.("save")} size="sm" variant="primary">Salvar rascunho</Button>
            <Button onClick={() => onAction?.("continue")} size="sm" trailingIcon="arrowRight" variant="secondary">Continuar</Button>
            <Button leadingIcon="clock" onClick={() => onAction?.("later")} size="sm" variant="secondary">Configurar depois</Button>
          </ButtonGroup>
        </div>
        <Panel compact>
          <InlineGroup><Icon name="barChart" size="24px" /><strong>Previa de impacto entra aqui</strong></InlineGroup>
          <p>Espaco reservado para a previa de impacto apos salvar as configuracoes.</p>
        </Panel>
      </footer>
    </SetupPagePanel>
  );
}

export interface SetupStudioWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  activeDays?: string[];
  scheduleMode?: "continuous" | "break";
  header?: React.ReactNode;
  details?: React.ReactNode;
  footer?: React.ReactNode;
  onActiveDaysChange?: (days: string[]) => void;
  onScheduleModeChange?: (mode: "continuous" | "break") => void;
  onAdjustDay?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupStudioWorkspace({
  activeDays = ["Seg", "Ter", "Qua", "Qui", "Sex"],
  scheduleMode = "continuous",
  header,
  details,
  footer,
  onActiveDaysChange,
  onScheduleModeChange,
  onAdjustDay,
  onAction,
  className,
  ...props
}: SetupStudioWorkspaceProps) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const toggleDay = (day: string) => {
    const next = activeDays.includes(day) ? activeDays.filter((item) => item !== day) : [...activeDays, day];
    onActiveDaysChange?.(next);
  };

  return (
    <SetupPagePanel className={cn("tcrm-setup-studio-workspace", className)} data-component="SetupStudioWorkspace" {...props}>
      {header ?? <SetupBlockHeader title="Studio" />}
      <div className="tcrm-setup-studio-workspace__grid">
        <Panel className="tcrm-setup-studio-workspace__form" compact>
          {details}
          <section>
            <h3>1. Dias de funcionamento</h3>
            <p>Em quais dias o studio funciona?</p>
            <div className="tcrm-setup-studio-workspace__days">
              {days.map((day) => (
                <Checkbox checked={activeDays.includes(day)} key={day} label={day} onChange={() => toggleDay(day)} />
              ))}
            </div>
          </section>
          <section>
            <h3>2. Horario geral</h3>
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="07:00" fieldSize="sm" label="Abre as" />
              <TimeInput defaultValue="21:00" fieldSize="sm" label="Fecha as" />
            </div>
            <p>O studio fecha em algum intervalo do dia?</p>
            <SegmentedControl
              label="Intervalo do studio"
              onChange={(value) => onScheduleModeChange?.(value as "continuous" | "break")}
              options={[{ value: "continuous", label: "Funciona direto" }, { value: "break", label: "Tem pausa" }]}
              value={scheduleMode}
            />
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="12:00" fieldSize="sm" label="Pausa comeca" />
              <TimeInput defaultValue="13:00" fieldSize="sm" label="Pausa termina" />
            </div>
          </section>
        </Panel>
        <Panel className="tcrm-setup-studio-workspace__preview" compact>
          <WeeklyHoursGrid onAdjustDay={onAdjustDay} />
        </Panel>
      </div>
      {footer ?? <ButtonGroup className="tcrm-setup-studio-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export interface SetupTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  ownerAvatarSrc?: string;
  onAddPerson?: () => void;
  onInviteOpen?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteEdit?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteRemove?: (invite: InviteRowData, state: InviteRowState) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupTeamWorkspace({
  ownerAvatarSrc,
  onAddPerson,
  onInviteOpen,
  onInviteEdit,
  onInviteRemove,
  onAction,
  className,
  ...props
}: SetupTeamWorkspaceProps) {
  const invites: Array<{ state: InviteRowState; invite?: Partial<InviteRowData> }> = [
    { state: "prepared" },
    { state: "prepared", invite: { id: "carla-souza", initials: "CS", name: "Carla Souza", role: "Recepcao", email: "carla@studio.com", phone: "(11) 97777-2222" } },
    { state: "incomplete" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-team-workspace", className)} data-component="SetupTeamWorkspace" {...props}>
      <SetupBlockHeader
        description="Adicione as pessoas que vao usar o Taliya no comeco. Os convites serao enviados automaticamente quando o setup for publicado."
        step={2}
        title="Equipe"
      />
      <Panel className="tcrm-setup-team-workspace__content" compact>
        <section>
          <h3>1. Dono do studio</h3>
          <RoleCard avatarSrc={ownerAvatarSrc} selected />
        </section>
        <section className="tcrm-setup-team-workspace__add-person">
          <h3>2. Adicionar pessoa</h3>
          <div className="tcrm-setup-team-workspace__fields">
            <Input defaultValue="Ana Martins" fieldSize="sm" label="Nome" />
            <Input defaultValue="ana@studio.com" fieldSize="sm" label="E-mail" type="email" />
            <Input defaultValue="(11) 98888-1111" fieldSize="sm" label="WhatsApp" />
            <Select fieldSize="sm" label="Papel" options={[{ value: "teacher", label: "Professor" }, { value: "reception", label: "Recepcao" }, { value: "finance", label: "Financeiro" }]} value="teacher" />
          </div>
          <Button onClick={onAddPerson} variant="secondary">Adicionar pessoa</Button>
        </section>
        <section>
          <h3>3. Equipe preparada</h3>
          <List>
            {invites.map((item) => (
              <InviteRow
                invite={item.invite}
                key={item.invite?.id ?? item.state}
                onEdit={onInviteEdit}
                onOpen={onInviteOpen}
                onRemove={onInviteRemove}
                state={item.state}
              />
            ))}
          </List>
          <InlineAlert tone="info">Os convites ficam preparados agora e serao enviados automaticamente quando o setup inicial for publicado.</InlineAlert>
        </section>
      </Panel>
      <ButtonGroup className="tcrm-setup-team-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar equipe depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupWhatsAppState = "business" | "personal" | "unknown" | "missing";

export interface SetupChannelsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  whatsAppState?: SetupWhatsAppState;
  connectionStatus?: "connected" | "pending" | "disconnected";
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onWhatsAppStateChange?: (state: SetupWhatsAppState) => void;
  onConnectWhatsApp?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupChannelsWorkspace({
  whatsAppState = "business",
  connectionStatus = "pending",
  header,
  footer,
  onWhatsAppStateChange,
  onConnectWhatsApp,
  onAction,
  className,
  ...props
}: SetupChannelsWorkspaceProps) {
  const connectionLabel = connectionStatus === "connected" ? "Conectado" : connectionStatus === "disconnected" ? "Desconectado" : "Pendente de conexao oficial";
  const connectionTone: ComponentTone = connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning";
  const whatsAppOptions: Array<{ id: SetupWhatsAppState; title: string }> = [
    { id: "business", title: "Sim, ja esta no WhatsApp Business" },
    { id: "personal", title: "Ainda esta no WhatsApp pessoal" },
    { id: "unknown", title: "Nao sei" },
    { id: "missing", title: "Ainda nao tenho numero do studio" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-channels-workspace", className)} data-component="SetupChannelsWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Informe os canais oficiais do studio. O WhatsApp Business podera ser conectado oficialmente agora ou ficar como pendencia antes de ativar agentes e mensagens."
        step={3}
        title="Canais"
      />}
      <div className="tcrm-setup-channels-workspace__grid">
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__whatsapp" compact>
            <h3>1. WhatsApp Business</h3>
            <Input defaultValue="(11) 99999-0000" fieldSize="sm" label="WhatsApp Business do studio" />
            <p>Esse numero esta no WhatsApp Business?</p>
            <div className="tcrm-setup-channels-workspace__choices">
              {whatsAppOptions.map((option) => (
                <SetupChoiceCard
                  description=""
                  key={option.id}
                  onSelect={() => onWhatsAppStateChange?.(option.id)}
                  selected={whatsAppState === option.id}
                  title={option.title}
                />
              ))}
            </div>
            <InlineGroup className="tcrm-setup-channels-workspace__connect" justify="between">
              <Chip icon={connectionStatus === "connected" ? "checkCircle" : "link"} tone={connectionTone}>{connectionLabel}</Chip>
              <Button leadingIcon="link" onClick={onConnectWhatsApp} variant="secondary">{connectionStatus === "connected" ? "Testar conexao" : "Conectar WhatsApp Business"}</Button>
            </InlineGroup>
            <p>Voce continuara usando o WhatsApp Business no celular. A conexao oficial libera atendimento pelo CRM e agentes quando tudo for publicado.</p>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__public" compact>
            <h3>3. Canais publicos opcionais</h3>
            <p>Adicione redes sociais se quiser. Elas ajudam a registrar onde o studio aparece, mas nao ativam automacoes neste setup inicial.</p>
            <div className="tcrm-setup-channels-workspace__public-fields">
              <Input defaultValue="@studioleticia" fieldSize="sm" label="Instagram" />
              <Input defaultValue="facebook.com/studioleticia" fieldSize="sm" label="Facebook" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="TikTok" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="X" />
              <Input defaultValue="studioleticia.com.br" fieldSize="sm" label="Site" />
            </div>
          </Panel>
        </div>
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__email" compact>
            <h3>2. E-mail do studio</h3>
            <Input defaultValue="contato@studioleticia.com" fieldSize="sm" label="E-mail do studio" type="email" />
            <p>Usado para avisos, convites e comunicacao administrativa. Pode ser o e-mail do dono no comeco.</p>
            <Chip icon="checkCircle" tone="success">Pronto</Chip>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__status" compact>
            <h3>4. Status dos canais</h3>
            <List divided>
              <ListItem action={<StatusDot label={connectionLabel} status={connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning"} />} title="WhatsApp Business" />
              <ListItem action={<StatusDot label="Pronto" status="success" />} title="E-mail" />
              <ListItem action={<StatusDot label="4 adicionados" status="info" />} title="Canais publicos" />
            </List>
            <InlineAlert tone="info">O CRM pode seguir. Mensagens e agentes pelo WhatsApp so serao ativados apos a conexao oficial.</InlineAlert>
          </Panel>
        </div>
      </div>
      {footer ?? <ButtonGroup className="tcrm-setup-channels-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar canais depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export type SetupPlanId = "weekly" | "pack" | "trial";
export type SetupPlanField = "name" | "type" | "value" | "quantity" | "recurrence" | "validity" | "replacement" | "replacementDeadline" | "replacementNotice";

export const setupPlansDefaultFieldValues: Record<SetupPlanField, string> = {
  name: "Pacote 8 aulas",
  type: "pack",
  value: "420,00",
  quantity: "8",
  recurrence: "none",
  validity: "30",
  replacement: "yes",
  replacementDeadline: "7",
  replacementNotice: "12"
};

export interface SetupPlansWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedPlanId?: SetupPlanId;
  fieldValues?: Partial<Record<SetupPlanField, string>>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  planStates?: Partial<Record<SetupPlanId, { label: string; tone: ComponentTone; studentsUsing?: number }>>;
  destructiveAction?: "remove" | "deactivate";
  onPlanSelect?: (planId: SetupPlanId) => void;
  onNewPlan?: () => void;
  onPlanAction?: (planId: SetupPlanId, action: "edit" | "duplicate" | "remove" | "deactivate") => void;
  onFieldChange?: (field: SetupPlanField, value: string) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPlansWorkspace({
  selectedPlanId = "pack",
  fieldValues = {},
  header,
  footer,
  planStates,
  destructiveAction = "remove",
  onPlanSelect,
  onNewPlan,
  onPlanAction,
  onFieldChange,
  onAction,
  className,
  ...props
}: SetupPlansWorkspaceProps) {
  const fieldValue = (field: SetupPlanField) => fieldValues[field] ?? setupPlansDefaultFieldValues[field];
  const plans: Array<{ id: SetupPlanId; title: string; type: string; value: string; replacement: string; tone: ComponentTone }> = [
    { id: "weekly", title: "Pilates 2x por semana", type: "Mensalidade por frequencia semanal", value: "R$ 360/mes · 2x por semana", replacement: "Permite reposicao", tone: "success" },
    { id: "pack", title: "Pacote 8 aulas", type: "Pacote de aulas", value: "R$ 420 · 8 aulas", replacement: "Permite reposicao", tone: "success" },
    { id: "trial", title: "Aula experimental", type: "Experimental/Avaliacao", value: "R$ 0 · 1 aula", replacement: "Nao gera reposicao", tone: "danger" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-plans-workspace", className)} data-component="SetupPlansWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Cadastre os planos que o studio oferece aos alunos. Voce pode comecar pelos principais e ajustar detalhes depois."
        step={4}
        title="Planos"
      />}
      <div className="tcrm-setup-plans-workspace__grid">
        <Panel className="tcrm-setup-plans-workspace__list" compact>
          <InlineGroup justify="between"><h3>Planos criados</h3><Button leadingIcon="plus" onClick={onNewPlan} size="sm" variant="secondary">Novo plano</Button></InlineGroup>
          {plans.map((plan) => (
            <Panel className={cn("tcrm-setup-plans-workspace__plan", selectedPlanId === plan.id && "tcrm-setup-plans-workspace__plan--selected")} compact key={plan.id}>
              <Button className="tcrm-setup-plans-workspace__plan-select" onClick={() => onPlanSelect?.(plan.id)} variant="ghost">
                <strong>{plan.title}</strong><span>{plan.type}</span><b>{plan.value}</b><Chip icon={plan.tone === "success" ? "checkCircle" : "x"} tone={plan.tone}>{plan.replacement}</Chip>
                {planStates?.[plan.id] ? <Chip tone={planStates[plan.id]?.tone}>{planStates[plan.id]?.label}</Chip> : null}
                {planStates?.[plan.id]?.studentsUsing !== undefined ? <span>{planStates[plan.id]?.studentsUsing} alunos usando</span> : null}
              </Button>
              <ButtonGroup>
                <Button leadingIcon="edit" onClick={() => onPlanAction?.(plan.id, "edit")} size="sm" variant="ghost">Editar</Button>
                <Button leadingIcon="copy" onClick={() => onPlanAction?.(plan.id, "duplicate")} size="sm" variant="ghost">Duplicar</Button>
                <Button leadingIcon={destructiveAction === "deactivate" ? "x" : "trash"} onClick={() => onPlanAction?.(plan.id, destructiveAction)} size="sm" tone="danger" variant="ghost">{destructiveAction === "deactivate" ? "Inativar" : "Remover"}</Button>
              </ButtonGroup>
            </Panel>
          ))}
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__editor" compact>
          <InlineGroup justify="between"><div><h3>Editar plano selecionado</h3><p>Voce pode ajustar este plano depois do go-live.</p></div><Chip>Rascunho</Chip></InlineGroup>
          <Input fieldSize="sm" label="1. Nome do plano" onChange={(event) => onFieldChange?.("name", event.currentTarget.value)} value={fieldValue("name")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>2. Tipo do plano</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--type" compact label="2. Tipo do plano" onChange={(value) => onFieldChange?.("type", value)} options={[{ value: "weekly", label: "Mensalidade por frequencia semanal" }, { value: "quantity", label: "Mensalidade por quantidade mensal" }, { value: "pack", label: "Pacote de aulas" }, { value: "single", label: "Aula avulsa" }, { value: "trial", label: "Experimental/Avaliacao" }, { value: "other", label: "Outro" }]} value={fieldValue("type")} /></div>
          <Input fieldSize="sm" label="3. Valor" leadingText="R$" onChange={(event) => onFieldChange?.("value", event.currentTarget.value)} value={fieldValue("value")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>4. Quantidade de aulas</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--quantity" compact label="4. Quantidade de aulas" onChange={(value) => onFieldChange?.("quantity", value)} options={[{ value: "1", label: "1 aula" }, { value: "5", label: "5 aulas" }, { value: "8", label: "8 aulas" }, { value: "10", label: "10 aulas" }, { value: "12", label: "12 aulas" }, { value: "20", label: "20 aulas" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("quantity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>5. Recorrencia</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="5. Recorrencia" onChange={(value) => onFieldChange?.("recurrence", value)} options={[{ value: "none", label: "Sem recorrencia" }, { value: "renew", label: "Renova automaticamente" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("recurrence")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>6. Validade</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--validity" compact label="6. Validade" onChange={(value) => onFieldChange?.("validity", value)} options={[{ value: "30", label: "30 dias" }, { value: "60", label: "60 dias" }, { value: "90", label: "90 dias" }, { value: "none", label: "Sem validade" }, { value: "custom", label: "Personalizado" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("validity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>7. Reposicao</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="7. Reposicao" onChange={(value) => onFieldChange?.("replacement", value)} options={[{ value: "yes", label: "Sim" }, { value: "no", label: "Nao" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("replacement")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Prazo para usar a reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--deadline" compact label="Prazo para usar a reposicao" onChange={(value) => onFieldChange?.("replacementDeadline", value)} options={[{ value: "7", label: "7 dias" }, { value: "15", label: "15 dias" }, { value: "30", label: "30 dias" }, { value: "cycle", label: "Ate o fim do ciclo" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementDeadline")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Aviso minimo para gerar reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--notice" compact label="Aviso minimo para gerar reposicao" onChange={(value) => onFieldChange?.("replacementNotice", value)} options={[{ value: "none", label: "Sem aviso minimo" }, { value: "2", label: "2h antes" }, { value: "6", label: "6h antes" }, { value: "12", label: "12h antes" }, { value: "24", label: "24h antes" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementNotice")} /></div>
          <InlineAlert tone="info">A aula prevista consome saldo normalmente. Quando a regra permitir, o sistema gera uma reposicao para compensar a falta.</InlineAlert>
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__understanding" compact>
          <h3>Como o Taliya vai entender este plano</h3>
          <p>Este e um pacote de 8 aulas por R$ 420. O aluno tem 8 aulas no total, independentemente do tamanho do mes. Se esse aluno tiver horario fixo depois, cada aula prevista continua consumindo saldo do pacote. Reposicoes podem ser geradas quando o aluno avisa com 12h de antecedencia e ficam validas por 7 dias.</p>
          <List divided>
            <ListItem action="8 aulas" title="Saldo" />
            <ListItem action="30 dias" title="Validade" />
            <ListItem action="Sim, com aviso de 12h" title="Reposicao" />
            <ListItem action="Definido depois" title="Horario fixo" />
          </List>
        </Panel>
      </div>
      {footer ?? <ButtonGroup className="tcrm-setup-plans-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar planos depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export type SetupPaymentMethod = "pix" | "cash" | "card";

export interface SetupPaymentWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedMethods?: SetupPaymentMethod[];
  onSelectedMethodsChange?: (methods: SetupPaymentMethod[]) => void;
  onLearnMore?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPaymentWorkspace({
  selectedMethods = ["pix", "cash", "card"],
  onSelectedMethodsChange,
  onLearnMore,
  onAction,
  className,
  ...props
}: SetupPaymentWorkspaceProps) {
  const methods: Array<{ id: SetupPaymentMethod; title: string; description: string; icon: IconName }> = [
    { id: "pix", title: "Pix", description: "Pagamento por Pix", icon: "banknote" },
    { id: "cash", title: "Dinheiro", description: "Recebido presencialmente", icon: "banknote" },
    { id: "card", title: "Cartao", description: "Cartao presencial", icon: "creditCard" }
  ];
  const toggleMethod = (method: SetupPaymentMethod) => {
    const next = selectedMethods.includes(method) ? selectedMethods.filter((item) => item !== method) : [...selectedMethods, method];
    onSelectedMethodsChange?.(next);
  };
  const flow = [
    { icon: "document" as IconName, label: "Plano gera cobranca" },
    { icon: "user" as IconName, label: "Aluno paga por um meio aceito" },
    { icon: "users" as IconName, label: "Equipe registra a baixa no Taliya" },
    { icon: "checkCircle" as IconName, label: "Cobranca fica paga" },
    { icon: "unlock" as IconName, label: "Aulas ou saldo sao liberados" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-payment-workspace", className)} data-component="SetupPaymentWorkspace" {...props}>
      <SetupBlockHeader description="Defina os meios aceitos no inicio e veja como o Taliya vai registrar pagamentos na operacao." step={5} totalSteps={9} title="Pagamento" />
      <Panel className="tcrm-setup-payment-workspace__methods" compact>
        <h3>1. Meios de pagamento</h3>
        <p>Selecione os meios que o studio aceita hoje. Os detalhes tecnicos e automacoes ficam para depois.</p>
        <div className="tcrm-setup-payment-workspace__method-grid">
          {methods.map((method) => (
            <SetupChoiceCard
              description={method.description}
              icon={method.icon}
              key={method.id}
              onSelect={() => toggleMethod(method.id)}
              selected={selectedMethods.includes(method.id)}
              title={method.title}
            />
          ))}
        </div>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__flow" compact>
        <h3>2. Exemplo da operacao</h3>
        <div className="tcrm-setup-payment-workspace__flow-steps">
          {flow.map((item, index) => (
            <React.Fragment key={item.label}>
              <div><Chip>{index + 1}</Chip><Icon name={item.icon} size="28px" /><strong>{item.label}</strong></div>
              {index < flow.length - 1 ? <Icon name="arrowRight" /> : null}
            </React.Fragment>
          ))}
        </div>
        <p><Icon name="info" /> Funciona para Pix, dinheiro ou cartao. No inicio, a confirmacao e feita pela equipe dentro do Taliya.</p>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__future" compact>
        <InlineGroup justify="between"><div><h3>3. Pagamentos Taliya</h3><p>Depois que o studio estiver operando, voce podera automatizar cobrancas e confirmacoes sem refazer este setup.</p></div><Chip>Pos-go-live</Chip></InlineGroup>
        <div className="tcrm-setup-payment-workspace__future-grid">
          <IntegrationStatusRow description="Identifica pagamentos e baixa cobrancas" provider="pix" showDivider={false} state="connected" title="Pix automatico" />
          <IntegrationStatusRow description="Permite cobranca digital pelo Taliya" provider="card" showDivider={false} state="connected" title="Cartao online" />
          <IntegrationStatusRow description="Cobra mensalidades recorrentes" provider="recurrence" showDivider={false} state="connected" title="Recorrencia automatica" />
          <IntegrationStatusRow description="Ajuda a conferir pagamentos recebidos" provider="reconciliation" showDivider={false} state="connected" title="Conciliacao" />
        </div>
        <InlineGroup justify="between"><InlineAlert tone="info">Agora: registro e baixa manual no Taliya. Depois: automacao financeira em Pagamentos Taliya.</InlineAlert><Button onClick={onLearnMore} variant="secondary">Entender Pagamentos Taliya</Button></InlineGroup>
      </Panel>
      <ButtonGroup className="tcrm-setup-payment-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar pagamento depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupStudentSource = "files" | "photo" | "paste" | "manual";

export interface SetupStudentsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupStudentSource) => void;
  onStudentSelect?: (studentId: string) => void;
  onStudentAction?: (studentId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupStudentsWorkspace({ onSourceSelect, onStudentSelect, onStudentAction, onAction, className, ...props }: SetupStudentsWorkspaceProps) {
  const sources: Array<{ id: SetupStudentSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, ficha ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Nomes e telefones", icon: "menu" },
    { id: "manual", title: "Adicionar manualmente", description: "Um aluno por vez", icon: "users" }
  ];
  const students = [
    { id: "ana", name: "Ana Martins", initials: "AM", phone: "(11) 98888-1111", plan: "Pacote 8 aulas", origin: "planilha", status: "Pronto", tone: "success" as ComponentTone },
    { id: "carla", name: "Carla Souza", initials: "CS", phone: "(11) 97777-2222", plan: "Pilates 2x por semana", origin: "manual", status: "Pronto", tone: "success" as ComponentTone },
    { id: "roberto", name: "Roberto Lima", initials: "RL", phone: "Falta telefone", plan: "Plano nao informado", origin: "foto", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "mariana", name: "Mariana Alves", initials: "MA", phone: "Possivel duplicidade", plan: "Pacote 8 aulas", origin: "lista", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "beatriz", name: "Beatriz Nunes", initials: "BN", phone: "(11) 96666-3333", plan: "Sem plano ainda", origin: "planilha", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-students-workspace", className)} data-component="SetupStudentsWorkspace" {...props}>
      <SetupBlockHeader description="Adicione os alunos ativos do studio. Voce pode misturar planilhas, fotos, listas e cadastros manuais." step={6} title="Alunos" totalSteps={9} />
      <div className="tcrm-setup-students-workspace__summary-grid">
        <Panel compact><h3>Adicionar alunos</h3><div className="tcrm-setup-students-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="42 alunos encontrados · 3 pendencias" title="alunos_maio.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="8 alunos encontrados · aguardando revisao" title="foto_caderno_01.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="5 alunos encontrados" title="lista colada" />
          <ListItem action={<Chip>Rascunho</Chip>} leading={<Icon name="users" />} meta="2 alunos adicionados" title="manual" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo da base</h3><List>
          <ListItem leading={<Icon name="clipboard" tone="info" />} title="57 alunos preparados" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="49 prontos" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="6 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="2 possiveis duplicidades" />
        </List><p>Obrigatorio: nome + WhatsApp/telefone.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Alunos preparados"
        caption="Para publicar, cada aluno precisa ter nome e WhatsApp/telefone."
        columns={[
          { key: "name", header: "Aluno", render: (row) => <InlineGroup><Avatar name={row.name} size="xs" /><strong>{row.name}</strong></InlineGroup>, width: "18%" },
          { key: "phone", header: "WhatsApp", width: "20%" },
          { key: "plan", header: "Plano", width: "24%" },
          { key: "origin", header: "Origem", render: (row) => <Chip>{row.origin}</Chip>, width: "14%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Alunos preparados</h3><Chip tone="info">Todos entram como Ativo</Chip></InlineGroup>}
        onRowSelect={(row) => onStudentSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onStudentAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onStudentAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onStudentAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={students}
      />
      <ButtonGroup className="tcrm-setup-students-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar alunos depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupClassSource = "files" | "photo" | "paste" | "manual" | "later";

export interface SetupClassesWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupClassSource) => void;
  onClassSelect?: (classId: string) => void;
  onClassAction?: (classId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupClassesWorkspace({ onSourceSelect, onClassSelect, onClassAction, onAction, className, ...props }: SetupClassesWorkspaceProps) {
  const sources: Array<{ id: SetupClassSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, grade ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Dias e horarios", icon: "menu" },
    { id: "manual", title: "Criar manualmente", description: "Uma turma por vez", icon: "users" },
    { id: "later", title: "Nao tenho turmas prontas", description: "Montar a partir da agenda no proximo bloco", icon: "clock" }
  ];
  const classes = [
    { id: "ter-qui-18", name: "Ter/Qui 18h", days: "Ter, Qui", schedule: "18:00-19:00", capacity: "6 vagas", teacher: "Ana Martins", students: "5 alunos", status: "Pronto", tone: "success" as ComponentTone },
    { id: "seg-qua-07", name: "Seg/Qua 07h", days: "Seg, Qua", schedule: "07:00-08:00", capacity: "6 vagas", teacher: "Sem professor", students: "4 alunos", status: "Pode seguir", tone: "info" as ComponentTone },
    { id: "sexta-09", name: "Sexta 09h", days: "Sex", schedule: "09:30-10:00", capacity: "Falta capacidade", teacher: "Carla Souza", students: "2 alunos", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", name: "Ter/Qui 19h", days: "Ter, Qui", schedule: "19:00-20:00", capacity: "6 vagas", teacher: "Ana Martins", students: "Aluno nao encontrado", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", name: "Sabado 08h", days: "Sab", schedule: "08:00-09:00", capacity: "4 vagas", teacher: "Sem professor", students: "0 alunos", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-classes-workspace", className)} data-component="SetupClassesWorkspace" {...props}>
      <SetupBlockHeader description="Organize horarios fixos recorrentes, capacidade e vinculos simples com alunos." step={7} title="Turmas" totalSteps={9} />
      <div className="tcrm-setup-classes-workspace__summary-grid">
        <Panel compact><h3>Adicionar turmas</h3><div className="tcrm-setup-classes-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="8 turmas encontradas · 2 pendencias" title="grade_turmas.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="3 turmas encontradas" title="foto_grade_horarios.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="3 turmas encontradas" title="lista colada" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo das turmas</h3><List>
          <ListItem leading={<Icon name="users" tone="info" />} title="10 turmas preparadas" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="8 prontas" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="2 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="34 alunos vinculados" />
        </List><p>A agenda sera montada no proximo bloco.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Turmas preparadas"
        caption="Para publicar uma turma, informe dias, horario e capacidade."
        columns={[
          { key: "name", header: "Turma", width: "14%" }, { key: "days", header: "Dias", width: "12%" }, { key: "schedule", header: "Horario", width: "14%" },
          { key: "capacity", header: "Capacidade", width: "14%" }, { key: "teacher", header: "Professor", width: "16%" }, { key: "students", header: "Alunos", width: "16%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Turmas preparadas</h3><Chip tone="info">Agenda sera montada depois</Chip></InlineGroup>}
        onRowSelect={(row) => onClassSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onClassAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onClassAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onClassAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={classes}
      />
      <ButtonGroup className="tcrm-setup-classes-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar turmas depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export interface SetupAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedClassId?: string;
  onClassSelect?: (classId: string) => void;
  onSlotSelect?: (slot: WeeklyHoursGridSlot) => void;
  onBackToClasses?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupAgendaWorkspace({ selectedClassId = "ter-qui-18", onClassSelect, onSlotSelect, onBackToClasses, onAction, className, ...props }: SetupAgendaWorkspaceProps) {
  const classControls = [
    { id: "ter-qui-18", title: "Ter/Qui 18h", meta: "2 aulas geradas · Ter e Qui", detail: "5 alunos · Pronto", tone: "info" as ComponentTone },
    { id: "seg-qua-07", title: "Seg/Qua 07h", meta: "2 aulas geradas · Seg e Qua", detail: "4 alunos · Pronto", tone: "success" as ComponentTone },
    { id: "sexta-09", title: "Sexta 09h", meta: "1 aula gerada · Sex", detail: "Falta capacidade · Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", title: "Sabado 08h", meta: "1 aula gerada · Sab", detail: "Fora da janela · Aviso", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", title: "Ter/Qui 19h", meta: "2 aulas geradas · Ter e Qui", detail: "Aluno pendente · Revisar", tone: "warning" as ComponentTone }
  ];
  const slots: WeeklyHoursGridSlot[] = [
    { id: "Seg-07", day: "Seg", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Qua-07", day: "Qua", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Sab-08", day: "Sab", start: "08:00", end: "09:00", label: "Sabado 08h", meta: "Fora da janela", tone: "warning" },
    { id: "Sex-09", day: "Sex", start: "09:00", end: "10:00", label: "Sexta 09h", meta: "Revisar capacidade", tone: "warning" },
    { id: "Ter-18", day: "Ter", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Qui-18", day: "Qui", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Ter-19", day: "Ter", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" },
    { id: "Qui-19", day: "Qui", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-agenda-workspace", className)} data-component="SetupAgendaWorkspace" {...props}>
      <SetupBlockHeader description="Revise a semana base gerada a partir das turmas antes de publicar." step={8} title="Agenda" totalSteps={9} />
      <div className="tcrm-setup-agenda-workspace__summary">
        <Panel compact><Icon name="calendar" tone="success" /><h3>Agenda gerada</h3><strong>24 aulas semanais</strong><span>10 turmas usadas</span><p>Criada a partir das turmas preparadas.</p></Panel>
        <Panel compact><Icon name="barChart" tone="success" /><h3>Cobertura</h3><strong>6 dias com aulas</strong><span>4 horarios principais</span><p>Dentro da janela de funcionamento.</p></Panel>
        <Panel compact><Icon name="alert" tone="warning" /><h3>Revisao</h3><strong>7 turmas prontas</strong><span>3 precisam atencao</span><p>Pendencias aparecem na semana e no controle.</p></Panel>
      </div>
      <div className="tcrm-setup-agenda-workspace__body">
        <Panel className="tcrm-setup-agenda-workspace__control" compact><h3>Controle da semana</h3><p>Veja como cada turma apareceu na agenda.</p><InlineGroup><Chip tone="info">Todas</Chip><Chip tone="warning">Revisar</Chip><Chip tone="warning">Avisos</Chip></InlineGroup><List>
          {classControls.map((item) => <ListItem action={<Icon name="chevronRight" />} key={item.id} meta={<><span>{item.meta}</span><small>{item.detail}</small></>} onClick={() => onClassSelect?.(item.id)} selected={selectedClassId === item.id} title={item.title} warning={item.tone === "warning"} />)}
        </List></Panel>
        <Panel className="tcrm-setup-agenda-workspace__calendar" compact><InlineGroup><h3>Agenda semanal completa</h3><Chip tone="info">Previa antes da publicacao</Chip></InlineGroup><WeeklyHoursGrid axis={["07h", "08h", "09h", "12h", "18h", "19h"]} days={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]} onSlotClick={onSlotSelect} slots={slots} variant="schedule" /><InlineGroup className="tcrm-setup-agenda-workspace__legend"><span><StatusDot status="success" />Pronto</span><span><StatusDot status="info" />Selecionado</span><span><StatusDot status="warning" />Revisar</span><span><StatusDot status="paused" />Aviso</span></InlineGroup></Panel>
      </div>
      <ButtonGroup className="tcrm-setup-agenda-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button leadingIcon="arrowLeft" onClick={onBackToClasses} variant="secondary">Voltar para turmas</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export interface SetupContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  density?: React.ComponentProps<typeof DashboardGrid>["density"];
}

export function SetupContentGrid({
  children,
  className,
  columns = 3,
  density = "default",
  ...props
}: SetupContentGridProps) {
  return (
    <DashboardGrid
      className={cn("tcrm-setup-content-grid", className)}
      columns={columns}
      data-component="SetupContentGrid"
      density={density}
      {...props}
    >
      {children}
    </DashboardGrid>
  );
}

export interface SetupPageProps extends Omit<SetupShellProps, "step"> {
  step: number;
  frameVariant?: "default" | "guided" | "guided-block" | "guided-main" | "guided-wide" | "guided-review" | "shell-global";
}

export function SetupPage({ step, className, children, frameVariant = "default", layout = "guided", progress, ...props }: SetupPageProps) {
  return (
    <div className={cn("tcrm-setup-page", `tcrm-setup-page--${layout}`, `tcrm-setup-page--frame-${frameVariant}`)}>
      <SetupShell
        className={cn("tcrm-setup-page__shell", className)}
        layout={layout}
        progress={progress ?? Math.min(96, step * 11)}
        step={step}
        {...props}
      >
        {children}
      </SetupShell>
    </div>
  );
}

export function SetupPagePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-page-panel", className)} {...props} />;
}

export function SetupWelcomeMain({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-welcome-main", className)} {...props} />;
}

export interface SetupWelcomeWorkspaceProps extends SetupWelcomeProps {}

export function SetupWelcomeWorkspace(props: SetupWelcomeWorkspaceProps) {
  return (
    <SetupWelcomeMain className="tcrm-setup-welcome-workspace" data-component="SetupWelcomeWorkspace">
      <SetupWelcome {...props} />
    </SetupWelcomeMain>
  );
}

export type SetupImportSourceCardState = "pending" | "selected" | "imported" | "error";

export interface SetupImportSourceCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: SetupImportSourceCardState;
  selected?: boolean;
  icon?: IconName;
  onSelect?: () => void;
}

const setupImportSourceStatusIconByState: Record<Exclude<SetupImportSourceCardState, "pending">, IconName> = {
  selected: "check",
  imported: "check",
  error: "alert"
};

export function SetupImportSourceCard({
  title = "Importar arquivos",
  description = "Planilhas ou exportações",
  state = "pending",
  selected = false,
  disabled = false,
  icon = "fileDown",
  onSelect,
  className,
  type = "button",
  ...props
}: SetupImportSourceCardProps) {
  const resolvedState = selected ? "selected" : state;
  const isDisabled = disabled;
  const statusIcon = resolvedState === "pending" ? null : setupImportSourceStatusIconByState[resolvedState];

  return (
    <button
      aria-pressed={resolvedState === "selected"}
      className={cn("tcrm-setup-import-source-card", className)}
      data-component="SetupImportSourceCard"
      data-state={isDisabled ? "disabled" : resolvedState}
      disabled={isDisabled}
      onClick={onSelect}
      type={type}
      {...props}
    >
      <span className="tcrm-setup-import-source-card__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span className="tcrm-setup-import-source-card__body">
        <span className="tcrm-setup-import-source-card__title">{title}</span>
        <span className="tcrm-setup-import-source-card__description">{description}</span>
      </span>
      {statusIcon ? (
        <span className="tcrm-setup-import-source-card__status" aria-hidden="true">
          <Icon name={statusIcon} />
        </span>
      ) : null}
    </button>
  );
}

export type SetupReviewPanelState = "ready" | "pending" | "blocked" | "published";

export interface SetupReviewPanelProps extends Omit<CrmSurfaceProps, "state" | "children" | "title" | "description" | "meta" | "statusLabel" | "icon" | "action" | "selected"> {
  state?: SetupReviewPanelState;
  confirmed?: boolean;
  onBack?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  onResolveBlocking?: () => void;
  onReviewWarnings?: () => void;
  onOpenArea?: (area: string) => void;
  onConfirmChange?: (confirmed: boolean) => void;
}

const setupReviewPublishAreas: Array<{
  id: string;
  title: string;
  description: string;
  icon: IconName;
  status: "ready" | "review";
}> = [
  { id: "studio", title: "Studio", description: "Nome e horários gerais", icon: "home", status: "ready" },
  { id: "equipe", title: "Equipe", description: "Dono confirmado e convites preparados", icon: "user", status: "ready" },
  { id: "canais", title: "Canais", description: "WhatsApp Business, e-mail e canais públicos", icon: "message", status: "ready" },
  { id: "planos", title: "Planos", description: "Planos principais e reposição simples", icon: "tag", status: "ready" },
  { id: "pagamento", title: "Pagamento", description: "Pix, dinheiro e cartão para baixa manual", icon: "creditCard", status: "ready" },
  { id: "alunos", title: "Alunos", description: "57 alunos preparados", icon: "graduation", status: "review" },
  { id: "turmas", title: "Turmas", description: "10 turmas recorrentes", icon: "users", status: "ready" },
  { id: "agenda", title: "Agenda", description: "Semana base gerada", icon: "calendar", status: "review" }
];

const setupReviewFutureItems: Array<{ title: string; description: string; icon: IconName }> = [
  { title: "Pagamentos Taliya", description: "Pix automático, cartão online e recorrência automática", icon: "coins" },
  { title: "Fluxos de agentes", description: "Modos manual, copiloto e autônomo", icon: "slidersRound" },
  { title: "Automações avançadas", description: "Mensagens, aprovações e regras por fluxo", icon: "settings" },
  { title: "Control planes", description: "Cotas, logs, auditoria, incidentes e risco", icon: "shield" }
];

export function SetupReviewPanel({
  state = "ready",
  confirmed = true,
  onBack,
  onSaveDraft,
  onPublish,
  onResolveBlocking,
  onReviewWarnings,
  onOpenArea,
  onConfirmChange,
  className,
  ...props
}: SetupReviewPanelProps) {
  const isBlocked = state === "blocked";
  const isPublished = state === "published";
  const isBusy = state === "pending";

  return (
    <section
      aria-busy={isBusy || undefined}
      className={cn("tcrm-setup-review-panel", className)}
      data-component="SetupReviewPanel"
      data-state={state}
      {...props}
    >
      <header className="tcrm-setup-review-panel__header">
        <h2>Revisão</h2>
        <Chip showDot={false}>Bloco 9 de 9</Chip>
      </header>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--published">
        <h3>1. Publicado agora</h3>
        <p>Estas áreas entram em operação quando o setup inicial for publicado.</p>
        <div className="tcrm-setup-review-panel__publish-grid">
          {setupReviewPublishAreas.map((area) => (
            <button
              className="tcrm-setup-review-card"
              key={area.id}
              onClick={() => onOpenArea?.(area.id)}
              type="button"
            >
              <Icon name={area.icon} />
              <span className="tcrm-setup-review-card__copy">
                <strong>{area.title}</strong>
                <small>{area.description}</small>
              </span>
              <Icon className="tcrm-setup-review-card__chevron" name="chevronRight" />
              <span className={cn("tcrm-setup-review-card__status", `tcrm-setup-review-card__status--${area.status}`)}>
                {area.status === "ready" ? "Pronto" : "Revisar"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--pending">
        <h3>2. Pendências</h3>
        <p>Revise o que bloqueia publicação e o que pode seguir com aviso.</p>
        <div className="tcrm-setup-review-panel__pending-grid">
          <article className="tcrm-setup-review-alert tcrm-setup-review-alert--blocking">
            <Icon name="alertCircle" />
            <div>
              <strong>Bloqueia publicação</strong>
              <ul>
                <li>1 aluno sem nome ou contato</li>
              </ul>
            </div>
            <Button disabled={isBusy} onClick={onResolveBlocking} size="sm" tone="danger" variant="secondary">Resolver</Button>
          </article>
          <article className="tcrm-setup-review-alert tcrm-setup-review-alert--warning">
            <Icon name="alert" />
            <div>
              <strong>Pode publicar com aviso</strong>
              <ul>
                <li>2 alunos sem plano</li>
                <li>1 turma sem professor</li>
                <li>WhatsApp ainda não conectado oficialmente</li>
              </ul>
            </div>
            <Button disabled={isBusy} onClick={onReviewWarnings} size="sm" variant="secondary">Revisar avisos</Button>
          </article>
        </div>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--future">
        <h3>3. Depois do go-live</h3>
        <p>Essas configurações avançadas ficam para depois, nas Configurações do CRM.</p>
        <div className="tcrm-setup-review-panel__future-grid">
          {setupReviewFutureItems.map((item) => (
            <article className="tcrm-setup-review-future-card" key={item.title}>
              <Icon name={item.icon} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </article>
          ))}
        </div>
        <p className="tcrm-setup-review-panel__info"><Icon name="info" /> Esses itens não bloqueiam a publicação do setup inicial.</p>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--safe">
        <h3>4. Publicação segura</h3>
        <p>Nada será publicado sem sua confirmação.</p>
        <div className="tcrm-setup-review-panel__safe-row">
          <span><Icon name="checkCircle" /> Dados principais revisados</span>
          <span><Icon name="checkCircle" /> Pendências críticas verificadas</span>
          <span><Icon name="checkCircle" /> Convites da equipe serão enviados ao publicar</span>
          <span><Icon name="checkCircle" /> Ajustes avançados ficam para depois do go-live</span>
        </div>
        <Checkbox
          checked={confirmed}
          className="tcrm-setup-review-panel__confirm"
          disabled={isBusy || isBlocked || isPublished}
          label="Revisei as informações e entendo o que será publicado agora."
          onChange={(event) => onConfirmChange?.(event.currentTarget.checked)}
        />
      </section>

      <footer className="tcrm-setup-review-panel__footer">
        <Button disabled={isBusy} leadingIcon="arrowLeft" onClick={onBack} variant="secondary">Voltar para agenda</Button>
        <Button disabled={isBusy} leadingIcon="fileText" onClick={onSaveDraft} variant="secondary">Salvar rascunho</Button>
        <Button
          disabled={isBlocked || !confirmed || isPublished}
          leadingIcon="rocket"
          loading={isBusy}
          onClick={onPublish}
          variant="primary"
        >
          {isPublished ? "Setup publicado" : "Publicar setup inicial"}
        </Button>
      </footer>
    </section>
  );
}

export interface SetupReviewWorkspaceProps extends SetupReviewPanelProps {}

export function SetupReviewWorkspace({ className, ...props }: SetupReviewWorkspaceProps) {
  return (
    <SetupPagePanel className="tcrm-setup-review-workspace" data-component="SetupReviewWorkspace">
      <SetupReviewPanel className={className} {...props} />
    </SetupPagePanel>
  );
}

export type SetupAgentChatState = "guide" | "human-help" | "blocked";

export interface SetupAgentChatProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  state?: SetupAgentChatState;
  variant?: "step" | "welcome";
  defaultValue?: string;
  onClose?: () => void;
  onMenu?: () => void;
  onQuickReply?: (itemId: string, item: QuickReplyChipItem) => void;
  onSend?: (value: string) => void;
  onHumanHelp?: () => void;
}

export function SetupAgentChat({
  state = "guide",
  variant = "step",
  defaultValue = "",
  onClose,
  onMenu,
  onQuickReply,
  onSend,
  onHumanHelp,
  className,
  ...props
}: SetupAgentChatProps) {
  const [value, setValue] = React.useState(defaultValue);
  const isBlocked = state === "blocked";
  const isHumanHelp = state === "human-help";
  const isWelcome = variant === "welcome";

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBlocked) return;
    onSend?.(value);
  };

  return (
    <section
      aria-label="Agente de configuração"
      className={cn("tcrm-setup-agent-chat", `tcrm-setup-agent-chat--${state}`, `tcrm-setup-agent-chat--${variant}`, className)}
      data-component="SetupAgentChat"
      data-state={state}
      data-variant={variant}
      {...props}
    >
      <header className="tcrm-setup-agent-chat__header">
        <span className="tcrm-setup-agent-chat__mark">
          <TaliyaLogo label="Taliya" variant="mark" />
        </span>
        <span className="tcrm-setup-agent-chat__identity">
          <h2>Agente de configuração</h2>
          <p>Guiando setup <span aria-hidden="true" /></p>
        </span>
        <IconButton className="tcrm-setup-agent-chat__menu" disabled={isBlocked} icon="moreVertical" label="Mais opções do agente" onClick={onMenu} size="sm" variant="ghost" />
        <IconButton className="tcrm-setup-agent-chat__close" icon="x" label="Fechar agente" onClick={onClose} size="sm" variant="ghost" />
      </header>

      <div className="tcrm-setup-agent-chat__rule" />

      {isWelcome ? (
        <MessageBubble className="tcrm-setup-agent-chat__message tcrm-setup-agent-chat__message--welcome" variant="inbound">
          <p>Oi, eu vou te guiar nessa configuração.</p>
          <p>Primeiro vamos identificar seu studio. Depois seguimos juntos pelos dados principais, equipe, canais, planos, alunos, turmas e agenda.</p>
        </MessageBubble>
      ) : (
        <>
          <section className="tcrm-setup-agent-chat__info" aria-label="Impacto desta etapa">
            <Icon name="info" />
            <p>Esta etapa afeta agenda, cobrança e comunicação inicial.</p>
          </section>

          <MessageBubble className="tcrm-setup-agent-chat__message tcrm-setup-agent-chat__message--one" variant="inbound">
            Estamos na etapa Dados do studio.<br />
            Vou te avisar o que é obrigatório e<br />
            o que pode ficar para depois.
          </MessageBubble>

          <MessageBubble className="tcrm-setup-agent-chat__message tcrm-setup-agent-chat__message--two" variant="inbound">
            Use a área central para preencher,<br />
            importar ou revisar dados. Eu<br />
            acompanho daqui e explico<br />
            qualquer dúvida.
          </MessageBubble>
        </>
      )}

      {isWelcome ? <p className="tcrm-setup-agent-chat__quick-title">Perguntas rápidas</p> : null}

      <QuickReplyChips
        className="tcrm-setup-agent-chat__quick-replies"
        items={isWelcome ? [
          { id: "configurar", label: "O que vou configurar?", disabled: isBlocked },
          { id: "ajuda", label: "Posso pedir ajuda humana?", selected: isHumanHelp, disabled: isBlocked },
          { id: "liberacao", label: "Quando o CRM será liberado?", disabled: isBlocked }
        ] : [
          { id: "obrigatorio", label: "O que é obrigatório?", disabled: isBlocked },
          { id: "depois", label: "Posso deixar para depois?", selected: isHumanHelp, disabled: isBlocked },
          { id: "agenda", label: "Como isso afeta a agenda?", disabled: isBlocked }
        ]}
        onSelect={onQuickReply}
      />

      {!isWelcome ? (
        <form className="tcrm-setup-agent-chat__composer" onSubmit={submit}>
          <Input
            aria-label="Perguntar sobre esta etapa"
            className="tcrm-setup-agent-chat__composer-input"
            disabled={isBlocked}
            fieldSize="sm"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Pergunte sobre esta etapa..."
            value={value}
          />
          <IconButton aria-label="Enviar pergunta" className="tcrm-setup-agent-chat__send" disabled={isBlocked} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
        </form>
      ) : null}

      <footer className="tcrm-setup-agent-chat__footer">
        {!isWelcome ? <span>Precisa de ajuda humana?</span> : null}
        <Button className="tcrm-setup-agent-chat__help-action" disabled={isBlocked} onClick={onHumanHelp} size="sm" type="button" variant="ghost">Agendar ajuda</Button>
      </footer>
    </section>
  );
}

export type SetupHumanHelpCTAState = "schedule" | "active" | "unavailable";

export interface SetupHumanHelpCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: SetupHumanHelpCTAState;
  label?: string;
  onSchedule?: () => void;
}

export function SetupHumanHelpCTA({
  state = "schedule",
  label,
  onSchedule,
  className,
  ...props
}: SetupHumanHelpCTAProps) {
  const isUnavailable = state === "unavailable";
  const text = label ?? (state === "active" ? "Ajuda agendada" : state === "unavailable" ? "Ajuda indisponível" : "Agendar ajuda");

  return (
    <div
      className={cn("tcrm-setup-human-help-cta", className)}
      data-component="SetupHumanHelpCTA"
      data-state={state}
      {...props}
    >
      <Button disabled={isUnavailable} onClick={onSchedule} variant="ghost">{text}</Button>
    </div>
  );
}

export function AccessShell({
  children,
  footer,
  context,
  summary,
  help,
  layout = "split",
  onHelp,
  onAccount,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  footer?: React.ReactNode;
  context?: React.ReactNode;
  summary?: React.ReactNode;
  help?: React.ReactNode;
  layout?: "split" | "centered";
  onHelp?: () => void;
  onAccount?: () => void;
}) {
  return (
    <ProductWindowFrame
      bodyClassName="tcrm-access-shell-window__body"
      className={cn("tcrm-access-shell-window", className)}
      chrome={<CrmBrowserChrome className="tcrm-access-shell__browser-chrome" toolbarItems={crmAccessShellBrowserToolbarItems} />}
      {...props}
    >
      <div className={cn("tcrm-access-shell", `tcrm-access-shell--${layout}`)} data-component="AccessShell" data-layout={layout}>
        <header className="tcrm-access-shell__brandbar">
        <TaliyaLogo />
          <span className="tcrm-access-shell__actions">
            <IconButton icon="help" label="Ajuda" onClick={onHelp} />
            <IconButton icon="user" label="Conta" onClick={onAccount} />
          </span>
        </header>
        <main className="tcrm-access-shell__main">
          <section aria-label="Conteudo principal de acesso" className="tcrm-access-shell__content">
            <div className="tcrm-access-shell__content-frame">{children}</div>
          </section>
          {layout === "split" ? (
            <aside aria-label="Contexto de acesso" className="tcrm-access-shell__rail">
              <section className="tcrm-access-shell__rail-card">
                <h3>Contexto</h3>
                <div className="tcrm-access-shell__rail-content">{context}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Resumo</h3>
                <div className="tcrm-access-shell__rail-content">{summary}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Ajuda</h3>
                <div className="tcrm-access-shell__rail-content">{help}</div>
              </section>
            </aside>
          ) : null}
        </main>
        {footer ?? <AccessFooterLinks variant="shell" />}
      </div>
    </ProductWindowFrame>
  );
}

export function AuthCard({
  mode = "signup",
  loading = false,
  error,
  onSubmit,
  onGoogle,
  onMicrosoft,
  onForgotPassword,
  onSwitchMode,
  onTerms,
  onPrivacy,
  className
}: {
  mode?: "signup" | "signin";
  loading?: boolean;
  error?: React.ReactNode;
  onSubmit?: () => void;
  onGoogle?: () => void;
  onMicrosoft?: () => void;
  onForgotPassword?: () => void;
  onSwitchMode?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  className?: string;
}) {
  const isSignup = mode === "signup";

  return (
    <section className={cn("tcrm-auth-card", className)} data-component="AuthCard" data-mode={mode}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
      >
        <header className="tcrm-auth-card__header">
          <h1>{isSignup ? "Crie sua conta Taliya" : "Entrar na Taliya"}</h1>
          <p>{isSignup ? "Continue com sua conta de trabalho ou receba um link por e-mail." : "Acesse sua conta para continuar."}</p>
        </header>
        <div className="tcrm-auth-card__providers">
          <SocialAuthButton disabled={loading} onClick={onGoogle} provider="Google" type="button">Continuar com Google</SocialAuthButton>
          <SocialAuthButton disabled={loading} onClick={onMicrosoft} provider="Microsoft" type="button">Continuar com Microsoft</SocialAuthButton>
        </div>
        <div className="tcrm-auth-card__divider"><span>ou</span></div>
        <div className="tcrm-auth-card__fields">
          {isSignup ? (
            <Input label="E-mail profissional" placeholder="nome@empresa.com" type="email" />
          ) : (
            <>
              <Input leadingIcon="mail" placeholder="E-mail" type="email" />
              <PasswordInput leadingIcon="lock" placeholder="Senha" />
            </>
          )}
        </div>
        {!isSignup ? (
          <div className="tcrm-auth-card__options">
            <Checkbox disabled={loading} label="Manter conectado" />
            <Button className="tcrm-auth-card__text-action" disabled={loading} onClick={onForgotPassword} size="sm" type="button" variant="ghost">Esqueci minha senha</Button>
          </div>
        ) : null}
        {error ? <InlineAlert title="Nao foi possivel continuar" tone="danger">{error}</InlineAlert> : null}
        <Button className="tcrm-auth-card__submit" loading={loading} type="submit" variant="primary">
          {isSignup ? "Continuar com e-mail" : "Entrar"}
        </Button>
        {isSignup ? (
          <>
            <p className="tcrm-auth-card__helper">Enviaremos um link seguro para você continuar e definir sua senha.</p>
            <p className="tcrm-auth-card__legal">
              Ao continuar, você concorda com os{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onTerms} size="sm" type="button" variant="ghost">Termos</Button>{" "}
              e a{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onPrivacy} size="sm" type="button" variant="ghost">Política de Privacidade</Button>.
            </p>
          </>
        ) : null}
        <p className="tcrm-auth-card__switch">
          {isSignup ? "Já tem conta?" : "Não tem conta?"}{" "}
          <Button className="tcrm-auth-card__switch-action" onClick={onSwitchMode} size="sm" type="button" variant="ghost">{isSignup ? "Entrar" : "Criar conta"}</Button>
        </p>
      </form>
    </section>
  );
}

export function AccessFooterLinks({
  links = ["Termos", "Privacidade", "Ajuda"],
  variant = "cluster",
  onLinkClick,
  className
}: {
  links?: string[];
  variant?: "cluster" | "shell";
  onLinkClick?: (link: string, index: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <footer className={cn("tcrm-access-footer-links", `tcrm-access-footer-links--${variant}`, className)} data-component="AccessFooterLinks" data-variant={variant}>
      {links.map((link, index) => (
        <React.Fragment key={link}>
          {index > 0 ? <span aria-hidden="true" className="tcrm-access-footer-links__separator">•</span> : null}
          <a href={`#${link.toLowerCase()}`} onClick={(event) => onLinkClick?.(link, index, event)}>
            {link}
          </a>
        </React.Fragment>
      ))}
    </footer>
  );
}

export type CheckoutPaymentCardState = "default" | "coupon-applied" | "coupon-error" | "loading" | "blocked";

export interface CheckoutPaymentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  state?: CheckoutPaymentCardState;
  title?: React.ReactNode;
  planName?: React.ReactNode;
  planPrice?: React.ReactNode;
  couponLabel?: React.ReactNode;
  couponPlaceholder?: string;
  couponValue?: string;
  couponDefaultValue?: string;
  couponMessage?: React.ReactNode;
  couponError?: React.ReactNode;
  totalLabel?: React.ReactNode;
  total?: React.ReactNode;
  renewalLabel?: React.ReactNode;
  secureLabel?: string;
  secureDescription?: React.ReactNode;
  continueLabel?: React.ReactNode;
  backLabel?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
}

export function CheckoutPaymentCard({
  state = "default",
  title = "Pagamento",
  planName = "Plano Avance",
  planPrice = "R$ 497,00",
  couponLabel = "Cupom",
  couponPlaceholder = "Código promocional",
  couponValue,
  couponDefaultValue = "",
  couponMessage,
  couponError,
  totalLabel = "Total hoje",
  total,
  renewalLabel = "Renovação mensal",
  secureLabel = "Pagamento seguro",
  secureDescription = "A Taliya não coleta dados de cartão nesta tela.",
  continueLabel,
  backLabel = "Voltar aos planos",
  loading = false,
  blockedReason,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  className,
  ...props
}: CheckoutPaymentCardProps) {
  const generatedCouponId = React.useId();
  const [internalCouponValue, setInternalCouponValue] = React.useState(couponDefaultValue);
  const isControlled = couponValue !== undefined;
  const resolvedCouponValue = couponValue ?? internalCouponValue;
  const resolvedLoading = loading || state === "loading";
  const resolvedBlockedReason = blockedReason ?? (state === "blocked" ? "Pagamento temporariamente indisponível" : undefined);
  const resolvedCouponError = couponError ?? (state === "coupon-error" ? "Cupom inválido ou expirado." : undefined);
  const resolvedCouponMessage = couponMessage ?? (state === "coupon-applied" ? "Cupom aplicado." : undefined);
  const resolvedTotal = total ?? (state === "coupon-applied" ? "R$ 447,30" : "R$ 497,00");
  const resolvedContinueLabel = continueLabel ?? (resolvedLoading ? "Abrindo pagamento seguro" : "Continuar para pagamento seguro");
  const couponDescriptionId = resolvedCouponError || resolvedCouponMessage ? `${generatedCouponId}-message` : undefined;
  const couponState = resolvedCouponError ? "error" : resolvedCouponMessage ? "success" : "default";
  const controlsDisabled = resolvedLoading || Boolean(resolvedBlockedReason);
  const visualState: CheckoutPaymentCardState = resolvedLoading
    ? "loading"
    : resolvedBlockedReason
      ? "blocked"
      : state;

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    if (!isControlled) {
      setInternalCouponValue(nextValue);
    }
    onCouponChange?.(nextValue);
  };

  const handleCouponSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApplyCoupon?.(resolvedCouponValue);
  };

  return (
    <Card
      className={cn(
        "tcrm-checkout-payment-card",
        visualState !== "default" && `tcrm-checkout-payment-card--${visualState}`,
        className
      )}
      {...props}
    >
      <h2>{title}</h2>
      <div className="tcrm-checkout-payment-card__plan-row">
        <span>{planName}</span>
        <strong>{planPrice}</strong>
      </div>
      <form className="tcrm-checkout-payment-card__coupon" onSubmit={handleCouponSubmit}>
        <label className="tcrm-checkout-payment-card__coupon-label" htmlFor={generatedCouponId}>
          {couponLabel}
        </label>
        <div className="tcrm-checkout-payment-card__coupon-controls">
          <Input
            aria-describedby={couponDescriptionId}
            aria-label={couponPlaceholder}
            disabled={controlsDisabled}
            fieldState={couponState}
            id={generatedCouponId}
            onChange={handleCouponChange}
            placeholder={couponPlaceholder}
            value={resolvedCouponValue}
          />
          <Button className="tcrm-checkout-payment-card__coupon-action" disabled={controlsDisabled} type="submit" variant="secondary">
            Aplicar
          </Button>
        </div>
        {resolvedCouponError || resolvedCouponMessage ? (
          <p className="tcrm-checkout-payment-card__coupon-message" id={couponDescriptionId} role={resolvedCouponError ? "alert" : "status"}>
            {resolvedCouponError ?? resolvedCouponMessage}
          </p>
        ) : null}
      </form>
      <div className="tcrm-checkout-payment-card__total-row">
        <span>
          <strong>{totalLabel}</strong>
          <small>{renewalLabel}</small>
        </span>
        <strong>{resolvedTotal}</strong>
      </div>
      <div className="tcrm-checkout-payment-card__secure">
        <SecurePaymentNotice compact title={secureLabel}>
          {null}
        </SecurePaymentNotice>
        <p>{secureDescription}</p>
      </div>
      <footer className="tcrm-checkout-payment-card__actions">
        <Button
          blockedReason={resolvedBlockedReason}
          className="tcrm-checkout-payment-card__continue"
          loading={resolvedLoading}
          onClick={onContinuePayment}
          variant="primary"
        >
          {resolvedContinueLabel}
        </Button>
        <Button
          className="tcrm-checkout-payment-card__back"
          disabled={resolvedLoading}
          onClick={onBackToPlans}
          variant="ghost"
        >
          {backLabel}
        </Button>
      </footer>
    </Card>
  );
}

export interface CheckoutReviewPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  planCard?: React.ReactNode;
  paymentCard?: React.ReactNode;
  paymentCardProps?: CheckoutPaymentCardProps;
  loading?: boolean;
  blockedReason?: string;
  couponValue?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
  onChangePlan?: () => void;
  onFeatureHelp?: (id: string) => void;
}

export function CheckoutReviewPanel({
  className,
  children,
  planCard,
  paymentCard,
  paymentCardProps,
  loading,
  blockedReason,
  couponValue,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  onChangePlan,
  onFeatureHelp,
  ...props
}: CheckoutReviewPanelProps) {
  return (
    <div className={cn("tcrm-checkout-review-panel", className)} {...props}>
      {children ?? (
        <>
          {planCard ?? <PlanSummaryCard onChangePlan={onChangePlan} onFeatureHelp={onFeatureHelp} state="review" />}
          {paymentCard ?? (
            <CheckoutPaymentCard
              {...paymentCardProps}
              blockedReason={blockedReason ?? paymentCardProps?.blockedReason}
              couponValue={couponValue ?? paymentCardProps?.couponValue}
              loading={loading ?? paymentCardProps?.loading}
              onApplyCoupon={onApplyCoupon ?? paymentCardProps?.onApplyCoupon}
              onBackToPlans={onBackToPlans ?? paymentCardProps?.onBackToPlans}
              onContinuePayment={onContinuePayment ?? paymentCardProps?.onContinuePayment}
              onCouponChange={onCouponChange ?? paymentCardProps?.onCouponChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export interface SubscriptionReviewPageProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  panel?: React.ReactNode;
}

export function SubscriptionReviewPage({
  title = "Revisar assinatura",
  description = "Confira seu plano antes de ir para o pagamento seguro.",
  panel,
  children,
  className,
  ...props
}: SubscriptionReviewPageProps) {
  return (
    <section aria-label="Revisar assinatura" className={cn("tcrm-subscription-review-page", className)} {...props}>
      <header className="tcrm-subscription-review-page__header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children ?? panel ?? <CheckoutReviewPanel />}
    </section>
  );
}

export interface ConfirmedSubscriptionPageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  summary?: React.ReactNode;
  handoff?: React.ReactNode;
}

export function ConfirmedSubscriptionPage({
  header,
  summary,
  handoff,
  children,
  className,
  ...props
}: ConfirmedSubscriptionPageProps) {
  return (
    <section aria-label="Assinatura confirmada" className={cn("tcrm-confirmed-subscription-page", className)} {...props}>
      {header ?? <SubscriptionResultHeader />}
      <div className="tcrm-confirmed-subscription-page__content">
        {children ?? (
          <>
            {summary ?? <PlanSummaryCard state="confirmed" />}
            {handoff ?? <ConfirmedSetupHandoff />}
          </>
        )}
      </div>
    </section>
  );
}

export interface FinanceQueueGridProps extends React.HTMLAttributes<HTMLElement> {
  density?: "default" | "compact";
}

export function FinanceQueueGrid({ className, density = "default", ...props }: FinanceQueueGridProps) {
  return <section aria-label="Filas financeiras" className={cn("tcrm-finance-queue-grid", `tcrm-finance-queue-grid--${density}`, className)} {...props} />;
}

export interface AgentRoutineIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: React.ReactNode;
  description?: React.ReactNode;
}

export function AgentRoutineIntro({
  status = <Chip tone="success">Contratado</Chip>,
  description = "Escolha uma rotina para ajustar, simular ou publicar.",
  children,
  className,
  ...props
}: AgentRoutineIntroProps) {
  return (
    <div className={cn("tcrm-agent-routine-intro", className)} {...props}>
      {children ?? (
        <>
          {status}
          {description ? <p>{description}</p> : null}
        </>
      )}
    </div>
  );
}

export type StudentProfileAction = "open-schedule" | "open-finance" | "open-pending" | "open-notes" | "open-timeline" | "message" | "create-task" | "change-plan" | "pause-student";

export interface StudentProfileCompositionProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "standard" | "compact";
  onAction?: (action: StudentProfileAction) => void;
}

interface StudentProfileListItemProps extends React.ComponentProps<typeof ListItem> {
  badge: React.ReactNode;
  compact: boolean;
}

function StudentProfileListItem({ badge, compact, ...props }: StudentProfileListItemProps) {
  return <ListItem action={compact ? badge : undefined} {...props}>{compact ? null : badge}</ListItem>;
}

export function StudentProfileOverviewGrid({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-overview-grid", compact && "tcrm-student-profile-overview-grid--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <StudentSummary />
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="2. Agenda próxima">
            <h3>2. Agenda próxima</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui 15/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Sex 17/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Seg 20/05 · 08:00" title="Pilates Solo" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="clipboard" tone="warning" />} meta="1 aula disponível" title="Reposição pendente" />
            </List>
            <Button onClick={() => onAction?.("open-schedule")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agenda</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="3. Plano e financeiro">
            <h3>3. Plano e financeiro</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="success">Ativo</Chip>} compact={compact} leading={<Icon name="creditCard" />} meta="Plano Mensal" title="Plano atual" />
              <ListItem leading={<Icon name="coins" />} meta="10/06/2024 · R$ 199,00" title="Próxima mensalidade" />
              <ListItem leading={<Icon name="coins" />} meta="05/04/2024 · R$ 199,00" title="Último pagamento" />
              <StudentProfileListItem badge={<Chip tone="warning">pagamento pendente</Chip>} compact={compact} leading={<Icon name="alert" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Status financeiro" />
            </List>
            <Button onClick={() => onAction?.("open-finance")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver financeiro</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="4. Pendências">
            <h3>4. Pendências</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="user" />} meta="Dados cadastrais" title="Atualizar contato de emergência" />
              <ListItem leading={<Icon name="calendar" />} meta="Agenda" title="Confirmar disponibilidade para aula extra" />
              <ListItem leading={<Icon name="coins" tone="warning" />} meta="Financeiro" title="Pagamento pendente" />
            </List>
            <Button onClick={() => onAction?.("open-pending")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas pendências</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="5. Notas recentes">
            <h3>5. Notas recentes</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="clipboard" tone="info" />} meta="Sam Frank · 12/05/2024 14:32" title="Aluna pediu opção de reposição para próxima semana." />
              <ListItem leading={<Icon name="message" tone="info" />} meta="Nikki Olaw · 09/05/2024 10:15" title="Relatou leve desconforto no ombro direito." />
            </List>
            <Button onClick={() => onAction?.("open-notes")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas notas</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="6. Linha do tempo curta">
            <h3>6. Linha do tempo curta</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="12/05/2024 14:32 · Por Sam Frank" title="Mensagem via WhatsApp">Enviou lembrete da aula de quinta.</ListItem>
              <ListItem leading={<Icon name="checkCircle" tone="info" />} meta="10/05/2024 07:00 · Reformer Iniciante" title="Aula realizada">Presença registrada.</ListItem>
              <ListItem leading={<Icon name="coins" tone="success" />} meta="05/04/2024 10:32 · R$ 199,00" title="Pagamento recebido">Plano Mensal.</ListItem>
            </List>
            <Button onClick={() => onAction?.("open-timeline")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver linha do tempo completa</Button>
          </Panel>
        </>
      )}
    </div>
  );
}

export function StudentProfileActionRail({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-action-rail", compact && "tcrm-student-profile-action-rail--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Próximas ações">
            <h3>Próximas ações</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Reformer Iniciante</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui, 15/05 · 07:00" title="Aula marcada" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="refresh" tone="warning" />} meta="1 aula disponível" title="Repor aula pendente" />
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="coins" tone="success" />} meta="R$ 199,00" title="Pagamento pendente" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Riscos / alertas">
            <h3>Riscos / alertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="shield" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Financeiro em atraso" />
              <StudentProfileListItem badge={<Chip tone="success">Bom</Chip>} compact={compact} leading={<Icon name="checkCircle" tone="success" />} meta="8 de 10 aulas (80%)" title="Frequência estável" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Tarefas abertas">
            <h3>Tarefas abertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Nikki Olaw · 02/05" title="Confirmar disponibilidade para aula extra" />
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Sam Frank · 28/04" title="Atualizar contato de emergência" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Última conversa">
            <h3>Última conversa</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="Você: Oi Ana Paula! Lembrando da sua aula..." title="WhatsApp · 12/05/2024 14:32">Ana Paula: Perfeito, obrigada pelo lembrete!</ListItem>
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__quick-actions" compact={compact} title="Ações rápidas">
            <h3>Ações rápidas</h3>
            <ButtonGroup>
              <Button leadingIcon="message" onClick={() => onAction?.("message")} variant="secondary">Enviar mensagem</Button>
              <Button leadingIcon="calendar" onClick={() => onAction?.("create-task")} variant="secondary">Criar tarefa</Button>
              <Button leadingIcon="creditCard" onClick={() => onAction?.("change-plan")} variant="secondary">Alterar plano</Button>
              <Button leadingIcon="pause" onClick={() => onAction?.("pause-student")} variant="secondary">Pausar aluno</Button>
            </ButtonGroup>
          </Panel>
        </>
      )}
    </div>
  );
}

export type ClassOperationalDetailAction = "view-students" | "open-vacancy" | "open-credit" | "open-enrollment" | "edit-notes";

export interface ClassOperationalDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: ClassOperationalDetailAction) => void;
  students?: Array<RosterStudent | string>;
}

export function ClassOperationalDetail({ children, className, onAction, students, ...props }: ClassOperationalDetailProps) {
  return (
    <div className={cn("tcrm-class-operational-detail", className)} data-component="ClassOperationalDetail" {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-class-operational-detail__summary" compact>
            <dl>
              <div><Icon name="user" /><dt>Professor da aula</dt><dd>João Silva</dd></div>
              <div><Icon name="calendar" /><dt>Equipamento / recurso</dt><dd>Reformer 2</dd></div>
              <div><Icon name="users" /><dt>Capacidade</dt><dd>5/6</dd></div>
              <div><Icon name="clock" /><dt>Status</dt><dd><Chip tone="warning">Chamada em andamento</Chip></dd></div>
              <div><Icon name="calendar" /><dt>Origem</dt><dd>Agenda</dd></div>
            </dl>
            <p><Icon name="info" tone="info" /> Aula criada pela grade recorrente.</p>
          </Panel>
          <Panel className="tcrm-class-operational-detail__students" compact>
            <ButtonGroup align="between">
              <div><h3>Alunos esperados</h3><p>Clique no aluno para ver detalhes</p></div>
              <Button leadingIcon="eye" onClick={() => onAction?.("view-students")} size="sm" variant="secondary">Ver detalhes</Button>
            </ButtonGroup>
            <Roster students={students} variant="expected" />
          </Panel>
          <div className="tcrm-class-operational-detail__side">
            <Panel compact>
              <h3>Reposições e vagas</h3>
              <List divided>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="users" tone="success" />} onClick={() => onAction?.("open-vacancy")} title="1 vaga aberta">Disponível para encaixe</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="sparkles" tone="info" />} onClick={() => onAction?.("open-credit")} title="1 crédito compatível">Elegível para uso nesta aula</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="user" tone="info" />} onClick={() => onAction?.("open-enrollment")} title="1 aluno encaixado">Entrou por reposição</ListItem>
              </List>
            </Panel>
            <Panel compact>
              <ButtonGroup align="between"><h3>Observações da aula</h3><Button leadingIcon="edit" onClick={() => onAction?.("edit-notes")} size="sm" variant="secondary">Editar</Button></ButtonGroup>
              <p>Gabriela costuma avisar em cima da hora.<br />Verificar encaixe se Ana não vier.</p>
            </Panel>
          </div>
          <Panel className="tcrm-class-operational-detail__history" compact>
            <h3>Histórico da aula</h3>
            <List divided>
              <ListItem action={<Chip tone="neutral">Sistema</Chip>} leading={<Icon name="calendar" tone="info" />} meta="12/05 · 10:12" title="Aula criada pela grade">Recorrência: terça 17h</ListItem>
              <ListItem action={<Chip tone="info">Ana Carolina</Chip>} leading={<Icon name="user" tone="success" />} meta="12/05 · 15:47" title="Ana pediu reposição">Motivo: compromissos pessoais</ListItem>
              <ListItem action={<Chip tone="neutral">Recepção</Chip>} leading={<Icon name="user" tone="warning" />} meta="Hoje · 16:45" title="Chamada iniciada pela recepção">Execução da aula iniciada</ListItem>
            </List>
          </Panel>
        </>
      )}
    </div>
  );
}

export type SubscriptionStatusState = "verifying" | "failed" | "confirmed";
export type SubscriptionProgressState = "initiated" | "verifying" | "released";

export interface SubscriptionStatusDetail {
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface SubscriptionStatusCardProps extends Omit<CrmSurfaceProps, "state"> {
  state?: SubscriptionStatusState;
  details?: SubscriptionStatusDetail[];
  onBackToPlans?: () => void;
  onReopenPayment?: () => void;
  onRetry?: () => void;
  onStartSetup?: () => void;
  onSupport?: () => void;
}

const subscriptionStatusCopy: Record<
  SubscriptionStatusState,
  {
    title: string;
    description: string;
    icon: IconName;
    summaryState: "ok" | "attention" | "danger" | "info";
    statusLabel: string;
    callout?: { title: string; body: string };
    secureCopy?: string;
    helper?: string;
    footerNote?: string;
  }
> = {
  verifying: {
    title: "Estamos confirmando sua assinatura",
    description: "Seu pagamento foi iniciado. Assim que a confirmação chegar, você poderá configurar o Taliya para o seu estúdio.",
    icon: "shield",
    summaryState: "info",
    statusLabel: "Verificando confirmação",
    secureCopy: "A Taliya não coleta dados de cartão. A confirmação vem pelo ambiente seguro de pagamento.",
    helper: "A verificação acontece automaticamente. Você não precisa atualizar a página.",
    footerNote: "Pode levar alguns instantes. Você pode voltar a esta página se precisar."
  },
  failed: {
    title: "Não conseguimos confirmar sua assinatura",
    description: "Sua assinatura ainda não foi ativada. Você pode tentar novamente com segurança.",
    icon: "alert",
    summaryState: "danger",
    statusLabel: "Não confirmada",
    callout: {
      title: "O que aconteceu",
      body: "O pagamento pode ter sido cancelado, expirado ou recusado pelo provedor."
    },
    secureCopy: "A Taliya não coleta dados de cartão. A nova tentativa acontece pelo ambiente seguro do provedor.",
    footerNote: "O CRM será liberado assim que a assinatura for confirmada."
  },
  confirmed: {
    title: "Assinatura ativa",
    description: "Recebemos a confirmação com sucesso.",
    icon: "check",
    summaryState: "ok",
    statusLabel: "Confirmada"
  }
};

function defaultSubscriptionDetails(state: SubscriptionStatusState): SubscriptionStatusDetail[] {
  if (state === "confirmed") {
    return [
      { icon: "calendar", label: "Plano", value: "Avance" },
      { icon: "user", label: "Conta", value: "ana@studiolume.com" },
      { icon: "users", label: "Agentes", value: "3 agentes incluídos" },
      { icon: "refresh", label: "Renovação", value: "Mensal" }
    ];
  }

  return [
    { icon: "calendar", label: state === "failed" ? "Plano" : "Plano escolhido", value: "Avance" },
    { icon: "user", label: "Conta", value: "ana@studiolume.com" }
  ];
}

function subscriptionProgressStateFromStep(step?: number): SubscriptionProgressState {
  if (typeof step !== "number") return "verifying";
  if (step <= 1) return "initiated";
  if (step >= 3) return "released";
  return "verifying";
}

export function SubscriptionStatusCard({
  state = "verifying",
  className,
  children,
  action,
  title,
  description,
  icon,
  statusLabel,
  details,
  onBackToPlans,
  onReopenPayment,
  onRetry,
  onStartSetup,
  onSupport,
  ...props
}: SubscriptionStatusCardProps) {
  const copy = subscriptionStatusCopy[state];
  const rows = details ?? defaultSubscriptionDetails(state);
  const resolvedStatusLabel = statusLabel ?? copy.statusLabel;

  return (
    <StatusSummaryCard
      className={cn("tcrm-subscription-status-card", `tcrm-subscription-status-card--${state}`, className)}
      description={description ?? copy.description}
      icon={icon ?? copy.icon}
      state={copy.summaryState}
      statusLabel={resolvedStatusLabel}
      title={title ?? copy.title}
      {...props}
    >
      {children ?? (
        <div className="tcrm-subscription-status-card__content">
          {copy.callout ? (
            <InlineAlert className="tcrm-subscription-status-card__callout" icon="info" title={copy.callout.title} tone="warning">
              {copy.callout.body}
            </InlineAlert>
          ) : null}
          {state !== "confirmed" ? (
            <div className="tcrm-subscription-status-card__status-row">
              <strong>Status da assinatura</strong>
              <Chip className="tcrm-subscription-status-card__status-chip" tone={toneForState(state)}>
                {resolvedStatusLabel}
              </Chip>
            </div>
          ) : null}
          {state === "verifying" ? <SubscriptionProgressStepper state="verifying" /> : null}
          <div className={cn("tcrm-subscription-status-card__details", state === "failed" && "tcrm-subscription-status-card__details--boxed")}>
            {state === "failed" ? <strong className="tcrm-subscription-status-card__details-title">Sua assinatura</strong> : null}
            {rows.map((row, index) => (
              <div className="tcrm-subscription-status-card__detail-row" key={`${row.label}-${index}`}>
                <span className="tcrm-subscription-status-card__detail-icon">
                  <Icon name={row.icon ?? "clipboard"} />
                </span>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          {state === "confirmed" ? (
            <div className="tcrm-subscription-status-card__release-note">
              <Icon name="shieldCheck" />
              <span>O CRM será liberado após a configuração inicial.</span>
            </div>
          ) : copy.secureCopy ? (
            <SecurePaymentNotice>{copy.secureCopy}</SecurePaymentNotice>
          ) : null}
          {state === "verifying" ? (
            <>
              {action ?? (
                <Button aria-busy={true} className="tcrm-subscription-status-card__primary-action" variant="primary">
                  <Icon className="tl-spin" name="loader" size="14px" />
                  Verificando...
                </Button>
              )}
              {copy.helper ? <p className="tcrm-subscription-status-card__helper">{copy.helper}</p> : null}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onReopenPayment} size="sm" variant="ghost">Reabrir pagamento seguro</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "failed" ? (
            <>
              {action ?? (
                <Button className="tcrm-subscription-status-card__primary-action" onClick={onRetry} variant="primary">
                  Tentar pagamento novamente
                </Button>
              )}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onBackToPlans} size="sm" variant="ghost">Voltar aos planos</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "confirmed" && action ? (
            <div className="tcrm-subscription-status-card__confirmed-action">
              {action}
            </div>
          ) : state === "confirmed" && onStartSetup ? (
            <Button className="tcrm-subscription-status-card__primary-action" onClick={onStartSetup} variant="primary">Começar setup guiado</Button>
          ) : null}
          {copy.footerNote ? <p className="tcrm-subscription-status-card__footer-note">{copy.footerNote}</p> : null}
        </div>
      )}
    </StatusSummaryCard>
  );
}

export function SubscriptionProgressStepper({
  state,
  step,
  className
}: {
  state?: SubscriptionProgressState;
  step?: number;
  className?: string;
}) {
  const resolvedState = state ?? subscriptionProgressStateFromStep(step);
  const steps: StepperStep[] = [
    {
      id: "payment-started",
      label: "Pagamento iniciado",
      state: resolvedState === "initiated" ? "current" : "complete"
    },
    {
      id: "confirmation",
      label: "Confirmação em andamento",
      state: resolvedState === "initiated" ? "pending" : resolvedState === "verifying" ? "current" : "complete"
    },
    {
      id: "setup-released",
      label: "Configuração liberada",
      state: resolvedState === "released" ? "complete" : "pending"
    }
  ];

  return (
    <Stepper
      aria-label="Progresso da confirmação da assinatura"
      className={cn("tcrm-subscription-progress-stepper", `tcrm-subscription-progress-stepper--${resolvedState}`, className)}
      orientation="horizontal"
      steps={steps}
    />
  );
}

export interface SubscriptionResolutionPanelProps extends Omit<SubscriptionStatusCardProps, "state"> {
  retrying?: boolean;
}

export function SubscriptionResolutionPanel({
  className,
  action,
  onRetry,
  retrying = false,
  ...props
}: SubscriptionResolutionPanelProps) {
  return (
    <SubscriptionStatusCard
      className={cn("tcrm-subscription-resolution-panel", className)}
      action={action ?? (
        <Button
          className="tcrm-subscription-status-card__primary-action"
          loading={retrying}
          onClick={onRetry}
          variant="primary"
        >
          Tentar pagamento novamente
        </Button>
      )}
      onRetry={onRetry}
      state="failed"
      {...props}
    />
  );
}

export interface SubscriptionResultHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  state?: "confirmed";
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function SubscriptionResultHeader({
  state = "confirmed",
  title = "Assinatura confirmada",
  description = "Tudo certo. Sua assinatura está ativa e o setup guiado já pode começar.",
  className,
  ...props
}: SubscriptionResultHeaderProps) {
  return (
    <header className={cn("tcrm-subscription-result-header", `tcrm-subscription-result-header--${state}`, className)} data-component="SubscriptionResultHeader" data-state={state} {...props}>
      <span className="tcrm-subscription-result-header__icon" aria-hidden="true">
        <Icon name="check" />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export interface ConfirmedSetupHandoffStep {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface ConfirmedSetupHandoffProps extends Omit<CrmSurfaceProps, "state" | "icon" | "statusLabel" | "meta"> {
  state?: "ready" | "starting" | "blocked";
  steps?: ConfirmedSetupHandoffStep[];
  onStartSetup?: () => void;
  onScheduleHelp?: () => void;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  scheduleLoading?: boolean;
  blockedReason?: string;
  scheduleBlockedReason?: string;
}

const confirmedSetupHandoffSteps: ConfirmedSetupHandoffStep[] = [
  {
    id: "studio-data",
    title: "Preparar dados do studio",
    description: "Dados essenciais para iniciar a configuração."
  },
  {
    id: "channels-operation",
    title: "Configurar canais e operação",
    description: "Canais, planos, alunos, turmas e agenda com orientação."
  },
  {
    id: "review-release",
    title: "Revisar e liberar o CRM",
    description: "Tudo é revisado antes do primeiro uso."
  }
];

export function ConfirmedSetupHandoff({
  className,
  action,
  secondaryAction,
  title = "Setup guiado pela Taliya",
  description = "O agente de configuração vai guiar você passo a passo antes do primeiro uso.",
  state = "ready",
  steps = confirmedSetupHandoffSteps,
  onStartSetup,
  onScheduleHelp,
  loading = false,
  scheduleLoading = false,
  blockedReason,
  scheduleBlockedReason,
  ...props
}: ConfirmedSetupHandoffProps) {
  const headingId = React.useId();
  const isStarting = loading || state === "starting";
  const resolvedBlockedReason = state === "blocked" ? (blockedReason ?? "Setup indisponível no momento") : blockedReason;

  return (
    <Card
      className={cn("tcrm-confirmed-setup-handoff", `tcrm-confirmed-setup-handoff--${state}`, className)}
      {...props}
    >
      <header className="tcrm-confirmed-setup-handoff__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <section className="tcrm-confirmed-setup-handoff__steps" aria-labelledby={headingId}>
        <h3 id={headingId}>Como funciona</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id}>
              <span aria-hidden="true" className="tcrm-confirmed-setup-handoff__step-number">
                {index + 1}
              </span>
              <span className="tcrm-confirmed-setup-handoff__step-copy">
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="tcrm-confirmed-setup-handoff__actions">
        {action ?? (
          <Button
            blockedReason={resolvedBlockedReason}
            className="tcrm-confirmed-setup-handoff__primary"
            loading={isStarting}
            onClick={onStartSetup}
            variant="primary"
          >
            Começar setup guiado
          </Button>
        )}
        {secondaryAction ?? (
          <Button
            blockedReason={scheduleBlockedReason}
            className="tcrm-confirmed-setup-handoff__secondary"
            loading={scheduleLoading}
            onClick={onScheduleHelp}
            variant="secondary"
          >
            Agendar ajuda humana
          </Button>
        )}
      </footer>
    </Card>
  );
}

export type PlanSummaryCardState = "active" | "review" | "confirmed" | "failed";

export interface PlanSummaryFeature {
  id: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  icon: IconName;
  included?: boolean;
  disabled?: boolean;
  help?: boolean;
  separatorBefore?: boolean;
}

export interface PlanSummaryDetail {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
}

export interface PlanSummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  state?: PlanSummaryCardState;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  badgeLabel?: React.ReactNode;
  features?: PlanSummaryFeature[];
  details?: PlanSummaryDetail[];
  accountEmail?: React.ReactNode;
  releaseNote?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onChangePlan?: () => void;
  onViewDetails?: () => void;
  onFeatureHelp?: (id: string) => void;
}

const activePlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "operational", label: "CRM operacional", icon: "sliders", included: true },
  { id: "agents", label: "7 agentes inclusos", icon: "users", included: true },
  { id: "quota", label: "Cotas do ciclo", icon: "menu", included: true },
  { id: "support", label: "Suporte Taliya", icon: "help", included: true }
];

const reviewPlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "panel", label: "Painel Taliya + app", icon: "layout", included: true, help: true },
  { id: "studio", label: "Sistema do studio", icon: "copy", included: true, help: true },
  { id: "whatsapp", label: "WhatsApp Business", icon: "whatsapp", included: true },
  { id: "support", label: "Atendimento", icon: "headphones", included: true },
  { id: "agenda", label: "Agenda", icon: "calendar", included: true },
  { id: "sales", label: "Vendas", icon: "wallet", included: true },
  { id: "finance", label: "Financeiro", icon: "coins", included: false, disabled: true, separatorBefore: true },
  { id: "retention", label: "Retenção", icon: "users", included: false, disabled: true },
  { id: "management", label: "Gestão", icon: "barChart", included: false, disabled: true },
  { id: "history", label: "Histórico/Evolução", icon: "trendingUp", included: false, disabled: true },
  { id: "messages", label: "Mensagens de IA", meta: "5.000 mensagens/mês", icon: "sparkles", included: true, separatorBefore: true }
];

const confirmedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" },
  { id: "agents", label: "Agentes", value: "3 agentes incluídos", icon: "users" },
  { id: "renewal", label: "Renovação", value: "Mensal", icon: "refresh" }
];

const failedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" }
];

export function PlanSummaryCard({
  title,
  state = "active",
  eyebrow,
  description,
  badgeLabel,
  features,
  details,
  accountEmail = "ana@studiolume.com",
  releaseNote = "O CRM será liberado após a configuração inicial.",
  className,
  children,
  action,
  secondaryAction,
  loading = false,
  blockedReason,
  onChangePlan,
  onViewDetails,
  onFeatureHelp,
  ...props
}: PlanSummaryCardProps) {
  const resolvedTitle =
    title ??
    (state === "review"
      ? "Plano Avance"
      : state === "confirmed"
        ? "Assinatura ativa"
        : state === "failed"
          ? "Sua assinatura"
          : "Plano 7 agentes");

  if (state === "review") {
    const resolvedFeatures = features ?? reviewPlanSummaryFeatures;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--review", className)} {...props}>
        <header className="tcrm-plan-summary-card__review-header">
          <strong>{resolvedTitle}</strong>
          <Chip className="tcrm-plan-summary-card__review-chip" showDot={false} tone="neutral">
            {badgeLabel ?? "3 agentes incluídos"}
          </Chip>
        </header>
        <section className="tcrm-plan-summary-card__review-section" aria-label="Incluso no plano">
          <h3>Incluso no plano</h3>
          {children ?? (
            <ul className="tcrm-plan-summary-card__review-list">
              {resolvedFeatures.map((feature) => (
                <li
                  className={cn(
                    "tcrm-plan-summary-card__review-row",
                    feature.disabled && "is-disabled",
                    feature.separatorBefore && "has-separator"
                  )}
                  key={feature.id}
                >
                  <Icon className="tcrm-plan-summary-card__review-icon" name={feature.icon} />
                  <span className="tcrm-plan-summary-card__review-copy">
                    <strong>{feature.label}</strong>
                    {feature.meta ? <small>{feature.meta}</small> : null}
                  </span>
                  <span className={cn("tcrm-plan-summary-card__review-status", feature.included === false && "is-muted")} aria-hidden="true">
                    <Icon name={feature.included === false ? "minus" : "check"} />
                  </span>
                  {feature.help ? (
                    <IconButton className="tcrm-plan-summary-card__review-help" icon="help" label={`Ajuda sobre ${feature.label}`} onClick={() => onFeatureHelp?.(feature.id)} size="sm" type="button" variant="ghost" />
                  ) : (
                    <span aria-hidden="true" className="tcrm-plan-summary-card__review-help-spacer" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer className="tcrm-plan-summary-card__review-footer">
          <span>
            <strong>Conta</strong>
            <small>{accountEmail}</small>
          </span>
          {action ?? (
            <Button className="tcrm-plan-summary-card__review-change" onClick={onChangePlan} size="sm" variant="ghost">
              Trocar
            </Button>
          )}
        </footer>
      </Card>
    );
  }

  if (state === "confirmed") {
    const resolvedDetails = details ?? confirmedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--confirmed", className)} {...props}>
        <header className="tcrm-plan-summary-card__confirmed-header">
          <span className="tcrm-plan-summary-card__confirmed-icon" aria-hidden="true">
            <Icon name="check" />
          </span>
          <strong>{resolvedTitle}</strong>
          <small>{description ?? "Recebemos a confirmação com sucesso."}</small>
        </header>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="neutral" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tcrm-plan-summary-card__release-note">
          <ListIcon icon="shieldCheck" tone="success" />
          <span>{releaseNote}</span>
        </div>
      </Card>
    );
  }

  if (state === "failed") {
    const resolvedDetails = details ?? failedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--failed", className)} {...props}>
        <h3>{resolvedTitle}</h3>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="info" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    );
  }

  const resolvedFeatures = features ?? activePlanSummaryFeatures;

  return (
    <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--active", className)} {...props}>
      <header className="tcrm-plan-summary-card__active-header">
        <small>{eyebrow ?? "Plano atual"}</small>
        <strong>{resolvedTitle}</strong>
        <p>{description ?? "CRM completo com 7 agentes contratados."}</p>
      </header>
      {children ?? (
        <ul className="tcrm-plan-summary-card__active-list">
          {resolvedFeatures.map((feature) => (
            <li className="tcrm-plan-summary-card__active-row" key={feature.id}>
              <ListIcon icon={feature.icon} tone="info" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      )}
      <footer className="tcrm-plan-summary-card__active-actions">
        {action ?? (
          <Button
            blockedReason={blockedReason}
            className="tcrm-plan-summary-card__primary"
            loading={loading}
            onClick={onChangePlan}
            variant="primary"
          >
            Trocar plano
          </Button>
        )}
        {secondaryAction ?? (
          <Button className="tcrm-plan-summary-card__secondary" onClick={onViewDetails} variant="secondary">
            Ver detalhes do plano
          </Button>
        )}
      </footer>
    </Card>
  );
}

export type InvoiceStatus = "paid" | "pending" | "open" | "failed";

export interface InvoiceRow {
  id: string;
  period?: React.ReactNode;
  invoice?: React.ReactNode;
  dueDate?: React.ReactNode;
  due?: React.ReactNode;
  amount: React.ReactNode;
  status: InvoiceStatus;
  method?: React.ReactNode;
}

export interface InvoiceTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  blockedReason?: string;
  onRowClick?: (row: InvoiceRow) => void;
  onOpen?: (row: InvoiceRow) => void;
  onDownload?: (row: InvoiceRow) => void;
  onRetry?: (row: InvoiceRow) => void;
}

const defaultInvoiceRows: InvoiceRow[] = [
  { id: "jun-2026", period: "Junho/2026", dueDate: "12/06", amount: "R$ 799,00", status: "pending", method: "Cartão 4242" },
  { id: "mai-2026", period: "Maio/2026", dueDate: "12/05", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "abr-2026", period: "Abril/2026", dueDate: "12/04", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "mar-2026", period: "Março/2026", dueDate: "12/03", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" }
];

const invoiceStatusLabelByStatus: Record<InvoiceStatus, string> = {
  failed: "Falhou",
  open: "Em aberto",
  paid: "Paga",
  pending: "Em aberto"
};

function invoiceRowPeriod(row: InvoiceRow) {
  return row.period ?? row.invoice ?? row.id;
}

function invoiceRowDue(row: InvoiceRow) {
  return row.dueDate ?? row.due ?? "";
}

function invoiceRowAccessibleName(row: InvoiceRow) {
  const label = invoiceRowPeriod(row);
  return typeof label === "string" || typeof label === "number" ? String(label) : row.id;
}

export function InvoiceTable({
  title = "Histórico de faturas",
  rows = defaultInvoiceRows,
  onRowClick,
  onOpen,
  onDownload,
  onRetry,
  loading = false,
  error,
  emptyState,
  blockedReason,
  className,
  ...props
}: InvoiceTableProps) {
  const titleId = React.useId();

  return (
    <Card aria-labelledby={titleId} className={cn("tcrm-invoice-table-card", className)} {...props}>
      <h2 id={titleId}>{title}</h2>
      <DataTable
        className="tcrm-invoice-table"
        columns={[
          { key: "period", header: "Período", render: invoiceRowPeriod },
          { key: "dueDate", header: "Vencimento", render: invoiceRowDue },
          { key: "amount", header: "Valor" },
          {
            key: "status",
            header: "Status",
            render: (row: InvoiceRow) => (
              <Chip className={cn("tcrm-invoice-table__status", `tcrm-invoice-table__status--${row.status}`)} showDot={false} tone={toneForState(row.status)}>
                {invoiceStatusLabelByStatus[row.status]}
              </Chip>
            )
          },
          { key: "method", header: "Método" },
          {
            key: "actions",
            header: "Ações",
            render: (row: InvoiceRow) => {
              const invoiceName = invoiceRowAccessibleName(row);
              return (
                <ButtonGroup className="tcrm-invoice-table__actions" onClick={(event) => event.stopPropagation()}>
                  <Button
                    aria-label={`Abrir fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--open"
                    leadingIcon="fileText"
                    onClick={() => onOpen?.(row)}
                    size="sm"
                    variant="secondary"
                  >
                    Abrir
                  </Button>
                  <Button
                    aria-label={`Baixar fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--download"
                    leadingIcon="download"
                    onClick={() => (row.status === "failed" && onRetry ? onRetry(row) : onDownload?.(row))}
                    size="sm"
                    variant="secondary"
                  >
                    Baixar
                  </Button>
                </ButtonGroup>
              );
            }
          }
        ]}
        density="dense"
        emptyState={emptyState ?? <EmptyState title="Nenhuma fatura encontrada" />}
        error={error}
        loading={loading}
        onRowClick={onRowClick}
        rows={rows}
      />
    </Card>
  );
}

export interface BillingInvoiceEntitlement {
  id: string;
  icon: IconName;
  label: React.ReactNode;
}

export interface BillingInvoicesWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  currentTitle?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  dueLabel?: React.ReactNode;
  periodLabel?: React.ReactNode;
  methodLabel?: React.ReactNode;
  entitlements?: BillingInvoiceEntitlement[];
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onPayCurrent?: () => void;
  onOpenCurrent?: () => void;
  onDownloadCurrent?: () => void;
  onRowClick?: (row: InvoiceRow) => void;
  onOpenInvoice?: (row: InvoiceRow) => void;
  onDownloadInvoice?: (row: InvoiceRow) => void;
  onRetryInvoice?: (row: InvoiceRow) => void;
}

const billingInvoiceEntitlements: BillingInvoiceEntitlement[] = [
  { id: "plan", icon: "users", label: "Plano 7 agentes" },
  { id: "messages", icon: "message", label: "15.000 mensagens/mês" },
  { id: "support", icon: "headphones", label: "Suporte Taliya" }
];

export function BillingInvoicesWorkspace({
  currentTitle = "Fatura atual",
  amount = "R$ 799,00",
  statusLabel = "Em aberto",
  dueLabel = "Vence em 12/06",
  periodLabel = "Período: Junho/2026",
  methodLabel = "Método: Cartão final 4242",
  entitlements = billingInvoiceEntitlements,
  rows,
  loading = false,
  error,
  blockedReason,
  onPayCurrent,
  onOpenCurrent,
  onDownloadCurrent,
  onRowClick,
  onOpenInvoice,
  onDownloadInvoice,
  onRetryInvoice,
  className,
  ...props
}: BillingInvoicesWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-invoices-workspace", className)} data-component="BillingInvoicesWorkspace" {...props}>
      <Card className="tcrm-billing-invoices-workspace__current">
        <header>
          <small>{currentTitle}</small>
          <div><strong>{amount}</strong><Chip showDot={false} tone="warning">{statusLabel}</Chip></div>
        </header>

        <div className="tcrm-billing-invoices-workspace__facts">
          <span><Icon name="calendar" />{dueLabel}</span>
          <span><Icon name="calendar" />{periodLabel}</span>
          <span><Icon name="creditCard" />{methodLabel}</span>
        </div>

        <div className="tcrm-billing-invoices-workspace__entitlements" role="list">
          {entitlements.map((entitlement) => (
            <div key={entitlement.id} role="listitem">
              <ListIcon icon={entitlement.icon} tone="info" />
              <span>{entitlement.label}</span>
            </div>
          ))}
        </div>

        <footer>
          <Button blockedReason={blockedReason} loading={loading} onClick={onPayCurrent} variant="primary">Pagar agora</Button>
          <Button blockedReason={blockedReason} leadingIcon="fileText" onClick={onOpenCurrent} variant="secondary">Abrir fatura</Button>
          <Button blockedReason={blockedReason} leadingIcon="download" onClick={onDownloadCurrent} variant="secondary">Baixar PDF</Button>
        </footer>
      </Card>

      <InvoiceTable
        blockedReason={blockedReason}
        error={error}
        loading={loading}
        onDownload={onDownloadInvoice}
        onOpen={onOpenInvoice}
        onRetry={onRetryInvoice}
        onRowClick={onRowClick}
        rows={rows}
      />
    </section>
  );
}

export type AddOnCardState = "available" | "active" | "plan-max" | "consult" | "unavailable";

interface AddOnCardStateDefaults {
  title: React.ReactNode;
  description: React.ReactNode;
  meta: React.ReactNode;
  statusLabel: React.ReactNode;
  icon: IconName;
  actionLabel: React.ReactNode;
  actionVariant: ButtonVariant;
  statusTone: ComponentTone;
}

export interface AddOnCardProps extends Omit<CrmSurfaceProps, "state" | "action"> {
  state?: AddOnCardState;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
  loading?: boolean;
  blockedReason?: string;
  onAction?: (state: AddOnCardState) => void;
}

const addOnCardDefaultsByState: Record<AddOnCardState, AddOnCardStateDefaults> = {
  active: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Pacote ativo na assinatura atual.",
    statusLabel: "Ativo",
    icon: "messageSquareText",
    actionLabel: "Gerenciar pacote",
    actionVariant: "secondary",
    statusTone: "success"
  },
  available: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Entra após confirmação do billing.",
    statusLabel: "Disponível",
    icon: "messageSquareText",
    actionLabel: "Adicionar pacote",
    actionVariant: "primary",
    statusTone: "success"
  },
  consult: {
    title: "Cota personalizada",
    description: <>Para studios com alto volume<br />ou várias unidades.</>,
    meta: <>A equipe Taliya revisa a necessidade<br />com você.</>,
    statusLabel: "Sob consulta",
    icon: "pieChart",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "info"
  },
  "plan-max": {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  },
  unavailable: {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  }
};

function addOnCardStatusClass(state: AddOnCardState) {
  if (state === "plan-max" || state === "unavailable") return "plan";
  return state;
}

function addOnCardAccessibleText(value: React.ReactNode, fallback: React.ReactNode) {
  const resolved = value ?? fallback;
  return typeof resolved === "string" || typeof resolved === "number" ? String(resolved) : "add-on";
}

export function AddOnCard({
  title,
  description,
  meta,
  statusLabel,
  icon,
  state = "available",
  action,
  actionLabel,
  actionVariant,
  loading = false,
  blockedReason,
  onAction,
  className,
  ...props
}: AddOnCardProps) {
  const defaults = addOnCardDefaultsByState[state];
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  const resolvedMeta = meta ?? defaults.meta;
  const resolvedStatusLabel = statusLabel ?? defaults.statusLabel;
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const resolvedActionVariant = actionVariant ?? defaults.actionVariant;
  const titleId = React.useId();
  const accessibleTitle = addOnCardAccessibleText(resolvedTitle, defaults.title);

  return (
    <Card
      aria-labelledby={titleId}
      className={cn("tcrm-addon-card", className)}
      data-component="AddOnCard"
      data-state={state}
      {...props}
    >
      <span className="tcrm-addon-card__icon" aria-hidden="true">
        <Icon name={resolvedIcon} />
      </span>
      <h3 className="tcrm-addon-card__title" id={titleId}>{resolvedTitle}</h3>
      <Chip className={cn("tcrm-addon-card__status", `tcrm-addon-card__status--${addOnCardStatusClass(state)}`)} showDot={false} tone={defaults.statusTone}>
        {resolvedStatusLabel}
      </Chip>
      <p className="tcrm-addon-card__description">{resolvedDescription}</p>
      <small className="tcrm-addon-card__meta">{resolvedMeta}</small>
      {action ?? (
        <Button
          aria-label={`${resolvedActionLabel} - ${accessibleTitle}`}
          blockedReason={blockedReason}
          className={cn("tcrm-addon-card__action", `tcrm-addon-card__action--${resolvedActionVariant}`)}
          loading={loading}
          onClick={() => onAction?.(state)}
          size="sm"
          variant={resolvedActionVariant}
        >
          {resolvedActionLabel}
        </Button>
      )}
    </Card>
  );
}

export interface BillingAddOnOption {
  id: string;
  state: AddOnCardState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  statusLabel?: React.ReactNode;
  icon?: IconName;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
}

export interface BillingAddOnsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  activeTitle?: React.ReactNode;
  activeEmptyTitle?: React.ReactNode;
  activeEmptyDescription?: React.ReactNode;
  availableTitle?: React.ReactNode;
  activeAddOns?: BillingAddOnOption[];
  availableAddOns?: BillingAddOnOption[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}

const billingAvailableAddOns: BillingAddOnOption[] = [
  { id: "messages", state: "available" },
  { id: "agents", state: "plan-max" },
  { id: "quota", state: "consult" }
];

function BillingAddOnGrid({
  addOns,
  blockedReason,
  loading,
  onAddOnAction
}: {
  addOns: BillingAddOnOption[];
  blockedReason?: string;
  loading?: boolean;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}) {
  return (
    <div className="tcrm-billing-addons-workspace__grid">
      {addOns.map((option) => (
        <AddOnCard
          actionLabel={option.actionLabel}
          actionVariant={option.actionVariant}
          blockedReason={blockedReason}
          description={option.description}
          icon={option.icon}
          key={option.id}
          loading={loading}
          meta={option.meta}
          onAction={() => onAddOnAction?.(option)}
          state={option.state}
          statusLabel={option.statusLabel}
          title={option.title}
        />
      ))}
    </div>
  );
}

export function BillingAddOnsWorkspace({
  activeTitle = "Add-ons ativos",
  activeEmptyTitle = "Nenhum add-on ativo",
  activeEmptyDescription = "Quando um pacote extra for contratado, ele aparece aqui.",
  availableTitle = "Disponíveis",
  activeAddOns = [],
  availableAddOns = billingAvailableAddOns,
  loading = false,
  error,
  blockedReason,
  onAddOnAction,
  className,
  ...props
}: BillingAddOnsWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-addons-workspace", className)} data-component="BillingAddOnsWorkspace" {...props}>
      <Card className="tcrm-billing-addons-workspace__active">
        <h2>{activeTitle}</h2>
        {error ? (
          <ErrorState description={error} title="Não foi possível carregar os add-ons" />
        ) : loading && activeAddOns.length === 0 ? (
          <LoadingState title="Carregando add-ons ativos" />
        ) : activeAddOns.length > 0 ? (
          <BillingAddOnGrid addOns={activeAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
        ) : (
          <EmptyState
            className="tcrm-billing-addons-workspace__empty"
            description={activeEmptyDescription}
            icon="package"
            title={String(activeEmptyTitle)}
          />
        )}
      </Card>

      <Card className="tcrm-billing-addons-workspace__available">
        <h2>{availableTitle}</h2>
        <BillingAddOnGrid addOns={availableAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
      </Card>
    </section>
  );
}

export type QuotaProgressState = "normal" | 70 | 90 | 100;
export type QuotaProgressAction = "ledger" | "add-ons";

export interface QuotaProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  state?: QuotaProgressState;
  label?: string;
  title?: React.ReactNode;
  totalLabel?: React.ReactNode;
  unitLabel?: React.ReactNode;
  usedLabel?: React.ReactNode;
  remainingLabel?: React.ReactNode;
  badgeLabel?: string;
  alertLabel?: React.ReactNode;
  ledgerLabel?: React.ReactNode;
  addOnsLabel?: React.ReactNode;
  loading?: boolean | QuotaProgressAction;
  disabled?: boolean;
  blockedReason?: string;
  onAction?: (action: QuotaProgressAction) => void;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
}

function quotaProgressStateFromValue(value: number): QuotaProgressState {
  if (value >= 100) return 100;
  if (value >= 90) return 90;
  if (value >= 70) return 70;
  return "normal";
}

function quotaProgressTone(state: QuotaProgressState): "info" | "warning" | "danger" {
  if (state === 100) return "danger";
  if (state === 90) return "warning";
  return "info";
}

export function QuotaProgress({
  value = 42,
  state,
  label = "Uso da cota no ciclo",
  title = "Cota do ciclo",
  totalLabel = "15.000",
  unitLabel = "mensagens/mês",
  usedLabel = "6.300 usadas",
  remainingLabel = "8.700 restantes",
  badgeLabel,
  alertLabel = "Próximo alerta em 70%.",
  ledgerLabel = "Ver extrato",
  addOnsLabel = "Ver add-ons",
  loading = false,
  disabled = false,
  blockedReason,
  onAction,
  onViewLedger,
  onViewAddOns,
  className,
  ...props
}: QuotaProgressProps) {
  const normalizedValue = Math.max(0, Math.min(100, Math.round(value)));
  const resolvedState = state ?? quotaProgressStateFromValue(normalizedValue);
  const progressTone = quotaProgressTone(resolvedState);
  const isLedgerLoading = loading === true || loading === "ledger";
  const isAddOnsLoading = loading === true || loading === "add-ons";

  const handleLedger = () => {
    onViewLedger?.();
    onAction?.("ledger");
  };
  const handleAddOns = () => {
    onViewAddOns?.();
    onAction?.("add-ons");
  };

  return (
    <Card
      aria-busy={loading ? true : undefined}
      className={cn("tcrm-quota-progress", className)}
      data-component="QuotaProgress"
      data-state={resolvedState}
      style={{ "--tcrm-quota-progress-value": `${normalizedValue}%` } as React.CSSProperties}
      {...props}
    >
      <h3 className="tcrm-quota-progress__title">{title}</h3>
      <div className="tcrm-quota-progress__headline">
        <strong>{totalLabel}</strong>
        <span>{unitLabel}</span>
      </div>
      <div className="tcrm-quota-progress__usage-labels">
        <span>{usedLabel}</span>
        <span>{remainingLabel}</span>
      </div>
      <div className="tcrm-quota-progress__progress-wrap">
        <ProgressBar className="tcrm-quota-progress__progress" label={label} tone={progressTone} value={normalizedValue} />
        <span aria-hidden="true" className="tcrm-quota-progress__progress-value">{normalizedValue}%</span>
      </div>
      <div className="tcrm-quota-progress__status-row">
        <QuotaBadge className="tcrm-quota-progress__badge" label={badgeLabel} value={resolvedState} />
        <span className="tcrm-quota-progress__helper">{alertLabel}</span>
      </div>
      <span aria-hidden="true" className="tcrm-quota-progress__message-box">
        <span className="tcrm-quota-progress__message-bubble">
          <span />
          <span />
          <span />
        </span>
      </span>
      <div className="tcrm-quota-progress__actions">
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--ledger"
          disabled={disabled}
          loading={isLedgerLoading}
          onClick={handleLedger}
          variant="secondary"
        >
          {ledgerLabel}
        </Button>
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--addons"
          disabled={disabled}
          loading={isAddOnsLoading}
          onClick={handleAddOns}
          variant="primary"
        >
          {addOnsLabel}
        </Button>
      </div>
    </Card>
  );
}

export interface UsageOverviewOrigin {
  id: string;
  origin: UsageOriginRowOrigin;
  title?: React.ReactNode;
  amount?: React.ReactNode;
  percent?: number;
  visualPercent?: number;
  icon?: IconName;
}

export interface UsageOverviewStatusItem {
  id: string;
  title: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface UsageOverviewWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  quota?: Omit<QuotaProgressProps, "onAction" | "onViewLedger" | "onViewAddOns">;
  origins?: UsageOverviewOrigin[];
  alerts?: UsageOverviewStatusItem[];
  affected?: UsageOverviewStatusItem[];
  originFooter?: React.ReactNode;
  flowsLabel?: React.ReactNode;
  loading?: boolean;
  error?: string;
  blockedReason?: string;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
  onOriginSelect?: (origin: UsageOriginRowOrigin, state: UsageOriginRowState) => void;
  onViewFlows?: () => void;
}

const usageOverviewOrigins: UsageOverviewOrigin[] = [
  { id: "attendance", origin: "attendance" },
  { id: "agenda", origin: "agenda" },
  { id: "sales", origin: "sales" },
  { id: "finance", origin: "finance" },
  { id: "other", origin: "other" }
];

const usageOverviewAlerts: UsageOverviewStatusItem[] = [
  { id: "clear", title: "Nenhum alerta crítico", icon: "checkCircle", tone: "success" },
  { id: "economy", title: "Economia entra automaticamente em 90%.", icon: "percent", tone: "info" },
  { id: "pause", title: <>Automação paga pausa em 100%;<br />CRM manual continua.</>, icon: "pause", tone: "info" }
];

const usageOverviewAffected: UsageOverviewStatusItem[] = [
  { id: "flows", title: "Nenhum fluxo pausado por cota", icon: "checkCircle", tone: "success" },
  { id: "downgrade", title: "Nenhum downgrade ativo", icon: "checkCircle", tone: "success" }
];

function UsageOverviewStatusRows({ items }: { items: UsageOverviewStatusItem[] }) {
  return (
    <div className="tcrm-usage-overview-workspace__status-rows" role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <ListIcon icon={item.icon ?? "checkCircle"} tone={item.tone ?? "info"} />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export function UsageOverviewWorkspace({
  quota,
  origins = usageOverviewOrigins,
  alerts = usageOverviewAlerts,
  affected = usageOverviewAffected,
  originFooter = "Distribuição do uso no ciclo atual.",
  flowsLabel = "Ver fluxos",
  loading = false,
  error,
  blockedReason,
  onViewLedger,
  onViewAddOns,
  onOriginSelect,
  onViewFlows,
  className,
  ...props
}: UsageOverviewWorkspaceProps) {
  const blocked = Boolean(blockedReason);

  if (error) {
    return (
      <section className={cn("tcrm-usage-overview-workspace", className)} data-component="UsageOverviewWorkspace" {...props}>
        <ErrorState className="tcrm-usage-overview-workspace__state" description={error} title="Não foi possível carregar o uso" />
      </section>
    );
  }

  return (
    <section
      aria-busy={loading || undefined}
      className={cn("tcrm-usage-overview-workspace", className)}
      data-component="UsageOverviewWorkspace"
      data-state={blocked ? "blocked" : loading ? "loading" : "source"}
      {...props}
    >
      <QuotaProgress
        {...quota}
        blockedReason={blockedReason ?? quota?.blockedReason}
        disabled={blocked || quota?.disabled}
        loading={loading ? true : quota?.loading}
        onViewAddOns={onViewAddOns}
        onViewLedger={onViewLedger}
      />

      <div className="tcrm-usage-overview-workspace__lower">
        <Card className="tcrm-usage-overview-workspace__origins">
          <h2>Origem do consumo</h2>
          {loading ? (
            <LoadingState title="Carregando origens" />
          ) : (
            <div className="tcrm-usage-overview-workspace__origin-rows">
              {origins.map((item) => (
                <UsageOriginRow
                  key={item.id}
                  amount={item.amount}
                  icon={item.icon}
                  onSelect={onOriginSelect}
                  origin={item.origin}
                  percent={item.percent}
                  state={blocked ? "blocked" : "source"}
                  title={item.title}
                  visualPercent={item.visualPercent}
                />
              ))}
            </div>
          )}
          <p>{originFooter}</p>
        </Card>

        <div className="tcrm-usage-overview-workspace__status-stack">
          <Card className="tcrm-usage-overview-workspace__alerts">
            <h2>Alertas e economia</h2>
            {loading ? <LoadingState title="Carregando alertas" /> : <UsageOverviewStatusRows items={alerts} />}
          </Card>
          <Card className="tcrm-usage-overview-workspace__affected">
            <h2>O que foi afetado</h2>
            {loading ? <LoadingState title="Carregando impactos" /> : <UsageOverviewStatusRows items={affected} />}
            <Button blockedReason={blockedReason} disabled={blocked || loading} onClick={onViewFlows} variant="secondary">{flowsLabel}</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export interface BillingSubscriptionAgent {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export interface BillingSubscriptionWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  agents?: BillingSubscriptionAgent[];
  onChangePlan?: () => void;
  onViewPlanDetails?: () => void;
  onOpenAgents?: () => void;
  onViewUsage?: () => void;
  onViewInvoices?: () => void;
  onUpdatePayment?: () => void;
  onViewAddOns?: () => void;
  onSupport?: () => void;
}

const billingSubscriptionAgents: BillingSubscriptionAgent[] = [
  { id: "support", label: "Atendimento", icon: "message" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "sales", label: "Vendas", icon: "trendingUp" },
  { id: "finance", label: "Financeiro", icon: "wallet" },
  { id: "retention", label: "Retenção", icon: "shield" },
  { id: "management", label: "Gestão/Governança", icon: "shieldStar" },
  { id: "history", label: "Histórico/Evolução", icon: "book" }
];

export function BillingSubscriptionWorkspace({
  agents = billingSubscriptionAgents,
  onChangePlan,
  onViewPlanDetails,
  onOpenAgents,
  onViewUsage,
  onViewInvoices,
  onUpdatePayment,
  onViewAddOns,
  onSupport,
  className,
  ...props
}: BillingSubscriptionWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" {...props}>
      <div className="tcrm-billing-subscription-workspace__main">
        <PlanSummaryCard className="tcrm-billing-subscription-workspace__plan" onChangePlan={onChangePlan} onViewDetails={onViewPlanDetails} />

        <Card className="tcrm-billing-subscription-workspace__agents">
          <header><small>Agentes inclusos</small><h3>7 de 7 agentes inclusos</h3></header>
          <div role="list">
            {agents.map((agent) => <div key={agent.id} role="listitem"><ListIcon icon={agent.icon} tone="info" /><span>{agent.label}</span></div>)}
          </div>
          <Button onClick={onOpenAgents} variant="secondary">Abrir Agentes</Button>
        </Card>

        <div className="tcrm-billing-subscription-workspace__billing">
          <QuotaProgress
            addOnsLabel=""
            alertLabel="Uso detalhado fica em Uso e cotas."
            className="tcrm-billing-subscription-workspace__quota"
            ledgerLabel="Ver uso e cotas"
            onViewLedger={onViewUsage}
          />
          <Card className="tcrm-billing-subscription-workspace__invoice">
            <small>Próxima fatura</small>
            <h3>R$ 799,00</h3>
            <div><span>Vence em 12/06</span><Chip showDot={false} tone="warning">Em aberto</Chip></div>
            <p><Icon name="creditCard" /> Cartão final 4242</p>
            <footer><Button onClick={onViewInvoices} size="sm" variant="secondary">Ver faturas</Button><Button onClick={onUpdatePayment} size="sm" variant="secondary">Atualizar pagamento</Button></footer>
          </Card>
        </div>
      </div>

      <Card className="tcrm-billing-subscription-workspace__addons">
        <small>Add-ons ativos</small>
        <div><ListIcon icon="shoppingCart" tone="info" /><span><strong>Nenhum add-on ativo</strong><small>Pacotes extras aparecem aqui quando contratados.</small></span></div>
        <Button onClick={onViewAddOns} variant="secondary">Ver add-ons</Button>
      </Card>

      <Card className="tcrm-billing-subscription-workspace__actions">
        <Button onClick={onViewInvoices} variant="primary">Ver faturas</Button>
        <Button onClick={onViewUsage} variant="secondary">Ver uso e cotas</Button>
        <Button onClick={onSupport} variant="secondary">Falar com suporte</Button>
      </Card>
    </section>
  );
}

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

export type ApprovalPanelState = "pending" | "approved" | "rejected" | "expired" | "loading" | "blocked";
export type ApprovalPanelAction = "approve" | "edit" | "reject" | "request-data" | "open-origin" | "close";
export type ApprovalPanelLayout = "detail" | "compact";

export interface ApprovalPanelFact {
  id: string;
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  valueIcon?: IconName;
  dotTone?: "pending" | "approved" | "rejected" | "expired" | "low" | "medium" | "high";
  valueTone?: "default" | "whatsapp" | "copilot" | "danger";
}

export interface ApprovalPanelSection {
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
  badge?: React.ReactNode;
  variant?: "text" | "suggestion";
}

export interface ApprovalPanelTimelineItem {
  id: string;
  time: React.ReactNode;
  label: React.ReactNode;
}

export interface ApprovalPanelRecentComment {
  author: React.ReactNode;
  time: React.ReactNode;
  body: React.ReactNode;
  avatarSrc?: string;
}

export interface ApprovalPanelProps extends Omit<CrmSurfaceProps, "state" | "title" | "children"> {
  state?: ApprovalPanelState;
  layout?: ApprovalPanelLayout;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  facts?: ApprovalPanelFact[];
  sections?: ApprovalPanelSection[];
  timeline?: ApprovalPanelTimelineItem[];
  recentComment?: ApprovalPanelRecentComment;
  onAction?: (action: ApprovalPanelAction) => void;
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  onRequestData?: () => void;
  onOpenOrigin?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  blockedReason?: string;
  proposalLabel?: React.ReactNode;
  proposal?: React.ReactNode;
  channelLabel?: React.ReactNode;
  channel?: React.ReactNode;
  scheduledLabel?: React.ReactNode;
  scheduledFor?: React.ReactNode;
}

const approvalPanelDefaultSections: ApprovalPanelSection[] = [
  {
    id: "context",
    title: "Contexto resumido",
    body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
  },
  {
    id: "proposal",
    title: "Proposta principal",
    badge: "Sugestão do copiloto",
    variant: "suggestion",
    body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
  },
  {
    id: "impact",
    title: "Impacto esperado",
    body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
  },
  {
    id: "policy",
    title: "Política / guardrail aplicado",
    body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
  }
];

const approvalPanelDefaultTimeline: ApprovalPanelTimelineItem[] = [
  { id: "requested", time: "09:12", label: "Cliente solicitou reagendamento" },
  { id: "suggested", time: "09:16", label: "Copiloto sugeriu resposta" },
  { id: "created", time: "09:18", label: "Aprovação criada" }
];

const approvalPanelDefaultComment: ApprovalPanelRecentComment = {
  author: "Sam Frank",
  time: "Hoje, 09:20",
  body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço."
};

function approvalPanelStatus(state: ApprovalPanelState) {
  switch (state) {
    case "approved":
      return { label: "Aprovada", dotTone: "approved" as const, title: "Mensagem aprovada para Ana Paula", primary: "Aprovado" };
    case "rejected":
      return { label: "Rejeitada", dotTone: "rejected" as const, title: "Mensagem rejeitada para Ana Paula", primary: "Aprovar" };
    case "expired":
      return { label: "Expirada", dotTone: "expired" as const, title: "Aprovação expirada para Ana Paula", primary: "Aprovar" };
    case "blocked":
      return { label: "Bloqueada", dotTone: "expired" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
    case "loading":
    case "pending":
    default:
      return { label: "Pendente", dotTone: "pending" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
  }
}

function approvalPanelFacts(state: ApprovalPanelState): ApprovalPanelFact[] {
  const status = approvalPanelStatus(state);
  const deadline = state === "expired" ? (
    <>
      <span className="tcrm-approval-panel__value-danger">Expirou</span>
      <span>09:30</span>
    </>
  ) : (
    <>
      <span className="tcrm-approval-panel__value-danger">Hoje</span>
      <span>09:30</span>
    </>
  );

  return [
    { id: "status", icon: "clipboard", label: "Status", value: status.label, dotTone: status.dotTone },
    { id: "type", icon: "clipboardCheck", label: "Tipo", value: "Mensagem", valueIcon: "message" },
    { id: "origin", icon: "clipboard", label: "Origem canônica", value: "WhatsApp / Agente de atendimento", valueIcon: "whatsapp", valueTone: "whatsapp" },
    { id: "agent", icon: "clipboard", label: "Solicitante / agente", value: "Copiloto de atendimento", valueIcon: "sparkles", valueTone: "copilot" },
    { id: "risk", icon: "clock", label: "Risco", value: "Baixo", dotTone: "low" },
    { id: "quota", icon: "coins", label: "Custo / cota", value: "1 crédito" },
    { id: "deadline", icon: "clock", label: "Prazo", value: deadline }
  ];
}

function emitApprovalAction(action: ApprovalPanelAction, onAction?: (action: ApprovalPanelAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ApprovalPanel({
  state = "pending",
  layout = "detail",
  title,
  eyebrow = "Aprovação",
  facts,
  sections = approvalPanelDefaultSections,
  timeline = approvalPanelDefaultTimeline,
  recentComment = approvalPanelDefaultComment,
  onAction,
  onApprove,
  onEdit,
  onReject,
  onRequestData,
  onOpenOrigin,
  onClose,
  blockedReason,
  disabled,
  proposalLabel = "Ação proposta pelo agente",
  proposal = "Enviar mensagem de confirmação de visita técnica para Ana Paula Santos.",
  channelLabel = "Canal:",
  channel = "WhatsApp",
  scheduledLabel = "Programado para:",
  scheduledFor = "Hoje, 09:30",
  className,
  ...props
}: ApprovalPanelProps) {
  const status = approvalPanelStatus(state);
  const approvalFacts = facts ?? approvalPanelFacts(state);
  const locked = disabled || Boolean(blockedReason) || ["approved", "rejected", "expired", "blocked"].includes(state);
  const loading = state === "loading";

  if (layout === "compact") {
    return (
      <Card
        aria-busy={loading || undefined}
        aria-label="Aprovação da ação"
        className={cn("tcrm-approval-panel", "tcrm-approval-panel--compact", `tcrm-approval-panel--${stateKey(state)}`, className)}
        data-component="ApprovalPanel"
        data-layout="compact"
        data-state={state}
        role="region"
        {...props}
      >
        {loading ? (
          <LoadingState className="tcrm-approval-panel__compact-state" title="Carregando aprovação" variant="panel" />
        ) : state === "blocked" ? (
          <InlineAlert className="tcrm-approval-panel__compact-state" tone="warning" title="Aprovação bloqueada">
            {blockedReason ?? "Esta ação exige uma revisão antes da decisão."}
          </InlineAlert>
        ) : (
          <>
            <header className="tcrm-approval-panel__compact-header">
              <Icon name="fingerprint" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" />
              <h2>{proposalLabel}</h2>
            </header>
            <p className="tcrm-approval-panel__compact-proposal">{proposal}</p>
            <dl className="tcrm-approval-panel__compact-facts">
              <div>
                <dt>{channelLabel}</dt>
                <dd>{channel}<Icon name="whatsapp" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" /></dd>
              </div>
              <div>
                <dt>{scheduledLabel}</dt>
                <dd>{scheduledFor}</dd>
              </div>
            </dl>
            <footer className="tcrm-approval-panel__compact-actions">
              <Button disabled={locked} onClick={() => emitApprovalAction("approve", onAction, onApprove)} size="sm" variant="primary">Aprovar</Button>
              <Button disabled={locked} onClick={() => emitApprovalAction("edit", onAction, onEdit)} size="sm" variant="secondary">Editar</Button>
              <Button className="tcrm-approval-panel__compact-reject" disabled={locked} onClick={() => emitApprovalAction("reject", onAction, onReject)} size="sm" variant="secondary">Rejeitar</Button>
            </footer>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card
      aria-busy={loading || undefined}
      aria-label={typeof title === "string" ? title : "Painel de aprovação"}
      className={cn("tcrm-approval-panel", `tcrm-approval-panel--${stateKey(state)}`, className)}
      data-component="ApprovalPanel"
      data-state={state}
      role="region"
      {...props}
    >
      <header className="tcrm-approval-panel__header">
        <Chip className="tcrm-approval-panel__eyebrow" showDot={false}>
          {eyebrow}
        </Chip>
        <IconButton className="tcrm-approval-panel__close" icon="x" label="Fechar aprovação" onClick={() => emitApprovalAction("close", onAction, onClose)} size="sm" variant="default" />
        <h2>{title ?? status.title}</h2>
      </header>

      <dl className="tcrm-approval-panel__facts">
        {approvalFacts.map((fact) => (
          <div className="tcrm-approval-panel__fact" key={fact.id}>
            <Icon className="tcrm-approval-panel__fact-icon" name={fact.icon ?? "circle"} size="var(--taliya-control-crm-approval-panel-fact-icon-size)" />
            <dt>{fact.label}</dt>
            <dd className={cn(fact.valueTone && `tcrm-approval-panel__fact-value--${fact.valueTone}`)}>
              {fact.dotTone ? <span className={cn("tcrm-approval-panel__dot", `tcrm-approval-panel__dot--${fact.dotTone}`)} /> : null}
              {fact.valueIcon ? <Icon name={fact.valueIcon} size="var(--taliya-control-crm-approval-panel-fact-value-icon-size)" /> : null}
              <span>{fact.value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="tcrm-approval-panel__sections">
        {sections.map((section) => (
          <section className={cn("tcrm-approval-panel__section", section.variant === "suggestion" && "tcrm-approval-panel__section--suggestion")} key={section.id}>
            <div className="tcrm-approval-panel__section-header">
              <h3>{section.title}</h3>
              {section.badge ? (
                <Chip className="tcrm-approval-panel__suggestion-chip" icon="sparkles" showDot={false}>
                  {section.badge}
                </Chip>
              ) : null}
            </div>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="tcrm-approval-panel__section tcrm-approval-panel__history">
          <h3>Histórico</h3>
          <ol>
            {timeline.map((item) => (
              <li key={item.id}>
                <span className="tcrm-approval-panel__history-dot" />
                <time>{item.time}</time>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="tcrm-approval-panel__section tcrm-approval-panel__comment">
          <h3>Comentário recente</h3>
          <div>
            <Avatar className="tcrm-approval-panel__comment-avatar" name={String(recentComment.author)} size="sm" src={recentComment.avatarSrc} />
            <p>
              <strong>{recentComment.author}</strong>
              <span>· {recentComment.time}</span>
              <small>{recentComment.body}</small>
            </p>
          </div>
        </section>
      </div>

      <footer className="tcrm-approval-panel__footer">
        <Button
          blockedReason={blockedReason}
          className="tcrm-approval-panel__button tcrm-approval-panel__button--primary"
          disabled={locked}
          loading={loading}
          onClick={() => emitApprovalAction("approve", onAction, onApprove)}
          variant="primary"
        >
          {status.primary}
        </Button>
        <div className="tcrm-approval-panel__secondary-actions">
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("edit", onAction, onEdit)} variant="secondary">Editar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("reject", onAction, onReject)} variant="secondary">Rejeitar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("request-data", onAction, onRequestData)} variant="secondary">Pedir dados</Button>
        </div>
        <Button className="tcrm-approval-panel__button tcrm-approval-panel__button--origin" disabled={disabled || loading} onClick={() => emitApprovalAction("open-origin", onAction, onOpenOrigin)} variant="secondary">Abrir origem</Button>
      </footer>
    </Card>
  );
}

export interface ApprovalDrawerProps extends ApprovalPanelProps {
  open?: boolean;
}

export function ApprovalDrawer({ open = true, className, ...props }: ApprovalDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <ApprovalPanel
      aria-label="Detalhes da aprovação"
      className={cn("tcrm-approval-drawer", className)}
      data-component="ApprovalDrawer"
      role="complementary"
      {...props}
    />
  );
}

export type ImpactSummaryState = "low" | "medium" | "high" | "loading" | "blocked";

export interface ImpactSummaryItem {
  id: string;
  icon: IconName;
  tone: ComponentTone;
  text: React.ReactNode;
}

export interface ImpactSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  state?: ImpactSummaryState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: ImpactSummaryItem[];
  blockedReason?: React.ReactNode;
}

const impactSummarySourceItems: ImpactSummaryItem[] = [
  { id: "teacher-whatsapp", icon: "user", tone: "info", text: "Professores continuam sem ver WhatsApp dos alunos." },
  { id: "manual-payment", icon: "banknote", tone: "success", text: "Recepção pode registrar baixa manual." },
  { id: "discount-approval", icon: "percent", tone: "warning", text: "Descontos acima de 10% continuam exigindo Dono/Admin." },
  { id: "charge-approval", icon: "shieldCheck", tone: "info", text: "Cancelar cobrança continua exigindo aprovação." }
];

const impactSummaryHighItems: ImpactSummaryItem[] = [
  { id: "high-approval", icon: "shieldAlert", tone: "danger", text: "A alteração exige aprovação antes de publicar." },
  { id: "high-customer", icon: "users", tone: "warning", text: "Alunos podem receber mensagens ou cobranças diferentes." },
  { id: "high-finance", icon: "banknote", tone: "warning", text: "Financeiro precisa revisar limites e baixa manual." },
  { id: "high-audit", icon: "clipboardCheck", tone: "info", text: "Mudança fica registrada na auditoria do CRM." }
];

const impactSummaryLowItems: ImpactSummaryItem[] = [
  { id: "low-scope", icon: "checkCircle", tone: "success", text: "Ajuste restrito ao fluxo selecionado." },
  { id: "low-approval", icon: "shieldCheck", tone: "info", text: "Aprovações sensíveis continuam protegidas." },
  { id: "low-team", icon: "user", tone: "info", text: "Equipe vê a atualização antes de novas ações." },
  { id: "low-audit", icon: "clipboardCheck", tone: "success", text: "Histórico permanece disponível para consulta." }
];

function impactSummaryItemsForState(state: ImpactSummaryState, items?: ImpactSummaryItem[]) {
  if (items) return items;
  if (state === "high") return impactSummaryHighItems;
  if (state === "low") return impactSummaryLowItems;
  return impactSummarySourceItems;
}

export function ImpactSummary({
  state = "medium",
  title = "3. Impacto antes de salvar",
  description = "Resumo do efeito das permissões configuradas.",
  items,
  blockedReason = "Impacto bloqueado até revisar as permissões.",
  className,
  ...props
}: ImpactSummaryProps) {
  const loading = state === "loading";
  const blocked = state === "blocked";
  const resolvedItems = impactSummaryItemsForState(state, items);

  return (
    <Card
      aria-busy={loading || undefined}
      className={cn("tcrm-impact-summary", `tcrm-impact-summary--${state}`, className)}
      data-component="ImpactSummary"
      data-state={state}
      {...props}
    >
      <header className="tcrm-impact-summary__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </header>

      {loading ? (
        <LoadingState className="tcrm-impact-summary__state" showTitle={false} title="Carregando impacto" variant="panel" />
      ) : blocked ? (
        <InlineAlert className="tcrm-impact-summary__state" tone="danger" title="Impacto bloqueado">{blockedReason}</InlineAlert>
      ) : (
        <ul className="tcrm-impact-summary__list" role="list">
          {resolvedItems.map((item) => (
            <li className="tcrm-impact-summary__item" key={item.id}>
              <ListIcon className="tcrm-impact-summary__icon" icon={item.icon} tone={item.tone} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export type BeforeAfterDiffVariant = "text" | "settings" | "policy";
export type BeforeAfterDiffState = "default" | "loading" | "empty" | "error" | "blocked";

export interface BeforeAfterDiffProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: BeforeAfterDiffVariant;
  state?: BeforeAfterDiffState;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  rows?: DiffTableRow[];
  actor?: React.ReactNode;
  actorAvatarSrc?: string;
  actorLabel?: React.ReactNode;
  origin?: React.ReactNode;
  blockedReason?: React.ReactNode;
  error?: React.ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  onRevert?: () => void;
  onRowClick?: (rowId: string) => void;
}

const beforeAfterDiffSourceRows: DiffTableRow[] = [
  { id: "plan", label: "Plano", before: "Profissional", after: "Enterprise", status: "changed" },
  { id: "status", label: "Status", before: "Ativo", after: "Ativo", status: "approved" },
  { id: "limit", label: "Limite de usuários", before: "10", after: "25", status: "added" },
  { id: "renewal", label: "Data de renovação", before: "31/05/2024", after: "31/05/2025", status: "changed" },
  { id: "discount", label: "Desconto (%)", before: "10%", after: "15%", status: "changed" }
];

const beforeAfterDiffTextRows: DiffTableRow[] = [
  { id: "tone", label: "Tom", before: "Neutro", after: "Consultivo", status: "changed" },
  { id: "cta", label: "CTA", before: "Enviar link", after: "Agendar conversa", status: "changed" },
  { id: "guardrail", label: "Regra", before: "Opcional", after: "Obrigatória", status: "added" }
];

const beforeAfterDiffPolicyRows: DiffTableRow[] = [
  { id: "role", label: "Perfil", before: "Recepção", after: "Dono/Admin", status: "changed" },
  { id: "approval", label: "Aprovação", before: "Não exige", after: "Exige aprovação", status: "added" },
  { id: "audit", label: "Auditoria", before: "Parcial", after: "Completa", status: "changed" }
];

function beforeAfterDiffRowsForVariant(variant: BeforeAfterDiffVariant, rows?: DiffTableRow[]) {
  if (rows) return rows;
  if (variant === "text") return beforeAfterDiffTextRows;
  if (variant === "policy") return beforeAfterDiffPolicyRows;
  return beforeAfterDiffSourceRows;
}

export function BeforeAfterDiff({
  variant = "settings",
  state = "default",
  title = "8. Diff antes / depois",
  meta,
  rows,
  actor = "Sam Frank",
  actorAvatarSrc,
  actorLabel = "Ator",
  origin = "Origem API",
  blockedReason = "Diff bloqueado até revisar a política de aprovação.",
  error = "Não foi possível carregar o diff.",
  onApprove,
  onReject,
  onRevert,
  onRowClick,
  className,
  ...props
}: BeforeAfterDiffProps) {
  const resolvedRows = beforeAfterDiffRowsForVariant(variant, rows);

  if (state === "loading") {
    return (
      <Card aria-busy className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <LoadingState className="tcrm-before-after-diff__state" showTitle={false} title="Carregando diff" variant="table" />
      </Card>
    );
  }

  if (state === "empty") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <EmptyState className="tcrm-before-after-diff__state" title="Nenhuma alteração encontrada" />
      </Card>
    );
  }

  if (state === "error") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <ErrorState className="tcrm-before-after-diff__state" title="Erro ao carregar diff" description={error} />
      </Card>
    );
  }

  if (state === "blocked") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <InlineAlert className="tcrm-before-after-diff__state" tone="warning" title="Diff bloqueado">{blockedReason}</InlineAlert>
      </Card>
    );
  }

  return (
    <DiffTable
      actor={actor}
      actorAvatarSrc={actorAvatarSrc}
      actorLabel={actorLabel}
      className={cn("tcrm-before-after-diff", className)}
      compact
      data-component="BeforeAfterDiff"
      fieldHeader=""
      meta={meta}
      onApprove={onApprove}
      onReject={onReject}
      onRevert={onRevert}
      onRowClick={onRowClick}
      origin={origin}
      rows={resolvedRows}
      title={title}
      {...props}
    />
  );
}

export type SettingsSectionState = "source" | "saved" | "dirty" | "blocked" | "loading";
export type SettingsSectionRowControl = "button" | "toggle" | "static";

export interface SettingsSectionRow {
  id: string;
  icon: IconName;
  iconTone?: ComponentTone | "neutral";
  label: React.ReactNode;
  value: React.ReactNode;
  control?: SettingsSectionRowControl;
  checked?: boolean;
  disabled?: boolean;
  actionLabel?: string;
}

export interface SettingsSectionProps extends Omit<CrmSurfaceProps, "action" | "icon" | "state" | "statusLabel"> {
  state?: SettingsSectionState;
  rows?: SettingsSectionRow[];
  statusLabel?: React.ReactNode;
  action?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  blockedReason?: React.ReactNode;
  onRowAction?: (row: SettingsSectionRow) => void;
  onToggleChange?: (row: SettingsSectionRow, checked: boolean) => void;
}

const defaultSettingsSectionRows: SettingsSectionRow[] = [
  { id: "due-date", icon: "calendar", iconTone: "info", label: "Vencimento padrão", value: "Dia 10" },
  { id: "late-tolerance", icon: "clock", iconTone: "warning", label: "Tolerância de atraso", value: "3 dias" },
  { id: "delinquent-after-tolerance", icon: "alert", iconTone: "warning", label: "Marcar inadimplente", value: "Após tolerância" },
  { id: "manual-settlement", icon: "tag", iconTone: "info", label: "Baixa manual", value: "Permitida", control: "toggle", checked: true },
  { id: "simple-discount", icon: "percent", iconTone: "success", label: "Desconto simples", value: "Até 10%" },
  { id: "cancel-charge", icon: "x", iconTone: "danger", label: "Cancelar cobrança", value: "Exige aprovação" }
];

const settingsSectionStatusByState: Partial<Record<SettingsSectionState, { label: string; tone: ComponentTone }>> = {
  saved: { label: "Salvo", tone: "success" },
  dirty: { label: "Alterado", tone: "warning" },
  blocked: { label: "Bloqueado", tone: "blocked" },
  loading: { label: "Salvando", tone: "info" }
};

function settingsSectionActionLabel(row: SettingsSectionRow) {
  return row.actionLabel ?? `Alterar ${typeof row.label === "string" ? row.label : row.id}`;
}

function splitSettingsRows(rows: SettingsSectionRow[]) {
  const midpoint = Math.ceil(rows.length / 2);
  return [rows.slice(0, midpoint), rows.slice(midpoint)] as const;
}

export function SettingsSection({
  title = "2. Regras financeiras simples",
  description = "Limites básicos para cobrança e atraso.",
  rows = defaultSettingsSectionRows,
  state = "source",
  statusLabel,
  action,
  disabled = false,
  loading = false,
  blockedReason,
  onRowAction,
  onToggleChange,
  children,
  className,
  ...props
}: SettingsSectionProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const resolvedLoading = loading || state === "loading";
  const resolvedBlocked = state === "blocked" || Boolean(blockedReason);
  const controlsDisabled = disabled || resolvedLoading || resolvedBlocked;
  const status = statusLabel ?? settingsSectionStatusByState[state]?.label;
  const statusTone = settingsSectionStatusByState[state]?.tone ?? "neutral";
  const columns = splitSettingsRows(rows);

  const renderRow = (row: SettingsSectionRow) => {
    const rowDisabled = controlsDisabled || row.disabled;
    const control = row.control ?? "button";
    const labelText = typeof row.label === "string" ? row.label : row.id;

    return (
      <div className="tcrm-settings-section__row" data-row-id={row.id} key={row.id} role="row">
        <span className="tcrm-settings-section__icon" data-icon={row.icon} data-tone={row.iconTone ?? "neutral"} aria-hidden="true">
          <Icon name={row.icon} size="var(--taliya-control-crm-settings-section-icon-size)" />
        </span>
        <span className="tcrm-settings-section__label" role="cell">{row.label}</span>
        <span className="tcrm-settings-section__value" role="cell">{row.value}</span>
        <span className="tcrm-settings-section__control" role="cell">
          {control === "toggle" ? (
            <Toggle
              aria-label={row.actionLabel ?? `Alternar ${labelText}`}
              className="tcrm-settings-section__toggle"
              compact
              disabled={rowDisabled}
              onPressedChange={(checked) => onToggleChange?.(row, checked)}
              pressed={row.checked}
            />
          ) : control === "button" ? (
            <Button
              aria-label={settingsSectionActionLabel(row)}
              className="tcrm-settings-section__action"
              disabled={rowDisabled}
              onClick={() => onRowAction?.(row)}
              size="sm"
              trailingIcon="chevronDown"
              variant="secondary"
            >
              {settingsSectionActionLabel(row)}
            </Button>
          ) : null}
        </span>
      </div>
    );
  };

  const renderContent = () => {
    if (resolvedLoading) {
      return <LoadingState className="tcrm-settings-section__state" showTitle={false} title="Carregando seção de configurações" variant="panel" />;
    }

    if (children) {
      return <div className="tcrm-settings-section__custom">{children}</div>;
    }

    return (
      <div aria-label="Regras financeiras simples" className="tcrm-settings-section__grid" role="table">
        {columns.map((columnRows, index) => (
          <div aria-label={index === 0 ? "Regras de vencimento" : "Regras de cobrança"} className="tcrm-settings-section__group" key={index} role="rowgroup">
            {columnRows.map(renderRow)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card
      aria-busy={resolvedLoading || undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn("tcrm-settings-section", `tcrm-settings-section--${state}`, className)}
      data-component="SettingsSection"
      data-state={state}
      {...props}
    >
      <header className="tcrm-settings-section__header">
        <span className="tcrm-settings-section__heading">
          <h3 id={titleId}>{title}</h3>
          {description ? <p id={descriptionId}>{description}</p> : null}
        </span>
        {status ? <Chip className="tcrm-settings-section__status" tone={statusTone}>{status}</Chip> : null}
        {action ? <span className="tcrm-settings-section__header-action">{action}</span> : null}
      </header>
      {renderContent()}
      {resolvedBlocked ? (
        <InlineAlert className="tcrm-settings-section__blocked" tone="warning" title="Configuração bloqueada">
          {blockedReason ?? "Somente Dono/Admin pode alterar estas regras."}
        </InlineAlert>
      ) : null}
    </Card>
  );
}

export type PermissionMatrixState = "source" | "dirty" | "read-only" | "blocked" | "loading" | "empty" | "error";

export interface PermissionMatrixSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type PermissionMatrixRow =
  | {
      id: string;
      indexLabel?: React.ReactNode;
      permission: React.ReactNode;
      currentValue: React.ReactNode;
      control: "toggle";
      checked: boolean;
      dirty?: boolean;
      disabled?: boolean;
      controlLabel?: string;
    }
  | {
      id: string;
      indexLabel?: React.ReactNode;
      permission: React.ReactNode;
      currentValue: React.ReactNode;
      control: "select";
      value: string;
      options: PermissionMatrixSelectOption[];
      dirty?: boolean;
      disabled?: boolean;
      controlLabel?: string;
    };

export interface PermissionMatrixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  rows?: PermissionMatrixRow[];
  state?: PermissionMatrixState;
  loading?: boolean;
  readOnly?: boolean;
  blockedReason?: string;
  error?: string;
  onToggleChange?: (rowId: string, checked: boolean, row: PermissionMatrixRow) => void;
  onSelectChange?: (rowId: string, value: string, row: PermissionMatrixRow) => void;
}

const permissionMatrixDefaultRows: PermissionMatrixRow[] = [
  {
    id: "teacher-phone",
    permission: "Professor pode ver telefone/WhatsApp do aluno",
    currentValue: "Desligado",
    control: "toggle",
    checked: false
  },
  {
    id: "teacher-note",
    permission: "Professor pode adicionar observação",
    currentValue: "Ligado",
    control: "toggle",
    checked: true
  },
  {
    id: "frontdesk-payment",
    permission: "Recepção pode registrar pagamento",
    currentValue: "Ligado",
    control: "toggle",
    checked: true
  },
  {
    id: "frontdesk-plan-edit",
    permission: "Recepção pode editar plano do aluno",
    currentValue: "Desligado",
    control: "toggle",
    checked: false
  },
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

export const settingsPermissionsDefaultRows: PermissionMatrixRow[] = permissionMatrixDefaultRows;

export function PermissionMatrix({
  title = "2. Ajustes sensíveis",
  description = "Defina limites importantes para proteger dados e processos.",
  rows = permissionMatrixDefaultRows,
  state = "source",
  loading = false,
  readOnly = false,
  blockedReason,
  error = "Não foi possível carregar permissões.",
  onToggleChange,
  onSelectChange,
  className,
  ...props
}: PermissionMatrixProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const resolvedLoading = loading || state === "loading";
  const resolvedBlocked = state === "blocked" || Boolean(blockedReason);
  const resolvedReadOnly = readOnly || state === "read-only";
  const resolvedEmpty = state === "empty" || rows.length === 0;
  const resolvedError = state === "error";
  const controlsDisabled = resolvedReadOnly || resolvedBlocked;

  const renderState = () => {
    if (resolvedLoading) {
      return <LoadingState className="tcrm-permission-matrix__state" showTitle={false} title="Carregando permissões" variant="panel" />;
    }

    if (resolvedError) {
      return <ErrorState className="tcrm-permission-matrix__state" title="Erro ao carregar permissões" description={error} />;
    }

    if (resolvedBlocked) {
      return (
        <InlineAlert className="tcrm-permission-matrix__state" tone="warning" title="Permissões bloqueadas">
          {blockedReason ?? "Este perfil não pode alterar permissões sensíveis."}
        </InlineAlert>
      );
    }

    if (resolvedEmpty) {
      return <EmptyState className="tcrm-permission-matrix__state" title="Nenhuma permissão configurada" />;
    }

    return (
      <div aria-label="Ajustes sensíveis de permissões" className="tcrm-permission-matrix__table" role="table">
        <div className="tcrm-permission-matrix__head" role="rowgroup">
          <div className="tcrm-permission-matrix__head-row" role="row">
            <span role="columnheader">Permissão</span>
            <span role="columnheader">Valor atual</span>
            <span role="columnheader">Controle</span>
          </div>
        </div>
        <div className="tcrm-permission-matrix__body" role="rowgroup">
          {rows.map((row, index) => {
            const rowDisabled = controlsDisabled || row.disabled;
            const controlLabel = row.controlLabel ?? `Alterar permissão ${row.permission?.toString() ?? row.id}`;
            return (
              <div className={cn("tcrm-permission-matrix__row", row.dirty && "tcrm-permission-matrix__row--dirty")} data-row-id={row.id} key={row.id} role="row">
                <span className="tcrm-permission-matrix__index-cell" role="cell">
                  <span className="tcrm-permission-matrix__index">{row.indexLabel ?? index + 1}</span>
                </span>
                <span className="tcrm-permission-matrix__permission" role="cell">{row.permission}</span>
                <span className="tcrm-permission-matrix__current" role="cell">{row.currentValue}</span>
                <span className="tcrm-permission-matrix__control" role="cell">
                  {row.control === "toggle" ? (
                    <Toggle
                      aria-label={controlLabel}
                      blockedReason={resolvedBlocked ? blockedReason ?? "Permissão bloqueada" : undefined}
                      className="tcrm-permission-matrix__toggle"
                      compact
                      disabled={rowDisabled && !resolvedBlocked}
                      onPressedChange={(checked) => onToggleChange?.(row.id, checked, row)}
                      pressed={row.checked}
                    />
                  ) : (
                    <Select
                      aria-label={controlLabel}
                      blockedReason={resolvedBlocked ? blockedReason ?? "Permissão bloqueada" : undefined}
                      className="tcrm-permission-matrix__select"
                      disabled={rowDisabled && !resolvedBlocked}
                      fieldSize="sm"
                      onValueChange={(value) => onSelectChange?.(row.id, value, row)}
                      options={row.options}
                      value={row.value}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card
      aria-busy={resolvedLoading || undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn("tcrm-permission-matrix", `tcrm-permission-matrix--${state}`, className)}
      data-component="PermissionMatrix"
      data-state={state}
      {...props}
    >
      <header className="tcrm-permission-matrix__header">
        <h3 id={titleId}>{title}</h3>
        {description ? <p id={descriptionId}>{description}</p> : null}
      </header>
      {renderState()}
    </Card>
  );
}

export type RuleRowState = "enabled" | "disabled" | "blocked" | "loading";
export type RuleRowControl = "select" | "value" | "action" | "none";

export interface RuleRowProps extends Omit<CrmSurfaceProps, "action" | "onToggle" | "state"> {
  rowId?: string;
  state?: RuleRowState;
  iconTone?: ComponentTone | "neutral";
  control?: RuleRowControl;
  action?: React.ReactNode;
  value?: React.ReactNode;
  selectOptions?: SelectOption[];
  selectValue?: string;
  defaultSelectValue?: string;
  onSelectChange?: (value: string, rowId?: string) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  onToggle?: (enabled: boolean, rowId?: string) => void;
  showToggle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  blockedReason?: string;
}

const defaultRuleRowSelectOptions: SelectOption[] = [
  { value: "immediate", label: "Imediato" },
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "silent-after-hours", label: "Silenciado fora do horário" }
];

function ruleRowStatusLabel(state: RuleRowState, checked: boolean | undefined, loading?: boolean, statusLabel?: React.ReactNode) {
  if (statusLabel !== undefined) return statusLabel;
  if (loading || state === "loading") return "Salvando";
  if (state === "blocked") return "Bloqueado";
  return checked === false || state === "disabled" ? "Desligado" : "Ligado";
}

export function RuleRow({
  rowId,
  title = "Crítico",
  description,
  state = "enabled",
  statusLabel,
  icon = "alert",
  iconTone = "danger",
  control,
  value,
  selectOptions = defaultRuleRowSelectOptions,
  selectValue,
  defaultSelectValue = "immediate",
  onSelectChange,
  checked,
  defaultChecked,
  onToggle,
  showToggle = true,
  action,
  disabled = false,
  loading = false,
  blockedReason,
  className,
  ...props
}: RuleRowProps) {
  const isBlocked = state === "blocked";
  const isDisabled = disabled || isBlocked || state === "disabled" || loading || state === "loading";
  const resolvedChecked = checked ?? (state === "disabled" ? false : undefined);
  const defaultToggleChecked = defaultChecked ?? state === "enabled";
  const resolvedControl: RuleRowControl = control ?? (action ? "action" : value !== undefined ? "value" : "select");
  const labelText = typeof title === "string" ? title : "regra";
  const statusText = ruleRowStatusLabel(state, resolvedChecked ?? defaultToggleChecked, loading, statusLabel);

  const handleToggle = (nextChecked: boolean) => {
    onToggle?.(nextChecked, rowId);
  };

  const handleSelectChange = (nextValue: string) => {
    onSelectChange?.(nextValue, rowId);
  };

  const renderedControl =
    resolvedControl === "select" ? (
      <Select
        aria-label={`Selecionar valor de ${labelText}`}
        className="tcrm-rule-row__select"
        defaultValue={selectValue === undefined ? defaultSelectValue : undefined}
        disabled={isDisabled}
        fieldSize="sm"
        onValueChange={handleSelectChange}
        options={selectOptions}
        value={selectValue}
      />
    ) : resolvedControl === "action" ? (
      <span className="tcrm-rule-row__action">{action}</span>
    ) : resolvedControl === "value" ? (
      <span className="tcrm-rule-row__value">{value}</span>
    ) : null;

  return (
    <div
      className={cn("tcrm-rule-row", `tcrm-rule-row--${state}`, className)}
      data-component="RuleRow"
      data-state={state}
      {...props}
    >
      <span className="tcrm-rule-row__icon" data-tone={iconTone} aria-hidden="true">
        <Icon name={icon} size="var(--taliya-control-crm-rule-row-icon-size)" />
      </span>
      <span className="tcrm-rule-row__body">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <span className="tcrm-rule-row__control">{renderedControl}</span>
      <span className="tcrm-rule-row__status">
        {showToggle ? (
          <Toggle
            aria-label={`Alternar ${labelText}`}
            blockedReason={isBlocked ? blockedReason ?? "Regra bloqueada" : undefined}
            compact
            defaultPressed={resolvedChecked === undefined ? defaultToggleChecked : undefined}
            disabled={disabled || loading || state === "loading" || state === "disabled"}
            onPressedChange={handleToggle}
            pressed={resolvedChecked}
          />
        ) : null}
        <span>{statusText}</span>
      </span>
    </div>
  );
}

export type SettingsHubCardState =
  | "ready"
  | "invite-pending"
  | "review"
  | "connected"
  | "pending"
  | "blocked"
  | "loading";

export interface SettingsHubCardProps extends Omit<CrmSurfaceProps, "action" | "state" | "statusLabel"> {
  state?: SettingsHubCardState;
  statusLabel?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onOpen?: () => void;
}

const settingsHubCardStatusByState: Record<SettingsHubCardState, string> = {
  ready: "Pronto",
  "invite-pending": "1 convite pendente",
  review: "Revisar",
  connected: "WhatsApp conectado",
  pending: "Pendente",
  blocked: "Bloqueado",
  loading: "Carregando"
};

const settingsHubCardToneByState: Record<SettingsHubCardState, ComponentTone> = {
  ready: "success",
  "invite-pending": "warning",
  review: "warning",
  connected: "success",
  pending: "warning",
  blocked: "paused",
  loading: "info"
};

export function SettingsHubCard({
  title = "Studio",
  description = "Dados, unidades e horarios.",
  state = "ready",
  statusLabel,
  icon = "slidersRound",
  action,
  actionLabel = "Abrir",
  disabled = false,
  loading = false,
  onOpen,
  className,
  ...props
}: SettingsHubCardProps) {
  const isBlocked = state === "blocked";
  const isDisabled = disabled || isBlocked;

  return (
    <Card className={cn("tcrm-settings-hub-card", className)} data-component="SettingsHubCard" data-state={state} disabled={isDisabled} {...props}>
      <span className="tcrm-settings-hub-card__icon">
        <Icon name={icon} size="var(--taliya-control-crm-settings-hub-card-icon-glyph)" strokeWidth="var(--taliya-control-crm-settings-hub-card-icon-stroke)" />
      </span>
      <strong className="tcrm-settings-hub-card__title">{title}</strong>
      {description ? <p className="tcrm-settings-hub-card__description">{description}</p> : null}
      <Chip className="tcrm-settings-hub-card__status" data-state={state} showDot={false} tone={settingsHubCardToneByState[state]}>
        {statusLabel ?? settingsHubCardStatusByState[state]}
      </Chip>
      {action ?? (
        <Button
          blockedReason={isBlocked ? "Configuração bloqueada" : undefined}
          className="tcrm-settings-hub-card__action"
          disabled={disabled}
          loading={loading || state === "loading"}
          onClick={onOpen}
          variant="secondary"
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

export type IntegrationStatusRowState = "connected" | "pending" | "failed" | "blocked" | "loading";
export type IntegrationProvider = "pix" | "card" | "recurrence" | "reconciliation" | "custom";

const integrationStatusDefaults: Record<IntegrationStatusRowState, { helper: string; icon: IconName; label: string }> = {
  connected: { helper: "Ativo", icon: "checkCircle", label: "Conectado" },
  pending: { helper: "Pendente", icon: "clock", label: "Pendente" },
  failed: { helper: "Falha técnica", icon: "alertCircle", label: "Falha técnica" },
  blocked: { helper: "Bloqueado até ativar", icon: "lock", label: "Bloqueado" },
  loading: { helper: "Sincronizando", icon: "loader", label: "Sincronizando" }
};

const integrationProviderIcons: Partial<Record<IntegrationProvider, IconName>> = {
  card: "creditCard",
  recurrence: "refresh",
  reconciliation: "barChart"
};

export interface IntegrationStatusRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: IntegrationStatusRowState;
  provider?: IntegrationProvider;
  providerIcon?: IconName;
  providerLabel?: string;
  statusIcon?: IconName;
  statusLabel?: string;
  showDivider?: boolean;
  disabled?: boolean;
  onAction?: (provider: IntegrationProvider, state: IntegrationStatusRowState) => void;
}

function renderIntegrationProviderMark(provider: IntegrationProvider, providerIcon?: IconName) {
  if (provider === "pix") {
    return (
      <span className="tcrm-integration-status-row__pix-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  const icon = providerIcon ?? integrationProviderIcons[provider] ?? "link";
  return <Icon name={icon} size="var(--taliya-control-crm-integration-status-row-icon-glyph)" strokeWidth={1.85} />;
}

export function IntegrationStatusRow({
  title = "Pix Taliya",
  description,
  state = "blocked",
  provider = "pix",
  providerIcon,
  providerLabel,
  statusIcon,
  statusLabel,
  showDivider = true,
  disabled = false,
  onAction,
  className,
  ...props
}: IntegrationStatusRowProps) {
  const resolved = integrationStatusDefaults[state];
  const helper = description ?? resolved.helper;
  const interactive = Boolean(onAction);
  const content = (
    <>
      <span className={cn("tcrm-integration-status-row__provider", `tcrm-integration-status-row__provider--${provider}`)}>
        {renderIntegrationProviderMark(provider, providerIcon)}
      </span>
      <span className="tcrm-integration-status-row__body">
        <strong>{title}</strong>
        <span className="tcrm-integration-status-row__status">
          <Icon name={statusIcon ?? resolved.icon} size="var(--taliya-control-crm-integration-status-row-status-icon-size)" strokeWidth={2} />
          <span>{helper}</span>
        </span>
      </span>
    </>
  );
  const ariaLabel = providerLabel ?? `${String(title)} - ${statusLabel ?? resolved.label}`;
  const classes = cn("tcrm-integration-status-row", showDivider && "tcrm-integration-status-row--divider", className);

  if (interactive) {
    return (
      <button
        aria-busy={state === "loading" || undefined}
        aria-label={ariaLabel}
        className={classes}
        data-component="IntegrationStatusRow"
        data-provider={provider}
        data-state={state}
        disabled={disabled || state === "loading"}
        onClick={() => onAction?.(provider, state)}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <div
      aria-busy={state === "loading" || undefined}
      aria-label={ariaLabel}
      className={classes}
      data-component="IntegrationStatusRow"
      data-provider={provider}
      data-state={state}
      role="group"
      {...props}
    >
      {content}
    </div>
  );
}

export type UnsavedChangesBarState = "dirty" | "saving" | "saved" | "blocked";

const unsavedChangesStatusLabel: Record<UnsavedChangesBarState, string> = {
  dirty: "Alterações não salvas",
  saving: "Salvando alterações",
  saved: "Alterações salvas",
  blocked: "Salvamento bloqueado"
};

export interface UnsavedChangesBarProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: UnsavedChangesBarState;
  cancelLabel?: React.ReactNode;
  saveLabel?: React.ReactNode;
  savingLabel?: React.ReactNode;
  savedLabel?: React.ReactNode;
  blockedLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export function UnsavedChangesBar({
  state = "dirty",
  cancelLabel = "Cancelar",
  saveLabel = "Salvar alterações",
  savingLabel = "Salvando...",
  savedLabel = "Salvo",
  blockedLabel = "Bloqueado",
  statusLabel,
  disabled = false,
  onSave,
  onCancel,
  className,
  ...props
}: UnsavedChangesBarProps) {
  const saving = state === "saving";
  const saved = state === "saved";
  const blocked = state === "blocked";
  const saveButtonLabel = saving ? savingLabel : saved ? savedLabel : blocked ? blockedLabel : saveLabel;
  const statusText = statusLabel ?? unsavedChangesStatusLabel[state];
  return (
    <div
      aria-busy={saving || undefined}
      aria-label={String(statusText)}
      className={cn("tcrm-unsaved-changes-bar", className)}
      data-component="UnsavedChangesBar"
      data-state={state}
      role="region"
      {...props}
    >
      <Button
        className="tcrm-unsaved-changes-bar__cancel"
        disabled={disabled || saving || blocked}
        onClick={onCancel}
        variant="secondary"
      >
        {cancelLabel}
      </Button>
      <span aria-live="polite" className="tl-sr-only">{statusText}</span>
      <Button
        className="tcrm-unsaved-changes-bar__save"
        disabled={disabled || saved || blocked}
        loading={saving}
        onClick={onSave}
        variant="primary"
      >
        {saveButtonLabel}
      </Button>
    </div>
  );
}

export interface SettingsWorkspaceSaveProps {
  saveState?: UnsavedChangesBarState;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsStudioField = "studioName" | "publicName" | "mainUnit" | "address" | "city" | "state" | "postalCode";

export interface SettingsStudioWorkspaceProps extends Omit<SetupStudioWorkspaceProps, "header" | "details" | "footer" | "onAction">, SettingsWorkspaceSaveProps {
  values?: Partial<Record<SettingsStudioField, string>>;
  onFieldChange?: (field: SettingsStudioField, value: string) => void;
}

export function SettingsStudioWorkspace({
  values = {},
  onFieldChange,
  saveState = "saved",
  onSave,
  onCancel,
  className,
  ...props
}: SettingsStudioWorkspaceProps) {
  const field = (name: SettingsStudioField, fallback: string) => values[name] ?? fallback;
  return (
    <SetupStudioWorkspace
      className={cn("tcrm-settings-inherited-workspace", "tcrm-settings-studio-workspace", className)}
      data-component="SettingsStudioWorkspace"
      details={(
        <section className="tcrm-settings-studio-workspace__identity">
          <h3>Identidade e unidade principal</h3>
          <div className="tcrm-settings-studio-workspace__fields">
            <Input label="Nome do studio" onChange={(event) => onFieldChange?.("studioName", event.currentTarget.value)} value={field("studioName", "Studio Leticia")} />
            <Input label="Nome publico" onChange={(event) => onFieldChange?.("publicName", event.currentTarget.value)} value={field("publicName", "Studio Leticia")} />
            <Input label="Unidade principal" onChange={(event) => onFieldChange?.("mainUnit", event.currentTarget.value)} value={field("mainUnit", "Unidade Centro")} />
            <Input label="Endereco" onChange={(event) => onFieldChange?.("address", event.currentTarget.value)} value={field("address", "Rua das Flores, 120")} />
            <Input label="Cidade" onChange={(event) => onFieldChange?.("city", event.currentTarget.value)} value={field("city", "Sao Paulo")} />
            <Select label="Estado" onValueChange={(value) => onFieldChange?.("state", value)} options={[{ value: "SP", label: "SP" }, { value: "RJ", label: "RJ" }, { value: "MG", label: "MG" }]} value={field("state", "SP")} />
            <Input label="CEP" onChange={(event) => onFieldChange?.("postalCode", event.currentTarget.value)} value={field("postalCode", "01001-000")} />
          </div>
        </section>
      )}
      footer={<UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />}
      header={<SetupBlockHeader description="Edite a identidade do studio e a janela institucional de funcionamento." showBadge={false} title="Studio" />}
      {...props}
    />
  );
}

export type SettingsTeamMemberStatus = "active" | "inactive" | "invitePending";

export interface SettingsTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: SettingsTeamMemberStatus;
  lastAccess: string;
  avatarSrc?: string;
}

const defaultSettingsTeamMembers: SettingsTeamMember[] = [
  { id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42" },
  { id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" },
  { id: "ana", name: "Ana Martins", email: "ana@studio.com", role: "Professor", status: "invitePending", lastAccess: "Convite enviado hoje" }
];

export interface SettingsTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceSaveProps {
  members?: SettingsTeamMember[];
  onInvite?: () => void;
  onOpenPermissions?: () => void;
  onMemberAction?: (member: SettingsTeamMember, action: "edit" | "deactivate" | "reactivate" | "resend") => void;
}

export function SettingsTeamWorkspace({
  members = defaultSettingsTeamMembers,
  saveState = "saved",
  onInvite,
  onOpenPermissions,
  onMemberAction,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsTeamWorkspaceProps) {
  const statusContract: Record<SettingsTeamMemberStatus, { label: string; tone: ComponentTone }> = {
    active: { label: "Ativo", tone: "success" },
    inactive: { label: "Inativo", tone: "neutral" },
    invitePending: { label: "Convite pendente", tone: "warning" }
  };
  return (
    <SetupPagePanel className={cn("tcrm-settings-team-workspace", className)} data-component="SettingsTeamWorkspace" {...props}>
      <SetupBlockHeader description="Gerencie as pessoas que acessam o CRM, seus papeis e o estado dos convites." showBadge={false} title="Equipe" />
      <Panel className="tcrm-settings-team-workspace__panel" compact>
        <InlineGroup justify="between">
          <div><h3>Usuarios do CRM</h3><p>Papeis detalhados continuam em Permissoes.</p></div>
          <Button leadingIcon="plus" onClick={onInvite} variant="secondary">Convidar pessoa</Button>
        </InlineGroup>
        <List divided>
          {members.map((member) => {
            const status = statusContract[member.status];
            const statusAction = member.status === "invitePending" ? "resend" : member.status === "inactive" ? "reactivate" : "deactivate";
            const statusActionLabel = member.status === "invitePending" ? "Reenviar convite" : member.status === "inactive" ? "Reativar" : "Desativar";
            return (
              <ListItem
                action={(
                  <InlineGroup>
                    <Chip tone={status.tone}>{status.label}</Chip>
                    <Button onClick={() => onMemberAction?.(member, "edit")} size="sm" variant="ghost">Editar</Button>
                    <Button onClick={() => onMemberAction?.(member, statusAction)} size="sm" variant="secondary">{statusActionLabel}</Button>
                  </InlineGroup>
                )}
                key={member.id}
                leading={<Avatar name={member.name} size="md" src={member.avatarSrc} />}
                meta={<>{member.email} · Ultimo acesso: {member.lastAccess}</>}
                title={<>{member.name} · {member.role}</>}
              />
            );
          })}
        </List>
        <Button leadingIcon="shield" onClick={onOpenPermissions} variant="ghost">Abrir Permissoes</Button>
      </Panel>
      <UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />
    </SetupPagePanel>
  );
}

export interface SettingsChannelsWorkspaceProps extends Omit<SetupChannelsWorkspaceProps, "header" | "footer" | "onAction">, SettingsWorkspaceSaveProps {}

export function SettingsChannelsWorkspace({ saveState = "saved", onSave, onCancel, className, ...props }: SettingsChannelsWorkspaceProps) {
  return (
    <SetupChannelsWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsChannelsWorkspace"
      footer={<UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />}
      header={<SetupBlockHeader description="Defina os canais oficiais e acompanhe a conexao tecnica sem configurar mensagens ou automacoes." showBadge={false} title="Canais" />}
      {...props}
    />
  );
}

export interface SettingsPlansWorkspaceProps extends Omit<SetupPlansWorkspaceProps, "header" | "footer" | "onAction" | "destructiveAction">, SettingsWorkspaceSaveProps {}

const defaultSettingsPlanStates: NonNullable<SetupPlansWorkspaceProps["planStates"]> = {
  weekly: { label: "Ativo", tone: "success", studentsUsing: 18 },
  pack: { label: "Ativo", tone: "success", studentsUsing: 7 },
  trial: { label: "Inativo", tone: "neutral", studentsUsing: 0 }
};

export function SettingsPlansWorkspace({ planStates = defaultSettingsPlanStates, saveState = "saved", onSave, onCancel, className, ...props }: SettingsPlansWorkspaceProps) {
  return (
    <SetupPlansWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsPlansWorkspace"
      destructiveAction="deactivate"
      footer={<UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />}
      header={<SetupBlockHeader description="Configure o que o aluno compra, o consumo de aulas e as regras simples de reposicao." showBadge={false} title="Planos e modelos" />}
      planStates={planStates}
      {...props}
    />
  );
}

export interface ConfigImpactPreviewProps extends ImpactSummaryProps {}

export function ConfigImpactPreview({
  state = "medium",
  className,
  ...props
}: ConfigImpactPreviewProps) {
  return (
    <ImpactSummary
      className={cn("tcrm-config-impact-preview", className)}
      data-component="ConfigImpactPreview"
      data-state={state}
      state={state}
      {...props}
    />
  );
}

export type PermissionRoleCardTone = "success" | "warning" | "info";

export interface PermissionRoleCardData {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  status: React.ReactNode;
  tone?: PermissionRoleCardTone;
  permissions: React.ReactNode[];
}

export interface PermissionRoleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "onSelect" | "title">, PermissionRoleCardData {
  selected?: boolean;
  onSelect?: (roleId: string) => void;
}

export function PermissionRoleCard({
  id,
  title,
  description,
  icon,
  status,
  tone = "info",
  permissions,
  selected = false,
  onSelect,
  className,
  ...props
}: PermissionRoleCardProps) {
  return (
    <Card
      className={cn("tcrm-permission-role-card", selected && "tcrm-permission-role-card--selected", className)}
      data-component="PermissionRoleCard"
      data-state={selected ? "selected" : "source"}
      data-tone={tone}
      {...props}
    >
      <button aria-pressed={selected} className="tcrm-permission-role-card__select" onClick={() => onSelect?.(id)} type="button">
        <span className="tcrm-permission-role-card__icon"><Icon name={icon} /></span>
        <span className="tcrm-permission-role-card__copy">
          <strong>{title}</strong>
          <small>{description}</small>
          <Chip tone={tone === "success" ? "success" : tone === "warning" ? "warning" : "info"}>{status}</Chip>
        </span>
        <span className="tcrm-permission-role-card__permissions">
          {permissions.map((permission, index) => <span key={index}><Icon name="check" />{permission}</span>)}
        </span>
      </button>
    </Card>
  );
}

const settingsPermissionsDefaultRoles: PermissionRoleCardData[] = [
  {
    id: "owner",
    title: "Dono/Admin",
    description: "Acesso completo ao CRM.",
    icon: "shieldCheck",
    status: "Completo",
    tone: "success",
    permissions: ["Configurações", "Financeiro", "Equipe", "Agentes e fluxos"]
  },
  {
    id: "frontdesk",
    title: "Recepção",
    description: "Operação diária, alunos, agenda e cobranças permitidas.",
    icon: "user",
    status: "Revisar",
    tone: "warning",
    permissions: ["Agenda completa", "Cadastro de alunos", "Presença e faltas", "Baixa manual, se permitido"]
  },
  {
    id: "teacher",
    title: "Professor",
    description: "Aulas, turmas vinculadas e alunos das próprias turmas.",
    icon: "graduation",
    status: "Pronto",
    tone: "info",
    permissions: ["Própria agenda", "Turmas vinculadas", "Chamada", "Observações permitidas"]
  }
];

export interface SettingsPermissionsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  roles?: PermissionRoleCardData[];
  selectedRoleId?: string;
  permissionRows?: PermissionMatrixRow[];
  saveState?: UnsavedChangesBarState;
  onRoleSelect?: (roleId: string) => void;
  onPermissionToggle?: PermissionMatrixProps["onToggleChange"];
  onPermissionSelect?: PermissionMatrixProps["onSelectChange"];
  onSave?: () => void;
  onCancel?: () => void;
}

export function SettingsPermissionsWorkspace({
  roles = settingsPermissionsDefaultRoles,
  selectedRoleId,
  permissionRows,
  saveState = "dirty",
  onRoleSelect,
  onPermissionToggle,
  onPermissionSelect,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPermissionsWorkspaceProps) {
  return (
    <section className={cn("tcrm-settings-permissions-workspace", className)} data-component="SettingsPermissionsWorkspace" {...props}>
      <section className="tcrm-settings-permissions-workspace__roles">
        <header>
          <h3>1. Papéis do CRM</h3>
          <p>Escolha o papel para entender o nível de acesso.</p>
        </header>
        <div className="tcrm-settings-permissions-workspace__role-grid">
          {roles.map((role) => (
            <PermissionRoleCard
              {...role}
              key={role.id}
              onSelect={onRoleSelect}
              selected={role.id === selectedRoleId}
            />
          ))}
        </div>
      </section>
      <PermissionMatrix onSelectChange={onPermissionSelect} onToggleChange={onPermissionToggle} rows={permissionRows} />
      <ConfigImpactPreview />
      <UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />
    </section>
  );
}

export interface SettingsPaymentsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  saveState?: UnsavedChangesBarState;
  ruleRows?: SettingsSectionRow[];
  onMethodSelect?: (method: PaymentMethodRowMethod) => void;
  onRuleAction?: (row: SettingsSectionRow) => void;
  onRuleToggle?: (row: SettingsSectionRow, checked: boolean) => void;
  onActivate?: () => void;
  onTechnicalIntegration?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const settingsPaymentMethods: Array<{
  method: PaymentMethodRowMethod;
  title: string;
  description: string;
}> = [
  { method: "pix", title: "Pix manual", description: "Baixa pela equipe ou comprovante." },
  { method: "cash", title: "Dinheiro", description: "Recebido presencialmente." },
  { method: "card", title: "Cartão presencial", description: "Registrado pela equipe." }
];

const settingsPaymentIntegrations: Array<{
  provider: IntegrationProvider;
  title: string;
}> = [
  { provider: "pix", title: "Pix Taliya" },
  { provider: "card", title: "Cartão online" },
  { provider: "recurrence", title: "Recorrência online" },
  { provider: "reconciliation", title: "Baixa automática e conciliação" }
];

export function SettingsPaymentsWorkspace({
  saveState = "dirty",
  ruleRows,
  onMethodSelect,
  onRuleAction,
  onRuleToggle,
  onActivate,
  onTechnicalIntegration,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPaymentsWorkspaceProps) {
  return (
    <section className={cn("tcrm-settings-payments-workspace", className)} data-component="SettingsPaymentsWorkspace" {...props}>
      <Card className="tcrm-settings-payments-workspace__methods">
        <header>
          <h3>1. Meios e baixa manual</h3>
          <p>Meios que a equipe pode registrar no Taliya.</p>
        </header>
        <div className="tcrm-settings-payments-workspace__method-grid">
          {settingsPaymentMethods.map((method) => (
            <PaymentMethodRow
              description={method.description}
              key={method.method}
              method={method.method}
              onSelect={(selectedMethod) => onMethodSelect?.(selectedMethod)}
              state="connected"
              title={method.title}
            />
          ))}
        </div>
      </Card>

      <SettingsSection onRowAction={onRuleAction} onToggleChange={onRuleToggle} rows={ruleRows} />

      <Card className="tcrm-settings-payments-workspace__taliya">
        <header>
          <span>
            <h3>3. Pagamentos Taliya</h3>
            <p>Ative pagamentos online quando quiser automatizar baixa e recorrência.</p>
          </span>
          <Chip tone="warning">Aguardando ativação</Chip>
        </header>
        <div className="tcrm-settings-payments-workspace__integration-grid">
          {settingsPaymentIntegrations.map((integration, index) => (
            <IntegrationStatusRow
              key={integration.provider}
              provider={integration.provider}
              showDivider={index < settingsPaymentIntegrations.length - 1}
              state="blocked"
              title={integration.title}
            />
          ))}
        </div>
        <footer>
          <Button onClick={onActivate} variant="primary">Ativar Pagamentos Taliya</Button>
          <p>Dados legais e bancários são preenchidos no provedor seguro, fora da Taliya.</p>
          <Button onClick={onTechnicalIntegration} trailingIcon="externalLink" variant="ghost">Ver integração técnica</Button>
        </footer>
      </Card>

      <UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />
    </section>
  );
}

export interface SettingsAgendaRow {
  id: string;
  title: React.ReactNode;
  schedule: React.ReactNode;
  scope?: React.ReactNode;
  status: React.ReactNode;
  statusTone?: ComponentTone;
}

export interface SettingsAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  closedDays?: SettingsAgendaRow[];
  temporaryBlocks?: SettingsAgendaRow[];
  ruleValues?: Partial<SettingsAgendaRuleValues>;
  saveState?: UnsavedChangesBarState;
  onAddException?: () => void;
  onAddBlock?: () => void;
  onRowAction?: (rowId: string, action: "edit" | "open") => void;
  onRuleChange?: (ruleId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export interface SettingsAgendaRuleValues {
  waitlist: boolean;
  fitIns: string;
  callTolerance: string;
}

const settingsAgendaClosedDays: SettingsAgendaRow[] = [
  { id: "christmas", title: "Natal", schedule: "25/12", scope: "Todas as unidades", status: "Fechado", statusTone: "danger" },
  { id: "year-break", title: "Recesso de fim de ano", schedule: "23/12 a 02/01", scope: "Unidade Jardins", status: "Revisar aulas futuras", statusTone: "warning" },
  { id: "special-saturday", title: "Sábado especial", schedule: "Sábados até 12h", scope: "Horário reduzido", status: "Horário reduzido", statusTone: "info" }
];

const settingsAgendaTemporaryBlocks: SettingsAgendaRow[] = [
  { id: "room-maintenance", title: "Manutenção Sala 2", schedule: "28/05, 14h às 18h", status: "Afeta 3 aulas", statusTone: "warning" },
  { id: "internal-workshop", title: "Workshop interno", schedule: "01/06, manhã", status: "Bloqueia novas marcações", statusTone: "info" }
];

export function SettingsAgendaWorkspace({
  closedDays = settingsAgendaClosedDays,
  temporaryBlocks = settingsAgendaTemporaryBlocks,
  ruleValues = {},
  saveState = "dirty",
  onAddException,
  onAddBlock,
  onRowAction,
  onRuleChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsAgendaWorkspaceProps) {
  const resolvedRuleValues: SettingsAgendaRuleValues = { waitlist: true, fitIns: "approval", callTolerance: "10", ...ruleValues };
  const renderRows = (rows: SettingsAgendaRow[], icon: IconName) => (
    <div className="tcrm-settings-agenda-workspace__rows" role="list">
      {rows.map((row) => (
        <div className="tcrm-settings-agenda-workspace__row" key={row.id} role="listitem">
          <Icon name={icon} />
          <strong>{row.title}</strong>
          <span>{row.schedule}</span>
          {row.scope ? <span>{row.scope}</span> : <span />}
          <Chip tone={row.statusTone ?? "neutral"}>{row.status}</Chip>
          <IconButton icon="edit" label={`Editar ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "edit")} size="sm" variant="ghost" />
          <IconButton icon="chevronRight" label={`Abrir ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "open")} size="sm" variant="ghost" />
        </div>
      ))}
    </div>
  );

  return (
    <section className={cn("tcrm-settings-agenda-workspace", className)} data-component="SettingsAgendaWorkspace" {...props}>
      <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>1. Dias fechados e exceções</h3><p>Defina feriados, recessos e horários especiais sem mudar a agenda fixa do studio.</p></span>
          <Button onClick={onAddException} trailingIcon="plus" variant="secondary">Adicionar exceção</Button>
        </header>
        {renderRows(closedDays, "calendar")}
      </Card>

      <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>2. Bloqueios temporários</h3><p>Bloqueie sala, turma ou período quando algo não puder receber marcações.</p></span>
          <Button onClick={onAddBlock} trailingIcon="plus" variant="secondary">Adicionar bloqueio</Button>
        </header>
        {renderRows(temporaryBlocks, "lock")}
      </Card>

      <Card className="tcrm-settings-agenda-workspace__section tcrm-settings-agenda-workspace__rules">
        <header><span><h3>3. Regras simples da agenda</h3><p>Ajustes globais que mudam como a agenda aceita vagas e encaixes.</p></span></header>
        <div>
          <RuleRow checked={resolvedRuleValues.waitlist} control="none" icon="users" onToggle={(checked) => onRuleChange?.("waitlist", checked)} statusLabel={resolvedRuleValues.waitlist ? "Ligada" : "Desligada"} title="Lista de espera" />
          <RuleRow
            icon="slidersRound"
            onSelectChange={(value) => onRuleChange?.("fit-ins", value)}
            selectOptions={[{ value: "approval", label: "Exigem aprovação" }, { value: "free", label: "Livres" }]}
            selectValue={resolvedRuleValues.fitIns}
            showToggle={false}
            statusLabel={null}
            title="Encaixes"
          />
          <RuleRow
            icon="clock"
            onSelectChange={(value) => onRuleChange?.("call-tolerance", value)}
            selectOptions={[{ value: "10", label: "10 min" }, { value: "15", label: "15 min" }]}
            selectValue={resolvedRuleValues.callTolerance}
            showToggle={false}
            statusLabel={null}
            title="Tolerância de chamada"
          />
        </div>
      </Card>

      <UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />
    </section>
  );
}

export interface SettingsNotificationAlert {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export interface SettingsNotificationRole {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  tone: "danger" | "info" | "success";
  alerts: SettingsNotificationAlert[];
}

export interface SettingsNotificationsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  roles?: SettingsNotificationRole[];
  frequencyRules?: Partial<Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue>>;
  channelRules?: Partial<Record<SettingsNotificationChannelId, SettingsNotificationRuleValue>>;
  saveState?: UnsavedChangesBarState;
  onRoleSelect?: (roleId: string) => void;
  onFrequencyChange?: (alertId: string, value: string | boolean) => void;
  onChannelChange?: (channelId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsNotificationFrequencyId = "critical" | "operational" | "informative" | "non-critical";
export type SettingsNotificationChannelId = "taliya" | "email" | "whatsapp" | "after-hours";

export interface SettingsNotificationRuleValue {
  value: string;
  enabled: boolean;
}

const defaultSettingsNotificationFrequencyRules: Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue> = {
  critical: { value: "immediate", enabled: true },
  operational: { value: "daily", enabled: true },
  informative: { value: "weekly", enabled: true },
  "non-critical": { value: "silent-after-hours", enabled: true }
};

const defaultSettingsNotificationChannelRules: Record<SettingsNotificationChannelId, SettingsNotificationRuleValue> = {
  taliya: { value: "enabled", enabled: true },
  email: { value: "owner", enabled: true },
  whatsapp: { value: "critical", enabled: true },
  "after-hours": { value: "critical", enabled: true }
};

const settingsNotificationRoles: SettingsNotificationRole[] = [
  {
    id: "owner", title: "Dono/Admin", description: "Falhas críticas, aprovações sensíveis e financeiro.", icon: "shieldStar", tone: "danger",
    alerts: [
      { id: "integration-failure", label: "Integração com falha", icon: "alert" },
      { id: "critical-payment", label: "Pagamento crítico", icon: "play" },
      { id: "pending-approval", label: "Aprovação pendente", icon: "shield" },
      { id: "config-pending", label: "Pendência de configuração", icon: "alertCircle" }
    ]
  },
  {
    id: "frontdesk", title: "Recepção", description: "Operação diária, agenda, alunos e cobranças manuais.", icon: "user", tone: "info",
    alerts: [
      { id: "class-problem", label: "Aula com problema", icon: "inbox" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "users" },
      { id: "manual-charge", label: "Cobrança manual", icon: "coins" },
      { id: "pending-invite", label: "Convite pendente", icon: "fileText" }
    ]
  },
  {
    id: "teacher", title: "Professor", description: "Aulas, turmas vinculadas e pendências das próprias turmas.", icon: "graduation", tone: "success",
    alerts: [
      { id: "own-class", label: "Aula da própria turma", icon: "calendar" },
      { id: "pending-roll-call", label: "Chamada pendente", icon: "alertCircle" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "user" },
      { id: "important-note", label: "Observação importante", icon: "graduation" }
    ]
  }
];

export function SettingsNotificationsWorkspace({
  roles = settingsNotificationRoles,
  frequencyRules = {},
  channelRules = {},
  saveState = "dirty",
  onRoleSelect,
  onFrequencyChange,
  onChannelChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsNotificationsWorkspaceProps) {
  const frequency = { ...defaultSettingsNotificationFrequencyRules, ...frequencyRules };
  const channels = { ...defaultSettingsNotificationChannelRules, ...channelRules };
  return (
    <section className={cn("tcrm-settings-notifications-workspace", className)} data-component="SettingsNotificationsWorkspace" {...props}>
      <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__roles">
        <header><h3>1. Alertas por papel</h3><p>Escolha quais alertas cada papel da equipe deve receber.</p></header>
        <div className="tcrm-settings-notifications-workspace__role-grid">
          {roles.map((role) => (
            <Button className="tcrm-settings-notifications-workspace__role" key={role.id} onClick={() => onRoleSelect?.(role.id)} variant="ghost">
              <span className="tcrm-settings-notifications-workspace__role-icon" data-tone={role.tone}><Icon name={role.icon} /></span>
              <span className="tcrm-settings-notifications-workspace__role-copy"><strong>{role.title}</strong><small>{role.description}</small></span>
              <span className="tcrm-settings-notifications-workspace__alerts">
                {role.alerts.map((alert) => <Chip icon={alert.icon} key={alert.id} showDot={false} tone={role.tone}>{alert.label}</Chip>)}
              </span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__rules">
        <header><h3>2. Frequência dos alertas</h3><p>Defina quando o Taliya avisa a equipe.</p></header>
        <div className="tcrm-settings-notifications-workspace__rule-head"><span>Nível de alerta</span><span>Frequência</span><span>Status</span></div>
        <RuleRow checked={frequency.critical.enabled} icon="alert" iconTone="danger" onSelectChange={(value) => onFrequencyChange?.("critical", value)} onToggle={(value) => onFrequencyChange?.("critical", value)} rowId="critical" selectValue={frequency.critical.value} title="Crítico" />
        <RuleRow checked={frequency.operational.enabled} icon="alertCircle" iconTone="warning" onSelectChange={(value) => onFrequencyChange?.("operational", value)} onToggle={(value) => onFrequencyChange?.("operational", value)} rowId="operational" selectValue={frequency.operational.value} title="Operacional" />
        <RuleRow checked={frequency.informative.enabled} icon="info" iconTone="info" onSelectChange={(value) => onFrequencyChange?.("informative", value)} onToggle={(value) => onFrequencyChange?.("informative", value)} rowId="informative" selectValue={frequency.informative.value} title="Informativo" />
        <RuleRow checked={frequency["non-critical"].enabled} icon="minus" onSelectChange={(value) => onFrequencyChange?.("non-critical", value)} onToggle={(value) => onFrequencyChange?.("non-critical", value)} rowId="non-critical" selectValue={frequency["non-critical"].value} title="Não crítico" />
      </Card>

      <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__channels">
        <header><h3>3. Canais internos</h3><p>Escolha onde a equipe recebe avisos internos do CRM.</p></header>
        <RuleRow checked={channels.taliya.enabled} control="none" icon="layout" onToggle={(value) => onChannelChange?.("taliya", value)} rowId="taliya" title="Dentro do Taliya" />
        <RuleRow icon="mail" onSelectChange={(value) => onChannelChange?.("email", value)} rowId="email" selectOptions={[{ value: "owner", label: "Ligado para Dono/Admin" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.email.value} showToggle={false} statusLabel={null} title="E-mail interno" />
        <RuleRow icon="whatsapp" iconTone="success" onSelectChange={(value) => onChannelChange?.("whatsapp", value)} rowId="whatsapp" selectOptions={[{ value: "critical", label: "Ligado para alertas críticos" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.whatsapp.value} showToggle={false} statusLabel={null} title="WhatsApp interno" />
        <RuleRow icon="clock" onSelectChange={(value) => onChannelChange?.("after-hours", value)} rowId="after-hours" selectOptions={[{ value: "critical", label: "Somente crítico" }, { value: "silent", label: "Silenciado" }]} selectValue={channels["after-hours"].value} showToggle={false} statusLabel={null} title="Fora do horário" />
      </Card>

      <UnsavedChangesBar onCancel={onCancel} onSave={onSave} state={saveState} />
    </section>
  );
}

export type ConversationListState = "source" | "loading" | "empty" | "blocked";
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
export type TaskDrawerSize = "default" | "compact";
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
  size?: TaskDrawerSize;
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
export type CrmDrawerPlacement = "inline" | "overlay";

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
  placement?: CrmDrawerPlacement;
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
  placement = "inline",
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
        placement !== "inline" && `tcrm-drawer-frame--${placement}`,
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
  size = "default",
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
        size !== "default" && `tcrm-task-drawer--${size}`,
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
  onClose?: () => void;
  onStepToggle?: (step: ChecklistDrawerStep, checked: boolean) => void;
  onContinue?: () => void;
  onCreateTask?: () => void;
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
  onClose,
  onStepToggle,
  onContinue,
  onCreateTask,
  onComplete,
  onOpenOrigin,
  className,
  ...props
}: ChecklistDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const controlsDisabled = isLoading || isBlocked;
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
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--primary" disabled={controlsDisabled} onClick={onContinue} size="sm" variant="primary">
            Continuar
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onCreateTask} size="sm" variant="secondary">
            Criar tarefa
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled || state === "completed"} onClick={onComplete} size="sm" variant="secondary">
            Concluir
          </Button>
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--origin" disabled={controlsDisabled} onClick={onOpenOrigin} size="sm" variant="secondary">
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

export type CaseDrawerState = "open" | "blocked" | "resolved" | "loading";
export type CaseDrawerAction = "open-origin" | "assume" | "delegate" | "create-task" | "request-approval" | "resolve" | "move-status" | "close" | "message" | "pause" | "cancel" | "reserve" | "do-not-contact" | "escalate" | "open-profile" | "open-conversation";

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

export type CaseDrawerSectionKind = "text" | "list" | "alert" | "steps" | "checklist" | "copilot" | "history";

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
  widthVariant?: "default" | "wide";
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
  widthVariant = "default",
  onAction,
  onClose,
  className,
  ...props
}: CaseDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const resolved = state === "resolved";
  const sectionTitle = (label: React.ReactNode, index: number) => {
    if (!numberedSections) return label;
    return `${index}. ${String(label)}`;
  };
  const renderSectionItems = (items: CaseDrawerSectionItem[] | undefined, kind: CaseDrawerSectionKind) => {
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
        widthVariant === "wide" && "tcrm-case-drawer--wide",
        numberedSections && "tcrm-case-drawer--numbered",
        className
      )}
      closeLabel="Fechar caso"
      component="CaseDrawer"
      data-width-variant={widthVariant}
      footer={
        <>
        {footerActions.map((action) => (
          <Button
            className={cn(
              "tcrm-case-drawer__action",
              action.variant === "primary" && "tcrm-case-drawer__action--primary",
              action.fullWidth && "tcrm-case-drawer__action--full"
            )}
            disabled={isBlocked || action.disabled || (resolved && action.id === "resolve")}
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
      }
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

export type StudentDrawerState = "active" | "risk" | "sensitive" | "loading" | "blocked";
export type StudentDrawerAction = "close" | "open-profile" | "message" | "create-task" | "note" | "update-data";

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

export interface StudentDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: StudentDrawerState;
  name?: React.ReactNode;
  avatarSrc?: string;
  statusLabel?: React.ReactNode;
  facts?: StudentDrawerFact[];
  classes?: StudentDrawerClassItem[];
  pendingItems?: StudentDrawerPendingItem[];
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

function emitStudentDrawerAction(action: StudentDrawerAction, onAction?: (action: StudentDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function StudentDrawer({
  open = true,
  state = "active",
  name = "Ana Paula Martins",
  avatarSrc,
  statusLabel = "Ativa",
  facts = sourceStudentDrawerFacts,
  classes = sourceStudentDrawerClasses,
  pendingItems = sourceStudentDrawerPending,
  onAction,
  onClose,
  className,
  ...props
}: StudentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const riskMode = state === "risk";

  const drawerHeader = (
    <header className="tcrm-student-drawer__header">
      <Avatar className="tcrm-student-drawer__avatar" name={String(name)} size="lg" src={avatarSrc} />
      <div>
        <h2>{name}</h2>
        <Chip className={cn("tcrm-student-drawer__status", riskMode && "tcrm-student-drawer__status--risk")} showDot={false}>
          {riskMode ? "Em risco" : statusLabel}
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
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="calendar" onClick={() => emitStudentDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
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
          <div><dt>Status</dt><dd><Chip className="tcrm-student-drawer__payment-chip" showDot={false}>{riskMode ? "em atraso" : "pagamento pendente"}</Chip></dd></div>
          <div><dt>Último pagamento</dt><dd>05/04/2024 <span>R$ 199.00</span></dd></div>
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

export type ClassDrawerState = "open" | "calling" | "saved" | "blocked" | "loading";
export type AttendanceStatus = "pending" | "present" | "warned" | "no-show" | "replacement";
export type ClassDrawerAction =
  | "close"
  | "save-call"
  | "add-note"
  | "create-task"
  | "correct-later"
  | "open-schedule"
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

export type PaymentDrawerState = "due" | "overdue" | "promise" | "paid" | "failed" | "loading" | "blocked";
export type PaymentDrawerAction = "close" | "send-reminder" | "open-charge" | "register-promise" | "copy-pix-link" | "open-conversation" | "mark-paid" | "create-task" | "open-student";

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
  name?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: PaymentDrawerFact[];
  context?: React.ReactNode[];
  history?: PaymentDrawerHistoryItem[];
  copilotSuggestion?: React.ReactNode;
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
  name = "Gabriela Lima",
  amount = "R$ 420,00",
  statusLabel = "Em atraso",
  facts = sourcePaymentDrawerFacts,
  context = sourcePaymentDrawerContext,
  history = sourcePaymentDrawerHistory,
  copilotSuggestion = <>Copiloto, tudo bem? Identificamos que sua mensalidade de R$ 420,00 venceu há 2 dias. Posso te lembrar o link de pagamento?</>,
  onAction,
  onClose,
  className,
  ...props
}: PaymentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const isPaid = state === "paid";
  const isFailed = state === "failed";
  const isDue = state === "due";
  const isMovement = variant === "movement";
  const effectiveStatus = isPaid ? "Pago" : isFailed ? "Falha" : statusLabel;

  return (
    <CrmDrawer
      aria-label="Detalhes da cobrança"
      className={cn("tcrm-payment-drawer", `tcrm-payment-drawer--${state}`, `tcrm-payment-drawer--${variant}`, compact && "tcrm-payment-drawer--compact", className)}
      closeLabel="Fechar cobrança"
      component="PaymentDrawer"
      eyebrow={isMovement ? "Mensalidade" : "Cobrança"}
      footer={(
        <div className="tcrm-payment-drawer__footer">
          <h3>{isMovement ? "Ações" : "Ações principais"}</h3>
          <Button className="tcrm-payment-drawer__primary" disabled={isBlocked} leadingIcon="tag" onClick={() => emitPaymentDrawerAction("send-reminder", onAction)} size="sm" variant="primary">Enviar lembrete</Button>
          <div className="tcrm-payment-drawer__actions">
            {isMovement ? (
              <>
                <Button className="tcrm-payment-drawer__action" disabled={isBlocked} leadingIcon="link" onClick={() => emitPaymentDrawerAction("copy-pix-link", onAction)} size="sm" variant="secondary">Copiar link Pix</Button>
                <Button className="tcrm-payment-drawer__action" disabled={isBlocked} leadingIcon="whatsapp" onClick={() => emitPaymentDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">Abrir conversa</Button>
              </>
            ) : (
              <>
                <Button className="tcrm-payment-drawer__action" disabled={isBlocked} leadingIcon="whatsapp" onClick={() => emitPaymentDrawerAction("open-charge", onAction)} size="sm" variant="secondary">Abrir cobrança</Button>
                <Button className="tcrm-payment-drawer__action" disabled={isBlocked} leadingIcon="calendar" onClick={() => emitPaymentDrawerAction("register-promise", onAction)} size="sm" variant="secondary">Registrar promessa</Button>
              </>
            )}
            <Button className="tcrm-payment-drawer__action" disabled={isBlocked || isPaid} leadingIcon="checkCircle" onClick={() => emitPaymentDrawerAction("mark-paid", onAction)} size="sm" variant="secondary">Marcar como pago</Button>
            <Button className="tcrm-payment-drawer__action" disabled={isBlocked} leadingIcon="calendar" onClick={() => emitPaymentDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
          </div>
          {!isMovement ? <h3>Ação secundária</h3> : null}
          <Button className="tcrm-payment-drawer__student" disabled={isBlocked} leadingIcon="user" onClick={() => emitPaymentDrawerAction("open-student", onAction)} size="sm" trailingIcon="arrowRight" variant="secondary">Abrir aluno</Button>
        </div>
      )}
      headerClassName="tcrm-payment-drawer__header"
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={() => emitPaymentDrawerAction("close", onAction, onClose)}
      state={state}
      status={(
          <span className={cn("tcrm-payment-drawer__status-label", isDue && "tcrm-payment-drawer__status-label--due", isPaid && "tcrm-payment-drawer__status-label--paid", isFailed && "tcrm-payment-drawer__status-label--failed")}>
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

export type ReplacementDrawerState = "requested" | "scheduled" | "blocked" | "loading";
export type ReplacementFitTone = "compatible" | "confirmation" | "conflict";
export type ReplacementDrawerAction = "close" | "reserve-slot" | "send-invite" | "create-task" | "open-conversation" | "open-original-class" | "cancel";

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
  const isScheduled = state === "scheduled";

  return (
    <CrmDrawer
      aria-label="Detalhes da reposição"
      className={cn("tcrm-replacement-drawer", `tcrm-replacement-drawer--${state}`, className)}
      closeLabel="Fechar reposição"
      component="ReplacementDrawer"
      eyebrow="Reposição selecionada"
      footer={(
        <div className="tcrm-replacement-drawer__footer">
          <Button className="tcrm-replacement-drawer__primary" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("reserve-slot", onAction)} size="sm" variant="primary">Reservar vaga</Button>
          <div className="tcrm-replacement-drawer__actions">
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("send-invite", onAction)} size="sm" variant="secondary">Enviar convite</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">Abrir conversa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-original-class", onAction)} size="sm" variant="secondary">Abrir aula original</Button>
          </div>
          <Button className="tcrm-replacement-drawer__cancel" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("cancel", onAction)} size="sm" variant="secondary">Marcar como cancelada</Button>
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
                {fact.id === "status" ? (isScheduled ? "Agendada" : statusLabel) : fact.value}
                {fact.helper ? <small>{fact.helper}</small> : null}
              </dd>
            </div>
          ))}
        </dl>

        <section className="tcrm-replacement-drawer__options" aria-label="Opções de encaixe">
          <h3>Opções de encaixe</h3>
          <ul>
            {options.map((option) => (
              <li key={option.id}>
                <button
                  aria-pressed={Boolean(option.selected)}
                  className={cn("tcrm-replacement-drawer__option", option.selected && "is-selected", `tcrm-replacement-drawer__option--${option.tone}`)}
                  disabled={isBlocked}
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
          </ul>
        </section>

        <section className="tcrm-replacement-drawer__invite" aria-label="Sugestão de convite">
          <h3>Sugestão de convite</h3>
          <div>
            <Icon name="message" size="18px" />
            <p>{inviteSuggestion}</p>
            <IconButton icon="copy" label="Copiar sugestão" size="sm" variant="ghost" />
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

export type LeadDrawerState = "interested" | "trial" | "enrollment" | "lost" | "loading" | "blocked";
export type LeadDrawerAction =
  | "close"
  | "open-conversation"
  | "schedule-trial"
  | "create-follow-up"
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
              onAction={(itemId) => {
                const item = checklistItems.find((candidate) => candidate.id === itemId);
                if (!item || isBlocked || item.disabled) return;
                onChecklistToggle?.(item, !item.checked);
              }}
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

export interface SupportTicketDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: SupportTicketDrawerState;
  variant?: "support" | "internal";
  title?: React.ReactNode;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}

export function SupportTicketDrawer({
  open = true,
  state = "open",
  variant = "support",
  title = "Importação duplicou alunos",
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
        state={state}
        title={title}
        variant={variant}
      />
    </aside>
  );
}

export type TenantSecurityDrawerState = "security review" | "grant access" | "revoked" | "allowed" | "denied" | "warning" | "loading" | "blocked" | "closed";

export type TenantSummaryDrawerState = "active" | "risk" | "loading" | "blocked" | "closed";

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
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  facts?: TenantSummaryDrawerFact[];
  activities?: TenantSummaryDrawerActivity[];
  onClose?: () => void;
  onAction?: (actionId: string) => void;
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

  const footer = (
    <div className="tcrm-tenant-summary-drawer__actions">
      <Button disabled={disabled} leadingIcon="externalLink" onClick={() => onAction?.("open-tenant")} size="sm" variant="primary">Abrir tenant</Button>
      <div>
        {([
          ["support", "Ver suporte"], ["grants", "Ver grants"], ["billing", "Ver billing"],
          ["request-grant", "Solicitar grant"], ["audit", "Ver auditoria"], ["note", "Adicionar nota interna"]
        ] as Array<[string, string]>).map(([id, label]) => <Button disabled={disabled} key={id} onClick={() => onAction?.(id)} size="sm" variant="secondary">{label}</Button>)}
      </div>
    </div>
  );

  return (
    <CrmDrawer
      aria-label="Resumo do tenant selecionado"
      className={cn("tcrm-tenant-summary-drawer", className)}
      component="TenantSummaryDrawer"
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
        <h3>Saúde da conta <Chip tone="success">estável</Chip></h3>
        <p><Icon name="shieldCheck" size="18px" tone="success" />Uso regular, billing em dia e suporte ativo em importação.</p>
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
        <div><h3>Copiloto interno</h3><p>Resumo: acompanhar o ticket de importação antes do grant expirar. Não há incidente crítico neste tenant.</p><small><Icon name="info" size="14px" />Apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.</small></div>
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
          <div className="tcrm-weekly-hours-grid__corner" />
          {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
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
        <div className="tcrm-weekly-hours-grid__corner" />
        {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
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
      aria-disabled={isDisabled || undefined}
      aria-label={`${row.name}, ${row.role}, ${row.status}`}
      aria-selected={selected || undefined}
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
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onOpen ? "button" : "row"}
      tabIndex={onOpen && !isDisabled ? 0 : undefined}
      {...props}
    >
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

interface CrmDomainMetric {
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

function DomainActions({
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
      <main>
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
      </main>
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

export function StudentHeader({
  name,
  state = "active",
  tags,
  avatarSrc,
  phone,
  email,
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

  if (variant === "reference") {
    return (
      <Card className={cn("tcrm-student-header", "tcrm-student-header--reference", className)} data-component="StudentHeader" data-variant="reference">
        <Avatar name={resolvedName} size="lg" src={avatarSrc} />
        <div className="tcrm-student-header__body">
          <div className="tcrm-student-header__identity"><h2>{resolvedName}</h2><Chip showDot={false} tone={toneForState(state)}>{state === "active" ? "Ativo" : state}</Chip></div>
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
        <h2>{resolvedName}</h2>
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
              aria-label="Abrir"
              className={cn("tcrm-enrollment-checklist__item", `tcrm-enrollment-checklist__item--${itemKey}`)}
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

export function SupportTicketPanel({
  title = "Importação duplicou alunos",
  state = "open",
  variant = "support",
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  variant?: "support" | "internal";
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  const key = stateKey(state) || "open";
  const isDisabled = key === "loading" || key === "blocked";

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
        <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--selected" showDot={false} tone="info">Ticket selecionado</Chip>
          <IconButton className="tcrm-support-ticket-panel__close" disabled={isDisabled} icon="x" label="Fechar ticket" onClick={onClose} size="sm" variant="subtle" />
        <h3>{title}</h3>
        <p>Studio pediu ajuda para revisar dados importados</p>
      </header>
      <dl className="tcrm-support-ticket-panel__facts">
        {[
          ["Tipo", "Importação", "folder", "category-purple"],
          ["Status", <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--analysis" key="status" showDot={false} tone="info">Em análise</Chip>, "link", ""],
          ["Impacto", "Dados de alunos", "clipboard", ""],
          ["Responsável", <span className="tcrm-support-ticket-panel__brand-value" key="resp"><Icon name="bot" size="14px" />Taliya</span>, "user", ""],
          ["Prioridade", <span className="tcrm-support-ticket-panel__dot-value" key="priority"><span />Média</span>, "star", ""],
          ["Criado", "hoje 09:12", "calendar", ""],
          ["Próxima ação", <span className="tcrm-support-ticket-panel__next-action" key="next"><Icon name="chevronRight" size="12px" />Enviar arquivo original</span>, "send", ""]
        ].map(([label, value, icon, tone]) => (
          <div key={String(label)}>
            <Icon name={icon as IconName} size="14px" tone={(tone as ComponentTone) || undefined} />
            <dt>{label}</dt>
            <dd>{value as React.ReactNode}</dd>
          </div>
        ))}
      </dl>
      <h4 className="tcrm-support-ticket-panel__section-title">Resumo do agente 24/7</h4>
      <section className="tcrm-support-ticket-panel__suggestion">
        <Icon name="sparkles" size="18px" tone="info" />
        <p>O agente identificou possível duplicidade por telefone e preparou o contexto para o suporte humano.</p>
      </section>
      <section className="tcrm-support-ticket-panel__conversation">
        <h4>Conversa do ticket</h4>
        {[
          ["user", "Studio: Importei a planilha e alguns alunos apareceram duplicados."],
          ["sparkles", "Suporte 24/7: Entendi. Você pode anexar o arquivo original para eu comparar os dados?"],
          ["bot", "Taliya: Vamos revisar a importação e retornar com os registros afetados."]
        ].map(([icon, text], index) => (
          <div className="tcrm-support-ticket-panel__message" key={text}>
            <span><Icon name={icon as IconName} size="18px" tone={index === 0 ? "info" : undefined} /></span>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <section className="tcrm-support-ticket-panel__access">
        <div>
          <h4>Acesso temporário</h4>
          <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--unauthorized" showDot={false} tone="danger">Não autorizado</Chip>
        </div>
        <p><Icon name="lock" size="15px" />A Taliya pode solicitar acesso limitado se precisar investigar dados.</p>
        <Button disabled={isDisabled} leadingIcon="link" onClick={() => onAction?.("access")} size="sm" variant="secondary">Autorizar acesso</Button>
      </section>
      <div className="tcrm-support-ticket-panel__actions">
        <Button disabled={isDisabled} leadingIcon="arrowLeft" onClick={() => onAction?.("reply")} size="sm" variant="primary">Responder</Button>
        <Button disabled={isDisabled} leadingIcon="link" onClick={() => onAction?.("attach")} size="sm" variant="secondary">Anexar arquivo</Button>
        <Button aria-label="Autorizar acesso pelo rodapé" disabled={isDisabled} leadingIcon="lock" onClick={() => onAction?.("access")} size="sm" variant="secondary">Autorizar acesso</Button>
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

const defaultInternalShellCards: InternalOverviewDashboardCard[] = [
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

const defaultInternalShellActivityItems: InternalOverviewDashboardActivityItem[] = [
  { id: "ticket", label: "Marina respondeu ticket", time: "09:42", icon: "shield" },
  { id: "grant", label: "Grant usado por João", time: "09:35", icon: "shield" },
  { id: "billing", label: "Plano atualizado via billing", time: "09:28", icon: "shield" },
  { id: "incident", label: "Incidente S3 criado", time: "09:21", icon: "alert" }
];

const defaultInternalShellFilters: InternalOverviewDashboardFilter[] = [
  { id: "today", label: "Hoje" },
  { id: "week", label: "Esta semana" },
  { id: "owner", label: "Responsável" },
  { id: "status", label: "Status" },
  { id: "risk", label: "Risco" }
];

function InternalShellDefaultActions() {
  return (
    <>
      <Button leadingIcon="plus" size="sm">Novo lead</Button>
      <Button leadingIcon="shield" size="sm" variant="secondary">Abrir ticket interno</Button>
    </>
  );
}

function InternalShellCard({
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

export function InternalOverviewDashboard({
  children,
  className,
  title = "Taliya Interno",
  subtitle = "Operação interna de leads, clientes, suporte e plataforma",
  actions = <InternalShellDefaultActions />,
  searchPlaceholder = "Buscar studio, lead, ticket ou incidente",
  filters = defaultInternalShellFilters,
  cards = defaultInternalShellCards,
  activityTitle = "Atividade interna recente",
  activityItems = defaultInternalShellActivityItems,
  activityActionLabel = "Ver toda atividade",
  copilot = {
    title: "Copiloto interno",
    summary: "Priorize o ticket de importação com grant ativo e o incidente S2 de pagamentos.",
    note: "O copiloto interno apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.",
    actionLabel: "Ver recomendações"
  },
  fluid = false,
  showFilters = true,
  showHeader = true,
  onSearchChange,
  onFilterSelect,
  onCardAction,
  onActivityAction,
  onCopilotAction,
  ...props
}: InternalOverviewDashboardProps) {
  return (
    <section className={cn("tcrm-internal-shell", fluid && "tcrm-internal-shell--fluid", className)} aria-label={String(title)} {...props}>
      {showHeader ? (
        <PageHeader
          actions={actions}
          subtitle={subtitle}
          title={title}
        />
      ) : null}
      {showFilters ? (
        <FilterBar className="tcrm-internal-shell__filters">
          <Input aria-label="Buscar" leadingIcon="search" onChange={(event) => onSearchChange?.(event.currentTarget.value)} placeholder={searchPlaceholder} />
          {filters.map((filter) => <Button key={filter.id} onClick={() => onFilterSelect?.(filter)} size="sm" variant="secondary">{filter.label}</Button>)}
        </FilterBar>
      ) : null}
      {children ?? (
        <>
          <div className="tcrm-internal-shell__cards">
            {cards.map((card) => <InternalShellCard card={card} key={card.id} onCardAction={onCardAction} />)}
          </div>
          <div className="tcrm-internal-shell__bottom">
            <Panel className="tcrm-internal-shell__activity">
              <h3>{activityTitle}</h3>
              {activityItems.map((item) => (
                <p key={item.id}><Icon name={item.icon ?? "shield"} size="14px" />{item.label}<time>{item.time}</time></p>
              ))}
              {activityActionLabel ? <Button onClick={onActivityAction} size="sm" variant="ghost">{activityActionLabel}</Button> : null}
            </Panel>
            <Panel className="tcrm-internal-shell__copilot">
              <h3><Icon name="sparkles" size="20px" />{copilot.title ?? "Copiloto interno"}</h3>
              <strong>{copilot.summary}</strong>
              <p><Icon name="info" size="15px" />{copilot.note}</p>
              {copilot.actionLabel ? <Button onClick={onCopilotAction} size="sm" variant="ghost">{copilot.actionLabel}</Button> : null}
            </Panel>
          </div>
        </>
      )}
    </section>
  );
}

export interface TenantDetailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  footerNote?: React.ReactNode;
}

export function TenantDetailLayout({
  children,
  className,
  footerNote = "Visão interna e segura da Taliya. Acesso e ações sensíveis são auditados. Grants são obrigatórios para diagnóstico em dados operacionais."
}: TenantDetailLayoutProps) {
  return (
    <section className={cn("tcrm-tenant-detail-layout", className)} aria-label="Detalhe do tenant">
      <main className="tcrm-tenant-detail-layout__main">
        {children ?? (
          <>
            <header className="tcrm-tenant-detail-layout__header">
              <Button leadingIcon="arrowLeft" size="sm" variant="secondary">Voltar para clientes</Button>
              <div>
                <h2>Studio Vila Mariana</h2>
                <p>Cliente ativo da Taliya · responsável Marina - CS</p>
              </div>
              <span><Chip tone="success">Ativo</Chip><Chip tone="info">Growth</Chip><Chip tone="success">Grant ativo</Chip></span>
              <div className="tcrm-tenant-detail-layout__actions">
                <Button leadingIcon="shield" size="sm" variant="secondary">Solicitar grant</Button>
                <Button leadingIcon="headphones" size="sm" variant="secondary">Abrir suporte</Button>
                <Button leadingIcon="fileText" size="sm" variant="secondary">Ver auditoria</Button>
                <IconButton icon="more" label="Mais ações" size="sm" variant="subtle" />
              </div>
            </header>
            <section className="tcrm-tenant-detail-layout__summary">
              {[
                ["Status", "Ativo", "circle"],
                ["Plano", "Growth", "sliders"],
                ["Agentes", "3 de 3 ativos", "user"],
                ["Cota", "68% usada", "clock"],
                ["Billing", "Em dia", "creditCard"],
                ["Última atividade", "hoje 10:24", "clock"],
                ["Responsável interno", "Marina - CS", "user"]
              ].map(([label, value, icon]) => (
                <div key={label}><Icon name={icon as IconName} size="15px" /><span>{label}</span><strong>{value}</strong>{label === "Cota" ? <ProgressBar value={68} tone="success" /> : null}</div>
              ))}
            </section>
            <Tabs compact defaultValue="resumo" items={[{ value: "resumo", label: "Resumo", content: (
              <div className="tcrm-tenant-detail-layout__grid">
                <Panel className="tcrm-tenant-detail-layout__health">
                  <h3><span>1.</span> Saúde da conta <Chip tone="success">estável</Chip></h3>
                  <p>Uso regular, billing em dia e suporte ativo em importação.</p>
                  <div><MetricTile label="Tickets abertos" value="1" tone="neutral" /><MetricTile label="Incidentes críticos" value="0" tone="negative" /><MetricTile label="Cota" value="68%" tone="positive" /><MetricTile label="Grants ativos" value="1" tone="neutral" /></div>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__users">
                  <h3><span>2.</span> Usuários do tenant <Button size="sm" variant="ghost">Ver usuários</Button></h3>
                  <div className="tcrm-tenant-detail-layout__user-columns"><span>Usuário</span><span>Perfil</span><span>Status</span><span>Último acesso</span></div>
                  {["Ana Souza", "Marina Lopes", "Sam Frank", "João Silva"].map((name, index) => <p key={name}><Avatar name={name} size="xs" />{name}<span>{index === 0 ? "Dona" : index === 1 ? "Admin" : index === 2 ? "Recepção" : "Professor"}</span><Chip tone="success">ativo</Chip><time>{index < 2 ? "hoje" : "2 dias"}</time></p>)}
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__entitlements">
                  <h3><span>3.</span> Entitlements e uso <Button size="sm" variant="ghost">Ver entitlements</Button></h3>
                  <p><Icon name="clock" size="15px" />Plano <strong>Growth</strong></p>
                  <p><Icon name="users" size="15px" />Agentes <strong>3 slots · 3 ativos</strong></p>
                  <p><Icon name="clock" size="15px" />Cota mensal <strong>68% usada</strong><ProgressBar value={68} tone="success" /></p>
                  <p><Icon name="inbox" size="15px" />Pacote extra <strong>nenhum</strong></p>
                  <p><Icon name="alert" size="15px" />Alertas <Chip tone="success">sem bloqueio</Chip></p>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__support"><h3><span>4.</span> Suporte e tickets <Button size="sm" variant="ghost">Abrir suporte</Button></h3><p>Importação duplicou alunos <Chip tone="info">em análise</Chip><span>Marina</span></p><p>Dúvida sobre configuração de Pix <Chip tone="success">respondido</Chip><span>Marina</span></p></Panel>
                <GrantAccessPanel />
                <Panel className="tcrm-tenant-detail-layout__incidents"><h3><span>6.</span> Incidentes e integrações <Button size="sm" variant="ghost">Ver incidentes</Button></h3>{["0 críticos", "WhatsApp operando", "Pagamentos operando", "Importação em análise"].map((item, index) => <p key={item}><Icon name={index === 0 ? "shieldAlert" : index === 3 ? "cloudOff" : "checkCircle"} size="17px" />{item}</p>)}</Panel>
                <Panel className="tcrm-tenant-detail-layout__audit"><h3><span>7.</span> Auditoria recente <Button size="sm" variant="ghost">Ver auditoria</Button></h3>{["Grant aprovado pelo dono", "Ticket atualizado", "Plano Growth renovado", "Usuário Marina fez login"].map((item, index) => <p key={item}><span />{index === 2 ? "12/05" : "hoje"}<strong>{item}</strong><em>{index === 0 ? "Ana Souza" : index === 3 ? "Marina - Suporte" : "Sistema"}</em></p>)}</Panel>
              </div>
            ) }, { value: "usuarios", label: "Usuários", content: null }, { value: "entitlements", label: "Entitlements", content: null }, { value: "suporte", label: "Suporte", content: null }, { value: "grants", label: "Grants", content: null }, { value: "incidentes", label: "Incidentes", content: null }, { value: "auditoria", label: "Auditoria", content: null }]} />
          </>
        )}
      </main>
      <SecurityRulePanel />
      {footerNote ? <footer className="tcrm-tenant-detail-layout__footer"><Icon name="lock" size="12px" />{footerNote}</footer> : null}
    </section>
  );
}

export function ChartPanel({
  title = "Dinheiro em aberto",
  state = "ready",
  source = "Financeiro",
  period = "Este mês",
  value = "R$ 8.740",
  valueSuffix = "em aberto",
  metricTone = "danger",
  actionLabel = "Abrir financeiro",
  impact = "impacta caixa e conciliação",
  stats,
  icon = "alert",
  layout = "metric",
  onOpen,
  className
}: CrmSurfaceProps & {
  source?: React.ReactNode;
  period?: React.ReactNode;
  value?: React.ReactNode;
  valueSuffix?: React.ReactNode;
  metricTone?: ComponentTone;
  actionLabel?: React.ReactNode;
  impact?: React.ReactNode;
  stats?: Array<{ id: string; label: React.ReactNode; value: React.ReactNode; icon: IconName; tone?: ComponentTone; detail?: React.ReactNode }>;
  layout?: "metric" | "summary" | "exports" | "recommendation";
  variant?: React.ComponentProps<typeof ChartPanelPrimitive>["variant"];
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "ready";
  const metricStats = stats ?? [
    { id: "charges", label: "cobranças", value: "14", icon: "fileText" as const, tone: "danger" as const },
    { id: "failures", label: "falhas", value: "3", icon: "x" as const, tone: "danger" as const },
    { id: "promises", label: "promessas hoje", value: "2", icon: "clock" as const, tone: "warning" as const }
  ];

  return (
    <Panel className={cn("tcrm-report-card", `tcrm-report-card--metric-${metricTone}`, `tcrm-report-card--layout-${layout}`, className)} data-layout={layout} data-state={key} aria-label={String(title)}>
      <header className="tcrm-report-card__header">
        <Icon name={icon} size="20px" tone={toneForState(key === "ready" ? "warning" : key)} />
        <h3>{title}</h3>
      </header>
      {layout === "recommendation" ? null : (
        <div className={cn("tcrm-report-card__meta", layout !== "metric" && "tcrm-report-card__meta--digest")}>
          {layout === "metric" ? <p className="tcrm-report-card__origin">Origem: <strong>{source}</strong></p> : null}
          <span>Período: {period}</span>
        </div>
      )}
      {key === "loading" || key === "empty" ? (
        <ChartPanelPrimitive className="tcrm-report-card__primitive" empty={key === "empty"} loading={key === "loading"} title={String(title)} variant="bar" />
      ) : layout === "summary" || layout === "exports" ? (
        <div className="tcrm-report-card__digest">
          {metricStats.map((item) => (
            <span key={item.id}>
              <Icon name={item.icon} size="16px" tone={item.tone ?? "current"} />
              <span>{item.label}</span>
              <b>{item.value}</b>
              {item.detail ? <small>{item.detail}</small> : null}
            </span>
          ))}
        </div>
      ) : layout === "recommendation" ? (
        <p className="tcrm-report-card__recommendation">{impact}</p>
      ) : (
        <>
          <div className="tcrm-report-card__value"><strong>{value}</strong><span>{valueSuffix}</span></div>
          <div className="tcrm-report-card__stats">
            {metricStats.map((item) => (
              <span key={item.id}>
                <Icon name={item.icon} size="20px" tone={item.tone ?? "current"} />
                <b>{item.value}</b>
                {item.label}
              </span>
            ))}
          </div>
          <p className="tcrm-report-card__impact"><span />Impacto: <strong>{impact}</strong></p>
        </>
      )}
      <Button className="tcrm-report-card__action" onClick={() => onOpen?.()} trailingIcon="chevronRight" type="button" variant="ghost">{actionLabel}</Button>
    </Panel>
  );
}

export function ReportFilterBar({
  onExport,
  className
}: {
  onExport?: () => void;
  className?: string;
}) {
  return (
    <FilterBar className={cn("tcrm-report-filter-bar", className)} aria-label="Filtros de relatórios">
      <Button size="sm" variant="secondary">Hoje</Button>
      <Button size="sm" variant="secondary">Esta semana</Button>
      <Button size="sm" variant="secondary">Este mês</Button>
      <Select aria-label="Unidade" fieldSize="sm" options={[{ value: "unit", label: "Unidade" }]} value="unit" />
      <Select aria-label="Responsável" fieldSize="sm" options={[{ value: "owner", label: "Responsável" }]} value="owner" />
      <Button size="sm" trailingIcon="filter" variant="secondary">Mais filtros</Button>
      <span className="tcrm-report-filter-bar__export-behavior"><ExportAction onExport={onExport} /></span>
    </FilterBar>
  );
}

export interface OpportunityGroupItem {
  id: string;
  name: React.ReactNode;
  subtitle?: React.ReactNode;
  detail: React.ReactNode;
  amount?: React.ReactNode;
  action: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  avatarSrc?: string;
}

export interface OpportunityGroupCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  summary?: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
  items?: OpportunityGroupItem[];
  onOpen?: () => void;
  onItemOpen?: (item: OpportunityGroupItem) => void;
}

const defaultOpportunityGroupItems: OpportunityGroupItem[] = [
  { id: "ana", name: "Ana Souza", subtitle: "Matriculas", detail: "Pagamento inicial pendente", amount: "R$ 420", action: "Enviar Pix", badge: "hoje", badgeTone: "danger" },
  { id: "lucas", name: "Lucas Ferreira", subtitle: "Matriculas", detail: "Faltando CPF", action: "Pedir dado", badge: "bloqueada", badgeTone: "danger" }
];

export function OpportunityGroupCard({
  title = "Matriculas travadas",
  summary = "R$ 1.260 possiveis",
  icon = "lock",
  tone = "danger",
  items = defaultOpportunityGroupItems,
  onOpen,
  onItemOpen,
  className,
  ...props
}: OpportunityGroupCardProps) {
  return (
    <Panel className={cn("tcrm-opportunity-group-card", className)} data-component="OpportunityGroupCard" {...props}>
      <List>
        <ListItem
          action={<Button onClick={onOpen} size="sm" trailingIcon="chevronRight" variant="ghost">{summary}</Button>}
          leading={<Icon name={icon} tone={tone} />}
          title={title}
        />
      </List>
      <List divided>
        {items.map((item) => (
          <ListItem
            action={
              <InlineGroup compact wrap>
                {item.amount ? <strong>{item.amount}</strong> : null}
                <Button onClick={() => onItemOpen?.(item)} size="sm" variant="ghost">{item.action}</Button>
                {item.badge ? <Chip showDot={false} tone={item.badgeTone ?? "neutral"}>{item.badge}</Chip> : null}
              </InlineGroup>
            }
            key={item.id}
            leading={<Avatar name={String(item.name)} size="sm" src={item.avatarSrc} />}
            title={item.name}
          >
            <span>{item.detail}</span>
            {item.subtitle ? <small>{item.subtitle}</small> : null}
          </ListItem>
        ))}
      </List>
    </Panel>
  );
}

export function InternalShell({
  title,
  subtitle,
  brand,
  navItems = internalShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  browserUrl,
  children,
  className,
  contentClassName,
  drawer,
  regions,
  topbarStart,
  topbarCenter,
  topbarEnd,
  pageHeaderActions,
  onBack,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect,
  ...shellProps
}: InternalShellProps) {
  return (
    <CrmProductShell
      {...shellProps}
      avatarSrc={avatarSrc}
      browserUrl={browserUrl}
      brand={brand}
      className={cn("tcrm-internal-product-shell", className)}
      contentClassName={contentClassName}
      drawer={drawer}
      navItems={navItems}
      onBack={onBack}
      onNavChange={onNavChange}
      onSidebarSelect={onSidebarSelect}
      onSidebarUtilitySelect={onSidebarUtilitySelect}
      pageHeaderActions={pageHeaderActions}
      regions={regions}
      sidebarItems={sidebarItems}
      subtitle={subtitle}
      title={title}
      topbarCenter={topbarCenter}
      topbarEnd={topbarEnd}
      topbarStart={topbarStart}
      utilityItems={utilityItems}
      variant="internal"
    >
      {children}
    </CrmProductShell>
  );
}

export interface InternalWorklistPageProps extends Omit<InternalShellProps, "children"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  filterBar: React.ReactNode;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  pageLabel?: string;
  quickFilters: React.ReactNode;
  state?: WorkListDetailPageState;
  worklistClassName?: string;
  worklistLayoutMode?: WorkListDetailPageLayoutMode;
  worklistHeightMode?: WorkListDetailPageHeightMode;
}

export function InternalWorklistPage({
  after,
  children,
  navItems = internalShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  filterBar,
  filterBarLabel,
  listLabel,
  mainLabel,
  pageLabel,
  quickFilters,
  state,
  worklistClassName,
  worklistLayoutMode,
  worklistHeightMode,
  ...shellProps
}: InternalWorklistPageProps) {
  return (
    <CrmPageFamilyShell
      {...shellProps}
      className={cn("tcrm-internal-product-shell", shellProps.className)}
      contentClassName={shellProps.contentClassName}
      contentLayout={shellProps.contentLayout ?? "work-list"}
      navItems={navItems}
      sidebarItems={sidebarItems}
      utilityItems={utilityItems}
      variant="internal"
    >
      <WorkListDetailPage
        className={cn("tcrm-worklist-page-frame", worklistClassName)}
        filterBar={filterBar}
        filterBarLabel={filterBarLabel}
        layoutMode={worklistLayoutMode}
        heightMode={worklistHeightMode}
        listLabel={listLabel}
        mainLabel={mainLabel}
        pageLabel={pageLabel}
        after={after}
        quickFilters={quickFilters}
        state={state}
      >
        {children}
      </WorkListDetailPage>
    </CrmPageFamilyShell>
  );
}

export type PageFilterBarState = "source" | "loading" | "disabled" | "blocked";

export interface PageFilterBarFilter {
  id: string;
  label: React.ReactNode;
  kind?: "single" | "multi" | "quick";
  placement?: "primary" | "advanced";
  options?: Array<{ value: string; label: React.ReactNode; icon?: IconName; disabled?: boolean }>;
  value?: string;
  values?: string[];
  selected?: boolean;
  disabled?: boolean;
}

export interface PageFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  state?: PageFilterBarState;
  density?: "standard" | "comfortable" | "compact" | "tight";
  layout?: "standard" | "stacked" | "stacked-filters";
  query?: string;
  searchVisible?: boolean;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  searchFilterLabel?: string;
  searchFilterPlacement?: "separate" | "embedded";
  searchResultCount?: React.ReactNode;
  filters?: PageFilterBarFilter[];
  filterGroupLabel?: string;
  advancedFiltersLabel?: string;
  advancedFiltersTitle?: React.ReactNode;
  advancedFiltersDescription?: React.ReactNode;
  advancedFiltersSurface?: "popover" | "modal";
  advancedFiltersTriggerVariant?: "icon" | "button";
  advancedFilterGroupLabel?: string;
  leadingActions?: React.ReactNode;
  actions?: React.ReactNode;
  onSearchChange?: (value: string) => void;
  onSearchFilter?: () => void;
  onFilterSelect?: (filter: PageFilterBarFilter) => void;
  onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void;
}

function renderPageFilterBarFilter(
  filter: PageFilterBarFilter,
  controlsDisabled: boolean,
  onFilterSelect?: (filter: PageFilterBarFilter) => void,
  onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void
) {
  if (filter.kind === "quick") {
    return (
      <FilterChip
        className="tcrm-page-filter-bar__quick-filter"
        disabled={controlsDisabled || filter.disabled}
        key={filter.id}
        onClick={() => onFilterSelect?.(filter)}
        selected={filter.selected}
      >
        {filter.label}
      </FilterChip>
    );
  }

  if (filter.kind === "multi") {
    return (
      <FilterMultiSelect
        className="tcrm-page-filter-bar__control"
        disabled={controlsDisabled || filter.disabled}
        key={filter.id}
        label={String(filter.label)}
        onValueChange={(value) => onFilterValueChange?.(filter, value)}
        options={filter.options ?? []}
        value={filter.values ?? []}
      />
    );
  }

  return (
    <FilterSelect
      className="tcrm-page-filter-bar__control"
      disabled={controlsDisabled || filter.disabled}
      key={filter.id}
      label={String(filter.label)}
      onValueChange={(value) => onFilterValueChange?.(filter, value)}
      options={filter.options ?? []}
      value={filter.value ?? ""}
    />
  );
}

export function PageFilterBar({
  state = "source",
  density = "standard",
  layout = "standard",
  query = "",
  searchVisible = true,
  searchPlaceholder = "Buscar...",
  searchAriaLabel = "Buscar",
  searchFilterLabel = "Abrir filtros",
  searchFilterPlacement = "separate",
  searchResultCount,
  filters,
  filterGroupLabel = "Filtros rápidos",
  advancedFiltersLabel = "Mais filtros",
  advancedFiltersTitle = "Filtros",
  advancedFiltersDescription,
  advancedFiltersSurface = "popover",
  advancedFiltersTriggerVariant = "icon",
  advancedFilterGroupLabel = "Filtros avançados",
  leadingActions,
  actions,
  onSearchChange,
  onSearchFilter,
  onFilterSelect,
  onFilterValueChange,
  "aria-label": ariaLabel,
  className,
  ...props
}: PageFilterBarProps) {
  const isLoading = state === "loading";
  const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
  const primaryFilters = filters?.filter((filter) => filter.placement !== "advanced") ?? [];
  const advancedFilters = filters?.filter((filter) => filter.placement === "advanced") ?? [];
  const isStacked = layout === "stacked" || layout === "stacked-filters";
  const primaryQuickFilters = layout === "stacked" ? primaryFilters.filter((filter) => filter.kind === "quick") : [];
  const primaryControlFilters = isStacked ? (layout === "stacked-filters" ? primaryFilters : primaryFilters.filter((filter) => filter.kind !== "quick")) : primaryFilters;
  const selectedAdvancedCount = advancedFilters.filter((filter) => filter.selected || filter.value || (filter.values?.length ?? 0) > 0).length;
  const hasAdvancedFilters = advancedFilters.length > 0;
  const advancedFiltersContent = (
    <div className="tcrm-page-filter-bar__advanced-filters" role="group" aria-label={advancedFilterGroupLabel}>
      {advancedFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
    </div>
  );
  const advancedFiltersTrigger =
    advancedFiltersTriggerVariant === "button" ? (
      <Button
        className="tcrm-page-filter-bar__advanced-trigger tcrm-page-filter-bar__advanced-trigger--button"
        disabled={controlsDisabled}
        leadingIcon="sliders"
        size="sm"
        variant="secondary"
      >
        {advancedFiltersLabel}
      </Button>
    ) : (
      <IconButton
        className="tcrm-page-filter-bar__advanced-trigger"
        disabled={controlsDisabled}
        icon="sliders"
        label={advancedFiltersLabel}
        variant={selectedAdvancedCount > 0 ? "selected" : "default"}
      />
    );

  return (
    <FilterBar
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn(
        "tcrm-page-filter-bar",
        density === "comfortable" && "tcrm-page-filter-bar--comfortable",
        density === "compact" && "tcrm-page-filter-bar--compact",
        density === "tight" && "tcrm-page-filter-bar--tight",
        isStacked && "tcrm-page-filter-bar--stacked",
        !searchVisible && "tcrm-page-filter-bar--without-search",
        className
      )}
      data-component="PageFilterBar"
      data-density={density}
      data-layout={layout}
      data-state={state}
      {...props}
    >
      {isStacked ? (
        <>
          <div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--top">
            {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
            {searchVisible ? (
              <SearchInput
                aria-label={searchAriaLabel}
                className="tcrm-page-filter-bar__search"
                disabled={controlsDisabled}
                filterLabel={searchFilterLabel}
                filterPlacement={searchFilterPlacement}
                loading={isLoading}
                onChange={(event) => onSearchChange?.(event.currentTarget.value)}
                onFilter={onSearchFilter}
                placeholder={searchPlaceholder}
                resultCount={searchResultCount}
                value={query}
              />
            ) : null}
            {primaryQuickFilters.length > 0 ? (
              <div className="tcrm-page-filter-bar__filters tcrm-page-filter-bar__filters--quick" role="group" aria-label={filterGroupLabel}>
                {primaryQuickFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              </div>
            ) : null}
            {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
          </div>
          {primaryControlFilters.length > 0 || hasAdvancedFilters ? (
            <div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--bottom">
              <div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
                {primaryControlFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
                {hasAdvancedFilters ? (
                  advancedFiltersSurface === "modal" ? (
                    <Modal
                      bodyClassName="tcrm-page-filter-bar__advanced-modal-body"
                      className="tcrm-page-filter-bar__advanced-modal"
                      description={advancedFiltersDescription}
                      size="md"
                      title={advancedFiltersTitle}
                      trigger={advancedFiltersTrigger}
                    >
                      {advancedFiltersContent}
                    </Modal>
                  ) : (
                    <Popover
                      align="end"
                      className="tcrm-page-filter-bar__advanced-popover"
                      side="bottom"
                      title={advancedFiltersTitle}
                      trigger={advancedFiltersTrigger}
                      width="md"
                    >
                      {advancedFiltersContent}
                    </Popover>
                  )
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
          {searchVisible ? (
            <SearchInput
              aria-label={searchAriaLabel}
              className="tcrm-page-filter-bar__search"
              disabled={controlsDisabled}
              filterLabel={searchFilterLabel}
              filterPlacement={searchFilterPlacement}
              loading={isLoading}
              onChange={(event) => onSearchChange?.(event.currentTarget.value)}
              onFilter={onSearchFilter}
              placeholder={searchPlaceholder}
              resultCount={searchResultCount}
              value={query}
            />
          ) : null}
          {primaryFilters.length > 0 || hasAdvancedFilters ? (
            <div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
              {primaryFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              {hasAdvancedFilters ? (
                advancedFiltersSurface === "modal" ? (
                  <Modal
                    bodyClassName="tcrm-page-filter-bar__advanced-modal-body"
                    className="tcrm-page-filter-bar__advanced-modal"
                    description={advancedFiltersDescription}
                    size="md"
                    title={advancedFiltersTitle}
                    trigger={advancedFiltersTrigger}
                  >
                    {advancedFiltersContent}
                  </Modal>
                ) : (
                  <Popover
                    align="end"
                    className="tcrm-page-filter-bar__advanced-popover"
                    side="bottom"
                    title={advancedFiltersTitle}
                    trigger={advancedFiltersTrigger}
                    width="md"
                  >
                    {advancedFiltersContent}
                  </Popover>
                )
              ) : null}
            </div>
          ) : null}
          {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
        </>
      )}
    </FilterBar>
  );
}

export type PageQuickFiltersState = "source" | "loading" | "empty" | "disabled" | "blocked";
export type PageQuickFilterTone = "default" | "danger" | "warning" | "info";
export type PageQuickFiltersSelectionTone = "strong" | "soft";

export interface PageQuickFilterItem {
  id: string;
  label: React.ReactNode;
  icon: IconName;
  count?: React.ReactNode;
  tone?: PageQuickFilterTone;
  selected?: boolean;
  disabled?: boolean;
}

export interface PageQuickFiltersProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: PageQuickFiltersState;
  selectionTone?: PageQuickFiltersSelectionTone;
  heading?: React.ReactNode;
  items?: PageQuickFilterItem[];
  groupLabel?: string;
  actions?: React.ReactNode;
  onSelect?: (item: PageQuickFilterItem) => void;
  onItemSelect?: (item: PageQuickFilterItem) => void;
}

const sourcePageQuickFilterItems: PageQuickFilterItem[] = [
  { id: "mine", label: "Minhas pendências", icon: "user", selected: true },
  { id: "unowned", label: "Sem dono", icon: "user" },
  { id: "blocked", label: "Bloqueadas", icon: "lock", tone: "danger" },
  { id: "waiting", label: "Aguardando resposta", icon: "clock", tone: "warning" },
  { id: "quota", label: "Cota / agente", icon: "pieChart", tone: "info" }
];

export function PageQuickFilters({
  state = "source",
  selectionTone = "strong",
  heading = "Filtros rápidos",
  items = sourcePageQuickFilterItems,
  groupLabel = "Lista de filtros rápidos",
  actions,
  onSelect,
  onItemSelect,
  className,
  "aria-label": ariaLabel,
  ...props
}: PageQuickFiltersProps) {
  const isLoading = state === "loading";
  const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
  const rows = state === "empty" ? [] : items;
  const resolvedAriaLabel = ariaLabel ?? (typeof heading === "string" ? heading : "Filtros rápidos");

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label={resolvedAriaLabel}
      className={cn("tcrm-page-quick-filters", className)}
      data-component="PageQuickFilters"
      data-selection-tone={selectionTone}
      data-state={state}
      {...props}
    >
      <h3>{heading}</h3>
      {state === "blocked" ? (
        <InlineAlert tone="warning" title="Filtros rápidos bloqueados">
          A seleção de filtros rápidos está indisponível.
        </InlineAlert>
      ) : null}
      {isLoading ? (
        <LoadingState title="Carregando filtros rápidos" variant="skeleton" />
      ) : rows.length > 0 ? (
        <div className="tcrm-page-quick-filters__list" role="group" aria-label={groupLabel}>
          {rows.map((item) => {
            const disabled = controlsDisabled || item.disabled;

            return (
              <button
                aria-pressed={item.selected || undefined}
                className={cn(
                  "tcrm-page-quick-filters__item",
                  selectionTone === "soft" && "tcrm-page-quick-filters__item--selection-soft",
                  item.tone && item.tone !== "default" && `tcrm-page-quick-filters__item--${item.tone}`
                )}
                disabled={disabled}
                key={item.id}
                onClick={() => {
                  if (!disabled) {
                    onSelect?.(item);
                    onItemSelect?.(item);
                  }
                }}
                type="button"
              >
                <Icon name={item.icon} size="sm" />
                <span className="tcrm-page-quick-filters__item-label">{item.label}</span>
                {item.count != null ? (
                  <Badge className="tcrm-page-quick-filters__item-count" tone="neutral" variant="count">
                    {item.count}
                  </Badge>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Nenhum filtro rápido" description="Os filtros rápidos aparecem aqui." />
      )}
      {actions ? <div className="tcrm-page-quick-filters__actions">{actions}</div> : null}
    </section>
  );
}

export type TaskQueueListState = "source" | "loading" | "empty" | "blocked";
export type TaskQueueListItemTone = "default" | "danger";

export interface TaskQueueListItem {
  id: string;
  label: React.ReactNode;
  count?: React.ReactNode;
  icon: IconName;
  selected?: boolean;
  disabled?: boolean;
  tone?: TaskQueueListItemTone;
}

const sourceTaskQueueListItems: TaskQueueListItem[] = [
  { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user", selected: true },
  { id: "today", label: "Hoje", count: "6", icon: "calendar" },
  { id: "late", label: "Atrasadas", count: "3", icon: "clock", tone: "danger" },
  { id: "unassigned", label: "Sem dono", count: "2", icon: "user" },
  { id: "waiting", label: "Aguardando", count: "8", icon: "tag" },
  { id: "checklists", label: "Checklists", count: "5", icon: "clipboardCheck" },
  { id: "origin", label: "Por origem", icon: "graduation" }
];

export interface TaskQueueListProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  state?: TaskQueueListState;
  heading?: React.ReactNode;
  items?: TaskQueueListItem[];
  onSelect?: (item: TaskQueueListItem) => void;
}

export function TaskQueueList({
  className,
  state = "source",
  heading = "Filas",
  items = sourceTaskQueueListItems,
  onSelect,
  ...props
}: TaskQueueListProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const rows = state === "empty" ? [] : items;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label={typeof heading === "string" ? heading : "Filas de tarefas"}
      className={cn("tcrm-task-queue-list", className)}
      data-component="TaskQueueList"
      data-state={state}
      {...props}
    >
      <h3>{heading}</h3>
      {isBlocked ? <InlineAlert tone="warning" title="Filas bloqueadas">A selecao de filas esta indisponivel.</InlineAlert> : null}
      {isLoading ? (
        <LoadingState title="Carregando filas" variant="skeleton" />
      ) : rows.length > 0 ? (
        <List className="tcrm-task-queue-list__rows" divided>
          {rows.map((item) => {
            const disabled = item.disabled || isBlocked;

            return (
              <FilterChip
                aria-current={item.selected ? "true" : undefined}
                className={cn(
                  "tcrm-task-queue-list__item",
                  item.selected && "is-selected",
                  item.tone === "danger" && "is-danger"
                )}
                count={item.count}
                disabled={disabled}
                key={item.id}
                onClick={() => {
                  if (!disabled) {
                    onSelect?.(item);
                  }
                }}
                selected={item.selected}
              >
                <span className="tcrm-task-queue-list__item-main">
                  <Icon name={item.icon} size="var(--taliya-control-crm-task-queue-list-icon-size)" />
                  <span>{item.label}</span>
                </span>
              </FilterChip>
            );
          })}
        </List>
      ) : (
        <EmptyState title="Nenhuma fila" description="As filas de tarefas aparecem aqui." />
      )}
    </Panel>
  );
}

export type TaskTableState = "source" | "loading" | "empty" | "blocked";
export type TaskTablePriority = "low" | "medium" | "high";
export type TaskTableStatus = "open" | "progress" | "waiting" | "unassigned" | "late" | "done";
export type TaskTableMode = "copilot" | "manual" | "automation" | "none";

export type CrmWorklistTableState = "source" | "loading" | "empty" | "blocked";
export type CrmWorklistTableDensity = "default" | "compact";

export interface CrmWorklistTableColumn<T extends { id: string }> extends DataTableColumn<T> {
  sortValue?: (row: T) => string | number;
}

export interface CrmWorklistTablePagination {
  label: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  page?: number;
  pageCount?: number;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onPageChange?: (page: number) => void;
}

export interface CrmWorklistTableProps<T extends { id: string }> extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  actionColumnWidth?: React.CSSProperties["width"];
  ariaLabel: string;
  blockedDescription?: React.ReactNode;
  blockedTitle?: string;
  caption?: React.ReactNode;
  columns: Array<CrmWorklistTableColumn<T>>;
  emptyDescription?: string;
  emptyTitle?: string;
  density?: CrmWorklistTableDensity;
  heading?: React.ReactNode;
  headingAction?: React.ReactNode;
  headingDescription?: React.ReactNode;
  loadingTitle?: string;
  onRowSelect?: (row: T) => void;
  onSelectionChange?: (rowId: string, selected: boolean) => void;
  pageSizeLabel?: string;
  pagination?: CrmWorklistTablePagination;
  rowActions?: (row: T) => React.ReactNode;
  rows: T[];
  selectable?: boolean;
  selectedRowIds?: string[];
  selectedRowId?: string;
  state?: CrmWorklistTableState;
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState | undefined) => void;
}

function crmWorklistTableSortValue<T extends { id: string }>(row: T, column: CrmWorklistTableColumn<T>) {
  if (column.sortValue) return String(column.sortValue(row));
  const value = row[column.key as keyof T];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

export function CrmWorklistTable<T extends { id: string }>({
  actionColumnWidth,
  ariaLabel,
  blockedDescription = "A lista esta indisponivel.",
  blockedTitle = "Lista bloqueada",
  caption,
  className,
  columns,
  density = "default",
  emptyDescription = "Os registros desta fila aparecem aqui.",
  emptyTitle = "Nenhum registro",
  heading,
  headingAction,
  headingDescription,
  loadingTitle = "Carregando lista",
  onRowSelect,
  onSelectionChange,
  pageSizeLabel,
  pagination,
  rowActions,
  rows,
  selectable,
  selectedRowIds,
  selectedRowId,
  sort,
  state = "source",
  onSortChange,
  ...props
}: CrmWorklistTableProps<T>) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [internalSort, setInternalSort] = React.useState<DataTableSortState | undefined>();
  const activeSort = sort ?? internalSort;
  const controlsDisabled = isLoading || isBlocked;
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!activeSort) return sourceRows;
    const sortedColumn = columns.find((column) => String(column.key) === activeSort.key);
    if (!sortedColumn) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = crmWorklistTableSortValue(first, sortedColumn);
      const secondValue = crmWorklistTableSortValue(second, sortedColumn);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return activeSort.direction === "ascending" ? result : result * -1;
    });
  }, [activeSort, columns, rows, state]);

  const handleSortChange = (nextSort: DataTableSortState) => {
    if (sort === undefined) {
      setInternalSort(nextSort);
    }
    onSortChange?.(nextSort);
  };

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn("tcrm-worklist-table", density !== "default" && `tcrm-worklist-table--${density}`, className)}
      data-component="CrmWorklistTable"
      data-density={density}
      data-state={state}
      {...props}
    >
      {heading ? <PanelHeader compact action={headingAction} description={headingDescription} title={heading} /> : null}
      {isLoading ? (
        <LoadingState title={loadingTitle} variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            actionColumnWidth={actionColumnWidth}
            className="tcrm-worklist-table__data"
            columns={columns}
            density="dense"
            selectable={selectable}
            onRowClick={(row) => {
              if (!controlsDisabled) {
                onRowSelect?.(row);
              }
            }}
            onRowSelect={controlsDisabled ? undefined : onSelectionChange}
            rows={tableRows}
            rowActions={rowActions}
            selectedRowIds={selectedRowIds}
            selectedRowId={selectedRowId}
            sort={activeSort}
            onSortChange={handleSortChange}
          />
          {caption ? <p className="tcrm-worklist-table__caption">{caption}</p> : null}
          {pagination ? (
            <TablePagination
              className="tcrm-worklist-table__pagination"
              itemsPerPageLabel={pageSizeLabel}
              itemsPerPageValue={pagination.itemsPerPage}
              label={String(pagination.label)}
              nextDisabled={controlsDisabled || pagination.nextDisabled}
              onItemsPerPageClick={pagination.onItemsPerPageClick}
              onNext={pagination.onNextPage}
              onPageChange={pagination.onPageChange}
              onPrevious={pagination.onPreviousPage}
              page={pagination.page ?? 1}
              pageCount={pagination.pageCount ?? 1}
              previousDisabled={controlsDisabled || pagination.previousDisabled}
            />
          ) : null}
        </>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
      {isBlocked ? <InlineAlert tone="warning" title={blockedTitle}>{blockedDescription}</InlineAlert> : null}
    </Panel>
  );
}

export interface TaskTableRow {
  id: string;
  title: React.ReactNode;
  owner: React.ReactNode;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: TaskTableStatus;
  origin: React.ReactNode;
  priority: TaskTablePriority;
  activity: React.ReactNode;
  mode: TaskTableMode;
  selected?: boolean;
  disabled?: boolean;
}

const taskTableStatusLabel: Record<TaskTableStatus, string> = {
  open: "Aberta",
  progress: "Em andamento",
  waiting: "Aguardando",
  unassigned: "Sem dono",
  late: "Atrasada",
  done: "Concluída"
};

const taskTablePriorityLabel: Record<TaskTablePriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta"
};

const taskTableModeLabel: Record<TaskTableMode, React.ReactNode> = {
  copilot: <>copiloto<br />sugeriu</>,
  manual: <>manual<br />disponível</>,
  automation: <>automação<br />bloqueada</>,
  none: "—"
};

function taskTableSortValue(
  row: TaskTableRow,
  key: string,
  priorityOrder: Record<TaskTablePriority, number>
) {
  if (key === "priority") return String(priorityOrder[row.priority]);
  if (key === "status") return taskTableStatusLabel[row.status];
  if (key === "mode") return String(taskTableModeLabel[row.mode]);
  const value = row[key as keyof TaskTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

const sourceTaskTableRows: TaskTableRow[] = [
  {
    id: "replace-ana",
    title: "Confirmar reposição da Ana",
    owner: "Recepção",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "open",
    origin: <>Agenda /<br />Reposições</>,
    priority: "medium",
    activity: <>Ana pediu reposição<br />por WhatsApp</>,
    mode: "copilot",
    selected: true
  },
  {
    id: "receipt-marina",
    title: <>Validar comprovante da<br />Marina</>,
    owner: "Financeiro",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Financeiro",
    priority: "high",
    activity: <>Comprovante enviado<br />às 10:12</>,
    mode: "manual"
  },
  {
    id: "phone-responsible",
    title: <>Corrigir telefone do<br />responsável</>,
    owner: "Recepção",
    deadline: "Atrasada",
    deadlineTone: "danger",
    status: "open",
    origin: "Dados",
    priority: "medium",
    activity: <>Contato falhou<br />novamente</>,
    mode: "manual"
  },
  {
    id: "inactive-student",
    title: "Ligar para aluno inativo",
    owner: "Atendimento",
    deadline: "Amanhã",
    status: "waiting",
    origin: "Retenção",
    priority: "medium",
    activity: <>Aguardando janela<br />de contato</>,
    mode: "manual"
  },
  {
    id: "substitute-18h",
    title: "Confirmar substituto aula 18h",
    owner: "Coordenação",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Agenda",
    priority: "high",
    activity: <>Professor titular<br />indisponível</>,
    mode: "manual"
  },
  {
    id: "duplicate-registration",
    title: "Revisar cadastro duplicado",
    owner: "Sem dono",
    deadline: "—",
    status: "unassigned",
    origin: "Dados",
    priority: "low",
    activity: <>Duplicidade detectada<br />pelo CRM</>,
    mode: "automation"
  },
  {
    id: "call-09h",
    title: <>Completar chamada da<br />aula 09h</>,
    owner: "Instrutores",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "late",
    origin: "Agenda / Aula",
    priority: "high",
    activity: <>Chamada ainda<br />incompleta</>,
    mode: "manual"
  },
  {
    id: "contract-signature",
    title: <>Enviar contrato para<br />assinatura</>,
    owner: "Financeiro",
    deadline: "Sexta, 17/05",
    status: "done",
    origin: "Financeiro",
    priority: "medium",
    activity: <>Contrato enviado<br />para aluno</>,
    mode: "none"
  }
];

export interface TaskTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: TaskTableState;
  rows?: TaskTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: TaskTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

export function TaskTable({
  className,
  state = "source",
  rows = sourceTaskTableRows,
  pageLabel = "1-8 de 8",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: TaskTableProps) {
  const columns = React.useMemo<Array<CrmWorklistTableColumn<TaskTableRow>>>(
    () => [
      {
        key: "title",
        header: "Tarefa",
        sortable: true,
        render: (row) => (
          <span className={cn("tcrm-task-table__title-cell", row.selected && "is-selected")}>
            <strong className="tcrm-task-table__title">{row.title}</strong>
          </span>
        ),
        sortValue: (row) => taskTableSortValue(row, "title", { high: 0, medium: 1, low: 2 })
      },
      { key: "owner", header: "Dono / fila", sortable: true, sortValue: (row) => taskTableSortValue(row, "owner", { high: 0, medium: 1, low: 2 }) },
      {
        key: "deadline",
        header: "Prazo",
        sortable: true,
        render: (row) => <span className={cn("tcrm-task-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>,
        sortValue: (row) => taskTableSortValue(row, "deadline", { high: 0, medium: 1, low: 2 })
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (row) => <Chip className={cn("tcrm-task-table__status", `is-${row.status}`)} showDot={false}>{taskTableStatusLabel[row.status]}</Chip>,
        sortValue: (row) => taskTableSortValue(row, "status", { high: 0, medium: 1, low: 2 })
      },
      { key: "origin", header: "Origem canônica", sortable: true, sortValue: (row) => taskTableSortValue(row, "origin", { high: 0, medium: 1, low: 2 }) },
      {
        key: "priority",
        header: "Prior.",
        sortable: true,
        render: (row) => (
          <span className={cn("tcrm-task-table__priority", `is-${row.priority}`)}>
            <i aria-hidden="true" />
            {taskTablePriorityLabel[row.priority]}
          </span>
        ),
        sortValue: (row) => taskTableSortValue(row, "priority", { high: 0, medium: 1, low: 2 })
      },
      { key: "activity", header: "Última atividade", sortable: true, sortValue: (row) => taskTableSortValue(row, "activity", { high: 0, medium: 1, low: 2 }) },
      {
        key: "mode",
        header: "Modo",
        sortable: true,
        render: (row) => <Chip className={cn("tcrm-task-table__mode", `is-${row.mode}`)} showDot={false}>{taskTableModeLabel[row.mode]}</Chip>,
        sortValue: (row) => taskTableSortValue(row, "mode", { high: 0, medium: 1, low: 2 })
      }
    ],
    []
  );

  return (
    <CrmWorklistTable
      ariaLabel="Tabela de tarefas"
      blockedDescription="A lista de tarefas esta indisponivel."
      blockedTitle="Tabela bloqueada"
      className={cn("tcrm-task-table", className)}
      data-component="TaskTable"
      columns={columns}
      emptyDescription="As tarefas da fila aparecem aqui."
      emptyTitle="Nenhuma tarefa"
      loadingTitle="Carregando tarefas"
      pagination={{
        itemsPerPage,
        label: pageLabel,
        onItemsPerPageClick,
        onNextPage,
        onPreviousPage
      }}
      rows={rows}
      selectedRowId={rows.find((row) => row.selected)?.id}
      state={state}
      onRowSelect={(row) => {
        if (!row.disabled) {
          onRowSelect?.(row);
        }
      }}
      {...props}
    />
  );
}

export type LeadTableState = "source" | "loading" | "empty" | "blocked";
export type LeadTableColumnKey =
  | "lead"
  | "origin"
  | "stage"
  | "fit"
  | "priority"
  | "interest"
  | "quality"
  | "nextAction"
  | "humanMode"
  | "lastActivity"
  | "owner";

export interface LeadTableRow {
  id: string;
  lead: React.ReactNode;
  studio?: React.ReactNode;
  origin: React.ReactNode;
  stage: React.ReactNode;
  fit: React.ReactNode;
  fitTone?: ComponentTone;
  priority: React.ReactNode;
  priorityTone?: ComponentTone;
  interest: React.ReactNode;
  quality: React.ReactNode;
  qualityTone?: ComponentTone;
  nextAction: React.ReactNode;
  nextActionTone?: ComponentTone;
  humanMode: React.ReactNode;
  lastActivity: React.ReactNode;
  owner: React.ReactNode;
  sortValues?: Partial<Record<LeadTableColumnKey, string | number>>;
  selected?: boolean;
  disabled?: boolean;
}

export interface LeadTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: LeadTableState;
  rows?: LeadTableRow[];
  pageLabel?: React.ReactNode;
  page?: number;
  pageCount?: number;
  itemsPerPage?: React.ReactNode;
  totalLabel?: React.ReactNode;
  onRowSelect?: (row: LeadTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onPageChange?: (page: number) => void;
}

function leadTableSortValue(row: LeadTableRow, key: string) {
  const columnKey = key as LeadTableColumnKey;
  const explicitValue = row.sortValues?.[columnKey];
  if (explicitValue != null) return String(explicitValue);
  const value = row[columnKey as keyof LeadTableRow];
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

const sourceLeadTableRows: LeadTableRow[] = [
  {
    id: "lead-ana",
    lead: "Ana Silva",
    studio: "Studio Vila Mariana",
    origin: "WhatsApp",
    stage: "Novo",
    fit: "Alto",
    fitTone: "success",
    priority: "Alta",
    priorityTone: "danger",
    interest: "Busca pilates duas vezes por semana",
    quality: "Aprovado",
    qualityTone: "success",
    nextAction: "Responder hoje",
    nextActionTone: "warning",
    humanMode: "Humano",
    lastActivity: "Hoje, 09:12",
    owner: "Recepcao"
  },
  {
    id: "lead-marina",
    lead: "Marina Costa",
    studio: "Studio Moema",
    origin: "Landing",
    stage: "Experimental",
    fit: "Medio",
    fitTone: "warning",
    priority: "Media",
    priorityTone: "warning",
    interest: "Quer reposicao por dor lombar",
    quality: "Revisar",
    qualityTone: "warning",
    nextAction: "Agendar experimental",
    nextActionTone: "info",
    humanMode: "IA com revisao",
    lastActivity: "Ontem, 17:40",
    owner: "Sam"
  }
];

export function LeadTable({
  className,
  state = "source",
  rows = sourceLeadTableRows,
  pageLabel,
  page = 1,
  pageCount = 1,
  itemsPerPage = "10",
  totalLabel,
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  onPageChange,
  ...props
}: LeadTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const result = leadTableSortValue(first, sort.key).localeCompare(leadTableSortValue(second, sort.key), "pt-BR", {
        numeric: true,
        sensitivity: "base"
      });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;
  const resolvedPageLabel = pageLabel ?? `${tableRows.length} leads`;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de leads"
      className={cn("tcrm-lead-table", className)}
      data-component="LeadTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando leads" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-lead-table__data"
            columns={[
              {
                key: "lead",
                header: "Lead / studio",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-lead-table__lead-cell", row.selected && "is-selected")}>
                    <strong className="tcrm-lead-table__lead">{row.lead}</strong>
                    {row.studio ? <span>{row.studio}</span> : null}
                  </span>
                )
              },
              { key: "origin", header: "Origem", sortable: true },
              { key: "stage", header: "Etapa", sortable: true, render: (row) => <Chip showDot={false}>{row.stage}</Chip> },
              { key: "fit", header: "Fit", sortable: true, render: (row) => <Chip showDot={false} tone={row.fitTone ?? "neutral"}>{row.fit}</Chip> },
              {
                key: "priority",
                header: "Prioridade",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.priorityTone ?? "neutral"}>{row.priority}</Chip>
              },
              { key: "interest", header: "Dor / interesse", sortable: true, render: (row) => <span className="tcrm-lead-table__muted-cell">{row.interest}</span> },
              {
                key: "quality",
                header: "Qualidade",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.qualityTone ?? "neutral"}>{row.quality}</Chip>
              },
              {
                key: "nextAction",
                header: "Proxima acao",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.nextActionTone ?? "neutral"}>{row.nextAction}</Chip>
              },
              { key: "humanMode", header: "IA / humano", sortable: true },
              { key: "lastActivity", header: "Ultima atividade", sortable: true },
              { key: "owner", header: "Dono", sortable: true }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-lead-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(totalLabel ?? resolvedPageLabel)}
            nextDisabled={controlsDisabled || page >= pageCount}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPageChange={onPageChange}
            onPrevious={onPreviousPage}
            page={page}
            pageCount={pageCount}
            previousDisabled={controlsDisabled || page <= 1}
          />
        </>
      ) : (
        <EmptyState title="Nenhum lead" description="Os leads aparecem aqui quando os filtros retornam resultados." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de leads esta indisponivel.</InlineAlert> : null}
    </Panel>
  );
}

export type CrmRecordDrawerState = "source" | "loading" | "blocked";

export interface CrmRecordDrawerFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface CrmRecordDrawerSection {
  id: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  subtle?: boolean;
  compact?: boolean;
}

export interface CrmRecordDrawerAction {
  id: string;
  label: React.ReactNode;
  variant?: ButtonVariant;
  leadingIcon?: IconName;
  disabled?: boolean;
}

export interface CrmRecordDrawerTab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface CrmRecordDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  state?: CrmRecordDrawerState;
  open?: boolean;
  title: React.ReactNode;
  meta?: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  facts?: CrmRecordDrawerFact[];
  sections?: CrmRecordDrawerSection[];
  tabs?: CrmRecordDrawerTab[];
  activeTab?: string;
  defaultTab?: string;
  tabsLabel?: string;
  actions?: CrmRecordDrawerAction[];
  blockedReason?: React.ReactNode;
  inline?: boolean;
  onTabChange?: (tabId: string) => void;
  onOpenChange?: (open: boolean) => void;
  onAction?: (action: CrmRecordDrawerAction) => void;
}

export function CrmRecordDrawer({
  state = "source",
  open = true,
  title,
  meta,
  description,
  status,
  facts = [],
  sections = [],
  tabs = [],
  activeTab,
  defaultTab,
  tabsLabel = "Abas do registro",
  actions = [],
  blockedReason,
  onTabChange,
  onOpenChange,
  onAction,
  className,
  children,
  ...props
}: CrmRecordDrawerProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const drawerFooter = actions.length > 0 ? (
    <div className="tcrm-record-drawer__actions">
      {actions.map((action) => (
        <Button
          className="tcrm-record-drawer__action"
          disabled={isBlocked || action.disabled}
          key={action.id}
          leadingIcon={action.leadingIcon}
          onClick={() => onAction?.(action)}
          size="sm"
          variant={action.variant ?? "secondary"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  ) : null;

  return (
    <Drawer
      blockedReason={blockedReason}
      className={cn("tcrm-record-drawer", className)}
      data-component="CrmRecordDrawer"
      data-state={state}
      description={description}
      footer={drawerFooter}
      footerLayout="stack"
      headerStatus={status}
      loading={isLoading}
      onOpenChange={onOpenChange}
      open={open}
      size="md"
      title={title}
      headerMeta={meta}
      {...props}
    >
      {facts.length > 0 ? (
        <div className="tcrm-record-drawer__facts">
          {facts.map((fact) => (
            <div className={cn("tcrm-record-drawer__fact", fact.tone && `tcrm-record-drawer__fact--${fact.tone}`)} key={fact.id}>
              {fact.icon ? <Icon name={fact.icon} size="sm" /> : null}
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
      {sections.map((section) => (
        <DrawerSection compact={section.compact} key={section.id} subtle={section.subtle} title={section.title}>
          {section.content}
        </DrawerSection>
      ))}
      {tabs.length > 0 ? (
        <Tabs
          aria-label={tabsLabel}
          className="tcrm-record-drawer__tabs"
          compact
          defaultValue={defaultTab ?? tabs[0]?.id}
          items={tabs.map((tab) => ({ value: tab.id, label: tab.label, content: tab.content, disabled: tab.disabled }))}
          onValueChange={onTabChange}
          value={activeTab}
        />
      ) : null}
      {children}
    </Drawer>
  );
}

export type ChecklistTableState = "source" | "loading" | "empty" | "blocked";
export type ChecklistTableStatus = "progress" | "blocked" | "pending" | "review" | "done";

export interface ChecklistTableOwner {
  name: React.ReactNode;
  avatarSrc?: string;
  helper?: React.ReactNode;
}

export interface ChecklistTableProgress {
  completed: number;
  total: number;
}

export interface ChecklistTableRow {
  id: string;
  index: number;
  title: React.ReactNode;
  type: React.ReactNode;
  progress: ChecklistTableProgress;
  owner: ChecklistTableOwner;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: ChecklistTableStatus;
  nextStep: React.ReactNode;
  activity: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ChecklistTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ChecklistTableState;
  rows?: ChecklistTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ChecklistTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const checklistTableStatusLabel: Record<ChecklistTableStatus, string> = {
  progress: "Em andamento",
  blocked: "Bloqueado",
  pending: "Pendente",
  review: "Em revisão",
  done: "Concluído"
};

const checklistTableStatusTone: Record<ChecklistTableStatus, ComponentTone> = {
  progress: "info",
  blocked: "danger",
  pending: "warning",
  review: "paused",
  done: "success"
};

const sourceChecklistTableRows: ChecklistTableRow[] = [
  {
    id: "opening",
    index: 1,
    title: "Abertura do estúdio",
    type: "Abertura",
    progress: { completed: 3, total: 5 },
    owner: { name: "Mariana" },
    deadline: <>Hoje<br />08:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Conferir salas",
    activity: "07:42",
    selected: true
  },
  {
    id: "daily-agenda",
    index: 2,
    title: "Revisão diária da agenda",
    type: "Agenda",
    progress: { completed: 4, total: 7 },
    owner: { name: "Lucas" },
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "blocked",
    nextStep: <>Resolver conflito<br />de sala</>,
    activity: "08:15"
  },
  {
    id: "closing",
    index: 3,
    title: "Fechamento do dia",
    type: "Fechamento",
    progress: { completed: 0, total: 6 },
    owner: { name: "Coordenação", helper: "Equipe" },
    deadline: <>Hoje<br />20:00</>,
    deadlineTone: "danger",
    status: "pending",
    nextStep: <>Iniciar<br />conferência</>,
    activity: "—"
  },
  {
    id: "agent-setup",
    index: 4,
    title: "Setup do agente de agenda",
    type: "Agentes",
    progress: { completed: 5, total: 8 },
    owner: { name: "Gestor" },
    deadline: "Amanhã",
    status: "review",
    nextStep: <>Validar fallback<br />manual</>,
    activity: "11:10"
  },
  {
    id: "new-student",
    index: 5,
    title: "Onboarding de novo aluno",
    type: "Alunos",
    progress: { completed: 6, total: 9 },
    owner: { name: "Recepção" },
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Validar contrato",
    activity: "13:20"
  }
];

function checklistTableSortValue(row: ChecklistTableRow, key: string) {
  if (key === "progress") return String(row.progress.completed / Math.max(row.progress.total, 1));
  if (key === "owner") return String(row.owner.name);
  if (key === "status") return checklistTableStatusLabel[row.status];
  const value = row[key as keyof ChecklistTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ChecklistTableProgressCell({ progress }: { progress: ChecklistTableProgress }) {
  const normalized = Math.max(0, Math.min(100, Math.round((progress.completed / Math.max(progress.total, 1)) * 100)));
  return (
    <span className="tcrm-checklist-table__progress">
      <span
        aria-label={`${progress.completed} de ${progress.total} passos concluídos`}
        aria-valuemax={progress.total}
        aria-valuemin={0}
        aria-valuenow={progress.completed}
        className="tcrm-checklist-table__progress-ring"
        role="progressbar"
        style={{ "--tcrm-checklist-table-progress": `${normalized}%` } as React.CSSProperties}
      />
      <strong>{progress.completed}/{progress.total}</strong>
    </span>
  );
}

export function ChecklistTable({
  className,
  state = "source",
  rows = sourceChecklistTableRows,
  pageLabel = "1-5 de 12",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ChecklistTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = checklistTableSortValue(first, sort.key);
      const secondValue = checklistTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de checklists"
      className={cn("tcrm-checklist-table", className)}
      data-component="ChecklistTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando checklists" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-checklist-table__data"
            columns={[
              {
                key: "title",
                header: "Checklist",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-checklist-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-checklist-table__index">{row.index}.</span>
                    <strong className="tcrm-checklist-table__title">{row.title}</strong>
                  </span>
                )
              },
              { key: "type", header: "Tipo", sortable: true },
              {
                key: "progress",
                header: "Progresso",
                sortable: true,
                render: (row) => <ChecklistTableProgressCell progress={row.progress} />
              },
              {
                key: "owner",
                header: "Responsável",
                sortable: true,
                render: (row) => (
                  <span className="tcrm-checklist-table__owner">
                    <Avatar name={String(row.owner.name)} size="xs" src={row.owner.avatarSrc} />
                    <span>
                      <strong>{row.owner.name}</strong>
                      {row.owner.helper ? <small>{row.owner.helper}</small> : null}
                    </span>
                  </span>
                )
              },
              {
                key: "deadline",
                header: "Prazo",
                sortable: true,
                render: (row) => <span className={cn("tcrm-checklist-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => (
                  <Chip className={cn("tcrm-checklist-table__status", `is-${row.status}`)} showDot={false} tone={checklistTableStatusTone[row.status]}>
                    {checklistTableStatusLabel[row.status]}
                  </Chip>
                )
              },
              { key: "nextStep", header: "Próximo passo", sortable: true },
              { key: "activity", header: "Última atividade", sortable: true, align: "right" }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-checklist-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={2}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhum checklist" description="As rotinas operacionais aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de checklists esta indisponivel.</InlineAlert> : null}
    </Panel>
  );
}

export type ApprovalTableState = "source" | "loading" | "empty" | "blocked";
export type ApprovalTableType = "message" | "agenda" | "finance" | "announcement" | "agent" | "data";
export type ApprovalTableRisk = "low" | "medium" | "high";
export type ApprovalTableStatus = "pending" | "review" | "blocked";

export interface ApprovalTableRequester {
  name: React.ReactNode;
  avatarSrc?: string;
  icon?: IconName;
}

export interface ApprovalTableRow {
  id: string;
  index: number;
  title: React.ReactNode;
  type: ApprovalTableType;
  origin: React.ReactNode;
  requester: ApprovalTableRequester;
  risk: ApprovalTableRisk;
  cost: React.ReactNode;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: ApprovalTableStatus;
  activity: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ApprovalTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ApprovalTableState;
  rows?: ApprovalTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ApprovalTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const approvalTableTypeLabel: Record<ApprovalTableType, string> = {
  message: "Mensagem",
  agenda: "Agenda",
  finance: "Financeiro",
  announcement: "Comunicado",
  agent: "Agente",
  data: "Dados"
};

const approvalTableTypeIcon: Record<ApprovalTableType, IconName> = {
  message: "message",
  agenda: "calendar",
  finance: "wallet",
  announcement: "send",
  agent: "user",
  data: "database"
};

const approvalTableRiskLabel: Record<ApprovalTableRisk, string> = {
  low: "Baixo",
  medium: "Médio",
  high: "Alto"
};

const approvalTableStatusLabel: Record<ApprovalTableStatus, React.ReactNode> = {
  pending: "Pendente",
  review: "Em revisão",
  blocked: <>Bloqueada<br />por política</>
};

const approvalTableStatusTone: Record<ApprovalTableStatus, ComponentTone> = {
  pending: "warning",
  review: "info",
  blocked: "danger"
};

const sourceApprovalTableRows: ApprovalTableRow[] = [
  {
    id: "ana-message",
    index: 1,
    title: <>Aprovar mensagem<br />para Ana Paula</>,
    type: "message",
    origin: <>WhatsApp /<br />Agente de<br />atendimento</>,
    requester: { name: "Copiloto", icon: "sparkles" },
    risk: "low",
    cost: "1 crédito",
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestão gerada<br />às 09:18</>,
    selected: true
  },
  {
    id: "agenda-change",
    index: 2,
    title: <>Aprovar alteração<br />de agenda</>,
    type: "agenda",
    origin: "Reposição",
    requester: { name: "Recepção", icon: "user" },
    risk: "medium",
    cost: <>Impacto<br />4 alunos</>,
    deadline: <>Hoje<br />11:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Conflito de sala<br />detectado</>
  },
  {
    id: "financial-exception",
    index: 3,
    title: <>Aprovar exceção<br />financeira</>,
    type: "finance",
    origin: <>Desconto<br />manual</>,
    requester: { name: "Mariana" },
    risk: "medium",
    cost: "R$ 120",
    deadline: <>Hoje<br />14:00</>,
    deadlineTone: "danger",
    status: "review",
    activity: <>Caixa solicitou<br />validação</>
  },
  {
    id: "replacement-announcement",
    index: 4,
    title: <>Aprovar comunicado<br />de reposição</>,
    type: "announcement",
    origin: <>Segmento<br />alunos afetados</>,
    requester: { name: <>Agente de<br />comunicação</>, icon: "user" },
    risk: "low",
    cost: "Cota 82%",
    deadline: "Amanhã",
    status: "pending",
    activity: <>Rascunho pronto<br />para envio</>
  },
  {
    id: "agent-action",
    index: 5,
    title: <>Aprovar ação<br />autônoma bloqueada</>,
    type: "agent",
    origin: <>Fluxo de<br />agenda</>,
    requester: { name: <>Agente de<br />agenda</>, icon: "user" },
    risk: "high",
    cost: "3 créditos",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "blocked",
    activity: <>Guardrail<br />interrompeu<br />execução</>
  },
  {
    id: "data-correction",
    index: 6,
    title: <>Aprovar correção<br />de cadastro</>,
    type: "data",
    origin: <>Telefone do<br />responsável</>,
    requester: { name: "CRM", icon: "user" },
    risk: "low",
    cost: "—",
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestão de<br />normalização</>
  }
];

function approvalTableSortValue(row: ApprovalTableRow, key: string) {
  if (key === "type") return approvalTableTypeLabel[row.type];
  if (key === "requester") return String(row.requester.name);
  if (key === "risk") return String({ high: 0, medium: 1, low: 2 }[row.risk]);
  if (key === "status") return String(approvalTableStatusLabel[row.status]);
  const value = row[key as keyof ApprovalTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ApprovalTableRequesterCell({ requester }: { requester: ApprovalTableRequester }) {
  if (requester.avatarSrc) {
    return (
      <span className="tcrm-approval-table__requester">
        <Avatar name={String(requester.name)} size="xs" src={requester.avatarSrc} />
        <span>{requester.name}</span>
      </span>
    );
  }

  return (
    <span className="tcrm-approval-table__requester">
      <Icon name={requester.icon ?? "user"} size={14} />
      <span>{requester.name}</span>
    </span>
  );
}

export function ApprovalTable({
  className,
  state = "source",
  rows = sourceApprovalTableRows,
  pageLabel = "1-6 de 6",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ApprovalTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = approvalTableSortValue(first, sort.key);
      const secondValue = approvalTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de aprovações"
      className={cn("tcrm-approval-table", className)}
      data-component="ApprovalTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando aprovações" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-approval-table__data"
            columns={[
              {
                key: "title",
                header: "Aprovação",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-approval-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-approval-table__index">{row.index}.</span>
                    <strong className="tcrm-approval-table__title">{row.title}</strong>
                  </span>
                )
              },
              {
                key: "type",
                header: "Tipo",
                sortable: true,
                render: (row) => (
                  <span className="tcrm-approval-table__type">
                    <Icon name={approvalTableTypeIcon[row.type]} size={14} />
                    {approvalTableTypeLabel[row.type]}
                  </span>
                )
              },
              { key: "origin", header: "Origem canônica", sortable: true },
              {
                key: "requester",
                header: <>Solicitante /<br />agente</>,
                sortable: true,
                render: (row) => <ApprovalTableRequesterCell requester={row.requester} />
              },
              {
                key: "risk",
                header: "Risco",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-approval-table__risk", `is-${row.risk}`)}>
                    <i aria-hidden="true" />
                    {approvalTableRiskLabel[row.risk]}
                  </span>
                )
              },
              { key: "cost", header: <>Custo /<br />cota</>, sortable: true },
              {
                key: "deadline",
                header: "Prazo",
                sortable: true,
                render: (row) => <span className={cn("tcrm-approval-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => (
                  <Chip className={cn("tcrm-approval-table__status", `is-${row.status}`)} showDot={false} tone={approvalTableStatusTone[row.status]}>
                    {approvalTableStatusLabel[row.status]}
                  </Chip>
                )
              },
              { key: "activity", header: "Última atividade", sortable: true }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-approval-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={1}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhuma aprovação" description="As decisões que precisam de revisão humana aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de aprovações está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export type StudentTableState = "source" | "loading" | "empty" | "blocked";
export type StudentTableStatus = "active" | "risk" | "noClass" | "inactive";
export type StudentTableFinance = "ok" | "pending";
export type StudentTableRisk = "low" | "medium" | "high" | "none";

export interface StudentTablePerson {
  name: React.ReactNode;
  avatarSrc?: string;
  initials?: string;
}

export interface StudentTableActivity {
  label: React.ReactNode;
  status?: StatusDotStatus;
}

export interface StudentTableRow {
  id: string;
  student: StudentTablePerson;
  status: StudentTableStatus;
  plan: React.ReactNode;
  currentClass: React.ReactNode;
  owner: React.ReactNode;
  presence: React.ReactNode;
  finance: StudentTableFinance;
  risk: StudentTableRisk;
  activity: StudentTableActivity;
  selected?: boolean;
  disabled?: boolean;
}

export interface StudentTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: StudentTableState;
  density?: "standard" | "compact";
  selectionTone?: "marker" | "soft";
  rows?: StudentTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: StudentTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const studentTableStatusLabel: Record<StudentTableStatus, string> = {
  active: "Ativa",
  risk: "Em risco",
  noClass: "Sem turma",
  inactive: "Inativa"
};

const studentTableStatusTone: Record<StudentTableStatus, ComponentTone> = {
  active: "success",
  risk: "danger",
  noClass: "info",
  inactive: "neutral"
};

const studentTableFinanceLabel: Record<StudentTableFinance, React.ReactNode> = {
  ok: "OK",
  pending: <>pagamento<br />pendente</>
};

const studentTableFinanceTone: Record<StudentTableFinance, ComponentTone> = {
  ok: "success",
  pending: "warning"
};

const studentTableRiskLabel: Record<StudentTableRisk, string> = {
  low: "baixo",
  medium: "médio",
  high: "alto",
  none: "—"
};

const studentTableRiskTone: Record<StudentTableRisk, ComponentTone> = {
  low: "success",
  medium: "warning",
  high: "danger",
  none: "neutral"
};

const sourceStudentTableRows: StudentTableRow[] = [
  {
    id: "ana-paula",
    student: { name: "Ana Paula Martins", initials: "AP" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "mensagem hoje", status: "info" },
    selected: true
  },
  {
    id: "joao-pedro",
    student: { name: "João Pedro Silva", initials: "JP" },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "6/10",
    finance: "pending",
    risk: "medium",
    activity: { label: "contrato atualizado", status: "info" }
  },
  {
    id: "carla-mendes",
    student: { name: "Carla Mendes", initials: "CM" },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "3/10",
    finance: "ok",
    risk: "high",
    activity: { label: "14 dias sem aula", status: "danger" }
  },
  {
    id: "pedro-henrique",
    student: { name: "Pedro Henrique", initials: "PH" },
    status: "noClass",
    plan: "Experimental",
    currentClass: "—",
    owner: "Rafael Torres",
    presence: "—",
    finance: "pending",
    risk: "medium",
    activity: { label: "veio do WhatsApp", status: "info" }
  },
  {
    id: "juliana-rocha",
    student: { name: "Juliana Rocha", initials: "JR" },
    status: "inactive",
    plan: "Plano pausado",
    currentClass: "Pilates Solo",
    owner: "próprio",
    presence: "0/10",
    finance: "ok",
    risk: "low",
    activity: { label: "pausa até 30/05", status: "update" }
  },
  {
    id: "mariana-costa",
    student: { name: "Mariana Costa", initials: "MC" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Luana Alves",
    presence: "9/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "lucas-oliveira",
    student: { name: "Lucas Oliveira", initials: "LO" },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "7/10",
    finance: "ok",
    risk: "low",
    activity: { label: "check-in hoje", status: "info" }
  },
  {
    id: "fernanda-souza",
    student: { name: "Fernanda Souza", initials: "FS" },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "4/10",
    finance: "pending",
    risk: "high",
    activity: { label: "cobrança enviada", status: "danger" }
  },
  {
    id: "gabriel-santos",
    student: { name: "Gabriel Santos", initials: "GS" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Pilates Solo",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "patricia-lima",
    student: { name: "Patrícia Lima", initials: "PL" },
    status: "active",
    plan: "Premium",
    currentClass: "Reformer Avançado",
    owner: "Luana Alves",
    presence: "10/10",
    finance: "ok",
    risk: "low",
    activity: { label: "feedback registrado", status: "info" }
  }
];

function studentTableSortValue(row: StudentTableRow, key: string) {
  if (key === "student") return String(row.student.name);
  if (key === "status") return studentTableStatusLabel[row.status];
  if (key === "finance") return String(studentTableFinanceLabel[row.finance]);
  if (key === "risk") return String({ high: 0, medium: 1, low: 2, none: 3 }[row.risk]);
  if (key === "activity") return String(row.activity.label);
  const value = row[key as keyof StudentTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function StudentTablePersonCell({ person }: { person: StudentTablePerson }) {
  return (
    <span className="tcrm-student-table__person">
      <Avatar name={String(person.name)} size="xs" src={person.avatarSrc}>{person.initials}</Avatar>
      <strong>{person.name}</strong>
    </span>
  );
}

export function StudentTable({
  className,
  state = "source",
  density = "standard",
  selectionTone = "marker",
  rows = sourceStudentTableRows,
  pageLabel = "1-10 de 154",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: StudentTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = studentTableSortValue(first, sort.key);
      const secondValue = studentTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de alunos"
      className={cn("tcrm-student-table", density === "compact" && "tcrm-student-table--compact", selectionTone === "soft" && "tcrm-student-table--selection-soft", className)}
      data-component="StudentTable"
      data-density={density}
      data-selection-tone={selectionTone}
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando alunos" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-student-table__data"
            columns={[
              {
                key: "student",
                header: "Aluno",
                sortable: true,
                render: (row) => <StudentTablePersonCell person={row.student} />
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-student-table__status", `is-${row.status}`)} showDot={false} tone={studentTableStatusTone[row.status]}>{studentTableStatusLabel[row.status]}</Chip>
              },
              { key: "plan", header: "Plano", sortable: true },
              { key: "currentClass", header: "Turma atual", sortable: true },
              { key: "owner", header: "Responsável", sortable: true },
              { key: "presence", header: "Presença", sortable: true },
              {
                key: "finance",
                header: "Financeiro",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-student-table__finance", `is-${row.finance}`)} showDot={false} tone={studentTableFinanceTone[row.finance]}>{studentTableFinanceLabel[row.finance]}</Chip>
              },
              {
                key: "risk",
                header: "Risco",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-student-table__risk", `is-${row.risk}`)} showDot={false} tone={studentTableRiskTone[row.risk]}>{studentTableRiskLabel[row.risk]}</Chip>
              },
              {
                key: "activity",
                header: "Última atividade",
                sortable: true,
                render: (row) => <StatusDot className="tcrm-student-table__activity" status={row.activity.status ?? "neutral"} label={String(row.activity.label)} />
              }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-student-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={16}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhum aluno" description="Os alunos do estúdio aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de alunos está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export type ReplacementTableState = "source" | "loading" | "empty" | "blocked";
export type ReplacementTableStatus = "found" | "waiting" | "blocked" | "expiring" | "scheduled" | "pending" | "available";
export type ReplacementTableMode = "copilot" | "manual" | "autonomous" | "blocked";

export interface ReplacementTableStudent {
  name: React.ReactNode;
  avatarSrc?: string;
  initials?: string;
}

export interface ReplacementTableRow {
  id: string;
  student: ReplacementTableStudent;
  originalClass: React.ReactNode;
  reason: React.ReactNode;
  validity: React.ReactNode;
  preference: React.ReactNode;
  status: ReplacementTableStatus;
  nextAction: React.ReactNode;
  mode: ReplacementTableMode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ReplacementTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ReplacementTableState;
  rows?: ReplacementTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ReplacementTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const replacementTableStatusLabel: Record<ReplacementTableStatus, React.ReactNode> = {
  found: "Opção encontrada",
  waiting: "Aguardando resposta",
  blocked: "Bloqueada por regra",
  expiring: "Expira amanhã",
  scheduled: "Agendada",
  pending: "Pendente",
  available: "Com opção"
};

const replacementTableStatusTone: Record<ReplacementTableStatus, ComponentTone> = {
  found: "success",
  waiting: "warning",
  blocked: "danger",
  expiring: "warning",
  scheduled: "success",
  pending: "neutral",
  available: "success"
};

const replacementTableModeLabel: Record<ReplacementTableMode, React.ReactNode> = {
  copilot: "copiloto sugeriu",
  manual: "manual",
  autonomous: "autônomo disponível",
  blocked: "autônomo bloqueado"
};

const replacementTableModeTone: Record<ReplacementTableMode, ComponentTone> = {
  copilot: "info",
  manual: "info",
  autonomous: "paused",
  blocked: "danger"
};

const sourceReplacementTableRows: ReplacementTableRow[] = [
  {
    id: "ana-carolina",
    student: { name: "Ana Carolina Souza", initials: "AS" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "12/06",
    preference: "Manhã ou quinta",
    status: "found",
    nextAction: "Enviar convite",
    mode: "copilot",
    selected: true
  },
  {
    id: "felipe-andrade",
    student: { name: "Felipe Andrade", initials: "FA" },
    originalClass: <>Quinta 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "20/05",
    preference: "Manhã",
    status: "waiting",
    nextAction: "Cobrar retorno",
    mode: "manual"
  },
  {
    id: "gabriela-martins",
    student: { name: "Gabriela Martins", initials: "GM" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "No-show",
    validity: "18/05",
    preference: "Noite",
    status: "blocked",
    nextAction: "Revisar política",
    mode: "blocked"
  },
  {
    id: "beatriz-lima",
    student: { name: "Beatriz Lima", initials: "BL" },
    originalClass: <>Quarta 08h<br />Pilates Solo</>,
    reason: <>Crédito vence<br />amanhã</>,
    validity: "14/05",
    preference: "Cedo",
    status: "expiring",
    nextAction: "Buscar horário",
    mode: "manual"
  },
  {
    id: "juliana-costa",
    student: { name: "Juliana Costa", initials: "JC" },
    originalClass: <>Segunda 19h<br />Tower</>,
    reason: <>Reposição<br />aprovada</>,
    validity: "16/05",
    preference: "Quinta 08h",
    status: "scheduled",
    nextAction: <>Confirmar<br />presença</>,
    mode: "autonomous"
  },
  {
    id: "marina-lopes",
    student: { name: "Marina Lopes", initials: "ML" },
    originalClass: <>Sexta 10h<br />Pilates Solo</>,
    reason: <>Encaixe<br />solicitado</>,
    validity: "24/05",
    preference: "Tarde",
    status: "pending",
    nextAction: "Avaliar opções",
    mode: "copilot"
  },
  {
    id: "lucas-peres",
    student: { name: "Lucas Peres", initials: "LP" },
    originalClass: <>Terça 07h<br />Reformer Inter.</>,
    reason: <>Pedido da<br />recepção</>,
    validity: "30/05",
    preference: "Sem preferência",
    status: "pending",
    nextAction: "Verificar vaga",
    mode: "manual"
  },
  {
    id: "camila-rocha",
    student: { name: "Camila Rocha", initials: "CR" },
    originalClass: <>Quarta 14h<br />Pilates Solo</>,
    reason: "Falta avisada",
    validity: "28/05",
    preference: "Quinta ou sexta",
    status: "available",
    nextAction: <>Confirmar<br />horário</>,
    mode: "autonomous"
  }
];

function replacementTableSortValue(row: ReplacementTableRow, key: string) {
  if (key === "student") return String(row.student.name);
  if (key === "status") return String(replacementTableStatusLabel[row.status]);
  if (key === "mode") return String(replacementTableModeLabel[row.mode]);
  const value = row[key as keyof ReplacementTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ReplacementTableStudentCell({ selected, student }: { selected?: boolean; student: ReplacementTableStudent }) {
  return (
    <span className={cn("tcrm-replacement-table__student", selected && "is-selected")}>
      <Avatar name={String(student.name)} size="xs" src={student.avatarSrc}>{student.initials}</Avatar>
      <strong>{student.name}</strong>
    </span>
  );
}

export function ReplacementTable({
  className,
  state = "source",
  rows = sourceReplacementTableRows,
  pageLabel = "1-8 de 8",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ReplacementTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const result = replacementTableSortValue(first, sort.key).localeCompare(replacementTableSortValue(second, sort.key), "pt-BR", {
        numeric: true,
        sensitivity: "base"
      });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de reposições"
      className={cn("tcrm-replacement-table", className)}
      data-component="ReplacementTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando reposições" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-replacement-table__data"
            columns={[
              {
                key: "student",
                header: "Aluno",
                sortable: true,
                render: (row) => <ReplacementTableStudentCell selected={row.selected} student={row.student} />
              },
              { key: "originalClass", header: "Aula original", sortable: true },
              { key: "reason", header: "Motivo / origem", sortable: true },
              { key: "validity", header: "Validade", sortable: true },
              { key: "preference", header: "Preferência", sortable: true },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-replacement-table__status", `is-${row.status}`)} showDot={false} tone={replacementTableStatusTone[row.status]}>{replacementTableStatusLabel[row.status]}</Chip>
              },
              { key: "nextAction", header: "Próxima ação", sortable: true },
              {
                key: "mode",
                header: "Modo",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-replacement-table__mode", `is-${row.mode}`)} showDot={false} tone={replacementTableModeTone[row.mode]}>{replacementTableModeLabel[row.mode]}</Chip>
              }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-replacement-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={1}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhuma reposição" description="Os pedidos de reposição aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de reposições está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export function OpportunityPanel({
  title = "Ana Souza",
  state = "open",
  value = "R$ 420",
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  value?: React.ReactNode;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  const key = stateKey(state) || "open";

  return (
    <section className={cn("tcrm-opportunity-panel", className)} data-state={key} aria-label={String(title)}>
      <header className="tcrm-opportunity-panel__header">
        <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--selected" showDot={false} tone="info">Oportunidade selecionada</Chip>
        <IconButton className="tcrm-opportunity-panel__close" icon="x" label="Fechar oportunidade" onClick={onClose} size="sm" variant="subtle" />
        <h3>{title}</h3>
        <p>Pré-matrícula bloqueada por pagamento inicial</p>
      </header>
      <dl className="tcrm-opportunity-panel__facts">
        {[
          ["Origem", "Matrículas", "folder"],
          ["Valor estimado", value, "coins"],
          ["Impacto", "conversão em aluna", "sparkles"],
          ["Dono / fila", "Recepção", "user"],
          ["Prazo", <span className="tcrm-opportunity-panel__danger-value" key="deadline">hoje</span>, "clock"],
          ["Status", <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--pending" key="status" showDot={false} tone="danger">pagamento pendente</Chip>, "checkCircle"],
          ["Método disponível", "Pix", "coins"],
          ["Bloqueio", <>Pagamento inicial obrigatório<br />para converter</>, "calendar"]
        ].map(([label, factValue, factIcon]) => (
          <div key={String(label)}>
            <Icon name={factIcon as IconName} size="14px" />
            <dt>{label}</dt>
            <dd>{factValue as React.ReactNode}</dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-opportunity-panel__history">
        <h4>Histórico</h4>
        {[
          ["Compareceu à experimental", "hoje 09:20"],
          ["Plano 2x/semana escolhido", "hoje 09:10"],
          ["Pré-matrícula iniciada", "hoje 09:05"],
          ["Pagamento ainda não enviado", "hoje 08:58"]
        ].map(([item, time]) => (
          <p key={item}><span />{item}<time>{time}</time></p>
        ))}
      </section>
      <section className="tcrm-opportunity-panel__suggestion">
        <Icon name="sparkles" size="24px" tone="info" />
        <strong>Copiloto sugere enviar Pix com mensagem curta e abrir matrícula após confirmação.</strong>
      </section>
      <section className="tcrm-opportunity-panel__notice">
        <Icon name="info" size="18px" tone="warning" />
        <p>Financeiro confirma o pagamento. Matrículas só destrava a conversão.</p>
      </section>
      <section className="tcrm-opportunity-panel__manual">
        <Icon name="info" size="15px" tone="info" />
        <p>Tudo pode ser feito manualmente. O copiloto apenas sugere. Ações autônomas seguem política do studio.</p>
      </section>
      <div className="tcrm-opportunity-panel__actions">
        <Button leadingIcon="sliders" onClick={() => onAction?.("send-pix")} size="sm" variant="primary">Enviar Pix</Button>
        <Button leadingIcon="clipboard" onClick={() => onAction?.("enrollment")} size="sm" variant="secondary">Abrir matrícula</Button>
        <Button leadingIcon="clipboard" onClick={() => onAction?.("charge")} size="sm" variant="secondary">Abrir cobrança</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="x" onClick={() => onAction?.("no-action")} size="sm" variant="secondary">Marcar sem ação</Button>
        <Button leadingIcon="moreVertical" onClick={() => onAction?.("more")} size="sm" variant="secondary">Mais ações</Button>
      </div>
    </section>
  );
}

export function ImportProgress({
  state = "running",
  onDetails,
  onPause,
  onResume,
  onRetry,
  className
}: {
  state?: React.ComponentProps<typeof ImportProgressCard>["state"] | "mapped" | "conflict";
  onDetails?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  const primitiveState = state === "mapped" ? "complete" : state === "conflict" ? "duplicate" : state;

  return (
    <Panel className={cn("tcrm-import-progress-panel", className)} data-state={state}>
      <header className="tcrm-import-progress-panel__header">
        <span aria-hidden="true">3</span>
        <h3>Progresso de importação</h3>
      </header>
      <div className="tcrm-import-progress-panel__grid">
        <ImportProgressCard
          className="tcrm-import-progress-panel__main-card"
          helperText={<span className="tcrm-import-progress-panel__helper"><span>Tempo restante estimado</span><span>00:02:18</span></span>}
          metrics={[
            { label: "Registros totais", value: "312" },
            { label: "Processados", value: "245" },
            { label: "Restantes", value: "78" }
          ]}
          onDetails={onDetails}
          onPause={primitiveState === "running" ? onPause : undefined}
          onResume={primitiveState === "paused" ? onResume : undefined}
          onRetry={primitiveState === "error" ? onRetry : undefined}
          state={primitiveState}
          title="Importando alunos.csv"
          value={78}
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="Contatos.csv"
          metrics={[{ label: "Hoje, 14:32", value: "128 registros" }]}
          state="complete"
          summary
          title="Concluído"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="planos.csv"
          metrics={[{ label: "Hoje, 14:28", value: "2 erros" }]}
          state="error"
          summary
          title="Erros"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="responsáveis.csv"
          metrics={[{ label: "Hoje, 14:25", value: "8 duplicidades" }]}
          state="duplicate"
          summary
          title="Duplicidades"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="turmas.csv"
          metrics={[{ label: "Pausado", value: "96 registros" }]}
          state="paused"
          summary
          title="Continuar depois"
        />
      </div>
    </Panel>
  );
}

export interface FieldMappingRow {
  id: string;
  source: React.ReactNode;
  target: string;
  targetValue?: string;
  state: "mapped" | "missing" | "invalid";
  actionLabel?: string;
}

export function FieldMappingTable({
  rows,
  onRowClick,
  onFieldChange,
  onRowAction,
  onAddMapping,
  className
}: {
  rows?: FieldMappingRow[];
  onRowClick?: (rowId: string) => void;
  onFieldChange?: (rowId: string, value: string) => void;
  onRowAction?: (rowId: string) => void;
  onAddMapping?: () => void;
  className?: string;
}) {
  const mappingRows = rows ?? [
    { id: "nome", source: "Nome do aluno", target: "Nome completo", targetValue: "nome-completo", state: "mapped" as const },
    { id: "telefone", source: "Telefone", target: "Telefone celular", targetValue: "telefone-celular", state: "mapped" as const },
    { id: "responsavel", source: "Responsável", target: "Responsável principal", targetValue: "responsavel-principal", state: "mapped" as const },
    { id: "nascimento", source: "Data de nascimento", target: "Data de nascimento", targetValue: "data-nascimento", state: "invalid" as const, actionLabel: "Corrigir" },
    { id: "plano", source: "Plano", target: "Plano contratado", targetValue: "plano-contratado", state: "missing" as const, actionLabel: "Mapear" }
  ];
  const targetOptions = [
    { value: "nome-completo", label: "Nome completo" },
    { value: "telefone-celular", label: "Telefone celular" },
    { value: "responsavel-principal", label: "Responsável principal" },
    { value: "data-nascimento", label: "Data de nascimento" },
    { value: "plano-contratado", label: "Plano contratado" }
  ];
  const statusByState = {
    mapped: { icon: "checkCircle" as IconName, label: "Válido", tone: "success" },
    invalid: { icon: "alert" as IconName, label: "Formato inválido", tone: "warning" },
    missing: { icon: "alertCircle" as IconName, label: "Campo obrigatório", tone: "danger" }
  };

  return (
    <Panel className={cn("tcrm-field-mapping-panel", className)}>
      <header className="tcrm-field-mapping-panel__header">
        <span aria-hidden="true">4</span>
        <h3>Mapeamento de campos</h3>
      </header>
      <DataTable
        className="tcrm-field-mapping-panel__table"
        columns={[
          { key: "source", header: "Coluna importada" },
          {
            key: "target",
            header: "Campo Taliya",
            render: (row) => (
              <Select
                aria-label={`Campo Taliya para ${row.id}`}
                className="tcrm-field-mapping-panel__select"
                fieldSize="sm"
                onValueChange={(value) => onFieldChange?.(row.id, value)}
                options={targetOptions}
                value={row.targetValue}
              />
            )
          },
          {
            key: "state",
            header: "Status",
            render: (row) => {
              const status = statusByState[row.state];
              return (
                <span className={cn("tcrm-field-mapping-panel__status", `tcrm-field-mapping-panel__status--${status.tone}`)}>
                  <Icon name={status.icon} />
                  {status.label}
                </span>
              );
            }
          }
        ]}
        density="dense"
        onRowClick={onRowClick ? (row) => onRowClick(row.id) : undefined}
        rowActions={(row) => row.actionLabel ? (
          <Button className="tcrm-field-mapping-panel__text-action" onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost">{row.actionLabel}</Button>
        ) : (
          <IconButton className="tcrm-field-mapping-panel__chevron" icon="chevronRight" label={`Abrir mapeamento ${row.id}`} onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost" />
        )}
        rows={mappingRows}
      />
      <footer className="tcrm-field-mapping-panel__footer">
        <Button leadingIcon="plus" onClick={onAddMapping} size="sm" variant="secondary">Adicionar correspondência</Button>
        <Button className="tcrm-field-mapping-panel__count" trailingIcon="chevronRight" size="sm" type="button" variant="ghost">5 de 7 mapeados</Button>
      </footer>
    </Panel>
  );
}

export function DuplicateResolver({
  state = "candidates",
  onAction,
  avatarSrc,
  className
}: CrmSurfaceProps & {
  onAction?: (actionId: string) => void;
  avatarSrc?: string;
}) {
  return (
    <Panel className={cn("tcrm-duplicate-resolver", className)} data-state={state}>
      <header className="tcrm-duplicate-resolver__header">
        <span aria-hidden="true">5</span>
        <h3>Resolução de duplicidade</h3>
      </header>
      <div className="tcrm-duplicate-resolver__choices" role="radiogroup" aria-label="Escolher registro principal">
        <Radio defaultChecked label="Registro A (sugerido)" name="duplicate-primary" onChange={() => onAction?.("select-a")} />
        <Radio label="Registro B" name="duplicate-primary" onChange={() => onAction?.("select-b")} />
      </div>
      <div className="tcrm-duplicate-resolver__body">
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--primary">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="success" />
            <span><strong>João Pedro Silva</strong><small>ID: 456871</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw (mãe)</dd></div>
            <div><dt>E-mail</dt><dd>joao.silva@email.com</dd></div>
            <div><dt>Endereço</dt><dd>Rua das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <div className="tcrm-duplicate-resolver__match-column" aria-hidden="true">
          <span>=</span>
          <StatusDot status="success" />
          <StatusDot status="success" />
          <Icon name="alert" />
          <Icon name="arrowRight" />
        </div>
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--conflict">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="danger" />
            <span><strong>João Pedro Silva</strong><small>ID: 90214</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw</dd></div>
            <div className="is-warning"><dt>E-mail</dt><dd>joaopedro@gmail.com</dd></div>
            <div className="is-danger"><dt>Endereço</dt><dd>R. das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <Card className="tcrm-duplicate-resolver__actions">
          <strong>Ações</strong>
          <span>Escolher principal</span>
          <Radio defaultChecked label="Registro A" name="duplicate-action-primary" onChange={() => onAction?.("select-a")} />
          <Radio label="Registro B" name="duplicate-action-primary" onChange={() => onAction?.("select-b")} />
          <Button onClick={() => onAction?.("merge-a")} size="sm" variant="primary">Mesclar registros</Button>
          <Button onClick={() => onAction?.("separate")} size="sm" variant="secondary">Manter separados</Button>
        </Card>
      </div>
      <footer className="tcrm-duplicate-resolver__legend">
        <span><Icon name="check" />Corresponde (5)</span>
        <span><Icon name="alert" />Divergente (2)</span>
        <span><Icon name="alertCircle" />Ausente (0)</span>
      </footer>
    </Panel>
  );
}

type AdvancedStateAction = (action: string) => void;

export type PermissionStateVariant = "read-only" | "request-access";

export interface PermissionStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: PermissionStateVariant;
  onAction?: AdvancedStateAction;
}

export function PermissionState({ state = "request-access", onAction, className, ...props }: PermissionStateProps) {
  const requestEnabled = state === "request-access";
  const rows: Array<{
    id: string;
    module: string;
    profile: string;
    action: string;
    status: "allowed" | "blocked" | "request" | "pending";
  }> = [
    { id: "contacts", module: "Contatos", profile: "Analista", action: "Editar", status: "allowed" },
    { id: "finance", module: "Financeiro", profile: "SDR", action: "Excluir", status: "blocked" },
    { id: "reports", module: "Relatórios", profile: "Gestor", action: "Visualizar", status: requestEnabled ? "request" : "pending" },
    { id: "integrations", module: "Integrações", profile: "Admin", action: "Configurar", status: "allowed" }
  ];

  return (
    <Panel compact className={cn("tcrm-permission-state-panel", className)} data-component="PermissionState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>5. Permissões e acesso</h3>
        <Icon name="info" />
      </header>
      <div className="tcrm-permission-state-panel__columns" aria-hidden="true">
        <span>Módulo</span>
        <span>Perfil</span>
        <span>Ação</span>
        <span>Status</span>
      </div>
      <div className="tcrm-permission-state-panel__rows" role="table" aria-label="Permissões e acesso">
        {rows.map((row) => (
          <div className="tcrm-permission-state-panel__row" key={row.id} role="row">
            <span role="cell">{row.module}</span>
            <span role="cell">{row.profile}</span>
            <span role="cell">{row.action}</span>
            <span className="tcrm-permission-state-panel__status" role="cell">
              {row.status === "request" ? (
                <Button onClick={() => onAction?.(`request:${row.id}`)} size="sm" variant="secondary">Solicitar acesso</Button>
              ) : row.status === "allowed" ? (
                <Chip icon="check" showDot={false} tone="success">Permitido</Chip>
              ) : row.status === "blocked" ? (
                <Chip icon="alertCircle" showDot={false} tone="danger">Bloqueado</Chip>
              ) : (
                <Chip icon="clock" showDot={false} tone="warning">Pendente</Chip>
              )}
            </span>
          </div>
        ))}
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-permissions")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as permissões</Button>
    </Panel>
  );
}

export type PlanBlockedStateVariant = "upgrade" | "manual";

export interface PlanBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: PlanBlockedStateVariant;
  onAction?: AdvancedStateAction;
}

export function PlanBlockedState({ state = "upgrade", onAction, className, ...props }: PlanBlockedStateProps) {
  const isManual = state === "manual";
  return (
    <Card className={cn("tcrm-plan-blocked-state", isManual && "tcrm-plan-blocked-state--manual", className)} data-component="PlanBlockedState" {...props}>
      <span className="tcrm-plan-blocked-state__icon">
        <Icon name={isManual ? "refresh" : "users"} />
      </span>
      <h3>{isManual ? "Operação manual" : "Mais agentes"}</h3>
      <Chip showDot={false} tone={isManual ? "success" : "warning"}>
        {isManual ? "Manual ativo" : "Plano máximo"}
      </Chip>
      <p>{isManual ? "O CRM continua ativo para a equipe executar manualmente." : "Seu plano já inclui os 7 agentes."}</p>
      <small>{isManual ? "Automação paga pode ficar bloqueada sem impedir a rotina do estúdio." : "Para revisar uma condição especial, fale com suporte."}</small>
      <Button onClick={() => onAction?.(isManual ? "manual" : "support")} size="sm" variant="secondary">
        {isManual ? "Ver alternativa manual" : "Falar com suporte"}
      </Button>
    </Card>
  );
}

export interface QuotaBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: 70 | 90 | 100;
  onAction?: AdvancedStateAction;
}

export function QuotaBlockedState({ value = 100, onAction, className, ...props }: QuotaBlockedStateProps) {
  return (
    <div className={cn("tcrm-quota-blocked-state", className)} data-component="QuotaBlockedState" data-quota-value={value} {...props}>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--alerts">
        <h3>Alertas e economia</h3>
        <div className="tcrm-quota-blocked-state__rows">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>Nenhum alerta crítico</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value >= 90 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info">%</span>
            <span>Economia entra automaticamente em 90%.</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value === 100 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info"><Icon name="pause" /></span>
            <span>Automação paga pausa em 100%;<br />CRM manual continua.</span>
          </span>
        </div>
      </Panel>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--affected">
        <h3>O que foi afetado</h3>
        <div className="tcrm-quota-blocked-state__rows tcrm-quota-blocked-state__rows--affected">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>{value === 100 ? "Fluxos pagos pausados por cota" : "Nenhum fluxo pausado por cota"}</span>
          </span>
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>Nenhum downgrade ativo</span>
          </span>
        </div>
        <Button onClick={() => onAction?.("flows")} size="sm" variant="secondary">Ver fluxos</Button>
      </Panel>
    </div>
  );
}

export type IntegrationFailedStateVariant = "retry" | "fallback" | "support";

export interface IntegrationFailedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: IntegrationFailedStateVariant;
  onAction?: AdvancedStateAction;
}

export function IntegrationFailedState({ state = "retry", onAction, className, ...props }: IntegrationFailedStateProps) {
  const actionLabel = state === "support" ? "Abrir suporte" : state === "fallback" ? "Usar fallback" : "Reconectar";
  return (
    <Panel compact className={cn("tcrm-integration-failed-panel", className)} data-component="IntegrationFailedState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>6. Integrações</h3>
        <Icon name="info" />
      </header>
      <div className="tcrm-integration-failed-panel__rows">
        <div className="tcrm-integration-failed-panel__row">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--stripe">S</span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Stripe</strong>
            <small>Pagamentos</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="success">Conectado</Chip>
            <small>Conectado em 26/04/2024</small>
          </span>
          <IconButton icon="moreVertical" label="Mais ações Stripe" onClick={() => onAction?.("stripe-menu")} size="sm" variant="ghost" />
        </div>
        <div className="tcrm-integration-failed-panel__row tcrm-integration-failed-panel__row--error">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--twilio">
            <span aria-hidden="true" className="tcrm-integration-failed-panel__twilio-grid"><i /><i /><i /><i /></span>
          </span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Twilio</strong>
            <small>SMS</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="danger">Erro</Chip>
            <small>Falha na conexão</small>
          </span>
          <span className="tcrm-integration-failed-panel__actions">
            <Button onClick={() => onAction?.(state)} size="sm" variant="secondary">{actionLabel}</Button>
            <IconButton icon="moreVertical" label="Mais ações Twilio" onClick={() => onAction?.("twilio-menu")} size="sm" variant="ghost" />
          </span>
        </div>
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-integrations")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as integrações</Button>
    </Panel>
  );
}

export type GovernanceAction = (action: string) => void;

export interface PlanAgentsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  baseAgents?: number;
  professionalAgents?: number;
  usedAgents?: number;
  totalAgents?: number;
  onAction?: GovernanceAction;
}

export function PlanAgentsPanel({
  baseAgents = 0,
  professionalAgents = 7,
  usedAgents = 7,
  totalAgents = 20,
  onAction,
  className,
  ...props
}: PlanAgentsPanelProps) {
  const availableAgents = Math.max(0, totalAgents - usedAgents);
  const progress = totalAgents > 0 ? Math.round((usedAgents / totalAgents) * 100) : 0;

  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-plan-agents-panel", className)} data-component="PlanAgentsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>1. Plano e agentes</h3><Icon name="info" /></header>
      <div className="tcrm-plan-agents-panel__grid">
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Base</strong><Chip showDot={false}>Plano base</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="user" /></span>
          <p><strong>{baseAgents}</strong> agentes</p>
          <small>CRM ativo</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("view-base")} size="sm" variant="secondary">Ver detalhes</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Profissional</strong><Chip showDot={false}>CRM Ativo</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="users" /></span>
          <p><strong>{professionalAgents}</strong> agentes</p>
          <small>Incluídos no plano</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("upgrade")} size="sm" variant="primary">Fazer upgrade</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__capacity">
          <span>Agentes</span>
          <span aria-label={`${progress}% dos agentes usados`} className="tcrm-plan-agents-panel__ring" role="progressbar" style={{ "--tcrm-plan-agents-progress": `${progress}%` } as React.CSSProperties} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
            <strong>{usedAgents} / {totalAgents}</strong><small>usados</small>
          </span>
          <strong>{availableAgents} <small>disponíveis</small></strong>
          <Button onClick={() => onAction?.("view-agents")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agentes</Button>
        </Card>
      </div>
    </Panel>
  );
}

export interface FallbackControlCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  enabled?: boolean;
  defaultEnabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}

export function FallbackControlCard({ enabled, defaultEnabled = true, onEnabledChange, className, ...props }: FallbackControlCardProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-fallback-control", className)} data-component="FallbackControlCard" {...props}>
      <header className="tcrm-governance-panel__header"><h3>4. Fallback manual</h3><Icon name="info" /></header>
      <Card className="tcrm-fallback-control__card">
        <span className="tcrm-fallback-control__icon"><Icon name="refresh" /></span>
        <span className="tcrm-fallback-control__body"><strong>Fallback manual</strong><p>Quando a automação não pode atuar, o CRM continua ativo para que a equipe execute a ação manualmente.</p></span>
        <span className="tcrm-fallback-control__status"><Chip showDot={false} tone="success">Habilitado</Chip><Toggle aria-label="Alternar fallback manual" compact defaultPressed={enabled === undefined ? defaultEnabled : undefined} onPressedChange={onEnabledChange} pressed={enabled} /></span>
      </Card>
    </Panel>
  );
}

export interface BillingGovernancePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  cardLabel?: React.ReactNode;
  cardEnding?: React.ReactNode;
  cardExpiry?: React.ReactNode;
  nextChargeDate?: React.ReactNode;
  nextChargeAmount?: React.ReactNode;
  invoiceId?: React.ReactNode;
  invoiceDate?: React.ReactNode;
  invoiceAmount?: React.ReactNode;
  onAction?: GovernanceAction;
}

export function BillingGovernancePanel({
  cardLabel = "Visa",
  cardEnding = "•••• 4242",
  cardExpiry = "Vence em 12/2026",
  nextChargeDate = "28/05/2024",
  nextChargeAmount = "R$ 1.890,00",
  invoiceId = "FAT-2024-0452",
  invoiceDate = "28/04/2024",
  invoiceAmount = "R$ 1.890,00",
  onAction,
  className,
  ...props
}: BillingGovernancePanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-billing-governance", className)} data-component="BillingGovernancePanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>7. Billing e pagamento</h3><Icon name="info" /></header>
      <div className="tcrm-billing-governance__grid">
        <Card><small>Método de pagamento</small><span className="tcrm-billing-governance__payment"><Icon name="creditCard" /><strong>{cardLabel} {cardEnding}</strong></span><span>{cardExpiry}</span><Button onClick={() => onAction?.("update-payment")} size="sm" variant="secondary">Atualizar pagamento</Button></Card>
        <Card><small>Próxima cobrança</small><strong>{nextChargeDate}</strong><span>{nextChargeAmount}</span><small>Em 28 dias</small><Chip showDot={false} tone="success">Pago</Chip></Card>
        <Card><small>Última fatura</small><strong>{invoiceId}</strong><span>{invoiceDate}</span><span>{invoiceAmount}</span><Button onClick={() => onAction?.("view-invoice")} size="sm" trailingIcon="download" variant="secondary">Ver fatura</Button></Card>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("invoice-history")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver histórico de faturas</Button>
    </Panel>
  );
}

export type GovernanceAuditStatus = "success" | "pending" | "alert";

export interface GovernanceAuditRow {
  id: string;
  action: React.ReactNode;
  user: React.ReactNode;
  dateTime: React.ReactNode;
  origin: React.ReactNode;
  status: GovernanceAuditStatus;
}

const defaultGovernanceAuditRows: GovernanceAuditRow[] = [
  { id: "login", action: "Login realizado", user: "Sam Frank", dateTime: "28/04/2024 10:32", origin: "Web", status: "success" },
  { id: "automation", action: "Regra de automação editada", user: "Nikki Olaw", dateTime: "28/04/2024 09:18", origin: "Web", status: "success" },
  { id: "integration", action: "Integração reconectada", user: "Maria Lopes", dateTime: "27/04/2024 16:41", origin: "API", status: "success" },
  { id: "permission", action: "Permissão solicitada", user: "João Silva", dateTime: "27/04/2024 14:12", origin: "Web", status: "pending" },
  { id: "quota", action: "Cota próxima do limite", user: "Sistema", dateTime: "27/04/2024 11:02", origin: "Sistema", status: "alert" }
];

const governanceAuditTone: Record<GovernanceAuditStatus, ComponentTone> = { success: "success", pending: "info", alert: "warning" };
const governanceAuditLabel: Record<GovernanceAuditStatus, string> = { success: "Sucesso", pending: "Pendente", alert: "Alerta" };

export interface GovernanceAuditPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  rows?: GovernanceAuditRow[];
  onAction?: GovernanceAction;
  onRowClick?: (row: GovernanceAuditRow) => void;
}

export function GovernanceAuditPanel({ rows = defaultGovernanceAuditRows, onAction, onRowClick, className, ...props }: GovernanceAuditPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-governance-audit", className)} data-component="GovernanceAuditPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>8. Auditoria e logs</h3><Icon name="info" /></header>
      <div className="tcrm-governance-audit__table-wrap">
        <table><thead><tr><th>Ação</th><th>Usuário</th><th>Data / Hora</th><th>Origem</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr className={onRowClick ? "is-interactive" : undefined} key={row.id} onClick={() => onRowClick?.(row)}><td>{row.action}</td><td>{row.user}</td><td>{row.dateTime}</td><td>{row.origin}</td><td><Chip showDot={false} tone={governanceAuditTone[row.status]}>{governanceAuditLabel[row.status]}</Chip></td></tr>)}</tbody></table>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-logs")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todos os logs</Button>
    </Panel>
  );
}

export interface GuardrailPolicy {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  enabled: boolean;
}

const defaultGuardrailPolicies: GuardrailPolicy[] = [
  { id: "automatic", title: "Permitir ação automática", description: "Ações podem ser executadas automaticamente pelos agentes", icon: "shield", enabled: true },
  { id: "review", title: "Exigir revisão humana", description: "Ações sensíveis exigem aprovação manual antes da execução", icon: "lock", enabled: true },
  { id: "quota", title: "Limitar uso ao atingir cota", description: "Bloqueia novas execuções quando a cota é atingida", icon: "alert", enabled: true },
  { id: "schedule", title: "Bloquear envio fora do horário", description: "Mensagem não enviada fora do horário comercial", icon: "clock", enabled: false }
];

export interface GuardrailPolicyPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  policies?: GuardrailPolicy[];
  onPolicyChange?: (policyId: string, enabled: boolean) => void;
  onAction?: GovernanceAction;
}

export function GuardrailPolicyPanel({ policies = defaultGuardrailPolicies, onPolicyChange, onAction, className, ...props }: GuardrailPolicyPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-guardrail-policy", className)} data-component="GuardrailPolicyPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>9. Política e guardrails</h3><Icon name="info" /></header>
      <div className="tcrm-guardrail-policy__rows">{policies.map((policy) => <RuleRow checked={policy.enabled} control="none" description={policy.description} icon={policy.icon} iconTone="neutral" key={policy.id} onToggle={(enabled) => onPolicyChange?.(policy.id, enabled)} rowId={policy.id} showToggle title={policy.title} />)}</div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-policies")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as políticas</Button>
    </Panel>
  );
}

export interface GeneralSettingsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  workspaceName?: string;
  defaultPlan?: string;
  automaticFallback?: string;
  limitNotifications?: string;
  emailAlerts?: boolean;
  onFieldChange?: (field: string, value: string | boolean) => void;
  onAction?: GovernanceAction;
}

export function GeneralSettingsPanel({
  workspaceName = "Taliya CRM",
  defaultPlan = "professional",
  automaticFallback = "manual",
  limitNotifications = "admins",
  emailAlerts = true,
  onFieldChange,
  onAction,
  className,
  ...props
}: GeneralSettingsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-general-settings", className)} data-component="GeneralSettingsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>10. Configurações gerais</h3><Icon name="info" /></header>
      <div className="tcrm-general-settings__rows">
        <label><span>Nome do workspace</span><Input aria-label="Nome do workspace" onChange={(event) => onFieldChange?.("workspaceName", event.currentTarget.value)} value={workspaceName} /></label>
        <label><span>Plano padrão</span><Select aria-label="Plano padrão" onValueChange={(value) => onFieldChange?.("defaultPlan", value)} options={[{ value: "base", label: "Base" }, { value: "professional", label: "Profissional" }]} value={defaultPlan} /></label>
        <label><span>Fallback automático</span><Select aria-label="Fallback automático" onValueChange={(value) => onFieldChange?.("automaticFallback", value)} options={[{ value: "manual", label: "Manual" }, { value: "paused", label: "Pausado" }]} value={automaticFallback} /></label>
        <label><span>Notificações de limite</span><Select aria-label="Notificações de limite" onValueChange={(value) => onFieldChange?.("limitNotifications", value)} options={[{ value: "admins", label: "Administrador e Gestores" }, { value: "owner", label: "Somente owner" }]} value={limitNotifications} /></label>
        <label className="tcrm-general-settings__toggle"><span>Ativar alertas por e-mail</span><Toggle aria-label="Ativar alertas por e-mail" compact onPressedChange={(value) => onFieldChange?.("emailAlerts", value)} pressed={emailAlerts} /></label>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-settings")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as configurações</Button>
    </Panel>
  );
}

const image13SetupSteps: StepperStep[] = [
  { id: "source", label: "Fonte de dados", description: "Concluído", state: "complete" },
  { id: "import", label: "Importação", description: "Concluído", state: "complete" },
  { id: "mapping", label: "Mapeamento", description: "Em andamento", state: "current" },
  { id: "duplicates", label: "Duplicidades", description: "Bloqueado", state: "blocked" },
  { id: "activation", label: "Ativação", description: "Pendente", state: "pending" }
];

export interface SetupWizardPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  steps?: StepperStep[];
  currentStepId?: string;
  progress?: number;
  onStepSelect?: (stepId: string) => void;
}

export function SetupWizardPanel({
  steps = image13SetupSteps,
  currentStepId = "mapping",
  progress = 60,
  onStepSelect,
  className,
  ...props
}: SetupWizardPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-setup-wizard-panel", className)} data-component="SetupWizardPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>1</span><h3>Wizard / stepper de setup</h3></header>
      <Stepper compact currentStepId={currentStepId} onStepSelect={onStepSelect} progress={progress} steps={steps} />
    </Panel>
  );
}

export interface ActivationChecklistItem {
  id: string;
  title: React.ReactNode;
  owner: React.ReactNode;
  ownerAvatarSrc?: string;
  actionLabel: string;
  state: "complete" | "incomplete" | "warning" | "blocked";
  disabled?: boolean;
}

const image13ActivationItems: ActivationChecklistItem[] = [
  { id: "source", title: "Conectar fonte de dados", owner: "Sam Frank", actionLabel: "Revisar", state: "complete" },
  { id: "consent", title: "Revisar consentimento", owner: "Nikki Olaw", actionLabel: "Abrir", state: "incomplete" },
  { id: "owners", title: "Validar responsáveis", owner: "João Silva", actionLabel: "Validar", state: "warning" },
  { id: "publish", title: "Publicar perfis", owner: "Sara Alves", actionLabel: "Bloqueado", state: "blocked", disabled: true }
];

export interface ActivationChecklistPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onToggle"> {
  items?: ActivationChecklistItem[];
  onItemAction?: (item: ActivationChecklistItem) => void;
  onItemToggle?: (item: ActivationChecklistItem, checked: boolean) => void;
  onItemMenu?: (item: ActivationChecklistItem) => void;
}

export function ActivationChecklistPanel({
  items = image13ActivationItems,
  onItemAction,
  onItemToggle,
  onItemMenu,
  className,
  ...props
}: ActivationChecklistPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-activation-checklist", className)} data-component="ActivationChecklistPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>2</span><h3>Checklist de ativação</h3></header>
      <div aria-hidden="true" className="tcrm-activation-checklist__columns"><span>Item</span><span>Responsável</span><span>Ação rápida</span><span /></div>
      <div className="tcrm-activation-checklist__rows" role="list">
        {items.map((item) => (
          <ChecklistItem
            actionDisabled={item.disabled}
            actionLabel={item.actionLabel}
            disabled={item.disabled}
            key={item.id}
            menu={<IconButton icon="more" label={`Abrir opções de ${String(item.title)}`} onClick={() => onItemMenu?.(item)} size="sm" variant="ghost" />}
            onAction={() => onItemAction?.(item)}
            onToggle={(checked) => onItemToggle?.(item, checked)}
            owner={item.owner}
            ownerAvatarSrc={item.ownerAvatarSrc}
            state={item.state}
            title={item.title}
          />
        ))}
      </div>
    </Panel>
  );
}

export interface DataConflictRow {
  id: string;
  severity: "high" | "medium" | "low";
  object: React.ReactNode;
  description: React.ReactNode;
  suggestion: React.ReactNode;
  owner: React.ReactNode;
  ownerAvatarSrc?: string;
}

const image13ConflictRows: DataConflictRow[] = [
  { id: "cpf", severity: "high", object: "Aluno", description: "CPF duplicado em 2 registros", suggestion: "Revisar e mesclar", owner: "Sam Frank" },
  { id: "phone", severity: "medium", object: "Contato", description: "Telefone em formato inválido", suggestion: "Corrigir formato", owner: "Nikki Olaw" },
  { id: "email", severity: "medium", object: "Responsável", description: "E-mail já associado a outro", suggestion: "Confirmar vínculo", owner: "João Silva" },
  { id: "birth", severity: "low", object: "Aluno", description: "Data de nascimento ausente", suggestion: "Complementar", owner: "Sara Alves" }
];

export interface DataConflictQueueProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  rows?: DataConflictRow[];
  onRowSelect?: (row: DataConflictRow) => void;
  onViewAll?: () => void;
}

export function DataConflictQueue({ rows = image13ConflictRows, onRowSelect, onViewAll, className, ...props }: DataConflictQueueProps) {
  const severityLabels = { high: "Alta", medium: "Média", low: "Baixa" } as const;
  const severityTones = { high: "danger", medium: "warning", low: "info" } as const;
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-data-conflict-queue", className)} data-component="DataConflictQueue" {...props}>
      <header className="tcrm-reference-panel__header"><span>6</span><h3>Fila de conflitos de dados</h3></header>
      <DataTable
        compact
        columns={[
          { key: "severity", header: "Severidade", width: "15%", render: (row) => <Chip showDot={false} tone={severityTones[row.severity]}>{severityLabels[row.severity]}</Chip> },
          { key: "object", header: "Objeto", width: "15%" },
          { key: "description", header: "Descrição do conflito", width: "30%" },
          { key: "suggestion", header: "Ação sugerida", width: "23%" },
          { key: "owner", header: "Responsável", width: "17%", render: (row) => <span className="tcrm-data-conflict-queue__owner"><Avatar name={String(row.owner)} size="xs" src={row.ownerAvatarSrc} />{row.owner}</span> }
        ]}
        onRowClick={onRowSelect}
        rows={rows}
      />
      <Button className="tcrm-reference-panel__link" onClick={onViewAll} size="sm" variant="ghost">Ver todos os conflitos</Button>
    </Panel>
  );
}

const image13ProfileTabs: TabItem[] = [
  { value: "summary", label: "Resumo", content: null },
  { value: "agenda", label: "Agenda", content: null },
  { value: "finance", label: "Financeiro", content: null },
  { value: "history", label: "Histórico", content: null },
  { value: "documents", label: <span className="tcrm-profile-tabs-panel__count">Documentos <Badge tone="info">3</Badge></span>, content: null },
  { value: "permissions", label: "Permissões", content: null }
];

export interface ProfileTabsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ProfileTabsPanel({ items = image13ProfileTabs, value, defaultValue = "summary", onValueChange, className, ...props }: ProfileTabsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-profile-tabs-panel", className)} data-component="ProfileTabsPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>8</span><h3>Abas internas de perfil</h3></header>
      <ProfileTabs defaultValue={defaultValue} density="compact" items={items} onValueChange={onValueChange} value={value} />
    </Panel>
  );
}

export interface ConsentHistoryRow {
  id: string;
  date: React.ReactNode;
  consent: React.ReactNode;
  origin: React.ReactNode;
  actor: React.ReactNode;
}

const image13ConsentHistory: ConsentHistoryRow[] = [
  { id: "whatsapp", date: "28/04/2024 14:32", consent: "WhatsApp permitido", origin: "Web", actor: "Sam Frank" },
  { id: "marketing", date: "10/03/2024 09:11", consent: "Opt-out marketing", origin: "App", actor: "Nikki Olaw" },
  { id: "email", date: "05/12/2023 16:45", consent: "E-mail permitido", origin: "Web", actor: "João Silva" }
];

export interface ConsentPreferencesPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  whatsappAllowed?: boolean;
  marketingAllowed?: boolean;
  preferredChannel?: string;
  preferredTime?: string;
  history?: ConsentHistoryRow[];
  onPreferenceChange?: (field: string, value: string | boolean) => void;
  onViewHistory?: () => void;
}

export function ConsentPreferencesPanel({
  whatsappAllowed = true,
  marketingAllowed = false,
  preferredChannel = "whatsapp",
  preferredTime = "morning",
  history = image13ConsentHistory,
  onPreferenceChange,
  onViewHistory,
  className,
  ...props
}: ConsentPreferencesPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-consent-preferences", className)} data-component="ConsentPreferencesPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>10</span><h3>Consentimento e preferências</h3></header>
      <div className="tcrm-consent-preferences__controls">
        <label><span>WhatsApp permitido</span><Toggle aria-label="WhatsApp permitido" compact onPressedChange={(value) => onPreferenceChange?.("whatsappAllowed", value)} pressed={whatsappAllowed} /></label>
        <label><span>Opt-out de marketing</span><Toggle aria-label="Opt-out de marketing" compact onPressedChange={(value) => onPreferenceChange?.("marketingAllowed", value)} pressed={marketingAllowed} /></label>
        <label><span>Canal preferido</span><Select aria-label="Canal preferido" onValueChange={(value) => onPreferenceChange?.("preferredChannel", value)} options={[{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "E-mail" }]} value={preferredChannel} /></label>
        <label><span>Preferência de horário</span><Select aria-label="Preferência de horário" onValueChange={(value) => onPreferenceChange?.("preferredTime", value)} options={[{ value: "morning", label: "Manhã (08h–12h)" }, { value: "afternoon", label: "Tarde (12h–18h)" }]} value={preferredTime} /></label>
      </div>
      <div className="tcrm-consent-preferences__history">
        <strong>Histórico de consentimento</strong>
        <DataTable compact columns={[{ key: "date", header: "Data", width: "30%" }, { key: "consent", header: "Consentimento", width: "30%" }, { key: "origin", header: "Origem", width: "15%" }, { key: "actor", header: "Responsável", width: "25%" }]} rows={history} />
      </div>
      <Button className="tcrm-reference-panel__link" onClick={onViewHistory} size="sm" variant="ghost">Ver histórico completo</Button>
    </Panel>
  );
}

export interface SensitiveTimelineEvent {
  id: string;
  group: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actor?: React.ReactNode;
  icon: IconName;
  tone: ComponentTone;
  actionLabel?: string;
  status?: React.ReactNode;
}

const image13SensitiveEvents: SensitiveTimelineEvent[] = [
  { id: "profile", group: "Hoje, 14:32", title: "Atualização de cadastro", description: "Endereço atualizado", actor: "Sam Frank", icon: "checkCircle", tone: "success" },
  { id: "document", group: "Hoje, 10:15", title: "Documento restrito", description: "Verificação de renda", icon: "lock", tone: "warning", actionLabel: "Pedir acesso" },
  { id: "email", group: "Ontem, 16:40", title: "E-mail mascarado", description: "joao.***@gmail.com", icon: "lock", tone: "neutral" },
  { id: "access", group: "25/04/2024 11:22", title: "Acesso solicitado", description: "Histórico de pagamentos", icon: "info", tone: "info", status: "Pendente" },
  { id: "note", group: "20/04/2024 09:08", title: "Nota interna", description: "Aluno participativo nas aulas", actor: "Nikki Olaw", icon: "clipboard", tone: "success" }
];

export interface SensitiveTimelinePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  events?: SensitiveTimelineEvent[];
  onEventAction?: (event: SensitiveTimelineEvent) => void;
}

export function SensitiveTimelinePanel({ events = image13SensitiveEvents, onEventAction, className, ...props }: SensitiveTimelinePanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-sensitive-timeline", className)} data-component="SensitiveTimelinePanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>11</span><h3>Timeline sensível</h3></header>
      <Timeline
        compact
        items={events.map((event) => ({
          id: event.id,
          title: event.title,
          time: event.group,
          description: event.description,
          actor: event.actor,
          icon: event.icon,
          tone: event.tone,
          action: event.actionLabel ? <Button onClick={() => onEventAction?.(event)} size="sm" variant="secondary">{event.actionLabel}</Button> : event.status ? <Chip showDot={false}>{event.status}</Chip> : undefined
        }))}
        variant="sensitive"
      />
    </Panel>
  );
}

export interface ClassSummaryCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  status?: React.ReactNode;
  students?: React.ReactNode;
  capacity?: React.ReactNode;
  openings?: React.ReactNode;
  waitlist?: React.ReactNode;
  nextClass?: React.ReactNode;
  teacher?: React.ReactNode;
  onViewDetails?: () => void;
}

export function ClassSummaryCard({
  title = "Reformer Iniciante - R01",
  status = "Ativa",
  students = 8,
  capacity = 8,
  openings = 0,
  waitlist = 3,
  nextClass = "Quarta, 22/05 · 09:00 - 10:00 · Sala 2",
  teacher = "Maria Clara",
  onViewDetails,
  className,
  ...props
}: ClassSummaryCardProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-class-summary-card", className)} data-component="ClassSummaryCard" {...props}>
      <header>
        <span className="tcrm-class-summary-card__icon"><Icon name="book" /></span>
        <strong>{title}</strong>
        <Chip showDot={false} tone="success">{status}</Chip>
      </header>
      <dl className="tcrm-class-summary-card__metrics">
        <div><dt>Alunos</dt><dd>{students}</dd></div>
        <div><dt>Capacidade</dt><dd>{capacity}</dd></div>
        <div><dt>Vagas</dt><dd>{openings}</dd></div>
        <div><dt>Lista de espera</dt><dd className="tcrm-image14-danger">{waitlist}</dd></div>
      </dl>
      <dl className="tcrm-class-summary-card__details">
        <div><dt>Proxima aula</dt><dd>{nextClass}</dd></div>
        <div><dt>Professor</dt><dd>{teacher}</dd></div>
      </dl>
      <Button className="tcrm-image14-panel__link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver detalhes</Button>
    </Panel>
  );
}

export interface ReplacementMatcherCandidate {
  id: string;
  name: React.ReactNode;
  initials?: string;
  avatarSrc?: string;
  priority: React.ReactNode;
  schedule: React.ReactNode;
  actionLabel: React.ReactNode;
}

const image14MatcherCandidates: ReplacementMatcherCandidate[] = [
  { id: "ana", name: "Ana Beatriz", initials: "AB", priority: "Alta", schedule: "Qua 29/05 · 09:00", actionLabel: "Convidar" },
  { id: "bruno", name: "Bruno Lima", initials: "BL", priority: "Media", schedule: "Qua 29/05 · 11:00", actionLabel: "Reservar" },
  { id: "carla", name: "Carla Mendes", initials: "CM", priority: "Baixa", schedule: "Qui 30/05 · 10:00", actionLabel: "Convidar" }
];

export interface ReplacementMatcherPanelProps extends React.HTMLAttributes<HTMLElement> {
  candidates?: ReplacementMatcherCandidate[];
  onCandidateAction?: (candidate: ReplacementMatcherCandidate) => void;
  onViewAlternatives?: () => void;
}

export function ReplacementMatcherPanel({ candidates = image14MatcherCandidates, onCandidateAction, onViewAlternatives, className, ...props }: ReplacementMatcherPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-replacement-matcher", className)} data-component="ReplacementMatcherPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>5</span><h3>Matcher de reposicao</h3></header>
      <dl className="tcrm-replacement-matcher__summary">
        <div><dt>Credito disponivel</dt><dd>1 aula</dd><small>Vence em 15/06/2024</small></div>
        <div><dt>Vagas compativeis</dt><dd>3 vagas</dd><small>Prox. 7 dias</small></div>
        <div><dt>Melhor encaixe</dt><dd>Qua, 29/05 · 09:00</dd><small>Reformer · Sala 2</small></div>
      </dl>
      <div className="tcrm-replacement-matcher__table" role="table" aria-label="Candidatos para reposicao">
        <div role="row"><span role="columnheader">Candidato (3)</span><span role="columnheader">Prioridade</span><span role="columnheader">Horario</span><span role="columnheader">Status</span></div>
        {candidates.map((candidate) => (
          <div key={candidate.id} role="row">
            <span role="cell"><Avatar name={candidate.initials ?? String(candidate.name)} size="xs" src={candidate.avatarSrc} /> {candidate.name}</span>
            <span role="cell">{candidate.priority}</span>
            <span role="cell">{candidate.schedule}</span>
            <Button onClick={() => onCandidateAction?.(candidate)} size="sm" variant="ghost">{candidate.actionLabel}</Button>
          </div>
        ))}
      </div>
      <footer><InlineAlert tone="danger">Conflito: Sala 2 indisponivel em 28/05 as 09:00.</InlineAlert><Button onClick={onViewAlternatives} size="sm" variant="secondary">Ver alternativas</Button></footer>
    </Panel>
  );
}

export interface WaitlistRow {
  id: string;
  name: React.ReactNode;
  priority: React.ReactNode;
  availability: React.ReactNode;
  origin: React.ReactNode;
  status: React.ReactNode;
  tone?: ComponentTone;
}

const image14WaitlistRows: WaitlistRow[] = [
  { id: "juliana", name: "Juliana Costa", priority: "Alta", availability: "Ter/Qui 09-11h", origin: "Website", status: "Aguardando", tone: "warning" },
  { id: "rafaela", name: "Rafaela Dias", priority: "Media", availability: "Qua/Sex 08-10h", origin: "Indicacao", status: "Convidado", tone: "info" },
  { id: "lucas", name: "Lucas Martins", priority: "Media", availability: "Seg/Qua 18-20h", origin: "Instagram", status: "Enviado", tone: "success" },
  { id: "patricia", name: "Patricia Nunes", priority: "Baixa", availability: "Sab 08-12h", origin: "Anterior", status: "Nao recebeu", tone: "neutral" },
  { id: "camila", name: "Camila Rocha", priority: "Baixa", availability: "Ter/Sex 17-19h", origin: "Website", status: "Aguardando", tone: "warning" }
];

export interface WaitlistPanelProps extends React.HTMLAttributes<HTMLElement> {
  rows?: WaitlistRow[];
  onRowSelect?: (row: WaitlistRow) => void;
}

export function WaitlistPanel({ rows = image14WaitlistRows, onRowSelect, className, ...props }: WaitlistPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-waitlist-panel", className)} data-component="WaitlistPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>6</span><h3>Lista de espera</h3></header>
      <div className="tcrm-waitlist-panel__table" role="table" aria-label="Lista de espera">
        <div role="row"><span role="columnheader">Interessado</span><span role="columnheader">Prioridade</span><span role="columnheader">Disponibilidade</span><span role="columnheader">Origem</span><span role="columnheader">Status convite</span></div>
        {rows.map((row) => (
          <button key={row.id} onClick={() => onRowSelect?.(row)} role="row" type="button">
            <span role="cell">{row.name}</span><span role="cell"><Chip showDot={false} tone={row.priority === "Alta" ? "warning" : row.priority === "Media" ? "info" : "success"}>{row.priority}</Chip></span><span role="cell">{row.availability}</span><span role="cell">{row.origin}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export interface ResourceConflictPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApply?: () => void;
  onView?: () => void;
}

export function ResourceConflictPanel({ onApply, onView, className, ...props }: ResourceConflictPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-resource-conflict-panel", className)} data-component="ResourceConflictPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>7</span><h3>Conflito de recurso</h3></header>
      <ConflictCard
        compact
        description="Terca, 21/05 · 13:00 - 14:00"
        facts={[{ label: "Aulas afetadas", value: "2 aulas" }, { label: "Impacto", value: "12 alunos" }, { label: "Recurso", value: "Sala 2" }]}
        onApply={() => onApply?.()}
        onView={() => onView?.()}
        state="danger"
        suggestion="Mover para Sala 3"
        title="Sala ou professor indisponivel"
      />
    </Panel>
  );
}

export interface DocumentViewerPanelProps extends React.HTMLAttributes<HTMLElement> {
  selectedPageId?: string;
  onPageSelect?: (pageId: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
}

export function DocumentViewerPanel({ selectedPageId = "1", onPageSelect, onDownload, onSend, className, ...props }: DocumentViewerPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-document-viewer-panel", className)} data-component="DocumentViewerPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>8</span><h3>Viewer de documento/contrato</h3></header>
      <DocumentPreview
        client="Cliente: Ana Beatriz Souza"
        compact
        date="Data: 15/04/2024"
        history={[{ id: "h1", label: "Assinado por Ana Beatriz", time: "16/04/2024 10:32" }, { id: "h2", label: "Enviado para assinatura", time: "15/04/2024 09:15" }]}
        onDownload={() => onDownload?.()}
        onPageSelect={onPageSelect}
        onSend={() => onSend?.()}
        pages={[{ id: "1", label: "1" }, { id: "2", label: "2" }]}
        selectedPageId={selectedPageId}
        state="signed"
        title="Contrato de Prestacao de Servicos"
      />
    </Panel>
  );
}

export type UploadReceiptState = "attached" | "pending" | "approved" | "error";

export interface UploadReceiptItem {
  id: string;
  title: React.ReactNode;
  meta: React.ReactNode;
  state: UploadReceiptState;
  detail?: React.ReactNode;
}

const image14UploadReceipts: UploadReceiptItem[] = [
  { id: "attached", title: "recibo_abril_2024.pdf", meta: "245 KB · PDF", state: "attached" },
  { id: "pending", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "pending", detail: "Enviado em 20/05 14:32" },
  { id: "approved", title: "recibo_maio_2024.pdf", meta: "231 KB · PDF", state: "approved", detail: "Aprovado em 21/05 09:10" },
  { id: "error", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "error", detail: "Falha na conexao" }
];

export interface UploadReceiptPanelProps extends React.HTMLAttributes<HTMLElement> {
  items?: UploadReceiptItem[];
  onUpload?: () => void;
  onItemAction?: (item: UploadReceiptItem) => void;
}

export function UploadReceiptPanel({ items = image14UploadReceipts, onUpload, onItemAction, className, ...props }: UploadReceiptPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-upload-receipt-panel", className)} data-component="UploadReceiptPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>9</span><h3>Upload / anexo / comprovante</h3></header>
      <div className="tcrm-upload-receipt-panel__content">
        <FileUpload actionLabel="Selecionar" className="tcrm-upload-receipt-panel__dropzone" description="PDF, JPG, PNG ate 10MB" onClick={onUpload} title="Arraste o arquivo aqui ou clique para selecionar" />
        {items.map((item) => (
          <article className={cn("tcrm-upload-receipt-panel__item", `tcrm-upload-receipt-panel__item--${item.state}`)} key={item.id}>
            <small>{item.state === "attached" ? "Arquivo anexado" : item.state === "pending" ? "Comprovante pendente" : item.state === "approved" ? "Comprovante aprovado" : "Erro de upload"}</small>
            <div><Icon name={item.state === "error" ? "alertCircle" : "fileText"} /><span><strong>{item.title}</strong><small>{item.meta}</small></span><IconButton icon="moreVertical" label={`Opcoes de ${String(item.title)}`} onClick={() => onItemAction?.(item)} size="sm" variant="ghost" /></div>
            {item.detail ? <footer>{item.detail}</footer> : null}
            {item.state !== "attached" ? <Chip showDot={false} tone={item.state === "approved" ? "success" : item.state === "pending" ? "warning" : "danger"}>{item.state === "approved" ? "Aprovado" : item.state === "pending" ? "Pendente" : "Tentar novamente"}</Chip> : <Icon name="checkCircle" />}
          </article>
        ))}
      </div>
    </Panel>
  );
}

export interface ReconciliationSummaryRow {
  id: string;
  description: React.ReactNode;
  dueDate: React.ReactNode;
  expected: React.ReactNode;
  received: React.ReactNode;
  difference: React.ReactNode;
  status: React.ReactNode;
  tone?: ComponentTone;
}

const image14ReconciliationRows: ReconciliationSummaryRow[] = [
  { id: "mp", description: "Mensalidade · Maio/2024 · MP", dueDate: "10/05/2024", expected: "R$ 320,00", received: "R$ 320,00", difference: "R$ 0,00", status: "Conciliado", tone: "success" },
  { id: "ref", description: "Mensalidade · Maio/2024 · REF", dueDate: "10/05/2024", expected: "R$ 420,00", received: "R$ 400,00", difference: "- R$ 20,00", status: "Pendente", tone: "warning" }
];

export interface ReconciliationSummaryTableProps extends React.HTMLAttributes<HTMLElement> {
  rows?: ReconciliationSummaryRow[];
  onReconcile?: (row: ReconciliationSummaryRow) => void;
}

export function ReconciliationSummaryTable({ rows = image14ReconciliationRows, onReconcile, className, ...props }: ReconciliationSummaryTableProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-reconciliation-summary", className)} data-component="ReconciliationSummaryTable" {...props}>
      <header className="tcrm-image14-panel__header"><span>10</span><h3>Linha de conciliacao</h3></header>
      <div className="tcrm-reconciliation-summary__table" role="table" aria-label="Linha de conciliacao">
        <div role="row"><span role="columnheader">Descricao</span><span role="columnheader">Vencimento</span><span role="columnheader">Pagamento esperado</span><span role="columnheader">Pagamento recebido</span><span role="columnheader">Diferenca</span><span role="columnheader">Status</span><span role="columnheader">Acao</span></div>
        {rows.map((row) => <div key={row.id} role="row"><strong role="cell">{row.description}</strong><span role="cell">{row.dueDate}</span><span role="cell">{row.expected}</span><span role="cell">{row.received}</span><span className={row.id === "ref" ? "tcrm-image14-danger" : undefined} role="cell">{row.difference}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span><span role="cell"><IconButton icon={row.id === "ref" ? "check" : "link"} label={`Conciliar ${String(row.description)}`} onClick={() => onReconcile?.(row)} size="sm" variant={row.id === "ref" ? "selected" : "ghost"} /></span></div>)}
      </div>
    </Panel>
  );
}

export interface MoneyInputGroupProps extends React.HTMLAttributes<HTMLElement> {
  values?: { value: string; discount: string; fine: string; installment: string; invalid: string };
  onInstallmentChange?: (value: string) => void;
}

export function MoneyInputGroup({ values = { value: "320,00", discount: "32,00", fine: "9,60", installment: "3", invalid: "0,00" }, onInstallmentChange, className, ...props }: MoneyInputGroupProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-money-input-group", className)} data-component="MoneyInputGroup" {...props}>
      <header className="tcrm-image14-panel__header"><span>11</span><h3>Input de valor / moeda</h3></header>
      <div className="tcrm-money-input-group__fields">
        <label><span>Valor</span><MoneyInput aria-label="Valor" defaultValue={values.value} fieldSize="sm" fieldState="success" /></label>
        <label><span>Desconto</span><MoneyInput aria-label="Desconto" defaultValue={values.discount} fieldSize="sm" fieldState="success" /></label>
        <label><span>Multa</span><MoneyInput aria-label="Multa" defaultValue={values.fine} fieldSize="sm" fieldState="success" /></label>
        <label><span>Parcela</span><Select aria-label="Parcela" fieldSize="sm" onValueChange={onInstallmentChange} options={[{ value: "1", label: "1 / 12" }, { value: "2", label: "2 / 12" }, { value: "3", label: "3 / 12" }]} value={values.installment} /></label>
        <label><span className="tcrm-image14-danger">Valor (erro)</span><MoneyInput aria-label="Valor com erro" defaultValue={values.invalid} error="Valor deve ser maior que zero." fieldSize="sm" /></label>
      </div>
    </Panel>
  );
}

export interface FinancialSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApprove?: () => void;
  onReject?: () => void;
}

export function FinancialSimulationPanel({ onApprove, onReject, className, ...props }: FinancialSimulationPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-financial-simulation", className)} data-component="FinancialSimulationPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>12</span><h3>Simulador financeiro antes/depois</h3></header>
      <div className="tcrm-financial-simulation__body">
        <dl><strong>Situacao atual</strong><div><dt>Plano atual</dt><dd>Plano Mensal · Reformer</dd></div><div><dt>Valor mensal</dt><dd>R$ 420,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Prox. cobranca</dt><dd>10/06/2024</dd></div></dl>
        <dl><strong>Alteracao proposta</strong><div><dt>Novo plano</dt><dd>Plano Semestral · Reformer</dd></div><div><dt>Novo mensal</dt><dd>R$ 360,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Inicio da mudanca</dt><dd>10/06/2024</dd></div></dl>
        <dl className="tcrm-financial-simulation__impact"><strong>Impacto da mudanca</strong><div><dt>Economia mensal</dt><dd>- R$ 60,00</dd></div><div><dt>Economia total (6 meses)</dt><dd>- R$ 360,00</dd></div><div><dt>Saldo creditos</dt><dd>R$ 20,00</dd></div><div><dt>Valor total no periodo</dt><dd>R$ 2.160,00</dd></div></dl>
        <aside><strong>Risco / atencao</strong><p>Contrato atual nao preve cancelamento antecipado.</p><p>Ha 1 parcela em aberto.</p></aside>
      </div>
      <footer><Button onClick={onReject} size="sm" variant="secondary">Rejeitar</Button><Button onClick={onApprove} size="sm" variant="primary">Aprovar</Button></footer>
    </Panel>
  );
}

function Reference15Header({ number, title }: { number: number; title: React.ReactNode }) {
  return <header className="tcrm-reference15-header"><span>{number}</span><h3>{title}</h3></header>;
}

export interface FlowSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApprove?: () => void;
}

export function FlowSimulationPanel({ onApprove, className, ...props }: FlowSimulationPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-flow-simulation-panel", className)} data-component="FlowSimulationPanel" {...props}>
    <Reference15Header number={3} title="Simulador de fluxo" />
    <label>Entrada de teste<Input aria-label="Entrada de teste" defaultValue={'Cliente envia: "Quero saber sobre precos."'} fieldSize="sm" /></label>
    <label>Resultado esperado<Input aria-label="Resultado esperado" defaultValue="Enviar apresentacao de plano e agendar follow-up." fieldSize="sm" /></label>
    <dl><div><dt>Risco</dt><dd><StatusDot status="warning" /> Medio</dd></div><div><dt>Custo/cota estimada</dt><dd>0,024 creditos</dd></div><div><dt>Tempo estimado</dt><dd>8,2 s</dd></div></dl>
    <Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar publicacao</Button>
  </Panel>;
}

export interface PublicationPreflightPanelProps extends React.HTMLAttributes<HTMLElement> {
  onPublish?: () => void;
  onSaveDraft?: () => void;
}

export function PublicationPreflightPanel({ onPublish, onSaveDraft, className, ...props }: PublicationPreflightPanelProps) {
  const rows = [
    ["Dados necessarios", "Concluido", "success"], ["Permissoes", "Concluido", "success"],
    ["Cota disponivel", "Atencao", "warning"], ["Politica", "Concluido", "success"], ["Status geral", "Pronto para revisao", "info"]
  ] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-publication-preflight", className)} data-component="PublicationPreflightPanel" {...props}>
    <Reference15Header number={4} title="Preflight antes de publicar" />
    <div className="tcrm-publication-preflight__rows">{rows.map(([label, status, tone]) => <div key={label}><Icon name={tone === "warning" ? "alert" : "checkCircle"} size="sm" tone={tone} /><span>{label}</span><Icon name={tone === "warning" ? "alert" : "check"} size="sm" tone={tone} /><Chip tone={tone}>{status}</Chip></div>)}</div>
    <footer><Button leadingIcon="send" onClick={onPublish} size="sm" variant="primary">Publicar</Button><Button onClick={onSaveDraft} size="sm" variant="secondary">Salvar rascunho</Button></footer>
  </Panel>;
}

export interface ExecutionTraceTableProps extends React.HTMLAttributes<HTMLElement> {
  onViewAll?: () => void;
}

export function ExecutionTraceTable({ onViewAll, className, ...props }: ExecutionTraceTableProps) {
  const rows = [
    ["1", "Receber mensagem", "WhatsApp Webhook", "Sucesso", "0,45 s", "0,001", "-"],
    ["2", "Verificar elegibilidade", "Regra de negocio", "Sucesso", "0,32 s", "0,002", "-"],
    ["3", "Buscar dados do cliente", "Taliya CRM API", "Sucesso", "0,78 s", "0,006", "-"],
    ["4", "Gerar resposta (LLM)", "Assistente de texto", "Em andamento", "2,31 s", "0,013", "-"],
    ["5", "Enviar mensagem", "WhatsApp API", "Falhou", "0,21 s", "0,002", "Timeout"],
    ["6", "Registrar interacao", "Taliya CRM API", "Pendente", "-", "-", "-"]
  ];
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-execution-trace", className)} data-component="ExecutionTraceTable" {...props}>
    <Reference15Header number={5} title="Trace de execucao" />
    <div className="tcrm-execution-trace__table" role="table"><div role="row"><span>Etapa executada</span><span>Ferramenta usada</span><span>Status</span><span>Duracao</span><span>Custo</span><span>Erro</span></div>{rows.map((row) => <div key={row[0]} role="row"><span><b>{row[0]}</b> {row[1]}</span><span>{row[2]}</span><span><Chip tone={row[3] === "Falhou" ? "danger" : row[3] === "Em andamento" ? "info" : row[3] === "Pendente" ? "neutral" : "success"}>{row[3]}</Chip></span><span>{row[4]}</span><span>{row[5]}</span><span className={row[6] !== "-" ? "tcrm-reference15-danger" : undefined}>{row[6]}</span></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver trace completo</Button>
  </Panel>;
}

export interface AgentIncidentPanelProps extends React.HTMLAttributes<HTMLElement> {
  onReprocess?: () => void;
  onCreateTask?: () => void;
  onViewDetails?: () => void;
}

export function AgentIncidentPanel({ onReprocess, onCreateTask, onViewDetails, className, ...props }: AgentIncidentPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-agent-incident", className)} data-component="AgentIncidentPanel" {...props}>
    <Reference15Header number={6} title="Incidente de agente" />
    <dl><div><dt>Causa</dt><dd><Chip tone="danger">Falha de execucao</Chip></dd></div><div><dt>Impacto</dt><dd>Cliente nao recebeu resposta.</dd></div><div><dt>Objeto afetado</dt><dd>#CS-1043 · Joao Silva</dd></div><div><dt>Fallback manual</dt><dd className="tcrm-reference15-success"><Icon name="check" size="sm" /> Tarefa criada automaticamente</dd></div></dl>
    <footer><Button leadingIcon="refresh" onClick={onReprocess} size="sm" variant="primary">Reprocessar com seguranca</Button><Button leadingIcon="clipboard" onClick={onCreateTask} size="sm" variant="secondary">Criar tarefa</Button></footer>
    <Button className="tcrm-reference15-link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver mais detalhes</Button>
  </Panel>;
}

export interface EvaluationQualityPanelProps extends React.HTMLAttributes<HTMLElement> {
  onViewReport?: () => void;
}

export function EvaluationQualityPanel({ onViewReport, className, ...props }: EvaluationQualityPanelProps) {
  const metrics = [["Taxa de sucesso", "94,2%", "↑ 3,1 pp", "success"], ["Falhas", "5,8%", "↓ 1,2 pp", "danger"], ["Revisao humana", "18,6%", "↓ 2,4 pp", "info"], ["Confianca media", "82%", "↑ 4 pp", "success"], ["Casos problematicos", "128", "↑ 18 hoje", "warning"], ["SLA atendido", "98,7%", "↑ 1,5 pp", "success"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-evaluation-quality", className)} data-component="EvaluationQualityPanel" {...props}>
    <Reference15Header number={7} title="Painel de qualidade / evals" />
    <div>{metrics.map(([label, value, delta, tone]) => <section key={label}><span>{label}</span><strong>{value}</strong><small className={`tcrm-reference15-${tone}`}>{delta}</small></section>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewReport} size="sm" trailingIcon="arrowRight" variant="ghost">Ver relatorio completo</Button>
  </Panel>;
}

export interface PrivacyRequestTableProps extends React.HTMLAttributes<HTMLElement> {
  onOpenRequest?: (requestId: string) => void;
  onViewAll?: () => void;
}

export function PrivacyRequestTable({ onOpenRequest, onViewAll, className, ...props }: PrivacyRequestTableProps) {
  const rows = [["REQ-1287", "Joao Silva", "Concluida", "success"], ["REQ-1286", "Ana Costa", "Em andamento", "info"], ["REQ-1285", "Mariana A.", "Aguardando dados", "warning"], ["REQ-1284", "Pedro L.", "Negada", "danger"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-privacy-request", className)} data-component="PrivacyRequestTable" {...props}>
    <Reference15Header number={10} title="Privacidade / LGPD" />
    <div className="tcrm-privacy-request__table" role="table"><div role="row"><span>Solicitacao</span><span>Validar identidade</span><span>Exportar</span><span>Anonimizar</span><span>Negar</span><span>Status</span></div>{rows.map(([id, person, status, tone]) => <div key={id} role="row" onClick={() => onOpenRequest?.(id)}><span>{id}<small>{person}</small></span><Icon name="check" size="sm" tone="success" /><Icon name="download" size="sm" /><Icon name="lock" size="sm" /><Icon name="x" size="sm" /><Chip tone={tone}>{status}</Chip></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as solicitacoes</Button>
  </Panel>;
}

export interface SupportGrantPanelProps extends React.HTMLAttributes<HTMLElement> {
  onTemporaryAccessChange?: (enabled: boolean) => void;
  onRevoke?: () => void;
}

export function SupportGrantPanel({ onTemporaryAccessChange, onRevoke, className, ...props }: SupportGrantPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-support-grant", className)} data-component="SupportGrantPanel" {...props}>
    <Reference15Header number={11} title="Grant de suporte" />
    <div className="tcrm-support-grant__field"><span>Acesso temporario</span><Toggle aria-label="Acesso temporario" compact defaultPressed onPressedChange={onTemporaryAccessChange} /></div>
    <div className="tcrm-support-grant__field"><span>Expiracao</span><Input aria-label="Expiracao" defaultValue="30/04/2024 18:00" fieldSize="sm" trailingIcon="calendar" /></div>
    <div className="tcrm-support-grant__field"><span>Escopo</span><Select aria-label="Escopo" defaultValue="contas" fieldSize="sm" options={[{ value: "contas", label: "Contas e Casos" }]} /></div>
    <div className="tcrm-support-grant__field"><span>Motivo</span><Input aria-label="Motivo" defaultValue="Suporte a incidente" fieldSize="sm" /></div>
    <Button leadingIcon="trash" onClick={onRevoke} size="sm" variant="destructive">Revogar acesso</Button>
  </Panel>;
}

export interface AdvancedReportsPanelProps extends React.HTMLAttributes<HTMLElement> {
  onViewAll?: () => void;
}

export function AdvancedReportsPanel({ onViewAll, className, ...props }: AdvancedReportsPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-advanced-reports", className)} data-component="AdvancedReportsPanel" {...props}>
    <Reference15Header number={12} title="Relatorios avancados" />
    <div className="tcrm-advanced-reports__charts">
      <section><strong>Grafico de linha</strong><small>Conversas · Conversoes</small><svg aria-hidden="true" className="tcrm-reference15-line-chart" viewBox="0 0 120 56"><polyline points="0,42 18,33 36,37 54,19 72,29 90,14 108,21 120,8" /><polyline points="0,50 18,44 36,48 54,38 72,42 90,29 108,35 120,24" /></svg></section>
      <section><strong>Grafico de barras</strong><small>Novos clientes</small><div className="tcrm-reference15-bar-chart">{[5,8,6,11,7,13,9,12,6,4].map((height, index) => <i key={index} style={{ height: `${height * 4}px` }} />)}</div></section>
      <section><strong>Funil</strong><div className="tcrm-reference15-funnel"><i>Visitantes 24.890</i><i>Leads 6.152</i><i>Oportunidades 2.489</i><i>Clientes 1.102</i></div></section>
      <section><strong>Ranking de agentes</strong>{["Sam Frank 428", "Nikki Olaw 352", "Maria Lopes 301", "Joao Silva 287", "Carlos Lima 241"].map((row) => <span key={row}>{row}</span>)}</section>
      <section><strong>Heatmap de ocupacao</strong><small>Seg · Ter · Qua · Qui · Sex</small><div className="tcrm-reference15-heatmap">{Array.from({ length: 25 }, (_, index) => <i key={index} style={{ opacity: 0.2 + (index % 5) * 0.15 }} />)}</div></section>
    </div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver painel completo</Button>
  </Panel>;
}

export interface ExportQueuePanelProps extends React.HTMLAttributes<HTMLElement> {
  onAction?: (exportId: string) => void;
  onViewAll?: () => void;
}

export function ExportQueuePanel({ onAction, onViewAll, className, ...props }: ExportQueuePanelProps) {
  const rows = [["conversas", "Relatorio de conversas", "CSV", "Agendada", "-", "info"], ["clientes", "Base de clientes", "XLSX", "Exportando", "62%", "info"], ["financeiro", "Relatorio financeiro", "PDF", "Pronto", "100%", "success"], ["auditoria", "Logs de auditoria", "CSV", "Falhou", "-", "danger"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-export-queue", className)} data-component="ExportQueuePanel" {...props}>
    <Reference15Header number={13} title="Exportacoes" />
    <div className="tcrm-export-queue__table" role="table"><div role="row"><span>Exportacao</span><span>Formato</span><span>Agendada para</span><span>Status</span><span>Progresso</span><span>Acoes</span></div>{rows.map(([id, label, format, status, progress, tone], index) => <div key={id} role="row"><span>{label}</span><span>{format}</span><span>28/04/2024 {10 - index}:0{index}</span><Chip tone={tone}>{status}</Chip><span>{progress}</span><IconButton icon={status === "Pronto" ? "download" : status === "Falhou" ? "refresh" : "more"} label={`Acao de ${label}`} onClick={() => onAction?.(id)} size="sm" variant="ghost" /></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as exportacoes</Button>
  </Panel>;
}

export interface SegmentCommunicationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onEdit?: () => void;
  onViewAudience?: () => void;
  onApprove?: () => void;
  onSchedule?: () => void;
}

export function SegmentCommunicationPanel({ onEdit, onViewAudience, onApprove, onSchedule, className, ...props }: SegmentCommunicationPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-segment-communication", className)} data-component="SegmentCommunicationPanel" {...props}>
    <Reference15Header number={14} title="Segmentos e comunicados" />
    <div className="tcrm-segment-communication__body"><section><span>Construtor do segmento</span><strong>Clientes inativos &gt; 60 dias</strong><Button onClick={onEdit} size="sm" variant="ghost">Editar</Button><span>Publico elegivel</span><strong>12.843 contatos</strong><Button onClick={onViewAudience} size="sm" variant="ghost">Ver lista</Button><span>Consentimento</span><strong className="tcrm-reference15-success">98,6% com consentimento</strong></section><section><span>Preview da mensagem</span><p>Ola {'{nome}'}, sentimos sua falta! Temos novidades que podem te interessar.</p><footer><span>Custo estimado<br /><strong>0,86 creditos</strong></span><span>Canais<br /><Icon name="whatsapp" size="sm" /> <Icon name="mail" size="sm" /> <Icon name="message" size="sm" /></span></footer></section></div>
    <footer><Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar envio</Button><Button leadingIcon="calendar" onClick={onSchedule} size="sm" variant="secondary">Agendar</Button></footer>
  </Panel>;
}
