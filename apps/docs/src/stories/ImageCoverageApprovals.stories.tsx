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
  ApprovalPanelState,
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
      activeSidebarId="shield"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-approvals-shell"
      contentClassName="sb-image-coverage-approvals-content"
      contentLayout="main-priority"
      drawer={drawer}
      drawerPlacement="floating"
      navItems={approvalsNavItems}
      pageHeaderRhythm="spacious"
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-approvals-stage"
      subtitle="Decisões aguardando revisão humana"
      title="Aprovações"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistClassName="sb-image-coverage-approvals-page"
      worklistLayoutMode="main-priority"
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
        />
      }
    >
      <ApprovalTable
        pageLabel={pageLabel}
        rows={rows}
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onApprovalSelect}
      />
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

  const sourceApprovalSections = [
    {
      id: "context",
      title: "Contexto resumido",
      body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
    },
    {
      id: "proposal",
      title: "Proposta principal",
      badge: "Sugestão do copiloto",
      variant: "suggestion" as const,
      body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
    },
    {
      id: "impact",
      title: "Impacto esperado",
      body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
    },
    {
      id: "policy",
      title: "Política / guardrail aplicado",
      body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
    }
  ];

  const drawerNode = drawerOpen ? (
    <ApprovalDrawer
      className="sb-image-coverage-approvals-drawer"
      onAction={(action) => {
        if (action === "approve") setDrawerState("approved");
        if (action === "reject") setDrawerState("rejected");
      }}
      onClose={() => setDrawerOpen(false)}
      recentComment={{
        author: "Sam Frank",
        time: "Hoje, 09:20",
        body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço.",
        avatarSrc: source25SamFrank
      }}
      sections={sourceApprovalSections}
      state={drawerState}
    />
  ) : null;

  return (
    <ApprovalsPageContent
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedApprovalId={selectedApprovalId}
      selectedQueueId={selectedQueueId}
      onAdvancedFilters={() => setFilterValues((current) => ({ ...current, type: "mensagem", risk: "baixo", status: "pendente" }))}
      onApprovalSelect={(row) => {
        setSelectedApprovalId(row.id);
        setDrawerOpen(true);
        setDrawerState(row.status === "blocked" ? "blocked" : row.status === "review" ? "pending" : "pending");
      }}
      onCreateApproval={() => setQuery("nova aprovação")}
      onFilterValueChange={(filter, value) => setFilterValues((current) => ({ ...current, [filter.id]: value }))}
      onItemsPerPageClick={() => setPageLabel("1-10 de 24")}
      onNextPage={() => setPageLabel("7-12 de 24")}
      onPreviousPage={() => setPageLabel("1-6 de 6")}
      onQueueSelect={(item) => setSelectedQueueId(item.id)}
      onSearchChange={setQuery}
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
