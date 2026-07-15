import type { Meta, StoryObj } from "@storybook/react-vite";

import { DocumentViewerPanel } from "@taliya/crm";

const meta = { title: "CRM / Documents / DocumentViewerPanel", component: DocumentViewerPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof DocumentViewerPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "531px" } } };
