import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsAgentPanel } from "@taliya/crm";

const meta = {
  title: "CRM / Agent / SettingsAgentPanel",
  component: SettingsAgentPanel,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Assistente contextual oficial para páginas de configuração. Fonte: Images 61-64." } }
  }
} satisfies Meta<typeof SettingsAgentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};
