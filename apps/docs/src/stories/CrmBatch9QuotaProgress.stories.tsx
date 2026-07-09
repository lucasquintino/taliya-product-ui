import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "QuotaProgress" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Usage / QuotaProgress"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};
