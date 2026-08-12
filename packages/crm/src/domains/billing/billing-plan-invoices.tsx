/** Plan summary and confirmed-subscription surfaces. */
import React from "react";
import { Button, Card, Chip, Icon, IconButton, ListIcon, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { SubscriptionResultHeader, ConfirmedSetupHandoff } from "./billing-subscription.js";
import type { ConfirmedSetupHandoffProps } from "./billing-subscription.js";


export interface ConfirmedSubscriptionPageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  summary?: React.ReactNode;
  handoff?: React.ReactNode;
  summaryProps?: PlanSummaryCardProps;
  handoffProps?: ConfirmedSetupHandoffProps;
}

export function ConfirmedSubscriptionPage({
  header,
  summary,
  handoff,
  summaryProps,
  handoffProps,
  children,
  className,
  ...props
}: ConfirmedSubscriptionPageProps) {
  return (
    <section aria-label="Assinatura confirmada" className={cn("tcrm-confirmed-subscription-page", className)} {...props}>
      {header ?? <SubscriptionResultHeader />}
      <div className="tcrm-confirmed-subscription-page__content">
        {children ?? (
          <>
            {summary ?? <PlanSummaryCard state="confirmed" {...summaryProps} />}
            {handoff ?? <ConfirmedSetupHandoff {...handoffProps} />}
          </>
        )}
      </div>
    </section>
  );
}


export type PlanSummaryCardState = "active" | "review" | "confirmed" | "failed";

export interface PlanSummaryFeature {
  id: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  icon: IconName;
  included?: boolean;
  disabled?: boolean;
  help?: boolean;
  separatorBefore?: boolean;
}

export interface PlanSummaryDetail {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
}

export interface PlanSummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  state?: PlanSummaryCardState;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  badgeLabel?: React.ReactNode;
  features?: PlanSummaryFeature[];
  details?: PlanSummaryDetail[];
  accountEmail?: React.ReactNode;
  releaseNote?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onChangePlan?: () => void;
  onViewDetails?: () => void;
  onFeatureHelp?: (id: string) => void;
}

const activePlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "operational", label: "CRM operacional", icon: "sliders", included: true },
  { id: "agents", label: "7 agentes inclusos", icon: "users", included: true },
  { id: "quota", label: "Cotas do ciclo", icon: "menu", included: true },
  { id: "support", label: "Suporte Taliya", icon: "help", included: true }
];

const reviewPlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "panel", label: "Painel Taliya + app", icon: "layout", included: true, help: true },
  { id: "studio", label: "Sistema do studio", icon: "copy", included: true, help: true },
  { id: "whatsapp", label: "WhatsApp Business", icon: "whatsapp", included: true },
  { id: "support", label: "Atendimento", icon: "headphones", included: true },
  { id: "agenda", label: "Agenda", icon: "calendar", included: true },
  { id: "sales", label: "Vendas", icon: "wallet", included: true },
  { id: "finance", label: "Financeiro", icon: "coins", included: false, disabled: true, separatorBefore: true },
  { id: "retention", label: "Retenção", icon: "users", included: false, disabled: true },
  { id: "management", label: "Gestão", icon: "barChart", included: false, disabled: true },
  { id: "history", label: "Histórico/Evolução", icon: "trendingUp", included: false, disabled: true },
  { id: "messages", label: "Mensagens de IA", meta: "5.000 mensagens/mês", icon: "sparkles", included: true, separatorBefore: true }
];

const confirmedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" },
  { id: "agents", label: "Agentes", value: "3 agentes incluídos", icon: "users" },
  { id: "renewal", label: "Renovação", value: "Mensal", icon: "refresh" }
];

const failedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" }
];

export function PlanSummaryCard({
  title,
  state = "active",
  eyebrow,
  description,
  badgeLabel,
  features,
  details,
  accountEmail = "ana@studiolume.com",
  releaseNote = "O CRM será liberado após a configuração inicial.",
  className,
  children,
  action,
  secondaryAction,
  loading = false,
  blockedReason,
  onChangePlan,
  onViewDetails,
  onFeatureHelp,
  ...props
}: PlanSummaryCardProps) {
  const resolvedTitle =
    title ??
    (state === "review"
      ? "Plano Avance"
      : state === "confirmed"
        ? "Assinatura ativa"
        : state === "failed"
          ? "Sua assinatura"
          : "Plano 7 agentes");

  if (state === "review") {
    const resolvedFeatures = features ?? reviewPlanSummaryFeatures;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--review", className)} {...props}>
        <header className="tcrm-plan-summary-card__review-header">
          <strong>{resolvedTitle}</strong>
          <Chip className="tcrm-plan-summary-card__review-chip" showDot={false} tone="neutral">
            {badgeLabel ?? "3 agentes incluídos"}
          </Chip>
        </header>
        <section className="tcrm-plan-summary-card__review-section" aria-label="Incluso no plano">
          <h2>Incluso no plano</h2>
          {children ?? (
            <ul className="tcrm-plan-summary-card__review-list">
              {resolvedFeatures.map((feature) => (
                <li
                  className={cn(
                    "tcrm-plan-summary-card__review-row",
                    feature.disabled && "is-disabled",
                    feature.separatorBefore && "has-separator"
                  )}
                  key={feature.id}
                >
                  <Icon className="tcrm-plan-summary-card__review-icon" name={feature.icon} />
                  <span className="tcrm-plan-summary-card__review-copy">
                    <strong>{feature.label}</strong>
                    {feature.meta ? <small>{feature.meta}</small> : null}
                  </span>
                  <span className={cn("tcrm-plan-summary-card__review-status", feature.included === false && "is-muted")} aria-hidden="true">
                    <Icon name={feature.included === false ? "minus" : "check"} />
                  </span>
                  {feature.help ? (
                    <IconButton className="tcrm-plan-summary-card__review-help" icon="help" label={`Ajuda sobre ${feature.label}`} onClick={() => onFeatureHelp?.(feature.id)} size="sm" type="button" variant="ghost" />
                  ) : (
                    <span aria-hidden="true" className="tcrm-plan-summary-card__review-help-spacer" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer className="tcrm-plan-summary-card__review-footer">
          <span>
            <strong>Conta</strong>
            <small>{accountEmail}</small>
          </span>
          {action ?? (
            <Button className="tcrm-plan-summary-card__review-change" onClick={onChangePlan} size="sm" variant="ghost">
              Trocar
            </Button>
          )}
        </footer>
      </Card>
    );
  }

  if (state === "confirmed") {
    const resolvedDetails = details ?? confirmedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--confirmed", className)} {...props}>
        <header className="tcrm-plan-summary-card__confirmed-header">
          <span className="tcrm-plan-summary-card__confirmed-icon" aria-hidden="true">
            <Icon name="check" />
          </span>
          <strong>{resolvedTitle}</strong>
          <small>{description ?? "Recebemos a confirmação com sucesso."}</small>
        </header>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="neutral" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tcrm-plan-summary-card__release-note">
          <ListIcon icon="shieldCheck" tone="success" />
          <span>{releaseNote}</span>
        </div>
      </Card>
    );
  }

  if (state === "failed") {
    const resolvedDetails = details ?? failedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--failed", className)} {...props}>
        <h3>{resolvedTitle}</h3>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="info" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    );
  }

  const resolvedFeatures = features ?? activePlanSummaryFeatures;

  return (
    <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--active", className)} {...props}>
      <header className="tcrm-plan-summary-card__active-header">
        <small>{eyebrow ?? "Plano atual"}</small>
        <strong>{resolvedTitle}</strong>
        <p>{description ?? "CRM completo com 7 agentes contratados."}</p>
      </header>
      {children ?? (
        <ul className="tcrm-plan-summary-card__active-list">
          {resolvedFeatures.map((feature) => (
            <li className="tcrm-plan-summary-card__active-row" key={feature.id}>
              <ListIcon icon={feature.icon} tone="info" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      )}
      <footer className="tcrm-plan-summary-card__active-actions">
        {action ?? (
          <Button
            blockedReason={blockedReason}
            className="tcrm-plan-summary-card__primary"
            loading={loading}
            onClick={onChangePlan}
            variant="primary"
          >
            Trocar plano
          </Button>
        )}
        {secondaryAction ?? (
          <Button className="tcrm-plan-summary-card__secondary" onClick={onViewDetails} variant="secondary">
            Ver detalhes do plano
          </Button>
        )}
      </footer>
    </Card>
  );
}


export * from "./billing-invoices.js";


export * from "./billing-invoices.js";
