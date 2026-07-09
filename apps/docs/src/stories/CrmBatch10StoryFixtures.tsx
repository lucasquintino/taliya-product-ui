import { useState } from "react";
import type { ReactNode } from "react";

import {
  AgentCard,
  AgentCatalog,
  AgentFlowActionBar,
  AgentFlowSettingsPanel,
  CancellationCase,
  ChartPanel,
  ComplaintPanel,
  DuplicateResolver,
  EnrollmentChecklist,
  ExecutionReceipt,
  ExecutionTimeline,
  FieldMappingTable,
  FinancePriorityPanel,
  FinanceKanbanCard,
  FlowBuilder,
  FlowStepCard,
  GrantAccessPanel,
  ImportProgress,
  IntegrationFailedState,
  CrmProductShell,
  InternalOverviewDashboard,
  InternalSecurityRulesPanel,
  LeadSummary,
  ModeCard,
  ModeSelector,
  OpportunityPanel,
  PaymentCaseCard,
  PermissionState,
  PhonePreview,
  PipelineCard,
  PlanBlockedState,
  PreflightChecklist,
  QuotaBlockedState,
  ReactivationCard,
  ReconciliationRow,
  RelationshipList,
  ReportFilterBar,
  RiskCard,
  ScenarioList,
  SecurityRulePanel,
  SensitiveActionDialog,
  SimulationRunner,
  StudentHeader,
  StudentSummary,
  SupportTicketPanel,
  TenantCard,
  TenantDetailLayout,
  TrialClassCard
} from "@taliya/crm";
import { Button, Chip, FieldGrid, FieldStack, Select, TagInput, Textarea } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source13SaraAlves from "../assets/source13-sara-alves.png";
import source28AnaPaula from "../assets/source28-ana-paula.png";
import source34AnaPaulaMartins from "../assets/source34-ana-paula-martins.png";
import source34GabrielLima from "../assets/source34-gabriel-lima.png";
import source34JulianaRocha from "../assets/source34-juliana-rocha.png";
import source38AnaSouza from "../assets/source38-ana-souza.png";
import sourceRetentionAnaPaula from "../assets/source-retention-ana-paula.png";
import source41RiskAnaPaulaAvatar from "../assets/source41-risk-ana-paula-avatar.png";
import { batch10SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

export const batch10StoryTitles = {
  AgentCatalog: "CRM / Agents / AgentCatalog",
  AgentCard: "CRM / Agents / AgentCard",
  ModeSelector: "CRM / Agents / ModeSelector",
  ModeCard: "CRM / Agents / ModeCard",
  FlowBuilder: "CRM / Agents / FlowBuilder",
  FlowStepCard: "CRM / Agents / FlowStepCard",
  AgentFlowSettingsPanel: "CRM / Agents / AgentFlowSettingsPanel",
  AgentFlowActionBar: "CRM / Agents / AgentFlowActionBar",
  PreflightChecklist: "CRM / Agents / PreflightChecklist",
  ScenarioList: "CRM / Agents / ScenarioList",
  PhonePreview: "CRM / Agents / PhonePreview",
  ExecutionTimeline: "CRM / Agents / ExecutionTimeline",
  SimulationRunner: "CRM / Agents / SimulationRunner",
  ExecutionReceipt: "CRM / Agents / ExecutionReceipt",
  StudentHeader: "CRM / Students / StudentHeader",
  StudentSummary: "CRM / Students / StudentSummary",
  RelationshipList: "CRM / Students / RelationshipList",
  FinancePriorityPanel: "CRM / Finance / FinancePriorityPanel",
  PaymentCaseCard: "CRM / Finance / PaymentCaseCard",
  FinanceKanbanCard: "CRM / Finance / FinanceKanbanCard",
  ReconciliationRow: "CRM / Finance / ReconciliationRow",
  PipelineCard: "CRM / Sales / PipelineCard",
  LeadSummary: "CRM / Sales / LeadSummary",
  TrialClassCard: "CRM / Sales / TrialClassCard",
  EnrollmentChecklist: "CRM / Sales / EnrollmentChecklist",
  RiskCard: "CRM / Retention / RiskCard",
  CancellationCase: "CRM / Retention / CancellationCase",
  ReactivationCard: "CRM / Retention / ReactivationCard",
  ComplaintPanel: "CRM / Retention / ComplaintPanel",
  SensitiveActionDialog: "CRM / Retention / SensitiveActionDialog",
  SupportTicketPanel: "CRM / Support / SupportTicketPanel",
  GrantAccessPanel: "CRM / Support / GrantAccessPanel",
  TenantCard: "CRM / Internal / TenantCard",
  InternalOverviewDashboard: "CRM / Internal / InternalOverviewDashboard",
  TenantDetailLayout: "CRM / Internal / TenantDetailLayout",
  SecurityRulePanel: "CRM / Internal / SecurityRulePanel",
  InternalSecurityRulesPanel: "CRM / Internal / InternalSecurityRulesPanel",
  ChartPanel: "CRM / Reports / ChartPanel",
  ReportFilterBar: "CRM / Reports / ReportFilterBar",
  OpportunityPanel: "CRM / Sales / OpportunityPanel",
  ImportProgress: "CRM / Data Quality / ImportProgress",
  FieldMappingTable: "CRM / Data Quality / FieldMappingTable",
  DuplicateResolver: "CRM / Data Quality / DuplicateResolver",
  PermissionState: "CRM / Advanced States / PermissionState",
  PlanBlockedState: "CRM / Advanced States / PlanBlockedState",
  QuotaBlockedState: "CRM / Advanced States / QuotaBlockedState",
  IntegrationFailedState: "CRM / Advanced States / IntegrationFailedState"
} as const;

export type Batch10StoryComponent = keyof typeof batch10StoryTitles;

function StoryPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <PrimitivePage>
      <div className={["sb-crm-batch10-page", className].filter(Boolean).join(" ")}>{children}</div>
    </PrimitivePage>
  );
}

function SourceFrame({ children, className }: { children: ReactNode; className: string }) {
  return <div className={className}>{children}</div>;
}

function CallbackChip({ value }: { value: string | null }) {
  return value ? <Chip tone="success">callback: {value}</Chip> : <Chip tone="paused">aguardando interacao</Chip>;
}

function AgentCatalogStory() {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-source-catalog">
      <PrimitiveMatrix>
        <PrimitiveState label="7 agentes"><AgentCatalog onAgentOpen={setOpened} /></PrimitiveState>
        <PrimitiveState label="3 agentes"><AgentCatalog agents={[
          { id: "atendimento", title: "Atendimento", description: "Conversas, triagem e handoff", routines: 2, flows: 10, state: "active", icon: "messageMore" },
          { id: "agenda", title: "Agenda", description: "Presença e reposições", routines: 5, flows: 16, state: "draft", icon: "calendar", selected: true },
          { id: "retencao", title: "Retenção", description: "Riscos e reativações", routines: 2, flows: 13, state: "attention", icon: "shieldAlert" }
        ]} onAgentOpen={setOpened} /></PrimitiveState>
        <PrimitiveState label="1 agente"><AgentCatalog agents={[{ id: "agenda", title: "Agenda", description: "Presença e reposições", routines: 5, flows: 16, state: "active", icon: "calendar", selected: true }]} onAgentOpen={setOpened} /></PrimitiveState>
        <PrimitiveState label="empty"><AgentCatalog empty /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={opened} />
    </StoryPage>
  );
}

function ModeSelectorStory() {
  const [flowMode, setFlowMode] = useState("autonomo-excecoes");
  const [routineMode, setRoutineMode] = useState("autonomo");
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="fluxo fonte 56"><ModeSelector onChange={setFlowMode} value={flowMode} /></PrimitiveState>
        <PrimitiveState label="rotina fonte 54"><ModeSelector onChange={setRoutineMode} value={routineMode} variant="routine" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={`${flowMode}:${routineMode}`} />
    </StoryPage>
  );
}

function FlowBuilderStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="default">
          <FlowBuilder
            onStepMenu={(id) => setAction(`menu:${id}`)}
            onStepOpen={(id) => setAction(`open:${id}`)}
          />
        </PrimitiveState>
        <PrimitiveState label="compact fonte 56">
          <FlowBuilder
            density="compact"
            onStepMenu={(id) => setAction(`menu:${id}`)}
            onStepOpen={(id) => setAction(`open:${id}`)}
          />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function AgentFlowSettingsPanelStory() {
  return (
    <StoryPage>
      <AgentFlowSettingsPanel>
        <FieldGrid columns={4}>
          <Select
            defaultValue="2h"
            helperText="Depois desse prazo, chama a equipe."
            label="Prazo para aviso"
            options={[
              { value: "2h", label: "Ate 2 horas antes da aula" },
              { value: "1h", label: "Ate 1 hora antes da aula" }
            ]}
          />
          <Select
            defaultValue="reposicao"
            helperText="A reposicao segue pelas proprias regras."
            label="Proximo passo apos falta"
            options={[
              { value: "reposicao", label: "Criar tarefa de reposicao" },
              { value: "equipe", label: "Chamar equipe" }
            ]}
          />
          <TagInput
            helperText="Quem recebe o caso quando a Taliya nao pode seguir."
            items={["Recepcao", "Coordenadora", "Dono/admin"]}
            label="Responsaveis por excecao"
            removable
          />
          <FieldStack>
            <Select
              defaultValue="acolhedor"
              label="Tom/template da mensagem"
              options={[
                { value: "acolhedor", label: "Acolhedor" },
                { value: "direto", label: "Direto" }
              ]}
            />
            <Textarea
              defaultValue="Oi, {{nome}}. Vi aqui que voce nao vai conseguir vir a aula de {{horario}}. Vou registrar sua falta e verificar o melhor proximo passo."
              density="compact"
            />
          </FieldStack>
        </FieldGrid>
      </AgentFlowSettingsPanel>
    </StoryPage>
  );
}

function AgentFlowActionBarStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="fonte 56">
          <AgentFlowActionBar>
            <Button leadingIcon="play" onClick={() => setAction("test")} variant="primary">Testar este fluxo</Button>
            <Button leadingIcon="clipboard" onClick={() => setAction("save")} variant="secondary">Salvar ajuste</Button>
            <Button leadingIcon="arrowLeft" onClick={() => setAction("back")} variant="secondary">Voltar para rotina</Button>
          </AgentFlowActionBar>
        </PrimitiveState>
        <PrimitiveState label="loading">
          <AgentFlowActionBar>
            <Button leadingIcon="loader" loading variant="primary">Testar este fluxo</Button>
            <Button disabled leadingIcon="clipboard" variant="secondary">Salvar ajuste</Button>
            <Button leadingIcon="arrowLeft" variant="secondary">Voltar para rotina</Button>
          </AgentFlowActionBar>
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function PreflightChecklistStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="fonte 59 pronta">
          <PreflightChecklist onItemAction={(id) => setAction(`action:${id}`)} onToggle={(id, checked) => setAction(`${id}:${checked}`)} />
        </PrimitiveState>
        <PrimitiveState label="warning/blocking">
          <PreflightChecklist
            description="Itens abaixo precisam ser revisados antes de publicar."
            items={[
              { id: "whatsapp", title: "WhatsApp conectado", state: "complete" },
              { id: "templates", title: "Templates pendentes", state: "warning" },
              { id: "responsaveis", title: "Responsáveis definidos", state: "complete" },
              { id: "quota", title: "Cota indisponível", state: "blocked" },
              { id: "auditoria", title: "Auditoria ativa", state: "complete" }
            ]}
            onItemAction={(id) => setAction(`action:${id}`)}
            onToggle={(id, checked) => setAction(`${id}:${checked}`)}
            title="Revisar antes de publicar"
          />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function ScenarioListStory() {
  const [selected, setSelected] = useState("prazo");
  return (
    <StoryPage>
      <SourceFrame className="sb-crm-batch10-scenario-list-source">
        <ScenarioList onSelect={setSelected} selectedId={selected} />
      </SourceFrame>
      <CallbackChip value={selected} />
    </StoryPage>
  );
}

function ExecutionTimelineStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="fonte 58/70">
          <SourceFrame className="sb-crm-batch10-execution-timeline-source">
            <ExecutionTimeline />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="interactive running/failed/pending">
          <SourceFrame className="sb-crm-batch10-execution-timeline-source">
            <ExecutionTimeline
              items={[
                { id: "running", step: 1, status: "running", title: "Preparando envio", tool: "Taliya", details: "Mensagem sendo montada." },
                { id: "success", step: 2, status: "success", title: "Falta registrada", tool: "Agenda", details: "Registro concluído." },
                { id: "failed", step: 3, status: "failed", title: "WhatsApp falhou", tool: "WhatsApp", error: "timeout", details: "Retentar ou pausar." },
                { id: "pending", step: 4, status: "pending", title: "Aguardando tarefa", tool: "CRM" }
              ]}
              onOpen={(id) => setAction(`open:${id}`)}
              onRetry={(id) => setAction(`retry:${id}`)}
            />
          </SourceFrame>
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function SimulationRunnerStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="success"><SimulationRunner avatarSrc={image79Avatar} onRun={() => setAction("run")} onScenarioSelect={(id) => setAction(`scenario:${id}`)} /></PrimitiveState>
        <PrimitiveState label="running"><SimulationRunner avatarSrc={image79Avatar} onRun={() => setAction("run-running")} state="running" /></PrimitiveState>
        <PrimitiveState label="blocked"><SimulationRunner avatarSrc={image79Avatar} onRun={() => setAction("run-blocked")} state="blocked" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function SupportTicketPanelStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-support-story">
      <PrimitiveMatrix>
        <PrimitiveState label="open - image 47">
          <SupportTicketPanel onAction={setAction} state="open" />
        </PrimitiveState>
        <PrimitiveState label="answered">
          <SupportTicketPanel onAction={setAction} state="answered" />
        </PrimitiveState>
        <PrimitiveState label="access active - internal">
          <SupportTicketPanel onAction={setAction} state="access active" variant="internal" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function GrantAccessPanelStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-grant-story">
      <PrimitiveMatrix>
        <PrimitiveState label="grant - image 50"><GrantAccessPanel onAction={setAction} state="grant" /></PrimitiveState>
        <PrimitiveState label="revoke"><GrantAccessPanel onAction={setAction} state="revoke" /></PrimitiveState>
        <PrimitiveState label="expired"><GrantAccessPanel onAction={setAction} state="expired" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function TenantCardStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-tenant-card-story">
      <PrimitiveMatrix>
        <PrimitiveState label="active - image 49"><TenantCard onOpen={() => setAction("active")} /></PrimitiveState>
        <PrimitiveState label="warning"><TenantCard name="Studio Reformer Sul" onOpen={() => setAction("warning")} quota={12} state="warning" /></PrimitiveState>
        <PrimitiveState label="security"><TenantCard onOpen={() => setAction("security")} quota={90} state="security" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function InternalOverviewDashboardStory() {
  return (
    <StoryPage className="sb-crm-batch10-internal-shell-story">
      <CrmProductShell
        navItems={[
          { id: "overview", label: "Visão geral", active: true },
          { id: "leads", label: "Leads" },
          { id: "clients", label: "Clientes" },
          { id: "support", label: "Suporte" },
          { id: "incidents", label: "Incidentes" },
          { id: "billing", label: "Billing" },
          { id: "audit", label: "Auditoria" }
        ]}
        title="Taliya Interno"
        subtitle="Operação interna de leads, clientes, suporte e plataforma"
        variant="internal"
      >
        <InternalOverviewDashboard />
      </CrmProductShell>
    </StoryPage>
  );
}

function TenantDetailLayoutStory() {
  return (
    <StoryPage className="sb-crm-batch10-tenant-detail-story">
      <TenantDetailLayout />
    </StoryPage>
  );
}

function SecurityRulePanelStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-security-story">
      <PrimitiveMatrix>
        <PrimitiveState label="allowed - image 50"><SecurityRulePanel onAction={setAction} state="allowed" /></PrimitiveState>
        <PrimitiveState label="denied"><SecurityRulePanel onAction={setAction} state="denied" /></PrimitiveState>
        <PrimitiveState label="warning"><SecurityRulePanel onAction={setAction} state="warning" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function InternalSecurityRulesPanelStory() {
  return (
    <StoryPage className="sb-crm-batch10-security-rules-story">
      <PrimitiveMatrix>
        <PrimitiveState label="source - image 49"><InternalSecurityRulesPanel /></PrimitiveState>
        <PrimitiveState label="custom rules">
          <InternalSecurityRulesPanel
            primaryRules={["Abrir tenant exige contexto aprovado.", "Escopo expira automaticamente."]}
            secondaryRules={["Acoes internas ficam auditadas."]}
          />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  );
}

function ChartPanelStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-report-card-story">
      <PrimitiveMatrix>
        <PrimitiveState label="ready - image 45">
          <SourceFrame className="sb-crm-batch10-report-card-source">
            <ChartPanel onOpen={() => setAction("open")} />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="loading">
          <SourceFrame className="sb-crm-batch10-report-card-source">
            <ChartPanel onOpen={() => setAction("loading-open")} state="loading" />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="empty">
          <SourceFrame className="sb-crm-batch10-report-card-source">
            <ChartPanel onOpen={() => setAction("empty-open")} state="empty" />
          </SourceFrame>
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function ReportFilterBarStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-report-filter-story">
      <SourceFrame className="sb-crm-batch10-report-filter-source">
        <ReportFilterBar onExport={() => setAction("export")} />
      </SourceFrame>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function OpportunityPanelStory() {
  const [action, setAction] = useState<string | null>(null);
  const [closed, setClosed] = useState(false);
  return (
    <StoryPage className="sb-crm-batch10-opportunity-story">
      <PrimitiveMatrix>
        <PrimitiveState label="open - image 46">
          <SourceFrame className="sb-crm-batch10-opportunity-source">
            <OpportunityPanel onAction={setAction} onClose={() => setClosed(true)} state="open" />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="assigned">
          <SourceFrame className="sb-crm-batch10-opportunity-source">
            <OpportunityPanel onAction={setAction} state="assigned" />
          </SourceFrame>
        </PrimitiveState>
        <PrimitiveState label="resolved">
          <SourceFrame className="sb-crm-batch10-opportunity-source">
            <OpportunityPanel onAction={setAction} state="resolved" />
          </SourceFrame>
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={closed ? "close" : action} />
    </StoryPage>
  );
}

function ImportProgressStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-import-setup-story">
      <PrimitiveMatrix>
        <PrimitiveState label="running - image 13"><ImportProgress onDetails={() => setAction("details")} onPause={() => setAction("pause")} /></PrimitiveState>
        <PrimitiveState label="mapped"><ImportProgress onDetails={() => setAction("mapped-details")} state="mapped" /></PrimitiveState>
        <PrimitiveState label="conflict"><ImportProgress onDetails={() => setAction("conflict-details")} state="conflict" /></PrimitiveState>
        <PrimitiveState label="error"><ImportProgress onRetry={() => setAction("retry")} state="error" /></PrimitiveState>
        <PrimitiveState label="paused"><ImportProgress onResume={() => setAction("resume")} state="paused" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function FieldMappingTableStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-import-setup-story">
      <FieldMappingTable
        onAddMapping={() => setAction("add")}
        onFieldChange={(row, value) => setAction(`field:${row}:${value}`)}
        onRowAction={(row) => setAction(`action:${row}`)}
        onRowClick={(row) => setAction(`row:${row}`)}
      />
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function DuplicateResolverStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-import-setup-story">
      <PrimitiveMatrix>
        <PrimitiveState label="candidates - image 13"><DuplicateResolver avatarSrc={source13JoaoPedro} onAction={setAction} /></PrimitiveState>
        <PrimitiveState label="merge"><DuplicateResolver avatarSrc={source13JoaoPedro} onAction={setAction} state="merge" /></PrimitiveState>
        <PrimitiveState label="keep separate"><DuplicateResolver avatarSrc={source13JoaoPedro} onAction={setAction} state="keep separate" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function PermissionStateStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-advanced-state-story">
      <PrimitiveMatrix>
        <PrimitiveState label="request access - image 12"><PermissionState onAction={setAction} state="request-access" /></PrimitiveState>
        <PrimitiveState label="read only"><PermissionState onAction={setAction} state="read-only" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function PlanBlockedStateStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-advanced-state-story">
      <PrimitiveMatrix>
        <PrimitiveState label="upgrade - image 67"><PlanBlockedState onAction={setAction} state="upgrade" /></PrimitiveState>
        <PrimitiveState label="manual continues"><PlanBlockedState onAction={setAction} state="manual" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function QuotaBlockedStateStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-advanced-state-story">
      <PrimitiveMatrix>
        <PrimitiveState label="70 - image 68"><QuotaBlockedState onAction={setAction} value={70} /></PrimitiveState>
        <PrimitiveState label="90"><QuotaBlockedState onAction={setAction} value={90} /></PrimitiveState>
        <PrimitiveState label="100"><QuotaBlockedState onAction={setAction} value={100} /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function IntegrationFailedStateStory() {
  const [action, setAction] = useState<string | null>(null);
  return (
    <StoryPage className="sb-crm-batch10-advanced-state-story">
      <PrimitiveMatrix>
        <PrimitiveState label="retry - image 12"><IntegrationFailedState onAction={setAction} state="retry" /></PrimitiveState>
        <PrimitiveState label="fallback"><IntegrationFailedState onAction={setAction} state="fallback" /></PrimitiveState>
        <PrimitiveState label="support"><IntegrationFailedState onAction={setAction} state="support" /></PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function PaymentCaseCardStory() {
  const [action, setAction] = useState<string | null>(null);
  const states = ["due", "today", "paid", "overdue", "failed", "reconciliation", "promise", "exception"];

  return (
    <StoryPage className="sb-crm-batch10-finance-card-story">
      <PrimitiveMatrix>
        {states.map((state) => (
          <PrimitiveState key={state} label={state}>
            <PaymentCaseCard onOpen={(id) => setAction(`case:${id}`)} onViewAll={() => setAction(`view-all:${state}`)} state={state} />
          </PrimitiveState>
        ))}
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function FinancePriorityPanelStory() {
  const [selected, setSelected] = useState("");
  const [action, setAction] = useState<string | null>(null);

  return (
    <StoryPage className="sb-crm-batch10-finance-priority-story">
      <PrimitiveMatrix>
          <PrimitiveState label="source image 30">
            <FinancePriorityPanel
              onSelect={(item) => {
                setSelected(item.id);
                setAction(`priority:${item.id}`);
            }}
              selectedId={selected}
            />
          </PrimitiveState>
          <PrimitiveState label="selected">
            <FinancePriorityPanel
              onSelect={(item) => {
                setSelected(item.id);
                setAction(`priority:${item.id}`);
              }}
              selectedId="overdue"
            />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <FinancePriorityPanel state="empty" />
          </PrimitiveState>
        <PrimitiveState label="blocked">
          <FinancePriorityPanel state="blocked" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function FinanceKanbanCardStory() {
  const [action, setAction] = useState<string | null>(null);
  const cards = [
    { state: "scheduled", title: "Fernanda Lima", due: "vence 14/05", method: "mensalidade", owner: "Financeiro" },
    { state: "today", title: "Lucas Ferreira", due: "vence hoje 20:00", method: "plano trimestral", owner: "Financeiro" },
    { state: "overdue", title: "Gabriela Lima", due: "2 dias em atraso", method: "mensalidade", owner: "Financeiro" },
    { state: "promise", title: "Felipe Costa", due: "prometido para 15/05", method: "WhatsApp", owner: "Agente" },
    { state: "validation", title: "Ana Paula Martins", due: "comprovante enviado 09/05", method: "Pix", owner: "Mariana" },
    { state: "reconciliation", title: "Bruno Mendes", due: "cartao recusado", method: "cartao", owner: "Sistema" },
    { state: "resolved", title: "Pedro Henrique", due: "pago em 09/05", method: "Pix", owner: "Financeiro" }
  ];

  return (
    <StoryPage className="sb-crm-batch10-finance-kanban-story">
      <PrimitiveMatrix>
        {cards.map((card) => (
          <PrimitiveState key={card.state} label={card.state}>
            <FinanceKanbanCard
              amount="R$ 420,00"
              due={card.due}
              method={card.method}
              onMenu={() => setAction(`menu:${card.state}`)}
              onSelect={() => setAction(`select:${card.state}`)}
              owner={card.owner}
              selected={card.state === "scheduled"}
              state={card.state}
              title={card.title}
            />
          </PrimitiveState>
        ))}
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function ReconciliationRowStory() {
  const [action, setAction] = useState<string | null>(null);

  return (
    <StoryPage className="sb-crm-batch10-reconciliation-story">
      <div className="sb-crm-batch10-reconciliation-list">
        <ReconciliationRow avatarSrc={source34JulianaRocha} onAction={() => setAction("matched")} state="matched" />
        <ReconciliationRow avatarSrc={source34AnaPaulaMartins} onAction={() => setAction("ambiguous")} state="ambiguous" />
        <ReconciliationRow avatarSrc={source34GabrielLima} onAction={() => setAction("dispute")} state="dispute" />
      </div>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function RiskCardStory() {
  const [action, setAction] = useState<string | null>(null);

  return (
    <StoryPage className="sb-crm-batch10-risk-story">
      <PrimitiveMatrix>
        <PrimitiveState label="high / source image 41">
          <RiskCard avatarSrc={source41RiskAnaPaulaAvatar} onOpen={() => setAction("risk:high")} state="high" />
        </PrimitiveState>
        <PrimitiveState label="medium">
          <RiskCard avatarSrc={source41RiskAnaPaulaAvatar} onOpen={() => setAction("risk:medium")} reason="queda de frequencia" riskLabel="medio" state="medium" title="Joao Pedro Silva" />
        </PrimitiveState>
        <PrimitiveState label="low">
          <RiskCard avatarSrc={source41RiskAnaPaulaAvatar} onOpen={() => setAction("risk:low")} reason="financeiro impactando presenca" riskLabel="baixo" state="low" title="Lucas Oliveira" />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function RetentionCaseStory({ component }: { component: "CancellationCase" | "ReactivationCard" | "ComplaintPanel" }) {
  const [action, setAction] = useState<string | null>(null);
  const statesByComponent = {
    CancellationCase: ["open", "saving", "cancelled"],
    ReactivationCard: ["candidate", "contacted", "reactivated", "lost"],
    ComplaintPanel: ["severe", "waiting", "resolved"]
  } satisfies Record<typeof component, string[]>;

  const renderComponent = (state: string) => {
    switch (component) {
      case "CancellationCase":
        return <CancellationCase avatarSrc={sourceRetentionAnaPaula} onAction={setAction} state={state} />;
      case "ReactivationCard":
        return <ReactivationCard avatarSrc={sourceRetentionAnaPaula} onAction={setAction} state={state} />;
      case "ComplaintPanel":
        return <ComplaintPanel avatarSrc={sourceRetentionAnaPaula} onAction={setAction} state={state} />;
    }
  };

  return (
    <StoryPage className={`sb-crm-batch10-retention-story sb-crm-batch10-retention-story--${component}`}>
      <PrimitiveMatrix>
        {statesByComponent[component].map((state, index) => (
          <PrimitiveState key={state} label={index === 0 ? `${state} / source image` : state}>
            {renderComponent(state)}
          </PrimitiveState>
        ))}
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

function SensitiveActionDialogStory() {
  const [action, setAction] = useState<string | null>(null);

  return (
    <StoryPage className="sb-crm-batch10-sensitive-story">
      <PrimitiveMatrix>
        <PrimitiveState label="destructive / source image 09">
          <SensitiveActionDialog
            cancelLabel="Cancelar"
            confirmLabel="Excluir"
            description="excluir este registro? Esta acao nao podera ser..."
            onCancel={() => setAction("cancel")}
            onConfirm={() => setAction("confirm")}
            title="Deseja realmente?"
          />
        </PrimitiveState>
        <PrimitiveState label="confirmation">
          <SensitiveActionDialog
            confirmLabel="Confirmar"
            destructive={false}
            onCancel={() => setAction("cancel-confirmation")}
            onConfirm={() => setAction("confirm-confirmation")}
            title="Deseja continuar?"
          />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <SensitiveActionDialog
            blockedReason="Aguardando permissao"
            confirmLabel="Confirmar"
            onCancel={() => setAction("cancel-blocked")}
            onConfirm={() => setAction("confirm-blocked")}
            title="Acao bloqueada"
          />
        </PrimitiveState>
      </PrimitiveMatrix>
      <CallbackChip value={action} />
    </StoryPage>
  );
}

const storyRenderers = {
  AgentCatalog: AgentCatalogStory,
  AgentCard: () => (
    <StoryPage className="sb-crm-batch10-source-catalog">
      <div className="sb-primitive-matrix sb-crm-batch10-agent-card-grid">
        <PrimitiveState label="active"><AgentCard id="active" state="active" title="Atendimento" description="Conversas, triagem, handoff e privacidade" routines={2} flows={10} icon="messageMore" /></PrimitiveState>
        <PrimitiveState label="selected"><AgentCard id="selected" selected state="draft" title="Agenda" description="Presença, faltas, reposições, vagas e grade" routines={5} flows={16} icon="calendar" /></PrimitiveState>
        <PrimitiveState label="draft"><AgentCard id="draft" state="draft" title="Gestão/Governança" description="Operação, cotas, incidentes, auditoria e qualidade" routines={3} flows={15} icon="shieldStar" /></PrimitiveState>
        <PrimitiveState label="not-contracted"><AgentCard id="not-contracted" state="not-contracted" title="Histórico" description="Fora do plano atual" routines={2} flows={12} icon="lock" /></PrimitiveState>
        <PrimitiveState label="attention"><AgentCard id="attention" state="attention" title="Retenção" description="Riscos e reativações" routines={2} flows={13} icon="shieldAlert" /></PrimitiveState>
        <PrimitiveState label="paused"><AgentCard id="paused" state="paused" title="Financeiro" description="Cobranças pausadas" routines={3} flows={15} icon="wallet" /></PrimitiveState>
        <PrimitiveState label="blocked"><AgentCard id="blocked" state="blocked" title="Histórico" description="Fora do plano atual" routines={2} flows={12} icon="lock" /></PrimitiveState>
      </div>
    </StoryPage>
  ),
  ModeSelector: ModeSelectorStory,
  ModeCard: () => (
    <StoryPage className="sb-crm-batch10-mode-card-story">
      <PrimitiveMatrix>
        <PrimitiveState label="flow default"><SourceFrame className="sb-crm-batch10-mode-card-flow"><ModeCard mode="manual" title="Manual" icon="hand" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="flow selected"><SourceFrame className="sb-crm-batch10-mode-card-flow"><ModeCard mode="autonomo-excecoes" selected title={<>Autônomo<br />com exceções</>} icon="rocket" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="flow locked"><SourceFrame className="sb-crm-batch10-mode-card-flow"><ModeCard locked mode="autonomo" title="Autônomo" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="routine default"><SourceFrame className="sb-crm-batch10-mode-card-routine"><ModeCard density="routine" mode="humano" title="Mais humano" description="A equipe decide e executa. A Taliya organiza tarefas e rascunhos." icon="users" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="routine selected"><SourceFrame className="sb-crm-batch10-mode-card-routine"><ModeCard density="routine" mode="autonomo" selected recommended title="Mais autônomo" description="A Taliya conduz o máximo possível dentro dos limites publicados." icon="rocket" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="disabled"><SourceFrame className="sb-crm-batch10-mode-card-flow"><ModeCard disabled mode="disabled" title="Desabilitado" description="Opção indisponível." /></SourceFrame></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  FlowBuilder: FlowBuilderStory,
  AgentFlowSettingsPanel: AgentFlowSettingsPanelStory,
  AgentFlowActionBar: AgentFlowActionBarStory,
  FlowStepCard: () => (
    <StoryPage className="sb-crm-batch10-flow-step-card-story">
      <PrimitiveMatrix>
        <PrimitiveState label="start"><SourceFrame className="sb-crm-batch10-flow-step-source"><FlowStepCard state="start" title="Início" description="O aluno avisa que não vai comparecer a uma aula." sections={[{ items: [{ label: "Aluno identificado", tone: "info" }, { label: "Aula existe na agenda", tone: "info" }, { label: "Aviso dentro do prazo", tone: "info" }, { label: "Falta ainda não registrada", tone: "info" }] }]} /></SourceFrame></PrimitiveState>
        <PrimitiveState label="middle"><SourceFrame className="sb-crm-batch10-flow-step-source"><FlowStepCard state="middle" title="Meio" description="A Taliya registra a falta avisada e encaminha o próximo passo." sections={[{ title: "Segue sem equipe se:", tone: "success", items: [{ label: "Aluno e aula conferem", tone: "success" }, { label: "Aviso chegou no prazo", tone: "success" }, { label: "Mensagem usa template aprovado", tone: "success" }] }, { title: "Chama a equipe se:", tone: "danger", items: [{ label: "Aviso chegou fora do prazo", tone: "danger" }, { label: "Aluno pede crédito, cancelamento ou reclama", tone: "danger" }, { label: "WhatsApp, cota ou permissão bloqueiam envio", tone: "danger" }] }]} /></SourceFrame></PrimitiveState>
        <PrimitiveState label="exception"><SourceFrame className="sb-crm-batch10-flow-step-source"><FlowStepCard state="exception" title="Exceção" description="Pede revisão humana." /></SourceFrame></PrimitiveState>
        <PrimitiveState label="blocked"><SourceFrame className="sb-crm-batch10-flow-step-source"><FlowStepCard state="blocked" title="Bloqueado" description="Template sem aprovação." /></SourceFrame></PrimitiveState>
        <PrimitiveState label="end"><SourceFrame className="sb-crm-batch10-flow-step-source"><FlowStepCard action={<Chip tone="info">Pode abrir tarefa em Reposições</Chip>} state="end" title="Fim" description="A falta fica registrada na aula e a mensagem permitida é enviada." sections={[{ items: [{ label: "Se configurado, abre tarefa de reposição.", tone: "neutral" }, { label: "Se prazo, aluno, aula, crédito ou envio não fecharem, a equipe decide.", tone: "neutral" }] }]} /></SourceFrame></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  PreflightChecklist: PreflightChecklistStory,
  ScenarioList: ScenarioListStory,
  PhonePreview: () => (
    <StoryPage className="sb-crm-batch10-phone-story">
      <PrimitiveMatrix>
        <PrimitiveState label="conversation"><SourceFrame className="sb-crm-batch10-phone-source"><PhonePreview avatarSrc={image79Avatar} /></SourceFrame></PrimitiveState>
        <PrimitiveState label="loading"><SourceFrame className="sb-crm-batch10-phone-source"><PhonePreview avatarSrc={image79Avatar} state="loading" /></SourceFrame></PrimitiveState>
        <PrimitiveState label="blocked"><SourceFrame className="sb-crm-batch10-phone-source"><PhonePreview avatarSrc={image79Avatar} state="blocked" /></SourceFrame></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  ExecutionTimeline: ExecutionTimelineStory,
  SimulationRunner: SimulationRunnerStory,
  ExecutionReceipt: () => (
    <StoryPage>
      <PrimitiveMatrix>
        <PrimitiveState label="success"><ExecutionReceipt /></PrimitiveState>
        <PrimitiveState label="exception"><ExecutionReceipt state="exception" /></PrimitiveState>
        <PrimitiveState label="failed"><ExecutionReceipt state="failed" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  StudentHeader: () => (
    <StoryPage className="sb-crm-batch10-student-header-story">
      <PrimitiveMatrix>
        <PrimitiveState label="active"><StudentHeader avatarSrc={source28AnaPaula} /></PrimitiveState>
        <PrimitiveState label="risk"><StudentHeader avatarSrc={source28AnaPaula} state="risk" /></PrimitiveState>
        <PrimitiveState label="sensitive"><StudentHeader avatarSrc={source28AnaPaula} state="sensitive" /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  StudentSummary: () => (
    <StoryPage className="sb-crm-batch10-student-summary-story">
      <PrimitiveMatrix>
        <PrimitiveState label="estado operacional"><StudentSummary /></PrimitiveState>
        <PrimitiveState label="agenda financeiro tarefas"><StudentSummary showRows /></PrimitiveState>
        <PrimitiveState label="risco financeiro"><StudentSummary metrics={[
          { label: "Presenca recente", value: "3 de 10 aulas", helperText: "30% de presenca", tone: "warning", progressValue: 30 },
          { label: "Risco", value: "alto", helperText: "14 dias sem aula", tone: "danger", icon: "shieldAlert" },
          { label: "Proxima aula", value: "sem agenda", helperText: "requer contato", tone: "warning", icon: "calendar" },
          { label: "Plano", value: "ativo", helperText: "Plano Mensal", tone: "success", icon: "creditCard" },
          { label: "Financeiro", value: "atrasado", helperText: "desde 05/04", tone: "warning", icon: "clipboard" }
        ]} /></PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  RelationshipList: () => (
    <StoryPage className="sb-crm-batch10-relationship-story">
      <RelationshipList
        items={[
          {
            id: "nikki",
            avatarSrc: source13NikkiOlaw,
            badge: "Responsavel principal",
            details: [{ icon: "phone", value: "(11) 93456-7890" }, { icon: "mail", value: "nikki@email.com" }],
            name: "Nikki Olaw",
            roleLabel: "Mae",
            variant: "primary",
            avatarStatus: null
          },
          {
            id: "joao",
            avatarSrc: source13JoaoPedro,
            badge: "Plano Premium",
            highlight: <><small>saldo 0</small><strong>Debito</strong></>,
            name: "Joao Pedro",
            roleLabel: "12 anos - 7o Ano",
            variant: "related",
            avatarStatus: null
          },
          {
            id: "sara",
            avatarSrc: source13SaraAlves,
            badge: "Tia",
            badgeTone: "neutral",
            details: [{ icon: "phone", value: "(11) 98765-4321" }, { icon: "mail", value: "sara@email.com" }],
            name: "Sara Alves",
            variant: "related",
            avatarStatus: null
          }
        ]}
      />
    </StoryPage>
  ),
  FinancePriorityPanel: FinancePriorityPanelStory,
  PaymentCaseCard: PaymentCaseCardStory,
  FinanceKanbanCard: FinanceKanbanCardStory,
  ReconciliationRow: ReconciliationRowStory,
  PipelineCard: () => (
    <StoryPage className="sb-crm-batch10-pipeline-story">
      <PrimitiveMatrix>
        <PrimitiveState label="lead / source image 37">
          <PipelineCard onSelect={() => undefined} state="lead" />
        </PrimitiveState>
        <PrimitiveState label="trial">
          <PipelineCard interest="dor lombar" nextAction="confirmar experimental" source="Indicação" state="trial" statusLabel="experimental hoje" title="Julia Ramos" />
        </PrimitiveState>
        <PrimitiveState label="enrollment">
          <PipelineCard interest="preço" nextAction="última tentativa" selected source="Instagram" state="enrollment" statusLabel="sem resposta" title="Carla Menezes" />
        </PrimitiveState>
        <PrimitiveState label="lost with menu">
          <PipelineCard interest="sem retorno" nextAction="marcar perdido" onMenu={() => undefined} onSelect={() => undefined} source="Site" state="lost" statusLabel="perdido" title="Sara Alves" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  LeadSummary: () => (
    <StoryPage className="sb-crm-batch10-lead-story">
      <PrimitiveMatrix>
        <PrimitiveState label="hot / source image 38">
          <LeadSummary avatarSrc={source38AnaSouza} onOpen={() => undefined} state="hot" />
        </PrimitiveState>
        <PrimitiveState label="no response">
          <LeadSummary
            avatarSrc={source38AnaSouza}
            lastConversation="2 dias"
            name="Carla Menezes"
            nextAction="última tentativa"
            owner="Atendimento"
            selected={false}
            state="no-response"
            statusLabel="aguardando humano"
            stageLabel="Sem resposta"
          />
        </PrimitiveState>
        <PrimitiveState label="trial">
          <LeadSummary
            avatarSrc={source38AnaSouza}
            desiredTime="quinta 08h"
            lastConversation="amanhã"
            name="Julia Ramos"
            nextAction="confirmar presença"
            selected={false}
            state="trial"
            statusLabel="experimental hoje"
            stageLabel="Experimental marcada"
          />
        </PrimitiveState>
        <PrimitiveState label="enrolled">
          <LeadSummary
            avatarSrc={source38AnaSouza}
            desiredTime="terça 17h"
            lastConversation="hoje"
            name="Gabriela Martins"
            nextAction="validar dados"
            owner="Gestora"
            selected={false}
            state="enrolled"
            statusLabel="pronto"
            stageLabel="Pré-matrícula"
          />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  TrialClassCard: () => (
    <StoryPage className="sb-crm-batch10-trial-story">
      <PrimitiveMatrix>
        <PrimitiveState label="scheduled / source image 39">
          <TrialClassCard avatarSrc={source38AnaSouza} onSelect={() => undefined} state="scheduled" />
        </PrimitiveState>
        <PrimitiveState label="attended">
          <TrialClassCard avatarSrc={source38AnaSouza} classLevel="" classTitle="Pilates Solo" nextActionLabel="fazer pós-aula" state="attended" statusLabel="Compareceu" title="Julia Ramos" />
        </PrimitiveState>
        <PrimitiveState label="no-show">
          <TrialClassCard avatarSrc={source38AnaSouza} classLevel="" classTitle="Alongamento" lastConversation="sem resposta" nextActionLabel="remarcar" source="Instagram" state="no-show" statusLabel="Faltou" title="Carla Menezes" />
        </PrimitiveState>
        <PrimitiveState label="converted">
          <TrialClassCard avatarSrc={source38AnaSouza} classLevel="" classTitle="Experimental" lastConversation="feedback positivo" nextActionLabel="iniciar matrícula" owner="Gestora" source="Indicação" state="converted" statusLabel="Pronta para matrícula" title="Camila Rocha" />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  EnrollmentChecklist: () => (
    <StoryPage className="sb-crm-batch10-enrollment-story">
      <PrimitiveMatrix>
        <PrimitiveState label="misto / source image 40">
          <EnrollmentChecklist onAction={() => undefined} />
        </PrimitiveState>
        <PrimitiveState label="incomplete">
          <EnrollmentChecklist items={[
          { id: "dados", title: "Dados básicos", state: "incomplete" },
          { id: "plano", title: "Plano escolhido", state: "incomplete" },
          { id: "aula", title: "Primeira aula definida", state: "warning" }
        ]} />
        </PrimitiveState>
        <PrimitiveState label="ready">
          <EnrollmentChecklist items={[
          { id: "dados", title: "Dados básicos", state: "complete" },
          { id: "plano", title: "Plano escolhido", state: "complete" },
          { id: "aula", title: "Primeira aula definida", state: "complete" },
          { id: "consentimento", title: "Consentimento registrado", state: "complete" }
        ]} />
        </PrimitiveState>
        <PrimitiveState label="blocked">
          <EnrollmentChecklist items={[
          { id: "dados", title: "Dados básicos", state: "complete" },
          { id: "plano", title: "Plano escolhido", state: "blocked", description: "Plano exige aprovacao manual." },
          { id: "cpf", title: "CPF pendente", state: "warning" }
        ]} />
        </PrimitiveState>
      </PrimitiveMatrix>
    </StoryPage>
  ),
  RiskCard: RiskCardStory,
  CancellationCase: () => <RetentionCaseStory component="CancellationCase" />,
  ReactivationCard: () => <RetentionCaseStory component="ReactivationCard" />,
  ComplaintPanel: () => <RetentionCaseStory component="ComplaintPanel" />,
  SensitiveActionDialog: SensitiveActionDialogStory,
  SupportTicketPanel: SupportTicketPanelStory,
  GrantAccessPanel: GrantAccessPanelStory,
  TenantCard: TenantCardStory,
  InternalOverviewDashboard: InternalOverviewDashboardStory,
  TenantDetailLayout: TenantDetailLayoutStory,
  SecurityRulePanel: SecurityRulePanelStory,
  InternalSecurityRulesPanel: InternalSecurityRulesPanelStory,
  ChartPanel: ChartPanelStory,
  ReportFilterBar: ReportFilterBarStory,
  OpportunityPanel: OpportunityPanelStory,
  ImportProgress: ImportProgressStory,
  FieldMappingTable: FieldMappingTableStory,
  DuplicateResolver: DuplicateResolverStory,
  PermissionState: PermissionStateStory,
  PlanBlockedState: PlanBlockedStateStory,
  QuotaBlockedState: QuotaBlockedStateStory,
  IntegrationFailedState: IntegrationFailedStateStory
} satisfies Record<Batch10StoryComponent, () => ReactNode>;

export function Batch10ComponentStory({ component }: { component: Batch10StoryComponent }) {
  return storyRenderers[component]();
}

export const batch10StoryParameters = {
  layout: "fullscreen",
  docs: {
    description: {
      component: batch10SourceDescription
    }
  }
};
