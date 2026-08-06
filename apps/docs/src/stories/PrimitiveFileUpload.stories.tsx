import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FileUpload } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FileUpload> = {
  title: "Primitives / UI / FileUpload",
  component: FileUpload,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

type Story = StoryObj<typeof meta>;

const onAction = fn();

export const AllStates: Story = {
  render: () => (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-files" number="1" title="File upload">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Idle">
              <FileUpload onAction={onAction} />
            </SourceItem>
            <SourceItem label="Dragging">
              <FileUpload onAction={onAction} state="dragging" title="Solte o arquivo" description="CSV de alunos detectado." />
            </SourceItem>
            <SourceItem label="Uploading">
              <FileUpload actionDisabled onAction={onAction} state="uploading" title="Enviando arquivo" description="Processando planilha..." actionLabel="Aguarde" />
            </SourceItem>
            <SourceItem label="Complete">
              <FileUpload onAction={onAction} state="complete" title="Arquivo recebido" description="280 linhas prontas para importar." actionLabel="Revisar" />
            </SourceItem>
            <SourceItem label="Error">
              <FileUpload onAction={onAction} state="error" title="Falha no arquivo" description="Formato invalido ou corrompido." actionLabel="Trocar" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Selecionar" }));
    await expect(onAction).toHaveBeenCalled();
  }
};
