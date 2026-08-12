import React from "react";
import { DashboardGrid } from "../../patterns/shell-layout-b.js";
import { cn } from "@taliya/ui";

export function SettingsWorkspaceControls({ blocked, children }: { blocked: boolean; children: React.ReactNode }) {
  return (
    <fieldset aria-label="Controles da configuração" className="tcrm-settings-workspace-controls" disabled={blocked}>
      {children}
    </fieldset>
  );
}

export function SetupPagePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-page-panel", className)} {...props} />;
}

export interface SetupContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  density?: React.ComponentProps<typeof DashboardGrid>["density"];
}

export function SetupContentGrid({ children, className, columns = 3, density = "default", ...props }: SetupContentGridProps) {
  return <DashboardGrid className={cn("tcrm-setup-content-grid", className)} columns={columns} data-component="SetupContentGrid" density={density} {...props}>{children}</DashboardGrid>;
}
