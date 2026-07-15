import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import {
  CrmHeaderSummary,
  CrmRightPanelPage,
  UsageDrawer,
  UsageLedgerTable,
  UsageOverviewWorkspace,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems,
  crmOperationalNavItems
} from "@taliya/crm";
import type { CrmShellNavItem } from "@taliya/crm";
import { Breadcrumb } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Usage",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Uso e cotas. As variants cobrem visao geral e extrato com shell, quota, origem de consumo, tabela e drawer oficiais; remaining-pages deve apenas apontar para estas variants."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const usageNav: CrmShellNavItem[] = [
  { id: "overview", label: "Visão geral" },
  { id: "ledger", label: "Extrato" },
  { id: "billing", label: "Billing" },
  { id: "addons", label: "Add-ons" },
  { id: "support", label: "Suporte" }
];

function usageShellProps({
  activeNavId,
  navItems = usageNav,
  pageHeaderBreadcrumb,
  pageHeaderActions,
  pageHeaderRhythm,
  subtitle,
  title,
  topNavSelection
}: {
  activeNavId?: string;
  navItems?: CrmShellNavItem[];
  pageHeaderBreadcrumb?: ReactNode;
  pageHeaderActions?: ReactNode;
  pageHeaderRhythm?: "usage" | "usage-overview";
  subtitle: string;
  title: string;
  topNavSelection?: "auto" | "none";
}) {
  return {
    activeNavId,
    activeSidebarId: "metricas",
    avatarSrc: image79Avatar,
    navItems,
    pageHeaderActions,
    pageHeaderBreadcrumb,
    pageHeaderRhythm,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    topNavSelection,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

export function UsageOverviewPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <UsageOverviewWorkspace
          onOriginSelect={(origin) => setAction(`origin-${origin}`)}
          onViewAddOns={() => setAction("view-addons")}
          onViewFlows={() => setAction("view-flows")}
          onViewLedger={() => setAction("view-ledger")}
        />
      )}
      panel={<UsageDrawer state="overview" />}
      rightPanelVariant="usage-overview"
      {...usageShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: (
          <CrmHeaderSummary
            items={[
              { id: "plan", icon: "users", label: "Plano 7 agentes" },
              { id: "used", icon: "pieChart", label: "42% usado", tone: "info" },
              { id: "renewal", icon: "calendar", label: "Renova em 12/06" }
            ]}
            onSelect={(item) => setAction(`summary-${item.id}`)}
            variant="overview"
          />
        ),
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Uso" }, { label: "Visão geral" }]} />,
        pageHeaderRhythm: "usage-overview",
        subtitle: "Consumo da sua cota Taliya neste ciclo",
        title: "Uso e cotas",
        topNavSelection: "none"
      })}
    />
  );
}

export function UsageLedgerPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <UsageLedgerTable
          onAction={(row, action) => setAction(`${action}-${row.id}`)}
          onFilterClick={(filter) => setAction(`filter-${filter.id}`)}
          onLoadMore={() => setAction("load-more")}
          onReprocess={(row) => setAction(`reprocess-${row.id}`)}
          onRowClick={(row) => setAction(`row-${row.id}`)}
        />
      )}
      panel={<UsageDrawer state="ledger" />}
      rightPanelVariant="usage-ledger"
      {...usageShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: <CrmHeaderSummary onSelect={(item) => setAction(`summary-${item.id}`)} />,
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Uso" }, { label: "Extrato" }]} />,
        pageHeaderRhythm: "usage",
        subtitle: "Lançamentos de consumo deste ciclo.",
        title: "Extrato de uso",
        topNavSelection: "none"
      })}
    />
  );
}

export const Image68UsoVisaoGeral: Story = {
  name: "68 uso visao geral",
  parameters: { sourceImage: "68_round-4.1O_uso_01_visao-geral-aprovado.png" },
  render: () => <UsageOverviewPage />
};

export const Image69UsoExtrato: Story = {
  name: "69 uso extrato",
  parameters: { sourceImage: "69_round-4.1O_uso_02_extrato-aprovado.png" },
  render: () => <UsageLedgerPage />
};
