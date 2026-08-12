/** Class drawer pattern. */
import React from "react";
import { Avatar, Button, Chip, Icon, IconButton, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";
import { Roster } from "../domains/agenda/index.js";

export type ClassDrawerState = "open" | "conflict" | "calling" | "saved" | "blocked" | "loading";
export type AttendanceStatus = "pending" | "present" | "warned" | "no-show" | "replacement";
export type ClassDrawerAction =
  | "close"
  | "save-call"
  | "add-note"
  | "create-task"
  | "correct-later"
  | "open-schedule"
  | "open-class"
  | "view-demand"
  | "open-grid"
  | "move-student"
  | "notify-class"
  | "pause-class"
  | "edit-class";

export interface ClassDrawerStudent {
  id: string;
  name: string;
  initials?: string;
  avatarSrc?: string;
  status: AttendanceStatus;
  helper?: React.ReactNode;
}

export interface ClassDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
}

export interface ClassDrawerTimelineItem {
  id: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  tone?: "success" | "warning" | "danger" | "info";
}

export interface ClassDrawerImpactItem {
  id: string;
  icon: IconName;
  label: React.ReactNode;
}

export interface ClassDrawerBlockNotice {
  title: React.ReactNode;
  description: React.ReactNode;
  types?: React.ReactNode;
  actionLabel?: React.ReactNode;
  action?: ClassDrawerAction;
}

export interface ClassDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: ClassDrawerState;
  compact?: boolean;
  variant?: "attendance" | "class-detail" | "recurring-block";
  ariaLabel?: string;
  closeLabel?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  summary?: React.ReactNode;
  facts?: ClassDrawerFact[];
  availabilityNotice?: React.ReactNode;
  availabilityTone?: "success" | "warning" | "info";
  upcomingClasses?: ClassDrawerTimelineItem[];
  historyItems?: ClassDrawerTimelineItem[];
  impactItems?: ClassDrawerImpactItem[];
  blockNotice?: ClassDrawerBlockNotice;
  warning?: React.ReactNode;
  rosterHeading?: React.ReactNode;
  rosterStatus?: { label: React.ReactNode; tone?: ComponentTone };
  showStudentStatus?: boolean;
  students?: ClassDrawerStudent[];
  copilot?: React.ReactNode;
  audit?: React.ReactNode;
  primaryAction?: { label: React.ReactNode; action: ClassDrawerAction; icon?: IconName };
  secondaryActions?: Array<{ label: React.ReactNode; action: ClassDrawerAction; icon?: IconName }>;
  actionPlacement?: "footer" | "content";
  actionHeading?: React.ReactNode;
  onClose?: () => void;
  onAction?: (action: ClassDrawerAction) => void;
  onStudentStatus?: (student: ClassDrawerStudent) => void;
}

const sourceClassDrawerStudents: ClassDrawerStudent[] = [
  { id: "ana-carolina", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
  { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
  { id: "felipe", name: "Felipe Andrade", status: "warned", helper: "gera crédito" },
  { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
  { id: "juliana", name: "Juliana Costa", status: "replacement", helper: "reposição usada" }
];

const classDrawerStudentStatus: Record<AttendanceStatus, { label: string; tone?: ComponentTone }> = {
  pending: { label: "Pendente" },
  present: { label: "Presente", tone: "success" },
  warned: { label: "Falta avisada", tone: "warning" },
  "no-show": { label: "No-show", tone: "danger" },
  replacement: { label: "Reposição", tone: "info" }
};

function emitClassDrawerAction(action: ClassDrawerAction, onAction?: (action: ClassDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ClassDrawer({
  open = true,
  state = "calling",
  compact = false,
  variant = "attendance",
  ariaLabel = "Chamada da aula",
  closeLabel = "Fechar chamada",
  eyebrow,
  title = "Chamada",
  subtitle = "Terça 17h · Reformer Intermediário",
  summary,
  facts,
  availabilityNotice,
  availabilityTone = "success",
  upcomingClasses,
  historyItems,
  impactItems,
  blockNotice,
  warning,
  rosterHeading,
  rosterStatus,
  showStudentStatus = false,
  students = sourceClassDrawerStudents,
  copilot = <><strong>Copiloto: Felipe avisou falta dentro da política.</strong><span>Crédito pode ser gerado.</span></>,
  audit = <><Icon name="info" size="15px" /> Chamada é auditável e salva por humano.</>,
  primaryAction = { label: "Salvar chamada", action: "save-call" },
  secondaryActions = [
    { label: "Adicionar observação", action: "add-note" },
    { label: "Criar tarefa", action: "create-task" },
    { label: "Corrigir depois", action: "correct-later" }
  ],
  actionPlacement = "footer",
  actionHeading,
  onClose,
  onAction,
  onStudentStatus,
  className,
  ...props
}: ClassDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;

  const drawerHeader = (
    <header className="tcrm-class-drawer__header">
      <div>
        {eyebrow ? <Chip className="tcrm-class-drawer__eyebrow" showDot={false}>{eyebrow}</Chip> : null}
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <IconButton className="tcrm-class-drawer__close" disabled={isLoading} icon="x" label={closeLabel} onClick={() => emitClassDrawerAction("close", onAction, onClose)} size="sm" variant="default" />
    </header>
  );

  const drawerFooter = (
    <div className={cn("tcrm-class-drawer__footer", variant === "class-detail" && actionPlacement === "content" && "tcrm-class-drawer__footer--content")}>
      {actionHeading ? <h3 className="tcrm-class-drawer__action-heading">{actionHeading}</h3> : null}
      <Button className="tcrm-class-drawer__save" disabled={isBlocked} leadingIcon={primaryAction.icon} onClick={() => emitClassDrawerAction(primaryAction.action, onAction)} size="sm" variant="primary">{primaryAction.label}</Button>
      {secondaryActions.map((item) => (
        <Button className="tcrm-class-drawer__action" disabled={isBlocked} key={item.action} leadingIcon={item.icon} onClick={() => emitClassDrawerAction(item.action, onAction)} size="sm" variant="secondary">{item.label}</Button>
      ))}
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn(
        "tcrm-class-drawer",
        `tcrm-class-drawer--${state}`,
        variant !== "attendance" && `tcrm-class-drawer--${variant}`,
        compact && "tcrm-class-drawer--compact",
        className
      )}
      component="ClassDrawer"
      footer={variant === "recurring-block" || (variant === "class-detail" && actionPlacement === "content") ? undefined : drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      {variant === "recurring-block" ? (
        <>
          {facts?.length ? (
            <dl className="tcrm-class-drawer__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-class-drawer__fact", fact.tone && `tcrm-class-drawer__fact--${fact.tone}`)} key={fact.id}>
                  <Icon name={fact.icon} size="14px" />
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {upcomingClasses?.length ? (
            <section className="tcrm-class-drawer__recurring-section" aria-label="Próximas aulas geradas">
              <h3>Próximas aulas geradas</h3>
              <ul>
                {upcomingClasses.map((item) => <li key={item.id}><Icon name="calendar" size="14px" /><span>{item.label}</span></li>)}
              </ul>
            </section>
          ) : null}

          {impactItems?.length ? (
            <section className="tcrm-class-drawer__recurring-section" aria-label="Impacto de alteração">
              <h3>Impacto de alteração</h3>
              <ul>
                {impactItems.map((item) => <li key={item.id}><Icon name={item.icon} size="14px" /><span>{item.label}</span></li>)}
              </ul>
            </section>
          ) : null}

          {drawerFooter}

          {blockNotice ? (
            <section className="tcrm-class-drawer__block-notice" aria-label={String(blockNotice.title)}>
              <h3>{blockNotice.title}</h3>
              {blockNotice.types ? <p>{blockNotice.types}</p> : null}
              <p>{blockNotice.description}</p>
              <Button onClick={() => emitClassDrawerAction(blockNotice.action ?? "create-task", onAction)} size="sm" variant="ghost">{blockNotice.actionLabel ?? "Criar bloqueio"}</Button>
            </section>
          ) : null}
        </>
      ) : variant === "class-detail" ? (
        <>
          {facts?.length ? (
            <dl className="tcrm-class-drawer__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-class-drawer__fact", fact.tone && `tcrm-class-drawer__fact--${fact.tone}`)} key={fact.id}>
                  <Icon name={fact.icon} size="14px" />
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {(rosterHeading || rosterStatus) ? (
            <div className="tcrm-class-drawer__section-heading">
              {rosterHeading ? <h3 className="tcrm-class-drawer__section-title">{rosterHeading}</h3> : null}
              {rosterStatus ? <Chip className="tcrm-class-drawer__roster-status" showDot={false} tone={rosterStatus.tone}>{rosterStatus.label}</Chip> : null}
            </div>
          ) : null}
          <ul className={cn("tcrm-class-drawer__fixed-students", showStudentStatus && "tcrm-class-drawer__fixed-students--with-status")} aria-label={String(rosterHeading ?? "Alunos fixos")}>
            {students.map((student) => (
              <li data-attendance={student.status} key={student.id}>
                <Avatar name={student.name} size="xs" src={student.avatarSrc}>{student.initials}</Avatar>
                <span>{student.name}</span>
                {showStudentStatus ? (
                  <Chip className="tcrm-class-drawer__student-status" showDot={false} tone={classDrawerStudentStatus[student.status].tone}>
                    {classDrawerStudentStatus[student.status].label}
                  </Chip>
                ) : null}
              </li>
            ))}
          </ul>

          {availabilityNotice ? (
            <p className={cn("tcrm-class-drawer__availability", `tcrm-class-drawer__availability--${availabilityTone}`)}>
              <Icon name="info" size="14px" />
              {availabilityNotice}
            </p>
          ) : null}

          {(upcomingClasses?.length || historyItems?.length) ? (
            <div className="tcrm-class-drawer__split">
              {upcomingClasses?.length ? (
                <section aria-label="Proximas aulas">
                  <h3>Proximas aulas</h3>
                  <ul>
                    {upcomingClasses.map((item) => (
                      <li key={item.id}>
                        <Icon name="calendar" size="14px" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {historyItems?.length ? (
                <section aria-label="Historico recente">
                  <h3>Historico recente</h3>
                  <ul>
                    {historyItems.map((item) => (
                      <li className={item.tone ? `tcrm-class-drawer__history--${item.tone}` : undefined} key={item.id}>
                        <span aria-hidden="true" />
                        <p>{item.label}{item.meta ? <small>{item.meta}</small> : null}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}

          {warning ? (
            <p className="tcrm-class-drawer__warning">
              <Icon name="alert" size="14px" />
              {warning}
            </p>
          ) : null}

          {actionPlacement === "content" ? drawerFooter : null}
        </>
      ) : (
        <>
          <p className="tcrm-class-drawer__summary" aria-label="Resumo da chamada">
            {summary ?? (
              <>
                <span className="tcrm-class-drawer__summary--pending">1 pendente</span>
                <span className="tcrm-class-drawer__summary--present">1 presente</span>
                <span className="tcrm-class-drawer__summary--warned">1 falta avisada</span>
                <span className="tcrm-class-drawer__summary--no-show">1 no-show</span>
                <span className="tcrm-class-drawer__summary--replacement">1 reposição</span>
              </>
            )}
          </p>

          {rosterHeading ? <h3 className="tcrm-class-drawer__section-title">{rosterHeading}</h3> : null}
          <Roster
            className="tcrm-class-drawer__roster"
            disabled={isBlocked}
            onStudentStatus={(student) => onStudentStatus?.(student as ClassDrawerStudent)}
            students={students}
          />
        </>
      )}

      <section className="tcrm-class-drawer__copilot" aria-label="Sugestão do copiloto">
        <Icon name="sparkles" size="28px" />
        <p>{copilot}</p>
      </section>

      <p className="tcrm-class-drawer__audit">{audit}</p>
    </CrmDrawer>
  );
}
