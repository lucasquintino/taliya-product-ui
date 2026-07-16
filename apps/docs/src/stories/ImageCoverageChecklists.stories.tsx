import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  ChecklistDrawer,
  ChecklistTable,
  CrmWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  ChecklistDrawerActivity,
  ChecklistDrawerComment,
  ChecklistDrawerFact,
  ChecklistDrawerStep,
  ChecklistTableRow,
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Checklists",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage da imagem 24C da página Checklists. A composição usa shell, PageFilterBar, PageQuickFilters, ChecklistTable e drawer/frame oficiais; status em ajuste, não aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const checklistsNavItems: CrmShellNavItem[] = [
  { id: "tarefas", label: "Tarefas" },
  { id: "checklists", label: "Checklists", active: true },
  { id: "modelos", label: "Modelos" },
  { id: "historico", label: "Histórico" }
];

const checklistRows: ChecklistTableRow[] = [
  {
    id: "opening",
    index: 1,
    title: "Abertura do estúdio",
    type: "Abertura",
    progress: { completed: 3, total: 5 },
    owner: { name: "Mariana", avatarSrc: image79Avatar },
    deadline: <>Hoje<br />08:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Conferir salas",
    activity: "07:42",
    selected: true
  },
  {
    id: "daily-agenda",
    index: 2,
    title: "Revisão diária da agenda",
    type: "Agenda",
    progress: { completed: 4, total: 7 },
    owner: { name: "Lucas" },
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "blocked",
    nextStep: <>Resolver conflito<br />de sala</>,
    activity: "08:15"
  },
  {
    id: "closing",
    index: 3,
    title: "Fechamento do dia",
    type: "Fechamento",
    progress: { completed: 0, total: 6 },
    owner: { name: "Coordenação", helper: "Equipe" },
    deadline: <>Hoje<br />20:00</>,
    deadlineTone: "danger",
    status: "pending",
    nextStep: <>Iniciar<br />conferência</>,
    activity: "-"
  },
  {
    id: "agent-setup",
    index: 4,
    title: "Setup do agente de agenda",
    type: "Agentes",
    progress: { completed: 5, total: 8 },
    owner: { name: "Gestor" },
    deadline: "Amanhã",
    status: "review",
    nextStep: <>Validar fallback<br />manual</>,
    activity: "11:10"
  },
  {
    id: "new-student",
    index: 5,
    title: "Onboarding de novo aluno",
    type: "Alunos",
    progress: { completed: 6, total: 9 },
    owner: { name: "Recepção" },
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Validar contrato",
    activity: "13:20"
  }
];

const checklistDrawerSteps: ChecklistDrawerStep[] = [
  { id: "open-reception", title: "Abrir recepção", state: "done" },
  { id: "check-agenda", title: "Conferir agenda do dia", state: "done" },
  { id: "prepare-rooms", title: "Preparar salas", state: "done" },
  { id: "validate-teachers", title: "Validar professores confirmados", state: "warning", helperText: "1 professor ainda não confirmou" },
  { id: "payments", title: "Revisar pagamentos críticos", state: "pending" }
];

const checklistDrawerActivity: ChecklistDrawerActivity = {
  id: "latest",
  icon: "clock",
  time: "07:42",
  body: <>Mariana marcou "Preparar salas" como concluído</>
};

const checklistStatusLabel: Record<ChecklistTableRow["status"], string> = {
  progress: "Em andamento",
  blocked: "Bloqueado",
  pending: "Pendente",
  review: "Em revisão",
  done: "Concluído"
};

function contextualChecklistSteps(row: ChecklistTableRow): ChecklistDrawerStep[] {
  if (row.id === "opening") return checklistDrawerSteps;
  return Array.from({ length: row.progress.total }, (_, index) => ({
    id: `${row.id}-step-${index + 1}`,
    title: index === row.progress.completed ? "Executar próximo passo operacional" : `Etapa ${index + 1}`,
    state: index < row.progress.completed ? "done" : "pending"
  }));
}

function ChecklistsPageContent({
  selectedQueueId,
  selectedChecklistId,
  filterValues,
  query,
  pageLabel,
  onQueueSelect,
  onChecklistSelect,
  onFilterValueChange,
  onSearchChange,
  onAdvancedFilters,
  onCreateChecklist,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  onShellAction,
  announcement,
  drawer
}: {
  selectedQueueId: string;
  selectedChecklistId: string;
  filterValues: Record<string, string | string[]>;
  query: string;
  pageLabel: string;
  onQueueSelect: (item: PageQuickFilterItem) => void;
  onChecklistSelect: (row: ChecklistTableRow) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
  onSearchChange: (value: string) => void;
  onAdvancedFilters: () => void;
  onCreateChecklist: () => void;
  onItemsPerPageClick: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onShellAction: (message: string) => void;
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
          { value: "abertura", label: "Abertura", icon: "sun" },
          { value: "fechamento", label: "Fechamento", icon: "moon" },
          { value: "agenda", label: "Agenda", icon: "calendar" }
        ]
      },
      {
        id: "status",
        label: "Status",
        kind: "multi",
        values: Array.isArray(filterValues.status) ? filterValues.status : [],
        options: [
          { value: "andamento", label: "Em andamento", icon: "play" },
          { value: "bloqueado", label: "Bloqueado", icon: "lock" },
          { value: "pendente", label: "Pendente", icon: "clock" }
        ]
      },
      {
        id: "owner",
        label: "Responsável",
        kind: "single",
        value: typeof filterValues.owner === "string" ? filterValues.owner : "",
        options: [
          { value: "mariana", label: "Mariana", icon: "user" },
          { value: "lucas", label: "Lucas", icon: "user" },
          { value: "coordenacao", label: "Coordenação", icon: "users" }
        ]
      }
    ],
    [filterValues]
  );
  const queueItems = useMemo<PageQuickFilterItem[]>(
    () => [
      { id: "today", label: "Hoje", count: "12", icon: "calendar", selected: selectedQueueId === "today" },
      { id: "opening", label: "Abertura", count: "6", icon: "sun", selected: selectedQueueId === "opening" },
      { id: "closing", label: "Fechamento", count: "5", icon: "moon", selected: selectedQueueId === "closing" },
      { id: "agenda", label: "Agenda", count: "8", icon: "calendar", selected: selectedQueueId === "agenda" },
      { id: "finance", label: "Financeiro", count: "4", icon: "coins", selected: selectedQueueId === "finance" },
      { id: "students", label: "Alunos", count: "7", icon: "user", selected: selectedQueueId === "students" },
      { id: "agents", label: "Agentes", count: "3", icon: "bot", selected: selectedQueueId === "agents" },
      { id: "setup", label: "Setup", count: "2", icon: "settings", selected: selectedQueueId === "setup" }
    ],
    [selectedQueueId]
  );
  const rows = useMemo<ChecklistTableRow[]>(
    () => checklistRows.map((row) => ({ ...row, selected: row.id === selectedChecklistId })),
    [selectedChecklistId]
  );

  return (
    <CrmWorklistPage
      activeNavId="checklists"
      activeSidebarId="clipboardCheck"
      avatarSrc={image79Avatar}
      contentLayout="work-list"
      drawer={drawer}
      drawerPlacement="content"
      drawerSize="compact"
      globalActions={{
        onAvatar: () => onShellAction("Perfil da operadora aberto"),
        onMessages: () => onShellAction("Mensagens abertas"),
        onNotifications: () => onShellAction("Notificações abertas"),
        onSearch: () => onShellAction("Busca global aberta")
      }}
      navItems={checklistsNavItems}
      onBack={() => onShellAction("Navegação de retorno acionada")}
      onNavChange={(id) => onShellAction(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => onShellAction(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => onShellAction(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Rotinas operacionais do estúdio"
      title="Checklists"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      filterBar={
        <PageFilterBar
          aria-label="Filtros de checklists"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={onCreateChecklist} variant="primary">
              Criar checklist
            </Button>
          }
          filters={filters}
          onFilterValueChange={onFilterValueChange}
          onSearchChange={onSearchChange}
          onSearchFilter={onAdvancedFilters}
          query={query}
          searchAriaLabel="Buscar checklists"
          searchFilterLabel="Abrir filtros avançados"
          searchPlaceholder="Buscar checklists..."
        />
      }
      filterBarLabel="Filtros de checklists"
      listLabel="Filas"
      mainLabel="Tabela de checklists"
      worklistLayoutMode="balanced-rail"
      quickFilters={
        <PageQuickFilters
          aria-label="Filas"
          groupLabel="Filas de checklists"
          heading="Filas"
          items={queueItems}
          onSelect={onQueueSelect}
          selectionTone="soft"
        />
      }
    >
      <>
        <ChecklistTable
          pageLabel={pageLabel}
          rows={rows}
          onItemsPerPageClick={onItemsPerPageClick}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onRowSelect={onChecklistSelect}
        />
        <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
      </>
    </CrmWorklistPage>
  );
}

export function ChecklistsShell() {
  const [announcedAction, setAnnouncedAction] = useState("");
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedQueueId, setSelectedQueueId] = useState("today");
  const [selectedChecklistId, setSelectedChecklistId] = useState("opening");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [pageLabel, setPageLabel] = useState("1-5 de 12");
  const [steps, setSteps] = useState<ChecklistDrawerStep[]>(checklistDrawerSteps);
  const [comment, setComment] = useState<ChecklistDrawerComment>(
    { id: "mariana", author: "Mariana", body: "Recepção aberta. Sala 2 ainda aguardando confirmação do professor.", time: "07:45", avatarSrc: image79Avatar }
  );
  const checkedCount = steps.filter((item) => item.state === "done").length;
  const selectedChecklist = checklistRows.find((row) => row.id === selectedChecklistId) ?? checklistRows[0]!;
  const drawerFacts = useMemo<ChecklistDrawerFact[]>(() => [
    { id: "status", icon: "calendar", label: "Status", value: <><span className="tcrm-checklist-drawer__status-dot" aria-hidden="true" />{checklistStatusLabel[selectedChecklist.status]}</>, tone: selectedChecklist.status === "blocked" ? "danger" : "info" },
    { id: "owner", icon: "user", label: "Responsável", value: selectedChecklist.owner.name, avatarSrc: selectedChecklist.owner.avatarSrc },
    { id: "deadline", icon: "calendar", label: "Prazo", value: selectedChecklist.deadline, tone: selectedChecklist.deadlineTone === "danger" ? "danger" : undefined },
    { id: "progress", icon: "clock", label: "Progresso", value: `${checkedCount}/${steps.length}` }
  ], [checkedCount, selectedChecklist, steps.length]);
  const drawerActivity = useMemo<ChecklistDrawerActivity>(() => selectedChecklist.id === "opening"
    ? checklistDrawerActivity
    : {
        id: `${selectedChecklist.id}-activity`,
        icon: "clock",
        time: selectedChecklist.activity,
        body: <>Última atividade registrada em <strong>{selectedChecklist.title}</strong></>
      }, [selectedChecklist]);

  const drawerNode = drawerOpen ? (
    <ChecklistDrawer
      activity={drawerActivity}
      className="sb-image-coverage-checklists-drawer"
      comment={comment}
      completedSteps={checkedCount}
      facts={drawerFacts}
      steps={steps}
      totalSteps={steps.length}
      onStepToggle={(item, checked) => {
        setSteps((current) => current.map((step) => (step.id === item.id ? { ...step, state: checked ? "done" : "pending" } : step)));
        setAnnouncedAction(`${item.title}: ${checked ? "concluído" : "pendente"}`);
      }}
      onClose={() => {
        setDrawerOpen(false);
        setAnnouncedAction("Drawer de checklist fechado");
      }}
      onContinue={() => {
        setSelectedQueueId("opening");
        setAnnouncedAction("Execução do checklist continuada");
      }}
      onCreateTask={() => {
        setQuery("tarefa criada");
        setAnnouncedAction("Tarefa criada a partir do checklist");
      }}
      onComplete={() => {
        setSteps((current) => current.map((step) => ({ ...step, state: "done" })));
        setComment({ id: "local-complete", author: "Você", body: "Checklist concluído pela story.", time: "Agora" });
        setAnnouncedAction("Checklist concluído");
      }}
      onOpenOrigin={() => {
        setSelectedQueueId("opening");
        setAnnouncedAction("Origem do checklist aberta");
      }}
      title={selectedChecklist.title}
    />
  ) : null;

  return (
    <ChecklistsPageContent
      announcement={announcedAction}
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedChecklistId={selectedChecklistId}
      selectedQueueId={selectedQueueId}
      onAdvancedFilters={() => {
        setFilterValues((current) => ({ ...current, type: "abertura", status: ["andamento"], owner: "mariana" }));
        setAnnouncedAction("Filtros avançados aplicados");
      }}
      onChecklistSelect={(row) => {
        setSelectedChecklistId(row.id);
        setDrawerOpen(true);
        setSteps(contextualChecklistSteps(row));
        setComment(row.id === "opening"
          ? { id: "mariana", author: "Mariana", body: "Recepção aberta. Sala 2 ainda aguardando confirmação do professor.", time: "07:45", avatarSrc: image79Avatar }
          : { id: `${row.id}-context`, author: "Taliya", body: `Contexto de ${row.title} carregado.`, time: "Agora" });
        setAnnouncedAction(`Checklist aberto: ${row.title}`);
      }}
      onCreateChecklist={() => {
        setQuery("novo checklist");
        setAnnouncedAction("Criação de checklist iniciada");
      }}
      onFilterValueChange={(filter, value) => {
        setFilterValues((current) => ({ ...current, [filter.id]: value }));
        setAnnouncedAction(`Filtro ${filter.label} atualizado`);
      }}
      onItemsPerPageClick={() => {
        setPageLabel("1-10 de 12");
        setAnnouncedAction("Quantidade por página atualizada");
      }}
      onNextPage={() => {
        setPageLabel("6-10 de 12");
        setAnnouncedAction("Próxima página aberta");
      }}
      onPreviousPage={() => {
        setPageLabel("1-5 de 12");
        setAnnouncedAction("Página anterior aberta");
      }}
      onQueueSelect={(item) => {
        setSelectedQueueId(item.id);
        setAnnouncedAction(`Fila selecionada: ${item.label}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        setAnnouncedAction(value ? `Busca atualizada: ${value}` : "Busca limpa");
      }}
      onShellAction={setAnnouncedAction}
    />
  );
}

export const Image24ListaExecucaoDetalhe: Story = {
  name: "24 lista execução detalhe",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png. Status: em ajuste com novo ChecklistTable reutilizável; ainda não aprovada 1:1."
      }
    }
  },
  render: () => <ChecklistsShell />
};
