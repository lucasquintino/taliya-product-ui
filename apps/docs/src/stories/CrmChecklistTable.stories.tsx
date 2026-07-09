import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ChecklistTable } from "@taliya/crm";
import type { ChecklistTableRow } from "@taliya/crm";

const meta = {
  title: "CRM / Operational / ChecklistTable",
  parameters: {
    docs: {
      description: {
        component:
          "Tabela reutilizavel para paginas de checklists operacionais. Fonte principal: 24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png, crop tmp/visual-audit/batch11/checklists-24-source-diagnostic/image24-checklist-table-source.png."
      }
    },
    layout: "fullscreen"
  }
} satisfies Meta<typeof ChecklistTable>;

export default meta;

type Story = StoryObj<typeof ChecklistTable>;

const rows: ChecklistTableRow[] = [
  {
    id: "opening",
    index: 1,
    title: "Abertura do estúdio",
    type: "Abertura",
    progress: { completed: 3, total: 5 },
    owner: { name: "Mariana" },
    deadline: <>Hoje<br />08:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Conferir salas",
    activity: "07:42",
    selected: true
  },
  {
    id: "daily-agenda",
    index: 2,
    title: "Revisão diária da agenda",
    type: "Agenda",
    progress: { completed: 4, total: 7 },
    owner: { name: "Lucas" },
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "blocked",
    nextStep: <>Resolver conflito<br />de sala</>,
    activity: "08:15"
  },
  {
    id: "closing",
    index: 3,
    title: "Fechamento do dia",
    type: "Fechamento",
    progress: { completed: 0, total: 6 },
    owner: { name: "Coordenação", helper: "Equipe" },
    deadline: <>Hoje<br />20:00</>,
    deadlineTone: "danger",
    status: "pending",
    nextStep: <>Iniciar<br />conferência</>,
    activity: "—"
  }
];

function InteractiveChecklistTable() {
  const [selectedId, setSelectedId] = useState("opening");
  const [pageLabel, setPageLabel] = useState("1-5 de 12");
  const visibleRows = rows.map((row) => ({ ...row, selected: row.id === selectedId }));

  return (
    <div className="sb-crm-work-list-detail-page-story">
      <ChecklistTable
        rows={visibleRows}
        pageLabel={pageLabel}
        onItemsPerPageClick={() => setPageLabel("1-10 de 12")}
        onNextPage={() => setPageLabel("6-10 de 12")}
        onPreviousPage={() => setPageLabel("1-5 de 12")}
        onRowSelect={(row) => setSelectedId(row.id)}
      />
    </div>
  );
}

export const Source: Story = {
  render: () => <InteractiveChecklistTable />
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story sb-crm-work-list-detail-page-story--states">
      <section aria-label="Estado loading" className="sb-crm-work-list-detail-page-story__state">
        <h2>loading</h2>
        <ChecklistTable state="loading" />
      </section>
      <section aria-label="Estado empty" className="sb-crm-work-list-detail-page-story__state">
        <h2>empty</h2>
        <ChecklistTable state="empty" />
      </section>
      <section aria-label="Estado blocked" className="sb-crm-work-list-detail-page-story__state">
        <h2>blocked</h2>
        <ChecklistTable state="blocked" />
      </section>
    </div>
  )
};
