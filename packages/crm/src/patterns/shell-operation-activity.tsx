/** Operational activity table pattern. */
import React from "react";
import { Avatar, Button, Chip, EmptyState, InlineAlert, LoadingState, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";

export type OperationActivityTableState = "source" | "loading" | "empty" | "blocked";
export type OperationActivityTableStatus = "assumed" | "resolved" | "blocked" | "waiting";

export interface OperationActivityTableRow {
  id: string;
  time: React.ReactNode;
  actor: string;
  avatarSrc?: string;
  action: React.ReactNode;
  object: React.ReactNode;
  meta: React.ReactNode;
  owner: React.ReactNode;
  status: OperationActivityTableStatus;
  statusLabel: React.ReactNode;
}

export interface OperationActivityTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  viewAllLabel?: React.ReactNode;
  rows?: OperationActivityTableRow[];
  state?: OperationActivityTableState;
  selectedId?: string;
  onRowOpen?: (row: OperationActivityTableRow) => void;
  onViewAll?: () => void;
}

const sourceOperationActivityRows: OperationActivityTableRow[] = [
  { id: "marina-proof", time: "10:24", actor: "Marina Lopes", action: "assumiu a pendência", object: "Comprovante da Marina", meta: "Tarefa · Financeiro", owner: "Recepção", status: "assumed", statusLabel: "Assumido" },
  { id: "sam-pedro", time: "10:12", actor: "Sam Frank", action: "concluiu a pendência", object: "Comprovante do Pedro", meta: "Tarefa · Financeiro", owner: "Recepção", status: "resolved", statusLabel: "Resolvido" },
  { id: "joao-whatsapp", time: "09:48", actor: "João Silva", action: "bloqueou a pendência", object: "WhatsApp com falha de envio", meta: "Tarefa · Sistema", owner: "Suporte", status: "blocked", statusLabel: "Bloqueado" },
  { id: "nikki-julia", time: "09:31", actor: "Nikki Clew", action: "adicionou comentário em", object: "Conversa da Julia aguardando humano", meta: "Tarefa · Inbox", owner: "Atendimento", status: "waiting", statusLabel: "Aguardando" }
];

function operationActivityTone(status: OperationActivityTableStatus): ComponentTone {
  if (status === "resolved") return "success";
  if (status === "blocked") return "danger";
  if (status === "waiting") return "warning";
  return "info";
}

function operationActivityStatusIcon(status: OperationActivityTableStatus): IconName | undefined {
  if (status === "resolved") return "check";
  if (status === "blocked") return "lock";
  if (status === "waiting") return "clock";
  return undefined;
}

export function OperationActivityTable({
  title = "Atividade recente",
  viewAllLabel = "Ver histórico completo",
  rows = sourceOperationActivityRows,
  state = "source",
  selectedId,
  onRowOpen,
  onViewAll,
  className,
  ...props
}: OperationActivityTableProps) {
  const isUnavailable = state === "loading" || state === "blocked";
  const visibleRows = state === "empty" ? [] : rows;

  return (
    <section
      aria-busy={state === "loading" ? true : undefined}
      aria-label={typeof title === "string" ? title : "Atividade recente da operação"}
      className={cn("tcrm-operation-activity-table", state !== "source" && `tcrm-operation-activity-table--${state}`, className)}
      data-component="OperationActivityTable"
      data-state={state}
      {...props}
    >
      <header className="tcrm-operation-activity-table__header">
        <h2>{title}</h2>
        <Button className="tcrm-operation-activity-table__view-all" disabled={isUnavailable} onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">
          {viewAllLabel}
        </Button>
      </header>

      {state === "loading" ? <LoadingState className="tcrm-operation-activity-table__state" title="Carregando atividade" variant="table" /> : null}
      {state === "empty" ? <EmptyState className="tcrm-operation-activity-table__state" icon="clock" title="Nenhuma atividade recente" /> : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-operation-activity-table__state" tone="blocked" title="Atividade bloqueada">
          Permissões ou plano impedem a leitura da atividade operacional.
        </InlineAlert>
      ) : null}

      {state === "source" ? (
        <div className="tcrm-operation-activity-table__rows">
          {visibleRows.map((row) => (
            <PrimitiveButton
              aria-pressed={selectedId === row.id}
              className="tcrm-operation-activity-table__row"
              disabled={isUnavailable}
              key={row.id}
              onClick={() => onRowOpen?.(row)}
              type="button"
            >
              <span className="tcrm-operation-activity-table__time">{row.time}</span>
              <Avatar name={row.actor} size="sm" src={row.avatarSrc} />
              <strong className="tcrm-operation-activity-table__actor">{row.actor}</strong>
              <span className="tcrm-operation-activity-table__action">{row.action}</span>
              <strong className="tcrm-operation-activity-table__object">{row.object}</strong>
              <Chip className="tcrm-operation-activity-table__meta" showDot={false}>{row.meta}</Chip>
              <Chip className="tcrm-operation-activity-table__owner" showDot={false}>{row.owner}</Chip>
              <Chip
                className="tcrm-operation-activity-table__status"
                icon={operationActivityStatusIcon(row.status)}
                showDot={false}
                tone={operationActivityTone(row.status)}
              >
                {row.statusLabel}
              </Chip>
            </PrimitiveButton>
          ))}
        </div>
      ) : null}
    </section>
  );
}
