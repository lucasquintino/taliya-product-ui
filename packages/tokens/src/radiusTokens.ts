import type { TokenRecord } from "./types.js";

export const radiusTokens = {
  "radius.2xs": "6px",
  "radius.xs": "8px",
  "radius.sm": "12px",
  "radius.md": "16px",
  "radius.lg": "20px",
  "radius.xl": "24px",
  "radius.2xl": "32px",
  "radius.micro": "6px",
  "radius.chip": "10px",
  "radius.control": "12px",
  "radius.card": "16px",
  "radius.panel": "24px",
  "radius.window": "30px",
  "radius.circle": "999px",
  "radius.full": "999px"
} as const satisfies TokenRecord;

