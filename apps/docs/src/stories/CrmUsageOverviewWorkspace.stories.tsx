import type { Meta, StoryObj } from "@storybook/react-vite";

import { UsageOverviewWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Usage / UsageOverviewWorkspace",
  component: UsageOverviewWorkspace,
  parameters: { layout: "centered" },
  args: {
    onOriginSelect: () => undefined,
    onViewAddOns: () => undefined,
    onViewFlows: () => undefined,
    onViewLedger: () => undefined
  }
} satisfies Meta<typeof UsageOverviewWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Threshold90: Story = {
  args: { quota: { alertLabel: "Economia automática ativa.", value: 90 } }
};

export const Loading: Story = { args: { loading: true } };

export const Error: Story = { args: { error: "Não foi possível carregar os dados do ciclo." } };

export const Blocked: Story = { args: { blockedReason: "Uso indisponível para este perfil." } };
