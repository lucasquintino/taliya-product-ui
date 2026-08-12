/** Checkout and subscription review surfaces. */
import React from "react";
import { Button, Card, Input, cn } from "@taliya/ui";
import { SecurePaymentNotice } from "../../patterns/payment-usage-export.js";
import { PlanSummaryCard } from "./billing-plan-invoices.js";

export type CheckoutPaymentCardState = "default" | "coupon-applied" | "coupon-error" | "loading" | "blocked";

export interface CheckoutPaymentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  state?: CheckoutPaymentCardState;
  title?: React.ReactNode;
  planName?: React.ReactNode;
  planPrice?: React.ReactNode;
  couponLabel?: React.ReactNode;
  couponPlaceholder?: string;
  couponValue?: string;
  couponDefaultValue?: string;
  couponMessage?: React.ReactNode;
  couponError?: React.ReactNode;
  totalLabel?: React.ReactNode;
  total?: React.ReactNode;
  renewalLabel?: React.ReactNode;
  secureLabel?: string;
  secureDescription?: React.ReactNode;
  continueLabel?: React.ReactNode;
  backLabel?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
}

export function CheckoutPaymentCard({
  state = "default",
  title = "Pagamento",
  planName = "Plano Avance",
  planPrice = "R$ 497,00",
  couponLabel = "Cupom",
  couponPlaceholder = "Código promocional",
  couponValue,
  couponDefaultValue = "",
  couponMessage,
  couponError,
  totalLabel = "Total hoje",
  total,
  renewalLabel = "Renovação mensal",
  secureLabel = "Pagamento seguro",
  secureDescription = "A Taliya não coleta dados de cartão nesta tela.",
  continueLabel,
  backLabel = "Voltar aos planos",
  loading = false,
  blockedReason,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  className,
  ...props
}: CheckoutPaymentCardProps) {
  const generatedCouponId = React.useId();
  const [internalCouponValue, setInternalCouponValue] = React.useState(couponDefaultValue);
  const isControlled = couponValue !== undefined;
  const resolvedCouponValue = couponValue ?? internalCouponValue;
  const resolvedLoading = loading || state === "loading";
  const resolvedBlockedReason = blockedReason ?? (state === "blocked" ? "Pagamento temporariamente indisponível" : undefined);
  const resolvedCouponError = couponError ?? (state === "coupon-error" ? "Cupom inválido ou expirado." : undefined);
  const resolvedCouponMessage = couponMessage ?? (state === "coupon-applied" ? "Cupom aplicado." : undefined);
  const resolvedTotal = total ?? (state === "coupon-applied" ? "R$ 447,30" : "R$ 497,00");
  const resolvedContinueLabel = continueLabel ?? (resolvedLoading ? "Abrindo pagamento seguro" : "Continuar para pagamento seguro");
  const couponDescriptionId = resolvedCouponError || resolvedCouponMessage ? `${generatedCouponId}-message` : undefined;
  const couponState = resolvedCouponError ? "error" : resolvedCouponMessage ? "success" : "default";
  const controlsDisabled = resolvedLoading || Boolean(resolvedBlockedReason);
  const visualState: CheckoutPaymentCardState = resolvedLoading
    ? "loading"
    : resolvedBlockedReason
      ? "blocked"
      : state;

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    if (!isControlled) {
      setInternalCouponValue(nextValue);
    }
    onCouponChange?.(nextValue);
  };

  const handleCouponSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApplyCoupon?.(resolvedCouponValue);
  };

  return (
    <Card
      className={cn(
        "tcrm-checkout-payment-card",
        visualState !== "default" && `tcrm-checkout-payment-card--${visualState}`,
        className
      )}
      {...props}
    >
      <h2>{title}</h2>
      <div className="tcrm-checkout-payment-card__plan-row">
        <span>{planName}</span>
        <strong>{planPrice}</strong>
      </div>
      <form className="tcrm-checkout-payment-card__coupon" onSubmit={handleCouponSubmit}>
        <label className="tcrm-checkout-payment-card__coupon-label" htmlFor={generatedCouponId}>
          {couponLabel}
        </label>
        <div className="tcrm-checkout-payment-card__coupon-controls">
          <Input
            aria-describedby={couponDescriptionId}
            aria-label={couponPlaceholder}
            disabled={controlsDisabled}
            fieldState={couponState}
            id={generatedCouponId}
            onChange={handleCouponChange}
            placeholder={couponPlaceholder}
            value={resolvedCouponValue}
          />
          <Button className="tcrm-checkout-payment-card__coupon-action" disabled={controlsDisabled} type="submit" variant="secondary">
            Aplicar
          </Button>
        </div>
        {resolvedCouponError || resolvedCouponMessage ? (
          <p className="tcrm-checkout-payment-card__coupon-message" id={couponDescriptionId} role={resolvedCouponError ? "alert" : "status"}>
            {resolvedCouponError ?? resolvedCouponMessage}
          </p>
        ) : null}
      </form>
      <div className="tcrm-checkout-payment-card__total-row">
        <span>
          <strong>{totalLabel}</strong>
          <small>{renewalLabel}</small>
        </span>
        <strong>{resolvedTotal}</strong>
      </div>
      <div className="tcrm-checkout-payment-card__secure">
        <SecurePaymentNotice compact title={secureLabel}>
          {null}
        </SecurePaymentNotice>
        <p>{secureDescription}</p>
      </div>
      <footer className="tcrm-checkout-payment-card__actions">
        <Button
          blockedReason={resolvedBlockedReason}
          className="tcrm-checkout-payment-card__continue"
          loading={resolvedLoading}
          onClick={onContinuePayment}
          variant="primary"
        >
          {resolvedContinueLabel}
        </Button>
        <Button
          className="tcrm-checkout-payment-card__back"
          disabled={resolvedLoading}
          onClick={onBackToPlans}
          variant="ghost"
        >
          {backLabel}
        </Button>
      </footer>
    </Card>
  );
}

export interface CheckoutReviewPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  planCard?: React.ReactNode;
  paymentCard?: React.ReactNode;
  paymentCardProps?: CheckoutPaymentCardProps;
  loading?: boolean;
  blockedReason?: string;
  couponValue?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
  onChangePlan?: () => void;
  onFeatureHelp?: (id: string) => void;
}

export function CheckoutReviewPanel({
  className,
  children,
  planCard,
  paymentCard,
  paymentCardProps,
  loading,
  blockedReason,
  couponValue,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  onChangePlan,
  onFeatureHelp,
  ...props
}: CheckoutReviewPanelProps) {
  return (
    <div className={cn("tcrm-checkout-review-panel", className)} {...props}>
      {children ?? (
        <>
          {planCard ?? <PlanSummaryCard onChangePlan={onChangePlan} onFeatureHelp={onFeatureHelp} state="review" />}
          {paymentCard ?? (
            <CheckoutPaymentCard
              {...paymentCardProps}
              blockedReason={blockedReason ?? paymentCardProps?.blockedReason}
              couponValue={couponValue ?? paymentCardProps?.couponValue}
              loading={loading ?? paymentCardProps?.loading}
              onApplyCoupon={onApplyCoupon ?? paymentCardProps?.onApplyCoupon}
              onBackToPlans={onBackToPlans ?? paymentCardProps?.onBackToPlans}
              onContinuePayment={onContinuePayment ?? paymentCardProps?.onContinuePayment}
              onCouponChange={onCouponChange ?? paymentCardProps?.onCouponChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export interface SubscriptionReviewPageProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  panel?: React.ReactNode;
  panelProps?: CheckoutReviewPanelProps;
}

export function SubscriptionReviewPage({
  title = "Revisar assinatura",
  description = "Confira seu plano antes de ir para o pagamento seguro.",
  panel,
  panelProps,
  children,
  className,
  ...props
}: SubscriptionReviewPageProps) {
  return (
    <section aria-label="Revisar assinatura" className={cn("tcrm-subscription-review-page", className)} {...props}>
      <header className="tcrm-subscription-review-page__header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children ?? panel ?? <CheckoutReviewPanel {...panelProps} />}
    </section>
  );
}
