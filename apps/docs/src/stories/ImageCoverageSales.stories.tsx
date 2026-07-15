import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import {
  CrmKanbanPage,
  CrmWorklistTable,
  CrmWorklistPage,
  KanbanColumn,
  LeadDrawer,
  PageFilterBar,
  PageQuickFilters,
  PipelineCard,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CrmShellNavItem, CrmWorklistTableColumn, LeadDrawerChecklistItem, LeadDrawerFact, LeadDrawerHistoryItem, PageFilterBarFilter, PageQuickFilterItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, PersonLabel } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Vendas",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Vendas. As paginas usam o padrao estrutural Worklist / Table + quick filters + drawer com componentes oficiais da biblioteca."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const salesNavItems: CrmShellNavItem[] = [
  { id: "pipeline", label: "Pipeline" },
  { id: "lista", label: "Lista" },
  { id: "experimental", label: "Experimental" },
  { id: "matriculas", label: "Matrículas" },
  { id: "historico", label: "Histórico" }
];

export function SalesPipelinePage() {
  return (
    <CrmKanbanPage
      activeNavId="pipeline"
      activeSidebarId="vendas"
      avatarSrc={image79Avatar}
      filterBar={<SalesPipelineFilters />}
      layoutVariant="commercial"
      navItems={salesNavItems}
      pageHeaderRhythm="overview"
      pageHeaderActions={<ButtonGroup><Button leadingIcon="plus" size="sm" variant="secondary">Novo interessado</Button><Button leadingIcon="upload" size="sm" variant="secondary">Exportar</Button><Button leadingIcon="calendar" size="sm" variant="secondary">Criar tarefa</Button></ButtonGroup>}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana · Interessados e próximos passos"
      title="Vendas"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <SalesPipelineBoard />
    </CrmKanbanPage>
  );
}

export function SalesInterestedListPage() {
  const [selectedLeadId, setSelectedLeadId] = useState("ana");
  const [, setDrawerAction] = useState("");
  return (
    <CrmWorklistPage
      activeNavId="lista"
      activeSidebarId="vendas"
      avatarSrc={image79Avatar}
      drawer={<LeadDrawer compact onAction={setDrawerAction} />}
      filterBar={<SalesInterestedFilters />}
      filterBarLabel="Filtros de interessados"
      listLabel="Filtros rapidos"
      mainLabel="Lista de interessados"
      navItems={salesNavItems}
      pageHeaderRhythm="compact-stacked"
      quickFilters={<SalesLeadQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana · Lista de interessados"
      title="Vendas"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      contentLayout="work-list-compact"
      worklistLayoutMode="compact-rail"
      worklistFilterRhythm="spacious"
    >
      <SalesLeadTable onRowSelect={(row) => setSelectedLeadId(row.id)} selectedRowId={selectedLeadId} />
    </CrmWorklistPage>
  );
}

export function SalesExperimentalListPage() {
  const [selectedExperimentalId, setSelectedExperimentalId] = useState("ana");
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="experimental"
      activeSidebarId="vendas"
      avatarSrc={image79Avatar}
      drawer={<ExperimentalDrawer onAction={setDrawerAction} />}
      filterBar={<ExperimentalFilters />}
      filterBarLabel="Filtros de experimental"
      listLabel="Filtros rapidos"
      mainLabel="Lista de aulas experimentais"
      navItems={salesNavItems}
      pageHeaderRhythm="compact-stacked"
      quickFilters={<ExperimentalQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana - Aulas experimentais e proximos passos"
      title="Experimental"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      contentLayout="work-list-compact"
      worklistLayoutMode="compact-rail"
      worklistFilterRhythm="spacious"
    >
      <ExperimentalTable onRowSelect={(row) => setSelectedExperimentalId(row.id)} selectedRowId={selectedExperimentalId} />
    </CrmWorklistPage>
  );
}

export function SalesEnrollmentChecklistPage() {
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("ana");
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="matriculas"
      activeSidebarId="vendas"
      avatarSrc={image79Avatar}
      drawer={<EnrollmentDrawer onAction={setDrawerAction} />}
      filterBar={<EnrollmentFilters />}
      filterBarLabel="Filtros de matriculas"
      listLabel="Filtros rapidos"
      mainLabel="Lista de matriculas"
      navItems={salesNavItems}
      pageHeaderRhythm="compact-stacked"
      quickFilters={<EnrollmentQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana - Conversao de interessados em alunos"
      title="Matriculas"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      contentLayout="work-list-compact"
      worklistLayoutMode="compact-rail"
      worklistFilterRhythm="spacious"
    >
      <EnrollmentTable onRowSelect={(row) => setSelectedEnrollmentId(row.id)} selectedRowId={selectedEnrollmentId} />
    </CrmWorklistPage>
  );
}

function SalesPipelineFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "all", kind: "quick", label: "Todos", selected: true },
    { id: "mine", kind: "quick", label: "Meus interessados" },
    { id: "no-response", kind: "quick", label: "Sem resposta" },
    { id: "no-slot", kind: "quick", label: "Sem vaga" },
    { id: "trial-today", kind: "quick", label: "Experimental hoje" },
    { id: "ready", kind: "quick", label: "Prontos para matricula" },
    { id: "lost", kind: "quick", label: "Perdidos" },
    {
      id: "owner",
      label: "Dono",
      value: String(values.owner ?? ""),
      options: [
        { value: "reception", label: "Recepcao" },
        { value: "support", label: "Atendimento" },
        { value: "manager", label: "Gestora" }
      ]
    },
    {
      id: "origin",
      label: "Origem",
      value: String(values.origin ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "instagram", label: "Instagram" },
        { value: "site", label: "Site" },
        { value: "desk", label: "Balcao" }
      ]
    },
    {
      id: "status",
      label: "Status",
      value: String(values.status ?? ""),
      options: [
        { value: "manual", label: "Manual" },
        { value: "suggested", label: "Copiloto sugeriu" },
        { value: "hot", label: "Quente" },
        { value: "lost", label: "Perdido" }
      ]
    },
    {
      id: "next",
      label: "Proxima acao",
      value: String(values.next ?? ""),
      options: [
        { value: "reply", label: "Responder preco" },
        { value: "offer", label: "Oferecer horarios" },
        { value: "confirm", label: "Confirmar experimental" },
        { value: "enroll", label: "Iniciar matricula" }
      ]
    },
    {
      id: "channel",
      label: "Canal",
      placement: "advanced",
      value: String(values.channel ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "instagram", label: "Instagram" },
        { value: "site", label: "Site" }
      ]
    },
    {
      id: "interest",
      label: "Interesse",
      placement: "advanced",
      value: String(values.interest ?? ""),
      options: [
        { value: "pilates", label: "Pilates" },
        { value: "experimental", label: "Experimental" },
        { value: "plans", label: "Planos" }
      ]
    }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      searchVisible={false}
    />
  );
}

function SalesPipelineBoard() {
  const [selectedCard, setSelectedCard] = useState("");
  const columns = [
    { title: "Novo", count: 12, cards: [
      { title: "Ana Souza", source: "WhatsApp", sourceIcon: "whatsapp" as const, interest: "começar Pilates", nextAction: "responder preço hoje", meta: "Recepção", state: "lead", statusLabel: "copiloto sugeriu" },
      { title: "Mariana Oliveira", source: "Instagram", sourceIcon: "camera" as const, interest: "quer informações", nextAction: "enviar valores", meta: "Atendimento", state: "lead", statusLabel: "manual" },
      { title: "Lucas Ferreira", source: "Site", sourceIcon: "externalLink" as const, interest: "musculação", nextAction: "apresentar planos", meta: "Recepção", state: "lead", statusLabel: "manual" }
    ] },
    { title: "Conversando", count: 9, cards: [
      { title: "Marina Lopes", source: "Instagram", sourceIcon: "camera" as const, interest: "quer experimental", nextAction: "oferecer horários", meta: "Atendimento", state: "lead", statusLabel: "manual" },
      { title: "Gustavo Almeida", source: "WhatsApp", sourceIcon: "whatsapp" as const, interest: "treinar à tarde", nextAction: "confirmar horário", meta: "Recepção", state: "lead", statusLabel: "copiloto sugeriu" },
      { title: "Beatriz Lima", source: "Facebook", sourceIcon: "message" as const, interest: "personal trainer", nextAction: "tirar dúvidas", meta: "Atendimento", state: "lead", statusLabel: "manual" }
    ] },
    { title: "Experimental", count: 8, cards: [
      { title: "Julia Ramos", source: "Indicação", sourceIcon: "users" as const, interest: "dor lombar", nextAction: "confirmar experimental", meta: "Recepção", state: "trial", statusLabel: "experimental hoje" },
      { title: "Rafael Martins", source: "WhatsApp", sourceIcon: "whatsapp" as const, interest: "emagrecimento", nextAction: "lembrar do horário", meta: "Atendimento", state: "trial", statusLabel: "experimental hoje" },
      { title: "Patricia Silva", source: "Instagram", sourceIcon: "camera" as const, interest: "Pilates solo", nextAction: "confirmar presença", meta: "Recepção", state: "trial", statusLabel: "experimental hoje" }
    ] },
    { title: "Pós-aula", count: 7, state: "waiting" as const, cards: [
      { title: "Felipe Andrade", source: "Balcão", sourceIcon: "home" as const, interest: "fortalecimento", nextAction: "iniciar matrícula", meta: "Gestora", state: "hot", statusLabel: "quente" },
      { title: "Camila Rocha", source: "WhatsApp", sourceIcon: "whatsapp" as const, interest: "melhorar postura", nextAction: "enviar proposta", meta: "Atendimento", state: "hot", statusLabel: "quente" },
      { title: "Henrique Costa", source: "Instagram", sourceIcon: "camera" as const, interest: "performance", nextAction: "agendar retorno", meta: "Atendimento", state: "hot", statusLabel: "quente" }
    ] },
    { title: "Matrícula", count: 6, state: "resolved" as const, cards: [
      { title: "Carla Menezes", source: "Instagram", sourceIcon: "camera" as const, interest: "preço", nextAction: "última tentativa", meta: "Atendimento", state: "enrollment", statusLabel: "sem resposta" },
      { title: "Pedro Santos", source: "Site", sourceIcon: "externalLink" as const, interest: "turma manhã", nextAction: "retornar quando abrir vaga", meta: "Recepção", state: "enrollment", statusLabel: "sem vaga" },
      { title: "Thiago Oliveira", source: "Balcão", sourceIcon: "home" as const, interest: "musculação", nextAction: "coletar documentos", meta: "Gestora", state: "enrollment", statusLabel: "pronto para matrícula" }
    ] },
    { title: "Perdidos", count: 4, state: "blocked" as const, cards: [
      { title: "Isabela Prado", source: "Site", sourceIcon: "externalLink" as const, interest: "sem retorno", nextAction: "marcar perdido", meta: "Atendimento", state: "lost", statusLabel: "perdido" },
      { title: "André Lima", source: "Instagram", sourceIcon: "camera" as const, interest: "preço", nextAction: "encerrar contato", meta: "Recepção", state: "lost", statusLabel: "desistiu" },
      { title: "Sofia Mendes", source: "WhatsApp", sourceIcon: "whatsapp" as const, interest: "Pilates", nextAction: "arquivar", meta: "Atendimento", state: "lost", statusLabel: "perdido" }
    ] }
  ];

  return (
    <>
      {columns.map((column) => (
        <KanbanColumn count={column.count} key={column.title} onMenu={() => setSelectedCard(`menu:${column.title}`)} state={column.state} title={column.title}>
          {column.cards.map((card) => {
            const cardId = `${column.title}:${card.title}`;
            return <PipelineCard key={cardId} {...card} onMenu={() => setSelectedCard(`menu:${cardId}`)} onSelect={() => setSelectedCard(cardId)} selected={selectedCard === cardId} />;
          })}
          <Button leadingIcon="plus" onClick={() => setSelectedCard(`add:${column.title}`)} size="sm" variant="secondary">Adicionar interessado</Button>
        </KanbanColumn>
      ))}
    </>
  );
}

function SalesInterestedFilters() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "no-response", kind: "quick", label: "Sem resposta" },
    {
      id: "stage",
      label: "Etapa",
      value: String(values.stage ?? ""),
      options: [
        { value: "qualified", label: "Qualificada" },
        { value: "trial", label: "Experimental" },
        { value: "enrollment", label: "Pre-matricula" }
      ]
    },
    {
      id: "owner",
      label: "Dono",
      value: String(values.owner ?? ""),
      options: [
        { value: "reception", label: "Recepcao" },
        { value: "manager", label: "Gestora" },
        { value: "support", label: "Atendimento" }
      ]
    },
    {
      id: "origin",
      label: "Origem",
      value: String(values.origin ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "instagram", label: "Instagram" },
        { value: "landing", label: "Landing" }
      ]
    },
    {
      id: "next",
      label: "Proxima acao",
      value: String(values.next ?? ""),
      options: [
        { value: "reply", label: "Responder preco" },
        { value: "trial", label: "Agendar experimental" },
        { value: "enroll", label: "Iniciar matricula" }
      ]
    },
    {
      id: "status",
      label: "Status",
      value: String(values.status ?? ""),
      options: [
        { value: "open", label: "Aberta" },
        { value: "manual", label: "Manual" },
        { value: "lost", label: "Perdido" }
      ]
    },
    {
      id: "channel",
      label: "Canal",
      placement: "advanced",
      value: String(values.channel ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "instagram", label: "Instagram" },
        { value: "phone", label: "Telefone" }
      ]
    },
    {
      id: "interest",
      label: "Interesse",
      placement: "advanced",
      value: String(values.interest ?? ""),
      options: [
        { value: "pilates", label: "Pilates" },
        { value: "personal", label: "Personal trainer" },
        { value: "functional", label: "Funcional" }
      ]
    }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTriggerVariant="button"
      advancedFiltersTitle="Filtros de interessados"
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Novo interessado</Button>
          <Button leadingIcon="upload" size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      onSearchFilter={() => undefined}
      query={query}
      searchFilterLabel="Abrir filtros de interessados"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por nome, telefone ou conversa"
    />
  );
}

function SalesLeadQuickRail() {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todos", icon: "users", count: "128", selected: selectedId === "all" },
    { id: "mine", label: "Meus interessados", icon: "user", count: "34", selected: selectedId === "mine" },
    { id: "no-response", label: "Sem resposta", icon: "message", count: "22", selected: selectedId === "no-response" },
    { id: "no-slot", label: "Sem vaga", icon: "x", count: "18", selected: selectedId === "no-slot" },
    { id: "trial", label: "Experimental hoje", icon: "calendar", count: "11", selected: selectedId === "trial" },
    { id: "ready", label: "Prontos para matricula", icon: "clipboardCheck", count: "9", selected: selectedId === "ready" },
    { id: "lost", label: "Perdidos", icon: "x", count: "14", selected: selectedId === "lost" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filtros rapidos"
      groupLabel="Filas de vendas"
      heading="Filtros rapidos"
      items={items}
      onSelect={(item) => setSelectedId(item.id)}
      selectionTone="soft"
    />
  );
}

type SalesLeadRow = {
  id: string;
  lead: string;
  stage: string;
  stageTone: ComponentTone;
  nextAction: string;
  desiredTime: string;
  owner: string;
  lastActivity: string;
  status: string;
  statusTone: ComponentTone;
};

const salesLeadRows: SalesLeadRow[] = [
  { id: "ana", lead: "Ana Souza", stage: "Qualificada", stageTone: "info", nextAction: "responder preco hoje", desiredTime: "terca a noite", owner: "Recepcao", lastActivity: "hoje 10:24", status: "aberta", statusTone: "info" },
  { id: "marina", lead: "Marina Lopes", stage: "Novo", stageTone: "info", nextAction: "oferecer horarios", desiredTime: "manha", owner: "Atendimento", lastActivity: "hoje 09:50", status: "manual", statusTone: "info" },
  { id: "julia", lead: "Julia Ramos", stage: "Experimental marcada", stageTone: "info", nextAction: "confirmar presenca", desiredTime: "quinta 08h", owner: "Recepcao", lastActivity: "amanha", status: "experimental hoje", statusTone: "info" },
  { id: "felipe", lead: "Felipe Andrade", stage: "Pos-aula", stageTone: "warning", nextAction: "iniciar matricula", desiredTime: "noite", owner: "Gestora", lastActivity: "ontem", status: "quente", statusTone: "danger" },
  { id: "pedro", lead: "Pedro Santos", stage: "Sem vaga", stageTone: "neutral", nextAction: "retornar quando abrir vaga", desiredTime: "manha", owner: "Recepcao", lastActivity: "ontem", status: "sem vaga", statusTone: "neutral" },
  { id: "carla", lead: "Carla Menezes", stage: "Sem resposta", stageTone: "warning", nextAction: "ultima tentativa", desiredTime: "tarde", owner: "Atendimento", lastActivity: "2 dias", status: "aguardando humano", statusTone: "warning" },
  { id: "gabriela", lead: "Gabriela Martins", stage: "Pre-matricula", stageTone: "success", nextAction: "validar dados", desiredTime: "terca 17h", owner: "Gestora", lastActivity: "hoje", status: "pronto", statusTone: "success" },
  { id: "lucas", lead: "Lucas Ferreira", stage: "Perdido", stageTone: "danger", nextAction: "sem acao", desiredTime: "noite", owner: "Recepcao", lastActivity: "semana passada", status: "perdido", statusTone: "danger" }
];

const salesLeadColumns: Array<CrmWorklistTableColumn<SalesLeadRow>> = [
  { key: "lead", header: "Interessado", sortable: true, width: "16%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.lead} size="xs" /> },
  { key: "stage", header: "Etapa", sortable: true, width: "17%", render: (row) => <Chip showDot={false} tone={row.stageTone}>{row.stage}</Chip> },
  { key: "nextAction", header: "Proxima acao", sortable: true, width: "14%" },
  { key: "desiredTime", header: "Horario desejado", sortable: true, width: "11%" },
  { key: "owner", header: "Dono / fila", sortable: true, width: "9%" },
  { key: "lastActivity", header: "Ultima conversa", sortable: true, width: "10%" },
  { key: "status", header: "Status", sortable: true, width: "16%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> }
];

function SalesLeadTable({ onRowSelect, selectedRowId }: { onRowSelect: (row: SalesLeadRow) => void; selectedRowId: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de interessados"
      columns={salesLeadColumns}
      pagination={{ itemsPerPage: "10", label: "1-8 de 128", page: 1, pageCount: 13 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="more" label="Mais acoes do interessado" size="sm" variant="ghost" />}
      rows={salesLeadRows}
      selectedRowId={selectedRowId}
    />
  );
}

function ExperimentalFilters() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "tomorrow", kind: "quick", label: "Amanha" },
    { id: "week", kind: "quick", label: "Esta semana" },
    {
      id: "status",
      label: "Status",
      value: String(values.status ?? ""),
      options: [
        { value: "confirm", label: "Confirmar presenca" },
        { value: "attended", label: "Compareceu" },
        { value: "missed", label: "Faltou" }
      ]
    },
    {
      id: "owner",
      label: "Dono",
      value: String(values.owner ?? ""),
      options: [
        { value: "reception", label: "Recepcao" },
        { value: "manager", label: "Gestora" },
        { value: "support", label: "Atendimento" }
      ]
    },
    {
      id: "origin",
      label: "Origem",
      value: String(values.origin ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "indicacao", label: "Indicacao" },
        { value: "site", label: "Site" }
      ]
    },
    {
      id: "time",
      label: "Horario",
      value: String(values.time ?? ""),
      options: [
        { value: "morning", label: "Manha" },
        { value: "afternoon", label: "Tarde" },
        { value: "night", label: "Noite" }
      ]
    },
    {
      id: "lessonType",
      label: "Tipo de aula",
      placement: "advanced",
      value: String(values.lessonType ?? ""),
      options: [
        { value: "reformer", label: "Reformer" },
        { value: "solo", label: "Pilates Solo" },
        { value: "tower", label: "Tower" }
      ]
    }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTriggerVariant="button"
      advancedFiltersTitle="Filtros de experimental"
      density="comfortable"
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Agendar experimental</Button>
          <Button leadingIcon="upload" size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      onSearchFilter={() => undefined}
      query={query}
      searchFilterLabel="Abrir filtros de experimental"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por interessado, telefone ou aula"
    />
  );
}

function ExperimentalQuickRail() {
  const [selectedId, setSelectedId] = useState("today");
  const items: PageQuickFilterItem[] = [
    { id: "today", label: "Hoje", icon: "calendar", count: "18", selected: selectedId === "today" },
    { id: "confirm", label: "Confirmar presenca", icon: "user", count: "6", selected: selectedId === "confirm" },
    { id: "no-response", label: "Sem resposta", icon: "message", count: "5", selected: selectedId === "no-response" },
    { id: "missed", label: "Faltaram", icon: "alert", count: "4", tone: "danger", selected: selectedId === "missed" },
    { id: "reschedule", label: "Remarcar", icon: "refresh", count: "3", selected: selectedId === "reschedule" },
    { id: "after-class", label: "Pos-aula", icon: "star", count: "7", selected: selectedId === "after-class" },
    { id: "ready", label: "Prontos para matricula", icon: "clipboardCheck", count: "8", selected: selectedId === "ready" },
    { id: "lost", label: "Perdidos", icon: "x", count: "12", selected: selectedId === "lost" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filtros rapidos"
      groupLabel="Filas de experimental"
      heading="Filtros rapidos"
      items={items}
      onSelect={(item) => setSelectedId(item.id)}
      selectionTone="soft"
    />
  );
}

type ExperimentalRow = {
  id: string;
  interested: string;
  lesson: string;
  time: string;
  status: string;
  statusTone: ComponentTone;
  origin: ReactNode;
  owner: string;
  last: string;
  next: string;
  nextTone: ComponentTone;
};

const experimentalRows: ExperimentalRow[] = [
  { id: "ana", interested: "Ana Souza", lesson: "Reformer Intermediario", time: "hoje 17h", status: "Confirmar presenca", statusTone: "warning", origin: <><Icon name="whatsapp" tone="success" /> WhatsApp</>, owner: "Recepcao", last: "ontem 18:40", next: "enviar confirmacao", nextTone: "info" },
  { id: "julia", interested: "Julia Ramos", lesson: "Pilates Solo", time: "hoje 08h", status: "Compareceu", statusTone: "success", origin: <><Icon name="users" /> Indicacao</>, owner: "Recepcao", last: "hoje 09:20", next: "fazer pos-aula", nextTone: "info" },
  { id: "felipe", interested: "Felipe Andrade", lesson: "Tower", time: "amanha 19h", status: "Lembrete enviado", statusTone: "info", origin: <><Icon name="message" /> Site</>, owner: "Atendimento", last: "hoje 10:12", next: "aguardar", nextTone: "warning" },
  { id: "carla", interested: "Carla Menezes", lesson: "Alongamento", time: "ontem 18h", status: "Faltou", statusTone: "danger", origin: <><Icon name="message" /> Instagram</>, owner: "Recepcao", last: "sem resposta", next: "remarcar", nextTone: "info" },
  { id: "marina", interested: "Marina Lopes", lesson: "Reformer Inicial", time: "sexta 10h", status: "Sem vaga", statusTone: "neutral", origin: <><Icon name="whatsapp" tone="success" /> WhatsApp</>, owner: "Atendimento", last: "pediu manha", next: "oferecer opcao", nextTone: "info" },
  { id: "pedro", interested: "Pedro Santos", lesson: "Pilates Solo", time: "quinta 08h", status: "Pos-aula", statusTone: "warning", origin: <><Icon name="calendar" /> Balcao</>, owner: "Gestora", last: "ontem", next: "iniciar matricula", nextTone: "success" },
  { id: "beatriz", interested: "Beatriz Lima", lesson: "Reformer Intermediario", time: "hoje 19h", status: "Sem resposta", statusTone: "neutral", origin: <><Icon name="whatsapp" tone="success" /> WhatsApp</>, owner: "Recepcao", last: "2 tentativas", next: "ligar", nextTone: "info" },
  { id: "camila", interested: "Camila Rocha", lesson: "Experimental", time: "sexta 14h", status: "Pronta para matricula", statusTone: "success", origin: <><Icon name="users" /> Indicacao</>, owner: "Gestora", last: "feedback positivo", next: "iniciar matricula", nextTone: "success" }
];

function ExperimentalTable({
  onRowSelect,
  selectedRowId
}: {
  onRowSelect?: (row: ExperimentalRow) => void;
  selectedRowId?: string;
}) {
  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de aulas experimentais"
      columns={[
        { key: "interested", header: "Interessado", sortable: true, width: "13%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.interested} size="xs" /> },
        { key: "lesson", header: "Aula experimental", width: "13%" },
        { key: "time", header: "Horario", sortable: true, width: "9%" },
        { key: "status", header: "Status", width: "15%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "origin", header: "Origem", width: "12%", render: (row) => <span>{row.origin}</span> },
        { key: "owner", header: "Dono / fila", width: "11%" },
        { key: "last", header: "Ultima conversa", width: "13%" },
        { key: "next", header: "Proxima acao", width: "14%", render: (row) => <Chip showDot={false} tone={row.nextTone}>{row.next}</Chip> }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-8 de 18", page: 1, pageCount: 2 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="more" label="Mais acoes do experimental" size="sm" variant="ghost" />}
      rows={experimentalRows}
      selectedRowId={selectedRowId}
    />
  );
}

const experimentalDrawerFacts: LeadDrawerFact[] = [
  { id: "class", icon: "calendar", label: "Aula vinculada", value: "Hoje 17h - Reformer Intermediario" },
  { id: "origin", icon: "graduation", label: "Origem comercial", value: <><Icon name="whatsapp" size="12px" /> WhatsApp</>, tone: "success" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepcao" },
  { id: "channel", icon: "tag", label: "Canal permitido", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" },
  { id: "interest", icon: "clock", label: "Interesse", value: "comecar Pilates" },
  { id: "desired", icon: "clock", label: "Horario desejado", value: "terca a noite" },
  { id: "stage", icon: "tag", label: "Etapa em vendas", value: "Experimental" },
  { id: "agenda", icon: "calendar", label: "Agenda vinculada", value: "Aula criada na Agenda" },
  { id: "last", icon: "message", label: "Ultima conversa", value: "Perguntou sobre preco e horarios", helper: "ontem 18:40" }
];

const experimentalDrawerHistory: LeadDrawerHistoryItem[] = [
  { id: "scheduled", time: "ontem 18:40", title: "Experimental agendada", description: "Aula vinculada a grade de hoje" },
  { id: "reminder", time: "ontem 18:42", title: "Lembrete enviado", description: "WhatsApp permitido" },
  { id: "waiting", time: "ontem 18:40", title: "Aguardando confirmacao", description: "Recepcao acompanha manualmente" }
];

function ExperimentalDrawer({ onAction }: { onAction?: (action: string) => void }) {
  return (
    <LeadDrawer
      compact
      copilotBody="Enviar confirmacao curta com horario, endereco e pedido de resposta."
      copilotTitle="Copiloto sugere"
      eyebrow="Experimental selecionada"
      facts={experimentalDrawerFacts}
      history={experimentalDrawerHistory}
      name="Ana Souza"
      notice={<><strong>A operacao manual e sempre possivel.</strong><small>O copiloto apenas sugere. A Agenda e a origem do horario da aula.</small></>}
      onAction={onAction}
      primaryAction={{ label: "Abrir conversa", action: "open-conversation", icon: "whatsapp" }}
      secondaryActions={[
        { label: "Abrir aula na Agenda", action: "open-class", icon: "calendar" },
        { label: "Confirmar presenca", action: "confirm-presence", icon: "checkCircle" },
        { label: "Remarcar", action: "reschedule", icon: "refresh" },
        { label: "Marcar compareceu", action: "mark-attended", icon: "checkCircle" },
        { label: "Marcar falta", action: "mark-absence", icon: "x" },
        { label: "Criar follow-up", action: "create-follow-up", icon: "message" },
        { label: "Iniciar matricula", action: "start-enrollment", icon: "graduation" },
        { label: "Marcar perdido", action: "mark-lost", icon: "lock" }
      ]}
      statusLabel="Confirmar presenca"
      suggestedAction={null}
    />
  );
}

function EnrollmentFilters() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "ready", kind: "quick", label: "Prontas" },
    {
      id: "status",
      label: "Status",
      value: String(values.status ?? ""),
      options: [
        { value: "missing-cpf", label: "Faltando CPF" },
        { value: "ready", label: "Pronta para aluno" },
        { value: "blocked", label: "Bloqueada" }
      ]
    },
    {
      id: "owner",
      label: "Dono",
      value: String(values.owner ?? ""),
      options: [
        { value: "reception", label: "Recepcao" },
        { value: "manager", label: "Gestora" },
        { value: "finance", label: "Financeiro" }
      ]
    },
    {
      id: "origin",
      label: "Origem",
      value: String(values.origin ?? ""),
      options: [
        { value: "experimental", label: "Experimental" },
        { value: "sales", label: "Vendas" },
        { value: "whatsapp", label: "WhatsApp" }
      ]
    },
    {
      id: "plan",
      label: "Plano",
      value: String(values.plan ?? ""),
      options: [
        { value: "2x", label: "Plano 2x/semana" },
        { value: "monthly", label: "Plano mensal" },
        { value: "quarter", label: "Plano trimestral" }
      ]
    },
    {
      id: "channel",
      label: "Canal",
      placement: "advanced",
      value: String(values.channel ?? ""),
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "frontdesk", label: "Balcao" },
        { value: "indication", label: "Indicacao" }
      ]
    }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTriggerVariant="button"
      advancedFiltersTitle="Filtros de matrículas"
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Nova matrícula</Button>
          <Button leadingIcon="upload" size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      onSearchFilter={() => undefined}
      query={query}
      searchFilterLabel="Abrir filtros de matrículas"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por interessado, telefone ou matrícula"
    />
  );
}

function EnrollmentQuickRail() {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todas", icon: "users", count: "128", selected: selectedId === "all" },
    { id: "ready", label: "Prontas para aluno", icon: "clipboardCheck", count: "24", selected: selectedId === "ready" },
    { id: "missing", label: "Faltando dados", icon: "alert", count: "19", tone: "danger", selected: selectedId === "missing" },
    { id: "plan", label: "Escolher plano", icon: "shield", count: "17", selected: selectedId === "plan" },
    { id: "class", label: "Primeira aula", icon: "clock", count: "16", selected: selectedId === "class" },
    { id: "blocked", label: "Bloqueadas", icon: "lock", count: "6", tone: "danger", selected: selectedId === "blocked" },
    { id: "converted", label: "Convertidas", icon: "checkCircle", count: "36", selected: selectedId === "converted" },
    { id: "lost", label: "Perdidas", icon: "x", count: "10", selected: selectedId === "lost" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filtros rápidos"
      groupLabel="Filas de matrículas"
      heading="Filtros rápidos"
      items={items}
      onSelect={(item) => setSelectedId(item.id)}
      selectionTone="soft"
    />
  );
}

type EnrollmentRow = {
  id: string;
  person: string;
  origin: string;
  originTone: ComponentTone;
  plan: string;
  checklist: string;
  status: string;
  statusTone: ComponentTone;
  owner: string;
  next: string;
  last: string;
};

const enrollmentRows: EnrollmentRow[] = [
  { id: "ana", person: "Ana Souza", origin: "Experimental", originTone: "info", plan: "Plano 2x/semana", checklist: "4/5", status: "Faltando CPF", statusTone: "warning", owner: "Recepção", next: "pedir dado", last: "hoje 10:24" },
  { id: "pedro", person: "Pedro Santos", origin: "Pós-aula", originTone: "warning", plan: "Plano mensal", checklist: "5/5", status: "Pronta para aluno", statusTone: "success", owner: "Gestora", next: "converter", last: "hoje 09:40" },
  { id: "julia", person: "Julia Ramos", origin: "Vendas", originTone: "info", plan: "A definir", checklist: "2/5", status: "Escolher plano", statusTone: "info", owner: "Recepção", next: "enviar opções", last: "ontem" },
  { id: "marina", person: "Marina Lopes", origin: "Balcão", originTone: "neutral", plan: "Plano 3x/semana", checklist: "3/5", status: "Primeira aula pendente", statusTone: "info", owner: "Atendimento", next: "escolher aula", last: "hoje" },
  { id: "carla", person: "Carla Menezes", origin: "WhatsApp", originTone: "success", plan: "Plano mensal", checklist: "4/5", status: "Bloqueada", statusTone: "danger", owner: "Financeiro", next: "pendência financeira", last: "2 dias" },
  { id: "felipe", person: "Felipe Andrade", origin: "Experimental", originTone: "info", plan: "Plano 2x/semana", checklist: "5/5", status: "Convertida", statusTone: "success", owner: "Recepção", next: "aluno criado", last: "hoje 08:30" },
  { id: "beatriz", person: "Beatriz Lima", origin: "Indicação", originTone: "info", plan: "Plano mensal", checklist: "3/5", status: "Faltando contato", statusTone: "warning", owner: "Recepção", next: "pedir telefone", last: "ontem" },
  { id: "lucas", person: "Lucas Ferreira", origin: "Vendas", originTone: "info", plan: "Plano trimestral", checklist: "4/5", status: "Aguardando confirmação", statusTone: "info", owner: "Gestora", next: "confirmar início", last: "amanhã" }
];

function EnrollmentTable({
  onRowSelect,
  selectedRowId
}: {
  onRowSelect?: (row: EnrollmentRow) => void;
  selectedRowId?: string;
}) {
  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de matrículas"
      columns={[
        { key: "person", header: "Pessoa", sortable: true, width: "14%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.person} size="xs" /> },
        { key: "origin", header: "Origem", width: "13%", render: (row) => <Chip showDot={false} tone={row.originTone}>{row.origin}</Chip> },
        { key: "plan", header: "Plano", width: "13%" },
        { key: "checklist", header: "Checklist", width: "8%" },
        { key: "status", header: "Status", width: "21%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "owner", header: "Dono / fila", width: "10%" },
        { key: "next", header: "Próxima ação", width: "11%" },
        { key: "last", header: "Última atividade", width: "10%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-8 de 128", page: 1, pageCount: 13 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="more" label="Mais ações da matrícula" size="sm" variant="ghost" />}
      rows={enrollmentRows}
      selectedRowId={selectedRowId}
    />
  );
}

const enrollmentDrawerFacts: LeadDrawerFact[] = [
  { id: "origin", icon: "graduation", label: "Origem", value: "Experimental" },
  { id: "previous", icon: "user", label: "Etapa anterior", value: "Pós-aula" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "plan", icon: "clock", label: "Plano escolhido", value: "Plano 2x/semana" },
  { id: "first", icon: "calendar", label: "Primeira aula", value: "terça 17h - Reformer Intermediário" },
  { id: "channel", icon: "message", label: "Canal permitido", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" }
];

const enrollmentChecklist: LeadDrawerChecklistItem[] = [
  { id: "basic", label: "Dados básicos", checked: true },
  { id: "plan", label: "Plano escolhido", checked: true },
  { id: "class", label: "Primeira aula definida", checked: true },
  { id: "consent", label: "Consentimento registrado", checked: true },
  { id: "cpf", label: "CPF pendente" }
];

const enrollmentDrawerHistory: LeadDrawerHistoryItem[] = [
  { id: "showed", time: "hoje 10:24", title: "Compareceu à experimental", description: "Recepção abriu pré-matrícula" },
  { id: "started", time: "hoje 09:40", title: "Recepção iniciou pré-matrícula", description: "Plano 2x/semana escolhido" },
  { id: "plan", time: "ontem 18:10", title: "Plano 2x/semana escolhido", description: "Primeira aula sugerida" }
];

function EnrollmentDrawer({ onAction }: { onAction?: (action: string) => void }) {
  return (
    <LeadDrawer
      compact
      checklistItems={enrollmentChecklist}
      checklistProgressLabel="4/5"
      checklistTitle="Checklist de matrícula"
      copilotBody="Pedir CPF de forma curta e explicar que é necessário para concluir o cadastro."
      copilotTitle="Copiloto sugere"
      eyebrow="Pré-matrícula selecionada"
      facts={enrollmentDrawerFacts}
      history={enrollmentDrawerHistory}
      name="Ana Souza"
      notice={<><strong>A operação manual é sempre possível.</strong></>}
      onAction={onAction}
      primaryAction={{ label: "Pedir dado", action: "request-data", icon: "clipboard" }}
      secondaryActions={[
        { label: "Converter em aluno", action: "convert-student", icon: "clipboard", disabled: true },
        { label: "Escolher primeira aula", action: "choose-first-class", icon: "calendar" },
        { label: "Abrir interessado", action: "open-conversation", icon: "whatsapp" },
        { label: "Abrir conversa", action: "open-conversation", icon: "whatsapp" },
        { label: "Criar tarefa", action: "create-follow-up", icon: "calendar" },
        { label: "Marcar perdido", action: "mark-lost", icon: "x" },
        { label: "Mais ações", action: "more-actions", icon: "moreVertical" }
      ]}
      state="enrollment"
      statusLabel="Faltando CPF"
      suggestedAction={null}
    />
  );
}

export const Image38ListaInteressados: Story = {
  name: "38 lista de interessados",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 38_round-4.1G_vendas_02_lista-interessados.png.png. Composicao oficial Worklist/Table/Drawer para Vendas."
      }
    },
    sourceImage: "38_round-4.1G_vendas_02_lista-interessados.png.png"
  },
  render: () => <SalesInterestedListPage />
};

export const Image37VendasPipelineKanban: Story = {
  name: "37 vendas pipeline kanban",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 37_round-4.1G_vendas_01_pipeline-kanban.png.png. Composicao oficial Kanban/PageFilterBar/PipelineCard para Vendas."
      }
    },
    sourceImage: "37_round-4.1G_vendas_01_pipeline-kanban.png.png"
  },
  render: () => <SalesPipelinePage />
};

export const Image39ExperimentalLista: Story = {
  name: "39 experimental lista acompanhamento",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 39_round-4.1G_experimental_01_lista-acompanhamento.png.png. Composicao oficial Worklist/Table/Drawer para Vendas."
      }
    },
    sourceImage: "39_round-4.1G_experimental_01_lista-acompanhamento.png.png"
  },
  render: () => <SalesExperimentalListPage />
};

export const Image40MatriculasChecklistConversao: Story = {
  name: "40 matriculas checklist conversao",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 40_round-4.1G_matriculas_01_checklist-conversao.png.png. Composicao oficial Worklist/Table/Drawer para Vendas."
      }
    },
    sourceImage: "40_round-4.1G_matriculas_01_checklist-conversao.png.png"
  },
  render: () => <SalesEnrollmentChecklistPage />
};
