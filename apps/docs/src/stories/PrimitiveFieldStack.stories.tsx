import type { Meta } from "@storybook/react-vite";

import { FieldStack, Input, Panel, Select, Textarea } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FieldStack> = {
  title: "Primitives / UI / FieldStack",
  component: FieldStack,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch3SourceDescription}\n\nFieldStack is the official primitive for stacking multiple field controls inside a single grid cell without story-only spacing CSS.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="small gap">
          <Panel compact>
            <FieldStack>
              <Select
                label="Tom/template da mensagem"
                defaultValue="acolhedor"
                options={[
                  { value: "acolhedor", label: "Acolhedor" },
                  { value: "direto", label: "Direto" }
                ]}
              />
              <Textarea
                defaultValue="Oi, {{nome}}. Vou registrar sua falta e verificar o melhor proximo passo."
                density="compact"
              />
            </FieldStack>
          </Panel>
        </PrimitiveState>

        <PrimitiveState label="medium gap">
          <Panel compact>
            <FieldStack gap="md">
              <Input label="Responsavel" defaultValue="Recepcao" />
              <Textarea label="Observacao" defaultValue="Chama a equipe quando a regra nao fechar." density="compact" />
            </FieldStack>
          </Panel>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
