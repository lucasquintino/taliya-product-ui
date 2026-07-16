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
import type { CrmShellNavItem, PageFilterBarFilter, PageQuickFilterItem } from "@taliya/crm";
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
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="riscos"
      activeSidebarId="retencao"
      avatarSrc={image79Avatar}
      drawer={drawerOpen ? <RetentionRiskDrawer onAction={setDrawerAction} onClose={() => setDrawerOpen(false)} /> : null}
      filterBar={<RetentionRiskFilters />}
      filterBarLabel="Filtros de retencao"
      listLabel="Segmentos"
      mainLabel="Tabela de riscos"
      navItems={retentionNavItems}
      quickFilters={<RetentionRiskQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Alunos em risco e proximas acoes"
      title="Retencao"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="wide-rail"
    >
      <RetentionRiskTable onRowSelect={(row) => { setSelectedRowId(row.id); setDrawerOpen(true); }} selectedRowId={selectedRowId} />
    </CrmWorklistPage>
  );
}

export function RetentionCancellationQueuePage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="cancelamentos"
      activeSidebarId="retencao"
      avatarSrc={image79Avatar}
      drawer={drawerOpen ? <CancellationDrawer onAction={setDrawerAction} onClose={() => setDrawerOpen(false)} /> : null}
      drawerPlacement="chrome"
      filterBar={<CancellationFilters />}
      filterBarLabel="Filtros de cancelamentos"
      listLabel="Filas"
      mainLabel="Tabela de cancelamentos"
      navItems={retentionNavItems}
      quickFilters={<CancellationQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Pedidos de saida, pausas e planos de salvamento"
      title="Cancelamentos"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="wide-rail"
    >
      <CancellationTable onRowSelect={(row) => { setSelectedRowId(row.id); setDrawerOpen(true); }} selectedRowId={selectedRowId} />
    </CrmWorklistPage>
  );
}

export function RetentionReactivationListPage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="reativacoes"
      activeSidebarId="retencao"
      avatarSrc={image79Avatar}
      drawer={drawerOpen ? <ReactivationDrawer onAction={setDrawerAction} onClose={() => setDrawerOpen(false)} /> : null}
      filterBar={<ReactivationFilters />}
      filterBarLabel="Filtros de reativacoes"
      listLabel="Filas"
      mainLabel="Tabela de reativacoes"
      navItems={retentionNavItems}
      quickFilters={<ReactivationQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Ex-alunos e alunos pausados com chance de retorno."
      title="Reativacoes"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="wide-rail"
    >
      <ReactivationTable onRowSelect={(row) => { setSelectedRowId(row.id); setDrawerOpen(true); }} selectedRowId={selectedRowId} />
    </CrmWorklistPage>
  );
}

export function RetentionComplaintQueuePage() {
  const [selectedRowId, setSelectedRowId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [, setDrawerAction] = useState("");

  return (
    <CrmWorklistPage
      activeNavId="reclamacoes"
      activeSidebarId="retencao"
      avatarSrc={image79Avatar}
      drawer={drawerOpen ? <ComplaintDrawer onAction={setDrawerAction} onClose={() => setDrawerOpen(false)} /> : null}
      drawerPlacement="chrome"
      filterBar={<ComplaintFilters />}
      filterBarLabel="Filtros de reclamacoes"
      listLabel="Filas"
      mainLabel="Tabela de reclamacoes"
      navItems={retentionNavItems}
      quickFilters={<ComplaintQuickRail />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Casos sensiveis, respostas e recuperacao de confianca"
      title="Reclamacoes"
      utilityItems={crmEmptyShellSidebarUtilityItems}
      worklistLayoutMode="wide-rail"
    >
      <ComplaintTable onRowSelect={(row) => { setSelectedRowId(row.id); setDrawerOpen(true); }} selectedRowId={selectedRowId} />
    </CrmWorklistPage>
  );
}

function RetentionRiskFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "month", kind: "quick", label: "Este mes" },
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
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={() => undefined}
      onSearchFilter={() => undefined}
      query=""
      searchFilterLabel="Abrir filtros de retencao"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar aluno em risco"
      searchVisible={false}
    />
  );
}

function RetentionRiskQuickRail() {
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
      onSelect={(item) => setSelectedId(item.id)}
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

function RetentionRiskTable({ onRowSelect, selectedRowId }: { onRowSelect?: (row: RetentionRiskRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de riscos de retencao"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "18%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "status", header: "Status", width: "9%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "risk", header: "Risco", width: "8%", render: (row) => <Chip showDot={false} tone={row.riskTone}>{row.risk}</Chip> },
        { key: "reason", header: "Motivo principal do risco", width: "21%" },
        { key: "last", header: "Ultima aula / interacao", width: "16%" },
        { key: "next", header: "Proxima acao sugerida", width: "20%" },
        { key: "owner", header: "Resp.", width: "8%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-10 de 48", page: 1, pageCount: 5 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="chevronRight" label="Abrir risco" size="sm" variant="ghost" />}
      rows={retentionRiskRows}
      selectedRowId={selectedRowId}
    />
  );
}

const retentionRiskDrawerFacts = [
  { id: "plan", icon: "clipboard" as const, label: "Plano", value: "Plano Mensal" },
  { id: "presence", icon: "calendar" as const, label: "Presenca recente", value: "4 de 10 aulas" },
  { id: "class", icon: "graduation" as const, label: "Turma atual", value: "Reformer iniciante" },
  { id: "finance", icon: "wallet" as const, label: "Financeiro", value: "OK" },
  { id: "last", icon: "clock" as const, label: "Ultima aula", value: "29/04" },
  { id: "owner", icon: "user" as const, label: "Responsavel", value: "Mariana" }
];

function RetentionRiskDrawer({ onAction, onClose }: { onAction?: (action: string) => void; onClose?: () => void }) {
  return (
    <CaseDrawer
      avatarSrc={image79Avatar}
      eyebrowLabel="Retencao"
      facts={retentionRiskDrawerFacts}
      history={[
        { id: "missed", time: "08/05", label: "Faltou a aula em 08/05" },
        { id: "replacement", time: "09/05", label: "Reposicao oferecida em 09/05" },
        { id: "whatsapp", time: "10/05", label: "Nao respondeu ao WhatsApp em 10/05" }
      ]}
      messageQuotaLabel="revisao humana"
      numberedSections
      onAction={onAction}
      onClose={onClose}
      showMessageSuggestion={false}
      statusLabel="Risco alto"
      suggestion="Entrar em contato de forma humana, perguntar se houve dificuldade de agenda e oferecer dois horarios de reposicao."
      title="Ana Paula Martins"
      widthVariant="wide"
    />
  );
}

function CancellationFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "month", kind: "quick", label: "Este mes" },
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
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={() => undefined}
      onSearchFilter={() => undefined}
      query=""
      searchFilterLabel="Abrir filtros de cancelamentos"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar pedido de cancelamento"
      searchVisible={false}
    />
  );
}

function CancellationQuickRail() {
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
      onSelect={(item) => setSelectedId(item.id)}
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

function CancellationTable({ onRowSelect, selectedRowId }: { onRowSelect?: (row: CancellationRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de cancelamentos"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "19%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "type", header: "Tipo", width: "13%" },
        { key: "status", header: "Status", width: "14%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "reason", header: "Motivo principal", width: "17%" },
        { key: "impact", header: "Impacto", width: "16%" },
        { key: "deadline", header: "Prazo", width: "12%", render: (row) => <Chip showDot={false} tone={row.deadlineTone ?? "neutral"}>{row.deadline}</Chip> },
        { key: "owner", header: "Resp.", width: "9%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-9 de 9", page: 1, pageCount: 1 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="chevronRight" label="Abrir cancelamento" size="sm" variant="ghost" />}
      rows={cancellationRows}
      selectedRowId={selectedRowId}
    />
  );
}

const cancellationDrawerFacts = [
  { id: "plan", icon: "clipboard" as const, label: "Plano", value: "Plano Mensal" },
  { id: "requested", icon: "clock" as const, label: "Solicitado em", value: "Hoje, 09:20" },
  { id: "class", icon: "graduation" as const, label: "Turma atual", value: "Reformer iniciante" },
  { id: "channel", icon: "whatsapp" as const, label: "Canal", value: "WhatsApp" },
  { id: "value", icon: "wallet" as const, label: "Valor mensal", value: "R$ 420,00" },
  { id: "owner", icon: "user" as const, label: "Responsavel", value: "Mariana" }
];

function CancellationDrawer({ onAction, onClose }: { onAction?: (action: string) => void; onClose?: () => void }) {
  return (
    <CaseDrawer
      alternatives={[
        { id: "offer", title: "Oferecer dois horarios alternativos", capacity: "", status: "salvamento", tone: "success" },
        { id: "pause", title: "Confirmar se pausa temporaria resolve", capacity: "", status: "pausa", tone: "warning" },
        { id: "decision", title: "Registrar decisao final ate hoje 16:00", capacity: "", status: "prazo", tone: "warning" }
      ]}
      alternativesTitle="Plano de salvamento"
      alternativesVariant="steps"
      avatarSrc={image79Avatar}
      eyebrowLabel="Cancelamento"
      facts={cancellationDrawerFacts}
      footerActions={[
        { id: "message", label: "Enviar mensagem", variant: "primary", leadingIcon: "whatsapp" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "pause", label: "Registrar pausa", leadingIcon: "clock" },
        { id: "cancel", label: "Confirmar cancelamento", leadingIcon: "x" },
        { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
        { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
      ]}
      history={[
        { id: "received", time: "09:20", label: "Mensagem recebida hoje 09:20" },
        { id: "missed", time: "ultimas 2", label: "Aluno faltou nas ultimas 2 aulas" },
        { id: "replacement", time: "09/05", label: "Reposicao oferecida em 09/05" },
        { id: "no-answer", time: "convite", label: "Sem resposta ao convite anterior" }
      ]}
      showMessageSuggestion={false}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      statusLabel="Em salvamento"
      suggestion="Responder de forma humana, validar a dificuldade de agenda e oferecer uma pausa de 15 dias ou dois horarios alternativos antes de confirmar o cancelamento."
      title="Ana Paula Martins"
    />
  );
}

function ReactivationFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "month", kind: "quick", label: "Este mes" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "eligible", label: "Elegivel" }, { value: "paused", label: "Pausado" }, { value: "no-answer", label: "Sem resposta" }, { value: "reactivated", label: "Reativado" }] },
    { id: "exit-reason", label: "Motivo de saida", value: String(values.exitReason ?? ""), options: [{ value: "agenda", label: "Dificuldade de agenda" }, { value: "finance", label: "Dificuldade financeira" }, { value: "city", label: "Mudanca de cidade" }] },
    { id: "previous-plan", label: "Plano anterior", placement: "primary", value: String(values.previousPlan ?? ""), options: [{ value: "monthly", label: "Plano Mensal" }, { value: "2x", label: "Plano 2x/semana" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "coordenacao", label: "Coordenacao" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de reativacoes"
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={() => undefined}
      onSearchFilter={() => undefined}
      query=""
      searchFilterLabel="Abrir filtros de reativacoes"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar ex-aluno"
      searchVisible={false}
    />
  );
}

function ReactivationQuickRail() {
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
      onSelect={(item) => setSelectedId(item.id)}
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

function ReactivationTable({ onRowSelect, selectedRowId }: { onRowSelect?: (row: ReactivationRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de reativacoes"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "18%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "status", header: "Status", width: "12%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "reason", header: "Motivo de saida", width: "15%" },
        { key: "activity", header: "Ultima atividade", width: "15%" },
        { key: "opportunity", header: "Oportunidade de retorno", width: "17%" },
        { key: "nextAction", header: "Proxima acao", width: "15%" },
        { key: "owner", header: "Resp.", width: "8%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-9 de 9", page: 1, pageCount: 1 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="chevronRight" label="Abrir reativacao" size="sm" variant="ghost" />}
      rows={reactivationRows}
      selectedRowId={selectedRowId}
    />
  );
}

const reactivationDrawerFacts = [
  { id: "plan", icon: "clipboard" as const, label: "Plano anterior", value: "Plano Mensal" },
  { id: "reason", icon: "alert" as const, label: "Motivo", value: "dificuldade de agenda" },
  { id: "class", icon: "graduation" as const, label: "Turma anterior", value: "Reformer Iniciante" },
  { id: "last", icon: "clock" as const, label: "Ultima conversa", value: "30/04" },
  { id: "left", icon: "calendar" as const, label: "Saiu em", value: "29/04" },
  { id: "channel", icon: "whatsapp" as const, label: "Contato permitido", value: "WhatsApp" }
];

function ReactivationDrawer({ onAction, onClose }: { onAction?: (action: string) => void; onClose?: () => void }) {
  return (
    <CaseDrawer
      alternatives={[{ id: "slot", title: "Quinta, 09:00", capacity: "Reformer", status: "1 vaga disponivel", tone: "success" }]}
      alternativesTitle="Oportunidade de retorno"
      avatarSrc={image79Avatar}
      eyebrowLabel="Reativacao"
      facts={reactivationDrawerFacts}
      factsLayout="grid"
      footerActions={[
        { id: "message", label: "Enviar mensagem", variant: "primary", leadingIcon: "whatsapp" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "reserve", label: "Reservar vaga", leadingIcon: "calendar" },
        { id: "do-not-contact", label: "Marcar como nao contatar", leadingIcon: "checkCircle" },
        { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
        { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
      ]}
      history={[
        { id: "cancelled", time: "29/04", label: "Cancelamento registrado em 29/04" },
        { id: "refused", time: "29/04", label: "Plano de salvamento recusado em 29/04" },
        { id: "slot", time: "hoje", label: "Nova vaga compativel detectada hoje" }
      ]}
      restrictions={[
        { id: "discount", label: "Nao prometer desconto automatico" },
        { id: "availability", label: "Confirmar disponibilidade antes de reservar" },
        { id: "respect", label: "Respeitar 'nao contatar' se marcado" }
      ]}
      restrictionsTitle="Restricoes"
      widthVariant="wide"
      showMessageSuggestion={false}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      statusLabel="Elegivel"
      suggestion="Enviar mensagem curta oferecendo a vaga de quinta as 09h e perguntando se o horario voltou a servir."
      title="Ana Paula Martins"
    />
  );
}

function ComplaintFilters() {
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: true },
    { id: "week", kind: "quick", label: "Esta semana" },
    { id: "month", kind: "quick", label: "Este mes" },
    { id: "unit", label: "Unidade", value: String(values.unit ?? ""), options: [{ value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }] },
    { id: "severity", label: "Severidade", value: String(values.severity ?? ""), options: [{ value: "high", label: "Alta" }, { value: "medium", label: "Media" }, { value: "low", label: "Baixa" }] },
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "waiting", label: "Aguardando resposta" }, { value: "analysis", label: "Em analise" }, { value: "progress", label: "Em andamento" }] },
    { id: "origin", label: "Origem", placement: "primary", value: String(values.origin ?? ""), options: [{ value: "whatsapp", label: "WhatsApp" }, { value: "phone", label: "Telefone" }, { value: "email", label: "E-mail" }] },
    { id: "owner", label: "Responsavel", placement: "primary", value: String(values.owner ?? ""), options: [{ value: "mariana", label: "Mariana" }, { value: "lucas", label: "Lucas" }] }
  ];

  return (
    <PageFilterBar
      advancedFiltersLabel="Mais filtros"
      advancedFiltersSurface="modal"
      advancedFiltersTitle="Filtros de reclamacoes"
      filters={filters}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={() => undefined}
      onSearchFilter={() => undefined}
      query=""
      searchFilterLabel="Abrir filtros de reclamacoes"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar reclamacao"
      searchVisible={false}
    />
  );
}

function ComplaintQuickRail() {
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
      onSelect={(item) => setSelectedId(item.id)}
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
  { id: "ana", student: "Ana Paula Martins", severity: "Alta", severityTone: "danger", status: "Ag. resposta", statusTone: "warning", origin: "WhatsApp", originIcon: "whatsapp", reason: "reposicao nao resolvida", deadline: "hoje 14:00", deadlineTone: "danger", owner: "Mariana", activity: "msg. recebida 09:20" },
  { id: "joao", student: "Joao Pedro Silva", severity: "Media", severityTone: "warning", status: "Em analise", statusTone: "info", origin: "Telefone", originIcon: "phone", reason: "comunicacao sobre mudanca", deadline: "amanha 11:00", owner: "Mariana", activity: "ligacao ontem 17:45" },
  { id: "carla", student: "Carla Mendes", severity: "Alta", severityTone: "danger", status: "Ag. resposta", statusTone: "warning", origin: "E-mail", originIcon: "mail", reason: "cobranca indevida apos pausa", deadline: "hoje 16:00", deadlineTone: "danger", owner: "Mariana", activity: "e-mail hoje 08:15" },
  { id: "marina", student: "Marina Costa", severity: "Media", severityTone: "warning", status: "Ag. responsavel", statusTone: "neutral", origin: "WhatsApp", originIcon: "whatsapp", reason: "dificuldade com agendamento", deadline: "10/05 15:00", owner: "Lucas", activity: "msg. recebida 09:10" },
  { id: "lucas", student: "Lucas Oliveira", severity: "Baixa", severityTone: "success", status: "Em andamento", statusTone: "info", origin: "App Taliya", originIcon: "home", reason: "plano de recuperacao", deadline: "12/05 10:00", owner: "Lucas", activity: "resposta ontem 16:30" },
  { id: "fernanda", student: "Fernanda Souza", severity: "Alta", severityTone: "danger", status: "Reaberta", statusTone: "danger", origin: "WhatsApp", originIcon: "whatsapp", reason: "reclamacao sobre atendimento", deadline: "hoje 12:00", deadlineTone: "danger", owner: "Mariana", activity: "msg. recebida 08:05" },
  { id: "gabriel", student: "Gabriel Santos", severity: "Media", severityTone: "warning", status: "Em analise", statusTone: "info", origin: "Telefone", originIcon: "phone", reason: "aula nao realizada", deadline: "amanha 09:00", owner: "Lucas", activity: "ligacao ontem 18:20" },
  { id: "juliana", student: "Juliana Rocha", severity: "Baixa", severityTone: "success", status: "Ag. resposta", statusTone: "warning", origin: "E-mail", originIcon: "mail", reason: "acesso ao app", deadline: "11/05 14:00", owner: "Mariana", activity: "e-mail ontem 15:40" },
  { id: "bianca", student: "Bianca Oliveira", severity: "Media", severityTone: "warning", status: "Em andamento", statusTone: "info", origin: "WhatsApp", originIcon: "whatsapp", reason: "remarcar aula", deadline: "13/05 14:00", owner: "Mariana", activity: "msg. enviada ontem" }
];

function ComplaintTable({ onRowSelect, selectedRowId }: { onRowSelect?: (row: ComplaintRow) => void; selectedRowId?: string }) {
  return (
    <CrmWorklistTable
      actionColumnWidth="42px"
      ariaLabel="Tabela de reclamacoes"
      columns={[
        { key: "student", header: "Aluno", sortable: true, width: "16%", render: (row) => <PersonLabel avatarSrc={image79Avatar} name={row.student} size="xs" /> },
        { key: "severity", header: "Severidade", width: "10%", render: (row) => <Chip showDot={false} tone={row.severityTone}>{row.severity}</Chip> },
        { key: "status", header: "Status", width: "13%", render: (row) => <Chip showDot={false} tone={row.statusTone}>{row.status}</Chip> },
        { key: "origin", header: "Origem", width: "12%", render: (row) => <InlineGroup compact><Icon name={row.originIcon} size={14} /> {row.origin}</InlineGroup> },
        { key: "reason", header: "Motivo principal", width: "17%" },
        { key: "deadline", header: "Prazo", width: "11%", render: (row) => <Chip showDot={false} tone={row.deadlineTone ?? "neutral"}>{row.deadline}</Chip> },
        { key: "owner", header: "Resp.", width: "8%" },
        { key: "activity", header: "Ultima atividade", width: "13%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-9 de 9", page: 1, pageCount: 1 }}
      onRowSelect={onRowSelect}
      rowActions={() => <IconButton icon="chevronRight" label="Abrir reclamacao" size="sm" variant="ghost" />}
      rows={complaintRows}
      selectedRowId={selectedRowId}
    />
  );
}

const complaintDrawerFacts = [
  { id: "student", icon: "user" as const, label: "Aluno", value: "Ana Paula Martins" },
  { id: "status", icon: "clock" as const, label: "Status", value: "Aguardando resposta", tone: "danger" as const },
  { id: "origin", icon: "whatsapp" as const, label: "Origem", value: "WhatsApp" },
  { id: "owner", icon: "user" as const, label: "Responsavel", value: "Mariana" },
  { id: "severity", icon: "alert" as const, label: "Severidade", value: "Alta", tone: "danger" as const },
  { id: "deadline", icon: "calendar" as const, label: "Prazo", value: "Hoje 14:00", tone: "danger" as const }
];

function ComplaintDrawer({ onAction, onClose }: { onAction?: (action: string) => void; onClose?: () => void }) {
  return (
    <CaseDrawer
      avatarSrc={image79Avatar}
      eyebrowLabel="Reclamacao"
      facts={complaintDrawerFacts}
      factsLayout="grid"
      footerActions={[
        { id: "message", label: "Responder", variant: "primary", leadingIcon: "arrowLeft" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "escalate", label: "Escalar", leadingIcon: "upload" },
        { id: "resolve", label: "Marcar resolvida", leadingIcon: "checkCircle" },
        { id: "open-profile", label: "Abrir aluno", leadingIcon: "user" },
        { id: "open-conversation", label: "Abrir conversa", leadingIcon: "message" }
      ]}
      sections={[
        {
          id: "declared-reason",
          title: "Motivo declarado",
          kind: "text",
          description: "Aluna reclamou que pediu reposicao ha 3 dias e ainda nao recebeu opcao de encaixe."
        },
        {
          id: "impact",
          title: "Impacto",
          kind: "list",
          items: [
            { id: "cancel-risk", label: "Risco de cancelamento", tone: "danger" },
            { id: "open-replacement", label: "1 reposicao em aberto", tone: "danger" },
            { id: "no-answer", label: "Conversa sem resposta ha 2h", tone: "danger" },
            { id: "class", label: "Turma com vaga compativel hoje as 18:00", tone: "danger" }
          ]
        },
        {
          id: "automation-paused",
          title: "Automacao pausada",
          kind: "alert",
          icon: "alert",
          description: "Mensagens automaticas e acoes autonomas pausadas ate revisao humana."
        },
        {
          id: "resolution-plan",
          title: "Plano de resolucao",
          kind: "checklist",
          items: [
            { id: "history", label: "Revisar historico da reposicao", tone: "success" },
            { id: "options", label: "Oferecer duas opcoes reais de encaixe", tone: "success" },
            { id: "reply", label: "Responder com pedido de desculpas e solucao objetiva", tone: "success" },
            { id: "follow-up", label: "Registrar acompanhamento apos resposta", tone: "success" }
          ]
        },
        {
          id: "copilot",
          title: "Sugestao do copiloto",
          kind: "copilot",
          icon: "sparkles",
          description: "Oi Ana, sinto muito pela demora. Encontrei duas opcoes para sua reposicao: hoje as 18h ou sexta as 09h.",
          note: "O copiloto sugere a resposta; a revisao e o envio sao humanos."
        },
        {
          id: "history",
          title: "Historico curto",
          kind: "history",
          items: [
            { id: "replacement", label: "Pedido de reposicao aberto em 10/05", tone: "success" },
            { id: "agent", label: "Agente nao encontrou encaixe automatico", tone: "danger" },
            { id: "received", label: "Mensagem da aluna recebida hoje 09:20", tone: "success" },
            { id: "severity", label: "Caso marcado como alta severidade", tone: "danger" }
          ]
        }
      ]}
      showMessageSuggestion={false}
      numberedSections
      onAction={onAction}
      onClose={onClose}
      statusLabel="Alta severidade"
      title="Ana Paula Martins"
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
