import type { Meta } from "@storybook/react-vite";

import { LoadingState } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof LoadingState> = {
  title: "Primitives / UI / LoadingState",
  component: LoadingState,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-state" number="8" title="Loading / skeleton">
          <div className="sb-batch4-loading-grid">
            <SourceItem label="Card skeleton">
              <LoadingState showTitle={false} title="Card skeleton" variant="skeleton" />
            </SourceItem>
            <SourceItem label="Tabela skeleton">
              <LoadingState className="sb-batch4-loading-table" showTitle={false} title="Tabela skeleton" variant="table" />
            </SourceItem>
            <SourceItem label="Painel skeleton">
              <LoadingState className="sb-batch4-loading-panel" showTitle={false} title="Painel skeleton" variant="panel" />
            </SourceItem>
            <SourceItem label="Spinner sutil">
              <LoadingState showTitle={false} title="Spinner sutil" variant="spinner" />
            </SourceItem>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
