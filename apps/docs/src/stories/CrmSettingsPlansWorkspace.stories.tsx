import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import type { SetupPlanField } from "@taliya/crm";
import { SettingsPlansWorkspace, setupPlansDefaultFieldValues } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsPlansWorkspace",
  component: SettingsPlansWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace pós-live de Planos e modelos com status, uso e inativação." } }
  }
} satisfies Meta<typeof SettingsPlansWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  render: function Render() {
    const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
    const [selectedPlanId, setSelectedPlanId] = useState<"weekly" | "pack" | "trial">("pack");
    const [fieldValues, setFieldValues] = useState<Record<SetupPlanField, string>>({ ...setupPlansDefaultFieldValues });
    const [savedFieldValues, setSavedFieldValues] = useState<Record<SetupPlanField, string>>({ ...setupPlansDefaultFieldValues });
    return (
      <SettingsPlansWorkspace
        fieldValues={fieldValues}
        onCancel={() => { setFieldValues({ ...savedFieldValues }); setSaveState("saved"); }}
        onFieldChange={(field, value) => { setFieldValues((current) => ({ ...current, [field]: value })); setSaveState("dirty"); }}
        onPlanAction={() => setSaveState("dirty")}
        onPlanSelect={setSelectedPlanId}
        onSave={() => { setSavedFieldValues({ ...fieldValues }); setSaveState("saved"); }}
        saveState={saveState}
        selectedPlanId={selectedPlanId}
      />
    );
  }
};
