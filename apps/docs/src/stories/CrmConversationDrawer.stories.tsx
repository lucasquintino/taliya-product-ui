import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConversationDrawer } from "@taliya/crm";

import { playFirstInteractiveControl } from "./story-play";
const meta = {
  title: "CRM / Inbox / ConversationDrawer",
  parameters: { layout: "fullscreen" },
  play: playFirstInteractiveControl
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
