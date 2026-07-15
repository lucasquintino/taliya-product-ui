import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExecutionTraceTable } from "@taliya/crm";
const meta = { title: "CRM / Agents / ExecutionTraceTable", component: ExecutionTraceTable, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ExecutionTraceTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "498px" } } };
