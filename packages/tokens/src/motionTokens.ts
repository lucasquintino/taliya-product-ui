import type { TokenRecord } from "./types.js";

export const motionTokens = {
  "motion.duration.fast": "120ms",
  "motion.duration.base": "180ms",
  "motion.duration.slow": "260ms",
  "motion.offset.popover-y": "-4px",
  "motion.offset.tooltip-y": "4px",
  "motion.offset.modal-y": "8px",
  "motion.offset.drawer-x": "24px",
  "motion.ease.standard": "cubic-bezier(0.2, 0, 0, 1)",
  "motion.ease.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "motion.ease.exit": "cubic-bezier(0.4, 0, 1, 1)",
  "motion.ease.enter": "cubic-bezier(0, 0, 0.2, 1)"
} as const satisfies TokenRecord;

