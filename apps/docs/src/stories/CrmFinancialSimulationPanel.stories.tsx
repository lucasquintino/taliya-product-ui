import type { Meta, StoryObj } from "@storybook/react-vite";

import { FinancialSimulationPanel } from "@taliya/crm";

const meta = { title: "CRM / Finance / FinancialSimulationPanel", component: FinancialSimulationPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof FinancialSimulationPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "685px" } } };
