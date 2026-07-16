import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SettingsChannelsWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsChannelsWorkspace",
  component: SettingsChannelsWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace pós-live de Canais com status técnico contextual e ações de conexão." } }
  }
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
