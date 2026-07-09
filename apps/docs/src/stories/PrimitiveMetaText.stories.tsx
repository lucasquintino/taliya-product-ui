import type { Meta } from "@storybook/react-vite";

import { InlineGroup, MetaText } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof MetaText> = {
  title: "Primitives / UI / MetaText",
  component: MetaText,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-inline" number="10" title="Meta text">
          <div className="sb-batch4-inline-grid">
            <MetaText>Texto de apoio</MetaText>
            <MetaText tone="muted">2m atras</MetaText>
            <MetaText tone="success">+12 hoje</MetaText>
            <MetaText tone="warning">Proximo do limite</MetaText>
            <MetaText tone="danger">+5 hoje</MetaText>
            <MetaText tone="info">Atualizado agora</MetaText>
            <InlineGroup>
              <strong>Casos abertos</strong>
              <MetaText tone="success">+12 hoje</MetaText>
            </InlineGroup>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
