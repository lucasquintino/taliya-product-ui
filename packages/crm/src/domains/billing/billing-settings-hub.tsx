/** Settings hub and integration surfaces. */
import React from "react";
import { Button, Card, Chip, Icon, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";

export type SettingsHubCardState =
  | "ready"
  | "invite-pending"
  | "review"
  | "connected"
  | "pending"
  | "read-only"
  | "entitlement-blocked"
  | "error"
  | "blocked"
  | "loading";

export interface SettingsHubCardProps extends Omit<CrmSurfaceProps, "action" | "state" | "statusLabel"> {
  state?: SettingsHubCardState;
  statusLabel?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onOpen?: () => void;
}

const settingsHubCardStatusByState: Record<SettingsHubCardState, string> = {
  ready: "Pronto",
  "invite-pending": "1 convite pendente",
  review: "Revisar",
  connected: "WhatsApp conectado",
  pending: "Pendente",
  "read-only": "Somente leitura",
  "entitlement-blocked": "Não contratado",
  error: "Falha ao carregar",
  blocked: "Bloqueado",
  loading: "Carregando"
};

const settingsHubCardToneByState: Record<SettingsHubCardState, ComponentTone> = {
  ready: "success",
  "invite-pending": "warning",
  review: "warning",
  connected: "success",
  pending: "warning",
  "read-only": "info",
  "entitlement-blocked": "warning",
  error: "danger",
  blocked: "paused",
  loading: "info"
};

export function SettingsHubCard({
  title = "Studio",
  description = "Dados, unidades e horarios.",
  state = "ready",
  statusLabel,
  icon = "slidersRound",
  action,
  actionLabel = "Abrir",
  disabled = false,
  loading = false,
  onOpen,
  className,
  ...props
}: SettingsHubCardProps) {
  const isBlocked = state === "blocked";
  const isDisabled = disabled || isBlocked;
  const resolvedActionLabel = actionLabel === "Abrir"
    ? state === "read-only"
      ? "Abrir em leitura"
      : state === "entitlement-blocked"
        ? "Ver plano"
        : state === "error"
          ? "Tentar novamente"
          : actionLabel
    : actionLabel;

  return (
    <Card className={cn("tcrm-settings-hub-card", className)} data-component="SettingsHubCard" data-state={state} disabled={isDisabled} {...props}>
      <span className="tcrm-settings-hub-card__icon">
        <Icon name={icon} size="var(--taliya-control-crm-settings-hub-card-icon-glyph)" strokeWidth="var(--taliya-control-crm-settings-hub-card-icon-stroke)" />
      </span>
      <strong className="tcrm-settings-hub-card__title">{title}</strong>
      {description ? <p className="tcrm-settings-hub-card__description">{description}</p> : null}
      <Chip className="tcrm-settings-hub-card__status" data-state={state} showDot={false} tone={settingsHubCardToneByState[state]}>
        {statusLabel ?? settingsHubCardStatusByState[state]}
      </Chip>
      {action ?? (
        <Button
          blockedReason={isBlocked ? "Configuração bloqueada" : undefined}
          className="tcrm-settings-hub-card__action"
          disabled={disabled}
          loading={loading || state === "loading"}
          onClick={onOpen}
          variant="secondary"
        >
          {resolvedActionLabel}
        </Button>
      )}
    </Card>
  );
}

export type IntegrationStatusRowState = "connected" | "pending" | "failed" | "blocked" | "loading";
export type IntegrationProvider = "pix" | "card" | "recurrence" | "reconciliation" | "custom";

const integrationStatusDefaults: Record<IntegrationStatusRowState, { helper: string; icon: IconName; label: string }> = {
  connected: { helper: "Ativo", icon: "checkCircle", label: "Conectado" },
  pending: { helper: "Pendente", icon: "clock", label: "Pendente" },
  failed: { helper: "Falha técnica", icon: "alertCircle", label: "Falha técnica" },
  blocked: { helper: "Bloqueado até ativar", icon: "lock", label: "Bloqueado" },
  loading: { helper: "Sincronizando", icon: "loader", label: "Sincronizando" }
};

const integrationProviderIcons: Partial<Record<IntegrationProvider, IconName>> = {
  card: "creditCard",
  recurrence: "refresh",
  reconciliation: "barChart"
};

export interface IntegrationStatusRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: IntegrationStatusRowState;
  provider?: IntegrationProvider;
  providerIcon?: IconName;
  providerLabel?: string;
  statusIcon?: IconName;
  statusLabel?: string;
  showDivider?: boolean;
  disabled?: boolean;
  onAction?: (provider: IntegrationProvider, state: IntegrationStatusRowState) => void;
}

function renderIntegrationProviderMark(provider: IntegrationProvider, providerIcon?: IconName) {
  if (provider === "pix") {
    return (
      <span className="tcrm-integration-status-row__pix-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  const icon = providerIcon ?? integrationProviderIcons[provider] ?? "link";
  return <Icon name={icon} size="var(--taliya-control-crm-integration-status-row-icon-glyph)" strokeWidth={1.85} />;
}

export function IntegrationStatusRow({
  title = "Pix Taliya",
  description,
  state = "blocked",
  provider = "pix",
  providerIcon,
  providerLabel,
  statusIcon,
  statusLabel,
  showDivider = true,
  disabled = false,
  onAction,
  className,
  ...props
}: IntegrationStatusRowProps) {
  const resolved = integrationStatusDefaults[state];
  const helper = description ?? resolved.helper;
  const interactive = Boolean(onAction);
  const content = (
    <>
      <span className={cn("tcrm-integration-status-row__provider", `tcrm-integration-status-row__provider--${provider}`)}>
        {renderIntegrationProviderMark(provider, providerIcon)}
      </span>
      <span className="tcrm-integration-status-row__body">
        <strong>{title}</strong>
        <span className="tcrm-integration-status-row__status">
          <Icon name={statusIcon ?? resolved.icon} size="var(--taliya-control-crm-integration-status-row-status-icon-size)" strokeWidth={2} />
          <span>{helper}</span>
        </span>
      </span>
    </>
  );
  const ariaLabel = providerLabel ?? `${String(title)} - ${statusLabel ?? resolved.label}`;
  const classes = cn("tcrm-integration-status-row", showDivider && "tcrm-integration-status-row--divider", className);

  if (interactive) {
    return (
      <PrimitiveButton
        aria-busy={state === "loading" || undefined}
        aria-label={ariaLabel}
        className={classes}
        data-component="IntegrationStatusRow"
        data-provider={provider}
        data-state={state}
        disabled={disabled || state === "loading"}
        onClick={() => onAction?.(provider, state)}
        type="button"
      >
        {content}
      </PrimitiveButton>
    );
  }

  return (
    <div
      aria-busy={state === "loading" || undefined}
      aria-label={ariaLabel}
      className={classes}
      data-component="IntegrationStatusRow"
      data-provider={provider}
      data-state={state}
      role="group"
      {...props}
    >
      {content}
    </div>
  );
}
