/** Kanban board and card composition patterns. */
import React from "react";
import { Badge, Card, Chip, Icon, IconButton, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "./shell-foundation.js";
import { stateKey, toneForState } from "./shell-utilities.js";

export interface KanbanCardData {
  id: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  state?: string;
  owner?: React.ReactNode;
  impact?: React.ReactNode;
  nextAction?: React.ReactNode;
  tags?: Array<React.ReactNode | KanbanCardTag>;
}

export interface KanbanCardTag {
  label: React.ReactNode;
  tone?: ComponentTone;
  icon?: IconName;
}

const kanbanTagByLabel: Record<string, { tone: ComponentTone; icon?: IconName }> = {
  Agenda: { tone: "neutral", icon: "calendar" },
  Dados: { tone: "neutral", icon: "database" },
  Decisao: { tone: "warning" },
  Decisão: { tone: "warning" },
  Financeiro: { tone: "neutral", icon: "banknote" },
  Inbox: { tone: "neutral", icon: "message" },
  Sistema: { tone: "neutral", icon: "settings" },
  Tarefa: { tone: "info" }
};

function kanbanTagMeta(tag: React.ReactNode | KanbanCardTag): KanbanCardTag {
  if (tag && typeof tag === "object" && "label" in tag) {
    return tag;
  }
  const key = typeof tag === "string" ? tag : "";
  return { label: tag, ...(kanbanTagByLabel[key] ?? { tone: "neutral" as ComponentTone }) };
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "standard" | "comfortable" | "compact";
  laneWidth?: "default" | "commercial" | "finance";
  laneSurface?: "shared" | "separate";
  rail?: React.ReactNode;
  railDensity?: "standard" | "compact";
}

export function KanbanBoard({ className, children, density = "standard", laneSurface = "shared", laneWidth = "default", rail, railDensity = "standard", ...props }: KanbanBoardProps) {
  const hasRail = Boolean(rail);

  return (
    <div
      className={cn(
        "tcrm-kanban-board",
        !hasRail && "tcrm-kanban-board--without-rail",
        hasRail && railDensity === "compact" && "tcrm-kanban-board--compact-rail",
        density === "comfortable" && "tcrm-kanban-board--comfortable",
        density === "compact" && "tcrm-kanban-board--compact",
        laneWidth === "commercial" && "tcrm-kanban-board--commercial-lanes",
        laneWidth === "finance" && "tcrm-kanban-board--finance-lanes",
        laneSurface === "separate" && "tcrm-kanban-board--separate-lanes",
        className
      )}
      data-component="KanbanBoard"
      data-density={density}
      data-lane-surface={laneSurface}
      data-lane-width={laneWidth}
      data-rail-density={hasRail ? railDensity : undefined}
      aria-label="Quadro Kanban"
      role="region"
      {...props}
    >
      {hasRail ? <aside className="tcrm-kanban-board__rail">{rail}</aside> : null}
      <div className="tcrm-kanban-board__lanes">{children}</div>
    </div>
  );
}

export interface KanbanColumnProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  count?: number;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  onMenu?: () => void;
  state?: "default" | "waiting" | "blocked" | "resolved";
  emptyLabel?: React.ReactNode;
  loading?: boolean;
  blocked?: boolean;
}

export function KanbanColumn({
  title,
  count,
  meta,
  footer,
  onMenu,
  children,
  state = "default",
  className,
  emptyLabel,
  loading = false,
  blocked = false,
  ...props
}: KanbanColumnProps) {
  const hasChildren = React.Children.count(children) > 0;
  return (
    <section
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      className={cn(
        "tcrm-kanban-column",
        state !== "default" && `tcrm-kanban-column--${state}`,
        loading && "tcrm-kanban-column--loading",
        blocked && "tcrm-kanban-column--blocked-state",
        !hasChildren && "tcrm-kanban-column--empty",
        className
      )}
      role="group"
      {...props}
    >
      <header className="tcrm-kanban-column__header">
        <div className="tcrm-kanban-column__header-main">
          <h3>{title}</h3>
          {typeof count === "number" ? <Badge className="tcrm-kanban-column__count">{count}</Badge> : null}
          {onMenu ? <IconButton className="tcrm-kanban-column__menu" icon="moreVertical" label={`Abrir opcoes de ${String(title)}`} onClick={onMenu} size="sm" variant="ghost" /> : null}
        </div>
        {meta ? <div className="tcrm-kanban-column__meta">{meta}</div> : null}
      </header>
      <div className="tcrm-kanban-column__stack">
        {hasChildren ? children : <div className="tcrm-kanban-column__empty">{emptyLabel ?? "Sem pendencias"}</div>}
      </div>
      {footer ? <footer className="tcrm-kanban-column__footer">{footer}</footer> : null}
    </section>
  );
}

export function KanbanCard({
  title,
  meta,
  state,
  stateLabel,
  selected = false,
  disabled = false,
  owner,
  impact,
  nextAction,
  tags = [],
  layout = "default",
  footer,
  onSelect,
  onMenu,
  menuIcon = "moreVertical",
  className,
  children,
  ...props
}: CrmSurfaceProps & {
  disabled?: boolean;
  owner?: React.ReactNode;
  impact?: React.ReactNode;
  nextAction?: React.ReactNode;
  tags?: Array<React.ReactNode | KanbanCardTag>;
  stateLabel?: React.ReactNode;
  layout?: "default" | "finance" | "compact";
  footer?: React.ReactNode;
  menuIcon?: IconName;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const menuAction = onMenu ? (
    <IconButton
      icon={menuIcon}
      label={`Abrir opcoes de ${String(title ?? "card")}`}
      onClick={(event) => {
        event.stopPropagation();
        onMenu();
      }}
      size="sm"
      variant="ghost"
    />
  ) : null;
  const stateClass = state ? `tcrm-kanban-card--state-${stateKey(state)}` : undefined;
  const rootClass = cn(
    "tcrm-kanban-card",
    layout !== "default" && `tcrm-kanban-card--${layout}`,
    stateClass,
    selected && "tcrm-kanban-card--selected",
    disabled && "tl-card--disabled",
    className
  );
  const content =
    layout === "finance" ? (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {impact ? <strong className="tcrm-kanban-card__impact">{impact}</strong> : null}
        {meta ? (
          <span className="tcrm-kanban-card__meta-line">
            <small>{meta}</small>
            <Icon name="chevronRight" size="sm" />
          </span>
        ) : null}
        {owner ? <small className="tcrm-kanban-card__owner">{owner}</small> : null}
        {state ? <Chip className="tcrm-kanban-card__status" showDot={false} tone={toneForState(state)}>{stateLabel ?? state}</Chip> : null}
        {children}
      </>
    ) : layout === "compact" ? (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {meta ? <small className="tcrm-kanban-card__compact-meta">{meta}</small> : null}
        {footer ? <footer className="tcrm-kanban-card__compact-footer">{footer}</footer> : null}
      </>
    ) : (
      <>
        <header className="tcrm-kanban-card__header">
          <strong>{title ?? "Caso operacional"}</strong>
          {!onSelect ? menuAction : null}
        </header>
        {tags.length ? (
          <div className="tcrm-kanban-card__tags">
            {tags.map((tag, index) => {
              const item = kanbanTagMeta(tag);
              return <Chip className={`tcrm-kanban-card__tag tcrm-kanban-card__tag--${stateKey(item.label)}`} icon={item.icon} key={`tag-${stateKey(item.label)}-${index}`} showDot={false} tone={item.tone}>{item.label}</Chip>;
            })}
          </div>
        ) : null}
        {meta && !tags.length ? <small>{meta}</small> : null}
        {owner || impact || nextAction ? (
          <dl className="tcrm-kanban-card__facts">
            {owner ? <div><dt>Dono:</dt><dd>{owner}</dd></div> : null}
            {impact ? <div><dt>Impacto:</dt><dd>{impact}</dd></div> : null}
            {nextAction ? <div><dt>Próxima ação:</dt><dd>{nextAction}</dd></div> : null}
          </dl>
        ) : null}
        {state ? <Chip className="tcrm-kanban-card__status" showDot={false} tone={toneForState(state)}>{stateLabel ?? state}</Chip> : null}
        {children}
      </>
    );

  if (onSelect) {
    if (onMenu) {
      return (
        <div
          {...props}
          className={cn("tl-card", rootClass, "tcrm-kanban-card--with-menu")}
        >
          <PrimitiveButton
            aria-pressed={selected}
            className="tcrm-kanban-card__select-button"
            disabled={disabled}
            onClick={() => onSelect()}
            type="button"
          >
            {content}
          </PrimitiveButton>
          <span className="tcrm-kanban-card__menu">{menuAction}</span>
        </div>
      );
    }

    return (
      <PrimitiveButton
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        aria-pressed={selected}
        className={cn("tl-card", rootClass)}
        disabled={disabled}
        onClick={() => onSelect()}
        type="button"
      >
        {content}
      </PrimitiveButton>
    );
  }

  return (
    <Card className={rootClass} disabled={disabled} selected={selected} {...props}>
      {content}
    </Card>
  );
}
