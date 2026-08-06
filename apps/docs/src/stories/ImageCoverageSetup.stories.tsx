import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  defaultSetupSteps,
  setupAgentContexts,
  SetupAgentChat,
  SetupAgendaWorkspace,
  SetupChannelsWorkspace,
  SetupClassesWorkspace,
  SetupConsumptionWorkspace,
  SetupPage,
  SetupPaymentWorkspace,
  SetupPlansWorkspace,
  SetupReviewWorkspace,
  SetupStudioWorkspace,
  SetupStudentsWorkspace,
  SetupTeamWorkspace,
  SetupWelcomeWorkspace,
  type SetupAgentContext,
  type SetupPlanField
} from "@taliya/crm";

import image79Avatar from "../assets/image79-avatar.png";
import source51eLeticiaRamos from "../assets/source51e-leticia-ramos.png";

const meta = {
  title: "CRM / Image Coverage / Setup",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage oficial das rotas de onboarding/setup guiado. As composicoes usam SetupShell, contexto oficial por etapa e componentes oficiais de setup."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const setupActions = {
  agentClose: fn(),
  agentHumanHelp: fn(),
  agentMenu: fn(),
  agentQuickReply: fn(),
  agentSend: fn(),
  agendaAction: fn(),
  agendaBackToClasses: fn(),
  agendaClassSelect: fn(),
  agendaSlotSelect: fn(),
  channelsAction: fn(),
  channelsConnectWhatsApp: fn(),
  channelsStateChange: fn(),
  classesAction: fn(),
  classesClassAction: fn(),
  classesClassSelect: fn(),
  classesSourceSelect: fn(),
  consumptionAction: fn(),
  consumptionModelSelect: fn(),
  consumptionSettingChange: fn(),
  plansAction: fn(),
  plansFieldChange: fn(),
  plansNewPlan: fn(),
  plansPlanAction: fn(),
  plansPlanSelect: fn(),
  paymentAction: fn(),
  paymentLearnMore: fn(),
  paymentMethodsChange: fn(),
  reviewAction: fn(),
  reviewAreaOpen: fn(),
  reviewConfirmChange: fn(),
  reviewPublish: fn(),
  shellAgentQuickReply: fn(),
  shellAgentClose: fn(),
  shellAgentHumanHelp: fn(),
  shellAgentMenu: fn(),
  shellAgentSend: fn(),
  shellBottomBarToggle: fn(),
  shellHelp: fn(),
  shellProfile: fn(),
  shellStepSelect: fn(),
  shellStudioSelect: fn(),
  studentsAction: fn(),
  studentsSourceSelect: fn(),
  studentsStudentAction: fn(),
  studentsStudentSelect: fn(),
  studioAction: fn(),
  studioActiveDaysChange: fn(),
  studioAdjustDay: fn(),
  studioScheduleModeChange: fn(),
  teamAction: fn(),
  teamAddPerson: fn(),
  teamInviteEdit: fn(),
  teamInviteOpen: fn(),
  teamInviteRemove: fn(),
  welcomeStart: fn(),
  welcomeStudioNameChange: fn()
};

function resetSetupActions() {
  Object.values(setupActions).forEach((action) => action.mockClear());
}

function setupAgentProps(context: SetupAgentContext, onAction: (action: string) => void) {
  return {
    agentContext: context,
    onAgentClose: () => {
      setupActions.shellAgentClose();
      onAction("agent-close");
    },
    onAgentHumanHelp: () => {
      setupActions.shellAgentHumanHelp();
      onAction("agent-human-help");
    },
    onAgentMenu: () => {
      setupActions.shellAgentMenu();
      onAction("agent-menu");
    },
    onAgentQuickReply: (question: string) => {
      setupActions.shellAgentQuickReply(question);
      onAction(`quick-reply:${question}`);
    },
    onAgentSend: (value: string) => {
      setupActions.shellAgentSend(value);
      onAction(`agent-send:${value}`);
    }
  };
}

export function SetupShellGlobalPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.shellBase, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="shell-global"
      onBottomBarToggle={() => {
        setupActions.shellBottomBarToggle();
        setAction("bottom-bar-toggle");
      }}
      onHelp={() => {
        setupActions.shellHelp();
        setAction("help");
      }}
      onProfile={() => {
        setupActions.shellProfile();
        setAction("profile");
      }}
      onStepSelect={(stepId) => {
        setupActions.shellStepSelect(stepId);
        setAction(`step:${stepId}`);
      }}
      onStudioSelect={() => {
        setupActions.shellStudioSelect();
        setAction("studio");
      }}
      progress={32}
      step={2}
    />
  );
}

export function SetupAgentChatPage() {
  const [, setAction] = useState("");

  return (
    <div className="sb-image-coverage-setup-agent-stage">
      <SetupAgentChat
        context={setupAgentContexts.shellBase}
        onClose={() => {
          setupActions.agentClose();
          setAction("close");
        }}
        onHumanHelp={() => {
          setupActions.agentHumanHelp();
          setAction("human-help");
        }}
        onMenu={() => {
          setupActions.agentMenu();
          setAction("menu");
        }}
        onQuickReply={(itemId) => {
          setupActions.agentQuickReply(itemId);
          setAction(`quick-reply:${itemId}`);
        }}
        onSend={(value) => {
          setupActions.agentSend(value);
          setAction(`send:${value}`);
        }}
      />
    </div>
  );
}

export function SetupWorkspaceConfigPage() {
  const [model, setModel] = useState<"membership" | "class-pack" | "hybrid">("class-pack");
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.consumption, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided"
      progress={32}
      step={2}
      steps={defaultSetupSteps}
    >
      <SetupConsumptionWorkspace
        model={model}
        onAction={(action) => {
          setupActions.consumptionAction(action);
          setAction(action);
        }}
        onModelSelect={(nextModel) => {
          setupActions.consumptionModelSelect(nextModel);
          setModel(nextModel);
        }}
        onSettingChange={(setting, enabled) => {
          setupActions.consumptionSettingChange(setting, enabled);
          setAction(`${setting}:${enabled}`);
        }}
      />
    </SetupPage>
  );
}

export function SetupStudioPage() {
  const [activeDays, setActiveDays] = useState(["Seg", "Ter", "Qua", "Qui", "Sex"]);
  const [scheduleMode, setScheduleMode] = useState<"continuous" | "break">("continuous");
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.studio, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={12}
      step={1}
      steps={defaultSetupSteps}
    >
      <SetupStudioWorkspace
        activeDays={activeDays}
        onAction={(action) => {
          setupActions.studioAction(action);
          setAction(action);
        }}
        onActiveDaysChange={(days) => {
          setupActions.studioActiveDaysChange(days);
          setActiveDays(days);
        }}
        onAdjustDay={() => {
          setupActions.studioAdjustDay();
          setAction("adjust-day");
        }}
        onScheduleModeChange={(mode) => {
          setupActions.studioScheduleModeChange(mode);
          setScheduleMode(mode);
        }}
        scheduleMode={scheduleMode}
      />
    </SetupPage>
  );
}

export function SetupTeamPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.team, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={24}
      step={2}
      steps={defaultSetupSteps}
    >
      <SetupTeamWorkspace
        onAction={(action) => {
          setupActions.teamAction(action);
          setAction(action);
        }}
        onAddPerson={() => {
          setupActions.teamAddPerson();
          setAction("add-person");
        }}
        onInviteEdit={(invite) => {
          setupActions.teamInviteEdit(invite);
          setAction(`edit:${invite.id}`);
        }}
        onInviteOpen={(invite) => {
          setupActions.teamInviteOpen(invite);
          setAction(`open:${invite.id}`);
        }}
        onInviteRemove={(invite) => {
          setupActions.teamInviteRemove(invite);
          setAction(`remove:${invite.id}`);
        }}
        ownerAvatarSrc={source51eLeticiaRamos}
      />
    </SetupPage>
  );
}

export function SetupChannelsPage() {
  const [whatsAppState, setWhatsAppState] = useState<"business" | "personal" | "unknown" | "missing">("business");
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.channels, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={36}
      step={3}
      steps={defaultSetupSteps}
    >
      <SetupChannelsWorkspace
        onAction={(action) => {
          setupActions.channelsAction(action);
          setAction(action);
        }}
        onConnectWhatsApp={() => {
          setupActions.channelsConnectWhatsApp();
          setAction("connect-whatsapp");
        }}
        onWhatsAppStateChange={(state) => {
          setupActions.channelsStateChange(state);
          setWhatsAppState(state);
        }}
        whatsAppState={whatsAppState}
      />
    </SetupPage>
  );
}

export function SetupPlansPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<"weekly" | "pack" | "trial">("pack");
  const [fieldValues, setFieldValues] = useState<Partial<Record<SetupPlanField, string>>>({});
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.plans, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-main"
      progress={48}
      step={4}
      steps={defaultSetupSteps}
    >
      <SetupPlansWorkspace
        fieldValues={fieldValues}
        onAction={(action) => {
          setupActions.plansAction(action);
          setAction(action);
        }}
        onFieldChange={(field, value) => {
          setupActions.plansFieldChange(field, value);
          setFieldValues((current) => ({ ...current, [field]: value }));
        }}
        onNewPlan={() => {
          setupActions.plansNewPlan();
          setAction("new-plan");
        }}
        onPlanAction={(planId, action) => {
          setupActions.plansPlanAction(planId, action);
          setAction(`${action}:${planId}`);
        }}
        onPlanSelect={(planId) => {
          setupActions.plansPlanSelect(planId);
          setSelectedPlanId(planId);
        }}
        selectedPlanId={selectedPlanId}
      />
    </SetupPage>
  );
}

export function SetupPaymentPage() {
  const [selectedMethods, setSelectedMethods] = useState<Array<"pix" | "cash" | "card">>(["pix", "cash", "card"]);
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.payment, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-main"
      progress={55}
      step={5}
      steps={defaultSetupSteps}
    >
      <SetupPaymentWorkspace
        onAction={(action) => {
          setupActions.paymentAction(action);
          setAction(action);
        }}
        onLearnMore={() => {
          setupActions.paymentLearnMore();
          setAction("learn-more");
        }}
        onSelectedMethodsChange={(methods) => {
          setupActions.paymentMethodsChange(methods);
          setSelectedMethods(methods);
        }}
        selectedMethods={selectedMethods}
      />
    </SetupPage>
  );
}

export function SetupStudentsImportPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.students, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided"
      progress={66}
      step={6}
      steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupStudentsWorkspace
        onAction={(action) => {
          setupActions.studentsAction(action);
          setAction(action);
        }}
        onSourceSelect={(source) => {
          setupActions.studentsSourceSelect(source);
          setAction(`source:${source}`);
        }}
        onStudentAction={(studentId, action) => {
          setupActions.studentsStudentAction(studentId, action);
          setAction(`${action}:${studentId}`);
        }}
        onStudentSelect={(studentId) => {
          setupActions.studentsStudentSelect(studentId);
          setAction(`student:${studentId}`);
        }}
      />
    </SetupPage>
  );
}

export function SetupClassesPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.classes, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-wide"
      progress={77}
      step={7}
      steps={defaultSetupSteps}
    >
      <SetupClassesWorkspace
        onAction={(action) => {
          setupActions.classesAction(action);
          setAction(action);
        }}
        onClassAction={(classId, action) => {
          setupActions.classesClassAction(classId, action);
          setAction(`${action}:${classId}`);
        }}
        onClassSelect={(classId) => {
          setupActions.classesClassSelect(classId);
          setAction(`class:${classId}`);
        }}
        onSourceSelect={(source) => {
          setupActions.classesSourceSelect(source);
          setAction(`source:${source}`);
        }}
      />
    </SetupPage>
  );
}

export function SetupAgendaPage() {
  const [selectedClassId, setSelectedClassId] = useState("ter-qui-18");
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.agenda, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-wide"
      progress={88}
      step={8}
      steps={defaultSetupSteps}
    >
      <SetupAgendaWorkspace
        onAction={(action) => {
          setupActions.agendaAction(action);
          setAction(action);
        }}
        onBackToClasses={() => {
          setupActions.agendaBackToClasses();
          setAction("back-to-classes");
        }}
        onClassSelect={(classId) => {
          setupActions.agendaClassSelect(classId);
          setSelectedClassId(classId);
        }}
        onSlotSelect={(slot) => {
          setupActions.agendaSlotSelect(slot);
          setAction(`slot:${slot.id}`);
        }}
        selectedClassId={selectedClassId}
      />
    </SetupPage>
  );
}

export function SetupReviewPage() {
  const [confirmed, setConfirmed] = useState(true);
  const [, setAction] = useState("");

  return (
    <SetupPage
      {...setupAgentProps(setupAgentContexts.review, setAction)}
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-review"
      progress={98}
      step={9}
      steps={defaultSetupSteps}
    >
      <SetupReviewWorkspace
        confirmed={confirmed}
        onBack={() => {
          setupActions.reviewAction("back-to-agenda");
          setAction("back-to-agenda");
        }}
        onConfirmChange={(nextConfirmed) => {
          setupActions.reviewConfirmChange(nextConfirmed);
          setConfirmed(nextConfirmed);
        }}
        onOpenArea={(area) => {
          setupActions.reviewAreaOpen(area);
          setAction(`area:${area}`);
        }}
        onPublish={() => {
          setupActions.reviewPublish();
          setAction("publish");
        }}
        onResolveBlocking={() => {
          setupActions.reviewAction("resolve-blocking");
          setAction("resolve-blocking");
        }}
        onReviewWarnings={() => {
          setupActions.reviewAction("review-warnings");
          setAction("review-warnings");
        }}
        onSaveDraft={() => {
          setupActions.reviewAction("save-draft");
          setAction("save-draft");
        }}
      />
    </SetupPage>
  );
}

export function SetupWelcomePage() {
  const [studioName, setStudioName] = useState("");
  const [, setAction] = useState("");

  return (
    <SetupPage
      agent={
        <SetupAgentChat
          onClose={() => setupActions.agentClose()}
          onHumanHelp={() => {
            setupActions.agentHumanHelp();
            setAction("human-help");
          }}
          onMenu={() => setupActions.agentMenu()}
          onQuickReply={(itemId) => {
            setupActions.agentQuickReply(itemId);
            setAction(`quick-reply:${itemId}`);
          }}
          variant="welcome"
        />
      }
      avatarSrc={image79Avatar}
      layout="welcome"
      onBottomBarToggle={() => setupActions.shellBottomBarToggle()}
      onHelp={() => setupActions.shellHelp()}
      onProfile={() => setupActions.shellProfile()}
      onStudioSelect={() => setupActions.shellStudioSelect()}
      progress={0}
      status={null}
      step={1}
      studioName="Setup inicial"
    >
      <SetupWelcomeWorkspace
        onStart={() => {
          setupActions.welcomeStart();
          setAction("start");
        }}
        onStudioNameChange={(name) => {
          setupActions.welcomeStudioNameChange(name);
          setStudioName(name);
        }}
        studioName={studioName}
      />
    </SetupPage>
  );
}

export const Image51AOnboardingShellGlobal: Story = {
  name: "51A onboarding shell global",
  parameters: { sourceImage: "51A_round-4.1J_onboarding_shell-global-aprovado.png" },
  render: () => <SetupShellGlobalPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Studio Leticia" }));
    await userEvent.click(canvas.getByRole("button", { name: "Ajuda" }));
    await userEvent.click(canvas.getByRole("button", { name: "Abrir perfil" }));
    await userEvent.click(canvas.getByRole("button", { name: /2.*Equipe.*Em andamento/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Mais ações do agente" }));
    await userEvent.click(canvas.getByRole("button", { name: "O que é obrigatório?" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "Pergunte sobre esta etapa" }), "Como continuar?");
    await userEvent.click(canvas.getByRole("button", { name: "Enviar pergunta" }));
    await userEvent.click(canvas.getByRole("button", { name: "Agendar ajuda" }));
    await userEvent.click(canvas.getByRole("button", { name: "Fechar agente" }));
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }));
    await expect(setupActions.shellStudioSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellHelp).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellProfile).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellStepSelect).toHaveBeenCalledWith(2);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentSend).toHaveBeenCalledWith("Como continuar?");
    await expect(setupActions.shellAgentMenu).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentHumanHelp).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentClose).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellBottomBarToggle).toHaveBeenCalledTimes(1);
  }
};

export const Image51BOnboardingAgenteConfiguracaoChat: Story = {
  name: "51B onboarding agente configuracao chat",
  parameters: { layout: "fullscreen", sourceImage: "51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png" },
  render: () => <SetupAgentChatPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Mais opções do agente" }));
    await userEvent.click(canvas.getByRole("button", { name: "O que é obrigatório?" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "Perguntar sobre esta etapa" }), "Preciso revisar os dados");
    await userEvent.click(canvas.getByRole("button", { name: "Enviar pergunta" }));
    await userEvent.click(canvas.getByRole("button", { name: "Agendar ajuda" }));
    await userEvent.click(canvas.getByRole("button", { name: "Fechar agente" }));
    await expect(setupActions.agentMenu).toHaveBeenCalledTimes(1);
    await expect(setupActions.agentQuickReply).toHaveBeenCalledTimes(1);
    await expect(setupActions.agentSend).toHaveBeenCalledWith("Preciso revisar os dados");
    await expect(setupActions.agentHumanHelp).toHaveBeenCalledTimes(1);
    await expect(setupActions.agentClose).toHaveBeenCalledTimes(1);
  }
};

export const Image51COnboardingWorkspaceConfiguracao: Story = {
  name: "51C onboarding workspace configuracao",
  parameters: { sourceImage: "51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png" },
  render: () => <SetupWorkspaceConfigPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Mensalidade Cobranca recorrente/ }));
    await userEvent.click(canvas.getByRole("switch", { name: "Renova automaticamente" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "O que é prazo de reposição?" }));
    await expect(canvas.getByText(/Estamos na etapa Consumo de aulas/)).toBeInTheDocument();
    await expect(setupActions.consumptionModelSelect).toHaveBeenCalledWith("membership");
    await expect(setupActions.consumptionSettingChange).toHaveBeenCalledTimes(1);
    await expect(setupActions.consumptionAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("O que é prazo de reposição?");
  }
};

export const Image51DOnboardingStudio: Story = {
  name: "51D onboarding bloco studio",
  parameters: { sourceImage: "51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png" },
  render: () => <SetupStudioPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("checkbox", { name: "Sab" }));
    await userEvent.click(canvas.getByRole("button", { name: "Tem pausa" }));
    await userEvent.click(canvas.getByRole("button", { name: "Ajustar horários por dia" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Isso já cria agenda?" }));
    await expect(canvas.getByText("Este bloco define a janela em que o studio pode ter aulas.")).toBeInTheDocument();
    await expect(setupActions.studioActiveDaysChange).toHaveBeenCalledTimes(1);
    await expect(setupActions.studioScheduleModeChange).toHaveBeenCalledWith("break");
    await expect(setupActions.studioAdjustDay).toHaveBeenCalledTimes(1);
    await expect(setupActions.studioAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Isso já cria agenda?");
  }
};

export const Image51EOnboardingEquipe: Story = {
  name: "51E onboarding bloco equipe",
  parameters: { sourceImage: "51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png" },
  render: () => <SetupTeamPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Adicionar pessoa" }));
    await userEvent.click(canvas.getByRole("button", { name: "Editar Ana Martins" }));
    await userEvent.click(canvas.getByRole("button", { name: "Remover Ana Martins" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Quando o convite é enviado?" }));
    await expect(canvas.getByText(/Este bloco prepara quem terá acesso/)).toBeInTheDocument();
    await expect(setupActions.teamAddPerson).toHaveBeenCalledTimes(1);
    await expect(setupActions.teamInviteEdit).toHaveBeenCalledTimes(1);
    await expect(setupActions.teamInviteRemove).toHaveBeenCalledTimes(1);
    await expect(setupActions.teamAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Quando o convite é enviado?");
  }
};

export const Image51FOnboardingCanais: Story = {
  name: "51F onboarding bloco canais",
  parameters: { sourceImage: "51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png" },
  render: () => <SetupChannelsPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Ainda esta no WhatsApp pessoal" }));
    await userEvent.click(canvas.getByRole("button", { name: "Conectar WhatsApp Business" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Preciso conectar agora?" }));
    await expect(canvas.getByText(/Este bloco define os canais/)).toBeInTheDocument();
    await expect(setupActions.channelsStateChange).toHaveBeenCalledWith("personal");
    await expect(setupActions.channelsConnectWhatsApp).toHaveBeenCalledTimes(1);
    await expect(setupActions.channelsAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Preciso conectar agora?");
  }
};

export const Image51GOnboardingPlanos: Story = {
  name: "51G onboarding bloco planos",
  parameters: { sourceImage: "51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png" },
  render: () => <SetupPlansPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Pilates 2x por semana/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Novo plano" }));
    await userEvent.click(canvas.getAllByRole("button", { name: "Editar" })[0]!);
    await userEvent.click(canvas.getByRole("button", { name: "Aula avulsa" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Qual tipo escolher?" }));
    await expect(canvas.getByText(/Este bloco define como o Taliya entende/)).toBeInTheDocument();
    await expect(setupActions.plansPlanSelect).toHaveBeenCalledWith("weekly");
    await expect(setupActions.plansNewPlan).toHaveBeenCalledTimes(1);
    await expect(setupActions.plansPlanAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.plansFieldChange).toHaveBeenCalledWith("type", "single");
    await expect(setupActions.plansAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Qual tipo escolher?");
  }
};

export const Image51KOnboardingPagamento: Story = {
  name: "51K onboarding bloco pagamento",
  parameters: { sourceImage: "51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png" },
  render: () => <SetupPaymentPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Pix Pagamento por Pix/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Entender Pagamentos Taliya" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Como funciona a baixa?" }));
    await expect(canvas.getByText(/Este bloco define quais meios/)).toBeInTheDocument();
    await expect(setupActions.paymentMethodsChange).toHaveBeenCalledTimes(1);
    await expect(setupActions.paymentLearnMore).toHaveBeenCalledTimes(1);
    await expect(setupActions.paymentAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Como funciona a baixa?");
  }
};

export const Image51HOnboardingAlunos: Story = {
  name: "51H onboarding bloco alunos",
  parameters: { sourceImage: "51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png" },
  render: () => <SetupStudentsImportPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Importar arquivos Planilhas/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Editar Ana Martins" }));
    await userEvent.click(canvas.getByRole("button", { name: "Ver Ana Martins" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Posso importar foto de caderno?" }));
    await expect(canvas.getByText("Este bloco cria a base inicial de alunos ativos.")).toBeInTheDocument();
    await expect(setupActions.studentsSourceSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.studentsStudentAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.studentsStudentSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.studentsAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Posso importar foto de caderno?");
  }
};

export const Image51IOnboardingTurmas: Story = {
  name: "51I onboarding bloco turmas",
  parameters: { sourceImage: "51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png" },
  render: () => <SetupClassesPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Importar arquivos Planilhas/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Editar Ter/Qui 18h" }));
    await userEvent.click(canvas.getByRole("button", { name: "Ver Ter/Qui 18h" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Turma é diferente de agenda?" }));
    await expect(canvas.getByText(/Este bloco organiza os horários fixos/)).toBeInTheDocument();
    await expect(setupActions.classesSourceSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.classesClassAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.classesClassSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.classesAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Turma é diferente de agenda?");
  }
};

export const Image51JOnboardingAgenda: Story = {
  name: "51J onboarding bloco agenda",
  parameters: { sourceImage: "51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png" },
  render: () => <SetupAgendaPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("gridcell", { name: "Ter das 18:00 às 19:00: Ter/Qui 18h" }));
    await userEvent.click(canvas.getByRole("button", { name: "Voltar para turmas" }));
    await userEvent.click(canvas.getByRole("button", { name: "Salvar rascunho" }));
    await userEvent.click(canvas.getByRole("button", { name: "Por que voltar para turmas?" }));
    await expect(canvas.getByText("Este bloco revisa a agenda inicial gerada pelo Taliya.")).toBeInTheDocument();
    await expect(setupActions.agendaSlotSelect).toHaveBeenCalledTimes(1);
    await expect(setupActions.agendaBackToClasses).toHaveBeenCalledTimes(1);
    await expect(setupActions.agendaAction).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("Por que voltar para turmas?");
  }
};

export const Image51LOnboardingRevisao: Story = {
  name: "51L onboarding bloco revisao",
  parameters: { sourceImage: "51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png" },
  render: () => <SetupReviewPage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Studio Nome e horários gerais/ }));
    await userEvent.click(canvas.getByRole("button", { name: "Resolver" }));
    await userEvent.click(canvas.getByRole("button", { name: "Revisar avisos" }));
    const confirmation = canvas.getByRole("checkbox", { name: /Revisei as informações/ });
    await userEvent.click(confirmation);
    await expect(canvas.getByRole("button", { name: "Publicar setup inicial" })).toBeDisabled();
    await userEvent.click(confirmation);
    await userEvent.click(canvas.getByRole("button", { name: "Publicar setup inicial" }));
    await userEvent.click(canvas.getByRole("button", { name: "O que será publicado?" }));
    await expect(canvas.getByText("Esta é a revisão final antes de publicar o setup inicial.")).toBeInTheDocument();
    await expect(setupActions.reviewAreaOpen).toHaveBeenCalledTimes(1);
    await expect(setupActions.reviewAction).toHaveBeenCalledTimes(2);
    await expect(setupActions.reviewConfirmChange).toHaveBeenCalledTimes(2);
    await expect(setupActions.reviewPublish).toHaveBeenCalledTimes(1);
    await expect(setupActions.shellAgentQuickReply).toHaveBeenCalledWith("O que será publicado?");
  }
};

export const Image78OnboardingBemVindo: Story = {
  name: "78 onboarding bem vindo setup guiado",
  parameters: { sourceImage: "78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png" },
  render: () => <SetupWelcomePage />,
  play: async ({ canvasElement }) => {
    resetSetupActions();
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Ajuda" }));
    await userEvent.type(canvas.getByRole("textbox", { name: "Nome do studio" }), "Studio Aurora");
    await userEvent.click(canvas.getByRole("button", { name: "Começar setup guiado" }));
    await userEvent.click(canvas.getByRole("button", { name: "O que vou configurar?" }));
    await userEvent.click(canvas.getByRole("button", { name: "Agendar ajuda" }));
    await expect(setupActions.shellHelp).toHaveBeenCalledTimes(1);
    await expect(setupActions.welcomeStudioNameChange).toHaveBeenCalled();
    await expect(setupActions.welcomeStart).toHaveBeenCalledTimes(1);
    await expect(setupActions.agentQuickReply).toHaveBeenCalledTimes(1);
    await expect(setupActions.agentHumanHelp).toHaveBeenCalledTimes(1);
  }
};
