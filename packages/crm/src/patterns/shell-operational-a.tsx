/** Operational shell surfaces, rows, and status cards. */
import React from "react";
import {
  Avatar,
  Chip,
  Icon,
  IconButton,
  InlineGroup,
  ListIcon,
  MetricTile,
  Panel,
  PrimitiveButton,
  StatusDot,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName, StatusDotStatus } from "@taliya/ui";
import { CrmSurface } from "./shell-foundation.js";
import type { CrmSurfaceProps } from "./shell-foundation.js";
import { componentLabel } from "./shell-utilities.js";
import { QuickReplyChips } from "./composer-and-handoff.js";

export type JourneyShellAction = "add" | "share" | "calendar";

export interface JourneyShellCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (surface: "primary" | "secondary-left" | "secondary-right", action: JourneyShellAction) => void;
}

const journeyParticipantCounts = [2, 3, 2, 1, 0, 1, 0, 0];

function JourneyShellActions({ surface, onAction }: Pick<JourneyShellCanvasProps, "onAction"> & { surface: "primary" | "secondary-left" | "secondary-right" }) {
  return <div className="tcrm-journey-shell-canvas__actions">
    <IconButton icon="plus" label="Adicionar" onClick={() => onAction?.(surface, "add")} variant="subtle" />
    <IconButton icon="upload" label="Compartilhar" onClick={() => onAction?.(surface, "share")} variant="subtle" />
    <IconButton icon="calendar" label="Abrir calendario" onClick={() => onAction?.(surface, "calendar")} variant="subtle" />
  </div>;
}

export function JourneyShellCanvas({ onAction, className, ...props }: JourneyShellCanvasProps) {
  return <div className={cn("tcrm-journey-shell-canvas", className)} data-component="JourneyShellCanvas" {...props}>
    <Panel className="tcrm-journey-shell-canvas__surface tcrm-journey-shell-canvas__surface--primary" variant="crm">
      <h2>Area principal</h2>
      <div aria-label="Participantes" className="tcrm-journey-shell-canvas__participants">
        {journeyParticipantCounts.map((count, index) => <span className="tcrm-journey-shell-canvas__participant" key={`participant-${index}`}>
          <Icon name="user" size="md" tone="neutral" />
          <small className={count > 0 ? (index < 2 ? "is-info" : "is-danger") : undefined}>{count}</small>
        </span>)}
      </div>
      <JourneyShellActions onAction={onAction} surface="primary" />
    </Panel>
    <div className="tcrm-journey-shell-canvas__lower">
      <Panel className="tcrm-journey-shell-canvas__surface" variant="crm"><JourneyShellActions onAction={onAction} surface="secondary-left" /></Panel>
      <Panel className="tcrm-journey-shell-canvas__surface" variant="crm"><JourneyShellActions onAction={onAction} surface="secondary-right" /></Panel>
    </div>
  </div>;
}

export type CrmOperationalRowKind = "default" | "checklist" | "schedule" | "money";

export interface CrmOperationalRowData {
  id: string;
  title: string;
  meta?: string;
  tone?: ComponentTone;
  icon?: IconName;
  status?: string;
  statusTone?: ComponentTone;
  selected?: boolean;
  completed?: boolean;
  disabled?: boolean;
}

export interface CrmOperationalPanelProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  icon: IconName;
  badge?: React.ReactNode;
  compact?: boolean;
  footer?: React.ReactNode;
}

export function CrmOperationalPanel({
  title,
  icon,
  badge,
  compact = false,
  footer,
  className,
  children,
  ...props
}: CrmOperationalPanelProps) {
  return (
    <Panel className={cn("tcrm-operational-panel", compact && "tcrm-operational-panel--compact", className)} variant="crm" {...props}>
      <header className="tcrm-operational-panel__header">
        <InlineGroup compact>
          <Icon name={icon} size={18} />
          <strong>{title}</strong>
        </InlineGroup>
        {badge}
      </header>
      {children}
      {footer ? <footer className="tcrm-operational-panel__footer">{footer}</footer> : null}
    </Panel>
  );
}

function statusForOperationalTone(tone?: ComponentTone): StatusDotStatus {
  if (tone === "success") return "success";
  if (tone === "warning") return "warning";
  if (tone === "danger") return "error";
  if (tone === "info") return "info";
  return "neutral";
}

export interface CrmOperationalRowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  row: CrmOperationalRowData;
  dense?: boolean;
  compact?: boolean;
  kind?: CrmOperationalRowKind;
}

export function CrmOperationalRow({
  row,
  dense = false,
  compact = false,
  kind = "default",
  className,
  type = "button",
  ...props
}: CrmOperationalRowProps) {
  return (
    <PrimitiveButton
      aria-label={props["aria-label"] ?? `Abrir ${row.title}`}
      aria-pressed={row.selected || undefined}
      className={cn(
        "tcrm-operational-row",
        `tcrm-operational-row--${kind}`,
        dense && "tcrm-operational-row--dense",
        compact && "tcrm-operational-row--compact",
        row.selected && "is-selected",
        row.completed && "is-complete",
        className
      )}
      data-component="CrmOperationalRow"
      data-completed={row.completed || undefined}
      {...props}
      disabled={row.disabled || props.disabled}
      type={type}
    >
      <span className="tcrm-operational-row__leading">
        {row.completed && kind === "checklist" ? (
          <span aria-label="Concluido" className="tcrm-operational-row__completed-mark"><Icon name="check" size={12} /></span>
        ) : row.icon ? <ListIcon icon={row.icon} tone={row.tone ?? "neutral"} /> : <StatusDot status={statusForOperationalTone(row.tone)} />}
      </span>
      <span className="tcrm-operational-row__content">
        <strong>{row.title}</strong>
        {row.meta ? <small>{row.meta}</small> : null}
      </span>
      {row.status ? <Chip showDot={false} tone={row.statusTone ?? row.tone ?? "neutral"}>{row.status}</Chip> : null}
      <Icon name="chevronRight" size={16} />
    </PrimitiveButton>
  );
}

export interface CrmOperationalRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: CrmOperationalRowData[];
  dense?: boolean;
  compact?: boolean;
  kind?: CrmOperationalRowKind;
  onRowOpen?: (row: CrmOperationalRowData) => void;
}

export function CrmOperationalRows({
  rows,
  dense = false,
  compact = false,
  kind = "default",
  className,
  onRowOpen,
  ...props
}: CrmOperationalRowsProps) {
  return (
    <div className={cn("tcrm-operational-rows", dense && "tcrm-operational-rows--dense", compact && "tcrm-operational-rows--compact", `tcrm-operational-rows--${kind}`, className)} {...props}>
      {rows.map((row) => (
        <CrmOperationalRow compact={compact} dense={dense} kind={kind} key={row.id} onClick={() => onRowOpen?.(row)} row={row} />
      ))}
    </div>
  );
}

export const QuotaBadge = ({
  value,
  label,
  className
}: {
  value: 70 | 90 | 100 | "normal";
  label?: string;
  className?: string;
}) => {
  const tone: ComponentTone = value === "normal" ? "success" : value === 70 ? "info" : value === 90 ? "warning" : "danger";
  return (
    <Chip className={className} icon={value === "normal" ? "checkCircle" : undefined} showDot={false} tone={tone}>
      {label ?? (value === "normal" ? "Normal" : `${value}%`)}
    </Chip>
  );
};

export function MetricCard({
  label,
  value,
  trend,
  tone = "neutral",
  action,
  className
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  trend?: React.ReactNode;
  tone?: ComponentTone;
  action?: React.ReactNode;
  className?: string;
}) {
  const metricTone = tone === "success" ? "positive" : tone === "danger" ? "negative" : tone === "warning" ? "warning" : "neutral";
  return (
    <MetricTile
      action={action}
      className={cn("tcrm-metric-card", className)}
      delta={trend}
      label={label}
      tone={metricTone}
      value={value}
    />
  );
}

export function StatusCard({
  title,
  description,
  state = "ok",
  action,
  className,
  children
}: CrmSurfaceProps) {
  return (
    <CrmSurface
      className={cn("tcrm-status-card", className)}
      component="StatusCard"
      description={description}
      icon={state === "blocked" ? "lock" : "shield"}
      state={state}
      title={title}
      action={action}
    >
      {children}
    </CrmSurface>
  );
}

export function AgentStatus({
  state = "active",
  label,
  className
}: {
  state?: "active" | "paused" | "blocked" | "helping";
  label?: string;
  className?: string;
}) {
  const status = state === "active" ? "online" : state === "paused" ? "paused" : state === "blocked" ? "error" : "success";
  return <StatusDot className={className} label={label ?? componentLabel(state)} status={status} />;
}

export function AgentPanel({
  title = "Agente Taliya",
  role = "Assistente contextual",
  state = "active",
  suggestions,
  children,
  className
}: CrmSurfaceProps & { role?: React.ReactNode; suggestions?: string[] }) {
  return (
    <Panel className={cn("tcrm-agent-panel", className)} variant="elevated">
      <header className="tcrm-agent-panel__header">
        <Avatar name="Taliya" size="md" status={state === "blocked" ? "error" : "online"} />
        <div>
          <h3>{title}</h3>
          <AgentStatus label={role?.toString()} state={state === "blocked" ? "blocked" : "active"} />
        </div>
      </header>
      <div className="tcrm-agent-panel__body">{children ?? <p>Pronto para orientar sem executar ações sensíveis sozinho.</p>}</div>
      {suggestions ? <QuickReplyChips items={suggestions} /> : null}
    </Panel>
  );
}
