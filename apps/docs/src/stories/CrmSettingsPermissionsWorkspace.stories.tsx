import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

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

export const BlockedPermission: Story = {
  args: { blockedReason: "Somente Dono/Admin pode editar permissões." }
};

export const ValidationError: Story = {
  args: { validationError: "Desconto acima do limite permitido." }
};

const approvalSave = fn();

export const RequiresApproval: Story = {
  args: { onSave: approvalSave, requiresApproval: true, saveState: "dirty" },
  play: async ({ canvasElement }) => {
    approvalSave.mockClear();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Salvar alterações" }));
    const dialog = within(canvasElement.ownerDocument.body);
    await expect(dialog.getByRole("heading", { name: "Confirmar aumento de permissão?" })).toBeInTheDocument();
    await userEvent.click(dialog.getByRole("button", { name: "Confirmar como Dono/Admin" }));
    await expect(approvalSave).toHaveBeenCalledOnce();
  }
};

export const SystemError: Story = {
  args: { systemError: "A matriz de permissoes nao foi salva.", onRetry: () => undefined }
};
