/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Chip, DataTable, EmptyState, InlineAlert, LoadingState, Panel, TablePagination, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

import { ReplacementTableState } from "./worklist-student.js";

export type ReplacementTableStatus = "found" | "waiting" | "blocked" | "noVacancy" | "conflict" | "expiring" | "expired" | "scheduled" | "pending" | "available";

export type ReplacementTableMode = "copilot" | "manual" | "autonomous" | "blocked";

export interface ReplacementTableStudent {
    name: React.ReactNode;
    avatarSrc?: string;
    initials?: string;
}

export interface ReplacementTableRow {
    id: string;
    student: ReplacementTableStudent;
    originalClass: React.ReactNode;
    reason: React.ReactNode;
    validity: React.ReactNode;
    preference: React.ReactNode;
    status: ReplacementTableStatus;
    nextAction: React.ReactNode;
    mode: ReplacementTableMode;
    selected?: boolean;
    disabled?: boolean;
}

export interface ReplacementTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: ReplacementTableState;
    rows?: ReplacementTableRow[];
    pageLabel?: React.ReactNode;
    itemsPerPage?: React.ReactNode;
    onRowSelect?: (row: ReplacementTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
}

const replacementTableStatusLabel: Record<ReplacementTableStatus, React.ReactNode> = {
    found: "Opção encontrada",
    waiting: "Aguardando resposta",
    blocked: "Bloqueada por regra",
    noVacancy: "Sem vaga",
    conflict: "Conflito",
    expiring: "Expira amanhã",
    expired: "Vencida",
    scheduled: "Agendada",
    pending: "Pendente",
    available: "Com opção"
};

const replacementTableStatusTone: Record<ReplacementTableStatus, ComponentTone> = {
    found: "success",
    waiting: "warning",
    blocked: "danger",
    noVacancy: "danger",
    conflict: "danger",
    expiring: "warning",
    expired: "danger",
    scheduled: "success",
    pending: "neutral",
    available: "success"
};

const replacementTableModeLabel: Record<ReplacementTableMode, React.ReactNode> = {
    copilot: "copiloto sugeriu",
    manual: "manual",
    autonomous: "autônomo disponível",
    blocked: "autônomo bloqueado"
};

const replacementTableModeTone: Record<ReplacementTableMode, ComponentTone> = {
    copilot: "info",
    manual: "info",
    autonomous: "paused",
    blocked: "danger"
};

const sourceReplacementTableRows: ReplacementTableRow[] = [
    {
        id: "ana-carolina",
        student: { name: "Ana Carolina Souza", initials: "AS" },
        originalClass: <>Terça 17h<br />Reformer Inter.</>,
        reason: "Falta avisada",
        validity: "12/06",
        preference: "Manhã ou quinta",
        status: "found",
        nextAction: "Enviar convite",
        mode: "copilot",
        selected: true
    },
    {
        id: "felipe-andrade",
        student: { name: "Felipe Andrade", initials: "FA" },
        originalClass: <>Quinta 17h<br />Reformer Inter.</>,
        reason: "Falta avisada",
        validity: "20/05",
        preference: "Manhã",
        status: "waiting",
        nextAction: "Cobrar retorno",
        mode: "manual"
    },
    {
        id: "gabriela-martins",
        student: { name: "Gabriela Martins", initials: "GM" },
        originalClass: <>Terça 17h<br />Reformer Inter.</>,
        reason: "No-show",
        validity: "18/05",
        preference: "Noite",
        status: "blocked",
        nextAction: "Revisar política",
        mode: "blocked"
    },
    {
        id: "beatriz-lima",
        student: { name: "Beatriz Lima", initials: "BL" },
        originalClass: <>Quarta 08h<br />Pilates Solo</>,
        reason: <>Crédito vence<br />amanhã</>,
        validity: "14/05",
        preference: "Cedo",
        status: "expiring",
        nextAction: "Buscar horário",
        mode: "manual"
    },
    {
        id: "juliana-costa",
        student: { name: "Juliana Costa", initials: "JC" },
        originalClass: <>Segunda 19h<br />Tower</>,
        reason: <>Reposição<br />aprovada</>,
        validity: "16/05",
        preference: "Quinta 08h",
        status: "scheduled",
        nextAction: <>Confirmar<br />presença</>,
        mode: "autonomous"
    },
    {
        id: "marina-lopes",
        student: { name: "Marina Lopes", initials: "ML" },
        originalClass: <>Sexta 10h<br />Pilates Solo</>,
        reason: <>Encaixe<br />solicitado</>,
        validity: "24/05",
        preference: "Tarde",
        status: "pending",
        nextAction: "Avaliar opções",
        mode: "copilot"
    },
    {
        id: "lucas-peres",
        student: { name: "Lucas Peres", initials: "LP" },
        originalClass: <>Terça 07h<br />Reformer Inter.</>,
        reason: <>Pedido da<br />recepção</>,
        validity: "30/05",
        preference: "Sem preferência",
        status: "pending",
        nextAction: "Verificar vaga",
        mode: "manual"
    },
    {
        id: "camila-rocha",
        student: { name: "Camila Rocha", initials: "CR" },
        originalClass: <>Quarta 14h<br />Pilates Solo</>,
        reason: "Falta avisada",
        validity: "28/05",
        preference: "Quinta ou sexta",
        status: "available",
        nextAction: <>Confirmar<br />horário</>,
        mode: "autonomous"
    }
];

function replacementTableSortValue(row: ReplacementTableRow, key: string) {
    if (key === "student")
        return String(row.student.name);
    if (key === "status")
        return String(replacementTableStatusLabel[row.status]);
    if (key === "mode")
        return String(replacementTableModeLabel[row.mode]);
    const value = row[key as keyof ReplacementTableRow];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ReplacementTableStudentCell({ selected, student }: {
    selected?: boolean;
    student: ReplacementTableStudent;
}) {
    return (<span className={cn("tcrm-replacement-table__student", selected && "is-selected")}>
      <Avatar name={String(student.name)} size="xs" src={student.avatarSrc}>{student.initials}</Avatar>
      <strong>{student.name}</strong>
    </span>);
}

export function ReplacementTable({ className, state = "source", rows = sourceReplacementTableRows, pageLabel = "1-8 de 8", itemsPerPage = "10", onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, ...props }: ReplacementTableProps) {
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
            const result = replacementTableSortValue(first, sort.key).localeCompare(replacementTableSortValue(second, sort.key), "pt-BR", {
                numeric: true,
                sensitivity: "base"
            });
            return sort.direction === "ascending" ? result : result * -1;
        });
    }, [rows, sort, state]);
    const controlsDisabled = isLoading || isBlocked;
    return (<Panel aria-busy={isLoading || undefined} aria-label="Tabela de reposições" className={cn("tcrm-replacement-table", className)} data-component="ReplacementTable" data-state={state} {...props}>
      {isLoading ? (<LoadingState title="Carregando reposições" variant="skeleton"/>) : tableRows.length > 0 ? (<>
          <DataTable className="tcrm-replacement-table__data" columns={[
                {
                    key: "student",
                    header: "Aluno",
                    sortable: true,
                    render: (row) => <ReplacementTableStudentCell selected={row.selected} student={row.student}/>
                },
                { key: "originalClass", header: "Aula original", sortable: true },
                { key: "reason", header: "Motivo / origem", sortable: true },
                { key: "validity", header: "Validade", sortable: true },
                { key: "preference", header: "Preferência", sortable: true },
                {
                    key: "status",
                    header: "Status",
                    sortable: true,
                    render: (row) => <Chip className={cn("tcrm-replacement-table__status", `is-${row.status}`)} showDot={false} tone={replacementTableStatusTone[row.status]}>{replacementTableStatusLabel[row.status]}</Chip>
                },
                { key: "nextAction", header: "Próxima ação", sortable: true },
                {
                    key: "mode",
                    header: "Modo",
                    sortable: true,
                    render: (row) => <Chip className={cn("tcrm-replacement-table__mode", `is-${row.mode}`)} showDot={false} tone={replacementTableModeTone[row.mode]}>{replacementTableModeLabel[row.mode]}</Chip>
                }
            ]} density="dense" onRowClick={(row) => {
                if (!controlsDisabled && !row.disabled) {
                    onRowSelect?.(row);
                }
            }} rows={tableRows} selectedRowId={tableRows.find((row) => row.selected)?.id} sort={sort} onSortChange={setSort}/>
          <TablePagination className="tcrm-replacement-table__pagination" itemsPerPageValue={itemsPerPage} label={String(pageLabel)} nextDisabled={controlsDisabled} onItemsPerPageClick={onItemsPerPageClick} onNext={onNextPage} onPrevious={onPreviousPage} page={1} pageCount={1} previousDisabled={controlsDisabled}/>
        </>) : (<EmptyState title="Nenhuma reposição" description="Os pedidos de reposição aparecem aqui."/>)}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de reposições está indisponível.</InlineAlert> : null}
    </Panel>);
}
