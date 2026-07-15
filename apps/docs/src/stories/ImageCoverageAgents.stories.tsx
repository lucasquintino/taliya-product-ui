import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  AgentCatalog,
  AgentFlowDrawer,
  AgentFlowWorkspace,
  AgentPublishRoutineWorkspace,
  AgentRoutineCard,
  AgentRoutineIntro,
  AgentRoutineWorkspace,
  CrmDashboardPage,
  CrmRightPanelPage,
  ExecutionReceipt,
  SimulationRunner,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Breadcrumb, ButtonGroup, Chip } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source38AnaSouza from "../assets/source38-ana-souza.png";

const meta = {
  title: "CRM / Image Coverage / Agentes",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage oficial das imagens de Agentes, rotinas, fluxos, simulacao, publicacao e execucoes. Status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const agentsNavItems = [
  { id: "hoje", label: "Hoje" },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovacoes" },
  { id: "incidentes", label: "Incidentes" },
  { id: "agentes", label: "Agentes" },
  { id: "auditoria", label: "Auditoria" },
  { id: "relatorios", label: "Relatorios" }
];

function agentsShellProps({
  title,
  subtitle,
  activeSidebarId = "metricas",
  frame = "window",
  pageHeaderRhythm = "stacked",
  browserUrl
}: {
  title: string;
  subtitle: string;
  activeSidebarId?: string;
  frame?: "window" | "window-inset";
  pageHeaderRhythm?: "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish";
  browserUrl?: string;
}) {
  return {
    activeNavId: "agentes",
    activeSidebarId,
    avatarSrc: image79Avatar,
    browserUrl,
    frame,
    navItems: agentsNavItems,
    pageHeaderRhythm,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

const agentAgendaRoutines = [
  { description: "Confirmação, falta avisada, no-show e correção de presença", flowCount: "4 fluxos", icon: "calendar" as const, id: "presenca", state: "simulated" as const, title: "Presença e faltas" },
  { description: "Vagas abertas, remarcações, créditos e lista de espera", flowCount: "4 fluxos", icon: "users" as const, id: "vagas", state: "draft" as const, title: "Vagas, reposições e lista de espera" },
  { description: "Horário fixo, cancelamento pelo studio, conflitos e ajustes de grade", flowCount: "4 fluxos", icon: "clock" as const, id: "grade", state: "draft" as const, title: "Grade e capacidade" },
  { description: "Primeira aula, workshops e eventos especiais", flowCount: "2 fluxos", icon: "star" as const, id: "primeira-aula", state: "draft" as const, title: "Primeira aula e aulas especiais" },
  { description: "Disponibilidade para experimental e no-show de experimental", flowCount: "2 fluxos", icon: "book" as const, id: "experimental", state: "draft" as const, title: "Agenda experimental" }
];

function FlowHeaderStatus() {
  return (
    <ButtonGroup>
      <Chip tone="info">Autônomo com exceções</Chip>
      <Chip tone="success">Pronto</Chip>
      <Chip icon="checkCircle" tone="success">7 requisitos OK</Chip>
    </ButtonGroup>
  );
}

function FlowTestHeaderStatus() {
  return (
    <ButtonGroup>
      <Chip tone="info">Autônomo com exceções</Chip>
      <Chip tone="success">Cenário: aluno avisou no prazo</Chip>
      <Chip icon="shieldCheck" tone="success">Teste seguro</Chip>
    </ButtonGroup>
  );
}

function FlowTestBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Agentes" },
        { label: "Agenda" },
        { label: "Presença e faltas" },
        { label: "Falta com aviso" },
        { label: "Teste" }
      ]}
    />
  );
}

function FlowBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Agentes" },
        { label: "Agenda" },
        { label: "Presenca e faltas" },
        { label: "Falta com aviso" }
      ]}
    />
  );
}

function ExecutionBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { label: "Agentes" },
        { label: "Agenda" },
        { label: "Presença e faltas" },
        { label: "Falta com aviso" },
        { label: "Execução" }
      ]}
    />
  );
}

function ExecutionHeaderStatus() {
  return (
    <ButtonGroup>
      <Chip icon="checkCircle" tone="success">Concluída</Chip>
      <Chip tone="info">Autônomo com exceções</Chip>
      <Chip icon="message" tone="info">1 mensagem consumida</Chip>
      <Chip icon="arrowRight" tone="success">Continua em Reposições</Chip>
    </ButtonGroup>
  );
}

export function AgentsCatalogPage() {
  const [, setOpenedAgentId] = useState("");

  return (
    <CrmDashboardPage columns={1} {...agentsShellProps({ activeSidebarId: "metricas", frame: "window-inset", pageHeaderRhythm: "agents", subtitle: "Areas automatizadas do CRM", title: "Agentes" })}>
      <AgentCatalog onAgentOpen={setOpenedAgentId} />
    </CrmDashboardPage>
  );
}

export function AgentAgendaRoutinesPage() {
  const [openedRoutineId, setOpenedRoutineId] = useState("presenca");

  return (
    <CrmDashboardPage
      before={
        <AgentRoutineIntro />
      }
      columns={3}
      density="compact"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Agentes" }, { label: "Agenda" }]} />}
      {...agentsShellProps({ activeSidebarId: "agenda", browserUrl: "https://app.taliya.com/app/agentes/agenda", frame: "window-inset", pageHeaderRhythm: "agents-routines", subtitle: "Presença, faltas, reposições, vagas e grade", title: "Agente Agenda" })}
    >
      {agentAgendaRoutines.map((routine) => (
        <AgentRoutineCard key={routine.id} {...routine} onOpen={setOpenedRoutineId} selected={openedRoutineId === routine.id} />
      ))}
    </CrmDashboardPage>
  );
}

export function AgentPresenceRoutinePage() {
  const [mode, setMode] = useState("autonomo");
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<AgentRoutineWorkspace mode={mode} onAction={setAction} onFlowOpen={(flowId) => setAction(`flow:${flowId}`)} onModeChange={setMode} />}
      panel={<AgentFlowDrawer state="routine" title="Agente de Configuração" />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Agentes" }, { label: "Agenda" }, { label: "Presença e faltas" }]} />}
      pageHeaderMeta={<Chip showDot={false} tone="info">Rascunho simulado</Chip>}
      rightPanelVariant="agent-routine"
      {...agentsShellProps({
        activeSidebarId: "agenda",
        browserUrl: "https://app.taliya.com/app/agentes/agenda/rotinas/presenca-e-faltas",
        pageHeaderRhythm: "agents-routine-detail",
        subtitle: "Confirma presenca, trata faltas avisadas, no-shows e correcoes.",
        title: "Presença e faltas"
      })}
    />
  );
}

export function AgentAbsenceFlowPage() {
  const [mode, setMode] = useState("autonomo-excecoes");
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<AgentFlowWorkspace mode={mode} onAction={setAction} onModeChange={setMode} onSettingChange={(field) => setAction(`setting:${field}`)} onStepMenu={(stepId) => setAction(`menu:${stepId}`)} onStepOpen={(stepId) => setAction(`step:${stepId}`)} />}
      panel={<AgentFlowDrawer />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<FlowBreadcrumb />}
      pageHeaderMeta={<FlowHeaderStatus />}
      rightPanelVariant="agent-flow"
      {...agentsShellProps({ activeSidebarId: "agenda", browserUrl: "https://app.taliya.com/app/agentes/agenda/rotinas/presenca-e-faltas/fluxos/falta-com-aviso", pageHeaderRhythm: "agents-flow-detail", subtitle: "Quando o aluno avisa que não vai comparecer.", title: "Falta com aviso" })}
    />
  );
}

export function AgentAbsenceFlowTestPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("prazo");
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<SimulationRunner avatarSrc={source38AnaSouza} onAction={setAction} onScenarioSelect={setSelectedScenarioId} selectedScenarioId={selectedScenarioId} />}
      panel={<AgentFlowDrawer state="test" />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<FlowTestBreadcrumb />}
      pageHeaderMeta={<FlowTestHeaderStatus />}
      rightPanelVariant="agent-test"
      {...agentsShellProps({
        activeSidebarId: "conversas",
        browserUrl: "https://app.taliya.com/app/agentes/agenda/rotinas/presenca-e-faltas/fluxos/falta-com-aviso/teste",
        subtitle: "Veja como a Taliya executa este fluxo antes de salvar ou publicar mudanças.",
        title: "Testar Falta com aviso"
      })}
    />
  );
}

export function AgentPublishRoutinePage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<AgentPublishRoutineWorkspace onAction={setAction} onChecklistReview={(itemId) => setAction(`review:${itemId}`)} onChecklistToggle={(itemId) => setAction(`toggle:${itemId}`)} onFlowAction={(flowId, action) => setAction(`${action}:${flowId}`)} />}
      panel={<AgentFlowDrawer state="publish" />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Agentes" }, { label: "Agenda" }, { label: "Presença e faltas" }, { label: "Publicar" }]} />}
      rightPanelVariant="agent-publish"
      {...agentsShellProps({
        activeSidebarId: "agenda",
        browserUrl: "https://app.taliya.com/app/agentes/agenda/rotinas/presenca-e-faltas/publicar",
        pageHeaderRhythm: "agents-publish",
        subtitle: "Revise o que vai entrar em operacao antes de ativar esta rotina.",
        title: "Publicar Presença e faltas"
      })}
    />
  );
}

export function AgentExecutionReceiptPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<ExecutionReceipt onAction={setAction} />}
      panel={<AgentFlowDrawer state="execution" />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<ExecutionBreadcrumb />}
      pageHeaderMeta={<ExecutionHeaderStatus />}
      rightPanelVariant="agent-execution"
      {...agentsShellProps({ activeSidebarId: "metricas", subtitle: "Júlia Martins · Pilates Solo hoje 18h30", title: "Execução: Falta com aviso" })}
    />
  );
}

export const Image52AgentesCatalogo: Story = {
  name: "52 agentes catalogo",
  parameters: { sourceImage: "52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png" },
  render: () => <AgentsCatalogPage />
};

export const Image53AgenteAgendaRotinas: Story = {
  name: "53 agente agenda rotinas",
  parameters: { sourceImage: "53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png" },
  render: () => <AgentAgendaRoutinesPage />
};

export const Image54RotinaPresencaFaltas: Story = {
  name: "54 rotina presenca faltas",
  parameters: { sourceImage: "54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png" },
  render: () => <AgentPresenceRoutinePage />
};

export const Image56FluxoFaltaComAviso: Story = {
  name: "56 fluxo falta com aviso",
  parameters: { sourceImage: "56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png" },
  render: () => <AgentAbsenceFlowPage />
};

export const Image58TesteFluxoFaltaComAviso: Story = {
  name: "58 teste fluxo falta com aviso",
  parameters: { sourceImage: "58_round-4.1L_agentes_05_teste-fluxo-falta-com-aviso-aprovado.png" },
  render: () => <AgentAbsenceFlowTestPage />
};

export const Image59PublicarRotina: Story = {
  name: "59 publicar rotina presenca faltas",
  parameters: { sourceImage: "59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png" },
  render: () => <AgentPublishRoutinePage />
};

export const Image70ExecucoesFluxo: Story = {
  name: "70 execucoes fluxo falta com aviso",
  parameters: { sourceImage: "70_round-4.1P_execucoes_01_fluxo-falta-com-aviso-aprovado.png" },
  render: () => <AgentExecutionReceiptPage />
};
