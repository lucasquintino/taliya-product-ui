/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Chip, DataTable, EmptyState, InlineAlert, LoadingState, Panel, TablePagination, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

import { ChecklistTableState } from "./worklist-drawer.js";

export type ChecklistTableStatus = "progress" | "blocked" | "pending" | "overdue" | "review" | "done";

export interface ChecklistTableOwner {
    name: React.ReactNode;
    avatarSrc?: string;
    helper?: React.ReactNode;
}

export interface ChecklistTableProgress {
    completed: number;
    total: number;
}

export interface ChecklistTableRow {
    id: string;
    index: number;
    title: React.ReactNode;
    type: React.ReactNode;
    progress: ChecklistTableProgress;
    owner: ChecklistTableOwner;
    deadline: React.ReactNode;
    deadlineTone?: "default" | "danger";
    status: ChecklistTableStatus;
    nextStep: React.ReactNode;
    activity: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

export interface ChecklistTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: ChecklistTableState;
    rows?: ChecklistTableRow[];
    pageLabel?: React.ReactNode;
    itemsPerPage?: React.ReactNode;
    onRowSelect?: (row: ChecklistTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
}

const checklistTableStatusLabel: Record<ChecklistTableStatus, string> = {
    progress: "Em andamento",
    blocked: "Bloqueado",
    pending: "Pendente",
    overdue: "Atrasado",
    review: "Em revisão",
    done: "Concluído"
};

const checklistTableStatusTone: Record<ChecklistTableStatus, ComponentTone> = {
    progress: "info",
    blocked: "danger",
    pending: "warning",
    overdue: "danger",
    review: "paused",
    done: "success"
};

const sourceChecklistTableRows: ChecklistTableRow[] = [
    {
        id: "opening",
        index: 1,
        title: "Abertura do estúdio",
        type: "Abertura",
        progress: { completed: 3, total: 5 },
        owner: { name: "Mariana" },
        deadline: <>Hoje<br />08:00</>,
        deadlineTone: "danger",
        status: "progress",
        nextStep: "Conferir salas",
        activity: "07:42",
        selected: true
    },
    {
        id: "daily-agenda",
        index: 2,
        title: "Revisão diária da agenda",
        type: "Agenda",
        progress: { completed: 4, total: 7 },
        owner: { name: "Lucas" },
        deadline: <>Ontem<br />09:30</>,
        deadlineTone: "danger",
        status: "overdue",
        nextStep: <>Resolver conflito<br />de sala</>,
        activity: "08:15"
    },
    {
        id: "closing",
        index: 3,
        title: "Fechamento do dia",
        type: "Fechamento",
        progress: { completed: 0, total: 6 },
        owner: { name: "Coordenação", helper: "Equipe" },
        deadline: <>Hoje<br />20:00</>,
        deadlineTone: "danger",
        status: "pending",
        nextStep: <>Iniciar<br />conferência</>,
        activity: "—"
    },
    {
        id: "agent-setup",
        index: 4,
        title: "Setup do agente de agenda",
        type: "Agentes",
        progress: { completed: 5, total: 8 },
        owner: { name: "Gestor" },
        deadline: "Amanhã",
        status: "review",
        nextStep: <>Validar fallback<br />manual</>,
        activity: "11:10"
    },
    {
        id: "new-student",
        index: 5,
        title: "Onboarding de novo aluno",
        type: "Alunos",
        progress: { completed: 6, total: 9 },
        owner: { name: "Recepção" },
        deadline: <>Hoje<br />16:00</>,
        deadlineTone: "danger",
        status: "progress",
        nextStep: "Validar contrato",
        activity: "13:20"
    }
];

function checklistTableSortValue(row: ChecklistTableRow, key: string) {
    if (key === "progress")
        return String(row.progress.completed / Math.max(row.progress.total, 1));
    if (key === "owner")
        return String(row.owner.name);
    if (key === "status")
        return checklistTableStatusLabel[row.status];
    const value = row[key as keyof ChecklistTableRow];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ChecklistTableProgressCell({ progress }: {
    progress: ChecklistTableProgress;
}) {
    const normalized = Math.max(0, Math.min(100, Math.round((progress.completed / Math.max(progress.total, 1)) * 100)));
    return (<span className="tcrm-checklist-table__progress">
      <span aria-label={`${progress.completed} de ${progress.total} passos concluídos`} aria-valuemax={progress.total} aria-valuemin={0} aria-valuenow={progress.completed} className="tcrm-checklist-table__progress-ring" role="progressbar" style={{ "--tcrm-checklist-table-progress": `${normalized}%` } as React.CSSProperties}/>
      <strong>{progress.completed}/{progress.total}</strong>
    </span>);
}

export function ChecklistTable({ className, state = "source", rows = sourceChecklistTableRows, pageLabel = "1-5 de 12", itemsPerPage = "10", onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, ...props }: ChecklistTableProps) {
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
            const firstValue = checklistTableSortValue(first, sort.key);
            const secondValue = checklistTableSortValue(second, sort.key);
            const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
            return sort.direction === "ascending" ? result : result * -1;
        });
    }, [rows, sort, state]);
    const controlsDisabled = isLoading || isBlocked;
    return (<Panel aria-busy={isLoading || undefined} aria-label="Tabela de checklists" className={cn("tcrm-checklist-table", className)} data-component="ChecklistTable" data-state={state} {...props}>
      {isLoading ? (<LoadingState title="Carregando checklists" variant="skeleton"/>) : tableRows.length > 0 ? (<>
          <DataTable className="tcrm-checklist-table__data" columns={[
                {
                    key: "title",
                    header: "Checklist",
                    sortable: true,
                    render: (row) => (<span className={cn("tcrm-checklist-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-checklist-table__index">{row.index}.</span>
                    <strong className="tcrm-checklist-table__title">{row.title}</strong>
                  </span>)
                },
                { key: "type", header: "Tipo", sortable: true },
                {
                    key: "progress",
                    header: "Progresso",
                    sortable: true,
                    render: (row) => <ChecklistTableProgressCell progress={row.progress}/>
                },
                {
                    key: "owner",
                    header: "Responsável",
                    sortable: true,
                    render: (row) => (<span className="tcrm-checklist-table__owner">
                    <Avatar name={String(row.owner.name)} size="xs" src={row.owner.avatarSrc}/>
                    <span>
                      <strong>{row.owner.name}</strong>
                      {row.owner.helper ? <small>{row.owner.helper}</small> : null}
                    </span>
                  </span>)
                },
                {
                    key: "deadline",
                    header: "Prazo",
                    sortable: true,
                    render: (row) => <span className={cn("tcrm-checklist-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
                },
                {
                    key: "status",
                    header: "Status",
                    sortable: true,
                    render: (row) => (<Chip className={cn("tcrm-checklist-table__status", `is-${row.status}`)} showDot={false} tone={checklistTableStatusTone[row.status]}>
                    {checklistTableStatusLabel[row.status]}
                  </Chip>)
                },
                { key: "nextStep", header: "Próximo passo", sortable: true },
                { key: "activity", header: "Última atividade", sortable: true, align: "right" }
            ]} density="dense" onRowClick={(row) => {
                if (!controlsDisabled && !row.disabled) {
                    onRowSelect?.(row);
                }
            }} rows={tableRows} selectedRowId={tableRows.find((row) => row.selected)?.id} sort={sort} onSortChange={setSort}/>
          <TablePagination className="tcrm-checklist-table__pagination" itemsPerPageValue={itemsPerPage} label={String(pageLabel)} nextDisabled={controlsDisabled} onItemsPerPageClick={onItemsPerPageClick} onNext={onNextPage} onPrevious={onPreviousPage} page={1} pageCount={2} previousDisabled={controlsDisabled}/>
        </>) : (<EmptyState title="Nenhum checklist" description="As rotinas operacionais aparecem aqui."/>)}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de checklists esta indisponivel.</InlineAlert> : null}
    </Panel>);
}
