import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Checkbox } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives / UI / Checkbox",
  component: Checkbox,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--checkbox" number="4" title="Checkbox">
          <div className="sb-source-checkbox-source-list">
            <SourceItem label="Desmarcado">
              <Checkbox
                checked={unchecked}
                label="Selecionar item"
                onChange={(event) => setUnchecked(event.target.checked)}
              />
            </SourceItem>
            <SourceItem label="Marcado">
              <Checkbox
                checked={checked}
                helperText="Marcado"
                label="Selecionar item"
                onChange={(event) => setChecked(event.target.checked)}
              />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <Checkbox disabled helperText="Sem permissao" label="Selecionar item" />
            </SourceItem>
          </div>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="4B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Indeterminado">
              <Checkbox
                checked={indeterminate}
                helperText="Parcial"
                indeterminate
                label="Alguns itens"
                onChange={(event) => setIndeterminate(event.target.checked)}
              />
            </SourceItem>
            <SourceItem label="Foco">
              <Checkbox className="is-focus-visible" label="Selecionar item" />
            </SourceItem>
            <SourceItem label="Helper">
              <Checkbox helperText="Opcional" label="Selecionar item" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
