"use client";

import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { type ReadManyMediaInput } from "~/utils/validation/media/readManyMedia";
import { goodsMediaColumns } from "./columns";
import { GoodsMediaTableRowActions } from "./row-actions";
import { GoodsMediaTableCustomActions } from "./custom-actions";
import { useGoodsMediaTable } from "~/app/stores/table-stores";

export function GoodsMediaTable() {
  const tableStore = useGoodsMediaTable();

  const { data, isLoading, error, isError, isFetching } =
    api.media.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyMediaInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsMediaColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsMediaTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsMediaTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
