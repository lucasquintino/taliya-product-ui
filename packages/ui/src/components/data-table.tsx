import React from "react";
import { cn, Icon } from "../foundation.js";
import { Checkbox } from "../primitives/forms.js";
import { IconButton } from "../primitives/button.js";
import { EmptyState, ErrorState, LoadingState } from "./state-list.js";
export interface DataTableColumn<T extends { id: string }> {
  key: keyof T | string;
  header: React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: React.CSSProperties["width"];
  render?: (row: T) => React.ReactNode;
}

export type DataTableSortDirection = "ascending" | "descending";

export interface DataTableSortState {
  key: string;
  direction: DataTableSortDirection;
}

export interface DataTableProps<T extends { id: string }> {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  emptyState?: React.ReactNode;
  loading?: boolean;
  minWidth?: React.CSSProperties["minWidth"];
  error?: React.ReactNode;
  density?: "default" | "dense";
  compact?: boolean;
  selectable?: boolean;
  selectedRowIds?: string[];
  selectedRowId?: string;
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState) => void;
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  actionColumnWidth?: React.CSSProperties["width"];
  pagination?: React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyState,
  loading = false,
  minWidth,
  error,
  density = "default",
  compact = false,
  selectable = false,
  selectedRowIds = [],
  selectedRowId,
  sort,
  onSortChange,
  onRowSelect,
  onRowClick,
  rowActions,
  actionColumnWidth,
  pagination,
  className
}: DataTableProps<T>) {
  const handleSortChange = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;

    const key = String(column.key);
    const direction: DataTableSortDirection =
      sort?.key === key && sort.direction === "ascending" ? "descending" : "ascending";
    onSortChange?.({ key, direction });
  };

  if (error) {
    return <ErrorState title="Nao foi possivel carregar a tabela" description={error} />;
  }

  if (loading) {
    return <LoadingState title="Carregando tabela" variant="skeleton" />;
  }

  if (rows.length === 0) {
    return <>{emptyState ?? <EmptyState title="Nenhum registro encontrado" />}</>;
  }

  return (
    <div className={cn("tl-table-wrap", compact && "tl-table-wrap--compact", className)}>
      <table className={cn("tl-table", density === "dense" && "tl-table--dense", compact && "tl-table--compact")} style={minWidth ? { minWidth } : undefined}>
        <colgroup>
          {selectable ? <col className="tl-table__select-column" /> : null}
          {columns.map((column) => (
            <col key={String(column.key)} style={column.width ? { width: column.width } : undefined} />
          ))}
          {rowActions ? <col className="tl-table__action-column" style={{ width: actionColumnWidth ?? "var(--taliya-control-table-action-column-width)" }} /> : null}
        </colgroup>
        <thead>
          <tr>
            {selectable ? (
              <th className="tl-table__select-cell" scope="col">
                <span className="tl-table__sr-only">Selecionar</span>
              </th>
            ) : null}
            {columns.map((column) => {
              const columnKey = String(column.key);
              const isSorted = sort?.key === columnKey;
              const ariaSort = isSorted ? sort.direction : undefined;
              const sortIconName = isSorted ? (sort.direction === "ascending" ? "sortAsc" : "sortDesc") : "sort";

              return (
              <th
                aria-sort={ariaSort}
                className={cn(
                  column.align && `tl-table__cell--${column.align}`,
                  column.sortable && "tl-table__header-cell--sortable"
                )}
                key={columnKey}
                scope="col"
              >
                {column.sortable ? (
                  <button
                    aria-label={`Ordenar por ${typeof column.header === "string" ? column.header : columnKey}`}
                    className="tl-table__header-action"
                    onClick={() => handleSortChange(column)}
                    type="button"
                  >
                    <span className="tl-table__header-label">{column.header}</span>
                    <Icon
                      className={cn("tl-table__sort-icon", isSorted && "tl-table__sort-icon--active")}
                      name={sortIconName}
                      size={14}
                    />
                  </button>
                ) : (
                  <span className="tl-table__header-label">{column.header}</span>
                )}
              </th>
              );
            })}
            {rowActions ? (
              <th className="tl-table__action-cell" scope="col">
                <span className="tl-table__sr-only">Acoes</span>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className={cn(
                (row.id === selectedRowId || selectedRowIds.includes(row.id)) && "tl-table__row--selected",
                onRowClick && "tl-table__row--interactive"
              )}
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {selectable ? (
                <td className="tl-table__select-cell" onClick={(event) => event.stopPropagation()}>
                  <Checkbox
                    aria-label={`Selecionar linha ${row.id}`}
                    checked={selectedRowIds.includes(row.id)}
                    onChange={(event) => onRowSelect?.(row.id, event.target.checked)}
                  />
                </td>
              ) : null}
              {columns.map((column) => (
                <td className={column.align ? `tl-table__cell--${column.align}` : undefined} key={`${row.id}-${String(column.key)}`}>
                  {column.render ? column.render(row) : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
              {rowActions ? (
                <td className="tl-table__action-cell" onClick={(event) => event.stopPropagation()}>
                  {rowActions(row)}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination ? <div className="tl-table__pagination-slot">{pagination}</div> : null}
    </div>
  );
}

export interface TablePaginationProps {
  label: string;
  itemsPerPageLabel?: string;
  itemsPerPageValue?: React.ReactNode;
  onItemsPerPageClick?: () => void;
  itemsPerPageButtonLabel?: string;
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export function TablePagination({
  label,
  itemsPerPageLabel = "Itens por pagina:",
  itemsPerPageValue,
  onItemsPerPageClick,
  itemsPerPageButtonLabel = "Alterar itens por pagina",
  page,
  pageCount,
  onPageChange,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  className
}: TablePaginationProps) {
  const pages = page && pageCount ? Array.from({ length: Math.min(pageCount, 5) }, (_, index) => index + 1) : [];

  return (
    <div className={cn("tl-table-pagination", className)}>
      {itemsPerPageValue !== undefined ? (
        <div className="tl-table-pagination__page-size">
          <span>{itemsPerPageLabel}</span>
          <button aria-label={itemsPerPageButtonLabel} onClick={onItemsPerPageClick} type="button">
            {itemsPerPageValue}
            <Icon name="chevronDown" size={14} />
          </button>
        </div>
      ) : null}
      <div className="tl-table-pagination__controls">
        <span className="tl-table-pagination__status">{label}</span>
        <div className="tl-table-pagination__nav" aria-label="Paginação">
          <IconButton disabled={previousDisabled} icon="chevronLeft" label="Pagina anterior" onClick={onPrevious} size="sm" />
          {pages.map((pageNumber) => (
            <button
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn("tl-table-pagination__page", pageNumber === page && "tl-table-pagination__page--active")}
              key={pageNumber}
              onClick={() => onPageChange?.(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          ))}
          {pageCount && pageCount > 5 ? <span className="tl-table-pagination__ellipsis">...</span> : null}
          {pageCount && pageCount > 5 ? (
            <button className="tl-table-pagination__page" onClick={() => onPageChange?.(pageCount)} type="button">
              {pageCount}
            </button>
          ) : null}
          <IconButton disabled={nextDisabled} icon="chevronRight" label="Proxima pagina" onClick={onNext} size="sm" />
        </div>
      </div>
    </div>
  );
}
