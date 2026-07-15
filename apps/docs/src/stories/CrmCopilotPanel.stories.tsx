import type { Meta, StoryObj } from "@storybook/react-vite";

import { CopilotPanel } from "@taliya/crm";

const meta = {
  title: "CRM / Agent / CopilotPanel",
  component: CopilotPanel,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Painel composto oficial do copiloto. Fonte: Image 11, regiao 5." } }
  }
} satisfies Meta<typeof CopilotPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--taliya-space-4)" }}>
      <CopilotPanel state="loading" />
      <CopilotPanel state="empty" />
      <CopilotPanel state="blocked" />
    </div>
  )
};
