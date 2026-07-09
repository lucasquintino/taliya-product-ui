import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "CommentThread" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Operational / CommentThread"
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
          "Source: 23_round-4.1C_tarefas_01_lista-detalhe.png.png, exact card crop tmp/visual-audit/batch9/comment-thread-sources/image23-comment-thread-card-candidate5.png."
      }
    }
  },
  render: () => <Batch9ComponentStory component={component} />
};
