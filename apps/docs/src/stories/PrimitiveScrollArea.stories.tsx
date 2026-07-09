import type { Meta } from "@storybook/react-vite";

import { Badge, Card, Chip, List, ListIcon, ListItem, ScrollArea } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ScrollArea> = {
  title: "Primitives / UI / ScrollArea",
  component: ScrollArea,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-list" number="2" title="Scroll area">
          <div className="sb-batch4-list-stack">
            <ScrollArea className="sb-batch4-scroll-demo">
              <List dense divided>
                {Array.from({ length: 9 }, (_, index) => (
                  <ListItem
                    key={index}
                    leading={<ListIcon icon={index % 2 === 0 ? "inbox" : "message"} tone={index % 3 === 0 ? "warning" : index % 3 === 1 ? "danger" : "success"} />}
                    meta={index % 2 === 0 ? "Joao Silva - Conta" : "Maria Claro - Sistema"}
                    title={index % 2 === 0 ? "Solicitacao de acesso" : "Falha no envio de e-mail"}
                    trailing={<Badge tone={index % 3 === 0 ? "warning" : "info"}>{index % 3 === 0 ? "Alerta" : "Ativo"}</Badge>}
                  />
                ))}
              </List>
            </ScrollArea>
          </div>
          <ScrollArea className="sb-batch4-scroll-horizontal" orientation="horizontal">
            <div>
              {["Status: Em andamento", "Prioridade: Alta", "Responsavel: Sam Frank", "Categoria: Conta", "Periodo: Abril"].map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="sb-batch4-scroll-both" orientation="both">
            <div>
              {Array.from({ length: 6 }, (_, index) => (
                <Card compact key={index} pattern="mini">
                  <strong>Coluna {index + 1}</strong>
                  <span>{index % 2 === 0 ? "Em andamento" : "Resolvido"}</span>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
