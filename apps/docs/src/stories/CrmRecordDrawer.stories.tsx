import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrmRecordDrawer } from "@taliya/crm";

const meta = {
  title: "CRM / Operational / CrmRecordDrawer",
  component: CrmRecordDrawer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Drawer base oficial para objetos operacionais: header, identidade, fatos, conteudo dinamico e footer de acoes. Presets especificos devem compor este drawer."
      }
    }
  }
} satisfies Meta<typeof CrmRecordDrawer>;

export default meta;

type Story = StoryObj;

const actions = [
  { id: "primary", label: "Abrir conversa", variant: "primary" as const, leadingIcon: "message" as const },
  { id: "assign", label: "Assumir", leadingIcon: "user" as const },
  { id: "comment", label: "Comentar", leadingIcon: "messageSquareText" as const }
];

const facts = [
  { id: "origin", label: "Origem", value: "WhatsApp", icon: "inbox" as const },
  { id: "owner", label: "Dono", value: "Recepcao", icon: "user" as const },
  { id: "impact", label: "Impacto", value: "Alta chance de matricula", icon: "trendingUp" as const, tone: "success" as const },
  { id: "next", label: "Proxima acao", value: "Responder hoje", icon: "clock" as const, tone: "warning" as const }
];

const sections = [
  {
    id: "why",
    title: "Por que apareceu agora",
    content: "A primeira mensagem mencionou horario no fim da tarde e o SLA de resposta vence hoje."
  },
  {
    id: "history",
    title: "Historico",
    subtle: true,
    content: "Hoje, 09:12: lead entrou pelo WhatsApp. Hoje, 09:18: copiloto sugeriu abordagem."
  }
];

function CrmRecordDrawerDefaultStory() {
  const [open, setOpen] = useState(true);
  return (
    <CrmRecordDrawer
      actions={actions}
      description="Lead quente aguardando resposta humana."
      facts={facts}
      meta="Studio Vila Mariana"
      onOpenChange={setOpen}
      open={open}
      sections={sections}
      status="Novo"
      title="Ana Silva"
    />
  );
}

function CrmRecordDrawerWithTabsStory() {
  const [tab, setTab] = useState("resumo");

  return (
    <CrmRecordDrawer
      actions={actions}
      activeTab={tab}
      facts={facts}
      meta="Studio Vila Mariana"
      onTabChange={setTab}
      status="Novo"
      tabs={[
        { id: "resumo", label: "Resumo", content: <p>Lead pediu horario no fim da tarde e demonstrou interesse em plano recorrente.</p> },
        { id: "conversa", label: "Conversa", content: <p>Primeira mensagem recebida pelo WhatsApp hoje as 09:12.</p> },
        { id: "auditoria", label: "Auditoria", content: <p>Copiloto classificou como lead quente e sugeriu resposta humana.</p> }
      ]}
      title="Ana Silva"
    />
  );
}

export const Default: Story = {
  render: () => <CrmRecordDrawerDefaultStory />
};

export const Blocked: Story = {
  render: () => (
    <CrmRecordDrawer
      actions={actions}
      blockedReason="Seu perfil pode visualizar o registro, mas nao pode executar acoes sensiveis."
      facts={facts}
      sections={sections}
      state="blocked"
      title="Registro bloqueado"
    />
  )
};

export const Loading: Story = {
  render: () => (
    <CrmRecordDrawer
      description="Carregando informacoes do registro."
      meta="Studio Vila Mariana"
      state="loading"
      status="Carregando"
      title="Ana Silva"
    />
  )
};

export const CustomContent: Story = {
  render: () => (
    <CrmRecordDrawer actions={actions} facts={facts} meta="Studio Vila Mariana" status="Novo" title="Ana Silva">
      <section className="drawer-content">
        <h3>Conteudo do consumidor</h3>
        <p>Presets especificos podem renderizar tabs, grades, timeline ou auditoria dentro do drawer base.</p>
      </section>
    </CrmRecordDrawer>
  )
};

export const WithTabs: Story = {
  render: () => <CrmRecordDrawerWithTabsStory />
};
