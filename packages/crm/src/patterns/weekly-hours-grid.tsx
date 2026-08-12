/** Weekly hours grid pattern. */
import React from "react";
import { Icon, PrimitiveButton, cn } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";
import { stateKey } from "./patterns-utilities.js";


export type WeeklyHoursGridState = "editable" | "readonly" | "conflict" | "loading" | "blocked";

export interface WeeklyHoursGridSlot {
  id: string;
  day: string;
  start: string;
  end: string;
  label: string;
  meta?: React.ReactNode;
  tone?: ComponentTone;
}

export interface WeeklyHoursGridProps extends React.HTMLAttributes<HTMLElement> {
  axis?: string[];
  state?: WeeklyHoursGridState;
  days?: string[];
  slots?: WeeklyHoursGridSlot[];
  variant?: "availability" | "schedule";
  onAdjustDay?: () => void;
  onSlotClick?: (slot: WeeklyHoursGridSlot) => void;
}

const weeklyHoursGridDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const weeklyHoursGridAxis = ["07h", "12h", "13h", "21h"];

function defaultWeeklyHoursGridSlots(days = weeklyHoursGridDays): WeeklyHoursGridSlot[] {
  return days.flatMap((day) => [
    { id: `${day}-morning`, day, start: "07:00", end: "12:00", label: "07:00" },
    { id: `${day}-afternoon`, day, start: "13:00", end: "21:00", label: "13:00" }
  ]);
}

export function WeeklyHoursGrid({
  axis = weeklyHoursGridAxis,
  state = "editable",
  days = weeklyHoursGridDays,
  slots = defaultWeeklyHoursGridSlots(days),
  variant = "availability",
  onAdjustDay,
  onSlotClick,
  className,
  ...props
}: WeeklyHoursGridProps) {
  const key = stateKey(state) || "editable";
  const disabled = key === "readonly" || key === "loading" || key === "blocked";
  const slotByDay = new Map(slots.map((slot) => [slot.id, slot]));

  return (
    <section
      aria-busy={key === "loading" || undefined}
      aria-label="Prévia da grade semanal"
      className={cn("tcrm-weekly-hours-grid", className)}
      data-component="WeeklyHoursGrid"
      data-state={key}
      data-variant={variant}
      {...props}
    >
      {variant === "availability" ? <header className="tcrm-weekly-hours-grid__header">
        <h3><span>3.</span> Prévia da grade semanal</h3>
        <PrimitiveButton disabled={key === "loading" || key === "blocked"} onClick={() => onAdjustDay?.()} type="button">
          <Icon name="calendar" size="14px" />
          Ajustar horários por dia
        </PrimitiveButton>
      </header> : null}
      {variant === "schedule" ? (
        <div className="tcrm-weekly-hours-grid__schedule" role="grid" aria-readonly={disabled || undefined}>
          <div className="tcrm-weekly-hours-grid__header-row" role="row">
            <div aria-label="Horário" className="tcrm-weekly-hours-grid__corner" role="columnheader" />
            {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
          </div>
          <div className="tcrm-weekly-hours-grid__schedule-axis" aria-hidden="true">
            {axis.map((item) => <span key={item}>{item}</span>)}
          </div>
          {days.map((day, dayIndex) => (
            <div className="tcrm-weekly-hours-grid__schedule-column" key={day} role="row" style={{ gridColumn: dayIndex + 2 }}>
              {axis.map((item) => <span className="tcrm-weekly-hours-grid__schedule-cell" key={item} />)}
              {slots.filter((slot) => slot.day === day && slot.label).map((slot) => {
                const hour = `${slot.start.slice(0, 2)}h`;
                const row = Math.max(0, axis.findIndex((item) => item === hour));
                return (
                  <PrimitiveButton
                    aria-label={`${day} das ${slot.start} às ${slot.end}: ${slot.label}`}
                    data-tone={slot.tone ?? "neutral"}
                    disabled={disabled}
                    key={slot.id}
                    onClick={() => onSlotClick?.(slot)}
                    role="gridcell"
                    style={{ gridRow: row + 1 }}
                    type="button"
                  >
                    <span>{slot.label}</span>
                    {slot.meta ? <small>{slot.meta}</small> : null}
                  </PrimitiveButton>
                );
              })}
            </div>
          ))}
        </div>
      ) : <div className="tcrm-weekly-hours-grid__matrix" role="grid" aria-readonly={disabled || undefined}>
        <div className="tcrm-weekly-hours-grid__header-row" role="row">
          <div aria-label="Horário" className="tcrm-weekly-hours-grid__corner" role="columnheader" />
          {days.map((day) => <div className="tcrm-weekly-hours-grid__day" key={day} role="columnheader">{day}</div>)}
        </div>
        <div className="tcrm-weekly-hours-grid__axis" aria-hidden="true">
          {axis.map((item) => <span key={item}>{item}</span>)}
        </div>
        {days.map((day) => {
          const morning = slotByDay.get(`${day}-morning`) ?? { id: `${day}-morning`, day, start: "07:00", end: "12:00", label: "07:00" };
          const afternoon = slotByDay.get(`${day}-afternoon`) ?? { id: `${day}-afternoon`, day, start: "13:00", end: "21:00", label: "13:00" };

          return (
            <div className="tcrm-weekly-hours-grid__column" key={day} role="row">
              <PrimitiveButton aria-label={`${day} das ${morning.start} às ${morning.end}`} disabled={disabled} onClick={() => onSlotClick?.(morning)} role="gridcell" type="button">
                <span>{morning.label}</span>
              </PrimitiveButton>
              <span className="tcrm-weekly-hours-grid__break">{key === "conflict" && day === "Qua" ? "Conflito" : null}</span>
              <PrimitiveButton aria-label={`${day} das ${afternoon.start} às ${afternoon.end}`} disabled={disabled} onClick={() => onSlotClick?.(afternoon)} role="gridcell" type="button">
                <span>{afternoon.label}</span>
                <small>21:00</small>
              </PrimitiveButton>
            </div>
          );
        })}
      </div>}
      {variant === "availability" ? <p>Essa grade define quando o studio pode ter aulas. As turmas e horários específicos serão configurados nos próximos blocos.</p> : null}
    </section>
  );
}
