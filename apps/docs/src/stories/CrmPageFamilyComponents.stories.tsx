import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CrmDashboardPage,
  CrmKanbanPage,
  CrmRightPanelPage,
  CrmThreePanePage,
  CrmWorklistPage,
  KanbanCard,
  KanbanColumn,
  PageFilterBar,
  PageQuickFilters,
  crmEmptyShellSidebarItems
} from "@taliya/crm";
import type { PageQuickFilterItem } from "@taliya/crm";
import { Card, DataTable, Panel } from "@taliya/ui";

const meta = {
  title: "CRM / Layout / Page Family Components",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composicoes oficiais de familias estruturais. Consumidores passam navegacao, filtros, conteudo e drawers por props; o padrao visual e comportamental fica centralizado na biblioteca."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const navItems = [
  { id: "lista", label: "Lista" },
  { id: "kanban", label: "Kanban" },
  { id: "dashboard", label: "Dashboard" }
];

const quickItems: PageQuickFilterItem[] = [
  { id: "mine", label: "Meus itens", count: "12", icon: "user", selected: true },
  { id: "blocked", label: "Bloqueados", count: "3", icon: "lock", tone: "danger" },
  { id: "waiting", label: "Aguardando", count: "8", icon: "clock" }
];

function DemoFilterBar({ placeholder = "Buscar..." }: { placeholder?: string }) {
  return (
    <PageFilterBar
      filters={[
        { id: "owner", label: "Dono", options: [{ value: "", label: "Dono" }, { value: "recepcao", label: "Recepcao" }] },
        { id: "status", label: "Status", options: [{ value: "", label: "Status" }, { value: "open", label: "Aberto" }] }
      ]}
      searchFilterPlacement="embedded"
      searchPlaceholder={placeholder}
    />
  );
}

function DemoQuickFilters({ heading = "Filtros rapidos" }: { heading?: string }) {
  return <PageQuickFilters heading={heading} items={quickItems} selectionTone="soft" />;
}

export const Worklist: Story = {
  render: () => (
    <CrmWorklistPage
      activeNavId="lista"
      activeSidebarId="clipboard"
      filterBar={<DemoFilterBar placeholder="Buscar registros..." />}
      navItems={navItems}
      quickFilters={<DemoQuickFilters heading="Filas" />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia tabela + filtros + drawer"
      title="Worklist"
    >
      <DataTable
        columns={[
          { key: "name", header: "Registro", sortable: true },
          { key: "status", header: "Status" },
          { key: "owner", header: "Dono" }
        ]}
        rows={[
          { id: "one", name: "Confirmar reposicao", status: "Aberto", owner: "Recepcao" },
          { id: "two", name: "Validar comprovante", status: "Em andamento", owner: "Financeiro" }
        ]}
        selectedRowId="one"
      />
    </CrmWorklistPage>
  )
};

export const Kanban: Story = {
  render: () => (
    <CrmKanbanPage
      activeNavId="kanban"
      activeSidebarId="operations"
      after={<Panel>Atividade recente</Panel>}
      filterBar={<DemoFilterBar placeholder="Buscar pendencias..." />}
      navItems={navItems}
      quickFilters={<DemoQuickFilters />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia kanban + filtros rapidos"
      title="Kanban"
    >
      <KanbanColumn count={1} title="Novo">
        <KanbanCard owner="Recepcao" title="Reposicao da Ana" />
      </KanbanColumn>
      <KanbanColumn count={1} title="Resolvido" state="resolved">
        <KanbanCard state="resolvido" title="Comprovante validado" />
      </KanbanColumn>
    </CrmKanbanPage>
  )
};

export const Dashboard: Story = {
  render: () => (
    <CrmDashboardPage
      activeNavId="dashboard"
      activeSidebarId="home"
      after={<Panel compact>Historico abaixo do dashboard</Panel>}
      before={<DemoFilterBar placeholder="Filtrar indicadores..." />}
      columns="today"
      dashboardStackClassName="tcrm-page-family-stack"
      navItems={navItems}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia dashboard + cards"
      title="Dashboard"
    >
      <Card>Checklist do dia</Card>
      <Card>Agora</Card>
      <Card>Aulas de hoje</Card>
    </CrmDashboardPage>
  )
};

export const ThreePane: Story = {
  render: () => (
    <CrmThreePanePage
      activeNavId="lista"
      activeSidebarId="inbox"
      center={<Panel>Conversa aberta</Panel>}
      filterBar={<Panel compact>Filtros da inbox</Panel>}
      left={<Panel>Lista de conversas</Panel>}
      navItems={navItems}
      right={<Panel>Contexto</Panel>}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia conversa em tres paineis"
      title="Inbox"
    />
  )
};

export const RightPanel: Story = {
  render: () => (
    <CrmRightPanelPage
      activeNavId="dashboard"
      activeSidebarId="settings"
      main={<Panel>Configuracoes principais</Panel>}
      navItems={navItems}
      panel={<Panel>Agente contextual</Panel>}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia formulario + painel lateral"
      title="Configuracao"
    />
  )
};

export const RightPanelDashboardGrid: Story = {
  render: () => (
    <CrmRightPanelPage
      activeNavId="dashboard"
      activeSidebarId="settings"
      main={<><Panel>Plano atual</Panel><Panel>Uso do ciclo</Panel><Panel>Historico</Panel></>}
      mainGridColumns={2}
      mainGridDensity="compact"
      navItems={navItems}
      panel={<Panel>Agente contextual</Panel>}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Familia dashboard + painel lateral"
      title="Assinatura"
    />
  )
};
