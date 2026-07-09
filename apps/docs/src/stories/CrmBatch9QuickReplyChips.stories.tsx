import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "QuickReplyChips" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Inbox / QuickReplyChips"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: {
    ...batch9StoryParameters,
    docs: {
      ...batch9StoryParameters.docs,
      description: {
        ...batch9StoryParameters.docs.description,
        story:
          "Source: 51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png, exact crop tmp/visual-audit/batch9/quick-reply-chips-sources/image51b-quick-reply-stack-candidate2.png. Evidence: tmp/visual-audit/batch9/quick-reply-chips-iteration4."
      }
    }
  },
  render: () => <Batch9ComponentStory component={component} />
};
