import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { LeadTable, type LeadTableRow } from "@taliya/crm";

const rows: LeadTableRow[] = [
  {
    id: "lead-ana",
    lead: "Ana Silva",
    studio: "Studio Vila Mariana",
    origin: "WhatsApp",
    stage: "Novo",
    fit: "Alto",
    fitTone: "success",
    priority: "Alta",
    priorityTone: "danger",
    interest: "Quer pilates duas vezes por semana no fim da tarde",
    quality: "Aprovado",
    qualityTone: "success",
    nextAction: "Responder hoje",
    nextActionTone: "warning",
    humanMode: "Humano",
    lastActivity: "Hoje, 09:12",
    owner: "Recepcao"
  },
  {
    id: "lead-marina",
    lead: "Marina Costa",
    studio: "Studio Moema",
    origin: "Landing",
    stage: "Experimental",
    fit: "Medio",
    fitTone: "warning",
    priority: "Media",
    priorityTone: "warning",
    interest: "Busca avaliacao para dor lombar",
    quality: "Revisar",
    qualityTone: "warning",
    nextAction: "Agendar experimental",
    nextActionTone: "info",
    humanMode: "IA com revisao",
    lastActivity: "Ontem, 17:40",
    owner: "Sam"
  },
  {
    id: "lead-pedro",
    lead: "Pedro Lima",
    studio: "Studio Pinheiros",
    origin: "Indicacao",
    stage: "Matricula",
    fit: "Alto",
    fitTone: "success",
    priority: "Alta",
    priorityTone: "danger",
    interest: "Plano anual para casal",
    quality: "Aprovado",
    qualityTone: "success",
    nextAction: "Enviar contrato",
    nextActionTone: "success",
    humanMode: "Copiloto",
    lastActivity: "Hoje, 10:24",
    owner: "Comercial"
  }
];

const meta = {
  title: "CRM / Operational / LeadTable",
  component: LeadTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tabela oficial de leads/listas operacionais. Usa DataTable e TablePagination de @taliya/ui; consumidores passam dados preparados e callbacks."
      }
    }
  }
} satisfies Meta<typeof LeadTable>;

export default meta;

type Story = StoryObj<typeof meta>;

function LeadTableDefaultStory() {
  const [selected, setSelected] = useState("lead-ana");
  return (
    <div style={{ padding: "24px" }}>
      <LeadTable
        onRowSelect={(row) => setSelected(row.id)}
        page={1}
        pageCount={4}
        rows={rows.map((row) => ({ ...row, selected: row.id === selected }))}
        totalLabel="1-3 de 12 leads"
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <LeadTableDefaultStory />
};

export const Empty: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <LeadTable rows={[]} state="empty" />
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <LeadTable state="loading" />
    </div>
  )
};

export const Blocked: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <LeadTable
        onItemsPerPageClick={() => undefined}
        onNextPage={() => undefined}
        onPreviousPage={() => undefined}
        rows={rows}
        state="blocked"
        totalLabel="3 leads bloqueados"
      />
    </div>
  )
};

export const DisabledRow: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <LeadTable
        rows={rows.map((row) =>
          row.id === "lead-marina"
            ? { ...row, disabled: true, nextAction: "Aguardando permissao", nextActionTone: "paused" }
            : row
        )}
        totalLabel="1-3 de 12 leads"
      />
    </div>
  )
};
