import type { Meta, StoryObj } from "@storybook/react-vite";

import { DashboardGrid, OpportunityGroupCard } from "@taliya/crm";

const meta = {
  title: "CRM / Reports / OpportunityGroupCard",
  parameters: {
    docs: {
      description: {
        component: "Fonte primária: 46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png."
      }
    },
    sourceImage: "46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png"
  }
} satisfies Meta<typeof OpportunityGroupCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  render: () => (
    <DashboardGrid columns={2} density="compact">
      <OpportunityGroupCard />
      <OpportunityGroupCard
        icon="rocket"
        items={[
          { id: "julia", name: "Julia Ramos", subtitle: "Experimental", detail: "Compareceu hoje", action: "Fazer pos-aula", badge: "quente", badgeTone: "warning" },
          { id: "pedro", name: "Pedro Santos", subtitle: "Vendas / Experimental", detail: "Perguntou valores", action: "Responder hoje", badge: "hoje", badgeTone: "danger" }
        ]}
        summary="5 interessados prontos"
        title="Experimentais quentes"
        tone="info"
      />
    </DashboardGrid>
  )
};
