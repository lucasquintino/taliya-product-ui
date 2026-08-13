/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Chip, DataTable, EmptyState, InlineAlert, LoadingState, Panel, StatusDot, TablePagination, cn } from "@taliya/ui";

import { StudentTablePerson, StudentTableProps, StudentTableRow, studentTableFinanceAccessibleLabel, studentTableFinanceLabel, studentTableFinanceTone, studentTableRiskLabel, studentTableRiskTone, studentTableStatusLabel, studentTableStatusTone } from "./worklist-student-types-a.js";

const sourceStudentTableRows: StudentTableRow[] = [
    {
        id: "ana-paula",
        student: { name: "Ana Paula Martins", initials: "AP" },
        status: "active",
        plan: "Plano Mensal",
        currentClass: "Reformer Iniciante",
        owner: "Camila Martins",
        presence: "8/10",
        finance: "ok",
        risk: "low",
        activity: { label: "mensagem hoje", status: "info" },
        selected: true
    },
    {
        id: "joao-pedro",
        student: { name: "João Pedro Silva", initials: "JP" },
        status: "active",
        plan: "Premium",
        currentClass: "Mat Pilates",
        owner: "Nikki Olaw",
        presence: "6/10",
        finance: "pending",
        risk: "medium",
        activity: { label: "contrato atualizado", status: "info" }
    },
    {
        id: "carla-mendes",
        student: { name: "Carla Mendes", initials: "CM" },
        status: "risk",
        plan: "Trimestral",
        currentClass: "Funcional",
        owner: "Bruno Lima",
        presence: "3/10",
        finance: "ok",
        risk: "high",
        activity: { label: "14 dias sem aula", status: "danger" }
    },
    {
        id: "pedro-henrique",
        student: { name: "Pedro Henrique", initials: "PH" },
        status: "noClass",
        plan: "Experimental",
        currentClass: "—",
        owner: "Rafael Torres",
        presence: "—",
        finance: "pending",
        risk: "medium",
        activity: { label: "veio do WhatsApp", status: "info" }
    },
    {
        id: "juliana-rocha",
        student: { name: "Juliana Rocha", initials: "JR" },
        status: "inactive",
        plan: "Plano pausado",
        currentClass: "Pilates Solo",
        owner: "próprio",
        presence: "0/10",
        finance: "ok",
        risk: "low",
        activity: { label: "pausa até 30/05", status: "update" }
    },
    {
        id: "mariana-costa",
        student: { name: "Mariana Costa", initials: "MC" },
        status: "active",
        plan: "Plano Mensal",
        currentClass: "Reformer Iniciante",
        owner: "Luana Alves",
        presence: "9/10",
        finance: "ok",
        risk: "low",
        activity: { label: "aula realizada hoje", status: "info" }
    },
    {
        id: "lucas-oliveira",
        student: { name: "Lucas Oliveira", initials: "LO" },
        status: "active",
        plan: "Premium",
        currentClass: "Mat Pilates",
        owner: "Nikki Olaw",
        presence: "7/10",
        finance: "ok",
        risk: "low",
        activity: { label: "check-in hoje", status: "info" }
    },
    {
        id: "fernanda-souza",
        student: { name: "Fernanda Souza", initials: "FS" },
        status: "risk",
        plan: "Trimestral",
        currentClass: "Funcional",
        owner: "Bruno Lima",
        presence: "4/10",
        finance: "pending",
        risk: "high",
        activity: { label: "cobrança enviada", status: "danger" }
    },
    {
        id: "gabriel-santos",
        student: { name: "Gabriel Santos", initials: "GS" },
        status: "active",
        plan: "Plano Mensal",
        currentClass: "Pilates Solo",
        owner: "Camila Martins",
        presence: "8/10",
        finance: "ok",
        risk: "low",
        activity: { label: "aula realizada hoje", status: "info" }
    },
    {
        id: "patricia-lima",
        student: { name: "Patrícia Lima", initials: "PL" },
        status: "active",
        plan: "Premium",
        currentClass: "Reformer Avançado",
        owner: "Luana Alves",
        presence: "10/10",
        finance: "ok",
        risk: "low",
        activity: { label: "feedback registrado", status: "info" }
    }
];

function studentTableSortValue(row: StudentTableRow, key: string) {
    if (key === "student")
        return String(row.student.name);
    if (key === "status")
        return studentTableStatusLabel[row.status];
    if (key === "finance")
        return String(studentTableFinanceLabel[row.finance]);
    if (key === "risk")
        return String({ high: 0, medium: 1, low: 2, none: 3 }[row.risk]);
    if (key === "activity")
        return String(row.activity.label);
    const value = row[key as keyof StudentTableRow];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function StudentTablePersonCell({ person }: {
    person: StudentTablePerson;
}) {
    return (<span className="tcrm-student-table__person">
      <Avatar name={String(person.name)} size="xs" src={person.avatarSrc}>{person.initials}</Avatar>
      <strong>{person.name}</strong>
    </span>);
}

export function StudentTable({ className, state = "source", density = "standard", selectionTone = "marker", rows = sourceStudentTableRows, pageLabel = "1-10 de 154", itemsPerPage = "10", onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, ...props }: StudentTableProps) {
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
            const firstValue = studentTableSortValue(first, sort.key);
            const secondValue = studentTableSortValue(second, sort.key);
            const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
            return sort.direction === "ascending" ? result : result * -1;
        });
    }, [rows, sort, state]);
    const controlsDisabled = isLoading || isBlocked;
    return (<Panel aria-busy={isLoading || undefined} aria-label="Tabela de alunos" className={cn("tcrm-student-table", density === "compact" && "tcrm-student-table--compact", selectionTone === "soft" && "tcrm-student-table--selection-soft", className)} data-component="StudentTable" data-density={density} data-selection-tone={selectionTone} data-state={state} {...props}>
      {isLoading ? (<LoadingState title="Carregando alunos" variant="skeleton"/>) : tableRows.length > 0 ? (<>
          <DataTable className="tcrm-student-table__data" columns={[
                {
                    key: "student",
                    header: "Aluno",
                    sortable: true,
                    render: (row) => <StudentTablePersonCell person={row.student}/>
                },
                {
                    key: "status",
                    header: "Status",
                    sortable: true,
                    render: (row) => <Chip className={cn("tcrm-student-table__status", `is-${row.status}`)} showDot={false} tone={studentTableStatusTone[row.status]}>{studentTableStatusLabel[row.status]}</Chip>
                },
                { key: "plan", header: "Plano", sortable: true },
                { key: "currentClass", header: "Turma atual", sortable: true },
                { key: "owner", header: "Responsável", sortable: true },
                { key: "presence", header: "Presença", sortable: true },
                {
                    key: "finance",
                    header: "Financeiro",
                    sortable: true,
                    render: (row) => <Chip aria-label={studentTableFinanceAccessibleLabel[row.finance]} className={cn("tcrm-student-table__finance", `is-${row.finance}`)} showDot={false} tone={studentTableFinanceTone[row.finance]}>{studentTableFinanceLabel[row.finance]}</Chip>
                },
                {
                    key: "risk",
                    header: "Risco",
                    sortable: true,
                    render: (row) => <Chip className={cn("tcrm-student-table__risk", `is-${row.risk}`)} showDot={false} tone={studentTableRiskTone[row.risk]}>{studentTableRiskLabel[row.risk]}</Chip>
                },
                {
                    key: "activity",
                    header: "Última atividade",
                    sortable: true,
                    render: (row) => <StatusDot className="tcrm-student-table__activity" status={row.activity.status ?? "neutral"} label={String(row.activity.label)}/>
                }
            ]} density="dense" onRowClick={(row) => {
                if (!controlsDisabled && !row.disabled) {
                    onRowSelect?.(row);
                }
            }} rows={tableRows} selectedRowId={tableRows.find((row) => row.selected)?.id} sort={sort} onSortChange={setSort}/>
          <TablePagination className="tcrm-student-table__pagination" itemsPerPageValue={itemsPerPage} label={String(pageLabel)} nextDisabled={controlsDisabled} onItemsPerPageClick={onItemsPerPageClick} onNext={onNextPage} onPrevious={onPreviousPage} page={1} pageCount={16} previousDisabled={controlsDisabled}/>
        </>) : (<EmptyState title="Nenhum aluno" description="Os alunos do estúdio aparecem aqui."/>)}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de alunos está indisponível.</InlineAlert> : null}
    </Panel>);
}
