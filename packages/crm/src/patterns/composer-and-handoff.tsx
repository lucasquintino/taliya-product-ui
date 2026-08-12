/** Composer, channel status, handoff, and quick-reply patterns. */
import React from "react";
import { Avatar, Button, Card, Chip, Icon, IconButton, StatusDot, ComposerInput, cn } from "@taliya/ui";
import type { IconName, StatusDotStatus } from "@taliya/ui";
import type { CrmSurfaceProps } from "./shell.js";
import type { ConversationListStatusTone } from "./conversation-list.js";

export interface ComposerProps {
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onSend?: (value: string) => void;
  onTemplateOpen?: () => void;
  onAttach?: () => void;
  onDocument?: () => void;
  onSendOptions?: () => void;
  className?: string;
}

export function Composer({
  disabled = false,
  loading = false,
  placeholder = disabled ? "Atendimento pausado" : "Responder",
  defaultValue = "",
  onSend,
  onTemplateOpen,
  onAttach,
  onDocument,
  onSendOptions,
  className
}: ComposerProps) {
  return (
    <ComposerInput
      aria-label="Responder pelo WhatsApp"
      actionsOrder={["attach", "media", "quickReply"]}
      allowEmptySend
      attachLabel="Anexar arquivo"
      className={cn("tcrm-composer", disabled && "tcrm-composer--disabled", className)}
      defaultValue={defaultValue}
      disabled={disabled}
      mediaLabel="Inserir documento"
      onAttach={onAttach}
      onMedia={onDocument}
      onQuickReply={onTemplateOpen}
      onSend={(nextValue) => onSend?.(nextValue)}
      placeholder={placeholder}
      quickReplyControl={
        <Button
          className="tcrm-composer__templates"
          disabled={disabled}
          onClick={onTemplateOpen}
          size="sm"
          trailingIcon="chevronDown"
          type="button"
          variant="secondary"
        >
          Templates
        </Button>
      }
      sendLabel="Enviar"
      sending={loading}
      sendTrailingControl={<IconButton disabled={disabled} icon="chevronDown" label="Mais opcoes de envio" onClick={onSendOptions} size="sm" variant="selected" />}
      showFieldIcon={false}
      showInternalToggle={false}
    />
  );
}

export interface ComposerPanelAction {
  id: string;
  label: string;
  icon: IconName;
  disabled?: boolean;
}

const composerPanelSourceActions: ComposerPanelAction[] = [
  { id: "attach", label: "Anexar arquivo", icon: "paperclip" },
  { id: "media", label: "Abrir midia interna", icon: "camera" },
  { id: "templates", label: "Modelos / Respostas rapidas", icon: "layout" },
  { id: "send", label: "Enviar mensagens", icon: "send" },
  { id: "note", label: "Inserir nota interna", icon: "messageSquareText" }
];

export function ComposerPanel({
  actions = composerPanelSourceActions,
  disabled = false,
  onAction,
  className,
  ...composerProps
}: ComposerProps & {
  actions?: ComposerPanelAction[];
  onAction?: (action: ComposerPanelAction) => void;
}) {
  return (
    <section className={cn("tcrm-composer-panel", className)} data-component="ComposerPanel">
      <Composer {...composerProps} disabled={disabled} />
      <div aria-label="Acoes do composer" className="tcrm-composer-panel__actions" role="group">
        {actions.map((action) => (
          <Button
            disabled={disabled || action.disabled}
            key={action.id}
            leadingIcon={action.icon}
            onClick={() => onAction?.(action)}
            size="sm"
            variant="ghost"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

/** @deprecated Use Composer or ComposerPanel. */
export function LegacyComposer({ disabled = false, className }: { disabled?: boolean; className?: string }) {
  return <ComposerInput className={className} disabled={disabled} placeholder={disabled ? "Atendimento pausado" : "Responder"} />;
}

export type ChannelStatusState = ConversationListStatusTone | "connected" | "human active";

export interface ChannelStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  sourceLabel?: React.ReactNode;
  sourceIcon?: IconName;
  statusLabel?: React.ReactNode;
  statusIcon?: IconName;
  state?: ChannelStatusState;
}

function channelStatusLabel(state: ChannelStatusState) {
  if (state === "progress") return "Em andamento";
  if (state === "copilot") return "Copiloto sugeriu";
  if (state === "failed") return "Falha de envio";
  if (state === "optout") return "Opt-out registrado";
  if (state === "connected") return "Conectado";
  return "Aguardando humano";
}

function channelStatusIcon(state: ChannelStatusState): IconName | undefined {
  if (state === "copilot") return "sparkles";
  if (state === "failed") return "alert";
  return undefined;
}

export function ChannelStatus({
  sourceLabel = "Recepção",
  sourceIcon = "calendar",
  statusLabel,
  statusIcon,
  state = "waiting",
  className,
  ...props
}: ChannelStatusProps) {
  const resolvedStatusLabel = statusLabel ?? channelStatusLabel(state);
  const resolvedStatusIcon = statusIcon ?? channelStatusIcon(state);
  const stateClass = String(state).replace(/\s+/g, "-");

  return (
    <span
      aria-label={`${sourceLabel}: ${resolvedStatusLabel}`}
      className={cn("tcrm-channel-status", `tcrm-channel-status--${stateClass}`, className)}
      role="status"
      {...props}
    >
      <Chip className="tcrm-channel-status__source" icon={sourceIcon} showDot={!sourceIcon}>
        {sourceLabel}
      </Chip>
      <Chip className="tcrm-channel-status__state" icon={resolvedStatusIcon} showDot={!resolvedStatusIcon}>
        {resolvedStatusLabel}
      </Chip>
    </span>
  );
}

export interface ChannelStatusPanelQueueItem {
  id: string;
  label: string;
  count: React.ReactNode;
}

export interface ChannelStatusPanelItem {
  id: string;
  label: string;
  status: StatusDotStatus;
}

const channelStatusPanelSourceQueue: ChannelStatusPanelQueueItem[] = [
  { id: "empty", label: "Sem espera", count: "0" },
  { id: "small", label: "Fila pequena", count: "3+" },
  { id: "medium", label: "Fila media", count: "12" },
  { id: "high", label: "Fila alta", count: "99+" }
];

const channelStatusPanelSourceItems: ChannelStatusPanelItem[] = [
  { id: "connected", label: "Conectado", status: "success" },
  { id: "pending", label: "Pendente", status: "warning" },
  { id: "failed", label: "Falha na conexao", status: "danger" }
];

export function ChannelStatusPanel({
  queueLabel = "Na fila (s)",
  queueItems = channelStatusPanelSourceQueue,
  statusLabel = "Status WhatsApp",
  items = channelStatusPanelSourceItems,
  disabled = false,
  onQueueSelect,
  onStatusSelect,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> & {
  queueLabel?: React.ReactNode;
  queueItems?: ChannelStatusPanelQueueItem[];
  statusLabel?: React.ReactNode;
  items?: ChannelStatusPanelItem[];
  disabled?: boolean;
  onQueueSelect?: (item: ChannelStatusPanelQueueItem) => void;
  onStatusSelect?: (item: ChannelStatusPanelItem) => void;
}) {
  return (
    <section className={cn("tcrm-channel-status-panel", className)} data-component="ChannelStatusPanel" {...props}>
      <small>{queueLabel}</small>
      <div aria-label={String(queueLabel)} className="tcrm-channel-status-panel__queue" role="group">
        {queueItems.map((item) => (
          <Button
            aria-label={`${item.label}: ${String(item.count)}`}
            disabled={disabled}
            key={item.id}
            onClick={() => onQueueSelect?.(item)}
            size="sm"
            variant="secondary"
          >
            {item.count}
          </Button>
        ))}
      </div>
      <small>{statusLabel}</small>
      <div className="tcrm-channel-status-panel__items">
        {items.map((item) => (
          <Button
            disabled={disabled}
            key={item.id}
            onClick={() => onStatusSelect?.(item)}
            size="sm"
            variant="secondary"
          >
            <StatusDot status={item.status} />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}

export type HandoffBannerState = "human needed" | "human active" | "resumed";
export type HandoffBannerLayout = "banner" | "compact";

export interface HandoffBannerProps extends Omit<CrmSurfaceProps, "state"> {
  state?: HandoffBannerState;
  layout?: HandoffBannerLayout;
  ownerName?: React.ReactNode;
  ownerAvatarSrc?: string;
  transferredLabel?: React.ReactNode;
  transferredAt?: React.ReactNode;
  statusLabel?: React.ReactNode;
}

export function HandoffBanner({
  title,
  description = "Agente pausado · aguardando revisão humana",
  state = "human active",
  layout = "banner",
  ownerName = "Sam Frank",
  ownerAvatarSrc,
  transferredLabel = "Transferido em:",
  transferredAt = "Hoje, 09:32",
  statusLabel = "Em atendimento humano",
  action,
  className,
  ...props
}: HandoffBannerProps) {
  const iconName: IconName = state === "resumed" ? "checkCircle" : "info";
  const stateClass = String(state).replace(/\s+/g, "-");

  if (layout === "compact") {
    const compactTitle = title ?? "Transferência para agente humano";
    const compactDescription = description === "Agente pausado · aguardando revisão humana"
      ? "Conversa transferida para atendimento humano."
      : description;

    return (
      <Card
        aria-label={String(compactTitle)}
        className={cn("tcrm-handoff-banner", "tcrm-handoff-banner--compact", `tcrm-handoff-banner--${stateClass}`, className)}
        data-component="HandoffBanner"
        data-layout="compact"
        data-state={state}
        role="status"
        {...props}
      >
        <header className="tcrm-handoff-banner__compact-header">
          <Icon name="messageMore" size="var(--taliya-control-crm-handoff-banner-compact-icon-size)" />
          <h2>{compactTitle}</h2>
        </header>
        <p className="tcrm-handoff-banner__compact-description">{compactDescription}</p>
        <div className="tcrm-handoff-banner__compact-owner">
          <Avatar name={String(ownerName)} size="sm" src={ownerAvatarSrc} />
          <strong>{ownerName}</strong>
        </div>
        <dl className="tcrm-handoff-banner__compact-fact">
          <dt>{transferredLabel}</dt>
          <dd>{transferredAt}</dd>
        </dl>
        <Chip className="tcrm-handoff-banner__compact-status" showDot={false} tone="info">{statusLabel}</Chip>
      </Card>
    );
  }

  return (
    <div className={cn("tcrm-handoff-banner", `tcrm-handoff-banner--${stateClass}`, className)} data-component="HandoffBanner" data-layout="banner" data-state={state} role="status" {...props}>
      <Icon name={iconName} size={14} />
      <span className="tcrm-handoff-banner__content">
        {title ? <strong>{title}</strong> : null}
        <span>{description}</span>
      </span>
      {action ? <span className="tcrm-handoff-banner__action">{action}</span> : null}
    </div>
  );
}

export interface QuickReplyChipItem {
  id: string;
  label: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  icon?: IconName;
  kind?: "question" | "suggested" | "action";
  loading?: boolean;
  selected?: boolean;
}

export interface QuickReplyChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: Array<QuickReplyChipItem | string>;
  onSelect?: (itemId: string, item: QuickReplyChipItem) => void;
}

export function QuickReplyChips({
  items = [
    { id: "obrigatorio", label: "O que é obrigatório?" },
    { id: "depois", label: "Posso deixar para depois?" },
    { id: "agenda", label: "Como isso afeta a agenda?" }
  ],
  onSelect,
  className,
  ...props
}: QuickReplyChipsProps) {
  return (
    <div aria-label="Respostas rápidas" className={cn("tcrm-quick-reply-chips", className)} role="group" {...props}>
      {items.map((item) => {
        const normalized: QuickReplyChipItem = typeof item === "string" ? { id: item, label: item } : item;
        const iconName = normalized.icon ?? (normalized.kind === "action" ? "sparkles" : "help");

        return (
          <Button
            aria-label={normalized.ariaLabel ?? normalized.label}
            aria-pressed={normalized.selected || undefined}
            className={cn(
              "tcrm-quick-reply-chip",
              `tcrm-quick-reply-chip--${normalized.kind ?? "question"}`,
              normalized.selected && "tcrm-quick-reply-chip--selected",
              normalized.className
            )}
            disabled={normalized.disabled}
            key={normalized.id}
            loading={normalized.loading}
            onClick={() => onSelect?.(normalized.id, normalized)}
            size="sm"
            variant="secondary"
          >
            <span className="tcrm-quick-reply-chip__icon" aria-hidden="true">
              <Icon name={iconName} size="var(--taliya-control-crm-quick-reply-icon-inner-size)" />
            </span>
            <span className="tcrm-quick-reply-chip__label">{normalized.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
