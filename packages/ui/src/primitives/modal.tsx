import React, { useId } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn, Icon, type IconName } from "../foundation.js";
import { IconButton } from "./button.js";

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
  const accessibleDescription = description ?? (typeof title === "string" ? `ConteÃƒÂºdo de ${title}.` : "ConteÃƒÂºdo do diÃƒÂ¡logo.");

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
