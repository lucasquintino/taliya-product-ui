import type { Meta, StoryObj } from "@storybook/react-vite";

import { UsageHeaderSummary } from "@taliya/crm";

const meta = {
  title: "CRM / Usage / Components / UsageHeaderSummary",
  component: UsageHeaderSummary,
  parameters: { layout: "centered" },
  args: { onSelect: () => undefined }
} satisfies Meta<typeof UsageHeaderSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};
