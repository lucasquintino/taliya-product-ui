import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "TaskTable" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Tasks / TaskTable"
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: () => <Batch9ComponentStory component={component} />
};
