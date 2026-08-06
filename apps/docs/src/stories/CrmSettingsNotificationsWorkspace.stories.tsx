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

export const ChannelUnavailable: Story = {
  args: {
    ...Source.args,
    unavailableChannelReasons: { whatsapp: "WhatsApp da equipe indisponível. Revise o canal oficial." }
  }
};

export const ReviewAlert: Story = {
  args: {
    ...Source.args,
    reviewAlertIdsByRole: { owner: ["integration-failure"] },
    selectedRoleId: "owner"
  }
};

export const BlockedPermission: Story = {
  args: { ...Source.args, blockedReason: "Seu papel pode consultar alertas, mas nao pode altera-los.", onRequestAccess: () => undefined }
};

export const ValidationError: Story = {
  args: { ...Source.args, validationError: "Selecione ao menos um canal para alertas criticos." }
};

export const SystemError: Story = {
  args: { ...Source.args, systemError: "As preferencias de notificacao nao foram salvas.", onRetry: () => undefined }
};
