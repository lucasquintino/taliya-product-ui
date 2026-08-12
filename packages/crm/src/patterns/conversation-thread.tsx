/** Conversation thread pattern. */
import React from "react";
import { Avatar, Button, Icon, IconButton, LoadingState, MessageBubble, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { HandoffBanner, Composer } from "./composer-and-handoff.js";

export interface ConversationThreadMessage {
  id: string;
  sender: React.ReactNode;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
  compact?: boolean;
  variant?: "inbound" | "outbound" | "internal" | "failed" | "suggestion" | "agent" | "human";
  status?: "sent" | "delivered" | "read" | "pending" | "failed" | "locked";
}

export interface ConversationThreadSystemEvent {
  id: string;
  time: React.ReactNode;
  actor: React.ReactNode;
  body: React.ReactNode;
}

export interface ConversationThreadAction {
  id: string;
  label: React.ReactNode;
  icon?: IconName;
}

const defaultConversationThreadMessages: ConversationThreadMessage[] = [
  {
    id: "ana-1",
    sender: "Ana Silva",
    body: "Oi, perdi a aula de ontem. Consigo repor quinta?",
    time: "10:21"
  },
  {
    id: "recepcao-1",
    sender: "Recepcao",
    body: "Vou verificar uma opcao de horario e te aviso por aqui.",
    time: "10:22"
  },
  {
    id: "ana-2",
    sender: "Ana Silva",
    body: "Pode ser de manha se tiver vaga.",
    time: "10:23",
    compact: true
  }
];

const defaultConversationThreadEvents: ConversationThreadSystemEvent[] = [
  { id: "system-1", time: "10:21", actor: "Sistema", body: "Ana vinculada a turma terca 17h" }
];

const compactConversationThreadMessages: ConversationThreadMessage[] = [
  {
    id: "ana-paula-inbound",
    sender: "Ana Paula Santos",
    body: "Oi! Preciso reagendar a visita tecnica para quinta-feira pela manha.",
    time: "09:15",
    variant: "inbound"
  },
  {
    id: "attendance-outbound",
    sender: "Atendimento",
    body: "Claro, Ana Paula! Posso encaixar para quinta as 9:00h. Esta tudo certo?",
    time: "09:16",
    variant: "outbound",
    status: "read"
  },
  {
    id: "internal-note",
    sender: "Nota interna · Sam Frank",
    body: "Cliente prefere periodo da manha. Verificar disponibilidade do tecnico.",
    time: "09:17",
    variant: "internal",
    status: "locked"
  }
];

export interface ConversationThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  layout?: "default" | "compact";
  avatarSrc?: string;
  contactName?: React.ReactNode;
  subject?: React.ReactNode;
  channelLabel?: string;
  statusLabel?: React.ReactNode;
  dateLabel?: React.ReactNode;
  messages?: ConversationThreadMessage[];
  events?: ConversationThreadSystemEvent[];
  actions?: ConversationThreadAction[];
  handoffLabel?: React.ReactNode;
  suggestionTitle?: React.ReactNode;
  suggestionDescription?: React.ReactNode;
  suggestionActionLabel?: React.ReactNode;
  composerPlaceholder?: string;
  state?: "source" | "loading" | "blocked";
  onAction?: (actionId: string) => void;
  onChannelClick?: () => void;
  onStatusClick?: () => void;
  onUseSuggestion?: () => void;
  onSend?: (value: string) => void;
  onAttach?: () => void;
  onDocument?: () => void;
  onTemplateOpen?: () => void;
  onSendOptions?: () => void;
}

export function ConversationThread({
  layout = "default",
  avatarSrc,
  contactName,
  subject,
  channelLabel = "WhatsApp",
  statusLabel = "Em atendimento",
  dateLabel = "Hoje",
  messages,
  events,
  actions,
  handoffLabel = "Agente pausado · aguardando revisão humana",
  suggestionTitle = "Copiloto sugeriu uma resposta",
  suggestionDescription = "Sugestao abaixo. Voce pode editar e enviar quando quiser.",
  suggestionActionLabel = "Usar sugestao",
  composerPlaceholder = "Responder pelo WhatsApp...",
  state = "source",
  onAction,
  onChannelClick,
  onStatusClick,
  onUseSuggestion,
  onSend,
  onAttach,
  onDocument,
  onTemplateOpen,
  onSendOptions,
  className,
  children,
  ...props
}: ConversationThreadProps) {
  const isBlocked = state === "blocked";
  const isLoading = state === "loading";
  const isCompact = layout === "compact";
  const effectiveContactName = contactName ?? (isCompact ? "Ana Paula Santos" : "Ana Silva");
  const effectiveSubject = subject ?? (isCompact ? "Conversa selecionada" : "Assunto: Reposicao de aula");
  const effectiveMessages = messages ?? (isCompact ? compactConversationThreadMessages : defaultConversationThreadMessages);
  const effectiveEvents = events ?? (isCompact ? [] : defaultConversationThreadEvents);
  const effectiveActions = actions ?? (isCompact
    ? [
        { id: "search", label: "Buscar na conversa", icon: "search" as IconName },
        { id: "contact", label: "Abrir contato", icon: "user" as IconName },
        { id: "tag", label: "Gerenciar etiquetas", icon: "tag" as IconName },
        { id: "more", label: "Mais acoes", icon: "more" as IconName }
      ]
    : [
        { id: "assume", label: "Assumir", icon: "user" as IconName },
        { id: "pause-agent", label: "Pausar agente", icon: "pause" as IconName },
        { id: "create-task", label: "Criar tarefa", icon: "plus" as IconName }
      ]);

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label="Conversa selecionada"
      className={cn("tcrm-conversation-thread", isCompact && "tcrm-conversation-thread--compact", className)}
      data-component="ConversationThread"
      data-layout={layout}
      {...props}
    >
      <header className="tcrm-conversation-thread__header">
        <span className="tcrm-conversation-thread__avatar-wrap">
          <Avatar className="tcrm-conversation-thread__avatar" name={effectiveContactName?.toString() ?? "Contato"} src={avatarSrc} />
          <span aria-label={channelLabel} className="tcrm-conversation-thread__channel" role="img">
            <Icon name="whatsapp" />
          </span>
        </span>
        <span className="tcrm-conversation-thread__identity">
          <strong>{effectiveContactName}</strong>
          <small>{effectiveSubject}</small>
        </span>
        {isCompact ? (
          <span className="tcrm-conversation-thread__channel-controls">
            <Button disabled={isBlocked || isLoading} leadingIcon="whatsapp" onClick={onChannelClick} size="sm" variant="secondary">{channelLabel}</Button>
            <Button disabled={isBlocked || isLoading} onClick={onStatusClick} size="sm" trailingIcon="chevronDown" variant="secondary">{statusLabel}</Button>
          </span>
        ) : null}
        <span aria-label="Acoes da conversa" className="tcrm-conversation-thread__actions" role="toolbar">
          {effectiveActions.map((action) => isCompact ? (
            <IconButton className="tcrm-conversation-thread__icon-action" disabled={isBlocked || isLoading} icon={action.icon ?? "more"} key={action.id} label={action.label?.toString() ?? action.id} onClick={() => onAction?.(action.id)} size="sm" variant="subtle" />
          ) : (
            <Button className="tcrm-conversation-thread__action" disabled={isBlocked || isLoading} key={action.id} leadingIcon={action.icon} onClick={() => onAction?.(action.id)} size="sm" variant="secondary">{action.label}</Button>
          ))}
        </span>
      </header>
      {!isCompact ? <HandoffBanner className="tcrm-conversation-thread__handoff" description={handoffLabel} state="human needed" /> : null}
      <div className="tcrm-conversation-thread__stream">
        {isLoading ? (
          <LoadingState className="tcrm-conversation-thread__state" title="Carregando conversa" variant="skeleton" />
        ) : children ?? (
          <>
            {isCompact ? <span className="tcrm-conversation-thread__date-divider">{dateLabel}</span> : null}
            {effectiveMessages.slice(0, 1).map((message) => (
              <ConversationThreadMessageRow avatarSrc={message.avatarSrc ?? avatarSrc} compactLayout={isCompact} key={message.id} message={message} />
            ))}
            {effectiveEvents.map((event) => (
              <div className="tcrm-conversation-thread__system-row" key={event.id}>
                <span aria-hidden="true" className="tcrm-conversation-thread__system-line" />
                <time>{event.time}</time>
                <strong>{event.actor}</strong>
                <span>{event.body}</span>
              </div>
            ))}
            {effectiveMessages.slice(1).map((message) => (
              <ConversationThreadMessageRow avatarSrc={message.avatarSrc ?? avatarSrc} compactLayout={isCompact} key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
      <section className="tcrm-conversation-thread__suggestion">
        <Icon className="tcrm-conversation-thread__suggestion-icon" name="sparkles" />
        <span>
          <strong>{suggestionTitle}</strong>
          <small>{suggestionDescription}</small>
        </span>
        <Button
          className="tcrm-conversation-thread__suggestion-action"
          disabled={isBlocked || isLoading}
          onClick={onUseSuggestion}
          size="sm"
          variant="secondary"
        >
          {suggestionActionLabel}
        </Button>
      </section>
      <Composer
        disabled={isBlocked || isLoading}
        onAttach={onAttach}
        onDocument={onDocument}
        onSend={onSend}
        onSendOptions={onSendOptions}
        onTemplateOpen={onTemplateOpen}
        placeholder={composerPlaceholder}
      />
    </section>
  );
}

function ConversationThreadMessageRow({ avatarSrc, compactLayout = false, message }: { avatarSrc?: string; compactLayout?: boolean; message: ConversationThreadMessage }) {
  const messageVariant = message.variant === "agent" ? "suggestion" : message.variant === "human" ? "inbound" : message.variant ?? "inbound";
  const showAvatar = !compactLayout || messageVariant === "inbound";
  const visibleSender = compactLayout && (messageVariant === "inbound" || messageVariant === "outbound") ? undefined : message.sender;
  return (
    <div className={cn("tcrm-conversation-thread__message-row", `tcrm-conversation-thread__message-row--${messageVariant}`, message.compact && "tcrm-conversation-thread__message-row--compact")}>
      {showAvatar ? <Avatar className="tcrm-conversation-thread__message-avatar" name={message.sender?.toString() ?? "Pessoa"} src={avatarSrc} /> : <span aria-hidden="true" />}
      <MessageBubble className="tcrm-conversation-thread__bubble" sender={visibleSender} status={message.status} timestamp={message.time} variant={messageVariant}>
        {message.body}
      </MessageBubble>
    </div>
  );
}
