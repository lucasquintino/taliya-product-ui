import type { Meta } from "@storybook/react-vite";

import { Chip, DrawerSection, InlineAlert, InlineGroup, List, ListIcon, ListItem, MetaText } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DrawerSection> = {
  title: "Primitives / UI / DrawerSection",
  component: DrawerSection,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-drawer-part" number="2b" title="DrawerSection">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="linhas padrao">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection title="Detalhes">
                  <List dense divided>
                    <ListItem leading={<ListIcon icon="calendar" tone="neutral" />} title="Prazo" trailing={<MetaText>Hoje, 10:30</MetaText>} />
                    <ListItem leading={<ListIcon icon="user" tone="neutral" />} title="Responsavel" trailing={<MetaText>Mariana</MetaText>} />
                  </List>
                </DrawerSection>
              </div>
            </SourceItem>
            <SourceItem label="bloco sutil">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection title="Alternativas possiveis" variant="subtle">
                  <InlineGroup><strong>Turma quinta 08h</strong><MetaText>1 vaga</MetaText><Chip tone="success">Disponivel</Chip></InlineGroup>
                  <InlineGroup><strong>Turma terca 17h</strong><MetaText>1 vaga</MetaText><Chip tone="warning">Depende</Chip></InlineGroup>
                </DrawerSection>
              </div>
            </SourceItem>
            <SourceItem label="divided">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection title="Historico curto" variant="divided">
                  <List dense>
                    <ListItem meta="09:10" title="Ana pediu reposicao pelo WhatsApp" />
                    <ListItem meta="09:14" title="Sistema nao encontrou vaga atual" />
                    <ListItem meta="09:20" title="Recepcao assumiu a pendencia" />
                  </List>
                </DrawerSection>
              </div>
            </SourceItem>
            <SourceItem label="vazio">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection empty={<MetaText>Nenhuma atividade encontrada.</MetaText>} title="Checklist" />
              </div>
            </SourceItem>
            <SourceItem label="loading">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection loading title="Checklist" />
              </div>
            </SourceItem>
            <SourceItem label="bloqueado/read-only">
              <div className="sb-batch5-drawer-part sb-batch5-drawer-part--body">
                <DrawerSection title="Acesso">
                  <InlineAlert tone="warning" title="Somente leitura">
                    Esta secao esta bloqueada ate revisao humana.
                  </InlineAlert>
                </DrawerSection>
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
