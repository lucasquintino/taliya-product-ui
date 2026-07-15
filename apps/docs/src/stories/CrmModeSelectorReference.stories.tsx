import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModeSelector } from "@taliya/crm";
const meta = { title: "CRM / Agents / ModeSelector", component: ModeSelector, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ModeSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SourceReference: Story = { args: { value: "copiloto", variant: "reference" }, render: (args) => <div style={{ width: "282px" }}><ModeSelector {...args} /></div> };
