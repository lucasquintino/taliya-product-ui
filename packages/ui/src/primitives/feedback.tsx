import React from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";
import { IconButton } from "./button.js";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
  icon?: IconName;
  showDot?: boolean;
}

export function Chip({ tone = "neutral", icon, showDot = true, className, children, ...props }: ChipProps) {
  return (
    <span className={cn("tl-chip", `tl-chip--${tone}`, className)} {...props}>
      {icon ? <Icon name={icon} size="var(--taliya-control-chip-icon-size)" /> : showDot ? <span className="tl-chip__dot" /> : null}
      <span>{children}</span>
    </span>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
  variant?: "count" | "dot" | "pill";
  label?: string;
}

export function Badge({ tone = "neutral", variant = "pill", label, className, children, ...props }: BadgeProps) {
  return (
    <span
      aria-label={label}
      className={cn("tl-badge", `tl-badge--${tone}`, `tl-badge--${variant}`, className)}
      role={label ? "status" : undefined}
      {...props}
    >
      {variant === "dot" ? <span className="tl-badge__dot" /> : children}
    </span>
  );
}

export type StatusDotStatus =
  | "online"
  | "paused"
  | "pending"
  | "error"
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "blocked"
  | "update"
  | "quota";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusDotStatus;
  label?: string;
}

export function StatusDot({ status = "neutral", label, className, ...props }: StatusDotProps) {
  return (
    <span className={cn("tl-status-dot", `tl-status-dot--${status}`, className)} {...props}>
      <span className="tl-status-dot__mark" />
      {label ? <span>{label}</span> : null}
    </span>
  );
}

export interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ComponentTone;
  title?: string;
  icon?: IconName;
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function InlineAlert({
  tone = "info",
  title,
  icon,
  action,
  onDismiss,
  dismissLabel = "Fechar alerta",
  className,
  children,
  role,
  ...props
}: InlineAlertProps) {
  const alertRole = role ?? (tone === "danger" ? "alert" : "status");

  return (
    <div className={cn("tl-alert", `tl-alert--${tone}`, className)} role={alertRole} {...props}>
      <Icon className="tl-alert__icon" name={icon ?? alertIconForTone(tone)} />
      <div className="tl-alert__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <div className="tl-alert__content">{children}</div> : null}
      </div>
      {action ? <div className="tl-alert__action">{action}</div> : null}
      {onDismiss ? <IconButton className="tl-alert__close" icon="x" label={dismissLabel} onClick={onDismiss} size="sm" variant="ghost" /> : null}
    </div>
  );
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ComponentTone;
  title?: string;
  icon?: IconName;
  action?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Toast({
  tone = "neutral",
  title,
  icon,
  action,
  onClose,
  closeLabel = "Fechar notificaÃ§Ã£o",
  className,
  children,
  role,
  ...props
}: ToastProps) {
  const toastRole = role ?? (tone === "danger" ? "alert" : "status");

  return (
    <div className={cn("tl-toast", `tl-toast--${tone}`, className)} role={toastRole} {...props}>
      <span className="tl-toast__icon">
        <Icon name={icon ?? alertIconForTone(tone)} />
      </span>
      <div className="tl-toast__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <div className="tl-toast__content">{children}</div> : null}
      </div>
      {action ? <div className="tl-toast__action">{action}</div> : null}
      {onClose ? <IconButton className="tl-toast__close" icon="x" label={closeLabel} onClick={onClose} size="sm" variant="ghost" /> : null}
    </div>
  );
}

function alertIconForTone(tone: ComponentTone): IconName {
  if (tone === "success") return "checkCircle";
  if (tone === "warning" || tone === "danger" || tone === "blocked") return "alert";
  if (tone === "paused") return "pause";
  if (tone === "info" || tone === "update" || tone === "quota") return "info";
  return "circle";
}
