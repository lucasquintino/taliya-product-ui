import type { Meta } from "@storybook/react-vite";

import { Input } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Input> = {
  title: "Primitives / UI / Input",
  component: Input,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--input" number="1" title="Input de texto">
          <SourceGrid className="sb-source-grid--5">
            <SourceItem label="Padrao">
              <Input aria-label="Padrao" placeholder="Digite algo..." />
            </SourceItem>
            <SourceItem label="Foco">
              <Input aria-label="Foco" className="is-focus-visible" placeholder="Digite algo..." />
            </SourceItem>
            <SourceItem label="Preenchido">
              <Input aria-label="Preenchido" defaultValue="Joao Silva" trailingIcon="user" />
            </SourceItem>
            <SourceItem label="Erro">
              <Input aria-label="Erro" defaultValue="Joao Silva" error="Informe um nome valido." trailingIcon="alertCircle" />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <Input aria-label="Desabilitado" defaultValue="Joao Silva" disabled />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="1B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Read-only">
              <Input aria-label="Read-only" defaultValue="Joao Silva" readOnly />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <Input aria-label="Bloqueado" blockedReason="Sem permissao para editar." defaultValue="Joao Silva" />
            </SourceItem>
            <SourceItem label="Com limpar">
              <Input aria-label="Com limpar" defaultValue="Joao Silva" onClear={() => undefined} />
            </SourceItem>
            <SourceItem label="Carregando">
              <Input aria-label="Carregando" leadingIcon="search" loading placeholder="Buscando..." />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
