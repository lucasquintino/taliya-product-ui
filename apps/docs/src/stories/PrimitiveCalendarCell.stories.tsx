import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { CalendarCell, CalendarGrid } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof CalendarCell> = {
  title: "Primitives / UI / CalendarCell",
  component: CalendarCell,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

function InteractiveCalendarGrid() {
  const [selectedDay, setSelectedDay] = useState("22");
  const events = [
    { label: "Mat Pilates", tone: "info" as const },
    { label: "Reposicao", tone: "success" as const },
    { label: "Conflito", tone: "danger" as const }
  ];
  const days = [
    { day: "20", eyebrow: "Seg", events: events.slice(0, 2) },
    { day: "21", eyebrow: "Ter", events, today: true },
    { day: "22", eyebrow: "Qua" },
    { day: "23", eyebrow: "Qui", events: events.slice(2, 3), conflict: true },
    { day: "24", eyebrow: "Sex", disabled: true },
    { day: "25", eyebrow: "Sab", muted: true },
    { day: "26", eyebrow: "Dom", events: [{ label: "Livre", tone: "neutral" as const }] }
  ];

  return (
    <CalendarGrid>
      {days.map((item) => (
        <CalendarCell
          conflict={item.conflict}
          day={item.day}
          disabled={item.disabled}
          events={item.events}
          eyebrow={item.eyebrow}
          key={item.day}
          muted={item.muted}
          onClick={() => setSelectedDay(item.day)}
          selected={selectedDay === item.day}
          today={item.today}
        />
      ))}
    </CalendarGrid>
  );
}

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-calendar" number="1" title="CalendarCell">
          <InteractiveCalendarGrid />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
