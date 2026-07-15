import type { Meta, StoryObj } from "@storybook/react-vite";
import { BeforeAfterDiff } from "@taliya/crm";
const meta = { title: "CRM / Approvals / BeforeAfterDiffReference", component: BeforeAfterDiff, parameters: { layout: "fullscreen" } } satisfies Meta<typeof BeforeAfterDiff>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { onApprove: () => {}, onRevert: () => {}, style: { width: "346px" } } };
