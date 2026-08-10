import React, { useEffect, useId, useRef, useState } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn, Icon, type IconName, type IconProps, type Size } from "../foundation.js";
import { Button, IconButton } from "./button.js";
import type { ButtonProps } from "./button.js";
export type FieldState = "default" | "success" | "warning" | "error" | "blocked";

export type FieldBaseProps = {
  label?: string;
  helperText?: string;
  error?: string;
  fieldSize?: Size;
  fieldState?: FieldState;
  blockedReason?: string;
};

export interface InputProps
  extends FieldBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  leadingIconTone?: IconProps["tone"];
  trailingIconTone?: IconProps["tone"];
  leadingText?: React.ReactNode;
  trailingText?: React.ReactNode;
  clearLabel?: string;
  onClear?: () => void;
  loading?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  fieldSize = "md",
  fieldState = "default",
  blockedReason,
  leadingIcon,
  trailingIcon,
  leadingIconTone,
  trailingIconTone,
  leadingText,
  trailingText,
  clearLabel,
  onClear,
  loading = false,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${inputId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);
  const fallbackAriaLabel =
    props["aria-label"] ??
    (!label && !props["aria-labelledby"] && typeof props.placeholder === "string" ? props.placeholder : undefined);

  return (
    <label
      className={cn(
        "tl-field",
        `tl-field--${resolvedState}`,
        readOnly && "tl-field--readonly",
        isDisabled && "tl-field--disabled",
        className
      )}
      htmlFor={inputId}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <span className={cn("tl-input-shell", `tl-input-shell--${fieldSize}`)}>
        {leadingIcon ? (
          <Icon
            className={loading ? "tl-spin" : undefined}
            name={loading ? "loader" : leadingIcon}
            size="var(--taliya-control-field-icon-size)"
            tone={leadingIconTone}
          />
        ) : null}
        {leadingText ? <span className="tl-input-affix">{leadingText}</span> : null}
        <input
          aria-busy={loading || undefined}
          aria-describedby={descriptionId}
          aria-label={fallbackAriaLabel}
          aria-invalid={Boolean(error) || undefined}
          aria-labelledby={labelId}
          className="tl-input"
          disabled={isDisabled}
          id={inputId}
          readOnly={readOnly}
          {...props}
        />
        {trailingText ? <span className="tl-input-affix">{trailingText}</span> : null}
        {onClear ? (
          <IconButton
            className="tl-input-clear"
            disabled={isDisabled || readOnly}
            icon="x"
            label={clearLabel ?? `Limpar ${label ?? "campo"}`}
            onClick={onClear}
            size="sm"
            variant="ghost"
          />
        ) : null}
        {trailingIcon ? (
          <Icon
            name={trailingIcon}
            size="var(--taliya-control-field-icon-size)"
            tone={trailingIconTone ?? (resolvedState === "error" ? "danger" : "current")}
          />
        ) : null}
      </span>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </label>
  );
}

export interface TextareaProps
  extends FieldBaseProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  density?: "default" | "compact";
}

export function Textarea({
  label,
  helperText,
  error,
  fieldState = "default",
  density = "default",
  blockedReason,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${inputId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);

  return (
    <label
      className={cn(
        "tl-field",
        `tl-field--${resolvedState}`,
        readOnly && "tl-field--readonly",
        isDisabled && "tl-field--disabled",
        className
      )}
      htmlFor={inputId}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <textarea
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error) || undefined}
        aria-labelledby={labelId}
        className={cn("tl-textarea", density !== "default" && `tl-textarea--${density}`)}
        disabled={isDisabled}
        id={inputId}
        readOnly={readOnly}
        {...props}
      />
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </label>
  );
}

export interface FieldStackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md";
}

export function FieldStack({ gap = "sm", className, ...props }: FieldStackProps) {
  return <div className={cn("tl-field-stack", `tl-field-stack--${gap}`, className)} {...props} />;
}

export interface TagInputItem {
  id: string;
  label: React.ReactNode;
}

export interface TagInputProps extends FieldBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: Array<TagInputItem | string>;
  removable?: boolean;
  onRemove?: (item: TagInputItem, index: number) => void;
  placeholder?: React.ReactNode;
}

export function TagInput({
  label,
  helperText,
  error,
  fieldState = "default",
  blockedReason,
  className,
  items,
  removable = false,
  onRemove,
  placeholder,
  id,
  ...props
}: TagInputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = label ? `${fieldId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${fieldId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const normalizedItems = items.map((item) => (typeof item === "string" ? { id: item, label: item } : item));

  return (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className={cn("tl-field", `tl-field--${resolvedState}`, className)}
      id={fieldId}
      role="group"
      {...props}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <div className="tl-tag-input">
        {normalizedItems.length ? (
          normalizedItems.map((item, index) => (
            <span className="tl-tag-input__chip" key={item.id}>
              <span>{item.label}</span>
              {removable ? (
                <IconButton
                  icon="x"
                  label={`Remover ${typeof item.label === "string" ? item.label : item.id}`}
                  onClick={() => onRemove?.(item, index)}
                  size="sm"
                  variant="ghost"
                />
              ) : null}
            </span>
          ))
        ) : (
          <span className="tl-tag-input__placeholder">{placeholder}</span>
        )}
      </div>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </div>
  );
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends FieldBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "size" | "value"> {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
}

export function Select({
  label,
  helperText,
  error,
  fieldSize = "md",
  fieldState = "default",
  blockedReason,
  options,
  placeholder,
  className,
  id,
  disabled,
  value,
  defaultValue,
  name,
  required,
  open,
  defaultOpen,
  onOpenChange,
  onValueChange,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = label ? `${selectId}-label` : undefined;
  const descriptionId = helperText || error || blockedReason ? `${selectId}-description` : undefined;
  const resolvedState = error ? "error" : blockedReason ? "blocked" : fieldState;
  const isDisabled = disabled || Boolean(blockedReason);

  return (
    <div
      className={cn("tl-field", `tl-field--${resolvedState}`, isDisabled && "tl-field--disabled", className)}
    >
      {label ? (
        <span className="tl-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <RadixSelect.Root
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={isDisabled}
        name={name}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        open={open}
        required={required}
        value={value}
      >
        <RadixSelect.Trigger
          aria-describedby={descriptionId}
          aria-invalid={Boolean(error) || undefined}
          aria-labelledby={labelId}
          className={cn("tl-select-shell", `tl-select-shell--${fieldSize}`)}
          id={selectId}
          {...props}
        >
          <RadixSelect.Value className="tl-select-value" placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <Icon name="chevronDown" size="var(--taliya-control-field-icon-size)" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className="tl-select-content"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
            }}
            position="popper"
            sideOffset={6}
          >
            <RadixSelect.Viewport className="tl-select-viewport">
              {options.map((option) => (
                <RadixSelect.Item className="tl-select-item" disabled={option.disabled} key={option.value} value={option.value}>
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="tl-select-item__indicator">
                    <Icon name="check" size="var(--taliya-control-select-item-icon-size)" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error || blockedReason || helperText ? (
        <span className="tl-field__hint" id={descriptionId}>
          {error ?? blockedReason ?? helperText}
        </span>
      ) : null}
    </div>
  );
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  indeterminate?: boolean;
  helperText?: string;
}

export function Checkbox({ label, indeterminate = false, helperText, className, disabled, ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

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

export interface PasswordInputProps extends Omit<InputProps, "type" | "trailingIcon"> {}

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
