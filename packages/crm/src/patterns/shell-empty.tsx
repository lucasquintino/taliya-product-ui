/** Empty-state shell composition. */
import React from "react";
import { Button, ErrorState, LoadingState, cn } from "@taliya/ui";
import {
  crmEmptyShellNavItems,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "./shell-foundation.js";
import type { CrmShellNavItem, CrmShellSidebarItem } from "./shell-foundation.js";
import {
  CrmShellBackButton,
  CrmShellGlobalActions,
  CrmShellTopNav
} from "./shell-chrome-b.js";
import { ProductWindowFrame } from "./shell-layout-a.js";
import { CrmPageFamilyShell } from "./shell-page-family.js";
import type { CrmShellGlobalActionsCallbacks } from "./shell-chrome-b.js";

export function CrmEmptyShellTopbar({
  navItems = crmEmptyShellNavItems,
  avatarSrc,
  className,
  globalActions,
  onNavChange
}: {
  navItems?: CrmShellNavItem[];
  avatarSrc?: string;
  className?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  onNavChange?: (id: string) => void;
}) {
  return (
    <div className={cn("tcrm-empty-shell-topbar", className)}>
      <CrmShellBackButton />
      <CrmShellTopNav items={navItems} onChange={onNavChange} />
      <CrmShellGlobalActions {...globalActions} avatarSrc={avatarSrc} />
    </div>
  );
}

export function CrmEmptyShellPageHeader({ title = "Jornadas" }: { title?: string }) {
  return (
    <header className="tcrm-empty-shell-page-header">
      <h1>{title}</h1>
    </header>
  );
}

export type CrmEmptyShellState = "empty" | "loading" | "unavailable";

export function CrmEmptyShellCanvas({
  state = "empty",
  onRetry,
  className,
  embedded = false
}: {
  state?: CrmEmptyShellState;
  onRetry?: () => void;
  className?: string;
  embedded?: boolean;
}) {
  const content = (
    <>
      {state === "loading" ? <LoadingState title="Carregando jornadas" variant="panel" /> : null}
      {state === "unavailable" ? (
        <ErrorState
          action={onRetry ? <Button onClick={onRetry} variant="primary">Tentar novamente</Button> : undefined}
          description="Não foi possível carregar esta área agora."
          title="Conteúdo indisponível"
        />
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <div
        aria-busy={state === "loading" || undefined}
        aria-label={state === "empty" ? "Área de conteúdo vazia" : "Estado da área de conteúdo"}
        className={cn("tcrm-empty-shell-canvas__state", className)}
        data-state={state}
        role={state === "loading" ? "status" : "region"}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label={state === "empty" ? "Área de conteúdo vazia" : "Estado da área de conteúdo"}
      className={cn("tcrm-empty-shell-canvas", className)}
      data-state={state}
    >
      {content}
    </section>
  );
}

export function CrmEmptyShellWindow({
  children,
  chrome,
  className
}: React.PropsWithChildren<{
  chrome?: React.ReactNode | false;
  className?: string;
}>) {
  return (
    <ProductWindowFrame bodyClassName="tcrm-empty-shell-window__body" chrome={chrome} className={cn("tcrm-empty-shell-window", className)}>
      {children}
    </ProductWindowFrame>
  );
}

export function CrmEmptyShell({
  title = "Jornadas",
  navItems = crmEmptyShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  className,
  globalActions,
  state = "empty",
  onBack,
  onNavChange,
  onRetry,
  onSidebarSelect,
  onSidebarUtilitySelect
}: {
  title?: string;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  utilityItems?: CrmShellSidebarItem[];
  avatarSrc?: string;
  className?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  state?: CrmEmptyShellState;
  onBack?: () => void;
  onNavChange?: (id: string) => void;
  onRetry?: () => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}) {
  return (
    <CrmPageFamilyShell
      activeNavId={navItems.find((item) => item.active)?.id ?? ""}
      avatarSrc={avatarSrc}
      className={cn("tcrm-empty-shell-page", className)}
      contentClassName={cn("tcrm-empty-shell-page__canvas", `tcrm-empty-shell-page__canvas--${state}`)}
      globalActions={globalActions}
      navItems={navItems}
      onBack={onBack}
      onNavChange={onNavChange}
      onSidebarSelect={onSidebarSelect}
      onSidebarUtilitySelect={onSidebarUtilitySelect}
      sidebarItems={sidebarItems}
      title={title}
      utilityItems={utilityItems}
    >
      <CrmEmptyShellCanvas embedded onRetry={onRetry} state={state} />
    </CrmPageFamilyShell>
  );
}
