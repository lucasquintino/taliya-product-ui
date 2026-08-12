/** Checklist drawer pattern. */
import React from "react";
import { Avatar, Badge, Button, Icon, ProgressBar, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type ChecklistDrawerState = "open" | "blocked" | "completed" | "loading";
export type ChecklistDrawerStepState = "done" | "pending" | "warning";

export interface ChecklistDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger" | "info";
  avatarSrc?: string;
}

export interface ChecklistDrawerStep {
  id: string;
  title: React.ReactNode;
  state?: ChecklistDrawerStepState;
  helperText?: React.ReactNode;
  disabled?: boolean;
}

export interface ChecklistDrawerComment {
  id: string;
  author: React.ReactNode;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
}

export interface ChecklistDrawerActivity {
  id: string;
  icon?: IconName;
  time: React.ReactNode;
  body: React.ReactNode;
}

export interface ChecklistDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  open?: boolean;
  state?: ChecklistDrawerState;
  title?: React.ReactNode;
  label?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: ChecklistDrawerFact[];
  steps?: ChecklistDrawerStep[];
  completedSteps?: number;
  totalSteps?: number;
  activity?: ChecklistDrawerActivity;
  comment?: ChecklistDrawerComment;
  primaryActionLabel?: React.ReactNode;
  onClose?: () => void;
  onStepToggle?: (step: ChecklistDrawerStep, checked: boolean) => void;
  onPrimaryAction?: () => void;
  onAssign?: () => void;
  onOpenTask?: () => void;
  onComplete?: () => void;
  onOpenOrigin?: () => void;
}

const sourceChecklistDrawerSteps: ChecklistDrawerStep[] = [
  { id: "open-reception", title: "Abrir recepção", state: "done" },
  { id: "check-agenda", title: "Conferir agenda do dia", state: "done" },
  { id: "prepare-rooms", title: "Preparar salas", state: "done" },
  { id: "validate-teachers", title: "Validar professores confirmados", state: "warning", helperText: "1 professor ainda não confirmou" },
  { id: "payments", title: "Revisar pagamentos críticos", state: "pending" }
];

const sourceChecklistDrawerFacts: ChecklistDrawerFact[] = [
  { id: "status", icon: "calendar", label: "Status", value: <><span className="tcrm-checklist-drawer__status-dot" aria-hidden="true" />Em andamento</>, tone: "info" },
  { id: "owner", icon: "user", label: "Responsável", value: "Mariana" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje 08:00", tone: "danger" },
  { id: "progress", icon: "clock", label: "Progresso", value: "3/5" }
];

const sourceChecklistDrawerActivity: ChecklistDrawerActivity = {
  id: "latest",
  icon: "clock",
  time: "07:42",
  body: <>Mariana marcou "Preparar salas" como concluído</>
};

const sourceChecklistDrawerComment: ChecklistDrawerComment = {
  id: "mariana",
  author: "Mariana",
  body: "Recepção aberta. Sala 2 ainda aguardando confirmação do professor.",
  time: "07:45",
  avatarSrc: undefined
};

function checklistStepIconForState(state: ChecklistDrawerStepState) {
  if (state === "done") return <Icon name="check" size={10} />;
  if (state === "warning") return <Icon name="alert" size={10} />;
  return null;
}

export function ChecklistDrawer({
  open = true,
  state = "open",
  title = "Abertura do estúdio",
  label = "Checklist",
  statusLabel,
  facts = sourceChecklistDrawerFacts,
  steps = sourceChecklistDrawerSteps,
  completedSteps,
  totalSteps,
  activity = sourceChecklistDrawerActivity,
  comment = sourceChecklistDrawerComment,
  primaryActionLabel = "Continuar",
  onClose,
  onStepToggle,
  onPrimaryAction,
  onAssign,
  onOpenTask,
  onComplete,
  onOpenOrigin,
  className,
  ...props
}: ChecklistDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const controlsDisabled = isLoading || isBlocked || state === "completed";
  const completed = completedSteps ?? steps.filter((step) => step.state === "done").length;
  const total = totalSteps ?? steps.length;
  const progressValue = Math.round((completed / Math.max(total, 1)) * 100);

  return (
    <CrmDrawer
      aria-label="Detalhes do checklist"
      body={
        <>
          <dl className="tcrm-checklist-drawer__facts">
            {facts.map((fact) => (
              <div className={cn("tcrm-checklist-drawer__fact", fact.tone && `tcrm-checklist-drawer__fact--${fact.tone}`)} key={fact.id}>
                <Icon name={fact.icon} size="sm" />
                <dt>{fact.label}</dt>
                <dd>
                  {fact.tone === "danger" ? <Icon name="alert" size={13} /> : null}
                  {fact.avatarSrc ? <Avatar name={String(fact.value)} size="xs" src={fact.avatarSrc} /> : null}
                  {fact.value}
                  {fact.id === "progress" ? <ProgressBar className="tcrm-checklist-drawer__progress" label="Progresso do checklist" value={progressValue} /> : null}
                </dd>
              </div>
            ))}
          </dl>

          <section className="tcrm-checklist-drawer__steps" aria-label="Passos">
            <header className="tcrm-checklist-drawer__section-header">
              <h3>Passos</h3>
              <Badge className="tcrm-checklist-drawer__count">{completed} / {total}</Badge>
            </header>
            <ul>
              {steps.map((step, index) => {
                const stepState = step.state ?? "pending";
                const checked = stepState === "done";
                return (
                  <li className={cn("tcrm-checklist-drawer__step", `is-${stepState}`)} key={step.id}>
                    <Button
                      aria-pressed={checked}
                      className="tcrm-checklist-drawer__step-button"
                      disabled={controlsDisabled || step.disabled}
                      onClick={() => onStepToggle?.(step, !checked)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      <span aria-hidden="true" className="tcrm-checklist-drawer__step-indicator">
                        {checklistStepIconForState(stepState)}
                      </span>
                      <span className="tcrm-checklist-drawer__step-copy">
                        <span><b>{index + 1}.</b>{step.title}</span>
                        {step.helperText ? <small>{step.helperText}</small> : null}
                      </span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="tcrm-checklist-drawer__activity" aria-label="Última atividade">
            <h3>Última atividade</h3>
            <p>
              {activity.icon ? <Icon name={activity.icon} size="sm" /> : null}
              <time>{activity.time}</time>
              <span>{activity.body}</span>
            </p>
          </section>

          {comment ? (
            <section className="tcrm-checklist-drawer__comment" aria-label="Comentário recente">
              <h3>Comentário recente</h3>
              <div>
                <Avatar name={String(comment.author)} size="sm" src={comment.avatarSrc} />
                <span>
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                </span>
                <time>{comment.time}</time>
              </div>
            </section>
          ) : null}
        </>
      }
      className={cn("tcrm-task-drawer tcrm-checklist-drawer", `tcrm-checklist-drawer--${state}`, className)}
      closeLabel="Fechar checklist"
      component="ChecklistDrawer"
      footer={
        <>
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--primary" disabled={controlsDisabled} onClick={onPrimaryAction} size="sm" variant="primary">
            {primaryActionLabel}
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onAssign} size="sm" variant="secondary">
            Atribuir
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onOpenTask} size="sm" variant="secondary">
            Abrir tarefa
          </Button>
          <Button className="tcrm-checklist-drawer__action" disabled={controlsDisabled} onClick={onComplete} size="sm" variant="secondary">
            Concluir
          </Button>
          <Button className="tcrm-checklist-drawer__action tcrm-checklist-drawer__action--origin" disabled={isLoading} onClick={onOpenOrigin} size="sm" variant="secondary">
            Abrir origem
          </Button>
        </>
      }
      eyebrow={label}
      loading={isLoading}
      onClose={onClose}
      state={state}
      status={state === "completed" ? "Concluído" : statusLabel}
      title={title}
      {...props}
    />
  );
}
