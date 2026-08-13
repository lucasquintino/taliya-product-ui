import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { ChecklistItem } from "@taliya/ui";

import { batch8SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

import { playFirstInteractiveControl } from "./story-play";
const meta: Meta<typeof ChecklistItem> = {
  title: "Primitives / UI / ChecklistItem",
  component: ChecklistItem,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } },
  play: playFirstInteractiveControl
};

export default meta;

export function AllStates() {
  const [checked, setChecked] = useState(false);
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="states">
          <div role="group" aria-label="Estados da checklist">
            <ChecklistItem actionLabel="Revisar" owner="Sam Frank" state="complete" title="Conectar fonte de dados" />
            <ChecklistItem actionLabel="Abrir" onToggle={setChecked} owner="Nikki Olaw" state={checked ? "complete" : "incomplete"} title="Revisar consentimento" />
            <ChecklistItem actionLabel="Validar" owner="Joao Silva" state="warning" title="Validar responsaveis" />
            <ChecklistItem actionDisabled actionLabel="Bloqueado" disabled owner="Sara Alves" state="blocked" title="Publicar perfis" />
          </div>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
