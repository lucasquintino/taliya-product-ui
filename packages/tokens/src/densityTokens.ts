import type { TokenRecord } from "./types.js";

export const densityTokens = {
  "density.compact-gap": "6px",
  "density.row-gap": "8px",
  "density.section-gap": "16px",
  "density.panel-gap": "20px",
  "density.page-gap": "24px",
  "density.control.compact.height": "32px",
  "density.control.default.height": "40px",
  "density.control.comfortable.height": "48px",
  "density.row.compact.height": "40px",
  "density.row.default.height": "52px",
  "density.row.comfortable.height": "64px",
  "density.panel.header-height": "64px"
} as const satisfies TokenRecord;

