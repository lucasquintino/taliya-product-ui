/** Agenda, calendar and class-operation presentation compositions. */
import React from "react";
import {
  Button,
  ButtonGroup,
  CalendarEventBlock,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListIcon,
  ListItem,
  SegmentedControl,
  StatusDot,
  Avatar,
  cn
} from "@taliya/ui";
import type {
  ComponentTone
} from "@taliya/ui";

function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export interface WeeklyCalendarEvent {
  id: string;
  dayIndex: number;
  top: number;
  height?: number;
  time: React.ReactNode;
  title: React.ReactNode;
  teacher: React.ReactNode;
  capacity: React.ReactNode;
  status: string;
  statusLabel: React.ReactNode;
}

const weeklyCalendarTimes = [
  { label: "07:00", top: 50 },
  { label: "08:00", top: 144 },
  { label: "09:00", top: 250 },
  { label: "10:00", top: 344 },
  { label: "12:00", top: 438 },
  { label: "17:00", top: 533 },
  { label: "18:00", top: 627 },
  { label: "19:00", top: 721 }
];

const weeklyCalendarSourceEvents: WeeklyCalendarEvent[] = [
  { id: "seg-0700-reformer", dayIndex: 0, top: 50, time: "07:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "seg-0800-pilates", dayIndex: 0, top: 144, time: "08:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "seg-1000-tower", dayIndex: 0, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "available", statusLabel: "vaga aberta" },
  { id: "seg-1700-alongamento", dayIndex: 0, top: 489, time: "17:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "seg-1900-experimental", dayIndex: 0, top: 686, time: "19:00", title: "Experimental", teacher: "Lucas Peres", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "ter-0700-pilates", dayIndex: 1, top: 50, time: "07:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "ter-0800-reformer", dayIndex: 1, top: 144, time: "08:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "ter-1000-tower", dayIndex: 1, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "3/4", status: "pending", statusLabel: "chamada pendente" },
  { id: "ter-1400-alongamento", dayIndex: 1, top: 397, time: "14:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "2/6", status: "available", statusLabel: "vaga aberta" },
  { id: "ter-1700-reformer", dayIndex: 1, top: 489, time: "17:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "3/4", status: "pending", statusLabel: "chamada pendente" },
  { id: "ter-1900-pilates", dayIndex: 1, top: 686, time: "19:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "1/6", status: "replacement-possible", statusLabel: "reposicao possivel" },
  { id: "qua-0700-tower", dayIndex: 2, top: 50, time: "07:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-0800-alongamento", dayIndex: 2, top: 144, time: "08:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "4/8", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1000-pilates", dayIndex: 2, top: 297, time: "10:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1400-reformer", dayIndex: 2, top: 397, time: "14:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qua-1800-tower", dayIndex: 2, top: 591, time: "18:00", title: "Tower", teacher: "Lucas Peres", capacity: "2/4", status: "room-adjustment", statusLabel: "sala em ajuste" },
  { id: "qui-0700-reformer", dayIndex: 3, top: 50, time: "07:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "5/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-0800-pilates", dayIndex: 3, top: 144, time: "08:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "3/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-1000-tower", dayIndex: 3, top: 297, time: "10:00", title: "Tower", teacher: "Lucas Peres", capacity: "1/4", status: "available", statusLabel: "vaga aberta" },
  { id: "qui-1400-experimental", dayIndex: 3, top: 397, time: "14:00", title: "Experimental", teacher: "Lucas Peres", capacity: "2/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "qui-1800-alongamento", dayIndex: 3, top: 591, time: "18:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "5/8", status: "scheduled", statusLabel: "confirmada" },
  { id: "sex-0700-pilates", dayIndex: 4, top: 50, time: "07:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" },
  { id: "sex-0800-tower", dayIndex: 4, top: 144, time: "08:00", title: "Tower", teacher: "Lucas Peres", capacity: "3/4", status: "replacement", statusLabel: "reposicao" },
  { id: "sex-1000-reformer", dayIndex: 4, top: 297, time: "10:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "0/6", status: "teacher-unavailable", statusLabel: "prof. indisponivel" },
  { id: "sex-1400-pilates", dayIndex: 4, top: 397, time: "14:00", title: "Pilates Solo", teacher: "Mariana Lopes", capacity: "2/6", status: "available", statusLabel: "vaga aberta" },
  { id: "sex-1700-alongamento", dayIndex: 4, top: 489, time: "17:00", title: "Alongamento", teacher: "Camila Rocha", capacity: "6/6", status: "full", statusLabel: "lotado" },
  { id: "sex-1900-reformer", dayIndex: 4, top: 686, time: "19:00", title: "Reformer Intermediario", teacher: "Joao Silva", capacity: "4/6", status: "scheduled", statusLabel: "confirmada" }
];

export interface WeeklyCalendarReferenceEvent {
  id: string;
  dayIndex: number;
  rowIndex: number;
  title: React.ReactNode;
  teacher?: React.ReactNode;
  capacity?: React.ReactNode;
  status?: "scheduled" | "available" | "conflict";
  note?: React.ReactNode;
  span?: number;
}

const weeklyCalendarReferenceTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const weeklyCalendarReferenceEvents: WeeklyCalendarReferenceEvent[] = [
  { id: "seg-08", dayIndex: 0, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "seg-09", dayIndex: 0, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "seg-10", dayIndex: 0, rowIndex: 2, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "seg-12", dayIndex: 0, rowIndex: 4, title: "Reformer", teacher: "Maria Clara", capacity: "5/6" },
  { id: "seg-14", dayIndex: 0, rowIndex: 6, title: "Funcional", teacher: "Carla Lima", capacity: "6/12" },
  { id: "seg-16", dayIndex: 0, rowIndex: 8, title: "Mat Pilates", teacher: "Joao Silva", capacity: "6/10" },
  { id: "seg-18", dayIndex: 0, rowIndex: 10, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "seg-19", dayIndex: 0, rowIndex: 11, title: "Funcional", teacher: "Carlos Lima", capacity: "7/12" },
  { id: "ter-08", dayIndex: 1, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "ter-09", dayIndex: 1, rowIndex: 1, title: "Funcional", teacher: "Carla Lima", capacity: "9/12" },
  { id: "ter-10", dayIndex: 1, rowIndex: 2, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "ter-12", dayIndex: 1, rowIndex: 4, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "4/6" },
  { id: "ter-14", dayIndex: 1, rowIndex: 6, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "ter-16", dayIndex: 1, rowIndex: 8, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "ter-18", dayIndex: 1, rowIndex: 10, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "ter-19", dayIndex: 1, rowIndex: 11, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qua-08", dayIndex: 2, rowIndex: 0, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qua-09", dayIndex: 2, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "8/8" },
  { id: "qua-10", dayIndex: 2, rowIndex: 2, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "5/6" },
  { id: "qua-12", dayIndex: 2, rowIndex: 4, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "qua-conflict", dayIndex: 2, rowIndex: 5, title: "Conflito", note: "Sala 2 ocupada", status: "conflict", span: 2 },
  { id: "qua-16", dayIndex: 2, rowIndex: 8, title: "Reformer", teacher: "Maria Clara", capacity: "8/8" },
  { id: "qua-18", dayIndex: 2, rowIndex: 10, title: "Funcional", teacher: "Carla Lima", capacity: "8/12" },
  { id: "qua-19", dayIndex: 2, rowIndex: 11, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "qui-08", dayIndex: 3, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "10/10" },
  { id: "qui-09", dayIndex: 3, rowIndex: 1, title: "Funcional", teacher: "Carla Lima", capacity: "7/12" },
  { id: "qui-10", dayIndex: 3, rowIndex: 2, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "qui-12", dayIndex: 3, rowIndex: 4, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "qui-14", dayIndex: 3, rowIndex: 6, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "qui-16", dayIndex: 3, rowIndex: 8, title: "Pilates Gestante", teacher: "Ana Paula", capacity: "5/6" },
  { id: "qui-18", dayIndex: 3, rowIndex: 10, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "qui-19", dayIndex: 3, rowIndex: 11, title: "Pilates Solo", teacher: "Ana Paula", capacity: "5/6" },
  { id: "sex-08", dayIndex: 4, rowIndex: 0, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "sex-09", dayIndex: 4, rowIndex: 1, title: "Mat Pilates", teacher: "Joao Silva", capacity: "8/10" },
  { id: "sex-10", dayIndex: 4, rowIndex: 2, title: "Funcional", teacher: "Carla Lima", capacity: "6/12" },
  { id: "sex-12", dayIndex: 4, rowIndex: 4, title: "Pilates Solo", teacher: "Ana Paula", capacity: "5/6" },
  { id: "sex-14", dayIndex: 4, rowIndex: 6, title: "Reformer", teacher: "Maria Clara", capacity: "6/8" },
  { id: "sex-16", dayIndex: 4, rowIndex: 8, title: "Mat Pilates", teacher: "Joao Silva", capacity: "7/10" },
  { id: "sex-18", dayIndex: 4, rowIndex: 10, title: "Mat Pilates", teacher: "Joao Silva", capacity: "9/10" },
  { id: "sex-19", dayIndex: 4, rowIndex: 11, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "sab-08", dayIndex: 5, rowIndex: 0, title: "Mat Pilates", teacher: "Joao Silva", capacity: "7/10" },
  { id: "sab-09", dayIndex: 5, rowIndex: 1, title: "Reformer", teacher: "Maria Clara", capacity: "7/8" },
  { id: "sab-12", dayIndex: 5, rowIndex: 4, title: "Funcional", teacher: "Carla Lima", capacity: "5/12" },
  { id: "sab-18", dayIndex: 5, rowIndex: 10, title: "Pilates Solo", teacher: "Ana Paula", capacity: "4/6" },
  { id: "dom-08", dayIndex: 6, rowIndex: 0, title: "Vaga aberta", note: "08:00 - 09:00", status: "available", span: 2 },
  { id: "dom-12", dayIndex: 6, rowIndex: 4, title: "Vaga aberta", note: "11:00 - 12:00", status: "available", span: 2 },
  { id: "dom-16", dayIndex: 6, rowIndex: 8, title: "Vaga aberta", note: "15:00 - 16:00", status: "available", span: 2 }
];

function WeeklyCalendarReference({
  days,
  events,
  onEventSelect,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onFilter,
  className
}: {
  days: string[];
  events: WeeklyCalendarReferenceEvent[];
  onEventSelect?: (eventId: string, event: WeeklyCalendarReferenceEvent) => void;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
  onFilter?: () => void;
  className?: string;
}) {
  return (
    <section className={cn("tcrm-weekly-calendar-reference", className)} data-component="WeeklyCalendar" data-variant="reference">
      <header className="tcrm-weekly-calendar-reference__toolbar">
        <ButtonGroup aria-label="Navegacao da semana">
          <IconButton icon="chevronLeft" label="Semana anterior" onClick={onPreviousWeek} size="sm" variant="ghost" />
          <Button onClick={onToday} size="sm" variant="secondary">Hoje</Button>
          <IconButton icon="chevronRight" label="Proxima semana" onClick={onNextWeek} size="sm" variant="ghost" />
        </ButtonGroup>
        <span>20 - 26 de Maio, 2024</span>
        <div className="tcrm-weekly-calendar-reference__toolbar-actions">
          <SegmentedControl compact label="Visualizacao" options={[{ value: "day", label: "Dia" }, { value: "week", label: "Semana" }, { value: "month", label: "Mes" }]} value="week" />
          <Button leadingIcon="filter" onClick={onFilter} size="sm" variant="secondary">Filtros</Button>
        </div>
      </header>
      <div className="tcrm-weekly-calendar-reference__grid" role="grid" aria-label="Calendario semanal completo">
        <span className="tcrm-weekly-calendar-reference__corner">Hora</span>
        {days.map((day) => <strong key={day} role="columnheader">{day}</strong>)}
        <div className="tcrm-weekly-calendar-reference__times">
          {weeklyCalendarReferenceTimes.map((time) => <span key={time}>{time}</span>)}
        </div>
        <div className="tcrm-weekly-calendar-reference__cells" aria-hidden="true">
          {Array.from({ length: 84 }, (_, index) => <span key={index} />)}
        </div>
        <div className="tcrm-weekly-calendar-reference__events">
          {events.map((event) => (
            <button
              className={cn("tcrm-weekly-calendar-reference__event", `tcrm-weekly-calendar-reference__event--${event.status ?? "scheduled"}`)}
              key={event.id}
              onClick={() => onEventSelect?.(event.id, event)}
              style={{ "--tcrm-reference-event-column": event.dayIndex + 1, "--tcrm-reference-event-row": event.rowIndex + 1, "--tcrm-reference-event-span": event.span ?? 1 } as React.CSSProperties}
              type="button"
            >
              <strong>{event.title}</strong>
              {event.teacher ? <small>{event.teacher}</small> : null}
              <span>{event.note ?? event.capacity}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeeklyCalendar({
  days = ["Seg 12/05", "Ter 13/05", "Qua 14/05", "Qui 15/05", "Sex 16/05"],
  times = weeklyCalendarTimes,
  events = weeklyCalendarSourceEvents,
  selectedEventId,
  onEventSelect,
  compact = false,
  density = "default",
  variant = "agenda",
  referenceEvents = weeklyCalendarReferenceEvents,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onFilter,
  className
}: {
  days?: string[];
  times?: Array<{ label: React.ReactNode; top: number }>;
  events?: WeeklyCalendarEvent[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string, event: WeeklyCalendarEvent) => void;
  compact?: boolean;
  density?: "default" | "short";
  variant?: "agenda" | "reference";
  referenceEvents?: WeeklyCalendarReferenceEvent[];
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
  onFilter?: () => void;
  className?: string;
}) {
  if (variant === "reference") {
    return (
      <WeeklyCalendarReference
        className={className}
        days={days.length === 7 ? days : ["Seg 20/05", "Ter 21/05", "Qua 22/05", "Qui 23/05", "Sex 24/05", "Sab 25/05", "Dom 26/05"]}
        events={referenceEvents}
        onEventSelect={onEventSelect as ((eventId: string, event: WeeklyCalendarReferenceEvent) => void) | undefined}
        onFilter={onFilter}
        onNextWeek={onNextWeek}
        onPreviousWeek={onPreviousWeek}
        onToday={onToday}
      />
    );
  }
  return (
    <div className={cn("tcrm-weekly-calendar", compact && "tcrm-weekly-calendar--compact", density === "short" && "tcrm-weekly-calendar--short", className)} role="grid" aria-label="Agenda semanal">
      <div className="tcrm-weekly-calendar__corner" />
      {days.map((day) => <div className="tcrm-weekly-calendar__day" key={day} role="columnheader">{day}</div>)}
      <div className="tcrm-weekly-calendar__body">
        {times.map((time) => (
          <span className="tcrm-weekly-calendar__time" key={String(time.label)} style={{ "--tcrm-weekly-time-top": `${time.top}px` } as React.CSSProperties}>
            {time.label}
          </span>
        ))}
        {days.map((day, index) => <span aria-hidden="true" className="tcrm-weekly-calendar__column-line" key={day} style={{ "--tcrm-weekly-column": index } as React.CSSProperties} />)}
        {times.map((time) => <span aria-hidden="true" className="tcrm-weekly-calendar__row-line" key={`line-${String(time.label)}`} style={{ "--tcrm-weekly-time-top": `${time.top}px` } as React.CSSProperties} />)}
        {events.map((event) => (
          <div
            className="tcrm-weekly-calendar__event"
            key={event.id}
            style={{
              "--tcrm-weekly-event-day": event.dayIndex,
              "--tcrm-weekly-event-top": `${event.top}px`,
              "--tcrm-weekly-event-height": `${event.height ?? 85}px`
            } as React.CSSProperties}
          >
            <ClassCard
              capacity={event.capacity}
              meta={event.teacher}
              onSelect={onEventSelect ? () => onEventSelect(event.id, event) : undefined}
              selected={selectedEventId === event.id}
              state={event.status}
              statusLabel={event.statusLabel}
              time={event.time}
              title={event.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export interface MiniCalendarCell {
  id: string;
  label: string;
  value?: string;
  outside?: boolean;
  disabled?: boolean;
}

const miniCalendarWeekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const miniCalendarMay2024Cells: MiniCalendarCell[] = [
  { id: "prev-28", label: "28", outside: true },
  { id: "prev-29", label: "29", outside: true },
  { id: "prev-30", label: "30", outside: true },
  { id: "1", label: "1", value: "1" },
  { id: "2", label: "2", value: "2" },
  { id: "3", label: "3", value: "3" },
  { id: "4", label: "4", value: "4" },
  { id: "5", label: "5", value: "5" },
  { id: "6", label: "6", value: "6" },
  { id: "7", label: "7", value: "7" },
  { id: "8", label: "8", value: "8" },
  { id: "9", label: "9", value: "9" },
  { id: "10", label: "10", value: "10" },
  { id: "11", label: "11", value: "11" },
  { id: "12", label: "12", value: "12" },
  { id: "13", label: "13", value: "13" },
  { id: "14", label: "14", value: "14" },
  { id: "15", label: "15", value: "15" },
  { id: "16", label: "16", value: "16" },
  { id: "17", label: "17", value: "17" },
  { id: "18", label: "18", value: "18" },
  { id: "19", label: "19", value: "19" },
  { id: "20", label: "20", value: "20" },
  { id: "21", label: "21", value: "21" },
  { id: "22", label: "22", value: "22" },
  { id: "23", label: "23", value: "23" },
  { id: "24", label: "24", value: "24" },
  { id: "25", label: "25", value: "25" },
  { id: "26", label: "26", value: "26" },
  { id: "27", label: "27", value: "27" },
  { id: "28", label: "28", value: "28" },
  { id: "29", label: "29", value: "29" },
  { id: "30", label: "30", value: "30" },
  { id: "31", label: "31", value: "31" },
  { id: "next-1", label: "1", outside: true }
];

export function MiniCalendar({
  selected = "12",
  today = "18",
  monthLabel = "maio 2024",
  weekdays = miniCalendarWeekdays,
  cells = miniCalendarMay2024Cells,
  disabledDays = [],
  loading = false,
  blocked = false,
  showHeader = true,
  onPreviousMonth,
  onNextMonth,
  onSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  selected?: string;
  today?: string;
  monthLabel?: string;
  weekdays?: string[];
  cells?: MiniCalendarCell[];
  disabledDays?: string[];
  loading?: boolean;
  blocked?: boolean;
  showHeader?: boolean;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onSelect?: (day: string) => void;
}) {
  const isDisabled = loading || blocked;
  return (
    <div
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      className={cn("tcrm-mini-calendar", !showHeader && "tcrm-mini-calendar--headerless", loading && "tcrm-mini-calendar--loading", blocked && "tcrm-mini-calendar--blocked", className)}
      role="group"
      {...props}
    >
      {showHeader ? (
        <header className="tcrm-mini-calendar__header">
          <strong>{monthLabel}</strong>
          <div className="tcrm-mini-calendar__nav" aria-label={`Navegacao de ${monthLabel}`}>
            <IconButton className="tcrm-mini-calendar__nav-button" disabled={isDisabled} icon="chevronLeft" label="Mes anterior" onClick={onPreviousMonth} size="sm" variant="ghost" />
            <IconButton className="tcrm-mini-calendar__nav-button" disabled={isDisabled} icon="chevronRight" label="Proximo mes" onClick={onNextMonth} size="sm" variant="ghost" />
          </div>
        </header>
      ) : null}
      <div className="tcrm-mini-calendar__grid" role="grid" aria-label={monthLabel}>
        {weekdays.map((weekday, index) => (
          <span className="tcrm-mini-calendar__weekday" key={`${weekday}-${index}`} role="columnheader">
            {weekday}
          </span>
        ))}
        {cells.map((cell) => {
          const value = cell.value ?? cell.label;
          const cellDisabled = isDisabled || cell.disabled || cell.outside || disabledDays.includes(value);
          const isSelected = value === selected && !cell.outside;
          const isToday = value === today && !cell.outside;
          return (
            <button
              aria-current={isSelected ? "date" : isToday ? "date" : undefined}
              className={cn(
                "tcrm-mini-calendar__day",
                cell.outside && "tcrm-mini-calendar__day--outside",
                isToday && "tcrm-mini-calendar__day--today",
                isSelected && "tcrm-mini-calendar__day--selected"
              )}
              disabled={cellDisabled}
              key={cell.id}
              onClick={() => onSelect?.(value)}
              type="button"
            >
              {cell.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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

export function ClassCard({
  title = "Pilates Solo",
  meta = "Mariana Lopes",
  time,
  capacity,
  state = "scheduled",
  statusLabel,
  selected = false,
  onSelect,
  action,
  variant = "event",
  endTime,
  room = "Sala 1",
  attendance,
  avatarSrc,
  openSlot = false,
  onCalendar,
  onRoster,
  onMenu,
  onReserve,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  state?: string;
  statusLabel?: React.ReactNode;
  selected?: boolean;
  action?: React.ReactNode;
  time?: React.ReactNode;
  capacity?: React.ReactNode;
  onSelect?: () => void;
  variant?: "event" | "reference";
  endTime?: React.ReactNode;
  room?: React.ReactNode;
  attendance?: React.ReactNode;
  avatarSrc?: string;
  openSlot?: boolean;
  onCalendar?: () => void;
  onRoster?: () => void;
  onMenu?: () => void;
  onReserve?: () => void;
}) {
  const status = state === "full" ? "full" : state === "available" ? "available" : state === "conflict" || state === "teacher-unavailable" || state === "room-adjustment" ? "conflict" : "scheduled";

  if (variant === "reference") {
    return (
      <article className={cn("tcrm-class-card-reference", openSlot && "tcrm-class-card-reference--open", state && `tcrm-class-card-reference--${stateKey(state)}`, className)} data-component="ClassCard" data-variant="reference" {...props}>
        <header>
          <span className="tcrm-class-card-reference__time"><StatusDot status={openSlot ? "info" : state === "conflict" ? "danger" : "success"} /> {time}{endTime ? <> - {endTime}</> : null}</span>
          <IconButton icon="moreVertical" label={`Opcoes de ${String(title)}`} onClick={onMenu} size="sm" variant="ghost" />
        </header>
        {openSlot ? <small className="tcrm-class-card-reference__eyebrow">Vaga aberta</small> : null}
        <strong>{title}</strong>
        <small>{meta}</small>
        {!openSlot ? <span className="tcrm-class-card-reference__teacher"><Avatar name={String(meta)} size="xs" src={avatarSrc} /> {meta}</span> : null}
        <dl>
          <div><dt>Sala</dt><dd>{room}</dd></div>
          <div><dt>Capacidade</dt><dd>{capacity}</dd></div>
          <div><dt>Chamada</dt><dd>{attendance ?? statusLabel ?? "-"}</dd></div>
        </dl>
        {openSlot ? (
          <Button leadingIcon="plus" onClick={onReserve} size="sm" variant="secondary">Reservar aula</Button>
        ) : (
          <footer>
            <IconButton icon="calendar" label="Abrir calendario" onClick={onCalendar} size="sm" variant="default" />
            <IconButton icon="users" label="Abrir chamada" onClick={onRoster} size="sm" variant="default" />
            <IconButton icon="moreVertical" label="Mais acoes" onClick={onMenu} size="sm" variant="default" />
          </footer>
        )}
      </article>
    );
  }

  return (
    <CalendarEventBlock
      aria-pressed={onSelect ? selected : undefined}
      className={cn("tcrm-class-card", state && `tcrm-class-card--${stateKey(state)}`, selected && "tcrm-class-card--selected", className)}
      compact
      action={action}
      capacity={capacity || statusLabel ? <><span className="tcrm-class-card__capacity">{capacity}</span>{statusLabel ? <span className="tcrm-class-card__status">{statusLabel}</span> : null}</> : null}
      meta={meta}
      onClick={() => onSelect?.()}
      onKeyDown={onSelect ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      } : undefined}
      role={onSelect ? "button" : undefined}
      status={status}
      tabIndex={onSelect ? 0 : undefined}
      time={time}
      title={title}
      {...props}
    />
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
