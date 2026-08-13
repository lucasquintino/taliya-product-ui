/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import type { ComponentTone, StatusDotStatus } from "@taliya/ui";

import { StudentTableState } from "./worklist-approval.js";

export type StudentTableStatus = "active" | "paused" | "delinquent" | "risk" | "noClass" | "inactive";

export type StudentTableFinance = "ok" | "pending" | "overdue";

export type StudentTableRisk = "low" | "medium" | "high" | "none";

export interface StudentTablePerson {
    name: React.ReactNode;
    avatarSrc?: string;
    initials?: string;
}

export interface StudentTableActivity {
    label: React.ReactNode;
    status?: StatusDotStatus;
}

export interface StudentTableRow {
    id: string;
    student: StudentTablePerson;
    status: StudentTableStatus;
    plan: React.ReactNode;
    currentClass: React.ReactNode;
    owner: React.ReactNode;
    presence: React.ReactNode;
    finance: StudentTableFinance;
    risk: StudentTableRisk;
    activity: StudentTableActivity;
    selected?: boolean;
    disabled?: boolean;
}

export interface StudentTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: StudentTableState;
    density?: "standard" | "compact";
    selectionTone?: "marker" | "soft";
    rows?: StudentTableRow[];
    pageLabel?: React.ReactNode;
    itemsPerPage?: React.ReactNode;
    onRowSelect?: (row: StudentTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
}

export const studentTableStatusLabel: Record<StudentTableStatus, string> = {
    active: "Ativa",
    paused: "Pausada",
    delinquent: "Inadimplente",
    risk: "Em risco",
    noClass: "Sem turma",
    inactive: "Inativa"
};

export const studentTableStatusTone: Record<StudentTableStatus, ComponentTone> = {
    active: "success",
    paused: "neutral",
    delinquent: "danger",
    risk: "danger",
    noClass: "info",
    inactive: "neutral"
};

export const studentTableFinanceLabel: Record<StudentTableFinance, React.ReactNode> = {
    ok: "OK",
    pending: <>pagamento<br />pendente</>,
    overdue: <>em<br />atraso</>
};

export const studentTableFinanceAccessibleLabel: Record<StudentTableFinance, string> = {
    ok: "OK",
    pending: "Pagamento pendente",
    overdue: "Em atraso"
};

export const studentTableFinanceTone: Record<StudentTableFinance, ComponentTone> = {
    ok: "success",
    pending: "warning",
    overdue: "danger"
};

export const studentTableRiskLabel: Record<StudentTableRisk, string> = {
    low: "baixo",
    medium: "médio",
    high: "alto",
    none: "—"
};

export const studentTableRiskTone: Record<StudentTableRisk, ComponentTone> = {
    low: "success",
    medium: "warning",
    high: "danger",
    none: "neutral"
};
