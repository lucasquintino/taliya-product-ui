import type { Meta } from "@storybook/react-vite";

import { Button, EmptyState, IconButton } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives / UI / EmptyState",
  component: EmptyState,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-state" number="7" title="Empty state">
          <div className="sb-batch4-state-grid">
            <SourceItem label="Sem resultados">
              <EmptyState action={<Button size="sm" variant="secondary">Limpar filtros</Button>} description="Nenhum resultado encontrado." icon="search" title="Sem resultados" />
            </SourceItem>
            <SourceItem label="Sem permissao">
              <EmptyState description="Voce nao tem permissao para visualizar este item." icon="lock" title="Sem permissao" variant="blocked" />
            </SourceItem>
            <SourceItem label="Sem integracao">
              <EmptyState action={<Button size="sm" variant="secondary">Conectar</Button>} description="Nenhuma integracao encontrada." icon="link" title="Sem integracao" />
            </SourceItem>
            <SourceItem label="Com CTA circular">
              <EmptyState action={<IconButton icon="plus" label="Adicionar" variant="selected" />} description="Nada por aqui." icon="folder" title="Com CTA circular" />
            </SourceItem>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
