import type { Meta } from "@storybook/react-vite";

import { ConnectorLine } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ConnectorLine> = {
  title: "Primitives / UI / ConnectorLine",
  component: ConnectorLine,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-connector" number="8" title="ConnectorLine">
          <div className="sb-batch4-connector-grid">
            <span>Linha azul</span>
            <ConnectorLine startNode />
            <span>Linha vermelha</span>
            <ConnectorLine startNode tone="danger" />
            <span>Linha azul com no</span>
            <ConnectorLine endNode startNode variant="elbow" />
            <span>Linha vermelha com no</span>
            <ConnectorLine startNode tone="danger" variant="elbow" />
            <span>Conector curvo</span>
            <ConnectorLine startNode variant="curved" />
            <span>Conector pontilhado</span>
            <ConnectorLine arrow={false} startNode tone="neutral" variant="dashed" />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
