/** Agent-flow drawer pattern. */
import React from "react";
import { Button, Icon, IconButton, Input, TaliyaLogo, cn } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type AgentFlowDrawerState = "flow" | "routine" | "test" | "publish" | "execution" | "loading" | "blocked";
export type AgentFlowDrawerAction = "close" | "menu" | "select-question" | "send-question" | "schedule-help";

export interface AgentFlowDrawerQuestion {
  id: string;
  label: React.ReactNode;
}

export interface AgentFlowDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: AgentFlowDrawerState;
  title?: React.ReactNode;
  roleLabel?: React.ReactNode;
  message?: React.ReactNode;
  questions?: AgentFlowDrawerQuestion[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  helpActionLabel?: React.ReactNode;
  showMenu?: boolean;
  onAction?: (action: AgentFlowDrawerAction, payload?: string) => void;
  onClose?: () => void;
  onQuestionSubmit?: (value: string) => void;
}

const sourceAgentFlowQuestions: AgentFlowDrawerQuestion[] = [
  { id: "copilot-change", label: "O que muda no Copiloto?" },
  { id: "team-called", label: "Quando a equipe será chamada?" },
  { id: "autonomous-blocked", label: "Por que Autônomo está bloqueado?" },
  { id: "test-late", label: "Testar aluno fora do prazo" }
];

const agentFlowCopy: Record<AgentFlowDrawerState, { role: React.ReactNode; message: React.ReactNode; placeholder: string; questions: AgentFlowDrawerQuestion[] }> = {
  flow: {
    role: <>Ajudando neste fluxo <span aria-hidden="true">●</span></>,
    message: <>Este fluxo está em Autônomo com exceções.<br />A Taliya trata a falta avisada quando aluno, aula, prazo e mensagem estão claros. Se algo não fechar, chama a equipe definida.</>,
    placeholder: "Pergunte sobre este fluxo...",
    questions: sourceAgentFlowQuestions
  },
  routine: {
    role: <>Guiando rotina <span aria-hidden="true">●</span></>,
    message: <>Essa rotina está em Mais autônomo.<br />Cada fluxo mostra o que a Taliya faz, quando chama a equipe e onde exige aprovação.</>,
    placeholder: "Pergunte sobre esta rotina...",
    questions: [
      { id: "balanced-change", label: "O que muda no Equilibrado?" },
      { id: "approval-needed", label: "Por que correção pede aprovação?" },
      { id: "team-called", label: "Onde a equipe é chamada?" },
      { id: "simulate-absence", label: "Simular falta com aviso" }
    ]
  },
  test: {
    role: <>Explicando o teste <span aria-hidden="true">●</span></>,
    message: <>Neste teste, a Taliya registrou a falta e criou uma tarefa em Reposições. Ela não decidiu a reposição. Se o aviso estivesse fora do prazo, chamaria a equipe.</>,
    placeholder: "Pergunte sobre este teste...",
    questions: [
      { id: "test-late", label: "Testar aviso fora do prazo" },
      { id: "test-credit", label: "Testar aluno pedindo crédito" },
      { id: "copilot-difference", label: "O que seria diferente no Copiloto?" },
      { id: "no-replacement", label: "Por que não decidiu a reposição?" }
    ]
  },
  publish: {
    role: <>Revisando publicação <span aria-hidden="true">●</span></>,
    message: <>Esta rotina está pronta. A Taliya vai operar confirmações e faltas comuns sozinha, chamar a equipe nas exceções e pedir aprovação antes de corrigir histórico de presença.</>,
    placeholder: "Pergunte sobre esta publicação...",
    questions: [
      { id: "publish-change", label: "O que muda ao publicar?" },
      { id: "team-called", label: "Quando a equipe será chamada?" },
      { id: "approval-needed", label: "Por que correção pede aprovação?" },
      { id: "single-flow", label: "Posso publicar só um fluxo?" }
    ]
  },
  execution: {
    role: <>Explicando execução <span aria-hidden="true">●</span></>,
    message: <>Esta execução mostra o que aconteceu em um caso real. Ela não mostra prompt, log técnico ou pensamento interno do agente.</>,
    placeholder: "Pergunte sobre esta execução...",
    questions: [
      { id: "why-no-team", label: "Por que não chamou a equipe?" },
      { id: "created-task", label: "Onde vejo a tarefa criada?" },
      { id: "quota", label: "Isso consumiu cota?" },
      { id: "copilot-change", label: "O que mudaria no Copiloto?" }
    ]
  },
  loading: {
    role: <>Carregando orientação <span aria-hidden="true">●</span></>,
    message: <>Carregando as perguntas e o contexto deste fluxo.</>,
    placeholder: "Carregando...",
    questions: sourceAgentFlowQuestions
  },
  blocked: {
    role: <>Ajuda limitada <span aria-hidden="true">●</span></>,
    message: <>Este painel está bloqueado para perguntas novas, mas a equipe ainda pode revisar o fluxo manualmente.</>,
    placeholder: "Perguntas bloqueadas",
    questions: sourceAgentFlowQuestions
  }
};

function emitAgentFlowDrawerAction(
  action: AgentFlowDrawerAction,
  onAction?: (action: AgentFlowDrawerAction, payload?: string) => void,
  payload?: string,
  handler?: () => void
) {
  handler?.();
  onAction?.(action, payload);
}

export function AgentFlowDrawer({
  open = true,
  state = "flow",
  title = "Agente de Configuração",
  roleLabel,
  message,
  questions,
  placeholder,
  helpLabel = "Precisa de ajuda humana?",
  helpActionLabel = "Agendar ajuda",
  showMenu,
  onAction,
  onClose,
  onQuestionSubmit,
  className,
  ...props
}: AgentFlowDrawerProps) {
  const [draft, setDraft] = React.useState("");

  if (!open) return null;

  const copy = agentFlowCopy[state];
  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const renderedQuestions = questions ?? copy.questions;
  const effectivePlaceholder = placeholder ?? copy.placeholder;
  const effectiveMessage = message ?? copy.message;
  const effectiveRole = roleLabel ?? copy.role;
  const shouldShowMenu = showMenu ?? state !== "test";

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isBlocked) return;
    onQuestionSubmit?.(value);
    emitAgentFlowDrawerAction("send-question", onAction, value);
    setDraft("");
  };

  const drawerHeader = (
    <header className="tcrm-agent-flow-drawer__header">
      <span className="tcrm-agent-flow-drawer__mark"><TaliyaLogo label="Taliya" variant="mark" /></span>
      <div>
        <h2>{title}</h2>
        <p>{effectiveRole}</p>
      </div>
      {shouldShowMenu ? (
        <IconButton className="tcrm-agent-flow-drawer__menu" disabled={isLoading} icon="moreVertical" label="Mais opções do agente" onClick={() => emitAgentFlowDrawerAction("menu", onAction)} size="sm" variant="ghost" />
      ) : null}
      <IconButton className="tcrm-agent-flow-drawer__close" disabled={isLoading} icon="x" label="Fechar agente" onClick={() => emitAgentFlowDrawerAction("close", onAction, undefined, onClose)} size="sm" variant="ghost" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-agent-flow-drawer__footer">
      <span>{helpLabel}</span>
      <Button className="tcrm-agent-flow-drawer__help-action" disabled={isLoading} onClick={() => emitAgentFlowDrawerAction("schedule-help", onAction)} size="sm" type="button" variant="ghost">{helpActionLabel}</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Agente de configuração do fluxo"
      className={cn("tcrm-agent-flow-drawer", `tcrm-agent-flow-drawer--${state}`, className)}
      component="AgentFlowDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      <section className="tcrm-agent-flow-drawer__callout" aria-label="Orientação do agente">
        <Icon name="info" size="21px" />
        <p>{effectiveMessage}</p>
      </section>

      <nav className="tcrm-agent-flow-drawer__questions" aria-label="Perguntas sugeridas">
        {renderedQuestions.map((question) => (
          <Button
            className="tcrm-agent-flow-drawer__question"
            disabled={isBlocked}
            leadingIcon="help"
            key={question.id}
            onClick={() => emitAgentFlowDrawerAction("select-question", onAction, question.id)}
            trailingIcon="chevronRight"
            type="button"
            variant="ghost"
          >
            <span>{question.label}</span>
          </Button>
        ))}
      </nav>

      <form className="tcrm-agent-flow-drawer__composer" onSubmit={submit}>
        <Input
          aria-label="Pergunta para o agente"
          className="tcrm-agent-flow-drawer__composer-input"
          disabled={isBlocked}
          fieldSize="sm"
          onChange={(event) => setDraft(event.target.value)}
          placeholder={effectivePlaceholder}
          value={draft}
        />
        <IconButton className="tcrm-agent-flow-drawer__send" disabled={isBlocked || draft.trim().length === 0} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
      </form>
    </CrmDrawer>
  );
}

