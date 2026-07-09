import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Button, Chip, DropdownMenu } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DropdownMenu> = {
  title: "Primitives / UI / DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [selected, setSelected] = useState("Editar");

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="open/default/selected/disabled/destructive">
          <DropdownMenu
            actions={[
              { label: "Editar", icon: "edit", selected: selected === "Editar", onSelect: () => setSelected("Editar") },
              { label: "Copiar", icon: "copy", selected: selected === "Copiar", onSelect: () => setSelected("Copiar") },
              { label: "Indisponivel", icon: "lock", disabled: true },
              { label: "Excluir", icon: "x", destructive: true, onSelect: () => setSelected("Excluir") }
            ]}
            defaultOpen
            label="Abrir menu"
          />
        </PrimitiveState>
        <PrimitiveState label="start aligned">
          <DropdownMenu
            actions={[
              { label: "Aprovar", icon: "check" },
              { label: "Pausar", icon: "pause" }
            ]}
            align="start"
            defaultOpen
            label="Menu alinhado"
          />
        </PrimitiveState>
        <PrimitiveState label="selection result">
          <Chip tone="info">{selected}</Chip>
        </PrimitiveState>
        <PrimitiveState label="closed keyboard trigger">
          <DropdownMenu
            actions={[
              { label: "Primeira acao", icon: "check" },
              { label: "Segunda acao", icon: "copy" }
            ]}
            label="Menu por teclado"
          />
        </PrimitiveState>
        <PrimitiveState label="text trigger">
          <DropdownMenu
            actions={[
              { label: "CSV", icon: "fileText" },
              { label: "PDF", icon: "download" }
            ]}
            defaultOpen
            label="Exportar"
            trigger={({ id, isOpen, label, onClick, onKeyDown }) => (
              <Button
                aria-controls={id}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                leadingIcon="upload"
                onClick={onClick}
                onKeyDown={onKeyDown}
                variant="secondary"
              >
                {label}
              </Button>
            )}
          />
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
