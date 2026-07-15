import type { Meta, StoryObj } from "@storybook/react-vite";

import { ClassSummaryCard } from "@taliya/crm";

const meta = { title: "CRM / Agenda / ClassSummaryCard", component: ClassSummaryCard, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ClassSummaryCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "307px" } } };
