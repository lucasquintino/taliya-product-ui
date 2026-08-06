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

export const DraftAndReview: Story = {
  args: {
    planStates: {
      weekly: { label: "Ativo", tone: "success", studentsUsing: 18 },
      pack: { label: "Revisar consumo", tone: "warning", studentsUsing: 7 },
      trial: { label: "Rascunho", tone: "info", studentsUsing: 0 }
    }
  }
};

export const PlanInUseCannotDelete: Story = {
  args: {
    planStates: {
      pack: { label: "Ativo", tone: "success", studentsUsing: 7 }
    },
    selectedPlanId: "pack"
  }
};

export const ValidationError: Story = {
  args: { validationError: "Valor e validade do plano precisam ser corrigidos." }
};

export const BlockedPermission: Story = {
  args: { blockedReason: "Seu papel pode consultar planos, mas nao pode altera-los.", onRequestAccess: () => undefined }
};

export const SystemError: Story = {
  args: { systemError: "O plano nao foi salvo. Tente novamente.", onRetry: () => undefined }
};
