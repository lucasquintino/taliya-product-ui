import type { Meta } from "@storybook/react-vite";

import { MoneyInput, Select } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof MoneyInput> = {
  title: "Primitives / UI / MoneyInput",
  component: MoneyInput,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--money" number="11" title="Input de valor / moeda">
          <SourceGrid className="sb-source-grid--5">
            <SourceItem label="Valor">
              <MoneyInput aria-label="Valor" defaultValue="320,00" fieldSize="sm" fieldState="success" />
            </SourceItem>
            <SourceItem label="Desconto">
              <MoneyInput aria-label="Desconto" defaultValue="32,00" fieldSize="sm" fieldState="success" />
            </SourceItem>
            <SourceItem label="Multa">
              <MoneyInput aria-label="Multa" defaultValue="9,60" fieldSize="sm" fieldState="success" />
            </SourceItem>
            <SourceItem label="Parcela">
              <Select
                aria-label="Parcela"
                defaultValue="3"
                fieldSize="sm"
                options={[
                  { value: "1", label: "1 / 12" },
                  { value: "2", label: "2 / 12" },
                  { value: "3", label: "3 / 12" }
                ]}
              />
            </SourceItem>
            <SourceItem label="Valor (erro)">
              <MoneyInput aria-label="Valor com erro" defaultValue="0,00" error="Valor deve ser maior que zero." fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="11B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Padrao">
              <MoneyInput aria-label="Padrao" fieldSize="sm" placeholder="0,00" />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <MoneyInput aria-label="Desabilitado" defaultValue="320,00" disabled fieldSize="sm" />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
