import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsAgendaWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsAgendaWorkspace",
  component: SettingsAgendaWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace oficial de exceções, bloqueios e regras globais da agenda. Fonte: Image 63." } }
  }
} satisfies Meta<typeof SettingsAgendaWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Saving: Story = {
  args: { saveState: "saving" }
};
