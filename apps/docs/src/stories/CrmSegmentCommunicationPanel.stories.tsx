import type { Meta, StoryObj } from "@storybook/react-vite";
import { SegmentCommunicationPanel } from "@taliya/crm";
const meta = { title: "CRM / Reports / SegmentCommunicationPanel", component: SegmentCommunicationPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof SegmentCommunicationPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "393px" } } };
