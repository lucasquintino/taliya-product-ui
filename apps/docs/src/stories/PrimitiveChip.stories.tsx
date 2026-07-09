import type { Meta } from "@storybook/react-vite";

import { Chip } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Chip> = {
  title: "Primitives / UI / Chip",
  component: Chip,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="tones">
          <Chip>Neutral</Chip>
          <Chip tone="success">Success</Chip>
          <Chip tone="info">Info</Chip>
          <Chip tone="warning">Warning</Chip>
          <Chip tone="danger">Danger</Chip>
          <Chip tone="paused">Paused</Chip>
          <Chip tone="blocked">Blocked</Chip>
          <Chip tone="update">Update</Chip>
          <Chip tone="quota">Quota</Chip>
        </PrimitiveState>
        <PrimitiveState label="with icons">
          <Chip icon="checkCircle" tone="success">Concluido</Chip>
          <Chip icon="alert" tone="warning">Atencao</Chip>
          <Chip icon="lock" tone="blocked">Bloqueado</Chip>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
