import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExportQueuePanel } from "@taliya/crm";
const meta = { title: "CRM / Reports / ExportQueuePanel", component: ExportQueuePanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ExportQueuePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "406px" } } };
