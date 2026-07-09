import type { Meta } from "@storybook/react-vite";

import { Avatar, Badge } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Avatar> = {
  title: "Primitives / UI / Avatar",
  component: Avatar,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="sizes">
          <Avatar name="Niki Olson" size="xs" src={image79Avatar} />
          <Avatar name="Niki Olson" size="sm" src={image79Avatar} />
          <Avatar name="Niki Olson" size="md" src={image79Avatar} />
          <Avatar name="Niki Olson" size="lg" src={image79Avatar} />
          <Avatar name="Niki Olson" size="xl" src={image79Avatar} />
          <Avatar name="Ana Paula Martins" size="2xl" src={image79Avatar} />
        </PrimitiveState>
        <PrimitiveState label="fallback/status/badge">
          <Avatar badge={<Badge tone="info" variant="count">2</Badge>} name="Niki Olson" src={image79Avatar} status="online" />
          <Avatar name="Ana Paula" status="warning" />
          <Avatar name="Fallback Sem Imagem" status="danger" />
          <Avatar name="Agente Info" status="info" />
        </PrimitiveState>
        <PrimitiveState label="selected/disabled">
          <Avatar name="Selecionado" selected />
          <Avatar disabled name="Desabilitado" status="paused" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
