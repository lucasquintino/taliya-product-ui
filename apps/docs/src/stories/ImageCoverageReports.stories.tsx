import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  ChartPanel,
  CrmDashboardPage,
  ExportAction,
  OpportunityGroupCard,
  OpportunityPanel,
  PageFilterBar,
  ReportFilterBar,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { ChartPanelStat, CrmShellNavItem, OpportunityPanelFact, OpportunityPanelHistoryItem, PageFilterBarFilter } from "@taliya/crm";
import { Button, ButtonGroup } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source24JuliaRamos from "../assets/source24-julia-ramos.png";
import source24PedroSantos from "../assets/source24-pedro-santos.png";

const meta = {
  title: "CRM / Image Coverage / Relatorios",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Relatorios. As variants recriam as imagens 45 e 46 com componentes oficiais da biblioteca; remaining-pages deve apenas apontar para estas variants."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;
const reportsNav: CrmShellNavItem[] = [
  { id: "overview", label: "Visao geral" },
  { id: "week", label: "Semana" },
  { id: "finance", label: "Financeiro" },
  { id: "sales", label: "Vendas" },
  { id: "occupancy", label: "Ocupacao" },
  { id: "risk", label: "Risco" },
  { id: "exports", label: "Exportacoes" }
];

export function ReportsManagementPage() {
  const [announcement, setAnnouncement] = useState("");

  return (
    <>
      <CrmDashboardPage
        activeNavId="overview"
        activeSidebarId="relatorios"
        avatarSrc={image79Avatar}
        before={
          <ReportFilterBar
            onAdvancedFilters={() => setAnnouncement("Filtros avançados de relatórios abertos")}
            onExport={() => setAnnouncement("Exportação de relatório iniciada")}
            onOwnerChange={(owner) => setAnnouncement(`Responsável selecionado: ${owner}`)}
            onPeriodChange={(period) => setAnnouncement(`Período selecionado: ${period}`)}
            onUnitChange={(unit) => setAnnouncement(`Unidade selecionada: ${unit}`)}
          />
        }
        columns="reports"
        density="compact"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        navItems={reportsNav}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Relatório selecionado: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="reports"
        pageHeaderActions={
          <ButtonGroup>
            <ExportAction onExport={() => setAnnouncement("Exportação de relatório iniciada")} />
            <Button leadingIcon="calendar" onClick={() => setAnnouncement("Agendamento de relatório aberto")} size="sm" variant="secondary">Agendar relatorio</Button>
          </ButtonGroup>
        }
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana - Gestao e decisoes acionaveis"
        title="Relatorios"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        <ReportsManagementContent
          onOpen={(action) => setAnnouncement(`Ação do relatório: ${action}`)}
          onStatOpen={(stat) => setAnnouncement(`Exportação selecionada: ${stat.label}`)}
        />
      </CrmDashboardPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function MoneyOnTheTablePage() {
  const [selectedOpportunityId, setSelectedOpportunityId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const selectedOpportunity = findMoneyOpportunity(selectedOpportunityId) ?? findMoneyOpportunity("ana")!;
  const drawerModel = moneyOpportunityPanelModel(selectedOpportunity.group, selectedOpportunity.row);

  return (
    <>
      <CrmDashboardPage
        activeNavId="overview"
        activeSidebarId="relatorios"
        avatarSrc={image79Avatar}
        before={<MoneyTableFilters onAction={setAnnouncement} />}
        columns={2}
        density="compact"
        drawer={drawerOpen ? (
          <OpportunityPanel
            {...drawerModel}
            onAction={(action) => setAnnouncement(`Ação da oportunidade: ${action}:${selectedOpportunity.row.id}`)}
            onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer de oportunidade fechado"); }}
          />
        ) : null}
        drawerPlacement="floating"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        layoutVariant="opportunity"
        navItems={reportsNav}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Relatório selecionado: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="reports"
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Oportunidades acionaveis que podem virar caixa, conversao ou retencao"
        title="Dinheiro na mesa"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        {moneyOpportunityGroups.map((group) => (
          <OpportunityGroupCard
            icon={group.icon}
            items={group.rows}
            key={group.id}
            onItemOpen={(item) => {
              setSelectedOpportunityId(item.id);
              setDrawerOpen(true);
              setAnnouncement(`Oportunidade selecionada: ${String(item.name)}`);
            }}
            onOpen={() => setAnnouncement(`Grupo de oportunidades aberto: ${group.id}`)}
            summary={group.summary}
            title={group.title}
            tone={group.tone}
          />
        ))}
      </CrmDashboardPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

function ReportsManagementContent({
  onOpen,
  onStatOpen
}: {
  onOpen?: (action: string) => void;
  onStatOpen?: (stat: ChartPanelStat) => void;
}) {
  return (
    <>
        <ChartPanel
          actionLabel="Abrir financeiro"
          icon="alert"
          impact="impacta caixa e conciliacao"
          onOpen={() => onOpen?.("open-finance")}
          source="Financeiro"
          stats={[
            { id: "charges", label: "cobrancas", value: "14", icon: "fileText", tone: "danger" },
            { id: "failures", label: "falhas", value: "3", icon: "x", tone: "danger" },
            { id: "promises", label: "promessas hoje", value: "2", icon: "clock", tone: "warning" }
          ]}
          title="Dinheiro em aberto"
          value="R$ 8.740"
          valueSuffix="em aberto"
        />
        <ChartPanel
          actionLabel="Abrir vendas"
          icon="trendingUp"
          impact="gargalos afetam conversao"
          metricTone="info"
          onOpen={() => onOpen?.("open-sales")}
          source="Vendas / Experimental / Matriculas"
          stats={[
            { id: "no-answer", label: "sem resposta", value: "5", icon: "message", tone: "info" },
            { id: "trial", label: "experimentais", value: "3", icon: "scale", tone: "info" },
            { id: "blocked", label: "pre-matriculas", value: "2", icon: "lock", tone: "warning" }
          ]}
          title="Vendas em andamento"
          value="18"
          valueSuffix="interessados ativos"
        />
        <ChartPanel
          actionLabel="Ver ocupacao"
          icon="users"
          impact="oportunidades de encaixe e limite de capacidade"
          metricTone="success"
          onOpen={() => onOpen?.("open-occupancy")}
          source="Agenda / Turmas / Reposicoes"
          stats={[
            { id: "slots", label: "vagas uteis", value: "12", icon: "book", tone: "success" },
            { id: "full", label: "turmas cheias", value: "4", icon: "users", tone: "success" },
            { id: "requests", label: "sem vaga", value: "6", icon: "minus", tone: "danger" }
          ]}
          title="Ocupacao"
          value="76%"
          valueSuffix="ocupacao media"
        />
        <ChartPanel
          actionLabel="Abrir gargalos"
          icon="clock"
          impact="pendencias travam execucao diaria"
          metricTone="warning"
          onOpen={() => onOpen?.("open-bottlenecks")}
          source="Operacao / Tarefas / Aprovacoes / Inbox"
          stats={[
            { id: "ownerless", label: "sem dono", value: "4", icon: "user", tone: "warning" },
            { id: "approvals", label: "aprovacoes", value: "3", icon: "checkCircle", tone: "warning" },
            { id: "data", label: "dados", value: "2", icon: "lock", tone: "warning" }
          ]}
          title="Gargalos"
          value="9"
          valueSuffix="aguardando humano"
        />
        <ChartPanel
          actionLabel="Abrir retencao"
          icon="shield"
          impact="prioridade de retencao"
          onOpen={() => onOpen?.("open-retention")}
          source="Retencao / Alunos / Financeiro"
          stats={[
            { id: "frequency", label: "queda freq.", value: "3", icon: "trendingUp", tone: "danger" },
            { id: "payment", label: "inadimplencia", value: "2", icon: "coins", tone: "danger" },
            { id: "cancel", label: "cancelamento", value: "1", icon: "x", tone: "danger" }
          ]}
          title="Risco"
          value="7"
          valueSuffix="alunos em risco"
        />
        <ChartPanel
          actionLabel="Ver semana"
          icon="calendar"
          layout="summary"
          metricTone="success"
          onOpen={() => onOpen?.("open-week")}
          period="Esta semana"
          source="Resumo"
          stats={[
            { id: "cash", label: "receb.", value: "+8%", icon: "arrowRight", tone: "success" },
            { id: "trials", label: "experimentais", value: "-2", icon: "arrowLeft", tone: "danger" },
            { id: "class", label: "terca 17h lotada", value: "1", icon: "clock", tone: "info" }
          ]}
          title="Resumo semanal"
          value="3"
          valueSuffix="sinais"
        />
        <ChartPanel
          actionLabel="Abrir exportacoes"
          icon="download"
          layout="exports"
          metricTone="neutral"
          onOpen={() => onOpen?.("open-exports")}
          onStatOpen={onStatOpen}
          period="Recentes"
          source="Relatorios"
          stats={[
            { id: "finance", label: "Financeiro mensal", value: "pronto", detail: "Hoje 08:12", icon: "fileText", tone: "success" },
            { id: "students", label: "Alunos ativos", value: "processando", detail: "Hoje 07:45", icon: "fileText", tone: "info" },
            { id: "backup", label: "Backup CRM", value: "ontem", detail: "Ontem 22:30", icon: "fileText", tone: "neutral" }
          ]}
          title="Exportacoes"
          value="3"
          valueSuffix="arquivos"
        />
        <ChartPanel
          actionLabel="Ver recomendacao"
          icon="sparkles"
          impact="priorize dinheiro em aberto e pre-matriculas bloqueadas"
          layout="recommendation"
          metricTone="info"
          onOpen={() => onOpen?.("open-recommendation")}
          period="Agora"
          source="Copiloto"
          stats={[
            { id: "finance", label: "dinheiro aberto", value: "1", icon: "coins", tone: "danger" },
            { id: "sales", label: "pre-matriculas", value: "2", icon: "lock", tone: "warning" }
          ]}
          title="Copiloto"
          value="2"
          valueSuffix="prioridades"
        />
    </>
  );
}

type MoneyOpportunityRow = {
  id: string;
  name: string;
  avatarSrc?: string;
  subtitle: string;
  detail: string;
  amount?: string;
  action: string;
  badge: string;
  badgeTone: ComponentTone;
};

type MoneyOpportunityGroup = {
  id: string;
  title: string;
  icon: "lock" | "scale" | "wallet" | "calendar" | "refresh" | "shield";
  tone: ComponentTone;
  summary: string;
  rows: MoneyOpportunityRow[];
};

function MoneyTableFilters({ onAction }: { onAction?: (action: string) => void }) {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [period, setPeriod] = useState("today");
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: period === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: period === "week" },
    { id: "month", kind: "quick", label: "Este mes", selected: period === "month" },
    { id: "origin", label: "Origem", value: String(values.origin ?? ""), options: [{ value: "matriculas", label: "Matriculas" }, { value: "financeiro", label: "Financeiro" }, { value: "turmas", label: "Turmas" }] },
    { id: "owner", label: "Dono", value: String(values.owner ?? ""), options: [{ value: "recepcao", label: "Recepcao" }, { value: "financeiro", label: "Financeiro" }] },
    { id: "impact", label: "Impacto", value: String(values.impact ?? ""), options: [{ value: "cash", label: "Caixa" }, { value: "conversion", label: "Conversao" }, { value: "retention", label: "Retencao" }] },
    { id: "status", label: "Status", placement: "advanced", value: String(values.status ?? ""), options: [{ value: "hot", label: "Quente" }, { value: "today", label: "Hoje" }, { value: "blocked", label: "Bloqueada" }] }
  ];

  return (
    <PageFilterBar
      actions={
        <ButtonGroup>
          <ExportAction onExport={() => onAction?.("Exportação de oportunidades iniciada")} />
          <Button leadingIcon="checkCircle" onClick={() => onAction?.("Criação de tarefa aberta")} size="sm" variant="primary">Criar tarefa</Button>
        </ButtonGroup>
      }
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de dinheiro na mesa"
      advancedFiltersTriggerVariant="button"
      density="tight"
      filters={filters}
      layout="stacked-filters"
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onAction?.(`Filtro selecionado: ${filter.id}:${String(value)}`);
      }}
      onFilterSelect={(filter) => {
        setPeriod(filter.id);
        onAction?.(`Período selecionado: ${filter.id}`);
      }}
      onSearchChange={(value) => { setQuery(value); onAction?.(value ? `Busca: ${value}` : "Busca limpa"); }}
      onSearchFilter={() => onAction?.("Filtros de oportunidades abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de oportunidades"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar aluno, interessado ou oportunidade"
    />
  );
}

const moneyOpportunityGroups: MoneyOpportunityGroup[] = [
  {
    id: "enrollments",
    title: "Matriculas travadas",
    icon: "lock",
    tone: "danger",
    summary: "R$ 1.260 possiveis",
    rows: [
      { id: "ana", name: "Ana Souza", subtitle: "Matriculas", detail: "Pagamento inicial pendente", amount: "R$ 420", action: "Enviar Pix", badge: "bloqueada", badgeTone: "danger" },
      { id: "lucas", name: "Lucas Ferreira", subtitle: "Matriculas", detail: "Faltando CPF", action: "Pedir dado", badge: "bloqueada", badgeTone: "danger" }
    ]
  },
  {
    id: "trials",
    title: "Experimentais quentes",
    icon: "scale",
    tone: "info",
    summary: "5 interessados prontos",
    rows: [
      { id: "julia", name: "Julia Ramos", subtitle: "Experimental", detail: "Compareceu hoje - quer plano 2x/semana", action: "Fazer pos-aula", badge: "quente", badgeTone: "warning", avatarSrc: source24JuliaRamos },
      { id: "pedro", name: "Pedro Santos", subtitle: "Vendas / Experimental", detail: "Perguntou valores", action: "Responder hoje", badge: "hoje", badgeTone: "danger", avatarSrc: source24PedroSantos }
    ]
  },
  {
    id: "finance",
    title: "Financeiro recuperavel",
    icon: "wallet",
    tone: "success",
    summary: "R$ 2.340 em aberto",
    rows: [
      { id: "fernanda", name: "Fernanda Lima", subtitle: "Financeiro", detail: "Mensalidade vencida", amount: "R$ 420", action: "Enviar lembrete", badge: "hoje", badgeTone: "danger" },
      { id: "marina", name: "Marina Lopes", subtitle: "Financeiro", detail: "Promessa para hoje", amount: "R$ 980", action: "Cobrar promessa", badge: "quente", badgeTone: "warning" }
    ]
  },
  {
    id: "demand",
    title: "Vagas com demanda",
    icon: "calendar",
    tone: "info",
    summary: "3 vagas uteis",
    rows: [
      { id: "quinta", name: "Quinta 08h", subtitle: "Agenda / Turmas", detail: "2 interessados compativeis", action: "Oferecer vaga", badge: "quente", badgeTone: "warning" },
      { id: "terca", name: "Terca 17h", subtitle: "Turmas", detail: "turma quase cheia", action: "Priorizar encaixe", badge: "atencao", badgeTone: "warning" }
    ]
  },
  {
    id: "replacement",
    title: "Reposicoes que evitam perda",
    icon: "refresh",
    tone: "warning",
    summary: "4 casos sensiveis",
    rows: [
      { id: "beatriz", name: "Beatriz Lima", subtitle: "Reposicoes", detail: "credito vence amanha", action: "Enviar convite", badge: "hoje", badgeTone: "danger" },
      { id: "gabriela", name: "Gabriela Martins", subtitle: "Reposicoes", detail: "opcao encontrada", action: "Confirmar horario", badge: "opcao", badgeTone: "success" }
    ]
  },
  {
    id: "risk",
    title: "Risco com receita ativa",
    icon: "shield",
    tone: "danger",
    summary: "3 alunos em atencao",
    rows: [
      { id: "carla", name: "Carla Menezes", subtitle: "Retencao / Risco", detail: "queda de frequencia", action: "Abrir salvamento", badge: "atencao", badgeTone: "warning" },
      { id: "rafael", name: "Rafael Martins", subtitle: "Retencao / Risco", detail: "cancelamento evitavel", action: "Abrir salvamento", badge: "quente", badgeTone: "danger" }
    ]
  }
];

function findMoneyOpportunity(id: string) {
  for (const group of moneyOpportunityGroups) {
    const row = group.rows.find((item) => item.id === id);
    if (row) return { group, row };
  }
  return undefined;
}

function moneyOpportunityPanelModel(group: MoneyOpportunityGroup, row: MoneyOpportunityRow) {
  const ownerByGroup: Record<string, string> = {
    enrollments: "Recepcao",
    trials: "Comercial",
    finance: "Financeiro",
    demand: "Agenda",
    replacement: "Operacao",
    risk: "Retencao"
  };
  const impactByGroup: Record<string, string> = {
    enrollments: "conversao em aluna",
    trials: "conversao de interessado",
    finance: "recuperacao de caixa",
    demand: "ocupacao de turma",
    replacement: "prevencao de perda",
    risk: "retencao de receita"
  };
  const methodByGroup: Record<string, string> = {
    enrollments: "Pix",
    trials: "Conversa",
    finance: "WhatsApp",
    demand: "Agenda",
    replacement: "Convite",
    risk: "Conversa"
  };
  const deadline = group.id === "enrollments" || row.badge === "hoje" ? "hoje" : "esta semana";
  const status = group.id === "enrollments" ? "pagamento pendente" : row.badge;
  const facts: OpportunityPanelFact[] = [
    { id: "origin", label: "Origem", value: row.subtitle ?? group.title, icon: "folder" },
    { id: "value", label: "Valor estimado", value: row.amount ?? group.summary, icon: "coins" },
    { id: "impact", label: "Impacto", value: impactByGroup[group.id], icon: "sparkles" },
    { id: "owner", label: "Dono / fila", value: ownerByGroup[group.id], icon: "user" },
    { id: "deadline", label: "Prazo", value: deadline, icon: "clock", tone: deadline === "hoje" ? "danger" : "warning" },
    { id: "status", label: "Status", value: status, icon: "checkCircle", tone: row.badgeTone, presentation: "chip" },
    { id: "method", label: "Metodo disponivel", value: methodByGroup[group.id], icon: "coins" },
    { id: "blocker", label: "Bloqueio", value: row.detail, icon: "calendar" }
  ];
  const history: OpportunityPanelHistoryItem[] = [
    { id: "latest", label: row.detail, time: "hoje 09:20" },
    { id: "priority", label: `${group.title} priorizado`, time: "hoje 09:10" },
    { id: "identified", label: "Oportunidade identificada", time: "hoje 09:05" },
    { id: "updated", label: "Ultima atualizacao registrada", time: "hoje 08:58" }
  ];

  return {
    description: row.id === "ana" ? "Pre-matricula bloqueada por pagamento inicial" : `${row.detail} - ${group.title}`,
    facts,
    history,
    manualNotice: "Tudo pode ser feito manualmente. O copiloto apenas sugere. Acoes autonomas seguem a politica do studio.",
    notice: `${ownerByGroup[group.id]} confirma a proxima etapa antes da conclusao.`,
    primaryActionLabel: row.action,
    suggestion: `Copiloto sugere ${row.action.toLowerCase()} e acompanhar esta oportunidade ate a conclusao.`,
    title: row.name
  };
}

export const ReportsManagement: Story = {
  name: "45 relatorios visao gestao",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 45_round-4.1I_relatorios_01_visao-gestao.png.png."
      }
    },
    sourceImage: "45_round-4.1I_relatorios_01_visao-gestao.png.png"
  },
  render: () => <ReportsManagementPage />
};

export const MoneyOnTheTable: Story = {
  name: "46 dinheiro na mesa oportunidades por origem",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png."
      }
    },
    sourceImage: "46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png"
  },
  render: () => <MoneyOnTheTablePage />
};
