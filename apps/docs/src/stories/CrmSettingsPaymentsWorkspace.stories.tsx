import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsPaymentsWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsPaymentsWorkspace",
  component: SettingsPaymentsWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace oficial da página de pagamentos e financeiro. Fonte: Image 62." } }
  }
} satisfies Meta<typeof SettingsPaymentsWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Saving: Story = {
  args: { saveState: "saving" }
};
