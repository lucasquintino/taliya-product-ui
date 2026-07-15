import type { Meta, StoryObj } from "@storybook/react-vite";

import { UploadReceiptPanel } from "@taliya/crm";

const meta = { title: "CRM / Documents / UploadReceiptPanel", component: UploadReceiptPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof UploadReceiptPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = { args: { style: { width: "1087px" } } };
