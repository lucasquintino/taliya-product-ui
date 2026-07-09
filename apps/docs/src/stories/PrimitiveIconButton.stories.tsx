import type { Meta } from "@storybook/react-vite";

import { IconButton } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveRow, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof IconButton> = {
  title: "Primitives / UI / IconButton",
  component: IconButton,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="variants">
          <PrimitiveRow>
            <IconButton icon="search" label="Default" />
            <IconButton icon="plus" label="Subtle" variant="subtle" />
            <IconButton icon="calendar" label="Selected" selected />
            <IconButton icon="x" label="Danger" variant="danger" />
            <IconButton icon="more" label="Ghost" variant="ghost" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="sizes">
          <PrimitiveRow>
            <IconButton icon="search" label="Small" size="sm" />
            <IconButton icon="search" label="Medium" size="md" />
            <IconButton icon="search" label="Large" size="lg" />
            <IconButton icon="search" label="Extra large" size="xl" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="interaction">
          <PrimitiveRow>
            <IconButton className="is-hover" icon="bell" label="Hover" />
            <IconButton className="is-focus-visible" icon="bell" label="Focus" />
            <IconButton className="is-active" icon="bell" label="Active" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="alert/loading/disabled">
          <PrimitiveRow>
            <IconButton alert icon="mail" label="Alert" />
            <IconButton icon="refresh" label="Loading" loading />
            <IconButton disabled icon="bell" label="Disabled" />
          </PrimitiveRow>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
