/** Agenda, notification, and compatibility settings surfaces. */
import React from "react";
import { Button, Card, Chip, Icon, IconButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { SettingsWorkspaceControls, SettingsWorkspaceFeedback, UnsavedChangesBar, resolveSettingsWorkspaceSaveState } from "./billing-settings-workspaces.js";
import type { SettingsWorkspaceOperationalProps } from "./billing-settings-workspaces.js";
import { RuleRow } from "./billing-permissions-settings.js";
import type { UnsavedChangesBarState } from "./billing-settings-workspaces.js";

export interface SettingsAgendaRow {
  id: string;
  title: React.ReactNode;
  schedule: React.ReactNode;
  scope?: React.ReactNode;
  status: React.ReactNode;
  statusTone?: ComponentTone;
}

export interface SettingsAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  closedDays?: SettingsAgendaRow[];
  temporaryBlocks?: SettingsAgendaRow[];
  ruleValues?: Partial<SettingsAgendaRuleValues>;
  saveState?: UnsavedChangesBarState;
  onAddException?: () => void;
  onAddBlock?: () => void;
  onRowAction?: (rowId: string, action: "edit" | "open") => void;
  onRuleChange?: (ruleId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export interface SettingsAgendaRuleValues {
  waitlist: boolean;
  fitIns: string;
  callTolerance: string;
}

const settingsAgendaClosedDays: SettingsAgendaRow[] = [
  { id: "christmas", title: "Natal", schedule: "25/12", scope: "Todas as unidades", status: "Fechado", statusTone: "danger" },
  { id: "year-break", title: "Recesso de fim de ano", schedule: "23/12 a 02/01", scope: "Unidade Jardins", status: "Revisar aulas futuras", statusTone: "warning" },
  { id: "special-saturday", title: "Sábado especial", schedule: "Sábados até 12h", scope: "Horário reduzido", status: "Horário reduzido", statusTone: "info" }
];

const settingsAgendaTemporaryBlocks: SettingsAgendaRow[] = [
  { id: "room-maintenance", title: "Manutenção Sala 2", schedule: "28/05, 14h às 18h", status: "Afeta 3 aulas", statusTone: "warning" },
  { id: "internal-workshop", title: "Workshop interno", schedule: "01/06, manhã", status: "Bloqueia novas marcações", statusTone: "info" }
];

export function SettingsAgendaWorkspace({
  closedDays = settingsAgendaClosedDays,
  temporaryBlocks = settingsAgendaTemporaryBlocks,
  ruleValues = {},
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onAddException,
  onAddBlock,
  onRowAction,
  onRuleChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsAgendaWorkspaceProps) {
  const resolvedRuleValues: SettingsAgendaRuleValues = { waitlist: true, fitIns: "approval", callTolerance: "10", ...ruleValues };
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  const renderRows = (rows: SettingsAgendaRow[], icon: IconName) => (
    <div className="tcrm-settings-agenda-workspace__rows" role="list">
      {rows.map((row) => (
        <div className="tcrm-settings-agenda-workspace__row" key={row.id} role="listitem">
          <Icon name={icon} />
          <strong>{row.title}</strong>
          <span>{row.schedule}</span>
          {row.scope ? <span>{row.scope}</span> : <span />}
          <Chip tone={row.statusTone ?? "neutral"}>{row.status}</Chip>
          <IconButton icon="edit" label={`Editar ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "edit")} size="sm" variant="ghost" />
          <IconButton icon="chevronRight" label={`Abrir ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "open")} size="sm" variant="ghost" />
        </div>
      ))}
    </div>
  );

  return (
    <section className={cn("tcrm-settings-agenda-workspace", className)} data-component="SettingsAgendaWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>1. Dias fechados e exceções</h3><p>Defina feriados, recessos e horários especiais sem mudar a agenda fixa do studio.</p></span>
          <Button onClick={onAddException} trailingIcon="plus" variant="secondary">Adicionar exceção</Button>
        </header>
        {renderRows(closedDays, "calendar")}
        </Card>

        <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>2. Bloqueios temporários</h3><p>Bloqueie sala, turma ou período quando algo não puder receber marcações.</p></span>
          <Button onClick={onAddBlock} trailingIcon="plus" variant="secondary">Adicionar bloqueio</Button>
        </header>
        {renderRows(temporaryBlocks, "lock")}
        </Card>

        <Card className="tcrm-settings-agenda-workspace__section tcrm-settings-agenda-workspace__rules">
        <header><span><h3>3. Regras simples da agenda</h3><p>Ajustes globais que mudam como a agenda aceita vagas e encaixes.</p></span></header>
        <div>
          <RuleRow checked={resolvedRuleValues.waitlist} control="none" icon="users" onToggle={(checked) => onRuleChange?.("waitlist", checked)} statusLabel={resolvedRuleValues.waitlist ? "Ligada" : "Desligada"} title="Lista de espera" />
          <RuleRow
            icon="slidersRound"
            onSelectChange={(value) => onRuleChange?.("fit-ins", value)}
            selectOptions={[{ value: "approval", label: "Exigem aprovação" }, { value: "free", label: "Livres" }]}
            selectValue={resolvedRuleValues.fitIns}
            showToggle={false}
            statusLabel={null}
            title="Encaixes"
          />
          <RuleRow
            icon="clock"
            onSelectChange={(value) => onRuleChange?.("call-tolerance", value)}
            selectOptions={[{ value: "10", label: "10 min" }, { value: "15", label: "15 min" }]}
            selectValue={resolvedRuleValues.callTolerance}
            showToggle={false}
            statusLabel={null}
            title="Tolerância de chamada"
          />
        </div>
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}

export interface SettingsNotificationAlert {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export interface SettingsNotificationRole {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  tone: "danger" | "info" | "success";
  alerts: SettingsNotificationAlert[];
}

export interface SettingsNotificationsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  roles?: SettingsNotificationRole[];
  enabledAlertTypesByRole?: Partial<Record<string, string[]>>;
  reviewAlertIdsByRole?: Partial<Record<string, string[]>>;
  unavailableChannelReasons?: Partial<Record<SettingsNotificationChannelId, string>>;
  frequencyRules?: Partial<Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue>>;
  channelRules?: Partial<Record<SettingsNotificationChannelId, SettingsNotificationRuleValue>>;
  saveState?: UnsavedChangesBarState;
  selectedRoleId?: string;
  onRoleSelect?: (roleId: string) => void;
  onAlertToggle?: (roleId: string, alertId: string, enabled: boolean) => void;
  onFrequencyChange?: (alertId: string, value: string | boolean) => void;
  onChannelChange?: (channelId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsNotificationFrequencyId = "critical" | "operational" | "informative" | "non-critical";
export type SettingsNotificationChannelId = "taliya" | "email" | "whatsapp" | "after-hours";

export interface SettingsNotificationRuleValue {
  value: string;
  enabled: boolean;
}

const defaultSettingsNotificationFrequencyRules: Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue> = {
  critical: { value: "immediate", enabled: true },
  operational: { value: "daily", enabled: true },
  informative: { value: "weekly", enabled: true },
  "non-critical": { value: "silent-after-hours", enabled: true }
};

const defaultSettingsNotificationChannelRules: Record<SettingsNotificationChannelId, SettingsNotificationRuleValue> = {
  taliya: { value: "enabled", enabled: true },
  email: { value: "owner", enabled: true },
  whatsapp: { value: "critical", enabled: true },
  "after-hours": { value: "critical", enabled: true }
};

const settingsNotificationRoles: SettingsNotificationRole[] = [
  {
    id: "owner", title: "Dono/Admin", description: "Falhas críticas, aprovações sensíveis e financeiro.", icon: "shieldStar", tone: "danger",
    alerts: [
      { id: "integration-failure", label: "Integração com falha", icon: "alert" },
      { id: "critical-payment", label: "Pagamento crítico", icon: "play" },
      { id: "pending-approval", label: "Aprovação pendente", icon: "shield" },
      { id: "config-pending", label: "Pendência de configuração", icon: "alertCircle" }
    ]
  },
  {
    id: "frontdesk", title: "Recepção", description: "Operação diária, agenda, alunos e cobranças manuais.", icon: "user", tone: "info",
    alerts: [
      { id: "class-problem", label: "Aula com problema", icon: "inbox" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "users" },
      { id: "manual-charge", label: "Cobrança manual", icon: "coins" },
      { id: "pending-invite", label: "Convite pendente", icon: "fileText" }
    ]
  },
  {
    id: "teacher", title: "Professor", description: "Aulas, turmas vinculadas e pendências das próprias turmas.", icon: "graduation", tone: "success",
    alerts: [
      { id: "own-class", label: "Aula da própria turma", icon: "calendar" },
      { id: "pending-roll-call", label: "Chamada pendente", icon: "alertCircle" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "user" },
      { id: "important-note", label: "Observação importante", icon: "graduation" }
    ]
  }
];

export function SettingsNotificationsWorkspace({
  roles = settingsNotificationRoles,
  enabledAlertTypesByRole = {},
  reviewAlertIdsByRole = {},
  unavailableChannelReasons = {},
  frequencyRules = {},
  channelRules = {},
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  selectedRoleId,
  onRoleSelect,
  onAlertToggle,
  onFrequencyChange,
  onChannelChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsNotificationsWorkspaceProps) {
  const frequency = { ...defaultSettingsNotificationFrequencyRules, ...frequencyRules };
  const channels = { ...defaultSettingsNotificationChannelRules, ...channelRules };
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <section className={cn("tcrm-settings-notifications-workspace", className)} data-component="SettingsNotificationsWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__roles">
        <header><h3>1. Alertas por papel</h3><p>Escolha quais alertas cada papel da equipe deve receber.</p></header>
        <div className="tcrm-settings-notifications-workspace__role-grid">
          {roles.map((role) => {
            const enabledAlerts = enabledAlertTypesByRole[role.id] ?? role.alerts.map((alert) => alert.id);
            const reviewAlerts = reviewAlertIdsByRole[role.id] ?? [];
            return (
              <Card
                className={cn("tcrm-settings-notifications-workspace__role", role.id === selectedRoleId && "tcrm-settings-notifications-workspace__role--selected")}
                data-role-id={role.id}
                key={role.id}
              >
                <Button
                  aria-label={`Selecionar papel ${String(role.title)}`}
                  aria-pressed={role.id === selectedRoleId}
                  className="tcrm-settings-notifications-workspace__role-select"
                  onClick={() => onRoleSelect?.(role.id)}
                  variant="ghost"
                >
                  <span className="tcrm-settings-notifications-workspace__role-icon" data-tone={role.tone}><Icon name={role.icon} /></span>
                  <span className="tcrm-settings-notifications-workspace__role-copy"><strong>{role.title}</strong><small>{role.description}</small></span>
                </Button>
                <span className="tcrm-settings-notifications-workspace__alerts">
                  {role.alerts.map((alert) => {
                    const enabled = enabledAlerts.includes(alert.id);
                    const needsReview = reviewAlerts.includes(alert.id);
                    return (
                      <Button
                        aria-label={`Alternar ${String(alert.label)} para ${String(role.title)}`}
                        aria-pressed={enabled}
                        className={cn("tcrm-settings-notifications-workspace__alert", needsReview && "tcrm-settings-notifications-workspace__alert--review")}
                        key={alert.id}
                        onClick={() => onAlertToggle?.(role.id, alert.id, !enabled)}
                        variant="ghost"
                      >
                        <Chip icon={alert.icon} showDot={false} tone={enabled ? role.tone : "neutral"}>{alert.label}</Chip>
                        {needsReview ? <Chip icon="alert" showDot={false} tone="warning">Revisar</Chip> : null}
                      </Button>
                    );
                  })}
                </span>
              </Card>
            );
          })}
        </div>
        </Card>

        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__rules">
        <header><h3>2. Frequência dos alertas</h3><p>Defina quando o Taliya avisa a equipe.</p></header>
        <div className="tcrm-settings-notifications-workspace__rule-head"><span>Nível de alerta</span><span>Frequência</span><span>Status</span></div>
        <RuleRow checked={frequency.critical.enabled} icon="alert" iconTone="danger" onSelectChange={(value) => onFrequencyChange?.("critical", value)} onToggle={(value) => onFrequencyChange?.("critical", value)} rowId="critical" selectValue={frequency.critical.value} title="Crítico" />
        <RuleRow checked={frequency.operational.enabled} icon="alertCircle" iconTone="warning" onSelectChange={(value) => onFrequencyChange?.("operational", value)} onToggle={(value) => onFrequencyChange?.("operational", value)} rowId="operational" selectValue={frequency.operational.value} title="Operacional" />
        <RuleRow checked={frequency.informative.enabled} icon="info" iconTone="info" onSelectChange={(value) => onFrequencyChange?.("informative", value)} onToggle={(value) => onFrequencyChange?.("informative", value)} rowId="informative" selectValue={frequency.informative.value} title="Informativo" />
        <RuleRow checked={frequency["non-critical"].enabled} icon="minus" onSelectChange={(value) => onFrequencyChange?.("non-critical", value)} onToggle={(value) => onFrequencyChange?.("non-critical", value)} rowId="non-critical" selectValue={frequency["non-critical"].value} title="Não crítico" />
        </Card>

        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__channels">
        <header><h3>3. Canais internos</h3><p>Escolha onde a equipe recebe avisos internos do CRM.</p></header>
        <RuleRow blockedReason={unavailableChannelReasons.taliya} checked={channels.taliya.enabled} control="none" description={unavailableChannelReasons.taliya} icon="layout" onToggle={(value) => onChannelChange?.("taliya", value)} rowId="taliya" state={unavailableChannelReasons.taliya ? "blocked" : "enabled"} title="Dentro do Taliya" />
        <RuleRow blockedReason={unavailableChannelReasons.email} description={unavailableChannelReasons.email} icon="mail" onSelectChange={(value) => onChannelChange?.("email", value)} rowId="email" selectOptions={[{ value: "owner", label: "Ligado para Dono/Admin" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.email.value} showToggle={false} state={unavailableChannelReasons.email ? "blocked" : "enabled"} statusLabel={null} title="E-mail interno" />
        <RuleRow blockedReason={unavailableChannelReasons.whatsapp} description={unavailableChannelReasons.whatsapp} icon="whatsapp" iconTone="success" onSelectChange={(value) => onChannelChange?.("whatsapp", value)} rowId="whatsapp" selectOptions={[{ value: "critical", label: "Ligado para alertas críticos" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.whatsapp.value} showToggle={false} state={unavailableChannelReasons.whatsapp ? "blocked" : "enabled"} statusLabel={null} title="WhatsApp interno" />
        <RuleRow blockedReason={unavailableChannelReasons["after-hours"]} description={unavailableChannelReasons["after-hours"]} icon="clock" onSelectChange={(value) => onChannelChange?.("after-hours", value)} rowId="after-hours" selectOptions={[{ value: "critical", label: "Somente crítico" }, { value: "silent", label: "Silenciado" }]} selectValue={channels["after-hours"].value} showToggle={false} state={unavailableChannelReasons["after-hours"] ? "blocked" : "enabled"} statusLabel={null} title="Fora do horário" />
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}

export type ConversationListState = "source" | "loading" | "empty" | "blocked";
