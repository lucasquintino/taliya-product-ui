import type { Meta } from "@storybook/react-vite";

import { ConfidenceMeter } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ConfidenceMeter> = {
  title: "Primitives / UI / ConfidenceMeter",
  component: ConfidenceMeter,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-confidence" number="10" title="Card de confianca">
          <ConfidenceMeter compact helperText="Baseado em contexto, historico e intencao detectada." value={86} />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="10b" title="Estados de confianca">
          <div className="sb-batch8-card-grid">
            <ConfidenceMeter compact helperText="Faltam dados do historico recente." value={58} />
            <ConfidenceMeter compact helperText="Pouco contexto para automatizar." value={28} />
            <ConfidenceMeter compact helperText="Aguardando leitura." loading value={0} />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
