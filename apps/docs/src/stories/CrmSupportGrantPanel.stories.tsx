import type { Meta, StoryObj } from "@storybook/react-vite";
import { SupportGrantPanel } from "@taliya/crm";
const meta = { title: "CRM / Config / SupportGrantPanel", component: SupportGrantPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof SupportGrantPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "270px" } } };
