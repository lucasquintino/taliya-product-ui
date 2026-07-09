import type { Meta } from "@storybook/react-vite";

import { Chip, InlineGroup, ListItem, Panel, Stack } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Stack> = {
  title: "Primitives / UI / Stack",
  component: Stack,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch4SourceDescription}\n\nStack is the official vertical content layout primitive for repeated detail blocks, drawer sections, message groups, and compact panel content.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="medium gap">
          <Panel compact>
            <Stack>
              <ListItem title="Intencao" trailing={<strong>Nova matricula</strong>} />
              <ListItem title="Prazo" trailing={<strong>Hoje</strong>} />
              <ListItem title="Dono" trailing={<strong>Recepcao</strong>} />
            </Stack>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="small gap">
          <Panel compact>
            <Stack gap="sm">
              <p>Resumo operacional com linhas curtas.</p>
              <p>Usado quando o conteudo ja tem surface propria.</p>
            </Stack>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="with wrapped inline group">
          <Panel compact>
            <Stack gap="sm">
              <p>Marcadores de contexto no mesmo bloco.</p>
              <InlineGroup compact wrap>
                <Chip tone="neutral">whatsapp</Chip>
                <Chip tone="info">campanha ativa</Chip>
                <Chip tone="warning">revisar tracking</Chip>
              </InlineGroup>
            </Stack>
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
