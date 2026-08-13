/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import type { IconName } from "@taliya/ui";

import { ApprovalTableState } from "./worklist-checklist.js";

export type ApprovalTableType = "message" | "agenda" | "finance" | "announcement" | "agent" | "data";

export type ApprovalTableRisk = "low" | "medium" | "high";

export type ApprovalTableStatus = "pending" | "review" | "blocked" | "expired" | "approved" | "rejected";

export interface ApprovalTableRequester {
    name: React.ReactNode;
    avatarSrc?: string;
    icon?: IconName;
}

export interface ApprovalTableRow {
    id: string;
    index: number;
    title: React.ReactNode;
    type: ApprovalTableType;
    origin: React.ReactNode;
    requester: ApprovalTableRequester;
    risk: ApprovalTableRisk;
    cost: React.ReactNode;
    deadline: React.ReactNode;
    deadlineTone?: "default" | "danger";
    status: ApprovalTableStatus;
    activity: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
}

export interface ApprovalTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: ApprovalTableState;
    rows?: ApprovalTableRow[];
    pageLabel?: React.ReactNode;
    itemsPerPage?: React.ReactNode;
    onRowSelect?: (row: ApprovalTableRow) => void;
    onItemsPerPageClick?: () => void;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
}

export const approvalTableTypeLabel: Record<ApprovalTableType, string> = {
    message: "Mensagem",
    agenda: "Agenda",
    finance: "Financeiro",
    announcement: "Comunicado",
    agent: "Agente",
    data: "Dados"
};

export const approvalTableTypeIcon: Record<ApprovalTableType, IconName> = {
    message: "message",
    agenda: "calendar",
    finance: "wallet",
    announcement: "send",
    agent: "user",
    data: "database"
};

export const approvalTableRiskLabel: Record<ApprovalTableRisk, string> = {
    low: "Baixo",
    medium: "Médio",
    high: "Alto"
};

export const approvalTableStatusLabel: Record<ApprovalTableStatus, React.ReactNode> = {
    pending: "Pendente",
    review: "Em revisão",
    blocked: <>Bloqueada<br />por política</>,
    expired: "Expirada",
    approved: "Aprovada",
    rejected: "Rejeitada"
};
