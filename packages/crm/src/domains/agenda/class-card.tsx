import React from "react";
import { Avatar, Button, CalendarEventBlock, IconButton, StatusDot, cn } from "@taliya/ui";

export function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
