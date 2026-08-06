import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { AgentPublishFlowCard } from "@taliya/crm";

const meta = {
  title: "CRM / Agents / AgentPublishFlowCard",
  component: AgentPublishFlowCard,
  parameters: { layout: "centered" },
  args: {
    id: "attendance-confirmation",
    title: "Confirmacao de presenca",
    icon: "calendar",
    mode: "Autonomo",
    status: "Pronto",
    facts: [
      { label: "Inicio", value: "Antes da aula, quando chega o horario de confirmar presenca." },
      { label: "Faz", value: "Confere a aula, aluno, horario e template." },
      { label: "Para se", value: "Aula mudou, aluno nao confere ou WhatsApp falha." },
      { label: "Continua em", value: "Aula / Tarefas" }
    ],
    onAction: fn()
  }
} satisfies Meta<typeof AgentPublishFlowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Ver fluxo" }));
    await expect(args.onAction).toHaveBeenLastCalledWith("attendance-confirmation", "view");
    await userEvent.click(canvas.getByRole("button", { name: "Simular" }));
    await expect(args.onAction).toHaveBeenLastCalledWith("attendance-confirmation", "simulate");
  }
};

export const ApprovalRequired: Story = {
  args: {
    title: "Correcao de presenca",
    icon: "edit",
    mode: "Autonomo com aprovacao",
    status: "Aprovacao ao executar",
    statusTone: "warning"
  }
};
