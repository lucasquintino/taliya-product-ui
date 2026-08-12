/** Usage overview workspace. */
import React from "react";
import { Button, Card, ErrorState, ListIcon, LoadingState, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { UsageOriginRow } from "../../patterns/payment-usage-export.js";
import type { UsageOriginRowOrigin, UsageOriginRowState } from "../../patterns/payment-usage-export.js";
import { QuotaProgress } from "./billing-addons-usage-overview.js";
import type { QuotaProgressProps } from "./billing-addons-usage-overview.js";

export interface UsageOverviewOrigin {
  id: string;
  origin: UsageOriginRowOrigin;
  title?: React.ReactNode;
  amount?: React.ReactNode;
  percent?: number;
  visualPercent?: number;
  icon?: IconName;
}

export interface UsageOverviewStatusItem {
  id: string;
  title: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface UsageOverviewWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  quota?: Omit<QuotaProgressProps, "onAction" | "onViewLedger" | "onViewAddOns">;
  origins?: UsageOverviewOrigin[];
  alerts?: UsageOverviewStatusItem[];
  affected?: UsageOverviewStatusItem[];
  originFooter?: React.ReactNode;
  flowsLabel?: React.ReactNode;
  loading?: boolean;
  error?: string;
  blockedReason?: string;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
  onOriginSelect?: (origin: UsageOriginRowOrigin, state: UsageOriginRowState) => void;
  onViewFlows?: () => void;
}

const usageOverviewOrigins: UsageOverviewOrigin[] = [
  { id: "attendance", origin: "attendance" },
  { id: "agenda", origin: "agenda" },
  { id: "sales", origin: "sales" },
  { id: "finance", origin: "finance" },
  { id: "other", origin: "other" }
];

const usageOverviewAlerts: UsageOverviewStatusItem[] = [
  { id: "clear", title: "Nenhum alerta crítico", icon: "checkCircle", tone: "success" },
  { id: "economy", title: "Economia entra automaticamente em 90%.", icon: "percent", tone: "info" },
  { id: "pause", title: <>Automação paga pausa em 100%;<br />CRM manual continua.</>, icon: "pause", tone: "info" }
];

const usageOverviewAffected: UsageOverviewStatusItem[] = [
  { id: "flows", title: "Nenhum fluxo pausado por cota", icon: "checkCircle", tone: "success" },
  { id: "downgrade", title: "Nenhum downgrade ativo", icon: "checkCircle", tone: "success" }
];

function UsageOverviewStatusRows({ items }: { items: UsageOverviewStatusItem[] }) {
  return (
    <div className="tcrm-usage-overview-workspace__status-rows" role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <ListIcon icon={item.icon ?? "checkCircle"} tone={item.tone ?? "info"} />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export function UsageOverviewWorkspace({
  quota,
  origins = usageOverviewOrigins,
  alerts = usageOverviewAlerts,
  affected = usageOverviewAffected,
  originFooter = "Distribuição do uso no ciclo atual.",
  flowsLabel = "Ver fluxos",
  loading = false,
  error,
  blockedReason,
  onViewLedger,
  onViewAddOns,
  onOriginSelect,
  onViewFlows,
  className,
  ...props
}: UsageOverviewWorkspaceProps) {
  const blocked = Boolean(blockedReason);

  if (error) {
    return (
      <section className={cn("tcrm-usage-overview-workspace", className)} data-component="UsageOverviewWorkspace" {...props}>
        <ErrorState className="tcrm-usage-overview-workspace__state" description={error} title="Não foi possível carregar o uso" />
      </section>
    );
  }

  return (
    <section
      aria-busy={loading || undefined}
      className={cn("tcrm-usage-overview-workspace", className)}
      data-component="UsageOverviewWorkspace"
      data-state={blocked ? "blocked" : loading ? "loading" : "source"}
      {...props}
    >
      <QuotaProgress
        {...quota}
        blockedReason={blockedReason ?? quota?.blockedReason}
        disabled={blocked || quota?.disabled}
        loading={loading ? true : quota?.loading}
        onViewAddOns={onViewAddOns}
        onViewLedger={onViewLedger}
      />

      <div className="tcrm-usage-overview-workspace__lower">
        <Card className="tcrm-usage-overview-workspace__origins">
          <h2>Origem do consumo</h2>
          {loading ? (
            <LoadingState title="Carregando origens" />
          ) : (
            <div className="tcrm-usage-overview-workspace__origin-rows">
              {origins.map((item) => (
                <UsageOriginRow
                  key={item.id}
                  amount={item.amount}
                  icon={item.icon}
                  onSelect={onOriginSelect}
                  origin={item.origin}
                  percent={item.percent}
                  state={blocked ? "blocked" : "source"}
                  title={item.title}
                  visualPercent={item.visualPercent}
                />
              ))}
            </div>
          )}
          <p>{originFooter}</p>
        </Card>

        <div className="tcrm-usage-overview-workspace__status-stack">
          <Card className="tcrm-usage-overview-workspace__alerts">
            <h2>Alertas e economia</h2>
            {loading ? <LoadingState title="Carregando alertas" /> : <UsageOverviewStatusRows items={alerts} />}
          </Card>
          <Card className="tcrm-usage-overview-workspace__affected">
            <h2>O que foi afetado</h2>
            {loading ? <LoadingState title="Carregando impactos" /> : <UsageOverviewStatusRows items={affected} />}
            <Button blockedReason={blockedReason} disabled={blocked || loading} onClick={onViewFlows} variant="secondary">{flowsLabel}</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
