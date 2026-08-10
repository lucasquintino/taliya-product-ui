import React from "react";
import { cn } from "../foundation.js";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "inverse" | "success" | "info" | "warning" | "danger";
  pattern?: "default" | "summary" | "mini" | "quota" | "flow" | "crm";
  compact?: boolean;
  selected?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}

export function Card({
  tone = "default",
  pattern = "default",
  compact = false,
  selected = false,
  interactive = false,
  disabled = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "tl-card",
        `tl-card--${tone}`,
        pattern !== "default" && `tl-card--${pattern}`,
        compact && "tl-card--compact",
        selected && "tl-card--selected",
        interactive && "tl-card--interactive",
        disabled && "tl-card--disabled",
        className
      )}
      {...props}
    />
  );
}

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle" | "crm";
  compact?: boolean;
  minHeight?: "none" | "md";
}

export function Panel({ variant = "default", compact = false, minHeight = "none", className, ...props }: PanelProps) {
  return (
    <section
      className={cn("tl-panel", `tl-panel--${variant}`, compact && "tl-panel--compact", minHeight !== "none" && `tl-panel--min-height-${minHeight}`, className)}
      {...props}
    />
  );
}

export interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export function PanelBody({ compact = false, className, ...props }: PanelBodyProps) {
  return <div className={cn("tl-panel-body", compact && "tl-panel-body--compact", className)} {...props} />;
}

export interface PanelHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
  compact?: boolean;
}

export function PanelHeader({
  title,
  description,
  meta,
  action,
  headingLevel = 2,
  compact = false,
  className,
  children,
  ...props
}: PanelHeaderProps) {
  const Heading = `h${headingLevel}` as React.ElementType;

  return (
    <header className={cn("tl-panel-header", compact && "tl-panel-header--compact", className)} {...props}>
      <span className="tl-panel-header__body">
        <Heading className="tl-panel-header__title">{title}</Heading>
        {description ? <small className="tl-panel-header__description">{description}</small> : null}
      </span>
      {meta || action || children ? (
        <span className="tl-panel-header__aside">
          {meta ? <span className="tl-panel-header__meta">{meta}</span> : null}
          {action}
          {children}
        </span>
      ) : null}
    </header>
  );
}

export interface MetaTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "warning" | "danger" | "info" | "muted";
}

export function MetaText({ tone = "default", className, ...props }: MetaTextProps) {
  return <span className={cn("tl-meta-text", `tl-meta-text--${tone}`, className)} {...props} />;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "xs" | "sm" | "md" | "lg";
}

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return <div className={cn("tl-stack", `tl-stack--${gap}`, className)} {...props} />;
}

export interface StatePageProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "main" | "section";
}

export function StatePage({ as: Component = "div", className, ...props }: StatePageProps) {
  return <Component className={cn("tl-state-page", className)} {...props} />;
}

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  justify?: "start" | "between" | "end";
  wrap?: boolean;
}

export function Toolbar({ align = "center", justify = "between", wrap = false, className, ...props }: ToolbarProps) {
  return (
    <div
      className={cn(
        "tl-toolbar",
        `tl-toolbar--align-${align}`,
        `tl-toolbar--justify-${justify}`,
        wrap && "tl-toolbar--wrap",
        className
      )}
      {...props}
    />
  );
}

export interface InlineGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  compact?: boolean;
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

export function InlineGroup({ compact = false, justify = "start", wrap = false, className, ...props }: InlineGroupProps) {
  return <span className={cn("tl-inline-group", compact && "tl-inline-group--compact", `tl-inline-group--justify-${justify}`, wrap && "tl-inline-group--wrap", className)} {...props} />;
}
