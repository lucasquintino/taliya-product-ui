/** Settings agent and copilot panels. */
import React from "react";
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  IconButton,
  InlineAlert,
  Input,
  ListIcon,
  LoadingState,
  Panel,
  cn
} from "@taliya/ui";
import { CrmSurface } from "./shell-foundation.js";
import type { CrmSurfaceProps } from "./shell-foundation.js";
import { AgentStatus } from "./shell-operational-a.js";

export interface SettingsAgentPanelInsight {
  id: string;
  content: React.ReactNode;
}

export interface SettingsAgentPanelReview {
  title?: string;
  description: React.ReactNode;
  actionLabel?: React.ReactNode;
}

export interface SettingsAgentPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "role" | "title"> {
  title?: React.ReactNode;
  role?: React.ReactNode;
  introduction?: React.ReactNode;
  insights?: SettingsAgentPanelInsight[];
  questions?: string[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  review?: SettingsAgentPanelReview;
  onQuestionSelect?: (question: string) => void;
  onSend?: (message: string) => void;
  onHelp?: () => void;
  onReviewAction?: () => void;
}

const settingsAgentPanelDefaultInsights: SettingsAgentPanelInsight[] = [
  { id: "owner", content: "O Dono/Admin mantém acesso total a todas as áreas do CRM, incluindo configurações e relatórios." },
  { id: "roles", content: "Recepção e Professor têm limites diferentes para proteger dados dos alunos e garantir processos corretos." }
];

const settingsAgentPanelDefaultQuestions = [
  "O que a Recepção pode fazer?",
  "Professor deve ver WhatsApp?",
  "Quando precisa aprovação?",
  "O que muda ao salvar?"
];

export function SettingsAgentPanel({
  title = "Agente de Configuração",
  role = "Ajudando em permissões",
  introduction = "Permissões definem o que cada pessoa pode fazer. Limites de agentes e fluxos ficam em Agentes/Fluxos.",
  insights = settingsAgentPanelDefaultInsights,
  questions = settingsAgentPanelDefaultQuestions,
  placeholder = "Pergunte sobre permissões...",
  helpLabel = "Agendar ajuda",
  review,
  onQuestionSelect,
  onSend,
  onHelp,
  onReviewAction,
  className,
  ...props
}: SettingsAgentPanelProps) {
  const [message, setMessage] = React.useState("");

  return (
    <Panel className={cn("tcrm-settings-agent-panel", className)} data-component="SettingsAgentPanel" variant="elevated" {...props}>
      <header className="tcrm-settings-agent-panel__header">
        <Avatar name="Taliya" size="md" status="online" />
        <span>
          <h3>{title}</h3>
          <AgentStatus label={role?.toString()} state="active" />
        </span>
      </header>
      <div className="tcrm-settings-agent-panel__body">
        {review ? (
          <InlineAlert className="tcrm-settings-agent-panel__review" tone="warning" title={review.title ?? "Revisão necessária"}>
            <span>{review.description}</span>
            {review.actionLabel ? <Button onClick={onReviewAction} size="sm" variant="secondary">{review.actionLabel}</Button> : null}
          </InlineAlert>
        ) : null}
        <InlineAlert className="tcrm-settings-agent-panel__intro" tone="info">
          {introduction}
        </InlineAlert>
        <div className="tcrm-settings-agent-panel__insights">
          {insights.map((insight) => <Card key={insight.id}>{insight.content}</Card>)}
        </div>
        <div aria-label="Perguntas sugeridas" className="tcrm-settings-agent-panel__questions" role="list">
          {questions.map((question) => (
            <Button key={question} leadingIcon="help" onClick={() => onQuestionSelect?.(question)} variant="secondary">
              {question}
            </Button>
          ))}
        </div>
      </div>
      <footer className="tcrm-settings-agent-panel__footer">
        <div className="tcrm-settings-agent-panel__composer">
          <Input
            aria-label="Pergunte ao agente de configuração"
            onChange={(event) => setMessage(event.currentTarget.value)}
            placeholder={placeholder}
            value={message}
          />
          <IconButton
            disabled={!message.trim()}
            icon="send"
            label="Enviar"
            onClick={() => {
              if (!message.trim()) return;
              onSend?.(message);
              setMessage("");
            }}
            variant="selected"
          />
        </div>
        <p>Precisa de ajuda humana? <Button onClick={onHelp} variant="ghost">{helpLabel}</Button></p>
      </footer>
    </Panel>
  );
}

export interface CopilotSuggestionProps extends CrmSurfaceProps {
  showState?: boolean;
}

export function CopilotSuggestion({
  title = "Sugestão do copiloto",
  description,
  state = "suggestion",
  showState = true,
  action,
  children,
  className
}: CopilotSuggestionProps) {
  return (
    <CrmSurface
      className={cn("tcrm-copilot-suggestion", className)}
      component="CopilotSuggestion"
      description={description}
      icon={state === "approval-needed" ? "shield" : "sparkles"}
      state={showState ? state : undefined}
      title={title}
      action={action}
    >
      {children}
    </CrmSurface>
  );
}

export type CopilotPanelState = "source" | "loading" | "empty" | "blocked";
export type CopilotPanelCopyTarget = "summary" | "next-action" | "suggestion";

export interface CopilotPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  state?: CopilotPanelState;
  summaryTitle?: React.ReactNode;
  summary?: React.ReactNode;
  nextActionTitle?: React.ReactNode;
  nextAction?: React.ReactNode;
  suggestionTitle?: React.ReactNode;
  suggestion?: React.ReactNode;
  createTaskLabel?: React.ReactNode;
  insertLabel?: React.ReactNode;
  blockedReason?: React.ReactNode;
  disabled?: boolean;
  onCopyTarget?: (target: CopilotPanelCopyTarget) => void;
  onCreateTask?: () => void;
  onInsert?: () => void;
  onInsertMenu?: () => void;
}

export function CopilotPanel({
  state = "source",
  summaryTitle = "Resumo da conversa",
  summary = "Cliente solicitou reagendar a visita tecnica para quinta-feira pela manha. Aguardando confirmacao de horario e endereco.",
  nextActionTitle = "Proxima melhor acao",
  nextAction = "Confirmar o horario sugerido e validar endereco. Informar duracao prevista da visita tecnica.",
  suggestionTitle = "Sugestao do agente",
  suggestion = "Ola Ana Paula! Confirmo sua visita tecnica para quinta-feira as 09h. Pode me confirmar seu endereco completo para registro?",
  createTaskLabel = "Criar tarefa",
  insertLabel = "Inserir mensagem",
  blockedReason = "Copiloto indisponivel ate a conversa ser revisada.",
  disabled = false,
  onCopyTarget,
  onCreateTask,
  onInsert,
  onInsertMenu,
  className,
  ...props
}: CopilotPanelProps) {
  const controlsDisabled = disabled || state === "loading" || state === "blocked";

  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label="Painel de copiloto"
      className={cn("tcrm-copilot-panel", className)}
      data-component="CopilotPanel"
      data-state={state}
      {...props}
    >
      {state === "loading" ? (
        <LoadingState className="tcrm-copilot-panel__state" title="Carregando copiloto" variant="panel" />
      ) : state === "empty" ? (
        <EmptyState className="tcrm-copilot-panel__state" description="O copiloto ainda nao preparou recomendacoes para esta conversa." title="Sem recomendacoes" />
      ) : state === "blocked" ? (
        <InlineAlert className="tcrm-copilot-panel__state" tone="warning" title="Copiloto bloqueado">{blockedReason}</InlineAlert>
      ) : (
        <>
          <Card className="tcrm-copilot-panel__card tcrm-copilot-panel__card--summary">
            <header className="tcrm-copilot-panel__card-header">
              <ListIcon icon="sparkles" tone="info" />
              <h3>{summaryTitle}</h3>
              <IconButton disabled={controlsDisabled} icon="copy" label="Copiar resumo" onClick={() => onCopyTarget?.("summary")} size="sm" variant="subtle" />
            </header>
            <p>{summary}</p>
          </Card>

          <Card className="tcrm-copilot-panel__card tcrm-copilot-panel__card--next-action">
            <header className="tcrm-copilot-panel__card-header">
              <ListIcon icon="checkCircle" tone="info" />
              <h3>{nextActionTitle}</h3>
              <IconButton disabled={controlsDisabled} icon="copy" label="Copiar proxima acao" onClick={() => onCopyTarget?.("next-action")} size="sm" variant="subtle" />
            </header>
            <p>{nextAction}</p>
            <footer><Button disabled={controlsDisabled} onClick={onCreateTask} size="sm" variant="secondary">{createTaskLabel}</Button></footer>
          </Card>

          <CopilotSuggestion className="tcrm-copilot-panel__suggestion" showState={false} title={suggestionTitle}>
            <IconButton className="tcrm-copilot-panel__copy-suggestion" disabled={controlsDisabled} icon="copy" label="Copiar sugestao" onClick={() => onCopyTarget?.("suggestion")} size="sm" variant="subtle" />
            <p className="tcrm-copilot-panel__message">{suggestion}</p>
            <div className="tcrm-copilot-panel__suggestion-actions">
              <Button disabled={controlsDisabled} onClick={onInsert} size="sm" variant="secondary">{insertLabel}</Button>
              <IconButton disabled={controlsDisabled} icon="chevronDown" label="Mais opcoes de insercao" onClick={onInsertMenu} size="sm" variant="subtle" />
            </div>
          </CopilotSuggestion>
        </>
      )}
    </section>
  );
}
