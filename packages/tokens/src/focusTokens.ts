import type { TokenRecord } from "./types.js";

export const focusTokens = {
  "focus.ring.width": "2px",
  "focus.ring.offset": "2px",
  "focus.ring.color": "rgba(16, 20, 26, 0.84)",
  "focus.ring.info": "rgba(94, 142, 232, 0.72)",
  "focus.ring.danger": "rgba(239, 68, 68, 0.72)",
  "focus.ring.shadow": "0 0 0 3px rgba(94, 142, 232, 0.24)",
  "focus.field.shadow": "0 0 0 1px rgba(16, 20, 26, 0.86)"
} as const satisfies TokenRecord;

