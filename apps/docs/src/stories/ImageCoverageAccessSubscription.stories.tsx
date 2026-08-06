import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  AccessShell,
  AuthCard,
  ConfirmedSubscriptionPage,
  SubscriptionReviewPage,
  SubscriptionResolutionPanel,
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

const accessActions = {
  account: fn(),
  applyCoupon: fn(),
  authForgotPassword: fn(),
  authGoogle: fn(),
  authMicrosoft: fn(),
  authPrivacy: fn(),
  authSubmit: fn(),
  authSwitchMode: fn(),
  authTerms: fn(),
  backToPlans: fn(),
  changePlan: fn(),
  continuePayment: fn(),
  featureHelp: fn(),
  help: fn(),
  reopenPayment: fn(),
  retryPayment: fn(),
  scheduleHelp: fn(),
  startSetup: fn(),
  support: fn()
};

function resetAccessActions() {
  Object.values(accessActions).forEach((action) => action.mockClear());
}

function AccessCoverageShell(props: React.ComponentProps<typeof AccessShell>) {
  return <AccessShell onAccount={accessActions.account} onHelp={accessActions.help} {...props} />;
}

function AccessCoverageStage({ children }: { children: React.ReactNode }) {
  return <div className="sb-image-coverage-access-stage">{children}</div>;
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
      <AccessCoverageShell />
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Ajuda" }));
    await userEvent.click(canvas.getByRole("button", { name: "Conta" }));
    await expect(accessActions.help).toHaveBeenCalledTimes(1);
    await expect(accessActions.account).toHaveBeenCalledTimes(1);
  }
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
      <AccessCoverageShell layout="centered">
        <AuthCard
          onGoogle={accessActions.authGoogle}
          onMicrosoft={accessActions.authMicrosoft}
          onPrivacy={accessActions.authPrivacy}
          onSubmit={accessActions.authSubmit}
          onSwitchMode={accessActions.authSwitchMode}
          onTerms={accessActions.authTerms}
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Continuar com Google" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "E-mail profissional" }), "ana@studiolume.com");
    await userEvent.click(canvas.getByRole("button", { name: "Continuar com e-mail" }));
    await userEvent.click(canvas.getByRole("button", { name: "Entrar" }));
    await expect(accessActions.authGoogle).toHaveBeenCalledTimes(1);
    await expect(accessActions.authSubmit).toHaveBeenCalledTimes(1);
    await expect(accessActions.authSwitchMode).toHaveBeenCalledTimes(1);
  }
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
      <AccessCoverageShell layout="centered">
        <AuthCard
          mode="signin"
          onForgotPassword={accessActions.authForgotPassword}
          onGoogle={accessActions.authGoogle}
          onMicrosoft={accessActions.authMicrosoft}
          onSubmit={accessActions.authSubmit}
          onSwitchMode={accessActions.authSwitchMode}
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("E-mail"), "ana@studiolume.com");
    await userEvent.type(canvas.getByPlaceholderText("Senha"), "senha-segura");
    await userEvent.click(canvas.getByRole("button", { name: "Entrar" }));
    await userEvent.click(canvas.getByRole("button", { name: "Esqueci minha senha" }));
    await userEvent.click(canvas.getByRole("button", { name: "Criar conta" }));
    await expect(accessActions.authSubmit).toHaveBeenCalledTimes(1);
    await expect(accessActions.authForgotPassword).toHaveBeenCalledTimes(1);
    await expect(accessActions.authSwitchMode).toHaveBeenCalledTimes(1);
  }
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
    <AccessCoverageStage>
      <AccessCoverageShell layout="centered">
        <SubscriptionReviewPage
          panelProps={{
            onApplyCoupon: accessActions.applyCoupon,
            onBackToPlans: accessActions.backToPlans,
            onChangePlan: accessActions.changePlan,
            onContinuePayment: accessActions.continuePayment,
            onFeatureHelp: accessActions.featureHelp
          }}
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("textbox", { name: "Código promocional" }), "TALIYA10");
    await userEvent.click(canvas.getByRole("button", { name: "Aplicar" }));
    await userEvent.click(canvas.getByRole("button", { name: "Continuar para pagamento seguro" }));
    await userEvent.click(canvas.getByRole("button", { name: "Voltar aos planos" }));
    await expect(accessActions.applyCoupon).toHaveBeenCalledWith("TALIYA10");
    await expect(accessActions.continuePayment).toHaveBeenCalledTimes(1);
    await expect(accessActions.backToPlans).toHaveBeenCalledTimes(1);
  }
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
    <AccessCoverageStage>
      <AccessCoverageShell layout="centered">
        <SubscriptionStatusCard
          onReopenPayment={accessActions.reopenPayment}
          onSupport={accessActions.support}
          state="verifying"
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: /Verificando/i })).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "Reabrir pagamento seguro" }));
    await userEvent.click(canvas.getByRole("button", { name: "Falar com suporte" }));
    await expect(accessActions.reopenPayment).toHaveBeenCalledTimes(1);
    await expect(accessActions.support).toHaveBeenCalledTimes(1);
  }
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
    <AccessCoverageStage>
      <AccessCoverageShell layout="centered">
        <SubscriptionResolutionPanel
          onBackToPlans={accessActions.backToPlans}
          onRetry={accessActions.retryPayment}
          onSupport={accessActions.support}
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Tentar pagamento novamente" }));
    await userEvent.click(canvas.getByRole("button", { name: "Voltar aos planos" }));
    await userEvent.click(canvas.getByRole("button", { name: "Falar com suporte" }));
    await expect(accessActions.retryPayment).toHaveBeenCalledTimes(1);
    await expect(accessActions.backToPlans).toHaveBeenCalledTimes(1);
    await expect(accessActions.support).toHaveBeenCalledTimes(1);
  }
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
    <AccessCoverageStage>
      <AccessCoverageShell layout="centered">
        <ConfirmedSubscriptionPage
          handoffProps={{
            onScheduleHelp: accessActions.scheduleHelp,
            onStartSetup: accessActions.startSetup
          }}
        />
      </AccessCoverageShell>
    </AccessCoverageStage>
  ),
  play: async ({ canvasElement }) => {
    resetAccessActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Começar setup guiado" }));
    await userEvent.click(canvas.getByRole("button", { name: "Agendar ajuda humana" }));
    await expect(accessActions.startSetup).toHaveBeenCalledTimes(1);
    await expect(accessActions.scheduleHelp).toHaveBeenCalledTimes(1);
  }
};
