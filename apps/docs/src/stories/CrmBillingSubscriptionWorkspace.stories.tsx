import type { Meta, StoryObj } from "@storybook/react-vite";

import { BillingSubscriptionWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Billing / BillingSubscriptionWorkspace",
  component: BillingSubscriptionWorkspace,
  parameters: { layout: "padded" }
} satisfies Meta<typeof BillingSubscriptionWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  args: {
    onChangePlan: () => undefined,
    onOpenAgents: () => undefined,
    onSupport: () => undefined,
    onUpdatePayment: () => undefined,
    onViewAddOns: () => undefined,
    onViewInvoices: () => undefined,
    onViewPlanDetails: () => undefined,
    onViewUsage: () => undefined
  }
};
