/** Add-ons, quota, and usage overview workspaces. */
import React from "react";
import { Button, Card, Chip, EmptyState, ErrorState, Icon, LoadingState, ProgressBar, cn } from "@taliya/ui";
import type { ButtonVariant, ComponentTone, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { QuotaBadge } from "../../patterns/shell-operational-a.js";


export type AddOnCardState = "available" | "active" | "plan-max" | "consult" | "unavailable";

interface AddOnCardStateDefaults {
  title: React.ReactNode;
  description: React.ReactNode;
  meta: React.ReactNode;
  statusLabel: React.ReactNode;
  icon: IconName;
  actionLabel: React.ReactNode;
  actionVariant: ButtonVariant;
  statusTone: ComponentTone;
}

export interface AddOnCardProps extends Omit<CrmSurfaceProps, "state" | "action"> {
  state?: AddOnCardState;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
  loading?: boolean;
  blockedReason?: string;
  onAction?: (state: AddOnCardState) => void;
}

const addOnCardDefaultsByState: Record<AddOnCardState, AddOnCardStateDefaults> = {
  active: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Pacote ativo na assinatura atual.",
    statusLabel: "Ativo",
    icon: "messageSquareText",
    actionLabel: "Gerenciar pacote",
    actionVariant: "secondary",
    statusTone: "success"
  },
  available: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Entra após confirmação do billing.",
    statusLabel: "Disponível",
    icon: "messageSquareText",
    actionLabel: "Adicionar pacote",
    actionVariant: "primary",
    statusTone: "success"
  },
  consult: {
    title: "Cota personalizada",
    description: <>Para studios com alto volume<br />ou várias unidades.</>,
    meta: <>A equipe Taliya revisa a necessidade<br />com você.</>,
    statusLabel: "Sob consulta",
    icon: "pieChart",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "info"
  },
  "plan-max": {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  },
  unavailable: {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  }
};

function addOnCardStatusClass(state: AddOnCardState) {
  if (state === "plan-max" || state === "unavailable") return "plan";
  return state;
}

function addOnCardAccessibleText(value: React.ReactNode, fallback: React.ReactNode) {
  const resolved = value ?? fallback;
  return typeof resolved === "string" || typeof resolved === "number" ? String(resolved) : "add-on";
}

export function AddOnCard({
  title,
  description,
  meta,
  statusLabel,
  icon,
  state = "available",
  action,
  actionLabel,
  actionVariant,
  loading = false,
  blockedReason,
  onAction,
  className,
  ...props
}: AddOnCardProps) {
  const defaults = addOnCardDefaultsByState[state];
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  const resolvedMeta = meta ?? defaults.meta;
  const resolvedStatusLabel = statusLabel ?? defaults.statusLabel;
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const resolvedActionVariant = actionVariant ?? defaults.actionVariant;
  const titleId = React.useId();
  const accessibleTitle = addOnCardAccessibleText(resolvedTitle, defaults.title);

  return (
    <Card
      aria-labelledby={titleId}
      className={cn("tcrm-addon-card", className)}
      data-component="AddOnCard"
      data-state={state}
      {...props}
    >
      <span className="tcrm-addon-card__icon" aria-hidden="true">
        <Icon name={resolvedIcon} />
      </span>
      <h3 className="tcrm-addon-card__title" id={titleId}>{resolvedTitle}</h3>
      <Chip className={cn("tcrm-addon-card__status", `tcrm-addon-card__status--${addOnCardStatusClass(state)}`)} showDot={false} tone={defaults.statusTone}>
        {resolvedStatusLabel}
      </Chip>
      <p className="tcrm-addon-card__description">{resolvedDescription}</p>
      <small className="tcrm-addon-card__meta">{resolvedMeta}</small>
      {action ?? (
        <Button
          aria-label={`${resolvedActionLabel} - ${accessibleTitle}`}
          blockedReason={blockedReason}
          className={cn("tcrm-addon-card__action", `tcrm-addon-card__action--${resolvedActionVariant}`)}
          loading={loading}
          onClick={() => onAction?.(state)}
          size="sm"
          variant={resolvedActionVariant}
        >
          {resolvedActionLabel}
        </Button>
      )}
    </Card>
  );
}

export interface BillingAddOnOption {
  id: string;
  state: AddOnCardState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  statusLabel?: React.ReactNode;
  icon?: IconName;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
}

export interface BillingAddOnsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  activeTitle?: React.ReactNode;
  activeEmptyTitle?: React.ReactNode;
  activeEmptyDescription?: React.ReactNode;
  availableTitle?: React.ReactNode;
  activeAddOns?: BillingAddOnOption[];
  availableAddOns?: BillingAddOnOption[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}

const billingAvailableAddOns: BillingAddOnOption[] = [
  { id: "messages", state: "available" },
  { id: "agents", state: "plan-max" },
  { id: "quota", state: "consult" }
];

function BillingAddOnGrid({
  addOns,
  blockedReason,
  loading,
  onAddOnAction
}: {
  addOns: BillingAddOnOption[];
  blockedReason?: string;
  loading?: boolean;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}) {
  return (
    <div className="tcrm-billing-addons-workspace__grid">
      {addOns.map((option) => (
        <AddOnCard
          actionLabel={option.actionLabel}
          actionVariant={option.actionVariant}
          blockedReason={blockedReason}
          description={option.description}
          icon={option.icon}
          key={option.id}
          loading={loading}
          meta={option.meta}
          onAction={() => onAddOnAction?.(option)}
          state={option.state}
          statusLabel={option.statusLabel}
          title={option.title}
        />
      ))}
    </div>
  );
}

export function BillingAddOnsWorkspace({
  activeTitle = "Add-ons ativos",
  activeEmptyTitle = "Nenhum add-on ativo",
  activeEmptyDescription = "Quando um pacote extra for contratado, ele aparece aqui.",
  availableTitle = "Disponíveis",
  activeAddOns = [],
  availableAddOns = billingAvailableAddOns,
  loading = false,
  error,
  blockedReason,
  onAddOnAction,
  className,
  ...props
}: BillingAddOnsWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-addons-workspace", className)} data-component="BillingAddOnsWorkspace" {...props}>
      <Card className="tcrm-billing-addons-workspace__active">
        <h2>{activeTitle}</h2>
        {error ? (
          <ErrorState description={error} title="Não foi possível carregar os add-ons" />
        ) : loading && activeAddOns.length === 0 ? (
          <LoadingState title="Carregando add-ons ativos" />
        ) : activeAddOns.length > 0 ? (
          <BillingAddOnGrid addOns={activeAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
        ) : (
          <EmptyState
            className="tcrm-billing-addons-workspace__empty"
            description={activeEmptyDescription}
            icon="package"
            title={String(activeEmptyTitle)}
          />
        )}
      </Card>

      <Card className="tcrm-billing-addons-workspace__available">
        <h2>{availableTitle}</h2>
        <BillingAddOnGrid addOns={availableAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
      </Card>
    </section>
  );
}

export type QuotaProgressState = "normal" | 70 | 90 | 100;
export type QuotaProgressAction = "ledger" | "add-ons";

export interface QuotaProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  state?: QuotaProgressState;
  label?: string;
  title?: React.ReactNode;
  totalLabel?: React.ReactNode;
  unitLabel?: React.ReactNode;
  usedLabel?: React.ReactNode;
  remainingLabel?: React.ReactNode;
  badgeLabel?: string;
  alertLabel?: React.ReactNode;
  ledgerLabel?: React.ReactNode;
  addOnsLabel?: React.ReactNode;
  loading?: boolean | QuotaProgressAction;
  disabled?: boolean;
  blockedReason?: string;
  onAction?: (action: QuotaProgressAction) => void;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
}

function quotaProgressStateFromValue(value: number): QuotaProgressState {
  if (value >= 100) return 100;
  if (value >= 90) return 90;
  if (value >= 70) return 70;
  return "normal";
}

function quotaProgressTone(state: QuotaProgressState): "info" | "warning" | "danger" {
  if (state === 100) return "danger";
  if (state === 90) return "warning";
  return "info";
}

export function QuotaProgress({
  value = 42,
  state,
  label = "Uso da cota no ciclo",
  title = "Cota do ciclo",
  totalLabel = "15.000",
  unitLabel = "mensagens/mês",
  usedLabel = "6.300 usadas",
  remainingLabel = "8.700 restantes",
  badgeLabel,
  alertLabel = "Próximo alerta em 70%.",
  ledgerLabel = "Ver extrato",
  addOnsLabel = "Ver add-ons",
  loading = false,
  disabled = false,
  blockedReason,
  onAction,
  onViewLedger,
  onViewAddOns,
  className,
  ...props
}: QuotaProgressProps) {
  const normalizedValue = Math.max(0, Math.min(100, Math.round(value)));
  const resolvedState = state ?? quotaProgressStateFromValue(normalizedValue);
  const progressTone = quotaProgressTone(resolvedState);
  const isLedgerLoading = loading === true || loading === "ledger";
  const isAddOnsLoading = loading === true || loading === "add-ons";

  const handleLedger = () => {
    onViewLedger?.();
    onAction?.("ledger");
  };
  const handleAddOns = () => {
    onViewAddOns?.();
    onAction?.("add-ons");
  };

  return (
    <Card
      aria-busy={loading ? true : undefined}
      className={cn("tcrm-quota-progress", className)}
      data-component="QuotaProgress"
      data-state={resolvedState}
      style={{ "--tcrm-quota-progress-value": `${normalizedValue}%` } as React.CSSProperties}
      {...props}
    >
      <h3 className="tcrm-quota-progress__title">{title}</h3>
      <div className="tcrm-quota-progress__headline">
        <strong>{totalLabel}</strong>
        <span>{unitLabel}</span>
      </div>
      <div className="tcrm-quota-progress__usage-labels">
        <span>{usedLabel}</span>
        <span>{remainingLabel}</span>
      </div>
      <div className="tcrm-quota-progress__progress-wrap">
        <ProgressBar className="tcrm-quota-progress__progress" label={label} tone={progressTone} value={normalizedValue} />
        <span aria-hidden="true" className="tcrm-quota-progress__progress-value">{normalizedValue}%</span>
      </div>
      <div className="tcrm-quota-progress__status-row">
        <QuotaBadge className="tcrm-quota-progress__badge" label={badgeLabel} value={resolvedState} />
        <span className="tcrm-quota-progress__helper">{alertLabel}</span>
      </div>
      <span aria-hidden="true" className="tcrm-quota-progress__message-box">
        <span className="tcrm-quota-progress__message-bubble">
          <span />
          <span />
          <span />
        </span>
      </span>
      <div className="tcrm-quota-progress__actions">
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--ledger"
          disabled={disabled}
          loading={isLedgerLoading}
          onClick={handleLedger}
          variant="secondary"
        >
          {ledgerLabel}
        </Button>
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--addons"
          disabled={disabled}
          loading={isAddOnsLoading}
          onClick={handleAddOns}
          variant="primary"
        >
          {addOnsLabel}
        </Button>
      </div>
    </Card>
  );
}


export * from "./billing-usage-overview.js";


export * from "./billing-usage-overview.js";
