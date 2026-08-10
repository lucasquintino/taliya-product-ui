import React, { useState } from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";
import { Avatar, PersonLabel } from "./identity.js";
import { Button, ButtonGroup, IconButton } from "../primitives/button.js";
import { Input, Toggle } from "../primitives/forms.js";
import type { InputProps } from "../primitives/forms.js";
import { Chip } from "../primitives/feedback.js";
import type { StatusDotStatus } from "../primitives/feedback.js";
import { Card, InlineGroup, MetaText } from "../primitives/layout.js";
import type { MetaTextProps } from "../primitives/layout.js";
import { EmptyState, ErrorState, List, ListItem, LoadingState } from "./state-list.js";
import { ProgressBar } from "../primitives/overlays.js";
import type { ProgressBarProps } from "../primitives/overlays.js";

function alertIconForTone(tone: ComponentTone): IconName {
  if (tone === "success") return "checkCircle";
  if (tone === "warning" || tone === "danger" || tone === "blocked") return "alert";
  if (tone === "paused") return "pause";
  if (tone === "info" || tone === "update" || tone === "quota") return "info";
  return "circle";
}
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
      role="listitem"
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
          {details.map((detail, index) => (
            <span key={index}>
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

export type DiffRowStatus = "changed" | "removed" | "added" | "approved" | "rejected";

export interface DiffTableRow {
  id: string;
  label: React.ReactNode;
  before: React.ReactNode;
  after: React.ReactNode;
  status?: DiffRowStatus;
}

export interface DiffTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  rows: DiffTableRow[];
  fieldHeader?: React.ReactNode;
  beforeHeader?: React.ReactNode;
  afterHeader?: React.ReactNode;
  actor?: React.ReactNode;
  actorAvatarSrc?: string;
  actorLabel?: React.ReactNode;
  origin?: React.ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  onRevert?: () => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  showStatusColumn?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const diffToneByStatus: Record<DiffRowStatus, ComponentTone> = {
  changed: "success",
  removed: "danger",
  added: "info",
  approved: "success",
  rejected: "danger"
};

export function DiffTable({
  title,
  meta,
  rows,
  fieldHeader = "Campo",
  beforeHeader = "Valor anterior",
  afterHeader = "Valor novo",
  actor,
  actorAvatarSrc,
  actorLabel,
  origin,
  onApprove,
  onReject,
  onRevert,
  onRowClick,
  compact = false,
  showStatusColumn = false,
  loading = false,
  error,
  className,
  ...props
}: DiffTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar o diff" description={error} />;
  if (loading) return <LoadingState title="Carregando diff" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhuma alteracao encontrada" />;

  return (
    <Card className={cn("tl-diff-table", compact && "tl-diff-table--compact", className)} {...props}>
      {title || meta ? (
        <header className="tl-batch-table__header">
          {title ? <strong>{title}</strong> : null}
          {meta ? <small>{meta}</small> : null}
        </header>
      ) : null}
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">{fieldHeader}</th>
              <th scope="col">{beforeHeader}</th>
              <th scope="col">{afterHeader}</th>
              {showStatusColumn ? <th scope="col">Status</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = row.status ?? "changed";
              return (
                <tr
                  aria-label={onRowClick ? `Abrir alteracao ${row.id}` : undefined}
                  className={cn("tl-diff-table__row", `tl-diff-table__row--${status}`, onRowClick && "tl-table__row--interactive")}
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                  onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                  role={onRowClick ? "button" : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  <td>{row.label}</td>
                  <td>{row.before}</td>
                  <td>{row.after}</td>
                  {showStatusColumn ? (
                    <td>
                      <Chip tone={diffToneByStatus[status]}>{status}</Chip>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(actor || origin || onApprove || onReject || onRevert) ? (
        <footer className="tl-batch-table__footer">
          <InlineGroup>
            {actorLabel ? <MetaText>{actorLabel}</MetaText> : null}
            {actor ? <PersonLabel avatarSrc={actorAvatarSrc} name={String(actor)} /> : null}
            {origin ? <MetaText>{origin}</MetaText> : null}
          </InlineGroup>
          <ButtonGroup align="end">
            {onRevert ? <Button onClick={onRevert} size="sm" variant="secondary">Reverter</Button> : null}
            {onReject ? <Button onClick={onReject} size="sm" variant="ghost">Rejeitar</Button> : null}
            {onApprove ? <Button leadingIcon="check" onClick={onApprove} size="sm" variant="primary">Aprovar</Button> : null}
          </ButtonGroup>
        </footer>
      ) : null}
    </Card>
  );
}

export type PermissionTableState = "allowed" | "blocked" | "request" | "pending";

export interface PermissionTableRow {
  id: string;
  module: React.ReactNode;
  profile: React.ReactNode;
  action: React.ReactNode;
  state: PermissionTableState;
}

export interface PermissionTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: PermissionTableRow[];
  onRequestAccess?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
}

const permissionToneByState: Record<PermissionTableState, ComponentTone> = {
  allowed: "success",
  blocked: "danger",
  request: "info",
  pending: "warning"
};

const permissionLabelByState: Record<PermissionTableState, string> = {
  allowed: "Permitido",
  blocked: "Bloqueado",
  request: "Solicitar acesso",
  pending: "Pendente"
};

const permissionIconByState: Record<PermissionTableState, IconName> = {
  allowed: "check",
  blocked: "alertCircle",
  request: "info",
  pending: "clock"
};

function handleInteractiveRowKeyDown(event: React.KeyboardEvent<HTMLElement>, action: () => void) {
  if (event.currentTarget !== event.target) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

export function PermissionTable({ rows, onRequestAccess, onRowClick, compact = false, className, ...props }: PermissionTableProps) {
  return (
    <div className={cn("tl-permission-table", compact && "tl-permission-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Modulo</th>
              <th scope="col">Perfil</th>
              <th scope="col">Acao</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir permissao ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td>{row.module}</td>
                <td>{row.profile}</td>
                <td>{row.action}</td>
                <td className="tl-permission-table__status">
                  {row.state === "request" && onRequestAccess ? (
                    <Button onClick={(event) => { event.stopPropagation(); onRequestAccess(row.id); }} size="sm" variant="secondary">
                      {permissionLabelByState[row.state]}
                    </Button>
                  ) : (
                    <Chip icon={permissionIconByState[row.state]} showDot={false} tone={permissionToneByState[row.state]}>{permissionLabelByState[row.state]}</Chip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type AuditTableStatus = "success" | "pending" | "alert" | "denied";

export interface AuditTableRow {
  id: string;
  actor: string;
  actorAvatarSrc?: string;
  object: React.ReactNode;
  action: React.ReactNode;
  time: React.ReactNode;
  origin: React.ReactNode;
  status: AuditTableStatus;
}

export interface AuditTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: AuditTableRow[];
  onOpenObject?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const auditToneByStatus: Record<AuditTableStatus, ComponentTone> = {
  success: "success",
  pending: "info",
  alert: "warning",
  denied: "danger"
};

const auditLabelByStatus: Record<AuditTableStatus, string> = {
  success: "Sucesso",
  pending: "Pendente",
  alert: "Alerta",
  denied: "Negada"
};

export function AuditTable({ rows, onOpenObject, onRowClick, compact = false, loading = false, error, className, ...props }: AuditTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar auditoria" description={error} />;
  if (loading) return <LoadingState title="Carregando auditoria" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhum log encontrado" icon="shield" />;

  return (
    <div className={cn("tl-audit-table", compact && "tl-audit-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Ator</th>
              <th scope="col">Objeto</th>
              <th scope="col">Acao</th>
              <th scope="col">Horario</th>
              <th scope="col">Origem</th>
              <th scope="col">Status</th>
              {onOpenObject ? <th scope="col">Abrir objeto</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir auditoria ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td><PersonLabel avatarSrc={row.actorAvatarSrc} name={row.actor} /></td>
                <td>{row.object}</td>
                <td>{row.action}</td>
                <td>{row.time}</td>
                <td>{row.origin}</td>
                <td><Chip showDot={false} tone={auditToneByStatus[row.status]}>{auditLabelByStatus[row.status]}</Chip></td>
                {onOpenObject ? (
                  <td className="tl-audit-table__action" onClick={(event) => event.stopPropagation()}>
                    <IconButton icon="externalLink" label={`Abrir ${row.id}`} onClick={() => onOpenObject(row.id)} size="sm" variant="ghost" />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
            <span key={index}>
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
            <span className="tl-relationship-card__detail" key={index}>
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
            <span key={index}>
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

export type DocumentPreviewState = "preview" | "signed" | "pending" | "error" | "loading";

export interface DocumentPreviewPage {
  id: string;
  label: React.ReactNode;
}

export interface DocumentPreviewHistoryItem {
  id: string;
  label: React.ReactNode;
  time?: React.ReactNode;
}

export interface DocumentPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  client?: React.ReactNode;
  date?: React.ReactNode;
  state?: DocumentPreviewState;
  stateLabel?: React.ReactNode;
  downloadLabel?: React.ReactNode;
  sendLabel?: React.ReactNode;
  pages?: DocumentPreviewPage[];
  selectedPageId?: string;
  history?: DocumentPreviewHistoryItem[];
  onPageSelect?: (pageId: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullscreen?: () => void;
  compact?: boolean;
}

const documentToneByState: Record<DocumentPreviewState, ComponentTone> = {
  preview: "info",
  signed: "success",
  pending: "warning",
  error: "danger",
  loading: "paused"
};

const documentLabelByState: Record<DocumentPreviewState, string> = {
  preview: "Visualizacao",
  signed: "Assinado",
  pending: "Pendente",
  error: "Erro",
  loading: "Carregando"
};

export function DocumentPreview({
  title,
  client,
  date,
  state = "preview",
  stateLabel,
  downloadLabel = "Baixar PDF",
  sendLabel = "Enviar por e-mail",
  pages = [],
  selectedPageId,
  history = [],
  onPageSelect,
  onDownload,
  onSend,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  compact = false,
  className,
  ...props
}: DocumentPreviewProps) {
  const effectivePageId = selectedPageId ?? pages[0]?.id;
  return (
    <Card className={cn("tl-document-preview", `tl-document-preview--${state}`, compact && "tl-document-preview--compact", className)} {...props}>
      <div className="tl-document-preview__rail" aria-label="Paginas">
        {pages.map((page, index) => {
          const pageLabel = typeof page.label === "string" || typeof page.label === "number" ? String(page.label) : String(index + 1);
          return (
            <button
              aria-current={page.id === effectivePageId ? "page" : undefined}
              aria-label={`Pagina ${pageLabel}`}
              className={cn("tl-document-preview__thumb", page.id === effectivePageId && "tl-document-preview__thumb--selected")}
              key={page.id}
              onClick={() => onPageSelect?.(page.id)}
              type="button"
            >
              <span>{page.label}</span>
            </button>
          );
        })}
      </div>
      <section className="tl-document-preview__canvas">
        <strong>{title}</strong>
        {client ? <small>{client}</small> : null}
        {date ? <MetaText>{date}</MetaText> : null}
        <span className="tl-document-preview__line tl-document-preview__line--wide" />
        <span className="tl-document-preview__line" />
        <span className="tl-document-preview__line tl-document-preview__line--short" />
        <footer className="tl-document-preview__toolbar">
          <IconButton icon="minus" label="Reduzir zoom" onClick={onZoomOut} size="sm" variant="ghost" />
          <MetaText>100%</MetaText>
          <IconButton icon="plus" label="Aumentar zoom" onClick={onZoomIn} size="sm" variant="ghost" />
          <IconButton icon="eye" label="Tela cheia" onClick={onFullscreen} size="sm" variant="ghost" />
        </footer>
      </section>
      <aside className="tl-document-preview__meta">
        <Chip tone={documentToneByState[state]}>{stateLabel ?? documentLabelByState[state]}</Chip>
        <ButtonGroup align="start">
          {onDownload ? <Button leadingIcon="download" onClick={onDownload} size="sm" variant="secondary">{downloadLabel}</Button> : null}
          {onSend ? <Button leadingIcon="mail" onClick={onSend} size="sm" variant="secondary">{sendLabel}</Button> : null}
        </ButtonGroup>
        {history.length ? (
          <List dense divided>
            {history.map((item) => (
              <ListItem key={item.id} meta={item.time} title={item.label} />
            ))}
          </List>
        ) : null}
      </aside>
    </Card>
  );
}

export type ExecutionRowStatus = "running" | "success" | "failed" | "pending" | "skipped";

export interface ExecutionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  step: number;
  title: React.ReactNode;
  tool?: React.ReactNode;
  status?: ExecutionRowStatus;
  duration?: React.ReactNode;
  cost?: React.ReactNode;
  error?: React.ReactNode;
  details?: React.ReactNode;
  statusLabel?: React.ReactNode;
  compact?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  onRetry?: () => void;
  onOpen?: () => void;
}

const executionToneByStatus: Record<ExecutionRowStatus, ComponentTone> = {
  running: "info",
  success: "success",
  failed: "danger",
  pending: "paused",
  skipped: "neutral"
};

export function ExecutionRow({
  step,
  title,
  tool,
  status = "pending",
  duration,
  cost,
  error,
  details,
  statusLabel,
  compact = false,
  expanded = false,
  onToggle,
  onRetry,
  onOpen,
  className,
  ...props
}: ExecutionRowProps) {
  const tone = executionToneByStatus[status];
  return (
    <div className={cn("tl-execution-row", `tl-execution-row--${status}`, compact && "tl-execution-row--compact", expanded && "tl-execution-row--expanded", className)} {...props}>
      <button
        aria-expanded={details ? expanded : undefined}
        className="tl-execution-row__main"
        disabled={!details && !onToggle}
        onClick={onToggle}
        type="button"
      >
        <span className="tl-execution-row__marker" data-step={step}>{step}</span>
        <span className="tl-execution-row__title">
          <strong>{title}</strong>
          {tool ? <small>{tool}</small> : null}
        </span>
        <Chip tone={tone}>{statusLabel ?? status}</Chip>
        {duration ? <MetaText>{duration}</MetaText> : null}
        {cost ? <MetaText>{cost}</MetaText> : null}
        {error ? <MetaText tone="danger">{error}</MetaText> : null}
      </button>
      {(onRetry || onOpen) ? (
        <span className="tl-execution-row__actions">
          {onRetry ? <IconButton icon="refresh" label="Reprocessar" onClick={onRetry} size="sm" variant="ghost" /> : null}
          {onOpen ? <IconButton icon="arrowRight" label="Abrir detalhes" onClick={onOpen} size="sm" variant="ghost" /> : null}
        </span>
      ) : null}
      {expanded && details ? <div className="tl-execution-row__details">{details}</div> : null}
    </div>
  );
}

export type ConfidenceMeterLevel = "low" | "medium" | "high" | "unknown";

export interface ConfidenceMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  level?: ConfidenceMeterLevel;
  segments?: number;
  compact?: boolean;
  loading?: boolean;
}

const confidenceToneByLevel: Record<ConfidenceMeterLevel, ComponentTone> = {
  low: "danger",
  medium: "warning",
  high: "success",
  unknown: "paused"
};

export function ConfidenceMeter({
  value = 0,
  label,
  helperText,
  level,
  segments = 5,
  compact = false,
  loading = false,
  className,
  style,
  ...props
}: ConfidenceMeterProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const segmentCount = Math.max(1, Math.round(segments));
  const effectiveLevel = level ?? (normalizedValue >= 75 ? "high" : normalizedValue >= 45 ? "medium" : normalizedValue > 0 ? "low" : "unknown");
  const activeSegments = loading ? 0 : Math.ceil((normalizedValue / 100) * segmentCount);
  const tone = confidenceToneByLevel[effectiveLevel];

  return (
    <Card
      className={cn("tl-confidence-meter", `tl-confidence-meter--${effectiveLevel}`, compact && "tl-confidence-meter--compact", loading && "tl-confidence-meter--loading", className)}
      style={{ "--tl-confidence-meter-segment-count": segmentCount, ...style } as React.CSSProperties}
      {...props}
    >
      <header className="tl-confidence-meter__header">
        <Chip icon="sparkles" tone={tone}>{label ?? (effectiveLevel === "high" ? "Alta confianca" : effectiveLevel === "medium" ? "Confianca media" : effectiveLevel === "low" ? "Baixa confianca" : "Sem leitura")}</Chip>
      </header>
      <strong className="tl-confidence-meter__value">{loading ? "--" : `${normalizedValue}%`}</strong>
      <div
        aria-label="Confianca"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={loading ? undefined : normalizedValue}
        className="tl-confidence-meter__segments"
        role="progressbar"
      >
        {Array.from({ length: segmentCount }, (_, index) => (
          <span className={index < activeSegments ? "tl-confidence-meter__segment--active" : undefined} key={index} />
        ))}
      </div>
      {helperText ? <p>{helperText}</p> : null}
    </Card>
  );
}

export interface SearchInputProps extends Omit<InputProps, "leadingIcon" | "type"> {
  loading?: boolean;
  resultCount?: React.ReactNode;
  onFilter?: () => void;
  filterLabel?: string;
  filterPlacement?: "separate" | "embedded";
}

export function SearchInput({
  loading = false,
  resultCount,
  onFilter,
  filterLabel = "Abrir filtros",
  filterPlacement = "separate",
  className,
  ...props
}: SearchInputProps) {
  const isFilterEmbedded = filterPlacement === "embedded";

  return (
    <div className={cn("tl-search-input", isFilterEmbedded && "tl-search-input--filter-embedded", className)}>
      <Input
        className="tl-search-input__field"
        leadingIcon="search"
        loading={loading}
        trailingText={resultCount ? <span className="tl-search-input__count">{resultCount}</span> : undefined}
        type="search"
        {...props}
      />
      {onFilter ? (
        <IconButton
          className="tl-search-input__filter"
          icon="sliders"
          label={filterLabel}
          onClick={onFilter}
          size={isFilterEmbedded ? "sm" : "md"}
        />
      ) : null}
    </div>
  );
}

export type MessageBubbleVariant = "inbound" | "outbound" | "internal" | "failed" | "suggestion";

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MessageBubbleVariant;
  sender?: React.ReactNode;
  timestamp?: React.ReactNode;
  status?: "sent" | "delivered" | "read" | "pending" | "failed" | "locked";
  action?: React.ReactNode;
  confidence?: React.ReactNode;
}

export function MessageBubble({
  variant = "inbound",
  sender,
  timestamp,
  status,
  action,
  confidence,
  className,
  children,
  role,
  ...props
}: MessageBubbleProps) {
  const effectiveStatus = status ?? (variant === "failed" ? "failed" : undefined);
  const iconForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, IconName>> = {
    delivered: "check",
    failed: "alert",
    locked: "lock",
    pending: "clock",
    read: "checkCircle",
    sent: "check"
  };
  const labelForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, string>> = {
    delivered: "Mensagem entregue",
    failed: "Mensagem com falha",
    locked: "Nota interna bloqueada",
    pending: "Mensagem pendente",
    read: "Mensagem lida",
    sent: "Mensagem enviada"
  };

  return (
    <div
      className={cn("tl-message-bubble", `tl-message-bubble--${variant}`, className)}
      role={role ?? (variant === "failed" ? "alert" : undefined)}
      {...props}
    >
      {sender || confidence ? (
        <div className="tl-message-bubble__header">
          {sender ? <strong>{sender}</strong> : null}
          {confidence ? <Chip tone="info">{confidence}</Chip> : null}
        </div>
      ) : null}
      <div className="tl-message-bubble__body">{children}</div>
      {timestamp || effectiveStatus || action ? (
        <div className="tl-message-bubble__meta">
          {timestamp ? <span>{timestamp}</span> : null}
          {effectiveStatus ? (
            <span
              aria-label={labelForStatus[effectiveStatus]}
              className={cn("tl-message-bubble__status", `tl-message-bubble__status--${effectiveStatus}`)}
              role="img"
            >
              <Icon name={iconForStatus[effectiveStatus] ?? "circle"} size={13} />
            </span>
          ) : null}
          {action ? <span className="tl-message-bubble__action">{action}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export interface ComposerInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "onChange" | "value"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSend?: (value: string, options: { internal: boolean }) => void;
  internal?: boolean;
  defaultInternal?: boolean;
  onInternalChange?: (internal: boolean) => void;
  allowEmptySend?: boolean;
  sending?: boolean;
  sendLabel?: string;
  attachLabel?: string;
  mediaLabel?: string;
  quickReplyLabel?: string;
  showFieldIcon?: boolean;
  showInternalToggle?: boolean;
  onAttach?: () => void;
  onMedia?: () => void;
  onQuickReply?: () => void;
  actionsOrder?: Array<"attach" | "quickReply" | "media">;
  quickReplyControl?: React.ReactNode;
  sendTrailingControl?: React.ReactNode;
}

export function ComposerInput({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  internal,
  defaultInternal = false,
  onInternalChange,
  allowEmptySend = false,
  sending = false,
  disabled = false,
  placeholder = "Digite sua mensagem...",
  sendLabel = "Enviar",
  attachLabel = "Anexar arquivo",
  mediaLabel = "Abrir midia interna",
  quickReplyLabel = "Modelos e respostas rapidas",
  showFieldIcon = true,
  showInternalToggle = true,
  onAttach,
  onMedia,
  onQuickReply,
  actionsOrder = ["attach", "quickReply", "media"],
  quickReplyControl,
  sendTrailingControl,
  className,
  ...props
}: ComposerInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [uncontrolledInternal, setUncontrolledInternal] = useState(defaultInternal);
  const currentValue = value ?? internalValue;
  const currentInternal = internal ?? uncontrolledInternal;
  const canSend = (allowEmptySend || currentValue.trim().length > 0) && !disabled && !sending;

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const send = () => {
    if (!canSend) return;
    onSend?.(currentValue, { internal: currentInternal });
    if (value === undefined) setInternalValue("");
  };

  const updateInternal = (nextInternal: boolean) => {
    if (internal === undefined) setUncontrolledInternal(nextInternal);
    onInternalChange?.(nextInternal);
  };

  const actionControl = (action: "attach" | "quickReply" | "media") => {
    if (action === "attach") {
      return <IconButton key="attach" disabled={disabled} icon="paperclip" label={attachLabel} onClick={onAttach} size="sm" variant="ghost" />;
    }

    if (action === "quickReply") {
      return quickReplyControl ?? (
        <IconButton key="quickReply" disabled={disabled} icon="layout" label={quickReplyLabel} onClick={onQuickReply} size="sm" variant="ghost" />
      );
    }

    return <IconButton key="media" disabled={disabled} icon="fileText" label={mediaLabel} onClick={onMedia} size="sm" variant="ghost" />;
  };

  return (
    <div className={cn("tl-composer-input", currentInternal && "tl-composer-input--internal", disabled && "tl-composer-input--disabled", className)}>
      <div className="tl-composer-input__field">
        {showFieldIcon ? <Icon name="message" size={16} /> : null}
        <textarea
          aria-label={props["aria-label"] ?? "Mensagem"}
          disabled={disabled}
          onChange={(event) => updateValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              send();
            }
          }}
          placeholder={placeholder}
          value={currentValue}
          {...props}
        />
      </div>
      <div className="tl-composer-input__toolbar">
        <span className="tl-composer-input__actions">
          {actionsOrder.map((action) => <React.Fragment key={action}>{actionControl(action)}</React.Fragment>)}
        </span>
        <span className="tl-composer-input__submit">
          {showInternalToggle ? (
            <Toggle
              className="tl-composer-input__toggle"
              disabled={disabled}
              label="Nota interna"
              onPressedChange={updateInternal}
              pressed={currentInternal}
            />
          ) : null}
          <Button
            className="tl-composer-input__send"
            disabled={!canSend}
            leadingIcon={sending ? "loader" : "send"}
            loading={sending}
            onClick={send}
            size="sm"
            type="button"
            variant="primary"
          >
            {sendLabel}
          </Button>
          {sendTrailingControl}
        </span>
      </div>
    </div>
  );
}
