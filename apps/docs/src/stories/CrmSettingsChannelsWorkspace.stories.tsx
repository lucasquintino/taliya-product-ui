import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SettingsChannelsWorkspace } from "@taliya/crm";

import { playFirstInteractiveControl } from "./story-play";
const meta = {
  title: "CRM / Config / SettingsChannelsWorkspace",
  component: SettingsChannelsWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace pós-live de Canais com status técnico contextual e ações de conexão." } }
  },
  play: playFirstInteractiveControl
} satisfies Meta<typeof SettingsChannelsWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  render: function Render() {
    const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
    const [whatsAppState, setWhatsAppState] = useState<"business" | "personal" | "unknown" | "missing">("business");
    return (
      <SettingsChannelsWorkspace
        connectionStatus="connected"
        onCancel={() => setSaveState("saved")}
        onSave={() => setSaveState("saved")}
        onWhatsAppStateChange={(state) => { setWhatsAppState(state); setSaveState("dirty"); }}
        saveState={saveState}
        whatsAppState={whatsAppState}
      />
    );
  }
};

export const PendingConnection: Story = {
  args: { connectionStatus: "pending" }
};

export const Disconnected: Story = {
  args: { connectionStatus: "disconnected" }
};

export const Saving: Story = {
  args: { connectionStatus: "connected", saveState: "saving" }
};

export const ValidationError: Story = {
  args: { validationError: "Revise o e-mail e a URL informados antes de salvar." }
};

export const BlockedPermission: Story = {
  args: { blockedReason: "Seu papel pode consultar os canais, mas nao pode altera-los.", onRequestAccess: () => undefined }
};

export const SystemError: Story = {
  args: { systemError: "A configuracao dos canais nao foi salva.", onRetry: () => undefined }
};
