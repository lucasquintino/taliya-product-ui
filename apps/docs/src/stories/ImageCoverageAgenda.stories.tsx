import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  ClassDrawer,
  ClassOperationalDetail,
  CrmDashboardPage,
  CrmRightPanelPage,
  CrmWorklistPage,
  CrmWorklistTable,
  MiniCalendar,
  PageFilterBar,
  PageQuickFilters,
  WeeklyCalendar,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { ClassDrawerFact, ClassDrawerStudent, ClassDrawerTimelineItem, CrmShellNavItem, PageFilterBarFilter, WeeklyCalendarEvent } from "@taliya/crm";
import type { CrmWorklistTableColumn, PageQuickFilterItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, List, ListItem, Panel, PersonLabel } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source29FelipeAndrade from "../assets/source29-felipe-andrade.png";
import source29JulianaCosta from "../assets/source29-juliana-costa.png";

const meta = {
  title: "CRM / Image Coverage / Agenda",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Agenda. As paginas usam shell, filtros e componentes oficiais de calendario/aula sem recriar anatomia dentro de remaining-pages."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const agendaNavItems: CrmShellNavItem[] = [
  { id: "agenda", label: "Agenda" },
  { id: "turmas", label: "Turmas" },
  { id: "grade", label: "Grade" },
  { id: "reposicoes", label: "Reposições" },
  { id: "historico", label: "Histórico" }
];

const agendaCalendarNavItems: CrmShellNavItem[] = [
  { id: "agenda", label: "Agenda" },
  { id: "turmas", label: "Turmas" },
  { id: "chamada", label: "Chamada" },
  { id: "reposicoes", label: "Reposições" },
  { id: "historico", label: "Histórico" }
];

const agendaClassNavItems: CrmShellNavItem[] = [
  { id: "agenda", label: "Agenda" },
  { id: "turmas", label: "Turmas" },
  { id: "reposicoes", label: "Reposições" },
  { id: "historico", label: "Histórico" }
];

const agendaClassStudents: ClassDrawerStudent[] = [
  { id: "ana-carolina", name: "Ana Carolina Souza", initials: "AS", status: "pending" },
  { id: "beatriz", name: "Beatriz Lima", initials: "BL", status: "present" },
  { id: "felipe", name: "Felipe Andrade", avatarSrc: source29FelipeAndrade, status: "warned", helper: "gera crédito" },
  { id: "gabriela", name: "Gabriela Martins", initials: "GM", status: "no-show", helper: "não gera crédito" },
  { id: "juliana", name: "Juliana Costa", avatarSrc: source29JulianaCosta, status: "replacement", helper: "reposição usada" }
];

export function AgendaCalendarPage() {
  return (
    <CrmDashboardPage
      activeNavId="agenda"
      activeSidebarId="agenda"
      avatarSrc={image79Avatar}
      before={<AgendaFilters />}
      columns="agenda"
      drawer={<AgendaSelectedClassDrawer />}
      drawerPlacement="floating"
      drawerSize="compact"
      navItems={agendaCalendarNavItems}
      pageHeaderRhythm="compact-stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana · Aulas, chamada e reposições"
      title="Agenda"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <AgendaSidePanel />
      <WeeklyCalendar compact />
    </CrmDashboardPage>
  );
}

function AgendaSelectedClassDrawer() {
  const facts: ClassDrawerFact[] = [
    { id: "teacher", icon: "calendar", label: "Professor", value: "João Silva" },
    { id: "resource", icon: "user", label: "Sala / recurso", value: "Reformer 2" },
    { id: "capacity", icon: "users", label: "Capacidade", value: "3/4" },
    { id: "status", icon: "clock", label: "Status", value: <Chip tone="warning">Chamada pendente</Chip>, tone: "warning" },
    { id: "attendance", icon: "user", label: "Presença", value: "Pendente" },
    { id: "vacancy", icon: "calendar", label: "Vaga / encaixe", value: <Chip tone="success">1 vaga aberta</Chip>, tone: "success" }
  ];
  const students: ClassDrawerStudent[] = [
    { id: "ana", initials: "1", name: "Ana Carolina Souza", status: "pending" },
    { id: "beatriz", initials: "2", name: "Beatriz Lima", status: "pending" },
    { id: "felipe", initials: "3", name: "Felipe Andrade", status: "pending" },
    { id: "gabriela", initials: "4", name: "Gabriela Martins", status: "pending" }
  ];

  return (
    <ClassDrawer
      actionPlacement="content"
      actionHeading="Próximas ações"
      ariaLabel="Detalhes da aula selecionada"
      audit="Convite seguro: permitido apenas se política, consentimento, cota e risco estiverem OK."
      availabilityNotice="Há 1 crédito de reposição compatível para esta vaga."
      availabilityTone="warning"
      closeLabel="Fechar aula selecionada"
      compact
      copilot={<><strong>Copiloto: há 1 crédito de reposição compatível para esta vaga.</strong></>}
      eyebrow="Aula selecionada"
      facts={facts}
      primaryAction={{ label: "Abrir aula", action: "open-schedule" }}
      rosterHeading="Alunos previstos (4)"
      rosterStatus={{ label: "Pendente", tone: "warning" }}
      secondaryActions={[
        { label: "Fazer chamada", action: "save-call" },
        { label: "Encontrar encaixe", action: "move-student" },
        { label: "Avisar envolvidos", action: "notify-class" }
      ]}
      showStudentStatus
      students={students}
      subtitle={null}
      title="Terça 17h · Reformer Intermediário"
      variant="class-detail"
    />
  );
}

export function AgendaClassDetailPage() {
  return (
    <CrmRightPanelPage
      activeNavId="agenda"
      activeSidebarId="agenda"
      avatarSrc={image79Avatar}
      main={<ClassOperationalDetail students={agendaClassStudents} />}
      mainLabel="Detalhe operacional da aula"
      navItems={agendaClassNavItems}
      pageHeaderBreadcrumb={<Button leadingIcon="arrowLeft" size="sm" variant="secondary">Voltar para Agenda</Button>}
      pageHeaderActions={
        <ButtonGroup>
          <Button size="sm" variant="secondary">Salvar aula</Button>
          <Button size="sm" variant="secondary">Avisar turma</Button>
          <Button size="sm" variant="secondary">Abrir agenda</Button>
          <Button leadingIcon="users" size="sm" variant="primary">Fazer chamada</Button>
        </ButtonGroup>
      }
      pageHeaderRhythm="stacked"
      rightPanelVariant="class-operation"
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="terça, 13 maio"
      panel={
        <ClassDrawer
          ariaLabel="Chamada da aula"
          closeLabel="Fechar chamada"
          copilot={<><strong>Copiloto: Felipe avisou falta dentro da politica.</strong> Credito pode ser gerado.</>}
          primaryAction={{ label: "Salvar chamada", action: "save-call" }}
          secondaryActions={[
            { label: "Adicionar observacao", action: "add-note" },
            { label: "Criar tarefa", action: "create-task" },
            { label: "Corrigir depois", action: "correct-later" }
          ]}
          state="calling"
          students={agendaClassStudents}
          subtitle="Terça 17h · Reformer Intermediário"
          title="Chamada"
        />
      }
      panelLabel="Painel de chamada"
      title="Terça 17h · Reformer Intermediário"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
    </CrmRightPanelPage>
  );
}

export function AgendaClassesPage() {
  return (
    <CrmWorklistPage
      activeNavId="turmas"
      activeSidebarId="agenda"
      avatarSrc={image79Avatar}
      drawer={<AgendaClassDrawer />}
      drawerPlacement="floating"
      drawerSize="compact"
      filterBar={<ClassesFilters />}
      filterBarLabel="Filtros de turmas"
      listLabel="Filas"
      mainLabel="Lista de turmas"
      navItems={agendaNavItems}
      pageHeaderRhythm="overview"
      quickFilters={<ClassesQuickFilters />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana · Turmas recorrentes e vagas fixas"
      title="Turmas"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="main-priority"
    >
      <ClassesTable />
    </CrmWorklistPage>
  );
}

export function AgendaGradePage() {
  return (
    <CrmWorklistPage
      activeNavId="grade"
      activeSidebarId="agenda"
      avatarSrc={image79Avatar}
      drawer={<AgendaGradeDrawer />}
      drawerPlacement="floating"
      drawerSize="compact"
      filterBar={<GradeFilters />}
      filterBarLabel="Filtros de grade"
      listLabel="Resumo estrutural"
      mainLabel="Semana-modelo"
      navItems={agendaNavItems}
      quickFilters={<GradeSummaryFilters />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana - Semana-modelo e bloqueios recorrentes"
      title="Grade"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <WeeklyCalendar
        compact
        days={["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]}
        density="short"
        events={gradeWeeklyEvents}
        selectedEventId="ter-1700-reformer"
        times={gradeWeeklyTimes}
      />
    </CrmWorklistPage>
  );
}

function AgendaGradeDrawer() {
  const [, setAction] = useState("");
  return (
    <ClassDrawer
      ariaLabel="Detalhes do bloco recorrente"
      audit={<><Icon name="info" size="15px" /> Grade funciona com 0 agentes. Impacto é calculado pelo sistema. Copiloto resume impacto e redige aviso. Autônomo só cria tarefas ou avisos seguros se a política permitir.</>}
      blockNotice={{
        title: "Bloqueio de agenda",
        types: "Tipos: feriado, recesso, professor indisponível ou horário bloqueado.",
        description: "Antes de publicar, o sistema mostra aulas e alunos afetados.",
        actionLabel: "Ação: Criar bloqueio"
      }}
      closeLabel="Fechar bloco"
      compact
      copilot={<><strong>Copiloto: alterar este horário exige aviso para 5 alunos e revisa 3 aulas futuras.</strong></>}
      eyebrow="Bloco recorrente"
      facts={[
        { id: "capacity", icon: "users", label: "Capacidade padrão", value: "6" },
        { id: "students", icon: "users", label: "Alunos fixos", value: "5" },
        { id: "vacancy", icon: "tag", label: "Vaga fixa", value: "1" },
        { id: "teacher", icon: "user", label: "Professor (opcional)", value: <PersonLabel avatarSrc={image79Avatar} name="João Silva" size="xs" /> },
        { id: "resource", icon: "calendar", label: "Recurso / equipamento (opcional)", value: "Reformer 2" }
      ]}
      impactItems={[
        { id: "schedule", icon: "users", label: "alterar horário afeta 5 alunos fixos" },
        { id: "capacity", icon: "graduation", label: "alterar capacidade afeta vagas futuras" },
        { id: "block", icon: "tag", label: "bloquear este horário afeta 3 aulas futuras" }
      ]}
      onAction={setAction}
      primaryAction={{ label: "Editar bloco", action: "edit-class" }}
      secondaryActions={[
        { label: "Abrir turma", action: "open-grid" },
        { label: "Ver aulas geradas", action: "open-schedule" },
        { label: "Criar bloqueio", action: "create-task" },
        { label: "Simular impacto", action: "move-student" },
        { label: "Pausar recorrencia", action: "pause-class" }
      ]}
      subtitle="Gera aulas toda terça às 17h."
      title="Terça 17h · Reformer Intermediário"
      upcomingClasses={[
        { id: "today", label: "hoje" },
        { id: "1905", label: "19/05" },
        { id: "2605", label: "26/05" }
      ]}
      variant="recurring-block"
    />
  );
}

function GradeFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "week", kind: "quick", label: "Semana-modelo", selected: true },
    { id: "teacher", label: "Professor", value: String(values.teacher ?? ""), options: [{ value: "", label: "Professor" }, { value: "joao", label: "Joao Silva" }, { value: "mariana", label: "Mariana Lopes" }] },
    { id: "class", label: "Turma", value: String(values.class ?? ""), options: [{ value: "", label: "Turma" }, { value: "reformer", label: "Reformer" }, { value: "pilates", label: "Pilates" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "", label: "Status" }, { value: "ativa", label: "Ativa" }, { value: "lotada", label: "Lotada" }] },
    { id: "blocks", label: "Bloqueios", value: String(values.blocks ?? ""), options: [{ value: "", label: "Bloqueios" }, { value: "active", label: "Ativos" }, { value: "teacher", label: "Professor indisponivel" }] }
  ];

  return (
    <PageFilterBar
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Criar turma</Button>
          <Button leadingIcon="lock" size="sm" variant="secondary">Criar bloqueio</Button>
        </ButtonGroup>
      }
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      searchVisible={false}
    />
  );
}

function GradeSummaryFilters() {
  const [selectedId, setSelectedId] = useState("active");
  const items: PageQuickFilterItem[] = [
    { id: "active", label: "Turmas ativas", icon: "user", count: "18", tone: "info", selected: selectedId === "active" },
    { id: "open", label: "Vagas fixas abertas", icon: "calendar", count: "9", selected: selectedId === "open" },
    { id: "full", label: "Turmas lotadas", icon: "users", count: "4", tone: "danger", selected: selectedId === "full" },
    { id: "teacher", label: "Professor a definir", icon: "user", count: "2", tone: "warning", selected: selectedId === "teacher" },
    { id: "blocks", label: "Bloqueios ativos", icon: "lock", count: "3", tone: "info", selected: selectedId === "blocks" }
  ];

  return (
    <PageQuickFilters
      actions={<ListItem leading={<Icon name="info" />} meta="Os blocos geram aulas futuras conforme a recorrencia." title="Esta e a semana-modelo do studio." />}
      heading="Resumo estrutural"
      items={items}
      onSelect={(item) => setSelectedId(item.id)}
      selectionTone="soft"
    />
  );
}

const gradeWeeklyTimes = [
  { label: "07:00", top: 50 },
  { label: "08:00", top: 124 },
  { label: "10:00", top: 224 },
  { label: "14:00", top: 344 },
  { label: "17:00", top: 474 },
  { label: "18:00", top: 566 },
  { label: "19:00", top: 648 }
];

const gradeWeeklyEvents: WeeklyCalendarEvent[] = [
  { id: "seg-0700-reformer", dayIndex: 0, top: 50, height: 74, time: "07:00", title: "Reformer Inicial", teacher: "capacidade", capacity: "4/6", status: "scheduled", statusLabel: "ativa" },
  { id: "ter-0700-pilates", dayIndex: 1, top: 50, height: 74, time: "07:00", title: "Pilates Solo", teacher: "capacidade", capacity: "3/6", status: "scheduled", statusLabel: "ativa" },
  { id: "ter-0800-reformer", dayIndex: 1, top: 124, height: 74, time: "08:00", title: "Reformer Intermediario", teacher: "", capacity: "6/6", status: "full", statusLabel: "lotada" },
  { id: "qua-1000-pilates", dayIndex: 2, top: 224, height: 74, time: "10:00", title: "Pilates Solo", teacher: "", capacity: "5/6", status: "scheduled", statusLabel: "ativa" },
  { id: "qui-1400-experimental", dayIndex: 3, top: 344, height: 74, time: "14:00", title: "Experimental", teacher: "", capacity: "2/6", status: "replacement", statusLabel: "recorrente" },
  { id: "ter-1700-reformer", dayIndex: 1, top: 474, height: 82, time: "17:00", title: "Reformer Intermediario", teacher: "", capacity: "5/6", status: "scheduled", statusLabel: "ativa" },
  { id: "qua-1800-teacher", dayIndex: 2, top: 566, height: 74, time: "18:00", title: "Professor indisponivel", teacher: "", capacity: "", status: "teacher-unavailable", statusLabel: "bloqueio" },
  { id: "sex-1400-holiday", dayIndex: 4, top: 380, height: 260, time: "", title: <>Bloqueio<br />• Feriado municipal</>, teacher: "", capacity: "14:00 - 18:00", status: "schedule-block", statusLabel: "" },
  { id: "seg-1900-tower", dayIndex: 0, top: 648, height: 62, time: "19:00", title: "Tower", teacher: "", capacity: "3/5", status: "pending", statusLabel: "a definir" }
];

function AgendaClassDrawer() {
  const facts: ClassDrawerFact[] = [
    { id: "schedule", icon: "calendar", label: "Dia/horário recorrente", value: "Terça 17h" },
    { id: "capacity", icon: "users", label: "Capacidade", value: "5/6" },
    { id: "teacher", icon: "user", label: "Professor da turma", value: <PersonLabel avatarSrc={image79Avatar} name="João Silva" size="xs" /> },
    { id: "resource", icon: "user", label: "Recurso / equipamento", value: "Reformer 2" },
    { id: "status", icon: "clock", label: "Status", value: <Chip tone="success">Ativa</Chip>, tone: "success" }
  ];
  const students: ClassDrawerStudent[] = [
    { id: "ana", initials: "AS", name: "Ana Carolina Souza", status: "pending" },
    { id: "beatriz", initials: "BL", name: "Beatriz Lima", status: "present" },
    { id: "felipe", initials: "FA", name: "Felipe Andrade", status: "warned" },
    { id: "gabriel", initials: "GM", name: "Gabriela Martins", status: "no-show" },
    { id: "juliana", initials: "JC", name: "Juliana Costa", status: "replacement" }
  ];
  const upcomingClasses: ClassDrawerTimelineItem[] = [
    { id: "today", label: "Hoje 17h" },
    { id: "next", label: "Proxima terca 17h" },
    { id: "following", label: "Terca seguinte 17h" }
  ];
  const historyItems: ClassDrawerTimelineItem[] = [
    { id: "moved", label: "Aluno movido", meta: "Hoje 10:12", tone: "success" },
    { id: "capacity", label: "Capacidade ajustada", meta: "Ontem 16:45", tone: "info" },
    { id: "teacher", label: "Professor alterado", meta: "12/05 11:20", tone: "warning" }
  ];

  return (
    <ClassDrawer
      ariaLabel="Detalhes da turma"
      audit="Operação manual sempre possível. O Copiloto apenas sugere impactos, vagas e ideias de mensagem."
      availabilityNotice="1 vaga fixa disponivel"
      closeLabel="Fechar turma"
      compact
      copilot={<><strong>Copiloto: Há 1 vaga fixa e 2 alunos com preferência por terça à tarde.</strong></>}
      eyebrow="Turma selecionada"
      facts={facts}
      historyItems={historyItems}
      primaryAction={{ label: "Abrir agenda", action: "open-schedule" }}
      rosterHeading="Alunos fixos (5)"
      secondaryActions={[
        { label: "Abrir grade", action: "open-grid" },
        { label: "Mover aluno", action: "move-student" },
        { label: "Avisar turma", action: "notify-class" },
        { label: "Pausar turma", action: "pause-class" },
        { label: "Editar turma", action: "edit-class" }
      ]}
      students={students}
      subtitle={null}
      title="Terça 17h · Reformer Intermediário"
      upcomingClasses={upcomingClasses}
      variant="class-detail"
      warning="Alterações nesta turma podem afetar 3 aulas futuras."
    />
  );
}

type ClassRow = {
  id: string;
  name: string;
  teacher: string;
  schedule: string;
  capacity: string;
  fixed: string;
  vacancies: string;
  next: string;
  status: string;
  tone: ComponentTone;
  change: string;
};

const classRows: ClassRow[] = [
  { id: "reformer", name: "Reformer Intermediário", teacher: "João Silva", schedule: "Terça 17h", capacity: "5/6", fixed: "5 alunos", vacancies: "1 vaga", next: "Hoje 17h", status: "Ativa", tone: "success", change: "Aluno movido hoje" },
  { id: "pilates", name: "Pilates Solo", teacher: "Mariana Lopes", schedule: "Quinta 08h", capacity: "6/6", fixed: "6 alunos", vacancies: "Lotada", next: "Quinta 08h", status: "Cheia", tone: "danger", change: "Sem mudanças" },
  { id: "tower", name: "Tower", teacher: "A definir", schedule: "Segunda 19h", capacity: "3/5", fixed: "3 alunos", vacancies: "2 vagas", next: "Segunda 19h", status: "Com vaga", tone: "success", change: "Professor pendente" },
  { id: "alongamento", name: "Alongamento", teacher: "Camila Rocha", schedule: "Sexta 10h", capacity: "4/6", fixed: "4 alunos", vacancies: "2 vagas", next: "Sexta 10h", status: "Ativa", tone: "success", change: "Capacidade ajustada" },
  { id: "experimental", name: "Experimental", teacher: "Lucas Peres", schedule: "Quarta 14h", capacity: "2/6", fixed: "2 alunos", vacancies: "4 vagas", next: "Quarta 14h", status: "Temporária", tone: "info", change: "Evento recorrente" },
  { id: "inicial", name: "Reformer Inicial", teacher: "A definir", schedule: "Terça 07h", capacity: "0/6", fixed: "0 alunos", vacancies: "6 vagas", next: "Terça 07h", status: "Pausada", tone: "neutral", change: "Pausada esta semana" }
];

const classColumns: Array<CrmWorklistTableColumn<ClassRow>> = [
  { key: "name", header: "Turma", sortable: true, width: "14%" },
  { key: "schedule", header: "Dia/horário", width: "10%" },
  { key: "teacher", header: "Professor da turma", render: (row) => <PersonLabel avatarSrc={row.teacher === "A definir" ? undefined : image79Avatar} name={row.teacher} size="xs" />, width: "16%" },
  { key: "capacity", header: "Capacidade", width: "9%" },
  { key: "fixed", header: "Alunos fixos", width: "10%" },
  { key: "vacancies", header: "Vagas", render: (row) => <Chip tone={row.vacancies === "Lotada" ? "danger" : "success"}>{row.vacancies}</Chip>, width: "10%" },
  { key: "next", header: "Próxima aula", width: "11%" },
  { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, sortable: true, width: "9%" },
  { key: "change", header: "Última mudança", width: "13%" }
];

function ClassesTable() {
  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de turmas"
      columns={classColumns}
      pagination={{ itemsPerPage: "10", label: "1-6 de 18", page: 1, pageCount: 2 }}
      rowActions={() => <IconButton icon="more" label="Mais acoes da turma" size="sm" variant="ghost" />}
      rows={classRows}
      selectedRowId="reformer"
    />
  );
}

function ClassesFilters() {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "schedule", label: "Dia/horario", value: String(values.schedule ?? ""), options: [{ value: "terca", label: "Terca" }, { value: "quinta", label: "Quinta" }] },
    { id: "teacher", label: "Professor", value: String(values.teacher ?? ""), options: [{ value: "joao", label: "Joao Silva" }, { value: "mariana", label: "Mariana Lopes" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "ativa", label: "Ativa" }, { value: "cheia", label: "Cheia" }, { value: "pausada", label: "Pausada" }] },
    { id: "vacancies", label: "Vagas", value: String(values.vacancies ?? ""), options: [{ value: "available", label: "Com vagas" }, { value: "full", label: "Lotadas" }] },
    { id: "capacity", label: "Capacidade", value: String(values.capacity ?? ""), options: [{ value: "low", label: "Baixa" }, { value: "full", label: "Completa" }] }
  ];

  return (
    <PageFilterBar
      actions={<Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Criar turma</Button>}
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      onSearchFilter={() => undefined}
      query={query}
      searchFilterLabel="Abrir filtros de turmas"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar turma ou aluno..."
    />
  );
}

function ClassesQuickFilters() {
  const [selectedId, setSelectedId] = useState("available");
  const items: PageQuickFilterItem[] = [
    { id: "available", label: "Com vagas", icon: "users", count: "12", selected: selectedId === "available" },
    { id: "full", label: "Lotadas", icon: "alert", count: "6", tone: "danger", selected: selectedId === "full" },
    { id: "teacher", label: "Professor a definir", icon: "user", count: "3", tone: "warning", selected: selectedId === "teacher" },
    { id: "paused", label: "Pausadas", icon: "clock", count: "2", selected: selectedId === "paused" },
    { id: "changed", label: "Alteradas recentemente", icon: "refresh", count: "8", tone: "info", selected: selectedId === "changed" }
  ];

  return <PageQuickFilters groupLabel="Filas de turmas" heading="Filas" items={items} onSelect={(item) => setSelectedId(item.id)} selectionTone="soft" />;
}

function AgendaFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      {
        id: "professor",
        label: "Professor",
        value: typeof values.professor === "string" ? values.professor : "",
        options: [
          { value: "joao", label: "Joao Silva", icon: "user" },
          { value: "mariana", label: "Mariana Lopes", icon: "user" },
          { value: "lucas", label: "Lucas Peres", icon: "user" }
        ]
      },
      {
        id: "turma",
        label: "Turma",
        value: typeof values.turma === "string" ? values.turma : "",
        options: [
          { value: "reformer", label: "Reformer", icon: "calendar" },
          { value: "pilates", label: "Pilates Solo", icon: "calendar" },
          { value: "tower", label: "Tower", icon: "calendar" }
        ]
      },
      {
        id: "sala",
        label: "Sala",
        value: typeof values.sala === "string" ? values.sala : "",
        options: [
          { value: "reformer-2", label: "Reformer 2", icon: "home" },
          { value: "sala-1", label: "Sala 1", icon: "home" },
          { value: "sala-3", label: "Sala 3", icon: "home" }
        ]
      },
      {
        id: "status",
        label: "Status",
        value: typeof values.status === "string" ? values.status : "",
        options: [
          { value: "confirmada", label: "Confirmada", icon: "checkCircle" },
          { value: "pendente", label: "Chamada pendente", icon: "clock" },
          { value: "lotado", label: "Lotado", icon: "alert" }
        ]
      }
    ],
    [values]
  );

  return (
    <PageFilterBar
      actions={
        <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" size="sm" variant="primary">Criar aula</Button>
      }
      leadingActions={
        <ButtonGroup>
          <Button size="sm" variant="secondary">Dia</Button>
          <Button size="sm" variant="primary">Semana</Button>
          <IconButton icon="chevronLeft" label="Semana anterior" size="sm" variant="default" />
          <IconButton icon="chevronRight" label="Proxima semana" size="sm" variant="default" />
          <Button size="sm" variant="secondary">Hoje</Button>
          <span aria-label="Intervalo atual">12–18 maio</span>
        </ButtonGroup>
      }
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      searchVisible={false}
    />
  );
}

function AgendaSidePanel() {
  return (
    <Panel>
      <MiniCalendar />
      <h3>Agenda</h3>
      <List divided>
        <ListItem action={<Chip>18</Chip>} leading={<Icon name="calendar" />} selected title="Hoje" />
        <ListItem action={<Chip>6</Chip>} leading={<Icon name="clock" tone="warning" />} title="Chamada pendente" />
        <ListItem action={<Chip>4</Chip>} leading={<Icon name="checkCircle" tone="info" />} title="Vagas abertas" />
        <ListItem action={<Chip>2</Chip>} leading={<Icon name="alert" tone="danger" />} title="Conflitos" />
        <ListItem action={<Chip>3</Chip>} leading={<Icon name="refresh" />} title="Reposicoes" />
      </List>
    </Panel>
  );
}

export const Image26AgendaCalendarioOperacional: Story = {
  name: "26 agenda calendario operacional",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 26_round-4.1F_agenda_01_calendario-operacional.png.png. Composicao oficial CrmDashboardPage/PageFilterBar/MiniCalendar/WeeklyCalendar/ClassDrawer para Agenda."
      }
    },
    sourceImage: "26_round-4.1F_agenda_01_calendario-operacional.png.png"
  },
  render: () => <AgendaCalendarPage />
};

export const Image29AulaDetalheComChamada: Story = {
  name: "29 aula detalhe com chamada",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 29_round-4.1F_aula_01_detalhe-com-chamada.png.png. Composicao oficial CrmRightPanelPage/ClassDrawer/Roster para detalhe de aula."
      }
    },
    sourceImage: "29_round-4.1F_aula_01_detalhe-com-chamada.png.png"
  },
  render: () => <AgendaClassDetailPage />
};

export const Image35TurmasListaDetalhe: Story = {
  name: "35 turmas lista detalhe",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 35_round-4.1F_turmas_01_lista-detalhe.png.png. Composicao oficial Worklist/Table/Drawer para Turmas."
      }
    },
    sourceImage: "35_round-4.1F_turmas_01_lista-detalhe.png.png"
  },
  render: () => <AgendaClassesPage />
};

export const Image36GradeSemanaModeloBloqueio: Story = {
  name: "36 grade semana modelo bloqueio",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 36_round-4.1F_grade_01_semana-modelo-bloqueio.png.png. Composicao oficial Worklist/WeeklyCalendar/ClassDrawer para Grade."
      }
    },
    sourceImage: "36_round-4.1F_grade_01_semana-modelo-bloqueio.png.png"
  },
  render: () => <AgendaGradePage />
};
