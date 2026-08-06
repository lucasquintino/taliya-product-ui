import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { AttachmentList } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof AttachmentList> = {
  title: "Primitives / UI / AttachmentList",
  component: AttachmentList,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

const attachments = [
  { id: "contract", name: "contrato-assinado.pdf", meta: "PDF - 1.2 MB", state: "file" as const },
  { id: "link", name: "Comprovante no Drive", meta: "Link externo", state: "link" as const },
  { id: "error", name: "arquivo-corrompido.csv", meta: "Falha ao processar", state: "error" as const }
];

type Story = StoryObj<typeof meta>;

const onRemove = fn();

export const AllStates: Story = {
  render: () => (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-files" number="1" title="Attachment list">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Default">
              <AttachmentList items={attachments.slice(0, 2)} />
            </SourceItem>
            <SourceItem label="Removable">
              <AttachmentList items={attachments} onRemove={onRemove} removable />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Remover contrato-assinado.pdf" }));
    await expect(onRemove).toHaveBeenCalledWith(attachments[0]);
  }
};
