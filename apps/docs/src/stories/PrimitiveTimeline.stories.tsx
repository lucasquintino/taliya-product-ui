import type { Meta } from "@storybook/react-vite";

import { Button, Timeline } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Timeline> = {
  title: "Primitives / UI / Timeline",
  component: Timeline,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

const items = [
  { id: "1", icon: "calendar" as const, title: "Caso criado por Sam Frank", time: "10:24", description: "por Sam Frank", tone: "info" as const },
  { id: "2", icon: "check" as const, title: "Cliente enviou novos documentos", time: "09:15", description: "por Joao Silva", tone: "success" as const },
  { id: "3", icon: "arrowRight" as const, title: "Prioridade alterada para Alta", time: "14:03", description: "por Sam Frank", tone: "danger" as const },
  { id: "4", icon: "message" as const, title: "Comentario adicionado ao caso", time: "11:43", description: "por Joao Silva", tone: "neutral" as const }
];

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-timeline" number="5" title="Timeline">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Default">
              <Timeline items={items} />
            </SourceItem>
            <SourceItem label="Compact">
              <Timeline compact items={items.slice(0, 3)} />
            </SourceItem>
            <SourceItem label="Execution">
              <Timeline
                items={[
                  { id: "1", icon: "check" as const, title: "Receber mensagem", meta: "Webhook", time: "0,45 s", tone: "success" as const },
                  { id: "2", icon: "bot" as const, title: "Gerar resposta (LLM)", meta: "Assistente de texto", time: "2,31 s", tone: "info" as const },
                  { id: "3", icon: "alert" as const, title: "Enviar mensagem", meta: "WhatsApp API", time: "Timeout", tone: "danger" as const }
                ]}
                variant="execution"
              />
            </SourceItem>
            <SourceItem label="Sensitive / audit">
              <Timeline
                items={[
                  {
                    action: <Button size="sm" variant="secondary">Ver detalhes</Button>,
                    actor: "Sam Frank",
                    icon: "shield" as const,
                    id: "audit-1",
                    meta: "Origem API",
                    title: "Aprovou desconto",
                    tone: "warning" as const
                  }
                ]}
                variant="sensitive"
              />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
