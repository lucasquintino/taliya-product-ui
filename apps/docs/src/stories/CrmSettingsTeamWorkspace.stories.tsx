import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import type { SettingsTeamMember } from "@taliya/crm";
import { SettingsTeamWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsTeamWorkspace",
  component: SettingsTeamWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace pós-live de Equipe com usuários, convites, status e último acesso." } }
  }
} satisfies Meta<typeof SettingsTeamWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  render: function Render() {
    const initialMembers: SettingsTeamMember[] = [
      { id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42" },
      { id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" },
      { id: "ana", name: "Ana Martins", email: "ana@studio.com", role: "Professor", status: "invitePending", lastAccess: "Convite enviado hoje" }
    ];
    const [members, setMembers] = useState(initialMembers);
    const [savedMembers, setSavedMembers] = useState(initialMembers);
    const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
    return (
      <SettingsTeamWorkspace
        members={members}
        onCancel={() => { setMembers(savedMembers.map((member) => ({ ...member }))); setSaveState("saved"); }}
        onMemberAction={(member, action) => { if (action === "deactivate" || action === "reactivate") setMembers((current) => current.map((item) => item.id === member.id ? { ...item, status: action === "deactivate" ? "inactive" : "active" } : item)); setSaveState("dirty"); }}
        onSave={() => { setSavedMembers(members.map((member) => ({ ...member }))); setSaveState("saved"); }}
        saveState={saveState}
      />
    );
  }
};
