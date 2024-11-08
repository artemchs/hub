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
}: DataTableProps<TData>) {
  const { actions, state } = tableStore;

  const table = useMantineReactTable({
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: errorMessage ?? "Ошибка загрузки данных",
        }
      : undefined,
    columns,
    data: data?.items ?? [],
    state: {
      ...state,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
    onColumnFiltersChange: actions.setColumnFilters,
    onColumnFilterFnsChange: actions.setColumnFilterFns,
    onColumnVisibilityChange: actions.setColumnVisibility,
    onDensityChange: actions.setDensity,
    onGlobalFilterChange: actions.setGlobalFilter,
    onShowColumnFiltersChange: actions.setShowColumnFilters,
    onShowGlobalFilterChange: actions.setShowGlobalFilter,
    onSortingChange: actions.setSorting,
    onPaginationChange: actions.setPagination,
    renderTopToolbarCustomActions,
    renderRowActions,
    enableColumnFilterModes: true,
    enableRowActions: true,
    enablePagination: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    positionActionsColumn: "last",
    rowCount: data?.total ?? 0,
    pageCount: data?.pageCount ?? 0,
    mantinePaginationProps: {
      rowsPerPageOptions: ["10", "20", "50", "100", "500"],
      withEdges: true,
      showRowsPerPage: true,
    },
    localization: MRT_Localization_RU,
  });

  return <MantineReactTable table={table} />;
}
