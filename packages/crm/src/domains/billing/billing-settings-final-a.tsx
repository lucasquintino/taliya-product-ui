/** Payment and agenda settings foundations. */
import React from "react";
import { Button, Card, Chip, ConfirmDialog, Icon, InlineAlert, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { ImpactSummary } from "./billing-approval-settings-core.js";
import type { ImpactSummaryProps } from "./billing-approval-settings-core.js";
import { PermissionMatrix, IntegrationStatusRow } from "./billing-permissions-settings.js";
import type { PermissionMatrixRow, PermissionMatrixProps, IntegrationProvider, IntegrationStatusRowState } from "./billing-permissions-settings.js";
import { SettingsSection } from "./billing-approval-settings-core.js";
import type { SettingsSectionRow } from "./billing-approval-settings-core.js";
import { SettingsWorkspaceControls, SettingsWorkspaceFeedback, UnsavedChangesBar, resolveSettingsWorkspaceSaveState } from "./billing-settings-workspaces.js";
import type { SettingsWorkspaceOperationalProps, UnsavedChangesBarState } from "./billing-settings-workspaces.js";
import { PaymentMethodRow } from "../../patterns/payment-usage-export.js";
import type { PaymentMethodRowMethod } from "../../patterns/payment-usage-export.js";

export type ConfigImpactPreviewProps = ImpactSummaryProps;

export function ConfigImpactPreview({
  state = "medium",
  className,
  ...props
}: ConfigImpactPreviewProps) {
  return (
    <ImpactSummary
      className={cn("tcrm-config-impact-preview", className)}
      data-component="ConfigImpactPreview"
      data-state={state}
      state={state}
      {...props}
    />
  );
}

export type PermissionRoleCardTone = "success" | "warning" | "info";

export interface PermissionRoleCardData {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  status: React.ReactNode;
  tone?: PermissionRoleCardTone;
  permissions: React.ReactNode[];
}

export interface PermissionRoleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "onSelect" | "title">, PermissionRoleCardData {
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (roleId: string) => void;
}

export function PermissionRoleCard({
  id,
  title,
  description,
  icon,
  status,
  tone = "info",
  permissions,
  selected = false,
  disabled = false,
  onSelect,
  className,
  ...props
}: PermissionRoleCardProps) {
  return (
    <Card
      className={cn("tcrm-permission-role-card", selected && "tcrm-permission-role-card--selected", className)}
      data-component="PermissionRoleCard"
      data-role-id={id}
      data-state={selected ? "selected" : "source"}
      data-tone={tone}
      {...props}
    >
      <PrimitiveButton aria-pressed={selected} className="tcrm-permission-role-card__select" disabled={disabled} onClick={() => onSelect?.(id)} type="button">
        <span className="tcrm-permission-role-card__icon"><Icon name={icon} /></span>
        <span className="tcrm-permission-role-card__copy">
          <strong>{title}</strong>
          <small>{description}</small>
          <Chip tone={tone === "success" ? "success" : tone === "warning" ? "warning" : "info"}>{status}</Chip>
        </span>
        <span className="tcrm-permission-role-card__permissions">
          {permissions.map((permission, index) => <span key={`permission-${permission}-${index}`}><Icon name="check" />{permission}</span>)}
        </span>
      </PrimitiveButton>
    </Card>
  );
}

const settingsPermissionsDefaultRoles: PermissionRoleCardData[] = [
  {
    id: "owner",
    title: "Dono/Admin",
    description: "Acesso completo ao CRM.",
    icon: "shieldCheck",
    status: "Completo",
    tone: "success",
    permissions: ["Configurações", "Financeiro", "Equipe", "Agentes e fluxos"]
  },
  {
    id: "frontdesk",
    title: "Recepção",
    description: "Operação diária, alunos, agenda e cobranças permitidas.",
    icon: "user",
    status: "Revisar",
    tone: "warning",
    permissions: ["Agenda completa", "Cadastro de alunos", "Presença e faltas", "Baixa manual, se permitido"]
  },
  {
    id: "teacher",
    title: "Professor",
    description: "Aulas, turmas vinculadas e alunos das próprias turmas.",
    icon: "graduation",
    status: "Pronto",
    tone: "info",
    permissions: ["Própria agenda", "Turmas vinculadas", "Chamada", "Observações permitidas"]
  }
];

export interface SettingsPermissionsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  roles?: PermissionRoleCardData[];
  selectedRoleId?: string;
  permissionRows?: PermissionMatrixRow[];
  saveState?: UnsavedChangesBarState;
  requiresApproval?: boolean;
  onRoleSelect?: (roleId: string) => void;
  onPermissionToggle?: PermissionMatrixProps["onToggleChange"];
  onPermissionSelect?: PermissionMatrixProps["onSelectChange"];
  onSave?: () => void;
  onCancel?: () => void;
}

export function SettingsPermissionsWorkspace({
  roles = settingsPermissionsDefaultRoles,
  selectedRoleId,
  permissionRows,
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  requiresApproval = false,
  onRequestAccess,
  onRetry,
  onRoleSelect,
  onPermissionToggle,
  onPermissionSelect,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPermissionsWorkspaceProps) {
  const [approvalOpen, setApprovalOpen] = React.useState(false);
  const saveBlocked = Boolean(blockedReason || validationError);
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  const requestSave = () => {
    if (saveBlocked) return;
    if (systemError) {
      (onRetry ?? onSave)?.();
      return;
    }
    if (requiresApproval) {
      setApprovalOpen(true);
      return;
    }
    onSave?.();
  };
  return (
    <section className={cn("tcrm-settings-permissions-workspace", className)} data-component="SettingsPermissionsWorkspace" {...props}>
      <section className="tcrm-settings-permissions-workspace__roles">
        <header>
          <h3>1. Papéis do CRM</h3>
          <p>Escolha o papel para entender o nível de acesso.</p>
        </header>
        <div className="tcrm-settings-permissions-workspace__role-grid">
          {roles.map((role) => (
            <PermissionRoleCard
              {...role}
              disabled={Boolean(blockedReason)}
              key={role.id}
              onSelect={onRoleSelect}
              selected={role.id === selectedRoleId}
            />
          ))}
        </div>
      </section>
      <PermissionMatrix blockedReason={blockedReason} onSelectChange={onPermissionSelect} onToggleChange={onPermissionToggle} rows={permissionRows} state={blockedReason ? "blocked" : "source"} />
      {blockedReason && onRequestAccess ? <Button onClick={onRequestAccess} size="sm" variant="secondary">Pedir acesso</Button> : null}
      <SettingsWorkspaceFeedback onRetry={onRetry} systemError={systemError} validationError={validationError} />
      {requiresApproval ? <InlineAlert tone="warning" title="Aprovação necessária">Um Dono/Admin precisa confirmar o aumento de permissão sensível.</InlineAlert> : null}
      <ConfigImpactPreview />
      <UnsavedChangesBar onCancel={onCancel} onSave={requestSave} state={resolvedSaveState} />
      <ConfirmDialog
        cancelLabel="Revisar ajuste"
        confirmLabel="Confirmar como Dono/Admin"
        description="Esta mudança amplia acesso a dados ou ações sensíveis e ficará registrada na auditoria."
        onCancel={() => setApprovalOpen(false)}
        onConfirm={() => { onSave?.(); setApprovalOpen(false); }}
        onOpenChange={setApprovalOpen}
        open={approvalOpen}
        summary={<strong>Permissões sensíveis da equipe</strong>}
        title="Confirmar aumento de permissão?"
        tone="sensitive"
      />
    </section>
  );
}

export interface SettingsPaymentsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  enabledMethods?: PaymentMethodRowMethod[];
  taliyaPaymentsState?: SettingsTaliyaPaymentsState;
  saveState?: UnsavedChangesBarState;
  ruleRows?: SettingsSectionRow[];
  onMethodSelect?: (method: PaymentMethodRowMethod) => void;
  onRuleAction?: (row: SettingsSectionRow) => void;
  onRuleToggle?: (row: SettingsSectionRow, checked: boolean) => void;
  onActivate?: () => void;
  onTechnicalIntegration?: () => void;
  onViewPlan?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsTaliyaPaymentsState = "pending" | "active" | "blocked" | "error";

const settingsPaymentMethods: Array<{
  method: PaymentMethodRowMethod;
  title: string;
  description: string;
}> = [
  { method: "pix", title: "Pix manual", description: "Baixa pela equipe ou comprovante." },
  { method: "cash", title: "Dinheiro", description: "Recebido presencialmente." },
  { method: "card", title: "Cartão presencial", description: "Registrado pela equipe." }
];

const settingsPaymentIntegrations: Array<{
  provider: IntegrationProvider;
  title: string;
}> = [
  { provider: "pix", title: "Pix Taliya" },
  { provider: "card", title: "Cartão online" },
  { provider: "recurrence", title: "Recorrência online" },
  { provider: "reconciliation", title: "Baixa automática e conciliação" }
];

export function SettingsPaymentsWorkspace({
  enabledMethods = ["pix", "cash", "card"],
  taliyaPaymentsState = "pending",
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  ruleRows,
  onMethodSelect,
  onRuleAction,
  onRuleToggle,
  onActivate,
  onTechnicalIntegration,
  onViewPlan,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPaymentsWorkspaceProps) {
  const taliyaPaymentsContract: Record<SettingsTaliyaPaymentsState, {
    status: string;
    tone: ComponentTone;
    integrationState: IntegrationStatusRowState;
    actionLabel?: string;
  }> = {
    pending: { status: "Aguardando ativação", tone: "warning", integrationState: "blocked", actionLabel: "Ativar Pagamentos Taliya" },
    active: { status: "Ativo", tone: "success", integrationState: "connected" },
    blocked: { status: "Plano necessário", tone: "danger", integrationState: "blocked", actionLabel: "Ver plano" },
    error: { status: "Falha técnica", tone: "danger", integrationState: "failed", actionLabel: "Revisar ativação" }
  };
  const paymentsContract = taliyaPaymentsContract[taliyaPaymentsState];
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <section className={cn("tcrm-settings-payments-workspace", className)} data-component="SettingsPaymentsWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-payments-workspace__methods">
        <header>
          <h3>1. Meios e baixa manual</h3>
          <p>Meios que a equipe pode registrar no Taliya.</p>
        </header>
        <div className="tcrm-settings-payments-workspace__method-grid">
          {settingsPaymentMethods.map((method) => (
            <PaymentMethodRow
              description={method.description}
              key={method.method}
              method={method.method}
              onSelect={(selectedMethod) => onMethodSelect?.(selectedMethod)}
              selected={enabledMethods.includes(method.method)}
              state="connected"
              title={method.title}
            />
          ))}
        </div>
        </Card>

        <SettingsSection onRowAction={onRuleAction} onToggleChange={onRuleToggle} rows={ruleRows} />

        <Card className="tcrm-settings-payments-workspace__taliya">
        <header>
          <span>
            <h3>3. Pagamentos Taliya</h3>
            <p>Ative pagamentos online quando quiser automatizar baixa e recorrência.</p>
          </span>
          <Chip tone={paymentsContract.tone}>{paymentsContract.status}</Chip>
        </header>
        <div className="tcrm-settings-payments-workspace__integration-grid">
          {settingsPaymentIntegrations.map((integration, index) => (
            <IntegrationStatusRow
              key={integration.provider}
              provider={integration.provider}
              showDivider={index < settingsPaymentIntegrations.length - 1}
              state={paymentsContract.integrationState}
              title={integration.title}
            />
          ))}
        </div>
        <footer>
          {paymentsContract.actionLabel ? (
            <Button onClick={taliyaPaymentsState === "blocked" ? onViewPlan : onActivate} variant="primary">{paymentsContract.actionLabel}</Button>
          ) : <span />}
          <p>Dados legais e bancários são preenchidos no provedor seguro, fora da Taliya.</p>
          <Button onClick={onTechnicalIntegration} trailingIcon="externalLink" variant="ghost">Ver integração técnica</Button>
        </footer>
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}
