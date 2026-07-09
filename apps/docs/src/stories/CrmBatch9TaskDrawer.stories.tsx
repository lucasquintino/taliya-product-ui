import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "TaskDrawer" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Operational / TaskDrawer"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: {
    ...batch9StoryParameters,
    docs: {
      description: {
        component:
          "Source: 18_round-4.1A_hoje_02_drawer-tarefa.png.png, exact panel crop tmp/visual-audit/batch9/task-drawer-sources/image18-task-drawer-full-candidate3.png."
      }
    }
  },
  render: () => <Batch9ComponentStory component={component} />
};
