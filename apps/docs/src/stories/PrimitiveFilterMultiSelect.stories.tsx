import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { FilterBar, FilterMultiSelect, SearchInput, type IconName } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const ownerOptions: Array<{ value: string; label: string; icon: IconName }> = [
  { value: "recepcao", label: "Recepcao", icon: "users" },
  { value: "mariana", label: "Mariana", icon: "user" },
  { value: "lucas", label: "Lucas", icon: "user" },
  { value: "sem-dono", label: "Sem dono", icon: "user" }
];

const statusOptions: Array<{ value: string; label: string; icon: IconName }> = [
  { value: "alta", label: "Alta", icon: "alert" },
  { value: "media", label: "Media", icon: "clock" },
  { value: "baixa", label: "Baixa", icon: "minus" },
  { value: "bloqueado", label: "Bloqueado", icon: "lock" }
];

const meta: Meta<typeof FilterMultiSelect> = {
  title: "Primitives / UI / FilterMultiSelect",
  component: FilterMultiSelect,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch3SourceDescription} FilterMultiSelect e o primitive oficial para filtros dropdown com selecao multipla.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  const [owners, setOwners] = useState(["recepcao", "mariana"]);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch3-operational" number="10M" title="FilterMultiSelect / dropdown multiplo">
          <FilterBar>
            <SearchInput placeholder="Buscar pendencias..." />
            <FilterMultiSelect label="Dono" onValueChange={setOwners} options={ownerOptions} value={owners} />
            <FilterMultiSelect defaultValue={["alta", "bloqueado"]} label="Status" options={statusOptions} />
          </FilterBar>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--select" number="10N" title="Estados">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Vazio">
              <FilterMultiSelect label="Dono" options={ownerOptions} />
            </SourceItem>
            <SourceItem label="Aberto">
              <FilterMultiSelect defaultOpen defaultValue={["recepcao", "sem-dono"]} label="Dono" options={ownerOptions} />
            </SourceItem>
            <SourceItem label="Multiplo">
              <FilterMultiSelect defaultValue={["alta", "media"]} label="Status" options={statusOptions} />
            </SourceItem>
            <SourceItem label="Loading">
              <FilterMultiSelect label="Status" loading options={[]} />
            </SourceItem>
            <SourceItem label="Sem opcoes">
              <FilterMultiSelect emptyText="Nenhum filtro encontrado." label="Tipo" options={[]} />
            </SourceItem>
            <SourceItem label="Disabled">
              <FilterMultiSelect disabled label="Bloqueio" options={ownerOptions} />
            </SourceItem>
            <SourceItem label="Hover">
              <FilterMultiSelect className="is-hover" label="Dono" options={ownerOptions} />
            </SourceItem>
            <SourceItem label="Focus">
              <FilterMultiSelect className="is-focus-visible" defaultValue={["lucas"]} label="Dono" options={ownerOptions} />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
