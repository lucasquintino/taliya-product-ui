export type TokenCategory =
  | "raw"
  | "color"
  | "surface"
  | "border"
  | "status"
  | "operationalState"
  | "quota"
  | "typography"
  | "spacing"
  | "layout"
  | "density"
  | "radius"
  | "shadow"
  | "control"
  | "connector"
  | "chart"
  | "motion"
  | "focus"
  | "legacy"
  | "certifiedCss";

export type TokenRecord = Record<string, string>;
