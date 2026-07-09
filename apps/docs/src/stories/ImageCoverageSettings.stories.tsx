import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  AgentPanel,
  ConfigImpactPreview,
  CrmDashboardPage,
  CrmRightPanelPage,
  IntegrationStatusRow,
  PermissionMatrix,
  RuleRow,
  SettingsHubCard,
  SettingsSection,
  WeeklyCalendar,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Chip } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Configuracoes",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage oficial das imagens de Configuracoes. As variantes usam shell CRM e componentes oficiais de configuracao; status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const settingsNavItems = [
  { id: "hoje", label: "Hoje" },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovacoes" },
  { id: "incidentes", label: "Incidentes" },
  { id: "agentes", label: "Agentes" },
  { id: "auditoria", label: "Auditoria" },
  { id: "relatorios", label: "Relatorios" }
];

function PageStack({ children }: { children: ReactNode }) {
  return <div className="tcrm-page-family-stack">{children}</div>;
}

function settingsShellProps({
  title,
  subtitle,
  pageHeaderActions
}: {
  title: string;
  subtitle: string;
  pageHeaderActions?: ReactNode;
}) {
  return {
    activeUtilityId: "configuracoes",
    avatarSrc: image79Avatar,
    navItems: settingsNavItems,
    pageHeaderActions,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

function SettingsAgentPanel({ topic, children }: { topic: string; children: ReactNode }) {
  return (
    <AgentPanel
      role={`Ajudando em ${topic.toLowerCase()}`}
      suggestions={[`O que muda em ${topic.toLowerCase()}?`, "Quando precisa aprovacao?", "Agendar ajuda"]}
      title="Agente de Configuracao"
    >
      {children}
    </AgentPanel>
  );
}

export function SettingsHubPage() {
  return (
    <CrmDashboardPage columns={4} {...settingsShellProps({ subtitle: "Ajustes do CRM depois do go-live.", title: "Configuracoes" })}>
      <SettingsHubCard />
      <SettingsHubCard state="connected" />
      <SettingsHubCard state="review" />
      <SettingsHubCard state="pending" />
      <SettingsHubCard />
      <SettingsHubCard state="pending" />
      <SettingsHubCard state="connected" />
      <SettingsHubCard state="connected" />
    </CrmDashboardPage>
  );
}

export function SettingsPermissionsPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><PermissionMatrix /><ConfigImpactPreview /></PageStack>}
      panel={<SettingsAgentPanel topic="Permissoes">Permissoes definem o que cada pessoa pode fazer. Limites de agentes e fluxos ficam em Agentes/Fluxos.</SettingsAgentPanel>}
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone="warning">Revisar 2 permissoes</Chip><Chip tone="neutral">Alteracao manual</Chip></>,
        subtitle: "Defina o que cada papel pode fazer no CRM.",
        title: "Permissoes"
      })}
    />
  );
}

export function SettingsPaymentsPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><SettingsSection /><IntegrationStatusRow /><RuleRow /><ConfigImpactPreview /></PageStack>}
      panel={<SettingsAgentPanel topic="Pagamentos">Esta pagina define como o studio cobra, recebe e baixa pagamentos de alunos.</SettingsAgentPanel>}
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Manual ativo</Chip><Chip tone="warning">Pagamentos Taliya pendente</Chip><Chip tone="warning">Revisar ativacao</Chip></>,
        subtitle: "Cobranca, baixa e Pagamentos Taliya.",
        title: "Pagamentos e financeiro"
      })}
    />
  );
}

export function SettingsAgendaPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><SettingsSection title="Regras de agenda" /><WeeklyCalendar /><ConfigImpactPreview /></PageStack>}
      panel={<SettingsAgentPanel topic="Agenda">Agenda define excecoes e comportamento basico do calendario.</SettingsAgentPanel>}
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone="warning">2 bloqueios ativos</Chip><Chip tone="danger">Revisar 1 conflito</Chip></>,
        subtitle: "Feriados, bloqueios e encaixes.",
        title: "Agenda"
      })}
    />
  );
}

export function SettingsNotificationsPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><SettingsSection title="Notificacoes" /><RuleRow /><RuleRow state="disabled" /><ConfigImpactPreview /></PageStack>}
      panel={<SettingsAgentPanel topic="Notificacoes">Notificacoes definem quem da equipe deve ser avisado.</SettingsAgentPanel>}
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone="warning">3 papeis configurados</Chip><Chip tone="danger">Revisar 1 alerta</Chip></>,
        subtitle: "Alertas internos por papel.",
        title: "Notificacoes"
      })}
    />
  );
}

export const Image60ConfiguracoesHub: Story = {
  name: "60 configuracoes hub",
  parameters: { sourceImage: "60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png" },
  render: () => <SettingsHubPage />
};

export const Image61ConfiguracoesPermissoes: Story = {
  name: "61 configuracoes permissoes",
  parameters: { sourceImage: "61_round-4.1M_configuracoes_02_permissoes-aprovado.png" },
  render: () => <SettingsPermissionsPage />
};

export const Image62ConfiguracoesPagamentos: Story = {
  name: "62 configuracoes pagamentos financeiro",
  parameters: { sourceImage: "62_round-4.1M_configuracoes_03_pagamentos-financeiro-aprovado.png" },
  render: () => <SettingsPaymentsPage />
};

export const Image63ConfiguracoesAgenda: Story = {
  name: "63 configuracoes agenda",
  parameters: { sourceImage: "63_round-4.1M_configuracoes_04_agenda-aprovado.png" },
  render: () => <SettingsAgendaPage />
};

export const Image64ConfiguracoesNotificacoes: Story = {
  name: "64 configuracoes notificacoes",
  parameters: { sourceImage: "64_round-4.1M_configuracoes_05_notificacoes-aprovado.png" },
  render: () => <SettingsNotificationsPage />
};
