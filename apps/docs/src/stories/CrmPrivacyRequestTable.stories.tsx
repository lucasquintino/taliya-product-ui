import type { Meta, StoryObj } from "@storybook/react-vite";
import { PrivacyRequestTable } from "@taliya/crm";
const meta = { title: "CRM / Config / PrivacyRequestTable", component: PrivacyRequestTable, parameters: { layout: "fullscreen" } } satisfies Meta<typeof PrivacyRequestTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "485px" } } };
