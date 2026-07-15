import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SettingsPermissionsWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsPermissionsWorkspace",
  component: SettingsPermissionsWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace oficial da página de permissões. Fonte: Image 61." } }
  }
} satisfies Meta<typeof SettingsPermissionsWorkspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  render: function Render() {
    const [selectedRoleId, setSelectedRoleId] = useState("owner");
    return <SettingsPermissionsWorkspace onRoleSelect={setSelectedRoleId} selectedRoleId={selectedRoleId} />;
  }
};
