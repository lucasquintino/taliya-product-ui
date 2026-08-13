/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Card, Chip, Icon, Input, Panel, Select, Toggle, cn } from "@taliya/ui";

import type { ComponentTone, IconName } from "@taliya/ui";

import { RuleRow } from "../domains/billing/index.js";

import { GovernanceAction } from "./governance-states.js";

export interface FallbackControlCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    enabled?: boolean;
    defaultEnabled?: boolean;
    onEnabledChange?: (enabled: boolean) => void;
}

export function FallbackControlCard({ enabled, defaultEnabled = true, onEnabledChange, className, ...props }: FallbackControlCardProps) {
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-fallback-control", className)} data-component="FallbackControlCard" {...props}>
      <header className="tcrm-governance-panel__header"><h3>4. Fallback manual</h3><Icon name="info"/></header>
      <Card className="tcrm-fallback-control__card">
        <span className="tcrm-fallback-control__icon"><Icon name="refresh"/></span>
        <span className="tcrm-fallback-control__body"><strong>Fallback manual</strong><p>Quando a automação não pode atuar, o CRM continua ativo para que a equipe execute a ação manualmente.</p></span>
        <span className="tcrm-fallback-control__status"><Chip showDot={false} tone="success">Habilitado</Chip><Toggle aria-label="Alternar fallback manual" compact defaultPressed={enabled === undefined ? defaultEnabled : undefined} onPressedChange={onEnabledChange} pressed={enabled}/></span>
      </Card>
    </Panel>);
}

export interface BillingGovernancePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    cardLabel?: React.ReactNode;
    cardEnding?: React.ReactNode;
    cardExpiry?: React.ReactNode;
    nextChargeDate?: React.ReactNode;
    nextChargeAmount?: React.ReactNode;
    invoiceId?: React.ReactNode;
    invoiceDate?: React.ReactNode;
    invoiceAmount?: React.ReactNode;
    onAction?: GovernanceAction;
}

export function BillingGovernancePanel({ cardLabel = "Visa", cardEnding = "•••• 4242", cardExpiry = "Vence em 12/2026", nextChargeDate = "28/05/2024", nextChargeAmount = "R$ 1.890,00", invoiceId = "FAT-2024-0452", invoiceDate = "28/04/2024", invoiceAmount = "R$ 1.890,00", onAction, className, ...props }: BillingGovernancePanelProps) {
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-billing-governance", className)} data-component="BillingGovernancePanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>7. Billing e pagamento</h3><Icon name="info"/></header>
      <div className="tcrm-billing-governance__grid">
        <Card><small>Método de pagamento</small><span className="tcrm-billing-governance__payment"><Icon name="creditCard"/><strong>{cardLabel} {cardEnding}</strong></span><span>{cardExpiry}</span><Button onClick={() => onAction?.("update-payment")} size="sm" variant="secondary">Atualizar pagamento</Button></Card>
        <Card><small>Próxima cobrança</small><strong>{nextChargeDate}</strong><span>{nextChargeAmount}</span><small>Em 28 dias</small><Chip showDot={false} tone="success">Pago</Chip></Card>
        <Card><small>Última fatura</small><strong>{invoiceId}</strong><span>{invoiceDate}</span><span>{invoiceAmount}</span><Button onClick={() => onAction?.("view-invoice")} size="sm" trailingIcon="download" variant="secondary">Ver fatura</Button></Card>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("invoice-history")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver histórico de faturas</Button>
    </Panel>);
}

export type GovernanceAuditStatus = "success" | "pending" | "alert";

export interface GovernanceAuditRow {
    id: string;
    action: React.ReactNode;
    user: React.ReactNode;
    dateTime: React.ReactNode;
    origin: React.ReactNode;
    status: GovernanceAuditStatus;
}

const defaultGovernanceAuditRows: GovernanceAuditRow[] = [
    { id: "login", action: "Login realizado", user: "Sam Frank", dateTime: "28/04/2024 10:32", origin: "Web", status: "success" },
    { id: "automation", action: "Regra de automação editada", user: "Nikki Olaw", dateTime: "28/04/2024 09:18", origin: "Web", status: "success" },
    { id: "integration", action: "Integração reconectada", user: "Maria Lopes", dateTime: "27/04/2024 16:41", origin: "API", status: "success" },
    { id: "permission", action: "Permissão solicitada", user: "João Silva", dateTime: "27/04/2024 14:12", origin: "Web", status: "pending" },
    { id: "quota", action: "Cota próxima do limite", user: "Sistema", dateTime: "27/04/2024 11:02", origin: "Sistema", status: "alert" }
];

const governanceAuditTone: Record<GovernanceAuditStatus, ComponentTone> = { success: "success", pending: "info", alert: "warning" };

const governanceAuditLabel: Record<GovernanceAuditStatus, string> = { success: "Sucesso", pending: "Pendente", alert: "Alerta" };

export interface GovernanceAuditPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    rows?: GovernanceAuditRow[];
    onAction?: GovernanceAction;
    onRowClick?: (row: GovernanceAuditRow) => void;
}

export function GovernanceAuditPanel({ rows = defaultGovernanceAuditRows, onAction, onRowClick, className, ...props }: GovernanceAuditPanelProps) {
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-governance-audit", className)} data-component="GovernanceAuditPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>8. Auditoria e logs</h3><Icon name="info"/></header>
      <div className="tcrm-governance-audit__table-wrap">
        <table><thead><tr><th>Ação</th><th>Usuário</th><th>Data / Hora</th><th>Origem</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr className={onRowClick ? "is-interactive" : undefined} key={row.id} onClick={() => onRowClick?.(row)}><td>{row.action}</td><td>{row.user}</td><td>{row.dateTime}</td><td>{row.origin}</td><td><Chip showDot={false} tone={governanceAuditTone[row.status]}>{governanceAuditLabel[row.status]}</Chip></td></tr>)}</tbody></table>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-logs")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todos os logs</Button>
    </Panel>);
}

export interface GuardrailPolicy {
    id: string;
    title: React.ReactNode;
    description: React.ReactNode;
    icon: IconName;
    enabled: boolean;
}

const defaultGuardrailPolicies: GuardrailPolicy[] = [
    { id: "automatic", title: "Permitir ação automática", description: "Ações podem ser executadas automaticamente pelos agentes", icon: "shield", enabled: true },
    { id: "review", title: "Exigir revisão humana", description: "Ações sensíveis exigem aprovação manual antes da execução", icon: "lock", enabled: true },
    { id: "quota", title: "Limitar uso ao atingir cota", description: "Bloqueia novas execuções quando a cota é atingida", icon: "alert", enabled: true },
    { id: "schedule", title: "Bloquear envio fora do horário", description: "Mensagem não enviada fora do horário comercial", icon: "clock", enabled: false }
];

export interface GuardrailPolicyPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    policies?: GuardrailPolicy[];
    onPolicyChange?: (policyId: string, enabled: boolean) => void;
    onAction?: GovernanceAction;
}

export function GuardrailPolicyPanel({ policies = defaultGuardrailPolicies, onPolicyChange, onAction, className, ...props }: GuardrailPolicyPanelProps) {
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-guardrail-policy", className)} data-component="GuardrailPolicyPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>9. Política e guardrails</h3><Icon name="info"/></header>
      <div className="tcrm-guardrail-policy__rows">{policies.map((policy) => <RuleRow checked={policy.enabled} control="none" description={policy.description} icon={policy.icon} iconTone="neutral" key={policy.id} onToggle={(enabled) => onPolicyChange?.(policy.id, enabled)} rowId={policy.id} showToggle title={policy.title}/>)}</div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-policies")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as políticas</Button>
    </Panel>);
}

export interface GeneralSettingsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    workspaceName?: string;
    defaultPlan?: string;
    automaticFallback?: string;
    limitNotifications?: string;
    emailAlerts?: boolean;
    onFieldChange?: (field: string, value: string | boolean) => void;
    onAction?: GovernanceAction;
}

export function GeneralSettingsPanel({ workspaceName = "Taliya CRM", defaultPlan = "professional", automaticFallback = "manual", limitNotifications = "admins", emailAlerts = true, onFieldChange, onAction, className, ...props }: GeneralSettingsPanelProps) {
    return (<Panel compact className={cn("tcrm-governance-panel", "tcrm-general-settings", className)} data-component="GeneralSettingsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>10. Configurações gerais</h3><Icon name="info"/></header>
      <div className="tcrm-general-settings__rows">
        <label><span>Nome do workspace</span><Input aria-label="Nome do workspace" onChange={(event) => onFieldChange?.("workspaceName", event.currentTarget.value)} value={workspaceName}/></label>
        <label><span>Plano padrão</span><Select aria-label="Plano padrão" onValueChange={(value) => onFieldChange?.("defaultPlan", value)} options={[{ value: "base", label: "Base" }, { value: "professional", label: "Profissional" }]} value={defaultPlan}/></label>
        <label><span>Fallback automático</span><Select aria-label="Fallback automático" onValueChange={(value) => onFieldChange?.("automaticFallback", value)} options={[{ value: "manual", label: "Manual" }, { value: "paused", label: "Pausado" }]} value={automaticFallback}/></label>
        <label><span>Notificações de limite</span><Select aria-label="Notificações de limite" onValueChange={(value) => onFieldChange?.("limitNotifications", value)} options={[{ value: "admins", label: "Administrador e Gestores" }, { value: "owner", label: "Somente owner" }]} value={limitNotifications}/></label>
        <label className="tcrm-general-settings__toggle"><span>Ativar alertas por e-mail</span><Toggle aria-label="Ativar alertas por e-mail" compact onPressedChange={(value) => onFieldChange?.("emailAlerts", value)} pressed={emailAlerts}/></label>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-settings")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as configurações</Button>
    </Panel>);
}
