/** Roles, invites, and member settings patterns. */
import React from "react";
import { Avatar, Button, Chip, Icon, IconButton, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

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
      <PrimitiveButton
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
      </PrimitiveButton>
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
