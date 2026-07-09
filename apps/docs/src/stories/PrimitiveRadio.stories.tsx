import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Radio } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Radio> = {
  title: "Primitives / UI / Radio",
  component: Radio,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [selected, setSelected] = useState("a");

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--checkbox" number="4R" title="Radio">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Desmarcado">
              <Radio checked={selected === "a"} label="Registro A" name="primitive-radio-source" onChange={() => setSelected("a")} />
            </SourceItem>
            <SourceItem label="Marcado">
              <Radio checked={selected === "b"} helperText="Sugerido" label="Registro B" name="primitive-radio-source" onChange={() => setSelected("b")} />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <Radio disabled helperText="Sem permissao" label="Registro bloqueado" name="primitive-radio-disabled" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="4R-B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Foco">
              <Radio className="is-focus-visible" label="Registro com foco" name="primitive-radio-focus" />
            </SourceItem>
            <SourceItem label="Helper">
              <Radio helperText="Usado em escolha exclusiva." label="Escolha principal" name="primitive-radio-helper" />
            </SourceItem>
            <SourceItem label="Selecionado sem helper">
              <Radio defaultChecked label="Principal" name="primitive-radio-checked" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
