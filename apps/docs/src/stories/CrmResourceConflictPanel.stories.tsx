import type { Meta, StoryObj } from "@storybook/react-vite";

import { ResourceConflictPanel } from "@taliya/crm";

const meta = { title: "CRM / Agenda / ResourceConflictPanel", component: ResourceConflictPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ResourceConflictPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "266px" } } };
