import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowBuilder } from "@taliya/crm";
const meta = { title: "CRM / Agents / FlowBuilder", component: FlowBuilder, parameters: { layout: "fullscreen" } } satisfies Meta<typeof FlowBuilder>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SourceReference: Story = { args: { variant: "reference" }, render: (args) => <div style={{ width: "910px" }}><FlowBuilder {...args} /></div> };
