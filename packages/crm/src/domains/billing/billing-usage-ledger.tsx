/** Subscription workspace foundation. */
import React from "react";
import { Button, Card, Chip, ErrorState, Icon, ListIcon, LoadingState, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { PlanSummaryCard } from "./billing-plan-invoices.js";
import { QuotaProgress } from "./billing-addons-usage-overview.js";


export interface BillingSubscriptionAgent {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export type BillingSubscriptionWorkspaceState = "active" | "failed" | "expired" | "loading" | "blocked";

export interface BillingSubscriptionWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  agents?: BillingSubscriptionAgent[];
  state?: BillingSubscriptionWorkspaceState;
  blockedReason?: string;
  onChangePlan?: () => void;
  onViewPlanDetails?: () => void;
  onOpenAgents?: () => void;
  onViewUsage?: () => void;
  onViewInvoices?: () => void;
  onUpdatePayment?: () => void;
  onViewAddOns?: () => void;
  onSupport?: () => void;
}

const billingSubscriptionAgents: BillingSubscriptionAgent[] = [
  { id: "support", label: "Atendimento", icon: "message" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "sales", label: "Vendas", icon: "trendingUp" },
  { id: "finance", label: "Financeiro", icon: "wallet" },
  { id: "retention", label: "Retenção", icon: "shield" },
  { id: "management", label: "Gestão/Governança", icon: "shieldStar" },
  { id: "history", label: "Histórico/Evolução", icon: "book" }
];

export function BillingSubscriptionWorkspace({
  agents = billingSubscriptionAgents,
  state = "active",
  blockedReason,
  onChangePlan,
  onViewPlanDetails,
  onOpenAgents,
  onViewUsage,
  onViewInvoices,
  onUpdatePayment,
  onViewAddOns,
  onSupport,
  className,
  ...props
}: BillingSubscriptionWorkspaceProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isPaymentIssue = state === "failed" || state === "expired";
  const resolvedBlockedReason = isBlocked ? blockedReason ?? "Assinatura indisponível para esta conta." : undefined;
  const invoiceStatus = state === "failed" ? "Pagamento falhou" : state === "expired" ? "Expirada" : "Em aberto";
  const invoiceTone: ComponentTone = isPaymentIssue ? "danger" : "warning";

  if (isLoading) {
    return (
      <section aria-busy="true" className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
        <LoadingState title="Carregando assinatura" />
      </section>
    );
  }

  if (isBlocked) {
    return (
      <section className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
        <ErrorState description={resolvedBlockedReason} title="Assinatura indisponível" />
      </section>
    );
  }

  return (
    <section className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
      <div className="tcrm-billing-subscription-workspace__main">
        <PlanSummaryCard
          badgeLabel={state === "failed" ? "Pagamento falhou" : state === "expired" ? "Assinatura expirada" : undefined}
          className="tcrm-billing-subscription-workspace__plan"
          onChangePlan={onChangePlan}
          onViewDetails={onViewPlanDetails}
          state={isPaymentIssue ? "failed" : "active"}
          title={state === "failed" ? "Pagamento da assinatura falhou" : state === "expired" ? "Assinatura expirada" : undefined}
        />

        <Card className="tcrm-billing-subscription-workspace__agents">
          <header><small>Agentes inclusos</small><h3>7 de 7 agentes inclusos</h3></header>
          <div role="list">
            {agents.map((agent) => <div key={agent.id} role="listitem"><ListIcon icon={agent.icon} tone="info" /><span>{agent.label}</span></div>)}
          </div>
          <Button disabled={isPaymentIssue} onClick={onOpenAgents} variant="secondary">Abrir Agentes</Button>
        </Card>

        <div className="tcrm-billing-subscription-workspace__billing">
          <QuotaProgress
            addOnsLabel=""
            alertLabel="Uso detalhado fica em Uso e cotas."
            className="tcrm-billing-subscription-workspace__quota"
            ledgerLabel="Ver uso e cotas"
            disabled={isPaymentIssue}
            onViewLedger={onViewUsage}
          />
          <Card className="tcrm-billing-subscription-workspace__invoice">
            <small>Próxima fatura</small>
            <h3>R$ 799,00</h3>
            <div><span>{state === "expired" ? "Venceu em 12/06" : "Vence em 12/06"}</span><Chip showDot={false} tone={invoiceTone}>{invoiceStatus}</Chip></div>
            <p><Icon name="creditCard" /> Cartão final 4242</p>
            <footer><Button onClick={onViewInvoices} size="sm" variant="secondary">Ver faturas</Button><Button onClick={onUpdatePayment} size="sm" variant={isPaymentIssue ? "primary" : "secondary"}>Atualizar pagamento</Button></footer>
          </Card>
        </div>
      </div>

      <Card className="tcrm-billing-subscription-workspace__addons">
        <small>Add-ons ativos</small>
        <div><ListIcon icon="shoppingCart" tone="info" /><span><strong>Nenhum add-on ativo</strong><small>Pacotes extras aparecem aqui quando contratados.</small></span></div>
        <Button disabled={isPaymentIssue} onClick={onViewAddOns} variant="secondary">Ver add-ons</Button>
      </Card>

      <Card className="tcrm-billing-subscription-workspace__actions">
        <Button onClick={onViewInvoices} variant="primary">Ver faturas</Button>
        <Button onClick={onViewUsage} variant="secondary">Ver uso e cotas</Button>
        <Button onClick={onSupport} variant="secondary">Falar com suporte</Button>
      </Card>
    </section>
  );
}


export * from "./billing-usage-ledger-table.js";


export * from "./billing-usage-ledger-table.js";
