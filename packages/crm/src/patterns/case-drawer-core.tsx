/** Case drawer contracts and helpers. */
import React from "react";
import type { ComponentTone, IconName } from "@taliya/ui";

export type CaseDrawerState =
  | "open"
  | "waiting"
  | "blocked"
  | "resolved"
  | "loading"
  | "risk-low"
  | "risk-medium"
  | "risk-high"
  | "followed"
  | "cancellation-open"
  | "cancellation-saving"
  | "cancellation-paused"
  | "cancellation-cancelled"
  | "cancellation-recovered"
  | "reactivation-eligible"
  | "reactivation-returning"
  | "reactivation-do-not-contact"
  | "reactivated"
  | "complaint-severe"
  | "complaint-waiting"
  | "complaint-paused"
  | "complaint-resolved";
export type CaseDrawerAction =
  | "open-origin"
  | "assume"
  | "delegate"
  | "create-task"
  | "create-case"
  | "request-approval"
  | "correct"
  | "resolve"
  | "move-status"
  | "close"
  | "message"
  | "save"
  | "pause"
  | "pause-automation"
  | "cancel"
  | "start-return"
  | "reserve"
  | "do-not-contact"
  | "classify"
  | "escalate"
  | "open-profile"
  | "open-conversation";

export interface CaseDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger";
}

export interface CaseDrawerAlternative {
  id: string;
  title: React.ReactNode;
  capacity: React.ReactNode;
  status: React.ReactNode;
  tone?: "warning" | "success";
}

export interface CaseDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  label: React.ReactNode;
  tone?: ComponentTone;
}

export interface CaseDrawerRestrictionItem {
  id: string;
  label: React.ReactNode;
}

export interface CaseDrawerFooterAction {
  id: CaseDrawerAction;
  label: React.ReactNode;
  variant?: "primary" | "secondary";
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  disabled?: boolean;
  fullWidth?: boolean;
}

export type CaseDrawerSectionKind = "text" | "list" | "facts" | "alert" | "steps" | "checklist" | "copilot" | "actions" | "history";

export interface CaseDrawerSectionItem {
  id: string;
  label: React.ReactNode;
  tone?: ComponentTone;
  meta?: React.ReactNode;
}

export interface CaseDrawerSection {
  id: string;
  title: React.ReactNode;
  kind?: CaseDrawerSectionKind;
  description?: React.ReactNode;
  items?: CaseDrawerSectionItem[];
  icon?: IconName;
  tone?: ComponentTone;
  note?: React.ReactNode;
}

export interface CaseDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: CaseDrawerState;
  title?: React.ReactNode;
  avatarSrc?: string;
  eyebrowLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: CaseDrawerFact[];
  factsLayout?: "list" | "grid";
  alternatives?: CaseDrawerAlternative[];
  alternativesTitle?: React.ReactNode;
  alternativesVariant?: "options" | "steps";
  numberedSections?: boolean;
  suggestion?: React.ReactNode;
  messageQuotaLabel?: React.ReactNode;
  showMessageSuggestion?: boolean;
  restrictions?: CaseDrawerRestrictionItem[];
  restrictionsTitle?: React.ReactNode;
  history?: CaseDrawerHistoryItem[];
  sections?: CaseDrawerSection[];
  footerActions?: CaseDrawerFooterAction[];
  density?: "default" | "compact";
  onAction?: (action: CaseDrawerAction) => void;
  onClose?: () => void;
}

export const sourceCaseDrawerFacts: CaseDrawerFact[] = [
  { id: "origin", icon: "calendar", label: "Origem", value: "Agenda / Reposições" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje", tone: "danger" },
  { id: "impact", icon: "shieldCheck", label: "Impacto", value: "Ana está sem reposição confirmada" },
  { id: "reason", icon: "clock", label: "Motivo do bloqueio", value: "Turma atual sem vaga" },
  { id: "operation", icon: "lock", label: <>Motivo de estar<br />em Operação</>, value: <>Precisa acompanhamento<br />até destravar</> },
  { id: "next", icon: "clock", label: "Próxima ação recomendada", value: "Encontrar opção de horário" }
];

export const sourceCaseDrawerAlternatives: CaseDrawerAlternative[] = [
  { id: "tuesday", title: "Turma terça 17h", capacity: "1 vaga", status: "depende de confirmação", tone: "warning" },
  { id: "thursday", title: "Turma quinta 08h", capacity: "1 vaga", status: "1 vaga disponível", tone: "success" }
];

export const sourceCaseDrawerHistory: CaseDrawerHistoryItem[] = [
  { id: "asked", time: "09:10", label: "Ana pediu reposição pelo WhatsApp" },
  { id: "no-slot", time: "09:14", label: "sistema não encontrou vaga na turma atual" },
  { id: "assumed", time: "09:20", label: "recepção assumiu a pendência" }
];

export const sourceCaseDrawerFooterActions: CaseDrawerFooterAction[] = [
  { id: "open-origin", label: "Abrir origem", variant: "primary", fullWidth: true },
  { id: "assume", label: "Assumir" },
  { id: "delegate", label: "Delegar" },
  { id: "create-task", label: "Criar tarefa" },
  { id: "request-approval", label: "Pedir aprovação" },
  { id: "resolve", label: "Marcar resolvido" },
  { id: "move-status", label: "Mover status", trailingIcon: "chevronDown" }
];

export function emitCaseDrawerAction(action: CaseDrawerAction, onAction?: (action: CaseDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}
