import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { ComposerInput } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ComposerInput> = {
  title: "Primitives / UI / ComposerInput",
  component: ComposerInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

function ControlledComposer() {
  const [value, setValue] = useState("Confirmo sua visita para quinta-feira as 09h.");
  const [internal, setInternal] = useState(false);

  return (
    <ComposerInput
      internal={internal}
      onInternalChange={setInternal}
      onSend={() => setValue("")}
      onValueChange={setValue}
      value={value}
    />
  );
}

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-composer" number="4" title="ComposerInput">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Empty">
              <ComposerInput />
            </SourceItem>
            <SourceItem label="Typing / controlled">
              <ControlledComposer />
            </SourceItem>
            <SourceItem label="Internal">
              <ComposerInput defaultValue="Verificar disponibilidade antes de responder." internal />
            </SourceItem>
            <SourceItem label="Sending">
              <ComposerInput defaultValue="Mensagem de confirmacao." sending />
            </SourceItem>
            <SourceItem label="Disabled">
              <ComposerInput disabled placeholder="Atendimento pausado" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
