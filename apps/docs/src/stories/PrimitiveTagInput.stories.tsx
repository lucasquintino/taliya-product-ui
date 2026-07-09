import type { Meta } from "@storybook/react-vite";

import { Panel, TagInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof TagInput> = {
  title: "Primitives / UI / TagInput",
  component: TagInput,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch3SourceDescription}\n\nTagInput is the official compact field primitive for showing selected owners, labels, recipients, and other removable token values inside form grids.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="selected values">
          <Panel compact>
            <TagInput
              helperText="Quem recebe o caso quando a Taliya nao pode seguir."
              items={["Recepcao", "Coordenadora", "Dono/admin"]}
              label="Responsaveis por excecao"
              removable
            />
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="empty">
          <Panel compact>
            <TagInput
              helperText="Adicione pelo menos um responsavel."
              items={[]}
              label="Responsaveis"
              placeholder="Nenhum responsavel definido"
            />
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="error">
          <Panel compact>
            <TagInput
              error="Defina uma pessoa ou fila para receber excecoes."
              items={[]}
              label="Fila de excecao"
              placeholder="Sem destino"
            />
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
