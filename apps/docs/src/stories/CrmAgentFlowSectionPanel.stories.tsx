import type { Meta, StoryObj } from "@storybook/react-vite";

import { AgentFlowSectionPanel, AgentRoutineFlowCard, DashboardGrid, ModeSelector } from "@taliya/crm";

const meta = {
  title: "CRM / Agents / AgentFlowSectionPanel",
  component: AgentFlowSectionPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Painel compacto oficial para secoes de rotina/fluxo de Agentes. Fonte primaria: Image54/Image56."
      }
    }
  }
} satisfies Meta<typeof AgentFlowSectionPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  args: {
    title: "Como essa rotina deve trabalhar?"
  },
  render: () => (
    <div style={{ display: "grid", gap: 16, width: 980 }}>
      <AgentFlowSectionPanel
        description="Escolha um comportamento para a rotina inteira. A Taliya aplica isso aos fluxos abaixo, e voce pode ajustar qualquer fluxo individualmente."
        kind="mode"
        title="Como essa rotina deve trabalhar?"
      >
        <ModeSelector variant="routine" />
      </AgentFlowSectionPanel>
      <AgentFlowSectionPanel title="Fluxos desta rotina">
        <DashboardGrid columns={2} density="compact">
          <AgentRoutineFlowCard
            badge="Autonomo"
            badgeTone="success"
            description="Antes da aula, a Taliya envia confirmacao para os alunos, registra quem confirmou e deixa pendente quem nao respondeu."
            facts={[
              { icon: "clock", label: "Gatilho:", value: "Antes, durante ou apos a aula" },
              { icon: "clipboard", label: "Acao:", value: "enviar confirmacao e registrar resposta" },
              { icon: "alert", label: "Chama equipe:", value: "falha de envio ou conflito" }
            ]}
            icon="calendar"
            iconTone="success"
            status="Pronto"
            statusTone="success"
            title="Confirmacao de presenca"
          />
          <AgentRoutineFlowCard
            badge="Autonomo com excecoes"
            description="Quando o aluno avisa que vai faltar, a Taliya verifica a regra de reposicao e organiza o proximo passo."
            facts={[
              { icon: "clock", label: "Gatilho:", value: "Aviso antes da aula" },
              { icon: "clipboard", label: "Acao:", value: "organizar reposicao" },
              { icon: "alert", label: "Chama equipe:", value: "fora da regra ou sem vaga" }
            ]}
            icon="bell"
            status="Pronto"
            title="Falta com aviso"
          />
        </DashboardGrid>
      </AgentFlowSectionPanel>
    </div>
  )
};
