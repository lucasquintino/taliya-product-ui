import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  CrmWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  ReplacementDrawer,
  ReplacementTable,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem,
  ReplacementDrawerAction,
  ReplacementTableRow
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source24AnaSilva from "../assets/source24-ana-silva.png";
import source24CarlaMenezes from "../assets/source24-carla-menezes.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";

const meta = {
  title: "CRM / Image Coverage / Reposições",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage da imagem 31 da página Reposições. A composição usa CrmWorklistPage, PageFilterBar, PageQuickFilters, ReplacementTable e ReplacementDrawer oficiais; status em revisão visual, não aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const replacementsNavItems: CrmShellNavItem[] = [
  { id: "agenda", label: "Agenda" },
  { id: "turmas", label: "Turmas" },
  { id: "reposicoes", label: "Reposições", active: true },
  { id: "historico", label: "Histórico" }
];

const replacementRows: ReplacementTableRow[] = [
  {
    id: "ana-carolina",
    student: { name: "Ana Carolina Souza", avatarSrc: source24AnaSilva },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "12/06",
    preference: "Manhã ou quinta",
    status: "found",
    nextAction: "Enviar convite",
    mode: "copilot",
    selected: true
  },
  {
    id: "felipe-andrade",
    student: { name: "Felipe Andrade", initials: "FA" },
    originalClass: <>Quinta 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "20/05",
    preference: "Manhã",
    status: "waiting",
    nextAction: "Cobrar retorno",
    mode: "manual"
  },
  {
    id: "gabriela-martins",
    student: { name: "Gabriela Martins", initials: "GM" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "No-show",
    validity: "18/05",
    preference: "Noite",
    status: "blocked",
    nextAction: "Revisar política",
    mode: "blocked"
  },
  {
    id: "beatriz-lima",
    student: { name: "Beatriz Lima", initials: "BL" },
    originalClass: <>Quarta 08h<br />Pilates Solo</>,
    reason: <>Crédito vence<br />amanhã</>,
    validity: "14/05",
    preference: "Cedo",
    status: "expiring",
    nextAction: "Buscar horário",
    mode: "manual"
  },
  {
    id: "juliana-costa",
    student: { name: "Juliana Costa", avatarSrc: source24CarlaMenezes },
    originalClass: <>Segunda 19h<br />Tower</>,
    reason: <>Reposição<br />aprovada</>,
    validity: "16/05",
    preference: "Quinta 08h",
    status: "scheduled",
    nextAction: <>Confirmar<br />presença</>,
    mode: "autonomous"
  },
  {
    id: "marina-lopes",
    student: { name: "Marina Lopes", avatarSrc: source24MarinaLopes },
    originalClass: <>Sexta 10h<br />Pilates Solo</>,
    reason: <>Encaixe<br />solicitado</>,
    validity: "24/05",
    preference: "Tarde",
    status: "pending",
    nextAction: "Avaliar opções",
    mode: "copilot"
  },
  {
    id: "lucas-peres",
    student: { name: "Lucas Peres", initials: "LP" },
    originalClass: <>Terça 07h<br />Reformer Inter.</>,
    reason: <>Pedido da<br />recepção</>,
    validity: "30/05",
    preference: "Sem preferência",
    status: "pending",
    nextAction: "Verificar vaga",
    mode: "manual"
  },
  {
    id: "camila-rocha",
    student: { name: "Camila Rocha", initials: "CR" },
    originalClass: <>Quarta 14h<br />Pilates Solo</>,
    reason: "Falta avisada",
    validity: "28/05",
    preference: "Quinta ou sexta",
    status: "available",
    nextAction: <>Confirmar<br />horário</>,
    mode: "autonomous"
  }
];

function ReplacementsPageContent({
  selectedQueueId,
  selectedReplacementId,
  filterValues,
  query,
  pageLabel,
  onQueueSelect,
  onReplacementSelect,
  onFilterValueChange,
  onSearchChange,
  onCreateRequest,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  drawer
}: {
  selectedQueueId: string;
  selectedReplacementId: string;
  filterValues: Record<string, string | string[]>;
  query: string;
  pageLabel: string;
  onQueueSelect: (item: PageQuickFilterItem) => void;
  onReplacementSelect: (row: ReplacementTableRow) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
  onSearchChange: (value: string) => void;
  onCreateRequest: () => void;
  onItemsPerPageClick: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  drawer?: React.ReactNode;
}) {
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      {
        id: "status",
        label: "Status",
        kind: "single",
        value: typeof filterValues.status === "string" ? filterValues.status : "",
        options: [
          { value: "pendente", label: "Pendente", icon: "clock" },
          { value: "com-opcao", label: "Com opção", icon: "checkCircle" },
          { value: "bloqueada", label: "Bloqueada", icon: "lock" }
        ]
      },
      {
        id: "validity",
        label: "Validade",
        kind: "single",
        value: typeof filterValues.validity === "string" ? filterValues.validity : "",
        options: [
          { value: "semana", label: "Esta semana", icon: "calendar" },
          { value: "vencendo", label: "Vencendo", icon: "alert" },
          { value: "futuro", label: "Futuro", icon: "calendar" }
        ]
      },
      {
        id: "class",
        label: "Turma/horário",
        kind: "single",
        value: typeof filterValues.class === "string" ? filterValues.class : "",
        options: [
          { value: "reformer", label: "Reformer", icon: "graduation" },
          { value: "pilates", label: "Pilates Solo", icon: "graduation" },
          { value: "tower", label: "Tower", icon: "graduation" }
        ]
      },
      {
        id: "origin",
        label: "Origem",
        kind: "single",
        value: typeof filterValues.origin === "string" ? filterValues.origin : "",
        options: [
          { value: "falta", label: "Falta avisada", icon: "calendar" },
          { value: "recepcao", label: "Recepção", icon: "user" },
          { value: "credito", label: "Crédito", icon: "tag" }
        ]
      },
      {
        id: "owner",
        label: "Responsável",
        kind: "single",
        value: typeof filterValues.owner === "string" ? filterValues.owner : "",
        options: [
          { value: "recepcao", label: "Recepção", icon: "user" },
          { value: "agenda", label: "Agenda", icon: "calendar" },
          { value: "coordenacao", label: "Coordenação", icon: "users" }
        ]
      }
    ],
    [filterValues]
  );
  const queueItems = useMemo<PageQuickFilterItem[]>(
    () => [
      { id: "pending", label: "Pendentes", count: "6", icon: "clock", selected: selectedQueueId === "pending" },
      { id: "week", label: "Vencem esta semana", count: "3", icon: "clock", selected: selectedQueueId === "week", tone: "warning" },
      { id: "available", label: "Com opção", count: "4", icon: "checkCircle", selected: selectedQueueId === "available" },
      { id: "waiting", label: "Aguardando resposta", count: "2", icon: "clock", selected: selectedQueueId === "waiting" },
      { id: "blocked", label: "Bloqueadas", count: "1", icon: "lock", selected: selectedQueueId === "blocked", tone: "danger" },
      { id: "scheduled", label: "Agendadas", count: "2", icon: "calendar", selected: selectedQueueId === "scheduled" }
    ],
    [selectedQueueId]
  );
  const rows = useMemo<ReplacementTableRow[]>(
    () => replacementRows.map((row) => ({ ...row, selected: row.id === selectedReplacementId })),
    [selectedReplacementId]
  );

  return (
    <CrmWorklistPage
      activeNavId="reposicoes"
      activeSidebarId="calendar"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-replacements-shell"
      contentClassName="sb-image-coverage-replacements-content"
      contentLayout="main-priority"
      drawer={drawer}
      drawerPlacement="floating"
      drawerSize="default"
      navItems={replacementsNavItems}
      pageHeaderRhythm="compact-stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-replacements-stage"
      subtitle="Studio Vila Mariana · Reposição de aulas e encaixes"
      title="Reposições"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      filterBar={
        <PageFilterBar
          aria-label="Filtros de reposições"
          density="tight"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={onCreateRequest} variant="primary">
              Novo pedido
            </Button>
          }
          filters={filters}
          onFilterValueChange={onFilterValueChange}
          onSearchChange={onSearchChange}
          query={query}
          searchAriaLabel="Buscar aluno ou reposição"
          searchPlaceholder="Buscar aluno ou reposição..."
        />
      }
      filterBarLabel="Filtros de reposições"
      listLabel="Fila de reposições"
      mainLabel="Tabela de reposições"
      worklistLayoutMode="main-priority"
      quickFilters={
        <PageQuickFilters
          aria-label="Fila de reposições"
          groupLabel="Fila de reposições"
          heading="Fila de reposições"
          items={queueItems}
          onSelect={onQueueSelect}
          selectionTone="soft"
        />
      }
    >
      <ReplacementTable
        pageLabel={pageLabel}
        rows={rows}
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onReplacementSelect}
      />
    </CrmWorklistPage>
  );
}

export function ReplacementsShell() {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedQueueId, setSelectedQueueId] = useState("pending");
  const [selectedReplacementId, setSelectedReplacementId] = useState("ana-carolina");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [pageLabel, setPageLabel] = useState("1-8 de 8");
  const [drawerState, setDrawerState] = useState("requested" as "requested" | "scheduled" | "blocked");

  function handleDrawerAction(action: ReplacementDrawerAction) {
    if (action === "reserve-slot") setDrawerState("scheduled");
    if (action === "create-task") setQuery("tarefa criada");
    if (action === "cancel") setDrawerState("blocked");
  }

  const drawerNode = drawerOpen ? (
    <ReplacementDrawer
      className="sb-image-coverage-replacements-drawer"
      state={drawerState}
      onAction={handleDrawerAction}
      onClose={() => setDrawerOpen(false)}
      onOptionSelect={(option) => setQuery(`opção:${option.id}`)}
    />
  ) : null;

  return (
    <ReplacementsPageContent
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedQueueId={selectedQueueId}
      selectedReplacementId={selectedReplacementId}
      onCreateRequest={() => setQuery("novo pedido")}
      onFilterValueChange={(filter, value) => setFilterValues((current) => ({ ...current, [filter.id]: value }))}
      onItemsPerPageClick={() => setPageLabel("1-8 de 8")}
      onNextPage={() => setPageLabel("1-8 de 8")}
      onPreviousPage={() => setPageLabel("1-8 de 8")}
      onQueueSelect={(item) => setSelectedQueueId(item.id)}
      onReplacementSelect={(row) => {
        setSelectedReplacementId(row.id);
        setDrawerOpen(true);
        setDrawerState(row.status === "scheduled" ? "scheduled" : row.status === "blocked" ? "blocked" : "requested");
      }}
      onSearchChange={setQuery}
    />
  );
}

export const Image31FluxoEncaixe: Story = {
  name: "31 fluxo encaixe",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png. Status: coverage de página com ReplacementTable e ReplacementDrawer oficiais; ainda não aprovada 1:1."
      }
    }
  },
  render: () => <ReplacementsShell />
};
