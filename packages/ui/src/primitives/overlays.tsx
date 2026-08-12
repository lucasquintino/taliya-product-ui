import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../foundation.js";
import { IconButton } from "./button.js";
import { Badge, InlineAlert } from "./feedback.js";
import { LoadingState } from "../components/state-list.js";
import { Modal, type ModalProps } from "./modal.js";
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
export { Modal };
export type { ModalProps };
export { ConfirmDialog, Tooltip, Popover, ScrollArea, ProgressBar } from "./overlay-utilities.js";
export type { ConfirmDialogProps, TooltipProps, PopoverProps, ProgressBarProps } from "./overlay-utilities.js";
