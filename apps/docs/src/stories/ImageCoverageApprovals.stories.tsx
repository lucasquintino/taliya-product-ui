import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  ApprovalDrawer,
  ApprovalTable,
  CrmWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  ApprovalPanelFact,
  ApprovalPanelSection,
  ApprovalPanelState,
  ApprovalPanelTimelineItem,
  ApprovalTableRow,
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source25SamFrank from "../assets/source25-sam-frank.png";

const approvalsNavItems: CrmShellNavItem[] = [
  { id: "pendencias", label: "Pendências" },
  { id: "tarefas", label: "Tarefas" },
  { id: "checklists", label: "Checklists" },
  { id: "aprovacoes", label: "Aprovações", active: true },
  { id: "incidentes", label: "Incidentes" },
  { id: "historico", label: "Histórico" }
];

const meta = {
  title: "CRM / Image Coverage / Aprovacoes",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage da imagem 25 da página Aprovações. A composição usa shell, PageFilterBar, PageQuickFilters, ApprovalTable e ApprovalDrawer oficiais; status em revisão visual, não aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const approvalRows: ApprovalTableRow[] = [
  {
    id: "ana-message",
    index: 1,
    title: <>Aprovar mensagem<br />para Ana Paula</>,
    type: "message",
    origin: <>WhatsApp /<br />Agente de<br />atendimento</>,
    requester: { name: "Copiloto", icon: "sparkles" },
    risk: "low",
    cost: "1 crédito",
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestão gerada<br />às 09:18</>,
    selected: true
  },
  {
    id: "agenda-change",
    index: 2,
    title: <>Aprovar alteração<br />de agenda</>,
    type: "agenda",
    origin: "Reposição",
    requester: { name: "Recepção", icon: "user" },
    risk: "medium",
    cost: <>Impacto<br />4 alunos</>,
    deadline: <>Hoje<br />11:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Conflito de sala<br />detectado</>
  },
  {
    id: "financial-exception",
    index: 3,
    title: <>Aprovar exceção<br />financeira</>,
    type: "finance",
    origin: <>Desconto<br />manual</>,
    requester: { name: "Mariana" },
    risk: "medium",
    cost: "R$ 120",
    deadline: <>Hoje<br />14:00</>,
    deadlineTone: "danger",
    status: "review",
    activity: <>Caixa solicitou<br />validação</>
  },
  {
    id: "replacement-announcement",
    index: 4,
    title: <>Aprovar comunicado<br />de reposição</>,
    type: "announcement",
    origin: <>Segmento<br />alunos afetados</>,
    requester: { name: <>Agente de<br />comunicação</>, icon: "user" },
    risk: "low",
    cost: "Cota 82%",
    deadline: "Amanhã",
    status: "pending",
    activity: <>Rascunho pronto<br />para envio</>
  },
  {
    id: "agent-action",
    index: 5,
    title: <>Aprovar ação<br />autônoma bloqueada</>,
    type: "agent",
    origin: <>Fluxo de<br />agenda</>,
    requester: { name: <>Agente de<br />agenda</>, icon: "user" },
    risk: "high",
    cost: "3 créditos",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "blocked",
    activity: <>Guardrail<br />interrompeu<br />execução</>
  },
  {
    id: "data-correction",
    index: 6,
    title: <>Aprovar correção<br />de cadastro</>,
    type: "data",
    origin: <>Telefone do<br />responsável</>,
    requester: { name: "CRM", icon: "user" },
    risk: "low",
    cost: "-",
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestão de<br />normalização</>
  }
];

const approvalTitles: Record<string, string> = {
  "ana-message": "Aprovar mensagem para Ana Paula",
  "agenda-change": "Aprovar alteração de agenda",
  "financial-exception": "Aprovar exceção financeira",
  "replacement-announcement": "Aprovar comunicado de reposição",
  "agent-action": "Aprovar ação autônoma bloqueada",
  "data-correction": "Aprovar correção de cadastro"
};

const approvalOrigins: Record<string, string> = {
  "ana-message": "WhatsApp / Agente de atendimento",
  "agenda-change": "Reposição",
  "financial-exception": "Desconto manual",
  "replacement-announcement": "Segmento alunos afetados",
  "agent-action": "Fluxo de agenda",
  "data-correction": "Telefone do responsável"
};

const approvalRequesters: Record<string, string> = {
  "ana-message": "Copiloto de atendimento",
  "agenda-change": "Recepção",
  "financial-exception": "Mariana",
  "replacement-announcement": "Agente de comunicação",
  "agent-action": "Agente de agenda",
  "data-correction": "CRM"
};

const approvalTypeLabels = {
  message: "Mensagem",
  agenda: "Agenda",
  finance: "Financeiro",
  announcement: "Comunicado",
  agent: "Agente",
  data: "Dados"
} satisfies Record<ApprovalTableRow["type"], string>;

const approvalRiskLabels = {
  low: "Baixo",
  medium: "Médio",
  high: "Alto"
} satisfies Record<ApprovalTableRow["risk"], string>;

function approvalDrawerFacts(row: ApprovalTableRow, state: ApprovalPanelState): ApprovalPanelFact[] {
  const status = state === "approved" ? "Aprovada" : state === "rejected" ? "Rejeitada" : row.status === "blocked" ? "Bloqueada" : row.status === "review" ? "Em revisão" : "Pendente";
  const statusTone = state === "approved" ? "approved" : state === "rejected" ? "rejected" : row.status === "blocked" ? "expired" : "pending";

  return [
    { id: "status", icon: "clipboard", label: "Status", value: status, dotTone: statusTone },
    { id: "type", icon: "clipboardCheck", label: "Tipo", value: approvalTypeLabels[row.type], valueIcon: row.type === "message" ? "message" : row.type === "agenda" ? "calendar" : row.type === "finance" ? "wallet" : row.type === "announcement" ? "send" : row.type === "data" ? "database" : "user" },
    { id: "origin", icon: "clipboard", label: "Origem canônica", value: approvalOrigins[row.id], valueIcon: row.id === "ana-message" ? "whatsapp" : undefined, valueTone: row.id === "ana-message" ? "whatsapp" : "default" },
    { id: "agent", icon: "clipboard", label: "Solicitante / agente", value: approvalRequesters[row.id], valueIcon: row.requester.icon, valueTone: row.id === "ana-message" ? "copilot" : "default" },
    { id: "risk", icon: "clock", label: "Risco", value: approvalRiskLabels[row.risk], dotTone: row.risk },
    { id: "quota", icon: "coins", label: "Custo / cota", value: row.cost },
    { id: "deadline", icon: "clock", label: "Prazo", value: row.deadline, valueTone: row.deadlineTone === "danger" ? "danger" : "default" }
  ];
}

function approvalDrawerSections(row: ApprovalTableRow): ApprovalPanelSection[] {
  if (row.id === "ana-message") {
    return [
      { id: "context", title: "Contexto resumido", body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo." },
      { id: "proposal", title: "Proposta principal", badge: "Sugestão do copiloto", variant: "suggestion", body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?" },
      { id: "impact", title: "Impacto esperado", body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito." },
      { id: "policy", title: "Política / guardrail aplicado", body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho." }
    ];
  }

  return [
    { id: "context", title: "Contexto resumido", body: `${approvalTitles[row.id]} foi encaminhada para revisão humana pela fila de ${approvalTypeLabels[row.type].toLowerCase()}.` },
    { id: "proposal", title: "Proposta principal", badge: "Revisão necessária", variant: "suggestion", body: <>Confirmar a decisão considerando origem, prazo e impacto informado: {row.activity}.</> },
    { id: "impact", title: "Impacto esperado", body: <>Custo ou cota estimada: {row.cost}.</> },
    { id: "policy", title: "Política / guardrail aplicado", body: `A decisão exige validação humana por risco ${approvalRiskLabels[row.risk].toLowerCase()}.` }
  ];
}

function ApprovalsPageContent({
  selectedQueueId,
  selectedApprovalId,
  filterValues,
  query,
  pageLabel,
  onQueueSelect,
  onApprovalSelect,
  onFilterValueChange,
  onSearchChange,
  onAdvancedFilters,
  onCreateApproval,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  onInteraction,
  announcement,
  drawer
}: {
  selectedQueueId: string;
  selectedApprovalId: string;
  filterValues: Record<string, string | string[]>;
  query: string;
  pageLabel: string;
  onQueueSelect: (item: PageQuickFilterItem) => void;
  onApprovalSelect: (row: ApprovalTableRow) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
  onSearchChange: (value: string) => void;
  onAdvancedFilters: () => void;
  onCreateApproval: () => void;
  onItemsPerPageClick: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onInteraction: (message: string) => void;
  announcement: string;
  drawer?: React.ReactNode;
}) {
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      {
        id: "type",
        label: "Tipo",
        kind: "single",
        value: typeof filterValues.type === "string" ? filterValues.type : "",
        options: [
          { value: "mensagem", label: "Mensagem", icon: "message" },
          { value: "agenda", label: "Agenda", icon: "calendar" },
          { value: "financeiro", label: "Financeiro", icon: "wallet" }
        ]
      },
      {
        id: "risk",
        label: "Risco",
        kind: "single",
        value: typeof filterValues.risk === "string" ? filterValues.risk : "",
        options: [
          { value: "baixo", label: "Baixo", icon: "checkCircle" },
          { value: "medio", label: "Médio", icon: "alertCircle" },
          { value: "alto", label: "Alto", icon: "alert" }
        ]
      },
      {
        id: "origin",
        label: "Origem",
        kind: "single",
        value: typeof filterValues.origin === "string" ? filterValues.origin : "",
        options: [
          { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
          { value: "agenda", label: "Agenda", icon: "calendar" },
          { value: "dados", label: "Dados", icon: "database" }
        ]
      },
      {
        id: "status",
        label: "Status",
        kind: "single",
        value: typeof filterValues.status === "string" ? filterValues.status : "",
        options: [
          { value: "pendente", label: "Pendente", icon: "clock" },
          { value: "revisao", label: "Em revisão", icon: "eye" },
          { value: "bloqueada", label: "Bloqueada", icon: "lock" }
        ]
      },
      {
        id: "owner",
        label: "Responsável",
        kind: "single",
        value: typeof filterValues.owner === "string" ? filterValues.owner : "",
        options: [
          { value: "copiloto", label: "Copiloto", icon: "sparkles" },
          { value: "recepcao", label: "Recepção", icon: "user" },
          { value: "crm", label: "CRM", icon: "database" }
        ]
      }
    ],
    [filterValues]
  );
  const queueItems = useMemo<PageQuickFilterItem[]>(
    () => [
      { id: "all", label: "Todas", count: "24", icon: "calendar", selected: selectedQueueId === "all" },
      { id: "today", label: "Hoje", count: "8", icon: "calendar", selected: selectedQueueId === "today" },
      { id: "priority", label: "Alta prioridade", count: "6", icon: "alert", selected: selectedQueueId === "priority", tone: "danger" },
      { id: "messages", label: "Mensagens", count: "9", icon: "message", selected: selectedQueueId === "messages" },
      { id: "agenda", label: "Agenda", count: "7", icon: "calendar", selected: selectedQueueId === "agenda" },
      { id: "finance", label: "Financeiro", count: "5", icon: "coins", selected: selectedQueueId === "finance" },
      { id: "agents", label: "Agentes", count: "4", icon: "user", selected: selectedQueueId === "agents" },
      { id: "data", label: "Dados", count: "3", icon: "database", selected: selectedQueueId === "data" },
      { id: "announcements", label: "Comunicados", count: "2", icon: "send", selected: selectedQueueId === "announcements" }
    ],
    [selectedQueueId]
  );
  const rows = useMemo<ApprovalTableRow[]>(
    () => approvalRows.map((row) => ({ ...row, selected: row.id === selectedApprovalId })),
    [selectedApprovalId]
  );

  return (
    <CrmWorklistPage
      activeNavId="aprovacoes"
      activeSidebarId="metricas"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-approvals-shell"
      contentClassName="sb-image-coverage-approvals-content"
      contentLayout="main-priority"
      drawer={drawer}
      drawerPlacement="floating"
      globalActions={{
        onAvatar: () => onInteraction("Perfil da operadora aberto"),
        onMessages: () => onInteraction("Mensagens abertas"),
        onNotifications: () => onInteraction("Notificações abertas"),
        onSearch: () => onInteraction("Busca global aberta")
      }}
      navItems={approvalsNavItems}
      onBack={() => onInteraction("Navegação de retorno acionada")}
      onNavChange={(id) => onInteraction(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => onInteraction(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => onInteraction(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="compact-stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      showGlobalActionsWithDrawer
      stageClassName="sb-image-coverage-approvals-stage"
      subtitle="Decisões aguardando revisão humana"
      title="Aprovações"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="compact-rail"
      filterBar={
        <PageFilterBar
          aria-label="Filtros de aprovações"
          density="compact"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={onCreateApproval} variant="primary">
              Criar aprovação
            </Button>
          }
          filters={filters}
          advancedFiltersDescription="Use para status e responsavel quando a pagina tiver muitas decisoes."
          advancedFiltersLabel="Mais filtros de aprovações"
          advancedFiltersSurface="modal"
          advancedFiltersTitle="Filtros de aprovações"
          onFilterValueChange={onFilterValueChange}
          onSearchChange={onSearchChange}
          onSearchFilter={onAdvancedFilters}
          query={query}
          searchAriaLabel="Buscar aprovações"
          searchFilterLabel="Abrir filtros avancados"
          searchFilterPlacement="embedded"
          searchPlaceholder="Buscar aprovações..."
        />
      }
      filterBarLabel="Filtros de aprovações"
      listLabel="Filas"
      mainLabel="Tabela de aprovações"
      quickFilters={
        <PageQuickFilters
          aria-label="Filas"
          groupLabel="Filas de aprovações"
          heading="Filas"
          items={queueItems}
          onSelect={onQueueSelect}
          selectionTone="soft"
        />
      }
    >
      <>
        <ApprovalTable
          pageLabel={pageLabel}
          rows={rows}
          onItemsPerPageClick={onItemsPerPageClick}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onRowSelect={onApprovalSelect}
        />
        <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
      </>
    </CrmWorklistPage>
  );
}

export function ApprovalsShell() {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedQueueId, setSelectedQueueId] = useState("all");
  const [selectedApprovalId, setSelectedApprovalId] = useState("ana-message");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [drawerState, setDrawerState] = useState<ApprovalPanelState>("pending");
  const [pageLabel, setPageLabel] = useState("1-6 de 6");
  const [announcement, setAnnouncement] = useState("");
  const selectedApproval = approvalRows.find((row) => row.id === selectedApprovalId) ?? approvalRows[0]!;
  const selectedTimeline: ApprovalPanelTimelineItem[] = selectedApproval.id === "ana-message" ? [
    { id: "requested", time: "09:12", label: "Cliente solicitou reagendamento" },
    { id: "suggested", time: "09:16", label: "Copiloto sugeriu resposta" },
    { id: "created", time: "09:18", label: "Aprovação criada" }
  ] : [
    { id: "activity", time: "Agora", label: selectedApproval.activity },
    { id: "review", time: "Agora", label: "Aprovação aberta para revisão" }
  ];

  const drawerNode = drawerOpen ? (
    <ApprovalDrawer
      className="sb-image-coverage-approvals-drawer"
      facts={approvalDrawerFacts(selectedApproval, drawerState)}
      onAction={(action) => {
        if (action === "approve") setDrawerState("approved");
        if (action === "reject") setDrawerState("rejected");
        setAnnouncement(`Ação da aprovação: ${action}`);
      }}
      onClose={() => {
        setDrawerOpen(false);
        setAnnouncement("Drawer de aprovação fechado");
      }}
      recentComment={selectedApproval.id === "ana-message" ? {
        author: "Sam Frank",
        time: "Hoje, 09:20",
        body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço.",
        avatarSrc: source25SamFrank
      } : {
        author: "Sam Frank",
        time: "Agora",
        body: "Revisar os dados da solicitação antes de decidir.",
        avatarSrc: source25SamFrank
      }}
      sections={approvalDrawerSections(selectedApproval)}
      state={drawerState}
      timeline={selectedTimeline}
      title={approvalTitles[selectedApproval.id]}
    />
  ) : null;

  return (
    <ApprovalsPageContent
      announcement={announcement}
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedApprovalId={selectedApprovalId}
      selectedQueueId={selectedQueueId}
      onAdvancedFilters={() => {
        setFilterValues((current) => ({ ...current, type: "mensagem", risk: "baixo", status: "pendente" }));
        setAnnouncement("Filtros avançados aplicados");
      }}
      onApprovalSelect={(row) => {
        setSelectedApprovalId(row.id);
        setDrawerOpen(true);
        setDrawerState(row.status === "blocked" ? "blocked" : "pending");
        setAnnouncement(`Aprovação aberta: ${approvalTitles[row.id]}`);
      }}
      onCreateApproval={() => {
        setQuery("nova aprovação");
        setAnnouncement("Nova aprovação iniciada");
      }}
      onFilterValueChange={(filter, value) => {
        setFilterValues((current) => ({ ...current, [filter.id]: value }));
        setAnnouncement(`Filtro ${filter.label} atualizado`);
      }}
      onInteraction={setAnnouncement}
      onItemsPerPageClick={() => {
        setPageLabel("1-10 de 24");
        setAnnouncement("Quantidade por página alterada");
      }}
      onNextPage={() => {
        setPageLabel("7-12 de 24");
        setAnnouncement("Próxima página aberta");
      }}
      onPreviousPage={() => {
        setPageLabel("1-6 de 6");
        setAnnouncement("Página anterior aberta");
      }}
      onQueueSelect={(item) => {
        setSelectedQueueId(item.id);
        setAnnouncement(`Fila selecionada: ${item.label}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        setAnnouncement(value ? `Busca atualizada: ${value}` : "Busca limpa");
      }}
    />
  );
}

export const Image25ListaDecisaoDetalhe: Story = {
  name: "25 lista decisao detalhe",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png. Status: em revisão visual com novo ApprovalTable reutilizável; ainda não aprovada 1:1."
      }
    }
  },
  render: () => <ApprovalsShell />
};
