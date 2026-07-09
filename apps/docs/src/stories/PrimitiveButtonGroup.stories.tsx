import type { Meta } from "@storybook/react-vite";

import { Button, ButtonGroup } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ButtonGroup> = {
  title: "Primitives / UI / ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="start">
          <ButtonGroup aria-label="Acoes iniciais">
            <Button>Cancelar</Button>
            <Button variant="primary">Salvar</Button>
          </ButtonGroup>
        </PrimitiveState>
        <PrimitiveState label="end">
          <ButtonGroup align="end" aria-label="Acoes finais" style={{ width: "100%" }}>
            <Button>Cancelar</Button>
            <Button variant="primary">Salvar</Button>
          </ButtonGroup>
        </PrimitiveState>
        <PrimitiveState label="between">
          <ButtonGroup align="between" aria-label="Navegacao" style={{ width: "100%" }}>
            <Button leadingIcon="arrowLeft">Voltar</Button>
            <Button trailingIcon="arrowRight" variant="primary">Avancar</Button>
          </ButtonGroup>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}
