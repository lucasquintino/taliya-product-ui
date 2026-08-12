/** Subscription status, resolution, and setup handoff surfaces. */
import React from "react";
import { Button, Card, Chip, Icon, InlineAlert, StatusSummaryCard, Stepper, cn } from "@taliya/ui";
import type { IconName, StepperStep } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { toneForState } from "./billing-utilities.js";
import { SecurePaymentNotice } from "../../patterns/payment-usage-export.js";

export type SubscriptionStatusState = "verifying" | "failed" | "confirmed";
export type SubscriptionProgressState = "initiated" | "verifying" | "released";

export interface SubscriptionStatusDetail {
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface SubscriptionStatusCardProps extends Omit<CrmSurfaceProps, "state"> {
  state?: SubscriptionStatusState;
  details?: SubscriptionStatusDetail[];
  onBackToPlans?: () => void;
  onReopenPayment?: () => void;
  onRetry?: () => void;
  onStartSetup?: () => void;
  onSupport?: () => void;
}

const subscriptionStatusCopy: Record<
  SubscriptionStatusState,
  {
    title: string;
    description: string;
    icon: IconName;
    summaryState: "ok" | "attention" | "danger" | "info";
    statusLabel: string;
    callout?: { title: string; body: string };
    secureCopy?: string;
    helper?: string;
    footerNote?: string;
  }
> = {
  verifying: {
    title: "Estamos confirmando sua assinatura",
    description: "Seu pagamento foi iniciado. Assim que a confirmação chegar, você poderá configurar o Taliya para o seu estúdio.",
    icon: "shield",
    summaryState: "info",
    statusLabel: "Verificando confirmação",
    secureCopy: "A Taliya não coleta dados de cartão. A confirmação vem pelo ambiente seguro de pagamento.",
    helper: "A verificação acontece automaticamente. Você não precisa atualizar a página.",
    footerNote: "Pode levar alguns instantes. Você pode voltar a esta página se precisar."
  },
  failed: {
    title: "Não conseguimos confirmar sua assinatura",
    description: "Sua assinatura ainda não foi ativada. Você pode tentar novamente com segurança.",
    icon: "alert",
    summaryState: "danger",
    statusLabel: "Não confirmada",
    callout: {
      title: "O que aconteceu",
      body: "O pagamento pode ter sido cancelado, expirado ou recusado pelo provedor."
    },
    secureCopy: "A Taliya não coleta dados de cartão. A nova tentativa acontece pelo ambiente seguro do provedor.",
    footerNote: "O CRM será liberado assim que a assinatura for confirmada."
  },
  confirmed: {
    title: "Assinatura ativa",
    description: "Recebemos a confirmação com sucesso.",
    icon: "check",
    summaryState: "ok",
    statusLabel: "Confirmada"
  }
};

function defaultSubscriptionDetails(state: SubscriptionStatusState): SubscriptionStatusDetail[] {
  if (state === "confirmed") {
    return [
      { icon: "calendar", label: "Plano", value: "Avance" },
      { icon: "user", label: "Conta", value: "ana@studiolume.com" },
      { icon: "users", label: "Agentes", value: "3 agentes incluídos" },
      { icon: "refresh", label: "Renovação", value: "Mensal" }
    ];
  }

  return [
    { icon: "calendar", label: state === "failed" ? "Plano" : "Plano escolhido", value: "Avance" },
    { icon: "user", label: "Conta", value: "ana@studiolume.com" }
  ];
}

function subscriptionProgressStateFromStep(step?: number): SubscriptionProgressState {
  if (typeof step !== "number") return "verifying";
  if (step <= 1) return "initiated";
  if (step >= 3) return "released";
  return "verifying";
}

export function SubscriptionStatusCard({
  state = "verifying",
  className,
  children,
  action,
  title,
  description,
  icon,
  statusLabel,
  details,
  onBackToPlans,
  onReopenPayment,
  onRetry,
  onStartSetup,
  onSupport,
  ...props
}: SubscriptionStatusCardProps) {
  const copy = subscriptionStatusCopy[state];
  const rows = details ?? defaultSubscriptionDetails(state);
  const resolvedStatusLabel = statusLabel ?? copy.statusLabel;

  return (
    <StatusSummaryCard
      className={cn("tcrm-subscription-status-card", `tcrm-subscription-status-card--${state}`, className)}
      description={description ?? copy.description}
      headingLevel={1}
      icon={icon ?? copy.icon}
      state={copy.summaryState}
      statusLabel={resolvedStatusLabel}
      title={title ?? copy.title}
      {...props}
    >
      {children ?? (
        <div className="tcrm-subscription-status-card__content">
          {copy.callout ? (
            <InlineAlert className="tcrm-subscription-status-card__callout" icon="info" title={copy.callout.title} tone="warning">
              {copy.callout.body}
            </InlineAlert>
          ) : null}
          {state !== "confirmed" ? (
            <div className="tcrm-subscription-status-card__status-row">
              <strong>Status da assinatura</strong>
              <Chip className="tcrm-subscription-status-card__status-chip" tone={toneForState(state)}>
                {resolvedStatusLabel}
              </Chip>
            </div>
          ) : null}
          {state === "verifying" ? <SubscriptionProgressStepper state="verifying" /> : null}
          <div className={cn("tcrm-subscription-status-card__details", state === "failed" && "tcrm-subscription-status-card__details--boxed")}>
            {state === "failed" ? <strong className="tcrm-subscription-status-card__details-title">Sua assinatura</strong> : null}
            {rows.map((row, index) => (
              <div className="tcrm-subscription-status-card__detail-row" key={`${row.label}-${index}`}>
                <span className="tcrm-subscription-status-card__detail-icon">
                  <Icon name={row.icon ?? "clipboard"} />
                </span>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          {state === "confirmed" ? (
            <div className="tcrm-subscription-status-card__release-note">
              <Icon name="shieldCheck" />
              <span>O CRM será liberado após a configuração inicial.</span>
            </div>
          ) : copy.secureCopy ? (
            <SecurePaymentNotice>{copy.secureCopy}</SecurePaymentNotice>
          ) : null}
          {state === "verifying" ? (
            <>
              {action ?? (
                <Button aria-busy={true} className="tcrm-subscription-status-card__primary-action" disabled variant="primary">
                  <Icon className="tl-spin" name="loader" size="14px" />
                  Verificando...
                </Button>
              )}
              {copy.helper ? <p className="tcrm-subscription-status-card__helper">{copy.helper}</p> : null}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onReopenPayment} size="sm" variant="ghost">Reabrir pagamento seguro</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "failed" ? (
            <>
              {action ?? (
                <Button className="tcrm-subscription-status-card__primary-action" onClick={onRetry} variant="primary">
                  Tentar pagamento novamente
                </Button>
              )}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onBackToPlans} size="sm" variant="ghost">Voltar aos planos</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "confirmed" && action ? (
            <div className="tcrm-subscription-status-card__confirmed-action">
              {action}
            </div>
          ) : state === "confirmed" && onStartSetup ? (
            <Button className="tcrm-subscription-status-card__primary-action" onClick={onStartSetup} variant="primary">Começar setup guiado</Button>
          ) : null}
          {copy.footerNote ? <p className="tcrm-subscription-status-card__footer-note">{copy.footerNote}</p> : null}
        </div>
      )}
    </StatusSummaryCard>
  );
}

export function SubscriptionProgressStepper({
  state,
  step,
  className
}: {
  state?: SubscriptionProgressState;
  step?: number;
  className?: string;
}) {
  const resolvedState = state ?? subscriptionProgressStateFromStep(step);
  const steps: StepperStep[] = [
    {
      id: "payment-started",
      label: "Pagamento iniciado",
      state: resolvedState === "initiated" ? "current" : "complete"
    },
    {
      id: "confirmation",
      label: "Confirmação em andamento",
      state: resolvedState === "initiated" ? "pending" : resolvedState === "verifying" ? "current" : "complete"
    },
    {
      id: "setup-released",
      label: "Configuração liberada",
      state: resolvedState === "released" ? "complete" : "pending"
    }
  ];

  return (
    <Stepper
      aria-label="Progresso da confirmação da assinatura"
      className={cn("tcrm-subscription-progress-stepper", `tcrm-subscription-progress-stepper--${resolvedState}`, className)}
      orientation="horizontal"
      steps={steps}
    />
  );
}

export interface SubscriptionResolutionPanelProps extends Omit<SubscriptionStatusCardProps, "state"> {
  retrying?: boolean;
}

export function SubscriptionResolutionPanel({
  className,
  action,
  onRetry,
  retrying = false,
  ...props
}: SubscriptionResolutionPanelProps) {
  return (
    <SubscriptionStatusCard
      className={cn("tcrm-subscription-resolution-panel", className)}
      action={action ?? (
        <Button
          className="tcrm-subscription-status-card__primary-action"
          loading={retrying}
          onClick={onRetry}
          variant="primary"
        >
          Tentar pagamento novamente
        </Button>
      )}
      onRetry={onRetry}
      state="failed"
      {...props}
    />
  );
}

export interface SubscriptionResultHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  state?: "confirmed";
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function SubscriptionResultHeader({
  state = "confirmed",
  title = "Assinatura confirmada",
  description = "Tudo certo. Sua assinatura está ativa e o setup guiado já pode começar.",
  className,
  ...props
}: SubscriptionResultHeaderProps) {
  return (
    <header className={cn("tcrm-subscription-result-header", `tcrm-subscription-result-header--${state}`, className)} data-component="SubscriptionResultHeader" data-state={state} {...props}>
      <span className="tcrm-subscription-result-header__icon" aria-hidden="true">
        <Icon name="check" />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export interface ConfirmedSetupHandoffStep {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface ConfirmedSetupHandoffProps extends Omit<CrmSurfaceProps, "state" | "icon" | "statusLabel" | "meta"> {
  state?: "ready" | "starting" | "blocked";
  steps?: ConfirmedSetupHandoffStep[];
  onStartSetup?: () => void;
  onScheduleHelp?: () => void;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  scheduleLoading?: boolean;
  blockedReason?: string;
  scheduleBlockedReason?: string;
}

const confirmedSetupHandoffSteps: ConfirmedSetupHandoffStep[] = [
  {
    id: "studio-data",
    title: "Preparar dados do studio",
    description: "Dados essenciais para iniciar a configuração."
  },
  {
    id: "channels-operation",
    title: "Configurar canais e operação",
    description: "Canais, planos, alunos, turmas e agenda com orientação."
  },
  {
    id: "review-release",
    title: "Revisar e liberar o CRM",
    description: "Tudo é revisado antes do primeiro uso."
  }
];

export function ConfirmedSetupHandoff({
  className,
  action,
  secondaryAction,
  title = "Setup guiado pela Taliya",
  description = "O agente de configuração vai guiar você passo a passo antes do primeiro uso.",
  state = "ready",
  steps = confirmedSetupHandoffSteps,
  onStartSetup,
  onScheduleHelp,
  loading = false,
  scheduleLoading = false,
  blockedReason,
  scheduleBlockedReason,
  ...props
}: ConfirmedSetupHandoffProps) {
  const headingId = React.useId();
  const isStarting = loading || state === "starting";
  const resolvedBlockedReason = state === "blocked" ? (blockedReason ?? "Setup indisponível no momento") : blockedReason;

  return (
    <Card
      className={cn("tcrm-confirmed-setup-handoff", `tcrm-confirmed-setup-handoff--${state}`, className)}
      {...props}
    >
      <header className="tcrm-confirmed-setup-handoff__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <section className="tcrm-confirmed-setup-handoff__steps" aria-labelledby={headingId}>
        <h3 id={headingId}>Como funciona</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id}>
              <span aria-hidden="true" className="tcrm-confirmed-setup-handoff__step-number">
                {index + 1}
              </span>
              <span className="tcrm-confirmed-setup-handoff__step-copy">
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="tcrm-confirmed-setup-handoff__actions">
        {action ?? (
          <Button
            blockedReason={resolvedBlockedReason}
            className="tcrm-confirmed-setup-handoff__primary"
            loading={isStarting}
            onClick={onStartSetup}
            variant="primary"
          >
            Começar setup guiado
          </Button>
        )}
        {secondaryAction ?? (
          <Button
            blockedReason={scheduleBlockedReason}
            className="tcrm-confirmed-setup-handoff__secondary"
            loading={scheduleLoading}
            onClick={onScheduleHelp}
            variant="secondary"
          >
            Agendar ajuda humana
          </Button>
        )}
      </footer>
    </Card>
  );
}
