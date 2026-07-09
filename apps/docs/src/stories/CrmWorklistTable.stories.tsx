import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrmWorklistTable } from "@taliya/crm";
import type { CrmWorklistTableColumn, CrmWorklistTableState } from "@taliya/crm";
import { Chip, IconButton } from "@taliya/ui";

interface WorklistDemoRow {
  id: string;
  name: string;
  owner: string;
  status: "Aberta" | "Em andamento" | "Aguardando";
  deadline: string;
  activity: string;
}

const columns: Array<CrmWorklistTableColumn<WorklistDemoRow>> = [
  {
    key: "name",
    header: "Item",
    sortable: true,
    width: "28%",
    render: (row) => <strong>{row.name}</strong>
  },
  { key: "owner", header: "Dono", sortable: true, width: "16%" },
  {
    key: "status",
    header: "Status",
    sortable: true,
    width: "18%",
    render: (row) => <Chip tone={row.status === "Aguardando" ? "warning" : "info"}>{row.status}</Chip>
  },
  { key: "deadline", header: "Prazo", sortable: true, width: "14%" },
  { key: "activity", header: "Ultima atividade", sortable: true }
];

const rows: WorklistDemoRow[] = [
  {
    id: "ana",
    name: "Confirmar reposicao da Ana",
    owner: "Recepcao",
    status: "Aberta",
    deadline: "Hoje",
    activity: "Ana pediu reposicao por WhatsApp"
  },
  {
    id: "marina",
    name: "Validar comprovante da Marina",
    owner: "Financeiro",
    status: "Em andamento",
    deadline: "Hoje",
    activity: "Comprovante enviado as 10:12"
  },
  {
    id: "julia",
    name: "Aguardar retorno da Julia",
    owner: "Atendimento",
    status: "Aguardando",
    deadline: "Amanha",
    activity: "Aguardando janela de contato"
  }
];

const meta = {
  title: "CRM / Layout / CrmWorklistTable"
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function WorklistTableExample({ state = "source" }: { state?: CrmWorklistTableState }) {
  return (
    <div style={{ width: 780 }}>
      <CrmWorklistTable
        ariaLabel="Tabela padrao da familia worklist"
        columns={columns}
        emptyDescription="Os registros filtrados aparecem aqui."
        emptyTitle="Nenhum item"
        heading="Itens recentes"
        loadingTitle="Carregando itens"
        pagination={{
          itemsPerPage: "10",
          label: "1-3 de 3"
        }}
        rows={rows}
        selectedRowId="ana"
        state={state}
      />
    </div>
  );
}

export const Source: Story = {
  render: () => <WorklistTableExample />
};

export const WithRowActions: Story = {
  render: () => (
    <div style={{ width: 780 }}>
      <CrmWorklistTable
        actionColumnWidth="44px"
        ariaLabel="Tabela padrao da familia worklist com acoes"
        columns={columns}
        pagination={{
          itemsPerPage: "10",
          label: "1-3 de 3"
        }}
        rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.name}`} size="sm" variant="ghost" />}
        rows={rows}
        selectedRowId="ana"
      />
    </div>
  )
};

export const CompactRows: Story = {
  render: () => (
    <div style={{ width: 780 }}>
      <CrmWorklistTable
        ariaLabel="Tabela compacta da familia worklist"
        columns={columns}
        density="compact"
        pagination={{
          itemsPerPage: "10",
          label: "1-3 de 3"
        }}
        rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.name}`} size="sm" variant="ghost" />}
        rows={rows}
        selectedRowId="ana"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {(["source", "loading", "empty", "blocked"] satisfies CrmWorklistTableState[]).map((state) => (
        <WorklistTableExample key={state} state={state} />
      ))}
    </div>
  )
};
