import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

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
import type { CrmShellNavItem } from "@taliya/crm";
import { Breadcrumb, ButtonGroup, Chip } from "@taliya/ui";

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

function BillingSupportDrawer({ topic }: { topic: "assinatura" | "faturas" | "add-ons" }) {
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

  return <UsageDrawer state="overview" title="Agente de Suporte Taliya" {...copy} />;
}

export function BillingSubscriptionPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <BillingSubscriptionWorkspace
          onChangePlan={() => setAction("change-plan")}
          onOpenAgents={() => setAction("open-agents")}
          onSupport={() => setAction("support")}
          onUpdatePayment={() => setAction("update-payment")}
          onViewAddOns={() => setAction("view-addons")}
          onViewInvoices={() => setAction("view-invoices")}
          onViewPlanDetails={() => setAction("view-plan")}
          onViewUsage={() => setAction("view-usage")}
        />
      )}
      mainGridColumns={1}
      panel={<BillingSupportDrawer topic="assinatura" />}
      rightPanelVariant="billing-subscription"
      browserUrl="https://app.taliya.com/app/billing"
      {...billingShellProps({
        activeNavId: undefined,
        navItems: crmOperationalNavItems,
        pageHeaderActions: <ButtonGroup><Chip icon="checkCircle" showDot={false} tone="success">Ativo</Chip><Chip icon="users" showDot={false} tone="neutral">Plano 7 agentes</Chip><Chip icon="calendar" showDot={false} tone="neutral">Renova em 12/06</Chip></ButtonGroup>,
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Assinatura" }]} />,
        pageHeaderRhythm: "billing",
        subtitle: "Plano, agentes, cotas e faturas da sua conta Taliya",
        title: "Assinatura Taliya",
        topNavSelection: "none"
      })}
    />
  );
}

export function BillingInvoicesPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <BillingInvoicesWorkspace
          onDownloadCurrent={() => setAction("download-current")}
          onDownloadInvoice={(row) => setAction(`download-${row.id}`)}
          onOpenCurrent={() => setAction("open-current")}
          onOpenInvoice={(row) => setAction(`open-${row.id}`)}
          onPayCurrent={() => setAction("pay-current")}
          onRetryInvoice={(row) => setAction(`retry-${row.id}`)}
          onRowClick={(row) => setAction(`row-${row.id}`)}
        />
      )}
      mainGridColumns={1}
      panel={<BillingSupportDrawer topic="faturas" />}
      rightPanelVariant="billing-invoices"
      {...billingShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: (
          <CrmHeaderSummary
            items={[
              { id: "subscription", icon: "checkCircle", label: "Assinatura ativa", tone: "success" },
              { id: "open", icon: "alertCircle", label: "1 fatura em aberto", tone: "warning" },
              { id: "card", icon: "creditCard", label: "Cartão final 4242" }
            ]}
            onSelect={(item) => setAction(`summary-${item.id}`)}
            variant="billing-invoices"
          />
        ),
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Faturas" }]} />,
        pageHeaderRhythm: "billing-invoices",
        subtitle: "Pagamentos da assinatura do studio com a Taliya",
        title: "Faturas Taliya",
        topNavSelection: "none"
      })}
    />
  );
}

export function BillingAddOnsPage() {
  const [, setAction] = useState("");

  return (
    <CrmRightPanelPage
      main={<BillingAddOnsWorkspace onAddOnAction={(option) => setAction(`addon-${option.id}`)} />}
      mainGridColumns={1}
      panel={<BillingSupportDrawer topic="add-ons" />}
      rightPanelVariant="billing-addons"
      {...billingShellProps({
        navItems: crmOperationalNavItems,
        pageHeaderActions: (
          <CrmHeaderSummary
            items={[
              { id: "plan", icon: "users", label: "Plano 7 agentes" },
              { id: "active", icon: "package", label: "Nenhum add-on ativo" },
              { id: "quota", icon: "pieChart", label: <>Cota <strong>42%</strong> usada</>, tone: "info" }
            ]}
            onSelect={(item) => setAction(`summary-${item.id}`)}
            variant="billing"
          />
        ),
        pageHeaderBreadcrumb: <Breadcrumb items={[{ label: "Billing" }, { label: "Add-ons" }]} />,
        pageHeaderRhythm: "billing",
        subtitle: "Extras para ampliar agentes e cotas da sua assinatura",
        title: "Add-ons Taliya",
        topNavSelection: "none"
      })}
    />
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
