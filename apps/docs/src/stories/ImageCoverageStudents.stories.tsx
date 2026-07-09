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
  StudentSummary,
  StudentTable,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  CrmShellNavItem,
  PageFilterBarFilter,
  PageQuickFilterItem,
  StudentTableRow
} from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, List, ListItem, Panel } from "@taliya/ui";

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
      navItems={studentsNavItems}
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-students-stage"
      subtitle="Base ativa do estudio"
      title="Alunos"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistClassName="sb-image-coverage-students-page"
      worklistLayoutMode="main-priority"
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
        />
      }
    >
      <StudentTable
        pageLabel={pageLabel}
        rows={rows}
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onStudentSelect}
      />
    </CrmWorklistPage>
  );
}

export function StudentsShell() {
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [selectedSegmentId, setSelectedSegmentId] = useState("all");
  const [selectedStudentId, setSelectedStudentId] = useState("ana-paula");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [pageLabel, setPageLabel] = useState("1-10 de 154");

  const drawerNode = drawerOpen ? (
    <StudentDrawer
      avatarSrc={source28AnaPaula}
      className="sb-image-coverage-students-drawer"
      onAction={(action) => {
        if (action === "message") setQuery("whatsapp");
        if (action === "create-task") setFilterValues((current) => ({ ...current, status: "risco" }));
        if (action === "update-data") setPageLabel("1-10 de 154");
      }}
      onClose={() => setDrawerOpen(false)}
    />
  ) : null;

  return (
    <StudentsPageContent
      drawer={drawerNode}
      filterValues={filterValues}
      pageLabel={pageLabel}
      query={query}
      selectedSegmentId={selectedSegmentId}
      selectedStudentId={selectedStudentId}
      onAdvancedFilters={() => setFilterValues((current) => ({ ...current, risk: "alto", owner: "camila", status: "risco" }))}
      onCreateStudent={() => setQuery("novo aluno")}
      onFilterValueChange={(filter, value) => setFilterValues((current) => ({ ...current, [filter.id]: value }))}
      onItemsPerPageClick={() => setPageLabel("1-25 de 154")}
      onNextPage={() => setPageLabel("11-20 de 154")}
      onPreviousPage={() => setPageLabel("1-10 de 154")}
      onSearchChange={setQuery}
      onSegmentSelect={(item) => setSelectedSegmentId(item.id)}
      onStudentSelect={(row) => {
        setSelectedStudentId(row.id);
        setDrawerOpen(true);
      }}
    />
  );
}

function StudentProfileMain() {
  return (
    <div className="sb-image-coverage-student-profile-main">
      <StudentSummary />
      <Panel title="2. Agenda próxima">
        <List>
          <ListItem title="Reformer Iniciante" meta="Qui 15/05 · 07:00" leading={<Icon name="calendar" tone="info" />}><Chip tone="info">Marcada</Chip></ListItem>
          <ListItem title="Reformer Iniciante" meta="Sex 17/05 · 07:00" leading={<Icon name="calendar" tone="info" />}><Chip tone="info">Marcada</Chip></ListItem>
          <ListItem title="Reposição pendente" meta="1 aula disponível" leading={<Icon name="clipboard" tone="warning" />}><Chip tone="warning">Pendente</Chip></ListItem>
        </List>
        <Button size="sm" trailingIcon="arrowRight" variant="ghost">Ver agenda</Button>
      </Panel>
      <Panel title="3. Plano e financeiro">
        <List>
          <ListItem title="Plano atual" meta="Plano Mensal" leading={<Icon name="creditCard" />}><Chip tone="success">Ativo</Chip></ListItem>
          <ListItem title="Próxima mensalidade" meta="10/06/2024 · R$ 199,00" leading={<Icon name="coins" />} />
          <ListItem title="Status financeiro" meta="Pagamento pendente desde 05/04" leading={<Icon name="alert" tone="warning" />}><Chip tone="warning">pagamento pendente</Chip></ListItem>
        </List>
        <Button size="sm" trailingIcon="arrowRight" variant="ghost">Ver financeiro</Button>
      </Panel>
      <Panel title="4. Pendências">
        <List>
          <ListItem title="Atualizar contato de emergência" meta="Dados cadastrais" leading={<Icon name="user" />} />
          <ListItem title="Confirmar disponibilidade para aula extra" meta="Agenda" leading={<Icon name="calendar" />} />
          <ListItem title="Pagamento pendente" meta="Financeiro" leading={<Icon name="coins" tone="warning" />} />
        </List>
        <Button size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas pendências</Button>
      </Panel>
      <Panel title="5. Notas recentes">
        <List>
          <ListItem title="Aluna pediu opção de reposição para próxima semana." meta="Sam Frank · 12/05/2024 14:32" leading={<Icon name="clipboard" tone="info" />} />
          <ListItem title="Relatou leve desconforto no ombro direito." meta="Nikki Olaw · 09/05/2024 10:15" leading={<Icon name="message" tone="info" />} />
        </List>
        <Button size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas notas</Button>
      </Panel>
      <Panel title="6. Linha do tempo curta">
        <List>
          <ListItem title="Mensagem via WhatsApp" meta="12/05/2024 14:32 · Por Sam Frank" leading={<Icon name="whatsapp" tone="success" />}>Enviou lembrete da aula de quinta.</ListItem>
          <ListItem title="Aula realizada" meta="10/05/2024 07:00 · Reformer Iniciante" leading={<Icon name="checkCircle" tone="info" />}>Presença registrada.</ListItem>
          <ListItem title="Pagamento recebido" meta="05/04/2024 10:32 · R$ 199,00" leading={<Icon name="coins" tone="success" />}>Plano Mensal.</ListItem>
        </List>
        <Button size="sm" trailingIcon="arrowRight" variant="ghost">Ver linha do tempo completa</Button>
      </Panel>
    </div>
  );
}

function StudentProfileRail() {
  return (
    <div className="sb-image-coverage-student-profile-rail">
      <Panel title="Próximas ações">
        <List>
          <ListItem title="Aula marcada" meta="Qui, 15/05 · 07:00" leading={<Icon name="calendar" tone="info" />}><Chip tone="info">Reformer Iniciante</Chip></ListItem>
          <ListItem title="Repor aula pendente" meta="1 aula disponível" leading={<Icon name="refresh" tone="warning" />}><Chip tone="warning">Pendente</Chip></ListItem>
          <ListItem title="Pagamento pendente" meta="R$ 199,00" leading={<Icon name="coins" tone="success" />}><Chip tone="warning">Atenção</Chip></ListItem>
        </List>
      </Panel>
      <Panel title="Riscos / alertas">
        <List>
          <ListItem title="Financeiro em atraso" meta="Pagamento pendente desde 05/04" leading={<Icon name="shield" tone="warning" />}><Chip tone="warning">Atenção</Chip></ListItem>
          <ListItem title="Frequência estável" meta="8 de 10 aulas (80%)" leading={<Icon name="checkCircle" tone="success" />}><Chip tone="success">Bom</Chip></ListItem>
        </List>
      </Panel>
      <Panel title="Tarefas abertas">
        <List>
          <ListItem title="Confirmar disponibilidade para aula extra" meta="Criada por Nikki Olaw · 02/05" leading={<Icon name="checkCircle" />}><Chip tone="info">Pendente</Chip></ListItem>
          <ListItem title="Atualizar contato de emergência" meta="Criada por Sam Frank · 28/04" leading={<Icon name="checkCircle" />}><Chip tone="info">Pendente</Chip></ListItem>
        </List>
      </Panel>
      <Panel title="Última conversa">
        <List>
          <ListItem title="WhatsApp · 12/05/2024 14:32" meta="Você: Oi Ana Paula! Lembrando da sua aula..." leading={<Icon name="whatsapp" tone="success" />}>Ana Paula: Perfeito, obrigada pelo lembrete!</ListItem>
        </List>
      </Panel>
      <Panel title="Ações rápidas">
        <ButtonGroup>
          <Button leadingIcon="message" variant="secondary">Enviar mensagem</Button>
          <Button leadingIcon="calendar" variant="secondary">Criar tarefa</Button>
          <Button leadingIcon="creditCard" variant="secondary">Alterar plano</Button>
          <Button leadingIcon="pause" variant="secondary">Pausar aluno</Button>
        </ButtonGroup>
      </Panel>
    </div>
  );
}

export function StudentProfilePage() {
  return (
    <CrmRightPanelPage
      activeNavId="alunos"
      activeSidebarId="equipe"
      avatarSrc={image79Avatar}
      className="sb-image-coverage-students-shell"
      contentClassName="sb-image-coverage-students-content"
      main={
        <PageStack>
          <StudentHeader avatarSrc={source28AnaPaula} />
          <ProfileTabs showPanel={false} />
          <StudentProfileMain />
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
      panel={<StudentProfileRail />}
      panelLabel="Acoes e relacionamento do aluno"
      sidebarItems={crmEmptyShellSidebarItems}
      stageClassName="sb-image-coverage-students-stage"
      subtitle="Resumo operacional do aluno"
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

