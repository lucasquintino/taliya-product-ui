/** CRM shell chrome: sidebar and global navigation controls. */
import React from "react";
import { Avatar, IconButton, NavPill, PrimitiveButton, cn } from "@taliya/ui";
import type { AvatarProps } from "@taliya/ui";
import { crmEmptyShellNavItems, crmEmptyShellSidebarItems, crmEmptyShellSidebarUtilityItems } from "./shell-foundation.js";
import type { CrmShellNavItem, CrmShellSidebarItem } from "./shell-foundation.js";
import {
  CrmShellBrand,
  CrmSidebarNavigation,
  CrmSidebarUtilityNavigation,
  CrmTopbarActionButton
} from "./shell-chrome-a.js";

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
    <PrimitiveButton
      aria-label={name}
      aria-pressed={selected || undefined}
      className={cn("tcrm-empty-shell-avatar", className)}
      disabled={disabled}
      title={name}
      type={type}
      {...props}
    >
      <Avatar aria-hidden="true" badge={badge} disabled={disabled} name={name} selected={selected} size="md" src={src} status={status} />
    </PrimitiveButton>
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
