import { CrmRecordDrawer, PageFilterBar, PageQuickFilters, WorkListDetailPage } from "@taliya/crm";
import { DataTable } from "@taliya/ui";

export function WorkListPage() {
  return (
    <WorkListDetailPage
      detail={<CrmRecordDrawer open={false} title="Registro" onOpenChange={() => undefined} />}
      detailState="closed"
      filterBar={<PageFilterBar searchPlaceholder="Buscar..." />}
      quickFilters={<PageQuickFilters title="Filtros" items={[]} />}
    >
      <DataTable columns={[]} rows={[]} getRowId={(_, index) => String(index)} />
    </WorkListDetailPage>
  );
}
