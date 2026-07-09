import type { Meta } from "@storybook/react-vite";

import { Chip, List, ListItem, Panel, PanelBody, PanelHeader, Stack } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof PanelBody> = {
  title: "Primitives / UI / PanelBody",
  component: PanelBody,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch4SourceDescription}\n\nPanelBody is the official content slot for panels that need padded body content below a PanelHeader.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="default body">
          <Panel>
            <PanelHeader meta={<Chip showDot={false}>3</Chip>} title="Resumo operacional" />
            <PanelBody>
              <Stack gap="sm">
                <p>Conteudo principal do painel com respiro padronizado.</p>
                <p>Usado quando o filho nao possui padding proprio.</p>
              </Stack>
            </PanelBody>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="compact body">
          <Panel>
            <PanelHeader compact title="Saude do agente" />
            <PanelBody compact>
              <List dense>
                <ListItem title="Automacoes bloqueadas" trailing={<strong>2</strong>} />
                <ListItem title="Runtime incompleto" trailing={<strong>1</strong>} />
              </List>
            </PanelBody>
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
