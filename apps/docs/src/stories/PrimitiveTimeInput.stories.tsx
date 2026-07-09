import type { Meta } from "@storybook/react-vite";

import { TimeInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof TimeInput> = {
  title: "Primitives / UI / TimeInput",
  component: TimeInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--datetime" number="7" title="Seletor de horario compacto">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Campo de horario">
              <TimeInput aria-label="Campo de horario" fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Selecionado">
              <TimeInput aria-label="Selecionado" defaultValue="09 : 30" fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <TimeInput aria-label="Desabilitado" defaultValue="11 : 00" disabled fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="7C" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Erro">
              <TimeInput aria-label="Erro" defaultValue="25 : 90" error="Horario invalido" fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <TimeInput aria-label="Bloqueado" blockedReason="Sem permissao." defaultValue="09 : 30" fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
