import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "@taliya/ui";

import { PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta = {
  title: "Primitives / UI / Tabs"
} satisfies Meta;

export default meta;

type Story = StoryObj;

const tabItems = [
  { value: "resumo", label: "Resumo", content: <p>Resumo operacional</p> },
  { value: "agenda", label: "Agenda", content: <p>Agenda do aluno</p> },
  { value: "historico", label: "Historico", content: <p>Historico recente</p> }
];

export const AllStates: Story = {
  render: () => (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="default"><Tabs aria-label="Abas de exemplo" items={tabItems} /></PrimitiveState>
        <PrimitiveState label="selected"><Tabs aria-label="Abas de exemplo" defaultValue="agenda" items={tabItems} /></PrimitiveState>
        <PrimitiveState label="compact"><Tabs aria-label="Abas compactas" compact items={tabItems} /></PrimitiveState>
        <PrimitiveState label="disabled">
          <Tabs
            aria-label="Abas com item desabilitado"
            items={[
              { value: "resumo", label: "Resumo", content: <p>Resumo operacional</p> },
              { value: "agenda", label: "Agenda", content: <p>Agenda do aluno</p>, disabled: true },
              { value: "historico", label: "Historico", content: <p>Historico recente</p> }
            ]}
          />
        </PrimitiveState>
        <PrimitiveState label="external panel"><Tabs aria-label="Abas com painel externo" items={tabItems} showPanel={false} /></PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  )
};
