import type { Meta } from "@storybook/react-vite";

import { DiffTable } from "@taliya/ui";

import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof DiffTable> = {
  title: "Primitives / UI / DiffTable",
  component: DiffTable,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-diff" number="8" title="Diff antes / depois">
          <DiffTable
            actor="Sam Frank"
            actorAvatarSrc={source13JoaoPedro}
            actorLabel="Ator"
            compact
            onApprove={() => undefined}
            onRevert={() => undefined}
            origin="Origem API"
            rows={[
              { id: "plan", label: "Plano", before: "Profissional", after: "Enterprise", status: "changed" },
              { id: "status", label: "Status", before: "Ativo", after: "Ativo", status: "approved" },
              { id: "limit", label: "Limite de usuario", before: "10", after: "25", status: "added" },
              { id: "renewal", label: "Data de renovacao", before: "31/05/2024", after: "31/05/2025", status: "changed" },
              { id: "discount", label: "Desconto (%)", before: "10%", after: "15%", status: "changed" }
            ]}
          />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
