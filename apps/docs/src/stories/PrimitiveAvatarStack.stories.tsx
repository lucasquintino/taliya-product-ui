import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { AvatarStack, Badge, Chip } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof AvatarStack> = {
  title: "Primitives / UI / AvatarStack",
  component: AvatarStack,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [adds, setAdds] = useState(0);

  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="stack/count">
          <AvatarStack
            people={[
              { id: "1", name: "Niki Olson", src: image79Avatar, status: "online" },
              { id: "2", name: "Ana Paula", badge: <Badge tone="info" variant="count">3</Badge> },
              { id: "3", name: "Julia Dias" },
              { id: "4", name: "Marcos Lima" }
            ]}
          />
        </PrimitiveState>
        <PrimitiveState label="max/add interaction">
          <AvatarStack
            max={2}
            onAdd={() => setAdds((value) => value + 1)}
            showAdd
            people={[
              { id: "1", name: "Niki Olson", src: image79Avatar, status: "online" },
              { id: "2", name: "Ana Paula" },
              { id: "3", name: "Julia Dias" }
            ]}
          />
          <Chip tone="info">adds {adds}</Chip>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
