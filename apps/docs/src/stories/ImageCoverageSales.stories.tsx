import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
import type { CrmShellNavItem, CrmWorklistTableColumn, LeadDrawerAction, LeadDrawerChecklistItem, LeadDrawerFact, LeadDrawerHistoryItem, LeadDrawerState, PageFilterBarFilter, PageQuickFilterItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, IconButton, PersonLabel } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";

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

type CommercialDrawerOverride = { state: LeadDrawerState; statusLabel: string };

const commercialActionLabels: Partial<Record<LeadDrawerAction, string>> = {
  "charge-payment": "cobrar pagamento",
  "choose-first-class": "escolher primeira aula",
  "confirm-presence": "confirmar presença",
  "convert-student": "converter em aluno",
  "create-follow-up": "criar follow-up",
  "create-task": "criar tarefa",
  "mark-absence": "marcar falta",
  "mark-attended": "marcar comparecimento",
  "mark-lost": "marcar como perdido",
  "move-stage": "mover etapa",
  "open-class": "abrir aula",
  "open-conversation": "abrir conversa",
  "qualify": "qualificar",
  "request-data": "pedir dados",
  "reschedule": "remarcar",
  "schedule-trial": "agendar experimental",
  "start-enrollment": "iniciar matrícula",
  "validate-enrollment": "validar matrícula"
};

function commercialActionMessage(scope: string, action: LeadDrawerAction) {
  return `${scope}: ${commercialActionLabels[action] ?? "mais ações"}`;
}

type PipelineLeadCard = {
  id: string;
  title: string;
  source: string;
  sourceIcon: IconName;
  interest: string;
  nextAction: string;
  meta: string;
  state: string;
  statusLabel: string;
};

type PipelineStage = {
  id: string;
  title: string;
  count: number;
  state?: "default" | "waiting" | "blocked" | "resolved";
  cards: PipelineLeadCard[];
};

const salesPipelineInitialColumns: PipelineStage[] = [
  { id: "novo", title: "Novo", count: 12, cards: [
    { id: "ana", title: "Ana Souza", source: "WhatsApp", sourceIcon: "whatsapp", interest: "começar Pilates", nextAction: "responder preço hoje", meta: "Recepção", state: "lead", statusLabel: "copiloto sugeriu" },
    { id: "mariana", title: "Mariana Oliveira", source: "Instagram", sourceIcon: "camera", interest: "quer informações", nextAction: "enviar valores", meta: "Atendimento", state: "lead", statusLabel: "manual" },
    { id: "lucas", title: "Lucas Ferreira", source: "Site", sourceIcon: "externalLink", interest: "musculação", nextAction: "apresentar planos", meta: "Recepção", state: "lead", statusLabel: "manual" }
  ] },
  { id: "conversando", title: "Conversando", count: 9, cards: [
    { id: "marina", title: "Marina Lopes", source: "Instagram", sourceIcon: "camera", interest: "quer experimental", nextAction: "oferecer horários", meta: "Atendimento", state: "lead", statusLabel: "manual" },
    { id: "gustavo", title: "Gustavo Almeida", source: "WhatsApp", sourceIcon: "whatsapp", interest: "treinar à tarde", nextAction: "confirmar horário", meta: "Recepção", state: "lead", statusLabel: "copiloto sugeriu" },
    { id: "beatriz", title: "Beatriz Lima", source: "Facebook", sourceIcon: "message", interest: "personal trainer", nextAction: "tirar dúvidas", meta: "Atendimento", state: "lead", statusLabel: "manual" }
  ] },
  { id: "experimental", title: "Experimental", count: 8, cards: [
    { id: "julia", title: "Julia Ramos", source: "Indicação", sourceIcon: "users", interest: "dor lombar", nextAction: "confirmar experimental", meta: "Recepção", state: "trial", statusLabel: "experimental hoje" },
    { id: "rafael", title: "Rafael Martins", source: "WhatsApp", sourceIcon: "whatsapp", interest: "emagrecimento", nextAction: "lembrar do horário", meta: "Atendimento", state: "trial", statusLabel: "experimental hoje" },
    { id: "patricia", title: "Patricia Silva", source: "Instagram", sourceIcon: "camera", interest: "Pilates solo", nextAction: "confirmar presença", meta: "Recepção", state: "trial", statusLabel: "experimental hoje" }
  ] },
  { id: "pos-aula", title: "Pós-aula", count: 7, state: "waiting", cards: [
    { id: "felipe", title: "Felipe Andrade", source: "Balcão", sourceIcon: "home", interest: "fortalecimento", nextAction: "iniciar matrícula", meta: "Gestora", state: "hot", statusLabel: "quente" },
    { id: "camila", title: "Camila Rocha", source: "WhatsApp", sourceIcon: "whatsapp", interest: "melhorar postura", nextAction: "enviar proposta", meta: "Atendimento", state: "hot", statusLabel: "quente" },
    { id: "henrique", title: "Henrique Costa", source: "Instagram", sourceIcon: "camera", interest: "performance", nextAction: "agendar retorno", meta: "Atendimento", state: "hot", statusLabel: "quente" }
  ] },
  { id: "matricula", title: "Matrícula", count: 6, state: "resolved", cards: [
    { id: "carla", title: "Carla Menezes", source: "Instagram", sourceIcon: "camera", interest: "preço", nextAction: "última tentativa", meta: "Atendimento", state: "enrollment", statusLabel: "sem resposta" },
    { id: "pedro", title: "Pedro Santos", source: "Site", sourceIcon: "externalLink", interest: "turma manhã", nextAction: "retornar quando abrir vaga", meta: "Recepção", state: "enrollment", statusLabel: "sem vaga" },
    { id: "thiago", title: "Thiago Oliveira", source: "Balcão", sourceIcon: "home", interest: "musculação", nextAction: "coletar documentos", meta: "Gestora", state: "enrollment", statusLabel: "pronto para matrícula" }
  ] },
  { id: "perdidos", title: "Perdidos", count: 4, state: "blocked", cards: [
    { id: "isabela", title: "Isabela Prado", source: "Site", sourceIcon: "externalLink", interest: "sem retorno", nextAction: "marcar perdido", meta: "Atendimento", state: "lost", statusLabel: "perdido" },
    { id: "andre", title: "André Lima", source: "Instagram", sourceIcon: "camera", interest: "preço", nextAction: "encerrar contato", meta: "Recepção", state: "lost", statusLabel: "desistiu" },
    { id: "sofia", title: "Sofia Mendes", source: "WhatsApp", sourceIcon: "whatsapp", interest: "Pilates", nextAction: "arquivar", meta: "Atendimento", state: "lost", statusLabel: "perdido" }
  ] }
];

function pipelineLeadRow(card: PipelineLeadCard, stage: PipelineStage): SalesLeadRow {
  const danger = stage.id === "perdidos";
  const warning = ["pos-aula", "matricula"].includes(stage.id);
  return {
    id: card.id,
    lead: card.title,
    stage: stage.title,
    stageTone: danger ? "danger" : warning ? "warning" : "info",
    nextAction: card.nextAction,
    desiredTime: "a combinar",
    owner: card.meta,
    lastActivity: "agora",
    status: card.statusLabel,
    statusTone: danger ? "danger" : card.statusLabel === "quente" ? "danger" : "info"
  };
}

export function SalesPipelinePage() {
  const [announcement, setAnnouncement] = useState("");
  const [columns, setColumns] = useState(salesPipelineInitialColumns);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedEntry = columns
    .flatMap((column) => column.cards.map((card) => ({ card, column })))
    .find(({ card }) => card.id === selectedCardId);
  const selectedLead = selectedEntry ? pipelineLeadRow(selectedEntry.card, selectedEntry.column) : undefined;

  const updateLead = (cardId: string, targetStageId: string | undefined, patch: Partial<PipelineLeadCard>) => {
    setColumns((current) => {
      const source = current.find((column) => column.cards.some((card) => card.id === cardId));
      if (!source) return current;
      const target = current.find((column) => column.id === (targetStageId ?? source.id));
      const card = source.cards.find((item) => item.id === cardId);
      if (!target || !card) return current;
      const updatedCard = { ...card, ...patch };
      if (source.id === target.id) {
        return current.map((column) => column.id === source.id
          ? { ...column, cards: column.cards.map((item) => item.id === cardId ? updatedCard : item) }
          : column);
      }
      return current.map((column) => {
        if (column.id === source.id) return { ...column, count: Math.max(0, column.count - 1), cards: column.cards.filter((item) => item.id !== cardId) };
        if (column.id === target.id) return { ...column, count: column.count + 1, cards: [...column.cards, updatedCard] };
        return column;
      });
    });
  };

  const handlePipelineAction = (action: LeadDrawerAction) => {
    if (!selectedEntry) return;
    const currentIndex = columns.findIndex((column) => column.id === selectedEntry.column.id);
    const nextStage = columns[Math.min(columns.length - 2, currentIndex + 1)];
    if (action === "qualify") updateLead(selectedCardId, "conversando", { statusLabel: "qualificado", nextAction: "responder conversa hoje" });
    if (action === "create-follow-up") updateLead(selectedCardId, undefined, { nextAction: "follow-up criado para hoje" });
    if (action === "move-stage") updateLead(selectedCardId, nextStage?.id, { nextAction: `continuar em ${nextStage?.title ?? selectedEntry.column.title}` });
    if (action === "schedule-trial") updateLead(selectedCardId, "experimental", { state: "trial", statusLabel: "experimental agendada", nextAction: "confirmar presença" });
    if (action === "start-enrollment") updateLead(selectedCardId, "matricula", { state: "enrollment", statusLabel: "pronto para matrícula", nextAction: "coletar documentos" });
    if (action === "convert-student") updateLead(selectedCardId, "matricula", { state: "enrollment", statusLabel: "convertido em aluno", nextAction: "concluir matrícula" });
    if (action === "mark-lost") updateLead(selectedCardId, "perdidos", { state: "lost", statusLabel: "perdido", nextAction: "sem ação" });
    setAnnouncement(commercialActionMessage("Ação do pipeline", action));
  };

  return (
    <>
      <CrmKanbanPage
        activeNavId="pipeline"
        activeSidebarId="vendas"
        avatarSrc={image79Avatar}
        drawer={drawerOpen && selectedLead ? (
          <SalesLeadDrawer
            lead={selectedLead}
            onAction={handlePipelineAction}
            onClose={() => {
              setDrawerOpen(false);
              setAnnouncement("Drawer do pipeline fechado");
            }}
            pipeline
          />
        ) : null}
        filterBar={<SalesPipelineFilters onInteraction={setAnnouncement} />}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        layoutVariant="commercial"
        navItems={salesNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="overview"
        pageHeaderActions={<ButtonGroup><Button leadingIcon="plus" onClick={() => setAnnouncement("Novo interessado iniciado")} size="sm" variant="secondary">Novo interessado</Button><Button leadingIcon="upload" onClick={() => setAnnouncement("Exportação iniciada")} size="sm" variant="secondary">Exportar</Button><Button leadingIcon="calendar" onClick={() => setAnnouncement("Criação de tarefa iniciada")} size="sm" variant="secondary">Criar tarefa</Button></ButtonGroup>}
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana · Interessados e próximos passos"
        title="Vendas"
        utilityItems={crmEmptyShellSidebarUtilityItems}
      >
        <SalesPipelineBoard
          columns={columns}
          onCardMenu={(cardId) => {
            setSelectedCardId(cardId);
            setDrawerOpen(true);
            setAnnouncement(`Opções do interessado abertas: ${cardId}`);
          }}
          onCardSelect={(cardId) => {
            setSelectedCardId(cardId);
            setDrawerOpen(true);
            setAnnouncement(`Interessado selecionado: ${cardId}`);
          }}
          onInteraction={setAnnouncement}
          selectedCardId={selectedCardId}
        />
      </CrmKanbanPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function SalesInterestedListPage() {
  const [selectedLeadId, setSelectedLeadId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [leadOverrides, setLeadOverrides] = useState<Record<string, CommercialDrawerOverride>>({});
  const selectedLead = salesLeadRows.find((row) => row.id === selectedLeadId) ?? salesLeadRows[0]!;
  const selectedOverride = leadOverrides[selectedLead.id];

  const handleLeadAction = (action: LeadDrawerAction) => {
    if (action === "close") return;
    const transition: Partial<Record<LeadDrawerAction, CommercialDrawerOverride>> = {
      qualify: { state: "interested", statusLabel: "Qualificada" },
      "schedule-trial": { state: "trial-scheduled", statusLabel: "Experimental agendada" },
      "start-enrollment": { state: "enrollment-missing", statusLabel: "Pré-matrícula iniciada" },
      "mark-lost": { state: "lost", statusLabel: "Perdido" }
    };
    const next = transition[action];
    if (next) setLeadOverrides((current) => ({ ...current, [selectedLead.id]: next }));
    setAnnouncement(commercialActionMessage("Ação do interessado", action));
  };

  return (
    <>
      <CrmWorklistPage
        activeNavId="lista"
        activeSidebarId="vendas"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <SalesLeadDrawer lead={selectedLead} onAction={handleLeadAction} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer do interessado fechado"); }} state={selectedOverride?.state} statusLabel={selectedOverride?.statusLabel} /> : null}
        filterBar={<SalesInterestedFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de interessados"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filtros rapidos"
        mainLabel="Lista de interessados"
        navItems={salesNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="compact-stacked"
        quickFilters={<SalesLeadQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana · Lista de interessados"
        title="Interessados"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        contentLayout="work-list-compact"
        worklistLayoutMode="compact-rail"
        worklistFilterRhythm="spacious"
      >
        <SalesLeadTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedLeadId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Interessado selecionado: ${row.lead}`);
          }}
          selectedRowId={selectedLeadId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function SalesExperimentalListPage() {
  const [selectedExperimentalId, setSelectedExperimentalId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [experimentalOverrides, setExperimentalOverrides] = useState<Record<string, CommercialDrawerOverride>>({});
  const selectedExperimental = experimentalRows.find((row) => row.id === selectedExperimentalId) ?? experimentalRows[0]!;
  const selectedOverride = experimentalOverrides[selectedExperimental.id];

  const handleExperimentalAction = (action: LeadDrawerAction) => {
    if (action === "close") return;
    const transition: Partial<Record<LeadDrawerAction, CommercialDrawerOverride>> = {
      "confirm-presence": { state: "trial-scheduled", statusLabel: "Presença confirmada" },
      reschedule: { state: "trial-scheduled", statusLabel: "Remarcação iniciada" },
      "mark-attended": { state: "trial-convert", statusLabel: "Pronta para matrícula" },
      "mark-absence": { state: "trial-missed", statusLabel: "Faltou" },
      "start-enrollment": { state: "enrollment-missing", statusLabel: "Matrícula iniciada" }
    };
    const next = transition[action];
    if (next) setExperimentalOverrides((current) => ({ ...current, [selectedExperimental.id]: next }));
    setAnnouncement(commercialActionMessage("Ação da aula experimental", action));
  };

  return (
    <>
      <CrmWorklistPage
        activeNavId="experimental"
        activeSidebarId="vendas"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <ExperimentalDrawer experimental={selectedExperimental} onAction={handleExperimentalAction} onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer da aula experimental fechado"); }} state={selectedOverride?.state} statusLabel={selectedOverride?.statusLabel} /> : null}
        filterBar={<ExperimentalFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de experimental"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filtros rapidos"
        mainLabel="Lista de aulas experimentais"
        navItems={salesNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="compact-stacked"
        quickFilters={<ExperimentalQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana - Aulas experimentais e proximos passos"
        title="Aulas experimentais"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        contentLayout="work-list-compact"
        worklistLayoutMode="compact-rail"
        worklistFilterRhythm="spacious"
      >
        <ExperimentalTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedExperimentalId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Experimental selecionada: ${row.interested}`);
          }}
          selectedRowId={selectedExperimentalId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function SalesEnrollmentChecklistPage() {
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("ana");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [enrollmentOverrides, setEnrollmentOverrides] = useState<Record<string, CommercialDrawerOverride>>({});
  const [checklistOverrides, setChecklistOverrides] = useState<Record<string, Record<string, boolean>>>({});
  const selectedEnrollment = enrollmentRows.find((row) => row.id === selectedEnrollmentId) ?? enrollmentRows[0]!;
  const selectedOverride = enrollmentOverrides[selectedEnrollment.id];

  const handleEnrollmentAction = (action: LeadDrawerAction) => {
    if (action === "close") return;
    const transition: Partial<Record<LeadDrawerAction, CommercialDrawerOverride>> = {
      "validate-enrollment": { state: "enrollment-payment", statusLabel: "Aguardando pagamento" },
      "charge-payment": { state: "enrollment-ready", statusLabel: "Pronta para aluno" },
      "convert-student": { state: "enrollment-converted", statusLabel: "Convertida" },
      "mark-lost": { state: "lost", statusLabel: "Perdida" }
    };
    const next = transition[action];
    if (next) setEnrollmentOverrides((current) => ({ ...current, [selectedEnrollment.id]: next }));
    setAnnouncement(commercialActionMessage("Ação da matrícula", action));
  };

  return (
    <>
      <CrmWorklistPage
        activeNavId="matriculas"
        activeSidebarId="vendas"
        avatarSrc={image79Avatar}
        drawer={drawerOpen ? <EnrollmentDrawer
          checklistOverrides={checklistOverrides[selectedEnrollment.id]}
          enrollment={selectedEnrollment}
          onAction={handleEnrollmentAction}
          onChecklistToggle={(item, checked) => {
            setChecklistOverrides((current) => ({
              ...current,
              [selectedEnrollment.id]: { ...current[selectedEnrollment.id], [item.id]: checked }
            }));
            if (item.id === "payment") {
              setEnrollmentOverrides((current) => ({
                ...current,
                [selectedEnrollment.id]: checked
                  ? { state: "enrollment-ready", statusLabel: "Pronta para aluno" }
                  : { state: "enrollment-payment", statusLabel: "Aguardando pagamento" }
              }));
              setAnnouncement(checked ? "Pagamento inicial confirmado" : "Pagamento inicial reaberto");
              return;
            }
            setAnnouncement(`Checklist da matrícula: ${String(item.label)} ${checked ? "concluído" : "reaberto"}`);
          }}
          onClose={() => { setDrawerOpen(false); setAnnouncement("Drawer da matrícula fechado"); }}
          state={selectedOverride?.state}
          statusLabel={selectedOverride?.statusLabel}
        /> : null}
        filterBar={<EnrollmentFilters onInteraction={setAnnouncement} />}
        filterBarLabel="Filtros de matriculas"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        listLabel="Filtros rapidos"
        mainLabel="Lista de matriculas"
        navItems={salesNavItems}
        onBack={() => setAnnouncement("Navegação de retorno acionada")}
        onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
        onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
        pageHeaderRhythm="compact-stacked"
        quickFilters={<EnrollmentQuickRail onInteraction={setAnnouncement} />}
        showGlobalActionsWithDrawer
        sidebarItems={crmEmptyShellSidebarItems}
        subtitle="Studio Vila Mariana - Conversao de interessados em alunos"
        title="Matrículas"
        utilityItems={crmEmptyShellSidebarUtilityItems}
        contentLayout="work-list-compact"
        worklistLayoutMode="compact-rail"
        worklistFilterRhythm="spacious"
      >
        <EnrollmentTable
          onInteraction={setAnnouncement}
          onRowSelect={(row) => {
            setSelectedEnrollmentId(row.id);
            setDrawerOpen(true);
            setAnnouncement(`Matrícula selecionada: ${row.person}`);
          }}
          selectedRowId={selectedEnrollmentId}
        />
      </CrmWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

function SalesPipelineFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedQuickId, setSelectedQuickId] = useState("all");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "all", kind: "quick", label: "Todos", selected: selectedQuickId === "all" },
    { id: "mine", kind: "quick", label: "Meus interessados", selected: selectedQuickId === "mine" },
    { id: "no-response", kind: "quick", label: "Sem resposta", selected: selectedQuickId === "no-response" },
    { id: "no-slot", kind: "quick", label: "Sem vaga", selected: selectedQuickId === "no-slot" },
    { id: "trial-today", kind: "quick", label: "Experimental hoje", selected: selectedQuickId === "trial-today" },
    { id: "ready", kind: "quick", label: "Prontos para matricula", selected: selectedQuickId === "ready" },
    { id: "lost", kind: "quick", label: "Perdidos", selected: selectedQuickId === "lost" },
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
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Fila do pipeline: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro do pipeline alterado: ${filter.id}`);
      }}
      searchVisible={false}
    />
  );
}

function SalesPipelineBoard({ columns, onCardMenu, onCardSelect, onInteraction, selectedCardId }: {
  columns: PipelineStage[];
  onCardMenu: (cardId: string) => void;
  onCardSelect: (cardId: string) => void;
  onInteraction: (message: string) => void;
  selectedCardId: string;
}) {
  return (
    <>
      {columns.map((column) => (
        <KanbanColumn count={column.count} key={column.title} onMenu={() => onInteraction(`Menu da etapa: ${column.title}`)} state={column.state} title={column.title}>
          {column.cards.map((card) => {
            return <PipelineCard key={card.id} {...card} onMenu={() => onCardMenu(card.id)} onSelect={() => onCardSelect(card.id)} selected={selectedCardId === card.id} />;
          })}
          <Button leadingIcon="plus" onClick={() => onInteraction(`Adicionar interessado em ${column.title}`)} size="sm" variant="secondary">Adicionar interessado</Button>
        </KanbanColumn>
      ))}
    </>
  );
}

function SalesInterestedFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "no-response", kind: "quick", label: "Sem resposta", selected: selectedQuickId === "no-response" },
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
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onInteraction("Novo interessado iniciado")} size="sm" variant="primary">Novo interessado</Button>
          <Button leadingIcon="upload" onClick={() => onInteraction("Exportação de interessados iniciada")} size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de interessados alterado: ${filter.id}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onInteraction(value ? `Busca de interessados: ${value}` : "Busca de interessados limpa");
      }}
      onSearchFilter={() => onInteraction("Filtros de busca abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de interessados"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por nome, telefone ou conversa"
    />
  );
}

function SalesLeadQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
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
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila de vendas selecionada: ${item.label}`);
      }}
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

function SalesLeadDrawer({
  lead,
  onAction,
  onClose,
  pipeline = false,
  state,
  statusLabel
}: {
  lead: SalesLeadRow;
  onAction: (action: LeadDrawerAction) => void;
  onClose: () => void;
  pipeline?: boolean;
  state?: LeadDrawerState;
  statusLabel?: string;
}) {
  const canonicalLead = lead.id === "ana";
  const facts: LeadDrawerFact[] = [
    { id: "channel", icon: "calendar", label: "Canal", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" },
    { id: "origin", icon: "users", label: "Origem", value: <><Icon name="whatsapp" size="12px" /> WhatsApp</>, tone: "success" },
    { id: "owner", icon: "user", label: "Dono / fila", value: lead.owner },
    { id: "interest", icon: "calendar", label: "Interesse", value: canonicalLead ? "começar Pilates" : `Interesse em ${lead.stage.toLowerCase()}` },
    { id: "schedule", icon: "clock", label: "Horário desejado", value: lead.desiredTime },
    { id: "last", icon: "message", label: "Última conversa", value: canonicalLead ? "Perguntou sobre preço e horários" : `Atualização em ${lead.stage}`, helper: lead.lastActivity },
    { id: "next", icon: "sparkles", label: "Próxima ação recomendada", value: lead.nextAction },
    { id: "objection", icon: "clock", label: "Objeção / motivo", value: canonicalLead ? "Quer entender valor e disponibilidade" : `Acompanhar status: ${lead.status}` },
    { id: "trial", icon: "graduation", label: "Experimental vinculada", value: lead.stage.includes("Experimental") ? "Experimental vinculada" : "Nenhuma agendada ainda" },
    { id: "enrollment", icon: "calendar", label: "Pré-matrícula", value: lead.stage === "Pre-matricula" ? "Em andamento" : "Ainda não iniciada" }
  ];
  const history: LeadDrawerHistoryItem[] = canonicalLead ? [
    { id: "contact", time: "hoje 10:24", title: "Contato via WhatsApp", description: "Perguntou sobre preços e horários" },
    { id: "triage", time: "ontem 18:40", title: "Triagem concluída pela Recepção", description: "Interesse em começar Pilates" },
    { id: "start", time: "ontem 09:15", title: "Conversa inicial via WhatsApp", description: "Solicitou informações" }
  ] : [
    { id: "latest", time: lead.lastActivity, title: `Atualização: ${lead.stage}`, description: lead.nextAction },
    { id: "owner", time: "anterior", title: `Responsável: ${lead.owner}`, description: `Status atual: ${lead.status}` },
    { id: "origin", time: "início", title: "Conversa iniciada via WhatsApp", description: `Horário desejado: ${lead.desiredTime}` }
  ];
  const resolvedState: LeadDrawerState = state ?? (
    lead.status === "perdido" ? "lost"
      : lead.stage === "Novo" ? "new"
        : lead.stage === "Sem vaga" ? "no-slot"
          : lead.stage === "Pre-matricula" ? "ready"
            : lead.stage.includes("Experimental") ? "trial-scheduled"
              : "interested"
  );
  const primaryAction = resolvedState === "new"
    ? { label: "Qualificar", action: "qualify" as const, icon: "checkCircle" as const }
    : resolvedState === "ready"
      ? { label: "Iniciar matrícula", action: "start-enrollment" as const, icon: "graduation" as const }
      : { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const };
  const baseSecondaryActions = resolvedState === "enrollment-missing"
    ? [
      { label: "Criar tarefa", action: "create-task" as const, icon: "calendar" as const }
    ]
    : resolvedState === "new"
    ? [
      { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
      { label: "Agendar experimental", action: "schedule-trial" as const, icon: "calendar" as const },
      { label: "Criar follow-up", action: "create-follow-up" as const, icon: "checkCircle" as const },
      { label: "Marcar perdido", action: "mark-lost" as const, icon: "x" as const }
    ]
    : resolvedState === "ready"
      ? [
        { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
        { label: "Agendar experimental", action: "schedule-trial" as const, icon: "calendar" as const },
        { label: "Criar follow-up", action: "create-follow-up" as const, icon: "checkCircle" as const }
      ]
      : [
        { label: "Qualificar", action: "qualify" as const, icon: "checkCircle" as const },
        { label: "Agendar experimental", action: "schedule-trial" as const, icon: "calendar" as const, disabled: resolvedState === "no-slot" || resolvedState === "lost" },
        { label: "Criar follow-up", action: "create-follow-up" as const, icon: "checkCircle" as const },
        { label: "Iniciar matrícula", action: "start-enrollment" as const, icon: "graduation" as const, disabled: resolvedState === "no-slot" || resolvedState === "lost" },
        { label: "Marcar perdido", action: "mark-lost" as const, icon: "x" as const, disabled: resolvedState === "lost" }
      ];
  const secondaryActions = pipeline && !["lost", "no-slot"].includes(resolvedState)
    ? [
      ...baseSecondaryActions,
      { label: "Mover etapa", action: "move-stage" as const, icon: "refresh" as const },
      { label: "Converter em aluno", action: "convert-student" as const, icon: "graduation" as const }
    ]
    : baseSecondaryActions;

  return (
    <LeadDrawer
      compact
      copilotBody={canonicalLead ? <>Ana demonstrou interesse e pediu valores.<br />Sugestão: responder preço e horários disponíveis.</> : <>{lead.lead} está em {lead.stage}.<br />Sugestão: {lead.nextAction}.</>}
      facts={facts}
      history={history}
      name={lead.lead}
      onAction={onAction}
      onClose={onClose}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      state={resolvedState}
      statusLabel={statusLabel ?? lead.stage}
      suggestedAction={`Ação sugerida: ${lead.nextAction}`}
    />
  );
}

function SalesLeadTable({ onInteraction, onRowSelect, selectedRowId }: { onInteraction: (message: string) => void; onRowSelect: (row: SalesLeadRow) => void; selectedRowId: string }) {
  const [page, setPage] = useState(1);

  const selectPage = (nextPage: number) => {
    setPage(nextPage);
    onInteraction(`Página de interessados: ${nextPage}`);
  };

  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de interessados"
      columns={salesLeadColumns}
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: page === 1 ? "1-8 de 128" : `${(page - 1) * 10 + 1}-${Math.min(page * 10, 128)} de 128`,
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => selectPage(Math.min(13, page + 1)),
        onPageChange: selectPage,
        onPreviousPage: () => selectPage(Math.max(1, page - 1)),
        page,
        pageCount: 13
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.lead}`} onClick={(event) => { event.stopPropagation(); onInteraction(`Mais ações de ${row.lead}`); }} size="sm" variant="ghost" />}
      rows={salesLeadRows}
      selectedRowId={selectedRowId}
    />
  );
}

function ExperimentalFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "tomorrow", kind: "quick", label: "Amanha", selected: selectedQuickId === "tomorrow" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
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
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onInteraction("Agendamento de experimental iniciado")} size="sm" variant="primary">Agendar experimental</Button>
          <Button leadingIcon="upload" onClick={() => onInteraction("Exportação de experimentais iniciada")} size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de experimental alterado: ${filter.id}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onInteraction(value ? `Busca de experimental: ${value}` : "Busca de experimental limpa");
      }}
      onSearchFilter={() => onInteraction("Filtros de busca de experimental abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de experimental"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por interessado, telefone ou aula"
    />
  );
}

function ExperimentalQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
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
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila de experimental selecionada: ${item.label}`);
      }}
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
  onInteraction,
  onRowSelect,
  selectedRowId
}: {
  onInteraction: (message: string) => void;
  onRowSelect?: (row: ExperimentalRow) => void;
  selectedRowId?: string;
}) {
  const [page, setPage] = useState(1);

  const selectPage = (nextPage: number) => {
    setPage(nextPage);
    onInteraction(`Página de experimentais: ${nextPage}`);
  };

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
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: page === 1 ? "1-8 de 18" : "11-18 de 18",
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => selectPage(Math.min(2, page + 1)),
        onPageChange: selectPage,
        onPreviousPage: () => selectPage(Math.max(1, page - 1)),
        page,
        pageCount: 2
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.interested}`} onClick={(event) => { event.stopPropagation(); onInteraction(`Mais ações de ${row.interested}`); }} size="sm" variant="ghost" />}
      rows={experimentalRows}
      selectedRowId={selectedRowId}
    />
  );
}

function experimentalDrawerFacts(experimental: ExperimentalRow): LeadDrawerFact[] {
  return [
    { id: "class", icon: "calendar", label: "Aula vinculada", value: `${experimental.time} - ${experimental.lesson}` },
    { id: "origin", icon: "graduation", label: "Origem comercial", value: experimental.origin },
    { id: "owner", icon: "user", label: "Dono / fila", value: experimental.owner },
    { id: "channel", icon: "tag", label: "Canal permitido", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" },
    { id: "interest", icon: "clock", label: "Interesse", value: "comecar Pilates" },
    { id: "desired", icon: "clock", label: "Horario desejado", value: experimental.time },
    { id: "stage", icon: "tag", label: "Etapa em vendas", value: "Experimental" },
    { id: "agenda", icon: "calendar", label: "Agenda vinculada", value: "Aula criada na Agenda" },
    { id: "last", icon: "message", label: "Ultima conversa", value: experimental.id === "ana" ? "Perguntou sobre preco e horarios" : experimental.next, helper: experimental.last }
  ];
}

const experimentalDrawerHistory: LeadDrawerHistoryItem[] = [
  { id: "scheduled", time: "ontem 18:40", title: "Experimental agendada", description: "Aula vinculada a grade de hoje" },
  { id: "reminder", time: "ontem 18:42", title: "Lembrete enviado", description: "WhatsApp permitido" },
  { id: "waiting", time: "ontem 18:40", title: "Aguardando confirmacao", description: "Recepcao acompanha manualmente" }
];

function ExperimentalDrawer({
  experimental,
  onAction,
  onClose,
  state,
  statusLabel
}: {
  experimental: ExperimentalRow;
  onAction?: (action: LeadDrawerAction) => void;
  onClose?: () => void;
  state?: LeadDrawerState;
  statusLabel?: string;
}) {
  const history = experimental.id === "ana" ? experimentalDrawerHistory : [
    { id: "latest", time: experimental.last, title: `Status: ${experimental.status}`, description: `Próxima ação: ${experimental.next}` },
    { id: "owner", time: "anterior", title: `Acompanhamento por ${experimental.owner}`, description: `${experimental.lesson} - ${experimental.time}` },
    { id: "scheduled", time: "início", title: "Experimental agendada", description: "Aula vinculada à grade" }
  ];
  const resolvedState: LeadDrawerState = state ?? (
    experimental.status === "Faltou" ? "trial-missed"
      : experimental.status === "Pronta para matricula" || experimental.status === "Compareceu" ? "trial-convert"
        : "trial-scheduled"
  );
  const primaryAction = resolvedState === "enrollment-missing"
    ? { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const }
    : resolvedState === "trial-convert"
      ? { label: "Iniciar matrícula", action: "start-enrollment" as const, icon: "graduation" as const }
      : resolvedState === "trial-missed"
        ? { label: "Remarcar", action: "reschedule" as const, icon: "refresh" as const }
        : { label: "Confirmar presença", action: "confirm-presence" as const, icon: "checkCircle" as const };
  const secondaryActions = resolvedState === "enrollment-missing"
    ? [
      { label: "Abrir aula na Agenda", action: "open-class" as const, icon: "calendar" as const },
      { label: "Criar follow-up", action: "create-follow-up" as const, icon: "message" as const }
    ]
    : resolvedState === "trial-convert"
    ? [
      { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
      { label: "Abrir aula na Agenda", action: "open-class" as const, icon: "calendar" as const },
      { label: "Criar follow-up", action: "create-follow-up" as const, icon: "message" as const }
    ]
    : resolvedState === "trial-missed"
      ? [
        { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
        { label: "Abrir aula na Agenda", action: "open-class" as const, icon: "calendar" as const },
        { label: "Criar follow-up", action: "create-follow-up" as const, icon: "message" as const },
        { label: "Marcar perdido", action: "mark-lost" as const, icon: "x" as const }
      ]
      : [
        { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
        { label: "Abrir aula na Agenda", action: "open-class" as const, icon: "calendar" as const },
        { label: "Remarcar", action: "reschedule" as const, icon: "refresh" as const },
        { label: "Marcar compareceu", action: "mark-attended" as const, icon: "checkCircle" as const },
        { label: "Marcar falta", action: "mark-absence" as const, icon: "x" as const }
      ];

  return (
    <LeadDrawer
      compact
      copilotBody={experimental.id === "ana" ? "Enviar confirmacao curta com horario, endereco e pedido de resposta." : `Acompanhar ${experimental.interested}: ${experimental.next}.`}
      copilotTitle="Copiloto sugere"
      eyebrow="Experimental selecionada"
      facts={experimentalDrawerFacts(experimental)}
      history={history}
      name={experimental.interested}
      notice={<><strong>A operacao manual e sempre possivel.</strong><small>O copiloto apenas sugere. A Agenda e a origem do horario da aula.</small></>}
      onAction={onAction}
      onClose={onClose}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      state={resolvedState}
      statusLabel={statusLabel ?? experimental.status}
      suggestedAction={null}
    />
  );
}

function EnrollmentFilters({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedQuickId, setSelectedQuickId] = useState("today");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "today", kind: "quick", label: "Hoje", selected: selectedQuickId === "today" },
    { id: "week", kind: "quick", label: "Esta semana", selected: selectedQuickId === "week" },
    { id: "ready", kind: "quick", label: "Prontas", selected: selectedQuickId === "ready" },
    {
      id: "status",
      label: "Status",
      value: String(values.status ?? ""),
      options: [
        { value: "missing-cpf", label: "Faltando CPF" },
        { value: "payment", label: "Aguardando pagamento" },
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
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onInteraction("Nova matrícula iniciada")} size="sm" variant="primary">Nova matrícula</Button>
          <Button leadingIcon="upload" onClick={() => onInteraction("Exportação de matrículas iniciada")} size="sm" variant="secondary">Exportar</Button>
        </ButtonGroup>
      }
      filters={filters}
      layout="stacked"
      onFilterSelect={(filter) => {
        setSelectedQuickId(filter.id);
        onInteraction(`Período selecionado: ${filter.label}`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onInteraction(`Filtro de matrícula alterado: ${filter.id}`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onInteraction(value ? `Busca de matrícula: ${value}` : "Busca de matrícula limpa");
      }}
      onSearchFilter={() => onInteraction("Filtros de busca de matrículas abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de matrículas"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar por interessado, telefone ou matrícula"
    />
  );
}

function EnrollmentQuickRail({ onInteraction }: { onInteraction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("all");
  const items: PageQuickFilterItem[] = [
    { id: "all", label: "Todas", icon: "users", count: "128", selected: selectedId === "all" },
    { id: "ready", label: "Prontas para aluno", icon: "clipboardCheck", count: "24", selected: selectedId === "ready" },
    { id: "missing", label: "Faltando dados", icon: "alert", count: "19", tone: "danger", selected: selectedId === "missing" },
    { id: "payment", label: "Aguardando pagamento", icon: "creditCard", count: "12", tone: "warning", selected: selectedId === "payment" },
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
      onSelect={(item) => {
        setSelectedId(item.id);
        onInteraction(`Fila de matrícula selecionada: ${item.label}`);
      }}
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
  { id: "ana", person: "Ana Souza", origin: "Experimental", originTone: "info", plan: "Plano 2x/semana", checklist: "4/6", status: "Faltando CPF", statusTone: "warning", owner: "Recepção", next: "validar dados", last: "hoje 10:24" },
  { id: "pedro", person: "Pedro Santos", origin: "Pós-aula", originTone: "warning", plan: "Plano mensal", checklist: "6/6", status: "Pronta para aluno", statusTone: "success", owner: "Gestora", next: "converter", last: "hoje 09:40" },
  { id: "julia", person: "Julia Ramos", origin: "Vendas", originTone: "info", plan: "A definir", checklist: "2/6", status: "Escolher plano", statusTone: "info", owner: "Recepção", next: "enviar opções", last: "ontem" },
  { id: "marina", person: "Marina Lopes", origin: "Balcão", originTone: "neutral", plan: "Plano 3x/semana", checklist: "3/6", status: "Primeira aula pendente", statusTone: "info", owner: "Atendimento", next: "escolher aula", last: "hoje" },
  { id: "carla", person: "Carla Menezes", origin: "WhatsApp", originTone: "success", plan: "Plano mensal", checklist: "5/6", status: "Aguardando pagamento", statusTone: "warning", owner: "Financeiro", next: "cobrar pagamento", last: "2 dias" },
  { id: "felipe", person: "Felipe Andrade", origin: "Experimental", originTone: "info", plan: "Plano 2x/semana", checklist: "6/6", status: "Convertida", statusTone: "success", owner: "Recepção", next: "aluno criado", last: "hoje 08:30" },
  { id: "beatriz", person: "Beatriz Lima", origin: "Indicação", originTone: "info", plan: "Plano mensal", checklist: "3/6", status: "Faltando contato", statusTone: "warning", owner: "Recepção", next: "pedir telefone", last: "ontem" },
  { id: "lucas", person: "Lucas Ferreira", origin: "Vendas", originTone: "info", plan: "Plano trimestral", checklist: "5/6", status: "Aguardando pagamento", statusTone: "warning", owner: "Gestora", next: "cobrar pagamento", last: "amanhã" }
];

function EnrollmentTable({
  onInteraction,
  onRowSelect,
  selectedRowId
}: {
  onInteraction: (message: string) => void;
  onRowSelect?: (row: EnrollmentRow) => void;
  selectedRowId?: string;
}) {
  const [page, setPage] = useState(1);

  const selectPage = (nextPage: number) => {
    setPage(nextPage);
    onInteraction(`Página de matrículas: ${nextPage}`);
  };

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
      onSortChange={(sort) => onInteraction(sort ? `Ordenação: ${sort.key} ${sort.direction}` : "Ordenação removida")}
      pagination={{
        itemsPerPage: "10",
        label: page === 1 ? "1-8 de 128" : `${(page - 1) * 10 + 1}-${Math.min(page * 10, 128)} de 128`,
        onItemsPerPageClick: () => onInteraction("Seletor de itens por página aberto"),
        onNextPage: () => selectPage(Math.min(13, page + 1)),
        onPageChange: selectPage,
        onPreviousPage: () => selectPage(Math.max(1, page - 1)),
        page,
        pageCount: 13
      }}
      onRowSelect={onRowSelect}
      rowActions={(row) => <IconButton icon="more" label={`Mais ações de ${row.person}`} onClick={(event) => { event.stopPropagation(); onInteraction(`Mais ações de ${row.person}`); }} size="sm" variant="ghost" />}
      rows={enrollmentRows}
      selectedRowId={selectedRowId}
    />
  );
}

function enrollmentDrawerFacts(enrollment: EnrollmentRow, state: LeadDrawerState): LeadDrawerFact[] {
  const paymentConfirmed = state === "enrollment-ready" || state === "enrollment-converted";
  const paymentPending = state === "enrollment-payment";
  return [
    { id: "origin", icon: "graduation", label: "Origem", value: enrollment.origin },
    { id: "previous", icon: "user", label: "Etapa anterior", value: "Pós-aula" },
    { id: "owner", icon: "user", label: "Dono / fila", value: enrollment.owner },
    { id: "plan", icon: "clock", label: "Plano escolhido", value: enrollment.plan },
    { id: "first", icon: "calendar", label: "Primeira aula", value: enrollment.id === "ana" ? "terça 17h - Reformer Intermediário" : enrollment.next },
    {
      id: "payment",
      icon: "creditCard",
      label: "Pagamento inicial",
      value: paymentConfirmed ? "Confirmado" : paymentPending ? "Pendente" : "Aguardando validação",
      tone: paymentConfirmed ? "success" : "warning"
    },
    { id: "channel", icon: "message", label: "Canal permitido", value: <><Icon name="whatsapp" size="12px" /> WhatsApp permitido</>, tone: "success" }
  ];
}

const enrollmentChecklistLabels = [
  { id: "basic", label: "Dados básicos" },
  { id: "plan", label: "Plano escolhido" },
  { id: "class", label: "Primeira aula definida" },
  { id: "consent", label: "Consentimento registrado" },
  { id: "fiscal", label: "Dados fiscais validados" },
  { id: "payment", label: "Pagamento inicial" }
];

const enrollmentDrawerHistory: LeadDrawerHistoryItem[] = [
  { id: "showed", time: "hoje 10:24", title: "Compareceu à experimental", description: "Recepção abriu pré-matrícula" },
  { id: "started", time: "hoje 09:40", title: "Recepção iniciou pré-matrícula", description: "Plano 2x/semana escolhido" },
  { id: "plan", time: "ontem 18:10", title: "Plano 2x/semana escolhido", description: "Primeira aula sugerida" }
];

function enrollmentChecklistFor(enrollment: EnrollmentRow, state: LeadDrawerState, overrides?: Record<string, boolean>): LeadDrawerChecklistItem[] {
  const checkedCount = Number(enrollment.checklist.split("/")[0]);
  return enrollmentChecklistLabels.map((item, index) => {
    let checked = index < checkedCount;
    if (state === "enrollment-payment") checked = item.id !== "payment";
    if (state === "enrollment-missing" && enrollment.status === "Faltando CPF") checked = item.id !== "fiscal" && item.id !== "payment";
    if (state === "enrollment-ready" || state === "enrollment-converted") checked = true;
    checked = overrides?.[item.id] ?? checked;
    return { ...item, checked, state: checked ? "complete" : "warning" };
  });
}

function EnrollmentDrawer({
  checklistOverrides,
  enrollment,
  onAction,
  onChecklistToggle,
  onClose,
  state,
  statusLabel
}: {
  checklistOverrides?: Record<string, boolean>;
  enrollment: EnrollmentRow;
  onAction?: (action: LeadDrawerAction) => void;
  onChecklistToggle?: (item: LeadDrawerChecklistItem, checked: boolean) => void;
  onClose?: () => void;
  state?: LeadDrawerState;
  statusLabel?: string;
}) {
  const resolvedState: LeadDrawerState = state ?? (
    enrollment.status === "Aguardando pagamento" ? "enrollment-payment"
      : enrollment.status === "Pronta para aluno" ? "enrollment-ready"
        : enrollment.status === "Convertida" ? "enrollment-converted"
          : enrollment.status === "Bloqueada" ? "blocked"
            : "enrollment-missing"
  );
  const checklist = enrollmentChecklistFor(enrollment, resolvedState, checklistOverrides);
  const checklistProgressLabel = `${checklist.filter((item) => item.checked).length}/${checklist.length}`;
  const history = enrollment.id === "ana" ? enrollmentDrawerHistory : [
    { id: "latest", time: enrollment.last, title: `Status: ${enrollment.status}`, description: `Próxima ação: ${enrollment.next}` },
    { id: "owner", time: "anterior", title: `Acompanhamento por ${enrollment.owner}`, description: `${enrollment.plan} - checklist ${enrollment.checklist}` },
    { id: "start", time: "início", title: "Pré-matrícula iniciada", description: `Origem: ${enrollment.origin}` }
  ];
  const primaryAction = resolvedState === "enrollment-payment"
    ? { label: "Cobrar pagamento", action: "charge-payment" as const, icon: "creditCard" as const }
    : resolvedState === "enrollment-ready"
      ? { label: "Converter em aluno", action: "convert-student" as const, icon: "graduation" as const }
      : resolvedState === "enrollment-converted"
        ? { label: "Aluno convertido", action: "convert-student" as const, icon: "checkCircle" as const, disabled: true }
        : { label: "Validar matrícula", action: "validate-enrollment" as const, icon: "clipboard" as const };
  const secondaryActions = [
    { label: "Pedir dados", action: "request-data" as const, icon: "clipboard" as const, disabled: resolvedState === "enrollment-ready" || resolvedState === "enrollment-converted" },
    { label: "Escolher primeira aula", action: "choose-first-class" as const, icon: "calendar" as const, disabled: resolvedState === "enrollment-ready" || resolvedState === "enrollment-converted" },
    { label: "Abrir conversa", action: "open-conversation" as const, icon: "whatsapp" as const },
    { label: "Criar tarefa", action: "create-task" as const, icon: "calendar" as const },
    { label: "Marcar perdido", action: "mark-lost" as const, icon: "x" as const, disabled: resolvedState === "enrollment-converted" }
  ];

  return (
    <LeadDrawer
      compact
      checklistItems={checklist}
      checklistProgressLabel={checklistProgressLabel}
      checklistTitle="Checklist de matrícula"
      copilotBody={enrollment.id === "ana" ? "Pedir CPF de forma curta e explicar que é necessário para concluir o cadastro." : `Acompanhar ${enrollment.person}: ${enrollment.next}.`}
      copilotTitle="Copiloto sugere"
      eyebrow="Pré-matrícula selecionada"
      facts={enrollmentDrawerFacts(enrollment, resolvedState)}
      history={history}
      name={enrollment.person}
      notice={<><strong>A operação manual é sempre possível.</strong></>}
      onAction={onAction}
      onChecklistToggle={onChecklistToggle}
      onClose={onClose}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      state={resolvedState}
      statusLabel={statusLabel ?? enrollment.status}
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
  render: () => <SalesInterestedListPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: "Interessados", level: 1 })).toBeInTheDocument();
    const initialDrawer = canvas.queryByRole("complementary", { name: "Detalhes do interessado" });
    if (initialDrawer) {
      await userEvent.click(within(initialDrawer).getByRole("button", { name: "Fechar interessado" }));
      await waitFor(() => expect(canvas.queryByRole("complementary", { name: "Detalhes do interessado" })).not.toBeInTheDocument());
    }

    await userEvent.click(canvas.getByRole("row", { name: /Marina Lopes/ }));
    await waitFor(() => expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "new"));
    await userEvent.click(canvas.getByRole("button", { name: "Qualificar" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "interested");
    await expect(canvas.getByRole("status")).toHaveTextContent("Ação do interessado: qualificar");

    await userEvent.click(canvas.getByRole("button", { name: "Fechar interessado" }));
    await userEvent.click(canvas.getByRole("row", { name: /Pedro Santos/ }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "no-slot");
    await expect(canvas.getByRole("button", { name: "Agendar experimental" })).toBeDisabled();

    await userEvent.click(canvas.getByRole("button", { name: "Fechar interessado" }));
    await userEvent.click(canvas.getByRole("row", { name: /Gabriela Martins/ }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "ready");
    await userEvent.click(canvas.getByRole("button", { name: "Iniciar matrícula" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-missing");
    await expect(canvas.getByRole("button", { name: "Criar tarefa" })).toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Qualificar" })).not.toBeInTheDocument();

    await userEvent.type(canvas.getByPlaceholderText("Buscar por nome, telefone ou conversa"), "Ana");
    await expect(canvas.getByRole("status")).toHaveTextContent("Busca de interessados: Ana");
    await userEvent.click(canvas.getByRole("button", { name: "Sem vaga 18" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Fila de vendas selecionada: Sem vaga");
  }
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

export const PipelineInteractionContract: Story = {
  name: "Pipeline interaction contract",
  render: () => <SalesPipelinePage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /Ana Souza WhatsApp/ }));
    const drawer = canvas.getByRole("complementary", { name: "Detalhes do interessado" });
    await expect(drawer).toHaveAttribute("data-state", "new");

    await userEvent.click(within(drawer).getByRole("button", { name: "Qualificar" }));
    await expect(drawer).toHaveAttribute("data-state", "interested");
    await expect(canvas.getByRole("button", { name: /Ana Souza WhatsApp.*qualificado/ })).toBeInTheDocument();

    await userEvent.click(within(drawer).getByRole("button", { name: "Criar follow-up" }));
    await expect(canvas.getByRole("button", { name: /Ana Souza WhatsApp.*follow-up criado para hoje/ })).toBeInTheDocument();
    await userEvent.click(within(drawer).getByRole("button", { name: "Mover etapa" }));
    await expect(canvas.getByRole("button", { name: /Ana Souza WhatsApp.*continuar em Experimental/ })).toBeInTheDocument();
    await userEvent.click(within(drawer).getByRole("button", { name: "Converter em aluno" }));
    await expect(canvas.getByRole("button", { name: /Ana Souza WhatsApp.*convertido em aluno/ })).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Ação do pipeline: converter em aluno");
  }
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
  render: () => <SalesExperimentalListPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: "Aulas experimentais", level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "trial-scheduled");
    await userEvent.click(canvas.getByRole("button", { name: "Confirmar presença" }));
    await expect(canvas.getByText("Presença confirmada")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Marcar compareceu" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "trial-convert");
    await expect(canvas.getByRole("status")).toHaveTextContent("Ação da aula experimental: marcar comparecimento");

    await userEvent.click(canvas.getByRole("button", { name: "Fechar interessado" }));
    await userEvent.click(canvas.getByRole("row", { name: /Carla Menezes/ }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "trial-missed");
    await userEvent.click(canvas.getByRole("button", { name: "Remarcar" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "trial-scheduled");

    await userEvent.click(canvas.getByRole("button", { name: "Fechar interessado" }));
    await userEvent.click(canvas.getByRole("row", { name: /Camila Rocha/ }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "trial-convert");
    await userEvent.click(canvas.getByRole("button", { name: "Iniciar matrícula" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-missing");
    await expect(canvas.getByRole("button", { name: "Abrir conversa" })).toBeInTheDocument();
    await expect(canvas.queryByRole("button", { name: "Confirmar presença" })).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Faltaram 4" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Fila de experimental selecionada: Faltaram");
  }
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
  render: () => <SalesEnrollmentChecklistPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: "Matrículas", level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-missing");
    await expect(canvas.getAllByText("Pagamento inicial")).toHaveLength(2);
    await userEvent.click(canvas.getByRole("button", { name: "Validar matrícula" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-payment");
    await expect(canvas.getByText("Pendente")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Cobrar pagamento" }));
    const readyDrawer = canvas.getByRole("complementary", { name: "Detalhes do interessado" });
    await expect(readyDrawer).toHaveAttribute("data-state", "enrollment-ready");
    await expect(within(readyDrawer).getByText("6/6")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Converter em aluno" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-converted");
    await expect(canvas.getByRole("button", { name: "Aluno convertido" })).toBeDisabled();

    await userEvent.click(canvas.getByRole("button", { name: "Fechar interessado" }));
    await userEvent.click(canvas.getByRole("row", { name: /Carla Menezes/ }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-payment");
    await userEvent.click(canvas.getByRole("button", { name: "Revisar Pagamento inicial" }));
    await expect(canvas.getByRole("complementary", { name: "Detalhes do interessado" })).toHaveAttribute("data-state", "enrollment-ready");
    await expect(canvas.getByRole("status")).toHaveTextContent("Pagamento inicial confirmado");

    await userEvent.type(canvas.getByPlaceholderText("Buscar por interessado, telefone ou matrícula"), "Pedro");
    await expect(canvas.getByRole("status")).toHaveTextContent("Busca de matrícula: Pedro");
    await userEvent.click(canvas.getByRole("button", { name: "Aguardando pagamento 12" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Fila de matrícula selecionada: Aguardando pagamento");
  }
};
