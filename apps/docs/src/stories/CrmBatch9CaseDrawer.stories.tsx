import type { Meta, StoryObj } from "@storybook/react-vite";

import { CaseDrawer } from "@taliya/crm";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "CaseDrawer" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Operational / CaseDrawer"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};

export const SectionGrammar: Story = {
  parameters: batch9StoryParameters,
  render: () => (
    <CaseDrawer
      sections={[
        { id: "reason", title: "Motivo declarado", kind: "text", description: "Aluna aguardando retorno humano sobre reposicao." },
        { id: "impact", title: "Impacto", kind: "list", items: [{ id: "risk", label: "Risco de cancelamento", tone: "danger" }, { id: "open", label: "1 reposicao em aberto", tone: "danger" }] },
        { id: "pause", title: "Automacao pausada", kind: "alert", icon: "alert", description: "Mensagens automaticas e acoes autonomas pausadas ate revisao humana." },
        { id: "plan", title: "Plano de resolucao", kind: "checklist", items: [{ id: "history", label: "Revisar historico da reposicao", tone: "success" }, { id: "reply", label: "Responder com solucao objetiva", tone: "success" }] },
        { id: "copilot", title: "Sugestao do copiloto", kind: "copilot", icon: "sparkles", description: "Enviar resposta humana com duas opcoes reais de encaixe." },
        { id: "history", title: "Historico curto", kind: "history", items: [{ id: "opened", label: "Caso aberto", tone: "success" }, { id: "blocked", label: "Automacao pausada", tone: "danger" }] }
      ]}
      numberedSections
      statusLabel="Alta severidade"
      title="Ana Paula Martins"
    />
  )
};
