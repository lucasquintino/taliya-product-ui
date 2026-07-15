import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrmHeaderSummary } from "@taliya/crm";

const meta = {
  title: "CRM / Shell / Components / CrmHeaderSummary",
  component: CrmHeaderSummary,
  parameters: { layout: "centered" },
  args: { onSelect: () => undefined }
} satisfies Meta<typeof CrmHeaderSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Overview: Story = {
  args: {
    items: [
      { id: "plan", icon: "users", label: "Plano 7 agentes" },
      { id: "used", icon: "pieChart", label: "42% usado", tone: "info" },
      { id: "renewal", icon: "calendar", label: "Renova em 12/06" }
    ],
    variant: "overview"
  }
};
