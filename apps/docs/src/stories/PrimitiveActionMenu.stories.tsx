import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { ActionMenu, Chip } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ActionMenu> = {
  title: "Primitives / UI / ActionMenu",
  component: ActionMenu,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [action, setAction] = useState("Nenhuma acao");

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="row/card actions">
          <ActionMenu
            actions={[
              { label: "Aprovar", icon: "check", onSelect: () => setAction("Aprovar") },
              { label: "Pausar", icon: "pause", onSelect: () => setAction("Pausar") },
              { label: "Remover", icon: "x", destructive: true, onSelect: () => setAction("Remover") }
            ]}
            defaultOpen
            label="Mais opcoes"
          />
        </PrimitiveState>
        <PrimitiveState label="disabled action">
          <ActionMenu
            actions={[
              { label: "Duplicar", icon: "copy" },
              { label: "Bloqueado", icon: "lock", disabled: true }
            ]}
            defaultOpen
            label="Acoes bloqueadas"
          />
        </PrimitiveState>
        <PrimitiveState label="selection result">
          <Chip tone="info">{action}</Chip>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
