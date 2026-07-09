import type { Meta } from "@storybook/react-vite";

import { Button, Chip, IconButton, Panel, PanelHeader } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof PanelHeader> = {
  title: "Primitives / UI / PanelHeader",
  component: PanelHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch4SourceDescription}\n\nPanelHeader is the official reusable header slot for panel surfaces, with title, description, metadata, action, compact density, and heading-level control.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="default">
          <Panel>
            <PanelHeader
              action={<Button size="sm">Nova acao</Button>}
              description="Resumo operacional com contexto suficiente para orientar a leitura."
              meta={<Chip tone="info">3 itens</Chip>}
              title="Painel operacional"
            />
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="compact">
          <Panel compact>
            <PanelHeader
              compact
              action={<IconButton icon="more" label="Mais opcoes" size="sm" variant="ghost" />}
              meta={<Chip tone="success">Ativo</Chip>}
              title="Resumo compacto"
            />
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="metadata only">
          <Panel>
            <PanelHeader
              description="Usado quando a surface precisa sinalizar estado, contagem ou fonte sem acao primaria."
              meta={<Chip tone="warning">Revisar</Chip>}
              title="Lacunas de tracking"
            />
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
