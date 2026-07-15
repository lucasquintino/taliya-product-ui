import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  CrmWorklistPage,
  CrmWorklistTable,
  PageFilterBar,
  PageQuickFilters,
  TaskDrawer,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  CrmWorklistTableColumn,
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem,
  TaskDrawerComment,
  TaskDrawerFact,
  TaskDrawerHistoryItem,
  TaskDrawerChecklistItem,
  TaskDrawerState
} from "@taliya/crm";
import { Button, Chip, cn } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source23CommentAnaSilva from "../assets/source23-comment-ana-silva.png";
import source23CommentJoaoSilva from "../assets/source23-comment-joao-silva.png";
import source23CommentSamFrank from "../assets/source23-comment-sam-frank.png";

const tasksNavItems: CrmShellNavItem[] = [
  { id: "pendencias", label: "Pendências" },
  { id: "tarefas", label: "Tarefas", active: true },
  { id: "aprovacoes", label: "Aprovações" },
  { id: "incidentes", label: "Incidentes" },
  { id: "historico", label: "Histórico" }
];

const meta = {
  title: "CRM / Image Coverage / Tarefas",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage da imagem 23 da página Tarefas. A composição usa shell, PageFilterBar, PageQuickFilters, tabela e drawer oficiais; status em revisão visual, não aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

type TaskPriority = "low" | "medium" | "high";
type TaskStatus = "open" | "progress" | "waiting" | "unassigned" | "late" | "done";
type TaskMode = "copilot" | "manual" | "automation" | "none";

interface TaskWorklistRow {
  id: string;
  title: React.ReactNode;
  owner: React.ReactNode;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: TaskStatus;
  origin: React.ReactNode;
  priority: TaskPriority;
  activity: React.ReactNode;
  mode: TaskMode;
  selected?: boolean;
  disabled?: boolean;
}

const taskStatusLabel: Record<TaskStatus, string> = {
  open: "Aberta",
  progress: "Em andamento",
  waiting: "Aguardando",
  unassigned: "Sem dono",
  late: "Atrasada",
  done: "Concluída"
};

const taskPriorityLabel: Record<TaskPriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta"
};

const taskModeLabel: Record<TaskMode, React.ReactNode> = {
  copilot: <>copiloto<br />sugeriu</>,
  manual: <>manual<br />disponível</>,
  automation: <>automação<br />bloqueada</>,
  none: "—"
};

function taskSortValue(row: TaskWorklistRow, key: string) {
  if (key === "priority") return { high: 0, medium: 1, low: 2 }[row.priority];
  if (key === "status") return taskStatusLabel[row.status];
  if (key === "mode") return String(taskModeLabel[row.mode]);
  const value = row[key as keyof TaskWorklistRow];
  return typeof value === "string" || typeof value === "number" ? value : row.id;
}

const taskRows: TaskWorklistRow[] = [
  {
    id: "replace-ana",
    title: "Confirmar reposição da Ana",
    owner: "Recepção",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "open",
    origin: <>Agenda /<br />Reposições</>,
    priority: "medium",
    activity: <>Ana pediu reposição<br />por WhatsApp</>,
    mode: "copilot"
  },
  {
    id: "receipt-marina",
    title: <>Validar comprovante da<br />Marina</>,
    owner: "Financeiro",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Financeiro",
    priority: "high",
    activity: <>Comprovante enviado<br />às 10:12</>,
    mode: "manual"
  },
  {
    id: "phone-responsible",
    title: <>Corrigir telefone do<br />responsável</>,
    owner: "Recepção",
    deadline: "Atrasada",
    deadlineTone: "danger",
    status: "open",
    origin: "Dados",
    priority: "medium",
    activity: <>Contato falhou<br />novamente</>,
    mode: "manual"
  },
  {
    id: "inactive-student",
    title: "Ligar para aluno inativo",
    owner: "Atendimento",
    deadline: "Amanhã",
    status: "waiting",
    origin: "Retenção",
    priority: "medium",
    activity: <>Aguardando janela<br />de contato</>,
    mode: "manual"
  },
  {
    id: "substitute-18h",
    title: "Confirmar substituto aula 18h",
    owner: "Coordenação",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Agenda",
    priority: "high",
    activity: <>Professor titular<br />indisponível</>,
    mode: "manual"
  },
  {
    id: "duplicate-registration",
    title: "Revisar cadastro duplicado",
    owner: "Sem dono",
    deadline: "—",
    status: "unassigned",
    origin: "Dados",
    priority: "low",
    activity: <>Duplicidade detectada<br />pelo CRM</>,
    mode: "automation"
  },
  {
    id: "call-09h",
    title: <>Completar chamada da<br />aula 09h</>,
    owner: "Instrutores",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "late",
    origin: "Agenda / Aula",
    priority: "high",
    activity: <>Chamada ainda<br />incompleta</>,
    mode: "manual"
  },
  {
    id: "contract-signature",
    title: <>Enviar contrato para<br />assinatura</>,
    owner: "Financeiro",
    deadline: "Sexta, 17/05",
    status: "done",
    origin: "Financeiro",
    priority: "medium",
    activity: <>Contrato enviado<br />para aluno</>,
    mode: "none"
  }
];

const taskDrawerChecklist: TaskDrawerChecklistItem[] = [
  { id: "verify-times", title: "Verificar horários disponíveis" },
  { id: "confirm-ana", title: "Confirmar com Ana" },
  { id: "update-calendar", title: "Atualizar reposição na agenda" }
];

function TasksPageContent({
  selectedQueueId,
  selectedTaskId,
  filterValues,
  query,
  onQueueSelect,
  onTaskSelect,
  onFilterValueChange,
  onSearchChange,
  onAdvancedFilters,
  onCreateTask,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  pageLabel,
  drawer
}: {
  selectedQueueId: string;
  selectedTaskId: string;
  filterValues: Record<string, string | string[]>;
  query: string;
  onQueueSelect: (item: PageQuickFilterItem) => void;
  onTaskSelect: (row: TaskWorklistRow) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
  onSearchChange: (value: string) => void;
  onAdvancedFilters: () => void;
  onCreateTask: () => void;
  onItemsPerPageClick: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  pageLabel: string;
  drawer?: React.ReactNode;
}) {
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      {
        id: "owner",
        label: "Dono",
        kind: "multi",
        values: Array.isArray(filterValues.owner) ? filterValues.owner : [],
        options: [
          { value: "recepcao", label: "Recepção", icon: "user" },
          { value: "financeiro", label: "Financeiro", icon: "coins" },
          { value: "coordenacao", label: "Coordenação", icon: "users" },
          { value: "sem-dono", label: "Sem dono", icon: "user" }
        ]
      },
      {
        id: "deadline",
        label: "Prazo",
        kind: "single",
        value: typeof filterValues.deadline === "string" ? filterValues.deadline : "",
        options: [
          { value: "hoje", label: "Hoje", icon: "calendar" },
          { value: "atrasada", label: "Atrasada", icon: "clock" },
          { value: "amanha", label: "Amanhã", icon: "calendar" }
        ]
      },
      {
        id: "origin",
        label: "Origem",
        kind: "single",
        value: typeof filterValues.origin === "string" ? filterValues.origin : "",
        options: [
          { value: "agenda", label: "Agenda", icon: "calendar" },
          { value: "financeiro", label: "Financeiro", icon: "coins" },
          { value: "dados", label: "Dados", icon: "database" }
        ]
      },
      {
        id: "status",
        label: "Status",
        kind: "multi",
        values: Array.isArray(filterValues.status) ? filterValues.status : [],
        options: [
          { value: "aberta", label: "Aberta", icon: "clipboard" },
          { value: "andamento", label: "Em andamento", icon: "play" },
          { value: "atrasada", label: "Atrasada", icon: "alert" },
          { value: "concluida", label: "Concluída", icon: "check" }
        ]
      },
      {
        id: "priority",
        label: "Prioridade",
        kind: "single",
        value: typeof filterValues.priority === "string" ? filterValues.priority : "",
        options: [
          { value: "alta", label: "Alta", icon: "alert" },
          { value: "media", label: "Média", icon: "circle" },
          { value: "baixa", label: "Baixa", icon: "check" }
        ]
      }
    ],
    [filterValues]
  );
  const queueItems = useMemo<PageQuickFilterItem[]>(
    () => [
      { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user", selected: selectedQueueId === "my-tasks" },
      { id: "today", label: "Hoje", count: "6", icon: "calendar", selected: selectedQueueId === "today" },
      { id: "late", label: "Atrasadas", count: "3", icon: "clock", selected: selectedQueueId === "late", tone: "danger" },
      { id: "unassigned", label: "Sem dono", count: "2", icon: "user", selected: selectedQueueId === "unassigned" },
      { id: "waiting", label: "Aguardando", count: "8", icon: "tag", selected: selectedQueueId === "waiting" },
      { id: "checklists", label: "Checklists", count: "5", icon: "clipboardCheck", selected: selectedQueueId === "checklists" },
      { id: "origin", label: "Por origem", icon: "graduation", selected: selectedQueueId === "origin" }
    ],
    [selectedQueueId]
  );
  const rows = useMemo<TaskWorklistRow[]>(
    () => taskRows.map((row) => ({ ...row, selected: row.id === selectedTaskId })),
    [selectedTaskId]
  );
  const taskColumns = useMemo<Array<CrmWorklistTableColumn<TaskWorklistRow>>>(
    () => [
      {
        key: "title",
        header: "Tarefa",
        sortable: true,
        width: "24%",
        render: (row) => (
          <span className={cn("tcrm-task-table__title-cell", row.selected && "is-selected")}>
            <strong className="tcrm-task-table__title">{row.title}</strong>
          </span>
        ),
        sortValue: (row) => taskSortValue(row, "title")
      },
      { key: "owner", header: "Dono / fila", sortable: true, width: "9%", sortValue: (row) => taskSortValue(row, "owner") },
      {
        key: "deadline",
        header: "Prazo",
        sortable: true,
        width: "9%",
        render: (row) => <span className={cn("tcrm-task-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>,
        sortValue: (row) => taskSortValue(row, "deadline")
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        width: "12%",
        render: (row) => <Chip className={cn("tcrm-task-table__status", `is-${row.status}`)} showDot={false}>{taskStatusLabel[row.status]}</Chip>,
        sortValue: (row) => taskSortValue(row, "status")
      },
      { key: "origin", header: "Origem canônica", sortable: true, width: "12%", sortValue: (row) => taskSortValue(row, "origin") },
      {
        key: "priority",
        header: "Prior.",
        sortable: true,
        width: "9%",
        render: (row) => (
          <span className={cn("tcrm-task-table__priority", `is-${row.priority}`)}>
            <i aria-hidden="true" />
            {taskPriorityLabel[row.priority]}
          </span>
        ),
        sortValue: (row) => taskSortValue(row, "priority")
      },
      { key: "activity", header: "Última atividade", sortable: true, width: "17%", sortValue: (row) => taskSortValue(row, "activity") },
      {
        key: "mode",
        header: "Modo",
        sortable: true,
        width: "8%",
        render: (row) => <Chip className={cn("tcrm-task-table__mode", `is-${row.mode}`)} showDot={false}>{taskModeLabel[row.mode]}</Chip>,
        sortValue: (row) => taskSortValue(row, "mode")
      }
    ],
    []
  );

  return (
    <CrmWorklistPage
      activeNavId="tarefas"
      activeSidebarId="clipboard"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-tasks-shell"
      contentClassName="sb-image-coverage-tasks-content"
      drawer={drawer}
      drawerPlacement="floating"
      drawerSize="compact"
      navItems={tasksNavItems}
      pageHeaderRhythm="stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-tasks-stage"
      subtitle="Studio Vila Mariana · Quem precisa fazer o quê, até quando, e de onde veio essa tarefa?"
      title="Tarefas"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      filterBar={
        <PageFilterBar
          aria-label="Filtros de tarefas"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={onCreateTask} variant="primary">
              Criar tarefa
            </Button>
          }
          filterGroupLabel="Filtros rápidos"
          filters={filters}
          onFilterValueChange={onFilterValueChange}
          onSearchChange={onSearchChange}
          onSearchFilter={onAdvancedFilters}
          query={query}
          searchAriaLabel="Buscar tarefas"
          searchFilterLabel="Abrir filtros avançados"
          searchFilterPlacement="embedded"
          searchPlaceholder="Buscar tarefas..."
        />
      }
      filterBarLabel="Filtros de tarefas"
      listLabel="Filas"
      mainLabel="Tabela de tarefas"
      quickFilters={
        <PageQuickFilters
          aria-label="Filas"
          groupLabel="Filas de tarefas"
          heading="Filas"
          items={queueItems}
          onSelect={onQueueSelect}
          selectionTone="soft"
        />
      }
    >
      <CrmWorklistTable
        ariaLabel="Tabela de tarefas"
        blockedDescription="A lista de tarefas está indisponível."
        blockedTitle="Tabela bloqueada"
        className="tcrm-task-table"
        columns={taskColumns}
        emptyDescription="As tarefas da fila aparecem aqui."
        emptyTitle="Nenhuma tarefa"
        loadingTitle="Carregando tarefas"
        pagination={{
          itemsPerPage: "10",
          label: pageLabel,
          onItemsPerPageClick,
          onNextPage,
          onPreviousPage
        }}
        rows={rows}
        selectedRowId={selectedTaskId}
        onRowSelect={(row) => {
          if (!row.disabled) {
            onTaskSelect(row);
          }
        }}
      />
    </CrmWorklistPage>
  );
}

export function TasksShell({ drawer = true }: { drawer?: boolean }) {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedQueueId, setSelectedQueueId] = useState("my-tasks");
  const [selectedTaskId, setSelectedTaskId] = useState(drawer ? "replace-ana" : "");
  const [drawerOpen, setDrawerOpen] = useState(drawer);
  const [drawerState, setDrawerState] = useState<TaskDrawerState>("open");
  const [checklist, setChecklist] = useState<TaskDrawerChecklistItem[]>(taskDrawerChecklist);
  const [drawerOwner, setDrawerOwner] = useState("Recepção");
  const [drawerDeadline, setDrawerDeadline] = useState<React.ReactNode>("Hoje");
  const [drawerDeadlineTone, setDrawerDeadlineTone] = useState<"danger" | undefined>("danger");
  const [comments, setComments] = useState<TaskDrawerComment[]>([
    { id: "ana", author: "Ana Silva", avatarSrc: source23CommentAnaSilva, body: "Pedi reposição quinta 08h.", time: "Hoje, 09:08" },
    { id: "sam", author: "Sam Frank", avatarSrc: source23CommentSamFrank, body: "Recepção não encontrou vaga ainda.", time: "Hoje, 09:14" },
    { id: "joao", author: "João Silva", avatarSrc: source23CommentJoaoSilva, body: "Copiloto sugeriu opção quinta 08h.", time: "Hoje, 09:20" }
  ]);
  const [history, setHistory] = useState<TaskDrawerHistoryItem[]>([
    { id: "whatsapp", time: "09:10", body: "Ana pediu reposição pelo WhatsApp" },
    { id: "no-slot", time: "09:14", body: "sistema não encontrou vaga na turma atual" },
    { id: "assumed", time: "09:20", body: "recepção assumiu a pendência" }
  ]);
  const [drawerFeedback, setDrawerFeedback] = useState<React.ReactNode>(
    <>quinta 08h tem vaga e respeita<br />o prazo do crédito.</>
  );
  const [pageLabel, setPageLabel] = useState("1-8 de 8");
  const checkedCount = checklist.filter((item) => item.checked).length;

  const drawerFacts = useMemo<TaskDrawerFact[]>(
    () => [
      { id: "origin", icon: "calendar", label: "Origem canônica", value: "Agenda / Reposições" },
      { id: "owner", icon: "user", label: "Dono / fila", value: drawerOwner },
      { id: "deadline", icon: "calendar", label: "Prazo", value: drawerDeadline, tone: drawerDeadlineTone, showToneIcon: false },
      { id: "priority", icon: "clock", label: "Prioridade", value: <><span className="tcrm-task-drawer__priority-dot" aria-hidden="true" />Média</> },
      { id: "reason", icon: "clock", label: "Motivo", value: "Ana pediu reposição e precisa confirmar horário" }
    ],
    [drawerDeadline, drawerDeadlineTone, drawerOwner]
  );

  function prependHistory(id: string, body: React.ReactNode) {
    setHistory((current) => [{ id, time: "09:28", body }, ...current.slice(0, 2)]);
  }

  const drawerNode = drawerOpen ? (
    <TaskDrawer
      activityDensity="comfortable"
      className="sb-image-coverage-tasks-drawer"
      activityOrder="comments-history"
      checklist={checklist}
      checklistProgress={`${checkedCount} / ${checklist.length}`}
      comments={comments}
      copilotSuggestion={drawerFeedback}
      facts={drawerFacts}
      history={history}
      onAssume={() => {
        setDrawerOwner("Você");
        setDrawerFeedback("Tarefa assumida por você.");
        prependHistory("assume-local", "você assumiu a pendência");
      }}
      onChecklistToggle={(item, checked) => {
        setChecklist((current) =>
          current.map((checkItem) =>
            checkItem.id === item.id ? { ...checkItem, checked } : checkItem
          )
        );
      }}
      onClose={() => setDrawerOpen(false)}
      onComment={() => {
        setComments((current) => [
          { id: `local-${current.length}`, author: "Você", body: "Comentário registrado para acompanhamento.", time: "Agora" },
          ...current.slice(0, 2)
        ]);
        setDrawerFeedback("Comentário adicionado ao histórico da tarefa.");
      }}
      onComplete={() => {
        setDrawerState("completed");
        setDrawerFeedback("Tarefa concluída e pronta para acompanhamento.");
        prependHistory("complete-local", "tarefa concluída");
      }}
      onDelegate={() => {
        setDrawerOwner("Coordenação");
        setDrawerFeedback("Delegada para Coordenação.");
        prependHistory("delegate-local", "pendência delegada para Coordenação");
      }}
      onMore={() => setDrawerFeedback("Mais opções disponíveis para esta tarefa.")}
      onOpenConversation={() => setDrawerFeedback("Conversa aberta no contexto da tarefa.")}
      onOpenOrigin={() => setDrawerFeedback("Origem aberta: Agenda / Reposições.")}
      onReschedule={() => {
        setDrawerDeadline("Quinta, 08:00");
        setDrawerDeadlineTone(undefined);
        setDrawerFeedback("Reposição reagendada para quinta, 08:00.");
        prependHistory("reschedule-local", "reposicão reagendada para quinta, 08:00");
      }}
      size="compact"
      state={drawerState}
    />
  ) : null;

  return (
    <TasksPageContent
      drawer={drawerNode}
      query={query}
      filterValues={filterValues}
      selectedQueueId={selectedQueueId}
      selectedTaskId={selectedTaskId}
      pageLabel={pageLabel}
      onAdvancedFilters={() => {
        setFilterValues((current) => ({
          ...current,
          owner: ["recepcao"],
          priority: "alta",
          status: ["aberta"]
        }));
        setSelectedQueueId("today");
      }}
      onCreateTask={() => {
        setQuery("nova tarefa");
        setSelectedQueueId("my-tasks");
      }}
      onFilterValueChange={(filter, value) => setFilterValues((current) => ({ ...current, [filter.id]: value }))}
      onItemsPerPageClick={() => setPageLabel("1-8 de 8")}
      onNextPage={() => setPageLabel("8 de 8")}
      onPreviousPage={() => setPageLabel("1-8 de 8")}
      onQueueSelect={(item) => setSelectedQueueId(item.id)}
      onSearchChange={setQuery}
      onTaskSelect={(row) => {
        setSelectedTaskId(row.id);
        setDrawerOpen(true);
        setDrawerState("open");
      }}
    />
  );
}

export const Image23ListaDetalhe: Story = {
  name: "23 lista detalhe",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 23_round-4.1C_tarefas_01_lista-detalhe.png.png. Status: em revisão visual com componentes oficiais, não aprovada 1:1."
      }
    }
  },
  render: () => <TasksShell drawer />
};

export const Image23ListaSemDrawer: Story = {
  name: "23 lista sem drawer",
  parameters: {
    docs: {
      description: {
        story:
          "Variação de revisão da imagem 23 com o drawer fechado, para validar que a tabela ocupa todo o espaço horizontal disponível usando os mesmos componentes oficiais."
      }
    }
  },
  render: () => <TasksShell drawer={false} />
};
