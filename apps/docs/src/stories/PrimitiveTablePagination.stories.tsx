import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { TablePagination } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof TablePagination> = {
  title: "Primitives / UI / TablePagination",
  component: TablePagination,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [page, setPage] = useState(1);

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-table" number="1" title="Paginacao de tabela">
          <TablePagination
            itemsPerPageValue={10}
            label="1-10 de 128"
            nextDisabled={page === 13}
            onNext={() => setPage((current) => Math.min(13, current + 1))}
            onPageChange={setPage}
            onPrevious={() => setPage((current) => Math.max(1, current - 1))}
            page={page}
            pageCount={13}
            previousDisabled={page === 1}
          />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
