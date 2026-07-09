import type { Meta } from "@storybook/react-vite";

import { Badge, Button, Chip, DrawerHeader, InlineGroup, MetaText } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DrawerHeader> = {
  title: "Primitives / UI / DrawerHeader",
  component: DrawerHeader,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-drawer-part" number="2a" title="DrawerHeader">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="simples/fechar">
              <div className="sb-batch5-drawer-part">
                <DrawerHeader title="Reposicao da Ana sem encaixe" onClose={() => undefined} />
              </div>
            </SourceItem>
            <SourceItem label="status/meta/acoes">
              <div className="sb-batch5-drawer-part">
                <DrawerHeader
                  actions={<Button size="sm">Abrir origem</Button>}
                  meta={<InlineGroup><MetaText>Agenda</MetaText><MetaText>Hoje, 10:30</MetaText></InlineGroup>}
                  onClose={() => undefined}
                  status={<Chip tone="info">Bloqueio de agenda</Chip>}
                  title="Confirmar reposicao com Ana Paula"
                />
              </div>
            </SourceItem>
            <SourceItem label="bloqueado">
              <div className="sb-batch5-drawer-part">
                <DrawerHeader
                  meta="Precisa acompanhamento ate destravar."
                  status={<Badge tone="danger">Bloqueado</Badge>}
                  title="WhatsApp com falha de envio"
                />
              </div>
            </SourceItem>
            <SourceItem label="compacto">
              <div className="sb-batch5-drawer-part">
                <DrawerHeader compact meta="Atualizado em 28/04/2024 14:32" title="Atendimento #1048" />
              </div>
            </SourceItem>
            <SourceItem label="fechar/acao desabilitados">
              <div className="sb-batch5-drawer-part">
                <DrawerHeader
                  actions={<Button disabled size="sm">Abrir origem</Button>}
                  closeDisabled
                  meta="Acao indisponivel para este perfil"
                  onClose={() => undefined}
                  status={<Badge tone="blocked">Bloqueado</Badge>}
                  title="Registro sem permissao"
                />
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
