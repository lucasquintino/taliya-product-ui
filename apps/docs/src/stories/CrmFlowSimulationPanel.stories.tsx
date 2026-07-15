import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSimulationPanel } from "@taliya/crm";
const meta = { title: "CRM / Agents / FlowSimulationPanel", component: FlowSimulationPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof FlowSimulationPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "414px" } } };
