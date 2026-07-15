import type { Meta, StoryObj } from "@storybook/react-vite";
import { CrmProductShell, JourneyShellCanvas } from "@taliya/crm";
import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Shell / JourneyShellCanvas",
  component: JourneyShellCanvas,
  parameters: { layout: "fullscreen" }
} satisfies Meta<typeof JourneyShellCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Source: Story = {
  render: (args) => <CrmProductShell avatarSrc={image79Avatar} frame="reference" title="Jornadas"><JourneyShellCanvas {...args} /></CrmProductShell>
};
