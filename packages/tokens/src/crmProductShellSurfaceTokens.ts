import type { TokenRecord } from "./types.js";

export const crmProductShellSurfaceTokens = {
  "color.crm-product-shell.page-bg": "var(--taliya-surface-product-page)",
  "color.crm-product-shell.chrome-bg": "var(--taliya-color-crm-browser-chrome-bg)",
  "color.crm-product-shell.sidebar-bg": "var(--taliya-surface-product-page)",
  "color.crm-product-shell.main-bg": "var(--taliya-surface-product-page)",
  "color.crm-product-shell.content-bg": "var(--taliya-surface-product-page)",
  "color.crm-product-shell.panel-bg": "var(--taliya-surface-product-panel)",
  "color.crm-product-shell.panel-border": "var(--taliya-border-product-subtle)",
  "color.crm-product-shell.control-bg": "var(--taliya-surface-product-control)",
  "color.crm-product-shell.control-border": "var(--taliya-border-product-control)",
  "color.crm-product-shell.control-hover-bg": "var(--taliya-surface-card-hover)",
  "color.crm-product-shell.control-hover-border": "var(--taliya-border-default)",
  "color.crm-product-shell.control-selected-bg": "var(--taliya-surface-selected)",
  "color.crm-product-shell.control-selected-fg": "var(--taliya-color-white)",
  "color.crm-product-shell.segmented-bg": "transparent",
  "color.crm-product-shell.segmented-border": "transparent",
  "color.crm-product-shell.segmented-item-hover-bg": "var(--taliya-surface-product-row-hover)",
  "color.crm-product-shell.browser-toolbar-hover-bg": "var(--taliya-surface-control-hover)",
  "color.crm-product-shell.row-bg": "var(--taliya-surface-product-row)",
  "color.crm-product-shell.row-hover-bg": "var(--taliya-surface-product-row-hover)",
  "color.crm-product-shell.row-selected-bg": "rgba(131, 162, 219, 0.17)",
  "color.crm-product-shell.row-divider": "var(--taliya-border-product-row)"
} as const satisfies TokenRecord;

