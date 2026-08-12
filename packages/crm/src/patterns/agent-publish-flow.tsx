/** Agent publishing flow patterns. */
import React from "react";
import { Button, ButtonGroup, Card, Chip, Icon, Panel, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { DashboardGrid } from "./shell-layout-b.js";
import { AgentFlowActionBar } from "./agent-catalog.js";
import { PreflightChecklist } from "./agent-flow-workspace.js";
import type { PreflightChecklistItem } from "./agent-flow-workspace.js";

export type AgentPublishFlowAction = "view" | "simulate";
export type AgentPublishRoutineAction = "publish" | "simulate-again" | "back";

export interface AgentPublishFlowFact {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface AgentPublishFlowCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id: string;
  title: React.ReactNode;
  icon?: IconName;
  mode: React.ReactNode;
  modeTone?: ComponentTone;
  status: React.ReactNode;
  statusTone?: ComponentTone;
  facts: AgentPublishFlowFact[];
  onAction?: (flowId: string, action: AgentPublishFlowAction) => void;
}

export function AgentPublishFlowCard({
  id,
  title,
  icon = "calendar",
  mode,
  modeTone = "info",
  status,
  statusTone = "success",
  facts,
  onAction,
  className,
  ...props
}: AgentPublishFlowCardProps) {
  return (
    <Card className={cn("tcrm-agent-publish-flow-card", className)} data-component="AgentPublishFlowCard" {...props}>
      <header>
        <span className="tcrm-agent-publish-flow-card__icon"><Icon name={icon} size="lg" tone="info" /></span>
        <h4>{title}</h4>
        <Chip showDot={false} tone={modeTone}>{mode}</Chip>
        <Chip showDot={false} tone={statusTone}>{status}</Chip>
      </header>
      <dl>
        {facts.map((fact, index) => (
          <div key={`publish-fact-${String(fact.label)}-${index}`}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <ButtonGroup>
        <Button leadingIcon="eye" onClick={() => onAction?.(id, "view")} size="sm" variant="secondary">Ver fluxo</Button>
        <Button leadingIcon="play" onClick={() => onAction?.(id, "simulate")} size="sm" variant="secondary">Simular</Button>
      </ButtonGroup>
    </Card>
  );
}

export interface AgentPublishRoutineWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  flows?: AgentPublishFlowCardProps[];
  checklistItems?: PreflightChecklistItem[];
  onChecklistReview?: (itemId: string) => void;
  onChecklistToggle?: (itemId: string, checked: boolean) => void;
  onFlowAction?: (flowId: string, action: AgentPublishFlowAction) => void;
  onAction?: (action: AgentPublishRoutineAction) => void;
}

const defaultAgentPublishFlows: AgentPublishFlowCardProps[] = [
  {
    id: "confirmacao",
    title: "Confirmação de presença",
    icon: "calendar",
    mode: "Autônomo",
    modeTone: "success",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Antes da aula, quando chega o horário de confirmar presença." },
      { label: "Faz", value: "Confere aula, aluno, horário e template. Envia confirmação, registra respostas e deixa pendente quem não respondeu." },
      { label: "Para se", value: "Aula mudou, aluno não confere, resposta conflita ou WhatsApp falha." },
      { label: "Ajustes", value: "Template: confirmação padrão · Canal: WhatsApp · Tom: direto" },
      { label: "Continua em", value: "Aula / Tarefas" }
    ]
  },
  {
    id: "falta-aviso",
    title: "Falta com aviso",
    icon: "bell",
    mode: "Autônomo com exceções",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Quando o aluno avisa que não vai comparecer." },
      { label: "Faz", value: "Confere aluno, aula, prazo e falta anterior. Registra a falta, envia mensagem aprovada e cria tarefa em Reposições." },
      { label: "Chama equipe se", value: "Aviso fora do prazo, aluno pede crédito/cancelamento, aula não encontrada ou WhatsApp falha." },
      { label: "Ajustes", value: "Prazo: até 2h antes · Responsáveis: Recepção, Coordenação · Tom: acolhedor" },
      { label: "Continua em", value: "Reposições / Tarefas" }
    ]
  },
  {
    id: "no-show",
    title: "Falta sem aviso",
    icon: "user",
    mode: "Autônomo com exceções",
    status: "Pronto",
    facts: [
      { label: "Início", value: "Depois da aula, quando o aluno previsto não apareceu nem avisou." },
      { label: "Faz", value: "Confere chamada, janela de tolerância e histórico. Marca ausência e abre acompanhamento." },
      { label: "Chama equipe se", value: "Chamada não foi fechada, aviso apareceu em outro canal, recorrência alta ou risco de cancelamento." },
      { label: "Ajustes", value: "Tolerância: após aula · Responsáveis: Recepção, Retenção · Tom: cuidadoso" },
      { label: "Continua em", value: "Aula / Retenção / Tarefas" }
    ]
  },
  {
    id: "correcao",
    title: "Correção de presença",
    icon: "edit",
    mode: "Autônomo com aprovação",
    status: "Aprovação ao executar",
    statusTone: "warning",
    facts: [
      { label: "Início", value: "Quando alguém solicita corrigir presença depois da aula." },
      { label: "Faz", value: "Confere aula, aluno, motivo e impacto. Prepara a alteração e cria pedido de aprovação." },
      { label: "Não faz sozinha", value: "Não altera histórico de presença antes da aprovação." },
      { label: "Ajustes", value: "Aprovadores: Coordenação, Dono/admin · Motivo obrigatório · Auditoria ativa" },
      { label: "Continua em", value: "Aprovações / Auditoria" }
    ]
  }
];

export function AgentPublishRoutineWorkspace({
  flows = defaultAgentPublishFlows,
  checklistItems,
  onChecklistReview,
  onChecklistToggle,
  onFlowAction,
  onAction,
  className,
  ...props
}: AgentPublishRoutineWorkspaceProps) {
  return (
    <div className={cn("tcrm-agent-publish-workspace", "tcrm-page-family-stack", className)} data-component="AgentPublishRoutineWorkspace" {...props}>
      <ButtonGroup>
        <Chip icon="rocket" tone="info">Mais autonomo</Chip>
        <Chip icon="clock" tone="info">4 fluxos</Chip>
        <Chip icon="checkCircle" tone="success">Simulação concluída</Chip>
        <Chip icon="shieldCheck" tone="success">Pronta para publicar</Chip>
      </ButtonGroup>
      <PreflightChecklist items={checklistItems} onItemAction={onChecklistReview} onToggle={onChecklistToggle} />
      <Panel compact className="tcrm-agent-publish-workspace__flows">
        <h3>Fluxos que serão publicados</h3>
        <DashboardGrid columns={2} density="compact">
          {flows.map((flow) => <AgentPublishFlowCard key={flow.id} {...flow} onAction={onFlowAction} />)}
        </DashboardGrid>
      </Panel>
      <Panel compact className="tcrm-agent-publish-workspace__activation">
        <h3>O que será ativado</h3>
        <div>
          {[
            "Envio automático de confirmações de presença.",
            "Criação de tarefas de reposição e acompanhamento.",
            "Registro automático de faltas quando as regras fecharem.",
            "Aprovação obrigatória para corrigir presença."
          ].map((item) => <span key={item}><Icon name="checkCircle" size="sm" tone="success" />{item}</span>)}
        </div>
      </Panel>
      <AgentFlowActionBar>
        <Button leadingIcon="upload" onClick={() => onAction?.("publish")} variant="primary">Publicar rotina</Button>
        <Button leadingIcon="refresh" onClick={() => onAction?.("simulate-again")} variant="secondary">Simular novamente</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar para ajustes</Button>
      </AgentFlowActionBar>
    </div>
  );
}
