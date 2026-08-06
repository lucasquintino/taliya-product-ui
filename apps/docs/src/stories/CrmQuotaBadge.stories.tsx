import type { Meta, StoryObj } from "@storybook/react-vite";

import { QuotaBadge } from "@taliya/crm";

const meta = {
  title: "CRM / Usage / QuotaBadge",
  component: QuotaBadge,
  parameters: { layout: "centered" },
  args: { value: "normal" }
} satisfies Meta<typeof QuotaBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
export const Alert70: Story = { args: { value: 70 } };
export const Economy90: Story = { args: { value: 90 } };
export const Exhausted100: Story = { args: { value: 100 } };
