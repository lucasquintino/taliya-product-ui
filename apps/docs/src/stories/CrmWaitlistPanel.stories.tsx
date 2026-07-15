import type { Meta, StoryObj } from "@storybook/react-vite";

import { WaitlistPanel } from "@taliya/crm";

const meta = { title: "CRM / Agenda / WaitlistPanel", component: WaitlistPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof WaitlistPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "280px" } } };
