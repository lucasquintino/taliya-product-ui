import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsNotificationsWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsNotificationsWorkspace",
  component: SettingsNotificationsWorkspace,
  parameters: { layout: "padded" }
} satisfies Meta<typeof SettingsNotificationsWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  args: {
    onCancel: () => undefined,
    onChannelChange: () => undefined,
    onFrequencyChange: () => undefined,
    onRoleSelect: () => undefined,
    onSave: () => undefined
  }
};

export const Saving: Story = {
  args: {
    ...Source.args,
    saveState: "saving"
  }
};
