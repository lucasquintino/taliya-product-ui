import type { Meta } from "@storybook/react-vite";

import { FileUpload } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FileUpload> = {
  title: "Primitives / UI / FileUpload",
  component: FileUpload,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-files" number="1" title="File upload">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Idle">
              <FileUpload />
            </SourceItem>
            <SourceItem label="Dragging">
              <FileUpload state="dragging" title="Solte o arquivo" description="CSV de alunos detectado." />
            </SourceItem>
            <SourceItem label="Uploading">
              <FileUpload state="uploading" title="Enviando arquivo" description="Processando planilha..." actionLabel="Aguarde" />
            </SourceItem>
            <SourceItem label="Complete">
              <FileUpload state="complete" title="Arquivo recebido" description="280 linhas prontas para importar." actionLabel="Revisar" />
            </SourceItem>
            <SourceItem label="Error">
              <FileUpload state="error" title="Falha no arquivo" description="Formato invalido ou corrompido." actionLabel="Trocar" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
