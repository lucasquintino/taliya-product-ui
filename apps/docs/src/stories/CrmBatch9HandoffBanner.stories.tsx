import type { Meta, StoryObj } from "@storybook/react-vite";

import { HandoffBanner } from "@taliya/crm";

import source25SamFrank from "../assets/source25-sam-frank.png";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "HandoffBanner" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Inbox / HandoffBanner",
  component: HandoffBanner
} satisfies Meta<typeof HandoffBanner>;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};

export const SourceCompact: Story = {
  parameters: { layout: "centered" },
  render: () => <HandoffBanner layout="compact" ownerAvatarSrc={source25SamFrank} />
};
