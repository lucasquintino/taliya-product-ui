import type { Meta, StoryObj } from "@storybook/react-vite";

import { Roster } from "@taliya/crm";

const meta = { title: "CRM / Agenda / Roster", component: Roster, parameters: { layout: "fullscreen" } } satisfies Meta<typeof Roster>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SourceReference: Story = {
  args: {
    students: [
      { id: "ana", name: "Ana Beatriz", status: "pending", credit: 0 },
      { id: "bruno", name: "Bruno Lima", status: "warned", observation: "Viagem", credit: 1 },
      { id: "carla", name: "Carla Mendes", status: "present", observation: "Chegou 5 min atrasada", credit: 0 },
      { id: "diego", name: "Diego Souza", status: "no-show", observation: "Sem aviso", credit: 1 },
      { id: "fernanda", name: "Fernanda Alves", status: "present", credit: 0 }
    ],
    variant: "reference"
  },
  render: (args) => <div style={{ width: "805px" }}><Roster {...args} /></div>
};
