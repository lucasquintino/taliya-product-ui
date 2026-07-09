import type { Meta } from "@storybook/react-vite";

import { Badge, IconButton, ListIcon, ListItem } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ListItem> = {
  title: "Primitives / UI / ListItem",
  component: ListItem,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-list" number="2" title="Item de lista">
          <div className="sb-batch4-list-stack">
            <ListItem
              leading={<ListIcon icon="inbox" />}
              meta="Joao Silva - Conta"
              title="Solicitacao de acesso"
              trailing={<Badge tone="info">Em andamento</Badge>}
            />
            <ListItem
              leading={<ListIcon icon="mail" />}
              meta="Maria Claro - Sistema"
              selected
              title="Falha no envio de e-mail"
              trailing={<Badge tone="warning">Em revisao</Badge>}
            />
            <ListItem
              leading={<ListIcon icon="alert" tone="warning" />}
              meta="Precisa de atencao"
              title="Relatorio mensal"
              trailing={<IconButton icon="more" label="Mais acoes" size="sm" variant="ghost" />}
              warning
            />
            <ListItem
              disabled
              leading={<ListIcon icon="lock" tone="neutral" />}
              meta="Sem permissao"
              title="Acesso negado"
              trailing={<Badge>Bloqueado</Badge>}
            />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
