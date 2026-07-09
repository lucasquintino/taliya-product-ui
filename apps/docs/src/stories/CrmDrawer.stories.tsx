import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrmDrawer } from "@taliya/crm";
import { Button } from "@taliya/ui";

const meta = {
  title: "CRM / Operational / CrmDrawer",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Drawer global do CRM. Ele padroniza header, conteudo scrollavel e footer fixo; paginas passam conteudo e acoes por slots."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DrawerBody() {
  return (
    <p>Conteudo dinamico da pagina consumidora. A estrutura visual, os fatos, as secoes, o scroll e o footer pertencem ao drawer global.</p>
  );
}

const facts = [
  { id: "origin", icon: "calendar" as const, label: "Origem canonica", value: "Agenda / Reposicoes" },
  { id: "owner", icon: "user" as const, label: "Dono / fila", value: "Recepcao" }
];

const actions = [
  { id: "origin", label: "Abrir origem", variant: "primary" as const, fullWidth: true },
  { id: "assume", label: "Assumir", variant: "secondary" as const },
  { id: "comment", label: "Comentar", variant: "secondary" as const }
];

export const Source: Story = {
  render: () => (
    <div style={{ height: 720, width: 360 }}>
      <CrmDrawer
        closeLabel="Fechar exemplo"
        actions={actions}
        eyebrow="Tarefa"
        facts={facts}
        headerOrder="label-title-status"
        placement="overlay"
        sections={[
          {
            id: "summary",
            title: "Resumo",
            trailing: <Button size="sm" variant="ghost">Ver todos</Button>,
            variant: "card",
            content: <DrawerBody />
          }
        ]}
        status="Aberta"
        title="Confirmar reposicao da Ana"
      />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(3, 360px)" }}>
      {["open", "loading", "blocked"].map((state) => (
        <div key={state} style={{ height: 640, width: 360 }}>
          <CrmDrawer
            closeLabel={`Fechar ${state}`}
            actions={actions}
            eyebrow="Caso"
            facts={facts}
            headerOrder="label-title-status"
            loading={state === "loading"}
            placement={state === "open" ? "overlay" : "inline"}
            sections={[{ id: "summary", title: "Resumo", variant: "card", content: <DrawerBody /> }]}
            state={state}
            status={state === "blocked" ? "Bloqueado" : "Aberto"}
            title={`Drawer ${state}`}
          />
        </div>
      ))}
    </div>
  )
};
