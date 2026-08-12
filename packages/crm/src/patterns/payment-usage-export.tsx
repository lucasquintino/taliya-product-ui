/** Payment method, usage origin, and export patterns. */
import React from "react";
import { Button, Chip, Icon, InlineAlert, PrimitiveButton, DropdownMenu, cn } from "@taliya/ui";
import type { DropdownAction, IconName } from "@taliya/ui";

export type PaymentMethodRowMethod = "pix" | "cash" | "card";
export type PaymentMethodRowState = "selected" | "connected" | "failed" | "disabled" | "loading";

const paymentMethodRowCopy: Record<PaymentMethodRowMethod, { title: string; description: string; icon: IconName }> = {
  pix: { title: "Pix", description: "Pagamento por Pix", icon: "wallet" },
  cash: { title: "Dinheiro", description: "Recebido presencialmente", icon: "banknote" },
  card: { title: "Cartão", description: "Cartão presencial", icon: "creditCard" }
};

export interface PaymentMethodRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  method?: PaymentMethodRowMethod;
  state?: PaymentMethodRowState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  onSelect?: (method: PaymentMethodRowMethod, state: PaymentMethodRowState) => void;
}

function PaymentMethodMark({ method }: { method: PaymentMethodRowMethod }) {
  if (method === "pix") {
    return (
      <span className="tcrm-payment-method-row__pix-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  return <Icon name={paymentMethodRowCopy[method].icon} strokeWidth={method === "cash" ? 1.7 : 1.9} />;
}

export function PaymentMethodRow({
  method = "pix",
  state = "selected",
  title,
  description,
  selected,
  disabled,
  onSelect,
  className,
  onClick,
  ...props
}: PaymentMethodRowProps) {
  const copy = paymentMethodRowCopy[method];
  const isSelected = selected ?? state === "selected";
  const isDisabled = disabled || state === "disabled" || state === "loading";
  const resolvedTitle = title ?? copy.title;
  const resolvedDescription = description ?? (state === "failed" ? "Precisa revisar" : copy.description);

  return (
    <PrimitiveButton
      aria-busy={state === "loading" || undefined}
      aria-pressed={isSelected}
      className={cn(
        "tcrm-payment-method-row",
        isSelected && "tcrm-payment-method-row--selected",
        state === "failed" && "tcrm-payment-method-row--failed",
        state === "loading" && "tcrm-payment-method-row--loading",
        isDisabled && "tcrm-payment-method-row--disabled",
        className
      )}
      data-component="PaymentMethodRow"
      data-method={method}
      data-state={state}
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onSelect?.(method, state);
      }}
      type="button"
      {...props}
    >
      <span className={cn("tcrm-payment-method-row__mark", `tcrm-payment-method-row__mark--${method}`)}>
        <PaymentMethodMark method={method} />
      </span>
      <span className="tcrm-payment-method-row__body">
        <strong>{resolvedTitle}</strong>
        {state === "connected" ? <Chip showDot={false} tone="success">Ativo</Chip> : null}
        <span>{resolvedDescription}</span>
      </span>
      {isSelected ? (
        <span className="tcrm-payment-method-row__check" aria-hidden="true">
          <Icon name="check" />
        </span>
      ) : null}
      {state === "failed" ? (
        <span className="tcrm-payment-method-row__state-icon" aria-hidden="true">
          <Icon name="alert" />
        </span>
      ) : null}
    </PrimitiveButton>
  );
}

export function SecurePaymentNotice({
  state = "secure",
  compact = false,
  className,
  action,
  title = state === "failed" ? "Pagamento exige atenção" : "Pagamento seguro",
  children = "A Taliya não coleta dados de cartão. A confirmação acontece pelo ambiente seguro de pagamento.",
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  state?: "secure" | "pending" | "failed";
  compact?: boolean;
  action?: React.ReactNode;
  title?: string;
}) {
  return (
    <InlineAlert
      className={cn("tcrm-secure-payment-notice", compact && "tcrm-secure-payment-notice--compact", className)}
      icon="shield"
      action={action}
      title={title}
      tone={state === "failed" ? "danger" : state === "pending" ? "warning" : "success"}
      {...props}
    >
      {children}
    </InlineAlert>
  );
}

export type UsageOriginRowOrigin =
  | "attendance"
  | "agenda"
  | "sales"
  | "finance"
  | "other"
  | "message"
  | "automation"
  | "import"
  | "adjustment";

export type UsageOriginRowState = "source" | "selected" | "loading" | "disabled" | "blocked";

const usageOriginKinds = ["attendance", "agenda", "sales", "finance", "other", "message", "automation", "import", "adjustment"] as const;

const usageOriginRowDefaults: Record<UsageOriginRowOrigin, { label: string; amount: string; percent: number; visualPercent: number; icon: IconName }> = {
  attendance: { label: "Atendimento", amount: "2.400", percent: 38, visualPercent: 55, icon: "message" },
  agenda: { label: "Agenda", amount: "1.600", percent: 25, visualPercent: 36, icon: "calendar" },
  sales: { label: "Vendas", amount: "1.200", percent: 19, visualPercent: 27, icon: "trendingUp" },
  finance: { label: "Financeiro", amount: "700", percent: 11, visualPercent: 12, icon: "creditCard" },
  other: { label: "Outros", amount: "400", percent: 7, visualPercent: 6, icon: "ellipsis" },
  message: { label: "Atendimento", amount: "2.400", percent: 38, visualPercent: 55, icon: "message" },
  automation: { label: "Automacao", amount: "900", percent: 14, visualPercent: 18, icon: "bot" },
  import: { label: "Importacao", amount: "700", percent: 11, visualPercent: 12, icon: "upload" },
  adjustment: { label: "Ajuste manual", amount: "400", percent: 7, visualPercent: 6, icon: "ellipsis" }
};

export interface UsageOriginRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  origin?: UsageOriginRowOrigin;
  state?: UsageOriginRowOrigin | UsageOriginRowState;
  title?: React.ReactNode;
  amount?: React.ReactNode;
  percent?: number;
  visualPercent?: number;
  icon?: IconName;
  onSelect?: (origin: UsageOriginRowOrigin, state: UsageOriginRowState) => void;
}

function isUsageOrigin(value: unknown): value is UsageOriginRowOrigin {
  return usageOriginKinds.includes(value as UsageOriginRowOrigin);
}

function UsageOriginRowIcon({ origin, icon }: { origin: UsageOriginRowOrigin; icon: IconName }) {
  if (origin === "attendance" || origin === "message") {
    return (
      <span className="tcrm-usage-origin-row__attendance-icon" aria-hidden="true">
        <span />
        <i />
      </span>
    );
  }
  return <Icon name={icon} />;
}

export function UsageOriginRow({
  origin,
  title,
  amount,
  percent,
  visualPercent,
  icon,
  state = "source",
  onSelect,
  className,
  disabled,
  ...props
}: UsageOriginRowProps) {
  const effectiveOrigin = origin ?? (isUsageOrigin(state) ? state : "attendance");
  const effectiveState: UsageOriginRowState = isUsageOrigin(state) ? "source" : state;
  const defaults = usageOriginRowDefaults[effectiveOrigin];
  const displayLabel = title ?? defaults.label;
  const displayAmount = amount ?? defaults.amount;
  const displayPercent = Math.max(0, Math.min(100, percent ?? defaults.percent));
  const displayVisualPercent = Math.max(0, Math.min(100, visualPercent ?? defaults.visualPercent));
  const isLoading = effectiveState === "loading";
  const isDisabled = disabled || isLoading || effectiveState === "disabled" || effectiveState === "blocked";

  return (
    <PrimitiveButton
      aria-busy={isLoading || undefined}
      aria-pressed={effectiveState === "selected" ? "true" : undefined}
      className={cn("tcrm-usage-origin-row", className)}
      data-component="UsageOriginRow"
      data-origin={effectiveOrigin}
      data-state={effectiveState}
      disabled={isDisabled}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) onSelect?.(effectiveOrigin, effectiveState);
      }}
      style={{ "--tcrm-usage-origin-row-percent": `${displayVisualPercent}%` } as React.CSSProperties}
      type="button"
      {...props}
    >
      <span className="tcrm-usage-origin-row__icon" aria-hidden="true">
        <UsageOriginRowIcon origin={effectiveOrigin} icon={icon ?? defaults.icon} />
      </span>
      <span className="tcrm-usage-origin-row__label">{displayLabel}</span>
      <span className="tcrm-usage-origin-row__progress" aria-hidden="true">
        <span />
      </span>
      <span className="tcrm-usage-origin-row__amount">{displayAmount}</span>
      <span className="tcrm-usage-origin-row__percent">({displayPercent}%)</span>
    </PrimitiveButton>
  );
}

export type ExportActionState = "default" | "menu" | "loading" | "disabled" | "blocked";

export interface ExportActionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  label?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  state?: ExportActionState;
  actions?: DropdownAction[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: () => void;
  onActionSelect?: (action: DropdownAction) => void;
}

export function ExportAction({
  label = "Exportar",
  loading = false,
  disabled = false,
  state = "default",
  actions,
  open,
  defaultOpen = false,
  onOpenChange,
  onExport,
  onActionSelect,
  className,
  ...props
}: ExportActionProps) {
  const hasMenu = Boolean(actions?.length);
  const effectiveState: ExportActionState = loading ? "loading" : disabled ? "disabled" : state;
  const isLoading = effectiveState === "loading";
  const isDisabled = effectiveState === "loading" || effectiveState === "disabled" || effectiveState === "blocked";
  const menuActions = actions?.map((action) => ({
    ...action,
    onSelect: () => {
      action.onSelect?.();
      onActionSelect?.(action);
    }
  }));

  return (
    <div
      className={cn("tcrm-export-action", className)}
      data-component="ExportAction"
      data-state={effectiveState}
      {...props}
    >
      {hasMenu ? (
        <DropdownMenu
          actions={menuActions ?? []}
          className="tcrm-export-action__menu-root"
          defaultOpen={defaultOpen || state === "menu"}
          label={String(label)}
          onOpenChange={onOpenChange}
          open={open}
          trigger={({ id, isOpen, label: triggerLabel, onClick, onKeyDown }) => (
            <Button
              aria-busy={isLoading || undefined}
              aria-controls={id}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              className="tcrm-export-action__trigger"
              disabled={isDisabled}
              leadingIcon={isLoading ? "loader" : "upload"}
              onClick={onClick}
              onKeyDown={onKeyDown}
              type="button"
              variant="secondary"
            >
              {triggerLabel}
            </Button>
          )}
        />
      ) : (
        <Button
          aria-busy={isLoading || undefined}
          className="tcrm-export-action__trigger"
          disabled={isDisabled}
          leadingIcon={isLoading ? "loader" : "upload"}
          onClick={onExport}
          type="button"
          variant="secondary"
        >
          {label}
        </Button>
      )}
    </div>
  );
}

