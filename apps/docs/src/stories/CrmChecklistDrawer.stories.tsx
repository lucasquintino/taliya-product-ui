import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ChecklistDrawer } from "@taliya/crm";
import type { ChecklistDrawerStep } from "@taliya/crm";

const meta = {
  title: "CRM / Operational / ChecklistDrawer",
  parameters: {
    docs: {
      description: {
        component:
          "Drawer reutilizavel para execucao de checklists operacionais. Fonte principal: 24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png, crop tmp/visual-audit/batch11/checklists-24-source-diagnostic/image24-checklist-drawer-source.png."
      }
    },
    layout: "fullscreen"
  }
} satisfies Meta<typeof ChecklistDrawer>;

export default meta;

type Story = StoryObj<typeof ChecklistDrawer>;

const sourceSteps: ChecklistDrawerStep[] = [
  { id: "open-reception", title: "Abrir recepção", state: "done" },
  { id: "check-agenda", title: "Conferir agenda do dia", state: "done" },
  { id: "prepare-rooms", title: "Preparar salas", state: "done" },
  { id: "validate-teachers", title: "Validar professores confirmados", state: "warning", helperText: "1 professor ainda não confirmou" },
  { id: "payments", title: "Revisar pagamentos críticos", state: "pending" }
];

function InteractiveChecklistDrawer() {
  const [steps, setSteps] = useState(sourceSteps);
  const [event, setEvent] = useState("aguardando");
  const completedSteps = steps.filter((step) => step.state === "done").length;

  return (
    <div className="sb-crm-drawer-story">
      <ChecklistDrawer
        steps={steps}
        completedSteps={completedSteps}
        onClose={() => setEvent("fechado")}
        onContinue={() => setEvent("continuar")}
        onCreateTask={() => setEvent("criar-tarefa")}
        onComplete={() => {
          setEvent("concluir");
          setSteps((current) => current.map((step) => ({ ...step, state: "done" })));
        }}
        onOpenOrigin={() => setEvent("abrir-origem")}
        onStepToggle={(step, checked) => {
          setEvent(`passo-${step.id}`);
          setSteps((current) => current.map((item) => (item.id === step.id ? { ...item, state: checked ? "done" : "pending" } : item)));
        }}
      />
      <p className="sb-story-event" aria-live="polite">Última ação: {event}</p>
    </div>
  );
}

export const Source: Story = {
  render: () => <InteractiveChecklistDrawer />
};

export const States: Story = {
  render: () => (
    <div className="sb-crm-drawer-story sb-crm-drawer-story--states">
      <ChecklistDrawer state="loading" />
      <ChecklistDrawer state="blocked" />
      <ChecklistDrawer state="completed" completedSteps={5} />
      <ChecklistDrawer open={false} />
    </div>
  )
};
