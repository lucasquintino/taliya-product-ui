import type { Meta } from "@storybook/react-vite";

import { PermissionTable } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof PermissionTable> = {
  title: "Primitives / UI / PermissionTable",
  component: PermissionTable,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-permission" number="5" title="Permissoes e acesso">
          <PermissionTable
            compact
            onRequestAccess={() => undefined}
            rows={[
              { id: "contacts", module: "Contatos", profile: "Analista", action: "Editar", state: "allowed" },
              { id: "finance", module: "Financeiro", profile: "SDR", action: "Excluir", state: "blocked" },
              { id: "reports", module: "Relatorios", profile: "Gestor", action: "Visualizar", state: "request" },
              { id: "integrations", module: "Integracoes", profile: "Admin", action: "Configurar", state: "allowed" }
            ]}
          />
          <span className="sb-batch8-table-footer">
            <span>Ver todas as permissoes</span>
            <span>{"->"}</span>
          </span>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
