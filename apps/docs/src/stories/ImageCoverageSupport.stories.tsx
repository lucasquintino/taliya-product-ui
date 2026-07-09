import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CrmWorklistTable,
  CrmDashboardPage,
  SupportTicketDrawer,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CrmShellNavItem, CrmShellSidebarItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, InlineGroup, List, ListItem, Panel } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Suporte",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial da Central de Suporte Taliya. A pagina usa shell, filtros, tabela, paineis e drawer oficiais; remaining-pages deve apenas apontar para esta variant."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const supportNav: CrmShellNavItem[] = [
  { id: "central", label: "Central" },
  { id: "tickets", label: "Tickets" },
  { id: "status", label: "Status" },
  { id: "acessos", label: "Acessos" },
  { id: "historico", label: "Historico" }
];

const supportSidebarItems: CrmShellSidebarItem[] = [
  ...crmEmptyShellSidebarItems.filter((item) => item.id !== "metricas"),
  { id: "suporte", label: "Suporte", icon: "headphones" },
  ...crmEmptyShellSidebarItems.filter((item) => item.id === "metricas")
];

export function SupportCentralPage() {
  return (
    <CrmDashboardPage
      activeNavId="central"
      activeSidebarId="suporte"
      avatarSrc={image79Avatar}
      columns="asymmetrical"
      density="compact"
      drawer={<SupportTicketDrawer />}
      drawerPlacement="fixed"
      navItems={supportNav}
      pageHeaderActions={
        <ButtonGroup>
          <Button leadingIcon="plus" size="sm" variant="primary">Abrir ticket</Button>
          <Button leadingIcon="shield" size="sm" variant="secondary">Ver auditoria</Button>
        </ButtonGroup>
      }
      sidebarItems={supportSidebarItems}
      subtitle="Atendimento do studio com a Taliya"
      title="Suporte"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <SupportStatusSidebar />
      <SupportCentralContent />
    </CrmDashboardPage>
  );
}

function SupportCentralContent() {
  return (
    <div className="tcrm-page-family-stack">
      <SupportAgentPanel />
      <SupportTicketTable />
    </div>
  );
}

function SupportAgentPanel() {
  return (
    <Panel>
      <List>
        <ListItem leading={<Icon name="sparkles" tone="info" />} title="Agente de suporte 24/7" />
      </List>
      <List>
        <ListItem action={<Icon name="send" />} leading={<Icon name="search" />} title="Pergunte ao suporte da Taliya..." />
        <ListItem title="Posso ajudar a diagnosticar integracoes, explicar configuracoes ou abrir um ticket com contexto." />
      </List>
      <ButtonGroup>
        <Button size="sm" variant="secondary">WhatsApp desconectou</Button>
        <Button size="sm" variant="secondary">Erro na importacao</Button>
        <Button size="sm" variant="secondary">Duvida sobre cobranca</Button>
        <Button size="sm" variant="secondary">Agente nao respondeu</Button>
        <Button size="sm" variant="secondary">Configurar Pix</Button>
      </ButtonGroup>
      <Button leadingIcon="sparkles" size="sm" variant="primary">Perguntar ao suporte 24/7</Button>
      <List>
        <ListItem leading={<Icon name="lock" />} title="Para acoes sensiveis, o suporte escala para humano e pode pedir autorizacao." />
      </List>
    </Panel>
  );
}

function SupportTicketTable() {
  const rows = [
    { id: "import", title: "Importacao duplicou alunos", status: "Em analise", statusTone: "info" as const, impact: "Dados", next: "Enviar arquivo" },
    { id: "whatsapp", title: "WhatsApp desconectou", status: "Aguardando studio", statusTone: "warning" as const, impact: "Atendimento", next: "Reconectar" },
    { id: "billing", title: "Duvida sobre fatura", status: "Respondido", statusTone: "success" as const, impact: "Assinatura", next: "Ver resposta" },
    { id: "agent", title: "Agente pausado por falha", status: "Escalado", statusTone: "danger" as const, impact: "Automacao", next: "Autorizar analise" }
  ];

  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de tickets recentes"
      columns={[
        { key: "title", header: "Titulo", width: "34%" },
        { key: "status", header: "Status", width: "22%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "impact", header: "Impacto", width: "18%" },
        { key: "next", header: "Proxima acao", width: "26%", render: (row) => <Button size="sm" variant="ghost">{row.next}</Button> }
      ]}
      heading={<InlineGroup compact><Icon name="clipboard" size={16} /> Tickets recentes</InlineGroup>}
      pagination={{ itemsPerPage: "10", label: "1-4 de 4", page: 1, pageCount: 1 }}
      rowActions={() => <IconButton icon="more" label="Mais acoes do ticket" size="sm" variant="ghost" />}
      rows={rows}
      selectedRowId="import"
    />
  );
}

function SupportStatusSidebar() {
  return (
    <div className="tcrm-page-family-stack">
      <Panel>
        <List>
          <ListItem leading={<Icon name="barChart" />} title="Status dos servicos" />
        </List>
        <List divided>
          <ListItem action={<Chip tone="success">operando</Chip>} leading={<Icon name="message" tone="success" />} title="WhatsApp" />
          <ListItem action={<Chip tone="success">operando</Chip>} leading={<Icon name="coins" tone="success" />} title="Pagamentos" />
          <ListItem action={<Chip tone="warning">atencao</Chip>} leading={<Icon name="upload" tone="warning" />} title="Importacao" />
          <ListItem action={<Chip tone="success">normal</Chip>} leading={<Icon name="users" tone="success" />} title="Agentes" />
        </List>
      </Panel>
      <Panel>
        <List>
          <ListItem leading={<Icon name="users" />} title="Acessos temporarios" />
        </List>
        <List divided>
          <ListItem leading={<Icon name="clock" />} title="1 pendente" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="2 ativos" />
          <ListItem leading={<Icon name="clock" tone="warning" />} title="0 expirando hoje" />
        </List>
      </Panel>
      <Panel>
        <List>
          <ListItem leading={<Icon name="star" />} title="Prioridade do plano" />
        </List>
        <List>
          <ListItem title="Suporte padrao">Resposta estimada: hoje</ListItem>
        </List>
      </Panel>
      <Panel compact>
        <List>
          <ListItem action={<Icon name="chevronRight" />} title="Ver todos os status" />
        </List>
      </Panel>
    </div>
  );
}

export const SupportCentral: Story = {
  name: "47 suporte central studio taliya",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 47_round-4.1J_suporte_01_central-studio-taliya.png.png."
      }
    },
    sourceImage: "47_round-4.1J_suporte_01_central-studio-taliya.png.png"
  },
  render: () => <SupportCentralPage />
};
