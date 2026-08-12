import React from "react";
import { cn, type ComponentTone, type IconName } from "../foundation.js";
import { PersonLabel } from "./identity.js";
import { Button, ButtonGroup, IconButton } from "../primitives/button.js";
import { Chip } from "../primitives/feedback.js";
import { Card, InlineGroup, MetaText } from "../primitives/layout.js";
import { EmptyState, ErrorState, LoadingState } from "./state-list.js";

export type DiffRowStatus = "changed" | "removed" | "added" | "approved" | "rejected";

export interface DiffTableRow {
  id: string;
  label: React.ReactNode;
  before: React.ReactNode;
  after: React.ReactNode;
  status?: DiffRowStatus;
}

export interface DiffTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  rows: DiffTableRow[];
  fieldHeader?: React.ReactNode;
  beforeHeader?: React.ReactNode;
  afterHeader?: React.ReactNode;
  actor?: React.ReactNode;
  actorAvatarSrc?: string;
  actorLabel?: React.ReactNode;
  origin?: React.ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  onRevert?: () => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  showStatusColumn?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const diffToneByStatus: Record<DiffRowStatus, ComponentTone> = {
  changed: "success",
  removed: "danger",
  added: "info",
  approved: "success",
  rejected: "danger"
};

export function DiffTable({
  title,
  meta,
  rows,
  fieldHeader = "Campo",
  beforeHeader = "Valor anterior",
  afterHeader = "Valor novo",
  actor,
  actorAvatarSrc,
  actorLabel,
  origin,
  onApprove,
  onReject,
  onRevert,
  onRowClick,
  compact = false,
  showStatusColumn = false,
  loading = false,
  error,
  className,
  ...props
}: DiffTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar o diff" description={error} />;
  if (loading) return <LoadingState title="Carregando diff" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhuma alteracao encontrada" />;

  return (
    <Card className={cn("tl-diff-table", compact && "tl-diff-table--compact", className)} {...props}>
      {title || meta ? (
        <header className="tl-batch-table__header">
          {title ? <strong>{title}</strong> : null}
          {meta ? <small>{meta}</small> : null}
        </header>
      ) : null}
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">{fieldHeader}</th>
              <th scope="col">{beforeHeader}</th>
              <th scope="col">{afterHeader}</th>
              {showStatusColumn ? <th scope="col">Status</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = row.status ?? "changed";
              return (
                <tr
                  aria-label={onRowClick ? `Abrir alteracao ${row.id}` : undefined}
                  className={cn("tl-diff-table__row", `tl-diff-table__row--${status}`, onRowClick && "tl-table__row--interactive")}
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                  onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                  role={onRowClick ? "button" : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  <td>{row.label}</td>
                  <td>{row.before}</td>
                  <td>{row.after}</td>
                  {showStatusColumn ? (
                    <td>
                      <Chip tone={diffToneByStatus[status]}>{status}</Chip>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(actor || origin || onApprove || onReject || onRevert) ? (
        <footer className="tl-batch-table__footer">
          <InlineGroup>
            {actorLabel ? <MetaText>{actorLabel}</MetaText> : null}
            {actor ? <PersonLabel avatarSrc={actorAvatarSrc} name={String(actor)} /> : null}
            {origin ? <MetaText>{origin}</MetaText> : null}
          </InlineGroup>
          <ButtonGroup align="end">
            {onRevert ? <Button onClick={onRevert} size="sm" variant="secondary">Reverter</Button> : null}
            {onReject ? <Button onClick={onReject} size="sm" variant="ghost">Rejeitar</Button> : null}
            {onApprove ? <Button leadingIcon="check" onClick={onApprove} size="sm" variant="primary">Aprovar</Button> : null}
          </ButtonGroup>
        </footer>
      ) : null}
    </Card>
  );
}

export type PermissionTableState = "allowed" | "blocked" | "request" | "pending";

export interface PermissionTableRow {
  id: string;
  module: React.ReactNode;
  profile: React.ReactNode;
  action: React.ReactNode;
  state: PermissionTableState;
}

export interface PermissionTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: PermissionTableRow[];
  onRequestAccess?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
}

const permissionToneByState: Record<PermissionTableState, ComponentTone> = {
  allowed: "success",
  blocked: "danger",
  request: "info",
  pending: "warning"
};

const permissionLabelByState: Record<PermissionTableState, string> = {
  allowed: "Permitido",
  blocked: "Bloqueado",
  request: "Solicitar acesso",
  pending: "Pendente"
};

const permissionIconByState: Record<PermissionTableState, IconName> = {
  allowed: "check",
  blocked: "alertCircle",
  request: "info",
  pending: "clock"
};

function handleInteractiveRowKeyDown(event: React.KeyboardEvent<HTMLElement>, action: () => void) {
  if (event.currentTarget !== event.target) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  action();
}

export function PermissionTable({ rows, onRequestAccess, onRowClick, compact = false, className, ...props }: PermissionTableProps) {
  return (
    <div className={cn("tl-permission-table", compact && "tl-permission-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Modulo</th>
              <th scope="col">Perfil</th>
              <th scope="col">Acao</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir permissao ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td>{row.module}</td>
                <td>{row.profile}</td>
                <td>{row.action}</td>
                <td className="tl-permission-table__status">
                  {row.state === "request" && onRequestAccess ? (
                    <Button onClick={(event) => { event.stopPropagation(); onRequestAccess(row.id); }} size="sm" variant="secondary">
                      {permissionLabelByState[row.state]}
                    </Button>
                  ) : (
                    <Chip icon={permissionIconByState[row.state]} showDot={false} tone={permissionToneByState[row.state]}>{permissionLabelByState[row.state]}</Chip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type AuditTableStatus = "success" | "pending" | "alert" | "denied";

export interface AuditTableRow {
  id: string;
  actor: string;
  actorAvatarSrc?: string;
  object: React.ReactNode;
  action: React.ReactNode;
  time: React.ReactNode;
  origin: React.ReactNode;
  status: AuditTableStatus;
}

export interface AuditTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  rows: AuditTableRow[];
  onOpenObject?: (rowId: string) => void;
  onRowClick?: (rowId: string) => void;
  compact?: boolean;
  loading?: boolean;
  error?: React.ReactNode;
}

const auditToneByStatus: Record<AuditTableStatus, ComponentTone> = {
  success: "success",
  pending: "info",
  alert: "warning",
  denied: "danger"
};

const auditLabelByStatus: Record<AuditTableStatus, string> = {
  success: "Sucesso",
  pending: "Pendente",
  alert: "Alerta",
  denied: "Negada"
};

export function AuditTable({ rows, onOpenObject, onRowClick, compact = false, loading = false, error, className, ...props }: AuditTableProps) {
  if (error) return <ErrorState title="Nao foi possivel carregar auditoria" description={error} />;
  if (loading) return <LoadingState title="Carregando auditoria" variant="table" />;
  if (rows.length === 0) return <EmptyState title="Nenhum log encontrado" icon="shield" />;

  return (
    <div className={cn("tl-audit-table", compact && "tl-audit-table--compact", className)} {...props}>
      <div className="tl-table-wrap">
        <table className="tl-table tl-table--dense tl-batch-table">
          <thead>
            <tr>
              <th scope="col">Ator</th>
              <th scope="col">Objeto</th>
              <th scope="col">Acao</th>
              <th scope="col">Horario</th>
              <th scope="col">Origem</th>
              <th scope="col">Status</th>
              {onOpenObject ? <th scope="col">Abrir objeto</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                aria-label={onRowClick ? `Abrir auditoria ${row.id}` : undefined}
                className={cn(onRowClick && "tl-table__row--interactive")}
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.id) : undefined}
                onKeyDown={onRowClick ? (event) => handleInteractiveRowKeyDown(event, () => onRowClick(row.id)) : undefined}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                <td><PersonLabel avatarSrc={row.actorAvatarSrc} name={row.actor} /></td>
                <td>{row.object}</td>
                <td>{row.action}</td>
                <td>{row.time}</td>
                <td>{row.origin}</td>
                <td><Chip showDot={false} tone={auditToneByStatus[row.status]}>{auditLabelByStatus[row.status]}</Chip></td>
                {onOpenObject ? (
                  <td className="tl-audit-table__action" onClick={(event) => event.stopPropagation()}>
                    <IconButton icon="externalLink" label={`Abrir ${row.id}`} onClick={() => onOpenObject(row.id)} size="sm" variant="ghost" />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
