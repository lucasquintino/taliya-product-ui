import type { Meta } from "@storybook/react-vite";

import { Badge, Chip, IconButton, InlineGroup, MetaText } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof InlineGroup> = {
  title: "Primitives / UI / InlineGroup",
  component: InlineGroup,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-inline" number="10" title="Inline group">
          <div className="sb-batch4-inline-grid">
            <InlineGroup compact>
              <Chip tone="info">Em andamento</Chip>
              <MetaText>10:24</MetaText>
            </InlineGroup>
            <InlineGroup>
              <Badge tone="success">Resolvido</Badge>
              <MetaText tone="muted">Ontem</MetaText>
            </InlineGroup>
            <InlineGroup>
              <MetaText>Responsavel</MetaText>
              <strong>Sam Frank</strong>
            </InlineGroup>
            <InlineGroup wrap>
              <IconButton icon="plus" label="Adicionar" size="sm" />
              <IconButton icon="calendar" label="Agendar" size="sm" />
              <IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />
            </InlineGroup>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
