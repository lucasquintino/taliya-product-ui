/** Contextual setup assistant and human-help compositions. */
import React from "react";
import {
  Button,
  Icon,
  IconButton,
  Input,
  MessageBubble,
  TaliyaLogo,
  cn
} from "@taliya/ui";
import { QuickReplyChips } from "../../patterns/composer-and-handoff.js";
import type { QuickReplyChipItem } from "../../patterns/composer-and-handoff.js";
import { setupAgentContexts } from "./setup-shell.js";
import type { SetupAgentContext } from "./setup-shell.js";

export type SetupAgentChatState = "guide" | "human-help" | "blocked";

export interface SetupAgentChatProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  state?: SetupAgentChatState;
  variant?: "step" | "welcome";
  context?: SetupAgentContext;
  defaultValue?: string;
  onClose?: () => void;
  onMenu?: () => void;
  onQuickReply?: (itemId: string, item: QuickReplyChipItem) => void;
  onSend?: (value: string) => void;
  onHumanHelp?: () => void;
}

export function SetupAgentChat({
  state = "guide",
  variant = "step",
  context,
  defaultValue = "",
  onClose,
  onMenu,
  onQuickReply,
  onSend,
  onHumanHelp,
  className,
  ...props
}: SetupAgentChatProps) {
  const [value, setValue] = React.useState(defaultValue);
  const isBlocked = state === "blocked";
  const isHumanHelp = state === "human-help";
  const isWelcome = variant === "welcome";
  const activeContext = context ?? setupAgentContexts.shellBase;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBlocked) return;
    onSend?.(value);
  };

  return (
    <section
      aria-label="Agente de configuração"
      className={cn("tcrm-setup-agent-chat", `tcrm-setup-agent-chat--${state}`, `tcrm-setup-agent-chat--${variant}`, className)}
      data-component="SetupAgentChat"
      data-state={state}
      data-variant={variant}
      {...props}
    >
      <header className="tcrm-setup-agent-chat__header">
        <span className="tcrm-setup-agent-chat__mark">
          <TaliyaLogo label="Taliya" variant="mark" />
        </span>
        <span className="tcrm-setup-agent-chat__identity">
          <h2>Agente de configuração</h2>
          <p>Guiando setup <span aria-hidden="true" /></p>
        </span>
        <IconButton className="tcrm-setup-agent-chat__menu" disabled={isBlocked || !onMenu} icon="moreVertical" label="Mais opções do agente" onClick={onMenu} size="sm" variant="ghost" />
        <IconButton className="tcrm-setup-agent-chat__close" disabled={isBlocked || !onClose} icon="x" label="Fechar agente" onClick={onClose} size="sm" variant="ghost" />
      </header>

      <div className="tcrm-setup-agent-chat__rule" />

      {isWelcome ? (
        <MessageBubble className="tcrm-setup-agent-chat__message tcrm-setup-agent-chat__message--welcome" variant="inbound">
          <p>Oi, eu vou te guiar nessa configuração.</p>
          <p>Primeiro vamos identificar seu studio. Depois seguimos juntos pelos dados principais, equipe, canais, planos, alunos, turmas e agenda.</p>
        </MessageBubble>
      ) : (
        <>
          <section className="tcrm-setup-agent-chat__info" aria-label="Impacto desta etapa">
            <Icon name="info" />
            <p>{activeContext.impact}</p>
          </section>

          {activeContext.messages.map((message, index) => (
            <MessageBubble className={cn("tcrm-setup-agent-chat__message", `tcrm-setup-agent-chat__message--${index === 0 ? "one" : index === 1 ? "two" : "extra"}`)} key={message} variant="inbound">
              {message}
            </MessageBubble>
          ))}
        </>
      )}

      {isWelcome ? <p className="tcrm-setup-agent-chat__quick-title">Perguntas rápidas</p> : null}

      <QuickReplyChips
        className="tcrm-setup-agent-chat__quick-replies"
        items={isWelcome ? [
          { id: "configurar", label: "O que vou configurar?", disabled: isBlocked || !onQuickReply },
          { id: "ajuda", label: "Posso pedir ajuda humana?", selected: isHumanHelp, disabled: isBlocked || !onQuickReply },
          { id: "liberacao", label: "Quando o CRM será liberado?", disabled: isBlocked || !onQuickReply }
        ] : activeContext.quickReplies.map((item) => ({ ...item, selected: isHumanHelp && item.id === "later", disabled: isBlocked || !onQuickReply }))}
        onSelect={onQuickReply}
      />

      {!isWelcome ? (
        <form className="tcrm-setup-agent-chat__composer" onSubmit={submit}>
          <Input
            aria-label="Perguntar sobre esta etapa"
            className="tcrm-setup-agent-chat__composer-input"
            disabled={isBlocked}
            fieldSize="sm"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder={activeContext.composerPlaceholder ?? "Pergunte sobre esta etapa..."}
            value={value}
          />
          <IconButton aria-label="Enviar pergunta" className="tcrm-setup-agent-chat__send" disabled={isBlocked || !onSend} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
        </form>
      ) : null}

      <footer className="tcrm-setup-agent-chat__footer">
        {!isWelcome ? <span>Precisa de ajuda humana?</span> : null}
        <Button className="tcrm-setup-agent-chat__help-action" disabled={isBlocked || !onHumanHelp} onClick={onHumanHelp} size="sm" type="button" variant="ghost">Agendar ajuda</Button>
      </footer>
    </section>
  );
}

export type SetupHumanHelpCTAState = "schedule" | "active" | "unavailable";

export interface SetupHumanHelpCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: SetupHumanHelpCTAState;
  label?: string;
  onSchedule?: () => void;
}

export function SetupHumanHelpCTA({
  state = "schedule",
  label,
  onSchedule,
  className,
  ...props
}: SetupHumanHelpCTAProps) {
  const isUnavailable = state === "unavailable";
  const text = label ?? (state === "active" ? "Ajuda agendada" : state === "unavailable" ? "Ajuda indisponível" : "Agendar ajuda");

  return (
    <div
      className={cn("tcrm-setup-human-help-cta", className)}
      data-component="SetupHumanHelpCTA"
      data-state={state}
      {...props}
    >
      <Button disabled={isUnavailable} onClick={onSchedule} variant="ghost">{text}</Button>
    </div>
  );
}
