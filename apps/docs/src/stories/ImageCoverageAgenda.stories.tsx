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
import type { AttendanceStatus, ClassDrawerAction, ClassDrawerFact, ClassDrawerStudent, ClassDrawerTimelineItem, ClassOperationalDetailAction, CrmShellNavItem, PageFilterBarFilter, WeeklyCalendarEvent } from "@taliya/crm";
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
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<WeeklyCalendarEvent | null>(null);
  const [selectedEventId, setSelectedEventId] = useState("ter-1700-reformer");
  const [selectedDay, setSelectedDay] = useState("12");
  const [monthOffset, setMonthOffset] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState<"day" | "week">("week");
  const announce = (message: string) => setAnnouncement(message);
  const monthLabels = ["abril 2024", "maio 2024", "junho 2024"];
  const monthLabel = monthLabels[monthOffset + 1] ?? "maio 2024";
  const weekLabels = ["5–11 maio", "12–18 maio", "19–25 maio"];
  const weekLabel = weekLabels[weekOffset + 1] ?? "12–18 maio";
  return (
    <CrmDashboardPage
      activeNavId="agenda"
      activeSidebarId="agenda"
      avatarSrc={image79Avatar}
      before={(
        <AgendaFilters
          onAction={announce}
          onViewChange={(nextView) => {
            setView(nextView);
            announce(`Visualização alterada para ${nextView === "week" ? "semana" : "dia"}`);
          }}
          onWeekChange={(nextOffset) => {
            setWeekOffset(nextOffset);
            announce(`Período alterado para ${weekLabels[nextOffset + 1] ?? "12–18 maio"}`);
          }}
          view={view}
          weekLabel={weekLabel}
          weekOffset={weekOffset}
        />
      )}
      columns="agenda"
      drawer={drawerOpen ? (
        <AgendaSelectedClassDrawer
          event={selectedEvent}
          onAction={(action) => announce(`Ação da aula: ${agendaDrawerActionLabels[action]}`)}
          onClose={() => {
            setDrawerOpen(false);
            announce("Detalhes da aula fechados");
          }}
        />
      ) : null}
      drawerPlacement="floating"
      drawerSize="compact"
      globalActions={{
        onAvatar: () => announce("Perfil da operadora aberto"),
        onMessages: () => announce("Mensagens abertas"),
        onNotifications: () => announce("Notificações abertas"),
        onSearch: () => announce("Busca global aberta")
      }}
      navItems={agendaCalendarNavItems}
      onBack={() => announce("Navegação de retorno acionada")}
      onNavChange={(id) => announce(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => announce(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => announce(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="compact-stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      showGlobalActionsWithDrawer
      subtitle="Studio Vila Mariana · Aulas, chamada e reposições"
      title="Agenda"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <AgendaSidePanel
        monthLabel={monthLabel}
        onAction={announce}
        onMonthChange={(nextOffset) => {
          setMonthOffset(nextOffset);
          announce(`Mês alterado para ${monthLabels[nextOffset + 1] ?? "maio 2024"}`);
        }}
        onSelectDay={(day) => {
          setSelectedDay(day);
          announce(`Dia ${day} selecionado`);
        }}
        selectedDay={selectedDay}
      />
      <WeeklyCalendar
        compact
        onEventSelect={(eventId, event) => {
          setSelectedEventId(eventId);
          setSelectedEvent(event);
          setDrawerOpen(true);
          announce(`Aula selecionada: ${String(event.title)}, ${String(event.time)}`);
        }}
        selectedEventId={selectedEventId}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </CrmDashboardPage>
  );
}

const agendaDrawerActionLabels: Record<ClassDrawerAction, string> = {
  "add-note": "adicionar observação",
  close: "fechar",
  "correct-later": "corrigir depois",
  "create-task": "criar tarefa",
  "edit-class": "editar aula",
  "move-student": "encontrar encaixe",
  "notify-class": "avisar envolvidos",
  "open-grid": "abrir grade",
  "open-schedule": "abrir aula",
  "pause-class": "pausar aula",
  "save-call": "fazer chamada"
};

const agendaStudentNames = ["Ana Carolina Souza", "Beatriz Lima", "Felipe Andrade", "Gabriela Martins", "Juliana Costa", "Rafael Nunes"];
const agendaDayNames = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function AgendaSelectedClassDrawer({ event, onAction, onClose }: { event?: WeeklyCalendarEvent | null; onAction?: (action: ClassDrawerAction) => void; onClose?: () => void }) {
  const capacity = String(event?.capacity ?? "3/4");
  const [occupiedText = "3", totalText = "4"] = capacity.split("/");
  const occupied = Number(occupiedText) || 0;
  const total = Number(totalText) || 4;
  const available = Math.max(total - occupied, 0);
  const creditLabel = `${available} ${available === 1 ? "crédito de reposição compatível" : "créditos de reposição compatíveis"}`;
  const statusLabel = String(event?.statusLabel ?? "Chamada pendente");
  const statusTone: ComponentTone = event?.status === "scheduled" ? "success" : event?.status === "pending" ? "warning" : event?.status === "full" || event?.status === "teacher-unavailable" ? "danger" : "info";
  const title = event ? `${agendaDayNames[event.dayIndex] ?? "Aula"} ${String(event.time)} · ${String(event.title)}` : "Terça 17h · Reformer Intermediário";
  const facts: ClassDrawerFact[] = [
    { id: "teacher", icon: "calendar", label: "Professor", value: event?.teacher ?? "João Silva" },
    { id: "resource", icon: "user", label: "Sala / recurso", value: event ? (String(event.title).includes("Reformer") ? "Reformer 2" : "Sala 1") : "Reformer 2" },
    { id: "capacity", icon: "users", label: "Capacidade", value: capacity },
    { id: "status", icon: "clock", label: "Status", value: <Chip tone={statusTone}>{statusLabel}</Chip>, tone: statusTone === "danger" ? "danger" : statusTone === "warning" ? "warning" : statusTone === "success" ? "success" : "info" },
    { id: "attendance", icon: "user", label: "Presença", value: "Pendente" },
    { id: "vacancy", icon: "calendar", label: "Vaga / encaixe", value: <Chip tone={available ? "success" : "danger"}>{available ? `${available} ${available === 1 ? "vaga aberta" : "vagas abertas"}` : "Sem vagas"}</Chip>, tone: available ? "success" : "danger" }
  ];
  const students: ClassDrawerStudent[] = agendaStudentNames.slice(0, Math.min(total, agendaStudentNames.length)).map((name, index) => ({ id: `student-${index}`, initials: String(index + 1), name, status: "pending" }));

  return (
    <ClassDrawer
      actionPlacement="content"
      actionHeading="Próximas ações"
      ariaLabel="Detalhes da aula selecionada"
      audit="Convite seguro: permitido apenas se política, consentimento, cota e risco estiverem OK."
      availabilityNotice={available ? `Há ${creditLabel} para esta vaga.` : "A turma está lotada; avalie a fila de espera."}
      availabilityTone="warning"
      closeLabel="Fechar aula selecionada"
      compact
      copilot={<><strong>{available ? `Copiloto: há ${creditLabel} para esta vaga.` : "Copiloto: não há vaga disponível nesta aula."}</strong></>}
      eyebrow="Aula selecionada"
      facts={facts}
      onAction={onAction}
      onClose={onClose}
      primaryAction={{ label: "Abrir aula", action: "open-schedule" }}
      rosterHeading={`Alunos previstos (${students.length})`}
      rosterStatus={{ label: "Pendente", tone: "warning" }}
      secondaryActions={[
        { label: "Fazer chamada", action: "save-call" },
        { label: "Encontrar encaixe", action: "move-student" },
        { label: "Avisar envolvidos", action: "notify-class" }
      ]}
      showStudentStatus
      students={students}
      subtitle={null}
      title={title}
      variant="class-detail"
    />
  );
}

export function AgendaClassDetailPage() {
  const [announcement, setAnnouncement] = useState("");
  const [callOpen, setCallOpen] = useState(true);
  const [callState, setCallState] = useState<"calling" | "saved">("calling");
  const [students, setStudents] = useState(agendaClassStudents);
  const detailActionLabels: Record<ClassOperationalDetailAction, string> = {
    "view-students": "detalhes dos alunos abertos",
    "open-vacancy": "vaga aberta selecionada",
    "open-credit": "crédito compatível selecionado",
    "open-enrollment": "aluno encaixado selecionado",
    "edit-notes": "edição das observações aberta"
  };
  const attendanceOrder: AttendanceStatus[] = ["pending", "present", "warned", "no-show", "replacement"];
  const handleStudentStatus = (student: ClassDrawerStudent) => {
    const currentIndex = attendanceOrder.indexOf(student.status);
    const nextStatus = attendanceOrder[(currentIndex + 1) % attendanceOrder.length] ?? "pending";
    setStudents((current) => current.map((item) => item.id === student.id ? { ...item, status: nextStatus } : item));
    setCallState("calling");
    setAnnouncement(`Presença de ${student.name} alterada para ${nextStatus}`);
  };
  const handleDrawerAction = (action: ClassDrawerAction) => {
    if (action === "close") setCallOpen(false);
    if (action === "save-call") setCallState("saved");
    setAnnouncement(`Ação da chamada: ${agendaDrawerActionLabels[action]}`);
  };

  return (
    <>
      <CrmRightPanelPage
        activeNavId="agenda"
        activeSidebarId="agenda"
        avatarSrc={image79Avatar}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        main={<ClassOperationalDetail
            onAction={(action) => setAnnouncement(`Ação do detalhe: ${detailActionLabels[action]}`)}
            onStudentAction={(studentId) => setAnnouncement(`Opções do aluno abertas: ${studentId}`)}
            students={students}
          />}
        mainLabel="Detalhe operacional da aula"
        navItems={agendaClassNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderBreadcrumb={<Button leadingIcon="arrowLeft" onClick={() => setAnnouncement("Retorno para Agenda acionado")} size="sm" variant="secondary">Voltar para Agenda</Button>}
        pageHeaderActions={
          <ButtonGroup>
            <Button onClick={() => setAnnouncement("Aula salva")} size="sm" variant="secondary">Salvar aula</Button>
            <Button onClick={() => setAnnouncement("Aviso para a turma aberto")} size="sm" variant="secondary">Avisar turma</Button>
            <Button onClick={() => setAnnouncement("Agenda aberta")} size="sm" variant="secondary">Abrir agenda</Button>
            <Button leadingIcon="users" onClick={() => { setCallOpen(true); setCallState("calling"); setAnnouncement("Chamada aberta"); }} size="sm" variant="primary">Fazer chamada</Button>
          </ButtonGroup>
        }
        pageHeaderRhythm="stacked"
        panel={callOpen ? (
          <ClassDrawer
            ariaLabel="Chamada da aula"
            closeLabel="Fechar chamada"
            copilot={<><strong>Copiloto: Felipe avisou falta dentro da politica.</strong> Credito pode ser gerado.</>}
            onAction={handleDrawerAction}
            onClose={() => setCallOpen(false)}
            onStudentStatus={handleStudentStatus}
            primaryAction={{ label: "Salvar chamada", action: "save-call" }}
            secondaryActions={[
              { label: "Adicionar observacao", action: "add-note" },
              { label: "Criar tarefa", action: "create-task" },
              { label: "Corrigir depois", action: "correct-later" }
            ]}
            state={callState}
            students={students}
            subtitle="Terça 17h · Reformer Intermediário"
            title="Chamada"
          />
        ) : null}
        panelLabel="Painel de chamada"
        rightPanelState={callOpen ? undefined : "collapsed"}
        rightPanelVariant="class-operation"
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="terça, 13 maio"
        title="Terça 17h · Reformer Intermediário"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function AgendaClassesPage() {
  const [selectedClassId, setSelectedClassId] = useState("reformer");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [page, setPage] = useState(1);
  const selectedClass = classRows.find((row) => row.id === selectedClassId) ?? classRows[0]!;
  return (
    <>
      <CrmWorklistPage
        activeNavId="turmas"
        activeSidebarId="agenda"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <AgendaClassDrawer classRow={selectedClass} onAction={(action) => setAnnouncement(`Ação da turma: ${action}`)} onClose={() => setDrawerOpen(false)} /> : null}
        drawerPlacement="floating"
        drawerSize="compact"
        filterBar={<ClassesFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de turmas"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filas"
        mainLabel="Lista de turmas"
        navItems={agendaNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="overview"
        quickFilters={<ClassesQuickFilters onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana · Turmas recorrentes e vagas fixas"
        title="Turmas"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="main-priority"
      >
        <ClassesTable
          onInteraction={setAnnouncement}
          onPageChange={setPage}
          onRowSelect={(row) => {
            setSelectedClassId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Turma selecionada: ${row.id}`);
          }}
          page={page}
          selectedRowId={selectedClassId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function AgendaGradePage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState("ter-1700-reformer");
  const [announcement, setAnnouncement] = useState("");
  const selectedEvent = gradeWeeklyEvents.find((event) => event.id === selectedEventId) ?? gradeWeeklyEvents[0]!;
  return (
    <>
      <CrmWorklistPage
        activeNavId="grade"
        activeSidebarId="agenda"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <AgendaGradeDrawer event={selectedEvent} onAction={(action) => setAnnouncement(`Ação do bloco: ${action}`)} onClose={() => setDrawerOpen(false)} /> : null}
        drawerPlacement="floating"
        drawerSize="compact"
        filterBar={<GradeFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de grade"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Resumo estrutural"
        mainLabel="Semana-modelo"
        navItems={agendaNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        quickFilters={<GradeSummaryFilters onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
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
          onEventSelect={(eventId) => {
            setSelectedEventId(eventId);
            setDrawerOpen(true);
            setAnnouncement(`Bloco selecionado: ${eventId}`);
          }}
          selectedEventId={selectedEventId}
          times={gradeWeeklyTimes}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

function gradeEventTitle(event: WeeklyCalendarEvent) {
  if (typeof event.title === "string") return event.title.replace("Intermediario", "Intermediário");
  return "Bloqueio · Feriado municipal";
}

function gradeEventSchedule(event: WeeklyCalendarEvent) {
  const day = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"][event.dayIndex] ?? "Semana";
  const eventTime = typeof event.time === "string" ? event.time : "";
  const time = eventTime ? eventTime.replace(":00", "h") : event.status === "schedule-block" ? "14h" : "";
  return `${day} ${time}`.trim();
}

function AgendaGradeDrawer({ event, onAction, onClose }: { event: WeeklyCalendarEvent; onAction?: (action: ClassDrawerAction) => void; onClose?: () => void }) {
  const title = gradeEventTitle(event);
  const schedule = gradeEventSchedule(event);
  const [fixedSource = "0", capacitySource = "0"] = String(event.capacity ?? "0/0").split("/");
  const fixedStudents = Number.parseInt(fixedSource, 10) || 0;
  const capacity = Number.parseInt(capacitySource, 10) || 0;
  const vacancies = Math.max(capacity - fixedStudents, 0);
  const isBlock = event.status === "schedule-block" || event.status === "teacher-unavailable";
  const teacher = event.status === "teacher-unavailable" ? "A definir" : title.includes("Reformer") ? "João Silva" : title.includes("Pilates") ? "Mariana Lopes" : title === "Tower" || title === "Experimental" ? "Lucas Peres" : "Camila Rocha";
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
      copilot={<><strong>Copiloto: {isBlock ? "este bloqueio exige revisar aulas e alunos afetados." : `alterar este horário exige aviso para ${fixedStudents} alunos e revisa aulas futuras.`}</strong></>}
      eyebrow="Bloco recorrente"
      facts={[
        { id: "capacity", icon: "users", label: "Capacidade padrão", value: isBlock ? "-" : String(capacity) },
        { id: "students", icon: "users", label: "Alunos fixos", value: isBlock ? "-" : String(fixedStudents) },
        { id: "vacancy", icon: "tag", label: "Vaga fixa", value: isBlock ? "-" : String(vacancies) },
        { id: "teacher", icon: "user", label: "Professor (opcional)", value: <PersonLabel avatarSrc={teacher === "A definir" ? undefined : image79Avatar} name={teacher} size="xs" /> },
        { id: "resource", icon: "calendar", label: "Recurso / equipamento (opcional)", value: title.includes("Reformer") ? "Reformer 2" : isBlock ? "Agenda" : title }
      ]}
      impactItems={[
        { id: "schedule", icon: "users", label: `alterar horário afeta ${fixedStudents} alunos fixos` },
        { id: "capacity", icon: "graduation", label: "alterar capacidade afeta vagas futuras" },
        { id: "block", icon: "tag", label: "bloquear este horário afeta 3 aulas futuras" }
      ]}
      onAction={onAction}
      onClose={onClose}
      primaryAction={{ label: "Editar bloco", action: "edit-class" }}
      secondaryActions={[
        { label: "Abrir turma", action: "open-grid" },
        { label: "Ver aulas geradas", action: "open-schedule" },
        { label: "Criar bloqueio", action: "create-task" },
        { label: "Simular impacto", action: "move-student" },
        { label: "Pausar recorrencia", action: "pause-class" }
      ]}
      subtitle={isBlock ? "Bloqueio recorrente da semana-modelo." : `Gera aulas em ${schedule.toLowerCase()}.`}
      title={`${schedule} · ${title}`}
      upcomingClasses={[
        { id: "today", label: "hoje" },
        { id: "1905", label: "19/05" },
        { id: "2605", label: "26/05" }
      ]}
      variant="recurring-block"
    />
  );
}

function GradeFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "week", kind: "quick", label: "Semana-modelo", selected: true },
    { id: "teacher", label: "Professor", value: String(values.teacher ?? ""), options: [{ value: "joao", label: "Joao Silva" }, { value: "mariana", label: "Mariana Lopes" }] },
    { id: "class", label: "Turma", value: String(values.class ?? ""), options: [{ value: "reformer", label: "Reformer" }, { value: "pilates", label: "Pilates" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "ativa", label: "Ativa" }, { value: "lotada", label: "Lotada" }] },
    { id: "blocks", label: "Bloqueios", value: String(values.blocks ?? ""), options: [{ value: "active", label: "Ativos" }, { value: "teacher", label: "Professor indisponivel" }] }
  ];

  return (
    <PageFilterBar
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onInteraction("Criação de turma iniciada")} size="sm" variant="primary">Criar turma</Button>
          <Button leadingIcon="lock" onClick={() => onInteraction("Criação de bloqueio iniciada")} size="sm" variant="secondary">Criar bloqueio</Button>
        </ButtonGroup>
      }
      filters={filters}
      onFilterSelect={(filter) => onInteraction(`Filtro rápido da grade: ${filter.id}`)}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro da grade alterado: ${filter.id}`);
      }}
      searchVisible={false}
    />
  );
}

function GradeSummaryFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
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
      onSelect={(item) => { setSelectedId(item.id); onInteraction(`Resumo da grade: ${item.label}`); }}
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

function AgendaClassDrawer({ classRow, onAction, onClose }: { classRow: ClassRow; onAction?: (action: ClassDrawerAction) => void; onClose?: () => void }) {
  const fixedStudentCount = Number.parseInt(classRow.fixed, 10) || 0;
  const studentPool: ClassDrawerStudent[] = [
    ...agendaClassStudents,
    { id: "rafael", name: "Rafael Santos", initials: "RS", status: "pending" }
  ];
  const facts: ClassDrawerFact[] = [
    { id: "schedule", icon: "calendar", label: "Dia/horário recorrente", value: classRow.schedule },
    { id: "capacity", icon: "users", label: "Capacidade", value: classRow.capacity },
    { id: "teacher", icon: "user", label: "Professor da turma", value: <PersonLabel avatarSrc={classRow.teacher === "A definir" ? undefined : image79Avatar} name={classRow.teacher} size="xs" /> },
    { id: "resource", icon: "user", label: "Recurso / equipamento", value: classRow.name.includes("Reformer") ? "Reformer 2" : classRow.name },
    { id: "status", icon: "clock", label: "Status", value: <Chip tone={classRow.tone}>{classRow.status}</Chip>, tone: classRow.tone === "danger" ? "danger" : classRow.tone === "info" ? "info" : classRow.tone === "success" ? "success" : undefined }
  ];
  const upcomingClasses: ClassDrawerTimelineItem[] = [
    { id: "next", label: classRow.next },
    { id: "following", label: `Próxima recorrência · ${classRow.schedule}` },
    { id: "later", label: `Recorrência seguinte · ${classRow.schedule}` }
  ];
  const historyItems: ClassDrawerTimelineItem[] = [
    { id: "latest", label: classRow.change, meta: "Atualização mais recente", tone: classRow.tone === "danger" ? "danger" : "info" },
    { id: "capacity", label: `Capacidade ${classRow.capacity}`, meta: "Configuração atual", tone: "info" },
    { id: "teacher", label: `Professor: ${classRow.teacher}`, meta: "Responsável atual", tone: classRow.teacher === "A definir" ? "warning" : "success" }
  ];
  const isFull = classRow.vacancies === "Lotada";
  const availabilityNotice = isFull
    ? "Turma sem vagas fixas"
    : classRow.vacancies === "1 vaga"
      ? "1 vaga disponível"
      : `${classRow.vacancies} disponíveis`;
  const copilotAvailability = isFull
    ? "A turma está lotada; avalie a fila de interesse."
    : classRow.vacancies === "1 vaga"
      ? "Há 1 vaga fixa e oportunidades de preenchimento."
      : `Há ${classRow.vacancies} e oportunidades de preenchimento.`;

  return (
    <ClassDrawer
      ariaLabel="Detalhes da turma"
      audit="Operação manual sempre possível. O Copiloto apenas sugere impactos, vagas e ideias de mensagem."
      availabilityNotice={availabilityNotice}
      availabilityTone={isFull ? "warning" : "success"}
      closeLabel="Fechar turma"
      compact
      copilot={<><strong>Copiloto: {copilotAvailability}</strong></>}
      eyebrow="Turma selecionada"
      facts={facts}
      historyItems={historyItems}
      onAction={onAction}
      onClose={onClose}
      primaryAction={{ label: "Abrir agenda", action: "open-schedule" }}
      rosterHeading={`Alunos fixos (${fixedStudentCount})`}
      secondaryActions={[
        { label: "Abrir grade", action: "open-grid" },
        { label: "Mover aluno", action: "move-student" },
        { label: "Avisar turma", action: "notify-class" },
        { label: "Pausar turma", action: "pause-class" },
        { label: "Editar turma", action: "edit-class" }
      ]}
      students={studentPool.slice(0, fixedStudentCount)}
      subtitle={null}
      title={`${classRow.schedule} · ${classRow.name}`}
      upcomingClasses={upcomingClasses}
      variant="class-detail"
      warning={`Alterações nesta turma podem afetar as próximas recorrências de ${classRow.schedule}.`}
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

function ClassesTable({
  onInteraction,
  onPageChange,
  onRowSelect,
  page,
  selectedRowId = "reformer"
}: {
  onInteraction: (message: string) => void;
  onPageChange: (page: number) => void;
  onRowSelect?: (row: ClassRow) => void;
  page: number;
  selectedRowId?: string;
}) {
  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de turmas"
      columns={classColumns}
      pagination={{
        itemsPerPage: "10",
        label: page === 1 ? "1-6 de 18" : "7-12 de 18",
        page,
        pageCount: 2,
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => { const nextPage = Math.min(page + 1, 2); onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); },
        onPageChange: (nextPage) => { onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); },
        onPreviousPage: () => { const nextPage = Math.max(page - 1, 1); onPageChange(nextPage); onInteraction(`Página selecionada: ${nextPage}`); }
      }}
      rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.name}`} onClick={(event) => { event.stopPropagation(); onInteraction(`Menu da turma: ${row.id}`); }} size="sm" variant="ghost" />}
      rows={classRows}
      onRowSelect={onRowSelect}
      selectedRowId={selectedRowId}
    />
  );
}

function ClassesFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
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
      actions={<Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onInteraction("Criação de turma iniciada")} size="sm" variant="primary">Criar turma</Button>}
      filters={filters}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de turmas alterado: ${filter.id}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onInteraction(`Busca de turmas: ${value || "limpa"}`);
      }}
      onSearchFilter={() => onInteraction("Filtros de busca de turmas abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de turmas"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar turma ou aluno..."
    />
  );
}

function ClassesQuickFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("available");
  const items: PageQuickFilterItem[] = [
    { id: "available", label: "Com vagas", icon: "users", count: "12", selected: selectedId === "available" },
    { id: "full", label: "Lotadas", icon: "alert", count: "6", tone: "danger", selected: selectedId === "full" },
    { id: "teacher", label: "Professor a definir", icon: "user", count: "3", tone: "warning", selected: selectedId === "teacher" },
    { id: "paused", label: "Pausadas", icon: "clock", count: "2", selected: selectedId === "paused" },
    { id: "changed", label: "Alteradas recentemente", icon: "refresh", count: "8", tone: "info", selected: selectedId === "changed" }
  ];

  return <PageQuickFilters groupLabel="Filas de turmas" heading="Filas" items={items} onSelect={(item) => { setSelectedId(item.id); onInteraction(`Fila de turmas: ${item.label}`); }} selectionTone="soft" />;
}

function AgendaFilters({ onAction, onViewChange, onWeekChange, view, weekLabel, weekOffset }: {
  onAction: (message: string) => void;
  onViewChange: (view: "day" | "week") => void;
  onWeekChange: (offset: number) => void;
  view: "day" | "week";
  weekLabel: string;
  weekOffset: number;
}) {
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
        <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onAction("Criação de aula aberta")} size="sm" variant="primary">Criar aula</Button>
      }
      leadingActions={
        <ButtonGroup>
          <Button aria-pressed={view === "day"} onClick={() => onViewChange("day")} size="sm" variant={view === "day" ? "primary" : "secondary"}>Dia</Button>
          <Button aria-pressed={view === "week"} onClick={() => onViewChange("week")} size="sm" variant={view === "week" ? "primary" : "secondary"}>Semana</Button>
          <IconButton disabled={weekOffset <= -1} icon="chevronLeft" label="Semana anterior" onClick={() => onWeekChange(weekOffset - 1)} size="sm" variant="default" />
          <IconButton disabled={weekOffset >= 1} icon="chevronRight" label="Proxima semana" onClick={() => onWeekChange(weekOffset + 1)} size="sm" variant="default" />
          <Button onClick={() => onWeekChange(0)} size="sm" variant="secondary">Hoje</Button>
          <span aria-label="Intervalo atual">{weekLabel}</span>
        </ButtonGroup>
      }
      filters={filters}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onAction(`Filtro ${filter.label}: ${String(value) || "todos"}`);
      }}
      searchVisible={false}
    />
  );
}

const agendaSideItems = [
  { id: "today", label: "Hoje", count: "18", icon: "calendar" as const },
  { id: "pending", label: "Chamada pendente", count: "6", icon: "clock" as const, tone: "warning" as const },
  { id: "available", label: "Vagas abertas", count: "4", icon: "checkCircle" as const, tone: "info" as const },
  { id: "conflicts", label: "Conflitos", count: "2", icon: "alert" as const, tone: "danger" as const },
  { id: "replacements", label: "Reposicoes", count: "3", icon: "refresh" as const }
];

function AgendaSidePanel({ monthLabel, onAction, onMonthChange, onSelectDay, selectedDay }: {
  monthLabel: string;
  onAction: (message: string) => void;
  onMonthChange: (offset: number) => void;
  onSelectDay: (day: string) => void;
  selectedDay: string;
}) {
  const [selectedQueue, setSelectedQueue] = useState("today");
  const monthOffset = monthLabel === "abril 2024" ? -1 : monthLabel === "junho 2024" ? 1 : 0;
  return (
    <Panel>
      <MiniCalendar
        monthLabel={monthLabel}
        onNextMonth={() => onMonthChange(Math.min(monthOffset + 1, 1))}
        onPreviousMonth={() => onMonthChange(Math.max(monthOffset - 1, -1))}
        onSelect={onSelectDay}
        selected={selectedDay}
      />
      <h3>Agenda</h3>
      <List divided>
        {agendaSideItems.map((item) => (
          <ListItem
            action={<Chip>{item.count}</Chip>}
            key={item.id}
            leading={<Icon name={item.icon} tone={item.tone} />}
            onClick={() => {
              setSelectedQueue(item.id);
              onAction(`Fila selecionada: ${item.label}`);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedQueue(item.id);
                onAction(`Fila selecionada: ${item.label}`);
              }
            }}
            role="button"
            selected={selectedQueue === item.id}
            tabIndex={0}
            title={item.label}
          />
        ))}
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
