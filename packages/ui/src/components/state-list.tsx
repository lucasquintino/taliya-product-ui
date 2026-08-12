import React from "react";
import { cn, Icon, type IconName } from "../foundation.js";
import { MetaText, type MetaTextProps } from "../primitives/layout.js";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  grouped?: boolean;
  dense?: boolean;
  divided?: boolean;
}

export function List({ grouped = false, dense = false, divided = false, className, ...props }: ListProps) {
  return <div className={cn("tl-list", grouped && "tl-list--grouped", dense && "tl-list--dense", divided && "tl-list--divided", className)} role="list" {...props} />;
}

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  selected?: boolean;
  unread?: boolean;
  warning?: boolean;
  disabled?: boolean;
  leading?: React.ReactNode;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  action?: React.ReactNode;
}

export function ListItem({
  selected = false,
  unread = false,
  warning = false,
  disabled = false,
  leading,
  title,
  meta,
  trailing,
  action,
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <div
      className={cn(
        "tl-list-item",
        selected && "tl-list-item--selected",
        unread && "tl-list-item--unread",
        warning && "tl-list-item--warning",
        disabled && "tl-list-item--disabled",
        className
      )}
      aria-disabled={disabled || undefined}
      role="listitem"
      {...props}
    >
      {leading ? <div className="tl-list-item__leading">{leading}</div> : null}
      <div className="tl-list-item__content">
        {title ? <strong>{title}</strong> : null}
        {meta ? <small>{meta}</small> : null}
        {children ? <div>{children}</div> : null}
      </div>
      {trailing ? <div className="tl-list-item__trailing">{trailing}</div> : null}
      {action ? <div className="tl-list-item__action">{action}</div> : null}
    </div>
  );
}

export interface KeyValueRowProps extends Omit<ListItemProps, "title" | "trailing" | "children"> {
  label: React.ReactNode;
  value: React.ReactNode;
  valueTone?: MetaTextProps["tone"];
}

export function KeyValueRow({ label, value, valueTone = "default", ...props }: KeyValueRowProps) {
  return <ListItem title={label} trailing={<MetaText tone={valueTone}>{value}</MetaText>} {...props} />;
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "neutral" | "actionable" | "blocked";
  icon?: IconName;
}

export function EmptyState({ title, description, action, variant = "neutral", icon, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("tl-state", `tl-state--${variant}`, className)} {...props}>
      <span className="tl-state__icon">
        <Icon name={icon ?? (variant === "blocked" ? "lock" : "search")} />
      </span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div className="tl-state__action">{action}</div> : null}
    </div>
  );
}

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: "spinner" | "skeleton" | "table" | "panel";
  showTitle?: boolean;
}

export function LoadingState({ title = "Carregando", variant = "spinner", showTitle = true, className, ...props }: LoadingStateProps) {
  const skeletonRows = variant === "table" ? 9 : variant === "panel" ? 5 : 5;

  return (
    <div
      aria-busy="true"
      aria-label={showTitle ? undefined : title}
      className={cn("tl-state", "tl-state--loading", `tl-state--${variant}`, className)}
      role={variant === "spinner" ? "status" : undefined}
      {...props}
    >
      {variant === "spinner" ? (
        <span className="tl-state__icon">
          <Icon className="tl-spin" name="loader" />
        </span>
      ) : (
        <span aria-hidden="true" className="tl-skeleton-block">
          {Array.from({ length: skeletonRows }, (_, index) => (
            <span key={`skeleton-${index}`} />
          ))}
        </span>
      )}
      {showTitle ? <strong>{title}</strong> : null}
    </div>
  );
}

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  blocking?: boolean;
  icon?: IconName;
}

export function ErrorState({ title, description, action, blocking = false, icon = "alert", className, ...props }: ErrorStateProps) {
  return (
    <div className={cn("tl-state", "tl-state--error", blocking && "tl-state--blocking", className)} role="alert" {...props}>
      <span className="tl-state__icon">
        <Icon name={icon} />
      </span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div className="tl-state__action">{action}</div> : null}
    </div>
  );
}
