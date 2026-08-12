import {
  rawTokens,
  colorTokens,
  surfaceTokens,
  crmProductShellSurfaceTokens,
  borderTokens,
  statusTokens,
  operationalStateTokens,
  quotaTokens,
  typeTokens,
  spacingTokens,
  layoutTokens,
  densityTokens,
  radiusTokens,
  shadowTokens,
  controlTokens,
  connectorTokens,
  chartTokens,
  motionTokens,
  focusTokens,
  legacyTokens,
  certifiedCssTokens
} from "./token-families.js";
export type { TokenCategory, TokenRecord } from "./types.js";
export {
  rawTokens,
  colorTokens,
  surfaceTokens,
  crmProductShellSurfaceTokens,
  borderTokens,
  statusTokens,
  operationalStateTokens,
  quotaTokens,
  typeTokens,
  spacingTokens,
  layoutTokens,
  densityTokens,
  radiusTokens,
  shadowTokens,
  controlTokens,
  connectorTokens,
  chartTokens,
  motionTokens,
  focusTokens,
  legacyTokens,
  certifiedCssTokens
};

export const tokenGroups = {
  raw: rawTokens,
  color: colorTokens,
  surface: surfaceTokens,
  crmProductShellSurface: crmProductShellSurfaceTokens,
  border: borderTokens,
  status: statusTokens,
  operationalState: operationalStateTokens,
  quota: quotaTokens,
  typography: typeTokens,
  spacing: spacingTokens,
  layout: layoutTokens,
  density: densityTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  control: controlTokens,
  connector: connectorTokens,
  chart: chartTokens,
  motion: motionTokens,
  focus: focusTokens,
  legacy: legacyTokens,
  certifiedCss: certifiedCssTokens
} as const;

export const allTokens = {
  ...rawTokens,
  ...colorTokens,
  ...surfaceTokens,
  ...crmProductShellSurfaceTokens,
  ...borderTokens,
  ...statusTokens,
  ...operationalStateTokens,
  ...quotaTokens,
  ...typeTokens,
  ...spacingTokens,
  ...layoutTokens,
  ...densityTokens,
  ...radiusTokens,
  ...shadowTokens,
  ...controlTokens,
  ...connectorTokens,
  ...chartTokens,
  ...motionTokens,
  ...focusTokens,
  ...legacyTokens,
  ...certifiedCssTokens
} as const;

export type TaliyaTokenName = keyof typeof allTokens;

export function tokenToCssVar(token: TaliyaTokenName): string {
  return `--taliya-${token.replaceAll(".", "-")}`;
}

export function tokenVar(token: TaliyaTokenName): string {
  return `var(${tokenToCssVar(token)})`;
}

export const statusNames = [
  "success",
  "info",
  "warning",
  "danger",
  "neutral",
  "paused",
  "blocked"
] as const;

export const operationalStateNames = [
  "active",
  "pending",
  "in-progress",
  "failed",
  "blocked",
  "human",
  "sensitive",
  "manual",
  "scheduled",
  "paused",
  "draft"
] as const;

export const quotaNames = ["normal", "attention", "warning", "blocked"] as const;
export const tokenGroupNames = Object.keys(tokenGroups) as import("./types.js").TokenCategory[];
export type TaliyaStatus = (typeof statusNames)[number];
export type TaliyaOperationalState = (typeof operationalStateNames)[number];
export type TaliyaQuotaState = (typeof quotaNames)[number];
