import type { Meta } from "@storybook/react-vite";

import { Chip, ContentGrid, DrawerSection, List, ListItem, Panel } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ContentGrid> = {
  title: "Primitives / UI / ContentGrid",
  component: ContentGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch4SourceDescription}\n\nContentGrid is the official responsive grid primitive for compact content sections, drawer blocks, modal summaries, and panel card groups.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="two columns default">
          <Panel compact>
            <ContentGrid>
              <DrawerSection compact title="Intencao principal">
                <p>Aluno pediu reposicao e precisa confirmar horario.</p>
                <Chip tone="neutral">reposicao</Chip>
              </DrawerSection>
              <DrawerSection compact title="Completude">
                <List dense>
                  <ListItem title="Dados" trailing={<strong>Completo</strong>} />
                  <ListItem title="Tracking" trailing={<strong>Ausente</strong>} />
                </List>
              </DrawerSection>
            </ContentGrid>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="single column">
          <Panel compact>
            <ContentGrid columns={1}>
              <DrawerSection compact title="Primeira mensagem">
                <p>Gostaria de entender horarios para voltar as aulas esta semana.</p>
              </DrawerSection>
            </ContentGrid>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="three columns">
          <Panel compact>
            <ContentGrid columns={3}>
              <DrawerSection compact title="Estado">
                <p>Aberta</p>
              </DrawerSection>
              <DrawerSection compact title="Dono">
                <p>Recepcao</p>
              </DrawerSection>
              <DrawerSection compact title="Prazo">
                <p>Hoje</p>
              </DrawerSection>
            </ContentGrid>
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
