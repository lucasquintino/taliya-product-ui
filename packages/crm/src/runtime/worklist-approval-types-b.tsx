/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Chip, DataTable, EmptyState, Icon, InlineAlert, LoadingState, Panel, TablePagination, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

import { ApprovalTableProps, ApprovalTableRequester, ApprovalTableRow, ApprovalTableStatus, approvalTableRiskLabel, approvalTableStatusLabel, approvalTableTypeIcon, approvalTableTypeLabel } from "./worklist-approval-types-a.js";

const approvalTableStatusTone: Record<ApprovalTableStatus, ComponentTone> = {
    pending: "warning",
    review: "info",
    blocked: "danger",
    expired: "danger",
    approved: "success",
    rejected: "danger"
};

const sourceApprovalTableRows: ApprovalTableRow[] = [
    {
        id: "ana-message",
        index: 1,
        title: <>Aprovar mensagem<br />para Ana Paula</>,
        type: "message",
        origin: <>WhatsApp /<br />Agente de<br />atendimento</>,
        requester: { name: "Copiloto", icon: "sparkles" },
        risk: "low",
        cost: "1 crédito",
        deadline: <>Hoje<br />09:30</>,
        deadlineTone: "danger",
        status: "pending",
        activity: <>Sugestão gerada<br />às 09:18</>,
        selected: true
    },
    {
        id: "agenda-change",
        index: 2,
        title: <>Aprovar alteração<br />de agenda</>,
        type: "agenda",
        origin: "Reposição",
        requester: { name: "Recepção", icon: "user" },
        risk: "medium",
        cost: <>Impacto<br />4 alunos</>,
        deadline: <>Hoje<br />11:00</>,
        deadlineTone: "danger",
        status: "pending",
        activity: <>Conflito de sala<br />detectado</>
    },
    {
        id: "financial-exception",
        index: 3,
        title: <>Aprovar exceção<br />financeira</>,
        type: "finance",
        origin: <>Desconto<br />manual</>,
        requester: { name: "Mariana" },
        risk: "medium",
        cost: "R$ 120",
        deadline: <>Hoje<br />14:00</>,
        deadlineTone: "danger",
        status: "review",
        activity: <>Caixa solicitou<br />validação</>
    },
    {
        id: "replacement-announcement",
        index: 4,
        title: <>Aprovar comunicado<br />de reposição</>,
        type: "announcement",
        origin: <>Segmento<br />alunos afetados</>,
        requester: { name: <>Agente de<br />comunicação</>, icon: "user" },
        risk: "low",
        cost: "Cota 82%",
        deadline: "Expirou 08:00",
        deadlineTone: "danger",
        status: "expired",
        activity: <>Rascunho pronto<br />para envio</>
    },
    {
        id: "agent-action",
        index: 5,
        title: <>Aprovar ação<br />autônoma bloqueada</>,
        type: "agent",
        origin: <>Fluxo de<br />agenda</>,
        requester: { name: <>Agente de<br />agenda</>, icon: "user" },
        risk: "high",
        cost: "3 créditos",
        deadline: "Hoje",
        deadlineTone: "danger",
        status: "blocked",
        activity: <>Guardrail<br />interrompeu<br />execução</>
    },
    {
        id: "data-correction",
        index: 6,
        title: <>Aprovar correção<br />de cadastro</>,
        type: "data",
        origin: <>Telefone do<br />responsável</>,
        requester: { name: "CRM", icon: "user" },
        risk: "low",
        cost: "—",
        deadline: <>Hoje<br />16:00</>,
        deadlineTone: "danger",
        status: "approved",
        activity: <>Sugestão de<br />normalização</>
    }
];

function approvalTableSortValue(row: ApprovalTableRow, key: string) {
    if (key === "type")
        return approvalTableTypeLabel[row.type];
    if (key === "requester")
        return String(row.requester.name);
    if (key === "risk")
        return String({ high: 0, medium: 1, low: 2 }[row.risk]);
    if (key === "status")
        return String(approvalTableStatusLabel[row.status]);
    const value = row[key as keyof ApprovalTableRow];
    return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ApprovalTableRequesterCell({ requester }: {
    requester: ApprovalTableRequester;
}) {
    if (requester.avatarSrc) {
        return (<span className="tcrm-approval-table__requester">
        <Avatar name={String(requester.name)} size="xs" src={requester.avatarSrc}/>
        <span>{requester.name}</span>
      </span>);
    }
    return (<span className="tcrm-approval-table__requester">
      <Icon name={requester.icon ?? "user"} size={14}/>
      <span>{requester.name}</span>
    </span>);
}

export function ApprovalTable({ className, state = "source", rows = sourceApprovalTableRows, pageLabel = "1-6 de 6", itemsPerPage = "10", onRowSelect, onItemsPerPageClick, onPreviousPage, onNextPage, ...props }: ApprovalTableProps) {
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
            const firstValue = approvalTableSortValue(first, sort.key);
            const secondValue = approvalTableSortValue(second, sort.key);
            const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
            return sort.direction === "ascending" ? result : result * -1;
        });
    }, [rows, sort, state]);
    const controlsDisabled = isLoading || isBlocked;
    return (<Panel aria-busy={isLoading || undefined} aria-label="Tabela de aprovações" className={cn("tcrm-approval-table", className)} data-component="ApprovalTable" data-state={state} {...props}>
      {isLoading ? (<LoadingState title="Carregando aprovações" variant="skeleton"/>) : tableRows.length > 0 ? (<>
          <DataTable className="tcrm-approval-table__data" columns={[
                {
                    key: "title",
                    header: "Aprovação",
                    sortable: true,
                    render: (row) => (<span className={cn("tcrm-approval-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-approval-table__index">{row.index}.</span>
                    <strong className="tcrm-approval-table__title">{row.title}</strong>
                  </span>)
                },
                {
                    key: "type",
                    header: "Tipo",
                    sortable: true,
                    render: (row) => (<span className="tcrm-approval-table__type">
                    <Icon name={approvalTableTypeIcon[row.type]} size={14}/>
                    {approvalTableTypeLabel[row.type]}
                  </span>)
                },
                { key: "origin", header: "Origem canônica", sortable: true },
                {
                    key: "requester",
                    header: <>Solicitante /<br />agente</>,
                    sortable: true,
                    render: (row) => <ApprovalTableRequesterCell requester={row.requester}/>
                },
                {
                    key: "risk",
                    header: "Risco",
                    sortable: true,
                    render: (row) => (<span className={cn("tcrm-approval-table__risk", `is-${row.risk}`)}>
                    <i aria-hidden="true"/>
                    {approvalTableRiskLabel[row.risk]}
                  </span>)
                },
                { key: "cost", header: <>Custo /<br />cota</>, sortable: true },
                {
                    key: "deadline",
                    header: "Prazo",
                    sortable: true,
                    render: (row) => <span className={cn("tcrm-approval-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
                },
                {
                    key: "status",
                    header: "Status",
                    sortable: true,
                    render: (row) => (<Chip className={cn("tcrm-approval-table__status", `is-${row.status}`)} showDot={false} tone={approvalTableStatusTone[row.status]}>
                    {approvalTableStatusLabel[row.status]}
                  </Chip>)
                },
                { key: "activity", header: "Última atividade", sortable: true }
            ]} density="dense" onRowClick={(row) => {
                if (!controlsDisabled && !row.disabled) {
                    onRowSelect?.(row);
                }
            }} rows={tableRows} selectedRowId={tableRows.find((row) => row.selected)?.id} sort={sort} onSortChange={setSort}/>
          <TablePagination className="tcrm-approval-table__pagination" itemsPerPageValue={itemsPerPage} label={String(pageLabel)} nextDisabled={controlsDisabled} onItemsPerPageClick={onItemsPerPageClick} onNext={onNextPage} onPrevious={onPreviousPage} page={1} pageCount={1} previousDisabled={controlsDisabled}/>
        </>) : (<EmptyState title="Nenhuma aprovação" description="As decisões que precisam de revisão humana aparecem aqui."/>)}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de aprovações está indisponível.</InlineAlert> : null}
    </Panel>);
}
