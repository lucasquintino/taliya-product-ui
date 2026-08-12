import React, { useId } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn, Icon, type IconName, type IconProps, type Size } from "../foundation.js";
import { IconButton } from "./button.js";
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
