import type { Meta } from "@storybook/react-vite";

import { PasswordInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof PasswordInput> = {
  title: "Primitives / UI / PasswordInput",
  component: PasswordInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--input" number="1" title="Password input">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Padrao">
              <PasswordInput aria-label="Senha" placeholder="Digite sua senha" />
            </SourceItem>
            <SourceItem label="Preenchido">
              <PasswordInput aria-label="Senha preenchida" defaultValue="taliya123" />
            </SourceItem>
            <SourceItem label="Erro">
              <PasswordInput aria-label="Senha com erro" defaultValue="123" error="Senha muito curta." />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <PasswordInput aria-label="Senha desabilitada" defaultValue="taliya123" disabled />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
