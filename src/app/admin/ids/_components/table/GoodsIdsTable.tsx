"use client";

import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useGoodsIdsTable } from "~/app/stores/table-stores";
import { goodsIdsColumns } from "./columns";
// @ts-expect-error No types
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import { api } from "~/trpc/react";
import { type ReadManyIdsInput } from "~/utils/validation/ids/readManyIds";
import { GoodsIdsTableRowActions } from "./GoodsIdsTableRowActions";

export function GoodsIdsTable() {
  const {
    columnFilters,
    columnFilterFns,
    columnVisibility,
    density,
    globalFilter,
    showGlobalFilter,
    showColumnFilters,
    sorting,
    pagination,
    setColumnFilters,
    setColumnFilterFns,
    setColumnVisibility,
    setDensity,
    setGlobalFilter,
    setShowGlobalFilter,
    setShowColumnFilters,
    setSorting,
    setPagination,
  } = useGoodsIdsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.ids.readMany.useQuery({
      columnFilters,
      columnFilterFns: columnFilterFns as ReadManyIdsInput["columnFilterFns"],
      globalFilter,
      sorting,
      pagination,
    });

  const table = useMantineReactTable({
    columns: goodsIdsColumns,
    data: data?.items ?? [],
    enableColumnFilterModes: true,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: error?.message ?? "Ошибка загрузки данных",
        }
      : undefined,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <GoodsIdsTableRowActions id={row.original.id} />
    ),
    onColumnFiltersChange: setColumnFilters,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnVisibilityChange: setColumnVisibility,
    onDensityChange: setDensity,
    onGlobalFilterChange: setGlobalFilter,
    onShowColumnFiltersChange: setShowColumnFilters,
    onShowGlobalFilterChange: setShowGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      columnFilterFns,
      columnVisibility,
      density,
      globalFilter,
      showColumnFilters,
      showGlobalFilter,
      sorting,
      pagination,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
    enablePagination: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
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
