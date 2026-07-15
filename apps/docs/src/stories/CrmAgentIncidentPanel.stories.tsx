import type { Meta, StoryObj } from "@storybook/react-vite";
import { AgentIncidentPanel } from "@taliya/crm";
const meta = { title: "CRM / Agents / AgentIncidentPanel", component: AgentIncidentPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof AgentIncidentPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "332px" } } };
