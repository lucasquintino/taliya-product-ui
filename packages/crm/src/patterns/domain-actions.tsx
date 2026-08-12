/** Domain actions and metric primitives. */
import React from "react";
import { Button, Card, Chip, Icon, InlineGroup, cn } from "@taliya/ui";
import type { ButtonVariant, ComponentTone, IconName } from "@taliya/ui";
import { toneForState } from "./patterns-utilities.js";

export interface CrmDomainAction {
  id: string;
  label: React.ReactNode;
  icon?: IconName;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export interface CrmDomainMetric {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: ComponentTone;
  helperText?: React.ReactNode;
  icon?: IconName;
  progressValue?: number;
}

interface CrmDomainFact {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export function DomainActions({
  actions,
  onAction,
  className
}: {
  actions?: CrmDomainAction[];
  onAction?: (actionId: string) => void;
  className?: string;
}) {
  if (!actions?.length) return null;

  return (
    <div className={cn("tcrm-domain-actions", className)}>
      {actions.map((action, index) => (
        <Button
          disabled={action.disabled}
          key={action.id}
          leadingIcon={action.icon}
          onClick={() => onAction?.(action.id)}
          size="sm"
          variant={action.variant ?? (index === 0 ? "primary" : "secondary")}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

export function DomainFactList({ facts }: { facts?: CrmDomainFact[] }) {
  if (!facts?.length) return null;

  return (
    <dl className="tcrm-domain-facts">
      {facts.map((fact, index) => (
        <div key={`domain-fact-${String(fact.label)}-${index}`}>
          <dt>
            {fact.icon ? <Icon name={fact.icon} size="sm" tone={fact.tone ?? "current"} /> : null}
            {fact.label}
          </dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface AgentCardData {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  routines: React.ReactNode;
  flows: React.ReactNode;
  state?: "active" | "draft" | "attention" | "not-contracted" | "paused" | "blocked";
  icon?: IconName;
  selected?: boolean;
}

export interface AgentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect">, Partial<AgentCardData> {
  actionLabel?: React.ReactNode;
  disabled?: boolean;
  onOpen?: (agentId: string) => void;
}

export const defaultAgentCards: AgentCardData[] = [
  { id: "atendimento", title: "Atendimento", description: "Conversas, triagem, handoff e privacidade", routines: 2, flows: 10, state: "active", icon: "messageMore" },
  { id: "agenda", title: "Agenda", description: "Presença, faltas, reposições, vagas e grade", routines: 5, flows: 16, state: "draft", icon: "calendar", selected: true },
  { id: "vendas", title: "Vendas", description: "Leads, experimental, follow-up e matrícula", routines: 3, flows: 15, state: "active", icon: "trendingUp" },
  { id: "financeiro", title: "Financeiro", description: "Cobranças, pagamentos, contratos e exceções", routines: 3, flows: 15, state: "active", icon: "wallet" },
  { id: "retencao", title: "Retenção", description: "Risco, cancelamento, reativação e reclamações", routines: 2, flows: 13, state: "attention", icon: "shieldAlert" },
  { id: "governanca", title: "Gestão/Governança", description: "Operação, cotas, incidentes, auditoria e qualidade", routines: 3, flows: 15, state: "active", icon: "shieldStar" },
  { id: "historico", title: "Histórico/Evolução", description: "Contexto de aula, notas, documentos e evolução do aluno", routines: 2, flows: 12, state: "active", icon: "book" }
];

function agentStateLabel(state?: AgentCardData["state"]) {
  switch (state) {
    case "draft":
      return "Rascunho simulado";
    case "attention":
      return "Com atenção";
    case "not-contracted":
      return "Não contratado";
    case "paused":
      return "Pausado";
    case "blocked":
      return "Bloqueado";
    default:
      return "Ativo";
  }
}

export function AgentCard({
  id = "agenda",
  title = "Agenda",
  description = "Presença, faltas, reposições, vagas e grade",
  routines = 5,
  flows = 16,
  state = "active",
  icon = "bot",
  selected = false,
  actionLabel,
  disabled = false,
  onOpen,
  className,
  children,
  ...props
}: AgentCardProps) {
  const blocked = disabled || state === "blocked" || state === "not-contracted";

  return (
    <Card
      className={cn("tcrm-agent-card", className)}
      data-agent-id={id}
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
          <span>{routines} rotinas</span>
          <span aria-hidden="true">·</span>
          <span>{flows} fluxos</span>
        </InlineGroup>
        <Chip showDot={false} tone={toneForState(state)}>{agentStateLabel(state)}</Chip>
      </div>
      {children}
      <Button disabled={blocked} onClick={() => onOpen?.(id)} size="sm" variant={selected ? "primary" : "secondary"}>
        {actionLabel ?? (selected ? `Abrir ${title}` : "Ver agente")}
      </Button>
    </Card>
  );
}
