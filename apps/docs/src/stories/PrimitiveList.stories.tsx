import type { Meta } from "@storybook/react-vite";

import { Badge, Button, InlineGroup, List, ListIcon, ListItem, MetaText } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof List> = {
  title: "Primitives / UI / List",
  component: List,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

const items = [
  ["Solicitacao de acesso", "Joao Silva - Conta", "Em andamento", "10:24"],
  ["Falha no envio de e-mail", "Maria Claro - Sistema", "Em revisao", "10:15"],
  ["Relatorio mensal", "Nikol Clev - Relatorio", "Aguardando", "14:32"],
  ["Integracao com ERP", "Maria Claro - Integracao", "Em andamento", "11:33"],
  ["Acesso negado", "Sam Frank - Acesso", "Resolvido", "Ontem"]
];

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-list" number="2" title="Lista densa">
          <div className="sb-batch4-list-stack">
            <List dense divided>
              {items.map(([title, metaText, status, time], index) => (
                <ListItem
                  key={title}
                  leading={<ListIcon icon={index % 2 === 0 ? "inbox" : "mail"} tone={index === 1 ? "danger" : index === 2 ? "success" : index === 4 ? "neutral" : "info"} />}
                  meta={metaText}
                  title={title}
                  trailing={<InlineGroup><Badge tone={status === "Resolvido" ? "success" : "info"}>{status}</Badge><MetaText>{time}</MetaText></InlineGroup>}
                  unread={index === 0}
                />
              ))}
            </List>
          </div>
          <Button size="sm" variant="secondary">Ver mais</Button>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
