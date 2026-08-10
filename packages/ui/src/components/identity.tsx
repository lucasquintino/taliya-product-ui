import React, { useState } from "react";
import { cn, Icon } from "../foundation.js";
import type { StatusDotStatus } from "../primitives/feedback.js";
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  status?: StatusDotStatus;
  badge?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export function Avatar({
  name,
  src,
  size = "md",
  status,
  badge,
  selected = false,
  disabled = false,
  className,
  "aria-hidden": ariaHidden,
  role,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const shouldShowImage = src && failedSrc !== src;

  return (
    <div
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : name}
      className={cn(
        "tl-avatar",
        `tl-avatar--${size}`,
        selected && "tl-avatar--selected",
        disabled && "tl-avatar--disabled",
        className
      )}
      data-disabled={disabled || undefined}
      role={ariaHidden ? undefined : (role ?? "img")}
      {...props}
    >
      {shouldShowImage ? <img alt="" onError={() => setFailedSrc(src)} src={src} /> : <span>{initials}</span>}
      {status ? <span className={cn("tl-avatar__status", `tl-avatar__status--${status}`)} /> : null}
      {badge ? <span className="tl-avatar__badge">{badge}</span> : null}
    </div>
  );
}

export interface AvatarStackPerson {
  id: string;
  name: string;
  src?: string;
  status?: AvatarProps["status"];
  badge?: React.ReactNode;
}

export function AvatarStack({
  people,
  max = 3,
  showAdd = false,
  addLabel = "Adicionar pessoa",
  onAdd,
  className
}: {
  people: AvatarStackPerson[];
  max?: number;
  showAdd?: boolean;
  addLabel?: string;
  onAdd?: () => void;
  className?: string;
}) {
  const visible = people.slice(0, max);
  const overflow = people.length - visible.length;

  return (
    <div className={cn("tl-avatar-stack", className)}>
      {visible.map((person) => (
        <Avatar
          badge={person.badge}
          key={person.id}
          name={person.name}
          size="sm"
          src={person.src}
          status={person.status}
        />
      ))}
      {overflow > 0 ? <span className="tl-avatar-stack__count">+{overflow}</span> : null}
      {showAdd ? (
        <button className="tl-avatar-stack__add" onClick={onAdd} title={addLabel} type="button" aria-label={addLabel}>
          <Icon name="plus" size="var(--taliya-control-avatar-add-icon-size)" />
        </button>
      ) : null}
    </div>
  );
}

export interface PersonLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  avatarSrc?: string;
  size?: "xs" | "sm";
}

export function PersonLabel({ name, avatarSrc, size = "xs", className, ...props }: PersonLabelProps) {
  return (
    <span className={cn("tl-person-label", className)} {...props}>
      <Avatar name={name} size={size} src={avatarSrc} />
      {name}
    </span>
  );
}
