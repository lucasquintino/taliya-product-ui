import type { Meta } from "@storybook/react-vite";

import { AuditTable } from "@taliya/ui";

import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof AuditTable> = {
  title: "Primitives / UI / AuditTable",
  component: AuditTable,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-audit" number="9" title="Log detalhado / auditoria">
          <AuditTable
            compact
            onOpenObject={() => undefined}
            rows={[
              { id: "log-1", actor: "Sam Frank", actorAvatarSrc: source13JoaoPedro, object: "#CS-1043", action: "Atualizou plano", time: "28/04/2024 10:24", origin: "Web", status: "success" },
              { id: "log-2", actor: "Nikki Olaw", actorAvatarSrc: source13NikkiOlaw, object: "#US-2087", action: "Alterou limite", time: "28/04/2024 09:18", origin: "API", status: "success" },
              { id: "log-3", actor: "Maria Lopes", actorAvatarSrc: source13NikkiOlaw, object: "#IN-3021", action: "Revisou fatura", time: "27/04/2024 16:41", origin: "Web", status: "success" },
              { id: "log-4", actor: "Joao Silva", actorAvatarSrc: source13JoaoPedro, object: "#CS-1039", action: "Aprovou desconto", time: "27/04/2024 14:12", origin: "Mobile", status: "success" },
              { id: "log-5", actor: "Carlos Lima", actorAvatarSrc: source13JoaoPedro, object: "#CS-1022", action: "Removeu usuario", time: "27/04/2024 11:02", origin: "Sistema", status: "alert" }
            ]}
          />
          <span className="sb-batch8-table-footer">
            <span>Ver auditoria completa</span>
            <span>{"->"}</span>
          </span>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
