import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { FilterChip } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FilterChip> = {
  title: "Primitives / UI / FilterChip",
  component: FilterChip,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [removed, setRemoved] = useState(false);

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="default/selected/count">
          <FilterChip>Todos</FilterChip>
          <FilterChip selected>Ativos</FilterChip>
          <FilterChip count="12">Pendentes</FilterChip>
        </PrimitiveState>
        <PrimitiveState label="removable">
          <FilterChip removable>Cliente VIP</FilterChip>
          {removed ? (
            <FilterChip onClick={() => setRemoved(false)}>Restaurar filtro</FilterChip>
          ) : (
            <FilterChip removable onRemove={() => setRemoved(true)} selected>
              Alta prioridade
            </FilterChip>
          )}
        </PrimitiveState>
        <PrimitiveState label="interaction/disabled">
          <FilterChip className="is-hover">Hover</FilterChip>
          <FilterChip className="is-focus-visible">Focus</FilterChip>
          <FilterChip className="is-active">Active</FilterChip>
          <FilterChip disabled>Disabled</FilterChip>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
