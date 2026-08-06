import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsAgentPanel } from "@taliya/crm";

const meta = {
  title: "CRM / Agent / SettingsAgentPanel",
  component: SettingsAgentPanel,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Assistente contextual oficial para páginas de configuração. Fonte: Images 61-64." } }
  }
} satisfies Meta<typeof SettingsAgentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Source: Story = {};

export const AgendaImpact: Story = {
  args: {
    insights: [
      { id: "schedule", content: "Horários institucionais delimitam quando o studio pode operar; aulas existentes não são movidas." },
      { id: "unit", content: "Nome, unidade e endereço aparecem em comunicações e registros operacionais." }
    ],
    introduction: "Mudanças no horário institucional não movem aulas já criadas. Conflitos aparecem em Agenda.",
    onReviewAction: () => undefined,
    placeholder: "Pergunte sobre o studio...",
    questions: ["Isso muda aulas já marcadas?", "Onde edito horários por dia?", "Posso cadastrar outra unidade?", "O que muda ao salvar?"],
    review: {
      title: "Revisar impacto na Agenda",
      description: "O novo horário pode conflitar com aulas futuras já marcadas.",
      actionLabel: "Abrir Agenda"
    },
    role: "Ajudando em Studio"
  }
};
