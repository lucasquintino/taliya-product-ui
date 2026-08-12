/** Reusable CRM worklist table with explicit loading, empty, blocked, and sort states. */
import React from "react";
import {
  DataTable,
  EmptyState,
  InlineAlert,
  LoadingState,
  Panel,
  PanelHeader,
  TablePagination,
  cn
} from "@taliya/ui";
import type { DataTableColumn, DataTableSortState } from "@taliya/ui";

export type CrmWorklistTableState = "source" | "loading" | "empty" | "blocked";
export type CrmWorklistTableDensity = "default" | "compact";

export interface CrmWorklistTableColumn<T extends { id: string }> extends DataTableColumn<T> {
  sortValue?: (row: T) => string | number;
}

export interface CrmWorklistTablePagination {
  label: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  page?: number;
  pageCount?: number;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onPageChange?: (page: number) => void;
}

export interface CrmWorklistTableProps<T extends { id: string }> extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  actionColumnWidth?: React.CSSProperties["width"];
  ariaLabel: string;
  blockedDescription?: React.ReactNode;
  blockedTitle?: string;
  caption?: React.ReactNode;
  columns: Array<CrmWorklistTableColumn<T>>;
  emptyDescription?: string;
  emptyTitle?: string;
  density?: CrmWorklistTableDensity;
  heading?: React.ReactNode;
  headingAction?: React.ReactNode;
  headingDescription?: React.ReactNode;
  loadingTitle?: string;
  minTableWidth?: React.CSSProperties["minWidth"];
  onRowSelect?: (row: T) => void;
  onSelectionChange?: (rowId: string, selected: boolean) => void;
  pageSizeLabel?: string;
  pagination?: CrmWorklistTablePagination;
  rowActions?: (row: T) => React.ReactNode;
  rows: T[];
  selectable?: boolean;
  selectedRowIds?: string[];
  selectedRowId?: string;
  state?: CrmWorklistTableState;
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState | undefined) => void;
}

function crmWorklistTableSortValue<T extends { id: string }>(row: T, column: CrmWorklistTableColumn<T>) {
  if (column.sortValue) return String(column.sortValue(row));
  const value = row[column.key as keyof T];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

export function CrmWorklistTable<T extends { id: string }>({
  actionColumnWidth,
  ariaLabel,
  blockedDescription = "A lista esta indisponivel.",
  blockedTitle = "Lista bloqueada",
  caption,
  className,
  columns,
  density = "default",
  emptyDescription = "Os registros desta fila aparecem aqui.",
  emptyTitle = "Nenhum registro",
  heading,
  headingAction,
  headingDescription,
  loadingTitle = "Carregando lista",
  minTableWidth = "var(--taliya-control-table-min-width)",
  onRowSelect,
  onSelectionChange,
  pageSizeLabel,
  pagination,
  rowActions,
  rows,
  selectable,
  selectedRowIds,
  selectedRowId,
  sort,
  state = "source",
  onSortChange,
  ...props
}: CrmWorklistTableProps<T>) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [internalSort, setInternalSort] = React.useState<DataTableSortState | undefined>();
  const activeSort = sort ?? internalSort;
  const controlsDisabled = isLoading || isBlocked;
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!activeSort) return sourceRows;
    const sortedColumn = columns.find((column) => String(column.key) === activeSort.key);
    if (!sortedColumn) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = crmWorklistTableSortValue(first, sortedColumn);
      const secondValue = crmWorklistTableSortValue(second, sortedColumn);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return activeSort.direction === "ascending" ? result : result * -1;
    });
  }, [activeSort, columns, rows, state]);

  const handleSortChange = (nextSort: DataTableSortState) => {
    if (sort === undefined) setInternalSort(nextSort);
    onSortChange?.(nextSort);
  };

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn("tcrm-worklist-table", density !== "default" && `tcrm-worklist-table--${density}`, className)}
      data-component="CrmWorklistTable"
      data-density={density}
      data-state={state}
      {...props}
    >
      {heading ? <PanelHeader compact action={headingAction} description={headingDescription} title={heading} /> : null}
      {isLoading ? (
        <LoadingState title={loadingTitle} variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            actionColumnWidth={actionColumnWidth}
            className="tcrm-worklist-table__data"
            columns={columns}
            density="dense"
            minWidth={minTableWidth}
            selectable={selectable}
            onRowClick={(row) => {
              if (!controlsDisabled) onRowSelect?.(row);
            }}
            onRowSelect={controlsDisabled ? undefined : onSelectionChange}
            rows={tableRows}
            rowActions={rowActions}
            selectedRowIds={selectedRowIds}
            selectedRowId={selectedRowId}
            sort={activeSort}
            onSortChange={handleSortChange}
          />
          {caption ? <p className="tcrm-worklist-table__caption">{caption}</p> : null}
          {pagination ? (
            <TablePagination
              className="tcrm-worklist-table__pagination"
              itemsPerPageLabel={pageSizeLabel}
              itemsPerPageValue={pagination.itemsPerPage}
              label={String(pagination.label)}
              nextDisabled={controlsDisabled || pagination.nextDisabled}
              onItemsPerPageClick={pagination.onItemsPerPageClick}
              onNext={pagination.onNextPage}
              onPageChange={pagination.onPageChange}
              onPrevious={pagination.onPreviousPage}
              page={pagination.page ?? 1}
              pageCount={pagination.pageCount ?? 1}
              previousDisabled={controlsDisabled || pagination.previousDisabled}
            />
          ) : null}
        </>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
      {isBlocked ? <InlineAlert tone="warning" title={blockedTitle}>{blockedDescription}</InlineAlert> : null}
    </Panel>
  );
}
