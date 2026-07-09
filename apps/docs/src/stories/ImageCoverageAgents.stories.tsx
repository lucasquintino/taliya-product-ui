import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  AgentCatalog,
  AgentFlowActionBar,
  AgentFlowSettingsPanel,
  AgentFlowSectionPanel,
  AgentFlowDrawer,
  AgentRoutineCard,
  AgentRoutineFlowCard,
  CrmDashboardPage,
  CrmRightPanelPage,
  DashboardGrid,
  ExecutionReceipt,
  ExecutionTimeline,
  FlowBuilder,
  ModeSelector,
  PhonePreview,
  PreflightChecklist,
  SimulationRunner,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Breadcrumb, Button, ButtonGroup, Chip, FieldGrid, FieldStack, Icon, List, ListItem, Panel, Select, TagInput, Textarea } from "@taliya/ui";

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

function PageStack({ children }: { children: ReactNode }) {
  return <div className="tcrm-page-family-stack">{children}</div>;
}

function agentsShellProps({
  title,
  subtitle,
  activeSidebarId = "metricas"
}: {
  title: string;
  subtitle: string;
  activeSidebarId?: string;
}) {
  return {
    activeNavId: "agentes",
    activeSidebarId,
    avatarSrc: image79Avatar,
    frame: "window" as const,
    navItems: agentsNavItems,
    pageHeaderRhythm: "stacked" as const,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

function AgentRoutineCards() {
  return (
    <>
      <AgentRoutineCard description="Confirmação, falta avisada, no-show e correção de presença" flowCount="4 fluxos" icon="calendar" id="presenca" selected state="simulated" title="Presença e faltas" />
      <AgentRoutineCard description="Vagas abertas, remarcações, créditos e lista de espera" flowCount="4 fluxos" icon="users" id="vagas" state="draft" title="Vagas, reposições e lista de espera" />
      <AgentRoutineCard description="Horário fixo, cancelamento pelo studio, conflitos e ajustes de grade" flowCount="4 fluxos" icon="clock" id="grade" state="draft" title="Grade e capacidade" />
      <AgentRoutineCard description="Primeira aula, workshops e eventos especiais" flowCount="2 fluxos" icon="star" id="primeira-aula" state="draft" title="Primeira aula e aulas especiais" />
      <AgentRoutineCard description="Disponibilidade para experimental e no-show de experimental" flowCount="2 fluxos" icon="book" id="experimental" state="draft" title="Agenda experimental" />
    </>
  );
}

function PresenceRoutineFlowCards() {
  const flows = [
    { title: "Confirmação de presença", icon: "calendar" as const, tone: "success" as const, badge: "Autônomo", description: "Antes da aula, a Taliya envia confirmação para os alunos, registra quem confirmou e deixa pendente quem não respondeu.", action: "enviar confirmação e registrar resposta", team: "falha de envio ou conflito", status: "Pronto" },
    { title: "Falta com aviso", icon: "bell" as const, tone: "info" as const, badge: "Autônomo com exceções", description: "Quando o aluno avisa que vai faltar, a Taliya verifica a regra de reposição. Se estiver tudo dentro da regra, organiza o próximo passo.", action: "organizar reposição ou próxima tarefa", team: "fora da regra ou sem vaga", status: "Pronto" },
    { title: "No-show", icon: "user" as const, tone: "info" as const, badge: "Autônomo com exceções", description: "Depois da aula, a Taliya identifica quem faltou sem avisar, tenta recuperar o contato e chama a equipe se houver risco ou recorrência.", action: "tentar contato e marcar acompanhamento", team: "risco, recorrência ou resposta sensível", status: "Pronto" },
    { title: "Correção de presença", icon: "edit" as const, tone: "warning" as const, badge: "Autônomo com aprovação", description: "Quando alguém pede correção depois da chamada, a Taliya prepara a alteração, mostra o impacto e só muda o histórico depois de aprovação.", action: "preparar alteração e impacto", team: "aprovação obrigatória antes de alterar histórico", status: "Precisa aprovação" }
  ];

  return (
    <AgentFlowSectionPanel title="Fluxos desta rotina">
      <DashboardGrid columns={2} density="compact">
        {flows.map((flow) => (
          <AgentRoutineFlowCard
            badge={flow.badge}
            badgeTone={flow.tone}
            description={flow.description}
            facts={[
              { icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" },
              { icon: "clipboard", label: "Ação:", value: flow.action },
              { icon: "alert", label: "Chama equipe:", value: flow.team }
            ]}
            icon={flow.icon}
            iconTone={flow.tone}
            key={flow.title}
            status={flow.status}
            statusTone={flow.status === "Precisa aprovação" ? "warning" : "success"}
            title={flow.title}
          />
        ))}
      </DashboardGrid>
    </AgentFlowSectionPanel>
  );
}

function PresenceRoutineActions() {
  return (
    <ButtonGroup>
      <Button leadingIcon="play" variant="primary">Simular rotina</Button>
      <Button leadingIcon="shieldCheck" variant="secondary">Revisar aprovacoes</Button>
      <Button leadingIcon="upload" variant="secondary">Preparar publicacao</Button>
    </ButtonGroup>
  );
}

function RoutineModePanel() {
  return (
    <AgentFlowSectionPanel
      description="Escolha um comportamento para a rotina inteira. A Taliya aplica isso aos fluxos abaixo, e você pode ajustar qualquer fluxo individualmente."
      kind="mode"
      title="Como essa rotina deve trabalhar?"
    >
      <ModeSelector variant="routine" />
    </AgentFlowSectionPanel>
  );
}

function FlowModePanel() {
  return (
    <AgentFlowSectionPanel
      description="Este fluxo herdou o perfil Mais autônomo da rotina, mas você pode mudar só este fluxo."
      density="compact"
      kind="mode"
      title="Como este fluxo deve trabalhar?"
    >
      <ModeSelector />
    </AgentFlowSectionPanel>
  );
}

function FlowSettingsPanel() {
  return (
    <AgentFlowSettingsPanel>
      <FieldGrid columns={4}>
        <Select
          defaultValue="2h"
          helperText="Depois desse prazo, chama a equipe."
          label="Prazo para aviso"
          options={[
            { value: "2h", label: "Até 2 horas antes da aula" },
            { value: "1h", label: "Até 1 hora antes da aula" },
            { value: "dia-anterior", label: "Até o dia anterior" }
          ]}
        />
        <Select
          defaultValue="reposicao"
          helperText="A reposição segue pelas próprias regras."
          label="Próximo passo após falta"
          options={[
            { value: "reposicao", label: "Criar tarefa de reposição" },
            { value: "mensagem", label: "Enviar mensagem ao aluno" },
            { value: "equipe", label: "Chamar equipe" }
          ]}
        />
        <TagInput
          helperText="Quem recebe o caso quando a Taliya não pode seguir."
          items={["Recepção", "Coordenadora", "Dono/admin"]}
          label="Responsáveis por exceção"
          removable
        />
        <FieldStack>
          <Select
            defaultValue="acolhedor"
            label="Tom/template da mensagem"
            options={[
              { value: "acolhedor", label: "Acolhedor" },
              { value: "direto", label: "Direto" },
              { value: "formal", label: "Formal" }
            ]}
          />
          <Textarea
            defaultValue="Oi, {{nome}}. Vi aqui que você não vai conseguir vir à aula de {{horário}}. Vou registrar sua falta e verificar o melhor próximo passo."
            density="compact"
          />
        </FieldStack>
      </FieldGrid>
    </AgentFlowSettingsPanel>
  );
}

function FlowPageActions() {
  return (
    <AgentFlowActionBar>
      <Button leadingIcon="play" variant="primary">Testar este fluxo</Button>
      <Button leadingIcon="clipboard" variant="secondary">Salvar ajuste</Button>
      <Button leadingIcon="arrowLeft" variant="secondary">Voltar para rotina</Button>
    </AgentFlowActionBar>
  );
}

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

function PublishRoutineFlowSummary() {
  return (
    <Panel compact>
      <h3>Fluxos revisados</h3>
      <ButtonGroup>
        <Chip icon="checkCircle" tone="success">Confirmação</Chip>
        <Chip icon="checkCircle" tone="success">Falta avisada</Chip>
        <Chip icon="checkCircle" tone="success">No-show</Chip>
        <Chip icon="shieldCheck" tone="warning">Correção</Chip>
      </ButtonGroup>
    </Panel>
  );
}

function PublishRoutineActivationSummary() {
  return (
    <Panel compact>
      <h3>O que sera ativado</h3>
      <List divided>
        <ListItem leading={<Icon name="checkCircle" tone="success" />} title="Envio automatico de confirmacoes de presenca">
          WhatsApp conectado, templates aprovados e auditoria ativa.
        </ListItem>
        <ListItem leading={<Icon name="checkCircle" tone="success" />} title="Criação de tarefas de reposição e acompanhamento">
          A equipe continua sendo chamada nas excecoes sensiveis.
        </ListItem>
        <ListItem leading={<Icon name="shieldCheck" tone="info" />} title="Aprovacao obrigatoria para corrigir presenca">
          Nenhuma correção histórica será feita sem decisão humana.
        </ListItem>
      </List>
    </Panel>
  );
}

function PublishRoutineActions() {
  return (
    <Panel compact>
      <ButtonGroup align="between">
        <Button leadingIcon="upload" variant="primary">Publicar rotina</Button>
        <Button leadingIcon="refresh" variant="secondary">Simular novamente</Button>
        <Button leadingIcon="arrowLeft" variant="secondary">Voltar para ajustes</Button>
      </ButtonGroup>
    </Panel>
  );
}

export function AgentsCatalogPage() {
  return (
    <CrmDashboardPage columns={1} {...agentsShellProps({ activeSidebarId: "metricas", subtitle: "Areas automatizadas do CRM", title: "Agentes" })}>
      <AgentCatalog />
    </CrmDashboardPage>
  );
}

export function AgentAgendaRoutinesPage() {
  return (
    <CrmDashboardPage
      before={
        <div className="sb-image-coverage-agents-routines-intro">
          <Chip tone="success">Contratado</Chip>
          <p>Escolha uma rotina para ajustar, simular ou publicar.</p>
        </div>
      }
      columns={3}
      dashboardClassName="sb-image-coverage-agents-routines-grid"
      dashboardStackClassName="sb-image-coverage-agents-routines-stack"
      density="compact"
      {...agentsShellProps({ activeSidebarId: "agenda", subtitle: "Presença, faltas, reposições, vagas e grade", title: "Agente Agenda" })}
    >
      <AgentRoutineCards />
    </CrmDashboardPage>
  );
}

export function AgentPresenceRoutinePage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><RoutineModePanel /><PresenceRoutineFlowCards /><PresenceRoutineActions /></PageStack>}
      panel={<AgentFlowDrawer title="Agente de Configuração" />}
      panelPlacement="drawer"
      {...agentsShellProps({
        activeSidebarId: "agenda",
        subtitle: "Confirma presenca, trata faltas avisadas, no-shows e correcoes.",
        title: "Presença e faltas"
      })}
    />
  );
}

export function AgentAbsenceFlowPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><FlowModePanel /><FlowBuilder density="compact" /><FlowSettingsPanel /><FlowPageActions /></PageStack>}
      panel={<AgentFlowDrawer />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<FlowBreadcrumb />}
      pageHeaderMeta={<FlowHeaderStatus />}
      {...agentsShellProps({ activeSidebarId: "agenda", subtitle: "Quando o aluno avisa que não vai comparecer.", title: "Falta com aviso" })}
    />
  );
}

export function AgentAbsenceFlowTestPage() {
  return (
    <CrmRightPanelPage
      main={<SimulationRunner avatarSrc={source38AnaSouza} />}
      panel={<AgentFlowDrawer state="test" />}
      panelPlacement="drawer"
      pageHeaderBreadcrumb={<FlowTestBreadcrumb />}
      pageHeaderMeta={<FlowTestHeaderStatus />}
      rightPanelVariant="simulation"
      {...agentsShellProps({
        activeSidebarId: "conversas",
        subtitle: "Veja como a Taliya executa este fluxo antes de salvar ou publicar mudanças.",
        title: "Testar Falta com aviso"
      })}
    />
  );
}

export function AgentPublishRoutinePage() {
  return (
    <CrmRightPanelPage
      main={<PageStack>
        <ButtonGroup>
          <Chip icon="rocket" tone="info">Mais autonomo</Chip>
          <Chip icon="clock" tone="info">4 fluxos</Chip>
          <Chip icon="checkCircle" tone="success">Simulação concluída</Chip>
          <Chip icon="shieldCheck" tone="success">Pronta para publicar</Chip>
        </ButtonGroup>
        <PreflightChecklist />
        <PublishRoutineFlowSummary />
        <PublishRoutineActivationSummary />
        <PublishRoutineActions />
      </PageStack>}
      panel={<AgentFlowDrawer state="publish" />}
      panelPlacement="drawer"
      {...agentsShellProps({
        activeSidebarId: "agenda",
        subtitle: "Revise o que vai entrar em operacao antes de ativar esta rotina.",
        title: "Publicar Presença e faltas"
      })}
    />
  );
}

export function AgentExecutionReceiptPage() {
  return (
    <CrmRightPanelPage
      main={<><ExecutionReceipt /><ExecutionTimeline /></>}
      mainGridColumns={2}
      panel={<AgentFlowDrawer state="execution" />}
      panelPlacement="drawer"
      {...agentsShellProps({ activeSidebarId: "metricas", subtitle: "Recibo de execução", title: "Execução" })}
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
