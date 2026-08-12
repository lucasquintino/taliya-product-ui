import React from "react";
import { Card, Chip, Icon, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "./shell.js";

export function stateKey(state?: React.ReactNode): string {
  return String(state ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function toneForState(state?: string): ComponentTone {
  const normalized = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalized)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalized)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalized)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalized)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalized)) return "paused";
  return "neutral";
}

export function componentLabel(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function Reference15Header({ number, title }: { number: number; title: React.ReactNode }) {
  return <header className="tcrm-reference15-header"><span>{number}</span><h3>{title}</h3></header>;
}

export function iconForFamily(family?: string): IconName {
  switch (family) {
    case "Agents":
    case "Agent": return "bot";
    case "Agenda": return "calendar";
    case "Billing":
    case "Financeiro":
    case "Subscription":
    case "Usage": return "wallet";
    case "Inbox":
    case "Support": return "message";
    default: return "clipboard";
  }
}

export function CrmSurface({ component, family, title, description, meta, state, statusLabel, icon, action, selected = false, className, children, ...props }: CrmSurfaceProps & { component: string; family?: string }) {
  return (
    <Card className={cn("tcrm-surface", `tcrm-surface--${component}`, className)} data-component={component} selected={selected} {...props}>
      <header className="tcrm-surface__header"><span className="tcrm-surface__icon"><Icon name={icon ?? iconForFamily(family)} /></span><div><h3>{title ?? componentLabel(component)}</h3>{meta ? <p>{meta}</p> : null}</div>{statusLabel || state ? <Chip tone={toneForState(state)}>{statusLabel ?? state}</Chip> : null}</header>
      {description ? <p className="tcrm-surface__description">{description}</p> : null}
      {children ? <div className="tcrm-surface__body">{children}</div> : null}
      {action ? <footer className="tcrm-surface__footer">{action}</footer> : null}
    </Card>
  );
}
