import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Toggle } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Toggle> = {
  title: "Primitives / UI / Toggle",
  component: Toggle,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [off, setOff] = useState(false);
  const [pressed, setPressed] = useState(true);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--toggle" number="5" title="Toggle">
          <div className="sb-source-toggle-source-strip">
            <SourceItem label="Desligado">
              <Toggle aria-label="Desligado" pressed={off} onPressedChange={setOff} />
            </SourceItem>
            <SourceItem label="Ligado">
              <Toggle aria-label="Ligado" pressed={pressed} onPressedChange={setPressed} />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <Toggle aria-label="Desabilitado" disabled />
            </SourceItem>
          </div>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="5B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Com label">
              <Toggle aria-label="Com label" label="Permitir acesso" defaultPressed />
            </SourceItem>
            <SourceItem label="Compacto">
              <Toggle aria-label="Compacto" compact defaultPressed />
            </SourceItem>
            <SourceItem label="Foco">
              <Toggle aria-label="Foco" className="is-focus-visible" />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <Toggle aria-label="Bloqueado" blockedReason="Sem permissao" label="Sem permissao" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
