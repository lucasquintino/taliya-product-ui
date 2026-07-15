import type { Meta, StoryObj } from "@storybook/react-vite";
import { PublicationPreflightPanel } from "@taliya/crm";
const meta = { title: "CRM / Agents / PublicationPreflightPanel", component: PublicationPreflightPanel, parameters: { layout: "fullscreen" } } satisfies Meta<typeof PublicationPreflightPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Source: Story = { args: { style: { width: "343px" } } };
