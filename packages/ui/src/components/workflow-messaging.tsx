import React, { useState } from "react";
import { cn, Icon, type IconName } from "../foundation.js";
import { Button, IconButton } from "../primitives/button.js";
import { Input, Toggle, type InputProps } from "../primitives/forms.js";
import { Chip } from "../primitives/feedback.js";

export interface SearchInputProps extends Omit<InputProps, "leadingIcon" | "type"> {
  loading?: boolean;
  resultCount?: React.ReactNode;
  onFilter?: () => void;
  filterLabel?: string;
  filterPlacement?: "separate" | "embedded";
}

export function SearchInput({
  loading = false,
  resultCount,
  onFilter,
  filterLabel = "Abrir filtros",
  filterPlacement = "separate",
  className,
  ...props
}: SearchInputProps) {
  const isFilterEmbedded = filterPlacement === "embedded";

  return (
    <div className={cn("tl-search-input", isFilterEmbedded && "tl-search-input--filter-embedded", className)}>
      <Input
        className="tl-search-input__field"
        leadingIcon="search"
        loading={loading}
        trailingText={resultCount ? <span className="tl-search-input__count">{resultCount}</span> : undefined}
        type="search"
        {...props}
      />
      {onFilter ? (
        <IconButton
          className="tl-search-input__filter"
          icon="sliders"
          label={filterLabel}
          onClick={onFilter}
          size={isFilterEmbedded ? "sm" : "md"}
        />
      ) : null}
    </div>
  );
}

export type MessageBubbleVariant = "inbound" | "outbound" | "internal" | "failed" | "suggestion";

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MessageBubbleVariant;
  sender?: React.ReactNode;
  timestamp?: React.ReactNode;
  status?: "sent" | "delivered" | "read" | "pending" | "failed" | "locked";
  action?: React.ReactNode;
  confidence?: React.ReactNode;
}

export function MessageBubble({
  variant = "inbound",
  sender,
  timestamp,
  status,
  action,
  confidence,
  className,
  children,
  role,
  ...props
}: MessageBubbleProps) {
  const effectiveStatus = status ?? (variant === "failed" ? "failed" : undefined);
  const iconForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, IconName>> = {
    delivered: "check",
    failed: "alert",
    locked: "lock",
    pending: "clock",
    read: "checkCircle",
    sent: "check"
  };
  const labelForStatus: Partial<Record<NonNullable<MessageBubbleProps["status"]>, string>> = {
    delivered: "Mensagem entregue",
    failed: "Mensagem com falha",
    locked: "Nota interna bloqueada",
    pending: "Mensagem pendente",
    read: "Mensagem lida",
    sent: "Mensagem enviada"
  };

  return (
    <div
      className={cn("tl-message-bubble", `tl-message-bubble--${variant}`, className)}
      role={role ?? (variant === "failed" ? "alert" : undefined)}
      {...props}
    >
      {sender || confidence ? (
        <div className="tl-message-bubble__header">
          {sender ? <strong>{sender}</strong> : null}
          {confidence ? <Chip tone="info">{confidence}</Chip> : null}
        </div>
      ) : null}
      <div className="tl-message-bubble__body">{children}</div>
      {timestamp || effectiveStatus || action ? (
        <div className="tl-message-bubble__meta">
          {timestamp ? <span>{timestamp}</span> : null}
          {effectiveStatus ? (
            <span
              aria-label={labelForStatus[effectiveStatus]}
              className={cn("tl-message-bubble__status", `tl-message-bubble__status--${effectiveStatus}`)}
              role="img"
            >
              <Icon name={iconForStatus[effectiveStatus] ?? "circle"} size={13} />
            </span>
          ) : null}
          {action ? <span className="tl-message-bubble__action">{action}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export interface ComposerInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "onChange" | "value"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSend?: (value: string, options: { internal: boolean }) => void;
  internal?: boolean;
  defaultInternal?: boolean;
  onInternalChange?: (internal: boolean) => void;
  allowEmptySend?: boolean;
  sending?: boolean;
  sendLabel?: string;
  attachLabel?: string;
  mediaLabel?: string;
  quickReplyLabel?: string;
  showFieldIcon?: boolean;
  showInternalToggle?: boolean;
  onAttach?: () => void;
  onMedia?: () => void;
  onQuickReply?: () => void;
  actionsOrder?: Array<"attach" | "quickReply" | "media">;
  quickReplyControl?: React.ReactNode;
  sendTrailingControl?: React.ReactNode;
}

export function ComposerInput({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  internal,
  defaultInternal = false,
  onInternalChange,
  allowEmptySend = false,
  sending = false,
  disabled = false,
  placeholder = "Digite sua mensagem...",
  sendLabel = "Enviar",
  attachLabel = "Anexar arquivo",
  mediaLabel = "Abrir midia interna",
  quickReplyLabel = "Modelos e respostas rapidas",
  showFieldIcon = true,
  showInternalToggle = true,
  onAttach,
  onMedia,
  onQuickReply,
  actionsOrder = ["attach", "quickReply", "media"],
  quickReplyControl,
  sendTrailingControl,
  className,
  ...props
}: ComposerInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [uncontrolledInternal, setUncontrolledInternal] = useState(defaultInternal);
  const currentValue = value ?? internalValue;
  const currentInternal = internal ?? uncontrolledInternal;
  const canSend = (allowEmptySend || currentValue.trim().length > 0) && !disabled && !sending;

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const send = () => {
    if (!canSend) return;
    onSend?.(currentValue, { internal: currentInternal });
    if (value === undefined) setInternalValue("");
  };

  const updateInternal = (nextInternal: boolean) => {
    if (internal === undefined) setUncontrolledInternal(nextInternal);
    onInternalChange?.(nextInternal);
  };

  const actionControl = (action: "attach" | "quickReply" | "media") => {
    if (action === "attach") {
      return <IconButton key="attach" disabled={disabled} icon="paperclip" label={attachLabel} onClick={onAttach} size="sm" variant="ghost" />;
    }

    if (action === "quickReply") {
      return quickReplyControl ?? (
        <IconButton key="quickReply" disabled={disabled} icon="layout" label={quickReplyLabel} onClick={onQuickReply} size="sm" variant="ghost" />
      );
    }

    return <IconButton key="media" disabled={disabled} icon="fileText" label={mediaLabel} onClick={onMedia} size="sm" variant="ghost" />;
  };

  return (
    <div className={cn("tl-composer-input", currentInternal && "tl-composer-input--internal", disabled && "tl-composer-input--disabled", className)}>
      <div className="tl-composer-input__field">
        {showFieldIcon ? <Icon name="message" size={16} /> : null}
        <textarea
          aria-label={props["aria-label"] ?? "Mensagem"}
          disabled={disabled}
          onChange={(event) => updateValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              send();
            }
          }}
          placeholder={placeholder}
          value={currentValue}
          {...props}
        />
      </div>
      <div className="tl-composer-input__toolbar">
        <span className="tl-composer-input__actions">
          {actionsOrder.map((action) => <React.Fragment key={action}>{actionControl(action)}</React.Fragment>)}
        </span>
        <span className="tl-composer-input__submit">
          {showInternalToggle ? (
            <Toggle
              className="tl-composer-input__toggle"
              disabled={disabled}
              label="Nota interna"
              onPressedChange={updateInternal}
              pressed={currentInternal}
            />
          ) : null}
          <Button
            className="tl-composer-input__send"
            disabled={!canSend}
            leadingIcon={sending ? "loader" : "send"}
            loading={sending}
            onClick={send}
            size="sm"
            type="button"
            variant="primary"
          >
            {sendLabel}
          </Button>
          {sendTrailingControl}
        </span>
      </div>
    </div>
  );
}
