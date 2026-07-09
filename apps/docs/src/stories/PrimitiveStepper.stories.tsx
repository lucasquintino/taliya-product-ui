import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Stepper } from "@taliya/ui";
import type { StepperStep } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Stepper> = {
  title: "Primitives / UI / Stepper",
  component: Stepper,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

const setupSteps: StepperStep[] = [
  { id: "fonte", label: "Fonte de dados", description: "Concluido", state: "complete" },
  { id: "importacao", label: "Importacao", description: "Concluido", state: "complete" },
  { id: "mapeamento", label: "Mapeamento", description: "Em andamento", state: "current" },
  { id: "duplicidades", label: "Duplicidades", description: "Bloqueado", state: "blocked" },
  { id: "ativacao", label: "Ativacao", description: "Pendente", state: "pending" }
];

export function AllStates() {
  const [current, setCurrent] = useState("mapeamento");
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-stepper" number="1" title="Wizard / stepper de setup">
          <Stepper compact currentStepId={current} onStepSelect={setCurrent} progress={60} steps={setupSteps} />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="1b" title="Compacto e estados">
          <Stepper
            compact
            steps={[
              { id: "ok", label: "Recebido", description: "Concluido", state: "complete" },
              { id: "run", label: "Validando", description: "Atenção", state: "warning" },
              { id: "wait", label: "Liberacao", description: "Pendente", state: "pending" }
            ]}
          />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="1c" title="Setup shell numerado">
          <Stepper
            currentStepId="dados"
            markerStyle="number"
            orientation="vertical"
            steps={[
              { id: "diagnostico", label: "Diagnostico", description: "Concluido", state: "complete" },
              { id: "dados", label: "Dados", description: "Em andamento", state: "current" },
              { id: "agenda", label: "Agenda", description: "Pendente", state: "pending" },
              { id: "planos", label: "Planos", description: "Pendente", state: "pending" }
            ]}
          />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
