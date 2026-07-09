import type { Meta, StoryObj } from "@storybook/react-vite";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "ChecklistRow" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Operational / ChecklistRow"
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
          "Source: 23_round-4.1C_tarefas_01_lista-detalhe.png.png, exact row crop tmp/visual-audit/batch9/checklist-row-sources/image23-checklist-row1-candidate2.png and source stack crop tmp/visual-audit/batch9/checklist-row-sources/image23-checklist-stack-candidate1.png."
      }
    }
  },
  render: () => <Batch9ComponentStory component={component} />
};
