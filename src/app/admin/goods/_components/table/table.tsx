"use client";

import { useGoodsTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { type ReadManyGoodsInput } from "~/utils/validation/goods/readManyGoods";
import { goodsColumns } from "./columns";
import { GoodsTableRowActions } from "./row-actions";
import { GoodsTableCustomActions } from "./custom-actions";

export function GoodsTable() {
  const tableStore = useGoodsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.goods.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyGoodsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
