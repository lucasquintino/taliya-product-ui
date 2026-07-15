import type { Meta, StoryObj } from "@storybook/react-vite";

import { SetupPage, SetupWelcomeWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Setup / SetupPage",
  component: SetupPage,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Wrapper oficial da família de páginas do setup guiado." } }
  }
} satisfies Meta<typeof SetupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  args: {
    children: <SetupWelcomeWorkspace />,
    step: 1
  }
};
