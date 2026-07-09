import type { Meta } from "@storybook/react-vite";

import { DateInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DateInput> = {
  title: "Primitives / UI / DateInput",
  component: DateInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--datetime" number="7" title="Seletor de data compacto">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Campo de data">
              <DateInput aria-label="Campo de data" fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Selecionado">
              <DateInput aria-label="Selecionado" defaultValue="28 / 04 / 2024" fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Erro">
              <DateInput aria-label="Erro" defaultValue="99 / 99 / 2024" error="Data invalida" fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="7B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Desabilitado">
              <DateInput aria-label="Desabilitado" defaultValue="28 / 04 / 2024" disabled fieldSize="sm" />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <DateInput aria-label="Bloqueado" blockedReason="Sem permissao." defaultValue="28 / 04 / 2024" fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
