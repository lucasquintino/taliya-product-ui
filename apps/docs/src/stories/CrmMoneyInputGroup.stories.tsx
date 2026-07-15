import type { Meta, StoryObj } from "@storybook/react-vite";

import { MoneyInputGroup } from "@taliya/crm";

const meta = { title: "CRM / Finance / MoneyInputGroup", component: MoneyInputGroup, parameters: { layout: "fullscreen" } } satisfies Meta<typeof MoneyInputGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "391px" } } };
