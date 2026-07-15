import type { Meta, StoryObj } from "@storybook/react-vite";

import { BillingAddOnsWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Billing / BillingAddOnsWorkspace",
  component: BillingAddOnsWorkspace,
  parameters: { layout: "centered" },
  args: { onAddOnAction: () => undefined }
} satisfies Meta<typeof BillingAddOnsWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const WithActiveAddOn: Story = {
  args: { activeAddOns: [{ id: "active-messages", state: "active" }] }
};

export const Loading: Story = { args: { loading: true } };

export const Error: Story = { args: { error: "Não foi possível carregar os add-ons." } };

export const Blocked: Story = { args: { blockedReason: "Ações indisponíveis para este perfil." } };
