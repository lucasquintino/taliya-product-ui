/** Lead drawer pattern. */
import React from "react";
import { Button, Icon, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";
import type { CrmDrawerAction } from "./drawer-core.js";
import { EnrollmentChecklist } from "../domains/students/students-sales-core.js";
import type { PreflightChecklistItem } from "./agent-flow-workspace.js";

export type LeadDrawerState =
  | "interested"
  | "new"
  | "no-slot"
  | "ready"
  | "trial"
  | "trial-scheduled"
  | "trial-missed"
  | "trial-convert"
  | "enrollment"
  | "enrollment-missing"
  | "enrollment-payment"
  | "enrollment-ready"
  | "enrollment-converted"
  | "lost"
  | "loading"
  | "blocked";
export type LeadDrawerAction =
  | "close"
  | "open-conversation"
  | "qualify"
  | "schedule-trial"
  | "create-follow-up"
  | "create-task"
  | "move-stage"
  | "start-enrollment"
  | "mark-lost"
  | "more-actions"
  | "open-class"
  | "confirm-presence"
  | "reschedule"
  | "mark-attended"
  | "mark-absence"
  | "request-data"
  | "validate-enrollment"
  | "charge-payment"
  | "choose-first-class"
  | "convert-student";

export interface LeadDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  helper?: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface LeadDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface LeadDrawerChecklistItem {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  state?: PreflightChecklistItem["state"];
}

export interface LeadDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: LeadDrawerState;
  compact?: boolean;
  eyebrow?: React.ReactNode;
  name?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: LeadDrawerFact[];
  checklistTitle?: React.ReactNode;
  checklistItems?: LeadDrawerChecklistItem[];
  checklistProgressLabel?: React.ReactNode;
  history?: LeadDrawerHistoryItem[];
  copilotTitle?: React.ReactNode;
  copilotBody?: React.ReactNode;
  suggestedAction?: React.ReactNode;
  notice?: React.ReactNode;
  primaryAction?: { label: React.ReactNode; action: LeadDrawerAction; icon?: IconName; disabled?: boolean };
  secondaryActions?: Array<{ label: React.ReactNode; action: LeadDrawerAction; icon?: IconName; disabled?: boolean }>;
  onAction?: (action: LeadDrawerAction) => void;
  onChecklistToggle?: (item: LeadDrawerChecklistItem, checked: boolean) => void;
  onClose?: () => void;
}

const sourceLeadFacts: LeadDrawerFact[] = [
  { id: "channel", icon: "calendar", label: "Canal", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" },
  { id: "origin", icon: "users", label: "Origem", value: <><Icon name="whatsapp" size="12px" /> WhatsApp</>, tone: "success" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "interest", icon: "calendar", label: "Interesse", value: "começar Pilates" },
  { id: "schedule", icon: "clock", label: "Horário desejado", value: "terça à noite" },
  { id: "last", icon: "message", label: "Última conversa", value: "Perguntou sobre preço e horários", helper: "hoje 10:24" },
  { id: "next", icon: "sparkles", label: "Próxima ação recomendada", value: "Responder preço hoje" },
  { id: "objection", icon: "clock", label: "Objeção / motivo", value: "Quer entender valor e disponibilidade" },
  { id: "trial", icon: "graduation", label: "Experimental vinculada", value: "Nenhuma agendada ainda" },
  { id: "enrollment", icon: "calendar", label: "Pré-matrícula", value: "Ainda não iniciada" }
];

const sourceLeadHistory: LeadDrawerHistoryItem[] = [
  { id: "contact", time: "hoje 10:24", title: "Contato via WhatsApp", description: "Perguntou sobre preços e horários" },
  { id: "triage", time: "ontem 18:40", title: "Triagem concluída pela Recepção", description: "Interesse em começar Pilates" },
  { id: "start", time: "ontem 09:15", title: "Conversa inicial via WhatsApp", description: "Solicitou informações" }
];

function emitLeadDrawerAction(action: LeadDrawerAction, onAction?: (action: LeadDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function LeadDrawer({
  open = true,
  state = "interested",
  compact = false,
  eyebrow = "Interessado selecionado",
  name = "Ana Souza",
  statusLabel = "Qualificada",
  facts = sourceLeadFacts,
  checklistTitle,
  checklistItems,
  checklistProgressLabel,
  history = sourceLeadHistory,
  copilotTitle = "Copiloto sugere",
  copilotBody = <>Ana demonstrou interesse e pediu valores.<br />Sugestão: responder preço e horários disponíveis.</>,
  suggestedAction = "Ação sugerida: Responder preço hoje",
  notice = <><strong>A operação manual é sempre possível.</strong><small>O copiloto apenas sugere.</small></>,
  primaryAction = { label: "Abrir conversa", action: "open-conversation", icon: "whatsapp" },
  secondaryActions = [
    { label: "Agendar experimental", action: "schedule-trial", icon: "calendar" },
    { label: "Criar follow-up", action: "create-follow-up", icon: "checkCircle" },
    { label: "Mover etapa", action: "move-stage", icon: "refresh" },
    { label: "Iniciar matrícula", action: "start-enrollment", icon: "graduation" },
    { label: "Marcar perdido", action: "mark-lost", icon: "x" },
    { label: "Mais ações", action: "more-actions", icon: "moreVertical" }
  ],
  onAction,
  onChecklistToggle,
  onClose,
  className,
  ...props
}: LeadDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const drawerFacts = facts.map((fact) => ({
    id: fact.id,
    icon: fact.icon,
    label: fact.label,
    tone: fact.tone,
    value: <>{fact.value}{fact.helper ? <small>{fact.helper}</small> : null}</>
  }));
  const drawerActions: CrmDrawerAction[] = [
    {
      disabled: isBlocked || primaryAction.disabled,
      fullWidth: true,
      icon: primaryAction.icon,
      id: primaryAction.action,
      label: primaryAction.label,
      onClick: () => emitLeadDrawerAction(primaryAction.action, onAction),
      variant: "primary"
    },
    ...secondaryActions.map((action) => ({
      disabled: isBlocked || action.disabled,
      icon: action.icon,
      id: action.action,
      label: action.label,
      onClick: () => emitLeadDrawerAction(action.action, onAction),
      variant: "secondary" as const
    }))
  ];

  return (
    <CrmDrawer
      aria-label="Detalhes do interessado"
      actions={drawerActions}
      className={cn("tcrm-lead-drawer", `tcrm-lead-drawer--${state}`, compact && "tcrm-lead-drawer--compact", className)}
      closeLabel="Fechar interessado"
      component="LeadDrawer"
      eyebrow={eyebrow}
      facts={drawerFacts}
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={() => emitLeadDrawerAction("close", onAction, onClose)}
      sections={[
        ...(checklistItems?.length ? [{
          id: "checklist",
          variant: "card" as const,
          content: (
            <EnrollmentChecklist
              className="tcrm-lead-drawer__checklist"
              countLabel={checklistProgressLabel}
              items={checklistItems.map((item) => ({
                id: item.id,
                state: item.state ?? (item.checked ? "complete" : "incomplete"),
                title: item.label
              }))}
              onAction={onChecklistToggle ? (itemId) => {
                const item = checklistItems.find((candidate) => candidate.id === itemId);
                if (!item || isBlocked || item.disabled) return;
                onChecklistToggle(item, !item.checked);
              } : undefined}
              title={checklistTitle ?? "Checklist"}
            />
          )
        }] : []),
        {
          id: "history",
          title: "Histórico recente",
          trailing: <Button className="tcrm-lead-drawer__history-action" disabled={isBlocked} onClick={() => emitLeadDrawerAction("more-actions", onAction)} size="sm" type="button" variant="ghost">Ver todos</Button>,
          variant: "card",
          content: (
            <ol className="tcrm-lead-drawer__history-list">
              {history.map((item) => (
                <li key={item.id}>
                  <time>{item.time}</time>
                  <span><strong>{item.title}</strong><small>{item.description}</small></span>
                </li>
              ))}
            </ol>
          )
        },
        {
          id: "copilot",
          variant: "callout",
          content: (
            <div className="tcrm-lead-drawer__copilot-content">
              <Icon name="sparkles" size="28px" />
              <span>
                <strong>{copilotTitle}</strong>
                <p>{copilotBody}</p>
                {suggestedAction ? <Button disabled={isBlocked} onClick={() => emitLeadDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">{suggestedAction}</Button> : null}
              </span>
            </div>
          )
        },
        {
          id: "notice",
          variant: "plain",
          content: <p className="tcrm-lead-drawer__notice"><Icon name="info" size="15px" /><span>{notice}</span></p>
        }
      ]}
      state={state}
      status={statusLabel}
      title={name}
      {...props}
    />
  );
}
