/** Agent routine workspace. */
import React from "react";
import { Button, Chip, ConnectorLine, Icon, IconButton, Panel, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { AgentFlowSectionPanel, ModeSelector, AgentRoutineFlowCard, AgentFlowActionBar } from "./agent-catalog.js";
import type { AgentRoutineFlowCardProps } from "./agent-catalog.js";

export type AgentRoutineWorkspaceAction = "simulate" | "adjust-flows" | "review-approvals" | "prepare-publication";

export interface AgentRoutineWorkspaceFlow extends Omit<AgentRoutineFlowCardProps, "onOpen"> {
  id: string;
}

export interface AgentRoutineWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: string;
  flows?: AgentRoutineWorkspaceFlow[];
  onModeChange?: (mode: string) => void;
  onFlowOpen?: (flowId: string) => void;
  onAction?: (action: AgentRoutineWorkspaceAction) => void;
}

const defaultAgentRoutineWorkspaceFlows: AgentRoutineWorkspaceFlow[] = [
  { id: "confirmacao", title: "Confirmação de presença", icon: "calendar", badge: "Autônomo", badgeTone: "success", description: "Antes da aula, a Taliya envia confirmação para os alunos, registra quem confirmou e deixa pendente quem não respondeu.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "enviar confirmação e registrar resposta" }, { icon: "alert", label: "Chama equipe:", value: "falha de envio ou conflito" }] },
  { id: "falta-aviso", title: "Falta com aviso", icon: "bell", badge: "Autônomo com exceções", description: "Quando o aluno avisa que vai faltar, a Taliya verifica a regra de reposição. Se estiver tudo dentro da regra, organiza o próximo passo.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "organizar reposição ou próxima tarefa" }, { icon: "alert", label: "Chama equipe:", value: "fora da regra ou sem vaga" }] },
  { id: "no-show", title: "No-show", icon: "user", badge: "Autônomo com exceções", description: "Depois da aula, a Taliya identifica quem faltou sem avisar, tenta recuperar o contato e chama a equipe se houver risco ou recorrência.", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "tentar contato e marcar acompanhamento" }, { icon: "alert", label: "Chama equipe:", value: "risco, recorrência ou resposta sensível" }] },
  { id: "correcao", title: "Correção de presença", icon: "edit", iconTone: "warning", badge: "Autônomo com aprovação", badgeTone: "warning", description: "Quando alguém pede correção depois da chamada, a Taliya prepara a alteração, mostra o impacto e só muda o histórico depois de aprovação.", status: "Precisa aprovação", statusTone: "warning", facts: [{ icon: "clock", label: "Gatilho:", value: "Antes, durante ou após a aula" }, { icon: "clipboard", label: "Ação:", value: "preparar alteração e impacto" }, { icon: "alert", label: "Chama equipe:", value: "aprovação obrigatória antes de alterar histórico" }] }
];

export function AgentRoutineWorkspace({ mode = "autonomo", flows = defaultAgentRoutineWorkspaceFlows, onModeChange, onFlowOpen, onAction, className, ...props }: AgentRoutineWorkspaceProps) {
  return (
    <div className={cn("tcrm-agent-routine-workspace", "tcrm-page-family-stack", className)} data-component="AgentRoutineWorkspace" {...props}>
      <AgentFlowSectionPanel description="Escolha um comportamento para a rotina inteira. A Taliya aplica isso aos fluxos abaixo, e você pode ajustar qualquer fluxo individualmente." kind="mode" title="Como essa rotina deve trabalhar?">
        <ModeSelector onChange={onModeChange} value={mode} variant="routine" />
      </AgentFlowSectionPanel>
      <AgentFlowSectionPanel columns={2} gridDensity="compact" title="Fluxos desta rotina">
        {flows.map((flow) => <AgentRoutineFlowCard key={flow.id} {...flow} onOpen={onFlowOpen} />)}
      </AgentFlowSectionPanel>
      <AgentFlowActionBar>
        <Button leadingIcon="play" onClick={() => onAction?.("simulate")} variant="primary">Simular rotina</Button>
        <Button leadingIcon="slidersRound" onClick={() => onAction?.("adjust-flows")} variant="secondary">Ajustar fluxos</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("prepare-publication")} variant="secondary">Revisar para publicar</Button>
      </AgentFlowActionBar>
    </div>
  );
}

export interface FlowStepCardItem {
  label: React.ReactNode;
  tone?: "info" | "success" | "danger" | "neutral";
}

export interface FlowStepCardSection {
  title?: React.ReactNode;
  tone?: "success" | "danger" | "neutral";
  items: FlowStepCardItem[];
}

export interface FlowStepCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  density?: "default" | "compact";
  state?: "start" | "middle" | "end" | "exception" | "blocked";
  status?: React.ReactNode;
  sections?: FlowStepCardSection[];
  action?: React.ReactNode;
  onOpen?: (stepId: string) => void;
  onMenu?: (stepId: string) => void;
  menuLabel?: string;
}

export function FlowStepCard({
  id = "step",
  title,
  description,
  density = "default",
  state = "middle",
  status,
  sections,
  action,
  onOpen,
  onMenu,
  menuLabel = "Abrir opções do nó",
  className,
  onKeyDown,
  ...props
}: FlowStepCardProps) {
  const interactive = Boolean(onOpen) && state !== "blocked";
  const fallbackSections = sections ?? [
    {
      items: [{ label: description ?? "Etapa do fluxo.", tone: state === "exception" || state === "blocked" ? "danger" : state === "start" ? "info" : "success" }]
    }
  ];

  return (
    <div
      aria-label={interactive && typeof title === "string" ? title : undefined}
      aria-disabled={state === "blocked" || undefined}
      className={cn(
        "tcrm-flow-step-card",
        `tcrm-flow-step-card--${state}`,
        density !== "default" && `tcrm-flow-step-card--${density}`,
        interactive && "tcrm-flow-step-card--interactive",
        className
      )}
      onClick={interactive ? () => onOpen?.(id) : undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen?.(id);
        }
      }}
      role={interactive ? "button" : "listitem"}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <header>
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        {status ? <Chip tone={state === "exception" ? "warning" : state === "blocked" ? "paused" : "info"}>{status}</Chip> : null}
        {onMenu ? <IconButton icon="more" label={menuLabel} onClick={(event) => { event.stopPropagation(); onMenu(id); }} size="sm" variant="ghost" /> : null}
      </header>
      <div className="tcrm-flow-step-card__body">
        {fallbackSections.map((section, sectionIndex) => (
          <div className={cn("tcrm-flow-step-card__section", section.tone && `tcrm-flow-step-card__section--${section.tone}`)} key={sectionIndex}>
            {section.title ? <b>{section.title}</b> : null}
            <ul>
              {section.items.map((item, itemIndex) => (
                <li className={cn(item.tone && `tcrm-flow-step-card__item--${item.tone}`)} key={itemIndex}>
                  {density === "compact" && item.tone === "neutral" ? null : (
                    <Icon name={item.tone === "danger" ? "alert" : "checkCircle"} size="sm" tone={item.tone === "danger" ? "danger" : item.tone === "info" ? "info" : item.tone === "neutral" ? "current" : "success"} />
                  )}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {action ? <div className="tcrm-flow-step-card__action">{action}</div> : null}
    </div>
  );
}

export function FlowBuilder({
  steps,
  onStepOpen,
  onStepMenu,
  className,
  title = "Como funciona neste modo",
  density = "default",
  variant = "default"
}: {
  steps?: FlowStepCardProps[];
  onStepOpen?: (stepId: string) => void;
  onStepMenu?: (stepId: string) => void;
  className?: string;
  title?: React.ReactNode;
  density?: "default" | "compact";
  variant?: "default" | "reference";
}) {
  if (variant === "reference") {
    const referenceSteps = [
      { id: "trigger", icon: "bolt" as IconName, eyebrow: "Gatilho / Entrada", title: "Nova mensagem em WhatsApp", chip: "Evento" },
      { id: "condition", icon: "filter" as IconName, eyebrow: "Condicao", title: "Cliente elegivel e consentimento ativo", chip: "Sim 63% / Nao 37%" },
      { id: "action", icon: "play" as IconName, eyebrow: "Acao", title: "Enviar mensagem de apresentacao", chip: "WhatsApp" },
      { id: "approval", icon: "userCheck" as IconName, eyebrow: "Aprovacao", title: "Revisao humana obrigatoria", chip: "Copiloto" },
      { id: "fallback", icon: "shield" as IconName, eyebrow: "Fallback manual", title: "Criar tarefa para atendimento", chip: "Manual" }
    ];
    return (
      <Panel compact className={cn("tcrm-flow-builder-reference", className)} data-component="FlowBuilder">
        <header className="tcrm-reference15-header"><span>1</span><h3>Builder de fluxo</h3></header>
        <div className="tcrm-flow-builder-reference__lane" role="list">
          {referenceSteps.map((step, index) => <React.Fragment key={step.id}>
            <div className="tcrm-flow-builder-reference__node" onClick={() => onStepOpen?.(step.id)} role="listitem">
              <header><Icon name={step.icon} size="sm" /><strong>{step.eyebrow}</strong><IconButton icon="moreVertical" label={`Opcoes de ${step.eyebrow}`} onClick={() => onStepMenu?.(step.id)} size="sm" variant="ghost" /></header>
              <p>{step.title}</p><Chip showDot={false} tone={step.id === "condition" ? "success" : step.id === "approval" ? "info" : "neutral"}>{step.chip}</Chip>
            </div>
            {index < referenceSteps.length - 1 ? <span className="tcrm-flow-builder-reference__connector"><ConnectorLine arrow tone={index === 1 ? "success" : "neutral"} /></span> : null}
          </React.Fragment>)}
        </div>
      </Panel>
    );
  }
  const flowSteps = steps ?? [
    {
      id: "entrada",
      state: "start" as const,
      title: "Início",
      description: "O aluno avisa que não vai comparecer a uma aula.",
      sections: [{
        items: [
          { label: "Aluno identificado", tone: "info" as const },
          { label: "Aula existe na agenda", tone: "info" as const },
          { label: "Aviso dentro do prazo", tone: "info" as const },
          { label: "Falta ainda não registrada", tone: "info" as const }
        ]
      }]
    },
    {
      id: "meio",
      state: "middle" as const,
      title: "Meio",
      description: "A Taliya registra a falta avisada e encaminha o próximo passo.",
      sections: [
        {
          title: "Segue sem equipe se:",
          tone: "success" as const,
          items: [
            { label: "Aluno e aula conferem", tone: "success" as const },
            { label: "Aviso chegou no prazo", tone: "success" as const },
            { label: "Mensagem usa template aprovado", tone: "success" as const }
          ]
        },
        {
          title: "Chama a equipe se:",
          tone: "danger" as const,
          items: [
            { label: "Aviso chegou fora do prazo", tone: "danger" as const },
            { label: "Aluno pede crédito, cancelamento ou reclama", tone: "danger" as const },
            { label: "WhatsApp, cota ou permissão bloqueiam envio", tone: "danger" as const }
          ]
        }
      ]
    },
    {
      id: "fim",
      state: "end" as const,
      title: "Fim",
      description: "A falta fica registrada na aula e a mensagem permitida é enviada.",
      sections: [{
        items: [
          { label: "Se configurado, abre tarefa de reposição.", tone: "neutral" as const },
          { label: "Se prazo, aluno, aula, crédito ou envio não fecharem, a equipe decide.", tone: "neutral" as const }
        ]
      }],
      action: <Chip tone="info">Pode abrir tarefa em Reposições</Chip>
    }
  ];

  return (
    <Panel compact className={cn("tcrm-flow-builder", density !== "default" && `tcrm-flow-builder--${density}`, className)}>
      {title ? <h3>{title}</h3> : null}
      <div className="tcrm-flow-builder__lane" role="list">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.id ?? index}>
            <FlowStepCard density={density} {...step} onMenu={onStepMenu} onOpen={onStepOpen} />
            {index < flowSteps.length - 1 ? (
              <span className="tcrm-flow-builder__arrow" aria-hidden="true">
                <ConnectorLine arrow tone="neutral" />
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </Panel>
  );
}
