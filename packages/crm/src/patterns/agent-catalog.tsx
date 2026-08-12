/** Agent cards, catalog, and flow-builder primitives. */
import React from "react";
import { Button, ButtonGroup, Card, Chip, EmptyState, Icon, InlineGroup, Panel, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { DashboardGrid } from "./shell-layout-b.js";
import { Reference15Header } from "./patterns-utilities.js";
import { AgentCard, defaultAgentCards } from "./domain-actions.js";
import type { AgentCardData } from "./domain-actions.js";

export type AgentRoutineCardState = "simulated" | "draft" | "published" | "blocked";

export interface AgentRoutineCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  flowCount?: React.ReactNode;
  icon?: IconName;
  state?: AgentRoutineCardState;
  selected?: boolean;
  actionLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onOpen?: (routineId: string) => void;
}

function agentRoutineCardStatus(state: AgentRoutineCardState) {
  switch (state) {
    case "simulated":
      return { label: "Rascunho simulado", tone: "info" as ComponentTone };
    case "published":
      return { label: "Publicada", tone: "success" as ComponentTone };
    case "blocked":
      return { label: "Bloqueada", tone: "danger" as ComponentTone };
    default:
      return { label: "Não publicada", tone: "neutral" as ComponentTone };
  }
}

export function AgentRoutineCard({
  id = "presenca",
  title = "Presença e faltas",
  description = "Confirmação, falta avisada, no-show e correção de presença",
  flowCount = "4 fluxos",
  icon = "calendar",
  state = "draft",
  selected = false,
  actionLabel = "Abrir rotina",
  statusLabel,
  onOpen,
  className,
  ...props
}: AgentRoutineCardProps) {
  const blocked = state === "blocked";
  const status = agentRoutineCardStatus(state);

  return (
    <Card
      className={cn("tcrm-agent-card", "tcrm-agent-routine-card", className)}
      data-component="AgentRoutineCard"
      data-routine-id={id}
      data-state={state}
      disabled={blocked}
      interactive={Boolean(onOpen) && !blocked}
      role="listitem"
      selected={selected}
      {...props}
    >
      <span className="tcrm-agent-card__icon">
        <Icon name={icon} size="lg" tone="info" />
      </span>
      <div className="tcrm-agent-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <InlineGroup compact wrap>
          <span>{flowCount}</span>
        </InlineGroup>
        <Chip showDot={false} tone={status.tone}>{statusLabel ?? status.label}</Chip>
      </div>
      <Button disabled={blocked} onClick={() => onOpen?.(id)} size="sm" variant="primary">
        {actionLabel}
      </Button>
    </Card>
  );
}

export interface AgentFlowSectionPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  kind?: "mode" | "content";
  density?: "default" | "compact";
  columns?: 1 | 2 | 3 | 4;
  gridDensity?: "default" | "compact";
}

export function AgentFlowSectionPanel({
  title,
  description,
  kind = "content",
  density = "default",
  columns,
  gridDensity = "default",
  children,
  className,
  ...props
}: AgentFlowSectionPanelProps) {
  return (
    <Panel
      className={cn(
        "tcrm-agent-flow-section-panel",
        Boolean(description) && "tcrm-agent-flow-section-panel--has-description",
        kind === "mode" && "tcrm-agent-flow-section-panel--mode",
        density !== "default" && `tcrm-agent-flow-section-panel--${density}`,
        className
      )}
      data-component="AgentFlowSectionPanel"
      data-kind={kind}
      {...props}
    >
      <div className="tcrm-agent-flow-section-panel__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="tcrm-agent-flow-section-panel__body">
        {columns ? <DashboardGrid columns={columns} density={gridDensity}>{children}</DashboardGrid> : children}
      </div>
    </Panel>
  );
}

export interface AgentFlowSettingsPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
}

export function AgentFlowSettingsPanel({
  title = "Ajustes deste fluxo",
  children,
  className,
  ...props
}: AgentFlowSettingsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-agent-flow-settings-panel", className)} data-component="AgentFlowSettingsPanel" {...props}>
      {title ? <h3>{title}</h3> : null}
      {children}
    </Panel>
  );
}

export interface AgentFlowActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AgentFlowActionBar({ children, className, ...props }: AgentFlowActionBarProps) {
  return (
    <ButtonGroup className={cn("tcrm-agent-flow-action-bar", className)} {...props}>
      {children}
    </ButtonGroup>
  );
}

export interface AgentRoutineFlowCardFact {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface AgentRoutineFlowCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  icon?: IconName;
  iconTone?: ComponentTone;
  facts?: AgentRoutineFlowCardFact[];
  status?: React.ReactNode;
  statusTone?: ComponentTone;
  actionLabel?: React.ReactNode;
  onOpen?: (flowId: string) => void;
}

export function AgentRoutineFlowCard({
  id = "flow",
  title,
  description,
  badge,
  badgeTone = "info",
  icon = "calendar",
  iconTone = "info",
  facts = [],
  status = "Pronto",
  statusTone = "success",
  actionLabel = "Ver e ajustar",
  onOpen,
  className,
  ...props
}: AgentRoutineFlowCardProps) {
  return (
    <Card
      className={cn("tcrm-agent-routine-flow-card", className)}
      data-component="AgentRoutineFlowCard"
      data-flow-id={id}
      interactive={Boolean(onOpen)}
      role="listitem"
      {...props}
    >
      <div className="tcrm-agent-routine-flow-card__summary">
        <span className="tcrm-agent-routine-flow-card__icon">
          <Icon name={icon} size="lg" tone={iconTone} />
        </span>
        <div className="tcrm-agent-routine-flow-card__copy">
          <div className="tcrm-agent-routine-flow-card__title-row">
            <h3>{title}</h3>
            {badge ? <Chip showDot={false} tone={badgeTone}>{badge}</Chip> : null}
          </div>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {facts.length ? (
        <dl className="tcrm-agent-routine-flow-card__facts">
          {facts.map((fact, index) => (
            <div className="tcrm-agent-routine-flow-card__fact" key={`routine-fact-${String(fact.label)}-${index}`}>
              <Icon name={fact.icon ?? "checkCircle"} size="sm" tone={fact.tone ?? "current"} />
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="tcrm-agent-routine-flow-card__footer">
        <div className="tcrm-agent-routine-flow-card__status">
          <span>Status</span>
          <Chip showDot={false} tone={statusTone}>{status}</Chip>
        </div>
        <Button onClick={() => onOpen?.(id)} size="sm" variant="primary">
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
}

export function AgentCatalog({
  agents = defaultAgentCards,
  empty = false,
  onAgentOpen,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  agents?: AgentCardData[];
  empty?: boolean;
  onAgentOpen?: (agentId: string) => void;
}) {
  if (empty) {
    return (
      <Panel className={cn("tcrm-agent-catalog", className)} {...props}>
        <EmptyState action={<Button leadingIcon="plus">Contratar agente</Button>} title="Nenhum agente configurado" />
      </Panel>
    );
  }

  return (
    <div className={cn("tcrm-agent-catalog", className)} role="list" {...props}>
      {children ?? agents.map((agent) => <AgentCard key={agent.id} {...agent} onOpen={onAgentOpen} />)}
    </div>
  );
}

export interface ModeCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  mode: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  density?: "flow" | "routine" | "reference";
  selected?: boolean;
  recommended?: boolean;
  locked?: boolean;
  onSelect?: (mode: string) => void;
}

export function ModeCard({
  mode,
  title,
  description,
  icon = "bot",
  density = "flow",
  selected = false,
  recommended = false,
  locked = false,
  disabled,
  onSelect,
  className,
  type = "button",
  ...props
}: ModeCardProps) {
  const blocked = disabled || locked;

  return (
    <PrimitiveButton
      aria-pressed={selected}
      className={cn(
        "tl-card",
        "tcrm-mode-card",
        `tcrm-mode-card--${density}`,
        selected && "tcrm-mode-card--selected",
        blocked && "tl-card--disabled",
        className
      )}
      disabled={blocked}
      onClick={() => onSelect?.(mode)}
      type={type}
      {...props}
    >
      <span className="tcrm-mode-card__icon">
        <Icon name={locked ? "lock" : icon} size="lg" tone={locked ? "paused" : "info"} />
      </span>
      <span>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {recommended ? <Chip tone="info">Padrão</Chip> : null}
      {selected ? (
        <span aria-hidden="true" className="tcrm-mode-card__check">
          <Icon name="check" size={12} tone="current" />
        </span>
      ) : null}
    </PrimitiveButton>
  );
}

export function ModeSelector({
  value = "autonomo-excecoes",
  variant = "flow",
  modes,
  onChange,
  className
}: {
  value?: string;
  variant?: "flow" | "routine" | "reference";
  modes?: ModeCardProps[];
  onChange?: (mode: string) => void;
  className?: string;
}) {
  const routineOptions: ModeCardProps[] = [
    { mode: "humano", title: "Mais humano", description: "A equipe decide e executa. A Taliya organiza tarefas e rascunhos.", icon: "users", density: "routine" },
    { mode: "equilibrado", title: "Equilibrado", description: "A Taliya executa o simples e chama a equipe nos pontos sensíveis.", icon: "scale", density: "routine" },
    { mode: "autonomo", title: "Mais autônomo", description: "A Taliya conduz o máximo possível dentro dos limites publicados.", icon: "rocket", density: "routine", recommended: true }
  ];
  const flowOptions: ModeCardProps[] = [
    { mode: "manual", title: "Manual", icon: "hand", density: "flow" },
    { mode: "copiloto", title: "Copiloto", icon: "bot", density: "flow" },
    { mode: "autonomo-aprovacao", title: <>Autônomo<br />com aprovação</>, icon: "shield", density: "flow" },
    { mode: "autonomo-excecoes", title: <>Autônomo<br />com exceções</>, icon: "rocket", density: "flow" },
    { mode: "autonomo", title: "Autônomo", icon: "lock", density: "flow", locked: true }
  ];
  const referenceOptions: ModeCardProps[] = [
    { mode: "manual", title: "Manual", description: "Executa apenas com acao humana.", density: "reference" },
    { mode: "copiloto", title: "Copiloto", description: "Sugere e aguarda aprovacao.", density: "reference", recommended: true },
    { mode: "autonomo", title: "Autonomo", description: "Executa end-to-end.", density: "reference" },
    { mode: "politica", title: "Bloqueado por politica", description: "Proibido por politica da empresa.", density: "reference", locked: true },
    { mode: "plano", title: "Bloqueado por plano/cota", description: "Recurso indisponivel no plano.", density: "reference", locked: true }
  ];
  const options = modes ?? (variant === "routine" ? routineOptions : variant === "reference" ? referenceOptions : flowOptions);

  if (variant === "reference") {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-mode-selector-reference", className)} data-component="ModeSelector">
      <Reference15Header number={2} title="Configuracao de modo por fluxo" />
      <div aria-label="Modo do agente" className="tcrm-mode-selector tcrm-mode-selector--reference" role="group">
        {options.map((mode) => <ModeCard key={mode.mode} {...mode} onSelect={onChange} selected={mode.mode === value} />)}
      </div>
    </Panel>;
  }

  return (
    <div aria-label="Modo do agente" className={cn("tcrm-mode-selector", `tcrm-mode-selector--${variant}`, className)} role="group">
      {options.map((mode) => (
        <ModeCard key={mode.mode} density={variant} {...mode} onSelect={onChange} selected={mode.mode === value} />
      ))}
    </div>
  );
}
