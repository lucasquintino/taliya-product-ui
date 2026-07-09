import type { Meta } from "@storybook/react-vite";

import { KeyValueRow, List, Stack } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof KeyValueRow> = {
  title: "Primitives / UI / KeyValueRow",
  component: KeyValueRow,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-list" number="2" title="Linha chave / valor">
          <Stack>
            <List dense>
              <KeyValueRow label="Status" value="Completo" valueTone="success" />
              <KeyValueRow label="Tracking" value="Ausente" valueTone="warning" />
              <KeyValueRow label="Runtime" value="Trace indisponivel" valueTone="danger" />
              <KeyValueRow disabled label="Permissao" value="Bloqueada" />
            </List>
          </Stack>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
