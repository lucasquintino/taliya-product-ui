/** Tenant and security drawer patterns. */
import React from "react";
import { Button, Chip, Icon, IconButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { stateKey } from "./patterns-utilities.js";
import { CrmDrawer } from "./drawer-core.js";
import { SecurityRulePanel } from "../domains/students/students-security.js";

export type TenantSecurityDrawerState = "security review" | "grant access" | "revoked" | "allowed" | "denied" | "warning" | "loading" | "blocked" | "closed";

export type TenantSummaryDrawerState = "active" | "degraded" | "tenant-blocked" | "risk" | "loading" | "blocked" | "closed";
export type TenantSummaryDrawerGrantState = "none" | "pending" | "active" | "revoked";
export type TenantSummaryDrawerAction =
  | "open-tenant"
  | "support"
  | "grants"
  | "billing"
  | "request-grant"
  | "grant-access"
  | "revoke-access"
  | "audit"
  | "note";

export interface TenantSummaryDrawerFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
}

export interface TenantSummaryDrawerActivity {
  id: string;
  label: React.ReactNode;
  time: React.ReactNode;
}

export interface TenantSummaryDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: TenantSummaryDrawerState;
  grantState?: TenantSummaryDrawerGrantState;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  facts?: TenantSummaryDrawerFact[];
  activities?: TenantSummaryDrawerActivity[];
  onClose?: () => void;
  onAction?: (actionId: TenantSummaryDrawerAction) => void;
}

const defaultTenantSummaryFacts: TenantSummaryDrawerFact[] = [
  { id: "status", label: "Status", value: <span className="tcrm-tenant-summary-drawer__status"><span />Ativo</span>, icon: "calendar", tone: "success" },
  { id: "plan", label: "Plano", value: "Growth", icon: "layout" },
  { id: "agents", label: "Agentes", value: "3 de 3 ativos", icon: "users" },
  { id: "quota", label: "Cota", value: "68% usada", icon: "clock" },
  { id: "billing", label: "Billing", value: "Em dia", icon: "clock" },
  { id: "tickets", label: "Tickets", value: "1 aberto", icon: "inbox" },
  { id: "grant", label: "Grant", value: "Ativo até hoje 18:00", icon: "shield" },
  { id: "incidents", label: "Incidentes", value: "0 críticos", icon: "alert" },
  { id: "owner", label: <>Responsável<br />interno</>, value: "Marina - CS", icon: "user" },
  { id: "activity", label: "Última atividade", value: "hoje 10:24", icon: "clock" }
];

const defaultTenantSummaryActivities: TenantSummaryDrawerActivity[] = [
  { id: "ticket", label: "Ticket de importação atualizado", time: "hoje 10:24" },
  { id: "grant", label: "Grant aprovado pelo dono", time: "hoje 09:18" },
  { id: "quota", label: "Cota chegou a 68%", time: "ontem 18:20" },
  { id: "plan", label: "Plano Growth renovado", time: "12/05" }
];

export function TenantSummaryDrawer({
  open = true,
  state = "active",
  grantState = "active",
  title = "Studio Vila Mariana",
  subtitle = "Cliente ativo da Taliya",
  facts = defaultTenantSummaryFacts,
  activities = defaultTenantSummaryActivities,
  onClose,
  onAction,
  className,
  ...props
}: TenantSummaryDrawerProps) {
  if (!open || state === "closed") return null;
  const disabled = state === "loading" || state === "blocked";
  const isTenantBlocked = state === "tenant-blocked";
  const isDegraded = state === "degraded" || state === "risk";
  const isRisk = isDegraded || isTenantBlocked;
  const healthLabel = isTenantBlocked ? "bloqueado" : isDegraded ? "degradado" : "estável";
  const healthTone: ComponentTone = isTenantBlocked ? "danger" : isDegraded ? "warning" : "success";
  const healthCopy = isTenantBlocked
    ? "O tenant está bloqueado e exige revisão de segurança, billing e incidentes antes de liberar acesso."
    : isDegraded
      ? "Há degradação em billing, cota, suporte ou operação."
      : "Uso regular, billing em dia e suporte ativo em importação.";
  const grantAction: { id: TenantSummaryDrawerAction; label: string; disabled?: boolean } = grantState === "active"
    ? { id: "revoke-access", label: "Revogar acesso" }
    : grantState === "pending"
      ? { id: "grant-access", label: "Aprovar grant" }
      : { id: "grant-access", label: "Conceder acesso" };

  const footer = (
    <div className="tcrm-tenant-summary-drawer__actions">
      <Button disabled={disabled} leadingIcon="externalLink" onClick={() => onAction?.("open-tenant")} size="sm" variant="primary">Abrir tenant</Button>
      <div>
        {([
          ["support", "Ver suporte"], ["grants", "Ver grants"], ["billing", "Ver billing"],
          [grantAction.id, grantAction.label], ["audit", "Ver auditoria"], ["note", "Adicionar nota interna"]
        ] as Array<[TenantSummaryDrawerAction, string]>).map(([id, label]) => <Button disabled={disabled || ((id === "grant-access" || id === "revoke-access") && isTenantBlocked)} key={id} onClick={() => onAction?.(id)} size="sm" variant="secondary">{label}</Button>)}
      </div>
    </div>
  );

  return (
    <CrmDrawer
      aria-label="Resumo do tenant selecionado"
      className={cn("tcrm-tenant-summary-drawer", className)}
      component="TenantSummaryDrawer"
      data-grant-state={grantState}
      footer={footer}
      header={(
        <header className="tcrm-tenant-summary-drawer__header">
          <Chip showDot={false} tone="info">Tenant selecionado</Chip>
          <IconButton disabled={disabled} icon="x" label="Fechar resumo do tenant" onClick={onClose} size="sm" variant="subtle" />
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>
      )}
      loading={state === "loading"}
      state={state}
      title={title}
      {...props}
    >
      <dl className="tcrm-tenant-summary-drawer__facts">
        {facts.map((fact) => (
          <div data-tone={fact.tone} key={fact.id}>
            <Icon name={fact.icon} size="13px" tone={fact.tone} />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-tenant-summary-drawer__health">
        <h3>Saúde da conta <Chip tone={healthTone}>{healthLabel}</Chip></h3>
        <p>
          <Icon name={isRisk ? "alert" : "shieldCheck"} size="18px" tone={healthTone} />
          {healthCopy}
        </p>
      </section>
      <section className="tcrm-tenant-summary-drawer__security">
        <h3>Acesso e segurança</h3>
        <p><Icon name="lock" size="17px" tone="warning" />Dados operacionais exigem grant escopado.</p>
        <small>Alunos, conversas e financeiro do studio não aparecem por padrão.</small>
      </section>
      <section className="tcrm-tenant-summary-drawer__activity">
        <h3>Atividade recente</h3>
        {activities.map((activity) => <p key={activity.id}><span />{activity.label}<time>{activity.time}</time></p>)}
      </section>
      <section className="tcrm-tenant-summary-drawer__copilot">
        <Icon name="sparkles" size="22px" tone="info" />
        <div><h3>Copiloto interno</h3><p>{isTenantBlocked ? "Resumo: revisar o incidente e as restrições antes de qualquer mudança de acesso." : isDegraded ? "Resumo: priorizar a recuperação dos sinais degradados antes de ampliar acesso." : "Resumo: acompanhar o ticket de importação antes do grant expirar. Não há incidente crítico neste tenant."}</p><small><Icon name="info" size="14px" />Apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.</small></div>
      </section>
    </CrmDrawer>
  );
}

export interface TenantSecurityDrawerProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean;
  state?: TenantSecurityDrawerState;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}

function tenantSecurityPanelState(state?: React.ReactNode): "allowed" | "denied" | "warning" {
  const key = stateKey(state);
  if (["revoked", "denied", "blocked", "closed"].includes(key)) return "denied";
  if (["warning", "loading"].includes(key)) return "warning";
  return "allowed";
}

export function TenantSecurityDrawer({
  open = true,
  state = "security review",
  onClose,
  onAction,
  className,
  ...props
}: TenantSecurityDrawerProps) {
  if (!open) return null;

  const key = stateKey(state) || "security-review";

  return (
    <aside
      aria-busy={key === "loading" || undefined}
      aria-label="Drawer de segurança do tenant"
      className={cn("tcrm-tenant-security-drawer", className)}
      data-component="TenantSecurityDrawer"
      data-state={key}
      role="complementary"
      {...props}
    >
      <SecurityRulePanel
        className="tcrm-tenant-security-drawer__panel"
        disabled={key === "loading" || key === "blocked"}
        onAction={(actionId) => {
          if (actionId === "close") {
            onClose?.();
            return;
          }
          onAction?.(actionId);
        }}
        state={tenantSecurityPanelState(state)}
      />
    </aside>
  );
}
