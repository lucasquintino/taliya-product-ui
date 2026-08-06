import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  BillingAddOnsWorkspace,
  BillingInvoicesWorkspace,
  BillingSubscriptionWorkspace,
  CrmHeaderSummary,
  CrmRightPanelPage,
  UsageDrawer,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems,
  crmOperationalNavItems
} from "@taliya/crm";
import type { BillingSubscriptionWorkspaceState, CrmShellNavItem, UsageDrawerAction } from "@taliya/crm";
import { Breadcrumb, Button, ButtonGroup, Chip } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Billing",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Billing Taliya. As variants cobrem assinatura, faturas e add-ons com shell e componentes oficiais; remaining-pages deve apenas apontar para estas variants."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const billingNav: CrmShellNavItem[] = [
  { id: "assinatura", label: "Assinatura" },
  { id: "faturas", label: "Faturas" },
  { id: "addons", label: "Add-ons" },
  { id: "uso", label: "Uso e cotas" },
  { id: "suporte", label: "Suporte" }
];

function billingShellProps({
  activeNavId,
  navItems = billingNav,
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
  pageHeaderRhythm?: "billing" | "billing-invoices";
  subtitle: string;
  title: string;
  topNavSelection?: "auto" | "none";
}) {
  return {
    activeNavId,
    activeSidebarId: "financeiro",
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

function BillingSupportDrawer({ topic, onAction, onClose }: { topic: "assinatura" | "faturas" | "add-ons"; onAction?: (action: UsageDrawerAction, payload?: string) => void; onClose?: () => void }) {
  const copy = {
    assinatura: {
      message: <>Esta pagina mostra sua assinatura<br />com a Taliya: plano contratado,<br />agentes inclusos, cotas, add-ons<br />e faturas. Pagamentos de alunos<br />ficam no Financeiro.</>,
      placeholder: "Pergunte sobre sua assinatura...",
      questions: [
        { id: "payments", label: "Isso e Pagamentos Taliya?" },
        { id: "failed-invoice", label: "O que acontece se a fatura falhar?" },
        { id: "agents", label: "Como aumentar agentes?" },
        { id: "usage", label: "Onde vejo uso detalhado?" }
      ],
      roleLabel: "Ajudando com assinatura"
    },
    faturas: {
      message: <>Estas faturas sao da assinatura do<br />studio com a Taliya. Cobrancas de<br />alunos ficam no Financeiro.</>,
      placeholder: "Pergunte sobre suas faturas...",
      questions: [
        { id: "open", label: "Por que essa fatura esta em aberto?" },
        { id: "failure", label: "O que acontece se falhar?" },
        { id: "student-payments", label: "Onde vejo pagamentos dos alunos?" },
        { id: "card", label: "Como atualizar o cartao?" }
      ],
      roleLabel: "Ajudando com faturas"
    },
    "add-ons": {
      message: <>Add-ons aumentam o que sua<br />assinatura permite usar. Eles nao<br />mudam cobrancas de alunos nem<br />configuracoes de fluxos.</>,
      placeholder: "Pergunte sobre add-ons...",
      questions: [
        { id: "when", label: "Quando o pacote entra?" },
        { id: "agents", label: "Posso comprar mais agentes?" },
        { id: "invoice", label: "Isso muda minha fatura?" },
        { id: "usage", label: "Onde vejo o uso?" }
      ],
      roleLabel: "Ajudando com add-ons"
    }
  }[topic];

  return <UsageDrawer onAction={onAction} onClose={onClose} state="overview" title="Agente de Suporte Taliya" {...copy} />;
}

export function BillingSubscriptionPage({ initialState = "active" }: { initialState?: BillingSubscriptionWorkspaceState } = {}) {
  const [announcement, setAnnouncement] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [subscriptionState, setSubscriptionState] = useState(initialState);
  const statusLabel = subscriptionState === "failed" ? "Pagamento falhou" : subscriptionState === "expired" ? "Expirada" : subscriptionState === "blocked" ? "Bloqueada" : subscriptionState === "loading" ? "Carregando" : "Ativa";
  const statusTone = subscriptionState === "active" ? "success" : subscriptionState === "loading" ? "neutral" : "danger";

  return (
    <>
      <CrmRightPanelPage
        browserUrl="https://app.taliya.com/app/billing"
        drawer={drawerOpen ? <BillingSupportDrawer onAction={(action, payload) => setAnnouncement(payload ? `Suporte de assinatura: ${action} (${payload})` : `Suporte de assinatura: ${action}`)} onClose={() => setDrawerOpen(false)} topic="assinatura" /> : null}
        main={(
          <BillingSubscriptionWorkspace
            onChangePlan={() => setAnnouncement("Alteração de plano aberta")}
            onOpenAgents={() => setAnnouncement("Agentes abertos")}
            onSupport={() => { setDrawerOpen(true); setAnnouncement("Suporte de assinatura aberto"); }}
            onUpdatePayment={() => {
              setSubscriptionState("active");
              setAnnouncement(subscriptionState === "failed" || subscriptionState === "expired" ? "Pagamento atualizado; assinatura ativa" : "Atualização de pagamento aberta");
            }}
            onViewAddOns={() => setAnnouncement("Add-ons abertos")}
            onViewInvoices={() => setAnnouncement("Faturas abertas")}
            onViewPlanDetails={() => setAnnouncement("Detalhes do plano abertos")}
            onViewUsage={() => setAnnouncement("Uso e cotas aberto")}
            state={subscriptionState}
          />
        )}
        mainGridColumns={1}
        rightPanelVariant="billing-subscription"
        {...billingShellProps({
          activeNavId: undefined,
          navItems: crmOperationalNavItems,
          pageHeaderActions: drawerOpen ? <ButtonGroup><Chip icon={subscriptionState === "active" ? "checkCircle" : "alertCircle"} showDot={false} tone={statusTone}>{statusLabel}</Chip><Chip icon="users" showDot={false} tone="neutral">Plano 7 agentes</Chip><Chip icon="calendar" showDot={false} tone="neutral">Renova em 12/06</Chip></ButtonGroup> : <Button leadingIcon="sparkles" onClick={() => setDrawerOpen(true)} size="sm" variant="secondary">Abrir suporte</Button>,
          pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Assinatura" }]} />,
          pageHeaderRhythm: "billing",
          subtitle: "Plano, agentes, cotas e faturas da sua conta Taliya",
          title: "Assinatura Taliya",
          topNavSelection: "none"
        })}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function BillingInvoicesPage() {
  const [announcement, setAnnouncement] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <>
    <CrmRightPanelPage
      drawer={drawerOpen ? <BillingSupportDrawer onAction={(action) => setAnnouncement(`Suporte de faturas: ${action}`)} onClose={() => setDrawerOpen(false)} topic="faturas" /> : null}
      main={(
        <BillingInvoicesWorkspace
          onDownloadCurrent={() => setAnnouncement("download-current")}
          onDownloadInvoice={(row) => setAnnouncement(`download-${row.id}`)}
          onOpenCurrent={() => setAnnouncement("open-current")}
          onOpenInvoice={(row) => setAnnouncement(`open-${row.id}`)}
          onPayCurrent={() => setAnnouncement("pay-current")}
          onRetryInvoice={(row) => setAnnouncement(`retry-${row.id}`)}
          onRowClick={(row) => setAnnouncement(`row-${row.id}`)}
        />
      )}
      mainGridColumns={1}
      rightPanelVariant="billing-invoices"
      {...billingShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: drawerOpen ? (
          <CrmHeaderSummary
            items={[
              { id: "subscription", icon: "checkCircle", label: "Assinatura ativa", tone: "success" },
              { id: "open", icon: "alertCircle", label: "1 fatura em aberto", tone: "warning" },
              { id: "card", icon: "creditCard", label: "Cartão final 4242" }
            ]}
            onSelect={(item) => setAnnouncement(`summary-${item.id}`)}
            variant="billing-invoices"
          />
        ) : <Button leadingIcon="sparkles" onClick={() => { setDrawerOpen(true); setAnnouncement("Suporte de faturas reaberto"); }} size="sm" variant="secondary">Abrir suporte</Button>,
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Faturas" }]} />,
        pageHeaderRhythm: "billing-invoices",
        subtitle: "Pagamentos da assinatura do studio com a Taliya",
        title: "Faturas Taliya",
        topNavSelection: "none"
      })}
    />
    <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function BillingAddOnsPage() {
  const [announcement, setAnnouncement] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <>
    <CrmRightPanelPage
      drawer={drawerOpen ? <BillingSupportDrawer onAction={(action) => setAnnouncement(`Suporte de add-ons: ${action}`)} onClose={() => setDrawerOpen(false)} topic="add-ons" /> : null}
      main={<BillingAddOnsWorkspace onAddOnAction={(option) => setAnnouncement(`addon-${option.id}`)} />}
      mainGridColumns={1}
      rightPanelVariant="billing-addons"
      {...billingShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: drawerOpen ? (
          <CrmHeaderSummary
            items={[
              { id: "plan", icon: "users", label: "Plano 7 agentes" },
              { id: "active", icon: "package", label: "Nenhum add-on ativo" },
              { id: "quota", icon: "pieChart", label: <>Cota <strong>42%</strong> usada</>, tone: "info" }
            ]}
            onSelect={(item) => setAnnouncement(`summary-${item.id}`)}
            variant="billing"
          />
        ) : <Button leadingIcon="sparkles" onClick={() => { setDrawerOpen(true); setAnnouncement("Suporte de add-ons reaberto"); }} size="sm" variant="secondary">Abrir suporte</Button>,
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Add-ons" }]} />,
        pageHeaderRhythm: "billing",
        subtitle: "Extras para ampliar agentes e cotas da sua assinatura",
        title: "Add-ons Taliya",
        topNavSelection: "none"
      })}
    />
    <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export const Image65BillingAssinatura: Story = {
  name: "65 billing assinatura taliya",
  parameters: { sourceImage: "65_round-4.1N_billing_01_assinatura-taliya-aprovado.png" },
  render: () => <BillingSubscriptionPage />
};

export const Image66BillingFaturas: Story = {
  name: "66 billing faturas taliya",
  parameters: { sourceImage: "66_round-4.1N_billing_02_faturas-taliya-aprovado.png" },
  render: () => <BillingInvoicesPage />
};

export const Image67BillingAddOns: Story = {
  name: "67 billing add-ons taliya",
  parameters: { sourceImage: "67_round-4.1N_billing_03_add-ons-taliya-aprovado.png" },
  render: () => <BillingAddOnsPage />
};

export const BillingSubscriptionFailedContract: Story = {
  name: "Billing subscription failed",
  render: () => <BillingSubscriptionPage initialState="failed" />
};

export const BillingSubscriptionExpiredContract: Story = {
  name: "Billing subscription expired",
  render: () => <BillingSubscriptionPage initialState="expired" />
};

export const BillingSubscriptionLoadingContract: Story = {
  name: "Billing subscription loading",
  render: () => <BillingSubscriptionPage initialState="loading" />
};

export const BillingSubscriptionBlockedContract: Story = {
  name: "Billing subscription blocked",
  render: () => <BillingSubscriptionPage initialState="blocked" />
};

export const BillingSubscriptionInteractionContract: Story = {
  name: "Billing subscription interaction contract",
  render: () => <BillingSubscriptionPage initialState="failed" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const workspace = canvasElement.querySelector('[data-component="BillingSubscriptionWorkspace"]');

    await expect(workspace).toHaveAttribute("data-state", "failed");
    await userEvent.click(canvas.getByRole("button", { name: "Atualizar pagamento" }));
    await expect(workspace).toHaveAttribute("data-state", "active");
    await expect(canvas.getByRole("status")).toHaveTextContent("Pagamento atualizado; assinatura ativa");

    const drawer = canvas.getByRole("complementary", { name: "Agente de suporte de uso" });
    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar suporte" }));
    await expect(canvas.queryByRole("complementary", { name: "Agente de suporte de uso" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Abrir suporte" }));
    await expect(canvas.getByRole("complementary", { name: "Agente de suporte de uso" })).toBeInTheDocument();
  }
};
