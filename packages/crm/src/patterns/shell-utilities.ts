import React from "react";
import type { ComponentTone, IconName } from "@taliya/ui";

export function componentLabel(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function toneForState(state?: string): ComponentTone {
  if (!state) return "neutral";
  const normalizedState = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation", "manual", "manual-disponivel", "disponivel"].includes(normalizedState)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalizedState)) return "paused";
  return "neutral";
}

export function stateKey(state?: React.ReactNode): string {
  return String(state ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function iconForFamily(family?: string): IconName {
  const normalized = stateKey(family);
  if (normalized.includes("student")) return "users";
  if (normalized.includes("class")) return "calendar";
  if (normalized.includes("finance") || normalized.includes("billing")) return "creditCard";
  if (normalized.includes("setting")) return "settings";
  if (normalized.includes("agent")) return "bot";
  return "layout";
}
