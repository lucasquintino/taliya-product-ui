import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Button, InlineAlert } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof InlineAlert> = {
  title: "Primitives / UI / InlineAlert",
  component: InlineAlert,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [visible, setVisible] = useState(true);
  const keepVisible = () => undefined;

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="tones">
          <InlineAlert onDismiss={keepVisible} tone="info">Informacao importante sobre o atendimento.</InlineAlert>
          <InlineAlert onDismiss={keepVisible} tone="warning">Campos verificados com campos obrigatorios.</InlineAlert>
          <InlineAlert onDismiss={keepVisible} tone="danger">Erro ao processar a solicitacao. Tente novamente.</InlineAlert>
          <InlineAlert onDismiss={keepVisible} tone="success">Alteracoes aplicadas com sucesso.</InlineAlert>
          <InlineAlert action={<Button size="sm" variant="ghost">Saiba mais</Button>} onDismiss={keepVisible} tone="quota">
            Seu plano sera atualizado em breve.
          </InlineAlert>
          <InlineAlert onDismiss={keepVisible}>Mensagem contextual.</InlineAlert>
          <InlineAlert onDismiss={keepVisible} tone="paused">Fluxo temporariamente pausado.</InlineAlert>
          <InlineAlert onDismiss={keepVisible} tone="blocked">Acesso bloqueado por limite.</InlineAlert>
        </PrimitiveState>
        <PrimitiveState label="action/dismiss">
          {visible ? (
            <InlineAlert action={<Button size="sm">Resolver</Button>} onDismiss={() => setVisible(false)} title="Conflito de agenda" tone="danger">
              Existe uma reserva no mesmo horario.
            </InlineAlert>
          ) : (
            <Button onClick={() => setVisible(true)}>Mostrar alerta</Button>
          )}
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
