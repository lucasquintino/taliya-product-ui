/** Internal security and access-rule compositions. */
import React from "react";
import {
  Button,
  Checkbox,
  Chip,
  Icon,
  IconButton,
  ProgressBar,
  Panel,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { stateKey, toneForState } from "./students-utilities.js";

export function TenantCard({
  name = "Studio Vila Mariana",
  state = "active",
  plan = "Growth",
  quota = 68,
  onOpen,
  className
}: CrmSurfaceProps & {
  name?: React.ReactNode;
  plan?: React.ReactNode;
  quota?: number;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "active";
  const statusText = key === "warning" ? "Risco" : key === "security" ? "Grant ativo" : "Ativo";
  const grantText = key === "security" ? "ativo" : key === "warning" ? "pendente" : "ativo";
  const billingText = key === "warning" ? "pagamento falhou" : "em dia";
  const ticketsText = key === "warning" ? "2 abertos" : "1 aberto";

  return (
    <article aria-label={String(name)} className={cn("tcrm-tenant-card", className)} data-state={key}>
      <Checkbox aria-label={`Selecionar ${String(name)}`} defaultChecked={key === "active"} />
      <span className="tcrm-tenant-card__avatar">{String(name).split(" ").slice(-2).map((part) => part[0]).join("") || "TV"}</span>
      <Button className="tcrm-tenant-card__name" onClick={() => onOpen?.()} size="sm" variant="ghost">{name}</Button>
      <Chip className={cn("tcrm-internal-status-chip", `tcrm-internal-status-chip--${key === "warning" ? "risk" : "grant"}`)} showDot tone={toneForState(key)}>{statusText}</Chip>
      <span>{plan}</span>
      <span>{key === "warning" ? "0/0" : "3/3"}</span>
      <span className="tcrm-tenant-card__quota"><b>{quota}%</b><ProgressBar value={quota} tone={quota >= 90 ? "danger" : quota >= 70 ? "warning" : "success"} /></span>
      <Button className="tcrm-tenant-card__link" onClick={() => onOpen?.()} size="sm" variant="ghost">{ticketsText}</Button>
      <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "warning" ? "warning" : "success"}>{grantText}</Chip>
      <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "warning" ? "danger" : "success"}>{billingText}</Chip>
      <span className="tcrm-tenant-card__meta">Marina<br /><small>hoje 10:24</small></span>
      <Button className="tl-sr-only" onClick={() => onOpen?.()} size="sm" variant="secondary">Abrir tenant</Button>
    </article>
  );
}

export function SecurityRulePanel({
  state = "allowed",
  onAction,
  disabled = false,
  className
}: CrmSurfaceProps & {
  onClose?: () => void;
  onAction?: (actionId: string) => void;
  disabled?: boolean;
}) {
  const key = stateKey(state) || "allowed";
  const grantLabel = key === "denied" ? "Grant negado" : key === "warning" ? "Revisar grant" : "Grant ativo";
  const isDisabled = disabled || key === "loading" || key === "blocked";

  return (
    <aside className={cn("tcrm-security-rule-panel", className)} data-state={key} aria-label="Segurança do tenant">
      <header>
        <h3>Segurança do tenant</h3>
        <IconButton icon="x" label="Fechar segurança" onClick={() => onAction?.("close")} size="sm" variant="subtle" />
        <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={key === "denied" ? "danger" : key === "warning" ? "warning" : "success"}>{grantLabel}</Chip>
      </header>
      <dl className="tcrm-security-rule-panel__facts">
        {[
          ["Escopo", "Importação e duplicidades", "coins"],
          ["Expira", key === "denied" ? "sem acesso" : "hoje 18:00", "calendar"],
          ["Aprovador", key === "warning" ? "pendente" : "Ana Souza", "user"],
          ["Usuário Taliya", "Marina - Suporte", "fileText"],
          ["Permissão", key === "denied" ? "negada" : "Leitura e diagnóstico", "shield"]
        ].map(([label, value, icon]) => (
          <div key={label}>
            <Icon name={(label === "Escopo" ? "database" : icon) as IconName} size="15px" />
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-security-rule-panel__alert tcrm-security-rule-panel__alert--warning">
        <Icon name="shieldAlert" size="19px" tone="warning" />
        <p>Dados operacionais só aparecem dentro do escopo do grant.</p>
      </section>
      <section className="tcrm-security-rule-panel__alert tcrm-security-rule-panel__alert--info">
        <Icon name="info" size="20px" tone="info" />
        <p>Alunos, conversas e financeiro do studio não são exibidos por padrão.</p>
      </section>
      <section className="tcrm-security-rule-panel__copilot">
        <Icon name="sparkles" size="24px" tone="info" />
        <div>
          <strong>Copiloto interno</strong>
          <p>Resumo: revisar duplicidades antes do grant expirar. Não há incidente crítico neste tenant.</p>
          <small>O copiloto não concede grant, não altera billing e não bloqueia tenant sozinho.</small>
        </div>
      </section>
      <div className="tcrm-security-rule-panel__actions">
        <Button blockedReason={key === "denied" ? "Grant negado" : undefined} disabled={isDisabled} leadingIcon="shieldX" loading={key === "loading"} onClick={() => onAction?.("use")} size="sm" variant="primary">Usar grant</Button>
        <Button disabled={isDisabled} leadingIcon="shieldX" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
        <Button disabled={isDisabled} leadingIcon="headphones" onClick={() => onAction?.("ticket")} size="sm" variant="secondary">Abrir ticket</Button>
        <Button disabled={isDisabled} leadingIcon="fileText" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Ver auditoria</Button>
        <Button disabled={isDisabled} leadingIcon="fileText" onClick={() => onAction?.("note")} size="sm" variant="secondary">Adicionar nota interna</Button>
      </div>
    </aside>
  );
}

export interface InternalSecurityRulesPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  primaryRules?: React.ReactNode[];
  secondaryRules?: React.ReactNode[];
  title?: React.ReactNode;
}

export function InternalSecurityRulesPanel({
  className,
  primaryRules = [
    "Abrir tenant abre apenas metadados e visao permitida, nao dados operacionais completos.",
    "Solicitar grant e obrigatorio para diagnostico em dados do studio.",
    "Grants sempre tem escopo, motivo, permissao e expiracao."
  ],
  secondaryRules = [
    "Copiloto interno nao concede grant, nao altera billing e nao bloqueia tenant sozinho.",
    "A Taliya pode auditar acessos e acoes a qualquer momento."
  ],
  title = "Regras de seguranca",
  ...props
}: InternalSecurityRulesPanelProps) {
  const renderRules = (rules: React.ReactNode[]) => (
    <ul>
      {rules.map((rule, index) => (
        <li key={`security-rule-${String(rule)}-${index}`}>
          <Icon name={index === 0 ? "shieldCheck" : "checkCircle"} size="14px" />
          <span>{rule}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Panel className={cn("tcrm-internal-security-rules", className)} {...props}>
      <header>
        <Icon name="shieldCheck" tone="warning" />
        <strong>{title}</strong>
      </header>
      <div className="tcrm-internal-security-rules__content">
        {renderRules(primaryRules)}
        {renderRules(secondaryRules)}
      </div>
    </Panel>
  );
}
