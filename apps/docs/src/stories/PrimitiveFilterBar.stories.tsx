import type { Meta } from "@storybook/react-vite";

import { Badge, Chip, FilterBar, FilterChip, SearchInput } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FilterBar> = {
  title: "Primitives / UI / FilterBar",
  component: FilterBar,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--search" number="9" title="Busca avancada">
          <div className="sb-source-advanced-search">
            <div className="sb-source-advanced-search__top">
              <SearchInput onFilter={() => undefined} placeholder="Buscar por cliente, assunto, ID..." />
              <Badge>128 resultados</Badge>
            </div>
            <FilterBar>
              <FilterChip removable> Status: Em andamento</FilterChip>
              <FilterChip removable> Prioridade: Alta</FilterChip>
              <FilterChip removable> Responsavel: San Frank</FilterChip>
            </FilterBar>
          </div>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="9B" title="Filtros reutilizaveis">
          <FilterBar>
            <SearchInput onFilter={() => undefined} placeholder="Buscar" resultCount="18" />
            <FilterChip selected>Status: Ativos</FilterChip>
            <FilterChip removable>Responsavel: Equipe</FilterChip>
            <FilterChip disabled>Categoria: Todas</FilterChip>
          </FilterBar>
          <FilterBar className="tl-filter-bar--dense">
            <FilterChip selected>Hoje</FilterChip>
            <FilterChip>Semana</FilterChip>
            <FilterChip>Mes</FilterChip>
            <Chip tone="info">128 resultados</Chip>
          </FilterBar>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
