/** CRM shell chrome, browser toolbar, and primary navigation. */
import React from "react";
import {
  Avatar,
  Icon,
  IconButton,
  NavPill,
  PrimitiveButton,
  TaliyaLogo,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import {
  crmBrowserToolbarItems,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "./shell-foundation.js";
import type {
  CrmBrowserToolbarItem,
  CrmShellNavItem,
  CrmShellSidebarItem
} from "./shell-foundation.js";

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
    <PrimitiveButton
      aria-label={label}
      className={cn("tcrm-browser-toolbar__button", className)}
      title={label}
      type={type}
      {...props}
    >
      <Icon name={icon} size={icon === "star" ? 16 : icon === "book" ? 17 : 20} />
    </PrimitiveButton>
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

