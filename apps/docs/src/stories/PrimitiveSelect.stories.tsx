import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Select } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const statusOptions = [
  { value: "vendas", label: "Vendas" },
  { value: "suporte", label: "Suporte" },
  { value: "financeiro", label: "Financeiro" },
  { value: "operacoes", label: "Operacoes" },
  { value: "marketing", label: "Marketing", disabled: true }
];

const meta: Meta<typeof Select> = {
  title: "Primitives / UI / Select",
  component: Select,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [value, setValue] = useState("suporte");

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--select" number="3" title="Select / dropdown">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Fechado">
              <Select aria-label="Fechado" options={statusOptions} placeholder="Selecione uma opcao" />
            </SourceItem>
            <SourceItem label="Aberto">
              <Select aria-label="Aberto" defaultOpen defaultValue="suporte" options={statusOptions} placeholder="Selecione uma opcao" />
            </SourceItem>
            <SourceItem label="Item selecionado">
              <Select aria-label="Item selecionado" options={statusOptions} value={value} onValueChange={setValue} />
            </SourceItem>
            <SourceItem label="Item desabilitado">
              <Select aria-label="Item desabilitado" defaultValue="marketing" disabled options={statusOptions} />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="3B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Erro">
              <Select aria-label="Erro" error="Selecione uma categoria." options={statusOptions} placeholder="Selecione uma opcao" />
            </SourceItem>
            <SourceItem label="Bloqueado">
              <Select aria-label="Bloqueado" blockedReason="Sem permissao." defaultValue="suporte" options={statusOptions} />
            </SourceItem>
            <SourceItem label="Compacto">
              <Select aria-label="Compacto" defaultValue="suporte" fieldSize="sm" options={statusOptions} />
            </SourceItem>
            <SourceItem label="Helper">
              <Select aria-label="Helper" helperText="Usado nos filtros e formularios." options={statusOptions} placeholder="Selecione uma opcao" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
