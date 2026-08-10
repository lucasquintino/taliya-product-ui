import React, { useId } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import * as RadixPopover from "@radix-ui/react-popover";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn, Icon, type IconName } from "../foundation.js";
import { Button, ButtonGroup, IconButton } from "./button.js";
import { Badge, InlineAlert } from "./feedback.js";
import { LoadingState } from "../components/state-list.js";
export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerStatus?: React.ReactNode;
  headerMeta?: React.ReactNode;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  footerLayout?: DrawerFooterProps["layout"];
  trigger?: React.ReactElement;
  dismissible?: boolean;
  modal?: boolean;
  loading?: boolean;
  blockedReason?: React.ReactNode;
  closeLabel?: string;
  bodyClassName?: string;
  overlayClassName?: string;
}

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  headerStatus,
  headerMeta,
  headerActions,
  footer,
  footerLayout = "row",
  trigger,
  dismissible = true,
  modal = true,
  loading = false,
  blockedReason,
  closeLabel = "Fechar painel",
  className,
  bodyClassName,
  overlayClassName,
  children,
  ...props
}: DrawerProps) {
  const accessibleDescription = description ?? (typeof title === "string" ? `Detalhes de ${title}.` : "Detalhes do painel.");
  const header = title ? (
    <DrawerHeader
      asDialogClose
      asDialogTitle
      actions={headerActions}
      description={description}
      meta={headerMeta}
      onClose={dismissible ? () => onOpenChange?.(false) : undefined}
      status={blockedReason ? <Badge tone="warning">Bloqueado</Badge> : headerStatus}
      title={title}
      closeLabel={closeLabel}
    />
  ) : null;
  const body = (
    <div className={cn("tl-drawer__body", bodyClassName)}>
      {loading ? <LoadingState title="Carregando dados" variant="panel" /> : null}
      {blockedReason ? (
        <InlineAlert tone="warning" title="Acao bloqueada">
          {blockedReason}
        </InlineAlert>
      ) : null}
      {children}
    </div>
  );
  const drawerFooter = footer ? <DrawerFooter layout={footerLayout}>{footer}</DrawerFooter> : null;

  return (
    <RadixDialog.Root defaultOpen={defaultOpen} modal={modal} onOpenChange={onOpenChange} open={open}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={cn("tl-overlay", "tl-drawer-overlay", overlayClassName)} />
        <RadixDialog.Content
          className={cn("tl-drawer", className)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus({ preventScroll: true });
          }}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          {...props}
        >
          {!description ? (
            <RadixDialog.Description className="tl-sr-only">
              {accessibleDescription}
            </RadixDialog.Description>
          ) : null}
          {header}
          {body}
          {drawerFooter}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export interface DrawerHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  meta?: React.ReactNode;
  status?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  closeDisabled?: boolean;
  compact?: boolean;
  asDialogTitle?: boolean;
  asDialogClose?: boolean;
}

export function DrawerHeader({
  title,
  meta,
  status,
  description,
  actions,
  onClose,
  closeLabel = "Fechar",
  closeDisabled = false,
  compact = false,
  asDialogTitle = false,
  asDialogClose = false,
  className,
  ...props
}: DrawerHeaderProps) {
  const heading = asDialogTitle ? (
    <RadixDialog.Title asChild>
      <h2>{title}</h2>
    </RadixDialog.Title>
  ) : (
    <h2>{title}</h2>
  );
  const closeButton = onClose ? (
    <IconButton disabled={closeDisabled} icon="x" label={closeLabel} onClick={onClose} size="sm" variant="ghost" />
  ) : null;

  return (
    <header className={cn("tl-drawer-header", compact && "tl-drawer-header--compact", className)} {...props}>
      <div>
        {status ? <div className="tl-drawer-header__status">{status}</div> : null}
        {heading}
        {meta ? <p>{meta}</p> : null}
        {description && asDialogTitle ? (
          <RadixDialog.Description asChild>
            <div className="tl-drawer-header__description">{description}</div>
          </RadixDialog.Description>
        ) : description ? <div className="tl-drawer-header__description">{description}</div> : null}
        {actions ? <div className="tl-drawer-header__actions">{actions}</div> : null}
      </div>
      {closeButton && asDialogClose ? (
        <RadixDialog.Close asChild>
          {closeButton}
        </RadixDialog.Close>
      ) : closeButton}
    </header>
  );
}

export interface DrawerSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  subtle?: boolean;
  variant?: "default" | "subtle" | "divided";
  compact?: boolean;
  empty?: React.ReactNode;
  loading?: boolean;
}

export function DrawerSection({
  title,
  subtle = false,
  variant = "default",
  compact = false,
  empty,
  loading = false,
  className,
  children,
  ...props
}: DrawerSectionProps) {
  const visualVariant = subtle ? "subtle" : variant;

  return (
    <section
      className={cn(
        "tl-drawer-section",
        `tl-drawer-section--${visualVariant}`,
        compact && "tl-drawer-section--compact",
        className
      )}
      {...props}
    >
      {title ? <h3>{title}</h3> : null}
      {loading ? <LoadingState title="Carregando" /> : children ?? empty}
    </section>
  );
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "row" | "stack" | "grid";
  sticky?: boolean;
}

export function DrawerFooter({ layout = "row", sticky = true, className, ...props }: DrawerFooterProps) {
  return (
    <footer
      className={cn("tl-drawer-footer", `tl-drawer-footer--${layout}`, sticky && "tl-drawer-footer--sticky", className)}
      {...props}
    />
  );
}

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  alert?: boolean;
  variant?: "simple" | "form" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  trigger?: React.ReactElement;
  dismissible?: boolean;
  closeLabel?: string;
  bodyClassName?: string;
  inline?: boolean;
  titleHidden?: boolean;
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  footer,
  alert = false,
  variant = alert ? "destructive" : "simple",
  size = "md",
  icon,
  trigger,
  dismissible = true,
  closeLabel = "Fechar modal",
  className,
  bodyClassName,
  inline = false,
  titleHidden = false,
  children,
  ...props
}: ModalProps) {
  const descriptionId = useId();
  const accessibleDescription = description ?? (typeof title === "string" ? `Conteúdo de ${title}.` : "Conteúdo do diálogo.");

  if (inline) {
    if (open === false) return null;

    return (
      <div
        aria-describedby={descriptionId}
        aria-modal="false"
        className={cn("tl-modal", "tl-modal--inline", `tl-modal--${variant}`, `tl-modal--${size}`, alert && "tl-modal--alert", className)}
        role="dialog"
        {...props}
      >
        {dismissible ? (
          <IconButton
            className="tl-modal__close"
            icon="x"
            label={closeLabel}
            onClick={() => onOpenChange?.(false)}
            size="sm"
            variant="ghost"
          />
        ) : null}
        {icon ? (
          <span className="tl-modal__icon">
            <Icon name={icon} />
          </span>
        ) : null}
        <header className="tl-modal__header">
          <h2 className={titleHidden ? "tl-sr-only" : undefined}>{title}</h2>
          <p className={!description ? "tl-sr-only" : undefined} id={descriptionId}>{accessibleDescription}</p>
        </header>
        <div className={cn("tl-modal__body", bodyClassName)}>{children}</div>
        {footer ? <footer className="tl-modal__footer">{footer}</footer> : null}
      </div>
    );
  }

  return (
    <RadixDialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="tl-overlay tl-modal-backdrop" />
        <RadixDialog.Content
          className={cn("tl-modal", `tl-modal--${variant}`, `tl-modal--${size}`, alert && "tl-modal--alert", className)}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus({ preventScroll: true });
          }}
          onEscapeKeyDown={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (!dismissible) event.preventDefault();
          }}
          {...props}
        >
          {dismissible ? (
            <RadixDialog.Close asChild>
              <IconButton className="tl-modal__close" icon="x" label={closeLabel} size="sm" variant="ghost" />
            </RadixDialog.Close>
          ) : null}
          {icon ? (
            <span className="tl-modal__icon">
              <Icon name={icon} />
            </span>
          ) : null}
          <header className="tl-modal__header">
            <RadixDialog.Title asChild>
              <h2 className={titleHidden ? "tl-sr-only" : undefined}>{title}</h2>
            </RadixDialog.Title>
            <RadixDialog.Description asChild>
              <p className={!description ? "tl-sr-only" : undefined}>{accessibleDescription}</p>
            </RadixDialog.Description>
          </header>
          <div className={cn("tl-modal__body", bodyClassName)}>{children}</div>
          {footer ? <footer className="tl-modal__footer">{footer}</footer> : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

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
          <Button onClick={onCancel} size="sm" variant="secondary">
            {cancelLabel}
          </Button>
          <Button
            blockedReason={blockedReason}
            loading={loading}
            onClick={onConfirm}
            size="sm"
            variant={isDestructive ? "destructive" : "primary"}
          >
            {confirmLabel}
          </Button>
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
