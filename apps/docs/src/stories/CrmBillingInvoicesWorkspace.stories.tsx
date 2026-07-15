import type { Meta, StoryObj } from "@storybook/react-vite";

import { BillingInvoicesWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Billing / BillingInvoicesWorkspace",
  component: BillingInvoicesWorkspace,
  parameters: { layout: "centered" },
  args: {
    onDownloadCurrent: () => undefined,
    onDownloadInvoice: () => undefined,
    onOpenCurrent: () => undefined,
    onOpenInvoice: () => undefined,
    onPayCurrent: () => undefined,
    onRetryInvoice: () => undefined,
    onRowClick: () => undefined
  }
} satisfies Meta<typeof BillingInvoicesWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Loading: Story = { args: { loading: true } };

export const Error: Story = { args: { error: "Não foi possível carregar as faturas." } };

export const Blocked: Story = { args: { blockedReason: "Ações indisponíveis para este perfil." } };
