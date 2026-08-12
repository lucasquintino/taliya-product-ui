import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn, Icon, type IconName } from "../foundation.js";
import { Button, ButtonGroup } from "./button.js";
import { Modal } from "./modal.js";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  tone?: "neutral" | "destructive" | "sensitive";
  blockedReason?: string;
  loading?: boolean;
  summary?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  inline?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  tone,
  blockedReason,
  loading = false,
  summary,
  onOpenChange,
  onConfirm,
  onCancel,
  inline = false
}: ConfirmDialogProps) {
  const effectiveTone = tone ?? (destructive ? "destructive" : "neutral");
  const isDestructive = effectiveTone === "destructive";

  return (
    <Modal
      alert={isDestructive}
      description={description}
      dismissible={false}
      footer={
        <ButtonGroup align="end">
          <Button onClick={onCancel} size="sm" variant="secondary">{cancelLabel}</Button>
          <Button blockedReason={blockedReason} loading={loading} onClick={onConfirm} size="sm" variant={isDestructive ? "destructive" : "primary"}>{confirmLabel}</Button>
        </ButtonGroup>
      }
      icon={isDestructive ? "trash" : effectiveTone === "sensitive" ? "shield" : "checkCircle"}
      inline={inline}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      variant={isDestructive ? "destructive" : "simple"}
    >
      {summary ? <div className="tl-confirm-dialog__summary">{summary}</div> : null}
    </Modal>
  );
}

export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  variant?: "simple" | "icon" | "rich" | "disabled";
  icon?: IconName;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
}

export function Tooltip({
  label,
  children,
  className,
  side = "top",
  align = "center",
  delayDuration = 120,
  variant = "simple",
  icon,
  open,
  defaultOpen,
  onOpenChange,
  sideOffset = 8
}: TooltipProps) {
  const childIsDisabled = React.isValidElement(children) && Boolean((children.props as { disabled?: boolean }).disabled);
  const triggerElement =
    childIsDisabled || variant === "disabled" ? (
      <span aria-disabled={childIsDisabled ? "true" : undefined} className="tl-tooltip__disabled-trigger" tabIndex={0}>
        {children}
      </span>
    ) : (
      children
    );

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
        <RadixTooltip.Trigger asChild>{triggerElement}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            align={align}
            className={cn("tl-tooltip__content", `tl-tooltip__content--${variant}`, className)}
            side={side}
            sideOffset={sideOffset}
          >
            {icon ? <Icon name={icon} size={14} /> : null}
            <span>{label}</span>
            <RadixTooltip.Arrow className="tl-tooltip__arrow" height={7} width={12} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  width?: "sm" | "md" | "lg";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  inline?: boolean;
  showArrow?: boolean;
  sideOffset?: number;
}

export function Popover({
  trigger,
  children,
  className,
  title,
  footer,
  side = "bottom",
  align = "end",
  width = "sm",
  open,
  defaultOpen,
  onOpenChange,
  dismissible = true,
  inline = false,
  showArrow = false,
  sideOffset = 10
}: PopoverProps) {
  const triggerElement = React.isValidElement(trigger) ? (
    trigger
  ) : (
    <button className="tl-popover__trigger" type="button">
      {trigger}
    </button>
  );
  const content = (
    <>
      {title ? <div className="tl-popover__title">{title}</div> : null}
      <div className="tl-popover__body">{children}</div>
      {footer ? <div className="tl-popover__footer">{footer}</div> : null}
    </>
  );

  if (inline) {
    if (open === false) return null;

    return <div className={cn("tl-popover__content", "tl-popover__content--inline", `tl-popover__content--${width}`, className)}>{content}</div>;
  }

  return (
    <RadixPopover.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      <RadixPopover.Trigger asChild>{triggerElement}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          className={cn("tl-popover__content", `tl-popover__content--${width}`, className)}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          side={side}
          sideOffset={sideOffset}
        >
          {content}
          {showArrow ? <RadixPopover.Arrow className="tl-popover__arrow" height={8} width={14} /> : null}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export function ScrollArea({
  orientation = "vertical",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both" }) {
  return <div className={cn("tl-scroll-area", `tl-scroll-area--${orientation}`, className)} {...props} />;
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  helperText?: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  segmented?: boolean;
  indeterminate?: boolean;
}

export function ProgressBar({
  value = 0,
  label,
  helperText,
  tone = "default",
  segmented = false,
  indeterminate = false,
  className,
  ...props
}: ProgressBarProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("tl-progress", `tl-progress--${tone}`, segmented && "tl-progress--segmented", indeterminate && "tl-progress--indeterminate", className)} {...props}>
      <div className="tl-progress__meta">
        {label ? <span>{label}</span> : null}
        {!indeterminate ? <strong>{normalizedValue}%</strong> : null}
      </div>
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={indeterminate ? undefined : normalizedValue}
        className="tl-progress__track"
        role="progressbar"
      >
        <span className="tl-progress__bar" style={{ width: indeterminate ? undefined : `${normalizedValue}%` }} />
      </div>
      {helperText ? <span className="tl-progress__helper">{helperText}</span> : null}
    </div>
  );
}
