import React from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";
import { PersonLabel } from "./identity.js";
import { Button, IconButton } from "../primitives/button.js";
import { Chip } from "../primitives/feedback.js";
import { Card, MetaText, type MetaTextProps } from "../primitives/layout.js";
import { alertIconForTone } from "./workflow-utilities.js";

export type ChecklistItemState = "complete" | "incomplete" | "warning" | "blocked";

export interface ChecklistItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange" | "onToggle"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: ChecklistItemState;
  owner?: React.ReactNode;
  ownerAvatarSrc?: string;
  actionLabel?: string;
  actionDisabled?: boolean;
  onAction?: () => void;
  onToggle?: (checked: boolean) => void;
  menu?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  showStateChip?: boolean;
}

const checklistToneByState: Record<ChecklistItemState, ComponentTone> = {
  complete: "success",
  incomplete: "info",
  warning: "warning",
  blocked: "blocked"
};

const checklistIconByState: Record<ChecklistItemState, IconName> = {
  complete: "checkCircle",
  incomplete: "info",
  warning: "alert",
  blocked: "lock"
};

export function ChecklistItem({
  title,
  description,
  state = "incomplete",
  owner,
  ownerAvatarSrc,
  actionLabel,
  actionDisabled = false,
  onAction,
  onToggle,
  menu,
  selected = false,
  disabled = false,
  showStateChip = false,
  className,
  ...props
}: ChecklistItemProps) {
  const checked = state === "complete";
  const status = (
    <span className={cn("tl-checklist-item__status", `tl-checklist-item__status--${state}`)}>
      <Icon name={checklistIconByState[state]} size="var(--taliya-control-checklist-icon-size)" />
    </span>
  );

  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "tl-checklist-item",
        `tl-checklist-item--${state}`,
        selected && "tl-checklist-item--selected",
        disabled && "tl-checklist-item--disabled",
        showStateChip && "tl-checklist-item--with-chip",
        className
      )}
      {...props}
    >
      {onToggle ? (
        <button
          aria-checked={checked}
          aria-label={`Marcar ${typeof title === "string" ? title : "item"}`}
          className="tl-checklist-item__toggle"
          disabled={disabled}
          onClick={() => onToggle(!checked)}
          role="checkbox"
          type="button"
        >
          {status}
        </button>
      ) : (
        status
      )}
      <span className="tl-checklist-item__body">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {owner ? <PersonLabel avatarSrc={ownerAvatarSrc} className="tl-checklist-item__owner" name={String(owner)} /> : null}
      {showStateChip ? <Chip tone={checklistToneByState[state]}>{state}</Chip> : null}
      {actionLabel ? (
        <Button disabled={disabled || actionDisabled || state === "blocked"} onClick={onAction} size="sm" variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
      {menu ?? <IconButton disabled={disabled} icon="more" label="Mais acoes" size="sm" variant="ghost" />}
    </div>
  );
}

export type MetricTileTone = "neutral" | "positive" | "negative" | "warning";

export interface MetricTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  helperText?: React.ReactNode;
  icon?: IconName;
  progressValue?: number;
  tone?: MetricTileTone;
  variant?: "default" | "operational";
  selected?: boolean;
  compact?: boolean;
  disabled?: boolean;
  action?: React.ReactNode;
  onSelect?: () => void;
}

const metricToneClass: Record<MetricTileTone, string> = {
  neutral: "neutral",
  positive: "success",
  negative: "danger",
  warning: "warning"
};

export function MetricTile({
  label,
  value,
  delta,
  helperText,
  icon,
  progressValue,
  tone = "neutral",
  variant = "default",
  selected = false,
  compact = false,
  disabled = false,
  action,
  onSelect,
  className,
  ...props
}: MetricTileProps) {
  const normalizedProgress = typeof progressValue === "number" ? Math.max(0, Math.min(100, progressValue)) : undefined;
  const progressStyle = normalizedProgress !== undefined ? { "--tl-metric-progress": `${normalizedProgress}%` } as React.CSSProperties : undefined;
  const content = (
    <>
      <span className="tl-metric-tile__icon">
        {normalizedProgress !== undefined ? (
          <span
            aria-label={`${normalizedProgress}%`}
            className="tl-metric-tile__progress-ring"
            role="progressbar"
            style={progressStyle}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={normalizedProgress}
          />
        ) : icon ? <Icon name={icon} size="var(--taliya-control-metric-tile-icon-size)" /> : null}
      </span>
      <span className="tl-metric-tile__label">{label}</span>
      <strong className="tl-metric-tile__value">{value}</strong>
      <span className="tl-metric-tile__footer">
        {delta ? <MetaText tone={metricToneClass[tone] as MetaTextProps["tone"]}>{delta}</MetaText> : null}
        {helperText ? <small>{helperText}</small> : null}
        {action}
      </span>
    </>
  );
  const classes = cn(
    "tl-card",
    "tl-metric-tile",
    `tl-metric-tile--${tone}`,
    variant !== "default" && `tl-metric-tile--${variant}`,
    selected && "tl-card--inverse tl-metric-tile--selected",
    compact && "tl-metric-tile--compact",
    disabled && "tl-card--disabled tl-metric-tile--disabled",
    onSelect && "tl-card--interactive",
    className
  );

  if (onSelect) {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button {...buttonProps} aria-pressed={selected} className={classes} disabled={disabled} onClick={onSelect} type="button">
        {content}
      </button>
    );
  }

  return (
    <Card className={classes} disabled={disabled} selected={selected} {...props}>
      {content}
    </Card>
  );
}

export type StatusSummaryState = "ok" | "attention" | "danger" | "blocked" | "info";

export interface StatusSummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  description?: React.ReactNode;
  state?: StatusSummaryState;
  icon?: IconName;
  statusLabel?: React.ReactNode;
  details?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  selected?: boolean;
  compact?: boolean;
  layout?: "default" | "hero";
}

const statusSummaryToneByState: Record<StatusSummaryState, ComponentTone> = {
  ok: "success",
  attention: "warning",
  danger: "danger",
  blocked: "blocked",
  info: "info"
};

export function StatusSummaryCard({
  title,
  headingLevel,
  description,
  state = "info",
  icon,
  statusLabel,
  details,
  primaryAction,
  secondaryAction,
  selected = false,
  compact = false,
  layout = "default",
  className,
  children,
  ...props
}: StatusSummaryCardProps) {
  const tone = statusSummaryToneByState[state];
  const TitleElement: React.ElementType = headingLevel ? `h${headingLevel}` : "strong";
  return (
    <Card
      className={cn(
        "tl-status-summary",
        `tl-status-summary--${state}`,
        compact && "tl-status-summary--compact",
        layout !== "default" && `tl-status-summary--${layout}`,
        className
      )}
      selected={selected}
      {...props}
    >
      <header className="tl-status-summary__header">
        <span className="tl-status-summary__icon">
          <Icon name={icon ?? alertIconForTone(tone)} size="var(--taliya-control-status-summary-icon-size)" />
        </span>
        <span>
          <TitleElement className="tl-status-summary__title">{title}</TitleElement>
          {description ? <small>{description}</small> : null}
        </span>
        <Chip tone={tone}>{statusLabel ?? state}</Chip>
      </header>
      {details ? (
        <dl className="tl-status-summary__details">
          {details.map((detail) => (
            <span key={typeof detail.label === "string" || typeof detail.label === "number" ? String(detail.label) : String(detail.value)}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {children ? <div className="tl-status-summary__body">{children}</div> : null}
      {primaryAction || secondaryAction ? (
        <footer className="tl-status-summary__actions">
          {layout === "hero" ? <>{primaryAction}{secondaryAction}</> : <>{secondaryAction}{primaryAction}</>}
        </footer>
      ) : null}
    </Card>
  );
}
