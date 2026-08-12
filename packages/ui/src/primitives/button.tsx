import React, { forwardRef } from "react";
import { cn, Icon, iconButtonIconSizeTokenBySize, type ButtonVariant, type IconButtonVariant, type IconName, type Size } from "../foundation.js";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  tone?: "default" | "danger";
  loading?: boolean;
  blockedReason?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
}

/**
 * Semantics-preserving escape hatch for composed product patterns that need
 * the native button DOM shape while still going through an owned UI primitive.
 * Styling remains intentionally opt-in through `className`.
 */
export const PrimitiveButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function PrimitiveButton(
  { className, type = "button", ...props },
  ref
) {
  return <button className={className} ref={ref} type={type} {...props} />;
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = "secondary",
  size = "md",
  tone = "default",
  loading = false,
  blockedReason,
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps, ref) {
  const isDisabled = disabled || loading || Boolean(blockedReason);

  return (
    <button
      className={cn(
        "tl-button",
        `tl-button--${variant}`,
        `tl-button--${size}`,
        tone !== "default" && `tl-button--tone-${tone}`,
        blockedReason && "tl-button--blocked",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      ref={ref}
      title={blockedReason}
      type={type}
      {...props}
    >
      {loading ? <Icon className="tl-spin" name="loader" /> : leadingIcon ? <Icon name={leadingIcon} /> : null}
      <span>{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} /> : null}
    </button>
  );
});

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  size?: Size | "xl";
  variant?: IconButtonVariant;
  selected?: boolean;
  alert?: boolean;
  loading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    label,
    size = "md",
    variant = "default",
    selected = false,
    alert = false,
    loading = false,
    className,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  const isSelected = selected || variant === "selected";
  const isDisabled = disabled || loading;

  return (
    <button
      aria-label={label}
      aria-pressed={isSelected || undefined}
      aria-busy={loading || undefined}
      className={cn(
        "tl-icon-button",
        `tl-icon-button--${size}`,
        `tl-icon-button--${variant}`,
        isSelected && "tl-icon-button--selected",
        alert && "tl-icon-button--alert",
        loading && "tl-icon-button--loading",
        className
      )}
      disabled={isDisabled}
      ref={ref}
      title={label}
      type={type}
      {...props}
    >
      <Icon className={loading ? "tl-spin" : undefined} name={loading ? "loader" : icon} size={iconButtonIconSizeTokenBySize[size]} />
      {alert ? <span className="tl-icon-button__alert" /> : null}
    </button>
  );
});

export function ButtonGroup({
  className,
  align = "start",
  role = "group",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "between" }) {
  return <div className={cn("tl-button-group", `tl-button-group--${align}`, className)} role={role} {...props} />;
}
