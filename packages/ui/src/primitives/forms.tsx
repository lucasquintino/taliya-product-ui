import React, { useEffect, useId, useRef, useState } from "react";
import { cn, Icon } from "../foundation.js";
import { Button, IconButton, type ButtonProps } from "./button.js";
import { Input } from "./field-controls.js";
import type { InputProps } from "./field-controls.js";

export { FieldStack, Input, Select, TagInput, Textarea } from "./field-controls.js";
export type {
  FieldBaseProps,
  FieldState,
  FieldStackProps,
  InputProps,
  SelectOption,
  SelectProps,
  TagInputItem,
  TagInputProps,
  TextareaProps
} from "./field-controls.js";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  indeterminate?: boolean;
  helperText?: string;
}

export function Checkbox({ label, indeterminate = false, helperText, className, disabled, ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  // quality: external-sync — the native checkbox indeterminate property is not represented by React state.
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={cn("tl-checkbox", indeterminate && "tl-checkbox--indeterminate", disabled && "tl-checkbox--disabled", className)}>
      <input aria-checked={indeterminate ? "mixed" : undefined} disabled={disabled} ref={ref} type="checkbox" {...props} />
      <span className="tl-checkbox__box" aria-hidden="true" />
      <span className="tl-checkbox__content">
        {label ? <span>{label}</span> : null}
        {helperText ? <small>{helperText}</small> : null}
      </span>
    </label>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  helperText?: string;
}

export function Radio({ label, helperText, className, disabled, ...props }: RadioProps) {
  return (
    <label className={cn("tl-radio", disabled && "tl-radio--disabled", className)}>
      <input disabled={disabled} type="radio" {...props} />
      <span className="tl-radio__mark" aria-hidden="true" />
      <span className="tl-radio__content">
        {label ? <span>{label}</span> : null}
        {helperText ? <small>{helperText}</small> : null}
      </span>
    </label>
  );
}

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: string;
  blockedReason?: string;
  compact?: boolean;
}

export function Toggle({
  pressed,
  defaultPressed = false,
  onPressedChange,
  label,
  blockedReason,
  compact = false,
  className,
  type = "button",
  disabled,
  onClick,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const resolvedPressed = isControlled ? pressed : uncontrolledPressed;
  const isDisabled = disabled || Boolean(blockedReason);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || isDisabled) {
      return;
    }

    const nextPressed = !resolvedPressed;
    if (!isControlled) {
      setUncontrolledPressed(nextPressed);
    }
    onPressedChange?.(nextPressed);
  };

  return (
    <button
      aria-checked={resolvedPressed}
      className={cn(
        "tl-toggle",
        resolvedPressed && "tl-toggle--on",
        compact && "tl-toggle--compact",
        blockedReason && "tl-toggle--blocked",
        className
      )}
      disabled={isDisabled}
      onClick={handleClick}
      role="switch"
      title={blockedReason}
      type={type}
      {...props}
    >
      <span className="tl-toggle__track">
        <span className="tl-toggle__thumb" />
      </span>
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
  current?: boolean | "page" | "step" | "location" | "date" | "time";
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  compact = false,
  variant = "default",
  className
}: {
  options: SegmentedControlOption[];
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  compact?: boolean;
  variant?: "default" | "shell";
  className?: string;
}) {
  return (
    <div aria-label={label} className={cn("tl-segmented", compact && "tl-segmented--compact", variant !== "default" && `tl-segmented--${variant}`, className)} role="group">
      {options.map((option) => (
        <button
          aria-current={option.current === true ? "page" : option.current || undefined}
          aria-pressed={option.value === value}
          className={cn("tl-segmented__item", option.value === value && "tl-segmented__item--active")}
          disabled={option.disabled}
          key={option.value}
          onClick={() => onChange?.(option.value)}
          type="button"
        >
          <span className="tl-segmented__label">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

export type PasswordInputProps = Omit<InputProps, "type" | "trailingIcon">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = props.id ?? generatedId;

  return (
    <div className="tl-password-field">
      <Input id={inputId} type={visible ? "text" : "password"} {...props} />
      <IconButton
        className="tl-password-field__toggle"
        icon={visible ? "eyeOff" : "eye"}
        label={visible ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setVisible((current) => !current)}
        size="sm"
      />
    </div>
  );
}

export function MoneyInput(props: Omit<InputProps, "leadingIcon">) {
  return <Input inputMode="decimal" leadingText="R$" {...props} />;
}

export function DateInput(props: Omit<InputProps, "leadingIcon" | "type">) {
  return <Input leadingIcon="calendar" placeholder="DD / MM / AAAA" type="text" {...props} />;
}

export function TimeInput(props: Omit<InputProps, "leadingIcon" | "type">) {
  return <Input leadingIcon="clock" placeholder="HH : MM" type="text" {...props} />;
}

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  inline?: boolean;
}

export function FieldGroup({ title, description, inline = false, className, children, ...props }: FieldGroupProps) {
  return (
    <section className={cn("tl-field-group", inline && "tl-field-group--inline", className)} {...props}>
      {title || description ? (
        <header className="tl-field-group__header">
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="tl-field-group__body">{children}</div>
    </section>
  );
}

export interface FieldGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

export function FieldGrid({ columns = 2, className, ...props }: FieldGridProps) {
  return <div className={cn("tl-field-grid", `tl-field-grid--${columns}`, className)} {...props} />;
}

export interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
}

export function ContentGrid({ columns = 2, className, ...props }: ContentGridProps) {
  return <div className={cn("tl-content-grid", `tl-content-grid--${columns}`, className)} {...props} />;
}

export interface SocialAuthButtonProps extends Omit<ButtonProps, "variant" | "leadingIcon"> {
  provider: "Google" | "Microsoft" | string;
}

function SocialProviderMark({ provider }: { provider: string }) {
  const normalizedProvider = provider.toLowerCase();

  if (normalizedProvider === "google") {
    return (
      <svg aria-hidden="true" className="tl-social-auth-button__mark-icon" viewBox="0 0 24 24">
        <path d="M21.6 12.2c0-.8-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1Z" fill="#4285F4" />
        <path d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.5C4.8 19.8 8.3 22 12 22Z" fill="#34A853" />
        <path d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.6H3.1A10 10 0 0 0 2 12c0 1.6.4 3.1 1.1 4.4l3.3-2.5Z" fill="#FBBC05" />
        <path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3 14.7 2 12 2 8.3 2 4.8 4.2 3.1 7.6l3.3 2.5C7.2 7.8 9.4 6 12 6Z" fill="#EA4335" />
      </svg>
    );
  }

  if (normalizedProvider === "microsoft") {
    return (
      <svg aria-hidden="true" className="tl-social-auth-button__mark-icon" viewBox="0 0 24 24">
        <path d="M3 3h8v8H3V3Z" fill="#F25022" />
        <path d="M13 3h8v8h-8V3Z" fill="#7FBA00" />
        <path d="M3 13h8v8H3v-8Z" fill="#00A4EF" />
        <path d="M13 13h8v8h-8v-8Z" fill="#FFB900" />
      </svg>
    );
  }

  return <span className="tl-social-auth-button__fallback">{provider.slice(0, 1)}</span>;
}

export function SocialAuthButton({ provider, children, ...props }: SocialAuthButtonProps) {
  return (
    <Button className="tl-social-auth-button" variant="secondary" {...props}>
      <span className="tl-social-auth-button__mark">
        <SocialProviderMark provider={provider} />
      </span>
      <span className="tl-social-auth-button__label">{children ?? `Continuar com ${provider}`}</span>
    </Button>
  );
}

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: "idle" | "dragging" | "uploading" | "error" | "complete";
  title?: string;
  description?: string;
  actionLabel?: string;
  actionDisabled?: boolean;
  onAction?: () => void;
}

export function FileUpload({
  state = "idle",
  title = "Enviar arquivo",
  description = "Arraste ou selecione um arquivo.",
  actionLabel = "Selecionar",
  actionDisabled = false,
  onAction,
  className,
  ...props
}: FileUploadProps) {
  return (
    <div className={cn("tl-file-upload", `tl-file-upload--${state}`, className)} {...props}>
      <Icon name={state === "complete" ? "checkCircle" : state === "error" ? "alert" : "upload"} />
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
      <Button disabled={actionDisabled} onClick={onAction} size="sm" variant="secondary">
        {actionLabel}
      </Button>
    </div>
  );
}

export interface AttachmentItem {
  id: string;
  name: string;
  meta?: string;
  state?: "file" | "link" | "error";
}

export function AttachmentList({
  items,
  removable = false,
  onRemove,
  className
}: {
  items: AttachmentItem[];
  removable?: boolean;
  onRemove?: (item: AttachmentItem) => void;
  className?: string;
}) {
  return (
    <ul className={cn("tl-attachment-list", className)}>
      {items.map((item) => (
        <li className={cn("tl-attachment-list__item", item.state === "error" && "tl-attachment-list__item--error")} key={item.id}>
          <Icon name={item.state === "link" ? "copy" : item.state === "error" ? "alert" : "fileText"} />
          <span>
            <strong>{item.name}</strong>
            {item.meta ? <small>{item.meta}</small> : null}
          </span>
          {removable ? <IconButton icon="x" label={`Remover ${item.name}`} onClick={() => onRemove?.(item)} size="sm" /> : null}
        </li>
      ))}
    </ul>
  );
}

// Owned native input primitive for composed patterns that require an exact
// input DOM shape. Field-level semantics belong to Input in field-controls.
export const PrimitiveInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function PrimitiveInput(
  { type = "text", ...props },
  ref
) {
  return <input ref={ref} type={type} {...props} />;
});
