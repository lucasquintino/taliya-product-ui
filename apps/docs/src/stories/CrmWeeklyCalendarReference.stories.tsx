import type { Meta, StoryObj } from "@storybook/react-vite";

import { WeeklyCalendar } from "@taliya/crm";

const meta = { title: "CRM / Agenda / WeeklyCalendar", component: WeeklyCalendar, parameters: { layout: "fullscreen" } } satisfies Meta<typeof WeeklyCalendar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SourceReference: Story = {
  args: { variant: "reference" },
  render: (args) => <div style={{ width: "805px" }}><WeeklyCalendar {...args} /></div>
};
