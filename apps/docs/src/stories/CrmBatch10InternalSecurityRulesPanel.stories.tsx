import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch10ComponentStory, batch10StoryParameters } from "./CrmBatch10StoryFixtures";
import type { Batch10StoryComponent } from "./CrmBatch10StoryFixtures";

const component = "InternalSecurityRulesPanel" satisfies Batch10StoryComponent;

const meta = {
  title: "CRM / Internal / InternalSecurityRulesPanel"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch10StoryParameters,
  render: () => <Batch10ComponentStory component={component} />
};
