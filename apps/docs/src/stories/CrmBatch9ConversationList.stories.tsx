import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConversationList } from "@taliya/crm";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "ConversationList" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Inbox / ConversationList"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};

export const SourceCompact: Story = {
  parameters: batch9StoryParameters,
  render: () => <ConversationList layout="compact" onSearchFilter={() => undefined} />
};
