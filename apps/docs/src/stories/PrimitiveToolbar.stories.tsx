import type { Meta } from "@storybook/react-vite";

import { Button, Chip, IconButton, Toolbar } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Toolbar> = {
  title: "Primitives / UI / Toolbar",
  component: Toolbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch4SourceDescription}\n\nToolbar is the official horizontal layout primitive for page, panel, drawer, and table action bars.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <PrimitiveState label="status bar">
          <Toolbar wrap>
            <Chip showDot={false} tone="warning">Automacao mock/no-cost</Chip>
            <Chip showDot={false} tone="success">Operador pode atuar</Chip>
          </Toolbar>
        </PrimitiveState>

        <PrimitiveState label="actions end">
          <Toolbar justify="end" wrap>
            <Button size="sm" variant="secondary">Cancelar</Button>
            <Button size="sm">Salvar</Button>
          </Toolbar>
        </PrimitiveState>

        <PrimitiveState label="icon actions">
          <Toolbar justify="start" wrap>
            <IconButton icon="filter" label="Filtros" size="sm" />
            <IconButton icon="download" label="Exportar" size="sm" />
            <IconButton icon="more" label="Mais opcoes" size="sm" variant="ghost" />
          </Toolbar>
        </PrimitiveState>
      </main>
    </PrimitivePage>
  );
}
