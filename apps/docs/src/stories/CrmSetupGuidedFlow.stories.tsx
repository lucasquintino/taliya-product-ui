import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";

import {
  defaultSetupSteps,
  SetupAgendaWorkspace,
  SetupAgentChat,
  SetupChannelsWorkspace,
  SetupClassesWorkspace,
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

const meta = {
  title: "CRM / Setup / Guided flow",
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const setupStepIds = defaultSetupSteps.map((label) =>
  label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")
);

function SetupGuidedFlow() {
  const [studioName, setStudioName] = useState("");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(true);
  const [published, setPublished] = useState(false);

  const continueSetup = (action: string) => {
    if (action === "continue") setStep((current) => Math.min(current + 1, defaultSetupSteps.length));
  };

  const selectStep = (stepId: string) => {
    const selectedIndex = setupStepIds.indexOf(stepId);
    if (selectedIndex >= 0) setStep(selectedIndex + 1);
  };

  if (!started) {
    return (
      <SetupPage
        agent={<SetupAgentChat variant="welcome" />}
        avatarSrc={image79Avatar}
        layout="welcome"
        progress={0}
        status={null}
        step={1}
        studioName="Setup inicial"
      >
        <SetupWelcomeWorkspace
          onStart={() => setStarted(true)}
          onStudioNameChange={setStudioName}
          studioName={studioName}
        />
      </SetupPage>
    );
  }

  const workspace = (() => {
    switch (step) {
      case 1:
        return <SetupStudioWorkspace onAction={continueSetup} />;
      case 2:
        return <SetupTeamWorkspace onAction={continueSetup} />;
      case 3:
        return <SetupChannelsWorkspace onAction={continueSetup} />;
      case 4:
        return <SetupPlansWorkspace onAction={continueSetup} />;
      case 5:
        return <SetupPaymentWorkspace onAction={continueSetup} />;
      case 6:
        return <SetupStudentsWorkspace onAction={continueSetup} />;
      case 7:
        return <SetupClassesWorkspace onAction={continueSetup} />;
      case 8:
        return <SetupAgendaWorkspace onAction={continueSetup} onBackToClasses={() => setStep(7)} />;
      default:
        return (
          <SetupReviewWorkspace
            confirmed={confirmed}
            onBack={() => setStep(8)}
            onConfirmChange={setConfirmed}
            onPublish={() => setPublished(true)}
            state={published ? "published" : "ready"}
          />
        );
    }
  })();

  return (
    <SetupPage
      agent={<SetupAgentChat />}
      avatarSrc={image79Avatar}
      onStepSelect={selectStep}
      progress={Math.round((step / defaultSetupSteps.length) * 100)}
      step={step}
      steps={defaultSetupSteps}
      studioName={studioName}
    >
      {workspace}
    </SetupPage>
  );
}

export const CompleteJourney: Story = {
  render: () => <SetupGuidedFlow />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startButton = canvas.getByRole("button", { name: "Começar setup guiado" });

    await userEvent.click(startButton);
    await expect(canvas.getByText("Informe o nome do studio para continuar.")).toBeInTheDocument();

    await userEvent.type(canvas.getByRole("textbox", { name: "Nome do studio" }), "Studio Aurora");
    await userEvent.click(startButton);
    await expect(canvas.getByRole("heading", { name: "Studio" })).toBeInTheDocument();

    for (const heading of ["Equipe", "Canais", "Planos", "Pagamento", "Alunos", "Turmas", "Agenda", "Revisão"]) {
      await userEvent.click(canvas.getAllByRole("button", { name: "Continuar" })[0]!);
      await expect(canvas.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    await userEvent.click(canvas.getByRole("button", { name: "Publicar setup inicial" }));
    await expect(canvas.getByRole("button", { name: "Setup publicado" })).toBeDisabled();
  }
};
