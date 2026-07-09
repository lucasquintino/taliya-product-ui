import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { SearchInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof SearchInput> = {
  title: "Primitives / UI / SearchInput",
  component: SearchInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [query, setQuery] = useState("reposicao");

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--search" number="9" title="Busca avancada">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Campo de busca">
              <SearchInput placeholder="Buscar por cliente, assunto, ID..." />
            </SourceItem>
            <SourceItem label="Com filtro e contador">
              <SearchInput onFilter={() => undefined} placeholder="Buscar por cliente, assunto, ID..." resultCount="128" value={query} onChange={(event) => setQuery(event.target.value)} onClear={() => setQuery("")} />
            </SourceItem>
            <SourceItem label="Filtro embutido">
              <SearchInput filterPlacement="embedded" onFilter={() => undefined} placeholder="Buscar tarefas..." />
            </SourceItem>
            <SourceItem label="Carregando">
              <SearchInput loading placeholder="Carregando resultados" />
            </SourceItem>
            <SourceItem label="Erro">
              <SearchInput error="Busca obrigatoria para aplicar filtros" placeholder="Digite um termo" />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <SearchInput disabled placeholder="Buscar por cliente, assunto, ID..." />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
