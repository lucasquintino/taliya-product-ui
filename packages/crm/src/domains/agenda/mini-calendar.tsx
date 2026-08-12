/** Compact month calendar composition. */
import React from "react";
import { IconButton, PrimitiveButton, cn } from "@taliya/ui";

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
            <PrimitiveButton
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
            </PrimitiveButton>
          );
        })}
      </div>
    </div>
  );
}

