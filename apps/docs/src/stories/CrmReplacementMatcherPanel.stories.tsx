import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReplacementMatcherPanel } from "@taliya/crm";

const meta = { title: "CRM / Agenda / ReplacementMatcherPanel", component: ReplacementMatcherPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ReplacementMatcherPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "243px" } } };
