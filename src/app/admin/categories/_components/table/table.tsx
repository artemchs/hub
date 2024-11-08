"use client";

import { useGoodsCategoriesTable } from "~/app/stores/table-stores";
import { goodsCategoriesColumns } from "./columns";

import { api } from "~/trpc/react";
import { type ReadManyIdsInput } from "~/utils/validation/ids/readManyIds";
import { DataTable } from "~/components/table/DataTable";
import { GoodsCategoriesTableRowActions } from "./row-actions";
import { GoodsCategoriesTableCustomActions } from "./custom-actions";

export function GoodsCategoriesTable() {
  const tableStore = useGoodsCategoriesTable();

  const { data, isLoading, error, isError, isFetching } =
    api.categories.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyIdsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsCategoriesColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsCategoriesTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsCategoriesTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
