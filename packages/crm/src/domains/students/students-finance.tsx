/** Finance priority and payment queue compositions. */
import React from "react";
import {
  Badge,
  Card,
  Icon,
  IconButton,
  Panel,
  PanelHeader,
  EmptyState,
  PrimitiveButton,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { KanbanCard } from "../../patterns/shell.js";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { stateKey } from "./students-utilities.js";

export interface PaymentCaseItem {
  id: string;
  payer: React.ReactNode;
  amount: React.ReactNode;
  due: React.ReactNode;
  method: React.ReactNode;
}

export type FinancePriorityTone = "danger" | "info" | "warning";
export type FinancePriorityPanelState = "source" | "loading" | "empty" | "blocked";

export interface FinancePriorityItem {
  id: string;
  title: React.ReactNode;
  amount: React.ReactNode;
  meta: React.ReactNode;
  icon?: IconName;
  tone?: FinancePriorityTone;
  disabled?: boolean;
}

const defaultFinancePriorityItems: FinancePriorityItem[] = [
  {
    id: "overdue",
    title: "9 cobrancas atrasadas",
    amount: "R$ 3.870,00",
    meta: "mensalidades e planos · responsavel Financeiro",
    icon: "alert",
    tone: "danger"
  },
  {
    id: "reconciliation",
    title: "5 comprovantes aguardando conciliacao",
    amount: "R$ 2.140,00",
    meta: "Pix e importacao · responsavel Mariana",
    icon: "clock",
    tone: "info"
  },
  {
    id: "exceptions",
    title: "3 excecoes financeiras precisam revisao",
    amount: "R$ 3.320,00",
    meta: "desconto, renegociacao e cancelamento · responsavel Coordenacao",
    icon: "folder",
    tone: "warning"
  }
];

export function FinancePriorityPanel({
  title = "Prioridades financeiras",
  items = defaultFinancePriorityItems,
  selectedId,
  state = "source",
  onSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  title?: React.ReactNode;
  items?: FinancePriorityItem[];
  selectedId?: string;
  state?: FinancePriorityPanelState;
  onSelect?: (item: FinancePriorityItem) => void;
}) {
  const disabled = state === "loading" || state === "blocked";
  const rows = state === "empty" ? [] : items;

  return (
    <Panel
      {...props}
      aria-busy={state === "loading" ? true : undefined}
      className={cn("tcrm-finance-priority-panel", className)}
      data-component="FinancePriorityPanel"
      data-state={state}
      variant="crm"
    >
      <PanelHeader compact headingLevel={2} title={title} />
      {rows.length ? (
        <div className="tcrm-finance-priority-panel__list" role="list">
          {rows.map((item) => {
            const tone = item.tone ?? "info";
            const rowDisabled = disabled || item.disabled;

            return (
              <PrimitiveButton
                aria-pressed={selectedId === item.id}
                className={cn("tcrm-finance-priority-panel__row", selectedId === item.id && "is-selected")}
                data-tone={tone}
                disabled={rowDisabled}
                key={item.id}
                onClick={() => onSelect?.(item)}
                type="button"
              >
                <span className="tcrm-finance-priority-panel__icon">
                  <Icon name={item.icon ?? "info"} size="md" tone={tone} />
                </span>
                <strong>{item.title}</strong>
                <b>{item.amount}</b>
                <small>{item.meta}</small>
                <Icon name="chevronRight" size="sm" tone="current" />
              </PrimitiveButton>
            );
          })}
        </div>
      ) : (
        <EmptyState description="Nenhuma prioridade financeira no momento." title="Sem prioridades" />
      )}
    </Panel>
  );
}

const paymentCaseConfig = {
  due: { title: "1. A vencer", icon: "calendar", total: "R$ 1.610,00", tone: "success" },
  today: { title: "2. Vencem hoje", icon: "clock", total: "R$ 1.610,00", tone: "info" },
  paid: { title: "3. Pagos recentes", icon: "checkCircle", total: "R$ 1.610,00", tone: "success" },
  overdue: { title: "4. Atrasados", icon: "alertCircle", total: "R$ 1.610,00", tone: "danger" },
  failed: { title: "5. Falhas de pagamento", icon: "alertCircle", total: "R$ 1.610,00", tone: "warning" },
  reconciliation: { title: "6. Conciliacao pendente", icon: "clock", total: "R$ 1.610,00", tone: "warning" },
  promise: { title: "7. Promessas de pagamento", icon: "messageMore", total: "R$ 1.610,00", tone: "warning" },
  exception: { title: "8. Excecoes financeiras", icon: "clipboard", total: "R$ 3.320,00", tone: "info" }
} satisfies Record<string, { title: string; icon: IconName; total: string; tone: ComponentTone }>;

const defaultPaymentCaseItems: Record<string, PaymentCaseItem[]> = {
  due: [
    { id: "fernanda", payer: "Fernanda Lima", amount: "R$ 420,00", due: "vence 14/05", method: "mensalidade" },
    { id: "rafael", payer: "Rafael Martins", amount: "R$ 980,00", due: "vence 15/05", method: "plano trimestral" },
    { id: "bianca", payer: "Bianca Oliveira", amount: "R$ 210,00", due: "vence 16/05", method: "aula avulsa" }
  ],
  today: [
    { id: "camila", payer: "Camila Souza", amount: "R$ 420,00", due: "vence hoje 18:00", method: "Pix" },
    { id: "lucas", payer: "Lucas Ferreira", amount: "R$ 980,00", due: "vence hoje 20:00", method: "plano trimestral" },
    { id: "marina", payer: "Marina Costa", amount: "R$ 210,00", due: "vence hoje 21:00", method: "mensalidade" }
  ],
  paid: [
    { id: "juliana", payer: "Juliana Rocha", amount: "R$ 420,00", due: "pago hoje 09:12", method: "Pix" },
    { id: "thiago", payer: "Thiago Alves", amount: "R$ 980,00", due: "pago hoje 10:45", method: "cartao" },
    { id: "patricia", payer: "Patricia Nunes", amount: "R$ 210,00", due: "pago ontem 16:22", method: "WhatsApp" }
  ],
  overdue: [
    { id: "gabriela", payer: "Gabriela Lima", amount: "R$ 420,00", due: "2 dias em atraso", method: "mensalidade" },
    { id: "eduardo", payer: "Eduardo Santos", amount: "R$ 210,00", due: "5 dias em atraso", method: "Pix" },
    { id: "isabela", payer: "Isabela Prado", amount: "R$ 980,00", due: "7 dias em atraso", method: "plano trimestral" }
  ],
  failed: [
    { id: "bruno", payer: "Bruno Mendes", amount: "R$ 420,00", due: "cartao recusado", method: "cartao" },
    { id: "carolina", payer: "Carolina Dias", amount: "R$ 980,00", due: "limite insuficiente", method: "cartao" },
    { id: "joao", payer: "Joao Victor", amount: "R$ 210,00", due: "Pix expirado", method: "WhatsApp" }
  ],
  reconciliation: [
    { id: "ana", payer: "Ana Paula Martins", amount: "R$ 420,00", due: "comprovante enviado 09:45", method: "Pix" },
    { id: "gustavo", payer: "Gustavo Lima", amount: "R$ 980,00", due: "aguardando baixa", method: "importacao" },
    { id: "beatriz", payer: "Marina Beatriz", amount: "R$ 210,00", due: "envio manual", method: "agente" }
  ],
  promise: [
    { id: "felipe", payer: "Felipe Costa", amount: "R$ 420,00", due: "prometido para 15/05", method: "WhatsApp" },
    { id: "renata", payer: "Renata Alves", amount: "R$ 980,00", due: "prometido para 16/05", method: "agente" },
    { id: "diego", payer: "Diego Ramos", amount: "R$ 210,00", due: "prometido para 17/05", method: "mensalidade" }
  ],
  exception: [
    { id: "carla", payer: "Carla Nunes", amount: "R$ 120,00", due: "desconto fora da politica", method: "agente" },
    { id: "roberto", payer: "Roberto Lima", amount: "R$ 2.360,00", due: "renegociacao manual", method: "importacao" },
    { id: "silvia", payer: "Silvia Prado", amount: "R$ 840,00", due: "cancelar cobranca recorrente", method: "WhatsApp" }
  ]
};

export function PaymentCaseCard({
  title,
  amount,
  total,
  state = "due",
  count = 3,
  items,
  onOpen,
  onMenu,
  onViewAll,
  className
}: CrmSurfaceProps & {
  amount?: React.ReactNode;
  total?: React.ReactNode;
  count?: number;
  items?: PaymentCaseItem[];
  onOpen?: (caseId: string) => void;
  onMenu?: () => void;
  onViewAll?: () => void;
}) {
  const key = stateKey(state) || "due";
  const config = paymentCaseConfig[key as keyof typeof paymentCaseConfig] ?? paymentCaseConfig.due;
  const rows = items ?? defaultPaymentCaseItems[key] ?? defaultPaymentCaseItems.due ?? [];
  const heading = title ?? config.title;
  const displayedTotal = total ?? amount ?? config.total;

  return (
    <Card className={cn("tcrm-payment-case-card", `tcrm-payment-case-card--${key}`, className)} data-state={key}>
      <header className="tcrm-payment-case-card__header">
        <span className="tcrm-payment-case-card__icon">
          <Icon name={config.icon} size="md" tone={config.tone} />
        </span>
        <span className="tcrm-payment-case-card__title">
          <strong>{heading}</strong>
          <Badge tone="neutral" variant="count">{count}</Badge>
        </span>
        <b>{displayedTotal}</b>
        {onMenu ? <IconButton icon="more" label={`Mais acoes da fila ${String(heading)}`} onClick={onMenu} size="sm" variant="ghost" /> : null}
      </header>
      <div className="tcrm-payment-case-card__rows" role="list">
        {rows.map((item) => (
          <PrimitiveButton
            aria-label={`Abrir cobranca de ${String(item.payer)}`}
            className="tcrm-payment-case-card__row"
            key={item.id}
            onClick={() => onOpen?.(item.id)}
            type="button"
          >
            <strong>{item.payer}</strong>
            <span>{item.amount}</span>
            <small>{item.due}</small>
            <small>{item.method}</small>
            <Icon name="chevronRight" size="sm" />
          </PrimitiveButton>
        ))}
      </div>
      <PrimitiveButton className="tcrm-payment-case-card__footer" onClick={() => onViewAll?.()} type="button">
        Ver todos
      </PrimitiveButton>
    </Card>
  );
}

const financeKanbanStateLabel: Record<string, string> = {
  scheduled: "Agendado",
  today: "Hoje",
  overdue: "Atrasado",
  promise: "Prometido",
  validation: "Aguardando validacao",
  reconciliation: "Em conciliacao",
  resolved: "Resolvido"
};

export function FinanceKanbanCard({
  title = "Fernanda Lima",
  amount = "R$ 420,00",
  state = "scheduled",
  due = "vence 14/05",
  method = "mensalidade",
  owner = "Financeiro",
  onSelect,
  onMenu,
  selected,
  className
}: CrmSurfaceProps & {
  amount?: React.ReactNode;
  due?: React.ReactNode;
  method?: React.ReactNode;
  owner?: React.ReactNode;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const key = stateKey(state);
  return (
    <KanbanCard
      className={cn("tcrm-finance-kanban-card", className)}
      impact={amount}
      layout="finance"
      meta={<>{due} <span aria-hidden="true">·</span> {method}</>}
      onMenu={onMenu}
      menuIcon="moreVertical"
      onSelect={onSelect}
      owner={owner}
      selected={selected}
      state={state}
      stateLabel={financeKanbanStateLabel[key] ?? state}
      title={title}
    />
  );
}
