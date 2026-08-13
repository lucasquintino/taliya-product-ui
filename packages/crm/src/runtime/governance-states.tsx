/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Card, Chip, Icon, IconButton, Panel, cn } from "@taliya/ui";

import { AdvancedStateAction } from "./import-resolution.js";

export type PlanBlockedStateVariant = "upgrade" | "manual";

export interface PlanBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    state?: PlanBlockedStateVariant;
    onAction?: AdvancedStateAction;
}

export function PlanBlockedState({ state = "upgrade", onAction, className, ...props }: PlanBlockedStateProps) {
    const isManual = state === "manual";
    return (<Card className={cn("tcrm-plan-blocked-state", isManual && "tcrm-plan-blocked-state--manual", className)} data-component="PlanBlockedState" {...props}>
      <span className="tcrm-plan-blocked-state__icon">
        <Icon name={isManual ? "refresh" : "users"}/>
      </span>
      <h3>{isManual ? "Operação manual" : "Mais agentes"}</h3>
      <Chip showDot={false} tone={isManual ? "success" : "warning"}>
        {isManual ? "Manual ativo" : "Plano máximo"}
      </Chip>
      <p>{isManual ? "O CRM continua ativo para a equipe executar manualmente." : "Seu plano já inclui os 7 agentes."}</p>
      <small>{isManual ? "Automação paga pode ficar bloqueada sem impedir a rotina do estúdio." : "Para revisar uma condição especial, fale com suporte."}</small>
      <Button onClick={() => onAction?.(isManual ? "manual" : "support")} size="sm" variant="secondary">
        {isManual ? "Ver alternativa manual" : "Falar com suporte"}
      </Button>
    </Card>);
}

export interface QuotaBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    value?: 70 | 90 | 100;
    onAction?: AdvancedStateAction;
}

export function QuotaBlockedState({ value = 100, onAction, className, ...props }: QuotaBlockedStateProps) {
    return (<div className={cn("tcrm-quota-blocked-state", className)} data-component="QuotaBlockedState" data-quota-value={value} {...props}>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--alerts">
        <h3>Alertas e economia</h3>
        <div className="tcrm-quota-blocked-state__rows">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle"/></span>
            <span>Nenhum alerta crítico</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value >= 90 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info">%</span>
            <span>Economia entra automaticamente em 90%.</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value === 100 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info"><Icon name="pause"/></span>
            <span>Automação paga pausa em 100%;<br />CRM manual continua.</span>
          </span>
        </div>
      </Panel>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--affected">
        <h3>O que foi afetado</h3>
        <div className="tcrm-quota-blocked-state__rows tcrm-quota-blocked-state__rows--affected">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle"/></span>
            <span>{value === 100 ? "Fluxos pagos pausados por cota" : "Nenhum fluxo pausado por cota"}</span>
          </span>
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle"/></span>
            <span>Nenhum downgrade ativo</span>
          </span>
        </div>
        <Button onClick={() => onAction?.("flows")} size="sm" variant="secondary">Ver fluxos</Button>
      </Panel>
    </div>);
}

export type IntegrationFailedStateVariant = "retry" | "fallback" | "support";

export interface IntegrationFailedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    state?: IntegrationFailedStateVariant;
    onAction?: AdvancedStateAction;
}

export function IntegrationFailedState({ state = "retry", onAction, className, ...props }: IntegrationFailedStateProps) {
    const actionLabel = state === "support" ? "Abrir suporte" : state === "fallback" ? "Usar fallback" : "Reconectar";
    return (<Panel compact className={cn("tcrm-integration-failed-panel", className)} data-component="IntegrationFailedState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>6. Integrações</h3>
        <Icon name="info"/>
      </header>
      <div className="tcrm-integration-failed-panel__rows">
        <div className="tcrm-integration-failed-panel__row">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--stripe">S</span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Stripe</strong>
            <small>Pagamentos</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="success">Conectado</Chip>
            <small>Conectado em 26/04/2024</small>
          </span>
          <IconButton icon="moreVertical" label="Mais ações Stripe" onClick={() => onAction?.("stripe-menu")} size="sm" variant="ghost"/>
        </div>
        <div className="tcrm-integration-failed-panel__row tcrm-integration-failed-panel__row--error">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--twilio">
            <span aria-hidden="true" className="tcrm-integration-failed-panel__twilio-grid"><i /><i /><i /><i /></span>
          </span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Twilio</strong>
            <small>SMS</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="danger">Erro</Chip>
            <small>Falha na conexão</small>
          </span>
          <span className="tcrm-integration-failed-panel__actions">
            <Button onClick={() => onAction?.(state)} size="sm" variant="secondary">{actionLabel}</Button>
            <IconButton icon="moreVertical" label="Mais ações Twilio" onClick={() => onAction?.("twilio-menu")} size="sm" variant="ghost"/>
          </span>
        </div>
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-integrations")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as integrações</Button>
    </Panel>);
}

export type GovernanceAction = (action: string) => void;

export interface PlanAgentsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    baseAgents?: number;
    professionalAgents?: number;
    usedAgents?: number;
    totalAgents?: number;
    onAction?: GovernanceAction;
}

export function PlanAgentsPanel({ baseAgents = 0, professionalAgents = 7, usedAgents = 7, totalAgents = 20, onAction, className, ...props }: PlanAgentsPanelProps) {
    const availableAgents = Math.max(0, totalAgents - usedAgents);
    const progress = totalAgents > 0 ? Math.round((usedAgents / totalAgents) * 100) : 0;
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-plan-agents-panel", className)} data-component="PlanAgentsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>1. Plano e agentes</h3><Icon name="info"/></header>
      <div className="tcrm-plan-agents-panel__grid">
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Base</strong><Chip showDot={false}>Plano base</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="user"/></span>
          <p><strong>{baseAgents}</strong> agentes</p>
          <small>CRM ativo</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("view-base")} size="sm" variant="secondary">Ver detalhes</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Profissional</strong><Chip showDot={false}>CRM Ativo</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="users"/></span>
          <p><strong>{professionalAgents}</strong> agentes</p>
          <small>Incluídos no plano</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("upgrade")} size="sm" variant="primary">Fazer upgrade</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__capacity">
          <span>Agentes</span>
          <span aria-label={`${progress}% dos agentes usados`} className="tcrm-plan-agents-panel__ring" role="progressbar" style={{ "--tcrm-plan-agents-progress": `${progress}%` } as React.CSSProperties} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
            <strong>{usedAgents} / {totalAgents}</strong><small>usados</small>
          </span>
          <strong>{availableAgents} <small>disponíveis</small></strong>
          <Button onClick={() => onAction?.("view-agents")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agentes</Button>
        </Card>
      </div>
    </Panel>);
}
