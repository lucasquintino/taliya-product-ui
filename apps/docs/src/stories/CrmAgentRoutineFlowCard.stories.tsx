import type { Meta, StoryObj } from "@storybook/react-vite";

import { AgentRoutineFlowCard, DashboardGrid } from "@taliya/crm";

const meta = {
  title: "CRM / Agents / AgentRoutineFlowCard",
  parameters: {
    docs: {
      description: {
        component: "Fonte primária: 54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png."
      }
    },
    sourceImage: "54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png"
  }
} satisfies Meta<typeof AgentRoutineFlowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: () => (
    <DashboardGrid columns={2} density="compact">
      <AgentRoutineFlowCard
        badge="Autônomo"
        badgeTone="success"
        description="Antes da aula, a Taliya envia confirmação para os alunos, registra quem confirmou e deixa pendente quem não respondeu."
        facts={[
          { icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" },
          { icon: "clipboard", label: "Ação:", value: "enviar confirmação e registrar resposta" },
          { icon: "alert", label: "Chama equipe:", value: "falha de envio ou conflito" }
        ]}
        icon="calendar"
        iconTone="success"
        status="Pronto"
        statusTone="success"
        title="Confirmação de presença"
      />
      <AgentRoutineFlowCard
        badge="Autônomo com exceções"
        badgeTone="info"
        description="Quando o aluno avisa que vai faltar, a Taliya verifica a regra de reposição e organiza o próximo passo."
        facts={[
          { icon: "clock", label: "Gatilho:", value: "aluno avisa falta" },
          { icon: "clipboard", label: "Ação:", value: "organizar reposição ou próxima tarefa" },
          { icon: "alert", label: "Chama equipe:", value: "fora da regra ou sem vaga" }
        ]}
        icon="bell"
        iconTone="info"
        status="Pronto"
        statusTone="success"
        title="Falta com aviso"
      />
      <AgentRoutineFlowCard
        badge="Autônomo com aprovação"
        badgeTone="warning"
        description="Quando alguém pede correção depois da chamada, a Taliya prepara a alteração e mostra o impacto."
        facts={[
          { icon: "clock", label: "Gatilho:", value: "correção solicitada" },
          { icon: "clipboard", label: "Ação:", value: "preparar alteração e impacto" },
          { icon: "alert", label: "Aprovação:", value: "obrigatória antes de alterar histórico" }
        ]}
        icon="edit"
        iconTone="warning"
        status="Precisa aprovação"
        statusTone="warning"
        title="Correção de presença"
      />
    </DashboardGrid>
  )
};
