/** Audit trail pattern. */
import React from "react";
import { AuditTable, Button, EmptyState, ErrorState, InlineAlert, LoadingState, cn } from "@taliya/ui";
import type { AuditTableRow } from "@taliya/ui";

export type AuditTrailState = "source" | "filtered" | "sensitive" | "loading" | "empty" | "error" | "blocked";

export interface AuditTrailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  rows?: AuditTableRow[];
  state?: AuditTrailState;
  title?: React.ReactNode;
  footerLabel?: React.ReactNode;
  onOpenObject?: (row: AuditTableRow) => void;
  onRowClick?: (row: AuditTableRow) => void;
  onViewAll?: () => void;
}

const auditTrailSourceRows: AuditTableRow[] = [
  { id: "cs-1043", actor: "Sam Frank", object: "#CS-1043", action: "Atualizou plano", time: "28/04/2024   10:24", origin: "Web", status: "success" },
  { id: "us-2087", actor: "Nikki Olaw", object: "#US-2087", action: "Alterou limite", time: "28/04/2024   09:18", origin: "API", status: "success" },
  { id: "in-3021", actor: "Maria Lopes", object: "#IN-3021", action: "Revisou fatura", time: "27/04/2024   16:41", origin: "Web", status: "success" },
  { id: "cs-1039", actor: "Joao Silva", object: "#CS-1039", action: "Aprovou desconto", time: "27/04/2024   14:12", origin: "Mobile", status: "success" },
  { id: "cs-1022", actor: "Carlos Lima", object: "#CS-1022", action: "Removeu usuario", time: "27/04/2024   11:02", origin: "Sistema", status: "alert" }
];

function auditTrailRowsForState(state: AuditTrailState, rows?: AuditTableRow[]) {
  if (rows) return rows;
  if (state === "filtered") return auditTrailSourceRows.slice(0, 3);
  if (state === "sensitive") {
    return auditTrailSourceRows.map((row, index) => index === 4 ? { ...row, status: "denied" as const, action: "Tentou remover usuario" } : row);
  }
  return auditTrailSourceRows;
}

export function AuditTrail({
  rows,
  state = "source",
  title = "Log detalhado / auditoria",
  footerLabel = "Ver auditoria completa",
  onOpenObject,
  onRowClick,
  onViewAll,
  className,
  ...props
}: AuditTrailProps) {
  const visibleRows = auditTrailRowsForState(state, rows);
  const isUnavailable = state === "loading" || state === "blocked" || state === "error";
  const findRow = (rowId: string) => visibleRows.find((row) => row.id === rowId);
  const handleOpenObject = (rowId: string) => {
    const row = findRow(rowId);
    if (row) onOpenObject?.(row);
  };
  const handleRowClick = onRowClick
    ? (rowId: string) => {
        const row = findRow(rowId);
        if (row) onRowClick(row);
      }
    : undefined;

  return (
    <section
      className={cn("tcrm-audit-trail", `tcrm-audit-trail--${state}`, className)}
      data-component="AuditTrail"
      {...props}
    >
      <h2 className="tcrm-audit-trail__title">9. {title}</h2>
      {state === "loading" ? (
        <LoadingState aria-busy className="tcrm-audit-trail__state" title="Carregando auditoria" variant="table" />
      ) : null}
      {state === "empty" ? (
        <EmptyState className="tcrm-audit-trail__state" icon="shield" title="Nenhum log encontrado" />
      ) : null}
      {state === "error" ? (
        <ErrorState className="tcrm-audit-trail__state" description="Tente novamente ou acione suporte." title="Nao foi possivel carregar auditoria" />
      ) : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-audit-trail__state" tone="blocked" title="Auditoria bloqueada">
          Permissoes sensiveis impedem a leitura deste log.
        </InlineAlert>
      ) : null}
      {state === "source" || state === "filtered" || state === "sensitive" ? (
        <>
          <AuditTable
            className="tcrm-audit-trail__table"
            compact
            onOpenObject={handleOpenObject}
            onRowClick={handleRowClick}
            rows={visibleRows}
          />
          <Button className="tcrm-audit-trail__footer" disabled={isUnavailable} onClick={onViewAll} trailingIcon="arrowRight" variant="ghost">
            <span>{footerLabel}</span>
          </Button>
        </>
      ) : null}
    </section>
  );
}
