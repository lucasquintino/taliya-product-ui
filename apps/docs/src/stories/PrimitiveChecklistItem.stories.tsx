import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { ChecklistItem } from "@taliya/ui";

import { batch8SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ChecklistItem> = {
  title: "Primitives / UI / ChecklistItem",
  component: ChecklistItem,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [checked, setChecked] = useState(false);
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="states">
          <ChecklistItem actionLabel="Revisar" owner="Sam Frank" state="complete" title="Conectar fonte de dados" />
          <ChecklistItem actionLabel="Abrir" onToggle={setChecked} owner="Nikki Olaw" state={checked ? "complete" : "incomplete"} title="Revisar consentimento" />
          <ChecklistItem actionLabel="Validar" owner="Joao Silva" state="warning" title="Validar responsaveis" />
          <ChecklistItem actionDisabled actionLabel="Bloqueado" disabled owner="Sara Alves" state="blocked" title="Publicar perfis" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
