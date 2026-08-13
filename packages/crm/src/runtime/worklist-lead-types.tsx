/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Chip, DataTable, EmptyState, InlineAlert, LoadingState, Panel, TablePagination, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

import { LeadTableState } from "./worklist-task.js";

export type LeadTableColumnKey = "lead" | "origin" | "stage" | "fit" | "priority" | "interest" | "quality" | "nextAction" | "humanMode" | "lastActivity" | "owner";

export interface LeadTableRow {
    id: string;
    lead: React.ReactNode;
    studio?: React.ReactNode;
    origin: React.ReactNode;
    stage: React.ReactNode;
    fit: React.ReactNode;
    fitTone?: ComponentTone;
    priority: React.ReactNode;
    priorityTone?: ComponentTone;
    interest: React.ReactNode;
    quality: React.ReactNode;
    qualityTone?: ComponentTone;
    nextAction: React.ReactNode;
    nextActionTone?: ComponentTone;
    humanMode: React.ReactNode;
    lastActivity: React.ReactNode;
    owner: React.ReactNode;
    sortValues?: Partial<Record<LeadTableColumnKey, string | number>>;
    selected?: boolean;
    disabled?: boolean;
}

export interface LeadTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: LeadTableState;
    rows?: LeadTableRow[];
    pageLabel?: React.ReactNode;
    page?: number;
    pageCount?: number;
    itemsPerPage?: React.ReactNode;
    totalLabel?: React.ReactNode;
    onRowSelect?: (row: LeadTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
    onPageChange?: (page: number) => void;
}

function leadTableSortValue(row: LeadTableRow, key: string) {
    const columnKey = key as LeadTableColumnKey;
    const explicitValue = row.sortValues?.[columnKey];
    if (explicitValue != null)
        return String(explicitValue);
    const value = row[columnKey as keyof LeadTableRow];
    if (typeof value === "string" || typeof value === "number")
        return String(value);
    return "";
}

const sourceLeadTableRows: LeadTableRow[] = [
    {
        id: "lead-ana",
        lead: "Ana Silva",
        studio: "Studio Vila Mariana",
        origin: "WhatsApp",
        stage: "Novo",
        fit: "Alto",
        fitTone: "success",
        priority: "Alta",
        priorityTone: "danger",
        interest: "Busca pilates duas vezes por semana",
        quality: "Aprovado",
        qualityTone: "success",
        nextAction: "Responder hoje",
        nextActionTone: "warning",
        humanMode: "Humano",
        lastActivity: "Hoje, 09:12",
        owner: "Recepcao"
    },
    {
        id: "lead-marina",
        lead: "Marina Costa",
        studio: "Studio Moema",
        origin: "Landing",
        stage: "Experimental",
        fit: "Medio",
        fitTone: "warning",
        priority: "Media",
        priorityTone: "warning",
        interest: "Quer reposicao por dor lombar",
        quality: "Revisar",
        qualityTone: "warning",
        nextAction: "Agendar experimental",
        nextActionTone: "info",
        humanMode: "IA com revisao",
        lastActivity: "Ontem, 17:40",
        owner: "Sam"
    }
];

export function LeadTable({ className, state = "source", rows = sourceLeadTableRows, pageLabel, page = 1, pageCount = 1, itemsPerPage = "10", totalLabel, onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, onPageChange, ...props }: LeadTableProps) {
    const isLoading = state === "loading";
    const isBlocked = state === "blocked";
    const [sort, setSort] = React.useState<{
        key: string;
        direction: "ascending" | "descending";
    } | undefined>();
    const tableRows = React.useMemo(() => {
        const sourceRows = state === "empty" ? [] : rows;
        if (!sort)
            return sourceRows;
        return [...sourceRows].sort((first, second) => {
            const result = leadTableSortValue(first, sort.key).localeCompare(leadTableSortValue(second, sort.key), "pt-BR", {
                numeric: true,
                sensitivity: "base"
            });
            return sort.direction === "ascending" ? result : result * -1;
        });
    }, [rows, sort, state]);
    const controlsDisabled = isLoading || isBlocked;
    const resolvedPageLabel = pageLabel ?? `${tableRows.length} leads`;
    return (<Panel aria-busy={isLoading || undefined} aria-label="Tabela de leads" className={cn("tcrm-lead-table", className)} data-component="LeadTable" data-state={state} {...props}>
      {isLoading ? (<LoadingState title="Carregando leads" variant="skeleton"/>) : tableRows.length > 0 ? (<>
          <DataTable className="tcrm-lead-table__data" columns={[
                {
                    key: "lead",
                    header: "Lead / studio",
                    sortable: true,
                    render: (row) => (<span className={cn("tcrm-lead-table__lead-cell", row.selected && "is-selected")}>
                    <strong className="tcrm-lead-table__lead">{row.lead}</strong>
                    {row.studio ? <span>{row.studio}</span> : null}
                  </span>)
                },
                { key: "origin", header: "Origem", sortable: true },
                { key: "stage", header: "Etapa", sortable: true, render: (row) => <Chip showDot={false}>{row.stage}</Chip> },
                { key: "fit", header: "Fit", sortable: true, render: (row) => <Chip showDot={false} tone={row.fitTone ?? "neutral"}>{row.fit}</Chip> },
                {
                    key: "priority",
                    header: "Prioridade",
                    sortable: true,
                    render: (row) => <Chip showDot={false} tone={row.priorityTone ?? "neutral"}>{row.priority}</Chip>
                },
                { key: "interest", header: "Dor / interesse", sortable: true, render: (row) => <span className="tcrm-lead-table__muted-cell">{row.interest}</span> },
                {
                    key: "quality",
                    header: "Qualidade",
                    sortable: true,
                    render: (row) => <Chip showDot={false} tone={row.qualityTone ?? "neutral"}>{row.quality}</Chip>
                },
                {
                    key: "nextAction",
                    header: "Proxima acao",
                    sortable: true,
                    render: (row) => <Chip showDot={false} tone={row.nextActionTone ?? "neutral"}>{row.nextAction}</Chip>
                },
                { key: "humanMode", header: "IA / humano", sortable: true },
                { key: "lastActivity", header: "Ultima atividade", sortable: true },
                { key: "owner", header: "Dono", sortable: true }
            ]} density="dense" onRowClick={(row) => {
                if (!controlsDisabled && !row.disabled) {
                    onRowSelect?.(row);
                }
            }} rows={tableRows} selectedRowId={tableRows.find((row) => row.selected)?.id} sort={sort} onSortChange={setSort}/>
          <TablePagination className="tcrm-lead-table__pagination" itemsPerPageValue={itemsPerPage} label={String(totalLabel ?? resolvedPageLabel)} nextDisabled={controlsDisabled || page >= pageCount} onItemsPerPageClick={onItemsPerPageClick} onNext={onNextPage} onPageChange={onPageChange} onPrevious={onPreviousPage} page={page} pageCount={pageCount} previousDisabled={controlsDisabled || page <= 1}/>
        </>) : (<EmptyState title="Nenhum lead" description="Os leads aparecem aqui quando os filtros retornam resultados."/>)}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de leads esta indisponivel.</InlineAlert> : null}
    </Panel>);
}
