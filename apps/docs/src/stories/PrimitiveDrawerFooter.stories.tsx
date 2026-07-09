import type { Meta } from "@storybook/react-vite";

import { Button, DrawerFooter } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DrawerFooter> = {
  title: "Primitives / UI / DrawerFooter",
  component: DrawerFooter,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-drawer-part" number="2c" title="DrawerFooter">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="linha padrao">
              <div className="sb-batch5-drawer-part">
                <DrawerFooter>
                  <Button variant="secondary">Cancelar</Button>
                  <Button variant="primary">Salvar</Button>
                </DrawerFooter>
              </div>
            </SourceItem>
            <SourceItem label="grade de acoes">
              <div className="sb-batch5-drawer-part">
                <DrawerFooter layout="grid">
                  <Button leadingIcon="play" variant="primary">Abrir</Button>
                  <Button leadingIcon="check">Concluir</Button>
                  <Button leadingIcon="calendar">Reagendar</Button>
                  <Button leadingIcon="users">Delegar</Button>
                  <Button leadingIcon="link">Origem</Button>
                </DrawerFooter>
              </div>
            </SourceItem>
            <SourceItem label="stack/largura total">
              <div className="sb-batch5-drawer-part">
                <DrawerFooter layout="stack">
                  <Button variant="primary">Abrir origem</Button>
                  <Button>Assumir</Button>
                </DrawerFooter>
              </div>
            </SourceItem>
            <SourceItem label="destrutivo/bloqueado/loading">
              <div className="sb-batch5-drawer-part">
                <DrawerFooter>
                  <Button variant="secondary">Cancelar</Button>
                  <Button blockedReason="Sem permissao" variant="destructive">Excluir</Button>
                  <Button loading variant="primary">Salvando</Button>
                </DrawerFooter>
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
