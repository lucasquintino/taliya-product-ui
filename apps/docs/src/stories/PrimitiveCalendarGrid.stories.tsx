import type { Meta } from "@storybook/react-vite";

import { CalendarCell, CalendarGrid } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof CalendarGrid> = {
  title: "Primitives / UI / CalendarGrid",
  component: CalendarGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch6SourceDescription}\n\nCalendarGrid owns the contiguous five- or seven-column calendar-cell composition.`
      }
    }
  }
};

export default meta;

function Cells({ count }: { count: number }) {
  return Array.from({ length: count }, (_, index) => (
    <CalendarCell day={String(index + 1)} eyebrow={`D${index + 1}`} key={index} />
  ));
}

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="seven columns">
          <CalendarGrid>{Cells({ count: 7 })}</CalendarGrid>
        </PrimitiveState>
        <PrimitiveState label="five columns">
          <CalendarGrid columns={5}>{Cells({ count: 5 })}</CalendarGrid>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
