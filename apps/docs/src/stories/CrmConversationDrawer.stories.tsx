import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConversationDrawer } from "@taliya/crm";

const meta = {
  title: "CRM / Inbox / ConversationDrawer",
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ConversationDrawer
      onClose={() => undefined}
      title="Ana Silva"
      statusLabel="Aguardando humano"
    />
  )
};
