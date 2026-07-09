import type { Meta } from "@storybook/react-vite";

import { Button, ErrorState, LoadingState, StatePage } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof StatePage> = {
  title: "Primitives / UI / StatePage",
  component: StatePage,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel number="9" title="State page">
          <SourceItem label="Loading">
            <StatePage as="section" aria-label="Estado de carregamento">
              <LoadingState title="Carregando visao operacional" variant="panel" />
            </StatePage>
          </SourceItem>
          <SourceItem label="Error">
            <StatePage as="section" aria-label="Estado de erro">
              <ErrorState
                action={<Button variant="primary">Tentar novamente</Button>}
                blocking
                description="A operacao falhou antes de carregar a visao operacional."
                title="Nao foi possivel carregar"
              />
            </StatePage>
          </SourceItem>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
