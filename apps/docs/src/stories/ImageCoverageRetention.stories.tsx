import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  CaseDrawer,
  CrmWorklistTable,
  CrmWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CaseDrawerFact, CaseDrawerFooterAction, CaseDrawerHistoryItem, CaseDrawerSection, CrmShellNavItem, PageFilterBarFilter, PageQuickFilterItem } from "@taliya/crm";
import { Chip, Icon, IconButton, InlineGroup, PersonLabel } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Retencao",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Retencao. As paginas usam o padrao estrutural Worklist / Table + quick filters + drawer com componentes oficiais da biblioteca."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const retentionNavItems: CrmShellNavItem[] = [
  { id: "riscos", label: "Riscos" },
  { id: "cancelamentos", label: "Cancelamentos" },
  { id: "reativacoes", label: "Reativacoes" },
  { id: "reclamacoes", label: "Reclamacoes" }
];

export function RetentionRiskListPage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedRisk = retentionRiskRows.find((row) => row.id === selectedRowId) ?? retentionRiskRows[0]!;

  return (
    <>
      <CrmWorklistPage
        activeNavId="riscos"
        activeSidebarId="retencao"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <RetentionRiskDrawer risk={selectedRisk} onAction={(action) => setAnnouncement(`Ação do risco: ${action}`)} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de risco fechado"); }} /> : null}
        filterBar={<RetentionRiskFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de retencao"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Segmentos"
        mainLabel="Tabela de riscos"
        navItems={retentionNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        quickFilters={<RetentionRiskQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Alunos em risco e proximas acoes"
        title="Retencao"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="wide-rail"
      >
        <RetentionRiskTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedRowId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Risco selecionado: ${row.student}`);
          }}
          selectedRowId={selectedRowId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function RetentionCancellationQueuePage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedCancellation = cancellationRows.find((row) => row.id === selectedRowId) ?? cancellationRows[0]!;

  return (
    <>
      <CrmWorklistPage
        activeNavId="cancelamentos"
        activeSidebarId="retencao"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <CancellationDrawer cancellation={selectedCancellation} onAction={(action) => setAnnouncement(`Ação de cancelamento: ${action}`)} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de cancelamento fechado"); }} /> : null}
        drawerPlacement="chrome"
        filterBar={<CancellationFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de cancelamentos"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filas"
        mainLabel="Tabela de cancelamentos"
        navItems={retentionNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        quickFilters={<CancellationQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Pedidos de saida, pausas e planos de salvamento"
        title="Cancelamentos"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="wide-rail"
      >
        <CancellationTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedRowId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Cancelamento selecionado: ${row.student}`);
          }}
          selectedRowId={selectedRowId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function RetentionReactivationListPage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedReactivation = reactivationRows.find((row) => row.id === selectedRowId) ?? reactivationRows[0]!;

  return (
    <>
      <CrmWorklistPage
        activeNavId="reativacoes"
        activeSidebarId="retencao"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <ReactivationDrawer onAction={(action) => setAnnouncement(`Ação de reativação: ${action}`)} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de reativação fechado"); }} reactivation={selectedReactivation} /> : null}
        drawerPlacement="chrome"
        filterBar={<ReactivationFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de reativacoes"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filas"
        mainLabel="Tabela de reativacoes"
        navItems={retentionNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        quickFilters={<ReactivationQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Ex-alunos e alunos pausados com chance de retorno."
        title="Reativacoes"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="wide-rail"
      >
        <ReactivationTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedRowId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Reativação selecionada: ${row.student}`);
          }}
          selectedRowId={selectedRowId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function RetentionComplaintQueuePage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedComplaint = complaintRows.find((row) => row.id === selectedRowId) ?? complaintRows[0]!;

  return (
    <>
      <CrmWorklistPage
        activeNavId="reclamacoes"
        activeSidebarId="retencao"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <ComplaintDrawer complaint={selectedComplaint} onAction={(action) => setAnnouncement(`Ação da reclamação: ${action}`)} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de reclamação fechado"); }} /> : null}
        drawerPlacement="chrome"
        filterBar={<ComplaintFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de reclamacoes"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filas"
        mainLabel="Tabela de reclamacoes"
        navItems={retentionNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        quickFilters={<ComplaintQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Casos sensiveis, respostas e recuperacao de confianca"
        title="Reclamacoes"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        worklistLayoutMode="wide-rail"
      >
        <ComplaintTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedRowId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Reclamação selecionada: ${row.student}`);
          }}
          selectedRowId={selectedRowId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

function RetentionRiskFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: selectedQuickId === "month" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "risk", label: "Risco", value: String(values.risk ?? ""), options: [{ value: "high", label: "Alto" }, { value: "medium", label: "Medio" }, { value: "low", label: "Baixo" }] },
    { id: "class", label: "Turma", value: String(values.class ?? ""), options: [{ value: "reformer", label: "Reformer iniciante" }, { value: "solo", label: "Pilates solo" }] },
    { id: "plan", label: "Plano", value: String(values.plan ?? ""), options: [{ value: "monthly", label: "Plano mensal" }, { value: "2x", label: "Plano 2x/semana" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "recepcao", label: "Recepcao" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de retencao"
      filters={filters}
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período de retenção selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de retenção alterado: ${filter.id}`);
      }}
      onSearchChange={() => undefined}
      onSearchFilter={() => onInteraction("Configuração de filtros de retenção aberta")}
      query=""
      searchFilterLabel="Abrir filtros de retencao"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar aluno em risco"
      searchVisible={false}
    />
  );
}

function RetentionRiskQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todos", icon: "user", count: "48", selected: selectedId === "all" },
    { id: "high", label: "Alto risco", icon: "alert", count: "12", tone: "danger", selected: selectedId === "high" },
    { id: "frequency", label: "Queda de frequencia", icon: "barChart", count: "9", selected: selectedId === "frequency" },
    { id: "recent", label: "Sem aula recente", icon: "clock", count: "8", selected: selectedId === "recent" },
    { id: "first-week", label: "Primeira semana", icon: "calendar", count: "6", selected: selectedId === "first-week" },
    { id: "feedback", label: "Feedback negativo", icon: "message", count: "5", selected: selectedId === "feedback" },
    { id: "finance", label: "Financeiro afetando retencao", icon: "wallet", count: "4", selected: selectedId === "finance" },
    { id: "return", label: "Retorno pendente", icon: "refresh", count: "4", selected: selectedId === "return" }
  ];

  return (
    <PageQuickFilters
      aria-label="Segmentos"
      groupLabel="Segmentos de retencao"
      heading="Segmentos"
      items={items}
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Segmento de retenção selecionado: ${item.label}`);
      }}
      selectionTone="soft"
    />
  );
}

type RetentionRiskRow = {
  id: string;
  student: string;
  status: string;
  statusTone: ComponentTone;
  risk: string;
  riskTone: ComponentTone;
  reason: string;
  last: string;
  next: string;
  owner: string;
};

const retentionRiskRows: RetentionRiskRow[] = [
  { id: "ana", student: "Ana Paula Martins", status: "Ativa", statusTone: "success", risk: "alto", riskTone: "danger", reason: "14 dias sem aula", last: "Ultima aula 29/04", next: "Enviar mensagem humana hoje", owner: "Mariana" },
  { id: "joao", student: "Joao Pedro Silva", status: "Ativo", statusTone: "success", risk: "medio", riskTone: "warning", reason: "queda de frequencia", last: "Ultima aula 08/05", next: "Ligar e entender motivo", owner: "Mariana" },
  { id: "carla", student: "Carla Mendes", status: "Ativa", statusTone: "success", risk: "alto", riskTone: "danger", reason: "sem resposta no WhatsApp", last: "Interacao 06/05", next: "Enviar mensagem pessoal hoje", owner: "Mariana" },
  { id: "marina", student: "Marina Costa", status: "Ativa", statusTone: "success", risk: "medio", riskTone: "warning", reason: "primeira semana sem retorno", last: "Ultima aula 02/05", next: "Reforcar beneficios e agendar", owner: "Mariana" },
  { id: "lucas", student: "Lucas Oliveira", status: "Ativo", statusTone: "success", risk: "baixo", riskTone: "success", reason: "financeiro impactando presenca", last: "Ultima aula 25/04", next: "Oferecer alternativa de plano", owner: "Mariana" },
  { id: "fernanda", student: "Fernanda Souza", status: "Ativa", statusTone: "success", risk: "alto", riskTone: "danger", reason: "2 faltas seguidas", last: "Ultima aula 05/05", next: "Enviar mensagem e oferecer reposicao", owner: "Mariana" },
  { id: "gabriel", student: "Gabriel Santos", status: "Ativo", statusTone: "success", risk: "medio", riskTone: "warning", reason: "sem aula ha 10 dias", last: "Ultima aula 30/04", next: "Enviar mensagem e confirmar retorno", owner: "Mariana" },
  { id: "juliana", student: "Juliana Rocha", status: "Ativa", statusTone: "success", risk: "baixo", riskTone: "success", reason: "queda de frequencia", last: "Ultima aula 03/05", next: "Acompanhar na proxima aula", owner: "Mariana" },
  { id: "patricia", student: "Patricia Lima", status: "Ativa", statusTone: "success", risk: "medio", riskTone: "warning", reason: "feedback negativo da aula", last: "Interacao 07/05", next: "Entender feedback e agir", owner: "Mariana" },
  { id: "bianca", student: "Bianca Oliveira", status: "Ativa", statusTone: "success", risk: "alto", riskTone: "danger", reason: "sem resposta no WhatsApp", last: "Interacao 01/05", next: "Enviar mensagem pessoal hoje", owner: "Mariana" }
];

function RetentionRiskTable({ onInteraction, onRowSelect, selectedRowId }: { onInteraction: (message: string) => void; onRowSelect?: (row: RetentionRiskRow) => void; selectedRowId?: string }) {
  const [page, setPage] = useState(1);

  const selectPage = (nextPage: number) => {
    setPage(nextPage);
    onInteraction(`Página de riscos: ${nextPage}`);
  };

  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de riscos de retencao"
      density="compact"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "18%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "status", header: "Status", width: "9%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "risk", header: "Risco", width: "8%", render: (row) => <Chip showDot={false} tone={row.riskTone}>{row.risk}</Chip> },
        { key: "reason", header: "Motivo principal do risco", width: "21%" },
        { key: "last", header: "Ultima aula / interacao", width: "16%" },
        { key: "next", header: "Proxima acao sugerida", width: "20%" },
        { key: "owner", header: "Resp.", width: "8%" }
      ]}
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: page === 1 ? "1-10 de 48" : `${(page - 1) * 10 + 1}-${Math.min(page * 10, 48)} de 48`,
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => selectPage(Math.min(5, page + 1)),
        onPageChange: selectPage,
        onPreviousPage: () => selectPage(Math.max(1, page - 1)),
        page,
        pageCount: 5
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="chevronRight" label={`Abrir risco de ${row.student}`} onClick={(event) => { event.stopPropagation(); onRowSelect?.(row); }} size="sm" variant="ghost" />}
      rows={retentionRiskRows}
      selectedRowId={selectedRowId}
    />
  );
}

function retentionRiskDrawerFacts(risk: RetentionRiskRow): CaseDrawerFact[] {
  const recentPresence = risk.risk === "alto" ? "4 de 10 aulas" : risk.risk === "medio" ? "6 de 10 aulas" : "8 de 10 aulas";
  return [
    { id: "plan", icon: "clipboard", label: "Plano", value: "Plano Mensal" },
    { id: "presence", icon: "calendar", label: "Presenca recente", value: recentPresence },
    { id: "class", icon: "graduation", label: "Turma atual", value: "Reformer iniciante" },
    { id: "finance", icon: "wallet", label: "Financeiro", value: risk.reason.includes("financeiro") ? "Revisar" : "OK", tone: risk.reason.includes("financeiro") ? "danger" : undefined },
    { id: "last", icon: "clock", label: "Ultima aula", value: risk.last.replace("Ultima aula ", "").replace("Interacao ", "") },
    { id: "owner", icon: "user", label: "Responsavel", value: risk.owner }
  ];
}

const retentionRiskFooterActions: CaseDrawerFooterAction[] = [
  { id: "message", label: "Enviar mensagem", leadingIcon: "whatsapp", variant: "primary" },
  { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
  { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
  { id: "resolve", label: "Marcar acompanhado", leadingIcon: "checkCircle" }
];

function RetentionRiskDrawer({ risk, onAction, onClose }: { risk: RetentionRiskRow; onAction?: (action: string) => void; onClose?: () => void }) {
  const history: CaseDrawerHistoryItem[] = risk.id === "ana" ? [
    { id: "missed", time: "08/05", label: "Faltou a aula em 08/05" },
    { id: "replacement", time: "09/05", label: "Reposicao oferecida em 09/05" },
    { id: "whatsapp", time: "10/05", label: "Nao respondeu ao WhatsApp em 10/05" }
  ] : [
    { id: "latest", time: risk.last, label: risk.reason },
    { id: "action", time: "hoje", label: risk.next },
    { id: "owner", time: "agora", label: `Acompanhamento atribuído a ${risk.owner}` }
  ];
  const motives = risk.id === "ana"
    ? ["14 dias sem aula", "2 reposições não usadas", "queda de frequência nas últimas 3 semanas"]
    : [risk.reason, `Risco ${risk.risk}`, risk.last];
  const sections: CaseDrawerSection[] = [
    { id: "motives", title: "Motivos do risco", kind: "list", items: motives.map((label, index) => ({ id: `motive-${index}`, label, tone: "danger" })) },
    { id: "copilot", title: "Sugestão do copiloto", kind: "copilot", icon: "sparkles", description: risk.id === "ana" ? "Entrar em contato de forma humana, perguntar se houve dificuldade de agenda e oferecer dois horários de reposição." : `${risk.next}. Abordar o motivo: ${risk.reason}.` },
    { id: "actions", title: "Próxima ação", kind: "actions" },
    { id: "history", title: "Histórico curto", kind: "history", items: history.map((item) => ({ id: item.id, label: item.label, meta: item.time })) }
  ];

  return (
    <CaseDrawer
      avatarSrc={image79Avatar}
      facts={retentionRiskDrawerFacts(risk)}
      footerActions={retentionRiskFooterActions}
      history={history}
      messageQuotaLabel="revisao humana"
      numberedSections
      onAction={onAction}
      onClose={onClose}
      sections={sections}
      showMessageSuggestion={false}
      statusLabel={`Risco ${risk.risk}`}
      title={risk.student}
      widthVariant="wide"
    />
  );
}

function CancellationFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: selectedQuickId === "month" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "new", label: "Novo" }, { value: "saving", label: "Em salvamento" }, { value: "waiting", label: "Aguardando aluno" }] },
    { id: "reason", label: "Motivo", value: String(values.reason ?? ""), options: [{ value: "agenda", label: "Dificuldade de agenda" }, { value: "finance", label: "Dificuldade financeira" }] },
    { id: "plan", label: "Plano", value: String(values.plan ?? ""), options: [{ value: "monthly", label: "Plano mensal" }, { value: "2x", label: "Plano 2x/semana" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "financeiro", label: "Financeiro" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de cancelamentos"
      filters={filters}
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período de cancelamentos selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de cancelamentos alterado: ${filter.id}`);
      }}
      onSearchChange={() => undefined}
      onSearchFilter={() => onInteraction("Configuração de filtros de cancelamentos aberta")}
      query=""
      searchFilterLabel="Abrir filtros de cancelamentos"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar pedido de cancelamento"
      searchVisible={false}
    />
  );
}

function CancellationQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todos", icon: "user", count: "34", selected: selectedId === "all" },
    { id: "new", label: "Novos pedidos", icon: "calendar", count: "9", selected: selectedId === "new" },
    { id: "saving", label: "Em salvamento", icon: "clipboardCheck", count: "12", selected: selectedId === "saving" },
    { id: "waiting", label: "Aguardando aluno", icon: "message", count: "6", selected: selectedId === "waiting" },
    { id: "pause", label: "Pausa solicitada", icon: "clock", count: "5", selected: selectedId === "pause" },
    { id: "confirmed", label: "Cancelamento confirmado", icon: "checkCircle", count: "7", selected: selectedId === "confirmed" },
    { id: "recovered", label: "Recuperados", icon: "refresh", count: "3", selected: selectedId === "recovered" },
    { id: "do-not-contact", label: "Nao contatar", icon: "users", count: "2", selected: selectedId === "do-not-contact" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filas"
      groupLabel="Filas de cancelamentos"
      heading="Filas"
      items={items}
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila de cancelamentos selecionada: ${item.label}`);
      }}
      selectionTone="soft"
    />
  );
}

type CancellationRow = {
  id: string;
  student: string;
  type: string;
  status: string;
  statusTone: ComponentTone;
  reason: string;
  impact: string;
  deadline: string;
  deadlineTone?: ComponentTone;
  owner: string;
};

const cancellationRows: CancellationRow[] = [
  { id: "ana", student: "Ana Paula Martins", type: "Cancelamento", status: "Em salvamento", statusTone: "warning", reason: "dificuldade de agenda", impact: "R$ 420/mes + turma aberta", deadline: "hoje 16:00", deadlineTone: "danger", owner: "Mariana" },
  { id: "joao", student: "Joao Pedro Silva", type: "Pausa", status: "Novo", statusTone: "info", reason: "dificuldade financeira", impact: "R$ 350/mes", deadline: "amanha 12:00", owner: "Mariana" },
  { id: "carla", student: "Carla Mendes", type: "Cancelamento", status: "Aguardando aluno", statusTone: "warning", reason: "lesao temporaria", impact: "R$ 400/mes", deadline: "hoje 18:00", deadlineTone: "danger", owner: "Mariana" },
  { id: "marina", student: "Marina Costa", type: "Pausa", status: "Em salvamento", statusTone: "warning", reason: "mudanca de cidade", impact: "R$ 380/mes", deadline: "11/05 15:00", owner: "Mariana" },
  { id: "lucas", student: "Lucas Oliveira", type: "Duvida de saida", status: "Novo", statusTone: "info", reason: "queda de frequencia", impact: "R$ 320/mes", deadline: "amanha 10:00", owner: "Mariana" },
  { id: "fernanda", student: "Fernanda Souza", type: "Cancelamento", status: "Aguardando aluno", statusTone: "warning", reason: "viagem", impact: "R$ 420/mes", deadline: "hoje 17:00", deadlineTone: "danger", owner: "Mariana" },
  { id: "gabriel", student: "Gabriel Santos", type: "Pausa", status: "Retido", statusTone: "success", reason: "rotina instavel", impact: "R$ 310/mes", deadline: "12/05 11:00", owner: "Mariana" },
  { id: "juliana", student: "Juliana Rocha", type: "Cancelamento", status: "Em salvamento", statusTone: "warning", reason: "experiencia ruim", impact: "R$ 400/mes", deadline: "11/05 16:00", owner: "Mariana" },
  { id: "bianca", student: "Bianca Oliveira", type: "Duvida de saida", status: "Novo", statusTone: "info", reason: "dificuldade financeira", impact: "R$ 360/mes", deadline: "amanha 09:00", owner: "Mariana" }
];

function CancellationTable({ onInteraction, onRowSelect, selectedRowId }: { onInteraction: (message: string) => void; onRowSelect?: (row: CancellationRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de cancelamentos"
      density="compact"
      minTableWidth="880px"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "19%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "type", header: "Tipo", width: "13%" },
        { key: "status", header: "Status", width: "14%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "reason", header: "Motivo principal", width: "17%" },
        { key: "impact", header: "Impacto", width: "16%" },
        { key: "deadline", header: "Prazo", width: "12%", render: (row) => <Chip showDot={false} tone={row.deadlineTone ?? "neutral"}>{row.deadline}</Chip> },
        { key: "owner", header: "Resp.", width: "9%" }
      ]}
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: "1-9 de 9",
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => onInteraction("Já está na última página de cancelamentos"),
        onPageChange: () => onInteraction("Página de cancelamentos: 1"),
        onPreviousPage: () => onInteraction("Já está na primeira página de cancelamentos"),
        page: 1,
        pageCount: 1
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="chevronRight" label={`Abrir cancelamento de ${row.student}`} onClick={(event) => { event.stopPropagation(); onRowSelect?.(row); }} size="sm" variant="ghost" />}
      rows={cancellationRows}
      selectedRowId={selectedRowId}
    />
  );
}

function cancellationDrawerFacts(cancellation: CancellationRow): CaseDrawerFact[] {
  return [
    { id: "plan", icon: "clipboard", label: "Plano", value: cancellation.type === "Pausa" ? "Plano 2x/semana" : "Plano Mensal" },
    { id: "requested", icon: "clock", label: "Solicitado em", value: cancellation.id === "ana" ? "Hoje, 09:20" : cancellation.deadline },
    { id: "class", icon: "graduation", label: "Turma atual", value: "Reformer iniciante" },
    { id: "channel", icon: "whatsapp", label: "Canal", value: "WhatsApp" },
    { id: "value", icon: "wallet", label: "Valor mensal", value: cancellation.impact.split(" + ")[0]?.replace("/mes", ",00") ?? cancellation.impact },
    { id: "owner", icon: "user", label: "Responsavel", value: cancellation.owner }
  ];
}

const cancellationFooterActions: CaseDrawerFooterAction[] = [
  { id: "message", label: "Enviar mensagem", variant: "primary", leadingIcon: "whatsapp" },
  { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
  { id: "pause", label: "Registrar pausa", leadingIcon: "clock" },
  { id: "cancel", label: "Confirmar cancelamento", leadingIcon: "x" },
  { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
  { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
];

function CancellationDrawer({ cancellation, onAction, onClose }: { cancellation: CancellationRow; onAction?: (action: string) => void; onClose?: () => void }) {
  const plan = [
    "Oferecer dois horarios alternativos",
    "Confirmar se pausa temporaria resolve",
    `Registrar decisao final ate ${cancellation.deadline}`
  ];
  const history: CaseDrawerHistoryItem[] = cancellation.id === "ana" ? [
    { id: "received", time: "09:20", label: "Mensagem recebida hoje 09:20" },
    { id: "missed", time: "ultimas 2", label: "Aluno faltou nas ultimas 2 aulas" },
    { id: "replacement", time: "09/05", label: "Reposicao oferecida em 09/05" },
    { id: "no-answer", time: "convite", label: "Sem resposta ao convite anterior" }
  ] : [
    { id: "request", time: cancellation.deadline, label: `${cancellation.type}: ${cancellation.reason}` },
    { id: "impact", time: "impacto", label: cancellation.impact },
    { id: "owner", time: "agora", label: `Caso atribuído a ${cancellation.owner}` }
  ];
  const sections: CaseDrawerSection[] = [
    { id: "reason", title: "Motivo declarado", kind: "text", description: cancellation.id === "ana" ? "Aluno informou dificuldade de encaixar horários e pediu cancelamento a partir do próximo mês." : `${cancellation.student} informou ${cancellation.reason} e solicitou ${cancellation.type.toLowerCase()}.` },
    { id: "impact", title: "Impacto", kind: "list", items: [
      { id: "revenue", label: `Receita em risco: ${cancellation.impact}`, tone: "danger" },
      { id: "classes", label: `Aulas futuras afetadas: ${cancellation.type === "Pausa" ? "2" : "4"}`, tone: "danger" },
      { id: "replacement", label: "Reposições em aberto: 1", tone: "danger" },
      { id: "contract", label: `Contrato: ${cancellation.status === "Retido" ? "retido" : "ativo"}`, tone: "danger" },
      { id: "charge", label: "Próxima cobrança: 10/06", tone: "danger" }
    ] },
    { id: "plan", title: "Plano de salvamento", kind: "steps", items: plan.map((label, index) => ({ id: `plan-${index}`, label })) },
    { id: "automation", title: "Automação", kind: "alert", icon: "alert", description: "Automações de cobrança e retenção pausadas até decisão humana." },
    { id: "copilot", title: "Sugestão do copiloto", kind: "copilot", icon: "sparkles", description: cancellation.id === "ana" ? "Responder de forma humana, validar a dificuldade de agenda e oferecer uma pausa de 15 dias ou dois horários alternativos antes de confirmar o cancelamento." : `Responder de forma humana sobre ${cancellation.reason} e oferecer uma alternativa antes de confirmar ${cancellation.type.toLowerCase()}.` },
    { id: "history", title: "Histórico curto", kind: "history", items: history.map((item) => ({ id: item.id, label: item.label, meta: item.time })) }
  ];

  return (
    <CaseDrawer
      alternatives={plan.map((title, index) => ({ id: `plan-${index}`, title, capacity: "", status: "salvamento" }))}
      alternativesTitle="Plano de salvamento"
      alternativesVariant="steps"
      avatarSrc={image79Avatar}
      density="compact"
      eyebrowLabel="Cancelamento"
      facts={cancellationDrawerFacts(cancellation)}
      factsLayout="grid"
      footerActions={cancellationFooterActions}
      history={history}
      showMessageSuggestion={false}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      sections={sections}
      statusLabel={cancellation.status}
      title={cancellation.student}
      widthVariant="wide"
    />
  );
}

function ReactivationFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: selectedQuickId === "month" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "eligible", label: "Elegivel" }, { value: "paused", label: "Pausado" }, { value: "no-answer", label: "Sem resposta" }, { value: "reactivated", label: "Reativado" }] },
    { id: "exit-reason", label: "Motivo de saida", value: String(values["exit-reason"] ?? ""), options: [{ value: "agenda", label: "Dificuldade de agenda" }, { value: "finance", label: "Dificuldade financeira" }, { value: "city", label: "Mudanca de cidade" }] },
    { id: "previous-plan", label: "Plano anterior", placement: "primary", value: String(values["previous-plan"] ?? ""), options: [{ value: "monthly", label: "Plano Mensal" }, { value: "2x", label: "Plano 2x/semana" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "coordenacao", label: "Coordenacao" }] },
    { id: "contact", label: "Contato permitido", placement: "advanced", value: String(values.contact ?? ""), options: [{ value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefone" }, { value: "blocked", label: "Nao contatar" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de reativacoes"
      filters={filters}
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período de reativações selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de reativações alterado: ${filter.id}`);
      }}
      onSearchChange={() => undefined}
      onSearchFilter={() => onInteraction("Configuração de filtros de reativações aberta")}
      query=""
      searchFilterLabel="Abrir filtros de reativacoes"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar ex-aluno"
      searchVisible={false}
    />
  );
}

function ReactivationQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todos", icon: "user", count: "27", selected: selectedId === "all" },
    { id: "eligible", label: "Elegiveis para retorno", icon: "refresh", count: "10", selected: selectedId === "eligible" },
    { id: "paused", label: "Pausados vencendo", icon: "clock", count: "6", selected: selectedId === "paused" },
    { id: "no-answer", label: "Sem resposta", icon: "message", count: "4", selected: selectedId === "no-answer" },
    { id: "interest", label: "Interesse detectado", icon: "star", count: "3", selected: selectedId === "interest" },
    { id: "do-not-contact", label: "Nao contatar", icon: "x", count: "2", selected: selectedId === "do-not-contact" },
    { id: "reactivated", label: "Reativados", icon: "checkCircle", count: "2", selected: selectedId === "reactivated" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filas"
      groupLabel="Filas de reativacoes"
      heading="Filas"
      items={items}
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila de reativações selecionada: ${item.label}`);
      }}
      selectionTone="soft"
    />
  );
}

type ReactivationRow = {
  id: string;
  student: string;
  status: string;
  statusTone: ComponentTone;
  reason: string;
  activity: string;
  opportunity: string;
  nextAction: string;
  owner: string;
};

const reactivationRows: ReactivationRow[] = [
  { id: "ana", student: "Ana Paula Martins", status: "Elegivel", statusTone: "success", reason: "dificuldade de agenda", activity: "cancelou em 29/04", opportunity: "vaga aberta no Reformer Iniciante", nextAction: "enviar convite humano hoje", owner: "Mariana" },
  { id: "joao", student: "Joao Pedro Silva", status: "Pausado", statusTone: "info", reason: "mudanca de cidade", activity: "pausou em 08/05", opportunity: "vaga aberta no Reformer Iniciante", nextAction: "ligar e entender interesse", owner: "Mariana" },
  { id: "carla", student: "Carla Mendes", status: "Sem resposta", statusTone: "neutral", reason: "preco do plano", activity: "ultimo contato em 06/05", opportunity: "vaga aberta no Pilates Solo", nextAction: "enviar mensagem pessoal hoje", owner: "Mariana" },
  { id: "marina", student: "Marina Costa", status: "Interesse", statusTone: "warning", reason: "dificuldade financeira", activity: "interagiu em 02/05", opportunity: "vaga aberta no Reformer Iniciante", nextAction: "apresentar opcao de plano", owner: "Mariana" },
  { id: "lucas", student: "Lucas Oliveira", status: "Pausado", statusTone: "info", reason: "viagem", activity: "pausou em 25/04", opportunity: "vaga aberta no Reformer Iniciante", nextAction: "confirmar retorno na proxima semana", owner: "Mariana" },
  { id: "fernanda", student: "Fernanda Souza", status: "Elegivel", statusTone: "success", reason: "conflito de horario", activity: "cancelou em 05/05", opportunity: "vaga aberta no Reformer Iniciante", nextAction: "enviar convite humano hoje", owner: "Mariana" },
  { id: "gabriel", student: "Gabriel Santos", status: "Nao contatar", statusTone: "neutral", reason: "solicitou nao contato", activity: "marcado em 30/04", opportunity: "-", nextAction: "respeitar preferencia", owner: "Mariana" },
  { id: "juliana", student: "Juliana Rocha", status: "Reativado", statusTone: "success", reason: "decidiu retornar", activity: "retornou em 03/05", opportunity: "aluno reativado no Reformer Iniciante", nextAction: "confirmar adaptacao da aula", owner: "Mariana" },
  { id: "bianca", student: "Bianca Oliveira", status: "Sem resposta", statusTone: "neutral", reason: "falta de tempo", activity: "ultimo contato em 01/05", opportunity: "vaga aberta no Pilates Solo", nextAction: "enviar lembrete carinhoso", owner: "Mariana" }
];

function ReactivationTable({ onInteraction, onRowSelect, selectedRowId }: { onInteraction: (message: string) => void; onRowSelect?: (row: ReactivationRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de reativacoes"
      density="compact"
      minTableWidth="900px"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "18%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "status", header: "Status", width: "12%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "reason", header: "Motivo de saida", width: "15%" },
        { key: "activity", header: "Ultima atividade", width: "15%" },
        { key: "opportunity", header: "Oportunidade de retorno", width: "17%" },
        { key: "nextAction", header: "Proxima acao", width: "15%" },
        { key: "owner", header: "Resp.", width: "8%" }
      ]}
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: "1-9 de 9",
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => onInteraction("Já está na última página de reativações"),
        onPageChange: () => onInteraction("Página de reativações: 1"),
        onPreviousPage: () => onInteraction("Já está na primeira página de reativações"),
        page: 1,
        pageCount: 1
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="chevronRight" label={`Abrir reativação de ${row.student}`} onClick={(event) => { event.stopPropagation(); onRowSelect?.(row); }} size="sm" variant="ghost" />}
      rows={reactivationRows}
      selectedRowId={selectedRowId}
    />
  );
}

function reactivationDrawerFacts(reactivation: ReactivationRow): CaseDrawerFact[] {
  return [
    { id: "plan", icon: "clipboard", label: "Plano anterior", value: reactivation.status === "Pausado" ? "Plano 2x/semana" : "Plano Mensal" },
    { id: "reason", icon: "alert", label: "Motivo", value: reactivation.reason },
    { id: "class", icon: "graduation", label: "Turma anterior", value: "Reformer Iniciante" },
    { id: "last", icon: "clock", label: "Ultima conversa", value: reactivation.id === "ana" ? "30/04" : reactivation.activity.replace(/^.* em /, "") },
    { id: "left", icon: "calendar", label: "Saiu em", value: reactivation.activity.replace(/^.* em /, "") },
    { id: "channel", icon: "whatsapp", label: "Contato permitido", value: reactivation.status === "Nao contatar" ? "Não permitido" : "WhatsApp" }
  ];
}

const reactivationFooterActions: CaseDrawerFooterAction[] = [
  { id: "message", label: "Enviar mensagem", variant: "primary", leadingIcon: "whatsapp" },
  { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
  { id: "reserve", label: "Reservar vaga", leadingIcon: "calendar" },
  { id: "do-not-contact", label: "Marcar como nao contatar", leadingIcon: "checkCircle" },
  { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
  { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
];

function ReactivationDrawer({ onAction, onClose, reactivation }: { onAction?: (action: string) => void; onClose?: () => void; reactivation: ReactivationRow }) {
  const hasOpportunity = reactivation.opportunity !== "-";
  const sections: CaseDrawerSection[] = [
    { id: "opportunity", title: "Oportunidade de retorno", kind: "facts", items: hasOpportunity ? [
      { id: "slot", label: "Vaga aberta", meta: "Quinta, 09:00" },
      { id: "class", label: "Turma", meta: reactivation.opportunity.replace(/^vaga aberta no /, "") },
      { id: "availability", label: "Disponibilidade", meta: "1 vaga disponivel", tone: "success" },
      { id: "plan", label: "Plano sugerido", meta: "Plano Mensal" }
    ] : [{ id: "unavailable", label: "Sem oportunidade disponível", tone: "neutral" }] },
    { id: "restrictions", title: "Restricoes", kind: "list", items: [
      { id: "discount", label: "Nao prometer desconto automatico", tone: "danger" },
      { id: "availability", label: "Confirmar disponibilidade antes de reservar", tone: "danger" },
      { id: "respect", label: "Respeitar 'nao contatar' se marcado", tone: "danger" }
    ] },
    { id: "copilot", title: "Sugestão do copiloto", kind: "copilot", icon: "sparkles", description: hasOpportunity ? `Enviar uma mensagem curta sobre ${reactivation.opportunity.replace(/^vaga aberta no /, "")} e perguntar se o horário voltou a servir.` : "Respeitar a preferência registrada e não iniciar novo contato." },
    { id: "history", title: "Histórico curto", kind: "history", items: [
      { id: "activity", label: reactivation.activity, meta: reactivation.activity.replace(/^.* em /, ""), tone: reactivation.statusTone },
      { id: "reason", label: `Motivo registrado: ${reactivation.reason}`, meta: "motivo" },
      { id: "opportunity", label: hasOpportunity ? "Nova vaga compativel detectada hoje" : "Preferência de não contato preservada", meta: "hoje", tone: hasOpportunity ? "success" : "neutral" }
    ] }
  ];

  return (
    <CaseDrawer
      avatarSrc={image79Avatar}
      density="compact"
      eyebrowLabel="Reativacao"
      facts={reactivationDrawerFacts(reactivation)}
      factsLayout="grid"
      footerActions={reactivationFooterActions}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      sections={sections}
      showMessageSuggestion={false}
      statusLabel={reactivation.status}
      title={reactivation.student}
      widthVariant="wide"
    />
  );
}

function ComplaintFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: selectedQuickId === "month" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "severity", label: "Severidade", value: String(values.severity ?? ""), options: [{ value: "high", label: "Alta" }, { value: "medium", label: "Media" }, { value: "low", label: "Baixa" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "waiting", label: "Aguardando resposta" }, { value: "analysis", label: "Em analise" }, { value: "progress", label: "Em andamento" }] },
    { id: "origin", label: "Origem", placement: "primary", value: String(values.origin ?? ""), options: [{ value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefone" }, { value: "email", label: "E-mail" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "lucas", label: "Lucas" }] },
    { id: "deadline", label: "Prazo", placement: "advanced", value: String(values.deadline ?? ""), options: [{ value: "today", label: "Hoje" }, { value: "tomorrow", label: "Amanha" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de reclamacoes"
      filters={filters}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro ${filter.label}: ${String(value)}`);
      }}
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período selecionado: ${filter.label}`);
      }}
      onSearchChange={() => undefined}
      onSearchFilter={() => onInteraction("Filtros avançados de reclamações abertos")}
      query=""
      searchFilterLabel="Abrir filtros de reclamacoes"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar reclamacao"
      searchVisible={false}
    />
  );
}

function ComplaintQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todos", icon: "user", count: "32", selected: selectedId === "all" },
    { id: "high", label: "Alta severidade", icon: "alert", count: "7", selected: selectedId === "high" },
    { id: "waiting", label: "Aguardando resposta", icon: "message", count: "11", selected: selectedId === "waiting" },
    { id: "owner", label: "Aguardando responsavel", icon: "users", count: "5", selected: selectedId === "owner" },
    { id: "reopened", label: "Reabertas", icon: "refresh", count: "4", selected: selectedId === "reopened" },
    { id: "resolved", label: "Resolvidas", icon: "checkCircle", count: "18", selected: selectedId === "resolved" },
    { id: "paused", label: "Automacao pausada", icon: "pause", count: "3", selected: selectedId === "paused" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filas"
      groupLabel="Filas de reclamacoes"
      heading="Filas"
      items={items}
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila selecionada: ${item.label}`);
      }}
      selectionTone="soft"
    />
  );
}

type ComplaintRow = {
  id: string;
  student: string;
  severity: string;
  severityTone: ComponentTone;
  status: string;
  statusTone: ComponentTone;
  origin: string;
  originIcon: "whatsapp" | "phone" | "mail" | "home";
  reason: string;
  deadline: string;
  deadlineTone?: ComponentTone;
  owner: string;
  activity: string;
};

const complaintRows: ComplaintRow[] = [
  { id: "ana", student: "Ana Paula Martins", severity: "Alta", severityTone: "danger", status: "Aguardando resposta", statusTone: "warning", origin: "WhatsApp", originIcon: "whatsapp", reason: "reposicao nao resolvida", deadline: "hoje 14:00", deadlineTone: "danger", owner: "Mariana", activity: "msg. recebida 09:20" },
  { id: "joao", student: "Joao Pedro Silva", severity: "Media", severityTone: "warning", status: "Em analise", statusTone: "info", origin: "Telefone", originIcon: "phone", reason: "comunicacao sobre mudanca", deadline: "amanha 11:00", owner: "Mariana", activity: "ligacao ontem 17:45" },
  { id: "carla", student: "Carla Mendes", severity: "Alta", severityTone: "danger", status: "Aguardando resposta", statusTone: "warning", origin: "E-mail", originIcon: "mail", reason: "cobranca indevida apos pausa", deadline: "hoje 16:00", deadlineTone: "danger", owner: "Mariana", activity: "e-mail hoje 08:15" },
  { id: "marina", student: "Marina Costa", severity: "Media", severityTone: "warning", status: "Aguardando responsavel", statusTone: "neutral", origin: "WhatsApp", originIcon: "whatsapp", reason: "dificuldade com agendamento", deadline: "10/05 15:00", owner: "Lucas", activity: "msg. recebida 09:10" },
  { id: "lucas", student: "Lucas Oliveira", severity: "Baixa", severityTone: "success", status: "Em andamento", statusTone: "info", origin: "App Taliya", originIcon: "home", reason: "plano de recuperacao", deadline: "12/05 10:00", owner: "Lucas", activity: "resposta ontem 16:30" },
  { id: "fernanda", student: "Fernanda Souza", severity: "Alta", severityTone: "danger", status: "Reaberta", statusTone: "danger", origin: "WhatsApp", originIcon: "whatsapp", reason: "reclamacao sobre atendimento", deadline: "hoje 12:00", deadlineTone: "danger", owner: "Mariana", activity: "msg. recebida 08:05" },
  { id: "gabriel", student: "Gabriel Santos", severity: "Media", severityTone: "warning", status: "Em analise", statusTone: "info", origin: "Telefone", originIcon: "phone", reason: "aula nao realizada", deadline: "amanha 09:00", owner: "Lucas", activity: "ligacao ontem 18:20" },
  { id: "juliana", student: "Juliana Rocha", severity: "Baixa", severityTone: "success", status: "Aguardando resposta", statusTone: "warning", origin: "E-mail", originIcon: "mail", reason: "acesso ao app", deadline: "11/05 14:00", owner: "Mariana", activity: "e-mail ontem 15:40" },
  { id: "bianca", student: "Bianca Oliveira", severity: "Media", severityTone: "warning", status: "Em andamento", statusTone: "info", origin: "WhatsApp", originIcon: "whatsapp", reason: "remarcar aula", deadline: "13/05 14:00", owner: "Mariana", activity: "msg. enviada ontem" }
];

function ComplaintTable({ onInteraction, onRowSelect, selectedRowId }: { onInteraction: (message: string) => void; onRowSelect?: (row: ComplaintRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de reclamacoes"
      density="compact"
      minTableWidth="840px"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "15%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "severity", header: "Severidade", width: "9%", render: (row) => <Chip showDot={false} tone={row.severityTone}>{row.severity}</Chip> },
        { key: "status", header: "Status", width: "17%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "origin", header: "Origem", width: "11%", render: (row) => <InlineGroup compact><Icon name={row.originIcon} size={14} /> {row.origin}</InlineGroup> },
        { key: "reason", header: "Motivo principal", width: "16%" },
        { key: "deadline", header: "Prazo", width: "11%", render: (row) => <Chip showDot={false} tone={row.deadlineTone ?? "neutral"}>{row.deadline}</Chip> },
        { key: "owner", header: "Resp.", width: "8%" },
        { key: "activity", header: "Ultima atividade", width: "13%" }
      ]}
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: "1-9 de 9",
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => onInteraction("Já está na última página de reclamações"),
        onPageChange: () => onInteraction("Página de reclamações: 1"),
        onPreviousPage: () => onInteraction("Já está na primeira página de reclamações"),
        page: 1,
        pageCount: 1
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="chevronRight" label={`Abrir reclamação de ${row.student}`} onClick={(event) => { event.stopPropagation(); onRowSelect?.(row); }} size="sm" variant="ghost" />}
      rows={complaintRows}
      selectedRowId={selectedRowId}
    />
  );
}

function complaintDrawerFacts(complaint: ComplaintRow): CaseDrawerFact[] {
  return [
    { id: "student", icon: "user", label: "Aluno", value: complaint.student },
    { id: "status", icon: "clock", label: "Status", value: complaint.status, tone: complaint.statusTone === "danger" ? "danger" : "default" },
    { id: "origin", icon: complaint.originIcon, label: "Origem", value: complaint.origin },
    { id: "owner", icon: "user", label: "Responsavel", value: complaint.owner },
    { id: "severity", icon: "alert", label: "Severidade", value: complaint.severity, tone: complaint.severityTone === "danger" ? "danger" : "default" },
    { id: "deadline", icon: "calendar", label: "Prazo", value: complaint.deadline, tone: complaint.deadlineTone === "danger" ? "danger" : "default" }
  ];
}

const complaintFooterActions: CaseDrawerFooterAction[] = [
  { id: "message", label: "Responder", variant: "primary", leadingIcon: "arrowLeft" },
  { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
  { id: "escalate", label: "Escalar", leadingIcon: "upload" },
  { id: "resolve", label: "Marcar resolvida", leadingIcon: "checkCircle" },
  { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
  { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
];

function ComplaintDrawer({ complaint, onAction, onClose }: { complaint: ComplaintRow; onAction?: (action: string) => void; onClose?: () => void }) {
  const firstName = complaint.student.split(" ")[0];
  const sections: CaseDrawerSection[] = [
    {
      id: "declared-reason",
      title: "Motivo declarado",
      kind: "text",
      description: `${complaint.student} registrou ${complaint.reason} e aguarda uma resposta humana.`
    },
    {
      id: "impact",
      title: "Impacto",
      kind: "list",
      items: [
        { id: "risk", label: complaint.severity === "Alta" ? "Risco de cancelamento" : "Risco de insatisfacao", tone: "danger" },
        { id: "reason", label: `${complaint.reason} em analise`, tone: "danger" },
        { id: "channel", label: `Contato por ${complaint.origin} requer resposta`, tone: "danger" },
        { id: "deadline", label: `Prazo operacional: ${complaint.deadline}`, tone: "danger" }
      ]
    },
    {
      id: "automation-paused",
      title: "Automacao pausada",
      kind: "alert",
      icon: "alert",
      description: `Mensagens automaticas e acoes autonomas pausadas enquanto o caso esta ${complaint.status.toLowerCase()}.`
    },
    {
      id: "resolution-plan",
      title: "Plano de resolucao",
      kind: "checklist",
      items: [
        { id: "history", label: `Revisar historico de ${complaint.reason}`, tone: "success" },
        { id: "channel", label: `Confirmar retorno por ${complaint.origin}`, tone: "success" },
        { id: "reply", label: "Responder com pedido de desculpas e solucao objetiva", tone: "success" },
        { id: "follow-up", label: `Registrar acompanhamento com ${complaint.owner}`, tone: "success" }
      ]
    },
    {
      id: "copilot",
      title: "Sugestao do copiloto",
      kind: "copilot",
      icon: "sparkles",
      description: `Oi ${firstName}, sinto muito por ${complaint.reason}. Vou revisar o caso e retornar pelo ${complaint.origin} ate ${complaint.deadline}.`,
      note: "O copiloto sugere a resposta; a revisao e o envio sao humanos."
    },
    {
      id: "history",
      title: "Historico curto",
      kind: "history",
      items: [
        { id: "activity", label: complaint.activity, tone: "success" },
        { id: "status", label: `Caso em ${complaint.status.toLowerCase()}`, tone: complaint.statusTone },
        { id: "owner", label: `Responsavel atual: ${complaint.owner}`, tone: "success" },
        { id: "severity", label: `Caso marcado como severidade ${complaint.severity.toLowerCase()}`, tone: complaint.severityTone }
      ]
    }
  ];

  return (
    <CaseDrawer
      avatarSrc={image79Avatar}
      density="compact"
      eyebrowLabel="Reclamacao"
      facts={complaintDrawerFacts(complaint)}
      factsLayout="grid"
      footerActions={complaintFooterActions}
      sections={sections}
      showMessageSuggestion={false}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      statusLabel={`${complaint.severity} severidade`}
      title={complaint.student}
      widthVariant="wide"
    />
  );
}

export const Image41RetencaoRiscos: Story = {
  name: "41 retencao riscos lista drawer",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 41_round-4.1H_retencao_01_riscos-lista-drawer.png.png. Composicao oficial Worklist/Table/Drawer para Retencao."
      }
    },
    sourceImage: "41_round-4.1H_retencao_01_riscos-lista-drawer.png.png"
  },
  render: () => <RetentionRiskListPage />
};

export const Image42CancelamentosFila: Story = {
  name: "42 cancelamentos fila salvamento drawer",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png. Composicao oficial Worklist/Table/Drawer para Retencao."
      }
    },
    sourceImage: "42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png"
  },
  render: () => <RetentionCancellationQueuePage />
};

export const Image43ReativacoesExAlunos: Story = {
  name: "43 reativacoes ex-alunos retorno",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png. Composicao oficial Worklist/Table/Drawer para Retencao."
      }
    },
    sourceImage: "43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png"
  },
  render: () => <RetentionReactivationListPage />
};

export const Image44ReclamacoesCasoSensivel: Story = {
  name: "44 reclamacoes caso sensivel drawer",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png. Composicao oficial Worklist/Table/Drawer para Retencao."
      }
    },
    sourceImage: "44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png"
  },
  render: () => <RetentionComplaintQueuePage />
};
