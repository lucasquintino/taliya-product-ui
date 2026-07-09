import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  AddOnCard,
  CrmRightPanelPage,
  InvoiceTable,
  PlanSummaryCard,
  QuotaProgress,
  UsageDrawer,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CrmShellNavItem } from "@taliya/crm";
import { ButtonGroup, Chip, Panel } from "@taliya/ui";

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

function PageStack({ children }: { children: ReactNode }) {
  return <div className="tcrm-page-family-stack">{children}</div>;
}

function billingShellProps({
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
    activeSidebarId: "financeiro",
    avatarSrc: image79Avatar,
    navItems: billingNav,
    pageHeaderActions,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
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

function BillingAddOnsEmpty() {
  return (
    <Panel>
      <h3>Add-ons ativos</h3>
      <AddOnCard state="unavailable" />
    </Panel>
  );
}

export function BillingSubscriptionPage() {
  return (
    <CrmRightPanelPage
      main={<><PlanSummaryCard /><QuotaProgress /><BillingAddOnsEmpty /></>}
      mainGridColumns={3}
      panel={<BillingSupportDrawer topic="assinatura" />}
      {...billingShellProps({
        activeNavId: "assinatura",
        pageHeaderActions: <ButtonGroup><Chip tone="success">Ativo</Chip><Chip tone="neutral">Plano 7 agentes</Chip><Chip tone="neutral">Renova em 12/06</Chip></ButtonGroup>,
        subtitle: "Plano, agentes, cotas e faturas da sua conta Taliya",
        title: "Assinatura Taliya"
      })}
    />
  );
}

export function BillingInvoicesPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><PlanSummaryCard /><InvoiceTable /></PageStack>}
      panel={<BillingSupportDrawer topic="faturas" />}
      {...billingShellProps({
        activeNavId: "faturas",
        pageHeaderActions: <ButtonGroup><Chip tone="success">Assinatura ativa</Chip><Chip tone="warning">1 fatura em aberto</Chip><Chip tone="neutral">Cartao final 4242</Chip></ButtonGroup>,
        subtitle: "Pagamentos da assinatura do studio com a Taliya",
        title: "Faturas Taliya"
      })}
    />
  );
}

export function BillingAddOnsPage() {
  return (
    <CrmRightPanelPage
      main={<PageStack><BillingAddOnsEmpty /><Panel><h3>Disponiveis</h3><div className="tcrm-page-family-stack">
        <AddOnCard />
        <AddOnCard state="plan-max" />
        <AddOnCard state="consult" />
      </div></Panel></PageStack>}
      panel={<BillingSupportDrawer topic="add-ons" />}
      {...billingShellProps({
        activeNavId: "addons",
        pageHeaderActions: <ButtonGroup><Chip tone="neutral">Plano 7 agentes</Chip><Chip tone="neutral">Nenhum add-on ativo</Chip><Chip tone="info">Cota 42% usada</Chip></ButtonGroup>,
        subtitle: "Extras para ampliar agentes e cotas da sua assinatura",
        title: "Add-ons Taliya"
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
