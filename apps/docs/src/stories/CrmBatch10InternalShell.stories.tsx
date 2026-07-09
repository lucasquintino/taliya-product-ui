import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Batch10ComponentStory, batch10StoryParameters } from "./CrmBatch10StoryFixtures";
import type { Batch10StoryComponent } from "./CrmBatch10StoryFixtures";
import { CrmOperationalRow, CrmProductShell, InternalOverviewDashboard, internalShellNavItems } from "@taliya/crm";
import type { InternalOverviewDashboardCard, InternalOverviewDashboardFilter } from "@taliya/crm";
import { Button, List, Panel } from "@taliya/ui";

const component = "InternalOverviewDashboard" satisfies Batch10StoryComponent;

const meta = {
  title: "CRM / Internal / InternalOverviewDashboard"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch10StoryParameters,
  render: () => <Batch10ComponentStory component={component} />
};

const internalCards: InternalOverviewDashboardCard[] = [
  {
    id: "new-leads",
    title: "Leads novos",
    value: "8",
    label: "entraram hoje",
    secondary: "3 pediram demo",
    actionLabel: "Abrir leads",
    icon: "user",
    rows: [
      { label: "Studio Corpo Vivo", value: "quente", tone: "grant" },
      { label: "Studio Equilibrio", value: "revisar", tone: "risk" }
    ]
  },
  {
    id: "human",
    title: "Aguardando humano",
    value: "5",
    label: "na fila",
    secondary: "2 sem dono",
    actionLabel: "Assumir fila",
    icon: "shield",
    rows: [
      { label: "Lucas - Pilates Norte", value: "pendente", tone: "risk" },
      { label: "Nikki - Studio Flow", value: "ativo", tone: "grant" }
    ]
  },
  {
    id: "quality",
    title: "Problemas de conversa",
    value: "4",
    label: "abertos",
    secondary: "1 critico",
    actionLabel: "Revisar qualidade",
    icon: "alert",
    rows: [
      { label: "Lead perguntou preco", value: "revisar", tone: "risk" },
      { label: "Diagnostico incompleto", value: "ok", tone: "grant" }
    ]
  }
];

const internalFilters: InternalOverviewDashboardFilter[] = [
  { id: "today", label: "Hoje" },
  { id: "owner", label: "Dono" },
  { id: "stage", label: "Etapa" },
  { id: "quality", label: "Qualidade" }
];

function ConfiguredInternalOverviewDashboardStory() {
  const [event, setEvent] = useState("sem acao");

  return (
    <div className="sb-crm-batch10-internal-shell-story">
      <CrmProductShell navItems={internalShellNavItems} subtitle="Operacao de leads comerciais e qualidade do agente" title="Taliya Internal" variant="internal">
        <InternalOverviewDashboard
          actions={<><Button leadingIcon="plus" size="sm">Novo lead</Button><Button leadingIcon="shield" size="sm" variant="secondary">Abrir auditoria</Button></>}
          activityItems={[
            { id: "note", label: "Lucas adicionou nota interna", time: "10:12", actor: "Lucas", icon: "fileText" },
            { id: "quality", label: "Automacao sugeriu revisao", time: "10:08", actor: "Sistema", icon: "sparkles" },
            { id: "stage", label: "Lead movido para acao comercial", time: "09:58", actor: "Marina", icon: "shield" }
          ]}
          cards={internalCards}
          copilot={{
            summary: "Priorize leads que pediram preco e estao sem dono antes das revisoes de baixa confianca.",
            note: "Automacoes continuam em modo mock/no-cost. Nenhuma mensagem e enviada pelo internal.",
            actionLabel: "Abrir sugestoes"
          }}
          filters={internalFilters}
          onActivityAction={() => setEvent("activity")}
          onCardAction={(card) => setEvent(`card:${card.id}`)}
          onCopilotAction={() => setEvent("copilot")}
          onFilterSelect={(filter) => setEvent(`filter:${filter.id}`)}
          onSearchChange={(value) => setEvent(`search:${value}`)}
          searchPlaceholder="Buscar lead, studio, origem ou alerta"
          subtitle="Operacao de leads comerciais e qualidade do agente"
          title="Taliya Internal"
        />
      </CrmProductShell>
      <output aria-live="polite" className="tl-sr-only">{event}</output>
    </div>
  );
}

export const ConfiguredConsumer: Story = {
  parameters: batch10StoryParameters,
  render: () => <ConfiguredInternalOverviewDashboardStory />
};

export const FluidConsumerContainer: Story = {
  parameters: batch10StoryParameters,
  render: () => (
    <div className="sb-crm-batch10-internal-shell-story">
      <CrmProductShell navItems={internalShellNavItems} subtitle="Operacao interna com conteudo preparado pelo app" title="Hoje" variant="internal">
        <InternalOverviewDashboard
          fluid
          showFilters={false}
          showHeader={false}
          title="Hoje"
        >
          <Panel>
            <List dense>
              <CrmOperationalRow
                row={{
                  id: "lead-hot",
                  title: "Lead quente sem dono",
                  meta: "Studio Corpo Vivo · acao comercial · responder hoje",
                  icon: "user",
                  status: "Alta",
                  statusTone: "danger",
                  tone: "danger"
                }}
              />
              <CrmOperationalRow
                row={{
                  id: "quality",
                  title: "Revisao de conversa",
                  meta: "Automacao sugeriu ajuste de resposta",
                  icon: "sparkles",
                  status: "Revisar",
                  statusTone: "warning",
                  tone: "warning"
                }}
              />
            </List>
          </Panel>
          <Panel>
            <InternalOverviewDashboard
              fluid
              cards={internalCards.slice(0, 2)}
              filters={internalFilters.slice(0, 2)}
              searchPlaceholder="Buscar no resumo"
              subtitle="Sub-bloco preparado pelo app consumidor"
              title="Resumo compacto"
            />
          </Panel>
        </InternalOverviewDashboard>
      </CrmProductShell>
    </div>
  )
};
