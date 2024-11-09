"use client";

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import type { TableStore } from "~/types/table-store";

type DataTableProps<TData extends MRT_RowData> = {
  tableStore: TableStore;
  columns: MRT_ColumnDef<TData>[];
  renderTopToolbarCustomActions: MRT_TableOptions<TData>["renderTopToolbarCustomActions"];
  renderRowActions: MRT_TableOptions<TData>["renderRowActions"];
  data:
    | {
        items: TData[];
        total: number;
        pageCount: number;
      }
    | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  errorMessage?: string;
  tableOptions?: Partial<MRT_TableOptions<TData>>;
};

export function DataTable<TData extends MRT_RowData>({
  tableStore,
  columns,
  renderTopToolbarCustomActions,
  renderRowActions,
  data,
  isLoading,
  isError,
  isFetching,
  errorMessage,
  tableOptions,
}: DataTableProps<TData>) {
  const {
    columnFilters,
    columnFilterFns,
    columnVisibility,
    columnOrder,
    columnPinning,
    columnSizing,
    columnSizingInfo,
    density,
    globalFilter,
    showGlobalFilter,
    showColumnFilters,
    sorting,
    pagination,
    setColumnFilterFns,
    setColumnFilters,
    setColumnVisibility,
    setColumnOrder,
    setColumnPinning,
    setColumnSizing,
    setColumnSizingInfo,
    setDensity,
    setShowColumnFilters,
    setShowGlobalFilter,
    setSorting,
    setGlobalFilter,
    setPagination,
  } = tableStore;

  const table = useMantineReactTable({
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: errorMessage ?? "Ошибка загрузки данных",
        }
      : undefined,
    state: {
      columnFilters,
      columnFilterFns,
      columnVisibility,
      columnOrder,
      columnPinning,
      columnSizing,
      columnSizingInfo,
      density,
      globalFilter,
      showGlobalFilter,
      showColumnFilters,
      sorting,
      pagination,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    onDensityChange: setDensity,
    onGlobalFilterChange: setGlobalFilter,
    onShowColumnFiltersChange: setShowColumnFilters,
    onShowGlobalFilterChange: setShowGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    renderTopToolbarCustomActions,
    renderRowActions,
    enableColumnFilterModes: true,
    enableRowVirtualization: true,
    enableColumnPinning: true,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    enableRowActions: true,
    enablePagination: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    positionActionsColumn: "last",
    layoutMode: "grid",
    rowCount: data?.total ?? 0,
    pageCount: data?.pageCount ?? 0,
    mantinePaginationProps: {
      rowsPerPageOptions: ["10", "20", "50", "100", "500"],
      withEdges: true,
      showRowsPerPage: true,
    },
    localization: MRT_Localization_RU,
    columns,
    data: data?.items ?? [],
    ...tableOptions,
  });

  return <MantineReactTable table={table} />;
}
