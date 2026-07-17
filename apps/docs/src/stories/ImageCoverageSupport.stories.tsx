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
import type { CrmShellNavItem, CrmShellSidebarItem, SupportTicketPanelFact, SupportTicketPanelMessage } from "@taliya/crm";
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
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedTicket = supportTicketRows.find((row) => row.id === selectedTicketId) ?? supportTicketRows[0]!;
  const drawerModel = supportTicketDrawerModel(selectedTicket);

  return (
    <>
      <CrmDashboardPage
        activeNavId="central"
        activeSidebarId="suporte"
        avatarSrc={image79Avatar}
        columns="support"
        density="compact"
        drawer={drawerOpen ? (
          <SupportTicketDrawer
            {...drawerModel}
            onAction={(action) => setAnnouncement(`Ação do ticket: ${action}:${selectedTicket.id}`)}
            onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de ticket fechado"); }}
          />
        ) : null}
        drawerPlacement="content"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        layoutVariant="support"
        navItems={supportNav}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção de suporte selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="support"
        pageHeaderActions={
          <ButtonGroup>
            <Button leadingIcon="plus" onClick={() => setAnnouncement("Criação de ticket aberta")} size="sm" variant="primary">Abrir ticket</Button>
            <Button leadingIcon="shield" onClick={() => setAnnouncement("Auditoria de suporte aberta")} size="sm" variant="secondary">Ver auditoria</Button>
          </ButtonGroup>
        }
        sidebarItems={supportSidebarItems}
        subtitle="Atendimento do studio com a Taliya"
        title="Suporte"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        <SupportStatusSidebar onViewAll={() => setAnnouncement("Todos os status abertos")} />
        <SupportCentralContent
          onAction={setAnnouncement}
          onTicketSelect={(ticketId) => {
            const ticket = supportTicketRows.find((row) => row.id === ticketId);
            setSelectedTicketId(ticketId);
            setDrawerOpen(true);
            setAnnouncement(`Ticket selecionado: ${ticket?.title ?? ticketId}`);
          }}
          selectedTicketId={selectedTicketId}
        />
      </CrmDashboardPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
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
      agent={<SupportAgentPanel onAction={(action) => onAction?.(`Ação do agente de suporte: ${action}`)} />}
      tickets={<SupportTicketTable onAction={onAction} onRowSelect={(row) => onTicketSelect?.(row.id)} selectedRowId={selectedTicketId} />}
    />
  );
}

function SupportTicketTable({
  onAction,
  onRowSelect,
  selectedRowId
}: {
  onAction?: (action: string) => void;
  onRowSelect?: (row: SupportTicketRow) => void;
  selectedRowId?: string;
}) {
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
        { key: "next", header: "Proxima acao", width: "14%", render: (row) => <Button onClick={(event) => { event.stopPropagation(); onAction?.(`Próxima ação do ticket: ${row.next}:${row.id}`); }} size="sm" variant="ghost">{row.next}</Button> }
      ]}
      heading={<InlineGroup compact><Icon name="clipboard" size={16} /> Tickets recentes</InlineGroup>}
      onRowSelect={onRowSelect}
      pagination={{
        itemsPerPage: "10",
        label: "1-4 de 4",
        onItemsPerPageClick: () => onAction?.("Seletor de itens por página aberto"),
        onNextPage: () => onAction?.("Próxima página de tickets"),
        onPageChange: (page) => onAction?.(`Página de tickets selecionada: ${page}`),
        onPreviousPage: () => onAction?.("Página anterior de tickets"),
        nextDisabled: true,
        page: 1,
        pageCount: 1,
        previousDisabled: true
      }}
      rowActions={(row) => <IconButton icon="more" label={`Mais ações do ticket ${row.title}`} onClick={(event) => { event.stopPropagation(); onAction?.(`Mais ações do ticket: ${row.id}`); }} size="sm" variant="ghost" />}
      rows={supportTicketRows}
      selectedRowId={selectedRowId}
    />
  );
}

const supportTicketRows: SupportTicketRow[] = [
  {
    id: "import",
    title: "Importacao duplicou alunos",
    type: "Importacao",
    typeIcon: "upload",
    status: "Em analise",
    statusTone: "info",
    impact: "Dados",
    owner: "Taliya",
    ownerIcon: "bot",
    response: "hoje 10:04",
    next: "Enviar arquivo",
    subtitle: "Studio pediu ajuda para revisar dados importados",
    priority: "Media",
    created: "hoje 09:12",
    summary: "O agente identificou possivel duplicidade por telefone e preparou o contexto para o suporte humano.",
    messages: [
      "Studio: Importei a planilha e alguns alunos apareceram duplicados.",
      "Suporte 24/7: Entendi. Voce pode anexar o arquivo original para eu comparar os dados?",
      "Taliya: Vamos revisar a importacao e retornar com os registros afetados."
    ]
  },
  {
    id: "whatsapp",
    title: "WhatsApp desconectou",
    type: "Integracao",
    typeIcon: "link",
    status: "Aguardando studio",
    statusTone: "warning",
    impact: "Atendimento",
    owner: "Studio",
    ownerIcon: "user",
    response: "hoje 09:18",
    next: "Reconectar",
    subtitle: "Canal principal do studio perdeu a conexao",
    priority: "Alta",
    created: "hoje 09:18",
    summary: "O agente confirmou a desconexao e preparou uma reconexao segura com validacao do studio.",
    messages: [
      "Studio: As mensagens pararam de chegar no WhatsApp.",
      "Suporte 24/7: Detectei a sessao desconectada e posso orientar a reconexao.",
      "Taliya: Aguardando o studio confirmar o novo vinculo."
    ]
  },
  {
    id: "billing",
    title: "Duvida sobre fatura",
    type: "Billing",
    typeIcon: "fileText",
    status: "Respondido",
    statusTone: "success",
    impact: "Assinatura",
    owner: "Taliya",
    ownerIcon: "bot",
    response: "ontem 18:42",
    next: "Ver resposta",
    subtitle: "Studio pediu esclarecimento sobre a ultima cobranca",
    priority: "Baixa",
    created: "ontem 18:10",
    summary: "O agente encontrou a composicao da fatura e deixou a explicacao pronta para consulta.",
    messages: [
      "Studio: Preciso entender um item adicional da fatura.",
      "Suporte 24/7: Localizei o consumo relacionado ao adicional.",
      "Taliya: A resposta detalhada foi enviada ao responsavel."
    ]
  },
  {
    id: "agent",
    title: "Agente pausado por falha",
    type: "Agentes",
    typeIcon: "bot",
    status: "Escalado",
    statusTone: "danger",
    impact: "Automacao",
    owner: "Taliya",
    ownerIcon: "bot",
    response: "ontem 16:10",
    next: "Autorizar analise",
    subtitle: "Rotina automatizada foi pausada apos falhas repetidas",
    priority: "Alta",
    created: "ontem 15:54",
    summary: "O agente isolou a etapa com falha e solicitou autorizacao para analisar o contexto protegido.",
    messages: [
      "Studio: A rotina parou antes de concluir as confirmacoes.",
      "Suporte 24/7: Pausei novas execucoes para evitar repeticoes.",
      "Taliya: A analise aguarda autorizacao de acesso temporario."
    ]
  }
];

function supportTicketDrawerModel(row: SupportTicketRow) {
  const facts: SupportTicketPanelFact[] = [
    { id: "type", label: "Tipo", value: row.type, icon: row.typeIcon, tone: row.type === "Importacao" ? "info" : undefined },
    { id: "status", label: "Status", value: <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip>, icon: "link" },
    { id: "impact", label: "Impacto", value: row.impact, icon: "clipboard" },
    { id: "owner", label: "Responsavel", value: <InlineGroup compact><Icon name={row.ownerIcon} size={14} />{row.owner}</InlineGroup>, icon: "user" },
    { id: "priority", label: "Prioridade", value: row.priority, icon: "star" },
    { id: "created", label: "Criado", value: row.created, icon: "calendar" },
    { id: "next", label: "Proxima acao", value: <InlineGroup compact><Icon name="chevronRight" size={12} />{row.next}</InlineGroup>, icon: "send" }
  ];
  const messageIcons: SupportTicketPanelMessage["icon"][] = ["user", "sparkles", "bot"];
  const messages: SupportTicketPanelMessage[] = row.messages.map((text, index) => ({
    id: `${row.id}-${index}`,
    icon: messageIcons[index] ?? "message",
    text,
    tone: index === 0 ? "info" : undefined
  }));

  return { facts, messages, subtitle: row.subtitle, summary: row.summary, title: row.title };
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
  subtitle: string;
  priority: string;
  created: string;
  summary: string;
  messages: string[];
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
