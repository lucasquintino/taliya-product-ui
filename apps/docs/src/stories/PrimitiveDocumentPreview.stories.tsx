import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { DocumentPreview } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DocumentPreview> = {
  title: "Primitives / UI / DocumentPreview",
  component: DocumentPreview,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [page, setPage] = useState("1");
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-document" number="8" title="Viewer de documento / contrato">
          <DocumentPreview
            client="Cliente: Ana Beatriz Souza"
            compact
            date="Data: 15/04/2024"
            history={[
              { id: "h1", label: "Assinado por Ana Beatriz", time: "16/04/2024 10:32" },
              { id: "h2", label: "Enviado para assinatura", time: "15/04/2024 09:15" }
            ]}
            onDownload={() => undefined}
            onPageSelect={setPage}
            onSend={() => undefined}
            pages={[{ id: "1", label: "1" }, { id: "2", label: "2" }]}
            selectedPageId={page}
            state="signed"
            title="Contrato de Prestacao de Servicos"
          />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
