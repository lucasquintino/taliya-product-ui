import type { Meta } from "@storybook/react-vite";

import { Button, MessageBubble } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof MessageBubble> = {
  title: "Primitives / UI / MessageBubble",
  component: MessageBubble,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-message" number="2" title="MessageBubble">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Inbound">
              <MessageBubble timestamp="09:15" variant="inbound">
                Oi! Preciso reagendar a visita tecnica para quinta-feira pela manha.
              </MessageBubble>
            </SourceItem>
            <SourceItem label="Outbound / read">
              <MessageBubble status="read" timestamp="09:16" variant="outbound">
                Claro, Ana Paula! Posso encaixar para quinta 9:00h.
              </MessageBubble>
            </SourceItem>
            <SourceItem label="Internal note">
              <MessageBubble sender="Nota interna" status="locked" timestamp="09:17" variant="internal">
                Cliente prefere periodo da manha. Verificar disponibilidade do tecnico.
              </MessageBubble>
            </SourceItem>
            <SourceItem label="Agent suggestion">
              <MessageBubble
                action={<Button size="sm" variant="secondary">Usar sugestao</Button>}
                confidence="Alta confianca"
                sender="Sugestao do copiloto"
                variant="suggestion"
              >
                Confirmar endereco e informar duracao prevista da visita.
              </MessageBubble>
            </SourceItem>
            <SourceItem label="Failed">
              <MessageBubble status="failed" timestamp="09:30" variant="failed">
                Nao foi possivel enviar a mensagem para Ana Paula.
              </MessageBubble>
            </SourceItem>
            <SourceItem label="Pending">
              <MessageBubble status="pending" timestamp="Enviando" variant="outbound">
                Mensagem programada para hoje, 09:30.
              </MessageBubble>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
