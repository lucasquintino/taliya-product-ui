/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Chip, Icon, IconButton, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

import { CrmSurfaceProps } from "../patterns/shell.js";

import { stateKey } from "./shell-core.js";

import { OpportunityPanelFact } from "./worklist-replacement.js";

export interface OpportunityPanelHistoryItem {
    id: string;
    label: React.ReactNode;
    time: React.ReactNode;
}

export type OpportunityPanelState = "open" | "ownerless" | "assigned" | "resolved" | "loading" | "blocked";

export type OpportunityPanelAction = "primary" | "enrollment" | "charge" | "conversation" | "task" | "no-action" | "more";

export interface OpportunityPanelProps extends Omit<CrmSurfaceProps, "state"> {
    state?: OpportunityPanelState;
    description?: React.ReactNode;
    facts?: OpportunityPanelFact[];
    history?: OpportunityPanelHistoryItem[];
    suggestion?: React.ReactNode;
    notice?: React.ReactNode;
    manualNotice?: React.ReactNode;
    primaryActionLabel?: React.ReactNode;
    onClose?: () => void;
    onAction?: (actionId: OpportunityPanelAction) => void;
}

const defaultOpportunityPanelFacts: OpportunityPanelFact[] = [
    { id: "origin", label: "Origem", value: "Matrículas", icon: "folder" },
    { id: "value", label: "Valor estimado", value: "R$ 420", icon: "coins" },
    { id: "impact", label: "Impacto", value: "conversão em aluna", icon: "sparkles" },
    { id: "owner", label: "Dono / fila", value: "Recepção", icon: "user" },
    { id: "deadline", label: "Prazo", value: "hoje", icon: "clock", tone: "danger" },
    { id: "status", label: "Status", value: "pagamento pendente", icon: "checkCircle", tone: "danger", presentation: "chip" },
    { id: "method", label: "Método disponível", value: "Pix", icon: "coins" },
    { id: "blocker", label: "Bloqueio", value: <>Pagamento inicial obrigatório<br />para converter</>, icon: "calendar" }
];

const defaultOpportunityPanelHistory: OpportunityPanelHistoryItem[] = [
    { id: "trial", label: "Compareceu à experimental", time: "hoje 09:20" },
    { id: "plan", label: "Plano 2x/semana escolhido", time: "hoje 09:10" },
    { id: "enrollment", label: "Pré-matrícula iniciada", time: "hoje 09:05" },
    { id: "payment", label: "Pagamento ainda não enviado", time: "hoje 08:58" }
];

export function OpportunityPanel({ title = "Ana Souza", state = "open", description = "Pré-matrícula bloqueada por pagamento inicial", facts = defaultOpportunityPanelFacts, history = defaultOpportunityPanelHistory, suggestion = "Copiloto sugere enviar Pix com mensagem curta e abrir matrícula após confirmação.", notice = "Financeiro confirma o pagamento. Matrículas só destrava a conversão.", manualNotice = "Tudo pode ser feito manualmente. O copiloto apenas sugere. Ações autônomas seguem política do studio.", primaryActionLabel = "Enviar Pix", onClose, onAction, className }: OpportunityPanelProps) {
    const key = stateKey(state) || "open";
    const isDisabled = key === "loading" || key === "blocked" || key === "resolved";
    const stateLabel = key === "resolved" ? "Oportunidade resolvida" : key === "ownerless" ? "Oportunidade sem dono" : key === "assigned" ? "Oportunidade atribuída" : "Oportunidade selecionada";
    const stateTone: ComponentTone = key === "resolved" || key === "assigned" ? "success" : key === "ownerless" ? "warning" : "info";
    return (<section aria-busy={key === "loading" || undefined} className={cn("tcrm-opportunity-panel", className)} data-state={key} aria-label={String(title)}>
      <header className="tcrm-opportunity-panel__header">
        <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--selected" showDot={false} tone={stateTone}>{stateLabel}</Chip>
        <IconButton className="tcrm-opportunity-panel__close" disabled={key === "loading" || key === "blocked"} icon="x" label="Fechar oportunidade" onClick={onClose} size="sm" variant="subtle"/>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      <dl className="tcrm-opportunity-panel__facts">
        {facts.map((fact) => (<div key={fact.id}>
            <Icon name={fact.icon} size="14px"/>
            <dt>{fact.label}</dt>
            <dd className={cn(fact.tone === "danger" && fact.presentation !== "chip" && "tcrm-opportunity-panel__danger-value")}>
              {fact.presentation === "chip" ? <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--pending" showDot={false} tone={fact.tone ?? "neutral"}>{fact.value}</Chip> : fact.value}
            </dd>
          </div>))}
      </dl>
      <section className="tcrm-opportunity-panel__history">
        <h4>Histórico</h4>
        {history.map((item) => (<p key={item.id}><span />{item.label}<time>{item.time}</time></p>))}
      </section>
      <section className="tcrm-opportunity-panel__suggestion">
        <Icon name="sparkles" size="24px" tone="info"/>
        <strong>{suggestion}</strong>
      </section>
      <section className="tcrm-opportunity-panel__notice">
        <Icon name="info" size="18px" tone="warning"/>
        <p>{notice}</p>
      </section>
      <section className="tcrm-opportunity-panel__manual">
        <Icon name="info" size="15px" tone="info"/>
        <p>{manualNotice}</p>
      </section>
      <div className="tcrm-opportunity-panel__actions">
        <Button disabled={isDisabled} leadingIcon="sliders" onClick={() => onAction?.("primary")} size="sm" variant="primary">{primaryActionLabel}</Button>
        <Button disabled={isDisabled} leadingIcon="clipboard" onClick={() => onAction?.("enrollment")} size="sm" variant="secondary">Abrir matrícula</Button>
        <Button disabled={isDisabled} leadingIcon="clipboard" onClick={() => onAction?.("charge")} size="sm" variant="secondary">Abrir cobrança</Button>
        <Button disabled={isDisabled} leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
        <Button disabled={isDisabled} leadingIcon="checkCircle" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button disabled={isDisabled} leadingIcon="x" onClick={() => onAction?.("no-action")} size="sm" variant="secondary">Marcar sem ação</Button>
        <Button disabled={isDisabled} leadingIcon="moreVertical" onClick={() => onAction?.("more")} size="sm" variant="secondary">Mais ações</Button>
      </div>
    </section>);
}
