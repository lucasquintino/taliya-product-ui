import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { SegmentedControl } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof SegmentedControl> = {
  title: "Primitives / UI / SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [value, setValue] = useState("abertos");
  const [shellValue, setShellValue] = useState("hoje");

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--segmented" number="6" title="Controle segmentado">
          <SegmentedControl
            label="Status"
            onChange={setValue}
            options={[
              { value: "todos", label: "Todos" },
              { value: "abertos", label: "Abertos" },
              { value: "concluidos", label: "Concluidos" }
            ]}
            value={value}
          />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch3-operational" number="6B" title="Estados operacionais">
          <SourceGrid className="sb-source-grid--2">
            <SourceItem label="Shell navigation">
              <SegmentedControl
                label="Seções"
                onChange={setShellValue}
                options={[
                  { value: "hoje", label: "Hoje", current: shellValue === "hoje" ? "page" : undefined },
                  { value: "tarefas", label: "Tarefas", current: shellValue === "tarefas" ? "page" : undefined },
                  { value: "aprovacoes", label: "Aprovações", current: shellValue === "aprovacoes" ? "page" : undefined },
                  { value: "alertas", label: "Alertas", current: shellValue === "alertas" ? "page" : undefined }
                ]}
                value={shellValue}
                variant="shell"
              />
            </SourceItem>
            <SourceItem label="Compacto">
              <SegmentedControl
                compact
                label="Periodo"
                onChange={setValue}
                options={[
                  { value: "dia", label: "Dia" },
                  { value: "semana", label: "Semana" },
                  { value: "mes", label: "Mes" }
                ]}
                value="semana"
              />
            </SourceItem>
            <SourceItem label="Desabilitado">
              <SegmentedControl
                label="Status desabilitado"
                options={[
                  { value: "todos", label: "Todos" },
                  { value: "abertos", label: "Abertos" },
                  { value: "bloqueado", label: "Bloqueado", disabled: true }
                ]}
                value="abertos"
              />
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
