import React from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";
import { Avatar } from "./identity.js";
import { Button, IconButton } from "../primitives/button.js";
import { Chip, type StatusDotStatus } from "../primitives/feedback.js";
import { Card, MetaText } from "../primitives/layout.js";
import { ProgressBar, type ProgressBarProps } from "../primitives/overlays.js";
import { alertIconForTone } from "./workflow-utilities.js";

export type ImportProgressCardState = "running" | "complete" | "duplicate" | "error" | "paused";

export interface ImportProgressMetric {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface ImportProgressCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  fileName?: React.ReactNode;
  value?: number;
  state?: ImportProgressCardState;
  metrics?: ImportProgressMetric[];
  helperText?: React.ReactNode;
  compact?: boolean;
  summary?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onDetails?: () => void;
  onRetry?: () => void;
}

const importToneByState: Record<ImportProgressCardState, ComponentTone> = {
  running: "info",
  complete: "success",
  duplicate: "warning",
  error: "danger",
  paused: "paused"
};

const importIconByState: Record<ImportProgressCardState, IconName> = {
  running: "loader",
  complete: "check",
  duplicate: "copy",
  error: "alert",
  paused: "pause"
};

export function ImportProgressCard({
  title,
  fileName,
  value = 0,
  state = "running",
  metrics = [],
  helperText,
  compact = false,
  summary = false,
  onPause,
  onResume,
  onDetails,
  onRetry,
  className,
  ...props
}: ImportProgressCardProps) {
  const tone = importToneByState[state];
  const progressTone: ProgressBarProps["tone"] =
    tone === "success" || tone === "warning" || tone === "danger" || tone === "info" ? tone : "default";
  return (
    <Card className={cn("tl-import-progress", summary && "tl-import-progress--summary", compact && "tl-import-progress--compact", className)} {...props}>
      <header className="tl-import-progress__header">
        <span className={cn("tl-import-progress__icon", state === "running" && "tl-import-progress__icon--running")}>
          <Icon name={importIconByState[state]} />
        </span>
        <span>
          <strong>{title}</strong>
          {fileName ? <small>{fileName}</small> : null}
        </span>
        <Chip tone={tone}>{state}</Chip>
      </header>
      {!summary ? <ProgressBar label="Progresso" tone={progressTone} value={value} /> : null}
      {metrics.length ? (
        <dl className="tl-import-progress__metrics">
          {metrics.map((metric, index) => (
            <span key={`metric-${index}-${String(metric.label)}`}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {helperText ? <MetaText>{helperText}</MetaText> : null}
      {onPause || onResume || onDetails || onRetry ? (
        <footer className="tl-import-progress__actions">
          {onPause ? <Button leadingIcon="pause" onClick={onPause} size="sm" variant="secondary">Pausar</Button> : null}
          {onResume ? <Button leadingIcon="play" onClick={onResume} size="sm" variant="secondary">Continuar</Button> : null}
          {onRetry ? <Button leadingIcon="refresh" onClick={onRetry} size="sm" variant="secondary">Tentar novamente</Button> : null}
          {onDetails ? <Button onClick={onDetails} size="sm" variant="primary">Ver detalhes</Button> : null}
        </footer>
      ) : null}
    </Card>
  );
}

export type RelationshipCardVariant = "primary" | "related" | "conflict";

export interface RelationshipCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  name: string;
  roleLabel?: React.ReactNode;
  contact?: React.ReactNode;
  details?: Array<{ icon?: IconName; value: React.ReactNode }>;
  highlight?: React.ReactNode;
  avatarSrc?: string;
  avatarStatus?: StatusDotStatus | null;
  variant?: RelationshipCardVariant;
  selected?: boolean;
  disabled?: boolean;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  onSelect?: () => void;
  onAction?: () => void;
}

export function RelationshipCard({
  name,
  roleLabel,
  contact,
  details,
  highlight,
  avatarSrc,
  avatarStatus,
  variant = "related",
  selected = false,
  disabled = false,
  badge,
  badgeTone,
  onSelect,
  onAction,
  className,
  ...props
}: RelationshipCardProps) {
  const detailRows = details ?? (contact ? [{ value: contact }] : []);
  const isFeatured = selected && variant === "related";
  const defaultAvatarStatus = variant === "conflict" ? "danger" : variant === "primary" ? "success" : "info";
  const resolvedAvatarStatus = avatarStatus === undefined ? defaultAvatarStatus : avatarStatus ?? undefined;
  const resolvedBadgeTone = badgeTone ?? (variant === "conflict" ? "danger" : variant === "primary" ? "success" : "info");
  const content = (
    <>
      <Avatar name={name} size="xs" src={avatarSrc} status={resolvedAvatarStatus} />
      {isFeatured ? (
        <>
          <span className="tl-relationship-card__highlight">
            {highlight ?? <strong>{name}</strong>}
          </span>
          {roleLabel ? <small className="tl-relationship-card__featured-meta">{roleLabel}</small> : null}
          {badge ? <Chip className="tl-relationship-card__bottom-chip" showDot={false} tone="info">{badge}</Chip> : null}
        </>
      ) : (
        <>
          <span className="tl-relationship-card__body">
            <span className="tl-relationship-card__title">
              <strong>{name}</strong>
              {badge ? <Chip showDot={false} tone={resolvedBadgeTone}>{badge}</Chip> : null}
            </span>
            {roleLabel ? <small>{roleLabel}</small> : null}
          </span>
          {detailRows.map((detail, index) => (
            <span className="tl-relationship-card__detail" key={`detail-${index}-${String(detail.value)}`}>
              {detail.icon ? <Icon name={detail.icon} size={12} tone="neutral" /> : null}
              <MetaText>{detail.value}</MetaText>
            </span>
          ))}
        </>
      )}
      {onAction ? <IconButton disabled={disabled} icon="link" label={`Acao de ${name}`} onClick={(event) => { event.stopPropagation(); onAction(); }} size="sm" variant="ghost" /> : null}
    </>
  );
  const classes = cn(
    "tl-card",
    "tl-relationship-card",
    `tl-relationship-card--${variant}`,
    selected && "tl-relationship-card--selected",
    isFeatured && "tl-relationship-card--featured",
    disabled && "tl-card--disabled",
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

export type ConflictCardState = "warning" | "danger" | "suggestion" | "applied" | "unresolved";

export interface ConflictCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: ConflictCardState;
  facts?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  suggestion?: React.ReactNode;
  compact?: boolean;
  onApply?: () => void;
  onIgnore?: () => void;
  onView?: () => void;
}

const conflictToneByState: Record<ConflictCardState, ComponentTone> = {
  warning: "warning",
  danger: "danger",
  suggestion: "info",
  applied: "success",
  unresolved: "blocked"
};

export function ConflictCard({
  title,
  description,
  state = "warning",
  facts = [],
  suggestion,
  compact = false,
  onApply,
  onIgnore,
  onView,
  className,
  ...props
}: ConflictCardProps) {
  const tone = conflictToneByState[state];
  return (
    <Card className={cn("tl-conflict-card", `tl-conflict-card--${state}`, compact && "tl-conflict-card--compact", className)} {...props}>
      <header className="tl-conflict-card__header">
        <Icon name={alertIconForTone(tone)} />
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        <Chip tone={tone}>{state}</Chip>
      </header>
      {facts.length ? (
        <dl className="tl-conflict-card__facts">
          {facts.map((fact, index) => (
            <span key={`fact-${index}-${String(fact.label)}`}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </span>
          ))}
        </dl>
      ) : null}
      {suggestion ? (
        <div className="tl-conflict-card__suggestion">
          <span>{suggestion}</span>
          {compact && onApply ? <Button disabled={state === "applied"} onClick={onApply} size="sm" variant="primary">Aplicar sugestao</Button> : null}
        </div>
      ) : null}
      {(onApply || onIgnore || onView) ? (
        <footer className="tl-conflict-card__actions">
          {onView ? <Button onClick={onView} size="sm" variant="ghost">Ver cenario completo</Button> : null}
          {onIgnore ? <Button onClick={onIgnore} size="sm" variant="secondary">Ignorar</Button> : null}
          {onApply && !compact ? <Button disabled={state === "applied"} onClick={onApply} size="sm" variant="primary">Aplicar sugestao</Button> : null}
        </footer>
      ) : null}
    </Card>
  );
}
