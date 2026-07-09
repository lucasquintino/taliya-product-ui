import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { FilterBar, FilterSelect, SearchInput, type IconName } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const originOptions: Array<{ value: string; label: string; icon: IconName }> = [
  { value: "agenda", label: "Agenda", icon: "calendar" },
  { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
  { value: "financeiro", label: "Financeiro", icon: "wallet" },
  { value: "agente", label: "Agente", icon: "bot" }
];

const statusOptions: Array<{ value: string; label: string; icon: IconName }> = [
  { value: "novo", label: "Novo", icon: "plus" },
  { value: "bloqueado", label: "Bloqueado", icon: "lock" },
  { value: "resolvido", label: "Resolvido", icon: "checkCircle" }
];

const meta: Meta<typeof FilterSelect> = {
  title: "Primitives / UI / FilterSelect",
  component: FilterSelect,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${batch3SourceDescription} FilterSelect e o primitive oficial para filtros dropdown simples; Select permanece reservado para formularios.`
      }
    }
  }
};

export default meta;

export function AllStates() {
  const [origin, setOrigin] = useState("");

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch3-operational" number="10" title="FilterSelect / dropdown simples">
          <FilterBar>
            <SearchInput placeholder="Buscar pendencias..." />
            <FilterSelect label="Origem" onValueChange={setOrigin} options={originOptions} value={origin} />
            <FilterSelect defaultValue="bloqueado" label="Status" options={statusOptions} />
          </FilterBar>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--select" number="10B" title="Estados">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Vazio">
              <FilterSelect label="Origem" options={originOptions} />
            </SourceItem>
            <SourceItem label="Aberto">
              <FilterSelect defaultOpen defaultValue="agenda" label="Origem" options={originOptions} />
            </SourceItem>
            <SourceItem label="Selecionado">
              <FilterSelect defaultValue="financeiro" label="Origem" options={originOptions} />
            </SourceItem>
            <SourceItem label="Valor simples">
              <FilterSelect
                clearable={false}
                defaultValue="hoje"
                icon="calendar"
                label="Periodo"
                options={[
                  { value: "hoje", label: "Hoje" },
                  { value: "semana", label: "Esta semana" }
                ]}
                triggerDisplay="value"
              />
            </SourceItem>
            <SourceItem label="Loading">
              <FilterSelect label="Status" loading options={[]} />
            </SourceItem>
            <SourceItem label="Sem opcoes">
              <FilterSelect emptyText="Nenhum filtro encontrado." label="Tipo" options={[]} />
            </SourceItem>
            <SourceItem label="Disabled">
              <FilterSelect disabled label="Bloqueio" options={originOptions} />
            </SourceItem>
            <SourceItem label="Hover">
              <FilterSelect className="is-hover" label="Origem" options={originOptions} />
            </SourceItem>
            <SourceItem label="Focus">
              <FilterSelect className="is-focus-visible" defaultValue="financeiro" label="Origem" options={originOptions} />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
