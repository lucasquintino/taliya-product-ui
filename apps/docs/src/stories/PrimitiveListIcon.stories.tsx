import type { Meta } from "@storybook/react-vite";

import { InlineGroup, ListIcon, MetaText } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ListIcon> = {
  title: "Primitives / UI / ListIcon",
  component: ListIcon,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-inline" number="2" title="List icon">
          <div className="sb-batch4-inline-grid">
            <InlineGroup><ListIcon icon="inbox" /><MetaText>Info / conta</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="check" tone="success" /><MetaText>Resolvido</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="alert" tone="warning" /><MetaText>Alerta</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="refresh" tone="danger" /><MetaText>Erro</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="lock" tone="neutral" /><MetaText>Bloqueado</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="pause" tone="paused" /><MetaText>Pausado</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="sparkles" tone="update" /><MetaText>Atualizacao</MetaText></InlineGroup>
            <InlineGroup><ListIcon icon="coins" tone="quota" /><MetaText>Cota</MetaText></InlineGroup>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
