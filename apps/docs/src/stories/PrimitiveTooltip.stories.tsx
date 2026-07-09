import type { Meta } from "@storybook/react-vite";

import { IconButton, Tooltip } from "@taliya/ui";

import { batch5SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives / UI / Tooltip",
  component: Tooltip,
  parameters: { layout: "fullscreen", docs: { description: { component: batch5SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch5-tooltip" number="4" title="Tooltip">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="simples">
              <div className="sb-batch5-tooltip-anchor">
                <Tooltip defaultOpen label="Copiar">
                  <IconButton icon="copy" label="Copiar atendimento" />
                </Tooltip>
              </div>
            </SourceItem>
            <SourceItem label="com icone">
              <div className="sb-batch5-tooltip-anchor">
                <Tooltip defaultOpen icon="copy" label="Clique para copiar o link do atendimento #1048." variant="rich">
                  <IconButton icon="copy" label="Copiar link" />
                </Tooltip>
              </div>
            </SourceItem>
            <SourceItem label="ancorado em icone">
              <div className="sb-batch5-tooltip-anchor">
                <Tooltip defaultOpen label="Mais opcoes" variant="disabled">
                  <IconButton disabled icon="more" label="Mais opcoes" />
                </Tooltip>
              </div>
            </SourceItem>
            <SourceItem label="hidden/delayed">
              <div className="sb-batch5-tooltip-anchor">
                <Tooltip delayDuration={250} label="Aparece no foco ou hover">
                  <IconButton icon="help" label="Ajuda" />
                </Tooltip>
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
