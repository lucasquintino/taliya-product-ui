import type { Meta } from "@storybook/react-vite";

import { NavPill } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof NavPill> = {
  title: "Primitives / UI / NavPill",
  component: NavPill,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="default/active/count">
          <NavPill>Hoje</NavPill>
          <NavPill count="4">Tarefas</NavPill>
          <NavPill active aria-current="page">Jornadas</NavPill>
        </PrimitiveState>
        <PrimitiveState label="interaction">
          <NavPill className="is-hover">Hover</NavPill>
          <NavPill className="is-focus-visible">Focus</NavPill>
          <NavPill className="is-active">Active</NavPill>
        </PrimitiveState>
        <PrimitiveState label="with icon/disabled">
          <NavPill icon="calendar">Agenda</NavPill>
          <NavPill disabled>Disabled</NavPill>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
