/** Invoice and billing-invoice workspace surfaces. */
import React from "react";
import { Button, ButtonGroup, Card, Chip, DataTable, EmptyState, Icon, ListIcon, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { toneForState } from "./billing-utilities.js";

export type InvoiceStatus = "paid" | "pending" | "open" | "failed";

export interface InvoiceRow {
  id: string;
  period?: React.ReactNode;
  invoice?: React.ReactNode;
  dueDate?: React.ReactNode;
  due?: React.ReactNode;
  amount: React.ReactNode;
  status: InvoiceStatus;
  method?: React.ReactNode;
}

export interface InvoiceTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  blockedReason?: string;
  onRowClick?: (row: InvoiceRow) => void;
  onOpen?: (row: InvoiceRow) => void;
  onDownload?: (row: InvoiceRow) => void;
  onRetry?: (row: InvoiceRow) => void;
}

const defaultInvoiceRows: InvoiceRow[] = [
  { id: "jun-2026", period: "Junho/2026", dueDate: "12/06", amount: "R$ 799,00", status: "pending", method: "Cartão 4242" },
  { id: "mai-2026", period: "Maio/2026", dueDate: "12/05", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "abr-2026", period: "Abril/2026", dueDate: "12/04", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "mar-2026", period: "Março/2026", dueDate: "12/03", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" }
];

const invoiceStatusLabelByStatus: Record<InvoiceStatus, string> = {
  failed: "Falhou",
  open: "Em aberto",
  paid: "Paga",
  pending: "Em aberto"
};

function invoiceRowPeriod(row: InvoiceRow) {
  return row.period ?? row.invoice ?? row.id;
}

function invoiceRowDue(row: InvoiceRow) {
  return row.dueDate ?? row.due ?? "";
}

function invoiceRowAccessibleName(row: InvoiceRow) {
  const label = invoiceRowPeriod(row);
  return typeof label === "string" || typeof label === "number" ? String(label) : row.id;
}

export function InvoiceTable({
  title = "Histórico de faturas",
  rows = defaultInvoiceRows,
  onRowClick,
  onOpen,
  onDownload,
  onRetry,
  loading = false,
  error,
  emptyState,
  blockedReason,
  className,
  ...props
}: InvoiceTableProps) {
  const titleId = React.useId();

  return (
    <Card aria-labelledby={titleId} className={cn("tcrm-invoice-table-card", className)} {...props}>
      <h2 id={titleId}>{title}</h2>
      <DataTable
        className="tcrm-invoice-table"
        columns={[
          { key: "period", header: "Período", render: invoiceRowPeriod },
          { key: "dueDate", header: "Vencimento", render: invoiceRowDue },
          { key: "amount", header: "Valor" },
          {
            key: "status",
            header: "Status",
            render: (row: InvoiceRow) => (
              <Chip className={cn("tcrm-invoice-table__status", `tcrm-invoice-table__status--${row.status}`)} showDot={false} tone={toneForState(row.status)}>
                {invoiceStatusLabelByStatus[row.status]}
              </Chip>
            )
          },
          { key: "method", header: "Método" },
          {
            key: "actions",
            header: "Ações",
            render: (row: InvoiceRow) => {
              const invoiceName = invoiceRowAccessibleName(row);
              return (
                <ButtonGroup className="tcrm-invoice-table__actions" onClick={(event) => event.stopPropagation()}>
                  <Button
                    aria-label={`Abrir fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--open"
                    leadingIcon="fileText"
                    onClick={() => onOpen?.(row)}
                    size="sm"
                    variant="secondary"
                  >
                    Abrir
                  </Button>
                  <Button
                    aria-label={`Baixar fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--download"
                    leadingIcon="download"
                    onClick={() => (row.status === "failed" && onRetry ? onRetry(row) : onDownload?.(row))}
                    size="sm"
                    variant="secondary"
                  >
                    Baixar
                  </Button>
                </ButtonGroup>
              );
            }
          }
        ]}
        density="dense"
        emptyState={emptyState ?? <EmptyState title="Nenhuma fatura encontrada" />}
        error={error}
        loading={loading}
        onRowClick={onRowClick}
        rows={rows}
      />
    </Card>
  );
}

export interface BillingInvoiceEntitlement {
  id: string;
  icon: IconName;
  label: React.ReactNode;
}

export interface BillingInvoicesWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  currentTitle?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  dueLabel?: React.ReactNode;
  periodLabel?: React.ReactNode;
  methodLabel?: React.ReactNode;
  entitlements?: BillingInvoiceEntitlement[];
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onPayCurrent?: () => void;
  onOpenCurrent?: () => void;
  onDownloadCurrent?: () => void;
  onRowClick?: (row: InvoiceRow) => void;
  onOpenInvoice?: (row: InvoiceRow) => void;
  onDownloadInvoice?: (row: InvoiceRow) => void;
  onRetryInvoice?: (row: InvoiceRow) => void;
}

const billingInvoiceEntitlements: BillingInvoiceEntitlement[] = [
  { id: "plan", icon: "users", label: "Plano 7 agentes" },
  { id: "messages", icon: "message", label: "15.000 mensagens/mês" },
  { id: "support", icon: "headphones", label: "Suporte Taliya" }
];

export function BillingInvoicesWorkspace({
  currentTitle = "Fatura atual",
  amount = "R$ 799,00",
  statusLabel = "Em aberto",
  dueLabel = "Vence em 12/06",
  periodLabel = "Período: Junho/2026",
  methodLabel = "Método: Cartão final 4242",
  entitlements = billingInvoiceEntitlements,
  rows,
  loading = false,
  error,
  blockedReason,
  onPayCurrent,
  onOpenCurrent,
  onDownloadCurrent,
  onRowClick,
  onOpenInvoice,
  onDownloadInvoice,
  onRetryInvoice,
  className,
  ...props
}: BillingInvoicesWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-invoices-workspace", className)} data-component="BillingInvoicesWorkspace" {...props}>
      <Card className="tcrm-billing-invoices-workspace__current">
        <header>
          <small>{currentTitle}</small>
          <div><strong>{amount}</strong><Chip showDot={false} tone="warning">{statusLabel}</Chip></div>
        </header>

        <div className="tcrm-billing-invoices-workspace__facts">
          <span><Icon name="calendar" />{dueLabel}</span>
          <span><Icon name="calendar" />{periodLabel}</span>
          <span><Icon name="creditCard" />{methodLabel}</span>
        </div>

        <div className="tcrm-billing-invoices-workspace__entitlements" role="list">
          {entitlements.map((entitlement) => (
            <div key={entitlement.id} role="listitem">
              <ListIcon icon={entitlement.icon} tone="info" />
              <span>{entitlement.label}</span>
            </div>
          ))}
        </div>

        <footer>
          <Button blockedReason={blockedReason} loading={loading} onClick={onPayCurrent} variant="primary">Pagar agora</Button>
          <Button blockedReason={blockedReason} leadingIcon="fileText" onClick={onOpenCurrent} variant="secondary">Abrir fatura</Button>
          <Button blockedReason={blockedReason} leadingIcon="download" onClick={onDownloadCurrent} variant="secondary">Baixar PDF</Button>
        </footer>
      </Card>

      <InvoiceTable
        blockedReason={blockedReason}
        error={error}
        loading={loading}
        onDownload={onDownloadInvoice}
        onOpen={onOpenInvoice}
        onRetry={onRetryInvoice}
        onRowClick={onRowClick}
        rows={rows}
      />
    </section>
  );
}
