import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  CrmWorklistTable,
  CrmDashboardPage,
  SupportAgentPanel,
  SupportCentralWorkspace,
  SupportStatusSidebar,
  SupportTicketDrawer,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CrmShellNavItem, CrmShellSidebarItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, InlineGroup } from "@taliya/ui";

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
  const [selectedTicketId, setSelectedTicketId] = useState("import");
  const [, setAction] = useState("");

  return (
    <CrmDashboardPage
      activeNavId="central"
      activeSidebarId="suporte"
      avatarSrc={image79Avatar}
      columns="support"
      density="compact"
      drawer={<SupportTicketDrawer onAction={setAction} onClose={() => setAction("close")} />}
      drawerPlacement="content"
      layoutVariant="support"
      navItems={supportNav}
      pageHeaderRhythm="support"
      pageHeaderActions={
        <ButtonGroup>
          <Button leadingIcon="plus" onClick={() => setAction("open-ticket")} size="sm" variant="primary">Abrir ticket</Button>
          <Button leadingIcon="shield" onClick={() => setAction("open-audit")} size="sm" variant="secondary">Ver auditoria</Button>
        </ButtonGroup>
      }
      sidebarItems={supportSidebarItems}
      subtitle="Atendimento do studio com a Taliya"
      title="Suporte"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <SupportStatusSidebar onViewAll={() => setAction("view-statuses")} />
      <SupportCentralContent onAction={setAction} onTicketSelect={setSelectedTicketId} selectedTicketId={selectedTicketId} />
    </CrmDashboardPage>
  );
}

function SupportCentralContent({
  onAction,
  onTicketSelect,
  selectedTicketId
}: {
  onAction?: (action: string) => void;
  onTicketSelect?: (id: string) => void;
  selectedTicketId?: string;
}) {
  return (
    <SupportCentralWorkspace
      agent={<SupportAgentPanel onAction={onAction} />}
      tickets={<SupportTicketTable onRowSelect={(row) => onTicketSelect?.(row.id)} selectedRowId={selectedTicketId} />}
    />
  );
}

function SupportTicketTable({
  onRowSelect,
  selectedRowId
}: {
  onRowSelect?: (row: SupportTicketRow) => void;
  selectedRowId?: string;
}) {
  const rows: SupportTicketRow[] = [
    { id: "import", title: "Importacao duplicou alunos", type: "Importacao", typeIcon: "upload", status: "Em analise", statusTone: "info", impact: "Dados", owner: "Taliya", ownerIcon: "bot", response: "hoje 10:04", next: "Enviar arquivo" },
    { id: "whatsapp", title: "WhatsApp desconectou", type: "Integracao", typeIcon: "link", status: "Aguardando studio", statusTone: "warning", impact: "Atendimento", owner: "Studio", ownerIcon: "user", response: "hoje 09:18", next: "Reconectar" },
    { id: "billing", title: "Duvida sobre fatura", type: "Billing", typeIcon: "fileText", status: "Respondido", statusTone: "success", impact: "Assinatura", owner: "Taliya", ownerIcon: "bot", response: "ontem 18:42", next: "Ver resposta" },
    { id: "agent", title: "Agente pausado por falha", type: "Agentes", typeIcon: "bot", status: "Escalado", statusTone: "danger", impact: "Automacao", owner: "Taliya", ownerIcon: "bot", response: "ontem 16:10", next: "Autorizar analise" }
  ];

  return (
    <CrmWorklistTable
      actionColumnWidth="24px"
      ariaLabel="Tabela de tickets recentes"
      density="compact"
      columns={[
        { key: "title", header: "Titulo", width: "20%" },
        { key: "type", header: "Tipo", width: "14%", render: (row) => <InlineGroup compact><Icon name={row.typeIcon} size={14} />{row.type}</InlineGroup> },
        { key: "status", header: "Status", width: "14%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "impact", header: "Impacto", width: "10%" },
        { key: "owner", header: "Responsavel", width: "13%", render: (row) => <InlineGroup compact><Icon name={row.ownerIcon} size={14} />{row.owner}</InlineGroup> },
        { key: "response", header: "Ultima resposta", width: "15%" },
        { key: "next", header: "Proxima acao", width: "14%", render: (row) => <Button size="sm" variant="ghost">{row.next}</Button> }
      ]}
      heading={<InlineGroup compact><Icon name="clipboard" size={16} /> Tickets recentes</InlineGroup>}
      onRowSelect={onRowSelect}
      pagination={{ itemsPerPage: "10", label: "1-4 de 4", page: 1, pageCount: 1 }}
      rowActions={() => <IconButton icon="more" label="Mais acoes do ticket" size="sm" variant="ghost" />}
      rows={rows}
      selectedRowId={selectedRowId}
    />
  );
}

type SupportTicketRow = {
  id: string;
  title: string;
  type: string;
  typeIcon: "upload" | "link" | "fileText" | "bot";
  status: string;
  statusTone: "info" | "warning" | "success" | "danger";
  impact: string;
  owner: string;
  ownerIcon: "bot" | "user";
  response: string;
  next: string;
};

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
