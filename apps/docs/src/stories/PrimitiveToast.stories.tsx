import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Button, Toast } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Toast> = {
  title: "Primitives / UI / Toast",
  component: Toast,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [open, setOpen] = useState(true);
  const keepOpen = () => undefined;

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="tones">
          <Toast onClose={keepOpen} tone="success">Atendimento salvo com sucesso.</Toast>
          <Toast onClose={keepOpen} tone="warning">Verifique os dados informados.</Toast>
          <Toast onClose={keepOpen} tone="danger">Falha ao salvar atendimento.</Toast>
          <Toast action={<Button size="sm" variant="ghost">Ver</Button>} onClose={keepOpen} tone="info">
            Relatorio exportado com sucesso.
          </Toast>
          <Toast action={<Button size="sm" variant="ghost">Atualizar</Button>} onClose={keepOpen} tone="update">
            Atualizacoes disponiveis.
          </Toast>
          <Toast onClose={keepOpen}>Mensagem informativa.</Toast>
          <Toast onClose={keepOpen} tone="paused">Agente pausado.</Toast>
          <Toast onClose={keepOpen} tone="blocked">Acesso bloqueado.</Toast>
        </PrimitiveState>
        <PrimitiveState label="action/dismiss">
          {open ? (
            <Toast action={<Button size="sm" variant="ghost">Ver</Button>} onClose={() => setOpen(false)} tone="success">
              Jornada salva.
            </Toast>
          ) : (
            <Button onClick={() => setOpen(true)}>Mostrar toast</Button>
          )}
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
