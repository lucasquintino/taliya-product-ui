import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import {
  CrmDashboardPage,
  CrmRightPanelPage,
  SettingsAgentPanel,
  SettingsAgendaWorkspace,
  SettingsHubCard,
  SettingsNotificationsWorkspace,
  SettingsPaymentsWorkspace,
  SettingsPermissionsWorkspace,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Breadcrumb, Chip } from "@taliya/ui";

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

const settingsHubItems = [
  { description: "Dados, unidades e horários.", icon: "slidersRound", id: "studio", state: "ready", title: "Studio" },
  { description: "Pessoas que acessam o Taliya.", icon: "users", id: "equipe", state: "invite-pending", title: "Equipe" },
  { description: "O que cada papel pode fazer.", icon: "shield", id: "permissoes", state: "review", title: "Permissões" },
  { description: "WhatsApp, email e redes.", icon: "whatsapp", id: "canais", state: "connected", title: "Canais" },
  { description: "O que o aluno compra.", icon: "shoppingCart", id: "planos", state: "ready", title: "Planos e modelos" },
  { description: "Cobrança, baixa e Pagamentos Taliya.", icon: "creditCard", id: "pagamentos", state: "pending", title: "Pagamentos e financeiro" },
  { description: "Feriados, bloqueios e encaixes.", icon: "calendar", id: "agenda", state: "ready", title: "Agenda" },
  { description: "Alertas internos por papel.", icon: "bell", id: "notificacoes", state: "ready", title: "Notificações" }
] as const;

export function SettingsHubPage() {
  const [, setOpenedSettingId] = useState("");

  return (
    <CrmDashboardPage
      columns={4}
      layoutVariant="settings-hub"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }]} />}
      pageHeaderRhythm="settings-hub"
      topNavSelection="none"
      {...settingsShellProps({ subtitle: "Ajustes do CRM depois do go-live.", title: "Configurações" })}
    >
      {settingsHubItems.map((item) => (
        <SettingsHubCard
          description={item.description}
          icon={item.icon}
          key={item.id}
          onOpen={() => setOpenedSettingId(item.id)}
          state={item.state}
          title={item.title}
        />
      ))}
    </CrmDashboardPage>
  );
}

export function SettingsPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState("owner");
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsPermissionsWorkspace
          onCancel={() => setLastAction("cancel")}
          onPermissionSelect={(rowId) => setLastAction(`select:${rowId}`)}
          onPermissionToggle={(rowId) => setLastAction(`toggle:${rowId}`)}
          onRoleSelect={setSelectedRoleId}
          onSave={() => setLastAction("save")}
          selectedRoleId={selectedRoleId}
        />
      )}
      panel={(
        <SettingsAgentPanel
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
        />
      )}
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Permissões" }]} />}
      pageHeaderRhythm="stacked"
      browserUrl="https://app.taliya.com/app/configuracoes/permissoes"
      rightPanelVariant="settings-permissions"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone="warning">Revisar 2 permissões</Chip><Chip tone="neutral">Alteração manual</Chip></>,
        subtitle: "Defina o que cada papel pode fazer no CRM.",
        title: "Permissões"
      })}
    />
  );
}

export function SettingsPaymentsPage() {
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsPaymentsWorkspace
          onActivate={() => setLastAction("activate")}
          onCancel={() => setLastAction("cancel")}
          onMethodSelect={(method) => setLastAction(`method:${method}`)}
          onRuleAction={(row) => setLastAction(`rule:${row.id}`)}
          onRuleToggle={(row, checked) => setLastAction(`toggle:${row.id}:${checked}`)}
          onSave={() => setLastAction("save")}
          onTechnicalIntegration={() => setLastAction("technical-integration")}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[
            { id: "online", content: "Pagamentos Taliya ativa Pix online, cartão online, recorrência e baixa automática." },
            { id: "provider", content: "Problemas técnicos do provedor ficam em Integrações." }
          ]}
          introduction="Esta página define como o studio cobra, recebe e baixa pagamentos de alunos. Assinatura do studio com a Taliya fica em Billing."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
          placeholder="Pergunte sobre pagamentos..."
          questions={[
            "O que continua manual?",
            "O que muda ao ativar Pagamentos Taliya?",
            "Onde vejo falha técnica?",
            "Isso é Billing Taliya?"
          ]}
          role="Ajudando em pagamentos"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/financeiro/pagamentos"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Pagamentos e financeiro" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-payments"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Manual ativo</Chip><Chip tone="warning">Pagamentos Taliya pendente</Chip><Chip tone="warning">Revisar ativacao</Chip></>,
        subtitle: "Cobranca, baixa e Pagamentos Taliya.",
        title: "Pagamentos e financeiro"
      })}
    />
  );
}

export function SettingsAgendaPage() {
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsAgendaWorkspace
          onAddBlock={() => setLastAction("add-block")}
          onAddException={() => setLastAction("add-exception")}
          onCancel={() => setLastAction("cancel")}
          onRowAction={(rowId, action) => setLastAction(`${action}:${rowId}`)}
          onRuleChange={(ruleId, value) => setLastAction(`rule:${ruleId}:${value}`)}
          onSave={() => setLastAction("save")}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[]}
          introduction="Agenda define exceções e comportamento básico do calendário. A agenda do dia continua em Agenda."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
          placeholder="Pergunte sobre agenda..."
          questions={[
            "Isso muda aulas já marcadas?",
            "Onde edito turmas?",
            "Lista de espera fica aqui?",
            "O que acontece em feriados?"
          ]}
          role="Ajudando em agenda"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/agenda"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Agenda" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-agenda"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip icon="checkCircle" showDot={false} tone="success">Publicado</Chip><Chip icon="lock" showDot={false} tone="warning">2 bloqueios ativos</Chip><Chip icon="alert" showDot={false} tone="danger">Revisar 1 conflito</Chip></>,
        subtitle: "Feriados, bloqueios e encaixes.",
        title: "Agenda"
      })}
    />
  );
}

export function SettingsNotificationsPage() {
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsNotificationsWorkspace
          onCancel={() => setLastAction("cancel")}
          onChannelChange={(channelId, value) => setLastAction(`channel:${channelId}:${value}`)}
          onFrequencyChange={(alertId, value) => setLastAction(`frequency:${alertId}:${value}`)}
          onRoleSelect={(roleId) => setLastAction(`role:${roleId}`)}
          onSave={() => setLastAction("save")}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[]}
          introduction="Notificações definem quem da equipe deve ser avisado. Mensagens para alunos ficam nos fluxos e nas áreas que enviam a mensagem."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={(message) => setLastAction(`send:${message}`)}
          placeholder="Pergunte sobre notificações..."
          questions={[
            "Quem recebe alerta crítico?",
            "Professor recebe alerta de todos os alunos?",
            "Isso envia mensagem para aluno?",
            "O que muda ao salvar?"
          ]}
          role="Ajudando em notificações"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/notificacoes"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Notificações" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-notifications"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip icon="checkCircle" showDot={false} tone="success">Publicado</Chip><Chip icon="users" showDot={false} tone="warning">3 papeis configurados</Chip><Chip icon="alert" showDot={false} tone="danger">Revisar 1 alerta</Chip></>,
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
