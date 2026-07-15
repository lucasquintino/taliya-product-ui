import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChannelStatusPanel } from "@taliya/crm";

const meta = {
  title: "CRM / Inbox / ChannelStatusPanel",
  component: ChannelStatusPanel,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Composicao oficial de fila e estados do canal WhatsApp. Fonte: Image 11." } }
  }
} satisfies Meta<typeof ChannelStatusPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};
