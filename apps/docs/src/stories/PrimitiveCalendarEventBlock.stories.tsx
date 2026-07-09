import type { Meta } from "@storybook/react-vite";

import { CalendarEventBlock, IconButton } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof CalendarEventBlock> = {
  title: "Primitives / UI / CalendarEventBlock",
  component: CalendarEventBlock,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-event" number="2" title="CalendarEventBlock">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Scheduled">
              <CalendarEventBlock capacity="8/10" meta="Joao Silva" time="08:00 - 09:00" title="Mat Pilates" />
            </SourceItem>
            <SourceItem label="Full">
              <CalendarEventBlock capacity="10/10" meta="Maria Clara" status="full" time="09:00 - 10:00" title="Reformer" />
            </SourceItem>
            <SourceItem label="Available">
              <CalendarEventBlock
                action={<IconButton icon="plus" label="Reservar aula" size="sm" variant="subtle" />}
                capacity="0/10"
                meta="Turma MP"
                status="available"
                time="11:00 - 12:00"
                title="Vaga aberta"
              />
            </SourceItem>
            <SourceItem label="Conflict">
              <CalendarEventBlock capacity="Sala ocupada" meta="Sala 2" status="conflict" time="13:00 - 14:00" title="Conflito" />
            </SourceItem>
            <SourceItem label="Cancelled">
              <CalendarEventBlock compact meta="Aula cancelada" status="cancelled" time="15:00" title="Pilates Solo" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
