import type { Meta } from "@storybook/react-vite";

import { Badge } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Badge> = {
  title: "Primitives / UI / Badge",
  component: Badge,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="pill tones">
          <Badge>Neutral</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="paused">Paused</Badge>
          <Badge tone="blocked">Blocked</Badge>
        </PrimitiveState>
        <PrimitiveState label="count">
          <Badge tone="info" variant="count">3</Badge>
          <Badge tone="danger" variant="count">12</Badge>
          <Badge tone="warning" variant="count">99+</Badge>
        </PrimitiveState>
        <PrimitiveState label="dot">
          <Badge label="Novo evento" tone="success" variant="dot" />
          <Badge label="Atencao" tone="warning" variant="dot" />
          <Badge label="Erro" tone="danger" variant="dot" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
