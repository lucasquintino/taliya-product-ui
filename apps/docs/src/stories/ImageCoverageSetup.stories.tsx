import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
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
  SetupWelcomeWorkspace
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
          "Coverage oficial das imagens de onboarding/setup guiado. As composicoes usam SetupShell e componentes oficiais de setup; status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export function SetupShellGlobalPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      avatarSrc={source51eLeticiaRamos}
      frameVariant="shell-global"
      onAgentQuickReply={(question) => setAction(`quick-reply:${question}`)}
      onAgentSend={() => setAction("agent-send")}
      onBottomBarToggle={() => setAction("bottom-bar-toggle")}
      onHelp={() => setAction("help")}
      onProfile={() => setAction("profile")}
      onStepSelect={(stepId) => setAction(`step:${stepId}`)}
      onStudioSelect={() => setAction("studio")}
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
        onClose={() => setAction("close")}
        onHumanHelp={() => setAction("human-help")}
        onMenu={() => setAction("menu")}
        onQuickReply={(itemId) => setAction(`quick-reply:${itemId}`)}
        onSend={(value) => setAction(`send:${value}`)}
      />
    </div>
  );
}

export function SetupWorkspaceConfigPage() {
  const [model, setModel] = useState<"membership" | "class-pack" | "hybrid">("class-pack");
  const [, setAction] = useState("");

  return (
    <SetupPage
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided"
      progress={32}
      step={2}
      steps={["Diagnostico", "Configuracoes", "Agenda", "Planos", "Importacao", "Revisao"]}
    >
      <SetupConsumptionWorkspace
        model={model}
        onAction={setAction}
        onModelSelect={setModel}
        onSettingChange={(setting, enabled) => setAction(`${setting}:${enabled}`)}
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
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={12}
      step={1}
      steps={["Studio", "Equipe", "Canais", "Planos", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupStudioWorkspace
        activeDays={activeDays}
        onAction={setAction}
        onActiveDaysChange={setActiveDays}
        onAdjustDay={() => setAction("adjust-day")}
        onScheduleModeChange={setScheduleMode}
        scheduleMode={scheduleMode}
      />
    </SetupPage>
  );
}

export function SetupTeamPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={24}
      step={2}
      steps={["Studio", "Equipe", "Canais", "Planos", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupTeamWorkspace
        onAction={setAction}
        onAddPerson={() => setAction("add-person")}
        onInviteEdit={(invite) => setAction(`edit:${invite.id}`)}
        onInviteOpen={(invite) => setAction(`open:${invite.id}`)}
        onInviteRemove={(invite) => setAction(`remove:${invite.id}`)}
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
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-block"
      progress={36}
      step={3}
      steps={["Studio", "Equipe", "Canais", "Planos", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupChannelsWorkspace
        onAction={setAction}
        onConnectWhatsApp={() => setAction("connect-whatsapp")}
        onWhatsAppStateChange={setWhatsAppState}
        whatsAppState={whatsAppState}
      />
    </SetupPage>
  );
}

export function SetupPlansPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<"weekly" | "pack" | "trial">("pack");
  const [, setAction] = useState("");

  return (
    <SetupPage
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-main"
      progress={48}
      step={4}
      steps={["Studio", "Equipe", "Canais", "Planos", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupPlansWorkspace
        onAction={setAction}
        onNewPlan={() => setAction("new-plan")}
        onPlanAction={(planId, action) => setAction(`${action}:${planId}`)}
        onPlanSelect={setSelectedPlanId}
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
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided-main"
      progress={55}
      step={5}
      steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupPaymentWorkspace
        onAction={setAction}
        onLearnMore={() => setAction("learn-more")}
        onSelectedMethodsChange={setSelectedMethods}
        selectedMethods={selectedMethods}
      />
    </SetupPage>
  );
}

export function SetupStudentsImportPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage
      avatarSrc={source51eLeticiaRamos}
      frameVariant="guided"
      progress={66}
      step={6}
      steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}
    >
      <SetupStudentsWorkspace
        onAction={setAction}
        onSourceSelect={(source) => setAction(`source:${source}`)}
        onStudentAction={(studentId, action) => setAction(`${action}:${studentId}`)}
        onStudentSelect={(studentId) => setAction(`student:${studentId}`)}
      />
    </SetupPage>
  );
}

export function SetupClassesPage() {
  const [, setAction] = useState("");

  return (
    <SetupPage avatarSrc={source51eLeticiaRamos} frameVariant="guided-wide" progress={77} step={7} steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}>
      <SetupClassesWorkspace
        onAction={setAction}
        onClassAction={(classId, action) => setAction(`${action}:${classId}`)}
        onClassSelect={(classId) => setAction(`class:${classId}`)}
        onSourceSelect={(source) => setAction(`source:${source}`)}
      />
    </SetupPage>
  );
}

export function SetupAgendaPage() {
  const [selectedClassId, setSelectedClassId] = useState("ter-qui-18");
  const [, setAction] = useState("");

  return (
    <SetupPage avatarSrc={source51eLeticiaRamos} frameVariant="guided-wide" progress={88} step={8} steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}>
      <SetupAgendaWorkspace
        onAction={setAction}
        onBackToClasses={() => setAction("back-to-classes")}
        onClassSelect={setSelectedClassId}
        onSlotSelect={(slot) => setAction(`slot:${slot.id}`)}
        selectedClassId={selectedClassId}
      />
    </SetupPage>
  );
}

export function SetupReviewPage() {
  const [confirmed, setConfirmed] = useState(true);
  const [, setAction] = useState("");

  return (
    <SetupPage avatarSrc={source51eLeticiaRamos} frameVariant="guided-review" progress={98} step={9} steps={["Studio", "Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisao"]}>
      <SetupReviewWorkspace
        confirmed={confirmed}
        onBack={() => setAction("back-to-agenda")}
        onConfirmChange={setConfirmed}
        onOpenArea={(area) => setAction(`area:${area}`)}
        onPublish={() => setAction("publish")}
        onResolveBlocking={() => setAction("resolve-blocking")}
        onReviewWarnings={() => setAction("review-warnings")}
        onSaveDraft={() => setAction("save-draft")}
      />
    </SetupPage>
  );
}

export function SetupWelcomePage() {
  const [studioName, setStudioName] = useState("");
  const [, setAction] = useState("");

  return (
    <SetupPage
      agent={<SetupAgentChat onHumanHelp={() => setAction("human-help")} onQuickReply={(itemId) => setAction(`quick-reply:${itemId}`)} variant="welcome" />}
      avatarSrc={image79Avatar}
      layout="welcome"
      progress={0}
      status={null}
      step={1}
      studioName="Setup inicial"
    >
      <SetupWelcomeWorkspace onStart={() => setAction("start")} onStudioNameChange={setStudioName} studioName={studioName} />
    </SetupPage>
  );
}

export const Image51AOnboardingShellGlobal: Story = {
  name: "51A onboarding shell global",
  parameters: { sourceImage: "51A_round-4.1J_onboarding_shell-global-aprovado.png" },
  render: () => <SetupShellGlobalPage />
};

export const Image51BOnboardingAgenteConfiguracaoChat: Story = {
  name: "51B onboarding agente configuracao chat",
  parameters: { layout: "fullscreen", sourceImage: "51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png" },
  render: () => <SetupAgentChatPage />
};

export const Image51COnboardingWorkspaceConfiguracao: Story = {
  name: "51C onboarding workspace configuracao",
  parameters: { sourceImage: "51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png" },
  render: () => <SetupWorkspaceConfigPage />
};

export const Image51DOnboardingStudio: Story = {
  name: "51D onboarding bloco studio",
  parameters: { sourceImage: "51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png" },
  render: () => <SetupStudioPage />
};

export const Image51EOnboardingEquipe: Story = {
  name: "51E onboarding bloco equipe",
  parameters: { sourceImage: "51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png" },
  render: () => <SetupTeamPage />
};

export const Image51FOnboardingCanais: Story = {
  name: "51F onboarding bloco canais",
  parameters: { sourceImage: "51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png" },
  render: () => <SetupChannelsPage />
};

export const Image51GOnboardingPlanos: Story = {
  name: "51G onboarding bloco planos",
  parameters: { sourceImage: "51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png" },
  render: () => <SetupPlansPage />
};

export const Image51KOnboardingPagamento: Story = {
  name: "51K onboarding bloco pagamento",
  parameters: { sourceImage: "51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png" },
  render: () => <SetupPaymentPage />
};

export const Image51HOnboardingAlunos: Story = {
  name: "51H onboarding bloco alunos",
  parameters: { sourceImage: "51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png" },
  render: () => <SetupStudentsImportPage />
};

export const Image51IOnboardingTurmas: Story = {
  name: "51I onboarding bloco turmas",
  parameters: { sourceImage: "51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png" },
  render: () => <SetupClassesPage />
};

export const Image51JOnboardingAgenda: Story = {
  name: "51J onboarding bloco agenda",
  parameters: { sourceImage: "51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png" },
  render: () => <SetupAgendaPage />
};

export const Image51LOnboardingRevisao: Story = {
  name: "51L onboarding bloco revisao",
  parameters: { sourceImage: "51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png" },
  render: () => <SetupReviewPage />
};

export const Image78OnboardingBemVindo: Story = {
  name: "78 onboarding bem vindo setup guiado",
  parameters: { sourceImage: "78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png" },
  render: () => <SetupWelcomePage />
};
