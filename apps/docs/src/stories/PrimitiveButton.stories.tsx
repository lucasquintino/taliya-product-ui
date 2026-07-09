import type { Meta } from "@storybook/react-vite";

import { Button } from "@taliya/ui";

import { batch2SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Button> = {
  title: "Primitives / UI / Button",
  component: Button,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--button" number="1" title="Botoes">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="hierarquia">
              <div className="sb-source-button-stack">
                <Button leadingIcon="plus" variant="primary">Criar</Button>
                <Button leadingIcon="filter">Filtrar</Button>
                <Button trailingIcon="arrowRight" variant="ghost">Avancar</Button>
                <Button variant="destructive">Remover</Button>
              </div>
            </SourceItem>
            <SourceItem label="densidade">
              <div className="sb-source-button-stack">
                <Button size="sm">Pequeno</Button>
                <Button size="md">Medio</Button>
                <Button size="lg">Grande</Button>
              </div>
            </SourceItem>
            <SourceItem label="interacao">
              <div className="sb-source-button-stack">
                <Button className="is-hover">Hover</Button>
                <Button className="is-focus-visible">Foco</Button>
                <Button className="is-active">Pressionado</Button>
              </div>
            </SourceItem>
            <SourceItem label="indisponivel">
              <div className="sb-source-button-stack">
                <Button disabled>Desabilitado</Button>
                <Button loading>Salvando</Button>
                <Button blockedReason="Sem permissao">Bloqueado</Button>
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
