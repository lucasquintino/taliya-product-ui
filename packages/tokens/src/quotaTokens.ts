import type { TokenRecord } from "./types.js";

export const quotaTokens = {
  "quota.normal.status": "success",
  "quota.attention.status": "info",
  "quota.warning.status": "warning",
  "quota.blocked.status": "danger",
  "quota.normal.max": "0.69",
  "quota.attention.min": "0.70",
  "quota.attention.max": "0.89",
  "quota.warning.min": "0.90",
  "quota.warning.max": "0.99",
  "quota.blocked.min": "1.00"
} as const satisfies TokenRecord;

