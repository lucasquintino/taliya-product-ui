import type { Meta } from "@storybook/react-vite";

import { StatusDot } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof StatusDot> = {
  title: "Primitives / UI / StatusDot",
  component: StatusDot,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="statuses">
          <StatusDot label="Online" status="online" />
          <StatusDot label="Success" status="success" />
          <StatusDot label="Info" status="info" />
          <StatusDot label="Pending" status="pending" />
          <StatusDot label="Warning" status="warning" />
          <StatusDot label="Paused" status="paused" />
          <StatusDot label="Danger" status="danger" />
          <StatusDot label="Error" status="error" />
          <StatusDot label="Blocked" status="blocked" />
          <StatusDot label="Neutral" status="neutral" />
        </PrimitiveState>
        <PrimitiveState label="icon-only dots">
          <StatusDot status="online" />
          <StatusDot status="warning" />
          <StatusDot status="danger" />
          <StatusDot status="neutral" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
