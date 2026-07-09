import type { Meta } from "@storybook/react-vite";

import { Button, ErrorState } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ErrorState> = {
  title: "Primitives / UI / ErrorState",
  component: ErrorState,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-state" number="9" title="Error state">
          <div className="sb-batch4-state-grid">
            <SourceItem label="Erro ao carregar">
              <ErrorState action={<Button size="sm" variant="secondary">Tentar novamente</Button>} description="Nao foi possivel carregar os dados." icon="cloudOff" title="Erro ao carregar" />
            </SourceItem>
            <SourceItem label="Falha na integracao">
              <ErrorState action={<Button size="sm" variant="ghost">Ver detalhes</Button>} description="Falha na conexao com a integracao." icon="unplug" title="Falha na integracao" />
            </SourceItem>
            <SourceItem label="Acao de retry">
              <ErrorState action={<Button size="sm" variant="primary">Tentar novamente</Button>} description="Tente novamente em alguns instantes." icon="refresh" title="Acao de retry" />
            </SourceItem>
            <SourceItem label="Suporte">
              <ErrorState action={<Button size="sm" variant="ghost">Abrir chamado</Button>} description="Ainda precisa de ajuda?" icon="headphones" title="Suporte" />
            </SourceItem>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
