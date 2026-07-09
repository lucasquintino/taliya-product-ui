import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  AccessShell,
  AuthCard,
  CheckoutReviewPanel,
  ConfirmedSetupHandoff,
  PlanSummaryCard,
  SubscriptionResolutionPanel,
  SubscriptionResultHeader,
  SubscriptionStatusCard
} from "@taliya/crm";

const meta = {
  title: "CRM / Image Coverage / Access Subscription",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Clone coverage para as imagens 71-77 do fluxo de acesso/assinatura. Cada tela usa componentes aprovados do Batch 9 e a casca oficial AccessShell."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

type AccessCoverageFrameProfile = {
  width?: number;
  height?: number;
};

type CssVariableStyle = React.CSSProperties & Record<`--${string}`, string>;

const ACCESS_COVERAGE_TALL_FRAME = {
  "--taliya-layout-crm-access-shell-window-height": "var(--taliya-layout-crm-quota-progress-width)",
  "--taliya-layout-crm-access-shell-body-height": "826px",
  "--taliya-layout-crm-access-shell-main-height": "663px"
} satisfies CssVariableStyle;

function AccessCoverageStage({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "soft" }) {
  return <div className={`sb-image-coverage-access-stage sb-image-coverage-access-stage--${tone}`}>{children}</div>;
}

function accessCoverageFrameStyle(profile?: AccessCoverageFrameProfile): CssVariableStyle | undefined {
  if (!profile) return undefined;

  const style = {
    ...ACCESS_COVERAGE_TALL_FRAME
  } as CssVariableStyle;

  if (profile.width) {
    style["--taliya-layout-crm-access-shell-window-width"] = `${profile.width}px`;
  }

  if (profile.height) {
    const bodyHeight = profile.height - 64;
    const mainHeight = bodyHeight - 90 - 73;
    style["--taliya-layout-crm-access-shell-window-height"] = `${profile.height}px`;
    style["--taliya-layout-crm-access-shell-body-height"] = `${bodyHeight}px`;
    style["--taliya-layout-crm-access-shell-main-height"] = `${mainHeight}px`;
  }

  return style;
}

export const Image71ShellBase: Story = {
  name: "71 shell base",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage>
      <AccessShell />
    </AccessCoverageStage>
  )
};

export const Image72Signup: Story = {
  name: "72 signup",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage>
      <AccessShell layout="centered">
        <AuthCard />
      </AccessShell>
    </AccessCoverageStage>
  )
};

export const Image73Signin: Story = {
  name: "73 signin",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 73_round-4.1Q_acesso-assinatura_signin-entrar-salvo-ajustes.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage>
      <AccessShell layout="centered">
        <AuthCard mode="signin" />
      </AccessShell>
    </AccessCoverageStage>
  )
};

export const Image74ReviewSubscription: Story = {
  name: "74 review subscription",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 74_round-4.1Q_acesso-assinatura_revisar-assinatura-aprovado.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage tone="soft">
      <AccessShell layout="centered" style={accessCoverageFrameStyle({ height: 875 })}>
        <section className="sb-image-coverage-access-review" aria-label="Revisar assinatura">
          <header>
            <h1>Revisar assinatura</h1>
            <p>Confira seu plano antes de ir para o pagamento seguro.</p>
          </header>
          <CheckoutReviewPanel />
        </section>
      </AccessShell>
    </AccessCoverageStage>
  )
};

export const Image75PendingConfirmation: Story = {
  name: "75 pending confirmation",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 75_round-4.1Q_acesso-assinatura_aguardando-confirmacao-aprovado.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage tone="soft">
      <AccessShell layout="centered" style={accessCoverageFrameStyle({ width: 1508, height: 890 })}>
        <SubscriptionStatusCard state="verifying" />
      </AccessShell>
    </AccessCoverageStage>
  )
};

export const Image76ResolveSubscription: Story = {
  name: "76 resolve subscription",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 76_round-4.1Q_acesso-assinatura_resolver-assinatura-aprovado.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage tone="soft">
      <AccessShell layout="centered" style={accessCoverageFrameStyle({ width: 1531, height: 890 })}>
        <SubscriptionResolutionPanel />
      </AccessShell>
    </AccessCoverageStage>
  )
};

export const Image77ConfirmedHandoff: Story = {
  name: "77 confirmed handoff",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 77_round-4.1Q_acesso-assinatura_assinatura-confirmada-setup-guiado-aprovado.png."
      }
    }
  },
  render: () => (
    <AccessCoverageStage tone="soft">
      <AccessShell layout="centered" style={accessCoverageFrameStyle({ width: 1536, height: 890 })}>
        <section className="sb-image-coverage-access-confirmed" aria-label="Assinatura confirmada">
          <SubscriptionResultHeader />
          <div>
            <PlanSummaryCard state="confirmed" />
            <ConfirmedSetupHandoff />
          </div>
        </section>
      </AccessShell>
    </AccessCoverageStage>
  )
};
