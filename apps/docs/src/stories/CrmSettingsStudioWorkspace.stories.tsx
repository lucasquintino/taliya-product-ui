import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import type { SettingsStudioField } from "@taliya/crm";
import { SettingsStudioWorkspace } from "@taliya/crm";

const meta = {
  title: "CRM / Config / SettingsStudioWorkspace",
  component: SettingsStudioWorkspace,
  parameters: {
    layout: "centered",
    docs: { description: { component: "Workspace pós-live de Studio, herdado da anatomia do setup inicial." } }
  }
} satisfies Meta<typeof SettingsStudioWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  render: function Render() {
    const initialDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
    const initialValues: Record<SettingsStudioField, string> = { studioName: "Studio Leticia", publicName: "Studio Leticia", mainUnit: "Unidade Centro", address: "Rua das Flores, 120", city: "Sao Paulo", state: "SP", postalCode: "01001-000" };
    const [activeDays, setActiveDays] = useState(initialDays);
    const [savedDays, setSavedDays] = useState(initialDays);
    const [values, setValues] = useState(initialValues);
    const [savedValues, setSavedValues] = useState(initialValues);
    const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
    return (
      <SettingsStudioWorkspace
        activeDays={activeDays}
        onActiveDaysChange={(days) => { setActiveDays(days); setSaveState("dirty"); }}
        onCancel={() => { setActiveDays(savedDays); setValues(savedValues); setSaveState("saved"); }}
        onFieldChange={(field, value) => { setValues((current) => ({ ...current, [field]: value })); setSaveState("dirty"); }}
        onSave={() => { setSavedDays(activeDays); setSavedValues(values); setSaveState("saved"); }}
        saveState={saveState}
        values={values}
      />
    );
  }
};
