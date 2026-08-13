/** Weekly calendar composition and reference data. */
import React from "react";
import { Button, ButtonGroup, IconButton, PrimitiveButton, SegmentedControl, cn } from "@taliya/ui";
import { ClassCard } from "./class-card.js";

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

export function WeeklyCalendarReference({
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
    <section aria-label="Calendário semanal completo" className={cn("tcrm-weekly-calendar-reference", className)} data-component="WeeklyCalendar" data-variant="reference" role="region">
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
      <div className="tcrm-weekly-calendar-reference__grid">
        <span className="tcrm-weekly-calendar-reference__corner">Hora</span>
        {days.map((day) => <strong key={day}>{day}</strong>)}
        <div className="tcrm-weekly-calendar-reference__times">
          {weeklyCalendarReferenceTimes.map((time) => <span key={time}>{time}</span>)}
        </div>
        <div className="tcrm-weekly-calendar-reference__cells" aria-hidden="true">
          {Array.from({ length: 84 }, (_, index) => <span key={`calendar-cell-${index}`} />)}
        </div>
        <div className="tcrm-weekly-calendar-reference__events">
          {events.map((event) => (
            <PrimitiveButton
              className={cn("tcrm-weekly-calendar-reference__event", `tcrm-weekly-calendar-reference__event--${event.status ?? "scheduled"}`)}
              key={event.id}
              onClick={() => onEventSelect?.(event.id, event)}
              style={{ "--tcrm-reference-event-column": event.dayIndex + 1, "--tcrm-reference-event-row": event.rowIndex + 1, "--tcrm-reference-event-span": event.span ?? 1 } as React.CSSProperties}
              type="button"
            >
              <strong>{event.title}</strong>
              {event.teacher ? <small>{event.teacher}</small> : null}
              <span>{event.note ?? event.capacity}</span>
            </PrimitiveButton>
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
    <div aria-label="Agenda semanal" className={cn("tcrm-weekly-calendar", compact && "tcrm-weekly-calendar--compact", density === "short" && "tcrm-weekly-calendar--short", className)} role="region">
      <div className="tcrm-weekly-calendar__corner" />
      {days.map((day) => <div className="tcrm-weekly-calendar__day" key={day}>{day}</div>)}
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
