"use client";

import { useGoodsIdsTable } from "~/app/stores/table-stores";
import { goodsIdsColumns } from "./columns";

import { api } from "~/trpc/react";
import { type ReadManyIdsInput } from "~/utils/validation/ids/readManyIds";
import { GoodsIdsTableRowActions } from "./GoodsIdsTableRowActions";
import { GoodsIdsTableCustomActions } from "./GoodsIdsTableCustomActions";
import { DataTable } from "~/components/table/DataTable";

export function GoodsIdsTable() {
  const tableStore = useGoodsIdsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.ids.readMany.useQuery({
      columnFilters: tableStore.state.columnFilters,
      columnFilterFns: tableStore.state
        .columnFilterFns as ReadManyIdsInput["columnFilterFns"],
      globalFilter: tableStore.state.globalFilter,
      sorting: tableStore.state.sorting,
      pagination: tableStore.state.pagination,
    });

  return (
    <DataTable
      columns={goodsIdsColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsIdsTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsIdsTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
