"use client";

import { useGoodsTagsTable } from "~/app/stores/table-stores";
import { goodsTagsColumns } from "./columns";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { type ReadManyTagsInput } from "~/utils/validation/tags/readManyTags";
import { GoodsTagsTableRowActions } from "./row-actions";
import { GoodsTagsTableCustomActions } from "./custom-actions";

export function GoodsTagsTable() {
  const tableStore = useGoodsTagsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.tags.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyTagsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsTagsColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsTagsTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsTagsTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
