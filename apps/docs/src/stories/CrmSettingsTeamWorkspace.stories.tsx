import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

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
        onRoleChange={(member, nextRole) => { setMembers((current) => current.map((item) => item.id === member.id ? { ...item, role: nextRole } : item)); setSaveState("dirty"); }}
        onSave={() => { setSavedMembers(members.map((member) => ({ ...member }))); setSaveState("saved"); }}
        saveState={saveState}
      />
    );
  }
};

export const BlockedLastAdmin: Story = {
  args: {
    members: [{ id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42", isLastAdmin: true }]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Desativar" }));
    const dialog = within(canvasElement.ownerDocument.body);
    await expect(dialog.getByRole("heading", { name: "Mantenha um Dono/Admin ativo" })).toBeInTheDocument();
    await expect(dialog.getByRole("button", { name: "Confirmar desativacao" })).toBeDisabled();
  }
};

export const RoleChangeConfirmation: Story = {
  args: {
    members: [{ id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" }],
    onRoleChange: () => undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Editar" }));
    await userEvent.click(body.getByRole("combobox", { name: "Novo papel" }));
    await userEvent.click(body.getByRole("option", { name: "Professor" }));
    await userEvent.click(body.getByRole("button", { name: "Revisar alteracao" }));
    await expect(body.getByRole("heading", { name: "Confirmar alteracao de papel?" })).toBeInTheDocument();
    await expect(body.getByText(/Carla Souza mudara de Recepcao para Professor/)).toBeInTheDocument();
  }
};

export const OwnerTransferPending: Story = {
  args: {
    members: [{ id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" }],
    onRoleChange: () => undefined
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Editar" }));
    await userEvent.click(body.getByRole("combobox", { name: "Novo papel" }));
    await userEvent.click(body.getByRole("option", { name: "Dono/Admin" }));
    await userEvent.click(body.getByRole("button", { name: "Revisar alteracao" }));
    await expect(body.getByRole("heading", { name: "Transferir Dono/Admin?" })).toBeInTheDocument();
    await expect(body.getByRole("button", { name: "Confirmar transferencia" })).toBeEnabled();
  }
};

export const BlockedPermission: Story = {
  args: { blockedReason: "Somente Dono/Admin pode alterar a equipe.", onRequestAccess: () => undefined }
};

export const ValidationError: Story = {
  args: { validationError: "Revise o papel selecionado antes de salvar a equipe." }
};

export const SystemError: Story = {
  args: { systemError: "Nao foi possivel salvar as alteracoes da equipe.", onRetry: () => undefined }
};
