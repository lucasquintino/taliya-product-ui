import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ReplacementTable } from "@taliya/crm";
import type { ReplacementTableRow } from "@taliya/crm";

import source24AnaSilva from "../assets/source24-ana-silva.png";
import source24CarlaMenezes from "../assets/source24-carla-menezes.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";

const meta = {
  title: "CRM / Operational / ReplacementTable",
  component: ReplacementTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tabela reutilizavel de reposicoes extraida da imagem 31. Usa DataTable, TablePagination, Avatar e Chip oficiais; status em revisao visual."
      }
    }
  }
} satisfies Meta<typeof ReplacementTable>;

export default meta;

type Story = StoryObj<typeof ReplacementTable>;

const rows: ReplacementTableRow[] = [
  {
    id: "ana-carolina",
    student: { name: "Ana Carolina Souza", avatarSrc: source24AnaSilva },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "12/06",
    preference: "Manhã ou quinta",
    status: "found",
    nextAction: "Enviar convite",
    mode: "copilot",
    selected: true
  },
  {
    id: "felipe-andrade",
    student: { name: "Felipe Andrade", initials: "FA" },
    originalClass: <>Quinta 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "20/05",
    preference: "Manhã",
    status: "waiting",
    nextAction: "Cobrar retorno",
    mode: "manual"
  },
  {
    id: "gabriela-martins",
    student: { name: "Gabriela Martins", initials: "GM" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "No-show",
    validity: "18/05",
    preference: "Noite",
    status: "blocked",
    nextAction: "Revisar política",
    mode: "blocked"
  },
  {
    id: "juliana-costa",
    student: { name: "Juliana Costa", avatarSrc: source24CarlaMenezes },
    originalClass: <>Segunda 19h<br />Tower</>,
    reason: <>Reposição<br />aprovada</>,
    validity: "16/05",
    preference: "Quinta 08h",
    status: "scheduled",
    nextAction: <>Confirmar<br />presença</>,
    mode: "autonomous"
  },
  {
    id: "marina-lopes",
    student: { name: "Marina Lopes", avatarSrc: source24MarinaLopes },
    originalClass: <>Sexta 10h<br />Pilates Solo</>,
    reason: <>Encaixe<br />solicitado</>,
    validity: "24/05",
    preference: "Tarde",
    status: "pending",
    nextAction: "Avaliar opções",
    mode: "copilot"
  }
];

function InteractiveReplacementTable() {
  const [selectedId, setSelectedId] = useState("ana-carolina");
  const [pageLabel, setPageLabel] = useState("1-5 de 8");

  return (
    <div className="sb-crm-replacement-table-story">
      <ReplacementTable
        pageLabel={pageLabel}
        rows={rows.map((row) => ({ ...row, selected: row.id === selectedId }))}
        onItemsPerPageClick={() => setPageLabel("1-8 de 8")}
        onNextPage={() => setPageLabel("6-8 de 8")}
        onPreviousPage={() => setPageLabel("1-5 de 8")}
        onRowSelect={(row) => setSelectedId(row.id)}
      />
    </div>
  );
}

export const Source: Story = {
  render: () => <InteractiveReplacementTable />
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-replacement-table-story sb-crm-replacement-table-story--states">
      <ReplacementTable state="loading" />
      <ReplacementTable state="empty" />
      <ReplacementTable state="blocked" />
    </div>
  )
};
