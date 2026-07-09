import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  CrmRightPanelPage,
  QuotaProgress,
  UsageDrawer,
  UsageLedgerTable,
  UsageOriginRow,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CrmShellNavItem } from "@taliya/crm";
import { Button, ButtonGroup, Chip, Icon, List, ListItem, Panel } from "@taliya/ui";

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
  { id: "overview", label: "Visao geral" },
  { id: "ledger", label: "Extrato" },
  { id: "billing", label: "Billing" },
  { id: "addons", label: "Add-ons" },
  { id: "support", label: "Suporte" }
];

function PageStack({ children }: { children: ReactNode }) {
  return <div className="tcrm-page-family-stack">{children}</div>;
}

function usageShellProps({
  activeNavId,
  pageHeaderActions,
  subtitle,
  title
}: {
  activeNavId: string;
  pageHeaderActions?: ReactNode;
  subtitle: string;
  title: string;
}) {
  return {
    activeNavId,
    activeSidebarId: "metricas",
    avatarSrc: image79Avatar,
    navItems: usageNav,
    pageHeaderActions,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

function UsageOverviewPanels() {
  return (
    <>
      <Panel>
        <h3>Origem do consumo</h3>
        <List>
          <UsageOriginRow origin="attendance" />
          <UsageOriginRow origin="agenda" />
          <UsageOriginRow origin="sales" />
          <UsageOriginRow origin="finance" />
          <UsageOriginRow origin="other" />
        </List>
      </Panel>
      <PageStack>
        <Panel>
          <h3>Alertas e economia</h3>
          <List>
            <ListItem leading={<Icon name="checkCircle" tone="success" />} title="Nenhum alerta critico" />
            <ListItem leading={<Icon name="percent" tone="info" />} title="Economia entra automaticamente em 90%." />
            <ListItem leading={<Icon name="pause" tone="info" />} title="Automacao paga pausa em 100%; CRM manual continua." />
          </List>
        </Panel>
        <Panel>
          <h3>O que foi afetado</h3>
          <List>
            <ListItem leading={<Icon name="checkCircle" tone="success" />} title="Nenhum fluxo pausado por cota" />
            <ListItem leading={<Icon name="checkCircle" tone="success" />} title="Nenhum downgrade ativo" />
          </List>
          <Button size="sm" variant="secondary">Ver fluxos</Button>
        </Panel>
      </PageStack>
    </>
  );
}

export function UsageOverviewPage() {
  return (
    <CrmRightPanelPage
      main={<><QuotaProgress /><UsageOverviewPanels /></>}
      mainGridColumns={2}
      panel={<UsageDrawer state="overview" />}
      {...usageShellProps({
        activeNavId: "overview",
        pageHeaderActions: <ButtonGroup><Chip tone="neutral">Plano 7 agentes</Chip><Chip tone="info">42% usado</Chip><Chip tone="neutral">Renova em 12/06</Chip></ButtonGroup>,
        subtitle: "Consumo da sua cota Taliya neste ciclo",
        title: "Uso e cotas"
      })}
    />
  );
}

export function UsageLedgerPage() {
  return (
    <CrmRightPanelPage
      main={<UsageLedgerTable />}
      panel={<UsageDrawer state="ledger" />}
      {...usageShellProps({
        activeNavId: "ledger",
        pageHeaderActions: <ButtonGroup><Chip tone="neutral">Ciclo atual</Chip><Chip tone="info">42% usado</Chip><Chip tone="neutral">15.000 mensagens/mes</Chip></ButtonGroup>,
        subtitle: "Lancamentos de consumo deste ciclo.",
        title: "Extrato de uso"
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
