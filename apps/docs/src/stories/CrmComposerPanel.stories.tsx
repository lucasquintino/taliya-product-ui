import type { Meta, StoryObj } from "@storybook/react-vite";

import { ComposerPanel } from "@taliya/crm";

const meta = {
  title: "CRM / Inbox / ComposerPanel",
  component: ComposerPanel,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Composicao oficial do composer e catalogo de acoes. Fonte: Image 11." } }
  },
  args: { placeholder: "Digite sua mensagem..." }
} satisfies Meta<typeof ComposerPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};
