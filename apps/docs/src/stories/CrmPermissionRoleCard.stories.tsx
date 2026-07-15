import type { Meta, StoryObj } from "@storybook/react-vite";

import { PermissionRoleCard } from "@taliya/crm";

const meta = {
  title: "CRM / Config / PermissionRoleCard",
  component: PermissionRoleCard,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Resumo oficial de um papel e seu nível de acesso. Fonte: Image 61." } }
  }
} satisfies Meta<typeof PermissionRoleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  args: {
    description: "Acesso completo ao CRM.",
    icon: "shieldCheck",
    id: "owner",
    permissions: ["Configurações", "Financeiro", "Equipe", "Agentes e fluxos"],
    status: "Completo",
    title: "Dono/Admin",
    tone: "success"
  }
};
