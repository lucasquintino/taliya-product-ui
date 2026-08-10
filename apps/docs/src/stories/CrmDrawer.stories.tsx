import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrmDrawer, CrmProductShell } from "@taliya/crm";
import { Button } from "@taliya/ui";

import { playFirstInteractiveControl } from "./story-play";
const meta = {
  title: "CRM / Operational / CrmDrawer",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Drawer global do CRM. Ele padroniza header, conteudo scrollavel e footer fixo; paginas passam conteudo e acoes por slots."
      }
    }
  },
  play: playFirstInteractiveControl
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
    <CrmProductShell
      drawer={<CrmDrawer
        closeLabel="Fechar exemplo"
        actions={actions}
        eyebrow="Tarefa"
        facts={facts}
        headerOrder="label-title-status"
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
      />}
      subtitle="Operacao diaria"
      title="Tarefas"
    >
      <div />
    </CrmProductShell>
  )
};

export const States: Story = {
  render: () => (
    <CrmProductShell
      drawer={<CrmDrawer
        actions={actions}
        closeLabel="Fechar bloqueado"
        eyebrow="Caso"
        facts={facts}
        headerOrder="label-title-status"
        sections={[{ id: "summary", title: "Resumo", variant: "card", content: <DrawerBody /> }]}
        state="blocked"
        status="Bloqueado"
        title="Drawer bloqueado"
      />}
      subtitle="Estados operacionais"
      title="Casos"
    >
      <div />
    </CrmProductShell>
  )
};
