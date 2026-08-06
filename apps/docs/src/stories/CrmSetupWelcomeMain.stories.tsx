import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { SetupWelcome, SetupWelcomeMain } from "@taliya/crm";

const meta = {
  title: "CRM / Setup / SetupWelcomeMain",
  component: SetupWelcomeMain,
  parameters: { layout: "fullscreen" }
} satisfies Meta<typeof SetupWelcomeMain>;

export default meta;

type Story = StoryObj<typeof meta>;

const startSetup = fn();

function InteractiveWelcome() {
  const [studioName, setStudioName] = useState("");

  return (
    <SetupWelcomeMain>
      <SetupWelcome
        onStart={startSetup}
        onStudioNameChange={setStudioName}
        studioName={studioName}
      />
    </SetupWelcomeMain>
  );
}

export const FirstVisit: Story = {
  render: () => <InteractiveWelcome />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Começar setup guiado" }));
    await expect(canvas.getByText("Informe o nome do studio para continuar.")).toBeVisible();
    await userEvent.type(canvas.getByRole("textbox", { name: "Nome do studio" }), "Studio Vila Mariana");
    await userEvent.click(canvas.getByRole("button", { name: "Começar setup guiado" }));
    await expect(startSetup).toHaveBeenCalledTimes(1);
  }
};

export const Returning: Story = {
  render: () => (
    <SetupWelcomeMain>
      <SetupWelcome state="returning" studioName="Studio Vila Mariana" />
    </SetupWelcomeMain>
  )
};
