import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StudentTable } from "@taliya/crm";
import type { StudentTableRow } from "@taliya/crm";

import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source28AnaPaula from "../assets/source28-ana-paula.png";
import source34GabrielLima from "../assets/source34-gabriel-lima.png";
import source34JulianaRocha from "../assets/source34-juliana-rocha.png";

const meta = {
  title: "CRM / Students / StudentTable",
  component: StudentTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tabela reutilizavel de alunos extraida da imagem 27. Usa DataTable, TablePagination, Avatar, Chip e StatusDot oficiais; status em revisao visual."
      }
    }
  }
} satisfies Meta<typeof StudentTable>;

export default meta;

type Story = StoryObj<typeof StudentTable>;

const rows: StudentTableRow[] = [
  {
    id: "ana-paula",
    student: { name: "Ana Paula Martins", avatarSrc: source28AnaPaula },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "mensagem hoje", status: "info" },
    selected: true
  },
  {
    id: "joao-pedro",
    student: { name: "Joao Pedro Silva", avatarSrc: source13JoaoPedro },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "6/10",
    finance: "pending",
    risk: "medium",
    activity: { label: "contrato atualizado", status: "info" }
  },
  {
    id: "carla-mendes",
    student: { name: "Carla Mendes", avatarSrc: source28AnaPaula },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "3/10",
    finance: "ok",
    risk: "high",
    activity: { label: "14 dias sem aula", status: "danger" }
  },
  {
    id: "pedro-henrique",
    student: { name: "Pedro Henrique", avatarSrc: source13JoaoPedro },
    status: "noClass",
    plan: "Experimental",
    currentClass: "-",
    owner: "Rafael Torres",
    presence: "-",
    finance: "pending",
    risk: "medium",
    activity: { label: "veio do WhatsApp", status: "info" }
  },
  {
    id: "juliana-rocha",
    student: { name: "Juliana Rocha", avatarSrc: source34JulianaRocha },
    status: "inactive",
    plan: "Plano pausado",
    currentClass: "Pilates Solo",
    owner: "proprio",
    presence: "0/10",
    finance: "ok",
    risk: "low",
    activity: { label: "pausa ate 30/05", status: "update" }
  },
  {
    id: "gabriel-santos",
    student: { name: "Gabriel Santos", avatarSrc: source34GabrielLima },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Pilates Solo",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  }
];

function InteractiveStudentTable() {
  const [selectedId, setSelectedId] = useState("ana-paula");
  const [pageLabel, setPageLabel] = useState("1-6 de 154");

  return (
    <div className="sb-crm-student-table-story">
      <StudentTable
        pageLabel={pageLabel}
        rows={rows.map((row) => ({ ...row, selected: row.id === selectedId }))}
        onItemsPerPageClick={() => setPageLabel("1-10 de 154")}
        onNextPage={() => setPageLabel("7-12 de 154")}
        onPreviousPage={() => setPageLabel("1-6 de 154")}
        onRowSelect={(row) => setSelectedId(row.id)}
      />
    </div>
  );
}

export const Source: Story = {
  render: () => <InteractiveStudentTable />
};

export const SoftSelection: Story = {
  args: {
    density: "compact",
    rows,
    selectionTone: "soft"
  }
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-student-table-story sb-crm-student-table-story--states">
      <StudentTable state="loading" />
      <StudentTable state="empty" />
      <StudentTable state="blocked" />
    </div>
  )
};
