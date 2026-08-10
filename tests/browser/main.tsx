import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CrmDrawer, CrmProductShell } from "@taliya/crm";
import { Button, DataTable, Input } from "@taliya/ui";
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";

function BrowserContractApp() {
  const [saved, setSaved] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tableState, setTableState] = useState<"ready" | "loading" | "error" | "empty">("ready");
  const [filter, setFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const rows = useMemo(
    () => [
      { id: "ana", name: "Ana Souza", status: "Ativo" },
      { id: "marina", name: "Marina Lopes", status: "Ativo" }
    ].filter((row) => row.name.toLowerCase().includes(filter.toLowerCase())),
    [filter]
  );

  return (
    <CrmProductShell
      title="Contrato de browser"
      drawer={drawerOpen ? <CrmDrawer aria-label="Detalhe do registro" closeLabel="Fechar drawer" onClose={() => setDrawerOpen(false)} title="Detalhe do registro">Conteúdo do drawer</CrmDrawer> : undefined}
      regions={{ browserChrome: false, sidebar: false, topbar: false, backButton: false, topNav: false, globalActions: false }}
    >
      <main data-testid="crm-composition">
        <h1>Contrato de browser</h1>
        <Input aria-label="Nome do studio" defaultValue="Taliya" />
        <Button onClick={() => setSaved(true)}>Salvar</Button>
        <Button disabled>Bloqueado</Button>
        <Button aria-label="Carregando" loading>Carregando</Button>
        <Button blockedReason="Permissão necessária">Sem permissão</Button>
        <Input aria-label="Campo com erro" error="Campo obrigatório" />
        <Input aria-label="Campo bloqueado" blockedReason="Sem permissão" />
        <section aria-label="Contratos CRM">
          <Input aria-label="Filtrar registros" value={filter} onChange={(event) => setFilter(event.target.value)} />
          <Button onClick={() => setDrawerOpen(true)}>Abrir drawer</Button>
          <Button onClick={() => setTableState("ready")}>Tabela pronta</Button>
          <Button onClick={() => setTableState("loading")}>Tabela carregando</Button>
          <Button onClick={() => setTableState("error")}>Tabela com erro</Button>
          <Button onClick={() => setTableState("empty")}>Tabela vazia</Button>
          <DataTable
            columns={[{ key: "name", label: "Nome", sortable: true }, { key: "status", label: "Status" }]}
            emptyState={<p>Nenhum registro encontrado</p>}
            error={tableState === "error" ? "Falha de carregamento" : undefined}
            loading={tableState === "loading"}
            onRowClick={(row) => setSelectedRow(row.name)}
            rows={tableState === "empty" ? [] : rows}
          />
          <output aria-live="polite" data-testid="selected-row">{selectedRow}</output>
        </section>
        <output aria-live="polite" data-testid="saved-state">{saved ? "Salvo" : "NÃ£o salvo"}</output>
      </main>
    </CrmProductShell>
  );
}

createRoot(document.getElementById("root")!).render(<BrowserContractApp />);
