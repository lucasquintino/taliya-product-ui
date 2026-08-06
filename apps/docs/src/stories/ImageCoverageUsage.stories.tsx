import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

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
import type { CrmShellNavItem, UsageDrawerAction } from "@taliya/crm";
import { Breadcrumb, Button } from "@taliya/ui";

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

export function UsageOverviewPage({ blockedReason, quotaValue = 42 }: { blockedReason?: string; quotaValue?: number } = {}) {
  const [announcement, setAnnouncement] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleSupportAction = (action: UsageDrawerAction, payload?: string) => {
    setAnnouncement(payload ? `Suporte de uso: ${action} (${payload})` : `Suporte de uso: ${action}`);
  };

  return (
    <>
      <CrmRightPanelPage
        drawer={drawerOpen ? <UsageDrawer onAction={handleSupportAction} onClose={() => setDrawerOpen(false)} state="overview" /> : null}
        main={(
          <UsageOverviewWorkspace
            affected={quotaValue >= 100 ? [
              { id: "flows", title: "Automações pagas pausadas por cota", icon: "pause", tone: "danger" },
              { id: "manual", title: "CRM manual continua disponível", icon: "checkCircle", tone: "success" }
            ] : undefined}
            alerts={quotaValue >= 90 ? [
              { id: "economy", title: "Modo economia ativo", icon: "percent", tone: "warning" },
              { id: "limit", title: quotaValue >= 100 ? "Cota do ciclo atingida" : "Próximo limite em 100%", icon: "alert", tone: quotaValue >= 100 ? "danger" : "warning" }
            ] : quotaValue >= 70 ? [
              { id: "threshold", title: "Alerta de 70% atingido", icon: "alert", tone: "warning" },
              { id: "economy", title: "Economia entra automaticamente em 90%", icon: "percent", tone: "info" }
            ] : undefined}
            blockedReason={blockedReason}
            onOriginSelect={(origin) => setAnnouncement(`Origem selecionada: ${origin}`)}
            onViewAddOns={() => setAnnouncement("Add-ons abertos")}
            onViewFlows={() => setAnnouncement("Fluxos abertos")}
            onViewLedger={() => setAnnouncement("Extrato de uso aberto")}
            quota={{ value: quotaValue }}
          />
        )}
        rightPanelVariant="usage-overview"
        {...usageShellProps({
          navItems: crmOperationalNavItems,
          pageHeaderActions: drawerOpen ? (
            <CrmHeaderSummary
              items={[
                { id: "plan", icon: "users", label: "Plano 7 agentes" },
                { id: "used", icon: "pieChart", label: `${quotaValue}% usado`, tone: quotaValue >= 90 ? "warning" : "info" },
                { id: "renewal", icon: "calendar", label: "Renova em 12/06" }
              ]}
              onSelect={(item) => setAnnouncement(`Resumo selecionado: ${item.id}`)}
              variant="overview"
            />
          ) : <Button leadingIcon="sparkles" onClick={() => { setDrawerOpen(true); setAnnouncement("Suporte de uso reaberto"); }} size="sm" variant="secondary">Abrir suporte</Button>,
          pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Uso" }, { label: "Visão geral" }]} />,
          pageHeaderRhythm: "usage-overview",
          subtitle: "Consumo da sua cota Taliya neste ciclo",
          title: "Uso e cotas",
          topNavSelection: "none"
        })}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function UsageLedgerPage() {
  const [announcement, setAnnouncement] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <>
      <CrmRightPanelPage
        drawer={drawerOpen ? <UsageDrawer onAction={(action, payload) => setAnnouncement(payload ? `Suporte do extrato: ${action} (${payload})` : `Suporte do extrato: ${action}`)} onClose={() => setDrawerOpen(false)} state="ledger" /> : null}
        main={(
          <UsageLedgerTable
            onAction={(row, action) => setAnnouncement(`${action}-${row.id}`)}
            onFilterClick={(filter) => setAnnouncement(`filter-${filter.id}`)}
            onLoadMore={() => setAnnouncement("load-more")}
            onReprocess={(row) => setAnnouncement(`reprocess-${row.id}`)}
            onRowClick={(row) => setAnnouncement(`row-${row.id}`)}
          />
        )}
        rightPanelVariant="usage-ledger"
        {...usageShellProps({
          navItems: crmOperationalNavItems,
          pageHeaderActions: drawerOpen ? <CrmHeaderSummary onSelect={(item) => setAnnouncement(`summary-${item.id}`)} /> : <Button leadingIcon="sparkles" onClick={() => setDrawerOpen(true)} size="sm" variant="secondary">Abrir suporte</Button>,
          pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Uso" }, { label: "Extrato" }]} />,
          pageHeaderRhythm: "usage",
          subtitle: "Lançamentos de consumo deste ciclo.",
          title: "Extrato de uso",
          topNavSelection: "none"
        })}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
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

export const UsageQuota70Contract: Story = {
  name: "Uso state 70 percent",
  render: () => <UsageOverviewPage quotaValue={70} />
};

export const UsageQuota90Contract: Story = {
  name: "Uso state 90 percent",
  render: () => <UsageOverviewPage quotaValue={90} />
};

export const UsageQuota100Contract: Story = {
  name: "Uso state 100 percent",
  render: () => <UsageOverviewPage quotaValue={100} />
};

export const UsageBlockedContract: Story = {
  name: "Uso state blocked",
  render: () => <UsageOverviewPage blockedReason="Uso indisponível enquanto a assinatura está bloqueada." />
};

export const UsageInteractionContract: Story = {
  name: "Uso interaction contract",
  render: () => <UsageOverviewPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Agente de suporte de uso" });

    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar suporte" }));
    await expect(canvas.queryByRole("complementary", { name: "Agente de suporte de uso" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Abrir suporte" }));
    await expect(canvas.getByRole("complementary", { name: "Agente de suporte de uso" })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Ver extrato" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Extrato de uso aberto");
    await userEvent.click(canvas.getByRole("button", { name: /Atendimento.*2\.400.*38%/i }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Origem selecionada: attendance");
  }
};
