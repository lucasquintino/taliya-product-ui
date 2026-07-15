import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReconciliationSummaryTable } from "@taliya/crm";

const meta = { title: "CRM / Finance / ReconciliationSummaryTable", component: ReconciliationSummaryTable, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ReconciliationSummaryTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "531px" } } };
