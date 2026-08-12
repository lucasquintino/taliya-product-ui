import type { TokenRecord } from "./types.js";

export const operationalStateTokens = {
  "operationalState.active.status": "success",
  "operationalState.pending.status": "warning",
  "operationalState.in-progress.status": "info",
  "operationalState.failed.status": "danger",
  "operationalState.blocked.status": "blocked",
  "operationalState.human.status": "info",
  "operationalState.sensitive.status": "danger",
  "operationalState.manual.status": "paused",
  "operationalState.scheduled.status": "info",
  "operationalState.paused.status": "paused",
  "operationalState.draft.status": "neutral"
} as const satisfies TokenRecord;

