import type { Meta, StoryObj } from "@storybook/react-vite";

import { ClassCard } from "@taliya/crm";

const meta = { title: "CRM / Agenda / ClassCard", component: ClassCard, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ClassCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SourceReference: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(3, 1fr)", width: "492px" }}>
      <ClassCard attendance={<span style={{ color: "var(--taliya-status-success-fg)" }}>8 presentes</span>} capacity="9 / 10" endTime="09:00" meta="Turma MP · Terca" room="Sala 1" time="08:00" title="Mat Pilates" variant="reference" />
      <ClassCard attendance={<span style={{ color: "var(--taliya-status-danger-fg)" }}>7 presentes · 1 falta</span>} capacity="8 / 8" endTime="10:00" meta="Turma REF · Quarta" room="Sala 2" state="conflict" time="09:00" title="Reformer" variant="reference" />
      <ClassCard capacity="0 / 10" endTime="12:00" meta="Turma MP · Domingo" openSlot room="Sala 1" time="11:00" title="Mat Pilates" variant="reference" />
    </div>
  )
};
