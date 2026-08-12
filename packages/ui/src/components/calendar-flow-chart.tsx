import React from "react";
import { cn, Icon, type IconName } from "../foundation.js";
import { IconButton } from "../primitives/button.js";
import { EmptyState, LoadingState } from "./state-list.js";
export interface CalendarCellEvent {
  id?: string;
  tone?: "info" | "success" | "warning" | "danger" | "neutral";
  label?: string;
}

export interface CalendarGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 5 | 7;
}

export function CalendarGrid({ columns = 7, className, ...props }: CalendarGridProps) {
  return <div className={cn("tl-calendar-grid", `tl-calendar-grid--${columns}`, className)} {...props} />;
}

export interface CalendarCellProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  day: React.ReactNode;
  eyebrow?: React.ReactNode;
  selected?: boolean;
  today?: boolean;
  conflict?: boolean;
  muted?: boolean;
  events?: CalendarCellEvent[];
}

export function CalendarCell({
  day,
  eyebrow,
  selected = false,
  today = false,
  conflict = false,
  muted = false,
  events = [],
  disabled,
  className,
  ...props
}: CalendarCellProps) {
  return (
    <button
      aria-current={today ? "date" : undefined}
      aria-pressed={selected}
      className={cn(
        "tl-calendar-cell",
        selected && "tl-calendar-cell--selected",
        today && "tl-calendar-cell--today",
        conflict && "tl-calendar-cell--conflict",
        muted && "tl-calendar-cell--muted",
        className
      )}
      disabled={disabled}
      type="button"
      {...props}
    >
      {eyebrow ? <span className="tl-calendar-cell__eyebrow">{eyebrow}</span> : null}
      <strong>{day}</strong>
      {events.length > 0 ? (
        <span className="tl-calendar-cell__events" aria-label={`${events.length} eventos`}>
          {events.slice(0, 4).map((event, index) => (
            <span
              className={cn("tl-calendar-cell__event-dot", `tl-calendar-cell__event-dot--${event.tone ?? "info"}`)}
              key={event.id ?? `${event.label ?? "event"}-${index}`}
              title={event.label}
            />
          ))}
        </span>
      ) : null}
    </button>
  );
}

export type CalendarEventBlockStatus = "scheduled" | "full" | "available" | "conflict" | "cancelled";

export interface CalendarEventBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: CalendarEventBlockStatus;
  time?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  capacity?: React.ReactNode;
  compact?: boolean;
  action?: React.ReactNode;
}

export function CalendarEventBlock({
  status = "scheduled",
  time,
  title,
  meta,
  capacity,
  compact = false,
  action,
  className,
  ...props
}: CalendarEventBlockProps) {
  return (
    <div className={cn("tl-calendar-event", `tl-calendar-event--${status}`, compact && "tl-calendar-event--compact", className)} {...props}>
      <div className="tl-calendar-event__header">
        {time ? <span>{time}</span> : null}
        {action ? <span className="tl-calendar-event__action">{action}</span> : null}
      </div>
      <strong>{title}</strong>
      {meta ? <small>{meta}</small> : null}
      {capacity ? <span className="tl-calendar-event__capacity">{capacity}</span> : null}
    </div>
  );
}

export type FlowNodeVariant = "trigger" | "condition" | "action" | "approval" | "fallback" | "blocked";

export interface FlowNodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: FlowNodeVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  icon?: IconName;
  selected?: boolean;
  blocked?: boolean;
  onMenu?: () => void;
  menuLabel?: string;
}

export function FlowNode({
  variant = "action",
  title,
  description,
  status,
  icon,
  selected = false,
  blocked = false,
  onMenu,
  menuLabel = "Abrir opcoes do no",
  className,
  onClick,
  onKeyDown,
  ...props
}: FlowNodeProps) {
  const iconByVariant: Record<FlowNodeVariant, IconName> = {
    action: "send",
    approval: "users",
    blocked: "lock",
    condition: "filter",
    fallback: "shield",
    trigger: "sparkles"
  };
  const actionable = Boolean(onClick);
  const interactive = actionable && !blocked;

  return (
    <div
      aria-label={actionable && typeof title === "string" ? title : undefined}
      aria-disabled={blocked || undefined}
      className={cn(
        "tl-flow-node",
        `tl-flow-node--${variant}`,
        selected && "tl-flow-node--selected",
        blocked && "tl-flow-node--blocked",
        interactive && "tl-flow-node--interactive",
        className
      )}
      onClick={interactive ? onClick : undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      role={actionable ? "button" : "group"}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <span className="tl-flow-node__port tl-flow-node__port--in" />
      <span className="tl-flow-node__port tl-flow-node__port--out" />
      <div className="tl-flow-node__top">
        <span className="tl-flow-node__icon">
          <Icon name={icon ?? iconByVariant[variant]} size={16} />
        </span>
        {onMenu ? (
          <IconButton
            icon="ellipsis"
            label={menuLabel}
            onClick={(event) => {
              event.stopPropagation();
              onMenu();
            }}
            size="sm"
            variant="ghost"
          />
        ) : null}
      </div>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {status ? <span className="tl-flow-node__status">{status}</span> : null}
    </div>
  );
}

export type ChartPanelVariant = "line" | "bar" | "funnel" | "ranking" | "heatmap";

export interface ChartPanelDatum {
  label: string;
  value: number;
}

export interface ChartPanelPrimitiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ChartPanelVariant;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  data?: ChartPanelDatum[];
  legend?: React.ReactNode;
  action?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
}

const defaultChartData: ChartPanelDatum[] = [
  { label: "22/04", value: 34 },
  { label: "23/04", value: 46 },
  { label: "24/04", value: 39 },
  { label: "25/04", value: 58 },
  { label: "26/04", value: 49 },
  { label: "27/04", value: 66 }
];

function ChartPanelGraphic({ variant, data }: { variant: ChartPanelVariant; data: ChartPanelDatum[] }) {
  if (variant === "heatmap") {
    return (
      <div className="tl-chart-panel__heatmap" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, index) => (
          <span key={`heat-${index}`} className={`tl-chart-panel__heat-${(index % 4) + 1}`} />
        ))}
      </div>
    );
  }

  if (variant === "ranking") {
    return (
      <div className="tl-chart-panel__ranking">
        {data.slice(0, 5).map((item) => (
          <span key={item.label}>
            <strong>{item.label}</strong>
            <i style={{ width: `${Math.max(14, item.value)}%` }} />
            <em>{item.value}</em>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "funnel") {
    return (
      <div className="tl-chart-panel__funnel">
        {data.slice(0, 4).map((item, index) => (
          <span key={item.label} style={{ width: `${100 - index * 13}%` }}>
            <strong>{item.label}</strong>
            <em>{item.value}%</em>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div className="tl-chart-panel__bars" aria-hidden="true">
        {data.map((item) => (
          <span key={item.label} style={{ height: `${Math.max(18, item.value)}%` }} />
        ))}
      </div>
    );
  }

  return (
    <svg aria-hidden="true" className="tl-chart-panel__line" viewBox="0 0 260 120">
      <path d="M14 94 H248 M14 64 H248 M14 34 H248" />
      <polyline points="14,84 58,68 102,74 146,48 190,56 238,30" />
      <polyline className="tl-chart-panel__line-secondary" points="14,96 58,82 102,86 146,70 190,62 238,48" />
    </svg>
  );
}

export function ChartPanelPrimitive({
  variant = "line",
  title,
  subtitle,
  data = defaultChartData,
  legend,
  action,
  loading = false,
  empty = false,
  className,
  ...props
}: ChartPanelPrimitiveProps) {
  return (
    <section className={cn("tl-chart-panel", `tl-chart-panel--${variant}`, loading && "tl-chart-panel--loading", empty && "tl-chart-panel--empty", className)} {...props}>
      <header className="tl-chart-panel__header">
        <span>
          <strong>{title}</strong>
          {subtitle ? <small>{subtitle}</small> : null}
        </span>
        {action}
      </header>
      {loading ? <LoadingState className="tl-chart-panel__state" title="Carregando grafico" variant="spinner" /> : null}
      {!loading && empty ? <EmptyState className="tl-chart-panel__state" icon="barChart" title="Sem dados" /> : null}
      {!loading && !empty ? <ChartPanelGraphic data={data} variant={variant} /> : null}
      {legend && !loading && !empty ? <footer className="tl-chart-panel__legend">{legend}</footer> : null}
    </section>
  );
}
