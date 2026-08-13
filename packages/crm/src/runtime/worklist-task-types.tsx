/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Chip, cn } from "@taliya/ui";

import { CrmWorklistTable } from "../patterns/worklist-table.js";

import type { CrmWorklistTableColumn } from "../patterns/worklist-table.js";

import { TaskTableState } from "./filters-queue.js";

export type TaskTablePriority = "low" | "medium" | "high";

export type TaskTableStatus = "open" | "progress" | "waiting" | "unassigned" | "late" | "done";

export type TaskTableMode = "copilot" | "manual" | "automation" | "none";

export interface TaskTableRow {
    id: string;
    title: React.ReactNode;
    owner: React.ReactNode;
    deadline: React.ReactNode;
    deadlineTone?: "default" | "danger";
    status: TaskTableStatus;
    origin: React.ReactNode;
    priority: TaskTablePriority;
    activity: React.ReactNode;
    mode: TaskTableMode;
    selected?: boolean;
    disabled?: boolean;
}

const taskTableStatusLabel: Record<TaskTableStatus, string> = {
    open: "Aberta",
    progress: "Em andamento",
    waiting: "Aguardando",
    unassigned: "Sem dono",
    late: "Atrasada",
    done: "Concluída"
};

const taskTablePriorityLabel: Record<TaskTablePriority, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta"
};

const taskTableModeLabel: Record<TaskTableMode, React.ReactNode> = {
    copilot: <>copiloto<br />sugeriu</>,
    manual: <>manual<br />disponível</>,
    automation: <>automação<br />bloqueada</>,
    none: "—"
};

function taskTableSortValue(row: TaskTableRow, key: string, priorityOrder: Record<TaskTablePriority, number>) {
    if (key === "priority")
        return String(priorityOrder[row.priority]);
    if (key === "status")
        return taskTableStatusLabel[row.status];
    if (key === "mode")
        return String(taskTableModeLabel[row.mode]);
    const value = row[key as keyof TaskTableRow];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

const sourceTaskTableRows: TaskTableRow[] = [
    {
        id: "replace-ana",
        title: "Confirmar reposição da Ana",
        owner: "Recepção",
        deadline: "Hoje",
        deadlineTone: "danger",
        status: "open",
        origin: <>Agenda /<br />Reposições</>,
        priority: "medium",
        activity: <>Ana pediu reposição<br />por WhatsApp</>,
        mode: "copilot",
        selected: true
    },
    {
        id: "receipt-marina",
        title: <>Validar comprovante da<br />Marina</>,
        owner: "Financeiro",
        deadline: "Hoje",
        deadlineTone: "danger",
        status: "progress",
        origin: "Financeiro",
        priority: "high",
        activity: <>Comprovante enviado<br />às 10:12</>,
        mode: "manual"
    },
    {
        id: "phone-responsible",
        title: <>Corrigir telefone do<br />responsável</>,
        owner: "Recepção",
        deadline: "Atrasada",
        deadlineTone: "danger",
        status: "open",
        origin: "Dados",
        priority: "medium",
        activity: <>Contato falhou<br />novamente</>,
        mode: "manual"
    },
    {
        id: "inactive-student",
        title: "Ligar para aluno inativo",
        owner: "Atendimento",
        deadline: "Amanhã",
        status: "waiting",
        origin: "Retenção",
        priority: "medium",
        activity: <>Aguardando janela<br />de contato</>,
        mode: "manual"
    },
    {
        id: "substitute-18h",
        title: "Confirmar substituto aula 18h",
        owner: "Coordenação",
        deadline: "Hoje",
        deadlineTone: "danger",
        status: "progress",
        origin: "Agenda",
        priority: "high",
        activity: <>Professor titular<br />indisponível</>,
        mode: "manual"
    },
    {
        id: "duplicate-registration",
        title: "Revisar cadastro duplicado",
        owner: "Sem dono",
        deadline: "—",
        status: "unassigned",
        origin: "Dados",
        priority: "low",
        activity: <>Duplicidade detectada<br />pelo CRM</>,
        mode: "automation"
    },
    {
        id: "call-09h",
        title: <>Completar chamada da<br />aula 09h</>,
        owner: "Instrutores",
        deadline: "Hoje",
        deadlineTone: "danger",
        status: "late",
        origin: "Agenda / Aula",
        priority: "high",
        activity: <>Chamada ainda<br />incompleta</>,
        mode: "manual"
    },
    {
        id: "contract-signature",
        title: <>Enviar contrato para<br />assinatura</>,
        owner: "Financeiro",
        deadline: "Sexta, 17/05",
        status: "done",
        origin: "Financeiro",
        priority: "medium",
        activity: <>Contrato enviado<br />para aluno</>,
        mode: "none"
    }
];

export interface TaskTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: TaskTableState;
    rows?: TaskTableRow[];
    pageLabel?: React.ReactNode;
    itemsPerPage?: React.ReactNode;
    onRowSelect?: (row: TaskTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
}

export function TaskTable({ className, state = "source", rows = sourceTaskTableRows, pageLabel = "1-8 de 8", itemsPerPage = "10", onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, ...props }: TaskTableProps) {
    const columns = React.useMemo<Array<CrmWorklistTableColumn<TaskTableRow>>>(() => [
        {
            key: "title",
            header: "Tarefa",
            sortable: true,
            render: (row) => (<span className={cn("tcrm-task-table__title-cell", row.selected && "is-selected")}>
            <strong className="tcrm-task-table__title">{row.title}</strong>
          </span>),
            sortValue: (row) => taskTableSortValue(row, "title", { high: 0, medium: 1, low: 2 })
        },
        { key: "owner", header: "Dono / fila", sortable: true, sortValue: (row) => taskTableSortValue(row, "owner", { high: 0, medium: 1, low: 2 }) },
        {
            key: "deadline",
            header: "Prazo",
            sortable: true,
            render: (row) => <span className={cn("tcrm-task-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>,
            sortValue: (row) => taskTableSortValue(row, "deadline", { high: 0, medium: 1, low: 2 })
        },
        {
            key: "status",
            header: "Status",
            sortable: true,
            render: (row) => <Chip className={cn("tcrm-task-table__status", `is-${row.status}`)} showDot={false}>{taskTableStatusLabel[row.status]}</Chip>,
            sortValue: (row) => taskTableSortValue(row, "status", { high: 0, medium: 1, low: 2 })
        },
        { key: "origin", header: "Origem canônica", sortable: true, sortValue: (row) => taskTableSortValue(row, "origin", { high: 0, medium: 1, low: 2 }) },
        {
            key: "priority",
            header: "Prior.",
            sortable: true,
            render: (row) => (<span className={cn("tcrm-task-table__priority", `is-${row.priority}`)}>
            <i aria-hidden="true"/>
            {taskTablePriorityLabel[row.priority]}
          </span>),
            sortValue: (row) => taskTableSortValue(row, "priority", { high: 0, medium: 1, low: 2 })
        },
        { key: "activity", header: "Última atividade", sortable: true, sortValue: (row) => taskTableSortValue(row, "activity", { high: 0, medium: 1, low: 2 }) },
        {
            key: "mode",
            header: "Modo",
            sortable: true,
            render: (row) => <Chip className={cn("tcrm-task-table__mode", `is-${row.mode}`)} showDot={false}>{taskTableModeLabel[row.mode]}</Chip>,
            sortValue: (row) => taskTableSortValue(row, "mode", { high: 0, medium: 1, low: 2 })
        }
    ], []);
    return (<CrmWorklistTable ariaLabel="Tabela de tarefas" blockedDescription="A lista de tarefas esta indisponivel." blockedTitle="Tabela bloqueada" className={cn("tcrm-task-table", className)} data-component="TaskTable" columns={columns} emptyDescription="As tarefas da fila aparecem aqui." emptyTitle="Nenhuma tarefa" loadingTitle="Carregando tarefas" pagination={{
            itemsPerPage,
            label: pageLabel,
            onItemsPerPageClick,
            onNextPage,
            onPreviousPage
        }} rows={rows} selectedRowId={rows.find((row) => row.selected)?.id} state={state} onRowSelect={(row) => {
            if (!row.disabled) {
                onRowSelect?.(row);
            }
        }} {...props}/>);
}
