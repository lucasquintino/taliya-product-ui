import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExecutionReceipt } from "@taliya/crm";

import { Batch10ComponentStory, batch10StoryParameters } from "./CrmBatch10StoryFixtures";
import type { Batch10StoryComponent } from "./CrmBatch10StoryFixtures";

const component = "ExecutionReceipt" satisfies Batch10StoryComponent;

const meta = {
  title: "CRM / Agents / ExecutionReceipt",
  component: ExecutionReceipt
} satisfies Meta<typeof ExecutionReceipt>;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch10StoryParameters,
  render: () => <Batch10ComponentStory component={component} />
};

export const SourceCompact: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <ExecutionReceipt layout="compact" />
      <ExecutionReceipt layout="compact" state="failed" />
    </div>
  )
};
