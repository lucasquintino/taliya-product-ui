/** Agenda, calendar and class-operation presentation compositions. */
import React from "react";
import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListIcon,
  ListItem,
  SegmentedControl,
  Avatar,
  cn
} from "@taliya/ui";
import type {
  ComponentTone
} from "@taliya/ui";

import { MiniCalendar, type MiniCalendarCell } from "./mini-calendar.js";
import { WeeklyCalendar, type WeeklyCalendarEvent, type WeeklyCalendarReferenceEvent } from "./weekly-calendar.js";
import { ClassCard, stateKey } from "./class-card.js";
export { ClassCard, MiniCalendar, WeeklyCalendar };
export type { MiniCalendarCell, WeeklyCalendarEvent, WeeklyCalendarReferenceEvent };

export interface CompactCalendarItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  meta: React.ReactNode;
  tone?: ComponentTone;
}

const compactCalendarSourceItems: CompactCalendarItem[] = [
  { id: "restriction", time: "10:30", title: "Restricao de conta", meta: "Joao Silva", tone: "info" },
  { id: "email", time: "11:30", title: "Falha no envio de e-mail", meta: "Maria Claro", tone: "danger" },
  { id: "report", time: "15:00", title: "Revisao de relatorio", meta: "Sam Frank", tone: "warning" }
];

export function CompactCalendar({
  monthLabel = "Abril 2024",
  selected = "9",
  today = "18",
  selectedDateLabel = "Terca, 9 de Abril",
  items = compactCalendarSourceItems,
  view = "month",
  disabled = false,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onViewChange,
  onSelect,
  onEventOpen,
  onCreate,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  monthLabel?: React.ReactNode;
  selected?: string;
  today?: string;
  selectedDateLabel?: React.ReactNode;
  items?: CompactCalendarItem[];
  view?: "month" | "week" | "day";
  disabled?: boolean;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onToday?: () => void;
  onViewChange?: (value: "month" | "week" | "day") => void;
  onSelect?: (day: string) => void;
  onEventOpen?: (item: CompactCalendarItem) => void;
  onCreate?: () => void;
}) {
  return (
    <section aria-label="Calendario compacto" className={cn("tcrm-compact-calendar", className)} data-component="CompactCalendar" {...props}>
      <header className="tcrm-compact-calendar__header">
        <strong>{monthLabel}</strong>
        <div className="tcrm-compact-calendar__navigation">
          <IconButton disabled={disabled} icon="chevronLeft" label="Mes anterior" onClick={onPreviousMonth} size="sm" variant="ghost" />
          <IconButton disabled={disabled} icon="chevronRight" label="Proximo mes" onClick={onNextMonth} size="sm" variant="ghost" />
          <Button disabled={disabled} onClick={onToday} size="sm" variant="secondary">Hoje</Button>
        </div>
        <SegmentedControl
          compact
          label="Visualizacao do calendario"
          onChange={(value: string) => onViewChange?.(value as "month" | "week" | "day")}
          options={[
            { value: "month", label: "Mes", disabled },
            { value: "week", label: "Semana", disabled },
            { value: "day", label: "Dia", disabled }
          ]}
          value={view}
        />
      </header>
      <div className="tcrm-compact-calendar__body">
        <MiniCalendar blocked={disabled} monthLabel={String(monthLabel)} onSelect={onSelect} selected={selected} showHeader={false} today={today} />
        <section className="tcrm-compact-calendar__agenda" aria-label={String(selectedDateLabel)}>
          <strong>{selectedDateLabel}</strong>
          <List dense divided>
            {items.map((item) => (
              <ListItem
                action={<IconButton disabled={disabled} icon="chevronRight" label={`Abrir ${String(item.title)}`} onClick={() => onEventOpen?.(item)} size="sm" variant="ghost" />}
                key={item.id}
                leading={<ListIcon icon="circle" tone={item.tone ?? "neutral"} />}
                meta={item.meta}
                title={<><span>{item.time}</span> {item.title}</>}
              />
            ))}
          </List>
          <Button disabled={disabled} leadingIcon="plus" onClick={onCreate} size="sm" variant="secondary">Novo compromisso</Button>
        </section>
      </div>
    </section>
  );
}

export type RosterAttendanceStatus = "pending" | "present" | "warned" | "no-show" | "replacement" | "absent" | "corrected";

export interface RosterStudent {
  id: string;
  name: string;
  initials?: string;
  avatarSrc?: string;
  state?: RosterAttendanceStatus;
  status?: RosterAttendanceStatus;
  meta?: React.ReactNode;
  helper?: React.ReactNode;
  observation?: React.ReactNode;
  credit?: React.ReactNode;
}

const rosterStatusCopy: Record<RosterAttendanceStatus, { label: string; className: string }> = {
  pending: { label: "Pendente", className: "pending" },
  present: { label: "Presente", className: "present" },
  warned: { label: "Falta avisada", className: "warned" },
  absent: { label: "Falta avisada", className: "warned" },
  "no-show": { label: "No-show", className: "no-show" },
  replacement: { label: "Reposição", className: "replacement" },
  corrected: { label: "Reposição", className: "replacement" }
};

function normalizeRosterStudent(student: RosterStudent | string, index: number): RosterStudent {
  if (typeof student !== "string") {
    const status = student.status ?? student.state ?? (index === 0 ? "pending" : "present");
    return { ...student, status };
  }

  return {
    id: index === 0 ? "ana" : stateKey(student),
    name: student,
    status: index === 1 ? "warned" : "present"
  };
}

export function Roster({
  students = [
    { id: "ana", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
    { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
    { id: "felipe", name: "Felipe Andrade", status: "warned", helper: "gera crédito" },
    { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
    { id: "juliana", name: "Juliana Costa", status: "replacement", helper: "reposição usada" }
  ],
  onStudentAction,
  onStudentStatus,
  disabled = false,
  variant = "attendance",
  className
}: {
  students?: Array<RosterStudent | string>;
  onStudentAction?: (studentId: string) => void;
  onStudentStatus?: (student: RosterStudent) => void;
  disabled?: boolean;
  variant?: "attendance" | "expected" | "reference";
  className?: string;
}) {
  if (variant === "reference") {
    return (
      <div className={cn("tcrm-roster-reference", className)} data-component="Roster" data-variant="reference" role="table" aria-label="Roster de chamada">
        <div className="tcrm-roster-reference__header" role="row">
          <span role="columnheader" />
          <span role="columnheader">Esperado</span>
          <span role="columnheader">Presente</span>
          <span role="columnheader">Falta</span>
          <span role="columnheader">No-show</span>
          <span role="columnheader">Observacao</span>
          <span role="columnheader">Credito reposicao</span>
        </div>
        {students.map((sourceStudent, index) => {
          const student = normalizeRosterStudent(sourceStudent, index);
          const status = student.status ?? student.state ?? "pending";
          const emit = () => {
            onStudentAction?.(student.id);
            onStudentStatus?.(student);
          };
          return (
            <div className="tcrm-roster-reference__row" key={student.id} role="row">
              <span className="tcrm-roster-reference__student" role="cell"><Avatar name={student.name} size="xs" src={student.avatarSrc} /> {student.name}</span>
              <span role="cell"><Checkbox aria-label={`${student.name}: esperado`} checked={status === "pending"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: presente`} checked={status === "present"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: falta`} checked={status === "warned" || status === "absent"} disabled={disabled} onChange={emit} /></span>
              <span role="cell"><Checkbox aria-label={`${student.name}: no-show`} checked={status === "no-show"} disabled={disabled} onChange={emit} /></span>
              <span role="cell">{student.observation ?? student.helper ?? "-"}</span>
              <span role="cell">{student.credit ?? (status === "warned" || status === "no-show" ? "1" : "0")}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <List className={cn("tcrm-roster", `tcrm-roster--${variant}`, className)} divided>
      {students.map((sourceStudent, index) => {
        const student = normalizeRosterStudent(sourceStudent, index);
        const statusKey = student.status ?? student.state ?? "present";
        const status = rosterStatusCopy[statusKey];
        const avatarName = student.initials ? student.initials.split("").join(" ") : student.name;
        const emit = () => {
          onStudentAction?.(student.id);
          onStudentStatus?.(student);
        };
        return (
          <ListItem
            className="tcrm-roster__row"
            data-attendance={status.className}
            action={
              <IconButton
                className="tcrm-roster__action"
                disabled={disabled || (!onStudentAction && !onStudentStatus)}
                icon={variant === "expected" ? "moreVertical" : "chevronDown"}
                label={variant === "expected" ? `Abrir opções de ${student.name}` : `Alterar presença de ${student.name}`}
                onClick={emit}
                size="sm"
                variant="default"
              />
            }
            leading={<Avatar aria-label={student.name} className="tcrm-roster__avatar" name={avatarName} size="md" src={student.avatarSrc} />}
            key={student.id}
            meta={student.helper ?? student.meta}
            trailing={<Chip className={cn("tcrm-roster__status", `tcrm-roster__status--${status.className}`)} showDot={false}>{status.label}</Chip>}
            title={student.name}
          />
        );
      })}
    </List>
  );
}

/** @deprecated Use `defaultSetupSteps`, the current nine-block product contract. */
