import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ApprovalTable } from "@taliya/crm";
import type { ApprovalTableRow } from "@taliya/crm";

const meta = {
  title: "CRM / Approvals / ApprovalTable",
  parameters: {
    docs: {
      description: {
        component:
          "Tabela reutilizavel para paginas de aprovacoes. Fonte principal: 25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png, crop tmp/visual-audit/batch11/approvals-25-source-diagnostic/image25-approval-table-source.png."
      }
    },
    layout: "fullscreen"
  }
} satisfies Meta<typeof ApprovalTable>;

export default meta;

type Story = StoryObj<typeof ApprovalTable>;

const rows: ApprovalTableRow[] = [
  {
    id: "ana-message",
    index: 1,
    title: <>Aprovar mensagem<br />para Ana Paula</>,
    type: "message",
    origin: <>WhatsApp /<br />Agente de<br />atendimento</>,
    requester: { name: "Copiloto", icon: "sparkles" },
    risk: "low",
    cost: "1 credito",
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestao gerada<br />as 09:18</>,
    selected: true
  },
  {
    id: "agenda-change",
    index: 2,
    title: <>Aprovar alteracao<br />de agenda</>,
    type: "agenda",
    origin: "Reposicao",
    requester: { name: "Recepcao", icon: "user" },
    risk: "medium",
    cost: <>Impacto<br />4 alunos</>,
    deadline: <>Hoje<br />11:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Conflito de sala<br />detectado</>
  },
  {
    id: "financial-exception",
    index: 3,
    title: <>Aprovar excecao<br />financeira</>,
    type: "finance",
    origin: <>Desconto<br />manual</>,
    requester: { name: "Mariana" },
    risk: "medium",
    cost: "R$ 120",
    deadline: <>Hoje<br />14:00</>,
    deadlineTone: "danger",
    status: "review",
    activity: <>Caixa solicitou<br />validacao</>
  }
];

function InteractiveApprovalTable() {
  const [selectedId, setSelectedId] = useState("ana-message");
  const [pageLabel, setPageLabel] = useState("1-6 de 6");
  const visibleRows = rows.map((row) => ({ ...row, selected: row.id === selectedId }));

  return (
    <div className="sb-crm-work-list-detail-page-story">
      <ApprovalTable
        rows={visibleRows}
        pageLabel={pageLabel}
        onItemsPerPageClick={() => setPageLabel("1-10 de 24")}
        onNextPage={() => setPageLabel("7-12 de 24")}
        onPreviousPage={() => setPageLabel("1-6 de 6")}
        onRowSelect={(row) => setSelectedId(row.id)}
      />
    </div>
  );
}

export const Source: Story = {
  render: () => <InteractiveApprovalTable />
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story sb-crm-work-list-detail-page-story--states">
      <section aria-label="Estado loading" className="sb-crm-work-list-detail-page-story__state">
        <h2>loading</h2>
        <ApprovalTable state="loading" />
      </section>
      <section aria-label="Estado empty" className="sb-crm-work-list-detail-page-story__state">
        <h2>empty</h2>
        <ApprovalTable state="empty" />
      </section>
      <section aria-label="Estado blocked" className="sb-crm-work-list-detail-page-story__state">
        <h2>blocked</h2>
        <ApprovalTable state="blocked" />
      </section>
    </div>
  )
};
