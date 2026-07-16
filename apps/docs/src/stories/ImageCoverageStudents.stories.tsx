import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  CrmRightPanelPage,
  CrmWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  ProfileTabs,
  StudentDrawer,
  StudentHeader,
  StudentProfileActionRail,
  StudentProfileOverviewGrid,
  StudentTable,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem,
  StudentDrawerAction,
  StudentDrawerClassItem,
  StudentDrawerFact,
  StudentDrawerPendingItem,
  StudentTableRow
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source28AnaPaula from "../assets/source28-ana-paula.png";
import source34GabrielLima from "../assets/source34-gabriel-lima.png";
import source34JulianaRocha from "../assets/source34-juliana-rocha.png";

const studentsNavItems: CrmShellNavItem[] = [
  { id: "alunos", label: "Alunos", active: true },
  { id: "responsaveis", label: "Responsaveis" },
  { id: "contatos", label: "Contatos" },
  { id: "segmentos", label: "Segmentos" },
  { id: "linha-tempo", label: "Linha do tempo" }
];

const meta = {
  title: "CRM / Image Coverage / Alunos",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage das imagens da pagina Alunos. As composicoes usam shell, PageFilterBar, PageQuickFilters, StudentTable, StudentDrawer e perfil oficial; status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

function PageStack({ children }: { children: ReactNode }) {
  return <div className="tcrm-page-family-stack">{children}</div>;
}

const studentRows: StudentTableRow[] = [
  {
    id: "ana-paula",
    student: { name: "Ana Paula Martins", avatarSrc: source28AnaPaula },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "mensagem hoje", status: "info" },
    selected: true
  },
  {
    id: "joao-pedro",
    student: { name: "Joao Pedro Silva", avatarSrc: source13JoaoPedro },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "6/10",
    finance: "pending",
    risk: "medium",
    activity: { label: "contrato atualizado", status: "info" }
  },
  {
    id: "carla-mendes",
    student: { name: "Carla Mendes", avatarSrc: source28AnaPaula },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "3/10",
    finance: "ok",
    risk: "high",
    activity: { label: "14 dias sem aula", status: "danger" }
  },
  {
    id: "pedro-henrique",
    student: { name: "Pedro Henrique", avatarSrc: source13JoaoPedro },
    status: "noClass",
    plan: "Experimental",
    currentClass: "-",
    owner: "Rafael Torres",
    presence: "-",
    finance: "pending",
    risk: "medium",
    activity: { label: "veio do WhatsApp", status: "info" }
  },
  {
    id: "juliana-rocha",
    student: { name: "Juliana Rocha", avatarSrc: source34JulianaRocha },
    status: "inactive",
    plan: "Plano pausado",
    currentClass: "Pilates Solo",
    owner: "proprio",
    presence: "0/10",
    finance: "ok",
    risk: "low",
    activity: { label: "pausa ate 30/05", status: "update" }
  },
  {
    id: "mariana-costa",
    student: { name: "Mariana Costa", avatarSrc: source28AnaPaula },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Luana Alves",
    presence: "9/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "lucas-oliveira",
    student: { name: "Lucas Oliveira", avatarSrc: source13JoaoPedro },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "7/10",
    finance: "ok",
    risk: "low",
    activity: { label: "check-in hoje", status: "info" }
  },
  {
    id: "fernanda-souza",
    student: { name: "Fernanda Souza", avatarSrc: source28AnaPaula },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "4/10",
    finance: "pending",
    risk: "high",
    activity: { label: "cobranca enviada", status: "danger" }
  },
  {
    id: "gabriel-santos",
    student: { name: "Gabriel Santos", avatarSrc: source34GabrielLima },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Pilates Solo",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "patricia-lima",
    student: { name: "Patricia Lima", avatarSrc: source28AnaPaula },
    status: "active",
    plan: "Premium",
    currentClass: "Reformer Avancado",
    owner: "Luana Alves",
    presence: "10/10",
    finance: "ok",
    risk: "low",
    activity: { label: "feedback registrado", status: "info" }
  }
];

function StudentsPageContent({
  selectedSegmentId,
  selectedStudentId,
  filterValues,
  query,
  pageLabel,
  onSegmentSelect,
  onStudentSelect,
  onFilterValueChange,
  onSearchChange,
  onAdvancedFilters,
  onCreateStudent,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  onInteraction,
  drawer
}: {
  selectedSegmentId: string;
  selectedStudentId: string;
  filterValues: Record<string, string | string[]>;
  query: string;
  pageLabel: string;
  onSegmentSelect: (item: PageQuickFilterItem) => void;
  onStudentSelect: (row: StudentTableRow) => void;
  onFilterValueChange: (filter: PageFilterBarFilter, value: string | string[]) => void;
  onSearchChange: (value: string) => void;
  onAdvancedFilters: () => void;
  onCreateStudent: () => void;
  onItemsPerPageClick: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onInteraction: (message: string) => void;
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
          { value: "ativa", label: "Ativa", icon: "checkCircle" },
          { value: "risco", label: "Em risco", icon: "alert" },
          { value: "inativa", label: "Inativa", icon: "pause" }
        ]
      },
      {
        id: "plan",
        label: "Plano",
        kind: "single",
        value: typeof filterValues.plan === "string" ? filterValues.plan : "",
        options: [
          { value: "mensal", label: "Plano Mensal", icon: "creditCard" },
          { value: "premium", label: "Premium", icon: "star" },
          { value: "trimestral", label: "Trimestral", icon: "calendar" }
        ]
      },
      {
        id: "class",
        label: "Turma",
        kind: "single",
        value: typeof filterValues.class === "string" ? filterValues.class : "",
        options: [
          { value: "reformer", label: "Reformer", icon: "graduation" },
          { value: "mat", label: "Mat Pilates", icon: "graduation" },
          { value: "funcional", label: "Funcional", icon: "graduation" }
        ]
      },
      {
        id: "risk",
        label: "Risco",
        kind: "single",
        value: typeof filterValues.risk === "string" ? filterValues.risk : "",
        options: [
          { value: "baixo", label: "Baixo", icon: "checkCircle" },
          { value: "medio", label: "Medio", icon: "alertCircle" },
          { value: "alto", label: "Alto", icon: "alert" }
        ]
      },
      {
        id: "owner",
        label: "Responsavel",
        kind: "single",
        value: typeof filterValues.owner === "string" ? filterValues.owner : "",
        options: [
          { value: "camila", label: "Camila Martins", icon: "user" },
          { value: "nikki", label: "Nikki Olaw", icon: "user" },
          { value: "luana", label: "Luana Alves", icon: "user" }
        ]
      }
    ],
    [filterValues]
  );
  const segmentItems = useMemo<PageQuickFilterItem[]>(
    () => [
      { id: "all", label: "Todos", count: "154", icon: "user", selected: selectedSegmentId === "all" },
      { id: "active", label: "Ativos", count: "112", icon: "checkCircle", selected: selectedSegmentId === "active" },
      { id: "risk", label: "Em risco", count: "18", icon: "alert", selected: selectedSegmentId === "risk", tone: "danger" },
      { id: "pending", label: "Pendencias", count: "12", icon: "alertCircle", selected: selectedSegmentId === "pending" },
      { id: "no-class", label: "Sem turma", count: "9", icon: "refresh", selected: selectedSegmentId === "no-class" },
      { id: "finance", label: "Financeiro pendente", count: "11", icon: "coins", selected: selectedSegmentId === "finance" },
      { id: "consent", label: "Consentimento pendente", count: "7", icon: "shieldCheck", selected: selectedSegmentId === "consent" },
      { id: "inactive", label: "Inativos", count: "21", icon: "clock", selected: selectedSegmentId === "inactive" }
    ],
    [selectedSegmentId]
  );
  const rows = useMemo<StudentTableRow[]>(
    () => studentRows.map((row) => ({ ...row, selected: row.id === selectedStudentId })),
    [selectedStudentId]
  );

  return (
    <CrmWorklistPage
      activeNavId="alunos"
      activeSidebarId="equipe"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-students-shell"
      contentClassName="sb-image-coverage-students-content"
      contentLayout="main-priority"
      drawer={drawer}
      drawerPlacement="floating"
      drawerSize="compact"
      globalActions={{
        onAvatar: () => onInteraction("Perfil da operadora aberto"),
        onMessages: () => onInteraction("Mensagens abertas"),
        onNotifications: () => onInteraction("Notificações abertas"),
        onSearch: () => onInteraction("Busca global aberta")
      }}
      navItems={studentsNavItems}
      onBack={() => onInteraction("Navegação de retorno acionada")}
      onNavChange={(id) => onInteraction(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => onInteraction(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => onInteraction(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="compact-stacked"
      sidebarItems={crmEmptyShellSidebarItems}
      showGlobalActionsWithDrawer
      stageClassName="sb-image-coverage-students-stage"
      subtitle="Base ativa do estudio"
      title="Alunos"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="compact-rail"
      worklistHeightMode="tall"
      filterBar={
        <PageFilterBar
          aria-label="Filtros de alunos"
          density="compact"
          actions={
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={onCreateStudent} variant="primary">
              Novo aluno
            </Button>
          }
          filters={filters}
          advancedFiltersDescription="Use para risco e responsavel quando a pagina tiver muitos filtros de alunos."
          advancedFiltersLabel="Mais filtros de alunos"
          advancedFiltersSurface="modal"
          advancedFiltersTitle="Filtros de alunos"
          onFilterValueChange={onFilterValueChange}
          onSearchChange={onSearchChange}
          onSearchFilter={onAdvancedFilters}
          query={query}
          searchAriaLabel="Buscar alunos"
          searchFilterLabel="Abrir filtros avancados"
          searchFilterPlacement="embedded"
          searchPlaceholder="Buscar alunos..."
        />
      }
      filterBarLabel="Filtros de alunos"
      listLabel="Segmentos"
      mainLabel="Tabela de alunos"
      quickFilters={
        <PageQuickFilters
          aria-label="Segmentos"
          groupLabel="Segmentos de alunos"
          heading="Segmentos"
          items={segmentItems}
          onSelect={onSegmentSelect}
          selectionTone="soft"
        />
      }
    >
      <StudentTable
        density="compact"
        pageLabel={pageLabel}
        rows={rows}
        selectionTone="soft"
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onStudentSelect}
      />
    </CrmWorklistPage>
  );
}

const studentStatusLabels: Record<StudentTableRow["status"], string> = {
  active: "Ativa",
  inactive: "Inativa",
  noClass: "Sem turma",
  risk: "Em risco"
};

const studentDrawerActionLabels: Record<StudentDrawerAction, string> = {
  close: "fechar",
  "open-profile": "abrir perfil",
  message: "enviar mensagem",
  "create-task": "criar tarefa",
  note: "registrar nota",
  "update-data": "atualizar dados"
};

export function StudentsShell() {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedSegmentId, setSelectedSegmentId] = useState("all");
  const [selectedStudentId, setSelectedStudentId] = useState("ana-paula");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [pageLabel, setPageLabel] = useState("1-10 de 154");
  const [announcement, setAnnouncement] = useState("");
  const selectedStudent = studentRows.find((row) => row.id === selectedStudentId) ?? studentRows[0]!;
  const selectedFacts: StudentDrawerFact[] = [
    { id: "plan", icon: "calendar", label: "Plano atual", value: selectedStudent.plan },
    { id: "class", icon: "users", label: "Turma atual", value: selectedStudent.currentClass },
    { id: "owner", icon: "users", label: "Responsável principal", value: selectedStudent.owner },
    { id: "phone", icon: "phone", label: "WhatsApp / Telefone", value: "(11) 98765-4321" },
    { id: "consent", icon: "checkCircle", label: "Consentimento", value: selectedStudent.status === "inactive" ? "Revisão necessária" : "WhatsApp permitido / contrato assinado", tone: selectedStudent.status === "inactive" ? "warning" : "success" }
  ];
  const selectedClasses: StudentDrawerClassItem[] = selectedStudent.status === "noClass" ? [] : [
    { id: "next-one", title: "Qui, 15/05 · 07:00", subtitle: selectedStudent.currentClass, badge: "Aula" },
    { id: "next-two", title: "Sex, 17/05 · 07:00", subtitle: selectedStudent.currentClass, badge: "Aula" }
  ];
  const selectedPending: StudentDrawerPendingItem[] = selectedStudent.status === "active"
    ? [{ id: "emergency", label: "Atualizar contato de emergência" }]
    : [
        { id: "review", label: `Revisar situação: ${studentStatusLabels[selectedStudent.status]}` },
        { id: "follow-up", label: "Criar acompanhamento com responsável" }
      ];

  const drawerNode = drawerOpen ? (
    <StudentDrawer
      avatarSrc={selectedStudent.student.avatarSrc}
      className="sb-image-coverage-students-drawer"
      classes={selectedClasses}
      facts={selectedFacts}
      name={selectedStudent.student.name}
      onAction={(action) => setAnnouncement(`Ação do aluno: ${studentDrawerActionLabels[action]}`)}
      onClose={() => {
        setDrawerOpen(false);
        setAnnouncement("Resumo do aluno fechado");
      }}
      pendingItems={selectedPending}
      state={selectedStudent.status === "risk" ? "risk" : "active"}
      statusLabel={studentStatusLabels[selectedStudent.status]}
    />
  ) : null;

  return (
    <>
      <StudentsPageContent
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedSegmentId={selectedSegmentId}
      selectedStudentId={selectedStudentId}
      onAdvancedFilters={() => {
        setFilterValues((current) => ({ ...current, risk: "alto", owner: "camila", status: "risco" }));
        setAnnouncement("Filtros avançados aplicados");
      }}
      onCreateStudent={() => setAnnouncement("Cadastro de novo aluno aberto")}
      onFilterValueChange={(filter, value) => {
        setFilterValues((current) => ({ ...current, [filter.id]: value }));
        setAnnouncement(`Filtro ${filter.label}: ${String(value) || "todos"}`);
      }}
      onInteraction={setAnnouncement}
      onItemsPerPageClick={() => {
        setPageLabel("1-25 de 154");
        setAnnouncement("25 alunos por página");
      }}
      onNextPage={() => {
        setPageLabel("11-20 de 154");
        setAnnouncement("Próxima página de alunos");
      }}
      onPreviousPage={() => {
        setPageLabel("1-10 de 154");
        setAnnouncement("Página anterior de alunos");
      }}
      onSearchChange={(value) => {
        setQuery(value);
        setAnnouncement(value ? `Busca de alunos: ${value}` : "Busca de alunos limpa");
      }}
      onSegmentSelect={(item) => {
        setSelectedSegmentId(item.id);
        setAnnouncement(`Segmento selecionado: ${item.label}`);
      }}
      onStudentSelect={(row) => {
        setSelectedStudentId(row.id);
        setDrawerOpen(true);
        setAnnouncement(`Aluno selecionado: ${row.student.name}`);
      }}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function StudentProfilePage() {
  return (
    <CrmRightPanelPage
      activeNavId="alunos"
      activeSidebarId="equipe"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-students-shell"
      contentHeader={<StudentHeader avatarSrc={source28AnaPaula} />}
      contentHeaderLabel="Identificacao e acoes do aluno"
      contentClassName="sb-image-coverage-students-content"
      main={
        <PageStack>
          <ProfileTabs density="compact" showPanel={false} />
          <StudentProfileOverviewGrid density="compact" />
        </PageStack>
      }
      mainGridColumns={1}
      mainLabel="Resumo operacional do aluno"
      navItems={[
        { id: "alunos", label: "Alunos" },
        { id: "contatos", label: "Contatos" },
        { id: "segmentos", label: "Segmentos" },
        { id: "linha", label: "Linha do tempo" }
      ]}
      panel={<StudentProfileActionRail density="compact" />}
      panelLabel="Acoes e relacionamento do aluno"
      regions={{ pageHeader: false }}
      rightPanelVariant="student-profile"
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-students-stage"
      title="Ana Paula Martins"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    />
  );
}

export const Image27ListaPerfilResumido: Story = {
  name: "27 lista perfil resumido",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 27_round-4.1E_alunos_01_lista-perfil-resumido.png.png. Variante oficial da familia Alunos para lista com drawer resumido."
      }
    },
    sourceImage: "27_round-4.1E_alunos_01_lista-perfil-resumido.png.png"
  },
  render: () => <StudentsShell />
};

export const Image28AlunoPerfilResumoOperacional: Story = {
  name: "28 aluno perfil resumo operacional",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png. Variante oficial da familia Alunos para perfil operacional."
      }
    },
    sourceImage: "28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png"
  },
  render: () => <StudentProfilePage />
};
