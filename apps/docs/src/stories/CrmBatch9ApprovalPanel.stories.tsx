import type { Meta, StoryObj } from "@storybook/react-vite";

import { ApprovalPanel } from "@taliya/crm";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "ApprovalPanel" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Approvals / ApprovalPanel",
  component: ApprovalPanel
} satisfies Meta<typeof ApprovalPanel>;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};

export const SourceCompact: Story = {
  parameters: { layout: "centered" },
  render: () => <ApprovalPanel layout="compact" />
};
