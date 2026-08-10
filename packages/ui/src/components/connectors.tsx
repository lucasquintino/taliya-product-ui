import React from "react";
import { cn, Icon, type ComponentTone, type IconName } from "../foundation.js";

export interface ConnectorLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "info" | "danger" | "neutral" | "success";
  variant?: "straight" | "elbow" | "dashed" | "curved";
  startNode?: boolean;
  endNode?: boolean;
  arrow?: boolean;
}

export function ConnectorLine({
  tone = "info",
  variant = "straight",
  startNode = false,
  endNode = true,
  arrow = true,
  className,
  ...props
}: ConnectorLineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "tl-connector-line",
        `tl-connector-line--${tone}`,
        `tl-connector-line--${variant}`,
        startNode && "tl-connector-line--start-node",
        endNode && "tl-connector-line--end-node",
        arrow && "tl-connector-line--arrow",
        className
      )}
      {...props}
    />
  );
}

export interface ListIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: IconName;
  tone?: ComponentTone | "neutral";
}

export function ListIcon({ icon, tone = "info", className, ...props }: ListIconProps) {
  return (
    <span className={cn("tl-list-icon", `tl-list-icon--${tone}`, className)} {...props}>
      <Icon name={icon} size="var(--taliya-control-list-icon-icon-size)" />
    </span>
  );
}
