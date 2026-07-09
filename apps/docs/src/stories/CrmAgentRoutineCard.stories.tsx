import type { Meta, StoryObj } from "@storybook/react-vite";

import { AgentRoutineCard, DashboardGrid } from "@taliya/crm";

const meta = {
  title: "CRM / Agents / AgentRoutineCard",
  parameters: {
    docs: {
      description: {
        component: "Fonte primária: 53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png."
      }
    },
    sourceImage: "53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png"
  }
} satisfies Meta<typeof AgentRoutineCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: () => (
    <DashboardGrid columns={3} density="compact">
      <AgentRoutineCard description="Confirmação, falta avisada, no-show e correção de presença" flowCount="4 fluxos" icon="calendar" selected state="simulated" title="Presença e faltas" />
      <AgentRoutineCard description="Vagas abertas, remarcações, créditos e lista de espera" flowCount="4 fluxos" icon="users" state="draft" title="Vagas, reposições e lista de espera" />
      <AgentRoutineCard description="Horário fixo, cancelamento pelo studio, conflitos e ajustes de grade" flowCount="4 fluxos" icon="clock" state="published" title="Grade e capacidade" />
      <AgentRoutineCard description="Fora do plano atual" flowCount="2 fluxos" icon="lock" state="blocked" title="Histórico" />
    </DashboardGrid>
  )
};
