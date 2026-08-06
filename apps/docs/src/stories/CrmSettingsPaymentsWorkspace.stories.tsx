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

export const Active: Story = {
  args: { taliyaPaymentsState: "active" }
};

export const BlockedByPlan: Story = {
  args: { taliyaPaymentsState: "blocked" }
};

export const ProviderError: Story = {
  args: { taliyaPaymentsState: "error" }
};

export const ValidationError: Story = {
  args: { validationError: "A regra de desconto esta fora do limite permitido." }
};

export const BlockedPermission: Story = {
  args: { blockedReason: "Seu papel pode consultar pagamentos, mas nao pode alterar regras financeiras.", onRequestAccess: () => undefined }
};

export const SystemError: Story = {
  args: { systemError: "As regras financeiras nao foram salvas.", onRetry: () => undefined }
};
