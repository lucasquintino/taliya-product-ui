import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuditTrail } from "@taliya/crm";
const meta = { title: "CRM / Timeline / AuditTrailReference", component: AuditTrail, parameters: { layout: "fullscreen" } } satisfies Meta<typeof AuditTrail>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { onOpenObject: () => {}, onViewAll: () => {}, style: { width: "502px" } } };
