import type { Meta, StoryObj } from "@storybook/react-vite";
import { AdvancedReportsPanel } from "@taliya/crm";
const meta = { title: "CRM / Reports / AdvancedReportsPanel", component: AdvancedReportsPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof AdvancedReportsPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "806px" } } };
