import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  PageFilterBar,
  PageQuickFilters,
  TaskTable,
  WorkListDetailPage
} from "@taliya/crm";
import type { PageFilterBarFilter, PageQuickFilterItem, TaskTableRow, WorkListDetailPageLayoutMode, WorkListDetailPageState } from "@taliya/crm";
import { Button, Panel } from "@taliya/ui";

const meta = {
  title: "CRM / Layout / WorkListDetailPage",
  parameters: {
    docs: {
      description: {
        component:
          "Template reutilizavel para paginas CRM de trabalho em lista: barra de filtros, filtros rapidos, lista/tabela principal e detalhe opcional."
      }
    },
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const filters: PageFilterBarFilter[] = [
  {
    id: "owner",
    kind: "multi",
    label: "Dono",
    values: ["recepcao"],
    options: [
      { value: "recepcao", label: "Recepcao", icon: "user" },
      { value: "financeiro", label: "Financeiro", icon: "coins" }
    ]
  },
  {
    id: "deadline",
    kind: "single",
    label: "Prazo",
    value: "hoje",
    options: [
      { value: "hoje", label: "Hoje", icon: "calendar" },
      { value: "atrasada", label: "Atrasada", icon: "clock" }
    ]
  }
];

const quickFilters: PageQuickFilterItem[] = [
  { id: "mine", icon: "user", label: "Minhas tarefas", count: "12", selected: true },
  { id: "today", icon: "calendar", label: "Hoje", count: "6" },
  { id: "late", icon: "clock", label: "Atrasadas", count: "3", tone: "danger" }
];

const rows: TaskTableRow[] = [
  {
    id: "replace-ana",
    activity: "Ana pediu reposicao por WhatsApp",
    deadline: "Hoje",
    deadlineTone: "danger",
    mode: "copilot",
    origin: "Agenda / Reposicoes",
    owner: "Recepcao",
    priority: "medium",
    selected: true,
    status: "open",
    title: "Confirmar reposicao da Ana"
  },
  {
    id: "receipt-marina",
    activity: "Comprovante enviado as 10:12",
    deadline: "Hoje",
    deadlineTone: "danger",
    mode: "manual",
    origin: "Financeiro",
    owner: "Financeiro",
    priority: "high",
    status: "progress",
    title: "Validar comprovante da Marina"
  }
];

function WorkListExample({
  state = "source",
  detail = false,
  layoutMode = "standard"
}: {
  state?: WorkListDetailPageState;
  detail?: boolean;
  layoutMode?: WorkListDetailPageLayoutMode;
}) {
  const filterBarState = state === "empty" ? "source" : state;

  return (
    <WorkListDetailPage
      detail={detail ? <Panel>Detalhe selecionado</Panel> : undefined}
      detailLabel="Detalhe da tarefa"
      detailState={detail ? "selected" : "closed"}
      filterBar={
        <PageFilterBar
          aria-label="Filtros da página"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" variant="primary">
              Criar tarefa
            </Button>
          }
          filters={filters}
          query=""
          searchPlaceholder="Buscar tarefas..."
          state={filterBarState}
        />
      }
      filterBarLabel="Área de filtros da página"
      listLabel="Filtros rápidos"
      layoutMode={layoutMode}
      mainLabel="Tabela de tarefas"
      pageLabel="Página de trabalho"
      quickFilters={<PageQuickFilters aria-label="Filtros rápidos" heading="Filas" items={quickFilters} state={state} />}
      state={state}
    >
      <TaskTable pageLabel="1-2 de 2" rows={rows} state={state} />
    </WorkListDetailPage>
  );
}

export const Source: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story">
      <WorkListExample />
    </div>
  )
};

export const WithInlineDetail: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story">
      <WorkListExample detail />
    </div>
  )
};

export const MainPriority: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story">
      <WorkListExample layoutMode="main-priority" />
    </div>
  )
};

export const WideMain: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story">
      <WorkListExample layoutMode="wide-main" />
    </div>
  )
};

export const WideRail: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story">
      <WorkListExample layoutMode="wide-rail" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-work-list-detail-page-story sb-crm-work-list-detail-page-story--states">
      {(["source", "loading", "empty", "blocked"] satisfies WorkListDetailPageState[]).map((state) => (
        <section key={state} aria-label={`Estado ${state}`} className="sb-crm-work-list-detail-page-story__state">
          <h2>{state}</h2>
          <WorkListExample state={state} />
        </section>
      ))}
    </div>
  )
};
