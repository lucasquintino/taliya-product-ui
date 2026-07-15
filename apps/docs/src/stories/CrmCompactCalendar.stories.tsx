import type { Meta, StoryObj } from "@storybook/react-vite";

import { CompactCalendar } from "@taliya/crm";

const meta = {
  title: "CRM / Agenda / CompactCalendar",
  component: CompactCalendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Composicao oficial de calendario mensal compacto e agenda do dia. Fonte: Image 10."
      }
    }
  }
} satisfies Meta<typeof CompactCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};
